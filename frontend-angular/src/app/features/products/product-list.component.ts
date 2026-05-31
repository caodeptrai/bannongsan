import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, CategoryService } from '../../core/services';
import { Product, Category, ProductQueryParams } from '../../core/models';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="products-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="container">
          <h1>Sản Phẩm Nông Sản</h1>
          <p>Tìm kiếm và lựa chọn các sản phẩm nông sản tươi ngon</p>
        </div>
      </div>

      <div class="container">
        <div class="products-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="filter-section">
              <h3>Danh Mục</h3>
              <div class="filter-options">
                <label class="filter-option" [class.active]="!selectedCategoryId">
                  <input type="radio" name="category" [value]="''" [(ngModel)]="selectedCategoryId" (change)="onFilterChange()">
                  <span>Tất cả</span>
                  <span class="count"></span>
                </label>
                <label *ngFor="let cat of categories" class="filter-option" [class.active]="selectedCategoryId === cat.id">
                  <input type="radio" name="category" [value]="cat.id" [(ngModel)]="selectedCategoryId" (change)="onFilterChange()">
                  <span>{{ cat.name }}</span>
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3>Khoảng Giá</h3>
              <div class="price-range">
                <input type="number" [(ngModel)]="minPrice" (change)="onFilterChange()" placeholder="Từ" class="form-control">
                <span>-</span>
                <input type="number" [(ngModel)]="maxPrice" (change)="onFilterChange()" placeholder="Đến" class="form-control">
              </div>
            </div>

            <div class="filter-section">
              <h3>Tình Trạng</h3>
              <label class="filter-checkbox">
                <input type="checkbox" [(ngModel)]="inStockOnly" (change)="onFilterChange()">
                <span>Chỉ hiển thị còn hàng</span>
              </label>
            </div>

            <button class="btn btn-outline btn-block" (click)="resetFilters()">Đặt lại bộ lọc</button>
          </aside>

          <!-- Products Grid -->
          <div class="products-main">
            <!-- Toolbar -->
            <div class="products-toolbar">
              <div class="results-info">
                <span>Tìm thấy <strong>{{ totalProducts }}</strong> sản phẩm</span>
              </div>
              <div class="toolbar-actions">
                <div class="search-box">
                  <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="onSearch()" placeholder="Tìm kiếm...">
                  <button (click)="onSearch()"><span class="material-icons">search</span></button>
                </div>
                <select [(ngModel)]="sortBy" (change)="onFilterChange()" class="form-control sort-select">
                  <option value="">Sắp xếp</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="soldCount-desc">Bán chạy nhất</option>
                  <option value="rating-desc">Đánh giá cao nhất</option>
                  <option value="createdAt-desc">Mới nhất</option>
                </select>
              </div>
            </div>

            <!-- Loading -->
            <div class="loading-state" *ngIf="loading">
              <div class="spinner"></div>
              <p>Đang tải sản phẩm...</p>
            </div>

            <!-- Products Grid -->
            <div class="products-grid" *ngIf="!loading && products.length > 0">
              <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
            </div>

            <!-- Empty State -->
            <div class="empty-state" *ngIf="!loading && products.length === 0">
              <span class="material-icons">search_off</span>
              <h3>Không tìm thấy sản phẩm</h3>
              <p>Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác</p>
              <button class="btn btn-primary" (click)="resetFilters()">Đặt lại bộ lọc</button>
            </div>

            <!-- Pagination -->
            <div class="pagination" *ngIf="!loading && totalPages > 1">
              <button [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">
                <span class="material-icons">chevron_left</span>
              </button>
              <button *ngFor="let page of visiblePages" [class.active]="page === currentPage" (click)="goToPage(page)">
                {{ page }}
              </button>
              <button [disabled]="currentPage === totalPages" (click)="goToPage(currentPage + 1)">
                <span class="material-icons">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      padding: 48px 0;
      text-align: center;

      h1 {
        font-size: 36px;
        margin-bottom: 8px;
      }

      p {
        opacity: 0.9;
        font-size: 16px;
      }
    }

    .products-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 32px;
      padding: 32px 0;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }

    .filters-sidebar {
      @media (max-width: 1024px) {
        display: none;
      }
    }

    .filter-section {
      background: white;
      border-radius: var(--border-radius);
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: var(--shadow);

      h3 {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: var(--transition);

      input {
        accent-color: var(--primary-color);
      }

      span:first-of-type {
        flex: 1;
      }

      &:hover {
        background: var(--background-color);
      }

      &.active {
        background: rgba(46, 125, 50, 0.1);
        color: var(--primary-color);
      }
    }

    .price-range {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      width: 100%;

      span {
        color: var(--text-secondary);
        font-weight: 600;
        text-align: center;
      }

      input {
        min-width: 0;
        width: 100%;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }

      @media (max-width: 420px) {
        grid-template-columns: 1fr;

        span {
          display: none;
        }
      }
    }

    .filter-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      input {
        accent-color: var(--primary-color);
        width: 18px;
        height: 18px;
      }
    }

    .products-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .toolbar-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .search-box {
      display: flex;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      overflow: hidden;

      input {
        border: none;
        padding: 10px 16px;
        width: 240px;
        font-size: 14px;

        &:focus {
          outline: none;
        }
      }

      button {
        background: var(--primary-color);
        border: none;
        padding: 10px 14px;
        cursor: pointer;
        color: white;

        &:hover {
          background: var(--primary-dark);
        }
      }
    }

    .sort-select {
      padding: 10px 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      min-width: 180px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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

    .loading-state {
      text-align: center;
      padding: 64px;

      .spinner {
        width: 40px;
        height: 40px;
        margin: 0 auto 16px;
        border-width: 4px;
      }

      p {
        color: var(--text-secondary);
      }
    }

    .empty-state {
      text-align: center;
      padding: 64px 24px;

      .material-icons {
        font-size: 64px;
        color: var(--text-secondary);
        margin-bottom: 16px;
      }

      h3 {
        margin-bottom: 8px;
      }

      p {
        color: var(--text-secondary);
        margin-bottom: 24px;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = true;

  // Filters
  searchQuery = '';
  selectedCategoryId = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  inStockOnly = false;
  sortBy = '';

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  totalPages = 0;

  get visiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    // Get params from URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategoryId = params['categoryId'] || '';
      this.currentPage = parseInt(params['page']) || 1;
      this.minPrice = params['minPrice'] ? Number(params['minPrice']) : null;
      this.maxPrice = params['maxPrice'] ? Number(params['maxPrice']) : null;
      this.inStockOnly = params['inStock'] === 'true';
      this.sortBy = params['sortBy'] || '';
      this.loadProducts();
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        }
      }
    });
  }

  loadProducts(): void {
    this.loading = true;

    const params: ProductQueryParams = {
      page: this.currentPage,
      limit: 12,
    };

    if (this.searchQuery) params.search = this.searchQuery;
    if (this.selectedCategoryId) params.categoryId = this.selectedCategoryId;
    if (this.minPrice !== null) params.minPrice = this.minPrice;
    if (this.maxPrice !== null) params.maxPrice = this.maxPrice;
    if (this.inStockOnly) params.inStock = true;
    if (this.sortBy) {
      const [sort, order] = this.sortBy.split('-');
      params.sortBy = sort;
      params.sortOrder = order as 'asc' | 'desc';
    }

    this.productService.getProducts(params).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products || [];
          this.totalProducts = res.pagination?.total || 0;
          this.totalPages = res.pagination?.totalPages || 1;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.updateURL();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updateURL();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategoryId = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.inStockOnly = false;
    this.sortBy = '';
    this.currentPage = 1;
    this.updateURL();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateURL();
    }
  }

  updateURL(): void {
    const queryParams: any = {};
    if (this.searchQuery) queryParams.search = this.searchQuery;
    if (this.selectedCategoryId) queryParams.categoryId = this.selectedCategoryId;
    if (this.minPrice !== null) queryParams.minPrice = this.minPrice;
    if (this.maxPrice !== null) queryParams.maxPrice = this.maxPrice;
    if (this.inStockOnly) queryParams.inStock = true;
    if (this.sortBy) queryParams.sortBy = this.sortBy;
    if (this.currentPage > 1) queryParams.page = this.currentPage;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: ''
    });
  }
}
