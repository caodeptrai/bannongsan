import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, CartService } from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
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
          this.cartService.mergeCart().subscribe({
            next: () => this.finishLogin(),
            error: () => this.finishLogin()
          });
          return;
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

  private finishLogin(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loading = false;
    this.router.navigateByUrl(returnUrl);
  }
}
