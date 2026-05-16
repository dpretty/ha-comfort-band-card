const uo = globalThis, Ar = uo.ShadowRoot && (uo.ShadyCSS === void 0 || uo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Er = Symbol(), ks = /* @__PURE__ */ new WeakMap();
let El = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Er) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ar && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ks.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ks.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pl = (e) => new El(typeof e == "string" ? e : e + "", void 0, Er), Je = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new El(i, e, Er);
}, ec = (e, t) => {
  if (Ar) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = uo.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, As = Ar ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Pl(i);
})(e) : e;
const { is: tc, defineProperty: ic, getOwnPropertyDescriptor: nc, getOwnPropertyNames: oc, getOwnPropertySymbols: rc, getPrototypeOf: sc } = Object, yo = globalThis, Es = yo.trustedTypes, lc = Es ? Es.emptyScript : "", ac = yo.reactiveElementPolyfillSupport, Fn = (e, t) => e, fo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? lc : null;
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
} }, Pr = (e, t) => !tc(e, t), Ps = { attribute: !0, type: String, converter: fo, reflect: !1, useDefault: !1, hasChanged: Pr };
Symbol.metadata ??= Symbol("metadata"), yo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let cn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ps) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && ic(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = nc(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ps;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Fn("elementProperties"))) return;
    const t = sc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Fn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Fn("properties"))) {
      const i = this.properties, n = [...oc(i), ...rc(i)];
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
      for (const o of n) i.unshift(As(o));
    } else t !== void 0 && i.push(As(t));
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
    return ec(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : fo).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : fo;
      this._$Em = o;
      const h = l.fromAttribute(i, s.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Pr)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
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
cn.elementStyles = [], cn.shadowRootOptions = { mode: "open" }, cn[Fn("elementProperties")] = /* @__PURE__ */ new Map(), cn[Fn("finalized")] = /* @__PURE__ */ new Map(), ac?.({ ReactiveElement: cn }), (yo.reactiveElementVersions ??= []).push("2.1.2");
const Tr = globalThis, Ts = (e) => e, po = Tr.trustedTypes, Cs = po ? po.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Tl = "$lit$", fi = `lit$${Math.random().toFixed(9).slice(2)}$`, Cl = "?" + fi, cc = `<${Cl}>`, Hi = document, Bn = () => Hi.createComment(""), Vn = (e) => e === null || typeof e != "object" && typeof e != "function", Cr = Array.isArray, uc = (e) => Cr(e) || typeof e?.[Symbol.iterator] == "function", er = `[ 	
\f\r]`, zn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ms = /-->/g, Ds = />/g, Ci = RegExp(`>|${er}(?:([^\\s"'>=/]+)(${er}*=${er}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zs = /'/g, Os = /"/g, Ml = /^(?:script|style|textarea|title)$/i, Dl = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), M = Dl(1), di = Dl(2), fn = Symbol.for("lit-noChange"), X = Symbol.for("lit-nothing"), Ns = /* @__PURE__ */ new WeakMap(), Oi = Hi.createTreeWalker(Hi, 129);
function zl(e, t) {
  if (!Cr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Cs !== void 0 ? Cs.createHTML(t) : t;
}
const hc = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = zn;
  for (let h = 0; h < i; h++) {
    const f = e[h];
    let p, b, g = -1, _ = 0;
    for (; _ < f.length && (l.lastIndex = _, b = l.exec(f), b !== null); ) _ = l.lastIndex, l === zn ? b[1] === "!--" ? l = Ms : b[1] !== void 0 ? l = Ds : b[2] !== void 0 ? (Ml.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = Ci) : b[3] !== void 0 && (l = Ci) : l === Ci ? b[0] === ">" ? (l = o ?? zn, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Ci : b[3] === '"' ? Os : zs) : l === Os || l === zs ? l = Ci : l === Ms || l === Ds ? l = zn : (l = Ci, o = void 0);
    const k = l === Ci && e[h + 1].startsWith("/>") ? " " : "";
    s += l === zn ? f + cc : g >= 0 ? (n.push(p), f.slice(0, g) + Tl + f.slice(g) + fi + k) : f + fi + (g === -2 ? h : k);
  }
  return [zl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class jn {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, f = this.parts, [p, b] = hc(t, i);
    if (this.el = jn.createElement(p, n), Oi.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = Oi.nextNode()) !== null && f.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith(Tl)) {
          const _ = b[l++], k = o.getAttribute(g).split(fi), E = /([.?@])?(.*)/.exec(_);
          f.push({ type: 1, index: s, name: E[2], strings: k, ctor: E[1] === "." ? dc : E[1] === "?" ? pc : E[1] === "@" ? gc : wo }), o.removeAttribute(g);
        } else g.startsWith(fi) && (f.push({ type: 6, index: s }), o.removeAttribute(g));
        if (Ml.test(o.tagName)) {
          const g = o.textContent.split(fi), _ = g.length - 1;
          if (_ > 0) {
            o.textContent = po ? po.emptyScript : "";
            for (let k = 0; k < _; k++) o.append(g[k], Bn()), Oi.nextNode(), f.push({ type: 2, index: ++s });
            o.append(g[_], Bn());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Cl) f.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = o.data.indexOf(fi, g + 1)) !== -1; ) f.push({ type: 7, index: s }), g += fi.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Hi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function dn(e, t, i = e, n) {
  if (t === fn) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Vn(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = dn(e, o._$AS(e, t.values), o, n)), t;
}
class fc {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Hi).importNode(i, !0);
    Oi.currentNode = o;
    let s = Oi.nextNode(), l = 0, h = 0, f = n[0];
    for (; f !== void 0; ) {
      if (l === f.index) {
        let p;
        f.type === 2 ? p = new Kn(s, s.nextSibling, this, t) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, t) : f.type === 6 && (p = new mc(s, this, t)), this._$AV.push(p), f = n[++h];
      }
      l !== f?.index && (s = Oi.nextNode(), l++);
    }
    return Oi.currentNode = Hi, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Kn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = X, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = dn(this, t, i), Vn(t) ? t === X || t == null || t === "" ? (this._$AH !== X && this._$AR(), this._$AH = X) : t !== this._$AH && t !== fn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : uc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== X && Vn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Hi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = jn.createElement(zl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new fc(o, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Ns.get(t.strings);
    return i === void 0 && Ns.set(t.strings, i = new jn(t)), i;
  }
  k(t) {
    Cr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new Kn(this.O(Bn()), this.O(Bn()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ts(t).nextSibling;
      Ts(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class wo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = X, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = X;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = dn(this, t, i, 0), l = !Vn(t) || t !== this._$AH && t !== fn, l && (this._$AH = t);
    else {
      const h = t;
      let f, p;
      for (t = s[0], f = 0; f < s.length - 1; f++) p = dn(this, h[n + f], i, f), p === fn && (p = this._$AH[f]), l ||= !Vn(p) || p !== this._$AH[f], p === X ? t = X : t !== X && (t += (p ?? "") + s[f + 1]), this._$AH[f] = p;
    }
    l && !o && this.j(t);
  }
  j(t) {
    t === X ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class dc extends wo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === X ? void 0 : t;
  }
}
class pc extends wo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== X);
  }
}
class gc extends wo {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = dn(this, t, i, 0) ?? X) === fn) return;
    const n = this._$AH, o = t === X && n !== X || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== X && (n === X || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class mc {
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
const bc = Tr.litHtmlPolyfillSupport;
bc?.(jn, Kn), (Tr.litHtmlVersions ??= []).push("3.3.2");
const _c = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Kn(t.insertBefore(Bn(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const Mr = globalThis;
class Ue extends cn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _c(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return fn;
  }
}
Ue._$litElement$ = !0, Ue.finalized = !0, Mr.litElementHydrateSupport?.({ LitElement: Ue });
const vc = Mr.litElementPolyfillSupport;
vc?.({ LitElement: Ue });
(Mr.litElementVersions ??= []).push("4.2.2");
const tt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const yc = { attribute: !0, type: String, converter: fo, reflect: !1, hasChanged: Pr }, wc = (e = yc, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: l } = i;
    return { set(h) {
      const f = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(l, f, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(l, void 0, e, h), h;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(h) {
      const f = this[l];
      t.call(this, h), this.requestUpdate(l, f, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function V(e) {
  return (t, i) => typeof i == "object" ? wc(e, t, i) : ((n, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function le(e) {
  return V({ ...e, state: !0, attribute: !1 });
}
const xc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function vn(e, t) {
  return (i, n, o) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return xc(i, n, { get() {
      return s(this);
    } });
  };
}
const it = Je`
  :host {
    --cb-action-heating: var(--cb-color-heat, var(--state-climate-heat-color, #d9603f));
    --cb-action-cooling: var(--cb-color-cool, var(--state-climate-cool-color, #2f7fcc));
    --cb-action-idle: var(--cb-color-idle, var(--state-inactive-color, #888888));
    --cb-action-unknown: var(--cb-color-unknown, var(--disabled-color, #bdbdbd));

    --cb-track-bg: var(--divider-color, #e0e0e0);
    --cb-text-primary: var(--primary-text-color, #212121);
    --cb-text-secondary: var(--secondary-text-color, #727272);

    --cb-radius-card: 12px;
    --cb-radius-pill: 999px;
    --cb-gap-xs: 4px;
    --cb-gap-sm: 8px;
    --cb-gap-md: 12px;
    --cb-gap-lg: 16px;
  }
`;
function go(e) {
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
function mo(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
function dr(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var $c = Object.defineProperty, Sc = Object.getOwnPropertyDescriptor, qn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Sc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && $c(t, i, o), o;
};
const pr = 15, Ol = 28, kc = Ol - pr;
function tr(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(pr, Math.min(Ol, e)) - pr) / kc * 100;
}
let Li = class extends Ue {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = mo(this.action), t = go(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), o = Number.isFinite(this.room), s = i ? tr(this.low) : 0, l = n ? tr(this.high) : 100, h = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = o ? tr(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return M`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${di`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? di`<rect class="band" x=${h} y="9" width=${f} height="6" rx="3" fill=${t}></rect>` : null}
        ${o ? di`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${o ? di`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
Li.styles = [
  it,
  Je`
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
qn([
  V({ type: Number })
], Li.prototype, "low", 2);
qn([
  V({ type: Number })
], Li.prototype, "high", 2);
qn([
  V({ type: Number })
], Li.prototype, "room", 2);
qn([
  V({ type: String })
], Li.prototype, "action", 2);
Li = qn([
  tt("band-gauge")
], Li);
var Ac = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, Gt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ec(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Ac(t, i, o), o;
};
let yt = class extends Ue {
  constructor() {
    super(...arguments), this.zoneName = "", this.roomTemp = NaN, this.low = NaN, this.high = NaN, this.action = "unknown", this.overrideActive = !1, this.overrideEnds = null, this.noExpand = !1, this.variant = "tile";
  }
  _onTap(e) {
    this.noExpand || e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.dispatchEvent(new CustomEvent("comfort-band-tile-tap", { bubbles: !0, composed: !0 })));
  }
  _renderRoomTemp() {
    return Number.isFinite(this.roomTemp) ? `${this.roomTemp.toFixed(1)}°` : "—";
  }
  _renderOverridePill() {
    if (!this.overrideActive) return null;
    const e = Pc(this.overrideEnds);
    return M`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = mo(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = go(e);
    return M`<span class="action-chip" style="background:${t}">
      ${dr(e)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : M`
      <div
        class="tile ${this.noExpand ? "no-expand" : ""}"
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        <div class="header">
          <div class="zone-name">${this.zoneName || "—"}</div>
          ${this._renderActionChip()}
        </div>
        <div class="body">
          <div class="room-temp">${this._renderRoomTemp()}</div>
          <div class="gauge-wrap">
            <band-gauge
              .low=${this.low}
              .high=${this.high}
              .room=${this.roomTemp}
              .action=${this.action}
            ></band-gauge>
          </div>
        </div>
        ${this._renderOverridePill()}
      </div>
    `;
  }
  _renderMini() {
    const e = mo(this.action), t = e === "heating" || e === "cooling", i = t ? `--cb-mini-bg:${go(e)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${dr(e)}` : ""}`;
    return M`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${t ? "tinted" : ""}"
        style=${i}
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        aria-label=${n}
        title=${n}
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        ${this._renderRoomTemp()}
      </div>
    `;
  }
};
yt.styles = [
  it,
  Je`
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
        display: inline-flex;
        align-items: center;
        justify-content: center;
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
      .action-chip {
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        color: var(--cb-text-on-action, #ffffff);
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
      .gauge-wrap {
        flex: 1;
        min-width: 0;
      }
      .override-pill {
        align-self: flex-start;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        background: var(--cb-text-secondary);
        color: var(--cb-text-on-action, #ffffff);
        opacity: 0.85;
      }
    `
];
Gt([
  V({ type: String })
], yt.prototype, "zoneName", 2);
Gt([
  V({ type: Number })
], yt.prototype, "roomTemp", 2);
Gt([
  V({ type: Number })
], yt.prototype, "low", 2);
Gt([
  V({ type: Number })
], yt.prototype, "high", 2);
Gt([
  V({ type: String })
], yt.prototype, "action", 2);
Gt([
  V({ type: Boolean })
], yt.prototype, "overrideActive", 2);
Gt([
  V({ type: String })
], yt.prototype, "overrideEnds", 2);
Gt([
  V({ type: Boolean })
], yt.prototype, "noExpand", 2);
Gt([
  V({ type: String, reflect: !0 })
], yt.prototype, "variant", 2);
yt = Gt([
  tt("comfort-band-tile")
], yt);
function Pc(e) {
  if (!e) return "";
  const t = Date.parse(e);
  if (Number.isNaN(t)) return "";
  const i = t - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const o = Math.floor(n / 60), s = n % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var Tc = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, ni = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Cc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Tc(t, i, o), o;
};
let Dt = class extends Ue {
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
    return M`
      <div class="track" @pointerdown=${this._onTrackPointerDown}>
        <div class="fill" style="left:${e}%; width:${t - e}%"></div>
        <div
          class="thumb ${this._dragging === "low" ? "dragging" : ""}"
          style="left:${e}%"
          tabindex="0"
          role="slider"
          aria-label="Lower bound"
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
          aria-label="Upper bound"
          aria-valuemin=${this.low + this.step}
          aria-valuemax=${this.max}
          aria-valuenow=${this.high}
          aria-valuetext=${this._fmt(this.high)}
          @pointerdown=${(i) => this._onThumbPointerDown(i, "high")}
          @keydown=${(i) => this._onKeyDown(i, "high")}
        ></div>
      </div>
      <div class="label-row">
        <span class="value-low">${this._fmt(this.low)}</span>
        <span class="value-high">${this._fmt(this.high)}</span>
      </div>
    `;
  }
};
Dt.styles = [
  it,
  Je`
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
      .label-row {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--cb-text-secondary);
        margin-top: 14px;
        font-variant-numeric: tabular-nums;
      }
      .value-low,
      .value-high {
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
    `
];
ni([
  V({ type: Number })
], Dt.prototype, "min", 2);
ni([
  V({ type: Number })
], Dt.prototype, "max", 2);
ni([
  V({ type: Number })
], Dt.prototype, "step", 2);
ni([
  V({ type: Number })
], Dt.prototype, "low", 2);
ni([
  V({ type: Number })
], Dt.prototype, "high", 2);
ni([
  V({ type: String })
], Dt.prototype, "unit", 2);
ni([
  le()
], Dt.prototype, "_dragging", 2);
ni([
  vn(".track")
], Dt.prototype, "_track", 2);
Dt = ni([
  tt("dual-handle-slider")
], Dt);
const bi = "comfort_band";
function Mc(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Dc(e, t) {
  return e.callService(bi, "set_schedule", { ...t });
}
function zc(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(bi, "start_override", i);
}
function Oc(e, t) {
  return e.callService(bi, "cancel_override", { ...t });
}
function Nc(e, t) {
  return e.callService(bi, "set_profile", { ...t });
}
function Hc(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(bi, "create_profile", i);
}
function Lc(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(bi, "clone_profile", i);
}
function Rc(e, t) {
  return e.callService(bi, "rename_profile", { old: t.old, new: t.new });
}
function Fc(e, t) {
  return e.callService(bi, "delete_profile", { name: t.name });
}
var Uc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, yn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ic(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Uc(t, i, o), o;
};
const Bc = [1, 3, 6];
let pi = class extends Ue {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, zc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Oc(this.hass, { zone: this.zone });
    }, this._onPickHours = (e) => {
      !this.hass || !this.entities?.overrideHours || this.hass.callService("number", "set_value", {
        entity_id: this.entities.overrideHours,
        value: e
      });
    };
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
  render() {
    if (!this.hass || !this.entities) return X;
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), o = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), l = this._stateOf(this.entities.currentAction)?.state ?? "unknown", h = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._pendingLow ?? (Number.isFinite(e) ? e : 19), p = this._pendingHigh ?? (Number.isFinite(t) ? t : 22), b = mo(l), g = b !== "idle" && b !== "unknown";
    return M`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${g ? M`<span class="action-chip" style="background:${go(b)}"
              >${dr(b)}</span
            >` : X}
      </div>
      <div class="gauge-row">
        <band-gauge .low=${i} .high=${n} .room=${o} .action=${l}></band-gauge>
      </div>

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${16}
          .max=${26}
          .step=${0.5}
          .low=${f}
          .high=${p}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(h)} ${this._renderHoursSection(s)}
    `;
  }
  _renderOverrideSection(e) {
    if (!e) return X;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = Vc(t ?? null);
    return M`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${i ? ` · ${i}` : ""}</span>
          <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        </div>
      </section>
    `;
  }
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? M`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Bc.map(
      (t) => M`
              <button
                class="preset ${e === t ? "active" : ""}"
                @click=${() => this._onPickHours(t)}
              >
                ${t} h
              </button>
            `
    )}
        </div>
      </section>
    ` : X;
  }
};
pi.styles = [
  it,
  Je`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .gauge-row {
        margin-bottom: var(--cb-gap-md);
      }
      .header-row {
        display: flex;
        align-items: baseline;
        gap: var(--cb-gap-sm);
        margin-bottom: var(--cb-gap-sm);
      }
      .room-temp {
        font-size: 36px;
        font-weight: 300;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1;
      }
      .action-chip {
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        color: var(--cb-text-on-action, #ffffff);
      }
      section {
        margin-top: var(--cb-gap-lg);
      }
      h3 {
        margin: 0 0 var(--cb-gap-sm);
        font-size: 13px;
        font-weight: 500;
        color: var(--cb-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .override-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--cb-track-bg);
        font-size: 13px;
        color: var(--cb-text-primary);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid transparent;
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
        cursor: pointer;
      }
      .button.secondary {
        background: transparent;
        border-color: var(--divider-color, #cccccc);
        color: var(--cb-text-primary);
      }
      .preset-row {
        display: flex;
        gap: var(--cb-gap-sm);
      }
      .preset {
        font: inherit;
        padding: 4px 10px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        background: transparent;
        color: var(--cb-text-primary);
        cursor: pointer;
      }
      .preset.active {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
        border-color: transparent;
      }
    `
];
yn([
  V({ attribute: !1 })
], pi.prototype, "hass", 2);
yn([
  V({ type: String })
], pi.prototype, "zone", 2);
yn([
  V({ attribute: !1 })
], pi.prototype, "entities", 2);
yn([
  le()
], pi.prototype, "_pendingLow", 2);
yn([
  le()
], pi.prototype, "_pendingHigh", 2);
pi = yn([
  tt("comfort-band-now-tab")
], pi);
function Vc(e) {
  if (!e) return "";
  const t = Date.parse(e);
  if (Number.isNaN(t)) return "";
  const i = t - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const o = Math.floor(n / 60), s = n % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var jc = Object.defineProperty, Wc = Object.getOwnPropertyDescriptor, oi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && jc(t, i, o), o;
};
let zt = class extends Ue {
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
    return M`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? M`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? M`<label>
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
      ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
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
zt.styles = [
  it,
  Je`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--primary-text-color, #212121);
        border-radius: var(--cb-radius-card);
        color-scheme: light dark;
      }
      h3 {
        margin: 0 0 var(--cb-gap-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #212121);
      }
      .source {
        margin: 0 0 var(--cb-gap-md);
        font-size: 12px;
        color: var(--secondary-text-color, #727272);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        color: var(--primary-text-color, #212121);
      }
      input {
        font: inherit;
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--primary-text-color, #212121);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
      }
      input::placeholder {
        color: var(--secondary-text-color, #727272);
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
        color: var(--primary-text-color, #212121);
      }
    `
];
oi([
  V({ type: String })
], zt.prototype, "mode", 2);
oi([
  V({ type: String })
], zt.prototype, "existingName", 2);
oi([
  V({ type: Array })
], zt.prototype, "existingNames", 2);
oi([
  V({ type: Boolean })
], zt.prototype, "busy", 2);
oi([
  le()
], zt.prototype, "_name", 2);
oi([
  le()
], zt.prototype, "_description", 2);
oi([
  le()
], zt.prototype, "_error", 2);
oi([
  vn('input[name="name"]')
], zt.prototype, "_nameInput", 2);
zt = oi([
  tt("profile-edit-dialog")
], zt);
const Dr = "comfort_band", Gc = {
  effective_low: "effectiveLow",
  effective_high: "effectiveHigh",
  room_temperature: "roomTemperature",
  override_ends: "overrideEnds",
  current_action: "currentAction",
  override_active: "overrideActive",
  manual_low: "manualLow",
  manual_high: "manualHigh",
  override_hours: "overrideHours",
  deadband_below: "deadbandBelow",
  deadband_above: "deadbandAbove",
  min_cycle_minutes: "minCycleMinutes",
  cancel_override: "cancelOverride",
  enabled: "enabled"
};
function Yc() {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: null,
    overrideEnds: null,
    currentAction: null,
    overrideActive: null,
    manualLow: null,
    manualHigh: null,
    overrideHours: null,
    deadbandBelow: null,
    deadbandAbove: null,
    minCycleMinutes: null,
    cancelOverride: null,
    enabled: null,
    deviceId: null,
    deviceName: null
  };
}
function Nl(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, o] of i.identifiers)
      if (n === t[0] && o === t[1])
        return i;
  return null;
}
function Hl(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Dr
  );
}
function Kc(e, t) {
  const i = Yc(), n = Nl(e, [Dr, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const o of Hl(e, n.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Gc[s];
    l !== void 0 && (i[l] = o.entity_id);
  }
  return i;
}
function Ll(e) {
  const t = Nl(e, [Dr, "profile_manager"]);
  if (t === null) return null;
  for (const i of Hl(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
var qc = Object.defineProperty, Zc = Object.getOwnPropertyDescriptor, Fi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && qc(t, i, o), o;
};
let ii = class extends Ue {
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
          await Hc(this.hass, { name: t, description: i });
        else if (n === "clone" && o)
          await Lc(this.hass, { source: o, target: t, description: i });
        else if (n === "rename" && o)
          t !== o && await Rc(this.hass, { old: o, new: t });
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
        await Fc(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Ll(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!t) return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", f = t.attributes.descriptions, p = {};
    if (f && typeof f == "object" && !Array.isArray(f))
      for (const [b, g] of Object.entries(f))
        typeof g == "string" && (p[b] = g);
    return { options: n, active: o, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(e) {
    this.hass && Nc(this.hass, { profile: e });
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
        (l ? Array.from(l).find((f) => f.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
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
    if (!this.hass) return X;
    const e = this._readState();
    if (e === null)
      return M`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: o, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return M`
        ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
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
      return M`
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
            ${l ? M`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? M`<div class="empty">No profiles configured.</div>` : M`
      ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? M`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : X}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, o, s)
    )}
      </ul>
      ${s ? X : M`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, o, s) {
    const l = e === i, h = e === n, f = o[e] ?? "", p = `cb-profile-menu-${t}`;
    return M`
      <li
        data-profile=${e}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : X}
        @click=${() => this._onSelect(e)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${f ? M`<span class="description">${f}</span>` : X}
        </span>
        ${l ? M`<span class="badge">Active</span>` : X}
        ${s ? M`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? p : X}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(b) => this._toggleMenu(e, b)}
            >
              ⋮
            </button>` : X}
        ${this._openMenu === e ? M`
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
            ` : X}
      </li>
    `;
  }
};
ii.styles = [
  it,
  Je`
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
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `
];
Fi([
  V({ attribute: !1 })
], ii.prototype, "hass", 2);
Fi([
  le()
], ii.prototype, "_mode", 2);
Fi([
  le()
], ii.prototype, "_target", 2);
Fi([
  le()
], ii.prototype, "_openMenu", 2);
Fi([
  le()
], ii.prototype, "_error", 2);
Fi([
  le()
], ii.prototype, "_busy", 2);
ii = Fi([
  tt("comfort-band-profiles-tab")
], ii);
const Jc = !0, ze = "u-", Qc = "uplot", Xc = ze + "hz", eu = ze + "vt", tu = ze + "title", iu = ze + "wrap", nu = ze + "under", ou = ze + "over", ru = ze + "axis", zi = ze + "off", su = ze + "select", lu = ze + "cursor-x", au = ze + "cursor-y", cu = ze + "cursor-pt", uu = ze + "legend", hu = ze + "live", fu = ze + "inline", du = ze + "series", pu = ze + "marker", Hs = ze + "label", gu = ze + "value", Hn = "width", Ln = "height", On = "top", Ls = "bottom", ln = "left", ir = "right", zr = "#000", Rs = zr + "0", nr = "mousemove", Fs = "mousedown", or = "mouseup", Us = "mouseenter", Is = "mouseleave", Bs = "dblclick", mu = "resize", bu = "scroll", Vs = "change", bo = "dppxchange", Or = "--", wn = typeof window < "u", gr = wn ? document : null, hn = wn ? window : null, _u = wn ? navigator : null;
let ce, so;
function mr() {
  let e = devicePixelRatio;
  ce != e && (ce = e, so && _r(Vs, so, mr), so = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Ni(Vs, so, mr), hn.dispatchEvent(new CustomEvent(bo)));
}
function at(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function br(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function ye(e, t, i) {
  e.style[t] = i + "px";
}
function Pt(e, t, i, n) {
  let o = gr.createElement(e);
  return t != null && at(o, t), i?.insertBefore(o, n), o;
}
function _t(e, t) {
  return Pt("div", e, t);
}
const js = /* @__PURE__ */ new WeakMap();
function It(e, t, i, n, o) {
  let s = "translate(" + t + "px," + i + "px)", l = js.get(e);
  s != l && (e.style.transform = s, js.set(e, s), t < 0 || i < 0 || t > n || i > o ? at(e, zi) : br(e, zi));
}
const Ws = /* @__PURE__ */ new WeakMap();
function Gs(e, t, i) {
  let n = t + i, o = Ws.get(e);
  n != o && (Ws.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const Ys = /* @__PURE__ */ new WeakMap();
function Ks(e, t, i, n) {
  let o = t + "" + i, s = Ys.get(e);
  o != s && (Ys.set(e, o), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Nr = { passive: !0 }, vu = { ...Nr, capture: !0 };
function Ni(e, t, i, n) {
  t.addEventListener(e, i, n ? vu : Nr);
}
function _r(e, t, i, n) {
  t.removeEventListener(e, i, Nr);
}
wn && mr();
function Ct(e, t, i, n) {
  let o;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    o = s ? i + n >> 1 : ct((i + n) / 2), t[o] < e ? i = o : n = o;
  return e - t[i] <= t[n] - e ? i : n;
}
function Rl(e) {
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
const Fl = (e) => e != null, Ul = (e) => e != null && e > 0, xo = Rl(Fl), yu = Rl(Ul);
function wu(e, t, i, n = 0, o = !1) {
  let s = o ? yu : xo, l = o ? Ul : Fl;
  [t, i] = s(e, t, i);
  let h = e[t], f = e[t];
  if (t > -1)
    if (n == 1)
      h = e[t], f = e[i];
    else if (n == -1)
      h = e[i], f = e[t];
    else
      for (let p = t; p <= i; p++) {
        let b = e[p];
        l(b) && (b < h ? h = b : b > f && (f = b));
      }
  return [h ?? pe, f ?? -pe];
}
function $o(e, t, i, n) {
  let o = Js(e), s = Js(t);
  e == t && (o == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? ei : Il, h = o == 1 ? ct : vt, f = s == 1 ? vt : ct, p = h(l(De(e))), b = f(l(De(t))), g = pn(i, p), _ = pn(i, b);
  return i == 10 && (p < 0 && (g = ge(g, -p)), b < 0 && (_ = ge(_, -b))), n || i == 2 ? (e = g * o, t = _ * s) : (e = Wl(e, g), t = So(t, _)), [e, t];
}
function Hr(e, t, i, n) {
  let o = $o(e, t, i, n);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const Lr = 0.1, qs = {
  mode: 3,
  pad: Lr
}, Un = {
  pad: 0,
  soft: null,
  mode: 0
}, xu = {
  min: Un,
  max: Un
};
function _o(e, t, i, n) {
  return ko(i) ? Zs(e, t, i) : (Un.pad = i, Un.soft = n ? 0 : null, Un.mode = n ? 3 : 0, Zs(e, t, xu));
}
function se(e, t) {
  return e ?? t;
}
function $u(e, t, i) {
  for (t = se(t, 0), i = se(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Zs(e, t, i) {
  let n = i.min, o = i.max, s = se(n.pad, 0), l = se(o.pad, 0), h = se(n.hard, -pe), f = se(o.hard, pe), p = se(n.soft, pe), b = se(o.soft, -pe), g = se(n.mode, 0), _ = se(o.mode, 0), k = t - e, E = ei(k), H = Ze(De(e), De(t)), U = ei(H), B = De(U - E);
  (k < 1e-24 || B > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, g == 2 && p != pe && (s = 0), _ == 2 && b != -pe && (l = 0)));
  let w = k || H || 1e3, F = ei(w), $ = pn(10, ct(F)), Z = w * (k == 0 ? e == 0 ? 0.1 : 1 : s), D = ge(Wl(e - Z, $ / 10), 24), J = e >= p && (g == 1 || g == 3 && D <= p || g == 2 && D >= p) ? p : pe, Y = Ze(h, D < J && e >= J ? J : Mt(J, D)), te = w * (k == 0 ? t == 0 ? 0.1 : 1 : l), G = ge(So(t + te, $ / 10), 24), S = t <= b && (_ == 1 || _ == 3 && G >= b || _ == 2 && G <= b) ? b : -pe, q = Mt(f, G > S && t <= S ? S : Ze(S, G));
  return Y == q && Y == 0 && (q = 100), [Y, q];
}
const Su = new Intl.NumberFormat(wn ? _u.language : "en-US"), Rr = (e) => Su.format(e), ut = Math, ho = ut.PI, De = ut.abs, ct = ut.floor, Me = ut.round, vt = ut.ceil, Mt = ut.min, Ze = ut.max, pn = ut.pow, Js = ut.sign, ei = ut.log10, Il = ut.log2, ku = (e, t = 1) => ut.sinh(e) * t, rr = (e, t = 1) => ut.asinh(e / t), pe = 1 / 0;
function Qs(e) {
  return (ei((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function vr(e, t, i) {
  return Mt(Ze(e, t), i);
}
function Bl(e) {
  return typeof e == "function";
}
function ie(e) {
  return Bl(e) ? e : () => e;
}
const Au = () => {
}, Vl = (e) => e, jl = (e, t) => t, Eu = (e) => null, Xs = (e) => !0, el = (e, t) => e == t, Pu = /\.\d*?(?=9{6,}|0{6,})/gm, Ri = (e) => {
  if (Yl(e) || gi.has(e))
    return e;
  const t = `${e}`, i = t.match(Pu);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Ri(o)}e${s}`;
  }
  return ge(e, n);
};
function Mi(e, t) {
  return Ri(ge(Ri(e / t)) * t);
}
function So(e, t) {
  return Ri(vt(Ri(e / t)) * t);
}
function Wl(e, t) {
  return Ri(ct(Ri(e / t)) * t);
}
function ge(e, t = 0) {
  if (Yl(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return Me(n) / i;
}
const gi = /* @__PURE__ */ new Map();
function Gl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Wn(e, t, i, n) {
  let o = [], s = n.map(Gl);
  for (let l = t; l < i; l++) {
    let h = De(l), f = ge(pn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * f, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : ge(b, g);
      o.push(_), gi.set(_, g);
    }
  }
  return o;
}
const In = {}, Fr = [], gn = [null, null], hi = Array.isArray, Yl = Number.isInteger, Tu = (e) => e === void 0;
function tl(e) {
  return typeof e == "string";
}
function ko(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function Cu(e) {
  return e != null && typeof e == "object";
}
const Mu = Object.getPrototypeOf(Uint8Array), Kl = "__proto__";
function mn(e, t = ko) {
  let i;
  if (hi(e)) {
    let n = e.find((o) => o != null);
    if (hi(n) || t(n)) {
      i = Array(e.length);
      for (let o = 0; o < e.length; o++)
        i[o] = mn(e[o], t);
    } else
      i = e.slice();
  } else if (e instanceof Mu)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != Kl && (i[n] = mn(e[n], t));
  } else
    i = e;
  return i;
}
function Pe(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let o in n)
      o != Kl && (ko(e[o]) ? Pe(e[o], mn(n[o])) : e[o] = mn(n[o]));
  }
  return e;
}
const Du = 0, zu = 1, Ou = 2;
function Nu(e, t, i) {
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
function Hu(e, t) {
  if (Fu(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return Uu(l[0]) || (l = Ru(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < e.length; l++) {
    let f = e[l][0], p = f.length;
    for (let b = 0; b < p; b++)
      i.add(f[b]);
  }
  let n = [Array.from(i).sort((l, h) => l - h)], o = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < o; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < e.length; l++) {
    let h = e[l], f = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], g = Array(o).fill(void 0), _ = t ? t[l][p] : zu, k = [];
      for (let E = 0; E < b.length; E++) {
        let H = b[E], U = s.get(f[E]);
        H === null ? _ != Du && (g[U] = H, _ == Ou && k.push(U)) : g[U] = H;
      }
      Nu(g, k, o), n.push(g);
    }
  }
  return n;
}
const Lu = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Ru(e) {
  let t = e[0], i = t.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => t[s] - t[l]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let l = e[s], h = Array(i);
    for (let f = 0; f < i; f++)
      h[f] = l[n[f]];
    o.push(h);
  }
  return o;
}
function Fu(e) {
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
function Uu(e, t = 100) {
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
  const s = Ze(1, ct((o - n + 1) / t));
  for (let l = e[n], h = n + s; h <= o; h += s) {
    const f = e[h];
    if (f != null) {
      if (f <= l)
        return !1;
      l = f;
    }
  }
  return !0;
}
const ql = [
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
], Zl = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Jl(e) {
  return e.slice(0, 3);
}
const Iu = Zl.map(Jl), Bu = ql.map(Jl), Vu = {
  MMMM: ql,
  MMM: Bu,
  WWWW: Zl,
  WWW: Iu
};
function Nn(e) {
  return (e < 10 ? "0" : "") + e;
}
function ju(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Wu = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Nn(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Nn(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Nn(e.getHours()),
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
  mm: (e) => Nn(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Nn(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => ju(e.getMilliseconds())
};
function Ur(e, t) {
  t = t || Vu;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = n.exec(e); )
    i.push(o[0][0] == "{" ? Wu[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const Gu = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Yu(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Gu ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const Ql = (e) => e % 1 == 0, vo = [1, 2, 2.5, 5], Ku = Wn(10, -32, 0, vo), Xl = Wn(10, 0, 32, vo), qu = Xl.filter(Ql), Di = Ku.concat(Xl), Ir = `
`, ea = "{YYYY}", il = Ir + ea, ta = "{M}/{D}", Rn = Ir + ta, lo = Rn + "/{YY}", ia = "{aa}", Zu = "{h}:{mm}", un = Zu + ia, nl = Ir + un, ol = ":{ss}", he = null;
function na(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, o = n * 24, s = o * 30, l = o * 365, f = (e == 1 ? Wn(10, 0, 3, vo).filter(Ql) : Wn(10, -3, 0, vo)).concat([
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
    [l, ea, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", il, he, he, he, he, he, 1],
    [o, ta, il, he, he, he, he, he, 1],
    [n, "{h}" + ia, lo, he, Rn, he, he, he, 1],
    [i, un, lo, he, Rn, he, he, he, 1],
    [t, ol, lo + " " + un, he, Rn + " " + un, he, nl, he, 1],
    [e, ol + ".{fff}", lo + " " + un, he, Rn + " " + un, he, nl, he, 1]
  ];
  function b(g) {
    return (_, k, E, H, U, B) => {
      let w = [], F = U >= l, $ = U >= s && U < l, Z = g(E), D = ge(Z * e, 3), J = sr(Z.getFullYear(), F ? 0 : Z.getMonth(), $ || F ? 1 : Z.getDate()), Y = ge(J * e, 3);
      if ($ || F) {
        let te = $ ? U / s : 0, G = F ? U / l : 0, S = D == Y ? D : ge(sr(J.getFullYear() + G, J.getMonth() + te, 1) * e, 3), q = new Date(Me(S / e)), z = q.getFullYear(), j = q.getMonth();
        for (let R = 0; S <= H; R++) {
          let ne = sr(z + G * R, j + te * R, 1), L = ne - g(ge(ne * e, 3));
          S = ge((+ne + L) * e, 3), S <= H && w.push(S);
        }
      } else {
        let te = U >= o ? o : U, G = ct(E) - ct(D), S = Y + G + So(D - Y, te);
        w.push(S);
        let q = g(S), z = q.getHours() + q.getMinutes() / i + q.getSeconds() / n, j = U / n, R = _.axes[k]._space, ne = B / R;
        for (; S = ge(S + U, e == 1 ? 0 : 3), !(S > H); )
          if (j > 1) {
            let L = ct(ge(z + j, 6)) % 24, oe = g(S).getHours() - L;
            oe > 1 && (oe = -1), S -= oe * n, z = (z + j) % 24;
            let fe = w[w.length - 1];
            ge((S - fe) / U, 3) * ne >= 0.7 && w.push(S);
          } else
            w.push(S);
      }
      return w;
    };
  }
  return [
    f,
    p,
    b
  ];
}
const [Ju, Qu, Xu] = na(1), [eh, th, ih] = na(1e-3);
Wn(2, -53, 53, [1]);
function rl(e, t) {
  return e.map((i) => i.map(
    (n, o) => o == 0 || o == 8 || n == null ? n : t(o == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function sl(e, t) {
  return (i, n, o, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], f, p, b, g, _, k;
    return n.map((E) => {
      let H = e(E), U = H.getFullYear(), B = H.getMonth(), w = H.getDate(), F = H.getHours(), $ = H.getMinutes(), Z = H.getSeconds(), D = U != f && h[2] || B != p && h[3] || w != b && h[4] || F != g && h[5] || $ != _ && h[6] || Z != k && h[7] || h[1];
      return f = U, p = B, b = w, g = F, _ = $, k = Z, D(H);
    });
  };
}
function nh(e, t) {
  let i = Ur(t);
  return (n, o, s, l, h) => o.map((f) => i(e(f)));
}
function sr(e, t, i) {
  return new Date(e, t, i);
}
function ll(e, t) {
  return t(e);
}
const oh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function al(e, t) {
  return (i, n, o, s) => s == null ? Or : t(e(n));
}
function rh(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function sh(e, t) {
  return e.series[t].fill(e, t);
}
const lh = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Au,
  markers: {
    show: !0,
    width: 2,
    stroke: rh,
    fill: sh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function ah(e, t) {
  let i = e.cursor.points, n = _t(), o = i.size(e, t);
  ye(n, Hn, o), ye(n, Ln, o);
  let s = o / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, o);
  return l && ye(n, "borderWidth", l), n;
}
function ch(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function uh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function hh(e, t) {
  return e.series[t].points.size;
}
const lr = [0, 0];
function fh(e, t, i) {
  return lr[0] = t, lr[1] = i, lr;
}
function ao(e, t, i, n = !0) {
  return (o) => {
    o.button == 0 && (!n || o.target == t) && i(o);
  };
}
function ar(e, t, i, n = !0) {
  return (o) => {
    (!n || o.target == t) && i(o);
  };
}
const dh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: fh,
  points: {
    one: !1,
    show: ah,
    size: hh,
    width: 0,
    stroke: uh,
    fill: ch
  },
  bind: {
    mousedown: ao,
    mouseup: ao,
    click: ao,
    // legend clicks, not .u-over clicks
    dblclick: ao,
    mousemove: ar,
    mouseleave: ar,
    mouseenter: ar
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
}, oa = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Br = Pe({}, oa, {
  filter: jl
}), ra = Pe({}, Br, {
  size: 10
}), sa = Pe({}, oa, {
  show: !1
}), Vr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', la = "bold " + Vr, aa = 1.5, cl = {
  show: !0,
  scale: "x",
  stroke: zr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: la,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Br,
  ticks: ra,
  border: sa,
  font: Vr,
  lineGap: aa,
  rotate: 0
}, ph = "Value", gh = "Time", ul = {
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
function mh(e, t, i, n, o) {
  return t.map((s) => s == null ? "" : Rr(s));
}
function bh(e, t, i, n, o, s, l) {
  let h = [], f = gi.get(o) || 0;
  i = l ? i : ge(So(i, o), f);
  for (let p = i; p <= n; p = ge(p + o, f))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function yr(e, t, i, n, o, s, l) {
  const h = [], f = e.scales[e.axes[t].scale].log, p = f == 10 ? ei : Il, b = ct(p(i));
  o = pn(f, b), f == 10 && (o = Di[Ct(o, Di)]);
  let g = i, _ = o * f;
  f == 10 && (_ = Di[Ct(_, Di)]);
  do
    h.push(g), g = g + o, f == 10 && !gi.has(g) && (g = ge(g, gi.get(o))), g >= _ && (o = g, _ = o * f, f == 10 && (_ = Di[Ct(_, Di)]));
  while (g <= n);
  return h;
}
function _h(e, t, i, n, o, s, l) {
  let f = e.scales[e.axes[t].scale].asinh, p = n > f ? yr(e, t, Ze(f, i), n, o) : [f], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -f ? yr(e, t, Ze(f, -n), -i, o) : [f]).reverse().map((_) => -_).concat(b, p);
}
const ca = /./, vh = /[12357]/, yh = /[125]/, hl = /1/, wr = (e, t, i, n) => e.map((o, s) => t == 4 && o == 0 || s % n == 0 && i.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function wh(e, t, i, n, o) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], f = e.valToPos, p = s._space, b = f(10, l), g = f(9, l) - b >= p ? ca : f(7, l) - b >= p ? vh : f(5, l) - b >= p ? yh : hl;
  if (g == hl) {
    let _ = De(f(1, l) - b);
    if (_ < p)
      return wr(t.slice().reverse(), h.distr, g, vt(p / _)).reverse();
  }
  return wr(t, h.distr, g, 1);
}
function xh(e, t, i, n, o) {
  let s = e.axes[i], l = s.scale, h = s._space, f = e.valToPos, p = De(f(1, l) - f(2, l));
  return p < h ? wr(t.slice().reverse(), 3, ca, vt(h / p)).reverse() : t;
}
function $h(e, t, i, n) {
  return n == null ? Or : t == null ? "" : Rr(t);
}
const fl = {
  show: !0,
  scale: "y",
  stroke: zr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: la,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Br,
  ticks: ra,
  border: sa,
  font: Vr,
  lineGap: aa,
  rotate: 0
};
function Sh(e, t) {
  let i = 3 + (e || 1) * 2;
  return ge(i * t, 3);
}
function kh(e, t) {
  let { scale: i, idxs: n } = e.series[0], o = e._data[0], s = e.valToPos(o[n[0]], i, !0), l = e.valToPos(o[n[1]], i, !0), h = De(l - s), f = e.series[t], p = h / (f.points.space * ce);
  return n[1] - n[0] <= p;
}
const dl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, ua = (e, t, i, n, o) => o, pl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: ua,
  alpha: 1,
  facets: [
    Pe({}, dl, { scale: "x" }),
    Pe({}, dl, { scale: "y" })
  ]
}, gl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: ua,
  alpha: 1,
  points: {
    show: kh,
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
function Ah(e, t, i, n, o) {
  return i / 10;
}
const ha = {
  time: Jc,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Eh = Pe({}, ha, {
  time: !1,
  ori: 1
}), ml = {};
function fa(e, t) {
  let i = ml[e];
  return i || (i = {
    key: e,
    plots: [],
    sub(n) {
      i.plots.push(n);
    },
    unsub(n) {
      i.plots = i.plots.filter((o) => o != n);
    },
    pub(n, o, s, l, h, f, p) {
      for (let b = 0; b < i.plots.length; b++)
        i.plots[b] != o && i.plots[b].pub(n, o, s, l, h, f, p);
    }
  }, e != null && (ml[e] = i)), i;
}
const bn = 1, xr = 2;
function Ui(e, t, i) {
  const n = e.mode, o = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let f = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[o.facets[0].scale] : l[e.series[0].scale], g = n == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, k = h.top, E = h.width, H = h.height, U = e.valToPosH, B = e.valToPosV;
  return b.ori == 0 ? i(
    o,
    f,
    p,
    b,
    g,
    U,
    B,
    _,
    k,
    E,
    H,
    Eo,
    xn,
    To,
    pa,
    ma
  ) : i(
    o,
    f,
    p,
    b,
    g,
    B,
    U,
    k,
    _,
    H,
    E,
    Po,
    $n,
    Gr,
    ga,
    ba
  );
}
function jr(e, t) {
  let i = 0, n = 0, o = se(e.bands, Fr);
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
function Ph(e, t, i, n, o) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, f = e.scales[h];
  return o == -1 ? f.min : o == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ti(e, t, i, n, o, s) {
  return Ui(e, t, (l, h, f, p, b, g, _, k, E, H, U) => {
    let B = l.pxRound;
    const w = p.dir * (p.ori == 0 ? 1 : -1), F = p.ori == 0 ? xn : $n;
    let $, Z;
    w == 1 ? ($ = i, Z = n) : ($ = n, Z = i);
    let D = B(g(h[$], p, H, k)), J = B(_(f[$], b, U, E)), Y = B(g(h[Z], p, H, k)), te = B(_(s == 1 ? b.max : b.min, b, U, E)), G = new Path2D(o);
    return F(G, Y, te), F(G, D, te), F(G, D, J), G;
  });
}
function Ao(e, t, i, n, o, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? To : Gr;
    let f = i;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
      if (_[1] > _[0]) {
        let k = _[0] - f;
        k > 0 && h(l, f, n, k, n + s), f = _[1];
      }
    }
    let p = i + o - f, b = 10;
    p > 0 && h(l, f, n - b / 2, p, n + s + b);
  }
  return l;
}
function Th(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function Wr(e, t, i, n, o, s, l) {
  let h = [], f = e.length;
  for (let p = o == 1 ? i : n; p >= i && p <= n; p += o)
    if (t[p] === null) {
      let g = p, _ = p;
      if (o == 1)
        for (; ++p <= n && t[p] === null; )
          _ = p;
      else
        for (; --p >= i && t[p] === null; )
          _ = p;
      let k = s(e[g]), E = _ == g ? k : s(e[_]), H = g - o;
      k = l <= 0 && H >= 0 && H < f ? s(e[H]) : k;
      let B = _ + o;
      E = l >= 0 && B >= 0 && B < f ? s(e[B]) : E, E >= k && h.push([k, E]);
    }
  return h;
}
function bl(e) {
  return e == 0 ? Vl : e == 1 ? Me : (t) => Mi(t, e);
}
function da(e) {
  let t = e == 0 ? Eo : Po, i = e == 0 ? (o, s, l, h, f, p) => {
    o.arcTo(s, l, h, f, p);
  } : (o, s, l, h, f, p) => {
    o.arcTo(l, s, f, h, p);
  }, n = e == 0 ? (o, s, l, h, f) => {
    o.rect(s, l, h, f);
  } : (o, s, l, h, f) => {
    o.rect(l, s, f, h);
  };
  return (o, s, l, h, f, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(o, s, l, h, f) : (p = Mt(p, h / 2, f / 2), b = Mt(b, h / 2, f / 2), t(o, s + p, l), i(o, s + h, l, s + h, l + f, p), i(o, s + h, l + f, s, l + f, b), i(o, s, l + f, s, l, b), i(o, s, l, s + h, l, p), o.closePath());
  };
}
const Eo = (e, t, i) => {
  e.moveTo(t, i);
}, Po = (e, t, i) => {
  e.moveTo(i, t);
}, xn = (e, t, i) => {
  e.lineTo(t, i);
}, $n = (e, t, i) => {
  e.lineTo(i, t);
}, To = da(0), Gr = da(1), pa = (e, t, i, n, o, s) => {
  e.arc(t, i, n, o, s);
}, ga = (e, t, i, n, o, s) => {
  e.arc(i, t, n, o, s);
}, ma = (e, t, i, n, o, s, l) => {
  e.bezierCurveTo(t, i, n, o, s, l);
}, ba = (e, t, i, n, o, s, l) => {
  e.bezierCurveTo(i, t, o, n, l, s);
};
function _a(e) {
  return (t, i, n, o, s) => Ui(t, i, (l, h, f, p, b, g, _, k, E, H, U) => {
    let { pxRound: B, points: w } = l, F, $;
    p.ori == 0 ? (F = Eo, $ = pa) : (F = Po, $ = ga);
    const Z = ge(w.width * ce, 3);
    let D = (w.size - w.width) / 2 * ce, J = ge(D * 2, 3), Y = new Path2D(), te = new Path2D(), { left: G, top: S, width: q, height: z } = t.bbox;
    To(
      te,
      G - J,
      S - J,
      q + J * 2,
      z + J * 2
    );
    const j = (R) => {
      if (f[R] != null) {
        let ne = B(g(h[R], p, H, k)), L = B(_(f[R], b, U, E));
        F(Y, ne + D, L), $(Y, ne, L, D, 0, ho * 2);
      }
    };
    if (s)
      s.forEach(j);
    else
      for (let R = n; R <= o; R++)
        j(R);
    return {
      stroke: Z > 0 ? Y : null,
      fill: Y,
      clip: te,
      flags: bn | xr
    };
  });
}
function va(e) {
  return (t, i, n, o, s, l) => {
    n != o && (s != n && l != n && e(t, i, n), s != o && l != o && e(t, i, o), e(t, i, l));
  };
}
const Ch = va(xn), Mh = va($n);
function ya(e) {
  const t = se(e?.alignGaps, 0);
  return (i, n, o, s) => Ui(i, n, (l, h, f, p, b, g, _, k, E, H, U) => {
    [o, s] = xo(f, o, s);
    let B = l.pxRound, w = (z) => B(g(z, p, H, k)), F = (z) => B(_(z, b, U, E)), $, Z;
    p.ori == 0 ? ($ = xn, Z = Ch) : ($ = $n, Z = Mh);
    const D = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: bn }, Y = J.stroke;
    let te = !1;
    if (s - o >= H * 4) {
      let z = (O) => i.posToVal(O, p.key, !0), j = null, R = null, ne, L, Qe, we = w(h[D == 1 ? o : s]), oe = w(h[o]), fe = w(h[s]), Q = z(D == 1 ? oe + 1 : fe - 1);
      for (let O = D == 1 ? o : s; O >= o && O <= s; O += D) {
        let Te = h[O], xe = (D == 1 ? Te < Q : Te > Q) ? we : w(Te), ue = f[O];
        xe == we ? ue != null ? (L = ue, j == null ? ($(Y, xe, F(L)), ne = j = R = L) : L < j ? j = L : L > R && (R = L)) : ue === null && (te = !0) : (j != null && Z(Y, we, F(j), F(R), F(ne), F(L)), ue != null ? (L = ue, $(Y, xe, F(L)), j = R = ne = L) : (j = R = null, ue === null && (te = !0)), we = xe, Q = z(we + D));
      }
      j != null && j != R && Qe != we && Z(Y, we, F(j), F(R), F(ne), F(L));
    } else
      for (let z = D == 1 ? o : s; z >= o && z <= s; z += D) {
        let j = f[z];
        j === null ? te = !0 : j != null && $(Y, w(h[z]), F(j));
      }
    let [S, q] = jr(i, n);
    if (l.fill != null || S != 0) {
      let z = J.fill = new Path2D(Y), j = l.fillTo(i, n, l.min, l.max, S), R = F(j), ne = w(h[o]), L = w(h[s]);
      D == -1 && ([L, ne] = [ne, L]), $(z, L, R), $(z, ne, R);
    }
    if (!l.spanGaps) {
      let z = [];
      te && z.push(...Wr(h, f, o, s, D, w, t)), J.gaps = z = l.gaps(i, n, o, s, z), J.clip = Ao(z, p.ori, k, E, H, U);
    }
    return q != 0 && (J.band = q == 2 ? [
      ti(i, n, o, s, Y, -1),
      ti(i, n, o, s, Y, 1)
    ] : ti(i, n, o, s, Y, q)), J;
  });
}
function Dh(e) {
  const t = se(e.align, 1), i = se(e.ascDesc, !1), n = se(e.alignGaps, 0), o = se(e.extend, !1);
  return (s, l, h, f) => Ui(s, l, (p, b, g, _, k, E, H, U, B, w, F) => {
    [h, f] = xo(g, h, f);
    let $ = p.pxRound, { left: Z, width: D } = s.bbox, J = (oe) => $(E(oe, _, w, U)), Y = (oe) => $(H(oe, k, F, B)), te = _.ori == 0 ? xn : $n;
    const G = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: bn }, S = G.stroke, q = _.dir * (_.ori == 0 ? 1 : -1);
    let z = Y(g[q == 1 ? h : f]), j = J(b[q == 1 ? h : f]), R = j, ne = j;
    o && t == -1 && (ne = Z, te(S, ne, z)), te(S, j, z);
    for (let oe = q == 1 ? h : f; oe >= h && oe <= f; oe += q) {
      let fe = g[oe];
      if (fe == null)
        continue;
      let Q = J(b[oe]), O = Y(fe);
      t == 1 ? te(S, Q, z) : te(S, R, O), te(S, Q, O), z = O, R = Q;
    }
    let L = R;
    o && t == 1 && (L = Z + D, te(S, L, z));
    let [Qe, we] = jr(s, l);
    if (p.fill != null || Qe != 0) {
      let oe = G.fill = new Path2D(S), fe = p.fillTo(s, l, p.min, p.max, Qe), Q = Y(fe);
      te(oe, L, Q), te(oe, ne, Q);
    }
    if (!p.spanGaps) {
      let oe = [];
      oe.push(...Wr(b, g, h, f, q, J, n));
      let fe = p.width * ce / 2, Q = i || t == 1 ? fe : -fe, O = i || t == -1 ? -fe : fe;
      oe.forEach((Te) => {
        Te[0] += Q, Te[1] += O;
      }), G.gaps = oe = p.gaps(s, l, h, f, oe), G.clip = Ao(oe, _.ori, U, B, w, F);
    }
    return we != 0 && (G.band = we == 2 ? [
      ti(s, l, h, f, S, -1),
      ti(s, l, h, f, S, 1)
    ] : ti(s, l, h, f, S, we)), G;
  });
}
function _l(e, t, i, n, o, s, l = pe) {
  if (e.length > 1) {
    let h = null;
    for (let f = 0, p = 1 / 0; f < e.length; f++)
      if (t[f] !== void 0) {
        if (h != null) {
          let b = De(e[f] - e[h]);
          b < p && (p = b, l = De(i(e[f], n, o, s) - i(e[h], n, o, s)));
        }
        h = f;
      }
  }
  return l;
}
function zh(e) {
  e = e || In;
  const t = se(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), l = 1 - t[0], h = se(t[1], pe), f = se(t[2], 1), p = se(e.disp, In), b = se(e.each, (k) => {
  }), { fill: g, stroke: _ } = p;
  return (k, E, H, U) => Ui(k, E, (B, w, F, $, Z, D, J, Y, te, G, S) => {
    let q = B.pxRound, z = i, j = n * ce, R = h * ce, ne = f * ce, L, Qe;
    $.ori == 0 ? [L, Qe] = s(k, E) : [Qe, L] = s(k, E);
    const we = $.dir * ($.ori == 0 ? 1 : -1);
    let oe = $.ori == 0 ? To : Gr, fe = $.ori == 0 ? b : (T, me, Ce, ji, xi, Nt, $i) => {
      b(T, me, Ce, xi, ji, $i, Nt);
    }, Q = se(k.bands, Fr).find((T) => T.series[0] == E), O = Q != null ? Q.dir : 0, Te = B.fillTo(k, E, B.min, B.max, O), We = q(J(Te, Z, S, te)), xe, ue, $t, nt = G, Se = q(B.width * ce), Ot = !1, qt = null, ht = null, ri = null, Ii = null;
    g != null && (Se == 0 || _ != null) && (Ot = !0, qt = g.values(k, E, H, U), ht = /* @__PURE__ */ new Map(), new Set(qt).forEach((T) => {
      T != null && ht.set(T, new Path2D());
    }), Se > 0 && (ri = _.values(k, E, H, U), Ii = /* @__PURE__ */ new Map(), new Set(ri).forEach((T) => {
      T != null && Ii.set(T, new Path2D());
    })));
    let { x0: Bi, size: kn } = p;
    if (Bi != null && kn != null) {
      z = 1, w = Bi.values(k, E, H, U), Bi.unit == 2 && (w = w.map((Ce) => k.posToVal(Y + Ce * G, $.key, !0)));
      let T = kn.values(k, E, H, U);
      kn.unit == 2 ? ue = T[0] * G : ue = D(T[0], $, G, Y) - D(0, $, G, Y), nt = _l(w, F, D, $, G, Y, nt), $t = nt - ue + j;
    } else
      nt = _l(w, F, D, $, G, Y, nt), $t = nt * l + j, ue = nt - $t;
    $t < 1 && ($t = 0), Se >= ue / 2 && (Se = 0), $t < 5 && (q = Vl);
    let Zn = $t > 0, yi = nt - $t - (Zn ? Se : 0);
    ue = q(vr(yi, ne, R)), xe = (z == 0 ? ue / 2 : z == we ? 0 : ue) - z * we * ((z == 0 ? j / 2 : 0) + (Zn ? Se / 2 : 0));
    const Ge = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Vi = Ot ? null : new Path2D();
    let Zt = null;
    if (Q != null)
      Zt = k.data[Q.series[1]];
    else {
      let { y0: T, y1: me } = p;
      T != null && me != null && (F = me.values(k, E, H, U), Zt = T.values(k, E, H, U));
    }
    let wi = L * ue, K = Qe * ue;
    for (let T = we == 1 ? H : U; T >= H && T <= U; T += we) {
      let me = F[T];
      if (me == null)
        continue;
      if (Zt != null) {
        let Xe = Zt[T] ?? 0;
        if (me - Xe == 0)
          continue;
        We = J(Xe, Z, S, te);
      }
      let Ce = $.distr != 2 || p != null ? w[T] : T, ji = D(Ce, $, G, Y), xi = J(se(me, Te), Z, S, te), Nt = q(ji - xe), $i = q(Ze(xi, We)), ot = q(Mt(xi, We)), ft = $i - ot;
      if (me != null) {
        let Xe = me < 0 ? K : wi, St = me < 0 ? wi : K;
        Ot ? (Se > 0 && ri[T] != null && oe(Ii.get(ri[T]), Nt, ot + ct(Se / 2), ue, Ze(0, ft - Se), Xe, St), qt[T] != null && oe(ht.get(qt[T]), Nt, ot + ct(Se / 2), ue, Ze(0, ft - Se), Xe, St)) : oe(Vi, Nt, ot + ct(Se / 2), ue, Ze(0, ft - Se), Xe, St), fe(
          k,
          E,
          T,
          Nt - Se / 2,
          ot,
          ue + Se,
          ft
        );
      }
    }
    return Se > 0 ? Ge.stroke = Ot ? Ii : Vi : Ot || (Ge._fill = B.width == 0 ? B._fill : B._stroke ?? B._fill, Ge.width = 0), Ge.fill = Ot ? ht : Vi, Ge;
  });
}
function Oh(e, t) {
  const i = se(t?.alignGaps, 0);
  return (n, o, s, l) => Ui(n, o, (h, f, p, b, g, _, k, E, H, U, B) => {
    [s, l] = xo(p, s, l);
    let w = h.pxRound, F = (L) => w(_(L, b, U, E)), $ = (L) => w(k(L, g, B, H)), Z, D, J;
    b.ori == 0 ? (Z = Eo, J = xn, D = ma) : (Z = Po, J = $n, D = ba);
    const Y = b.dir * (b.ori == 0 ? 1 : -1);
    let te = F(f[Y == 1 ? s : l]), G = te, S = [], q = [];
    for (let L = Y == 1 ? s : l; L >= s && L <= l; L += Y)
      if (p[L] != null) {
        let we = f[L], oe = F(we);
        S.push(G = oe), q.push($(p[L]));
      }
    const z = { stroke: e(S, q, Z, J, D, w), fill: null, clip: null, band: null, gaps: null, flags: bn }, j = z.stroke;
    let [R, ne] = jr(n, o);
    if (h.fill != null || R != 0) {
      let L = z.fill = new Path2D(j), Qe = h.fillTo(n, o, h.min, h.max, R), we = $(Qe);
      J(L, G, we), J(L, te, we);
    }
    if (!h.spanGaps) {
      let L = [];
      L.push(...Wr(f, p, s, l, Y, F, i)), z.gaps = L = h.gaps(n, o, s, l, L), z.clip = Ao(L, b.ori, E, H, U, B);
    }
    return ne != 0 && (z.band = ne == 2 ? [
      ti(n, o, s, l, j, -1),
      ti(n, o, s, l, j, 1)
    ] : ti(n, o, s, l, j, ne)), z;
  });
}
function Nh(e) {
  return Oh(Hh, e);
}
function Hh(e, t, i, n, o, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, e[0], t[0]), l == 2)
    n(h, e[1], t[1]);
  else {
    let f = Array(l), p = Array(l - 1), b = Array(l - 1), g = Array(l - 1);
    for (let _ = 0; _ < l - 1; _++)
      b[_] = t[_ + 1] - t[_], g[_] = e[_ + 1] - e[_], p[_] = b[_] / g[_];
    f[0] = p[0];
    for (let _ = 1; _ < l - 1; _++)
      p[_] === 0 || p[_ - 1] === 0 || p[_ - 1] > 0 != p[_] > 0 ? f[_] = 0 : (f[_] = 3 * (g[_ - 1] + g[_]) / ((2 * g[_] + g[_ - 1]) / p[_ - 1] + (g[_] + 2 * g[_ - 1]) / p[_]), isFinite(f[_]) || (f[_] = 0));
    f[l - 1] = p[l - 2];
    for (let _ = 0; _ < l - 1; _++)
      o(
        h,
        e[_] + g[_] / 3,
        t[_] + f[_] * g[_] / 3,
        e[_ + 1] - g[_] / 3,
        t[_ + 1] - f[_ + 1] * g[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return h;
}
const $r = /* @__PURE__ */ new Set();
function vl() {
  for (let e of $r)
    e.syncRect(!0);
}
wn && (Ni(mu, hn, vl), Ni(bu, hn, vl, !0), Ni(bo, hn, () => {
  je.pxRatio = ce;
}));
const Lh = ya(), Rh = _a();
function yl(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Sr(s, l, t, i));
}
function Fh(e, t) {
  return e.map((i, n) => n == 0 ? {} : Pe({}, t, i));
}
function Sr(e, t, i, n) {
  return Pe({}, t == 0 ? i : n, e);
}
function wa(e, t, i) {
  return t == null ? gn : [t, i];
}
const Uh = wa;
function Ih(e, t, i) {
  return t == null ? gn : _o(t, i, Lr, !0);
}
function xa(e, t, i, n) {
  return t == null ? gn : $o(t, i, e.scales[n].log, !1);
}
const Bh = xa;
function $a(e, t, i, n) {
  return t == null ? gn : Hr(t, i, e.scales[n].log, !1);
}
const Vh = $a;
function jh(e, t, i, n, o) {
  let s = Ze(Qs(e), Qs(t)), l = t - e, h = Ct(o / n * l, i);
  do {
    let f = i[h], p = n * f / l;
    if (p >= o && s + (f < 5 ? gi.get(f) : 0) <= 17)
      return [f, p];
  } while (++h < i.length);
  return [0, 0];
}
function wl(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, o) => (t = Me((i = +o) * ce)) + "px"), [e, t, i];
}
function Wh(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = ge(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function je(e, t, i) {
  const n = {
    mode: se(e.mode, 1)
  }, o = n.mode;
  function s(r, a, c, u) {
    let d = a.valToPct(r);
    return u + c * (a.dir == -1 ? 1 - d : d);
  }
  function l(r, a, c, u) {
    let d = a.valToPct(r);
    return u + c * (a.dir == -1 ? d : 1 - d);
  }
  function h(r, a, c, u) {
    return a.ori == 0 ? s(r, a, c, u) : l(r, a, c, u);
  }
  n.valToPosH = s, n.valToPosV = l;
  let f = !1;
  n.status = 0;
  const p = n.root = _t(Qc);
  if (e.id != null && (p.id = e.id), at(p, e.class), e.title) {
    let r = _t(tu, p);
    r.textContent = e.title;
  }
  const b = Pt("canvas"), g = n.ctx = b.getContext("2d"), _ = _t(iu, p);
  Ni("click", _, (r) => {
    r.target === E && (be != tn || $e != nn) && Be.click(n, r);
  }, !0);
  const k = n.under = _t(nu, _);
  _.appendChild(b);
  const E = n.over = _t(ou, _);
  e = mn(e);
  const H = +se(e.pxAlign, 1), U = bl(H);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(n, e) || e);
  });
  const B = e.ms || 1e-3, w = n.series = o == 1 ? yl(e.series || [], ul, gl, !1) : Fh(e.series || [null], pl), F = n.axes = yl(e.axes || [], cl, fl, !0), $ = n.scales = {}, Z = n.bands = e.bands || [];
  Z.forEach((r) => {
    r.fill = ie(r.fill || null), r.dir = se(r.dir, -1);
  });
  const D = o == 2 ? w[1].facets[0].scale : w[0].scale, J = {
    axes: Fa,
    series: Oa
  }, Y = (e.drawOrder || ["axes", "series"]).map((r) => J[r]);
  function te(r) {
    const a = r.distr == 3 ? (c) => ei(c > 0 ? c : r.clamp(n, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => rr(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: d, _max: m } = r, v = m - d;
      return (u - d) / v;
    };
  }
  function G(r) {
    let a = $[r];
    if (a == null) {
      let c = (e.scales || In)[r] || In;
      if (c.from != null) {
        G(c.from);
        let u = Pe({}, $[c.from], c, { key: r });
        u.valToPct = te(u), $[r] = u;
      } else {
        a = $[r] = Pe({}, r == D ? ha : Eh, c), a.key = r;
        let u = a.time, d = a.range, m = hi(d);
        if ((r != D || o == 2 && !u) && (m && (d[0] == null || d[1] == null) && (d = {
          min: d[0] == null ? qs : {
            mode: 1,
            hard: d[0],
            soft: d[0]
          },
          max: d[1] == null ? qs : {
            mode: 1,
            hard: d[1],
            soft: d[1]
          }
        }, m = !1), !m && ko(d))) {
          let v = d;
          d = (y, x, A) => x == null ? gn : _o(x, A, v);
        }
        a.range = ie(d || (u ? Uh : r == D ? a.distr == 3 ? Bh : a.distr == 4 ? Vh : wa : a.distr == 3 ? xa : a.distr == 4 ? $a : Ih)), a.auto = ie(m ? !1 : a.auto), a.clamp = ie(a.clamp || Ah), a._min = a._max = null, a.valToPct = te(a);
      }
    }
  }
  G("x"), G("y"), o == 1 && w.forEach((r) => {
    G(r.scale);
  }), F.forEach((r) => {
    G(r.scale);
  });
  for (let r in e.scales)
    G(r);
  const S = $[D], q = S.distr;
  let z, j;
  S.ori == 0 ? (at(p, Xc), z = s, j = l) : (at(p, eu), z = l, j = s);
  const R = {};
  for (let r in $) {
    let a = $[r];
    (a.min != null || a.max != null) && (R[r] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const ne = e.tzDate || ((r) => new Date(Me(r / B))), L = e.fmtDate || Ur, Qe = B == 1 ? Xu(ne) : ih(ne), we = sl(ne, rl(B == 1 ? Qu : th, L)), oe = al(ne, ll(oh, L)), fe = [], Q = n.legend = Pe({}, lh, e.legend), O = n.cursor = Pe({}, dh, { drag: { y: o == 2 } }, e.cursor), Te = Q.show, We = O.show, xe = Q.markers;
  Q.idxs = fe, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, $t, nt, Se = [], Ot = [], qt, ht = !1, ri = {};
  if (Q.live) {
    const r = w[1] ? w[1].values : null;
    ht = r != null, qt = ht ? r(n, 1, 0) : { _: 0 };
    for (let a in qt)
      ri[a] = Or;
  }
  if (Te)
    if (ue = Pt("table", uu, p), nt = Pt("tbody", null, ue), Q.mount(n, ue), ht) {
      $t = Pt("thead", null, ue, nt);
      let r = Pt("tr", null, $t);
      Pt("th", null, r);
      for (var Ii in qt)
        Pt("th", Hs, r).textContent = Ii;
    } else
      at(ue, fu), Q.live && at(ue, hu);
  const Bi = { show: !0 }, kn = { show: !1 };
  function Zn(r, a) {
    if (a == 0 && (ht || !Q.live || o == 2))
      return gn;
    let c = [], u = Pt("tr", du, nt, nt.childNodes[a]);
    at(u, r.class), r.show || at(u, zi);
    let d = Pt("th", null, u);
    if (xe.show) {
      let y = _t(pu, d);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (y.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let m = _t(Hs, d);
    r.label instanceof HTMLElement ? m.appendChild(r.label) : m.textContent = r.label, a > 0 && (xe.show || (m.style.color = r.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ge("click", d, (y) => {
      if (O._lock)
        return;
      ki(y);
      let x = w.indexOf(r);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = w.some((P, C) => C > 0 && C != x && P.show);
        w.forEach((P, C) => {
          C > 0 && Lt(C, A ? C == x ? Bi : kn : Bi, !0, Ee.setSeries);
        });
      } else
        Lt(x, { show: !r.show }, !0, Ee.setSeries);
    }, !1), Gi && Ge(Us, d, (y) => {
      O._lock || (ki(y), Lt(w.indexOf(r), rn, !0, Ee.setSeries));
    }, !1));
    for (var v in qt) {
      let y = Pt("td", gu, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const yi = /* @__PURE__ */ new Map();
  function Ge(r, a, c, u = !0) {
    const d = yi.get(a) || {}, m = O.bind[r](n, a, c, u);
    m && (Ni(r, a, d[r] = m), yi.set(a, d));
  }
  function Vi(r, a, c) {
    const u = yi.get(a) || {};
    for (let d in u)
      (r == null || d == r) && (_r(d, a, u[d]), delete u[d]);
    r == null && yi.delete(a);
  }
  let Zt = 0, wi = 0, K = 0, T = 0, me = 0, Ce = 0, ji = me, xi = Ce, Nt = K, $i = T, ot = 0, ft = 0, Xe = 0, St = 0;
  n.bbox = {};
  let Mo = !1, Jn = !1, Wi = !1, Si = !1, Qn = !1, dt = !1;
  function Do(r, a, c) {
    (c || r != n.width || a != n.height) && qr(r, a), Ji(!1), Wi = !0, Jn = !0, Qi();
  }
  function qr(r, a) {
    n.width = Zt = K = r, n.height = wi = T = a, me = Ce = 0, Ea(), Pa();
    let c = n.bbox;
    ot = c.left = Mi(me * ce, 0.5), ft = c.top = Mi(Ce * ce, 0.5), Xe = c.width = Mi(K * ce, 0.5), St = c.height = Mi(T * ce, 0.5);
  }
  const Sa = 3;
  function ka() {
    let r = !1, a = 0;
    for (; !r; ) {
      a++;
      let c = La(a), u = Ra(a);
      r = a == Sa || c && u, r || (qr(n.width, n.height), Jn = !0);
    }
  }
  function Aa({ width: r, height: a }) {
    Do(r, a);
  }
  n.setSize = Aa;
  function Ea() {
    let r = !1, a = !1, c = !1, u = !1;
    F.forEach((d, m) => {
      if (d.show && d._show) {
        let { side: v, _size: y } = d, x = v % 2, A = d.label != null ? d.labelSize : 0, P = y + A;
        P > 0 && (x ? (K -= P, v == 3 ? (me += P, u = !0) : c = !0) : (T -= P, v == 0 ? (Ce += P, r = !0) : a = !0));
      }
    }), Ai[0] = r, Ai[1] = c, Ai[2] = a, Ai[3] = u, K -= si[1] + si[3], me += si[3], T -= si[2] + si[0], Ce += si[0];
  }
  function Pa() {
    let r = me + K, a = Ce + T, c = me, u = Ce;
    function d(m, v) {
      switch (m) {
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
    F.forEach((m, v) => {
      if (m.show && m._show) {
        let y = m.side;
        m._pos = d(y, m._size), m.label != null && (m._lpos = d(y, m.labelSize));
      }
    });
  }
  if (O.dataIdx == null) {
    let r = O.hover, a = r.skip = new Set(r.skip ?? []);
    a.add(void 0);
    let c = r.prox = ie(r.prox), u = r.bias ??= 0;
    O.dataIdx = (d, m, v, y) => {
      if (m == 0)
        return v;
      let x = v, A = c(d, m, v, y) ?? pe, P = A >= 0 && A < pe, C = S.ori == 0 ? K : T, W = O.left, ae = t[0], re = t[m];
      if (a.has(re[v])) {
        x = null;
        let ee = null, I = null, N;
        if (u == 0 || u == -1)
          for (N = v; ee == null && N-- > 0; )
            a.has(re[N]) || (ee = N);
        if (u == 0 || u == 1)
          for (N = v; I == null && N++ < re.length; )
            a.has(re[N]) || (I = N);
        if (ee != null || I != null)
          if (P) {
            let ve = ee == null ? -1 / 0 : z(ae[ee], S, C, 0), ke = I == null ? 1 / 0 : z(ae[I], S, C, 0), Fe = W - ve, de = ke - W;
            Fe <= de ? Fe <= A && (x = ee) : de <= A && (x = I);
          } else
            x = I == null ? ee : ee == null ? I : v - ee <= I - v ? ee : I;
      } else P && De(W - z(ae[v], S, C, 0)) > A && (x = null);
      return x;
    };
  }
  const ki = (r) => {
    O.event = r;
  };
  O.idxs = fe, O._lock = !1;
  let Ve = O.points;
  Ve.show = ie(Ve.show), Ve.size = ie(Ve.size), Ve.stroke = ie(Ve.stroke), Ve.width = ie(Ve.width), Ve.fill = ie(Ve.fill);
  const Ht = n.focus = Pe({}, e.focus || { alpha: 0.3 }, O.focus), Gi = Ht.prox >= 0, Yi = Gi && Ve.one;
  let pt = [], Ki = [], qi = [];
  function Zr(r, a) {
    let c = Ve.show(n, a);
    if (c instanceof HTMLElement)
      return at(c, cu), at(c, r.class), It(c, -10, -10, K, T), E.insertBefore(c, pt[a]), c;
  }
  function Jr(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? tl(u) ? al(ne, ll(u, L)) : u || oe : u || $h, r.label = r.label || (c ? gh : ph);
    }
    if (Yi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Lh || Eu, r.fillTo = ie(r.fillTo || Ph), r.pxAlign = +se(r.pxAlign, H), r.pxRound = bl(r.pxAlign), r.stroke = ie(r.stroke || null), r.fill = ie(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = Sh(Ze(1, r.width), 1), u = r.points = Pe({}, {
        size: c,
        width: Ze(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Rh,
        _stroke: null,
        _fill: null
      }, r.points);
      u.show = ie(u.show), u.filter = ie(u.filter), u.fill = ie(u.fill), u.stroke = ie(u.stroke), u.paths = ie(u.paths), u.pxAlign = r.pxAlign;
    }
    if (Te) {
      let c = Zn(r, a);
      Se.splice(a, 0, c[0]), Ot.splice(a, 0, c[1]), Q.values.push(null);
    }
    if (We) {
      fe.splice(a, 0, null);
      let c = null;
      Yi ? a == 0 && (c = Zr(r, a)) : a > 0 && (c = Zr(r, a)), pt.splice(a, 0, c), Ki.splice(a, 0, 0), qi.splice(a, 0, 0);
    }
    Re("addSeries", a);
  }
  function Ta(r, a) {
    a = a ?? w.length, r = o == 1 ? Sr(r, a, ul, gl) : Sr(r, a, {}, pl), w.splice(a, 0, r), Jr(w[a], a);
  }
  n.addSeries = Ta;
  function Ca(r) {
    if (w.splice(r, 1), Te) {
      Q.values.splice(r, 1), Ot.splice(r, 1);
      let a = Se.splice(r, 1)[0];
      Vi(null, a.firstChild), a.remove();
    }
    We && (fe.splice(r, 1), pt.splice(r, 1)[0].remove(), Ki.splice(r, 1), qi.splice(r, 1)), Re("delSeries", r);
  }
  n.delSeries = Ca;
  const Ai = [!1, !1, !1, !1];
  function Ma(r, a) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = $[r.scale];
      u == null && (r.scale = c ? w[1].scale : D, u = $[r.scale]);
      let d = u.time;
      r.size = ie(r.size), r.space = ie(r.space), r.rotate = ie(r.rotate), hi(r.incrs) && r.incrs.forEach((v) => {
        !gi.has(v) && gi.set(v, Gl(v));
      }), r.incrs = ie(r.incrs || (u.distr == 2 ? qu : d ? B == 1 ? Ju : eh : Di)), r.splits = ie(r.splits || (d && u.distr == 1 ? Qe : u.distr == 3 ? yr : u.distr == 4 ? _h : bh)), r.stroke = ie(r.stroke), r.grid.stroke = ie(r.grid.stroke), r.ticks.stroke = ie(r.ticks.stroke), r.border.stroke = ie(r.border.stroke);
      let m = r.values;
      r.values = // static array of tick values
      hi(m) && !hi(m[0]) ? ie(m) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          hi(m) ? sl(ne, rl(m, L)) : (
            // fmtDate string tpl
            tl(m) ? nh(ne, m) : m || we
          )
        ) : m || mh
      ), r.filter = ie(r.filter || (u.distr >= 3 && u.log == 10 ? wh : u.distr == 3 && u.log == 2 ? xh : jl)), r.font = wl(r.font), r.labelFont = wl(r.labelFont), r._size = r.size(n, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (Ai[a] = !0, r._el = _t(ru, _));
    }
  }
  function An(r, a, c, u) {
    let [d, m, v, y] = c, x = a % 2, A = 0;
    return x == 0 && (y || m) && (A = a == 0 && !d || a == 2 && !v ? Me(cl.size / 3) : 0), x == 1 && (d || v) && (A = a == 1 && !m || a == 3 && !y ? Me(fl.size / 2) : 0), A;
  }
  const Qr = n.padding = (e.padding || [An, An, An, An]).map((r) => ie(se(r, An))), si = n._padding = Qr.map((r, a) => r(n, a, Ai, 0));
  let Ie, Oe = null, Ne = null;
  const Xn = o == 1 ? w[0].idxs : null;
  let kt = null, En = !1;
  function Xr(r, a) {
    if (t = r ?? [], n.data = n._data = t, o == 2) {
      Ie = 0;
      for (let c = 1; c < w.length; c++)
        Ie += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), kt = t[0], Ie = kt.length;
      let c = t;
      if (q == 2) {
        c = t.slice();
        let u = c[0] = Array(Ie);
        for (let d = 0; d < Ie; d++)
          u[d] = d;
      }
      n._data = t = c;
    }
    if (Ji(!0), Re("setData"), q == 2 && (Wi = !0), a !== !1) {
      let c = S;
      c.auto(n, En) ? zo() : ai(D, c.min, c.max), Si = Si || O.left >= 0, dt = !0, Qi();
    }
  }
  n.setData = Xr;
  function zo() {
    En = !0;
    let r, a;
    o == 1 && (Ie > 0 ? (Oe = Xn[0] = 0, Ne = Xn[1] = Ie - 1, r = t[0][Oe], a = t[0][Ne], q == 2 ? (r = Oe, a = Ne) : r == a && (q == 3 ? [r, a] = $o(r, r, S.log, !1) : q == 4 ? [r, a] = Hr(r, r, S.log, !1) : S.time ? a = r + Me(86400 / B) : [r, a] = _o(r, a, Lr, !0))) : (Oe = Xn[0] = r = null, Ne = Xn[1] = a = null)), ai(D, r, a);
  }
  let eo, Zi, Oo, No, Ho, Lo, Ro, Fo, Uo, et;
  function es(r, a, c, u, d, m) {
    r ??= Rs, c ??= Fr, u ??= "butt", d ??= Rs, m ??= "round", r != eo && (g.strokeStyle = eo = r), d != Zi && (g.fillStyle = Zi = d), a != Oo && (g.lineWidth = Oo = a), m != Ho && (g.lineJoin = Ho = m), u != Lo && (g.lineCap = Lo = u), c != No && g.setLineDash(No = c);
  }
  function ts(r, a, c, u) {
    a != Zi && (g.fillStyle = Zi = a), r != Ro && (g.font = Ro = r), c != Fo && (g.textAlign = Fo = c), u != Uo && (g.textBaseline = Uo = u);
  }
  function Io(r, a, c, u, d = 0) {
    if (u.length > 0 && r.auto(n, En) && (a == null || a.min == null)) {
      let m = se(Oe, 0), v = se(Ne, u.length - 1), y = c.min == null ? wu(u, m, v, d, r.distr == 3) : [c.min, c.max];
      r.min = Mt(r.min, c.min = y[0]), r.max = Ze(r.max, c.max = y[1]);
    }
  }
  const is = { min: null, max: null };
  function Da() {
    for (let u in $) {
      let d = $[u];
      R[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      R[D] != null && d.auto(n, En)) && (R[u] = is);
    }
    for (let u in $) {
      let d = $[u];
      R[u] == null && d.from != null && R[d.from] != null && (R[u] = is);
    }
    R[D] != null && Ji(!0);
    let r = {};
    for (let u in R) {
      let d = R[u];
      if (d != null) {
        let m = r[u] = mn($[u], Cu);
        if (d.min != null)
          Pe(m, d);
        else if (u != D || o == 2)
          if (Ie == 0 && m.from == null) {
            let v = m.range(n, null, null, u);
            m.min = v[0], m.max = v[1];
          } else
            m.min = pe, m.max = -pe;
      }
    }
    if (Ie > 0) {
      w.forEach((u, d) => {
        if (o == 1) {
          let m = u.scale, v = R[m];
          if (v == null)
            return;
          let y = r[m];
          if (d == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Oe = Ct(y.min, t[0]), Ne = Ct(y.max, t[0]), Ne - Oe > 1 && (t[0][Oe] < y.min && Oe++, t[0][Ne] > y.max && Ne--), u.min = kt[Oe], u.max = kt[Ne];
          } else u.show && u.auto && Io(y, v, u, t[d], u.sorted);
          u.idxs[0] = Oe, u.idxs[1] = Ne;
        } else if (d > 0 && u.show && u.auto) {
          let [m, v] = u.facets, y = m.scale, x = v.scale, [A, P] = t[d], C = r[y], W = r[x];
          C != null && Io(C, R[y], m, A, m.sorted), W != null && Io(W, R[x], v, P, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in r) {
        let d = r[u], m = R[u];
        if (d.from == null && (m == null || m.min == null)) {
          let v = d.range(
            n,
            d.min == pe ? null : d.min,
            d.max == -pe ? null : d.max,
            u
          );
          d.min = v[0], d.max = v[1];
        }
      }
    }
    for (let u in r) {
      let d = r[u];
      if (d.from != null) {
        let m = r[d.from];
        if (m.min == null)
          d.min = d.max = null;
        else {
          let v = d.range(n, m.min, m.max, u);
          d.min = v[0], d.max = v[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let u in r) {
      let d = r[u], m = $[u];
      if (m.min != d.min || m.max != d.max) {
        m.min = d.min, m.max = d.max;
        let v = m.distr;
        m._min = v == 3 ? ei(m.min) : v == 4 ? rr(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? ei(m.max) : v == 4 ? rr(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      w.forEach((u, d) => {
        o == 2 ? d > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Wi = !0, Re("setScale", u);
      We && O.left >= 0 && (Si = dt = !0);
    }
    for (let u in R)
      R[u] = null;
  }
  function za(r) {
    let a = vr(Oe - 1, 0, Ie - 1), c = vr(Ne + 1, 0, Ie - 1);
    for (; r[a] == null && a > 0; )
      a--;
    for (; r[c] == null && c < Ie - 1; )
      c++;
    return [a, c];
  }
  function Oa() {
    if (Ie > 0) {
      let r = w.some((a) => a._focus) && et != Ht.alpha;
      r && (g.globalAlpha = et = Ht.alpha), w.forEach((a, c) => {
        if (c > 0 && a.show && (ns(c, !1), ns(c, !0), a._paths == null)) {
          let u = et;
          et != a.alpha && (g.globalAlpha = et = a.alpha);
          let d = o == 2 ? [0, t[c][0].length - 1] : za(t[c]);
          a._paths = a.paths(n, c, d[0], d[1]), et != u && (g.globalAlpha = et = u);
        }
      }), w.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = et;
          et != a.alpha && (g.globalAlpha = et = a.alpha), a._paths != null && os(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Oe, Ne, d), v = a.points.filter(n, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(n, c, Oe, Ne, v), os(c, !0));
          }
          et != u && (g.globalAlpha = et = u), Re("drawSeries", c);
        }
      }), r && (g.globalAlpha = et = 1);
    }
  }
  function ns(r, a) {
    let c = a ? w[r].points : w[r];
    c._stroke = c.stroke(n, r), c._fill = c.fill(n, r);
  }
  function os(r, a) {
    let c = a ? w[r].points : w[r], {
      stroke: u,
      fill: d,
      clip: m,
      flags: v,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: A = c.width
    } = c._paths;
    A = ge(A * ce, 3);
    let P = null, C = A % 2 / 2;
    a && x == null && (x = A > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && C > 0;
    if (W && g.translate(C, C), !a) {
      let ae = ot - A / 2, re = ft - A / 2, ee = Xe + A, I = St + A;
      P = new Path2D(), P.rect(ae, re, ee, I);
    }
    a ? Bo(y, A, c.dash, c.cap, x, u, d, v, m) : Na(r, y, A, c.dash, c.cap, x, u, d, v, P, m), W && g.translate(-C, -C);
  }
  function Na(r, a, c, u, d, m, v, y, x, A, P) {
    let C = !1;
    x != 0 && Z.forEach((W, ae) => {
      if (W.series[0] == r) {
        let re = w[W.series[1]], ee = t[W.series[1]], I = (re._paths || In).band;
        hi(I) && (I = W.dir == 1 ? I[0] : I[1]);
        let N, ve = null;
        re.show && I && $u(ee, Oe, Ne) ? (ve = W.fill(n, ae) || m, N = re._paths.clip) : I = null, Bo(a, c, u, d, ve, v, y, x, A, P, N, I), C = !0;
      }
    }), C || Bo(a, c, u, d, m, v, y, x, A, P);
  }
  const rs = bn | xr;
  function Bo(r, a, c, u, d, m, v, y, x, A, P, C) {
    es(r, a, c, u, d), (x || A || C) && (g.save(), x && g.clip(x), A && g.clip(A)), C ? (y & rs) == rs ? (g.clip(C), P && g.clip(P), io(d, v), to(r, m, a)) : y & xr ? (io(d, v), g.clip(C), to(r, m, a)) : y & bn && (g.save(), g.clip(C), P && g.clip(P), io(d, v), g.restore(), to(r, m, a)) : (io(d, v), to(r, m, a)), (x || A || C) && g.restore();
  }
  function to(r, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, d) => {
      g.strokeStyle = eo = d, g.stroke(u);
    }) : a != null && r && g.stroke(a));
  }
  function io(r, a) {
    a instanceof Map ? a.forEach((c, u) => {
      g.fillStyle = Zi = u, g.fill(c);
    }) : a != null && r && g.fill(a);
  }
  function Ha(r, a, c, u) {
    let d = F[r], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let v = d._space = d.space(n, r, a, c, u), y = d._incrs = d.incrs(n, r, a, c, u, v);
      m = jh(a, c, y, u, v);
    }
    return d._found = m;
  }
  function Vo(r, a, c, u, d, m, v, y, x, A) {
    let P = v % 2 / 2;
    H == 1 && g.translate(P, P), es(y, v, x, A, y), g.beginPath();
    let C, W, ae, re, ee = d + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (W = d, re = ee) : (C = d, ae = ee);
    for (let I = 0; I < r.length; I++)
      a[I] != null && (c == 0 ? C = ae = r[I] : W = re = r[I], g.moveTo(C, W), g.lineTo(ae, re));
    g.stroke(), H == 1 && g.translate(-P, -P);
  }
  function La(r) {
    let a = !0;
    return F.forEach((c, u) => {
      if (!c.show)
        return;
      let d = $[c.scale];
      if (d.min == null) {
        c._show && (a = !1, c._show = !1, Ji(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Ji(!1));
      let m = c.side, v = m % 2, { min: y, max: x } = d, [A, P] = Ha(u, y, x, v == 0 ? K : T);
      if (P == 0)
        return;
      let C = d.distr == 2, W = c._splits = c.splits(n, u, y, x, A, P, C), ae = d.distr == 2 ? W.map((N) => kt[N]) : W, re = d.distr == 2 ? kt[W[1]] - kt[W[0]] : A, ee = c._values = c.values(n, c.filter(n, ae, u, P, re), u, P, re);
      c._rotate = m == 2 ? c.rotate(n, ee, u, P) : 0;
      let I = c._size;
      c._size = vt(c.size(n, ee, u, r)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function Ra(r) {
    let a = !0;
    return Qr.forEach((c, u) => {
      let d = c(n, u, Ai, r);
      d != si[u] && (a = !1), si[u] = d;
    }), a;
  }
  function Fa() {
    for (let r = 0; r < F.length; r++) {
      let a = F[r];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, d, m, v = a.stroke(n, r), y = c == 0 || c == 3 ? -1 : 1, [x, A] = a._found;
      if (a.label != null) {
        let Ke = a.labelGap * y, lt = Me((a._lpos + Ke) * ce);
        ts(a.labelFont[0], v, "center", c == 2 ? On : Ls), g.save(), u == 1 ? (d = m = 0, g.translate(
          lt,
          Me(ft + St / 2)
        ), g.rotate((c == 3 ? -ho : ho) / 2)) : (d = Me(ot + Xe / 2), m = lt);
        let Ti = Bl(a.label) ? a.label(n, r, x, A) : a.label;
        g.fillText(Ti, d, m), g.restore();
      }
      if (A == 0)
        continue;
      let P = $[a.scale], C = u == 0 ? Xe : St, W = u == 0 ? ot : ft, ae = a._splits, re = P.distr == 2 ? ae.map((Ke) => kt[Ke]) : ae, ee = P.distr == 2 ? kt[ae[1]] - kt[ae[0]] : x, I = a.ticks, N = a.border, ve = I.show ? I.size : 0, ke = Me(ve * ce), Fe = Me((a.alignTo == 2 ? a._size - ve - a.gap : a.gap) * ce), de = a._rotate * -ho / 180, Ae = U(a._pos * ce), rt = (ke + Fe) * y, Ye = Ae + rt;
      m = u == 0 ? Ye : 0, d = u == 1 ? Ye : 0;
      let gt = a.font[0], At = a.align == 1 ? ln : a.align == 2 ? ir : de > 0 ? ln : de < 0 ? ir : u == 0 ? "center" : c == 3 ? ir : ln, Ft = de || u == 1 ? "middle" : c == 2 ? On : Ls;
      ts(gt, v, At, Ft);
      let st = a.font[1] * a.lineGap, mt = ae.map((Ke) => U(h(Ke, P, C, W))), Et = a._values;
      for (let Ke = 0; Ke < Et.length; Ke++) {
        let lt = Et[Ke];
        if (lt != null) {
          u == 0 ? d = mt[Ke] : m = mt[Ke], lt = "" + lt;
          let Ti = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let qe = 0; qe < Ti.length; qe++) {
            let Ss = Ti[qe];
            de ? (g.save(), g.translate(d, m + qe * st), g.rotate(de), g.fillText(Ss, 0, 0), g.restore()) : g.fillText(Ss, d, m + qe * st);
          }
        }
      }
      I.show && Vo(
        mt,
        I.filter(n, re, r, A, ee),
        u,
        c,
        Ae,
        ke,
        ge(I.width * ce, 3),
        I.stroke(n, r),
        I.dash,
        I.cap
      );
      let Ut = a.grid;
      Ut.show && Vo(
        mt,
        Ut.filter(n, re, r, A, ee),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? ft : ot,
        u == 0 ? St : Xe,
        ge(Ut.width * ce, 3),
        Ut.stroke(n, r),
        Ut.dash,
        Ut.cap
      ), N.show && Vo(
        [Ae],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? ft : ot,
        u == 1 ? St : Xe,
        ge(N.width * ce, 3),
        N.stroke(n, r),
        N.dash,
        N.cap
      );
    }
    Re("drawAxes");
  }
  function Ji(r) {
    w.forEach((a, c) => {
      c > 0 && (a._paths = null, r && (o == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let no = !1, jo = !1, Pn = [];
  function Ua() {
    jo = !1;
    for (let r = 0; r < Pn.length; r++)
      Re(...Pn[r]);
    Pn.length = 0;
  }
  function Qi() {
    no || (Lu(ss), no = !0);
  }
  function Ia(r, a = !1) {
    no = !0, jo = a, r(n), ss(), a && Pn.length > 0 && queueMicrotask(Ua);
  }
  n.batch = Ia;
  function ss() {
    if (Mo && (Da(), Mo = !1), Wi && (ka(), Wi = !1), Jn) {
      if (ye(k, ln, me), ye(k, On, Ce), ye(k, Hn, K), ye(k, Ln, T), ye(E, ln, me), ye(E, On, Ce), ye(E, Hn, K), ye(E, Ln, T), ye(_, Hn, Zt), ye(_, Ln, wi), b.width = Me(Zt * ce), b.height = Me(wi * ce), F.forEach(({ _el: r, _show: a, _size: c, _pos: u, side: d }) => {
        if (r != null)
          if (a) {
            let m = d === 3 || d === 0 ? c : 0, v = d % 2 == 1;
            ye(r, v ? "left" : "top", u - m), ye(r, v ? "width" : "height", c), ye(r, v ? "top" : "left", v ? Ce : me), ye(r, v ? "height" : "width", v ? T : K), br(r, zi);
          } else
            at(r, zi);
      }), eo = Zi = Oo = Ho = Lo = Ro = Fo = Uo = No = null, et = 1, Mn(!0), me != ji || Ce != xi || K != Nt || T != $i) {
        Ji(!1);
        let r = K / Nt, a = T / $i;
        if (We && !Si && O.left >= 0) {
          O.left *= r, O.top *= a, Xi && It(Xi, Me(O.left), 0, K, T), en && It(en, 0, Me(O.top), K, T);
          for (let c = 0; c < pt.length; c++) {
            let u = pt[c];
            u != null && (Ki[c] *= r, qi[c] *= a, It(u, vt(Ki[c]), vt(qi[c]), K, T));
          }
        }
        if (_e.show && !Qn && _e.left >= 0 && _e.width > 0) {
          _e.left *= r, _e.width *= r, _e.top *= a, _e.height *= a;
          for (let c in Zo)
            ye(on, c, _e[c]);
        }
        ji = me, xi = Ce, Nt = K, $i = T;
      }
      Re("setSize"), Jn = !1;
    }
    Zt > 0 && wi > 0 && (g.clearRect(0, 0, b.width, b.height), Re("drawClear"), Y.forEach((r) => r()), Re("draw")), _e.show && Qn && (oo(_e), Qn = !1), We && Si && (Pi(null, !0, !1), Si = !1), Q.show && Q.live && dt && (Ko(), dt = !1), f || (f = !0, n.status = 1, Re("ready")), En = !1, no = !1;
  }
  n.redraw = (r, a) => {
    Wi = a || !1, r !== !1 ? ai(D, S.min, S.max) : Qi();
  };
  function Wo(r, a) {
    let c = $[r];
    if (c.from == null) {
      if (Ie == 0) {
        let u = c.range(n, a.min, a.max, r);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (Ie > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      r == D && c.distr == 2 && Ie > 0 && (a.min = Ct(a.min, t[0]), a.max = Ct(a.max, t[0]), a.min == a.max && a.max++), R[r] = a, Mo = !0, Qi();
    }
  }
  n.setScale = Wo;
  let Go, Yo, Xi, en, ls, as, tn, nn, cs, us, be, $e, li = !1;
  const Be = O.drag;
  let He = Be.x, Le = Be.y;
  We && (O.x && (Go = _t(lu, E)), O.y && (Yo = _t(au, E)), S.ori == 0 ? (Xi = Go, en = Yo) : (Xi = Yo, en = Go), be = O.left, $e = O.top);
  const _e = n.select = Pe({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), on = _e.show ? _t(su, _e.over ? E : k) : null;
  function oo(r, a) {
    if (_e.show) {
      for (let c in r)
        _e[c] = r[c], c in Zo && ye(on, c, r[c]);
      a !== !1 && Re("setSelect");
    }
  }
  n.setSelect = oo;
  function Ba(r) {
    if (w[r].show)
      Te && br(Se[r], zi);
    else if (Te && at(Se[r], zi), We) {
      let c = Yi ? pt[0] : pt[r];
      c != null && It(c, -10, -10, K, T);
    }
  }
  function ai(r, a, c) {
    Wo(r, { min: a, max: c });
  }
  function Lt(r, a, c, u) {
    a.focus != null && Ya(r), a.show != null && w.forEach((d, m) => {
      m > 0 && (r == m || r == null) && (d.show = a.show, Ba(m), o == 2 ? (ai(d.facets[0].scale, null, null), ai(d.facets[1].scale, null, null)) : ai(d.scale, null, null), Qi());
    }), c !== !1 && Re("setSeries", r, a), u && Dn("setSeries", n, r, a);
  }
  n.setSeries = Lt;
  function Va(r, a) {
    Pe(Z[r], a);
  }
  function ja(r, a) {
    r.fill = ie(r.fill || null), r.dir = se(r.dir, -1), a = a ?? Z.length, Z.splice(a, 0, r);
  }
  function Wa(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  n.addBand = ja, n.setBand = Va, n.delBand = Wa;
  function Ga(r, a) {
    w[r].alpha = a, We && pt[r] != null && (pt[r].style.opacity = a), Te && Se[r] && (Se[r].style.opacity = a);
  }
  let Jt, ci, Ei;
  const rn = { focus: !0 };
  function Ya(r) {
    if (r != Ei) {
      let a = r == null, c = Ht.alpha != 1;
      w.forEach((u, d) => {
        if (o == 1 || d > 0) {
          let m = a || d == 0 || d == r;
          u._focus = a ? null : m, c && Ga(d, m ? 1 : Ht.alpha);
        }
      }), Ei = r, c && Qi();
    }
  }
  Te && Gi && Ge(Is, ue, (r) => {
    O._lock || (ki(r), Ei != null && Lt(null, rn, !0, Ee.setSeries));
  });
  function Rt(r, a, c) {
    let u = $[a];
    c && (r = r / ce - (u.ori == 1 ? Ce : me));
    let d = K;
    u.ori == 1 && (d = T, r = d - r), u.dir == -1 && (r = d - r);
    let m = u._min, v = u._max, y = r / d, x = m + (v - m) * y, A = u.distr;
    return A == 3 ? pn(10, x) : A == 4 ? ku(x, u.asinh) : A == 100 ? u.bwd(x) : x;
  }
  function Ka(r, a) {
    let c = Rt(r, D, a);
    return Ct(c, t[0], Oe, Ne);
  }
  n.valToIdx = (r) => Ct(r, t[0]), n.posToIdx = Ka, n.posToVal = Rt, n.valToPos = (r, a, c) => $[a].ori == 0 ? s(
    r,
    $[a],
    c ? Xe : K,
    c ? ot : 0
  ) : l(
    r,
    $[a],
    c ? St : T,
    c ? ft : 0
  ), n.setCursor = (r, a, c) => {
    be = r.left, $e = r.top, Pi(null, a, c);
  };
  function hs(r, a) {
    ye(on, ln, _e.left = r), ye(on, Hn, _e.width = a);
  }
  function fs(r, a) {
    ye(on, On, _e.top = r), ye(on, Ln, _e.height = a);
  }
  let Tn = S.ori == 0 ? hs : fs, Cn = S.ori == 1 ? hs : fs;
  function qa() {
    if (Te && Q.live)
      for (let r = o == 2 ? 1 : 0; r < w.length; r++) {
        if (r == 0 && ht)
          continue;
        let a = Q.values[r], c = 0;
        for (let u in a)
          Ot[r][c++].firstChild.nodeValue = a[u];
      }
  }
  function Ko(r, a) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      fe[u] = c;
    }) : Tu(r.idx) || fe.fill(r.idx), Q.idx = fe[0]), Te && Q.live) {
      for (let c = 0; c < w.length; c++)
        (c > 0 || o == 1 && !ht) && Za(c, fe[c]);
      qa();
    }
    dt = !1, a !== !1 && Re("setLegend");
  }
  n.setLegend = Ko;
  function Za(r, a) {
    let c = w[r], u = r == 0 && q == 2 ? kt : t[r], d;
    ht ? d = c.values(n, r, a) ?? ri : (d = c.value(n, a == null ? null : u[a], r, a), d = d == null ? ri : { _: d }), Q.values[r] = d;
  }
  function Pi(r, a, c) {
    cs = be, us = $e, [be, $e] = O.move(n, be, $e), O.left = be, O.top = $e, We && (Xi && It(Xi, Me(be), 0, K, T), en && It(en, 0, Me($e), K, T));
    let u, d = Oe > Ne;
    Jt = pe, ci = null;
    let m = S.ori == 0 ? K : T, v = S.ori == 1 ? K : T;
    if (be < 0 || Ie == 0 || d) {
      u = O.idx = null;
      for (let y = 0; y < w.length; y++) {
        let x = pt[y];
        x != null && It(x, -10, -10, K, T);
      }
      Gi && Lt(null, rn, !0, r == null && Ee.setSeries), Q.live && (fe.fill(u), dt = !0);
    } else {
      let y, x, A;
      o == 1 && (y = S.ori == 0 ? be : $e, x = Rt(y, D), u = O.idx = Ct(x, t[0], Oe, Ne), A = z(t[0][u], S, m, 0));
      let P = -10, C = -10, W = 0, ae = 0, re = !0, ee = "", I = "";
      for (let N = o == 2 ? 1 : 0; N < w.length; N++) {
        let ve = w[N], ke = fe[N], Fe = ke == null ? null : o == 1 ? t[N][ke] : t[N][1][ke], de = O.dataIdx(n, N, u, x), Ae = de == null ? null : o == 1 ? t[N][de] : t[N][1][de];
        if (dt = dt || Ae != Fe || de != ke, fe[N] = de, N > 0 && ve.show) {
          let rt = de == null ? -10 : de == u ? A : z(o == 1 ? t[0][de] : t[N][0][de], S, m, 0), Ye = Ae == null ? -10 : j(Ae, o == 1 ? $[ve.scale] : $[ve.facets[1].scale], v, 0);
          if (Gi && Ae != null) {
            let gt = S.ori == 1 ? be : $e, At = De(Ht.dist(n, N, de, Ye, gt));
            if (At < Jt) {
              let Ft = Ht.bias;
              if (Ft != 0) {
                let st = Rt(gt, ve.scale), mt = Ae >= 0 ? 1 : -1, Et = st >= 0 ? 1 : -1;
                Et == mt && (Et == 1 ? Ft == 1 ? Ae >= st : Ae <= st : (
                  // >= 0
                  Ft == 1 ? Ae <= st : Ae >= st
                )) && (Jt = At, ci = N);
              } else
                Jt = At, ci = N;
            }
          }
          if (dt || Yi) {
            let gt, At;
            S.ori == 0 ? (gt = rt, At = Ye) : (gt = Ye, At = rt);
            let Ft, st, mt, Et, Ut, Ke, lt = !0, Ti = Ve.bbox;
            if (Ti != null) {
              lt = !1;
              let qe = Ti(n, N);
              mt = qe.left, Et = qe.top, Ft = qe.width, st = qe.height;
            } else
              mt = gt, Et = At, Ft = st = Ve.size(n, N);
            if (Ke = Ve.fill(n, N), Ut = Ve.stroke(n, N), Yi)
              N == ci && Jt <= Ht.prox && (P = mt, C = Et, W = Ft, ae = st, re = lt, ee = Ke, I = Ut);
            else {
              let qe = pt[N];
              qe != null && (Ki[N] = mt, qi[N] = Et, Ks(qe, Ft, st, lt), Gs(qe, Ke, Ut), It(qe, vt(mt), vt(Et), K, T));
            }
          }
        }
      }
      if (Yi) {
        let N = Ht.prox, ve = Ei == null ? Jt <= N : Jt > N || ci != Ei;
        if (dt || ve) {
          let ke = pt[0];
          ke != null && (Ki[0] = P, qi[0] = C, Ks(ke, W, ae, re), Gs(ke, ee, I), It(ke, vt(P), vt(C), K, T));
        }
      }
    }
    if (_e.show && li)
      if (r != null) {
        let [y, x] = Ee.scales, [A, P] = Ee.match, [C, W] = r.cursor.sync.scales, ae = r.cursor.drag;
        if (He = ae._x, Le = ae._y, He || Le) {
          let { left: re, top: ee, width: I, height: N } = r.select, ve = r.scales[C].ori, ke = r.posToVal, Fe, de, Ae, rt, Ye, gt = y != null && A(y, C), At = x != null && P(x, W);
          gt && He ? (ve == 0 ? (Fe = re, de = I) : (Fe = ee, de = N), Ae = $[y], rt = z(ke(Fe, C), Ae, m, 0), Ye = z(ke(Fe + de, C), Ae, m, 0), Tn(Mt(rt, Ye), De(Ye - rt))) : Tn(0, m), At && Le ? (ve == 1 ? (Fe = re, de = I) : (Fe = ee, de = N), Ae = $[x], rt = j(ke(Fe, W), Ae, v, 0), Ye = j(ke(Fe + de, W), Ae, v, 0), Cn(Mt(rt, Ye), De(Ye - rt))) : Cn(0, v);
        } else
          Jo();
      } else {
        let y = De(cs - ls), x = De(us - as);
        if (S.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        He = Be.x && y >= Be.dist, Le = Be.y && x >= Be.dist;
        let A = Be.uni;
        A != null ? He && Le && (He = y >= A, Le = x >= A, !He && !Le && (x > y ? Le = !0 : He = !0)) : Be.x && Be.y && (He || Le) && (He = Le = !0);
        let P, C;
        He && (S.ori == 0 ? (P = tn, C = be) : (P = nn, C = $e), Tn(Mt(P, C), De(C - P)), Le || Cn(0, v)), Le && (S.ori == 1 ? (P = tn, C = be) : (P = nn, C = $e), Cn(Mt(P, C), De(C - P)), He || Tn(0, m)), !He && !Le && (Tn(0, 0), Cn(0, 0));
      }
    if (Be._x = He, Be._y = Le, r == null) {
      if (c) {
        if ($s != null) {
          let [y, x] = Ee.scales;
          Ee.values[0] = y != null ? Rt(S.ori == 0 ? be : $e, y) : null, Ee.values[1] = x != null ? Rt(S.ori == 1 ? be : $e, x) : null;
        }
        Dn(nr, n, be, $e, K, T, u);
      }
      if (Gi) {
        let y = c && Ee.setSeries, x = Ht.prox;
        Ei == null ? Jt <= x && Lt(ci, rn, !0, y) : Jt > x ? Lt(null, rn, !0, y) : ci != Ei && Lt(ci, rn, !0, y);
      }
    }
    dt && (Q.idx = u, Ko()), a !== !1 && Re("setCursor");
  }
  let ui = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ui == null && Mn(!1), ui;
    }
  });
  function Mn(r = !1) {
    r ? ui = null : (ui = E.getBoundingClientRect(), Re("syncRect", ui));
  }
  function ds(r, a, c, u, d, m, v) {
    O._lock || li && r != null && r.movementX == 0 && r.movementY == 0 || (qo(r, a, c, u, d, m, v, !1, r != null), r != null ? Pi(null, !0, !0) : Pi(a, !0, !1));
  }
  function qo(r, a, c, u, d, m, v, y, x) {
    if (ui == null && Mn(!1), ki(r), r != null)
      c = r.clientX - ui.left, u = r.clientY - ui.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [A, P] = Ee.scales, C = a.cursor.sync, [W, ae] = C.values, [re, ee] = C.scales, [I, N] = Ee.match, ve = a.axes[0].side % 2 == 1, ke = S.ori == 0 ? K : T, Fe = S.ori == 1 ? K : T, de = ve ? m : d, Ae = ve ? d : m, rt = ve ? u : c, Ye = ve ? c : u;
      if (re != null ? c = I(A, re) ? h(W, $[A], ke, 0) : -10 : c = ke * (rt / de), ee != null ? u = N(P, ee) ? h(ae, $[P], Fe, 0) : -10 : u = Fe * (Ye / Ae), S.ori == 1) {
        let gt = c;
        c = u, u = gt;
      }
    }
    x && (a == null || a.cursor.event.type == nr) && ((c <= 1 || c >= K - 1) && (c = Mi(c, K)), (u <= 1 || u >= T - 1) && (u = Mi(u, T))), y ? (ls = c, as = u, [tn, nn] = O.move(n, c, u)) : (be = c, $e = u);
  }
  const Zo = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Jo() {
    oo(Zo, !1);
  }
  let ps, gs, ms, bs;
  function _s(r, a, c, u, d, m, v) {
    li = !0, He = Le = Be._x = Be._y = !1, qo(r, a, c, u, d, m, v, !0, !1), r != null && (Ge(or, gr, vs, !1), Dn(Fs, n, tn, nn, K, T, null));
    let { left: y, top: x, width: A, height: P } = _e;
    ps = y, gs = x, ms = A, bs = P;
  }
  function vs(r, a, c, u, d, m, v) {
    li = Be._x = Be._y = !1, qo(r, a, c, u, d, m, v, !1, !0);
    let { left: y, top: x, width: A, height: P } = _e, C = A > 0 || P > 0, W = ps != y || gs != x || ms != A || bs != P;
    if (C && W && oo(_e), Be.setScale && C && W) {
      let ae = y, re = A, ee = x, I = P;
      if (S.ori == 1 && (ae = x, re = P, ee = y, I = A), He && ai(
        D,
        Rt(ae, D),
        Rt(ae + re, D)
      ), Le)
        for (let N in $) {
          let ve = $[N];
          N != D && ve.from == null && ve.min != pe && ai(
            N,
            Rt(ee + I, N),
            Rt(ee, N)
          );
        }
      Jo();
    } else O.lock && (O._lock = !O._lock, Pi(a, !0, r != null));
    r != null && (Vi(or, gr), Dn(or, n, be, $e, K, T, null));
  }
  function Ja(r, a, c, u, d, m, v) {
    if (O._lock)
      return;
    ki(r);
    let y = li;
    if (li) {
      let x = !0, A = !0, P = 10, C, W;
      S.ori == 0 ? (C = He, W = Le) : (C = Le, W = He), C && W && (x = be <= P || be >= K - P, A = $e <= P || $e >= T - P), C && x && (be = be < tn ? 0 : K), W && A && ($e = $e < nn ? 0 : T), Pi(null, !0, !0), li = !1;
    }
    be = -10, $e = -10, fe.fill(null), Pi(null, !0, !0), y && (li = y);
  }
  function ys(r, a, c, u, d, m, v) {
    O._lock || (ki(r), zo(), Jo(), r != null && Dn(Bs, n, be, $e, K, T, null));
  }
  function ws() {
    F.forEach(Wh), Do(n.width, n.height, !0);
  }
  Ni(bo, hn, ws);
  const sn = {};
  sn.mousedown = _s, sn.mousemove = ds, sn.mouseup = vs, sn.dblclick = ys, sn.setSeries = (r, a, c, u) => {
    let d = Ee.match[2];
    c = d(n, a, c), c != -1 && Lt(c, u, !0, !1);
  }, We && (Ge(Fs, E, _s), Ge(nr, E, ds), Ge(Us, E, (r) => {
    ki(r), Mn(!1);
  }), Ge(Is, E, Ja), Ge(Bs, E, ys), $r.add(n), n.syncRect = Mn);
  const ro = n.hooks = e.hooks || {};
  function Re(r, a, c) {
    jo ? Pn.push([r, a, c]) : r in ro && ro[r].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let a in r.hooks)
      ro[a] = (ro[a] || []).concat(r.hooks[a]);
  });
  const xs = (r, a, c) => c, Ee = Pe({
    key: null,
    setSeries: !1,
    filters: {
      pub: Xs,
      sub: Xs
    },
    scales: [D, w[1] ? w[1].scale : null],
    match: [el, el, xs],
    values: [null, null]
  }, O.sync);
  Ee.match.length == 2 && Ee.match.push(xs), O.sync = Ee;
  const $s = Ee.key, Qo = fa($s);
  function Dn(r, a, c, u, d, m, v) {
    Ee.filters.pub(r, a, c, u, d, m, v) && Qo.pub(r, a, c, u, d, m, v);
  }
  Qo.sub(n);
  function Qa(r, a, c, u, d, m, v) {
    Ee.filters.sub(r, a, c, u, d, m, v) && sn[r](null, a, c, u, d, m, v);
  }
  n.pub = Qa;
  function Xa() {
    Qo.unsub(n), $r.delete(n), yi.clear(), _r(bo, hn, ws), p.remove(), ue?.remove(), Re("destroy");
  }
  n.destroy = Xa;
  function Xo() {
    Re("init", e, t), Xr(t || e.data, !1), R[D] ? Wo(D, R[D]) : zo(), Qn = _e.show && (_e.width > 0 || _e.height > 0), Si = dt = !0, Do(e.width, e.height);
  }
  return w.forEach(Jr), F.forEach(Ma), i ? i instanceof HTMLElement ? (i.appendChild(p), Xo()) : i(n, Xo) : Xo(), n;
}
je.assign = Pe;
je.fmtNum = Rr;
je.rangeNum = _o;
je.rangeLog = $o;
je.rangeAsinh = Hr;
je.orient = Ui;
je.pxRatio = ce;
je.join = Hu;
je.fmtDate = Ur, je.tzDate = Yu;
je.sync = fa;
{
  je.addGap = Th, je.clipGaps = Ao;
  let e = je.paths = {
    points: _a
  };
  e.linear = ya, e.stepped = Dh, e.bars = zh, e.spline = Nh;
}
const Gh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Yh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, Yt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Kh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Yh(t, i, o), o;
};
const qh = 24;
let wt = class extends Ue {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._hasFetched = !1, this._intervals = [];
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._destroyPlot();
  }
  updated(e) {
    if (!this._hasFetched) {
      this._hasFetched = !0, this._fetch();
      return;
    }
    (e.has("roomEntity") || e.has("lowEntity") || e.has("highEntity") || e.has("actionEntity")) && this._fetch();
  }
  async _fetch() {
    if (!this.hass || !this.roomEntity) return;
    this._loading = !0, this._error = null, this._empty = !1;
    const e = /* @__PURE__ */ new Date(), t = new Date(e.getTime() - qh * 60 * 60 * 1e3), i = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (n) => !!n
    );
    try {
      const n = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: t.toISOString(),
        end_time: e.toISOString(),
        entity_ids: i,
        minimal_response: !1,
        no_attributes: !0
      });
      this._renderPlot(n), this._loading = !1;
    } catch (n) {
      this._error = n instanceof Error ? n.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
    }
  }
  /** Convert HA's `[{s, lu}, ...]` to a (sorted by time) numeric series.
   *  Skips entries whose state isn't a finite number. */
  _numericSeries(e) {
    if (!e) return [];
    const t = [];
    for (const i of e) {
      const n = parseFloat(i.s);
      Number.isFinite(n) && t.push([i.lu, n]);
    }
    return t.sort((i, n) => i[0] - n[0]), t;
  }
  /** Build aligned uPlot data: a single sorted x axis and forward-filled
   *  values for each numeric series. */
  _alignSeries(e, t) {
    const i = /* @__PURE__ */ new Set();
    for (const s of e) for (const [l] of s) i.add(l);
    if (i.size === 0) return [[t], ...e.map(() => [null])];
    const n = [...i].sort((s, l) => s - l), o = e.map((s) => {
      let l = -1, h = null;
      return n.map((f) => {
        for (; l + 1 < s.length && s[l + 1][0] <= f; )
          l++, h = s[l][1];
        return h;
      });
    });
    return [n, ...o];
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
    const t = Math.floor(Date.now() / 1e3), i = this._numericSeries(e[this.roomEntity]), n = this._numericSeries(e[this.lowEntity]), o = this._numericSeries(e[this.highEntity]);
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && o.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([i, n, o], t), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new je(l, s, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = getComputedStyle(this), i = t.getPropertyValue("--cb-action-heating").trim() || "#d9603f", n = t.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", o = t.getPropertyValue("--primary-color").trim() || "#03a9f4";
    return {
      width: e,
      height: 260,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: {
        x: { time: !0 }
      },
      axes: [
        {
          stroke: "var(--secondary-text-color)",
          grid: { stroke: "var(--divider-color)" }
        },
        {
          stroke: "var(--secondary-text-color)",
          grid: { stroke: "var(--divider-color)" },
          size: 38
        }
      ],
      series: [
        {},
        {
          label: "Room",
          stroke: o,
          width: 2,
          spanGaps: !0
        },
        {
          label: "Low",
          stroke: i,
          width: 1.5,
          dash: [6, 3],
          spanGaps: !0
        },
        {
          label: "High",
          stroke: n,
          width: 1.5,
          dash: [6, 3],
          spanGaps: !0
        }
      ],
      hooks: {
        draw: [
          (s) => {
            const l = s.ctx;
            if (!l) return;
            const h = s.bbox.top, f = s.bbox.height;
            l.save();
            for (const p of this._intervals) {
              const b = s.valToPos(p.start, "x", !0), g = s.valToPos(p.end, "x", !0);
              g <= b || (l.fillStyle = p.action === "heating" ? xl(i, 0.18) : xl(n, 0.18), l.fillRect(b, h, g - b, f));
            }
            l.restore();
          }
        ]
      }
    };
  }
  _observeResize() {
    !this._host || this._resizeObserver || (this._resizeObserver = new ResizeObserver((e) => {
      const t = e[0]?.contentRect.width ?? 0;
      this._plot && t > 0 && this._plot.setSize({ width: t, height: 260 });
    }), this._resizeObserver.observe(this._host));
  }
  _destroyPlot() {
    this._plot && (this._plot.destroy(), this._plot = null), this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null);
  }
  render() {
    return !this.hass || !this.roomEntity ? M`<div class="status">No room temperature sensor for this zone.</div>` : M`
      ${this._loading ? M`<div class="status">Loading 24 h history…</div>` : X}
      ${this._error ? M`<div class="status">${this._error}</div>` : X}
      ${this._empty ? M`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : X}
      <div class="chart-host"></div>
      <div class="legend">
        <span><span class="swatch" style="background:var(--primary-color)"></span>Room</span>
        <span
          ><span class="swatch" style="background:var(--cb-action-heating)"></span>Low band</span
        >
        <span
          ><span class="swatch" style="background:var(--cb-action-cooling)"></span>High band</span
        >
        <span
          ><span class="swatch" style="background:var(--cb-action-heating);opacity:0.18"></span>
          Heating</span
        >
        <span
          ><span class="swatch" style="background:var(--cb-action-cooling);opacity:0.18"></span>
          Cooling</span
        >
      </div>
    `;
  }
};
wt.styles = [
  it,
  Pl(Gh),
  Je`
      :host {
        display: block;
        width: 100%;
        color-scheme: light dark;
      }
      .chart-host {
        width: 100%;
        height: 260px;
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
         up HA's dark/light tokens automatically. */
      .u-wrap {
        --u-fg: var(--primary-text-color, #212121);
      }
      .u-axis,
      .u-legend {
        color: var(--secondary-text-color, #727272);
      }
      .u-grid line {
        stroke: var(--divider-color, #e0e0e0);
      }
    `
];
Yt([
  V({ attribute: !1 })
], wt.prototype, "hass", 2);
Yt([
  V({ type: String })
], wt.prototype, "roomEntity", 2);
Yt([
  V({ type: String })
], wt.prototype, "lowEntity", 2);
Yt([
  V({ type: String })
], wt.prototype, "highEntity", 2);
Yt([
  V({ type: String })
], wt.prototype, "actionEntity", 2);
Yt([
  le()
], wt.prototype, "_loading", 2);
Yt([
  le()
], wt.prototype, "_error", 2);
Yt([
  le()
], wt.prototype, "_empty", 2);
Yt([
  vn(".chart-host")
], wt.prototype, "_host", 2);
wt = Yt([
  tt("comfort-band-history-chart")
], wt);
function xl(e, t) {
  const i = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), f = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${f}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : i;
}
var Zh = Object.defineProperty, Jh = Object.getOwnPropertyDescriptor, Yr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Jh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Zh(t, i, o), o;
};
let Gn = class extends Ue {
  render() {
    const e = this.entities?.roomTemperature;
    return e ? M`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${X}
    ` : M`<div class="empty">No room temperature sensor for this zone.</div>`;
  }
};
Gn.styles = [
  it,
  Je`
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
    `
];
Yr([
  V({ attribute: !1 })
], Gn.prototype, "hass", 2);
Yr([
  V({ attribute: !1 })
], Gn.prototype, "entities", 2);
Gn = Yr([
  tt("comfort-band-insights-tab")
], Gn);
var Qh = Object.defineProperty, Xh = Object.getOwnPropertyDescriptor, Sn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Xh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Qh(t, i, o), o;
};
const Xt = 15, Vt = 0.5, Qt = 14, Bt = 28, $l = 4, ef = 500, an = 600, co = 200, Sl = 0, kr = 24 * 60 - Xt, cr = [0, 6, 12, 18, 24], kl = [14, 18, 22, 26];
function Tt(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function ur(e) {
  const t = Math.max(0, Math.min(kr, e)), i = Math.floor(t / 60), n = t % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function tf(e) {
  return Math.round(e / Xt) * Xt;
}
function hr(e) {
  return Math.round(e / Vt) * Vt;
}
function bt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let mi = class extends Ue {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (e, t, i) => {
      e.stopPropagation(), e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
      const o = {
        kind: "handle",
        handle: i,
        origin: { ...t },
        startX: e.clientX,
        startY: e.clientY,
        moved: !1,
        longPressTimer: null,
        longPressed: !1,
        range: this._timeRangeFor(t.at)
      };
      o.longPressTimer = window.setTimeout(() => {
        o.longPressTimer = null, this._drag === o && !o.moved && (o.longPressed = !0, this._fire("transition-delete", { at: o.origin.at }));
      }, ef), this._drag = o;
    }, this._onHandlePointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle" || t.longPressed) return;
      const i = e.clientX - t.startX, n = e.clientY - t.startY;
      if (!t.moved && Math.hypot(i, n) < $l) return;
      t.moved || (t.moved = !0, t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null));
      const o = this._svg();
      if (!o) {
        this._preview = { at: t.origin.at, low: t.origin.low, high: t.origin.high };
        return;
      }
      const s = o.getBoundingClientRect(), l = bt(
        this._clientToMinutes(e.clientX, s),
        t.range.min,
        t.range.max
      ), h = this._clientToTemp(e.clientY, s);
      let f = t.origin.low, p = t.origin.high;
      t.handle === "low" ? f = bt(h, Qt, p - Vt) : p = bt(h, f + Vt, Bt), this._preview = { at: ur(l), low: f, high: p };
    }, this._onHandlePointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle") return;
      const i = e.currentTarget;
      try {
        i.releasePointerCapture(e.pointerId);
      } catch {
      }
      t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null);
      const n = this._preview;
      if (this._drag = null, this._preview = null, !t.longPressed) {
        if (!t.moved) {
          this._fire("transition-edit", { transition: t.origin });
          return;
        }
        n && (this._focusedAt === t.origin.at && (this._focusedAt = n.at), this._fire("transition-update", {
          oldAt: t.origin.at,
          transition: { at: n.at, low: n.low, high: n.high }
        }));
      }
    }, this._onHandlePointerCancel = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle") return;
      const i = e.currentTarget;
      try {
        i.releasePointerCapture(e.pointerId);
      } catch {
      }
      t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null), this._drag = null, this._preview = null;
    }, this._onBackgroundPointerDown = (e) => {
      const t = this._svg();
      if (!t) return;
      try {
        t.setPointerCapture(e.pointerId);
      } catch {
      }
      const i = {
        kind: "empty",
        startX: e.clientX,
        startY: e.clientY,
        moved: !1
      };
      this._drag = i;
    }, this._onBackgroundPointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty" || t.moved) return;
      const i = e.clientX - t.startX, n = e.clientY - t.startY;
      Math.hypot(i, n) >= $l && (t.moved = !0);
    }, this._onBackgroundPointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty")
        return;
      const i = this._svg();
      try {
        i?.releasePointerCapture(e.pointerId);
      } catch {
      }
      const n = t.moved, o = e.type === "pointercancel";
      if (this._drag = null, o || n || !i) return;
      const s = i.getBoundingClientRect(), l = bt(this._clientToMinutes(e.clientX, s), Sl, kr);
      for (const b of this.transitions) if (Tt(b.at) === l) return;
      const h = this._clientToTemp(e.clientY, s), f = bt(hr(h - 1.5), Qt, Bt - Vt), p = bt(hr(h + 1.5), f + Vt, Bt);
      this._fire("transition-add", { at: ur(l), low: f, high: p });
    }, this._onHandleKeyDown = (e, t, i) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(), this._fire("transition-edit", { transition: t });
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault(), this._fire("transition-delete", { at: t.at });
        return;
      }
      let n = 0, o = 0;
      switch (e.key) {
        case "ArrowLeft":
          n = -Xt;
          break;
        case "ArrowRight":
          n = Xt;
          break;
        case "ArrowUp":
          o = Vt;
          break;
        case "ArrowDown":
          o = -Vt;
          break;
        default:
          return;
      }
      e.preventDefault();
      const s = this._timeRangeFor(t.at), l = bt(Tt(t.at) + n, s.min, s.max);
      let h = t.low, f = t.high;
      if (i === "low" ? h = bt(t.low + o, Qt, f - Vt) : f = bt(t.high + o, h + Vt, Bt), l === Tt(t.at) && h === t.low && f === t.high)
        return;
      const p = ur(l);
      this._focusedAt === t.at && (this._focusedAt = p), this._fire("transition-update", {
        oldAt: t.at,
        transition: { at: p, low: h, high: f }
      });
    }, this._onHandleFocus = (e, t) => {
      this._focusedAt = e.at, this._focusedHandle = t;
    }, this._onHandleBlur = () => {
      this._focusedAt = null, this._focusedHandle = null;
    };
  }
  disconnectedCallback() {
    this._drag && this._drag.kind === "handle" && this._drag.longPressTimer !== null && window.clearTimeout(this._drag.longPressTimer), this._drag = null, this._preview = null, super.disconnectedCallback();
  }
  _timeToX(e) {
    return e / (24 * 60) * an;
  }
  _tempToY(e) {
    const t = bt(e, Qt, Bt);
    return co - (t - Qt) / (Bt - Qt) * co;
  }
  _clientToMinutes(e, t) {
    if (t.width === 0) return 0;
    const i = bt((e - t.left) / t.width, 0, 1);
    return tf(i * 24 * 60);
  }
  _clientToTemp(e, t) {
    if (t.height === 0) return Qt;
    const i = bt((e - t.top) / t.height, 0, 1), n = Bt - i * (Bt - Qt);
    return hr(n);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((e) => Tt(e.at)).sort((e, t) => e - t);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(e) {
    const t = Tt(e), i = this._sortedAts().filter((s) => s !== t);
    let n = Sl, o = kr;
    for (const s of i)
      s < t && s + Xt > n && (n = s + Xt), s > t && s - Xt < o && (o = s - Xt);
    return { min: n, max: o };
  }
  _fire(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const e = [...this.transitions].sort((i, n) => Tt(i.at) - Tt(n.at));
    if (!this._preview || !this._drag || this._drag.kind !== "handle") return e;
    const t = this._drag;
    return e.map(
      (i) => i.at === t.origin.at ? { at: this._preview.at, low: this._preview.low, high: this._preview.high } : i
    );
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is already sorted by `at` ascending — every
   *  caller goes through `_renderedTransitions()` which sorts. */
  _stepPoints(e, t) {
    const i = e[e.length - 1][t], n = [[0, this._tempToY(i)]];
    let o = i;
    for (const s of e) {
      const l = this._timeToX(Tt(s.at));
      n.push([l, this._tempToY(o)]), n.push([l, this._tempToY(s[t])]), o = s[t];
    }
    return n.push([an, this._tempToY(o)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = this._renderedTransitions(), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return M`
      <div class="chart">
        <svg
          viewBox="0 0 ${an} ${co}"
          preserveAspectRatio="none"
          role="group"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          <title>Schedule chart for the active profile</title>
          ${kl.map(
      (h) => di`<line class="grid" x1="0" x2=${an} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${cr.map(
      (h) => di`<line class="grid" y1="0" y2=${co} x1=${h / 24 * an} x2=${h / 24 * an}></line>`
    )}
          ${e.length > 0 ? di`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const f = this._timeToX(Tt(h.at)), p = this._tempToY(h.low), b = this._tempToY(h.high), g = this._focusedAt === h.at && this._focusedHandle === "low", _ = this._focusedAt === h.at && this._focusedHandle === "high", k = this._drag?.kind === "handle" && this._drag.origin.at === h.at ? this._drag.handle : null, E = `Low handle at ${h.at}, ${h.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, H = `High handle at ${h.at}, ${h.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, U = `handle low${g ? " focused" : ""}${k === "low" ? " dragging" : ""}`, B = `handle high${_ ? " focused" : ""}${k === "high" ? " dragging" : ""}`;
      return di`
              <circle
                class=${U}
                cx=${f}
                cy=${p}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${E}
                data-at=${h.at}
                data-handle="low"
                @pointerdown=${(w) => this._onHandlePointerDown(w, h, "low")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(w) => this._onHandleKeyDown(w, h, "low")}
                @focus=${() => this._onHandleFocus(h, "low")}
                @blur=${this._onHandleBlur}
              ></circle>
              <circle
                class=${B}
                cx=${f}
                cy=${b}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${H}
                data-at=${h.at}
                data-handle="high"
                @pointerdown=${(w) => this._onHandlePointerDown(w, h, "high")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(w) => this._onHandleKeyDown(w, h, "high")}
                @focus=${() => this._onHandleFocus(h, "high")}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
    })}
        </svg>
        ${kl.map(
      (h) => M`<div
              class="axis-label y"
              style="top: ${(Bt - h) / (Bt - Qt) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${cr.map((h, f) => {
      const p = f === 0 ? "axis-label x start" : f === cr.length - 1 ? "axis-label x end" : "axis-label x";
      return M`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
        ${this.transitions.length === 0 ? M`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
mi.styles = [
  it,
  Je`
      :host {
        display: block;
        position: relative;
        margin: var(--cb-gap-md) 0;
      }
      .chart {
        position: relative;
        width: 100%;
        height: 200px;
        user-select: none;
        touch-action: none;
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
        cursor: crosshair;
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
      .handle {
        fill: var(--ha-card-background, #ffffff);
        stroke: var(--cb-accent, var(--primary-color, #03a9f4));
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        cursor: grab;
      }
      .handle:focus-visible,
      .handle.focused {
        outline: none;
        stroke-width: 3;
        filter: drop-shadow(0 0 2px var(--cb-accent, var(--primary-color, #03a9f4)));
      }
      .handle.dragging {
        cursor: grabbing;
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
      .empty-hint {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: var(--cb-text-secondary);
        pointer-events: none;
      }
    `
];
Sn([
  V({ type: Array })
], mi.prototype, "transitions", 2);
Sn([
  le()
], mi.prototype, "_drag", 2);
Sn([
  le()
], mi.prototype, "_preview", 2);
Sn([
  le()
], mi.prototype, "_focusedAt", 2);
Sn([
  le()
], mi.prototype, "_focusedHandle", 2);
mi = Sn([
  tt("comfort-band-schedule-chart")
], mi);
var nf = Object.defineProperty, of = Object.getOwnPropertyDescriptor, _i = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? of(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && nf(t, i, o), o;
};
let jt = class extends Ue {
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
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(this._at) ? Number.isNaN(this._low) || Number.isNaN(this._high) ? (this._error = "Low and high must be numbers.", !1) : this._low >= this._high ? (this._error = "Low must be less than high.", !1) : this._low < 10 || this._high > 35 ? (this._error = "Temperatures must be between 10 °C and 35 °C.", !1) : (this._error = null, !0) : (this._error = "Time must be HH:MM (24h, e.g. 06:00).", !1);
  }
  render() {
    return M`
      <h3>${this.isNew ? "Add transition" : "Edit transition"}</h3>
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
        Low (°C)
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
        High (°C)
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
      ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : M`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
jt.styles = [
  it,
  Je`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        /* See modal.ts for why we avoid --ha-card-background here:
           per-card theme overrides (e.g. a transparent floorplan
           overlay) would otherwise make this nested dialog unreadable. */
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--primary-text-color, #212121);
        border-radius: var(--cb-radius-card);
        /* Tells the browser to use dark-mode defaults for native form
           controls when the HA theme is dark. Without this, native
           <input>s render with OS light-mode chrome and our color rules
           lose to the user-agent stylesheet. */
        color-scheme: light dark;
      }
      h3 {
        margin: 0 0 var(--cb-gap-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #212121);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
        /* Bumped from secondary → primary; the secondary contrast was
           too low against HA's dark dialog bg in real-world testing. */
        color: var(--primary-text-color, #212121);
      }
      input {
        font: inherit;
        font-size: 14px;
        padding: 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--primary-text-color, #212121);
        background-color: var(
          --mdc-text-field-fill-color,
          var(--secondary-background-color, var(--card-background-color, #ffffff))
        );
        appearance: none;
        -webkit-appearance: none;
      }
      input::placeholder {
        color: var(--secondary-text-color, #727272);
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
        color: var(--primary-text-color, #212121);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `
];
_i([
  V({ type: Object })
], jt.prototype, "transition", 2);
_i([
  V({ type: Boolean })
], jt.prototype, "isNew", 2);
_i([
  le()
], jt.prototype, "_at", 2);
_i([
  le()
], jt.prototype, "_low", 2);
_i([
  le()
], jt.prototype, "_high", 2);
_i([
  le()
], jt.prototype, "_error", 2);
_i([
  vn('input[name="at"]')
], jt.prototype, "_atInput", 2);
jt = _i([
  tt("transition-edit-dialog")
], jt);
var rf = Object.defineProperty, sf = Object.getOwnPropertyDescriptor, Kt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? sf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && rf(t, i, o), o;
};
function fr(e, t) {
  return Tt(e.at) - Tt(t.at);
}
let xt = class extends Ue {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._subscribeGen = 0, this._onAdd = (e) => {
      this._newAt = e.detail.at, this._newLow = e.detail.low, this._newHigh = e.detail.high, this._editing = null, this._mode = "add";
    }, this._onEdit = (e) => {
      this._editing = e.detail.transition, this._mode = "edit";
    }, this._onDelete = async (e) => {
      if (!this.hass) return;
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t);
    }, this._onUpdate = async (e) => {
      if (!this.hass) return;
      const { oldAt: t, transition: i } = e.detail, n = this._transitions.filter((o) => o.at !== t && o.at !== i.at).concat(i).sort(fr);
      await this._writeSchedule(n);
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
      i.sort(fr), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = Al(this.hass) ?? "home", this._subscribe());
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Al(this.hass);
      t && t !== this._profile && (this._profile = t, this._resubscribe());
    }
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
      const t = await Mc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(fr) : [], this._loading = !1);
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
  async _writeSchedule(e) {
    if (!this.hass) return;
    const t = this._transitions;
    this._transitions = e;
    try {
      await Dc(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return X;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? lf(this._transitions),
        high: this._newHigh ?? af(this._transitions)
      };
      return M`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return M`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? M`<div class="loading">Loading schedule…</div>` : this._error ? M`<div class="error" role="alert">${this._error}</div>` : M`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
                @transition-add=${this._onAdd}
                @transition-edit=${this._onEdit}
                @transition-delete=${this._onDelete}
                @transition-update=${this._onUpdate}
              ></comfort-band-schedule-chart>
              ${this._renderList()}
            `}
    `;
  }
  _renderList() {
    return this._transitions.length === 0 ? X : M`
      <ul class="list">
        ${this._transitions.map((e) => {
      const t = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: e } }));
      return M`
            <li
              role="button"
              tabindex="0"
              aria-label="Edit transition at ${e.at}, ${e.low.toFixed(1)} to ${e.high.toFixed(
        1
      )} degrees"
              @click=${t}
              @keydown=${(i) => {
        (i.key === "Enter" || i.key === " ") && (i.preventDefault(), t());
      }}
            >
              <span class="at">${e.at}</span>
              <span>${e.low.toFixed(1)}° – ${e.high.toFixed(1)}°</span>
            </li>
          `;
    })}
      </ul>
    `;
  }
};
xt.styles = [
  it,
  Je`
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
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .profile-value {
        font-size: 14px;
        font-weight: 500;
        text-transform: capitalize;
        color: var(--cb-text-primary);
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
      .list {
        list-style: none;
        padding: 0;
        margin: var(--cb-gap-md) 0 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .list li {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        padding: 6px 8px;
        border-radius: 6px;
      }
      .list li:hover {
        background: var(--cb-track-bg);
        cursor: pointer;
      }
      .list .at {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
      }
    `
];
Kt([
  V({ attribute: !1 })
], xt.prototype, "hass", 2);
Kt([
  V({ type: String })
], xt.prototype, "zone", 2);
Kt([
  le()
], xt.prototype, "_profile", 2);
Kt([
  le()
], xt.prototype, "_transitions", 2);
Kt([
  le()
], xt.prototype, "_loading", 2);
Kt([
  le()
], xt.prototype, "_error", 2);
Kt([
  le()
], xt.prototype, "_mode", 2);
Kt([
  le()
], xt.prototype, "_editing", 2);
Kt([
  le()
], xt.prototype, "_newAt", 2);
xt = Kt([
  tt("comfort-band-schedule-tab")
], xt);
function Al(e) {
  const t = Ll(e);
  return t ? e.states[t]?.state ?? null : null;
}
function lf(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function af(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var cf = Object.defineProperty, uf = Object.getOwnPropertyDescriptor, vi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? uf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && cf(t, i, o), o;
};
const hf = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "insights", label: "Insights" }
];
let Wt = class extends Ue {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
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
    if (!this._isOpen) return X;
    const e = this.zoneName || this.zone || "Comfort Band";
    return M`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${hf.map(
      (t) => M`
                <button
                  role="tab"
                  aria-selected=${this._activeTab === t.id}
                  @click=${() => this._onSelectTab(t.id)}
                >
                  ${t.label}
                </button>
              `
    )}
          </nav>
          <div class="panel" role="tabpanel">${this._renderTab()}</div>
        </div>
      </dialog>
    `;
  }
  _renderTab() {
    switch (this._activeTab) {
      case "now":
        return M`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return M`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return M`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "insights":
        return M`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Wt.styles = [
  it,
  Je`
      :host {
        --cb-modal-max-width: 480px;
      }
      dialog {
        width: min(90vw, var(--cb-modal-max-width));
        max-height: min(90vh, 720px);
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
vi([
  V({ attribute: !1 })
], Wt.prototype, "hass", 2);
vi([
  V({ type: String })
], Wt.prototype, "zone", 2);
vi([
  V({ type: String })
], Wt.prototype, "zoneName", 2);
vi([
  V({ attribute: !1 })
], Wt.prototype, "entities", 2);
vi([
  le()
], Wt.prototype, "_activeTab", 2);
vi([
  le()
], Wt.prototype, "_isOpen", 2);
vi([
  vn("dialog")
], Wt.prototype, "_dialog", 2);
Wt = vi([
  tt("comfort-band-modal")
], Wt);
var ff = Object.defineProperty, df = Object.getOwnPropertyDescriptor, Kr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? df(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && ff(t, i, o), o;
};
let Yn = class extends Ue {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (e) => {
      const t = e.target.value;
      this._fireConfig({ ...this.config, zone: t });
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
      return M`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return M`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? M`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (i) => M` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
    )}
        </select>
      </label>
      <label>
        Variant
        <select @change=${this._onVariantChange} .value=${t}>
          <option value="tile" ?selected=${t === "tile"}>Tile (default)</option>
          <option value="mini" ?selected=${t === "mini"}>
            Mini (number only, for floorplans)
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
  it,
  Je`
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
      input[type='checkbox'] {
        font: inherit;
      }
      /* Native <select> picks up OS chrome in many browsers, which
         bypasses theme variables. appearance:none strips the chrome
         so the theme-aware bg/text colors actually take. */
      select {
        font-size: 14px;
        padding: 8px 32px 8px 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 6px;
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
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
Kr([
  V({ attribute: !1 })
], Yn.prototype, "hass", 2);
Kr([
  V({ attribute: !1 })
], Yn.prototype, "config", 2);
Yn = Kr([
  tt("comfort-band-card-editor")
], Yn);
var pf = Object.defineProperty, gf = Object.getOwnPropertyDescriptor, Co = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && pf(t, i, o), o;
};
let _n = class extends Ue {
  constructor() {
    super(...arguments), this._onTileTap = () => {
      this._modal?.open();
    };
  }
  setConfig(e) {
    if (!e?.zone)
      throw new Error("comfort-band-card: `zone` is required");
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
    if (!this._config || !this.hass) return M``;
    const e = this._config.zone, t = Kc(this.hass, e);
    if (t.deviceId === null)
      return M`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return M`
      <comfort-band-tile
        zoneName=${o.zoneName}
        .roomTemp=${o.roomTemp}
        .low=${o.low}
        .high=${o.high}
        .action=${o.action}
        .overrideActive=${o.overrideActive}
        .overrideEnds=${o.overrideEnds}
        .noExpand=${i}
        .variant=${n}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${i ? null : M`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const i = (o) => o !== null ? e.states[o] : void 0, n = (o) => {
      const s = i(o);
      if (!s) return NaN;
      const l = parseFloat(s.state);
      return Number.isFinite(l) ? l : NaN;
    };
    return {
      zoneName: t.deviceName ?? this._config.zone,
      low: n(t.effectiveLow),
      high: n(t.effectiveHigh),
      roomTemp: n(t.roomTemperature),
      action: i(t.currentAction)?.state ?? "unknown",
      overrideActive: i(t.overrideActive)?.state === "on",
      overrideEnds: i(t.overrideEnds)?.state ?? null
    };
  }
};
_n.styles = [
  it,
  Je`
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
Co([
  V({ attribute: !1 })
], _n.prototype, "hass", 2);
Co([
  le()
], _n.prototype, "_config", 2);
Co([
  vn("comfort-band-modal")
], _n.prototype, "_modal", 2);
_n = Co([
  tt("comfort-band-card")
], _n);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.3.2 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
