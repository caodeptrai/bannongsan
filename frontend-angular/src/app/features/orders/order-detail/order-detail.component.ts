import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService, UiFeedbackService } from '../../../core/services';
import { Order } from '../../../core/models';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private feedback: UiFeedbackService
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

  async cancelOrder(): Promise<void> {
    if (!this.order) return;
    const confirmed = await this.feedback.confirm({
      title: 'Hủy đơn hàng',
      message: `Bạn có chắc muốn hủy đơn hàng #${this.order.orderNumber}?`,
      confirmText: 'Hủy đơn',
      destructive: true,
    });
    if (!confirmed) return;

    this.orderService.cancelOrder(this.order.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.feedback.success('Hủy đơn hàng thành công.');
          this.loadOrder(this.order!.id);
        }
      },
      error: (err) => {
        this.feedback.error(err.error?.message || 'Hủy đơn hàng thất bại.');
      }
    });
  }
}
