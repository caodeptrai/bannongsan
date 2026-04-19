import {
  CategoryService,
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ProductCardComponent,
  ProductService,
  RadioControlValueAccessor,
  SelectControlValueAccessor,
  SharedModule,
  ɵNgSelectMultipleOption
} from "./chunk-S4GDKINQ.js";
import {
  ActivatedRoute,
  NgForOf,
  NgIf,
  Router,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/products/product-list.component.ts
function ProductListComponent_label_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 7)(1, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_label_19_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedCategoryId, $event) || (ctx_r1.selectedCategoryId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ProductListComponent_label_19_Template_input_change_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.selectedCategoryId === cat_r3.id);
    \u0275\u0275advance();
    \u0275\u0275property("value", cat_r3.id);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedCategoryId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r3.name);
  }
}
function ProductListComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "div", 37);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i s\u1EA3n ph\u1EA9m...");
    \u0275\u0275elementEnd()();
  }
}
function ProductListComponent_div_65_app_product_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-product-card", 40);
  }
  if (rf & 2) {
    const product_r4 = ctx.$implicit;
    \u0275\u0275property("product", product_r4);
  }
}
function ProductListComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275template(1, ProductListComponent_div_65_app_product_card_1_Template, 1, 1, "app-product-card", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.products);
  }
}
function ProductListComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 24);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "H\xE3y th\u1EED \u0111i\u1EC1u ch\u1EC9nh b\u1ED9 l\u1ECDc ho\u1EB7c t\xECm ki\u1EBFm v\u1EDBi t\u1EEB kh\xF3a kh\xE1c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 42);
    \u0275\u0275listener("click", function ProductListComponent_div_66_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetFilters());
    });
    \u0275\u0275text(8, "\u0110\u1EB7t l\u1EA1i b\u1ED9 l\u1ECDc");
    \u0275\u0275elementEnd()();
  }
}
function ProductListComponent_div_67_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function ProductListComponent_div_67_button_4_Template_button_click_0_listener() {
      const page_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(page_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", page_r8 === ctx_r1.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r8, " ");
  }
}
function ProductListComponent_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "button", 44);
    \u0275\u0275listener("click", function ProductListComponent_div_67_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage - 1));
    });
    \u0275\u0275elementStart(2, "span", 24);
    \u0275\u0275text(3, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductListComponent_div_67_button_4_Template, 2, 3, "button", 45);
    \u0275\u0275elementStart(5, "button", 44);
    \u0275\u0275listener("click", function ProductListComponent_div_67_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage + 1));
    });
    \u0275\u0275elementStart(6, "span", 24);
    \u0275\u0275text(7, "chevron_right");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.visiblePages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
  }
}
var ProductListComponent = class _ProductListComponent {
  productService;
  categoryService;
  route;
  router;
  products = [];
  categories = [];
  loading = true;
  // Filters
  searchQuery = "";
  selectedCategoryId = "";
  minPrice = null;
  maxPrice = null;
  inStockOnly = false;
  sortBy = "";
  // Pagination
  currentPage = 1;
  totalProducts = 0;
  totalPages = 0;
  get visiblePages() {
    const pages = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  constructor(productService, categoryService, route, router) {
    this.productService = productService;
    this.categoryService = categoryService;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.loadCategories();
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params["search"] || "";
      this.selectedCategoryId = params["categoryId"] || "";
      this.currentPage = parseInt(params["page"]) || 1;
      this.loadProducts();
    });
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        }
      }
    });
  }
  loadProducts() {
    this.loading = true;
    const params = {
      page: this.currentPage,
      limit: 12
    };
    if (this.searchQuery)
      params.search = this.searchQuery;
    if (this.selectedCategoryId)
      params.categoryId = this.selectedCategoryId;
    if (this.minPrice)
      params.minPrice = this.minPrice;
    if (this.maxPrice)
      params.maxPrice = this.maxPrice;
    if (this.inStockOnly)
      params.inStock = true;
    if (this.sortBy) {
      const [sort, order] = this.sortBy.split("-");
      params.sortBy = sort;
      params.sortOrder = order;
    }
    this.productService.getProducts(params).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products || [];
          this.totalProducts = res.pagination?.total || 0;
          this.totalPages = res.pagination?.totalPages || 1;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onFilterChange() {
    this.currentPage = 1;
    this.updateURL();
  }
  onSearch() {
    this.currentPage = 1;
    this.updateURL();
  }
  resetFilters() {
    this.searchQuery = "";
    this.selectedCategoryId = "";
    this.minPrice = null;
    this.maxPrice = null;
    this.inStockOnly = false;
    this.sortBy = "";
    this.currentPage = 1;
    this.updateURL();
  }
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateURL();
    }
  }
  updateURL() {
    const queryParams = {};
    if (this.searchQuery)
      queryParams.search = this.searchQuery;
    if (this.selectedCategoryId)
      queryParams.categoryId = this.selectedCategoryId;
    if (this.currentPage > 1)
      queryParams.page = this.currentPage;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: "merge"
    });
    this.loadProducts();
  }
  static \u0275fac = function ProductListComponent_Factory(t) {
    return new (t || _ProductListComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["app-product-list"]], decls: 68, vars: 15, consts: [[1, "products-page"], [1, "page-header"], [1, "container"], [1, "products-layout"], [1, "filters-sidebar"], [1, "filter-section"], [1, "filter-options"], [1, "filter-option"], ["type", "radio", "name", "category", 3, "ngModelChange", "change", "value", "ngModel"], [1, "count"], ["class", "filter-option", 3, "active", 4, "ngFor", "ngForOf"], [1, "price-range"], ["type", "number", "placeholder", "T\u1EEB", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["type", "number", "placeholder", "\u0110\u1EBFn", 1, "form-control", 3, "ngModelChange", "change", "ngModel"], [1, "filter-checkbox"], ["type", "checkbox", 3, "ngModelChange", "change", "ngModel"], [1, "btn", "btn-outline", "btn-block", 3, "click"], [1, "products-main"], [1, "products-toolbar"], [1, "results-info"], [1, "toolbar-actions"], [1, "search-box"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm...", 3, "ngModelChange", "keyup.enter", "ngModel"], [3, "click"], [1, "material-icons"], [1, "form-control", "sort-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "price-asc"], ["value", "price-desc"], ["value", "soldCount-desc"], ["value", "rating-desc"], ["value", "createdAt-desc"], ["class", "loading-state", 4, "ngIf"], ["class", "products-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "products-grid"], [3, "product", 4, "ngFor", "ngForOf"], [3, "product"], [1, "empty-state"], [1, "btn", "btn-primary", 3, "click"], [1, "pagination"], [3, "click", "disabled"], [3, "active", "click", 4, "ngFor", "ngForOf"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "S\u1EA3n Ph\u1EA9m N\xF4ng S\u1EA3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "T\xECm ki\u1EBFm v\xE0 l\u1EF1a ch\u1ECDn c\xE1c s\u1EA3n ph\u1EA9m n\xF4ng s\u1EA3n t\u01B0\u01A1i ngon");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 2)(8, "div", 3)(9, "aside", 4)(10, "div", 5)(11, "h3");
      \u0275\u0275text(12, "Danh M\u1EE5c");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 6)(14, "label", 7)(15, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedCategoryId, $event) || (ctx.selectedCategoryId = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ProductListComponent_Template_input_change_15_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span");
      \u0275\u0275text(17, "T\u1EA5t c\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, ProductListComponent_label_19_Template, 4, 5, "label", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 5)(21, "h3");
      \u0275\u0275text(22, "Kho\u1EA3ng Gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 11)(24, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.minPrice, $event) || (ctx.minPrice = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ProductListComponent_Template_input_change_24_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26, "-");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.maxPrice, $event) || (ctx.maxPrice = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ProductListComponent_Template_input_change_27_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 5)(29, "h3");
      \u0275\u0275text(30, "T\xECnh Tr\u1EA1ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "label", 14)(32, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.inStockOnly, $event) || (ctx.inStockOnly = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ProductListComponent_Template_input_change_32_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34, "Ch\u1EC9 hi\u1EC3n th\u1ECB c\xF2n h\xE0ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "button", 16);
      \u0275\u0275listener("click", function ProductListComponent_Template_button_click_35_listener() {
        return ctx.resetFilters();
      });
      \u0275\u0275text(36, "\u0110\u1EB7t l\u1EA1i b\u1ED9 l\u1ECDc");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 17)(38, "div", 18)(39, "div", 19)(40, "span");
      \u0275\u0275text(41, "T\xECm th\u1EA5y ");
      \u0275\u0275elementStart(42, "strong");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275text(44, " s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 20)(46, "div", 21)(47, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_47_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function ProductListComponent_Template_input_keyup_enter_47_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 23);
      \u0275\u0275listener("click", function ProductListComponent_Template_button_click_48_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(49, "span", 24);
      \u0275\u0275text(50, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(51, "select", 25);
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_select_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.sortBy, $event) || (ctx.sortBy = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ProductListComponent_Template_select_change_51_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(52, "option", 26);
      \u0275\u0275text(53, "S\u1EAFp x\u1EBFp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "option", 27);
      \u0275\u0275text(55, "Gi\xE1: Th\u1EA5p \u0111\u1EBFn cao");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "option", 28);
      \u0275\u0275text(57, "Gi\xE1: Cao \u0111\u1EBFn th\u1EA5p");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "option", 29);
      \u0275\u0275text(59, "B\xE1n ch\u1EA1y nh\u1EA5t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "option", 30);
      \u0275\u0275text(61, "\u0110\xE1nh gi\xE1 cao nh\u1EA5t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "option", 31);
      \u0275\u0275text(63, "M\u1EDBi nh\u1EA5t");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(64, ProductListComponent_div_64_Template, 4, 0, "div", 32)(65, ProductListComponent_div_65_Template, 2, 1, "div", 33)(66, ProductListComponent_div_66_Template, 9, 0, "div", 34)(67, ProductListComponent_div_67_Template, 8, 3, "div", 35);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275classProp("active", !ctx.selectedCategoryId);
      \u0275\u0275advance();
      \u0275\u0275property("value", "");
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedCategoryId);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.minPrice);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.maxPrice);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.inStockOnly);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.totalProducts);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.sortBy);
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.products.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.products.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.totalPages > 1);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel, ProductCardComponent], styles: ['\n\n.page-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-color),\n      var(--primary-dark));\n  color: white;\n  padding: 48px 0;\n  text-align: center;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 36px;\n  margin-bottom: 8px;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  opacity: 0.9;\n  font-size: 16px;\n}\n.products-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 32px;\n  padding: 32px 0;\n}\n@media (max-width: 1024px) {\n  .products-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 1024px) {\n  .filters-sidebar[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.filter-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  padding: 20px;\n  margin-bottom: 16px;\n  box-shadow: var(--shadow);\n}\n.filter-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: "Roboto", sans-serif;\n  font-size: 16px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--border-color);\n}\n.filter-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.filter-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: var(--transition);\n}\n.filter-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  accent-color: var(--primary-color);\n}\n.filter-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-of-type {\n  flex: 1;\n}\n.filter-option[_ngcontent-%COMP%]:hover {\n  background: var(--background-color);\n}\n.filter-option.active[_ngcontent-%COMP%] {\n  background: rgba(46, 125, 50, 0.1);\n  color: var(--primary-color);\n}\n.price-range[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.price-range[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px;\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  font-size: 14px;\n}\n.price-range[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--primary-color);\n}\n.filter-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n}\n.filter-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  accent-color: var(--primary-color);\n  width: 18px;\n  height: 18px;\n}\n.products-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.toolbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  overflow: hidden;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  padding: 10px 16px;\n  width: 240px;\n  font-size: 14px;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.search-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: var(--primary-color);\n  border: none;\n  padding: 10px 14px;\n  cursor: pointer;\n  color: white;\n}\n.search-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: var(--primary-dark);\n}\n.sort-select[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n  min-width: 180px;\n}\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 480px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.loading-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  margin: 0 auto 16px;\n  border-width: 4px;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 64px 24px;\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n/*# sourceMappingURL=product-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src\\app\\features\\products\\product-list.component.ts", lineNumber: 342 });
})();

// src/app/features/products/products.module.ts
var routes = [
  { path: "", component: ProductListComponent }
];
var ProductsModule = class _ProductsModule {
  static \u0275fac = function ProductsModule_Factory(t) {
    return new (t || _ProductsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ProductsModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  ProductsModule
};
//# sourceMappingURL=chunk-BWUQWIXF.js.map
