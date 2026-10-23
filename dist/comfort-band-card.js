const Po = globalThis, rr = Po.ShadowRoot && (Po.ShadyCSS === void 0 || Po.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ar = Symbol(), la = /* @__PURE__ */ new WeakMap();
let xl = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== ar) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (rr && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = la.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && la.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bo = (e) => new xl(typeof e == "string" ? e : e + "", void 0, ar), De = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new xl(n, e, ar);
}, lu = (e, t) => {
  if (rr) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = Po.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, ca = rr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Bo(n);
})(e) : e;
const { is: cu, defineProperty: uu, getOwnPropertyDescriptor: hu, getOwnPropertyNames: du, getOwnPropertySymbols: fu, getPrototypeOf: pu } = Object, Io = globalThis, ua = Io.trustedTypes, mu = ua ? ua.emptyScript : "", gu = Io.reactiveElementPolyfillSupport, eo = (e, t) => e, zo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? mu : null;
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
} }, lr = (e, t) => !cu(e, t), ha = { attribute: !0, type: String, converter: zo, reflect: !1, useDefault: !1, hasChanged: lr };
Symbol.metadata ??= Symbol("metadata"), Io.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let yi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = ha) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && uu(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = hu(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ha;
  }
  static _$Ei() {
    if (this.hasOwnProperty(eo("elementProperties"))) return;
    const t = pu(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(eo("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(eo("properties"))) {
      const n = this.properties, i = [...du(n), ...fu(n)];
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
      for (const o of i) n.unshift(ca(o));
    } else t !== void 0 && n.push(ca(t));
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
    return lu(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : zo).toAttribute(n, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : zo;
      this._$Em = o;
      const u = a.fromAttribute(n, s.type);
      this[o] = u ?? this._$Ej?.get(o) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? lr)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
yi.elementStyles = [], yi.shadowRootOptions = { mode: "open" }, yi[eo("elementProperties")] = /* @__PURE__ */ new Map(), yi[eo("finalized")] = /* @__PURE__ */ new Map(), gu?.({ ReactiveElement: yi }), (Io.reactiveElementVersions ??= []).push("2.1.2");
const cr = globalThis, da = (e) => e, Oo = cr.trustedTypes, fa = Oo ? Oo.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $l = "$lit$", bn = `lit$${Math.random().toFixed(9).slice(2)}$`, kl = "?" + bn, bu = `<${kl}>`, Vn = document, oo = () => Vn.createComment(""), so = (e) => e === null || typeof e != "object" && typeof e != "function", ur = Array.isArray, vu = (e) => ur(e) || typeof e?.[Symbol.iterator] == "function", As = `[ 	
\f\r]`, Ki = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pa = /-->/g, ma = />/g, Fn = RegExp(`>|${As}(?:([^\\s"'>=/]+)(${As}*=${As}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ga = /'/g, ba = /"/g, Sl = /^(?:script|style|textarea|title)$/i, Al = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), _ = Al(1), Jt = Al(2), ki = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), va = /* @__PURE__ */ new WeakMap(), Un = Vn.createTreeWalker(Vn, 129);
function Tl(e, t) {
  if (!ur(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fa !== void 0 ? fa.createHTML(t) : t;
}
const _u = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Ki;
  for (let u = 0; u < n; u++) {
    const d = e[u];
    let f, p, m = -1, v = 0;
    for (; v < d.length && (a.lastIndex = v, p = a.exec(d), p !== null); ) v = a.lastIndex, a === Ki ? p[1] === "!--" ? a = pa : p[1] !== void 0 ? a = ma : p[2] !== void 0 ? (Sl.test(p[2]) && (o = RegExp("</" + p[2], "g")), a = Fn) : p[3] !== void 0 && (a = Fn) : a === Fn ? p[0] === ">" ? (a = o ?? Ki, m = -1) : p[1] === void 0 ? m = -2 : (m = a.lastIndex - p[2].length, f = p[1], a = p[3] === void 0 ? Fn : p[3] === '"' ? ba : ga) : a === ba || a === ga ? a = Fn : a === pa || a === ma ? a = Ki : (a = Fn, o = void 0);
    const k = a === Fn && e[u + 1].startsWith("/>") ? " " : "";
    s += a === Ki ? d + bu : m >= 0 ? (i.push(f), d.slice(0, m) + $l + d.slice(m) + bn + k) : d + bn + (m === -2 ? u : k);
  }
  return [Tl(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ro {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const u = t.length - 1, d = this.parts, [f, p] = _u(t, n);
    if (this.el = ro.createElement(f, i), Un.currentNode = this.el.content, n === 2 || n === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = Un.nextNode()) !== null && d.length < u; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith($l)) {
          const v = p[a++], k = o.getAttribute(m).split(bn), S = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: s, name: S[2], strings: k, ctor: S[1] === "." ? wu : S[1] === "?" ? xu : S[1] === "@" ? $u : jo }), o.removeAttribute(m);
        } else m.startsWith(bn) && (d.push({ type: 6, index: s }), o.removeAttribute(m));
        if (Sl.test(o.tagName)) {
          const m = o.textContent.split(bn), v = m.length - 1;
          if (v > 0) {
            o.textContent = Oo ? Oo.emptyScript : "";
            for (let k = 0; k < v; k++) o.append(m[k], oo()), Un.nextNode(), d.push({ type: 2, index: ++s });
            o.append(m[v], oo());
          }
        }
      } else if (o.nodeType === 8) if (o.data === kl) d.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(bn, m + 1)) !== -1; ) d.push({ type: 7, index: s }), m += bn.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = Vn.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Si(e, t, n = e, i) {
  if (t === ki) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = so(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = Si(e, o._$AS(e, t.values), o, i)), t;
}
class yu {
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
    let s = Un.nextNode(), a = 0, u = 0, d = i[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let f;
        d.type === 2 ? f = new fo(s, s.nextSibling, this, t) : d.type === 1 ? f = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (f = new ku(s, this, t)), this._$AV.push(f), d = i[++u];
      }
      a !== d?.index && (s = Un.nextNode(), a++);
    }
    return Un.currentNode = Vn, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class fo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Si(this, t, n), so(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== ki && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vu(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && so(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Vn.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ro.createElement(Tl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new yu(o, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = va.get(t.strings);
    return n === void 0 && va.set(t.strings, n = new ro(t)), n;
  }
  k(t) {
    ur(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new fo(this.O(oo()), this.O(oo()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = da(t).nextSibling;
      da(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class jo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = C;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = Si(this, t, n, 0), a = !so(t) || t !== this._$AH && t !== ki, a && (this._$AH = t);
    else {
      const u = t;
      let d, f;
      for (t = s[0], d = 0; d < s.length - 1; d++) f = Si(this, u[i + d], n, d), f === ki && (f = this._$AH[d]), a ||= !so(f) || f !== this._$AH[d], f === C ? t = C : t !== C && (t += (f ?? "") + s[d + 1]), this._$AH[d] = f;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wu extends jo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class xu extends jo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class $u extends jo {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Si(this, t, n, 0) ?? C) === ki) return;
    const i = this._$AH, o = t === C && i !== C || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== C && (i === C || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ku {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Si(this, t);
  }
}
const Su = cr.litHtmlPolyfillSupport;
Su?.(ro, fo), (cr.litHtmlVersions ??= []).push("3.3.2");
const Au = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new fo(t.insertBefore(oo(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const hr = globalThis;
class Te extends yi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Au(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ki;
  }
}
Te._$litElement$ = !0, Te.finalized = !0, hr.litElementHydrateSupport?.({ LitElement: Te });
const Tu = hr.litElementPolyfillSupport;
Tu?.({ LitElement: Te });
(hr.litElementVersions ??= []).push("4.2.2");
const je = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Cu = { attribute: !0, type: String, converter: zo, reflect: !1, hasChanged: lr }, Eu = (e = Cu, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(u) {
      const d = t.get.call(this);
      t.set.call(this, u), this.requestUpdate(a, d, e, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(a, void 0, e, u), u;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(u) {
      const d = this[a];
      t.call(this, u), this.requestUpdate(a, d, e, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function P(e) {
  return (t, n) => typeof n == "object" ? Eu(e, t, n) : ((i, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function Z(e) {
  return P({ ...e, state: !0, attribute: !1 });
}
const Du = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function Mi(e, t) {
  return (n, i, o) => {
    const s = (a) => a.renderRoot?.querySelector(e) ?? null;
    return Du(n, i, { get() {
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
function Cl(e) {
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
function Mu(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
var Pu = Object.defineProperty, Nu = Object.getOwnPropertyDescriptor, Yn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Nu(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Pu(t, n, o), o;
};
const Ws = 15, El = 28, zu = El - Ws;
function Ts(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(Ws, Math.min(El, e)) - Ws) / zu * 100;
}
let tn = class extends Te {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = Mu(this.action), t = Cl(e), n = Number.isFinite(this.low), i = Number.isFinite(this.high), o = Number.isFinite(this.room), s = n ? Ts(this.low) : 0, a = i ? Ts(this.high) : 100, u = Math.min(s, a), d = Math.max(0, Math.abs(a - s)), f = o ? Ts(this.room) : 50, p = (k) => Number.isFinite(k) ? `${k.toFixed(1)}°` : "—", m = e === "heating" || e === "cooling" ? `, ${e}` : "", v = `Comfortable range ${p(this.low)} to ${p(this.high)}, ${this.roomLabel} ${p(this.room)}${m}`;
    return _`
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        role=${this.decorative ? C : "img"}
        aria-label=${this.decorative ? C : v}
        aria-hidden=${this.decorative ? "true" : C}
      >
        ${Jt`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${n && i ? Jt`<rect class="band" x=${u} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
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
  je("band-gauge")
], tn);
const Ou = 0.5, Lu = 10, Fu = 35;
function nn(e) {
  return `${_n(e.low)}–${_n(e.high)}°`;
}
function _n(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function So(e, t) {
  let n = t * Ou;
  return n > 0 && (n = Math.max(0, Math.min(n, Fu - e.high))), n < 0 && (n = Math.min(0, Math.max(n, Lu - e.low))), { low: _a(e.low + n), high: _a(e.high + n) };
}
function _a(e) {
  return Math.round(e * 10) / 10;
}
function Dl(e) {
  const { room: t, apparent: n, useApparent: i } = e, o = Number.isFinite(t) && Number.isFinite(n) && Vs(n) !== Vs(t);
  return i && Number.isFinite(n) ? {
    value: n,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${n.toFixed(1)}°` : "" };
}
function Vs(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function Ml(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const n = Vs(e);
  return n < Math.round(t.low * 10) ? "below" : n > Math.round(t.high * 10) ? "above" : "in";
}
const Hu = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function Pl(e) {
  if (e.doing) return { kind: "adjusting", text: e.doing };
  if (!e.enabled) return { kind: "paused", text: "Paused: not controlling this room" };
  if (e.sensor === "offline")
    return { kind: "sensor", text: "On hold: the room sensor is offline" };
  if (e.sensor === "no-reading")
    return { kind: "sensor", text: "On hold: no room temperature reading" };
  const t = Ru(e);
  return e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${t.text}` } : t;
}
function Ru(e) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const t = Ml(e.temperature, e.band), n = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? t === "in" ? "comfortable" : t ?? "idle" : "none", i = Hu[n];
  let o;
  if (e.overrideActive) {
    const a = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    o = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${nn(e.band)}${a}`;
  } else {
    const a = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    o = `${nn(e.band)}${a}`;
  }
  const s = i ? `${i} · ${o}` : o.charAt(0).toUpperCase() + o.slice(1);
  return { kind: n, text: s };
}
function Nl(e) {
  if (e)
    try {
      return new Intl.DateTimeFormat("en", { timeZone: e }), e;
    } catch {
      return;
    }
}
function Uo(e, t, n) {
  const i = new Date(e), o = Nl(n), s = t?.locale?.time_format, a = t?.locale?.language;
  let u;
  if (s === "12") u = !0;
  else if (s === "24") u = !1;
  else {
    const p = new Intl.DateTimeFormat(s === "system" ? void 0 : a, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    u = p === "h11" || p === "h12";
  }
  const d = {
    hourCycle: u ? "h12" : "h23",
    hour: u ? "numeric" : "2-digit",
    ...o ? { timeZone: o } : {}
  }, f = o ? Number(
    new Intl.DateTimeFormat("en", { timeZone: o, minute: "numeric" }).formatToParts(i).find((p) => p.type === "minute")?.value
  ) : i.getMinutes();
  return (!u || f !== 0) && (d.minute = "2-digit"), new Intl.DateTimeFormat(a, d).format(i);
}
function Cs(e, t) {
  const n = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!n) return e;
  const i = Number(n[1]), o = Number(n[2]);
  return i > 23 || o > 59 ? e : Uo(new Date(2e3, 0, 1, i, o).getTime(), t);
}
function Zt(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function Ao(e, t) {
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
function Wo(e, t) {
  const n = Ao(e, t.roomTemperature), i = Ao(e, t.apparentTemperature), o = Zt(e, t.useApparentTemperature)?.state === "on", s = Date.parse(Zt(e, t.overrideEnds)?.state ?? ""), a = Zt(e, t.roomTemperature)?.attributes.source, u = a === "climate" || a === "fallback_sensor" ? a : null, d = Zt(e, t.roomSensorUnavailable)?.state === "on" || u !== null, f = Number.isFinite(n) || Number.isFinite(i);
  return {
    enabled: Zt(e, t.enabled)?.state !== "off",
    action: Zt(e, t.currentAction)?.state ?? "unknown",
    room: n,
    apparent: i,
    useApparent: o,
    temperature: Dl({ room: n, apparent: i, useApparent: o }).value,
    feelsLike: o && Number.isFinite(i),
    band: {
      low: Ao(e, t.effectiveLow),
      high: Ao(e, t.effectiveHigh)
    },
    overrideActive: Zt(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...zl(e, t),
    sensor: d ? f ? "stand-in" : "offline" : f ? "ok" : "no-reading",
    standIn: u
  };
}
function dr(e) {
  return e.enabled && (e.sensor === "ok" || e.sensor === "stand-in");
}
const mn = {
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
}, Bu = {
  paused: mn.paused,
  sensor: mn.sensor,
  heating: mn.heating,
  cooling: mn.cooling,
  below: mn.below,
  above: mn.above,
  adjusted: "mdi:timer-outline"
};
function Iu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !dr(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const n = Ml(e.temperature, e.band);
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
var Uu = Object.defineProperty, Wu = Object.getOwnPropertyDescriptor, kt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Wu(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Uu(t, n, o), o;
};
let st = class extends Te {
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
    return this.variant === "mini" ? this._renderMini() : _`
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
            ${this.feelsLike ? _`<span class="sr-only"> feels like </span>` : C}${this._renderTemperature()}<span class="sr-only">. </span>
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
        ${this.statusText ? _`<div class="status ${this.statusKind}">
              <ha-icon icon=${mn[this.statusKind]} aria-hidden="true"></ha-icon>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${Cl(e)}` : "", n = this._label();
    return _`
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
      (i) => _`<ha-icon
              icon=${Bu[i]}
              data-badge=${i}
              aria-hidden="true"
            ></ha-icon>`
    )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
};
st.styles = [
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
], st.prototype, "zoneName", 2);
kt([
  P({ type: Number })
], st.prototype, "temperature", 2);
kt([
  P({ type: Boolean })
], st.prototype, "feelsLike", 2);
kt([
  P({ type: Number })
], st.prototype, "low", 2);
kt([
  P({ type: Number })
], st.prototype, "high", 2);
kt([
  P({ type: String })
], st.prototype, "action", 2);
kt([
  P({ type: String })
], st.prototype, "statusKind", 2);
kt([
  P({ type: String })
], st.prototype, "statusText", 2);
kt([
  P({ attribute: !1 })
], st.prototype, "badges", 2);
kt([
  P({ type: Boolean })
], st.prototype, "noExpand", 2);
kt([
  P({ type: String, reflect: !0 })
], st.prototype, "variant", 2);
st = kt([
  je("comfort-band-tile")
], st);
const sn = "comfort_band";
function Vu(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Gu(e, t) {
  return e.callService(sn, "set_schedule", { ...t });
}
function Ol(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), e.callService(sn, "start_override", n);
}
function Ku(e, t) {
  return e.callService(sn, "cancel_override", { ...t });
}
function Yu(e, t) {
  return e.callService(sn, "set_profile", { ...t });
}
function qu(e, t) {
  const n = { name: t.name };
  return t.description !== void 0 && (n.description = t.description), e.callService(sn, "create_profile", n);
}
function Zu(e, t) {
  const n = { source: t.source, target: t.target };
  return t.description !== void 0 && (n.description = t.description), e.callService(sn, "clone_profile", n);
}
function Ju(e, t) {
  return e.callService(sn, "rename_profile", { old: t.old, new: t.new });
}
function Qu(e, t) {
  return e.callService(sn, "delete_profile", { name: t.name });
}
function Xu(e, t) {
  return e.callService(sn, "record_feedback", { zone: t.zone, label: t.label });
}
var eh = Object.defineProperty, th = Object.getOwnPropertyDescriptor, kn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? th(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && eh(t, n, o), o;
};
const nh = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], ih = 1500, oh = 1500, sh = 3;
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
      const n = So(t.base, t.steps), i = So(t.base, t.steps + e);
      i.low === n.low && i.high === n.high || (this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), oh));
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
      this._run(n, () => Ku(e, { zone: t }));
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await Xu(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, ih));
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
    return this._length ?? sh;
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
      `Adjusting to ${nn(e)}`,
      () => Ol(n, { zone: i, low: e.low, high: e.high, hours: t })
    );
  }
  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    this._burst = null, e && (e.steps !== 0 ? this._sendBand(So(e.base, e.steps), this._hours()) : e.picked && this._retime(this._hours()));
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
    if (!this.hass || !this.entities) return C;
    const e = Date.now(), t = Wo(this.hass, this.entities), { room: n, apparent: i, useApparent: o, feelsLike: s, overrideActive: a, scheduled: u } = t, { low: d, high: f } = t.band, p = Dl({ room: n, apparent: i, useApparent: o }), m = ju(t), v = this._burst, k = v && v.steps !== 0 ? `Adjusting to ${nn(So(v.base, v.steps))}` : this._busy, S = Pl({
      ...t,
      doing: k,
      now: e,
      formatTime: (O) => Uo(O, this.hass)
    });
    return _`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(p.value) ? `${p.value.toFixed(1)}°` : "—"}</span
        >
        ${p.note ? _`<span class="note">${p.note}</span>` : C}
      </div>
      ${o && !Number.isFinite(i) && Number.isFinite(n) ? _`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : C}
      <div class="gauge-row">
        <band-gauge
          .low=${d}
          .high=${f}
          .room=${p.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${dr(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${S.kind}" role="status" aria-live="polite">
        <ha-icon icon=${mn[S.kind]} aria-hidden="true"></ha-icon>
        <span>${S.text}</span>
      </div>
      ${m ? _`<div class="notice">${m}</div>` : C}
      ${this._renderAdjust(a, u)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const n = this._busy !== null ? "true" : "false", i = this._hours();
    return _`
      <section class="adjust">
        ${t === !1 ? C : _`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${[1, 3].map(
      (s) => _`<button
                      aria-pressed=${i === s ? "true" : "false"}
                      aria-disabled=${n}
                      data-length=${s}
                      @click=${() => this._onPickLength(s)}
                    >
                      ${s} h
                    </button>`
    )}
              </div>`}
        ${this._bandInForce() !== null ? _`<div class="steps">
              <button class="cooler" aria-disabled=${n} @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" aria-disabled=${n} @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>` : C}
        ${e && t !== !1 ? _`<button class="back" aria-disabled=${n} @click=${this._onBackToSchedule}>
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>` : C}
      </section>
    `;
  }
  _renderFeedbackSection() {
    return _`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${nh.map(
      (e) => _`
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
  Z()
], Wt.prototype, "_feedbackConfirmed", 2);
kn([
  Z()
], Wt.prototype, "_length", 2);
kn([
  Z()
], Wt.prototype, "_burst", 2);
kn([
  Z()
], Wt.prototype, "_busy", 2);
Wt = kn([
  je("comfort-band-now-tab")
], Wt);
var rh = Object.defineProperty, ah = Object.getOwnPropertyDescriptor, fr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ah(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && rh(t, n, o), o;
};
const To = 14, Co = 28, Hn = 600, gi = 200, Es = [0, 6, 12, 18, 24], Gs = 32, ya = [14, 18, 22, 26];
function vn(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function wa(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
let ao = class extends Te {
  constructor() {
    super(...arguments), this.transitions = [], this.now = null;
  }
  _timeToX(e) {
    return e / (24 * 60) * Hn;
  }
  _tempToY(e) {
    const t = wa(e, To, Co);
    return gi - (t - To) / (Co - To) * gi;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const n = e[e.length - 1][t], i = [[0, this._tempToY(n)]];
    let o = n;
    for (const s of e) {
      const a = this._timeToX(vn(s.at));
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
    const e = [...this.transitions].sort((p, m) => vn(p.at) - vn(m.at)), t = e.length > 0, n = t ? this._stepPoints(e, "low") : [], i = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(n) : "", s = t ? this._pointsToPath(i) : "", a = t ? this._fillFromPoints(i, n) : "", u = e[e.length - 1], d = (p) => this._tempToY(u[p]) / gi * 100, f = this.now !== null && Number.isFinite(this.now) ? this._timeToX(wa(this.now, 0, 24 * 60)) : null;
    return _`
      <div class="chart">
        <svg
          viewBox="0 0 ${Hn} ${gi}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${ya.map(
      (p) => Jt`<line class="grid" x1="0" x2=${Hn} y1=${this._tempToY(p)} y2=${this._tempToY(p)}></line>`
    )}
          ${Es.map(
      (p) => Jt`<line class="grid" y1="0" y2=${gi} x1=${p / 24 * Hn} x2=${p / 24 * Hn}></line>`
    )}
          ${t ? Jt`
                <path class="fill" d=${a}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((p) => {
      const m = this._timeToX(vn(p.at));
      return Jt`
              <line class="marker low" x1=${m} x2=${m} y1=${this._tempToY(p.low)} y2=${this._tempToY(p.low)}></line>
              <line class="marker high" x1=${m} x2=${m} y1=${this._tempToY(p.high)} y2=${this._tempToY(p.high)}></line>
            `;
    })}
          ${f !== null ? Jt`<line class="now-line" x1=${f} x2=${f} y1="0" y2=${gi}></line>` : null}
        </svg>
        ${t ? _`<div class="edge-label high" style="top: ${d("high")}%">High</div>
              <div class="edge-label low" style="top: ${d("low")}%">Low</div>` : null}
        ${f !== null ? _`<div
              class="now-label"
              style="left: calc(${Gs}px + (100% - ${Gs}px) * ${f / Hn})"
            >
              Now
            </div>` : null}
        ${ya.map(
      (p) => _`<div
              class="axis-label y"
              style="top: ${(Co - p) / (Co - To) * 100}%"
            >
              ${p}°
            </div>`
    )}
        ${Es.map((p, m) => {
      const v = m === 0 ? "axis-label x start" : m === Es.length - 1 ? "axis-label x end" : "axis-label x";
      return _`<div class=${v} style="left: ${p / 24 * 100}%">${p}h</div>`;
    })}
      </div>
    `;
  }
};
ao.styles = [
  Ue,
  De`
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
        padding-left: ${Bo(Gs)}px;
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
      .edge-label,
      .now-label {
        position: absolute;
        font-size: 11px;
        line-height: 1;
        color: var(--cb-text-secondary);
        pointer-events: none;
        white-space: nowrap;
      }
      /* A swatch of the line's colour: text in it would be too faint. */
      .edge-label {
        right: 2px;
        padding: 1px 3px 1px 6px;
        border-left: 3px solid;
        /* Over the line's end, legible on the card. */
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
      }
      .edge-label.low {
        border-left-color: var(--cb-action-heating);
        transform: translateY(4px);
      }
      .edge-label.high {
        border-left-color: var(--cb-action-cooling);
        transform: translateY(calc(-100% - 4px));
      }
      .now-label {
        top: -14px;
        transform: translateX(-50%);
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
fr([
  P({ type: Array })
], ao.prototype, "transitions", 2);
fr([
  P({ attribute: !1 })
], ao.prototype, "now", 2);
ao = fr([
  je("comfort-band-schedule-chart")
], ao);
var lh = Object.defineProperty, ch = Object.getOwnPropertyDescriptor, Sn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ch(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && lh(t, n, o), o;
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
    return _`
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
      ${this._error ? _`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : _`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
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
  Z()
], Vt.prototype, "_at", 2);
Sn([
  Z()
], Vt.prototype, "_low", 2);
Sn([
  Z()
], Vt.prototype, "_high", 2);
Sn([
  Z()
], Vt.prototype, "_error", 2);
Sn([
  Mi('input[name="at"]')
], Vt.prototype, "_atInput", 2);
Vt = Sn([
  je("transition-edit-dialog")
], Vt);
const Vo = "comfort_band", uh = {
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
function hh() {
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
function pr(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function Ll(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Vo
  );
}
function Fl(e, t) {
  const n = hh(), i = pr(e, [Vo, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of Ll(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const a = uh[s];
    a !== void 0 && (n[a] = o.entity_id);
  }
  return n;
}
function Hl(e) {
  return pr(e, [Vo, "profile_manager"]) !== null;
}
function mr(e) {
  return e ? !(e.state === "unavailable" && e.attributes.default_profile === void 0) : !1;
}
function Go(e) {
  const t = pr(e, [Vo, "profile_manager"]);
  if (t === null) return null;
  for (const n of Ll(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
function Rl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function Bl(e, t, n) {
  const i = t.name?.trim();
  if (i) return i;
  const o = n.deviceId !== null ? e.devices[n.deviceId]?.area_id : null, s = o ? e.areas?.[o]?.name?.trim() : void 0;
  return s || (n.deviceName ?? t.zone);
}
const Il = {
  basic: "Basic control",
  learning: "Learning",
  predictive: "Predictive control"
}, dh = {
  heating: "Heat",
  cooling: "Cool",
  idle: "Stay idle",
  unknown: "Nothing"
};
function Qt(e, t, n) {
  const i = t[n];
  return typeof i == "string" ? e.states[i] : void 0;
}
function xi(e, t, n) {
  if (typeof t[n] != "string") return "missing";
  const i = Qt(e, t, n)?.state;
  return i === "on" || i === "off" ? i : "unknown";
}
function Ds(e) {
  return e === "heating" || e === "cooling" || e === "idle" || e === "unknown" ? e : null;
}
function fh(e, t) {
  return t.some((n) => typeof e[n] == "string");
}
const xa = [
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
function to(e, t) {
  const n = xa.findIndex(([i]) => i === t);
  return xa.slice(n).some(([, i]) => fh(e, i));
}
function ph(e, t) {
  const n = Qt(e, t, "roomTemperature");
  if (!n) return null;
  const i = n.attributes.source;
  return i === "primary" || i === "fallback_sensor" || i === "climate" ? i : i === "none" ? "none" : i === void 0 && n.state !== "unavailable" ? Number.isFinite(Number.parseFloat(n.state)) ? "primary" : "none" : null;
}
function mh(e, t) {
  const n = Qt(e, t, "peakSaving");
  return n && ["off", "no_signal", "waiting", "preconditioning", "active", "override"].includes(n.state) ? n.state === "active" : xi(e, t, "peakSavingEnabled") === "off" ? !1 : to(t, "v0.24") ? null : !1;
}
function jl(e, t) {
  const n = ph(e, t), i = xi(e, t, "mpcReady"), o = xi(e, t, "enabled"), s = {
    paused: o === "on" ? !1 : o === "off" ? !0 : null,
    noReading: n === "none",
    controller: null,
    reason: null,
    decision: Ds(Qt(e, t, "currentAction")?.state),
    learning: Ds(Qt(e, t, "predictedAction")?.state),
    predictive: i === "on" ? Ds(Qt(e, t, "mpcAction")?.state) : i === "off" ? "not-ready" : null
  };
  if (n === null) return s;
  if (n === "fallback_sensor" || n === "climate")
    return { ...s, controller: "basic", reason: "stand-in" };
  const a = mh(e, t);
  if (a === null) return s;
  if (a) return { ...s, controller: "basic", reason: "peak" };
  const u = xi(e, t, "learningEnabled");
  if (u === "unknown") return s;
  if (u === "missing")
    return to(t, "v0.4") ? s : { ...s, controller: "basic", reason: "no-learning" };
  if (u === "off") return { ...s, controller: "basic", reason: "learning-off" };
  if (!to(t, "v0.6")) return s;
  const d = xi(e, t, "mpcEnabled");
  return d === "unknown" ? s : d === "missing" ? to(t, "v0.8") ? s : { ...s, controller: "learning" } : d === "off" ? { ...s, controller: "learning" } : i === "on" ? { ...s, controller: "predictive" } : i === "off" ? { ...s, controller: "learning", reason: "not-ready" } : s;
}
function gh(e) {
  return e.paused === !0 ? "Paused" : e.noReading ? "On hold" : e.controller ? `${Il[e.controller]} deciding` : "";
}
function ot(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function Ul(e) {
  const t = Math.abs(e);
  return t < 0.1 ? "under 0.1°" : `about ${_n(t)}°`;
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
    value: Math.abs(t) < 0.05 ? "Holds it steady" : `${t > 0 ? "Warms it" : "Cools it"} ${Ul(t)} an hour`,
    source: n === "previous" ? `From an earlier ${i} run, as the latest is too short to tell.` : `From the latest ${i} run.`,
    known: !0
  };
}
function Wl(e, t) {
  if (typeof t.thermalSlope != "string") return null;
  const n = Qt(e, t, "thermalSlope");
  if (!n || n.state === "unavailable") return "unavailable";
  const i = n.attributes, o = ot(i.idle_slope), s = ot(i.idle_slope_cached_age_min);
  let a;
  o === null ? a = {
    value: "Not learned yet",
    source: "Not enough recent readings while idle to learn from.",
    known: !1
  } : a = {
    value: Math.abs(o) < 0.05 ? "Holds steady" : `${o > 0 ? "Warms" : "Cools"} ${Ul(o)} an hour`,
    source: i.idle_slope_source === "cached" ? `From earlier readings${s !== null ? `, ${bh(s)} old` : ""}.` : "From the latest readings while idle.",
    known: !0
  };
  const u = ot(i.recovery_slope_heat), d = ot(i.recovery_slope_cool), f = typeof i.last_updated == "string" ? Date.parse(i.last_updated) : NaN;
  return {
    idle: a,
    heat: $a("heat", u, i.method_recovery_heat),
    cool: $a("cool", d, i.method_recovery_cool),
    details: [
      {
        name: "On its own",
        perHour: o,
        samples: ot(i.sample_count_idle),
        spread: ot(i.std_dev_idle),
        method: typeof i.method_idle == "string" ? i.method_idle : null
      },
      {
        name: "Heating",
        perHour: u,
        samples: ot(i.sample_count_recovery_heat),
        spread: ot(i.std_dev_recovery_heat),
        method: typeof i.method_recovery_heat == "string" ? i.method_recovery_heat : null
      },
      {
        name: "Cooling",
        perHour: d,
        samples: ot(i.sample_count_recovery_cool),
        spread: ot(i.std_dev_recovery_cool),
        method: typeof i.method_recovery_cool == "string" ? i.method_recovery_cool : null
      }
    ],
    windowMinutes: ot(i.window_minutes),
    sampleCount: ot(i.sample_count),
    updated: Number.isFinite(f) ? f : null
  };
}
function vh(e, t) {
  const n = xi(e, t, "mpcReady");
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
  const o = Wl(e, t), s = o === "unavailable" ? null : o, a = [];
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
const ka = "Set under Settings → Devices & Services → Comfort Band → Configure.";
function yh(e, t) {
  const n = Qt(e, t, "roomTemperature");
  if (!n) return null;
  const i = "Room reading", o = _h(e, n.attributes.fallback_temp_sensor), s = n.attributes.fallback_to_climate === !0, a = [o, s ? "the unit’s own reading" : null].filter(Boolean), u = `${a[0]} stands in if it has a reading${a.length > 1 ? `, otherwise ${a[1]} if it has one` : ""}`;
  switch (n.attributes.source) {
    case "primary":
      return {
        title: i,
        value: "Its own sensor",
        desc: a.length ? `If that goes offline for 5 minutes, ${u}. ${ka}` : `If that goes offline, control is on hold until it’s back. ${ka}`
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
function lo(e, t, n, i) {
  const o = Nl(i), s = Uo(e, n, o), a = n?.locale?.language, u = a?.startsWith("en") ? a : "en", d = (S) => {
    if (!o) {
      const I = new Date(S);
      return [I.getFullYear(), I.getMonth(), I.getDate()];
    }
    const O = new Intl.DateTimeFormat("en-US", {
      timeZone: o,
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).formatToParts(S), R = (I) => Number(O.find(($) => $.type === I)?.value);
    return [R("year"), R("month") - 1, R("day")];
  }, f = (S) => {
    const [O, R, I] = d(S);
    return Date.UTC(O, R, I);
  }, p = Math.round((f(e) - f(t)) / 864e5), m = o ? { timeZone: o } : {};
  if (p === 0) return s;
  if (p === 1) return `tomorrow ${s}`;
  if (p === -1) return `yesterday ${s}`;
  if (Math.abs(p) < 7)
    return `${new Intl.DateTimeFormat(u, { weekday: "short", ...m }).format(e)} ${s}`;
  const v = d(e)[0] === d(t)[0];
  return `${new Intl.DateTimeFormat(u, {
    day: "numeric",
    month: "short",
    ...v ? {} : { year: "numeric" },
    ...m
  }).format(e)}, ${s}`;
}
function Ms(e, t, n) {
  const i = typeof e == "string" ? Date.parse(e) : NaN;
  return Number.isFinite(i) ? lo(i, t, n) : null;
}
function wh(e, t) {
  const n = [];
  return e !== null && Math.abs(e) >= 0.05 && n.push(`the bottom ${e < 0 ? "down" : "up"} ${_n(Math.abs(e))}°`), t !== null && Math.abs(t) >= 0.05 && n.push(`the top ${t > 0 ? "up" : "down"} ${_n(Math.abs(t))}°`), n.join(", ");
}
function xh(e, t, n) {
  const i = Qt(e, t, "peakSaving");
  if (!i) return null;
  const o = i.attributes, s = "Right now", a = wh(ot(o.low_adjustment), ot(o.high_adjustment));
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
      const u = Ms(o.next_start, n, e);
      return {
        title: s,
        value: "No peak now",
        desc: u ? `The next one is announced for ${u}.` : "None is announced yet."
      };
    }
    case "preconditioning": {
      const u = Ms(o.next_start, n, e), d = o.precondition === "heating";
      return {
        title: s,
        value: d ? "Warming ahead" : "Cooling ahead",
        desc: `Getting the room ready for the next peak${u ? `, starting ${u}` : ""}${a ? `: ${a}` : ""}.`
      };
    }
    case "active": {
      const u = Ms(o.ends, n, e);
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
function Sa(e, t) {
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
function $h(e, t) {
  if (e.length === 0) return null;
  let n = e.length - 1;
  for (let i = 0; i < e.length; i++)
    vn(e[i].at) <= t && (n = i);
  return n;
}
function kh(e) {
  if (e.length < 2) return e.map(() => !1);
  const t = (n) => Math.round(n * 10);
  return e.map((n, i) => {
    const o = e[(i + e.length - 1) % e.length];
    return t(n.low) === t(o.low) && t(n.high) === t(o.high);
  });
}
function Ks(e, t) {
  const n = t.scheduleAssignment;
  if (typeof n != "string") return to(t, "v0.14") ? null : !0;
  const i = e.states[n];
  if (!i || i.state === "unavailable") return null;
  const o = i.attributes.schedule_id;
  return o === null ? !0 : typeof o == "string" ? !1 : null;
}
function Sh(e, t) {
  if (Ks(e, t) !== !1) return null;
  const n = e.states[t.scheduleAssignment];
  return n?.state && n.state !== "unknown" ? n.state : null;
}
function Ah(e, t, n) {
  const i = Wo(e, t);
  if (!Number.isFinite(i.band.low) || !Number.isFinite(i.band.high)) return null;
  let o = `Now ${nn(i.band)}`;
  const s = e.config?.time_zone;
  let a = i.overrideActive;
  if (i.overrideActive)
    o += i.scheduled === !0 && i.overrideEnds !== null && i.overrideEnds > n ? `, adjusted until ${lo(i.overrideEnds, n, e, s)}` : ", adjusted";
  else {
    const m = t.peakSaving, v = typeof m == "string" ? e.states[m]?.state : void 0;
    v === "active" && (o += ", relaxed for a peak"), v === "preconditioning" && (o += ", moved ahead of a peak"), a = v === "active" || v === "preconditioning";
  }
  const u = t.nextBandChange, d = u !== null ? e.states[u] : void 0, f = d?.attributes.low, p = d?.attributes.high;
  if (i.scheduled === !0 && i.nextChange !== null && i.nextChange > n && typeof f == "number" && typeof p == "number") {
    const m = lo(i.nextChange, n, e, s), v = nn({ low: f, high: p });
    o += a ? ` · the schedule changes to ${v} at ${m}` : ` · from ${m} ${v}`;
  }
  return o;
}
var Th = Object.defineProperty, Ch = Object.getOwnPropertyDescriptor, rt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ch(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Th(t, n, o), o;
};
function Aa(e, t) {
  return vn(e.at) - vn(t.at);
}
const Ps = 15, Ns = 24 * 60;
function Eh(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((i) => vn(i.at))), n = Math.max(...t);
  for (let i = 1; i <= Ns / Ps; i++) {
    const o = (n + i * Ps) % Ns;
    if (!t.has(o)) return Ta(o);
  }
  return Ta((n + Ps) % Ns);
}
function Ta(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
let Ye = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._editingList = !1, this._now = Date.now(), this._clock = null, this._focusAfterMode = null, this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onEditSchedule = () => {
      this._editingList = !0, this._focusAfterMode = "add";
    }, this._onDoneEditing = () => {
      this._editingList = !1, this._confirmingDeleteAt = null, this._focusAfterMode = "edit";
    }, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = Eh(this._transitions), this._newLow = Ea(this._transitions), this._newHigh = Da(this._transitions), this._editing = null, this._mode = "add";
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
      n.sort(Aa), await this._writeSchedule(n), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = Ca(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Ca(this.hass);
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
    super.connectedCallback(), this._now = Date.now(), this._clock = setInterval(() => this._now = Date.now(), 6e4), this.hass && this.zone && this._profile && !this._unsub && this._subscribe();
  }
  disconnectedCallback() {
    this._clock !== null && clearInterval(this._clock), this._clock = null, this._unsubscribe(), super.disconnectedCallback();
  }
  async _subscribe() {
    if (!this.hass || !this.zone || !this._profile) {
      this._loading = !1;
      return;
    }
    const e = ++this._subscribeGen;
    this._transitions.length === 0 && (this._loading = !0), this._error = null;
    try {
      const t = await Vu(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (n) => {
          e === this._subscribeGen && (this._transitions = n?.baseline ? [...n.baseline].sort(Aa) : [], this._loading = !1);
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
      await Gu(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (n) {
      this._transitions = t, this._error = n instanceof Error ? n.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return C;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? Ea(this._transitions),
        high: this._newHigh ?? Da(this._transitions)
      };
      return _`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return _`
      ${this._renderHeader()} ${this._renderNow()}
      ${this._loading ? _`<div class="loading">Loading schedule…</div>` : this._error ? _`<div class="error" role="alert">${this._error}</div>` : _`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
                .now=${Sa(this._now, this.hass)}
              ></comfort-band-schedule-chart>
              <div class="list-toolbar">
                ${this._editingList ? _`<button class="button primary" @click=${this._onAddClicked}>
                        + Add a change
                      </button>
                      <button class="button secondary" @click=${this._onDoneEditing}>Done</button>` : _`<button class="button secondary" @click=${this._onEditSchedule}>
                      Edit schedule
                    </button>`}
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
    const e = this.hass ? Go(this.hass) : null, t = e ? this.hass.states[e] : void 0, n = mr(t) ? t.state : null;
    return !n || n === "unknown" ? C : _`<div class="header">
      <span class="profile-label">Schedule: ${n}</span>
    </div>`;
  }
  /** The range in force now and when the schedule next changes it, from
   *  the integration's entities; and whether this list is the one in force. */
  _renderNow() {
    if (!this.hass || !this.entities) return C;
    const e = Ah(this.hass, this.entities, this._now), t = Ks(this.hass, this.entities) === !1, n = Sh(this.hass, this.entities);
    return _`
      ${e ? _`<div class="now-line">${e}</div>` : C}
      ${t ? _`<div class="shared-note">
            This room follows ${n ? `“${n}”, a shared schedule` : "a shared schedule"}.
            The changes below are its own, not the ones in force.
          </div>` : C}
    `;
  }
  _renderList() {
    if (this._transitions.length === 0)
      return _`<div class="empty">
        ${this._editingList ? "No changes yet. Use “Add a change” to create one." : "No changes yet."}
      </div>`;
    const t = (this.hass && this.entities ? Ks(this.hass, this.entities) === !0 : !1) ? $h(this._transitions, Sa(this._now, this.hass)) : null, n = kh(this._transitions);
    return _`
      <ul class="list" role="list">
        ${this._transitions.map(
      (i, o) => this._confirmingDeleteAt === i.at ? this._renderConfirmRow(i) : this._editingList ? this._renderRow(i, o === t, n[o]) : this._renderReadRow(i, o === t, n[o])
    )}
      </ul>
    `;
  }
  _tags(e, t) {
    return _`${e ? _`<span class="tag now">Now</span>` : C}
    ${t ? _`<span class="tag same">Same as before</span>` : C}`;
  }
  _renderReadRow(e, t, n) {
    return _`
      <li
        class="row read ${t ? "current" : ""}"
        role="listitem"
        data-at=${e.at}
        aria-current=${t ? "true" : C}
      >
        <span class="at">${Cs(e.at, this.hass)}</span>
        <span class="band">${nn(e)}</span>
        ${this._tags(t, n)}
      </li>
    `;
  }
  _renderRow(e, t, n) {
    const i = Cs(e.at, this.hass), o = `Edit the ${i} change, ${_n(e.low)} to ${_n(e.high)} degrees`;
    return _`
      <li
        class="row ${t ? "current" : ""}"
        role="listitem"
        tabindex="0"
        data-at=${e.at}
        aria-label=${o}
        aria-current=${t ? "true" : C}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${i}</span>
        <span class="band">${nn(e)}</span>
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
    const t = `Delete the ${Cs(e.at, this.hass)} change?`;
    return _`
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
Ye.styles = [
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
      .row.read:hover {
        background: none;
      }
      .row.current {
        box-shadow: inset 3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));
        background: var(--cb-track-bg);
      }
      .tag {
        flex: none;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        font-size: 11px;
        color: var(--cb-text-secondary);
      }
      .tag.now {
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
rt([
  P({ attribute: !1 })
], Ye.prototype, "hass", 2);
rt([
  P({ type: String })
], Ye.prototype, "zone", 2);
rt([
  P({ attribute: !1 })
], Ye.prototype, "entities", 2);
rt([
  Z()
], Ye.prototype, "_editingList", 2);
rt([
  Z()
], Ye.prototype, "_now", 2);
rt([
  Z()
], Ye.prototype, "_profile", 2);
rt([
  Z()
], Ye.prototype, "_transitions", 2);
rt([
  Z()
], Ye.prototype, "_loading", 2);
rt([
  Z()
], Ye.prototype, "_error", 2);
rt([
  Z()
], Ye.prototype, "_mode", 2);
rt([
  Z()
], Ye.prototype, "_editing", 2);
rt([
  Z()
], Ye.prototype, "_newAt", 2);
rt([
  Z()
], Ye.prototype, "_confirmingDeleteAt", 2);
Ye = rt([
  je("comfort-band-schedule-tab")
], Ye);
function Ca(e) {
  const t = Go(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Ea(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Da(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Dh = Object.defineProperty, Mh = Object.getOwnPropertyDescriptor, Pi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Mh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Dh(t, n, o), o;
};
const Ph = 1e3, Nh = 15e3, bi = (e, t, n) => ({
  kind: "switch",
  field: e,
  title: t,
  desc: n
}), wt = (e, t, n) => ({
  kind: "number",
  field: e,
  title: t,
  desc: n
}), zs = (e, t, n, i) => ({ kind: "select", field: e, title: t, desc: n, label: i }), Vl = (e) => e, zh = {
  comfort: {
    main: [
      bi(
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
      bi(
        "enabled",
        "Control this room",
        "When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused."
      ),
      bi(
        "learningEnabled",
        "Learning",
        "Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings."
      ),
      bi(
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
      bi(
        "fanControlEnabled",
        "Fan control",
        "Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen."
      ),
      zs(
        "activeFanMode",
        "Fan while heating or cooling",
        "The fan speed while the unit is working. Peak saving can leave it as it is during a peak.",
        Ma
      ),
      zs(
        "idleFanMode",
        "Fan while idle",
        "The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed.",
        Ma
      )
    ]
  },
  peak: {
    main: [
      bi(
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
      zs(
        "scheduleAssignment",
        "Follows",
        "Which schedule sets this room’s range: its own, or one shared with other rooms. The Schedule tab shows and changes the room’s own schedule, even while it follows a shared one.",
        Vl
      )
    ]
  }
}, Oh = {
  fan: { what: "Fan control needs", since: "v0.13.0" },
  peak: { what: "Peak saving needs", since: "v0.24.0" },
  schedules: { what: "Choosing a shared schedule needs", since: "v0.14.0" }
};
function Ma(e) {
  if (e === "(none)") return "Leave as it is";
  const t = e.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Lo(e) {
  const t = String(e), n = t.indexOf(".");
  return n < 0 ? 0 : t.length - n - 1;
}
function Lh(e, t) {
  return Math.max(Lo(t), Lo(Number(e.toFixed(3))));
}
function Fh(e) {
  const t = typeof e == "object" && e !== null ? e.message : void 0;
  return typeof t == "string" && t ? t : "That setting couldn’t be changed.";
}
function vi(e) {
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
        this._error = { entityId: e, message: Fh(u) }, a() && this._drop(e);
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
      timer: setTimeout(() => this._drop(e), Nh)
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
    const i = vi(n.attributes.step) ?? 1, o = vi(n.attributes.min) ?? -1 / 0, s = vi(n.attributes.max) ?? 1 / 0, a = this._pending[e], u = typeof a == "number" ? a : Number.parseFloat(n.state), d = Number.isFinite(o) ? o : 0, f = (u - d) / i, p = t > 0 ? Math.floor(f + 1e-9) + 1 : Math.ceil(f - 1e-9) - 1, m = Math.max(Lo(i), Lo(d)), v = Math.min(s, Math.max(o, Number((d + p * i).toFixed(m))));
    this._pending = { ...this._pending, [e]: v }, this._error = null, this._stopSettling(e);
    const k = this._timers.get(e);
    k !== void 0 && clearTimeout(k), this._timers.set(
      e,
      setTimeout(() => {
        this._timers.delete(e), this._send(e, v, "number", "set_value", { value: v });
      }, Ph)
    );
  }
  _onChoose(e, t) {
    this._pending = { ...this._pending, [e]: t }, this._error = null, this._stopSettling(e), this._send(e, t, "select", "select_option", { option: t });
  }
  render() {
    if (!this.hass || !this.entities) return C;
    const { main: e, fine: t = [] } = zh[this.section], n = (d) => d.filter((f) => this._entity(f.field) !== null), i = n(e), o = n(t), s = e.length + t.length - i.length - o.length, a = i.length + o.length === 0, u = Oh[this.section];
    return _`
      ${this._error ? _`<div class="error" role="alert">${this._error.message}</div>` : C}
      ${this.section === "peak" ? this._renderStatus(xh(this.hass, this.entities, Date.now()), "peak") : C}
      ${i.map((d) => this._renderSetting(d))}
      ${this.section === "comfort" ? _`${this._renderHumidity()}
          ${this._renderStatus(yh(this.hass, this.entities), "source")}` : C}
      ${this.section === "automation" ? this._renderStatus(vh(this.hass, this.entities), "readiness") : C}
      ${o.length ? _`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${o.map((d) => this._renderSetting(d))}
          </details>` : C}
      ${a ? _`<div class="upgrade-hint">
            ${u ? _`${u.what} the <code>comfort_band</code> integration ${u.since} or
                  later, with its entities turned on.` : _`These settings’ entities are turned off. Turn them on from this room’s device
                page, under Settings → Devices &amp; Services.`}
          </div>` : s > 0 ? _`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>` : C}
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
          desc: _`${e.desc}`
        });
      case "number":
        return this._renderNumber(t, e);
      case "select":
        return this._renderSelect(t, e);
    }
  }
  /** What the integration is doing, beside the settings it explains. */
  _renderStatus(e, t) {
    return e ? _`
      <div class="row" data-status=${t}>
        <div class="row-label">
          <div class="title">${e.title}</div>
          <div class="desc">${e.desc}</div>
        </div>
        <div class="info-value">${e.value}</div>
      </div>
    ` : C;
  }
  _renderHumidity() {
    const e = this.entities.roomTemperature, t = e !== null ? this.hass.states[e] : void 0, n = t !== void 0 && t.state !== "unavailable", i = n ? Rl(this.hass, e) : null, o = t === void 0 ? "Can’t be read" : n ? i ? this._sensorText(i) : "Not configured" : "Can’t be read right now";
    return _`
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
    const n = this.hass.states[e], i = vi(n?.attributes.step) ?? 1, o = vi(n?.attributes.min), s = vi(n?.attributes.max), a = typeof n?.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : "", u = this._pending[e], d = typeof u == "number" ? u : Number.parseFloat(n?.state ?? ""), f = Number.isFinite(d), p = f ? `${d.toFixed(Lh(d, i))}${a ? ` ${a}` : ""}` : "—", m = `t-${t.field}`, v = !f || o !== null && d <= o, k = !f || s !== null && d >= s;
    return _`
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
            aria-disabled=${v ? "true" : "false"}
            @click=${() => !v && this._onStep(e, -1)}
          >
            −
          </button>
          <output class="value" aria-live="polite">${p}</output>
          <button
            class="step"
            type="button"
            aria-label="Increase"
            aria-disabled=${k ? "true" : "false"}
            @click=${() => !k && this._onStep(e, 1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
  _renderSelect(e, t) {
    const n = this.hass.states[e], i = Array.isArray(n?.attributes.options) ? n.attributes.options.filter((p) => typeof p == "string") : [], o = this._pending[e], s = typeof o == "string" ? o : n?.state ?? "", a = `t-${t.field}`, u = n?.state === "unavailable" || i.length === 0, d = i.includes(s), f = t.label ?? Vl;
    return _`
      <div class="row pick" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${a}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <select
          class="choice"
          aria-labelledby=${a}
          ?disabled=${u}
          @change=${(p) => this._onChoose(e, p.target.value)}
        >
          ${d && !u ? C : _`<option value="" disabled .selected=${!0}>
                ${u ? "Unavailable" : "—"}
              </option>`}
          ${i.map(
      (p) => _`<option value=${p} .selected=${!u && p === s}>
                ${f(p)}
              </option>`
    )}
        </select>
      </div>
    `;
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), n = this._pending[e.entityId] !== void 0, i = this.hass.states[e.entityId]?.state;
    return i !== "on" && i !== "off" ? _`
        <div class="row" data-setting=${e.field}>
          <div class="row-label">
            <div class="title">${e.title}</div>
            <div class="desc">${e.desc}</div>
          </div>
          <div class="info-value unconfigured">
            ${i === void 0 || i === "unavailable" ? "Unavailable" : "Unknown"}
          </div>
        </div>
      ` : _`
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
Pi([
  P({ attribute: !1 })
], yn.prototype, "hass", 2);
Pi([
  P({ attribute: !1 })
], yn.prototype, "entities", 2);
Pi([
  P({ type: String })
], yn.prototype, "section", 2);
Pi([
  Z()
], yn.prototype, "_pending", 2);
Pi([
  Z()
], yn.prototype, "_error", 2);
yn = Pi([
  je("comfort-band-settings-tab")
], yn);
var Hh = Object.defineProperty, Rh = Object.getOwnPropertyDescriptor, rn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Rh(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Hh(t, n, o), o;
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
    return _`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? _`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? _`<label>
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
      ${this._error ? _`<div class="error" role="alert">${this._error}</div>` : null}
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
rn([
  P({ type: String })
], Nt.prototype, "mode", 2);
rn([
  P({ type: String })
], Nt.prototype, "existingName", 2);
rn([
  P({ type: Array })
], Nt.prototype, "existingNames", 2);
rn([
  P({ type: Boolean })
], Nt.prototype, "busy", 2);
rn([
  Z()
], Nt.prototype, "_name", 2);
rn([
  Z()
], Nt.prototype, "_description", 2);
rn([
  Z()
], Nt.prototype, "_error", 2);
rn([
  Mi('input[name="name"]')
], Nt.prototype, "_nameInput", 2);
Nt = rn([
  je("profile-edit-dialog")
], Nt);
var Bh = Object.defineProperty, Ih = Object.getOwnPropertyDescriptor, qn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ih(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Bh(t, n, o), o;
};
let on = class extends Te {
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
          await qu(this.hass, { name: t, description: n });
        else if (i === "clone" && o)
          await Zu(this.hass, { source: o, target: t, description: n });
        else if (i === "rename" && o)
          t !== o && await Ju(this.hass, { old: o, new: t });
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
        await Qu(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Go(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!mr(t)) return null;
    const n = t.attributes.options, i = Array.isArray(n) ? n.filter((p) => typeof p == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, a = typeof s == "string" && !!s, u = a ? s : "home", d = t.attributes.descriptions, f = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [p, m] of Object.entries(d))
        typeof m == "string" && (f[p] = m);
    return { options: i, active: o, defaultProfile: u, descriptions: f, crudAvailable: a };
  }
  _onSelect(e) {
    this.hass && Yu(this.hass, { profile: e });
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
    if (!this.hass) return C;
    const e = this._readState();
    if (e === null)
      return Hl(this.hass) ? _`<div class="empty">
            Profiles aren't available right now. If the Comfort Band Profiles entry or its active
            profile entity is disabled, turn it back on under Settings → Devices &amp; Services.
          </div>` : _`<div class="empty">
            No profiles set up. Profiles are named sets of schedules, such as Home and Away, that
            every room switches between together. To use them, add Comfort Band again under Settings
            → Devices &amp; Services and choose “Set up profile manager”.
          </div>`;
    const { options: t, active: n, defaultProfile: i, descriptions: o, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return _`
        ${this._error ? _`<div class="error" role="alert">${this._error}</div>` : null}
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
      return _`
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
            ${a ? _`This profile is active — deleting will switch to
                  <strong>${i}</strong>.` : ""}
          </p>
          ${this._error ? _`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? _`<div class="empty">No profiles configured.</div>` : _`
      ${this._error ? _`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? _`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : C}
      <ul aria-label="Profiles">
        ${t.map(
      (a, u) => this._renderRow(a, u, n, i, o, s)
    )}
      </ul>
      ${s ? C : _`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, n, i, o, s) {
    const a = e === n, u = e === i, d = o[e] ?? "", f = `cb-profile-menu-${t}`;
    return _`
      <li
        data-profile=${e}
        tabindex="0"
        class=${a ? "active" : ""}
        aria-current=${a ? "true" : C}
        @click=${() => this._onSelect(e)}
        @keydown=${(p) => {
      if (p.key === "Escape" && this._openMenu !== null) {
        p.preventDefault(), p.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1;
        return;
      }
      p.target === p.currentTarget && (p.key === "Enter" || p.key === " ") && (p.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? _`<span class="description">${d}</span>` : C}
        </span>
        ${a ? _`<span class="badge">Active</span>` : C}
        ${s ? _`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? f : C}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(p) => this._toggleMenu(e, p)}
            >
              ⋮
            </button>` : C}
        ${this._openMenu === e ? _`
              <div
                id=${f}
                class="menu"
                role="menu"
                @click=${(p) => p.stopPropagation()}
                @keydown=${(p) => this._onMenuKeydown(p, e)}
              >
                <button
                  role="menuitem"
                  @click=${(p) => {
      p.stopPropagation(), this._onClone(e);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(p) => {
      p.stopPropagation(), this._onRename(e);
    }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${u}
                  aria-disabled=${u}
                  @click=${(p) => {
      p.stopPropagation(), u || this._onDelete(e);
    }}
                  title=${u ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : C}
      </li>
    `;
  }
};
on.styles = [
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
], on.prototype, "hass", 2);
qn([
  Z()
], on.prototype, "_mode", 2);
qn([
  Z()
], on.prototype, "_target", 2);
qn([
  Z()
], on.prototype, "_openMenu", 2);
qn([
  Z()
], on.prototype, "_error", 2);
qn([
  Z()
], on.prototype, "_busy", 2);
on = qn([
  je("comfort-band-profiles-tab")
], on);
const jh = !0, Oe = "u-", Uh = "uplot", Wh = Oe + "hz", Vh = Oe + "vt", Gh = Oe + "title", Kh = Oe + "wrap", Yh = Oe + "under", qh = Oe + "over", Zh = Oe + "axis", jn = Oe + "off", Jh = Oe + "select", Qh = Oe + "cursor-x", Xh = Oe + "cursor-y", ed = Oe + "cursor-pt", td = Oe + "legend", nd = Oe + "live", id = Oe + "inline", od = Oe + "series", sd = Oe + "marker", Pa = Oe + "label", rd = Oe + "value", Ji = "width", Qi = "height", Yi = "top", Na = "bottom", _i = "left", Os = "right", gr = "#000", za = gr + "0", Ls = "mousemove", Oa = "mousedown", Fs = "mouseup", La = "mouseenter", Fa = "mouseleave", Ha = "dblclick", ad = "resize", ld = "scroll", Ra = "change", Fo = "dppxchange", br = "--", Ni = typeof window < "u", Ys = Ni ? document : null, $i = Ni ? window : null, cd = Ni ? navigator : null;
let ce, Eo;
function qs() {
  let e = devicePixelRatio;
  ce != e && (ce = e, Eo && Js(Ra, Eo, qs), Eo = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Wn(Ra, Eo, qs), $i.dispatchEvent(new CustomEvent(Fo)));
}
function dt(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function Zs(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function ye(e, t, n) {
  e.style[t] = n + "px";
}
function Dt(e, t, n, i) {
  let o = Ys.createElement(e);
  return t != null && dt(o, t), n?.insertBefore(o, i), o;
}
function xt(e, t) {
  return Dt("div", e, t);
}
const Ba = /* @__PURE__ */ new WeakMap();
function Ut(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", a = Ba.get(e);
  s != a && (e.style.transform = s, Ba.set(e, s), t < 0 || n < 0 || t > i || n > o ? dt(e, jn) : Zs(e, jn));
}
const Ia = /* @__PURE__ */ new WeakMap();
function ja(e, t, n) {
  let i = t + n, o = Ia.get(e);
  i != o && (Ia.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const Ua = /* @__PURE__ */ new WeakMap();
function Wa(e, t, n, i) {
  let o = t + "" + n, s = Ua.get(e);
  o != s && (Ua.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const vr = { passive: !0 }, ud = { ...vr, capture: !0 };
function Wn(e, t, n, i) {
  t.addEventListener(e, n, i ? ud : vr);
}
function Js(e, t, n, i) {
  t.removeEventListener(e, n, vr);
}
Ni && qs();
function Mt(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : ft((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function Gl(e) {
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
const Kl = (e) => e != null, Yl = (e) => e != null && e > 0, Ko = Gl(Kl), hd = Gl(Yl);
function dd(e, t, n, i = 0, o = !1) {
  let s = o ? hd : Ko, a = o ? Yl : Kl;
  [t, n] = s(e, t, n);
  let u = e[t], d = e[t];
  if (t > -1)
    if (i == 1)
      u = e[t], d = e[n];
    else if (i == -1)
      u = e[n], d = e[t];
    else
      for (let f = t; f <= n; f++) {
        let p = e[f];
        a(p) && (p < u ? u = p : p > d && (d = p));
      }
  return [u ?? pe, d ?? -pe];
}
function Yo(e, t, n, i) {
  let o = Ka(e), s = Ka(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let a = n == 10 ? Xt : ql, u = o == 1 ? ft : $t, d = s == 1 ? $t : ft, f = u(a(ze(e))), p = d(a(ze(t))), m = Ai(n, f), v = Ai(n, p);
  return n == 10 && (f < 0 && (m = me(m, -f)), p < 0 && (v = me(v, -p))), i || n == 2 ? (e = m * o, t = v * s) : (e = Xl(e, m), t = qo(t, v)), [e, t];
}
function _r(e, t, n, i) {
  let o = Yo(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const yr = 0.1, Va = {
  mode: 3,
  pad: yr
}, no = {
  pad: 0,
  soft: null,
  mode: 0
}, fd = {
  min: no,
  max: no
};
function Ho(e, t, n, i) {
  return Zo(n) ? Ga(e, t, n) : (no.pad = n, no.soft = i ? 0 : null, no.mode = i ? 3 : 0, Ga(e, t, fd));
}
function ae(e, t) {
  return e ?? t;
}
function pd(e, t, n) {
  for (t = ae(t, 0), n = ae(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Ga(e, t, n) {
  let i = n.min, o = n.max, s = ae(i.pad, 0), a = ae(o.pad, 0), u = ae(i.hard, -pe), d = ae(o.hard, pe), f = ae(i.soft, pe), p = ae(o.soft, -pe), m = ae(i.mode, 0), v = ae(o.mode, 0), k = t - e, S = Xt(k), O = et(ze(e), ze(t)), R = Xt(O), I = ze(R - S);
  (k < 1e-24 || I > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, m == 2 && f != pe && (s = 0), v == 2 && p != -pe && (a = 0)));
  let $ = k || O || 1e3, U = Xt($), A = Ai(10, ft(U)), Q = $ * (k == 0 ? e == 0 ? 0.1 : 1 : s), z = me(Xl(e - Q, A / 10), 24), X = e >= f && (m == 1 || m == 3 && z <= f || m == 2 && z >= f) ? f : pe, Y = et(u, z < X && e >= X ? X : Pt(X, z)), ne = $ * (k == 0 ? t == 0 ? 0.1 : 1 : a), K = me(qo(t + ne, A / 10), 24), T = t <= p && (v == 1 || v == 3 && K >= p || v == 2 && K <= p) ? p : -pe, J = Pt(d, K > T && t <= T ? T : et(T, K));
  return Y == J && Y == 0 && (J = 100), [Y, J];
}
const md = new Intl.NumberFormat(Ni ? cd.language : "en-US"), wr = (e) => md.format(e), pt = Math, No = pt.PI, ze = pt.abs, ft = pt.floor, Ne = pt.round, $t = pt.ceil, Pt = pt.min, et = pt.max, Ai = pt.pow, Ka = pt.sign, Xt = pt.log10, ql = pt.log2, gd = (e, t = 1) => pt.sinh(e) * t, Hs = (e, t = 1) => pt.asinh(e / t), pe = 1 / 0;
function Ya(e) {
  return (Xt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function Qs(e, t, n) {
  return Pt(et(e, t), n);
}
function Zl(e) {
  return typeof e == "function";
}
function ie(e) {
  return Zl(e) ? e : () => e;
}
const bd = () => {
}, Jl = (e) => e, Ql = (e, t) => t, vd = (e) => null, qa = (e) => !0, Za = (e, t) => e == t, _d = /\.\d*?(?=9{6,}|0{6,})/gm, Gn = (e) => {
  if (tc(e) || wn.has(e))
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
function qo(e, t) {
  return Gn($t(Gn(e / t)) * t);
}
function Xl(e, t) {
  return Gn(ft(Gn(e / t)) * t);
}
function me(e, t = 0) {
  if (tc(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Ne(i) / n;
}
const wn = /* @__PURE__ */ new Map();
function ec(e) {
  return (("" + e).split(".")[1] || "").length;
}
function co(e, t, n, i) {
  let o = [], s = i.map(ec);
  for (let a = t; a < n; a++) {
    let u = ze(a), d = me(Ai(e, a), u);
    for (let f = 0; f < i.length; f++) {
      let p = e == 10 ? +`${i[f]}e${a}` : i[f] * d, m = (a >= 0 ? 0 : u) + (a >= s[f] ? 0 : s[f]), v = e == 10 ? p : me(p, m);
      o.push(v), wn.set(v, m);
    }
  }
  return o;
}
const io = {}, xr = [], Ti = [null, null], gn = Array.isArray, tc = Number.isInteger, yd = (e) => e === void 0;
function Ja(e) {
  return typeof e == "string";
}
function Zo(e) {
  let t = !1;
  if (e != null) {
    let n = e.constructor;
    t = n == null || n == Object;
  }
  return t;
}
function wd(e) {
  return e != null && typeof e == "object";
}
const xd = Object.getPrototypeOf(Uint8Array), nc = "__proto__";
function Ci(e, t = Zo) {
  let n;
  if (gn(e)) {
    let i = e.find((o) => o != null);
    if (gn(i) || t(i)) {
      n = Array(e.length);
      for (let o = 0; o < e.length; o++)
        n[o] = Ci(e[o], t);
    } else
      n = e.slice();
  } else if (e instanceof xd)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != nc && (n[i] = Ci(e[i], t));
  } else
    n = e;
  return n;
}
function Ee(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != nc && (Zo(e[o]) ? Ee(e[o], Ci(i[o])) : e[o] = Ci(i[o]));
  }
  return e;
}
const $d = 0, kd = 1, Sd = 2;
function Ad(e, t, n) {
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
function Td(e, t) {
  if (Dd(e)) {
    let a = e[0].slice();
    for (let u = 1; u < e.length; u++)
      a.push(...e[u].slice(1));
    return Md(a[0]) || (a = Ed(a)), a;
  }
  let n = /* @__PURE__ */ new Set();
  for (let a = 0; a < e.length; a++) {
    let d = e[a][0], f = d.length;
    for (let p = 0; p < f; p++)
      n.add(d[p]);
  }
  let i = [Array.from(n).sort((a, u) => a - u)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let a = 0; a < o; a++)
    s.set(i[0][a], a);
  for (let a = 0; a < e.length; a++) {
    let u = e[a], d = u[0];
    for (let f = 1; f < u.length; f++) {
      let p = u[f], m = Array(o).fill(void 0), v = t ? t[a][f] : kd, k = [];
      for (let S = 0; S < p.length; S++) {
        let O = p[S], R = s.get(d[S]);
        O === null ? v != $d && (m[R] = O, v == Sd && k.push(R)) : m[R] = O;
      }
      Ad(m, k, o), i.push(m);
    }
  }
  return i;
}
const Cd = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Ed(e) {
  let t = e[0], n = t.length, i = Array(n);
  for (let s = 0; s < i.length; s++)
    i[s] = s;
  i.sort((s, a) => t[s] - t[a]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let a = e[s], u = Array(n);
    for (let d = 0; d < n; d++)
      u[d] = a[i[d]];
    o.push(u);
  }
  return o;
}
function Dd(e) {
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
function Md(e, t = 100) {
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
    const d = e[u];
    if (d != null) {
      if (d <= a)
        return !1;
      a = d;
    }
  }
  return !0;
}
const ic = [
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
], oc = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function sc(e) {
  return e.slice(0, 3);
}
const Pd = oc.map(sc), Nd = ic.map(sc), zd = {
  MMMM: ic,
  MMM: Nd,
  WWWW: oc,
  WWW: Pd
};
function qi(e) {
  return (e < 10 ? "0" : "") + e;
}
function Od(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Ld = {
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
  fff: (e) => Od(e.getMilliseconds())
};
function $r(e, t) {
  t = t || zd;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? Ld[o[1]] : o[0]);
  return (s) => {
    let a = "";
    for (let u = 0; u < n.length; u++)
      a += typeof n[u] == "string" ? n[u] : n[u](s, t);
    return a;
  };
}
const Fd = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Hd(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Fd ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const rc = (e) => e % 1 == 0, Ro = [1, 2, 2.5, 5], Rd = co(10, -32, 0, Ro), ac = co(10, 0, 32, Ro), Bd = ac.filter(rc), In = Rd.concat(ac), kr = `
`, lc = "{YYYY}", Qa = kr + lc, cc = "{M}/{D}", Xi = kr + cc, Do = Xi + "/{YY}", uc = "{aa}", Id = "{h}:{mm}", wi = Id + uc, Xa = kr + wi, el = ":{ss}", he = null;
function hc(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, a = o * 365, d = (e == 1 ? co(10, 0, 3, Ro).filter(rc) : co(10, -3, 0, Ro)).concat([
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
    [a, lc, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", Qa, he, he, he, he, he, 1],
    [o, cc, Qa, he, he, he, he, he, 1],
    [i, "{h}" + uc, Do, he, Xi, he, he, he, 1],
    [n, wi, Do, he, Xi, he, he, he, 1],
    [t, el, Do + " " + wi, he, Xi + " " + wi, he, Xa, he, 1],
    [e, el + ".{fff}", Do + " " + wi, he, Xi + " " + wi, he, Xa, he, 1]
  ];
  function p(m) {
    return (v, k, S, O, R, I) => {
      let $ = [], U = R >= a, A = R >= s && R < a, Q = m(S), z = me(Q * e, 3), X = Rs(Q.getFullYear(), U ? 0 : Q.getMonth(), A || U ? 1 : Q.getDate()), Y = me(X * e, 3);
      if (A || U) {
        let ne = A ? R / s : 0, K = U ? R / a : 0, T = z == Y ? z : me(Rs(X.getFullYear() + K, X.getMonth() + ne, 1) * e, 3), J = new Date(Ne(T / e)), L = J.getFullYear(), V = J.getMonth();
        for (let j = 0; T <= O; j++) {
          let oe = Rs(L + K * j, V + ne * j, 1), B = oe - m(me(oe * e, 3));
          T = me((+oe + B) * e, 3), T <= O && $.push(T);
        }
      } else {
        let ne = R >= o ? o : R, K = ft(S) - ft(z), T = Y + K + qo(z - Y, ne);
        $.push(T);
        let J = m(T), L = J.getHours() + J.getMinutes() / n + J.getSeconds() / i, V = R / i, j = v.axes[k]._space, oe = I / j;
        for (; T = me(T + R, e == 1 ? 0 : 3), !(T > O); )
          if (V > 1) {
            let B = ft(me(L + V, 6)) % 24, se = m(T).getHours() - B;
            se > 1 && (se = -1), T -= se * i, L = (L + V) % 24;
            let de = $[$.length - 1];
            me((T - de) / R, 3) * oe >= 0.7 && $.push(T);
          } else
            $.push(T);
      }
      return $;
    };
  }
  return [
    d,
    f,
    p
  ];
}
const [jd, Ud, Wd] = hc(1), [Vd, Gd, Kd] = hc(1e-3);
co(2, -53, 53, [1]);
function tl(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function nl(e, t) {
  return (n, i, o, s, a) => {
    let u = t.find((S) => a >= S[0]) || t[t.length - 1], d, f, p, m, v, k;
    return i.map((S) => {
      let O = e(S), R = O.getFullYear(), I = O.getMonth(), $ = O.getDate(), U = O.getHours(), A = O.getMinutes(), Q = O.getSeconds(), z = R != d && u[2] || I != f && u[3] || $ != p && u[4] || U != m && u[5] || A != v && u[6] || Q != k && u[7] || u[1];
      return d = R, f = I, p = $, m = U, v = A, k = Q, z(O);
    });
  };
}
function Yd(e, t) {
  let n = $r(t);
  return (i, o, s, a, u) => o.map((d) => n(e(d)));
}
function Rs(e, t, n) {
  return new Date(e, t, n);
}
function il(e, t) {
  return t(e);
}
const qd = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function ol(e, t) {
  return (n, i, o, s) => s == null ? br : t(e(i));
}
function Zd(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Jd(e, t) {
  return e.series[t].fill(e, t);
}
const Qd = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: bd,
  markers: {
    show: !0,
    width: 2,
    stroke: Zd,
    fill: Jd,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Xd(e, t) {
  let n = e.cursor.points, i = xt(), o = n.size(e, t);
  ye(i, Ji, o), ye(i, Qi, o);
  let s = o / -2;
  ye(i, "marginLeft", s), ye(i, "marginTop", s);
  let a = n.width(e, t, o);
  return a && ye(i, "borderWidth", a), i;
}
function ef(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function tf(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function nf(e, t) {
  return e.series[t].points.size;
}
const Bs = [0, 0];
function of(e, t, n) {
  return Bs[0] = t, Bs[1] = n, Bs;
}
function Mo(e, t, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == t) && n(o);
  };
}
function Is(e, t, n, i = !0) {
  return (o) => {
    (!i || o.target == t) && n(o);
  };
}
const sf = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: of,
  points: {
    one: !1,
    show: Xd,
    size: nf,
    width: 0,
    stroke: tf,
    fill: ef
  },
  bind: {
    mousedown: Mo,
    mouseup: Mo,
    click: Mo,
    // legend clicks, not .u-over clicks
    dblclick: Mo,
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
}, dc = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Sr = Ee({}, dc, {
  filter: Ql
}), fc = Ee({}, Sr, {
  size: 10
}), pc = Ee({}, dc, {
  show: !1
}), Ar = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', mc = "bold " + Ar, gc = 1.5, sl = {
  show: !0,
  scale: "x",
  stroke: gr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: mc,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Sr,
  ticks: fc,
  border: pc,
  font: Ar,
  lineGap: gc,
  rotate: 0
}, rf = "Value", af = "Time", rl = {
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
function lf(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : wr(s));
}
function cf(e, t, n, i, o, s, a) {
  let u = [], d = wn.get(o) || 0;
  n = a ? n : me(qo(n, o), d);
  for (let f = n; f <= i; f = me(f + o, d))
    u.push(Object.is(f, -0) ? 0 : f);
  return u;
}
function Xs(e, t, n, i, o, s, a) {
  const u = [], d = e.scales[e.axes[t].scale].log, f = d == 10 ? Xt : ql, p = ft(f(n));
  o = Ai(d, p), d == 10 && (o = In[Mt(o, In)]);
  let m = n, v = o * d;
  d == 10 && (v = In[Mt(v, In)]);
  do
    u.push(m), m = m + o, d == 10 && !wn.has(m) && (m = me(m, wn.get(o))), m >= v && (o = m, v = o * d, d == 10 && (v = In[Mt(v, In)]));
  while (m <= i);
  return u;
}
function uf(e, t, n, i, o, s, a) {
  let d = e.scales[e.axes[t].scale].asinh, f = i > d ? Xs(e, t, et(d, n), i, o) : [d], p = i >= 0 && n <= 0 ? [0] : [];
  return (n < -d ? Xs(e, t, et(d, -i), -n, o) : [d]).reverse().map((v) => -v).concat(p, f);
}
const bc = /./, hf = /[12357]/, df = /[125]/, al = /1/, er = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function ff(e, t, n, i, o) {
  let s = e.axes[n], a = s.scale, u = e.scales[a], d = e.valToPos, f = s._space, p = d(10, a), m = d(9, a) - p >= f ? bc : d(7, a) - p >= f ? hf : d(5, a) - p >= f ? df : al;
  if (m == al) {
    let v = ze(d(1, a) - p);
    if (v < f)
      return er(t.slice().reverse(), u.distr, m, $t(f / v)).reverse();
  }
  return er(t, u.distr, m, 1);
}
function pf(e, t, n, i, o) {
  let s = e.axes[n], a = s.scale, u = s._space, d = e.valToPos, f = ze(d(1, a) - d(2, a));
  return f < u ? er(t.slice().reverse(), 3, bc, $t(u / f)).reverse() : t;
}
function mf(e, t, n, i) {
  return i == null ? br : t == null ? "" : wr(t);
}
const ll = {
  show: !0,
  scale: "y",
  stroke: gr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: mc,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Sr,
  ticks: fc,
  border: pc,
  font: Ar,
  lineGap: gc,
  rotate: 0
};
function gf(e, t) {
  let n = 3 + (e || 1) * 2;
  return me(n * t, 3);
}
function bf(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), a = e.valToPos(o[i[1]], n, !0), u = ze(a - s), d = e.series[t], f = u / (d.points.space * ce);
  return i[1] - i[0] <= f;
}
const cl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, vc = (e, t, n, i, o) => o, ul = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: vc,
  alpha: 1,
  facets: [
    Ee({}, cl, { scale: "x" }),
    Ee({}, cl, { scale: "y" })
  ]
}, hl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: vc,
  alpha: 1,
  points: {
    show: bf,
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
function vf(e, t, n, i, o) {
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
}), dl = {};
function yc(e, t) {
  let n = dl[e];
  return n || (n = {
    key: e,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, a, u, d, f) {
      for (let p = 0; p < n.plots.length; p++)
        n.plots[p] != o && n.plots[p].pub(i, o, s, a, u, d, f);
    }
  }, e != null && (dl[e] = n)), n;
}
const Ei = 1, tr = 2;
function Zn(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, a = e.scales, u = e.bbox;
  let d = s[0], f = i == 2 ? s[1] : s[t], p = i == 2 ? a[o.facets[0].scale] : a[e.series[0].scale], m = i == 2 ? a[o.facets[1].scale] : a[o.scale], v = u.left, k = u.top, S = u.width, O = u.height, R = e.valToPosH, I = e.valToPosV;
  return p.ori == 0 ? n(
    o,
    d,
    f,
    p,
    m,
    R,
    I,
    v,
    k,
    S,
    O,
    Qo,
    zi,
    es,
    xc,
    kc
  ) : n(
    o,
    d,
    f,
    p,
    m,
    I,
    R,
    k,
    v,
    O,
    S,
    Xo,
    Oi,
    Er,
    $c,
    Sc
  );
}
function Tr(e, t) {
  let n = 0, i = 0, o = ae(e.bands, xr);
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
function yf(e, t, n, i, o) {
  let s = e.mode, a = e.series[t], u = s == 2 ? a.facets[1].scale : a.scale, d = e.scales[u];
  return o == -1 ? d.min : o == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function en(e, t, n, i, o, s) {
  return Zn(e, t, (a, u, d, f, p, m, v, k, S, O, R) => {
    let I = a.pxRound;
    const $ = f.dir * (f.ori == 0 ? 1 : -1), U = f.ori == 0 ? zi : Oi;
    let A, Q;
    $ == 1 ? (A = n, Q = i) : (A = i, Q = n);
    let z = I(m(u[A], f, O, k)), X = I(v(d[A], p, R, S)), Y = I(m(u[Q], f, O, k)), ne = I(v(s == 1 ? p.max : p.min, p, R, S)), K = new Path2D(o);
    return U(K, Y, ne), U(K, z, ne), U(K, z, X), K;
  });
}
function Jo(e, t, n, i, o, s) {
  let a = null;
  if (e.length > 0) {
    a = new Path2D();
    const u = t == 0 ? es : Er;
    let d = n;
    for (let m = 0; m < e.length; m++) {
      let v = e[m];
      if (v[1] > v[0]) {
        let k = v[0] - d;
        k > 0 && u(a, d, i, k, i + s), d = v[1];
      }
    }
    let f = n + o - d, p = 10;
    f > 0 && u(a, d, i - p / 2, f, i + s + p);
  }
  return a;
}
function wf(e, t, n) {
  let i = e[e.length - 1];
  i && i[0] == t ? i[1] = n : e.push([t, n]);
}
function Cr(e, t, n, i, o, s, a) {
  let u = [], d = e.length;
  for (let f = o == 1 ? n : i; f >= n && f <= i; f += o)
    if (t[f] === null) {
      let m = f, v = f;
      if (o == 1)
        for (; ++f <= i && t[f] === null; )
          v = f;
      else
        for (; --f >= n && t[f] === null; )
          v = f;
      let k = s(e[m]), S = v == m ? k : s(e[v]), O = m - o;
      k = a <= 0 && O >= 0 && O < d ? s(e[O]) : k;
      let I = v + o;
      S = a >= 0 && I >= 0 && I < d ? s(e[I]) : S, S >= k && u.push([k, S]);
    }
  return u;
}
function fl(e) {
  return e == 0 ? Jl : e == 1 ? Ne : (t) => Bn(t, e);
}
function wc(e) {
  let t = e == 0 ? Qo : Xo, n = e == 0 ? (o, s, a, u, d, f) => {
    o.arcTo(s, a, u, d, f);
  } : (o, s, a, u, d, f) => {
    o.arcTo(a, s, d, u, f);
  }, i = e == 0 ? (o, s, a, u, d) => {
    o.rect(s, a, u, d);
  } : (o, s, a, u, d) => {
    o.rect(a, s, d, u);
  };
  return (o, s, a, u, d, f = 0, p = 0) => {
    f == 0 && p == 0 ? i(o, s, a, u, d) : (f = Pt(f, u / 2, d / 2), p = Pt(p, u / 2, d / 2), t(o, s + f, a), n(o, s + u, a, s + u, a + d, f), n(o, s + u, a + d, s, a + d, p), n(o, s, a + d, s, a, p), n(o, s, a, s + u, a, f), o.closePath());
  };
}
const Qo = (e, t, n) => {
  e.moveTo(t, n);
}, Xo = (e, t, n) => {
  e.moveTo(n, t);
}, zi = (e, t, n) => {
  e.lineTo(t, n);
}, Oi = (e, t, n) => {
  e.lineTo(n, t);
}, es = wc(0), Er = wc(1), xc = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, $c = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, kc = (e, t, n, i, o, s, a) => {
  e.bezierCurveTo(t, n, i, o, s, a);
}, Sc = (e, t, n, i, o, s, a) => {
  e.bezierCurveTo(n, t, o, i, a, s);
};
function Ac(e) {
  return (t, n, i, o, s) => Zn(t, n, (a, u, d, f, p, m, v, k, S, O, R) => {
    let { pxRound: I, points: $ } = a, U, A;
    f.ori == 0 ? (U = Qo, A = xc) : (U = Xo, A = $c);
    const Q = me($.width * ce, 3);
    let z = ($.size - $.width) / 2 * ce, X = me(z * 2, 3), Y = new Path2D(), ne = new Path2D(), { left: K, top: T, width: J, height: L } = t.bbox;
    es(
      ne,
      K - X,
      T - X,
      J + X * 2,
      L + X * 2
    );
    const V = (j) => {
      if (d[j] != null) {
        let oe = I(m(u[j], f, O, k)), B = I(v(d[j], p, R, S));
        U(Y, oe + z, B), A(Y, oe, B, z, 0, No * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let j = i; j <= o; j++)
        V(j);
    return {
      stroke: Q > 0 ? Y : null,
      fill: Y,
      clip: ne,
      flags: Ei | tr
    };
  });
}
function Tc(e) {
  return (t, n, i, o, s, a) => {
    i != o && (s != i && a != i && e(t, n, i), s != o && a != o && e(t, n, o), e(t, n, a));
  };
}
const xf = Tc(zi), $f = Tc(Oi);
function Cc(e) {
  const t = ae(e?.alignGaps, 0);
  return (n, i, o, s) => Zn(n, i, (a, u, d, f, p, m, v, k, S, O, R) => {
    [o, s] = Ko(d, o, s);
    let I = a.pxRound, $ = (L) => I(m(L, f, O, k)), U = (L) => I(v(L, p, R, S)), A, Q;
    f.ori == 0 ? (A = zi, Q = xf) : (A = Oi, Q = $f);
    const z = f.dir * (f.ori == 0 ? 1 : -1), X = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Ei }, Y = X.stroke;
    let ne = !1;
    if (s - o >= O * 4) {
      let L = (F) => n.posToVal(F, f.key, !0), V = null, j = null, oe, B, tt, we = $(u[z == 1 ? o : s]), se = $(u[o]), de = $(u[s]), ee = L(z == 1 ? se + 1 : de - 1);
      for (let F = z == 1 ? o : s; F >= o && F <= s; F += z) {
        let Me = u[F], xe = (z == 1 ? Me < ee : Me > ee) ? we : $(Me), ue = d[F];
        xe == we ? ue != null ? (B = ue, V == null ? (A(Y, xe, U(B)), oe = V = j = B) : B < V ? V = B : B > j && (j = B)) : ue === null && (ne = !0) : (V != null && Q(Y, we, U(V), U(j), U(oe), U(B)), ue != null ? (B = ue, A(Y, xe, U(B)), V = j = oe = B) : (V = j = null, ue === null && (ne = !0)), we = xe, ee = L(we + z));
      }
      V != null && V != j && tt != we && Q(Y, we, U(V), U(j), U(oe), U(B));
    } else
      for (let L = z == 1 ? o : s; L >= o && L <= s; L += z) {
        let V = d[L];
        V === null ? ne = !0 : V != null && A(Y, $(u[L]), U(V));
      }
    let [T, J] = Tr(n, i);
    if (a.fill != null || T != 0) {
      let L = X.fill = new Path2D(Y), V = a.fillTo(n, i, a.min, a.max, T), j = U(V), oe = $(u[o]), B = $(u[s]);
      z == -1 && ([B, oe] = [oe, B]), A(L, B, j), A(L, oe, j);
    }
    if (!a.spanGaps) {
      let L = [];
      ne && L.push(...Cr(u, d, o, s, z, $, t)), X.gaps = L = a.gaps(n, i, o, s, L), X.clip = Jo(L, f.ori, k, S, O, R);
    }
    return J != 0 && (X.band = J == 2 ? [
      en(n, i, o, s, Y, -1),
      en(n, i, o, s, Y, 1)
    ] : en(n, i, o, s, Y, J)), X;
  });
}
function kf(e) {
  const t = ae(e.align, 1), n = ae(e.ascDesc, !1), i = ae(e.alignGaps, 0), o = ae(e.extend, !1);
  return (s, a, u, d) => Zn(s, a, (f, p, m, v, k, S, O, R, I, $, U) => {
    [u, d] = Ko(m, u, d);
    let A = f.pxRound, { left: Q, width: z } = s.bbox, X = (se) => A(S(se, v, $, R)), Y = (se) => A(O(se, k, U, I)), ne = v.ori == 0 ? zi : Oi;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Ei }, T = K.stroke, J = v.dir * (v.ori == 0 ? 1 : -1);
    let L = Y(m[J == 1 ? u : d]), V = X(p[J == 1 ? u : d]), j = V, oe = V;
    o && t == -1 && (oe = Q, ne(T, oe, L)), ne(T, V, L);
    for (let se = J == 1 ? u : d; se >= u && se <= d; se += J) {
      let de = m[se];
      if (de == null)
        continue;
      let ee = X(p[se]), F = Y(de);
      t == 1 ? ne(T, ee, L) : ne(T, j, F), ne(T, ee, F), L = F, j = ee;
    }
    let B = j;
    o && t == 1 && (B = Q + z, ne(T, B, L));
    let [tt, we] = Tr(s, a);
    if (f.fill != null || tt != 0) {
      let se = K.fill = new Path2D(T), de = f.fillTo(s, a, f.min, f.max, tt), ee = Y(de);
      ne(se, B, ee), ne(se, oe, ee);
    }
    if (!f.spanGaps) {
      let se = [];
      se.push(...Cr(p, m, u, d, J, X, i));
      let de = f.width * ce / 2, ee = n || t == 1 ? de : -de, F = n || t == -1 ? -de : de;
      se.forEach((Me) => {
        Me[0] += ee, Me[1] += F;
      }), K.gaps = se = f.gaps(s, a, u, d, se), K.clip = Jo(se, v.ori, R, I, $, U);
    }
    return we != 0 && (K.band = we == 2 ? [
      en(s, a, u, d, T, -1),
      en(s, a, u, d, T, 1)
    ] : en(s, a, u, d, T, we)), K;
  });
}
function pl(e, t, n, i, o, s, a = pe) {
  if (e.length > 1) {
    let u = null;
    for (let d = 0, f = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (u != null) {
          let p = ze(e[d] - e[u]);
          p < f && (f = p, a = ze(n(e[d], i, o, s) - n(e[u], i, o, s)));
        }
        u = d;
      }
  }
  return a;
}
function Sf(e) {
  e = e || io;
  const t = ae(e.size, [0.6, pe, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), a = 1 - t[0], u = ae(t[1], pe), d = ae(t[2], 1), f = ae(e.disp, io), p = ae(e.each, (k) => {
  }), { fill: m, stroke: v } = f;
  return (k, S, O, R) => Zn(k, S, (I, $, U, A, Q, z, X, Y, ne, K, T) => {
    let J = I.pxRound, L = n, V = i * ce, j = u * ce, oe = d * ce, B, tt;
    A.ori == 0 ? [B, tt] = s(k, S) : [tt, B] = s(k, S);
    const we = A.dir * (A.ori == 0 ? 1 : -1);
    let se = A.ori == 0 ? es : Er, de = A.ori == 0 ? p : (M, ge, Pe, ei, En, Ft, Dn) => {
      p(M, ge, Pe, En, ei, Dn, Ft);
    }, ee = ae(k.bands, xr).find((M) => M.series[0] == S), F = ee != null ? ee.dir : 0, Me = I.fillTo(k, S, I.min, I.max, F), qe = J(X(Me, Q, T, ne)), xe, ue, St, at = K, ke = J(I.width * ce), Lt = !1, Kt = null, mt = null, cn = null, Jn = null;
    m != null && (ke == 0 || v != null) && (Lt = !0, Kt = m.values(k, S, O, R), mt = /* @__PURE__ */ new Map(), new Set(Kt).forEach((M) => {
      M != null && mt.set(M, new Path2D());
    }), ke > 0 && (cn = v.values(k, S, O, R), Jn = /* @__PURE__ */ new Map(), new Set(cn).forEach((M) => {
      M != null && Jn.set(M, new Path2D());
    })));
    let { x0: Qn, size: Ri } = f;
    if (Qn != null && Ri != null) {
      L = 1, $ = Qn.values(k, S, O, R), Qn.unit == 2 && ($ = $.map((Pe) => k.posToVal(Y + Pe * K, A.key, !0)));
      let M = Ri.values(k, S, O, R);
      Ri.unit == 2 ? ue = M[0] * K : ue = z(M[0], A, K, Y) - z(0, A, K, Y), at = pl($, U, z, A, K, Y, at), St = at - ue + V;
    } else
      at = pl($, U, z, A, K, Y, at), St = at * a + V, ue = at - St;
    St < 1 && (St = 0), ke >= ue / 2 && (ke = 0), St < 5 && (J = Jl);
    let mo = St > 0, Tn = at - St - (mo ? ke : 0);
    ue = J(Qs(Tn, oe, j)), xe = (L == 0 ? ue / 2 : L == we ? 0 : ue) - L * we * ((L == 0 ? V / 2 : 0) + (mo ? ke / 2 : 0));
    const Ze = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Xn = Lt ? null : new Path2D();
    let Yt = null;
    if (ee != null)
      Yt = k.data[ee.series[1]];
    else {
      let { y0: M, y1: ge } = f;
      M != null && ge != null && (U = ge.values(k, S, O, R), Yt = M.values(k, S, O, R));
    }
    let Cn = B * ue, q = tt * ue;
    for (let M = we == 1 ? O : R; M >= O && M <= R; M += we) {
      let ge = U[M];
      if (ge == null)
        continue;
      if (Yt != null) {
        let nt = Yt[M] ?? 0;
        if (ge - nt == 0)
          continue;
        qe = X(nt, Q, T, ne);
      }
      let Pe = A.distr != 2 || f != null ? $[M] : M, ei = z(Pe, A, K, Y), En = X(ae(ge, Me), Q, T, ne), Ft = J(ei - xe), Dn = J(et(En, qe)), lt = J(Pt(En, qe)), gt = Dn - lt;
      if (ge != null) {
        let nt = ge < 0 ? q : Cn, At = ge < 0 ? Cn : q;
        Lt ? (ke > 0 && cn[M] != null && se(Jn.get(cn[M]), Ft, lt + ft(ke / 2), ue, et(0, gt - ke), nt, At), Kt[M] != null && se(mt.get(Kt[M]), Ft, lt + ft(ke / 2), ue, et(0, gt - ke), nt, At)) : se(Xn, Ft, lt + ft(ke / 2), ue, et(0, gt - ke), nt, At), de(
          k,
          S,
          M,
          Ft - ke / 2,
          lt,
          ue + ke,
          gt
        );
      }
    }
    return ke > 0 ? Ze.stroke = Lt ? Jn : Xn : Lt || (Ze._fill = I.width == 0 ? I._fill : I._stroke ?? I._fill, Ze.width = 0), Ze.fill = Lt ? mt : Xn, Ze;
  });
}
function Af(e, t) {
  const n = ae(t?.alignGaps, 0);
  return (i, o, s, a) => Zn(i, o, (u, d, f, p, m, v, k, S, O, R, I) => {
    [s, a] = Ko(f, s, a);
    let $ = u.pxRound, U = (B) => $(v(B, p, R, S)), A = (B) => $(k(B, m, I, O)), Q, z, X;
    p.ori == 0 ? (Q = Qo, X = zi, z = kc) : (Q = Xo, X = Oi, z = Sc);
    const Y = p.dir * (p.ori == 0 ? 1 : -1);
    let ne = U(d[Y == 1 ? s : a]), K = ne, T = [], J = [];
    for (let B = Y == 1 ? s : a; B >= s && B <= a; B += Y)
      if (f[B] != null) {
        let we = d[B], se = U(we);
        T.push(K = se), J.push(A(f[B]));
      }
    const L = { stroke: e(T, J, Q, X, z, $), fill: null, clip: null, band: null, gaps: null, flags: Ei }, V = L.stroke;
    let [j, oe] = Tr(i, o);
    if (u.fill != null || j != 0) {
      let B = L.fill = new Path2D(V), tt = u.fillTo(i, o, u.min, u.max, j), we = A(tt);
      X(B, K, we), X(B, ne, we);
    }
    if (!u.spanGaps) {
      let B = [];
      B.push(...Cr(d, f, s, a, Y, U, n)), L.gaps = B = u.gaps(i, o, s, a, B), L.clip = Jo(B, p.ori, S, O, R, I);
    }
    return oe != 0 && (L.band = oe == 2 ? [
      en(i, o, s, a, V, -1),
      en(i, o, s, a, V, 1)
    ] : en(i, o, s, a, V, oe)), L;
  });
}
function Tf(e) {
  return Af(Cf, e);
}
function Cf(e, t, n, i, o, s) {
  const a = e.length;
  if (a < 2)
    return null;
  const u = new Path2D();
  if (n(u, e[0], t[0]), a == 2)
    i(u, e[1], t[1]);
  else {
    let d = Array(a), f = Array(a - 1), p = Array(a - 1), m = Array(a - 1);
    for (let v = 0; v < a - 1; v++)
      p[v] = t[v + 1] - t[v], m[v] = e[v + 1] - e[v], f[v] = p[v] / m[v];
    d[0] = f[0];
    for (let v = 1; v < a - 1; v++)
      f[v] === 0 || f[v - 1] === 0 || f[v - 1] > 0 != f[v] > 0 ? d[v] = 0 : (d[v] = 3 * (m[v - 1] + m[v]) / ((2 * m[v] + m[v - 1]) / f[v - 1] + (m[v] + 2 * m[v - 1]) / f[v]), isFinite(d[v]) || (d[v] = 0));
    d[a - 1] = f[a - 2];
    for (let v = 0; v < a - 1; v++)
      o(
        u,
        e[v] + m[v] / 3,
        t[v] + d[v] * m[v] / 3,
        e[v + 1] - m[v] / 3,
        t[v + 1] - d[v + 1] * m[v] / 3,
        e[v + 1],
        t[v + 1]
      );
  }
  return u;
}
const nr = /* @__PURE__ */ new Set();
function ml() {
  for (let e of nr)
    e.syncRect(!0);
}
Ni && (Wn(ad, $i, ml), Wn(ld, $i, ml, !0), Wn(Fo, $i, () => {
  Ke.pxRatio = ce;
}));
const Ef = Cc(), Df = Ac();
function gl(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, a) => ir(s, a, t, n));
}
function Mf(e, t) {
  return e.map((n, i) => i == 0 ? {} : Ee({}, t, n));
}
function ir(e, t, n, i) {
  return Ee({}, t == 0 ? n : i, e);
}
function Ec(e, t, n) {
  return t == null ? Ti : [t, n];
}
const Pf = Ec;
function Nf(e, t, n) {
  return t == null ? Ti : Ho(t, n, yr, !0);
}
function Dc(e, t, n, i) {
  return t == null ? Ti : Yo(t, n, e.scales[i].log, !1);
}
const zf = Dc;
function Mc(e, t, n, i) {
  return t == null ? Ti : _r(t, n, e.scales[i].log, !1);
}
const Of = Mc;
function Lf(e, t, n, i, o) {
  let s = et(Ya(e), Ya(t)), a = t - e, u = Mt(o / i * a, n);
  do {
    let d = n[u], f = i * d / a;
    if (f >= o && s + (d < 5 ? wn.get(d) : 0) <= 17)
      return [d, f];
  } while (++u < n.length);
  return [0, 0];
}
function bl(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Ne((n = +o) * ce)) + "px"), [e, t, n];
}
function Ff(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let n = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, n + "px"), t[1] = n;
  });
}
function Ke(e, t, n) {
  const i = {
    mode: ae(e.mode, 1)
  }, o = i.mode;
  function s(r, l, c, h) {
    let g = l.valToPct(r);
    return h + c * (l.dir == -1 ? 1 - g : g);
  }
  function a(r, l, c, h) {
    let g = l.valToPct(r);
    return h + c * (l.dir == -1 ? g : 1 - g);
  }
  function u(r, l, c, h) {
    return l.ori == 0 ? s(r, l, c, h) : a(r, l, c, h);
  }
  i.valToPosH = s, i.valToPosV = a;
  let d = !1;
  i.status = 0;
  const f = i.root = xt(Uh);
  if (e.id != null && (f.id = e.id), dt(f, e.class), e.title) {
    let r = xt(Gh, f);
    r.textContent = e.title;
  }
  const p = Dt("canvas"), m = i.ctx = p.getContext("2d"), v = xt(Kh, f);
  Wn("click", v, (r) => {
    r.target === S && (be != hi || $e != di) && Ve.click(i, r);
  }, !0);
  const k = i.under = xt(Yh, v);
  v.appendChild(p);
  const S = i.over = xt(qh, v);
  e = Ci(e);
  const O = +ae(e.pxAlign, 1), R = fl(O);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(i, e) || e);
  });
  const I = e.ms || 1e-3, $ = i.series = o == 1 ? gl(e.series || [], rl, hl, !1) : Mf(e.series || [null], ul), U = i.axes = gl(e.axes || [], sl, ll, !0), A = i.scales = {}, Q = i.bands = e.bands || [];
  Q.forEach((r) => {
    r.fill = ie(r.fill || null), r.dir = ae(r.dir, -1);
  });
  const z = o == 2 ? $[1].facets[0].scale : $[0].scale, X = {
    axes: Kc,
    series: jc
  }, Y = (e.drawOrder || ["axes", "series"]).map((r) => X[r]);
  function ne(r) {
    const l = r.distr == 3 ? (c) => Xt(c > 0 ? c : r.clamp(i, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => Hs(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let h = l(c), { _min: g, _max: b } = r, y = b - g;
      return (h - g) / y;
    };
  }
  function K(r) {
    let l = A[r];
    if (l == null) {
      let c = (e.scales || io)[r] || io;
      if (c.from != null) {
        K(c.from);
        let h = Ee({}, A[c.from], c, { key: r });
        h.valToPct = ne(h), A[r] = h;
      } else {
        l = A[r] = Ee({}, r == z ? _c : _f, c), l.key = r;
        let h = l.time, g = l.range, b = gn(g);
        if ((r != z || o == 2 && !h) && (b && (g[0] == null || g[1] == null) && (g = {
          min: g[0] == null ? Va : {
            mode: 1,
            hard: g[0],
            soft: g[0]
          },
          max: g[1] == null ? Va : {
            mode: 1,
            hard: g[1],
            soft: g[1]
          }
        }, b = !1), !b && Zo(g))) {
          let y = g;
          g = (w, x, E) => x == null ? Ti : Ho(x, E, y);
        }
        l.range = ie(g || (h ? Pf : r == z ? l.distr == 3 ? zf : l.distr == 4 ? Of : Ec : l.distr == 3 ? Dc : l.distr == 4 ? Mc : Nf)), l.auto = ie(b ? !1 : l.auto), l.clamp = ie(l.clamp || vf), l._min = l._max = null, l.valToPct = ne(l);
      }
    }
  }
  K("x"), K("y"), o == 1 && $.forEach((r) => {
    K(r.scale);
  }), U.forEach((r) => {
    K(r.scale);
  });
  for (let r in e.scales)
    K(r);
  const T = A[z], J = T.distr;
  let L, V;
  T.ori == 0 ? (dt(f, Wh), L = s, V = a) : (dt(f, Vh), L = a, V = s);
  const j = {};
  for (let r in A) {
    let l = A[r];
    (l.min != null || l.max != null) && (j[r] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const oe = e.tzDate || ((r) => new Date(Ne(r / I))), B = e.fmtDate || $r, tt = I == 1 ? Wd(oe) : Kd(oe), we = nl(oe, tl(I == 1 ? Ud : Gd, B)), se = ol(oe, il(qd, B)), de = [], ee = i.legend = Ee({}, Qd, e.legend), F = i.cursor = Ee({}, sf, { drag: { y: o == 2 } }, e.cursor), Me = ee.show, qe = F.show, xe = ee.markers;
  ee.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, St, at, ke = [], Lt = [], Kt, mt = !1, cn = {};
  if (ee.live) {
    const r = $[1] ? $[1].values : null;
    mt = r != null, Kt = mt ? r(i, 1, 0) : { _: 0 };
    for (let l in Kt)
      cn[l] = br;
  }
  if (Me)
    if (ue = Dt("table", td, f), at = Dt("tbody", null, ue), ee.mount(i, ue), mt) {
      St = Dt("thead", null, ue, at);
      let r = Dt("tr", null, St);
      Dt("th", null, r);
      for (var Jn in Kt)
        Dt("th", Pa, r).textContent = Jn;
    } else
      dt(ue, id), ee.live && dt(ue, nd);
  const Qn = { show: !0 }, Ri = { show: !1 };
  function mo(r, l) {
    if (l == 0 && (mt || !ee.live || o == 2))
      return Ti;
    let c = [], h = Dt("tr", od, at, at.childNodes[l]);
    dt(h, r.class), r.show || dt(h, jn);
    let g = Dt("th", null, h);
    if (xe.show) {
      let w = xt(sd, g);
      if (l > 0) {
        let x = xe.width(i, l);
        x && (w.style.border = x + "px " + xe.dash(i, l) + " " + xe.stroke(i, l)), w.style.background = xe.fill(i, l);
      }
    }
    let b = xt(Pa, g);
    r.label instanceof HTMLElement ? b.appendChild(r.label) : b.textContent = r.label, l > 0 && (xe.show || (b.style.color = r.width > 0 ? xe.stroke(i, l) : xe.fill(i, l)), Ze("click", g, (w) => {
      if (F._lock)
        return;
      Pn(w);
      let x = $.indexOf(r);
      if ((w.ctrlKey || w.metaKey) != ee.isolate) {
        let E = $.some((D, N) => N > 0 && N != x && D.show);
        $.forEach((D, N) => {
          N > 0 && Rt(N, E ? N == x ? Qn : Ri : Qn, !0, Ce.setSeries);
        });
      } else
        Rt(x, { show: !r.show }, !0, Ce.setSeries);
    }, !1), ni && Ze(La, g, (w) => {
      F._lock || (Pn(w), Rt($.indexOf(r), pi, !0, Ce.setSeries));
    }, !1));
    for (var y in Kt) {
      let w = Dt("td", rd, h);
      w.textContent = "--", c.push(w);
    }
    return [h, c];
  }
  const Tn = /* @__PURE__ */ new Map();
  function Ze(r, l, c, h = !0) {
    const g = Tn.get(l) || {}, b = F.bind[r](i, l, c, h);
    b && (Wn(r, l, g[r] = b), Tn.set(l, g));
  }
  function Xn(r, l, c) {
    const h = Tn.get(l) || {};
    for (let g in h)
      (r == null || g == r) && (Js(g, l, h[g]), delete h[g]);
    r == null && Tn.delete(l);
  }
  let Yt = 0, Cn = 0, q = 0, M = 0, ge = 0, Pe = 0, ei = ge, En = Pe, Ft = q, Dn = M, lt = 0, gt = 0, nt = 0, At = 0;
  i.bbox = {};
  let is = !1, go = !1, ti = !1, Mn = !1, bo = !1, bt = !1;
  function os(r, l, c) {
    (c || r != i.width || l != i.height) && Pr(r, l), ai(!1), ti = !0, go = !0, li();
  }
  function Pr(r, l) {
    i.width = Yt = q = r, i.height = Cn = M = l, ge = Pe = 0, Oc(), Lc();
    let c = i.bbox;
    lt = c.left = Bn(ge * ce, 0.5), gt = c.top = Bn(Pe * ce, 0.5), nt = c.width = Bn(q * ce, 0.5), At = c.height = Bn(M * ce, 0.5);
  }
  const Pc = 3;
  function Nc() {
    let r = !1, l = 0;
    for (; !r; ) {
      l++;
      let c = Vc(l), h = Gc(l);
      r = l == Pc || c && h, r || (Pr(i.width, i.height), go = !0);
    }
  }
  function zc({ width: r, height: l }) {
    os(r, l);
  }
  i.setSize = zc;
  function Oc() {
    let r = !1, l = !1, c = !1, h = !1;
    U.forEach((g, b) => {
      if (g.show && g._show) {
        let { side: y, _size: w } = g, x = y % 2, E = g.label != null ? g.labelSize : 0, D = w + E;
        D > 0 && (x ? (q -= D, y == 3 ? (ge += D, h = !0) : c = !0) : (M -= D, y == 0 ? (Pe += D, r = !0) : l = !0));
      }
    }), Nn[0] = r, Nn[1] = c, Nn[2] = l, Nn[3] = h, q -= un[1] + un[3], ge += un[3], M -= un[2] + un[0], Pe += un[0];
  }
  function Lc() {
    let r = ge + q, l = Pe + M, c = ge, h = Pe;
    function g(b, y) {
      switch (b) {
        case 1:
          return r += y, r - y;
        case 2:
          return l += y, l - y;
        case 3:
          return c -= y, c + y;
        case 0:
          return h -= y, h + y;
      }
    }
    U.forEach((b, y) => {
      if (b.show && b._show) {
        let w = b.side;
        b._pos = g(w, b._size), b.label != null && (b._lpos = g(w, b.labelSize));
      }
    });
  }
  if (F.dataIdx == null) {
    let r = F.hover, l = r.skip = new Set(r.skip ?? []);
    l.add(void 0);
    let c = r.prox = ie(r.prox), h = r.bias ??= 0;
    F.dataIdx = (g, b, y, w) => {
      if (b == 0)
        return y;
      let x = y, E = c(g, b, y, w) ?? pe, D = E >= 0 && E < pe, N = T.ori == 0 ? q : M, G = F.left, le = t[0], re = t[b];
      if (l.has(re[y])) {
        x = null;
        let te = null, W = null, H;
        if (h == 0 || h == -1)
          for (H = y; te == null && H-- > 0; )
            l.has(re[H]) || (te = H);
        if (h == 0 || h == 1)
          for (H = y; W == null && H++ < re.length; )
            l.has(re[H]) || (W = H);
        if (te != null || W != null)
          if (D) {
            let _e = te == null ? -1 / 0 : L(le[te], T, N, 0), Se = W == null ? 1 / 0 : L(le[W], T, N, 0), Ie = G - _e, fe = Se - G;
            Ie <= fe ? Ie <= E && (x = te) : fe <= E && (x = W);
          } else
            x = W == null ? te : te == null ? W : y - te <= W - y ? te : W;
      } else D && ze(G - L(le[y], T, N, 0)) > E && (x = null);
      return x;
    };
  }
  const Pn = (r) => {
    F.event = r;
  };
  F.idxs = de, F._lock = !1;
  let Ge = F.points;
  Ge.show = ie(Ge.show), Ge.size = ie(Ge.size), Ge.stroke = ie(Ge.stroke), Ge.width = ie(Ge.width), Ge.fill = ie(Ge.fill);
  const Ht = i.focus = Ee({}, e.focus || { alpha: 0.3 }, F.focus), ni = Ht.prox >= 0, ii = ni && Ge.one;
  let vt = [], oi = [], si = [];
  function Nr(r, l) {
    let c = Ge.show(i, l);
    if (c instanceof HTMLElement)
      return dt(c, ed), dt(c, r.class), Ut(c, -10, -10, q, M), S.insertBefore(c, vt[l]), c;
  }
  function zr(r, l) {
    if (o == 1 || l > 0) {
      let c = o == 1 && A[r.scale].time, h = r.value;
      r.value = c ? Ja(h) ? ol(oe, il(h, B)) : h || se : h || mf, r.label = r.label || (c ? af : rf);
    }
    if (ii || l > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Ef || vd, r.fillTo = ie(r.fillTo || yf), r.pxAlign = +ae(r.pxAlign, O), r.pxRound = fl(r.pxAlign), r.stroke = ie(r.stroke || null), r.fill = ie(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = gf(et(1, r.width), 1), h = r.points = Ee({}, {
        size: c,
        width: et(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Df,
        _stroke: null,
        _fill: null
      }, r.points);
      h.show = ie(h.show), h.filter = ie(h.filter), h.fill = ie(h.fill), h.stroke = ie(h.stroke), h.paths = ie(h.paths), h.pxAlign = r.pxAlign;
    }
    if (Me) {
      let c = mo(r, l);
      ke.splice(l, 0, c[0]), Lt.splice(l, 0, c[1]), ee.values.push(null);
    }
    if (qe) {
      de.splice(l, 0, null);
      let c = null;
      ii ? l == 0 && (c = Nr(r, l)) : l > 0 && (c = Nr(r, l)), vt.splice(l, 0, c), oi.splice(l, 0, 0), si.splice(l, 0, 0);
    }
    Be("addSeries", l);
  }
  function Fc(r, l) {
    l = l ?? $.length, r = o == 1 ? ir(r, l, rl, hl) : ir(r, l, {}, ul), $.splice(l, 0, r), zr($[l], l);
  }
  i.addSeries = Fc;
  function Hc(r) {
    if ($.splice(r, 1), Me) {
      ee.values.splice(r, 1), Lt.splice(r, 1);
      let l = ke.splice(r, 1)[0];
      Xn(null, l.firstChild), l.remove();
    }
    qe && (de.splice(r, 1), vt.splice(r, 1)[0].remove(), oi.splice(r, 1), si.splice(r, 1)), Be("delSeries", r);
  }
  i.delSeries = Hc;
  const Nn = [!1, !1, !1, !1];
  function Rc(r, l) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, h = A[r.scale];
      h == null && (r.scale = c ? $[1].scale : z, h = A[r.scale]);
      let g = h.time;
      r.size = ie(r.size), r.space = ie(r.space), r.rotate = ie(r.rotate), gn(r.incrs) && r.incrs.forEach((y) => {
        !wn.has(y) && wn.set(y, ec(y));
      }), r.incrs = ie(r.incrs || (h.distr == 2 ? Bd : g ? I == 1 ? jd : Vd : In)), r.splits = ie(r.splits || (g && h.distr == 1 ? tt : h.distr == 3 ? Xs : h.distr == 4 ? uf : cf)), r.stroke = ie(r.stroke), r.grid.stroke = ie(r.grid.stroke), r.ticks.stroke = ie(r.ticks.stroke), r.border.stroke = ie(r.border.stroke);
      let b = r.values;
      r.values = // static array of tick values
      gn(b) && !gn(b[0]) ? ie(b) : (
        // temporal
        g ? (
          // config array of fmtDate string tpls
          gn(b) ? nl(oe, tl(b, B)) : (
            // fmtDate string tpl
            Ja(b) ? Yd(oe, b) : b || we
          )
        ) : b || lf
      ), r.filter = ie(r.filter || (h.distr >= 3 && h.log == 10 ? ff : h.distr == 3 && h.log == 2 ? pf : Ql)), r.font = bl(r.font), r.labelFont = bl(r.labelFont), r._size = r.size(i, null, l, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (Nn[l] = !0, r._el = xt(Zh, v));
    }
  }
  function Bi(r, l, c, h) {
    let [g, b, y, w] = c, x = l % 2, E = 0;
    return x == 0 && (w || b) && (E = l == 0 && !g || l == 2 && !y ? Ne(sl.size / 3) : 0), x == 1 && (g || y) && (E = l == 1 && !b || l == 3 && !w ? Ne(ll.size / 2) : 0), E;
  }
  const Or = i.padding = (e.padding || [Bi, Bi, Bi, Bi]).map((r) => ie(ae(r, Bi))), un = i._padding = Or.map((r, l) => r(i, l, Nn, 0));
  let We, Le = null, Fe = null;
  const vo = o == 1 ? $[0].idxs : null;
  let Tt = null, Ii = !1;
  function Lr(r, l) {
    if (t = r ?? [], i.data = i._data = t, o == 2) {
      We = 0;
      for (let c = 1; c < $.length; c++)
        We += t[c][0].length;
    } else {
      t.length == 0 && (i.data = i._data = t = [[]]), Tt = t[0], We = Tt.length;
      let c = t;
      if (J == 2) {
        c = t.slice();
        let h = c[0] = Array(We);
        for (let g = 0; g < We; g++)
          h[g] = g;
      }
      i._data = t = c;
    }
    if (ai(!0), Be("setData"), J == 2 && (ti = !0), l !== !1) {
      let c = T;
      c.auto(i, Ii) ? ss() : dn(z, c.min, c.max), Mn = Mn || F.left >= 0, bt = !0, li();
    }
  }
  i.setData = Lr;
  function ss() {
    Ii = !0;
    let r, l;
    o == 1 && (We > 0 ? (Le = vo[0] = 0, Fe = vo[1] = We - 1, r = t[0][Le], l = t[0][Fe], J == 2 ? (r = Le, l = Fe) : r == l && (J == 3 ? [r, l] = Yo(r, r, T.log, !1) : J == 4 ? [r, l] = _r(r, r, T.log, !1) : T.time ? l = r + Ne(86400 / I) : [r, l] = Ho(r, l, yr, !0))) : (Le = vo[0] = r = null, Fe = vo[1] = l = null)), dn(z, r, l);
  }
  let _o, ri, rs, as, ls, cs, us, hs, ds, it;
  function Fr(r, l, c, h, g, b) {
    r ??= za, c ??= xr, h ??= "butt", g ??= za, b ??= "round", r != _o && (m.strokeStyle = _o = r), g != ri && (m.fillStyle = ri = g), l != rs && (m.lineWidth = rs = l), b != ls && (m.lineJoin = ls = b), h != cs && (m.lineCap = cs = h), c != as && m.setLineDash(as = c);
  }
  function Hr(r, l, c, h) {
    l != ri && (m.fillStyle = ri = l), r != us && (m.font = us = r), c != hs && (m.textAlign = hs = c), h != ds && (m.textBaseline = ds = h);
  }
  function fs(r, l, c, h, g = 0) {
    if (h.length > 0 && r.auto(i, Ii) && (l == null || l.min == null)) {
      let b = ae(Le, 0), y = ae(Fe, h.length - 1), w = c.min == null ? dd(h, b, y, g, r.distr == 3) : [c.min, c.max];
      r.min = Pt(r.min, c.min = w[0]), r.max = et(r.max, c.max = w[1]);
    }
  }
  const Rr = { min: null, max: null };
  function Bc() {
    for (let h in A) {
      let g = A[h];
      j[h] == null && // scales that have never been set (on init)
      (g.min == null || // or auto scales when the x scale was explicitly set
      j[z] != null && g.auto(i, Ii)) && (j[h] = Rr);
    }
    for (let h in A) {
      let g = A[h];
      j[h] == null && g.from != null && j[g.from] != null && (j[h] = Rr);
    }
    j[z] != null && ai(!0);
    let r = {};
    for (let h in j) {
      let g = j[h];
      if (g != null) {
        let b = r[h] = Ci(A[h], wd);
        if (g.min != null)
          Ee(b, g);
        else if (h != z || o == 2)
          if (We == 0 && b.from == null) {
            let y = b.range(i, null, null, h);
            b.min = y[0], b.max = y[1];
          } else
            b.min = pe, b.max = -pe;
      }
    }
    if (We > 0) {
      $.forEach((h, g) => {
        if (o == 1) {
          let b = h.scale, y = j[b];
          if (y == null)
            return;
          let w = r[b];
          if (g == 0) {
            let x = w.range(i, w.min, w.max, b);
            w.min = x[0], w.max = x[1], Le = Mt(w.min, t[0]), Fe = Mt(w.max, t[0]), Fe - Le > 1 && (t[0][Le] < w.min && Le++, t[0][Fe] > w.max && Fe--), h.min = Tt[Le], h.max = Tt[Fe];
          } else h.show && h.auto && fs(w, y, h, t[g], h.sorted);
          h.idxs[0] = Le, h.idxs[1] = Fe;
        } else if (g > 0 && h.show && h.auto) {
          let [b, y] = h.facets, w = b.scale, x = y.scale, [E, D] = t[g], N = r[w], G = r[x];
          N != null && fs(N, j[w], b, E, b.sorted), G != null && fs(G, j[x], y, D, y.sorted), h.min = y.min, h.max = y.max;
        }
      });
      for (let h in r) {
        let g = r[h], b = j[h];
        if (g.from == null && (b == null || b.min == null)) {
          let y = g.range(
            i,
            g.min == pe ? null : g.min,
            g.max == -pe ? null : g.max,
            h
          );
          g.min = y[0], g.max = y[1];
        }
      }
    }
    for (let h in r) {
      let g = r[h];
      if (g.from != null) {
        let b = r[g.from];
        if (b.min == null)
          g.min = g.max = null;
        else {
          let y = g.range(i, b.min, b.max, h);
          g.min = y[0], g.max = y[1];
        }
      }
    }
    let l = {}, c = !1;
    for (let h in r) {
      let g = r[h], b = A[h];
      if (b.min != g.min || b.max != g.max) {
        b.min = g.min, b.max = g.max;
        let y = b.distr;
        b._min = y == 3 ? Xt(b.min) : y == 4 ? Hs(b.min, b.asinh) : y == 100 ? b.fwd(b.min) : b.min, b._max = y == 3 ? Xt(b.max) : y == 4 ? Hs(b.max, b.asinh) : y == 100 ? b.fwd(b.max) : b.max, l[h] = c = !0;
      }
    }
    if (c) {
      $.forEach((h, g) => {
        o == 2 ? g > 0 && l.y && (h._paths = null) : l[h.scale] && (h._paths = null);
      });
      for (let h in l)
        ti = !0, Be("setScale", h);
      qe && F.left >= 0 && (Mn = bt = !0);
    }
    for (let h in j)
      j[h] = null;
  }
  function Ic(r) {
    let l = Qs(Le - 1, 0, We - 1), c = Qs(Fe + 1, 0, We - 1);
    for (; r[l] == null && l > 0; )
      l--;
    for (; r[c] == null && c < We - 1; )
      c++;
    return [l, c];
  }
  function jc() {
    if (We > 0) {
      let r = $.some((l) => l._focus) && it != Ht.alpha;
      r && (m.globalAlpha = it = Ht.alpha), $.forEach((l, c) => {
        if (c > 0 && l.show && (Br(c, !1), Br(c, !0), l._paths == null)) {
          let h = it;
          it != l.alpha && (m.globalAlpha = it = l.alpha);
          let g = o == 2 ? [0, t[c][0].length - 1] : Ic(t[c]);
          l._paths = l.paths(i, c, g[0], g[1]), it != h && (m.globalAlpha = it = h);
        }
      }), $.forEach((l, c) => {
        if (c > 0 && l.show) {
          let h = it;
          it != l.alpha && (m.globalAlpha = it = l.alpha), l._paths != null && Ir(c, !1);
          {
            let g = l._paths != null ? l._paths.gaps : null, b = l.points.show(i, c, Le, Fe, g), y = l.points.filter(i, c, b, g);
            (b || y) && (l.points._paths = l.points.paths(i, c, Le, Fe, y), Ir(c, !0));
          }
          it != h && (m.globalAlpha = it = h), Be("drawSeries", c);
        }
      }), r && (m.globalAlpha = it = 1);
    }
  }
  function Br(r, l) {
    let c = l ? $[r].points : $[r];
    c._stroke = c.stroke(i, r), c._fill = c.fill(i, r);
  }
  function Ir(r, l) {
    let c = l ? $[r].points : $[r], {
      stroke: h,
      fill: g,
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
      let le = lt - E / 2, re = gt - E / 2, te = nt + E, W = At + E;
      D = new Path2D(), D.rect(le, re, te, W);
    }
    l ? ps(w, E, c.dash, c.cap, x, h, g, y, b) : Uc(r, w, E, c.dash, c.cap, x, h, g, y, D, b), G && m.translate(-N, -N);
  }
  function Uc(r, l, c, h, g, b, y, w, x, E, D) {
    let N = !1;
    x != 0 && Q.forEach((G, le) => {
      if (G.series[0] == r) {
        let re = $[G.series[1]], te = t[G.series[1]], W = (re._paths || io).band;
        gn(W) && (W = G.dir == 1 ? W[0] : W[1]);
        let H, _e = null;
        re.show && W && pd(te, Le, Fe) ? (_e = G.fill(i, le) || b, H = re._paths.clip) : W = null, ps(l, c, h, g, _e, y, w, x, E, D, H, W), N = !0;
      }
    }), N || ps(l, c, h, g, b, y, w, x, E, D);
  }
  const jr = Ei | tr;
  function ps(r, l, c, h, g, b, y, w, x, E, D, N) {
    Fr(r, l, c, h, g), (x || E || N) && (m.save(), x && m.clip(x), E && m.clip(E)), N ? (w & jr) == jr ? (m.clip(N), D && m.clip(D), wo(g, y), yo(r, b, l)) : w & tr ? (wo(g, y), m.clip(N), yo(r, b, l)) : w & Ei && (m.save(), m.clip(N), D && m.clip(D), wo(g, y), m.restore(), yo(r, b, l)) : (wo(g, y), yo(r, b, l)), (x || E || N) && m.restore();
  }
  function yo(r, l, c) {
    c > 0 && (l instanceof Map ? l.forEach((h, g) => {
      m.strokeStyle = _o = g, m.stroke(h);
    }) : l != null && r && m.stroke(l));
  }
  function wo(r, l) {
    l instanceof Map ? l.forEach((c, h) => {
      m.fillStyle = ri = h, m.fill(c);
    }) : l != null && r && m.fill(l);
  }
  function Wc(r, l, c, h) {
    let g = U[r], b;
    if (h <= 0)
      b = [0, 0];
    else {
      let y = g._space = g.space(i, r, l, c, h), w = g._incrs = g.incrs(i, r, l, c, h, y);
      b = Lf(l, c, w, h, y);
    }
    return g._found = b;
  }
  function ms(r, l, c, h, g, b, y, w, x, E) {
    let D = y % 2 / 2;
    O == 1 && m.translate(D, D), Fr(w, y, x, E, w), m.beginPath();
    let N, G, le, re, te = g + (h == 0 || h == 3 ? -b : b);
    c == 0 ? (G = g, re = te) : (N = g, le = te);
    for (let W = 0; W < r.length; W++)
      l[W] != null && (c == 0 ? N = le = r[W] : G = re = r[W], m.moveTo(N, G), m.lineTo(le, re));
    m.stroke(), O == 1 && m.translate(-D, -D);
  }
  function Vc(r) {
    let l = !0;
    return U.forEach((c, h) => {
      if (!c.show)
        return;
      let g = A[c.scale];
      if (g.min == null) {
        c._show && (l = !1, c._show = !1, ai(!1));
        return;
      } else
        c._show || (l = !1, c._show = !0, ai(!1));
      let b = c.side, y = b % 2, { min: w, max: x } = g, [E, D] = Wc(h, w, x, y == 0 ? q : M);
      if (D == 0)
        return;
      let N = g.distr == 2, G = c._splits = c.splits(i, h, w, x, E, D, N), le = g.distr == 2 ? G.map((H) => Tt[H]) : G, re = g.distr == 2 ? Tt[G[1]] - Tt[G[0]] : E, te = c._values = c.values(i, c.filter(i, le, h, D, re), h, D, re);
      c._rotate = b == 2 ? c.rotate(i, te, h, D) : 0;
      let W = c._size;
      c._size = $t(c.size(i, te, h, r)), W != null && c._size != W && (l = !1);
    }), l;
  }
  function Gc(r) {
    let l = !0;
    return Or.forEach((c, h) => {
      let g = c(i, h, Nn, r);
      g != un[h] && (l = !1), un[h] = g;
    }), l;
  }
  function Kc() {
    for (let r = 0; r < U.length; r++) {
      let l = U[r];
      if (!l.show || !l._show)
        continue;
      let c = l.side, h = c % 2, g, b, y = l.stroke(i, r), w = c == 0 || c == 3 ? -1 : 1, [x, E] = l._found;
      if (l.label != null) {
        let Qe = l.labelGap * w, ht = Ne((l._lpos + Qe) * ce);
        Hr(l.labelFont[0], y, "center", c == 2 ? Yi : Na), m.save(), h == 1 ? (g = b = 0, m.translate(
          ht,
          Ne(gt + At / 2)
        ), m.rotate((c == 3 ? -No : No) / 2)) : (g = Ne(lt + nt / 2), b = ht);
        let Ln = Zl(l.label) ? l.label(i, r, x, E) : l.label;
        m.fillText(Ln, g, b), m.restore();
      }
      if (E == 0)
        continue;
      let D = A[l.scale], N = h == 0 ? nt : At, G = h == 0 ? lt : gt, le = l._splits, re = D.distr == 2 ? le.map((Qe) => Tt[Qe]) : le, te = D.distr == 2 ? Tt[le[1]] - Tt[le[0]] : x, W = l.ticks, H = l.border, _e = W.show ? W.size : 0, Se = Ne(_e * ce), Ie = Ne((l.alignTo == 2 ? l._size - _e - l.gap : l.gap) * ce), fe = l._rotate * -No / 180, Ae = R(l._pos * ce), ct = (Se + Ie) * w, Je = Ae + ct;
      b = h == 0 ? Je : 0, g = h == 1 ? Je : 0;
      let _t = l.font[0], Ct = l.align == 1 ? _i : l.align == 2 ? Os : fe > 0 ? _i : fe < 0 ? Os : h == 0 ? "center" : c == 3 ? Os : _i, It = fe || h == 1 ? "middle" : c == 2 ? Yi : Na;
      Hr(_t, y, Ct, It);
      let ut = l.font[1] * l.lineGap, yt = le.map((Qe) => R(u(Qe, D, N, G))), Et = l._values;
      for (let Qe = 0; Qe < Et.length; Qe++) {
        let ht = Et[Qe];
        if (ht != null) {
          h == 0 ? g = yt[Qe] : b = yt[Qe], ht = "" + ht;
          let Ln = ht.indexOf(`
`) == -1 ? [ht] : ht.split(/\n/gm);
          for (let Xe = 0; Xe < Ln.length; Xe++) {
            let aa = Ln[Xe];
            fe ? (m.save(), m.translate(g, b + Xe * ut), m.rotate(fe), m.fillText(aa, 0, 0), m.restore()) : m.fillText(aa, g, b + Xe * ut);
          }
        }
      }
      W.show && ms(
        yt,
        W.filter(i, re, r, E, te),
        h,
        c,
        Ae,
        Se,
        me(W.width * ce, 3),
        W.stroke(i, r),
        W.dash,
        W.cap
      );
      let jt = l.grid;
      jt.show && ms(
        yt,
        jt.filter(i, re, r, E, te),
        h,
        h == 0 ? 2 : 1,
        h == 0 ? gt : lt,
        h == 0 ? At : nt,
        me(jt.width * ce, 3),
        jt.stroke(i, r),
        jt.dash,
        jt.cap
      ), H.show && ms(
        [Ae],
        [1],
        h == 0 ? 1 : 0,
        h == 0 ? 1 : 2,
        h == 1 ? gt : lt,
        h == 1 ? At : nt,
        me(H.width * ce, 3),
        H.stroke(i, r),
        H.dash,
        H.cap
      );
    }
    Be("drawAxes");
  }
  function ai(r) {
    $.forEach((l, c) => {
      c > 0 && (l._paths = null, r && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((h) => {
        h.min = null, h.max = null;
      })));
    });
  }
  let xo = !1, gs = !1, ji = [];
  function Yc() {
    gs = !1;
    for (let r = 0; r < ji.length; r++)
      Be(...ji[r]);
    ji.length = 0;
  }
  function li() {
    xo || (Cd(Ur), xo = !0);
  }
  function qc(r, l = !1) {
    xo = !0, gs = l, r(i), Ur(), l && ji.length > 0 && queueMicrotask(Yc);
  }
  i.batch = qc;
  function Ur() {
    if (is && (Bc(), is = !1), ti && (Nc(), ti = !1), go) {
      if (ye(k, _i, ge), ye(k, Yi, Pe), ye(k, Ji, q), ye(k, Qi, M), ye(S, _i, ge), ye(S, Yi, Pe), ye(S, Ji, q), ye(S, Qi, M), ye(v, Ji, Yt), ye(v, Qi, Cn), p.width = Ne(Yt * ce), p.height = Ne(Cn * ce), U.forEach(({ _el: r, _show: l, _size: c, _pos: h, side: g }) => {
        if (r != null)
          if (l) {
            let b = g === 3 || g === 0 ? c : 0, y = g % 2 == 1;
            ye(r, y ? "left" : "top", h - b), ye(r, y ? "width" : "height", c), ye(r, y ? "top" : "left", y ? Pe : ge), ye(r, y ? "height" : "width", y ? M : q), Zs(r, jn);
          } else
            dt(r, jn);
      }), _o = ri = rs = ls = cs = us = hs = ds = as = null, it = 1, Vi(!0), ge != ei || Pe != En || q != Ft || M != Dn) {
        ai(!1);
        let r = q / Ft, l = M / Dn;
        if (qe && !Mn && F.left >= 0) {
          F.left *= r, F.top *= l, ci && Ut(ci, Ne(F.left), 0, q, M), ui && Ut(ui, 0, Ne(F.top), q, M);
          for (let c = 0; c < vt.length; c++) {
            let h = vt[c];
            h != null && (oi[c] *= r, si[c] *= l, Ut(h, $t(oi[c]), $t(si[c]), q, M));
          }
        }
        if (ve.show && !bo && ve.left >= 0 && ve.width > 0) {
          ve.left *= r, ve.width *= r, ve.top *= l, ve.height *= l;
          for (let c in xs)
            ye(fi, c, ve[c]);
        }
        ei = ge, En = Pe, Ft = q, Dn = M;
      }
      Be("setSize"), go = !1;
    }
    Yt > 0 && Cn > 0 && (m.clearRect(0, 0, p.width, p.height), Be("drawClear"), Y.forEach((r) => r()), Be("draw")), ve.show && bo && ($o(ve), bo = !1), qe && Mn && (On(null, !0, !1), Mn = !1), ee.show && ee.live && bt && (ys(), bt = !1), d || (d = !0, i.status = 1, Be("ready")), Ii = !1, xo = !1;
  }
  i.redraw = (r, l) => {
    ti = l || !1, r !== !1 ? dn(z, T.min, T.max) : li();
  };
  function bs(r, l) {
    let c = A[r];
    if (c.from == null) {
      if (We == 0) {
        let h = c.range(i, l.min, l.max, r);
        l.min = h[0], l.max = h[1];
      }
      if (l.min > l.max) {
        let h = l.min;
        l.min = l.max, l.max = h;
      }
      if (We > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      r == z && c.distr == 2 && We > 0 && (l.min = Mt(l.min, t[0]), l.max = Mt(l.max, t[0]), l.min == l.max && l.max++), j[r] = l, is = !0, li();
    }
  }
  i.setScale = bs;
  let vs, _s, ci, ui, Wr, Vr, hi, di, Gr, Kr, be, $e, hn = !1;
  const Ve = F.drag;
  let He = Ve.x, Re = Ve.y;
  qe && (F.x && (vs = xt(Qh, S)), F.y && (_s = xt(Xh, S)), T.ori == 0 ? (ci = vs, ui = _s) : (ci = _s, ui = vs), be = F.left, $e = F.top);
  const ve = i.select = Ee({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), fi = ve.show ? xt(Jh, ve.over ? S : k) : null;
  function $o(r, l) {
    if (ve.show) {
      for (let c in r)
        ve[c] = r[c], c in xs && ye(fi, c, r[c]);
      l !== !1 && Be("setSelect");
    }
  }
  i.setSelect = $o;
  function Zc(r) {
    if ($[r].show)
      Me && Zs(ke[r], jn);
    else if (Me && dt(ke[r], jn), qe) {
      let c = ii ? vt[0] : vt[r];
      c != null && Ut(c, -10, -10, q, M);
    }
  }
  function dn(r, l, c) {
    bs(r, { min: l, max: c });
  }
  function Rt(r, l, c, h) {
    l.focus != null && tu(r), l.show != null && $.forEach((g, b) => {
      b > 0 && (r == b || r == null) && (g.show = l.show, Zc(b), o == 2 ? (dn(g.facets[0].scale, null, null), dn(g.facets[1].scale, null, null)) : dn(g.scale, null, null), li());
    }), c !== !1 && Be("setSeries", r, l), h && Gi("setSeries", i, r, l);
  }
  i.setSeries = Rt;
  function Jc(r, l) {
    Ee(Q[r], l);
  }
  function Qc(r, l) {
    r.fill = ie(r.fill || null), r.dir = ae(r.dir, -1), l = l ?? Q.length, Q.splice(l, 0, r);
  }
  function Xc(r) {
    r == null ? Q.length = 0 : Q.splice(r, 1);
  }
  i.addBand = Qc, i.setBand = Jc, i.delBand = Xc;
  function eu(r, l) {
    $[r].alpha = l, qe && vt[r] != null && (vt[r].style.opacity = l), Me && ke[r] && (ke[r].style.opacity = l);
  }
  let qt, fn, zn;
  const pi = { focus: !0 };
  function tu(r) {
    if (r != zn) {
      let l = r == null, c = Ht.alpha != 1;
      $.forEach((h, g) => {
        if (o == 1 || g > 0) {
          let b = l || g == 0 || g == r;
          h._focus = l ? null : b, c && eu(g, b ? 1 : Ht.alpha);
        }
      }), zn = r, c && li();
    }
  }
  Me && ni && Ze(Fa, ue, (r) => {
    F._lock || (Pn(r), zn != null && Rt(null, pi, !0, Ce.setSeries));
  });
  function Bt(r, l, c) {
    let h = A[l];
    c && (r = r / ce - (h.ori == 1 ? Pe : ge));
    let g = q;
    h.ori == 1 && (g = M, r = g - r), h.dir == -1 && (r = g - r);
    let b = h._min, y = h._max, w = r / g, x = b + (y - b) * w, E = h.distr;
    return E == 3 ? Ai(10, x) : E == 4 ? gd(x, h.asinh) : E == 100 ? h.bwd(x) : x;
  }
  function nu(r, l) {
    let c = Bt(r, z, l);
    return Mt(c, t[0], Le, Fe);
  }
  i.valToIdx = (r) => Mt(r, t[0]), i.posToIdx = nu, i.posToVal = Bt, i.valToPos = (r, l, c) => A[l].ori == 0 ? s(
    r,
    A[l],
    c ? nt : q,
    c ? lt : 0
  ) : a(
    r,
    A[l],
    c ? At : M,
    c ? gt : 0
  ), i.setCursor = (r, l, c) => {
    be = r.left, $e = r.top, On(null, l, c);
  };
  function Yr(r, l) {
    ye(fi, _i, ve.left = r), ye(fi, Ji, ve.width = l);
  }
  function qr(r, l) {
    ye(fi, Yi, ve.top = r), ye(fi, Qi, ve.height = l);
  }
  let Ui = T.ori == 0 ? Yr : qr, Wi = T.ori == 1 ? Yr : qr;
  function iu() {
    if (Me && ee.live)
      for (let r = o == 2 ? 1 : 0; r < $.length; r++) {
        if (r == 0 && mt)
          continue;
        let l = ee.values[r], c = 0;
        for (let h in l)
          Lt[r][c++].firstChild.nodeValue = l[h];
      }
  }
  function ys(r, l) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, h) => {
      de[h] = c;
    }) : yd(r.idx) || de.fill(r.idx), ee.idx = de[0]), Me && ee.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || o == 1 && !mt) && ou(c, de[c]);
      iu();
    }
    bt = !1, l !== !1 && Be("setLegend");
  }
  i.setLegend = ys;
  function ou(r, l) {
    let c = $[r], h = r == 0 && J == 2 ? Tt : t[r], g;
    mt ? g = c.values(i, r, l) ?? cn : (g = c.value(i, l == null ? null : h[l], r, l), g = g == null ? cn : { _: g }), ee.values[r] = g;
  }
  function On(r, l, c) {
    Gr = be, Kr = $e, [be, $e] = F.move(i, be, $e), F.left = be, F.top = $e, qe && (ci && Ut(ci, Ne(be), 0, q, M), ui && Ut(ui, 0, Ne($e), q, M));
    let h, g = Le > Fe;
    qt = pe, fn = null;
    let b = T.ori == 0 ? q : M, y = T.ori == 1 ? q : M;
    if (be < 0 || We == 0 || g) {
      h = F.idx = null;
      for (let w = 0; w < $.length; w++) {
        let x = vt[w];
        x != null && Ut(x, -10, -10, q, M);
      }
      ni && Rt(null, pi, !0, r == null && Ce.setSeries), ee.live && (de.fill(h), bt = !0);
    } else {
      let w, x, E;
      o == 1 && (w = T.ori == 0 ? be : $e, x = Bt(w, z), h = F.idx = Mt(x, t[0], Le, Fe), E = L(t[0][h], T, b, 0));
      let D = -10, N = -10, G = 0, le = 0, re = !0, te = "", W = "";
      for (let H = o == 2 ? 1 : 0; H < $.length; H++) {
        let _e = $[H], Se = de[H], Ie = Se == null ? null : o == 1 ? t[H][Se] : t[H][1][Se], fe = F.dataIdx(i, H, h, x), Ae = fe == null ? null : o == 1 ? t[H][fe] : t[H][1][fe];
        if (bt = bt || Ae != Ie || fe != Se, de[H] = fe, H > 0 && _e.show) {
          let ct = fe == null ? -10 : fe == h ? E : L(o == 1 ? t[0][fe] : t[H][0][fe], T, b, 0), Je = Ae == null ? -10 : V(Ae, o == 1 ? A[_e.scale] : A[_e.facets[1].scale], y, 0);
          if (ni && Ae != null) {
            let _t = T.ori == 1 ? be : $e, Ct = ze(Ht.dist(i, H, fe, Je, _t));
            if (Ct < qt) {
              let It = Ht.bias;
              if (It != 0) {
                let ut = Bt(_t, _e.scale), yt = Ae >= 0 ? 1 : -1, Et = ut >= 0 ? 1 : -1;
                Et == yt && (Et == 1 ? It == 1 ? Ae >= ut : Ae <= ut : (
                  // >= 0
                  It == 1 ? Ae <= ut : Ae >= ut
                )) && (qt = Ct, fn = H);
              } else
                qt = Ct, fn = H;
            }
          }
          if (bt || ii) {
            let _t, Ct;
            T.ori == 0 ? (_t = ct, Ct = Je) : (_t = Je, Ct = ct);
            let It, ut, yt, Et, jt, Qe, ht = !0, Ln = Ge.bbox;
            if (Ln != null) {
              ht = !1;
              let Xe = Ln(i, H);
              yt = Xe.left, Et = Xe.top, It = Xe.width, ut = Xe.height;
            } else
              yt = _t, Et = Ct, It = ut = Ge.size(i, H);
            if (Qe = Ge.fill(i, H), jt = Ge.stroke(i, H), ii)
              H == fn && qt <= Ht.prox && (D = yt, N = Et, G = It, le = ut, re = ht, te = Qe, W = jt);
            else {
              let Xe = vt[H];
              Xe != null && (oi[H] = yt, si[H] = Et, Wa(Xe, It, ut, ht), ja(Xe, Qe, jt), Ut(Xe, $t(yt), $t(Et), q, M));
            }
          }
        }
      }
      if (ii) {
        let H = Ht.prox, _e = zn == null ? qt <= H : qt > H || fn != zn;
        if (bt || _e) {
          let Se = vt[0];
          Se != null && (oi[0] = D, si[0] = N, Wa(Se, G, le, re), ja(Se, te, W), Ut(Se, $t(D), $t(N), q, M));
        }
      }
    }
    if (ve.show && hn)
      if (r != null) {
        let [w, x] = Ce.scales, [E, D] = Ce.match, [N, G] = r.cursor.sync.scales, le = r.cursor.drag;
        if (He = le._x, Re = le._y, He || Re) {
          let { left: re, top: te, width: W, height: H } = r.select, _e = r.scales[N].ori, Se = r.posToVal, Ie, fe, Ae, ct, Je, _t = w != null && E(w, N), Ct = x != null && D(x, G);
          _t && He ? (_e == 0 ? (Ie = re, fe = W) : (Ie = te, fe = H), Ae = A[w], ct = L(Se(Ie, N), Ae, b, 0), Je = L(Se(Ie + fe, N), Ae, b, 0), Ui(Pt(ct, Je), ze(Je - ct))) : Ui(0, b), Ct && Re ? (_e == 1 ? (Ie = re, fe = W) : (Ie = te, fe = H), Ae = A[x], ct = V(Se(Ie, G), Ae, y, 0), Je = V(Se(Ie + fe, G), Ae, y, 0), Wi(Pt(ct, Je), ze(Je - ct))) : Wi(0, y);
        } else
          $s();
      } else {
        let w = ze(Gr - Wr), x = ze(Kr - Vr);
        if (T.ori == 1) {
          let G = w;
          w = x, x = G;
        }
        He = Ve.x && w >= Ve.dist, Re = Ve.y && x >= Ve.dist;
        let E = Ve.uni;
        E != null ? He && Re && (He = w >= E, Re = x >= E, !He && !Re && (x > w ? Re = !0 : He = !0)) : Ve.x && Ve.y && (He || Re) && (He = Re = !0);
        let D, N;
        He && (T.ori == 0 ? (D = hi, N = be) : (D = di, N = $e), Ui(Pt(D, N), ze(N - D)), Re || Wi(0, y)), Re && (T.ori == 1 ? (D = hi, N = be) : (D = di, N = $e), Wi(Pt(D, N), ze(N - D)), He || Ui(0, b)), !He && !Re && (Ui(0, 0), Wi(0, 0));
      }
    if (Ve._x = He, Ve._y = Re, r == null) {
      if (c) {
        if (ra != null) {
          let [w, x] = Ce.scales;
          Ce.values[0] = w != null ? Bt(T.ori == 0 ? be : $e, w) : null, Ce.values[1] = x != null ? Bt(T.ori == 1 ? be : $e, x) : null;
        }
        Gi(Ls, i, be, $e, q, M, h);
      }
      if (ni) {
        let w = c && Ce.setSeries, x = Ht.prox;
        zn == null ? qt <= x && Rt(fn, pi, !0, w) : qt > x ? Rt(null, pi, !0, w) : fn != zn && Rt(fn, pi, !0, w);
      }
    }
    bt && (ee.idx = h, ys()), l !== !1 && Be("setCursor");
  }
  let pn = null;
  Object.defineProperty(i, "rect", {
    get() {
      return pn == null && Vi(!1), pn;
    }
  });
  function Vi(r = !1) {
    r ? pn = null : (pn = S.getBoundingClientRect(), Be("syncRect", pn));
  }
  function Zr(r, l, c, h, g, b, y) {
    F._lock || hn && r != null && r.movementX == 0 && r.movementY == 0 || (ws(r, l, c, h, g, b, y, !1, r != null), r != null ? On(null, !0, !0) : On(l, !0, !1));
  }
  function ws(r, l, c, h, g, b, y, w, x) {
    if (pn == null && Vi(!1), Pn(r), r != null)
      c = r.clientX - pn.left, h = r.clientY - pn.top;
    else {
      if (c < 0 || h < 0) {
        be = -10, $e = -10;
        return;
      }
      let [E, D] = Ce.scales, N = l.cursor.sync, [G, le] = N.values, [re, te] = N.scales, [W, H] = Ce.match, _e = l.axes[0].side % 2 == 1, Se = T.ori == 0 ? q : M, Ie = T.ori == 1 ? q : M, fe = _e ? b : g, Ae = _e ? g : b, ct = _e ? h : c, Je = _e ? c : h;
      if (re != null ? c = W(E, re) ? u(G, A[E], Se, 0) : -10 : c = Se * (ct / fe), te != null ? h = H(D, te) ? u(le, A[D], Ie, 0) : -10 : h = Ie * (Je / Ae), T.ori == 1) {
        let _t = c;
        c = h, h = _t;
      }
    }
    x && (l == null || l.cursor.event.type == Ls) && ((c <= 1 || c >= q - 1) && (c = Bn(c, q)), (h <= 1 || h >= M - 1) && (h = Bn(h, M))), w ? (Wr = c, Vr = h, [hi, di] = F.move(i, c, h)) : (be = c, $e = h);
  }
  const xs = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function $s() {
    $o(xs, !1);
  }
  let Jr, Qr, Xr, ea;
  function ta(r, l, c, h, g, b, y) {
    hn = !0, He = Re = Ve._x = Ve._y = !1, ws(r, l, c, h, g, b, y, !0, !1), r != null && (Ze(Fs, Ys, na, !1), Gi(Oa, i, hi, di, q, M, null));
    let { left: w, top: x, width: E, height: D } = ve;
    Jr = w, Qr = x, Xr = E, ea = D;
  }
  function na(r, l, c, h, g, b, y) {
    hn = Ve._x = Ve._y = !1, ws(r, l, c, h, g, b, y, !1, !0);
    let { left: w, top: x, width: E, height: D } = ve, N = E > 0 || D > 0, G = Jr != w || Qr != x || Xr != E || ea != D;
    if (N && G && $o(ve), Ve.setScale && N && G) {
      let le = w, re = E, te = x, W = D;
      if (T.ori == 1 && (le = x, re = D, te = w, W = E), He && dn(
        z,
        Bt(le, z),
        Bt(le + re, z)
      ), Re)
        for (let H in A) {
          let _e = A[H];
          H != z && _e.from == null && _e.min != pe && dn(
            H,
            Bt(te + W, H),
            Bt(te, H)
          );
        }
      $s();
    } else F.lock && (F._lock = !F._lock, On(l, !0, r != null));
    r != null && (Xn(Fs, Ys), Gi(Fs, i, be, $e, q, M, null));
  }
  function su(r, l, c, h, g, b, y) {
    if (F._lock)
      return;
    Pn(r);
    let w = hn;
    if (hn) {
      let x = !0, E = !0, D = 10, N, G;
      T.ori == 0 ? (N = He, G = Re) : (N = Re, G = He), N && G && (x = be <= D || be >= q - D, E = $e <= D || $e >= M - D), N && x && (be = be < hi ? 0 : q), G && E && ($e = $e < di ? 0 : M), On(null, !0, !0), hn = !1;
    }
    be = -10, $e = -10, de.fill(null), On(null, !0, !0), w && (hn = w);
  }
  function ia(r, l, c, h, g, b, y) {
    F._lock || (Pn(r), ss(), $s(), r != null && Gi(Ha, i, be, $e, q, M, null));
  }
  function oa() {
    U.forEach(Ff), os(i.width, i.height, !0);
  }
  Wn(Fo, $i, oa);
  const mi = {};
  mi.mousedown = ta, mi.mousemove = Zr, mi.mouseup = na, mi.dblclick = ia, mi.setSeries = (r, l, c, h) => {
    let g = Ce.match[2];
    c = g(i, l, c), c != -1 && Rt(c, h, !0, !1);
  }, qe && (Ze(Oa, S, ta), Ze(Ls, S, Zr), Ze(La, S, (r) => {
    Pn(r), Vi(!1);
  }), Ze(Fa, S, su), Ze(Ha, S, ia), nr.add(i), i.syncRect = Vi);
  const ko = i.hooks = e.hooks || {};
  function Be(r, l, c) {
    gs ? ji.push([r, l, c]) : r in ko && ko[r].forEach((h) => {
      h.call(null, i, l, c);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let l in r.hooks)
      ko[l] = (ko[l] || []).concat(r.hooks[l]);
  });
  const sa = (r, l, c) => c, Ce = Ee({
    key: null,
    setSeries: !1,
    filters: {
      pub: qa,
      sub: qa
    },
    scales: [z, $[1] ? $[1].scale : null],
    match: [Za, Za, sa],
    values: [null, null]
  }, F.sync);
  Ce.match.length == 2 && Ce.match.push(sa), F.sync = Ce;
  const ra = Ce.key, ks = yc(ra);
  function Gi(r, l, c, h, g, b, y) {
    Ce.filters.pub(r, l, c, h, g, b, y) && ks.pub(r, l, c, h, g, b, y);
  }
  ks.sub(i);
  function ru(r, l, c, h, g, b, y) {
    Ce.filters.sub(r, l, c, h, g, b, y) && mi[r](null, l, c, h, g, b, y);
  }
  i.pub = ru;
  function au() {
    ks.unsub(i), nr.delete(i), Tn.clear(), Js(Fo, $i, oa), f.remove(), ue?.remove(), Be("destroy");
  }
  i.destroy = au;
  function Ss() {
    Be("init", e, t), Lr(t || e.data, !1), j[z] ? bs(z, j[z]) : ss(), bo = ve.show && (ve.width > 0 || ve.height > 0), Mn = bt = !0, os(e.width, e.height);
  }
  return $.forEach(zr), U.forEach(Rc), n ? n instanceof HTMLElement ? (n.appendChild(f), Ss()) : n(i, Ss) : Ss(), i;
}
Ke.assign = Ee;
Ke.fmtNum = wr;
Ke.rangeNum = Ho;
Ke.rangeLog = Yo;
Ke.rangeAsinh = _r;
Ke.orient = Zn;
Ke.pxRatio = ce;
Ke.join = Td;
Ke.fmtDate = $r, Ke.tzDate = Hd;
Ke.sync = yc;
{
  Ke.addGap = wf, Ke.clipGaps = Jo;
  let e = Ke.paths = {
    points: Ac
  };
  e.linear = Cc, e.stepped = kf, e.bars = Sf, e.spline = Tf;
}
const Hf = 24;
async function Rf(e, t, n, i) {
  const o = new Date(Date.now() - n * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (a) => {
      const u = a.states ?? {};
      if (Object.keys(u).length === 0) {
        Object.keys(s).length > 0 && i(s);
        return;
      }
      const d = (Date.now() - n * 60 * 60 * 1e3) / 1e3;
      for (const [f, p] of Object.entries(u)) {
        const m = s[f] ?? [];
        s[f] = [...m, ...p].filter((v) => v.lu >= d);
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
function Bf(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const s of e) for (const [a] of s) n.add(a);
  if (n.size === 0)
    return [[t], ...e.map(() => [null])];
  const i = [...n].sort((s, a) => s - a), o = e.map((s) => {
    let a = -1, u = null;
    return i.map((d) => {
      for (; a + 1 < s.length && s[a + 1][0] <= d; )
        a++, u = s[a][1];
      return u;
    });
  });
  return [i, ...o];
}
const If = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var jf = Object.defineProperty, ts = (e, t, n, i) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, n, o) || o);
  return o && jf(t, n, o), o;
};
const Uf = [
  Ue,
  Bo(If),
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
class Li extends Te {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = Uf;
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
ts([
  Z()
], Li.prototype, "_loading");
ts([
  Z()
], Li.prototype, "_error");
ts([
  Z()
], Li.prototype, "_empty");
ts([
  Mi(".chart-host")
], Li.prototype, "_host");
var Wf = Object.defineProperty, Vf = Object.getOwnPropertyDescriptor, an = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Vf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Wf(t, n, o), o;
};
const or = 260, Gf = 3;
let zt = class extends Li {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return or;
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
    const e = Gf + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const i = await Rf(this.hass, n, Hf, (o) => {
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
    const d = Bf(u, t), f = this._buildOpts(this._host.clientWidth || 400);
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
      values: (f, p) => p.map((m) => `${m.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: or,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: d,
      axes: u,
      series: a,
      hooks: {
        draw: [
          (f) => {
            const p = f.ctx;
            if (!p) return;
            const m = f.bbox.top, v = f.bbox.height;
            p.save();
            for (const k of this._intervals) {
              const S = f.valToPos(k.start, "x", !0), O = f.valToPos(k.end, "x", !0);
              O <= S || (p.fillStyle = k.action === "heating" ? _l(t, 0.18) : _l(n, 0.18), p.fillRect(S, m, O - S, v));
            }
            p.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return _`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return _`
      ${this._loading ? _`<div class="status">Loading 24 h history…</div>` : C}
      ${this._error ? _`<div class="status">${this._error}</div>` : C}
      ${this._empty ? _`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : C}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? C : this._renderLegend()}
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
    return _`<div class="legend">
      ${this._toggleItem(
      "Room",
      _`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      _`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : C}
      ${this._toggleItem(
      "Low band",
      _`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      _`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      _`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
      "Humidity (%, right axis)"
    ) : C}
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
    return _`<span
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
  ...Li.styles,
  De`
      .chart-host {
        height: ${Bo(or)}px;
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
an([
  P({ attribute: !1 })
], zt.prototype, "hass", 2);
an([
  P({ type: String })
], zt.prototype, "roomEntity", 2);
an([
  P({ type: String })
], zt.prototype, "lowEntity", 2);
an([
  P({ type: String })
], zt.prototype, "highEntity", 2);
an([
  P({ type: String })
], zt.prototype, "actionEntity", 2);
an([
  P({ type: String })
], zt.prototype, "apparentEntity", 2);
an([
  P({ type: String })
], zt.prototype, "humidityEntity", 2);
an([
  Z()
], zt.prototype, "_hiddenLabels", 2);
zt = an([
  je("comfort-band-history-chart")
], zt);
function _l(e, t) {
  const n = e.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let s = i[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const a = parseInt(s.slice(0, 2), 16), u = parseInt(s.slice(2, 4), 16), d = parseInt(s.slice(4, 6), 16);
    return `rgba(${a}, ${u}, ${d}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : n;
}
var Kf = Object.defineProperty, Yf = Object.getOwnPropertyDescriptor, Dr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Yf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Kf(t, n, o), o;
};
let uo = class extends Te {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return _`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, n = Rl(this.hass, e), i = t ?? "", o = t && n ? n : "";
    return _`
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
    return e ? t ? C : _`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : _`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
uo.styles = [
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
Dr([
  P({ attribute: !1 })
], uo.prototype, "hass", 2);
Dr([
  P({ attribute: !1 })
], uo.prototype, "entities", 2);
uo = Dr([
  je("comfort-band-insights-tab")
], uo);
var qf = Object.defineProperty, Zf = Object.getOwnPropertyDescriptor, po = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Zf(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && qf(t, n, o), o;
};
function Jf(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function yl(e, t) {
  return `${e} ${t}${e === 1 ? "" : "s"}`;
}
const js = 10, Qf = {
  too_cold: "Too cool",
  just_right: "Just right",
  too_hot: "Too warm"
}, Xf = {
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
    if (!this.hass || !this.entities) return C;
    const e = jl(this.hass, this.entities), t = Wl(this.hass, this.entities);
    return _`
      <h3>Heating and cooling</h3>
      ${this._renderDeciding(e)}
      <h3>What it has learned</h3>
      ${t === "unavailable" ? _`<div class="note">What it has learned can’t be read right now.</div>` : t ? this._renderRates(t) : _`<div class="note">
              What it has learned needs the <code>comfort_band</code> integration v0.6.0 or later,
              with its entities turned on.
            </div>`}
      <h3>Feedback</h3>
      <div role="status">${this._renderFeedback()}</div>
    `;
  }
  _row(e, t, n = "", i = "") {
    return _`<div class="row" data-diag=${i || C}>
      <div class="row-label">
        <div class="title">${e}</div>
        ${n ? _`<div class="desc">${n}</div>` : C}
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
    ) : C;
    if (e.noReading)
      return _`${n}
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
    }, o = (s) => s ? dh[s] : "Can’t tell";
    return _`
      ${n}
      ${this._row(
      "Deciding now",
      e.controller ? Il[e.controller] : "Can’t tell",
      e.controller ? e.reason ? i[e.reason] : "" : "Some of what decides it can’t be read.",
      "controller"
    )}
      ${this._row("Its decision", o(e.decision), "", "decision")}
      ${typeof t.predictedAction == "string" ? this._row("Learning would", o(e.learning), "", "learning") : C}
      ${typeof t.mpcAction == "string" || typeof t.mpcReady == "string" ? this._row(
      "Predictive control would",
      e.predictive === "not-ready" ? "Not ready yet" : o(e.predictive),
      "",
      "predictive"
    ) : C}
    `;
  }
  _renderRates(e) {
    const t = (i) => i === null ? "—" : `${i > 0 ? "+" : i < 0 ? "−" : ""}${Math.abs(i).toFixed(2)}`, n = (i) => i.method !== "cached" && i.method !== "previous";
    return _`
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
      (i) => _`<tr>
                    <th scope="row">${i.name}</th>
                    <td>${t(i.perHour)}</td>
                    <td>${n(i) && i.samples !== null ? i.samples : "—"}</td>
                    <td>${n(i) && i.spread !== null ? `${i.spread.toFixed(2)}°` : "—"}</td>
                    <td>${i.method ? Xf[i.method] ?? i.method : "—"}</td>
                  </tr>`
    )}
            </tbody>
          </table>
        </div>
        <div class="note">
          ${e.windowMinutes !== null && e.sampleCount !== null ? `Learning keeps ${yl(e.sampleCount, "reading")}, spanning ${yl(Math.round(e.windowMinutes), "minute")}.` : ""}
          ${e.updated !== null ? `The newest is from ${lo(e.updated, Date.now(), this.hass)}.` : ""}
        </div>
      </details>
    `;
  }
  _renderFeedback() {
    const e = this._feedback;
    if (e.kind === "loading") return _`<div class="note">Loading…</div>`;
    if (e.kind === "old")
      return _`<div class="note">
        Feedback needs the <code>comfort_band</code> integration v0.11.0 or later.
      </div>`;
    if (e.kind === "error")
      return _`<div class="note">Feedback can’t be loaded right now.</div>`;
    if (e.entries.length === 0)
      return _`<div class="note">
        None yet. Taps on “How does it feel?” on the Now tab show here.
      </div>`;
    const t = Date.now(), n = e.entries.slice(-js).reverse();
    return _`
      <ul>
        ${n.map((i) => this._renderEntry(i, t))}
      </ul>
      ${e.entries.length > js ? _`<div class="note">The last ${js} of ${e.entries.length}.</div>` : C}
    `;
  }
  _renderEntry(e, t) {
    const n = Date.parse(e.timestamp), i = nn({ low: e.low, high: e.high }), o = typeof e.room_temp == "number" ? `${_n(e.room_temp)}°, range ${i}` : `no reading, range ${i}`, s = [
      e.room_source === "fallback_sensor" || e.room_source === "climate" ? "stand-in reading" : "",
      e.peak_state === "active" ? "during a peak" : e.peak_state === "preconditioning" ? "ahead of a peak" : ""
    ].filter(Boolean);
    return _`<li>
      <span class="said">${Qf[e.label] ?? e.label}</span>
      <div class="detail">
        ${Jf(
      [Number.isFinite(n) ? lo(n, t, this.hass) : "", o, ...s].filter(Boolean).join(" · ")
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
po([
  P({ attribute: !1 })
], Kn.prototype, "hass", 2);
po([
  P({ type: String })
], Kn.prototype, "zone", 2);
po([
  P({ attribute: !1 })
], Kn.prototype, "entities", 2);
po([
  Z()
], Kn.prototype, "_feedback", 2);
Kn = po([
  je("comfort-band-diagnostics-tab")
], Kn);
var ep = Object.defineProperty, tp = Object.getOwnPropertyDescriptor, ln = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? tp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && ep(t, n, o), o;
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
    return _`
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
ln([
  P({ type: Number })
], Ot.prototype, "min", 2);
ln([
  P({ type: Number })
], Ot.prototype, "max", 2);
ln([
  P({ type: Number })
], Ot.prototype, "step", 2);
ln([
  P({ type: Number })
], Ot.prototype, "low", 2);
ln([
  P({ type: Number })
], Ot.prototype, "high", 2);
ln([
  P({ type: String })
], Ot.prototype, "unit", 2);
ln([
  Z()
], Ot.prototype, "_dragging", 2);
ln([
  Mi(".track")
], Ot.prototype, "_track", 2);
Ot = ln([
  je("dual-handle-slider")
], Ot);
var np = Object.defineProperty, ip = Object.getOwnPropertyDescriptor, Fi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ip(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && np(t, n, o), o;
};
const op = 16, sp = 26, sr = 0.5, Us = 3;
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
        hours: Us
      };
      this._chain = this._chain.then(() => Ol(t, n)).catch(() => {
      });
    };
  }
  render() {
    if (!this.hass || !this.entities) return C;
    const e = Wo(this.hass, this.entities), t = wl(this.hass, this.entities.manualLow), n = wl(this.hass, this.entities.manualHigh), i = rp(e.band.low, e.band.high, t, n), o = this._pendingLow ?? i.low, s = this._pendingHigh ?? i.high, a = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(op, Math.floor(i.low)),
      max: Math.max(sp, Math.ceil(i.high))
    };
    this._heldRange = a;
    const u = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${Us} hours, then the schedule takes over again.` : `Sets this room’s range for ${Us} hours.`;
    return _`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${u}</div>
        <dual-handle-slider
          .min=${a.min}
          .max=${a.max}
          .step=${sr}
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
Fi([
  P({ attribute: !1 })
], xn.prototype, "hass", 2);
Fi([
  P({ type: String })
], xn.prototype, "zone", 2);
Fi([
  P({ attribute: !1 })
], xn.prototype, "entities", 2);
Fi([
  Z()
], xn.prototype, "_pendingLow", 2);
Fi([
  Z()
], xn.prototype, "_pendingHigh", 2);
xn = Fi([
  je("comfort-band-exact-range")
], xn);
function wl(e, t) {
  const n = t !== null ? e.states[t] : void 0;
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function rp(e, t, n, i) {
  let o = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, s = t) : Number.isFinite(n) && Number.isFinite(i) && (o = n, s = i), o = Math.round(o * 10) / 10, s = Math.round(s * 10) / 10, s - o < sr && (s = o + sr), { low: o, high: s };
}
var ap = Object.defineProperty, lp = Object.getOwnPropertyDescriptor, Hi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? lp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && ap(t, n, o), o;
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
    const e = Go(this.hass), t = e !== null ? this.hass.states[e] : void 0;
    if (!mr(t))
      return Hl(this.hass) ? "Not available right now" : "No profiles set up";
    const n = t.state;
    return !n || n === "unknown" ? "" : `Profile: ${n}`;
  }
  _section(e, t, n, i, o) {
    return _`
      <details
        data-section=${e}
        @toggle=${o ? (s) => o(s.target.open) : C}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${n ? _`<span class="summary">${n}</span>` : C}
          </span>
        </summary>
        <div class="content">${i}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? C : _`
      ${this._section(
      "comfort",
      "Comfort",
      this._comfortSummary(),
      _`<comfort-band-settings-tab
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
      _`<comfort-band-settings-tab
          section="automation"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "fan",
      "Fan",
      this._switchSummary("fanControlEnabled", "Fan control"),
      _`<comfort-band-settings-tab
          section="fan"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "peak",
      "Peak saving",
      this._switchSummary("peakSavingEnabled", "Peak saving"),
      _`<comfort-band-settings-tab
          section="peak"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "schedules",
      "Schedules",
      this._schedulesSummary(),
      _`<comfort-band-settings-tab
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
      gh(jl(this.hass, this.entities)),
      this._diagnosticsOpen ? _`<comfort-band-diagnostics-tab
              .hass=${this.hass}
              .zone=${this.zone}
              .entities=${this.entities}
            ></comfort-band-diagnostics-tab>` : C,
      (e) => this._diagnosticsOpen = e
    )}
      ${this._section(
      "history",
      "History",
      "Last 24 hours",
      this._historyOpen ? _`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : C,
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
Hi([
  P({ attribute: !1 })
], $n.prototype, "hass", 2);
Hi([
  P({ type: String })
], $n.prototype, "zone", 2);
Hi([
  P({ attribute: !1 })
], $n.prototype, "entities", 2);
Hi([
  Z()
], $n.prototype, "_historyOpen", 2);
Hi([
  Z()
], $n.prototype, "_diagnosticsOpen", 2);
$n = Hi([
  je("comfort-band-advanced-tab")
], $n);
var cp = Object.defineProperty, up = Object.getOwnPropertyDescriptor, An = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? up(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && cp(t, n, o), o;
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
    if (!this._isOpen) return C;
    const e = this.zoneName || this.zone || "Comfort Band";
    return _`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Rn.map(
      (t) => _`
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
        return _`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return _`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-schedule-tab>`;
      case "advanced":
        return _`<comfort-band-advanced-tab
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
  Z()
], Gt.prototype, "_activeTab", 2);
An([
  Z()
], Gt.prototype, "_isOpen", 2);
An([
  Mi("dialog")
], Gt.prototype, "_dialog", 2);
Gt = An([
  je("comfort-band-modal")
], Gt);
var hp = Object.defineProperty, dp = Object.getOwnPropertyDescriptor, Mr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? dp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && hp(t, n, o), o;
};
let ho = class extends Te {
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
    return Bl(this.hass, { zone: this.config.zone }, e);
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
      return _`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return _`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? _`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (n) => _` <option value=${n} ?selected=${n === this.config.zone}>${n}</option> `
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
ho.styles = [
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
Mr([
  P({ attribute: !1 })
], ho.prototype, "hass", 2);
Mr([
  P({ attribute: !1 })
], ho.prototype, "config", 2);
ho = Mr([
  je("comfort-band-card-editor")
], ho);
var fp = Object.defineProperty, pp = Object.getOwnPropertyDescriptor, ns = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? pp(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && fp(t, n, o), o;
};
let Di = class extends Te {
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
    if (!this._config || !this.hass) return _``;
    const e = this._config.zone, t = Fl(this.hass, e);
    if (t.deviceId === null)
      return _`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const n = this._config.compact === !0, i = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return _`
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
      ${n ? null : _`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const n = Wo(e, t), i = Pl({
      ...n,
      doing: null,
      now: Date.now(),
      formatTime: (o) => Uo(o, e)
    });
    return {
      zoneName: Bl(e, this._config, t),
      temperature: n.temperature,
      feelsLike: n.feelsLike,
      low: n.band.low,
      high: n.band.high,
      action: dr(n) ? n.action : "unknown",
      statusKind: i.kind,
      statusText: i.text,
      badges: Iu(n)
    };
  }
};
Di.styles = [
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
ns([
  P({ attribute: !1 })
], Di.prototype, "hass", 2);
ns([
  Z()
], Di.prototype, "_config", 2);
ns([
  Mi("comfort-band-modal")
], Di.prototype, "_modal", 2);
Di = ns([
  je("comfort-band-card")
], Di);
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
