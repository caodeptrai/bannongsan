import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models';

@Component({
  selector: 'app-admin-users',
  template: `
    <div class="users-page">
      <div class="page-header"><h1>Quản lý Khách hàng</h1></div>
      <div class="toolbar">
        <div class="search-box">
          <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="loadUsers()" placeholder="Tìm kiếm...">
          <button (click)="loadUsers()"><span class="material-icons">search</span></button>
        </div>
        <select [(ngModel)]="filterRole" (change)="loadUsers()" class="form-control">
          <option value="">Tất cả vai trò</option>
          <option value="USER">Khách hàng</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Khách hàng</th><th>Email</th><th>Điện thoại</th><th>Vai trò</th><th>Trạng thái</th><th>Đơn hàng</th><th>Ngày tạo</th><th>Thao tác</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td><strong>{{ user.fullName }}</strong></td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone || '-' }}</td>
              <td><span class="badge" [class.badge-primary]="user.role === 'ADMIN'" [class.badge-secondary]="user.role === 'USER'">{{ user.role === 'ADMIN' ? 'Admin' : 'Khách hàng' }}</span></td>
              <td><span class="badge" [class.badge-success]="user.status === 'ACTIVE'" [class.badge-error]="user.status === 'LOCKED'" [class.badge-warning]="user.status === 'INACTIVE'">{{ getStatusText(user.status) }}</span></td>
              <td>{{ user._count?.orders || 0 }}</td>
              <td>{{ user.createdAt | date:'dd/MM/yyyy' }}</td>
              <td>
                <button class="action-btn" (click)="changeStatus(user)" title="Đổi trạng thái"><span class="material-icons">sync</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination" *ngIf="totalPages > 1">
        <button *ngFor="let p of pages" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p }}</button>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; h1 { font-size: 24px; } }
    .toolbar { display: flex; gap: 16px; margin-bottom: 16px; }
    .search-box { display: flex; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; input { border: none; padding: 10px 16px; width: 280px; } button { background: var(--primary-color); border: none; padding: 10px; color: white; cursor: pointer; } }
    .table-container { background: white; border-radius: 12px; box-shadow: var(--shadow); overflow-x: auto; }
    table { th, td { padding: 12px 16px; } }
    .action-btn { background: none; border: none; padding: 6px; cursor: pointer; color: var(--text-secondary); &:hover { color: var(--primary-color); } .material-icons { font-size: 20px; } }
  `]
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  searchQuery = '';
  filterRole = '';
  currentPage = 1;
  totalPages = 1;

  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  constructor(private userService: UserService) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.userService.getAllUsers({ page: this.currentPage, limit: 20, search: this.searchQuery, role: this.filterRole }).subscribe({
      next: (res) => { if (res.success) { this.users = res.users || []; this.totalPages = res.pagination?.totalPages || 1; } }
    });
  }

  goToPage(page: number): void { this.currentPage = page; this.loadUsers(); }
  getStatusText(status: string): string { const map: any = { 'ACTIVE': 'Hoạt động', 'INACTIVE': 'Không hoạt động', 'LOCKED': 'Bị khóa' }; return map[status] || status; }

  changeStatus(user: User): void {
    const status = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    if (confirm(`${status === 'LOCKED' ? 'Khóa' : 'Mở khóa'} tài khoản "${user.fullName}"?`)) {
      this.userService.updateUserStatus(user.id, status).subscribe({
        next: () => { this.loadUsers(); alert('Cập nhật thành công!'); },
        error: (err) => alert(err.error?.message || 'Lỗi!')
      });
    }
  }
}
