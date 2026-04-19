import {
  CategoryService,
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ProductService,
  SelectControlValueAccessor,
  SharedModule,
  VndCurrencyPipe,
  ɵNgSelectMultipleOption
} from "./chunk-S4GDKINQ.js";
import {
  NgForOf,
  NgIf,
  RouterModule,
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/admin/products/admin-products.component.ts
function AdminProductsComponent_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275property("value", cat_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r1.name);
  }
}
function AdminProductsComponent_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "img", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275elementStart(7, "small", 17);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 18);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "vndCurrency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "span", 19);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td")(23, "button", 20);
    \u0275\u0275listener("click", function AdminProductsComponent_tr_39_Template_button_click_23_listener() {
      const p_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.editProduct(p_r3));
    });
    \u0275\u0275elementStart(24, "span", 3);
    \u0275\u0275text(25, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 21);
    \u0275\u0275listener("click", function AdminProductsComponent_tr_39_Template_button_click_26_listener() {
      const p_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteProduct(p_r3));
    });
    \u0275\u0275elementStart(27, "span", 3);
    \u0275\u0275text(28, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r3.getImage(p_r3), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.sku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r3.category == null ? null : p_r3.category.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 14, p_r3.price));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-error", p_r3.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r3.stock);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r3.soldCount);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-success", p_r3.isActive)("badge-secondary", !p_r3.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r3.isActive ? "Ho\u1EA1t \u0111\u1ED9ng" : "\u1EA8n");
  }
}
function AdminProductsComponent_div_40_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function AdminProductsComponent_div_40_button_1_Template_button_click_0_listener() {
      const p_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToPage(p_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", p_r6 === ctx_r3.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r6);
  }
}
function AdminProductsComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275template(1, AdminProductsComponent_div_40_button_1_Template, 2, 3, "button", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.pages);
  }
}
function AdminProductsComponent_div_41_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("value", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.name);
  }
}
function AdminProductsComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function AdminProductsComponent_div_41_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 25);
    \u0275\u0275listener("click", function AdminProductsComponent_div_41_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 27);
    \u0275\u0275listener("click", function AdminProductsComponent_div_41_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275elementStart(6, "span", 3);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 28)(9, "div", 29)(10, "div", 30)(11, "label");
    \u0275\u0275text(12, "T\xEAn s\u1EA3n ph\u1EA9m *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.name, $event) || (ctx_r3.formData.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 30)(15, "label");
    \u0275\u0275text(16, "Danh m\u1EE5c *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 32);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.categoryId, $event) || (ctx_r3.formData.categoryId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(18, AdminProductsComponent_div_41_option_18_Template, 2, 2, "option", 10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 29)(20, "div", 30)(21, "label");
    \u0275\u0275text(22, "Gi\xE1 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.price, $event) || (ctx_r3.formData.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 30)(25, "label");
    \u0275\u0275text(26, "Gi\xE1 g\u1ED1c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.originalPrice, $event) || (ctx_r3.formData.originalPrice = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 29)(29, "div", 30)(30, "label");
    \u0275\u0275text(31, "T\u1ED3n kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.stock, $event) || (ctx_r3.formData.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 30)(34, "label");
    \u0275\u0275text(35, "\u0110\u01A1n v\u1ECB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.unit, $event) || (ctx_r3.formData.unit = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 30)(38, "label");
    \u0275\u0275text(39, "M\xF4 t\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "textarea", 35);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_textarea_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.description, $event) || (ctx_r3.formData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 30)(42, "label");
    \u0275\u0275text(43, "H\xECnh \u1EA3nh (URL)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.imageUrl, $event) || (ctx_r3.formData.imageUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 29)(46, "label", 37)(47, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.isFeatured, $event) || (ctx_r3.formData.isFeatured = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(48, " S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "label", 37)(50, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_div_41_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.formData.isActive, $event) || (ctx_r3.formData.isActive = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(51, " Ho\u1EA1t \u0111\u1ED9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 39)(53, "button", 40);
    \u0275\u0275listener("click", function AdminProductsComponent_div_41_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeModal());
    });
    \u0275\u0275text(54, "H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 2);
    \u0275\u0275listener("click", function AdminProductsComponent_div_41_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveProduct());
    });
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r3.editingProduct ? "S\u1EEDa" : "Th\xEAm", " s\u1EA3n ph\u1EA9m");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.categoryId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.categories);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.price);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.originalPrice);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.stock);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.unit);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.imageUrl);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.isFeatured);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.formData.isActive);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.editingProduct ? "L\u01B0u" : "Th\xEAm");
  }
}
var AdminProductsComponent = class _AdminProductsComponent {
  productService;
  categoryService;
  products = [];
  categories = [];
  searchQuery = "";
  filterCategory = "";
  currentPage = 1;
  totalPages = 1;
  showModal = false;
  editingProduct = null;
  formData = { name: "", categoryId: "", price: 0, originalPrice: null, stock: 0, unit: "kg", description: "", imageUrl: "", isFeatured: false, isActive: true };
  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  constructor(productService, categoryService) {
    this.productService = productService;
    this.categoryService = categoryService;
  }
  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe({ next: (res) => {
      if (res.success)
        this.categories = res.data;
    } });
  }
  loadProducts() {
    this.productService.getAllProductsAdmin({ page: this.currentPage, limit: 20, search: this.searchQuery, categoryId: this.filterCategory }).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products || [];
          this.totalPages = res.pagination?.totalPages || 1;
        }
      }
    });
  }
  goToPage(page) {
    this.currentPage = page;
    this.loadProducts();
  }
  getImage(p) {
    if (p.images && p.images.length > 0)
      return p.images[0].url;
    return "https://via.placeholder.com/50";
  }
  openModal() {
    this.showModal = true;
    this.editingProduct = null;
    this.formData = { name: "", categoryId: this.categories[0]?.id || "", price: 0, originalPrice: null, stock: 0, unit: "kg", description: "", imageUrl: "", isFeatured: false, isActive: true };
  }
  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
  }
  editProduct(p) {
    this.editingProduct = p;
    this.formData = { name: p.name, categoryId: p.categoryId, price: p.price, originalPrice: p.originalPrice, stock: p.stock, unit: p.unit, description: p.description, imageUrl: p.images?.[0]?.url || "", isFeatured: p.isFeatured, isActive: p.isActive };
    this.showModal = true;
  }
  saveProduct() {
    const data = __spreadValues({}, this.formData);
    if (data.imageUrl)
      data.images = [data.imageUrl];
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, data).subscribe({ next: () => {
        this.loadProducts();
        this.closeModal();
        alert("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!");
      }, error: (err) => alert(err.error?.message || "L\u1ED7i!") });
    } else {
      this.productService.createProduct(data).subscribe({ next: () => {
        this.loadProducts();
        this.closeModal();
        alert("Th\xEAm th\xE0nh c\xF4ng!");
      }, error: (err) => alert(err.error?.message || "L\u1ED7i!") });
    }
  }
  deleteProduct(p) {
    if (confirm(`X\xF3a s\u1EA3n ph\u1EA9m "${p.name}"?`)) {
      this.productService.deleteProduct(p.id).subscribe({ next: () => {
        this.loadProducts();
        alert("X\xF3a th\xE0nh c\xF4ng!");
      }, error: (err) => alert(err.error?.message || "L\u1ED7i!") });
    }
  }
  static \u0275fac = function AdminProductsComponent_Factory(t) {
    return new (t || _AdminProductsComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CategoryService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminProductsComponent, selectors: [["app-admin-products"]], decls: 42, vars: 6, consts: [[1, "products-page"], [1, "page-header"], [1, "btn", "btn-primary", 3, "click"], [1, "material-icons"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm...", 3, "ngModelChange", "keyup.enter", "ngModel"], [3, "click"], [1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "table-container"], [4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], ["class", "modal-backdrop", 3, "click", 4, "ngIf"], [3, "value"], [1, "product-image", 3, "src"], [1, "text-secondary"], [1, "price"], [1, "badge"], ["title", "S\u1EEDa", 1, "action-btn", 3, "click"], ["title", "X\xF3a", 1, "action-btn", "danger", 3, "click"], [1, "pagination"], [3, "active", "click", 4, "ngFor", "ngForOf"], [1, "modal-backdrop", 3, "click"], [1, "modal", "large", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["type", "text", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "kg, c\xE1i, t\xFAi...", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "4", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "https://...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "checkbox-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function AdminProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Qu\u1EA3n l\xFD S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function AdminProductsComponent_Template_button_click_4_listener() {
        return ctx.openModal();
      });
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Th\xEAm s\u1EA3n ph\u1EA9m ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "div", 5)(10, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function AdminProductsComponent_Template_input_keyup_enter_10_listener() {
        return ctx.loadProducts();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function AdminProductsComponent_Template_button_click_11_listener() {
        return ctx.loadProducts();
      });
      \u0275\u0275elementStart(12, "span", 3);
      \u0275\u0275text(13, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function AdminProductsComponent_Template_select_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filterCategory, $event) || (ctx.filterCategory = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminProductsComponent_Template_select_change_14_listener() {
        return ctx.loadProducts();
      });
      \u0275\u0275elementStart(15, "option", 9);
      \u0275\u0275text(16, "T\u1EA5t c\u1EA3 danh m\u1EE5c");
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, AdminProductsComponent_option_17_Template, 2, 2, "option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 11)(19, "table")(20, "thead")(21, "tr")(22, "th");
      \u0275\u0275text(23, "H\xECnh \u1EA3nh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th");
      \u0275\u0275text(25, "T\xEAn s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th");
      \u0275\u0275text(27, "Danh m\u1EE5c");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "th");
      \u0275\u0275text(29, "Gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th");
      \u0275\u0275text(31, "T\u1ED3n kho");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th");
      \u0275\u0275text(33, "\u0110\xE3 b\xE1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th");
      \u0275\u0275text(35, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th");
      \u0275\u0275text(37, "Thao t\xE1c");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "tbody");
      \u0275\u0275template(39, AdminProductsComponent_tr_39_Template, 29, 16, "tr", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(40, AdminProductsComponent_div_40_Template, 2, 1, "div", 13)(41, AdminProductsComponent_div_41_Template, 57, 13, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filterCategory);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance(22);
      \u0275\u0275property("ngForOf", ctx.products);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.totalPages > 1);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showModal);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, VndCurrencyPipe], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  padding: 10px 16px;\n  width: 300px;\n}\n.search-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: var(--primary-color);\n  border: none;\n  padding: 10px;\n  color: white;\n  cursor: pointer;\n}\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: var(--shadow);\n  overflow-x: auto;\n}\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  white-space: nowrap;\n}\n.product-image[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.price[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  font-weight: 600;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 6px;\n  cursor: pointer;\n  color: var(--text-secondary);\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  color: var(--primary-color);\n}\n.action-btn.danger[_ngcontent-%COMP%]:hover {\n  color: var(--error-color);\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n.close-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px;\n  overflow-y: auto;\n  flex: 1;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n@media (max-width: 600px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=admin-products.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminProductsComponent, { className: "AdminProductsComponent", filePath: "src\\app\\features\\admin\\products\\admin-products.component.ts", lineNumber: 117 });
})();

// src/app/features/admin/products/products.module.ts
var routes = [{ path: "", component: AdminProductsComponent }];
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
//# sourceMappingURL=chunk-STE6YNZ2.js.map
