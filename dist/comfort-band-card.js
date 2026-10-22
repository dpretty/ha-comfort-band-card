const go = globalThis, zr = go.ShadowRoot && (go.ShadyCSS === void 0 || go.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nr = Symbol(), Os = /* @__PURE__ */ new WeakMap();
let Bl = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Nr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (zr && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Os.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Os.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Or = (e) => new Bl(typeof e == "string" ? e : e + "", void 0, Nr), Ue = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Bl(i, e, Nr);
}, $c = (e, t) => {
  if (zr) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = go.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ls = zr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Or(i);
})(e) : e;
const { is: kc, defineProperty: Sc, getOwnPropertyDescriptor: Ac, getOwnPropertyNames: Ec, getOwnPropertySymbols: Cc, getPrototypeOf: Tc } = Object, So = globalThis, Hs = So.trustedTypes, Pc = Hs ? Hs.emptyScript : "", Dc = So.reactiveElementPolyfillSupport, In = (e, t) => e, _o = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Pc : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, Lr = (e, t) => !kc(e, t), Rs = { attribute: !0, type: String, converter: _o, reflect: !1, useDefault: !1, hasChanged: Lr };
Symbol.metadata ??= Symbol("metadata"), So.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let an = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Rs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Sc(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = Ac(this.prototype, t) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: o, set(l) {
      const h = o?.call(this);
      s?.call(this, l), this.requestUpdate(t, h, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Rs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(In("elementProperties"))) return;
    const t = Tc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(In("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(In("properties"))) {
      const i = this.properties, n = [...Ec(i), ...Cc(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(Ls(o));
    } else t !== void 0 && i.push(Ls(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $c(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : _o).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : _o;
      this._$Em = o;
      const h = l.fromAttribute(i, s.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Lr)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, l) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, l ?? i ?? this[t]), s !== !0 || l !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: l } = s, h = this[o];
        l !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, s, h);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
an.elementStyles = [], an.shadowRootOptions = { mode: "open" }, an[In("elementProperties")] = /* @__PURE__ */ new Map(), an[In("finalized")] = /* @__PURE__ */ new Map(), Dc?.({ ReactiveElement: an }), (So.reactiveElementVersions ??= []).push("2.1.2");
const Hr = globalThis, Fs = (e) => e, vo = Hr.trustedTypes, Is = vo ? vo.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jl = "$lit$", hi = `lit$${Math.random().toFixed(9).slice(2)}$`, Ul = "?" + hi, Mc = `<${Ul}>`, Li = document, Un = () => Li.createComment(""), Vn = (e) => e === null || typeof e != "object" && typeof e != "function", Rr = Array.isArray, zc = (e) => Rr(e) || typeof e?.[Symbol.iterator] == "function", sr = `[ 	
\f\r]`, zn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bs = /-->/g, js = />/g, Ci = RegExp(`>|${sr}(?:([^\\s"'>=/]+)(${sr}*=${sr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Us = /'/g, Vs = /"/g, Vl = /^(?:script|style|textarea|title)$/i, Wl = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), w = Wl(1), di = Wl(2), hn = Symbol.for("lit-noChange"), U = Symbol.for("lit-nothing"), Ws = /* @__PURE__ */ new WeakMap(), zi = Li.createTreeWalker(Li, 129);
function Gl(e, t) {
  if (!Rr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Is !== void 0 ? Is.createHTML(t) : t;
}
const Nc = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = zn;
  for (let h = 0; h < i; h++) {
    const d = e[h];
    let p, b, m = -1, _ = 0;
    for (; _ < d.length && (l.lastIndex = _, b = l.exec(d), b !== null); ) _ = l.lastIndex, l === zn ? b[1] === "!--" ? l = Bs : b[1] !== void 0 ? l = js : b[2] !== void 0 ? (Vl.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = Ci) : b[3] !== void 0 && (l = Ci) : l === Ci ? b[0] === ">" ? (l = o ?? zn, m = -1) : b[1] === void 0 ? m = -2 : (m = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Ci : b[3] === '"' ? Vs : Us) : l === Vs || l === Us ? l = Ci : l === Bs || l === js ? l = zn : (l = Ci, o = void 0);
    const k = l === Ci && e[h + 1].startsWith("/>") ? " " : "";
    s += l === zn ? d + Mc : m >= 0 ? (n.push(p), d.slice(0, m) + jl + d.slice(m) + hi + k) : d + hi + (m === -2 ? h : k);
  }
  return [Gl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Wn {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, d = this.parts, [p, b] = Nc(t, i);
    if (this.el = Wn.createElement(p, n), zi.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = zi.nextNode()) !== null && d.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(jl)) {
          const _ = b[l++], k = o.getAttribute(m).split(hi), E = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: s, name: E[2], strings: k, ctor: E[1] === "." ? Lc : E[1] === "?" ? Hc : E[1] === "@" ? Rc : Ao }), o.removeAttribute(m);
        } else m.startsWith(hi) && (d.push({ type: 6, index: s }), o.removeAttribute(m));
        if (Vl.test(o.tagName)) {
          const m = o.textContent.split(hi), _ = m.length - 1;
          if (_ > 0) {
            o.textContent = vo ? vo.emptyScript : "";
            for (let k = 0; k < _; k++) o.append(m[k], Un()), zi.nextNode(), d.push({ type: 2, index: ++s });
            o.append(m[_], Un());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ul) d.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(hi, m + 1)) !== -1; ) d.push({ type: 7, index: s }), m += hi.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Li.createElement("template");
    return n.innerHTML = t, n;
  }
}
function dn(e, t, i = e, n) {
  if (t === hn) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Vn(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = dn(e, o._$AS(e, t.values), o, n)), t;
}
class Oc {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Li).importNode(i, !0);
    zi.currentNode = o;
    let s = zi.nextNode(), l = 0, h = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let p;
        d.type === 2 ? p = new Zn(s, s.nextSibling, this, t) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (p = new Fc(s, this, t)), this._$AV.push(p), d = n[++h];
      }
      l !== d?.index && (s = zi.nextNode(), l++);
    }
    return zi.currentNode = Li, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Zn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = U, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = dn(this, t, i), Vn(t) ? t === U || t == null || t === "" ? (this._$AH !== U && this._$AR(), this._$AH = U) : t !== this._$AH && t !== hn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : zc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== U && Vn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Li.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Wn.createElement(Gl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new Oc(o, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Ws.get(t.strings);
    return i === void 0 && Ws.set(t.strings, i = new Wn(t)), i;
  }
  k(t) {
    Rr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new Zn(this.O(Un()), this.O(Un()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Fs(t).nextSibling;
      Fs(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ao {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = U, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = U;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = dn(this, t, i, 0), l = !Vn(t) || t !== this._$AH && t !== hn, l && (this._$AH = t);
    else {
      const h = t;
      let d, p;
      for (t = s[0], d = 0; d < s.length - 1; d++) p = dn(this, h[n + d], i, d), p === hn && (p = this._$AH[d]), l ||= !Vn(p) || p !== this._$AH[d], p === U ? t = U : t !== U && (t += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !o && this.j(t);
  }
  j(t) {
    t === U ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Lc extends Ao {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === U ? void 0 : t;
  }
}
class Hc extends Ao {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== U);
  }
}
class Rc extends Ao {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = dn(this, t, i, 0) ?? U) === hn) return;
    const n = this._$AH, o = t === U && n !== U || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== U && (n === U || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dn(this, t);
  }
}
const Ic = Hr.litHtmlPolyfillSupport;
Ic?.(Wn, Zn), (Hr.litHtmlVersions ??= []).push("3.3.2");
const Bc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Zn(t.insertBefore(Un(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const Fr = globalThis;
class ze extends an {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return hn;
  }
}
ze._$litElement$ = !0, ze.finalized = !0, Fr.litElementHydrateSupport?.({ LitElement: ze });
const jc = Fr.litElementPolyfillSupport;
jc?.({ LitElement: ze });
(Fr.litElementVersions ??= []).push("4.2.2");
const Qe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Uc = { attribute: !0, type: String, converter: _o, reflect: !1, hasChanged: Lr }, Vc = (e = Uc, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: l } = i;
    return { set(h) {
      const d = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(l, d, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(l, void 0, e, h), h;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(h) {
      const d = this[l];
      t.call(this, h), this.requestUpdate(l, d, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function R(e) {
  return (t, i) => typeof i == "object" ? Vc(e, t, i) : ((n, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function ne(e) {
  return R({ ...e, state: !0, attribute: !1 });
}
const Wc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function _n(e, t) {
  return (i, n, o) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Wc(i, n, { get() {
      return s(this);
    } });
  };
}
const Xe = Ue`
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
function Kl(e) {
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
function Gc(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
var Kc = Object.defineProperty, qc = Object.getOwnPropertyDescriptor, vn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? qc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Kc(t, i, o), o;
};
const vr = 15, ql = 28, Yc = ql - vr;
function lr(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(vr, Math.min(ql, e)) - vr) / Yc * 100;
}
let fi = class extends ze {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.action = "unknown";
  }
  render() {
    const e = Gc(this.action), t = Kl(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), o = Number.isFinite(this.room), s = i ? lr(this.low) : 0, l = n ? lr(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = o ? lr(this.room) : 50, b = (k) => Number.isFinite(k) ? `${k.toFixed(1)}°` : "—", m = e === "heating" || e === "cooling" ? `, ${e}` : "", _ = `Comfortable range ${b(this.low)} to ${b(this.high)}, ${this.roomLabel} ${b(this.room)}${m}`;
    return w`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${_}>
        ${di`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? di`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${o ? di`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${o ? di`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
fi.styles = [
  Xe,
  Ue`
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
vn([
  R({ type: Number })
], fi.prototype, "low", 2);
vn([
  R({ type: Number })
], fi.prototype, "high", 2);
vn([
  R({ type: Number })
], fi.prototype, "room", 2);
vn([
  R({ type: String })
], fi.prototype, "roomLabel", 2);
vn([
  R({ type: String })
], fi.prototype, "action", 2);
fi = vn([
  Qe("band-gauge")
], fi);
const Zc = 0.5, Jc = 10, Qc = 35;
function Gn(e) {
  return `${yo(e.low)}–${yo(e.high)}°`;
}
function yo(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function lo(e, t) {
  let i = t * Zc;
  return i > 0 && (i = Math.max(0, Math.min(i, Qc - e.high))), i < 0 && (i = Math.min(0, Math.max(i, Jc - e.low))), { low: Gs(e.low + i), high: Gs(e.high + i) };
}
function Gs(e) {
  return Math.round(e * 10) / 10;
}
function Yl(e) {
  const { room: t, apparent: i, useApparent: n } = e, o = Number.isFinite(t) && Number.isFinite(i) && yr(i) !== yr(t);
  return n && Number.isFinite(i) ? {
    value: i,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${i.toFixed(1)}°` : "" };
}
function yr(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function Zl(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const i = yr(e);
  return i < Math.round(t.low * 10) ? "below" : i > Math.round(t.high * 10) ? "above" : "in";
}
const Xc = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function Jl(e) {
  if (e.doing) return { kind: "adjusting", text: e.doing };
  if (!e.enabled) return { kind: "paused", text: "Paused: not controlling this room" };
  if (e.sensor === "offline")
    return { kind: "sensor", text: "On hold: the room sensor is offline" };
  if (e.sensor === "no-reading")
    return { kind: "sensor", text: "On hold: no room temperature reading" };
  const t = eu(e);
  return e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${t.text}` } : t;
}
function eu(e) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const t = Zl(e.temperature, e.band), i = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? t === "in" ? "comfortable" : t ?? "idle" : "none", n = Xc[i];
  let o;
  if (e.overrideActive) {
    const l = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    o = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${Gn(e.band)}${l}`;
  } else {
    const l = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    o = `${Gn(e.band)}${l}`;
  }
  const s = n ? `${n} · ${o}` : o.charAt(0).toUpperCase() + o.slice(1);
  return { kind: i, text: s };
}
function Ir(e, t) {
  const i = new Date(e), n = t?.locale?.time_format, o = t?.locale?.language;
  let s;
  if (n === "12") s = !0;
  else if (n === "24") s = !1;
  else {
    const h = new Intl.DateTimeFormat(n === "system" ? void 0 : o, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    s = h === "h11" || h === "h12";
  }
  const l = {
    hourCycle: s ? "h12" : "h23",
    hour: s ? "numeric" : "2-digit"
  };
  return (!s || i.getMinutes() !== 0) && (l.minute = "2-digit"), new Intl.DateTimeFormat(o, l).format(i);
}
function Ks(e, t) {
  const i = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!i) return e;
  const n = Number(i[1]), o = Number(i[2]);
  return n > 23 || o > 59 ? e : Ir(new Date(2e3, 0, 1, n, o).getTime(), t);
}
function Yt(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function ao(e, t) {
  const i = Yt(e, t);
  if (!i) return NaN;
  const n = parseFloat(i.state);
  return Number.isFinite(n) ? n : NaN;
}
function Ql(e, t) {
  const i = Yt(e, t.nextBandChange);
  if (!i) return { scheduled: null, nextChange: null };
  const n = i.attributes.scheduled, o = Date.parse(i.state);
  return {
    scheduled: typeof n == "boolean" ? n : null,
    nextChange: Number.isNaN(o) ? null : o
  };
}
function Xl(e, t) {
  const i = ao(e, t.roomTemperature), n = ao(e, t.apparentTemperature), o = Yt(e, t.useApparentTemperature)?.state === "on", s = Date.parse(Yt(e, t.overrideEnds)?.state ?? ""), l = Yt(e, t.roomTemperature)?.attributes.source, h = l === "climate" || l === "fallback_sensor" ? l : null, d = Yt(e, t.roomSensorUnavailable)?.state === "on" || h !== null, p = Number.isFinite(i) || Number.isFinite(n);
  return {
    enabled: Yt(e, t.enabled)?.state !== "off",
    action: Yt(e, t.currentAction)?.state ?? "unknown",
    room: i,
    apparent: n,
    useApparent: o,
    temperature: Yl({ room: i, apparent: n, useApparent: o }).value,
    feelsLike: o && Number.isFinite(n),
    band: {
      low: ao(e, t.effectiveLow),
      high: ao(e, t.effectiveHigh)
    },
    overrideActive: Yt(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...Ql(e, t),
    sensor: d ? p ? "stand-in" : "offline" : p ? "ok" : "no-reading",
    standIn: h
  };
}
function Br(e) {
  return e.enabled && (e.sensor === "ok" || e.sensor === "stand-in");
}
const ci = {
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
}, tu = {
  paused: ci.paused,
  sensor: ci.sensor,
  heating: ci.heating,
  cooling: ci.cooling,
  below: ci.below,
  above: ci.above,
  adjusted: "mdi:timer-outline"
};
function iu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !Br(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const i = Zl(e.temperature, e.band);
    (i === "below" || i === "above") && t.push(i);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function nu(e) {
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
var ou = Object.defineProperty, ru = Object.getOwnPropertyDescriptor, xt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ru(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && ou(t, i, o), o;
};
let nt = class extends ze {
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
    return this.variant === "mini" ? this._renderMini() : w`
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
          <div class="reading">
            <div class="room-temp">${this._renderTemperature()}</div>
            <div
              class="feels ${this.feelsLike ? "" : "placeholder"}"
              aria-hidden=${this.feelsLike ? U : "true"}
            >
              feels like
            </div>
          </div>
          <!-- Named from what it shows, in order; the status sentence gives
               the range, so the gauge's own label would only repeat it. -->
          <div class="gauge-wrap" aria-hidden="true">
            <band-gauge
              .low=${this.low}
              .high=${this.high}
              .room=${this.temperature}
              .roomLabel=${this.feelsLike ? "feels like" : "room"}
              .action=${this.action}
            ></band-gauge>
          </div>
        </div>
        ${this.statusText ? w`<div class="status ${this.statusKind}">
              <ha-icon icon=${ci[this.statusKind]} aria-hidden="true"></ha-icon>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${Kl(e)}` : "", i = this._label();
    return w`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${e ? "tinted" : ""}"
        style=${t}
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        aria-label=${i}
        title=${i}
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        ${this.badges.map(
      (n) => w`<ha-icon
              icon=${tu[n]}
              data-badge=${n}
              aria-hidden="true"
            ></ha-icon>`
    )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
};
nt.styles = [
  Xe,
  Ue`
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
      .reading {
        min-width: 70px;
      }
      .room-temp {
        font-size: 32px;
        font-weight: 300;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }
      /* Under the temperature, not beside it: beside, it took the gauge's
         width on a narrow tile. Every tile keeps the line, so tiles with and
         without it line up. */
      .feels {
        font-size: 11px;
        line-height: 14px;
        white-space: nowrap;
        color: var(--cb-text-secondary);
      }
      .feels.placeholder {
        visibility: hidden;
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
xt([
  R({ type: String })
], nt.prototype, "zoneName", 2);
xt([
  R({ type: Number })
], nt.prototype, "temperature", 2);
xt([
  R({ type: Boolean })
], nt.prototype, "feelsLike", 2);
xt([
  R({ type: Number })
], nt.prototype, "low", 2);
xt([
  R({ type: Number })
], nt.prototype, "high", 2);
xt([
  R({ type: String })
], nt.prototype, "action", 2);
xt([
  R({ type: String })
], nt.prototype, "statusKind", 2);
xt([
  R({ type: String })
], nt.prototype, "statusText", 2);
xt([
  R({ attribute: !1 })
], nt.prototype, "badges", 2);
xt([
  R({ type: Boolean })
], nt.prototype, "noExpand", 2);
xt([
  R({ type: String, reflect: !0 })
], nt.prototype, "variant", 2);
nt = xt([
  Qe("comfort-band-tile")
], nt);
var su = Object.defineProperty, lu = Object.getOwnPropertyDescriptor, Xt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? lu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && su(t, i, o), o;
};
let Dt = class extends ze {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (e, t) => {
      e.preventDefault();
      const i = e.currentTarget;
      i.setPointerCapture(e.pointerId), this._dragging = t;
      const n = (s) => {
        this._setHandle(t, this._xToValue(s.clientX)) && this._fire("input");
      }, o = (s) => {
        i.releasePointerCapture(s.pointerId), i.removeEventListener("pointermove", n), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o), this._dragging = null, this._fire("change");
      };
      i.addEventListener("pointermove", n), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
    }, this._onTrackPointerDown = (e) => {
      if (e.target.classList.contains("thumb")) return;
      const t = this._xToValue(e.clientX), i = (this.low + this.high) / 2, n = t < i ? "low" : "high";
      this._setHandle(n, t) && this._fire("change");
    }, this._onKeyDown = (e, t) => {
      let i = 0;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          i = -this.step;
          break;
        case "ArrowRight":
        case "ArrowUp":
          i = this.step;
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
      const n = t === "low" ? this.low : this.high;
      this._setHandle(t, n + i) && this._fire("change");
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
    const i = this._snap(t);
    if (e === "low") {
      const n = Math.min(i, this.high - this.step);
      if (n === this.low) return !1;
      this.low = n;
    } else {
      const n = Math.max(i, this.low + this.step);
      if (n === this.high) return !1;
      this.high = n;
    }
    return !0;
  }
  _xToValue(e) {
    const t = this._track?.getBoundingClientRect();
    if (!t || t.width === 0) return this.min;
    const i = Math.max(0, Math.min(1, (e - t.left) / t.width));
    return this.min + i * (this.max - this.min);
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
    return w`
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
          @pointerdown=${(i) => this._onThumbPointerDown(i, "low")}
          @keydown=${(i) => this._onKeyDown(i, "low")}
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
          @pointerdown=${(i) => this._onThumbPointerDown(i, "high")}
          @keydown=${(i) => this._onKeyDown(i, "high")}
        ></div>
      </div>
      <div class="readout" aria-hidden="true">${this._fmt(this.low)} – ${this._fmt(this.high)}</div>
    `;
  }
};
Dt.styles = [
  Xe,
  Ue`
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
Xt([
  R({ type: Number })
], Dt.prototype, "min", 2);
Xt([
  R({ type: Number })
], Dt.prototype, "max", 2);
Xt([
  R({ type: Number })
], Dt.prototype, "step", 2);
Xt([
  R({ type: Number })
], Dt.prototype, "low", 2);
Xt([
  R({ type: Number })
], Dt.prototype, "high", 2);
Xt([
  R({ type: String })
], Dt.prototype, "unit", 2);
Xt([
  ne()
], Dt.prototype, "_dragging", 2);
Xt([
  _n(".track")
], Dt.prototype, "_track", 2);
Dt = Xt([
  Qe("dual-handle-slider")
], Dt);
const ei = "comfort_band";
function au(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function cu(e, t) {
  return e.callService(ei, "set_schedule", { ...t });
}
function uu(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(ei, "start_override", i);
}
function hu(e, t) {
  return e.callService(ei, "cancel_override", { ...t });
}
function du(e, t) {
  return e.callService(ei, "set_profile", { ...t });
}
function fu(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(ei, "create_profile", i);
}
function pu(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(ei, "clone_profile", i);
}
function mu(e, t) {
  return e.callService(ei, "rename_profile", { old: t.old, new: t.new });
}
function gu(e, t) {
  return e.callService(ei, "delete_profile", { name: t.name });
}
function bu(e, t) {
  return e.callService(ei, "record_feedback", { zone: t.zone, label: t.label });
}
var _u = Object.defineProperty, vu = Object.getOwnPropertyDescriptor, Wt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? vu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && _u(t, i, o), o;
};
const yu = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], wu = 1500, xu = 16, $u = 26, wr = 0.5, ku = 1500, Su = 3;
let wt = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._feedbackConfirmed = null, this._feedbackTimer = null, this._heldRange = null, this._feedbackSeq = 0, this._length = null, this._burst = null, this._burstTimer = null, this._busy = null, this._busySeq = 0, this._chain = Promise.resolve(), this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const o = this._bandInForce();
        if (!o) return;
        t = { base: o, steps: 0, picked: !1 };
      }
      const i = lo(t.base, t.steps), n = lo(t.base, t.steps + e);
      n.low === i.low && n.high === i.high || (this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), ku));
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
      const i = this._schedule().scheduled === !0 ? "Going back to the schedule" : "Ending the adjustment";
      this._run(i, () => hu(e, { zone: t }));
    }, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      this._pendingLow = null, this._pendingHigh = null, this._dropBurst(), this._sendBand({ low: e.detail.low, high: e.detail.high }, this._hours());
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await bu(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, wu));
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
    const i = parseFloat(t.state);
    return Number.isFinite(i) ? i : NaN;
  }
  /** The band in force, to the 0.1° shown, or null when it can't be read. */
  _bandInForce() {
    const e = this._numericState(this.entities?.effectiveLow ?? null), t = this._numericState(this.entities?.effectiveHigh ?? null);
    return !Number.isFinite(e) || !Number.isFinite(t) ? null : { low: Math.round(e * 10) / 10, high: Math.round(t * 10) / 10 };
  }
  _schedule() {
    return !this.hass || !this.entities ? { scheduled: null, nextChange: null } : Ql(this.hass, this.entities);
  }
  /** The length in force: the one picked here, else three hours. */
  _hours() {
    return this._length ?? Su;
  }
  /** Runs a call after the ones before it from this tab, saying what it's
   *  doing meanwhile. A failed call is reported by HA's own toast. */
  async _run(e, t) {
    const i = ++this._busySeq;
    this._busy = e;
    const n = this._chain.then(t);
    this._chain = n.catch(() => {
    });
    try {
      await n;
    } catch {
    } finally {
      i === this._busySeq && (this._busy = null);
    }
  }
  _sendBand(e, t) {
    if (!this.hass || !this.zone) return;
    const i = this.hass, n = this.zone;
    this._run(
      `Adjusting to ${Gn(e)}`,
      () => uu(i, { zone: n, low: e.low, high: e.high, hours: t })
    );
  }
  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    this._burst = null, e && (e.steps !== 0 ? this._sendBand(lo(e.base, e.steps), this._hours()) : e.picked && this._retime(this._hours()));
  }
  _dropBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null, this._burst = null;
  }
  /** Gives a running adjustment a new length, keeping its band: the
   *  integration keeps an adjustment's band in the manual values. */
  _retime(e) {
    if (this._stateOf(this.entities?.overrideActive ?? null)?.state !== "on") return;
    const t = this._numericState(this.entities?.manualLow ?? null), i = this._numericState(this.entities?.manualHigh ?? null);
    !Number.isFinite(t) || !Number.isFinite(i) || this._sendBand({ low: t, high: i }, e);
  }
  render() {
    if (!this.hass || !this.entities) return U;
    const e = Date.now(), t = Xl(this.hass, this.entities), { room: i, apparent: n, useApparent: o, feelsLike: s, overrideActive: l, scheduled: h } = t, { low: d, high: p } = t.band, b = Yl({ room: i, apparent: n, useApparent: o }), m = nu(t), _ = this._burst, k = _ && _.steps !== 0 ? `Adjusting to ${Gn(lo(_.base, _.steps))}` : this._busy, E = Jl({
      ...t,
      doing: k,
      now: e,
      formatTime: (z) => Ir(z, this.hass)
    });
    return w`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(b.value) ? `${b.value.toFixed(1)}°` : "—"}</span
        >
        ${b.note ? w`<span class="note">${b.note}</span>` : U}
      </div>
      ${o && !Number.isFinite(n) && Number.isFinite(i) ? w`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : U}
      <div class="gauge-row">
        <band-gauge
          .low=${d}
          .high=${p}
          .room=${b.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${Br(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${E.kind}" role="status" aria-live="polite">
        <ha-icon icon=${ci[E.kind]} aria-hidden="true"></ha-icon>
        <span>${E.text}</span>
      </div>
      ${m ? w`<div class="notice">${m}</div>` : U}
      ${this._renderAdjust(l, h)} ${this._renderFeedbackSection()}
      ${this._renderExactRange(d, p)}
    `;
  }
  _renderAdjust(e, t) {
    const i = this._busy !== null ? "true" : "false", n = this._hours();
    return w`
      <section class="adjust">
        ${t === !1 ? U : w`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${[1, 3].map(
      (s) => w`<button
                      aria-pressed=${n === s ? "true" : "false"}
                      aria-disabled=${i}
                      data-length=${s}
                      @click=${() => this._onPickLength(s)}
                    >
                      ${s} h
                    </button>`
    )}
              </div>`}
        ${this._bandInForce() !== null ? w`<div class="steps">
              <button class="cooler" aria-disabled=${i} @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" aria-disabled=${i} @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>` : U}
        ${e && t !== !1 ? w`<button class="back" aria-disabled=${i} @click=${this._onBackToSchedule}>
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>` : U}
      </section>
    `;
  }
  _renderFeedbackSection() {
    return w`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${yu.map(
      (e) => w`
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
  _renderExactRange(e, t) {
    const i = this._numericState(this.entities.manualLow), n = this._numericState(this.entities.manualHigh), o = Au(e, t, i, n), s = this._pendingLow ?? o.low, l = this._pendingHigh ?? o.high, h = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(xu, Math.floor(o.low)),
      max: Math.max($u, Math.ceil(o.high))
    };
    return this._heldRange = h, w`
      <details class="exact-range">
        <summary>Set an exact range</summary>
        <dual-handle-slider
          .min=${h.min}
          .max=${h.max}
          .step=${wr}
          .low=${s}
          .high=${l}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </details>
    `;
  }
};
wt.styles = [
  Xe,
  Ue`
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
      button:focus-visible,
      summary:focus-visible {
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
      details {
        margin-top: var(--cb-gap-lg);
      }
      summary {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 500;
        color: var(--cb-text-secondary);
        cursor: pointer;
        /* WCAG 2.5.5: 44px touch target. */
        min-height: 44px;
      }
    `
];
Wt([
  R({ attribute: !1 })
], wt.prototype, "hass", 2);
Wt([
  R({ type: String })
], wt.prototype, "zone", 2);
Wt([
  R({ attribute: !1 })
], wt.prototype, "entities", 2);
Wt([
  ne()
], wt.prototype, "_pendingLow", 2);
Wt([
  ne()
], wt.prototype, "_pendingHigh", 2);
Wt([
  ne()
], wt.prototype, "_feedbackConfirmed", 2);
Wt([
  ne()
], wt.prototype, "_length", 2);
Wt([
  ne()
], wt.prototype, "_burst", 2);
Wt([
  ne()
], wt.prototype, "_busy", 2);
wt = Wt([
  Qe("comfort-band-now-tab")
], wt);
function Au(e, t, i, n) {
  let o = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, s = t) : Number.isFinite(i) && Number.isFinite(n) && (o = i, s = n), o = Math.round(o * 10) / 10, s = Math.round(s * 10) / 10, s - o < wr && (s = o + wr), { low: o, high: s };
}
var Eu = Object.defineProperty, Cu = Object.getOwnPropertyDescriptor, ti = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Cu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Eu(t, i, o), o;
};
let Mt = class extends ze {
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
      (i) => i === e && !(this.mode === "rename" && i === this.existingName)
    ) ? (this._error = `Profile ${e} already exists.`, !1) : (this._error = null, !0) : (this._error = "Name cannot be empty.", !1);
  }
  _heading() {
    return this.mode === "create" ? "New profile" : this.mode === "clone" ? "Clone profile" : "Rename profile";
  }
  render() {
    return w`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? w`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? w`<label>
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
      ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : null}
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
  Xe,
  Ue`
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
ti([
  R({ type: String })
], Mt.prototype, "mode", 2);
ti([
  R({ type: String })
], Mt.prototype, "existingName", 2);
ti([
  R({ type: Array })
], Mt.prototype, "existingNames", 2);
ti([
  R({ type: Boolean })
], Mt.prototype, "busy", 2);
ti([
  ne()
], Mt.prototype, "_name", 2);
ti([
  ne()
], Mt.prototype, "_description", 2);
ti([
  ne()
], Mt.prototype, "_error", 2);
ti([
  _n('input[name="name"]')
], Mt.prototype, "_nameInput", 2);
Mt = ti([
  Qe("profile-edit-dialog")
], Mt);
const jr = "comfort_band", Tu = {
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
  use_apparent_temperature: "useApparentTemperature"
};
function Pu() {
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
    deviceId: null,
    deviceName: null
  };
}
function ea(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, o] of i.identifiers)
      if (n === t[0] && o === t[1])
        return i;
  return null;
}
function ta(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === jr
  );
}
function ia(e, t) {
  const i = Pu(), n = ea(e, [jr, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const o of ta(e, n.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Tu[s];
    l !== void 0 && (i[l] = o.entity_id);
  }
  return i;
}
function na(e) {
  const t = ea(e, [jr, "profile_manager"]);
  if (t === null) return null;
  for (const i of ta(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function oa(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function ra(e, t, i) {
  const n = t.name?.trim();
  if (n) return n;
  const o = i.deviceId !== null ? e.devices[i.deviceId]?.area_id : null, s = o ? e.areas?.[o]?.name?.trim() : void 0;
  return s || (i.deviceName ?? t.zone);
}
var Du = Object.defineProperty, Mu = Object.getOwnPropertyDescriptor, Ri = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Mu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Du(t, i, o), o;
};
let Qt = class extends ze {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._busy = !1, this._menuOpenedByKeyboard = !1, this._dialogTrigger = null, this._onDocumentClick = (e) => {
      if (this._openMenu === null) return;
      e.composedPath().some(
        (n) => n instanceof HTMLElement && (n.classList?.contains("menu") || n.classList?.contains("overflow"))
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._busy || (this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog());
    }, this._onDialogSave = async (e) => {
      if (!this.hass || this._busy) return;
      const { name: t, description: i } = e.detail, n = this._mode, o = this._target;
      this._busy = !0, this._error = null;
      try {
        if (n === "create")
          await fu(this.hass, { name: t, description: i });
        else if (n === "clone" && o)
          await pu(this.hass, { source: o, target: t, description: i });
        else if (n === "rename" && o)
          t !== o && await mu(this.hass, { old: o, new: t });
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
        await gu(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = na(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!t) return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", d = t.attributes.descriptions, p = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [b, m] of Object.entries(d))
        typeof m == "string" && (p[b] = m);
    return { options: n, active: o, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(e) {
    this.hass && du(this.hass, { profile: e });
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
        const l = this.shadowRoot?.querySelectorAll("li[data-profile]");
        (l ? Array.from(l).find((d) => d.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
      });
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault(), e.stopPropagation();
    const i = Array.from(
      e.currentTarget.querySelectorAll(
        'button[role="menuitem"]:not([disabled])'
      )
    );
    if (i.length === 0) return;
    const n = this.shadowRoot?.activeElement, o = n ? i.indexOf(n) : -1;
    (e.key === "ArrowDown" ? i[(o + 1) % i.length] : i[(o - 1 + i.length) % i.length]).focus();
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
      (t ? Array.from(t).find((n) => n.dataset.profile === e) : void 0)?.querySelector(".overflow")?.focus();
    });
  }
  render() {
    if (!this.hass) return U;
    const e = this._readState();
    if (e === null)
      return w`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: o, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return w`
        ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : null}
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
      const l = this._target === i;
      return w`
        <div
          class="confirm-delete"
          @keydown=${(h) => {
        h.key === "Escape" && !this._busy && (h.preventDefault(), this._onDialogCancel());
      }}
          tabindex="-1"
        >
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${" "}
            ${l ? w`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? w`<div class="empty">No profiles configured.</div>` : w`
      ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? w`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : U}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, o, s)
    )}
      </ul>
      ${s ? U : w`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, o, s) {
    const l = e === i, h = e === n, d = o[e] ?? "", p = `cb-profile-menu-${t}`;
    return w`
      <li
        data-profile=${e}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : U}
        @click=${() => this._onSelect(e)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? w`<span class="description">${d}</span>` : U}
        </span>
        ${l ? w`<span class="badge">Active</span>` : U}
        ${s ? w`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? p : U}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(b) => this._toggleMenu(e, b)}
            >
              ⋮
            </button>` : U}
        ${this._openMenu === e ? w`
              <div
                id=${p}
                class="menu"
                role="menu"
                @click=${(b) => b.stopPropagation()}
                @keydown=${(b) => this._onMenuKeydown(b, e)}
              >
                <button
                  role="menuitem"
                  @click=${(b) => {
      b.stopPropagation(), this._onClone(e);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(b) => {
      b.stopPropagation(), this._onRename(e);
    }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${h}
                  aria-disabled=${h}
                  @click=${(b) => {
      b.stopPropagation(), h || this._onDelete(e);
    }}
                  title=${h ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : U}
      </li>
    `;
  }
};
Qt.styles = [
  Xe,
  Ue`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .empty {
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
        padding: var(--cb-gap-lg);
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
Ri([
  R({ attribute: !1 })
], Qt.prototype, "hass", 2);
Ri([
  ne()
], Qt.prototype, "_mode", 2);
Ri([
  ne()
], Qt.prototype, "_target", 2);
Ri([
  ne()
], Qt.prototype, "_openMenu", 2);
Ri([
  ne()
], Qt.prototype, "_error", 2);
Ri([
  ne()
], Qt.prototype, "_busy", 2);
Qt = Ri([
  Qe("comfort-band-profiles-tab")
], Qt);
const zu = !0, Ne = "u-", Nu = "uplot", Ou = Ne + "hz", Lu = Ne + "vt", Hu = Ne + "title", Ru = Ne + "wrap", Fu = Ne + "under", Iu = Ne + "over", Bu = Ne + "axis", Mi = Ne + "off", ju = Ne + "select", Uu = Ne + "cursor-x", Vu = Ne + "cursor-y", Wu = Ne + "cursor-pt", Gu = Ne + "legend", Ku = Ne + "live", qu = Ne + "inline", Yu = Ne + "series", Zu = Ne + "marker", qs = Ne + "label", Ju = Ne + "value", Hn = "width", Rn = "height", Nn = "top", Ys = "bottom", sn = "left", ar = "right", Ur = "#000", Zs = Ur + "0", cr = "mousemove", Js = "mousedown", ur = "mouseup", Qs = "mouseenter", Xs = "mouseleave", el = "dblclick", Qu = "resize", Xu = "scroll", tl = "change", wo = "dppxchange", Vr = "--", yn = typeof window < "u", xr = yn ? document : null, un = yn ? window : null, eh = yn ? navigator : null;
let ce, co;
function $r() {
  let e = devicePixelRatio;
  ce != e && (ce = e, co && Sr(tl, co, $r), co = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Oi(tl, co, $r), un.dispatchEvent(new CustomEvent(wo)));
}
function ct(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function kr(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function ye(e, t, i) {
  e.style[t] = i + "px";
}
function Ct(e, t, i, n) {
  let o = xr.createElement(e);
  return t != null && ct(o, t), i?.insertBefore(o, n), o;
}
function vt(e, t) {
  return Ct("div", e, t);
}
const il = /* @__PURE__ */ new WeakMap();
function jt(e, t, i, n, o) {
  let s = "translate(" + t + "px," + i + "px)", l = il.get(e);
  s != l && (e.style.transform = s, il.set(e, s), t < 0 || i < 0 || t > n || i > o ? ct(e, Mi) : kr(e, Mi));
}
const nl = /* @__PURE__ */ new WeakMap();
function ol(e, t, i) {
  let n = t + i, o = nl.get(e);
  n != o && (nl.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const rl = /* @__PURE__ */ new WeakMap();
function sl(e, t, i, n) {
  let o = t + "" + i, s = rl.get(e);
  o != s && (rl.set(e, o), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Wr = { passive: !0 }, th = { ...Wr, capture: !0 };
function Oi(e, t, i, n) {
  t.addEventListener(e, i, n ? th : Wr);
}
function Sr(e, t, i, n) {
  t.removeEventListener(e, i, Wr);
}
yn && $r();
function Tt(e, t, i, n) {
  let o;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    o = s ? i + n >> 1 : ut((i + n) / 2), t[o] < e ? i = o : n = o;
  return e - t[i] <= t[n] - e ? i : n;
}
function sa(e) {
  return (i, n, o) => {
    let s = -1, l = -1;
    for (let h = n; h <= o; h++)
      if (e(i[h])) {
        s = h;
        break;
      }
    for (let h = o; h >= n; h--)
      if (e(i[h])) {
        l = h;
        break;
      }
    return [s, l];
  };
}
const la = (e) => e != null, aa = (e) => e != null && e > 0, Eo = sa(la), ih = sa(aa);
function nh(e, t, i, n = 0, o = !1) {
  let s = o ? ih : Eo, l = o ? aa : la;
  [t, i] = s(e, t, i);
  let h = e[t], d = e[t];
  if (t > -1)
    if (n == 1)
      h = e[t], d = e[i];
    else if (n == -1)
      h = e[i], d = e[t];
    else
      for (let p = t; p <= i; p++) {
        let b = e[p];
        l(b) && (b < h ? h = b : b > d && (d = b));
      }
  return [h ?? pe, d ?? -pe];
}
function Co(e, t, i, n) {
  let o = cl(e), s = cl(t);
  e == t && (o == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Zt : ca, h = o == 1 ? ut : yt, d = s == 1 ? yt : ut, p = h(l(Me(e))), b = d(l(Me(t))), m = fn(i, p), _ = fn(i, b);
  return i == 10 && (p < 0 && (m = me(m, -p)), b < 0 && (_ = me(_, -b))), n || i == 2 ? (e = m * o, t = _ * s) : (e = fa(e, m), t = To(t, _)), [e, t];
}
function Gr(e, t, i, n) {
  let o = Co(e, t, i, n);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const Kr = 0.1, ll = {
  mode: 3,
  pad: Kr
}, Bn = {
  pad: 0,
  soft: null,
  mode: 0
}, oh = {
  min: Bn,
  max: Bn
};
function xo(e, t, i, n) {
  return Po(i) ? al(e, t, i) : (Bn.pad = i, Bn.soft = n ? 0 : null, Bn.mode = n ? 3 : 0, al(e, t, oh));
}
function le(e, t) {
  return e ?? t;
}
function rh(e, t, i) {
  for (t = le(t, 0), i = le(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function al(e, t, i) {
  let n = i.min, o = i.max, s = le(n.pad, 0), l = le(o.pad, 0), h = le(n.hard, -pe), d = le(o.hard, pe), p = le(n.soft, pe), b = le(o.soft, -pe), m = le(n.mode, 0), _ = le(o.mode, 0), k = t - e, E = Zt(k), z = Je(Me(e), Me(t)), B = Zt(z), V = Me(B - E);
  (k < 1e-24 || V > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, m == 2 && p != pe && (s = 0), _ == 2 && b != -pe && (l = 0)));
  let $ = k || z || 1e3, I = Zt($), S = fn(10, ut(I)), J = $ * (k == 0 ? e == 0 ? 0.1 : 1 : s), M = me(fa(e - J, S / 10), 24), Q = e >= p && (m == 1 || m == 3 && M <= p || m == 2 && M >= p) ? p : pe, q = Je(h, M < Q && e >= Q ? Q : Pt(Q, M)), te = $ * (k == 0 ? t == 0 ? 0.1 : 1 : l), K = me(To(t + te, S / 10), 24), A = t <= b && (_ == 1 || _ == 3 && K >= b || _ == 2 && K <= b) ? b : -pe, Z = Pt(d, K > A && t <= A ? A : Je(A, K));
  return q == Z && q == 0 && (Z = 100), [q, Z];
}
const sh = new Intl.NumberFormat(yn ? eh.language : "en-US"), qr = (e) => sh.format(e), dt = Math, bo = dt.PI, Me = dt.abs, ut = dt.floor, De = dt.round, yt = dt.ceil, Pt = dt.min, Je = dt.max, fn = dt.pow, cl = dt.sign, Zt = dt.log10, ca = dt.log2, lh = (e, t = 1) => dt.sinh(e) * t, hr = (e, t = 1) => dt.asinh(e / t), pe = 1 / 0;
function ul(e) {
  return (Zt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function Ar(e, t, i) {
  return Pt(Je(e, t), i);
}
function ua(e) {
  return typeof e == "function";
}
function ie(e) {
  return ua(e) ? e : () => e;
}
const ah = () => {
}, ha = (e) => e, da = (e, t) => t, ch = (e) => null, hl = (e) => !0, dl = (e, t) => e == t, uh = /\.\d*?(?=9{6,}|0{6,})/gm, Hi = (e) => {
  if (ma(e) || pi.has(e))
    return e;
  const t = `${e}`, i = t.match(uh);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Hi(o)}e${s}`;
  }
  return me(e, n);
};
function Pi(e, t) {
  return Hi(me(Hi(e / t)) * t);
}
function To(e, t) {
  return Hi(yt(Hi(e / t)) * t);
}
function fa(e, t) {
  return Hi(ut(Hi(e / t)) * t);
}
function me(e, t = 0) {
  if (ma(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return De(n) / i;
}
const pi = /* @__PURE__ */ new Map();
function pa(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Kn(e, t, i, n) {
  let o = [], s = n.map(pa);
  for (let l = t; l < i; l++) {
    let h = Me(l), d = me(fn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * d, m = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : me(b, m);
      o.push(_), pi.set(_, m);
    }
  }
  return o;
}
const jn = {}, Yr = [], pn = [null, null], ui = Array.isArray, ma = Number.isInteger, hh = (e) => e === void 0;
function fl(e) {
  return typeof e == "string";
}
function Po(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function dh(e) {
  return e != null && typeof e == "object";
}
const fh = Object.getPrototypeOf(Uint8Array), ga = "__proto__";
function mn(e, t = Po) {
  let i;
  if (ui(e)) {
    let n = e.find((o) => o != null);
    if (ui(n) || t(n)) {
      i = Array(e.length);
      for (let o = 0; o < e.length; o++)
        i[o] = mn(e[o], t);
    } else
      i = e.slice();
  } else if (e instanceof fh)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != ga && (i[n] = mn(e[n], t));
  } else
    i = e;
  return i;
}
function Ce(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let o in n)
      o != ga && (Po(e[o]) ? Ce(e[o], mn(n[o])) : e[o] = mn(n[o]));
  }
  return e;
}
const ph = 0, mh = 1, gh = 2;
function bh(e, t, i) {
  for (let n = 0, o, s = -1; n < t.length; n++) {
    let l = t[n];
    if (l > s) {
      for (o = l - 1; o >= 0 && e[o] == null; )
        e[o--] = null;
      for (o = l + 1; o < i && e[o] == null; )
        e[s = o++] = null;
    }
  }
}
function _h(e, t) {
  if (wh(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return xh(l[0]) || (l = yh(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < e.length; l++) {
    let d = e[l][0], p = d.length;
    for (let b = 0; b < p; b++)
      i.add(d[b]);
  }
  let n = [Array.from(i).sort((l, h) => l - h)], o = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < o; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < e.length; l++) {
    let h = e[l], d = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], m = Array(o).fill(void 0), _ = t ? t[l][p] : mh, k = [];
      for (let E = 0; E < b.length; E++) {
        let z = b[E], B = s.get(d[E]);
        z === null ? _ != ph && (m[B] = z, _ == gh && k.push(B)) : m[B] = z;
      }
      bh(m, k, o), n.push(m);
    }
  }
  return n;
}
const vh = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function yh(e) {
  let t = e[0], i = t.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => t[s] - t[l]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let l = e[s], h = Array(i);
    for (let d = 0; d < i; d++)
      h[d] = l[n[d]];
    o.push(h);
  }
  return o;
}
function wh(e) {
  let t = e[0][0], i = t.length;
  for (let n = 1; n < e.length; n++) {
    let o = e[n][0];
    if (o.length != i)
      return !1;
    if (o != t) {
      for (let s = 0; s < i; s++)
        if (o[s] != t[s])
          return !1;
    }
  }
  return !0;
}
function xh(e, t = 100) {
  const i = e.length;
  if (i <= 1)
    return !0;
  let n = 0, o = i - 1;
  for (; n <= o && e[n] == null; )
    n++;
  for (; o >= n && e[o] == null; )
    o--;
  if (o <= n)
    return !0;
  const s = Je(1, ut((o - n + 1) / t));
  for (let l = e[n], h = n + s; h <= o; h += s) {
    const d = e[h];
    if (d != null) {
      if (d <= l)
        return !1;
      l = d;
    }
  }
  return !0;
}
const ba = [
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
], _a = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function va(e) {
  return e.slice(0, 3);
}
const $h = _a.map(va), kh = ba.map(va), Sh = {
  MMMM: ba,
  MMM: kh,
  WWWW: _a,
  WWW: $h
};
function On(e) {
  return (e < 10 ? "0" : "") + e;
}
function Ah(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Eh = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => On(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => On(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => On(e.getHours()),
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
  mm: (e) => On(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => On(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => Ah(e.getMilliseconds())
};
function Zr(e, t) {
  t = t || Sh;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = n.exec(e); )
    i.push(o[0][0] == "{" ? Eh[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const Ch = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Th(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ch ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const ya = (e) => e % 1 == 0, $o = [1, 2, 2.5, 5], Ph = Kn(10, -32, 0, $o), wa = Kn(10, 0, 32, $o), Dh = wa.filter(ya), Di = Ph.concat(wa), Jr = `
`, xa = "{YYYY}", pl = Jr + xa, $a = "{M}/{D}", Fn = Jr + $a, uo = Fn + "/{YY}", ka = "{aa}", Mh = "{h}:{mm}", cn = Mh + ka, ml = Jr + cn, gl = ":{ss}", he = null;
function Sa(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, o = n * 24, s = o * 30, l = o * 365, d = (e == 1 ? Kn(10, 0, 3, $o).filter(ya) : Kn(10, -3, 0, $o)).concat([
    // minute divisors (# of secs)
    t,
    t * 5,
    t * 10,
    t * 15,
    t * 30,
    // hour divisors (# of mins)
    i,
    i * 5,
    i * 10,
    i * 15,
    i * 30,
    // day divisors (# of hrs)
    n,
    n * 2,
    n * 3,
    n * 4,
    n * 6,
    n * 8,
    n * 12,
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
    l,
    l * 2,
    l * 5,
    l * 10,
    l * 25,
    l * 50,
    l * 100
  ]);
  const p = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [l, xa, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", pl, he, he, he, he, he, 1],
    [o, $a, pl, he, he, he, he, he, 1],
    [n, "{h}" + ka, uo, he, Fn, he, he, he, 1],
    [i, cn, uo, he, Fn, he, he, he, 1],
    [t, gl, uo + " " + cn, he, Fn + " " + cn, he, ml, he, 1],
    [e, gl + ".{fff}", uo + " " + cn, he, Fn + " " + cn, he, ml, he, 1]
  ];
  function b(m) {
    return (_, k, E, z, B, V) => {
      let $ = [], I = B >= l, S = B >= s && B < l, J = m(E), M = me(J * e, 3), Q = dr(J.getFullYear(), I ? 0 : J.getMonth(), S || I ? 1 : J.getDate()), q = me(Q * e, 3);
      if (S || I) {
        let te = S ? B / s : 0, K = I ? B / l : 0, A = M == q ? M : me(dr(Q.getFullYear() + K, Q.getMonth() + te, 1) * e, 3), Z = new Date(De(A / e)), N = Z.getFullYear(), W = Z.getMonth();
        for (let F = 0; A <= z; F++) {
          let oe = dr(N + K * F, W + te * F, 1), H = oe - m(me(oe * e, 3));
          A = me((+oe + H) * e, 3), A <= z && $.push(A);
        }
      } else {
        let te = B >= o ? o : B, K = ut(E) - ut(M), A = q + K + To(M - q, te);
        $.push(A);
        let Z = m(A), N = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, W = B / n, F = _.axes[k]._space, oe = V / F;
        for (; A = me(A + B, e == 1 ? 0 : 3), !(A > z); )
          if (W > 1) {
            let H = ut(me(N + W, 6)) % 24, re = m(A).getHours() - H;
            re > 1 && (re = -1), A -= re * n, N = (N + W) % 24;
            let de = $[$.length - 1];
            me((A - de) / B, 3) * oe >= 0.7 && $.push(A);
          } else
            $.push(A);
      }
      return $;
    };
  }
  return [
    d,
    p,
    b
  ];
}
const [zh, Nh, Oh] = Sa(1), [Lh, Hh, Rh] = Sa(1e-3);
Kn(2, -53, 53, [1]);
function bl(e, t) {
  return e.map((i) => i.map(
    (n, o) => o == 0 || o == 8 || n == null ? n : t(o == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function _l(e, t) {
  return (i, n, o, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], d, p, b, m, _, k;
    return n.map((E) => {
      let z = e(E), B = z.getFullYear(), V = z.getMonth(), $ = z.getDate(), I = z.getHours(), S = z.getMinutes(), J = z.getSeconds(), M = B != d && h[2] || V != p && h[3] || $ != b && h[4] || I != m && h[5] || S != _ && h[6] || J != k && h[7] || h[1];
      return d = B, p = V, b = $, m = I, _ = S, k = J, M(z);
    });
  };
}
function Fh(e, t) {
  let i = Zr(t);
  return (n, o, s, l, h) => o.map((d) => i(e(d)));
}
function dr(e, t, i) {
  return new Date(e, t, i);
}
function vl(e, t) {
  return t(e);
}
const Ih = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function yl(e, t) {
  return (i, n, o, s) => s == null ? Vr : t(e(n));
}
function Bh(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function jh(e, t) {
  return e.series[t].fill(e, t);
}
const Uh = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: ah,
  markers: {
    show: !0,
    width: 2,
    stroke: Bh,
    fill: jh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Vh(e, t) {
  let i = e.cursor.points, n = vt(), o = i.size(e, t);
  ye(n, Hn, o), ye(n, Rn, o);
  let s = o / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, o);
  return l && ye(n, "borderWidth", l), n;
}
function Wh(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function Gh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function Kh(e, t) {
  return e.series[t].points.size;
}
const fr = [0, 0];
function qh(e, t, i) {
  return fr[0] = t, fr[1] = i, fr;
}
function ho(e, t, i, n = !0) {
  return (o) => {
    o.button == 0 && (!n || o.target == t) && i(o);
  };
}
function pr(e, t, i, n = !0) {
  return (o) => {
    (!n || o.target == t) && i(o);
  };
}
const Yh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: qh,
  points: {
    one: !1,
    show: Vh,
    size: Kh,
    width: 0,
    stroke: Gh,
    fill: Wh
  },
  bind: {
    mousedown: ho,
    mouseup: ho,
    click: ho,
    // legend clicks, not .u-over clicks
    dblclick: ho,
    mousemove: pr,
    mouseleave: pr,
    mouseenter: pr
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
    dist: (e, t, i, n, o) => n - o,
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
}, Aa = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Qr = Ce({}, Aa, {
  filter: da
}), Ea = Ce({}, Qr, {
  size: 10
}), Ca = Ce({}, Aa, {
  show: !1
}), Xr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Ta = "bold " + Xr, Pa = 1.5, wl = {
  show: !0,
  scale: "x",
  stroke: Ur,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Ta,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Qr,
  ticks: Ea,
  border: Ca,
  font: Xr,
  lineGap: Pa,
  rotate: 0
}, Zh = "Value", Jh = "Time", xl = {
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
function Qh(e, t, i, n, o) {
  return t.map((s) => s == null ? "" : qr(s));
}
function Xh(e, t, i, n, o, s, l) {
  let h = [], d = pi.get(o) || 0;
  i = l ? i : me(To(i, o), d);
  for (let p = i; p <= n; p = me(p + o, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function Er(e, t, i, n, o, s, l) {
  const h = [], d = e.scales[e.axes[t].scale].log, p = d == 10 ? Zt : ca, b = ut(p(i));
  o = fn(d, b), d == 10 && (o = Di[Tt(o, Di)]);
  let m = i, _ = o * d;
  d == 10 && (_ = Di[Tt(_, Di)]);
  do
    h.push(m), m = m + o, d == 10 && !pi.has(m) && (m = me(m, pi.get(o))), m >= _ && (o = m, _ = o * d, d == 10 && (_ = Di[Tt(_, Di)]));
  while (m <= n);
  return h;
}
function ed(e, t, i, n, o, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, p = n > d ? Er(e, t, Je(d, i), n, o) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? Er(e, t, Je(d, -n), -i, o) : [d]).reverse().map((_) => -_).concat(b, p);
}
const Da = /./, td = /[12357]/, id = /[125]/, $l = /1/, Cr = (e, t, i, n) => e.map((o, s) => t == 4 && o == 0 || s % n == 0 && i.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function nd(e, t, i, n, o) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], d = e.valToPos, p = s._space, b = d(10, l), m = d(9, l) - b >= p ? Da : d(7, l) - b >= p ? td : d(5, l) - b >= p ? id : $l;
  if (m == $l) {
    let _ = Me(d(1, l) - b);
    if (_ < p)
      return Cr(t.slice().reverse(), h.distr, m, yt(p / _)).reverse();
  }
  return Cr(t, h.distr, m, 1);
}
function od(e, t, i, n, o) {
  let s = e.axes[i], l = s.scale, h = s._space, d = e.valToPos, p = Me(d(1, l) - d(2, l));
  return p < h ? Cr(t.slice().reverse(), 3, Da, yt(h / p)).reverse() : t;
}
function rd(e, t, i, n) {
  return n == null ? Vr : t == null ? "" : qr(t);
}
const kl = {
  show: !0,
  scale: "y",
  stroke: Ur,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Ta,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Qr,
  ticks: Ea,
  border: Ca,
  font: Xr,
  lineGap: Pa,
  rotate: 0
};
function sd(e, t) {
  let i = 3 + (e || 1) * 2;
  return me(i * t, 3);
}
function ld(e, t) {
  let { scale: i, idxs: n } = e.series[0], o = e._data[0], s = e.valToPos(o[n[0]], i, !0), l = e.valToPos(o[n[1]], i, !0), h = Me(l - s), d = e.series[t], p = h / (d.points.space * ce);
  return n[1] - n[0] <= p;
}
const Sl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, Ma = (e, t, i, n, o) => o, Al = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Ma,
  alpha: 1,
  facets: [
    Ce({}, Sl, { scale: "x" }),
    Ce({}, Sl, { scale: "y" })
  ]
}, El = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Ma,
  alpha: 1,
  points: {
    show: ld,
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
function ad(e, t, i, n, o) {
  return i / 10;
}
const za = {
  time: zu,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, cd = Ce({}, za, {
  time: !1,
  ori: 1
}), Cl = {};
function Na(e, t) {
  let i = Cl[e];
  return i || (i = {
    key: e,
    plots: [],
    sub(n) {
      i.plots.push(n);
    },
    unsub(n) {
      i.plots = i.plots.filter((o) => o != n);
    },
    pub(n, o, s, l, h, d, p) {
      for (let b = 0; b < i.plots.length; b++)
        i.plots[b] != o && i.plots[b].pub(n, o, s, l, h, d, p);
    }
  }, e != null && (Cl[e] = i)), i;
}
const gn = 1, Tr = 2;
function Fi(e, t, i) {
  const n = e.mode, o = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[o.facets[0].scale] : l[e.series[0].scale], m = n == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, k = h.top, E = h.width, z = h.height, B = e.valToPosH, V = e.valToPosV;
  return b.ori == 0 ? i(
    o,
    d,
    p,
    b,
    m,
    B,
    V,
    _,
    k,
    E,
    z,
    Mo,
    wn,
    No,
    La,
    Ra
  ) : i(
    o,
    d,
    p,
    b,
    m,
    V,
    B,
    k,
    _,
    z,
    E,
    zo,
    xn,
    is,
    Ha,
    Fa
  );
}
function es(e, t) {
  let i = 0, n = 0, o = le(e.bands, Yr);
  for (let s = 0; s < o.length; s++) {
    let l = o[s];
    l.series[0] == t ? i = l.dir : l.series[1] == t && (l.dir == 1 ? n |= 1 : n |= 2);
  }
  return [
    i,
    n == 1 ? -1 : (
      // neg only
      n == 2 ? 1 : (
        // pos only
        n == 3 ? 2 : (
          // both
          0
        )
      )
    )
  ];
}
function ud(e, t, i, n, o) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[h];
  return o == -1 ? d.min : o == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Jt(e, t, i, n, o, s) {
  return Fi(e, t, (l, h, d, p, b, m, _, k, E, z, B) => {
    let V = l.pxRound;
    const $ = p.dir * (p.ori == 0 ? 1 : -1), I = p.ori == 0 ? wn : xn;
    let S, J;
    $ == 1 ? (S = i, J = n) : (S = n, J = i);
    let M = V(m(h[S], p, z, k)), Q = V(_(d[S], b, B, E)), q = V(m(h[J], p, z, k)), te = V(_(s == 1 ? b.max : b.min, b, B, E)), K = new Path2D(o);
    return I(K, q, te), I(K, M, te), I(K, M, Q), K;
  });
}
function Do(e, t, i, n, o, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? No : is;
    let d = i;
    for (let m = 0; m < e.length; m++) {
      let _ = e[m];
      if (_[1] > _[0]) {
        let k = _[0] - d;
        k > 0 && h(l, d, n, k, n + s), d = _[1];
      }
    }
    let p = i + o - d, b = 10;
    p > 0 && h(l, d, n - b / 2, p, n + s + b);
  }
  return l;
}
function hd(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function ts(e, t, i, n, o, s, l) {
  let h = [], d = e.length;
  for (let p = o == 1 ? i : n; p >= i && p <= n; p += o)
    if (t[p] === null) {
      let m = p, _ = p;
      if (o == 1)
        for (; ++p <= n && t[p] === null; )
          _ = p;
      else
        for (; --p >= i && t[p] === null; )
          _ = p;
      let k = s(e[m]), E = _ == m ? k : s(e[_]), z = m - o;
      k = l <= 0 && z >= 0 && z < d ? s(e[z]) : k;
      let V = _ + o;
      E = l >= 0 && V >= 0 && V < d ? s(e[V]) : E, E >= k && h.push([k, E]);
    }
  return h;
}
function Tl(e) {
  return e == 0 ? ha : e == 1 ? De : (t) => Pi(t, e);
}
function Oa(e) {
  let t = e == 0 ? Mo : zo, i = e == 0 ? (o, s, l, h, d, p) => {
    o.arcTo(s, l, h, d, p);
  } : (o, s, l, h, d, p) => {
    o.arcTo(l, s, d, h, p);
  }, n = e == 0 ? (o, s, l, h, d) => {
    o.rect(s, l, h, d);
  } : (o, s, l, h, d) => {
    o.rect(l, s, d, h);
  };
  return (o, s, l, h, d, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(o, s, l, h, d) : (p = Pt(p, h / 2, d / 2), b = Pt(b, h / 2, d / 2), t(o, s + p, l), i(o, s + h, l, s + h, l + d, p), i(o, s + h, l + d, s, l + d, b), i(o, s, l + d, s, l, b), i(o, s, l, s + h, l, p), o.closePath());
  };
}
const Mo = (e, t, i) => {
  e.moveTo(t, i);
}, zo = (e, t, i) => {
  e.moveTo(i, t);
}, wn = (e, t, i) => {
  e.lineTo(t, i);
}, xn = (e, t, i) => {
  e.lineTo(i, t);
}, No = Oa(0), is = Oa(1), La = (e, t, i, n, o, s) => {
  e.arc(t, i, n, o, s);
}, Ha = (e, t, i, n, o, s) => {
  e.arc(i, t, n, o, s);
}, Ra = (e, t, i, n, o, s, l) => {
  e.bezierCurveTo(t, i, n, o, s, l);
}, Fa = (e, t, i, n, o, s, l) => {
  e.bezierCurveTo(i, t, o, n, l, s);
};
function Ia(e) {
  return (t, i, n, o, s) => Fi(t, i, (l, h, d, p, b, m, _, k, E, z, B) => {
    let { pxRound: V, points: $ } = l, I, S;
    p.ori == 0 ? (I = Mo, S = La) : (I = zo, S = Ha);
    const J = me($.width * ce, 3);
    let M = ($.size - $.width) / 2 * ce, Q = me(M * 2, 3), q = new Path2D(), te = new Path2D(), { left: K, top: A, width: Z, height: N } = t.bbox;
    No(
      te,
      K - Q,
      A - Q,
      Z + Q * 2,
      N + Q * 2
    );
    const W = (F) => {
      if (d[F] != null) {
        let oe = V(m(h[F], p, z, k)), H = V(_(d[F], b, B, E));
        I(q, oe + M, H), S(q, oe, H, M, 0, bo * 2);
      }
    };
    if (s)
      s.forEach(W);
    else
      for (let F = n; F <= o; F++)
        W(F);
    return {
      stroke: J > 0 ? q : null,
      fill: q,
      clip: te,
      flags: gn | Tr
    };
  });
}
function Ba(e) {
  return (t, i, n, o, s, l) => {
    n != o && (s != n && l != n && e(t, i, n), s != o && l != o && e(t, i, o), e(t, i, l));
  };
}
const dd = Ba(wn), fd = Ba(xn);
function ja(e) {
  const t = le(e?.alignGaps, 0);
  return (i, n, o, s) => Fi(i, n, (l, h, d, p, b, m, _, k, E, z, B) => {
    [o, s] = Eo(d, o, s);
    let V = l.pxRound, $ = (N) => V(m(N, p, z, k)), I = (N) => V(_(N, b, B, E)), S, J;
    p.ori == 0 ? (S = wn, J = dd) : (S = xn, J = fd);
    const M = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: gn }, q = Q.stroke;
    let te = !1;
    if (s - o >= z * 4) {
      let N = (O) => i.posToVal(O, p.key, !0), W = null, F = null, oe, H, et, we = $(h[M == 1 ? o : s]), re = $(h[o]), de = $(h[s]), X = N(M == 1 ? re + 1 : de - 1);
      for (let O = M == 1 ? o : s; O >= o && O <= s; O += M) {
        let Te = h[O], xe = (M == 1 ? Te < X : Te > X) ? we : $(Te), ue = d[O];
        xe == we ? ue != null ? (H = ue, W == null ? (S(q, xe, I(H)), oe = W = F = H) : H < W ? W = H : H > F && (F = H)) : ue === null && (te = !0) : (W != null && J(q, we, I(W), I(F), I(oe), I(H)), ue != null ? (H = ue, S(q, xe, I(H)), W = F = oe = H) : (W = F = null, ue === null && (te = !0)), we = xe, X = N(we + M));
      }
      W != null && W != F && et != we && J(q, we, I(W), I(F), I(oe), I(H));
    } else
      for (let N = M == 1 ? o : s; N >= o && N <= s; N += M) {
        let W = d[N];
        W === null ? te = !0 : W != null && S(q, $(h[N]), I(W));
      }
    let [A, Z] = es(i, n);
    if (l.fill != null || A != 0) {
      let N = Q.fill = new Path2D(q), W = l.fillTo(i, n, l.min, l.max, A), F = I(W), oe = $(h[o]), H = $(h[s]);
      M == -1 && ([H, oe] = [oe, H]), S(N, H, F), S(N, oe, F);
    }
    if (!l.spanGaps) {
      let N = [];
      te && N.push(...ts(h, d, o, s, M, $, t)), Q.gaps = N = l.gaps(i, n, o, s, N), Q.clip = Do(N, p.ori, k, E, z, B);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      Jt(i, n, o, s, q, -1),
      Jt(i, n, o, s, q, 1)
    ] : Jt(i, n, o, s, q, Z)), Q;
  });
}
function pd(e) {
  const t = le(e.align, 1), i = le(e.ascDesc, !1), n = le(e.alignGaps, 0), o = le(e.extend, !1);
  return (s, l, h, d) => Fi(s, l, (p, b, m, _, k, E, z, B, V, $, I) => {
    [h, d] = Eo(m, h, d);
    let S = p.pxRound, { left: J, width: M } = s.bbox, Q = (re) => S(E(re, _, $, B)), q = (re) => S(z(re, k, I, V)), te = _.ori == 0 ? wn : xn;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: gn }, A = K.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let N = q(m[Z == 1 ? h : d]), W = Q(b[Z == 1 ? h : d]), F = W, oe = W;
    o && t == -1 && (oe = J, te(A, oe, N)), te(A, W, N);
    for (let re = Z == 1 ? h : d; re >= h && re <= d; re += Z) {
      let de = m[re];
      if (de == null)
        continue;
      let X = Q(b[re]), O = q(de);
      t == 1 ? te(A, X, N) : te(A, F, O), te(A, X, O), N = O, F = X;
    }
    let H = F;
    o && t == 1 && (H = J + M, te(A, H, N));
    let [et, we] = es(s, l);
    if (p.fill != null || et != 0) {
      let re = K.fill = new Path2D(A), de = p.fillTo(s, l, p.min, p.max, et), X = q(de);
      te(re, H, X), te(re, oe, X);
    }
    if (!p.spanGaps) {
      let re = [];
      re.push(...ts(b, m, h, d, Z, Q, n));
      let de = p.width * ce / 2, X = i || t == 1 ? de : -de, O = i || t == -1 ? -de : de;
      re.forEach((Te) => {
        Te[0] += X, Te[1] += O;
      }), K.gaps = re = p.gaps(s, l, h, d, re), K.clip = Do(re, _.ori, B, V, $, I);
    }
    return we != 0 && (K.band = we == 2 ? [
      Jt(s, l, h, d, A, -1),
      Jt(s, l, h, d, A, 1)
    ] : Jt(s, l, h, d, A, we)), K;
  });
}
function Pl(e, t, i, n, o, s, l = pe) {
  if (e.length > 1) {
    let h = null;
    for (let d = 0, p = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (h != null) {
          let b = Me(e[d] - e[h]);
          b < p && (p = b, l = Me(i(e[d], n, o, s) - i(e[h], n, o, s)));
        }
        h = d;
      }
  }
  return l;
}
function md(e) {
  e = e || jn;
  const t = le(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), l = 1 - t[0], h = le(t[1], pe), d = le(t[2], 1), p = le(e.disp, jn), b = le(e.each, (k) => {
  }), { fill: m, stroke: _ } = p;
  return (k, E, z, B) => Fi(k, E, (V, $, I, S, J, M, Q, q, te, K, A) => {
    let Z = V.pxRound, N = i, W = n * ce, F = h * ce, oe = d * ce, H, et;
    S.ori == 0 ? [H, et] = s(k, E) : [et, H] = s(k, E);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let re = S.ori == 0 ? No : is, de = S.ori == 0 ? b : (P, ge, Pe, Ui, yi, Lt, wi) => {
      b(P, ge, Pe, yi, Ui, wi, Lt);
    }, X = le(k.bands, Yr).find((P) => P.series[0] == E), O = X != null ? X.dir : 0, Te = V.fillTo(k, E, V.min, V.max, O), Ge = Z(Q(Te, J, A, te)), xe, ue, $t, ot = K, ke = Z(V.width * ce), Ot = !1, Gt = null, ft = null, ni = null, Ii = null;
    m != null && (ke == 0 || _ != null) && (Ot = !0, Gt = m.values(k, E, z, B), ft = /* @__PURE__ */ new Map(), new Set(Gt).forEach((P) => {
      P != null && ft.set(P, new Path2D());
    }), ke > 0 && (ni = _.values(k, E, z, B), Ii = /* @__PURE__ */ new Map(), new Set(ni).forEach((P) => {
      P != null && Ii.set(P, new Path2D());
    })));
    let { x0: Bi, size: Sn } = p;
    if (Bi != null && Sn != null) {
      N = 1, $ = Bi.values(k, E, z, B), Bi.unit == 2 && ($ = $.map((Pe) => k.posToVal(q + Pe * K, S.key, !0)));
      let P = Sn.values(k, E, z, B);
      Sn.unit == 2 ? ue = P[0] * K : ue = M(P[0], S, K, q) - M(0, S, K, q), ot = Pl($, I, M, S, K, q, ot), $t = ot - ue + W;
    } else
      ot = Pl($, I, M, S, K, q, ot), $t = ot * l + W, ue = ot - $t;
    $t < 1 && ($t = 0), ke >= ue / 2 && (ke = 0), $t < 5 && (Z = ha);
    let Jn = $t > 0, _i = ot - $t - (Jn ? ke : 0);
    ue = Z(Ar(_i, oe, F)), xe = (N == 0 ? ue / 2 : N == we ? 0 : ue) - N * we * ((N == 0 ? W / 2 : 0) + (Jn ? ke / 2 : 0));
    const Ke = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, ji = Ot ? null : new Path2D();
    let Kt = null;
    if (X != null)
      Kt = k.data[X.series[1]];
    else {
      let { y0: P, y1: ge } = p;
      P != null && ge != null && (I = ge.values(k, E, z, B), Kt = P.values(k, E, z, B));
    }
    let vi = H * ue, Y = et * ue;
    for (let P = we == 1 ? z : B; P >= z && P <= B; P += we) {
      let ge = I[P];
      if (ge == null)
        continue;
      if (Kt != null) {
        let tt = Kt[P] ?? 0;
        if (ge - tt == 0)
          continue;
        Ge = Q(tt, J, A, te);
      }
      let Pe = S.distr != 2 || p != null ? $[P] : P, Ui = M(Pe, S, K, q), yi = Q(le(ge, Te), J, A, te), Lt = Z(Ui - xe), wi = Z(Je(yi, Ge)), rt = Z(Pt(yi, Ge)), pt = wi - rt;
      if (ge != null) {
        let tt = ge < 0 ? Y : vi, kt = ge < 0 ? vi : Y;
        Ot ? (ke > 0 && ni[P] != null && re(Ii.get(ni[P]), Lt, rt + ut(ke / 2), ue, Je(0, pt - ke), tt, kt), Gt[P] != null && re(ft.get(Gt[P]), Lt, rt + ut(ke / 2), ue, Je(0, pt - ke), tt, kt)) : re(ji, Lt, rt + ut(ke / 2), ue, Je(0, pt - ke), tt, kt), de(
          k,
          E,
          P,
          Lt - ke / 2,
          rt,
          ue + ke,
          pt
        );
      }
    }
    return ke > 0 ? Ke.stroke = Ot ? Ii : ji : Ot || (Ke._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Ke.width = 0), Ke.fill = Ot ? ft : ji, Ke;
  });
}
function gd(e, t) {
  const i = le(t?.alignGaps, 0);
  return (n, o, s, l) => Fi(n, o, (h, d, p, b, m, _, k, E, z, B, V) => {
    [s, l] = Eo(p, s, l);
    let $ = h.pxRound, I = (H) => $(_(H, b, B, E)), S = (H) => $(k(H, m, V, z)), J, M, Q;
    b.ori == 0 ? (J = Mo, Q = wn, M = Ra) : (J = zo, Q = xn, M = Fa);
    const q = b.dir * (b.ori == 0 ? 1 : -1);
    let te = I(d[q == 1 ? s : l]), K = te, A = [], Z = [];
    for (let H = q == 1 ? s : l; H >= s && H <= l; H += q)
      if (p[H] != null) {
        let we = d[H], re = I(we);
        A.push(K = re), Z.push(S(p[H]));
      }
    const N = { stroke: e(A, Z, J, Q, M, $), fill: null, clip: null, band: null, gaps: null, flags: gn }, W = N.stroke;
    let [F, oe] = es(n, o);
    if (h.fill != null || F != 0) {
      let H = N.fill = new Path2D(W), et = h.fillTo(n, o, h.min, h.max, F), we = S(et);
      Q(H, K, we), Q(H, te, we);
    }
    if (!h.spanGaps) {
      let H = [];
      H.push(...ts(d, p, s, l, q, I, i)), N.gaps = H = h.gaps(n, o, s, l, H), N.clip = Do(H, b.ori, E, z, B, V);
    }
    return oe != 0 && (N.band = oe == 2 ? [
      Jt(n, o, s, l, W, -1),
      Jt(n, o, s, l, W, 1)
    ] : Jt(n, o, s, l, W, oe)), N;
  });
}
function bd(e) {
  return gd(_d, e);
}
function _d(e, t, i, n, o, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, e[0], t[0]), l == 2)
    n(h, e[1], t[1]);
  else {
    let d = Array(l), p = Array(l - 1), b = Array(l - 1), m = Array(l - 1);
    for (let _ = 0; _ < l - 1; _++)
      b[_] = t[_ + 1] - t[_], m[_] = e[_ + 1] - e[_], p[_] = b[_] / m[_];
    d[0] = p[0];
    for (let _ = 1; _ < l - 1; _++)
      p[_] === 0 || p[_ - 1] === 0 || p[_ - 1] > 0 != p[_] > 0 ? d[_] = 0 : (d[_] = 3 * (m[_ - 1] + m[_]) / ((2 * m[_] + m[_ - 1]) / p[_ - 1] + (m[_] + 2 * m[_ - 1]) / p[_]), isFinite(d[_]) || (d[_] = 0));
    d[l - 1] = p[l - 2];
    for (let _ = 0; _ < l - 1; _++)
      o(
        h,
        e[_] + m[_] / 3,
        t[_] + d[_] * m[_] / 3,
        e[_ + 1] - m[_] / 3,
        t[_ + 1] - d[_ + 1] * m[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return h;
}
const Pr = /* @__PURE__ */ new Set();
function Dl() {
  for (let e of Pr)
    e.syncRect(!0);
}
yn && (Oi(Qu, un, Dl), Oi(Xu, un, Dl, !0), Oi(wo, un, () => {
  We.pxRatio = ce;
}));
const vd = ja(), yd = Ia();
function Ml(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Dr(s, l, t, i));
}
function wd(e, t) {
  return e.map((i, n) => n == 0 ? {} : Ce({}, t, i));
}
function Dr(e, t, i, n) {
  return Ce({}, t == 0 ? i : n, e);
}
function Ua(e, t, i) {
  return t == null ? pn : [t, i];
}
const xd = Ua;
function $d(e, t, i) {
  return t == null ? pn : xo(t, i, Kr, !0);
}
function Va(e, t, i, n) {
  return t == null ? pn : Co(t, i, e.scales[n].log, !1);
}
const kd = Va;
function Wa(e, t, i, n) {
  return t == null ? pn : Gr(t, i, e.scales[n].log, !1);
}
const Sd = Wa;
function Ad(e, t, i, n, o) {
  let s = Je(ul(e), ul(t)), l = t - e, h = Tt(o / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= o && s + (d < 5 ? pi.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function zl(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, o) => (t = De((i = +o) * ce)) + "px"), [e, t, i];
}
function Ed(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function We(e, t, i) {
  const n = {
    mode: le(e.mode, 1)
  }, o = n.mode;
  function s(r, a, c, u) {
    let f = a.valToPct(r);
    return u + c * (a.dir == -1 ? 1 - f : f);
  }
  function l(r, a, c, u) {
    let f = a.valToPct(r);
    return u + c * (a.dir == -1 ? f : 1 - f);
  }
  function h(r, a, c, u) {
    return a.ori == 0 ? s(r, a, c, u) : l(r, a, c, u);
  }
  n.valToPosH = s, n.valToPosV = l;
  let d = !1;
  n.status = 0;
  const p = n.root = vt(Nu);
  if (e.id != null && (p.id = e.id), ct(p, e.class), e.title) {
    let r = vt(Hu, p);
    r.textContent = e.title;
  }
  const b = Ct("canvas"), m = n.ctx = b.getContext("2d"), _ = vt(Ru, p);
  Oi("click", _, (r) => {
    r.target === E && (be != en || $e != tn) && je.click(n, r);
  }, !0);
  const k = n.under = vt(Fu, _);
  _.appendChild(b);
  const E = n.over = vt(Iu, _);
  e = mn(e);
  const z = +le(e.pxAlign, 1), B = Tl(z);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(n, e) || e);
  });
  const V = e.ms || 1e-3, $ = n.series = o == 1 ? Ml(e.series || [], xl, El, !1) : wd(e.series || [null], Al), I = n.axes = Ml(e.axes || [], wl, kl, !0), S = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((r) => {
    r.fill = ie(r.fill || null), r.dir = le(r.dir, -1);
  });
  const M = o == 2 ? $[1].facets[0].scale : $[0].scale, Q = {
    axes: ac,
    series: nc
  }, q = (e.drawOrder || ["axes", "series"]).map((r) => Q[r]);
  function te(r) {
    const a = r.distr == 3 ? (c) => Zt(c > 0 ? c : r.clamp(n, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => hr(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: g } = r, v = g - f;
      return (u - f) / v;
    };
  }
  function K(r) {
    let a = S[r];
    if (a == null) {
      let c = (e.scales || jn)[r] || jn;
      if (c.from != null) {
        K(c.from);
        let u = Ce({}, S[c.from], c, { key: r });
        u.valToPct = te(u), S[r] = u;
      } else {
        a = S[r] = Ce({}, r == M ? za : cd, c), a.key = r;
        let u = a.time, f = a.range, g = ui(f);
        if ((r != M || o == 2 && !u) && (g && (f[0] == null || f[1] == null) && (f = {
          min: f[0] == null ? ll : {
            mode: 1,
            hard: f[0],
            soft: f[0]
          },
          max: f[1] == null ? ll : {
            mode: 1,
            hard: f[1],
            soft: f[1]
          }
        }, g = !1), !g && Po(f))) {
          let v = f;
          f = (y, x, C) => x == null ? pn : xo(x, C, v);
        }
        a.range = ie(f || (u ? xd : r == M ? a.distr == 3 ? kd : a.distr == 4 ? Sd : Ua : a.distr == 3 ? Va : a.distr == 4 ? Wa : $d)), a.auto = ie(g ? !1 : a.auto), a.clamp = ie(a.clamp || ad), a._min = a._max = null, a.valToPct = te(a);
      }
    }
  }
  K("x"), K("y"), o == 1 && $.forEach((r) => {
    K(r.scale);
  }), I.forEach((r) => {
    K(r.scale);
  });
  for (let r in e.scales)
    K(r);
  const A = S[M], Z = A.distr;
  let N, W;
  A.ori == 0 ? (ct(p, Ou), N = s, W = l) : (ct(p, Lu), N = l, W = s);
  const F = {};
  for (let r in S) {
    let a = S[r];
    (a.min != null || a.max != null) && (F[r] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const oe = e.tzDate || ((r) => new Date(De(r / V))), H = e.fmtDate || Zr, et = V == 1 ? Oh(oe) : Rh(oe), we = _l(oe, bl(V == 1 ? Nh : Hh, H)), re = yl(oe, vl(Ih, H)), de = [], X = n.legend = Ce({}, Uh, e.legend), O = n.cursor = Ce({}, Yh, { drag: { y: o == 2 } }, e.cursor), Te = X.show, Ge = O.show, xe = X.markers;
  X.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, $t, ot, ke = [], Ot = [], Gt, ft = !1, ni = {};
  if (X.live) {
    const r = $[1] ? $[1].values : null;
    ft = r != null, Gt = ft ? r(n, 1, 0) : { _: 0 };
    for (let a in Gt)
      ni[a] = Vr;
  }
  if (Te)
    if (ue = Ct("table", Gu, p), ot = Ct("tbody", null, ue), X.mount(n, ue), ft) {
      $t = Ct("thead", null, ue, ot);
      let r = Ct("tr", null, $t);
      Ct("th", null, r);
      for (var Ii in Gt)
        Ct("th", qs, r).textContent = Ii;
    } else
      ct(ue, qu), X.live && ct(ue, Ku);
  const Bi = { show: !0 }, Sn = { show: !1 };
  function Jn(r, a) {
    if (a == 0 && (ft || !X.live || o == 2))
      return pn;
    let c = [], u = Ct("tr", Yu, ot, ot.childNodes[a]);
    ct(u, r.class), r.show || ct(u, Mi);
    let f = Ct("th", null, u);
    if (xe.show) {
      let y = vt(Zu, f);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (y.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let g = vt(qs, f);
    r.label instanceof HTMLElement ? g.appendChild(r.label) : g.textContent = r.label, a > 0 && (xe.show || (g.style.color = r.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ke("click", f, (y) => {
      if (O._lock)
        return;
      $i(y);
      let x = $.indexOf(r);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let C = $.some((T, D) => D > 0 && D != x && T.show);
        $.forEach((T, D) => {
          D > 0 && Rt(D, C ? D == x ? Bi : Sn : Bi, !0, Ee.setSeries);
        });
      } else
        Rt(x, { show: !r.show }, !0, Ee.setSeries);
    }, !1), Wi && Ke(Qs, f, (y) => {
      O._lock || ($i(y), Rt($.indexOf(r), on, !0, Ee.setSeries));
    }, !1));
    for (var v in Gt) {
      let y = Ct("td", Ju, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const _i = /* @__PURE__ */ new Map();
  function Ke(r, a, c, u = !0) {
    const f = _i.get(a) || {}, g = O.bind[r](n, a, c, u);
    g && (Oi(r, a, f[r] = g), _i.set(a, f));
  }
  function ji(r, a, c) {
    const u = _i.get(a) || {};
    for (let f in u)
      (r == null || f == r) && (Sr(f, a, u[f]), delete u[f]);
    r == null && _i.delete(a);
  }
  let Kt = 0, vi = 0, Y = 0, P = 0, ge = 0, Pe = 0, Ui = ge, yi = Pe, Lt = Y, wi = P, rt = 0, pt = 0, tt = 0, kt = 0;
  n.bbox = {};
  let Ho = !1, Qn = !1, Vi = !1, xi = !1, Xn = !1, mt = !1;
  function Ro(r, a, c) {
    (c || r != n.width || a != n.height) && rs(r, a), Zi(!1), Vi = !0, Qn = !0, Ji();
  }
  function rs(r, a) {
    n.width = Kt = Y = r, n.height = vi = P = a, ge = Pe = 0, Za(), Ja();
    let c = n.bbox;
    rt = c.left = Pi(ge * ce, 0.5), pt = c.top = Pi(Pe * ce, 0.5), tt = c.width = Pi(Y * ce, 0.5), kt = c.height = Pi(P * ce, 0.5);
  }
  const Ka = 3;
  function qa() {
    let r = !1, a = 0;
    for (; !r; ) {
      a++;
      let c = sc(a), u = lc(a);
      r = a == Ka || c && u, r || (rs(n.width, n.height), Qn = !0);
    }
  }
  function Ya({ width: r, height: a }) {
    Ro(r, a);
  }
  n.setSize = Ya;
  function Za() {
    let r = !1, a = !1, c = !1, u = !1;
    I.forEach((f, g) => {
      if (f.show && f._show) {
        let { side: v, _size: y } = f, x = v % 2, C = f.label != null ? f.labelSize : 0, T = y + C;
        T > 0 && (x ? (Y -= T, v == 3 ? (ge += T, u = !0) : c = !0) : (P -= T, v == 0 ? (Pe += T, r = !0) : a = !0));
      }
    }), ki[0] = r, ki[1] = c, ki[2] = a, ki[3] = u, Y -= oi[1] + oi[3], ge += oi[3], P -= oi[2] + oi[0], Pe += oi[0];
  }
  function Ja() {
    let r = ge + Y, a = Pe + P, c = ge, u = Pe;
    function f(g, v) {
      switch (g) {
        case 1:
          return r += v, r - v;
        case 2:
          return a += v, a - v;
        case 3:
          return c -= v, c + v;
        case 0:
          return u -= v, u + v;
      }
    }
    I.forEach((g, v) => {
      if (g.show && g._show) {
        let y = g.side;
        g._pos = f(y, g._size), g.label != null && (g._lpos = f(y, g.labelSize));
      }
    });
  }
  if (O.dataIdx == null) {
    let r = O.hover, a = r.skip = new Set(r.skip ?? []);
    a.add(void 0);
    let c = r.prox = ie(r.prox), u = r.bias ??= 0;
    O.dataIdx = (f, g, v, y) => {
      if (g == 0)
        return v;
      let x = v, C = c(f, g, v, y) ?? pe, T = C >= 0 && C < pe, D = A.ori == 0 ? Y : P, G = O.left, ae = t[0], se = t[g];
      if (a.has(se[v])) {
        x = null;
        let ee = null, j = null, L;
        if (u == 0 || u == -1)
          for (L = v; ee == null && L-- > 0; )
            a.has(se[L]) || (ee = L);
        if (u == 0 || u == 1)
          for (L = v; j == null && L++ < se.length; )
            a.has(se[L]) || (j = L);
        if (ee != null || j != null)
          if (T) {
            let ve = ee == null ? -1 / 0 : N(ae[ee], A, D, 0), Se = j == null ? 1 / 0 : N(ae[j], A, D, 0), Ie = G - ve, fe = Se - G;
            Ie <= fe ? Ie <= C && (x = ee) : fe <= C && (x = j);
          } else
            x = j == null ? ee : ee == null ? j : v - ee <= j - v ? ee : j;
      } else T && Me(G - N(ae[v], A, D, 0)) > C && (x = null);
      return x;
    };
  }
  const $i = (r) => {
    O.event = r;
  };
  O.idxs = de, O._lock = !1;
  let Ve = O.points;
  Ve.show = ie(Ve.show), Ve.size = ie(Ve.size), Ve.stroke = ie(Ve.stroke), Ve.width = ie(Ve.width), Ve.fill = ie(Ve.fill);
  const Ht = n.focus = Ce({}, e.focus || { alpha: 0.3 }, O.focus), Wi = Ht.prox >= 0, Gi = Wi && Ve.one;
  let gt = [], Ki = [], qi = [];
  function ss(r, a) {
    let c = Ve.show(n, a);
    if (c instanceof HTMLElement)
      return ct(c, Wu), ct(c, r.class), jt(c, -10, -10, Y, P), E.insertBefore(c, gt[a]), c;
  }
  function ls(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && S[r.scale].time, u = r.value;
      r.value = c ? fl(u) ? yl(oe, vl(u, H)) : u || re : u || rd, r.label = r.label || (c ? Jh : Zh);
    }
    if (Gi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || vd || ch, r.fillTo = ie(r.fillTo || ud), r.pxAlign = +le(r.pxAlign, z), r.pxRound = Tl(r.pxAlign), r.stroke = ie(r.stroke || null), r.fill = ie(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = sd(Je(1, r.width), 1), u = r.points = Ce({}, {
        size: c,
        width: Je(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: yd,
        _stroke: null,
        _fill: null
      }, r.points);
      u.show = ie(u.show), u.filter = ie(u.filter), u.fill = ie(u.fill), u.stroke = ie(u.stroke), u.paths = ie(u.paths), u.pxAlign = r.pxAlign;
    }
    if (Te) {
      let c = Jn(r, a);
      ke.splice(a, 0, c[0]), Ot.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Ge) {
      de.splice(a, 0, null);
      let c = null;
      Gi ? a == 0 && (c = ss(r, a)) : a > 0 && (c = ss(r, a)), gt.splice(a, 0, c), Ki.splice(a, 0, 0), qi.splice(a, 0, 0);
    }
    Fe("addSeries", a);
  }
  function Qa(r, a) {
    a = a ?? $.length, r = o == 1 ? Dr(r, a, xl, El) : Dr(r, a, {}, Al), $.splice(a, 0, r), ls($[a], a);
  }
  n.addSeries = Qa;
  function Xa(r) {
    if ($.splice(r, 1), Te) {
      X.values.splice(r, 1), Ot.splice(r, 1);
      let a = ke.splice(r, 1)[0];
      ji(null, a.firstChild), a.remove();
    }
    Ge && (de.splice(r, 1), gt.splice(r, 1)[0].remove(), Ki.splice(r, 1), qi.splice(r, 1)), Fe("delSeries", r);
  }
  n.delSeries = Xa;
  const ki = [!1, !1, !1, !1];
  function ec(r, a) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = S[r.scale];
      u == null && (r.scale = c ? $[1].scale : M, u = S[r.scale]);
      let f = u.time;
      r.size = ie(r.size), r.space = ie(r.space), r.rotate = ie(r.rotate), ui(r.incrs) && r.incrs.forEach((v) => {
        !pi.has(v) && pi.set(v, pa(v));
      }), r.incrs = ie(r.incrs || (u.distr == 2 ? Dh : f ? V == 1 ? zh : Lh : Di)), r.splits = ie(r.splits || (f && u.distr == 1 ? et : u.distr == 3 ? Er : u.distr == 4 ? ed : Xh)), r.stroke = ie(r.stroke), r.grid.stroke = ie(r.grid.stroke), r.ticks.stroke = ie(r.ticks.stroke), r.border.stroke = ie(r.border.stroke);
      let g = r.values;
      r.values = // static array of tick values
      ui(g) && !ui(g[0]) ? ie(g) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          ui(g) ? _l(oe, bl(g, H)) : (
            // fmtDate string tpl
            fl(g) ? Fh(oe, g) : g || we
          )
        ) : g || Qh
      ), r.filter = ie(r.filter || (u.distr >= 3 && u.log == 10 ? nd : u.distr == 3 && u.log == 2 ? od : da)), r.font = zl(r.font), r.labelFont = zl(r.labelFont), r._size = r.size(n, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (ki[a] = !0, r._el = vt(Bu, _));
    }
  }
  function An(r, a, c, u) {
    let [f, g, v, y] = c, x = a % 2, C = 0;
    return x == 0 && (y || g) && (C = a == 0 && !f || a == 2 && !v ? De(wl.size / 3) : 0), x == 1 && (f || v) && (C = a == 1 && !g || a == 3 && !y ? De(kl.size / 2) : 0), C;
  }
  const as = n.padding = (e.padding || [An, An, An, An]).map((r) => ie(le(r, An))), oi = n._padding = as.map((r, a) => r(n, a, ki, 0));
  let Be, Oe = null, Le = null;
  const eo = o == 1 ? $[0].idxs : null;
  let St = null, En = !1;
  function cs(r, a) {
    if (t = r ?? [], n.data = n._data = t, o == 2) {
      Be = 0;
      for (let c = 1; c < $.length; c++)
        Be += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), St = t[0], Be = St.length;
      let c = t;
      if (Z == 2) {
        c = t.slice();
        let u = c[0] = Array(Be);
        for (let f = 0; f < Be; f++)
          u[f] = f;
      }
      n._data = t = c;
    }
    if (Zi(!0), Fe("setData"), Z == 2 && (Vi = !0), a !== !1) {
      let c = A;
      c.auto(n, En) ? Fo() : si(M, c.min, c.max), xi = xi || O.left >= 0, mt = !0, Ji();
    }
  }
  n.setData = cs;
  function Fo() {
    En = !0;
    let r, a;
    o == 1 && (Be > 0 ? (Oe = eo[0] = 0, Le = eo[1] = Be - 1, r = t[0][Oe], a = t[0][Le], Z == 2 ? (r = Oe, a = Le) : r == a && (Z == 3 ? [r, a] = Co(r, r, A.log, !1) : Z == 4 ? [r, a] = Gr(r, r, A.log, !1) : A.time ? a = r + De(86400 / V) : [r, a] = xo(r, a, Kr, !0))) : (Oe = eo[0] = r = null, Le = eo[1] = a = null)), si(M, r, a);
  }
  let to, Yi, Io, Bo, jo, Uo, Vo, Wo, Go, it;
  function us(r, a, c, u, f, g) {
    r ??= Zs, c ??= Yr, u ??= "butt", f ??= Zs, g ??= "round", r != to && (m.strokeStyle = to = r), f != Yi && (m.fillStyle = Yi = f), a != Io && (m.lineWidth = Io = a), g != jo && (m.lineJoin = jo = g), u != Uo && (m.lineCap = Uo = u), c != Bo && m.setLineDash(Bo = c);
  }
  function hs(r, a, c, u) {
    a != Yi && (m.fillStyle = Yi = a), r != Vo && (m.font = Vo = r), c != Wo && (m.textAlign = Wo = c), u != Go && (m.textBaseline = Go = u);
  }
  function Ko(r, a, c, u, f = 0) {
    if (u.length > 0 && r.auto(n, En) && (a == null || a.min == null)) {
      let g = le(Oe, 0), v = le(Le, u.length - 1), y = c.min == null ? nh(u, g, v, f, r.distr == 3) : [c.min, c.max];
      r.min = Pt(r.min, c.min = y[0]), r.max = Je(r.max, c.max = y[1]);
    }
  }
  const ds = { min: null, max: null };
  function tc() {
    for (let u in S) {
      let f = S[u];
      F[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      F[M] != null && f.auto(n, En)) && (F[u] = ds);
    }
    for (let u in S) {
      let f = S[u];
      F[u] == null && f.from != null && F[f.from] != null && (F[u] = ds);
    }
    F[M] != null && Zi(!0);
    let r = {};
    for (let u in F) {
      let f = F[u];
      if (f != null) {
        let g = r[u] = mn(S[u], dh);
        if (f.min != null)
          Ce(g, f);
        else if (u != M || o == 2)
          if (Be == 0 && g.from == null) {
            let v = g.range(n, null, null, u);
            g.min = v[0], g.max = v[1];
          } else
            g.min = pe, g.max = -pe;
      }
    }
    if (Be > 0) {
      $.forEach((u, f) => {
        if (o == 1) {
          let g = u.scale, v = F[g];
          if (v == null)
            return;
          let y = r[g];
          if (f == 0) {
            let x = y.range(n, y.min, y.max, g);
            y.min = x[0], y.max = x[1], Oe = Tt(y.min, t[0]), Le = Tt(y.max, t[0]), Le - Oe > 1 && (t[0][Oe] < y.min && Oe++, t[0][Le] > y.max && Le--), u.min = St[Oe], u.max = St[Le];
          } else u.show && u.auto && Ko(y, v, u, t[f], u.sorted);
          u.idxs[0] = Oe, u.idxs[1] = Le;
        } else if (f > 0 && u.show && u.auto) {
          let [g, v] = u.facets, y = g.scale, x = v.scale, [C, T] = t[f], D = r[y], G = r[x];
          D != null && Ko(D, F[y], g, C, g.sorted), G != null && Ko(G, F[x], v, T, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in r) {
        let f = r[u], g = F[u];
        if (f.from == null && (g == null || g.min == null)) {
          let v = f.range(
            n,
            f.min == pe ? null : f.min,
            f.max == -pe ? null : f.max,
            u
          );
          f.min = v[0], f.max = v[1];
        }
      }
    }
    for (let u in r) {
      let f = r[u];
      if (f.from != null) {
        let g = r[f.from];
        if (g.min == null)
          f.min = f.max = null;
        else {
          let v = f.range(n, g.min, g.max, u);
          f.min = v[0], f.max = v[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let u in r) {
      let f = r[u], g = S[u];
      if (g.min != f.min || g.max != f.max) {
        g.min = f.min, g.max = f.max;
        let v = g.distr;
        g._min = v == 3 ? Zt(g.min) : v == 4 ? hr(g.min, g.asinh) : v == 100 ? g.fwd(g.min) : g.min, g._max = v == 3 ? Zt(g.max) : v == 4 ? hr(g.max, g.asinh) : v == 100 ? g.fwd(g.max) : g.max, a[u] = c = !0;
      }
    }
    if (c) {
      $.forEach((u, f) => {
        o == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Vi = !0, Fe("setScale", u);
      Ge && O.left >= 0 && (xi = mt = !0);
    }
    for (let u in F)
      F[u] = null;
  }
  function ic(r) {
    let a = Ar(Oe - 1, 0, Be - 1), c = Ar(Le + 1, 0, Be - 1);
    for (; r[a] == null && a > 0; )
      a--;
    for (; r[c] == null && c < Be - 1; )
      c++;
    return [a, c];
  }
  function nc() {
    if (Be > 0) {
      let r = $.some((a) => a._focus) && it != Ht.alpha;
      r && (m.globalAlpha = it = Ht.alpha), $.forEach((a, c) => {
        if (c > 0 && a.show && (fs(c, !1), fs(c, !0), a._paths == null)) {
          let u = it;
          it != a.alpha && (m.globalAlpha = it = a.alpha);
          let f = o == 2 ? [0, t[c][0].length - 1] : ic(t[c]);
          a._paths = a.paths(n, c, f[0], f[1]), it != u && (m.globalAlpha = it = u);
        }
      }), $.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = it;
          it != a.alpha && (m.globalAlpha = it = a.alpha), a._paths != null && ps(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, g = a.points.show(n, c, Oe, Le, f), v = a.points.filter(n, c, g, f);
            (g || v) && (a.points._paths = a.points.paths(n, c, Oe, Le, v), ps(c, !0));
          }
          it != u && (m.globalAlpha = it = u), Fe("drawSeries", c);
        }
      }), r && (m.globalAlpha = it = 1);
    }
  }
  function fs(r, a) {
    let c = a ? $[r].points : $[r];
    c._stroke = c.stroke(n, r), c._fill = c.fill(n, r);
  }
  function ps(r, a) {
    let c = a ? $[r].points : $[r], {
      stroke: u,
      fill: f,
      clip: g,
      flags: v,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: C = c.width
    } = c._paths;
    C = me(C * ce, 3);
    let T = null, D = C % 2 / 2;
    a && x == null && (x = C > 0 ? "#fff" : y);
    let G = c.pxAlign == 1 && D > 0;
    if (G && m.translate(D, D), !a) {
      let ae = rt - C / 2, se = pt - C / 2, ee = tt + C, j = kt + C;
      T = new Path2D(), T.rect(ae, se, ee, j);
    }
    a ? qo(y, C, c.dash, c.cap, x, u, f, v, g) : oc(r, y, C, c.dash, c.cap, x, u, f, v, T, g), G && m.translate(-D, -D);
  }
  function oc(r, a, c, u, f, g, v, y, x, C, T) {
    let D = !1;
    x != 0 && J.forEach((G, ae) => {
      if (G.series[0] == r) {
        let se = $[G.series[1]], ee = t[G.series[1]], j = (se._paths || jn).band;
        ui(j) && (j = G.dir == 1 ? j[0] : j[1]);
        let L, ve = null;
        se.show && j && rh(ee, Oe, Le) ? (ve = G.fill(n, ae) || g, L = se._paths.clip) : j = null, qo(a, c, u, f, ve, v, y, x, C, T, L, j), D = !0;
      }
    }), D || qo(a, c, u, f, g, v, y, x, C, T);
  }
  const ms = gn | Tr;
  function qo(r, a, c, u, f, g, v, y, x, C, T, D) {
    us(r, a, c, u, f), (x || C || D) && (m.save(), x && m.clip(x), C && m.clip(C)), D ? (y & ms) == ms ? (m.clip(D), T && m.clip(T), no(f, v), io(r, g, a)) : y & Tr ? (no(f, v), m.clip(D), io(r, g, a)) : y & gn && (m.save(), m.clip(D), T && m.clip(T), no(f, v), m.restore(), io(r, g, a)) : (no(f, v), io(r, g, a)), (x || C || D) && m.restore();
  }
  function io(r, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      m.strokeStyle = to = f, m.stroke(u);
    }) : a != null && r && m.stroke(a));
  }
  function no(r, a) {
    a instanceof Map ? a.forEach((c, u) => {
      m.fillStyle = Yi = u, m.fill(c);
    }) : a != null && r && m.fill(a);
  }
  function rc(r, a, c, u) {
    let f = I[r], g;
    if (u <= 0)
      g = [0, 0];
    else {
      let v = f._space = f.space(n, r, a, c, u), y = f._incrs = f.incrs(n, r, a, c, u, v);
      g = Ad(a, c, y, u, v);
    }
    return f._found = g;
  }
  function Yo(r, a, c, u, f, g, v, y, x, C) {
    let T = v % 2 / 2;
    z == 1 && m.translate(T, T), us(y, v, x, C, y), m.beginPath();
    let D, G, ae, se, ee = f + (u == 0 || u == 3 ? -g : g);
    c == 0 ? (G = f, se = ee) : (D = f, ae = ee);
    for (let j = 0; j < r.length; j++)
      a[j] != null && (c == 0 ? D = ae = r[j] : G = se = r[j], m.moveTo(D, G), m.lineTo(ae, se));
    m.stroke(), z == 1 && m.translate(-T, -T);
  }
  function sc(r) {
    let a = !0;
    return I.forEach((c, u) => {
      if (!c.show)
        return;
      let f = S[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, Zi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Zi(!1));
      let g = c.side, v = g % 2, { min: y, max: x } = f, [C, T] = rc(u, y, x, v == 0 ? Y : P);
      if (T == 0)
        return;
      let D = f.distr == 2, G = c._splits = c.splits(n, u, y, x, C, T, D), ae = f.distr == 2 ? G.map((L) => St[L]) : G, se = f.distr == 2 ? St[G[1]] - St[G[0]] : C, ee = c._values = c.values(n, c.filter(n, ae, u, T, se), u, T, se);
      c._rotate = g == 2 ? c.rotate(n, ee, u, T) : 0;
      let j = c._size;
      c._size = yt(c.size(n, ee, u, r)), j != null && c._size != j && (a = !1);
    }), a;
  }
  function lc(r) {
    let a = !0;
    return as.forEach((c, u) => {
      let f = c(n, u, ki, r);
      f != oi[u] && (a = !1), oi[u] = f;
    }), a;
  }
  function ac() {
    for (let r = 0; r < I.length; r++) {
      let a = I[r];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, g, v = a.stroke(n, r), y = c == 0 || c == 3 ? -1 : 1, [x, C] = a._found;
      if (a.label != null) {
        let Ye = a.labelGap * y, at = De((a._lpos + Ye) * ce);
        hs(a.labelFont[0], v, "center", c == 2 ? Nn : Ys), m.save(), u == 1 ? (f = g = 0, m.translate(
          at,
          De(pt + kt / 2)
        ), m.rotate((c == 3 ? -bo : bo) / 2)) : (f = De(rt + tt / 2), g = at);
        let Ei = ua(a.label) ? a.label(n, r, x, C) : a.label;
        m.fillText(Ei, f, g), m.restore();
      }
      if (C == 0)
        continue;
      let T = S[a.scale], D = u == 0 ? tt : kt, G = u == 0 ? rt : pt, ae = a._splits, se = T.distr == 2 ? ae.map((Ye) => St[Ye]) : ae, ee = T.distr == 2 ? St[ae[1]] - St[ae[0]] : x, j = a.ticks, L = a.border, ve = j.show ? j.size : 0, Se = De(ve * ce), Ie = De((a.alignTo == 2 ? a._size - ve - a.gap : a.gap) * ce), fe = a._rotate * -bo / 180, Ae = B(a._pos * ce), st = (Se + Ie) * y, qe = Ae + st;
      g = u == 0 ? qe : 0, f = u == 1 ? qe : 0;
      let bt = a.font[0], At = a.align == 1 ? sn : a.align == 2 ? ar : fe > 0 ? sn : fe < 0 ? ar : u == 0 ? "center" : c == 3 ? ar : sn, It = fe || u == 1 ? "middle" : c == 2 ? Nn : Ys;
      hs(bt, v, At, It);
      let lt = a.font[1] * a.lineGap, _t = ae.map((Ye) => B(h(Ye, T, D, G))), Et = a._values;
      for (let Ye = 0; Ye < Et.length; Ye++) {
        let at = Et[Ye];
        if (at != null) {
          u == 0 ? f = _t[Ye] : g = _t[Ye], at = "" + at;
          let Ei = at.indexOf(`
`) == -1 ? [at] : at.split(/\n/gm);
          for (let Ze = 0; Ze < Ei.length; Ze++) {
            let Ns = Ei[Ze];
            fe ? (m.save(), m.translate(f, g + Ze * lt), m.rotate(fe), m.fillText(Ns, 0, 0), m.restore()) : m.fillText(Ns, f, g + Ze * lt);
          }
        }
      }
      j.show && Yo(
        _t,
        j.filter(n, se, r, C, ee),
        u,
        c,
        Ae,
        Se,
        me(j.width * ce, 3),
        j.stroke(n, r),
        j.dash,
        j.cap
      );
      let Bt = a.grid;
      Bt.show && Yo(
        _t,
        Bt.filter(n, se, r, C, ee),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? pt : rt,
        u == 0 ? kt : tt,
        me(Bt.width * ce, 3),
        Bt.stroke(n, r),
        Bt.dash,
        Bt.cap
      ), L.show && Yo(
        [Ae],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? pt : rt,
        u == 1 ? kt : tt,
        me(L.width * ce, 3),
        L.stroke(n, r),
        L.dash,
        L.cap
      );
    }
    Fe("drawAxes");
  }
  function Zi(r) {
    $.forEach((a, c) => {
      c > 0 && (a._paths = null, r && (o == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let oo = !1, Zo = !1, Cn = [];
  function cc() {
    Zo = !1;
    for (let r = 0; r < Cn.length; r++)
      Fe(...Cn[r]);
    Cn.length = 0;
  }
  function Ji() {
    oo || (vh(gs), oo = !0);
  }
  function uc(r, a = !1) {
    oo = !0, Zo = a, r(n), gs(), a && Cn.length > 0 && queueMicrotask(cc);
  }
  n.batch = uc;
  function gs() {
    if (Ho && (tc(), Ho = !1), Vi && (qa(), Vi = !1), Qn) {
      if (ye(k, sn, ge), ye(k, Nn, Pe), ye(k, Hn, Y), ye(k, Rn, P), ye(E, sn, ge), ye(E, Nn, Pe), ye(E, Hn, Y), ye(E, Rn, P), ye(_, Hn, Kt), ye(_, Rn, vi), b.width = De(Kt * ce), b.height = De(vi * ce), I.forEach(({ _el: r, _show: a, _size: c, _pos: u, side: f }) => {
        if (r != null)
          if (a) {
            let g = f === 3 || f === 0 ? c : 0, v = f % 2 == 1;
            ye(r, v ? "left" : "top", u - g), ye(r, v ? "width" : "height", c), ye(r, v ? "top" : "left", v ? Pe : ge), ye(r, v ? "height" : "width", v ? P : Y), kr(r, Mi);
          } else
            ct(r, Mi);
      }), to = Yi = Io = jo = Uo = Vo = Wo = Go = Bo = null, it = 1, Dn(!0), ge != Ui || Pe != yi || Y != Lt || P != wi) {
        Zi(!1);
        let r = Y / Lt, a = P / wi;
        if (Ge && !xi && O.left >= 0) {
          O.left *= r, O.top *= a, Qi && jt(Qi, De(O.left), 0, Y, P), Xi && jt(Xi, 0, De(O.top), Y, P);
          for (let c = 0; c < gt.length; c++) {
            let u = gt[c];
            u != null && (Ki[c] *= r, qi[c] *= a, jt(u, yt(Ki[c]), yt(qi[c]), Y, P));
          }
        }
        if (_e.show && !Xn && _e.left >= 0 && _e.width > 0) {
          _e.left *= r, _e.width *= r, _e.top *= a, _e.height *= a;
          for (let c in ir)
            ye(nn, c, _e[c]);
        }
        Ui = ge, yi = Pe, Lt = Y, wi = P;
      }
      Fe("setSize"), Qn = !1;
    }
    Kt > 0 && vi > 0 && (m.clearRect(0, 0, b.width, b.height), Fe("drawClear"), q.forEach((r) => r()), Fe("draw")), _e.show && Xn && (ro(_e), Xn = !1), Ge && xi && (Ai(null, !0, !1), xi = !1), X.show && X.live && mt && (er(), mt = !1), d || (d = !0, n.status = 1, Fe("ready")), En = !1, oo = !1;
  }
  n.redraw = (r, a) => {
    Vi = a || !1, r !== !1 ? si(M, A.min, A.max) : Ji();
  };
  function Jo(r, a) {
    let c = S[r];
    if (c.from == null) {
      if (Be == 0) {
        let u = c.range(n, a.min, a.max, r);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (Be > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      r == M && c.distr == 2 && Be > 0 && (a.min = Tt(a.min, t[0]), a.max = Tt(a.max, t[0]), a.min == a.max && a.max++), F[r] = a, Ho = !0, Ji();
    }
  }
  n.setScale = Jo;
  let Qo, Xo, Qi, Xi, bs, _s, en, tn, vs, ys, be, $e, ri = !1;
  const je = O.drag;
  let He = je.x, Re = je.y;
  Ge && (O.x && (Qo = vt(Uu, E)), O.y && (Xo = vt(Vu, E)), A.ori == 0 ? (Qi = Qo, Xi = Xo) : (Qi = Xo, Xi = Qo), be = O.left, $e = O.top);
  const _e = n.select = Ce({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), nn = _e.show ? vt(ju, _e.over ? E : k) : null;
  function ro(r, a) {
    if (_e.show) {
      for (let c in r)
        _e[c] = r[c], c in ir && ye(nn, c, r[c]);
      a !== !1 && Fe("setSelect");
    }
  }
  n.setSelect = ro;
  function hc(r) {
    if ($[r].show)
      Te && kr(ke[r], Mi);
    else if (Te && ct(ke[r], Mi), Ge) {
      let c = Gi ? gt[0] : gt[r];
      c != null && jt(c, -10, -10, Y, P);
    }
  }
  function si(r, a, c) {
    Jo(r, { min: a, max: c });
  }
  function Rt(r, a, c, u) {
    a.focus != null && gc(r), a.show != null && $.forEach((f, g) => {
      g > 0 && (r == g || r == null) && (f.show = a.show, hc(g), o == 2 ? (si(f.facets[0].scale, null, null), si(f.facets[1].scale, null, null)) : si(f.scale, null, null), Ji());
    }), c !== !1 && Fe("setSeries", r, a), u && Mn("setSeries", n, r, a);
  }
  n.setSeries = Rt;
  function dc(r, a) {
    Ce(J[r], a);
  }
  function fc(r, a) {
    r.fill = ie(r.fill || null), r.dir = le(r.dir, -1), a = a ?? J.length, J.splice(a, 0, r);
  }
  function pc(r) {
    r == null ? J.length = 0 : J.splice(r, 1);
  }
  n.addBand = fc, n.setBand = dc, n.delBand = pc;
  function mc(r, a) {
    $[r].alpha = a, Ge && gt[r] != null && (gt[r].style.opacity = a), Te && ke[r] && (ke[r].style.opacity = a);
  }
  let qt, li, Si;
  const on = { focus: !0 };
  function gc(r) {
    if (r != Si) {
      let a = r == null, c = Ht.alpha != 1;
      $.forEach((u, f) => {
        if (o == 1 || f > 0) {
          let g = a || f == 0 || f == r;
          u._focus = a ? null : g, c && mc(f, g ? 1 : Ht.alpha);
        }
      }), Si = r, c && Ji();
    }
  }
  Te && Wi && Ke(Xs, ue, (r) => {
    O._lock || ($i(r), Si != null && Rt(null, on, !0, Ee.setSeries));
  });
  function Ft(r, a, c) {
    let u = S[a];
    c && (r = r / ce - (u.ori == 1 ? Pe : ge));
    let f = Y;
    u.ori == 1 && (f = P, r = f - r), u.dir == -1 && (r = f - r);
    let g = u._min, v = u._max, y = r / f, x = g + (v - g) * y, C = u.distr;
    return C == 3 ? fn(10, x) : C == 4 ? lh(x, u.asinh) : C == 100 ? u.bwd(x) : x;
  }
  function bc(r, a) {
    let c = Ft(r, M, a);
    return Tt(c, t[0], Oe, Le);
  }
  n.valToIdx = (r) => Tt(r, t[0]), n.posToIdx = bc, n.posToVal = Ft, n.valToPos = (r, a, c) => S[a].ori == 0 ? s(
    r,
    S[a],
    c ? tt : Y,
    c ? rt : 0
  ) : l(
    r,
    S[a],
    c ? kt : P,
    c ? pt : 0
  ), n.setCursor = (r, a, c) => {
    be = r.left, $e = r.top, Ai(null, a, c);
  };
  function ws(r, a) {
    ye(nn, sn, _e.left = r), ye(nn, Hn, _e.width = a);
  }
  function xs(r, a) {
    ye(nn, Nn, _e.top = r), ye(nn, Rn, _e.height = a);
  }
  let Tn = A.ori == 0 ? ws : xs, Pn = A.ori == 1 ? ws : xs;
  function _c() {
    if (Te && X.live)
      for (let r = o == 2 ? 1 : 0; r < $.length; r++) {
        if (r == 0 && ft)
          continue;
        let a = X.values[r], c = 0;
        for (let u in a)
          Ot[r][c++].firstChild.nodeValue = a[u];
      }
  }
  function er(r, a) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      de[u] = c;
    }) : hh(r.idx) || de.fill(r.idx), X.idx = de[0]), Te && X.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || o == 1 && !ft) && vc(c, de[c]);
      _c();
    }
    mt = !1, a !== !1 && Fe("setLegend");
  }
  n.setLegend = er;
  function vc(r, a) {
    let c = $[r], u = r == 0 && Z == 2 ? St : t[r], f;
    ft ? f = c.values(n, r, a) ?? ni : (f = c.value(n, a == null ? null : u[a], r, a), f = f == null ? ni : { _: f }), X.values[r] = f;
  }
  function Ai(r, a, c) {
    vs = be, ys = $e, [be, $e] = O.move(n, be, $e), O.left = be, O.top = $e, Ge && (Qi && jt(Qi, De(be), 0, Y, P), Xi && jt(Xi, 0, De($e), Y, P));
    let u, f = Oe > Le;
    qt = pe, li = null;
    let g = A.ori == 0 ? Y : P, v = A.ori == 1 ? Y : P;
    if (be < 0 || Be == 0 || f) {
      u = O.idx = null;
      for (let y = 0; y < $.length; y++) {
        let x = gt[y];
        x != null && jt(x, -10, -10, Y, P);
      }
      Wi && Rt(null, on, !0, r == null && Ee.setSeries), X.live && (de.fill(u), mt = !0);
    } else {
      let y, x, C;
      o == 1 && (y = A.ori == 0 ? be : $e, x = Ft(y, M), u = O.idx = Tt(x, t[0], Oe, Le), C = N(t[0][u], A, g, 0));
      let T = -10, D = -10, G = 0, ae = 0, se = !0, ee = "", j = "";
      for (let L = o == 2 ? 1 : 0; L < $.length; L++) {
        let ve = $[L], Se = de[L], Ie = Se == null ? null : o == 1 ? t[L][Se] : t[L][1][Se], fe = O.dataIdx(n, L, u, x), Ae = fe == null ? null : o == 1 ? t[L][fe] : t[L][1][fe];
        if (mt = mt || Ae != Ie || fe != Se, de[L] = fe, L > 0 && ve.show) {
          let st = fe == null ? -10 : fe == u ? C : N(o == 1 ? t[0][fe] : t[L][0][fe], A, g, 0), qe = Ae == null ? -10 : W(Ae, o == 1 ? S[ve.scale] : S[ve.facets[1].scale], v, 0);
          if (Wi && Ae != null) {
            let bt = A.ori == 1 ? be : $e, At = Me(Ht.dist(n, L, fe, qe, bt));
            if (At < qt) {
              let It = Ht.bias;
              if (It != 0) {
                let lt = Ft(bt, ve.scale), _t = Ae >= 0 ? 1 : -1, Et = lt >= 0 ? 1 : -1;
                Et == _t && (Et == 1 ? It == 1 ? Ae >= lt : Ae <= lt : (
                  // >= 0
                  It == 1 ? Ae <= lt : Ae >= lt
                )) && (qt = At, li = L);
              } else
                qt = At, li = L;
            }
          }
          if (mt || Gi) {
            let bt, At;
            A.ori == 0 ? (bt = st, At = qe) : (bt = qe, At = st);
            let It, lt, _t, Et, Bt, Ye, at = !0, Ei = Ve.bbox;
            if (Ei != null) {
              at = !1;
              let Ze = Ei(n, L);
              _t = Ze.left, Et = Ze.top, It = Ze.width, lt = Ze.height;
            } else
              _t = bt, Et = At, It = lt = Ve.size(n, L);
            if (Ye = Ve.fill(n, L), Bt = Ve.stroke(n, L), Gi)
              L == li && qt <= Ht.prox && (T = _t, D = Et, G = It, ae = lt, se = at, ee = Ye, j = Bt);
            else {
              let Ze = gt[L];
              Ze != null && (Ki[L] = _t, qi[L] = Et, sl(Ze, It, lt, at), ol(Ze, Ye, Bt), jt(Ze, yt(_t), yt(Et), Y, P));
            }
          }
        }
      }
      if (Gi) {
        let L = Ht.prox, ve = Si == null ? qt <= L : qt > L || li != Si;
        if (mt || ve) {
          let Se = gt[0];
          Se != null && (Ki[0] = T, qi[0] = D, sl(Se, G, ae, se), ol(Se, ee, j), jt(Se, yt(T), yt(D), Y, P));
        }
      }
    }
    if (_e.show && ri)
      if (r != null) {
        let [y, x] = Ee.scales, [C, T] = Ee.match, [D, G] = r.cursor.sync.scales, ae = r.cursor.drag;
        if (He = ae._x, Re = ae._y, He || Re) {
          let { left: se, top: ee, width: j, height: L } = r.select, ve = r.scales[D].ori, Se = r.posToVal, Ie, fe, Ae, st, qe, bt = y != null && C(y, D), At = x != null && T(x, G);
          bt && He ? (ve == 0 ? (Ie = se, fe = j) : (Ie = ee, fe = L), Ae = S[y], st = N(Se(Ie, D), Ae, g, 0), qe = N(Se(Ie + fe, D), Ae, g, 0), Tn(Pt(st, qe), Me(qe - st))) : Tn(0, g), At && Re ? (ve == 1 ? (Ie = se, fe = j) : (Ie = ee, fe = L), Ae = S[x], st = W(Se(Ie, G), Ae, v, 0), qe = W(Se(Ie + fe, G), Ae, v, 0), Pn(Pt(st, qe), Me(qe - st))) : Pn(0, v);
        } else
          nr();
      } else {
        let y = Me(vs - bs), x = Me(ys - _s);
        if (A.ori == 1) {
          let G = y;
          y = x, x = G;
        }
        He = je.x && y >= je.dist, Re = je.y && x >= je.dist;
        let C = je.uni;
        C != null ? He && Re && (He = y >= C, Re = x >= C, !He && !Re && (x > y ? Re = !0 : He = !0)) : je.x && je.y && (He || Re) && (He = Re = !0);
        let T, D;
        He && (A.ori == 0 ? (T = en, D = be) : (T = tn, D = $e), Tn(Pt(T, D), Me(D - T)), Re || Pn(0, v)), Re && (A.ori == 1 ? (T = en, D = be) : (T = tn, D = $e), Pn(Pt(T, D), Me(D - T)), He || Tn(0, g)), !He && !Re && (Tn(0, 0), Pn(0, 0));
      }
    if (je._x = He, je._y = Re, r == null) {
      if (c) {
        if (zs != null) {
          let [y, x] = Ee.scales;
          Ee.values[0] = y != null ? Ft(A.ori == 0 ? be : $e, y) : null, Ee.values[1] = x != null ? Ft(A.ori == 1 ? be : $e, x) : null;
        }
        Mn(cr, n, be, $e, Y, P, u);
      }
      if (Wi) {
        let y = c && Ee.setSeries, x = Ht.prox;
        Si == null ? qt <= x && Rt(li, on, !0, y) : qt > x ? Rt(null, on, !0, y) : li != Si && Rt(li, on, !0, y);
      }
    }
    mt && (X.idx = u, er()), a !== !1 && Fe("setCursor");
  }
  let ai = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ai == null && Dn(!1), ai;
    }
  });
  function Dn(r = !1) {
    r ? ai = null : (ai = E.getBoundingClientRect(), Fe("syncRect", ai));
  }
  function $s(r, a, c, u, f, g, v) {
    O._lock || ri && r != null && r.movementX == 0 && r.movementY == 0 || (tr(r, a, c, u, f, g, v, !1, r != null), r != null ? Ai(null, !0, !0) : Ai(a, !0, !1));
  }
  function tr(r, a, c, u, f, g, v, y, x) {
    if (ai == null && Dn(!1), $i(r), r != null)
      c = r.clientX - ai.left, u = r.clientY - ai.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [C, T] = Ee.scales, D = a.cursor.sync, [G, ae] = D.values, [se, ee] = D.scales, [j, L] = Ee.match, ve = a.axes[0].side % 2 == 1, Se = A.ori == 0 ? Y : P, Ie = A.ori == 1 ? Y : P, fe = ve ? g : f, Ae = ve ? f : g, st = ve ? u : c, qe = ve ? c : u;
      if (se != null ? c = j(C, se) ? h(G, S[C], Se, 0) : -10 : c = Se * (st / fe), ee != null ? u = L(T, ee) ? h(ae, S[T], Ie, 0) : -10 : u = Ie * (qe / Ae), A.ori == 1) {
        let bt = c;
        c = u, u = bt;
      }
    }
    x && (a == null || a.cursor.event.type == cr) && ((c <= 1 || c >= Y - 1) && (c = Pi(c, Y)), (u <= 1 || u >= P - 1) && (u = Pi(u, P))), y ? (bs = c, _s = u, [en, tn] = O.move(n, c, u)) : (be = c, $e = u);
  }
  const ir = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function nr() {
    ro(ir, !1);
  }
  let ks, Ss, As, Es;
  function Cs(r, a, c, u, f, g, v) {
    ri = !0, He = Re = je._x = je._y = !1, tr(r, a, c, u, f, g, v, !0, !1), r != null && (Ke(ur, xr, Ts, !1), Mn(Js, n, en, tn, Y, P, null));
    let { left: y, top: x, width: C, height: T } = _e;
    ks = y, Ss = x, As = C, Es = T;
  }
  function Ts(r, a, c, u, f, g, v) {
    ri = je._x = je._y = !1, tr(r, a, c, u, f, g, v, !1, !0);
    let { left: y, top: x, width: C, height: T } = _e, D = C > 0 || T > 0, G = ks != y || Ss != x || As != C || Es != T;
    if (D && G && ro(_e), je.setScale && D && G) {
      let ae = y, se = C, ee = x, j = T;
      if (A.ori == 1 && (ae = x, se = T, ee = y, j = C), He && si(
        M,
        Ft(ae, M),
        Ft(ae + se, M)
      ), Re)
        for (let L in S) {
          let ve = S[L];
          L != M && ve.from == null && ve.min != pe && si(
            L,
            Ft(ee + j, L),
            Ft(ee, L)
          );
        }
      nr();
    } else O.lock && (O._lock = !O._lock, Ai(a, !0, r != null));
    r != null && (ji(ur, xr), Mn(ur, n, be, $e, Y, P, null));
  }
  function yc(r, a, c, u, f, g, v) {
    if (O._lock)
      return;
    $i(r);
    let y = ri;
    if (ri) {
      let x = !0, C = !0, T = 10, D, G;
      A.ori == 0 ? (D = He, G = Re) : (D = Re, G = He), D && G && (x = be <= T || be >= Y - T, C = $e <= T || $e >= P - T), D && x && (be = be < en ? 0 : Y), G && C && ($e = $e < tn ? 0 : P), Ai(null, !0, !0), ri = !1;
    }
    be = -10, $e = -10, de.fill(null), Ai(null, !0, !0), y && (ri = y);
  }
  function Ps(r, a, c, u, f, g, v) {
    O._lock || ($i(r), Fo(), nr(), r != null && Mn(el, n, be, $e, Y, P, null));
  }
  function Ds() {
    I.forEach(Ed), Ro(n.width, n.height, !0);
  }
  Oi(wo, un, Ds);
  const rn = {};
  rn.mousedown = Cs, rn.mousemove = $s, rn.mouseup = Ts, rn.dblclick = Ps, rn.setSeries = (r, a, c, u) => {
    let f = Ee.match[2];
    c = f(n, a, c), c != -1 && Rt(c, u, !0, !1);
  }, Ge && (Ke(Js, E, Cs), Ke(cr, E, $s), Ke(Qs, E, (r) => {
    $i(r), Dn(!1);
  }), Ke(Xs, E, yc), Ke(el, E, Ps), Pr.add(n), n.syncRect = Dn);
  const so = n.hooks = e.hooks || {};
  function Fe(r, a, c) {
    Zo ? Cn.push([r, a, c]) : r in so && so[r].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let a in r.hooks)
      so[a] = (so[a] || []).concat(r.hooks[a]);
  });
  const Ms = (r, a, c) => c, Ee = Ce({
    key: null,
    setSeries: !1,
    filters: {
      pub: hl,
      sub: hl
    },
    scales: [M, $[1] ? $[1].scale : null],
    match: [dl, dl, Ms],
    values: [null, null]
  }, O.sync);
  Ee.match.length == 2 && Ee.match.push(Ms), O.sync = Ee;
  const zs = Ee.key, or = Na(zs);
  function Mn(r, a, c, u, f, g, v) {
    Ee.filters.pub(r, a, c, u, f, g, v) && or.pub(r, a, c, u, f, g, v);
  }
  or.sub(n);
  function wc(r, a, c, u, f, g, v) {
    Ee.filters.sub(r, a, c, u, f, g, v) && rn[r](null, a, c, u, f, g, v);
  }
  n.pub = wc;
  function xc() {
    or.unsub(n), Pr.delete(n), _i.clear(), Sr(wo, un, Ds), p.remove(), ue?.remove(), Fe("destroy");
  }
  n.destroy = xc;
  function rr() {
    Fe("init", e, t), cs(t || e.data, !1), F[M] ? Jo(M, F[M]) : Fo(), Xn = _e.show && (_e.width > 0 || _e.height > 0), xi = mt = !0, Ro(e.width, e.height);
  }
  return $.forEach(ls), I.forEach(ec), i ? i instanceof HTMLElement ? (i.appendChild(p), rr()) : i(n, rr) : rr(), n;
}
We.assign = Ce;
We.fmtNum = qr;
We.rangeNum = xo;
We.rangeLog = Co;
We.rangeAsinh = Gr;
We.orient = Fi;
We.pxRatio = ce;
We.join = _h;
We.fmtDate = Zr, We.tzDate = Th;
We.sync = Na;
{
  We.addGap = hd, We.clipGaps = Do;
  let e = We.paths = {
    points: Ia
  };
  e.linear = ja, e.stepped = pd, e.bars = md, e.spline = bd;
}
const Cd = 24;
async function Td(e, t, i, n) {
  const o = new Date(Date.now() - i * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (l) => {
      const h = l.states ?? {};
      if (Object.keys(h).length === 0) {
        Object.keys(s).length > 0 && n(s);
        return;
      }
      const d = (Date.now() - i * 60 * 60 * 1e3) / 1e3;
      for (const [p, b] of Object.entries(h)) {
        const m = s[p] ?? [];
        s[p] = [...m, ...b].filter((_) => _.lu >= d);
      }
      n(s);
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
function Ln(e) {
  if (!e) return [];
  const t = [];
  for (const i of e) {
    const n = parseFloat(i.s);
    Number.isFinite(n) && t.push([i.lu, n]);
  }
  return t.sort((i, n) => i[0] - n[0]), t;
}
function Pd(e, t) {
  const i = /* @__PURE__ */ new Set();
  for (const s of e) for (const [l] of s) i.add(l);
  if (i.size === 0)
    return [[t], ...e.map(() => [null])];
  const n = [...i].sort((s, l) => s - l), o = e.map((s) => {
    let l = -1, h = null;
    return n.map((d) => {
      for (; l + 1 < s.length && s[l + 1][0] <= d; )
        l++, h = s[l][1];
      return h;
    });
  });
  return [n, ...o];
}
const Dd = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Md = Object.defineProperty, Oo = (e, t, i, n) => {
  for (var o = void 0, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = l(t, i, o) || o);
  return o && Md(t, i, o), o;
};
const zd = [
  Xe,
  Or(Dd),
  Ue`
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
], Nl = () => {
};
class $n extends ze {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = zd;
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
    this._resizeObserver = new ResizeObserver((i) => {
      const n = i[0]?.contentRect.width ?? 0;
      this._plot && n > 0 && this._plot.setSize({ width: n, height: t });
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
  _resolveColor(t, i) {
    return getComputedStyle(this).getPropertyValue(t).trim() || i;
  }
  _destroyPlot() {
    this._plot && (this._plot.destroy(), this._plot = null), this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null);
  }
}
Oo([
  ne()
], $n.prototype, "_loading");
Oo([
  ne()
], $n.prototype, "_error");
Oo([
  ne()
], $n.prototype, "_empty");
Oo([
  _n(".chart-host")
], $n.prototype, "_host");
var Nd = Object.defineProperty, Od = Object.getOwnPropertyDescriptor, ii = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Od(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Nd(t, i, o), o;
};
const Mr = 260, Ld = 3;
let zt = class extends $n {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return Mr;
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
    this._unsubscribe && this._unsubscribe !== Nl && this._unsubscribe(), this._unsubscribe = Nl;
    const e = Ld + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
    this._plot && this._plot.series.length !== 1 + e && this._destroyPlot();
    const t = ++this._fetchGen;
    this._loading = !0, this._error = null, this._empty = !1;
    const i = [
      this.roomEntity,
      this.lowEntity,
      this.highEntity,
      this.actionEntity,
      this.apparentEntity,
      this.humidityEntity
    ].filter((n) => !!n);
    try {
      const n = await Td(this.hass, i, Cd, (o) => {
        t === this._fetchGen && (this._renderPlot(o), this._loading = !1);
      });
      if (t !== this._fetchGen) {
        n();
        return;
      }
      this._unsubscribe = n;
    } catch (n) {
      if (t !== this._fetchGen) return;
      this._error = n instanceof Error ? n.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
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
    const i = new Set(this._hiddenLabels), n = i.has(e);
    n ? i.delete(e) : i.add(e), this._hiddenLabels = i, this._plot && this._plot.setSeries(t, { show: n });
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
    const i = [...e].sort((o, s) => o.lu - s.lu), n = [];
    for (let o = 0; o < i.length; o++) {
      const s = i[o].lu, l = i[o + 1]?.lu ?? t, h = i[o].s;
      (h === "heating" || h === "cooling") && n.push({ start: s, end: l, action: h });
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), i = Ln(e[this.roomEntity]), n = Ln(e[this.lowEntity]), o = Ln(e[this.highEntity]), s = this._hasApparent ? Ln(e[this.apparentEntity]) : [], l = this._hasHumidity ? Ln(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && o.length === 0 && s.length === 0 && l.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const h = [i, n, o];
    this._hasApparent && h.push(s), this._hasHumidity && h.push(l);
    const d = Pd(h, t), p = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: p.width, height: p.height }), this._plot.setData(d), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new We(p, d, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = this._resolveColor("--cb-action-heating", "#d9603f"), i = this._resolveColor("--cb-action-cooling", "#2f7fcc"), n = this._resolveColor("--primary-color", "#03a9f4"), o = this._resolveColor("--secondary-text-color", "#727272"), s = this._resolveColor("--divider-color", "#e0e0e0"), l = [
      {},
      {
        label: "Room",
        stroke: n,
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
        stroke: i,
        width: 1.5,
        dash: [6, 3],
        spanGaps: !0,
        show: !this._hiddenLabels.has("High band")
      }
    ];
    this._hasApparent && l.push({
      label: "Apparent",
      stroke: n,
      width: 1.5,
      dash: [4, 3],
      spanGaps: !0,
      show: !this._hiddenLabels.has("Apparent")
    }), this._hasHumidity && l.push({
      label: "Humidity",
      scale: "y2",
      stroke: o,
      width: 1.2,
      spanGaps: !0,
      show: !this._hiddenLabels.has("Humidity")
    });
    const h = [
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
    this._hasHumidity && h.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: o,
      grid: { show: !1 },
      values: (p, b) => b.map((m) => `${m.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: Mr,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: d,
      axes: h,
      series: l,
      hooks: {
        draw: [
          (p) => {
            const b = p.ctx;
            if (!b) return;
            const m = p.bbox.top, _ = p.bbox.height;
            b.save();
            for (const k of this._intervals) {
              const E = p.valToPos(k.start, "x", !0), z = p.valToPos(k.end, "x", !0);
              z <= E || (b.fillStyle = k.action === "heating" ? Ol(t, 0.18) : Ol(i, 0.18), b.fillRect(E, m, z - E, _));
            }
            b.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return w`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return w`
      ${this._loading ? w`<div class="status">Loading 24 h history…</div>` : U}
      ${this._error ? w`<div class="status">${this._error}</div>` : U}
      ${this._empty ? w`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : U}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? U : this._renderLegend()}
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
    return w`<div class="legend">
      ${this._toggleItem(
      "Room",
      w`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      w`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : U}
      ${this._toggleItem(
      "Low band",
      w`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      w`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      w`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
      "Humidity (%, right axis)"
    ) : U}
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
  _toggleItem(e, t, i) {
    const n = this._hiddenLabels.has(e);
    return w`<span
      class="toggle ${n ? "hidden" : ""}"
      role="button"
      tabindex="0"
      aria-pressed=${n ? "true" : "false"}
      @click=${() => this._toggleLabel(e)}
      @keydown=${(o) => this._onLabelKeyDown(o, e)}
      >${t}${i ?? e}</span
    >`;
  }
};
zt.styles = [
  ...$n.styles,
  Ue`
      .chart-host {
        height: ${Or(Mr)}px;
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
ii([
  R({ attribute: !1 })
], zt.prototype, "hass", 2);
ii([
  R({ type: String })
], zt.prototype, "roomEntity", 2);
ii([
  R({ type: String })
], zt.prototype, "lowEntity", 2);
ii([
  R({ type: String })
], zt.prototype, "highEntity", 2);
ii([
  R({ type: String })
], zt.prototype, "actionEntity", 2);
ii([
  R({ type: String })
], zt.prototype, "apparentEntity", 2);
ii([
  R({ type: String })
], zt.prototype, "humidityEntity", 2);
ii([
  ne()
], zt.prototype, "_hiddenLabels", 2);
zt = ii([
  Qe("comfort-band-history-chart")
], zt);
function Ol(e, t) {
  const i = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), d = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${d}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : i;
}
var Hd = Object.defineProperty, Rd = Object.getOwnPropertyDescriptor, ns = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Rd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Hd(t, i, o), o;
};
let qn = class extends ze {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return w`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = oa(this.hass, e), n = t ?? "", o = t && i ? i : "";
    return w`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
        .apparentEntity=${n}
        .humidityEntity=${o}
      ></comfort-band-history-chart>
      ${this._renderOverlayHint(t, i)}
    `;
  }
  /** Hint banner shown when one of the optional overlays can't render.
   *  Covers both the apparent-missing and humidity-missing cases (was
   *  `_renderApparentSection` pre-v0.8.2, which chose between rendering
   *  the standalone apparent chart OR a hint; the v0.8.2 merge removed
   *  the chart branch and renamed accordingly). Priority order: apparent
   *  missing first (pre-v0.4 backend — pointing at Settings would chain
   *  to a second upgrade hint), then humidity (configurable via Settings
   *  → OptionsFlow). Both present → no hint. */
  _renderOverlayHint(e, t) {
    return e ? t ? U : w`<div class="hint">
        Configure a humidity sensor in the Settings tab to also add humidity to the chart.
      </div>` : w`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
qn.styles = [
  Xe,
  Ue`
      :host {
        display: block;
        padding: var(--cb-gap-md);
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
         different: the Insights tab uses a top border to separate the
         hint from the band chart sitting above it. */
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
ns([
  R({ attribute: !1 })
], qn.prototype, "hass", 2);
ns([
  R({ attribute: !1 })
], qn.prototype, "entities", 2);
qn = ns([
  Qe("comfort-band-insights-tab")
], qn);
var Fd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, Ga = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Id(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Fd(t, i, o), o;
};
const fo = 14, po = 28, ln = 600, mo = 200, mr = [0, 6, 12, 18, 24], Ll = [14, 18, 22, 26];
function Ni(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function Bd(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let ko = class extends ze {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * ln;
  }
  _tempToY(e) {
    const t = Bd(e, fo, po);
    return mo - (t - fo) / (po - fo) * mo;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const i = e[e.length - 1][t], n = [[0, this._tempToY(i)]];
    let o = i;
    for (const s of e) {
      const l = this._timeToX(Ni(s.at));
      n.push([l, this._tempToY(o)]), n.push([l, this._tempToY(s[t])]), o = s[t];
    }
    return n.push([ln, this._tempToY(o)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, d) => Ni(h.at) - Ni(d.at)), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return w`
      <div class="chart">
        <svg
          viewBox="0 0 ${ln} ${mo}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${Ll.map(
      (h) => di`<line class="grid" x1="0" x2=${ln} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${mr.map(
      (h) => di`<line class="grid" y1="0" y2=${mo} x1=${h / 24 * ln} x2=${h / 24 * ln}></line>`
    )}
          ${t ? di`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const d = this._timeToX(Ni(h.at));
      return di`
              <circle class="marker low" cx=${d} cy=${this._tempToY(h.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(h.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${Ll.map(
      (h) => w`<div
              class="axis-label y"
              style="top: ${(po - h) / (po - fo) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${mr.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === mr.length - 1 ? "axis-label x end" : "axis-label x";
      return w`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
      </div>
    `;
  }
};
ko.styles = [
  Xe,
  Ue`
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
Ga([
  R({ type: Array })
], ko.prototype, "transitions", 2);
ko = Ga([
  Qe("comfort-band-schedule-chart")
], ko);
var jd = Object.defineProperty, Ud = Object.getOwnPropertyDescriptor, gi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ud(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && jd(t, i, o), o;
};
let Ut = class extends ze {
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
    return w`
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
      ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : w`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Ut.styles = [
  Xe,
  Ue`
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
gi([
  R({ type: Object })
], Ut.prototype, "transition", 2);
gi([
  R({ type: Boolean })
], Ut.prototype, "isNew", 2);
gi([
  ne()
], Ut.prototype, "_at", 2);
gi([
  ne()
], Ut.prototype, "_low", 2);
gi([
  ne()
], Ut.prototype, "_high", 2);
gi([
  ne()
], Ut.prototype, "_error", 2);
gi([
  _n('input[name="at"]')
], Ut.prototype, "_atInput", 2);
Ut = gi([
  Qe("transition-edit-dialog")
], Ut);
var Vd = Object.defineProperty, Wd = Object.getOwnPropertyDescriptor, Nt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Vd(t, i, o), o;
};
function Hl(e, t) {
  return Ni(e.at) - Ni(t.at);
}
const gr = 15, br = 24 * 60;
function Gd(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((n) => Ni(n.at))), i = Math.max(...t);
  for (let n = 1; n <= br / gr; n++) {
    const o = (i + n * gr) % br;
    if (!t.has(o)) return Rl(o);
  }
  return Rl((i + gr) % br);
}
function Rl(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
let ht = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = Gd(this._transitions), this._newLow = Fl(this._transitions), this._newHigh = Il(this._transitions), this._editing = null, this._mode = "add";
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
      const i = this._transitions.filter((n) => n.at !== t);
      await this._writeSchedule(i), this.updateComplete.then(() => this._restoreFocus());
    }, this._onConfirmKeydown = (e) => {
      e.key === "Escape" && (e.preventDefault(), this._confirmingDeleteAt = null, this.updateComplete.then(() => this._restoreFocus()));
    }, this._onDialogSave = async (e) => {
      const t = e.detail.transition, i = [];
      if (this._mode === "edit" && this._editing) {
        const n = this._editing.at;
        for (const o of this._transitions)
          o.at !== n && o.at !== t.at && i.push(o);
        i.push(t);
      } else {
        for (const n of this._transitions)
          n.at !== t.at && i.push(n);
        i.push(t);
      }
      i.sort(Hl), await this._writeSchedule(i), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = _r(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = _r(this.hass);
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
      const t = await au(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(Hl) : [], this._loading = !1);
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
    let i = null;
    if (e.kind === "add")
      i = t.querySelector(".list-toolbar button.primary");
    else {
      const n = t.querySelector(`li.row[data-at="${e.at}"]`);
      n && e.button === "edit" ? i = n.querySelector("button.secondary") : n && e.button === "delete" ? i = n.querySelector("button.danger") : i = n;
    }
    i = i ?? t.querySelector(".list-toolbar button.primary"), i?.focus();
  }
  async _writeSchedule(e) {
    if (!this.hass) return;
    const t = this._transitions;
    this._transitions = e;
    try {
      await cu(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return U;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? Fl(this._transitions),
        high: this._newHigh ?? Il(this._transitions)
      };
      return w`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return w`
      ${this._renderHeader()}
      ${this._loading ? w`<div class="loading">Loading schedule…</div>` : this._error ? w`<div class="error" role="alert">${this._error}</div>` : w`
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
    const e = this.hass ? _r(this.hass) : null;
    return !e || e === "unavailable" || e === "unknown" ? U : w`<div class="header">
      <span class="profile-label">Schedule: ${e}</span>
    </div>`;
  }
  _renderList() {
    return this._transitions.length === 0 ? w`<div class="empty">No changes yet. Use “Add a change” to create one.</div>` : w`
      <ul class="list" role="list">
        ${this._transitions.map(
      (e) => this._confirmingDeleteAt === e.at ? this._renderConfirmRow(e) : this._renderRow(e)
    )}
      </ul>
    `;
  }
  _renderRow(e) {
    const t = Ks(e.at, this.hass), i = `Edit the ${t} change, ${yo(e.low)} to ${yo(e.high)} degrees`;
    return w`
      <li
        class="row"
        role="listitem"
        tabindex="0"
        data-at=${e.at}
        aria-label=${i}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${t}</span>
        <span class="band">${Gn(e)}</span>
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
    const t = `Delete the ${Ks(e.at, this.hass)} change?`;
    return w`
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
ht.styles = [
  Xe,
  Ue`
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
        /* Room for "10:30 PM", so the ranges line up on a 12-hour clock. */
        min-width: 5.5em;
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
Nt([
  R({ attribute: !1 })
], ht.prototype, "hass", 2);
Nt([
  R({ type: String })
], ht.prototype, "zone", 2);
Nt([
  ne()
], ht.prototype, "_profile", 2);
Nt([
  ne()
], ht.prototype, "_transitions", 2);
Nt([
  ne()
], ht.prototype, "_loading", 2);
Nt([
  ne()
], ht.prototype, "_error", 2);
Nt([
  ne()
], ht.prototype, "_mode", 2);
Nt([
  ne()
], ht.prototype, "_editing", 2);
Nt([
  ne()
], ht.prototype, "_newAt", 2);
Nt([
  ne()
], ht.prototype, "_confirmingDeleteAt", 2);
ht = Nt([
  Qe("comfort-band-schedule-tab")
], ht);
function _r(e) {
  const t = na(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Fl(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Il(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Kd = Object.defineProperty, qd = Object.getOwnPropertyDescriptor, kn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? qd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Kd(t, i, o), o;
};
let mi = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingByEntity = {}, this._error = null, this._onToggle = async (e) => {
      if (!this.hass) return;
      const t = !this._isOn(e);
      this._pendingByEntity = { ...this._pendingByEntity, [e]: t }, this._error = null;
      try {
        await this.hass.callService("switch", t ? "turn_on" : "turn_off", {
          entity_id: e
        });
      } catch (i) {
        this._error = i instanceof Error ? i.message : "Failed to toggle switch.";
      } finally {
        const i = { ...this._pendingByEntity };
        delete i[e], this._pendingByEntity = i;
      }
    };
  }
  /** Resolve the displayed state: optimistic flip wins if one is in flight,
   *  otherwise read the entity. */
  _isOn(e) {
    const t = this._pendingByEntity[e];
    return t ?? this.hass?.states[e]?.state === "on";
  }
  render() {
    if (!this.hass || !this.entities) return U;
    const e = this.entities.useApparentTemperature, t = this.entities.learningEnabled;
    if (e === null || t === null)
      return w`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const i = oa(this.hass, this.entities.roomTemperature);
    return w`
      ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : U}
      ${this._renderToggle({
      entityId: e,
      title: "Use apparent temperature",
      desc: w`When on, heating and cooling decisions use the humidity-adjusted "feels like"
        value instead of the raw sensor. Falls back to the raw value automatically if the humidity
        sensor is unavailable.`
    })}
      ${this._renderToggle({
      entityId: t,
      title: "Learning enabled",
      // Mirrors the integration's control gate: on, the learned predictor
      // decides (and MPC, when its own switch is on and it is ready); off,
      // plain on/off at the deadband edges. Samples are recorded either way.
      desc: w`Uses what this room has learned about how quickly it warms and cools to time
        heating and cooling: starting early rather than waiting for the room to get too cold or
        warm, stopping early so it doesn't overshoot, and holding off while it's already heading
        back on its own. Predictive control (the “MPC enabled” switch) needs this on too. While it's
        off, the room keeps recording readings; it just doesn't act on what it has learned.`
    })}
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">
            Configure via Settings → Devices &amp; Services → Comfort Band → Configure.
          </div>
        </div>
        <div class="info-value ${i ? "" : "unconfigured"}">
          ${i ?? "Not configured"}
        </div>
      </div>
    `;
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), i = this._pendingByEntity[e.entityId] !== void 0;
    return w`
      <div class="row">
        <div class="row-label">
          <div class="title">${e.title}</div>
          <div class="desc">${e.desc}</div>
        </div>
        <button
          class="toggle"
          role="switch"
          aria-checked=${t ? "true" : "false"}
          aria-disabled=${i ? "true" : "false"}
          aria-label=${e.title}
          @click=${i ? null : () => this._onToggle(e.entityId)}
        >
          <span class="knob"></span>
        </button>
      </div>
    `;
  }
};
mi.styles = [
  Xe,
  Ue`
      :host {
        display: block;
        padding: var(--cb-gap-md);
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
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 12px;
        color: var(--cb-text-primary);
        word-break: break-all;
      }
      .info-value.unconfigured {
        font-style: italic;
        color: var(--cb-text-secondary);
        font-family: inherit;
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
    `
];
kn([
  R({ attribute: !1 })
], mi.prototype, "hass", 2);
kn([
  R({ type: String })
], mi.prototype, "zone", 2);
kn([
  R({ attribute: !1 })
], mi.prototype, "entities", 2);
kn([
  ne()
], mi.prototype, "_pendingByEntity", 2);
kn([
  ne()
], mi.prototype, "_error", 2);
mi = kn([
  Qe("comfort-band-settings-tab")
], mi);
var Yd = Object.defineProperty, Zd = Object.getOwnPropertyDescriptor, bi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Yd(t, i, o), o;
};
const Ti = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" }
];
let Vt = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Ti.findIndex((o) => o.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + Ti.length) % Ti.length;
          break;
        case "ArrowRight":
          i = (t + 1) % Ti.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Ti.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = Ti[i].id;
      this._activeTab = n, this.updateComplete.then(() => {
        this.renderRoot.querySelector(`#cb-tab-${n}`)?.focus();
      });
    };
  }
  open() {
    this._isOpen = !0, this.updateComplete.then(() => this._dialog?.showModal());
  }
  close() {
    this._dialog?.close();
  }
  selectTab(e) {
    this._activeTab = e;
  }
  render() {
    if (!this._isOpen) return U;
    const e = this.zoneName || this.zone || "Comfort Band";
    return w`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Ti.map(
      (t) => w`
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
        return w`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return w`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return w`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "settings":
        return w`<comfort-band-settings-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`;
      case "insights":
        return w`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Vt.styles = [
  Xe,
  Ue`
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
bi([
  R({ attribute: !1 })
], Vt.prototype, "hass", 2);
bi([
  R({ type: String })
], Vt.prototype, "zone", 2);
bi([
  R({ type: String })
], Vt.prototype, "zoneName", 2);
bi([
  R({ attribute: !1 })
], Vt.prototype, "entities", 2);
bi([
  ne()
], Vt.prototype, "_activeTab", 2);
bi([
  ne()
], Vt.prototype, "_isOpen", 2);
bi([
  _n("dialog")
], Vt.prototype, "_dialog", 2);
Vt = bi([
  Qe("comfort-band-modal")
], Vt);
var Jd = Object.defineProperty, Qd = Object.getOwnPropertyDescriptor, os = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Qd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Jd(t, i, o), o;
};
let Yn = class extends ze {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (e) => {
      const t = e.target.value;
      this._fireConfig({ ...this.config, zone: t });
    }, this._onNameChange = (e) => {
      const t = e.target, i = t.value.trim();
      t.value = i;
      const n = { ...this.config };
      i ? n.name = i : delete n.name, this._fireConfig(n);
    }, this._onCompactChange = (e) => {
      const t = e.target.checked, i = { ...this.config };
      t ? i.compact = !0 : delete i.compact, this._fireConfig(i);
    }, this._onVariantChange = (e) => {
      const t = e.target.value, i = { ...this.config };
      t === "mini" ? i.variant = "mini" : delete i.variant, this._fireConfig(i);
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
      for (const [i, n] of t.identifiers)
        i === "comfort_band" && n.startsWith("zone:") && e.push(n.slice(5));
    return e.sort();
  }
  /** The name the card shows when `name` is unset, used as the placeholder. */
  _defaultName() {
    if (!this.hass || !this.config.zone) return "";
    const e = ia(this.hass, this.config.zone);
    return ra(this.hass, { zone: this.config.zone }, e);
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
      return w`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return w`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? w`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (i) => w` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
Yn.styles = [
  Xe,
  Ue`
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
os([
  R({ attribute: !1 })
], Yn.prototype, "hass", 2);
os([
  R({ attribute: !1 })
], Yn.prototype, "config", 2);
Yn = os([
  Qe("comfort-band-card-editor")
], Yn);
var Xd = Object.defineProperty, ef = Object.getOwnPropertyDescriptor, Lo = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ef(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Xd(t, i, o), o;
};
let bn = class extends ze {
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
      for (const i of Object.values(e.devices)) {
        for (const [n, o] of i.identifiers)
          if (n === "comfort_band" && o.startsWith("zone:")) {
            t = o.slice(5);
            break;
          }
        if (t) break;
      }
    return { type: "custom:comfort-band-card", zone: t };
  }
  render() {
    if (!this._config || !this.hass) return w``;
    const e = this._config.zone, t = ia(this.hass, e);
    if (t.deviceId === null)
      return w`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return w`
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
        .noExpand=${i}
        .variant=${n}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${i ? null : w`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const i = Xl(e, t), n = Jl({
      ...i,
      doing: null,
      now: Date.now(),
      formatTime: (o) => Ir(o, e)
    });
    return {
      zoneName: ra(e, this._config, t),
      temperature: i.temperature,
      feelsLike: i.feelsLike,
      low: i.band.low,
      high: i.band.high,
      action: Br(i) ? i.action : "unknown",
      statusKind: n.kind,
      statusText: n.text,
      badges: iu(i)
    };
  }
};
bn.styles = [
  Xe,
  Ue`
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
Lo([
  R({ attribute: !1 })
], bn.prototype, "hass", 2);
Lo([
  ne()
], bn.prototype, "_config", 2);
Lo([
  _n("comfort-band-modal")
], bn.prototype, "_modal", 2);
bn = Lo([
  Qe("comfort-band-card")
], bn);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.14.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
