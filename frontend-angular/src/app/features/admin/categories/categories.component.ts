import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services';
import { Category } from '../../../core/models';

@Component({
  selector: 'app-categories',
  template: `
    <div class="categories-page">
      <div class="page-header">
        <h1>Quản lý Danh mục</h1>
        <button class="btn btn-primary" (click)="openModal()">
          <span class="material-icons">add</span> Thêm danh mục
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên danh mục</th>
              <th>Slug</th>
              <th>Số sản phẩm</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cat of categories">
              <td><img [src]="cat.image || 'https://via.placeholder.com/50'" class="cat-image"></td>
              <td><strong>{{ cat.name }}</strong></td>
              <td>{{ cat.slug }}</td>
              <td>{{ cat._count?.products || 0 }}</td>
              <td><span class="badge" [class.badge-success]="cat.isActive" [class.badge-secondary]="!cat.isActive">{{ cat.isActive ? 'Hoạt động' : 'Ẩn' }}</span></td>
              <td>
                <button class="action-btn" (click)="editCategory(cat)" title="Sửa"><span class="material-icons">edit</span></button>
                <button class="action-btn danger" (click)="deleteCategory(cat)" title="Xóa"><span class="material-icons">delete</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div class="modal-backdrop" *ngIf="showModal" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingCategory ? 'Sửa' : 'Thêm' }} danh mục</h2>
            <button class="close-btn" (click)="closeModal()"><span class="material-icons">close</span></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Tên danh mục *</label>
              <input type="text" [(ngModel)]="formData.name" class="form-control">
            </div>
            <div class="form-group">
              <label>Slug</label>
              <input type="text" [(ngModel)]="formData.slug" class="form-control" placeholder="auto-generated">
            </div>
            <div class="form-group">
              <label>Mô tả</label>
              <textarea [(ngModel)]="formData.description" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Hình ảnh URL</label>
              <input type="text" [(ngModel)]="formData.image" class="form-control" placeholder="https://...">
            </div>
            <div class="form-group">
              <label>Thứ tự</label>
              <input type="number" [(ngModel)]="formData.sortOrder" class="form-control">
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="formData.isActive"> Hoạt động
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeModal()">Hủy</button>
            <button class="btn btn-primary" (click)="saveCategory()">{{ editingCategory ? 'Lưu' : 'Thêm' }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; h1 { font-size: 24px; } }
    .table-container { background: white; border-radius: 12px; box-shadow: var(--shadow); overflow: hidden; }
    table { th, td { padding: 16px; } }
    .cat-image { width: 50px; height: 50px; object-fit: cover; border-radius: 8px; }
    .action-btn { background: none; border: none; padding: 6px; cursor: pointer; color: var(--text-secondary); &:hover { color: var(--primary-color); } &.danger:hover { color: var(--error-color); } .material-icons { font-size: 20px; } }
    .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: white; border-radius: 12px; width: 500px; max-width: 90vw; }
    .modal-header { padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; h2 { font-size: 18px; margin: 0; } }
    .close-btn { background: none; border: none; cursor: pointer; .material-icons { font-size: 24px; } }
    .modal-body { padding: 20px; max-height: 60vh; overflow-y: auto; }
    .modal-footer { padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  showModal = false;
  editingCategory: Category | null = null;
  formData: any = { name: '', slug: '', description: '', image: '', sortOrder: 0, isActive: true };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void { this.loadCategories(); }

  loadCategories(): void {
    this.categoryService.getAllCategoriesAdmin().subscribe({
      next: (res) => { if (res.success) this.categories = res.data; }
    });
  }

  openModal(): void { this.showModal = true; this.editingCategory = null; this.formData = { name: '', slug: '', description: '', image: '', sortOrder: 0, isActive: true }; }
  closeModal(): void { this.showModal = false; this.editingCategory = null; }

  editCategory(cat: Category): void {
    this.editingCategory = cat;
    this.formData = { ...cat };
    this.showModal = true;
  }

  saveCategory(): void {
    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id, this.formData).subscribe({
        next: () => { this.loadCategories(); this.closeModal(); alert('Cập nhật thành công!'); },
        error: (err) => alert(err.error?.message || 'Lỗi!')
      });
    } else {
      this.categoryService.createCategory(this.formData).subscribe({
        next: () => { this.loadCategories(); this.closeModal(); alert('Thêm thành công!'); },
        error: (err) => alert(err.error?.message || 'Lỗi!')
      });
    }
  }

  deleteCategory(cat: Category): void {
    if (confirm(`Xóa danh mục "${cat.name}"?`)) {
      this.categoryService.deleteCategory(cat.id).subscribe({
        next: () => { this.loadCategories(); alert('Xóa thành công!'); },
        error: (err) => alert(err.error?.message || 'Lỗi!')
      });
    }
  }
}
