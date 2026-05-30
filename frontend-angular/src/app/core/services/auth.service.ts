import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models';
import { tap } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'ADMIN';
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, credentials).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.currentUserSubject.next(res.data.user);
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/register`, data).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.currentUserSubject.next(res.data.user);
        }
      })
    );
  }

  getProfile(): Observable<{ success: boolean; data: User }> {
    return this.http.get<{ success: boolean; data: User }>(`${API_URL}/auth/profile`).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
      })
    );
  }

  updateProfile(data: Partial<User>): Observable<{ success: boolean; message: string; data: User }> {
    return this.http.put<{ success: boolean; message: string; data: User }>(`${API_URL}/auth/profile`, data).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
      })
    );
  }

  changePassword(data: { oldPassword: string; newPassword: string }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${API_URL}/auth/change-password`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
