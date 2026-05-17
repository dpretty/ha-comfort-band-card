const dr = globalThis, Po = dr.ShadowRoot && (dr.ShadyCSS === void 0 || dr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, To = Symbol(), Es = /* @__PURE__ */ new WeakMap();
let Tl = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== To) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Po && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Es.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Es.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Cl = (e) => new Tl(typeof e == "string" ? e : e + "", void 0, To), We = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new Tl(i, e, To);
}, ic = (e, t) => {
  if (Po) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = dr.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ps = Po ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Cl(i);
})(e) : e;
const { is: nc, defineProperty: rc, getOwnPropertyDescriptor: oc, getOwnPropertyNames: sc, getOwnPropertySymbols: lc, getPrototypeOf: ac } = Object, wr = globalThis, Ts = wr.trustedTypes, cc = Ts ? Ts.emptyScript : "", uc = wr.reactiveElementPolyfillSupport, Un = (e, t) => e, pr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? cc : null;
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
} }, Co = (e, t) => !nc(e, t), Cs = { attribute: !0, type: String, converter: pr, reflect: !1, useDefault: !1, hasChanged: Co };
Symbol.metadata ??= Symbol("metadata"), wr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let un = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Cs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && rc(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: s } = oc(this.prototype, t) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: r, set(l) {
      const h = r?.call(this);
      s?.call(this, l), this.requestUpdate(t, h, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Cs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Un("elementProperties"))) return;
    const t = ac(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Un("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Un("properties"))) {
      const i = this.properties, n = [...sc(i), ...lc(i)];
      for (const r of n) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, r] of i) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const r = this._$Eu(i, n);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const r of n) i.unshift(Ps(r));
    } else t !== void 0 && i.push(Ps(t));
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
    return ic(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, n);
    if (r !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : pr).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : pr;
      this._$Em = r;
      const h = l.fromAttribute(i, s.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, r = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Co)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: r, wrapped: s }, l) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, l ?? i ?? this[t]), s !== !0 || l !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, s] of n) {
        const { wrapped: l } = s, h = this[r];
        l !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, s, h);
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
un.elementStyles = [], un.shadowRootOptions = { mode: "open" }, un[Un("elementProperties")] = /* @__PURE__ */ new Map(), un[Un("finalized")] = /* @__PURE__ */ new Map(), uc?.({ ReactiveElement: un }), (wr.reactiveElementVersions ??= []).push("2.1.2");
const Mo = globalThis, Ms = (e) => e, gr = Mo.trustedTypes, Ds = gr ? gr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ml = "$lit$", di = `lit$${Math.random().toFixed(9).slice(2)}$`, Dl = "?" + di, hc = `<${Dl}>`, Li = document, Vn = () => Li.createComment(""), Wn = (e) => e === null || typeof e != "object" && typeof e != "function", Do = Array.isArray, dc = (e) => Do(e) || typeof e?.[Symbol.iterator] == "function", to = `[ 	
\f\r]`, Nn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zs = /-->/g, Os = />/g, Mi = RegExp(`>|${to}(?:([^\\s"'>=/]+)(${to}*=${to}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ns = /'/g, Hs = /"/g, zl = /^(?:script|style|textarea|title)$/i, Ol = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), A = Ol(1), fi = Ol(2), fn = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), Ls = /* @__PURE__ */ new WeakMap(), Ni = Li.createTreeWalker(Li, 129);
function Nl(e, t) {
  if (!Do(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ds !== void 0 ? Ds.createHTML(t) : t;
}
const fc = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Nn;
  for (let h = 0; h < i; h++) {
    const d = e[h];
    let p, b, g = -1, _ = 0;
    for (; _ < d.length && (l.lastIndex = _, b = l.exec(d), b !== null); ) _ = l.lastIndex, l === Nn ? b[1] === "!--" ? l = zs : b[1] !== void 0 ? l = Os : b[2] !== void 0 ? (zl.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = Mi) : b[3] !== void 0 && (l = Mi) : l === Mi ? b[0] === ">" ? (l = r ?? Nn, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Mi : b[3] === '"' ? Hs : Ns) : l === Hs || l === Ns ? l = Mi : l === zs || l === Os ? l = Nn : (l = Mi, r = void 0);
    const $ = l === Mi && e[h + 1].startsWith("/>") ? " " : "";
    s += l === Nn ? d + hc : g >= 0 ? (n.push(p), d.slice(0, g) + Ml + d.slice(g) + di + $) : d + di + (g === -2 ? h : $);
  }
  return [Nl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Gn {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, d = this.parts, [p, b] = fc(t, i);
    if (this.el = Gn.createElement(p, n), Ni.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Ni.nextNode()) !== null && d.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Ml)) {
          const _ = b[l++], $ = r.getAttribute(g).split(di), E = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: s, name: E[2], strings: $, ctor: E[1] === "." ? gc : E[1] === "?" ? mc : E[1] === "@" ? bc : xr }), r.removeAttribute(g);
        } else g.startsWith(di) && (d.push({ type: 6, index: s }), r.removeAttribute(g));
        if (zl.test(r.tagName)) {
          const g = r.textContent.split(di), _ = g.length - 1;
          if (_ > 0) {
            r.textContent = gr ? gr.emptyScript : "";
            for (let $ = 0; $ < _; $++) r.append(g[$], Vn()), Ni.nextNode(), d.push({ type: 2, index: ++s });
            r.append(g[_], Vn());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Dl) d.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(di, g + 1)) !== -1; ) d.push({ type: 7, index: s }), g += di.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Li.createElement("template");
    return n.innerHTML = t, n;
  }
}
function pn(e, t, i = e, n) {
  if (t === fn) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Wn(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = pn(e, r._$AS(e, t.values), r, n)), t;
}
class pc {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? Li).importNode(i, !0);
    Ni.currentNode = r;
    let s = Ni.nextNode(), l = 0, h = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let p;
        d.type === 2 ? p = new Zn(s, s.nextSibling, this, t) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (p = new _c(s, this, t)), this._$AV.push(p), d = n[++h];
      }
      l !== d?.index && (s = Ni.nextNode(), l++);
    }
    return Ni.currentNode = Li, r;
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
  constructor(t, i, n, r) {
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = pn(this, t, i), Wn(t) ? t === G || t == null || t === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : t !== this._$AH && t !== fn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : dc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== G && Wn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Li.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Gn.createElement(Nl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new pc(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Ls.get(t.strings);
    return i === void 0 && Ls.set(t.strings, i = new Gn(t)), i;
  }
  k(t) {
    Do(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of t) r === i.length ? i.push(n = new Zn(this.O(Vn()), this.O(Vn()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ms(t).nextSibling;
      Ms(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class xr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, r, s) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = G;
  }
  _$AI(t, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = pn(this, t, i, 0), l = !Wn(t) || t !== this._$AH && t !== fn, l && (this._$AH = t);
    else {
      const h = t;
      let d, p;
      for (t = s[0], d = 0; d < s.length - 1; d++) p = pn(this, h[n + d], i, d), p === fn && (p = this._$AH[d]), l ||= !Wn(p) || p !== this._$AH[d], p === G ? t = G : t !== G && (t += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class gc extends xr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class mc extends xr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class bc extends xr {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = pn(this, t, i, 0) ?? G) === fn) return;
    const n = this._$AH, r = t === G && n !== G || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== G && (n === G || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _c {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    pn(this, t);
  }
}
const vc = Mo.litHtmlPolyfillSupport;
vc?.(Gn, Zn), (Mo.litHtmlVersions ??= []).push("3.3.2");
const yc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Zn(t.insertBefore(Vn(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const zo = globalThis;
class ze extends un {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = yc(i, this.renderRoot, this.renderOptions);
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
ze._$litElement$ = !0, ze.finalized = !0, zo.litElementHydrateSupport?.({ LitElement: ze });
const wc = zo.litElementPolyfillSupport;
wc?.({ LitElement: ze });
(zo.litElementVersions ??= []).push("4.2.2");
const Qe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const xc = { attribute: !0, type: String, converter: pr, reflect: !1, hasChanged: Co }, $c = (e = xc, t, i) => {
  const { kind: n, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
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
function U(e) {
  return (t, i) => typeof i == "object" ? $c(e, t, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
function re(e) {
  return U({ ...e, state: !0, attribute: !1 });
}
const Sc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function yn(e, t) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Sc(i, n, { get() {
      return s(this);
    } });
  };
}
const Xe = We`
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
function mr(e) {
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
function br(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
function go(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var kc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, Jn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ac(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && kc(t, i, r), r;
};
const mo = 15, Hl = 28, Ec = Hl - mo;
function io(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(mo, Math.min(Hl, e)) - mo) / Ec * 100;
}
let Ri = class extends ze {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = br(this.action), t = mr(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? io(this.low) : 0, l = n ? io(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = r ? io(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return A`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${fi`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? fi`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${r ? fi`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${r ? fi`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
Ri.styles = [
  Xe,
  We`
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
Jn([
  U({ type: Number })
], Ri.prototype, "low", 2);
Jn([
  U({ type: Number })
], Ri.prototype, "high", 2);
Jn([
  U({ type: Number })
], Ri.prototype, "room", 2);
Jn([
  U({ type: String })
], Ri.prototype, "action", 2);
Ri = Jn([
  Qe("band-gauge")
], Ri);
var Pc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, Gt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Tc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Pc(t, i, r), r;
};
let yt = class extends ze {
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
    const e = Cc(this.overrideEnds);
    return A`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = br(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = mr(e);
    return A`<span class="action-chip" style="background:${t}">
      ${go(e)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : A`
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
    const e = br(this.action), t = e === "heating" || e === "cooling", i = t ? `--cb-mini-bg:${mr(e)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${go(e)}` : ""}`;
    return A`
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
  Xe,
  We`
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
  U({ type: String })
], yt.prototype, "zoneName", 2);
Gt([
  U({ type: Number })
], yt.prototype, "roomTemp", 2);
Gt([
  U({ type: Number })
], yt.prototype, "low", 2);
Gt([
  U({ type: Number })
], yt.prototype, "high", 2);
Gt([
  U({ type: String })
], yt.prototype, "action", 2);
Gt([
  U({ type: Boolean })
], yt.prototype, "overrideActive", 2);
Gt([
  U({ type: String })
], yt.prototype, "overrideEnds", 2);
Gt([
  U({ type: Boolean })
], yt.prototype, "noExpand", 2);
Gt([
  U({ type: String, reflect: !0 })
], yt.prototype, "variant", 2);
yt = Gt([
  Qe("comfort-band-tile")
], yt);
function Cc(e) {
  if (!e) return "";
  const t = Date.parse(e);
  if (Number.isNaN(t)) return "";
  const i = t - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const r = Math.floor(n / 60), s = n % 60;
  return s ? `${r}h ${s}m left` : `${r}h left`;
}
var Mc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, ni = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Dc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Mc(t, i, r), r;
};
let Dt = class extends ze {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (e, t) => {
      e.preventDefault();
      const i = e.currentTarget;
      i.setPointerCapture(e.pointerId), this._dragging = t;
      const n = (s) => {
        this._setHandle(t, this._xToValue(s.clientX)) && this._fire("input");
      }, r = (s) => {
        i.releasePointerCapture(s.pointerId), i.removeEventListener("pointermove", n), i.removeEventListener("pointerup", r), i.removeEventListener("pointercancel", r), this._dragging = null, this._fire("change");
      };
      i.addEventListener("pointermove", n), i.addEventListener("pointerup", r), i.addEventListener("pointercancel", r);
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
    return A`
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
  Xe,
  We`
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
  U({ type: Number })
], Dt.prototype, "min", 2);
ni([
  U({ type: Number })
], Dt.prototype, "max", 2);
ni([
  U({ type: Number })
], Dt.prototype, "step", 2);
ni([
  U({ type: Number })
], Dt.prototype, "low", 2);
ni([
  U({ type: Number })
], Dt.prototype, "high", 2);
ni([
  U({ type: String })
], Dt.prototype, "unit", 2);
ni([
  re()
], Dt.prototype, "_dragging", 2);
ni([
  yn(".track")
], Dt.prototype, "_track", 2);
Dt = ni([
  Qe("dual-handle-slider")
], Dt);
const _i = "comfort_band";
function zc(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Oc(e, t) {
  return e.callService(_i, "set_schedule", { ...t });
}
function Nc(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(_i, "start_override", i);
}
function Hc(e, t) {
  return e.callService(_i, "cancel_override", { ...t });
}
function Lc(e, t) {
  return e.callService(_i, "set_profile", { ...t });
}
function Rc(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(_i, "create_profile", i);
}
function Fc(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(_i, "clone_profile", i);
}
function Bc(e, t) {
  return e.callService(_i, "rename_profile", { old: t.old, new: t.new });
}
function Uc(e, t) {
  return e.callService(_i, "delete_profile", { name: t.name });
}
var Ic = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, wn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? jc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Ic(t, i, r), r;
};
const Vc = [1, 3, 6];
let pi = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Nc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Hc(this.hass, { zone: this.zone });
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
    if (!this.hass || !this.entities) return G;
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.apparentTemperature), l = this._numericState(this.entities.overrideHours), h = this._stateOf(this.entities.currentAction)?.state ?? "unknown", d = this._stateOf(this.entities.overrideActive)?.state === "on", p = this._stateOf(this.entities.useApparentTemperature)?.state === "on", b = Number.isFinite(r) && Number.isFinite(s) && Math.abs(s - r) >= 0.1, g = this._pendingLow ?? (Number.isFinite(e) ? e : 19), _ = this._pendingHigh ?? (Number.isFinite(t) ? t : 22), $ = br(h), E = $ !== "idle" && $ !== "unknown";
    return A`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${E ? A`<span class="action-chip" style="background:${mr($)}"
              >${go($)}</span
            >` : G}
      </div>
      ${b ? A`<div class="feels-like">
            <span>Feels like ${s.toFixed(1)}°</span>
            ${p ? A`<span class="driving">Driving decisions</span>` : G}
          </div>` : p ? A`<div class="feels-like">
              <span class="muted-warn">
                Apparent temperature mode is on but no humidity reading is available — decisions are
                using the raw room temperature.
              </span>
            </div>` : G}
      <div class="gauge-row">
        <band-gauge .low=${i} .high=${n} .room=${r} .action=${h}></band-gauge>
      </div>

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${16}
          .max=${26}
          .step=${0.5}
          .low=${g}
          .high=${_}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(d)} ${this._renderHoursSection(l)}
    `;
  }
  _renderOverrideSection(e) {
    if (!e) return G;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = Wc(t ?? null);
    return A`
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
    return this.entities?.overrideHours ? A`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Vc.map(
      (t) => A`
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
    ` : G;
  }
};
pi.styles = [
  Xe,
  We`
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
      .feels-like {
        margin-top: 4px;
        margin-bottom: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
        display: flex;
        align-items: center;
        gap: var(--cb-gap-sm);
      }
      .feels-like .driving {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 1px 6px;
        border-radius: var(--cb-radius-pill);
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        color: #ffffff;
      }
      .feels-like .muted-warn {
        font-style: italic;
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
wn([
  U({ attribute: !1 })
], pi.prototype, "hass", 2);
wn([
  U({ type: String })
], pi.prototype, "zone", 2);
wn([
  U({ attribute: !1 })
], pi.prototype, "entities", 2);
wn([
  re()
], pi.prototype, "_pendingLow", 2);
wn([
  re()
], pi.prototype, "_pendingHigh", 2);
pi = wn([
  Qe("comfort-band-now-tab")
], pi);
function Wc(e) {
  if (!e) return "";
  const t = Date.parse(e);
  if (Number.isNaN(t)) return "";
  const i = t - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const r = Math.floor(n / 60), s = n % 60;
  return s ? `${r}h ${s}m left` : `${r}h left`;
}
var Gc = Object.defineProperty, Yc = Object.getOwnPropertyDescriptor, ri = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Yc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Gc(t, i, r), r;
};
let zt = class extends ze {
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
    return A`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? A`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? A`<label>
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
      ${this._error ? A`<div class="error" role="alert">${this._error}</div>` : null}
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
  Xe,
  We`
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
ri([
  U({ type: String })
], zt.prototype, "mode", 2);
ri([
  U({ type: String })
], zt.prototype, "existingName", 2);
ri([
  U({ type: Array })
], zt.prototype, "existingNames", 2);
ri([
  U({ type: Boolean })
], zt.prototype, "busy", 2);
ri([
  re()
], zt.prototype, "_name", 2);
ri([
  re()
], zt.prototype, "_description", 2);
ri([
  re()
], zt.prototype, "_error", 2);
ri([
  yn('input[name="name"]')
], zt.prototype, "_nameInput", 2);
zt = ri([
  Qe("profile-edit-dialog")
], zt);
const Oo = "comfort_band", Kc = {
  effective_low: "effectiveLow",
  effective_high: "effectiveHigh",
  room_temperature: "roomTemperature",
  apparent_temperature: "apparentTemperature",
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
  enabled: "enabled",
  learning_enabled: "learningEnabled",
  use_apparent_temperature: "useApparentTemperature"
};
function qc() {
  return {
    effectiveLow: null,
    effectiveHigh: null,
    roomTemperature: null,
    apparentTemperature: null,
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
    learningEnabled: null,
    useApparentTemperature: null,
    deviceId: null,
    deviceName: null
  };
}
function Ll(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, r] of i.identifiers)
      if (n === t[0] && r === t[1])
        return i;
  return null;
}
function Rl(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Oo
  );
}
function Zc(e, t) {
  const i = qc(), n = Ll(e, [Oo, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Rl(e, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = Kc[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function Fl(e) {
  const t = Ll(e, [Oo, "profile_manager"]);
  if (t === null) return null;
  for (const i of Rl(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
var Jc = Object.defineProperty, Qc = Object.getOwnPropertyDescriptor, Bi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Qc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Jc(t, i, r), r;
};
let ii = class extends ze {
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
      const { name: t, description: i } = e.detail, n = this._mode, r = this._target;
      this._busy = !0, this._error = null;
      try {
        if (n === "create")
          await Rc(this.hass, { name: t, description: i });
        else if (n === "clone" && r)
          await Fc(this.hass, { source: r, target: t, description: i });
        else if (n === "rename" && r)
          t !== r && await Bc(this.hass, { old: r, new: t });
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
        await Uc(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Fl(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!t) return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], r = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", d = t.attributes.descriptions, p = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [b, g] of Object.entries(d))
        typeof g == "string" && (p[b] = g);
    return { options: n, active: r, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(e) {
    this.hass && Lc(this.hass, { profile: e });
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
    const n = this.shadowRoot?.activeElement, r = n ? i.indexOf(n) : -1;
    (e.key === "ArrowDown" ? i[(r + 1) % i.length] : i[(r - 1 + i.length) % i.length]).focus();
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
    if (!this.hass) return G;
    const e = this._readState();
    if (e === null)
      return A`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: r, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return A`
        ${this._error ? A`<div class="error" role="alert">${this._error}</div>` : null}
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
      return A`
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
            ${l ? A`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? A`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? A`<div class="empty">No profiles configured.</div>` : A`
      ${this._error ? A`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? A`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : G}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, r, s)
    )}
      </ul>
      ${s ? G : A`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, r, s) {
    const l = e === i, h = e === n, d = r[e] ?? "", p = `cb-profile-menu-${t}`;
    return A`
      <li
        data-profile=${e}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : G}
        @click=${() => this._onSelect(e)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? A`<span class="description">${d}</span>` : G}
        </span>
        ${l ? A`<span class="badge">Active</span>` : G}
        ${s ? A`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? p : G}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(b) => this._toggleMenu(e, b)}
            >
              ⋮
            </button>` : G}
        ${this._openMenu === e ? A`
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
            ` : G}
      </li>
    `;
  }
};
ii.styles = [
  Xe,
  We`
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
Bi([
  U({ attribute: !1 })
], ii.prototype, "hass", 2);
Bi([
  re()
], ii.prototype, "_mode", 2);
Bi([
  re()
], ii.prototype, "_target", 2);
Bi([
  re()
], ii.prototype, "_openMenu", 2);
Bi([
  re()
], ii.prototype, "_error", 2);
Bi([
  re()
], ii.prototype, "_busy", 2);
ii = Bi([
  Qe("comfort-band-profiles-tab")
], ii);
const Xc = !0, Oe = "u-", eu = "uplot", tu = Oe + "hz", iu = Oe + "vt", nu = Oe + "title", ru = Oe + "wrap", ou = Oe + "under", su = Oe + "over", lu = Oe + "axis", Oi = Oe + "off", au = Oe + "select", cu = Oe + "cursor-x", uu = Oe + "cursor-y", hu = Oe + "cursor-pt", du = Oe + "legend", fu = Oe + "live", pu = Oe + "inline", gu = Oe + "series", mu = Oe + "marker", Rs = Oe + "label", bu = Oe + "value", Rn = "width", Fn = "height", Hn = "top", Fs = "bottom", an = "left", no = "right", No = "#000", Bs = No + "0", ro = "mousemove", Us = "mousedown", oo = "mouseup", Is = "mouseenter", js = "mouseleave", Vs = "dblclick", _u = "resize", vu = "scroll", Ws = "change", _r = "dppxchange", Ho = "--", xn = typeof window < "u", bo = xn ? document : null, dn = xn ? window : null, yu = xn ? navigator : null;
let ce, ar;
function _o() {
  let e = devicePixelRatio;
  ce != e && (ce = e, ar && yo(Ws, ar, _o), ar = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Hi(Ws, ar, _o), dn.dispatchEvent(new CustomEvent(_r)));
}
function at(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function vo(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function ye(e, t, i) {
  e.style[t] = i + "px";
}
function Pt(e, t, i, n) {
  let r = bo.createElement(e);
  return t != null && at(r, t), i?.insertBefore(r, n), r;
}
function _t(e, t) {
  return Pt("div", e, t);
}
const Gs = /* @__PURE__ */ new WeakMap();
function Ut(e, t, i, n, r) {
  let s = "translate(" + t + "px," + i + "px)", l = Gs.get(e);
  s != l && (e.style.transform = s, Gs.set(e, s), t < 0 || i < 0 || t > n || i > r ? at(e, Oi) : vo(e, Oi));
}
const Ys = /* @__PURE__ */ new WeakMap();
function Ks(e, t, i) {
  let n = t + i, r = Ys.get(e);
  n != r && (Ys.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const qs = /* @__PURE__ */ new WeakMap();
function Zs(e, t, i, n) {
  let r = t + "" + i, s = qs.get(e);
  r != s && (qs.set(e, r), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Lo = { passive: !0 }, wu = { ...Lo, capture: !0 };
function Hi(e, t, i, n) {
  t.addEventListener(e, i, n ? wu : Lo);
}
function yo(e, t, i, n) {
  t.removeEventListener(e, i, Lo);
}
xn && _o();
function Ct(e, t, i, n) {
  let r;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ct((i + n) / 2), t[r] < e ? i = r : n = r;
  return e - t[i] <= t[n] - e ? i : n;
}
function Bl(e) {
  return (i, n, r) => {
    let s = -1, l = -1;
    for (let h = n; h <= r; h++)
      if (e(i[h])) {
        s = h;
        break;
      }
    for (let h = r; h >= n; h--)
      if (e(i[h])) {
        l = h;
        break;
      }
    return [s, l];
  };
}
const Ul = (e) => e != null, Il = (e) => e != null && e > 0, $r = Bl(Ul), xu = Bl(Il);
function $u(e, t, i, n = 0, r = !1) {
  let s = r ? xu : $r, l = r ? Il : Ul;
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
function Sr(e, t, i, n) {
  let r = Xs(e), s = Xs(t);
  e == t && (r == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? ei : jl, h = r == 1 ? ct : vt, d = s == 1 ? vt : ct, p = h(l(De(e))), b = d(l(De(t))), g = gn(i, p), _ = gn(i, b);
  return i == 10 && (p < 0 && (g = ge(g, -p)), b < 0 && (_ = ge(_, -b))), n || i == 2 ? (e = g * r, t = _ * s) : (e = Yl(e, g), t = kr(t, _)), [e, t];
}
function Ro(e, t, i, n) {
  let r = Sr(e, t, i, n);
  return e == 0 && (r[0] = 0), t == 0 && (r[1] = 0), r;
}
const Fo = 0.1, Js = {
  mode: 3,
  pad: Fo
}, In = {
  pad: 0,
  soft: null,
  mode: 0
}, Su = {
  min: In,
  max: In
};
function vr(e, t, i, n) {
  return Ar(i) ? Qs(e, t, i) : (In.pad = i, In.soft = n ? 0 : null, In.mode = n ? 3 : 0, Qs(e, t, Su));
}
function le(e, t) {
  return e ?? t;
}
function ku(e, t, i) {
  for (t = le(t, 0), i = le(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Qs(e, t, i) {
  let n = i.min, r = i.max, s = le(n.pad, 0), l = le(r.pad, 0), h = le(n.hard, -pe), d = le(r.hard, pe), p = le(n.soft, pe), b = le(r.soft, -pe), g = le(n.mode, 0), _ = le(r.mode, 0), $ = t - e, E = ei($), H = Je(De(e), De(t)), B = ei(H), j = De(B - E);
  ($ < 1e-24 || j > 10) && ($ = 0, (e == 0 || t == 0) && ($ = 1e-24, g == 2 && p != pe && (s = 0), _ == 2 && b != -pe && (l = 0)));
  let w = $ || H || 1e3, F = ei(w), S = gn(10, ct(F)), J = w * ($ == 0 ? e == 0 ? 0.1 : 1 : s), D = ge(Yl(e - J, S / 10), 24), Q = e >= p && (g == 1 || g == 3 && D <= p || g == 2 && D >= p) ? p : pe, K = Je(h, D < Q && e >= Q ? Q : Mt(Q, D)), te = w * ($ == 0 ? t == 0 ? 0.1 : 1 : l), Y = ge(kr(t + te, S / 10), 24), k = t <= b && (_ == 1 || _ == 3 && Y >= b || _ == 2 && Y <= b) ? b : -pe, Z = Mt(d, Y > k && t <= k ? k : Je(k, Y));
  return K == Z && K == 0 && (Z = 100), [K, Z];
}
const Au = new Intl.NumberFormat(xn ? yu.language : "en-US"), Bo = (e) => Au.format(e), ut = Math, fr = ut.PI, De = ut.abs, ct = ut.floor, Me = ut.round, vt = ut.ceil, Mt = ut.min, Je = ut.max, gn = ut.pow, Xs = ut.sign, ei = ut.log10, jl = ut.log2, Eu = (e, t = 1) => ut.sinh(e) * t, so = (e, t = 1) => ut.asinh(e / t), pe = 1 / 0;
function el(e) {
  return (ei((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function wo(e, t, i) {
  return Mt(Je(e, t), i);
}
function Vl(e) {
  return typeof e == "function";
}
function ie(e) {
  return Vl(e) ? e : () => e;
}
const Pu = () => {
}, Wl = (e) => e, Gl = (e, t) => t, Tu = (e) => null, tl = (e) => !0, il = (e, t) => e == t, Cu = /\.\d*?(?=9{6,}|0{6,})/gm, Fi = (e) => {
  if (ql(e) || gi.has(e))
    return e;
  const t = `${e}`, i = t.match(Cu);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [r, s] = t.split("e");
    return +`${Fi(r)}e${s}`;
  }
  return ge(e, n);
};
function Di(e, t) {
  return Fi(ge(Fi(e / t)) * t);
}
function kr(e, t) {
  return Fi(vt(Fi(e / t)) * t);
}
function Yl(e, t) {
  return Fi(ct(Fi(e / t)) * t);
}
function ge(e, t = 0) {
  if (ql(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return Me(n) / i;
}
const gi = /* @__PURE__ */ new Map();
function Kl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Yn(e, t, i, n) {
  let r = [], s = n.map(Kl);
  for (let l = t; l < i; l++) {
    let h = De(l), d = ge(gn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * d, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : ge(b, g);
      r.push(_), gi.set(_, g);
    }
  }
  return r;
}
const jn = {}, Uo = [], mn = [null, null], hi = Array.isArray, ql = Number.isInteger, Mu = (e) => e === void 0;
function nl(e) {
  return typeof e == "string";
}
function Ar(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function Du(e) {
  return e != null && typeof e == "object";
}
const zu = Object.getPrototypeOf(Uint8Array), Zl = "__proto__";
function bn(e, t = Ar) {
  let i;
  if (hi(e)) {
    let n = e.find((r) => r != null);
    if (hi(n) || t(n)) {
      i = Array(e.length);
      for (let r = 0; r < e.length; r++)
        i[r] = bn(e[r], t);
    } else
      i = e.slice();
  } else if (e instanceof zu)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != Zl && (i[n] = bn(e[n], t));
  } else
    i = e;
  return i;
}
function Pe(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let r in n)
      r != Zl && (Ar(e[r]) ? Pe(e[r], bn(n[r])) : e[r] = bn(n[r]));
  }
  return e;
}
const Ou = 0, Nu = 1, Hu = 2;
function Lu(e, t, i) {
  for (let n = 0, r, s = -1; n < t.length; n++) {
    let l = t[n];
    if (l > s) {
      for (r = l - 1; r >= 0 && e[r] == null; )
        e[r--] = null;
      for (r = l + 1; r < i && e[r] == null; )
        e[s = r++] = null;
    }
  }
}
function Ru(e, t) {
  if (Uu(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return Iu(l[0]) || (l = Bu(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < e.length; l++) {
    let d = e[l][0], p = d.length;
    for (let b = 0; b < p; b++)
      i.add(d[b]);
  }
  let n = [Array.from(i).sort((l, h) => l - h)], r = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < r; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < e.length; l++) {
    let h = e[l], d = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], g = Array(r).fill(void 0), _ = t ? t[l][p] : Nu, $ = [];
      for (let E = 0; E < b.length; E++) {
        let H = b[E], B = s.get(d[E]);
        H === null ? _ != Ou && (g[B] = H, _ == Hu && $.push(B)) : g[B] = H;
      }
      Lu(g, $, r), n.push(g);
    }
  }
  return n;
}
const Fu = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Bu(e) {
  let t = e[0], i = t.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => t[s] - t[l]);
  let r = [];
  for (let s = 0; s < e.length; s++) {
    let l = e[s], h = Array(i);
    for (let d = 0; d < i; d++)
      h[d] = l[n[d]];
    r.push(h);
  }
  return r;
}
function Uu(e) {
  let t = e[0][0], i = t.length;
  for (let n = 1; n < e.length; n++) {
    let r = e[n][0];
    if (r.length != i)
      return !1;
    if (r != t) {
      for (let s = 0; s < i; s++)
        if (r[s] != t[s])
          return !1;
    }
  }
  return !0;
}
function Iu(e, t = 100) {
  const i = e.length;
  if (i <= 1)
    return !0;
  let n = 0, r = i - 1;
  for (; n <= r && e[n] == null; )
    n++;
  for (; r >= n && e[r] == null; )
    r--;
  if (r <= n)
    return !0;
  const s = Je(1, ct((r - n + 1) / t));
  for (let l = e[n], h = n + s; h <= r; h += s) {
    const d = e[h];
    if (d != null) {
      if (d <= l)
        return !1;
      l = d;
    }
  }
  return !0;
}
const Jl = [
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
], Ql = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Xl(e) {
  return e.slice(0, 3);
}
const ju = Ql.map(Xl), Vu = Jl.map(Xl), Wu = {
  MMMM: Jl,
  MMM: Vu,
  WWWW: Ql,
  WWW: ju
};
function Ln(e) {
  return (e < 10 ? "0" : "") + e;
}
function Gu(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Yu = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Ln(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Ln(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Ln(e.getHours()),
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
  mm: (e) => Ln(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Ln(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => Gu(e.getMilliseconds())
};
function Io(e, t) {
  t = t || Wu;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(e); )
    i.push(r[0][0] == "{" ? Yu[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const Ku = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function qu(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ku ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const ea = (e) => e % 1 == 0, yr = [1, 2, 2.5, 5], Zu = Yn(10, -32, 0, yr), ta = Yn(10, 0, 32, yr), Ju = ta.filter(ea), zi = Zu.concat(ta), jo = `
`, ia = "{YYYY}", rl = jo + ia, na = "{M}/{D}", Bn = jo + na, cr = Bn + "/{YY}", ra = "{aa}", Qu = "{h}:{mm}", hn = Qu + ra, ol = jo + hn, sl = ":{ss}", he = null;
function oa(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (e == 1 ? Yn(10, 0, 3, yr).filter(ea) : Yn(10, -3, 0, yr)).concat([
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
    r,
    r * 2,
    r * 3,
    r * 4,
    r * 5,
    r * 6,
    r * 7,
    r * 8,
    r * 9,
    r * 10,
    r * 15,
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
    [l, ia, he, he, he, he, he, he, 1],
    [r * 28, "{MMM}", rl, he, he, he, he, he, 1],
    [r, na, rl, he, he, he, he, he, 1],
    [n, "{h}" + ra, cr, he, Bn, he, he, he, 1],
    [i, hn, cr, he, Bn, he, he, he, 1],
    [t, sl, cr + " " + hn, he, Bn + " " + hn, he, ol, he, 1],
    [e, sl + ".{fff}", cr + " " + hn, he, Bn + " " + hn, he, ol, he, 1]
  ];
  function b(g) {
    return (_, $, E, H, B, j) => {
      let w = [], F = B >= l, S = B >= s && B < l, J = g(E), D = ge(J * e, 3), Q = lo(J.getFullYear(), F ? 0 : J.getMonth(), S || F ? 1 : J.getDate()), K = ge(Q * e, 3);
      if (S || F) {
        let te = S ? B / s : 0, Y = F ? B / l : 0, k = D == K ? D : ge(lo(Q.getFullYear() + Y, Q.getMonth() + te, 1) * e, 3), Z = new Date(Me(k / e)), z = Z.getFullYear(), V = Z.getMonth();
        for (let R = 0; k <= H; R++) {
          let ne = lo(z + Y * R, V + te * R, 1), L = ne - g(ge(ne * e, 3));
          k = ge((+ne + L) * e, 3), k <= H && w.push(k);
        }
      } else {
        let te = B >= r ? r : B, Y = ct(E) - ct(D), k = K + Y + kr(D - K, te);
        w.push(k);
        let Z = g(k), z = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, V = B / n, R = _.axes[$]._space, ne = j / R;
        for (; k = ge(k + B, e == 1 ? 0 : 3), !(k > H); )
          if (V > 1) {
            let L = ct(ge(z + V, 6)) % 24, oe = g(k).getHours() - L;
            oe > 1 && (oe = -1), k -= oe * n, z = (z + V) % 24;
            let de = w[w.length - 1];
            ge((k - de) / B, 3) * ne >= 0.7 && w.push(k);
          } else
            w.push(k);
      }
      return w;
    };
  }
  return [
    d,
    p,
    b
  ];
}
const [Xu, eh, th] = oa(1), [ih, nh, rh] = oa(1e-3);
Yn(2, -53, 53, [1]);
function ll(e, t) {
  return e.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function al(e, t) {
  return (i, n, r, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], d, p, b, g, _, $;
    return n.map((E) => {
      let H = e(E), B = H.getFullYear(), j = H.getMonth(), w = H.getDate(), F = H.getHours(), S = H.getMinutes(), J = H.getSeconds(), D = B != d && h[2] || j != p && h[3] || w != b && h[4] || F != g && h[5] || S != _ && h[6] || J != $ && h[7] || h[1];
      return d = B, p = j, b = w, g = F, _ = S, $ = J, D(H);
    });
  };
}
function oh(e, t) {
  let i = Io(t);
  return (n, r, s, l, h) => r.map((d) => i(e(d)));
}
function lo(e, t, i) {
  return new Date(e, t, i);
}
function cl(e, t) {
  return t(e);
}
const sh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function ul(e, t) {
  return (i, n, r, s) => s == null ? Ho : t(e(n));
}
function lh(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function ah(e, t) {
  return e.series[t].fill(e, t);
}
const ch = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Pu,
  markers: {
    show: !0,
    width: 2,
    stroke: lh,
    fill: ah,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function uh(e, t) {
  let i = e.cursor.points, n = _t(), r = i.size(e, t);
  ye(n, Rn, r), ye(n, Fn, r);
  let s = r / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, r);
  return l && ye(n, "borderWidth", l), n;
}
function hh(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function dh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function fh(e, t) {
  return e.series[t].points.size;
}
const ao = [0, 0];
function ph(e, t, i) {
  return ao[0] = t, ao[1] = i, ao;
}
function ur(e, t, i, n = !0) {
  return (r) => {
    r.button == 0 && (!n || r.target == t) && i(r);
  };
}
function co(e, t, i, n = !0) {
  return (r) => {
    (!n || r.target == t) && i(r);
  };
}
const gh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: ph,
  points: {
    one: !1,
    show: uh,
    size: fh,
    width: 0,
    stroke: dh,
    fill: hh
  },
  bind: {
    mousedown: ur,
    mouseup: ur,
    click: ur,
    // legend clicks, not .u-over clicks
    dblclick: ur,
    mousemove: co,
    mouseleave: co,
    mouseenter: co
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
    dist: (e, t, i, n, r) => n - r,
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
}, sa = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Vo = Pe({}, sa, {
  filter: Gl
}), la = Pe({}, Vo, {
  size: 10
}), aa = Pe({}, sa, {
  show: !1
}), Wo = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', ca = "bold " + Wo, ua = 1.5, hl = {
  show: !0,
  scale: "x",
  stroke: No,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ca,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Vo,
  ticks: la,
  border: aa,
  font: Wo,
  lineGap: ua,
  rotate: 0
}, mh = "Value", bh = "Time", dl = {
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
function _h(e, t, i, n, r) {
  return t.map((s) => s == null ? "" : Bo(s));
}
function vh(e, t, i, n, r, s, l) {
  let h = [], d = gi.get(r) || 0;
  i = l ? i : ge(kr(i, r), d);
  for (let p = i; p <= n; p = ge(p + r, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function xo(e, t, i, n, r, s, l) {
  const h = [], d = e.scales[e.axes[t].scale].log, p = d == 10 ? ei : jl, b = ct(p(i));
  r = gn(d, b), d == 10 && (r = zi[Ct(r, zi)]);
  let g = i, _ = r * d;
  d == 10 && (_ = zi[Ct(_, zi)]);
  do
    h.push(g), g = g + r, d == 10 && !gi.has(g) && (g = ge(g, gi.get(r))), g >= _ && (r = g, _ = r * d, d == 10 && (_ = zi[Ct(_, zi)]));
  while (g <= n);
  return h;
}
function yh(e, t, i, n, r, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, p = n > d ? xo(e, t, Je(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? xo(e, t, Je(d, -n), -i, r) : [d]).reverse().map((_) => -_).concat(b, p);
}
const ha = /./, wh = /[12357]/, xh = /[125]/, fl = /1/, $o = (e, t, i, n) => e.map((r, s) => t == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function $h(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], d = e.valToPos, p = s._space, b = d(10, l), g = d(9, l) - b >= p ? ha : d(7, l) - b >= p ? wh : d(5, l) - b >= p ? xh : fl;
  if (g == fl) {
    let _ = De(d(1, l) - b);
    if (_ < p)
      return $o(t.slice().reverse(), h.distr, g, vt(p / _)).reverse();
  }
  return $o(t, h.distr, g, 1);
}
function Sh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = s._space, d = e.valToPos, p = De(d(1, l) - d(2, l));
  return p < h ? $o(t.slice().reverse(), 3, ha, vt(h / p)).reverse() : t;
}
function kh(e, t, i, n) {
  return n == null ? Ho : t == null ? "" : Bo(t);
}
const pl = {
  show: !0,
  scale: "y",
  stroke: No,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ca,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Vo,
  ticks: la,
  border: aa,
  font: Wo,
  lineGap: ua,
  rotate: 0
};
function Ah(e, t) {
  let i = 3 + (e || 1) * 2;
  return ge(i * t, 3);
}
function Eh(e, t) {
  let { scale: i, idxs: n } = e.series[0], r = e._data[0], s = e.valToPos(r[n[0]], i, !0), l = e.valToPos(r[n[1]], i, !0), h = De(l - s), d = e.series[t], p = h / (d.points.space * ce);
  return n[1] - n[0] <= p;
}
const gl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, da = (e, t, i, n, r) => r, ml = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: da,
  alpha: 1,
  facets: [
    Pe({}, gl, { scale: "x" }),
    Pe({}, gl, { scale: "y" })
  ]
}, bl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: da,
  alpha: 1,
  points: {
    show: Eh,
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
function Ph(e, t, i, n, r) {
  return i / 10;
}
const fa = {
  time: Xc,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Th = Pe({}, fa, {
  time: !1,
  ori: 1
}), _l = {};
function pa(e, t) {
  let i = _l[e];
  return i || (i = {
    key: e,
    plots: [],
    sub(n) {
      i.plots.push(n);
    },
    unsub(n) {
      i.plots = i.plots.filter((r) => r != n);
    },
    pub(n, r, s, l, h, d, p) {
      for (let b = 0; b < i.plots.length; b++)
        i.plots[b] != r && i.plots[b].pub(n, r, s, l, h, d, p);
    }
  }, e != null && (_l[e] = i)), i;
}
const _n = 1, So = 2;
function Ui(e, t, i) {
  const n = e.mode, r = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[r.facets[0].scale] : l[e.series[0].scale], g = n == 2 ? l[r.facets[1].scale] : l[r.scale], _ = h.left, $ = h.top, E = h.width, H = h.height, B = e.valToPosH, j = e.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    p,
    b,
    g,
    B,
    j,
    _,
    $,
    E,
    H,
    Pr,
    $n,
    Cr,
    ma,
    _a
  ) : i(
    r,
    d,
    p,
    b,
    g,
    j,
    B,
    $,
    _,
    H,
    E,
    Tr,
    Sn,
    Ko,
    ba,
    va
  );
}
function Go(e, t) {
  let i = 0, n = 0, r = le(e.bands, Uo);
  for (let s = 0; s < r.length; s++) {
    let l = r[s];
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
function Ch(e, t, i, n, r) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[h];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function ti(e, t, i, n, r, s) {
  return Ui(e, t, (l, h, d, p, b, g, _, $, E, H, B) => {
    let j = l.pxRound;
    const w = p.dir * (p.ori == 0 ? 1 : -1), F = p.ori == 0 ? $n : Sn;
    let S, J;
    w == 1 ? (S = i, J = n) : (S = n, J = i);
    let D = j(g(h[S], p, H, $)), Q = j(_(d[S], b, B, E)), K = j(g(h[J], p, H, $)), te = j(_(s == 1 ? b.max : b.min, b, B, E)), Y = new Path2D(r);
    return F(Y, K, te), F(Y, D, te), F(Y, D, Q), Y;
  });
}
function Er(e, t, i, n, r, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? Cr : Ko;
    let d = i;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
      if (_[1] > _[0]) {
        let $ = _[0] - d;
        $ > 0 && h(l, d, n, $, n + s), d = _[1];
      }
    }
    let p = i + r - d, b = 10;
    p > 0 && h(l, d, n - b / 2, p, n + s + b);
  }
  return l;
}
function Mh(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function Yo(e, t, i, n, r, s, l) {
  let h = [], d = e.length;
  for (let p = r == 1 ? i : n; p >= i && p <= n; p += r)
    if (t[p] === null) {
      let g = p, _ = p;
      if (r == 1)
        for (; ++p <= n && t[p] === null; )
          _ = p;
      else
        for (; --p >= i && t[p] === null; )
          _ = p;
      let $ = s(e[g]), E = _ == g ? $ : s(e[_]), H = g - r;
      $ = l <= 0 && H >= 0 && H < d ? s(e[H]) : $;
      let j = _ + r;
      E = l >= 0 && j >= 0 && j < d ? s(e[j]) : E, E >= $ && h.push([$, E]);
    }
  return h;
}
function vl(e) {
  return e == 0 ? Wl : e == 1 ? Me : (t) => Di(t, e);
}
function ga(e) {
  let t = e == 0 ? Pr : Tr, i = e == 0 ? (r, s, l, h, d, p) => {
    r.arcTo(s, l, h, d, p);
  } : (r, s, l, h, d, p) => {
    r.arcTo(l, s, d, h, p);
  }, n = e == 0 ? (r, s, l, h, d) => {
    r.rect(s, l, h, d);
  } : (r, s, l, h, d) => {
    r.rect(l, s, d, h);
  };
  return (r, s, l, h, d, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(r, s, l, h, d) : (p = Mt(p, h / 2, d / 2), b = Mt(b, h / 2, d / 2), t(r, s + p, l), i(r, s + h, l, s + h, l + d, p), i(r, s + h, l + d, s, l + d, b), i(r, s, l + d, s, l, b), i(r, s, l, s + h, l, p), r.closePath());
  };
}
const Pr = (e, t, i) => {
  e.moveTo(t, i);
}, Tr = (e, t, i) => {
  e.moveTo(i, t);
}, $n = (e, t, i) => {
  e.lineTo(t, i);
}, Sn = (e, t, i) => {
  e.lineTo(i, t);
}, Cr = ga(0), Ko = ga(1), ma = (e, t, i, n, r, s) => {
  e.arc(t, i, n, r, s);
}, ba = (e, t, i, n, r, s) => {
  e.arc(i, t, n, r, s);
}, _a = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(t, i, n, r, s, l);
}, va = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(i, t, r, n, l, s);
};
function ya(e) {
  return (t, i, n, r, s) => Ui(t, i, (l, h, d, p, b, g, _, $, E, H, B) => {
    let { pxRound: j, points: w } = l, F, S;
    p.ori == 0 ? (F = Pr, S = ma) : (F = Tr, S = ba);
    const J = ge(w.width * ce, 3);
    let D = (w.size - w.width) / 2 * ce, Q = ge(D * 2, 3), K = new Path2D(), te = new Path2D(), { left: Y, top: k, width: Z, height: z } = t.bbox;
    Cr(
      te,
      Y - Q,
      k - Q,
      Z + Q * 2,
      z + Q * 2
    );
    const V = (R) => {
      if (d[R] != null) {
        let ne = j(g(h[R], p, H, $)), L = j(_(d[R], b, B, E));
        F(K, ne + D, L), S(K, ne, L, D, 0, fr * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let R = n; R <= r; R++)
        V(R);
    return {
      stroke: J > 0 ? K : null,
      fill: K,
      clip: te,
      flags: _n | So
    };
  });
}
function wa(e) {
  return (t, i, n, r, s, l) => {
    n != r && (s != n && l != n && e(t, i, n), s != r && l != r && e(t, i, r), e(t, i, l));
  };
}
const Dh = wa($n), zh = wa(Sn);
function xa(e) {
  const t = le(e?.alignGaps, 0);
  return (i, n, r, s) => Ui(i, n, (l, h, d, p, b, g, _, $, E, H, B) => {
    [r, s] = $r(d, r, s);
    let j = l.pxRound, w = (z) => j(g(z, p, H, $)), F = (z) => j(_(z, b, B, E)), S, J;
    p.ori == 0 ? (S = $n, J = Dh) : (S = Sn, J = zh);
    const D = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: _n }, K = Q.stroke;
    let te = !1;
    if (s - r >= H * 4) {
      let z = (O) => i.posToVal(O, p.key, !0), V = null, R = null, ne, L, et, we = w(h[D == 1 ? r : s]), oe = w(h[r]), de = w(h[s]), X = z(D == 1 ? oe + 1 : de - 1);
      for (let O = D == 1 ? r : s; O >= r && O <= s; O += D) {
        let Te = h[O], xe = (D == 1 ? Te < X : Te > X) ? we : w(Te), ue = d[O];
        xe == we ? ue != null ? (L = ue, V == null ? (S(K, xe, F(L)), ne = V = R = L) : L < V ? V = L : L > R && (R = L)) : ue === null && (te = !0) : (V != null && J(K, we, F(V), F(R), F(ne), F(L)), ue != null ? (L = ue, S(K, xe, F(L)), V = R = ne = L) : (V = R = null, ue === null && (te = !0)), we = xe, X = z(we + D));
      }
      V != null && V != R && et != we && J(K, we, F(V), F(R), F(ne), F(L));
    } else
      for (let z = D == 1 ? r : s; z >= r && z <= s; z += D) {
        let V = d[z];
        V === null ? te = !0 : V != null && S(K, w(h[z]), F(V));
      }
    let [k, Z] = Go(i, n);
    if (l.fill != null || k != 0) {
      let z = Q.fill = new Path2D(K), V = l.fillTo(i, n, l.min, l.max, k), R = F(V), ne = w(h[r]), L = w(h[s]);
      D == -1 && ([L, ne] = [ne, L]), S(z, L, R), S(z, ne, R);
    }
    if (!l.spanGaps) {
      let z = [];
      te && z.push(...Yo(h, d, r, s, D, w, t)), Q.gaps = z = l.gaps(i, n, r, s, z), Q.clip = Er(z, p.ori, $, E, H, B);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      ti(i, n, r, s, K, -1),
      ti(i, n, r, s, K, 1)
    ] : ti(i, n, r, s, K, Z)), Q;
  });
}
function Oh(e) {
  const t = le(e.align, 1), i = le(e.ascDesc, !1), n = le(e.alignGaps, 0), r = le(e.extend, !1);
  return (s, l, h, d) => Ui(s, l, (p, b, g, _, $, E, H, B, j, w, F) => {
    [h, d] = $r(g, h, d);
    let S = p.pxRound, { left: J, width: D } = s.bbox, Q = (oe) => S(E(oe, _, w, B)), K = (oe) => S(H(oe, $, F, j)), te = _.ori == 0 ? $n : Sn;
    const Y = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: _n }, k = Y.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let z = K(g[Z == 1 ? h : d]), V = Q(b[Z == 1 ? h : d]), R = V, ne = V;
    r && t == -1 && (ne = J, te(k, ne, z)), te(k, V, z);
    for (let oe = Z == 1 ? h : d; oe >= h && oe <= d; oe += Z) {
      let de = g[oe];
      if (de == null)
        continue;
      let X = Q(b[oe]), O = K(de);
      t == 1 ? te(k, X, z) : te(k, R, O), te(k, X, O), z = O, R = X;
    }
    let L = R;
    r && t == 1 && (L = J + D, te(k, L, z));
    let [et, we] = Go(s, l);
    if (p.fill != null || et != 0) {
      let oe = Y.fill = new Path2D(k), de = p.fillTo(s, l, p.min, p.max, et), X = K(de);
      te(oe, L, X), te(oe, ne, X);
    }
    if (!p.spanGaps) {
      let oe = [];
      oe.push(...Yo(b, g, h, d, Z, Q, n));
      let de = p.width * ce / 2, X = i || t == 1 ? de : -de, O = i || t == -1 ? -de : de;
      oe.forEach((Te) => {
        Te[0] += X, Te[1] += O;
      }), Y.gaps = oe = p.gaps(s, l, h, d, oe), Y.clip = Er(oe, _.ori, B, j, w, F);
    }
    return we != 0 && (Y.band = we == 2 ? [
      ti(s, l, h, d, k, -1),
      ti(s, l, h, d, k, 1)
    ] : ti(s, l, h, d, k, we)), Y;
  });
}
function yl(e, t, i, n, r, s, l = pe) {
  if (e.length > 1) {
    let h = null;
    for (let d = 0, p = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (h != null) {
          let b = De(e[d] - e[h]);
          b < p && (p = b, l = De(i(e[d], n, r, s) - i(e[h], n, r, s)));
        }
        h = d;
      }
  }
  return l;
}
function Nh(e) {
  e = e || jn;
  const t = le(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let r = e.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = ie(r), l = 1 - t[0], h = le(t[1], pe), d = le(t[2], 1), p = le(e.disp, jn), b = le(e.each, ($) => {
  }), { fill: g, stroke: _ } = p;
  return ($, E, H, B) => Ui($, E, (j, w, F, S, J, D, Q, K, te, Y, k) => {
    let Z = j.pxRound, z = i, V = n * ce, R = h * ce, ne = d * ce, L, et;
    S.ori == 0 ? [L, et] = s($, E) : [et, L] = s($, E);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let oe = S.ori == 0 ? Cr : Ko, de = S.ori == 0 ? b : (C, me, Ce, Wi, $i, Nt, Si) => {
      b(C, me, Ce, $i, Wi, Si, Nt);
    }, X = le($.bands, Uo).find((C) => C.series[0] == E), O = X != null ? X.dir : 0, Te = j.fillTo($, E, j.min, j.max, O), Ge = Z(Q(Te, J, k, te)), xe, ue, $t, nt = Y, Se = Z(j.width * ce), Ot = !1, qt = null, ht = null, oi = null, Ii = null;
    g != null && (Se == 0 || _ != null) && (Ot = !0, qt = g.values($, E, H, B), ht = /* @__PURE__ */ new Map(), new Set(qt).forEach((C) => {
      C != null && ht.set(C, new Path2D());
    }), Se > 0 && (oi = _.values($, E, H, B), Ii = /* @__PURE__ */ new Map(), new Set(oi).forEach((C) => {
      C != null && Ii.set(C, new Path2D());
    })));
    let { x0: ji, size: En } = p;
    if (ji != null && En != null) {
      z = 1, w = ji.values($, E, H, B), ji.unit == 2 && (w = w.map((Ce) => $.posToVal(K + Ce * Y, S.key, !0)));
      let C = En.values($, E, H, B);
      En.unit == 2 ? ue = C[0] * Y : ue = D(C[0], S, Y, K) - D(0, S, Y, K), nt = yl(w, F, D, S, Y, K, nt), $t = nt - ue + V;
    } else
      nt = yl(w, F, D, S, Y, K, nt), $t = nt * l + V, ue = nt - $t;
    $t < 1 && ($t = 0), Se >= ue / 2 && (Se = 0), $t < 5 && (Z = Wl);
    let Qn = $t > 0, wi = nt - $t - (Qn ? Se : 0);
    ue = Z(wo(wi, ne, R)), xe = (z == 0 ? ue / 2 : z == we ? 0 : ue) - z * we * ((z == 0 ? V / 2 : 0) + (Qn ? Se / 2 : 0));
    const Ye = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Vi = Ot ? null : new Path2D();
    let Zt = null;
    if (X != null)
      Zt = $.data[X.series[1]];
    else {
      let { y0: C, y1: me } = p;
      C != null && me != null && (F = me.values($, E, H, B), Zt = C.values($, E, H, B));
    }
    let xi = L * ue, q = et * ue;
    for (let C = we == 1 ? H : B; C >= H && C <= B; C += we) {
      let me = F[C];
      if (me == null)
        continue;
      if (Zt != null) {
        let tt = Zt[C] ?? 0;
        if (me - tt == 0)
          continue;
        Ge = Q(tt, J, k, te);
      }
      let Ce = S.distr != 2 || p != null ? w[C] : C, Wi = D(Ce, S, Y, K), $i = Q(le(me, Te), J, k, te), Nt = Z(Wi - xe), Si = Z(Je($i, Ge)), rt = Z(Mt($i, Ge)), dt = Si - rt;
      if (me != null) {
        let tt = me < 0 ? q : xi, St = me < 0 ? xi : q;
        Ot ? (Se > 0 && oi[C] != null && oe(Ii.get(oi[C]), Nt, rt + ct(Se / 2), ue, Je(0, dt - Se), tt, St), qt[C] != null && oe(ht.get(qt[C]), Nt, rt + ct(Se / 2), ue, Je(0, dt - Se), tt, St)) : oe(Vi, Nt, rt + ct(Se / 2), ue, Je(0, dt - Se), tt, St), de(
          $,
          E,
          C,
          Nt - Se / 2,
          rt,
          ue + Se,
          dt
        );
      }
    }
    return Se > 0 ? Ye.stroke = Ot ? Ii : Vi : Ot || (Ye._fill = j.width == 0 ? j._fill : j._stroke ?? j._fill, Ye.width = 0), Ye.fill = Ot ? ht : Vi, Ye;
  });
}
function Hh(e, t) {
  const i = le(t?.alignGaps, 0);
  return (n, r, s, l) => Ui(n, r, (h, d, p, b, g, _, $, E, H, B, j) => {
    [s, l] = $r(p, s, l);
    let w = h.pxRound, F = (L) => w(_(L, b, B, E)), S = (L) => w($(L, g, j, H)), J, D, Q;
    b.ori == 0 ? (J = Pr, Q = $n, D = _a) : (J = Tr, Q = Sn, D = va);
    const K = b.dir * (b.ori == 0 ? 1 : -1);
    let te = F(d[K == 1 ? s : l]), Y = te, k = [], Z = [];
    for (let L = K == 1 ? s : l; L >= s && L <= l; L += K)
      if (p[L] != null) {
        let we = d[L], oe = F(we);
        k.push(Y = oe), Z.push(S(p[L]));
      }
    const z = { stroke: e(k, Z, J, Q, D, w), fill: null, clip: null, band: null, gaps: null, flags: _n }, V = z.stroke;
    let [R, ne] = Go(n, r);
    if (h.fill != null || R != 0) {
      let L = z.fill = new Path2D(V), et = h.fillTo(n, r, h.min, h.max, R), we = S(et);
      Q(L, Y, we), Q(L, te, we);
    }
    if (!h.spanGaps) {
      let L = [];
      L.push(...Yo(d, p, s, l, K, F, i)), z.gaps = L = h.gaps(n, r, s, l, L), z.clip = Er(L, b.ori, E, H, B, j);
    }
    return ne != 0 && (z.band = ne == 2 ? [
      ti(n, r, s, l, V, -1),
      ti(n, r, s, l, V, 1)
    ] : ti(n, r, s, l, V, ne)), z;
  });
}
function Lh(e) {
  return Hh(Rh, e);
}
function Rh(e, t, i, n, r, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, e[0], t[0]), l == 2)
    n(h, e[1], t[1]);
  else {
    let d = Array(l), p = Array(l - 1), b = Array(l - 1), g = Array(l - 1);
    for (let _ = 0; _ < l - 1; _++)
      b[_] = t[_ + 1] - t[_], g[_] = e[_ + 1] - e[_], p[_] = b[_] / g[_];
    d[0] = p[0];
    for (let _ = 1; _ < l - 1; _++)
      p[_] === 0 || p[_ - 1] === 0 || p[_ - 1] > 0 != p[_] > 0 ? d[_] = 0 : (d[_] = 3 * (g[_ - 1] + g[_]) / ((2 * g[_] + g[_ - 1]) / p[_ - 1] + (g[_] + 2 * g[_ - 1]) / p[_]), isFinite(d[_]) || (d[_] = 0));
    d[l - 1] = p[l - 2];
    for (let _ = 0; _ < l - 1; _++)
      r(
        h,
        e[_] + g[_] / 3,
        t[_] + d[_] * g[_] / 3,
        e[_ + 1] - g[_] / 3,
        t[_ + 1] - d[_ + 1] * g[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return h;
}
const ko = /* @__PURE__ */ new Set();
function wl() {
  for (let e of ko)
    e.syncRect(!0);
}
xn && (Hi(_u, dn, wl), Hi(vu, dn, wl, !0), Hi(_r, dn, () => {
  Ve.pxRatio = ce;
}));
const Fh = xa(), Bh = ya();
function xl(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Ao(s, l, t, i));
}
function Uh(e, t) {
  return e.map((i, n) => n == 0 ? {} : Pe({}, t, i));
}
function Ao(e, t, i, n) {
  return Pe({}, t == 0 ? i : n, e);
}
function $a(e, t, i) {
  return t == null ? mn : [t, i];
}
const Ih = $a;
function jh(e, t, i) {
  return t == null ? mn : vr(t, i, Fo, !0);
}
function Sa(e, t, i, n) {
  return t == null ? mn : Sr(t, i, e.scales[n].log, !1);
}
const Vh = Sa;
function ka(e, t, i, n) {
  return t == null ? mn : Ro(t, i, e.scales[n].log, !1);
}
const Wh = ka;
function Gh(e, t, i, n, r) {
  let s = Je(el(e), el(t)), l = t - e, h = Ct(r / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= r && s + (d < 5 ? gi.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function $l(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, r) => (t = Me((i = +r) * ce)) + "px"), [e, t, i];
}
function Yh(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = ge(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function Ve(e, t, i) {
  const n = {
    mode: le(e.mode, 1)
  }, r = n.mode;
  function s(o, a, c, u) {
    let f = a.valToPct(o);
    return u + c * (a.dir == -1 ? 1 - f : f);
  }
  function l(o, a, c, u) {
    let f = a.valToPct(o);
    return u + c * (a.dir == -1 ? f : 1 - f);
  }
  function h(o, a, c, u) {
    return a.ori == 0 ? s(o, a, c, u) : l(o, a, c, u);
  }
  n.valToPosH = s, n.valToPosV = l;
  let d = !1;
  n.status = 0;
  const p = n.root = _t(eu);
  if (e.id != null && (p.id = e.id), at(p, e.class), e.title) {
    let o = _t(nu, p);
    o.textContent = e.title;
  }
  const b = Pt("canvas"), g = n.ctx = b.getContext("2d"), _ = _t(ru, p);
  Hi("click", _, (o) => {
    o.target === E && (be != nn || $e != rn) && Ie.click(n, o);
  }, !0);
  const $ = n.under = _t(ou, _);
  _.appendChild(b);
  const E = n.over = _t(su, _);
  e = bn(e);
  const H = +le(e.pxAlign, 1), B = vl(H);
  (e.plugins || []).forEach((o) => {
    o.opts && (e = o.opts(n, e) || e);
  });
  const j = e.ms || 1e-3, w = n.series = r == 1 ? xl(e.series || [], dl, bl, !1) : Uh(e.series || [null], ml), F = n.axes = xl(e.axes || [], hl, pl, !0), S = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((o) => {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1);
  });
  const D = r == 2 ? w[1].facets[0].scale : w[0].scale, Q = {
    axes: Ua,
    series: Ha
  }, K = (e.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function te(o) {
    const a = o.distr == 3 ? (c) => ei(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => so(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: m } = o, v = m - f;
      return (u - f) / v;
    };
  }
  function Y(o) {
    let a = S[o];
    if (a == null) {
      let c = (e.scales || jn)[o] || jn;
      if (c.from != null) {
        Y(c.from);
        let u = Pe({}, S[c.from], c, { key: o });
        u.valToPct = te(u), S[o] = u;
      } else {
        a = S[o] = Pe({}, o == D ? fa : Th, c), a.key = o;
        let u = a.time, f = a.range, m = hi(f);
        if ((o != D || r == 2 && !u) && (m && (f[0] == null || f[1] == null) && (f = {
          min: f[0] == null ? Js : {
            mode: 1,
            hard: f[0],
            soft: f[0]
          },
          max: f[1] == null ? Js : {
            mode: 1,
            hard: f[1],
            soft: f[1]
          }
        }, m = !1), !m && Ar(f))) {
          let v = f;
          f = (y, x, P) => x == null ? mn : vr(x, P, v);
        }
        a.range = ie(f || (u ? Ih : o == D ? a.distr == 3 ? Vh : a.distr == 4 ? Wh : $a : a.distr == 3 ? Sa : a.distr == 4 ? ka : jh)), a.auto = ie(m ? !1 : a.auto), a.clamp = ie(a.clamp || Ph), a._min = a._max = null, a.valToPct = te(a);
      }
    }
  }
  Y("x"), Y("y"), r == 1 && w.forEach((o) => {
    Y(o.scale);
  }), F.forEach((o) => {
    Y(o.scale);
  });
  for (let o in e.scales)
    Y(o);
  const k = S[D], Z = k.distr;
  let z, V;
  k.ori == 0 ? (at(p, tu), z = s, V = l) : (at(p, iu), z = l, V = s);
  const R = {};
  for (let o in S) {
    let a = S[o];
    (a.min != null || a.max != null) && (R[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const ne = e.tzDate || ((o) => new Date(Me(o / j))), L = e.fmtDate || Io, et = j == 1 ? th(ne) : rh(ne), we = al(ne, ll(j == 1 ? eh : nh, L)), oe = ul(ne, cl(sh, L)), de = [], X = n.legend = Pe({}, ch, e.legend), O = n.cursor = Pe({}, gh, { drag: { y: r == 2 } }, e.cursor), Te = X.show, Ge = O.show, xe = X.markers;
  X.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, $t, nt, Se = [], Ot = [], qt, ht = !1, oi = {};
  if (X.live) {
    const o = w[1] ? w[1].values : null;
    ht = o != null, qt = ht ? o(n, 1, 0) : { _: 0 };
    for (let a in qt)
      oi[a] = Ho;
  }
  if (Te)
    if (ue = Pt("table", du, p), nt = Pt("tbody", null, ue), X.mount(n, ue), ht) {
      $t = Pt("thead", null, ue, nt);
      let o = Pt("tr", null, $t);
      Pt("th", null, o);
      for (var Ii in qt)
        Pt("th", Rs, o).textContent = Ii;
    } else
      at(ue, pu), X.live && at(ue, fu);
  const ji = { show: !0 }, En = { show: !1 };
  function Qn(o, a) {
    if (a == 0 && (ht || !X.live || r == 2))
      return mn;
    let c = [], u = Pt("tr", gu, nt, nt.childNodes[a]);
    at(u, o.class), o.show || at(u, Oi);
    let f = Pt("th", null, u);
    if (xe.show) {
      let y = _t(mu, f);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (y.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let m = _t(Rs, f);
    o.label instanceof HTMLElement ? m.appendChild(o.label) : m.textContent = o.label, a > 0 && (xe.show || (m.style.color = o.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ye("click", f, (y) => {
      if (O._lock)
        return;
      Ai(y);
      let x = w.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let P = w.some((T, M) => M > 0 && M != x && T.show);
        w.forEach((T, M) => {
          M > 0 && Lt(M, P ? M == x ? ji : En : ji, !0, Ee.setSeries);
        });
      } else
        Lt(x, { show: !o.show }, !0, Ee.setSeries);
    }, !1), Yi && Ye(Is, f, (y) => {
      O._lock || (Ai(y), Lt(w.indexOf(o), sn, !0, Ee.setSeries));
    }, !1));
    for (var v in qt) {
      let y = Pt("td", bu, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const wi = /* @__PURE__ */ new Map();
  function Ye(o, a, c, u = !0) {
    const f = wi.get(a) || {}, m = O.bind[o](n, a, c, u);
    m && (Hi(o, a, f[o] = m), wi.set(a, f));
  }
  function Vi(o, a, c) {
    const u = wi.get(a) || {};
    for (let f in u)
      (o == null || f == o) && (yo(f, a, u[f]), delete u[f]);
    o == null && wi.delete(a);
  }
  let Zt = 0, xi = 0, q = 0, C = 0, me = 0, Ce = 0, Wi = me, $i = Ce, Nt = q, Si = C, rt = 0, dt = 0, tt = 0, St = 0;
  n.bbox = {};
  let Dr = !1, Xn = !1, Gi = !1, ki = !1, er = !1, ft = !1;
  function zr(o, a, c) {
    (c || o != n.width || a != n.height) && Jo(o, a), Qi(!1), Gi = !0, Xn = !0, Xi();
  }
  function Jo(o, a) {
    n.width = Zt = q = o, n.height = xi = C = a, me = Ce = 0, Ta(), Ca();
    let c = n.bbox;
    rt = c.left = Di(me * ce, 0.5), dt = c.top = Di(Ce * ce, 0.5), tt = c.width = Di(q * ce, 0.5), St = c.height = Di(C * ce, 0.5);
  }
  const Aa = 3;
  function Ea() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = Fa(a), u = Ba(a);
      o = a == Aa || c && u, o || (Jo(n.width, n.height), Xn = !0);
    }
  }
  function Pa({ width: o, height: a }) {
    zr(o, a);
  }
  n.setSize = Pa;
  function Ta() {
    let o = !1, a = !1, c = !1, u = !1;
    F.forEach((f, m) => {
      if (f.show && f._show) {
        let { side: v, _size: y } = f, x = v % 2, P = f.label != null ? f.labelSize : 0, T = y + P;
        T > 0 && (x ? (q -= T, v == 3 ? (me += T, u = !0) : c = !0) : (C -= T, v == 0 ? (Ce += T, o = !0) : a = !0));
      }
    }), Ei[0] = o, Ei[1] = c, Ei[2] = a, Ei[3] = u, q -= si[1] + si[3], me += si[3], C -= si[2] + si[0], Ce += si[0];
  }
  function Ca() {
    let o = me + q, a = Ce + C, c = me, u = Ce;
    function f(m, v) {
      switch (m) {
        case 1:
          return o += v, o - v;
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
        m._pos = f(y, m._size), m.label != null && (m._lpos = f(y, m.labelSize));
      }
    });
  }
  if (O.dataIdx == null) {
    let o = O.hover, a = o.skip = new Set(o.skip ?? []);
    a.add(void 0);
    let c = o.prox = ie(o.prox), u = o.bias ??= 0;
    O.dataIdx = (f, m, v, y) => {
      if (m == 0)
        return v;
      let x = v, P = c(f, m, v, y) ?? pe, T = P >= 0 && P < pe, M = k.ori == 0 ? q : C, W = O.left, ae = t[0], se = t[m];
      if (a.has(se[v])) {
        x = null;
        let ee = null, I = null, N;
        if (u == 0 || u == -1)
          for (N = v; ee == null && N-- > 0; )
            a.has(se[N]) || (ee = N);
        if (u == 0 || u == 1)
          for (N = v; I == null && N++ < se.length; )
            a.has(se[N]) || (I = N);
        if (ee != null || I != null)
          if (T) {
            let ve = ee == null ? -1 / 0 : z(ae[ee], k, M, 0), ke = I == null ? 1 / 0 : z(ae[I], k, M, 0), Be = W - ve, fe = ke - W;
            Be <= fe ? Be <= P && (x = ee) : fe <= P && (x = I);
          } else
            x = I == null ? ee : ee == null ? I : v - ee <= I - v ? ee : I;
      } else T && De(W - z(ae[v], k, M, 0)) > P && (x = null);
      return x;
    };
  }
  const Ai = (o) => {
    O.event = o;
  };
  O.idxs = de, O._lock = !1;
  let je = O.points;
  je.show = ie(je.show), je.size = ie(je.size), je.stroke = ie(je.stroke), je.width = ie(je.width), je.fill = ie(je.fill);
  const Ht = n.focus = Pe({}, e.focus || { alpha: 0.3 }, O.focus), Yi = Ht.prox >= 0, Ki = Yi && je.one;
  let pt = [], qi = [], Zi = [];
  function Qo(o, a) {
    let c = je.show(n, a);
    if (c instanceof HTMLElement)
      return at(c, hu), at(c, o.class), Ut(c, -10, -10, q, C), E.insertBefore(c, pt[a]), c;
  }
  function Xo(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && S[o.scale].time, u = o.value;
      o.value = c ? nl(u) ? ul(ne, cl(u, L)) : u || oe : u || kh, o.label = o.label || (c ? bh : mh);
    }
    if (Ki || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || Fh || Tu, o.fillTo = ie(o.fillTo || Ch), o.pxAlign = +le(o.pxAlign, H), o.pxRound = vl(o.pxAlign), o.stroke = ie(o.stroke || null), o.fill = ie(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = Ah(Je(1, o.width), 1), u = o.points = Pe({}, {
        size: c,
        width: Je(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: Bh,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = ie(u.show), u.filter = ie(u.filter), u.fill = ie(u.fill), u.stroke = ie(u.stroke), u.paths = ie(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Te) {
      let c = Qn(o, a);
      Se.splice(a, 0, c[0]), Ot.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Ge) {
      de.splice(a, 0, null);
      let c = null;
      Ki ? a == 0 && (c = Qo(o, a)) : a > 0 && (c = Qo(o, a)), pt.splice(a, 0, c), qi.splice(a, 0, 0), Zi.splice(a, 0, 0);
    }
    Fe("addSeries", a);
  }
  function Ma(o, a) {
    a = a ?? w.length, o = r == 1 ? Ao(o, a, dl, bl) : Ao(o, a, {}, ml), w.splice(a, 0, o), Xo(w[a], a);
  }
  n.addSeries = Ma;
  function Da(o) {
    if (w.splice(o, 1), Te) {
      X.values.splice(o, 1), Ot.splice(o, 1);
      let a = Se.splice(o, 1)[0];
      Vi(null, a.firstChild), a.remove();
    }
    Ge && (de.splice(o, 1), pt.splice(o, 1)[0].remove(), qi.splice(o, 1), Zi.splice(o, 1)), Fe("delSeries", o);
  }
  n.delSeries = Da;
  const Ei = [!1, !1, !1, !1];
  function za(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = S[o.scale];
      u == null && (o.scale = c ? w[1].scale : D, u = S[o.scale]);
      let f = u.time;
      o.size = ie(o.size), o.space = ie(o.space), o.rotate = ie(o.rotate), hi(o.incrs) && o.incrs.forEach((v) => {
        !gi.has(v) && gi.set(v, Kl(v));
      }), o.incrs = ie(o.incrs || (u.distr == 2 ? Ju : f ? j == 1 ? Xu : ih : zi)), o.splits = ie(o.splits || (f && u.distr == 1 ? et : u.distr == 3 ? xo : u.distr == 4 ? yh : vh)), o.stroke = ie(o.stroke), o.grid.stroke = ie(o.grid.stroke), o.ticks.stroke = ie(o.ticks.stroke), o.border.stroke = ie(o.border.stroke);
      let m = o.values;
      o.values = // static array of tick values
      hi(m) && !hi(m[0]) ? ie(m) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          hi(m) ? al(ne, ll(m, L)) : (
            // fmtDate string tpl
            nl(m) ? oh(ne, m) : m || we
          )
        ) : m || _h
      ), o.filter = ie(o.filter || (u.distr >= 3 && u.log == 10 ? $h : u.distr == 3 && u.log == 2 ? Sh : Gl)), o.font = $l(o.font), o.labelFont = $l(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (Ei[a] = !0, o._el = _t(lu, _));
    }
  }
  function Pn(o, a, c, u) {
    let [f, m, v, y] = c, x = a % 2, P = 0;
    return x == 0 && (y || m) && (P = a == 0 && !f || a == 2 && !v ? Me(hl.size / 3) : 0), x == 1 && (f || v) && (P = a == 1 && !m || a == 3 && !y ? Me(pl.size / 2) : 0), P;
  }
  const es = n.padding = (e.padding || [Pn, Pn, Pn, Pn]).map((o) => ie(le(o, Pn))), si = n._padding = es.map((o, a) => o(n, a, Ei, 0));
  let Ue, Ne = null, He = null;
  const tr = r == 1 ? w[0].idxs : null;
  let kt = null, Tn = !1;
  function ts(o, a) {
    if (t = o ?? [], n.data = n._data = t, r == 2) {
      Ue = 0;
      for (let c = 1; c < w.length; c++)
        Ue += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), kt = t[0], Ue = kt.length;
      let c = t;
      if (Z == 2) {
        c = t.slice();
        let u = c[0] = Array(Ue);
        for (let f = 0; f < Ue; f++)
          u[f] = f;
      }
      n._data = t = c;
    }
    if (Qi(!0), Fe("setData"), Z == 2 && (Gi = !0), a !== !1) {
      let c = k;
      c.auto(n, Tn) ? Or() : ai(D, c.min, c.max), ki = ki || O.left >= 0, ft = !0, Xi();
    }
  }
  n.setData = ts;
  function Or() {
    Tn = !0;
    let o, a;
    r == 1 && (Ue > 0 ? (Ne = tr[0] = 0, He = tr[1] = Ue - 1, o = t[0][Ne], a = t[0][He], Z == 2 ? (o = Ne, a = He) : o == a && (Z == 3 ? [o, a] = Sr(o, o, k.log, !1) : Z == 4 ? [o, a] = Ro(o, o, k.log, !1) : k.time ? a = o + Me(86400 / j) : [o, a] = vr(o, a, Fo, !0))) : (Ne = tr[0] = o = null, He = tr[1] = a = null)), ai(D, o, a);
  }
  let ir, Ji, Nr, Hr, Lr, Rr, Fr, Br, Ur, it;
  function is(o, a, c, u, f, m) {
    o ??= Bs, c ??= Uo, u ??= "butt", f ??= Bs, m ??= "round", o != ir && (g.strokeStyle = ir = o), f != Ji && (g.fillStyle = Ji = f), a != Nr && (g.lineWidth = Nr = a), m != Lr && (g.lineJoin = Lr = m), u != Rr && (g.lineCap = Rr = u), c != Hr && g.setLineDash(Hr = c);
  }
  function ns(o, a, c, u) {
    a != Ji && (g.fillStyle = Ji = a), o != Fr && (g.font = Fr = o), c != Br && (g.textAlign = Br = c), u != Ur && (g.textBaseline = Ur = u);
  }
  function Ir(o, a, c, u, f = 0) {
    if (u.length > 0 && o.auto(n, Tn) && (a == null || a.min == null)) {
      let m = le(Ne, 0), v = le(He, u.length - 1), y = c.min == null ? $u(u, m, v, f, o.distr == 3) : [c.min, c.max];
      o.min = Mt(o.min, c.min = y[0]), o.max = Je(o.max, c.max = y[1]);
    }
  }
  const rs = { min: null, max: null };
  function Oa() {
    for (let u in S) {
      let f = S[u];
      R[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      R[D] != null && f.auto(n, Tn)) && (R[u] = rs);
    }
    for (let u in S) {
      let f = S[u];
      R[u] == null && f.from != null && R[f.from] != null && (R[u] = rs);
    }
    R[D] != null && Qi(!0);
    let o = {};
    for (let u in R) {
      let f = R[u];
      if (f != null) {
        let m = o[u] = bn(S[u], Du);
        if (f.min != null)
          Pe(m, f);
        else if (u != D || r == 2)
          if (Ue == 0 && m.from == null) {
            let v = m.range(n, null, null, u);
            m.min = v[0], m.max = v[1];
          } else
            m.min = pe, m.max = -pe;
      }
    }
    if (Ue > 0) {
      w.forEach((u, f) => {
        if (r == 1) {
          let m = u.scale, v = R[m];
          if (v == null)
            return;
          let y = o[m];
          if (f == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Ne = Ct(y.min, t[0]), He = Ct(y.max, t[0]), He - Ne > 1 && (t[0][Ne] < y.min && Ne++, t[0][He] > y.max && He--), u.min = kt[Ne], u.max = kt[He];
          } else u.show && u.auto && Ir(y, v, u, t[f], u.sorted);
          u.idxs[0] = Ne, u.idxs[1] = He;
        } else if (f > 0 && u.show && u.auto) {
          let [m, v] = u.facets, y = m.scale, x = v.scale, [P, T] = t[f], M = o[y], W = o[x];
          M != null && Ir(M, R[y], m, P, m.sorted), W != null && Ir(W, R[x], v, T, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in o) {
        let f = o[u], m = R[u];
        if (f.from == null && (m == null || m.min == null)) {
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
    for (let u in o) {
      let f = o[u];
      if (f.from != null) {
        let m = o[f.from];
        if (m.min == null)
          f.min = f.max = null;
        else {
          let v = f.range(n, m.min, m.max, u);
          f.min = v[0], f.max = v[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let u in o) {
      let f = o[u], m = S[u];
      if (m.min != f.min || m.max != f.max) {
        m.min = f.min, m.max = f.max;
        let v = m.distr;
        m._min = v == 3 ? ei(m.min) : v == 4 ? so(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? ei(m.max) : v == 4 ? so(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      w.forEach((u, f) => {
        r == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Gi = !0, Fe("setScale", u);
      Ge && O.left >= 0 && (ki = ft = !0);
    }
    for (let u in R)
      R[u] = null;
  }
  function Na(o) {
    let a = wo(Ne - 1, 0, Ue - 1), c = wo(He + 1, 0, Ue - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < Ue - 1; )
      c++;
    return [a, c];
  }
  function Ha() {
    if (Ue > 0) {
      let o = w.some((a) => a._focus) && it != Ht.alpha;
      o && (g.globalAlpha = it = Ht.alpha), w.forEach((a, c) => {
        if (c > 0 && a.show && (os(c, !1), os(c, !0), a._paths == null)) {
          let u = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha);
          let f = r == 2 ? [0, t[c][0].length - 1] : Na(t[c]);
          a._paths = a.paths(n, c, f[0], f[1]), it != u && (g.globalAlpha = it = u);
        }
      }), w.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha), a._paths != null && ss(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Ne, He, f), v = a.points.filter(n, c, m, f);
            (m || v) && (a.points._paths = a.points.paths(n, c, Ne, He, v), ss(c, !0));
          }
          it != u && (g.globalAlpha = it = u), Fe("drawSeries", c);
        }
      }), o && (g.globalAlpha = it = 1);
    }
  }
  function os(o, a) {
    let c = a ? w[o].points : w[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function ss(o, a) {
    let c = a ? w[o].points : w[o], {
      stroke: u,
      fill: f,
      clip: m,
      flags: v,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: P = c.width
    } = c._paths;
    P = ge(P * ce, 3);
    let T = null, M = P % 2 / 2;
    a && x == null && (x = P > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && M > 0;
    if (W && g.translate(M, M), !a) {
      let ae = rt - P / 2, se = dt - P / 2, ee = tt + P, I = St + P;
      T = new Path2D(), T.rect(ae, se, ee, I);
    }
    a ? jr(y, P, c.dash, c.cap, x, u, f, v, m) : La(o, y, P, c.dash, c.cap, x, u, f, v, T, m), W && g.translate(-M, -M);
  }
  function La(o, a, c, u, f, m, v, y, x, P, T) {
    let M = !1;
    x != 0 && J.forEach((W, ae) => {
      if (W.series[0] == o) {
        let se = w[W.series[1]], ee = t[W.series[1]], I = (se._paths || jn).band;
        hi(I) && (I = W.dir == 1 ? I[0] : I[1]);
        let N, ve = null;
        se.show && I && ku(ee, Ne, He) ? (ve = W.fill(n, ae) || m, N = se._paths.clip) : I = null, jr(a, c, u, f, ve, v, y, x, P, T, N, I), M = !0;
      }
    }), M || jr(a, c, u, f, m, v, y, x, P, T);
  }
  const ls = _n | So;
  function jr(o, a, c, u, f, m, v, y, x, P, T, M) {
    is(o, a, c, u, f), (x || P || M) && (g.save(), x && g.clip(x), P && g.clip(P)), M ? (y & ls) == ls ? (g.clip(M), T && g.clip(T), rr(f, v), nr(o, m, a)) : y & So ? (rr(f, v), g.clip(M), nr(o, m, a)) : y & _n && (g.save(), g.clip(M), T && g.clip(T), rr(f, v), g.restore(), nr(o, m, a)) : (rr(f, v), nr(o, m, a)), (x || P || M) && g.restore();
  }
  function nr(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      g.strokeStyle = ir = f, g.stroke(u);
    }) : a != null && o && g.stroke(a));
  }
  function rr(o, a) {
    a instanceof Map ? a.forEach((c, u) => {
      g.fillStyle = Ji = u, g.fill(c);
    }) : a != null && o && g.fill(a);
  }
  function Ra(o, a, c, u) {
    let f = F[o], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let v = f._space = f.space(n, o, a, c, u), y = f._incrs = f.incrs(n, o, a, c, u, v);
      m = Gh(a, c, y, u, v);
    }
    return f._found = m;
  }
  function Vr(o, a, c, u, f, m, v, y, x, P) {
    let T = v % 2 / 2;
    H == 1 && g.translate(T, T), is(y, v, x, P, y), g.beginPath();
    let M, W, ae, se, ee = f + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (W = f, se = ee) : (M = f, ae = ee);
    for (let I = 0; I < o.length; I++)
      a[I] != null && (c == 0 ? M = ae = o[I] : W = se = o[I], g.moveTo(M, W), g.lineTo(ae, se));
    g.stroke(), H == 1 && g.translate(-T, -T);
  }
  function Fa(o) {
    let a = !0;
    return F.forEach((c, u) => {
      if (!c.show)
        return;
      let f = S[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, Qi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Qi(!1));
      let m = c.side, v = m % 2, { min: y, max: x } = f, [P, T] = Ra(u, y, x, v == 0 ? q : C);
      if (T == 0)
        return;
      let M = f.distr == 2, W = c._splits = c.splits(n, u, y, x, P, T, M), ae = f.distr == 2 ? W.map((N) => kt[N]) : W, se = f.distr == 2 ? kt[W[1]] - kt[W[0]] : P, ee = c._values = c.values(n, c.filter(n, ae, u, T, se), u, T, se);
      c._rotate = m == 2 ? c.rotate(n, ee, u, T) : 0;
      let I = c._size;
      c._size = vt(c.size(n, ee, u, o)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function Ba(o) {
    let a = !0;
    return es.forEach((c, u) => {
      let f = c(n, u, Ei, o);
      f != si[u] && (a = !1), si[u] = f;
    }), a;
  }
  function Ua() {
    for (let o = 0; o < F.length; o++) {
      let a = F[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, m, v = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [x, P] = a._found;
      if (a.label != null) {
        let qe = a.labelGap * y, lt = Me((a._lpos + qe) * ce);
        ns(a.labelFont[0], v, "center", c == 2 ? Hn : Fs), g.save(), u == 1 ? (f = m = 0, g.translate(
          lt,
          Me(dt + St / 2)
        ), g.rotate((c == 3 ? -fr : fr) / 2)) : (f = Me(rt + tt / 2), m = lt);
        let Ci = Vl(a.label) ? a.label(n, o, x, P) : a.label;
        g.fillText(Ci, f, m), g.restore();
      }
      if (P == 0)
        continue;
      let T = S[a.scale], M = u == 0 ? tt : St, W = u == 0 ? rt : dt, ae = a._splits, se = T.distr == 2 ? ae.map((qe) => kt[qe]) : ae, ee = T.distr == 2 ? kt[ae[1]] - kt[ae[0]] : x, I = a.ticks, N = a.border, ve = I.show ? I.size : 0, ke = Me(ve * ce), Be = Me((a.alignTo == 2 ? a._size - ve - a.gap : a.gap) * ce), fe = a._rotate * -fr / 180, Ae = B(a._pos * ce), ot = (ke + Be) * y, Ke = Ae + ot;
      m = u == 0 ? Ke : 0, f = u == 1 ? Ke : 0;
      let gt = a.font[0], At = a.align == 1 ? an : a.align == 2 ? no : fe > 0 ? an : fe < 0 ? no : u == 0 ? "center" : c == 3 ? no : an, Ft = fe || u == 1 ? "middle" : c == 2 ? Hn : Fs;
      ns(gt, v, At, Ft);
      let st = a.font[1] * a.lineGap, mt = ae.map((qe) => B(h(qe, T, M, W))), Et = a._values;
      for (let qe = 0; qe < Et.length; qe++) {
        let lt = Et[qe];
        if (lt != null) {
          u == 0 ? f = mt[qe] : m = mt[qe], lt = "" + lt;
          let Ci = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let Ze = 0; Ze < Ci.length; Ze++) {
            let As = Ci[Ze];
            fe ? (g.save(), g.translate(f, m + Ze * st), g.rotate(fe), g.fillText(As, 0, 0), g.restore()) : g.fillText(As, f, m + Ze * st);
          }
        }
      }
      I.show && Vr(
        mt,
        I.filter(n, se, o, P, ee),
        u,
        c,
        Ae,
        ke,
        ge(I.width * ce, 3),
        I.stroke(n, o),
        I.dash,
        I.cap
      );
      let Bt = a.grid;
      Bt.show && Vr(
        mt,
        Bt.filter(n, se, o, P, ee),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? dt : rt,
        u == 0 ? St : tt,
        ge(Bt.width * ce, 3),
        Bt.stroke(n, o),
        Bt.dash,
        Bt.cap
      ), N.show && Vr(
        [Ae],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? dt : rt,
        u == 1 ? St : tt,
        ge(N.width * ce, 3),
        N.stroke(n, o),
        N.dash,
        N.cap
      );
    }
    Fe("drawAxes");
  }
  function Qi(o) {
    w.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let or = !1, Wr = !1, Cn = [];
  function Ia() {
    Wr = !1;
    for (let o = 0; o < Cn.length; o++)
      Fe(...Cn[o]);
    Cn.length = 0;
  }
  function Xi() {
    or || (Fu(as), or = !0);
  }
  function ja(o, a = !1) {
    or = !0, Wr = a, o(n), as(), a && Cn.length > 0 && queueMicrotask(Ia);
  }
  n.batch = ja;
  function as() {
    if (Dr && (Oa(), Dr = !1), Gi && (Ea(), Gi = !1), Xn) {
      if (ye($, an, me), ye($, Hn, Ce), ye($, Rn, q), ye($, Fn, C), ye(E, an, me), ye(E, Hn, Ce), ye(E, Rn, q), ye(E, Fn, C), ye(_, Rn, Zt), ye(_, Fn, xi), b.width = Me(Zt * ce), b.height = Me(xi * ce), F.forEach(({ _el: o, _show: a, _size: c, _pos: u, side: f }) => {
        if (o != null)
          if (a) {
            let m = f === 3 || f === 0 ? c : 0, v = f % 2 == 1;
            ye(o, v ? "left" : "top", u - m), ye(o, v ? "width" : "height", c), ye(o, v ? "top" : "left", v ? Ce : me), ye(o, v ? "height" : "width", v ? C : q), vo(o, Oi);
          } else
            at(o, Oi);
      }), ir = Ji = Nr = Lr = Rr = Fr = Br = Ur = Hr = null, it = 1, zn(!0), me != Wi || Ce != $i || q != Nt || C != Si) {
        Qi(!1);
        let o = q / Nt, a = C / Si;
        if (Ge && !ki && O.left >= 0) {
          O.left *= o, O.top *= a, en && Ut(en, Me(O.left), 0, q, C), tn && Ut(tn, 0, Me(O.top), q, C);
          for (let c = 0; c < pt.length; c++) {
            let u = pt[c];
            u != null && (qi[c] *= o, Zi[c] *= a, Ut(u, vt(qi[c]), vt(Zi[c]), q, C));
          }
        }
        if (_e.show && !er && _e.left >= 0 && _e.width > 0) {
          _e.left *= o, _e.width *= o, _e.top *= a, _e.height *= a;
          for (let c in Jr)
            ye(on, c, _e[c]);
        }
        Wi = me, $i = Ce, Nt = q, Si = C;
      }
      Fe("setSize"), Xn = !1;
    }
    Zt > 0 && xi > 0 && (g.clearRect(0, 0, b.width, b.height), Fe("drawClear"), K.forEach((o) => o()), Fe("draw")), _e.show && er && (sr(_e), er = !1), Ge && ki && (Ti(null, !0, !1), ki = !1), X.show && X.live && ft && (qr(), ft = !1), d || (d = !0, n.status = 1, Fe("ready")), Tn = !1, or = !1;
  }
  n.redraw = (o, a) => {
    Gi = a || !1, o !== !1 ? ai(D, k.min, k.max) : Xi();
  };
  function Gr(o, a) {
    let c = S[o];
    if (c.from == null) {
      if (Ue == 0) {
        let u = c.range(n, a.min, a.max, o);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (Ue > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      o == D && c.distr == 2 && Ue > 0 && (a.min = Ct(a.min, t[0]), a.max = Ct(a.max, t[0]), a.min == a.max && a.max++), R[o] = a, Dr = !0, Xi();
    }
  }
  n.setScale = Gr;
  let Yr, Kr, en, tn, cs, us, nn, rn, hs, ds, be, $e, li = !1;
  const Ie = O.drag;
  let Le = Ie.x, Re = Ie.y;
  Ge && (O.x && (Yr = _t(cu, E)), O.y && (Kr = _t(uu, E)), k.ori == 0 ? (en = Yr, tn = Kr) : (en = Kr, tn = Yr), be = O.left, $e = O.top);
  const _e = n.select = Pe({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), on = _e.show ? _t(au, _e.over ? E : $) : null;
  function sr(o, a) {
    if (_e.show) {
      for (let c in o)
        _e[c] = o[c], c in Jr && ye(on, c, o[c]);
      a !== !1 && Fe("setSelect");
    }
  }
  n.setSelect = sr;
  function Va(o) {
    if (w[o].show)
      Te && vo(Se[o], Oi);
    else if (Te && at(Se[o], Oi), Ge) {
      let c = Ki ? pt[0] : pt[o];
      c != null && Ut(c, -10, -10, q, C);
    }
  }
  function ai(o, a, c) {
    Gr(o, { min: a, max: c });
  }
  function Lt(o, a, c, u) {
    a.focus != null && qa(o), a.show != null && w.forEach((f, m) => {
      m > 0 && (o == m || o == null) && (f.show = a.show, Va(m), r == 2 ? (ai(f.facets[0].scale, null, null), ai(f.facets[1].scale, null, null)) : ai(f.scale, null, null), Xi());
    }), c !== !1 && Fe("setSeries", o, a), u && On("setSeries", n, o, a);
  }
  n.setSeries = Lt;
  function Wa(o, a) {
    Pe(J[o], a);
  }
  function Ga(o, a) {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function Ya(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = Ga, n.setBand = Wa, n.delBand = Ya;
  function Ka(o, a) {
    w[o].alpha = a, Ge && pt[o] != null && (pt[o].style.opacity = a), Te && Se[o] && (Se[o].style.opacity = a);
  }
  let Jt, ci, Pi;
  const sn = { focus: !0 };
  function qa(o) {
    if (o != Pi) {
      let a = o == null, c = Ht.alpha != 1;
      w.forEach((u, f) => {
        if (r == 1 || f > 0) {
          let m = a || f == 0 || f == o;
          u._focus = a ? null : m, c && Ka(f, m ? 1 : Ht.alpha);
        }
      }), Pi = o, c && Xi();
    }
  }
  Te && Yi && Ye(js, ue, (o) => {
    O._lock || (Ai(o), Pi != null && Lt(null, sn, !0, Ee.setSeries));
  });
  function Rt(o, a, c) {
    let u = S[a];
    c && (o = o / ce - (u.ori == 1 ? Ce : me));
    let f = q;
    u.ori == 1 && (f = C, o = f - o), u.dir == -1 && (o = f - o);
    let m = u._min, v = u._max, y = o / f, x = m + (v - m) * y, P = u.distr;
    return P == 3 ? gn(10, x) : P == 4 ? Eu(x, u.asinh) : P == 100 ? u.bwd(x) : x;
  }
  function Za(o, a) {
    let c = Rt(o, D, a);
    return Ct(c, t[0], Ne, He);
  }
  n.valToIdx = (o) => Ct(o, t[0]), n.posToIdx = Za, n.posToVal = Rt, n.valToPos = (o, a, c) => S[a].ori == 0 ? s(
    o,
    S[a],
    c ? tt : q,
    c ? rt : 0
  ) : l(
    o,
    S[a],
    c ? St : C,
    c ? dt : 0
  ), n.setCursor = (o, a, c) => {
    be = o.left, $e = o.top, Ti(null, a, c);
  };
  function fs(o, a) {
    ye(on, an, _e.left = o), ye(on, Rn, _e.width = a);
  }
  function ps(o, a) {
    ye(on, Hn, _e.top = o), ye(on, Fn, _e.height = a);
  }
  let Mn = k.ori == 0 ? fs : ps, Dn = k.ori == 1 ? fs : ps;
  function Ja() {
    if (Te && X.live)
      for (let o = r == 2 ? 1 : 0; o < w.length; o++) {
        if (o == 0 && ht)
          continue;
        let a = X.values[o], c = 0;
        for (let u in a)
          Ot[o][c++].firstChild.nodeValue = a[u];
      }
  }
  function qr(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, u) => {
      de[u] = c;
    }) : Mu(o.idx) || de.fill(o.idx), X.idx = de[0]), Te && X.live) {
      for (let c = 0; c < w.length; c++)
        (c > 0 || r == 1 && !ht) && Qa(c, de[c]);
      Ja();
    }
    ft = !1, a !== !1 && Fe("setLegend");
  }
  n.setLegend = qr;
  function Qa(o, a) {
    let c = w[o], u = o == 0 && Z == 2 ? kt : t[o], f;
    ht ? f = c.values(n, o, a) ?? oi : (f = c.value(n, a == null ? null : u[a], o, a), f = f == null ? oi : { _: f }), X.values[o] = f;
  }
  function Ti(o, a, c) {
    hs = be, ds = $e, [be, $e] = O.move(n, be, $e), O.left = be, O.top = $e, Ge && (en && Ut(en, Me(be), 0, q, C), tn && Ut(tn, 0, Me($e), q, C));
    let u, f = Ne > He;
    Jt = pe, ci = null;
    let m = k.ori == 0 ? q : C, v = k.ori == 1 ? q : C;
    if (be < 0 || Ue == 0 || f) {
      u = O.idx = null;
      for (let y = 0; y < w.length; y++) {
        let x = pt[y];
        x != null && Ut(x, -10, -10, q, C);
      }
      Yi && Lt(null, sn, !0, o == null && Ee.setSeries), X.live && (de.fill(u), ft = !0);
    } else {
      let y, x, P;
      r == 1 && (y = k.ori == 0 ? be : $e, x = Rt(y, D), u = O.idx = Ct(x, t[0], Ne, He), P = z(t[0][u], k, m, 0));
      let T = -10, M = -10, W = 0, ae = 0, se = !0, ee = "", I = "";
      for (let N = r == 2 ? 1 : 0; N < w.length; N++) {
        let ve = w[N], ke = de[N], Be = ke == null ? null : r == 1 ? t[N][ke] : t[N][1][ke], fe = O.dataIdx(n, N, u, x), Ae = fe == null ? null : r == 1 ? t[N][fe] : t[N][1][fe];
        if (ft = ft || Ae != Be || fe != ke, de[N] = fe, N > 0 && ve.show) {
          let ot = fe == null ? -10 : fe == u ? P : z(r == 1 ? t[0][fe] : t[N][0][fe], k, m, 0), Ke = Ae == null ? -10 : V(Ae, r == 1 ? S[ve.scale] : S[ve.facets[1].scale], v, 0);
          if (Yi && Ae != null) {
            let gt = k.ori == 1 ? be : $e, At = De(Ht.dist(n, N, fe, Ke, gt));
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
          if (ft || Ki) {
            let gt, At;
            k.ori == 0 ? (gt = ot, At = Ke) : (gt = Ke, At = ot);
            let Ft, st, mt, Et, Bt, qe, lt = !0, Ci = je.bbox;
            if (Ci != null) {
              lt = !1;
              let Ze = Ci(n, N);
              mt = Ze.left, Et = Ze.top, Ft = Ze.width, st = Ze.height;
            } else
              mt = gt, Et = At, Ft = st = je.size(n, N);
            if (qe = je.fill(n, N), Bt = je.stroke(n, N), Ki)
              N == ci && Jt <= Ht.prox && (T = mt, M = Et, W = Ft, ae = st, se = lt, ee = qe, I = Bt);
            else {
              let Ze = pt[N];
              Ze != null && (qi[N] = mt, Zi[N] = Et, Zs(Ze, Ft, st, lt), Ks(Ze, qe, Bt), Ut(Ze, vt(mt), vt(Et), q, C));
            }
          }
        }
      }
      if (Ki) {
        let N = Ht.prox, ve = Pi == null ? Jt <= N : Jt > N || ci != Pi;
        if (ft || ve) {
          let ke = pt[0];
          ke != null && (qi[0] = T, Zi[0] = M, Zs(ke, W, ae, se), Ks(ke, ee, I), Ut(ke, vt(T), vt(M), q, C));
        }
      }
    }
    if (_e.show && li)
      if (o != null) {
        let [y, x] = Ee.scales, [P, T] = Ee.match, [M, W] = o.cursor.sync.scales, ae = o.cursor.drag;
        if (Le = ae._x, Re = ae._y, Le || Re) {
          let { left: se, top: ee, width: I, height: N } = o.select, ve = o.scales[M].ori, ke = o.posToVal, Be, fe, Ae, ot, Ke, gt = y != null && P(y, M), At = x != null && T(x, W);
          gt && Le ? (ve == 0 ? (Be = se, fe = I) : (Be = ee, fe = N), Ae = S[y], ot = z(ke(Be, M), Ae, m, 0), Ke = z(ke(Be + fe, M), Ae, m, 0), Mn(Mt(ot, Ke), De(Ke - ot))) : Mn(0, m), At && Re ? (ve == 1 ? (Be = se, fe = I) : (Be = ee, fe = N), Ae = S[x], ot = V(ke(Be, W), Ae, v, 0), Ke = V(ke(Be + fe, W), Ae, v, 0), Dn(Mt(ot, Ke), De(Ke - ot))) : Dn(0, v);
        } else
          Qr();
      } else {
        let y = De(hs - cs), x = De(ds - us);
        if (k.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        Le = Ie.x && y >= Ie.dist, Re = Ie.y && x >= Ie.dist;
        let P = Ie.uni;
        P != null ? Le && Re && (Le = y >= P, Re = x >= P, !Le && !Re && (x > y ? Re = !0 : Le = !0)) : Ie.x && Ie.y && (Le || Re) && (Le = Re = !0);
        let T, M;
        Le && (k.ori == 0 ? (T = nn, M = be) : (T = rn, M = $e), Mn(Mt(T, M), De(M - T)), Re || Dn(0, v)), Re && (k.ori == 1 ? (T = nn, M = be) : (T = rn, M = $e), Dn(Mt(T, M), De(M - T)), Le || Mn(0, m)), !Le && !Re && (Mn(0, 0), Dn(0, 0));
      }
    if (Ie._x = Le, Ie._y = Re, o == null) {
      if (c) {
        if (ks != null) {
          let [y, x] = Ee.scales;
          Ee.values[0] = y != null ? Rt(k.ori == 0 ? be : $e, y) : null, Ee.values[1] = x != null ? Rt(k.ori == 1 ? be : $e, x) : null;
        }
        On(ro, n, be, $e, q, C, u);
      }
      if (Yi) {
        let y = c && Ee.setSeries, x = Ht.prox;
        Pi == null ? Jt <= x && Lt(ci, sn, !0, y) : Jt > x ? Lt(null, sn, !0, y) : ci != Pi && Lt(ci, sn, !0, y);
      }
    }
    ft && (X.idx = u, qr()), a !== !1 && Fe("setCursor");
  }
  let ui = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ui == null && zn(!1), ui;
    }
  });
  function zn(o = !1) {
    o ? ui = null : (ui = E.getBoundingClientRect(), Fe("syncRect", ui));
  }
  function gs(o, a, c, u, f, m, v) {
    O._lock || li && o != null && o.movementX == 0 && o.movementY == 0 || (Zr(o, a, c, u, f, m, v, !1, o != null), o != null ? Ti(null, !0, !0) : Ti(a, !0, !1));
  }
  function Zr(o, a, c, u, f, m, v, y, x) {
    if (ui == null && zn(!1), Ai(o), o != null)
      c = o.clientX - ui.left, u = o.clientY - ui.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [P, T] = Ee.scales, M = a.cursor.sync, [W, ae] = M.values, [se, ee] = M.scales, [I, N] = Ee.match, ve = a.axes[0].side % 2 == 1, ke = k.ori == 0 ? q : C, Be = k.ori == 1 ? q : C, fe = ve ? m : f, Ae = ve ? f : m, ot = ve ? u : c, Ke = ve ? c : u;
      if (se != null ? c = I(P, se) ? h(W, S[P], ke, 0) : -10 : c = ke * (ot / fe), ee != null ? u = N(T, ee) ? h(ae, S[T], Be, 0) : -10 : u = Be * (Ke / Ae), k.ori == 1) {
        let gt = c;
        c = u, u = gt;
      }
    }
    x && (a == null || a.cursor.event.type == ro) && ((c <= 1 || c >= q - 1) && (c = Di(c, q)), (u <= 1 || u >= C - 1) && (u = Di(u, C))), y ? (cs = c, us = u, [nn, rn] = O.move(n, c, u)) : (be = c, $e = u);
  }
  const Jr = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Qr() {
    sr(Jr, !1);
  }
  let ms, bs, _s, vs;
  function ys(o, a, c, u, f, m, v) {
    li = !0, Le = Re = Ie._x = Ie._y = !1, Zr(o, a, c, u, f, m, v, !0, !1), o != null && (Ye(oo, bo, ws, !1), On(Us, n, nn, rn, q, C, null));
    let { left: y, top: x, width: P, height: T } = _e;
    ms = y, bs = x, _s = P, vs = T;
  }
  function ws(o, a, c, u, f, m, v) {
    li = Ie._x = Ie._y = !1, Zr(o, a, c, u, f, m, v, !1, !0);
    let { left: y, top: x, width: P, height: T } = _e, M = P > 0 || T > 0, W = ms != y || bs != x || _s != P || vs != T;
    if (M && W && sr(_e), Ie.setScale && M && W) {
      let ae = y, se = P, ee = x, I = T;
      if (k.ori == 1 && (ae = x, se = T, ee = y, I = P), Le && ai(
        D,
        Rt(ae, D),
        Rt(ae + se, D)
      ), Re)
        for (let N in S) {
          let ve = S[N];
          N != D && ve.from == null && ve.min != pe && ai(
            N,
            Rt(ee + I, N),
            Rt(ee, N)
          );
        }
      Qr();
    } else O.lock && (O._lock = !O._lock, Ti(a, !0, o != null));
    o != null && (Vi(oo, bo), On(oo, n, be, $e, q, C, null));
  }
  function Xa(o, a, c, u, f, m, v) {
    if (O._lock)
      return;
    Ai(o);
    let y = li;
    if (li) {
      let x = !0, P = !0, T = 10, M, W;
      k.ori == 0 ? (M = Le, W = Re) : (M = Re, W = Le), M && W && (x = be <= T || be >= q - T, P = $e <= T || $e >= C - T), M && x && (be = be < nn ? 0 : q), W && P && ($e = $e < rn ? 0 : C), Ti(null, !0, !0), li = !1;
    }
    be = -10, $e = -10, de.fill(null), Ti(null, !0, !0), y && (li = y);
  }
  function xs(o, a, c, u, f, m, v) {
    O._lock || (Ai(o), Or(), Qr(), o != null && On(Vs, n, be, $e, q, C, null));
  }
  function $s() {
    F.forEach(Yh), zr(n.width, n.height, !0);
  }
  Hi(_r, dn, $s);
  const ln = {};
  ln.mousedown = ys, ln.mousemove = gs, ln.mouseup = ws, ln.dblclick = xs, ln.setSeries = (o, a, c, u) => {
    let f = Ee.match[2];
    c = f(n, a, c), c != -1 && Lt(c, u, !0, !1);
  }, Ge && (Ye(Us, E, ys), Ye(ro, E, gs), Ye(Is, E, (o) => {
    Ai(o), zn(!1);
  }), Ye(js, E, Xa), Ye(Vs, E, xs), ko.add(n), n.syncRect = zn);
  const lr = n.hooks = e.hooks || {};
  function Fe(o, a, c) {
    Wr ? Cn.push([o, a, c]) : o in lr && lr[o].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((o) => {
    for (let a in o.hooks)
      lr[a] = (lr[a] || []).concat(o.hooks[a]);
  });
  const Ss = (o, a, c) => c, Ee = Pe({
    key: null,
    setSeries: !1,
    filters: {
      pub: tl,
      sub: tl
    },
    scales: [D, w[1] ? w[1].scale : null],
    match: [il, il, Ss],
    values: [null, null]
  }, O.sync);
  Ee.match.length == 2 && Ee.match.push(Ss), O.sync = Ee;
  const ks = Ee.key, Xr = pa(ks);
  function On(o, a, c, u, f, m, v) {
    Ee.filters.pub(o, a, c, u, f, m, v) && Xr.pub(o, a, c, u, f, m, v);
  }
  Xr.sub(n);
  function ec(o, a, c, u, f, m, v) {
    Ee.filters.sub(o, a, c, u, f, m, v) && ln[o](null, a, c, u, f, m, v);
  }
  n.pub = ec;
  function tc() {
    Xr.unsub(n), ko.delete(n), wi.clear(), yo(_r, dn, $s), p.remove(), ue?.remove(), Fe("destroy");
  }
  n.destroy = tc;
  function eo() {
    Fe("init", e, t), ts(t || e.data, !1), R[D] ? Gr(D, R[D]) : Or(), er = _e.show && (_e.width > 0 || _e.height > 0), ki = ft = !0, zr(e.width, e.height);
  }
  return w.forEach(Xo), F.forEach(za), i ? i instanceof HTMLElement ? (i.appendChild(p), eo()) : i(n, eo) : eo(), n;
}
Ve.assign = Pe;
Ve.fmtNum = Bo;
Ve.rangeNum = vr;
Ve.rangeLog = Sr;
Ve.rangeAsinh = Ro;
Ve.orient = Ui;
Ve.pxRatio = ce;
Ve.join = Ru;
Ve.fmtDate = Io, Ve.tzDate = qu;
Ve.sync = pa;
{
  Ve.addGap = Mh, Ve.clipGaps = Er;
  let e = Ve.paths = {
    points: ya
  };
  e.linear = xa, e.stepped = Oh, e.bars = Nh, e.spline = Lh;
}
const Kh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var qh = Object.defineProperty, Zh = Object.getOwnPropertyDescriptor, Yt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Zh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && qh(t, i, r), r;
};
const Jh = 24;
let wt = class extends ze {
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
    const e = /* @__PURE__ */ new Date(), t = new Date(e.getTime() - Jh * 60 * 60 * 1e3), i = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
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
    const n = [...i].sort((s, l) => s - l), r = e.map((s) => {
      let l = -1, h = null;
      return n.map((d) => {
        for (; l + 1 < s.length && s[l + 1][0] <= d; )
          l++, h = s[l][1];
        return h;
      });
    });
    return [n, ...r];
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(e, t) {
    if (!e) return [];
    const i = [...e].sort((r, s) => r.lu - s.lu), n = [];
    for (let r = 0; r < i.length; r++) {
      const s = i[r].lu, l = i[r + 1]?.lu ?? t, h = i[r].s;
      (h === "heating" || h === "cooling") && n.push({ start: s, end: l, action: h });
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), i = this._numericSeries(e[this.roomEntity]), n = this._numericSeries(e[this.lowEntity]), r = this._numericSeries(e[this.highEntity]);
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && r.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([i, n, r], t), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Ve(l, s, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = getComputedStyle(this), i = t.getPropertyValue("--cb-action-heating").trim() || "#d9603f", n = t.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", r = t.getPropertyValue("--primary-color").trim() || "#03a9f4";
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
          stroke: r,
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
            const h = s.bbox.top, d = s.bbox.height;
            l.save();
            for (const p of this._intervals) {
              const b = s.valToPos(p.start, "x", !0), g = s.valToPos(p.end, "x", !0);
              g <= b || (l.fillStyle = p.action === "heating" ? Sl(i, 0.18) : Sl(n, 0.18), l.fillRect(b, h, g - b, d));
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
    return !this.hass || !this.roomEntity ? A`<div class="status">No room temperature sensor for this zone.</div>` : A`
      ${this._loading ? A`<div class="status">Loading 24 h history…</div>` : G}
      ${this._error ? A`<div class="status">${this._error}</div>` : G}
      ${this._empty ? A`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : G}
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
  Xe,
  Cl(Kh),
  We`
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
  U({ attribute: !1 })
], wt.prototype, "hass", 2);
Yt([
  U({ type: String })
], wt.prototype, "roomEntity", 2);
Yt([
  U({ type: String })
], wt.prototype, "lowEntity", 2);
Yt([
  U({ type: String })
], wt.prototype, "highEntity", 2);
Yt([
  U({ type: String })
], wt.prototype, "actionEntity", 2);
Yt([
  re()
], wt.prototype, "_loading", 2);
Yt([
  re()
], wt.prototype, "_error", 2);
Yt([
  re()
], wt.prototype, "_empty", 2);
Yt([
  yn(".chart-host")
], wt.prototype, "_host", 2);
wt = Yt([
  Qe("comfort-band-history-chart")
], wt);
function Sl(e, t) {
  const i = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), d = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${d}, ${t})`;
  }
  const r = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return r ? `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${t})` : i;
}
var Qh = Object.defineProperty, Xh = Object.getOwnPropertyDescriptor, qo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Xh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Qh(t, i, r), r;
};
let Kn = class extends ze {
  render() {
    const e = this.entities?.roomTemperature;
    return e ? A`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${G}
    ` : A`<div class="empty">No room temperature sensor for this zone.</div>`;
  }
};
Kn.styles = [
  Xe,
  We`
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
qo([
  U({ attribute: !1 })
], Kn.prototype, "hass", 2);
qo([
  U({ attribute: !1 })
], Kn.prototype, "entities", 2);
Kn = qo([
  Qe("comfort-band-insights-tab")
], Kn);
var ed = Object.defineProperty, td = Object.getOwnPropertyDescriptor, kn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? td(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ed(t, i, r), r;
};
const Xt = 15, jt = 0.5, Qt = 14, It = 28, kl = 4, id = 500, cn = 600, hr = 200, Al = 0, Eo = 24 * 60 - Xt, uo = [0, 6, 12, 18, 24], El = [14, 18, 22, 26];
function Tt(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function ho(e) {
  const t = Math.max(0, Math.min(Eo, e)), i = Math.floor(t / 60), n = t % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function nd(e) {
  return Math.round(e / Xt) * Xt;
}
function fo(e) {
  return Math.round(e / jt) * jt;
}
function bt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let mi = class extends ze {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (e, t, i) => {
      e.stopPropagation(), e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
      const r = {
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
      r.longPressTimer = window.setTimeout(() => {
        r.longPressTimer = null, this._drag === r && !r.moved && (r.longPressed = !0, this._fire("transition-delete", { at: r.origin.at }));
      }, id), this._drag = r;
    }, this._onHandlePointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle" || t.longPressed) return;
      const i = e.clientX - t.startX, n = e.clientY - t.startY;
      if (!t.moved && Math.hypot(i, n) < kl) return;
      t.moved || (t.moved = !0, t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null));
      const r = this._svg();
      if (!r) {
        this._preview = { at: t.origin.at, low: t.origin.low, high: t.origin.high };
        return;
      }
      const s = r.getBoundingClientRect(), l = bt(
        this._clientToMinutes(e.clientX, s),
        t.range.min,
        t.range.max
      ), h = this._clientToTemp(e.clientY, s);
      let d = t.origin.low, p = t.origin.high;
      t.handle === "low" ? d = bt(h, Qt, p - jt) : p = bt(h, d + jt, It), this._preview = { at: ho(l), low: d, high: p };
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
      Math.hypot(i, n) >= kl && (t.moved = !0);
    }, this._onBackgroundPointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty")
        return;
      const i = this._svg();
      try {
        i?.releasePointerCapture(e.pointerId);
      } catch {
      }
      const n = t.moved, r = e.type === "pointercancel";
      if (this._drag = null, r || n || !i) return;
      const s = i.getBoundingClientRect(), l = bt(this._clientToMinutes(e.clientX, s), Al, Eo);
      for (const b of this.transitions) if (Tt(b.at) === l) return;
      const h = this._clientToTemp(e.clientY, s), d = bt(fo(h - 1.5), Qt, It - jt), p = bt(fo(h + 1.5), d + jt, It);
      this._fire("transition-add", { at: ho(l), low: d, high: p });
    }, this._onHandleKeyDown = (e, t, i) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(), this._fire("transition-edit", { transition: t });
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault(), this._fire("transition-delete", { at: t.at });
        return;
      }
      let n = 0, r = 0;
      switch (e.key) {
        case "ArrowLeft":
          n = -Xt;
          break;
        case "ArrowRight":
          n = Xt;
          break;
        case "ArrowUp":
          r = jt;
          break;
        case "ArrowDown":
          r = -jt;
          break;
        default:
          return;
      }
      e.preventDefault();
      const s = this._timeRangeFor(t.at), l = bt(Tt(t.at) + n, s.min, s.max);
      let h = t.low, d = t.high;
      if (i === "low" ? h = bt(t.low + r, Qt, d - jt) : d = bt(t.high + r, h + jt, It), l === Tt(t.at) && h === t.low && d === t.high)
        return;
      const p = ho(l);
      this._focusedAt === t.at && (this._focusedAt = p), this._fire("transition-update", {
        oldAt: t.at,
        transition: { at: p, low: h, high: d }
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
    return e / (24 * 60) * cn;
  }
  _tempToY(e) {
    const t = bt(e, Qt, It);
    return hr - (t - Qt) / (It - Qt) * hr;
  }
  _clientToMinutes(e, t) {
    if (t.width === 0) return 0;
    const i = bt((e - t.left) / t.width, 0, 1);
    return nd(i * 24 * 60);
  }
  _clientToTemp(e, t) {
    if (t.height === 0) return Qt;
    const i = bt((e - t.top) / t.height, 0, 1), n = It - i * (It - Qt);
    return fo(n);
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
    let n = Al, r = Eo;
    for (const s of i)
      s < t && s + Xt > n && (n = s + Xt), s > t && s - Xt < r && (r = s - Xt);
    return { min: n, max: r };
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
    let r = i;
    for (const s of e) {
      const l = this._timeToX(Tt(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[t])]), r = s[t];
    }
    return n.push([cn, this._tempToY(r)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([r, s]) => `L ${r} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = this._renderedTransitions(), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], r = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return A`
      <div class="chart">
        <svg
          viewBox="0 0 ${cn} ${hr}"
          preserveAspectRatio="none"
          role="group"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          <title>Schedule chart for the active profile</title>
          ${El.map(
      (h) => fi`<line class="grid" x1="0" x2=${cn} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${uo.map(
      (h) => fi`<line class="grid" y1="0" y2=${hr} x1=${h / 24 * cn} x2=${h / 24 * cn}></line>`
    )}
          ${e.length > 0 ? fi`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const d = this._timeToX(Tt(h.at)), p = this._tempToY(h.low), b = this._tempToY(h.high), g = this._focusedAt === h.at && this._focusedHandle === "low", _ = this._focusedAt === h.at && this._focusedHandle === "high", $ = this._drag?.kind === "handle" && this._drag.origin.at === h.at ? this._drag.handle : null, E = `Low handle at ${h.at}, ${h.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, H = `High handle at ${h.at}, ${h.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, B = `handle low${g ? " focused" : ""}${$ === "low" ? " dragging" : ""}`, j = `handle high${_ ? " focused" : ""}${$ === "high" ? " dragging" : ""}`;
      return fi`
              <circle
                class=${B}
                cx=${d}
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
                class=${j}
                cx=${d}
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
        ${El.map(
      (h) => A`<div
              class="axis-label y"
              style="top: ${(It - h) / (It - Qt) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${uo.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === uo.length - 1 ? "axis-label x end" : "axis-label x";
      return A`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
        ${this.transitions.length === 0 ? A`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
mi.styles = [
  Xe,
  We`
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
kn([
  U({ type: Array })
], mi.prototype, "transitions", 2);
kn([
  re()
], mi.prototype, "_drag", 2);
kn([
  re()
], mi.prototype, "_preview", 2);
kn([
  re()
], mi.prototype, "_focusedAt", 2);
kn([
  re()
], mi.prototype, "_focusedHandle", 2);
mi = kn([
  Qe("comfort-band-schedule-chart")
], mi);
var rd = Object.defineProperty, od = Object.getOwnPropertyDescriptor, vi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? od(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && rd(t, i, r), r;
};
let Vt = class extends ze {
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
    return A`
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
      ${this._error ? A`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : A`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Vt.styles = [
  Xe,
  We`
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
vi([
  U({ type: Object })
], Vt.prototype, "transition", 2);
vi([
  U({ type: Boolean })
], Vt.prototype, "isNew", 2);
vi([
  re()
], Vt.prototype, "_at", 2);
vi([
  re()
], Vt.prototype, "_low", 2);
vi([
  re()
], Vt.prototype, "_high", 2);
vi([
  re()
], Vt.prototype, "_error", 2);
vi([
  yn('input[name="at"]')
], Vt.prototype, "_atInput", 2);
Vt = vi([
  Qe("transition-edit-dialog")
], Vt);
var sd = Object.defineProperty, ld = Object.getOwnPropertyDescriptor, Kt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ld(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && sd(t, i, r), r;
};
function po(e, t) {
  return Tt(e.at) - Tt(t.at);
}
let xt = class extends ze {
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
      const { oldAt: t, transition: i } = e.detail, n = this._transitions.filter((r) => r.at !== t && r.at !== i.at).concat(i).sort(po);
      await this._writeSchedule(n);
    }, this._onDialogSave = async (e) => {
      const t = e.detail.transition, i = [];
      if (this._mode === "edit" && this._editing) {
        const n = this._editing.at;
        for (const r of this._transitions)
          r.at !== n && r.at !== t.at && i.push(r);
        i.push(t);
      } else {
        for (const n of this._transitions)
          n.at !== t.at && i.push(n);
        i.push(t);
      }
      i.sort(po), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = Pl(this.hass) ?? "home", this._subscribe());
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Pl(this.hass);
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
      const t = await zc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(po) : [], this._loading = !1);
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
      await Oc(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return G;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? ad(this._transitions),
        high: this._newHigh ?? cd(this._transitions)
      };
      return A`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return A`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? A`<div class="loading">Loading schedule…</div>` : this._error ? A`<div class="error" role="alert">${this._error}</div>` : A`
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
    return this._transitions.length === 0 ? G : A`
      <ul class="list">
        ${this._transitions.map((e) => {
      const t = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: e } }));
      return A`
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
  Xe,
  We`
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
  U({ attribute: !1 })
], xt.prototype, "hass", 2);
Kt([
  U({ type: String })
], xt.prototype, "zone", 2);
Kt([
  re()
], xt.prototype, "_profile", 2);
Kt([
  re()
], xt.prototype, "_transitions", 2);
Kt([
  re()
], xt.prototype, "_loading", 2);
Kt([
  re()
], xt.prototype, "_error", 2);
Kt([
  re()
], xt.prototype, "_mode", 2);
Kt([
  re()
], xt.prototype, "_editing", 2);
Kt([
  re()
], xt.prototype, "_newAt", 2);
xt = Kt([
  Qe("comfort-band-schedule-tab")
], xt);
function Pl(e) {
  const t = Fl(e);
  return t ? e.states[t]?.state ?? null : null;
}
function ad(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function cd(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var ud = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, An = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? hd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ud(t, i, r), r;
};
let bi = class extends ze {
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
    if (!this.hass || !this.entities) return G;
    const e = this.entities.useApparentTemperature, t = this.entities.learningEnabled;
    if (e === null || t === null)
      return A`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const n = (this.entities.roomTemperature ? this.hass.states[this.entities.roomTemperature] : void 0)?.attributes.humidity_sensor;
    return A`
      ${this._error ? A`<div class="error" role="alert">${this._error}</div>` : G}
      ${e !== null ? this._renderToggle({
      entityId: e,
      title: "Use apparent temperature",
      desc: A`When on, heating and cooling decisions use the humidity-adjusted "feels like"
            value instead of the raw sensor. Falls back to the raw value automatically if the
            humidity sensor is unavailable.`
    }) : G}
      ${t !== null ? this._renderToggle({
      entityId: t,
      title: "Learning enabled",
      desc: A`Reserved for upcoming features (suggested-schedule nudges, predictive
            control). Has no effect today.`
    }) : G}
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">
            Configure via Settings → Devices &amp; Services → Comfort Band → Configure.
          </div>
        </div>
        <div class="info-value ${n ? "" : "unconfigured"}">
          ${n ?? "Not configured"}
        </div>
      </div>
    `;
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), i = this._pendingByEntity[e.entityId] !== void 0;
    return A`
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
bi.styles = [
  Xe,
  We`
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
An([
  U({ attribute: !1 })
], bi.prototype, "hass", 2);
An([
  U({ type: String })
], bi.prototype, "zone", 2);
An([
  U({ attribute: !1 })
], bi.prototype, "entities", 2);
An([
  re()
], bi.prototype, "_pendingByEntity", 2);
An([
  re()
], bi.prototype, "_error", 2);
bi = An([
  Qe("comfort-band-settings-tab")
], bi);
var dd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, yi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? fd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && dd(t, i, r), r;
};
const pd = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" }
];
let Wt = class extends ze {
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
    if (!this._isOpen) return G;
    const e = this.zoneName || this.zone || "Comfort Band";
    return A`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${pd.map(
      (t) => A`
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
        return A`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return A`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return A`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "settings":
        return A`<comfort-band-settings-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`;
      case "insights":
        return A`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Wt.styles = [
  Xe,
  We`
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
yi([
  U({ attribute: !1 })
], Wt.prototype, "hass", 2);
yi([
  U({ type: String })
], Wt.prototype, "zone", 2);
yi([
  U({ type: String })
], Wt.prototype, "zoneName", 2);
yi([
  U({ attribute: !1 })
], Wt.prototype, "entities", 2);
yi([
  re()
], Wt.prototype, "_activeTab", 2);
yi([
  re()
], Wt.prototype, "_isOpen", 2);
yi([
  yn("dialog")
], Wt.prototype, "_dialog", 2);
Wt = yi([
  Qe("comfort-band-modal")
], Wt);
var gd = Object.defineProperty, md = Object.getOwnPropertyDescriptor, Zo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? md(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && gd(t, i, r), r;
};
let qn = class extends ze {
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
      return A`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return A`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? A`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (i) => A` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
qn.styles = [
  Xe,
  We`
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
Zo([
  U({ attribute: !1 })
], qn.prototype, "hass", 2);
Zo([
  U({ attribute: !1 })
], qn.prototype, "config", 2);
qn = Zo([
  Qe("comfort-band-card-editor")
], qn);
var bd = Object.defineProperty, _d = Object.getOwnPropertyDescriptor, Mr = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? _d(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && bd(t, i, r), r;
};
let vn = class extends ze {
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
        for (const [n, r] of i.identifiers)
          if (n === "comfort_band" && r.startsWith("zone:")) {
            t = r.slice(5);
            break;
          }
        if (t) break;
      }
    return { type: "custom:comfort-band-card", zone: t };
  }
  render() {
    if (!this._config || !this.hass) return A``;
    const e = this._config.zone, t = Zc(this.hass, e);
    if (t.deviceId === null)
      return A`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, t);
    return A`
      <comfort-band-tile
        zoneName=${r.zoneName}
        .roomTemp=${r.roomTemp}
        .low=${r.low}
        .high=${r.high}
        .action=${r.action}
        .overrideActive=${r.overrideActive}
        .overrideEnds=${r.overrideEnds}
        .noExpand=${i}
        .variant=${n}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${i ? null : A`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${r.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const i = (r) => r !== null ? e.states[r] : void 0, n = (r) => {
      const s = i(r);
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
vn.styles = [
  Xe,
  We`
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
Mr([
  U({ attribute: !1 })
], vn.prototype, "hass", 2);
Mr([
  re()
], vn.prototype, "_config", 2);
Mr([
  yn("comfort-band-modal")
], vn.prototype, "_modal", 2);
vn = Mr([
  Qe("comfort-band-card")
], vn);
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
