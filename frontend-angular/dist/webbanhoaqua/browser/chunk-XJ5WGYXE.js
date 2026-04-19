import {
  AuthService
} from "./chunk-S4GDKINQ.js";
import {
  Router,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-GBTPURO4.js";

// src/app/core/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  authService;
  router;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    if (this.authService.isLoggedIn) {
      return true;
    }
    return this.router.createUrlTree(["/auth/login"], {
      queryParams: { returnUrl: this.router.url }
    });
  }
  static \u0275fac = function AuthGuard_Factory(t) {
    return new (t || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
};
var AdminGuard = class _AdminGuard {
  authService;
  router;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    if (this.authService.isAdmin) {
      return true;
    }
    if (!this.authService.isLoggedIn) {
      return this.router.createUrlTree(["/auth/login"]);
    }
    return this.router.createUrlTree(["/"]);
  }
  static \u0275fac = function AdminGuard_Factory(t) {
    return new (t || _AdminGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminGuard, factory: _AdminGuard.\u0275fac, providedIn: "root" });
};
var GuestGuard = class _GuestGuard {
  authService;
  router;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    if (!this.authService.isLoggedIn) {
      return true;
    }
    return this.router.createUrlTree(["/"]);
  }
  static \u0275fac = function GuestGuard_Factory(t) {
    return new (t || _GuestGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GuestGuard, factory: _GuestGuard.\u0275fac, providedIn: "root" });
};

export {
  AuthGuard,
  AdminGuard,
  GuestGuard
};
//# sourceMappingURL=chunk-XJ5WGYXE.js.map
