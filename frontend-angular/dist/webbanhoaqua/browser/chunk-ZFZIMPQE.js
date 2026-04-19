import {
  AuthService,
  CartService,
  SharedModule,
  VndCurrencyPipe
} from "./chunk-S4GDKINQ.js";
import {
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GBTPURO4.js";

// src/app/features/cart/cart.component.ts
function CartComponent_div_4_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275element(2, "img", 22);
    \u0275\u0275elementStart(3, "div", 23)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 25);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 26)(12, "button", 27);
    \u0275\u0275listener("click", function CartComponent_div_4_div_12_Template_button_click_12_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQuantity(item_r3, -1));
    });
    \u0275\u0275text(13, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 28);
    \u0275\u0275listener("change", function CartComponent_div_4_div_12_Template_input_change_14_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onQuantityChange($event, item_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 27);
    \u0275\u0275listener("click", function CartComponent_div_4_div_12_Template_button_click_15_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQuantity(item_r3, 1));
    });
    \u0275\u0275text(16, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 29);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 30)(21, "button", 31);
    \u0275\u0275listener("click", function CartComponent_div_4_div_12_Template_button_click_21_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeItem(item_r3));
    });
    \u0275\u0275elementStart(22, "span", 11);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r3.getProductImage(item_r3), \u0275\u0275sanitizeUrl)("alt", item_r3.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.product.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 10, item_r3.product.price), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", item_r3.quantity <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", item_r3.quantity)("max", item_r3.product.stock);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", item_r3.quantity >= item_r3.product.stock);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 12, ctx_r3.getItemTotal(item_r3)), " ");
  }
}
function CartComponent_div_4_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span");
    \u0275\u0275text(2, "Gi\u1EA3m gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 33);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "vndCurrency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(5, 1, ctx_r3.discount), "");
  }
}
function CartComponent_div_4_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "span", 11);
    \u0275\u0275text(2, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "vndCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Mua th\xEAm ", \u0275\u0275pipeBind1(4, 1, 5e5 - ctx_r3.subtotal), " \u0111\u1EC3 \u0111\u01B0\u1EE3c mi\u1EC5n ph\xED giao h\xE0ng! ");
  }
}
function CartComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "span");
    \u0275\u0275text(4, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "\u0110\u01A1n gi\xE1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "S\u1ED1 l\u01B0\u1EE3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Th\xE0nh ti\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, CartComponent_div_4_div_12_Template, 24, 14, "div", 8);
    \u0275\u0275elementStart(13, "div", 9)(14, "button", 10)(15, "span", 11);
    \u0275\u0275text(16, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Ti\u1EBFp t\u1EE5c mua s\u1EAFm ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 12);
    \u0275\u0275listener("click", function CartComponent_div_4_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearCart());
    });
    \u0275\u0275elementStart(19, "span", 11);
    \u0275\u0275text(20, "delete_sweep");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " X\xF3a gi\u1ECF h\xE0ng ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 13)(23, "h2");
    \u0275\u0275text(24, "T\u1ED5ng quan \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 14)(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 14)(32, "span");
    \u0275\u0275text(33, "Ph\xED v\u1EADn chuy\u1EC3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(37, CartComponent_div_4_div_37_Template, 6, 3, "div", 15);
    \u0275\u0275elementStart(38, "div", 16)(39, "span");
    \u0275\u0275text(40, "T\u1ED5ng c\u1ED9ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "vndCurrency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(44, CartComponent_div_4_div_44_Template, 5, 3, "div", 17);
    \u0275\u0275elementStart(45, "button", 18);
    \u0275\u0275text(46, " Ti\u1EBFn h\xE0nh \u0111\u1EB7t h\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "p", 19)(48, "span", 11);
    \u0275\u0275text(49, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(50, " Mi\u1EC5n ph\xED giao h\xE0ng cho \u0111\u01A1n t\u1EEB 500.000\u0111 ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r3.items);
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate1("T\u1EA1m t\xEDnh (", ctx_r3.items.length, " s\u1EA3n ph\u1EA9m)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 7, ctx_r3.subtotal));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(36, 9, ctx_r3.shippingFee));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.discount > 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(43, 11, ctx_r3.total));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.subtotal < 5e5 && ctx_r3.subtotal >= 2e5);
  }
}
function CartComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 11);
    \u0275\u0275text(2, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Gi\u1ECF h\xE0ng tr\u1ED1ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "H\xE3y th\xEAm s\u1EA3n ph\u1EA9m v\xE0o gi\u1ECF h\xE0ng \u0111\u1EC3 ti\u1EBFp t\u1EE5c mua s\u1EAFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 36);
    \u0275\u0275text(8, "Mua s\u1EAFm ngay");
    \u0275\u0275elementEnd()();
  }
}
var CartComponent = class _CartComponent {
  cartService;
  authService;
  router;
  items = [];
  subtotal = 0;
  shippingFee = 0;
  discount = 0;
  total = 0;
  loading = true;
  constructor(cartService, authService, router) {
    this.cartService = cartService;
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res.success && res.data.items) {
          this.items = res.data.items;
          this.calculateTotal();
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  getProductImage(item) {
    if (item.product?.images && item.product.images.length > 0) {
      const primary = item.product.images.find((img) => img.isPrimary);
      return primary?.url || item.product.images[0].url;
    }
    return "https://via.placeholder.com/100";
  }
  getItemTotal(item) {
    return (item.product?.price || 0) * item.quantity;
  }
  updateQuantity(item, delta) {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (item.product?.stock || 1)) {
      this.cartService.updateCartItem(item.id, newQuantity).subscribe({
        next: () => {
          item.quantity = newQuantity;
          this.calculateTotal();
        }
      });
    }
  }
  onQuantityChange(event, item) {
    const input = event.target;
    const newQuantity = parseInt(input.value);
    if (newQuantity >= 1 && newQuantity <= (item.product?.stock || 1)) {
      this.cartService.updateCartItem(item.id, newQuantity).subscribe({
        next: () => {
          item.quantity = newQuantity;
          this.calculateTotal();
        }
      });
    }
  }
  removeItem(item) {
    if (confirm(`X\xF3a "${item.product?.name}" kh\u1ECFi gi\u1ECF h\xE0ng?`)) {
      this.cartService.removeFromCart(item.id).subscribe({
        next: () => {
          this.items = this.items.filter((i) => i.id !== item.id);
          this.cartService.loadCart();
          this.calculateTotal();
        }
      });
    }
  }
  clearCart() {
    if (confirm("B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n x\xF3a to\xE0n b\u1ED9 gi\u1ECF h\xE0ng?")) {
      this.cartService.clearCart().subscribe({
        next: () => {
          this.items = [];
          this.cartService.loadCart();
          this.calculateTotal();
        }
      });
    }
  }
  calculateTotal() {
    this.subtotal = this.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
    this.shippingFee = this.subtotal >= 5e5 ? 0 : this.subtotal >= 2e5 ? 15e3 : 25e3;
    this.discount = this.subtotal >= 5e5 ? this.subtotal * 0.05 : 0;
    this.total = this.subtotal + this.shippingFee - this.discount;
  }
  static \u0275fac = function CartComponent_Factory(t) {
    return new (t || _CartComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], decls: 6, vars: 2, consts: [[1, "cart-page"], [1, "container"], [1, "page-title"], ["class", "cart-layout", 4, "ngIf"], ["class", "empty-cart", 4, "ngIf"], [1, "cart-layout"], [1, "cart-items"], [1, "cart-header"], ["class", "cart-item", 4, "ngFor", "ngForOf"], [1, "cart-actions"], ["routerLink", "/products", 1, "btn", "btn-outline"], [1, "material-icons"], [1, "btn", "btn-danger-outline", 3, "click"], [1, "order-summary"], [1, "summary-row"], ["class", "summary-row discount", 4, "ngIf"], [1, "summary-row", "total"], ["class", "free-ship-notice", 4, "ngIf"], ["routerLink", "/checkout", 1, "btn", "btn-primary", "btn-block", "btn-lg"], [1, "checkout-notice"], [1, "cart-item"], [1, "item-product"], [3, "src", "alt"], [1, "item-info"], [1, "item-unit"], [1, "item-price"], [1, "item-quantity"], [3, "click", "disabled"], ["type", "number", "min", "1", 3, "change", "value", "max"], [1, "item-total"], [1, "item-actions"], [1, "delete-btn", 3, "click"], [1, "summary-row", "discount"], [1, "text-error"], [1, "free-ship-notice"], [1, "empty-cart"], ["routerLink", "/products", 1, "btn", "btn-primary"]], template: function CartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Gi\u1ECF H\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, CartComponent_div_4_Template, 51, 13, "div", 3)(5, CartComponent_div_5_Template, 9, 0, "div", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.items.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.items.length === 0 && !ctx.loading);
    }
  }, dependencies: [RouterLink, NgForOf, NgIf, VndCurrencyPipe], styles: ['@charset "UTF-8";\n\n\n\n.cart-page[_ngcontent-%COMP%] {\n  padding: 32px 0;\n  min-height: 60vh;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 32px;\n}\n.cart-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 32px;\n}\n@media (max-width: 1024px) {\n  .cart-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.cart-items[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  overflow: hidden;\n}\n.cart-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1.5fr 1fr 60px;\n  gap: 16px;\n  padding: 16px 20px;\n  background: var(--background-color);\n  font-weight: 600;\n  font-size: 14px;\n}\n@media (max-width: 768px) {\n  .cart-header[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.cart-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1.5fr 1fr 60px;\n  gap: 16px;\n  padding: 20px;\n  border-bottom: 1px solid var(--border-color);\n  align-items: center;\n}\n@media (max-width: 768px) {\n  .cart-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}\n.item-product[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.item-product[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.item-product[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Roboto", sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.item-product[_ngcontent-%COMP%]   .item-unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.item-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-color);\n}\n@media (max-width: 768px) {\n  .item-price[_ngcontent-%COMP%]::before {\n    content: "\\110\\1a1n gi\\e1: ";\n    font-weight: normal;\n    color: var(--text-secondary);\n  }\n}\n.item-quantity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.item-quantity[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--border-color);\n  background: white;\n  cursor: pointer;\n  font-size: 16px;\n  transition: var(--transition);\n}\n.item-quantity[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--primary-color);\n}\n.item-quantity[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.item-quantity[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 32px;\n  text-align: center;\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  font-size: 14px;\n}\n.item-quantity[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n@media (max-width: 768px) {\n  .item-quantity[_ngcontent-%COMP%]::before {\n    content: "S\\1ed1  l\\1b0\\1ee3ng: ";\n    font-weight: normal;\n    color: var(--text-secondary);\n  }\n}\n.item-total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--primary-color);\n  font-size: 16px;\n}\n@media (max-width: 768px) {\n  .item-total[_ngcontent-%COMP%]::before {\n    content: "Th\\e0nh ti\\1ec1n: ";\n    font-weight: normal;\n    color: var(--text-secondary);\n  }\n}\n.item-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  padding: 8px;\n  transition: var(--transition);\n}\n.item-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.item-actions[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%]:hover {\n  color: var(--error-color);\n}\n.cart-actions[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.cart-actions[_ngcontent-%COMP%]   .btn-danger-outline[_ngcontent-%COMP%] {\n  border: 2px solid var(--error-color);\n  color: var(--error-color);\n  background: transparent;\n}\n.cart-actions[_ngcontent-%COMP%]   .btn-danger-outline[_ngcontent-%COMP%]:hover {\n  background: var(--error-color);\n  color: white;\n}\n.order-summary[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  padding: 24px;\n  height: fit-content;\n  position: sticky;\n  top: 100px;\n}\n.order-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid var(--border-color);\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  font-size: 15px;\n}\n.summary-row.discount[_ngcontent-%COMP%] {\n  color: var(--error-color);\n}\n.summary-row.total[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border-color);\n  font-size: 20px;\n  font-weight: 700;\n}\n.summary-row.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--primary-color);\n}\n.free-ship-notice[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  padding: 12px;\n  border-radius: 8px;\n  margin: 16px 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--secondary-color);\n}\n.free-ship-notice[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.checkout-notice[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  justify-content: center;\n}\n.checkout-notice[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.empty-cart[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n}\n.empty-cart[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 80px;\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.empty-cart[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.empty-cart[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n.btn-lg[_ngcontent-%COMP%] {\n  padding: 14px 24px;\n  font-size: 16px;\n}\n/*# sourceMappingURL=cart.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent", filePath: "src\\app\\features\\cart\\cart.component.ts", lineNumber: 354 });
})();

// src/app/features/cart/cart.module.ts
var routes = [
  { path: "", component: CartComponent }
];
var CartModule = class _CartModule {
  static \u0275fac = function CartModule_Factory(t) {
    return new (t || _CartModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CartModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  CartModule
};
//# sourceMappingURL=chunk-ZFZIMPQE.js.map
