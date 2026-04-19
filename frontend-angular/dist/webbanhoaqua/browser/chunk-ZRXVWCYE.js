import {
  AuthService,
  CartService,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  OrderService,
  RadioControlValueAccessor,
  SharedModule,
  Validators,
  VndCurrencyPipe,
  ɵNgNoValidate
} from "./chunk-S4GDKINQ.js";
import {
  NgForOf,
  NgIf,
  Router,
  RouterModule,
  __spreadProps,
  __spreadValues,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/checkout/checkout.component.ts
function CheckoutComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, " Vui l\xF2ng nh\u1EADp h\u1ECD t\xEAn ");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, " Vui l\xF2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i ");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, " Vui l\xF2ng nh\u1EADp \u0111\u1ECBa ch\u1EC9 giao h\xE0ng ");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275element(1, "img", 40);
    \u0275\u0275elementStart(2, "div", 41)(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 44);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.getProductImage(item_r1), \u0275\u0275sanitizeUrl)("alt", item_r1.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("x", item_r1.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, ctx_r1.getItemTotal(item_r1)));
  }
}
function CheckoutComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span");
    \u0275\u0275text(2, "Gi\u1EA3m gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(5, 1, ctx_r1.discount), "");
  }
}
function CheckoutComponent_span_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0110\u1EB7t h\xE0ng ngay");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_span_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 46);
  }
}
var CheckoutComponent = class _CheckoutComponent {
  fb;
  cartService;
  orderService;
  authService;
  router;
  checkoutForm;
  items = [];
  subtotal = 0;
  shippingFee = 0;
  discount = 0;
  total = 0;
  paymentMethod = "COD";
  loading = false;
  constructor(fb, cartService, orderService, authService, router) {
    this.fb = fb;
    this.cartService = cartService;
    this.orderService = orderService;
    this.authService = authService;
    this.router = router;
    this.checkoutForm = this.fb.group({
      shippingName: ["", Validators.required],
      shippingPhone: ["", [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      shippingAddress: ["", Validators.required],
      shippingNote: [""]
    });
  }
  ngOnInit() {
    this.loadCart();
    this.loadUserInfo();
  }
  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res.success && res.data.items) {
          this.items = res.data.items;
          this.calculateTotal();
        }
      }
    });
  }
  loadUserInfo() {
    const user = this.authService.currentUser;
    if (user) {
      this.checkoutForm.patchValue({
        shippingName: user.fullName,
        shippingPhone: user.phone || "",
        shippingAddress: user.address || ""
      });
    }
  }
  getProductImage(item) {
    if (item.product?.images && item.product.images.length > 0) {
      return item.product.images[0].url;
    }
    return "https://via.placeholder.com/60";
  }
  getItemTotal(item) {
    return (item.product?.price || 0) * item.quantity;
  }
  calculateTotal() {
    this.subtotal = this.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
    this.shippingFee = this.subtotal >= 5e5 ? 0 : this.subtotal >= 2e5 ? 15e3 : 25e3;
    this.discount = this.subtotal >= 5e5 ? this.subtotal * 0.05 : 0;
    this.total = this.subtotal + this.shippingFee - this.discount;
  }
  placeOrder() {
    if (this.checkoutForm.invalid || this.items.length === 0)
      return;
    this.loading = true;
    const orderData = __spreadProps(__spreadValues({}, this.checkoutForm.value), {
      paymentMethod: this.paymentMethod,
      items: this.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    });
    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        if (res.success) {
          this.cartService.loadCart();
          alert(`\u0110\u1EB7t h\xE0ng th\xE0nh c\xF4ng! M\xE3 \u0111\u01A1n h\xE0ng: ${res.data.orderNumber}`);
          this.router.navigate(["/orders", res.data.id]);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || "\u0110\u1EB7t h\xE0ng th\u1EA5t b\u1EA1i!");
      }
    });
  }
  static \u0275fac = function CheckoutComponent_Factory(t) {
    return new (t || _CheckoutComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutComponent, selectors: [["app-checkout"]], decls: 95, vars: 30, consts: [[1, "checkout-page"], [1, "container"], [1, "page-title"], [1, "checkout-layout"], [1, "checkout-form"], [1, "form-section"], [3, "formGroup"], [1, "form-row"], [1, "form-group"], ["for", "shippingName"], [1, "required"], ["type", "text", "id", "shippingName", "formControlName", "shippingName", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["for", "shippingPhone"], ["type", "tel", "id", "shippingPhone", "formControlName", "shippingPhone", 1, "form-control"], ["for", "shippingAddress"], ["type", "text", "id", "shippingAddress", "formControlName", "shippingAddress", 1, "form-control"], ["for", "shippingNote"], ["id", "shippingNote", "formControlName", "shippingNote", "rows", "3", "placeholder", "V\xED d\u1EE5: Giao gi\u1EDD h\xE0nh ch\xEDnh, g\u1ECDi tr\u01B0\u1EDBc khi giao...", 1, "form-control"], [1, "payment-methods"], [1, "payment-method"], ["type", "radio", "name", "payment", "value", "COD", 3, "ngModelChange", "ngModel"], [1, "method-icon"], [1, "material-icons"], [1, "method-info"], ["type", "radio", "name", "payment", "value", "BANK_TRANSFER", 3, "ngModelChange", "ngModel"], [1, "order-summary"], [1, "summary-items"], ["class", "summary-item", 4, "ngFor", "ngForOf"], [1, "summary-totals"], [1, "total-row"], ["class", "total-row discount", 4, "ngIf"], [1, "total-row", "grand-total"], [1, "btn", "btn-primary", "btn-block", "btn-lg", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "terms-notice"], ["href", "#"], [1, "error-message"], [1, "summary-item"], [3, "src", "alt"], [1, "item-info"], [1, "item-name"], [1, "item-qty"], [1, "item-price"], [1, "total-row", "discount"], [1, "spinner"]], template: function CheckoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Thanh To\xE1n \u0110\u01A1n H\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "h2");
      \u0275\u0275text(8, "Th\xF4ng tin giao h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "form", 6)(10, "div", 7)(11, "div", 8)(12, "label", 9);
      \u0275\u0275text(13, "H\u1ECD v\xE0 t\xEAn ng\u01B0\u1EDDi nh\u1EADn ");
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(16, "input", 11);
      \u0275\u0275template(17, CheckoutComponent_span_17_Template, 2, 0, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 8)(19, "label", 13);
      \u0275\u0275text(20, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i ");
      \u0275\u0275elementStart(21, "span", 10);
      \u0275\u0275text(22, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "input", 14);
      \u0275\u0275template(24, CheckoutComponent_span_24_Template, 2, 0, "span", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 8)(26, "label", 15);
      \u0275\u0275text(27, "\u0110\u1ECBa ch\u1EC9 giao h\xE0ng ");
      \u0275\u0275elementStart(28, "span", 10);
      \u0275\u0275text(29, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(30, "input", 16);
      \u0275\u0275template(31, CheckoutComponent_span_31_Template, 2, 0, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 8)(33, "label", 17);
      \u0275\u0275text(34, "Ghi ch\xFA \u0111\u01A1n h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "textarea", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 5)(37, "h2");
      \u0275\u0275text(38, "Ph\u01B0\u01A1ng th\u1EE9c thanh to\xE1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 19)(40, "label", 20)(41, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function CheckoutComponent_Template_input_ngModelChange_41_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.paymentMethod, $event) || (ctx.paymentMethod = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 22)(43, "span", 23);
      \u0275\u0275text(44, "payments");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 24)(46, "strong");
      \u0275\u0275text(47, "Thanh to\xE1n khi nh\u1EADn h\xE0ng (COD)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "span");
      \u0275\u0275text(49, "Tr\u1EA3 ti\u1EC1n m\u1EB7t khi nh\u1EADn \u0111\u01B0\u1EE3c h\xE0ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "label", 20)(51, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function CheckoutComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.paymentMethod, $event) || (ctx.paymentMethod = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 22)(53, "span", 23);
      \u0275\u0275text(54, "account_balance");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 24)(56, "strong");
      \u0275\u0275text(57, "Chuy\u1EC3n kho\u1EA3n ng\xE2n h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "span");
      \u0275\u0275text(59, "Chuy\u1EC3n kho\u1EA3n tr\u01B0\u1EDBc qua t\xE0i kho\u1EA3n ng\xE2n h\xE0ng");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(60, "div", 26)(61, "h2");
      \u0275\u0275text(62, "\u0110\u01A1n h\xE0ng c\u1EE7a b\u1EA1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div", 27);
      \u0275\u0275template(64, CheckoutComponent_div_64_Template, 10, 7, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 29)(66, "div", 30)(67, "span");
      \u0275\u0275text(68, "T\u1EA1m t\xEDnh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "span");
      \u0275\u0275text(70);
      \u0275\u0275pipe(71, "vndCurrency");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 30)(73, "span");
      \u0275\u0275text(74, "Ph\xED v\u1EADn chuy\u1EC3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "span");
      \u0275\u0275text(76);
      \u0275\u0275pipe(77, "vndCurrency");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(78, CheckoutComponent_div_78_Template, 6, 3, "div", 31);
      \u0275\u0275elementStart(79, "div", 32)(80, "span");
      \u0275\u0275text(81, "T\u1ED5ng c\u1ED9ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span");
      \u0275\u0275text(83);
      \u0275\u0275pipe(84, "vndCurrency");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(85, "button", 33);
      \u0275\u0275listener("click", function CheckoutComponent_Template_button_click_85_listener() {
        return ctx.placeOrder();
      });
      \u0275\u0275template(86, CheckoutComponent_span_86_Template, 2, 0, "span", 34)(87, CheckoutComponent_span_87_Template, 1, 0, "span", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "p", 36);
      \u0275\u0275text(89, " B\u1EB1ng vi\u1EC7c \u0111\u1EB7t h\xE0ng, b\u1EA1n \u0111\u1ED3ng \xFD v\u1EDBi ");
      \u0275\u0275elementStart(90, "a", 37);
      \u0275\u0275text(91, "\u0110i\u1EC1u kho\u1EA3n d\u1ECBch v\u1EE5");
      \u0275\u0275elementEnd();
      \u0275\u0275text(92, " v\xE0 ");
      \u0275\u0275elementStart(93, "a", 37);
      \u0275\u0275text(94, "Ch\xEDnh s\xE1ch \u0111\u1ED5i tr\u1EA3");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(9);
      \u0275\u0275property("formGroup", ctx.checkoutForm);
      \u0275\u0275advance(7);
      \u0275\u0275classProp("error", ((tmp_1_0 = ctx.checkoutForm.get("shippingName")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.checkoutForm.get("shippingName")) == null ? null : tmp_1_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.checkoutForm.get("shippingName")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]) && ((tmp_2_0 = ctx.checkoutForm.get("shippingName")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275classProp("error", ((tmp_3_0 = ctx.checkoutForm.get("shippingPhone")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.checkoutForm.get("shippingPhone")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.checkoutForm.get("shippingPhone")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) && ((tmp_4_0 = ctx.checkoutForm.get("shippingPhone")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275classProp("error", ((tmp_5_0 = ctx.checkoutForm.get("shippingAddress")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.checkoutForm.get("shippingAddress")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.checkoutForm.get("shippingAddress")) == null ? null : tmp_6_0.errors == null ? null : tmp_6_0.errors["required"]) && ((tmp_6_0 = ctx.checkoutForm.get("shippingAddress")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(9);
      \u0275\u0275classProp("active", ctx.paymentMethod === "COD");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.paymentMethod);
      \u0275\u0275advance(9);
      \u0275\u0275classProp("active", ctx.paymentMethod === "BANK_TRANSFER");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.paymentMethod);
      \u0275\u0275advance(13);
      \u0275\u0275property("ngForOf", ctx.items);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(71, 24, ctx.subtotal));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(77, 26, ctx.shippingFee));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.discount > 0);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(84, 28, ctx.total));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.checkoutForm.invalid || ctx.loading || ctx.items.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [NgForOf, NgIf, \u0275NgNoValidate, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgModel, VndCurrencyPipe], styles: ["\n\n.checkout-page[_ngcontent-%COMP%] {\n  padding: 32px 0;\n  min-height: 70vh;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 32px;\n}\n.checkout-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 420px;\n  gap: 32px;\n}\n@media (max-width: 1024px) {\n  .checkout-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.form-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.form-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--border-color);\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n@media (max-width: 600px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.required[_ngcontent-%COMP%] {\n  color: var(--error-color);\n}\n.payment-methods[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.payment-method[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  border: 2px solid var(--border-color);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: var(--transition);\n}\n.payment-method[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.payment-method.active[_ngcontent-%COMP%], .payment-method[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary-color);\n  background: rgba(46, 125, 50, 0.05);\n}\n.payment-method[_ngcontent-%COMP%]   .method-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  background: var(--background-color);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.payment-method[_ngcontent-%COMP%]   .method-icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--primary-color);\n}\n.payment-method[_ngcontent-%COMP%]   .method-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.payment-method[_ngcontent-%COMP%]   .method-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n}\n.payment-method[_ngcontent-%COMP%]   .method-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.order-summary[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  padding: 24px;\n  height: fit-content;\n  position: sticky;\n  top: 100px;\n}\n.order-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--border-color);\n}\n.summary-items[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow-y: auto;\n  margin-bottom: 16px;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.summary-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.summary-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.summary-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.summary-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .item-name[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 500;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.summary-item[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .item-qty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.summary-item[_ngcontent-%COMP%]   .item-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.summary-totals[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color);\n  padding-top: 16px;\n}\n.total-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 10px;\n  font-size: 15px;\n}\n.total-row.discount[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--error-color);\n}\n.total-row.grand-total[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 2px solid var(--border-color);\n  font-size: 20px;\n  font-weight: 700;\n}\n.total-row.grand-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--primary-color);\n}\n.terms-notice[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  text-align: center;\n}\n.terms-notice[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n}\n.terms-notice[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.btn-lg[_ngcontent-%COMP%] {\n  padding: 14px 24px;\n  font-size: 16px;\n}\n/*# sourceMappingURL=checkout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent", filePath: "src\\app\\features\\checkout\\checkout.component.ts", lineNumber: 328 });
})();

// src/app/features/checkout/checkout.module.ts
var routes = [
  { path: "", component: CheckoutComponent }
];
var CheckoutModule = class _CheckoutModule {
  static \u0275fac = function CheckoutModule_Factory(t) {
    return new (t || _CheckoutModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CheckoutModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  CheckoutModule
};
//# sourceMappingURL=chunk-ZRXVWCYE.js.map
