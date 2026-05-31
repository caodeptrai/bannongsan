import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Order, CreateOrderRequest, PaginatedResponse, RevenueStats } from '../models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(data: CreateOrderRequest): Observable<{ success: boolean; message: string; data: Order }> {
    return this.http.post<{ success: boolean; message: string; data: Order }>(`${API_URL}/orders`, data);
  }

  getMyOrders(page = 1, limit = 10): Observable<PaginatedResponse<Order>> {
    return this.http.get<PaginatedResponse<Order>>(
      `${API_URL}/orders/my?page=${page}&limit=${limit}`
    );
  }

  getMyOrderById(orderId: string): Observable<{ success: boolean; data: Order }> {
    return this.http.get<{ success: boolean; data: Order }>(`${API_URL}/orders/my/${orderId}`);
  }

  cancelOrder(orderId: string, reason?: string): Observable<{ success: boolean; message: string; data: Order }> {
    return this.http.put<{ success: boolean; message: string; data: Order }>(
      `${API_URL}/orders/my/${orderId}/cancel`,
      { reason }
    );
  }

  // Admin methods
  getAllOrders(params?: any): Observable<PaginatedResponse<Order>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Order>>(`${API_URL}/orders/admin/all`, { params: httpParams });
  }

  getOrderDetail(orderId: string): Observable<{ success: boolean; data: Order }> {
    return this.http.get<{ success: boolean; data: Order }>(`${API_URL}/orders/admin/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: string, cancelReason?: string): Observable<{ success: boolean; message: string; data: Order }> {
    const body: any = { status };
    if (cancelReason) {
      body.cancelReason = cancelReason;
    }
    return this.http.put<{ success: boolean; message: string; data: Order }>(
      `${API_URL}/orders/admin/${orderId}/status`,
      body
    );
  }

  getRevenueStats(startDate?: string, endDate?: string): Observable<{ success: boolean; data: RevenueStats }> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<{ success: boolean; data: RevenueStats }>(
      `${API_URL}/orders/admin/statistics/revenue`,
      { params }
    );
  }
}
