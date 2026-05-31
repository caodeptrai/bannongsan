import { Component, OnInit } from '@angular/core';
import { CategoryService, UiFeedbackService } from '../../../core/services';
import { Category } from '../../../core/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  searchQuery = '';
  currentPage = 1;
  totalPages = 1;
  totalCategories = 0;
  showModal = false;
  editingCategory: Category | null = null;
  formData: any = { name: '', slug: '', description: '', image: '', sortOrder: 0, isActive: true };

  get pages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let page = start; page <= end; page++) {
      pages.push(page);
    }
    return pages;
  }

  constructor(
    private categoryService: CategoryService,
    private feedback: UiFeedbackService
  ) {}

  ngOnInit(): void { this.loadCategories(); }

  loadCategories(): void {
    this.categoryService.getAllCategoriesAdmin({ page: this.currentPage, limit: 10, search: this.searchQuery }).subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.categories || [];
          this.totalPages = res.pagination?.totalPages || 1;
          this.totalCategories = res.pagination?.total || 0;
        }
      }
    });
  }

  searchCategories(): void {
    this.currentPage = 1;
    this.loadCategories();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadCategories();
  }

  openModal(): void { this.showModal = true; this.editingCategory = null; this.formData = { name: '', slug: '', description: '', image: '', sortOrder: 0, isActive: true }; }
  closeModal(): void { this.showModal = false; this.editingCategory = null; }

  editCategory(cat: Category): void {
    this.editingCategory = cat;
    this.formData = { ...cat };
    this.showModal = true;
  }

  saveCategory(): void {
    const data = this.buildPayload();
    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id, data).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
          this.feedback.success('Cập nhật danh mục thành công.');
        },
        error: (err) => this.feedback.error(err.error?.message || 'Không thể cập nhật danh mục.')
      });
    } else {
      this.categoryService.createCategory(data).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
          this.feedback.success('Thêm danh mục thành công.');
        },
        error: (err) => this.feedback.error(err.error?.message || 'Không thể thêm danh mục.')
      });
    }
  }

  async deleteCategory(cat: Category): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Xóa danh mục',
      message: `Xóa danh mục "${cat.name}"? Thao tác này không thể hoàn tác nếu danh mục không còn ràng buộc dữ liệu.`,
      confirmText: 'Xóa danh mục',
      destructive: true,
    });
    if (!confirmed) return;

    this.categoryService.deleteCategory(cat.id).subscribe({
      next: () => {
        this.loadCategories();
        this.feedback.success('Xóa danh mục thành công.');
      },
      error: (err) => this.feedback.error(err.error?.message || 'Không thể xóa danh mục.')
    });
  }

  private buildPayload(): Partial<Category> {
    return {
      name: this.formData.name,
      slug: this.formData.slug?.trim() || undefined,
      description: this.formData.description || undefined,
      image: this.formData.image || undefined,
      sortOrder: Number(this.formData.sortOrder) || 0,
      isActive: Boolean(this.formData.isActive)
    };
  }
}
