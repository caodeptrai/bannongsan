import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CartService, UiFeedbackService } from '../../core/services';
import { CartItem } from '../../core/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
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
    private router: Router,
    private feedback: UiFeedbackService
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

  async removeItem(item: CartItem): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Xóa sản phẩm khỏi giỏ hàng',
      message: `Xóa "${item.product?.name}" khỏi giỏ hàng?`,
      confirmText: 'Xóa',
      destructive: true,
    });
    if (!confirmed) return;

    this.cartService.removeFromCart(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id);
        this.cartService.loadCart();
        this.calculateTotal();
        this.feedback.success('Đã xóa sản phẩm khỏi giỏ hàng.');
      },
      error: (err) => this.feedback.error(err.error?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng.')
    });
  }

  async clearCart(): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Xóa toàn bộ giỏ hàng',
      message: 'Bạn có chắc muốn xóa toàn bộ sản phẩm trong giỏ hàng?',
      confirmText: 'Xóa giỏ hàng',
      destructive: true,
    });
    if (!confirmed) return;

    this.cartService.clearCart().subscribe({
      next: () => {
        this.items = [];
        this.cartService.loadCart();
        this.calculateTotal();
        this.feedback.success('Đã xóa toàn bộ giỏ hàng.');
      },
      error: (err) => this.feedback.error(err.error?.message || 'Không thể xóa giỏ hàng.')
    });
  }

  calculateTotal(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
    this.shippingFee = this.subtotal >= 500000 ? 0 : (this.subtotal >= 200000 ? 15000 : 25000);
    this.discount = this.subtotal >= 500000 ? this.subtotal * 0.05 : 0;
    this.total = this.subtotal + this.shippingFee - this.discount;
  }
}
