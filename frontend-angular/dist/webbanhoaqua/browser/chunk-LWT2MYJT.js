import {
  AuthService,
  FormsModule,
  ReactiveFormsModule,
  SharedModule
} from "./chunk-S4GDKINQ.js";
import {
  CommonModule,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  filter,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GBTPURO4.js";

// src/app/layouts/admin/admin-layout.component.ts
var AdminLayoutComponent = class _AdminLayoutComponent {
  authService;
  router;
  pageTitle = "Dashboard";
  currentUser;
  sidebarOpen = false;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.updatePageTitle(event.urlAfterRedirects);
    });
  }
  updatePageTitle(url) {
    const routeMap = {
      "/admin/dashboard": "Dashboard",
      "/admin/categories": "Qu\u1EA3n l\xFD Danh m\u1EE5c",
      "/admin/products": "Qu\u1EA3n l\xFD S\u1EA3n ph\u1EA9m",
      "/admin/orders": "Qu\u1EA3n l\xFD \u0110\u01A1n h\xE0ng",
      "/admin/users": "Qu\u1EA3n l\xFD Kh\xE1ch h\xE0ng",
      "/admin/statistics": "Th\u1ED1ng k\xEA Doanh thu"
    };
    for (const [route, title] of Object.entries(routeMap)) {
      if (url.startsWith(route)) {
        this.pageTitle = title;
        return;
      }
    }
    this.pageTitle = "Admin";
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.querySelector(".admin-sidebar");
    if (sidebar) {
      sidebar.classList.toggle("open", this.sidebarOpen);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  static \u0275fac = function AdminLayoutComponent_Factory(t) {
    return new (t || _AdminLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], decls: 76, vars: 2, consts: [[1, "admin-wrapper"], [1, "admin-sidebar"], [1, "sidebar-header"], [1, "logo"], [1, "material-icons"], [1, "sidebar-nav"], [1, "nav-section"], [1, "nav-section-title"], ["routerLink", "/admin/dashboard", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/admin/categories", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/admin/products", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/admin/orders", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/admin/users", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/admin/statistics", "routerLinkActive", "active", 1, "nav-item"], [1, "sidebar-footer"], ["routerLink", "/", "target", "_blank", 1, "nav-item"], [1, "nav-item", 3, "click"], [1, "admin-main"], [1, "admin-header"], [1, "header-left"], [1, "toggle-btn", 3, "click"], [1, "page-title"], [1, "header-right"], [1, "admin-info"], [1, "badge", "badge-primary"], [1, "admin-content"]], template: function AdminLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "eco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "WebBan");
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9, "HoaQua");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "nav", 5)(11, "div", 6)(12, "span", 7);
      \u0275\u0275text(13, "T\u1ED5ng quan");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "a", 8)(15, "span", 4);
      \u0275\u0275text(16, "dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span");
      \u0275\u0275text(18, "Dashboard");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 6)(20, "span", 7);
      \u0275\u0275text(21, "Qu\u1EA3n l\xFD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "a", 9)(23, "span", 4);
      \u0275\u0275text(24, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26, "Danh m\u1EE5c");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "a", 10)(28, "span", 4);
      \u0275\u0275text(29, "inventory_2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31, "S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "a", 11)(33, "span", 4);
      \u0275\u0275text(34, "receipt_long");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span");
      \u0275\u0275text(36, "\u0110\u01A1n h\xE0ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "a", 12)(38, "span", 4);
      \u0275\u0275text(39, "people");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41, "Kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "a", 13)(43, "span", 4);
      \u0275\u0275text(44, "bar_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "span");
      \u0275\u0275text(46, "Th\u1ED1ng k\xEA");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 14)(48, "a", 15)(49, "span", 4);
      \u0275\u0275text(50, "open_in_new");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "span");
      \u0275\u0275text(52, "Xem website");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "button", 16);
      \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_53_listener() {
        return ctx.logout();
      });
      \u0275\u0275elementStart(54, "span", 4);
      \u0275\u0275text(55, "logout");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "span");
      \u0275\u0275text(57, "\u0110\u0103ng xu\u1EA5t");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(58, "div", 17)(59, "header", 18)(60, "div", 19)(61, "button", 20);
      \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_61_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementStart(62, "span", 4);
      \u0275\u0275text(63, "menu");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "h1", 21);
      \u0275\u0275text(65);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "div", 22)(67, "div", 23)(68, "span", 4);
      \u0275\u0275text(69, "account_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "span");
      \u0275\u0275text(71);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "span", 24);
      \u0275\u0275text(73, "Admin");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(74, "div", 25);
      \u0275\u0275element(75, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(65);
      \u0275\u0275textInterpolate(ctx.pageTitle);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.currentUser == null ? null : ctx.currentUser.fullName);
    }
  }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive], styles: ['\n\n.admin-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: #f5f5f5;\n}\n.admin-sidebar[_ngcontent-%COMP%] {\n  width: 260px;\n  background: #1a1a2e;\n  color: white;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  z-index: 100;\n  transition: transform 0.3s ease;\n}\n@media (max-width: 768px) {\n  .admin-sidebar[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n  }\n  .admin-sidebar.open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.sidebar-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-family: "Playfair Display", serif;\n  font-size: 20px;\n  font-weight: 700;\n}\n.sidebar-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #4caf50;\n}\n.sidebar-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 0;\n}\n.nav-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.nav-section[_ngcontent-%COMP%]   .nav-section-title[_ngcontent-%COMP%] {\n  display: block;\n  padding: 8px 20px;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: rgba(255, 255, 255, 0.5);\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 20px;\n  color: rgba(255, 255, 255, 0.8);\n  transition: all 0.2s ease;\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  background: none;\n  width: 100%;\n  font-size: 14px;\n}\n.nav-item[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: white;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(76, 175, 80, 0.2);\n  color: #4caf50;\n  border-left: 3px solid #4caf50;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding: 8px 0;\n}\n.admin-main[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-left: 260px;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .admin-main[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n}\n.admin-header[_ngcontent-%COMP%] {\n  background: white;\n  padding: 16px 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n}\n.header-left[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--text-color);\n}\n@media (max-width: 768px) {\n  .header-left[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.header-left[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%] {\n  font-family: "Roboto", sans-serif;\n  font-size: 20px;\n  font-weight: 600;\n  color: var(--text-color);\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%]   .admin-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--text-color);\n}\n.header-right[_ngcontent-%COMP%]   .admin-info[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.header-right[_ngcontent-%COMP%]   .admin-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  font-weight: 500;\n}\n.admin-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n}\n@media (max-width: 768px) {\n  .admin-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=admin-layout.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "src\\app\\layouts\\admin\\admin-layout.component.ts", lineNumber: 282 });
})();

