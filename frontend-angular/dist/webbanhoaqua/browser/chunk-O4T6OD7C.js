import {
  OrderService,
  SharedModule,
  VndCurrencyPipe
} from "./chunk-S4GDKINQ.js";
import {
  ActivatedRoute,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GBTPURO4.js";

// src/app/features/orders/order-detail/order-detail.component.ts
function OrderDetailComponent_div_0_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "img", 28);
    \u0275\u0275elementStart(2, "div", 29)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 30);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r1.productImage || "https://via.placeholder.com/80", \u0275\u0275sanitizeUrl)("alt", item_r1.productName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r1.quantity, " x ", \u0275\u0275pipeBind1(7, 6, item_r1.price), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 8, item_r1.total));
  }
}
function OrderDetailComponent_div_0_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 15);
    \u0275\u0275text(2, "Ghi ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.order.shippingNote);
  }
}
function OrderDetailComponent_div_0_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span");
    \u0275\u0275text(2, "Gi\u1EA3m gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(5, 1, ctx_r1.order.discount), "");
  }
}
function OrderDetailComponent_div_0_button_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function OrderDetailComponent_div_0_button_78_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelOrder());
    });
    \u0275\u0275text(1, " H\u1EE7y \u0111\u01A1n h\xE0ng ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "a", 3)(3, "span", 4);
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Quay l\u1EA1i danh s\xE1ch \u0111\u01A1n h\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1", 5);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 6)(9, "span", 4);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 7)(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 8)(17, "div", 9)(18, "div", 10)(19, "h2");
    \u0275\u0275text(20, "S\u1EA3n ph\u1EA9m \u0111\xE3 \u0111\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 11);
    \u0275\u0275template(22, OrderDetailComponent_div_0_div_22_Template, 11, 10, "div", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 10)(24, "h2");
    \u0275\u0275text(25, "Th\xF4ng tin giao h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 13)(27, "div", 14)(28, "span", 15);
    \u0275\u0275text(29, "Ng\u01B0\u1EDDi nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 16);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 14)(33, "span", 15);
    \u0275\u0275text(34, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 16);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 17)(38, "span", 15);
    \u0275\u0275text(39, "\u0110\u1ECBa ch\u1EC9 giao h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 16);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(42, OrderDetailComponent_div_0_div_42_Template, 5, 1, "div", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 19)(44, "div", 10)(45, "h2");
    \u0275\u0275text(46, "T\u1ED5ng quan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 20)(48, "div", 21)(49, "span");
    \u0275\u0275text(50, "T\u1EA1m t\xEDnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span");
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 21)(55, "span");
    \u0275\u0275text(56, "Ph\xED v\u1EADn chuy\u1EC3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(60, OrderDetailComponent_div_0_div_60_Template, 6, 3, "div", 22);
    \u0275\u0275elementStart(61, "div", 23)(62, "span");
    \u0275\u0275text(63, "T\u1ED5ng c\u1ED9ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span");
    \u0275\u0275text(65);
    \u0275\u0275pipe(66, "vndCurrency");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(67, "div", 10)(68, "h2");
    \u0275\u0275text(69, "Ph\u01B0\u01A1ng th\u1EE9c thanh to\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "p", 24);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 10)(73, "h2");
    \u0275\u0275text(74, "Ng\xE0y \u0111\u1EB7t h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "p", 25);
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(78, OrderDetailComponent_div_0_button_78_Template, 2, 0, "button", 26);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Chi Ti\u1EBFt \u0110\u01A1n H\xE0ng #", ctx_r1.order.orderNumber, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-" + ctx_r1.order.status.toLowerCase());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getStatusIcon());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getStatusText());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getStatusDescription());
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.order.items);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.order.shippingName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.order.shippingPhone);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.order.shippingAddress);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.order.shippingNote);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(53, 17, ctx_r1.order.subtotal));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(59, 19, ctx_r1.order.shippingFee));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.order.discount > 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(66, 21, ctx_r1.order.total));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getPaymentMethodText());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(77, 23, ctx_r1.order.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.order.status === "PENDING");
  }
}
var OrderDetailComponent = class _OrderDetailComponent {
  route;
  router;
  orderService;
  order = null;
  constructor(route, router, orderService) {
    this.route = route;
    this.router = router;
    this.orderService = orderService;
  }
  ngOnInit() {
    const orderId = this.route.snapshot.params["id"];
    if (orderId) {
      this.loadOrder(orderId);
    }
  }
  loadOrder(orderId) {
    this.orderService.getMyOrderById(orderId).subscribe({
      next: (res) => {
        if (res.success) {
          this.order = res.data;
        }
      },
      error: () => {
        this.router.navigate(["/orders"]);
      }
    });
  }
  getStatusIcon() {
    const icons = {
      "PENDING": "schedule",
      "CONFIRMED": "check_circle",
      "SHIPPING": "local_shipping",
      "COMPLETED": "done_all",
      "CANCELLED": "cancel"
    };
    return icons[this.order?.status || ""] || "help";
  }
  getStatusText() {
    const texts = {
      "PENDING": "Ch\u1EDD x\xE1c nh\u1EADn",
      "CONFIRMED": "\u0110\xE3 x\xE1c nh\u1EADn",
      "SHIPPING": "\u0110ang giao h\xE0ng",
      "COMPLETED": "Ho\xE0n th\xE0nh",
      "CANCELLED": "\u0110\xE3 h\u1EE7y"
    };
    return texts[this.order?.status || ""] || "";
  }
  getStatusDescription() {
    const descriptions = {
      "PENDING": "\u0110\u01A1n h\xE0ng \u0111ang ch\u1EDD \u0111\u01B0\u1EE3c x\xE1c nh\u1EADn",
      "CONFIRMED": "\u0110\u01A1n h\xE0ng \u0111\xE3 \u0111\u01B0\u1EE3c x\xE1c nh\u1EADn v\xE0 \u0111ang chu\u1EA9n b\u1ECB",
      "SHIPPING": "\u0110\u01A1n h\xE0ng \u0111ang \u0111\u01B0\u1EE3c giao \u0111\u1EBFn b\u1EA1n",
      "COMPLETED": "\u0110\u01A1n h\xE0ng \u0111\xE3 \u0111\u01B0\u1EE3c giao th\xE0nh c\xF4ng",
      "CANCELLED": "\u0110\u01A1n h\xE0ng \u0111\xE3 b\u1ECB h\u1EE7y"
    };
    return descriptions[this.order?.status || ""] || "";
  }
  getPaymentMethodText() {
    const methods = {
      "COD": "Thanh to\xE1n khi nh\u1EADn h\xE0ng (COD)",
      "BANK_TRANSFER": "Chuy\u1EC3n kho\u1EA3n ng\xE2n h\xE0ng",
      "MOMO": "V\xED MoMo",
      "ZALOPAY": "ZaloPay"
    };
    return methods[this.order?.paymentMethod || ""] || "";
  }
  cancelOrder() {
    if (!this.order)
      return;
    if (confirm("B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n h\u1EE7y \u0111\u01A1n h\xE0ng n\xE0y?")) {
      this.orderService.cancelOrder(this.order.id).subscribe({
        next: (res) => {
          if (res.success) {
            alert("H\u1EE7y \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng!");
            this.loadOrder(this.order.id);
          }
        },
        error: (err) => {
          alert(err.error?.message || "H\u1EE7y \u0111\u01A1n h\xE0ng th\u1EA5t b\u1EA1i!");
        }
      });
    }
  }
  static \u0275fac = function OrderDetailComponent_Factory(t) {
    return new (t || _OrderDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(OrderService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailComponent, selectors: [["app-order-detail"]], decls: 1, vars: 1, consts: [["class", "order-detail-page", 4, "ngIf"], [1, "order-detail-page"], [1, "container"], ["routerLink", "/orders", 1, "back-link"], [1, "material-icons"], [1, "page-title"], [1, "order-status-banner", 3, "ngClass"], [1, "status-info"], [1, "order-grid"], [1, "order-main"], [1, "section-card"], [1, "order-items"], ["class", "order-item", 4, "ngFor", "ngForOf"], [1, "info-grid"], [1, "info-item"], [1, "label"], [1, "value"], [1, "info-item", "full"], ["class", "info-item full", 4, "ngIf"], [1, "order-sidebar"], [1, "summary-rows"], [1, "summary-row"], ["class", "summary-row", 4, "ngIf"], [1, "summary-row", "total"], [1, "payment-method"], [1, "order-date"], ["class", "btn btn-danger", 3, "click", 4, "ngIf"], [1, "order-item"], [3, "src", "alt"], [1, "item-info"], [1, "item-total"], [1, "text-success"], [1, "btn", "btn-danger", 3, "click"]], template: function OrderDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, OrderDetailComponent_div_0_Template, 79, 26, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.order);
    }
  }, dependencies: [RouterLink, NgClass, NgForOf, NgIf, DatePipe, VndCurrencyPipe], styles: ["\n\n.order-detail-page[_ngcontent-%COMP%] {\n  padding: 32px 0;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.back-link[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--primary-color);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin-bottom: 24px;\n}\n.order-status-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  border-radius: var(--border-radius);\n  margin-bottom: 24px;\n  color: white;\n}\n.order-status-banner[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 36px;\n}\n.order-status-banner[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 18px;\n  margin-bottom: 4px;\n}\n.order-status-banner[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  opacity: 0.9;\n  font-size: 14px;\n}\n.order-status-banner.status-pending[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f57c00,\n      #ff9800);\n}\n.order-status-banner.status-confirmed[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1976d2,\n      #42a5f5);\n}\n.order-status-banner.status-shipping[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7b1fa2,\n      #ab47bc);\n}\n.order-status-banner.status-completed[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #388e3c,\n      #66bb6a);\n}\n.order-status-banner.status-cancelled[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d32f2f,\n      #ef5350);\n}\n.order-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 340px;\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .order-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.section-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  padding: 20px;\n  margin-bottom: 16px;\n}\n.section-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--border-color);\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.order-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.order-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.order-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.order-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 15px;\n  margin-bottom: 4px;\n}\n.order-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.order-item[_ngcontent-%COMP%]   .item-total[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 16px;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.info-grid[_ngcontent-%COMP%]   .info-item.full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n}\n.info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.summary-rows[_ngcontent-%COMP%]   .summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  font-size: 15px;\n}\n.summary-rows[_ngcontent-%COMP%]   .summary-row.total[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 2px solid var(--border-color);\n  font-size: 18px;\n  font-weight: 700;\n}\n.summary-rows[_ngcontent-%COMP%]   .summary-row.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--primary-color);\n}\n.payment-method[_ngcontent-%COMP%], .order-date[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--text-color);\n}\n/*# sourceMappingURL=order-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailComponent, { className: "OrderDetailComponent", filePath: "src\\app\\features\\orders\\order-detail\\order-detail.component.ts", lineNumber: 226 });
})();

// src/app/features/orders/order-detail/order-detail.module.ts
var routes = [
  { path: "", component: OrderDetailComponent }
];
var OrderDetailModule = class _OrderDetailModule {
  static \u0275fac = function OrderDetailModule_Factory(t) {
    return new (t || _OrderDetailModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _OrderDetailModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  OrderDetailModule
};
//# sourceMappingURL=chunk-O4T6OD7C.js.map
