const vr = globalThis, Fo = vr.ShadowRoot && (vr.ShadyCSS === void 0 || vr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Io = Symbol(), Us = /* @__PURE__ */ new WeakMap();
let Zl = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Io) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Fo && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Us.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Us.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bo = (e) => new Zl(typeof e == "string" ? e : e + "", void 0, Io), Ne = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new Zl(i, e, Io);
}, Dc = (e, t) => {
  if (Fo) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = vr.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Vs = Fo ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Bo(i);
})(e) : e;
const { is: zc, defineProperty: Mc, getOwnPropertyDescriptor: Nc, getOwnPropertyNames: Oc, getOwnPropertySymbols: Lc, getPrototypeOf: Hc } = Object, Cr = globalThis, Ws = Cr.trustedTypes, Rc = Ws ? Ws.emptyScript : "", Fc = Cr.reactiveElementPolyfillSupport, Un = (e, t) => e, wr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Rc : null;
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
} }, jo = (e, t) => !zc(e, t), Gs = { attribute: !0, type: String, converter: wr, reflect: !1, useDefault: !1, hasChanged: jo };
Symbol.metadata ??= Symbol("metadata"), Cr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let dn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Gs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && Mc(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: s } = Nc(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Gs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Un("elementProperties"))) return;
    const t = Hc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Un("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Un("properties"))) {
      const i = this.properties, n = [...Oc(i), ...Lc(i)];
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
      for (const r of n) i.unshift(Vs(r));
    } else t !== void 0 && i.push(Vs(t));
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
    return Dc(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : wr).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : wr;
      this._$Em = r;
      const h = l.fromAttribute(i, s.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, r = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? jo)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
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
dn.elementStyles = [], dn.shadowRootOptions = { mode: "open" }, dn[Un("elementProperties")] = /* @__PURE__ */ new Map(), dn[Un("finalized")] = /* @__PURE__ */ new Map(), Fc?.({ ReactiveElement: dn }), (Cr.reactiveElementVersions ??= []).push("2.1.2");
const Uo = globalThis, Ks = (e) => e, xr = Uo.trustedTypes, qs = xr ? xr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Jl = "$lit$", di = `lit$${Math.random().toFixed(9).slice(2)}$`, Ql = "?" + di, Ic = `<${Ql}>`, Hi = document, Gn = () => Hi.createComment(""), Kn = (e) => e === null || typeof e != "object" && typeof e != "function", Vo = Array.isArray, Bc = (e) => Vo(e) || typeof e?.[Symbol.iterator] == "function", uo = `[ 	
\f\r]`, Ln = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ys = /-->/g, Zs = />/g, Ti = RegExp(`>|${uo}(?:([^\\s"'>=/]+)(${uo}*=${uo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Js = /'/g, Qs = /"/g, Xl = /^(?:script|style|textarea|title)$/i, ea = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), y = ea(1), fi = ea(2), mn = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), Xs = /* @__PURE__ */ new WeakMap(), Ni = Hi.createTreeWalker(Hi, 129);
function ta(e, t) {
  if (!Vo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qs !== void 0 ? qs.createHTML(t) : t;
}
const jc = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Ln;
  for (let h = 0; h < i; h++) {
    const d = e[h];
    let p, b, m = -1, _ = 0;
    for (; _ < d.length && (l.lastIndex = _, b = l.exec(d), b !== null); ) _ = l.lastIndex, l === Ln ? b[1] === "!--" ? l = Ys : b[1] !== void 0 ? l = Zs : b[2] !== void 0 ? (Xl.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = Ti) : b[3] !== void 0 && (l = Ti) : l === Ti ? b[0] === ">" ? (l = r ?? Ln, m = -1) : b[1] === void 0 ? m = -2 : (m = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Ti : b[3] === '"' ? Qs : Js) : l === Qs || l === Js ? l = Ti : l === Ys || l === Zs ? l = Ln : (l = Ti, r = void 0);
    const k = l === Ti && e[h + 1].startsWith("/>") ? " " : "";
    s += l === Ln ? d + Ic : m >= 0 ? (n.push(p), d.slice(0, m) + Jl + d.slice(m) + di + k) : d + di + (m === -2 ? h : k);
  }
  return [ta(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class qn {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, d = this.parts, [p, b] = jc(t, i);
    if (this.el = qn.createElement(p, n), Ni.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (r = Ni.nextNode()) !== null && d.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const m of r.getAttributeNames()) if (m.endsWith(Jl)) {
          const _ = b[l++], k = r.getAttribute(m).split(di), E = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: s, name: E[2], strings: k, ctor: E[1] === "." ? Vc : E[1] === "?" ? Wc : E[1] === "@" ? Gc : Tr }), r.removeAttribute(m);
        } else m.startsWith(di) && (d.push({ type: 6, index: s }), r.removeAttribute(m));
        if (Xl.test(r.tagName)) {
          const m = r.textContent.split(di), _ = m.length - 1;
          if (_ > 0) {
            r.textContent = xr ? xr.emptyScript : "";
            for (let k = 0; k < _; k++) r.append(m[k], Gn()), Ni.nextNode(), d.push({ type: 2, index: ++s });
            r.append(m[_], Gn());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ql) d.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = r.data.indexOf(di, m + 1)) !== -1; ) d.push({ type: 7, index: s }), m += di.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Hi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function gn(e, t, i = e, n) {
  if (t === mn) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Kn(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = gn(e, r._$AS(e, t.values), r, n)), t;
}
class Uc {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? Hi).importNode(i, !0);
    Ni.currentNode = r;
    let s = Ni.nextNode(), l = 0, h = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let p;
        d.type === 2 ? p = new Xn(s, s.nextSibling, this, t) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (p = new Kc(s, this, t)), this._$AV.push(p), d = n[++h];
      }
      l !== d?.index && (s = Ni.nextNode(), l++);
    }
    return Ni.currentNode = Hi, r;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Xn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, r) {
    this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = gn(this, t, i), Kn(t) ? t === F || t == null || t === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : t !== this._$AH && t !== mn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Bc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== F && Kn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Hi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = qn.createElement(ta(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new Uc(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Xs.get(t.strings);
    return i === void 0 && Xs.set(t.strings, i = new qn(t)), i;
  }
  k(t) {
    Vo(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of t) r === i.length ? i.push(n = new Xn(this.O(Gn()), this.O(Gn()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ks(t).nextSibling;
      Ks(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Tr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, r, s) {
    this.type = 1, this._$AH = F, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = F;
  }
  _$AI(t, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = gn(this, t, i, 0), l = !Kn(t) || t !== this._$AH && t !== mn, l && (this._$AH = t);
    else {
      const h = t;
      let d, p;
      for (t = s[0], d = 0; d < s.length - 1; d++) p = gn(this, h[n + d], i, d), p === mn && (p = this._$AH[d]), l ||= !Kn(p) || p !== this._$AH[d], p === F ? t = F : t !== F && (t += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Vc extends Tr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === F ? void 0 : t;
  }
}
class Wc extends Tr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== F);
  }
}
class Gc extends Tr {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = gn(this, t, i, 0) ?? F) === mn) return;
    const n = this._$AH, r = t === F && n !== F || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== F && (n === F || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    gn(this, t);
  }
}
const qc = Uo.litHtmlPolyfillSupport;
qc?.(qn, Xn), (Uo.litHtmlVersions ??= []).push("3.3.2");
const Yc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Xn(t.insertBefore(Gn(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const Wo = globalThis;
class Ee extends dn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Yc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return mn;
  }
}
Ee._$litElement$ = !0, Ee.finalized = !0, Wo.litElementHydrateSupport?.({ LitElement: Ee });
const Zc = Wo.litElementPolyfillSupport;
Zc?.({ LitElement: Ee });
(Wo.litElementVersions ??= []).push("4.2.2");
const Ve = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Jc = { attribute: !0, type: String, converter: wr, reflect: !1, hasChanged: jo }, Qc = (e = Jc, t, i) => {
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
function M(e) {
  return (t, i) => typeof i == "object" ? Qc(e, t, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
function te(e) {
  return M({ ...e, state: !0, attribute: !1 });
}
const Xc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function xn(e, t) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Xc(i, n, { get() {
      return s(this);
    } });
  };
}
const We = Ne`
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
function ia(e) {
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
function eu(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
var tu = Object.defineProperty, iu = Object.getOwnPropertyDescriptor, Ii = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? iu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && tu(t, i, r), r;
};
const So = 15, na = 28, nu = na - So;
function ho(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(So, Math.min(na, e)) - So) / nu * 100;
}
let Jt = class extends Ee {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = eu(this.action), t = ia(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? ho(this.low) : 0, l = n ? ho(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = r ? ho(this.room) : 50, b = (k) => Number.isFinite(k) ? `${k.toFixed(1)}°` : "—", m = e === "heating" || e === "cooling" ? `, ${e}` : "", _ = `Comfortable range ${b(this.low)} to ${b(this.high)}, ${this.roomLabel} ${b(this.room)}${m}`;
    return y`
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        role=${this.decorative ? F : "img"}
        aria-label=${this.decorative ? F : _}
        aria-hidden=${this.decorative ? "true" : F}
      >
        ${fi`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? fi`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${r ? fi`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${r ? fi`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
Jt.styles = [
  We,
  Ne`
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
Ii([
  M({ type: Number })
], Jt.prototype, "low", 2);
Ii([
  M({ type: Number })
], Jt.prototype, "high", 2);
Ii([
  M({ type: Number })
], Jt.prototype, "room", 2);
Ii([
  M({ type: String })
], Jt.prototype, "roomLabel", 2);
Ii([
  M({ type: Boolean })
], Jt.prototype, "decorative", 2);
Ii([
  M({ type: String })
], Jt.prototype, "action", 2);
Jt = Ii([
  Ve("band-gauge")
], Jt);
const ru = 0.5, ou = 10, su = 35;
function Yn(e) {
  return `${$r(e.low)}–${$r(e.high)}°`;
}
function $r(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function hr(e, t) {
  let i = t * ru;
  return i > 0 && (i = Math.max(0, Math.min(i, su - e.high))), i < 0 && (i = Math.min(0, Math.max(i, ou - e.low))), { low: el(e.low + i), high: el(e.high + i) };
}
function el(e) {
  return Math.round(e * 10) / 10;
}
function ra(e) {
  const { room: t, apparent: i, useApparent: n } = e, r = Number.isFinite(t) && Number.isFinite(i) && Ao(i) !== Ao(t);
  return n && Number.isFinite(i) ? {
    value: i,
    note: r ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: r ? `Feels like ${i.toFixed(1)}°` : "" };
}
function Ao(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function oa(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const i = Ao(e);
  return i < Math.round(t.low * 10) ? "below" : i > Math.round(t.high * 10) ? "above" : "in";
}
const lu = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function sa(e) {
  if (e.doing) return { kind: "adjusting", text: e.doing };
  if (!e.enabled) return { kind: "paused", text: "Paused: not controlling this room" };
  if (e.sensor === "offline")
    return { kind: "sensor", text: "On hold: the room sensor is offline" };
  if (e.sensor === "no-reading")
    return { kind: "sensor", text: "On hold: no room temperature reading" };
  const t = au(e);
  return e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${t.text}` } : t;
}
function au(e) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const t = oa(e.temperature, e.band), i = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? t === "in" ? "comfortable" : t ?? "idle" : "none", n = lu[i];
  let r;
  if (e.overrideActive) {
    const l = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    r = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${Yn(e.band)}${l}`;
  } else {
    const l = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    r = `${Yn(e.band)}${l}`;
  }
  const s = n ? `${n} · ${r}` : r.charAt(0).toUpperCase() + r.slice(1);
  return { kind: i, text: s };
}
function Go(e, t) {
  const i = new Date(e), n = t?.locale?.time_format, r = t?.locale?.language;
  let s;
  if (n === "12") s = !0;
  else if (n === "24") s = !1;
  else {
    const h = new Intl.DateTimeFormat(n === "system" ? void 0 : r, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    s = h === "h11" || h === "h12";
  }
  const l = {
    hourCycle: s ? "h12" : "h23",
    hour: s ? "numeric" : "2-digit"
  };
  return (!s || i.getMinutes() !== 0) && (l.minute = "2-digit"), new Intl.DateTimeFormat(r, l).format(i);
}
function tl(e, t) {
  const i = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!i) return e;
  const n = Number(i[1]), r = Number(i[2]);
  return n > 23 || r > 59 ? e : Go(new Date(2e3, 0, 1, n, r).getTime(), t);
}
function qt(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function dr(e, t) {
  const i = qt(e, t);
  if (!i) return NaN;
  const n = parseFloat(i.state);
  return Number.isFinite(n) ? n : NaN;
}
function la(e, t) {
  const i = qt(e, t.nextBandChange);
  if (!i) return { scheduled: null, nextChange: null };
  const n = i.attributes.scheduled, r = Date.parse(i.state);
  return {
    scheduled: typeof n == "boolean" ? n : null,
    nextChange: Number.isNaN(r) ? null : r
  };
}
function Ko(e, t) {
  const i = dr(e, t.roomTemperature), n = dr(e, t.apparentTemperature), r = qt(e, t.useApparentTemperature)?.state === "on", s = Date.parse(qt(e, t.overrideEnds)?.state ?? ""), l = qt(e, t.roomTemperature)?.attributes.source, h = l === "climate" || l === "fallback_sensor" ? l : null, d = qt(e, t.roomSensorUnavailable)?.state === "on" || h !== null, p = Number.isFinite(i) || Number.isFinite(n);
  return {
    enabled: qt(e, t.enabled)?.state !== "off",
    action: qt(e, t.currentAction)?.state ?? "unknown",
    room: i,
    apparent: n,
    useApparent: r,
    temperature: ra({ room: i, apparent: n, useApparent: r }).value,
    feelsLike: r && Number.isFinite(n),
    band: {
      low: dr(e, t.effectiveLow),
      high: dr(e, t.effectiveHigh)
    },
    overrideActive: qt(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...la(e, t),
    sensor: d ? p ? "stand-in" : "offline" : p ? "ok" : "no-reading",
    standIn: h
  };
}
function qo(e) {
  return e.enabled && (e.sensor === "ok" || e.sensor === "stand-in");
}
const ui = {
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
}, cu = {
  paused: ui.paused,
  sensor: ui.sensor,
  heating: ui.heating,
  cooling: ui.cooling,
  below: ui.below,
  above: ui.above,
  adjusted: "mdi:timer-outline"
};
function uu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !qo(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const i = oa(e.temperature, e.band);
    (i === "below" || i === "above") && t.push(i);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function hu(e) {
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
var du = Object.defineProperty, fu = Object.getOwnPropertyDescriptor, wt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? fu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && du(t, i, r), r;
};
let nt = class extends Ee {
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
    return this.variant === "mini" ? this._renderMini() : y`
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
            ${this.feelsLike ? y`<span class="sr-only"> feels like </span>` : F}${this._renderTemperature()}<span class="sr-only">. </span>
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
        ${this.statusText ? y`<div class="status ${this.statusKind}">
              <ha-icon icon=${ui[this.statusKind]} aria-hidden="true"></ha-icon>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${ia(e)}` : "", i = this._label();
    return y`
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
      (n) => y`<ha-icon
              icon=${cu[n]}
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
  We,
  Ne`
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
wt([
  M({ type: String })
], nt.prototype, "zoneName", 2);
wt([
  M({ type: Number })
], nt.prototype, "temperature", 2);
wt([
  M({ type: Boolean })
], nt.prototype, "feelsLike", 2);
wt([
  M({ type: Number })
], nt.prototype, "low", 2);
wt([
  M({ type: Number })
], nt.prototype, "high", 2);
wt([
  M({ type: String })
], nt.prototype, "action", 2);
wt([
  M({ type: String })
], nt.prototype, "statusKind", 2);
wt([
  M({ type: String })
], nt.prototype, "statusText", 2);
wt([
  M({ attribute: !1 })
], nt.prototype, "badges", 2);
wt([
  M({ type: Boolean })
], nt.prototype, "noExpand", 2);
wt([
  M({ type: String, reflect: !0 })
], nt.prototype, "variant", 2);
nt = wt([
  Ve("comfort-band-tile")
], nt);
const ei = "comfort_band";
function pu(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function mu(e, t) {
  return e.callService(ei, "set_schedule", { ...t });
}
function aa(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(ei, "start_override", i);
}
function gu(e, t) {
  return e.callService(ei, "cancel_override", { ...t });
}
function bu(e, t) {
  return e.callService(ei, "set_profile", { ...t });
}
function _u(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(ei, "create_profile", i);
}
function vu(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(ei, "clone_profile", i);
}
function yu(e, t) {
  return e.callService(ei, "rename_profile", { old: t.old, new: t.new });
}
function wu(e, t) {
  return e.callService(ei, "delete_profile", { name: t.name });
}
function xu(e, t) {
  return e.callService(ei, "record_feedback", { zone: t.zone, label: t.label });
}
var $u = Object.defineProperty, ku = Object.getOwnPropertyDescriptor, gi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ku(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && $u(t, i, r), r;
};
const Su = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], Au = 1500, Eu = 1500, Cu = 3;
let jt = class extends Ee {
  constructor() {
    super(...arguments), this.zone = "", this._feedbackConfirmed = null, this._feedbackTimer = null, this._feedbackSeq = 0, this._length = null, this._burst = null, this._burstTimer = null, this._busy = null, this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const r = this._bandInForce();
        if (!r) return;
        t = { base: r, steps: 0, picked: !1 };
      }
      const i = hr(t.base, t.steps), n = hr(t.base, t.steps + e);
      n.low === i.low && n.high === i.high || (this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), Eu));
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
      this._run(i, () => gu(e, { zone: t }));
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await xu(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, Au));
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
    return !this.hass || !this.entities ? { scheduled: null, nextChange: null } : la(this.hass, this.entities);
  }
  /** The length in force: the one picked here, else three hours. */
  _hours() {
    return this._length ?? Cu;
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
    const i = this.hass, n = this.zone;
    this._run(
      `Adjusting to ${Yn(e)}`,
      () => aa(i, { zone: n, low: e.low, high: e.high, hours: t })
    );
  }
  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    this._burst = null, e && (e.steps !== 0 ? this._sendBand(hr(e.base, e.steps), this._hours()) : e.picked && this._retime(this._hours()));
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
    if (!this.hass || !this.entities) return F;
    const e = Date.now(), t = Ko(this.hass, this.entities), { room: i, apparent: n, useApparent: r, feelsLike: s, overrideActive: l, scheduled: h } = t, { low: d, high: p } = t.band, b = ra({ room: i, apparent: n, useApparent: r }), m = hu(t), _ = this._burst, k = _ && _.steps !== 0 ? `Adjusting to ${Yn(hr(_.base, _.steps))}` : this._busy, E = sa({
      ...t,
      doing: k,
      now: e,
      formatTime: (N) => Go(N, this.hass)
    });
    return y`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(b.value) ? `${b.value.toFixed(1)}°` : "—"}</span
        >
        ${b.note ? y`<span class="note">${b.note}</span>` : F}
      </div>
      ${r && !Number.isFinite(n) && Number.isFinite(i) ? y`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : F}
      <div class="gauge-row">
        <band-gauge
          .low=${d}
          .high=${p}
          .room=${b.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${qo(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${E.kind}" role="status" aria-live="polite">
        <ha-icon icon=${ui[E.kind]} aria-hidden="true"></ha-icon>
        <span>${E.text}</span>
      </div>
      ${m ? y`<div class="notice">${m}</div>` : F}
      ${this._renderAdjust(l, h)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const i = this._busy !== null ? "true" : "false", n = this._hours();
    return y`
      <section class="adjust">
        ${t === !1 ? F : y`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${[1, 3].map(
      (s) => y`<button
                      aria-pressed=${n === s ? "true" : "false"}
                      aria-disabled=${i}
                      data-length=${s}
                      @click=${() => this._onPickLength(s)}
                    >
                      ${s} h
                    </button>`
    )}
              </div>`}
        ${this._bandInForce() !== null ? y`<div class="steps">
              <button class="cooler" aria-disabled=${i} @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" aria-disabled=${i} @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>` : F}
        ${e && t !== !1 ? y`<button class="back" aria-disabled=${i} @click=${this._onBackToSchedule}>
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>` : F}
      </section>
    `;
  }
  _renderFeedbackSection() {
    return y`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${Su.map(
      (e) => y`
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
jt.styles = [
  We,
  Ne`
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
gi([
  M({ attribute: !1 })
], jt.prototype, "hass", 2);
gi([
  M({ type: String })
], jt.prototype, "zone", 2);
gi([
  M({ attribute: !1 })
], jt.prototype, "entities", 2);
gi([
  te()
], jt.prototype, "_feedbackConfirmed", 2);
gi([
  te()
], jt.prototype, "_length", 2);
gi([
  te()
], jt.prototype, "_burst", 2);
gi([
  te()
], jt.prototype, "_busy", 2);
jt = gi([
  Ve("comfort-band-now-tab")
], jt);
var Tu = Object.defineProperty, Pu = Object.getOwnPropertyDescriptor, ca = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Pu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Tu(t, i, r), r;
};
const fr = 14, pr = 28, un = 600, mr = 200, fo = [0, 6, 12, 18, 24], il = [14, 18, 22, 26];
function Oi(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function Du(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let kr = class extends Ee {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * un;
  }
  _tempToY(e) {
    const t = Du(e, fr, pr);
    return mr - (t - fr) / (pr - fr) * mr;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const i = e[e.length - 1][t], n = [[0, this._tempToY(i)]];
    let r = i;
    for (const s of e) {
      const l = this._timeToX(Oi(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[t])]), r = s[t];
    }
    return n.push([un, this._tempToY(r)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([r, s]) => `L ${r} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, d) => Oi(h.at) - Oi(d.at)), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], r = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return y`
      <div class="chart">
        <svg
          viewBox="0 0 ${un} ${mr}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${il.map(
      (h) => fi`<line class="grid" x1="0" x2=${un} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${fo.map(
      (h) => fi`<line class="grid" y1="0" y2=${mr} x1=${h / 24 * un} x2=${h / 24 * un}></line>`
    )}
          ${t ? fi`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const d = this._timeToX(Oi(h.at));
      return fi`
              <circle class="marker low" cx=${d} cy=${this._tempToY(h.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(h.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${il.map(
      (h) => y`<div
              class="axis-label y"
              style="top: ${(pr - h) / (pr - fr) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${fo.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === fo.length - 1 ? "axis-label x end" : "axis-label x";
      return y`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
      </div>
    `;
  }
};
kr.styles = [
  We,
  Ne`
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
ca([
  M({ type: Array })
], kr.prototype, "transitions", 2);
kr = ca([
  Ve("comfort-band-schedule-chart")
], kr);
var zu = Object.defineProperty, Mu = Object.getOwnPropertyDescriptor, bi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Mu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && zu(t, i, r), r;
};
let Ut = class extends Ee {
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
    return y`
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
      ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : y`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Ut.styles = [
  We,
  Ne`
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
bi([
  M({ type: Object })
], Ut.prototype, "transition", 2);
bi([
  M({ type: Boolean })
], Ut.prototype, "isNew", 2);
bi([
  te()
], Ut.prototype, "_at", 2);
bi([
  te()
], Ut.prototype, "_low", 2);
bi([
  te()
], Ut.prototype, "_high", 2);
bi([
  te()
], Ut.prototype, "_error", 2);
bi([
  xn('input[name="at"]')
], Ut.prototype, "_atInput", 2);
Ut = bi([
  Ve("transition-edit-dialog")
], Ut);
const Pr = "comfort_band", Nu = {
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
function Ou() {
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
function Yo(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, r] of i.identifiers)
      if (n === t[0] && r === t[1])
        return i;
  return null;
}
function ua(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Pr
  );
}
function ha(e, t) {
  const i = Ou(), n = Yo(e, [Pr, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of ua(e, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = Nu[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function da(e) {
  return Yo(e, [Pr, "profile_manager"]) !== null;
}
function Zo(e) {
  const t = Yo(e, [Pr, "profile_manager"]);
  if (t === null) return null;
  for (const i of ua(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function fa(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function pa(e, t, i) {
  const n = t.name?.trim();
  if (n) return n;
  const r = i.deviceId !== null ? e.devices[i.deviceId]?.area_id : null, s = r ? e.areas?.[r]?.name?.trim() : void 0;
  return s || (i.deviceName ?? t.zone);
}
var Lu = Object.defineProperty, Hu = Object.getOwnPropertyDescriptor, Mt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Hu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Lu(t, i, r), r;
};
function nl(e, t) {
  return Oi(e.at) - Oi(t.at);
}
const po = 15, mo = 24 * 60;
function Ru(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((n) => Oi(n.at))), i = Math.max(...t);
  for (let n = 1; n <= mo / po; n++) {
    const r = (i + n * po) % mo;
    if (!t.has(r)) return rl(r);
  }
  return rl((i + po) % mo);
}
function rl(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
let ht = class extends Ee {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = Ru(this._transitions), this._newLow = ol(this._transitions), this._newHigh = sl(this._transitions), this._editing = null, this._mode = "add";
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
        for (const r of this._transitions)
          r.at !== n && r.at !== t.at && i.push(r);
        i.push(t);
      } else {
        for (const n of this._transitions)
          n.at !== t.at && i.push(n);
        i.push(t);
      }
      i.sort(nl), await this._writeSchedule(i), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = go(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = go(this.hass);
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
      const t = await pu(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(nl) : [], this._loading = !1);
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
      await mu(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return F;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? ol(this._transitions),
        high: this._newHigh ?? sl(this._transitions)
      };
      return y`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return y`
      ${this._renderHeader()}
      ${this._loading ? y`<div class="loading">Loading schedule…</div>` : this._error ? y`<div class="error" role="alert">${this._error}</div>` : y`
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
    const e = this.hass ? go(this.hass) : null;
    return !e || e === "unavailable" || e === "unknown" ? F : y`<div class="header">
      <span class="profile-label">Schedule: ${e}</span>
    </div>`;
  }
  _renderList() {
    return this._transitions.length === 0 ? y`<div class="empty">No changes yet. Use “Add a change” to create one.</div>` : y`
      <ul class="list" role="list">
        ${this._transitions.map(
      (e) => this._confirmingDeleteAt === e.at ? this._renderConfirmRow(e) : this._renderRow(e)
    )}
      </ul>
    `;
  }
  _renderRow(e) {
    const t = tl(e.at, this.hass), i = `Edit the ${t} change, ${$r(e.low)} to ${$r(e.high)} degrees`;
    return y`
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
        <span class="band">${Yn(e)}</span>
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
    const t = `Delete the ${tl(e.at, this.hass)} change?`;
    return y`
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
  We,
  Ne`
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
Mt([
  M({ attribute: !1 })
], ht.prototype, "hass", 2);
Mt([
  M({ type: String })
], ht.prototype, "zone", 2);
Mt([
  te()
], ht.prototype, "_profile", 2);
Mt([
  te()
], ht.prototype, "_transitions", 2);
Mt([
  te()
], ht.prototype, "_loading", 2);
Mt([
  te()
], ht.prototype, "_error", 2);
Mt([
  te()
], ht.prototype, "_mode", 2);
Mt([
  te()
], ht.prototype, "_editing", 2);
Mt([
  te()
], ht.prototype, "_newAt", 2);
Mt([
  te()
], ht.prototype, "_confirmingDeleteAt", 2);
ht = Mt([
  Ve("comfort-band-schedule-tab")
], ht);
function go(e) {
  const t = Zo(e);
  return t ? e.states[t]?.state ?? null : null;
}
function ol(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function sl(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Fu = Object.defineProperty, Iu = Object.getOwnPropertyDescriptor, Bi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Iu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Fu(t, i, r), r;
};
let Qt = class extends Ee {
  constructor() {
    super(...arguments), this.zone = "", this.section = "comfort", this._pendingByEntity = {}, this._error = null, this._onToggle = async (e) => {
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
    if (!this.hass || !this.entities) return F;
    const e = this.section === "comfort" ? this.entities.useApparentTemperature : this.entities.learningEnabled;
    return e === null ? y`<div class="upgrade-hint">
        ${this.section === "comfort" ? "“Feels like”" : "Learning"} needs the
        <code>comfort_band</code> integration v0.4.0 or later.
      </div>` : y`
      ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : F}
      ${this.section === "comfort" ? this._renderComfort(e) : this._renderLearning(e)}
    `;
  }
  _renderComfort(e) {
    const t = fa(this.hass, this.entities.roomTemperature);
    return y`
      ${this._renderToggle({
      entityId: e,
      title: "Use “feels like”",
      desc: y`When on, heating and cooling go by the humidity-adjusted “feels like” temperature
        instead of the room's own reading. Falls back to the room's reading automatically if the
        humidity sensor is unavailable.`
    })}
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">
            ${t ? "Change it" : "Set one up"} under Settings → Devices &amp; Services →
            Comfort Band → Configure.
          </div>
        </div>
        <div class="info-value ${t ? "" : "unconfigured"}">
          ${t ? this._sensorText(t) : "Not configured"}
        </div>
      </div>
    `;
  }
  /** "Bedroom humidity · 54%": the sensor's own name and reading, not its
   *  ID, the reading as HA formats it where the frontend can. */
  _sensorText(e) {
    const t = this.hass.states[e];
    if (!t) return e;
    const i = typeof t.attributes.friendly_name == "string" && t.attributes.friendly_name ? t.attributes.friendly_name : e, n = Number.parseFloat(t.state);
    if (!Number.isFinite(n)) return `${i} · no reading`;
    if (this.hass.formatEntityState) return `${i} · ${this.hass.formatEntityState(t)}`;
    const r = typeof t.attributes.unit_of_measurement == "string" ? t.attributes.unit_of_measurement : "";
    return `${i} · ${t.state}${r ? ` ${r}` : ""}`;
  }
  _renderLearning(e) {
    return this._renderToggle({
      entityId: e,
      title: "Learning",
      // Mirrors the integration's control gate: on, the learned predictor
      // decides (and MPC, when its own switch is on and it is ready); off,
      // plain on/off at the deadband edges. Samples are recorded either way.
      desc: y`Uses what this room has learned about how quickly it warms and cools to time
      heating and cooling: starting early rather than waiting for the room to get too cold or warm,
      stopping early so it doesn't overshoot, and holding off while it's already heading back on its
      own. Predictive control (the “MPC enabled” switch) needs this on too. While it's off, the room
      keeps recording readings; it just doesn't act on what it has learned.`
    });
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), i = this._pendingByEntity[e.entityId] !== void 0;
    return y`
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
Qt.styles = [
  We,
  Ne`
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
    `
];
Bi([
  M({ attribute: !1 })
], Qt.prototype, "hass", 2);
Bi([
  M({ type: String })
], Qt.prototype, "zone", 2);
Bi([
  M({ attribute: !1 })
], Qt.prototype, "entities", 2);
Bi([
  M({ type: String })
], Qt.prototype, "section", 2);
Bi([
  te()
], Qt.prototype, "_pendingByEntity", 2);
Bi([
  te()
], Qt.prototype, "_error", 2);
Qt = Bi([
  Ve("comfort-band-settings-tab")
], Qt);
var Bu = Object.defineProperty, ju = Object.getOwnPropertyDescriptor, ti = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ju(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Bu(t, i, r), r;
};
let Pt = class extends Ee {
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
    return y`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? y`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? y`<label>
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
      ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : null}
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
Pt.styles = [
  We,
  Ne`
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
  M({ type: String })
], Pt.prototype, "mode", 2);
ti([
  M({ type: String })
], Pt.prototype, "existingName", 2);
ti([
  M({ type: Array })
], Pt.prototype, "existingNames", 2);
ti([
  M({ type: Boolean })
], Pt.prototype, "busy", 2);
ti([
  te()
], Pt.prototype, "_name", 2);
ti([
  te()
], Pt.prototype, "_description", 2);
ti([
  te()
], Pt.prototype, "_error", 2);
ti([
  xn('input[name="name"]')
], Pt.prototype, "_nameInput", 2);
Pt = ti([
  Ve("profile-edit-dialog")
], Pt);
var Uu = Object.defineProperty, Vu = Object.getOwnPropertyDescriptor, ji = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Vu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Uu(t, i, r), r;
};
let Xt = class extends Ee {
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
          await _u(this.hass, { name: t, description: i });
        else if (n === "clone" && r)
          await vu(this.hass, { source: r, target: t, description: i });
        else if (n === "rename" && r)
          t !== r && await yu(this.hass, { old: r, new: t });
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
        await wu(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Zo(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!t || t.state === "unavailable") return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], r = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", d = t.attributes.descriptions, p = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [b, m] of Object.entries(d))
        typeof m == "string" && (p[b] = m);
    return { options: n, active: r, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(e) {
    this.hass && bu(this.hass, { profile: e });
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
    if (!this.hass) return F;
    const e = this._readState();
    if (e === null)
      return da(this.hass) ? y`<div class="empty">
            Profiles aren't available right now. If the Comfort Band Profiles entry or its active
            profile entity is disabled, turn it back on under Settings → Devices &amp; Services.
          </div>` : y`<div class="empty">
            No profiles set up. Profiles are named sets of schedules, such as Home and Away, that
            every room switches between together. To use them, add Comfort Band again under Settings
            → Devices &amp; Services and choose “Set up profile manager”.
          </div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: r, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return y`
        ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : null}
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
      return y`
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
            ${l ? y`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? y`<div class="empty">No profiles configured.</div>` : y`
      ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? y`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : F}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, r, s)
    )}
      </ul>
      ${s ? F : y`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, r, s) {
    const l = e === i, h = e === n, d = r[e] ?? "", p = `cb-profile-menu-${t}`;
    return y`
      <li
        data-profile=${e}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : F}
        @click=${() => this._onSelect(e)}
        @keydown=${(b) => {
      b.target === b.currentTarget && (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? y`<span class="description">${d}</span>` : F}
        </span>
        ${l ? y`<span class="badge">Active</span>` : F}
        ${s ? y`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? p : F}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(b) => this._toggleMenu(e, b)}
            >
              ⋮
            </button>` : F}
        ${this._openMenu === e ? y`
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
            ` : F}
      </li>
    `;
  }
};
Xt.styles = [
  We,
  Ne`
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
ji([
  M({ attribute: !1 })
], Xt.prototype, "hass", 2);
ji([
  te()
], Xt.prototype, "_mode", 2);
ji([
  te()
], Xt.prototype, "_target", 2);
ji([
  te()
], Xt.prototype, "_openMenu", 2);
ji([
  te()
], Xt.prototype, "_error", 2);
ji([
  te()
], Xt.prototype, "_busy", 2);
Xt = ji([
  Ve("comfort-band-profiles-tab")
], Xt);
const Wu = !0, Oe = "u-", Gu = "uplot", Ku = Oe + "hz", qu = Oe + "vt", Yu = Oe + "title", Zu = Oe + "wrap", Ju = Oe + "under", Qu = Oe + "over", Xu = Oe + "axis", Mi = Oe + "off", eh = Oe + "select", th = Oe + "cursor-x", ih = Oe + "cursor-y", nh = Oe + "cursor-pt", rh = Oe + "legend", oh = Oe + "live", sh = Oe + "inline", lh = Oe + "series", ah = Oe + "marker", ll = Oe + "label", ch = Oe + "value", In = "width", Bn = "height", Hn = "top", al = "bottom", hn = "left", bo = "right", Jo = "#000", cl = Jo + "0", _o = "mousemove", ul = "mousedown", vo = "mouseup", hl = "mouseenter", dl = "mouseleave", fl = "dblclick", uh = "resize", hh = "scroll", pl = "change", Sr = "dppxchange", Qo = "--", $n = typeof window < "u", Eo = $n ? document : null, pn = $n ? window : null, dh = $n ? navigator : null;
let ce, gr;
function Co() {
  let e = devicePixelRatio;
  ce != e && (ce = e, gr && Po(pl, gr, Co), gr = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Li(pl, gr, Co), pn.dispatchEvent(new CustomEvent(Sr)));
}
function ct(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function To(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function ye(e, t, i) {
  e.style[t] = i + "px";
}
function Et(e, t, i, n) {
  let r = Eo.createElement(e);
  return t != null && ct(r, t), i?.insertBefore(r, n), r;
}
function vt(e, t) {
  return Et("div", e, t);
}
const ml = /* @__PURE__ */ new WeakMap();
function Bt(e, t, i, n, r) {
  let s = "translate(" + t + "px," + i + "px)", l = ml.get(e);
  s != l && (e.style.transform = s, ml.set(e, s), t < 0 || i < 0 || t > n || i > r ? ct(e, Mi) : To(e, Mi));
}
const gl = /* @__PURE__ */ new WeakMap();
function bl(e, t, i) {
  let n = t + i, r = gl.get(e);
  n != r && (gl.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const _l = /* @__PURE__ */ new WeakMap();
function vl(e, t, i, n) {
  let r = t + "" + i, s = _l.get(e);
  r != s && (_l.set(e, r), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Xo = { passive: !0 }, fh = { ...Xo, capture: !0 };
function Li(e, t, i, n) {
  t.addEventListener(e, i, n ? fh : Xo);
}
function Po(e, t, i, n) {
  t.removeEventListener(e, i, Xo);
}
$n && Co();
function Ct(e, t, i, n) {
  let r;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ut((i + n) / 2), t[r] < e ? i = r : n = r;
  return e - t[i] <= t[n] - e ? i : n;
}
function ma(e) {
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
const ga = (e) => e != null, ba = (e) => e != null && e > 0, Dr = ma(ga), ph = ma(ba);
function mh(e, t, i, n = 0, r = !1) {
  let s = r ? ph : Dr, l = r ? ba : ga;
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
function zr(e, t, i, n) {
  let r = xl(e), s = xl(t);
  e == t && (r == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Yt : _a, h = r == 1 ? ut : yt, d = s == 1 ? yt : ut, p = h(l(Me(e))), b = d(l(Me(t))), m = bn(i, p), _ = bn(i, b);
  return i == 10 && (p < 0 && (m = me(m, -p)), b < 0 && (_ = me(_, -b))), n || i == 2 ? (e = m * r, t = _ * s) : (e = xa(e, m), t = Mr(t, _)), [e, t];
}
function es(e, t, i, n) {
  let r = zr(e, t, i, n);
  return e == 0 && (r[0] = 0), t == 0 && (r[1] = 0), r;
}
const ts = 0.1, yl = {
  mode: 3,
  pad: ts
}, Vn = {
  pad: 0,
  soft: null,
  mode: 0
}, gh = {
  min: Vn,
  max: Vn
};
function Ar(e, t, i, n) {
  return Nr(i) ? wl(e, t, i) : (Vn.pad = i, Vn.soft = n ? 0 : null, Vn.mode = n ? 3 : 0, wl(e, t, gh));
}
function le(e, t) {
  return e ?? t;
}
function bh(e, t, i) {
  for (t = le(t, 0), i = le(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function wl(e, t, i) {
  let n = i.min, r = i.max, s = le(n.pad, 0), l = le(r.pad, 0), h = le(n.hard, -pe), d = le(r.hard, pe), p = le(n.soft, pe), b = le(r.soft, -pe), m = le(n.mode, 0), _ = le(r.mode, 0), k = t - e, E = Yt(k), N = Xe(Me(e), Me(t)), j = Yt(N), V = Me(j - E);
  (k < 1e-24 || V > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, m == 2 && p != pe && (s = 0), _ == 2 && b != -pe && (l = 0)));
  let $ = k || N || 1e3, B = Yt($), S = bn(10, ut(B)), J = $ * (k == 0 ? e == 0 ? 0.1 : 1 : s), z = me(xa(e - J, S / 10), 24), Q = e >= p && (m == 1 || m == 3 && z <= p || m == 2 && z >= p) ? p : pe, q = Xe(h, z < Q && e >= Q ? Q : Tt(Q, z)), ie = $ * (k == 0 ? t == 0 ? 0.1 : 1 : l), K = me(Mr(t + ie, S / 10), 24), A = t <= b && (_ == 1 || _ == 3 && K >= b || _ == 2 && K <= b) ? b : -pe, Z = Tt(d, K > A && t <= A ? A : Xe(A, K));
  return q == Z && q == 0 && (Z = 100), [q, Z];
}
const _h = new Intl.NumberFormat($n ? dh.language : "en-US"), is = (e) => _h.format(e), dt = Math, yr = dt.PI, Me = dt.abs, ut = dt.floor, ze = dt.round, yt = dt.ceil, Tt = dt.min, Xe = dt.max, bn = dt.pow, xl = dt.sign, Yt = dt.log10, _a = dt.log2, vh = (e, t = 1) => dt.sinh(e) * t, yo = (e, t = 1) => dt.asinh(e / t), pe = 1 / 0;
function $l(e) {
  return (Yt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function Do(e, t, i) {
  return Tt(Xe(e, t), i);
}
function va(e) {
  return typeof e == "function";
}
function ne(e) {
  return va(e) ? e : () => e;
}
const yh = () => {
}, ya = (e) => e, wa = (e, t) => t, wh = (e) => null, kl = (e) => !0, Sl = (e, t) => e == t, xh = /\.\d*?(?=9{6,}|0{6,})/gm, Ri = (e) => {
  if (ka(e) || pi.has(e))
    return e;
  const t = `${e}`, i = t.match(xh);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [r, s] = t.split("e");
    return +`${Ri(r)}e${s}`;
  }
  return me(e, n);
};
function Di(e, t) {
  return Ri(me(Ri(e / t)) * t);
}
function Mr(e, t) {
  return Ri(yt(Ri(e / t)) * t);
}
function xa(e, t) {
  return Ri(ut(Ri(e / t)) * t);
}
function me(e, t = 0) {
  if (ka(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return ze(n) / i;
}
const pi = /* @__PURE__ */ new Map();
function $a(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Zn(e, t, i, n) {
  let r = [], s = n.map($a);
  for (let l = t; l < i; l++) {
    let h = Me(l), d = me(bn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * d, m = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : me(b, m);
      r.push(_), pi.set(_, m);
    }
  }
  return r;
}
const Wn = {}, ns = [], _n = [null, null], hi = Array.isArray, ka = Number.isInteger, $h = (e) => e === void 0;
function Al(e) {
  return typeof e == "string";
}
function Nr(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function kh(e) {
  return e != null && typeof e == "object";
}
const Sh = Object.getPrototypeOf(Uint8Array), Sa = "__proto__";
function vn(e, t = Nr) {
  let i;
  if (hi(e)) {
    let n = e.find((r) => r != null);
    if (hi(n) || t(n)) {
      i = Array(e.length);
      for (let r = 0; r < e.length; r++)
        i[r] = vn(e[r], t);
    } else
      i = e.slice();
  } else if (e instanceof Sh)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != Sa && (i[n] = vn(e[n], t));
  } else
    i = e;
  return i;
}
function Te(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let r in n)
      r != Sa && (Nr(e[r]) ? Te(e[r], vn(n[r])) : e[r] = vn(n[r]));
  }
  return e;
}
const Ah = 0, Eh = 1, Ch = 2;
function Th(e, t, i) {
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
function Ph(e, t) {
  if (Mh(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return Nh(l[0]) || (l = zh(l)), l;
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
      let b = h[p], m = Array(r).fill(void 0), _ = t ? t[l][p] : Eh, k = [];
      for (let E = 0; E < b.length; E++) {
        let N = b[E], j = s.get(d[E]);
        N === null ? _ != Ah && (m[j] = N, _ == Ch && k.push(j)) : m[j] = N;
      }
      Th(m, k, r), n.push(m);
    }
  }
  return n;
}
const Dh = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function zh(e) {
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
function Mh(e) {
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
function Nh(e, t = 100) {
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
  const s = Xe(1, ut((r - n + 1) / t));
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
const Aa = [
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
], Ea = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Ca(e) {
  return e.slice(0, 3);
}
const Oh = Ea.map(Ca), Lh = Aa.map(Ca), Hh = {
  MMMM: Aa,
  MMM: Lh,
  WWWW: Ea,
  WWW: Oh
};
function Rn(e) {
  return (e < 10 ? "0" : "") + e;
}
function Rh(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Fh = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Rn(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Rn(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Rn(e.getHours()),
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
  mm: (e) => Rn(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Rn(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => Rh(e.getMilliseconds())
};
function rs(e, t) {
  t = t || Hh;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(e); )
    i.push(r[0][0] == "{" ? Fh[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const Ih = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Bh(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ih ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const Ta = (e) => e % 1 == 0, Er = [1, 2, 2.5, 5], jh = Zn(10, -32, 0, Er), Pa = Zn(10, 0, 32, Er), Uh = Pa.filter(Ta), zi = jh.concat(Pa), os = `
`, Da = "{YYYY}", El = os + Da, za = "{M}/{D}", jn = os + za, br = jn + "/{YY}", Ma = "{aa}", Vh = "{h}:{mm}", fn = Vh + Ma, Cl = os + fn, Tl = ":{ss}", he = null;
function Na(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (e == 1 ? Zn(10, 0, 3, Er).filter(Ta) : Zn(10, -3, 0, Er)).concat([
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
    [l, Da, he, he, he, he, he, he, 1],
    [r * 28, "{MMM}", El, he, he, he, he, he, 1],
    [r, za, El, he, he, he, he, he, 1],
    [n, "{h}" + Ma, br, he, jn, he, he, he, 1],
    [i, fn, br, he, jn, he, he, he, 1],
    [t, Tl, br + " " + fn, he, jn + " " + fn, he, Cl, he, 1],
    [e, Tl + ".{fff}", br + " " + fn, he, jn + " " + fn, he, Cl, he, 1]
  ];
  function b(m) {
    return (_, k, E, N, j, V) => {
      let $ = [], B = j >= l, S = j >= s && j < l, J = m(E), z = me(J * e, 3), Q = wo(J.getFullYear(), B ? 0 : J.getMonth(), S || B ? 1 : J.getDate()), q = me(Q * e, 3);
      if (S || B) {
        let ie = S ? j / s : 0, K = B ? j / l : 0, A = z == q ? z : me(wo(Q.getFullYear() + K, Q.getMonth() + ie, 1) * e, 3), Z = new Date(ze(A / e)), O = Z.getFullYear(), W = Z.getMonth();
        for (let I = 0; A <= N; I++) {
          let re = wo(O + K * I, W + ie * I, 1), R = re - m(me(re * e, 3));
          A = me((+re + R) * e, 3), A <= N && $.push(A);
        }
      } else {
        let ie = j >= r ? r : j, K = ut(E) - ut(z), A = q + K + Mr(z - q, ie);
        $.push(A);
        let Z = m(A), O = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, W = j / n, I = _.axes[k]._space, re = V / I;
        for (; A = me(A + j, e == 1 ? 0 : 3), !(A > N); )
          if (W > 1) {
            let R = ut(me(O + W, 6)) % 24, oe = m(A).getHours() - R;
            oe > 1 && (oe = -1), A -= oe * n, O = (O + W) % 24;
            let de = $[$.length - 1];
            me((A - de) / j, 3) * re >= 0.7 && $.push(A);
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
const [Wh, Gh, Kh] = Na(1), [qh, Yh, Zh] = Na(1e-3);
Zn(2, -53, 53, [1]);
function Pl(e, t) {
  return e.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function Dl(e, t) {
  return (i, n, r, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], d, p, b, m, _, k;
    return n.map((E) => {
      let N = e(E), j = N.getFullYear(), V = N.getMonth(), $ = N.getDate(), B = N.getHours(), S = N.getMinutes(), J = N.getSeconds(), z = j != d && h[2] || V != p && h[3] || $ != b && h[4] || B != m && h[5] || S != _ && h[6] || J != k && h[7] || h[1];
      return d = j, p = V, b = $, m = B, _ = S, k = J, z(N);
    });
  };
}
function Jh(e, t) {
  let i = rs(t);
  return (n, r, s, l, h) => r.map((d) => i(e(d)));
}
function wo(e, t, i) {
  return new Date(e, t, i);
}
function zl(e, t) {
  return t(e);
}
const Qh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Ml(e, t) {
  return (i, n, r, s) => s == null ? Qo : t(e(n));
}
function Xh(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function ed(e, t) {
  return e.series[t].fill(e, t);
}
const td = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: yh,
  markers: {
    show: !0,
    width: 2,
    stroke: Xh,
    fill: ed,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function id(e, t) {
  let i = e.cursor.points, n = vt(), r = i.size(e, t);
  ye(n, In, r), ye(n, Bn, r);
  let s = r / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, r);
  return l && ye(n, "borderWidth", l), n;
}
function nd(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function rd(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function od(e, t) {
  return e.series[t].points.size;
}
const xo = [0, 0];
function sd(e, t, i) {
  return xo[0] = t, xo[1] = i, xo;
}
function _r(e, t, i, n = !0) {
  return (r) => {
    r.button == 0 && (!n || r.target == t) && i(r);
  };
}
function $o(e, t, i, n = !0) {
  return (r) => {
    (!n || r.target == t) && i(r);
  };
}
const ld = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: sd,
  points: {
    one: !1,
    show: id,
    size: od,
    width: 0,
    stroke: rd,
    fill: nd
  },
  bind: {
    mousedown: _r,
    mouseup: _r,
    click: _r,
    // legend clicks, not .u-over clicks
    dblclick: _r,
    mousemove: $o,
    mouseleave: $o,
    mouseenter: $o
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
}, Oa = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, ss = Te({}, Oa, {
  filter: wa
}), La = Te({}, ss, {
  size: 10
}), Ha = Te({}, Oa, {
  show: !1
}), ls = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Ra = "bold " + ls, Fa = 1.5, Nl = {
  show: !0,
  scale: "x",
  stroke: Jo,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Ra,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: ss,
  ticks: La,
  border: Ha,
  font: ls,
  lineGap: Fa,
  rotate: 0
}, ad = "Value", cd = "Time", Ol = {
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
function ud(e, t, i, n, r) {
  return t.map((s) => s == null ? "" : is(s));
}
function hd(e, t, i, n, r, s, l) {
  let h = [], d = pi.get(r) || 0;
  i = l ? i : me(Mr(i, r), d);
  for (let p = i; p <= n; p = me(p + r, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function zo(e, t, i, n, r, s, l) {
  const h = [], d = e.scales[e.axes[t].scale].log, p = d == 10 ? Yt : _a, b = ut(p(i));
  r = bn(d, b), d == 10 && (r = zi[Ct(r, zi)]);
  let m = i, _ = r * d;
  d == 10 && (_ = zi[Ct(_, zi)]);
  do
    h.push(m), m = m + r, d == 10 && !pi.has(m) && (m = me(m, pi.get(r))), m >= _ && (r = m, _ = r * d, d == 10 && (_ = zi[Ct(_, zi)]));
  while (m <= n);
  return h;
}
function dd(e, t, i, n, r, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, p = n > d ? zo(e, t, Xe(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? zo(e, t, Xe(d, -n), -i, r) : [d]).reverse().map((_) => -_).concat(b, p);
}
const Ia = /./, fd = /[12357]/, pd = /[125]/, Ll = /1/, Mo = (e, t, i, n) => e.map((r, s) => t == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function md(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], d = e.valToPos, p = s._space, b = d(10, l), m = d(9, l) - b >= p ? Ia : d(7, l) - b >= p ? fd : d(5, l) - b >= p ? pd : Ll;
  if (m == Ll) {
    let _ = Me(d(1, l) - b);
    if (_ < p)
      return Mo(t.slice().reverse(), h.distr, m, yt(p / _)).reverse();
  }
  return Mo(t, h.distr, m, 1);
}
function gd(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = s._space, d = e.valToPos, p = Me(d(1, l) - d(2, l));
  return p < h ? Mo(t.slice().reverse(), 3, Ia, yt(h / p)).reverse() : t;
}
function bd(e, t, i, n) {
  return n == null ? Qo : t == null ? "" : is(t);
}
const Hl = {
  show: !0,
  scale: "y",
  stroke: Jo,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Ra,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: ss,
  ticks: La,
  border: Ha,
  font: ls,
  lineGap: Fa,
  rotate: 0
};
function _d(e, t) {
  let i = 3 + (e || 1) * 2;
  return me(i * t, 3);
}
function vd(e, t) {
  let { scale: i, idxs: n } = e.series[0], r = e._data[0], s = e.valToPos(r[n[0]], i, !0), l = e.valToPos(r[n[1]], i, !0), h = Me(l - s), d = e.series[t], p = h / (d.points.space * ce);
  return n[1] - n[0] <= p;
}
const Rl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, Ba = (e, t, i, n, r) => r, Fl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Ba,
  alpha: 1,
  facets: [
    Te({}, Rl, { scale: "x" }),
    Te({}, Rl, { scale: "y" })
  ]
}, Il = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Ba,
  alpha: 1,
  points: {
    show: vd,
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
function yd(e, t, i, n, r) {
  return i / 10;
}
const ja = {
  time: Wu,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, wd = Te({}, ja, {
  time: !1,
  ori: 1
}), Bl = {};
function Ua(e, t) {
  let i = Bl[e];
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
  }, e != null && (Bl[e] = i)), i;
}
const yn = 1, No = 2;
function Ui(e, t, i) {
  const n = e.mode, r = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[r.facets[0].scale] : l[e.series[0].scale], m = n == 2 ? l[r.facets[1].scale] : l[r.scale], _ = h.left, k = h.top, E = h.width, N = h.height, j = e.valToPosH, V = e.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    p,
    b,
    m,
    j,
    V,
    _,
    k,
    E,
    N,
    Lr,
    kn,
    Rr,
    Wa,
    Ka
  ) : i(
    r,
    d,
    p,
    b,
    m,
    V,
    j,
    k,
    _,
    N,
    E,
    Hr,
    Sn,
    us,
    Ga,
    qa
  );
}
function as(e, t) {
  let i = 0, n = 0, r = le(e.bands, ns);
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
function xd(e, t, i, n, r) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[h];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Zt(e, t, i, n, r, s) {
  return Ui(e, t, (l, h, d, p, b, m, _, k, E, N, j) => {
    let V = l.pxRound;
    const $ = p.dir * (p.ori == 0 ? 1 : -1), B = p.ori == 0 ? kn : Sn;
    let S, J;
    $ == 1 ? (S = i, J = n) : (S = n, J = i);
    let z = V(m(h[S], p, N, k)), Q = V(_(d[S], b, j, E)), q = V(m(h[J], p, N, k)), ie = V(_(s == 1 ? b.max : b.min, b, j, E)), K = new Path2D(r);
    return B(K, q, ie), B(K, z, ie), B(K, z, Q), K;
  });
}
function Or(e, t, i, n, r, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? Rr : us;
    let d = i;
    for (let m = 0; m < e.length; m++) {
      let _ = e[m];
      if (_[1] > _[0]) {
        let k = _[0] - d;
        k > 0 && h(l, d, n, k, n + s), d = _[1];
      }
    }
    let p = i + r - d, b = 10;
    p > 0 && h(l, d, n - b / 2, p, n + s + b);
  }
  return l;
}
function $d(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function cs(e, t, i, n, r, s, l) {
  let h = [], d = e.length;
  for (let p = r == 1 ? i : n; p >= i && p <= n; p += r)
    if (t[p] === null) {
      let m = p, _ = p;
      if (r == 1)
        for (; ++p <= n && t[p] === null; )
          _ = p;
      else
        for (; --p >= i && t[p] === null; )
          _ = p;
      let k = s(e[m]), E = _ == m ? k : s(e[_]), N = m - r;
      k = l <= 0 && N >= 0 && N < d ? s(e[N]) : k;
      let V = _ + r;
      E = l >= 0 && V >= 0 && V < d ? s(e[V]) : E, E >= k && h.push([k, E]);
    }
  return h;
}
function jl(e) {
  return e == 0 ? ya : e == 1 ? ze : (t) => Di(t, e);
}
function Va(e) {
  let t = e == 0 ? Lr : Hr, i = e == 0 ? (r, s, l, h, d, p) => {
    r.arcTo(s, l, h, d, p);
  } : (r, s, l, h, d, p) => {
    r.arcTo(l, s, d, h, p);
  }, n = e == 0 ? (r, s, l, h, d) => {
    r.rect(s, l, h, d);
  } : (r, s, l, h, d) => {
    r.rect(l, s, d, h);
  };
  return (r, s, l, h, d, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(r, s, l, h, d) : (p = Tt(p, h / 2, d / 2), b = Tt(b, h / 2, d / 2), t(r, s + p, l), i(r, s + h, l, s + h, l + d, p), i(r, s + h, l + d, s, l + d, b), i(r, s, l + d, s, l, b), i(r, s, l, s + h, l, p), r.closePath());
  };
}
const Lr = (e, t, i) => {
  e.moveTo(t, i);
}, Hr = (e, t, i) => {
  e.moveTo(i, t);
}, kn = (e, t, i) => {
  e.lineTo(t, i);
}, Sn = (e, t, i) => {
  e.lineTo(i, t);
}, Rr = Va(0), us = Va(1), Wa = (e, t, i, n, r, s) => {
  e.arc(t, i, n, r, s);
}, Ga = (e, t, i, n, r, s) => {
  e.arc(i, t, n, r, s);
}, Ka = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(t, i, n, r, s, l);
}, qa = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(i, t, r, n, l, s);
};
function Ya(e) {
  return (t, i, n, r, s) => Ui(t, i, (l, h, d, p, b, m, _, k, E, N, j) => {
    let { pxRound: V, points: $ } = l, B, S;
    p.ori == 0 ? (B = Lr, S = Wa) : (B = Hr, S = Ga);
    const J = me($.width * ce, 3);
    let z = ($.size - $.width) / 2 * ce, Q = me(z * 2, 3), q = new Path2D(), ie = new Path2D(), { left: K, top: A, width: Z, height: O } = t.bbox;
    Rr(
      ie,
      K - Q,
      A - Q,
      Z + Q * 2,
      O + Q * 2
    );
    const W = (I) => {
      if (d[I] != null) {
        let re = V(m(h[I], p, N, k)), R = V(_(d[I], b, j, E));
        B(q, re + z, R), S(q, re, R, z, 0, yr * 2);
      }
    };
    if (s)
      s.forEach(W);
    else
      for (let I = n; I <= r; I++)
        W(I);
    return {
      stroke: J > 0 ? q : null,
      fill: q,
      clip: ie,
      flags: yn | No
    };
  });
}
function Za(e) {
  return (t, i, n, r, s, l) => {
    n != r && (s != n && l != n && e(t, i, n), s != r && l != r && e(t, i, r), e(t, i, l));
  };
}
const kd = Za(kn), Sd = Za(Sn);
function Ja(e) {
  const t = le(e?.alignGaps, 0);
  return (i, n, r, s) => Ui(i, n, (l, h, d, p, b, m, _, k, E, N, j) => {
    [r, s] = Dr(d, r, s);
    let V = l.pxRound, $ = (O) => V(m(O, p, N, k)), B = (O) => V(_(O, b, j, E)), S, J;
    p.ori == 0 ? (S = kn, J = kd) : (S = Sn, J = Sd);
    const z = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: yn }, q = Q.stroke;
    let ie = !1;
    if (s - r >= N * 4) {
      let O = (L) => i.posToVal(L, p.key, !0), W = null, I = null, re, R, et, we = $(h[z == 1 ? r : s]), oe = $(h[r]), de = $(h[s]), X = O(z == 1 ? oe + 1 : de - 1);
      for (let L = z == 1 ? r : s; L >= r && L <= s; L += z) {
        let Pe = h[L], xe = (z == 1 ? Pe < X : Pe > X) ? we : $(Pe), ue = d[L];
        xe == we ? ue != null ? (R = ue, W == null ? (S(q, xe, B(R)), re = W = I = R) : R < W ? W = R : R > I && (I = R)) : ue === null && (ie = !0) : (W != null && J(q, we, B(W), B(I), B(re), B(R)), ue != null ? (R = ue, S(q, xe, B(R)), W = I = re = R) : (W = I = null, ue === null && (ie = !0)), we = xe, X = O(we + z));
      }
      W != null && W != I && et != we && J(q, we, B(W), B(I), B(re), B(R));
    } else
      for (let O = z == 1 ? r : s; O >= r && O <= s; O += z) {
        let W = d[O];
        W === null ? ie = !0 : W != null && S(q, $(h[O]), B(W));
      }
    let [A, Z] = as(i, n);
    if (l.fill != null || A != 0) {
      let O = Q.fill = new Path2D(q), W = l.fillTo(i, n, l.min, l.max, A), I = B(W), re = $(h[r]), R = $(h[s]);
      z == -1 && ([R, re] = [re, R]), S(O, R, I), S(O, re, I);
    }
    if (!l.spanGaps) {
      let O = [];
      ie && O.push(...cs(h, d, r, s, z, $, t)), Q.gaps = O = l.gaps(i, n, r, s, O), Q.clip = Or(O, p.ori, k, E, N, j);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      Zt(i, n, r, s, q, -1),
      Zt(i, n, r, s, q, 1)
    ] : Zt(i, n, r, s, q, Z)), Q;
  });
}
function Ad(e) {
  const t = le(e.align, 1), i = le(e.ascDesc, !1), n = le(e.alignGaps, 0), r = le(e.extend, !1);
  return (s, l, h, d) => Ui(s, l, (p, b, m, _, k, E, N, j, V, $, B) => {
    [h, d] = Dr(m, h, d);
    let S = p.pxRound, { left: J, width: z } = s.bbox, Q = (oe) => S(E(oe, _, $, j)), q = (oe) => S(N(oe, k, B, V)), ie = _.ori == 0 ? kn : Sn;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: yn }, A = K.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let O = q(m[Z == 1 ? h : d]), W = Q(b[Z == 1 ? h : d]), I = W, re = W;
    r && t == -1 && (re = J, ie(A, re, O)), ie(A, W, O);
    for (let oe = Z == 1 ? h : d; oe >= h && oe <= d; oe += Z) {
      let de = m[oe];
      if (de == null)
        continue;
      let X = Q(b[oe]), L = q(de);
      t == 1 ? ie(A, X, O) : ie(A, I, L), ie(A, X, L), O = L, I = X;
    }
    let R = I;
    r && t == 1 && (R = J + z, ie(A, R, O));
    let [et, we] = as(s, l);
    if (p.fill != null || et != 0) {
      let oe = K.fill = new Path2D(A), de = p.fillTo(s, l, p.min, p.max, et), X = q(de);
      ie(oe, R, X), ie(oe, re, X);
    }
    if (!p.spanGaps) {
      let oe = [];
      oe.push(...cs(b, m, h, d, Z, Q, n));
      let de = p.width * ce / 2, X = i || t == 1 ? de : -de, L = i || t == -1 ? -de : de;
      oe.forEach((Pe) => {
        Pe[0] += X, Pe[1] += L;
      }), K.gaps = oe = p.gaps(s, l, h, d, oe), K.clip = Or(oe, _.ori, j, V, $, B);
    }
    return we != 0 && (K.band = we == 2 ? [
      Zt(s, l, h, d, A, -1),
      Zt(s, l, h, d, A, 1)
    ] : Zt(s, l, h, d, A, we)), K;
  });
}
function Ul(e, t, i, n, r, s, l = pe) {
  if (e.length > 1) {
    let h = null;
    for (let d = 0, p = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (h != null) {
          let b = Me(e[d] - e[h]);
          b < p && (p = b, l = Me(i(e[d], n, r, s) - i(e[h], n, r, s)));
        }
        h = d;
      }
  }
  return l;
}
function Ed(e) {
  e = e || Wn;
  const t = le(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let r = e.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = ne(r), l = 1 - t[0], h = le(t[1], pe), d = le(t[2], 1), p = le(e.disp, Wn), b = le(e.each, (k) => {
  }), { fill: m, stroke: _ } = p;
  return (k, E, N, j) => Ui(k, E, (V, $, B, S, J, z, Q, q, ie, K, A) => {
    let Z = V.pxRound, O = i, W = n * ce, I = h * ce, re = d * ce, R, et;
    S.ori == 0 ? [R, et] = s(k, E) : [et, R] = s(k, E);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let oe = S.ori == 0 ? Rr : us, de = S.ori == 0 ? b : (P, ge, De, Ki, wi, Ot, xi) => {
      b(P, ge, De, wi, Ki, xi, Ot);
    }, X = le(k.bands, ns).find((P) => P.series[0] == E), L = X != null ? X.dir : 0, Pe = V.fillTo(k, E, V.min, V.max, L), qe = Z(Q(Pe, J, A, ie)), xe, ue, xt, rt = K, ke = Z(V.width * ce), Nt = !1, Wt = null, ft = null, ri = null, Vi = null;
    m != null && (ke == 0 || _ != null) && (Nt = !0, Wt = m.values(k, E, N, j), ft = /* @__PURE__ */ new Map(), new Set(Wt).forEach((P) => {
      P != null && ft.set(P, new Path2D());
    }), ke > 0 && (ri = _.values(k, E, N, j), Vi = /* @__PURE__ */ new Map(), new Set(ri).forEach((P) => {
      P != null && Vi.set(P, new Path2D());
    })));
    let { x0: Wi, size: Cn } = p;
    if (Wi != null && Cn != null) {
      O = 1, $ = Wi.values(k, E, N, j), Wi.unit == 2 && ($ = $.map((De) => k.posToVal(q + De * K, S.key, !0)));
      let P = Cn.values(k, E, N, j);
      Cn.unit == 2 ? ue = P[0] * K : ue = z(P[0], S, K, q) - z(0, S, K, q), rt = Ul($, B, z, S, K, q, rt), xt = rt - ue + W;
    } else
      rt = Ul($, B, z, S, K, q, rt), xt = rt * l + W, ue = rt - xt;
    xt < 1 && (xt = 0), ke >= ue / 2 && (ke = 0), xt < 5 && (Z = ya);
    let tr = xt > 0, vi = rt - xt - (tr ? ke : 0);
    ue = Z(Do(vi, re, I)), xe = (O == 0 ? ue / 2 : O == we ? 0 : ue) - O * we * ((O == 0 ? W / 2 : 0) + (tr ? ke / 2 : 0));
    const Ye = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Gi = Nt ? null : new Path2D();
    let Gt = null;
    if (X != null)
      Gt = k.data[X.series[1]];
    else {
      let { y0: P, y1: ge } = p;
      P != null && ge != null && (B = ge.values(k, E, N, j), Gt = P.values(k, E, N, j));
    }
    let yi = R * ue, Y = et * ue;
    for (let P = we == 1 ? N : j; P >= N && P <= j; P += we) {
      let ge = B[P];
      if (ge == null)
        continue;
      if (Gt != null) {
        let tt = Gt[P] ?? 0;
        if (ge - tt == 0)
          continue;
        qe = Q(tt, J, A, ie);
      }
      let De = S.distr != 2 || p != null ? $[P] : P, Ki = z(De, S, K, q), wi = Q(le(ge, Pe), J, A, ie), Ot = Z(Ki - xe), xi = Z(Xe(wi, qe)), ot = Z(Tt(wi, qe)), pt = xi - ot;
      if (ge != null) {
        let tt = ge < 0 ? Y : yi, $t = ge < 0 ? yi : Y;
        Nt ? (ke > 0 && ri[P] != null && oe(Vi.get(ri[P]), Ot, ot + ut(ke / 2), ue, Xe(0, pt - ke), tt, $t), Wt[P] != null && oe(ft.get(Wt[P]), Ot, ot + ut(ke / 2), ue, Xe(0, pt - ke), tt, $t)) : oe(Gi, Ot, ot + ut(ke / 2), ue, Xe(0, pt - ke), tt, $t), de(
          k,
          E,
          P,
          Ot - ke / 2,
          ot,
          ue + ke,
          pt
        );
      }
    }
    return ke > 0 ? Ye.stroke = Nt ? Vi : Gi : Nt || (Ye._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Ye.width = 0), Ye.fill = Nt ? ft : Gi, Ye;
  });
}
function Cd(e, t) {
  const i = le(t?.alignGaps, 0);
  return (n, r, s, l) => Ui(n, r, (h, d, p, b, m, _, k, E, N, j, V) => {
    [s, l] = Dr(p, s, l);
    let $ = h.pxRound, B = (R) => $(_(R, b, j, E)), S = (R) => $(k(R, m, V, N)), J, z, Q;
    b.ori == 0 ? (J = Lr, Q = kn, z = Ka) : (J = Hr, Q = Sn, z = qa);
    const q = b.dir * (b.ori == 0 ? 1 : -1);
    let ie = B(d[q == 1 ? s : l]), K = ie, A = [], Z = [];
    for (let R = q == 1 ? s : l; R >= s && R <= l; R += q)
      if (p[R] != null) {
        let we = d[R], oe = B(we);
        A.push(K = oe), Z.push(S(p[R]));
      }
    const O = { stroke: e(A, Z, J, Q, z, $), fill: null, clip: null, band: null, gaps: null, flags: yn }, W = O.stroke;
    let [I, re] = as(n, r);
    if (h.fill != null || I != 0) {
      let R = O.fill = new Path2D(W), et = h.fillTo(n, r, h.min, h.max, I), we = S(et);
      Q(R, K, we), Q(R, ie, we);
    }
    if (!h.spanGaps) {
      let R = [];
      R.push(...cs(d, p, s, l, q, B, i)), O.gaps = R = h.gaps(n, r, s, l, R), O.clip = Or(R, b.ori, E, N, j, V);
    }
    return re != 0 && (O.band = re == 2 ? [
      Zt(n, r, s, l, W, -1),
      Zt(n, r, s, l, W, 1)
    ] : Zt(n, r, s, l, W, re)), O;
  });
}
function Td(e) {
  return Cd(Pd, e);
}
function Pd(e, t, i, n, r, s) {
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
      r(
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
const Oo = /* @__PURE__ */ new Set();
function Vl() {
  for (let e of Oo)
    e.syncRect(!0);
}
$n && (Li(uh, pn, Vl), Li(hh, pn, Vl, !0), Li(Sr, pn, () => {
  Ke.pxRatio = ce;
}));
const Dd = Ja(), zd = Ya();
function Wl(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Lo(s, l, t, i));
}
function Md(e, t) {
  return e.map((i, n) => n == 0 ? {} : Te({}, t, i));
}
function Lo(e, t, i, n) {
  return Te({}, t == 0 ? i : n, e);
}
function Qa(e, t, i) {
  return t == null ? _n : [t, i];
}
const Nd = Qa;
function Od(e, t, i) {
  return t == null ? _n : Ar(t, i, ts, !0);
}
function Xa(e, t, i, n) {
  return t == null ? _n : zr(t, i, e.scales[n].log, !1);
}
const Ld = Xa;
function ec(e, t, i, n) {
  return t == null ? _n : es(t, i, e.scales[n].log, !1);
}
const Hd = ec;
function Rd(e, t, i, n, r) {
  let s = Xe($l(e), $l(t)), l = t - e, h = Ct(r / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= r && s + (d < 5 ? pi.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function Gl(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, r) => (t = ze((i = +r) * ce)) + "px"), [e, t, i];
}
function Fd(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function Ke(e, t, i) {
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
  const p = n.root = vt(Gu);
  if (e.id != null && (p.id = e.id), ct(p, e.class), e.title) {
    let o = vt(Yu, p);
    o.textContent = e.title;
  }
  const b = Et("canvas"), m = n.ctx = b.getContext("2d"), _ = vt(Zu, p);
  Li("click", _, (o) => {
    o.target === E && (be != on || $e != sn) && Ue.click(n, o);
  }, !0);
  const k = n.under = vt(Ju, _);
  _.appendChild(b);
  const E = n.over = vt(Qu, _);
  e = vn(e);
  const N = +le(e.pxAlign, 1), j = jl(N);
  (e.plugins || []).forEach((o) => {
    o.opts && (e = o.opts(n, e) || e);
  });
  const V = e.ms || 1e-3, $ = n.series = r == 1 ? Wl(e.series || [], Ol, Il, !1) : Md(e.series || [null], Fl), B = n.axes = Wl(e.axes || [], Nl, Hl, !0), S = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((o) => {
    o.fill = ne(o.fill || null), o.dir = le(o.dir, -1);
  });
  const z = r == 2 ? $[1].facets[0].scale : $[0].scale, Q = {
    axes: gc,
    series: hc
  }, q = (e.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function ie(o) {
    const a = o.distr == 3 ? (c) => Yt(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => yo(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: g } = o, v = g - f;
      return (u - f) / v;
    };
  }
  function K(o) {
    let a = S[o];
    if (a == null) {
      let c = (e.scales || Wn)[o] || Wn;
      if (c.from != null) {
        K(c.from);
        let u = Te({}, S[c.from], c, { key: o });
        u.valToPct = ie(u), S[o] = u;
      } else {
        a = S[o] = Te({}, o == z ? ja : wd, c), a.key = o;
        let u = a.time, f = a.range, g = hi(f);
        if ((o != z || r == 2 && !u) && (g && (f[0] == null || f[1] == null) && (f = {
          min: f[0] == null ? yl : {
            mode: 1,
            hard: f[0],
            soft: f[0]
          },
          max: f[1] == null ? yl : {
            mode: 1,
            hard: f[1],
            soft: f[1]
          }
        }, g = !1), !g && Nr(f))) {
          let v = f;
          f = (w, x, C) => x == null ? _n : Ar(x, C, v);
        }
        a.range = ne(f || (u ? Nd : o == z ? a.distr == 3 ? Ld : a.distr == 4 ? Hd : Qa : a.distr == 3 ? Xa : a.distr == 4 ? ec : Od)), a.auto = ne(g ? !1 : a.auto), a.clamp = ne(a.clamp || yd), a._min = a._max = null, a.valToPct = ie(a);
      }
    }
  }
  K("x"), K("y"), r == 1 && $.forEach((o) => {
    K(o.scale);
  }), B.forEach((o) => {
    K(o.scale);
  });
  for (let o in e.scales)
    K(o);
  const A = S[z], Z = A.distr;
  let O, W;
  A.ori == 0 ? (ct(p, Ku), O = s, W = l) : (ct(p, qu), O = l, W = s);
  const I = {};
  for (let o in S) {
    let a = S[o];
    (a.min != null || a.max != null) && (I[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const re = e.tzDate || ((o) => new Date(ze(o / V))), R = e.fmtDate || rs, et = V == 1 ? Kh(re) : Zh(re), we = Dl(re, Pl(V == 1 ? Gh : Yh, R)), oe = Ml(re, zl(Qh, R)), de = [], X = n.legend = Te({}, td, e.legend), L = n.cursor = Te({}, ld, { drag: { y: r == 2 } }, e.cursor), Pe = X.show, qe = L.show, xe = X.markers;
  X.idxs = de, xe.width = ne(xe.width), xe.dash = ne(xe.dash), xe.stroke = ne(xe.stroke), xe.fill = ne(xe.fill);
  let ue, xt, rt, ke = [], Nt = [], Wt, ft = !1, ri = {};
  if (X.live) {
    const o = $[1] ? $[1].values : null;
    ft = o != null, Wt = ft ? o(n, 1, 0) : { _: 0 };
    for (let a in Wt)
      ri[a] = Qo;
  }
  if (Pe)
    if (ue = Et("table", rh, p), rt = Et("tbody", null, ue), X.mount(n, ue), ft) {
      xt = Et("thead", null, ue, rt);
      let o = Et("tr", null, xt);
      Et("th", null, o);
      for (var Vi in Wt)
        Et("th", ll, o).textContent = Vi;
    } else
      ct(ue, sh), X.live && ct(ue, oh);
  const Wi = { show: !0 }, Cn = { show: !1 };
  function tr(o, a) {
    if (a == 0 && (ft || !X.live || r == 2))
      return _n;
    let c = [], u = Et("tr", lh, rt, rt.childNodes[a]);
    ct(u, o.class), o.show || ct(u, Mi);
    let f = Et("th", null, u);
    if (xe.show) {
      let w = vt(ah, f);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (w.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), w.style.background = xe.fill(n, a);
      }
    }
    let g = vt(ll, f);
    o.label instanceof HTMLElement ? g.appendChild(o.label) : g.textContent = o.label, a > 0 && (xe.show || (g.style.color = o.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ye("click", f, (w) => {
      if (L._lock)
        return;
      ki(w);
      let x = $.indexOf(o);
      if ((w.ctrlKey || w.metaKey) != X.isolate) {
        let C = $.some((T, D) => D > 0 && D != x && T.show);
        $.forEach((T, D) => {
          D > 0 && Ht(D, C ? D == x ? Wi : Cn : Wi, !0, Ce.setSeries);
        });
      } else
        Ht(x, { show: !o.show }, !0, Ce.setSeries);
    }, !1), Yi && Ye(hl, f, (w) => {
      L._lock || (ki(w), Ht($.indexOf(o), an, !0, Ce.setSeries));
    }, !1));
    for (var v in Wt) {
      let w = Et("td", ch, u);
      w.textContent = "--", c.push(w);
    }
    return [u, c];
  }
  const vi = /* @__PURE__ */ new Map();
  function Ye(o, a, c, u = !0) {
    const f = vi.get(a) || {}, g = L.bind[o](n, a, c, u);
    g && (Li(o, a, f[o] = g), vi.set(a, f));
  }
  function Gi(o, a, c) {
    const u = vi.get(a) || {};
    for (let f in u)
      (o == null || f == o) && (Po(f, a, u[f]), delete u[f]);
    o == null && vi.delete(a);
  }
  let Gt = 0, yi = 0, Y = 0, P = 0, ge = 0, De = 0, Ki = ge, wi = De, Ot = Y, xi = P, ot = 0, pt = 0, tt = 0, $t = 0;
  n.bbox = {};
  let Br = !1, ir = !1, qi = !1, $i = !1, nr = !1, mt = !1;
  function jr(o, a, c) {
    (c || o != n.width || a != n.height) && fs(o, a), en(!1), qi = !0, ir = !0, tn();
  }
  function fs(o, a) {
    n.width = Gt = Y = o, n.height = yi = P = a, ge = De = 0, rc(), oc();
    let c = n.bbox;
    ot = c.left = Di(ge * ce, 0.5), pt = c.top = Di(De * ce, 0.5), tt = c.width = Di(Y * ce, 0.5), $t = c.height = Di(P * ce, 0.5);
  }
  const tc = 3;
  function ic() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = pc(a), u = mc(a);
      o = a == tc || c && u, o || (fs(n.width, n.height), ir = !0);
    }
  }
  function nc({ width: o, height: a }) {
    jr(o, a);
  }
  n.setSize = nc;
  function rc() {
    let o = !1, a = !1, c = !1, u = !1;
    B.forEach((f, g) => {
      if (f.show && f._show) {
        let { side: v, _size: w } = f, x = v % 2, C = f.label != null ? f.labelSize : 0, T = w + C;
        T > 0 && (x ? (Y -= T, v == 3 ? (ge += T, u = !0) : c = !0) : (P -= T, v == 0 ? (De += T, o = !0) : a = !0));
      }
    }), Si[0] = o, Si[1] = c, Si[2] = a, Si[3] = u, Y -= oi[1] + oi[3], ge += oi[3], P -= oi[2] + oi[0], De += oi[0];
  }
  function oc() {
    let o = ge + Y, a = De + P, c = ge, u = De;
    function f(g, v) {
      switch (g) {
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
    B.forEach((g, v) => {
      if (g.show && g._show) {
        let w = g.side;
        g._pos = f(w, g._size), g.label != null && (g._lpos = f(w, g.labelSize));
      }
    });
  }
  if (L.dataIdx == null) {
    let o = L.hover, a = o.skip = new Set(o.skip ?? []);
    a.add(void 0);
    let c = o.prox = ne(o.prox), u = o.bias ??= 0;
    L.dataIdx = (f, g, v, w) => {
      if (g == 0)
        return v;
      let x = v, C = c(f, g, v, w) ?? pe, T = C >= 0 && C < pe, D = A.ori == 0 ? Y : P, G = L.left, ae = t[0], se = t[g];
      if (a.has(se[v])) {
        x = null;
        let ee = null, U = null, H;
        if (u == 0 || u == -1)
          for (H = v; ee == null && H-- > 0; )
            a.has(se[H]) || (ee = H);
        if (u == 0 || u == 1)
          for (H = v; U == null && H++ < se.length; )
            a.has(se[H]) || (U = H);
        if (ee != null || U != null)
          if (T) {
            let ve = ee == null ? -1 / 0 : O(ae[ee], A, D, 0), Se = U == null ? 1 / 0 : O(ae[U], A, D, 0), Be = G - ve, fe = Se - G;
            Be <= fe ? Be <= C && (x = ee) : fe <= C && (x = U);
          } else
            x = U == null ? ee : ee == null ? U : v - ee <= U - v ? ee : U;
      } else T && Me(G - O(ae[v], A, D, 0)) > C && (x = null);
      return x;
    };
  }
  const ki = (o) => {
    L.event = o;
  };
  L.idxs = de, L._lock = !1;
  let Ge = L.points;
  Ge.show = ne(Ge.show), Ge.size = ne(Ge.size), Ge.stroke = ne(Ge.stroke), Ge.width = ne(Ge.width), Ge.fill = ne(Ge.fill);
  const Lt = n.focus = Te({}, e.focus || { alpha: 0.3 }, L.focus), Yi = Lt.prox >= 0, Zi = Yi && Ge.one;
  let gt = [], Ji = [], Qi = [];
  function ps(o, a) {
    let c = Ge.show(n, a);
    if (c instanceof HTMLElement)
      return ct(c, nh), ct(c, o.class), Bt(c, -10, -10, Y, P), E.insertBefore(c, gt[a]), c;
  }
  function ms(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && S[o.scale].time, u = o.value;
      o.value = c ? Al(u) ? Ml(re, zl(u, R)) : u || oe : u || bd, o.label = o.label || (c ? cd : ad);
    }
    if (Zi || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || Dd || wh, o.fillTo = ne(o.fillTo || xd), o.pxAlign = +le(o.pxAlign, N), o.pxRound = jl(o.pxAlign), o.stroke = ne(o.stroke || null), o.fill = ne(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = _d(Xe(1, o.width), 1), u = o.points = Te({}, {
        size: c,
        width: Xe(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: zd,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = ne(u.show), u.filter = ne(u.filter), u.fill = ne(u.fill), u.stroke = ne(u.stroke), u.paths = ne(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Pe) {
      let c = tr(o, a);
      ke.splice(a, 0, c[0]), Nt.splice(a, 0, c[1]), X.values.push(null);
    }
    if (qe) {
      de.splice(a, 0, null);
      let c = null;
      Zi ? a == 0 && (c = ps(o, a)) : a > 0 && (c = ps(o, a)), gt.splice(a, 0, c), Ji.splice(a, 0, 0), Qi.splice(a, 0, 0);
    }
    Ie("addSeries", a);
  }
  function sc(o, a) {
    a = a ?? $.length, o = r == 1 ? Lo(o, a, Ol, Il) : Lo(o, a, {}, Fl), $.splice(a, 0, o), ms($[a], a);
  }
  n.addSeries = sc;
  function lc(o) {
    if ($.splice(o, 1), Pe) {
      X.values.splice(o, 1), Nt.splice(o, 1);
      let a = ke.splice(o, 1)[0];
      Gi(null, a.firstChild), a.remove();
    }
    qe && (de.splice(o, 1), gt.splice(o, 1)[0].remove(), Ji.splice(o, 1), Qi.splice(o, 1)), Ie("delSeries", o);
  }
  n.delSeries = lc;
  const Si = [!1, !1, !1, !1];
  function ac(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = S[o.scale];
      u == null && (o.scale = c ? $[1].scale : z, u = S[o.scale]);
      let f = u.time;
      o.size = ne(o.size), o.space = ne(o.space), o.rotate = ne(o.rotate), hi(o.incrs) && o.incrs.forEach((v) => {
        !pi.has(v) && pi.set(v, $a(v));
      }), o.incrs = ne(o.incrs || (u.distr == 2 ? Uh : f ? V == 1 ? Wh : qh : zi)), o.splits = ne(o.splits || (f && u.distr == 1 ? et : u.distr == 3 ? zo : u.distr == 4 ? dd : hd)), o.stroke = ne(o.stroke), o.grid.stroke = ne(o.grid.stroke), o.ticks.stroke = ne(o.ticks.stroke), o.border.stroke = ne(o.border.stroke);
      let g = o.values;
      o.values = // static array of tick values
      hi(g) && !hi(g[0]) ? ne(g) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          hi(g) ? Dl(re, Pl(g, R)) : (
            // fmtDate string tpl
            Al(g) ? Jh(re, g) : g || we
          )
        ) : g || ud
      ), o.filter = ne(o.filter || (u.distr >= 3 && u.log == 10 ? md : u.distr == 3 && u.log == 2 ? gd : wa)), o.font = Gl(o.font), o.labelFont = Gl(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (Si[a] = !0, o._el = vt(Xu, _));
    }
  }
  function Tn(o, a, c, u) {
    let [f, g, v, w] = c, x = a % 2, C = 0;
    return x == 0 && (w || g) && (C = a == 0 && !f || a == 2 && !v ? ze(Nl.size / 3) : 0), x == 1 && (f || v) && (C = a == 1 && !g || a == 3 && !w ? ze(Hl.size / 2) : 0), C;
  }
  const gs = n.padding = (e.padding || [Tn, Tn, Tn, Tn]).map((o) => ne(le(o, Tn))), oi = n._padding = gs.map((o, a) => o(n, a, Si, 0));
  let je, Le = null, He = null;
  const rr = r == 1 ? $[0].idxs : null;
  let kt = null, Pn = !1;
  function bs(o, a) {
    if (t = o ?? [], n.data = n._data = t, r == 2) {
      je = 0;
      for (let c = 1; c < $.length; c++)
        je += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), kt = t[0], je = kt.length;
      let c = t;
      if (Z == 2) {
        c = t.slice();
        let u = c[0] = Array(je);
        for (let f = 0; f < je; f++)
          u[f] = f;
      }
      n._data = t = c;
    }
    if (en(!0), Ie("setData"), Z == 2 && (qi = !0), a !== !1) {
      let c = A;
      c.auto(n, Pn) ? Ur() : li(z, c.min, c.max), $i = $i || L.left >= 0, mt = !0, tn();
    }
  }
  n.setData = bs;
  function Ur() {
    Pn = !0;
    let o, a;
    r == 1 && (je > 0 ? (Le = rr[0] = 0, He = rr[1] = je - 1, o = t[0][Le], a = t[0][He], Z == 2 ? (o = Le, a = He) : o == a && (Z == 3 ? [o, a] = zr(o, o, A.log, !1) : Z == 4 ? [o, a] = es(o, o, A.log, !1) : A.time ? a = o + ze(86400 / V) : [o, a] = Ar(o, a, ts, !0))) : (Le = rr[0] = o = null, He = rr[1] = a = null)), li(z, o, a);
  }
  let or, Xi, Vr, Wr, Gr, Kr, qr, Yr, Zr, it;
  function _s(o, a, c, u, f, g) {
    o ??= cl, c ??= ns, u ??= "butt", f ??= cl, g ??= "round", o != or && (m.strokeStyle = or = o), f != Xi && (m.fillStyle = Xi = f), a != Vr && (m.lineWidth = Vr = a), g != Gr && (m.lineJoin = Gr = g), u != Kr && (m.lineCap = Kr = u), c != Wr && m.setLineDash(Wr = c);
  }
  function vs(o, a, c, u) {
    a != Xi && (m.fillStyle = Xi = a), o != qr && (m.font = qr = o), c != Yr && (m.textAlign = Yr = c), u != Zr && (m.textBaseline = Zr = u);
  }
  function Jr(o, a, c, u, f = 0) {
    if (u.length > 0 && o.auto(n, Pn) && (a == null || a.min == null)) {
      let g = le(Le, 0), v = le(He, u.length - 1), w = c.min == null ? mh(u, g, v, f, o.distr == 3) : [c.min, c.max];
      o.min = Tt(o.min, c.min = w[0]), o.max = Xe(o.max, c.max = w[1]);
    }
  }
  const ys = { min: null, max: null };
  function cc() {
    for (let u in S) {
      let f = S[u];
      I[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      I[z] != null && f.auto(n, Pn)) && (I[u] = ys);
    }
    for (let u in S) {
      let f = S[u];
      I[u] == null && f.from != null && I[f.from] != null && (I[u] = ys);
    }
    I[z] != null && en(!0);
    let o = {};
    for (let u in I) {
      let f = I[u];
      if (f != null) {
        let g = o[u] = vn(S[u], kh);
        if (f.min != null)
          Te(g, f);
        else if (u != z || r == 2)
          if (je == 0 && g.from == null) {
            let v = g.range(n, null, null, u);
            g.min = v[0], g.max = v[1];
          } else
            g.min = pe, g.max = -pe;
      }
    }
    if (je > 0) {
      $.forEach((u, f) => {
        if (r == 1) {
          let g = u.scale, v = I[g];
          if (v == null)
            return;
          let w = o[g];
          if (f == 0) {
            let x = w.range(n, w.min, w.max, g);
            w.min = x[0], w.max = x[1], Le = Ct(w.min, t[0]), He = Ct(w.max, t[0]), He - Le > 1 && (t[0][Le] < w.min && Le++, t[0][He] > w.max && He--), u.min = kt[Le], u.max = kt[He];
          } else u.show && u.auto && Jr(w, v, u, t[f], u.sorted);
          u.idxs[0] = Le, u.idxs[1] = He;
        } else if (f > 0 && u.show && u.auto) {
          let [g, v] = u.facets, w = g.scale, x = v.scale, [C, T] = t[f], D = o[w], G = o[x];
          D != null && Jr(D, I[w], g, C, g.sorted), G != null && Jr(G, I[x], v, T, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in o) {
        let f = o[u], g = I[u];
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
    for (let u in o) {
      let f = o[u];
      if (f.from != null) {
        let g = o[f.from];
        if (g.min == null)
          f.min = f.max = null;
        else {
          let v = f.range(n, g.min, g.max, u);
          f.min = v[0], f.max = v[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let u in o) {
      let f = o[u], g = S[u];
      if (g.min != f.min || g.max != f.max) {
        g.min = f.min, g.max = f.max;
        let v = g.distr;
        g._min = v == 3 ? Yt(g.min) : v == 4 ? yo(g.min, g.asinh) : v == 100 ? g.fwd(g.min) : g.min, g._max = v == 3 ? Yt(g.max) : v == 4 ? yo(g.max, g.asinh) : v == 100 ? g.fwd(g.max) : g.max, a[u] = c = !0;
      }
    }
    if (c) {
      $.forEach((u, f) => {
        r == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        qi = !0, Ie("setScale", u);
      qe && L.left >= 0 && ($i = mt = !0);
    }
    for (let u in I)
      I[u] = null;
  }
  function uc(o) {
    let a = Do(Le - 1, 0, je - 1), c = Do(He + 1, 0, je - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < je - 1; )
      c++;
    return [a, c];
  }
  function hc() {
    if (je > 0) {
      let o = $.some((a) => a._focus) && it != Lt.alpha;
      o && (m.globalAlpha = it = Lt.alpha), $.forEach((a, c) => {
        if (c > 0 && a.show && (ws(c, !1), ws(c, !0), a._paths == null)) {
          let u = it;
          it != a.alpha && (m.globalAlpha = it = a.alpha);
          let f = r == 2 ? [0, t[c][0].length - 1] : uc(t[c]);
          a._paths = a.paths(n, c, f[0], f[1]), it != u && (m.globalAlpha = it = u);
        }
      }), $.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = it;
          it != a.alpha && (m.globalAlpha = it = a.alpha), a._paths != null && xs(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, g = a.points.show(n, c, Le, He, f), v = a.points.filter(n, c, g, f);
            (g || v) && (a.points._paths = a.points.paths(n, c, Le, He, v), xs(c, !0));
          }
          it != u && (m.globalAlpha = it = u), Ie("drawSeries", c);
        }
      }), o && (m.globalAlpha = it = 1);
    }
  }
  function ws(o, a) {
    let c = a ? $[o].points : $[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function xs(o, a) {
    let c = a ? $[o].points : $[o], {
      stroke: u,
      fill: f,
      clip: g,
      flags: v,
      _stroke: w = c._stroke,
      _fill: x = c._fill,
      _width: C = c.width
    } = c._paths;
    C = me(C * ce, 3);
    let T = null, D = C % 2 / 2;
    a && x == null && (x = C > 0 ? "#fff" : w);
    let G = c.pxAlign == 1 && D > 0;
    if (G && m.translate(D, D), !a) {
      let ae = ot - C / 2, se = pt - C / 2, ee = tt + C, U = $t + C;
      T = new Path2D(), T.rect(ae, se, ee, U);
    }
    a ? Qr(w, C, c.dash, c.cap, x, u, f, v, g) : dc(o, w, C, c.dash, c.cap, x, u, f, v, T, g), G && m.translate(-D, -D);
  }
  function dc(o, a, c, u, f, g, v, w, x, C, T) {
    let D = !1;
    x != 0 && J.forEach((G, ae) => {
      if (G.series[0] == o) {
        let se = $[G.series[1]], ee = t[G.series[1]], U = (se._paths || Wn).band;
        hi(U) && (U = G.dir == 1 ? U[0] : U[1]);
        let H, ve = null;
        se.show && U && bh(ee, Le, He) ? (ve = G.fill(n, ae) || g, H = se._paths.clip) : U = null, Qr(a, c, u, f, ve, v, w, x, C, T, H, U), D = !0;
      }
    }), D || Qr(a, c, u, f, g, v, w, x, C, T);
  }
  const $s = yn | No;
  function Qr(o, a, c, u, f, g, v, w, x, C, T, D) {
    _s(o, a, c, u, f), (x || C || D) && (m.save(), x && m.clip(x), C && m.clip(C)), D ? (w & $s) == $s ? (m.clip(D), T && m.clip(T), lr(f, v), sr(o, g, a)) : w & No ? (lr(f, v), m.clip(D), sr(o, g, a)) : w & yn && (m.save(), m.clip(D), T && m.clip(T), lr(f, v), m.restore(), sr(o, g, a)) : (lr(f, v), sr(o, g, a)), (x || C || D) && m.restore();
  }
  function sr(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      m.strokeStyle = or = f, m.stroke(u);
    }) : a != null && o && m.stroke(a));
  }
  function lr(o, a) {
    a instanceof Map ? a.forEach((c, u) => {
      m.fillStyle = Xi = u, m.fill(c);
    }) : a != null && o && m.fill(a);
  }
  function fc(o, a, c, u) {
    let f = B[o], g;
    if (u <= 0)
      g = [0, 0];
    else {
      let v = f._space = f.space(n, o, a, c, u), w = f._incrs = f.incrs(n, o, a, c, u, v);
      g = Rd(a, c, w, u, v);
    }
    return f._found = g;
  }
  function Xr(o, a, c, u, f, g, v, w, x, C) {
    let T = v % 2 / 2;
    N == 1 && m.translate(T, T), _s(w, v, x, C, w), m.beginPath();
    let D, G, ae, se, ee = f + (u == 0 || u == 3 ? -g : g);
    c == 0 ? (G = f, se = ee) : (D = f, ae = ee);
    for (let U = 0; U < o.length; U++)
      a[U] != null && (c == 0 ? D = ae = o[U] : G = se = o[U], m.moveTo(D, G), m.lineTo(ae, se));
    m.stroke(), N == 1 && m.translate(-T, -T);
  }
  function pc(o) {
    let a = !0;
    return B.forEach((c, u) => {
      if (!c.show)
        return;
      let f = S[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, en(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, en(!1));
      let g = c.side, v = g % 2, { min: w, max: x } = f, [C, T] = fc(u, w, x, v == 0 ? Y : P);
      if (T == 0)
        return;
      let D = f.distr == 2, G = c._splits = c.splits(n, u, w, x, C, T, D), ae = f.distr == 2 ? G.map((H) => kt[H]) : G, se = f.distr == 2 ? kt[G[1]] - kt[G[0]] : C, ee = c._values = c.values(n, c.filter(n, ae, u, T, se), u, T, se);
      c._rotate = g == 2 ? c.rotate(n, ee, u, T) : 0;
      let U = c._size;
      c._size = yt(c.size(n, ee, u, o)), U != null && c._size != U && (a = !1);
    }), a;
  }
  function mc(o) {
    let a = !0;
    return gs.forEach((c, u) => {
      let f = c(n, u, Si, o);
      f != oi[u] && (a = !1), oi[u] = f;
    }), a;
  }
  function gc() {
    for (let o = 0; o < B.length; o++) {
      let a = B[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, g, v = a.stroke(n, o), w = c == 0 || c == 3 ? -1 : 1, [x, C] = a._found;
      if (a.label != null) {
        let Je = a.labelGap * w, at = ze((a._lpos + Je) * ce);
        vs(a.labelFont[0], v, "center", c == 2 ? Hn : al), m.save(), u == 1 ? (f = g = 0, m.translate(
          at,
          ze(pt + $t / 2)
        ), m.rotate((c == 3 ? -yr : yr) / 2)) : (f = ze(ot + tt / 2), g = at);
        let Ci = va(a.label) ? a.label(n, o, x, C) : a.label;
        m.fillText(Ci, f, g), m.restore();
      }
      if (C == 0)
        continue;
      let T = S[a.scale], D = u == 0 ? tt : $t, G = u == 0 ? ot : pt, ae = a._splits, se = T.distr == 2 ? ae.map((Je) => kt[Je]) : ae, ee = T.distr == 2 ? kt[ae[1]] - kt[ae[0]] : x, U = a.ticks, H = a.border, ve = U.show ? U.size : 0, Se = ze(ve * ce), Be = ze((a.alignTo == 2 ? a._size - ve - a.gap : a.gap) * ce), fe = a._rotate * -yr / 180, Ae = j(a._pos * ce), st = (Se + Be) * w, Ze = Ae + st;
      g = u == 0 ? Ze : 0, f = u == 1 ? Ze : 0;
      let bt = a.font[0], St = a.align == 1 ? hn : a.align == 2 ? bo : fe > 0 ? hn : fe < 0 ? bo : u == 0 ? "center" : c == 3 ? bo : hn, Ft = fe || u == 1 ? "middle" : c == 2 ? Hn : al;
      vs(bt, v, St, Ft);
      let lt = a.font[1] * a.lineGap, _t = ae.map((Je) => j(h(Je, T, D, G))), At = a._values;
      for (let Je = 0; Je < At.length; Je++) {
        let at = At[Je];
        if (at != null) {
          u == 0 ? f = _t[Je] : g = _t[Je], at = "" + at;
          let Ci = at.indexOf(`
`) == -1 ? [at] : at.split(/\n/gm);
          for (let Qe = 0; Qe < Ci.length; Qe++) {
            let js = Ci[Qe];
            fe ? (m.save(), m.translate(f, g + Qe * lt), m.rotate(fe), m.fillText(js, 0, 0), m.restore()) : m.fillText(js, f, g + Qe * lt);
          }
        }
      }
      U.show && Xr(
        _t,
        U.filter(n, se, o, C, ee),
        u,
        c,
        Ae,
        Se,
        me(U.width * ce, 3),
        U.stroke(n, o),
        U.dash,
        U.cap
      );
      let It = a.grid;
      It.show && Xr(
        _t,
        It.filter(n, se, o, C, ee),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? pt : ot,
        u == 0 ? $t : tt,
        me(It.width * ce, 3),
        It.stroke(n, o),
        It.dash,
        It.cap
      ), H.show && Xr(
        [Ae],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? pt : ot,
        u == 1 ? $t : tt,
        me(H.width * ce, 3),
        H.stroke(n, o),
        H.dash,
        H.cap
      );
    }
    Ie("drawAxes");
  }
  function en(o) {
    $.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let ar = !1, eo = !1, Dn = [];
  function bc() {
    eo = !1;
    for (let o = 0; o < Dn.length; o++)
      Ie(...Dn[o]);
    Dn.length = 0;
  }
  function tn() {
    ar || (Dh(ks), ar = !0);
  }
  function _c(o, a = !1) {
    ar = !0, eo = a, o(n), ks(), a && Dn.length > 0 && queueMicrotask(bc);
  }
  n.batch = _c;
  function ks() {
    if (Br && (cc(), Br = !1), qi && (ic(), qi = !1), ir) {
      if (ye(k, hn, ge), ye(k, Hn, De), ye(k, In, Y), ye(k, Bn, P), ye(E, hn, ge), ye(E, Hn, De), ye(E, In, Y), ye(E, Bn, P), ye(_, In, Gt), ye(_, Bn, yi), b.width = ze(Gt * ce), b.height = ze(yi * ce), B.forEach(({ _el: o, _show: a, _size: c, _pos: u, side: f }) => {
        if (o != null)
          if (a) {
            let g = f === 3 || f === 0 ? c : 0, v = f % 2 == 1;
            ye(o, v ? "left" : "top", u - g), ye(o, v ? "width" : "height", c), ye(o, v ? "top" : "left", v ? De : ge), ye(o, v ? "height" : "width", v ? P : Y), To(o, Mi);
          } else
            ct(o, Mi);
      }), or = Xi = Vr = Gr = Kr = qr = Yr = Zr = Wr = null, it = 1, Nn(!0), ge != Ki || De != wi || Y != Ot || P != xi) {
        en(!1);
        let o = Y / Ot, a = P / xi;
        if (qe && !$i && L.left >= 0) {
          L.left *= o, L.top *= a, nn && Bt(nn, ze(L.left), 0, Y, P), rn && Bt(rn, 0, ze(L.top), Y, P);
          for (let c = 0; c < gt.length; c++) {
            let u = gt[c];
            u != null && (Ji[c] *= o, Qi[c] *= a, Bt(u, yt(Ji[c]), yt(Qi[c]), Y, P));
          }
        }
        if (_e.show && !nr && _e.left >= 0 && _e.width > 0) {
          _e.left *= o, _e.width *= o, _e.top *= a, _e.height *= a;
          for (let c in so)
            ye(ln, c, _e[c]);
        }
        Ki = ge, wi = De, Ot = Y, xi = P;
      }
      Ie("setSize"), ir = !1;
    }
    Gt > 0 && yi > 0 && (m.clearRect(0, 0, b.width, b.height), Ie("drawClear"), q.forEach((o) => o()), Ie("draw")), _e.show && nr && (cr(_e), nr = !1), qe && $i && (Ei(null, !0, !1), $i = !1), X.show && X.live && mt && (ro(), mt = !1), d || (d = !0, n.status = 1, Ie("ready")), Pn = !1, ar = !1;
  }
  n.redraw = (o, a) => {
    qi = a || !1, o !== !1 ? li(z, A.min, A.max) : tn();
  };
  function to(o, a) {
    let c = S[o];
    if (c.from == null) {
      if (je == 0) {
        let u = c.range(n, a.min, a.max, o);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (je > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      o == z && c.distr == 2 && je > 0 && (a.min = Ct(a.min, t[0]), a.max = Ct(a.max, t[0]), a.min == a.max && a.max++), I[o] = a, Br = !0, tn();
    }
  }
  n.setScale = to;
  let io, no, nn, rn, Ss, As, on, sn, Es, Cs, be, $e, si = !1;
  const Ue = L.drag;
  let Re = Ue.x, Fe = Ue.y;
  qe && (L.x && (io = vt(th, E)), L.y && (no = vt(ih, E)), A.ori == 0 ? (nn = io, rn = no) : (nn = no, rn = io), be = L.left, $e = L.top);
  const _e = n.select = Te({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), ln = _e.show ? vt(eh, _e.over ? E : k) : null;
  function cr(o, a) {
    if (_e.show) {
      for (let c in o)
        _e[c] = o[c], c in so && ye(ln, c, o[c]);
      a !== !1 && Ie("setSelect");
    }
  }
  n.setSelect = cr;
  function vc(o) {
    if ($[o].show)
      Pe && To(ke[o], Mi);
    else if (Pe && ct(ke[o], Mi), qe) {
      let c = Zi ? gt[0] : gt[o];
      c != null && Bt(c, -10, -10, Y, P);
    }
  }
  function li(o, a, c) {
    to(o, { min: a, max: c });
  }
  function Ht(o, a, c, u) {
    a.focus != null && kc(o), a.show != null && $.forEach((f, g) => {
      g > 0 && (o == g || o == null) && (f.show = a.show, vc(g), r == 2 ? (li(f.facets[0].scale, null, null), li(f.facets[1].scale, null, null)) : li(f.scale, null, null), tn());
    }), c !== !1 && Ie("setSeries", o, a), u && On("setSeries", n, o, a);
  }
  n.setSeries = Ht;
  function yc(o, a) {
    Te(J[o], a);
  }
  function wc(o, a) {
    o.fill = ne(o.fill || null), o.dir = le(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function xc(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = wc, n.setBand = yc, n.delBand = xc;
  function $c(o, a) {
    $[o].alpha = a, qe && gt[o] != null && (gt[o].style.opacity = a), Pe && ke[o] && (ke[o].style.opacity = a);
  }
  let Kt, ai, Ai;
  const an = { focus: !0 };
  function kc(o) {
    if (o != Ai) {
      let a = o == null, c = Lt.alpha != 1;
      $.forEach((u, f) => {
        if (r == 1 || f > 0) {
          let g = a || f == 0 || f == o;
          u._focus = a ? null : g, c && $c(f, g ? 1 : Lt.alpha);
        }
      }), Ai = o, c && tn();
    }
  }
  Pe && Yi && Ye(dl, ue, (o) => {
    L._lock || (ki(o), Ai != null && Ht(null, an, !0, Ce.setSeries));
  });
  function Rt(o, a, c) {
    let u = S[a];
    c && (o = o / ce - (u.ori == 1 ? De : ge));
    let f = Y;
    u.ori == 1 && (f = P, o = f - o), u.dir == -1 && (o = f - o);
    let g = u._min, v = u._max, w = o / f, x = g + (v - g) * w, C = u.distr;
    return C == 3 ? bn(10, x) : C == 4 ? vh(x, u.asinh) : C == 100 ? u.bwd(x) : x;
  }
  function Sc(o, a) {
    let c = Rt(o, z, a);
    return Ct(c, t[0], Le, He);
  }
  n.valToIdx = (o) => Ct(o, t[0]), n.posToIdx = Sc, n.posToVal = Rt, n.valToPos = (o, a, c) => S[a].ori == 0 ? s(
    o,
    S[a],
    c ? tt : Y,
    c ? ot : 0
  ) : l(
    o,
    S[a],
    c ? $t : P,
    c ? pt : 0
  ), n.setCursor = (o, a, c) => {
    be = o.left, $e = o.top, Ei(null, a, c);
  };
  function Ts(o, a) {
    ye(ln, hn, _e.left = o), ye(ln, In, _e.width = a);
  }
  function Ps(o, a) {
    ye(ln, Hn, _e.top = o), ye(ln, Bn, _e.height = a);
  }
  let zn = A.ori == 0 ? Ts : Ps, Mn = A.ori == 1 ? Ts : Ps;
  function Ac() {
    if (Pe && X.live)
      for (let o = r == 2 ? 1 : 0; o < $.length; o++) {
        if (o == 0 && ft)
          continue;
        let a = X.values[o], c = 0;
        for (let u in a)
          Nt[o][c++].firstChild.nodeValue = a[u];
      }
  }
  function ro(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, u) => {
      de[u] = c;
    }) : $h(o.idx) || de.fill(o.idx), X.idx = de[0]), Pe && X.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || r == 1 && !ft) && Ec(c, de[c]);
      Ac();
    }
    mt = !1, a !== !1 && Ie("setLegend");
  }
  n.setLegend = ro;
  function Ec(o, a) {
    let c = $[o], u = o == 0 && Z == 2 ? kt : t[o], f;
    ft ? f = c.values(n, o, a) ?? ri : (f = c.value(n, a == null ? null : u[a], o, a), f = f == null ? ri : { _: f }), X.values[o] = f;
  }
  function Ei(o, a, c) {
    Es = be, Cs = $e, [be, $e] = L.move(n, be, $e), L.left = be, L.top = $e, qe && (nn && Bt(nn, ze(be), 0, Y, P), rn && Bt(rn, 0, ze($e), Y, P));
    let u, f = Le > He;
    Kt = pe, ai = null;
    let g = A.ori == 0 ? Y : P, v = A.ori == 1 ? Y : P;
    if (be < 0 || je == 0 || f) {
      u = L.idx = null;
      for (let w = 0; w < $.length; w++) {
        let x = gt[w];
        x != null && Bt(x, -10, -10, Y, P);
      }
      Yi && Ht(null, an, !0, o == null && Ce.setSeries), X.live && (de.fill(u), mt = !0);
    } else {
      let w, x, C;
      r == 1 && (w = A.ori == 0 ? be : $e, x = Rt(w, z), u = L.idx = Ct(x, t[0], Le, He), C = O(t[0][u], A, g, 0));
      let T = -10, D = -10, G = 0, ae = 0, se = !0, ee = "", U = "";
      for (let H = r == 2 ? 1 : 0; H < $.length; H++) {
        let ve = $[H], Se = de[H], Be = Se == null ? null : r == 1 ? t[H][Se] : t[H][1][Se], fe = L.dataIdx(n, H, u, x), Ae = fe == null ? null : r == 1 ? t[H][fe] : t[H][1][fe];
        if (mt = mt || Ae != Be || fe != Se, de[H] = fe, H > 0 && ve.show) {
          let st = fe == null ? -10 : fe == u ? C : O(r == 1 ? t[0][fe] : t[H][0][fe], A, g, 0), Ze = Ae == null ? -10 : W(Ae, r == 1 ? S[ve.scale] : S[ve.facets[1].scale], v, 0);
          if (Yi && Ae != null) {
            let bt = A.ori == 1 ? be : $e, St = Me(Lt.dist(n, H, fe, Ze, bt));
            if (St < Kt) {
              let Ft = Lt.bias;
              if (Ft != 0) {
                let lt = Rt(bt, ve.scale), _t = Ae >= 0 ? 1 : -1, At = lt >= 0 ? 1 : -1;
                At == _t && (At == 1 ? Ft == 1 ? Ae >= lt : Ae <= lt : (
                  // >= 0
                  Ft == 1 ? Ae <= lt : Ae >= lt
                )) && (Kt = St, ai = H);
              } else
                Kt = St, ai = H;
            }
          }
          if (mt || Zi) {
            let bt, St;
            A.ori == 0 ? (bt = st, St = Ze) : (bt = Ze, St = st);
            let Ft, lt, _t, At, It, Je, at = !0, Ci = Ge.bbox;
            if (Ci != null) {
              at = !1;
              let Qe = Ci(n, H);
              _t = Qe.left, At = Qe.top, Ft = Qe.width, lt = Qe.height;
            } else
              _t = bt, At = St, Ft = lt = Ge.size(n, H);
            if (Je = Ge.fill(n, H), It = Ge.stroke(n, H), Zi)
              H == ai && Kt <= Lt.prox && (T = _t, D = At, G = Ft, ae = lt, se = at, ee = Je, U = It);
            else {
              let Qe = gt[H];
              Qe != null && (Ji[H] = _t, Qi[H] = At, vl(Qe, Ft, lt, at), bl(Qe, Je, It), Bt(Qe, yt(_t), yt(At), Y, P));
            }
          }
        }
      }
      if (Zi) {
        let H = Lt.prox, ve = Ai == null ? Kt <= H : Kt > H || ai != Ai;
        if (mt || ve) {
          let Se = gt[0];
          Se != null && (Ji[0] = T, Qi[0] = D, vl(Se, G, ae, se), bl(Se, ee, U), Bt(Se, yt(T), yt(D), Y, P));
        }
      }
    }
    if (_e.show && si)
      if (o != null) {
        let [w, x] = Ce.scales, [C, T] = Ce.match, [D, G] = o.cursor.sync.scales, ae = o.cursor.drag;
        if (Re = ae._x, Fe = ae._y, Re || Fe) {
          let { left: se, top: ee, width: U, height: H } = o.select, ve = o.scales[D].ori, Se = o.posToVal, Be, fe, Ae, st, Ze, bt = w != null && C(w, D), St = x != null && T(x, G);
          bt && Re ? (ve == 0 ? (Be = se, fe = U) : (Be = ee, fe = H), Ae = S[w], st = O(Se(Be, D), Ae, g, 0), Ze = O(Se(Be + fe, D), Ae, g, 0), zn(Tt(st, Ze), Me(Ze - st))) : zn(0, g), St && Fe ? (ve == 1 ? (Be = se, fe = U) : (Be = ee, fe = H), Ae = S[x], st = W(Se(Be, G), Ae, v, 0), Ze = W(Se(Be + fe, G), Ae, v, 0), Mn(Tt(st, Ze), Me(Ze - st))) : Mn(0, v);
        } else
          lo();
      } else {
        let w = Me(Es - Ss), x = Me(Cs - As);
        if (A.ori == 1) {
          let G = w;
          w = x, x = G;
        }
        Re = Ue.x && w >= Ue.dist, Fe = Ue.y && x >= Ue.dist;
        let C = Ue.uni;
        C != null ? Re && Fe && (Re = w >= C, Fe = x >= C, !Re && !Fe && (x > w ? Fe = !0 : Re = !0)) : Ue.x && Ue.y && (Re || Fe) && (Re = Fe = !0);
        let T, D;
        Re && (A.ori == 0 ? (T = on, D = be) : (T = sn, D = $e), zn(Tt(T, D), Me(D - T)), Fe || Mn(0, v)), Fe && (A.ori == 1 ? (T = on, D = be) : (T = sn, D = $e), Mn(Tt(T, D), Me(D - T)), Re || zn(0, g)), !Re && !Fe && (zn(0, 0), Mn(0, 0));
      }
    if (Ue._x = Re, Ue._y = Fe, o == null) {
      if (c) {
        if (Bs != null) {
          let [w, x] = Ce.scales;
          Ce.values[0] = w != null ? Rt(A.ori == 0 ? be : $e, w) : null, Ce.values[1] = x != null ? Rt(A.ori == 1 ? be : $e, x) : null;
        }
        On(_o, n, be, $e, Y, P, u);
      }
      if (Yi) {
        let w = c && Ce.setSeries, x = Lt.prox;
        Ai == null ? Kt <= x && Ht(ai, an, !0, w) : Kt > x ? Ht(null, an, !0, w) : ai != Ai && Ht(ai, an, !0, w);
      }
    }
    mt && (X.idx = u, ro()), a !== !1 && Ie("setCursor");
  }
  let ci = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ci == null && Nn(!1), ci;
    }
  });
  function Nn(o = !1) {
    o ? ci = null : (ci = E.getBoundingClientRect(), Ie("syncRect", ci));
  }
  function Ds(o, a, c, u, f, g, v) {
    L._lock || si && o != null && o.movementX == 0 && o.movementY == 0 || (oo(o, a, c, u, f, g, v, !1, o != null), o != null ? Ei(null, !0, !0) : Ei(a, !0, !1));
  }
  function oo(o, a, c, u, f, g, v, w, x) {
    if (ci == null && Nn(!1), ki(o), o != null)
      c = o.clientX - ci.left, u = o.clientY - ci.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [C, T] = Ce.scales, D = a.cursor.sync, [G, ae] = D.values, [se, ee] = D.scales, [U, H] = Ce.match, ve = a.axes[0].side % 2 == 1, Se = A.ori == 0 ? Y : P, Be = A.ori == 1 ? Y : P, fe = ve ? g : f, Ae = ve ? f : g, st = ve ? u : c, Ze = ve ? c : u;
      if (se != null ? c = U(C, se) ? h(G, S[C], Se, 0) : -10 : c = Se * (st / fe), ee != null ? u = H(T, ee) ? h(ae, S[T], Be, 0) : -10 : u = Be * (Ze / Ae), A.ori == 1) {
        let bt = c;
        c = u, u = bt;
      }
    }
    x && (a == null || a.cursor.event.type == _o) && ((c <= 1 || c >= Y - 1) && (c = Di(c, Y)), (u <= 1 || u >= P - 1) && (u = Di(u, P))), w ? (Ss = c, As = u, [on, sn] = L.move(n, c, u)) : (be = c, $e = u);
  }
  const so = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function lo() {
    cr(so, !1);
  }
  let zs, Ms, Ns, Os;
  function Ls(o, a, c, u, f, g, v) {
    si = !0, Re = Fe = Ue._x = Ue._y = !1, oo(o, a, c, u, f, g, v, !0, !1), o != null && (Ye(vo, Eo, Hs, !1), On(ul, n, on, sn, Y, P, null));
    let { left: w, top: x, width: C, height: T } = _e;
    zs = w, Ms = x, Ns = C, Os = T;
  }
  function Hs(o, a, c, u, f, g, v) {
    si = Ue._x = Ue._y = !1, oo(o, a, c, u, f, g, v, !1, !0);
    let { left: w, top: x, width: C, height: T } = _e, D = C > 0 || T > 0, G = zs != w || Ms != x || Ns != C || Os != T;
    if (D && G && cr(_e), Ue.setScale && D && G) {
      let ae = w, se = C, ee = x, U = T;
      if (A.ori == 1 && (ae = x, se = T, ee = w, U = C), Re && li(
        z,
        Rt(ae, z),
        Rt(ae + se, z)
      ), Fe)
        for (let H in S) {
          let ve = S[H];
          H != z && ve.from == null && ve.min != pe && li(
            H,
            Rt(ee + U, H),
            Rt(ee, H)
          );
        }
      lo();
    } else L.lock && (L._lock = !L._lock, Ei(a, !0, o != null));
    o != null && (Gi(vo, Eo), On(vo, n, be, $e, Y, P, null));
  }
  function Cc(o, a, c, u, f, g, v) {
    if (L._lock)
      return;
    ki(o);
    let w = si;
    if (si) {
      let x = !0, C = !0, T = 10, D, G;
      A.ori == 0 ? (D = Re, G = Fe) : (D = Fe, G = Re), D && G && (x = be <= T || be >= Y - T, C = $e <= T || $e >= P - T), D && x && (be = be < on ? 0 : Y), G && C && ($e = $e < sn ? 0 : P), Ei(null, !0, !0), si = !1;
    }
    be = -10, $e = -10, de.fill(null), Ei(null, !0, !0), w && (si = w);
  }
  function Rs(o, a, c, u, f, g, v) {
    L._lock || (ki(o), Ur(), lo(), o != null && On(fl, n, be, $e, Y, P, null));
  }
  function Fs() {
    B.forEach(Fd), jr(n.width, n.height, !0);
  }
  Li(Sr, pn, Fs);
  const cn = {};
  cn.mousedown = Ls, cn.mousemove = Ds, cn.mouseup = Hs, cn.dblclick = Rs, cn.setSeries = (o, a, c, u) => {
    let f = Ce.match[2];
    c = f(n, a, c), c != -1 && Ht(c, u, !0, !1);
  }, qe && (Ye(ul, E, Ls), Ye(_o, E, Ds), Ye(hl, E, (o) => {
    ki(o), Nn(!1);
  }), Ye(dl, E, Cc), Ye(fl, E, Rs), Oo.add(n), n.syncRect = Nn);
  const ur = n.hooks = e.hooks || {};
  function Ie(o, a, c) {
    eo ? Dn.push([o, a, c]) : o in ur && ur[o].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((o) => {
    for (let a in o.hooks)
      ur[a] = (ur[a] || []).concat(o.hooks[a]);
  });
  const Is = (o, a, c) => c, Ce = Te({
    key: null,
    setSeries: !1,
    filters: {
      pub: kl,
      sub: kl
    },
    scales: [z, $[1] ? $[1].scale : null],
    match: [Sl, Sl, Is],
    values: [null, null]
  }, L.sync);
  Ce.match.length == 2 && Ce.match.push(Is), L.sync = Ce;
  const Bs = Ce.key, ao = Ua(Bs);
  function On(o, a, c, u, f, g, v) {
    Ce.filters.pub(o, a, c, u, f, g, v) && ao.pub(o, a, c, u, f, g, v);
  }
  ao.sub(n);
  function Tc(o, a, c, u, f, g, v) {
    Ce.filters.sub(o, a, c, u, f, g, v) && cn[o](null, a, c, u, f, g, v);
  }
  n.pub = Tc;
  function Pc() {
    ao.unsub(n), Oo.delete(n), vi.clear(), Po(Sr, pn, Fs), p.remove(), ue?.remove(), Ie("destroy");
  }
  n.destroy = Pc;
  function co() {
    Ie("init", e, t), bs(t || e.data, !1), I[z] ? to(z, I[z]) : Ur(), nr = _e.show && (_e.width > 0 || _e.height > 0), $i = mt = !0, jr(e.width, e.height);
  }
  return $.forEach(ms), B.forEach(ac), i ? i instanceof HTMLElement ? (i.appendChild(p), co()) : i(n, co) : co(), n;
}
Ke.assign = Te;
Ke.fmtNum = is;
Ke.rangeNum = Ar;
Ke.rangeLog = zr;
Ke.rangeAsinh = es;
Ke.orient = Ui;
Ke.pxRatio = ce;
Ke.join = Ph;
Ke.fmtDate = rs, Ke.tzDate = Bh;
Ke.sync = Ua;
{
  Ke.addGap = $d, Ke.clipGaps = Or;
  let e = Ke.paths = {
    points: Ya
  };
  e.linear = Ja, e.stepped = Ad, e.bars = Ed, e.spline = Td;
}
const Id = 24;
async function Bd(e, t, i, n) {
  const r = new Date(Date.now() - i * 60 * 60 * 1e3), s = {};
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
      start_time: r.toISOString(),
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
function Fn(e) {
  if (!e) return [];
  const t = [];
  for (const i of e) {
    const n = parseFloat(i.s);
    Number.isFinite(n) && t.push([i.lu, n]);
  }
  return t.sort((i, n) => i[0] - n[0]), t;
}
function jd(e, t) {
  const i = /* @__PURE__ */ new Set();
  for (const s of e) for (const [l] of s) i.add(l);
  if (i.size === 0)
    return [[t], ...e.map(() => [null])];
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
const Ud = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Vd = Object.defineProperty, Fr = (e, t, i, n) => {
  for (var r = void 0, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = l(t, i, r) || r);
  return r && Vd(t, i, r), r;
};
const Wd = [
  We,
  Bo(Ud),
  Ne`
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
], Kl = () => {
};
class An extends Ee {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = Wd;
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
Fr([
  te()
], An.prototype, "_loading");
Fr([
  te()
], An.prototype, "_error");
Fr([
  te()
], An.prototype, "_empty");
Fr([
  xn(".chart-host")
], An.prototype, "_host");
var Gd = Object.defineProperty, Kd = Object.getOwnPropertyDescriptor, ii = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Kd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Gd(t, i, r), r;
};
const Ho = 260, qd = 3;
let Dt = class extends An {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return Ho;
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
    this._unsubscribe && this._unsubscribe !== Kl && this._unsubscribe(), this._unsubscribe = Kl;
    const e = qd + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const n = await Bd(this.hass, i, Id, (r) => {
        t === this._fetchGen && (this._renderPlot(r), this._loading = !1);
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
    const i = [...e].sort((r, s) => r.lu - s.lu), n = [];
    for (let r = 0; r < i.length; r++) {
      const s = i[r].lu, l = i[r + 1]?.lu ?? t, h = i[r].s;
      (h === "heating" || h === "cooling") && n.push({ start: s, end: l, action: h });
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), i = Fn(e[this.roomEntity]), n = Fn(e[this.lowEntity]), r = Fn(e[this.highEntity]), s = this._hasApparent ? Fn(e[this.apparentEntity]) : [], l = this._hasHumidity ? Fn(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && r.length === 0 && s.length === 0 && l.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const h = [i, n, r];
    this._hasApparent && h.push(s), this._hasHumidity && h.push(l);
    const d = jd(h, t), p = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: p.width, height: p.height }), this._plot.setData(d), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Ke(p, d, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = this._resolveColor("--cb-action-heating", "#d9603f"), i = this._resolveColor("--cb-action-cooling", "#2f7fcc"), n = this._resolveColor("--primary-color", "#03a9f4"), r = this._resolveColor("--secondary-text-color", "#727272"), s = this._resolveColor("--divider-color", "#e0e0e0"), l = [
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
      stroke: r,
      width: 1.2,
      spanGaps: !0,
      show: !this._hiddenLabels.has("Humidity")
    });
    const h = [
      {
        stroke: r,
        grid: { stroke: s }
      },
      {
        stroke: r,
        grid: { stroke: s },
        size: 38
      }
    ];
    this._hasHumidity && h.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: r,
      grid: { show: !1 },
      values: (p, b) => b.map((m) => `${m.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: Ho,
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
              const E = p.valToPos(k.start, "x", !0), N = p.valToPos(k.end, "x", !0);
              N <= E || (b.fillStyle = k.action === "heating" ? ql(t, 0.18) : ql(i, 0.18), b.fillRect(E, m, N - E, _));
            }
            b.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return y`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return y`
      ${this._loading ? y`<div class="status">Loading 24 h history…</div>` : F}
      ${this._error ? y`<div class="status">${this._error}</div>` : F}
      ${this._empty ? y`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : F}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? F : this._renderLegend()}
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
    return y`<div class="legend">
      ${this._toggleItem(
      "Room",
      y`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      y`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : F}
      ${this._toggleItem(
      "Low band",
      y`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      y`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      y`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
      "Humidity (%, right axis)"
    ) : F}
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
    return y`<span
      class="toggle ${n ? "hidden" : ""}"
      role="button"
      tabindex="0"
      aria-pressed=${n ? "true" : "false"}
      @click=${() => this._toggleLabel(e)}
      @keydown=${(r) => this._onLabelKeyDown(r, e)}
      >${t}${i ?? e}</span
    >`;
  }
};
Dt.styles = [
  ...An.styles,
  Ne`
      .chart-host {
        height: ${Bo(Ho)}px;
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
  M({ attribute: !1 })
], Dt.prototype, "hass", 2);
ii([
  M({ type: String })
], Dt.prototype, "roomEntity", 2);
ii([
  M({ type: String })
], Dt.prototype, "lowEntity", 2);
ii([
  M({ type: String })
], Dt.prototype, "highEntity", 2);
ii([
  M({ type: String })
], Dt.prototype, "actionEntity", 2);
ii([
  M({ type: String })
], Dt.prototype, "apparentEntity", 2);
ii([
  M({ type: String })
], Dt.prototype, "humidityEntity", 2);
ii([
  te()
], Dt.prototype, "_hiddenLabels", 2);
Dt = ii([
  Ve("comfort-band-history-chart")
], Dt);
function ql(e, t) {
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
var Yd = Object.defineProperty, Zd = Object.getOwnPropertyDescriptor, hs = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Zd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Yd(t, i, r), r;
};
let Jn = class extends Ee {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return y`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = fa(this.hass, e), n = t ?? "", r = t && i ? i : "";
    return y`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
        .apparentEntity=${n}
        .humidityEntity=${r}
      ></comfort-band-history-chart>
      ${this._renderOverlayHint(t, i)}
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
    return e ? t ? F : y`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : y`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
Jn.styles = [
  We,
  Ne`
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
hs([
  M({ attribute: !1 })
], Jn.prototype, "hass", 2);
hs([
  M({ attribute: !1 })
], Jn.prototype, "entities", 2);
Jn = hs([
  Ve("comfort-band-insights-tab")
], Jn);
var Jd = Object.defineProperty, Qd = Object.getOwnPropertyDescriptor, ni = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Qd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Jd(t, i, r), r;
};
let zt = class extends Ee {
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
    return y`
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
zt.styles = [
  We,
  Ne`
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
ni([
  M({ type: Number })
], zt.prototype, "min", 2);
ni([
  M({ type: Number })
], zt.prototype, "max", 2);
ni([
  M({ type: Number })
], zt.prototype, "step", 2);
ni([
  M({ type: Number })
], zt.prototype, "low", 2);
ni([
  M({ type: Number })
], zt.prototype, "high", 2);
ni([
  M({ type: String })
], zt.prototype, "unit", 2);
ni([
  te()
], zt.prototype, "_dragging", 2);
ni([
  xn(".track")
], zt.prototype, "_track", 2);
zt = ni([
  Ve("dual-handle-slider")
], zt);
var Xd = Object.defineProperty, ef = Object.getOwnPropertyDescriptor, En = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ef(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Xd(t, i, r), r;
};
const tf = 16, nf = 26, Ro = 0.5, ko = 3;
let mi = class extends Ee {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._heldRange = null, this._chain = Promise.resolve(), this._onInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onChange = (e) => {
      if (this._pendingLow = null, this._pendingHigh = null, !this.hass || !this.zone) return;
      const t = this.hass, i = {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high,
        hours: ko
      };
      this._chain = this._chain.then(() => aa(t, i)).catch(() => {
      });
    };
  }
  render() {
    if (!this.hass || !this.entities) return F;
    const e = Ko(this.hass, this.entities), t = Yl(this.hass, this.entities.manualLow), i = Yl(this.hass, this.entities.manualHigh), n = rf(e.band.low, e.band.high, t, i), r = this._pendingLow ?? n.low, s = this._pendingHigh ?? n.high, l = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(tf, Math.floor(n.low)),
      max: Math.max(nf, Math.ceil(n.high))
    };
    this._heldRange = l;
    const h = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${ko} hours, then the schedule takes over again.` : `Sets this room’s range for ${ko} hours.`;
    return y`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${h}</div>
        <dual-handle-slider
          .min=${l.min}
          .max=${l.max}
          .step=${Ro}
          .low=${r}
          .high=${s}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
};
mi.styles = [
  We,
  Ne`
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
En([
  M({ attribute: !1 })
], mi.prototype, "hass", 2);
En([
  M({ type: String })
], mi.prototype, "zone", 2);
En([
  M({ attribute: !1 })
], mi.prototype, "entities", 2);
En([
  te()
], mi.prototype, "_pendingLow", 2);
En([
  te()
], mi.prototype, "_pendingHigh", 2);
mi = En([
  Ve("comfort-band-exact-range")
], mi);
function Yl(e, t) {
  const i = t !== null ? e.states[t] : void 0;
  if (!i) return NaN;
  const n = parseFloat(i.state);
  return Number.isFinite(n) ? n : NaN;
}
function rf(e, t, i, n) {
  let r = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (r = e, s = t) : Number.isFinite(i) && Number.isFinite(n) && (r = i, s = n), r = Math.round(r * 10) / 10, s = Math.round(s * 10) / 10, s - r < Ro && (s = r + Ro), { low: r, high: s };
}
var of = Object.defineProperty, sf = Object.getOwnPropertyDescriptor, er = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? sf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && of(t, i, r), r;
};
let Fi = class extends Ee {
  constructor() {
    super(...arguments), this.zone = "", this._historyOpen = !1;
  }
  _state(e) {
    return e !== null ? this.hass?.states[e]?.state : void 0;
  }
  _comfortSummary() {
    const e = this._state(this.entities?.useApparentTemperature ?? null);
    return e === "on" ? "“Feels like” on" : e === "off" ? "“Feels like” off" : "";
  }
  _automationSummary() {
    const e = this._state(this.entities?.learningEnabled ?? null);
    return e === "on" ? "Learning on" : e === "off" ? "Learning off" : "";
  }
  _schedulesSummary() {
    if (!this.hass) return "";
    const e = Zo(this.hass), t = e !== null ? this.hass.states[e]?.state : void 0;
    return t === void 0 || t === "unavailable" ? da(this.hass) ? "Not available right now" : "No profiles set up" : !t || t === "unknown" ? "" : `Profile: ${t}`;
  }
  _section(e, t, i, n, r) {
    return y`
      <details
        data-section=${e}
        @toggle=${r ? (s) => r(s.target.open) : F}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${i ? y`<span class="summary">${i}</span>` : F}
          </span>
        </summary>
        <div class="content">${n}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? F : y`
      ${this._section(
      "comfort",
      "Comfort",
      this._comfortSummary(),
      y`<comfort-band-settings-tab
            section="comfort"
            .hass=${this.hass}
            .zone=${this.zone}
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
      y`<comfort-band-settings-tab
          section="automation"
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "schedules",
      "Schedules",
      this._schedulesSummary(),
      y`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`
    )}
      ${this._section(
      "history",
      "History",
      "Last 24 hours",
      this._historyOpen ? y`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : F,
      (e) => this._historyOpen = e
    )}
    `;
  }
};
Fi.styles = [
  We,
  Ne`
      :host {
        display: block;
        padding: var(--cb-gap-sm) var(--cb-gap-md) var(--cb-gap-md);
      }
      details {
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
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
er([
  M({ attribute: !1 })
], Fi.prototype, "hass", 2);
er([
  M({ type: String })
], Fi.prototype, "zone", 2);
er([
  M({ attribute: !1 })
], Fi.prototype, "entities", 2);
er([
  te()
], Fi.prototype, "_historyOpen", 2);
Fi = er([
  Ve("comfort-band-advanced-tab")
], Fi);
var lf = Object.defineProperty, af = Object.getOwnPropertyDescriptor, _i = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? af(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && lf(t, i, r), r;
};
const Pi = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "advanced", label: "Advanced" }
];
let Vt = class extends Ee {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Pi.findIndex((r) => r.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + Pi.length) % Pi.length;
          break;
        case "ArrowRight":
          i = (t + 1) % Pi.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Pi.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = Pi[i].id;
      this._activeTab = n, this.updateComplete.then(() => {
        this.renderRoot.querySelector(`#cb-tab-${n}`)?.focus();
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
    if (!this._isOpen) return F;
    const e = this.zoneName || this.zone || "Comfort Band";
    return y`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Pi.map(
      (t) => y`
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
        return y`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return y`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "advanced":
        return y`<comfort-band-advanced-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-advanced-tab>`;
    }
  }
};
Vt.styles = [
  We,
  Ne`
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
_i([
  M({ attribute: !1 })
], Vt.prototype, "hass", 2);
_i([
  M({ type: String })
], Vt.prototype, "zone", 2);
_i([
  M({ type: String })
], Vt.prototype, "zoneName", 2);
_i([
  M({ attribute: !1 })
], Vt.prototype, "entities", 2);
_i([
  te()
], Vt.prototype, "_activeTab", 2);
_i([
  te()
], Vt.prototype, "_isOpen", 2);
_i([
  xn("dialog")
], Vt.prototype, "_dialog", 2);
Vt = _i([
  Ve("comfort-band-modal")
], Vt);
var cf = Object.defineProperty, uf = Object.getOwnPropertyDescriptor, ds = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? uf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && cf(t, i, r), r;
};
let Qn = class extends Ee {
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
    const e = ha(this.hass, this.config.zone);
    return pa(this.hass, { zone: this.config.zone }, e);
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
      return y`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return y`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? y`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (i) => y` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
Qn.styles = [
  We,
  Ne`
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
ds([
  M({ attribute: !1 })
], Qn.prototype, "hass", 2);
ds([
  M({ attribute: !1 })
], Qn.prototype, "config", 2);
Qn = ds([
  Ve("comfort-band-card-editor")
], Qn);
var hf = Object.defineProperty, df = Object.getOwnPropertyDescriptor, Ir = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? df(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && hf(t, i, r), r;
};
let wn = class extends Ee {
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
    if (!this._config || !this.hass) return y``;
    const e = this._config.zone, t = ha(this.hass, e);
    if (t.deviceId === null)
      return y`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, t);
    return y`
      <comfort-band-tile
        zoneName=${r.zoneName}
        .temperature=${r.temperature}
        .feelsLike=${r.feelsLike}
        .low=${r.low}
        .high=${r.high}
        .action=${r.action}
        .statusKind=${r.statusKind}
        .statusText=${r.statusText}
        .badges=${r.badges}
        .noExpand=${i}
        .variant=${n}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${i ? null : y`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${r.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const i = Ko(e, t), n = sa({
      ...i,
      doing: null,
      now: Date.now(),
      formatTime: (r) => Go(r, e)
    });
    return {
      zoneName: pa(e, this._config, t),
      temperature: i.temperature,
      feelsLike: i.feelsLike,
      low: i.band.low,
      high: i.band.high,
      action: qo(i) ? i.action : "unknown",
      statusKind: n.kind,
      statusText: n.text,
      badges: uu(i)
    };
  }
};
wn.styles = [
  We,
  Ne`
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
Ir([
  M({ attribute: !1 })
], wn.prototype, "hass", 2);
Ir([
  te()
], wn.prototype, "_config", 2);
Ir([
  xn("comfort-band-modal")
], wn.prototype, "_modal", 2);
wn = Ir([
  Ve("comfort-band-card")
], wn);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.15.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
