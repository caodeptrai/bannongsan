import { Component, OnInit } from '@angular/core';
import { OrderService, UiFeedbackService } from '../../core/services';
import { Order } from '../../core/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
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

  constructor(
    private orderService: OrderService,
    private feedback: UiFeedbackService
  ) {}

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

  async cancelOrder(order: Order): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Hủy đơn hàng',
      message: `Bạn có chắc muốn hủy đơn hàng #${order.orderNumber}?`,
      confirmText: 'Hủy đơn',
      destructive: true,
    });
    if (!confirmed) return;

    this.orderService.cancelOrder(order.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.feedback.success('Hủy đơn hàng thành công.');
          this.loadOrders();
        }
      },
      error: (err) => {
        this.feedback.error(err.error?.message || 'Hủy đơn hàng thất bại.');
      }
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }
}
