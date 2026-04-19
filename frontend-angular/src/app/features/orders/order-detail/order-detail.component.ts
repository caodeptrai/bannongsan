import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/services';
import { Order } from '../../../core/models';

@Component({
  selector: 'app-order-detail',
  template: `
    <div class="order-detail-page" *ngIf="order">
      <div class="container">
        <a routerLink="/orders" class="back-link">
          <span class="material-icons">arrow_back</span>
          Quay lại danh sách đơn hàng
        </a>

        <h1 class="page-title">Chi Tiết Đơn Hàng #{{ order.orderNumber }}</h1>

        <div class="order-status-banner" [ngClass]="'status-' + order.status.toLowerCase()">
          <span class="material-icons">{{ getStatusIcon() }}</span>
          <div class="status-info">
            <strong>{{ getStatusText() }}</strong>
            <span>{{ getStatusDescription() }}</span>
          </div>
        </div>

        <div class="order-grid">
          <div class="order-main">
            <!-- Order Items -->
            <div class="section-card">
              <h2>Sản phẩm đã đặt</h2>
              <div class="order-items">
                <div class="order-item" *ngFor="let item of order.items">
                  <img [src]="item.productImage || 'https://via.placeholder.com/80'" [alt]="item.productName">
                  <div class="item-info">
                    <h4>{{ item.productName }}</h4>
                    <span>{{ item.quantity }} x {{ item.price | vndCurrency }}</span>
                  </div>
                  <div class="item-total">{{ item.total | vndCurrency }}</div>
                </div>
              </div>
            </div>

            <!-- Shipping Info -->
            <div class="section-card">
              <h2>Thông tin giao hàng</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Người nhận</span>
                  <span class="value">{{ order.shippingName }}</span>
                </div>
                <div class="info-item">
                  <span class="label">Số điện thoại</span>
                  <span class="value">{{ order.shippingPhone }}</span>
                </div>
                <div class="info-item full">
                  <span class="label">Địa chỉ giao hàng</span>
                  <span class="value">{{ order.shippingAddress }}</span>
                </div>
                <div class="info-item full" *ngIf="order.shippingNote">
                  <span class="label">Ghi chú</span>
                  <span class="value">{{ order.shippingNote }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-sidebar">
            <div class="section-card">
              <h2>Tổng quan</h2>
              <div class="summary-rows">
                <div class="summary-row">
                  <span>Tạm tính</span>
                  <span>{{ order.subtotal | vndCurrency }}</span>
                </div>
                <div class="summary-row">
                  <span>Phí vận chuyển</span>
                  <span>{{ order.shippingFee | vndCurrency }}</span>
                </div>
                <div class="summary-row" *ngIf="order.discount > 0">
                  <span>Giảm giá</span>
                  <span class="text-success">-{{ order.discount | vndCurrency }}</span>
                </div>
                <div class="summary-row total">
                  <span>Tổng cộng</span>
                  <span>{{ order.total | vndCurrency }}</span>
                </div>
              </div>
            </div>

            <div class="section-card">
              <h2>Phương thức thanh toán</h2>
              <p class="payment-method">{{ getPaymentMethodText() }}</p>
            </div>

            <div class="section-card">
              <h2>Ngày đặt hàng</h2>
              <p class="order-date">{{ order.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>

            <button class="btn btn-danger" *ngIf="order.status === 'PENDING'" (click)="cancelOrder()">
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-detail-page { padding: 32px 0; }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--text-secondary);
      margin-bottom: 16px;

      .material-icons { font-size: 20px; }
      &:hover { color: var(--primary-color); }
    }

    .page-title { font-size: 28px; margin-bottom: 24px; }

    .order-status-banner {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
      border-radius: var(--border-radius);
      margin-bottom: 24px;
      color: white;

      .material-icons { font-size: 36px; }

      .status-info {
        strong { display: block; font-size: 18px; margin-bottom: 4px; }
        span { opacity: 0.9; font-size: 14px; }
      }

      &.status-pending { background: linear-gradient(135deg, #f57c00, #ff9800); }
      &.status-confirmed { background: linear-gradient(135deg, #1976d2, #42a5f5); }
      &.status-shipping { background: linear-gradient(135deg, #7b1fa2, #ab47bc); }
      &.status-completed { background: linear-gradient(135deg, #388e3c, #66bb6a); }
      &.status-cancelled { background: linear-gradient(135deg, #d32f2f, #ef5350); }
    }

    .order-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 24px;

      @media (max-width: 1024px) { grid-template-columns: 1fr; }
    }

    .section-card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 20px;
      margin-bottom: 16px;

      h2 {
        font-size: 16px;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }

    .order-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child { border-bottom: none; }

      img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }

      .item-info {
        flex: 1;
        h4 { font-size: 15px; margin-bottom: 4px; }
        span { font-size: 14px; color: var(--text-secondary); }
      }

      .item-total { font-weight: 600; font-size: 16px; }
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      .info-item {
        &.full { grid-column: 1 / -1; }
        .label { display: block; font-size: 13px; color: var(--text-secondary); margin-bottom: 4px; }
        .value { font-weight: 500; }
      }
    }

    .summary-rows {
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 15px;

        &.total {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 2px solid var(--border-color);
          font-size: 18px;
          font-weight: 700;
          span:last-child { color: var(--primary-color); }
        }
      }
    }

    .payment-method, .order-date {
      font-weight: 500;
      color: var(--text-color);
    }
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    if (orderId) {
      this.loadOrder(orderId);
    }
  }

  loadOrder(orderId: string): void {
    this.orderService.getMyOrderById(orderId).subscribe({
      next: (res) => {
        if (res.success) {
          this.order = res.data;
        }
      },
      error: () => {
        this.router.navigate(['/orders']);
      }
    });
  }

  getStatusIcon(): string {
    const icons: { [key: string]: string } = {
      'PENDING': 'schedule',
      'CONFIRMED': 'check_circle',
      'SHIPPING': 'local_shipping',
      'COMPLETED': 'done_all',
      'CANCELLED': 'cancel'
    };
    return icons[this.order?.status || ''] || 'help';
  }

  getStatusText(): string {
    const texts: { [key: string]: string } = {
      'PENDING': 'Chờ xác nhận',
      'CONFIRMED': 'Đã xác nhận',
      'SHIPPING': 'Đang giao hàng',
      'COMPLETED': 'Hoàn thành',
      'CANCELLED': 'Đã hủy'
    };
    return texts[this.order?.status || ''] || '';
  }

  getStatusDescription(): string {
    const descriptions: { [key: string]: string } = {
      'PENDING': 'Đơn hàng đang chờ được xác nhận',
      'CONFIRMED': 'Đơn hàng đã được xác nhận và đang chuẩn bị',
      'SHIPPING': 'Đơn hàng đang được giao đến bạn',
      'COMPLETED': 'Đơn hàng đã được giao thành công',
      'CANCELLED': 'Đơn hàng đã bị hủy'
    };
    return descriptions[this.order?.status || ''] || '';
  }

  getPaymentMethodText(): string {
    const methods: { [key: string]: string } = {
      'COD': 'Thanh toán khi nhận hàng (COD)',
      'BANK_TRANSFER': 'Chuyển khoản ngân hàng',
      'MOMO': 'Ví MoMo',
      'ZALOPAY': 'ZaloPay'
    };
    return methods[this.order?.paymentMethod || ''] || '';
  }

  cancelOrder(): void {
    if (!this.order) return;
    if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) {
      this.orderService.cancelOrder(this.order.id).subscribe({
        next: (res) => {
          if (res.success) {
            alert('Hủy đơn hàng thành công!');
            this.loadOrder(this.order!.id);
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Hủy đơn hàng thất bại!');
        }
      });
    }
  }
}
