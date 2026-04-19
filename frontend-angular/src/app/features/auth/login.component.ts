import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>Đăng Nhập</h1>
            <p>Chào mừng bạn quay trở lại!</p>
          </div>

          <div class="alert alert-error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" formControlName="email" class="form-control"
                     [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              <span class="error-message" *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched">
                Email không được để trống
              </span>
              <span class="error-message" *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched">
                Email không hợp lệ
              </span>
            </div>

            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <input type="password" id="password" formControlName="password" class="form-control"
                     [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              <span class="error-message" *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched">
                Mật khẩu không được để trống
              </span>
            </div>

            <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid || loading">
              <span *ngIf="!loading">Đăng nhập</span>
              <span *ngIf="loading" class="spinner"></span>
            </button>
          </form>

          <div class="auth-footer">
            <p>Chưa có tài khoản? <a routerLink="/auth/register">Đăng ký ngay</a></p>
          </div>

          <div class="demo-accounts">
            <p>Tài khoản demo:</p>
            <div class="demo-account" (click)="fillDemo('user1@example.com')">
              <strong>Khách hàng:</strong> user1&#64;example.com / 123456
            </div>
            <div class="demo-account" (click)="fillDemo('admin@example.com')">
              <strong>Admin:</strong> admin&#64;example.com / 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 16px;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    }

    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 420px;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 32px;

      h1 {
        font-size: 28px;
        margin-bottom: 8px;
      }

      p {
        color: var(--text-secondary);
      }
    }

    .btn-block {
      width: 100%;
      padding: 14px;
      font-size: 16px;
    }

    .auth-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);

      p {
        color: var(--text-secondary);
      }

      a {
        color: var(--primary-color);
        font-weight: 600;

        &:hover { text-decoration: underline; }
      }
    }

    .demo-accounts {
      margin-top: 24px;
      padding: 16px;
      background: var(--background-color);
      border-radius: 8px;
      font-size: 13px;

      p {
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--text-secondary);
      }

      .demo-account {
        padding: 8px;
        margin-bottom: 4px;
        cursor: pointer;
        border-radius: 4px;
        transition: var(--transition);

        &:hover {
          background: #e0e0e0;
        }

        &:last-child { margin-bottom: 0; }
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại!';
      }
    });
  }

  fillDemo(email: string): void {
    this.loginForm.patchValue({
      email,
      password: '123456'
    });
  }
}
