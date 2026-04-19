import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, OrderService, AuthService } from '../../core/services';
import { CartItem } from '../../core/models';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="checkout-page">
      <div class="container">
        <h1 class="page-title">Thanh Toán Đơn Hàng</h1>

        <div class="checkout-layout">
          <!-- Shipping Form -->
          <div class="checkout-form">
            <div class="form-section">
              <h2>Thông tin giao hàng</h2>
              <form [formGroup]="checkoutForm">
                <div class="form-row">
                  <div class="form-group">
                    <label for="shippingName">Họ và tên người nhận <span class="required">*</span></label>
                    <input type="text" id="shippingName" formControlName="shippingName" class="form-control"
                           [class.error]="checkoutForm.get('shippingName')?.invalid && checkoutForm.get('shippingName')?.touched">
                    <span class="error-message" *ngIf="checkoutForm.get('shippingName')?.errors?.['required'] && checkoutForm.get('shippingName')?.touched">
                      Vui lòng nhập họ tên
                    </span>
                  </div>
                  <div class="form-group">
                    <label for="shippingPhone">Số điện thoại <span class="required">*</span></label>
                    <input type="tel" id="shippingPhone" formControlName="shippingPhone" class="form-control"
                           [class.error]="checkoutForm.get('shippingPhone')?.invalid && checkoutForm.get('shippingPhone')?.touched">
                    <span class="error-message" *ngIf="checkoutForm.get('shippingPhone')?.errors?.['required'] && checkoutForm.get('shippingPhone')?.touched">
                      Vui lòng nhập số điện thoại
                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="shippingAddress">Địa chỉ giao hàng <span class="required">*</span></label>
                  <input type="text" id="shippingAddress" formControlName="shippingAddress" class="form-control"
                         [class.error]="checkoutForm.get('shippingAddress')?.invalid && checkoutForm.get('shippingAddress')?.touched">
                  <span class="error-message" *ngIf="checkoutForm.get('shippingAddress')?.errors?.['required'] && checkoutForm.get('shippingAddress')?.touched">
                    Vui lòng nhập địa chỉ giao hàng
                  </span>
                </div>

                <div class="form-group">
                  <label for="shippingNote">Ghi chú đơn hàng</label>
                  <textarea id="shippingNote" formControlName="shippingNote" class="form-control" rows="3"
                            placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."></textarea>
                </div>
              </form>
            </div>

            <div class="form-section">
              <h2>Phương thức thanh toán</h2>
              <div class="payment-methods">
                <label class="payment-method" [class.active]="paymentMethod === 'COD'">
                  <input type="radio" name="payment" value="COD" [(ngModel)]="paymentMethod">
                  <div class="method-icon">
                    <span class="material-icons">payments</span>
                  </div>
                  <div class="method-info">
                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                    <span>Trả tiền mặt khi nhận được hàng</span>
                  </div>
                </label>
                <label class="payment-method" [class.active]="paymentMethod === 'BANK_TRANSFER'">
                  <input type="radio" name="payment" value="BANK_TRANSFER" [(ngModel)]="paymentMethod">
                  <div class="method-icon">
                    <span class="material-icons">account_balance</span>
                  </div>
                  <div class="method-info">
                    <strong>Chuyển khoản ngân hàng</strong>
                    <span>Chuyển khoản trước qua tài khoản ngân hàng</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <h2>Đơn hàng của bạn</h2>

            <div class="summary-items">
              <div class="summary-item" *ngFor="let item of items">
                <img [src]="getProductImage(item)" [alt]="item.product.name">
                <div class="item-info">
                  <span class="item-name">{{ item.product.name }}</span>
                  <span class="item-qty">x{{ item.quantity }}</span>
                </div>
                <span class="item-price">{{ getItemTotal(item) | vndCurrency }}</span>
              </div>
            </div>

            <div class="summary-totals">
              <div class="total-row">
                <span>Tạm tính</span>
                <span>{{ subtotal | vndCurrency }}</span>
              </div>
              <div class="total-row">
                <span>Phí vận chuyển</span>
                <span>{{ shippingFee | vndCurrency }}</span>
              </div>
              <div class="total-row discount" *ngIf="discount > 0">
                <span>Giảm giá</span>
                <span>-{{ discount | vndCurrency }}</span>
              </div>
              <div class="total-row grand-total">
                <span>Tổng cộng</span>
                <span>{{ total | vndCurrency }}</span>
              </div>
            </div>

            <button class="btn btn-primary btn-block btn-lg" [disabled]="checkoutForm.invalid || loading || items.length === 0" (click)="placeOrder()">
              <span *ngIf="!loading">Đặt hàng ngay</span>
              <span *ngIf="loading" class="spinner"></span>
            </button>

            <p class="terms-notice">
              Bằng việc đặt hàng, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách đổi trả</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page {
      padding: 32px 0;
      min-height: 70vh;
    }

    .page-title {
      font-size: 32px;
      margin-bottom: 32px;
    }

    .checkout-layout {
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 32px;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }

    .form-section {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 24px;
      margin-bottom: 24px;

      h2 {
        font-size: 18px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .required { color: var(--error-color); }

    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .payment-method {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition);

      input { display: none; }

      &.active, &:hover {
        border-color: var(--primary-color);
        background: rgba(46, 125, 50, 0.05);
      }

      .method-icon {
        width: 48px;
        height: 48px;
        background: var(--background-color);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        .material-icons {
          font-size: 24px;
          color: var(--primary-color);
        }
      }

      .method-info {
        flex: 1;

        strong {
          display: block;
          margin-bottom: 4px;
        }

        span {
          font-size: 13px;
          color: var(--text-secondary);
        }
      }
    }

    .order-summary {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 24px;
      height: fit-content;
      position: sticky;
      top: 100px;

      h2 {
        font-size: 18px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .summary-items {
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 16px;
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child { border-bottom: none; }

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
      }

      .item-info {
        flex: 1;

        .item-name {
          display: block;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .item-qty {
          font-size: 13px;
          color: var(--text-secondary);
        }
      }

      .item-price {
        font-weight: 600;
        font-size: 14px;
      }
    }

    .summary-totals {
      border-top: 1px solid var(--border-color);
      padding-top: 16px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 15px;

      &.discount span:last-child { color: var(--error-color); }

      &.grand-total {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 2px solid var(--border-color);
        font-size: 20px;
        font-weight: 700;

        span:last-child { color: var(--primary-color); }
      }
    }

    .terms-notice {
      margin-top: 16px;
      font-size: 13px;
      color: var(--text-secondary);
      text-align: center;

      a { color: var(--primary-color); &:hover { text-decoration: underline; } }
    }

    .btn-lg { padding: 14px 24px; font-size: 16px; }
  `]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  items: CartItem[] = [];
  subtotal = 0;
  shippingFee = 0;
  discount = 0;
  total = 0;
  paymentMethod = 'COD';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      shippingName: ['', Validators.required],
      shippingPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      shippingAddress: ['', Validators.required],
      shippingNote: ['']
    });
  }

  ngOnInit(): void {
    this.loadCart();
    this.loadUserInfo();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res.success && res.data.items) {
          this.items = res.data.items;
          this.calculateTotal();
        }
      }
    });
  }

  loadUserInfo(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.checkoutForm.patchValue({
        shippingName: user.fullName,
        shippingPhone: user.phone || '',
        shippingAddress: user.address || ''
      });
    }
  }

  getProductImage(item: CartItem): string {
    if (item.product?.images && item.product.images.length > 0) {
      return item.product.images[0].url;
    }
    return 'https://via.placeholder.com/60';
  }

  getItemTotal(item: CartItem): number {
    return (item.product?.price || 0) * item.quantity;
  }

  calculateTotal(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
    this.shippingFee = this.subtotal >= 500000 ? 0 : (this.subtotal >= 200000 ? 15000 : 25000);
    this.discount = this.subtotal >= 500000 ? this.subtotal * 0.05 : 0;
    this.total = this.subtotal + this.shippingFee - this.discount;
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid || this.items.length === 0) return;

    this.loading = true;

    const orderData = {
      ...this.checkoutForm.value,
      paymentMethod: this.paymentMethod,
      items: this.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        if (res.success) {
          this.cartService.loadCart();
          alert(`Đặt hàng thành công! Mã đơn hàng: ${res.data.orderNumber}`);
          this.router.navigate(['/orders', res.data.id]);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Đặt hàng thất bại!');
      }
    });
  }
}
