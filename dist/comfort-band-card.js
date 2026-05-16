const uo = globalThis, Ar = uo.ShadowRoot && (uo.ShadyCSS === void 0 || uo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Er = Symbol(), ks = /* @__PURE__ */ new WeakMap();
let El = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== Er) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ar && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = ks.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ks.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pl = (t) => new El(typeof t == "string" ? t : t + "", void 0, Er), Jt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, o, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[s + 1], t[0]);
  return new El(i, t, Er);
}, tc = (t, e) => {
  if (Ar) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), o = uo.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, t.appendChild(n);
  }
}, As = Ar ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Pl(i);
})(t) : t;
const { is: ec, defineProperty: ic, getOwnPropertyDescriptor: nc, getOwnPropertyNames: oc, getOwnPropertySymbols: rc, getPrototypeOf: sc } = Object, yo = globalThis, Es = yo.trustedTypes, lc = Es ? Es.emptyScript : "", ac = yo.reactiveElementPolyfillSupport, Fn = (t, e) => t, fo = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? lc : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Pr = (t, e) => !ec(t, e), Ps = { attribute: !0, type: String, converter: fo, reflect: !1, useDefault: !1, hasChanged: Pr };
Symbol.metadata ??= Symbol("metadata"), yo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let cn = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ps) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(e, n, i);
      o !== void 0 && ic(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: o, set: s } = nc(this.prototype, e) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: o, set(l) {
      const h = o?.call(this);
      s?.call(this, l), this.requestUpdate(e, h, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ps;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Fn("elementProperties"))) return;
    const e = sc(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Fn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Fn("properties"))) {
      const i = this.properties, n = [...oc(i), ...rc(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const o of n) i.unshift(As(o));
    } else e !== void 0 && i.push(As(e));
    return i;
  }
  static _$Eu(e, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return tc(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, n) {
    this._$AK(e, n);
  }
  _$ET(e, i) {
    const n = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : fo).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, o = n._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : fo;
      this._$Em = o;
      const h = l.fromAttribute(i, s.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, o = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (s = this[e]), n ??= l.getPropertyOptions(e), !((n.hasChanged ?? Pr)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: o, wrapped: s }, l) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, l ?? i ?? this[e]), s !== !0 || l !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
