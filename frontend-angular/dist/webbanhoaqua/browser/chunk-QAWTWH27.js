import {
  AuthService,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  SharedModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-S4GDKINQ.js";
import {
  ActivatedRoute,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  __objRest,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-GBTPURO4.js";

// src/app/features/auth/login.component.ts
function LoginComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function LoginComponent_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, " Email kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, " Email kh\xF4ng h\u1EE3p l\u1EC7 ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, " M\u1EADt kh\u1EA9u kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0110\u0103ng nh\u1EADp");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
var LoginComponent = class _LoginComponent {
  fb;
  authService;
  router;
  route;
  loginForm;
  loading = false;
  errorMessage = "";
  constructor(fb, authService, router, route) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid)
      return;
    this.loading = true;
    this.errorMessage = "";
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
          this.router.navigateByUrl(returnUrl);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || "\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i!";
      }
    });
  }
  fillDemo(email) {
    this.loginForm.patchValue({
      email,
      password: "123456"
    });
  }
  static \u0275fac = function LoginComponent_Factory(t) {
    return new (t || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 40, vars: 12, consts: [[1, "auth-page"], [1, "auth-container"], [1, "auth-card"], [1, "auth-header"], ["class", "alert alert-error", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "auth-footer"], ["routerLink", "/auth/register"], [1, "demo-accounts"], [1, "demo-account", 3, "click"], [1, "alert", "alert-error"], [1, "error-message"], [1, "spinner"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1");
      \u0275\u0275text(5, "\u0110\u0103ng Nh\u1EADp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "Ch\xE0o m\u1EEBng b\u1EA1n quay tr\u1EDF l\u1EA1i!");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, LoginComponent_div_8_Template, 2, 1, "div", 4);
      \u0275\u0275elementStart(9, "form", 5);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(10, "div", 6)(11, "label", 7);
      \u0275\u0275text(12, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 8);
      \u0275\u0275template(14, LoginComponent_span_14_Template, 2, 0, "span", 9)(15, LoginComponent_span_15_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 6)(17, "label", 10);
      \u0275\u0275text(18, "M\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 11);
      \u0275\u0275template(20, LoginComponent_span_20_Template, 2, 0, "span", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 12);
      \u0275\u0275template(22, LoginComponent_span_22_Template, 2, 0, "span", 13)(23, LoginComponent_span_23_Template, 1, 0, "span", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 15)(25, "p");
      \u0275\u0275text(26, "Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n? ");
      \u0275\u0275elementStart(27, "a", 16);
      \u0275\u0275text(28, "\u0110\u0103ng k\xFD ngay");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "div", 17)(30, "p");
      \u0275\u0275text(31, "T\xE0i kho\u1EA3n demo:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 18);
      \u0275\u0275listener("click", function LoginComponent_Template_div_click_32_listener() {
        return ctx.fillDemo("user1@example.com");
      });
      \u0275\u0275elementStart(33, "strong");
      \u0275\u0275text(34, "Kh\xE1ch h\xE0ng:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(35, " user1@example.com / 123456 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 18);
      \u0275\u0275listener("click", function LoginComponent_Template_div_click_36_listener() {
        return ctx.fillDemo("admin@example.com");
      });
      \u0275\u0275elementStart(37, "strong");
      \u0275\u0275text(38, "Admin:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(39, " admin@example.com / 123456 ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("error", ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["required"]) && ((tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.loginForm.get("email")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["email"]) && ((tmp_4_0 = ctx.loginForm.get("email")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("error", ((tmp_5_0 = ctx.loginForm.get("password")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.loginForm.get("password")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.loginForm.get("password")) == null ? null : tmp_6_0.errors == null ? null : tmp_6_0.errors["required"]) && ((tmp_6_0 = ctx.loginForm.get("password")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgIf], styles: ["\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 80vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #e8f5e9 0%,\n      #c8e6c9 100%);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 40px;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: 420px;\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin-bottom: 8px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.btn-block[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px;\n  font-size: 16px;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid var(--border-color);\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  font-weight: 600;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.demo-accounts[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding: 16px;\n  background: var(--background-color);\n  border-radius: 8px;\n  font-size: 13px;\n}\n.demo-accounts[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 8px;\n  color: var(--text-secondary);\n}\n.demo-accounts[_ngcontent-%COMP%]   .demo-account[_ngcontent-%COMP%] {\n  padding: 8px;\n  margin-bottom: 4px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: var(--transition);\n}\n.demo-accounts[_ngcontent-%COMP%]   .demo-account[_ngcontent-%COMP%]:hover {\n  background: #e0e0e0;\n}\n.demo-accounts[_ngcontent-%COMP%]   .demo-account[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login.component.ts", lineNumber: 152 });
})();

// src/app/features/auth/register.component.ts
function RegisterComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function RegisterComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.successMessage, " ");
  }
}
function RegisterComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " H\u1ECD t\xEAn kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " Email kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " Email kh\xF4ng h\u1EE3p l\u1EC7 ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " M\u1EADt kh\u1EA9u kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " M\u1EADt kh\u1EA9u ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 6 k\xFD t\u1EF1 ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, " M\u1EADt kh\u1EA9u x\xE1c nh\u1EADn kh\xF4ng kh\u1EDBp ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0110\u0103ng k\xFD");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
  }
}
var RegisterComponent = class _RegisterComponent {
  fb;
  authService;
  router;
  registerForm;
  loading = false;
  errorMessage = "";
  successMessage = "";
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.registerForm = this.fb.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  passwordMatchValidator(form) {
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.registerForm.invalid)
      return;
    this.loading = true;
    this.errorMessage = "";
    this.successMessage = "";
    const _a = this.registerForm.value, { confirmPassword } = _a, registerData = __objRest(_a, ["confirmPassword"]);
    this.authService.register(registerData).subscribe({
      next: (res) => {
        if (res.success) {
          this.successMessage = "\u0110\u0103ng k\xFD th\xE0nh c\xF4ng! \u0110ang chuy\u1EC3n h\u01B0\u1EDBng...";
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 1500);
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || "\u0110\u0103ng k\xFD th\u1EA5t b\u1EA1i!";
      }
    });
  }
  static \u0275fac = function RegisterComponent_Factory(t) {
    return new (t || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 53, vars: 20, consts: [[1, "auth-page"], [1, "auth-container"], [1, "auth-card"], [1, "auth-header"], ["class", "alert alert-error", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "fullName"], [1, "required"], ["type", "text", "id", "fullName", "formControlName", "fullName", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", 1, "form-control"], ["for", "phone"], ["type", "tel", "id", "phone", "formControlName", "phone", "placeholder", "09xxxxxxxx", 1, "form-control"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", 1, "form-control"], ["for", "confirmPassword"], ["type", "password", "id", "confirmPassword", "formControlName", "confirmPassword", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], [4, "ngIf"], ["class", "spinner", 4, "ngIf"], [1, "auth-footer"], ["routerLink", "/auth/login"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "error-message"], [1, "spinner"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1");
      \u0275\u0275text(5, "\u0110\u0103ng K\xFD T\xE0i Kho\u1EA3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "T\u1EA1o t\xE0i kho\u1EA3n \u0111\u1EC3 mua s\u1EAFm d\u1EC5 d\xE0ng h\u01A1n");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, RegisterComponent_div_8_Template, 2, 1, "div", 4)(9, RegisterComponent_div_9_Template, 2, 1, "div", 5);
      \u0275\u0275elementStart(10, "form", 6);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_10_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(11, "div", 7)(12, "label", 8);
      \u0275\u0275text(13, "H\u1ECD v\xE0 t\xEAn ");
      \u0275\u0275elementStart(14, "span", 9);
      \u0275\u0275text(15, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(16, "input", 10);
      \u0275\u0275template(17, RegisterComponent_span_17_Template, 2, 0, "span", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 7)(19, "label", 12);
      \u0275\u0275text(20, "Email ");
      \u0275\u0275elementStart(21, "span", 9);
      \u0275\u0275text(22, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "input", 13);
      \u0275\u0275template(24, RegisterComponent_span_24_Template, 2, 0, "span", 11)(25, RegisterComponent_span_25_Template, 2, 0, "span", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 7)(27, "label", 14);
      \u0275\u0275text(28, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 7)(31, "label", 16);
      \u0275\u0275text(32, "M\u1EADt kh\u1EA9u ");
      \u0275\u0275elementStart(33, "span", 9);
      \u0275\u0275text(34, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(35, "input", 17);
      \u0275\u0275template(36, RegisterComponent_span_36_Template, 2, 0, "span", 11)(37, RegisterComponent_span_37_Template, 2, 0, "span", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 7)(39, "label", 18);
      \u0275\u0275text(40, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u ");
      \u0275\u0275elementStart(41, "span", 9);
      \u0275\u0275text(42, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(43, "input", 19);
      \u0275\u0275template(44, RegisterComponent_span_44_Template, 2, 0, "span", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 20);
      \u0275\u0275template(46, RegisterComponent_span_46_Template, 2, 0, "span", 21)(47, RegisterComponent_span_47_Template, 1, 0, "span", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div", 23)(49, "p");
      \u0275\u0275text(50, "\u0110\xE3 c\xF3 t\xE0i kho\u1EA3n? ");
      \u0275\u0275elementStart(51, "a", 24);
      \u0275\u0275text(52, "\u0110\u0103ng nh\u1EADp ngay");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_10_0;
      let tmp_11_0;
      let tmp_12_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.successMessage);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.registerForm);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("error", ((tmp_3_0 = ctx.registerForm.get("fullName")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.registerForm.get("fullName")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.registerForm.get("fullName")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) && ((tmp_4_0 = ctx.registerForm.get("fullName")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275classProp("error", ((tmp_5_0 = ctx.registerForm.get("email")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.registerForm.get("email")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.registerForm.get("email")) == null ? null : tmp_6_0.errors == null ? null : tmp_6_0.errors["required"]) && ((tmp_6_0 = ctx.registerForm.get("email")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.registerForm.get("email")) == null ? null : tmp_7_0.errors == null ? null : tmp_7_0.errors["email"]) && ((tmp_7_0 = ctx.registerForm.get("email")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(10);
      \u0275\u0275classProp("error", ((tmp_8_0 = ctx.registerForm.get("password")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.registerForm.get("password")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.registerForm.get("password")) == null ? null : tmp_9_0.errors == null ? null : tmp_9_0.errors["required"]) && ((tmp_9_0 = ctx.registerForm.get("password")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_10_0 = ctx.registerForm.get("password")) == null ? null : tmp_10_0.errors == null ? null : tmp_10_0.errors["minlength"]) && ((tmp_10_0 = ctx.registerForm.get("password")) == null ? null : tmp_10_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275classProp("error", (ctx.registerForm.errors == null ? null : ctx.registerForm.errors["passwordMismatch"]) && ((tmp_11_0 = ctx.registerForm.get("confirmPassword")) == null ? null : tmp_11_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.registerForm.errors == null ? null : ctx.registerForm.errors["passwordMismatch"]) && ((tmp_12_0 = ctx.registerForm.get("confirmPassword")) == null ? null : tmp_12_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.registerForm.invalid || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
    }
  }, dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NgIf], styles: ["\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 80vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 48px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #e8f5e9 0%,\n      #c8e6c9 100%);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 40px;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: 420px;\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin-bottom: 8px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.required[_ngcontent-%COMP%] {\n  color: var(--error-color);\n}\n.btn-block[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px;\n  font-size: 16px;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid var(--border-color);\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n  font-weight: 600;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=register.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\features\\auth\\register.component.ts", lineNumber: 138 });
})();

// src/app/features/auth/auth.module.ts
var routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];
var AuthModule = class _AuthModule {
  static \u0275fac = function AuthModule_Factory(t) {
    return new (t || _AuthModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), ReactiveFormsModule, SharedModule] });
};
export {
  AuthModule
};
//# sourceMappingURL=chunk-QAWTWH27.js.map
