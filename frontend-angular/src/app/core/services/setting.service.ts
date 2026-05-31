import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SystemSetting } from '../models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private settings$?: Observable<{ success: boolean; data: SystemSetting }>;

  constructor(private http: HttpClient) {}

  getSettings(forceRefresh = false): Observable<{ success: boolean; data: SystemSetting }> {
    if (!this.settings$ || forceRefresh) {
      this.settings$ = this.http.get<{ success: boolean; data: SystemSetting }>(`${API_URL}/settings`).pipe(
        shareReplay(1)
      );
    }

    return this.settings$;
  }

  updateSettings(data: Partial<SystemSetting>): Observable<{ success: boolean; message: string; data: SystemSetting }> {
    this.settings$ = undefined;
    return this.http.put<{ success: boolean; message: string; data: SystemSetting }>(`${API_URL}/settings`, data);
  }
}
