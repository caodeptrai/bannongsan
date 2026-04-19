import {
  AdminGuard
} from "./chunk-XJ5WGYXE.js";
import {
  AuthService,
  BrowserAnimationsModule,
  CartService,
  ChatbotComponent,
  FooterComponent,
  FormsModule,
  HeaderComponent,
  ReactiveFormsModule,
  SharedModule
} from "./chunk-S4GDKINQ.js";
import {
  BrowserModule,
  HttpClientModule,
  RouterModule,
  RouterOutlet,
  platformBrowser,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-GBTPURO4.js";

// src/app/app-routing.module.ts
var routes = [
  // Client Layout - lazy load
  {
    path: "",
    loadChildren: () => import("./chunk-CWM67TSE.js").then((m) => m.ClientLayoutModule)
  },
  // Admin Layout
  {
    path: "admin",
    loadChildren: () => import("./chunk-LWT2MYJT.js").then((m) => m.AdminLayoutModule),
    canActivate: [AdminGuard]
  },
  // Default redirect
  { path: "**", redirectTo: "" }
];
var AppRoutingModule = class _AppRoutingModule {
  static \u0275fac = function AppRoutingModule_Factory(t) {
    return new (t || _AppRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" }), RouterModule] });
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  authService;
  cartService;
  constructor(authService, cartService) {
    this.authService = authService;
    this.cartService = cartService;
  }
  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.cartService.loadCart();
    }
  }
  static \u0275fac = function AppComponent_Factory(t) {
    return new (t || _AppComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(CartService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "main-content"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header");
      \u0275\u0275elementStart(1, "main", 0);
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-footer")(4, "app-chatbot");
    }
  }, dependencies: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent], styles: ["\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: calc(100vh - 200px);\n}\n/*# sourceMappingURL=app.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 21 });
})();

// src/app/app.module.ts
var AppModule = class _AppModule {
  static \u0275fac = function AppModule_Factory(t) {
    return new (t || _AppModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ] });
};

// src/main.ts
platformBrowser().bootstrapModule(AppModule).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
