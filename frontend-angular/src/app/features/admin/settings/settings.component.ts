import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../core/services';
import { SystemSetting } from '../../../core/models';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-page">
      <div class="page-header">
        <h1>Cấu hình hệ thống</h1>
      </div>

      <div class="settings-card">
        <div class="settings-card-header">
          <div>
            <h2>Thông tin website</h2>
            <p>Các thông tin này được dùng ở header, footer và trang liên hệ.</p>
          </div>
          <span class="badge badge-success" *ngIf="savedMessage">{{ savedMessage }}</span>
        </div>

        <div class="settings-grid">
          <div class="form-group">
            <label>Tên website *</label>
            <input type="text" [(ngModel)]="formData.siteName" class="form-control" placeholder="WebBanHoaQua">
          </div>
          <div class="form-group">
            <label>Số điện thoại</label>
            <input type="text" [(ngModel)]="formData.contactPhone" class="form-control" placeholder="0909.123.456">
          </div>
          <div class="form-group">
            <label>Email liên hệ</label>
            <input type="email" [(ngModel)]="formData.contactEmail" class="form-control" placeholder="contact@webbanhoaqua.com">
          </div>
          <div class="form-group">
            <label>Giờ làm việc</label>
            <input type="text" [(ngModel)]="formData.businessHours" class="form-control" placeholder="7:00 - 21:00 (Thứ 2 - CN)">
          </div>
        </div>

        <div class="form-group">
          <label>Địa chỉ</label>
          <textarea [(ngModel)]="formData.address" class="form-control" rows="3" placeholder="Nhập địa chỉ cửa hàng"></textarea>
        </div>

        <div class="settings-actions">
          <button class="btn btn-outline" (click)="loadSettings()" [disabled]="saving">Làm mới</button>
          <button class="btn btn-primary" (click)="saveSettings()" [disabled]="saving">
            <span class="material-icons">save</span>
            {{ saving ? 'Đang lưu...' : 'Lưu cấu hình' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { max-width: 980px; }
    .settings-card { background: white; border: 1px solid #e6e8ec; border-radius: 10px; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06); padding: 24px; }
    .settings-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid var(--border-color); }
    .settings-card-header h2 { font-family: inherit; font-size: 20px; margin: 0 0 4px; }
    .settings-card-header p { color: var(--text-secondary); margin: 0; }
    .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .settings-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
    @media (max-width: 700px) {
      .settings-card { padding: 18px; }
      .settings-card-header, .settings-actions { flex-direction: column; align-items: stretch; }
      .settings-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SettingsComponent implements OnInit {
  formData: Partial<SystemSetting> = {};
  saving = false;
  savedMessage = '';

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.savedMessage = '';
    this.settingService.getSettings(true).subscribe({
      next: (res) => {
        if (res.success) {
          this.formData = { ...res.data };
        }
      }
    });
  }

  saveSettings(): void {
    if (!this.formData.siteName?.trim()) {
      alert('Tên website không được để trống.');
      return;
    }

    this.saving = true;
    this.savedMessage = '';
    this.settingService.updateSettings(this.formData).subscribe({
      next: (res) => {
        this.saving = false;
        if (res.success) {
          this.formData = { ...res.data };
          this.savedMessage = 'Đã lưu';
        }
      },
      error: (err) => {
        this.saving = false;
        alert(err.error?.message || 'Lưu cấu hình thất bại!');
      }
    });
  }
}
