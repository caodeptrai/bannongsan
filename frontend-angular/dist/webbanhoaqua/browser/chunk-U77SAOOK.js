import {
  AuthService,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  SharedModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-S4GDKINQ.js";
import {
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
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GBTPURO4.js";

// src/app/features/profile/profile.component.ts
var ProfileComponent = class _ProfileComponent {
  fb;
  authService;
  user = null;
  profileForm;
  passwordForm;
  loading = false;
  constructor(fb, authService) {
    this.fb = fb;
    this.authService = authService;
    this.profileForm = this.fb.group({
      fullName: ["", Validators.required],
      phone: [""],
      address: [""]
    });
    this.passwordForm = this.fb.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data;
          this.profileForm.patchValue({
            fullName: res.data.fullName,
            phone: res.data.phone || "",
            address: res.data.address || ""
          });
        }
      }
    });
  }
  updateProfile() {
    if (this.profileForm.invalid)
      return;
    this.loading = true;
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          alert("C\u1EADp nh\u1EADt h\u1ED3 s\u01A1 th\xE0nh c\xF4ng!");
        }
        this.loading = false;
      },
      error: (err) => {
        alert(err.error?.message || "C\u1EADp nh\u1EADt th\u1EA5t b\u1EA1i!");
        this.loading = false;
      }
    });
  }
  changePassword() {
    if (this.passwordForm.invalid)
      return;
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      alert("M\u1EADt kh\u1EA9u x\xE1c nh\u1EADn kh\xF4ng kh\u1EDBp!");
      return;
    }
    alert("Ch\u1EE9c n\u0103ng \u0111\u1ED5i m\u1EADt kh\u1EA9u s\u1EBD \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt sau!");
  }
  static \u0275fac = function ProfileComponent_Factory(t) {
    return new (t || _ProfileComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 64, vars: 8, consts: [[1, "profile-page"], [1, "container"], [1, "page-title"], [1, "profile-grid"], [1, "profile-card"], [1, "profile-avatar"], [1, "avatar-circle"], [1, "material-icons"], [1, "user-email"], [1, "profile-nav"], [1, "nav-btn", "active"], ["routerLink", "/orders", 1, "nav-btn"], [1, "profile-content"], [1, "content-section"], [3, "formGroup"], [1, "form-group"], ["type", "text", "formControlName", "fullName", 1, "form-control"], ["type", "email", "disabled", "", 1, "form-control", 3, "value"], ["type", "tel", "formControlName", "phone", "placeholder", "Nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i", 1, "form-control"], ["formControlName", "address", "rows", "3", "placeholder", "Nh\u1EADp \u0111\u1ECBa ch\u1EC9", 1, "form-control"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "password", "formControlName", "oldPassword", 1, "form-control"], ["type", "password", "formControlName", "newPassword", 1, "form-control"], ["type", "password", "formControlName", "confirmPassword", 1, "form-control"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "H\u1ED3 S\u01A1 C\xE1 Nh\xE2n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "span", 7);
      \u0275\u0275text(9, "person");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "h2");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 8);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "nav", 9)(15, "button", 10)(16, "span", 7);
      \u0275\u0275text(17, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " Th\xF4ng tin c\xE1 nh\xE2n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 11)(20, "span", 7);
      \u0275\u0275text(21, "receipt_long");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " L\u1ECBch s\u1EED \u0111\u01A1n h\xE0ng ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 12)(24, "div", 13)(25, "h3");
      \u0275\u0275text(26, "Th\xF4ng tin c\xE1 nh\xE2n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "form", 14)(28, "div", 15)(29, "label");
      \u0275\u0275text(30, "H\u1ECD v\xE0 t\xEAn");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 15)(33, "label");
      \u0275\u0275text(34, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 15)(37, "label");
      \u0275\u0275text(38, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(39, "input", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 15)(41, "label");
      \u0275\u0275text(42, "\u0110\u1ECBa ch\u1EC9");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "textarea", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 20);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_44_listener() {
        return ctx.updateProfile();
      });
      \u0275\u0275text(45);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(46, "div", 13)(47, "h3");
      \u0275\u0275text(48, "\u0110\u1ED5i m\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "form", 14)(50, "div", 15)(51, "label");
      \u0275\u0275text(52, "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "input", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div", 15)(55, "label");
      \u0275\u0275text(56, "M\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275elementEnd();
      \u0275\u0275element(57, "input", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 15)(59, "label");
      \u0275\u0275text(60, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275elementEnd();
      \u0275\u0275element(61, "input", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "button", 20);
      \u0275\u0275listener("click", function ProfileComponent_Template_button_click_62_listener() {
        return ctx.changePassword();
      });
      \u0275\u0275text(63, " \u0110\u1ED5i m\u1EADt kh\u1EA9u ");
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.user == null ? null : ctx.user.fullName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.user == null ? null : ctx.user.email);
      \u0275\u0275advance(14);
      \u0275\u0275property("formGroup", ctx.profileForm);
      \u0275\u0275advance(8);
      \u0275\u0275property("value", ctx.user == null ? null : ctx.user.email);
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "\u0110ang l\u01B0u..." : "L\u01B0u thay \u0111\u1ED5i", " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("formGroup", ctx.passwordForm);
      \u0275\u0275advance(13);
      \u0275\u0275property("disabled", ctx.passwordForm.invalid || ctx.loading);
    }
  }, dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.profile-page[_ngcontent-%COMP%] {\n  padding: 32px 0;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 32px;\n}\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 300px 1fr;\n  gap: 32px;\n}\n@media (max-width: 768px) {\n  .profile-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  overflow: hidden;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-color),\n      var(--primary-dark));\n  color: white;\n  padding: 32px;\n  text-align: center;\n}\n.profile-avatar[_ngcontent-%COMP%]   .avatar-circle[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n}\n.profile-avatar[_ngcontent-%COMP%]   .avatar-circle[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 48px;\n}\n.profile-avatar[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin-bottom: 4px;\n}\n.profile-avatar[_ngcontent-%COMP%]   .user-email[_ngcontent-%COMP%] {\n  opacity: 0.8;\n  font-size: 14px;\n}\n.profile-nav[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.profile-nav[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  padding: 12px 16px;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: var(--transition);\n  color: var(--text-color);\n  font-size: 14px;\n}\n.profile-nav[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--text-secondary);\n}\n.profile-nav[_ngcontent-%COMP%]   .nav-btn[_ngcontent-%COMP%]:hover {\n  background: var(--background-color);\n}\n.profile-nav[_ngcontent-%COMP%]   .nav-btn.active[_ngcontent-%COMP%] {\n  background: rgba(46, 125, 50, 0.1);\n  color: var(--primary-color);\n}\n.profile-nav[_ngcontent-%COMP%]   .nav-btn.active[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  color: var(--primary-color);\n}\n.profile-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.content-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow);\n  padding: 24px;\n}\n.content-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--border-color);\n}\n.content-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.content-section[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=profile.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src\\app\\features\\profile\\profile.component.ts", lineNumber: 183 });
})();

// src/app/features/profile/profile.module.ts
var routes = [
  { path: "", component: ProfileComponent }
];
var ProfileModule = class _ProfileModule {
  static \u0275fac = function ProfileModule_Factory(t) {
    return new (t || _ProfileModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ProfileModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), SharedModule] });
};
export {
  ProfileModule
};
//# sourceMappingURL=chunk-U77SAOOK.js.map
