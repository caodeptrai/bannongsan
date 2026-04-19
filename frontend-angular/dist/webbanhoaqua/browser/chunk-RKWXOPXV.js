import {
  OrderService,
  SharedModule,
  UserService,
  VndCurrencyPipe
} from "./chunk-S4GDKINQ.js";
import {
  NgClass,
  NgForOf,
  NgIf,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GBTPURO4.js";

// src/app/features/admin/dashboard/dashboard.component.ts
function DashboardComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 28)(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 30);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r1.orderNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r1.user == null ? null : order_r1.user.fullName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, order_r1.total));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-" + order_r1.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(order_r1.status);
  }
}
function DashboardComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1, " Ch\u01B0a c\xF3 \u0111\u01A1n h\xE0ng n\xE0o ");
    \u0275\u0275elementEnd();
  }
}
var DashboardComponent = class _DashboardComponent {
  userService;
  orderService;
  stats = null;
  constructor(userService, orderService) {
    this.userService = userService;
    this.orderService = orderService;
  }
  ngOnInit() {
    this.loadStats();
  }
  loadStats() {
    this.userService.getDashboardStats().subscribe({
      next: (res) => {
        if (res.success) {
          this.stats = res.data;
        }
      }
    });
  }
  static \u0275fac = function DashboardComponent_Factory(t) {
    return new (t || _DashboardComponent)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 74, vars: 8, consts: [[1, "dashboard"], [1, "page-title"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon", "blue"], [1, "material-icons"], [1, "stat-info"], [1, "stat-value"], [1, "stat-label"], [1, "stat-icon", "green"], [1, "stat-icon", "orange"], [1, "stat-icon", "purple"], [1, "dashboard-grid"], [1, "dashboard-card", "recent-orders"], [1, "orders-list"], ["class", "order-item", 4, "ngFor", "ngForOf"], ["class", "empty", 4, "ngIf"], ["routerLink", "/admin/orders", 1, "view-all"], [1, "dashboard-card", "quick-actions"], [1, "actions-list"], ["routerLink", "/admin/products", 1, "action-item"], ["routerLink", "/admin/categories", 1, "action-item"], ["routerLink", "/admin/orders", 1, "action-item"], ["routerLink", "/admin/statistics", 1, "action-item"], [1, "order-item"], [1, "order-info"], [1, "order-number"], [1, "order-customer"], [1, "order-meta"], [1, "order-total"], [1, "order-status", 3, "ngClass"], [1, "empty"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "T\u1ED5ng Quan Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "span", 5);
      \u0275\u0275text(7, "people");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6)(9, "span", 7);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12, "Ng\u01B0\u1EDDi d\xF9ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 3)(14, "div", 9)(15, "span", 5);
      \u0275\u0275text(16, "inventory_2");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 6)(18, "span", 7);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 8);
      \u0275\u0275text(21, "S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 3)(23, "div", 10)(24, "span", 5);
      \u0275\u0275text(25, "receipt_long");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 6)(27, "span", 7);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span", 8);
      \u0275\u0275text(30, "\u0110\u01A1n h\xE0ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 3)(32, "div", 11)(33, "span", 5);
      \u0275\u0275text(34, "attach_money");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 6)(36, "span", 7);
      \u0275\u0275text(37);
      \u0275\u0275pipe(38, "vndCurrency");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "span", 8);
      \u0275\u0275text(40, "Doanh thu");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 12)(42, "div", 13)(43, "h2");
      \u0275\u0275text(44, "\u0110\u01A1n h\xE0ng g\u1EA7n \u0111\xE2y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 14);
      \u0275\u0275template(46, DashboardComponent_div_46_Template, 12, 7, "div", 15)(47, DashboardComponent_div_47_Template, 2, 0, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "a", 17);
      \u0275\u0275text(49, "Xem t\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 18)(51, "h2");
      \u0275\u0275text(52, "Thao t\xE1c nhanh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 19)(54, "a", 20)(55, "span", 5);
      \u0275\u0275text(56, "add_box");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "span");
      \u0275\u0275text(58, "Th\xEAm s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "a", 21)(60, "span", 5);
      \u0275\u0275text(61, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "span");
      \u0275\u0275text(63, "Qu\u1EA3n l\xFD danh m\u1EE5c");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "a", 22)(65, "span", 5);
      \u0275\u0275text(66, "pending_actions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "span");
      \u0275\u0275text(68, "X\u1EED l\xFD \u0111\u01A1n h\xE0ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "a", 23)(70, "span", 5);
      \u0275\u0275text(71, "bar_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "span");
      \u0275\u0275text(73, "Xem th\u1ED1ng k\xEA");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate((ctx.stats == null ? null : ctx.stats.totalUsers) || 0);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate((ctx.stats == null ? null : ctx.stats.totalProducts) || 0);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate((ctx.stats == null ? null : ctx.stats.totalOrders) || 0);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(38, 6, ctx.stats == null ? null : ctx.stats.totalRevenue));
      \u0275\u0275advance(9);
      \u0275\u0275property("ngForOf", ctx.stats == null ? null : ctx.stats.recentOrders);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.stats == null ? null : ctx.stats.recentOrders == null ? null : ctx.stats.recentOrders.length));
    }
  }, dependencies: [RouterLink, NgClass, NgForOf, NgIf, VndCurrencyPipe], styles: ["\n\n.dashboard[_ngcontent-%COMP%] {\n  max-width: 1400px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin-bottom: 24px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n  margin-bottom: 32px;\n}\n@media (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  box-shadow: var(--shadow);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 30px;\n  color: white;\n}\n.stat-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1976d2,\n      #42a5f5);\n}\n.stat-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #388e3c,\n      #66bb6a);\n}\n.stat-icon.orange[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00,\n      #ff9800);\n}\n.stat-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7b1fa2,\n      #ab47bc);\n}\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--text-color);\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .dashboard-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.dashboard-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: var(--shadow);\n}\n.dashboard-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid var(--primary-color);\n}\n.orders-list[_ngcontent-%COMP%] {\n  min-height: 200px;\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.order-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.order-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.order-info[_ngcontent-%COMP%]   .order-number[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.order-info[_ngcontent-%COMP%]   .order-customer[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.order-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.order-meta[_ngcontent-%COMP%]   .order-total[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--primary-color);\n}\n.order-meta[_ngcontent-%COMP%]   .order-status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  font-weight: 600;\n}\n.order-meta[_ngcontent-%COMP%]   .order-status.status-pending[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.order-meta[_ngcontent-%COMP%]   .order-status.status-confirmed[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.order-meta[_ngcontent-%COMP%]   .order-status.status-shipping[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n.order-meta[_ngcontent-%COMP%]   .order-status.status-completed[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #388e3c;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-secondary);\n  padding: 40px;\n}\n.view-all[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n  padding: 12px;\n  margin-top: 16px;\n  background: var(--background-color);\n  border-radius: 8px;\n  color: var(--primary-color);\n  font-weight: 600;\n}\n.view-all[_ngcontent-%COMP%]:hover {\n  background: var(--primary-color);\n  color: white;\n}\n.actions-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.action-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 20px;\n  background: var(--background-color);\n  border-radius: 8px;\n  transition: var(--transition);\n}\n.action-item[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: var(--primary-color);\n}\n.action-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  font-size: 13px;\n  font-weight: 500;\n}\n.action-item[_ngcontent-%COMP%]:hover {\n  background: var(--primary-color);\n  color: white;\n}\n.action-item[_ngcontent-%COMP%]:hover   .material-icons[_ngcontent-%COMP%] {\n  color: white;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\features\\admin\\dashboard\\dashboard.component.ts", lineNumber: 251 });
})();

// src/app/features/admin/dashboard/dashboard.module.ts
var routes = [
  { path: "", component: DashboardComponent }
];
var DashboardModule = class _DashboardModule {
  static \u0275fac = function DashboardModule_Factory(t) {
    return new (t || _DashboardModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  DashboardModule
};
//# sourceMappingURL=chunk-RKWXOPXV.js.map
