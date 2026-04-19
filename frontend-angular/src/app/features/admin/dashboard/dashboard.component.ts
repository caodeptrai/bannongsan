import { Component, OnInit } from '@angular/core';
import { UserService, OrderService } from '../../../core/services';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1 class="page-title">Tổng Quan Dashboard</h1>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">
            <span class="material-icons">people</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalUsers || 0 }}</span>
            <span class="stat-label">Người dùng</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <span class="material-icons">inventory_2</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalProducts || 0 }}</span>
            <span class="stat-label">Sản phẩm</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">
            <span class="material-icons">receipt_long</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalOrders || 0 }}</span>
            <span class="stat-label">Đơn hàng</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">
            <span class="material-icons">attach_money</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats?.totalRevenue | vndCurrency }}</span>
            <span class="stat-label">Doanh thu</span>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card recent-orders">
          <h2>Đơn hàng gần đây</h2>
          <div class="orders-list">
            <div class="order-item" *ngFor="let order of stats?.recentOrders">
              <div class="order-info">
                <span class="order-number">{{ order.orderNumber }}</span>
                <span class="order-customer">{{ order.user?.fullName }}</span>
              </div>
              <div class="order-meta">
                <span class="order-total">{{ order.total | vndCurrency }}</span>
                <span class="order-status" [ngClass]="'status-' + order.status.toLowerCase()">{{ order.status }}</span>
              </div>
            </div>
            <div class="empty" *ngIf="!stats?.recentOrders?.length">
              Chưa có đơn hàng nào
            </div>
          </div>
          <a routerLink="/admin/orders" class="view-all">Xem tất cả</a>
        </div>

        <div class="dashboard-card quick-actions">
          <h2>Thao tác nhanh</h2>
          <div class="actions-list">
            <a routerLink="/admin/products" class="action-item">
              <span class="material-icons">add_box</span>
              <span>Thêm sản phẩm</span>
            </a>
            <a routerLink="/admin/categories" class="action-item">
              <span class="material-icons">category</span>
              <span>Quản lý danh mục</span>
            </a>
            <a routerLink="/admin/orders" class="action-item">
              <span class="material-icons">pending_actions</span>
              <span>Xử lý đơn hàng</span>
            </a>
            <a routerLink="/admin/statistics" class="action-item">
              <span class="material-icons">bar_chart</span>
              <span>Xem thống kê</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1400px; }
    .page-title { font-size: 28px; margin-bottom: 24px; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 32px;

      @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: var(--shadow);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      .material-icons { font-size: 30px; color: white; }

      &.blue { background: linear-gradient(135deg, #1976d2, #42a5f5); }
      &.green { background: linear-gradient(135deg, #388e3c, #66bb6a); }
      &.orange { background: linear-gradient(135deg, #f57c00, #ff9800); }
      &.purple { background: linear-gradient(135deg, #7b1fa2, #ab47bc); }
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-color);
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;

      @media (max-width: 1024px) { grid-template-columns: 1fr; }
    }

    .dashboard-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: var(--shadow);

      h2 {
        font-size: 18px;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid var(--primary-color);
      }
    }

    .orders-list { min-height: 200px; }

    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child { border-bottom: none; }
    }

    .order-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .order-number { font-weight: 600; }
      .order-customer { font-size: 13px; color: var(--text-secondary); }
    }

    .order-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;

      .order-total { font-weight: 600; color: var(--primary-color); }
      .order-status {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 10px;
        font-weight: 600;

        &.status-pending { background: #fff3e0; color: #f57c00; }
        &.status-confirmed { background: #e3f2fd; color: #1976d2; }
        &.status-shipping { background: #f3e5f5; color: #7b1fa2; }
        &.status-completed { background: #e8f5e9; color: #388e3c; }
      }
    }

    .empty { text-align: center; color: var(--text-secondary); padding: 40px; }

    .view-all {
      display: block;
      text-align: center;
      padding: 12px;
      margin-top: 16px;
      background: var(--background-color);
      border-radius: 8px;
      color: var(--primary-color);
      font-weight: 600;

      &:hover { background: var(--primary-color); color: white; }
    }

    .actions-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      background: var(--background-color);
      border-radius: 8px;
      transition: var(--transition);

      .material-icons { font-size: 32px; color: var(--primary-color); }
      span:last-child { font-size: 13px; font-weight: 500; }

      &:hover { background: var(--primary-color); color: white; .material-icons { color: white; } }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats: any = null;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.userService.getDashboardStats().subscribe({
      next: (res) => {
        if (res.success) {
          this.stats = res.data;
        }
      }
    });
  }
}
