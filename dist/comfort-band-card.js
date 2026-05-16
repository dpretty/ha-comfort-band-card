const ur = globalThis, Ao = ur.ShadowRoot && (ur.ShadyCSS === void 0 || ur.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Eo = Symbol(), ks = /* @__PURE__ */ new WeakMap();
let El = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== Eo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ao && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = ks.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ks.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pl = (t) => new El(typeof t == "string" ? t : t + "", void 0, Eo), Jt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new El(i, t, Eo);
}, tc = (t, e) => {
  if (Ao) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), r = ur.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, t.appendChild(n);
  }
}, As = Ao ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Pl(i);
})(t) : t;
const { is: ec, defineProperty: ic, getOwnPropertyDescriptor: nc, getOwnPropertyNames: rc, getOwnPropertySymbols: oc, getPrototypeOf: sc } = Object, vr = globalThis, Es = vr.trustedTypes, lc = Es ? Es.emptyScript : "", ac = vr.reactiveElementPolyfillSupport, Fn = (t, e) => t, fr = { toAttribute(t, e) {
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
} }, Po = (t, e) => !ec(t, e), Ps = { attribute: !0, type: String, converter: fr, reflect: !1, useDefault: !1, hasChanged: Po };
Symbol.metadata ??= Symbol("metadata"), vr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let an = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ps) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(e, n, i);
      r !== void 0 && ic(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: r, set: s } = nc(this.prototype, e) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: r, set(l) {
      const u = r?.call(this);
      s?.call(this, l), this.requestUpdate(e, u, n);
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
      const i = this.properties, n = [...rc(i), ...oc(i)];
      for (const r of n) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, r] of i) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const r = this._$Eu(i, n);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const r of n) i.unshift(As(r));
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
    const n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
    if (r !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : fr).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : fr;
      this._$Em = r;
      const u = l.fromAttribute(i, s.type);
      this[r] = u ?? this._$Ej?.get(r) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, r = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (r === !1 && (s = this[e]), n ??= l.getPropertyOptions(e), !((n.hasChanged ?? Po)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: r, wrapped: s }, l) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, l ?? i ?? this[e]), s !== !0 || l !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, s] of n) {
        const { wrapped: l } = s, u = this[r];
        l !== !0 || this._$AL.has(r) || u === void 0 || this.C(r, void 0, s, u);
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
an.elementStyles = [], an.shadowRootOptions = { mode: "open" }, an[Fn("elementProperties")] = /* @__PURE__ */ new Map(), an[Fn("finalized")] = /* @__PURE__ */ new Map(), ac?.({ ReactiveElement: an }), (vr.reactiveElementVersions ??= []).push("2.1.2");
const To = globalThis, Ts = (t) => t, dr = To.trustedTypes, Cs = dr ? dr.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Tl = "$lit$", ui = `lit$${Math.random().toFixed(9).slice(2)}$`, Cl = "?" + ui, cc = `<${Cl}>`, Hi = document, Vn = () => Hi.createComment(""), jn = (t) => t === null || typeof t != "object" && typeof t != "function", Co = Array.isArray, uc = (t) => Co(t) || typeof t?.[Symbol.iterator] == "function", Xr = `[ 	
\f\r]`, zn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ms = /-->/g, Ds = />/g, Ci = RegExp(`>|${Xr}(?:([^\\s"'>=/]+)(${Xr}*=${Xr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zs = /'/g, Ns = /"/g, Ml = /^(?:script|style|textarea|title)$/i, Dl = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), D = Dl(1), hi = Dl(2), hn = Symbol.for("lit-noChange"), nt = Symbol.for("lit-nothing"), Os = /* @__PURE__ */ new WeakMap(), Ni = Hi.createTreeWalker(Hi, 129);
function zl(t, e) {
  if (!Co(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Cs !== void 0 ? Cs.createHTML(e) : e;
}
const hc = (t, e) => {
  const i = t.length - 1, n = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = zn;
  for (let u = 0; u < i; u++) {
    const f = t[u];
    let p, _, g = -1, b = 0;
    for (; b < f.length && (l.lastIndex = b, _ = l.exec(f), _ !== null); ) b = l.lastIndex, l === zn ? _[1] === "!--" ? l = Ms : _[1] !== void 0 ? l = Ds : _[2] !== void 0 ? (Ml.test(_[2]) && (r = RegExp("</" + _[2], "g")), l = Ci) : _[3] !== void 0 && (l = Ci) : l === Ci ? _[0] === ">" ? (l = r ?? zn, g = -1) : _[1] === void 0 ? g = -2 : (g = l.lastIndex - _[2].length, p = _[1], l = _[3] === void 0 ? Ci : _[3] === '"' ? Ns : zs) : l === Ns || l === zs ? l = Ci : l === Ms || l === Ds ? l = zn : (l = Ci, r = void 0);
    const k = l === Ci && t[u + 1].startsWith("/>") ? " " : "";
    s += l === zn ? f + cc : g >= 0 ? (n.push(p), f.slice(0, g) + Tl + f.slice(g) + ui + k) : f + ui + (g === -2 ? u : k);
  }
  return [zl(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Bn {
  constructor({ strings: e, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const u = e.length - 1, f = this.parts, [p, _] = hc(e, i);
    if (this.el = Bn.createElement(p, n), Ni.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Ni.nextNode()) !== null && f.length < u; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Tl)) {
          const b = _[l++], k = r.getAttribute(g).split(ui), E = /([.?@])?(.*)/.exec(b);
          f.push({ type: 1, index: s, name: E[2], strings: k, ctor: E[1] === "." ? dc : E[1] === "?" ? pc : E[1] === "@" ? gc : yr }), r.removeAttribute(g);
        } else g.startsWith(ui) && (f.push({ type: 6, index: s }), r.removeAttribute(g));
        if (Ml.test(r.tagName)) {
          const g = r.textContent.split(ui), b = g.length - 1;
          if (b > 0) {
            r.textContent = dr ? dr.emptyScript : "";
            for (let k = 0; k < b; k++) r.append(g[k], Vn()), Ni.nextNode(), f.push({ type: 2, index: ++s });
            r.append(g[b], Vn());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Cl) f.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(ui, g + 1)) !== -1; ) f.push({ type: 7, index: s }), g += ui.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const n = Hi.createElement("template");
    return n.innerHTML = e, n;
  }
}
function fn(t, e, i = t, n) {
  if (e === hn) return e;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = jn(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (e = fn(t, r._$AS(t, e.values), r, n)), e;
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
    const { el: { content: i }, parts: n } = this._$AD, r = (e?.creationScope ?? Hi).importNode(i, !0);
    Ni.currentNode = r;
    let s = Ni.nextNode(), l = 0, u = 0, f = n[0];
    for (; f !== void 0; ) {
      if (l === f.index) {
        let p;
        f.type === 2 ? p = new Kn(s, s.nextSibling, this, e) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, e) : f.type === 6 && (p = new mc(s, this, e)), this._$AV.push(p), f = n[++u];
      }
      l !== f?.index && (s = Ni.nextNode(), l++);
    }
    return Ni.currentNode = Hi, r;
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
  constructor(e, i, n, r) {
    this.type = 2, this._$AH = nt, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = fn(this, e, i), jn(e) ? e === nt || e == null || e === "" ? (this._$AH !== nt && this._$AR(), this._$AH = nt) : e !== this._$AH && e !== hn && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : uc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== nt && jn(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Hi.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Bn.createElement(zl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new fc(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Os.get(e.strings);
    return i === void 0 && Os.set(e.strings, i = new Bn(e)), i;
  }
  k(e) {
    Co(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of e) r === i.length ? i.push(n = new Kn(this.O(Vn()), this.O(Vn()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
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
class yr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, r, s) {
    this.type = 1, this._$AH = nt, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = nt;
  }
  _$AI(e, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = fn(this, e, i, 0), l = !jn(e) || e !== this._$AH && e !== hn, l && (this._$AH = e);
    else {
      const u = e;
      let f, p;
      for (e = s[0], f = 0; f < s.length - 1; f++) p = fn(this, u[n + f], i, f), p === hn && (p = this._$AH[f]), l ||= !jn(p) || p !== this._$AH[f], p === nt ? e = nt : e !== nt && (e += (p ?? "") + s[f + 1]), this._$AH[f] = p;
    }
    l && !r && this.j(e);
  }
  j(e) {
    e === nt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class dc extends yr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === nt ? void 0 : e;
  }
}
class pc extends yr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== nt);
  }
}
class gc extends yr {
  constructor(e, i, n, r, s) {
    super(e, i, n, r, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = fn(this, e, i, 0) ?? nt) === hn) return;
    const n = this._$AH, r = e === nt && n !== nt || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== nt && (n === nt || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
    fn(this, e);
  }
}
const bc = To.litHtmlPolyfillSupport;
bc?.(Bn, Kn), (To.litHtmlVersions ??= []).push("3.3.2");
const _c = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Kn(e.insertBefore(Vn(), s), s, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const Mo = globalThis;
class Ut extends an {
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
    return hn;
  }
}
Ut._$litElement$ = !0, Ut.finalized = !0, Mo.litElementHydrateSupport?.({ LitElement: Ut });
const vc = Mo.litElementPolyfillSupport;
vc?.({ LitElement: Ut });
(Mo.litElementVersions ??= []).push("4.2.2");
const ee = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const yc = { attribute: !0, type: String, converter: fr, reflect: !1, hasChanged: Po }, wc = (t = yc, e, i) => {
  const { kind: n, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), n === "accessor") {
    const { name: l } = i;
    return { set(u) {
      const f = e.get.call(this);
      e.set.call(this, u), this.requestUpdate(l, f, t, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(l, void 0, t, u), u;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(u) {
      const f = this[l];
      e.call(this, u), this.requestUpdate(l, f, t, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function j(t) {
  return (e, i) => typeof i == "object" ? wc(t, e, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, i);
}
function ct(t) {
  return j({ ...t, state: !0, attribute: !1 });
}
const xc = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
function _n(t, e) {
  return (i, n, r) => {
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
function pr(t) {
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
function gr(t) {
  return t === "heating" || t === "cooling" || t === "idle" ? t : "unknown";
}
function fo(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var $c = Object.defineProperty, Sc = Object.getOwnPropertyDescriptor, qn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Sc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && $c(e, i, r), r;
};
const po = 15, Nl = 28, kc = Nl - po;
function to(t) {
  return Number.isNaN(t) || !Number.isFinite(t) ? 0 : (Math.max(po, Math.min(Nl, t)) - po) / kc * 100;
}
let Li = class extends Ut {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const t = gr(this.action), e = pr(t), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? to(this.low) : 0, l = n ? to(this.high) : 100, u = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = r ? to(this.room) : 50, _ = (b) => Number.isFinite(b) ? `${b.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${_(this.low)}, room ${_(this.room)}, high ${_(this.high)}, action ${t}`;
    return D`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${hi`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? hi`<rect class="band" x=${u} y="9" width=${f} height="6" rx="3" fill=${e}></rect>` : null}
        ${r ? hi`<circle cx=${p} cy="12" r="4.5" fill=${e}></circle>` : null}
        ${r ? hi`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${e}></circle>` : null}
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
  j({ type: Number })
], Li.prototype, "low", 2);
qn([
  j({ type: Number })
], Li.prototype, "high", 2);
qn([
  j({ type: Number })
], Li.prototype, "room", 2);
qn([
  j({ type: String })
], Li.prototype, "action", 2);
Li = qn([
  ee("band-gauge")
], Li);
var Ac = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, Ye = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ec(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Ac(e, i, r), r;
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
    return D`<div class="override-pill">Override${t ? ` · ${t}` : ""}</div>`;
  }
  _renderActionChip() {
    const t = gr(this.action);
    if (t === "idle" || t === "unknown") return null;
    const e = pr(t);
    return D`<span class="action-chip" style="background:${e}">
      ${fo(t)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : D`
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
    const t = gr(this.action), e = t === "heating" || t === "cooling", i = e ? `--cb-mini-bg:${pr(t)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${e ? `, ${fo(t)}` : ""}`;
    return D`
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
Ye([
  j({ type: String })
], ye.prototype, "zoneName", 2);
Ye([
  j({ type: Number })
], ye.prototype, "roomTemp", 2);
Ye([
  j({ type: Number })
], ye.prototype, "low", 2);
Ye([
  j({ type: Number })
], ye.prototype, "high", 2);
Ye([
  j({ type: String })
], ye.prototype, "action", 2);
Ye([
  j({ type: Boolean })
], ye.prototype, "overrideActive", 2);
Ye([
  j({ type: String })
], ye.prototype, "overrideEnds", 2);
Ye([
  j({ type: Boolean })
], ye.prototype, "noExpand", 2);
Ye([
  j({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
ye = Ye([
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
  const r = Math.floor(n / 60), s = n % 60;
  return s ? `${r}h ${s}m left` : `${r}h left`;
}
var Tc = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, ii = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Cc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Tc(e, i, r), r;
};
let De = class extends Ut {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (t, e) => {
      t.preventDefault();
      const i = t.currentTarget;
      i.setPointerCapture(t.pointerId), this._dragging = e;
      const n = (s) => {
        this._setHandle(e, this._xToValue(s.clientX)) && this._fire("input");
      }, r = (s) => {
        i.releasePointerCapture(s.pointerId), i.removeEventListener("pointermove", n), i.removeEventListener("pointerup", r), i.removeEventListener("pointercancel", r), this._dragging = null, this._fire("change");
      };
      i.addEventListener("pointermove", n), i.addEventListener("pointerup", r), i.addEventListener("pointercancel", r);
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
    return D`
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
ii([
  j({ type: Number })
], De.prototype, "min", 2);
ii([
  j({ type: Number })
], De.prototype, "max", 2);
ii([
  j({ type: Number })
], De.prototype, "step", 2);
ii([
  j({ type: Number })
], De.prototype, "low", 2);
ii([
  j({ type: Number })
], De.prototype, "high", 2);
ii([
  j({ type: String })
], De.prototype, "unit", 2);
ii([
  ct()
], De.prototype, "_dragging", 2);
ii([
  _n(".track")
], De.prototype, "_track", 2);
De = ii([
  ee("dual-handle-slider")
], De);
const mi = "comfort_band";
function Mc(t, e, i) {
  return t.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...e }
  );
}
function Dc(t, e) {
  return t.callService(mi, "set_schedule", { ...e });
}
function zc(t, e) {
  const i = { zone: e.zone };
  return e.low !== void 0 && (i.low = e.low), e.high !== void 0 && (i.high = e.high), e.hours !== void 0 && (i.hours = e.hours), t.callService(mi, "start_override", i);
}
function Nc(t, e) {
  return t.callService(mi, "cancel_override", { ...e });
}
function Oc(t, e) {
  return t.callService(mi, "set_profile", { ...e });
}
function Hc(t, e) {
  const i = { name: e.name };
  return e.description !== void 0 && (i.description = e.description), t.callService(mi, "create_profile", i);
}
function Lc(t, e) {
  const i = { source: e.source, target: e.target };
  return e.description !== void 0 && (i.description = e.description), t.callService(mi, "clone_profile", i);
}
function Rc(t, e) {
  return t.callService(mi, "rename_profile", { old: e.old, new: e.new });
}
function Fc(t, e) {
  return t.callService(mi, "delete_profile", { name: e.name });
}
var Uc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, vn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ic(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Uc(e, i, r), r;
};
const Vc = [1, 3, 6];
let fi = class extends Ut {
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
      !this.hass || !this.zone || Nc(this.hass, { zone: this.zone });
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
    if (!this.hass || !this.entities) return nt;
    const t = this._numericState(this.entities.manualLow), e = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), l = this._stateOf(this.entities.currentAction)?.state ?? "unknown", u = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._pendingLow ?? (Number.isFinite(t) ? t : 19), p = this._pendingHigh ?? (Number.isFinite(e) ? e : 22), _ = gr(l), g = _ !== "idle" && _ !== "unknown";
    return D`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${g ? D`<span class="action-chip" style="background:${pr(_)}"
              >${fo(_)}</span
            >` : nt}
      </div>
      <div class="gauge-row">
        <band-gauge .low=${i} .high=${n} .room=${r} .action=${l}></band-gauge>
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

      ${this._renderOverrideSection(u)} ${this._renderHoursSection(s)}
    `;
  }
  _renderOverrideSection(t) {
    if (!t) return nt;
    const e = this._stateOf(this.entities.overrideEnds)?.state, i = jc(e ?? null);
    return D`
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
    return this.entities?.overrideHours ? D`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Vc.map(
      (e) => D`
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
    ` : nt;
  }
};
fi.styles = [
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
vn([
  j({ attribute: !1 })
], fi.prototype, "hass", 2);
vn([
  j({ type: String })
], fi.prototype, "zone", 2);
vn([
  j({ attribute: !1 })
], fi.prototype, "entities", 2);
vn([
  ct()
], fi.prototype, "_pendingLow", 2);
vn([
  ct()
], fi.prototype, "_pendingHigh", 2);
fi = vn([
  ee("comfort-band-now-tab")
], fi);
function jc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const i = e - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const r = Math.floor(n / 60), s = n % 60;
  return s ? `${r}h ${s}m left` : `${r}h left`;
}
var Bc = Object.defineProperty, Wc = Object.getOwnPropertyDescriptor, bi = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Wc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Bc(e, i, r), r;
};
let je = class extends Ut {
  constructor() {
    super(...arguments), this.mode = "create", this.existingName = "", this.existingNames = [], this._name = "", this._description = "", this._error = null, this._onSave = () => {
      this._validate() && this.dispatchEvent(
        new CustomEvent("dialog-save", {
          detail: { name: this._name.trim(), description: this._description.trim() },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._onCancel = () => {
      this.dispatchEvent(new CustomEvent("dialog-cancel", { bubbles: !0, composed: !0 }));
    }, this._onKey = (t) => {
      t.key === "Enter" ? (t.preventDefault(), this._onSave()) : t.key === "Escape" && (t.preventDefault(), this._onCancel());
    };
  }
  willUpdate(t) {
    (t.has("mode") || t.has("existingName")) && (this._name = this.mode === "rename" ? this.existingName : "", this._description = "", this._error = null);
  }
  firstUpdated() {
    queueMicrotask(() => {
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
    return D`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? D`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? D`<label>
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
      ${this._error ? D`<div class="error">${this._error}</div>` : null}
      <div class="actions">
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
bi([
  j({ type: String })
], je.prototype, "mode", 2);
bi([
  j({ type: String })
], je.prototype, "existingName", 2);
bi([
  j({ type: Array })
], je.prototype, "existingNames", 2);
bi([
  ct()
], je.prototype, "_name", 2);
bi([
  ct()
], je.prototype, "_description", 2);
bi([
  ct()
], je.prototype, "_error", 2);
bi([
  _n('input[name="name"]')
], je.prototype, "_nameInput", 2);
je = bi([
  ee("profile-edit-dialog")
], je);
const Do = "comfort_band", Yc = {
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
function Gc() {
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
function Ol(t, e) {
  for (const i of Object.values(t.devices))
    for (const [n, r] of i.identifiers)
      if (n === e[0] && r === e[1])
        return i;
  return null;
}
function Hl(t, e) {
  return Object.values(t.entities).filter(
    (i) => i.device_id === e && i.platform === Do
  );
}
function Kc(t, e) {
  const i = Gc(), n = Ol(t, [Do, `zone:${e}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Hl(t, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = Yc[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function Ll(t) {
  const e = Ol(t, [Do, "profile_manager"]);
  if (e === null) return null;
  for (const i of Hl(t, e.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
var qc = Object.defineProperty, Zc = Object.getOwnPropertyDescriptor, yn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Zc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && qc(e, i, r), r;
};
let di = class extends Ut {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._onDocumentClick = (t) => {
      if (this._openMenu === null) return;
      t.composedPath().some(
        (n) => n instanceof HTMLElement && (n.classList?.contains("menu") || n.classList?.contains("overflow"))
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._mode = "list", this._target = null, this._error = null;
    }, this._onDialogSave = async (t) => {
      if (!this.hass) return;
      const { name: e, description: i } = t.detail, n = this._mode, r = this._target;
      try {
        if (n === "create")
          await Hc(this.hass, { name: e, description: i });
        else if (n === "clone" && r)
          await Lc(this.hass, { source: r, target: e, description: i });
        else if (n === "rename" && r)
          e !== r && await Rc(this.hass, { old: r, new: e });
        else
          return;
        this._mode = "list", this._target = null, this._error = null;
      } catch (s) {
        this._error = s instanceof Error ? s.message : "Failed to save profile.";
      }
    }, this._onConfirmDelete = async () => {
      if (!this.hass || !this._target) return;
      const t = this._target;
      try {
        await Fc(this.hass, { name: t }), this._mode = "list", this._target = null, this._error = null;
      } catch (e) {
        this._error = e instanceof Error ? e.message : "Failed to delete profile.";
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._onDocumentClick, !0);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this._onDocumentClick, !0), super.disconnectedCallback();
  }
  _readState() {
    if (!this.hass) return null;
    const t = Ll(this.hass);
    if (t === null) return null;
    const e = this.hass.states[t];
    if (!e) return null;
    const i = e.attributes.options, n = Array.isArray(i) ? i.filter((p) => typeof p == "string") : [], r = typeof e.state == "string" ? e.state : "", s = e.attributes.default_profile, l = typeof s == "string" && s ? s : "home", u = e.attributes.descriptions, f = {};
    if (u && typeof u == "object" && !Array.isArray(u))
      for (const [p, _] of Object.entries(u))
        typeof _ == "string" && (f[p] = _);
    return { options: n, active: r, defaultProfile: l, descriptions: f };
  }
  _onSelect(t) {
    this.hass && Oc(this.hass, { profile: t });
  }
  _toggleMenu(t, e) {
    e.stopPropagation(), this._openMenu = this._openMenu === t ? null : t;
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
    if (!this.hass) return nt;
    const t = this._readState();
    if (t === null)
      return D`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: e, active: i, defaultProfile: n, descriptions: r } = t;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return D`
        ${this._error ? D`<div class="error">${this._error}</div>` : null}
        <profile-edit-dialog
          .mode=${this._mode}
          .existingName=${this._target ?? ""}
          .existingNames=${e}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
        ></profile-edit-dialog>
      `;
    if (this._mode === "confirm-delete" && this._target) {
      const s = this._target === i;
      return D`
        <div class="confirm-delete">
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${" "}
            ${s ? D`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? D`<div class="error">${this._error}</div>` : null}
          <div class="confirm-actions">
            <button class="button secondary" @click=${this._onDialogCancel}>Cancel</button>
            <button class="button danger" @click=${this._onConfirmDelete}>Delete</button>
          </div>
        </div>
      `;
    }
    return e.length === 0 ? D`<div class="empty">No profiles configured.</div>` : D`
      ${this._error ? D`<div class="error">${this._error}</div>` : null}
      <button class="new-profile" type="button" @click=${this._onNew}>+ New profile</button>
      <ul role="listbox" aria-label="Profiles">
        ${e.map((s) => this._renderRow(s, i, n, r))}
      </ul>
    `;
  }
  _renderRow(t, e, i, n) {
    const r = t === e, s = t === i, l = n[t] ?? "";
    return D`
      <li
        role="option"
        tabindex="0"
        class=${r ? "active" : ""}
        aria-selected=${r}
        @click=${() => this._onSelect(t)}
        @keydown=${(u) => {
      (u.key === "Enter" || u.key === " ") && (u.preventDefault(), this._onSelect(t));
    }}
      >
        <span class="label">
          <span class="name">${t}</span>
          ${l ? D`<span class="description">${l}</span>` : nt}
        </span>
        ${r ? D`<span class="badge">Active</span>` : nt}
        <button
          class="overflow"
          type="button"
          aria-label="More actions for ${t}"
          aria-haspopup="menu"
          aria-expanded=${this._openMenu === t}
          @click=${(u) => this._toggleMenu(t, u)}
        >
          ⋮
        </button>
        ${this._openMenu === t ? D`
              <div class="menu" role="menu" @click=${(u) => u.stopPropagation()}>
                <button
                  role="menuitem"
                  @click=${(u) => {
      u.stopPropagation(), this._onClone(t);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(u) => {
      u.stopPropagation(), this._onRename(t);
    }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${s}
                  aria-disabled=${s}
                  @click=${(u) => {
      u.stopPropagation(), s || this._onDelete(t);
    }}
                  title=${s ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : nt}
      </li>
    `;
  }
};
di.styles = [
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
        padding: 4px 8px;
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
        right: var(--cb-gap-md);
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
        color: var(--cb-text-secondary, var(--secondary-text-color, #727272));
      }
      .confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-sm);
      }
      .button {
        font: inherit;
        padding: 6px 12px;
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
yn([
  j({ attribute: !1 })
], di.prototype, "hass", 2);
yn([
  ct()
], di.prototype, "_mode", 2);
yn([
  ct()
], di.prototype, "_target", 2);
yn([
  ct()
], di.prototype, "_openMenu", 2);
yn([
  ct()
], di.prototype, "_error", 2);
di = yn([
  ee("comfort-band-profiles-tab")
], di);
const Jc = !0, zt = "u-", Qc = "uplot", Xc = zt + "hz", tu = zt + "vt", eu = zt + "title", iu = zt + "wrap", nu = zt + "under", ru = zt + "over", ou = zt + "axis", zi = zt + "off", su = zt + "select", lu = zt + "cursor-x", au = zt + "cursor-y", cu = zt + "cursor-pt", uu = zt + "legend", hu = zt + "live", fu = zt + "inline", du = zt + "series", pu = zt + "marker", Hs = zt + "label", gu = zt + "value", Hn = "width", Ln = "height", Nn = "top", Ls = "bottom", sn = "left", eo = "right", zo = "#000", Rs = zo + "0", io = "mousemove", Fs = "mousedown", no = "mouseup", Us = "mouseenter", Is = "mouseleave", Vs = "dblclick", mu = "resize", bu = "scroll", js = "change", mr = "dppxchange", No = "--", wn = typeof window < "u", go = wn ? document : null, un = wn ? window : null, _u = wn ? navigator : null;
let at, sr;
function mo() {
  let t = devicePixelRatio;
  at != t && (at = t, sr && _o(js, sr, mo), sr = matchMedia(`(min-resolution: ${at - 1e-3}dppx) and (max-resolution: ${at + 1e-3}dppx)`), Oi(js, sr, mo), un.dispatchEvent(new CustomEvent(mr)));
}
function ae(t, e) {
  if (e != null) {
    let i = t.classList;
    !i.contains(e) && i.add(e);
  }
}
function bo(t, e) {
  let i = t.classList;
  i.contains(e) && i.remove(e);
}
function yt(t, e, i) {
  t.style[e] = i + "px";
}
function Pe(t, e, i, n) {
  let r = go.createElement(t);
  return e != null && ae(r, e), i?.insertBefore(r, n), r;
}
function _e(t, e) {
  return Pe("div", t, e);
}
const Bs = /* @__PURE__ */ new WeakMap();
function Ue(t, e, i, n, r) {
  let s = "translate(" + e + "px," + i + "px)", l = Bs.get(t);
  s != l && (t.style.transform = s, Bs.set(t, s), e < 0 || i < 0 || e > n || i > r ? ae(t, zi) : bo(t, zi));
}
const Ws = /* @__PURE__ */ new WeakMap();
function Ys(t, e, i) {
  let n = e + i, r = Ws.get(t);
  n != r && (Ws.set(t, n), t.style.background = e, t.style.borderColor = i);
}
const Gs = /* @__PURE__ */ new WeakMap();
function Ks(t, e, i, n) {
  let r = e + "" + i, s = Gs.get(t);
  r != s && (Gs.set(t, r), t.style.height = i + "px", t.style.width = e + "px", t.style.marginLeft = n ? -e / 2 + "px" : 0, t.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Oo = { passive: !0 }, vu = { ...Oo, capture: !0 };
function Oi(t, e, i, n) {
  e.addEventListener(t, i, n ? vu : Oo);
}
function _o(t, e, i, n) {
  e.removeEventListener(t, i, Oo);
}
wn && mo();
function Ce(t, e, i, n) {
  let r;
  i = i || 0, n = n || e.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ce((i + n) / 2), e[r] < t ? i = r : n = r;
  return t - e[i] <= e[n] - t ? i : n;
}
function Rl(t) {
  return (i, n, r) => {
    let s = -1, l = -1;
    for (let u = n; u <= r; u++)
      if (t(i[u])) {
        s = u;
        break;
      }
    for (let u = r; u >= n; u--)
      if (t(i[u])) {
        l = u;
        break;
      }
    return [s, l];
  };
}
const Fl = (t) => t != null, Ul = (t) => t != null && t > 0, wr = Rl(Fl), yu = Rl(Ul);
function wu(t, e, i, n = 0, r = !1) {
  let s = r ? yu : wr, l = r ? Ul : Fl;
  [e, i] = s(t, e, i);
  let u = t[e], f = t[e];
  if (e > -1)
    if (n == 1)
      u = t[e], f = t[i];
    else if (n == -1)
      u = t[i], f = t[e];
    else
      for (let p = e; p <= i; p++) {
        let _ = t[p];
        l(_) && (_ < u ? u = _ : _ > f && (f = _));
      }
  return [u ?? pt, f ?? -pt];
}
function xr(t, e, i, n) {
  let r = Js(t), s = Js(e);
  t == e && (r == -1 ? (t *= i, e /= i) : (t /= i, e *= i));
  let l = i == 10 ? ti : Il, u = r == 1 ? ce : ve, f = s == 1 ? ve : ce, p = u(l(Dt(t))), _ = f(l(Dt(e))), g = dn(i, p), b = dn(i, _);
  return i == 10 && (p < 0 && (g = gt(g, -p)), _ < 0 && (b = gt(b, -_))), n || i == 2 ? (t = g * r, e = b * s) : (t = Wl(t, g), e = $r(e, b)), [t, e];
}
function Ho(t, e, i, n) {
  let r = xr(t, e, i, n);
  return t == 0 && (r[0] = 0), e == 0 && (r[1] = 0), r;
}
const Lo = 0.1, qs = {
  mode: 3,
  pad: Lo
}, Un = {
  pad: 0,
  soft: null,
  mode: 0
}, xu = {
  min: Un,
  max: Un
};
function br(t, e, i, n) {
  return Sr(i) ? Zs(t, e, i) : (Un.pad = i, Un.soft = n ? 0 : null, Un.mode = n ? 3 : 0, Zs(t, e, xu));
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
  let n = i.min, r = i.max, s = st(n.pad, 0), l = st(r.pad, 0), u = st(n.hard, -pt), f = st(r.hard, pt), p = st(n.soft, pt), _ = st(r.soft, -pt), g = st(n.mode, 0), b = st(r.mode, 0), k = e - t, E = ti(k), H = Zt(Dt(t), Dt(e)), U = ti(H), V = Dt(U - E);
  (k < 1e-24 || V > 10) && (k = 0, (t == 0 || e == 0) && (k = 1e-24, g == 2 && p != pt && (s = 0), b == 2 && _ != -pt && (l = 0)));
  let w = k || H || 1e3, F = ti(w), $ = dn(10, ce(F)), Z = w * (k == 0 ? t == 0 ? 0.1 : 1 : s), M = gt(Wl(t - Z, $ / 10), 24), J = t >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : pt, G = Zt(u, M < J && t >= J ? J : Me(J, M)), tt = w * (k == 0 ? e == 0 ? 0.1 : 1 : l), Y = gt($r(e + tt, $ / 10), 24), S = e <= _ && (b == 1 || b == 3 && Y >= _ || b == 2 && Y <= _) ? _ : -pt, q = Me(f, Y > S && e <= S ? S : Zt(S, Y));
  return G == q && G == 0 && (q = 100), [G, q];
}
const Su = new Intl.NumberFormat(wn ? _u.language : "en-US"), Ro = (t) => Su.format(t), ue = Math, hr = ue.PI, Dt = ue.abs, ce = ue.floor, Mt = ue.round, ve = ue.ceil, Me = ue.min, Zt = ue.max, dn = ue.pow, Js = ue.sign, ti = ue.log10, Il = ue.log2, ku = (t, e = 1) => ue.sinh(t) * e, ro = (t, e = 1) => ue.asinh(t / e), pt = 1 / 0;
function Qs(t) {
  return (ti((t ^ t >> 31) - (t >> 31)) | 0) + 1;
}
function vo(t, e, i) {
  return Me(Zt(t, e), i);
}
function Vl(t) {
  return typeof t == "function";
}
function et(t) {
  return Vl(t) ? t : () => t;
}
const Au = () => {
}, jl = (t) => t, Bl = (t, e) => e, Eu = (t) => null, Xs = (t) => !0, tl = (t, e) => t == e, Pu = /\.\d*?(?=9{6,}|0{6,})/gm, Ri = (t) => {
  if (Gl(t) || pi.has(t))
    return t;
  const e = `${t}`, i = e.match(Pu);
  if (i == null)
    return t;
  let n = i[0].length - 1;
  if (e.indexOf("e-") != -1) {
    let [r, s] = e.split("e");
    return +`${Ri(r)}e${s}`;
  }
  return gt(t, n);
};
function Mi(t, e) {
  return Ri(gt(Ri(t / e)) * e);
}
function $r(t, e) {
  return Ri(ve(Ri(t / e)) * e);
}
function Wl(t, e) {
  return Ri(ce(Ri(t / e)) * e);
}
function gt(t, e = 0) {
  if (Gl(t))
    return t;
  let i = 10 ** e, n = t * i * (1 + Number.EPSILON);
  return Mt(n) / i;
}
const pi = /* @__PURE__ */ new Map();
function Yl(t) {
  return (("" + t).split(".")[1] || "").length;
}
function Wn(t, e, i, n) {
  let r = [], s = n.map(Yl);
  for (let l = e; l < i; l++) {
    let u = Dt(l), f = gt(dn(t, l), u);
    for (let p = 0; p < n.length; p++) {
      let _ = t == 10 ? +`${n[p]}e${l}` : n[p] * f, g = (l >= 0 ? 0 : u) + (l >= s[p] ? 0 : s[p]), b = t == 10 ? _ : gt(_, g);
      r.push(b), pi.set(b, g);
    }
  }
  return r;
}
const In = {}, Fo = [], pn = [null, null], ci = Array.isArray, Gl = Number.isInteger, Tu = (t) => t === void 0;
function el(t) {
  return typeof t == "string";
}
function Sr(t) {
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
function gn(t, e = Sr) {
  let i;
  if (ci(t)) {
    let n = t.find((r) => r != null);
    if (ci(n) || e(n)) {
      i = Array(t.length);
      for (let r = 0; r < t.length; r++)
        i[r] = gn(t[r], e);
    } else
      i = t.slice();
  } else if (t instanceof Mu)
    i = t.slice();
  else if (e(t)) {
    i = {};
    for (let n in t)
      n != Kl && (i[n] = gn(t[n], e));
  } else
    i = t;
  return i;
}
function Pt(t) {
  let e = arguments;
  for (let i = 1; i < e.length; i++) {
    let n = e[i];
    for (let r in n)
      r != Kl && (Sr(t[r]) ? Pt(t[r], gn(n[r])) : t[r] = gn(n[r]));
  }
  return t;
}
const Du = 0, zu = 1, Nu = 2;
function Ou(t, e, i) {
  for (let n = 0, r, s = -1; n < e.length; n++) {
    let l = e[n];
    if (l > s) {
      for (r = l - 1; r >= 0 && t[r] == null; )
        t[r--] = null;
      for (r = l + 1; r < i && t[r] == null; )
        t[s = r++] = null;
    }
  }
}
function Hu(t, e) {
  if (Fu(t)) {
    let l = t[0].slice();
    for (let u = 1; u < t.length; u++)
      l.push(...t[u].slice(1));
    return Uu(l[0]) || (l = Ru(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < t.length; l++) {
    let f = t[l][0], p = f.length;
    for (let _ = 0; _ < p; _++)
      i.add(f[_]);
  }
  let n = [Array.from(i).sort((l, u) => l - u)], r = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < r; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < t.length; l++) {
    let u = t[l], f = u[0];
    for (let p = 1; p < u.length; p++) {
      let _ = u[p], g = Array(r).fill(void 0), b = e ? e[l][p] : zu, k = [];
      for (let E = 0; E < _.length; E++) {
        let H = _[E], U = s.get(f[E]);
        H === null ? b != Du && (g[U] = H, b == Nu && k.push(U)) : g[U] = H;
      }
      Ou(g, k, r), n.push(g);
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
  let r = [];
  for (let s = 0; s < t.length; s++) {
    let l = t[s], u = Array(i);
    for (let f = 0; f < i; f++)
      u[f] = l[n[f]];
    r.push(u);
  }
  return r;
}
function Fu(t) {
  let e = t[0][0], i = e.length;
  for (let n = 1; n < t.length; n++) {
    let r = t[n][0];
    if (r.length != i)
      return !1;
    if (r != e) {
      for (let s = 0; s < i; s++)
        if (r[s] != e[s])
          return !1;
    }
  }
  return !0;
}
function Uu(t, e = 100) {
  const i = t.length;
  if (i <= 1)
    return !0;
  let n = 0, r = i - 1;
  for (; n <= r && t[n] == null; )
    n++;
  for (; r >= n && t[r] == null; )
    r--;
  if (r <= n)
    return !0;
  const s = Zt(1, ce((r - n + 1) / e));
  for (let l = t[n], u = n + s; u <= r; u += s) {
    const f = t[u];
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
const Iu = Zl.map(Jl), Vu = ql.map(Jl), ju = {
  MMMM: ql,
  MMM: Vu,
  WWWW: Zl,
  WWW: Iu
};
function On(t) {
  return (t < 10 ? "0" : "") + t;
}
function Bu(t) {
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
  MM: (t) => On(t.getMonth() + 1),
  // 7
  M: (t) => t.getMonth() + 1,
  // 09
  DD: (t) => On(t.getDate()),
  // 9
  D: (t) => t.getDate(),
  // Monday
  WWWW: (t, e) => e.WWWW[t.getDay()],
  // Mon
  WWW: (t, e) => e.WWW[t.getDay()],
  // 03
  HH: (t) => On(t.getHours()),
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
  mm: (t) => On(t.getMinutes()),
  // 9
  m: (t) => t.getMinutes(),
  // 09
  ss: (t) => On(t.getSeconds()),
  // 9
  s: (t) => t.getSeconds(),
  // 374
  fff: (t) => Bu(t.getMilliseconds())
};
function Uo(t, e) {
  e = e || ju;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(t); )
    i.push(r[0][0] == "{" ? Wu[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let u = 0; u < i.length; u++)
      l += typeof i[u] == "string" ? i[u] : i[u](s, e);
    return l;
  };
}
const Yu = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Gu(t, e) {
  let i;
  return e == "UTC" || e == "Etc/UTC" ? i = new Date(+t + t.getTimezoneOffset() * 6e4) : e == Yu ? i = t : (i = new Date(t.toLocaleString("en-US", { timeZone: e })), i.setMilliseconds(t.getMilliseconds())), i;
}
const Ql = (t) => t % 1 == 0, _r = [1, 2, 2.5, 5], Ku = Wn(10, -32, 0, _r), Xl = Wn(10, 0, 32, _r), qu = Xl.filter(Ql), Di = Ku.concat(Xl), Io = `
`, ta = "{YYYY}", il = Io + ta, ea = "{M}/{D}", Rn = Io + ea, lr = Rn + "/{YY}", ia = "{aa}", Zu = "{h}:{mm}", cn = Zu + ia, nl = Io + cn, rl = ":{ss}", ht = null;
function na(t) {
  let e = t * 1e3, i = e * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, f = (t == 1 ? Wn(10, 0, 3, _r).filter(Ql) : Wn(10, -3, 0, _r)).concat([
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
    [l, ta, ht, ht, ht, ht, ht, ht, 1],
    [r * 28, "{MMM}", il, ht, ht, ht, ht, ht, 1],
    [r, ea, il, ht, ht, ht, ht, ht, 1],
    [n, "{h}" + ia, lr, ht, Rn, ht, ht, ht, 1],
    [i, cn, lr, ht, Rn, ht, ht, ht, 1],
    [e, rl, lr + " " + cn, ht, Rn + " " + cn, ht, nl, ht, 1],
    [t, rl + ".{fff}", lr + " " + cn, ht, Rn + " " + cn, ht, nl, ht, 1]
  ];
  function _(g) {
    return (b, k, E, H, U, V) => {
      let w = [], F = U >= l, $ = U >= s && U < l, Z = g(E), M = gt(Z * t, 3), J = oo(Z.getFullYear(), F ? 0 : Z.getMonth(), $ || F ? 1 : Z.getDate()), G = gt(J * t, 3);
      if ($ || F) {
        let tt = $ ? U / s : 0, Y = F ? U / l : 0, S = M == G ? M : gt(oo(J.getFullYear() + Y, J.getMonth() + tt, 1) * t, 3), q = new Date(Mt(S / t)), z = q.getFullYear(), B = q.getMonth();
        for (let R = 0; S <= H; R++) {
          let it = oo(z + Y * R, B + tt * R, 1), L = it - g(gt(it * t, 3));
          S = gt((+it + L) * t, 3), S <= H && w.push(S);
        }
      } else {
        let tt = U >= r ? r : U, Y = ce(E) - ce(M), S = G + Y + $r(M - G, tt);
        w.push(S);
        let q = g(S), z = q.getHours() + q.getMinutes() / i + q.getSeconds() / n, B = U / n, R = b.axes[k]._space, it = V / R;
        for (; S = gt(S + U, t == 1 ? 0 : 3), !(S > H); )
          if (B > 1) {
            let L = ce(gt(z + B, 6)) % 24, rt = g(S).getHours() - L;
            rt > 1 && (rt = -1), S -= rt * n, z = (z + B) % 24;
            let ft = w[w.length - 1];
            gt((S - ft) / U, 3) * it >= 0.7 && w.push(S);
          } else
            w.push(S);
      }
      return w;
    };
  }
  return [
    f,
    p,
    _
  ];
}
const [Ju, Qu, Xu] = na(1), [th, eh, ih] = na(1e-3);
Wn(2, -53, 53, [1]);
function ol(t, e) {
  return t.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : e(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function sl(t, e) {
  return (i, n, r, s, l) => {
    let u = e.find((E) => l >= E[0]) || e[e.length - 1], f, p, _, g, b, k;
    return n.map((E) => {
      let H = t(E), U = H.getFullYear(), V = H.getMonth(), w = H.getDate(), F = H.getHours(), $ = H.getMinutes(), Z = H.getSeconds(), M = U != f && u[2] || V != p && u[3] || w != _ && u[4] || F != g && u[5] || $ != b && u[6] || Z != k && u[7] || u[1];
      return f = U, p = V, _ = w, g = F, b = $, k = Z, M(H);
    });
  };
}
function nh(t, e) {
  let i = Uo(e);
  return (n, r, s, l, u) => r.map((f) => i(t(f)));
}
function oo(t, e, i) {
  return new Date(t, e, i);
}
function ll(t, e) {
  return e(t);
}
const rh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function al(t, e) {
  return (i, n, r, s) => s == null ? No : e(t(n));
}
function oh(t, e) {
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
    stroke: oh,
    fill: sh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function ah(t, e) {
  let i = t.cursor.points, n = _e(), r = i.size(t, e);
  yt(n, Hn, r), yt(n, Ln, r);
  let s = r / -2;
  yt(n, "marginLeft", s), yt(n, "marginTop", s);
  let l = i.width(t, e, r);
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
const so = [0, 0];
function fh(t, e, i) {
  return so[0] = e, so[1] = i, so;
}
function ar(t, e, i, n = !0) {
  return (r) => {
    r.button == 0 && (!n || r.target == e) && i(r);
  };
}
function lo(t, e, i, n = !0) {
  return (r) => {
    (!n || r.target == e) && i(r);
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
    mousedown: ar,
    mouseup: ar,
    click: ar,
    // legend clicks, not .u-over clicks
    dblclick: ar,
    mousemove: lo,
    mouseleave: lo,
    mouseenter: lo
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
    dist: (t, e, i, n, r) => n - r,
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
}, ra = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Vo = Pt({}, ra, {
  filter: Bl
}), oa = Pt({}, Vo, {
  size: 10
}), sa = Pt({}, ra, {
  show: !1
}), jo = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', la = "bold " + jo, aa = 1.5, cl = {
  show: !0,
  scale: "x",
  stroke: zo,
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
  grid: Vo,
  ticks: oa,
  border: sa,
  font: jo,
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
function mh(t, e, i, n, r) {
  return e.map((s) => s == null ? "" : Ro(s));
}
function bh(t, e, i, n, r, s, l) {
  let u = [], f = pi.get(r) || 0;
  i = l ? i : gt($r(i, r), f);
  for (let p = i; p <= n; p = gt(p + r, f))
    u.push(Object.is(p, -0) ? 0 : p);
  return u;
}
function yo(t, e, i, n, r, s, l) {
  const u = [], f = t.scales[t.axes[e].scale].log, p = f == 10 ? ti : Il, _ = ce(p(i));
  r = dn(f, _), f == 10 && (r = Di[Ce(r, Di)]);
  let g = i, b = r * f;
  f == 10 && (b = Di[Ce(b, Di)]);
  do
    u.push(g), g = g + r, f == 10 && !pi.has(g) && (g = gt(g, pi.get(r))), g >= b && (r = g, b = r * f, f == 10 && (b = Di[Ce(b, Di)]));
  while (g <= n);
  return u;
}
function _h(t, e, i, n, r, s, l) {
  let f = t.scales[t.axes[e].scale].asinh, p = n > f ? yo(t, e, Zt(f, i), n, r) : [f], _ = n >= 0 && i <= 0 ? [0] : [];
  return (i < -f ? yo(t, e, Zt(f, -n), -i, r) : [f]).reverse().map((b) => -b).concat(_, p);
}
const ca = /./, vh = /[12357]/, yh = /[125]/, hl = /1/, wo = (t, e, i, n) => t.map((r, s) => e == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function wh(t, e, i, n, r) {
  let s = t.axes[i], l = s.scale, u = t.scales[l], f = t.valToPos, p = s._space, _ = f(10, l), g = f(9, l) - _ >= p ? ca : f(7, l) - _ >= p ? vh : f(5, l) - _ >= p ? yh : hl;
  if (g == hl) {
    let b = Dt(f(1, l) - _);
    if (b < p)
      return wo(e.slice().reverse(), u.distr, g, ve(p / b)).reverse();
  }
  return wo(e, u.distr, g, 1);
}
function xh(t, e, i, n, r) {
  let s = t.axes[i], l = s.scale, u = s._space, f = t.valToPos, p = Dt(f(1, l) - f(2, l));
  return p < u ? wo(e.slice().reverse(), 3, ca, ve(u / p)).reverse() : e;
}
function $h(t, e, i, n) {
  return n == null ? No : e == null ? "" : Ro(e);
}
const fl = {
  show: !0,
  scale: "y",
  stroke: zo,
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
  grid: Vo,
  ticks: oa,
  border: sa,
  font: jo,
  lineGap: aa,
  rotate: 0
};
function Sh(t, e) {
  let i = 3 + (t || 1) * 2;
  return gt(i * e, 3);
}
function kh(t, e) {
  let { scale: i, idxs: n } = t.series[0], r = t._data[0], s = t.valToPos(r[n[0]], i, !0), l = t.valToPos(r[n[1]], i, !0), u = Dt(l - s), f = t.series[e], p = u / (f.points.space * at);
  return n[1] - n[0] <= p;
}
const dl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pt,
  max: -pt
}, ua = (t, e, i, n, r) => r, pl = {
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
function Ah(t, e, i, n, r) {
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
      i.plots = i.plots.filter((r) => r != n);
    },
    pub(n, r, s, l, u, f, p) {
      for (let _ = 0; _ < i.plots.length; _++)
        i.plots[_] != r && i.plots[_].pub(n, r, s, l, u, f, p);
    }
  }, t != null && (ml[t] = i)), i;
}
const mn = 1, xo = 2;
function Fi(t, e, i) {
  const n = t.mode, r = t.series[e], s = n == 2 ? t._data[e] : t._data, l = t.scales, u = t.bbox;
  let f = s[0], p = n == 2 ? s[1] : s[e], _ = n == 2 ? l[r.facets[0].scale] : l[t.series[0].scale], g = n == 2 ? l[r.facets[1].scale] : l[r.scale], b = u.left, k = u.top, E = u.width, H = u.height, U = t.valToPosH, V = t.valToPosV;
  return _.ori == 0 ? i(
    r,
    f,
    p,
    _,
    g,
    U,
    V,
    b,
    k,
    E,
    H,
    Ar,
    xn,
    Pr,
    pa,
    ma
  ) : i(
    r,
    f,
    p,
    _,
    g,
    V,
    U,
    k,
    b,
    H,
    E,
    Er,
    $n,
    Yo,
    ga,
    ba
  );
}
function Bo(t, e) {
  let i = 0, n = 0, r = st(t.bands, Fo);
  for (let s = 0; s < r.length; s++) {
    let l = r[s];
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
function Ph(t, e, i, n, r) {
  let s = t.mode, l = t.series[e], u = s == 2 ? l.facets[1].scale : l.scale, f = t.scales[u];
  return r == -1 ? f.min : r == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ei(t, e, i, n, r, s) {
  return Fi(t, e, (l, u, f, p, _, g, b, k, E, H, U) => {
    let V = l.pxRound;
    const w = p.dir * (p.ori == 0 ? 1 : -1), F = p.ori == 0 ? xn : $n;
    let $, Z;
    w == 1 ? ($ = i, Z = n) : ($ = n, Z = i);
    let M = V(g(u[$], p, H, k)), J = V(b(f[$], _, U, E)), G = V(g(u[Z], p, H, k)), tt = V(b(s == 1 ? _.max : _.min, _, U, E)), Y = new Path2D(r);
    return F(Y, G, tt), F(Y, M, tt), F(Y, M, J), Y;
  });
}
function kr(t, e, i, n, r, s) {
  let l = null;
  if (t.length > 0) {
    l = new Path2D();
    const u = e == 0 ? Pr : Yo;
    let f = i;
    for (let g = 0; g < t.length; g++) {
      let b = t[g];
      if (b[1] > b[0]) {
        let k = b[0] - f;
        k > 0 && u(l, f, n, k, n + s), f = b[1];
      }
    }
    let p = i + r - f, _ = 10;
    p > 0 && u(l, f, n - _ / 2, p, n + s + _);
  }
  return l;
}
function Th(t, e, i) {
  let n = t[t.length - 1];
  n && n[0] == e ? n[1] = i : t.push([e, i]);
}
function Wo(t, e, i, n, r, s, l) {
  let u = [], f = t.length;
  for (let p = r == 1 ? i : n; p >= i && p <= n; p += r)
    if (e[p] === null) {
      let g = p, b = p;
      if (r == 1)
        for (; ++p <= n && e[p] === null; )
          b = p;
      else
        for (; --p >= i && e[p] === null; )
          b = p;
      let k = s(t[g]), E = b == g ? k : s(t[b]), H = g - r;
      k = l <= 0 && H >= 0 && H < f ? s(t[H]) : k;
      let V = b + r;
      E = l >= 0 && V >= 0 && V < f ? s(t[V]) : E, E >= k && u.push([k, E]);
    }
  return u;
}
function bl(t) {
  return t == 0 ? jl : t == 1 ? Mt : (e) => Mi(e, t);
}
function da(t) {
  let e = t == 0 ? Ar : Er, i = t == 0 ? (r, s, l, u, f, p) => {
    r.arcTo(s, l, u, f, p);
  } : (r, s, l, u, f, p) => {
    r.arcTo(l, s, f, u, p);
  }, n = t == 0 ? (r, s, l, u, f) => {
    r.rect(s, l, u, f);
  } : (r, s, l, u, f) => {
    r.rect(l, s, f, u);
  };
  return (r, s, l, u, f, p = 0, _ = 0) => {
    p == 0 && _ == 0 ? n(r, s, l, u, f) : (p = Me(p, u / 2, f / 2), _ = Me(_, u / 2, f / 2), e(r, s + p, l), i(r, s + u, l, s + u, l + f, p), i(r, s + u, l + f, s, l + f, _), i(r, s, l + f, s, l, _), i(r, s, l, s + u, l, p), r.closePath());
  };
}
const Ar = (t, e, i) => {
  t.moveTo(e, i);
}, Er = (t, e, i) => {
  t.moveTo(i, e);
}, xn = (t, e, i) => {
  t.lineTo(e, i);
}, $n = (t, e, i) => {
  t.lineTo(i, e);
}, Pr = da(0), Yo = da(1), pa = (t, e, i, n, r, s) => {
  t.arc(e, i, n, r, s);
}, ga = (t, e, i, n, r, s) => {
  t.arc(i, e, n, r, s);
}, ma = (t, e, i, n, r, s, l) => {
  t.bezierCurveTo(e, i, n, r, s, l);
}, ba = (t, e, i, n, r, s, l) => {
  t.bezierCurveTo(i, e, r, n, l, s);
};
function _a(t) {
  return (e, i, n, r, s) => Fi(e, i, (l, u, f, p, _, g, b, k, E, H, U) => {
    let { pxRound: V, points: w } = l, F, $;
    p.ori == 0 ? (F = Ar, $ = pa) : (F = Er, $ = ga);
    const Z = gt(w.width * at, 3);
    let M = (w.size - w.width) / 2 * at, J = gt(M * 2, 3), G = new Path2D(), tt = new Path2D(), { left: Y, top: S, width: q, height: z } = e.bbox;
    Pr(
      tt,
      Y - J,
      S - J,
      q + J * 2,
      z + J * 2
    );
    const B = (R) => {
      if (f[R] != null) {
        let it = V(g(u[R], p, H, k)), L = V(b(f[R], _, U, E));
        F(G, it + M, L), $(G, it, L, M, 0, hr * 2);
      }
    };
    if (s)
      s.forEach(B);
    else
      for (let R = n; R <= r; R++)
        B(R);
    return {
      stroke: Z > 0 ? G : null,
      fill: G,
      clip: tt,
      flags: mn | xo
    };
  });
}
function va(t) {
  return (e, i, n, r, s, l) => {
    n != r && (s != n && l != n && t(e, i, n), s != r && l != r && t(e, i, r), t(e, i, l));
  };
}
const Ch = va(xn), Mh = va($n);
function ya(t) {
  const e = st(t?.alignGaps, 0);
  return (i, n, r, s) => Fi(i, n, (l, u, f, p, _, g, b, k, E, H, U) => {
    [r, s] = wr(f, r, s);
    let V = l.pxRound, w = (z) => V(g(z, p, H, k)), F = (z) => V(b(z, _, U, E)), $, Z;
    p.ori == 0 ? ($ = xn, Z = Ch) : ($ = $n, Z = Mh);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: mn }, G = J.stroke;
    let tt = !1;
    if (s - r >= H * 4) {
      let z = (N) => i.posToVal(N, p.key, !0), B = null, R = null, it, L, Qt, wt = w(u[M == 1 ? r : s]), rt = w(u[r]), ft = w(u[s]), Q = z(M == 1 ? rt + 1 : ft - 1);
      for (let N = M == 1 ? r : s; N >= r && N <= s; N += M) {
        let Tt = u[N], xt = (M == 1 ? Tt < Q : Tt > Q) ? wt : w(Tt), ut = f[N];
        xt == wt ? ut != null ? (L = ut, B == null ? ($(G, xt, F(L)), it = B = R = L) : L < B ? B = L : L > R && (R = L)) : ut === null && (tt = !0) : (B != null && Z(G, wt, F(B), F(R), F(it), F(L)), ut != null ? (L = ut, $(G, xt, F(L)), B = R = it = L) : (B = R = null, ut === null && (tt = !0)), wt = xt, Q = z(wt + M));
      }
      B != null && B != R && Qt != wt && Z(G, wt, F(B), F(R), F(it), F(L));
    } else
      for (let z = M == 1 ? r : s; z >= r && z <= s; z += M) {
        let B = f[z];
        B === null ? tt = !0 : B != null && $(G, w(u[z]), F(B));
      }
    let [S, q] = Bo(i, n);
    if (l.fill != null || S != 0) {
      let z = J.fill = new Path2D(G), B = l.fillTo(i, n, l.min, l.max, S), R = F(B), it = w(u[r]), L = w(u[s]);
      M == -1 && ([L, it] = [it, L]), $(z, L, R), $(z, it, R);
    }
    if (!l.spanGaps) {
      let z = [];
      tt && z.push(...Wo(u, f, r, s, M, w, e)), J.gaps = z = l.gaps(i, n, r, s, z), J.clip = kr(z, p.ori, k, E, H, U);
    }
    return q != 0 && (J.band = q == 2 ? [
      ei(i, n, r, s, G, -1),
      ei(i, n, r, s, G, 1)
    ] : ei(i, n, r, s, G, q)), J;
  });
}
function Dh(t) {
  const e = st(t.align, 1), i = st(t.ascDesc, !1), n = st(t.alignGaps, 0), r = st(t.extend, !1);
  return (s, l, u, f) => Fi(s, l, (p, _, g, b, k, E, H, U, V, w, F) => {
    [u, f] = wr(g, u, f);
    let $ = p.pxRound, { left: Z, width: M } = s.bbox, J = (rt) => $(E(rt, b, w, U)), G = (rt) => $(H(rt, k, F, V)), tt = b.ori == 0 ? xn : $n;
    const Y = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: mn }, S = Y.stroke, q = b.dir * (b.ori == 0 ? 1 : -1);
    let z = G(g[q == 1 ? u : f]), B = J(_[q == 1 ? u : f]), R = B, it = B;
    r && e == -1 && (it = Z, tt(S, it, z)), tt(S, B, z);
    for (let rt = q == 1 ? u : f; rt >= u && rt <= f; rt += q) {
      let ft = g[rt];
      if (ft == null)
        continue;
      let Q = J(_[rt]), N = G(ft);
      e == 1 ? tt(S, Q, z) : tt(S, R, N), tt(S, Q, N), z = N, R = Q;
    }
    let L = R;
    r && e == 1 && (L = Z + M, tt(S, L, z));
    let [Qt, wt] = Bo(s, l);
    if (p.fill != null || Qt != 0) {
      let rt = Y.fill = new Path2D(S), ft = p.fillTo(s, l, p.min, p.max, Qt), Q = G(ft);
      tt(rt, L, Q), tt(rt, it, Q);
    }
    if (!p.spanGaps) {
      let rt = [];
      rt.push(...Wo(_, g, u, f, q, J, n));
      let ft = p.width * at / 2, Q = i || e == 1 ? ft : -ft, N = i || e == -1 ? -ft : ft;
      rt.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += N;
      }), Y.gaps = rt = p.gaps(s, l, u, f, rt), Y.clip = kr(rt, b.ori, U, V, w, F);
    }
    return wt != 0 && (Y.band = wt == 2 ? [
      ei(s, l, u, f, S, -1),
      ei(s, l, u, f, S, 1)
    ] : ei(s, l, u, f, S, wt)), Y;
  });
}
function _l(t, e, i, n, r, s, l = pt) {
  if (t.length > 1) {
    let u = null;
    for (let f = 0, p = 1 / 0; f < t.length; f++)
      if (e[f] !== void 0) {
        if (u != null) {
          let _ = Dt(t[f] - t[u]);
          _ < p && (p = _, l = Dt(i(t[f], n, r, s) - i(t[u], n, r, s)));
        }
        u = f;
      }
  }
  return l;
}
function zh(t) {
  t = t || In;
  const e = st(t.size, [0.6, pt, 1]), i = t.align || 0, n = t.gap || 0;
  let r = t.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = et(r), l = 1 - e[0], u = st(e[1], pt), f = st(e[2], 1), p = st(t.disp, In), _ = st(t.each, (k) => {
  }), { fill: g, stroke: b } = p;
  return (k, E, H, U) => Fi(k, E, (V, w, F, $, Z, M, J, G, tt, Y, S) => {
    let q = V.pxRound, z = i, B = n * at, R = u * at, it = f * at, L, Qt;
    $.ori == 0 ? [L, Qt] = s(k, E) : [Qt, L] = s(k, E);
    const wt = $.dir * ($.ori == 0 ? 1 : -1);
    let rt = $.ori == 0 ? Pr : Yo, ft = $.ori == 0 ? _ : (T, mt, Ct, ji, xi, Ne, $i) => {
      _(T, mt, Ct, xi, ji, $i, Ne);
    }, Q = st(k.bands, Fo).find((T) => T.series[0] == E), N = Q != null ? Q.dir : 0, Tt = V.fillTo(k, E, V.min, V.max, N), Wt = q(J(Tt, Z, S, tt)), xt, ut, $e, ne = Y, St = q(V.width * at), ze = !1, qe = null, he = null, ni = null, Ui = null;
    g != null && (St == 0 || b != null) && (ze = !0, qe = g.values(k, E, H, U), he = /* @__PURE__ */ new Map(), new Set(qe).forEach((T) => {
      T != null && he.set(T, new Path2D());
    }), St > 0 && (ni = b.values(k, E, H, U), Ui = /* @__PURE__ */ new Map(), new Set(ni).forEach((T) => {
      T != null && Ui.set(T, new Path2D());
    })));
    let { x0: Ii, size: kn } = p;
    if (Ii != null && kn != null) {
      z = 1, w = Ii.values(k, E, H, U), Ii.unit == 2 && (w = w.map((Ct) => k.posToVal(G + Ct * Y, $.key, !0)));
      let T = kn.values(k, E, H, U);
      kn.unit == 2 ? ut = T[0] * Y : ut = M(T[0], $, Y, G) - M(0, $, Y, G), ne = _l(w, F, M, $, Y, G, ne), $e = ne - ut + B;
    } else
      ne = _l(w, F, M, $, Y, G, ne), $e = ne * l + B, ut = ne - $e;
    $e < 1 && ($e = 0), St >= ut / 2 && (St = 0), $e < 5 && (q = jl);
    let Zn = $e > 0, yi = ne - $e - (Zn ? St : 0);
    ut = q(vo(yi, it, R)), xt = (z == 0 ? ut / 2 : z == wt ? 0 : ut) - z * wt * ((z == 0 ? B / 2 : 0) + (Zn ? St / 2 : 0));
    const Yt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Vi = ze ? null : new Path2D();
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
      let Ct = $.distr != 2 || p != null ? w[T] : T, ji = M(Ct, $, Y, G), xi = J(st(mt, Tt), Z, S, tt), Ne = q(ji - xt), $i = q(Zt(xi, Wt)), re = q(Me(xi, Wt)), fe = $i - re;
      if (mt != null) {
        let Xt = mt < 0 ? K : wi, Se = mt < 0 ? wi : K;
        ze ? (St > 0 && ni[T] != null && rt(Ui.get(ni[T]), Ne, re + ce(St / 2), ut, Zt(0, fe - St), Xt, Se), qe[T] != null && rt(he.get(qe[T]), Ne, re + ce(St / 2), ut, Zt(0, fe - St), Xt, Se)) : rt(Vi, Ne, re + ce(St / 2), ut, Zt(0, fe - St), Xt, Se), ft(
          k,
          E,
          T,
          Ne - St / 2,
          re,
          ut + St,
          fe
        );
      }
    }
    return St > 0 ? Yt.stroke = ze ? Ui : Vi : ze || (Yt._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Yt.width = 0), Yt.fill = ze ? he : Vi, Yt;
  });
}
function Nh(t, e) {
  const i = st(e?.alignGaps, 0);
  return (n, r, s, l) => Fi(n, r, (u, f, p, _, g, b, k, E, H, U, V) => {
    [s, l] = wr(p, s, l);
    let w = u.pxRound, F = (L) => w(b(L, _, U, E)), $ = (L) => w(k(L, g, V, H)), Z, M, J;
    _.ori == 0 ? (Z = Ar, J = xn, M = ma) : (Z = Er, J = $n, M = ba);
    const G = _.dir * (_.ori == 0 ? 1 : -1);
    let tt = F(f[G == 1 ? s : l]), Y = tt, S = [], q = [];
    for (let L = G == 1 ? s : l; L >= s && L <= l; L += G)
      if (p[L] != null) {
        let wt = f[L], rt = F(wt);
        S.push(Y = rt), q.push($(p[L]));
      }
    const z = { stroke: t(S, q, Z, J, M, w), fill: null, clip: null, band: null, gaps: null, flags: mn }, B = z.stroke;
    let [R, it] = Bo(n, r);
    if (u.fill != null || R != 0) {
      let L = z.fill = new Path2D(B), Qt = u.fillTo(n, r, u.min, u.max, R), wt = $(Qt);
      J(L, Y, wt), J(L, tt, wt);
    }
    if (!u.spanGaps) {
      let L = [];
      L.push(...Wo(f, p, s, l, G, F, i)), z.gaps = L = u.gaps(n, r, s, l, L), z.clip = kr(L, _.ori, E, H, U, V);
    }
    return it != 0 && (z.band = it == 2 ? [
      ei(n, r, s, l, B, -1),
      ei(n, r, s, l, B, 1)
    ] : ei(n, r, s, l, B, it)), z;
  });
}
function Oh(t) {
  return Nh(Hh, t);
}
function Hh(t, e, i, n, r, s) {
  const l = t.length;
  if (l < 2)
    return null;
  const u = new Path2D();
  if (i(u, t[0], e[0]), l == 2)
    n(u, t[1], e[1]);
  else {
    let f = Array(l), p = Array(l - 1), _ = Array(l - 1), g = Array(l - 1);
    for (let b = 0; b < l - 1; b++)
      _[b] = e[b + 1] - e[b], g[b] = t[b + 1] - t[b], p[b] = _[b] / g[b];
    f[0] = p[0];
    for (let b = 1; b < l - 1; b++)
      p[b] === 0 || p[b - 1] === 0 || p[b - 1] > 0 != p[b] > 0 ? f[b] = 0 : (f[b] = 3 * (g[b - 1] + g[b]) / ((2 * g[b] + g[b - 1]) / p[b - 1] + (g[b] + 2 * g[b - 1]) / p[b]), isFinite(f[b]) || (f[b] = 0));
    f[l - 1] = p[l - 2];
    for (let b = 0; b < l - 1; b++)
      r(
        u,
        t[b] + g[b] / 3,
        e[b] + f[b] * g[b] / 3,
        t[b + 1] - g[b] / 3,
        e[b + 1] - f[b + 1] * g[b] / 3,
        t[b + 1],
        e[b + 1]
      );
  }
  return u;
}
const $o = /* @__PURE__ */ new Set();
function vl() {
  for (let t of $o)
    t.syncRect(!0);
}
wn && (Oi(mu, un, vl), Oi(bu, un, vl, !0), Oi(mr, un, () => {
  Bt.pxRatio = at;
}));
const Lh = ya(), Rh = _a();
function yl(t, e, i, n) {
  return (n ? [t[0], t[1]].concat(t.slice(2)) : [t[0]].concat(t.slice(1))).map((s, l) => So(s, l, e, i));
}
function Fh(t, e) {
  return t.map((i, n) => n == 0 ? {} : Pt({}, e, i));
}
function So(t, e, i, n) {
  return Pt({}, e == 0 ? i : n, t);
}
function wa(t, e, i) {
  return e == null ? pn : [e, i];
}
const Uh = wa;
function Ih(t, e, i) {
  return e == null ? pn : br(e, i, Lo, !0);
}
function xa(t, e, i, n) {
  return e == null ? pn : xr(e, i, t.scales[n].log, !1);
}
const Vh = xa;
function $a(t, e, i, n) {
  return e == null ? pn : Ho(e, i, t.scales[n].log, !1);
}
const jh = $a;
function Bh(t, e, i, n, r) {
  let s = Zt(Qs(t), Qs(e)), l = e - t, u = Ce(r / n * l, i);
  do {
    let f = i[u], p = n * f / l;
    if (p >= r && s + (f < 5 ? pi.get(f) : 0) <= 17)
      return [f, p];
  } while (++u < i.length);
  return [0, 0];
}
function wl(t) {
  let e, i;
  return t = t.replace(/(\d+)px/, (n, r) => (e = Mt((i = +r) * at)) + "px"), [t, e, i];
}
function Wh(t) {
  t.show && [t.font, t.labelFont].forEach((e) => {
    let i = gt(e[2] * at, 1);
    e[0] = e[0].replace(/[0-9.]+px/, i + "px"), e[1] = i;
  });
}
function Bt(t, e, i) {
  const n = {
    mode: st(t.mode, 1)
  }, r = n.mode;
  function s(o, a, c, h) {
    let d = a.valToPct(o);
    return h + c * (a.dir == -1 ? 1 - d : d);
  }
  function l(o, a, c, h) {
    let d = a.valToPct(o);
    return h + c * (a.dir == -1 ? d : 1 - d);
  }
  function u(o, a, c, h) {
    return a.ori == 0 ? s(o, a, c, h) : l(o, a, c, h);
  }
  n.valToPosH = s, n.valToPosV = l;
  let f = !1;
  n.status = 0;
  const p = n.root = _e(Qc);
  if (t.id != null && (p.id = t.id), ae(p, t.class), t.title) {
    let o = _e(eu, p);
    o.textContent = t.title;
  }
  const _ = Pe("canvas"), g = n.ctx = _.getContext("2d"), b = _e(iu, p);
  Oi("click", b, (o) => {
    o.target === E && (bt != tn || $t != en) && Vt.click(n, o);
  }, !0);
  const k = n.under = _e(nu, b);
  b.appendChild(_);
  const E = n.over = _e(ru, b);
  t = gn(t);
  const H = +st(t.pxAlign, 1), U = bl(H);
  (t.plugins || []).forEach((o) => {
    o.opts && (t = o.opts(n, t) || t);
  });
  const V = t.ms || 1e-3, w = n.series = r == 1 ? yl(t.series || [], ul, gl, !1) : Fh(t.series || [null], pl), F = n.axes = yl(t.axes || [], cl, fl, !0), $ = n.scales = {}, Z = n.bands = t.bands || [];
  Z.forEach((o) => {
    o.fill = et(o.fill || null), o.dir = st(o.dir, -1);
  });
  const M = r == 2 ? w[1].facets[0].scale : w[0].scale, J = {
    axes: Fa,
    series: Na
  }, G = (t.drawOrder || ["axes", "series"]).map((o) => J[o]);
  function tt(o) {
    const a = o.distr == 3 ? (c) => ti(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => ro(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let h = a(c), { _min: d, _max: m } = o, v = m - d;
      return (h - d) / v;
    };
  }
  function Y(o) {
    let a = $[o];
    if (a == null) {
      let c = (t.scales || In)[o] || In;
      if (c.from != null) {
        Y(c.from);
        let h = Pt({}, $[c.from], c, { key: o });
        h.valToPct = tt(h), $[o] = h;
      } else {
        a = $[o] = Pt({}, o == M ? ha : Eh, c), a.key = o;
        let h = a.time, d = a.range, m = ci(d);
        if ((o != M || r == 2 && !h) && (m && (d[0] == null || d[1] == null) && (d = {
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
        }, m = !1), !m && Sr(d))) {
          let v = d;
          d = (y, x, A) => x == null ? pn : br(x, A, v);
        }
        a.range = et(d || (h ? Uh : o == M ? a.distr == 3 ? Vh : a.distr == 4 ? jh : wa : a.distr == 3 ? xa : a.distr == 4 ? $a : Ih)), a.auto = et(m ? !1 : a.auto), a.clamp = et(a.clamp || Ah), a._min = a._max = null, a.valToPct = tt(a);
      }
    }
  }
  Y("x"), Y("y"), r == 1 && w.forEach((o) => {
    Y(o.scale);
  }), F.forEach((o) => {
    Y(o.scale);
  });
  for (let o in t.scales)
    Y(o);
  const S = $[M], q = S.distr;
  let z, B;
  S.ori == 0 ? (ae(p, Xc), z = s, B = l) : (ae(p, tu), z = l, B = s);
  const R = {};
  for (let o in $) {
    let a = $[o];
    (a.min != null || a.max != null) && (R[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const it = t.tzDate || ((o) => new Date(Mt(o / V))), L = t.fmtDate || Uo, Qt = V == 1 ? Xu(it) : ih(it), wt = sl(it, ol(V == 1 ? Qu : eh, L)), rt = al(it, ll(rh, L)), ft = [], Q = n.legend = Pt({}, lh, t.legend), N = n.cursor = Pt({}, dh, { drag: { y: r == 2 } }, t.cursor), Tt = Q.show, Wt = N.show, xt = Q.markers;
  Q.idxs = ft, xt.width = et(xt.width), xt.dash = et(xt.dash), xt.stroke = et(xt.stroke), xt.fill = et(xt.fill);
  let ut, $e, ne, St = [], ze = [], qe, he = !1, ni = {};
  if (Q.live) {
    const o = w[1] ? w[1].values : null;
    he = o != null, qe = he ? o(n, 1, 0) : { _: 0 };
    for (let a in qe)
      ni[a] = No;
  }
  if (Tt)
    if (ut = Pe("table", uu, p), ne = Pe("tbody", null, ut), Q.mount(n, ut), he) {
      $e = Pe("thead", null, ut, ne);
      let o = Pe("tr", null, $e);
      Pe("th", null, o);
      for (var Ui in qe)
        Pe("th", Hs, o).textContent = Ui;
    } else
      ae(ut, fu), Q.live && ae(ut, hu);
  const Ii = { show: !0 }, kn = { show: !1 };
  function Zn(o, a) {
    if (a == 0 && (he || !Q.live || r == 2))
      return pn;
    let c = [], h = Pe("tr", du, ne, ne.childNodes[a]);
    ae(h, o.class), o.show || ae(h, zi);
    let d = Pe("th", null, h);
    if (xt.show) {
      let y = _e(pu, d);
      if (a > 0) {
        let x = xt.width(n, a);
        x && (y.style.border = x + "px " + xt.dash(n, a) + " " + xt.stroke(n, a)), y.style.background = xt.fill(n, a);
      }
    }
    let m = _e(Hs, d);
    o.label instanceof HTMLElement ? m.appendChild(o.label) : m.textContent = o.label, a > 0 && (xt.show || (m.style.color = o.width > 0 ? xt.stroke(n, a) : xt.fill(n, a)), Yt("click", d, (y) => {
      if (N._lock)
        return;
      ki(y);
      let x = w.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = w.some((P, C) => C > 0 && C != x && P.show);
        w.forEach((P, C) => {
          C > 0 && He(C, A ? C == x ? Ii : kn : Ii, !0, Et.setSeries);
        });
      } else
        He(x, { show: !o.show }, !0, Et.setSeries);
    }, !1), Wi && Yt(Us, d, (y) => {
      N._lock || (ki(y), He(w.indexOf(o), rn, !0, Et.setSeries));
    }, !1));
    for (var v in qe) {
      let y = Pe("td", gu, h);
      y.textContent = "--", c.push(y);
    }
    return [h, c];
  }
  const yi = /* @__PURE__ */ new Map();
  function Yt(o, a, c, h = !0) {
    const d = yi.get(a) || {}, m = N.bind[o](n, a, c, h);
    m && (Oi(o, a, d[o] = m), yi.set(a, d));
  }
  function Vi(o, a, c) {
    const h = yi.get(a) || {};
    for (let d in h)
      (o == null || d == o) && (_o(d, a, h[d]), delete h[d]);
    o == null && yi.delete(a);
  }
  let Ze = 0, wi = 0, K = 0, T = 0, mt = 0, Ct = 0, ji = mt, xi = Ct, Ne = K, $i = T, re = 0, fe = 0, Xt = 0, Se = 0;
  n.bbox = {};
  let Cr = !1, Jn = !1, Bi = !1, Si = !1, Qn = !1, de = !1;
  function Mr(o, a, c) {
    (c || o != n.width || a != n.height) && qo(o, a), Zi(!1), Bi = !0, Jn = !0, Ji();
  }
  function qo(o, a) {
    n.width = Ze = K = o, n.height = wi = T = a, mt = Ct = 0, Ea(), Pa();
    let c = n.bbox;
    re = c.left = Mi(mt * at, 0.5), fe = c.top = Mi(Ct * at, 0.5), Xt = c.width = Mi(K * at, 0.5), Se = c.height = Mi(T * at, 0.5);
  }
  const Sa = 3;
  function ka() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = La(a), h = Ra(a);
      o = a == Sa || c && h, o || (qo(n.width, n.height), Jn = !0);
    }
  }
  function Aa({ width: o, height: a }) {
    Mr(o, a);
  }
  n.setSize = Aa;
  function Ea() {
    let o = !1, a = !1, c = !1, h = !1;
    F.forEach((d, m) => {
      if (d.show && d._show) {
        let { side: v, _size: y } = d, x = v % 2, A = d.label != null ? d.labelSize : 0, P = y + A;
        P > 0 && (x ? (K -= P, v == 3 ? (mt += P, h = !0) : c = !0) : (T -= P, v == 0 ? (Ct += P, o = !0) : a = !0));
      }
    }), Ai[0] = o, Ai[1] = c, Ai[2] = a, Ai[3] = h, K -= ri[1] + ri[3], mt += ri[3], T -= ri[2] + ri[0], Ct += ri[0];
  }
  function Pa() {
    let o = mt + K, a = Ct + T, c = mt, h = Ct;
    function d(m, v) {
      switch (m) {
        case 1:
          return o += v, o - v;
        case 2:
          return a += v, a - v;
        case 3:
          return c -= v, c + v;
        case 0:
          return h -= v, h + v;
      }
    }
    F.forEach((m, v) => {
      if (m.show && m._show) {
        let y = m.side;
        m._pos = d(y, m._size), m.label != null && (m._lpos = d(y, m.labelSize));
      }
    });
  }
  if (N.dataIdx == null) {
    let o = N.hover, a = o.skip = new Set(o.skip ?? []);
    a.add(void 0);
    let c = o.prox = et(o.prox), h = o.bias ??= 0;
    N.dataIdx = (d, m, v, y) => {
      if (m == 0)
        return v;
      let x = v, A = c(d, m, v, y) ?? pt, P = A >= 0 && A < pt, C = S.ori == 0 ? K : T, W = N.left, lt = e[0], ot = e[m];
      if (a.has(ot[v])) {
        x = null;
        let X = null, I = null, O;
        if (h == 0 || h == -1)
          for (O = v; X == null && O-- > 0; )
            a.has(ot[O]) || (X = O);
        if (h == 0 || h == 1)
          for (O = v; I == null && O++ < ot.length; )
            a.has(ot[O]) || (I = O);
        if (X != null || I != null)
          if (P) {
            let vt = X == null ? -1 / 0 : z(lt[X], S, C, 0), kt = I == null ? 1 / 0 : z(lt[I], S, C, 0), Ft = W - vt, dt = kt - W;
            Ft <= dt ? Ft <= A && (x = X) : dt <= A && (x = I);
          } else
            x = I == null ? X : X == null ? I : v - X <= I - v ? X : I;
      } else P && Dt(W - z(lt[v], S, C, 0)) > A && (x = null);
      return x;
    };
  }
  const ki = (o) => {
    N.event = o;
  };
  N.idxs = ft, N._lock = !1;
  let jt = N.points;
  jt.show = et(jt.show), jt.size = et(jt.size), jt.stroke = et(jt.stroke), jt.width = et(jt.width), jt.fill = et(jt.fill);
  const Oe = n.focus = Pt({}, t.focus || { alpha: 0.3 }, N.focus), Wi = Oe.prox >= 0, Yi = Wi && jt.one;
  let pe = [], Gi = [], Ki = [];
  function Zo(o, a) {
    let c = jt.show(n, a);
    if (c instanceof HTMLElement)
      return ae(c, cu), ae(c, o.class), Ue(c, -10, -10, K, T), E.insertBefore(c, pe[a]), c;
  }
  function Jo(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && $[o.scale].time, h = o.value;
      o.value = c ? el(h) ? al(it, ll(h, L)) : h || rt : h || $h, o.label = o.label || (c ? gh : ph);
    }
    if (Yi || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || Lh || Eu, o.fillTo = et(o.fillTo || Ph), o.pxAlign = +st(o.pxAlign, H), o.pxRound = bl(o.pxAlign), o.stroke = et(o.stroke || null), o.fill = et(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = Sh(Zt(1, o.width), 1), h = o.points = Pt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: Rh,
        _stroke: null,
        _fill: null
      }, o.points);
      h.show = et(h.show), h.filter = et(h.filter), h.fill = et(h.fill), h.stroke = et(h.stroke), h.paths = et(h.paths), h.pxAlign = o.pxAlign;
    }
    if (Tt) {
      let c = Zn(o, a);
      St.splice(a, 0, c[0]), ze.splice(a, 0, c[1]), Q.values.push(null);
    }
    if (Wt) {
      ft.splice(a, 0, null);
      let c = null;
      Yi ? a == 0 && (c = Zo(o, a)) : a > 0 && (c = Zo(o, a)), pe.splice(a, 0, c), Gi.splice(a, 0, 0), Ki.splice(a, 0, 0);
    }
    Rt("addSeries", a);
  }
  function Ta(o, a) {
    a = a ?? w.length, o = r == 1 ? So(o, a, ul, gl) : So(o, a, {}, pl), w.splice(a, 0, o), Jo(w[a], a);
  }
  n.addSeries = Ta;
  function Ca(o) {
    if (w.splice(o, 1), Tt) {
      Q.values.splice(o, 1), ze.splice(o, 1);
      let a = St.splice(o, 1)[0];
      Vi(null, a.firstChild), a.remove();
    }
    Wt && (ft.splice(o, 1), pe.splice(o, 1)[0].remove(), Gi.splice(o, 1), Ki.splice(o, 1)), Rt("delSeries", o);
  }
  n.delSeries = Ca;
  const Ai = [!1, !1, !1, !1];
  function Ma(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, h = $[o.scale];
      h == null && (o.scale = c ? w[1].scale : M, h = $[o.scale]);
      let d = h.time;
      o.size = et(o.size), o.space = et(o.space), o.rotate = et(o.rotate), ci(o.incrs) && o.incrs.forEach((v) => {
        !pi.has(v) && pi.set(v, Yl(v));
      }), o.incrs = et(o.incrs || (h.distr == 2 ? qu : d ? V == 1 ? Ju : th : Di)), o.splits = et(o.splits || (d && h.distr == 1 ? Qt : h.distr == 3 ? yo : h.distr == 4 ? _h : bh)), o.stroke = et(o.stroke), o.grid.stroke = et(o.grid.stroke), o.ticks.stroke = et(o.ticks.stroke), o.border.stroke = et(o.border.stroke);
      let m = o.values;
      o.values = // static array of tick values
      ci(m) && !ci(m[0]) ? et(m) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          ci(m) ? sl(it, ol(m, L)) : (
            // fmtDate string tpl
            el(m) ? nh(it, m) : m || wt
          )
        ) : m || mh
      ), o.filter = et(o.filter || (h.distr >= 3 && h.log == 10 ? wh : h.distr == 3 && h.log == 2 ? xh : Bl)), o.font = wl(o.font), o.labelFont = wl(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (Ai[a] = !0, o._el = _e(ou, b));
    }
  }
  function An(o, a, c, h) {
    let [d, m, v, y] = c, x = a % 2, A = 0;
    return x == 0 && (y || m) && (A = a == 0 && !d || a == 2 && !v ? Mt(cl.size / 3) : 0), x == 1 && (d || v) && (A = a == 1 && !m || a == 3 && !y ? Mt(fl.size / 2) : 0), A;
  }
  const Qo = n.padding = (t.padding || [An, An, An, An]).map((o) => et(st(o, An))), ri = n._padding = Qo.map((o, a) => o(n, a, Ai, 0));
  let It, Nt = null, Ot = null;
  const Xn = r == 1 ? w[0].idxs : null;
  let ke = null, En = !1;
  function Xo(o, a) {
    if (e = o ?? [], n.data = n._data = e, r == 2) {
      It = 0;
      for (let c = 1; c < w.length; c++)
        It += e[c][0].length;
    } else {
      e.length == 0 && (n.data = n._data = e = [[]]), ke = e[0], It = ke.length;
      let c = e;
      if (q == 2) {
        c = e.slice();
        let h = c[0] = Array(It);
        for (let d = 0; d < It; d++)
          h[d] = d;
      }
      n._data = e = c;
    }
    if (Zi(!0), Rt("setData"), q == 2 && (Bi = !0), a !== !1) {
      let c = S;
      c.auto(n, En) ? Dr() : si(M, c.min, c.max), Si = Si || N.left >= 0, de = !0, Ji();
    }
  }
  n.setData = Xo;
  function Dr() {
    En = !0;
    let o, a;
    r == 1 && (It > 0 ? (Nt = Xn[0] = 0, Ot = Xn[1] = It - 1, o = e[0][Nt], a = e[0][Ot], q == 2 ? (o = Nt, a = Ot) : o == a && (q == 3 ? [o, a] = xr(o, o, S.log, !1) : q == 4 ? [o, a] = Ho(o, o, S.log, !1) : S.time ? a = o + Mt(86400 / V) : [o, a] = br(o, a, Lo, !0))) : (Nt = Xn[0] = o = null, Ot = Xn[1] = a = null)), si(M, o, a);
  }
  let tr, qi, zr, Nr, Or, Hr, Lr, Rr, Fr, te;
  function ts(o, a, c, h, d, m) {
    o ??= Rs, c ??= Fo, h ??= "butt", d ??= Rs, m ??= "round", o != tr && (g.strokeStyle = tr = o), d != qi && (g.fillStyle = qi = d), a != zr && (g.lineWidth = zr = a), m != Or && (g.lineJoin = Or = m), h != Hr && (g.lineCap = Hr = h), c != Nr && g.setLineDash(Nr = c);
  }
  function es(o, a, c, h) {
    a != qi && (g.fillStyle = qi = a), o != Lr && (g.font = Lr = o), c != Rr && (g.textAlign = Rr = c), h != Fr && (g.textBaseline = Fr = h);
  }
  function Ur(o, a, c, h, d = 0) {
    if (h.length > 0 && o.auto(n, En) && (a == null || a.min == null)) {
      let m = st(Nt, 0), v = st(Ot, h.length - 1), y = c.min == null ? wu(h, m, v, d, o.distr == 3) : [c.min, c.max];
      o.min = Me(o.min, c.min = y[0]), o.max = Zt(o.max, c.max = y[1]);
    }
  }
  const is = { min: null, max: null };
  function Da() {
    for (let h in $) {
      let d = $[h];
      R[h] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      R[M] != null && d.auto(n, En)) && (R[h] = is);
    }
    for (let h in $) {
      let d = $[h];
      R[h] == null && d.from != null && R[d.from] != null && (R[h] = is);
    }
    R[M] != null && Zi(!0);
    let o = {};
    for (let h in R) {
      let d = R[h];
      if (d != null) {
        let m = o[h] = gn($[h], Cu);
        if (d.min != null)
          Pt(m, d);
        else if (h != M || r == 2)
          if (It == 0 && m.from == null) {
            let v = m.range(n, null, null, h);
            m.min = v[0], m.max = v[1];
          } else
            m.min = pt, m.max = -pt;
      }
    }
    if (It > 0) {
      w.forEach((h, d) => {
        if (r == 1) {
          let m = h.scale, v = R[m];
          if (v == null)
            return;
          let y = o[m];
          if (d == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Nt = Ce(y.min, e[0]), Ot = Ce(y.max, e[0]), Ot - Nt > 1 && (e[0][Nt] < y.min && Nt++, e[0][Ot] > y.max && Ot--), h.min = ke[Nt], h.max = ke[Ot];
          } else h.show && h.auto && Ur(y, v, h, e[d], h.sorted);
          h.idxs[0] = Nt, h.idxs[1] = Ot;
        } else if (d > 0 && h.show && h.auto) {
          let [m, v] = h.facets, y = m.scale, x = v.scale, [A, P] = e[d], C = o[y], W = o[x];
          C != null && Ur(C, R[y], m, A, m.sorted), W != null && Ur(W, R[x], v, P, v.sorted), h.min = v.min, h.max = v.max;
        }
      });
      for (let h in o) {
        let d = o[h], m = R[h];
        if (d.from == null && (m == null || m.min == null)) {
          let v = d.range(
            n,
            d.min == pt ? null : d.min,
            d.max == -pt ? null : d.max,
            h
          );
          d.min = v[0], d.max = v[1];
        }
      }
    }
    for (let h in o) {
      let d = o[h];
      if (d.from != null) {
        let m = o[d.from];
        if (m.min == null)
          d.min = d.max = null;
        else {
          let v = d.range(n, m.min, m.max, h);
          d.min = v[0], d.max = v[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let h in o) {
      let d = o[h], m = $[h];
      if (m.min != d.min || m.max != d.max) {
        m.min = d.min, m.max = d.max;
        let v = m.distr;
        m._min = v == 3 ? ti(m.min) : v == 4 ? ro(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? ti(m.max) : v == 4 ? ro(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[h] = c = !0;
      }
    }
    if (c) {
      w.forEach((h, d) => {
        r == 2 ? d > 0 && a.y && (h._paths = null) : a[h.scale] && (h._paths = null);
      });
      for (let h in a)
        Bi = !0, Rt("setScale", h);
      Wt && N.left >= 0 && (Si = de = !0);
    }
    for (let h in R)
      R[h] = null;
  }
  function za(o) {
    let a = vo(Nt - 1, 0, It - 1), c = vo(Ot + 1, 0, It - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < It - 1; )
      c++;
    return [a, c];
  }
  function Na() {
    if (It > 0) {
      let o = w.some((a) => a._focus) && te != Oe.alpha;
      o && (g.globalAlpha = te = Oe.alpha), w.forEach((a, c) => {
        if (c > 0 && a.show && (ns(c, !1), ns(c, !0), a._paths == null)) {
          let h = te;
          te != a.alpha && (g.globalAlpha = te = a.alpha);
          let d = r == 2 ? [0, e[c][0].length - 1] : za(e[c]);
          a._paths = a.paths(n, c, d[0], d[1]), te != h && (g.globalAlpha = te = h);
        }
      }), w.forEach((a, c) => {
        if (c > 0 && a.show) {
          let h = te;
          te != a.alpha && (g.globalAlpha = te = a.alpha), a._paths != null && rs(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Nt, Ot, d), v = a.points.filter(n, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(n, c, Nt, Ot, v), rs(c, !0));
          }
          te != h && (g.globalAlpha = te = h), Rt("drawSeries", c);
        }
      }), o && (g.globalAlpha = te = 1);
    }
  }
  function ns(o, a) {
    let c = a ? w[o].points : w[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function rs(o, a) {
    let c = a ? w[o].points : w[o], {
      stroke: h,
      fill: d,
      clip: m,
      flags: v,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: A = c.width
    } = c._paths;
    A = gt(A * at, 3);
    let P = null, C = A % 2 / 2;
    a && x == null && (x = A > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && C > 0;
    if (W && g.translate(C, C), !a) {
      let lt = re - A / 2, ot = fe - A / 2, X = Xt + A, I = Se + A;
      P = new Path2D(), P.rect(lt, ot, X, I);
    }
    a ? Ir(y, A, c.dash, c.cap, x, h, d, v, m) : Oa(o, y, A, c.dash, c.cap, x, h, d, v, P, m), W && g.translate(-C, -C);
  }
  function Oa(o, a, c, h, d, m, v, y, x, A, P) {
    let C = !1;
    x != 0 && Z.forEach((W, lt) => {
      if (W.series[0] == o) {
        let ot = w[W.series[1]], X = e[W.series[1]], I = (ot._paths || In).band;
        ci(I) && (I = W.dir == 1 ? I[0] : I[1]);
        let O, vt = null;
        ot.show && I && $u(X, Nt, Ot) ? (vt = W.fill(n, lt) || m, O = ot._paths.clip) : I = null, Ir(a, c, h, d, vt, v, y, x, A, P, O, I), C = !0;
      }
    }), C || Ir(a, c, h, d, m, v, y, x, A, P);
  }
  const os = mn | xo;
  function Ir(o, a, c, h, d, m, v, y, x, A, P, C) {
    ts(o, a, c, h, d), (x || A || C) && (g.save(), x && g.clip(x), A && g.clip(A)), C ? (y & os) == os ? (g.clip(C), P && g.clip(P), ir(d, v), er(o, m, a)) : y & xo ? (ir(d, v), g.clip(C), er(o, m, a)) : y & mn && (g.save(), g.clip(C), P && g.clip(P), ir(d, v), g.restore(), er(o, m, a)) : (ir(d, v), er(o, m, a)), (x || A || C) && g.restore();
  }
  function er(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((h, d) => {
      g.strokeStyle = tr = d, g.stroke(h);
    }) : a != null && o && g.stroke(a));
  }
  function ir(o, a) {
    a instanceof Map ? a.forEach((c, h) => {
      g.fillStyle = qi = h, g.fill(c);
    }) : a != null && o && g.fill(a);
  }
  function Ha(o, a, c, h) {
    let d = F[o], m;
    if (h <= 0)
      m = [0, 0];
    else {
      let v = d._space = d.space(n, o, a, c, h), y = d._incrs = d.incrs(n, o, a, c, h, v);
      m = Bh(a, c, y, h, v);
    }
    return d._found = m;
  }
  function Vr(o, a, c, h, d, m, v, y, x, A) {
    let P = v % 2 / 2;
    H == 1 && g.translate(P, P), ts(y, v, x, A, y), g.beginPath();
    let C, W, lt, ot, X = d + (h == 0 || h == 3 ? -m : m);
    c == 0 ? (W = d, ot = X) : (C = d, lt = X);
    for (let I = 0; I < o.length; I++)
      a[I] != null && (c == 0 ? C = lt = o[I] : W = ot = o[I], g.moveTo(C, W), g.lineTo(lt, ot));
    g.stroke(), H == 1 && g.translate(-P, -P);
  }
  function La(o) {
    let a = !0;
    return F.forEach((c, h) => {
      if (!c.show)
        return;
      let d = $[c.scale];
      if (d.min == null) {
        c._show && (a = !1, c._show = !1, Zi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Zi(!1));
      let m = c.side, v = m % 2, { min: y, max: x } = d, [A, P] = Ha(h, y, x, v == 0 ? K : T);
      if (P == 0)
        return;
      let C = d.distr == 2, W = c._splits = c.splits(n, h, y, x, A, P, C), lt = d.distr == 2 ? W.map((O) => ke[O]) : W, ot = d.distr == 2 ? ke[W[1]] - ke[W[0]] : A, X = c._values = c.values(n, c.filter(n, lt, h, P, ot), h, P, ot);
      c._rotate = m == 2 ? c.rotate(n, X, h, P) : 0;
      let I = c._size;
      c._size = ve(c.size(n, X, h, o)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function Ra(o) {
    let a = !0;
    return Qo.forEach((c, h) => {
      let d = c(n, h, Ai, o);
      d != ri[h] && (a = !1), ri[h] = d;
    }), a;
  }
  function Fa() {
    for (let o = 0; o < F.length; o++) {
      let a = F[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, h = c % 2, d, m, v = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [x, A] = a._found;
      if (a.label != null) {
        let Kt = a.labelGap * y, le = Mt((a._lpos + Kt) * at);
        es(a.labelFont[0], v, "center", c == 2 ? Nn : Ls), g.save(), h == 1 ? (d = m = 0, g.translate(
          le,
          Mt(fe + Se / 2)
        ), g.rotate((c == 3 ? -hr : hr) / 2)) : (d = Mt(re + Xt / 2), m = le);
        let Ti = Vl(a.label) ? a.label(n, o, x, A) : a.label;
        g.fillText(Ti, d, m), g.restore();
      }
      if (A == 0)
        continue;
      let P = $[a.scale], C = h == 0 ? Xt : Se, W = h == 0 ? re : fe, lt = a._splits, ot = P.distr == 2 ? lt.map((Kt) => ke[Kt]) : lt, X = P.distr == 2 ? ke[lt[1]] - ke[lt[0]] : x, I = a.ticks, O = a.border, vt = I.show ? I.size : 0, kt = Mt(vt * at), Ft = Mt((a.alignTo == 2 ? a._size - vt - a.gap : a.gap) * at), dt = a._rotate * -hr / 180, At = U(a._pos * at), oe = (kt + Ft) * y, Gt = At + oe;
      m = h == 0 ? Gt : 0, d = h == 1 ? Gt : 0;
      let ge = a.font[0], Ae = a.align == 1 ? sn : a.align == 2 ? eo : dt > 0 ? sn : dt < 0 ? eo : h == 0 ? "center" : c == 3 ? eo : sn, Re = dt || h == 1 ? "middle" : c == 2 ? Nn : Ls;
      es(ge, v, Ae, Re);
      let se = a.font[1] * a.lineGap, me = lt.map((Kt) => U(u(Kt, P, C, W))), Ee = a._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let le = Ee[Kt];
        if (le != null) {
          h == 0 ? d = me[Kt] : m = me[Kt], le = "" + le;
          let Ti = le.indexOf(`
`) == -1 ? [le] : le.split(/\n/gm);
          for (let qt = 0; qt < Ti.length; qt++) {
            let Ss = Ti[qt];
            dt ? (g.save(), g.translate(d, m + qt * se), g.rotate(dt), g.fillText(Ss, 0, 0), g.restore()) : g.fillText(Ss, d, m + qt * se);
          }
        }
      }
      I.show && Vr(
        me,
        I.filter(n, ot, o, A, X),
        h,
        c,
        At,
        kt,
        gt(I.width * at, 3),
        I.stroke(n, o),
        I.dash,
        I.cap
      );
      let Fe = a.grid;
      Fe.show && Vr(
        me,
        Fe.filter(n, ot, o, A, X),
        h,
        h == 0 ? 2 : 1,
        h == 0 ? fe : re,
        h == 0 ? Se : Xt,
        gt(Fe.width * at, 3),
        Fe.stroke(n, o),
        Fe.dash,
        Fe.cap
      ), O.show && Vr(
        [At],
        [1],
        h == 0 ? 1 : 0,
        h == 0 ? 1 : 2,
        h == 1 ? fe : re,
        h == 1 ? Se : Xt,
        gt(O.width * at, 3),
        O.stroke(n, o),
        O.dash,
        O.cap
      );
    }
    Rt("drawAxes");
  }
  function Zi(o) {
    w.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((h) => {
        h.min = null, h.max = null;
      })));
    });
  }
  let nr = !1, jr = !1, Pn = [];
  function Ua() {
    jr = !1;
    for (let o = 0; o < Pn.length; o++)
      Rt(...Pn[o]);
    Pn.length = 0;
  }
  function Ji() {
    nr || (Lu(ss), nr = !0);
  }
  function Ia(o, a = !1) {
    nr = !0, jr = a, o(n), ss(), a && Pn.length > 0 && queueMicrotask(Ua);
  }
  n.batch = Ia;
  function ss() {
    if (Cr && (Da(), Cr = !1), Bi && (ka(), Bi = !1), Jn) {
      if (yt(k, sn, mt), yt(k, Nn, Ct), yt(k, Hn, K), yt(k, Ln, T), yt(E, sn, mt), yt(E, Nn, Ct), yt(E, Hn, K), yt(E, Ln, T), yt(b, Hn, Ze), yt(b, Ln, wi), _.width = Mt(Ze * at), _.height = Mt(wi * at), F.forEach(({ _el: o, _show: a, _size: c, _pos: h, side: d }) => {
        if (o != null)
          if (a) {
            let m = d === 3 || d === 0 ? c : 0, v = d % 2 == 1;
            yt(o, v ? "left" : "top", h - m), yt(o, v ? "width" : "height", c), yt(o, v ? "top" : "left", v ? Ct : mt), yt(o, v ? "height" : "width", v ? T : K), bo(o, zi);
          } else
            ae(o, zi);
      }), tr = qi = zr = Or = Hr = Lr = Rr = Fr = Nr = null, te = 1, Mn(!0), mt != ji || Ct != xi || K != Ne || T != $i) {
        Zi(!1);
        let o = K / Ne, a = T / $i;
        if (Wt && !Si && N.left >= 0) {
          N.left *= o, N.top *= a, Qi && Ue(Qi, Mt(N.left), 0, K, T), Xi && Ue(Xi, 0, Mt(N.top), K, T);
          for (let c = 0; c < pe.length; c++) {
            let h = pe[c];
            h != null && (Gi[c] *= o, Ki[c] *= a, Ue(h, ve(Gi[c]), ve(Ki[c]), K, T));
          }
        }
        if (_t.show && !Qn && _t.left >= 0 && _t.width > 0) {
          _t.left *= o, _t.width *= o, _t.top *= a, _t.height *= a;
          for (let c in qr)
            yt(nn, c, _t[c]);
        }
        ji = mt, xi = Ct, Ne = K, $i = T;
      }
      Rt("setSize"), Jn = !1;
    }
    Ze > 0 && wi > 0 && (g.clearRect(0, 0, _.width, _.height), Rt("drawClear"), G.forEach((o) => o()), Rt("draw")), _t.show && Qn && (rr(_t), Qn = !1), Wt && Si && (Pi(null, !0, !1), Si = !1), Q.show && Q.live && de && (Gr(), de = !1), f || (f = !0, n.status = 1, Rt("ready")), En = !1, nr = !1;
  }
  n.redraw = (o, a) => {
    Bi = a || !1, o !== !1 ? si(M, S.min, S.max) : Ji();
  };
  function Br(o, a) {
    let c = $[o];
    if (c.from == null) {
      if (It == 0) {
        let h = c.range(n, a.min, a.max, o);
        a.min = h[0], a.max = h[1];
      }
      if (a.min > a.max) {
        let h = a.min;
        a.min = a.max, a.max = h;
      }
      if (It > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      o == M && c.distr == 2 && It > 0 && (a.min = Ce(a.min, e[0]), a.max = Ce(a.max, e[0]), a.min == a.max && a.max++), R[o] = a, Cr = !0, Ji();
    }
  }
  n.setScale = Br;
  let Wr, Yr, Qi, Xi, ls, as, tn, en, cs, us, bt, $t, oi = !1;
  const Vt = N.drag;
  let Ht = Vt.x, Lt = Vt.y;
  Wt && (N.x && (Wr = _e(lu, E)), N.y && (Yr = _e(au, E)), S.ori == 0 ? (Qi = Wr, Xi = Yr) : (Qi = Yr, Xi = Wr), bt = N.left, $t = N.top);
  const _t = n.select = Pt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, t.select), nn = _t.show ? _e(su, _t.over ? E : k) : null;
  function rr(o, a) {
    if (_t.show) {
      for (let c in o)
        _t[c] = o[c], c in qr && yt(nn, c, o[c]);
      a !== !1 && Rt("setSelect");
    }
  }
  n.setSelect = rr;
  function Va(o) {
    if (w[o].show)
      Tt && bo(St[o], zi);
    else if (Tt && ae(St[o], zi), Wt) {
      let c = Yi ? pe[0] : pe[o];
      c != null && Ue(c, -10, -10, K, T);
    }
  }
  function si(o, a, c) {
    Br(o, { min: a, max: c });
  }
  function He(o, a, c, h) {
    a.focus != null && Ga(o), a.show != null && w.forEach((d, m) => {
      m > 0 && (o == m || o == null) && (d.show = a.show, Va(m), r == 2 ? (si(d.facets[0].scale, null, null), si(d.facets[1].scale, null, null)) : si(d.scale, null, null), Ji());
    }), c !== !1 && Rt("setSeries", o, a), h && Dn("setSeries", n, o, a);
  }
  n.setSeries = He;
  function ja(o, a) {
    Pt(Z[o], a);
  }
  function Ba(o, a) {
    o.fill = et(o.fill || null), o.dir = st(o.dir, -1), a = a ?? Z.length, Z.splice(a, 0, o);
  }
  function Wa(o) {
    o == null ? Z.length = 0 : Z.splice(o, 1);
  }
  n.addBand = Ba, n.setBand = ja, n.delBand = Wa;
  function Ya(o, a) {
    w[o].alpha = a, Wt && pe[o] != null && (pe[o].style.opacity = a), Tt && St[o] && (St[o].style.opacity = a);
  }
  let Je, li, Ei;
  const rn = { focus: !0 };
  function Ga(o) {
    if (o != Ei) {
      let a = o == null, c = Oe.alpha != 1;
      w.forEach((h, d) => {
        if (r == 1 || d > 0) {
          let m = a || d == 0 || d == o;
          h._focus = a ? null : m, c && Ya(d, m ? 1 : Oe.alpha);
        }
      }), Ei = o, c && Ji();
    }
  }
  Tt && Wi && Yt(Is, ut, (o) => {
    N._lock || (ki(o), Ei != null && He(null, rn, !0, Et.setSeries));
  });
  function Le(o, a, c) {
    let h = $[a];
    c && (o = o / at - (h.ori == 1 ? Ct : mt));
    let d = K;
    h.ori == 1 && (d = T, o = d - o), h.dir == -1 && (o = d - o);
    let m = h._min, v = h._max, y = o / d, x = m + (v - m) * y, A = h.distr;
    return A == 3 ? dn(10, x) : A == 4 ? ku(x, h.asinh) : A == 100 ? h.bwd(x) : x;
  }
  function Ka(o, a) {
    let c = Le(o, M, a);
    return Ce(c, e[0], Nt, Ot);
  }
  n.valToIdx = (o) => Ce(o, e[0]), n.posToIdx = Ka, n.posToVal = Le, n.valToPos = (o, a, c) => $[a].ori == 0 ? s(
    o,
    $[a],
    c ? Xt : K,
    c ? re : 0
  ) : l(
    o,
    $[a],
    c ? Se : T,
    c ? fe : 0
  ), n.setCursor = (o, a, c) => {
    bt = o.left, $t = o.top, Pi(null, a, c);
  };
  function hs(o, a) {
    yt(nn, sn, _t.left = o), yt(nn, Hn, _t.width = a);
  }
  function fs(o, a) {
    yt(nn, Nn, _t.top = o), yt(nn, Ln, _t.height = a);
  }
  let Tn = S.ori == 0 ? hs : fs, Cn = S.ori == 1 ? hs : fs;
  function qa() {
    if (Tt && Q.live)
      for (let o = r == 2 ? 1 : 0; o < w.length; o++) {
        if (o == 0 && he)
          continue;
        let a = Q.values[o], c = 0;
        for (let h in a)
          ze[o][c++].firstChild.nodeValue = a[h];
      }
  }
  function Gr(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, h) => {
      ft[h] = c;
    }) : Tu(o.idx) || ft.fill(o.idx), Q.idx = ft[0]), Tt && Q.live) {
      for (let c = 0; c < w.length; c++)
        (c > 0 || r == 1 && !he) && Za(c, ft[c]);
      qa();
    }
    de = !1, a !== !1 && Rt("setLegend");
  }
  n.setLegend = Gr;
  function Za(o, a) {
    let c = w[o], h = o == 0 && q == 2 ? ke : e[o], d;
    he ? d = c.values(n, o, a) ?? ni : (d = c.value(n, a == null ? null : h[a], o, a), d = d == null ? ni : { _: d }), Q.values[o] = d;
  }
  function Pi(o, a, c) {
    cs = bt, us = $t, [bt, $t] = N.move(n, bt, $t), N.left = bt, N.top = $t, Wt && (Qi && Ue(Qi, Mt(bt), 0, K, T), Xi && Ue(Xi, 0, Mt($t), K, T));
    let h, d = Nt > Ot;
    Je = pt, li = null;
    let m = S.ori == 0 ? K : T, v = S.ori == 1 ? K : T;
    if (bt < 0 || It == 0 || d) {
      h = N.idx = null;
      for (let y = 0; y < w.length; y++) {
        let x = pe[y];
        x != null && Ue(x, -10, -10, K, T);
      }
      Wi && He(null, rn, !0, o == null && Et.setSeries), Q.live && (ft.fill(h), de = !0);
    } else {
      let y, x, A;
      r == 1 && (y = S.ori == 0 ? bt : $t, x = Le(y, M), h = N.idx = Ce(x, e[0], Nt, Ot), A = z(e[0][h], S, m, 0));
      let P = -10, C = -10, W = 0, lt = 0, ot = !0, X = "", I = "";
      for (let O = r == 2 ? 1 : 0; O < w.length; O++) {
        let vt = w[O], kt = ft[O], Ft = kt == null ? null : r == 1 ? e[O][kt] : e[O][1][kt], dt = N.dataIdx(n, O, h, x), At = dt == null ? null : r == 1 ? e[O][dt] : e[O][1][dt];
        if (de = de || At != Ft || dt != kt, ft[O] = dt, O > 0 && vt.show) {
          let oe = dt == null ? -10 : dt == h ? A : z(r == 1 ? e[0][dt] : e[O][0][dt], S, m, 0), Gt = At == null ? -10 : B(At, r == 1 ? $[vt.scale] : $[vt.facets[1].scale], v, 0);
          if (Wi && At != null) {
            let ge = S.ori == 1 ? bt : $t, Ae = Dt(Oe.dist(n, O, dt, Gt, ge));
            if (Ae < Je) {
              let Re = Oe.bias;
              if (Re != 0) {
                let se = Le(ge, vt.scale), me = At >= 0 ? 1 : -1, Ee = se >= 0 ? 1 : -1;
                Ee == me && (Ee == 1 ? Re == 1 ? At >= se : At <= se : (
                  // >= 0
                  Re == 1 ? At <= se : At >= se
                )) && (Je = Ae, li = O);
              } else
                Je = Ae, li = O;
            }
          }
          if (de || Yi) {
            let ge, Ae;
            S.ori == 0 ? (ge = oe, Ae = Gt) : (ge = Gt, Ae = oe);
            let Re, se, me, Ee, Fe, Kt, le = !0, Ti = jt.bbox;
            if (Ti != null) {
              le = !1;
              let qt = Ti(n, O);
              me = qt.left, Ee = qt.top, Re = qt.width, se = qt.height;
            } else
              me = ge, Ee = Ae, Re = se = jt.size(n, O);
            if (Kt = jt.fill(n, O), Fe = jt.stroke(n, O), Yi)
              O == li && Je <= Oe.prox && (P = me, C = Ee, W = Re, lt = se, ot = le, X = Kt, I = Fe);
            else {
              let qt = pe[O];
              qt != null && (Gi[O] = me, Ki[O] = Ee, Ks(qt, Re, se, le), Ys(qt, Kt, Fe), Ue(qt, ve(me), ve(Ee), K, T));
            }
          }
        }
      }
      if (Yi) {
        let O = Oe.prox, vt = Ei == null ? Je <= O : Je > O || li != Ei;
        if (de || vt) {
          let kt = pe[0];
          kt != null && (Gi[0] = P, Ki[0] = C, Ks(kt, W, lt, ot), Ys(kt, X, I), Ue(kt, ve(P), ve(C), K, T));
        }
      }
    }
    if (_t.show && oi)
      if (o != null) {
        let [y, x] = Et.scales, [A, P] = Et.match, [C, W] = o.cursor.sync.scales, lt = o.cursor.drag;
        if (Ht = lt._x, Lt = lt._y, Ht || Lt) {
          let { left: ot, top: X, width: I, height: O } = o.select, vt = o.scales[C].ori, kt = o.posToVal, Ft, dt, At, oe, Gt, ge = y != null && A(y, C), Ae = x != null && P(x, W);
          ge && Ht ? (vt == 0 ? (Ft = ot, dt = I) : (Ft = X, dt = O), At = $[y], oe = z(kt(Ft, C), At, m, 0), Gt = z(kt(Ft + dt, C), At, m, 0), Tn(Me(oe, Gt), Dt(Gt - oe))) : Tn(0, m), Ae && Lt ? (vt == 1 ? (Ft = ot, dt = I) : (Ft = X, dt = O), At = $[x], oe = B(kt(Ft, W), At, v, 0), Gt = B(kt(Ft + dt, W), At, v, 0), Cn(Me(oe, Gt), Dt(Gt - oe))) : Cn(0, v);
        } else
          Zr();
      } else {
        let y = Dt(cs - ls), x = Dt(us - as);
        if (S.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        Ht = Vt.x && y >= Vt.dist, Lt = Vt.y && x >= Vt.dist;
        let A = Vt.uni;
        A != null ? Ht && Lt && (Ht = y >= A, Lt = x >= A, !Ht && !Lt && (x > y ? Lt = !0 : Ht = !0)) : Vt.x && Vt.y && (Ht || Lt) && (Ht = Lt = !0);
        let P, C;
        Ht && (S.ori == 0 ? (P = tn, C = bt) : (P = en, C = $t), Tn(Me(P, C), Dt(C - P)), Lt || Cn(0, v)), Lt && (S.ori == 1 ? (P = tn, C = bt) : (P = en, C = $t), Cn(Me(P, C), Dt(C - P)), Ht || Tn(0, m)), !Ht && !Lt && (Tn(0, 0), Cn(0, 0));
      }
    if (Vt._x = Ht, Vt._y = Lt, o == null) {
      if (c) {
        if ($s != null) {
          let [y, x] = Et.scales;
          Et.values[0] = y != null ? Le(S.ori == 0 ? bt : $t, y) : null, Et.values[1] = x != null ? Le(S.ori == 1 ? bt : $t, x) : null;
        }
        Dn(io, n, bt, $t, K, T, h);
      }
      if (Wi) {
        let y = c && Et.setSeries, x = Oe.prox;
        Ei == null ? Je <= x && He(li, rn, !0, y) : Je > x ? He(null, rn, !0, y) : li != Ei && He(li, rn, !0, y);
      }
    }
    de && (Q.idx = h, Gr()), a !== !1 && Rt("setCursor");
  }
  let ai = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ai == null && Mn(!1), ai;
    }
  });
  function Mn(o = !1) {
    o ? ai = null : (ai = E.getBoundingClientRect(), Rt("syncRect", ai));
  }
  function ds(o, a, c, h, d, m, v) {
    N._lock || oi && o != null && o.movementX == 0 && o.movementY == 0 || (Kr(o, a, c, h, d, m, v, !1, o != null), o != null ? Pi(null, !0, !0) : Pi(a, !0, !1));
  }
  function Kr(o, a, c, h, d, m, v, y, x) {
    if (ai == null && Mn(!1), ki(o), o != null)
      c = o.clientX - ai.left, h = o.clientY - ai.top;
    else {
      if (c < 0 || h < 0) {
        bt = -10, $t = -10;
        return;
      }
      let [A, P] = Et.scales, C = a.cursor.sync, [W, lt] = C.values, [ot, X] = C.scales, [I, O] = Et.match, vt = a.axes[0].side % 2 == 1, kt = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, dt = vt ? m : d, At = vt ? d : m, oe = vt ? h : c, Gt = vt ? c : h;
      if (ot != null ? c = I(A, ot) ? u(W, $[A], kt, 0) : -10 : c = kt * (oe / dt), X != null ? h = O(P, X) ? u(lt, $[P], Ft, 0) : -10 : h = Ft * (Gt / At), S.ori == 1) {
        let ge = c;
        c = h, h = ge;
      }
    }
    x && (a == null || a.cursor.event.type == io) && ((c <= 1 || c >= K - 1) && (c = Mi(c, K)), (h <= 1 || h >= T - 1) && (h = Mi(h, T))), y ? (ls = c, as = h, [tn, en] = N.move(n, c, h)) : (bt = c, $t = h);
  }
  const qr = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Zr() {
    rr(qr, !1);
  }
  let ps, gs, ms, bs;
  function _s(o, a, c, h, d, m, v) {
    oi = !0, Ht = Lt = Vt._x = Vt._y = !1, Kr(o, a, c, h, d, m, v, !0, !1), o != null && (Yt(no, go, vs, !1), Dn(Fs, n, tn, en, K, T, null));
    let { left: y, top: x, width: A, height: P } = _t;
    ps = y, gs = x, ms = A, bs = P;
  }
  function vs(o, a, c, h, d, m, v) {
    oi = Vt._x = Vt._y = !1, Kr(o, a, c, h, d, m, v, !1, !0);
    let { left: y, top: x, width: A, height: P } = _t, C = A > 0 || P > 0, W = ps != y || gs != x || ms != A || bs != P;
    if (C && W && rr(_t), Vt.setScale && C && W) {
      let lt = y, ot = A, X = x, I = P;
      if (S.ori == 1 && (lt = x, ot = P, X = y, I = A), Ht && si(
        M,
        Le(lt, M),
        Le(lt + ot, M)
      ), Lt)
        for (let O in $) {
          let vt = $[O];
          O != M && vt.from == null && vt.min != pt && si(
            O,
            Le(X + I, O),
            Le(X, O)
          );
        }
      Zr();
    } else N.lock && (N._lock = !N._lock, Pi(a, !0, o != null));
    o != null && (Vi(no, go), Dn(no, n, bt, $t, K, T, null));
  }
  function Ja(o, a, c, h, d, m, v) {
    if (N._lock)
      return;
    ki(o);
    let y = oi;
    if (oi) {
      let x = !0, A = !0, P = 10, C, W;
      S.ori == 0 ? (C = Ht, W = Lt) : (C = Lt, W = Ht), C && W && (x = bt <= P || bt >= K - P, A = $t <= P || $t >= T - P), C && x && (bt = bt < tn ? 0 : K), W && A && ($t = $t < en ? 0 : T), Pi(null, !0, !0), oi = !1;
    }
    bt = -10, $t = -10, ft.fill(null), Pi(null, !0, !0), y && (oi = y);
  }
  function ys(o, a, c, h, d, m, v) {
    N._lock || (ki(o), Dr(), Zr(), o != null && Dn(Vs, n, bt, $t, K, T, null));
  }
  function ws() {
    F.forEach(Wh), Mr(n.width, n.height, !0);
  }
  Oi(mr, un, ws);
  const on = {};
  on.mousedown = _s, on.mousemove = ds, on.mouseup = vs, on.dblclick = ys, on.setSeries = (o, a, c, h) => {
    let d = Et.match[2];
    c = d(n, a, c), c != -1 && He(c, h, !0, !1);
  }, Wt && (Yt(Fs, E, _s), Yt(io, E, ds), Yt(Us, E, (o) => {
    ki(o), Mn(!1);
  }), Yt(Is, E, Ja), Yt(Vs, E, ys), $o.add(n), n.syncRect = Mn);
  const or = n.hooks = t.hooks || {};
  function Rt(o, a, c) {
    jr ? Pn.push([o, a, c]) : o in or && or[o].forEach((h) => {
      h.call(null, n, a, c);
    });
  }
  (t.plugins || []).forEach((o) => {
    for (let a in o.hooks)
      or[a] = (or[a] || []).concat(o.hooks[a]);
  });
  const xs = (o, a, c) => c, Et = Pt({
    key: null,
    setSeries: !1,
    filters: {
      pub: Xs,
      sub: Xs
    },
    scales: [M, w[1] ? w[1].scale : null],
    match: [tl, tl, xs],
    values: [null, null]
  }, N.sync);
  Et.match.length == 2 && Et.match.push(xs), N.sync = Et;
  const $s = Et.key, Jr = fa($s);
  function Dn(o, a, c, h, d, m, v) {
    Et.filters.pub(o, a, c, h, d, m, v) && Jr.pub(o, a, c, h, d, m, v);
  }
  Jr.sub(n);
  function Qa(o, a, c, h, d, m, v) {
    Et.filters.sub(o, a, c, h, d, m, v) && on[o](null, a, c, h, d, m, v);
  }
  n.pub = Qa;
  function Xa() {
    Jr.unsub(n), $o.delete(n), yi.clear(), _o(mr, un, ws), p.remove(), ut?.remove(), Rt("destroy");
  }
  n.destroy = Xa;
  function Qr() {
    Rt("init", t, e), Xo(e || t.data, !1), R[M] ? Br(M, R[M]) : Dr(), Qn = _t.show && (_t.width > 0 || _t.height > 0), Si = de = !0, Mr(t.width, t.height);
  }
  return w.forEach(Jo), F.forEach(Ma), i ? i instanceof HTMLElement ? (i.appendChild(p), Qr()) : i(n, Qr) : Qr(), n;
}
Bt.assign = Pt;
Bt.fmtNum = Ro;
Bt.rangeNum = br;
Bt.rangeLog = xr;
Bt.rangeAsinh = Ho;
Bt.orient = Fi;
Bt.pxRatio = at;
Bt.join = Hu;
Bt.fmtDate = Uo, Bt.tzDate = Gu;
Bt.sync = fa;
{
  Bt.addGap = Th, Bt.clipGaps = kr;
  let t = Bt.paths = {
    points: _a
  };
  t.linear = ya, t.stepped = Dh, t.bars = zh, t.spline = Oh;
}
const Yh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Gh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, Ge = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Kh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Gh(e, i, r), r;
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
    const n = [...i].sort((s, l) => s - l), r = t.map((s) => {
      let l = -1, u = null;
      return n.map((f) => {
        for (; l + 1 < s.length && s[l + 1][0] <= f; )
          l++, u = s[l][1];
        return u;
      });
    });
    return [n, ...r];
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(t, e) {
    if (!t) return [];
    const i = [...t].sort((r, s) => r.lu - s.lu), n = [];
    for (let r = 0; r < i.length; r++) {
      const s = i[r].lu, l = i[r + 1]?.lu ?? e, u = i[r].s;
      (u === "heating" || u === "cooling") && n.push({ start: s, end: l, action: u });
    }
    return n;
  }
  _renderPlot(t) {
    if (!this._host) return;
    const e = Math.floor(Date.now() / 1e3), i = this._numericSeries(t[this.roomEntity]), n = this._numericSeries(t[this.lowEntity]), r = this._numericSeries(t[this.highEntity]);
    if (this._intervals = this._actionIntervals(t[this.actionEntity], e), i.length === 0 && n.length === 0 && r.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([i, n, r], e), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Bt(l, s, this._host), this._observeResize());
  }
  _buildOpts(t) {
    const e = getComputedStyle(this), i = e.getPropertyValue("--cb-action-heating").trim() || "#d9603f", n = e.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", r = e.getPropertyValue("--primary-color").trim() || "#03a9f4";
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
            const u = s.bbox.top, f = s.bbox.height;
            l.save();
            for (const p of this._intervals) {
              const _ = s.valToPos(p.start, "x", !0), g = s.valToPos(p.end, "x", !0);
              g <= _ || (l.fillStyle = p.action === "heating" ? xl(i, 0.18) : xl(n, 0.18), l.fillRect(_, u, g - _, f));
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
    return !this.hass || !this.roomEntity ? D`<div class="status">No room temperature sensor for this zone.</div>` : D`
      ${this._loading ? D`<div class="status">Loading 24 h history…</div>` : nt}
      ${this._error ? D`<div class="status">${this._error}</div>` : nt}
      ${this._empty ? D`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : nt}
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
  Pl(Yh),
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
Ge([
  j({ attribute: !1 })
], we.prototype, "hass", 2);
Ge([
  j({ type: String })
], we.prototype, "roomEntity", 2);
Ge([
  j({ type: String })
], we.prototype, "lowEntity", 2);
Ge([
  j({ type: String })
], we.prototype, "highEntity", 2);
Ge([
  j({ type: String })
], we.prototype, "actionEntity", 2);
Ge([
  ct()
], we.prototype, "_loading", 2);
Ge([
  ct()
], we.prototype, "_error", 2);
Ge([
  ct()
], we.prototype, "_empty", 2);
Ge([
  _n(".chart-host")
], we.prototype, "_host", 2);
we = Ge([
  ee("comfort-band-history-chart")
], we);
function xl(t, e) {
  const i = t.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), u = parseInt(s.slice(2, 4), 16), f = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${u}, ${f}, ${e})`;
  }
  const r = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return r ? `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${e})` : i;
}
var Zh = Object.defineProperty, Jh = Object.getOwnPropertyDescriptor, Go = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Jh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Zh(e, i, r), r;
};
let Yn = class extends Ut {
  render() {
    const t = this.entities?.roomTemperature;
    return t ? D`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${t}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${nt}
    ` : D`<div class="empty">No room temperature sensor for this zone.</div>`;
  }
};
Yn.styles = [
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
Go([
  j({ attribute: !1 })
], Yn.prototype, "hass", 2);
Go([
  j({ attribute: !1 })
], Yn.prototype, "entities", 2);
Yn = Go([
  ee("comfort-band-insights-tab")
], Yn);
var Qh = Object.defineProperty, Xh = Object.getOwnPropertyDescriptor, Sn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Xh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Qh(e, i, r), r;
};
const Xe = 15, Ve = 0.5, Qe = 14, Ie = 28, $l = 4, tf = 500, ln = 600, cr = 200, Sl = 0, ko = 24 * 60 - Xe, ao = [0, 6, 12, 18, 24], kl = [14, 18, 22, 26];
function Te(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t);
  return e ? parseInt(e[1], 10) * 60 + parseInt(e[2], 10) : 0;
}
function co(t) {
  const e = Math.max(0, Math.min(ko, t)), i = Math.floor(e / 60), n = e % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function ef(t) {
  return Math.round(t / Xe) * Xe;
}
function uo(t) {
  return Math.round(t / Ve) * Ve;
}
function be(t, e, i) {
  return Math.min(i, Math.max(e, t));
}
let gi = class extends Ut {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (t, e, i) => {
      t.stopPropagation(), t.preventDefault(), t.currentTarget.setPointerCapture(t.pointerId);
      const r = {
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
      r.longPressTimer = window.setTimeout(() => {
        r.longPressTimer = null, this._drag === r && !r.moved && (r.longPressed = !0, this._fire("transition-delete", { at: r.origin.at }));
      }, tf), this._drag = r;
    }, this._onHandlePointerMove = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "handle" || e.longPressed) return;
      const i = t.clientX - e.startX, n = t.clientY - e.startY;
      if (!e.moved && Math.hypot(i, n) < $l) return;
      e.moved || (e.moved = !0, e.longPressTimer !== null && (window.clearTimeout(e.longPressTimer), e.longPressTimer = null));
      const r = this._svg();
      if (!r) {
        this._preview = { at: e.origin.at, low: e.origin.low, high: e.origin.high };
        return;
      }
      const s = r.getBoundingClientRect(), l = be(
        this._clientToMinutes(t.clientX, s),
        e.range.min,
        e.range.max
      ), u = this._clientToTemp(t.clientY, s);
      let f = e.origin.low, p = e.origin.high;
      e.handle === "low" ? f = be(u, Qe, p - Ve) : p = be(u, f + Ve, Ie), this._preview = { at: co(l), low: f, high: p };
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
      const n = e.moved, r = t.type === "pointercancel";
      if (this._drag = null, r || n || !i) return;
      const s = i.getBoundingClientRect(), l = be(this._clientToMinutes(t.clientX, s), Sl, ko);
      for (const _ of this.transitions) if (Te(_.at) === l) return;
      const u = this._clientToTemp(t.clientY, s), f = be(uo(u - 1.5), Qe, Ie - Ve), p = be(uo(u + 1.5), f + Ve, Ie);
      this._fire("transition-add", { at: co(l), low: f, high: p });
    }, this._onHandleKeyDown = (t, e, i) => {
      if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), this._fire("transition-edit", { transition: e });
        return;
      }
      if (t.key === "Delete" || t.key === "Backspace") {
        t.preventDefault(), this._fire("transition-delete", { at: e.at });
        return;
      }
      let n = 0, r = 0;
      switch (t.key) {
        case "ArrowLeft":
          n = -Xe;
          break;
        case "ArrowRight":
          n = Xe;
          break;
        case "ArrowUp":
          r = Ve;
          break;
        case "ArrowDown":
          r = -Ve;
          break;
        default:
          return;
      }
      t.preventDefault();
      const s = this._timeRangeFor(e.at), l = be(Te(e.at) + n, s.min, s.max);
      let u = e.low, f = e.high;
      if (i === "low" ? u = be(e.low + r, Qe, f - Ve) : f = be(e.high + r, u + Ve, Ie), l === Te(e.at) && u === e.low && f === e.high)
        return;
      const p = co(l);
      this._focusedAt === e.at && (this._focusedAt = p), this._fire("transition-update", {
        oldAt: e.at,
        transition: { at: p, low: u, high: f }
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
    return t / (24 * 60) * ln;
  }
  _tempToY(t) {
    const e = be(t, Qe, Ie);
    return cr - (e - Qe) / (Ie - Qe) * cr;
  }
  _clientToMinutes(t, e) {
    if (e.width === 0) return 0;
    const i = be((t - e.left) / e.width, 0, 1);
    return ef(i * 24 * 60);
  }
  _clientToTemp(t, e) {
    if (e.height === 0) return Qe;
    const i = be((t - e.top) / e.height, 0, 1), n = Ie - i * (Ie - Qe);
    return uo(n);
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
    let n = Sl, r = ko;
    for (const s of i)
      s < e && s + Xe > n && (n = s + Xe), s > e && s - Xe < r && (r = s - Xe);
    return { min: n, max: r };
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
    let r = i;
    for (const s of t) {
      const l = this._timeToX(Te(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[e])]), r = s[e];
    }
    return n.push([ln, this._tempToY(r)]), n;
  }
  _pointsToPath(t) {
    return t.map(([e, i], n) => `${n === 0 ? "M" : "L"} ${e} ${i}`).join(" ");
  }
  _fillFromPoints(t, e) {
    const i = this._pointsToPath(t), n = e.slice().reverse().map(([r, s]) => `L ${r} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const t = this._renderedTransitions(), e = t.length > 0, i = e ? this._stepPoints(t, "low") : [], n = e ? this._stepPoints(t, "high") : [], r = e ? this._pointsToPath(i) : "", s = e ? this._pointsToPath(n) : "", l = e ? this._fillFromPoints(n, i) : "";
    return D`
      <div class="chart">
        <svg
          viewBox="0 0 ${ln} ${cr}"
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
      (u) => hi`<line class="grid" x1="0" x2=${ln} y1=${this._tempToY(u)} y2=${this._tempToY(u)}></line>`
    )}
          ${ao.map(
      (u) => hi`<line class="grid" y1="0" y2=${cr} x1=${u / 24 * ln} x2=${u / 24 * ln}></line>`
    )}
          ${t.length > 0 ? hi`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${t.map((u) => {
      const f = this._timeToX(Te(u.at)), p = this._tempToY(u.low), _ = this._tempToY(u.high), g = this._focusedAt === u.at && this._focusedHandle === "low", b = this._focusedAt === u.at && this._focusedHandle === "high", k = this._drag?.kind === "handle" && this._drag.origin.at === u.at ? this._drag.handle : null, E = `Low handle at ${u.at}, ${u.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, H = `High handle at ${u.at}, ${u.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, U = `handle low${g ? " focused" : ""}${k === "low" ? " dragging" : ""}`, V = `handle high${b ? " focused" : ""}${k === "high" ? " dragging" : ""}`;
      return hi`
              <circle
                class=${U}
                cx=${f}
                cy=${p}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${E}
                data-at=${u.at}
                data-handle="low"
                @pointerdown=${(w) => this._onHandlePointerDown(w, u, "low")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(w) => this._onHandleKeyDown(w, u, "low")}
                @focus=${() => this._onHandleFocus(u, "low")}
                @blur=${this._onHandleBlur}
              ></circle>
              <circle
                class=${V}
                cx=${f}
                cy=${_}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${H}
                data-at=${u.at}
                data-handle="high"
                @pointerdown=${(w) => this._onHandlePointerDown(w, u, "high")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(w) => this._onHandleKeyDown(w, u, "high")}
                @focus=${() => this._onHandleFocus(u, "high")}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
    })}
        </svg>
        ${kl.map(
      (u) => D`<div
              class="axis-label y"
              style="top: ${(Ie - u) / (Ie - Qe) * 100}%"
            >
              ${u}°
            </div>`
    )}
        ${ao.map((u, f) => {
      const p = f === 0 ? "axis-label x start" : f === ao.length - 1 ? "axis-label x end" : "axis-label x";
      return D`<div class=${p} style="left: ${u / 24 * 100}%">${u}h</div>`;
    })}
        ${this.transitions.length === 0 ? D`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
gi.styles = [
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
  j({ type: Array })
], gi.prototype, "transitions", 2);
Sn([
  ct()
], gi.prototype, "_drag", 2);
Sn([
  ct()
], gi.prototype, "_preview", 2);
Sn([
  ct()
], gi.prototype, "_focusedAt", 2);
Sn([
  ct()
], gi.prototype, "_focusedHandle", 2);
gi = Sn([
  ee("comfort-band-schedule-chart")
], gi);
var nf = Object.defineProperty, rf = Object.getOwnPropertyDescriptor, _i = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? rf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && nf(e, i, r), r;
};
let Be = class extends Ut {
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
    return D`
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
      ${this._error ? D`<div class="error">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : D`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Be.styles = [
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
  j({ type: Object })
], Be.prototype, "transition", 2);
_i([
  j({ type: Boolean })
], Be.prototype, "isNew", 2);
_i([
  ct()
], Be.prototype, "_at", 2);
_i([
  ct()
], Be.prototype, "_low", 2);
_i([
  ct()
], Be.prototype, "_high", 2);
_i([
  ct()
], Be.prototype, "_error", 2);
_i([
  _n('input[name="at"]')
], Be.prototype, "_atInput", 2);
Be = _i([
  ee("transition-edit-dialog")
], Be);
var of = Object.defineProperty, sf = Object.getOwnPropertyDescriptor, Ke = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? sf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && of(e, i, r), r;
};
function ho(t, e) {
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
      const { oldAt: e, transition: i } = t.detail, n = this._transitions.filter((r) => r.at !== e && r.at !== i.at).concat(i).sort(ho);
      await this._writeSchedule(n);
    }, this._onDialogSave = async (t) => {
      const e = t.detail.transition, i = [];
      if (this._mode === "edit" && this._editing) {
        const n = this._editing.at;
        for (const r of this._transitions)
          r.at !== n && r.at !== e.at && i.push(r);
        i.push(e);
      } else {
        for (const n of this._transitions)
          n.at !== e.at && i.push(n);
        i.push(e);
      }
      i.sort(ho), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
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
          t === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(ho) : [], this._loading = !1);
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
    if (!this.hass) return nt;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? lf(this._transitions),
        high: this._newHigh ?? af(this._transitions)
      };
      return D`
        <transition-edit-dialog
          .transition=${t}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return D`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? D`<div class="loading">Loading schedule…</div>` : this._error ? D`<div class="error">${this._error}</div>` : D`
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
    return this._transitions.length === 0 ? nt : D`
      <ul class="list">
        ${this._transitions.map((t) => {
      const e = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: t } }));
      return D`
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
  j({ attribute: !1 })
], xe.prototype, "hass", 2);
Ke([
  j({ type: String })
], xe.prototype, "zone", 2);
Ke([
  ct()
], xe.prototype, "_profile", 2);
Ke([
  ct()
], xe.prototype, "_transitions", 2);
Ke([
  ct()
], xe.prototype, "_loading", 2);
Ke([
  ct()
], xe.prototype, "_error", 2);
Ke([
  ct()
], xe.prototype, "_mode", 2);
Ke([
  ct()
], xe.prototype, "_editing", 2);
Ke([
  ct()
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
  for (var r = n > 1 ? void 0 : n ? uf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && cf(e, i, r), r;
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
    if (!this._isOpen) return nt;
    const t = this.zoneName || this.zone || "Comfort Band";
    return D`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${t}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${hf.map(
      (e) => D`
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
        return D`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return D`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return D`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "insights":
        return D`<comfort-band-insights-tab
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
  j({ attribute: !1 })
], We.prototype, "hass", 2);
vi([
  j({ type: String })
], We.prototype, "zone", 2);
vi([
  j({ type: String })
], We.prototype, "zoneName", 2);
vi([
  j({ attribute: !1 })
], We.prototype, "entities", 2);
vi([
  ct()
], We.prototype, "_activeTab", 2);
vi([
  ct()
], We.prototype, "_isOpen", 2);
vi([
  _n("dialog")
], We.prototype, "_dialog", 2);
We = vi([
  ee("comfort-band-modal")
], We);
var ff = Object.defineProperty, df = Object.getOwnPropertyDescriptor, Ko = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? df(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && ff(e, i, r), r;
};
let Gn = class extends Ut {
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
      return D`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const e = this.config.variant === "mini" ? "mini" : "tile";
    return D`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? D`<option value="" disabled selected>Select a zone…</option>` : null}
          ${t.map(
      (i) => D` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
Gn.styles = [
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
Ko([
  j({ attribute: !1 })
], Gn.prototype, "hass", 2);
Ko([
  j({ attribute: !1 })
], Gn.prototype, "config", 2);
Gn = Ko([
  ee("comfort-band-card-editor")
], Gn);
var pf = Object.defineProperty, gf = Object.getOwnPropertyDescriptor, Tr = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? gf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && pf(e, i, r), r;
};
let bn = class extends Ut {
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
        for (const [n, r] of i.identifiers)
          if (n === "comfort_band" && r.startsWith("zone:")) {
            e = r.slice(5);
            break;
          }
        if (e) break;
      }
    return { type: "custom:comfort-band-card", zone: e };
  }
  render() {
    if (!this._config || !this.hass) return D``;
    const t = this._config.zone, e = Kc(this.hass, t);
    if (e.deviceId === null)
      return D`<div class="placeholder">
        Comfort Band zone <code>${t}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, e);
    return D`
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
      ${i ? null : D`<comfort-band-modal
            .hass=${this.hass}
            zone=${t}
            zoneName=${r.zoneName}
            .entities=${e}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(t, e) {
    const i = (r) => r !== null ? t.states[r] : void 0, n = (r) => {
      const s = i(r);
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
bn.styles = [
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
Tr([
  j({ attribute: !1 })
], bn.prototype, "hass", 2);
Tr([
  ct()
], bn.prototype, "_config", 2);
Tr([
  _n("comfort-band-modal")
], bn.prototype, "_modal", 2);
bn = Tr([
  ee("comfort-band-card")
], bn);
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
