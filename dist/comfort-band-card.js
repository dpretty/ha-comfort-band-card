const No = globalThis, ar = No.ShadowRoot && (No.ShadyCSS === void 0 || No.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lr = Symbol(), ca = /* @__PURE__ */ new WeakMap();
let $l = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== lr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (ar && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = ca.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ca.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Io = (e) => new $l(typeof e == "string" ? e : e + "", void 0, lr), De = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new $l(n, e, lr);
}, au = (e, t) => {
  if (ar) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = No.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, ua = ar ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Io(n);
})(e) : e;
const { is: lu, defineProperty: cu, getOwnPropertyDescriptor: uu, getOwnPropertyNames: hu, getOwnPropertySymbols: du, getPrototypeOf: fu } = Object, Uo = globalThis, ha = Uo.trustedTypes, pu = ha ? ha.emptyScript : "", mu = Uo.reactiveElementPolyfillSupport, to = (e, t) => e, Oo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? pu : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, cr = (e, t) => !lu(e, t), da = { attribute: !0, type: String, converter: Oo, reflect: !1, useDefault: !1, hasChanged: cr };
Symbol.metadata ??= Symbol("metadata"), Uo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let vi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = da) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && cu(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = uu(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const u = o?.call(this);
      s?.call(this, a), this.requestUpdate(t, u, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? da;
  }
  static _$Ei() {
    if (this.hasOwnProperty(to("elementProperties"))) return;
    const t = fu(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(to("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(to("properties"))) {
      const n = this.properties, i = [...hu(n), ...du(n)];
      for (const o of i) this.createProperty(o, n[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, o] of n) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const o = this._$Eu(n, i);
      o !== void 0 && this._$Eh.set(o, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) n.unshift(ua(o));
    } else t !== void 0 && n.push(ua(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return au(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Oo).toAttribute(n, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Oo;
      this._$Em = o;
      const u = a.fromAttribute(n, s.type);
      this[o] = u ?? this._$Ej?.get(o) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? cr)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: s }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? n ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: a } = s, u = this[o];
        a !== !0 || this._$AL.has(o) || u === void 0 || this.C(o, void 0, s, u);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
vi.elementStyles = [], vi.shadowRootOptions = { mode: "open" }, vi[to("elementProperties")] = /* @__PURE__ */ new Map(), vi[to("finalized")] = /* @__PURE__ */ new Map(), mu?.({ ReactiveElement: vi }), (Uo.reactiveElementVersions ??= []).push("2.1.2");
const ur = globalThis, fa = (e) => e, Lo = ur.trustedTypes, pa = Lo ? Lo.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, kl = "$lit$", gn = `lit$${Math.random().toFixed(9).slice(2)}$`, Sl = "?" + gn, gu = `<${Sl}>`, Vn = document, so = () => Vn.createComment(""), ro = (e) => e === null || typeof e != "object" && typeof e != "function", hr = Array.isArray, bu = (e) => hr(e) || typeof e?.[Symbol.iterator] == "function", Ts = `[ 	
\f\r]`, Gi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ma = /-->/g, ga = />/g, Fn = RegExp(`>|${Ts}(?:([^\\s"'>=/]+)(${Ts}*=${Ts}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ba = /'/g, _a = /"/g, Al = /^(?:script|style|textarea|title)$/i, Tl = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), v = Tl(1), Jt = Tl(2), $i = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), va = /* @__PURE__ */ new WeakMap(), Un = Vn.createTreeWalker(Vn, 129);
function Cl(e, t) {
  if (!hr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pa !== void 0 ? pa.createHTML(t) : t;
}
const _u = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Gi;
  for (let u = 0; u < n; u++) {
    const h = e[u];
    let f, g, m = -1, _ = 0;
    for (; _ < h.length && (a.lastIndex = _, g = a.exec(h), g !== null); ) _ = a.lastIndex, a === Gi ? g[1] === "!--" ? a = ma : g[1] !== void 0 ? a = ga : g[2] !== void 0 ? (Al.test(g[2]) && (o = RegExp("</" + g[2], "g")), a = Fn) : g[3] !== void 0 && (a = Fn) : a === Fn ? g[0] === ">" ? (a = o ?? Gi, m = -1) : g[1] === void 0 ? m = -2 : (m = a.lastIndex - g[2].length, f = g[1], a = g[3] === void 0 ? Fn : g[3] === '"' ? _a : ba) : a === _a || a === ba ? a = Fn : a === ma || a === ga ? a = Gi : (a = Fn, o = void 0);
    const $ = a === Fn && e[u + 1].startsWith("/>") ? " " : "";
    s += a === Gi ? h + gu : m >= 0 ? (i.push(f), h.slice(0, m) + kl + h.slice(m) + gn + $) : h + gn + (m === -2 ? u : $);
  }
  return [Cl(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ao {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const u = t.length - 1, h = this.parts, [f, g] = _u(t, n);
    if (this.el = ao.createElement(f, i), Un.currentNode = this.el.content, n === 2 || n === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = Un.nextNode()) !== null && h.length < u; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(kl)) {
          const _ = g[a++], $ = o.getAttribute(m).split(gn), C = /([.?@])?(.*)/.exec(_);
          h.push({ type: 1, index: s, name: C[2], strings: $, ctor: C[1] === "." ? yu : C[1] === "?" ? wu : C[1] === "@" ? xu : Wo }), o.removeAttribute(m);
        } else m.startsWith(gn) && (h.push({ type: 6, index: s }), o.removeAttribute(m));
        if (Al.test(o.tagName)) {
          const m = o.textContent.split(gn), _ = m.length - 1;
          if (_ > 0) {
            o.textContent = Lo ? Lo.emptyScript : "";
            for (let $ = 0; $ < _; $++) o.append(m[$], so()), Un.nextNode(), h.push({ type: 2, index: ++s });
            o.append(m[_], so());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Sl) h.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(gn, m + 1)) !== -1; ) h.push({ type: 7, index: s }), m += gn.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = Vn.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ki(e, t, n = e, i) {
  if (t === $i) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = ro(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = ki(e, o._$AS(e, t.values), o, i)), t;
}
class vu {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? Vn).importNode(n, !0);
    Un.currentNode = o;
    let s = Un.nextNode(), a = 0, u = 0, h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let f;
        h.type === 2 ? f = new po(s, s.nextSibling, this, t) : h.type === 1 ? f = new h.ctor(s, h.name, h.strings, this, t) : h.type === 6 && (f = new $u(s, this, t)), this._$AV.push(f), h = i[++u];
      }
      a !== h?.index && (s = Un.nextNode(), a++);
    }
    return Un.currentNode = Vn, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class po {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = ki(this, t, n), ro(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== $i && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bu(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && ro(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Vn.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ao.createElement(Cl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new vu(o, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = va.get(t.strings);
    return n === void 0 && va.set(t.strings, n = new ao(t)), n;
  }
  k(t) {
    hr(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new po(this.O(so()), this.O(so()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = fa(t).nextSibling;
      fa(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Wo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = T;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = ki(this, t, n, 0), a = !ro(t) || t !== this._$AH && t !== $i, a && (this._$AH = t);
    else {
      const u = t;
      let h, f;
      for (t = s[0], h = 0; h < s.length - 1; h++) f = ki(this, u[i + h], n, h), f === $i && (f = this._$AH[h]), a ||= !ro(f) || f !== this._$AH[h], f === T ? t = T : t !== T && (t += (f ?? "") + s[h + 1]), this._$AH[h] = f;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class yu extends Wo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class wu extends Wo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class xu extends Wo {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = ki(this, t, n, 0) ?? T) === $i) return;
    const i = this._$AH, o = t === T && i !== T || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== T && (i === T || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class $u {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ki(this, t);
  }
}
const ku = ur.litHtmlPolyfillSupport;
ku?.(ao, po), (ur.litHtmlVersions ??= []).push("3.3.2");
const Su = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new po(t.insertBefore(so(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const dr = globalThis;
class Te extends vi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Su(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return $i;
  }
}
Te._$litElement$ = !0, Te.finalized = !0, dr.litElementHydrateSupport?.({ LitElement: Te });
const Au = dr.litElementPolyfillSupport;
Au?.({ LitElement: Te });
(dr.litElementVersions ??= []).push("4.2.2");
const Ie = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Tu = { attribute: !0, type: String, converter: Oo, reflect: !1, hasChanged: cr }, Cu = (e = Tu, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(u) {
      const h = t.get.call(this);
      t.set.call(this, u), this.requestUpdate(a, h, e, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(a, void 0, e, u), u;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(u) {
      const h = this[a];
      t.call(this, u), this.requestUpdate(a, h, e, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function P(e) {
  return (t, n) => typeof n == "object" ? Cu(e, t, n) : ((i, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function q(e) {
  return P({ ...e, state: !0, attribute: !1 });
}
const Eu = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function Di(e, t) {
  return (n, i, o) => {
    const s = (a) => a.renderRoot?.querySelector(e) ?? null;
    return Eu(n, i, { get() {
      return s(this);
    } });
  };
}
const Ue = De`
  :host {
    color-scheme: light dark;

    --cb-action-heating: var(--cb-color-heat, var(--state-climate-heat-color, #d9603f));
    --cb-action-cooling: var(--cb-color-cool, var(--state-climate-cool-color, #2f7fcc));
    --cb-action-idle: var(--cb-color-idle, var(--state-inactive-color, #888888));
    --cb-action-unknown: var(--cb-color-unknown, var(--disabled-color, #bdbdbd));

    --cb-track-bg: var(--divider-color, light-dark(#e0e0e0, #3a3a3a));
    --cb-text-primary: var(--primary-text-color, light-dark(#212121, #ffffff));
    --cb-text-secondary: var(--secondary-text-color, light-dark(#727272, #b3b3b3));

    --cb-radius-card: 12px;
    --cb-radius-pill: 999px;
    --cb-gap-xs: 4px;
    --cb-gap-sm: 8px;
    --cb-gap-md: 12px;
    --cb-gap-lg: 16px;
  }
`;
function El(e) {
  switch (e) {
    case "heating":
      return "var(--cb-action-heating)";
    case "cooling":
      return "var(--cb-action-cooling)";
    case "idle":
      return "var(--cb-action-idle)";
    default:
      return "var(--cb-action-unknown)";
  }
}
function Du(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
var Mu = Object.defineProperty, Pu = Object.getOwnPropertyDescriptor, Yn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Pu(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Mu(t, n, o), o;
};
const Vs = 15, Dl = 28, Nu = Dl - Vs;
function Cs(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(Vs, Math.min(Dl, e)) - Vs) / Nu * 100;
}
let tn = class extends Te {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = Du(this.action), t = El(e), n = Number.isFinite(this.low), i = Number.isFinite(this.high), o = Number.isFinite(this.room), s = n ? Cs(this.low) : 0, a = i ? Cs(this.high) : 100, u = Math.min(s, a), h = Math.max(0, Math.abs(a - s)), f = o ? Cs(this.room) : 50, g = ($) => Number.isFinite($) ? `${$.toFixed(1)}°` : "—", m = e === "heating" || e === "cooling" ? `, ${e}` : "", _ = `Comfortable range ${g(this.low)} to ${g(this.high)}, ${this.roomLabel} ${g(this.room)}${m}`;
    return v`
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        role=${this.decorative ? T : "img"}
        aria-label=${this.decorative ? T : _}
        aria-hidden=${this.decorative ? "true" : T}
      >
        ${Jt`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${n && i ? Jt`<rect class="band" x=${u} y="9" width=${h} height="6" rx="3" fill=${t}></rect>` : null}
        ${o ? Jt`<circle cx=${f} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${o ? Jt`<circle class="marker-ring" cx=${f} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
tn.styles = [
  Ue,
  De`
      :host {
        display: block;
        width: 100%;
      }
      svg {
        display: block;
        width: 100%;
        height: 24px;
        overflow: visible;
      }
      .track {
        fill: var(--cb-track-bg);
      }
      .band {
        opacity: 0.85;
      }
      .marker-ring {
        fill: var(--ha-card-background, var(--card-background-color, #ffffff));
        stroke-width: 2;
      }
      .label {
        font-size: 11px;
        fill: var(--cb-text-secondary);
        font-family: var(--paper-font-body1_-_font-family, sans-serif);
      }
    `
];
Yn([
  P({ type: Number })
], tn.prototype, "low", 2);
Yn([
  P({ type: Number })
], tn.prototype, "high", 2);
Yn([
  P({ type: Number })
], tn.prototype, "room", 2);
Yn([
  P({ type: String })
], tn.prototype, "roomLabel", 2);
Yn([
  P({ type: Boolean })
], tn.prototype, "decorative", 2);
Yn([
  P({ type: String })
], tn.prototype, "action", 2);
tn = Yn([
  Ie("band-gauge")
], tn);
const zu = 0.5, Ou = 10, Lu = 35;
function _n(e) {
  return `${vn(e.low)}–${vn(e.high)}°`;
}
function vn(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function Ao(e, t) {
  let n = t * zu;
  return n > 0 && (n = Math.max(0, Math.min(n, Lu - e.high))), n < 0 && (n = Math.min(0, Math.max(n, Ou - e.low))), { low: ya(e.low + n), high: ya(e.high + n) };
}
function ya(e) {
  return Math.round(e * 10) / 10;
}
function Ml(e) {
  const { room: t, apparent: n, useApparent: i } = e, o = Number.isFinite(t) && Number.isFinite(n) && Gs(n) !== Gs(t);
  return i && Number.isFinite(n) ? {
    value: n,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${n.toFixed(1)}°` : "" };
}
function Gs(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function Pl(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const n = Gs(e);
  return n < Math.round(t.low * 10) ? "below" : n > Math.round(t.high * 10) ? "above" : "in";
}
const Fu = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function Nl(e) {
  if (e.doing) return { kind: "adjusting", text: e.doing };
  if (!e.enabled) return { kind: "paused", text: "Paused: not controlling this room" };
  if (e.sensor === "offline")
    return { kind: "sensor", text: "On hold: the room sensor is offline" };
  if (e.sensor === "no-reading")
    return { kind: "sensor", text: "On hold: no room temperature reading" };
  const t = Hu(e);
  return e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${t.text}` } : t;
}
function Hu(e) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const t = Pl(e.temperature, e.band), n = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? t === "in" ? "comfortable" : t ?? "idle" : "none", i = Fu[n];
  let o;
  if (e.overrideActive) {
    const a = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    o = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${_n(e.band)}${a}`;
  } else {
    const a = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    o = `${_n(e.band)}${a}`;
  }
  const s = i ? `${i} · ${o}` : o.charAt(0).toUpperCase() + o.slice(1);
  return { kind: n, text: s };
}
function Vo(e, t) {
  const n = new Date(e), i = t?.locale?.time_format, o = t?.locale?.language;
  let s;
  if (i === "12") s = !0;
  else if (i === "24") s = !1;
  else {
    const u = new Intl.DateTimeFormat(i === "system" ? void 0 : o, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    s = u === "h11" || u === "h12";
  }
  const a = {
    hourCycle: s ? "h12" : "h23",
    hour: s ? "numeric" : "2-digit"
  };
  return (!s || n.getMinutes() !== 0) && (a.minute = "2-digit"), new Intl.DateTimeFormat(o, a).format(n);
}
function Es(e, t) {
  const n = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!n) return e;
  const i = Number(n[1]), o = Number(n[2]);
  return i > 23 || o > 59 ? e : Vo(new Date(2e3, 0, 1, i, o).getTime(), t);
}
function Zt(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function To(e, t) {
  const n = Zt(e, t);
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function zl(e, t) {
  const n = Zt(e, t.nextBandChange);
  if (!n) return { scheduled: null, nextChange: null };
  const i = n.attributes.scheduled, o = Date.parse(n.state);
  return {
    scheduled: typeof i == "boolean" ? i : null,
    nextChange: Number.isNaN(o) ? null : o
  };
}
function Go(e, t) {
  const n = To(e, t.roomTemperature), i = To(e, t.apparentTemperature), o = Zt(e, t.useApparentTemperature)?.state === "on", s = Date.parse(Zt(e, t.overrideEnds)?.state ?? ""), a = Zt(e, t.roomTemperature)?.attributes.source, u = a === "climate" || a === "fallback_sensor" ? a : null, h = Zt(e, t.roomSensorUnavailable)?.state === "on" || u !== null, f = Number.isFinite(n) || Number.isFinite(i);
  return {
    enabled: Zt(e, t.enabled)?.state !== "off",
    action: Zt(e, t.currentAction)?.state ?? "unknown",
    room: n,
    apparent: i,
    useApparent: o,
    temperature: Ml({ room: n, apparent: i, useApparent: o }).value,
    feelsLike: o && Number.isFinite(i),
    band: {
      low: To(e, t.effectiveLow),
      high: To(e, t.effectiveHigh)
    },
    overrideActive: Zt(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...zl(e, t),
    sensor: h ? f ? "stand-in" : "offline" : f ? "ok" : "no-reading",
    standIn: u
  };
}
function fr(e) {
  return e.enabled && (e.sensor === "ok" || e.sensor === "stand-in");
}
const pn = {
  adjusting: "mdi:timer-sand",
  paused: "mdi:pause-circle-outline",
  sensor: "mdi:alert-circle-outline",
  heating: "mdi:fire",
  cooling: "mdi:snowflake",
  comfortable: "mdi:check-circle-outline",
  below: "mdi:thermometer-low",
  above: "mdi:thermometer-high",
  idle: "mdi:minus-circle-outline",
  none: "mdi:thermometer"
}, Ru = {
  paused: pn.paused,
  sensor: pn.sensor,
  heating: pn.heating,
  cooling: pn.cooling,
  below: pn.below,
  above: pn.above,
  adjusted: "mdi:timer-outline"
};
function Bu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !fr(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const n = Pl(e.temperature, e.band);
    (n === "below" || n === "above") && t.push(n);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function ju(e) {
  const t = "Check its battery or connection.";
  if (!e.enabled)
    return e.sensor === "stand-in" || e.sensor === "offline" ? `The room sensor is offline. ${t}` : null;
  switch (e.sensor) {
    case "stand-in":
      return `Using ${e.standIn === "climate" ? "the air conditioner's own sensor" : e.standIn === "fallback_sensor" ? "the backup sensor" : "a stand-in reading"} until the room sensor reports again. ${t}`;
    case "offline":
      return "Heating and cooling here won't be adjusted while there's no room temperature reading. Check the room sensor's battery or connection.";
    case "no-reading":
      return "Heating and cooling here won't be adjusted while there's no room temperature reading.";
    default:
      return null;
  }
}
var Iu = Object.defineProperty, Uu = Object.getOwnPropertyDescriptor, kt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Uu(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Iu(t, n, o), o;
};
let rt = class extends Te {
  constructor() {
    super(...arguments), this.zoneName = "", this.temperature = NaN, this.feelsLike = !1, this.low = NaN, this.high = NaN, this.action = "unknown", this.statusKind = "none", this.statusText = "", this.badges = [], this.noExpand = !1, this.variant = "tile";
  }
  _onTap(e) {
    this.noExpand || e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.dispatchEvent(new CustomEvent("comfort-band-tile-tap", { bubbles: !0, composed: !0 })));
  }
  _renderTemperature() {
    return Number.isFinite(this.temperature) ? `${this.temperature.toFixed(1)}°` : "—";
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : v`
      <div
        class="tile ${this.noExpand ? "no-expand" : ""}"
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        <div class="header">
          <div class="zone-name">${this.zoneName || "—"}</div>
        </div>
        <div class="body">
          <!-- The tile is named from what it shows, in order: "Bedroom feels
               like 18.6°. Heating · …". "feels like" and the full stop are for
               screen readers only. The gauge is decorative here: the status
               sentence gives the range, except for a paused room or one on
               hold, where it isn't being kept to. -->
          <div class="room-temp">
            ${this.feelsLike ? v`<span class="sr-only"> feels like </span>` : T}${this._renderTemperature()}<span class="sr-only">. </span>
          </div>
          <div class="gauge-wrap" aria-hidden="true">
            <band-gauge
              decorative
              .low=${this.low}
              .high=${this.high}
              .room=${this.temperature}
              .action=${this.action}
            ></band-gauge>
          </div>
        </div>
        ${this.statusText ? v`<div class="status ${this.statusKind}">
              <ha-icon icon=${pn[this.statusKind]} aria-hidden="true"></ha-icon>
              <span>${this.statusText}</span>
            </div>` : null}
      </div>
    `;
  }
  /** The chip's name for screen readers, and its tooltip: the zone, the
   *  temperature and the status sentence. The chip shows only the number. */
  _label() {
    const e = `${this.zoneName || "Zone"}${this.feelsLike ? ", feels like" : ""} ${this._renderTemperature()}`;
    return this.statusText ? `${e}. ${this.statusText}` : e;
  }
  _renderMini() {
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${El(e)}` : "", n = this._label();
    return v`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${e ? "tinted" : ""}"
        style=${t}
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        aria-label=${n}
        title=${n}
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        ${this.badges.map(
      (i) => v`<ha-icon
              icon=${Ru[i]}
              data-badge=${i}
              aria-hidden="true"
            ></ha-icon>`
    )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
};
rt.styles = [
  Ue,
  De`
      :host {
        display: block;
      }
      :host([variant='mini']) {
        display: inline-block;
      }
      .tile {
        display: flex;
        flex-direction: column;
        gap: var(--cb-gap-sm);
        padding: var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
        box-shadow: var(--ha-card-box-shadow, none);
        cursor: pointer;
        transition: transform 0.12s ease;
      }
      .tile.no-expand {
        cursor: default;
      }
      .tile:not(.no-expand):hover {
        transform: translateY(-1px);
      }
      .tile:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .mini {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: 4px 10px;
        border-radius: var(--cb-radius-pill);
        background: var(
          --cb-mini-bg,
          var(--ha-card-background, var(--card-background-color, #ffffff))
        );
        color: var(--cb-mini-fg, var(--cb-text-primary));
        box-shadow: var(--ha-card-box-shadow, none);
        font-size: 18px;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.12s ease;
      }
      .mini.no-expand {
        cursor: default;
      }
      /* WCAG 2.5.5: a touch target at least 44px each way, without making
         the chip any bigger on the floorplan. Only for a chip that opens:
         a compact one would just take taps from what's around it. */
      .mini:not(.no-expand)::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: max(100%, 44px);
        height: max(100%, 44px);
        transform: translate(-50%, -50%);
      }
      /* HA's icon fills with --icon-primary-color when a theme sets it; keep
         these the chip's own colour. */
      .mini ha-icon {
        --mdc-icon-size: 16px;
        --icon-primary-color: currentColor;
      }
      .mini.tinted {
        --cb-mini-fg: var(--cb-text-on-action, #ffffff);
      }
      .mini:not(.no-expand):hover {
        transform: translateY(-1px);
      }
      .mini:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--cb-gap-sm);
      }
      .zone-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
        font-family: var(--paper-font-body1_-_font-family, sans-serif);
      }
      .body {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-md);
      }
      .room-temp {
        font-size: 32px;
        font-weight: 300;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1;
        min-width: 70px;
      }
      /* Read by screen readers, not shown. */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .gauge-wrap {
        flex: 1;
        min-width: 0;
      }
      .status {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-xs);
        font-size: 13px;
        color: var(--cb-text-primary);
      }
      .status ha-icon {
        --mdc-icon-size: 18px;
        --icon-primary-color: currentColor;
        flex: none;
        color: var(--cb-text-secondary);
      }
      .status.heating ha-icon {
        color: var(--cb-action-heating);
      }
      .status.cooling ha-icon {
        color: var(--cb-action-cooling);
      }
      .status.sensor ha-icon {
        color: var(--warning-color, #ffa600);
      }
    `
];
kt([
  P({ type: String })
], rt.prototype, "zoneName", 2);
kt([
  P({ type: Number })
], rt.prototype, "temperature", 2);
kt([
  P({ type: Boolean })
], rt.prototype, "feelsLike", 2);
kt([
  P({ type: Number })
], rt.prototype, "low", 2);
kt([
  P({ type: Number })
], rt.prototype, "high", 2);
kt([
  P({ type: String })
], rt.prototype, "action", 2);
kt([
  P({ type: String })
], rt.prototype, "statusKind", 2);
kt([
  P({ type: String })
], rt.prototype, "statusText", 2);
kt([
  P({ attribute: !1 })
], rt.prototype, "badges", 2);
kt([
  P({ type: Boolean })
], rt.prototype, "noExpand", 2);
kt([
  P({ type: String, reflect: !0 })
], rt.prototype, "variant", 2);
rt = kt([
  Ie("comfort-band-tile")
], rt);
const on = "comfort_band";
function Wu(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Vu(e, t) {
  return e.callService(on, "set_schedule", { ...t });
}
function Ol(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), e.callService(on, "start_override", n);
}
function Gu(e, t) {
  return e.callService(on, "cancel_override", { ...t });
}
function Ku(e, t) {
  return e.callService(on, "set_profile", { ...t });
}
function Yu(e, t) {
  const n = { name: t.name };
  return t.description !== void 0 && (n.description = t.description), e.callService(on, "create_profile", n);
}
function qu(e, t) {
  const n = { source: t.source, target: t.target };
  return t.description !== void 0 && (n.description = t.description), e.callService(on, "clone_profile", n);
}
function Zu(e, t) {
  return e.callService(on, "rename_profile", { old: t.old, new: t.new });
}
function Ju(e, t) {
  return e.callService(on, "delete_profile", { name: t.name });
}
function Qu(e, t) {
  return e.callService(on, "record_feedback", { zone: t.zone, label: t.label });
}
var Xu = Object.defineProperty, eh = Object.getOwnPropertyDescriptor, kn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? eh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Xu(t, n, o), o;
};
const th = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], nh = 1500, ih = 1500, oh = 3;
let Wt = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._feedbackConfirmed = null, this._feedbackTimer = null, this._feedbackSeq = 0, this._length = null, this._burst = null, this._burstTimer = null, this._busy = null, this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const o = this._bandInForce();
        if (!o) return;
        t = { base: o, steps: 0, picked: !1 };
      }
      const n = Ao(t.base, t.steps), i = Ao(t.base, t.steps + e);
      i.low === n.low && i.high === n.high || (this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), ih));
    }, this._onPickLength = (e) => {
      if (!this._busy) {
        if (this._length = e, this._burst) {
          this._burst = { ...this._burst, picked: !0 };
          return;
        }
        this._retime(e);
      }
    }, this._onBackToSchedule = () => {
      if (this._busy || !this.hass || !this.zone) return;
      const e = this.hass, t = this.zone;
      this._dropBurst();
      const n = this._schedule().scheduled === !0 ? "Going back to the schedule" : "Ending the adjustment";
      this._run(n, () => Gu(e, { zone: t }));
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await Qu(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, nh));
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._feedbackTimer !== null && (clearTimeout(this._feedbackTimer), this._feedbackTimer = null), this._feedbackConfirmed = null, this._commitBurst();
  }
  get _stateOf() {
    const e = this.hass?.states ?? {};
    return (t) => t !== null ? e[t] : void 0;
  }
  _numericState(e) {
    const t = this._stateOf(e);
    if (!t) return NaN;
    const n = parseFloat(t.state);
    return Number.isFinite(n) ? n : NaN;
  }
  /** The band in force, to the 0.1° shown, or null when it can't be read. */
  _bandInForce() {
    const e = this._numericState(this.entities?.effectiveLow ?? null), t = this._numericState(this.entities?.effectiveHigh ?? null);
    return !Number.isFinite(e) || !Number.isFinite(t) ? null : { low: Math.round(e * 10) / 10, high: Math.round(t * 10) / 10 };
  }
  _schedule() {
    return !this.hass || !this.entities ? { scheduled: null, nextChange: null } : zl(this.hass, this.entities);
  }
  /** The length in force: the one picked here, else three hours. */
  _hours() {
    return this._length ?? oh;
  }
  /** Runs a call, saying what it's doing meanwhile. A failed call is
   *  reported by HA's own toast. */
  async _run(e, t) {
    this._busy = e;
    try {
      await t();
    } catch {
    } finally {
      this._busy = null;
    }
  }
  _sendBand(e, t) {
    if (!this.hass || !this.zone) return;
    const n = this.hass, i = this.zone;
    this._run(
      `Adjusting to ${_n(e)}`,
      () => Ol(n, { zone: i, low: e.low, high: e.high, hours: t })
    );
  }
  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    this._burst = null, e && (e.steps !== 0 ? this._sendBand(Ao(e.base, e.steps), this._hours()) : e.picked && this._retime(this._hours()));
  }
  _dropBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null, this._burst = null;
  }
  /** Gives a running adjustment a new length, keeping its band: the
   *  integration keeps an adjustment's band in the manual values. */
  _retime(e) {
    if (this._stateOf(this.entities?.overrideActive ?? null)?.state !== "on") return;
    const t = this._numericState(this.entities?.manualLow ?? null), n = this._numericState(this.entities?.manualHigh ?? null);
    !Number.isFinite(t) || !Number.isFinite(n) || this._sendBand({ low: t, high: n }, e);
  }
  render() {
    if (!this.hass || !this.entities) return T;
    const e = Date.now(), t = Go(this.hass, this.entities), { room: n, apparent: i, useApparent: o, feelsLike: s, overrideActive: a, scheduled: u } = t, { low: h, high: f } = t.band, g = Ml({ room: n, apparent: i, useApparent: o }), m = ju(t), _ = this._burst, $ = _ && _.steps !== 0 ? `Adjusting to ${_n(Ao(_.base, _.steps))}` : this._busy, C = Nl({
      ...t,
      doing: $,
      now: e,
      formatTime: (O) => Vo(O, this.hass)
    });
    return v`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(g.value) ? `${g.value.toFixed(1)}°` : "—"}</span
        >
        ${g.note ? v`<span class="note">${g.note}</span>` : T}
      </div>
      ${o && !Number.isFinite(i) && Number.isFinite(n) ? v`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : T}
      <div class="gauge-row">
        <band-gauge
          .low=${h}
          .high=${f}
          .room=${g.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${fr(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${C.kind}" role="status" aria-live="polite">
        <ha-icon icon=${pn[C.kind]} aria-hidden="true"></ha-icon>
        <span>${C.text}</span>
      </div>
      ${m ? v`<div class="notice">${m}</div>` : T}
      ${this._renderAdjust(a, u)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const n = this._busy !== null ? "true" : "false", i = this._hours();
    return v`
      <section class="adjust">
        ${t === !1 ? T : v`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${[1, 3].map(
      (s) => v`<button
                      aria-pressed=${i === s ? "true" : "false"}
                      aria-disabled=${n}
                      data-length=${s}
                      @click=${() => this._onPickLength(s)}
                    >
                      ${s} h
                    </button>`
    )}
              </div>`}
        ${this._bandInForce() !== null ? v`<div class="steps">
              <button class="cooler" aria-disabled=${n} @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" aria-disabled=${n} @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>` : T}
        ${e && t !== !1 ? v`<button class="back" aria-disabled=${n} @click=${this._onBackToSchedule}>
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>` : T}
      </section>
    `;
  }
  _renderFeedbackSection() {
    return v`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${th.map(
      (e) => v`
              <button
                class="feedback-pill ${this._feedbackConfirmed === e.label ? "confirmed" : ""}"
                data-feedback=${e.label}
                aria-label="Feedback: ${e.text}"
                @click=${() => void this._onFeedbackTap(e.label)}
              >
                ${this._feedbackConfirmed === e.label ? "Thanks!" : e.text}
              </button>
            `
    )}
        </div>
      </section>
    `;
  }
};
Wt.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .temperature {
        display: flex;
        align-items: baseline;
        gap: var(--cb-gap-sm);
        flex-wrap: wrap;
      }
      .temperature .value {
        font-size: 40px;
        font-weight: 300;
        line-height: 1;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
      }
      .temperature .note,
      .warn {
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      .warn {
        margin-top: 4px;
        font-style: italic;
      }
      .gauge-row {
        margin: var(--cb-gap-md) 0;
      }
      .status {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
        font-size: 15px;
        color: var(--cb-text-primary);
        min-height: 24px;
      }
      .status ha-icon {
        --mdc-icon-size: 20px;
        /* Not a theme's --icon-primary-color: the colours below. */
        --icon-primary-color: currentColor;
        color: var(--cb-text-secondary);
      }
      .status.heating ha-icon {
        color: var(--cb-action-heating);
      }
      .status.cooling ha-icon {
        color: var(--cb-action-cooling);
      }
      .status.sensor ha-icon {
        color: var(--warning-color, #ffa600);
      }
      .notice {
        margin-top: 4px;
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      section {
        margin-top: var(--cb-gap-lg);
      }
      h3 {
        margin: 0 0 var(--cb-gap-sm);
        font-size: 13px;
        font-weight: 500;
        color: var(--cb-text-secondary);
      }
      .lengths,
      .steps {
        display: flex;
        gap: var(--cb-gap-sm);
      }
      .lengths button,
      .steps button,
      .back {
        flex: 1;
        font: inherit;
        /* WCAG 2.5.5: 44px touch targets on a wall panel. */
        min-height: 44px;
        padding: 6px 12px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .steps {
        margin-top: var(--cb-gap-sm);
      }
      .steps button {
        font-size: 15px;
      }
      .lengths button[aria-pressed='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        /* A border as well as the fill, so the choice shows in forced colours. */
        border: 2px solid currentColor;
        color: #ffffff;
        font-weight: 500;
      }
      .lengths button[aria-disabled='true'],
      .steps button[aria-disabled='true'],
      .back[aria-disabled='true'] {
        opacity: 0.5;
        cursor: default;
      }
      .back {
        display: block;
        width: 100%;
        margin-top: var(--cb-gap-sm);
      }
      button:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .feedback-row {
        display: flex;
        gap: var(--cb-gap-sm);
      }
      .feedback-pill {
        flex: 1;
        font: inherit;
        font-size: 13px;
        /* WCAG 2.5.5: 44px minimum touch target. */
        min-height: 44px;
        padding: 6px 12px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .feedback-pill.confirmed {
        background: var(--success-color, #2e7d32);
        color: #ffffff;
        border-color: transparent;
      }
    `
];
kn([
  P({ attribute: !1 })
], Wt.prototype, "hass", 2);
kn([
  P({ type: String })
], Wt.prototype, "zone", 2);
kn([
  P({ attribute: !1 })
], Wt.prototype, "entities", 2);
kn([
  q()
], Wt.prototype, "_feedbackConfirmed", 2);
kn([
  q()
], Wt.prototype, "_length", 2);
kn([
  q()
], Wt.prototype, "_burst", 2);
kn([
  q()
], Wt.prototype, "_busy", 2);
Wt = kn([
  Ie("comfort-band-now-tab")
], Wt);
var sh = Object.defineProperty, rh = Object.getOwnPropertyDescriptor, pr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? rh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && sh(t, n, o), o;
};
const Co = 14, Eo = 28, Hn = 600, Ki = 200, Ds = [0, 6, 12, 18, 24], Ji = 32, wa = [14, 18, 22, 26];
function bn(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function xa(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
let lo = class extends Te {
  constructor() {
    super(...arguments), this.transitions = [], this.now = null;
  }
  _timeToX(e) {
    return e / (24 * 60) * Hn;
  }
  _tempToY(e) {
    const t = xa(e, Co, Eo);
    return Ki - (t - Co) / (Eo - Co) * Ki;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const n = e[e.length - 1][t], i = [[0, this._tempToY(n)]];
    let o = n;
    for (const s of e) {
      const a = this._timeToX(bn(s.at));
      i.push([a, this._tempToY(o)]), i.push([a, this._tempToY(s[t])]), o = s[t];
    }
    return i.push([Hn, this._tempToY(o)]), i;
  }
  _pointsToPath(e) {
    return e.map(([t, n], i) => `${i === 0 ? "M" : "L"} ${t} ${n}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const n = this._pointsToPath(e), i = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${n} ${i} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, f) => bn(h.at) - bn(f.at)), t = e.length > 0, n = t ? this._stepPoints(e, "low") : [], i = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(n) : "", s = t ? this._pointsToPath(i) : "", a = t ? this._fillFromPoints(i, n) : "", u = this.now !== null && Number.isFinite(this.now) ? this._timeToX(xa(this.now, 0, 24 * 60)) : null;
    return v`
      <div class="chart">
        <svg
          viewBox="0 0 ${Hn} ${Ki}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${wa.map(
      (h) => Jt`<line class="grid" x1="0" x2=${Hn} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${Ds.map(
      (h) => Jt`<line class="grid" y1="0" y2=${Ki} x1=${h / 24 * Hn} x2=${h / 24 * Hn}></line>`
    )}
          ${t ? Jt`
                <path class="fill" d=${a}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const f = this._timeToX(bn(h.at));
      return Jt`
              <line class="marker low" x1=${f} x2=${f} y1=${this._tempToY(h.low)} y2=${this._tempToY(h.low)}></line>
              <line class="marker high" x1=${f} x2=${f} y1=${this._tempToY(h.high)} y2=${this._tempToY(h.high)}></line>
            `;
    })}
          ${u !== null ? Jt`<line class="now-line" x1=${u} x2=${u} y1="0" y2=${Ki}></line>` : null}
        </svg>
        ${u !== null ? v`<div
              class="now-label"
              aria-hidden="true"
              style="left: calc(${Ji}px + (100% - ${Ji}px) * ${u / Hn})"
            >
              Now
            </div>` : null}
        ${wa.map(
      (h) => v`<div
              class="axis-label y"
              style="top: ${(Eo - h) / (Eo - Co) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${Ds.map((h, f) => {
      const g = f === 0 ? "axis-label x start" : f === Ds.length - 1 ? "axis-label x end" : "axis-label x";
      return v`<div
            class=${g}
            style="left: calc(${Ji}px + (100% - ${Ji}px) * ${h / 24})"
          >
            ${h}h
          </div>`;
    })}
      </div>
      ${t ? v`<div class="legend" aria-hidden="true">
            <span class="low">Low</span><span class="high">High</span>
          </div>` : null}
    `;
  }
};
lo.styles = [
  Ue,
  De`
      :host {
        display: block;
        position: relative;
        /* Room above for the now label, clear of the line over the chart. */
        margin: 18px 0 var(--cb-gap-md);
      }
      .chart {
        position: relative;
        width: 100%;
        height: 200px;
        /* Reserve a left gutter so the Y-axis temperature labels sit
           inside the chart's bounding box. Without this they overflow
           the schedule-tab's 12 px padding and the modal clips their
           leading digit ("25°" rendered as "5°"). */
        padding-left: ${Io(Ji)}px;
        box-sizing: border-box;
        /* Room below for the hour labels (16 px down), with or without the
           legend: the legend's own margin would collapse into this one. */
        margin-bottom: 22px;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      .grid {
        stroke: var(--cb-track-bg);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
        fill: none;
      }
      .fill {
        fill: var(--cb-track-bg);
        opacity: 0.4;
      }
      .line {
        fill: none;
        stroke: var(--cb-accent, var(--primary-color, #03a9f4));
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .line.low,
      .marker.low {
        stroke: var(--cb-action-heating);
      }
      .line.high,
      .marker.high {
        stroke: var(--cb-action-cooling);
      }
      /* A dot: a line of no length with a round cap. Its stroke doesn't
         scale, so it stays round where a circle would stretch with the
         chart's width. */
      .marker {
        stroke-width: 9;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .now-line {
        stroke: var(--cb-text-secondary);
        stroke-width: 1.5;
        stroke-dasharray: 4 3;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      /* Text in HTML over the chart, as the axis labels are: the SVG
         stretches to the card's width. */
      .now-label {
        position: absolute;
        top: -14px;
        transform: translateX(-50%);
        font-size: 11px;
        line-height: 1;
        color: var(--cb-text-secondary);
        pointer-events: none;
        white-space: nowrap;
      }
      /* Below the chart, clear of its lines and labels. */
      .legend {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-md);
        font-size: 11px;
        color: var(--cb-text-secondary);
      }
      /* A swatch of the line's colour: text in it would be too faint. */
      .legend span::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 3px;
        margin-right: 6px;
        vertical-align: middle;
        border-radius: 2px;
      }
      .legend .low::before {
        background: var(--cb-action-heating);
      }
      .legend .high::before {
        background: var(--cb-action-cooling);
      }
      .axis-label {
        position: absolute;
        font-size: 10px;
        color: var(--cb-text-secondary);
        font-variant-numeric: tabular-nums;
        pointer-events: none;
      }
      .axis-label.x {
        bottom: -16px;
        transform: translateX(-50%);
      }
      .axis-label.x.start {
        transform: translateX(0);
      }
      .axis-label.x.end {
        transform: translateX(-100%);
      }
      .axis-label.y {
        left: 4px;
        transform: translateY(-50%);
        text-align: right;
        width: 24px;
      }
    `
];
pr([
  P({ type: Array })
], lo.prototype, "transitions", 2);
pr([
  P({ attribute: !1 })
], lo.prototype, "now", 2);
lo = pr([
  Ie("comfort-band-schedule-chart")
], lo);
var ah = Object.defineProperty, lh = Object.getOwnPropertyDescriptor, Sn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? lh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && ah(t, n, o), o;
};
let Vt = class extends Te {
  constructor() {
    super(...arguments), this.transition = null, this.isNew = !1, this._at = "06:00", this._low = 19, this._high = 22, this._error = null, this._onSave = () => {
      this._validate() && this.dispatchEvent(
        new CustomEvent("dialog-save", {
          detail: { transition: { at: this._at, low: this._low, high: this._high } },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._onCancel = () => {
      this.dispatchEvent(new CustomEvent("dialog-cancel", { bubbles: !0, composed: !0 }));
    }, this._onDelete = () => {
      this.transition && this.dispatchEvent(
        new CustomEvent("dialog-delete", {
          detail: { at: this.transition.at },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  willUpdate(e) {
    e.has("transition") && this.transition && (this._at = this.transition.at, this._low = this.transition.low, this._high = this.transition.high, this._error = null);
  }
  firstUpdated() {
    queueMicrotask(() => this._atInput?.focus());
  }
  _validate() {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(this._at) ? Number.isNaN(this._low) || Number.isNaN(this._high) ? (this._error = "Lowest and highest must be numbers.", !1) : this._low >= this._high ? (this._error = "Lowest must be below highest.", !1) : this._low < 10 || this._high > 35 ? (this._error = "Temperatures must be between 10 °C and 35 °C.", !1) : (this._error = null, !0) : (this._error = "Time must be HH:MM (24h, e.g. 06:00).", !1);
  }
  render() {
    return v`
      <h3>${this.isNew ? "Add a change" : "Edit this change"}</h3>
      <label>
        Time (HH:MM)
        <input
          name="at"
          type="text"
          inputmode="numeric"
          .value=${this._at}
          @input=${(e) => this._at = e.target.value}
        />
      </label>
      <label>
        Lowest (°C)
        <input
          name="low"
          type="number"
          step="0.5"
          min="10"
          max="35"
          .value=${String(this._low)}
          @input=${(e) => this._low = parseFloat(e.target.value)}
        />
      </label>
      <label>
        Highest (°C)
        <input
          name="high"
          type="number"
          step="0.5"
          min="10"
          max="35"
          .value=${String(this._high)}
          @input=${(e) => this._high = parseFloat(e.target.value)}
        />
      </label>
      ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : v`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Vt.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        /* See modal.ts for why we avoid --ha-card-background here:
           per-card theme overrides (e.g. a transparent floorplan
           overlay) would otherwise make this nested dialog unreadable. */
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--cb-text-primary);
        border-radius: var(--cb-radius-card);
        /* color-scheme: light dark inherited from tokens; tells the
           browser to use dark-mode defaults for native form controls
           when the HA theme is dark. */
      }
      h3 {
        margin: 0 0 var(--cb-gap-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        /* Bumped from secondary → primary; the secondary contrast was
           too low against HA's dark dialog bg in real-world testing. */
        color: var(--cb-text-primary);
      }
      input {
        font: inherit;
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--cb-text-primary);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
      }
      input::placeholder {
        color: var(--cb-text-secondary);
        opacity: 1;
      }
      input:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      .error {
        color: var(--error-color, #b71c1c);
        font-size: 12px;
        margin-bottom: var(--cb-gap-sm);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .actions .spacer {
        flex: 1;
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target on action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
        font-size: 13px;
      }
      .button.primary {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #ffffff);
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `
];
Sn([
  P({ type: Object })
], Vt.prototype, "transition", 2);
Sn([
  P({ type: Boolean })
], Vt.prototype, "isNew", 2);
Sn([
  q()
], Vt.prototype, "_at", 2);
Sn([
  q()
], Vt.prototype, "_low", 2);
Sn([
  q()
], Vt.prototype, "_high", 2);
Sn([
  q()
], Vt.prototype, "_error", 2);
Sn([
  Di('input[name="at"]')
], Vt.prototype, "_atInput", 2);
Vt = Sn([
  Ie("transition-edit-dialog")
], Vt);
const Ko = "comfort_band", ch = {
  effective_low: "effectiveLow",
  effective_high: "effectiveHigh",
  room_temperature: "roomTemperature",
  apparent_temperature: "apparentTemperature",
  override_ends: "overrideEnds",
  next_band_change: "nextBandChange",
  current_action: "currentAction",
  override_active: "overrideActive",
  room_sensor_unavailable: "roomSensorUnavailable",
  manual_low: "manualLow",
  manual_high: "manualHigh",
  override_hours: "overrideHours",
  deadband_below: "deadbandBelow",
  deadband_above: "deadbandAbove",
  min_cycle_minutes: "minCycleMinutes",
  cancel_override: "cancelOverride",
  enabled: "enabled",
  learning_enabled: "learningEnabled",
  use_apparent_temperature: "useApparentTemperature",
  cross_mode_min_minutes: "crossModeMinMinutes",
  lookahead_minutes: "lookaheadMinutes",
  passive_tolerance: "passiveTolerance",
  mpc_horizon_minutes: "mpcHorizonMinutes",
  band_ramp_minutes: "bandRampMinutes",
  peak_heat_offset: "peakHeatOffset",
  peak_cool_offset: "peakCoolOffset",
  peak_precondition_minutes: "peakPreconditionMinutes",
  mpc_enabled: "mpcEnabled",
  fan_control_enabled: "fanControlEnabled",
  peak_saving_enabled: "peakSavingEnabled",
  active_fan_mode: "activeFanMode",
  idle_fan_mode: "idleFanMode",
  schedule_assignment: "scheduleAssignment",
  mpc_ready: "mpcReady",
  thermal_slope: "thermalSlope",
  predicted_action: "predictedAction",
  mpc_action: "mpcAction",
  peak_saving: "peakSaving"
};
function uh() {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: null,
    apparentTemperature: null,
    overrideEnds: null,
    nextBandChange: null,
    currentAction: null,
    overrideActive: null,
    roomSensorUnavailable: null,
    manualLow: null,
    manualHigh: null,
    overrideHours: null,
    deadbandBelow: null,
    deadbandAbove: null,
    minCycleMinutes: null,
    cancelOverride: null,
    enabled: null,
    learningEnabled: null,
    useApparentTemperature: null,
    crossModeMinMinutes: null,
    lookaheadMinutes: null,
    passiveTolerance: null,
    mpcHorizonMinutes: null,
    bandRampMinutes: null,
    peakHeatOffset: null,
    peakCoolOffset: null,
    peakPreconditionMinutes: null,
    mpcEnabled: null,
    fanControlEnabled: null,
    peakSavingEnabled: null,
    activeFanMode: null,
    idleFanMode: null,
    scheduleAssignment: null,
    mpcReady: null,
    thermalSlope: null,
    predictedAction: null,
    mpcAction: null,
    peakSaving: null,
    deviceId: null,
    deviceName: null
  };
}
function mr(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function Ll(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Ko
  );
}
function Fl(e, t) {
  const n = uh(), i = mr(e, [Ko, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of Ll(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const a = ch[s];
    a !== void 0 && (n[a] = o.entity_id);
  }
  return n;
}
function gr(e) {
  return mr(e, [Ko, "profile_manager"]) !== null;
}
function Fo(e) {
  return e ? !(e.state === "unavailable" && e.attributes.default_profile === void 0) : !1;
}
function co(e) {
  const t = mr(e, [Ko, "profile_manager"]);
  if (t === null) return null;
  for (const n of Ll(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
function Hl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function Rl(e, t, n) {
  const i = t.name?.trim();
  if (i) return i;
  const o = n.deviceId !== null ? e.devices[n.deviceId]?.area_id : null, s = o ? e.areas?.[o]?.name?.trim() : void 0;
  return s || (n.deviceName ?? t.zone);
}
const Bl = {
  basic: "Basic control",
  learning: "Learning",
  predictive: "Predictive control"
}, hh = {
  heating: "Heat",
  cooling: "Cool",
  idle: "Stay idle",
  unknown: "Nothing"
};
function Qt(e, t, n) {
  const i = t[n];
  return typeof i == "string" ? e.states[i] : void 0;
}
function wi(e, t, n) {
  if (typeof t[n] != "string") return "missing";
  const i = Qt(e, t, n)?.state;
  return i === "on" || i === "off" ? i : "unknown";
}
function Ms(e) {
  return e === "heating" || e === "cooling" || e === "idle" || e === "unknown" ? e : null;
}
function dh(e, t) {
  return t.some((n) => typeof e[n] == "string");
}
const $a = [
  ["v0.4", ["learningEnabled", "useApparentTemperature", "apparentTemperature"]],
  ["v0.5", ["crossModeMinMinutes"]],
  ["v0.6", ["predictedAction", "thermalSlope", "lookaheadMinutes"]],
  ["v0.7", ["passiveTolerance"]],
  ["v0.8", ["mpcEnabled", "mpcReady", "mpcAction", "mpcHorizonMinutes"]],
  ["v0.10", ["bandRampMinutes"]],
  ["v0.13", ["fanControlEnabled", "activeFanMode", "idleFanMode"]],
  ["v0.14", ["scheduleAssignment"]],
  ["v0.16", ["roomSensorUnavailable"]],
  ["v0.23", ["nextBandChange"]],
  [
    "v0.24",
    [
      "peakSaving",
      "peakSavingEnabled",
      "peakHeatOffset",
      "peakCoolOffset",
      "peakPreconditionMinutes"
    ]
  ]
];
function no(e, t) {
  const n = $a.findIndex(([i]) => i === t);
  return $a.slice(n).some(([, i]) => dh(e, i));
}
function fh(e, t) {
  const n = Qt(e, t, "roomTemperature");
  if (!n) return null;
  const i = n.attributes.source;
  return i === "primary" || i === "fallback_sensor" || i === "climate" ? i : i === "none" ? "none" : i === void 0 && n.state !== "unavailable" ? Number.isFinite(Number.parseFloat(n.state)) ? "primary" : "none" : null;
}
function ph(e, t) {
  const n = Qt(e, t, "peakSaving");
  return n && ["off", "no_signal", "waiting", "preconditioning", "active", "override"].includes(n.state) ? n.state === "active" : wi(e, t, "peakSavingEnabled") === "off" ? !1 : no(t, "v0.24") ? null : !1;
}
function jl(e, t) {
  const n = fh(e, t), i = wi(e, t, "mpcReady"), o = wi(e, t, "enabled"), s = {
    paused: o === "on" ? !1 : o === "off" ? !0 : null,
    noReading: n === "none",
    controller: null,
    reason: null,
    decision: Ms(Qt(e, t, "currentAction")?.state),
    learning: Ms(Qt(e, t, "predictedAction")?.state),
    predictive: i === "on" ? Ms(Qt(e, t, "mpcAction")?.state) : i === "off" ? "not-ready" : null
  };
  if (n === null) return s;
  if (n === "fallback_sensor" || n === "climate")
    return { ...s, controller: "basic", reason: "stand-in" };
  const a = ph(e, t);
  if (a === null) return s;
  if (a) return { ...s, controller: "basic", reason: "peak" };
  const u = wi(e, t, "learningEnabled");
  if (u === "unknown") return s;
  if (u === "missing")
    return no(t, "v0.4") ? s : { ...s, controller: "basic", reason: "no-learning" };
  if (u === "off") return { ...s, controller: "basic", reason: "learning-off" };
  if (!no(t, "v0.6")) return s;
  const h = wi(e, t, "mpcEnabled");
  return h === "unknown" ? s : h === "missing" ? no(t, "v0.8") ? s : { ...s, controller: "learning" } : h === "off" ? { ...s, controller: "learning" } : i === "on" ? { ...s, controller: "predictive" } : i === "off" ? { ...s, controller: "learning", reason: "not-ready" } : s;
}
function mh(e) {
  return e.paused === !0 ? "Paused" : e.noReading ? "On hold" : e.controller ? `${Bl[e.controller]} deciding` : "";
}
function st(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function Il(e) {
  const t = Math.abs(e);
  return t < 0.1 ? "under 0.1°" : `about ${vn(t)}°`;
}
function gh(e) {
  if (e < 90) {
    const t = Math.max(1, Math.round(e));
    return `${t} minute${t === 1 ? "" : "s"}`;
  }
  return `about ${Math.round(e / 60)} hours`;
}
function ka(e, t, n) {
  const i = e === "heat" ? "heating" : "cooling";
  return n === "rejected" ? {
    value: "Not known",
    source: `The latest ${i} run’s readings didn’t show the room ${e === "heat" ? "warming" : "cooling"}, so they were set aside.`,
    known: !1
  } : t === null ? {
    value: "Not learned yet",
    source: `Not enough recent ${i} to learn from.`,
    known: !1
  } : {
    value: Math.abs(t) < 0.05 ? "Holds it steady" : `${t > 0 ? "Warms it" : "Cools it"} ${Il(t)} an hour`,
    source: n === "previous" ? `From an earlier ${i} run, as the latest is too short to tell.` : `From the latest ${i} run.`,
    known: !0
  };
}
function Ul(e, t) {
  if (typeof t.thermalSlope != "string") return null;
  const n = Qt(e, t, "thermalSlope");
  if (!n || n.state === "unavailable") return "unavailable";
  const i = n.attributes, o = st(i.idle_slope), s = st(i.idle_slope_cached_age_min);
  let a;
  o === null ? a = {
    value: "Not learned yet",
    source: "Not enough recent readings while idle to learn from.",
    known: !1
  } : a = {
    value: Math.abs(o) < 0.05 ? "Holds steady" : `${o > 0 ? "Warms" : "Cools"} ${Il(o)} an hour`,
    source: i.idle_slope_source === "cached" ? `From earlier readings${s !== null ? `, ${gh(s)} old` : ""}.` : "From the latest readings while idle.",
    known: !0
  };
  const u = st(i.recovery_slope_heat), h = st(i.recovery_slope_cool), f = typeof i.last_updated == "string" ? Date.parse(i.last_updated) : NaN;
  return {
    idle: a,
    heat: ka("heat", u, i.method_recovery_heat),
    cool: ka("cool", h, i.method_recovery_cool),
    details: [
      {
        name: "On its own",
        perHour: o,
        samples: st(i.sample_count_idle),
        spread: st(i.std_dev_idle),
        method: typeof i.method_idle == "string" ? i.method_idle : null
      },
      {
        name: "Heating",
        perHour: u,
        samples: st(i.sample_count_recovery_heat),
        spread: st(i.std_dev_recovery_heat),
        method: typeof i.method_recovery_heat == "string" ? i.method_recovery_heat : null
      },
      {
        name: "Cooling",
        perHour: h,
        samples: st(i.sample_count_recovery_cool),
        spread: st(i.std_dev_recovery_cool),
        method: typeof i.method_recovery_cool == "string" ? i.method_recovery_cool : null
      }
    ],
    windowMinutes: st(i.window_minutes),
    sampleCount: st(i.sample_count),
    updated: Number.isFinite(f) ? f : null
  };
}
function bh(e, t) {
  const n = wi(e, t, "mpcReady");
  if (n === "missing") return null;
  const i = "Ready to plan";
  if (n === "unknown")
    return { title: i, value: "Can’t tell", desc: "Its readiness can’t be read right now." };
  if (n === "on")
    return {
      title: i,
      value: "Yes",
      desc: "It has learned how this room drifts on its own and how fast heating or cooling moves it."
    };
  const o = Ul(e, t), s = o === "unavailable" ? null : o, a = [];
  return s && !s.idle.known && a.push("how this room drifts on its own"), s && !s.heat.known && !s.cool.known && a.push("how fast heating or cooling moves it"), {
    title: i,
    value: "Not yet",
    desc: a.length ? `Still to learn: ${a.join(", and ")}.` : "It’s still learning how this room warms and cools."
  };
}
function _h(e, t) {
  if (typeof t != "string" || !t) return null;
  const n = e.states[t]?.attributes.friendly_name;
  return typeof n == "string" && n ? n : t;
}
const Sa = "Set under Settings → Devices & Services → Comfort Band → Configure.";
function vh(e, t) {
  const n = Qt(e, t, "roomTemperature");
  if (!n) return null;
  const i = "Room reading", o = _h(e, n.attributes.fallback_temp_sensor), s = n.attributes.fallback_to_climate === !0, a = [o, s ? "the unit’s own reading" : null].filter(Boolean), u = `${a[0]} stands in if it has a reading${a.length > 1 ? `, otherwise ${a[1]} if it has one` : ""}`;
  switch (n.attributes.source) {
    case "primary":
      return {
        title: i,
        value: "Its own sensor",
        desc: a.length ? `If that goes offline for 5 minutes, ${u}. ${Sa}` : `If that goes offline, control is on hold until it’s back. ${Sa}`
      };
    case "fallback_sensor":
      return {
        title: i,
        value: `Stand-in: ${o ?? "the stand-in sensor"}`,
        desc: "Its own sensor is offline. Basic control decides until it’s back."
      };
    case "climate":
      return {
        title: i,
        value: "Stand-in: the unit’s own reading",
        desc: "Its own sensor is offline. Basic control decides until it’s back."
      };
    case "none":
      return {
        title: i,
        value: "None right now",
        desc: a.length ? `Its own sensor has no reading, so control is on hold. A stand-in is used only once its own sensor has been offline for 5 minutes, and only while it has a reading: ${a.join(", otherwise ")}.` : "Its own sensor has no reading and no stand-in is set up, so control is on hold."
      };
    default:
      return null;
  }
}
function Ks(e, t, n) {
  const i = Vo(e, n), o = n?.locale?.language, s = o?.startsWith("en") ? o : "en", a = (g) => {
    const m = new Date(g);
    return new Date(m.getFullYear(), m.getMonth(), m.getDate()).getTime();
  }, u = Math.round((a(e) - a(t)) / 864e5);
  if (u === 0) return i;
  if (u === 1) return `tomorrow ${i}`;
  if (u === -1) return `yesterday ${i}`;
  if (Math.abs(u) < 7)
    return `${new Intl.DateTimeFormat(s, { weekday: "short" }).format(e)} ${i}`;
  const h = new Date(e).getFullYear() === new Date(t).getFullYear();
  return `${new Intl.DateTimeFormat(s, {
    day: "numeric",
    month: "short",
    ...h ? {} : { year: "numeric" }
  }).format(e)}, ${i}`;
}
function Ps(e, t, n) {
  const i = typeof e == "string" ? Date.parse(e) : NaN;
  return Number.isFinite(i) ? Ks(i, t, n) : null;
}
function yh(e, t) {
  const n = [];
  return e !== null && Math.abs(e) >= 0.05 && n.push(`the bottom ${e < 0 ? "down" : "up"} ${vn(Math.abs(e))}°`), t !== null && Math.abs(t) >= 0.05 && n.push(`the top ${t > 0 ? "up" : "down"} ${vn(Math.abs(t))}°`), n.join(", ");
}
function wh(e, t, n) {
  const i = Qt(e, t, "peakSaving");
  if (!i) return null;
  const o = i.attributes, s = "Right now", a = yh(st(o.low_adjustment), st(o.high_adjustment));
  switch (i.state) {
    case "off":
      return o.peak_entity ? { title: s, value: "Off", desc: "Peak saving is switched off." } : {
        title: s,
        value: "Off",
        desc: "No peak entity is chosen. Choose one under Settings → Devices & Services → Comfort Band → Configure."
      };
    case "no_signal":
      return {
        title: s,
        value: "No peak signal",
        desc: "The peak entity can’t be read, so it counts as no peak."
      };
    case "waiting": {
      const u = Ps(o.next_start, n, e);
      return {
        title: s,
        value: "No peak now",
        desc: u ? `The next one is announced for ${u}.` : "None is announced yet."
      };
    }
    case "preconditioning": {
      const u = Ps(o.next_start, n, e), h = o.precondition === "heating";
      return {
        title: s,
        value: h ? "Warming ahead" : "Cooling ahead",
        desc: `Getting the room ready for the next peak${u ? `, starting ${u}` : ""}${a ? `: ${a}` : ""}.`
      };
    }
    case "active": {
      const u = Ps(o.ends, n, e);
      return {
        title: s,
        value: "Peak on",
        desc: [
          u ? `Until ${u}.` : "",
          a ? `The range is relaxed: ${a}.` : "",
          "Basic control decides meanwhile."
        ].filter(Boolean).join(" ")
      };
    }
    case "override":
      return {
        title: s,
        value: "Standing aside",
        desc: "An adjustment is in force, so peak saving stands aside."
      };
    default:
      return { title: s, value: "Can’t tell", desc: "Its status can’t be read right now." };
  }
}
function Aa(e, t) {
  const n = t?.config?.time_zone;
  if (n)
    try {
      const o = new Intl.DateTimeFormat("en-GB", {
        timeZone: n,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(e), s = Number(o.find((u) => u.type === "hour")?.value), a = Number(o.find((u) => u.type === "minute")?.value);
      if (Number.isFinite(s) && Number.isFinite(a)) return s * 60 + a;
    } catch {
    }
  const i = new Date(e);
  return i.getHours() * 60 + i.getMinutes();
}
function xh(e, t) {
  if (e.length === 0) return null;
  let n = e.length - 1;
  for (let i = 0; i < e.length; i++)
    bn(e[i].at) <= t && (n = i);
  return n;
}
function $h(e) {
  if (e.length < 2) return e.map(() => !1);
  const t = (n) => Math.round(n * 10);
  return e.map((n, i) => {
    const o = e[(i + e.length - 1) % e.length];
    return t(n.low) === t(o.low) && t(n.high) === t(o.high);
  });
}
function Ys(e, t) {
  const n = t.scheduleAssignment;
  if (typeof n != "string") return no(t, "v0.14") ? null : !0;
  const i = e.states[n];
  if (!i || i.state === "unavailable") return null;
  const o = i.attributes.schedule_id;
  return o === null ? !0 : typeof o == "string" ? !1 : null;
}
function kh(e, t) {
  if (Ys(e, t) !== !1) return null;
  const n = e.states[t.scheduleAssignment];
  return n?.state && n.state !== "unknown" ? n.state : null;
}
function Sh(e, t) {
  const n = Go(e, t);
  return !Number.isFinite(n.band.low) || !Number.isFinite(n.band.high) ? null : `Now ${_n(n.band)}`;
}
var Ah = Object.defineProperty, Th = Object.getOwnPropertyDescriptor, tt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Th(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Ah(t, n, o), o;
};
function Ta(e, t) {
  return bn(e.at) - bn(t.at);
}
const Ns = 15, zs = 24 * 60;
function Ch(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((i) => bn(i.at))), n = Math.max(...t);
  for (let i = 1; i <= zs / Ns; i++) {
    const o = (n + i * Ns) % zs;
    if (!t.has(o)) return Ca(o);
  }
  return Ca((n + Ns) % zs);
}
function Ca(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
let Ge = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._editingList = !1, this._now = Date.now(), this._clock = null, this._focusAfterMode = null, this._profile = "", this._listProfile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onEditSchedule = () => {
      this._editingList = !0, this._focusAfterMode = "add";
    }, this._onDoneEditing = () => {
      this._editingList = !1, this._confirmingDeleteAt = null, this._focusAfterMode = "edit";
    }, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = Ch(this._transitions), this._newLow = Da(this._transitions), this._newHigh = Ma(this._transitions), this._editing = null, this._mode = "add";
    }, this._onRowClicked = (e) => (t) => {
      this._openEdit(e, "row");
    }, this._onRowKeydown = (e) => (t) => {
      if (t.target === t.currentTarget) {
        if (t.key === "Enter" || t.key === " ") {
          t.preventDefault(), this._openEdit(e, "row");
          return;
        }
        (t.key === "Delete" || t.key === "Backspace") && (t.preventDefault(), this._focusTrigger = { kind: "row", at: e.at }, this._confirmingDeleteAt = e.at);
      }
    }, this._onEditClicked = (e) => (t) => {
      t.stopPropagation(), this._openEdit(e, "edit");
    }, this._onDeleteClicked = (e) => (t) => {
      t.stopPropagation(), this._focusTrigger = { kind: "row", at: e.at, button: "delete" }, this._confirmingDeleteAt = e.at;
    }, this._onCancelDelete = (e) => {
      e.stopPropagation(), this._confirmingDeleteAt = null, this.updateComplete.then(() => this._restoreFocus());
    }, this._onConfirmDelete = async (e) => {
      e.stopPropagation();
      const t = this._confirmingDeleteAt;
      if (!t || !this.hass) return;
      this._confirmingDeleteAt = null;
      const n = this._transitions.filter((i) => i.at !== t);
      await this._writeSchedule(n), this.updateComplete.then(() => this._restoreFocus());
    }, this._onConfirmKeydown = (e) => {
      e.key === "Escape" && (e.preventDefault(), this._confirmingDeleteAt = null, this.updateComplete.then(() => this._restoreFocus()));
    }, this._onDialogSave = async (e) => {
      const t = e.detail.transition, n = [];
      if (this._mode === "edit" && this._editing) {
        const i = this._editing.at;
        for (const o of this._transitions)
          o.at !== i && o.at !== t.at && n.push(o);
        n.push(t);
      } else {
        for (const i of this._transitions)
          i.at !== t.at && n.push(i);
        n.push(t);
      }
      n.sort(Ta), await this._writeSchedule(n), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && (this._now = Date.now()), e.has("hass") && this.hass && this._profile === "" && (this._profile = Ea(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Ea(this.hass);
      t && t !== this._profile && (this._profile = t, this._resubscribe());
    }
    if (e.has("_confirmingDeleteAt") && this._confirmingDeleteAt !== null && this.shadowRoot?.querySelector(
      "li.row.confirm .button.secondary"
    )?.focus(), this._focusAfterMode) {
      const t = this._focusAfterMode;
      this._focusAfterMode = null, this.shadowRoot?.querySelector(
        t === "add" ? ".list-toolbar .button.primary" : ".list-toolbar .button.secondary"
      )?.focus();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._now = Date.now(), this._tick(), this.hass && this.zone && this._profile && !this._unsub && this._subscribe();
  }
  /** Moves "now" on at the next minute, and again at each after it. */
  _tick() {
    this._clock = setTimeout(
      () => {
        this._now = Date.now(), this._tick();
      },
      6e4 - Date.now() % 6e4
    );
  }
  disconnectedCallback() {
    this._clock !== null && clearTimeout(this._clock), this._clock = null, this._unsubscribe(), super.disconnectedCallback();
  }
  async _subscribe() {
    if (!this.hass || !this.zone || !this._profile) {
      this._loading = !1;
      return;
    }
    const e = ++this._subscribeGen, t = this._profile;
    this._transitions.length === 0 && (this._loading = !0), this._error = null;
    try {
      const n = await Wu(this.hass, { zone: this.zone, profile: t }, (i) => {
        e === this._subscribeGen && (this._listProfile = t, this._transitions = i?.baseline ? [...i.baseline].sort(Ta) : [], this._loading = !1);
      });
      if (e !== this._subscribeGen) {
        n();
        return;
      }
      this._unsub = n;
    } catch (n) {
      if (e !== this._subscribeGen) return;
      this._error = n instanceof Error ? n.message : "Failed to subscribe.", this._loading = !1;
    }
  }
  _unsubscribe() {
    this._subscribeGen++, this._unsub?.(), this._unsub = void 0;
  }
  _resubscribe() {
    return this._unsubscribe(), this._subscribe();
  }
  _openEdit(e, t) {
    this._focusTrigger = {
      kind: "row",
      at: e.at,
      button: t === "edit" ? "edit" : void 0
    }, this._editing = e, this._mode = "edit";
  }
  _exitDialogMode() {
    this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0, this.updateComplete.then(() => this._restoreFocus());
  }
  _restoreFocus() {
    const e = this._focusTrigger;
    if (this._focusTrigger = null, !e) return;
    const t = this.shadowRoot;
    if (!t) return;
    let n = null;
    if (e.kind === "add")
      n = t.querySelector(".list-toolbar button.primary");
    else {
      const i = t.querySelector(`li.row[data-at="${e.at}"]`);
      i && e.button === "edit" ? n = i.querySelector("button.secondary") : i && e.button === "delete" ? n = i.querySelector("button.danger") : n = i;
    }
    n = n ?? t.querySelector(".list-toolbar button.primary"), n?.focus();
  }
  async _writeSchedule(e) {
    if (!this.hass) return;
    const t = this._transitions;
    this._transitions = e;
    try {
      await Vu(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (n) {
      this._transitions = t, this._error = n instanceof Error ? n.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return T;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? Da(this._transitions),
        high: this._newHigh ?? Ma(this._transitions)
      };
      return v`
        <transition-edit-dialog
          .transition=${t}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    const e = this._listInForce();
    return v`
      ${this._renderHeader()} ${this._renderNow()}
      ${this._loading ? v`<div class="loading">Loading schedule…</div>` : this._error ? v`<div class="error" role="alert">${this._error}</div>` : v`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
                .now=${e ? Aa(this._now, this.hass) : null}
              ></comfort-band-schedule-chart>
              <div class="list-toolbar">
                ${this._editingList ? v`<button class="button primary" @click=${this._onAddClicked}>
                        + Add a change
                      </button>
                      <button class="button secondary" @click=${this._onDoneEditing}>Done</button>` : v`<button class="button secondary" @click=${this._onEditSchedule}>
                      Edit schedule
                    </button>`}
              </div>
              ${this._renderList(e)}
            `}
    `;
  }
  /**
   * Which profile's schedule this is, named as typed, where profiles are set
   * up. Not "the room follows it": with no schedule of its own in the active
   * profile, a room follows the default profile's.
   */
  _renderHeader() {
    const e = this.hass ? co(this.hass) : null, t = e ? this.hass.states[e] : void 0, n = Fo(t) ? t.state : null;
    return !n || n === "unknown" ? T : v`<div class="header">
      <span class="profile-label">Schedule: ${n}</span>
    </div>`;
  }
  /**
   * Whether this list is the one in force: the room's own schedule (not a
   * shared one) for the active profile, with changes in it (without, the
   * room follows the default profile's schedule, or its own range). Where
   * the profile select can't be read, the list shown may not be the active
   * profile's, so it's only taken as in force without a profile manager at
   * all. Across a change of profile, the list shown is the old one's until
   * the new one's arrives.
   */
  _listInForce() {
    if (!this.hass || !this.entities || this._transitions.length === 0 || Ys(this.hass, this.entities) !== !0) return !1;
    const e = co(this.hass), t = e ? this.hass.states[e] : void 0;
    return Fo(t) ? t.state === this._listProfile : !gr(this.hass);
  }
  /** The range in force now, from the integration's entities; and whether
   *  the room follows a shared schedule. */
  _renderNow() {
    if (!this.hass || !this.entities) return T;
    const e = Sh(this.hass, this.entities), t = Ys(this.hass, this.entities) === !1, n = kh(this.hass, this.entities);
    return v`
      ${e ? v`<div class="now-line">${e}</div>` : T}
      ${t ? v`<div class="shared-note">
            This room follows ${n ? `“${n}”, a shared schedule` : "a shared schedule"}.
            The changes below are its own, not the ones in force.
          </div>` : T}
    `;
  }
  _renderList(e) {
    if (this._transitions.length === 0)
      return v`<div class="empty">
        ${this._editingList ? "No changes yet. Use “Add a change” to create one." : "No changes yet."}
      </div>`;
    const t = e ? xh(this._transitions, Aa(this._now, this.hass)) : null, n = $h(this._transitions);
    return v`
      <ul class="list" role="list">
        ${this._transitions.map(
      (i, o) => this._confirmingDeleteAt === i.at ? this._renderConfirmRow(i) : this._editingList ? this._renderRow(i, o === t, n[o]) : this._renderReadRow(i, o === t, n[o])
    )}
      </ul>
    `;
  }
  _tags(e, t) {
    return v`${e ? v`<span class="tag current">Current</span>` : T}
    ${t ? v`<span class="tag same">Same as before</span>` : T}`;
  }
  _renderReadRow(e, t, n) {
    return v`
      <li
        class="row read ${t ? "current" : ""}"
        role="listitem"
        data-at=${e.at}
        aria-current=${t ? "true" : T}
      >
        <span class="at">${Es(e.at, this.hass)}</span>
        <span class="band">${_n(e)}</span>
        ${this._tags(t, n)}
      </li>
    `;
  }
  _renderRow(e, t, n) {
    const i = Es(e.at, this.hass), o = [
      `Edit the ${i} change, ${vn(e.low)} to ${vn(e.high)} degrees`,
      t ? "current" : "",
      n ? "same as before" : ""
    ].filter(Boolean).join(", ");
    return v`
      <li
        class="row ${t ? "current" : ""}"
        role="listitem"
        tabindex="0"
        data-at=${e.at}
        aria-label=${o}
        aria-current=${t ? "true" : T}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${i}</span>
        <span class="band">${_n(e)}</span>
        ${this._tags(t, n)}
        <span class="actions">
          <button
            class="button secondary"
            aria-label="Edit the ${i} change"
            @click=${this._onEditClicked(e)}
          >
            Edit
          </button>
          <button
            class="button danger"
            aria-label="Delete the ${i} change"
            @click=${this._onDeleteClicked(e)}
          >
            Delete
          </button>
        </span>
      </li>
    `;
  }
  _renderConfirmRow(e) {
    const t = `Delete the ${Es(e.at, this.hass)} change?`;
    return v`
      <li
        class="row confirm"
        role="alertdialog"
        aria-label=${t}
        @keydown=${this._onConfirmKeydown}
      >
        <span class="confirm-text">${t}</span>
        <span class="actions">
          <button class="button secondary" @click=${this._onCancelDelete}>Cancel</button>
          <button class="button danger" @click=${this._onConfirmDelete}>Delete</button>
        </span>
      </li>
    `;
  }
};
Ge.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: var(--cb-gap-sm);
      }
      .profile-label {
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .loading,
      .error {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
      .error {
        color: var(--error-color, #b71c1c);
      }
      .list-toolbar {
        display: flex;
        justify-content: flex-end;
        margin: var(--cb-gap-md) 0 var(--cb-gap-sm);
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .row {
        display: flex;
        /* A row with its tags and buttons wraps on a phone rather than
           widening the dialog. */
        flex-wrap: wrap;
        align-items: center;
        gap: var(--cb-gap-sm);
        font-size: 13px;
        padding: 8px 8px;
        border-radius: 6px;
        /* Explicit color — without this, .list li inherits the host's
           ambient color which in HA dark theme can resolve dark-on-dark.
           The v0.8.x bug. */
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .row:hover,
      .row:focus-visible {
        background: var(--cb-track-bg);
        outline: none;
      }
      .row:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .row .at {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
        color: var(--cb-text-primary);
        min-width: 48px;
      }
      .row .band {
        color: var(--cb-text-secondary);
        flex: 1;
        white-space: nowrap;
      }
      .row .actions {
        display: flex;
        gap: 4px;
        margin-left: auto;
      }
      .row.confirm {
        background: var(--cb-track-bg);
        cursor: default;
      }
      .row.confirm .confirm-text {
        flex: 1;
        color: var(--cb-text-primary);
      }
      /* Buttons — copied from transition-edit-dialog.ts conventions so the
         list buttons match the dialog buttons visually. */
      .button {
        font: inherit;
        font-size: 13px;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target on action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
      }
      .button:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .button.primary {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #ffffff);
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
      .now-line {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .shared-note {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.35;
        color: var(--cb-text-secondary);
      }
      .list-toolbar {
        gap: var(--cb-gap-sm);
      }
      /* Read first: rows aren't buttons until "Edit schedule". */
      .row.read {
        cursor: default;
      }
      .row.read:not(.current):hover {
        background: none;
      }
      .row.current {
        box-shadow: inset 3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));
        background: var(--cb-track-bg);
      }
      /* On the highlight, secondary text would be too faint. */
      .row.current .band,
      .row.current .tag {
        color: var(--cb-text-primary);
      }
      .tag {
        flex: none;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        font-size: 11px;
        color: var(--cb-text-secondary);
      }
      .tag.current {
        border-color: var(--cb-accent, var(--primary-color, #03a9f4));
        color: var(--cb-text-primary);
      }
      .empty {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
    `
];
tt([
  P({ attribute: !1 })
], Ge.prototype, "hass", 2);
tt([
  P({ type: String })
], Ge.prototype, "zone", 2);
tt([
  P({ attribute: !1 })
], Ge.prototype, "entities", 2);
tt([
  q()
], Ge.prototype, "_editingList", 2);
tt([
  q()
], Ge.prototype, "_now", 2);
tt([
  q()
], Ge.prototype, "_profile", 2);
tt([
  q()
], Ge.prototype, "_listProfile", 2);
tt([
  q()
], Ge.prototype, "_transitions", 2);
tt([
  q()
], Ge.prototype, "_loading", 2);
tt([
  q()
], Ge.prototype, "_error", 2);
tt([
  q()
], Ge.prototype, "_mode", 2);
tt([
  q()
], Ge.prototype, "_editing", 2);
tt([
  q()
], Ge.prototype, "_newAt", 2);
tt([
  q()
], Ge.prototype, "_confirmingDeleteAt", 2);
Ge = tt([
  Ie("comfort-band-schedule-tab")
], Ge);
function Ea(e) {
  const t = co(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Da(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Ma(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Eh = Object.defineProperty, Dh = Object.getOwnPropertyDescriptor, Mi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Dh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Eh(t, n, o), o;
};
const Mh = 1e3, Ph = 15e3, gi = (e, t, n) => ({
  kind: "switch",
  field: e,
  title: t,
  desc: n
}), wt = (e, t, n) => ({
  kind: "number",
  field: e,
  title: t,
  desc: n
}), Os = (e, t, n, i) => ({ kind: "select", field: e, title: t, desc: n, label: i }), Wl = (e) => e, Nh = {
  comfort: {
    main: [
      gi(
        "useApparentTemperature",
        "Use “feels like”",
        "When on, heating and cooling go by the humidity-adjusted “feels like” temperature instead of the room’s own reading. Falls back to the room’s reading automatically if the humidity sensor is unavailable."
      ),
      wt(
        "deadbandBelow",
        "Heating starts below the range by",
        "How far below the range the room may drop before heating starts; heating stops at the bottom of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and heats towards the top of the range."
      ),
      wt(
        "deadbandAbove",
        "Cooling starts above the range by",
        "How far above the range the room may rise before cooling starts; cooling stops at the top of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and cools towards the bottom of the range."
      ),
      wt(
        "bandRampMinutes",
        "Ease schedule changes over",
        "Spreads each change of range over this long, centred on its time, instead of changing all at once. 0 changes at once."
      ),
      wt(
        "overrideHours",
        "Adjustments made elsewhere last",
        "How long an adjustment lasts when it’s started without a length: from the device page, or an automation that doesn’t give one. Warmer, Cooler and the exact range here set their own length."
      )
    ]
  },
  automation: {
    main: [
      gi(
        "enabled",
        "Control this room",
        "When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused."
      ),
      gi(
        "learningEnabled",
        "Learning",
        "Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings."
      ),
      gi(
        "mpcEnabled",
        "Predictive control",
        "Plans heating and cooling ahead, from what the room has learned and the schedule coming up. Needs Learning on. It plans only while it has recent enough readings of how this room warms and cools, usually after a few hours of normal running."
      )
    ],
    fine: [
      wt(
        "lookaheadMinutes",
        "Look ahead by",
        "How far ahead learning projects the room’s temperature, to start or stop early, or hold off."
      ),
      wt(
        "passiveTolerance",
        "Let it drift back within",
        "How far outside the range the room may be for learning to let it drift back on its own, rather than heat or cool."
      ),
      wt(
        "mpcHorizonMinutes",
        "Plan ahead by",
        "How far ahead predictive control plans, schedule changes included."
      ),
      wt(
        "minCycleMinutes",
        "Repeat a command no sooner than",
        "The least time before the unit is sent the same command again, such as a new setting while it’s already heating."
      ),
      wt(
        "crossModeMinMinutes",
        "Switch between heating and cooling no sooner than",
        "The least time between heating and then cooling, or the other way round."
      )
    ]
  },
  fan: {
    main: [
      gi(
        "fanControlEnabled",
        "Fan control",
        "Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen."
      ),
      Os(
        "activeFanMode",
        "Fan while heating or cooling",
        "The fan speed while the unit is working. Peak saving can leave it as it is during a peak.",
        Pa
      ),
      Os(
        "idleFanMode",
        "Fan while idle",
        "The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed.",
        Pa
      )
    ]
  },
  peak: {
    main: [
      gi(
        "peakSavingEnabled",
        "Peak saving",
        "Runs heating and cooling less in expensive power times. During one, the range widens, so the room drifts further before heating or cooling starts. Ahead of one that’s announced, the room can be warmed or cooled a little within its range. An adjustment in force sets both aside. Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure."
      ),
      wt(
        "peakHeatOffset",
        "Relax the bottom of the range by",
        "How far the bottom of the range drops during a peak; heating still starts the usual amount below it. Ahead of one, up to how far the bottom rises to warm the room first."
      ),
      wt(
        "peakCoolOffset",
        "Relax the top of the range by",
        "How far the top of the range rises during a peak; cooling still starts the usual amount above it. Ahead of one, up to how far the top falls to cool the room first."
      ),
      wt(
        "peakPreconditionMinutes",
        "Prepare ahead by",
        "How long before an announced peak to warm or cool the room. 0 doesn’t prepare."
      )
    ]
  },
  schedules: {
    main: [
      Os(
        "scheduleAssignment",
        "Follows",
        "Which schedule sets this room’s range: its own, or one shared with other rooms. The Schedule tab shows and changes the room’s own schedule, even while it follows a shared one.",
        Wl
      )
    ]
  }
}, zh = {
  fan: { what: "Fan control needs", since: "v0.13.0" },
  peak: { what: "Peak saving needs", since: "v0.24.0" },
  schedules: { what: "Choosing a shared schedule needs", since: "v0.14.0" }
};
function Pa(e) {
  if (e === "(none)") return "Leave as it is";
  const t = e.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ho(e) {
  const t = String(e), n = t.indexOf(".");
  return n < 0 ? 0 : t.length - n - 1;
}
function Oh(e, t) {
  return Math.max(Ho(t), Ho(Number(e.toFixed(3))));
}
function Lh(e) {
  const t = typeof e == "object" && e !== null ? e.message : void 0;
  return typeof t == "string" && t ? t : "That setting couldn’t be changed.";
}
function bi(e) {
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) ? t : null;
}
let yn = class extends Te {
  constructor() {
    super(...arguments), this.section = "comfort", this._pending = {}, this._error = null, this._timers = /* @__PURE__ */ new Map(), this._settling = /* @__PURE__ */ new Map(), this._chain = Promise.resolve(), this._onToggle = (e) => {
      if (this._pending[e] !== void 0) return;
      const t = !this._isOn(e);
      this._pending = { ...this._pending, [e]: t }, this._error = null, this._send(e, t, "switch", t ? "turn_on" : "turn_off", {});
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const [e, t] of this._timers) {
      clearTimeout(t), this._timers.delete(e);
      const n = this._pending[e];
      typeof n == "number" && this._send(e, n, "number", "set_value", { value: n });
    }
    for (const e of [...this._settling.keys()]) this._drop(e);
  }
  /** A value that has gone through shows until HA's state for its entity
   *  changes, then HA's state shows: the value sent, or what HA made of it. */
  willUpdate() {
    for (const [e, { baseline: t }] of [...this._settling])
      this.hass?.states[e] !== t && this._drop(e);
  }
  _entity(e) {
    const t = this.entities?.[e];
    return typeof t == "string" ? t : null;
  }
  /** Sends a call for the value shown, after the ones before it. Refused,
   *  the value in force shows again; through, the value shows until HA
   *  reports it. A newer tap or choice made meanwhile keeps showing. */
  _send(e, t, n, i, o) {
    const s = this.hass;
    if (!s) return;
    const a = () => this._pending[e] === t && !this._timers.has(e);
    this._chain = this._chain.then(() => s.callService(n, i, { entity_id: e, ...o })).then(
      () => {
        this._error?.entityId === e && (this._error = null), a() && (this._reported(e, t) || !this.isConnected ? this._drop(e) : this._settle(e));
      },
      (u) => {
        this._error = { entityId: e, message: Lh(u) }, a() && this._drop(e);
      }
    );
  }
  /** Whether HA's state for the entity already says the value. */
  _reported(e, t) {
    const n = this.hass?.states[e]?.state;
    return typeof t == "boolean" ? n === (t ? "on" : "off") : typeof t == "number" ? Number.parseFloat(n ?? "") === t : n === t;
  }
  /** Keeps a value that has gone through showing until HA's state for its
   *  entity changes, or for SETTLE_MS at most. */
  _settle(e) {
    this._stopSettling(e), this._settling.set(e, {
      baseline: this.hass?.states[e],
      timer: setTimeout(() => this._drop(e), Ph)
    });
  }
  _stopSettling(e) {
    const t = this._settling.get(e);
    t && clearTimeout(t.timer), this._settling.delete(e);
  }
  /** Shows HA's value again. */
  _drop(e) {
    if (this._stopSettling(e), this._pending[e] === void 0) return;
    const t = { ...this._pending };
    delete t[e], this._pending = t;
  }
  _isOn(e) {
    const t = this._pending[e];
    return typeof t == "boolean" ? t : this.hass?.states[e]?.state === "on";
  }
  _onStep(e, t) {
    const n = this.hass?.states[e];
    if (!n) return;
    const i = bi(n.attributes.step) ?? 1, o = bi(n.attributes.min) ?? -1 / 0, s = bi(n.attributes.max) ?? 1 / 0, a = this._pending[e], u = typeof a == "number" ? a : Number.parseFloat(n.state), h = Number.isFinite(o) ? o : 0, f = (u - h) / i, g = t > 0 ? Math.floor(f + 1e-9) + 1 : Math.ceil(f - 1e-9) - 1, m = Math.max(Ho(i), Ho(h)), _ = Math.min(s, Math.max(o, Number((h + g * i).toFixed(m))));
    this._pending = { ...this._pending, [e]: _ }, this._error = null, this._stopSettling(e);
    const $ = this._timers.get(e);
    $ !== void 0 && clearTimeout($), this._timers.set(
      e,
      setTimeout(() => {
        this._timers.delete(e), this._send(e, _, "number", "set_value", { value: _ });
      }, Mh)
    );
  }
  _onChoose(e, t) {
    this._pending = { ...this._pending, [e]: t }, this._error = null, this._stopSettling(e), this._send(e, t, "select", "select_option", { option: t });
  }
  render() {
    if (!this.hass || !this.entities) return T;
    const { main: e, fine: t = [] } = Nh[this.section], n = (h) => h.filter((f) => this._entity(f.field) !== null), i = n(e), o = n(t), s = e.length + t.length - i.length - o.length, a = i.length + o.length === 0, u = zh[this.section];
    return v`
      ${this._error ? v`<div class="error" role="alert">${this._error.message}</div>` : T}
      ${this.section === "peak" ? this._renderStatus(wh(this.hass, this.entities, Date.now()), "peak") : T}
      ${i.map((h) => this._renderSetting(h))}
      ${this.section === "comfort" ? v`${this._renderHumidity()}
          ${this._renderStatus(vh(this.hass, this.entities), "source")}` : T}
      ${this.section === "automation" ? this._renderStatus(bh(this.hass, this.entities), "readiness") : T}
      ${o.length ? v`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${o.map((h) => this._renderSetting(h))}
          </details>` : T}
      ${a ? v`<div class="upgrade-hint">
            ${u ? v`${u.what} the <code>comfort_band</code> integration ${u.since} or
                  later, with its entities turned on.` : v`These settings’ entities are turned off. Turn them on from this room’s device
                page, under Settings → Devices &amp; Services.`}
          </div>` : s > 0 ? v`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>` : T}
    `;
  }
  _renderSetting(e) {
    const t = this._entity(e.field);
    switch (e.kind) {
      case "switch":
        return this._renderToggle({
          entityId: t,
          field: e.field,
          title: e.title,
          desc: v`${e.desc}`
        });
      case "number":
        return this._renderNumber(t, e);
      case "select":
        return this._renderSelect(t, e);
    }
  }
  /** What the integration is doing, beside the settings it explains. */
  _renderStatus(e, t) {
    return e ? v`
      <div class="row" data-status=${t}>
        <div class="row-label">
          <div class="title">${e.title}</div>
          <div class="desc">${e.desc}</div>
        </div>
        <div class="info-value">${e.value}</div>
      </div>
    ` : T;
  }
  _renderHumidity() {
    const e = this.entities.roomTemperature, t = e !== null ? this.hass.states[e] : void 0, n = t !== void 0 && t.state !== "unavailable", i = n ? Hl(this.hass, e) : null, o = t === void 0 ? "Can’t be read" : n ? i ? this._sensorText(i) : "Not configured" : "Can’t be read right now";
    return v`
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">${t === void 0 ? "It’s read from this room’s Room temperature sensor, which is turned off. Turn it on from this room’s device page, under Settings → Devices & Services." : `${n ? i ? "Change it" : "Set one up" : "Set"} under Settings → Devices & Services → Comfort Band → Configure.`}</div>
        </div>
        <div class="info-value ${i ? "" : "unconfigured"}">${o}</div>
      </div>
    `;
  }
  /** "Bedroom humidity · 54%": the sensor's own name and reading, not its
   *  ID, the reading as HA formats it where the frontend can. */
  _sensorText(e) {
    const t = this.hass.states[e];
    if (!t) return e;
    const n = typeof t.attributes.friendly_name == "string" && t.attributes.friendly_name ? t.attributes.friendly_name : e, i = Number.parseFloat(t.state);
    if (!Number.isFinite(i)) return `${n} · no reading`;
    if (this.hass.formatEntityState) return `${n} · ${this.hass.formatEntityState(t)}`;
    const o = typeof t.attributes.unit_of_measurement == "string" ? t.attributes.unit_of_measurement : "";
    return `${n} · ${t.state}${o ? ` ${o}` : ""}`;
  }
  _renderNumber(e, t) {
    const n = this.hass.states[e], i = bi(n?.attributes.step) ?? 1, o = bi(n?.attributes.min), s = bi(n?.attributes.max), a = typeof n?.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : "", u = this._pending[e], h = typeof u == "number" ? u : Number.parseFloat(n?.state ?? ""), f = Number.isFinite(h), g = f ? `${h.toFixed(Oh(h, i))}${a ? ` ${a}` : ""}` : "—", m = `t-${t.field}`, _ = !f || o !== null && h <= o, $ = !f || s !== null && h >= s;
    return v`
      <div class="row num" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${m}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <div class="stepper" role="group" aria-labelledby=${m}>
          <button
            class="step"
            type="button"
            aria-label="Decrease"
            aria-disabled=${_ ? "true" : "false"}
            @click=${() => !_ && this._onStep(e, -1)}
          >
            −
          </button>
          <output class="value" aria-live="polite">${g}</output>
          <button
            class="step"
            type="button"
            aria-label="Increase"
            aria-disabled=${$ ? "true" : "false"}
            @click=${() => !$ && this._onStep(e, 1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
  _renderSelect(e, t) {
    const n = this.hass.states[e], i = Array.isArray(n?.attributes.options) ? n.attributes.options.filter((g) => typeof g == "string") : [], o = this._pending[e], s = typeof o == "string" ? o : n?.state ?? "", a = `t-${t.field}`, u = n?.state === "unavailable" || i.length === 0, h = i.includes(s), f = t.label ?? Wl;
    return v`
      <div class="row pick" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${a}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <select
          class="choice"
          aria-labelledby=${a}
          ?disabled=${u}
          @change=${(g) => this._onChoose(e, g.target.value)}
        >
          ${h && !u ? T : v`<option value="" disabled .selected=${!0}>
                ${u ? "Unavailable" : "—"}
              </option>`}
          ${i.map(
      (g) => v`<option value=${g} .selected=${!u && g === s}>
                ${f(g)}
              </option>`
    )}
        </select>
      </div>
    `;
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), n = this._pending[e.entityId] !== void 0, i = this.hass.states[e.entityId]?.state;
    return i !== "on" && i !== "off" ? v`
        <div class="row" data-setting=${e.field}>
          <div class="row-label">
            <div class="title">${e.title}</div>
            <div class="desc">${e.desc}</div>
          </div>
          <div class="info-value unconfigured">
            ${i === void 0 || i === "unavailable" ? "Unavailable" : "Unknown"}
          </div>
        </div>
      ` : v`
      <div class="row" data-setting=${e.field}>
        <div class="row-label">
          <div class="title">${e.title}</div>
          <div class="desc">${e.desc}</div>
        </div>
        <button
          class="toggle"
          role="switch"
          aria-checked=${t ? "true" : "false"}
          aria-disabled=${n ? "true" : "false"}
          aria-label=${e.title}
          @click=${n ? null : () => this._onToggle(e.entityId)}
        >
          <span class="knob"></span>
        </button>
      </div>
    `;
  }
};
yn.styles = [
  Ue,
  De`
      :host {
        display: block;
      }
      .row {
        display: flex;
        align-items: flex-start;
        gap: var(--cb-gap-md);
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .row:last-of-type {
        border-bottom: none;
      }
      .row-label {
        flex: 1;
        min-width: 0;
      }
      .row-label .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .row-label .desc {
        margin-top: 4px;
        /* An entity ID named in it wraps rather than widening the dialog. */
        overflow-wrap: anywhere;
        font-size: 12px;
        color: var(--cb-text-secondary);
        line-height: 1.35;
      }
      /* WCAG 2.5.5: 44x44 minimum tap target on the toggle. */
      .toggle {
        position: relative;
        flex: 0 0 auto;
        width: 52px;
        min-height: 44px;
        padding: 0;
        border: none;
        border-radius: var(--cb-radius-pill);
        background: var(--cb-track-bg);
        cursor: pointer;
      }
      .toggle:hover:not([aria-disabled='true']) {
        filter: brightness(0.92);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .toggle[aria-checked='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
      }
      .toggle .knob {
        position: absolute;
        top: 50%;
        left: 4px;
        width: 24px;
        height: 24px;
        margin-top: -12px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: left 0.15s ease;
      }
      .toggle[aria-checked='true'] .knob {
        left: 24px;
      }
      .toggle[aria-disabled='true'] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .info-value {
        /* A long name or ID wraps rather than squeezing the label out. */
        max-width: 55%;
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--cb-text-primary);
        text-align: right;
      }
      .info-value.unconfigured {
        font-style: italic;
        color: var(--cb-text-secondary);
      }
      .error {
        margin-bottom: var(--cb-gap-sm);
        padding: 8px 12px;
        border-radius: 6px;
        background: rgba(183, 28, 28, 0.1);
        color: var(--error-color, #b71c1c);
        font-size: 12px;
      }
      .upgrade-hint {
        margin-top: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
      }
      .upgrade-hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
      /* A stepper too wide to leave its title room goes below it. */
      .row.num {
        flex-wrap: wrap;
      }
      .row.num .row-label {
        flex: 1 1 12em;
      }
      .stepper {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        gap: 2px;
        margin-left: auto;
      }
      /* WCAG 2.5.5: 44x44 targets on the steppers too. */
      .step {
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: var(--cb-radius-pill);
        background: transparent;
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }
      .step:focus-visible,
      .choice:focus-visible,
      summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .step[aria-disabled='true'] {
        opacity: 0.4;
        cursor: default;
      }
      .value {
        min-width: 4.5em;
        text-align: center;
        font-size: 14px;
        font-variant-numeric: tabular-nums;
        color: var(--cb-text-primary);
      }
      /* A choice too wide to sit beside its title goes below it. */
      .row.pick {
        flex-wrap: wrap;
      }
      .row.pick .row-label {
        flex: 1 1 12em;
      }
      /* WCAG 2.5.5: 44px tall. WebKit's own menu button ignores the height and
         the border, so it's drawn here, chevron included. */
      .choice {
        flex: 0 1 auto;
        max-width: 100%;
        min-height: 44px;
        margin-left: auto;
        padding: 0 28px 0 10px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 8px;
        -webkit-appearance: none;
        appearance: none;
        background-color: var(--card-background-color, #ffffff);
        background-image:
          linear-gradient(45deg, transparent 50%, var(--cb-text-secondary) 50%),
          linear-gradient(135deg, var(--cb-text-secondary) 50%, transparent 50%);
        background-position:
          calc(100% - 15px) 50%,
          calc(100% - 10px) 50%;
        background-size: 5px 5px;
        background-repeat: no-repeat;
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 14px;
        text-overflow: ellipsis;
        /* With its own look, WebKit lets a long option's text out of the box. */
        overflow: hidden;
      }
      .choice:disabled {
        opacity: 0.6;
      }
      .note {
        margin-top: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      /* "Fine-tuning", folded inside Automation. */
      details.fine {
        margin-top: var(--cb-gap-sm);
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      details.fine > summary {
        display: flex;
        align-items: center;
        min-height: 44px;
        list-style: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      details.fine > summary::-webkit-details-marker {
        display: none;
      }
      details.fine > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 8px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.fine[open] > summary::before {
        transform: rotate(45deg);
      }
      details.fine .fine-summary {
        margin-left: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `
];
Mi([
  P({ attribute: !1 })
], yn.prototype, "hass", 2);
Mi([
  P({ attribute: !1 })
], yn.prototype, "entities", 2);
Mi([
  P({ type: String })
], yn.prototype, "section", 2);
Mi([
  q()
], yn.prototype, "_pending", 2);
Mi([
  q()
], yn.prototype, "_error", 2);
yn = Mi([
  Ie("comfort-band-settings-tab")
], yn);
var Fh = Object.defineProperty, Hh = Object.getOwnPropertyDescriptor, sn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Hh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Fh(t, n, o), o;
};
let Nt = class extends Te {
  constructor() {
    super(...arguments), this.mode = "create", this.existingName = "", this.existingNames = [], this.busy = !1, this._name = "", this._description = "", this._error = null, this._onSave = () => {
      this.busy || this._validate() && this.dispatchEvent(
        new CustomEvent("dialog-save", {
          detail: { name: this._name.trim(), description: this._description.trim() },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._onCancel = () => {
      this.busy || this.dispatchEvent(new CustomEvent("dialog-cancel", { bubbles: !0, composed: !0 }));
    }, this._onKey = (e) => {
      e.key === "Enter" ? (e.preventDefault(), this._onSave()) : e.key === "Escape" && (e.preventDefault(), this._onCancel());
    };
  }
  willUpdate(e) {
    (e.has("mode") || e.has("existingName")) && (this._name = this.mode === "rename" ? this.existingName : "", this._description = "", this._error = null);
  }
  updated(e) {
    (e.has("mode") || e.has("existingName")) && queueMicrotask(() => {
      this._nameInput?.focus(), this._nameInput?.select();
    });
  }
  _validate() {
    const e = this._name.trim();
    return e ? this.existingNames.some(
      (n) => n === e && !(this.mode === "rename" && n === this.existingName)
    ) ? (this._error = `Profile ${e} already exists.`, !1) : (this._error = null, !0) : (this._error = "Name cannot be empty.", !1);
  }
  _heading() {
    return this.mode === "create" ? "New profile" : this.mode === "clone" ? "Clone profile" : "Rename profile";
  }
  render() {
    return v`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? v`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
      <label>
        Name
        <input
          name="name"
          type="text"
          autocomplete="off"
          spellcheck="false"
          maxlength="64"
          .value=${this._name}
          @input=${(e) => this._name = e.target.value}
          @keydown=${this._onKey}
        />
      </label>
      ${this.mode !== "rename" ? v`<label>
            Description (optional)
            <input
              name="description"
              type="text"
              autocomplete="off"
              spellcheck="false"
              maxlength="256"
              .value=${this._description}
              @input=${(e) => this._description = e.target.value}
              @keydown=${this._onKey}
            />
          </label>` : null}
      ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        <button class="button secondary" ?disabled=${this.busy} @click=${this._onCancel}>
          Cancel
        </button>
        <button class="button primary" ?disabled=${this.busy} @click=${this._onSave}>
          ${this.busy ? "Saving…" : "Save"}
        </button>
      </div>
    `;
  }
};
Nt.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--cb-text-primary);
        border-radius: var(--cb-radius-card);
        /* color-scheme: light dark inherited from tokens. */
      }
      h3 {
        margin: 0 0 var(--cb-gap-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      .source {
        margin: 0 0 var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-primary);
      }
      input {
        font: inherit;
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--cb-text-primary);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
      }
      input::placeholder {
        color: var(--cb-text-secondary);
        opacity: 1;
      }
      input:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      .error {
        color: var(--error-color, #b71c1c);
        font-size: 12px;
        margin-bottom: var(--cb-gap-sm);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target for the action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
        font-size: 13px;
      }
      .button.primary {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #ffffff);
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
    `
];
sn([
  P({ type: String })
], Nt.prototype, "mode", 2);
sn([
  P({ type: String })
], Nt.prototype, "existingName", 2);
sn([
  P({ type: Array })
], Nt.prototype, "existingNames", 2);
sn([
  P({ type: Boolean })
], Nt.prototype, "busy", 2);
sn([
  q()
], Nt.prototype, "_name", 2);
sn([
  q()
], Nt.prototype, "_description", 2);
sn([
  q()
], Nt.prototype, "_error", 2);
sn([
  Di('input[name="name"]')
], Nt.prototype, "_nameInput", 2);
Nt = sn([
  Ie("profile-edit-dialog")
], Nt);
var Rh = Object.defineProperty, Bh = Object.getOwnPropertyDescriptor, qn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Bh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Rh(t, n, o), o;
};
let nn = class extends Te {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._busy = !1, this._menuOpenedByKeyboard = !1, this._dialogTrigger = null, this._onDocumentClick = (e) => {
      if (this._openMenu === null) return;
      e.composedPath().some(
        (i) => i instanceof HTMLElement && (i.classList?.contains("menu") || i.classList?.contains("overflow"))
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._busy || (this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog());
    }, this._onDialogSave = async (e) => {
      if (!this.hass || this._busy) return;
      const { name: t, description: n } = e.detail, i = this._mode, o = this._target;
      this._busy = !0, this._error = null;
      try {
        if (i === "create")
          await Yu(this.hass, { name: t, description: n });
        else if (i === "clone" && o)
          await qu(this.hass, { source: o, target: t, description: n });
        else if (i === "rename" && o)
          t !== o && await Zu(this.hass, { old: o, new: t });
        else
          return;
        this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
      } catch (s) {
        this._error = s instanceof Error ? s.message : "Failed to save profile.";
      } finally {
        this._busy = !1;
      }
    }, this._onConfirmDelete = async () => {
      if (!this.hass || !this._target || this._busy) return;
      const e = this._target;
      this._busy = !0, this._error = null;
      try {
        await Ju(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
      } catch (t) {
        this._error = t instanceof Error ? t.message : "Failed to delete profile.";
      } finally {
        this._busy = !1;
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._onDocumentClick, !0);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this._onDocumentClick, !0), super.disconnectedCallback();
  }
  updated(e) {
    e.has("_openMenu") && this._openMenu !== null && this._menuOpenedByKeyboard && requestAnimationFrame(() => {
      !this._menuOpenedByKeyboard || this._openMenu === null || this.shadowRoot?.querySelector('.menu button[role="menuitem"]:not([disabled])')?.focus();
    }), e.has("_mode") && this._mode === "confirm-delete" && requestAnimationFrame(() => {
      this.shadowRoot?.querySelector(".confirm-delete")?.focus();
    });
  }
  _readState() {
    if (!this.hass) return null;
    const e = co(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!Fo(t)) return null;
    const n = t.attributes.options, i = Array.isArray(n) ? n.filter((g) => typeof g == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, a = typeof s == "string" && !!s, u = a ? s : "home", h = t.attributes.descriptions, f = {};
    if (h && typeof h == "object" && !Array.isArray(h))
      for (const [g, m] of Object.entries(h))
        typeof m == "string" && (f[g] = m);
    return { options: i, active: o, defaultProfile: u, descriptions: f, crudAvailable: a };
  }
  _onSelect(e) {
    this.hass && Ku(this.hass, { profile: e });
  }
  _toggleMenu(e, t) {
    t.stopPropagation(), this._menuOpenedByKeyboard = this._openMenu !== e && t instanceof MouseEvent && t.detail === 0, this._openMenu = this._openMenu === e ? null : e;
  }
  /** Keyboard navigation inside the open overflow menu — Escape closes,
   *  ArrowUp/ArrowDown moves focus, satisfying ARIA's `role="menu"` contract. */
  _onMenuKeydown(e, t) {
    if (e.key === "Tab") {
      this._openMenu = null, this._menuOpenedByKeyboard = !1;
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault(), e.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1, requestAnimationFrame(() => {
        const a = this.shadowRoot?.querySelectorAll("li[data-profile]");
        (a ? Array.from(a).find((h) => h.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
      });
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault(), e.stopPropagation();
    const n = Array.from(
      e.currentTarget.querySelectorAll(
        'button[role="menuitem"]:not([disabled])'
      )
    );
    if (n.length === 0) return;
    const i = this.shadowRoot?.activeElement, o = i ? n.indexOf(i) : -1;
    (e.key === "ArrowDown" ? n[(o + 1) % n.length] : n[(o - 1 + n.length) % n.length]).focus();
  }
  _onNew() {
    this._error = null, this._target = null, this._dialogTrigger = "__new__", this._mode = "create";
  }
  _onClone(e) {
    this._error = null, this._openMenu = null, this._target = e, this._dialogTrigger = e, this._mode = "clone";
  }
  _onRename(e) {
    this._error = null, this._openMenu = null, this._target = e, this._dialogTrigger = e, this._mode = "rename";
  }
  _onDelete(e) {
    this._error = null, this._openMenu = null, this._target = e, this._dialogTrigger = e, this._mode = "confirm-delete";
  }
  /** Restore focus to the element that opened the dialog. Called when
   *  the dialog dismisses (cancel or successful save). Best-effort —
   *  silently no-ops if the trigger element has been removed from the
   *  DOM (e.g. delete succeeded and the row is gone). */
  _restoreFocusAfterDialog() {
    const e = this._dialogTrigger;
    this._dialogTrigger = null, e !== null && requestAnimationFrame(() => {
      if (e === "__new__") {
        this.shadowRoot?.querySelector(".new-profile")?.focus();
        return;
      }
      const t = this.shadowRoot?.querySelectorAll("li[data-profile]");
      (t ? Array.from(t).find((i) => i.dataset.profile === e) : void 0)?.querySelector(".overflow")?.focus();
    });
  }
  render() {
    if (!this.hass) return T;
    const e = this._readState();
    if (e === null)
      return gr(this.hass) ? v`<div class="empty">
            Profiles aren't available right now. If the Comfort Band Profiles entry or its active
            profile entity is disabled, turn it back on under Settings → Devices &amp; Services.
          </div>` : v`<div class="empty">
            No profiles set up. Profiles are named sets of schedules, such as Home and Away, that
            every room switches between together. To use them, add Comfort Band again under Settings
            → Devices &amp; Services and choose “Set up profile manager”.
          </div>`;
    const { options: t, active: n, defaultProfile: i, descriptions: o, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return v`
        ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
        <profile-edit-dialog
          .mode=${this._mode}
          .existingName=${this._target ?? ""}
          .existingNames=${t}
          .busy=${this._busy}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
        ></profile-edit-dialog>
      `;
    if (this._mode === "confirm-delete" && this._target) {
      const a = this._target === n;
      return v`
        <div
          class="confirm-delete"
          @keydown=${(u) => {
        u.key === "Escape" && !this._busy && (u.preventDefault(), this._onDialogCancel());
      }}
          tabindex="-1"
        >
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${" "}
            ${a ? v`This profile is active — deleting will switch to
                  <strong>${i}</strong>.` : ""}
          </p>
          ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
          <div class="confirm-actions">
            <button class="button secondary" ?disabled=${this._busy} @click=${this._onDialogCancel}>
              Cancel
            </button>
            <button class="button danger" ?disabled=${this._busy} @click=${this._onConfirmDelete}>
              ${this._busy ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      `;
    }
    return t.length === 0 ? v`<div class="empty">No profiles configured.</div>` : v`
      ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? v`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : T}
      <ul aria-label="Profiles">
        ${t.map(
      (a, u) => this._renderRow(a, u, n, i, o, s)
    )}
      </ul>
      ${s ? T : v`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, n, i, o, s) {
    const a = e === n, u = e === i, h = o[e] ?? "", f = `cb-profile-menu-${t}`;
    return v`
      <li
        data-profile=${e}
        tabindex="0"
        class=${a ? "active" : ""}
        aria-current=${a ? "true" : T}
        @click=${() => this._onSelect(e)}
        @keydown=${(g) => {
      if (g.key === "Escape" && this._openMenu !== null) {
        g.preventDefault(), g.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1;
        return;
      }
      g.target === g.currentTarget && (g.key === "Enter" || g.key === " ") && (g.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${h ? v`<span class="description">${h}</span>` : T}
        </span>
        ${a ? v`<span class="badge">Active</span>` : T}
        ${s ? v`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? f : T}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(g) => this._toggleMenu(e, g)}
            >
              ⋮
            </button>` : T}
        ${this._openMenu === e ? v`
              <div
                id=${f}
                class="menu"
                role="menu"
                @click=${(g) => g.stopPropagation()}
                @keydown=${(g) => this._onMenuKeydown(g, e)}
              >
                <button
                  role="menuitem"
                  @click=${(g) => {
      g.stopPropagation(), this._onClone(e);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(g) => {
      g.stopPropagation(), this._onRename(e);
    }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${u}
                  aria-disabled=${u}
                  @click=${(g) => {
      g.stopPropagation(), u || this._onDelete(e);
    }}
                  title=${u ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : T}
      </li>
    `;
  }
};
nn.styles = [
  Ue,
  De`
      /* Inside the Advanced tab's section, which does the padding. */
      :host {
        display: block;
      }
      .empty {
        color: var(--cb-text-secondary);
        font-size: 13px;
        line-height: 1.4;
      }
      .upgrade-hint {
        margin: var(--cb-gap-md) 0 0;
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
      }
      .upgrade-hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
      .error {
        color: var(--error-color, #b71c1c);
        font-size: 12px;
        margin: 0 0 var(--cb-gap-sm);
      }
      .new-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        margin-bottom: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: transparent;
        border: 1px dashed var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }
      .new-profile:hover {
        background: var(--cb-track-bg);
      }
      .new-profile:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--cb-gap-sm);
      }
      li {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--cb-track-bg);
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      li.active {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
      }
      li:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .label {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
      }
      .name {
        font-weight: 500;
        /* Display names verbatim — user-defined profiles may use
         * intentional casing ("HomeOffice", "off-peak"). The CSS
         * capitalize transform we used in v0.1 only worked when all
         * names were built-in lowercase. */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .description {
        font-size: 11px;
        opacity: 0.75;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .badge {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.85;
      }
      .overflow {
        font: inherit;
        background: transparent;
        border: none;
        cursor: pointer;
        /* WCAG 2.5.5: 44×44 minimum touch target. */
        min-width: 44px;
        min-height: 44px;
        padding: 0 8px;
        border-radius: var(--cb-radius-pill);
        color: inherit;
        opacity: 0.7;
        font-size: 18px;
        line-height: 1;
      }
      .overflow:hover {
        opacity: 1;
      }
      .overflow:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
        opacity: 1;
      }
      .menu {
        position: absolute;
        top: calc(100% - 4px);
        /* inset-inline-end (not "right") flips correctly under RTL layouts. */
        inset-inline-end: var(--cb-gap-md);
        z-index: 5;
        min-width: 140px;
        padding: 4px;
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--cb-text-primary);
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: var(--cb-radius-card);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
      }
      .menu button {
        background: transparent;
        border: none;
        text-align: left;
        font: inherit;
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        color: var(--cb-text-primary);
      }
      .menu button:hover:not([disabled]) {
        background: var(--cb-track-bg);
      }
      .menu button:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        /* Inset so the ring doesn't clip the menu's border-radius. */
        outline-offset: -2px;
      }
      .menu button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .menu button.danger:not([disabled]) {
        color: var(--error-color, #b71c1c);
      }
      .confirm-delete {
        padding: var(--cb-gap-md);
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--cb-text-primary);
        border-radius: var(--cb-radius-card);
      }
      .confirm-delete h3 {
        margin: 0 0 var(--cb-gap-sm);
        font-size: 14px;
      }
      .confirm-delete p {
        margin: 0 0 var(--cb-gap-md);
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        /* WCAG 2.5.5: 44×44 minimum touch target on action buttons. */
        min-height: 44px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        cursor: pointer;
        font-size: 13px;
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `
];
qn([
  P({ attribute: !1 })
], nn.prototype, "hass", 2);
qn([
  q()
], nn.prototype, "_mode", 2);
qn([
  q()
], nn.prototype, "_target", 2);
qn([
  q()
], nn.prototype, "_openMenu", 2);
qn([
  q()
], nn.prototype, "_error", 2);
qn([
  q()
], nn.prototype, "_busy", 2);
nn = qn([
  Ie("comfort-band-profiles-tab")
], nn);
const jh = !0, Oe = "u-", Ih = "uplot", Uh = Oe + "hz", Wh = Oe + "vt", Vh = Oe + "title", Gh = Oe + "wrap", Kh = Oe + "under", Yh = Oe + "over", qh = Oe + "axis", In = Oe + "off", Zh = Oe + "select", Jh = Oe + "cursor-x", Qh = Oe + "cursor-y", Xh = Oe + "cursor-pt", ed = Oe + "legend", td = Oe + "live", nd = Oe + "inline", id = Oe + "series", od = Oe + "marker", Na = Oe + "label", sd = Oe + "value", Qi = "width", Xi = "height", Yi = "top", za = "bottom", _i = "left", Ls = "right", br = "#000", Oa = br + "0", Fs = "mousemove", La = "mousedown", Hs = "mouseup", Fa = "mouseenter", Ha = "mouseleave", Ra = "dblclick", rd = "resize", ad = "scroll", Ba = "change", Ro = "dppxchange", _r = "--", Pi = typeof window < "u", qs = Pi ? document : null, xi = Pi ? window : null, ld = Pi ? navigator : null;
let ce, Do;
function Zs() {
  let e = devicePixelRatio;
  ce != e && (ce = e, Do && Qs(Ba, Do, Zs), Do = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Wn(Ba, Do, Zs), xi.dispatchEvent(new CustomEvent(Ro)));
}
function dt(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function Js(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function ye(e, t, n) {
  e.style[t] = n + "px";
}
function Dt(e, t, n, i) {
  let o = qs.createElement(e);
  return t != null && dt(o, t), n?.insertBefore(o, i), o;
}
function xt(e, t) {
  return Dt("div", e, t);
}
const ja = /* @__PURE__ */ new WeakMap();
function Ut(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", a = ja.get(e);
  s != a && (e.style.transform = s, ja.set(e, s), t < 0 || n < 0 || t > i || n > o ? dt(e, In) : Js(e, In));
}
const Ia = /* @__PURE__ */ new WeakMap();
function Ua(e, t, n) {
  let i = t + n, o = Ia.get(e);
  i != o && (Ia.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const Wa = /* @__PURE__ */ new WeakMap();
function Va(e, t, n, i) {
  let o = t + "" + n, s = Wa.get(e);
  o != s && (Wa.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const vr = { passive: !0 }, cd = { ...vr, capture: !0 };
function Wn(e, t, n, i) {
  t.addEventListener(e, n, i ? cd : vr);
}
function Qs(e, t, n, i) {
  t.removeEventListener(e, n, vr);
}
Pi && Zs();
function Mt(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : ft((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function Vl(e) {
  return (n, i, o) => {
    let s = -1, a = -1;
    for (let u = i; u <= o; u++)
      if (e(n[u])) {
        s = u;
        break;
      }
    for (let u = o; u >= i; u--)
      if (e(n[u])) {
        a = u;
        break;
      }
    return [s, a];
  };
}
const Gl = (e) => e != null, Kl = (e) => e != null && e > 0, Yo = Vl(Gl), ud = Vl(Kl);
function hd(e, t, n, i = 0, o = !1) {
  let s = o ? ud : Yo, a = o ? Kl : Gl;
  [t, n] = s(e, t, n);
  let u = e[t], h = e[t];
  if (t > -1)
    if (i == 1)
      u = e[t], h = e[n];
    else if (i == -1)
      u = e[n], h = e[t];
    else
      for (let f = t; f <= n; f++) {
        let g = e[f];
        a(g) && (g < u ? u = g : g > h && (h = g));
      }
  return [u ?? pe, h ?? -pe];
}
function qo(e, t, n, i) {
  let o = Ya(e), s = Ya(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let a = n == 10 ? Xt : Yl, u = o == 1 ? ft : $t, h = s == 1 ? $t : ft, f = u(a(ze(e))), g = h(a(ze(t))), m = Si(n, f), _ = Si(n, g);
  return n == 10 && (f < 0 && (m = me(m, -f)), g < 0 && (_ = me(_, -g))), i || n == 2 ? (e = m * o, t = _ * s) : (e = Ql(e, m), t = Zo(t, _)), [e, t];
}
function yr(e, t, n, i) {
  let o = qo(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const wr = 0.1, Ga = {
  mode: 3,
  pad: wr
}, io = {
  pad: 0,
  soft: null,
  mode: 0
}, dd = {
  min: io,
  max: io
};
function Bo(e, t, n, i) {
  return Jo(n) ? Ka(e, t, n) : (io.pad = n, io.soft = i ? 0 : null, io.mode = i ? 3 : 0, Ka(e, t, dd));
}
function ae(e, t) {
  return e ?? t;
}
function fd(e, t, n) {
  for (t = ae(t, 0), n = ae(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Ka(e, t, n) {
  let i = n.min, o = n.max, s = ae(i.pad, 0), a = ae(o.pad, 0), u = ae(i.hard, -pe), h = ae(o.hard, pe), f = ae(i.soft, pe), g = ae(o.soft, -pe), m = ae(i.mode, 0), _ = ae(o.mode, 0), $ = t - e, C = Xt($), O = et(ze(e), ze(t)), I = Xt(O), W = ze(I - C);
  ($ < 1e-24 || W > 10) && ($ = 0, (e == 0 || t == 0) && ($ = 1e-24, m == 2 && f != pe && (s = 0), _ == 2 && g != -pe && (a = 0)));
  let k = $ || O || 1e3, j = Xt(k), S = Si(10, ft(j)), Q = k * ($ == 0 ? e == 0 ? 0.1 : 1 : s), z = me(Ql(e - Q, S / 10), 24), X = e >= f && (m == 1 || m == 3 && z <= f || m == 2 && z >= f) ? f : pe, Y = et(u, z < X && e >= X ? X : Pt(X, z)), ne = k * ($ == 0 ? t == 0 ? 0.1 : 1 : a), K = me(Zo(t + ne, S / 10), 24), A = t <= g && (_ == 1 || _ == 3 && K >= g || _ == 2 && K <= g) ? g : -pe, J = Pt(h, K > A && t <= A ? A : et(A, K));
  return Y == J && Y == 0 && (J = 100), [Y, J];
}
const pd = new Intl.NumberFormat(Pi ? ld.language : "en-US"), xr = (e) => pd.format(e), pt = Math, zo = pt.PI, ze = pt.abs, ft = pt.floor, Ne = pt.round, $t = pt.ceil, Pt = pt.min, et = pt.max, Si = pt.pow, Ya = pt.sign, Xt = pt.log10, Yl = pt.log2, md = (e, t = 1) => pt.sinh(e) * t, Rs = (e, t = 1) => pt.asinh(e / t), pe = 1 / 0;
function qa(e) {
  return (Xt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function Xs(e, t, n) {
  return Pt(et(e, t), n);
}
function ql(e) {
  return typeof e == "function";
}
function ie(e) {
  return ql(e) ? e : () => e;
}
const gd = () => {
}, Zl = (e) => e, Jl = (e, t) => t, bd = (e) => null, Za = (e) => !0, Ja = (e, t) => e == t, _d = /\.\d*?(?=9{6,}|0{6,})/gm, Gn = (e) => {
  if (ec(e) || wn.has(e))
    return e;
  const t = `${e}`, n = t.match(_d);
  if (n == null)
    return e;
  let i = n[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Gn(o)}e${s}`;
  }
  return me(e, i);
};
function Bn(e, t) {
  return Gn(me(Gn(e / t)) * t);
}
function Zo(e, t) {
  return Gn($t(Gn(e / t)) * t);
}
function Ql(e, t) {
  return Gn(ft(Gn(e / t)) * t);
}
function me(e, t = 0) {
  if (ec(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Ne(i) / n;
}
const wn = /* @__PURE__ */ new Map();
function Xl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function uo(e, t, n, i) {
  let o = [], s = i.map(Xl);
  for (let a = t; a < n; a++) {
    let u = ze(a), h = me(Si(e, a), u);
    for (let f = 0; f < i.length; f++) {
      let g = e == 10 ? +`${i[f]}e${a}` : i[f] * h, m = (a >= 0 ? 0 : u) + (a >= s[f] ? 0 : s[f]), _ = e == 10 ? g : me(g, m);
      o.push(_), wn.set(_, m);
    }
  }
  return o;
}
const oo = {}, $r = [], Ai = [null, null], mn = Array.isArray, ec = Number.isInteger, vd = (e) => e === void 0;
function Qa(e) {
  return typeof e == "string";
}
function Jo(e) {
  let t = !1;
  if (e != null) {
    let n = e.constructor;
    t = n == null || n == Object;
  }
  return t;
}
function yd(e) {
  return e != null && typeof e == "object";
}
const wd = Object.getPrototypeOf(Uint8Array), tc = "__proto__";
function Ti(e, t = Jo) {
  let n;
  if (mn(e)) {
    let i = e.find((o) => o != null);
    if (mn(i) || t(i)) {
      n = Array(e.length);
      for (let o = 0; o < e.length; o++)
        n[o] = Ti(e[o], t);
    } else
      n = e.slice();
  } else if (e instanceof wd)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != tc && (n[i] = Ti(e[i], t));
  } else
    n = e;
  return n;
}
function Ee(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != tc && (Jo(e[o]) ? Ee(e[o], Ti(i[o])) : e[o] = Ti(i[o]));
  }
  return e;
}
const xd = 0, $d = 1, kd = 2;
function Sd(e, t, n) {
  for (let i = 0, o, s = -1; i < t.length; i++) {
    let a = t[i];
    if (a > s) {
      for (o = a - 1; o >= 0 && e[o] == null; )
        e[o--] = null;
      for (o = a + 1; o < n && e[o] == null; )
        e[s = o++] = null;
    }
  }
}
function Ad(e, t) {
  if (Ed(e)) {
    let a = e[0].slice();
    for (let u = 1; u < e.length; u++)
      a.push(...e[u].slice(1));
    return Dd(a[0]) || (a = Cd(a)), a;
  }
  let n = /* @__PURE__ */ new Set();
  for (let a = 0; a < e.length; a++) {
    let h = e[a][0], f = h.length;
    for (let g = 0; g < f; g++)
      n.add(h[g]);
  }
  let i = [Array.from(n).sort((a, u) => a - u)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let a = 0; a < o; a++)
    s.set(i[0][a], a);
  for (let a = 0; a < e.length; a++) {
    let u = e[a], h = u[0];
    for (let f = 1; f < u.length; f++) {
      let g = u[f], m = Array(o).fill(void 0), _ = t ? t[a][f] : $d, $ = [];
      for (let C = 0; C < g.length; C++) {
        let O = g[C], I = s.get(h[C]);
        O === null ? _ != xd && (m[I] = O, _ == kd && $.push(I)) : m[I] = O;
      }
      Sd(m, $, o), i.push(m);
    }
  }
  return i;
}
const Td = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Cd(e) {
  let t = e[0], n = t.length, i = Array(n);
  for (let s = 0; s < i.length; s++)
    i[s] = s;
  i.sort((s, a) => t[s] - t[a]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let a = e[s], u = Array(n);
    for (let h = 0; h < n; h++)
      u[h] = a[i[h]];
    o.push(u);
  }
  return o;
}
function Ed(e) {
  let t = e[0][0], n = t.length;
  for (let i = 1; i < e.length; i++) {
    let o = e[i][0];
    if (o.length != n)
      return !1;
    if (o != t) {
      for (let s = 0; s < n; s++)
        if (o[s] != t[s])
          return !1;
    }
  }
  return !0;
}
function Dd(e, t = 100) {
  const n = e.length;
  if (n <= 1)
    return !0;
  let i = 0, o = n - 1;
  for (; i <= o && e[i] == null; )
    i++;
  for (; o >= i && e[o] == null; )
    o--;
  if (o <= i)
    return !0;
  const s = et(1, ft((o - i + 1) / t));
  for (let a = e[i], u = i + s; u <= o; u += s) {
    const h = e[u];
    if (h != null) {
      if (h <= a)
        return !1;
      a = h;
    }
  }
  return !0;
}
const nc = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], ic = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function oc(e) {
  return e.slice(0, 3);
}
const Md = ic.map(oc), Pd = nc.map(oc), Nd = {
  MMMM: nc,
  MMM: Pd,
  WWWW: ic,
  WWW: Md
};
function qi(e) {
  return (e < 10 ? "0" : "") + e;
}
function zd(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Od = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => qi(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => qi(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => qi(e.getHours()),
  // 3
  H: (e) => e.getHours(),
  // 9 (12hr, unpadded)
  h: (e) => {
    let t = e.getHours();
    return t == 0 ? 12 : t > 12 ? t - 12 : t;
  },
  // AM
  AA: (e) => e.getHours() >= 12 ? "PM" : "AM",
  // am
  aa: (e) => e.getHours() >= 12 ? "pm" : "am",
  // a
  a: (e) => e.getHours() >= 12 ? "p" : "a",
  // 09
  mm: (e) => qi(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => qi(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => zd(e.getMilliseconds())
};
function kr(e, t) {
  t = t || Nd;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? Od[o[1]] : o[0]);
  return (s) => {
    let a = "";
    for (let u = 0; u < n.length; u++)
      a += typeof n[u] == "string" ? n[u] : n[u](s, t);
    return a;
  };
}
const Ld = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Fd(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ld ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const sc = (e) => e % 1 == 0, jo = [1, 2, 2.5, 5], Hd = uo(10, -32, 0, jo), rc = uo(10, 0, 32, jo), Rd = rc.filter(sc), jn = Hd.concat(rc), Sr = `
`, ac = "{YYYY}", Xa = Sr + ac, lc = "{M}/{D}", eo = Sr + lc, Mo = eo + "/{YY}", cc = "{aa}", Bd = "{h}:{mm}", yi = Bd + cc, el = Sr + yi, tl = ":{ss}", he = null;
function uc(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, a = o * 365, h = (e == 1 ? uo(10, 0, 3, jo).filter(sc) : uo(10, -3, 0, jo)).concat([
    // minute divisors (# of secs)
    t,
    t * 5,
    t * 10,
    t * 15,
    t * 30,
    // hour divisors (# of mins)
    n,
    n * 5,
    n * 10,
    n * 15,
    n * 30,
    // day divisors (# of hrs)
    i,
    i * 2,
    i * 3,
    i * 4,
    i * 6,
    i * 8,
    i * 12,
    // month divisors TODO: need more?
    o,
    o * 2,
    o * 3,
    o * 4,
    o * 5,
    o * 6,
    o * 7,
    o * 8,
    o * 9,
    o * 10,
    o * 15,
    // year divisors (# months, approx)
    s,
    s * 2,
    s * 3,
    s * 4,
    s * 6,
    // century divisors
    a,
    a * 2,
    a * 5,
    a * 10,
    a * 25,
    a * 50,
    a * 100
  ]);
  const f = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [a, ac, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", Xa, he, he, he, he, he, 1],
    [o, lc, Xa, he, he, he, he, he, 1],
    [i, "{h}" + cc, Mo, he, eo, he, he, he, 1],
    [n, yi, Mo, he, eo, he, he, he, 1],
    [t, tl, Mo + " " + yi, he, eo + " " + yi, he, el, he, 1],
    [e, tl + ".{fff}", Mo + " " + yi, he, eo + " " + yi, he, el, he, 1]
  ];
  function g(m) {
    return (_, $, C, O, I, W) => {
      let k = [], j = I >= a, S = I >= s && I < a, Q = m(C), z = me(Q * e, 3), X = Bs(Q.getFullYear(), j ? 0 : Q.getMonth(), S || j ? 1 : Q.getDate()), Y = me(X * e, 3);
      if (S || j) {
        let ne = S ? I / s : 0, K = j ? I / a : 0, A = z == Y ? z : me(Bs(X.getFullYear() + K, X.getMonth() + ne, 1) * e, 3), J = new Date(Ne(A / e)), L = J.getFullYear(), V = J.getMonth();
        for (let B = 0; A <= O; B++) {
          let oe = Bs(L + K * B, V + ne * B, 1), R = oe - m(me(oe * e, 3));
          A = me((+oe + R) * e, 3), A <= O && k.push(A);
        }
      } else {
        let ne = I >= o ? o : I, K = ft(C) - ft(z), A = Y + K + Zo(z - Y, ne);
        k.push(A);
        let J = m(A), L = J.getHours() + J.getMinutes() / n + J.getSeconds() / i, V = I / i, B = _.axes[$]._space, oe = W / B;
        for (; A = me(A + I, e == 1 ? 0 : 3), !(A > O); )
          if (V > 1) {
            let R = ft(me(L + V, 6)) % 24, se = m(A).getHours() - R;
            se > 1 && (se = -1), A -= se * i, L = (L + V) % 24;
            let de = k[k.length - 1];
            me((A - de) / I, 3) * oe >= 0.7 && k.push(A);
          } else
            k.push(A);
      }
      return k;
    };
  }
  return [
    h,
    f,
    g
  ];
}
const [jd, Id, Ud] = uc(1), [Wd, Vd, Gd] = uc(1e-3);
uo(2, -53, 53, [1]);
function nl(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function il(e, t) {
  return (n, i, o, s, a) => {
    let u = t.find((C) => a >= C[0]) || t[t.length - 1], h, f, g, m, _, $;
    return i.map((C) => {
      let O = e(C), I = O.getFullYear(), W = O.getMonth(), k = O.getDate(), j = O.getHours(), S = O.getMinutes(), Q = O.getSeconds(), z = I != h && u[2] || W != f && u[3] || k != g && u[4] || j != m && u[5] || S != _ && u[6] || Q != $ && u[7] || u[1];
      return h = I, f = W, g = k, m = j, _ = S, $ = Q, z(O);
    });
  };
}
function Kd(e, t) {
  let n = kr(t);
  return (i, o, s, a, u) => o.map((h) => n(e(h)));
}
function Bs(e, t, n) {
  return new Date(e, t, n);
}
function ol(e, t) {
  return t(e);
}
const Yd = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function sl(e, t) {
  return (n, i, o, s) => s == null ? _r : t(e(i));
}
function qd(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Zd(e, t) {
  return e.series[t].fill(e, t);
}
const Jd = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: gd,
  markers: {
    show: !0,
    width: 2,
    stroke: qd,
    fill: Zd,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Qd(e, t) {
  let n = e.cursor.points, i = xt(), o = n.size(e, t);
  ye(i, Qi, o), ye(i, Xi, o);
  let s = o / -2;
  ye(i, "marginLeft", s), ye(i, "marginTop", s);
  let a = n.width(e, t, o);
  return a && ye(i, "borderWidth", a), i;
}
function Xd(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function ef(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function tf(e, t) {
  return e.series[t].points.size;
}
const js = [0, 0];
function nf(e, t, n) {
  return js[0] = t, js[1] = n, js;
}
function Po(e, t, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == t) && n(o);
  };
}
function Is(e, t, n, i = !0) {
  return (o) => {
    (!i || o.target == t) && n(o);
  };
}
const of = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: nf,
  points: {
    one: !1,
    show: Qd,
    size: tf,
    width: 0,
    stroke: ef,
    fill: Xd
  },
  bind: {
    mousedown: Po,
    mouseup: Po,
    click: Po,
    // legend clicks, not .u-over clicks
    dblclick: Po,
    mousemove: Is,
    mouseleave: Is,
    mouseenter: Is
  },
  drag: {
    setScale: !0,
    x: !0,
    y: !1,
    dist: 0,
    uni: null,
    click: (e, t) => {
      t.stopPropagation(), t.stopImmediatePropagation();
    },
    _x: !1,
    _y: !1
  },
  focus: {
    dist: (e, t, n, i, o) => i - o,
    prox: -1,
    bias: 0
  },
  hover: {
    skip: [void 0],
    prox: null,
    bias: 0
  },
  left: -10,
  top: -10,
  idx: null,
  dataIdx: null,
  idxs: null,
  event: null
}, hc = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Ar = Ee({}, hc, {
  filter: Jl
}), dc = Ee({}, Ar, {
  size: 10
}), fc = Ee({}, hc, {
  show: !1
}), Tr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', pc = "bold " + Tr, mc = 1.5, rl = {
  show: !0,
  scale: "x",
  stroke: br,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: pc,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Ar,
  ticks: dc,
  border: fc,
  font: Tr,
  lineGap: mc,
  rotate: 0
}, sf = "Value", rf = "Time", al = {
  show: !0,
  scale: "x",
  auto: !1,
  sorted: 1,
  //	label: "Time",
  //	value: v => stamp(new Date(v * 1e3)),
  // internal caches
  min: pe,
  max: -pe,
  idxs: []
};
function af(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : xr(s));
}
function lf(e, t, n, i, o, s, a) {
  let u = [], h = wn.get(o) || 0;
  n = a ? n : me(Zo(n, o), h);
  for (let f = n; f <= i; f = me(f + o, h))
    u.push(Object.is(f, -0) ? 0 : f);
  return u;
}
function er(e, t, n, i, o, s, a) {
  const u = [], h = e.scales[e.axes[t].scale].log, f = h == 10 ? Xt : Yl, g = ft(f(n));
  o = Si(h, g), h == 10 && (o = jn[Mt(o, jn)]);
  let m = n, _ = o * h;
  h == 10 && (_ = jn[Mt(_, jn)]);
  do
    u.push(m), m = m + o, h == 10 && !wn.has(m) && (m = me(m, wn.get(o))), m >= _ && (o = m, _ = o * h, h == 10 && (_ = jn[Mt(_, jn)]));
  while (m <= i);
  return u;
}
function cf(e, t, n, i, o, s, a) {
  let h = e.scales[e.axes[t].scale].asinh, f = i > h ? er(e, t, et(h, n), i, o) : [h], g = i >= 0 && n <= 0 ? [0] : [];
  return (n < -h ? er(e, t, et(h, -i), -n, o) : [h]).reverse().map((_) => -_).concat(g, f);
}
const gc = /./, uf = /[12357]/, hf = /[125]/, ll = /1/, tr = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function df(e, t, n, i, o) {
  let s = e.axes[n], a = s.scale, u = e.scales[a], h = e.valToPos, f = s._space, g = h(10, a), m = h(9, a) - g >= f ? gc : h(7, a) - g >= f ? uf : h(5, a) - g >= f ? hf : ll;
  if (m == ll) {
    let _ = ze(h(1, a) - g);
    if (_ < f)
      return tr(t.slice().reverse(), u.distr, m, $t(f / _)).reverse();
  }
  return tr(t, u.distr, m, 1);
}
function ff(e, t, n, i, o) {
  let s = e.axes[n], a = s.scale, u = s._space, h = e.valToPos, f = ze(h(1, a) - h(2, a));
  return f < u ? tr(t.slice().reverse(), 3, gc, $t(u / f)).reverse() : t;
}
function pf(e, t, n, i) {
  return i == null ? _r : t == null ? "" : xr(t);
}
const cl = {
  show: !0,
  scale: "y",
  stroke: br,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: pc,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Ar,
  ticks: dc,
  border: fc,
  font: Tr,
  lineGap: mc,
  rotate: 0
};
function mf(e, t) {
  let n = 3 + (e || 1) * 2;
  return me(n * t, 3);
}
function gf(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), a = e.valToPos(o[i[1]], n, !0), u = ze(a - s), h = e.series[t], f = u / (h.points.space * ce);
  return i[1] - i[0] <= f;
}
const ul = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, bc = (e, t, n, i, o) => o, hl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: bc,
  alpha: 1,
  facets: [
    Ee({}, ul, { scale: "x" }),
    Ee({}, ul, { scale: "y" })
  ]
}, dl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: bc,
  alpha: 1,
  points: {
    show: gf,
    filter: null
    //  paths:
    //	stroke: "#000",
    //	fill: "#fff",
    //	width: 1,
    //	size: 10,
  },
  //	label: "Value",
  //	value: v => v,
  values: null,
  // internal caches
  min: pe,
  max: -pe,
  idxs: [],
  path: null,
  clip: null
};
function bf(e, t, n, i, o) {
  return n / 10;
}
const _c = {
  time: jh,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, _f = Ee({}, _c, {
  time: !1,
  ori: 1
}), fl = {};
function vc(e, t) {
  let n = fl[e];
  return n || (n = {
    key: e,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, a, u, h, f) {
      for (let g = 0; g < n.plots.length; g++)
        n.plots[g] != o && n.plots[g].pub(i, o, s, a, u, h, f);
    }
  }, e != null && (fl[e] = n)), n;
}
const Ci = 1, nr = 2;
function Zn(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, a = e.scales, u = e.bbox;
  let h = s[0], f = i == 2 ? s[1] : s[t], g = i == 2 ? a[o.facets[0].scale] : a[e.series[0].scale], m = i == 2 ? a[o.facets[1].scale] : a[o.scale], _ = u.left, $ = u.top, C = u.width, O = u.height, I = e.valToPosH, W = e.valToPosV;
  return g.ori == 0 ? n(
    o,
    h,
    f,
    g,
    m,
    I,
    W,
    _,
    $,
    C,
    O,
    Xo,
    Ni,
    ts,
    wc,
    $c
  ) : n(
    o,
    h,
    f,
    g,
    m,
    W,
    I,
    $,
    _,
    O,
    C,
    es,
    zi,
    Dr,
    xc,
    kc
  );
}
function Cr(e, t) {
  let n = 0, i = 0, o = ae(e.bands, $r);
  for (let s = 0; s < o.length; s++) {
    let a = o[s];
    a.series[0] == t ? n = a.dir : a.series[1] == t && (a.dir == 1 ? i |= 1 : i |= 2);
  }
  return [
    n,
    i == 1 ? -1 : (
      // neg only
      i == 2 ? 1 : (
        // pos only
        i == 3 ? 2 : (
          // both
          0
        )
      )
    )
  ];
}
function vf(e, t, n, i, o) {
  let s = e.mode, a = e.series[t], u = s == 2 ? a.facets[1].scale : a.scale, h = e.scales[u];
  return o == -1 ? h.min : o == 1 ? h.max : h.distr == 3 ? h.dir == 1 ? h.min : h.max : 0;
}
function en(e, t, n, i, o, s) {
  return Zn(e, t, (a, u, h, f, g, m, _, $, C, O, I) => {
    let W = a.pxRound;
    const k = f.dir * (f.ori == 0 ? 1 : -1), j = f.ori == 0 ? Ni : zi;
    let S, Q;
    k == 1 ? (S = n, Q = i) : (S = i, Q = n);
    let z = W(m(u[S], f, O, $)), X = W(_(h[S], g, I, C)), Y = W(m(u[Q], f, O, $)), ne = W(_(s == 1 ? g.max : g.min, g, I, C)), K = new Path2D(o);
    return j(K, Y, ne), j(K, z, ne), j(K, z, X), K;
  });
}
function Qo(e, t, n, i, o, s) {
  let a = null;
  if (e.length > 0) {
    a = new Path2D();
    const u = t == 0 ? ts : Dr;
    let h = n;
    for (let m = 0; m < e.length; m++) {
      let _ = e[m];
      if (_[1] > _[0]) {
        let $ = _[0] - h;
        $ > 0 && u(a, h, i, $, i + s), h = _[1];
      }
    }
    let f = n + o - h, g = 10;
    f > 0 && u(a, h, i - g / 2, f, i + s + g);
  }
  return a;
}
function yf(e, t, n) {
  let i = e[e.length - 1];
  i && i[0] == t ? i[1] = n : e.push([t, n]);
}
function Er(e, t, n, i, o, s, a) {
  let u = [], h = e.length;
  for (let f = o == 1 ? n : i; f >= n && f <= i; f += o)
    if (t[f] === null) {
      let m = f, _ = f;
      if (o == 1)
        for (; ++f <= i && t[f] === null; )
          _ = f;
      else
        for (; --f >= n && t[f] === null; )
          _ = f;
      let $ = s(e[m]), C = _ == m ? $ : s(e[_]), O = m - o;
      $ = a <= 0 && O >= 0 && O < h ? s(e[O]) : $;
      let W = _ + o;
      C = a >= 0 && W >= 0 && W < h ? s(e[W]) : C, C >= $ && u.push([$, C]);
    }
  return u;
}
function pl(e) {
  return e == 0 ? Zl : e == 1 ? Ne : (t) => Bn(t, e);
}
function yc(e) {
  let t = e == 0 ? Xo : es, n = e == 0 ? (o, s, a, u, h, f) => {
    o.arcTo(s, a, u, h, f);
  } : (o, s, a, u, h, f) => {
    o.arcTo(a, s, h, u, f);
  }, i = e == 0 ? (o, s, a, u, h) => {
    o.rect(s, a, u, h);
  } : (o, s, a, u, h) => {
    o.rect(a, s, h, u);
  };
  return (o, s, a, u, h, f = 0, g = 0) => {
    f == 0 && g == 0 ? i(o, s, a, u, h) : (f = Pt(f, u / 2, h / 2), g = Pt(g, u / 2, h / 2), t(o, s + f, a), n(o, s + u, a, s + u, a + h, f), n(o, s + u, a + h, s, a + h, g), n(o, s, a + h, s, a, g), n(o, s, a, s + u, a, f), o.closePath());
  };
}
const Xo = (e, t, n) => {
  e.moveTo(t, n);
}, es = (e, t, n) => {
  e.moveTo(n, t);
}, Ni = (e, t, n) => {
  e.lineTo(t, n);
}, zi = (e, t, n) => {
  e.lineTo(n, t);
}, ts = yc(0), Dr = yc(1), wc = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, xc = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, $c = (e, t, n, i, o, s, a) => {
  e.bezierCurveTo(t, n, i, o, s, a);
}, kc = (e, t, n, i, o, s, a) => {
  e.bezierCurveTo(n, t, o, i, a, s);
};
function Sc(e) {
  return (t, n, i, o, s) => Zn(t, n, (a, u, h, f, g, m, _, $, C, O, I) => {
    let { pxRound: W, points: k } = a, j, S;
    f.ori == 0 ? (j = Xo, S = wc) : (j = es, S = xc);
    const Q = me(k.width * ce, 3);
    let z = (k.size - k.width) / 2 * ce, X = me(z * 2, 3), Y = new Path2D(), ne = new Path2D(), { left: K, top: A, width: J, height: L } = t.bbox;
    ts(
      ne,
      K - X,
      A - X,
      J + X * 2,
      L + X * 2
    );
    const V = (B) => {
      if (h[B] != null) {
        let oe = W(m(u[B], f, O, $)), R = W(_(h[B], g, I, C));
        j(Y, oe + z, R), S(Y, oe, R, z, 0, zo * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let B = i; B <= o; B++)
        V(B);
    return {
      stroke: Q > 0 ? Y : null,
      fill: Y,
      clip: ne,
      flags: Ci | nr
    };
  });
}
function Ac(e) {
  return (t, n, i, o, s, a) => {
    i != o && (s != i && a != i && e(t, n, i), s != o && a != o && e(t, n, o), e(t, n, a));
  };
}
const wf = Ac(Ni), xf = Ac(zi);
function Tc(e) {
  const t = ae(e?.alignGaps, 0);
  return (n, i, o, s) => Zn(n, i, (a, u, h, f, g, m, _, $, C, O, I) => {
    [o, s] = Yo(h, o, s);
    let W = a.pxRound, k = (L) => W(m(L, f, O, $)), j = (L) => W(_(L, g, I, C)), S, Q;
    f.ori == 0 ? (S = Ni, Q = wf) : (S = zi, Q = xf);
    const z = f.dir * (f.ori == 0 ? 1 : -1), X = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Ci }, Y = X.stroke;
    let ne = !1;
    if (s - o >= O * 4) {
      let L = (F) => n.posToVal(F, f.key, !0), V = null, B = null, oe, R, nt, we = k(u[z == 1 ? o : s]), se = k(u[o]), de = k(u[s]), ee = L(z == 1 ? se + 1 : de - 1);
      for (let F = z == 1 ? o : s; F >= o && F <= s; F += z) {
        let Me = u[F], xe = (z == 1 ? Me < ee : Me > ee) ? we : k(Me), ue = h[F];
        xe == we ? ue != null ? (R = ue, V == null ? (S(Y, xe, j(R)), oe = V = B = R) : R < V ? V = R : R > B && (B = R)) : ue === null && (ne = !0) : (V != null && Q(Y, we, j(V), j(B), j(oe), j(R)), ue != null ? (R = ue, S(Y, xe, j(R)), V = B = oe = R) : (V = B = null, ue === null && (ne = !0)), we = xe, ee = L(we + z));
      }
      V != null && V != B && nt != we && Q(Y, we, j(V), j(B), j(oe), j(R));
    } else
      for (let L = z == 1 ? o : s; L >= o && L <= s; L += z) {
        let V = h[L];
        V === null ? ne = !0 : V != null && S(Y, k(u[L]), j(V));
      }
    let [A, J] = Cr(n, i);
    if (a.fill != null || A != 0) {
      let L = X.fill = new Path2D(Y), V = a.fillTo(n, i, a.min, a.max, A), B = j(V), oe = k(u[o]), R = k(u[s]);
      z == -1 && ([R, oe] = [oe, R]), S(L, R, B), S(L, oe, B);
    }
    if (!a.spanGaps) {
      let L = [];
      ne && L.push(...Er(u, h, o, s, z, k, t)), X.gaps = L = a.gaps(n, i, o, s, L), X.clip = Qo(L, f.ori, $, C, O, I);
    }
    return J != 0 && (X.band = J == 2 ? [
      en(n, i, o, s, Y, -1),
      en(n, i, o, s, Y, 1)
    ] : en(n, i, o, s, Y, J)), X;
  });
}
function $f(e) {
  const t = ae(e.align, 1), n = ae(e.ascDesc, !1), i = ae(e.alignGaps, 0), o = ae(e.extend, !1);
  return (s, a, u, h) => Zn(s, a, (f, g, m, _, $, C, O, I, W, k, j) => {
    [u, h] = Yo(m, u, h);
    let S = f.pxRound, { left: Q, width: z } = s.bbox, X = (se) => S(C(se, _, k, I)), Y = (se) => S(O(se, $, j, W)), ne = _.ori == 0 ? Ni : zi;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Ci }, A = K.stroke, J = _.dir * (_.ori == 0 ? 1 : -1);
    let L = Y(m[J == 1 ? u : h]), V = X(g[J == 1 ? u : h]), B = V, oe = V;
    o && t == -1 && (oe = Q, ne(A, oe, L)), ne(A, V, L);
    for (let se = J == 1 ? u : h; se >= u && se <= h; se += J) {
      let de = m[se];
      if (de == null)
        continue;
      let ee = X(g[se]), F = Y(de);
      t == 1 ? ne(A, ee, L) : ne(A, B, F), ne(A, ee, F), L = F, B = ee;
    }
    let R = B;
    o && t == 1 && (R = Q + z, ne(A, R, L));
    let [nt, we] = Cr(s, a);
    if (f.fill != null || nt != 0) {
      let se = K.fill = new Path2D(A), de = f.fillTo(s, a, f.min, f.max, nt), ee = Y(de);
      ne(se, R, ee), ne(se, oe, ee);
    }
    if (!f.spanGaps) {
      let se = [];
      se.push(...Er(g, m, u, h, J, X, i));
      let de = f.width * ce / 2, ee = n || t == 1 ? de : -de, F = n || t == -1 ? -de : de;
      se.forEach((Me) => {
        Me[0] += ee, Me[1] += F;
      }), K.gaps = se = f.gaps(s, a, u, h, se), K.clip = Qo(se, _.ori, I, W, k, j);
    }
    return we != 0 && (K.band = we == 2 ? [
      en(s, a, u, h, A, -1),
      en(s, a, u, h, A, 1)
    ] : en(s, a, u, h, A, we)), K;
  });
}
function ml(e, t, n, i, o, s, a = pe) {
  if (e.length > 1) {
    let u = null;
    for (let h = 0, f = 1 / 0; h < e.length; h++)
      if (t[h] !== void 0) {
        if (u != null) {
          let g = ze(e[h] - e[u]);
          g < f && (f = g, a = ze(n(e[h], i, o, s) - n(e[u], i, o, s)));
        }
        u = h;
      }
  }
  return a;
}
function kf(e) {
  e = e || oo;
  const t = ae(e.size, [0.6, pe, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), a = 1 - t[0], u = ae(t[1], pe), h = ae(t[2], 1), f = ae(e.disp, oo), g = ae(e.each, ($) => {
  }), { fill: m, stroke: _ } = f;
  return ($, C, O, I) => Zn($, C, (W, k, j, S, Q, z, X, Y, ne, K, A) => {
    let J = W.pxRound, L = n, V = i * ce, B = u * ce, oe = h * ce, R, nt;
    S.ori == 0 ? [R, nt] = s($, C) : [nt, R] = s($, C);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let se = S.ori == 0 ? ts : Dr, de = S.ori == 0 ? g : (M, ge, Pe, ei, En, Ft, Dn) => {
      g(M, ge, Pe, En, ei, Dn, Ft);
    }, ee = ae($.bands, $r).find((M) => M.series[0] == C), F = ee != null ? ee.dir : 0, Me = W.fillTo($, C, W.min, W.max, F), qe = J(X(Me, Q, A, ne)), xe, ue, St, at = K, ke = J(W.width * ce), Lt = !1, Kt = null, mt = null, ln = null, Jn = null;
    m != null && (ke == 0 || _ != null) && (Lt = !0, Kt = m.values($, C, O, I), mt = /* @__PURE__ */ new Map(), new Set(Kt).forEach((M) => {
      M != null && mt.set(M, new Path2D());
    }), ke > 0 && (ln = _.values($, C, O, I), Jn = /* @__PURE__ */ new Map(), new Set(ln).forEach((M) => {
      M != null && Jn.set(M, new Path2D());
    })));
    let { x0: Qn, size: Hi } = f;
    if (Qn != null && Hi != null) {
      L = 1, k = Qn.values($, C, O, I), Qn.unit == 2 && (k = k.map((Pe) => $.posToVal(Y + Pe * K, S.key, !0)));
      let M = Hi.values($, C, O, I);
      Hi.unit == 2 ? ue = M[0] * K : ue = z(M[0], S, K, Y) - z(0, S, K, Y), at = ml(k, j, z, S, K, Y, at), St = at - ue + V;
    } else
      at = ml(k, j, z, S, K, Y, at), St = at * a + V, ue = at - St;
    St < 1 && (St = 0), ke >= ue / 2 && (ke = 0), St < 5 && (J = Zl);
    let go = St > 0, Tn = at - St - (go ? ke : 0);
    ue = J(Xs(Tn, oe, B)), xe = (L == 0 ? ue / 2 : L == we ? 0 : ue) - L * we * ((L == 0 ? V / 2 : 0) + (go ? ke / 2 : 0));
    const Ze = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Xn = Lt ? null : new Path2D();
    let Yt = null;
    if (ee != null)
      Yt = $.data[ee.series[1]];
    else {
      let { y0: M, y1: ge } = f;
      M != null && ge != null && (j = ge.values($, C, O, I), Yt = M.values($, C, O, I));
    }
    let Cn = R * ue, Z = nt * ue;
    for (let M = we == 1 ? O : I; M >= O && M <= I; M += we) {
      let ge = j[M];
      if (ge == null)
        continue;
      if (Yt != null) {
        let it = Yt[M] ?? 0;
        if (ge - it == 0)
          continue;
        qe = X(it, Q, A, ne);
      }
      let Pe = S.distr != 2 || f != null ? k[M] : M, ei = z(Pe, S, K, Y), En = X(ae(ge, Me), Q, A, ne), Ft = J(ei - xe), Dn = J(et(En, qe)), lt = J(Pt(En, qe)), gt = Dn - lt;
      if (ge != null) {
        let it = ge < 0 ? Z : Cn, At = ge < 0 ? Cn : Z;
        Lt ? (ke > 0 && ln[M] != null && se(Jn.get(ln[M]), Ft, lt + ft(ke / 2), ue, et(0, gt - ke), it, At), Kt[M] != null && se(mt.get(Kt[M]), Ft, lt + ft(ke / 2), ue, et(0, gt - ke), it, At)) : se(Xn, Ft, lt + ft(ke / 2), ue, et(0, gt - ke), it, At), de(
          $,
          C,
          M,
          Ft - ke / 2,
          lt,
          ue + ke,
          gt
        );
      }
    }
    return ke > 0 ? Ze.stroke = Lt ? Jn : Xn : Lt || (Ze._fill = W.width == 0 ? W._fill : W._stroke ?? W._fill, Ze.width = 0), Ze.fill = Lt ? mt : Xn, Ze;
  });
}
function Sf(e, t) {
  const n = ae(t?.alignGaps, 0);
  return (i, o, s, a) => Zn(i, o, (u, h, f, g, m, _, $, C, O, I, W) => {
    [s, a] = Yo(f, s, a);
    let k = u.pxRound, j = (R) => k(_(R, g, I, C)), S = (R) => k($(R, m, W, O)), Q, z, X;
    g.ori == 0 ? (Q = Xo, X = Ni, z = $c) : (Q = es, X = zi, z = kc);
    const Y = g.dir * (g.ori == 0 ? 1 : -1);
    let ne = j(h[Y == 1 ? s : a]), K = ne, A = [], J = [];
    for (let R = Y == 1 ? s : a; R >= s && R <= a; R += Y)
      if (f[R] != null) {
        let we = h[R], se = j(we);
        A.push(K = se), J.push(S(f[R]));
      }
    const L = { stroke: e(A, J, Q, X, z, k), fill: null, clip: null, band: null, gaps: null, flags: Ci }, V = L.stroke;
    let [B, oe] = Cr(i, o);
    if (u.fill != null || B != 0) {
      let R = L.fill = new Path2D(V), nt = u.fillTo(i, o, u.min, u.max, B), we = S(nt);
      X(R, K, we), X(R, ne, we);
    }
    if (!u.spanGaps) {
      let R = [];
      R.push(...Er(h, f, s, a, Y, j, n)), L.gaps = R = u.gaps(i, o, s, a, R), L.clip = Qo(R, g.ori, C, O, I, W);
    }
    return oe != 0 && (L.band = oe == 2 ? [
      en(i, o, s, a, V, -1),
      en(i, o, s, a, V, 1)
    ] : en(i, o, s, a, V, oe)), L;
  });
}
function Af(e) {
  return Sf(Tf, e);
}
function Tf(e, t, n, i, o, s) {
  const a = e.length;
  if (a < 2)
    return null;
  const u = new Path2D();
  if (n(u, e[0], t[0]), a == 2)
    i(u, e[1], t[1]);
  else {
    let h = Array(a), f = Array(a - 1), g = Array(a - 1), m = Array(a - 1);
    for (let _ = 0; _ < a - 1; _++)
      g[_] = t[_ + 1] - t[_], m[_] = e[_ + 1] - e[_], f[_] = g[_] / m[_];
    h[0] = f[0];
    for (let _ = 1; _ < a - 1; _++)
      f[_] === 0 || f[_ - 1] === 0 || f[_ - 1] > 0 != f[_] > 0 ? h[_] = 0 : (h[_] = 3 * (m[_ - 1] + m[_]) / ((2 * m[_] + m[_ - 1]) / f[_ - 1] + (m[_] + 2 * m[_ - 1]) / f[_]), isFinite(h[_]) || (h[_] = 0));
    h[a - 1] = f[a - 2];
    for (let _ = 0; _ < a - 1; _++)
      o(
        u,
        e[_] + m[_] / 3,
        t[_] + h[_] * m[_] / 3,
        e[_ + 1] - m[_] / 3,
        t[_ + 1] - h[_ + 1] * m[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return u;
}
const ir = /* @__PURE__ */ new Set();
function gl() {
  for (let e of ir)
    e.syncRect(!0);
}
Pi && (Wn(rd, xi, gl), Wn(ad, xi, gl, !0), Wn(Ro, xi, () => {
  Ye.pxRatio = ce;
}));
const Cf = Tc(), Ef = Sc();
function bl(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, a) => or(s, a, t, n));
}
function Df(e, t) {
  return e.map((n, i) => i == 0 ? {} : Ee({}, t, n));
}
function or(e, t, n, i) {
  return Ee({}, t == 0 ? n : i, e);
}
function Cc(e, t, n) {
  return t == null ? Ai : [t, n];
}
const Mf = Cc;
function Pf(e, t, n) {
  return t == null ? Ai : Bo(t, n, wr, !0);
}
function Ec(e, t, n, i) {
  return t == null ? Ai : qo(t, n, e.scales[i].log, !1);
}
const Nf = Ec;
function Dc(e, t, n, i) {
  return t == null ? Ai : yr(t, n, e.scales[i].log, !1);
}
const zf = Dc;
function Of(e, t, n, i, o) {
  let s = et(qa(e), qa(t)), a = t - e, u = Mt(o / i * a, n);
  do {
    let h = n[u], f = i * h / a;
    if (f >= o && s + (h < 5 ? wn.get(h) : 0) <= 17)
      return [h, f];
  } while (++u < n.length);
  return [0, 0];
}
function _l(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Ne((n = +o) * ce)) + "px"), [e, t, n];
}
function Lf(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let n = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, n + "px"), t[1] = n;
  });
}
function Ye(e, t, n) {
  const i = {
    mode: ae(e.mode, 1)
  }, o = i.mode;
  function s(r, l, c, d) {
    let p = l.valToPct(r);
    return d + c * (l.dir == -1 ? 1 - p : p);
  }
  function a(r, l, c, d) {
    let p = l.valToPct(r);
    return d + c * (l.dir == -1 ? p : 1 - p);
  }
  function u(r, l, c, d) {
    return l.ori == 0 ? s(r, l, c, d) : a(r, l, c, d);
  }
  i.valToPosH = s, i.valToPosV = a;
  let h = !1;
  i.status = 0;
  const f = i.root = xt(Ih);
  if (e.id != null && (f.id = e.id), dt(f, e.class), e.title) {
    let r = xt(Vh, f);
    r.textContent = e.title;
  }
  const g = Dt("canvas"), m = i.ctx = g.getContext("2d"), _ = xt(Gh, f);
  Wn("click", _, (r) => {
    r.target === C && (be != hi || $e != di) && Ve.click(i, r);
  }, !0);
  const $ = i.under = xt(Kh, _);
  _.appendChild(g);
  const C = i.over = xt(Yh, _);
  e = Ti(e);
  const O = +ae(e.pxAlign, 1), I = pl(O);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(i, e) || e);
  });
  const W = e.ms || 1e-3, k = i.series = o == 1 ? bl(e.series || [], al, dl, !1) : Df(e.series || [null], hl), j = i.axes = bl(e.axes || [], rl, cl, !0), S = i.scales = {}, Q = i.bands = e.bands || [];
  Q.forEach((r) => {
    r.fill = ie(r.fill || null), r.dir = ae(r.dir, -1);
  });
  const z = o == 2 ? k[1].facets[0].scale : k[0].scale, X = {
    axes: Gc,
    series: jc
  }, Y = (e.drawOrder || ["axes", "series"]).map((r) => X[r]);
  function ne(r) {
    const l = r.distr == 3 ? (c) => Xt(c > 0 ? c : r.clamp(i, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => Rs(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let d = l(c), { _min: p, _max: b } = r, y = b - p;
      return (d - p) / y;
    };
  }
  function K(r) {
    let l = S[r];
    if (l == null) {
      let c = (e.scales || oo)[r] || oo;
      if (c.from != null) {
        K(c.from);
        let d = Ee({}, S[c.from], c, { key: r });
        d.valToPct = ne(d), S[r] = d;
      } else {
        l = S[r] = Ee({}, r == z ? _c : _f, c), l.key = r;
        let d = l.time, p = l.range, b = mn(p);
        if ((r != z || o == 2 && !d) && (b && (p[0] == null || p[1] == null) && (p = {
          min: p[0] == null ? Ga : {
            mode: 1,
            hard: p[0],
            soft: p[0]
          },
          max: p[1] == null ? Ga : {
            mode: 1,
            hard: p[1],
            soft: p[1]
          }
        }, b = !1), !b && Jo(p))) {
          let y = p;
          p = (w, x, E) => x == null ? Ai : Bo(x, E, y);
        }
        l.range = ie(p || (d ? Mf : r == z ? l.distr == 3 ? Nf : l.distr == 4 ? zf : Cc : l.distr == 3 ? Ec : l.distr == 4 ? Dc : Pf)), l.auto = ie(b ? !1 : l.auto), l.clamp = ie(l.clamp || bf), l._min = l._max = null, l.valToPct = ne(l);
      }
    }
  }
  K("x"), K("y"), o == 1 && k.forEach((r) => {
    K(r.scale);
  }), j.forEach((r) => {
    K(r.scale);
  });
  for (let r in e.scales)
    K(r);
  const A = S[z], J = A.distr;
  let L, V;
  A.ori == 0 ? (dt(f, Uh), L = s, V = a) : (dt(f, Wh), L = a, V = s);
  const B = {};
  for (let r in S) {
    let l = S[r];
    (l.min != null || l.max != null) && (B[r] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const oe = e.tzDate || ((r) => new Date(Ne(r / W))), R = e.fmtDate || kr, nt = W == 1 ? Ud(oe) : Gd(oe), we = il(oe, nl(W == 1 ? Id : Vd, R)), se = sl(oe, ol(Yd, R)), de = [], ee = i.legend = Ee({}, Jd, e.legend), F = i.cursor = Ee({}, of, { drag: { y: o == 2 } }, e.cursor), Me = ee.show, qe = F.show, xe = ee.markers;
  ee.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, St, at, ke = [], Lt = [], Kt, mt = !1, ln = {};
  if (ee.live) {
    const r = k[1] ? k[1].values : null;
    mt = r != null, Kt = mt ? r(i, 1, 0) : { _: 0 };
    for (let l in Kt)
      ln[l] = _r;
  }
  if (Me)
    if (ue = Dt("table", ed, f), at = Dt("tbody", null, ue), ee.mount(i, ue), mt) {
      St = Dt("thead", null, ue, at);
      let r = Dt("tr", null, St);
      Dt("th", null, r);
      for (var Jn in Kt)
        Dt("th", Na, r).textContent = Jn;
    } else
      dt(ue, nd), ee.live && dt(ue, td);
  const Qn = { show: !0 }, Hi = { show: !1 };
  function go(r, l) {
    if (l == 0 && (mt || !ee.live || o == 2))
      return Ai;
    let c = [], d = Dt("tr", id, at, at.childNodes[l]);
    dt(d, r.class), r.show || dt(d, In);
    let p = Dt("th", null, d);
    if (xe.show) {
      let w = xt(od, p);
      if (l > 0) {
        let x = xe.width(i, l);
        x && (w.style.border = x + "px " + xe.dash(i, l) + " " + xe.stroke(i, l)), w.style.background = xe.fill(i, l);
      }
    }
    let b = xt(Na, p);
    r.label instanceof HTMLElement ? b.appendChild(r.label) : b.textContent = r.label, l > 0 && (xe.show || (b.style.color = r.width > 0 ? xe.stroke(i, l) : xe.fill(i, l)), Ze("click", p, (w) => {
      if (F._lock)
        return;
      Pn(w);
      let x = k.indexOf(r);
      if ((w.ctrlKey || w.metaKey) != ee.isolate) {
        let E = k.some((D, N) => N > 0 && N != x && D.show);
        k.forEach((D, N) => {
          N > 0 && Rt(N, E ? N == x ? Qn : Hi : Qn, !0, Ce.setSeries);
        });
      } else
        Rt(x, { show: !r.show }, !0, Ce.setSeries);
    }, !1), ni && Ze(Fa, p, (w) => {
      F._lock || (Pn(w), Rt(k.indexOf(r), pi, !0, Ce.setSeries));
    }, !1));
    for (var y in Kt) {
      let w = Dt("td", sd, d);
      w.textContent = "--", c.push(w);
    }
    return [d, c];
  }
  const Tn = /* @__PURE__ */ new Map();
  function Ze(r, l, c, d = !0) {
    const p = Tn.get(l) || {}, b = F.bind[r](i, l, c, d);
    b && (Wn(r, l, p[r] = b), Tn.set(l, p));
  }
  function Xn(r, l, c) {
    const d = Tn.get(l) || {};
    for (let p in d)
      (r == null || p == r) && (Qs(p, l, d[p]), delete d[p]);
    r == null && Tn.delete(l);
  }
  let Yt = 0, Cn = 0, Z = 0, M = 0, ge = 0, Pe = 0, ei = ge, En = Pe, Ft = Z, Dn = M, lt = 0, gt = 0, it = 0, At = 0;
  i.bbox = {};
  let os = !1, bo = !1, ti = !1, Mn = !1, _o = !1, bt = !1;
  function ss(r, l, c) {
    (c || r != i.width || l != i.height) && Nr(r, l), ai(!1), ti = !0, bo = !0, li();
  }
  function Nr(r, l) {
    i.width = Yt = Z = r, i.height = Cn = M = l, ge = Pe = 0, zc(), Oc();
    let c = i.bbox;
    lt = c.left = Bn(ge * ce, 0.5), gt = c.top = Bn(Pe * ce, 0.5), it = c.width = Bn(Z * ce, 0.5), At = c.height = Bn(M * ce, 0.5);
  }
  const Mc = 3;
  function Pc() {
    let r = !1, l = 0;
    for (; !r; ) {
      l++;
      let c = Wc(l), d = Vc(l);
      r = l == Mc || c && d, r || (Nr(i.width, i.height), bo = !0);
    }
  }
  function Nc({ width: r, height: l }) {
    ss(r, l);
  }
  i.setSize = Nc;
  function zc() {
    let r = !1, l = !1, c = !1, d = !1;
    j.forEach((p, b) => {
      if (p.show && p._show) {
        let { side: y, _size: w } = p, x = y % 2, E = p.label != null ? p.labelSize : 0, D = w + E;
        D > 0 && (x ? (Z -= D, y == 3 ? (ge += D, d = !0) : c = !0) : (M -= D, y == 0 ? (Pe += D, r = !0) : l = !0));
      }
    }), Nn[0] = r, Nn[1] = c, Nn[2] = l, Nn[3] = d, Z -= cn[1] + cn[3], ge += cn[3], M -= cn[2] + cn[0], Pe += cn[0];
  }
  function Oc() {
    let r = ge + Z, l = Pe + M, c = ge, d = Pe;
    function p(b, y) {
      switch (b) {
        case 1:
          return r += y, r - y;
        case 2:
          return l += y, l - y;
        case 3:
          return c -= y, c + y;
        case 0:
          return d -= y, d + y;
      }
    }
    j.forEach((b, y) => {
      if (b.show && b._show) {
        let w = b.side;
        b._pos = p(w, b._size), b.label != null && (b._lpos = p(w, b.labelSize));
      }
    });
  }
  if (F.dataIdx == null) {
    let r = F.hover, l = r.skip = new Set(r.skip ?? []);
    l.add(void 0);
    let c = r.prox = ie(r.prox), d = r.bias ??= 0;
    F.dataIdx = (p, b, y, w) => {
      if (b == 0)
        return y;
      let x = y, E = c(p, b, y, w) ?? pe, D = E >= 0 && E < pe, N = A.ori == 0 ? Z : M, G = F.left, le = t[0], re = t[b];
      if (l.has(re[y])) {
        x = null;
        let te = null, U = null, H;
        if (d == 0 || d == -1)
          for (H = y; te == null && H-- > 0; )
            l.has(re[H]) || (te = H);
        if (d == 0 || d == 1)
          for (H = y; U == null && H++ < re.length; )
            l.has(re[H]) || (U = H);
        if (te != null || U != null)
          if (D) {
            let ve = te == null ? -1 / 0 : L(le[te], A, N, 0), Se = U == null ? 1 / 0 : L(le[U], A, N, 0), je = G - ve, fe = Se - G;
            je <= fe ? je <= E && (x = te) : fe <= E && (x = U);
          } else
            x = U == null ? te : te == null ? U : y - te <= U - y ? te : U;
      } else D && ze(G - L(le[y], A, N, 0)) > E && (x = null);
      return x;
    };
  }
  const Pn = (r) => {
    F.event = r;
  };
  F.idxs = de, F._lock = !1;
  let Ke = F.points;
  Ke.show = ie(Ke.show), Ke.size = ie(Ke.size), Ke.stroke = ie(Ke.stroke), Ke.width = ie(Ke.width), Ke.fill = ie(Ke.fill);
  const Ht = i.focus = Ee({}, e.focus || { alpha: 0.3 }, F.focus), ni = Ht.prox >= 0, ii = ni && Ke.one;
  let _t = [], oi = [], si = [];
  function zr(r, l) {
    let c = Ke.show(i, l);
    if (c instanceof HTMLElement)
      return dt(c, Xh), dt(c, r.class), Ut(c, -10, -10, Z, M), C.insertBefore(c, _t[l]), c;
  }
  function Or(r, l) {
    if (o == 1 || l > 0) {
      let c = o == 1 && S[r.scale].time, d = r.value;
      r.value = c ? Qa(d) ? sl(oe, ol(d, R)) : d || se : d || pf, r.label = r.label || (c ? rf : sf);
    }
    if (ii || l > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Cf || bd, r.fillTo = ie(r.fillTo || vf), r.pxAlign = +ae(r.pxAlign, O), r.pxRound = pl(r.pxAlign), r.stroke = ie(r.stroke || null), r.fill = ie(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = mf(et(1, r.width), 1), d = r.points = Ee({}, {
        size: c,
        width: et(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Ef,
        _stroke: null,
        _fill: null
      }, r.points);
      d.show = ie(d.show), d.filter = ie(d.filter), d.fill = ie(d.fill), d.stroke = ie(d.stroke), d.paths = ie(d.paths), d.pxAlign = r.pxAlign;
    }
    if (Me) {
      let c = go(r, l);
      ke.splice(l, 0, c[0]), Lt.splice(l, 0, c[1]), ee.values.push(null);
    }
    if (qe) {
      de.splice(l, 0, null);
      let c = null;
      ii ? l == 0 && (c = zr(r, l)) : l > 0 && (c = zr(r, l)), _t.splice(l, 0, c), oi.splice(l, 0, 0), si.splice(l, 0, 0);
    }
    Be("addSeries", l);
  }
  function Lc(r, l) {
    l = l ?? k.length, r = o == 1 ? or(r, l, al, dl) : or(r, l, {}, hl), k.splice(l, 0, r), Or(k[l], l);
  }
  i.addSeries = Lc;
  function Fc(r) {
    if (k.splice(r, 1), Me) {
      ee.values.splice(r, 1), Lt.splice(r, 1);
      let l = ke.splice(r, 1)[0];
      Xn(null, l.firstChild), l.remove();
    }
    qe && (de.splice(r, 1), _t.splice(r, 1)[0].remove(), oi.splice(r, 1), si.splice(r, 1)), Be("delSeries", r);
  }
  i.delSeries = Fc;
  const Nn = [!1, !1, !1, !1];
  function Hc(r, l) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, d = S[r.scale];
      d == null && (r.scale = c ? k[1].scale : z, d = S[r.scale]);
      let p = d.time;
      r.size = ie(r.size), r.space = ie(r.space), r.rotate = ie(r.rotate), mn(r.incrs) && r.incrs.forEach((y) => {
        !wn.has(y) && wn.set(y, Xl(y));
      }), r.incrs = ie(r.incrs || (d.distr == 2 ? Rd : p ? W == 1 ? jd : Wd : jn)), r.splits = ie(r.splits || (p && d.distr == 1 ? nt : d.distr == 3 ? er : d.distr == 4 ? cf : lf)), r.stroke = ie(r.stroke), r.grid.stroke = ie(r.grid.stroke), r.ticks.stroke = ie(r.ticks.stroke), r.border.stroke = ie(r.border.stroke);
      let b = r.values;
      r.values = // static array of tick values
      mn(b) && !mn(b[0]) ? ie(b) : (
        // temporal
        p ? (
          // config array of fmtDate string tpls
          mn(b) ? il(oe, nl(b, R)) : (
            // fmtDate string tpl
            Qa(b) ? Kd(oe, b) : b || we
          )
        ) : b || af
      ), r.filter = ie(r.filter || (d.distr >= 3 && d.log == 10 ? df : d.distr == 3 && d.log == 2 ? ff : Jl)), r.font = _l(r.font), r.labelFont = _l(r.labelFont), r._size = r.size(i, null, l, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (Nn[l] = !0, r._el = xt(qh, _));
    }
  }
  function Ri(r, l, c, d) {
    let [p, b, y, w] = c, x = l % 2, E = 0;
    return x == 0 && (w || b) && (E = l == 0 && !p || l == 2 && !y ? Ne(rl.size / 3) : 0), x == 1 && (p || y) && (E = l == 1 && !b || l == 3 && !w ? Ne(cl.size / 2) : 0), E;
  }
  const Lr = i.padding = (e.padding || [Ri, Ri, Ri, Ri]).map((r) => ie(ae(r, Ri))), cn = i._padding = Lr.map((r, l) => r(i, l, Nn, 0));
  let We, Le = null, Fe = null;
  const vo = o == 1 ? k[0].idxs : null;
  let Tt = null, Bi = !1;
  function Fr(r, l) {
    if (t = r ?? [], i.data = i._data = t, o == 2) {
      We = 0;
      for (let c = 1; c < k.length; c++)
        We += t[c][0].length;
    } else {
      t.length == 0 && (i.data = i._data = t = [[]]), Tt = t[0], We = Tt.length;
      let c = t;
      if (J == 2) {
        c = t.slice();
        let d = c[0] = Array(We);
        for (let p = 0; p < We; p++)
          d[p] = p;
      }
      i._data = t = c;
    }
    if (ai(!0), Be("setData"), J == 2 && (ti = !0), l !== !1) {
      let c = A;
      c.auto(i, Bi) ? rs() : hn(z, c.min, c.max), Mn = Mn || F.left >= 0, bt = !0, li();
    }
  }
  i.setData = Fr;
  function rs() {
    Bi = !0;
    let r, l;
    o == 1 && (We > 0 ? (Le = vo[0] = 0, Fe = vo[1] = We - 1, r = t[0][Le], l = t[0][Fe], J == 2 ? (r = Le, l = Fe) : r == l && (J == 3 ? [r, l] = qo(r, r, A.log, !1) : J == 4 ? [r, l] = yr(r, r, A.log, !1) : A.time ? l = r + Ne(86400 / W) : [r, l] = Bo(r, l, wr, !0))) : (Le = vo[0] = r = null, Fe = vo[1] = l = null)), hn(z, r, l);
  }
  let yo, ri, as, ls, cs, us, hs, ds, fs, ot;
  function Hr(r, l, c, d, p, b) {
    r ??= Oa, c ??= $r, d ??= "butt", p ??= Oa, b ??= "round", r != yo && (m.strokeStyle = yo = r), p != ri && (m.fillStyle = ri = p), l != as && (m.lineWidth = as = l), b != cs && (m.lineJoin = cs = b), d != us && (m.lineCap = us = d), c != ls && m.setLineDash(ls = c);
  }
  function Rr(r, l, c, d) {
    l != ri && (m.fillStyle = ri = l), r != hs && (m.font = hs = r), c != ds && (m.textAlign = ds = c), d != fs && (m.textBaseline = fs = d);
  }
  function ps(r, l, c, d, p = 0) {
    if (d.length > 0 && r.auto(i, Bi) && (l == null || l.min == null)) {
      let b = ae(Le, 0), y = ae(Fe, d.length - 1), w = c.min == null ? hd(d, b, y, p, r.distr == 3) : [c.min, c.max];
      r.min = Pt(r.min, c.min = w[0]), r.max = et(r.max, c.max = w[1]);
    }
  }
  const Br = { min: null, max: null };
  function Rc() {
    for (let d in S) {
      let p = S[d];
      B[d] == null && // scales that have never been set (on init)
      (p.min == null || // or auto scales when the x scale was explicitly set
      B[z] != null && p.auto(i, Bi)) && (B[d] = Br);
    }
    for (let d in S) {
      let p = S[d];
      B[d] == null && p.from != null && B[p.from] != null && (B[d] = Br);
    }
    B[z] != null && ai(!0);
    let r = {};
    for (let d in B) {
      let p = B[d];
      if (p != null) {
        let b = r[d] = Ti(S[d], yd);
        if (p.min != null)
          Ee(b, p);
        else if (d != z || o == 2)
          if (We == 0 && b.from == null) {
            let y = b.range(i, null, null, d);
            b.min = y[0], b.max = y[1];
          } else
            b.min = pe, b.max = -pe;
      }
    }
    if (We > 0) {
      k.forEach((d, p) => {
        if (o == 1) {
          let b = d.scale, y = B[b];
          if (y == null)
            return;
          let w = r[b];
          if (p == 0) {
            let x = w.range(i, w.min, w.max, b);
            w.min = x[0], w.max = x[1], Le = Mt(w.min, t[0]), Fe = Mt(w.max, t[0]), Fe - Le > 1 && (t[0][Le] < w.min && Le++, t[0][Fe] > w.max && Fe--), d.min = Tt[Le], d.max = Tt[Fe];
          } else d.show && d.auto && ps(w, y, d, t[p], d.sorted);
          d.idxs[0] = Le, d.idxs[1] = Fe;
        } else if (p > 0 && d.show && d.auto) {
          let [b, y] = d.facets, w = b.scale, x = y.scale, [E, D] = t[p], N = r[w], G = r[x];
          N != null && ps(N, B[w], b, E, b.sorted), G != null && ps(G, B[x], y, D, y.sorted), d.min = y.min, d.max = y.max;
        }
      });
      for (let d in r) {
        let p = r[d], b = B[d];
        if (p.from == null && (b == null || b.min == null)) {
          let y = p.range(
            i,
            p.min == pe ? null : p.min,
            p.max == -pe ? null : p.max,
            d
          );
          p.min = y[0], p.max = y[1];
        }
      }
    }
    for (let d in r) {
      let p = r[d];
      if (p.from != null) {
        let b = r[p.from];
        if (b.min == null)
          p.min = p.max = null;
        else {
          let y = p.range(i, b.min, b.max, d);
          p.min = y[0], p.max = y[1];
        }
      }
    }
    let l = {}, c = !1;
    for (let d in r) {
      let p = r[d], b = S[d];
      if (b.min != p.min || b.max != p.max) {
        b.min = p.min, b.max = p.max;
        let y = b.distr;
        b._min = y == 3 ? Xt(b.min) : y == 4 ? Rs(b.min, b.asinh) : y == 100 ? b.fwd(b.min) : b.min, b._max = y == 3 ? Xt(b.max) : y == 4 ? Rs(b.max, b.asinh) : y == 100 ? b.fwd(b.max) : b.max, l[d] = c = !0;
      }
    }
    if (c) {
      k.forEach((d, p) => {
        o == 2 ? p > 0 && l.y && (d._paths = null) : l[d.scale] && (d._paths = null);
      });
      for (let d in l)
        ti = !0, Be("setScale", d);
      qe && F.left >= 0 && (Mn = bt = !0);
    }
    for (let d in B)
      B[d] = null;
  }
  function Bc(r) {
    let l = Xs(Le - 1, 0, We - 1), c = Xs(Fe + 1, 0, We - 1);
    for (; r[l] == null && l > 0; )
      l--;
    for (; r[c] == null && c < We - 1; )
      c++;
    return [l, c];
  }
  function jc() {
    if (We > 0) {
      let r = k.some((l) => l._focus) && ot != Ht.alpha;
      r && (m.globalAlpha = ot = Ht.alpha), k.forEach((l, c) => {
        if (c > 0 && l.show && (jr(c, !1), jr(c, !0), l._paths == null)) {
          let d = ot;
          ot != l.alpha && (m.globalAlpha = ot = l.alpha);
          let p = o == 2 ? [0, t[c][0].length - 1] : Bc(t[c]);
          l._paths = l.paths(i, c, p[0], p[1]), ot != d && (m.globalAlpha = ot = d);
        }
      }), k.forEach((l, c) => {
        if (c > 0 && l.show) {
          let d = ot;
          ot != l.alpha && (m.globalAlpha = ot = l.alpha), l._paths != null && Ir(c, !1);
          {
            let p = l._paths != null ? l._paths.gaps : null, b = l.points.show(i, c, Le, Fe, p), y = l.points.filter(i, c, b, p);
            (b || y) && (l.points._paths = l.points.paths(i, c, Le, Fe, y), Ir(c, !0));
          }
          ot != d && (m.globalAlpha = ot = d), Be("drawSeries", c);
        }
      }), r && (m.globalAlpha = ot = 1);
    }
  }
  function jr(r, l) {
    let c = l ? k[r].points : k[r];
    c._stroke = c.stroke(i, r), c._fill = c.fill(i, r);
  }
  function Ir(r, l) {
    let c = l ? k[r].points : k[r], {
      stroke: d,
      fill: p,
      clip: b,
      flags: y,
      _stroke: w = c._stroke,
      _fill: x = c._fill,
      _width: E = c.width
    } = c._paths;
    E = me(E * ce, 3);
    let D = null, N = E % 2 / 2;
    l && x == null && (x = E > 0 ? "#fff" : w);
    let G = c.pxAlign == 1 && N > 0;
    if (G && m.translate(N, N), !l) {
      let le = lt - E / 2, re = gt - E / 2, te = it + E, U = At + E;
      D = new Path2D(), D.rect(le, re, te, U);
    }
    l ? ms(w, E, c.dash, c.cap, x, d, p, y, b) : Ic(r, w, E, c.dash, c.cap, x, d, p, y, D, b), G && m.translate(-N, -N);
  }
  function Ic(r, l, c, d, p, b, y, w, x, E, D) {
    let N = !1;
    x != 0 && Q.forEach((G, le) => {
      if (G.series[0] == r) {
        let re = k[G.series[1]], te = t[G.series[1]], U = (re._paths || oo).band;
        mn(U) && (U = G.dir == 1 ? U[0] : U[1]);
        let H, ve = null;
        re.show && U && fd(te, Le, Fe) ? (ve = G.fill(i, le) || b, H = re._paths.clip) : U = null, ms(l, c, d, p, ve, y, w, x, E, D, H, U), N = !0;
      }
    }), N || ms(l, c, d, p, b, y, w, x, E, D);
  }
  const Ur = Ci | nr;
  function ms(r, l, c, d, p, b, y, w, x, E, D, N) {
    Hr(r, l, c, d, p), (x || E || N) && (m.save(), x && m.clip(x), E && m.clip(E)), N ? (w & Ur) == Ur ? (m.clip(N), D && m.clip(D), xo(p, y), wo(r, b, l)) : w & nr ? (xo(p, y), m.clip(N), wo(r, b, l)) : w & Ci && (m.save(), m.clip(N), D && m.clip(D), xo(p, y), m.restore(), wo(r, b, l)) : (xo(p, y), wo(r, b, l)), (x || E || N) && m.restore();
  }
  function wo(r, l, c) {
    c > 0 && (l instanceof Map ? l.forEach((d, p) => {
      m.strokeStyle = yo = p, m.stroke(d);
    }) : l != null && r && m.stroke(l));
  }
  function xo(r, l) {
    l instanceof Map ? l.forEach((c, d) => {
      m.fillStyle = ri = d, m.fill(c);
    }) : l != null && r && m.fill(l);
  }
  function Uc(r, l, c, d) {
    let p = j[r], b;
    if (d <= 0)
      b = [0, 0];
    else {
      let y = p._space = p.space(i, r, l, c, d), w = p._incrs = p.incrs(i, r, l, c, d, y);
      b = Of(l, c, w, d, y);
    }
    return p._found = b;
  }
  function gs(r, l, c, d, p, b, y, w, x, E) {
    let D = y % 2 / 2;
    O == 1 && m.translate(D, D), Hr(w, y, x, E, w), m.beginPath();
    let N, G, le, re, te = p + (d == 0 || d == 3 ? -b : b);
    c == 0 ? (G = p, re = te) : (N = p, le = te);
    for (let U = 0; U < r.length; U++)
      l[U] != null && (c == 0 ? N = le = r[U] : G = re = r[U], m.moveTo(N, G), m.lineTo(le, re));
    m.stroke(), O == 1 && m.translate(-D, -D);
  }
  function Wc(r) {
    let l = !0;
    return j.forEach((c, d) => {
      if (!c.show)
        return;
      let p = S[c.scale];
      if (p.min == null) {
        c._show && (l = !1, c._show = !1, ai(!1));
        return;
      } else
        c._show || (l = !1, c._show = !0, ai(!1));
      let b = c.side, y = b % 2, { min: w, max: x } = p, [E, D] = Uc(d, w, x, y == 0 ? Z : M);
      if (D == 0)
        return;
      let N = p.distr == 2, G = c._splits = c.splits(i, d, w, x, E, D, N), le = p.distr == 2 ? G.map((H) => Tt[H]) : G, re = p.distr == 2 ? Tt[G[1]] - Tt[G[0]] : E, te = c._values = c.values(i, c.filter(i, le, d, D, re), d, D, re);
      c._rotate = b == 2 ? c.rotate(i, te, d, D) : 0;
      let U = c._size;
      c._size = $t(c.size(i, te, d, r)), U != null && c._size != U && (l = !1);
    }), l;
  }
  function Vc(r) {
    let l = !0;
    return Lr.forEach((c, d) => {
      let p = c(i, d, Nn, r);
      p != cn[d] && (l = !1), cn[d] = p;
    }), l;
  }
  function Gc() {
    for (let r = 0; r < j.length; r++) {
      let l = j[r];
      if (!l.show || !l._show)
        continue;
      let c = l.side, d = c % 2, p, b, y = l.stroke(i, r), w = c == 0 || c == 3 ? -1 : 1, [x, E] = l._found;
      if (l.label != null) {
        let Qe = l.labelGap * w, ht = Ne((l._lpos + Qe) * ce);
        Rr(l.labelFont[0], y, "center", c == 2 ? Yi : za), m.save(), d == 1 ? (p = b = 0, m.translate(
          ht,
          Ne(gt + At / 2)
        ), m.rotate((c == 3 ? -zo : zo) / 2)) : (p = Ne(lt + it / 2), b = ht);
        let Ln = ql(l.label) ? l.label(i, r, x, E) : l.label;
        m.fillText(Ln, p, b), m.restore();
      }
      if (E == 0)
        continue;
      let D = S[l.scale], N = d == 0 ? it : At, G = d == 0 ? lt : gt, le = l._splits, re = D.distr == 2 ? le.map((Qe) => Tt[Qe]) : le, te = D.distr == 2 ? Tt[le[1]] - Tt[le[0]] : x, U = l.ticks, H = l.border, ve = U.show ? U.size : 0, Se = Ne(ve * ce), je = Ne((l.alignTo == 2 ? l._size - ve - l.gap : l.gap) * ce), fe = l._rotate * -zo / 180, Ae = I(l._pos * ce), ct = (Se + je) * w, Je = Ae + ct;
      b = d == 0 ? Je : 0, p = d == 1 ? Je : 0;
      let vt = l.font[0], Ct = l.align == 1 ? _i : l.align == 2 ? Ls : fe > 0 ? _i : fe < 0 ? Ls : d == 0 ? "center" : c == 3 ? Ls : _i, jt = fe || d == 1 ? "middle" : c == 2 ? Yi : za;
      Rr(vt, y, Ct, jt);
      let ut = l.font[1] * l.lineGap, yt = le.map((Qe) => I(u(Qe, D, N, G))), Et = l._values;
      for (let Qe = 0; Qe < Et.length; Qe++) {
        let ht = Et[Qe];
        if (ht != null) {
          d == 0 ? p = yt[Qe] : b = yt[Qe], ht = "" + ht;
          let Ln = ht.indexOf(`
`) == -1 ? [ht] : ht.split(/\n/gm);
          for (let Xe = 0; Xe < Ln.length; Xe++) {
            let la = Ln[Xe];
            fe ? (m.save(), m.translate(p, b + Xe * ut), m.rotate(fe), m.fillText(la, 0, 0), m.restore()) : m.fillText(la, p, b + Xe * ut);
          }
        }
      }
      U.show && gs(
        yt,
        U.filter(i, re, r, E, te),
        d,
        c,
        Ae,
        Se,
        me(U.width * ce, 3),
        U.stroke(i, r),
        U.dash,
        U.cap
      );
      let It = l.grid;
      It.show && gs(
        yt,
        It.filter(i, re, r, E, te),
        d,
        d == 0 ? 2 : 1,
        d == 0 ? gt : lt,
        d == 0 ? At : it,
        me(It.width * ce, 3),
        It.stroke(i, r),
        It.dash,
        It.cap
      ), H.show && gs(
        [Ae],
        [1],
        d == 0 ? 1 : 0,
        d == 0 ? 1 : 2,
        d == 1 ? gt : lt,
        d == 1 ? At : it,
        me(H.width * ce, 3),
        H.stroke(i, r),
        H.dash,
        H.cap
      );
    }
    Be("drawAxes");
  }
  function ai(r) {
    k.forEach((l, c) => {
      c > 0 && (l._paths = null, r && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((d) => {
        d.min = null, d.max = null;
      })));
    });
  }
  let $o = !1, bs = !1, ji = [];
  function Kc() {
    bs = !1;
    for (let r = 0; r < ji.length; r++)
      Be(...ji[r]);
    ji.length = 0;
  }
  function li() {
    $o || (Td(Wr), $o = !0);
  }
  function Yc(r, l = !1) {
    $o = !0, bs = l, r(i), Wr(), l && ji.length > 0 && queueMicrotask(Kc);
  }
  i.batch = Yc;
  function Wr() {
    if (os && (Rc(), os = !1), ti && (Pc(), ti = !1), bo) {
      if (ye($, _i, ge), ye($, Yi, Pe), ye($, Qi, Z), ye($, Xi, M), ye(C, _i, ge), ye(C, Yi, Pe), ye(C, Qi, Z), ye(C, Xi, M), ye(_, Qi, Yt), ye(_, Xi, Cn), g.width = Ne(Yt * ce), g.height = Ne(Cn * ce), j.forEach(({ _el: r, _show: l, _size: c, _pos: d, side: p }) => {
        if (r != null)
          if (l) {
            let b = p === 3 || p === 0 ? c : 0, y = p % 2 == 1;
            ye(r, y ? "left" : "top", d - b), ye(r, y ? "width" : "height", c), ye(r, y ? "top" : "left", y ? Pe : ge), ye(r, y ? "height" : "width", y ? M : Z), Js(r, In);
          } else
            dt(r, In);
      }), yo = ri = as = cs = us = hs = ds = fs = ls = null, ot = 1, Wi(!0), ge != ei || Pe != En || Z != Ft || M != Dn) {
        ai(!1);
        let r = Z / Ft, l = M / Dn;
        if (qe && !Mn && F.left >= 0) {
          F.left *= r, F.top *= l, ci && Ut(ci, Ne(F.left), 0, Z, M), ui && Ut(ui, 0, Ne(F.top), Z, M);
          for (let c = 0; c < _t.length; c++) {
            let d = _t[c];
            d != null && (oi[c] *= r, si[c] *= l, Ut(d, $t(oi[c]), $t(si[c]), Z, M));
          }
        }
        if (_e.show && !_o && _e.left >= 0 && _e.width > 0) {
          _e.left *= r, _e.width *= r, _e.top *= l, _e.height *= l;
          for (let c in $s)
            ye(fi, c, _e[c]);
        }
        ei = ge, En = Pe, Ft = Z, Dn = M;
      }
      Be("setSize"), bo = !1;
    }
    Yt > 0 && Cn > 0 && (m.clearRect(0, 0, g.width, g.height), Be("drawClear"), Y.forEach((r) => r()), Be("draw")), _e.show && _o && (ko(_e), _o = !1), qe && Mn && (On(null, !0, !1), Mn = !1), ee.show && ee.live && bt && (ws(), bt = !1), h || (h = !0, i.status = 1, Be("ready")), Bi = !1, $o = !1;
  }
  i.redraw = (r, l) => {
    ti = l || !1, r !== !1 ? hn(z, A.min, A.max) : li();
  };
  function _s(r, l) {
    let c = S[r];
    if (c.from == null) {
      if (We == 0) {
        let d = c.range(i, l.min, l.max, r);
        l.min = d[0], l.max = d[1];
      }
      if (l.min > l.max) {
        let d = l.min;
        l.min = l.max, l.max = d;
      }
      if (We > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      r == z && c.distr == 2 && We > 0 && (l.min = Mt(l.min, t[0]), l.max = Mt(l.max, t[0]), l.min == l.max && l.max++), B[r] = l, os = !0, li();
    }
  }
  i.setScale = _s;
  let vs, ys, ci, ui, Vr, Gr, hi, di, Kr, Yr, be, $e, un = !1;
  const Ve = F.drag;
  let He = Ve.x, Re = Ve.y;
  qe && (F.x && (vs = xt(Jh, C)), F.y && (ys = xt(Qh, C)), A.ori == 0 ? (ci = vs, ui = ys) : (ci = ys, ui = vs), be = F.left, $e = F.top);
  const _e = i.select = Ee({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), fi = _e.show ? xt(Zh, _e.over ? C : $) : null;
  function ko(r, l) {
    if (_e.show) {
      for (let c in r)
        _e[c] = r[c], c in $s && ye(fi, c, r[c]);
      l !== !1 && Be("setSelect");
    }
  }
  i.setSelect = ko;
  function qc(r) {
    if (k[r].show)
      Me && Js(ke[r], In);
    else if (Me && dt(ke[r], In), qe) {
      let c = ii ? _t[0] : _t[r];
      c != null && Ut(c, -10, -10, Z, M);
    }
  }
  function hn(r, l, c) {
    _s(r, { min: l, max: c });
  }
  function Rt(r, l, c, d) {
    l.focus != null && eu(r), l.show != null && k.forEach((p, b) => {
      b > 0 && (r == b || r == null) && (p.show = l.show, qc(b), o == 2 ? (hn(p.facets[0].scale, null, null), hn(p.facets[1].scale, null, null)) : hn(p.scale, null, null), li());
    }), c !== !1 && Be("setSeries", r, l), d && Vi("setSeries", i, r, l);
  }
  i.setSeries = Rt;
  function Zc(r, l) {
    Ee(Q[r], l);
  }
  function Jc(r, l) {
    r.fill = ie(r.fill || null), r.dir = ae(r.dir, -1), l = l ?? Q.length, Q.splice(l, 0, r);
  }
  function Qc(r) {
    r == null ? Q.length = 0 : Q.splice(r, 1);
  }
  i.addBand = Jc, i.setBand = Zc, i.delBand = Qc;
  function Xc(r, l) {
    k[r].alpha = l, qe && _t[r] != null && (_t[r].style.opacity = l), Me && ke[r] && (ke[r].style.opacity = l);
  }
  let qt, dn, zn;
  const pi = { focus: !0 };
  function eu(r) {
    if (r != zn) {
      let l = r == null, c = Ht.alpha != 1;
      k.forEach((d, p) => {
        if (o == 1 || p > 0) {
          let b = l || p == 0 || p == r;
          d._focus = l ? null : b, c && Xc(p, b ? 1 : Ht.alpha);
        }
      }), zn = r, c && li();
    }
  }
  Me && ni && Ze(Ha, ue, (r) => {
    F._lock || (Pn(r), zn != null && Rt(null, pi, !0, Ce.setSeries));
  });
  function Bt(r, l, c) {
    let d = S[l];
    c && (r = r / ce - (d.ori == 1 ? Pe : ge));
    let p = Z;
    d.ori == 1 && (p = M, r = p - r), d.dir == -1 && (r = p - r);
    let b = d._min, y = d._max, w = r / p, x = b + (y - b) * w, E = d.distr;
    return E == 3 ? Si(10, x) : E == 4 ? md(x, d.asinh) : E == 100 ? d.bwd(x) : x;
  }
  function tu(r, l) {
    let c = Bt(r, z, l);
    return Mt(c, t[0], Le, Fe);
  }
  i.valToIdx = (r) => Mt(r, t[0]), i.posToIdx = tu, i.posToVal = Bt, i.valToPos = (r, l, c) => S[l].ori == 0 ? s(
    r,
    S[l],
    c ? it : Z,
    c ? lt : 0
  ) : a(
    r,
    S[l],
    c ? At : M,
    c ? gt : 0
  ), i.setCursor = (r, l, c) => {
    be = r.left, $e = r.top, On(null, l, c);
  };
  function qr(r, l) {
    ye(fi, _i, _e.left = r), ye(fi, Qi, _e.width = l);
  }
  function Zr(r, l) {
    ye(fi, Yi, _e.top = r), ye(fi, Xi, _e.height = l);
  }
  let Ii = A.ori == 0 ? qr : Zr, Ui = A.ori == 1 ? qr : Zr;
  function nu() {
    if (Me && ee.live)
      for (let r = o == 2 ? 1 : 0; r < k.length; r++) {
        if (r == 0 && mt)
          continue;
        let l = ee.values[r], c = 0;
        for (let d in l)
          Lt[r][c++].firstChild.nodeValue = l[d];
      }
  }
  function ws(r, l) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, d) => {
      de[d] = c;
    }) : vd(r.idx) || de.fill(r.idx), ee.idx = de[0]), Me && ee.live) {
      for (let c = 0; c < k.length; c++)
        (c > 0 || o == 1 && !mt) && iu(c, de[c]);
      nu();
    }
    bt = !1, l !== !1 && Be("setLegend");
  }
  i.setLegend = ws;
  function iu(r, l) {
    let c = k[r], d = r == 0 && J == 2 ? Tt : t[r], p;
    mt ? p = c.values(i, r, l) ?? ln : (p = c.value(i, l == null ? null : d[l], r, l), p = p == null ? ln : { _: p }), ee.values[r] = p;
  }
  function On(r, l, c) {
    Kr = be, Yr = $e, [be, $e] = F.move(i, be, $e), F.left = be, F.top = $e, qe && (ci && Ut(ci, Ne(be), 0, Z, M), ui && Ut(ui, 0, Ne($e), Z, M));
    let d, p = Le > Fe;
    qt = pe, dn = null;
    let b = A.ori == 0 ? Z : M, y = A.ori == 1 ? Z : M;
    if (be < 0 || We == 0 || p) {
      d = F.idx = null;
      for (let w = 0; w < k.length; w++) {
        let x = _t[w];
        x != null && Ut(x, -10, -10, Z, M);
      }
      ni && Rt(null, pi, !0, r == null && Ce.setSeries), ee.live && (de.fill(d), bt = !0);
    } else {
      let w, x, E;
      o == 1 && (w = A.ori == 0 ? be : $e, x = Bt(w, z), d = F.idx = Mt(x, t[0], Le, Fe), E = L(t[0][d], A, b, 0));
      let D = -10, N = -10, G = 0, le = 0, re = !0, te = "", U = "";
      for (let H = o == 2 ? 1 : 0; H < k.length; H++) {
        let ve = k[H], Se = de[H], je = Se == null ? null : o == 1 ? t[H][Se] : t[H][1][Se], fe = F.dataIdx(i, H, d, x), Ae = fe == null ? null : o == 1 ? t[H][fe] : t[H][1][fe];
        if (bt = bt || Ae != je || fe != Se, de[H] = fe, H > 0 && ve.show) {
          let ct = fe == null ? -10 : fe == d ? E : L(o == 1 ? t[0][fe] : t[H][0][fe], A, b, 0), Je = Ae == null ? -10 : V(Ae, o == 1 ? S[ve.scale] : S[ve.facets[1].scale], y, 0);
          if (ni && Ae != null) {
            let vt = A.ori == 1 ? be : $e, Ct = ze(Ht.dist(i, H, fe, Je, vt));
            if (Ct < qt) {
              let jt = Ht.bias;
              if (jt != 0) {
                let ut = Bt(vt, ve.scale), yt = Ae >= 0 ? 1 : -1, Et = ut >= 0 ? 1 : -1;
                Et == yt && (Et == 1 ? jt == 1 ? Ae >= ut : Ae <= ut : (
                  // >= 0
                  jt == 1 ? Ae <= ut : Ae >= ut
                )) && (qt = Ct, dn = H);
              } else
                qt = Ct, dn = H;
            }
          }
          if (bt || ii) {
            let vt, Ct;
            A.ori == 0 ? (vt = ct, Ct = Je) : (vt = Je, Ct = ct);
            let jt, ut, yt, Et, It, Qe, ht = !0, Ln = Ke.bbox;
            if (Ln != null) {
              ht = !1;
              let Xe = Ln(i, H);
              yt = Xe.left, Et = Xe.top, jt = Xe.width, ut = Xe.height;
            } else
              yt = vt, Et = Ct, jt = ut = Ke.size(i, H);
            if (Qe = Ke.fill(i, H), It = Ke.stroke(i, H), ii)
              H == dn && qt <= Ht.prox && (D = yt, N = Et, G = jt, le = ut, re = ht, te = Qe, U = It);
            else {
              let Xe = _t[H];
              Xe != null && (oi[H] = yt, si[H] = Et, Va(Xe, jt, ut, ht), Ua(Xe, Qe, It), Ut(Xe, $t(yt), $t(Et), Z, M));
            }
          }
        }
      }
      if (ii) {
        let H = Ht.prox, ve = zn == null ? qt <= H : qt > H || dn != zn;
        if (bt || ve) {
          let Se = _t[0];
          Se != null && (oi[0] = D, si[0] = N, Va(Se, G, le, re), Ua(Se, te, U), Ut(Se, $t(D), $t(N), Z, M));
        }
      }
    }
    if (_e.show && un)
      if (r != null) {
        let [w, x] = Ce.scales, [E, D] = Ce.match, [N, G] = r.cursor.sync.scales, le = r.cursor.drag;
        if (He = le._x, Re = le._y, He || Re) {
          let { left: re, top: te, width: U, height: H } = r.select, ve = r.scales[N].ori, Se = r.posToVal, je, fe, Ae, ct, Je, vt = w != null && E(w, N), Ct = x != null && D(x, G);
          vt && He ? (ve == 0 ? (je = re, fe = U) : (je = te, fe = H), Ae = S[w], ct = L(Se(je, N), Ae, b, 0), Je = L(Se(je + fe, N), Ae, b, 0), Ii(Pt(ct, Je), ze(Je - ct))) : Ii(0, b), Ct && Re ? (ve == 1 ? (je = re, fe = U) : (je = te, fe = H), Ae = S[x], ct = V(Se(je, G), Ae, y, 0), Je = V(Se(je + fe, G), Ae, y, 0), Ui(Pt(ct, Je), ze(Je - ct))) : Ui(0, y);
        } else
          ks();
      } else {
        let w = ze(Kr - Vr), x = ze(Yr - Gr);
        if (A.ori == 1) {
          let G = w;
          w = x, x = G;
        }
        He = Ve.x && w >= Ve.dist, Re = Ve.y && x >= Ve.dist;
        let E = Ve.uni;
        E != null ? He && Re && (He = w >= E, Re = x >= E, !He && !Re && (x > w ? Re = !0 : He = !0)) : Ve.x && Ve.y && (He || Re) && (He = Re = !0);
        let D, N;
        He && (A.ori == 0 ? (D = hi, N = be) : (D = di, N = $e), Ii(Pt(D, N), ze(N - D)), Re || Ui(0, y)), Re && (A.ori == 1 ? (D = hi, N = be) : (D = di, N = $e), Ui(Pt(D, N), ze(N - D)), He || Ii(0, b)), !He && !Re && (Ii(0, 0), Ui(0, 0));
      }
    if (Ve._x = He, Ve._y = Re, r == null) {
      if (c) {
        if (aa != null) {
          let [w, x] = Ce.scales;
          Ce.values[0] = w != null ? Bt(A.ori == 0 ? be : $e, w) : null, Ce.values[1] = x != null ? Bt(A.ori == 1 ? be : $e, x) : null;
        }
        Vi(Fs, i, be, $e, Z, M, d);
      }
      if (ni) {
        let w = c && Ce.setSeries, x = Ht.prox;
        zn == null ? qt <= x && Rt(dn, pi, !0, w) : qt > x ? Rt(null, pi, !0, w) : dn != zn && Rt(dn, pi, !0, w);
      }
    }
    bt && (ee.idx = d, ws()), l !== !1 && Be("setCursor");
  }
  let fn = null;
  Object.defineProperty(i, "rect", {
    get() {
      return fn == null && Wi(!1), fn;
    }
  });
  function Wi(r = !1) {
    r ? fn = null : (fn = C.getBoundingClientRect(), Be("syncRect", fn));
  }
  function Jr(r, l, c, d, p, b, y) {
    F._lock || un && r != null && r.movementX == 0 && r.movementY == 0 || (xs(r, l, c, d, p, b, y, !1, r != null), r != null ? On(null, !0, !0) : On(l, !0, !1));
  }
  function xs(r, l, c, d, p, b, y, w, x) {
    if (fn == null && Wi(!1), Pn(r), r != null)
      c = r.clientX - fn.left, d = r.clientY - fn.top;
    else {
      if (c < 0 || d < 0) {
        be = -10, $e = -10;
        return;
      }
      let [E, D] = Ce.scales, N = l.cursor.sync, [G, le] = N.values, [re, te] = N.scales, [U, H] = Ce.match, ve = l.axes[0].side % 2 == 1, Se = A.ori == 0 ? Z : M, je = A.ori == 1 ? Z : M, fe = ve ? b : p, Ae = ve ? p : b, ct = ve ? d : c, Je = ve ? c : d;
      if (re != null ? c = U(E, re) ? u(G, S[E], Se, 0) : -10 : c = Se * (ct / fe), te != null ? d = H(D, te) ? u(le, S[D], je, 0) : -10 : d = je * (Je / Ae), A.ori == 1) {
        let vt = c;
        c = d, d = vt;
      }
    }
    x && (l == null || l.cursor.event.type == Fs) && ((c <= 1 || c >= Z - 1) && (c = Bn(c, Z)), (d <= 1 || d >= M - 1) && (d = Bn(d, M))), w ? (Vr = c, Gr = d, [hi, di] = F.move(i, c, d)) : (be = c, $e = d);
  }
  const $s = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function ks() {
    ko($s, !1);
  }
  let Qr, Xr, ea, ta;
  function na(r, l, c, d, p, b, y) {
    un = !0, He = Re = Ve._x = Ve._y = !1, xs(r, l, c, d, p, b, y, !0, !1), r != null && (Ze(Hs, qs, ia, !1), Vi(La, i, hi, di, Z, M, null));
    let { left: w, top: x, width: E, height: D } = _e;
    Qr = w, Xr = x, ea = E, ta = D;
  }
  function ia(r, l, c, d, p, b, y) {
    un = Ve._x = Ve._y = !1, xs(r, l, c, d, p, b, y, !1, !0);
    let { left: w, top: x, width: E, height: D } = _e, N = E > 0 || D > 0, G = Qr != w || Xr != x || ea != E || ta != D;
    if (N && G && ko(_e), Ve.setScale && N && G) {
      let le = w, re = E, te = x, U = D;
      if (A.ori == 1 && (le = x, re = D, te = w, U = E), He && hn(
        z,
        Bt(le, z),
        Bt(le + re, z)
      ), Re)
        for (let H in S) {
          let ve = S[H];
          H != z && ve.from == null && ve.min != pe && hn(
            H,
            Bt(te + U, H),
            Bt(te, H)
          );
        }
      ks();
    } else F.lock && (F._lock = !F._lock, On(l, !0, r != null));
    r != null && (Xn(Hs, qs), Vi(Hs, i, be, $e, Z, M, null));
  }
  function ou(r, l, c, d, p, b, y) {
    if (F._lock)
      return;
    Pn(r);
    let w = un;
    if (un) {
      let x = !0, E = !0, D = 10, N, G;
      A.ori == 0 ? (N = He, G = Re) : (N = Re, G = He), N && G && (x = be <= D || be >= Z - D, E = $e <= D || $e >= M - D), N && x && (be = be < hi ? 0 : Z), G && E && ($e = $e < di ? 0 : M), On(null, !0, !0), un = !1;
    }
    be = -10, $e = -10, de.fill(null), On(null, !0, !0), w && (un = w);
  }
  function oa(r, l, c, d, p, b, y) {
    F._lock || (Pn(r), rs(), ks(), r != null && Vi(Ra, i, be, $e, Z, M, null));
  }
  function sa() {
    j.forEach(Lf), ss(i.width, i.height, !0);
  }
  Wn(Ro, xi, sa);
  const mi = {};
  mi.mousedown = na, mi.mousemove = Jr, mi.mouseup = ia, mi.dblclick = oa, mi.setSeries = (r, l, c, d) => {
    let p = Ce.match[2];
    c = p(i, l, c), c != -1 && Rt(c, d, !0, !1);
  }, qe && (Ze(La, C, na), Ze(Fs, C, Jr), Ze(Fa, C, (r) => {
    Pn(r), Wi(!1);
  }), Ze(Ha, C, ou), Ze(Ra, C, oa), ir.add(i), i.syncRect = Wi);
  const So = i.hooks = e.hooks || {};
  function Be(r, l, c) {
    bs ? ji.push([r, l, c]) : r in So && So[r].forEach((d) => {
      d.call(null, i, l, c);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let l in r.hooks)
      So[l] = (So[l] || []).concat(r.hooks[l]);
  });
  const ra = (r, l, c) => c, Ce = Ee({
    key: null,
    setSeries: !1,
    filters: {
      pub: Za,
      sub: Za
    },
    scales: [z, k[1] ? k[1].scale : null],
    match: [Ja, Ja, ra],
    values: [null, null]
  }, F.sync);
  Ce.match.length == 2 && Ce.match.push(ra), F.sync = Ce;
  const aa = Ce.key, Ss = vc(aa);
  function Vi(r, l, c, d, p, b, y) {
    Ce.filters.pub(r, l, c, d, p, b, y) && Ss.pub(r, l, c, d, p, b, y);
  }
  Ss.sub(i);
  function su(r, l, c, d, p, b, y) {
    Ce.filters.sub(r, l, c, d, p, b, y) && mi[r](null, l, c, d, p, b, y);
  }
  i.pub = su;
  function ru() {
    Ss.unsub(i), ir.delete(i), Tn.clear(), Qs(Ro, xi, sa), f.remove(), ue?.remove(), Be("destroy");
  }
  i.destroy = ru;
  function As() {
    Be("init", e, t), Fr(t || e.data, !1), B[z] ? _s(z, B[z]) : rs(), _o = _e.show && (_e.width > 0 || _e.height > 0), Mn = bt = !0, ss(e.width, e.height);
  }
  return k.forEach(Or), j.forEach(Hc), n ? n instanceof HTMLElement ? (n.appendChild(f), As()) : n(i, As) : As(), i;
}
Ye.assign = Ee;
Ye.fmtNum = xr;
Ye.rangeNum = Bo;
Ye.rangeLog = qo;
Ye.rangeAsinh = yr;
Ye.orient = Zn;
Ye.pxRatio = ce;
Ye.join = Ad;
Ye.fmtDate = kr, Ye.tzDate = Fd;
Ye.sync = vc;
{
  Ye.addGap = yf, Ye.clipGaps = Qo;
  let e = Ye.paths = {
    points: Sc
  };
  e.linear = Tc, e.stepped = $f, e.bars = kf, e.spline = Af;
}
const Ff = 24;
async function Hf(e, t, n, i) {
  const o = new Date(Date.now() - n * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (a) => {
      const u = a.states ?? {};
      if (Object.keys(u).length === 0) {
        Object.keys(s).length > 0 && i(s);
        return;
      }
      const h = (Date.now() - n * 60 * 60 * 1e3) / 1e3;
      for (const [f, g] of Object.entries(u)) {
        const m = s[f] ?? [];
        s[f] = [...m, ...g].filter((_) => _.lu >= h);
      }
      i(s);
    },
    {
      type: "history/stream",
      start_time: o.toISOString(),
      entity_ids: t,
      minimal_response: !1,
      no_attributes: !0,
      // Default is `true`. We want every state change (action transitions,
      // each effective_low recalc) — the chart's whole purpose is showing
      // those events. The volume is manageable: a typical zone fires a
      // few state changes per minute.
      significant_changes_only: !1
    }
  );
}
function Zi(e) {
  if (!e) return [];
  const t = [];
  for (const n of e) {
    const i = parseFloat(n.s);
    Number.isFinite(i) && t.push([n.lu, i]);
  }
  return t.sort((n, i) => n[0] - i[0]), t;
}
function Rf(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const s of e) for (const [a] of s) n.add(a);
  if (n.size === 0)
    return [[t], ...e.map(() => [null])];
  const i = [...n].sort((s, a) => s - a), o = e.map((s) => {
    let a = -1, u = null;
    return i.map((h) => {
      for (; a + 1 < s.length && s[a + 1][0] <= h; )
        a++, u = s[a][1];
      return u;
    });
  });
  return [i, ...o];
}
const Bf = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var jf = Object.defineProperty, ns = (e, t, n, i) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, n, o) || o);
  return o && jf(t, n, o), o;
};
const If = [
  Ue,
  Io(Bf),
  De`
    :host {
      display: block;
      width: 100%;
      /* color-scheme: light dark inherited from tokens. */
    }
    .chart-host {
      width: 100%;
    }
    /* Collapse the host while a status (loading/error/empty) is shown
       so the user doesn't see a blank gap above the message. */
    .chart-host.idle {
      height: 0;
    }
    .status {
      text-align: center;
      padding: var(--cb-gap-lg);
      color: var(--cb-text-secondary);
      font-size: 13px;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cb-gap-md);
      justify-content: center;
      font-size: 12px;
      color: var(--cb-text-secondary);
      padding-top: var(--cb-gap-sm);
    }
    .legend .swatch {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 2px;
      vertical-align: middle;
      margin-right: 4px;
    }
    /* Theme uPlot grid + axes via its own CSS variables so they pick
       up HA's dark/light tokens automatically. v0.9.1: use the cb-*
       tokens (which carry light-dark fallbacks) instead of the raw
       HA variables, so a chart in a top-layer dialog still renders
       readable when HA's tokens do not propagate. */
    .u-wrap {
      --u-fg: var(--cb-text-primary);
    }
    .u-axis,
    .u-legend {
      color: var(--cb-text-secondary);
    }
    .u-grid line {
      stroke: var(--cb-track-bg);
    }
  `
], vl = () => {
};
class Oi extends Te {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = If;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._destroyPlot(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._fetchGen++;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasUpdated && this.requestUpdate();
  }
  _observeResize() {
    if (!this._host || this._resizeObserver) return;
    const t = this.chartHeight;
    this._resizeObserver = new ResizeObserver((n) => {
      const i = n[0]?.contentRect.width ?? 0;
      this._plot && i > 0 && this._plot.setSize({ width: i, height: t });
    }), this._resizeObserver.observe(this._host);
  }
  /**
   * Resolve a CSS custom property to a literal colour string for handing to
   * uPlot. uPlot draws axes via the canvas API, which (unlike SVG/DOM) does
   * NOT parse `var(--*)` references — passing `'var(--secondary-text-color)'`
   * straight to uPlot leaves canvas text/lines at uPlot's default (~black),
   * invisible on HA's dark theme. Resolving once per `_buildOpts()` call lets
   * a theme change propagate automatically on the next history-stream event;
   * `getComputedStyle` is microseconds and stream events are infrequent, so
   * memoising would add staleness without buying us anything.
   */
  _resolveColor(t, n) {
    return getComputedStyle(this).getPropertyValue(t).trim() || n;
  }
  _destroyPlot() {
    this._plot && (this._plot.destroy(), this._plot = null), this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null);
  }
}
ns([
  q()
], Oi.prototype, "_loading");
ns([
  q()
], Oi.prototype, "_error");
ns([
  q()
], Oi.prototype, "_empty");
ns([
  Di(".chart-host")
], Oi.prototype, "_host");
var Uf = Object.defineProperty, Wf = Object.getOwnPropertyDescriptor, rn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Wf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Uf(t, n, o), o;
};
const sr = 260, Vf = 3;
let zt = class extends Oi {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return sr;
  }
  /** Overlay-presence getters used by `_renderPlot`, `_buildOpts`, and
   *  `render`. Single source of truth so the three branches can't
   *  silently diverge (e.g. if `apparentEntity` is renamed). */
  get _hasApparent() {
    return !!this.apparentEntity;
  }
  get _hasHumidity() {
    return !!this.humidityEntity;
  }
  updated(e) {
    if (!this._unsubscribe) {
      this._subscribe();
      return;
    }
    (e.has("roomEntity") || e.has("lowEntity") || e.has("highEntity") || e.has("actionEntity") || e.has("apparentEntity") || e.has("humidityEntity")) && this._subscribe();
  }
  async _subscribe() {
    if (!this.hass || !this.roomEntity) return;
    this._unsubscribe && this._unsubscribe !== vl && this._unsubscribe(), this._unsubscribe = vl;
    const e = Vf + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
    this._plot && this._plot.series.length !== 1 + e && this._destroyPlot();
    const t = ++this._fetchGen;
    this._loading = !0, this._error = null, this._empty = !1;
    const n = [
      this.roomEntity,
      this.lowEntity,
      this.highEntity,
      this.actionEntity,
      this.apparentEntity,
      this.humidityEntity
    ].filter((i) => !!i);
    try {
      const i = await Hf(this.hass, n, Ff, (o) => {
        t === this._fetchGen && (this._renderPlot(o), this._loading = !1);
      });
      if (t !== this._fetchGen) {
        i();
        return;
      }
      this._unsubscribe = i;
    } catch (i) {
      if (t !== this._fetchGen) return;
      this._error = i instanceof Error ? i.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
    }
  }
  /** Map a legend label to its uPlot series index. Returns -1 when the
   *  label isn't currently in the chart (e.g. "Apparent" with no
   *  apparent entity wired). Indices must agree with the series order
   *  in `_buildOpts` AND the data order in `_renderPlot`'s
   *  `seriesData` — a refactor adding a new series must update all
   *  three locations. uPlot's mandatory x-axis pseudo-series sits at
   *  index 0, hence the off-by-one for Room.
   */
  _seriesIndexForLabel(e) {
    switch (e) {
      case "Room":
        return 1;
      case "Low band":
        return 2;
      case "High band":
        return 3;
      case "Apparent":
        return this._hasApparent ? 4 : -1;
      case "Humidity":
        return this._hasHumidity ? this._hasApparent ? 5 : 4 : -1;
      default:
        return -1;
    }
  }
  /** Click handler for legend toggles. Flips the label's hidden state,
   *  pokes uPlot directly via `setSeries` so the change is immediate
   *  (no waiting for the next refresh), and Lit re-renders the legend
   *  to reflect the new state.
   *
   *  The `setSeries` call is a no-op when the chart hasn't constructed
   *  uPlot yet (loading / empty state) — the next `_buildOpts` call
   *  will honour the hidden set via the `show:` field on each toggleable
   *  series, so the state stays consistent across plot re-creations.
   */
  _toggleLabel(e) {
    const t = this._seriesIndexForLabel(e);
    if (t < 0) return;
    const n = new Set(this._hiddenLabels), i = n.has(e);
    i ? n.delete(e) : n.add(e), this._hiddenLabels = n, this._plot && this._plot.setSeries(t, { show: i });
  }
  /** Keyboard equivalent of click — Enter or Space activates the toggle.
   *  Matches WAI-ARIA "button" pattern for keyboard accessibility. */
  _onLabelKeyDown(e, t) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._toggleLabel(t));
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(e, t) {
    if (!e) return [];
    const n = [...e].sort((o, s) => o.lu - s.lu), i = [];
    for (let o = 0; o < n.length; o++) {
      const s = n[o].lu, a = n[o + 1]?.lu ?? t, u = n[o].s;
      (u === "heating" || u === "cooling") && i.push({ start: s, end: a, action: u });
    }
    return i;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), n = Zi(e[this.roomEntity]), i = Zi(e[this.lowEntity]), o = Zi(e[this.highEntity]), s = this._hasApparent ? Zi(e[this.apparentEntity]) : [], a = this._hasHumidity ? Zi(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), n.length === 0 && i.length === 0 && o.length === 0 && s.length === 0 && a.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const u = [n, i, o];
    this._hasApparent && u.push(s), this._hasHumidity && u.push(a);
    const h = Rf(u, t), f = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: f.width, height: f.height }), this._plot.setData(h), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Ye(f, h, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = this._resolveColor("--cb-action-heating", "#d9603f"), n = this._resolveColor("--cb-action-cooling", "#2f7fcc"), i = this._resolveColor("--primary-color", "#03a9f4"), o = this._resolveColor("--secondary-text-color", "#727272"), s = this._resolveColor("--divider-color", "#e0e0e0"), a = [
      {},
      {
        label: "Room",
        stroke: i,
        width: 2,
        spanGaps: !0,
        show: !this._hiddenLabels.has("Room")
      },
      {
        label: "Low band",
        stroke: t,
        width: 1.5,
        dash: [6, 3],
        spanGaps: !0,
        show: !this._hiddenLabels.has("Low band")
      },
      {
        label: "High band",
        stroke: n,
        width: 1.5,
        dash: [6, 3],
        spanGaps: !0,
        show: !this._hiddenLabels.has("High band")
      }
    ];
    this._hasApparent && a.push({
      label: "Apparent",
      stroke: i,
      width: 1.5,
      dash: [4, 3],
      spanGaps: !0,
      show: !this._hiddenLabels.has("Apparent")
    }), this._hasHumidity && a.push({
      label: "Humidity",
      scale: "y2",
      stroke: o,
      width: 1.2,
      spanGaps: !0,
      show: !this._hiddenLabels.has("Humidity")
    });
    const u = [
      {
        stroke: o,
        grid: { stroke: s }
      },
      {
        stroke: o,
        grid: { stroke: s },
        size: 38
      }
    ];
    this._hasHumidity && u.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: o,
      grid: { show: !1 },
      values: (f, g) => g.map((m) => `${m.toFixed(0)}%`)
    });
    const h = {
      x: { time: !0 }
    };
    return this._hasHumidity && (h.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: sr,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: h,
      axes: u,
      series: a,
      hooks: {
        draw: [
          (f) => {
            const g = f.ctx;
            if (!g) return;
            const m = f.bbox.top, _ = f.bbox.height;
            g.save();
            for (const $ of this._intervals) {
              const C = f.valToPos($.start, "x", !0), O = f.valToPos($.end, "x", !0);
              O <= C || (g.fillStyle = $.action === "heating" ? yl(t, 0.18) : yl(n, 0.18), g.fillRect(C, m, O - C, _));
            }
            g.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return v`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return v`
      ${this._loading ? v`<div class="status">Loading 24 h history…</div>` : T}
      ${this._error ? v`<div class="status">${this._error}</div>` : T}
      ${this._empty ? v`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : T}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? T : this._renderLegend()}
    `;
  }
  /** Custom legend with per-series toggles (v0.8.3+). Each line-series
   *  swatch is a button — click / Enter / Space flips that series'
   *  `_hiddenLabels` membership, uPlot's setSeries hides / shows the
   *  line immediately, and the toggle's visual reflects the new state.
   *  Heating / Cooling shading items are non-interactive in v0.8.3
   *  because they live in a `draw` hook rather than as uPlot series;
   *  toggling them needs a different code path. Marked with
   *  `aria-pressed="false"` only on the toggleable items so screen
   *  readers don't announce the shading swatches as buttons. */
  _renderLegend() {
    return v`<div class="legend">
      ${this._toggleItem(
      "Room",
      v`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      v`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : T}
      ${this._toggleItem(
      "Low band",
      v`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      v`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      v`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
      "Humidity (%, right axis)"
    ) : T}
      <span
        ><span class="swatch" style="background:var(--cb-action-heating);opacity:0.18"></span>
        Heating</span
      >
      <span
        ><span class="swatch" style="background:var(--cb-action-cooling);opacity:0.18"></span>
        Cooling</span
      >
    </div>`;
  }
  /** Build a single clickable legend item. `label` is the canonical
   *  series label used both for display and for `_seriesIndexForLabel`
   *  / `_hiddenLabels` lookups; `displayText` lets callers override the
   *  visible string (Humidity's "(%, right axis)" suffix doesn't belong
   *  in the toggle key). */
  _toggleItem(e, t, n) {
    const i = this._hiddenLabels.has(e);
    return v`<span
      class="toggle ${i ? "hidden" : ""}"
      role="button"
      tabindex="0"
      aria-pressed=${i ? "true" : "false"}
      @click=${() => this._toggleLabel(e)}
      @keydown=${(o) => this._onLabelKeyDown(o, e)}
      >${t}${n ?? e}</span
    >`;
  }
};
zt.styles = [
  ...Oi.styles,
  De`
      .chart-host {
        height: ${Io(sr)}px;
      }
      /* "Dashed" swatch mirrors the dashed apparent stroke in the chart.
         Picks up the legend item's inline color (set to roomColor) via
         currentColor — no per-instance CSS variable plumbing needed. */
      .legend .swatch.dashed {
        background-image: repeating-linear-gradient(
          90deg,
          currentColor 0,
          currentColor 4px,
          transparent 4px,
          transparent 7px
        );
        background-color: transparent;
      }
      /* v0.8.3: clickable legend toggles. Pointer cursor signals
         interactivity; no underline on hover (the legend isn't a
         link). Hidden state dims the whole item and strikes the
         label so it's obvious which series the user has muted. */
      .legend .toggle {
        cursor: pointer;
        user-select: none;
        transition: opacity 120ms ease;
      }
      .legend .toggle:hover {
        opacity: 0.85;
      }
      .legend .toggle.hidden {
        opacity: 0.4;
        text-decoration: line-through;
      }
      .legend .toggle:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 2px;
      }
    `
];
rn([
  P({ attribute: !1 })
], zt.prototype, "hass", 2);
rn([
  P({ type: String })
], zt.prototype, "roomEntity", 2);
rn([
  P({ type: String })
], zt.prototype, "lowEntity", 2);
rn([
  P({ type: String })
], zt.prototype, "highEntity", 2);
rn([
  P({ type: String })
], zt.prototype, "actionEntity", 2);
rn([
  P({ type: String })
], zt.prototype, "apparentEntity", 2);
rn([
  P({ type: String })
], zt.prototype, "humidityEntity", 2);
rn([
  q()
], zt.prototype, "_hiddenLabels", 2);
zt = rn([
  Ie("comfort-band-history-chart")
], zt);
function yl(e, t) {
  const n = e.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let s = i[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const a = parseInt(s.slice(0, 2), 16), u = parseInt(s.slice(2, 4), 16), h = parseInt(s.slice(4, 6), 16);
    return `rgba(${a}, ${u}, ${h}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : n;
}
var Gf = Object.defineProperty, Kf = Object.getOwnPropertyDescriptor, Mr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Kf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Gf(t, n, o), o;
};
let ho = class extends Te {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return v`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, n = Hl(this.hass, e), i = t ?? "", o = t && n ? n : "";
    return v`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
        .apparentEntity=${i}
        .humidityEntity=${o}
      ></comfort-band-history-chart>
      ${this._renderOverlayHint(t, n)}
    `;
  }
  /** Hint banner shown when one of the optional overlays can't render.
   *  Covers both the apparent-missing and humidity-missing cases (was
   *  `_renderApparentSection` pre-v0.8.2, which chose between rendering
   *  the standalone apparent chart OR a hint; the v0.8.2 merge removed
   *  the chart branch and renamed accordingly). Priority order: apparent
   *  missing first (pre-v0.4 backend — a humidity nudge would only lead
   *  to a second upgrade hint), then humidity (set up in HA's Configure
   *  dialog for the zone). Both present → no hint. */
  _renderOverlayHint(e, t) {
    return e ? t ? T : v`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : v`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
ho.styles = [
  Ue,
  De`
      /* Inside the Advanced tab's section, which does the padding. */
      :host {
        display: block;
      }
      .empty {
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
      }
      /* Deliberately .hint (not .upgrade-hint like settings-tab /
         profiles-tab use): this banner covers two semantically distinct
         cases — "upgrade integration" AND "configure humidity sensor".
         The latter is a configuration nudge, not an upgrade gate, so
         the more general name is the right call. Also visually
         different: a top border separates the hint from the chart
         above it. */
      .hint {
        margin-top: var(--cb-gap-lg);
        padding: var(--cb-gap-md);
        color: var(--cb-text-secondary);
        font-size: 12px;
        text-align: center;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
    `
];
Mr([
  P({ attribute: !1 })
], ho.prototype, "hass", 2);
Mr([
  P({ attribute: !1 })
], ho.prototype, "entities", 2);
ho = Mr([
  Ie("comfort-band-insights-tab")
], ho);
var Yf = Object.defineProperty, qf = Object.getOwnPropertyDescriptor, mo = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? qf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Yf(t, n, o), o;
};
function Zf(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function wl(e, t) {
  return `${e} ${t}${e === 1 ? "" : "s"}`;
}
const Us = 10, Jf = {
  too_cold: "Too cool",
  just_right: "Just right",
  too_hot: "Too warm"
}, Qf = {
  wls: "Fitted",
  cached: "Earlier",
  previous: "Run before",
  rejected: "Set aside",
  none: "—"
};
let Kn = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._feedback = { kind: "loading" }, this._fetchedFor = null;
  }
  willUpdate(e) {
    super.willUpdate(e), this.hass && this.zone && this._fetchedFor !== this.zone && (this._fetchedFor = this.zone, this._feedback = { kind: "loading" }, this._load(this.zone));
  }
  async _load(e) {
    try {
      const t = await this.hass.callWS({
        type: "comfort_band/get_feedback",
        zone: e
      });
      if (this._fetchedFor !== e) return;
      const n = Array.isArray(t?.entries) ? t.entries : [];
      this._feedback = { kind: "ready", entries: n };
    } catch (t) {
      if (this._fetchedFor !== e) return;
      const n = typeof t == "object" && t !== null ? t.code : void 0;
      this._feedback = { kind: n === "unknown_command" ? "old" : "error" };
    }
  }
  render() {
    if (!this.hass || !this.entities) return T;
    const e = jl(this.hass, this.entities), t = Ul(this.hass, this.entities);
    return v`
      <h3>Heating and cooling</h3>
      ${this._renderDeciding(e)}
      <h3>What it has learned</h3>
      ${t === "unavailable" ? v`<div class="note">What it has learned can’t be read right now.</div>` : t ? this._renderRates(t) : v`<div class="note">
              What it has learned needs the <code>comfort_band</code> integration v0.6.0 or later,
              with its entities turned on.
            </div>`}
      <h3>Feedback</h3>
      <div role="status">${this._renderFeedback()}</div>
    `;
  }
  _row(e, t, n = "", i = "") {
    return v`<div class="row" data-diag=${i || T}>
      <div class="row-label">
        <div class="title">${e}</div>
        ${n ? v`<div class="desc">${n}</div>` : T}
      </div>
      <div class="value">${t}</div>
    </div>`;
  }
  _renderDeciding(e) {
    const t = this.entities, n = e.paused === !0 ? this._row(
      "Paused",
      "",
      "“Control this room” is off, so nothing is sent to the unit. Below is what it would do.",
      "paused"
    ) : e.paused === null ? this._row(
      "Control this room",
      "Can’t tell",
      "Whether it’s paused can’t be read.",
      "paused"
    ) : T;
    if (e.noReading)
      return v`${n}
      ${this._row(
        "On hold",
        "",
        "There’s no room reading, so nothing is decided until there is.",
        "on-hold"
      )}`;
    const i = {
      "stand-in": "While a stand-in sensor is in use.",
      peak: "While a peak is on.",
      "learning-off": "Learning is off.",
      "no-learning": "This version of the integration has no learning.",
      "not-ready": "Predictive control is on, but not ready to plan yet."
    }, o = (s) => s ? hh[s] : "Can’t tell";
    return v`
      ${n}
      ${this._row(
      "Deciding now",
      e.controller ? Bl[e.controller] : "Can’t tell",
      e.controller ? e.reason ? i[e.reason] : "" : "Some of what decides it can’t be read.",
      "controller"
    )}
      ${this._row("Its decision", o(e.decision), "", "decision")}
      ${typeof t.predictedAction == "string" ? this._row("Learning would", o(e.learning), "", "learning") : T}
      ${typeof t.mpcAction == "string" || typeof t.mpcReady == "string" ? this._row(
      "Predictive control would",
      e.predictive === "not-ready" ? "Not ready yet" : o(e.predictive),
      "",
      "predictive"
    ) : T}
    `;
  }
  _renderRates(e) {
    const t = (i) => i === null ? "—" : `${i > 0 ? "+" : i < 0 ? "−" : ""}${Math.abs(i).toFixed(2)}`, n = (i) => i.method !== "cached" && i.method !== "previous";
    return v`
      ${this._row("On its own", e.idle.value, e.idle.source, "idle")}
      ${this._row("Heating", e.heat.value, e.heat.source, "heat")}
      ${this._row("Cooling", e.cool.value, e.cool.source, "cool")}
      <details class="more">
        <summary>Details</summary>
        <div class="table-wrap" tabindex="0" role="region" aria-label="The rates in numbers">
          <table>
            <thead>
              <tr>
                <td></td>
                <th scope="col">°C an hour</th>
                <th scope="col">Readings</th>
                <th scope="col">Spread</th>
                <th scope="col">How</th>
              </tr>
            </thead>
            <tbody>
              ${e.details.map(
      (i) => v`<tr>
                    <th scope="row">${i.name}</th>
                    <td>${t(i.perHour)}</td>
                    <td>${n(i) && i.samples !== null ? i.samples : "—"}</td>
                    <td>${n(i) && i.spread !== null ? `${i.spread.toFixed(2)}°` : "—"}</td>
                    <td>${i.method ? Qf[i.method] ?? i.method : "—"}</td>
                  </tr>`
    )}
            </tbody>
          </table>
        </div>
        <div class="note">
          ${e.windowMinutes !== null && e.sampleCount !== null ? `Learning keeps ${wl(e.sampleCount, "reading")}, spanning ${wl(Math.round(e.windowMinutes), "minute")}.` : ""}
          ${e.updated !== null ? `The newest is from ${Ks(e.updated, Date.now(), this.hass)}.` : ""}
        </div>
      </details>
    `;
  }
  _renderFeedback() {
    const e = this._feedback;
    if (e.kind === "loading") return v`<div class="note">Loading…</div>`;
    if (e.kind === "old")
      return v`<div class="note">
        Feedback needs the <code>comfort_band</code> integration v0.11.0 or later.
      </div>`;
    if (e.kind === "error")
      return v`<div class="note">Feedback can’t be loaded right now.</div>`;
    if (e.entries.length === 0)
      return v`<div class="note">
        None yet. Taps on “How does it feel?” on the Now tab show here.
      </div>`;
    const t = Date.now(), n = e.entries.slice(-Us).reverse();
    return v`
      <ul>
        ${n.map((i) => this._renderEntry(i, t))}
      </ul>
      ${e.entries.length > Us ? v`<div class="note">The last ${Us} of ${e.entries.length}.</div>` : T}
    `;
  }
  _renderEntry(e, t) {
    const n = Date.parse(e.timestamp), i = _n({ low: e.low, high: e.high }), o = typeof e.room_temp == "number" ? `${vn(e.room_temp)}°, range ${i}` : `no reading, range ${i}`, s = [
      e.room_source === "fallback_sensor" || e.room_source === "climate" ? "stand-in reading" : "",
      e.peak_state === "active" ? "during a peak" : e.peak_state === "preconditioning" ? "ahead of a peak" : ""
    ].filter(Boolean);
    return v`<li>
      <span class="said">${Jf[e.label] ?? e.label}</span>
      <div class="detail">
        ${Zf(
      [Number.isFinite(n) ? Ks(n, t, this.hass) : "", o, ...s].filter(Boolean).join(" · ")
    )}
      </div>
    </li>`;
  }
};
Kn.styles = [
  Ue,
  De`
      :host {
        display: block;
      }
      h3 {
        margin: var(--cb-gap-md) 0 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      h3:first-child {
        margin-top: 0;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 4px var(--cb-gap-md);
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .row-label {
        flex: 1 1 12em;
        min-width: 0;
      }
      .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .desc,
      .note {
        overflow-wrap: anywhere;
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.35;
        color: var(--cb-text-secondary);
      }
      .value {
        margin-left: auto;
        max-width: 100%;
        overflow-wrap: anywhere;
        font-size: 14px;
        color: var(--cb-text-primary);
        text-align: right;
      }
      details.more {
        margin-top: var(--cb-gap-sm);
      }
      details.more > summary {
        display: flex;
        align-items: center;
        min-height: 44px;
        list-style: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      details.more > summary::-webkit-details-marker {
        display: none;
      }
      details.more > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 8px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.more[open] > summary::before {
        transform: rotate(45deg);
      }
      details.more > summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      /* The raw numbers scroll sideways in their own box rather than
         widening the dialog. */
      .table-wrap {
        overflow-x: auto;
      }
      .table-wrap:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      table {
        border-collapse: collapse;
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        color: var(--cb-text-primary);
      }
      th,
      td {
        padding: 4px 5px;
        text-align: right;
        white-space: nowrap;
      }
      th:first-child,
      td:first-child {
        padding-left: 0;
        text-align: left;
      }
      thead th {
        font-weight: 500;
        color: var(--cb-text-secondary);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      li .said {
        font-weight: 500;
      }
      li .detail {
        margin-top: 2px;
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `
];
mo([
  P({ attribute: !1 })
], Kn.prototype, "hass", 2);
mo([
  P({ type: String })
], Kn.prototype, "zone", 2);
mo([
  P({ attribute: !1 })
], Kn.prototype, "entities", 2);
mo([
  q()
], Kn.prototype, "_feedback", 2);
Kn = mo([
  Ie("comfort-band-diagnostics-tab")
], Kn);
var Xf = Object.defineProperty, ep = Object.getOwnPropertyDescriptor, an = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ep(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Xf(t, n, o), o;
};
let Ot = class extends Te {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (e, t) => {
      e.preventDefault();
      const n = e.currentTarget;
      n.setPointerCapture(e.pointerId), this._dragging = t;
      const i = (s) => {
        this._setHandle(t, this._xToValue(s.clientX)) && this._fire("input");
      }, o = (s) => {
        n.releasePointerCapture(s.pointerId), n.removeEventListener("pointermove", i), n.removeEventListener("pointerup", o), n.removeEventListener("pointercancel", o), this._dragging = null, this._fire("change");
      };
      n.addEventListener("pointermove", i), n.addEventListener("pointerup", o), n.addEventListener("pointercancel", o);
    }, this._onTrackPointerDown = (e) => {
      if (e.target.classList.contains("thumb")) return;
      const t = this._xToValue(e.clientX), n = (this.low + this.high) / 2, i = t < n ? "low" : "high";
      this._setHandle(i, t) && this._fire("change");
    }, this._onKeyDown = (e, t) => {
      let n = 0;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          n = -this.step;
          break;
        case "ArrowRight":
        case "ArrowUp":
          n = this.step;
          break;
        case "Home":
          e.preventDefault(), this._setHandle(t, this.min) && this._fire("change");
          return;
        case "End":
          e.preventDefault(), this._setHandle(t, this.max) && this._fire("change");
          return;
        default:
          return;
      }
      e.preventDefault();
      const i = t === "low" ? this.low : this.high;
      this._setHandle(t, i + n) && this._fire("change");
    };
  }
  _pct(e) {
    const t = this.max - this.min;
    return t <= 0 ? 0 : (e - this.min) / t * 100;
  }
  _snap(e) {
    const t = Math.round((e - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, t));
  }
  _setHandle(e, t) {
    const n = this._snap(t);
    if (e === "low") {
      const i = Math.min(n, this.high - this.step);
      if (i === this.low) return !1;
      this.low = i;
    } else {
      const i = Math.max(n, this.low + this.step);
      if (i === this.high) return !1;
      this.high = i;
    }
    return !0;
  }
  _xToValue(e) {
    const t = this._track?.getBoundingClientRect();
    if (!t || t.width === 0) return this.min;
    const n = Math.max(0, Math.min(1, (e - t.left) / t.width));
    return this.min + n * (this.max - this.min);
  }
  _fire(e) {
    this.dispatchEvent(
      new CustomEvent(e, {
        detail: { low: this.low, high: this.high },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _fmt(e) {
    return `${e.toFixed(1)}${this.unit}`;
  }
  render() {
    const e = this._pct(this.low), t = this._pct(this.high);
    return v`
      <div class="track" @pointerdown=${this._onTrackPointerDown}>
        <div class="fill" style="left:${e}%; width:${t - e}%"></div>
        <div
          class="thumb ${this._dragging === "low" ? "dragging" : ""}"
          style="left:${e}%"
          tabindex="0"
          role="slider"
          aria-label="Bottom of the range"
          aria-valuemin=${this.min}
          aria-valuemax=${this.high - this.step}
          aria-valuenow=${this.low}
          aria-valuetext=${this._fmt(this.low)}
          @pointerdown=${(n) => this._onThumbPointerDown(n, "low")}
          @keydown=${(n) => this._onKeyDown(n, "low")}
        ></div>
        <div
          class="thumb ${this._dragging === "high" ? "dragging" : ""}"
          style="left:${t}%"
          tabindex="0"
          role="slider"
          aria-label="Top of the range"
          aria-valuemin=${this.low + this.step}
          aria-valuemax=${this.max}
          aria-valuenow=${this.high}
          aria-valuetext=${this._fmt(this.high)}
          @pointerdown=${(n) => this._onThumbPointerDown(n, "high")}
          @keydown=${(n) => this._onKeyDown(n, "high")}
        ></div>
      </div>
      <div class="readout" aria-hidden="true">${this._fmt(this.low)} – ${this._fmt(this.high)}</div>
    `;
  }
};
Ot.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: 16px 12px;
        --thumb-size: 20px;
      }
      .track {
        position: relative;
        height: 6px;
        background: var(--cb-track-bg);
        border-radius: 3px;
        cursor: pointer;
      }
      .fill {
        position: absolute;
        top: 0;
        height: 100%;
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        opacity: 0.6;
        border-radius: 3px;
        pointer-events: none;
      }
      .thumb {
        position: absolute;
        top: 50%;
        width: var(--thumb-size);
        height: var(--thumb-size);
        margin-left: calc(var(--thumb-size) / -2);
        margin-top: calc(var(--thumb-size) / -2);
        background: var(--ha-card-background, #ffffff);
        border: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        cursor: grab;
        touch-action: none;
        transition: transform 0.1s ease;
      }
      .thumb:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 3px;
      }
      .thumb.dragging {
        cursor: grabbing;
        transform: scale(1.15);
      }
      /* The chosen band, read as one range under the middle of the track.
         Pinned to the track's ends, the two values read as the slider's
         scale; under each handle, they collide on a phone when the handles
         are close, as their width doesn't scale with the track. */
      .readout {
        margin-top: 14px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
      }
    `
];
an([
  P({ type: Number })
], Ot.prototype, "min", 2);
an([
  P({ type: Number })
], Ot.prototype, "max", 2);
an([
  P({ type: Number })
], Ot.prototype, "step", 2);
an([
  P({ type: Number })
], Ot.prototype, "low", 2);
an([
  P({ type: Number })
], Ot.prototype, "high", 2);
an([
  P({ type: String })
], Ot.prototype, "unit", 2);
an([
  q()
], Ot.prototype, "_dragging", 2);
an([
  Di(".track")
], Ot.prototype, "_track", 2);
Ot = an([
  Ie("dual-handle-slider")
], Ot);
var tp = Object.defineProperty, np = Object.getOwnPropertyDescriptor, Li = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? np(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && tp(t, n, o), o;
};
const ip = 16, op = 26, rr = 0.5, Ws = 3;
let xn = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._heldRange = null, this._chain = Promise.resolve(), this._onInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onChange = (e) => {
      if (this._pendingLow = null, this._pendingHigh = null, !this.hass || !this.zone) return;
      const t = this.hass, n = {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high,
        hours: Ws
      };
      this._chain = this._chain.then(() => Ol(t, n)).catch(() => {
      });
    };
  }
  render() {
    if (!this.hass || !this.entities) return T;
    const e = Go(this.hass, this.entities), t = xl(this.hass, this.entities.manualLow), n = xl(this.hass, this.entities.manualHigh), i = sp(e.band.low, e.band.high, t, n), o = this._pendingLow ?? i.low, s = this._pendingHigh ?? i.high, a = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(ip, Math.floor(i.low)),
      max: Math.max(op, Math.ceil(i.high))
    };
    this._heldRange = a;
    const u = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${Ws} hours, then the schedule takes over again.` : `Sets this room’s range for ${Ws} hours.`;
    return v`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${u}</div>
        <dual-handle-slider
          .min=${a.min}
          .max=${a.max}
          .step=${rr}
          .low=${o}
          .high=${s}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
};
xn.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-sm) 0;
      }
      .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .desc {
        margin: 4px 0 var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
        line-height: 1.35;
      }
    `
];
Li([
  P({ attribute: !1 })
], xn.prototype, "hass", 2);
Li([
  P({ type: String })
], xn.prototype, "zone", 2);
Li([
  P({ attribute: !1 })
], xn.prototype, "entities", 2);
Li([
  q()
], xn.prototype, "_pendingLow", 2);
Li([
  q()
], xn.prototype, "_pendingHigh", 2);
xn = Li([
  Ie("comfort-band-exact-range")
], xn);
function xl(e, t) {
  const n = t !== null ? e.states[t] : void 0;
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function sp(e, t, n, i) {
  let o = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, s = t) : Number.isFinite(n) && Number.isFinite(i) && (o = n, s = i), o = Math.round(o * 10) / 10, s = Math.round(s * 10) / 10, s - o < rr && (s = o + rr), { low: o, high: s };
}
var rp = Object.defineProperty, ap = Object.getOwnPropertyDescriptor, Fi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ap(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && rp(t, n, o), o;
};
let $n = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._historyOpen = !1, this._diagnosticsOpen = !1;
  }
  _state(e) {
    return e !== null ? this.hass?.states[e]?.state : void 0;
  }
  _comfortSummary() {
    const e = this._state(this.entities?.useApparentTemperature ?? null);
    return e === "on" ? "“Feels like” on" : e === "off" ? "“Feels like” off" : "";
  }
  _automationSummary() {
    const e = this._state(this.entities?.enabled ?? null), t = this._state(this.entities?.learningEnabled ?? null);
    return [
      e === "on" ? "Controlling" : e === "off" ? "Paused" : "",
      t === "on" ? "learning on" : t === "off" ? "learning off" : ""
    ].filter(Boolean).join(" · ").replace(/^l/, "L");
  }
  /** "Fan control on", "Peak saving off": a section led by one switch. */
  _switchSummary(e, t) {
    const n = this._state(this.entities?.[e] ?? null);
    return n === "on" ? `${t} on` : n === "off" ? `${t} off` : "";
  }
  _schedulesSummary() {
    if (!this.hass) return "";
    const e = co(this.hass), t = e !== null ? this.hass.states[e] : void 0;
    if (!Fo(t))
      return gr(this.hass) ? "Not available right now" : "No profiles set up";
    const n = t.state;
    return !n || n === "unknown" ? "" : `Profile: ${n}`;
  }
  _section(e, t, n, i, o) {
    return v`
      <details
        data-section=${e}
        @toggle=${o ? (s) => o(s.target.open) : T}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${n ? v`<span class="summary">${n}</span>` : T}
          </span>
        </summary>
        <div class="content">${i}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? T : v`
      ${this._section(
      "comfort",
      "Comfort",
      this._comfortSummary(),
      v`<comfort-band-settings-tab
            section="comfort"
            .hass=${this.hass}
            .entities=${this.entities}
          ></comfort-band-settings-tab>
          <comfort-band-exact-range
            .hass=${this.hass}
            .zone=${this.zone}
            .entities=${this.entities}
          ></comfort-band-exact-range>`
    )}
      ${this._section(
      "automation",
      "Automation",
      this._automationSummary(),
      v`<comfort-band-settings-tab
          section="automation"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "fan",
      "Fan",
      this._switchSummary("fanControlEnabled", "Fan control"),
      v`<comfort-band-settings-tab
          section="fan"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "peak",
      "Peak saving",
      this._switchSummary("peakSavingEnabled", "Peak saving"),
      v`<comfort-band-settings-tab
          section="peak"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "schedules",
      "Schedules",
      this._schedulesSummary(),
      v`<comfort-band-settings-tab
            section="schedules"
            .hass=${this.hass}
            .entities=${this.entities}
          ></comfort-band-settings-tab>
          <h3 class="subhead">Profiles</h3>
          <comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`
    )}
      ${this._section(
      "diagnostics",
      "Diagnostics",
      mh(jl(this.hass, this.entities)),
      this._diagnosticsOpen ? v`<comfort-band-diagnostics-tab
              .hass=${this.hass}
              .zone=${this.zone}
              .entities=${this.entities}
            ></comfort-band-diagnostics-tab>` : T,
      (e) => this._diagnosticsOpen = e
    )}
      ${this._section(
      "history",
      "History",
      "Last 24 hours",
      this._historyOpen ? v`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : T,
      (e) => this._historyOpen = e
    )}
    `;
  }
};
$n.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-sm) var(--cb-gap-md) var(--cb-gap-md);
      }
      details {
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      /* "Profiles", under Schedules after "Follows". */
      .subhead {
        margin: var(--cb-gap-md) 0 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      details:last-of-type {
        border-bottom: none;
      }
      summary {
        display: flex;
        align-items: center;
        padding: 10px 0;
        /* WCAG 2.5.5: 44px touch target. */
        min-height: 44px;
        box-sizing: border-box;
        cursor: pointer;
      }
      /* A flex summary loses the browser's own marker, so draw one: a chevron
         that turns down when the section is open. */
      summary {
        list-style: none;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      summary::before {
        content: '';
        align-self: center;
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 6px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details[open] > summary::before {
        transform: rotate(45deg);
      }
      summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      /* The name and summary wrap together, beside the chevron. */
      .label {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0 var(--cb-gap-sm);
        min-width: 0;
      }
      .name {
        font-size: 15px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      .summary {
        min-width: 0;
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .content {
        padding-bottom: var(--cb-gap-md);
      }
    `
];
Fi([
  P({ attribute: !1 })
], $n.prototype, "hass", 2);
Fi([
  P({ type: String })
], $n.prototype, "zone", 2);
Fi([
  P({ attribute: !1 })
], $n.prototype, "entities", 2);
Fi([
  q()
], $n.prototype, "_historyOpen", 2);
Fi([
  q()
], $n.prototype, "_diagnosticsOpen", 2);
$n = Fi([
  Ie("comfort-band-advanced-tab")
], $n);
var lp = Object.defineProperty, cp = Object.getOwnPropertyDescriptor, An = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? cp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && lp(t, n, o), o;
};
const Rn = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "advanced", label: "Advanced" }
];
let Gt = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Rn.findIndex((o) => o.id === this._activeTab);
      if (t < 0) return;
      let n;
      switch (e.key) {
        case "ArrowLeft":
          n = (t - 1 + Rn.length) % Rn.length;
          break;
        case "ArrowRight":
          n = (t + 1) % Rn.length;
          break;
        case "Home":
          n = 0;
          break;
        case "End":
          n = Rn.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const i = Rn[n].id;
      this._activeTab = i, this.updateComplete.then(() => {
        this.renderRoot.querySelector(`#cb-tab-${i}`)?.focus();
      });
    };
  }
  /** Opens on Now, whichever tab it was left on: the family's tap shouldn't
   *  land on Advanced because someone set the house up last. */
  open() {
    this._activeTab = "now", this._isOpen = !0, this.updateComplete.then(() => this._dialog?.showModal());
  }
  close() {
    this._dialog?.close();
  }
  selectTab(e) {
    this._activeTab = e;
  }
  render() {
    if (!this._isOpen) return T;
    const e = this.zoneName || this.zone || "Comfort Band";
    return v`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Rn.map(
      (t) => v`
                <button
                  id="cb-tab-${t.id}"
                  role="tab"
                  aria-selected=${this._activeTab === t.id}
                  aria-controls="cb-panel"
                  tabindex=${this._activeTab === t.id ? 0 : -1}
                  @click=${() => this._onSelectTab(t.id)}
                >
                  ${t.label}
                </button>
              `
    )}
          </nav>
          <div
            id="cb-panel"
            class="panel"
            role="tabpanel"
            aria-labelledby="cb-tab-${this._activeTab}"
          >
            ${this._renderTab()}
          </div>
        </div>
      </dialog>
    `;
  }
  _renderTab() {
    switch (this._activeTab) {
      case "now":
        return v`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return v`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-schedule-tab>`;
      case "advanced":
        return v`<comfort-band-advanced-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-advanced-tab>`;
    }
  }
};
Gt.styles = [
  Ue,
  De`
      :host {
        --cb-modal-max-width: 480px;
      }
      dialog {
        width: min(90vw, var(--cb-modal-max-width));
        max-height: min(90vh, 720px);
        /* Anchored to the top rather than centred. A modal <dialog> is centred
           on its own height by default, and every tab is a different height,
           so switching tabs moved the whole dialog -- tab bar included -- out
           from under the finger that had just tapped it. With the top fixed,
           only the bottom edge moves. */
        margin-block: max(16px, 5vh) auto;
        padding: 0;
        border: none;
        border-radius: var(--cb-radius-card);
        /* Use --card-background-color (general HA surface), NOT
           --ha-card-background, so the dialog stays readable when the
           parent card has a transparent-bg theme override (e.g. a
           picture-elements floorplan overlay). */
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--cb-text-primary);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        overflow: hidden;
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.4);
      }
      .frame {
        display: flex;
        flex-direction: column;
        max-height: inherit;
      }
      header {
        /* Header and tab bar keep their height; only the panel scrolls. As
           flex items they would otherwise shrink when a tall panel hits the
           dialog's max-height, and the nav's overflow-x then clipped the tab
           labels in half. */
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--cb-gap-md);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      header h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      .close {
        font: inherit;
        font-size: 22px;
        line-height: 1;
        background: transparent;
        border: none;
        color: var(--cb-text-secondary);
        cursor: pointer;
        padding: 4px 8px;
      }
      nav {
        flex-shrink: 0;
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        overflow-x: auto;
      }
      nav button {
        font: inherit;
        font-size: 13px;
        padding: 10px 14px;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: var(--cb-text-secondary);
        cursor: pointer;
        white-space: nowrap;
      }
      nav button[aria-selected='true'] {
        color: var(--cb-accent, var(--primary-color, #03a9f4));
        border-bottom-color: var(--cb-accent, var(--primary-color, #03a9f4));
      }
      .panel {
        overflow-y: auto;
        flex: 1;
      }
      .placeholder {
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
      }
    `
];
An([
  P({ attribute: !1 })
], Gt.prototype, "hass", 2);
An([
  P({ type: String })
], Gt.prototype, "zone", 2);
An([
  P({ type: String })
], Gt.prototype, "zoneName", 2);
An([
  P({ attribute: !1 })
], Gt.prototype, "entities", 2);
An([
  q()
], Gt.prototype, "_activeTab", 2);
An([
  q()
], Gt.prototype, "_isOpen", 2);
An([
  Di("dialog")
], Gt.prototype, "_dialog", 2);
Gt = An([
  Ie("comfort-band-modal")
], Gt);
var up = Object.defineProperty, hp = Object.getOwnPropertyDescriptor, Pr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && up(t, n, o), o;
};
let fo = class extends Te {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (e) => {
      const t = e.target.value;
      this._fireConfig({ ...this.config, zone: t });
    }, this._onNameChange = (e) => {
      const t = e.target, n = t.value.trim();
      t.value = n;
      const i = { ...this.config };
      n ? i.name = n : delete i.name, this._fireConfig(i);
    }, this._onCompactChange = (e) => {
      const t = e.target.checked, n = { ...this.config };
      t ? n.compact = !0 : delete n.compact, this._fireConfig(n);
    }, this._onVariantChange = (e) => {
      const t = e.target.value, n = { ...this.config };
      t === "mini" ? n.variant = "mini" : delete n.variant, this._fireConfig(n);
    };
  }
  setConfig(e) {
    this.config = {
      type: e.type ?? "custom:comfort-band-card",
      zone: e.zone ?? "",
      ...e.name != null ? { name: e.name } : {},
      ...e.compact !== void 0 ? { compact: e.compact } : {},
      ...e.variant !== void 0 ? { variant: e.variant } : {}
    };
  }
  _availableZones() {
    if (!this.hass) return [];
    const e = [];
    for (const t of Object.values(this.hass.devices))
      for (const [n, i] of t.identifiers)
        n === "comfort_band" && i.startsWith("zone:") && e.push(i.slice(5));
    return e.sort();
  }
  /** The name the card shows when `name` is unset, used as the placeholder. */
  _defaultName() {
    if (!this.hass || !this.config.zone) return "";
    const e = Fl(this.hass, this.config.zone);
    return Rl(this.hass, { zone: this.config.zone }, e);
  }
  _fireConfig(e) {
    this.config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    const e = this._availableZones();
    if (e.length === 0)
      return v`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return v`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? v`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (n) => v` <option value=${n} ?selected=${n === this.config.zone}>${n}</option> `
    )}
        </select>
      </label>
      <label>
        Name (optional)
        <input
          type="text"
          .value=${this.config.name ?? ""}
          placeholder=${this._defaultName()}
          @change=${this._onNameChange}
        />
      </label>
      <label>
        Variant
        <select @change=${this._onVariantChange} .value=${t}>
          <option value="tile" ?selected=${t === "tile"}>Tile (default)</option>
          <option value="mini" ?selected=${t === "mini"}>
            Mini (small chip, for floorplans)
          </option>
        </select>
      </label>
      <label class="checkbox-row">
        <input
          type="checkbox"
          .checked=${this.config.compact === !0}
          @change=${this._onCompactChange}
        />
        Compact mode (tile only, no expand on tap)
      </label>
    `;
  }
};
fo.styles = [
  Ue,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      select,
      input[type='text'],
      input[type='checkbox'] {
        font: inherit;
      }
      input[type='text'] {
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--cb-text-primary);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
      }
      input[type='text']:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      /* Native <select> picks up OS chrome in many browsers, which
         bypasses theme variables. appearance:none strips the chrome
         so the theme-aware bg/text colors actually take. */
      select {
        font-size: 14px;
        padding: 8px 32px 8px 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--cb-text-primary);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
        background-image:
          linear-gradient(45deg, transparent 50%, currentColor 50%),
          linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position:
          calc(100% - 18px) 50%,
          calc(100% - 12px) 50%;
        background-size:
          6px 6px,
          6px 6px;
        background-repeat: no-repeat;
        cursor: pointer;
        width: 100%;
      }
      select:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 1px;
      }
      /* Browsers vary in how much they let us style options, but set
         theme-aware defaults so most cases are readable in dark mode. */
      option {
        background-color: var(--card-background-color, #ffffff);
        color: var(--cb-text-primary);
      }
      .checkbox-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .empty {
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
    `
];
Pr([
  P({ attribute: !1 })
], fo.prototype, "hass", 2);
Pr([
  P({ attribute: !1 })
], fo.prototype, "config", 2);
fo = Pr([
  Ie("comfort-band-card-editor")
], fo);
var dp = Object.defineProperty, fp = Object.getOwnPropertyDescriptor, is = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? fp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && dp(t, n, o), o;
};
let Ei = class extends Te {
  constructor() {
    super(...arguments), this._onTileTap = () => {
      this._modal?.open();
    };
  }
  setConfig(e) {
    if (!e?.zone)
      throw new Error("comfort-band-card: `zone` is required");
    const t = e.name;
    if (typeof t == "number") e = { ...e, name: String(t) };
    else if (t != null && typeof t != "string")
      throw new Error("comfort-band-card: `name` must be text");
    this._config = e;
  }
  /** HA's panel/grid uses this to size the card. ~1 row per ~50 px of content. */
  getCardSize() {
    return this._config?.variant === "mini" ? 1 : 2;
  }
  /** HA dashboard editor: tells HA which custom element to render as the
   *  visual config UI. Returning the element directly (not a string) is
   *  the modern API. */
  static getConfigElement() {
    return document.createElement("comfort-band-card-editor");
  }
  /** Default config seed when the user adds the card via "Add card" in the
   *  dashboard editor. Picks the first registered Comfort Band zone, if any. */
  static getStubConfig(e) {
    let t = "";
    if (e)
      for (const n of Object.values(e.devices)) {
        for (const [i, o] of n.identifiers)
          if (i === "comfort_band" && o.startsWith("zone:")) {
            t = o.slice(5);
            break;
          }
        if (t) break;
      }
    return { type: "custom:comfort-band-card", zone: t };
  }
  render() {
    if (!this._config || !this.hass) return v``;
    const e = this._config.zone, t = Fl(this.hass, e);
    if (t.deviceId === null)
      return v`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const n = this._config.compact === !0, i = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return v`
      <comfort-band-tile
        zoneName=${o.zoneName}
        .temperature=${o.temperature}
        .feelsLike=${o.feelsLike}
        .low=${o.low}
        .high=${o.high}
        .action=${o.action}
        .statusKind=${o.statusKind}
        .statusText=${o.statusText}
        .badges=${o.badges}
        .noExpand=${n}
        .variant=${i}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${n ? null : v`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const n = Go(e, t), i = Nl({
      ...n,
      doing: null,
      now: Date.now(),
      formatTime: (o) => Vo(o, e)
    });
    return {
      zoneName: Rl(e, this._config, t),
      temperature: n.temperature,
      feelsLike: n.feelsLike,
      low: n.band.low,
      high: n.band.high,
      action: fr(n) ? n.action : "unknown",
      statusKind: i.kind,
      statusText: i.text,
      badges: Bu(n)
    };
  }
};
Ei.styles = [
  Ue,
  De`
      :host {
        display: block;
      }
      .placeholder {
        padding: var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        color: var(--cb-text-secondary);
        font-family: var(--paper-font-body1_-_font-family, sans-serif);
        font-size: 13px;
      }
    `
];
is([
  P({ attribute: !1 })
], Ei.prototype, "hass", 2);
is([
  q()
], Ei.prototype, "_config", 2);
is([
  Di("comfort-band-modal")
], Ei.prototype, "_modal", 2);
Ei = is([
  Ie("comfort-band-card")
], Ei);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.18.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
