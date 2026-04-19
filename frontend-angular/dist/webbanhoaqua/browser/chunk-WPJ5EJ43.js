import {
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  OrderService,
  SharedModule,
  VndCurrencyPipe
} from "./chunk-S4GDKINQ.js";
import {
  NgForOf,
  NgIf,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/admin/statistics/statistics.component.ts
function StatisticsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "div", 14);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15);
    \u0275\u0275text(6, "T\u1ED5ng doanh thu");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 13)(8, "div", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 15);
    \u0275\u0275text(11, "T\u1ED5ng \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 13)(13, "div", 14);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 15);
    \u0275\u0275text(17, "Gi\xE1 tr\u1ECB TB / \u0111\u01A1n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 13)(19, "div", 14);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 15);
    \u0275\u0275text(22, "\u0110\u01A1n ho\xE0n th\xE0nh");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, ctx_r0.stats.totalRevenue));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.stats.totalOrders);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 6, ctx_r0.stats.averageOrderValue));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.stats.completedOrders);
  }
}
function StatisticsComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "span", 18);
    \u0275\u0275text(3, "Ch\u1EDD x\xE1c nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 17)(7, "span", 18);
    \u0275\u0275text(8, "\u0110\xE3 x\xE1c nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 20);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 17)(12, "span", 18);
    \u0275\u0275text(13, "\u0110ang giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 21);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 17)(17, "span", 18);
    \u0275\u0275text(18, "Ho\xE0n th\xE0nh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 22);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 17)(22, "span", 18);
    \u0275\u0275text(23, "\u0110\xE3 h\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 23);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.stats.pendingOrders);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.stats.confirmedOrders);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.stats.shippingOrders);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.stats.completedOrders);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.stats.cancelledOrders);
  }
}
function StatisticsComponent_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 30);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r3 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r2.soldCount, " \u0111\xE3 b\xE1n");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 4, p_r2.revenue));
  }
}
function StatisticsComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, StatisticsComponent_div_22_div_1_Template, 10, 6, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.stats.topProducts);
  }
}
function StatisticsComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
  }
}
var StatisticsComponent = class _StatisticsComponent {
  orderService;
  stats = null;
  startDate = "";
  endDate = "";
  constructor(orderService) {
    this.orderService = orderService;
  }
  ngOnInit() {
    const today = /* @__PURE__ */ new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay.toISOString().split("T")[0];
    this.endDate = today.toISOString().split("T")[0];
    this.loadStats();
  }
  loadStats() {
    this.orderService.getRevenueStats(this.startDate, this.endDate).subscribe({
      next: (res) => {
        if (res.success)
          this.stats = res.data;
      }
    });
  }
  static \u0275fac = function StatisticsComponent_Factory(t) {
    return new (t || _StatisticsComponent)(\u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatisticsComponent, selectors: [["app-statistics"]], decls: 24, vars: 6, consts: [[1, "statistics-page"], [1, "page-header"], [1, "date-filter"], ["type", "date", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], [1, "btn", "btn-primary", 3, "click"], ["class", "stats-grid", 4, "ngIf"], [1, "stats-row"], [1, "stats-col"], [1, "chart-card"], ["class", "order-status-stats", 4, "ngIf"], ["class", "top-products", 4, "ngIf"], ["class", "empty", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-value"], [1, "stat-label"], [1, "order-status-stats"], [1, "status-item"], [1, "status-label"], [1, "status-value", "warning"], [1, "status-value", "info"], [1, "status-value", "purple"], [1, "status-value", "success"], [1, "status-value", "error"], [1, "top-products"], ["class", "product-item", 4, "ngFor", "ngForOf"], [1, "product-item"], [1, "rank"], [1, "name"], [1, "sold"], [1, "revenue"], [1, "empty"]], template: function StatisticsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Th\u1ED1ng k\xEA Doanh thu");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function StatisticsComponent_Template_input_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function StatisticsComponent_Template_input_change_5_listener() {
        return ctx.loadStats();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "-");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function StatisticsComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.endDate, $event) || (ctx.endDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function StatisticsComponent_Template_input_change_8_listener() {
        return ctx.loadStats();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function StatisticsComponent_Template_button_click_9_listener() {
        return ctx.loadStats();
      });
      \u0275\u0275text(10, "L\u1ECDc");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(11, StatisticsComponent_div_11_Template, 23, 8, "div", 5);
      \u0275\u0275elementStart(12, "div", 6)(13, "div", 7)(14, "div", 8)(15, "h3");
      \u0275\u0275text(16, "T\xECnh tr\u1EA1ng \u0111\u01A1n h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, StatisticsComponent_div_17_Template, 26, 5, "div", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 7)(19, "div", 8)(20, "h3");
      \u0275\u0275text(21, "Top s\u1EA3n ph\u1EA9m b\xE1n ch\u1EA1y");
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, StatisticsComponent_div_22_Template, 2, 1, "div", 10)(23, StatisticsComponent_div_23_Template, 2, 0, "div", 11);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.startDate);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.endDate);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.stats);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.stats);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.stats == null ? null : ctx.stats.topProducts == null ? null : ctx.stats.topProducts.length);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.stats == null ? null : ctx.stats.topProducts == null ? null : ctx.stats.topProducts.length));
    }
  }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NgControlStatus, NgModel, VndCurrencyPipe], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.date-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n  margin-bottom: 32px;\n}\n@media (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: var(--shadow);\n  text-align: center;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--primary-color);\n  margin-bottom: 8px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .stats-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.chart-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: var(--shadow);\n}\n.chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid var(--primary-color);\n}\n.order-status-stats[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.status-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 16px;\n  background: var(--background-color);\n  border-radius: 8px;\n}\n.status-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.status-value.warning[_ngcontent-%COMP%] {\n  color: #f57c00;\n}\n.status-value.info[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.status-value.purple[_ngcontent-%COMP%] {\n  color: #7b1fa2;\n}\n.status-value.success[_ngcontent-%COMP%] {\n  color: #388e3c;\n}\n.status-value.error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n}\n.top-products[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.product-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 30px 1fr auto auto;\n  gap: 12px;\n  align-items: center;\n  padding: 12px 16px;\n  background: var(--background-color);\n  border-radius: 8px;\n}\n.rank[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  background: var(--primary-color);\n  color: white;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n}\n.name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.sold[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.revenue[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--primary-color);\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-secondary);\n  padding: 40px;\n}\n/*# sourceMappingURL=statistics.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatisticsComponent, { className: "StatisticsComponent", filePath: "src\\app\\features\\admin\\statistics\\statistics.component.ts", lineNumber: 104 });
})();

// src/app/features/admin/statistics/statistics.module.ts
var routes = [{ path: "", component: StatisticsComponent }];
var StatisticsModule = class _StatisticsModule {
  static \u0275fac = function StatisticsModule_Factory(t) {
    return new (t || _StatisticsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _StatisticsModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  StatisticsModule
};
//# sourceMappingURL=chunk-WPJ5EJ43.js.map