// src/app/layouts/admin/admin-layout-routing.module.ts
var routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", loadChildren: () => import("./chunk-RKWXOPXV.js").then((m) => m.DashboardModule) },
      { path: "categories", loadChildren: () => import("./chunk-XPUPQGFJ.js").then((m) => m.CategoriesModule) },
      { path: "products", loadChildren: () => import("./chunk-STE6YNZ2.js").then((m) => m.ProductsModule) },
      { path: "orders", loadChildren: () => import("./chunk-FFPZ6H6F.js").then((m) => m.OrdersModule) },
      { path: "users", loadChildren: () => import("./chunk-7BZNWFR2.js").then((m) => m.UsersModule) },
      { path: "statistics", loadChildren: () => import("./chunk-WPJ5EJ43.js").then((m) => m.StatisticsModule) }
    ]
  }
];
var AdminLayoutRoutingModule = class _AdminLayoutRoutingModule {
  static \u0275fac = function AdminLayoutRoutingModule_Factory(t) {
    return new (t || _AdminLayoutRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminLayoutRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};

// src/app/layouts/admin/admin-layout.module.ts
var AdminLayoutModule = class _AdminLayoutModule {
  static \u0275fac = function AdminLayoutModule_Factory(t) {
    return new (t || _AdminLayoutModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminLayoutModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminLayoutRoutingModule,
    SharedModule
  ] });
};
export {
  AdminLayoutModule
};
//# sourceMappingURL=chunk-LWT2MYJT.js.map
