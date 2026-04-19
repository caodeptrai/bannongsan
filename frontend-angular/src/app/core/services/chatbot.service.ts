import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, ChatbotMessage, ChatFAQ, User, PaginatedResponse } from '../models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<{ success: boolean; data: ChatbotMessage }> {
    return this.http.post<{ success: boolean; data: ChatbotMessage }>(
      `${API_URL}/chatbot/message`,
      { message }
    );
  }

  getFAQs(): Observable<{ success: boolean; data: ChatFAQ[] }> {
    return this.http.get<{ success: boolean; data: ChatFAQ[] }>(`${API_URL}/chatbot/faqs`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(params?: any): Observable<PaginatedResponse<User>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<User>>(`${API_URL}/users/admin/all`, { params: httpParams });
  }

  getUserById(id: string): Observable<{ success: boolean; data: User }> {
    return this.http.get<{ success: boolean; data: User }>(`${API_URL}/users/admin/${id}`);
  }

  updateUserStatus(id: string, status: string): Observable<{ success: boolean; message: string; data: User }> {
    return this.http.put<{ success: boolean; message: string; data: User }>(
      `${API_URL}/users/admin/${id}/status`,
      { status }
    );
  }

  getDashboardStats(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(`${API_URL}/users/admin/stats/dashboard`);
  }
}
