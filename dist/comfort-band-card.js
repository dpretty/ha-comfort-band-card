const Eo = globalThis, tr = Eo.ShadowRoot && (Eo.ShadyCSS === void 0 || Eo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nr = Symbol(), oa = /* @__PURE__ */ new WeakMap();
let ml = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== nr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (tr && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = oa.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && oa.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ir = (e) => new ml(typeof e == "string" ? e : e + "", void 0, nr), Pe = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new ml(n, e, nr);
}, tu = (e, t) => {
  if (tr) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = Eo.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, sa = tr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return ir(n);
})(e) : e;
const { is: nu, defineProperty: iu, getOwnPropertyDescriptor: ou, getOwnPropertyNames: su, getOwnPropertySymbols: ru, getPrototypeOf: au } = Object, Ro = globalThis, ra = Ro.trustedTypes, lu = ra ? ra.emptyScript : "", cu = Ro.reactiveElementPolyfillSupport, Xi = (e, t) => e, Mo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? lu : null;
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
} }, or = (e, t) => !nu(e, t), aa = { attribute: !0, type: String, converter: Mo, reflect: !1, useDefault: !1, hasChanged: or };
Symbol.metadata ??= Symbol("metadata"), Ro.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let _i = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = aa) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && iu(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = ou(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const c = o?.call(this);
      s?.call(this, a), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? aa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Xi("elementProperties"))) return;
    const t = au(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Xi("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Xi("properties"))) {
      const n = this.properties, i = [...su(n), ...ru(n)];
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
      for (const o of i) n.unshift(sa(o));
    } else t !== void 0 && n.push(sa(t));
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
    return tu(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Mo).toAttribute(n, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Mo;
      this._$Em = o;
      const c = a.fromAttribute(n, s.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? or)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
        const { wrapped: a } = s, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, s, c);
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
_i.elementStyles = [], _i.shadowRootOptions = { mode: "open" }, _i[Xi("elementProperties")] = /* @__PURE__ */ new Map(), _i[Xi("finalized")] = /* @__PURE__ */ new Map(), cu?.({ ReactiveElement: _i }), (Ro.reactiveElementVersions ??= []).push("2.1.2");
const sr = globalThis, la = (e) => e, No = sr.trustedTypes, ca = No ? No.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, gl = "$lit$", mn = `lit$${Math.random().toFixed(9).slice(2)}$`, bl = "?" + mn, uu = `<${bl}>`, Un = document, no = () => Un.createComment(""), io = (e) => e === null || typeof e != "object" && typeof e != "function", rr = Array.isArray, hu = (e) => rr(e) || typeof e?.[Symbol.iterator] == "function", $s = `[ 	
\f\r]`, Gi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ua = /-->/g, ha = />/g, On = RegExp(`>|${$s}(?:([^\\s"'>=/]+)(${$s}*=${$s}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), da = /'/g, fa = /"/g, _l = /^(?:script|style|textarea|title)$/i, vl = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), v = vl(1), gn = vl(2), xi = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), pa = /* @__PURE__ */ new WeakMap(), Bn = Un.createTreeWalker(Un, 129);
function yl(e, t) {
  if (!rr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ca !== void 0 ? ca.createHTML(t) : t;
}
const du = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Gi;
  for (let c = 0; c < n; c++) {
    const d = e[c];
    let f, g, m = -1, _ = 0;
    for (; _ < d.length && (a.lastIndex = _, g = a.exec(d), g !== null); ) _ = a.lastIndex, a === Gi ? g[1] === "!--" ? a = ua : g[1] !== void 0 ? a = ha : g[2] !== void 0 ? (_l.test(g[2]) && (o = RegExp("</" + g[2], "g")), a = On) : g[3] !== void 0 && (a = On) : a === On ? g[0] === ">" ? (a = o ?? Gi, m = -1) : g[1] === void 0 ? m = -2 : (m = a.lastIndex - g[2].length, f = g[1], a = g[3] === void 0 ? On : g[3] === '"' ? fa : da) : a === fa || a === da ? a = On : a === ua || a === ha ? a = Gi : (a = On, o = void 0);
    const $ = a === On && e[c + 1].startsWith("/>") ? " " : "";
    s += a === Gi ? d + uu : m >= 0 ? (i.push(f), d.slice(0, m) + gl + d.slice(m) + mn + $) : d + mn + (m === -2 ? c : $);
  }
  return [yl(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class oo {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const c = t.length - 1, d = this.parts, [f, g] = du(t, n);
    if (this.el = oo.createElement(f, i), Bn.currentNode = this.el.content, n === 2 || n === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = Bn.nextNode()) !== null && d.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(gl)) {
          const _ = g[a++], $ = o.getAttribute(m).split(mn), C = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: s, name: C[2], strings: $, ctor: C[1] === "." ? pu : C[1] === "?" ? mu : C[1] === "@" ? gu : Bo }), o.removeAttribute(m);
        } else m.startsWith(mn) && (d.push({ type: 6, index: s }), o.removeAttribute(m));
        if (_l.test(o.tagName)) {
          const m = o.textContent.split(mn), _ = m.length - 1;
          if (_ > 0) {
            o.textContent = No ? No.emptyScript : "";
            for (let $ = 0; $ < _; $++) o.append(m[$], no()), Bn.nextNode(), d.push({ type: 2, index: ++s });
            o.append(m[_], no());
          }
        }
      } else if (o.nodeType === 8) if (o.data === bl) d.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(mn, m + 1)) !== -1; ) d.push({ type: 7, index: s }), m += mn.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = Un.createElement("template");
    return i.innerHTML = t, i;
  }
}
function $i(e, t, n = e, i) {
  if (t === xi) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = io(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = $i(e, o._$AS(e, t.values), o, i)), t;
}
class fu {
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
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? Un).importNode(n, !0);
    Bn.currentNode = o;
    let s = Bn.nextNode(), a = 0, c = 0, d = i[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let f;
        d.type === 2 ? f = new lo(s, s.nextSibling, this, t) : d.type === 1 ? f = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (f = new bu(s, this, t)), this._$AV.push(f), d = i[++c];
      }
      a !== d?.index && (s = Bn.nextNode(), a++);
    }
    return Bn.currentNode = Un, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class lo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = $i(this, t, n), io(t) ? t === P || t == null || t === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : t !== this._$AH && t !== xi && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : hu(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== P && io(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Un.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = oo.createElement(yl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new fu(o, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = pa.get(t.strings);
    return n === void 0 && pa.set(t.strings, n = new oo(t)), n;
  }
  k(t) {
    rr(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new lo(this.O(no()), this.O(no()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = la(t).nextSibling;
      la(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Bo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = P;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = $i(this, t, n, 0), a = !io(t) || t !== this._$AH && t !== xi, a && (this._$AH = t);
    else {
      const c = t;
      let d, f;
      for (t = s[0], d = 0; d < s.length - 1; d++) f = $i(this, c[i + d], n, d), f === xi && (f = this._$AH[d]), a ||= !io(f) || f !== this._$AH[d], f === P ? t = P : t !== P && (t += (f ?? "") + s[d + 1]), this._$AH[d] = f;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pu extends Bo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === P ? void 0 : t;
  }
}
class mu extends Bo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== P);
  }
}
class gu extends Bo {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = $i(this, t, n, 0) ?? P) === xi) return;
    const i = this._$AH, o = t === P && i !== P || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== P && (i === P || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class bu {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    $i(this, t);
  }
}
const _u = sr.litHtmlPolyfillSupport;
_u?.(oo, lo), (sr.litHtmlVersions ??= []).push("3.3.2");
const vu = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new lo(t.insertBefore(no(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const ar = globalThis;
class Ce extends _i {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = vu(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return xi;
  }
}
Ce._$litElement$ = !0, Ce.finalized = !0, ar.litElementHydrateSupport?.({ LitElement: Ce });
const yu = ar.litElementPolyfillSupport;
yu?.({ LitElement: Ce });
(ar.litElementVersions ??= []).push("4.2.2");
const Ie = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const wu = { attribute: !0, type: String, converter: Mo, reflect: !1, hasChanged: or }, xu = (e = wu, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(c) {
      const d = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, d, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(c) {
      const d = this[a];
      t.call(this, c), this.requestUpdate(a, d, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function N(e) {
  return (t, n) => typeof n == "object" ? xu(e, t, n) : ((i, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function Q(e) {
  return N({ ...e, state: !0, attribute: !1 });
}
const $u = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function Pi(e, t) {
  return (n, i, o) => {
    const s = (a) => a.renderRoot?.querySelector(e) ?? null;
    return $u(n, i, { get() {
      return s(this);
    } });
  };
}
const Ue = Pe`
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
function wl(e) {
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
function ku(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
var Su = Object.defineProperty, Au = Object.getOwnPropertyDescriptor, Gn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Au(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Su(t, n, o), o;
};
const Bs = 15, xl = 28, Cu = xl - Bs;
function ks(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(Bs, Math.min(xl, e)) - Bs) / Cu * 100;
}
let en = class extends Ce {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = ku(this.action), t = wl(e), n = Number.isFinite(this.low), i = Number.isFinite(this.high), o = Number.isFinite(this.room), s = n ? ks(this.low) : 0, a = i ? ks(this.high) : 100, c = Math.min(s, a), d = Math.max(0, Math.abs(a - s)), f = o ? ks(this.room) : 50, g = ($) => Number.isFinite($) ? `${$.toFixed(1)}°` : "—", m = e === "heating" || e === "cooling" ? `, ${e}` : "", _ = `Comfortable range ${g(this.low)} to ${g(this.high)}, ${this.roomLabel} ${g(this.room)}${m}`;
    return v`
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        role=${this.decorative ? P : "img"}
        aria-label=${this.decorative ? P : _}
        aria-hidden=${this.decorative ? "true" : P}
      >
        ${gn`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${n && i ? gn`<rect class="band" x=${c} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${o ? gn`<circle cx=${f} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${o ? gn`<circle class="marker-ring" cx=${f} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
en.styles = [
  Ue,
  Pe`
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
Gn([
  N({ type: Number })
], en.prototype, "low", 2);
Gn([
  N({ type: Number })
], en.prototype, "high", 2);
Gn([
  N({ type: Number })
], en.prototype, "room", 2);
Gn([
  N({ type: String })
], en.prototype, "roomLabel", 2);
Gn([
  N({ type: Boolean })
], en.prototype, "decorative", 2);
Gn([
  N({ type: String })
], en.prototype, "action", 2);
en = Gn([
  Ie("band-gauge")
], en);
const Tu = 0.5, Eu = 10, Pu = 35;
function ki(e) {
  return `${bn(e.low)}–${bn(e.high)}°`;
}
function bn(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function wo(e, t) {
  let n = t * Tu;
  return n > 0 && (n = Math.max(0, Math.min(n, Pu - e.high))), n < 0 && (n = Math.min(0, Math.max(n, Eu - e.low))), { low: ma(e.low + n), high: ma(e.high + n) };
}
function ma(e) {
  return Math.round(e * 10) / 10;
}
function $l(e) {
  const { room: t, apparent: n, useApparent: i } = e, o = Number.isFinite(t) && Number.isFinite(n) && js(n) !== js(t);
  return i && Number.isFinite(n) ? {
    value: n,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${n.toFixed(1)}°` : "" };
}
function js(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function kl(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const n = js(e);
  return n < Math.round(t.low * 10) ? "below" : n > Math.round(t.high * 10) ? "above" : "in";
}
const Du = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function Sl(e) {
  if (e.doing) return { kind: "adjusting", text: e.doing };
  if (!e.enabled) return { kind: "paused", text: "Paused: not controlling this room" };
  if (e.sensor === "offline")
    return { kind: "sensor", text: "On hold: the room sensor is offline" };
  if (e.sensor === "no-reading")
    return { kind: "sensor", text: "On hold: no room temperature reading" };
  const t = Mu(e);
  return e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${t.text}` } : t;
}
function Mu(e) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const t = kl(e.temperature, e.band), n = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? t === "in" ? "comfortable" : t ?? "idle" : "none", i = Du[n];
  let o;
  if (e.overrideActive) {
    const a = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    o = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${ki(e.band)}${a}`;
  } else {
    const a = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    o = `${ki(e.band)}${a}`;
  }
  const s = i ? `${i} · ${o}` : o.charAt(0).toUpperCase() + o.slice(1);
  return { kind: n, text: s };
}
function jo(e, t) {
  const n = new Date(e), i = t?.locale?.time_format, o = t?.locale?.language;
  let s;
  if (i === "12") s = !0;
  else if (i === "24") s = !1;
  else {
    const c = new Intl.DateTimeFormat(i === "system" ? void 0 : o, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    s = c === "h11" || c === "h12";
  }
  const a = {
    hourCycle: s ? "h12" : "h23",
    hour: s ? "numeric" : "2-digit"
  };
  return (!s || n.getMinutes() !== 0) && (a.minute = "2-digit"), new Intl.DateTimeFormat(o, a).format(n);
}
function ga(e, t) {
  const n = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!n) return e;
  const i = Number(n[1]), o = Number(n[2]);
  return i > 23 || o > 59 ? e : jo(new Date(2e3, 0, 1, i, o).getTime(), t);
}
function Zt(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function xo(e, t) {
  const n = Zt(e, t);
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function Al(e, t) {
  const n = Zt(e, t.nextBandChange);
  if (!n) return { scheduled: null, nextChange: null };
  const i = n.attributes.scheduled, o = Date.parse(n.state);
  return {
    scheduled: typeof i == "boolean" ? i : null,
    nextChange: Number.isNaN(o) ? null : o
  };
}
function lr(e, t) {
  const n = xo(e, t.roomTemperature), i = xo(e, t.apparentTemperature), o = Zt(e, t.useApparentTemperature)?.state === "on", s = Date.parse(Zt(e, t.overrideEnds)?.state ?? ""), a = Zt(e, t.roomTemperature)?.attributes.source, c = a === "climate" || a === "fallback_sensor" ? a : null, d = Zt(e, t.roomSensorUnavailable)?.state === "on" || c !== null, f = Number.isFinite(n) || Number.isFinite(i);
  return {
    enabled: Zt(e, t.enabled)?.state !== "off",
    action: Zt(e, t.currentAction)?.state ?? "unknown",
    room: n,
    apparent: i,
    useApparent: o,
    temperature: $l({ room: n, apparent: i, useApparent: o }).value,
    feelsLike: o && Number.isFinite(i),
    band: {
      low: xo(e, t.effectiveLow),
      high: xo(e, t.effectiveHigh)
    },
    overrideActive: Zt(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...Al(e, t),
    sensor: d ? f ? "stand-in" : "offline" : f ? "ok" : "no-reading",
    standIn: c
  };
}
function cr(e) {
  return e.enabled && (e.sensor === "ok" || e.sensor === "stand-in");
}
const fn = {
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
}, Nu = {
  paused: fn.paused,
  sensor: fn.sensor,
  heating: fn.heating,
  cooling: fn.cooling,
  below: fn.below,
  above: fn.above,
  adjusted: "mdi:timer-outline"
};
function zu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !cr(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const n = kl(e.temperature, e.band);
    (n === "below" || n === "above") && t.push(n);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function Ou(e) {
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
var Lu = Object.defineProperty, Hu = Object.getOwnPropertyDescriptor, $t = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Hu(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Lu(t, n, o), o;
};
let ot = class extends Ce {
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
            ${this.feelsLike ? v`<span class="sr-only"> feels like </span>` : P}${this._renderTemperature()}<span class="sr-only">. </span>
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
              <ha-icon icon=${fn[this.statusKind]} aria-hidden="true"></ha-icon>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${wl(e)}` : "", n = this._label();
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
              icon=${Nu[i]}
              data-badge=${i}
              aria-hidden="true"
            ></ha-icon>`
    )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
};
ot.styles = [
  Ue,
  Pe`
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
$t([
  N({ type: String })
], ot.prototype, "zoneName", 2);
$t([
  N({ type: Number })
], ot.prototype, "temperature", 2);
$t([
  N({ type: Boolean })
], ot.prototype, "feelsLike", 2);
$t([
  N({ type: Number })
], ot.prototype, "low", 2);
$t([
  N({ type: Number })
], ot.prototype, "high", 2);
$t([
  N({ type: String })
], ot.prototype, "action", 2);
$t([
  N({ type: String })
], ot.prototype, "statusKind", 2);
$t([
  N({ type: String })
], ot.prototype, "statusText", 2);
$t([
  N({ attribute: !1 })
], ot.prototype, "badges", 2);
$t([
  N({ type: Boolean })
], ot.prototype, "noExpand", 2);
$t([
  N({ type: String, reflect: !0 })
], ot.prototype, "variant", 2);
ot = $t([
  Ie("comfort-band-tile")
], ot);
const nn = "comfort_band";
function Fu(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Ru(e, t) {
  return e.callService(nn, "set_schedule", { ...t });
}
function Cl(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), e.callService(nn, "start_override", n);
}
function Bu(e, t) {
  return e.callService(nn, "cancel_override", { ...t });
}
function ju(e, t) {
  return e.callService(nn, "set_profile", { ...t });
}
function Iu(e, t) {
  const n = { name: t.name };
  return t.description !== void 0 && (n.description = t.description), e.callService(nn, "create_profile", n);
}
function Uu(e, t) {
  const n = { source: t.source, target: t.target };
  return t.description !== void 0 && (n.description = t.description), e.callService(nn, "clone_profile", n);
}
function Wu(e, t) {
  return e.callService(nn, "rename_profile", { old: t.old, new: t.new });
}
function Vu(e, t) {
  return e.callService(nn, "delete_profile", { name: t.name });
}
function Gu(e, t) {
  return e.callService(nn, "record_feedback", { zone: t.zone, label: t.label });
}
var Ku = Object.defineProperty, Yu = Object.getOwnPropertyDescriptor, xn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Yu(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Ku(t, n, o), o;
};
const qu = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], Zu = 1500, Ju = 1500, Qu = 3;
let Wt = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this._feedbackConfirmed = null, this._feedbackTimer = null, this._feedbackSeq = 0, this._length = null, this._burst = null, this._burstTimer = null, this._busy = null, this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const o = this._bandInForce();
        if (!o) return;
        t = { base: o, steps: 0, picked: !1 };
      }
      const n = wo(t.base, t.steps), i = wo(t.base, t.steps + e);
      i.low === n.low && i.high === n.high || (this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), Ju));
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
      this._run(n, () => Bu(e, { zone: t }));
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await Gu(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, Zu));
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
    return !this.hass || !this.entities ? { scheduled: null, nextChange: null } : Al(this.hass, this.entities);
  }
  /** The length in force: the one picked here, else three hours. */
  _hours() {
    return this._length ?? Qu;
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
      `Adjusting to ${ki(e)}`,
      () => Cl(n, { zone: i, low: e.low, high: e.high, hours: t })
    );
  }
  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    this._burst = null, e && (e.steps !== 0 ? this._sendBand(wo(e.base, e.steps), this._hours()) : e.picked && this._retime(this._hours()));
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
    if (!this.hass || !this.entities) return P;
    const e = Date.now(), t = lr(this.hass, this.entities), { room: n, apparent: i, useApparent: o, feelsLike: s, overrideActive: a, scheduled: c } = t, { low: d, high: f } = t.band, g = $l({ room: n, apparent: i, useApparent: o }), m = Ou(t), _ = this._burst, $ = _ && _.steps !== 0 ? `Adjusting to ${ki(wo(_.base, _.steps))}` : this._busy, C = Sl({
      ...t,
      doing: $,
      now: e,
      formatTime: (O) => jo(O, this.hass)
    });
    return v`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(g.value) ? `${g.value.toFixed(1)}°` : "—"}</span
        >
        ${g.note ? v`<span class="note">${g.note}</span>` : P}
      </div>
      ${o && !Number.isFinite(i) && Number.isFinite(n) ? v`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : P}
      <div class="gauge-row">
        <band-gauge
          .low=${d}
          .high=${f}
          .room=${g.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${cr(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${C.kind}" role="status" aria-live="polite">
        <ha-icon icon=${fn[C.kind]} aria-hidden="true"></ha-icon>
        <span>${C.text}</span>
      </div>
      ${m ? v`<div class="notice">${m}</div>` : P}
      ${this._renderAdjust(a, c)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const n = this._busy !== null ? "true" : "false", i = this._hours();
    return v`
      <section class="adjust">
        ${t === !1 ? P : v`<h3 id="adjust-for">Adjust for</h3>
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
            </div>` : P}
        ${e && t !== !1 ? v`<button class="back" aria-disabled=${n} @click=${this._onBackToSchedule}>
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>` : P}
      </section>
    `;
  }
  _renderFeedbackSection() {
    return v`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${qu.map(
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
  Pe`
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
xn([
  N({ attribute: !1 })
], Wt.prototype, "hass", 2);
xn([
  N({ type: String })
], Wt.prototype, "zone", 2);
xn([
  N({ attribute: !1 })
], Wt.prototype, "entities", 2);
xn([
  Q()
], Wt.prototype, "_feedbackConfirmed", 2);
xn([
  Q()
], Wt.prototype, "_length", 2);
xn([
  Q()
], Wt.prototype, "_burst", 2);
xn([
  Q()
], Wt.prototype, "_busy", 2);
Wt = xn([
  Ie("comfort-band-now-tab")
], Wt);
var Xu = Object.defineProperty, eh = Object.getOwnPropertyDescriptor, Tl = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? eh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Xu(t, n, o), o;
};
const $o = 14, ko = 28, pi = 600, So = 200, Ss = [0, 6, 12, 18, 24], ba = [14, 18, 22, 26];
function jn(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function th(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
let zo = class extends Ce {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * pi;
  }
  _tempToY(e) {
    const t = th(e, $o, ko);
    return So - (t - $o) / (ko - $o) * So;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const n = e[e.length - 1][t], i = [[0, this._tempToY(n)]];
    let o = n;
    for (const s of e) {
      const a = this._timeToX(jn(s.at));
      i.push([a, this._tempToY(o)]), i.push([a, this._tempToY(s[t])]), o = s[t];
    }
    return i.push([pi, this._tempToY(o)]), i;
  }
  _pointsToPath(e) {
    return e.map(([t, n], i) => `${i === 0 ? "M" : "L"} ${t} ${n}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const n = this._pointsToPath(e), i = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${n} ${i} Z`;
  }
  render() {
    const e = [...this.transitions].sort((c, d) => jn(c.at) - jn(d.at)), t = e.length > 0, n = t ? this._stepPoints(e, "low") : [], i = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(n) : "", s = t ? this._pointsToPath(i) : "", a = t ? this._fillFromPoints(i, n) : "";
    return v`
      <div class="chart">
        <svg
          viewBox="0 0 ${pi} ${So}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${ba.map(
      (c) => gn`<line class="grid" x1="0" x2=${pi} y1=${this._tempToY(c)} y2=${this._tempToY(c)}></line>`
    )}
          ${Ss.map(
      (c) => gn`<line class="grid" y1="0" y2=${So} x1=${c / 24 * pi} x2=${c / 24 * pi}></line>`
    )}
          ${t ? gn`
                <path class="fill" d=${a}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((c) => {
      const d = this._timeToX(jn(c.at));
      return gn`
              <circle class="marker low" cx=${d} cy=${this._tempToY(c.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(c.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${ba.map(
      (c) => v`<div
              class="axis-label y"
              style="top: ${(ko - c) / (ko - $o) * 100}%"
            >
              ${c}°
            </div>`
    )}
        ${Ss.map((c, d) => {
      const f = d === 0 ? "axis-label x start" : d === Ss.length - 1 ? "axis-label x end" : "axis-label x";
      return v`<div class=${f} style="left: ${c / 24 * 100}%">${c}h</div>`;
    })}
      </div>
    `;
  }
};
zo.styles = [
  Ue,
  Pe`
      :host {
        display: block;
        position: relative;
        margin: var(--cb-gap-md) 0;
      }
      .chart {
        position: relative;
        width: 100%;
        height: 200px;
        /* Reserve a left gutter so the Y-axis temperature labels sit
           inside the chart's bounding box. Without this they overflow
           the schedule-tab's 12 px padding and the modal clips their
           leading digit ("25°" rendered as "5°"). */
        padding-left: 32px;
        box-sizing: border-box;
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
      .marker {
        fill: var(--ha-card-background, #ffffff);
        stroke: var(--cb-accent, var(--primary-color, #03a9f4));
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
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
Tl([
  N({ type: Array })
], zo.prototype, "transitions", 2);
zo = Tl([
  Ie("comfort-band-schedule-chart")
], zo);
var nh = Object.defineProperty, ih = Object.getOwnPropertyDescriptor, $n = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ih(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && nh(t, n, o), o;
};
let Vt = class extends Ce {
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
  Pe`
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
$n([
  N({ type: Object })
], Vt.prototype, "transition", 2);
$n([
  N({ type: Boolean })
], Vt.prototype, "isNew", 2);
$n([
  Q()
], Vt.prototype, "_at", 2);
$n([
  Q()
], Vt.prototype, "_low", 2);
$n([
  Q()
], Vt.prototype, "_high", 2);
$n([
  Q()
], Vt.prototype, "_error", 2);
$n([
  Pi('input[name="at"]')
], Vt.prototype, "_atInput", 2);
Vt = $n([
  Ie("transition-edit-dialog")
], Vt);
const Io = "comfort_band", oh = {
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
function sh() {
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
function ur(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function El(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Io
  );
}
function Pl(e, t) {
  const n = sh(), i = ur(e, [Io, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of El(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const a = oh[s];
    a !== void 0 && (n[a] = o.entity_id);
  }
  return n;
}
function Dl(e) {
  return ur(e, [Io, "profile_manager"]) !== null;
}
function hr(e) {
  return e ? !(e.state === "unavailable" && e.attributes.default_profile === void 0) : !1;
}
function Uo(e) {
  const t = ur(e, [Io, "profile_manager"]);
  if (t === null) return null;
  for (const n of El(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
function Ml(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function Nl(e, t, n) {
  const i = t.name?.trim();
  if (i) return i;
  const o = n.deviceId !== null ? e.devices[n.deviceId]?.area_id : null, s = o ? e.areas?.[o]?.name?.trim() : void 0;
  return s || (n.deviceName ?? t.zone);
}
var rh = Object.defineProperty, ah = Object.getOwnPropertyDescriptor, Ot = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ah(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && rh(t, n, o), o;
};
function _a(e, t) {
  return jn(e.at) - jn(t.at);
}
const As = 15, Cs = 24 * 60;
function lh(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((i) => jn(i.at))), n = Math.max(...t);
  for (let i = 1; i <= Cs / As; i++) {
    const o = (n + i * As) % Cs;
    if (!t.has(o)) return va(o);
  }
  return va((n + As) % Cs);
}
function va(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
let dt = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = lh(this._transitions), this._newLow = wa(this._transitions), this._newHigh = xa(this._transitions), this._editing = null, this._mode = "add";
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
      n.sort(_a), await this._writeSchedule(n), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = ya(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = ya(this.hass);
      t && t !== this._profile && (this._profile = t, this._resubscribe());
    }
    e.has("_confirmingDeleteAt") && this._confirmingDeleteAt !== null && this.shadowRoot?.querySelector(
      "li.row.confirm .button.secondary"
    )?.focus();
  }
  connectedCallback() {
    super.connectedCallback(), this.hass && this.zone && this._profile && !this._unsub && this._subscribe();
  }
  disconnectedCallback() {
    this._unsubscribe(), super.disconnectedCallback();
  }
  async _subscribe() {
    if (!this.hass || !this.zone || !this._profile) {
      this._loading = !1;
      return;
    }
    const e = ++this._subscribeGen;
    this._transitions.length === 0 && (this._loading = !0), this._error = null;
    try {
      const t = await Fu(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (n) => {
          e === this._subscribeGen && (this._transitions = n?.baseline ? [...n.baseline].sort(_a) : [], this._loading = !1);
        }
      );
      if (e !== this._subscribeGen) {
        t();
        return;
      }
      this._unsub = t;
    } catch (t) {
      if (e !== this._subscribeGen) return;
      this._error = t instanceof Error ? t.message : "Failed to subscribe.", this._loading = !1;
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
      await Ru(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (n) {
      this._transitions = t, this._error = n instanceof Error ? n.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return P;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? wa(this._transitions),
        high: this._newHigh ?? xa(this._transitions)
      };
      return v`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return v`
      ${this._renderHeader()}
      ${this._loading ? v`<div class="loading">Loading schedule…</div>` : this._error ? v`<div class="error" role="alert">${this._error}</div>` : v`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
              ></comfort-band-schedule-chart>
              <div class="list-toolbar">
                <button class="button primary" @click=${this._onAddClicked}>+ Add a change</button>
              </div>
              ${this._renderList()}
            `}
    `;
  }
  /**
   * Which profile's schedule this is, named as typed, where profiles are set
   * up. Not "the room follows it": with no schedule of its own in the active
   * profile, a room follows the default profile's.
   */
  _renderHeader() {
    const e = this.hass ? Uo(this.hass) : null, t = e ? this.hass.states[e] : void 0, n = hr(t) ? t.state : null;
    return !n || n === "unknown" ? P : v`<div class="header">
      <span class="profile-label">Schedule: ${n}</span>
    </div>`;
  }
  _renderList() {
    return this._transitions.length === 0 ? v`<div class="empty">No changes yet. Use “Add a change” to create one.</div>` : v`
      <ul class="list" role="list">
        ${this._transitions.map(
      (e) => this._confirmingDeleteAt === e.at ? this._renderConfirmRow(e) : this._renderRow(e)
    )}
      </ul>
    `;
  }
  _renderRow(e) {
    const t = ga(e.at, this.hass), n = `Edit the ${t} change, ${bn(e.low)} to ${bn(e.high)} degrees`;
    return v`
      <li
        class="row"
        role="listitem"
        tabindex="0"
        data-at=${e.at}
        aria-label=${n}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${t}</span>
        <span class="band">${ki(e)}</span>
        <span class="actions">
          <button
            class="button secondary"
            aria-label="Edit the ${t} change"
            @click=${this._onEditClicked(e)}
          >
            Edit
          </button>
          <button
            class="button danger"
            aria-label="Delete the ${t} change"
            @click=${this._onDeleteClicked(e)}
          >
            Delete
          </button>
        </span>
      </li>
    `;
  }
  _renderConfirmRow(e) {
    const t = `Delete the ${ga(e.at, this.hass)} change?`;
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
dt.styles = [
  Ue,
  Pe`
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
      }
      .row .actions {
        display: flex;
        gap: 4px;
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
      .empty {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
    `
];
Ot([
  N({ attribute: !1 })
], dt.prototype, "hass", 2);
Ot([
  N({ type: String })
], dt.prototype, "zone", 2);
Ot([
  Q()
], dt.prototype, "_profile", 2);
Ot([
  Q()
], dt.prototype, "_transitions", 2);
Ot([
  Q()
], dt.prototype, "_loading", 2);
Ot([
  Q()
], dt.prototype, "_error", 2);
Ot([
  Q()
], dt.prototype, "_mode", 2);
Ot([
  Q()
], dt.prototype, "_editing", 2);
Ot([
  Q()
], dt.prototype, "_newAt", 2);
Ot([
  Q()
], dt.prototype, "_confirmingDeleteAt", 2);
dt = Ot([
  Ie("comfort-band-schedule-tab")
], dt);
function ya(e) {
  const t = Uo(e);
  return t ? e.states[t]?.state ?? null : null;
}
function wa(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function xa(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
const zl = {
  basic: "Basic control",
  learning: "Learning",
  predictive: "Predictive control"
}, ch = {
  heating: "Heat",
  cooling: "Cool",
  idle: "Stay idle",
  unknown: "Nothing"
};
function Jt(e, t, n) {
  const i = t[n];
  return typeof i == "string" ? e.states[i] : void 0;
}
function yi(e, t, n) {
  if (typeof t[n] != "string") return "missing";
  const i = Jt(e, t, n)?.state;
  return i === "on" || i === "off" ? i : "unknown";
}
function Ts(e) {
  return e === "heating" || e === "cooling" || e === "idle" || e === "unknown" ? e : null;
}
function Po(e, t) {
  return t.some((n) => typeof e[n] == "string");
}
const uh = ["learningEnabled", "useApparentTemperature"], hh = [
  "predictedAction",
  "thermalSlope",
  "lookaheadMinutes"
], dh = [
  "mpcEnabled",
  "mpcReady",
  "mpcAction",
  "mpcHorizonMinutes"
], fh = [
  "peakSaving",
  "peakSavingEnabled",
  "peakHeatOffset",
  "peakCoolOffset",
  "peakPreconditionMinutes"
];
function ph(e, t) {
  const n = Jt(e, t, "roomTemperature");
  if (!n) return null;
  const i = n.attributes.source;
  return i === "primary" || i === "fallback_sensor" || i === "climate" ? i : i === "none" ? "none" : i === void 0 && n.state !== "unavailable" ? Number.isFinite(Number.parseFloat(n.state)) ? "primary" : "none" : null;
}
function mh(e, t) {
  const n = Jt(e, t, "peakSaving");
  return n && ["off", "no_signal", "waiting", "preconditioning", "active", "override"].includes(n.state) ? n.state === "active" : yi(e, t, "peakSavingEnabled") === "off" ? !1 : Po(t, fh) ? null : !1;
}
function Ol(e, t) {
  const n = ph(e, t), i = yi(e, t, "mpcReady"), o = yi(e, t, "enabled"), s = {
    paused: o === "on" ? !1 : o === "off" ? !0 : null,
    noReading: n === "none",
    controller: null,
    reason: null,
    decision: Ts(Jt(e, t, "currentAction")?.state),
    learning: Ts(Jt(e, t, "predictedAction")?.state),
    predictive: i === "off" ? "not-ready" : Ts(Jt(e, t, "mpcAction")?.state)
  };
  if (n === null) return s;
  if (n === "fallback_sensor" || n === "climate")
    return { ...s, controller: "basic", reason: "stand-in" };
  const a = mh(e, t);
  if (a === null) return s;
  if (a) return { ...s, controller: "basic", reason: "peak" };
  const c = yi(e, t, "learningEnabled");
  if (c === "unknown") return s;
  if (c === "missing")
    return Po(t, uh) ? s : { ...s, controller: "basic", reason: "no-learning" };
  if (c === "off") return { ...s, controller: "basic", reason: "learning-off" };
  if (!Po(t, hh)) return s;
  const d = yi(e, t, "mpcEnabled");
  return d === "unknown" ? s : d === "missing" ? Po(t, dh) ? s : { ...s, controller: "learning" } : d === "off" ? { ...s, controller: "learning" } : i === "on" ? { ...s, controller: "predictive" } : i === "off" ? { ...s, controller: "learning", reason: "not-ready" } : s;
}
function gh(e) {
  return e.paused === !0 ? "Paused" : e.noReading ? "On hold" : e.controller ? `${zl[e.controller]} deciding` : "";
}
function it(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function Ll(e) {
  const t = Math.abs(e);
  return t < 0.1 ? "under 0.1°" : `about ${bn(t)}°`;
}
function bh(e) {
  if (e < 90) {
    const t = Math.max(1, Math.round(e));
    return `${t} minute${t === 1 ? "" : "s"}`;
  }
  return `about ${Math.round(e / 60)} hours`;
}
function $a(e, t, n) {
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
    value: `${e === "heat" ? "Warms it" : "Cools it"} ${Ll(t)} an hour`,
    source: n === "previous" ? `From an earlier ${i} run, as the latest is too short to tell.` : `From the latest ${i} run.`,
    known: !0
  };
}
function Hl(e, t) {
  if (typeof t.thermalSlope != "string") return null;
  const n = Jt(e, t, "thermalSlope");
  if (!n || n.state === "unavailable") return "unavailable";
  const i = n.attributes, o = it(i.idle_slope), s = it(i.idle_slope_cached_age_min);
  let a;
  o === null ? a = {
    value: "Not learned yet",
    source: "Not enough recent readings while idle to learn from.",
    known: !1
  } : a = {
    value: Math.abs(o) < 0.05 ? "Holds steady" : `${o > 0 ? "Warms" : "Cools"} ${Ll(o)} an hour`,
    source: i.idle_slope_source === "cached" ? `From earlier readings${s !== null ? `, ${bh(s)} old` : ""}.` : "From the latest readings while idle.",
    known: !0
  };
  const c = it(i.recovery_slope_heat), d = it(i.recovery_slope_cool), f = typeof i.last_updated == "string" ? Date.parse(i.last_updated) : NaN;
  return {
    idle: a,
    heat: $a("heat", c, i.method_recovery_heat),
    cool: $a("cool", d, i.method_recovery_cool),
    details: [
      {
        name: "On its own",
        perHour: o,
        samples: it(i.sample_count_idle),
        spread: it(i.std_dev_idle),
        method: typeof i.method_idle == "string" ? i.method_idle : null
      },
      {
        name: "Heating",
        perHour: c,
        samples: it(i.sample_count_recovery_heat),
        spread: it(i.std_dev_recovery_heat),
        method: typeof i.method_recovery_heat == "string" ? i.method_recovery_heat : null
      },
      {
        name: "Cooling",
        perHour: d,
        samples: it(i.sample_count_recovery_cool),
        spread: it(i.std_dev_recovery_cool),
        method: typeof i.method_recovery_cool == "string" ? i.method_recovery_cool : null
      }
    ],
    windowMinutes: it(i.window_minutes),
    sampleCount: it(i.sample_count),
    updated: Number.isFinite(f) ? f : null
  };
}
function _h(e, t) {
  const n = yi(e, t, "mpcReady");
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
  const o = Hl(e, t), s = o === "unavailable" ? null : o, a = [];
  return s && !s.idle.known && a.push("how this room drifts on its own"), s && !s.heat.known && !s.cool.known && a.push("how fast heating or cooling moves it"), {
    title: i,
    value: "Not yet",
    desc: a.length ? `Still to learn: ${a.join(", and ")}.` : "It’s still learning how this room warms and cools."
  };
}
function vh(e, t) {
  if (typeof t != "string" || !t) return null;
  const n = e.states[t]?.attributes.friendly_name;
  return typeof n == "string" && n ? n : t;
}
const ka = "Set under Settings → Devices & Services → Comfort Band → Configure.";
function yh(e, t) {
  const n = Jt(e, t, "roomTemperature");
  if (!n) return null;
  const i = "Room reading", o = vh(e, n.attributes.fallback_temp_sensor), s = n.attributes.fallback_to_climate === !0, a = [o, s ? "the unit’s own reading" : null].filter(Boolean), c = `${a[0]} stands in if it has a reading${a.length > 1 ? `, otherwise ${a[1]} if it has one` : ""}`;
  switch (n.attributes.source) {
    case "primary":
      return {
        title: i,
        value: "Its own sensor",
        desc: a.length ? `If that goes offline for 5 minutes, ${c}. ${ka}` : `If that goes offline, control is on hold until it’s back. ${ka}`
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
        desc: a.length ? `Its own sensor has no reading, so control is on hold. Once it has been offline for 5 minutes, ${c}.` : "Its own sensor has no reading and no stand-in is set up, so control is on hold."
      };
    default:
      return null;
  }
}
function Is(e, t, n) {
  const i = jo(e, n), o = (g) => {
    const m = new Date(g);
    return new Date(m.getFullYear(), m.getMonth(), m.getDate()).getTime();
  }, s = Math.round((o(e) - o(t)) / 864e5);
  if (s === 0) return i;
  if (s === 1) return `tomorrow ${i}`;
  if (s === -1) return `yesterday ${i}`;
  const a = n?.locale?.language, c = a?.startsWith("en") ? a : "en";
  if (Math.abs(s) < 7)
    return `${new Intl.DateTimeFormat(c, { weekday: "short" }).format(e)} ${i}`;
  const d = new Date(e).getFullYear() === new Date(t).getFullYear();
  return `${new Intl.DateTimeFormat(c, {
    day: "numeric",
    month: "short",
    ...d ? {} : { year: "numeric" }
  }).format(e)}, ${i}`;
}
function Es(e, t, n) {
  const i = typeof e == "string" ? Date.parse(e) : NaN;
  return Number.isFinite(i) ? Is(i, t, n) : null;
}
function wh(e, t) {
  const n = [];
  return e !== null && Math.abs(e) >= 0.05 && n.push(`the bottom ${e < 0 ? "down" : "up"} ${bn(Math.abs(e))}°`), t !== null && Math.abs(t) >= 0.05 && n.push(`the top ${t > 0 ? "up" : "down"} ${bn(Math.abs(t))}°`), n.join(", ");
}
function xh(e, t, n) {
  const i = Jt(e, t, "peakSaving");
  if (!i) return null;
  const o = i.attributes, s = "Right now", a = wh(it(o.low_adjustment), it(o.high_adjustment));
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
      const c = Es(o.next_start, n, e);
      return {
        title: s,
        value: "No peak now",
        desc: c ? `The next one is announced for ${c}.` : "None is announced yet."
      };
    }
    case "preconditioning": {
      const c = Es(o.next_start, n, e), d = o.precondition === "heating";
      return {
        title: s,
        value: d ? "Warming ahead" : "Cooling ahead",
        desc: `Getting the room ready for the peak${c ? ` at ${c}` : ""}${a ? `: ${a}` : ""}.`
      };
    }
    case "active": {
      const c = Es(o.ends, n, e);
      return {
        title: s,
        value: "Peak on",
        desc: [
          c ? `Until ${c}.` : "",
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
var $h = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, Di = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? kh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && $h(t, n, o), o;
};
const Sh = 1e3, Ah = 15e3, mi = (e, t, n) => ({
  kind: "switch",
  field: e,
  title: t,
  desc: n
}), yt = (e, t, n) => ({
  kind: "number",
  field: e,
  title: t,
  desc: n
}), Ps = (e, t, n, i) => ({ kind: "select", field: e, title: t, desc: n, label: i }), Fl = (e) => e, Ch = {
  comfort: {
    main: [
      mi(
        "useApparentTemperature",
        "Use “feels like”",
        "When on, heating and cooling go by the humidity-adjusted “feels like” temperature instead of the room’s own reading. Falls back to the room’s reading automatically if the humidity sensor is unavailable."
      ),
      yt(
        "deadbandBelow",
        "Heating starts below the range by",
        "How far below the range the room may drop before heating starts; heating stops at the bottom of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and heats towards the top of the range."
      ),
      yt(
        "deadbandAbove",
        "Cooling starts above the range by",
        "How far above the range the room may rise before cooling starts; cooling stops at the top of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and cools towards the bottom of the range."
      ),
      yt(
        "bandRampMinutes",
        "Ease schedule changes over",
        "Spreads each change of range over this long, centred on its time, instead of changing all at once. 0 changes at once."
      ),
      yt(
        "overrideHours",
        "Adjustments made elsewhere last",
        "How long an adjustment lasts when it’s started without a length: from the device page, or an automation that doesn’t give one. Warmer, Cooler and the exact range here set their own length."
      )
    ]
  },
  automation: {
    main: [
      mi(
        "enabled",
        "Control this room",
        "When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused."
      ),
      mi(
        "learningEnabled",
        "Learning",
        "Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings."
      ),
      mi(
        "mpcEnabled",
        "Predictive control",
        "Plans heating and cooling ahead, from what the room has learned and the schedule coming up. Needs Learning on. It plans only while it has recent enough readings of how this room warms and cools, usually after a few hours of normal running."
      )
    ],
    fine: [
      yt(
        "lookaheadMinutes",
        "Look ahead by",
        "How far ahead learning projects the room’s temperature, to start or stop early, or hold off."
      ),
      yt(
        "passiveTolerance",
        "Let it drift back within",
        "How far outside the range the room may be for learning to let it drift back on its own, rather than heat or cool."
      ),
      yt(
        "mpcHorizonMinutes",
        "Plan ahead by",
        "How far ahead predictive control plans, schedule changes included."
      ),
      yt(
        "minCycleMinutes",
        "Repeat a command no sooner than",
        "The least time before the unit is sent the same command again, such as a new setting while it’s already heating."
      ),
      yt(
        "crossModeMinMinutes",
        "Switch between heating and cooling no sooner than",
        "The least time between heating and then cooling, or the other way round."
      )
    ]
  },
  fan: {
    main: [
      mi(
        "fanControlEnabled",
        "Fan control",
        "Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen."
      ),
      Ps(
        "activeFanMode",
        "Fan while heating or cooling",
        "The fan speed while the unit is working. Peak saving can leave it as it is during a peak.",
        Sa
      ),
      Ps(
        "idleFanMode",
        "Fan while idle",
        "The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed.",
        Sa
      )
    ]
  },
  peak: {
    main: [
      mi(
        "peakSavingEnabled",
        "Peak saving",
        "Runs heating and cooling less in expensive power times. During one, the range widens, so the room drifts further before heating or cooling starts. Ahead of one that’s announced, the room can be warmed or cooled a little within its range. An adjustment in force sets both aside. Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure."
      ),
      yt(
        "peakHeatOffset",
        "Relax the bottom of the range by",
        "How far the bottom of the range drops during a peak; heating still starts the usual amount below it. Ahead of one, up to how far the bottom rises to warm the room first."
      ),
      yt(
        "peakCoolOffset",
        "Relax the top of the range by",
        "How far the top of the range rises during a peak; cooling still starts the usual amount above it. Ahead of one, up to how far the top falls to cool the room first."
      ),
      yt(
        "peakPreconditionMinutes",
        "Prepare ahead by",
        "How long before an announced peak to warm or cool the room. 0 doesn’t prepare."
      )
    ]
  },
  schedules: {
    main: [
      Ps(
        "scheduleAssignment",
        "Follows",
        "Which schedule sets this room’s range: its own, or one shared with other rooms. The Schedule tab shows and changes the room’s own schedule, even while it follows a shared one.",
        Fl
      )
    ]
  }
}, Th = {
  fan: { what: "Fan control needs", since: "v0.13.0" },
  peak: { what: "Peak saving needs", since: "v0.24.0" },
  schedules: { what: "Choosing a shared schedule needs", since: "v0.14.0" }
};
function Sa(e) {
  if (e === "(none)") return "Leave as it is";
  const t = e.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Oo(e) {
  const t = String(e), n = t.indexOf(".");
  return n < 0 ? 0 : t.length - n - 1;
}
function Eh(e, t) {
  return Math.max(Oo(t), Oo(Number(e.toFixed(3))));
}
function Ph(e) {
  const t = typeof e == "object" && e !== null ? e.message : void 0;
  return typeof t == "string" && t ? t : "That setting couldn’t be changed.";
}
function gi(e) {
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) ? t : null;
}
let _n = class extends Ce {
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
      (c) => {
        this._error = { entityId: e, message: Ph(c) }, a() && this._drop(e);
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
      timer: setTimeout(() => this._drop(e), Ah)
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
    const i = gi(n.attributes.step) ?? 1, o = gi(n.attributes.min) ?? -1 / 0, s = gi(n.attributes.max) ?? 1 / 0, a = this._pending[e], c = typeof a == "number" ? a : Number.parseFloat(n.state), d = Number.isFinite(o) ? o : 0, f = (c - d) / i, g = t > 0 ? Math.floor(f + 1e-9) + 1 : Math.ceil(f - 1e-9) - 1, m = Math.max(Oo(i), Oo(d)), _ = Math.min(s, Math.max(o, Number((d + g * i).toFixed(m))));
    this._pending = { ...this._pending, [e]: _ }, this._error = null, this._stopSettling(e);
    const $ = this._timers.get(e);
    $ !== void 0 && clearTimeout($), this._timers.set(
      e,
      setTimeout(() => {
        this._timers.delete(e), this._send(e, _, "number", "set_value", { value: _ });
      }, Sh)
    );
  }
  _onChoose(e, t) {
    this._pending = { ...this._pending, [e]: t }, this._error = null, this._stopSettling(e), this._send(e, t, "select", "select_option", { option: t });
  }
  render() {
    if (!this.hass || !this.entities) return P;
    const { main: e, fine: t = [] } = Ch[this.section], n = (d) => d.filter((f) => this._entity(f.field) !== null), i = n(e), o = n(t), s = e.length + t.length - i.length - o.length, a = i.length + o.length === 0, c = Th[this.section];
    return v`
      ${this._error ? v`<div class="error" role="alert">${this._error.message}</div>` : P}
      ${this.section === "peak" ? this._renderStatus(xh(this.hass, this.entities, Date.now()), "peak") : P}
      ${i.map((d) => this._renderSetting(d))}
      ${this.section === "comfort" ? v`${this._renderHumidity()}
          ${this._renderStatus(yh(this.hass, this.entities), "source")}` : P}
      ${this.section === "automation" ? this._renderStatus(_h(this.hass, this.entities), "readiness") : P}
      ${o.length ? v`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${o.map((d) => this._renderSetting(d))}
          </details>` : P}
      ${a ? v`<div class="upgrade-hint">
            ${c ? v`${c.what} the <code>comfort_band</code> integration ${c.since} or
                  later, with its entities turned on.` : v`These settings’ entities are turned off. Turn them on from this room’s device
                page, under Settings → Devices &amp; Services.`}
          </div>` : s > 0 ? v`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>` : P}
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
    ` : P;
  }
  _renderHumidity() {
    const e = this.entities.roomTemperature, t = e !== null ? this.hass.states[e] : void 0, n = t !== void 0 && t.state !== "unavailable", i = n ? Ml(this.hass, e) : null, o = t === void 0 ? "Can’t be read" : n ? i ? this._sensorText(i) : "Not configured" : "Can’t be read right now";
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
    const n = this.hass.states[e], i = gi(n?.attributes.step) ?? 1, o = gi(n?.attributes.min), s = gi(n?.attributes.max), a = typeof n?.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : "", c = this._pending[e], d = typeof c == "number" ? c : Number.parseFloat(n?.state ?? ""), f = Number.isFinite(d), g = f ? `${d.toFixed(Eh(d, i))}${a ? ` ${a}` : ""}` : "—", m = `t-${t.field}`, _ = !f || o !== null && d <= o, $ = !f || s !== null && d >= s;
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
    const n = this.hass.states[e], i = Array.isArray(n?.attributes.options) ? n.attributes.options.filter((g) => typeof g == "string") : [], o = this._pending[e], s = typeof o == "string" ? o : n?.state ?? "", a = `t-${t.field}`, c = n?.state === "unavailable" || i.length === 0, d = i.includes(s), f = t.label ?? Fl;
    return v`
      <div class="row pick" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${a}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <select
          class="choice"
          aria-labelledby=${a}
          ?disabled=${c}
          @change=${(g) => this._onChoose(e, g.target.value)}
        >
          ${d && !c ? P : v`<option value="" disabled .selected=${!0}>
                ${c ? "Unavailable" : "—"}
              </option>`}
          ${i.map(
      (g) => v`<option value=${g} .selected=${!c && g === s}>
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
_n.styles = [
  Ue,
  Pe`
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
Di([
  N({ attribute: !1 })
], _n.prototype, "hass", 2);
Di([
  N({ attribute: !1 })
], _n.prototype, "entities", 2);
Di([
  N({ type: String })
], _n.prototype, "section", 2);
Di([
  Q()
], _n.prototype, "_pending", 2);
Di([
  Q()
], _n.prototype, "_error", 2);
_n = Di([
  Ie("comfort-band-settings-tab")
], _n);
var Dh = Object.defineProperty, Mh = Object.getOwnPropertyDescriptor, on = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Mh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Dh(t, n, o), o;
};
let Mt = class extends Ce {
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
Mt.styles = [
  Ue,
  Pe`
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
on([
  N({ type: String })
], Mt.prototype, "mode", 2);
on([
  N({ type: String })
], Mt.prototype, "existingName", 2);
on([
  N({ type: Array })
], Mt.prototype, "existingNames", 2);
on([
  N({ type: Boolean })
], Mt.prototype, "busy", 2);
on([
  Q()
], Mt.prototype, "_name", 2);
on([
  Q()
], Mt.prototype, "_description", 2);
on([
  Q()
], Mt.prototype, "_error", 2);
on([
  Pi('input[name="name"]')
], Mt.prototype, "_nameInput", 2);
Mt = on([
  Ie("profile-edit-dialog")
], Mt);
var Nh = Object.defineProperty, zh = Object.getOwnPropertyDescriptor, Kn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? zh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Nh(t, n, o), o;
};
let tn = class extends Ce {
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
          await Iu(this.hass, { name: t, description: n });
        else if (i === "clone" && o)
          await Uu(this.hass, { source: o, target: t, description: n });
        else if (i === "rename" && o)
          t !== o && await Wu(this.hass, { old: o, new: t });
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
        await Vu(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Uo(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!hr(t)) return null;
    const n = t.attributes.options, i = Array.isArray(n) ? n.filter((g) => typeof g == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, a = typeof s == "string" && !!s, c = a ? s : "home", d = t.attributes.descriptions, f = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [g, m] of Object.entries(d))
        typeof m == "string" && (f[g] = m);
    return { options: i, active: o, defaultProfile: c, descriptions: f, crudAvailable: a };
  }
  _onSelect(e) {
    this.hass && ju(this.hass, { profile: e });
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
        (a ? Array.from(a).find((d) => d.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
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
    if (!this.hass) return P;
    const e = this._readState();
    if (e === null)
      return Dl(this.hass) ? v`<div class="empty">
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
          @keydown=${(c) => {
        c.key === "Escape" && !this._busy && (c.preventDefault(), this._onDialogCancel());
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
          </button>` : P}
      <ul aria-label="Profiles">
        ${t.map(
      (a, c) => this._renderRow(a, c, n, i, o, s)
    )}
      </ul>
      ${s ? P : v`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, n, i, o, s) {
    const a = e === n, c = e === i, d = o[e] ?? "", f = `cb-profile-menu-${t}`;
    return v`
      <li
        data-profile=${e}
        tabindex="0"
        class=${a ? "active" : ""}
        aria-current=${a ? "true" : P}
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
          ${d ? v`<span class="description">${d}</span>` : P}
        </span>
        ${a ? v`<span class="badge">Active</span>` : P}
        ${s ? v`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? f : P}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(g) => this._toggleMenu(e, g)}
            >
              ⋮
            </button>` : P}
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
                  ?disabled=${c}
                  aria-disabled=${c}
                  @click=${(g) => {
      g.stopPropagation(), c || this._onDelete(e);
    }}
                  title=${c ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : P}
      </li>
    `;
  }
};
tn.styles = [
  Ue,
  Pe`
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
Kn([
  N({ attribute: !1 })
], tn.prototype, "hass", 2);
Kn([
  Q()
], tn.prototype, "_mode", 2);
Kn([
  Q()
], tn.prototype, "_target", 2);
Kn([
  Q()
], tn.prototype, "_openMenu", 2);
Kn([
  Q()
], tn.prototype, "_error", 2);
Kn([
  Q()
], tn.prototype, "_busy", 2);
tn = Kn([
  Ie("comfort-band-profiles-tab")
], tn);
const Oh = !0, Oe = "u-", Lh = "uplot", Hh = Oe + "hz", Fh = Oe + "vt", Rh = Oe + "title", Bh = Oe + "wrap", jh = Oe + "under", Ih = Oe + "over", Uh = Oe + "axis", Rn = Oe + "off", Wh = Oe + "select", Vh = Oe + "cursor-x", Gh = Oe + "cursor-y", Kh = Oe + "cursor-pt", Yh = Oe + "legend", qh = Oe + "live", Zh = Oe + "inline", Jh = Oe + "series", Qh = Oe + "marker", Aa = Oe + "label", Xh = Oe + "value", Zi = "width", Ji = "height", Ki = "top", Ca = "bottom", bi = "left", Ds = "right", dr = "#000", Ta = dr + "0", Ms = "mousemove", Ea = "mousedown", Ns = "mouseup", Pa = "mouseenter", Da = "mouseleave", Ma = "dblclick", ed = "resize", td = "scroll", Na = "change", Lo = "dppxchange", fr = "--", Mi = typeof window < "u", Us = Mi ? document : null, wi = Mi ? window : null, nd = Mi ? navigator : null;
let ce, Ao;
function Ws() {
  let e = devicePixelRatio;
  ce != e && (ce = e, Ao && Gs(Na, Ao, Ws), Ao = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), In(Na, Ao, Ws), wi.dispatchEvent(new CustomEvent(Lo)));
}
function ut(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function Vs(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function ye(e, t, n) {
  e.style[t] = n + "px";
}
function Et(e, t, n, i) {
  let o = Us.createElement(e);
  return t != null && ut(o, t), n?.insertBefore(o, i), o;
}
function wt(e, t) {
  return Et("div", e, t);
}
const za = /* @__PURE__ */ new WeakMap();
function Ut(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", a = za.get(e);
  s != a && (e.style.transform = s, za.set(e, s), t < 0 || n < 0 || t > i || n > o ? ut(e, Rn) : Vs(e, Rn));
}
const Oa = /* @__PURE__ */ new WeakMap();
function La(e, t, n) {
  let i = t + n, o = Oa.get(e);
  i != o && (Oa.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const Ha = /* @__PURE__ */ new WeakMap();
function Fa(e, t, n, i) {
  let o = t + "" + n, s = Ha.get(e);
  o != s && (Ha.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const pr = { passive: !0 }, id = { ...pr, capture: !0 };
function In(e, t, n, i) {
  t.addEventListener(e, n, i ? id : pr);
}
function Gs(e, t, n, i) {
  t.removeEventListener(e, n, pr);
}
Mi && Ws();
function Pt(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : ht((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function Rl(e) {
  return (n, i, o) => {
    let s = -1, a = -1;
    for (let c = i; c <= o; c++)
      if (e(n[c])) {
        s = c;
        break;
      }
    for (let c = o; c >= i; c--)
      if (e(n[c])) {
        a = c;
        break;
      }
    return [s, a];
  };
}
const Bl = (e) => e != null, jl = (e) => e != null && e > 0, Wo = Rl(Bl), od = Rl(jl);
function sd(e, t, n, i = 0, o = !1) {
  let s = o ? od : Wo, a = o ? jl : Bl;
  [t, n] = s(e, t, n);
  let c = e[t], d = e[t];
  if (t > -1)
    if (i == 1)
      c = e[t], d = e[n];
    else if (i == -1)
      c = e[n], d = e[t];
    else
      for (let f = t; f <= n; f++) {
        let g = e[f];
        a(g) && (g < c ? c = g : g > d && (d = g));
      }
  return [c ?? pe, d ?? -pe];
}
function Vo(e, t, n, i) {
  let o = ja(e), s = ja(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let a = n == 10 ? Qt : Il, c = o == 1 ? ht : xt, d = s == 1 ? xt : ht, f = c(a(ze(e))), g = d(a(ze(t))), m = Si(n, f), _ = Si(n, g);
  return n == 10 && (f < 0 && (m = me(m, -f)), g < 0 && (_ = me(_, -g))), i || n == 2 ? (e = m * o, t = _ * s) : (e = Gl(e, m), t = Go(t, _)), [e, t];
}
function mr(e, t, n, i) {
  let o = Vo(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const gr = 0.1, Ra = {
  mode: 3,
  pad: gr
}, eo = {
  pad: 0,
  soft: null,
  mode: 0
}, rd = {
  min: eo,
  max: eo
};
function Ho(e, t, n, i) {
  return Ko(n) ? Ba(e, t, n) : (eo.pad = n, eo.soft = i ? 0 : null, eo.mode = i ? 3 : 0, Ba(e, t, rd));
}
function ae(e, t) {
  return e ?? t;
}
function ad(e, t, n) {
  for (t = ae(t, 0), n = ae(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Ba(e, t, n) {
  let i = n.min, o = n.max, s = ae(i.pad, 0), a = ae(o.pad, 0), c = ae(i.hard, -pe), d = ae(o.hard, pe), f = ae(i.soft, pe), g = ae(o.soft, -pe), m = ae(i.mode, 0), _ = ae(o.mode, 0), $ = t - e, C = Qt($), O = Xe(ze(e), ze(t)), I = Qt(O), W = ze(I - C);
  ($ < 1e-24 || W > 10) && ($ = 0, (e == 0 || t == 0) && ($ = 1e-24, m == 2 && f != pe && (s = 0), _ == 2 && g != -pe && (a = 0)));
  let k = $ || O || 1e3, j = Qt(k), S = Si(10, ht(j)), J = k * ($ == 0 ? e == 0 ? 0.1 : 1 : s), z = me(Gl(e - J, S / 10), 24), X = e >= f && (m == 1 || m == 3 && z <= f || m == 2 && z >= f) ? f : pe, Y = Xe(c, z < X && e >= X ? X : Dt(X, z)), ne = k * ($ == 0 ? t == 0 ? 0.1 : 1 : a), K = me(Go(t + ne, S / 10), 24), A = t <= g && (_ == 1 || _ == 3 && K >= g || _ == 2 && K <= g) ? g : -pe, Z = Dt(d, K > A && t <= A ? A : Xe(A, K));
  return Y == Z && Y == 0 && (Z = 100), [Y, Z];
}
const ld = new Intl.NumberFormat(Mi ? nd.language : "en-US"), br = (e) => ld.format(e), ft = Math, Do = ft.PI, ze = ft.abs, ht = ft.floor, Ne = ft.round, xt = ft.ceil, Dt = ft.min, Xe = ft.max, Si = ft.pow, ja = ft.sign, Qt = ft.log10, Il = ft.log2, cd = (e, t = 1) => ft.sinh(e) * t, zs = (e, t = 1) => ft.asinh(e / t), pe = 1 / 0;
function Ia(e) {
  return (Qt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function Ks(e, t, n) {
  return Dt(Xe(e, t), n);
}
function Ul(e) {
  return typeof e == "function";
}
function ie(e) {
  return Ul(e) ? e : () => e;
}
const ud = () => {
}, Wl = (e) => e, Vl = (e, t) => t, hd = (e) => null, Ua = (e) => !0, Wa = (e, t) => e == t, dd = /\.\d*?(?=9{6,}|0{6,})/gm, Wn = (e) => {
  if (Yl(e) || vn.has(e))
    return e;
  const t = `${e}`, n = t.match(dd);
  if (n == null)
    return e;
  let i = n[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Wn(o)}e${s}`;
  }
  return me(e, i);
};
function Hn(e, t) {
  return Wn(me(Wn(e / t)) * t);
}
function Go(e, t) {
  return Wn(xt(Wn(e / t)) * t);
}
function Gl(e, t) {
  return Wn(ht(Wn(e / t)) * t);
}
function me(e, t = 0) {
  if (Yl(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Ne(i) / n;
}
const vn = /* @__PURE__ */ new Map();
function Kl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function so(e, t, n, i) {
  let o = [], s = i.map(Kl);
  for (let a = t; a < n; a++) {
    let c = ze(a), d = me(Si(e, a), c);
    for (let f = 0; f < i.length; f++) {
      let g = e == 10 ? +`${i[f]}e${a}` : i[f] * d, m = (a >= 0 ? 0 : c) + (a >= s[f] ? 0 : s[f]), _ = e == 10 ? g : me(g, m);
      o.push(_), vn.set(_, m);
    }
  }
  return o;
}
const to = {}, _r = [], Ai = [null, null], pn = Array.isArray, Yl = Number.isInteger, fd = (e) => e === void 0;
function Va(e) {
  return typeof e == "string";
}
function Ko(e) {
  let t = !1;
  if (e != null) {
    let n = e.constructor;
    t = n == null || n == Object;
  }
  return t;
}
function pd(e) {
  return e != null && typeof e == "object";
}
const md = Object.getPrototypeOf(Uint8Array), ql = "__proto__";
function Ci(e, t = Ko) {
  let n;
  if (pn(e)) {
    let i = e.find((o) => o != null);
    if (pn(i) || t(i)) {
      n = Array(e.length);
      for (let o = 0; o < e.length; o++)
        n[o] = Ci(e[o], t);
    } else
      n = e.slice();
  } else if (e instanceof md)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != ql && (n[i] = Ci(e[i], t));
  } else
    n = e;
  return n;
}
function Ee(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != ql && (Ko(e[o]) ? Ee(e[o], Ci(i[o])) : e[o] = Ci(i[o]));
  }
  return e;
}
const gd = 0, bd = 1, _d = 2;
function vd(e, t, n) {
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
function yd(e, t) {
  if ($d(e)) {
    let a = e[0].slice();
    for (let c = 1; c < e.length; c++)
      a.push(...e[c].slice(1));
    return kd(a[0]) || (a = xd(a)), a;
  }
  let n = /* @__PURE__ */ new Set();
  for (let a = 0; a < e.length; a++) {
    let d = e[a][0], f = d.length;
    for (let g = 0; g < f; g++)
      n.add(d[g]);
  }
  let i = [Array.from(n).sort((a, c) => a - c)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let a = 0; a < o; a++)
    s.set(i[0][a], a);
  for (let a = 0; a < e.length; a++) {
    let c = e[a], d = c[0];
    for (let f = 1; f < c.length; f++) {
      let g = c[f], m = Array(o).fill(void 0), _ = t ? t[a][f] : bd, $ = [];
      for (let C = 0; C < g.length; C++) {
        let O = g[C], I = s.get(d[C]);
        O === null ? _ != gd && (m[I] = O, _ == _d && $.push(I)) : m[I] = O;
      }
      vd(m, $, o), i.push(m);
    }
  }
  return i;
}
const wd = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function xd(e) {
  let t = e[0], n = t.length, i = Array(n);
  for (let s = 0; s < i.length; s++)
    i[s] = s;
  i.sort((s, a) => t[s] - t[a]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let a = e[s], c = Array(n);
    for (let d = 0; d < n; d++)
      c[d] = a[i[d]];
    o.push(c);
  }
  return o;
}
function $d(e) {
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
function kd(e, t = 100) {
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
  const s = Xe(1, ht((o - i + 1) / t));
  for (let a = e[i], c = i + s; c <= o; c += s) {
    const d = e[c];
    if (d != null) {
      if (d <= a)
        return !1;
      a = d;
    }
  }
  return !0;
}
const Zl = [
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
], Jl = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Ql(e) {
  return e.slice(0, 3);
}
const Sd = Jl.map(Ql), Ad = Zl.map(Ql), Cd = {
  MMMM: Zl,
  MMM: Ad,
  WWWW: Jl,
  WWW: Sd
};
function Yi(e) {
  return (e < 10 ? "0" : "") + e;
}
function Td(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Ed = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Yi(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Yi(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Yi(e.getHours()),
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
  mm: (e) => Yi(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Yi(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => Td(e.getMilliseconds())
};
function vr(e, t) {
  t = t || Cd;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? Ed[o[1]] : o[0]);
  return (s) => {
    let a = "";
    for (let c = 0; c < n.length; c++)
      a += typeof n[c] == "string" ? n[c] : n[c](s, t);
    return a;
  };
}
const Pd = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Dd(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Pd ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const Xl = (e) => e % 1 == 0, Fo = [1, 2, 2.5, 5], Md = so(10, -32, 0, Fo), ec = so(10, 0, 32, Fo), Nd = ec.filter(Xl), Fn = Md.concat(ec), yr = `
`, tc = "{YYYY}", Ga = yr + tc, nc = "{M}/{D}", Qi = yr + nc, Co = Qi + "/{YY}", ic = "{aa}", zd = "{h}:{mm}", vi = zd + ic, Ka = yr + vi, Ya = ":{ss}", he = null;
function oc(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, a = o * 365, d = (e == 1 ? so(10, 0, 3, Fo).filter(Xl) : so(10, -3, 0, Fo)).concat([
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
    [a, tc, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", Ga, he, he, he, he, he, 1],
    [o, nc, Ga, he, he, he, he, he, 1],
    [i, "{h}" + ic, Co, he, Qi, he, he, he, 1],
    [n, vi, Co, he, Qi, he, he, he, 1],
    [t, Ya, Co + " " + vi, he, Qi + " " + vi, he, Ka, he, 1],
    [e, Ya + ".{fff}", Co + " " + vi, he, Qi + " " + vi, he, Ka, he, 1]
  ];
  function g(m) {
    return (_, $, C, O, I, W) => {
      let k = [], j = I >= a, S = I >= s && I < a, J = m(C), z = me(J * e, 3), X = Os(J.getFullYear(), j ? 0 : J.getMonth(), S || j ? 1 : J.getDate()), Y = me(X * e, 3);
      if (S || j) {
        let ne = S ? I / s : 0, K = j ? I / a : 0, A = z == Y ? z : me(Os(X.getFullYear() + K, X.getMonth() + ne, 1) * e, 3), Z = new Date(Ne(A / e)), L = Z.getFullYear(), V = Z.getMonth();
        for (let B = 0; A <= O; B++) {
          let oe = Os(L + K * B, V + ne * B, 1), R = oe - m(me(oe * e, 3));
          A = me((+oe + R) * e, 3), A <= O && k.push(A);
        }
      } else {
        let ne = I >= o ? o : I, K = ht(C) - ht(z), A = Y + K + Go(z - Y, ne);
        k.push(A);
        let Z = m(A), L = Z.getHours() + Z.getMinutes() / n + Z.getSeconds() / i, V = I / i, B = _.axes[$]._space, oe = W / B;
        for (; A = me(A + I, e == 1 ? 0 : 3), !(A > O); )
          if (V > 1) {
            let R = ht(me(L + V, 6)) % 24, se = m(A).getHours() - R;
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
    d,
    f,
    g
  ];
}
const [Od, Ld, Hd] = oc(1), [Fd, Rd, Bd] = oc(1e-3);
so(2, -53, 53, [1]);
function qa(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function Za(e, t) {
  return (n, i, o, s, a) => {
    let c = t.find((C) => a >= C[0]) || t[t.length - 1], d, f, g, m, _, $;
    return i.map((C) => {
      let O = e(C), I = O.getFullYear(), W = O.getMonth(), k = O.getDate(), j = O.getHours(), S = O.getMinutes(), J = O.getSeconds(), z = I != d && c[2] || W != f && c[3] || k != g && c[4] || j != m && c[5] || S != _ && c[6] || J != $ && c[7] || c[1];
      return d = I, f = W, g = k, m = j, _ = S, $ = J, z(O);
    });
  };
}
function jd(e, t) {
  let n = vr(t);
  return (i, o, s, a, c) => o.map((d) => n(e(d)));
}
function Os(e, t, n) {
  return new Date(e, t, n);
}
function Ja(e, t) {
  return t(e);
}
const Id = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Qa(e, t) {
  return (n, i, o, s) => s == null ? fr : t(e(i));
}
function Ud(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Wd(e, t) {
  return e.series[t].fill(e, t);
}
const Vd = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: ud,
  markers: {
    show: !0,
    width: 2,
    stroke: Ud,
    fill: Wd,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Gd(e, t) {
  let n = e.cursor.points, i = wt(), o = n.size(e, t);
  ye(i, Zi, o), ye(i, Ji, o);
  let s = o / -2;
  ye(i, "marginLeft", s), ye(i, "marginTop", s);
  let a = n.width(e, t, o);
  return a && ye(i, "borderWidth", a), i;
}
function Kd(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function Yd(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function qd(e, t) {
  return e.series[t].points.size;
}
const Ls = [0, 0];
function Zd(e, t, n) {
  return Ls[0] = t, Ls[1] = n, Ls;
}
function To(e, t, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == t) && n(o);
  };
}
function Hs(e, t, n, i = !0) {
  return (o) => {
    (!i || o.target == t) && n(o);
  };
}
const Jd = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: Zd,
  points: {
    one: !1,
    show: Gd,
    size: qd,
    width: 0,
    stroke: Yd,
    fill: Kd
  },
  bind: {
    mousedown: To,
    mouseup: To,
    click: To,
    // legend clicks, not .u-over clicks
    dblclick: To,
    mousemove: Hs,
    mouseleave: Hs,
    mouseenter: Hs
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
}, sc = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, wr = Ee({}, sc, {
  filter: Vl
}), rc = Ee({}, wr, {
  size: 10
}), ac = Ee({}, sc, {
  show: !1
}), xr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', lc = "bold " + xr, cc = 1.5, Xa = {
  show: !0,
  scale: "x",
  stroke: dr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: lc,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: wr,
  ticks: rc,
  border: ac,
  font: xr,
  lineGap: cc,
  rotate: 0
}, Qd = "Value", Xd = "Time", el = {
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
function ef(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : br(s));
}
function tf(e, t, n, i, o, s, a) {
  let c = [], d = vn.get(o) || 0;
  n = a ? n : me(Go(n, o), d);
  for (let f = n; f <= i; f = me(f + o, d))
    c.push(Object.is(f, -0) ? 0 : f);
  return c;
}
function Ys(e, t, n, i, o, s, a) {
  const c = [], d = e.scales[e.axes[t].scale].log, f = d == 10 ? Qt : Il, g = ht(f(n));
  o = Si(d, g), d == 10 && (o = Fn[Pt(o, Fn)]);
  let m = n, _ = o * d;
  d == 10 && (_ = Fn[Pt(_, Fn)]);
  do
    c.push(m), m = m + o, d == 10 && !vn.has(m) && (m = me(m, vn.get(o))), m >= _ && (o = m, _ = o * d, d == 10 && (_ = Fn[Pt(_, Fn)]));
  while (m <= i);
  return c;
}
function nf(e, t, n, i, o, s, a) {
  let d = e.scales[e.axes[t].scale].asinh, f = i > d ? Ys(e, t, Xe(d, n), i, o) : [d], g = i >= 0 && n <= 0 ? [0] : [];
  return (n < -d ? Ys(e, t, Xe(d, -i), -n, o) : [d]).reverse().map((_) => -_).concat(g, f);
}
const uc = /./, of = /[12357]/, sf = /[125]/, tl = /1/, qs = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function rf(e, t, n, i, o) {
  let s = e.axes[n], a = s.scale, c = e.scales[a], d = e.valToPos, f = s._space, g = d(10, a), m = d(9, a) - g >= f ? uc : d(7, a) - g >= f ? of : d(5, a) - g >= f ? sf : tl;
  if (m == tl) {
    let _ = ze(d(1, a) - g);
    if (_ < f)
      return qs(t.slice().reverse(), c.distr, m, xt(f / _)).reverse();
  }
  return qs(t, c.distr, m, 1);
}
function af(e, t, n, i, o) {
  let s = e.axes[n], a = s.scale, c = s._space, d = e.valToPos, f = ze(d(1, a) - d(2, a));
  return f < c ? qs(t.slice().reverse(), 3, uc, xt(c / f)).reverse() : t;
}
function lf(e, t, n, i) {
  return i == null ? fr : t == null ? "" : br(t);
}
const nl = {
  show: !0,
  scale: "y",
  stroke: dr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: lc,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: wr,
  ticks: rc,
  border: ac,
  font: xr,
  lineGap: cc,
  rotate: 0
};
function cf(e, t) {
  let n = 3 + (e || 1) * 2;
  return me(n * t, 3);
}
function uf(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), a = e.valToPos(o[i[1]], n, !0), c = ze(a - s), d = e.series[t], f = c / (d.points.space * ce);
  return i[1] - i[0] <= f;
}
const il = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, hc = (e, t, n, i, o) => o, ol = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: hc,
  alpha: 1,
  facets: [
    Ee({}, il, { scale: "x" }),
    Ee({}, il, { scale: "y" })
  ]
}, sl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: hc,
  alpha: 1,
  points: {
    show: uf,
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
function hf(e, t, n, i, o) {
  return n / 10;
}
const dc = {
  time: Oh,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, df = Ee({}, dc, {
  time: !1,
  ori: 1
}), rl = {};
function fc(e, t) {
  let n = rl[e];
  return n || (n = {
    key: e,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, a, c, d, f) {
      for (let g = 0; g < n.plots.length; g++)
        n.plots[g] != o && n.plots[g].pub(i, o, s, a, c, d, f);
    }
  }, e != null && (rl[e] = n)), n;
}
const Ti = 1, Zs = 2;
function Yn(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, a = e.scales, c = e.bbox;
  let d = s[0], f = i == 2 ? s[1] : s[t], g = i == 2 ? a[o.facets[0].scale] : a[e.series[0].scale], m = i == 2 ? a[o.facets[1].scale] : a[o.scale], _ = c.left, $ = c.top, C = c.width, O = c.height, I = e.valToPosH, W = e.valToPosV;
  return g.ori == 0 ? n(
    o,
    d,
    f,
    g,
    m,
    I,
    W,
    _,
    $,
    C,
    O,
    qo,
    Ni,
    Jo,
    mc,
    bc
  ) : n(
    o,
    d,
    f,
    g,
    m,
    W,
    I,
    $,
    _,
    O,
    C,
    Zo,
    zi,
    Sr,
    gc,
    _c
  );
}
function $r(e, t) {
  let n = 0, i = 0, o = ae(e.bands, _r);
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
function ff(e, t, n, i, o) {
  let s = e.mode, a = e.series[t], c = s == 2 ? a.facets[1].scale : a.scale, d = e.scales[c];
  return o == -1 ? d.min : o == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Xt(e, t, n, i, o, s) {
  return Yn(e, t, (a, c, d, f, g, m, _, $, C, O, I) => {
    let W = a.pxRound;
    const k = f.dir * (f.ori == 0 ? 1 : -1), j = f.ori == 0 ? Ni : zi;
    let S, J;
    k == 1 ? (S = n, J = i) : (S = i, J = n);
    let z = W(m(c[S], f, O, $)), X = W(_(d[S], g, I, C)), Y = W(m(c[J], f, O, $)), ne = W(_(s == 1 ? g.max : g.min, g, I, C)), K = new Path2D(o);
    return j(K, Y, ne), j(K, z, ne), j(K, z, X), K;
  });
}
function Yo(e, t, n, i, o, s) {
  let a = null;
  if (e.length > 0) {
    a = new Path2D();
    const c = t == 0 ? Jo : Sr;
    let d = n;
    for (let m = 0; m < e.length; m++) {
      let _ = e[m];
      if (_[1] > _[0]) {
        let $ = _[0] - d;
        $ > 0 && c(a, d, i, $, i + s), d = _[1];
      }
    }
    let f = n + o - d, g = 10;
    f > 0 && c(a, d, i - g / 2, f, i + s + g);
  }
  return a;
}
function pf(e, t, n) {
  let i = e[e.length - 1];
  i && i[0] == t ? i[1] = n : e.push([t, n]);
}
function kr(e, t, n, i, o, s, a) {
  let c = [], d = e.length;
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
      $ = a <= 0 && O >= 0 && O < d ? s(e[O]) : $;
      let W = _ + o;
      C = a >= 0 && W >= 0 && W < d ? s(e[W]) : C, C >= $ && c.push([$, C]);
    }
  return c;
}
function al(e) {
  return e == 0 ? Wl : e == 1 ? Ne : (t) => Hn(t, e);
}
function pc(e) {
  let t = e == 0 ? qo : Zo, n = e == 0 ? (o, s, a, c, d, f) => {
    o.arcTo(s, a, c, d, f);
  } : (o, s, a, c, d, f) => {
    o.arcTo(a, s, d, c, f);
  }, i = e == 0 ? (o, s, a, c, d) => {
    o.rect(s, a, c, d);
  } : (o, s, a, c, d) => {
    o.rect(a, s, d, c);
  };
  return (o, s, a, c, d, f = 0, g = 0) => {
    f == 0 && g == 0 ? i(o, s, a, c, d) : (f = Dt(f, c / 2, d / 2), g = Dt(g, c / 2, d / 2), t(o, s + f, a), n(o, s + c, a, s + c, a + d, f), n(o, s + c, a + d, s, a + d, g), n(o, s, a + d, s, a, g), n(o, s, a, s + c, a, f), o.closePath());
  };
}
const qo = (e, t, n) => {
  e.moveTo(t, n);
}, Zo = (e, t, n) => {
  e.moveTo(n, t);
}, Ni = (e, t, n) => {
  e.lineTo(t, n);
}, zi = (e, t, n) => {
  e.lineTo(n, t);
}, Jo = pc(0), Sr = pc(1), mc = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, gc = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, bc = (e, t, n, i, o, s, a) => {
  e.bezierCurveTo(t, n, i, o, s, a);
}, _c = (e, t, n, i, o, s, a) => {
  e.bezierCurveTo(n, t, o, i, a, s);
};
function vc(e) {
  return (t, n, i, o, s) => Yn(t, n, (a, c, d, f, g, m, _, $, C, O, I) => {
    let { pxRound: W, points: k } = a, j, S;
    f.ori == 0 ? (j = qo, S = mc) : (j = Zo, S = gc);
    const J = me(k.width * ce, 3);
    let z = (k.size - k.width) / 2 * ce, X = me(z * 2, 3), Y = new Path2D(), ne = new Path2D(), { left: K, top: A, width: Z, height: L } = t.bbox;
    Jo(
      ne,
      K - X,
      A - X,
      Z + X * 2,
      L + X * 2
    );
    const V = (B) => {
      if (d[B] != null) {
        let oe = W(m(c[B], f, O, $)), R = W(_(d[B], g, I, C));
        j(Y, oe + z, R), S(Y, oe, R, z, 0, Do * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let B = i; B <= o; B++)
        V(B);
    return {
      stroke: J > 0 ? Y : null,
      fill: Y,
      clip: ne,
      flags: Ti | Zs
    };
  });
}
function yc(e) {
  return (t, n, i, o, s, a) => {
    i != o && (s != i && a != i && e(t, n, i), s != o && a != o && e(t, n, o), e(t, n, a));
  };
}
const mf = yc(Ni), gf = yc(zi);
function wc(e) {
  const t = ae(e?.alignGaps, 0);
  return (n, i, o, s) => Yn(n, i, (a, c, d, f, g, m, _, $, C, O, I) => {
    [o, s] = Wo(d, o, s);
    let W = a.pxRound, k = (L) => W(m(L, f, O, $)), j = (L) => W(_(L, g, I, C)), S, J;
    f.ori == 0 ? (S = Ni, J = mf) : (S = zi, J = gf);
    const z = f.dir * (f.ori == 0 ? 1 : -1), X = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Ti }, Y = X.stroke;
    let ne = !1;
    if (s - o >= O * 4) {
      let L = (H) => n.posToVal(H, f.key, !0), V = null, B = null, oe, R, et, we = k(c[z == 1 ? o : s]), se = k(c[o]), de = k(c[s]), ee = L(z == 1 ? se + 1 : de - 1);
      for (let H = z == 1 ? o : s; H >= o && H <= s; H += z) {
        let De = c[H], xe = (z == 1 ? De < ee : De > ee) ? we : k(De), ue = d[H];
        xe == we ? ue != null ? (R = ue, V == null ? (S(Y, xe, j(R)), oe = V = B = R) : R < V ? V = R : R > B && (B = R)) : ue === null && (ne = !0) : (V != null && J(Y, we, j(V), j(B), j(oe), j(R)), ue != null ? (R = ue, S(Y, xe, j(R)), V = B = oe = R) : (V = B = null, ue === null && (ne = !0)), we = xe, ee = L(we + z));
      }
      V != null && V != B && et != we && J(Y, we, j(V), j(B), j(oe), j(R));
    } else
      for (let L = z == 1 ? o : s; L >= o && L <= s; L += z) {
        let V = d[L];
        V === null ? ne = !0 : V != null && S(Y, k(c[L]), j(V));
      }
    let [A, Z] = $r(n, i);
    if (a.fill != null || A != 0) {
      let L = X.fill = new Path2D(Y), V = a.fillTo(n, i, a.min, a.max, A), B = j(V), oe = k(c[o]), R = k(c[s]);
      z == -1 && ([R, oe] = [oe, R]), S(L, R, B), S(L, oe, B);
    }
    if (!a.spanGaps) {
      let L = [];
      ne && L.push(...kr(c, d, o, s, z, k, t)), X.gaps = L = a.gaps(n, i, o, s, L), X.clip = Yo(L, f.ori, $, C, O, I);
    }
    return Z != 0 && (X.band = Z == 2 ? [
      Xt(n, i, o, s, Y, -1),
      Xt(n, i, o, s, Y, 1)
    ] : Xt(n, i, o, s, Y, Z)), X;
  });
}
function bf(e) {
  const t = ae(e.align, 1), n = ae(e.ascDesc, !1), i = ae(e.alignGaps, 0), o = ae(e.extend, !1);
  return (s, a, c, d) => Yn(s, a, (f, g, m, _, $, C, O, I, W, k, j) => {
    [c, d] = Wo(m, c, d);
    let S = f.pxRound, { left: J, width: z } = s.bbox, X = (se) => S(C(se, _, k, I)), Y = (se) => S(O(se, $, j, W)), ne = _.ori == 0 ? Ni : zi;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Ti }, A = K.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let L = Y(m[Z == 1 ? c : d]), V = X(g[Z == 1 ? c : d]), B = V, oe = V;
    o && t == -1 && (oe = J, ne(A, oe, L)), ne(A, V, L);
    for (let se = Z == 1 ? c : d; se >= c && se <= d; se += Z) {
      let de = m[se];
      if (de == null)
        continue;
      let ee = X(g[se]), H = Y(de);
      t == 1 ? ne(A, ee, L) : ne(A, B, H), ne(A, ee, H), L = H, B = ee;
    }
    let R = B;
    o && t == 1 && (R = J + z, ne(A, R, L));
    let [et, we] = $r(s, a);
    if (f.fill != null || et != 0) {
      let se = K.fill = new Path2D(A), de = f.fillTo(s, a, f.min, f.max, et), ee = Y(de);
      ne(se, R, ee), ne(se, oe, ee);
    }
    if (!f.spanGaps) {
      let se = [];
      se.push(...kr(g, m, c, d, Z, X, i));
      let de = f.width * ce / 2, ee = n || t == 1 ? de : -de, H = n || t == -1 ? -de : de;
      se.forEach((De) => {
        De[0] += ee, De[1] += H;
      }), K.gaps = se = f.gaps(s, a, c, d, se), K.clip = Yo(se, _.ori, I, W, k, j);
    }
    return we != 0 && (K.band = we == 2 ? [
      Xt(s, a, c, d, A, -1),
      Xt(s, a, c, d, A, 1)
    ] : Xt(s, a, c, d, A, we)), K;
  });
}
function ll(e, t, n, i, o, s, a = pe) {
  if (e.length > 1) {
    let c = null;
    for (let d = 0, f = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (c != null) {
          let g = ze(e[d] - e[c]);
          g < f && (f = g, a = ze(n(e[d], i, o, s) - n(e[c], i, o, s)));
        }
        c = d;
      }
  }
  return a;
}
function _f(e) {
  e = e || to;
  const t = ae(e.size, [0.6, pe, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), a = 1 - t[0], c = ae(t[1], pe), d = ae(t[2], 1), f = ae(e.disp, to), g = ae(e.each, ($) => {
  }), { fill: m, stroke: _ } = f;
  return ($, C, O, I) => Yn($, C, (W, k, j, S, J, z, X, Y, ne, K, A) => {
    let Z = W.pxRound, L = n, V = i * ce, B = c * ce, oe = d * ce, R, et;
    S.ori == 0 ? [R, et] = s($, C) : [et, R] = s($, C);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let se = S.ori == 0 ? Jo : Sr, de = S.ori == 0 ? g : (D, ge, Me, Qn, Cn, Ht, Tn) => {
      g(D, ge, Me, Cn, Qn, Tn, Ht);
    }, ee = ae($.bands, _r).find((D) => D.series[0] == C), H = ee != null ? ee.dir : 0, De = W.fillTo($, C, W.min, W.max, H), Ye = Z(X(De, J, A, ne)), xe, ue, kt, st = K, ke = Z(W.width * ce), Lt = !1, Kt = null, pt = null, an = null, qn = null;
    m != null && (ke == 0 || _ != null) && (Lt = !0, Kt = m.values($, C, O, I), pt = /* @__PURE__ */ new Map(), new Set(Kt).forEach((D) => {
      D != null && pt.set(D, new Path2D());
    }), ke > 0 && (an = _.values($, C, O, I), qn = /* @__PURE__ */ new Map(), new Set(an).forEach((D) => {
      D != null && qn.set(D, new Path2D());
    })));
    let { x0: Zn, size: Fi } = f;
    if (Zn != null && Fi != null) {
      L = 1, k = Zn.values($, C, O, I), Zn.unit == 2 && (k = k.map((Me) => $.posToVal(Y + Me * K, S.key, !0)));
      let D = Fi.values($, C, O, I);
      Fi.unit == 2 ? ue = D[0] * K : ue = z(D[0], S, K, Y) - z(0, S, K, Y), st = ll(k, j, z, S, K, Y, st), kt = st - ue + V;
    } else
      st = ll(k, j, z, S, K, Y, st), kt = st * a + V, ue = st - kt;
    kt < 1 && (kt = 0), ke >= ue / 2 && (ke = 0), kt < 5 && (Z = Wl);
    let uo = kt > 0, Sn = st - kt - (uo ? ke : 0);
    ue = Z(Ks(Sn, oe, B)), xe = (L == 0 ? ue / 2 : L == we ? 0 : ue) - L * we * ((L == 0 ? V / 2 : 0) + (uo ? ke / 2 : 0));
    const qe = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Jn = Lt ? null : new Path2D();
    let Yt = null;
    if (ee != null)
      Yt = $.data[ee.series[1]];
    else {
      let { y0: D, y1: ge } = f;
      D != null && ge != null && (j = ge.values($, C, O, I), Yt = D.values($, C, O, I));
    }
    let An = R * ue, q = et * ue;
    for (let D = we == 1 ? O : I; D >= O && D <= I; D += we) {
      let ge = j[D];
      if (ge == null)
        continue;
      if (Yt != null) {
        let tt = Yt[D] ?? 0;
        if (ge - tt == 0)
          continue;
        Ye = X(tt, J, A, ne);
      }
      let Me = S.distr != 2 || f != null ? k[D] : D, Qn = z(Me, S, K, Y), Cn = X(ae(ge, De), J, A, ne), Ht = Z(Qn - xe), Tn = Z(Xe(Cn, Ye)), rt = Z(Dt(Cn, Ye)), mt = Tn - rt;
      if (ge != null) {
        let tt = ge < 0 ? q : An, St = ge < 0 ? An : q;
        Lt ? (ke > 0 && an[D] != null && se(qn.get(an[D]), Ht, rt + ht(ke / 2), ue, Xe(0, mt - ke), tt, St), Kt[D] != null && se(pt.get(Kt[D]), Ht, rt + ht(ke / 2), ue, Xe(0, mt - ke), tt, St)) : se(Jn, Ht, rt + ht(ke / 2), ue, Xe(0, mt - ke), tt, St), de(
          $,
          C,
          D,
          Ht - ke / 2,
          rt,
          ue + ke,
          mt
        );
      }
    }
    return ke > 0 ? qe.stroke = Lt ? qn : Jn : Lt || (qe._fill = W.width == 0 ? W._fill : W._stroke ?? W._fill, qe.width = 0), qe.fill = Lt ? pt : Jn, qe;
  });
}
function vf(e, t) {
  const n = ae(t?.alignGaps, 0);
  return (i, o, s, a) => Yn(i, o, (c, d, f, g, m, _, $, C, O, I, W) => {
    [s, a] = Wo(f, s, a);
    let k = c.pxRound, j = (R) => k(_(R, g, I, C)), S = (R) => k($(R, m, W, O)), J, z, X;
    g.ori == 0 ? (J = qo, X = Ni, z = bc) : (J = Zo, X = zi, z = _c);
    const Y = g.dir * (g.ori == 0 ? 1 : -1);
    let ne = j(d[Y == 1 ? s : a]), K = ne, A = [], Z = [];
    for (let R = Y == 1 ? s : a; R >= s && R <= a; R += Y)
      if (f[R] != null) {
        let we = d[R], se = j(we);
        A.push(K = se), Z.push(S(f[R]));
      }
    const L = { stroke: e(A, Z, J, X, z, k), fill: null, clip: null, band: null, gaps: null, flags: Ti }, V = L.stroke;
    let [B, oe] = $r(i, o);
    if (c.fill != null || B != 0) {
      let R = L.fill = new Path2D(V), et = c.fillTo(i, o, c.min, c.max, B), we = S(et);
      X(R, K, we), X(R, ne, we);
    }
    if (!c.spanGaps) {
      let R = [];
      R.push(...kr(d, f, s, a, Y, j, n)), L.gaps = R = c.gaps(i, o, s, a, R), L.clip = Yo(R, g.ori, C, O, I, W);
    }
    return oe != 0 && (L.band = oe == 2 ? [
      Xt(i, o, s, a, V, -1),
      Xt(i, o, s, a, V, 1)
    ] : Xt(i, o, s, a, V, oe)), L;
  });
}
function yf(e) {
  return vf(wf, e);
}
function wf(e, t, n, i, o, s) {
  const a = e.length;
  if (a < 2)
    return null;
  const c = new Path2D();
  if (n(c, e[0], t[0]), a == 2)
    i(c, e[1], t[1]);
  else {
    let d = Array(a), f = Array(a - 1), g = Array(a - 1), m = Array(a - 1);
    for (let _ = 0; _ < a - 1; _++)
      g[_] = t[_ + 1] - t[_], m[_] = e[_ + 1] - e[_], f[_] = g[_] / m[_];
    d[0] = f[0];
    for (let _ = 1; _ < a - 1; _++)
      f[_] === 0 || f[_ - 1] === 0 || f[_ - 1] > 0 != f[_] > 0 ? d[_] = 0 : (d[_] = 3 * (m[_ - 1] + m[_]) / ((2 * m[_] + m[_ - 1]) / f[_ - 1] + (m[_] + 2 * m[_ - 1]) / f[_]), isFinite(d[_]) || (d[_] = 0));
    d[a - 1] = f[a - 2];
    for (let _ = 0; _ < a - 1; _++)
      o(
        c,
        e[_] + m[_] / 3,
        t[_] + d[_] * m[_] / 3,
        e[_ + 1] - m[_] / 3,
        t[_ + 1] - d[_ + 1] * m[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return c;
}
const Js = /* @__PURE__ */ new Set();
function cl() {
  for (let e of Js)
    e.syncRect(!0);
}
Mi && (In(ed, wi, cl), In(td, wi, cl, !0), In(Lo, wi, () => {
  Ke.pxRatio = ce;
}));
const xf = wc(), $f = vc();
function ul(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, a) => Qs(s, a, t, n));
}
function kf(e, t) {
  return e.map((n, i) => i == 0 ? {} : Ee({}, t, n));
}
function Qs(e, t, n, i) {
  return Ee({}, t == 0 ? n : i, e);
}
function xc(e, t, n) {
  return t == null ? Ai : [t, n];
}
const Sf = xc;
function Af(e, t, n) {
  return t == null ? Ai : Ho(t, n, gr, !0);
}
function $c(e, t, n, i) {
  return t == null ? Ai : Vo(t, n, e.scales[i].log, !1);
}
const Cf = $c;
function kc(e, t, n, i) {
  return t == null ? Ai : mr(t, n, e.scales[i].log, !1);
}
const Tf = kc;
function Ef(e, t, n, i, o) {
  let s = Xe(Ia(e), Ia(t)), a = t - e, c = Pt(o / i * a, n);
  do {
    let d = n[c], f = i * d / a;
    if (f >= o && s + (d < 5 ? vn.get(d) : 0) <= 17)
      return [d, f];
  } while (++c < n.length);
  return [0, 0];
}
function hl(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Ne((n = +o) * ce)) + "px"), [e, t, n];
}
function Pf(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let n = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, n + "px"), t[1] = n;
  });
}
function Ke(e, t, n) {
  const i = {
    mode: ae(e.mode, 1)
  }, o = i.mode;
  function s(r, l, u, h) {
    let p = l.valToPct(r);
    return h + u * (l.dir == -1 ? 1 - p : p);
  }
  function a(r, l, u, h) {
    let p = l.valToPct(r);
    return h + u * (l.dir == -1 ? p : 1 - p);
  }
  function c(r, l, u, h) {
    return l.ori == 0 ? s(r, l, u, h) : a(r, l, u, h);
  }
  i.valToPosH = s, i.valToPosV = a;
  let d = !1;
  i.status = 0;
  const f = i.root = wt(Lh);
  if (e.id != null && (f.id = e.id), ut(f, e.class), e.title) {
    let r = wt(Rh, f);
    r.textContent = e.title;
  }
  const g = Et("canvas"), m = i.ctx = g.getContext("2d"), _ = wt(Bh, f);
  In("click", _, (r) => {
    r.target === C && (be != ci || $e != ui) && Ve.click(i, r);
  }, !0);
  const $ = i.under = wt(jh, _);
  _.appendChild(g);
  const C = i.over = wt(Ih, _);
  e = Ci(e);
  const O = +ae(e.pxAlign, 1), I = al(O);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(i, e) || e);
  });
  const W = e.ms || 1e-3, k = i.series = o == 1 ? ul(e.series || [], el, sl, !1) : kf(e.series || [null], ol), j = i.axes = ul(e.axes || [], Xa, nl, !0), S = i.scales = {}, J = i.bands = e.bands || [];
  J.forEach((r) => {
    r.fill = ie(r.fill || null), r.dir = ae(r.dir, -1);
  });
  const z = o == 2 ? k[1].facets[0].scale : k[0].scale, X = {
    axes: Bc,
    series: Oc
  }, Y = (e.drawOrder || ["axes", "series"]).map((r) => X[r]);
  function ne(r) {
    const l = r.distr == 3 ? (u) => Qt(u > 0 ? u : r.clamp(i, u, r.min, r.max, r.key)) : r.distr == 4 ? (u) => zs(u, r.asinh) : r.distr == 100 ? (u) => r.fwd(u) : (u) => u;
    return (u) => {
      let h = l(u), { _min: p, _max: b } = r, y = b - p;
      return (h - p) / y;
    };
  }
  function K(r) {
    let l = S[r];
    if (l == null) {
      let u = (e.scales || to)[r] || to;
      if (u.from != null) {
        K(u.from);
        let h = Ee({}, S[u.from], u, { key: r });
        h.valToPct = ne(h), S[r] = h;
      } else {
        l = S[r] = Ee({}, r == z ? dc : df, u), l.key = r;
        let h = l.time, p = l.range, b = pn(p);
        if ((r != z || o == 2 && !h) && (b && (p[0] == null || p[1] == null) && (p = {
          min: p[0] == null ? Ra : {
            mode: 1,
            hard: p[0],
            soft: p[0]
          },
          max: p[1] == null ? Ra : {
            mode: 1,
            hard: p[1],
            soft: p[1]
          }
        }, b = !1), !b && Ko(p))) {
          let y = p;
          p = (w, x, T) => x == null ? Ai : Ho(x, T, y);
        }
        l.range = ie(p || (h ? Sf : r == z ? l.distr == 3 ? Cf : l.distr == 4 ? Tf : xc : l.distr == 3 ? $c : l.distr == 4 ? kc : Af)), l.auto = ie(b ? !1 : l.auto), l.clamp = ie(l.clamp || hf), l._min = l._max = null, l.valToPct = ne(l);
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
  const A = S[z], Z = A.distr;
  let L, V;
  A.ori == 0 ? (ut(f, Hh), L = s, V = a) : (ut(f, Fh), L = a, V = s);
  const B = {};
  for (let r in S) {
    let l = S[r];
    (l.min != null || l.max != null) && (B[r] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const oe = e.tzDate || ((r) => new Date(Ne(r / W))), R = e.fmtDate || vr, et = W == 1 ? Hd(oe) : Bd(oe), we = Za(oe, qa(W == 1 ? Ld : Rd, R)), se = Qa(oe, Ja(Id, R)), de = [], ee = i.legend = Ee({}, Vd, e.legend), H = i.cursor = Ee({}, Jd, { drag: { y: o == 2 } }, e.cursor), De = ee.show, Ye = H.show, xe = ee.markers;
  ee.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, kt, st, ke = [], Lt = [], Kt, pt = !1, an = {};
  if (ee.live) {
    const r = k[1] ? k[1].values : null;
    pt = r != null, Kt = pt ? r(i, 1, 0) : { _: 0 };
    for (let l in Kt)
      an[l] = fr;
  }
  if (De)
    if (ue = Et("table", Yh, f), st = Et("tbody", null, ue), ee.mount(i, ue), pt) {
      kt = Et("thead", null, ue, st);
      let r = Et("tr", null, kt);
      Et("th", null, r);
      for (var qn in Kt)
        Et("th", Aa, r).textContent = qn;
    } else
      ut(ue, Zh), ee.live && ut(ue, qh);
  const Zn = { show: !0 }, Fi = { show: !1 };
  function uo(r, l) {
    if (l == 0 && (pt || !ee.live || o == 2))
      return Ai;
    let u = [], h = Et("tr", Jh, st, st.childNodes[l]);
    ut(h, r.class), r.show || ut(h, Rn);
    let p = Et("th", null, h);
    if (xe.show) {
      let w = wt(Qh, p);
      if (l > 0) {
        let x = xe.width(i, l);
        x && (w.style.border = x + "px " + xe.dash(i, l) + " " + xe.stroke(i, l)), w.style.background = xe.fill(i, l);
      }
    }
    let b = wt(Aa, p);
    r.label instanceof HTMLElement ? b.appendChild(r.label) : b.textContent = r.label, l > 0 && (xe.show || (b.style.color = r.width > 0 ? xe.stroke(i, l) : xe.fill(i, l)), qe("click", p, (w) => {
      if (H._lock)
        return;
      Pn(w);
      let x = k.indexOf(r);
      if ((w.ctrlKey || w.metaKey) != ee.isolate) {
        let T = k.some((E, M) => M > 0 && M != x && E.show);
        k.forEach((E, M) => {
          M > 0 && Rt(M, T ? M == x ? Zn : Fi : Zn, !0, Te.setSeries);
        });
      } else
        Rt(x, { show: !r.show }, !0, Te.setSeries);
    }, !1), ei && qe(Pa, p, (w) => {
      H._lock || (Pn(w), Rt(k.indexOf(r), di, !0, Te.setSeries));
    }, !1));
    for (var y in Kt) {
      let w = Et("td", Xh, h);
      w.textContent = "--", u.push(w);
    }
    return [h, u];
  }
  const Sn = /* @__PURE__ */ new Map();
  function qe(r, l, u, h = !0) {
    const p = Sn.get(l) || {}, b = H.bind[r](i, l, u, h);
    b && (In(r, l, p[r] = b), Sn.set(l, p));
  }
  function Jn(r, l, u) {
    const h = Sn.get(l) || {};
    for (let p in h)
      (r == null || p == r) && (Gs(p, l, h[p]), delete h[p]);
    r == null && Sn.delete(l);
  }
  let Yt = 0, An = 0, q = 0, D = 0, ge = 0, Me = 0, Qn = ge, Cn = Me, Ht = q, Tn = D, rt = 0, mt = 0, tt = 0, St = 0;
  i.bbox = {};
  let es = !1, ho = !1, Xn = !1, En = !1, fo = !1, gt = !1;
  function ts(r, l, u) {
    (u || r != i.width || l != i.height) && Tr(r, l), si(!1), Xn = !0, ho = !0, ri();
  }
  function Tr(r, l) {
    i.width = Yt = q = r, i.height = An = D = l, ge = Me = 0, Tc(), Ec();
    let u = i.bbox;
    rt = u.left = Hn(ge * ce, 0.5), mt = u.top = Hn(Me * ce, 0.5), tt = u.width = Hn(q * ce, 0.5), St = u.height = Hn(D * ce, 0.5);
  }
  const Sc = 3;
  function Ac() {
    let r = !1, l = 0;
    for (; !r; ) {
      l++;
      let u = Fc(l), h = Rc(l);
      r = l == Sc || u && h, r || (Tr(i.width, i.height), ho = !0);
    }
  }
  function Cc({ width: r, height: l }) {
    ts(r, l);
  }
  i.setSize = Cc;
  function Tc() {
    let r = !1, l = !1, u = !1, h = !1;
    j.forEach((p, b) => {
      if (p.show && p._show) {
        let { side: y, _size: w } = p, x = y % 2, T = p.label != null ? p.labelSize : 0, E = w + T;
        E > 0 && (x ? (q -= E, y == 3 ? (ge += E, h = !0) : u = !0) : (D -= E, y == 0 ? (Me += E, r = !0) : l = !0));
      }
    }), Dn[0] = r, Dn[1] = u, Dn[2] = l, Dn[3] = h, q -= ln[1] + ln[3], ge += ln[3], D -= ln[2] + ln[0], Me += ln[0];
  }
  function Ec() {
    let r = ge + q, l = Me + D, u = ge, h = Me;
    function p(b, y) {
      switch (b) {
        case 1:
          return r += y, r - y;
        case 2:
          return l += y, l - y;
        case 3:
          return u -= y, u + y;
        case 0:
          return h -= y, h + y;
      }
    }
    j.forEach((b, y) => {
      if (b.show && b._show) {
        let w = b.side;
        b._pos = p(w, b._size), b.label != null && (b._lpos = p(w, b.labelSize));
      }
    });
  }
  if (H.dataIdx == null) {
    let r = H.hover, l = r.skip = new Set(r.skip ?? []);
    l.add(void 0);
    let u = r.prox = ie(r.prox), h = r.bias ??= 0;
    H.dataIdx = (p, b, y, w) => {
      if (b == 0)
        return y;
      let x = y, T = u(p, b, y, w) ?? pe, E = T >= 0 && T < pe, M = A.ori == 0 ? q : D, G = H.left, le = t[0], re = t[b];
      if (l.has(re[y])) {
        x = null;
        let te = null, U = null, F;
        if (h == 0 || h == -1)
          for (F = y; te == null && F-- > 0; )
            l.has(re[F]) || (te = F);
        if (h == 0 || h == 1)
          for (F = y; U == null && F++ < re.length; )
            l.has(re[F]) || (U = F);
        if (te != null || U != null)
          if (E) {
            let ve = te == null ? -1 / 0 : L(le[te], A, M, 0), Se = U == null ? 1 / 0 : L(le[U], A, M, 0), je = G - ve, fe = Se - G;
            je <= fe ? je <= T && (x = te) : fe <= T && (x = U);
          } else
            x = U == null ? te : te == null ? U : y - te <= U - y ? te : U;
      } else E && ze(G - L(le[y], A, M, 0)) > T && (x = null);
      return x;
    };
  }
  const Pn = (r) => {
    H.event = r;
  };
  H.idxs = de, H._lock = !1;
  let Ge = H.points;
  Ge.show = ie(Ge.show), Ge.size = ie(Ge.size), Ge.stroke = ie(Ge.stroke), Ge.width = ie(Ge.width), Ge.fill = ie(Ge.fill);
  const Ft = i.focus = Ee({}, e.focus || { alpha: 0.3 }, H.focus), ei = Ft.prox >= 0, ti = ei && Ge.one;
  let bt = [], ni = [], ii = [];
  function Er(r, l) {
    let u = Ge.show(i, l);
    if (u instanceof HTMLElement)
      return ut(u, Kh), ut(u, r.class), Ut(u, -10, -10, q, D), C.insertBefore(u, bt[l]), u;
  }
  function Pr(r, l) {
    if (o == 1 || l > 0) {
      let u = o == 1 && S[r.scale].time, h = r.value;
      r.value = u ? Va(h) ? Qa(oe, Ja(h, R)) : h || se : h || lf, r.label = r.label || (u ? Xd : Qd);
    }
    if (ti || l > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || xf || hd, r.fillTo = ie(r.fillTo || ff), r.pxAlign = +ae(r.pxAlign, O), r.pxRound = al(r.pxAlign), r.stroke = ie(r.stroke || null), r.fill = ie(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let u = cf(Xe(1, r.width), 1), h = r.points = Ee({}, {
        size: u,
        width: Xe(1, u * 0.2),
        stroke: r.stroke,
        space: u * 2,
        paths: $f,
        _stroke: null,
        _fill: null
      }, r.points);
      h.show = ie(h.show), h.filter = ie(h.filter), h.fill = ie(h.fill), h.stroke = ie(h.stroke), h.paths = ie(h.paths), h.pxAlign = r.pxAlign;
    }
    if (De) {
      let u = uo(r, l);
      ke.splice(l, 0, u[0]), Lt.splice(l, 0, u[1]), ee.values.push(null);
    }
    if (Ye) {
      de.splice(l, 0, null);
      let u = null;
      ti ? l == 0 && (u = Er(r, l)) : l > 0 && (u = Er(r, l)), bt.splice(l, 0, u), ni.splice(l, 0, 0), ii.splice(l, 0, 0);
    }
    Be("addSeries", l);
  }
  function Pc(r, l) {
    l = l ?? k.length, r = o == 1 ? Qs(r, l, el, sl) : Qs(r, l, {}, ol), k.splice(l, 0, r), Pr(k[l], l);
  }
  i.addSeries = Pc;
  function Dc(r) {
    if (k.splice(r, 1), De) {
      ee.values.splice(r, 1), Lt.splice(r, 1);
      let l = ke.splice(r, 1)[0];
      Jn(null, l.firstChild), l.remove();
    }
    Ye && (de.splice(r, 1), bt.splice(r, 1)[0].remove(), ni.splice(r, 1), ii.splice(r, 1)), Be("delSeries", r);
  }
  i.delSeries = Dc;
  const Dn = [!1, !1, !1, !1];
  function Mc(r, l) {
    if (r._show = r.show, r.show) {
      let u = r.side % 2, h = S[r.scale];
      h == null && (r.scale = u ? k[1].scale : z, h = S[r.scale]);
      let p = h.time;
      r.size = ie(r.size), r.space = ie(r.space), r.rotate = ie(r.rotate), pn(r.incrs) && r.incrs.forEach((y) => {
        !vn.has(y) && vn.set(y, Kl(y));
      }), r.incrs = ie(r.incrs || (h.distr == 2 ? Nd : p ? W == 1 ? Od : Fd : Fn)), r.splits = ie(r.splits || (p && h.distr == 1 ? et : h.distr == 3 ? Ys : h.distr == 4 ? nf : tf)), r.stroke = ie(r.stroke), r.grid.stroke = ie(r.grid.stroke), r.ticks.stroke = ie(r.ticks.stroke), r.border.stroke = ie(r.border.stroke);
      let b = r.values;
      r.values = // static array of tick values
      pn(b) && !pn(b[0]) ? ie(b) : (
        // temporal
        p ? (
          // config array of fmtDate string tpls
          pn(b) ? Za(oe, qa(b, R)) : (
            // fmtDate string tpl
            Va(b) ? jd(oe, b) : b || we
          )
        ) : b || ef
      ), r.filter = ie(r.filter || (h.distr >= 3 && h.log == 10 ? rf : h.distr == 3 && h.log == 2 ? af : Vl)), r.font = hl(r.font), r.labelFont = hl(r.labelFont), r._size = r.size(i, null, l, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (Dn[l] = !0, r._el = wt(Uh, _));
    }
  }
  function Ri(r, l, u, h) {
    let [p, b, y, w] = u, x = l % 2, T = 0;
    return x == 0 && (w || b) && (T = l == 0 && !p || l == 2 && !y ? Ne(Xa.size / 3) : 0), x == 1 && (p || y) && (T = l == 1 && !b || l == 3 && !w ? Ne(nl.size / 2) : 0), T;
  }
  const Dr = i.padding = (e.padding || [Ri, Ri, Ri, Ri]).map((r) => ie(ae(r, Ri))), ln = i._padding = Dr.map((r, l) => r(i, l, Dn, 0));
  let We, Le = null, He = null;
  const po = o == 1 ? k[0].idxs : null;
  let At = null, Bi = !1;
  function Mr(r, l) {
    if (t = r ?? [], i.data = i._data = t, o == 2) {
      We = 0;
      for (let u = 1; u < k.length; u++)
        We += t[u][0].length;
    } else {
      t.length == 0 && (i.data = i._data = t = [[]]), At = t[0], We = At.length;
      let u = t;
      if (Z == 2) {
        u = t.slice();
        let h = u[0] = Array(We);
        for (let p = 0; p < We; p++)
          h[p] = p;
      }
      i._data = t = u;
    }
    if (si(!0), Be("setData"), Z == 2 && (Xn = !0), l !== !1) {
      let u = A;
      u.auto(i, Bi) ? ns() : un(z, u.min, u.max), En = En || H.left >= 0, gt = !0, ri();
    }
  }
  i.setData = Mr;
  function ns() {
    Bi = !0;
    let r, l;
    o == 1 && (We > 0 ? (Le = po[0] = 0, He = po[1] = We - 1, r = t[0][Le], l = t[0][He], Z == 2 ? (r = Le, l = He) : r == l && (Z == 3 ? [r, l] = Vo(r, r, A.log, !1) : Z == 4 ? [r, l] = mr(r, r, A.log, !1) : A.time ? l = r + Ne(86400 / W) : [r, l] = Ho(r, l, gr, !0))) : (Le = po[0] = r = null, He = po[1] = l = null)), un(z, r, l);
  }
  let mo, oi, is, os, ss, rs, as, ls, cs, nt;
  function Nr(r, l, u, h, p, b) {
    r ??= Ta, u ??= _r, h ??= "butt", p ??= Ta, b ??= "round", r != mo && (m.strokeStyle = mo = r), p != oi && (m.fillStyle = oi = p), l != is && (m.lineWidth = is = l), b != ss && (m.lineJoin = ss = b), h != rs && (m.lineCap = rs = h), u != os && m.setLineDash(os = u);
  }
  function zr(r, l, u, h) {
    l != oi && (m.fillStyle = oi = l), r != as && (m.font = as = r), u != ls && (m.textAlign = ls = u), h != cs && (m.textBaseline = cs = h);
  }
  function us(r, l, u, h, p = 0) {
    if (h.length > 0 && r.auto(i, Bi) && (l == null || l.min == null)) {
      let b = ae(Le, 0), y = ae(He, h.length - 1), w = u.min == null ? sd(h, b, y, p, r.distr == 3) : [u.min, u.max];
      r.min = Dt(r.min, u.min = w[0]), r.max = Xe(r.max, u.max = w[1]);
    }
  }
  const Or = { min: null, max: null };
  function Nc() {
    for (let h in S) {
      let p = S[h];
      B[h] == null && // scales that have never been set (on init)
      (p.min == null || // or auto scales when the x scale was explicitly set
      B[z] != null && p.auto(i, Bi)) && (B[h] = Or);
    }
    for (let h in S) {
      let p = S[h];
      B[h] == null && p.from != null && B[p.from] != null && (B[h] = Or);
    }
    B[z] != null && si(!0);
    let r = {};
    for (let h in B) {
      let p = B[h];
      if (p != null) {
        let b = r[h] = Ci(S[h], pd);
        if (p.min != null)
          Ee(b, p);
        else if (h != z || o == 2)
          if (We == 0 && b.from == null) {
            let y = b.range(i, null, null, h);
            b.min = y[0], b.max = y[1];
          } else
            b.min = pe, b.max = -pe;
      }
    }
    if (We > 0) {
      k.forEach((h, p) => {
        if (o == 1) {
          let b = h.scale, y = B[b];
          if (y == null)
            return;
          let w = r[b];
          if (p == 0) {
            let x = w.range(i, w.min, w.max, b);
            w.min = x[0], w.max = x[1], Le = Pt(w.min, t[0]), He = Pt(w.max, t[0]), He - Le > 1 && (t[0][Le] < w.min && Le++, t[0][He] > w.max && He--), h.min = At[Le], h.max = At[He];
          } else h.show && h.auto && us(w, y, h, t[p], h.sorted);
          h.idxs[0] = Le, h.idxs[1] = He;
        } else if (p > 0 && h.show && h.auto) {
          let [b, y] = h.facets, w = b.scale, x = y.scale, [T, E] = t[p], M = r[w], G = r[x];
          M != null && us(M, B[w], b, T, b.sorted), G != null && us(G, B[x], y, E, y.sorted), h.min = y.min, h.max = y.max;
        }
      });
      for (let h in r) {
        let p = r[h], b = B[h];
        if (p.from == null && (b == null || b.min == null)) {
          let y = p.range(
            i,
            p.min == pe ? null : p.min,
            p.max == -pe ? null : p.max,
            h
          );
          p.min = y[0], p.max = y[1];
        }
      }
    }
    for (let h in r) {
      let p = r[h];
      if (p.from != null) {
        let b = r[p.from];
        if (b.min == null)
          p.min = p.max = null;
        else {
          let y = p.range(i, b.min, b.max, h);
          p.min = y[0], p.max = y[1];
        }
      }
    }
    let l = {}, u = !1;
    for (let h in r) {
      let p = r[h], b = S[h];
      if (b.min != p.min || b.max != p.max) {
        b.min = p.min, b.max = p.max;
        let y = b.distr;
        b._min = y == 3 ? Qt(b.min) : y == 4 ? zs(b.min, b.asinh) : y == 100 ? b.fwd(b.min) : b.min, b._max = y == 3 ? Qt(b.max) : y == 4 ? zs(b.max, b.asinh) : y == 100 ? b.fwd(b.max) : b.max, l[h] = u = !0;
      }
    }
    if (u) {
      k.forEach((h, p) => {
        o == 2 ? p > 0 && l.y && (h._paths = null) : l[h.scale] && (h._paths = null);
      });
      for (let h in l)
        Xn = !0, Be("setScale", h);
      Ye && H.left >= 0 && (En = gt = !0);
    }
    for (let h in B)
      B[h] = null;
  }
  function zc(r) {
    let l = Ks(Le - 1, 0, We - 1), u = Ks(He + 1, 0, We - 1);
    for (; r[l] == null && l > 0; )
      l--;
    for (; r[u] == null && u < We - 1; )
      u++;
    return [l, u];
  }
  function Oc() {
    if (We > 0) {
      let r = k.some((l) => l._focus) && nt != Ft.alpha;
      r && (m.globalAlpha = nt = Ft.alpha), k.forEach((l, u) => {
        if (u > 0 && l.show && (Lr(u, !1), Lr(u, !0), l._paths == null)) {
          let h = nt;
          nt != l.alpha && (m.globalAlpha = nt = l.alpha);
          let p = o == 2 ? [0, t[u][0].length - 1] : zc(t[u]);
          l._paths = l.paths(i, u, p[0], p[1]), nt != h && (m.globalAlpha = nt = h);
        }
      }), k.forEach((l, u) => {
        if (u > 0 && l.show) {
          let h = nt;
          nt != l.alpha && (m.globalAlpha = nt = l.alpha), l._paths != null && Hr(u, !1);
          {
            let p = l._paths != null ? l._paths.gaps : null, b = l.points.show(i, u, Le, He, p), y = l.points.filter(i, u, b, p);
            (b || y) && (l.points._paths = l.points.paths(i, u, Le, He, y), Hr(u, !0));
          }
          nt != h && (m.globalAlpha = nt = h), Be("drawSeries", u);
        }
      }), r && (m.globalAlpha = nt = 1);
    }
  }
  function Lr(r, l) {
    let u = l ? k[r].points : k[r];
    u._stroke = u.stroke(i, r), u._fill = u.fill(i, r);
  }
  function Hr(r, l) {
    let u = l ? k[r].points : k[r], {
      stroke: h,
      fill: p,
      clip: b,
      flags: y,
      _stroke: w = u._stroke,
      _fill: x = u._fill,
      _width: T = u.width
    } = u._paths;
    T = me(T * ce, 3);
    let E = null, M = T % 2 / 2;
    l && x == null && (x = T > 0 ? "#fff" : w);
    let G = u.pxAlign == 1 && M > 0;
    if (G && m.translate(M, M), !l) {
      let le = rt - T / 2, re = mt - T / 2, te = tt + T, U = St + T;
      E = new Path2D(), E.rect(le, re, te, U);
    }
    l ? hs(w, T, u.dash, u.cap, x, h, p, y, b) : Lc(r, w, T, u.dash, u.cap, x, h, p, y, E, b), G && m.translate(-M, -M);
  }
  function Lc(r, l, u, h, p, b, y, w, x, T, E) {
    let M = !1;
    x != 0 && J.forEach((G, le) => {
      if (G.series[0] == r) {
        let re = k[G.series[1]], te = t[G.series[1]], U = (re._paths || to).band;
        pn(U) && (U = G.dir == 1 ? U[0] : U[1]);
        let F, ve = null;
        re.show && U && ad(te, Le, He) ? (ve = G.fill(i, le) || b, F = re._paths.clip) : U = null, hs(l, u, h, p, ve, y, w, x, T, E, F, U), M = !0;
      }
    }), M || hs(l, u, h, p, b, y, w, x, T, E);
  }
  const Fr = Ti | Zs;
  function hs(r, l, u, h, p, b, y, w, x, T, E, M) {
    Nr(r, l, u, h, p), (x || T || M) && (m.save(), x && m.clip(x), T && m.clip(T)), M ? (w & Fr) == Fr ? (m.clip(M), E && m.clip(E), bo(p, y), go(r, b, l)) : w & Zs ? (bo(p, y), m.clip(M), go(r, b, l)) : w & Ti && (m.save(), m.clip(M), E && m.clip(E), bo(p, y), m.restore(), go(r, b, l)) : (bo(p, y), go(r, b, l)), (x || T || M) && m.restore();
  }
  function go(r, l, u) {
    u > 0 && (l instanceof Map ? l.forEach((h, p) => {
      m.strokeStyle = mo = p, m.stroke(h);
    }) : l != null && r && m.stroke(l));
  }
  function bo(r, l) {
    l instanceof Map ? l.forEach((u, h) => {
      m.fillStyle = oi = h, m.fill(u);
    }) : l != null && r && m.fill(l);
  }
  function Hc(r, l, u, h) {
    let p = j[r], b;
    if (h <= 0)
      b = [0, 0];
    else {
      let y = p._space = p.space(i, r, l, u, h), w = p._incrs = p.incrs(i, r, l, u, h, y);
      b = Ef(l, u, w, h, y);
    }
    return p._found = b;
  }
  function ds(r, l, u, h, p, b, y, w, x, T) {
    let E = y % 2 / 2;
    O == 1 && m.translate(E, E), Nr(w, y, x, T, w), m.beginPath();
    let M, G, le, re, te = p + (h == 0 || h == 3 ? -b : b);
    u == 0 ? (G = p, re = te) : (M = p, le = te);
    for (let U = 0; U < r.length; U++)
      l[U] != null && (u == 0 ? M = le = r[U] : G = re = r[U], m.moveTo(M, G), m.lineTo(le, re));
    m.stroke(), O == 1 && m.translate(-E, -E);
  }
  function Fc(r) {
    let l = !0;
    return j.forEach((u, h) => {
      if (!u.show)
        return;
      let p = S[u.scale];
      if (p.min == null) {
        u._show && (l = !1, u._show = !1, si(!1));
        return;
      } else
        u._show || (l = !1, u._show = !0, si(!1));
      let b = u.side, y = b % 2, { min: w, max: x } = p, [T, E] = Hc(h, w, x, y == 0 ? q : D);
      if (E == 0)
        return;
      let M = p.distr == 2, G = u._splits = u.splits(i, h, w, x, T, E, M), le = p.distr == 2 ? G.map((F) => At[F]) : G, re = p.distr == 2 ? At[G[1]] - At[G[0]] : T, te = u._values = u.values(i, u.filter(i, le, h, E, re), h, E, re);
      u._rotate = b == 2 ? u.rotate(i, te, h, E) : 0;
      let U = u._size;
      u._size = xt(u.size(i, te, h, r)), U != null && u._size != U && (l = !1);
    }), l;
  }
  function Rc(r) {
    let l = !0;
    return Dr.forEach((u, h) => {
      let p = u(i, h, Dn, r);
      p != ln[h] && (l = !1), ln[h] = p;
    }), l;
  }
  function Bc() {
    for (let r = 0; r < j.length; r++) {
      let l = j[r];
      if (!l.show || !l._show)
        continue;
      let u = l.side, h = u % 2, p, b, y = l.stroke(i, r), w = u == 0 || u == 3 ? -1 : 1, [x, T] = l._found;
      if (l.label != null) {
        let Je = l.labelGap * w, ct = Ne((l._lpos + Je) * ce);
        zr(l.labelFont[0], y, "center", u == 2 ? Ki : Ca), m.save(), h == 1 ? (p = b = 0, m.translate(
          ct,
          Ne(mt + St / 2)
        ), m.rotate((u == 3 ? -Do : Do) / 2)) : (p = Ne(rt + tt / 2), b = ct);
        let zn = Ul(l.label) ? l.label(i, r, x, T) : l.label;
        m.fillText(zn, p, b), m.restore();
      }
      if (T == 0)
        continue;
      let E = S[l.scale], M = h == 0 ? tt : St, G = h == 0 ? rt : mt, le = l._splits, re = E.distr == 2 ? le.map((Je) => At[Je]) : le, te = E.distr == 2 ? At[le[1]] - At[le[0]] : x, U = l.ticks, F = l.border, ve = U.show ? U.size : 0, Se = Ne(ve * ce), je = Ne((l.alignTo == 2 ? l._size - ve - l.gap : l.gap) * ce), fe = l._rotate * -Do / 180, Ae = I(l._pos * ce), at = (Se + je) * w, Ze = Ae + at;
      b = h == 0 ? Ze : 0, p = h == 1 ? Ze : 0;
      let _t = l.font[0], Ct = l.align == 1 ? bi : l.align == 2 ? Ds : fe > 0 ? bi : fe < 0 ? Ds : h == 0 ? "center" : u == 3 ? Ds : bi, jt = fe || h == 1 ? "middle" : u == 2 ? Ki : Ca;
      zr(_t, y, Ct, jt);
      let lt = l.font[1] * l.lineGap, vt = le.map((Je) => I(c(Je, E, M, G))), Tt = l._values;
      for (let Je = 0; Je < Tt.length; Je++) {
        let ct = Tt[Je];
        if (ct != null) {
          h == 0 ? p = vt[Je] : b = vt[Je], ct = "" + ct;
          let zn = ct.indexOf(`
`) == -1 ? [ct] : ct.split(/\n/gm);
          for (let Qe = 0; Qe < zn.length; Qe++) {
            let ia = zn[Qe];
            fe ? (m.save(), m.translate(p, b + Qe * lt), m.rotate(fe), m.fillText(ia, 0, 0), m.restore()) : m.fillText(ia, p, b + Qe * lt);
          }
        }
      }
      U.show && ds(
        vt,
        U.filter(i, re, r, T, te),
        h,
        u,
        Ae,
        Se,
        me(U.width * ce, 3),
        U.stroke(i, r),
        U.dash,
        U.cap
      );
      let It = l.grid;
      It.show && ds(
        vt,
        It.filter(i, re, r, T, te),
        h,
        h == 0 ? 2 : 1,
        h == 0 ? mt : rt,
        h == 0 ? St : tt,
        me(It.width * ce, 3),
        It.stroke(i, r),
        It.dash,
        It.cap
      ), F.show && ds(
        [Ae],
        [1],
        h == 0 ? 1 : 0,
        h == 0 ? 1 : 2,
        h == 1 ? mt : rt,
        h == 1 ? St : tt,
        me(F.width * ce, 3),
        F.stroke(i, r),
        F.dash,
        F.cap
      );
    }
    Be("drawAxes");
  }
  function si(r) {
    k.forEach((l, u) => {
      u > 0 && (l._paths = null, r && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((h) => {
        h.min = null, h.max = null;
      })));
    });
  }
  let _o = !1, fs = !1, ji = [];
  function jc() {
    fs = !1;
    for (let r = 0; r < ji.length; r++)
      Be(...ji[r]);
    ji.length = 0;
  }
  function ri() {
    _o || (wd(Rr), _o = !0);
  }
  function Ic(r, l = !1) {
    _o = !0, fs = l, r(i), Rr(), l && ji.length > 0 && queueMicrotask(jc);
  }
  i.batch = Ic;
  function Rr() {
    if (es && (Nc(), es = !1), Xn && (Ac(), Xn = !1), ho) {
      if (ye($, bi, ge), ye($, Ki, Me), ye($, Zi, q), ye($, Ji, D), ye(C, bi, ge), ye(C, Ki, Me), ye(C, Zi, q), ye(C, Ji, D), ye(_, Zi, Yt), ye(_, Ji, An), g.width = Ne(Yt * ce), g.height = Ne(An * ce), j.forEach(({ _el: r, _show: l, _size: u, _pos: h, side: p }) => {
        if (r != null)
          if (l) {
            let b = p === 3 || p === 0 ? u : 0, y = p % 2 == 1;
            ye(r, y ? "left" : "top", h - b), ye(r, y ? "width" : "height", u), ye(r, y ? "top" : "left", y ? Me : ge), ye(r, y ? "height" : "width", y ? D : q), Vs(r, Rn);
          } else
            ut(r, Rn);
      }), mo = oi = is = ss = rs = as = ls = cs = os = null, nt = 1, Wi(!0), ge != Qn || Me != Cn || q != Ht || D != Tn) {
        si(!1);
        let r = q / Ht, l = D / Tn;
        if (Ye && !En && H.left >= 0) {
          H.left *= r, H.top *= l, ai && Ut(ai, Ne(H.left), 0, q, D), li && Ut(li, 0, Ne(H.top), q, D);
          for (let u = 0; u < bt.length; u++) {
            let h = bt[u];
            h != null && (ni[u] *= r, ii[u] *= l, Ut(h, xt(ni[u]), xt(ii[u]), q, D));
          }
        }
        if (_e.show && !fo && _e.left >= 0 && _e.width > 0) {
          _e.left *= r, _e.width *= r, _e.top *= l, _e.height *= l;
          for (let u in vs)
            ye(hi, u, _e[u]);
        }
        Qn = ge, Cn = Me, Ht = q, Tn = D;
      }
      Be("setSize"), ho = !1;
    }
    Yt > 0 && An > 0 && (m.clearRect(0, 0, g.width, g.height), Be("drawClear"), Y.forEach((r) => r()), Be("draw")), _e.show && fo && (vo(_e), fo = !1), Ye && En && (Nn(null, !0, !1), En = !1), ee.show && ee.live && gt && (bs(), gt = !1), d || (d = !0, i.status = 1, Be("ready")), Bi = !1, _o = !1;
  }
  i.redraw = (r, l) => {
    Xn = l || !1, r !== !1 ? un(z, A.min, A.max) : ri();
  };
  function ps(r, l) {
    let u = S[r];
    if (u.from == null) {
      if (We == 0) {
        let h = u.range(i, l.min, l.max, r);
        l.min = h[0], l.max = h[1];
      }
      if (l.min > l.max) {
        let h = l.min;
        l.min = l.max, l.max = h;
      }
      if (We > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      r == z && u.distr == 2 && We > 0 && (l.min = Pt(l.min, t[0]), l.max = Pt(l.max, t[0]), l.min == l.max && l.max++), B[r] = l, es = !0, ri();
    }
  }
  i.setScale = ps;
  let ms, gs, ai, li, Br, jr, ci, ui, Ir, Ur, be, $e, cn = !1;
  const Ve = H.drag;
  let Fe = Ve.x, Re = Ve.y;
  Ye && (H.x && (ms = wt(Vh, C)), H.y && (gs = wt(Gh, C)), A.ori == 0 ? (ai = ms, li = gs) : (ai = gs, li = ms), be = H.left, $e = H.top);
  const _e = i.select = Ee({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), hi = _e.show ? wt(Wh, _e.over ? C : $) : null;
  function vo(r, l) {
    if (_e.show) {
      for (let u in r)
        _e[u] = r[u], u in vs && ye(hi, u, r[u]);
      l !== !1 && Be("setSelect");
    }
  }
  i.setSelect = vo;
  function Uc(r) {
    if (k[r].show)
      De && Vs(ke[r], Rn);
    else if (De && ut(ke[r], Rn), Ye) {
      let u = ti ? bt[0] : bt[r];
      u != null && Ut(u, -10, -10, q, D);
    }
  }
  function un(r, l, u) {
    ps(r, { min: l, max: u });
  }
  function Rt(r, l, u, h) {
    l.focus != null && Yc(r), l.show != null && k.forEach((p, b) => {
      b > 0 && (r == b || r == null) && (p.show = l.show, Uc(b), o == 2 ? (un(p.facets[0].scale, null, null), un(p.facets[1].scale, null, null)) : un(p.scale, null, null), ri());
    }), u !== !1 && Be("setSeries", r, l), h && Vi("setSeries", i, r, l);
  }
  i.setSeries = Rt;
  function Wc(r, l) {
    Ee(J[r], l);
  }
  function Vc(r, l) {
    r.fill = ie(r.fill || null), r.dir = ae(r.dir, -1), l = l ?? J.length, J.splice(l, 0, r);
  }
  function Gc(r) {
    r == null ? J.length = 0 : J.splice(r, 1);
  }
  i.addBand = Vc, i.setBand = Wc, i.delBand = Gc;
  function Kc(r, l) {
    k[r].alpha = l, Ye && bt[r] != null && (bt[r].style.opacity = l), De && ke[r] && (ke[r].style.opacity = l);
  }
  let qt, hn, Mn;
  const di = { focus: !0 };
  function Yc(r) {
    if (r != Mn) {
      let l = r == null, u = Ft.alpha != 1;
      k.forEach((h, p) => {
        if (o == 1 || p > 0) {
          let b = l || p == 0 || p == r;
          h._focus = l ? null : b, u && Kc(p, b ? 1 : Ft.alpha);
        }
      }), Mn = r, u && ri();
    }
  }
  De && ei && qe(Da, ue, (r) => {
    H._lock || (Pn(r), Mn != null && Rt(null, di, !0, Te.setSeries));
  });
  function Bt(r, l, u) {
    let h = S[l];
    u && (r = r / ce - (h.ori == 1 ? Me : ge));
    let p = q;
    h.ori == 1 && (p = D, r = p - r), h.dir == -1 && (r = p - r);
    let b = h._min, y = h._max, w = r / p, x = b + (y - b) * w, T = h.distr;
    return T == 3 ? Si(10, x) : T == 4 ? cd(x, h.asinh) : T == 100 ? h.bwd(x) : x;
  }
  function qc(r, l) {
    let u = Bt(r, z, l);
    return Pt(u, t[0], Le, He);
  }
  i.valToIdx = (r) => Pt(r, t[0]), i.posToIdx = qc, i.posToVal = Bt, i.valToPos = (r, l, u) => S[l].ori == 0 ? s(
    r,
    S[l],
    u ? tt : q,
    u ? rt : 0
  ) : a(
    r,
    S[l],
    u ? St : D,
    u ? mt : 0
  ), i.setCursor = (r, l, u) => {
    be = r.left, $e = r.top, Nn(null, l, u);
  };
  function Wr(r, l) {
    ye(hi, bi, _e.left = r), ye(hi, Zi, _e.width = l);
  }
  function Vr(r, l) {
    ye(hi, Ki, _e.top = r), ye(hi, Ji, _e.height = l);
  }
  let Ii = A.ori == 0 ? Wr : Vr, Ui = A.ori == 1 ? Wr : Vr;
  function Zc() {
    if (De && ee.live)
      for (let r = o == 2 ? 1 : 0; r < k.length; r++) {
        if (r == 0 && pt)
          continue;
        let l = ee.values[r], u = 0;
        for (let h in l)
          Lt[r][u++].firstChild.nodeValue = l[h];
      }
  }
  function bs(r, l) {
    if (r != null && (r.idxs ? r.idxs.forEach((u, h) => {
      de[h] = u;
    }) : fd(r.idx) || de.fill(r.idx), ee.idx = de[0]), De && ee.live) {
      for (let u = 0; u < k.length; u++)
        (u > 0 || o == 1 && !pt) && Jc(u, de[u]);
      Zc();
    }
    gt = !1, l !== !1 && Be("setLegend");
  }
  i.setLegend = bs;
  function Jc(r, l) {
    let u = k[r], h = r == 0 && Z == 2 ? At : t[r], p;
    pt ? p = u.values(i, r, l) ?? an : (p = u.value(i, l == null ? null : h[l], r, l), p = p == null ? an : { _: p }), ee.values[r] = p;
  }
  function Nn(r, l, u) {
    Ir = be, Ur = $e, [be, $e] = H.move(i, be, $e), H.left = be, H.top = $e, Ye && (ai && Ut(ai, Ne(be), 0, q, D), li && Ut(li, 0, Ne($e), q, D));
    let h, p = Le > He;
    qt = pe, hn = null;
    let b = A.ori == 0 ? q : D, y = A.ori == 1 ? q : D;
    if (be < 0 || We == 0 || p) {
      h = H.idx = null;
      for (let w = 0; w < k.length; w++) {
        let x = bt[w];
        x != null && Ut(x, -10, -10, q, D);
      }
      ei && Rt(null, di, !0, r == null && Te.setSeries), ee.live && (de.fill(h), gt = !0);
    } else {
      let w, x, T;
      o == 1 && (w = A.ori == 0 ? be : $e, x = Bt(w, z), h = H.idx = Pt(x, t[0], Le, He), T = L(t[0][h], A, b, 0));
      let E = -10, M = -10, G = 0, le = 0, re = !0, te = "", U = "";
      for (let F = o == 2 ? 1 : 0; F < k.length; F++) {
        let ve = k[F], Se = de[F], je = Se == null ? null : o == 1 ? t[F][Se] : t[F][1][Se], fe = H.dataIdx(i, F, h, x), Ae = fe == null ? null : o == 1 ? t[F][fe] : t[F][1][fe];
        if (gt = gt || Ae != je || fe != Se, de[F] = fe, F > 0 && ve.show) {
          let at = fe == null ? -10 : fe == h ? T : L(o == 1 ? t[0][fe] : t[F][0][fe], A, b, 0), Ze = Ae == null ? -10 : V(Ae, o == 1 ? S[ve.scale] : S[ve.facets[1].scale], y, 0);
          if (ei && Ae != null) {
            let _t = A.ori == 1 ? be : $e, Ct = ze(Ft.dist(i, F, fe, Ze, _t));
            if (Ct < qt) {
              let jt = Ft.bias;
              if (jt != 0) {
                let lt = Bt(_t, ve.scale), vt = Ae >= 0 ? 1 : -1, Tt = lt >= 0 ? 1 : -1;
                Tt == vt && (Tt == 1 ? jt == 1 ? Ae >= lt : Ae <= lt : (
                  // >= 0
                  jt == 1 ? Ae <= lt : Ae >= lt
                )) && (qt = Ct, hn = F);
              } else
                qt = Ct, hn = F;
            }
          }
          if (gt || ti) {
            let _t, Ct;
            A.ori == 0 ? (_t = at, Ct = Ze) : (_t = Ze, Ct = at);
            let jt, lt, vt, Tt, It, Je, ct = !0, zn = Ge.bbox;
            if (zn != null) {
              ct = !1;
              let Qe = zn(i, F);
              vt = Qe.left, Tt = Qe.top, jt = Qe.width, lt = Qe.height;
            } else
              vt = _t, Tt = Ct, jt = lt = Ge.size(i, F);
            if (Je = Ge.fill(i, F), It = Ge.stroke(i, F), ti)
              F == hn && qt <= Ft.prox && (E = vt, M = Tt, G = jt, le = lt, re = ct, te = Je, U = It);
            else {
              let Qe = bt[F];
              Qe != null && (ni[F] = vt, ii[F] = Tt, Fa(Qe, jt, lt, ct), La(Qe, Je, It), Ut(Qe, xt(vt), xt(Tt), q, D));
            }
          }
        }
      }
      if (ti) {
        let F = Ft.prox, ve = Mn == null ? qt <= F : qt > F || hn != Mn;
        if (gt || ve) {
          let Se = bt[0];
          Se != null && (ni[0] = E, ii[0] = M, Fa(Se, G, le, re), La(Se, te, U), Ut(Se, xt(E), xt(M), q, D));
        }
      }
    }
    if (_e.show && cn)
      if (r != null) {
        let [w, x] = Te.scales, [T, E] = Te.match, [M, G] = r.cursor.sync.scales, le = r.cursor.drag;
        if (Fe = le._x, Re = le._y, Fe || Re) {
          let { left: re, top: te, width: U, height: F } = r.select, ve = r.scales[M].ori, Se = r.posToVal, je, fe, Ae, at, Ze, _t = w != null && T(w, M), Ct = x != null && E(x, G);
          _t && Fe ? (ve == 0 ? (je = re, fe = U) : (je = te, fe = F), Ae = S[w], at = L(Se(je, M), Ae, b, 0), Ze = L(Se(je + fe, M), Ae, b, 0), Ii(Dt(at, Ze), ze(Ze - at))) : Ii(0, b), Ct && Re ? (ve == 1 ? (je = re, fe = U) : (je = te, fe = F), Ae = S[x], at = V(Se(je, G), Ae, y, 0), Ze = V(Se(je + fe, G), Ae, y, 0), Ui(Dt(at, Ze), ze(Ze - at))) : Ui(0, y);
        } else
          ys();
      } else {
        let w = ze(Ir - Br), x = ze(Ur - jr);
        if (A.ori == 1) {
          let G = w;
          w = x, x = G;
        }
        Fe = Ve.x && w >= Ve.dist, Re = Ve.y && x >= Ve.dist;
        let T = Ve.uni;
        T != null ? Fe && Re && (Fe = w >= T, Re = x >= T, !Fe && !Re && (x > w ? Re = !0 : Fe = !0)) : Ve.x && Ve.y && (Fe || Re) && (Fe = Re = !0);
        let E, M;
        Fe && (A.ori == 0 ? (E = ci, M = be) : (E = ui, M = $e), Ii(Dt(E, M), ze(M - E)), Re || Ui(0, y)), Re && (A.ori == 1 ? (E = ci, M = be) : (E = ui, M = $e), Ui(Dt(E, M), ze(M - E)), Fe || Ii(0, b)), !Fe && !Re && (Ii(0, 0), Ui(0, 0));
      }
    if (Ve._x = Fe, Ve._y = Re, r == null) {
      if (u) {
        if (na != null) {
          let [w, x] = Te.scales;
          Te.values[0] = w != null ? Bt(A.ori == 0 ? be : $e, w) : null, Te.values[1] = x != null ? Bt(A.ori == 1 ? be : $e, x) : null;
        }
        Vi(Ms, i, be, $e, q, D, h);
      }
      if (ei) {
        let w = u && Te.setSeries, x = Ft.prox;
        Mn == null ? qt <= x && Rt(hn, di, !0, w) : qt > x ? Rt(null, di, !0, w) : hn != Mn && Rt(hn, di, !0, w);
      }
    }
    gt && (ee.idx = h, bs()), l !== !1 && Be("setCursor");
  }
  let dn = null;
  Object.defineProperty(i, "rect", {
    get() {
      return dn == null && Wi(!1), dn;
    }
  });
  function Wi(r = !1) {
    r ? dn = null : (dn = C.getBoundingClientRect(), Be("syncRect", dn));
  }
  function Gr(r, l, u, h, p, b, y) {
    H._lock || cn && r != null && r.movementX == 0 && r.movementY == 0 || (_s(r, l, u, h, p, b, y, !1, r != null), r != null ? Nn(null, !0, !0) : Nn(l, !0, !1));
  }
  function _s(r, l, u, h, p, b, y, w, x) {
    if (dn == null && Wi(!1), Pn(r), r != null)
      u = r.clientX - dn.left, h = r.clientY - dn.top;
    else {
      if (u < 0 || h < 0) {
        be = -10, $e = -10;
        return;
      }
      let [T, E] = Te.scales, M = l.cursor.sync, [G, le] = M.values, [re, te] = M.scales, [U, F] = Te.match, ve = l.axes[0].side % 2 == 1, Se = A.ori == 0 ? q : D, je = A.ori == 1 ? q : D, fe = ve ? b : p, Ae = ve ? p : b, at = ve ? h : u, Ze = ve ? u : h;
      if (re != null ? u = U(T, re) ? c(G, S[T], Se, 0) : -10 : u = Se * (at / fe), te != null ? h = F(E, te) ? c(le, S[E], je, 0) : -10 : h = je * (Ze / Ae), A.ori == 1) {
        let _t = u;
        u = h, h = _t;
      }
    }
    x && (l == null || l.cursor.event.type == Ms) && ((u <= 1 || u >= q - 1) && (u = Hn(u, q)), (h <= 1 || h >= D - 1) && (h = Hn(h, D))), w ? (Br = u, jr = h, [ci, ui] = H.move(i, u, h)) : (be = u, $e = h);
  }
  const vs = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function ys() {
    vo(vs, !1);
  }
  let Kr, Yr, qr, Zr;
  function Jr(r, l, u, h, p, b, y) {
    cn = !0, Fe = Re = Ve._x = Ve._y = !1, _s(r, l, u, h, p, b, y, !0, !1), r != null && (qe(Ns, Us, Qr, !1), Vi(Ea, i, ci, ui, q, D, null));
    let { left: w, top: x, width: T, height: E } = _e;
    Kr = w, Yr = x, qr = T, Zr = E;
  }
  function Qr(r, l, u, h, p, b, y) {
    cn = Ve._x = Ve._y = !1, _s(r, l, u, h, p, b, y, !1, !0);
    let { left: w, top: x, width: T, height: E } = _e, M = T > 0 || E > 0, G = Kr != w || Yr != x || qr != T || Zr != E;
    if (M && G && vo(_e), Ve.setScale && M && G) {
      let le = w, re = T, te = x, U = E;
      if (A.ori == 1 && (le = x, re = E, te = w, U = T), Fe && un(
        z,
        Bt(le, z),
        Bt(le + re, z)
      ), Re)
        for (let F in S) {
          let ve = S[F];
          F != z && ve.from == null && ve.min != pe && un(
            F,
            Bt(te + U, F),
            Bt(te, F)
          );
        }
      ys();
    } else H.lock && (H._lock = !H._lock, Nn(l, !0, r != null));
    r != null && (Jn(Ns, Us), Vi(Ns, i, be, $e, q, D, null));
  }
  function Qc(r, l, u, h, p, b, y) {
    if (H._lock)
      return;
    Pn(r);
    let w = cn;
    if (cn) {
      let x = !0, T = !0, E = 10, M, G;
      A.ori == 0 ? (M = Fe, G = Re) : (M = Re, G = Fe), M && G && (x = be <= E || be >= q - E, T = $e <= E || $e >= D - E), M && x && (be = be < ci ? 0 : q), G && T && ($e = $e < ui ? 0 : D), Nn(null, !0, !0), cn = !1;
    }
    be = -10, $e = -10, de.fill(null), Nn(null, !0, !0), w && (cn = w);
  }
  function Xr(r, l, u, h, p, b, y) {
    H._lock || (Pn(r), ns(), ys(), r != null && Vi(Ma, i, be, $e, q, D, null));
  }
  function ea() {
    j.forEach(Pf), ts(i.width, i.height, !0);
  }
  In(Lo, wi, ea);
  const fi = {};
  fi.mousedown = Jr, fi.mousemove = Gr, fi.mouseup = Qr, fi.dblclick = Xr, fi.setSeries = (r, l, u, h) => {
    let p = Te.match[2];
    u = p(i, l, u), u != -1 && Rt(u, h, !0, !1);
  }, Ye && (qe(Ea, C, Jr), qe(Ms, C, Gr), qe(Pa, C, (r) => {
    Pn(r), Wi(!1);
  }), qe(Da, C, Qc), qe(Ma, C, Xr), Js.add(i), i.syncRect = Wi);
  const yo = i.hooks = e.hooks || {};
  function Be(r, l, u) {
    fs ? ji.push([r, l, u]) : r in yo && yo[r].forEach((h) => {
      h.call(null, i, l, u);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let l in r.hooks)
      yo[l] = (yo[l] || []).concat(r.hooks[l]);
  });
  const ta = (r, l, u) => u, Te = Ee({
    key: null,
    setSeries: !1,
    filters: {
      pub: Ua,
      sub: Ua
    },
    scales: [z, k[1] ? k[1].scale : null],
    match: [Wa, Wa, ta],
    values: [null, null]
  }, H.sync);
  Te.match.length == 2 && Te.match.push(ta), H.sync = Te;
  const na = Te.key, ws = fc(na);
  function Vi(r, l, u, h, p, b, y) {
    Te.filters.pub(r, l, u, h, p, b, y) && ws.pub(r, l, u, h, p, b, y);
  }
  ws.sub(i);
  function Xc(r, l, u, h, p, b, y) {
    Te.filters.sub(r, l, u, h, p, b, y) && fi[r](null, l, u, h, p, b, y);
  }
  i.pub = Xc;
  function eu() {
    ws.unsub(i), Js.delete(i), Sn.clear(), Gs(Lo, wi, ea), f.remove(), ue?.remove(), Be("destroy");
  }
  i.destroy = eu;
  function xs() {
    Be("init", e, t), Mr(t || e.data, !1), B[z] ? ps(z, B[z]) : ns(), fo = _e.show && (_e.width > 0 || _e.height > 0), En = gt = !0, ts(e.width, e.height);
  }
  return k.forEach(Pr), j.forEach(Mc), n ? n instanceof HTMLElement ? (n.appendChild(f), xs()) : n(i, xs) : xs(), i;
}
Ke.assign = Ee;
Ke.fmtNum = br;
Ke.rangeNum = Ho;
Ke.rangeLog = Vo;
Ke.rangeAsinh = mr;
Ke.orient = Yn;
Ke.pxRatio = ce;
Ke.join = yd;
Ke.fmtDate = vr, Ke.tzDate = Dd;
Ke.sync = fc;
{
  Ke.addGap = pf, Ke.clipGaps = Yo;
  let e = Ke.paths = {
    points: vc
  };
  e.linear = wc, e.stepped = bf, e.bars = _f, e.spline = yf;
}
const Df = 24;
async function Mf(e, t, n, i) {
  const o = new Date(Date.now() - n * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (a) => {
      const c = a.states ?? {};
      if (Object.keys(c).length === 0) {
        Object.keys(s).length > 0 && i(s);
        return;
      }
      const d = (Date.now() - n * 60 * 60 * 1e3) / 1e3;
      for (const [f, g] of Object.entries(c)) {
        const m = s[f] ?? [];
        s[f] = [...m, ...g].filter((_) => _.lu >= d);
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
function qi(e) {
  if (!e) return [];
  const t = [];
  for (const n of e) {
    const i = parseFloat(n.s);
    Number.isFinite(i) && t.push([n.lu, i]);
  }
  return t.sort((n, i) => n[0] - i[0]), t;
}
function Nf(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const s of e) for (const [a] of s) n.add(a);
  if (n.size === 0)
    return [[t], ...e.map(() => [null])];
  const i = [...n].sort((s, a) => s - a), o = e.map((s) => {
    let a = -1, c = null;
    return i.map((d) => {
      for (; a + 1 < s.length && s[a + 1][0] <= d; )
        a++, c = s[a][1];
      return c;
    });
  });
  return [i, ...o];
}
const zf = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Of = Object.defineProperty, Qo = (e, t, n, i) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, n, o) || o);
  return o && Of(t, n, o), o;
};
const Lf = [
  Ue,
  ir(zf),
  Pe`
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
], dl = () => {
};
class Oi extends Ce {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = Lf;
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
Qo([
  Q()
], Oi.prototype, "_loading");
Qo([
  Q()
], Oi.prototype, "_error");
Qo([
  Q()
], Oi.prototype, "_empty");
Qo([
  Pi(".chart-host")
], Oi.prototype, "_host");
var Hf = Object.defineProperty, Ff = Object.getOwnPropertyDescriptor, sn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ff(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Hf(t, n, o), o;
};
const Xs = 260, Rf = 3;
let Nt = class extends Oi {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return Xs;
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
    this._unsubscribe && this._unsubscribe !== dl && this._unsubscribe(), this._unsubscribe = dl;
    const e = Rf + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const i = await Mf(this.hass, n, Df, (o) => {
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
      const s = n[o].lu, a = n[o + 1]?.lu ?? t, c = n[o].s;
      (c === "heating" || c === "cooling") && i.push({ start: s, end: a, action: c });
    }
    return i;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), n = qi(e[this.roomEntity]), i = qi(e[this.lowEntity]), o = qi(e[this.highEntity]), s = this._hasApparent ? qi(e[this.apparentEntity]) : [], a = this._hasHumidity ? qi(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), n.length === 0 && i.length === 0 && o.length === 0 && s.length === 0 && a.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const c = [n, i, o];
    this._hasApparent && c.push(s), this._hasHumidity && c.push(a);
    const d = Nf(c, t), f = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: f.width, height: f.height }), this._plot.setData(d), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Ke(f, d, this._host), this._observeResize());
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
    const c = [
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
    this._hasHumidity && c.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: o,
      grid: { show: !1 },
      values: (f, g) => g.map((m) => `${m.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: Xs,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: d,
      axes: c,
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
              O <= C || (g.fillStyle = $.action === "heating" ? fl(t, 0.18) : fl(n, 0.18), g.fillRect(C, m, O - C, _));
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
      ${this._loading ? v`<div class="status">Loading 24 h history…</div>` : P}
      ${this._error ? v`<div class="status">${this._error}</div>` : P}
      ${this._empty ? v`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : P}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? P : this._renderLegend()}
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
    ) : P}
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
    ) : P}
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
Nt.styles = [
  ...Oi.styles,
  Pe`
      .chart-host {
        height: ${ir(Xs)}px;
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
sn([
  N({ attribute: !1 })
], Nt.prototype, "hass", 2);
sn([
  N({ type: String })
], Nt.prototype, "roomEntity", 2);
sn([
  N({ type: String })
], Nt.prototype, "lowEntity", 2);
sn([
  N({ type: String })
], Nt.prototype, "highEntity", 2);
sn([
  N({ type: String })
], Nt.prototype, "actionEntity", 2);
sn([
  N({ type: String })
], Nt.prototype, "apparentEntity", 2);
sn([
  N({ type: String })
], Nt.prototype, "humidityEntity", 2);
sn([
  Q()
], Nt.prototype, "_hiddenLabels", 2);
Nt = sn([
  Ie("comfort-band-history-chart")
], Nt);
function fl(e, t) {
  const n = e.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let s = i[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const a = parseInt(s.slice(0, 2), 16), c = parseInt(s.slice(2, 4), 16), d = parseInt(s.slice(4, 6), 16);
    return `rgba(${a}, ${c}, ${d}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : n;
}
var Bf = Object.defineProperty, jf = Object.getOwnPropertyDescriptor, Ar = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? jf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Bf(t, n, o), o;
};
let ro = class extends Ce {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return v`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, n = Ml(this.hass, e), i = t ?? "", o = t && n ? n : "";
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
    return e ? t ? P : v`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : v`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
ro.styles = [
  Ue,
  Pe`
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
Ar([
  N({ attribute: !1 })
], ro.prototype, "hass", 2);
Ar([
  N({ attribute: !1 })
], ro.prototype, "entities", 2);
ro = Ar([
  Ie("comfort-band-insights-tab")
], ro);
var If = Object.defineProperty, Uf = Object.getOwnPropertyDescriptor, co = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Uf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && If(t, n, o), o;
};
const Fs = 10, Wf = {
  too_cold: "Too cool",
  just_right: "Just right",
  too_hot: "Too warm"
}, Vf = {
  wls: "Fitted",
  cached: "Earlier",
  previous: "Run before",
  rejected: "Set aside",
  none: "—"
};
let Vn = class extends Ce {
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
    if (!this.hass || !this.entities) return P;
    const e = Ol(this.hass, this.entities), t = Hl(this.hass, this.entities);
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
    return v`<div class="row" data-diag=${i || P}>
      <div class="row-label">
        <div class="title">${e}</div>
        ${n ? v`<div class="desc">${n}</div>` : P}
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
      "Whether it’s paused can’t be read right now.",
      "paused"
    ) : P;
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
    }, o = (s) => s ? ch[s] : "Can’t tell";
    return v`
      ${n}
      ${this._row(
      "Deciding now",
      e.controller ? zl[e.controller] : "Can’t tell",
      e.controller ? e.reason ? i[e.reason] : "" : "Some of what decides it can’t be read right now.",
      "controller"
    )}
      ${this._row("Its decision", o(e.decision), "", "decision")}
      ${typeof t.predictedAction == "string" ? this._row("Learning would", o(e.learning), "", "learning") : P}
      ${typeof t.mpcAction == "string" || typeof t.mpcReady == "string" ? this._row(
      "Predictive control would",
      e.predictive === "not-ready" ? "Not ready yet" : o(e.predictive),
      "",
      "predictive"
    ) : P}
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
                    <td>${i.method ? Vf[i.method] ?? i.method : "—"}</td>
                  </tr>`
    )}
            </tbody>
          </table>
        </div>
        <div class="note">
          ${e.windowMinutes !== null && e.sampleCount !== null ? `From ${e.sampleCount} readings spanning ${Math.round(e.windowMinutes)} minutes.` : ""}
          ${e.updated !== null ? `The newest is from ${Is(e.updated, Date.now(), this.hass)}.` : ""}
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
    const t = Date.now(), n = e.entries.slice(-Fs).reverse();
    return v`
      <ul>
        ${n.map((i) => this._renderEntry(i, t))}
      </ul>
      ${e.entries.length > Fs ? v`<div class="note">The last ${Fs} of ${e.entries.length}.</div>` : P}
    `;
  }
  _renderEntry(e, t) {
    const n = Date.parse(e.timestamp), i = ki({ low: e.low, high: e.high }), o = typeof e.room_temp == "number" ? `${bn(e.room_temp)}°, range ${i}` : `no reading, range ${i}`, s = [
      e.room_source === "fallback_sensor" || e.room_source === "climate" ? "stand-in reading" : "",
      e.peak_state === "active" ? "during a peak" : e.peak_state === "preconditioning" ? "ahead of a peak" : ""
    ].filter(Boolean);
    return v`<li>
      <span class="said">${Wf[e.label] ?? e.label}</span>
      <div class="detail">
        ${[Number.isFinite(n) ? Is(n, t, this.hass) : "", o, ...s].filter(Boolean).join(" · ")}
      </div>
    </li>`;
  }
};
Vn.styles = [
  Ue,
  Pe`
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
co([
  N({ attribute: !1 })
], Vn.prototype, "hass", 2);
co([
  N({ type: String })
], Vn.prototype, "zone", 2);
co([
  N({ attribute: !1 })
], Vn.prototype, "entities", 2);
co([
  Q()
], Vn.prototype, "_feedback", 2);
Vn = co([
  Ie("comfort-band-diagnostics-tab")
], Vn);
var Gf = Object.defineProperty, Kf = Object.getOwnPropertyDescriptor, rn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Kf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Gf(t, n, o), o;
};
let zt = class extends Ce {
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
zt.styles = [
  Ue,
  Pe`
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
rn([
  N({ type: Number })
], zt.prototype, "min", 2);
rn([
  N({ type: Number })
], zt.prototype, "max", 2);
rn([
  N({ type: Number })
], zt.prototype, "step", 2);
rn([
  N({ type: Number })
], zt.prototype, "low", 2);
rn([
  N({ type: Number })
], zt.prototype, "high", 2);
rn([
  N({ type: String })
], zt.prototype, "unit", 2);
rn([
  Q()
], zt.prototype, "_dragging", 2);
rn([
  Pi(".track")
], zt.prototype, "_track", 2);
zt = rn([
  Ie("dual-handle-slider")
], zt);
var Yf = Object.defineProperty, qf = Object.getOwnPropertyDescriptor, Li = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? qf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Yf(t, n, o), o;
};
const Zf = 16, Jf = 26, er = 0.5, Rs = 3;
let yn = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._heldRange = null, this._chain = Promise.resolve(), this._onInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onChange = (e) => {
      if (this._pendingLow = null, this._pendingHigh = null, !this.hass || !this.zone) return;
      const t = this.hass, n = {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high,
        hours: Rs
      };
      this._chain = this._chain.then(() => Cl(t, n)).catch(() => {
      });
    };
  }
  render() {
    if (!this.hass || !this.entities) return P;
    const e = lr(this.hass, this.entities), t = pl(this.hass, this.entities.manualLow), n = pl(this.hass, this.entities.manualHigh), i = Qf(e.band.low, e.band.high, t, n), o = this._pendingLow ?? i.low, s = this._pendingHigh ?? i.high, a = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(Zf, Math.floor(i.low)),
      max: Math.max(Jf, Math.ceil(i.high))
    };
    this._heldRange = a;
    const c = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${Rs} hours, then the schedule takes over again.` : `Sets this room’s range for ${Rs} hours.`;
    return v`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${c}</div>
        <dual-handle-slider
          .min=${a.min}
          .max=${a.max}
          .step=${er}
          .low=${o}
          .high=${s}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
};
yn.styles = [
  Ue,
  Pe`
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
  N({ attribute: !1 })
], yn.prototype, "hass", 2);
Li([
  N({ type: String })
], yn.prototype, "zone", 2);
Li([
  N({ attribute: !1 })
], yn.prototype, "entities", 2);
Li([
  Q()
], yn.prototype, "_pendingLow", 2);
Li([
  Q()
], yn.prototype, "_pendingHigh", 2);
yn = Li([
  Ie("comfort-band-exact-range")
], yn);
function pl(e, t) {
  const n = t !== null ? e.states[t] : void 0;
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function Qf(e, t, n, i) {
  let o = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, s = t) : Number.isFinite(n) && Number.isFinite(i) && (o = n, s = i), o = Math.round(o * 10) / 10, s = Math.round(s * 10) / 10, s - o < er && (s = o + er), { low: o, high: s };
}
var Xf = Object.defineProperty, ep = Object.getOwnPropertyDescriptor, Hi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ep(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Xf(t, n, o), o;
};
let wn = class extends Ce {
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
    const e = Uo(this.hass), t = e !== null ? this.hass.states[e] : void 0;
    if (!hr(t))
      return Dl(this.hass) ? "Not available right now" : "No profiles set up";
    const n = t.state;
    return !n || n === "unknown" ? "" : `Profile: ${n}`;
  }
  _section(e, t, n, i, o) {
    return v`
      <details
        data-section=${e}
        @toggle=${o ? (s) => o(s.target.open) : P}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${n ? v`<span class="summary">${n}</span>` : P}
          </span>
        </summary>
        <div class="content">${i}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? P : v`
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
      gh(Ol(this.hass, this.entities)),
      this._diagnosticsOpen ? v`<comfort-band-diagnostics-tab
              .hass=${this.hass}
              .zone=${this.zone}
              .entities=${this.entities}
            ></comfort-band-diagnostics-tab>` : P,
      (e) => this._diagnosticsOpen = e
    )}
      ${this._section(
      "history",
      "History",
      "Last 24 hours",
      this._historyOpen ? v`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : P,
      (e) => this._historyOpen = e
    )}
    `;
  }
};
wn.styles = [
  Ue,
  Pe`
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
Hi([
  N({ attribute: !1 })
], wn.prototype, "hass", 2);
Hi([
  N({ type: String })
], wn.prototype, "zone", 2);
Hi([
  N({ attribute: !1 })
], wn.prototype, "entities", 2);
Hi([
  Q()
], wn.prototype, "_historyOpen", 2);
Hi([
  Q()
], wn.prototype, "_diagnosticsOpen", 2);
wn = Hi([
  Ie("comfort-band-advanced-tab")
], wn);
var tp = Object.defineProperty, np = Object.getOwnPropertyDescriptor, kn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? np(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && tp(t, n, o), o;
};
const Ln = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "advanced", label: "Advanced" }
];
let Gt = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Ln.findIndex((o) => o.id === this._activeTab);
      if (t < 0) return;
      let n;
      switch (e.key) {
        case "ArrowLeft":
          n = (t - 1 + Ln.length) % Ln.length;
          break;
        case "ArrowRight":
          n = (t + 1) % Ln.length;
          break;
        case "Home":
          n = 0;
          break;
        case "End":
          n = Ln.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const i = Ln[n].id;
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
    if (!this._isOpen) return P;
    const e = this.zoneName || this.zone || "Comfort Band";
    return v`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Ln.map(
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
  Pe`
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
kn([
  N({ attribute: !1 })
], Gt.prototype, "hass", 2);
kn([
  N({ type: String })
], Gt.prototype, "zone", 2);
kn([
  N({ type: String })
], Gt.prototype, "zoneName", 2);
kn([
  N({ attribute: !1 })
], Gt.prototype, "entities", 2);
kn([
  Q()
], Gt.prototype, "_activeTab", 2);
kn([
  Q()
], Gt.prototype, "_isOpen", 2);
kn([
  Pi("dialog")
], Gt.prototype, "_dialog", 2);
Gt = kn([
  Ie("comfort-band-modal")
], Gt);
var ip = Object.defineProperty, op = Object.getOwnPropertyDescriptor, Cr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? op(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && ip(t, n, o), o;
};
let ao = class extends Ce {
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
    const e = Pl(this.hass, this.config.zone);
    return Nl(this.hass, { zone: this.config.zone }, e);
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
ao.styles = [
  Ue,
  Pe`
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
Cr([
  N({ attribute: !1 })
], ao.prototype, "hass", 2);
Cr([
  N({ attribute: !1 })
], ao.prototype, "config", 2);
ao = Cr([
  Ie("comfort-band-card-editor")
], ao);
var sp = Object.defineProperty, rp = Object.getOwnPropertyDescriptor, Xo = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? rp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && sp(t, n, o), o;
};
let Ei = class extends Ce {
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
    const e = this._config.zone, t = Pl(this.hass, e);
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
    const n = lr(e, t), i = Sl({
      ...n,
      doing: null,
      now: Date.now(),
      formatTime: (o) => jo(o, e)
    });
    return {
      zoneName: Nl(e, this._config, t),
      temperature: n.temperature,
      feelsLike: n.feelsLike,
      low: n.band.low,
      high: n.band.high,
      action: cr(n) ? n.action : "unknown",
      statusKind: i.kind,
      statusText: i.text,
      badges: zu(n)
    };
  }
};
Ei.styles = [
  Ue,
  Pe`
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
Xo([
  N({ attribute: !1 })
], Ei.prototype, "hass", 2);
Xo([
  Q()
], Ei.prototype, "_config", 2);
Xo([
  Pi("comfort-band-modal")
], Ei.prototype, "_modal", 2);
Ei = Xo([
  Ie("comfort-band-card")
], Ei);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.17.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
