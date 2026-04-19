import {
  AuthGuard,
  GuestGuard
} from "./chunk-XJ5WGYXE.js";
import {
  ChatbotComponent,
  FooterComponent,
  HeaderComponent,
  SharedModule
} from "./chunk-S4GDKINQ.js";
import {
  RouterModule,
  RouterOutlet,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-GBTPURO4.js";

// src/app/layouts/client/client-layout.component.ts
var ClientLayoutComponent = class _ClientLayoutComponent {
  static \u0275fac = function ClientLayoutComponent_Factory(t) {
    return new (t || _ClientLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientLayoutComponent, selectors: [["app-client-layout"]], decls: 6, vars: 0, consts: [[1, "client-layout"], [1, "main-content"]], template: function ClientLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-header");
      \u0275\u0275elementStart(2, "main", 1);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(4, "app-footer")(5, "app-chatbot");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent], styles: ["\n\n.client-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=client-layout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientLayoutComponent, { className: "ClientLayoutComponent", filePath: "src\\app\\layouts\\client\\client-layout.component.ts", lineNumber: 26 });
})();

// src/app/layouts/client/client-layout.module.ts
var routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      { path: "", loadChildren: () => import("./chunk-4OGD7HI5.js").then((m) => m.HomeModule) },
      { path: "products", loadChildren: () => import("./chunk-BWUQWIXF.js").then((m) => m.ProductsModule) },
      { path: "products/:slug", loadChildren: () => import("./chunk-XIWOPBYJ.js").then((m) => m.ProductDetailModule) },
      { path: "cart", loadChildren: () => import("./chunk-ZFZIMPQE.js").then((m) => m.CartModule) },
      { path: "checkout", loadChildren: () => import("./chunk-ZRXVWCYE.js").then((m) => m.CheckoutModule), canActivate: [AuthGuard] },
      { path: "orders", loadChildren: () => import("./chunk-F72TGE7C.js").then((m) => m.OrdersModule), canActivate: [AuthGuard] },
      { path: "orders/:id", loadChildren: () => import("./chunk-O4T6OD7C.js").then((m) => m.OrderDetailModule), canActivate: [AuthGuard] },
      { path: "profile", loadChildren: () => import("./chunk-U77SAOOK.js").then((m) => m.ProfileModule), canActivate: [AuthGuard] },
      { path: "about", loadChildren: () => import("./chunk-N2MOCKH4.js").then((m) => m.AboutModule) },
      { path: "contact", loadChildren: () => import("./chunk-6AI3PSGD.js").then((m) => m.ContactModule) },
      { path: "auth", loadChildren: () => import("./chunk-QAWTWH27.js").then((m) => m.AuthModule), canActivate: [GuestGuard] }
    ]
  }
];
var ClientLayoutModule = class _ClientLayoutModule {
  static \u0275fac = function ClientLayoutModule_Factory(t) {
    return new (t || _ClientLayoutModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ClientLayoutModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  ClientLayoutModule
};
//# sourceMappingURL=chunk-CWM67TSE.js.map
