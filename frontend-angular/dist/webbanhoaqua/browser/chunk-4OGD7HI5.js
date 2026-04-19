import {
  CategoryService,
  ProductCardComponent,
  ProductService,
  SharedModule
} from "./chunk-S4GDKINQ.js";
import {
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GBTPURO4.js";

// src/app/features/home/home.component.ts
var _c0 = () => ["/products"];
var _c1 = (a0) => ({ categoryId: a0 });
function HomeComponent_div_22_a_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 28)(1, "div", 29);
    \u0275\u0275element(2, "img", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(6, _c0))("queryParams", \u0275\u0275pureFunction1(7, _c1, cat_r1.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cat_r1.image || "https://via.placeholder.com/300x200", \u0275\u0275sanitizeUrl)("alt", cat_r1.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(cat_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (cat_r1._count == null ? null : cat_r1._count.products) || 0, " s\u1EA3n ph\u1EA9m");
  }
}
function HomeComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, HomeComponent_div_22_a_1_Template, 8, 9, "a", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.categories);
  }
}
function HomeComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "div", 34);
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_31_app_product_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 37);
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    \u0275\u0275property("product", product_r3);
  }
}
function HomeComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275template(1, HomeComponent_div_31_app_product_card_1_Template, 1, 1, "app-product-card", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.featuredProducts);
  }
}
function HomeComponent_section_70_app_product_card_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 37);
  }
  if (rf & 2) {
    const product_r4 = ctx.$implicit;
    \u0275\u0275property("product", product_r4);
  }
}
function HomeComponent_section_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 38)(1, "div", 2)(2, "div", 10)(3, "h2");
    \u0275\u0275text(4, "H\xE0ng M\u1EDBi V\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "C\xE1c s\u1EA3n ph\u1EA9m m\u1EDBi \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt li\xEAn t\u1EE5c");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 35);
    \u0275\u0275template(8, HomeComponent_section_70_app_product_card_8_Template, 1, 1, "app-product-card", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx_r1.newArrivals);
  }
}
var HomeComponent = class _HomeComponent {
  productService;
  categoryService;
  featuredProducts = [];
  newArrivals = [];
  categories = [];
  loading = true;
  constructor(productService, categoryService) {
    this.productService = productService;
    this.categoryService = categoryService;
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        }
      },
      error: () => {
        console.error("Error loading categories");
      }
    });
    this.productService.getFeaturedProducts(8).subscribe({
      next: (res) => {
        if (res.success) {
          this.featuredProducts = res.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    this.productService.getNewArrivals(4).subscribe({
      next: (res) => {
        if (res.success) {
          this.newArrivals = res.data;
        }
      },
      error: () => {
        console.error("Error loading new arrivals");
      }
    });
  }
  static \u0275fac = function HomeComponent_Factory(t) {
    return new (t || _HomeComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CategoryService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 80, vars: 4, consts: [[1, "hero"], [1, "hero-bg"], [1, "container"], [1, "hero-content"], [1, "hero-title"], [1, "hero-subtitle"], [1, "hero-actions"], ["routerLink", "/products", 1, "btn", "btn-primary", "btn-lg"], ["routerLink", "/about", 1, "btn", "btn-outline", "btn-lg"], [1, "section", "categories-section"], [1, "section-header"], ["class", "categories-grid", 4, "ngIf"], ["class", "loading", 4, "ngIf"], [1, "section", "featured-section"], ["class", "products-grid grid grid-4", 4, "ngIf"], [1, "section-footer"], ["routerLink", "/products", 1, "btn", "btn-outline"], [1, "section", "features-section"], [1, "features-grid"], [1, "feature-item"], [1, "feature-icon"], [1, "material-icons"], ["class", "section new-arrivals-section", 4, "ngIf"], [1, "cta-section"], [1, "cta-content"], ["routerLink", "/contact", 1, "btn", "btn-secondary", "btn-lg"], [1, "categories-grid"], ["class", "category-card", 3, "routerLink", "queryParams", 4, "ngFor", "ngForOf"], [1, "category-card", 3, "routerLink", "queryParams"], [1, "category-image"], [3, "src", "alt"], [1, "category-info"], [1, "product-count"], [1, "loading"], [1, "spinner"], [1, "products-grid", "grid", "grid-4"], [3, "product", 4, "ngFor", "ngForOf"], [3, "product"], [1, "section", "new-arrivals-section"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "h1", 4);
      \u0275\u0275text(5, "N\xF4ng S\u1EA3n T\u01B0\u01A1i Ngon");
      \u0275\u0275element(6, "br");
      \u0275\u0275text(7, "Giao H\xE0ng T\u1EADn N\u01A1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, " Ch\xFAng t\xF4i cung c\u1EA5p c\xE1c lo\u1EA1i n\xF4ng s\u1EA3n t\u01B0\u01A1i s\u1EA1ch, ch\u1EA5t l\u01B0\u1EE3ng cao t\u1EEB kh\u1EAFp v\xF9ng mi\u1EC1n Vi\u1EC7t Nam. \u0110\u1EB7t h\xE0ng online, giao h\xE0ng nhanh ch\xF3ng. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 6)(11, "a", 7);
      \u0275\u0275text(12, "Mua s\u1EAFm ngay");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 8);
      \u0275\u0275text(14, "T\xECm hi\u1EC3u th\xEAm");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(15, "section", 9)(16, "div", 2)(17, "div", 10)(18, "h2");
      \u0275\u0275text(19, "Danh M\u1EE5c S\u1EA3n Ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "p");
      \u0275\u0275text(21, "C\xE1c lo\u1EA1i n\xF4ng s\u1EA3n \u0111a d\u1EA1ng, phong ph\xFA");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(22, HomeComponent_div_22_Template, 2, 1, "div", 11)(23, HomeComponent_div_23_Template, 2, 0, "div", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "section", 13)(25, "div", 2)(26, "div", 10)(27, "h2");
      \u0275\u0275text(28, "S\u1EA3n Ph\u1EA9m N\u1ED5i B\u1EADt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p");
      \u0275\u0275text(30, "Nh\u1EEFng s\u1EA3n ph\u1EA9m \u0111\u01B0\u1EE3c kh\xE1ch h\xE0ng y\xEAu th\xEDch nh\u1EA5t");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(31, HomeComponent_div_31_Template, 2, 1, "div", 14);
      \u0275\u0275elementStart(32, "div", 15)(33, "a", 16);
      \u0275\u0275text(34, "Xem t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(35, "section", 17)(36, "div", 2)(37, "div", 18)(38, "div", 19)(39, "div", 20)(40, "span", 21);
      \u0275\u0275text(41, "local_shipping");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "h3");
      \u0275\u0275text(43, "Giao H\xE0ng Nhanh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "p");
      \u0275\u0275text(45, "Giao h\xE0ng trong 2-4 gi\u1EDD trong n\u1ED9i th\xE0nh TP.HCM");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 19)(47, "div", 20)(48, "span", 21);
      \u0275\u0275text(49, "verified");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "h3");
      \u0275\u0275text(51, "S\u1EA3n Ph\u1EA9m Ch\u1EA5t L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p");
      \u0275\u0275text(53, "100% n\xF4ng s\u1EA3n t\u01B0\u01A1i, \u0111\u1EA3m b\u1EA3o ngu\u1ED3n g\u1ED1c xu\u1EA5t x\u1EE9");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div", 19)(55, "div", 20)(56, "span", 21);
      \u0275\u0275text(57, "support_agent");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "h3");
      \u0275\u0275text(59, "H\u1ED7 Tr\u1EE3 24/7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "p");
      \u0275\u0275text(61, "\u0110\u1ED9i ng\u0169 t\u01B0 v\u1EA5n lu\xF4n s\u1EB5n s\xE0ng h\u1ED7 tr\u1EE3");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 19)(63, "div", 20)(64, "span", 21);
      \u0275\u0275text(65, "payments");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "h3");
      \u0275\u0275text(67, "Thanh To\xE1n An To\xE0n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "p");
      \u0275\u0275text(69, "Nhi\u1EC1u h\xECnh th\u1EE9c thanh to\xE1n linh ho\u1EA1t");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275template(70, HomeComponent_section_70_Template, 9, 1, "section", 22);
      \u0275\u0275elementStart(71, "section", 23)(72, "div", 2)(73, "div", 24)(74, "h2");
      \u0275\u0275text(75, "B\u1EA1n C\u1EA7n T\u01B0 V\u1EA5n?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "p");
      \u0275\u0275text(77, "Li\xEAn h\u1EC7 ngay v\u1EDBi ch\xFAng t\xF4i \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 t\u1ED1t nh\u1EA5t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "a", 25);
      \u0275\u0275text(79, "Li\xEAn h\u1EC7 ngay");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275property("ngIf", ctx.categories.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.featuredProducts.length > 0);
      \u0275\u0275advance(39);
      \u0275\u0275property("ngIf", ctx.newArrivals.length > 0);
    }
  }, dependencies: [RouterLink, NgForOf, NgIf, ProductCardComponent], styles: ['\n\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 500px;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      #1b5e20 0%,\n      #2e7d32 50%,\n      #4caf50 100%);\n  color: white;\n}\n.hero-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url(https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1920) center/cover;\n  opacity: 0.15;\n}\n.hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 700px;\n  animation: _ngcontent-%COMP%_fadeInUp 0.8s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 48px;\n  font-weight: 700;\n  line-height: 1.2;\n  margin-bottom: 24px;\n}\n@media (max-width: 768px) {\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 36px;\n  }\n}\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1.7;\n  opacity: 0.95;\n  margin-bottom: 32px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.btn-lg[_ngcontent-%COMP%] {\n  padding: 14px 32px;\n  font-size: 16px;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  border: 2px solid white;\n  color: white;\n  background: transparent;\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  background: white;\n  color: var(--primary-color);\n}\n.section-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 48px;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 12px;\n  color: var(--text-color);\n}\n.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-secondary);\n}\n.categories-section[_ngcontent-%COMP%] {\n  background: white;\n}\n.categories-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .categories-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .categories-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.category-card[_ngcontent-%COMP%] {\n  display: block;\n  background: white;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  box-shadow: var(--shadow);\n  transition: var(--transition);\n  text-decoration: none;\n  color: inherit;\n}\n.category-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  box-shadow: var(--shadow-hover);\n}\n.category-card[_ngcontent-%COMP%]:hover   .category-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.category-card[_ngcontent-%COMP%]   .category-image[_ngcontent-%COMP%] {\n  aspect-ratio: 3/2;\n  overflow: hidden;\n}\n.category-card[_ngcontent-%COMP%]   .category-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.4s ease;\n}\n.category-card[_ngcontent-%COMP%]   .category-info[_ngcontent-%COMP%] {\n  padding: 16px;\n  text-align: center;\n}\n.category-card[_ngcontent-%COMP%]   .category-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-family: "Roboto", sans-serif;\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.category-card[_ngcontent-%COMP%]   .category-info[_ngcontent-%COMP%]   .product-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.featured-section[_ngcontent-%COMP%] {\n  background: var(--background-color);\n}\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 480px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.section-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 32px;\n}\n.features-section[_ngcontent-%COMP%] {\n  background: white;\n}\n.features-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 32px;\n}\n@media (max-width: 1024px) {\n  .features-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .features-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.feature-item[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n}\n.feature-item[_ngcontent-%COMP%]   .feature-icon[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-light),\n      var(--primary-color));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 20px;\n}\n.feature-item[_ngcontent-%COMP%]   .feature-icon[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: white;\n}\n.feature-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-family: "Roboto", sans-serif;\n  margin-bottom: 12px;\n}\n.feature-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n  line-height: 1.6;\n}\n.new-arrivals-section[_ngcontent-%COMP%] {\n  background: var(--background-color);\n}\n.cta-section[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--secondary-color),\n      #ff8f00);\n  padding: 80px 0;\n  color: white;\n  text-align: center;\n}\n.cta-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 16px;\n}\n.cta-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 32px;\n  opacity: 0.95;\n}\n.cta-content[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: var(--secondary-color);\n}\n.cta-content[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n}\n/*# sourceMappingURL=home.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\features\\home\\home.component.ts", lineNumber: 406 });
})();

// src/app/features/home/home.module.ts
var routes = [
  { path: "", component: HomeComponent }
];
var HomeModule = class _HomeModule {
  static \u0275fac = function HomeModule_Factory(t) {
    return new (t || _HomeModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _HomeModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  HomeModule
};
//# sourceMappingURL=chunk-4OGD7HI5.js.map
