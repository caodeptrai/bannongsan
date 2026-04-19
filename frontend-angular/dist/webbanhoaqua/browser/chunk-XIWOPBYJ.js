import {
  CartService,
  DefaultValueAccessor,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  ProductCardComponent,
  ProductService,
  SharedModule,
  VndCurrencyPipe
} from "./chunk-S4GDKINQ.js";
import {
  ActivatedRoute,
  NgForOf,
  NgIf,
  Router,
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/products/product-detail/product-detail.component.ts
var _c0 = () => ["/products"];
var _c1 = (a0) => ({ categoryId: a0 });
var _c2 = () => [1, 2, 3, 4, 5];
function ProductDetailComponent_div_0_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("-", ctx_r1.discountPercent, "%");
  }
}
function ProductDetailComponent_div_0_div_22_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 42);
    \u0275\u0275listener("click", function ProductDetailComponent_div_0_div_22_img_1_Template_img_click_0_listener() {
      const img_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectImage(img_r4.url));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.selectedImage === img_r4.url);
    \u0275\u0275property("src", img_r4.url, \u0275\u0275sanitizeUrl)("alt", ctx_r1.product.name);
  }
}
function ProductDetailComponent_div_0_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275template(1, ProductDetailComponent_div_0_div_22_img_1_Template, 1, 4, "img", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.product.images);
  }
}
function ProductDetailComponent_div_0_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "star");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("filled", star_r5 <= ctx_r1.product.rating);
  }
}
function ProductDetailComponent_div_0_span_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "vndCurrency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r1.product.originalPrice), " ");
  }
}
function ProductDetailComponent_div_0_section_81_app_product_card_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 47);
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275property("product", p_r6);
  }
}
function ProductDetailComponent_div_0_section_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 44)(1, "h2");
    \u0275\u0275text(2, "S\u1EA3n ph\u1EA9m li\xEAn quan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 45);
    \u0275\u0275template(4, ProductDetailComponent_div_0_section_81_app_product_card_4_Template, 1, 1, "app-product-card", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.relatedProducts);
  }
}
function ProductDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "a", 5);
    \u0275\u0275text(4, "Trang ch\u1EE7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6, "chevron_right");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 7);
    \u0275\u0275text(8, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 6);
    \u0275\u0275text(10, "chevron_right");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 8);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 6);
    \u0275\u0275text(14, "chevron_right");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 9)(18, "div", 10)(19, "div", 11);
    \u0275\u0275element(20, "img", 12);
    \u0275\u0275template(21, ProductDetailComponent_div_0_span_21_Template, 2, 1, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, ProductDetailComponent_div_0_div_22_Template, 2, 1, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 15)(24, "span", 16);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "h1", 17);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 18)(29, "div", 19);
    \u0275\u0275template(30, ProductDetailComponent_div_0_span_30_Template, 2, 2, "span", 20);
    \u0275\u0275elementStart(31, "span", 21);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 22);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "span", 23);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 24)(38, "span", 25);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, ProductDetailComponent_div_0_span_41_Template, 3, 3, "span", 26);
    \u0275\u0275elementStart(42, "span", 27);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 28)(45, "span", 6);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span");
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 29)(50, "h3");
    \u0275\u0275text(51, "M\xF4 t\u1EA3 s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p");
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 30)(55, "div", 31)(56, "button", 32);
    \u0275\u0275listener("click", function ProductDetailComponent_div_0_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.decreaseQuantity());
    });
    \u0275\u0275text(57, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailComponent_div_0_Template_input_ngModelChange_58_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.quantity, $event) || (ctx_r1.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "button", 34);
    \u0275\u0275listener("click", function ProductDetailComponent_div_0_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.increaseQuantity());
    });
    \u0275\u0275text(60, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "button", 35);
    \u0275\u0275listener("click", function ProductDetailComponent_div_0_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addToCart());
    });
    \u0275\u0275elementStart(62, "span", 6);
    \u0275\u0275text(63, "add_shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(64, " Th\xEAm v\xE0o gi\u1ECF h\xE0ng ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 36)(66, "div", 37)(67, "span", 6);
    \u0275\u0275text(68, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "span");
    \u0275\u0275text(70, "Giao h\xE0ng trong 2-4 gi\u1EDD");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 37)(72, "span", 6);
    \u0275\u0275text(73, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span");
    \u0275\u0275text(75, "Cam k\u1EBFt ch\u1EA5t l\u01B0\u1EE3ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 37)(77, "span", 6);
    \u0275\u0275text(78, "swap_horiz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "span");
    \u0275\u0275text(80, "\u0110\u1ED5i tr\u1EA3 trong 24h");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(81, ProductDetailComponent_div_0_section_81_Template, 5, 1, "section", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(31, _c0))("queryParams", \u0275\u0275pureFunction1(32, _c1, ctx_r1.product.categoryId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.product.category == null ? null : ctx_r1.product.category.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.product.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r1.selectedImage, \u0275\u0275sanitizeUrl)("alt", ctx_r1.product.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.discountPercent > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.images && ctx_r1.product.images.length > 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product.category == null ? null : ctx_r1.product.category.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(34, _c2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.product.rating, "/5");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r1.product.reviewCount, " \u0111\xE1nh gi\xE1)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.product.soldCount, " \u0111\xE3 b\xE1n");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(40, 29, ctx_r1.product.price));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.product.originalPrice && ctx_r1.product.originalPrice > ctx_r1.product.price);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/", ctx_r1.product.unit, "");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("in-stock", ctx_r1.product.stock > 0)("out-of-stock", ctx_r1.product.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.product.stock > 0 ? "check_circle" : "cancel", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.product.stock > 0 ? "C\xF2n h\xE0ng (" + ctx_r1.product.stock + " " + ctx_r1.product.unit + ")" : "H\u1EBFt h\xE0ng");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.product.description);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.quantity <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.quantity);
    \u0275\u0275property("max", ctx_r1.product.stock);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.product.stock === 0);
    \u0275\u0275advance(20);
    \u0275\u0275property("ngIf", ctx_r1.relatedProducts.length > 0);
  }
}
function ProductDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i th\xF4ng tin s\u1EA3n ph\u1EA9m...");
    \u0275\u0275elementEnd()();
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  route;
  router;
  productService;
  cartService;
  product = null;
  relatedProducts = [];
  loading = true;
  selectedImage = "";
  quantity = 1;
  constructor(route, router, productService, cartService) {
    this.route = route;
    this.router = router;
    this.productService = productService;
    this.cartService = cartService;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const slug = params["slug"];
      if (slug) {
        this.loadProduct(slug);
      }
    });
  }
  loadProduct(slug) {
    this.loading = true;
    this.productService.getProductBySlug(slug).subscribe({
      next: (res) => {
        if (res.success) {
          this.product = res.data;
          this.selectedImage = this.product.images && this.product.images.length > 0 ? this.product.images[0].url : "https://via.placeholder.com/600";
          this.loadRelatedProducts();
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(["/products"]);
      }
    });
  }
  loadRelatedProducts() {
    if (this.product) {
      this.productService.getRelatedProducts(this.product.id, this.product.categoryId, 4).subscribe({
        next: (res) => {
          if (res.success) {
            this.relatedProducts = res.data;
          }
        }
      });
    }
  }
  selectImage(url) {
    this.selectedImage = url;
  }
  get discountPercent() {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
    }
    return 0;
  }
  decreaseQuantity() {
    if (this.quantity > 1)
      this.quantity--;
  }
  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock)
      this.quantity++;
  }
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next: (res) => {
          if (res.success) {
            this.cartService.loadCart();
            alert(`\u0110\xE3 th\xEAm ${this.quantity} ${this.product?.unit} "${this.product?.name}" v\xE0o gi\u1ECF h\xE0ng!`);
          }
        },
        error: (err) => {
          alert(err.error?.message || "Kh\xF4ng th\u1EC3 th\xEAm v\xE0o gi\u1ECF h\xE0ng!");
        }
      });
    }
  }
  static \u0275fac = function ProductDetailComponent_Factory(t) {
    return new (t || _ProductDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CartService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], decls: 2, vars: 2, consts: [["class", "product-detail-page", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], [1, "product-detail-page"], [1, "container"], [1, "breadcrumb"], ["routerLink", "/"], [1, "material-icons"], ["routerLink", "/products"], [3, "routerLink", "queryParams"], [1, "product-detail-grid"], [1, "product-images"], [1, "main-image"], [3, "src", "alt"], ["class", "discount-badge", 4, "ngIf"], ["class", "thumbnail-images", 4, "ngIf"], [1, "product-info"], [1, "product-category"], [1, "product-name"], [1, "product-meta"], [1, "rating"], ["class", "material-icons", 3, "filled", 4, "ngFor", "ngForOf"], [1, "rating-text"], [1, "review-count"], [1, "sold-count"], [1, "product-price"], [1, "current-price"], ["class", "original-price", 4, "ngIf"], [1, "unit"], [1, "product-stock"], [1, "product-description"], [1, "product-actions"], [1, "quantity-selector"], [3, "click", "disabled"], ["type", "number", "min", "1", 3, "ngModelChange", "ngModel", "max"], [3, "click"], [1, "btn", "btn-primary", "btn-lg", 3, "click", "disabled"], [1, "product-features"], [1, "feature"], ["class", "related-products", 4, "ngIf"], [1, "discount-badge"], [1, "thumbnail-images"], [3, "src", "alt", "active", "click", 4, "ngFor", "ngForOf"], [3, "click", "src", "alt"], [1, "original-price"], [1, "related-products"], [1, "products-grid", "grid", "grid-4"], [3, "product", 4, "ngFor", "ngForOf"], [3, "product"], [1, "loading-state"], [1, "spinner"]], template: function ProductDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ProductDetailComponent_div_0_Template, 82, 35, "div", 0)(1, ProductDetailComponent_div_1_Template, 4, 0, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.product);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [RouterLink, NgForOf, NgIf, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, ProductCardComponent, VndCurrencyPipe], styles: ['\n\n.product-detail-page[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-bottom: 24px;\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--primary-color);\n}\n.breadcrumb[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.breadcrumb[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--text-color);\n}\n.product-detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  margin-bottom: 64px;\n}\n@media (max-width: 768px) {\n  .product-detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n.product-images[_ngcontent-%COMP%]   .main-image[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  aspect-ratio: 1;\n}\n.product-images[_ngcontent-%COMP%]   .main-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.product-images[_ngcontent-%COMP%]   .main-image[_ngcontent-%COMP%]   .discount-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  left: 16px;\n  background: var(--error-color);\n  color: white;\n  padding: 6px 12px;\n  border-radius: 4px;\n  font-weight: 600;\n}\n.product-images[_ngcontent-%COMP%]   .thumbnail-images[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.product-images[_ngcontent-%COMP%]   .thumbnail-images[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 8px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  transition: var(--transition);\n}\n.product-images[_ngcontent-%COMP%]   .thumbnail-images[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover, .product-images[_ngcontent-%COMP%]   .thumbnail-images[_ngcontent-%COMP%]   img.active[_ngcontent-%COMP%] {\n  border-color: var(--primary-color);\n}\n.product-info[_ngcontent-%COMP%]   .product-category[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--primary-color);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.product-info[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin: 12px 0 16px;\n  line-height: 1.3;\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid var(--border-color);\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #ddd;\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .material-icons.filled[_ngcontent-%COMP%] {\n  color: #ffc107;\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .rating-text[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  font-weight: 600;\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .review-count[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-left: 4px;\n}\n.product-info[_ngcontent-%COMP%]   .product-meta[_ngcontent-%COMP%]   .sold-count[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n}\n.product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n  padding: 20px 0;\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n}\n.product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]   .current-price[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 700;\n  color: var(--primary-color);\n}\n.product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]   .original-price[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--text-secondary);\n  text-decoration: line-through;\n}\n.product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]   .unit[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-secondary);\n}\n.product-info[_ngcontent-%COMP%]   .product-stock[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 20px;\n  color: var(--text-secondary);\n}\n.product-info[_ngcontent-%COMP%]   .product-stock[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.product-info[_ngcontent-%COMP%]   .product-stock[_ngcontent-%COMP%]   .material-icons.in-stock[_ngcontent-%COMP%] {\n  color: var(--success-color);\n}\n.product-info[_ngcontent-%COMP%]   .product-stock[_ngcontent-%COMP%]   .material-icons.out-of-stock[_ngcontent-%COMP%] {\n  color: var(--error-color);\n}\n.product-info[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.product-info[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Roboto", sans-serif;\n  font-size: 16px;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n.product-info[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  line-height: 1.7;\n}\n.product-info[_ngcontent-%COMP%]   .product-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n@media (max-width: 480px) {\n  .product-info[_ngcontent-%COMP%]   .product-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 48px;\n  border: none;\n  background: var(--background-color);\n  font-size: 18px;\n  cursor: pointer;\n}\n.product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--border-color);\n}\n.product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 48px;\n  border: none;\n  border-left: 1px solid var(--border-color);\n  border-right: 1px solid var(--border-color);\n  text-align: center;\n  font-size: 16px;\n}\n.product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button, .product-info[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n}\n.product-info[_ngcontent-%COMP%]   .btn-lg[_ngcontent-%COMP%] {\n  padding: 14px 32px;\n  font-size: 16px;\n}\n.product-info[_ngcontent-%COMP%]   .product-features[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  padding: 20px;\n  background: var(--background-color);\n  border-radius: var(--border-radius);\n}\n.product-info[_ngcontent-%COMP%]   .product-features[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.product-info[_ngcontent-%COMP%]   .product-features[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--primary-color);\n}\n.related-products[_ngcontent-%COMP%] {\n  margin-top: 64px;\n}\n.related-products[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 24px;\n}\n.related-products[_ngcontent-%COMP%]   .products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .related-products[_ngcontent-%COMP%]   .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .related-products[_ngcontent-%COMP%]   .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 480px) {\n  .related-products[_ngcontent-%COMP%]   .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.loading-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 100px;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  margin: 0 auto 16px;\n}\n/*# sourceMappingURL=product-detail.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src\\app\\features\\products\\product-detail\\product-detail.component.ts", lineNumber: 387 });
})();

// src/app/features/products/product-detail/product-detail.module.ts
var routes = [
  { path: "", component: ProductDetailComponent }
];
var ProductDetailModule = class _ProductDetailModule {
  static \u0275fac = function ProductDetailModule_Factory(t) {
    return new (t || _ProductDetailModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ProductDetailModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  ProductDetailModule
};
//# sourceMappingURL=chunk-XIWOPBYJ.js.map
