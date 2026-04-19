import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services';
import { Order } from '../../../core/models';

@Component({
  selector: 'app-admin-orders',
  template: `
    <div class="orders-page">
      <div class="page-header"><h1>Quản lý Đơn hàng</h1></div>

      <div class="toolbar">
        <div class="search-box">
          <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="loadOrders()" placeholder="Tìm mã đơn, tên khách...">
          <button (click)="loadOrders()"><span class="material-icons">search</span></button>
        </div>
        <select [(ngModel)]="filterStatus" (change)="loadOrders()" class="form-control">
          <option value="">Tất cả trạng thái</option>
          <option value="PENDING">Chờ xác nhận</option>
          <option value="CONFIRMED">Đã xác nhận</option>
          <option value="SHIPPING">Đang giao</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td><strong>{{ order.orderNumber }}</strong></td>
              <td>
                <div>{{ order.shippingName }}</div>
                <small class="text-secondary">{{ order.shippingPhone }}</small>
              </td>
              <td>{{ order._count?.items || 0 }} sản phẩm</td>
              <td class="price">{{ order.total | vndCurrency }}</td>
              <td><span class="badge" [ngClass]="getStatusClass(order.status)">{{ getStatusText(order.status) }}</span></td>
              <td>{{ order.createdAt | date:'dd/MM/yyyy' }}</td>
              <td>
                <button class="action-btn" (click)="viewOrder(order)" title="Xem"><span class="material-icons">visibility</span></button>
                <button class="action-btn" (click)="updateStatus(order)" title="Cập nhật trạng thái"><span class="material-icons">edit</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button *ngFor="let p of pages" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p }}</button>
      </div>

      <!-- Order Detail Modal -->
      <div class="modal-backdrop" *ngIf="showDetailModal" (click)="closeDetailModal()">
        <div class="modal large" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Chi tiết đơn hàng #{{ selectedOrder?.orderNumber }}</h2>
            <button class="close-btn" (click)="closeDetailModal()"><span class="material-icons">close</span></button>
          </div>
          <div class="modal-body" *ngIf="selectedOrder">
            <div class="order-detail-grid">
              <div class="detail-section">
                <h3>Thông tin khách hàng</h3>
                <p><strong>Tên:</strong> {{ selectedOrder.shippingName }}</p>
                <p><strong>Điện thoại:</strong> {{ selectedOrder.shippingPhone }}</p>
                <p><strong>Địa chỉ:</strong> {{ selectedOrder.shippingAddress }}</p>
              </div>
              <div class="detail-section">
                <h3>Trạng thái</h3>
                <span class="badge large" [ngClass]="getStatusClass(selectedOrder.status)">{{ getStatusText(selectedOrder.status) }}</span>
              </div>
            </div>
            <div class="detail-section">
              <h3>Sản phẩm</h3>
              <div class="order-items">
                <div class="order-item" *ngFor="let item of selectedOrder.items">
                  <span>{{ item.productName }} x{{ item.quantity }}</span>
                  <strong>{{ item.total | vndCurrency }}</strong>
                </div>
              </div>
              <div class="order-total">
                <span>Tổng cộng:</span>
                <strong>{{ selectedOrder.total | vndCurrency }}</strong>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeDetailModal()">Đóng</button>
          </div>
        </div>
      </div>

      <!-- Update Status Modal -->
      <div class="modal-backdrop" *ngIf="showStatusModal" (click)="closeStatusModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Cập nhật trạng thái</h2>
            <button class="close-btn" (click)="closeStatusModal()"><span class="material-icons">close</span></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Trạng thái mới</label>
              <select [(ngModel)]="newStatus" class="form-control">
                <option value="PENDING">Chờ xác nhận</option>
                <option value="CONFIRMED">Đã xác nhận</option>
                <option value="SHIPPING">Đang giao</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Hủy đơn</option>
              </select>
            </div>
            <div class="form-group" *ngIf="newStatus === 'CANCELLED'">
              <label>Lý do hủy</label>
              <textarea [(ngModel)]="cancelReason" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="closeStatusModal()">Hủy</button>
            <button class="btn btn-primary" (click)="saveStatus()">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; h1 { font-size: 24px; } }
    .toolbar { display: flex; gap: 16px; margin-bottom: 16px; }
    .search-box { display: flex; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; input { border: none; padding: 10px 16px; width: 280px; } button { background: var(--primary-color); border: none; padding: 10px; color: white; cursor: pointer; } }
    .table-container { background: white; border-radius: 12px; box-shadow: var(--shadow); overflow-x: auto; }
    table { th, td { padding: 12px 16px; } }
    .price { color: var(--primary-color); font-weight: 600; }
    .action-btn { background: none; border: none; padding: 6px; cursor: pointer; color: var(--text-secondary); &:hover { color: var(--primary-color); } .material-icons { font-size: 20px; } }
    .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: white; border-radius: 12px; width: 700px; max-width: 95vw; }
    .modal-header { padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; h2 { font-size: 18px; margin: 0; } }
    .close-btn { background: none; border: none; cursor: pointer; .material-icons { font-size: 24px; } }
    .modal-body { padding: 20px; max-height: 60vh; overflow-y: auto; }
    .modal-footer { padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px; }
    .order-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .detail-section { h3 { font-size: 14px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-color); } p { margin-bottom: 8px; font-size: 14px; } }
    .order-items { .order-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-color); &:last-child { border-bottom: none; } } }
    .order-total { display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 2px solid var(--primary-color); font-size: 16px; strong { color: var(--primary-color); font-size: 18px; } }
    .badge.large { padding: 6px 16px; font-size: 14px; }
  `]
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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void { this.loadOrders(); }

  loadOrders(): void {
    this.orderService.getAllOrders({ page: this.currentPage, limit: 20, search: this.searchQuery, status: this.filterStatus }).subscribe({
      next: (res) => { if (res.success) { this.orders = res.orders || []; this.totalPages = res.pagination?.totalPages || 1; } }
    });
  }

  goToPage(page: number): void { this.currentPage = page; this.loadOrders(); }

  getStatusText(status: string): string { const map: any = { 'PENDING': 'Chờ xác nhận', 'CONFIRMED': 'Đã xác nhận', 'SHIPPING': 'Đang giao', 'COMPLETED': 'Hoàn thành', 'CANCELLED': 'Đã hủy' }; return map[status] || status; }
  getStatusClass(status: string): string { const map: any = { 'PENDING': 'badge-warning', 'CONFIRMED': 'badge-primary', 'SHIPPING': 'badge-info', 'COMPLETED': 'badge-success', 'CANCELLED': 'badge-error' }; return map[status] || ''; }

  viewOrder(order: Order): void { this.selectedOrder = order; this.orderService.getOrderDetail(order.id).subscribe({ next: (res) => { if (res.success) this.selectedOrder = res.data; } }); this.showDetailModal = true; }
  closeDetailModal(): void { this.showDetailModal = false; this.selectedOrder = null; }

  updateStatus(order: Order): void { this.selectedOrder = order; this.newStatus = order.status; this.cancelReason = ''; this.showStatusModal = true; }
  closeStatusModal(): void { this.showStatusModal = false; }

  saveStatus(): void {
    if (!this.selectedOrder) return;
    this.orderService.updateOrderStatus(this.selectedOrder.id, this.newStatus, this.cancelReason).subscribe({
      next: () => { this.loadOrders(); this.closeStatusModal(); alert('Cập nhật thành công!'); },
      error: (err) => alert(err.error?.message || 'Lỗi!')
    });
  }
}
