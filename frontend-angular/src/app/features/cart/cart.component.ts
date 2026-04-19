import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, AuthService } from '../../core/services';
import { CartItem } from '../../core/models';

@Component({
  selector: 'app-cart',
  template: `
    <div class="cart-page">
      <div class="container">
        <h1 class="page-title">Giỏ Hàng</h1>

        <div class="cart-layout" *ngIf="items.length > 0">
          <!-- Cart Items -->
          <div class="cart-items">
            <div class="cart-header">
              <span>Sản phẩm</span>
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <span></span>
            </div>

            <div class="cart-item" *ngFor="let item of items">
              <div class="item-product">
                <img [src]="getProductImage(item)" [alt]="item.product.name">
                <div class="item-info">
                  <h3>{{ item.product.name }}</h3>
                  <span class="item-unit">{{ item.product.unit }}</span>
                </div>
              </div>
              <div class="item-price">
                {{ item.product!.price | vndCurrency }}
              </div>
              <div class="item-quantity">
                <button (click)="updateQuantity(item, -1)" [disabled]="item.quantity <= 1">-</button>
                <input type="number" [value]="item.quantity" (change)="onQuantityChange($event, item)" min="1" [max]="item.product!.stock">
                <button (click)="updateQuantity(item, 1)" [disabled]="item.quantity >= item.product!.stock">+</button>
              </div>
              <div class="item-total">
                {{ getItemTotal(item) | vndCurrency }}
              </div>
              <div class="item-actions">
                <button class="delete-btn" (click)="removeItem(item)">
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </div>

            <div class="cart-actions">
              <button class="btn btn-outline" routerLink="/products">
                <span class="material-icons">arrow_back</span>
                Tiếp tục mua sắm
              </button>
              <button class="btn btn-danger-outline" (click)="clearCart()">
                <span class="material-icons">delete_sweep</span>
                Xóa giỏ hàng
              </button>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <h2>Tổng quan đơn hàng</h2>
            <div class="summary-row">
              <span>Tạm tính ({{ items.length }} sản phẩm)</span>
              <span>{{ subtotal | vndCurrency }}</span>
            </div>
            <div class="summary-row">
              <span>Phí vận chuyển</span>
              <span>{{ shippingFee | vndCurrency }}</span>
            </div>
            <div class="summary-row discount" *ngIf="discount > 0">
              <span>Giảm giá</span>
              <span class="text-error">-{{ discount | vndCurrency }}</span>
            </div>
            <div class="summary-row total">
              <span>Tổng cộng</span>
              <span>{{ total | vndCurrency }}</span>
            </div>
            <div class="free-ship-notice" *ngIf="subtotal < 500000 && subtotal >= 200000">
              <span class="material-icons">local_shipping</span>
              Mua thêm {{ (500000 - subtotal) | vndCurrency }} để được miễn phí giao hàng!
            </div>
            <button class="btn btn-primary btn-block btn-lg" routerLink="/checkout">
              Tiến hành đặt hàng
            </button>
            <p class="checkout-notice">
              <span class="material-icons">info</span>
              Miễn phí giao hàng cho đơn từ 500.000đ
            </p>
          </div>
        </div>

        <!-- Empty Cart -->
        <div class="empty-cart" *ngIf="items.length === 0 && !loading">
          <span class="material-icons">shopping_cart</span>
          <h2>Giỏ hàng trống</h2>
          <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <a routerLink="/products" class="btn btn-primary">Mua sắm ngay</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      padding: 32px 0;
      min-height: 60vh;
    }

    .page-title {
      font-size: 32px;
      margin-bottom: 32px;
    }

    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 32px;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }

    .cart-items {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .cart-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr 1fr 60px;
      gap: 16px;
      padding: 16px 20px;
      background: var(--background-color);
      font-weight: 600;
      font-size: 14px;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .cart-item {
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr 1fr 60px;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--border-color);
      align-items: center;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }

    .item-product {
      display: flex;
      gap: 16px;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
      }

      h3 {
        font-family: 'Roboto', sans-serif;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .item-unit {
        font-size: 13px;
        color: var(--text-secondary);
      }
    }

    .item-price {
      font-weight: 600;
      color: var(--text-color);

      @media (max-width: 768px) {
        &::before { content: 'Đơn giá: '; font-weight: normal; color: var(--text-secondary); }
      }
    }

    .item-quantity {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        width: 32px;
        height: 32px;
        border: 1px solid var(--border-color);
        background: white;
        cursor: pointer;
        font-size: 16px;
        transition: var(--transition);

        &:hover:not(:disabled) { border-color: var(--primary-color); }
        &:disabled { opacity: 0.5; cursor: not-allowed; }
      }

      input {
        width: 50px;
        height: 32px;
        text-align: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 14px;

        &::-webkit-inner-spin-button { -webkit-appearance: none; }
      }

      @media (max-width: 768px) {
        &::before { content: 'Số lượng: '; font-weight: normal; color: var(--text-secondary); }
      }
    }

    .item-total {
      font-weight: 700;
      color: var(--primary-color);
      font-size: 16px;

      @media (max-width: 768px) {
        &::before { content: 'Thành tiền: '; font-weight: normal; color: var(--text-secondary); }
      }
    }

    .item-actions {
      .delete-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 8px;
        transition: var(--transition);

        .material-icons { font-size: 22px; }

        &:hover { color: var(--error-color); }
      }
    }

    .cart-actions {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;

      .btn-danger-outline {
        border: 2px solid var(--error-color);
        color: var(--error-color);
        background: transparent;

        &:hover { background: var(--error-color); color: white; }
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
        font-size: 20px;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 15px;

      &.discount {
        color: var(--error-color);
      }

      &.total {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--border-color);
        font-size: 20px;
        font-weight: 700;

        span:last-child { color: var(--primary-color); }
      }
    }

    .free-ship-notice {
      background: #fff3e0;
      padding: 12px;
      border-radius: 8px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--secondary-color);

      .material-icons { font-size: 20px; }
    }

    .checkout-notice {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-secondary);
      justify-content: center;

      .material-icons { font-size: 18px; }
    }

    .empty-cart {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);

      .material-icons {
        font-size: 80px;
        color: var(--text-secondary);
        margin-bottom: 16px;
      }

      h2 { margin-bottom: 8px; }
      p { color: var(--text-secondary); margin-bottom: 24px; }
    }

    .btn-lg { padding: 14px 24px; font-size: 16px; }
  `]
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  subtotal = 0;
  shippingFee = 0;
  discount = 0;
  total = 0;
  loading = true;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res.success && res.data.items) {
          this.items = res.data.items;
          this.calculateTotal();
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getProductImage(item: CartItem): string {
    if (item.product?.images && item.product.images.length > 0) {
      const primary = item.product.images.find(img => img.isPrimary);
      return primary?.url || item.product.images[0].url;
    }
    return 'https://via.placeholder.com/100';
  }

  getItemTotal(item: CartItem): number {
    return (item.product?.price || 0) * item.quantity;
  }

  updateQuantity(item: CartItem, delta: number): void {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (item.product?.stock || 1)) {
      this.cartService.updateCartItem(item.id, newQuantity).subscribe({
        next: () => {
          item.quantity = newQuantity;
          this.calculateTotal();
        }
      });
    }
  }

  onQuantityChange(event: Event, item: CartItem): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value);
    if (newQuantity >= 1 && newQuantity <= (item.product?.stock || 1)) {
      this.cartService.updateCartItem(item.id, newQuantity).subscribe({
        next: () => {
          item.quantity = newQuantity;
          this.calculateTotal();
        }
      });
    }
  }

  removeItem(item: CartItem): void {
    if (confirm(`Xóa "${item.product?.name}" khỏi giỏ hàng?`)) {
      this.cartService.removeFromCart(item.id).subscribe({
        next: () => {
          this.items = this.items.filter(i => i.id !== item.id);
          this.cartService.loadCart();
          this.calculateTotal();
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
      this.cartService.clearCart().subscribe({
        next: () => {
          this.items = [];
          this.cartService.loadCart();
          this.calculateTotal();
        }
      });
    }
  }

  calculateTotal(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
    this.shippingFee = this.subtotal >= 500000 ? 0 : (this.subtotal >= 200000 ? 15000 : 25000);
    this.discount = this.subtotal >= 500000 ? this.subtotal * 0.05 : 0;
    this.total = this.subtotal + this.shippingFee - this.discount;
  }
}
