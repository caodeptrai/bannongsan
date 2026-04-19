import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, CartService } from '../../../core/services';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="product-detail-page" *ngIf="product">
      <div class="container">
        <div class="breadcrumb">
          <a routerLink="/">Trang chủ</a>
          <span class="material-icons">chevron_right</span>
          <a routerLink="/products">Sản phẩm</a>
          <span class="material-icons">chevron_right</span>
          <a [routerLink]="['/products']" [queryParams]="{categoryId: product.categoryId}">{{ product.category?.name }}</a>
          <span class="material-icons">chevron_right</span>
          <span>{{ product.name }}</span>
        </div>

        <div class="product-detail-grid">
          <!-- Product Images -->
          <div class="product-images">
            <div class="main-image">
              <img [src]="selectedImage" [alt]="product.name">
              <span class="discount-badge" *ngIf="discountPercent > 0">-{{ discountPercent }}%</span>
            </div>
            <div class="thumbnail-images" *ngIf="product.images && product.images.length > 1">
              <img *ngFor="let img of product.images" [src]="img.url" [alt]="product.name"
                   [class.active]="selectedImage === img.url" (click)="selectImage(img.url)">
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <span class="product-category">{{ product.category?.name }}</span>
            <h1 class="product-name">{{ product.name }}</h1>

            <div class="product-meta">
              <div class="rating">
                <span *ngFor="let star of [1,2,3,4,5]" class="material-icons" [class.filled]="star <= product.rating">star</span>
                <span class="rating-text">{{ product.rating }}/5</span>
                <span class="review-count">({{ product.reviewCount }} đánh giá)</span>
              </div>
              <span class="sold-count">{{ product.soldCount }} đã bán</span>
            </div>

            <div class="product-price">
              <span class="current-price">{{ product.price | vndCurrency }}</span>
              <span class="original-price" *ngIf="product.originalPrice && product.originalPrice > product.price">
                {{ product.originalPrice | vndCurrency }}
              </span>
              <span class="unit">/{{ product.unit }}</span>
            </div>

            <div class="product-stock">
              <span class="material-icons" [class.in-stock]="product.stock > 0" [class.out-of-stock]="product.stock === 0">
                {{ product.stock > 0 ? 'check_circle' : 'cancel' }}
              </span>
              <span>{{ product.stock > 0 ? 'Còn hàng (' + product.stock + ' ' + product.unit + ')' : 'Hết hàng' }}</span>
            </div>

            <div class="product-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{{ product.description }}</p>
            </div>

            <div class="product-actions">
              <div class="quantity-selector">
                <button (click)="decreaseQuantity()" [disabled]="quantity <= 1">-</button>
                <input type="number" [(ngModel)]="quantity" min="1" [max]="product.stock">
                <button (click)="increaseQuantity()">+</button>
              </div>
              <button class="btn btn-primary btn-lg" (click)="addToCart()" [disabled]="product.stock === 0">
                <span class="material-icons">add_shopping_cart</span>
                Thêm vào giỏ hàng
              </button>
            </div>

            <div class="product-features">
              <div class="feature">
                <span class="material-icons">local_shipping</span>
                <span>Giao hàng trong 2-4 giờ</span>
              </div>
              <div class="feature">
                <span class="material-icons">verified</span>
                <span>Cam kết chất lượng</span>
              </div>
              <div class="feature">
                <span class="material-icons">swap_horiz</span>
                <span>Đổi trả trong 24h</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <section class="related-products" *ngIf="relatedProducts.length > 0">
          <h2>Sản phẩm liên quan</h2>
          <div class="products-grid grid grid-4">
            <app-product-card *ngFor="let p of relatedProducts" [product]="p"></app-product-card>
          </div>
        </section>
      </div>
    </div>

    <!-- Loading -->
    <div class="loading-state" *ngIf="loading">
      <div class="spinner"></div>
      <p>Đang tải thông tin sản phẩm...</p>
    </div>
  `,
  styles: [`
    .product-detail-page {
      padding: 24px 0;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 24px;
      font-size: 14px;
      color: var(--text-secondary);

      a:hover { color: var(--primary-color); }
      .material-icons { font-size: 18px; }
      span:last-child { color: var(--text-color); }
    }

    .product-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-bottom: 64px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .product-images {
      .main-image {
        position: relative;
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        aspect-ratio: 1;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .discount-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--error-color);
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-weight: 600;
        }
      }

      .thumbnail-images {
        display: flex;
        gap: 12px;
        margin-top: 16px;

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: var(--transition);

          &:hover, &.active {
            border-color: var(--primary-color);
          }
        }
      }
    }

    .product-info {
      .product-category {
        font-size: 14px;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .product-name {
        font-size: 32px;
        margin: 12px 0 16px;
        line-height: 1.3;
      }

      .product-meta {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border-color);

        .rating {
          display: flex;
          align-items: center;
          gap: 2px;

          .material-icons {
            font-size: 20px;
            color: #ddd;
            &.filled { color: #ffc107; }
          }

          .rating-text { margin-left: 8px; font-weight: 600; }
          .review-count { color: var(--text-secondary); margin-left: 4px; }
        }

        .sold-count {
          color: var(--text-secondary);
          font-size: 14px;
        }
      }

      .product-price {
        padding: 20px 0;
        display: flex;
        align-items: baseline;
        gap: 12px;

        .current-price {
          font-size: 36px;
          font-weight: 700;
          color: var(--primary-color);
        }

        .original-price {
          font-size: 20px;
          color: var(--text-secondary);
          text-decoration: line-through;
        }

        .unit {
          font-size: 16px;
          color: var(--text-secondary);
        }
      }

      .product-stock {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
        color: var(--text-secondary);

        .material-icons {
          font-size: 20px;
          &.in-stock { color: var(--success-color); }
          &.out-of-stock { color: var(--error-color); }
        }
      }

      .product-description {
        margin-bottom: 24px;

        h3 {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        p {
          color: var(--text-secondary);
          line-height: 1.7;
        }
      }

      .product-actions {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;

        @media (max-width: 480px) {
          flex-direction: column;
        }
      }

      .quantity-selector {
        display: flex;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        overflow: hidden;

        button {
          width: 40px;
          height: 48px;
          border: none;
          background: var(--background-color);
          font-size: 18px;
          cursor: pointer;

          &:hover:not(:disabled) { background: var(--border-color); }
          &:disabled { opacity: 0.5; cursor: not-allowed; }
        }

        input {
          width: 60px;
          height: 48px;
          border: none;
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          text-align: center;
          font-size: 16px;

          &::-webkit-inner-spin-button,
          &::-webkit-outer-spin-button { -webkit-appearance: none; }
        }
      }

      .btn-lg {
        padding: 14px 32px;
        font-size: 16px;
      }

      .product-features {
        display: flex;
        gap: 24px;
        padding: 20px;
        background: var(--background-color);
        border-radius: var(--border-radius);

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);

          .material-icons {
            font-size: 20px;
            color: var(--primary-color);
          }
        }
      }
    }

    .related-products {
      margin-top: 64px;

      h2 {
        font-size: 24px;
        margin-bottom: 24px;
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;

        @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 480px) { grid-template-columns: 1fr; }
      }
    }

    .loading-state {
      text-align: center;
      padding: 100px;

      .spinner {
        width: 48px;
        height: 48px;
        margin: 0 auto 16px;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  selectedImage = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadProduct(slug);
      }
    });
  }

  loadProduct(slug: string): void {
    this.loading = true;
    this.productService.getProductBySlug(slug).subscribe({
      next: (res) => {
        if (res.success) {
          this.product = res.data;
          this.selectedImage = this.product.images && this.product.images.length > 0
            ? this.product.images[0].url
            : 'https://via.placeholder.com/600';
          this.loadRelatedProducts();
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  loadRelatedProducts(): void {
    if (this.product) {
      this.productService.getRelatedProducts(this.product.id, this.product.categoryId, 4).subscribe({
        next: (res) => {
          if (res.success) {
            this.relatedProducts = res.data;
          }
        }
      });
    }
  }

  selectImage(url: string): void {
    this.selectedImage = url;
  }

  get discountPercent(): number {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
    }
    return 0;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) this.quantity++;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next: (res) => {
          if (res.success) {
            this.cartService.loadCart();
            alert(`Đã thêm ${this.quantity} ${this.product?.unit} "${this.product?.name}" vào giỏ hàng!`);
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Không thể thêm vào giỏ hàng!');
        }
      });
    }
  }
}
