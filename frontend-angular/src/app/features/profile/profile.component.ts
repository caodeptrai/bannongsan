import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services';
import { User } from '../../core/models';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-page">
      <div class="container">
        <h1 class="page-title">Hồ Sơ Cá Nhân</h1>

        <div class="profile-grid">
          <div class="profile-card">
            <div class="profile-avatar">
              <div class="avatar-circle">
                <span class="material-icons">person</span>
              </div>
              <h2>{{ user?.fullName }}</h2>
              <span class="user-email">{{ user?.email }}</span>
            </div>

            <nav class="profile-nav">
              <button class="nav-btn active">
                <span class="material-icons">person</span>
                Thông tin cá nhân
              </button>
              <button class="nav-btn" routerLink="/orders">
                <span class="material-icons">receipt_long</span>
                Lịch sử đơn hàng
              </button>
            </nav>
          </div>

          <div class="profile-content">
            <div class="content-section">
              <h3>Thông tin cá nhân</h3>
              <form [formGroup]="profileForm">
                <div class="form-group">
                  <label>Họ và tên</label>
                  <input type="text" formControlName="fullName" class="form-control">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" [value]="user?.email" class="form-control" disabled>
                </div>
                <div class="form-group">
                  <label>Số điện thoại</label>
                  <input type="tel" formControlName="phone" class="form-control" placeholder="Nhập số điện thoại">
                </div>
                <div class="form-group">
                  <label>Địa chỉ</label>
                  <textarea formControlName="address" class="form-control" rows="3" placeholder="Nhập địa chỉ"></textarea>
                </div>
                <button type="button" class="btn btn-primary" [disabled]="loading" (click)="updateProfile()">
                  {{ loading ? 'Đang lưu...' : 'Lưu thay đổi' }}
                </button>
              </form>
            </div>

            <div class="content-section">
              <h3>Đổi mật khẩu</h3>
              <form [formGroup]="passwordForm">
                <div class="form-group">
                  <label>Mật khẩu hiện tại</label>
                  <input type="password" formControlName="oldPassword" class="form-control">
                </div>
                <div class="form-group">
                  <label>Mật khẩu mới</label>
                  <input type="password" formControlName="newPassword" class="form-control">
                </div>
                <div class="form-group">
                  <label>Xác nhận mật khẩu mới</label>
                  <input type="password" formControlName="confirmPassword" class="form-control">
                </div>
                <button type="button" class="btn btn-primary" [disabled]="passwordForm.invalid || loading" (click)="changePassword()">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { padding: 32px 0; }
    .page-title { font-size: 32px; margin-bottom: 32px; }

    .profile-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 32px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .profile-card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .profile-avatar {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      padding: 32px;
      text-align: center;

      .avatar-circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;

        .material-icons { font-size: 48px; }
      }

      h2 { font-size: 20px; margin-bottom: 4px; }
      .user-email { opacity: 0.8; font-size: 14px; }
    }

    .profile-nav {
      padding: 16px;

      .nav-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 12px 16px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: var(--transition);
        color: var(--text-color);
        font-size: 14px;

        .material-icons { font-size: 22px; color: var(--text-secondary); }

        &:hover { background: var(--background-color); }
        &.active {
          background: rgba(46, 125, 50, 0.1);
          color: var(--primary-color);

          .material-icons { color: var(--primary-color); }
        }
      }
    }

    .profile-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .content-section {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 24px;

      h3 {
        font-size: 18px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }

      .form-group { margin-bottom: 16px; }
      .form-group label { display: block; margin-bottom: 6px; font-weight: 500; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
          alert('Cập nhật hồ sơ thành công!');
        }
        this.loading = false;
      },
      error: (err) => {
        alert(err.error?.message || 'Cập nhật thất bại!');
        this.loading = false;
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    alert('Chức năng đổi mật khẩu sẽ được cập nhật sau!');
  }
}
