import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UiFeedbackService } from '../../core/services';
import { User } from '../../core/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private feedback: UiFeedbackService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: [''],
      address: ['']
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data;
          this.profileForm.patchValue({
            fullName: res.data.fullName,
            phone: res.data.phone || '',
            address: res.data.address || ''
          });
        }
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.feedback.success('Cập nhật hồ sơ thành công.');
        }
        this.loading = false;
      },
      error: (err) => {
        this.feedback.error(err.error?.message || 'Cập nhật hồ sơ thất bại.');
        this.loading = false;
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.feedback.warning('Mật khẩu xác nhận không khớp.');
      return;
    }

    this.loading = true;
    const { oldPassword, newPassword } = this.passwordForm.value;
    this.authService.changePassword({ oldPassword, newPassword }).subscribe({
      next: () => {
        this.loading = false;
        this.passwordForm.reset();
        this.feedback.success('Đổi mật khẩu thành công.');
      },
      error: (err) => {
        this.loading = false;
        this.feedback.error(err.error?.message || 'Đổi mật khẩu thất bại.');
      }
    });
  }
}
