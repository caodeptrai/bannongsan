import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services';
import { Order } from '../../core/models';

@Component({
  selector: 'app-orders',
  template: `
    <div class="orders-page">
      <div class="container">
        <h1 class="page-title">Lịch Sử Đơn Hàng</h1>

        <div class="orders-list" *ngIf="orders.length > 0">
          <div class="order-card" *ngFor="let order of orders">
            <div class="order-header">
              <div class="order-info">
                <span class="order-number">Đơn hàng #{{ order.orderNumber }}</span>
                <span class="order-date">{{ order.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
              <span class="status-badge" [ngClass]="'status-' + order.status.toLowerCase()">
                {{ getStatusText(order.status) }}
              </span>
            </div>

            <div class="order-items">
              <div class="item-preview" *ngFor="let item of order.items?.slice(0, 3)">
                <img [src]="item.productImage || 'https://via.placeholder.com/50'" [alt]="item.productName">
              </div>
              <span class="more-items" *ngIf="order.items && order.items.length > 3">
                +{{ order.items.length - 3 }} sản phẩm
              </span>
            </div>

            <div class="order-footer">
              <div class="order-total">
                <span>Tổng cộng:</span>
                <strong>{{ order.total | vndCurrency }}</strong>
              </div>
              <div class="order-actions">
                <a [routerLink]="['/orders', order.id]" class="btn btn-outline btn-sm">Xem chi tiết</a>
                <button class="btn btn-sm" *ngIf="order.status === 'PENDING'" (click)="cancelOrder(order)">
                  Hủy đơn
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="orders.length === 0 && !loading">
          <span class="material-icons">receipt_long</span>
          <h3>Chưa có đơn hàng nào</h3>
          <p>Hãy bắt đầu mua sắm để tạo đơn hàng</p>
          <a routerLink="/products" class="btn btn-primary">Mua sắm ngay</a>
        </div>

        <div class="pagination" *ngIf="totalPages > 1">
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
  `,
  styles: [`
    .orders-page { padding: 32px 0; }
    .page-title { font-size: 32px; margin-bottom: 32px; }

    .order-card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      margin-bottom: 16px;
      overflow: hidden;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: var(--background-color);
    }

    .order-info {
      display: flex;
      gap: 16px;
      align-items: center;

      .order-number { font-weight: 600; }
      .order-date { color: var(--text-secondary); font-size: 14px; }
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;

      &.status-pending { background: #fff3e0; color: #f57c00; }
      &.status-confirmed { background: #e3f2fd; color: #1976d2; }
      &.status-shipping { background: #f3e5f5; color: #7b1fa2; }
      &.status-completed { background: #e8f5e9; color: #388e3c; }
      &.status-cancelled { background: #ffebee; color: #d32f2f; }
    }

    .order-items {
      display: flex;
      gap: 8px;
      padding: 16px 20px;
      align-items: center;

      .item-preview img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
      }

      .more-items {
        font-size: 13px;
        color: var(--text-secondary);
      }
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-top: 1px solid var(--border-color);
    }

    .order-total {
      span { margin-right: 8px; color: var(--text-secondary); }
      strong { color: var(--primary-color); font-size: 18px; }
    }

    .order-actions {
      display: flex;
      gap: 8px;
    }

    .empty-state {
      text-align: center;
      padding: 80px;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);

      .material-icons { font-size: 64px; color: var(--text-secondary); margin-bottom: 16px; }
      p { color: var(--text-secondary); margin-bottom: 24px; }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;

  get visiblePages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getMyOrders(this.currentPage, 10).subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.orders || [];
          this.totalPages = res.pagination?.totalPages || 1;
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'Chờ xác nhận',
      'CONFIRMED': 'Đã xác nhận',
      'SHIPPING': 'Đang giao',
      'COMPLETED': 'Hoàn thành',
      'CANCELLED': 'Đã hủy'
    };
    return statusMap[status] || status;
  }

  cancelOrder(order: Order): void {
    if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
      this.orderService.cancelOrder(order.id).subscribe({
        next: (res) => {
          if (res.success) {
            alert('Hủy đơn hàng thành công!');
            this.loadOrders();
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Hủy đơn hàng thất bại!');
        }
      });
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }
}
