import { Component, OnInit } from '@angular/core';
import { SettingService, UiFeedbackService } from '../../../core/services';
import { SystemSetting } from '../../../core/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  formData: Partial<SystemSetting> = {};
  saving = false;
  savedMessage = '';

  constructor(
    private settingService: SettingService,
    private feedback: UiFeedbackService
  ) {}

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
      this.feedback.warning('Tên website không được để trống.');
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
          this.feedback.success('Lưu cấu hình hệ thống thành công.');
        }
      },
      error: (err) => {
        this.saving = false;
        this.feedback.error(err.error?.message || 'Lưu cấu hình thất bại.');
      }
    });
  }
}
