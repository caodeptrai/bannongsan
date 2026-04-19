import {
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-GBTPURO4.js";

// src/app/features/home/contact/contact.component.ts
var ContactComponent = class _ContactComponent {
  static \u0275fac = function ContactComponent_Factory(t) {
    return new (t || _ContactComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContactComponent, selectors: [["app-contact"]], decls: 66, vars: 0, consts: [[1, "contact-page"], [1, "page-header"], [1, "container"], [1, "contact-grid"], [1, "contact-info"], [1, "info-item"], [1, "material-icons"], [1, "contact-form-wrapper"], [1, "contact-form"], [1, "form-group"], ["type", "text", "placeholder", "Nh\u1EADp h\u1ECD t\xEAn c\u1EE7a b\u1EA1n", 1, "form-control"], ["type", "email", "placeholder", "Nh\u1EADp email c\u1EE7a b\u1EA1n", 1, "form-control"], ["type", "tel", "placeholder", "Nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i", 1, "form-control"], ["rows", "5", "placeholder", "Nh\u1EADp n\u1ED9i dung tin nh\u1EAFn", 1, "form-control"], ["type", "button", 1, "btn", "btn-primary", "btn-block"]], template: function ContactComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4, "Li\xEAn H\u1EC7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "H\xE3y li\xEAn h\u1EC7 v\u1EDBi ch\xFAng t\xF4i n\u1EBFu b\u1EA1n c\u1EA7n h\u1ED7 tr\u1EE3");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 2)(8, "div", 3)(9, "div", 4)(10, "h2");
      \u0275\u0275text(11, "Th\xF4ng Tin Li\xEAn H\u1EC7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 5)(13, "span", 6);
      \u0275\u0275text(14, "location_on");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div")(16, "strong");
      \u0275\u0275text(17, "\u0110\u1ECBa ch\u1EC9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "p");
      \u0275\u0275text(19, "123 \u0110\u01B0\u1EDDng N\xF4ng S\u1EA3n, Qu\u1EADn 1, TP.HCM");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 5)(21, "span", 6);
      \u0275\u0275text(22, "phone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div")(24, "strong");
      \u0275\u0275text(25, "\u0110i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p");
      \u0275\u0275text(27, "0909.123.456");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 5)(29, "span", 6);
      \u0275\u0275text(30, "email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "strong");
      \u0275\u0275text(33, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "p");
      \u0275\u0275text(35, "contact@webbanhoaqua.com");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 5)(37, "span", 6);
      \u0275\u0275text(38, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div")(40, "strong");
      \u0275\u0275text(41, "Gi\u1EDD l\xE0m vi\u1EC7c");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p");
      \u0275\u0275text(43, "7:00 - 21:00 (Th\u1EE9 2 - CN)");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "div", 7)(45, "h2");
      \u0275\u0275text(46, "G\u1EEDi Tin Nh\u1EAFn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "form", 8)(48, "div", 9)(49, "label");
      \u0275\u0275text(50, "H\u1ECD v\xE0 t\xEAn");
      \u0275\u0275elementEnd();
      \u0275\u0275element(51, "input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 9)(53, "label");
      \u0275\u0275text(54, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "input", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 9)(57, "label");
      \u0275\u0275text(58, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(59, "input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 9)(61, "label");
      \u0275\u0275text(62, "N\u1ED9i dung");
      \u0275\u0275elementEnd();
      \u0275\u0275element(63, "textarea", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "button", 14);
      \u0275\u0275text(65, "G\u1EEDi tin nh\u1EAFn");
      \u0275\u0275elementEnd()()()()()();
    }
  }, styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary-color),\n      var(--primary-dark));\n  color: white;\n  padding: 64px 0;\n  text-align: center;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: 12px;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  opacity: 0.9;\n  font-size: 18px;\n}\n.contact-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  padding: 64px 0;\n}\n@media (max-width: 768px) {\n  .contact-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.contact-info[_ngcontent-%COMP%], .contact-form-wrapper[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 32px;\n  box-shadow: var(--shadow);\n}\n.contact-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contact-form-wrapper[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 24px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid var(--primary-color);\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.info-item[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--primary-color);\n  flex-shrink: 0;\n}\n.info-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n}\n.info-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=contact.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContactComponent, { className: "ContactComponent", filePath: "src\\app\\features\\home\\contact\\contact.component.ts", lineNumber: 80 });
})();

// src/app/features/home/contact/contact.module.ts
var routes = [
  { path: "", component: ContactComponent }
];
var ContactModule = class _ContactModule {
  static \u0275fac = function ContactModule_Factory(t) {
    return new (t || _ContactModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ContactModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes)] });
};
export {
  ContactModule
};
//# sourceMappingURL=chunk-6AI3PSGD.js.map
