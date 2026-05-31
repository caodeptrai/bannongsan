import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models';
import { CartService, UiFeedbackService } from '../../../core/services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private router: Router,
    private cartService: CartService,
    private feedback: UiFeedbackService
  ) {}

  getProductImage(): string {
    if (this.product.images && this.product.images.length > 0) {
      const primary = this.product.images.find(img => img.isPrimary);
      return primary?.url || this.product.images[0].url;
    }
    return 'https://via.placeholder.com/400x400?text=No+Image';
  }

  get discountPercent(): number {
    if (this.product.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
    }
    return 0;
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: () => {
        this.feedback.success(`Đã thêm "${this.product.name}" vào giỏ hàng.`);
      },
      error: (err) => {
        console.error(err);
        this.feedback.error(err.error?.message || 'Thêm vào giỏ hàng thất bại.');
      }
    });
  }

  quickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/products', this.product.slug]);
  }
}
