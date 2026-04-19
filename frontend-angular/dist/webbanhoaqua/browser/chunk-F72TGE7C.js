import {
  OrderService,
  SharedModule,
  VndCurrencyPipe
} from "./chunk-S4GDKINQ.js";
import {
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GBTPURO4.js";

// src/app/features/orders/orders.component.ts
var _c0 = (a0) => ["/orders", a0];
function OrdersComponent_div_4_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "img", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r1.productImage || "https://via.placeholder.com/50", \u0275\u0275sanitizeUrl)("alt", item_r1.productName);
  }
}
function OrdersComponent_div_4_div_1_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", order_r2.items.length - 3, " s\u1EA3n ph\u1EA9m ");
  }
}
function OrdersComponent_div_4_div_1_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function OrdersComponent_div_4_div_1_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const order_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.cancelOrder(order_r2));
    });
    \u0275\u0275text(1, " H\u1EE7y \u0111\u01A1n ");
    \u0275\u0275elementEnd();
  }
}
function OrdersComponent_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 12);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 14);
    \u0275\u0275template(11, OrdersComponent_div_4_div_1_div_11_Template, 2, 2, "div", 15)(12, OrdersComponent_div_4_div_1_span_12_Template, 2, 1, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17)(14, "div", 18)(15, "span");
    \u0275\u0275text(16, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 19)(21, "a", 20);
    \u0275\u0275text(22, "Xem chi ti\u1EBFt");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, OrdersComponent_div_4_div_1_button_23_Template, 2, 0, "button", 21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0110\u01A1n h\xE0ng #", order_r2.orderNumber, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 9, order_r2.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-" + order_r2.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusText(order_r2.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", order_r2.items == null ? null : order_r2.items.slice(0, 3));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", order_r2.items && order_r2.items.length > 3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 12, order_r2.total));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c0, order_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", order_r2.status === "PENDING");
  }
}
function OrdersComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, OrdersComponent_div_4_div_1_Template, 24, 16, "div", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.orders);
  }
}
function OrdersComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span", 27);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 \u0111\u01A1n h\xE0ng n\xE0o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "H\xE3y b\u1EAFt \u0111\u1EA7u mua s\u1EAFm \u0111\u1EC3 t\u1EA1o \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 28);
    \u0275\u0275text(8, "Mua s\u1EAFm ngay");
    \u0275\u0275elementEnd()();
  }
}
function OrdersComponent_div_6_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function OrdersComponent_div_6_button_4_Template_button_click_0_listener() {
      const page_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToPage(page_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", page_r7 === ctx_r3.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r7, " ");
  }
}
function OrdersComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "button", 30);
    \u0275\u0275listener("click", function OrdersComponent_div_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.currentPage - 1));
    });
    \u0275\u0275elementStart(2, "span", 27);
    \u0275\u0275text(3, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, OrdersComponent_div_6_button_4_Template, 2, 3, "button", 31);
    \u0275\u0275elementStart(5, "button", 30);
    \u0275\u0275listener("click", function OrdersComponent_div_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.currentPage + 1));
    });
    \u0275\u0275elementStart(6, "span", 27);
    \u0275\u0275text(7, "chevron_right");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.visiblePages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.currentPage === ctx_r3.totalPages);
  }
}
var OrdersComponent = class _OrdersComponent {
  orderService;
  orders = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  get visiblePages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++)
      pages.push(i);
    return pages;
  }
  constructor(orderService) {
    this.orderService = orderService;
  }
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.loading = true;
    this.orderService.getMyOrders(this.currentPage, 10).subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.orders || [];
          this.totalPages = res.pagination?.totalPages || 1;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  getStatusText(status) {
    const statusMap = {
      "PENDING": "Ch\u1EDD x\xE1c nh\u1EADn",
      "CONFIRMED": "\u0110\xE3 x\xE1c nh\u1EADn",
      "SHIPPING": "\u0110ang giao",
      "COMPLETED": "Ho\xE0n th\xE0nh",
      "CANCELLED": "\u0110\xE3 h\u1EE7y"
    };
    return statusMap[status] || status;
  }
  cancelOrder(order) {
    if (confirm("B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n h\u1EE7y \u0111\u01A1n h\xE0ng n\xE0y?")) {
      this.orderService.cancelOrder(order.id).subscribe({
        next: (res) => {
          if (res.success) {
            alert("H\u1EE7y \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!");
            this.loadOrders();
          }
        },
        error: (err) => {
          alert(err.error?.message || "H\u1EE7y \u0111\u01A1n h\xE0ng th\u1EA5t b\u1EA1i!");
        }
      });
    }
  }
  goToPage(page) {
    this.currentPage = page;
    this.loadOrders();
  }
  static \u0275fac = function OrdersComponent_Factory(t) {
    return new (t || _OrdersComponent)(\u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdersComponent, selectors: [["app-orders"]], decls: 7, vars: 3, consts: [[1, "orders-page"], [1, "container"], [1, "page-title"], ["class", "orders-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], [1, "orders-list"], ["class", "order-card", 4, "ngFor", "ngForOf"], [1, "order-card"], [1, "order-header"], [1, "order-info"], [1, "order-number"], [1, "order-date"], [1, "status-badge", 3, "ngClass"], [1, "order-items"], ["class", "item-preview", 4, "ngFor", "ngForOf"], ["class", "more-items", 4, "ngIf"], [1, "order-footer"], [1, "order-total"], [1, "order-actions"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], ["class", "btn btn-sm", 3, "click", 4, "ngIf"], [1, "item-preview"], [3, "src", "alt"], [1, "more-items"], [1, "btn", "btn-sm", 3, "click"], [1, "empty-state"], [1, "material-icons"], ["routerLink", "/products", 1, "btn", "btn-primary"], [1, "pagination"], [3, "click", "disabled"], [3, "active", "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function OrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "L\u1ECBch S\u1EED \u0110\u01A1n H\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, OrdersComponent_div_4_Template, 2, 1, "div", 3)(5, OrdersComponent_div_5_Template, 9, 0, "div", 4)(6, OrdersComponent_div_6_Template, 8, 3, "div", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.orders.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.orders.length === 0 && !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.totalPages > 1);
    }
  }, dependencies: [RouterLink, NgClass, NgForOf, NgIf, DatePipe, VndCurrencyPipe], styles: ["\n\n.orders-page[_ngcontent-%COMP%] {\n  padding: 32px 0;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 32px;\n}\n.order-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  margin-bottom: 16px;\n  overflow: hidden;\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  background: var(--background-color);\n}\n.order-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.order-info[_ngcontent-%COMP%]   .order-number[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.order-info[_ngcontent-%COMP%]   .order-date[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-badge.status-pending[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.status-badge.status-confirmed[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.status-badge.status-shipping[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n.status-badge.status-completed[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #388e3c;\n}\n.status-badge.status-cancelled[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.order-items[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 16px 20px;\n  align-items: center;\n}\n.order-items[_ngcontent-%COMP%]   .item-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.order-items[_ngcontent-%COMP%]   .more-items[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.order-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-top: 1px solid var(--border-color);\n}\n.order-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  color: var(--text-secondary);\n}\n.order-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  font-size: 18px;\n}\n.order-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px;\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n/*# sourceMappingURL=orders.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdersComponent, { className: "OrdersComponent", filePath: "src\\app\\features\\orders\\orders.component.ts", lineNumber: 160 });
})();

// src/app/features/orders/orders.module.ts
var routes = [
  { path: "", component: OrdersComponent },
  { path: ":id", loadChildren: () => import("./chunk-O4T6OD7C.js").then((m) => m.OrderDetailModule) }
];
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
//# sourceMappingURL=chunk-F72TGE7C.js.map
