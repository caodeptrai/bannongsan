import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Category, Product, ProductQueryParams, PaginatedResponse } from '../models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(params?: ProductQueryParams): Observable<PaginatedResponse<Product>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = (params as any)[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Product>>(`${API_URL}/products`, { params: httpParams });
  }

  getFeaturedProducts(limit = 8): Observable<{ success: boolean; data: Product[] }> {
    return this.http.get<{ success: boolean; data: Product[] }>(`${API_URL}/products/featured?limit=${limit}`);
  }

  getNewArrivals(limit = 8): Observable<{ success: boolean; data: Product[] }> {
    return this.http.get<{ success: boolean; data: Product[] }>(`${API_URL}/products/new-arrivals?limit=${limit}`);
  }

  getBestSellers(limit = 8): Observable<{ success: boolean; data: Product[] }> {
    return this.http.get<{ success: boolean; data: Product[] }>(`${API_URL}/products/best-sellers?limit=${limit}`);
  }

  getProductById(id: string): Observable<{ success: boolean; data: Product }> {
    return this.http.get<{ success: boolean; data: Product }>(`${API_URL}/products/${id}`);
  }

  getProductBySlug(slug: string): Observable<{ success: boolean; data: Product }> {
    return this.http.get<{ success: boolean; data: Product }>(`${API_URL}/products/slug/${slug}`);
  }

  getRelatedProducts(productId: string, categoryId: string, limit = 4): Observable<{ success: boolean; data: Product[] }> {
    return this.http.get<{ success: boolean; data: Product[] }>(
      `${API_URL}/products/related/${productId}/${categoryId}?limit=${limit}`
    );
  }

  // Admin methods
  getAllProductsAdmin(params?: any): Observable<PaginatedResponse<Product>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Product>>(`${API_URL}/products/admin/all`, { params: httpParams });
  }

  createProduct(data: any): Observable<{ success: boolean; message: string; data: Product }> {
    return this.http.post<{ success: boolean; message: string; data: Product }>(`${API_URL}/products`, data);
  }

  updateProduct(id: string, data: any): Observable<{ success: boolean; message: string; data: Product }> {
    return this.http.put<{ success: boolean; message: string; data: Product }>(`${API_URL}/products/${id}`, data);
  }

  deleteProduct(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${API_URL}/products/${id}`);
  }
}
