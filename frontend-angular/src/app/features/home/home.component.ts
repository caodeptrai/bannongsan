import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, CategoryService } from '../../core/services';
import { Product, Category } from '../../core/models';

@Component({
  selector: 'app-home',
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Nông Sản Tươi Ngon<br>Giao Hàng Tận Nơi</h1>
          <p class="hero-subtitle">
            Chúng tôi cung cấp các loại nông sản tươi sạch, chất lượng cao từ khắp vùng miền Việt Nam.
            Đặt hàng online, giao hàng nhanh chóng.
          </p>
          <div class="hero-actions">
            <a routerLink="/products" class="btn btn-primary btn-lg">Mua sắm ngay</a>
            <a routerLink="/about" class="btn btn-outline btn-lg">Tìm hiểu thêm</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section categories-section">
      <div class="container">
        <div class="section-header">
          <h2>Danh Mục Sản Phẩm</h2>
          <p>Các loại nông sản đa dạng, phong phú</p>
        </div>
        <div class="categories-grid" *ngIf="categories.length > 0">
          <a *ngFor="let cat of categories" [routerLink]="['/products']" [queryParams]="{categoryId: cat.id}" class="category-card">
            <div class="category-image">
              <img [src]="cat.image || 'https://via.placeholder.com/300x200'" [alt]="cat.name">
            </div>
            <div class="category-info">
              <h3>{{ cat.name }}</h3>
              <span class="product-count">{{ cat._count?.products || 0 }} sản phẩm</span>
            </div>
          </a>
        </div>
        <div class="loading" *ngIf="loading">
          <div class="spinner"></div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <h2>Sản Phẩm Nổi Bật</h2>
          <p>Những sản phẩm được khách hàng yêu thích nhất</p>
        </div>
        <div class="products-grid grid grid-4" *ngIf="featuredProducts.length > 0">
          <app-product-card *ngFor="let product of featuredProducts" [product]="product"></app-product-card>
        </div>
        <div class="section-footer">
          <a routerLink="/products" class="btn btn-outline">Xem tất cả sản phẩm</a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">
              <span class="material-icons">local_shipping</span>
            </div>
            <h3>Giao Hàng Nhanh</h3>
            <p>Giao hàng trong 2-4 giờ trong nội thành TP.HCM</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <span class="material-icons">verified</span>
            </div>
            <h3>Sản Phẩm Chất Lượng</h3>
            <p>100% nông sản tươi, đảm bảo nguồn gốc xuất xứ</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <span class="material-icons">support_agent</span>
            </div>
            <h3>Hỗ Trợ 24/7</h3>
            <p>Đội ngũ tư vấn luôn sẵn sàng hỗ trợ</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <span class="material-icons">payments</span>
            </div>
            <h3>Thanh Toán An Toàn</h3>
            <p>Nhiều hình thức thanh toán linh hoạt</p>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="section new-arrivals-section" *ngIf="newArrivals.length > 0">
      <div class="container">
        <div class="section-header">
          <h2>Hàng Mới Về</h2>
          <p>Các sản phẩm mới được cập nhật liên tục</p>
        </div>
        <div class="products-grid grid grid-4">
          <app-product-card *ngFor="let product of newArrivals" [product]="product"></app-product-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Bạn Cần Tư Vấn?</h2>
          <p>Liên hệ ngay với chúng tôi để được hỗ trợ tốt nhất</p>
          <a routerLink="/contact" class="btn btn-secondary btn-lg">Liên hệ ngay</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 500px;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%);
      color: white;
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1920') center/cover;
      opacity: 0.15;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 700px;
      animation: fadeInUp 0.8s ease;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 24px;

      @media (max-width: 768px) {
        font-size: 36px;
      }
    }

    .hero-subtitle {
      font-size: 18px;
      line-height: 1.7;
      opacity: 0.95;
      margin-bottom: 32px;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-lg {
      padding: 14px 32px;
      font-size: 16px;
    }

    .btn-outline {
      border: 2px solid white;
      color: white;
      background: transparent;

      &:hover {
        background: white;
        color: var(--primary-color);
      }
    }

    .section-header {
      text-align: center;
      margin-bottom: 48px;

      h2 {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--text-color);
      }

      p {
        font-size: 16px;
        color: var(--text-secondary);
      }
    }

    .categories-section {
      background: white;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 24px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .category-card {
      display: block;
      background: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: var(--transition);
      text-decoration: none;
      color: inherit;

      &:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-hover);

        .category-image img {
          transform: scale(1.1);
        }
      }

      .category-image {
        aspect-ratio: 3/2;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
      }

      .category-info {
        padding: 16px;
        text-align: center;

        h3 {
          font-size: 14px;
          font-family: 'Roboto', sans-serif;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .product-count {
          font-size: 12px;
          color: var(--text-secondary);
        }
      }
    }

    .featured-section {
      background: var(--background-color);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .section-footer {
      text-align: center;
      margin-top: 32px;
    }

    .features-section {
      background: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .feature-item {
      text-align: center;
      padding: 24px;

      .feature-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;

        .material-icons {
          font-size: 36px;
          color: white;
        }
      }

      h3 {
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        margin-bottom: 12px;
      }

      p {
        color: var(--text-secondary);
        font-size: 14px;
        line-height: 1.6;
      }
    }

    .new-arrivals-section {
      background: var(--background-color);
    }

    .cta-section {
      background: linear-gradient(135deg, var(--secondary-color), #ff8f00);
      padding: 80px 0;
      color: white;
      text-align: center;
    }

    .cta-content {
      h2 {
        font-size: 32px;
        margin-bottom: 16px;
      }

      p {
        font-size: 18px;
        margin-bottom: 32px;
        opacity: 0.95;
      }

      .btn-secondary {
        background: white;
        color: var(--secondary-color);

        &:hover {
          background: #f5f5f5;
        }
      }
    }

    .loading {
      text-align: center;
      padding: 48px;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  categories: Category[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        }
      },
      error: () => {
        console.error('Error loading categories');
      }
    });

    this.productService.getFeaturedProducts(8).subscribe({
      next: (res) => {
        if (res.success) {
          this.featuredProducts = res.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    this.productService.getNewArrivals(4).subscribe({
      next: (res) => {
        if (res.success) {
          this.newArrivals = res.data;
        }
      },
      error: () => {
        console.error('Error loading new arrivals');
      }
    });
  }
}
