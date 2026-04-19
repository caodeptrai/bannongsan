import {
  CategoryService,
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  SharedModule
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

// src/app/features/admin/categories/categories.component.ts
function CategoriesComponent_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "img", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 8);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "button", 9);
    \u0275\u0275listener("click", function CategoriesComponent_tr_25_Template_button_click_14_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editCategory(cat_r2));
    });
    \u0275\u0275elementStart(15, "span", 3);
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 10);
    \u0275\u0275listener("click", function CategoriesComponent_tr_25_Template_button_click_17_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(cat_r2));
    });
    \u0275\u0275elementStart(18, "span", 3);
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cat_r2.image || "https://via.placeholder.com/50", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(cat_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r2.slug);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((cat_r2._count == null ? null : cat_r2._count.products) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-success", cat_r2.isActive)("badge-secondary", !cat_r2.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2.isActive ? "Ho\u1EA1t \u0111\u1ED9ng" : "\u1EA8n");
  }
}
function CategoriesComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function CategoriesComponent_div_26_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 12);
    \u0275\u0275listener("click", function CategoriesComponent_div_26_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 13)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function CategoriesComponent_div_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275elementStart(6, "span", 3);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 15)(9, "div", 16)(10, "label");
    \u0275\u0275text(11, "T\xEAn danh m\u1EE5c *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesComponent_div_26_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.name, $event) || (ctx_r2.formData.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 16)(14, "label");
    \u0275\u0275text(15, "Slug");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesComponent_div_26_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.slug, $event) || (ctx_r2.formData.slug = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 16)(18, "label");
    \u0275\u0275text(19, "M\xF4 t\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "textarea", 19);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesComponent_div_26_Template_textarea_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.description, $event) || (ctx_r2.formData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 16)(22, "label");
    \u0275\u0275text(23, "H\xECnh \u1EA3nh URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesComponent_div_26_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.image, $event) || (ctx_r2.formData.image = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 16)(26, "label");
    \u0275\u0275text(27, "Th\u1EE9 t\u1EF1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesComponent_div_26_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.sortOrder, $event) || (ctx_r2.formData.sortOrder = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 16)(30, "label", 22)(31, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesComponent_div_26_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.isActive, $event) || (ctx_r2.formData.isActive = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(32, " Ho\u1EA1t \u0111\u1ED9ng ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 24)(34, "button", 25);
    \u0275\u0275listener("click", function CategoriesComponent_div_26_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(35, "H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 2);
    \u0275\u0275listener("click", function CategoriesComponent_div_26_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveCategory());
    });
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r2.editingCategory ? "S\u1EEDa" : "Th\xEAm", " danh m\u1EE5c");
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.slug);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.image);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.sortOrder);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.isActive);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.editingCategory ? "L\u01B0u" : "Th\xEAm");
  }
}
var CategoriesComponent = class _CategoriesComponent {
  categoryService;
  categories = [];
  showModal = false;
  editingCategory = null;
  formData = { name: "", slug: "", description: "", image: "", sortOrder: 0, isActive: true };
  constructor(categoryService) {
    this.categoryService = categoryService;
  }
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategoriesAdmin().subscribe({
      next: (res) => {
        if (res.success)
          this.categories = res.data;
      }
    });
  }
  openModal() {
    this.showModal = true;
    this.editingCategory = null;
    this.formData = { name: "", slug: "", description: "", image: "", sortOrder: 0, isActive: true };
  }
  closeModal() {
    this.showModal = false;
    this.editingCategory = null;
  }
  editCategory(cat) {
    this.editingCategory = cat;
    this.formData = __spreadValues({}, cat);
    this.showModal = true;
  }
  saveCategory() {
    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id, this.formData).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
          alert("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!");
        },
        error: (err) => alert(err.error?.message || "L\u1ED7i!")
      });
    } else {
      this.categoryService.createCategory(this.formData).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
          alert("Th\xEAm th\xE0nh c\xF4ng!");
        },
        error: (err) => alert(err.error?.message || "L\u1ED7i!")
      });
    }
  }
  deleteCategory(cat) {
    if (confirm(`X\xF3a danh m\u1EE5c "${cat.name}"?`)) {
      this.categoryService.deleteCategory(cat.id).subscribe({
        next: () => {
          this.loadCategories();
          alert("X\xF3a th\xE0nh c\xF4ng!");
        },
        error: (err) => alert(err.error?.message || "L\u1ED7i!")
      });
    }
  }
  static \u0275fac = function CategoriesComponent_Factory(t) {
    return new (t || _CategoriesComponent)(\u0275\u0275directiveInject(CategoryService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoriesComponent, selectors: [["app-categories"]], decls: 27, vars: 2, consts: [[1, "categories-page"], [1, "page-header"], [1, "btn", "btn-primary", 3, "click"], [1, "material-icons"], [1, "table-container"], [4, "ngFor", "ngForOf"], ["class", "modal-backdrop", 3, "click", 4, "ngIf"], [1, "cat-image", 3, "src"], [1, "badge"], ["title", "S\u1EEDa", 1, "action-btn", 3, "click"], ["title", "X\xF3a", 1, "action-btn", "danger", 3, "click"], [1, "modal-backdrop", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-group"], ["type", "text", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "auto-generated", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "https://...", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "checkbox-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function CategoriesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Qu\u1EA3n l\xFD Danh m\u1EE5c");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function CategoriesComponent_Template_button_click_4_listener() {
        return ctx.openModal();
      });
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Th\xEAm danh m\u1EE5c ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "table")(10, "thead")(11, "tr")(12, "th");
      \u0275\u0275text(13, "H\xECnh \u1EA3nh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "th");
      \u0275\u0275text(15, "T\xEAn danh m\u1EE5c");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "th");
      \u0275\u0275text(17, "Slug");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "th");
      \u0275\u0275text(19, "S\u1ED1 s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th");
      \u0275\u0275text(21, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th");
      \u0275\u0275text(23, "Thao t\xE1c");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "tbody");
      \u0275\u0275template(25, CategoriesComponent_tr_25_Template, 20, 9, "tr", 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(26, CategoriesComponent_div_26_Template, 38, 8, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(25);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showModal);
    }
  }, dependencies: [NgForOf, NgIf, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: var(--shadow);\n  overflow: hidden;\n}\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.cat-image[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 6px;\n  cursor: pointer;\n  color: var(--text-secondary);\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  color: var(--primary-color);\n}\n.action-btn.danger[_ngcontent-%COMP%]:hover {\n  color: var(--error-color);\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 500px;\n  max-width: 90vw;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin: 0;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n.close-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-height: 60vh;\n  overflow-y: auto;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=categories.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoriesComponent, { className: "CategoriesComponent", filePath: "src\\app\\features\\admin\\categories\\categories.component.ts", lineNumber: 101 });
})();

// src/app/features/admin/categories/categories.module.ts
var routes = [{ path: "", component: CategoriesComponent }];
var CategoriesModule = class _CategoriesModule {
  static \u0275fac = function CategoriesModule_Factory(t) {
    return new (t || _CategoriesModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CategoriesModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  CategoriesModule
};
//# sourceMappingURL=chunk-XPUPQGFJ.js.map
