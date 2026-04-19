import { Component, OnInit } from '@angular/core';
import { ProductService, CategoryService } from '../../../core/services';
import { Product, Category } from '../../../core/models';

@Component({
  selector: 'app-admin-products',
  template: `
    <div class="products-page">
      <div class="page-header">
        <h1>Quản lý Sản phẩm</h1>
        <button class="btn btn-primary" (click)="openModal()">
          <span class="material-icons">add</span> Thêm sản phẩm
        </button>
      </div>

      <div class="toolbar">
        <div class="search-box">
          <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="loadProducts()" placeholder="Tìm kiếm...">
          <button (click)="loadProducts()"><span class="material-icons">search</span></button>
        </div>
        <select [(ngModel)]="filterCategory" (change)="loadProducts()" class="form-control">
          <option value="">Tất cả danh mục</option>
          <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
        </select>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Đã bán</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td><img [src]="getImage(p)" class="product-image"></td>
              <td><strong>{{ p.name }}</strong><br><small class="text-secondary">{{ p.sku }}</small></td>
              <td>{{ p.category?.name }}</td>
              <td class="price">{{ p.price | vndCurrency }}</td>
              <td><span [class.text-error]="p.stock === 0">{{ p.stock }}</span></td>
              <td>{{ p.soldCount }}</td>
              <td><span class="badge" [class.badge-success]="p.isActive" [class.badge-secondary]="!p.isActive">{{ p.isActive ? 'Hoạt động' : 'Ẩn' }}</span></td>
              <td>
                <button class="action-btn" (click)="editProduct(p)" title="Sửa"><span class="material-icons">edit</span></button>
                <button class="action-btn danger" (click)="deleteProduct(p)" title="Xóa"><span class="material-icons">delete</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button *ngFor="let p of pages" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p }}</button>
      </div>

      <!-- Modal -->
      <div class="modal-backdrop" *ngIf="showModal" (click)="closeModal()">
        <div class="modal large" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingProduct ? 'Sửa' : 'Thêm' }} sản phẩm</h2>
            <button class="close-btn" (click)="closeModal()"><span class="material-icons">close</span></button>
          </div>
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group"><label>Tên sản phẩm *</label><input type="text" [(ngModel)]="formData.name" class="form-control"></div>
              <div class="form-group"><label>Danh mục *</label><select [(ngModel)]="formData.categoryId" class="form-control"><option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option></select></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Giá *</label><input type="number" [(ngModel)]="formData.price" class="form-control"></div>
              <div class="form-group"><label>Giá gốc</label><input type="number" [(ngModel)]="formData.originalPrice" class="form-control"></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Tồn kho</label><input type="number" [(ngModel)]="formData.stock" class="form-control"></div>
              <div class="form-group"><label>Đơn vị</label><input type="text" [(ngModel)]="formData.unit" class="form-control" placeholder="kg, cái, túi..."></div>
            </div>
            <div class="form-group"><label>Mô tả</label><textarea [(ngModel)]="formData.description" class="form-control" rows="4"></textarea></div>
            <div class="form-group"><label>Hình ảnh (URL)</label><input type="text" [(ngModel)]="formData.imageUrl" class="form-control" placeholder="https://..."></div>
            <div class="form-row">
              <label class="checkbox-label"><input type="checkbox" [(ngModel)]="formData.isFeatured"> Sản phẩm nổi bật</label>
              <label class="checkbox-label"><input type="checkbox" [(ngModel)]="formData.isActive"> Hoạt động</label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeModal()">Hủy</button>
            <button class="btn btn-primary" (click)="saveProduct()">{{ editingProduct ? 'Lưu' : 'Thêm' }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; h1 { font-size: 24px; } }
    .toolbar { display: flex; gap: 16px; margin-bottom: 16px; }
    .search-box { display: flex; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; input { border: none; padding: 10px 16px; width: 300px; } button { background: var(--primary-color); border: none; padding: 10px; color: white; cursor: pointer; } }
    .table-container { background: white; border-radius: 12px; box-shadow: var(--shadow); overflow-x: auto; }
    table { th, td { padding: 12px 16px; white-space: nowrap; } }
    .product-image { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; }
    .price { color: var(--primary-color); font-weight: 600; }
    .action-btn { background: none; border: none; padding: 6px; cursor: pointer; color: var(--text-secondary); &:hover { color: var(--primary-color); } &.danger:hover { color: var(--error-color); } .material-icons { font-size: 20px; } }
    .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: white; border-radius: 12px; width: 600px; max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; }
    .modal-header { padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; h2 { font-size: 18px; margin: 0; } }
    .close-btn { background: none; border: none; cursor: pointer; .material-icons { font-size: 24px; } }
    .modal-body { padding: 20px; overflow-y: auto; flex: 1; }
    .modal-footer { padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; @media (max-width: 600px) { grid-template-columns: 1fr; } }
    .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  `]
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
  formData: any = { name: '', categoryId: '', price: 0, originalPrice: null, stock: 0, unit: 'kg', description: '', imageUrl: '', isFeatured: false, isActive: true };

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({ next: (res) => { if (res.success) this.categories = res.data; } });
  }

  loadProducts(): void {
    this.productService.getAllProductsAdmin({ page: this.currentPage, limit: 20, search: this.searchQuery, categoryId: this.filterCategory }).subscribe({
      next: (res) => { if (res.success) { this.products = res.products || []; this.totalPages = res.pagination?.totalPages || 1; } }
    });
  }

  goToPage(page: number): void { this.currentPage = page; this.loadProducts(); }

  getImage(p: Product): string {
    if (p.images && p.images.length > 0) return p.images[0].url;
    return 'https://via.placeholder.com/50';
  }

  openModal(): void { this.showModal = true; this.editingProduct = null; this.formData = { name: '', categoryId: this.categories[0]?.id || '', price: 0, originalPrice: null, stock: 0, unit: 'kg', description: '', imageUrl: '', isFeatured: false, isActive: true }; }
  closeModal(): void { this.showModal = false; this.editingProduct = null; }

  editProduct(p: Product): void {
    this.editingProduct = p;
    this.formData = { name: p.name, categoryId: p.categoryId, price: p.price, originalPrice: p.originalPrice, stock: p.stock, unit: p.unit, description: p.description, imageUrl: p.images?.[0]?.url || '', isFeatured: p.isFeatured, isActive: p.isActive };
    this.showModal = true;
  }

  saveProduct(): void {
    const data: any = { ...this.formData };
    if (data.imageUrl) data.images = [data.imageUrl];
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, data).subscribe({ next: () => { this.loadProducts(); this.closeModal(); alert('Cập nhật thành công!'); }, error: (err) => alert(err.error?.message || 'Lỗi!') });
    } else {
      this.productService.createProduct(data).subscribe({ next: () => { this.loadProducts(); this.closeModal(); alert('Thêm thành công!'); }, error: (err) => alert(err.error?.message || 'Lỗi!') });
    }
  }

  deleteProduct(p: Product): void {
    if (confirm(`Xóa sản phẩm "${p.name}"?`)) {
      this.productService.deleteProduct(p.id).subscribe({ next: () => { this.loadProducts(); alert('Xóa thành công!'); }, error: (err) => alert(err.error?.message || 'Lỗi!') });
    }
  }
}
