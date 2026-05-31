import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, CategoryService } from '../../core/services';
import { Product, Category, ProductQueryParams } from '../../core/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
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
