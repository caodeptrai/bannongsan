import { Component, OnInit } from '@angular/core';
import { CategoryService, ProductService, UiFeedbackService } from '../../../core/services';
import { Product, Category } from '../../../core/models';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  searchQuery = '';
  filterCategory = '';
  currentPage = 1;
  totalPages = 1;
  showModal = false;
  editingProduct: Product | null = null;
  selectedImageFile: File | null = null;
  imagePreview = '';
  saving = false;
  formData: any = { name: '', categoryId: '', price: 0, originalPrice: null, stock: 0, unit: 'kg', description: '', isFeatured: false, isActive: true };

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private feedback: UiFeedbackService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data || [];
          if (!this.formData.categoryId && this.categories.length > 0) {
            this.formData.categoryId = this.categories[0].id;
          }
        }
      }
    });
  }

  loadProducts(): void {
    this.productService.getAllProductsAdmin({ page: this.currentPage, limit: 20, search: this.searchQuery, categoryId: this.filterCategory }).subscribe({
      next: (res) => { if (res.success) { this.products = res.products || []; this.totalPages = res.pagination?.totalPages || 1; } }
    });
  }

  goToPage(page: number): void { this.currentPage = page; this.loadProducts(); }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  getImage(p: Product): string {
    if (p.images && p.images.length > 0) return p.images[0].url;
    return 'https://via.placeholder.com/50';
  }

  openModal(): void {
    if (!this.categories.length) {
      this.feedback.warning('Vui lòng tạo ít nhất một danh mục trước khi thêm sản phẩm.');
      return;
    }
    this.showModal = true;
    this.editingProduct = null;
    this.selectedImageFile = null;
    this.imagePreview = '';
    this.formData = { name: '', categoryId: this.categories[0]?.id || '', price: 0, originalPrice: null, stock: 0, unit: 'kg', description: '', isFeatured: false, isActive: true };
  }

  closeModal(): void {
    this.showModal = false;
    this.editingProduct = null;
    this.selectedImageFile = null;
    this.imagePreview = '';
  }

  editProduct(p: Product): void {
    this.editingProduct = p;
    this.selectedImageFile = null;
    this.imagePreview = p.images?.[0]?.url || '';
    this.formData = { name: p.name, categoryId: p.categoryId, price: p.price, originalPrice: p.originalPrice, stock: p.stock, unit: p.unit, description: p.description, isFeatured: p.isFeatured, isActive: p.isActive };
    this.showModal = true;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.feedback.warning('Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF.');
      input.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.feedback.warning('Ảnh không được vượt quá 5MB.');
      input.value = '';
      return;
    }

    this.selectedImageFile = file;
    this.imagePreview = URL.createObjectURL(file);
  }

  saveProduct(): void {
    if (this.saving) return;

    if (!this.formData.name?.trim()) {
      this.feedback.warning('Tên sản phẩm không được để trống.');
      return;
    }

    if (!this.formData.categoryId) {
      this.feedback.warning('Vui lòng chọn danh mục sản phẩm.');
      return;
    }

    if (Number(this.formData.price) < 0 || this.formData.price === null || this.formData.price === undefined) {
      this.feedback.warning('Giá sản phẩm không hợp lệ.');
      return;
    }

    const data = this.buildProductFormData();
    this.saving = true;
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, data).subscribe({
        next: () => {
          this.saving = false;
          this.loadProducts();
          this.closeModal();
          this.feedback.success('Cập nhật sản phẩm thành công.');
        },
        error: (err) => {
          this.saving = false;
          this.feedback.error(err.error?.message || 'Không thể cập nhật sản phẩm.');
        }
      });
    } else {
      this.productService.createProduct(data).subscribe({
        next: () => {
          this.saving = false;
          this.loadProducts();
          this.closeModal();
          this.feedback.success('Thêm sản phẩm thành công.');
        },
        error: (err) => {
          this.saving = false;
          this.feedback.error(err.error?.message || 'Không thể thêm sản phẩm.');
        }
      });
    }
  }

  async deleteProduct(p: Product): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Xóa sản phẩm',
      message: `Xóa sản phẩm "${p.name}"? Nếu sản phẩm đã có đơn hàng, hệ thống có thể chỉ ẩn sản phẩm để giữ lịch sử giao dịch.`,
      confirmText: 'Xóa sản phẩm',
      destructive: true,
    });
    if (!confirmed) return;

    this.productService.deleteProduct(p.id).subscribe({
      next: () => {
        this.loadProducts();
        this.feedback.success('Xóa sản phẩm thành công.');
      },
      error: (err) => this.feedback.error(err.error?.message || 'Không thể xóa sản phẩm.')
    });
  }

  private buildProductFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.formData).forEach(key => {
      const value = this.formData[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      } else if (key === 'originalPrice') {
        formData.append(key, '');
      }
    });

    if (this.selectedImageFile) {
      formData.append('images', this.selectedImageFile);
    }

    return formData;
  }
}
