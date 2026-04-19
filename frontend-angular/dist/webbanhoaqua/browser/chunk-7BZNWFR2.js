import {
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  SharedModule,
  UserService,
  ɵNgSelectMultipleOption
} from "./chunk-S4GDKINQ.js";
import {
  DatePipe,
  NgForOf,
  NgIf,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GBTPURO4.js";

// src/app/features/admin/users/admin-users.component.ts
function AdminUsersComponent_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 14);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "span", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "button", 15);
    \u0275\u0275listener("click", function AdminUsersComponent_tr_38_Template_button_click_20_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.changeStatus(user_r2));
    });
    \u0275\u0275elementStart(21, "span", 6);
    \u0275\u0275text(22, "sync");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r2.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.phone || "-");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-primary", user_r2.role === "ADMIN")("badge-secondary", user_r2.role === "USER");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.role === "ADMIN" ? "Admin" : "Kh\xE1ch h\xE0ng");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-success", user_r2.status === "ACTIVE")("badge-error", user_r2.status === "LOCKED")("badge-warning", user_r2.status === "INACTIVE");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusText(user_r2.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((user_r2._count == null ? null : user_r2._count.orders) || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 17, user_r2.createdAt, "dd/MM/yyyy"));
  }
}
function AdminUsersComponent_div_39_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function AdminUsersComponent_div_39_button_1_Template_button_click_0_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(p_r5));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", p_r5 === ctx_r2.currentPage);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5);
  }
}
function AdminUsersComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, AdminUsersComponent_div_39_button_1_Template, 2, 3, "button", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.pages);
  }
}
var AdminUsersComponent = class _AdminUsersComponent {
  userService;
  users = [];
  searchQuery = "";
  filterRole = "";
  currentPage = 1;
  totalPages = 1;
  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  constructor(userService) {
    this.userService = userService;
  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getAllUsers({ page: this.currentPage, limit: 20, search: this.searchQuery, role: this.filterRole }).subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.users || [];
          this.totalPages = res.pagination?.totalPages || 1;
        }
      }
    });
  }
  goToPage(page) {
    this.currentPage = page;
    this.loadUsers();
  }
  getStatusText(status) {
    const map = { "ACTIVE": "Ho\u1EA1t \u0111\u1ED9ng", "INACTIVE": "Kh\xF4ng ho\u1EA1t \u0111\u1ED9ng", "LOCKED": "B\u1ECB kh\xF3a" };
    return map[status] || status;
  }
  changeStatus(user) {
    const status = user.status === "ACTIVE" ? "LOCKED" : "ACTIVE";
    if (confirm(`${status === "LOCKED" ? "Kh\xF3a" : "M\u1EDF kh\xF3a"} t\xE0i kho\u1EA3n "${user.fullName}"?`)) {
      this.userService.updateUserStatus(user.id, status).subscribe({
        next: () => {
          this.loadUsers();
          alert("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng!");
        },
        error: (err) => alert(err.error?.message || "L\u1ED7i!")
      });
    }
  }
  static \u0275fac = function AdminUsersComponent_Factory(t) {
    return new (t || _AdminUsersComponent)(\u0275\u0275directiveInject(UserService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUsersComponent, selectors: [["app-admin-users"]], decls: 40, vars: 4, consts: [[1, "users-page"], [1, "page-header"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm...", 3, "ngModelChange", "keyup.enter", "ngModel"], [3, "click"], [1, "material-icons"], [1, "form-control", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "USER"], ["value", "ADMIN"], [1, "table-container"], [4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], [1, "badge"], ["title", "\u0110\u1ED5i tr\u1EA1ng th\xE1i", 1, "action-btn", 3, "click"], [1, "pagination"], [3, "active", "click", 4, "ngFor", "ngForOf"]], template: function AdminUsersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Qu\u1EA3n l\xFD Kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function AdminUsersComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function AdminUsersComponent_Template_input_keyup_enter_6_listener() {
        return ctx.loadUsers();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 5);
      \u0275\u0275listener("click", function AdminUsersComponent_Template_button_click_7_listener() {
        return ctx.loadUsers();
      });
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function AdminUsersComponent_Template_select_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filterRole, $event) || (ctx.filterRole = $event);
        return $event;
      });
      \u0275\u0275listener("change", function AdminUsersComponent_Template_select_change_10_listener() {
        return ctx.loadUsers();
      });
      \u0275\u0275elementStart(11, "option", 8);
      \u0275\u0275text(12, "T\u1EA5t c\u1EA3 vai tr\xF2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "option", 9);
      \u0275\u0275text(14, "Kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 10);
      \u0275\u0275text(16, "Admin");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 11)(18, "table")(19, "thead")(20, "tr")(21, "th");
      \u0275\u0275text(22, "Kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th");
      \u0275\u0275text(24, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th");
      \u0275\u0275text(26, "\u0110i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th");
      \u0275\u0275text(28, "Vai tr\xF2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th");
      \u0275\u0275text(30, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th");
      \u0275\u0275text(32, "\u0110\u01A1n h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th");
      \u0275\u0275text(34, "Ng\xE0y t\u1EA1o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "th");
      \u0275\u0275text(36, "Thao t\xE1c");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "tbody");
      \u0275\u0275template(38, AdminUsersComponent_tr_38_Template, 23, 20, "tr", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(39, AdminUsersComponent_div_39_Template, 2, 1, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filterRole);
      \u0275\u0275advance(28);
      \u0275\u0275property("ngForOf", ctx.users);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.totalPages > 1);
    }
  }, dependencies: [NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  padding: 10px 16px;\n  width: 280px;\n}\n.search-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: var(--primary-color);\n  border: none;\n  padding: 10px;\n  color: white;\n  cursor: pointer;\n}\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: var(--shadow);\n  overflow-x: auto;\n}\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 6px;\n  cursor: pointer;\n  color: var(--text-secondary);\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  color: var(--primary-color);\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n/*# sourceMappingURL=admin-users.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUsersComponent, { className: "AdminUsersComponent", filePath: "src\\app\\features\\admin\\users\\admin-users.component.ts", lineNumber: 56 });
})();

// src/app/features/admin/users/users.module.ts
var routes = [{ path: "", component: AdminUsersComponent }];
var UsersModule = class _UsersModule {
  static \u0275fac = function UsersModule_Factory(t) {
    return new (t || _UsersModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UsersModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  UsersModule
};
//# sourceMappingURL=chunk-7BZNWFR2.js.map
