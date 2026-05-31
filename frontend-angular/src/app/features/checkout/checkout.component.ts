import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, CartService, OrderService, UiFeedbackService } from '../../core/services';
import { CartItem } from '../../core/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
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
    private router: Router,
    private feedback: UiFeedbackService
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
          this.feedback.success(`Đặt hàng thành công. Mã đơn hàng: ${res.data.orderNumber}`);
          this.router.navigate(['/orders', res.data.id]);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.feedback.error(err.error?.message || 'Đặt hàng thất bại.');
      }
    });
  }
}
