import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services';
import { RevenueStats } from '../../../core/models';

@Component({
  selector: 'app-statistics',
  template: `
    <div class="statistics-page">
      <div class="page-header">
        <h1>Thống kê Doanh thu</h1>
        <div class="date-filter">
          <input type="date" [(ngModel)]="startDate" (change)="loadStats()" class="form-control">
          <span>-</span>
          <input type="date" [(ngModel)]="endDate" (change)="loadStats()" class="form-control">
          <button class="btn btn-primary" (click)="loadStats()">Lọc</button>
        </div>
      </div>

      <div class="stats-grid" *ngIf="stats">
        <div class="stat-card">
          <div class="stat-value">{{ stats.totalRevenue | vndCurrency }}</div>
          <div class="stat-label">Tổng doanh thu</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.totalOrders }}</div>
          <div class="stat-label">Tổng đơn hàng</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.averageOrderValue | vndCurrency }}</div>
          <div class="stat-label">Giá trị TB / đơn</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.completedOrders }}</div>
          <div class="stat-label">Đơn hoàn thành</div>
        </div>
      </div>

      <div class="stats-row">
        <div class="stats-col">
          <div class="chart-card">
            <h3>Tình trạng đơn hàng</h3>
            <div class="order-status-stats" *ngIf="stats">
              <div class="status-item">
                <span class="status-label">Chờ xác nhận</span>
                <span class="status-value warning">{{ stats.pendingOrders }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">Đã xác nhận</span>
                <span class="status-value info">{{ stats.confirmedOrders }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">Đang giao</span>
                <span class="status-value purple">{{ stats.shippingOrders }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">Hoàn thành</span>
                <span class="status-value success">{{ stats.completedOrders }}</span>
              </div>
              <div class="status-item">
                <span class="status-label">Đã hủy</span>
                <span class="status-value error">{{ stats.cancelledOrders }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="stats-col">
          <div class="chart-card">
            <h3>Top sản phẩm bán chạy</h3>
            <div class="top-products" *ngIf="stats?.topProducts?.length">
              <div class="product-item" *ngFor="let p of stats!.topProducts; let i = index">
                <span class="rank">{{ i + 1 }}</span>
                <span class="name">{{ p.name }}</span>
                <span class="sold">{{ p.soldCount }} đã bán</span>
                <span class="revenue">{{ p.revenue | vndCurrency }}</span>
              </div>
            </div>
            <div class="empty" *ngIf="!stats?.topProducts?.length">Chưa có dữ liệu</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; h1 { font-size: 24px; } }
    .date-filter { display: flex; align-items: center; gap: 12px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; } }
    .stat-card { background: white; border-radius: 12px; padding: 24px; box-shadow: var(--shadow); text-align: center; }
    .stat-value { font-size: 28px; font-weight: 700; color: var(--primary-color); margin-bottom: 8px; }
    .stat-label { font-size: 14px; color: var(--text-secondary); }
    .stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; @media (max-width: 1024px) { grid-template-columns: 1fr; } }
    .chart-card { background: white; border-radius: 12px; padding: 24px; box-shadow: var(--shadow); h3 { font-size: 18px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--primary-color); } }
    .order-status-stats { display: flex; flex-direction: column; gap: 12px; }
    .status-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--background-color); border-radius: 8px; }
    .status-value { font-weight: 700; &.warning { color: #f57c00; } &.info { color: #1976d2; } &.purple { color: #7b1fa2; } &.success { color: #388e3c; } &.error { color: #d32f2f; } }
    .top-products { display: flex; flex-direction: column; gap: 12px; }
    .product-item { display: grid; grid-template-columns: 30px 1fr auto auto; gap: 12px; align-items: center; padding: 12px 16px; background: var(--background-color); border-radius: 8px; }
    .rank { width: 30px; height: 30px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
    .name { font-weight: 500; }
    .sold { font-size: 13px; color: var(--text-secondary); }
    .revenue { font-weight: 600; color: var(--primary-color); }
    .empty { text-align: center; color: var(--text-secondary); padding: 40px; }
  `]
})
export class StatisticsComponent implements OnInit {
  stats: RevenueStats | null = null;
  startDate = '';
  endDate = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
    this.loadStats();
  }

  loadStats(): void {
    this.orderService.getRevenueStats(this.startDate, this.endDate).subscribe({
      next: (res) => { if (res.success) this.stats = res.data; }
    });
  }
}
