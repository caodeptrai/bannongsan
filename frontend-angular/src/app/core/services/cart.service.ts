import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartResponse, CartItem } from '../models';
import { AuthService } from './auth.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private itemCountSubject = new BehaviorSubject<number>(0);
  public itemCount$ = this.itemCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadCart();
  }

  private getSessionId(): string {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private getHeaders(): HttpHeaders {
    const headers: any = {};
    if (!this.authService.isLoggedIn) {
      headers['X-Session-Id'] = this.getSessionId();
    }
    return new HttpHeaders(headers);
  }

  loadCart(): void {
    this.getCart().subscribe({
      next: (res) => {
        if (res.success && res.data.items) {
          this.cartItemsSubject.next(res.data.items);
          this.itemCountSubject.next(res.data.itemCount);
        }
      },
      error: () => {
        this.cartItemsSubject.next([]);
        this.itemCountSubject.next(0);
      }
    });
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${API_URL}/cart`, { headers: this.getHeaders() });
  }

  addToCart(productId: string, quantity = 1): Observable<CartResponse> {
    return this.http.post<CartResponse>(
      `${API_URL}/cart/items`,
      { productId, quantity },
      { headers: this.getHeaders() }
    );
  }

  updateCartItem(itemId: string, quantity: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(
      `${API_URL}/cart/items/${itemId}`,
      { quantity }
    );
  }

  removeFromCart(itemId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${API_URL}/cart/items/${itemId}`);
  }

  clearCart(): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${API_URL}/cart/clear`);
  }

  mergeCart(): Observable<CartResponse> {
    return this.http.post<CartResponse>(
      `${API_URL}/cart/merge`,
      {},
      { headers: this.getHeaders() }
    );
  }

  getCurrentCart(): CartItem[] {
    return this.cartItemsSubject.value;
  }
}
