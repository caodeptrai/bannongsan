import { Component, OnInit } from '@angular/core';
import { UiFeedbackService, UserService } from '../../../core/services';
import { User } from '../../../core/models';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  searchQuery = '';
  filterRole = '';
  currentPage = 1;
  totalPages = 1;

  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  constructor(
    private userService: UserService,
    private feedback: UiFeedbackService
  ) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.userService.getAllUsers({ page: this.currentPage, limit: 20, search: this.searchQuery, role: this.filterRole }).subscribe({
      next: (res) => { if (res.success) { this.users = res.users || []; this.totalPages = res.pagination?.totalPages || 1; } }
    });
  }

  goToPage(page: number): void { this.currentPage = page; this.loadUsers(); }
  applyFilters(): void { this.currentPage = 1; this.loadUsers(); }
  getStatusText(status: string): string { const map: any = { 'ACTIVE': 'Hoạt động', 'INACTIVE': 'Không hoạt động', 'LOCKED': 'Bị khóa' }; return map[status] || status; }

  async changeStatus(user: User): Promise<void> {
    const status = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    const confirmed = await this.feedback.confirm({
      title: status === 'LOCKED' ? 'Khóa tài khoản' : 'Mở khóa tài khoản',
      message: `${status === 'LOCKED' ? 'Khóa' : 'Mở khóa'} tài khoản "${user.fullName}"?`,
      confirmText: status === 'LOCKED' ? 'Khóa tài khoản' : 'Mở khóa',
      destructive: status === 'LOCKED',
    });
    if (!confirmed) return;

    this.userService.updateUserStatus(user.id, status).subscribe({
      next: () => {
        this.loadUsers();
        this.feedback.success('Cập nhật trạng thái tài khoản thành công.');
      },
      error: (err) => this.feedback.error(err.error?.message || 'Không thể cập nhật trạng thái tài khoản.')
    });
  }
}
