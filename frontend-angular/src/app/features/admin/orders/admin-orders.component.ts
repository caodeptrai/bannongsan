import { Component, OnInit } from '@angular/core';
import { OrderService, UiFeedbackService } from '../../../core/services';
import { Order } from '../../../core/models';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  searchQuery = '';
  filterStatus = '';
  currentPage = 1;
  totalPages = 1;
  showDetailModal = false;
  showStatusModal = false;
  selectedOrder: Order | null = null;
  newStatus = '';
  cancelReason = '';

  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  constructor(
    private orderService: OrderService,
    private feedback: UiFeedbackService
  ) {}

  ngOnInit(): void { this.loadOrders(); }

  loadOrders(): void {
    this.orderService.getAllOrders({ page: this.currentPage, limit: 20, search: this.searchQuery, status: this.filterStatus }).subscribe({
      next: (res) => { if (res.success) { this.orders = res.orders || []; this.totalPages = res.pagination?.totalPages || 1; } }
    });
  }

  goToPage(page: number): void { this.currentPage = page; this.loadOrders(); }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadOrders();
  }

  getStatusText(status: string): string { const map: any = { 'PENDING': 'Chờ xác nhận', 'CONFIRMED': 'Đã xác nhận', 'SHIPPING': 'Đang giao', 'COMPLETED': 'Hoàn thành', 'CANCELLED': 'Đã hủy' }; return map[status] || status; }
  getStatusClass(status: string): string { const map: any = { 'PENDING': 'badge-warning', 'CONFIRMED': 'badge-primary', 'SHIPPING': 'badge-info', 'COMPLETED': 'badge-success', 'CANCELLED': 'badge-error' }; return map[status] || ''; }

  viewOrder(order: Order): void { this.selectedOrder = order; this.orderService.getOrderDetail(order.id).subscribe({ next: (res) => { if (res.success) this.selectedOrder = res.data; } }); this.showDetailModal = true; }
  closeDetailModal(): void { this.showDetailModal = false; this.selectedOrder = null; }

  updateStatus(order: Order): void { this.selectedOrder = order; this.newStatus = order.status; this.cancelReason = ''; this.showStatusModal = true; }
  closeStatusModal(): void { this.showStatusModal = false; }

  saveStatus(): void {
    if (!this.selectedOrder) return;
    this.orderService.updateOrderStatus(this.selectedOrder.id, this.newStatus, this.cancelReason).subscribe({
      next: () => {
        this.loadOrders();
        this.closeStatusModal();
        this.feedback.success('Cập nhật trạng thái đơn hàng thành công.');
      },
      error: (err) => this.feedback.error(err.error?.message || 'Không thể cập nhật trạng thái đơn hàng.')
    });
  }
}