cn.elementStyles = [], cn.shadowRootOptions = { mode: "open" }, cn[Fn("elementProperties")] = /* @__PURE__ */ new Map(), cn[Fn("finalized")] = /* @__PURE__ */ new Map(), ac?.({ ReactiveElement: cn }), (yo.reactiveElementVersions ??= []).push("2.1.2");
const Tr = globalThis, Ts = (t) => t, po = Tr.trustedTypes, Cs = po ? po.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Tl = "$lit$", fi = `lit$${Math.random().toFixed(9).slice(2)}$`, Cl = "?" + fi, cc = `<${Cl}>`, Hi = document, Bn = () => Hi.createComment(""), Vn = (t) => t === null || typeof t != "object" && typeof t != "function", Cr = Array.isArray, uc = (t) => Cr(t) || typeof t?.[Symbol.iterator] == "function", tr = `[ 	
\f\r]`, zn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ms = /-->/g, Ds = />/g, Ci = RegExp(`>|${tr}(?:([^\\s"'>=/]+)(${tr}*=${tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zs = /'/g, Os = /"/g, Ml = /^(?:script|style|textarea|title)$/i, Dl = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), M = Dl(1), di = Dl(2), fn = Symbol.for("lit-noChange"), it = Symbol.for("lit-nothing"), Ns = /* @__PURE__ */ new WeakMap(), Oi = Hi.createTreeWalker(Hi, 129);
function zl(t, e) {
  if (!Cr(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Cs !== void 0 ? Cs.createHTML(e) : e;
}
const hc = (t, e) => {
  const i = t.length - 1, n = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = zn;
  for (let h = 0; h < i; h++) {
    const f = t[h];
    let p, b, g = -1, _ = 0;
    for (; _ < f.length && (l.lastIndex = _, b = l.exec(f), b !== null); ) _ = l.lastIndex, l === zn ? b[1] === "!--" ? l = Ms : b[1] !== void 0 ? l = Ds : b[2] !== void 0 ? (Ml.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = Ci) : b[3] !== void 0 && (l = Ci) : l === Ci ? b[0] === ">" ? (l = o ?? zn, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Ci : b[3] === '"' ? Os : zs) : l === Os || l === zs ? l = Ci : l === Ms || l === Ds ? l = zn : (l = Ci, o = void 0);
    const k = l === Ci && t[h + 1].startsWith("/>") ? " " : "";
    s += l === zn ? f + cc : g >= 0 ? (n.push(p), f.slice(0, g) + Tl + f.slice(g) + fi + k) : f + fi + (g === -2 ? h : k);
  }
  return [zl(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class jn {
  constructor({ strings: e, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = e.length - 1, f = this.parts, [p, b] = hc(e, i);
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
  static createElement(e, i) {
    const n = Hi.createElement("template");
    return n.innerHTML = e, n;
  }
}
function dn(t, e, i = t, n) {
  if (e === fn) return e;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Vn(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(t), o._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (e = dn(t, o._$AS(t, e.values), o, n)), e;
}
class fc {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: n } = this._$AD, o = (e?.creationScope ?? Hi).importNode(i, !0);
    Oi.currentNode = o;
    let s = Oi.nextNode(), l = 0, h = 0, f = n[0];
    for (; f !== void 0; ) {
      if (l === f.index) {
        let p;
        f.type === 2 ? p = new Kn(s, s.nextSibling, this, e) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, e) : f.type === 6 && (p = new mc(s, this, e)), this._$AV.push(p), f = n[++h];
      }
      l !== f?.index && (s = Oi.nextNode(), l++);
    }
    return Oi.currentNode = Hi, o;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Kn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, o) {
    this.type = 2, this._$AH = it, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = dn(this, e, i), Vn(e) ? e === it || e == null || e === "" ? (this._$AH !== it && this._$AR(), this._$AH = it) : e !== this._$AH && e !== fn && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : uc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== it && Vn(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Hi.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = jn.createElement(zl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new fc(o, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Ns.get(e.strings);
    return i === void 0 && Ns.set(e.strings, i = new jn(e)), i;
  }
  k(e) {
    Cr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of e) o === i.length ? i.push(n = new Kn(this.O(Bn()), this.O(Bn()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = Ts(e).nextSibling;
      Ts(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class wo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, o, s) {
    this.type = 1, this._$AH = it, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = it;
  }
  _$AI(e, i = this, n, o) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = dn(this, e, i, 0), l = !Vn(e) || e !== this._$AH && e !== fn, l && (this._$AH = e);
    else {
      const h = e;
      let f, p;
      for (e = s[0], f = 0; f < s.length - 1; f++) p = dn(this, h[n + f], i, f), p === fn && (p = this._$AH[f]), l ||= !Vn(p) || p !== this._$AH[f], p === it ? e = it : e !== it && (e += (p ?? "") + s[f + 1]), this._$AH[f] = p;
    }
    l && !o && this.j(e);
  }
  j(e) {
    e === it ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class dc extends wo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === it ? void 0 : e;
  }
}
class pc extends wo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== it);
  }
}
class gc extends wo {
  constructor(e, i, n, o, s) {
    super(e, i, n, o, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = dn(this, e, i, 0) ?? it) === fn) return;
    const n = this._$AH, o = e === it && n !== it || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== it && (n === it || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class mc {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    dn(this, e);
  }
}
const bc = Tr.litHtmlPolyfillSupport;
bc?.(jn, Kn), (Tr.litHtmlVersions ??= []).push("3.3.2");
const _c = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Kn(e.insertBefore(Bn(), s), s, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
const Mr = globalThis;
class Ut extends cn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = _c(i, this.renderRoot, this.renderOptions);
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
Ut._$litElement$ = !0, Ut.finalized = !0, Mr.litElementHydrateSupport?.({ LitElement: Ut });
const vc = Mr.litElementPolyfillSupport;
vc?.({ LitElement: Ut });
(Mr.litElementVersions ??= []).push("4.2.2");
const ee = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const yc = { attribute: !0, type: String, converter: fo, reflect: !1, hasChanged: Pr }, wc = (t = yc, e, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), n === "accessor") {
    const { name: l } = i;
    return { set(h) {
      const f = e.get.call(this);
      e.set.call(this, h), this.requestUpdate(l, f, t, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(l, void 0, t, h), h;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(h) {
      const f = this[l];
      e.call(this, h), this.requestUpdate(l, f, t, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function V(t) {
  return (e, i) => typeof i == "object" ? wc(t, e, i) : ((n, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(t, e, i);
}
function lt(t) {
  return V({ ...t, state: !0, attribute: !1 });
}
const xc = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
function vn(t, e) {
  return (i, n, o) => {
    const s = (l) => l.renderRoot?.querySelector(t) ?? null;
    return xc(i, n, { get() {
      return s(this);
    } });
  };
}
const ie = Jt`
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
function go(t) {
  switch (t) {
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
function mo(t) {
  return t === "heating" || t === "cooling" || t === "idle" ? t : "unknown";
}
function dr(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var $c = Object.defineProperty, Sc = Object.getOwnPropertyDescriptor, qn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Sc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && $c(e, i, o), o;
};
const pr = 15, Ol = 28, kc = Ol - pr;
function er(t) {
  return Number.isNaN(t) || !Number.isFinite(t) ? 0 : (Math.max(pr, Math.min(Ol, t)) - pr) / kc * 100;
}
let Li = class extends Ut {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const t = mo(this.action), e = go(t), i = Number.isFinite(this.low), n = Number.isFinite(this.high), o = Number.isFinite(this.room), s = i ? er(this.low) : 0, l = n ? er(this.high) : 100, h = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = o ? er(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${t}`;
    return M`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${di`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? di`<rect class="band" x=${h} y="9" width=${f} height="6" rx="3" fill=${e}></rect>` : null}
        ${o ? di`<circle cx=${p} cy="12" r="4.5" fill=${e}></circle>` : null}
        ${o ? di`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${e}></circle>` : null}
      </svg>
    `;
  }
};
Li.styles = [
  ie,
  Jt`
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
  ee("band-gauge")
], Li);
var Ac = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, Ge = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ec(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Ac(e, i, o), o;
};
let ye = class extends Ut {
  constructor() {
    super(...arguments), this.zoneName = "", this.roomTemp = NaN, this.low = NaN, this.high = NaN, this.action = "unknown", this.overrideActive = !1, this.overrideEnds = null, this.noExpand = !1, this.variant = "tile";
  }
  _onTap(t) {
    this.noExpand || t instanceof KeyboardEvent && t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.dispatchEvent(new CustomEvent("comfort-band-tile-tap", { bubbles: !0, composed: !0 })));
  }
  _renderRoomTemp() {
    return Number.isFinite(this.roomTemp) ? `${this.roomTemp.toFixed(1)}°` : "—";
  }
  _renderOverridePill() {
    if (!this.overrideActive) return null;
    const t = Pc(this.overrideEnds);
    return M`<div class="override-pill">Override${t ? ` · ${t}` : ""}</div>`;
  }
  _renderActionChip() {
    const t = mo(this.action);
    if (t === "idle" || t === "unknown") return null;
    const e = go(t);
    return M`<span class="action-chip" style="background:${e}">
      ${dr(t)}
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
    const t = mo(this.action), e = t === "heating" || t === "cooling", i = e ? `--cb-mini-bg:${go(t)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${e ? `, ${dr(t)}` : ""}`;
    return M`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${e ? "tinted" : ""}"
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
ye.styles = [
  ie,
  Jt`
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
Ge([
  V({ type: String })
], ye.prototype, "zoneName", 2);
Ge([
  V({ type: Number })
], ye.prototype, "roomTemp", 2);
Ge([
  V({ type: Number })
], ye.prototype, "low", 2);
Ge([
  V({ type: Number })
], ye.prototype, "high", 2);
Ge([
  V({ type: String })
], ye.prototype, "action", 2);
Ge([
  V({ type: Boolean })
], ye.prototype, "overrideActive", 2);
Ge([
  V({ type: String })
], ye.prototype, "overrideEnds", 2);
Ge([
  V({ type: Boolean })
], ye.prototype, "noExpand", 2);
Ge([
  V({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
ye = Ge([
  ee("comfort-band-tile")
], ye);
function Pc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const i = e - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const o = Math.floor(n / 60), s = n % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var Tc = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, ni = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Cc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Tc(e, i, o), o;
};
let De = class extends Ut {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (t, e) => {
      t.preventDefault();
      const i = t.currentTarget;
      i.setPointerCapture(t.pointerId), this._dragging = e;
      const n = (s) => {
        this._setHandle(e, this._xToValue(s.clientX)) && this._fire("input");
      }, o = (s) => {
        i.releasePointerCapture(s.pointerId), i.removeEventListener("pointermove", n), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o), this._dragging = null, this._fire("change");
      };
      i.addEventListener("pointermove", n), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
    }, this._onTrackPointerDown = (t) => {
      if (t.target.classList.contains("thumb")) return;
      const e = this._xToValue(t.clientX), i = (this.low + this.high) / 2, n = e < i ? "low" : "high";
      this._setHandle(n, e) && this._fire("change");
    }, this._onKeyDown = (t, e) => {
      let i = 0;
      switch (t.key) {
        case "ArrowLeft":
        case "ArrowDown":
          i = -this.step;
          break;
        case "ArrowRight":
        case "ArrowUp":
          i = this.step;
          break;
        case "Home":
          t.preventDefault(), this._setHandle(e, this.min) && this._fire("change");
          return;
        case "End":
          t.preventDefault(), this._setHandle(e, this.max) && this._fire("change");
          return;
        default:
          return;
      }
      t.preventDefault();
      const n = e === "low" ? this.low : this.high;
      this._setHandle(e, n + i) && this._fire("change");
    };
  }
  _pct(t) {
    const e = this.max - this.min;
    return e <= 0 ? 0 : (t - this.min) / e * 100;
  }
  _snap(t) {
    const e = Math.round((t - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, e));
  }
  _setHandle(t, e) {
    const i = this._snap(e);
    if (t === "low") {
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
  _xToValue(t) {
    const e = this._track?.getBoundingClientRect();
    if (!e || e.width === 0) return this.min;
    const i = Math.max(0, Math.min(1, (t - e.left) / e.width));
    return this.min + i * (this.max - this.min);
  }
  _fire(t) {
    this.dispatchEvent(
      new CustomEvent(t, {
        detail: { low: this.low, high: this.high },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _fmt(t) {
    return `${t.toFixed(1)}${this.unit}`;
  }
  render() {
    const t = this._pct(this.low), e = this._pct(this.high);
    return M`
      <div class="track" @pointerdown=${this._onTrackPointerDown}>
        <div class="fill" style="left:${t}%; width:${e - t}%"></div>
        <div
          class="thumb ${this._dragging === "low" ? "dragging" : ""}"
          style="left:${t}%"
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
          style="left:${e}%"
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
De.styles = [
  ie,
  Jt`
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
], De.prototype, "min", 2);
ni([
  V({ type: Number })
], De.prototype, "max", 2);
ni([
  V({ type: Number })
], De.prototype, "step", 2);
ni([
  V({ type: Number })
], De.prototype, "low", 2);
ni([
  V({ type: Number })
], De.prototype, "high", 2);
ni([
  V({ type: String })
], De.prototype, "unit", 2);
ni([
  lt()
], De.prototype, "_dragging", 2);
ni([
  vn(".track")
], De.prototype, "_track", 2);
De = ni([
  ee("dual-handle-slider")
], De);
const bi = "comfort_band";
function Mc(t, e, i) {
  return t.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...e }
  );
}
function Dc(t, e) {
  return t.callService(bi, "set_schedule", { ...e });
}
function zc(t, e) {
  const i = { zone: e.zone };
  return e.low !== void 0 && (i.low = e.low), e.high !== void 0 && (i.high = e.high), e.hours !== void 0 && (i.hours = e.hours), t.callService(bi, "start_override", i);
}
function Oc(t, e) {
  return t.callService(bi, "cancel_override", { ...e });
}
function Nc(t, e) {
  return t.callService(bi, "set_profile", { ...e });
}
function Hc(t, e) {
  const i = { name: e.name };
  return e.description !== void 0 && (i.description = e.description), t.callService(bi, "create_profile", i);
}
function Lc(t, e) {
  const i = { source: e.source, target: e.target };
  return e.description !== void 0 && (i.description = e.description), t.callService(bi, "clone_profile", i);
}
function Rc(t, e) {
  return t.callService(bi, "rename_profile", { old: e.old, new: e.new });
}
function Fc(t, e) {
  return t.callService(bi, "delete_profile", { name: e.name });
}
var Uc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, yn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ic(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Uc(e, i, o), o;
};
const Bc = [1, 3, 6];
let pi = class extends Ut {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (t) => {
      this._pendingLow = t.detail.low, this._pendingHigh = t.detail.high;
    }, this._onSliderChange = (t) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, zc(this.hass, {
        zone: this.zone,
        low: t.detail.low,
        high: t.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Oc(this.hass, { zone: this.zone });
    }, this._onPickHours = (t) => {
      !this.hass || !this.entities?.overrideHours || this.hass.callService("number", "set_value", {
        entity_id: this.entities.overrideHours,
        value: t
      });
    };
  }
  get _stateOf() {
    const t = this.hass?.states ?? {};
    return (e) => e !== null ? t[e] : void 0;
  }
  _numericState(t) {
    const e = this._stateOf(t);
    if (!e) return NaN;
    const i = parseFloat(e.state);
    return Number.isFinite(i) ? i : NaN;
  }
  render() {
    if (!this.hass || !this.entities) return it;
    const t = this._numericState(this.entities.manualLow), e = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), o = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), l = this._stateOf(this.entities.currentAction)?.state ?? "unknown", h = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._pendingLow ?? (Number.isFinite(t) ? t : 19), p = this._pendingHigh ?? (Number.isFinite(e) ? e : 22), b = mo(l), g = b !== "idle" && b !== "unknown";
    return M`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${g ? M`<span class="action-chip" style="background:${go(b)}"
              >${dr(b)}</span
            >` : it}
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
  _renderOverrideSection(t) {
    if (!t) return it;
    const e = this._stateOf(this.entities.overrideEnds)?.state, i = Vc(e ?? null);
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
  _renderHoursSection(t) {
    return this.entities?.overrideHours ? M`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Bc.map(
      (e) => M`
              <button
                class="preset ${t === e ? "active" : ""}"
                @click=${() => this._onPickHours(e)}
              >
                ${e} h
              </button>
            `
    )}
        </div>
      </section>
    ` : it;
  }
};
pi.styles = [
  ie,
  Jt`
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
  lt()
], pi.prototype, "_pendingLow", 2);
yn([
  lt()
], pi.prototype, "_pendingHigh", 2);
pi = yn([
  ee("comfort-band-now-tab")
], pi);
function Vc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const i = e - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const o = Math.floor(n / 60), s = n % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var jc = Object.defineProperty, Wc = Object.getOwnPropertyDescriptor, oi = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && jc(e, i, o), o;
};
let ze = class extends Ut {
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
    }, this._onKey = (t) => {
      t.key === "Enter" ? (t.preventDefault(), this._onSave()) : t.key === "Escape" && (t.preventDefault(), this._onCancel());
    };
  }
  willUpdate(t) {
    (t.has("mode") || t.has("existingName")) && (this._name = this.mode === "rename" ? this.existingName : "", this._description = "", this._error = null);
  }
  updated(t) {
    (t.has("mode") || t.has("existingName")) && queueMicrotask(() => {
      this._nameInput?.focus(), this._nameInput?.select();
    });
  }
  _validate() {
    const t = this._name.trim();
    return t ? this.existingNames.some(
      (i) => i === t && !(this.mode === "rename" && i === this.existingName)
    ) ? (this._error = `Profile ${t} already exists.`, !1) : (this._error = null, !0) : (this._error = "Name cannot be empty.", !1);
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
          .value=${this._name}
          @input=${(t) => this._name = t.target.value}
          @keydown=${this._onKey}
        />
      </label>
      ${this.mode !== "rename" ? M`<label>
            Description (optional)
            <input
              name="description"
              type="text"
              autocomplete="off"
              .value=${this._description}
              @input=${(t) => this._description = t.target.value}
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
ze.styles = [
  ie,
  Jt`
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
], ze.prototype, "mode", 2);
oi([
  V({ type: String })
], ze.prototype, "existingName", 2);
oi([
  V({ type: Array })
], ze.prototype, "existingNames", 2);
oi([
  V({ type: Boolean })
], ze.prototype, "busy", 2);
oi([
  lt()
], ze.prototype, "_name", 2);
oi([
  lt()
], ze.prototype, "_description", 2);
oi([
  lt()
], ze.prototype, "_error", 2);
oi([
  vn('input[name="name"]')
], ze.prototype, "_nameInput", 2);
ze = oi([
  ee("profile-edit-dialog")
], ze);
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
function Nl(t, e) {
  for (const i of Object.values(t.devices))
    for (const [n, o] of i.identifiers)
      if (n === e[0] && o === e[1])
        return i;
  return null;
}
function Hl(t, e) {
  return Object.values(t.entities).filter(
    (i) => i.device_id === e && i.platform === Dr
  );
}
function Kc(t, e) {
  const i = Yc(), n = Nl(t, [Dr, `zone:${e}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const o of Hl(t, n.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Gc[s];
    l !== void 0 && (i[l] = o.entity_id);
  }
  return i;
}
function Ll(t) {
  const e = Nl(t, [Dr, "profile_manager"]);
  if (e === null) return null;
  for (const i of Hl(t, e.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
var qc = Object.defineProperty, Zc = Object.getOwnPropertyDescriptor, Fi = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && qc(e, i, o), o;
};
let ii = class extends Ut {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._busy = !1, this._menuOpenedByKeyboard = !1, this._onDocumentClick = (t) => {
      if (this._openMenu === null) return;
      t.composedPath().some(
        (n) => n instanceof HTMLElement && (n.classList?.contains("menu") || n.classList?.contains("overflow"))
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._busy || (this._mode = "list", this._target = null, this._error = null);
    }, this._onDialogSave = async (t) => {
      if (!this.hass || this._busy) return;
      const { name: e, description: i } = t.detail, n = this._mode, o = this._target;
      this._busy = !0;
      try {
        if (n === "create")
          await Hc(this.hass, { name: e, description: i });
        else if (n === "clone" && o)
          await Lc(this.hass, { source: o, target: e, description: i });
        else if (n === "rename" && o)
          e !== o && await Rc(this.hass, { old: o, new: e });
        else
          return;
        this._mode = "list", this._target = null, this._error = null;
      } catch (s) {
        this._error = s instanceof Error ? s.message : "Failed to save profile.";
      } finally {
        this._busy = !1;
      }
    }, this._onConfirmDelete = async () => {
      if (!this.hass || !this._target || this._busy) return;
      const t = this._target;
      this._busy = !0;
      try {
        await Fc(this.hass, { name: t }), this._mode = "list", this._target = null, this._error = null;
      } catch (e) {
        this._error = e instanceof Error ? e.message : "Failed to delete profile.";
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
  updated(t) {
    t.has("_openMenu") && this._openMenu !== null && this._menuOpenedByKeyboard && requestAnimationFrame(() => {
      this.shadowRoot?.querySelector('.menu button[role="menuitem"]:not([disabled])')?.focus();
    });
  }
  _readState() {
    if (!this.hass) return null;
    const t = Ll(this.hass);
    if (t === null) return null;
    const e = this.hass.states[t];
    if (!e) return null;
    const i = e.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], o = typeof e.state == "string" ? e.state : "", s = e.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", f = e.attributes.descriptions, p = {};
    if (f && typeof f == "object" && !Array.isArray(f))
      for (const [b, g] of Object.entries(f))
        typeof g == "string" && (p[b] = g);
    return { options: n, active: o, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(t) {
    this.hass && Nc(this.hass, { profile: t });
  }
  _toggleMenu(t, e) {
    e.stopPropagation(), this._menuOpenedByKeyboard = this._openMenu !== t && e instanceof MouseEvent && e.detail === 0, this._openMenu = this._openMenu === t ? null : t;
  }
  /** Keyboard navigation inside the open overflow menu — Escape closes,
   *  ArrowUp/ArrowDown moves focus, satisfying ARIA's `role="menu"` contract. */
  _onMenuKeydown(t, e) {
    if (t.key === "Tab") {
      this._openMenu = null;
      return;
    }
    if (t.key === "Escape") {
      t.preventDefault(), t.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1, requestAnimationFrame(() => {
        const l = this.shadowRoot?.querySelectorAll("li[data-profile]");
        (l ? Array.from(l).find((f) => f.dataset.profile === e) : void 0)?.querySelector(".overflow")?.focus();
      });
      return;
    }
    if (t.key !== "ArrowDown" && t.key !== "ArrowUp") return;
    t.preventDefault(), t.stopPropagation();
    const i = Array.from(
      t.currentTarget.querySelectorAll(
        'button[role="menuitem"]:not([disabled])'
      )
    );
    if (i.length === 0) return;
    const n = this.shadowRoot?.activeElement, o = n ? i.indexOf(n) : -1;
    (t.key === "ArrowDown" ? i[(o + 1) % i.length] : i[(o - 1 + i.length) % i.length]).focus();
  }
  _onNew() {
    this._error = null, this._target = null, this._mode = "create";
  }
  _onClone(t) {
    this._error = null, this._openMenu = null, this._target = t, this._mode = "clone";
  }
  _onRename(t) {
    this._error = null, this._openMenu = null, this._target = t, this._mode = "rename";
  }
  _onDelete(t) {
    this._error = null, this._openMenu = null, this._target = t, this._mode = "confirm-delete";
  }
  render() {
    if (!this.hass) return it;
    const t = this._readState();
    if (t === null)
      return M`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: e, active: i, defaultProfile: n, descriptions: o, crudAvailable: s } = t;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return M`
        ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
        <profile-edit-dialog
          .mode=${this._mode}
          .existingName=${this._target ?? ""}
          .existingNames=${e}
          .busy=${this._busy}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
        ></profile-edit-dialog>
      `;
    if (this._mode === "confirm-delete" && this._target) {
      const l = this._target === i;
      return M`
        <div class="confirm-delete">
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
    return e.length === 0 ? M`<div class="empty">No profiles configured.</div>` : M`
      ${this._error ? M`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? M`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : it}
      <ul aria-label="Profiles">
        ${e.map(
      (l, h) => this._renderRow(l, h, i, n, o, s)
    )}
      </ul>
      ${s ? it : M`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(t, e, i, n, o, s) {
    const l = t === i, h = t === n, f = o[t] ?? "", p = `cb-profile-menu-${e}`;
    return M`
      <li
        data-profile=${t}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : "false"}
        @click=${() => this._onSelect(t)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(t));
    }}
      >
        <span class="label">
          <span class="name">${t}</span>
          ${f ? M`<span class="description">${f}</span>` : it}
        </span>
        ${l ? M`<span class="badge">Active</span>` : it}
        ${s ? M`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${t}"
              aria-haspopup="menu"
              aria-controls=${p}
              aria-expanded=${this._openMenu === t}
              @click=${(b) => this._toggleMenu(t, b)}
            >
              ⋮
            </button>` : it}
        ${this._openMenu === t ? M`
              <div
                id=${p}
                class="menu"
                role="menu"
                @click=${(b) => b.stopPropagation()}
                @keydown=${(b) => this._onMenuKeydown(b, t)}
              >
                <button
                  role="menuitem"
                  @click=${(b) => {
      b.stopPropagation(), this._onClone(t);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(b) => {
      b.stopPropagation(), this._onRename(t);
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
      b.stopPropagation(), h || this._onDelete(t);
    }}
                  title=${h ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : it}
      </li>
    `;
  }
};
ii.styles = [
  ie,
  Jt`
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
        text-transform: capitalize;
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
  lt()
], ii.prototype, "_mode", 2);
Fi([
  lt()
], ii.prototype, "_target", 2);
Fi([
  lt()
], ii.prototype, "_openMenu", 2);
Fi([
  lt()
], ii.prototype, "_error", 2);
Fi([
  lt()
], ii.prototype, "_busy", 2);
ii = Fi([
  ee("comfort-band-profiles-tab")
], ii);
const Jc = !0, zt = "u-", Qc = "uplot", Xc = zt + "hz", tu = zt + "vt", eu = zt + "title", iu = zt + "wrap", nu = zt + "under", ou = zt + "over", ru = zt + "axis", zi = zt + "off", su = zt + "select", lu = zt + "cursor-x", au = zt + "cursor-y", cu = zt + "cursor-pt", uu = zt + "legend", hu = zt + "live", fu = zt + "inline", du = zt + "series", pu = zt + "marker", Hs = zt + "label", gu = zt + "value", Hn = "width", Ln = "height", On = "top", Ls = "bottom", ln = "left", ir = "right", zr = "#000", Rs = zr + "0", nr = "mousemove", Fs = "mousedown", or = "mouseup", Us = "mouseenter", Is = "mouseleave", Bs = "dblclick", mu = "resize", bu = "scroll", Vs = "change", bo = "dppxchange", Or = "--", wn = typeof window < "u", gr = wn ? document : null, hn = wn ? window : null, _u = wn ? navigator : null;
let ct, so;
function mr() {
  let t = devicePixelRatio;
  ct != t && (ct = t, so && _r(Vs, so, mr), so = matchMedia(`(min-resolution: ${ct - 1e-3}dppx) and (max-resolution: ${ct + 1e-3}dppx)`), Ni(Vs, so, mr), hn.dispatchEvent(new CustomEvent(bo)));
}
function ae(t, e) {
  if (e != null) {
    let i = t.classList;
    !i.contains(e) && i.add(e);
  }
}
function br(t, e) {
  let i = t.classList;
  i.contains(e) && i.remove(e);
}
function yt(t, e, i) {
  t.style[e] = i + "px";
}
function Pe(t, e, i, n) {
  let o = gr.createElement(t);
  return e != null && ae(o, e), i?.insertBefore(o, n), o;
}
function _e(t, e) {
  return Pe("div", t, e);
}
const js = /* @__PURE__ */ new WeakMap();
function Ie(t, e, i, n, o) {
  let s = "translate(" + e + "px," + i + "px)", l = js.get(t);
  s != l && (t.style.transform = s, js.set(t, s), e < 0 || i < 0 || e > n || i > o ? ae(t, zi) : br(t, zi));
}
const Ws = /* @__PURE__ */ new WeakMap();
function Gs(t, e, i) {
  let n = e + i, o = Ws.get(t);
  n != o && (Ws.set(t, n), t.style.background = e, t.style.borderColor = i);
}
const Ys = /* @__PURE__ */ new WeakMap();
function Ks(t, e, i, n) {
  let o = e + "" + i, s = Ys.get(t);
  o != s && (Ys.set(t, o), t.style.height = i + "px", t.style.width = e + "px", t.style.marginLeft = n ? -e / 2 + "px" : 0, t.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Nr = { passive: !0 }, vu = { ...Nr, capture: !0 };
function Ni(t, e, i, n) {
  e.addEventListener(t, i, n ? vu : Nr);
}
function _r(t, e, i, n) {
  e.removeEventListener(t, i, Nr);
}
wn && mr();
function Ce(t, e, i, n) {
  let o;
  i = i || 0, n = n || e.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    o = s ? i + n >> 1 : ce((i + n) / 2), e[o] < t ? i = o : n = o;
  return t - e[i] <= e[n] - t ? i : n;
}
function Rl(t) {
  return (i, n, o) => {
    let s = -1, l = -1;
    for (let h = n; h <= o; h++)
      if (t(i[h])) {
        s = h;
        break;
      }
    for (let h = o; h >= n; h--)
      if (t(i[h])) {
        l = h;
        break;
      }
    return [s, l];
  };
}
const Fl = (t) => t != null, Ul = (t) => t != null && t > 0, xo = Rl(Fl), yu = Rl(Ul);
function wu(t, e, i, n = 0, o = !1) {
  let s = o ? yu : xo, l = o ? Ul : Fl;
  [e, i] = s(t, e, i);
  let h = t[e], f = t[e];
  if (e > -1)
    if (n == 1)
      h = t[e], f = t[i];
    else if (n == -1)
      h = t[i], f = t[e];
    else
      for (let p = e; p <= i; p++) {
        let b = t[p];
        l(b) && (b < h ? h = b : b > f && (f = b));
      }
  return [h ?? pt, f ?? -pt];
}
function $o(t, e, i, n) {
  let o = Js(t), s = Js(e);
  t == e && (o == -1 ? (t *= i, e /= i) : (t /= i, e *= i));
  let l = i == 10 ? ti : Il, h = o == 1 ? ce : ve, f = s == 1 ? ve : ce, p = h(l(Dt(t))), b = f(l(Dt(e))), g = pn(i, p), _ = pn(i, b);
  return i == 10 && (p < 0 && (g = gt(g, -p)), b < 0 && (_ = gt(_, -b))), n || i == 2 ? (t = g * o, e = _ * s) : (t = Wl(t, g), e = So(e, _)), [t, e];
}
function Hr(t, e, i, n) {
  let o = $o(t, e, i, n);
  return t == 0 && (o[0] = 0), e == 0 && (o[1] = 0), o;
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
function _o(t, e, i, n) {
  return ko(i) ? Zs(t, e, i) : (Un.pad = i, Un.soft = n ? 0 : null, Un.mode = n ? 3 : 0, Zs(t, e, xu));
}
function st(t, e) {
  return t ?? e;
}
function $u(t, e, i) {
  for (e = st(e, 0), i = st(i, t.length - 1); e <= i; ) {
    if (t[e] != null)
      return !0;
    e++;
  }
  return !1;
}
function Zs(t, e, i) {
  let n = i.min, o = i.max, s = st(n.pad, 0), l = st(o.pad, 0), h = st(n.hard, -pt), f = st(o.hard, pt), p = st(n.soft, pt), b = st(o.soft, -pt), g = st(n.mode, 0), _ = st(o.mode, 0), k = e - t, E = ti(k), H = Zt(Dt(t), Dt(e)), U = ti(H), B = Dt(U - E);
  (k < 1e-24 || B > 10) && (k = 0, (t == 0 || e == 0) && (k = 1e-24, g == 2 && p != pt && (s = 0), _ == 2 && b != -pt && (l = 0)));
  let w = k || H || 1e3, F = ti(w), $ = pn(10, ce(F)), Z = w * (k == 0 ? t == 0 ? 0.1 : 1 : s), D = gt(Wl(t - Z, $ / 10), 24), J = t >= p && (g == 1 || g == 3 && D <= p || g == 2 && D >= p) ? p : pt, Y = Zt(h, D < J && t >= J ? J : Me(J, D)), tt = w * (k == 0 ? e == 0 ? 0.1 : 1 : l), G = gt(So(e + tt, $ / 10), 24), S = e <= b && (_ == 1 || _ == 3 && G >= b || _ == 2 && G <= b) ? b : -pt, q = Me(f, G > S && e <= S ? S : Zt(S, G));
  return Y == q && Y == 0 && (q = 100), [Y, q];
}
const Su = new Intl.NumberFormat(wn ? _u.language : "en-US"), Rr = (t) => Su.format(t), ue = Math, ho = ue.PI, Dt = ue.abs, ce = ue.floor, Mt = ue.round, ve = ue.ceil, Me = ue.min, Zt = ue.max, pn = ue.pow, Js = ue.sign, ti = ue.log10, Il = ue.log2, ku = (t, e = 1) => ue.sinh(t) * e, rr = (t, e = 1) => ue.asinh(t / e), pt = 1 / 0;
function Qs(t) {
  return (ti((t ^ t >> 31) - (t >> 31)) | 0) + 1;
}
function vr(t, e, i) {
  return Me(Zt(t, e), i);
}
function Bl(t) {
  return typeof t == "function";
}
function et(t) {
  return Bl(t) ? t : () => t;
}
const Au = () => {
}, Vl = (t) => t, jl = (t, e) => e, Eu = (t) => null, Xs = (t) => !0, tl = (t, e) => t == e, Pu = /\.\d*?(?=9{6,}|0{6,})/gm, Ri = (t) => {
  if (Yl(t) || gi.has(t))
    return t;
  const e = `${t}`, i = e.match(Pu);
  if (i == null)
    return t;
  let n = i[0].length - 1;
  if (e.indexOf("e-") != -1) {
    let [o, s] = e.split("e");
    return +`${Ri(o)}e${s}`;
  }
  return gt(t, n);
};
function Mi(t, e) {
  return Ri(gt(Ri(t / e)) * e);
}
function So(t, e) {
  return Ri(ve(Ri(t / e)) * e);
}
function Wl(t, e) {
  return Ri(ce(Ri(t / e)) * e);
}
function gt(t, e = 0) {
  if (Yl(t))
    return t;
  let i = 10 ** e, n = t * i * (1 + Number.EPSILON);
  return Mt(n) / i;
}
const gi = /* @__PURE__ */ new Map();
function Gl(t) {
  return (("" + t).split(".")[1] || "").length;
}
function Wn(t, e, i, n) {
  let o = [], s = n.map(Gl);
  for (let l = e; l < i; l++) {
    let h = Dt(l), f = gt(pn(t, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = t == 10 ? +`${n[p]}e${l}` : n[p] * f, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = t == 10 ? b : gt(b, g);
      o.push(_), gi.set(_, g);
    }
  }
  return o;
}
const In = {}, Fr = [], gn = [null, null], hi = Array.isArray, Yl = Number.isInteger, Tu = (t) => t === void 0;
function el(t) {
  return typeof t == "string";
}
function ko(t) {
  let e = !1;
  if (t != null) {
    let i = t.constructor;
    e = i == null || i == Object;
  }
  return e;
}
function Cu(t) {
  return t != null && typeof t == "object";
}
const Mu = Object.getPrototypeOf(Uint8Array), Kl = "__proto__";
function mn(t, e = ko) {
  let i;
  if (hi(t)) {
    let n = t.find((o) => o != null);
    if (hi(n) || e(n)) {
      i = Array(t.length);
      for (let o = 0; o < t.length; o++)
        i[o] = mn(t[o], e);
    } else
      i = t.slice();
  } else if (t instanceof Mu)
    i = t.slice();
  else if (e(t)) {
    i = {};
    for (let n in t)
      n != Kl && (i[n] = mn(t[n], e));
  } else
    i = t;
  return i;
}
function Pt(t) {
  let e = arguments;
  for (let i = 1; i < e.length; i++) {
    let n = e[i];
    for (let o in n)
      o != Kl && (ko(t[o]) ? Pt(t[o], mn(n[o])) : t[o] = mn(n[o]));
  }
  return t;
}
const Du = 0, zu = 1, Ou = 2;
function Nu(t, e, i) {
  for (let n = 0, o, s = -1; n < e.length; n++) {
    let l = e[n];
    if (l > s) {
      for (o = l - 1; o >= 0 && t[o] == null; )
        t[o--] = null;
      for (o = l + 1; o < i && t[o] == null; )
        t[s = o++] = null;
    }
  }
}
function Hu(t, e) {
  if (Fu(t)) {
    let l = t[0].slice();
    for (let h = 1; h < t.length; h++)
      l.push(...t[h].slice(1));
    return Uu(l[0]) || (l = Ru(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < t.length; l++) {
    let f = t[l][0], p = f.length;
    for (let b = 0; b < p; b++)
      i.add(f[b]);
  }
  let n = [Array.from(i).sort((l, h) => l - h)], o = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < o; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < t.length; l++) {
    let h = t[l], f = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], g = Array(o).fill(void 0), _ = e ? e[l][p] : zu, k = [];
      for (let E = 0; E < b.length; E++) {
        let H = b[E], U = s.get(f[E]);
        H === null ? _ != Du && (g[U] = H, _ == Ou && k.push(U)) : g[U] = H;
      }
      Nu(g, k, o), n.push(g);
    }
  }
  return n;
}
const Lu = typeof queueMicrotask > "u" ? (t) => Promise.resolve().then(t) : queueMicrotask;
function Ru(t) {
  let e = t[0], i = e.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => e[s] - e[l]);
  let o = [];
  for (let s = 0; s < t.length; s++) {
    let l = t[s], h = Array(i);
    for (let f = 0; f < i; f++)
      h[f] = l[n[f]];
    o.push(h);
  }
  return o;
}
function Fu(t) {
  let e = t[0][0], i = e.length;
  for (let n = 1; n < t.length; n++) {
    let o = t[n][0];
    if (o.length != i)
      return !1;
    if (o != e) {
      for (let s = 0; s < i; s++)
        if (o[s] != e[s])
          return !1;
    }
  }
  return !0;
}
function Uu(t, e = 100) {
  const i = t.length;
  if (i <= 1)
    return !0;
  let n = 0, o = i - 1;
  for (; n <= o && t[n] == null; )
    n++;
  for (; o >= n && t[o] == null; )
    o--;
  if (o <= n)
    return !0;
  const s = Zt(1, ce((o - n + 1) / e));
  for (let l = t[n], h = n + s; h <= o; h += s) {
    const f = t[h];
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
function Jl(t) {
  return t.slice(0, 3);
}
const Iu = Zl.map(Jl), Bu = ql.map(Jl), Vu = {
  MMMM: ql,
  MMM: Bu,
  WWWW: Zl,
  WWW: Iu
};
function Nn(t) {
  return (t < 10 ? "0" : "") + t;
}
function ju(t) {
  return (t < 10 ? "00" : t < 100 ? "0" : "") + t;
}
const Wu = {
  // 2019
  YYYY: (t) => t.getFullYear(),
  // 19
  YY: (t) => (t.getFullYear() + "").slice(2),
  // July
  MMMM: (t, e) => e.MMMM[t.getMonth()],
  // Jul
  MMM: (t, e) => e.MMM[t.getMonth()],
  // 07
  MM: (t) => Nn(t.getMonth() + 1),
  // 7
  M: (t) => t.getMonth() + 1,
  // 09
  DD: (t) => Nn(t.getDate()),
  // 9
  D: (t) => t.getDate(),
  // Monday
  WWWW: (t, e) => e.WWWW[t.getDay()],
  // Mon
  WWW: (t, e) => e.WWW[t.getDay()],
  // 03
  HH: (t) => Nn(t.getHours()),
  // 3
  H: (t) => t.getHours(),
  // 9 (12hr, unpadded)
  h: (t) => {
    let e = t.getHours();
    return e == 0 ? 12 : e > 12 ? e - 12 : e;
  },
  // AM
  AA: (t) => t.getHours() >= 12 ? "PM" : "AM",
  // am
  aa: (t) => t.getHours() >= 12 ? "pm" : "am",
  // a
  a: (t) => t.getHours() >= 12 ? "p" : "a",
  // 09
  mm: (t) => Nn(t.getMinutes()),
  // 9
  m: (t) => t.getMinutes(),
  // 09
  ss: (t) => Nn(t.getSeconds()),
  // 9
  s: (t) => t.getSeconds(),
  // 374
  fff: (t) => ju(t.getMilliseconds())
};
function Ur(t, e) {
  e = e || Vu;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = n.exec(t); )
    i.push(o[0][0] == "{" ? Wu[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, e);
    return l;
  };
}
const Gu = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Yu(t, e) {
  let i;
  return e == "UTC" || e == "Etc/UTC" ? i = new Date(+t + t.getTimezoneOffset() * 6e4) : e == Gu ? i = t : (i = new Date(t.toLocaleString("en-US", { timeZone: e })), i.setMilliseconds(t.getMilliseconds())), i;
}
const Ql = (t) => t % 1 == 0, vo = [1, 2, 2.5, 5], Ku = Wn(10, -32, 0, vo), Xl = Wn(10, 0, 32, vo), qu = Xl.filter(Ql), Di = Ku.concat(Xl), Ir = `
`, ta = "{YYYY}", il = Ir + ta, ea = "{M}/{D}", Rn = Ir + ea, lo = Rn + "/{YY}", ia = "{aa}", Zu = "{h}:{mm}", un = Zu + ia, nl = Ir + un, ol = ":{ss}", ht = null;
function na(t) {
  let e = t * 1e3, i = e * 60, n = i * 60, o = n * 24, s = o * 30, l = o * 365, f = (t == 1 ? Wn(10, 0, 3, vo).filter(Ql) : Wn(10, -3, 0, vo)).concat([
    // minute divisors (# of secs)
    e,
    e * 5,
    e * 10,
    e * 15,
    e * 30,
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
    [l, ta, ht, ht, ht, ht, ht, ht, 1],
    [o * 28, "{MMM}", il, ht, ht, ht, ht, ht, 1],
    [o, ea, il, ht, ht, ht, ht, ht, 1],
    [n, "{h}" + ia, lo, ht, Rn, ht, ht, ht, 1],
    [i, un, lo, ht, Rn, ht, ht, ht, 1],
    [e, ol, lo + " " + un, ht, Rn + " " + un, ht, nl, ht, 1],
    [t, ol + ".{fff}", lo + " " + un, ht, Rn + " " + un, ht, nl, ht, 1]
  ];
  function b(g) {
    return (_, k, E, H, U, B) => {
      let w = [], F = U >= l, $ = U >= s && U < l, Z = g(E), D = gt(Z * t, 3), J = sr(Z.getFullYear(), F ? 0 : Z.getMonth(), $ || F ? 1 : Z.getDate()), Y = gt(J * t, 3);
      if ($ || F) {
        let tt = $ ? U / s : 0, G = F ? U / l : 0, S = D == Y ? D : gt(sr(J.getFullYear() + G, J.getMonth() + tt, 1) * t, 3), q = new Date(Mt(S / t)), z = q.getFullYear(), j = q.getMonth();
        for (let R = 0; S <= H; R++) {
          let nt = sr(z + G * R, j + tt * R, 1), L = nt - g(gt(nt * t, 3));
          S = gt((+nt + L) * t, 3), S <= H && w.push(S);
        }
      } else {
        let tt = U >= o ? o : U, G = ce(E) - ce(D), S = Y + G + So(D - Y, tt);
        w.push(S);
        let q = g(S), z = q.getHours() + q.getMinutes() / i + q.getSeconds() / n, j = U / n, R = _.axes[k]._space, nt = B / R;
        for (; S = gt(S + U, t == 1 ? 0 : 3), !(S > H); )
          if (j > 1) {
            let L = ce(gt(z + j, 6)) % 24, ot = g(S).getHours() - L;
            ot > 1 && (ot = -1), S -= ot * n, z = (z + j) % 24;
            let ft = w[w.length - 1];
            gt((S - ft) / U, 3) * nt >= 0.7 && w.push(S);
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
const [Ju, Qu, Xu] = na(1), [th, eh, ih] = na(1e-3);
Wn(2, -53, 53, [1]);
function rl(t, e) {
  return t.map((i) => i.map(
    (n, o) => o == 0 || o == 8 || n == null ? n : e(o == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function sl(t, e) {
  return (i, n, o, s, l) => {
    let h = e.find((E) => l >= E[0]) || e[e.length - 1], f, p, b, g, _, k;
    return n.map((E) => {
      let H = t(E), U = H.getFullYear(), B = H.getMonth(), w = H.getDate(), F = H.getHours(), $ = H.getMinutes(), Z = H.getSeconds(), D = U != f && h[2] || B != p && h[3] || w != b && h[4] || F != g && h[5] || $ != _ && h[6] || Z != k && h[7] || h[1];
      return f = U, p = B, b = w, g = F, _ = $, k = Z, D(H);
    });
  };
}
function nh(t, e) {
  let i = Ur(e);
  return (n, o, s, l, h) => o.map((f) => i(t(f)));
}
function sr(t, e, i) {
  return new Date(t, e, i);
}
function ll(t, e) {
  return e(t);
}
const oh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function al(t, e) {
  return (i, n, o, s) => s == null ? Or : e(t(n));
}
function rh(t, e) {
  let i = t.series[e];
  return i.width ? i.stroke(t, e) : i.points.width ? i.points.stroke(t, e) : null;
}
function sh(t, e) {
  return t.series[e].fill(t, e);
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
function ah(t, e) {
  let i = t.cursor.points, n = _e(), o = i.size(t, e);
  yt(n, Hn, o), yt(n, Ln, o);
  let s = o / -2;
  yt(n, "marginLeft", s), yt(n, "marginTop", s);
  let l = i.width(t, e, o);
  return l && yt(n, "borderWidth", l), n;
}
function ch(t, e) {
  let i = t.series[e].points;
  return i._fill || i._stroke;
}
function uh(t, e) {
  let i = t.series[e].points;
  return i._stroke || i._fill;
}
function hh(t, e) {
  return t.series[e].points.size;
}
const lr = [0, 0];
function fh(t, e, i) {
  return lr[0] = e, lr[1] = i, lr;
}
function ao(t, e, i, n = !0) {
  return (o) => {
    o.button == 0 && (!n || o.target == e) && i(o);
  };
}
function ar(t, e, i, n = !0) {
  return (o) => {
    (!n || o.target == e) && i(o);
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
    click: (t, e) => {
      e.stopPropagation(), e.stopImmediatePropagation();
    },
    _x: !1,
    _y: !1
  },
  focus: {
    dist: (t, e, i, n, o) => n - o,
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
}, Br = Pt({}, oa, {
  filter: jl
}), ra = Pt({}, Br, {
  size: 10
}), sa = Pt({}, oa, {
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
  min: pt,
  max: -pt,
  idxs: []
};
function mh(t, e, i, n, o) {
  return e.map((s) => s == null ? "" : Rr(s));
}
function bh(t, e, i, n, o, s, l) {
  let h = [], f = gi.get(o) || 0;
  i = l ? i : gt(So(i, o), f);
  for (let p = i; p <= n; p = gt(p + o, f))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function yr(t, e, i, n, o, s, l) {
  const h = [], f = t.scales[t.axes[e].scale].log, p = f == 10 ? ti : Il, b = ce(p(i));
  o = pn(f, b), f == 10 && (o = Di[Ce(o, Di)]);
  let g = i, _ = o * f;
  f == 10 && (_ = Di[Ce(_, Di)]);
  do
    h.push(g), g = g + o, f == 10 && !gi.has(g) && (g = gt(g, gi.get(o))), g >= _ && (o = g, _ = o * f, f == 10 && (_ = Di[Ce(_, Di)]));
  while (g <= n);
  return h;
}
function _h(t, e, i, n, o, s, l) {
  let f = t.scales[t.axes[e].scale].asinh, p = n > f ? yr(t, e, Zt(f, i), n, o) : [f], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -f ? yr(t, e, Zt(f, -n), -i, o) : [f]).reverse().map((_) => -_).concat(b, p);
}
const ca = /./, vh = /[12357]/, yh = /[125]/, hl = /1/, wr = (t, e, i, n) => t.map((o, s) => e == 4 && o == 0 || s % n == 0 && i.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function wh(t, e, i, n, o) {
  let s = t.axes[i], l = s.scale, h = t.scales[l], f = t.valToPos, p = s._space, b = f(10, l), g = f(9, l) - b >= p ? ca : f(7, l) - b >= p ? vh : f(5, l) - b >= p ? yh : hl;
  if (g == hl) {
    let _ = Dt(f(1, l) - b);
    if (_ < p)
      return wr(e.slice().reverse(), h.distr, g, ve(p / _)).reverse();
  }
  return wr(e, h.distr, g, 1);
}
function xh(t, e, i, n, o) {
  let s = t.axes[i], l = s.scale, h = s._space, f = t.valToPos, p = Dt(f(1, l) - f(2, l));
  return p < h ? wr(e.slice().reverse(), 3, ca, ve(h / p)).reverse() : e;
}
function $h(t, e, i, n) {
  return n == null ? Or : e == null ? "" : Rr(e);
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
function Sh(t, e) {
  let i = 3 + (t || 1) * 2;
  return gt(i * e, 3);
}
function kh(t, e) {
  let { scale: i, idxs: n } = t.series[0], o = t._data[0], s = t.valToPos(o[n[0]], i, !0), l = t.valToPos(o[n[1]], i, !0), h = Dt(l - s), f = t.series[e], p = h / (f.points.space * ct);
  return n[1] - n[0] <= p;
}
const dl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pt,
  max: -pt
}, ua = (t, e, i, n, o) => o, pl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: ua,
  alpha: 1,
  facets: [
    Pt({}, dl, { scale: "x" }),
    Pt({}, dl, { scale: "y" })
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
  min: pt,
  max: -pt,
  idxs: [],
  path: null,
  clip: null
};
function Ah(t, e, i, n, o) {
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
}, Eh = Pt({}, ha, {
  time: !1,
  ori: 1
}), ml = {};
function fa(t, e) {
  let i = ml[t];
  return i || (i = {
    key: t,
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
  }, t != null && (ml[t] = i)), i;
}
const bn = 1, xr = 2;
function Ui(t, e, i) {
  const n = t.mode, o = t.series[e], s = n == 2 ? t._data[e] : t._data, l = t.scales, h = t.bbox;
  let f = s[0], p = n == 2 ? s[1] : s[e], b = n == 2 ? l[o.facets[0].scale] : l[t.series[0].scale], g = n == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, k = h.top, E = h.width, H = h.height, U = t.valToPosH, B = t.valToPosV;
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
function jr(t, e) {
  let i = 0, n = 0, o = st(t.bands, Fr);
  for (let s = 0; s < o.length; s++) {
    let l = o[s];
    l.series[0] == e ? i = l.dir : l.series[1] == e && (l.dir == 1 ? n |= 1 : n |= 2);
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
function Ph(t, e, i, n, o) {
  let s = t.mode, l = t.series[e], h = s == 2 ? l.facets[1].scale : l.scale, f = t.scales[h];
  return o == -1 ? f.min : o == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ei(t, e, i, n, o, s) {
  return Ui(t, e, (l, h, f, p, b, g, _, k, E, H, U) => {
    let B = l.pxRound;
    const w = p.dir * (p.ori == 0 ? 1 : -1), F = p.ori == 0 ? xn : $n;
    let $, Z;
    w == 1 ? ($ = i, Z = n) : ($ = n, Z = i);
    let D = B(g(h[$], p, H, k)), J = B(_(f[$], b, U, E)), Y = B(g(h[Z], p, H, k)), tt = B(_(s == 1 ? b.max : b.min, b, U, E)), G = new Path2D(o);
    return F(G, Y, tt), F(G, D, tt), F(G, D, J), G;
  });
}
function Ao(t, e, i, n, o, s) {
  let l = null;
  if (t.length > 0) {
    l = new Path2D();
    const h = e == 0 ? To : Gr;
    let f = i;
    for (let g = 0; g < t.length; g++) {
      let _ = t[g];
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
function Th(t, e, i) {
  let n = t[t.length - 1];
  n && n[0] == e ? n[1] = i : t.push([e, i]);
}
function Wr(t, e, i, n, o, s, l) {
  let h = [], f = t.length;
  for (let p = o == 1 ? i : n; p >= i && p <= n; p += o)
    if (e[p] === null) {
      let g = p, _ = p;
      if (o == 1)
        for (; ++p <= n && e[p] === null; )
          _ = p;
      else
        for (; --p >= i && e[p] === null; )
          _ = p;
      let k = s(t[g]), E = _ == g ? k : s(t[_]), H = g - o;
      k = l <= 0 && H >= 0 && H < f ? s(t[H]) : k;
      let B = _ + o;
      E = l >= 0 && B >= 0 && B < f ? s(t[B]) : E, E >= k && h.push([k, E]);
    }
  return h;
}
function bl(t) {
  return t == 0 ? Vl : t == 1 ? Mt : (e) => Mi(e, t);
}
function da(t) {
  let e = t == 0 ? Eo : Po, i = t == 0 ? (o, s, l, h, f, p) => {
    o.arcTo(s, l, h, f, p);
  } : (o, s, l, h, f, p) => {
    o.arcTo(l, s, f, h, p);
  }, n = t == 0 ? (o, s, l, h, f) => {
    o.rect(s, l, h, f);
  } : (o, s, l, h, f) => {
    o.rect(l, s, f, h);
  };
  return (o, s, l, h, f, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(o, s, l, h, f) : (p = Me(p, h / 2, f / 2), b = Me(b, h / 2, f / 2), e(o, s + p, l), i(o, s + h, l, s + h, l + f, p), i(o, s + h, l + f, s, l + f, b), i(o, s, l + f, s, l, b), i(o, s, l, s + h, l, p), o.closePath());
  };
}
const Eo = (t, e, i) => {
  t.moveTo(e, i);
}, Po = (t, e, i) => {
  t.moveTo(i, e);
}, xn = (t, e, i) => {
  t.lineTo(e, i);
}, $n = (t, e, i) => {
  t.lineTo(i, e);
}, To = da(0), Gr = da(1), pa = (t, e, i, n, o, s) => {
  t.arc(e, i, n, o, s);
}, ga = (t, e, i, n, o, s) => {
  t.arc(i, e, n, o, s);
}, ma = (t, e, i, n, o, s, l) => {
  t.bezierCurveTo(e, i, n, o, s, l);
}, ba = (t, e, i, n, o, s, l) => {
  t.bezierCurveTo(i, e, o, n, l, s);
};
function _a(t) {
  return (e, i, n, o, s) => Ui(e, i, (l, h, f, p, b, g, _, k, E, H, U) => {
    let { pxRound: B, points: w } = l, F, $;
    p.ori == 0 ? (F = Eo, $ = pa) : (F = Po, $ = ga);
    const Z = gt(w.width * ct, 3);
    let D = (w.size - w.width) / 2 * ct, J = gt(D * 2, 3), Y = new Path2D(), tt = new Path2D(), { left: G, top: S, width: q, height: z } = e.bbox;
    To(
      tt,
      G - J,
      S - J,
      q + J * 2,
      z + J * 2
    );
    const j = (R) => {
      if (f[R] != null) {
        let nt = B(g(h[R], p, H, k)), L = B(_(f[R], b, U, E));
        F(Y, nt + D, L), $(Y, nt, L, D, 0, ho * 2);
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
      clip: tt,
      flags: bn | xr
    };
  });
}
function va(t) {
  return (e, i, n, o, s, l) => {
    n != o && (s != n && l != n && t(e, i, n), s != o && l != o && t(e, i, o), t(e, i, l));
  };
}
const Ch = va(xn), Mh = va($n);
function ya(t) {
  const e = st(t?.alignGaps, 0);
  return (i, n, o, s) => Ui(i, n, (l, h, f, p, b, g, _, k, E, H, U) => {
    [o, s] = xo(f, o, s);
    let B = l.pxRound, w = (z) => B(g(z, p, H, k)), F = (z) => B(_(z, b, U, E)), $, Z;
    p.ori == 0 ? ($ = xn, Z = Ch) : ($ = $n, Z = Mh);
    const D = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: bn }, Y = J.stroke;
    let tt = !1;
    if (s - o >= H * 4) {
      let z = (O) => i.posToVal(O, p.key, !0), j = null, R = null, nt, L, Qt, wt = w(h[D == 1 ? o : s]), ot = w(h[o]), ft = w(h[s]), Q = z(D == 1 ? ot + 1 : ft - 1);
      for (let O = D == 1 ? o : s; O >= o && O <= s; O += D) {
        let Tt = h[O], xt = (D == 1 ? Tt < Q : Tt > Q) ? wt : w(Tt), ut = f[O];
        xt == wt ? ut != null ? (L = ut, j == null ? ($(Y, xt, F(L)), nt = j = R = L) : L < j ? j = L : L > R && (R = L)) : ut === null && (tt = !0) : (j != null && Z(Y, wt, F(j), F(R), F(nt), F(L)), ut != null ? (L = ut, $(Y, xt, F(L)), j = R = nt = L) : (j = R = null, ut === null && (tt = !0)), wt = xt, Q = z(wt + D));
      }
      j != null && j != R && Qt != wt && Z(Y, wt, F(j), F(R), F(nt), F(L));
    } else
      for (let z = D == 1 ? o : s; z >= o && z <= s; z += D) {
        let j = f[z];
        j === null ? tt = !0 : j != null && $(Y, w(h[z]), F(j));
      }
    let [S, q] = jr(i, n);
    if (l.fill != null || S != 0) {
      let z = J.fill = new Path2D(Y), j = l.fillTo(i, n, l.min, l.max, S), R = F(j), nt = w(h[o]), L = w(h[s]);
      D == -1 && ([L, nt] = [nt, L]), $(z, L, R), $(z, nt, R);
    }
    if (!l.spanGaps) {
      let z = [];
      tt && z.push(...Wr(h, f, o, s, D, w, e)), J.gaps = z = l.gaps(i, n, o, s, z), J.clip = Ao(z, p.ori, k, E, H, U);
    }
    return q != 0 && (J.band = q == 2 ? [
      ei(i, n, o, s, Y, -1),
      ei(i, n, o, s, Y, 1)
    ] : ei(i, n, o, s, Y, q)), J;
  });
}
function Dh(t) {
  const e = st(t.align, 1), i = st(t.ascDesc, !1), n = st(t.alignGaps, 0), o = st(t.extend, !1);
  return (s, l, h, f) => Ui(s, l, (p, b, g, _, k, E, H, U, B, w, F) => {
    [h, f] = xo(g, h, f);
    let $ = p.pxRound, { left: Z, width: D } = s.bbox, J = (ot) => $(E(ot, _, w, U)), Y = (ot) => $(H(ot, k, F, B)), tt = _.ori == 0 ? xn : $n;
    const G = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: bn }, S = G.stroke, q = _.dir * (_.ori == 0 ? 1 : -1);
    let z = Y(g[q == 1 ? h : f]), j = J(b[q == 1 ? h : f]), R = j, nt = j;
    o && e == -1 && (nt = Z, tt(S, nt, z)), tt(S, j, z);
    for (let ot = q == 1 ? h : f; ot >= h && ot <= f; ot += q) {
      let ft = g[ot];
      if (ft == null)
        continue;
      let Q = J(b[ot]), O = Y(ft);
      e == 1 ? tt(S, Q, z) : tt(S, R, O), tt(S, Q, O), z = O, R = Q;
    }
    let L = R;
    o && e == 1 && (L = Z + D, tt(S, L, z));
    let [Qt, wt] = jr(s, l);
    if (p.fill != null || Qt != 0) {
      let ot = G.fill = new Path2D(S), ft = p.fillTo(s, l, p.min, p.max, Qt), Q = Y(ft);
      tt(ot, L, Q), tt(ot, nt, Q);
    }
    if (!p.spanGaps) {
      let ot = [];
      ot.push(...Wr(b, g, h, f, q, J, n));
      let ft = p.width * ct / 2, Q = i || e == 1 ? ft : -ft, O = i || e == -1 ? -ft : ft;
      ot.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += O;
      }), G.gaps = ot = p.gaps(s, l, h, f, ot), G.clip = Ao(ot, _.ori, U, B, w, F);
    }
    return wt != 0 && (G.band = wt == 2 ? [
      ei(s, l, h, f, S, -1),
      ei(s, l, h, f, S, 1)
    ] : ei(s, l, h, f, S, wt)), G;
  });
}
function _l(t, e, i, n, o, s, l = pt) {
  if (t.length > 1) {
    let h = null;
    for (let f = 0, p = 1 / 0; f < t.length; f++)
      if (e[f] !== void 0) {
        if (h != null) {
          let b = Dt(t[f] - t[h]);
          b < p && (p = b, l = Dt(i(t[f], n, o, s) - i(t[h], n, o, s)));
        }
        h = f;
      }
  }
  return l;
}
function zh(t) {
  t = t || In;
  const e = st(t.size, [0.6, pt, 1]), i = t.align || 0, n = t.gap || 0;
  let o = t.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = et(o), l = 1 - e[0], h = st(e[1], pt), f = st(e[2], 1), p = st(t.disp, In), b = st(t.each, (k) => {
  }), { fill: g, stroke: _ } = p;
  return (k, E, H, U) => Ui(k, E, (B, w, F, $, Z, D, J, Y, tt, G, S) => {
    let q = B.pxRound, z = i, j = n * ct, R = h * ct, nt = f * ct, L, Qt;
    $.ori == 0 ? [L, Qt] = s(k, E) : [Qt, L] = s(k, E);
    const wt = $.dir * ($.ori == 0 ? 1 : -1);
    let ot = $.ori == 0 ? To : Gr, ft = $.ori == 0 ? b : (T, mt, Ct, ji, xi, Ne, $i) => {
      b(T, mt, Ct, xi, ji, $i, Ne);
    }, Q = st(k.bands, Fr).find((T) => T.series[0] == E), O = Q != null ? Q.dir : 0, Tt = B.fillTo(k, E, B.min, B.max, O), Wt = q(J(Tt, Z, S, tt)), xt, ut, $e, ne = G, St = q(B.width * ct), Oe = !1, qe = null, he = null, ri = null, Ii = null;
    g != null && (St == 0 || _ != null) && (Oe = !0, qe = g.values(k, E, H, U), he = /* @__PURE__ */ new Map(), new Set(qe).forEach((T) => {
      T != null && he.set(T, new Path2D());
    }), St > 0 && (ri = _.values(k, E, H, U), Ii = /* @__PURE__ */ new Map(), new Set(ri).forEach((T) => {
      T != null && Ii.set(T, new Path2D());
    })));
    let { x0: Bi, size: kn } = p;
    if (Bi != null && kn != null) {
      z = 1, w = Bi.values(k, E, H, U), Bi.unit == 2 && (w = w.map((Ct) => k.posToVal(Y + Ct * G, $.key, !0)));
      let T = kn.values(k, E, H, U);
      kn.unit == 2 ? ut = T[0] * G : ut = D(T[0], $, G, Y) - D(0, $, G, Y), ne = _l(w, F, D, $, G, Y, ne), $e = ne - ut + j;
    } else
      ne = _l(w, F, D, $, G, Y, ne), $e = ne * l + j, ut = ne - $e;
    $e < 1 && ($e = 0), St >= ut / 2 && (St = 0), $e < 5 && (q = Vl);
    let Zn = $e > 0, yi = ne - $e - (Zn ? St : 0);
    ut = q(vr(yi, nt, R)), xt = (z == 0 ? ut / 2 : z == wt ? 0 : ut) - z * wt * ((z == 0 ? j / 2 : 0) + (Zn ? St / 2 : 0));
    const Gt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Vi = Oe ? null : new Path2D();
    let Ze = null;
    if (Q != null)
      Ze = k.data[Q.series[1]];
    else {
      let { y0: T, y1: mt } = p;
      T != null && mt != null && (F = mt.values(k, E, H, U), Ze = T.values(k, E, H, U));
    }
    let wi = L * ut, K = Qt * ut;
    for (let T = wt == 1 ? H : U; T >= H && T <= U; T += wt) {
      let mt = F[T];
      if (mt == null)
        continue;
      if (Ze != null) {
        let Xt = Ze[T] ?? 0;
        if (mt - Xt == 0)
          continue;
        Wt = J(Xt, Z, S, tt);
      }
      let Ct = $.distr != 2 || p != null ? w[T] : T, ji = D(Ct, $, G, Y), xi = J(st(mt, Tt), Z, S, tt), Ne = q(ji - xt), $i = q(Zt(xi, Wt)), oe = q(Me(xi, Wt)), fe = $i - oe;
      if (mt != null) {
        let Xt = mt < 0 ? K : wi, Se = mt < 0 ? wi : K;
        Oe ? (St > 0 && ri[T] != null && ot(Ii.get(ri[T]), Ne, oe + ce(St / 2), ut, Zt(0, fe - St), Xt, Se), qe[T] != null && ot(he.get(qe[T]), Ne, oe + ce(St / 2), ut, Zt(0, fe - St), Xt, Se)) : ot(Vi, Ne, oe + ce(St / 2), ut, Zt(0, fe - St), Xt, Se), ft(
          k,
          E,
          T,
          Ne - St / 2,
          oe,
          ut + St,
          fe
        );
      }
    }
    return St > 0 ? Gt.stroke = Oe ? Ii : Vi : Oe || (Gt._fill = B.width == 0 ? B._fill : B._stroke ?? B._fill, Gt.width = 0), Gt.fill = Oe ? he : Vi, Gt;
  });
}
function Oh(t, e) {
  const i = st(e?.alignGaps, 0);
  return (n, o, s, l) => Ui(n, o, (h, f, p, b, g, _, k, E, H, U, B) => {
    [s, l] = xo(p, s, l);
    let w = h.pxRound, F = (L) => w(_(L, b, U, E)), $ = (L) => w(k(L, g, B, H)), Z, D, J;
    b.ori == 0 ? (Z = Eo, J = xn, D = ma) : (Z = Po, J = $n, D = ba);
    const Y = b.dir * (b.ori == 0 ? 1 : -1);
    let tt = F(f[Y == 1 ? s : l]), G = tt, S = [], q = [];
    for (let L = Y == 1 ? s : l; L >= s && L <= l; L += Y)
      if (p[L] != null) {
        let wt = f[L], ot = F(wt);
        S.push(G = ot), q.push($(p[L]));
      }
    const z = { stroke: t(S, q, Z, J, D, w), fill: null, clip: null, band: null, gaps: null, flags: bn }, j = z.stroke;
    let [R, nt] = jr(n, o);
    if (h.fill != null || R != 0) {
      let L = z.fill = new Path2D(j), Qt = h.fillTo(n, o, h.min, h.max, R), wt = $(Qt);
      J(L, G, wt), J(L, tt, wt);
    }
    if (!h.spanGaps) {
      let L = [];
      L.push(...Wr(f, p, s, l, Y, F, i)), z.gaps = L = h.gaps(n, o, s, l, L), z.clip = Ao(L, b.ori, E, H, U, B);
    }
    return nt != 0 && (z.band = nt == 2 ? [
      ei(n, o, s, l, j, -1),
      ei(n, o, s, l, j, 1)
    ] : ei(n, o, s, l, j, nt)), z;
  });
}
function Nh(t) {
  return Oh(Hh, t);
}
function Hh(t, e, i, n, o, s) {
  const l = t.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, t[0], e[0]), l == 2)
    n(h, t[1], e[1]);
  else {
    let f = Array(l), p = Array(l - 1), b = Array(l - 1), g = Array(l - 1);
    for (let _ = 0; _ < l - 1; _++)
      b[_] = e[_ + 1] - e[_], g[_] = t[_ + 1] - t[_], p[_] = b[_] / g[_];
    f[0] = p[0];
    for (let _ = 1; _ < l - 1; _++)
      p[_] === 0 || p[_ - 1] === 0 || p[_ - 1] > 0 != p[_] > 0 ? f[_] = 0 : (f[_] = 3 * (g[_ - 1] + g[_]) / ((2 * g[_] + g[_ - 1]) / p[_ - 1] + (g[_] + 2 * g[_ - 1]) / p[_]), isFinite(f[_]) || (f[_] = 0));
    f[l - 1] = p[l - 2];
    for (let _ = 0; _ < l - 1; _++)
      o(
        h,
        t[_] + g[_] / 3,
        e[_] + f[_] * g[_] / 3,
        t[_ + 1] - g[_] / 3,
        e[_ + 1] - f[_ + 1] * g[_] / 3,
        t[_ + 1],
        e[_ + 1]
      );
  }
  return h;
}
const $r = /* @__PURE__ */ new Set();
function vl() {
  for (let t of $r)
    t.syncRect(!0);
}
wn && (Ni(mu, hn, vl), Ni(bu, hn, vl, !0), Ni(bo, hn, () => {
  jt.pxRatio = ct;
}));
const Lh = ya(), Rh = _a();
function yl(t, e, i, n) {
  return (n ? [t[0], t[1]].concat(t.slice(2)) : [t[0]].concat(t.slice(1))).map((s, l) => Sr(s, l, e, i));
}
function Fh(t, e) {
  return t.map((i, n) => n == 0 ? {} : Pt({}, e, i));
}
function Sr(t, e, i, n) {
  return Pt({}, e == 0 ? i : n, t);
}
function wa(t, e, i) {
  return e == null ? gn : [e, i];
}
const Uh = wa;
function Ih(t, e, i) {
  return e == null ? gn : _o(e, i, Lr, !0);
}
function xa(t, e, i, n) {
  return e == null ? gn : $o(e, i, t.scales[n].log, !1);
}
const Bh = xa;
function $a(t, e, i, n) {
  return e == null ? gn : Hr(e, i, t.scales[n].log, !1);
}
const Vh = $a;
function jh(t, e, i, n, o) {
  let s = Zt(Qs(t), Qs(e)), l = e - t, h = Ce(o / n * l, i);
  do {
    let f = i[h], p = n * f / l;
    if (p >= o && s + (f < 5 ? gi.get(f) : 0) <= 17)
      return [f, p];
  } while (++h < i.length);
  return [0, 0];
}
function wl(t) {
  let e, i;
  return t = t.replace(/(\d+)px/, (n, o) => (e = Mt((i = +o) * ct)) + "px"), [t, e, i];
}
function Wh(t) {
  t.show && [t.font, t.labelFont].forEach((e) => {
    let i = gt(e[2] * ct, 1);
    e[0] = e[0].replace(/[0-9.]+px/, i + "px"), e[1] = i;
  });
}
function jt(t, e, i) {
  const n = {
    mode: st(t.mode, 1)
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
  const p = n.root = _e(Qc);
  if (t.id != null && (p.id = t.id), ae(p, t.class), t.title) {
    let r = _e(eu, p);
    r.textContent = t.title;
  }
  const b = Pe("canvas"), g = n.ctx = b.getContext("2d"), _ = _e(iu, p);
  Ni("click", _, (r) => {
    r.target === E && (bt != en || $t != nn) && Bt.click(n, r);
  }, !0);
  const k = n.under = _e(nu, _);
  _.appendChild(b);
  const E = n.over = _e(ou, _);
  t = mn(t);
  const H = +st(t.pxAlign, 1), U = bl(H);
  (t.plugins || []).forEach((r) => {
    r.opts && (t = r.opts(n, t) || t);
  });
  const B = t.ms || 1e-3, w = n.series = o == 1 ? yl(t.series || [], ul, gl, !1) : Fh(t.series || [null], pl), F = n.axes = yl(t.axes || [], cl, fl, !0), $ = n.scales = {}, Z = n.bands = t.bands || [];
  Z.forEach((r) => {
    r.fill = et(r.fill || null), r.dir = st(r.dir, -1);
  });
  const D = o == 2 ? w[1].facets[0].scale : w[0].scale, J = {
    axes: Fa,
    series: Oa
  }, Y = (t.drawOrder || ["axes", "series"]).map((r) => J[r]);
  function tt(r) {
    const a = r.distr == 3 ? (c) => ti(c > 0 ? c : r.clamp(n, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => rr(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: d, _max: m } = r, v = m - d;
      return (u - d) / v;
    };
  }
  function G(r) {
    let a = $[r];
    if (a == null) {
      let c = (t.scales || In)[r] || In;
      if (c.from != null) {
        G(c.from);
        let u = Pt({}, $[c.from], c, { key: r });
        u.valToPct = tt(u), $[r] = u;
      } else {
        a = $[r] = Pt({}, r == D ? ha : Eh, c), a.key = r;
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
        a.range = et(d || (u ? Uh : r == D ? a.distr == 3 ? Bh : a.distr == 4 ? Vh : wa : a.distr == 3 ? xa : a.distr == 4 ? $a : Ih)), a.auto = et(m ? !1 : a.auto), a.clamp = et(a.clamp || Ah), a._min = a._max = null, a.valToPct = tt(a);
      }
    }
  }
  G("x"), G("y"), o == 1 && w.forEach((r) => {
    G(r.scale);
  }), F.forEach((r) => {
    G(r.scale);
  });
  for (let r in t.scales)
    G(r);
  const S = $[D], q = S.distr;
  let z, j;
  S.ori == 0 ? (ae(p, Xc), z = s, j = l) : (ae(p, tu), z = l, j = s);
  const R = {};
  for (let r in $) {
    let a = $[r];
    (a.min != null || a.max != null) && (R[r] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const nt = t.tzDate || ((r) => new Date(Mt(r / B))), L = t.fmtDate || Ur, Qt = B == 1 ? Xu(nt) : ih(nt), wt = sl(nt, rl(B == 1 ? Qu : eh, L)), ot = al(nt, ll(oh, L)), ft = [], Q = n.legend = Pt({}, lh, t.legend), O = n.cursor = Pt({}, dh, { drag: { y: o == 2 } }, t.cursor), Tt = Q.show, Wt = O.show, xt = Q.markers;
  Q.idxs = ft, xt.width = et(xt.width), xt.dash = et(xt.dash), xt.stroke = et(xt.stroke), xt.fill = et(xt.fill);
  let ut, $e, ne, St = [], Oe = [], qe, he = !1, ri = {};
  if (Q.live) {
    const r = w[1] ? w[1].values : null;
    he = r != null, qe = he ? r(n, 1, 0) : { _: 0 };
    for (let a in qe)
      ri[a] = Or;
  }
  if (Tt)
    if (ut = Pe("table", uu, p), ne = Pe("tbody", null, ut), Q.mount(n, ut), he) {
      $e = Pe("thead", null, ut, ne);
      let r = Pe("tr", null, $e);
      Pe("th", null, r);
      for (var Ii in qe)
        Pe("th", Hs, r).textContent = Ii;
    } else
      ae(ut, fu), Q.live && ae(ut, hu);
  const Bi = { show: !0 }, kn = { show: !1 };
  function Zn(r, a) {
    if (a == 0 && (he || !Q.live || o == 2))
      return gn;
    let c = [], u = Pe("tr", du, ne, ne.childNodes[a]);
    ae(u, r.class), r.show || ae(u, zi);
    let d = Pe("th", null, u);
    if (xt.show) {
      let y = _e(pu, d);
      if (a > 0) {
        let x = xt.width(n, a);
        x && (y.style.border = x + "px " + xt.dash(n, a) + " " + xt.stroke(n, a)), y.style.background = xt.fill(n, a);
      }
    }
    let m = _e(Hs, d);
    r.label instanceof HTMLElement ? m.appendChild(r.label) : m.textContent = r.label, a > 0 && (xt.show || (m.style.color = r.width > 0 ? xt.stroke(n, a) : xt.fill(n, a)), Gt("click", d, (y) => {
      if (O._lock)
        return;
      ki(y);
      let x = w.indexOf(r);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = w.some((P, C) => C > 0 && C != x && P.show);
        w.forEach((P, C) => {
          C > 0 && Le(C, A ? C == x ? Bi : kn : Bi, !0, Et.setSeries);
        });
      } else
        Le(x, { show: !r.show }, !0, Et.setSeries);
    }, !1), Gi && Gt(Us, d, (y) => {
      O._lock || (ki(y), Le(w.indexOf(r), rn, !0, Et.setSeries));
    }, !1));
    for (var v in qe) {
      let y = Pe("td", gu, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const yi = /* @__PURE__ */ new Map();
  function Gt(r, a, c, u = !0) {
    const d = yi.get(a) || {}, m = O.bind[r](n, a, c, u);
    m && (Ni(r, a, d[r] = m), yi.set(a, d));
  }
  function Vi(r, a, c) {
    const u = yi.get(a) || {};
    for (let d in u)
      (r == null || d == r) && (_r(d, a, u[d]), delete u[d]);
    r == null && yi.delete(a);
  }
  let Ze = 0, wi = 0, K = 0, T = 0, mt = 0, Ct = 0, ji = mt, xi = Ct, Ne = K, $i = T, oe = 0, fe = 0, Xt = 0, Se = 0;
  n.bbox = {};
  let Mo = !1, Jn = !1, Wi = !1, Si = !1, Qn = !1, de = !1;
  function Do(r, a, c) {
    (c || r != n.width || a != n.height) && qr(r, a), Ji(!1), Wi = !0, Jn = !0, Qi();
  }
  function qr(r, a) {
    n.width = Ze = K = r, n.height = wi = T = a, mt = Ct = 0, Ea(), Pa();
    let c = n.bbox;
    oe = c.left = Mi(mt * ct, 0.5), fe = c.top = Mi(Ct * ct, 0.5), Xt = c.width = Mi(K * ct, 0.5), Se = c.height = Mi(T * ct, 0.5);
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
        P > 0 && (x ? (K -= P, v == 3 ? (mt += P, u = !0) : c = !0) : (T -= P, v == 0 ? (Ct += P, r = !0) : a = !0));
      }
    }), Ai[0] = r, Ai[1] = c, Ai[2] = a, Ai[3] = u, K -= si[1] + si[3], mt += si[3], T -= si[2] + si[0], Ct += si[0];
  }
  function Pa() {
    let r = mt + K, a = Ct + T, c = mt, u = Ct;
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
    let c = r.prox = et(r.prox), u = r.bias ??= 0;
    O.dataIdx = (d, m, v, y) => {
      if (m == 0)
        return v;
      let x = v, A = c(d, m, v, y) ?? pt, P = A >= 0 && A < pt, C = S.ori == 0 ? K : T, W = O.left, at = e[0], rt = e[m];
      if (a.has(rt[v])) {
        x = null;
        let X = null, I = null, N;
        if (u == 0 || u == -1)
          for (N = v; X == null && N-- > 0; )
            a.has(rt[N]) || (X = N);
        if (u == 0 || u == 1)
          for (N = v; I == null && N++ < rt.length; )
            a.has(rt[N]) || (I = N);
        if (X != null || I != null)
          if (P) {
            let vt = X == null ? -1 / 0 : z(at[X], S, C, 0), kt = I == null ? 1 / 0 : z(at[I], S, C, 0), Ft = W - vt, dt = kt - W;
            Ft <= dt ? Ft <= A && (x = X) : dt <= A && (x = I);
          } else
            x = I == null ? X : X == null ? I : v - X <= I - v ? X : I;
      } else P && Dt(W - z(at[v], S, C, 0)) > A && (x = null);
      return x;
    };
  }
  const ki = (r) => {
    O.event = r;
  };
  O.idxs = ft, O._lock = !1;
  let Vt = O.points;
  Vt.show = et(Vt.show), Vt.size = et(Vt.size), Vt.stroke = et(Vt.stroke), Vt.width = et(Vt.width), Vt.fill = et(Vt.fill);
  const He = n.focus = Pt({}, t.focus || { alpha: 0.3 }, O.focus), Gi = He.prox >= 0, Yi = Gi && Vt.one;
  let pe = [], Ki = [], qi = [];
  function Zr(r, a) {
    let c = Vt.show(n, a);
    if (c instanceof HTMLElement)
      return ae(c, cu), ae(c, r.class), Ie(c, -10, -10, K, T), E.insertBefore(c, pe[a]), c;
  }
  function Jr(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? el(u) ? al(nt, ll(u, L)) : u || ot : u || $h, r.label = r.label || (c ? gh : ph);
    }
    if (Yi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Lh || Eu, r.fillTo = et(r.fillTo || Ph), r.pxAlign = +st(r.pxAlign, H), r.pxRound = bl(r.pxAlign), r.stroke = et(r.stroke || null), r.fill = et(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = Sh(Zt(1, r.width), 1), u = r.points = Pt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Rh,
        _stroke: null,
        _fill: null
      }, r.points);
      u.show = et(u.show), u.filter = et(u.filter), u.fill = et(u.fill), u.stroke = et(u.stroke), u.paths = et(u.paths), u.pxAlign = r.pxAlign;
    }
    if (Tt) {
      let c = Zn(r, a);
      St.splice(a, 0, c[0]), Oe.splice(a, 0, c[1]), Q.values.push(null);
    }
    if (Wt) {
      ft.splice(a, 0, null);
      let c = null;
      Yi ? a == 0 && (c = Zr(r, a)) : a > 0 && (c = Zr(r, a)), pe.splice(a, 0, c), Ki.splice(a, 0, 0), qi.splice(a, 0, 0);
    }
    Rt("addSeries", a);
  }
  function Ta(r, a) {
    a = a ?? w.length, r = o == 1 ? Sr(r, a, ul, gl) : Sr(r, a, {}, pl), w.splice(a, 0, r), Jr(w[a], a);
  }
  n.addSeries = Ta;
  function Ca(r) {
    if (w.splice(r, 1), Tt) {
      Q.values.splice(r, 1), Oe.splice(r, 1);
      let a = St.splice(r, 1)[0];
      Vi(null, a.firstChild), a.remove();
    }
    Wt && (ft.splice(r, 1), pe.splice(r, 1)[0].remove(), Ki.splice(r, 1), qi.splice(r, 1)), Rt("delSeries", r);
  }
  n.delSeries = Ca;
  const Ai = [!1, !1, !1, !1];
  function Ma(r, a) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = $[r.scale];
      u == null && (r.scale = c ? w[1].scale : D, u = $[r.scale]);
      let d = u.time;
      r.size = et(r.size), r.space = et(r.space), r.rotate = et(r.rotate), hi(r.incrs) && r.incrs.forEach((v) => {
        !gi.has(v) && gi.set(v, Gl(v));
      }), r.incrs = et(r.incrs || (u.distr == 2 ? qu : d ? B == 1 ? Ju : th : Di)), r.splits = et(r.splits || (d && u.distr == 1 ? Qt : u.distr == 3 ? yr : u.distr == 4 ? _h : bh)), r.stroke = et(r.stroke), r.grid.stroke = et(r.grid.stroke), r.ticks.stroke = et(r.ticks.stroke), r.border.stroke = et(r.border.stroke);
      let m = r.values;
      r.values = // static array of tick values
      hi(m) && !hi(m[0]) ? et(m) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          hi(m) ? sl(nt, rl(m, L)) : (
            // fmtDate string tpl
            el(m) ? nh(nt, m) : m || wt
          )
        ) : m || mh
      ), r.filter = et(r.filter || (u.distr >= 3 && u.log == 10 ? wh : u.distr == 3 && u.log == 2 ? xh : jl)), r.font = wl(r.font), r.labelFont = wl(r.labelFont), r._size = r.size(n, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (Ai[a] = !0, r._el = _e(ru, _));
    }
  }
  function An(r, a, c, u) {
    let [d, m, v, y] = c, x = a % 2, A = 0;
    return x == 0 && (y || m) && (A = a == 0 && !d || a == 2 && !v ? Mt(cl.size / 3) : 0), x == 1 && (d || v) && (A = a == 1 && !m || a == 3 && !y ? Mt(fl.size / 2) : 0), A;
  }
  const Qr = n.padding = (t.padding || [An, An, An, An]).map((r) => et(st(r, An))), si = n._padding = Qr.map((r, a) => r(n, a, Ai, 0));
  let It, Ot = null, Nt = null;
  const Xn = o == 1 ? w[0].idxs : null;
  let ke = null, En = !1;
  function Xr(r, a) {
    if (e = r ?? [], n.data = n._data = e, o == 2) {
      It = 0;
      for (let c = 1; c < w.length; c++)
        It += e[c][0].length;
    } else {
      e.length == 0 && (n.data = n._data = e = [[]]), ke = e[0], It = ke.length;
      let c = e;
      if (q == 2) {
        c = e.slice();
        let u = c[0] = Array(It);
        for (let d = 0; d < It; d++)
          u[d] = d;
      }
      n._data = e = c;
    }
    if (Ji(!0), Rt("setData"), q == 2 && (Wi = !0), a !== !1) {
      let c = S;
      c.auto(n, En) ? zo() : ai(D, c.min, c.max), Si = Si || O.left >= 0, de = !0, Qi();
    }
  }
  n.setData = Xr;
  function zo() {
    En = !0;
    let r, a;
    o == 1 && (It > 0 ? (Ot = Xn[0] = 0, Nt = Xn[1] = It - 1, r = e[0][Ot], a = e[0][Nt], q == 2 ? (r = Ot, a = Nt) : r == a && (q == 3 ? [r, a] = $o(r, r, S.log, !1) : q == 4 ? [r, a] = Hr(r, r, S.log, !1) : S.time ? a = r + Mt(86400 / B) : [r, a] = _o(r, a, Lr, !0))) : (Ot = Xn[0] = r = null, Nt = Xn[1] = a = null)), ai(D, r, a);
  }
  let to, Zi, Oo, No, Ho, Lo, Ro, Fo, Uo, te;
  function ts(r, a, c, u, d, m) {
    r ??= Rs, c ??= Fr, u ??= "butt", d ??= Rs, m ??= "round", r != to && (g.strokeStyle = to = r), d != Zi && (g.fillStyle = Zi = d), a != Oo && (g.lineWidth = Oo = a), m != Ho && (g.lineJoin = Ho = m), u != Lo && (g.lineCap = Lo = u), c != No && g.setLineDash(No = c);
  }
  function es(r, a, c, u) {
    a != Zi && (g.fillStyle = Zi = a), r != Ro && (g.font = Ro = r), c != Fo && (g.textAlign = Fo = c), u != Uo && (g.textBaseline = Uo = u);
  }
  function Io(r, a, c, u, d = 0) {
    if (u.length > 0 && r.auto(n, En) && (a == null || a.min == null)) {
      let m = st(Ot, 0), v = st(Nt, u.length - 1), y = c.min == null ? wu(u, m, v, d, r.distr == 3) : [c.min, c.max];
      r.min = Me(r.min, c.min = y[0]), r.max = Zt(r.max, c.max = y[1]);
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
          Pt(m, d);
        else if (u != D || o == 2)
          if (It == 0 && m.from == null) {
            let v = m.range(n, null, null, u);
            m.min = v[0], m.max = v[1];
          } else
            m.min = pt, m.max = -pt;
      }
    }
    if (It > 0) {
      w.forEach((u, d) => {
        if (o == 1) {
          let m = u.scale, v = R[m];
          if (v == null)
            return;
          let y = r[m];
          if (d == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Ot = Ce(y.min, e[0]), Nt = Ce(y.max, e[0]), Nt - Ot > 1 && (e[0][Ot] < y.min && Ot++, e[0][Nt] > y.max && Nt--), u.min = ke[Ot], u.max = ke[Nt];
          } else u.show && u.auto && Io(y, v, u, e[d], u.sorted);
          u.idxs[0] = Ot, u.idxs[1] = Nt;
        } else if (d > 0 && u.show && u.auto) {
          let [m, v] = u.facets, y = m.scale, x = v.scale, [A, P] = e[d], C = r[y], W = r[x];
          C != null && Io(C, R[y], m, A, m.sorted), W != null && Io(W, R[x], v, P, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in r) {
        let d = r[u], m = R[u];
        if (d.from == null && (m == null || m.min == null)) {
          let v = d.range(
            n,
            d.min == pt ? null : d.min,
            d.max == -pt ? null : d.max,
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
        m._min = v == 3 ? ti(m.min) : v == 4 ? rr(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? ti(m.max) : v == 4 ? rr(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      w.forEach((u, d) => {
        o == 2 ? d > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Wi = !0, Rt("setScale", u);
      Wt && O.left >= 0 && (Si = de = !0);
    }
    for (let u in R)
      R[u] = null;
  }
  function za(r) {
    let a = vr(Ot - 1, 0, It - 1), c = vr(Nt + 1, 0, It - 1);
    for (; r[a] == null && a > 0; )
      a--;
    for (; r[c] == null && c < It - 1; )
      c++;
    return [a, c];
  }
  function Oa() {
    if (It > 0) {
      let r = w.some((a) => a._focus) && te != He.alpha;
      r && (g.globalAlpha = te = He.alpha), w.forEach((a, c) => {
        if (c > 0 && a.show && (ns(c, !1), ns(c, !0), a._paths == null)) {
          let u = te;
          te != a.alpha && (g.globalAlpha = te = a.alpha);
          let d = o == 2 ? [0, e[c][0].length - 1] : za(e[c]);
          a._paths = a.paths(n, c, d[0], d[1]), te != u && (g.globalAlpha = te = u);
        }
      }), w.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = te;
          te != a.alpha && (g.globalAlpha = te = a.alpha), a._paths != null && os(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Ot, Nt, d), v = a.points.filter(n, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(n, c, Ot, Nt, v), os(c, !0));
          }
          te != u && (g.globalAlpha = te = u), Rt("drawSeries", c);
        }
      }), r && (g.globalAlpha = te = 1);
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
    A = gt(A * ct, 3);
    let P = null, C = A % 2 / 2;
    a && x == null && (x = A > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && C > 0;
    if (W && g.translate(C, C), !a) {
      let at = oe - A / 2, rt = fe - A / 2, X = Xt + A, I = Se + A;
      P = new Path2D(), P.rect(at, rt, X, I);
    }
    a ? Bo(y, A, c.dash, c.cap, x, u, d, v, m) : Na(r, y, A, c.dash, c.cap, x, u, d, v, P, m), W && g.translate(-C, -C);
  }
  function Na(r, a, c, u, d, m, v, y, x, A, P) {
    let C = !1;
    x != 0 && Z.forEach((W, at) => {
      if (W.series[0] == r) {
        let rt = w[W.series[1]], X = e[W.series[1]], I = (rt._paths || In).band;
        hi(I) && (I = W.dir == 1 ? I[0] : I[1]);
        let N, vt = null;
        rt.show && I && $u(X, Ot, Nt) ? (vt = W.fill(n, at) || m, N = rt._paths.clip) : I = null, Bo(a, c, u, d, vt, v, y, x, A, P, N, I), C = !0;
      }
    }), C || Bo(a, c, u, d, m, v, y, x, A, P);
  }
  const rs = bn | xr;
  function Bo(r, a, c, u, d, m, v, y, x, A, P, C) {
    ts(r, a, c, u, d), (x || A || C) && (g.save(), x && g.clip(x), A && g.clip(A)), C ? (y & rs) == rs ? (g.clip(C), P && g.clip(P), io(d, v), eo(r, m, a)) : y & xr ? (io(d, v), g.clip(C), eo(r, m, a)) : y & bn && (g.save(), g.clip(C), P && g.clip(P), io(d, v), g.restore(), eo(r, m, a)) : (io(d, v), eo(r, m, a)), (x || A || C) && g.restore();
  }
  function eo(r, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, d) => {
      g.strokeStyle = to = d, g.stroke(u);
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
    H == 1 && g.translate(P, P), ts(y, v, x, A, y), g.beginPath();
    let C, W, at, rt, X = d + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (W = d, rt = X) : (C = d, at = X);
    for (let I = 0; I < r.length; I++)
      a[I] != null && (c == 0 ? C = at = r[I] : W = rt = r[I], g.moveTo(C, W), g.lineTo(at, rt));
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
      let C = d.distr == 2, W = c._splits = c.splits(n, u, y, x, A, P, C), at = d.distr == 2 ? W.map((N) => ke[N]) : W, rt = d.distr == 2 ? ke[W[1]] - ke[W[0]] : A, X = c._values = c.values(n, c.filter(n, at, u, P, rt), u, P, rt);
      c._rotate = m == 2 ? c.rotate(n, X, u, P) : 0;
      let I = c._size;
      c._size = ve(c.size(n, X, u, r)), I != null && c._size != I && (a = !1);
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
        let Kt = a.labelGap * y, le = Mt((a._lpos + Kt) * ct);
        es(a.labelFont[0], v, "center", c == 2 ? On : Ls), g.save(), u == 1 ? (d = m = 0, g.translate(
          le,
          Mt(fe + Se / 2)
        ), g.rotate((c == 3 ? -ho : ho) / 2)) : (d = Mt(oe + Xt / 2), m = le);
        let Ti = Bl(a.label) ? a.label(n, r, x, A) : a.label;
        g.fillText(Ti, d, m), g.restore();
      }
      if (A == 0)
        continue;
      let P = $[a.scale], C = u == 0 ? Xt : Se, W = u == 0 ? oe : fe, at = a._splits, rt = P.distr == 2 ? at.map((Kt) => ke[Kt]) : at, X = P.distr == 2 ? ke[at[1]] - ke[at[0]] : x, I = a.ticks, N = a.border, vt = I.show ? I.size : 0, kt = Mt(vt * ct), Ft = Mt((a.alignTo == 2 ? a._size - vt - a.gap : a.gap) * ct), dt = a._rotate * -ho / 180, At = U(a._pos * ct), re = (kt + Ft) * y, Yt = At + re;
      m = u == 0 ? Yt : 0, d = u == 1 ? Yt : 0;
      let ge = a.font[0], Ae = a.align == 1 ? ln : a.align == 2 ? ir : dt > 0 ? ln : dt < 0 ? ir : u == 0 ? "center" : c == 3 ? ir : ln, Fe = dt || u == 1 ? "middle" : c == 2 ? On : Ls;
      es(ge, v, Ae, Fe);
      let se = a.font[1] * a.lineGap, me = at.map((Kt) => U(h(Kt, P, C, W))), Ee = a._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let le = Ee[Kt];
        if (le != null) {
          u == 0 ? d = me[Kt] : m = me[Kt], le = "" + le;
          let Ti = le.indexOf(`
`) == -1 ? [le] : le.split(/\n/gm);
          for (let qt = 0; qt < Ti.length; qt++) {
            let Ss = Ti[qt];
            dt ? (g.save(), g.translate(d, m + qt * se), g.rotate(dt), g.fillText(Ss, 0, 0), g.restore()) : g.fillText(Ss, d, m + qt * se);
          }
        }
      }
      I.show && Vo(
        me,
        I.filter(n, rt, r, A, X),
        u,
        c,
        At,
        kt,
        gt(I.width * ct, 3),
        I.stroke(n, r),
        I.dash,
        I.cap
      );
      let Ue = a.grid;
      Ue.show && Vo(
        me,
        Ue.filter(n, rt, r, A, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? fe : oe,
        u == 0 ? Se : Xt,
        gt(Ue.width * ct, 3),
        Ue.stroke(n, r),
        Ue.dash,
        Ue.cap
      ), N.show && Vo(
        [At],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? fe : oe,
        u == 1 ? Se : Xt,
        gt(N.width * ct, 3),
        N.stroke(n, r),
        N.dash,
        N.cap
      );
    }
    Rt("drawAxes");
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
      Rt(...Pn[r]);
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
      if (yt(k, ln, mt), yt(k, On, Ct), yt(k, Hn, K), yt(k, Ln, T), yt(E, ln, mt), yt(E, On, Ct), yt(E, Hn, K), yt(E, Ln, T), yt(_, Hn, Ze), yt(_, Ln, wi), b.width = Mt(Ze * ct), b.height = Mt(wi * ct), F.forEach(({ _el: r, _show: a, _size: c, _pos: u, side: d }) => {
        if (r != null)
          if (a) {
            let m = d === 3 || d === 0 ? c : 0, v = d % 2 == 1;
            yt(r, v ? "left" : "top", u - m), yt(r, v ? "width" : "height", c), yt(r, v ? "top" : "left", v ? Ct : mt), yt(r, v ? "height" : "width", v ? T : K), br(r, zi);
          } else
            ae(r, zi);
      }), to = Zi = Oo = Ho = Lo = Ro = Fo = Uo = No = null, te = 1, Mn(!0), mt != ji || Ct != xi || K != Ne || T != $i) {
        Ji(!1);
        let r = K / Ne, a = T / $i;
        if (Wt && !Si && O.left >= 0) {
          O.left *= r, O.top *= a, Xi && Ie(Xi, Mt(O.left), 0, K, T), tn && Ie(tn, 0, Mt(O.top), K, T);
          for (let c = 0; c < pe.length; c++) {
            let u = pe[c];
            u != null && (Ki[c] *= r, qi[c] *= a, Ie(u, ve(Ki[c]), ve(qi[c]), K, T));
          }
        }
        if (_t.show && !Qn && _t.left >= 0 && _t.width > 0) {
          _t.left *= r, _t.width *= r, _t.top *= a, _t.height *= a;
          for (let c in Zo)
            yt(on, c, _t[c]);
        }
        ji = mt, xi = Ct, Ne = K, $i = T;
      }
      Rt("setSize"), Jn = !1;
    }
    Ze > 0 && wi > 0 && (g.clearRect(0, 0, b.width, b.height), Rt("drawClear"), Y.forEach((r) => r()), Rt("draw")), _t.show && Qn && (oo(_t), Qn = !1), Wt && Si && (Pi(null, !0, !1), Si = !1), Q.show && Q.live && de && (Ko(), de = !1), f || (f = !0, n.status = 1, Rt("ready")), En = !1, no = !1;
  }
  n.redraw = (r, a) => {
    Wi = a || !1, r !== !1 ? ai(D, S.min, S.max) : Qi();
  };
  function Wo(r, a) {
    let c = $[r];
    if (c.from == null) {
      if (It == 0) {
        let u = c.range(n, a.min, a.max, r);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (It > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      r == D && c.distr == 2 && It > 0 && (a.min = Ce(a.min, e[0]), a.max = Ce(a.max, e[0]), a.min == a.max && a.max++), R[r] = a, Mo = !0, Qi();
    }
  }
  n.setScale = Wo;
  let Go, Yo, Xi, tn, ls, as, en, nn, cs, us, bt, $t, li = !1;
  const Bt = O.drag;
  let Ht = Bt.x, Lt = Bt.y;
  Wt && (O.x && (Go = _e(lu, E)), O.y && (Yo = _e(au, E)), S.ori == 0 ? (Xi = Go, tn = Yo) : (Xi = Yo, tn = Go), bt = O.left, $t = O.top);
  const _t = n.select = Pt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, t.select), on = _t.show ? _e(su, _t.over ? E : k) : null;
  function oo(r, a) {
    if (_t.show) {
      for (let c in r)
        _t[c] = r[c], c in Zo && yt(on, c, r[c]);
      a !== !1 && Rt("setSelect");
    }
  }
  n.setSelect = oo;
  function Ba(r) {
    if (w[r].show)
      Tt && br(St[r], zi);
    else if (Tt && ae(St[r], zi), Wt) {
      let c = Yi ? pe[0] : pe[r];
      c != null && Ie(c, -10, -10, K, T);
    }
  }
  function ai(r, a, c) {
    Wo(r, { min: a, max: c });
  }
  function Le(r, a, c, u) {
    a.focus != null && Ya(r), a.show != null && w.forEach((d, m) => {
      m > 0 && (r == m || r == null) && (d.show = a.show, Ba(m), o == 2 ? (ai(d.facets[0].scale, null, null), ai(d.facets[1].scale, null, null)) : ai(d.scale, null, null), Qi());
    }), c !== !1 && Rt("setSeries", r, a), u && Dn("setSeries", n, r, a);
  }
  n.setSeries = Le;
  function Va(r, a) {
    Pt(Z[r], a);
  }
  function ja(r, a) {
    r.fill = et(r.fill || null), r.dir = st(r.dir, -1), a = a ?? Z.length, Z.splice(a, 0, r);
  }
  function Wa(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  n.addBand = ja, n.setBand = Va, n.delBand = Wa;
  function Ga(r, a) {
    w[r].alpha = a, Wt && pe[r] != null && (pe[r].style.opacity = a), Tt && St[r] && (St[r].style.opacity = a);
  }
  let Je, ci, Ei;
  const rn = { focus: !0 };
  function Ya(r) {
    if (r != Ei) {
      let a = r == null, c = He.alpha != 1;
      w.forEach((u, d) => {
        if (o == 1 || d > 0) {
          let m = a || d == 0 || d == r;
          u._focus = a ? null : m, c && Ga(d, m ? 1 : He.alpha);
        }
      }), Ei = r, c && Qi();
    }
  }
  Tt && Gi && Gt(Is, ut, (r) => {
    O._lock || (ki(r), Ei != null && Le(null, rn, !0, Et.setSeries));
  });
  function Re(r, a, c) {
    let u = $[a];
    c && (r = r / ct - (u.ori == 1 ? Ct : mt));
    let d = K;
    u.ori == 1 && (d = T, r = d - r), u.dir == -1 && (r = d - r);
    let m = u._min, v = u._max, y = r / d, x = m + (v - m) * y, A = u.distr;
    return A == 3 ? pn(10, x) : A == 4 ? ku(x, u.asinh) : A == 100 ? u.bwd(x) : x;
  }
  function Ka(r, a) {
    let c = Re(r, D, a);
    return Ce(c, e[0], Ot, Nt);
  }
  n.valToIdx = (r) => Ce(r, e[0]), n.posToIdx = Ka, n.posToVal = Re, n.valToPos = (r, a, c) => $[a].ori == 0 ? s(
    r,
    $[a],
    c ? Xt : K,
    c ? oe : 0
  ) : l(
    r,
    $[a],
    c ? Se : T,
    c ? fe : 0
  ), n.setCursor = (r, a, c) => {
    bt = r.left, $t = r.top, Pi(null, a, c);
  };
  function hs(r, a) {
    yt(on, ln, _t.left = r), yt(on, Hn, _t.width = a);
  }
  function fs(r, a) {
    yt(on, On, _t.top = r), yt(on, Ln, _t.height = a);
  }
  let Tn = S.ori == 0 ? hs : fs, Cn = S.ori == 1 ? hs : fs;
  function qa() {
    if (Tt && Q.live)
      for (let r = o == 2 ? 1 : 0; r < w.length; r++) {
        if (r == 0 && he)
          continue;
        let a = Q.values[r], c = 0;
        for (let u in a)
          Oe[r][c++].firstChild.nodeValue = a[u];
      }
  }
  function Ko(r, a) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      ft[u] = c;
    }) : Tu(r.idx) || ft.fill(r.idx), Q.idx = ft[0]), Tt && Q.live) {
      for (let c = 0; c < w.length; c++)
        (c > 0 || o == 1 && !he) && Za(c, ft[c]);
      qa();
    }
    de = !1, a !== !1 && Rt("setLegend");
  }
  n.setLegend = Ko;
  function Za(r, a) {
    let c = w[r], u = r == 0 && q == 2 ? ke : e[r], d;
    he ? d = c.values(n, r, a) ?? ri : (d = c.value(n, a == null ? null : u[a], r, a), d = d == null ? ri : { _: d }), Q.values[r] = d;
  }
  function Pi(r, a, c) {
    cs = bt, us = $t, [bt, $t] = O.move(n, bt, $t), O.left = bt, O.top = $t, Wt && (Xi && Ie(Xi, Mt(bt), 0, K, T), tn && Ie(tn, 0, Mt($t), K, T));
    let u, d = Ot > Nt;
    Je = pt, ci = null;
    let m = S.ori == 0 ? K : T, v = S.ori == 1 ? K : T;
    if (bt < 0 || It == 0 || d) {
      u = O.idx = null;
      for (let y = 0; y < w.length; y++) {
        let x = pe[y];
        x != null && Ie(x, -10, -10, K, T);
      }
      Gi && Le(null, rn, !0, r == null && Et.setSeries), Q.live && (ft.fill(u), de = !0);
    } else {
      let y, x, A;
      o == 1 && (y = S.ori == 0 ? bt : $t, x = Re(y, D), u = O.idx = Ce(x, e[0], Ot, Nt), A = z(e[0][u], S, m, 0));
      let P = -10, C = -10, W = 0, at = 0, rt = !0, X = "", I = "";
      for (let N = o == 2 ? 1 : 0; N < w.length; N++) {
        let vt = w[N], kt = ft[N], Ft = kt == null ? null : o == 1 ? e[N][kt] : e[N][1][kt], dt = O.dataIdx(n, N, u, x), At = dt == null ? null : o == 1 ? e[N][dt] : e[N][1][dt];
        if (de = de || At != Ft || dt != kt, ft[N] = dt, N > 0 && vt.show) {
          let re = dt == null ? -10 : dt == u ? A : z(o == 1 ? e[0][dt] : e[N][0][dt], S, m, 0), Yt = At == null ? -10 : j(At, o == 1 ? $[vt.scale] : $[vt.facets[1].scale], v, 0);
          if (Gi && At != null) {
            let ge = S.ori == 1 ? bt : $t, Ae = Dt(He.dist(n, N, dt, Yt, ge));
            if (Ae < Je) {
              let Fe = He.bias;
              if (Fe != 0) {
                let se = Re(ge, vt.scale), me = At >= 0 ? 1 : -1, Ee = se >= 0 ? 1 : -1;
                Ee == me && (Ee == 1 ? Fe == 1 ? At >= se : At <= se : (
                  // >= 0
                  Fe == 1 ? At <= se : At >= se
                )) && (Je = Ae, ci = N);
              } else
                Je = Ae, ci = N;
            }
          }
          if (de || Yi) {
            let ge, Ae;
            S.ori == 0 ? (ge = re, Ae = Yt) : (ge = Yt, Ae = re);
            let Fe, se, me, Ee, Ue, Kt, le = !0, Ti = Vt.bbox;
            if (Ti != null) {
              le = !1;
              let qt = Ti(n, N);
              me = qt.left, Ee = qt.top, Fe = qt.width, se = qt.height;
            } else
              me = ge, Ee = Ae, Fe = se = Vt.size(n, N);
            if (Kt = Vt.fill(n, N), Ue = Vt.stroke(n, N), Yi)
              N == ci && Je <= He.prox && (P = me, C = Ee, W = Fe, at = se, rt = le, X = Kt, I = Ue);
            else {
              let qt = pe[N];
              qt != null && (Ki[N] = me, qi[N] = Ee, Ks(qt, Fe, se, le), Gs(qt, Kt, Ue), Ie(qt, ve(me), ve(Ee), K, T));
            }
          }
        }
      }
      if (Yi) {
        let N = He.prox, vt = Ei == null ? Je <= N : Je > N || ci != Ei;
        if (de || vt) {
          let kt = pe[0];
          kt != null && (Ki[0] = P, qi[0] = C, Ks(kt, W, at, rt), Gs(kt, X, I), Ie(kt, ve(P), ve(C), K, T));
        }
      }
    }
    if (_t.show && li)
      if (r != null) {
        let [y, x] = Et.scales, [A, P] = Et.match, [C, W] = r.cursor.sync.scales, at = r.cursor.drag;
        if (Ht = at._x, Lt = at._y, Ht || Lt) {
          let { left: rt, top: X, width: I, height: N } = r.select, vt = r.scales[C].ori, kt = r.posToVal, Ft, dt, At, re, Yt, ge = y != null && A(y, C), Ae = x != null && P(x, W);
          ge && Ht ? (vt == 0 ? (Ft = rt, dt = I) : (Ft = X, dt = N), At = $[y], re = z(kt(Ft, C), At, m, 0), Yt = z(kt(Ft + dt, C), At, m, 0), Tn(Me(re, Yt), Dt(Yt - re))) : Tn(0, m), Ae && Lt ? (vt == 1 ? (Ft = rt, dt = I) : (Ft = X, dt = N), At = $[x], re = j(kt(Ft, W), At, v, 0), Yt = j(kt(Ft + dt, W), At, v, 0), Cn(Me(re, Yt), Dt(Yt - re))) : Cn(0, v);
        } else
          Jo();
      } else {
        let y = Dt(cs - ls), x = Dt(us - as);
        if (S.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        Ht = Bt.x && y >= Bt.dist, Lt = Bt.y && x >= Bt.dist;
        let A = Bt.uni;
        A != null ? Ht && Lt && (Ht = y >= A, Lt = x >= A, !Ht && !Lt && (x > y ? Lt = !0 : Ht = !0)) : Bt.x && Bt.y && (Ht || Lt) && (Ht = Lt = !0);
        let P, C;
        Ht && (S.ori == 0 ? (P = en, C = bt) : (P = nn, C = $t), Tn(Me(P, C), Dt(C - P)), Lt || Cn(0, v)), Lt && (S.ori == 1 ? (P = en, C = bt) : (P = nn, C = $t), Cn(Me(P, C), Dt(C - P)), Ht || Tn(0, m)), !Ht && !Lt && (Tn(0, 0), Cn(0, 0));
      }
    if (Bt._x = Ht, Bt._y = Lt, r == null) {
      if (c) {
        if ($s != null) {
          let [y, x] = Et.scales;
          Et.values[0] = y != null ? Re(S.ori == 0 ? bt : $t, y) : null, Et.values[1] = x != null ? Re(S.ori == 1 ? bt : $t, x) : null;
        }
        Dn(nr, n, bt, $t, K, T, u);
      }
      if (Gi) {
        let y = c && Et.setSeries, x = He.prox;
        Ei == null ? Je <= x && Le(ci, rn, !0, y) : Je > x ? Le(null, rn, !0, y) : ci != Ei && Le(ci, rn, !0, y);
      }
    }
    de && (Q.idx = u, Ko()), a !== !1 && Rt("setCursor");
  }
  let ui = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ui == null && Mn(!1), ui;
    }
  });
  function Mn(r = !1) {
    r ? ui = null : (ui = E.getBoundingClientRect(), Rt("syncRect", ui));
  }
  function ds(r, a, c, u, d, m, v) {
    O._lock || li && r != null && r.movementX == 0 && r.movementY == 0 || (qo(r, a, c, u, d, m, v, !1, r != null), r != null ? Pi(null, !0, !0) : Pi(a, !0, !1));
  }
  function qo(r, a, c, u, d, m, v, y, x) {
    if (ui == null && Mn(!1), ki(r), r != null)
      c = r.clientX - ui.left, u = r.clientY - ui.top;
    else {
      if (c < 0 || u < 0) {
        bt = -10, $t = -10;
        return;
      }
      let [A, P] = Et.scales, C = a.cursor.sync, [W, at] = C.values, [rt, X] = C.scales, [I, N] = Et.match, vt = a.axes[0].side % 2 == 1, kt = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, dt = vt ? m : d, At = vt ? d : m, re = vt ? u : c, Yt = vt ? c : u;
      if (rt != null ? c = I(A, rt) ? h(W, $[A], kt, 0) : -10 : c = kt * (re / dt), X != null ? u = N(P, X) ? h(at, $[P], Ft, 0) : -10 : u = Ft * (Yt / At), S.ori == 1) {
        let ge = c;
        c = u, u = ge;
      }
    }
    x && (a == null || a.cursor.event.type == nr) && ((c <= 1 || c >= K - 1) && (c = Mi(c, K)), (u <= 1 || u >= T - 1) && (u = Mi(u, T))), y ? (ls = c, as = u, [en, nn] = O.move(n, c, u)) : (bt = c, $t = u);
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
    li = !0, Ht = Lt = Bt._x = Bt._y = !1, qo(r, a, c, u, d, m, v, !0, !1), r != null && (Gt(or, gr, vs, !1), Dn(Fs, n, en, nn, K, T, null));
    let { left: y, top: x, width: A, height: P } = _t;
    ps = y, gs = x, ms = A, bs = P;
  }
  function vs(r, a, c, u, d, m, v) {
    li = Bt._x = Bt._y = !1, qo(r, a, c, u, d, m, v, !1, !0);
    let { left: y, top: x, width: A, height: P } = _t, C = A > 0 || P > 0, W = ps != y || gs != x || ms != A || bs != P;
    if (C && W && oo(_t), Bt.setScale && C && W) {
      let at = y, rt = A, X = x, I = P;
      if (S.ori == 1 && (at = x, rt = P, X = y, I = A), Ht && ai(
        D,
        Re(at, D),
        Re(at + rt, D)
      ), Lt)
        for (let N in $) {
          let vt = $[N];
          N != D && vt.from == null && vt.min != pt && ai(
            N,
            Re(X + I, N),
            Re(X, N)
          );
        }
      Jo();
    } else O.lock && (O._lock = !O._lock, Pi(a, !0, r != null));
    r != null && (Vi(or, gr), Dn(or, n, bt, $t, K, T, null));
  }
  function Ja(r, a, c, u, d, m, v) {
    if (O._lock)
      return;
    ki(r);
    let y = li;
    if (li) {
      let x = !0, A = !0, P = 10, C, W;
      S.ori == 0 ? (C = Ht, W = Lt) : (C = Lt, W = Ht), C && W && (x = bt <= P || bt >= K - P, A = $t <= P || $t >= T - P), C && x && (bt = bt < en ? 0 : K), W && A && ($t = $t < nn ? 0 : T), Pi(null, !0, !0), li = !1;
    }
    bt = -10, $t = -10, ft.fill(null), Pi(null, !0, !0), y && (li = y);
  }
  function ys(r, a, c, u, d, m, v) {
    O._lock || (ki(r), zo(), Jo(), r != null && Dn(Bs, n, bt, $t, K, T, null));
  }
  function ws() {
    F.forEach(Wh), Do(n.width, n.height, !0);
  }
  Ni(bo, hn, ws);
  const sn = {};
  sn.mousedown = _s, sn.mousemove = ds, sn.mouseup = vs, sn.dblclick = ys, sn.setSeries = (r, a, c, u) => {
    let d = Et.match[2];
    c = d(n, a, c), c != -1 && Le(c, u, !0, !1);
  }, Wt && (Gt(Fs, E, _s), Gt(nr, E, ds), Gt(Us, E, (r) => {
    ki(r), Mn(!1);
  }), Gt(Is, E, Ja), Gt(Bs, E, ys), $r.add(n), n.syncRect = Mn);
  const ro = n.hooks = t.hooks || {};
  function Rt(r, a, c) {
    jo ? Pn.push([r, a, c]) : r in ro && ro[r].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (t.plugins || []).forEach((r) => {
    for (let a in r.hooks)
      ro[a] = (ro[a] || []).concat(r.hooks[a]);
  });
  const xs = (r, a, c) => c, Et = Pt({
    key: null,
    setSeries: !1,
    filters: {
      pub: Xs,
      sub: Xs
    },
    scales: [D, w[1] ? w[1].scale : null],
    match: [tl, tl, xs],
    values: [null, null]
  }, O.sync);
  Et.match.length == 2 && Et.match.push(xs), O.sync = Et;
  const $s = Et.key, Qo = fa($s);
  function Dn(r, a, c, u, d, m, v) {
    Et.filters.pub(r, a, c, u, d, m, v) && Qo.pub(r, a, c, u, d, m, v);
  }
  Qo.sub(n);
  function Qa(r, a, c, u, d, m, v) {
    Et.filters.sub(r, a, c, u, d, m, v) && sn[r](null, a, c, u, d, m, v);
  }
  n.pub = Qa;
  function Xa() {
    Qo.unsub(n), $r.delete(n), yi.clear(), _r(bo, hn, ws), p.remove(), ut?.remove(), Rt("destroy");
  }
  n.destroy = Xa;
  function Xo() {
    Rt("init", t, e), Xr(e || t.data, !1), R[D] ? Wo(D, R[D]) : zo(), Qn = _t.show && (_t.width > 0 || _t.height > 0), Si = de = !0, Do(t.width, t.height);
  }
  return w.forEach(Jr), F.forEach(Ma), i ? i instanceof HTMLElement ? (i.appendChild(p), Xo()) : i(n, Xo) : Xo(), n;
}
jt.assign = Pt;
jt.fmtNum = Rr;
jt.rangeNum = _o;
jt.rangeLog = $o;
jt.rangeAsinh = Hr;
jt.orient = Ui;
jt.pxRatio = ct;
jt.join = Hu;
jt.fmtDate = Ur, jt.tzDate = Yu;
jt.sync = fa;
{
  jt.addGap = Th, jt.clipGaps = Ao;
  let t = jt.paths = {
    points: _a
  };
  t.linear = ya, t.stepped = Dh, t.bars = zh, t.spline = Nh;
}
const Gh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Yh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, Ye = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Kh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Yh(e, i, o), o;
};
const qh = 24;
let we = class extends Ut {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._hasFetched = !1, this._intervals = [];
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._destroyPlot();
  }
  updated(t) {
    if (!this._hasFetched) {
      this._hasFetched = !0, this._fetch();
      return;
    }
    (t.has("roomEntity") || t.has("lowEntity") || t.has("highEntity") || t.has("actionEntity")) && this._fetch();
  }
  async _fetch() {
    if (!this.hass || !this.roomEntity) return;
    this._loading = !0, this._error = null, this._empty = !1;
    const t = /* @__PURE__ */ new Date(), e = new Date(t.getTime() - qh * 60 * 60 * 1e3), i = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (n) => !!n
    );
    try {
      const n = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: e.toISOString(),
        end_time: t.toISOString(),
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
  _numericSeries(t) {
    if (!t) return [];
    const e = [];
    for (const i of t) {
      const n = parseFloat(i.s);
      Number.isFinite(n) && e.push([i.lu, n]);
    }
    return e.sort((i, n) => i[0] - n[0]), e;
  }
  /** Build aligned uPlot data: a single sorted x axis and forward-filled
   *  values for each numeric series. */
  _alignSeries(t, e) {
    const i = /* @__PURE__ */ new Set();
    for (const s of t) for (const [l] of s) i.add(l);
    if (i.size === 0) return [[e], ...t.map(() => [null])];
    const n = [...i].sort((s, l) => s - l), o = t.map((s) => {
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
  _actionIntervals(t, e) {
    if (!t) return [];
    const i = [...t].sort((o, s) => o.lu - s.lu), n = [];
    for (let o = 0; o < i.length; o++) {
      const s = i[o].lu, l = i[o + 1]?.lu ?? e, h = i[o].s;
      (h === "heating" || h === "cooling") && n.push({ start: s, end: l, action: h });
    }
    return n;
  }
  _renderPlot(t) {
    if (!this._host) return;
    const e = Math.floor(Date.now() / 1e3), i = this._numericSeries(t[this.roomEntity]), n = this._numericSeries(t[this.lowEntity]), o = this._numericSeries(t[this.highEntity]);
    if (this._intervals = this._actionIntervals(t[this.actionEntity], e), i.length === 0 && n.length === 0 && o.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([i, n, o], e), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new jt(l, s, this._host), this._observeResize());
  }
  _buildOpts(t) {
    const e = getComputedStyle(this), i = e.getPropertyValue("--cb-action-heating").trim() || "#d9603f", n = e.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", o = e.getPropertyValue("--primary-color").trim() || "#03a9f4";
    return {
      width: t,
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
    !this._host || this._resizeObserver || (this._resizeObserver = new ResizeObserver((t) => {
      const e = t[0]?.contentRect.width ?? 0;
      this._plot && e > 0 && this._plot.setSize({ width: e, height: 260 });
    }), this._resizeObserver.observe(this._host));
  }
  _destroyPlot() {
    this._plot && (this._plot.destroy(), this._plot = null), this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null);
  }
  render() {
    return !this.hass || !this.roomEntity ? M`<div class="status">No room temperature sensor for this zone.</div>` : M`
      ${this._loading ? M`<div class="status">Loading 24 h history…</div>` : it}
      ${this._error ? M`<div class="status">${this._error}</div>` : it}
      ${this._empty ? M`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : it}
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
we.styles = [
  ie,
  Pl(Gh),
  Jt`
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
Ye([
  V({ attribute: !1 })
], we.prototype, "hass", 2);
Ye([
  V({ type: String })
], we.prototype, "roomEntity", 2);
Ye([
  V({ type: String })
], we.prototype, "lowEntity", 2);
Ye([
  V({ type: String })
], we.prototype, "highEntity", 2);
Ye([
  V({ type: String })
], we.prototype, "actionEntity", 2);
Ye([
  lt()
], we.prototype, "_loading", 2);
Ye([
  lt()
], we.prototype, "_error", 2);
Ye([
  lt()
], we.prototype, "_empty", 2);
Ye([
  vn(".chart-host")
], we.prototype, "_host", 2);
we = Ye([
  ee("comfort-band-history-chart")
], we);
function xl(t, e) {
  const i = t.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), f = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${f}, ${e})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${e})` : i;
}
var Zh = Object.defineProperty, Jh = Object.getOwnPropertyDescriptor, Yr = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Jh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Zh(e, i, o), o;
};
let Gn = class extends Ut {
  render() {
    const t = this.entities?.roomTemperature;
    return t ? M`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${t}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${it}
    ` : M`<div class="empty">No room temperature sensor for this zone.</div>`;
  }
};
Gn.styles = [
  ie,
  Jt`
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
  ee("comfort-band-insights-tab")
], Gn);
var Qh = Object.defineProperty, Xh = Object.getOwnPropertyDescriptor, Sn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Xh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Qh(e, i, o), o;
};
const Xe = 15, Ve = 0.5, Qe = 14, Be = 28, $l = 4, tf = 500, an = 600, co = 200, Sl = 0, kr = 24 * 60 - Xe, cr = [0, 6, 12, 18, 24], kl = [14, 18, 22, 26];
function Te(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t);
  return e ? parseInt(e[1], 10) * 60 + parseInt(e[2], 10) : 0;
}
function ur(t) {
  const e = Math.max(0, Math.min(kr, t)), i = Math.floor(e / 60), n = e % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function ef(t) {
  return Math.round(t / Xe) * Xe;
}
function hr(t) {
  return Math.round(t / Ve) * Ve;
}
function be(t, e, i) {
  return Math.min(i, Math.max(e, t));
}
let mi = class extends Ut {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (t, e, i) => {
      t.stopPropagation(), t.preventDefault(), t.currentTarget.setPointerCapture(t.pointerId);
      const o = {
        kind: "handle",
        handle: i,
        origin: { ...e },
        startX: t.clientX,
        startY: t.clientY,
        moved: !1,
        longPressTimer: null,
        longPressed: !1,
        range: this._timeRangeFor(e.at)
      };
      o.longPressTimer = window.setTimeout(() => {
        o.longPressTimer = null, this._drag === o && !o.moved && (o.longPressed = !0, this._fire("transition-delete", { at: o.origin.at }));
      }, tf), this._drag = o;
    }, this._onHandlePointerMove = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "handle" || e.longPressed) return;
      const i = t.clientX - e.startX, n = t.clientY - e.startY;
      if (!e.moved && Math.hypot(i, n) < $l) return;
      e.moved || (e.moved = !0, e.longPressTimer !== null && (window.clearTimeout(e.longPressTimer), e.longPressTimer = null));
      const o = this._svg();
      if (!o) {
        this._preview = { at: e.origin.at, low: e.origin.low, high: e.origin.high };
        return;
      }
      const s = o.getBoundingClientRect(), l = be(
        this._clientToMinutes(t.clientX, s),
        e.range.min,
        e.range.max
      ), h = this._clientToTemp(t.clientY, s);
      let f = e.origin.low, p = e.origin.high;
      e.handle === "low" ? f = be(h, Qe, p - Ve) : p = be(h, f + Ve, Be), this._preview = { at: ur(l), low: f, high: p };
    }, this._onHandlePointerUp = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "handle") return;
      const i = t.currentTarget;
      try {
        i.releasePointerCapture(t.pointerId);
      } catch {
      }
      e.longPressTimer !== null && (window.clearTimeout(e.longPressTimer), e.longPressTimer = null);
      const n = this._preview;
      if (this._drag = null, this._preview = null, !e.longPressed) {
        if (!e.moved) {
          this._fire("transition-edit", { transition: e.origin });
          return;
        }
        n && (this._focusedAt === e.origin.at && (this._focusedAt = n.at), this._fire("transition-update", {
          oldAt: e.origin.at,
          transition: { at: n.at, low: n.low, high: n.high }
        }));
      }
    }, this._onHandlePointerCancel = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "handle") return;
      const i = t.currentTarget;
      try {
        i.releasePointerCapture(t.pointerId);
      } catch {
      }
      e.longPressTimer !== null && (window.clearTimeout(e.longPressTimer), e.longPressTimer = null), this._drag = null, this._preview = null;
    }, this._onBackgroundPointerDown = (t) => {
      const e = this._svg();
      if (!e) return;
      try {
        e.setPointerCapture(t.pointerId);
      } catch {
      }
      const i = {
        kind: "empty",
        startX: t.clientX,
        startY: t.clientY,
        moved: !1
      };
      this._drag = i;
    }, this._onBackgroundPointerMove = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "empty" || e.moved) return;
      const i = t.clientX - e.startX, n = t.clientY - e.startY;
      Math.hypot(i, n) >= $l && (e.moved = !0);
    }, this._onBackgroundPointerUp = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "empty")
        return;
      const i = this._svg();
      try {
        i?.releasePointerCapture(t.pointerId);
      } catch {
      }
      const n = e.moved, o = t.type === "pointercancel";
      if (this._drag = null, o || n || !i) return;
      const s = i.getBoundingClientRect(), l = be(this._clientToMinutes(t.clientX, s), Sl, kr);
      for (const b of this.transitions) if (Te(b.at) === l) return;
      const h = this._clientToTemp(t.clientY, s), f = be(hr(h - 1.5), Qe, Be - Ve), p = be(hr(h + 1.5), f + Ve, Be);
      this._fire("transition-add", { at: ur(l), low: f, high: p });
    }, this._onHandleKeyDown = (t, e, i) => {
      if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), this._fire("transition-edit", { transition: e });
        return;
      }
      if (t.key === "Delete" || t.key === "Backspace") {
        t.preventDefault(), this._fire("transition-delete", { at: e.at });
        return;
      }
      let n = 0, o = 0;
      switch (t.key) {
        case "ArrowLeft":
          n = -Xe;
          break;
        case "ArrowRight":
          n = Xe;
          break;
        case "ArrowUp":
          o = Ve;
          break;
        case "ArrowDown":
          o = -Ve;
          break;
        default:
          return;
      }
      t.preventDefault();
      const s = this._timeRangeFor(e.at), l = be(Te(e.at) + n, s.min, s.max);
      let h = e.low, f = e.high;
      if (i === "low" ? h = be(e.low + o, Qe, f - Ve) : f = be(e.high + o, h + Ve, Be), l === Te(e.at) && h === e.low && f === e.high)
        return;
      const p = ur(l);
      this._focusedAt === e.at && (this._focusedAt = p), this._fire("transition-update", {
        oldAt: e.at,
        transition: { at: p, low: h, high: f }
      });
    }, this._onHandleFocus = (t, e) => {
      this._focusedAt = t.at, this._focusedHandle = e;
    }, this._onHandleBlur = () => {
      this._focusedAt = null, this._focusedHandle = null;
    };
  }
  disconnectedCallback() {
    this._drag && this._drag.kind === "handle" && this._drag.longPressTimer !== null && window.clearTimeout(this._drag.longPressTimer), this._drag = null, this._preview = null, super.disconnectedCallback();
  }
  _timeToX(t) {
    return t / (24 * 60) * an;
  }
  _tempToY(t) {
    const e = be(t, Qe, Be);
    return co - (e - Qe) / (Be - Qe) * co;
  }
  _clientToMinutes(t, e) {
    if (e.width === 0) return 0;
    const i = be((t - e.left) / e.width, 0, 1);
    return ef(i * 24 * 60);
  }
  _clientToTemp(t, e) {
    if (e.height === 0) return Qe;
    const i = be((t - e.top) / e.height, 0, 1), n = Be - i * (Be - Qe);
    return hr(n);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((t) => Te(t.at)).sort((t, e) => t - e);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(t) {
    const e = Te(t), i = this._sortedAts().filter((s) => s !== e);
    let n = Sl, o = kr;
    for (const s of i)
      s < e && s + Xe > n && (n = s + Xe), s > e && s - Xe < o && (o = s - Xe);
    return { min: n, max: o };
  }
  _fire(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const t = [...this.transitions].sort((i, n) => Te(i.at) - Te(n.at));
    if (!this._preview || !this._drag || this._drag.kind !== "handle") return t;
    const e = this._drag;
    return t.map(
      (i) => i.at === e.origin.at ? { at: this._preview.at, low: this._preview.low, high: this._preview.high } : i
    );
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is already sorted by `at` ascending — every
   *  caller goes through `_renderedTransitions()` which sorts. */
  _stepPoints(t, e) {
    const i = t[t.length - 1][e], n = [[0, this._tempToY(i)]];
    let o = i;
    for (const s of t) {
      const l = this._timeToX(Te(s.at));
      n.push([l, this._tempToY(o)]), n.push([l, this._tempToY(s[e])]), o = s[e];
    }
    return n.push([an, this._tempToY(o)]), n;
  }
  _pointsToPath(t) {
    return t.map(([e, i], n) => `${n === 0 ? "M" : "L"} ${e} ${i}`).join(" ");
  }
  _fillFromPoints(t, e) {
    const i = this._pointsToPath(t), n = e.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const t = this._renderedTransitions(), e = t.length > 0, i = e ? this._stepPoints(t, "low") : [], n = e ? this._stepPoints(t, "high") : [], o = e ? this._pointsToPath(i) : "", s = e ? this._pointsToPath(n) : "", l = e ? this._fillFromPoints(n, i) : "";
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
          ${t.length > 0 ? di`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${t.map((h) => {
      const f = this._timeToX(Te(h.at)), p = this._tempToY(h.low), b = this._tempToY(h.high), g = this._focusedAt === h.at && this._focusedHandle === "low", _ = this._focusedAt === h.at && this._focusedHandle === "high", k = this._drag?.kind === "handle" && this._drag.origin.at === h.at ? this._drag.handle : null, E = `Low handle at ${h.at}, ${h.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, H = `High handle at ${h.at}, ${h.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, U = `handle low${g ? " focused" : ""}${k === "low" ? " dragging" : ""}`, B = `handle high${_ ? " focused" : ""}${k === "high" ? " dragging" : ""}`;
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
              style="top: ${(Be - h) / (Be - Qe) * 100}%"
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
  ie,
  Jt`
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
  lt()
], mi.prototype, "_drag", 2);
Sn([
  lt()
], mi.prototype, "_preview", 2);
Sn([
  lt()
], mi.prototype, "_focusedAt", 2);
Sn([
  lt()
], mi.prototype, "_focusedHandle", 2);
mi = Sn([
  ee("comfort-band-schedule-chart")
], mi);
var nf = Object.defineProperty, of = Object.getOwnPropertyDescriptor, _i = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? of(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && nf(e, i, o), o;
};
let je = class extends Ut {
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
  willUpdate(t) {
    t.has("transition") && this.transition && (this._at = this.transition.at, this._low = this.transition.low, this._high = this.transition.high, this._error = null);
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
          @input=${(t) => this._at = t.target.value}
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
          @input=${(t) => this._low = parseFloat(t.target.value)}
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
          @input=${(t) => this._high = parseFloat(t.target.value)}
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
je.styles = [
  ie,
  Jt`
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
], je.prototype, "transition", 2);
_i([
  V({ type: Boolean })
], je.prototype, "isNew", 2);
_i([
  lt()
], je.prototype, "_at", 2);
_i([
  lt()
], je.prototype, "_low", 2);
_i([
  lt()
], je.prototype, "_high", 2);
_i([
  lt()
], je.prototype, "_error", 2);
_i([
  vn('input[name="at"]')
], je.prototype, "_atInput", 2);
je = _i([
  ee("transition-edit-dialog")
], je);
var rf = Object.defineProperty, sf = Object.getOwnPropertyDescriptor, Ke = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? sf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && rf(e, i, o), o;
};
function fr(t, e) {
  return Te(t.at) - Te(e.at);
}
let xe = class extends Ut {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._subscribeGen = 0, this._onAdd = (t) => {
      this._newAt = t.detail.at, this._newLow = t.detail.low, this._newHigh = t.detail.high, this._editing = null, this._mode = "add";
    }, this._onEdit = (t) => {
      this._editing = t.detail.transition, this._mode = "edit";
    }, this._onDelete = async (t) => {
      if (!this.hass) return;
      const e = this._transitions.filter((i) => i.at !== t.detail.at);
      await this._writeSchedule(e);
    }, this._onUpdate = async (t) => {
      if (!this.hass) return;
      const { oldAt: e, transition: i } = t.detail, n = this._transitions.filter((o) => o.at !== e && o.at !== i.at).concat(i).sort(fr);
      await this._writeSchedule(n);
    }, this._onDialogSave = async (t) => {
      const e = t.detail.transition, i = [];
      if (this._mode === "edit" && this._editing) {
        const n = this._editing.at;
        for (const o of this._transitions)
          o.at !== n && o.at !== e.at && i.push(o);
        i.push(e);
      } else {
        for (const n of this._transitions)
          n.at !== e.at && i.push(n);
        i.push(e);
      }
      i.sort(fr), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (t) => {
      const e = this._transitions.filter((i) => i.at !== t.detail.at);
      await this._writeSchedule(e), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._profile === "" && (this._profile = Al(this.hass) ?? "home", this._subscribe());
  }
  updated(t) {
    if (t.has("hass") && this.hass) {
      const e = Al(this.hass);
      e && e !== this._profile && (this._profile = e, this._resubscribe());
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
    const t = ++this._subscribeGen;
    this._transitions.length === 0 && (this._loading = !0), this._error = null;
    try {
      const e = await Mc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          t === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(fr) : [], this._loading = !1);
        }
      );
      if (t !== this._subscribeGen) {
        e();
        return;
      }
      this._unsub = e;
    } catch (e) {
      if (t !== this._subscribeGen) return;
      this._error = e instanceof Error ? e.message : "Failed to subscribe.", this._loading = !1;
    }
  }
  _unsubscribe() {
    this._subscribeGen++, this._unsub?.(), this._unsub = void 0;
  }
  _resubscribe() {
    return this._unsubscribe(), this._subscribe();
  }
  async _writeSchedule(t) {
    if (!this.hass) return;
    const e = this._transitions;
    this._transitions = t;
    try {
      await Dc(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: t
      });
    } catch (i) {
      this._transitions = e, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return it;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? lf(this._transitions),
        high: this._newHigh ?? af(this._transitions)
      };
      return M`
        <transition-edit-dialog
          .transition=${t}
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
    return this._transitions.length === 0 ? it : M`
      <ul class="list">
        ${this._transitions.map((t) => {
      const e = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: t } }));
      return M`
            <li
              role="button"
              tabindex="0"
              aria-label="Edit transition at ${t.at}, ${t.low.toFixed(1)} to ${t.high.toFixed(
        1
      )} degrees"
              @click=${e}
              @keydown=${(i) => {
        (i.key === "Enter" || i.key === " ") && (i.preventDefault(), e());
      }}
            >
              <span class="at">${t.at}</span>
              <span>${t.low.toFixed(1)}° – ${t.high.toFixed(1)}°</span>
            </li>
          `;
    })}
      </ul>
    `;
  }
};
xe.styles = [
  ie,
  Jt`
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
Ke([
  V({ attribute: !1 })
], xe.prototype, "hass", 2);
Ke([
  V({ type: String })
], xe.prototype, "zone", 2);
Ke([
  lt()
], xe.prototype, "_profile", 2);
Ke([
  lt()
], xe.prototype, "_transitions", 2);
Ke([
  lt()
], xe.prototype, "_loading", 2);
Ke([
  lt()
], xe.prototype, "_error", 2);
Ke([
  lt()
], xe.prototype, "_mode", 2);
Ke([
  lt()
], xe.prototype, "_editing", 2);
Ke([
  lt()
], xe.prototype, "_newAt", 2);
xe = Ke([
  ee("comfort-band-schedule-tab")
], xe);
function Al(t) {
  const e = Ll(t);
  return e ? t.states[e]?.state ?? null : null;
}
function lf(t) {
  return t.length === 0 ? 19 : t[t.length - 1].low;
}
function af(t) {
  return t.length === 0 ? 22 : t[t.length - 1].high;
}
var cf = Object.defineProperty, uf = Object.getOwnPropertyDescriptor, vi = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? uf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && cf(e, i, o), o;
};
const hf = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "insights", label: "Insights" }
];
let We = class extends Ut {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (t) => {
      this._activeTab = t;
    };
  }
  open() {
    this._isOpen = !0, this.updateComplete.then(() => this._dialog?.showModal());
  }
  close() {
    this._dialog?.close();
  }
  selectTab(t) {
    this._activeTab = t;
  }
  render() {
    if (!this._isOpen) return it;
    const t = this.zoneName || this.zone || "Comfort Band";
    return M`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${t}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${hf.map(
      (e) => M`
                <button
                  role="tab"
                  aria-selected=${this._activeTab === e.id}
                  @click=${() => this._onSelectTab(e.id)}
                >
                  ${e.label}
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
We.styles = [
  ie,
  Jt`
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
], We.prototype, "hass", 2);
vi([
  V({ type: String })
], We.prototype, "zone", 2);
vi([
  V({ type: String })
], We.prototype, "zoneName", 2);
vi([
  V({ attribute: !1 })
], We.prototype, "entities", 2);
vi([
  lt()
], We.prototype, "_activeTab", 2);
vi([
  lt()
], We.prototype, "_isOpen", 2);
vi([
  vn("dialog")
], We.prototype, "_dialog", 2);
We = vi([
  ee("comfort-band-modal")
], We);
var ff = Object.defineProperty, df = Object.getOwnPropertyDescriptor, Kr = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? df(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && ff(e, i, o), o;
};
let Yn = class extends Ut {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (t) => {
      const e = t.target.value;
      this._fireConfig({ ...this.config, zone: e });
    }, this._onCompactChange = (t) => {
      const e = t.target.checked, i = { ...this.config };
      e ? i.compact = !0 : delete i.compact, this._fireConfig(i);
    }, this._onVariantChange = (t) => {
      const e = t.target.value, i = { ...this.config };
      e === "mini" ? i.variant = "mini" : delete i.variant, this._fireConfig(i);
    };
  }
  setConfig(t) {
    this.config = {
      type: t.type ?? "custom:comfort-band-card",
      zone: t.zone ?? "",
      ...t.compact !== void 0 ? { compact: t.compact } : {},
      ...t.variant !== void 0 ? { variant: t.variant } : {}
    };
  }
  _availableZones() {
    if (!this.hass) return [];
    const t = [];
    for (const e of Object.values(this.hass.devices))
      for (const [i, n] of e.identifiers)
        i === "comfort_band" && n.startsWith("zone:") && t.push(n.slice(5));
    return t.sort();
  }
  _fireConfig(t) {
    this.config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    const t = this._availableZones();
    if (t.length === 0)
      return M`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const e = this.config.variant === "mini" ? "mini" : "tile";
    return M`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? M`<option value="" disabled selected>Select a zone…</option>` : null}
          ${t.map(
      (i) => M` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
    )}
        </select>
      </label>
      <label>
        Variant
        <select @change=${this._onVariantChange} .value=${e}>
          <option value="tile" ?selected=${e === "tile"}>Tile (default)</option>
          <option value="mini" ?selected=${e === "mini"}>
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
  ie,
  Jt`
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
  ee("comfort-band-card-editor")
], Yn);
var pf = Object.defineProperty, gf = Object.getOwnPropertyDescriptor, Co = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && pf(e, i, o), o;
};
let _n = class extends Ut {
  constructor() {
    super(...arguments), this._onTileTap = () => {
      this._modal?.open();
    };
  }
  setConfig(t) {
    if (!t?.zone)
      throw new Error("comfort-band-card: `zone` is required");
    this._config = t;
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
  static getStubConfig(t) {
    let e = "";
    if (t)
      for (const i of Object.values(t.devices)) {
        for (const [n, o] of i.identifiers)
          if (n === "comfort_band" && o.startsWith("zone:")) {
            e = o.slice(5);
            break;
          }
        if (e) break;
      }
    return { type: "custom:comfort-band-card", zone: e };
  }
  render() {
    if (!this._config || !this.hass) return M``;
    const t = this._config.zone, e = Kc(this.hass, t);
    if (e.deviceId === null)
      return M`<div class="placeholder">
        Comfort Band zone <code>${t}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, e);
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
            zone=${t}
            zoneName=${o.zoneName}
            .entities=${e}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(t, e) {
    const i = (o) => o !== null ? t.states[o] : void 0, n = (o) => {
      const s = i(o);
      if (!s) return NaN;
      const l = parseFloat(s.state);
      return Number.isFinite(l) ? l : NaN;
    };
    return {
      zoneName: e.deviceName ?? this._config.zone,
      low: n(e.effectiveLow),
      high: n(e.effectiveHigh),
      roomTemp: n(e.roomTemperature),
      action: i(e.currentAction)?.state ?? "unknown",
      overrideActive: i(e.overrideActive)?.state === "on",
      overrideEnds: i(e.overrideEnds)?.state ?? null
    };
  }
};
_n.styles = [
  ie,
  Jt`
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
  lt()
], _n.prototype, "_config", 2);
Co([
  vn("comfort-band-modal")
], _n.prototype, "_modal", 2);
_n = Co([
  ee("comfort-band-card")
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
