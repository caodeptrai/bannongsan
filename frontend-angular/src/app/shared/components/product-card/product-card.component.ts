import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models';
import { CartService } from '../../../core/services';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card" [class.featured]="product.isFeatured">
      <div class="product-image-wrapper">
        <a [routerLink]="['/products', product.slug]">
          <img [src]="getProductImage()" [alt]="product.name" class="product-image" loading="lazy">
        </a>
        <div class="product-badges">
          <span class="badge badge-error" *ngIf="discountPercent > 0">-{{ discountPercent }}%</span>
          <span class="badge badge-primary" *ngIf="product.isFeatured">Nổi bật</span>
          <span class="badge badge-warning" *ngIf="product.stock === 0">Hết hàng</span>
        </div>
        <div class="product-actions">
          <button class="action-btn" (click)="addToCart($event)" [disabled]="product.stock === 0" title="Thêm vào giỏ">
            <span class="material-icons">add_shopping_cart</span>
          </button>
          <button class="action-btn" (click)="quickView($event)" title="Xem nhanh">
            <span class="material-icons">visibility</span>
          </button>
        </div>
      </div>

      <div class="product-content">
        <span class="product-category">{{ product.category?.name }}</span>
        <h3 class="product-name">
          <a [routerLink]="['/products', product.slug]">{{ product.name }}</a>
        </h3>
        <div class="product-rating">
          <ng-container *ngFor="let star of [1,2,3,4,5]">
            <span class="material-icons" [class.filled]="star <= (product.rating || 0)">star</span>
          </ng-container>
          <span class="rating-count">({{ product.reviewCount || 0 }})</span>
        </div>
        <div class="product-price">
          <span class="price">{{ product.price | vndCurrency }}</span>
          <span class="original-price" *ngIf="product.originalPrice && product.originalPrice > product.price">
            {{ product.originalPrice | vndCurrency }}
          </span>
          <span class="unit">/{{ product.unit }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: var(--transition);

      &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-4px);

        .product-actions {
          opacity: 1;
        }

        .product-image {
          transform: scale(1.05);
        }
      }

      &.featured {
        border: 2px solid var(--primary-color);
      }
    }

    .product-image-wrapper {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .product-badges {
      position: absolute;
      top: 12px;
      left: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .product-actions {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      opacity: 0;
      transition: var(--transition);
    }

    .action-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      border: none;
      box-shadow: var(--shadow);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);

      .material-icons {
        font-size: 20px;
        color: var(--text-color);
      }

      &:hover:not(:disabled) {
        background: var(--primary-color);

        .material-icons {
          color: white;
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .product-content {
      padding: 16px;
    }

    .product-category {
      font-size: 12px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .product-name {
      font-size: 15px;
      font-weight: 600;
      margin: 8px 0;
      line-height: 1.4;

      a {
        color: var(--text-color);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-bottom: 8px;

      .material-icons {
        font-size: 16px;
        color: #ddd;

        &.filled {
          color: #ffc107;
        }
      }

      .rating-count {
        font-size: 12px;
        color: var(--text-secondary);
        margin-left: 4px;
      }
    }

    .product-price {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;

      .price {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-color);
      }

      .original-price {
        font-size: 14px;
        color: var(--text-secondary);
        text-decoration: line-through;
      }

      .unit {
        font-size: 13px;
        color: var(--text-secondary);
      }
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private router: Router,
    private cartService: CartService
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
        alert('Đã thêm vào giỏ hàng!');
      },
      error: (err) => {
        console.error(err);
        alert('Thêm vào giỏ hàng thất bại!');
      }
    });
  }

  quickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/products', this.product.slug]);
  }
}
