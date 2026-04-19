import {
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  OrderService,
  SelectControlValueAccessor,
  SharedModule,
  VndCurrencyPipe,
  ɵNgSelectMultipleOption
} from "./chunk-S4GDKINQ.js";
import {
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/admin/orders/admin-orders.component.ts
function AdminOrdersComponent_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 19);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 20);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td")(21, "button", 21);
    \u0275\u0275listener("click", function AdminOrdersComponent_tr_42_Template_button_click_21_listener() {
      const order_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewOrder(order_r2));
    });
    \u0275\u0275elementStart(22, "span", 6);
    \u0275\u0275text(23, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 22);
    \u0275\u0275listener("click", function AdminOrdersComponent_tr_42_Template_button_click_24_listener() {
      const order_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateStatus(order_r2));
    });
    \u0275\u0275elementStart(25, "span", 6);
    \u0275\u0275text(26, "edit");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r2.orderNumber);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r2.shippingName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r2.shippingPhone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (order_r2._count == null ? null : order_r2._count.items) || 0, " s\u1EA3n ph\u1EA9m");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 8, order_r2.total));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(order_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusText(order_r2.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 10, order_r2.createdAt, "dd/MM/yyyy"));
  }
}
function AdminOrdersComponent_div_43_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_43_button_1_Template_button_click_0_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(p_r5));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", p_r5 === ctx_r2.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5);
  }
}
function AdminOrdersComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275template(1, AdminOrdersComponent_div_43_button_1_Template, 2, 3, "button", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.pages);
  }
}
function AdminOrdersComponent_div_44_div_8_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r7.productName, " x", item_r7.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, item_r7.total));
  }
}
function AdminOrdersComponent_div_44_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34)(3, "h3");
    \u0275\u0275text(4, "Th\xF4ng tin kh\xE1ch h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "T\xEAn:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p")(10, "strong");
    \u0275\u0275text(11, "\u0110i\u1EC7n tho\u1EA1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p")(14, "strong");
    \u0275\u0275text(15, "\u0110\u1ECBa ch\u1EC9:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 34)(18, "h3");
    \u0275\u0275text(19, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 35);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 34)(23, "h3");
    \u0275\u0275text(24, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 36);
    \u0275\u0275template(26, AdminOrdersComponent_div_44_div_8_div_26_Template, 6, 5, "div", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 38)(28, "span");
    \u0275\u0275text(29, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "vndCurrency");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedOrder.shippingName, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedOrder.shippingPhone, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedOrder.shippingAddress, "");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(ctx_r2.selectedOrder.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusText(ctx_r2.selectedOrder.status));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r2.selectedOrder.items);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 7, ctx_r2.selectedOrder.total));
  }
}
function AdminOrdersComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_44_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetailModal());
    });
    \u0275\u0275elementStart(1, "div", 26);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_44_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 27)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 28);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_44_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetailModal());
    });
    \u0275\u0275elementStart(6, "span", 6);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, AdminOrdersComponent_div_44_div_8_Template, 33, 9, "div", 29);
    \u0275\u0275elementStart(9, "div", 30)(10, "button", 31);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_44_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDetailModal());
    });
    \u0275\u0275text(11, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Chi ti\u1EBFt \u0111\u01A1n h\xE0ng #", ctx_r2.selectedOrder == null ? null : ctx_r2.selectedOrder.orderNumber, "");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.selectedOrder);
  }
}
function AdminOrdersComponent_div_45_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "label");
    \u0275\u0275text(2, "L\xFD do h\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 45);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_div_45_div_23_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.cancelReason, $event) || (ctx_r2.cancelReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.cancelReason);
  }
}
function AdminOrdersComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_45_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeStatusModal());
    });
    \u0275\u0275elementStart(1, "div", 40);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_45_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 27)(3, "h2");
    \u0275\u0275text(4, "C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 28);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_45_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeStatusModal());
    });
    \u0275\u0275elementStart(6, "span", 6);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 32)(9, "div", 41)(10, "label");
    \u0275\u0275text(11, "Tr\u1EA1ng th\xE1i m\u1EDBi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 42);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_div_45_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStatus, $event) || (ctx_r2.newStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(13, "option", 9);
    \u0275\u0275text(14, "Ch\u1EDD x\xE1c nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 10);
    \u0275\u0275text(16, "\u0110\xE3 x\xE1c nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 11);
    \u0275\u0275text(18, "\u0110ang giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 12);
    \u0275\u0275text(20, "Ho\xE0n th\xE0nh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 13);
    \u0275\u0275text(22, "H\u1EE7y \u0111\u01A1n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(23, AdminOrdersComponent_div_45_div_23_Template, 4, 1, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 30)(25, "button", 31);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_45_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeStatusModal());
    });
    \u0275\u0275text(26, "H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 44);
    \u0275\u0275listener("click", function AdminOrdersComponent_div_45_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveStatus());
    });
    \u0275\u0275text(28, "L\u01B0u");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStatus);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r2.newStatus === "CANCELLED");
  }
}
var AdminOrdersComponent = class _AdminOrdersComponent {
  orderService;
  orders = [];
  searchQuery = "";
  filterStatus = "";
  currentPage = 1;
  totalPages = 1;
  showDetailModal = false;
  showStatusModal = false;
  selectedOrder = null;
  newStatus = "";
  cancelReason = "";
  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  constructor(orderService) {
    this.orderService = orderService;
  }
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.orderService.getAllOrders({ page: this.currentPage, limit: 20, search: this.searchQuery, status: this.filterStatus }).subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.orders || [];
          this.totalPages = res.pagination?.totalPages || 1;
        }
      }
    });
  }
  goToPage(page) {
    this.currentPage = page;
    this.loadOrders();
  }
  getStatusText(status) {
    const map = { "PENDING": "Ch\u1EDD x\xE1c nh\u1EADn", "CONFIRMED": "\u0110\xE3 x\xE1c nh\u1EADn", "SHIPPING": "\u0110ang giao", "COMPLETED": "Ho\xE0n th\xE0nh", "CANCELLED": "\u0110\xE3 h\u1EE7y" };
    return map[status] || status;
  }
  getStatusClass(status) {
    const map = { "PENDING": "badge-warning", "CONFIRMED": "badge-primary", "SHIPPING": "badge-info", "COMPLETED": "badge-success", "CANCELLED": "badge-error" };
    return map[status] || "";
  }
  viewOrder(order) {
    this.selectedOrder = order;
    this.orderService.getOrderDetail(order.id).subscribe({ next: (res) => {
      if (res.success)
        this.selectedOrder = res.data;
    } });
    this.showDetailModal = true;
  }
  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedOrder = null;
  }
  updateStatus(order) {
    this.selectedOrder = order;
    this.newStatus = order.status;
    this.cancelReason = "";
    this.showStatusModal = true;
  }
  closeStatusModal() {
    this.showStatusModal = false;
  }
  saveStatus() {
    if (!this.selectedOrder)
      return;
    this.orderService.updateOrderStatus(this.selectedOrder.id, this.newStatus, this.cancelReason).subscribe({
      next: () => {
        this.loadOrders();
        this.closeStatusModal();
        alert("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!");
      },
      error: (err) => alert(err.error?.message || "L\u1ED7i!")
    });
  }
  static \u0275fac = function AdminOrdersComponent_Factory(t) {
    return new (t || _AdminOrdersComponent)(\u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOrdersComponent, selectors: [["app-admin-orders"]], decls: 46, vars: 6, consts: [[1, "orders-page"], [1, "page-header"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "T\xECm m\xE3 \u0111\u01A1n, t\xEAn kh\xE1ch...", 3, "ngModelChange", "keyup.enter", "ngModel"], [3, "click"], [1, "material-icons"], [1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "PENDING"], ["value", "CONFIRMED"], ["value", "SHIPPING"], ["value", "COMPLETED"], ["value", "CANCELLED"], [1, "table-container"], [4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], ["class", "modal-backdrop", 3, "click", 4, "ngIf"], [1, "text-secondary"], [1, "price"], [1, "badge", 3, "ngClass"], ["title", "Xem", 1, "action-btn", 3, "click"], ["title", "C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i", 1, "action-btn", 3, "click"], [1, "pagination"], [3, "active", "click", 4, "ngFor", "ngForOf"], [1, "modal-backdrop", 3, "click"], [1, "modal", "large", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], ["class", "modal-body", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"], [1, "modal-body"], [1, "order-detail-grid"], [1, "detail-section"], [1, "badge", "large", 3, "ngClass"], [1, "order-items"], ["class", "order-item", 4, "ngFor", "ngForOf"], [1, "order-total"], [1, "order-item"], [1, "modal", 3, "click"], [1, "form-group"], [1, "form-control", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click"], ["rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"]], template: function AdminOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Qu\u1EA3n l\xFD \u0110\u01A1n h\xE0ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function AdminOrdersComponent_Template_input_keyup_enter_6_listener() {
        return ctx.loadOrders();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 5);
      \u0275\u0275listener("click", function AdminOrdersComponent_Template_button_click_7_listener() {
        return ctx.loadOrders();
      });
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function AdminOrdersComponent_Template_select_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filterStatus, $event) || (ctx.filterStatus = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminOrdersComponent_Template_select_change_10_listener() {
        return ctx.loadOrders();
      });
      \u0275\u0275elementStart(11, "option", 8);
      \u0275\u0275text(12, "T\u1EA5t c\u1EA3 tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "option", 9);
      \u0275\u0275text(14, "Ch\u1EDD x\xE1c nh\u1EADn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 10);
      \u0275\u0275text(16, "\u0110\xE3 x\xE1c nh\u1EADn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "option", 11);
      \u0275\u0275text(18, "\u0110ang giao");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "option", 12);
      \u0275\u0275text(20, "Ho\xE0n th\xE0nh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 13);
      \u0275\u0275text(22, "\u0110\xE3 h\u1EE7y");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 14)(24, "table")(25, "thead")(26, "tr")(27, "th");
      \u0275\u0275text(28, "M\xE3 \u0111\u01A1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th");
      \u0275\u0275text(30, "Kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th");
      \u0275\u0275text(32, "S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th");
      \u0275\u0275text(34, "T\u1ED5ng ti\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "th");
      \u0275\u0275text(36, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "th");
      \u0275\u0275text(38, "Ng\xE0y \u0111\u1EB7t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "th");
      \u0275\u0275text(40, "Thao t\xE1c");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "tbody");
      \u0275\u0275template(42, AdminOrdersComponent_tr_42_Template, 27, 13, "tr", 15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(43, AdminOrdersComponent_div_43_Template, 2, 1, "div", 16)(44, AdminOrdersComponent_div_44_Template, 12, 2, "div", 17)(45, AdminOrdersComponent_div_45_Template, 29, 2, "div", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filterStatus);
      \u0275\u0275advance(32);
      \u0275\u0275property("ngForOf", ctx.orders);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.totalPages > 1);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showDetailModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showStatusModal);
    }
  }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe, VndCurrencyPipe], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  padding: 10px 16px;\n  width: 280px;\n}\n.search-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: var(--primary-color);\n  border: none;\n  padding: 10px;\n  color: white;\n  cursor: pointer;\n}\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: var(--shadow);\n  overflow-x: auto;\n}\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.price[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  font-weight: 600;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 6px;\n  cursor: pointer;\n  color: var(--text-secondary);\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  color: var(--primary-color);\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 700px;\n  max-width: 95vw;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n.close-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-height: 60vh;\n  overflow-y: auto;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.order-detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-bottom: 24px;\n}\n.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-bottom: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--border-color);\n}\n.detail-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 14px;\n}\n.order-items[_ngcontent-%COMP%]   .order-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.order-items[_ngcontent-%COMP%]   .order-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 2px solid var(--primary-color);\n  font-size: 16px;\n}\n.order-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  font-size: 18px;\n}\n.badge.large[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  font-size: 14px;\n}\n/*# sourceMappingURL=admin-orders.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOrdersComponent, { className: "AdminOrdersComponent", filePath: "src\\app\\features\\admin\\orders\\admin-orders.component.ts", lineNumber: 155 });
})();

// src/app/features/admin/orders/orders.module.ts
var routes = [{ path: "", component: AdminOrdersComponent }];
var OrdersModule = class _OrdersModule {
  static \u0275fac = function OrdersModule_Factory(t) {
    return new (t || _OrdersModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _OrdersModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  OrdersModule
};
//# sourceMappingURL=chunk-FFPZ6H6F.js.map
