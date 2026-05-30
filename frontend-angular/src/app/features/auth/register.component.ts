import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, CartService } from '../../core/services';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>Đăng Ký Tài Khoản</h1>
            <p>Tạo tài khoản để mua sắm dễ dàng hơn</p>
          </div>

          <div class="alert alert-error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
          <div class="alert alert-success" *ngIf="successMessage">
            {{ successMessage }}
          </div>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="fullName">Họ và tên <span class="required">*</span></label>
              <input type="text" id="fullName" formControlName="fullName" class="form-control"
                     [class.error]="registerForm.get('fullName')?.invalid && registerForm.get('fullName')?.touched">
              <span class="error-message" *ngIf="registerForm.get('fullName')?.errors?.['required'] && registerForm.get('fullName')?.touched">
                Họ tên không được để trống
              </span>
            </div>

            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input type="email" id="email" formControlName="email" class="form-control"
                     [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              <span class="error-message" *ngIf="registerForm.get('email')?.errors?.['required'] && registerForm.get('email')?.touched">
                Email không được để trống
              </span>
              <span class="error-message" *ngIf="registerForm.get('email')?.errors?.['email'] && registerForm.get('email')?.touched">
                Email không hợp lệ
              </span>
            </div>

            <div class="form-group">
              <label for="phone">Số điện thoại</label>
              <input type="tel" id="phone" formControlName="phone" class="form-control"
                     placeholder="09xxxxxxxx">
            </div>

            <div class="form-group">
              <label for="password">Mật khẩu <span class="required">*</span></label>
              <input type="password" id="password" formControlName="password" class="form-control"
                     [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              <span class="error-message" *ngIf="registerForm.get('password')?.errors?.['required'] && registerForm.get('password')?.touched">
                Mật khẩu không được để trống
              </span>
              <span class="error-message" *ngIf="registerForm.get('password')?.errors?.['minlength'] && registerForm.get('password')?.touched">
                Mật khẩu phải có ít nhất 6 ký tự
              </span>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Xác nhận mật khẩu <span class="required">*</span></label>
              <input type="password" id="confirmPassword" formControlName="confirmPassword" class="form-control"
                     [class.error]="registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched">
              <span class="error-message" *ngIf="registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched">
                Mật khẩu xác nhận không khớp
              </span>
            </div>

            <button type="submit" class="btn btn-primary btn-block" [disabled]="registerForm.invalid || loading">
              <span *ngIf="!loading">Đăng ký</span>
              <span *ngIf="loading" class="spinner"></span>
            </button>
          </form>

          <div class="auth-footer">
            <p>Đã có tài khoản? <a routerLink="/auth/login">Đăng nhập ngay</a></p>
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

      h1 { font-size: 28px; margin-bottom: 8px; }
      p { color: var(--text-secondary); }
    }

    .required { color: var(--error-color); }

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

      p { color: var(--text-secondary); }

      a {
        color: var(--primary-color);
        font-weight: 600;

        &:hover { text-decoration: underline; }
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (res) => {
        if (res.success) {
          this.successMessage = 'Đăng ký thành công! Đang chuyển hướng...';
          this.cartService.mergeCart().subscribe({
            next: () => this.finishRegister(),
            error: () => this.finishRegister()
          });
          return;
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Đăng ký thất bại!';
      }
    });
  }

  private finishRegister(): void {
    this.loading = false;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }
}
