import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Category, PaginatedResponse } from '../models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ success: boolean; data: Category[] }> {
    return this.http.get<{ success: boolean; data: Category[] }>(`${API_URL}/categories`);
  }

  getCategoryById(id: string): Observable<{ success: boolean; data: Category }> {
    return this.http.get<{ success: boolean; data: Category }>(`${API_URL}/categories/${id}`);
  }

  // Admin methods
  getAllCategoriesAdmin(params?: any): Observable<PaginatedResponse<Category>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Category>>(`${API_URL}/categories/admin/all`, { params: httpParams });
  }

  createCategory(data: Partial<Category>): Observable<{ success: boolean; message: string; data: Category }> {
    return this.http.post<{ success: boolean; message: string; data: Category }>(`${API_URL}/categories`, data);
  }

  updateCategory(id: string, data: Partial<Category>): Observable<{ success: boolean; message: string; data: Category }> {
    return this.http.put<{ success: boolean; message: string; data: Category }>(`${API_URL}/categories/${id}`, data);
  }

  deleteCategory(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${API_URL}/categories/${id}`);
  }
}
