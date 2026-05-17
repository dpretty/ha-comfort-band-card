const vr = globalThis, Lo = vr.ShadowRoot && (vr.ShadyCSS === void 0 || vr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ro = Symbol(), Ls = /* @__PURE__ */ new WeakMap();
let Fl = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== Ro) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Lo && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = Ls.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ls.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Kn = (t) => new Fl(typeof t == "string" ? t : t + "", void 0, Ro), Vt = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new Fl(i, t, Ro);
}, gc = (t, e) => {
  if (Lo) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), r = vr.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, t.appendChild(n);
  }
}, Rs = Lo ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Kn(i);
})(t) : t;
const { is: mc, defineProperty: bc, getOwnPropertyDescriptor: vc, getOwnPropertyNames: _c, getOwnPropertySymbols: yc, getPrototypeOf: wc } = Object, Er = globalThis, Fs = Er.trustedTypes, xc = Fs ? Fs.emptyScript : "", $c = Er.reactiveElementPolyfillSupport, Wn = (t, e) => t, yr = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? xc : null;
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
} }, Fo = (t, e) => !mc(t, e), Bs = { attribute: !0, type: String, converter: yr, reflect: !1, useDefault: !1, hasChanged: Fo };
Symbol.metadata ??= Symbol("metadata"), Er.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let hn = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Bs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(e, n, i);
      r !== void 0 && bc(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: r, set: s } = vc(this.prototype, e) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: r, set(l) {
      const h = r?.call(this);
      s?.call(this, l), this.requestUpdate(e, h, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Bs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Wn("elementProperties"))) return;
    const e = wc(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Wn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Wn("properties"))) {
      const i = this.properties, n = [..._c(i), ...yc(i)];
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
      for (const r of n) i.unshift(Rs(r));
    } else e !== void 0 && i.push(Rs(e));
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
    return gc(e, this.constructor.elementStyles), e;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : yr).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : yr;
      this._$Em = r;
      const h = l.fromAttribute(i, s.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, r = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (r === !1 && (s = this[e]), n ??= l.getPropertyOptions(e), !((n.hasChanged ?? Fo)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, n)))) return;
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
        const { wrapped: l } = s, h = this[r];
        l !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, s, h);
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
hn.elementStyles = [], hn.shadowRootOptions = { mode: "open" }, hn[Wn("elementProperties")] = /* @__PURE__ */ new Map(), hn[Wn("finalized")] = /* @__PURE__ */ new Map(), $c?.({ ReactiveElement: hn }), (Er.reactiveElementVersions ??= []).push("2.1.2");
const Bo = globalThis, Is = (t) => t, wr = Bo.trustedTypes, Us = wr ? wr.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Bl = "$lit$", ui = `lit$${Math.random().toFixed(9).slice(2)}$`, Il = "?" + ui, Sc = `<${Il}>`, Li = document, qn = () => Li.createComment(""), Zn = (t) => t === null || typeof t != "object" && typeof t != "function", Io = Array.isArray, kc = (t) => Io(t) || typeof t?.[Symbol.iterator] == "function", ao = `[ 	
\f\r]`, Fn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, js = /-->/g, Vs = />/g, Ci = RegExp(`>|${ao}(?:([^\\s"'>=/]+)(${ao}*=${ao}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ws = /'/g, Gs = /"/g, Ul = /^(?:script|style|textarea|title)$/i, jl = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), $ = jl(1), hi = jl(2), gn = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), Ys = /* @__PURE__ */ new WeakMap(), Ni = Li.createTreeWalker(Li, 129);
function Vl(t, e) {
  if (!Io(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Us !== void 0 ? Us.createHTML(e) : e;
}
const Ac = (t, e) => {
  const i = t.length - 1, n = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = Fn;
  for (let h = 0; h < i; h++) {
    const d = t[h];
    let p, b, g = -1, v = 0;
    for (; v < d.length && (l.lastIndex = v, b = l.exec(d), b !== null); ) v = l.lastIndex, l === Fn ? b[1] === "!--" ? l = js : b[1] !== void 0 ? l = Vs : b[2] !== void 0 ? (Ul.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = Ci) : b[3] !== void 0 && (l = Ci) : l === Ci ? b[0] === ">" ? (l = r ?? Fn, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Ci : b[3] === '"' ? Gs : Ws) : l === Gs || l === Ws ? l = Ci : l === js || l === Vs ? l = Fn : (l = Ci, r = void 0);
    const S = l === Ci && t[h + 1].startsWith("/>") ? " " : "";
    s += l === Fn ? d + Sc : g >= 0 ? (n.push(p), d.slice(0, g) + Bl + d.slice(g) + ui + S) : d + ui + (g === -2 ? h : S);
  }
  return [Vl(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Jn {
  constructor({ strings: e, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const h = e.length - 1, d = this.parts, [p, b] = Ac(e, i);
    if (this.el = Jn.createElement(p, n), Ni.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Ni.nextNode()) !== null && d.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Bl)) {
          const v = b[l++], S = r.getAttribute(g).split(ui), E = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: s, name: E[2], strings: S, ctor: E[1] === "." ? Pc : E[1] === "?" ? Tc : E[1] === "@" ? Cc : Pr }), r.removeAttribute(g);
        } else g.startsWith(ui) && (d.push({ type: 6, index: s }), r.removeAttribute(g));
        if (Ul.test(r.tagName)) {
          const g = r.textContent.split(ui), v = g.length - 1;
          if (v > 0) {
            r.textContent = wr ? wr.emptyScript : "";
            for (let S = 0; S < v; S++) r.append(g[S], qn()), Ni.nextNode(), d.push({ type: 2, index: ++s });
            r.append(g[v], qn());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Il) d.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(ui, g + 1)) !== -1; ) d.push({ type: 7, index: s }), g += ui.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const n = Li.createElement("template");
    return n.innerHTML = e, n;
  }
}
function mn(t, e, i = t, n) {
  if (e === gn) return e;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Zn(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (e = mn(t, r._$AS(t, e.values), r, n)), e;
}
class Ec {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (e?.creationScope ?? Li).importNode(i, !0);
    Ni.currentNode = r;
    let s = Ni.nextNode(), l = 0, h = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let p;
        d.type === 2 ? p = new er(s, s.nextSibling, this, e) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, e) : d.type === 6 && (p = new Mc(s, this, e)), this._$AV.push(p), d = n[++h];
      }
      l !== d?.index && (s = Ni.nextNode(), l++);
    }
    return Ni.currentNode = Li, r;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class er {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, r) {
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = mn(this, e, i), Zn(e) ? e === G || e == null || e === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : e !== this._$AH && e !== gn && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : kc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== G && Zn(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Li.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Jn.createElement(Vl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new Ec(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Ys.get(e.strings);
    return i === void 0 && Ys.set(e.strings, i = new Jn(e)), i;
  }
  k(e) {
    Io(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of e) r === i.length ? i.push(n = new er(this.O(qn()), this.O(qn()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = Is(e).nextSibling;
      Is(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Pr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, r, s) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = G;
  }
  _$AI(e, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = mn(this, e, i, 0), l = !Zn(e) || e !== this._$AH && e !== gn, l && (this._$AH = e);
    else {
      const h = e;
      let d, p;
      for (e = s[0], d = 0; d < s.length - 1; d++) p = mn(this, h[n + d], i, d), p === gn && (p = this._$AH[d]), l ||= !Zn(p) || p !== this._$AH[d], p === G ? e = G : e !== G && (e += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !r && this.j(e);
  }
  j(e) {
    e === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Pc extends Pr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === G ? void 0 : e;
  }
}
class Tc extends Pr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== G);
  }
}
class Cc extends Pr {
  constructor(e, i, n, r, s) {
    super(e, i, n, r, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = mn(this, e, i, 0) ?? G) === gn) return;
    const n = this._$AH, r = e === G && n !== G || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== G && (n === G || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Mc {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    mn(this, e);
  }
}
const Dc = Bo.litHtmlPolyfillSupport;
Dc?.(Jn, er), (Bo.litHtmlVersions ??= []).push("3.3.2");
const zc = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new er(e.insertBefore(qn(), s), s, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const Uo = globalThis;
class zt extends hn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = zc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return gn;
  }
}
zt._$litElement$ = !0, zt.finalized = !0, Uo.litElementHydrateSupport?.({ LitElement: zt });
const Oc = Uo.litElementPolyfillSupport;
Oc?.({ LitElement: zt });
(Uo.litElementVersions ??= []).push("4.2.2");
const Gt = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Nc = { attribute: !0, type: String, converter: yr, reflect: !1, hasChanged: Fo }, Hc = (t = Nc, e, i) => {
  const { kind: n, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), n === "accessor") {
    const { name: l } = i;
    return { set(h) {
      const d = e.get.call(this);
      e.set.call(this, h), this.requestUpdate(l, d, t, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(l, void 0, t, h), h;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(h) {
      const d = this[l];
      e.call(this, h), this.requestUpdate(l, d, t, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function F(t) {
  return (e, i) => typeof i == "object" ? Hc(t, e, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, i);
}
function rt(t) {
  return F({ ...t, state: !0, attribute: !1 });
}
const Lc = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
function xn(t, e) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(t) ?? null;
    return Lc(i, n, { get() {
      return s(this);
    } });
  };
}
const Yt = Vt`
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
function xr(t) {
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
function $r(t) {
  return t === "heating" || t === "cooling" || t === "idle" ? t : "unknown";
}
function xo(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var Rc = Object.defineProperty, Fc = Object.getOwnPropertyDescriptor, ir = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Fc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Rc(e, i, r), r;
};
const $o = 15, Wl = 28, Bc = Wl - $o;
function co(t) {
  return Number.isNaN(t) || !Number.isFinite(t) ? 0 : (Math.max($o, Math.min(Wl, t)) - $o) / Bc * 100;
}
let Ri = class extends zt {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const t = $r(this.action), e = xr(t), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? co(this.low) : 0, l = n ? co(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = r ? co(this.room) : 50, b = (v) => Number.isFinite(v) ? `${v.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${t}`;
    return $`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${hi`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? hi`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${e}></rect>` : null}
        ${r ? hi`<circle cx=${p} cy="12" r="4.5" fill=${e}></circle>` : null}
        ${r ? hi`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${e}></circle>` : null}
      </svg>
    `;
  }
};
Ri.styles = [
  Yt,
  Vt`
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
ir([
  F({ type: Number })
], Ri.prototype, "low", 2);
ir([
  F({ type: Number })
], Ri.prototype, "high", 2);
ir([
  F({ type: Number })
], Ri.prototype, "room", 2);
ir([
  F({ type: String })
], Ri.prototype, "action", 2);
Ri = ir([
  Gt("band-gauge")
], Ri);
var Ic = Object.defineProperty, Uc = Object.getOwnPropertyDescriptor, We = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Uc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Ic(e, i, r), r;
};
let ye = class extends zt {
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
    const t = jc(this.overrideEnds);
    return $`<div class="override-pill">Override${t ? ` · ${t}` : ""}</div>`;
  }
  _renderActionChip() {
    const t = $r(this.action);
    if (t === "idle" || t === "unknown") return null;
    const e = xr(t);
    return $`<span class="action-chip" style="background:${e}">
      ${xo(t)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : $`
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
    const t = $r(this.action), e = t === "heating" || t === "cooling", i = e ? `--cb-mini-bg:${xr(t)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${e ? `, ${xo(t)}` : ""}`;
    return $`
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
  Yt,
  Vt`
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
We([
  F({ type: String })
], ye.prototype, "zoneName", 2);
We([
  F({ type: Number })
], ye.prototype, "roomTemp", 2);
We([
  F({ type: Number })
], ye.prototype, "low", 2);
We([
  F({ type: Number })
], ye.prototype, "high", 2);
We([
  F({ type: String })
], ye.prototype, "action", 2);
We([
  F({ type: Boolean })
], ye.prototype, "overrideActive", 2);
We([
  F({ type: String })
], ye.prototype, "overrideEnds", 2);
We([
  F({ type: Boolean })
], ye.prototype, "noExpand", 2);
We([
  F({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
ye = We([
  Gt("comfort-band-tile")
], ye);
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
var Vc = Object.defineProperty, Wc = Object.getOwnPropertyDescriptor, ei = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Wc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Vc(e, i, r), r;
};
let Me = class extends zt {
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
    return $`
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
Me.styles = [
  Yt,
  Vt`
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
ei([
  F({ type: Number })
], Me.prototype, "min", 2);
ei([
  F({ type: Number })
], Me.prototype, "max", 2);
ei([
  F({ type: Number })
], Me.prototype, "step", 2);
ei([
  F({ type: Number })
], Me.prototype, "low", 2);
ei([
  F({ type: Number })
], Me.prototype, "high", 2);
ei([
  F({ type: String })
], Me.prototype, "unit", 2);
ei([
  rt()
], Me.prototype, "_dragging", 2);
ei([
  xn(".track")
], Me.prototype, "_track", 2);
Me = ei([
  Gt("dual-handle-slider")
], Me);
const bi = "comfort_band";
function Gc(t, e, i) {
  return t.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...e }
  );
}
function Yc(t, e) {
  return t.callService(bi, "set_schedule", { ...e });
}
function Kc(t, e) {
  const i = { zone: e.zone };
  return e.low !== void 0 && (i.low = e.low), e.high !== void 0 && (i.high = e.high), e.hours !== void 0 && (i.hours = e.hours), t.callService(bi, "start_override", i);
}
function qc(t, e) {
  return t.callService(bi, "cancel_override", { ...e });
}
function Zc(t, e) {
  return t.callService(bi, "set_profile", { ...e });
}
function Jc(t, e) {
  const i = { name: e.name };
  return e.description !== void 0 && (i.description = e.description), t.callService(bi, "create_profile", i);
}
function Qc(t, e) {
  const i = { source: e.source, target: e.target };
  return e.description !== void 0 && (i.description = e.description), t.callService(bi, "clone_profile", i);
}
function Xc(t, e) {
  return t.callService(bi, "rename_profile", { old: e.old, new: e.new });
}
function tu(t, e) {
  return t.callService(bi, "delete_profile", { name: e.name });
}
var eu = Object.defineProperty, iu = Object.getOwnPropertyDescriptor, $n = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? iu(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && eu(e, i, r), r;
};
const nu = [1, 3, 6];
let di = class extends zt {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (t) => {
      this._pendingLow = t.detail.low, this._pendingHigh = t.detail.high;
    }, this._onSliderChange = (t) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Kc(this.hass, {
        zone: this.zone,
        low: t.detail.low,
        high: t.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || qc(this.hass, { zone: this.zone });
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
    if (!this.hass || !this.entities) return G;
    const t = this._numericState(this.entities.manualLow), e = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.apparentTemperature), l = this._numericState(this.entities.overrideHours), h = this._stateOf(this.entities.currentAction)?.state ?? "unknown", d = this._stateOf(this.entities.overrideActive)?.state === "on", p = this._stateOf(this.entities.useApparentTemperature)?.state === "on", b = Number.isFinite(r) && Number.isFinite(s) && Math.abs(s - r) >= 0.1, g = this._pendingLow ?? (Number.isFinite(t) ? t : 19), v = this._pendingHigh ?? (Number.isFinite(e) ? e : 22), S = $r(h), E = S !== "idle" && S !== "unknown";
    return $`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${E ? $`<span class="action-chip" style="background:${xr(S)}"
              >${xo(S)}</span
            >` : G}
      </div>
      ${this._renderFeelsLikeRow({ apparent: s, showFeelsLike: b, useApparentOn: p })}
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
          .high=${v}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(d)} ${this._renderHoursSection(l)}
    `;
  }
  _renderOverrideSection(t) {
    if (!t) return G;
    const e = this._stateOf(this.entities.overrideEnds)?.state, i = ru(e ?? null);
    return $`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${i ? ` · ${i}` : ""}</span>
          <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        </div>
      </section>
    `;
  }
  _renderFeelsLikeRow(t) {
    const { apparent: e, showFeelsLike: i, useApparentOn: n } = t, r = n && Number.isFinite(e);
    return i ? $`<div class="feels-like">
        <span>Feels like ${e.toFixed(1)}°</span>
        ${r ? $`<span class="driving">Driving decisions</span>` : G}
      </div>` : r ? $`<div class="feels-like">
        <span class="driving">Driving decisions</span>
      </div>` : n ? $`<div class="feels-like">
        <span class="muted-warn">
          Apparent temperature mode is on but no humidity reading is available — decisions are using
          the raw room temperature.
        </span>
      </div>` : G;
  }
  _renderHoursSection(t) {
    return this.entities?.overrideHours ? $`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${nu.map(
      (e) => $`
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
    ` : G;
  }
};
di.styles = [
  Yt,
  Vt`
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
        /* Narrow Lovelace tiles (~180 px in a 2-column grid) overflow
           when "Feels like 23.5°" sits next to the "DRIVING DECISIONS"
           pill; wrap so the badge drops to its own line cleanly. */
        flex-wrap: wrap;
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
$n([
  F({ attribute: !1 })
], di.prototype, "hass", 2);
$n([
  F({ type: String })
], di.prototype, "zone", 2);
$n([
  F({ attribute: !1 })
], di.prototype, "entities", 2);
$n([
  rt()
], di.prototype, "_pendingLow", 2);
$n([
  rt()
], di.prototype, "_pendingHigh", 2);
di = $n([
  Gt("comfort-band-now-tab")
], di);
function ru(t) {
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
var ou = Object.defineProperty, su = Object.getOwnPropertyDescriptor, ii = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? su(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && ou(e, i, r), r;
};
let De = class extends zt {
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
    return $`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? $`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
      <label>
        Name
        <input
          name="name"
          type="text"
          autocomplete="off"
          spellcheck="false"
          maxlength="64"
          .value=${this._name}
          @input=${(t) => this._name = t.target.value}
          @keydown=${this._onKey}
        />
      </label>
      ${this.mode !== "rename" ? $`<label>
            Description (optional)
            <input
              name="description"
              type="text"
              autocomplete="off"
              spellcheck="false"
              maxlength="256"
              .value=${this._description}
              @input=${(t) => this._description = t.target.value}
              @keydown=${this._onKey}
            />
          </label>` : null}
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
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
De.styles = [
  Yt,
  Vt`
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
ii([
  F({ type: String })
], De.prototype, "mode", 2);
ii([
  F({ type: String })
], De.prototype, "existingName", 2);
ii([
  F({ type: Array })
], De.prototype, "existingNames", 2);
ii([
  F({ type: Boolean })
], De.prototype, "busy", 2);
ii([
  rt()
], De.prototype, "_name", 2);
ii([
  rt()
], De.prototype, "_description", 2);
ii([
  rt()
], De.prototype, "_error", 2);
ii([
  xn('input[name="name"]')
], De.prototype, "_nameInput", 2);
De = ii([
  Gt("profile-edit-dialog")
], De);
const jo = "comfort_band", lu = {
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
function au() {
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
function Gl(t, e) {
  for (const i of Object.values(t.devices))
    for (const [n, r] of i.identifiers)
      if (n === e[0] && r === e[1])
        return i;
  return null;
}
function Yl(t, e) {
  return Object.values(t.entities).filter(
    (i) => i.device_id === e && i.platform === jo
  );
}
function cu(t, e) {
  const i = au(), n = Gl(t, [jo, `zone:${e}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Yl(t, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = lu[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function Kl(t) {
  const e = Gl(t, [jo, "profile_manager"]);
  if (e === null) return null;
  for (const i of Yl(t, e.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function ql(t, e) {
  return !t || !e ? null : t.states[e]?.attributes.humidity_sensor ?? null;
}
var uu = Object.defineProperty, hu = Object.getOwnPropertyDescriptor, Ii = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? hu(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && uu(e, i, r), r;
};
let ti = class extends zt {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._busy = !1, this._menuOpenedByKeyboard = !1, this._dialogTrigger = null, this._onDocumentClick = (t) => {
      if (this._openMenu === null) return;
      t.composedPath().some(
        (n) => n instanceof HTMLElement && (n.classList?.contains("menu") || n.classList?.contains("overflow"))
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._busy || (this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog());
    }, this._onDialogSave = async (t) => {
      if (!this.hass || this._busy) return;
      const { name: e, description: i } = t.detail, n = this._mode, r = this._target;
      this._busy = !0, this._error = null;
      try {
        if (n === "create")
          await Jc(this.hass, { name: e, description: i });
        else if (n === "clone" && r)
          await Qc(this.hass, { source: r, target: e, description: i });
        else if (n === "rename" && r)
          e !== r && await Xc(this.hass, { old: r, new: e });
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
      const t = this._target;
      this._busy = !0, this._error = null;
      try {
        await tu(this.hass, { name: t }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
      !this._menuOpenedByKeyboard || this._openMenu === null || this.shadowRoot?.querySelector('.menu button[role="menuitem"]:not([disabled])')?.focus();
    }), t.has("_mode") && this._mode === "confirm-delete" && requestAnimationFrame(() => {
      this.shadowRoot?.querySelector(".confirm-delete")?.focus();
    });
  }
  _readState() {
    if (!this.hass) return null;
    const t = Kl(this.hass);
    if (t === null) return null;
    const e = this.hass.states[t];
    if (!e) return null;
    const i = e.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], r = typeof e.state == "string" ? e.state : "", s = e.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", d = e.attributes.descriptions, p = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [b, g] of Object.entries(d))
        typeof g == "string" && (p[b] = g);
    return { options: n, active: r, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(t) {
    this.hass && Zc(this.hass, { profile: t });
  }
  _toggleMenu(t, e) {
    e.stopPropagation(), this._menuOpenedByKeyboard = this._openMenu !== t && e instanceof MouseEvent && e.detail === 0, this._openMenu = this._openMenu === t ? null : t;
  }
  /** Keyboard navigation inside the open overflow menu — Escape closes,
   *  ArrowUp/ArrowDown moves focus, satisfying ARIA's `role="menu"` contract. */
  _onMenuKeydown(t, e) {
    if (t.key === "Tab") {
      this._openMenu = null, this._menuOpenedByKeyboard = !1;
      return;
    }
    if (t.key === "Escape") {
      t.preventDefault(), t.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1, requestAnimationFrame(() => {
        const l = this.shadowRoot?.querySelectorAll("li[data-profile]");
        (l ? Array.from(l).find((d) => d.dataset.profile === e) : void 0)?.querySelector(".overflow")?.focus();
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
    const n = this.shadowRoot?.activeElement, r = n ? i.indexOf(n) : -1;
    (t.key === "ArrowDown" ? i[(r + 1) % i.length] : i[(r - 1 + i.length) % i.length]).focus();
  }
  _onNew() {
    this._error = null, this._target = null, this._dialogTrigger = "__new__", this._mode = "create";
  }
  _onClone(t) {
    this._error = null, this._openMenu = null, this._target = t, this._dialogTrigger = t, this._mode = "clone";
  }
  _onRename(t) {
    this._error = null, this._openMenu = null, this._target = t, this._dialogTrigger = t, this._mode = "rename";
  }
  _onDelete(t) {
    this._error = null, this._openMenu = null, this._target = t, this._dialogTrigger = t, this._mode = "confirm-delete";
  }
  /** Restore focus to the element that opened the dialog. Called when
   *  the dialog dismisses (cancel or successful save). Best-effort —
   *  silently no-ops if the trigger element has been removed from the
   *  DOM (e.g. delete succeeded and the row is gone). */
  _restoreFocusAfterDialog() {
    const t = this._dialogTrigger;
    this._dialogTrigger = null, t !== null && requestAnimationFrame(() => {
      if (t === "__new__") {
        this.shadowRoot?.querySelector(".new-profile")?.focus();
        return;
      }
      const e = this.shadowRoot?.querySelectorAll("li[data-profile]");
      (e ? Array.from(e).find((n) => n.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
    });
  }
  render() {
    if (!this.hass) return G;
    const t = this._readState();
    if (t === null)
      return $`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: e, active: i, defaultProfile: n, descriptions: r, crudAvailable: s } = t;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return $`
        ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
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
      return $`
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
            ${l ? $`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
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
    return e.length === 0 ? $`<div class="empty">No profiles configured.</div>` : $`
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? $`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : G}
      <ul aria-label="Profiles">
        ${e.map(
      (l, h) => this._renderRow(l, h, i, n, r, s)
    )}
      </ul>
      ${s ? G : $`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(t, e, i, n, r, s) {
    const l = t === i, h = t === n, d = r[t] ?? "", p = `cb-profile-menu-${e}`;
    return $`
      <li
        data-profile=${t}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : G}
        @click=${() => this._onSelect(t)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(t));
    }}
      >
        <span class="label">
          <span class="name">${t}</span>
          ${d ? $`<span class="description">${d}</span>` : G}
        </span>
        ${l ? $`<span class="badge">Active</span>` : G}
        ${s ? $`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${t}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === t ? p : G}
              aria-expanded=${this._openMenu === t ? "true" : "false"}
              @click=${(b) => this._toggleMenu(t, b)}
            >
              ⋮
            </button>` : G}
        ${this._openMenu === t ? $`
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
            ` : G}
      </li>
    `;
  }
};
ti.styles = [
  Yt,
  Vt`
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
Ii([
  F({ attribute: !1 })
], ti.prototype, "hass", 2);
Ii([
  rt()
], ti.prototype, "_mode", 2);
Ii([
  rt()
], ti.prototype, "_target", 2);
Ii([
  rt()
], ti.prototype, "_openMenu", 2);
Ii([
  rt()
], ti.prototype, "_error", 2);
Ii([
  rt()
], ti.prototype, "_busy", 2);
ti = Ii([
  Gt("comfort-band-profiles-tab")
], ti);
const du = !0, Ot = "u-", fu = "uplot", pu = Ot + "hz", gu = Ot + "vt", mu = Ot + "title", bu = Ot + "wrap", vu = Ot + "under", _u = Ot + "over", yu = Ot + "axis", Oi = Ot + "off", wu = Ot + "select", xu = Ot + "cursor-x", $u = Ot + "cursor-y", Su = Ot + "cursor-pt", ku = Ot + "legend", Au = Ot + "live", Eu = Ot + "inline", Pu = Ot + "series", Tu = Ot + "marker", Ks = Ot + "label", Cu = Ot + "value", Un = "width", jn = "height", Bn = "top", qs = "bottom", cn = "left", uo = "right", Vo = "#000", Zs = Vo + "0", ho = "mousemove", Js = "mousedown", fo = "mouseup", Qs = "mouseenter", Xs = "mouseleave", tl = "dblclick", Mu = "resize", Du = "scroll", el = "change", Sr = "dppxchange", Wo = "--", Sn = typeof window < "u", So = Sn ? document : null, fn = Sn ? window : null, zu = Sn ? navigator : null;
let ct, pr;
function ko() {
  let t = devicePixelRatio;
  ct != t && (ct = t, pr && Eo(el, pr, ko), pr = matchMedia(`(min-resolution: ${ct - 1e-3}dppx) and (max-resolution: ${ct + 1e-3}dppx)`), Hi(el, pr, ko), fn.dispatchEvent(new CustomEvent(Sr)));
}
function ae(t, e) {
  if (e != null) {
    let i = t.classList;
    !i.contains(e) && i.add(e);
  }
}
function Ao(t, e) {
  let i = t.classList;
  i.contains(e) && i.remove(e);
}
function yt(t, e, i) {
  t.style[e] = i + "px";
}
function Ee(t, e, i, n) {
  let r = So.createElement(t);
  return e != null && ae(r, e), i?.insertBefore(r, n), r;
}
function ve(t, e) {
  return Ee("div", t, e);
}
const il = /* @__PURE__ */ new WeakMap();
function Be(t, e, i, n, r) {
  let s = "translate(" + e + "px," + i + "px)", l = il.get(t);
  s != l && (t.style.transform = s, il.set(t, s), e < 0 || i < 0 || e > n || i > r ? ae(t, Oi) : Ao(t, Oi));
}
const nl = /* @__PURE__ */ new WeakMap();
function rl(t, e, i) {
  let n = e + i, r = nl.get(t);
  n != r && (nl.set(t, n), t.style.background = e, t.style.borderColor = i);
}
const ol = /* @__PURE__ */ new WeakMap();
function sl(t, e, i, n) {
  let r = e + "" + i, s = ol.get(t);
  r != s && (ol.set(t, r), t.style.height = i + "px", t.style.width = e + "px", t.style.marginLeft = n ? -e / 2 + "px" : 0, t.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Go = { passive: !0 }, Ou = { ...Go, capture: !0 };
function Hi(t, e, i, n) {
  e.addEventListener(t, i, n ? Ou : Go);
}
function Eo(t, e, i, n) {
  e.removeEventListener(t, i, Go);
}
Sn && ko();
function Te(t, e, i, n) {
  let r;
  i = i || 0, n = n || e.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ce((i + n) / 2), e[r] < t ? i = r : n = r;
  return t - e[i] <= e[n] - t ? i : n;
}
function Zl(t) {
  return (i, n, r) => {
    let s = -1, l = -1;
    for (let h = n; h <= r; h++)
      if (t(i[h])) {
        s = h;
        break;
      }
    for (let h = r; h >= n; h--)
      if (t(i[h])) {
        l = h;
        break;
      }
    return [s, l];
  };
}
const Jl = (t) => t != null, Ql = (t) => t != null && t > 0, Tr = Zl(Jl), Nu = Zl(Ql);
function Hu(t, e, i, n = 0, r = !1) {
  let s = r ? Nu : Tr, l = r ? Ql : Jl;
  [e, i] = s(t, e, i);
  let h = t[e], d = t[e];
  if (e > -1)
    if (n == 1)
      h = t[e], d = t[i];
    else if (n == -1)
      h = t[i], d = t[e];
    else
      for (let p = e; p <= i; p++) {
        let b = t[p];
        l(b) && (b < h ? h = b : b > d && (d = b));
      }
  return [h ?? pt, d ?? -pt];
}
function Cr(t, e, i, n) {
  let r = cl(t), s = cl(e);
  t == e && (r == -1 ? (t *= i, e /= i) : (t /= i, e *= i));
  let l = i == 10 ? Qe : Xl, h = r == 1 ? ce : _e, d = s == 1 ? _e : ce, p = h(l(Dt(t))), b = d(l(Dt(e))), g = bn(i, p), v = bn(i, b);
  return i == 10 && (p < 0 && (g = gt(g, -p)), b < 0 && (v = gt(v, -b))), n || i == 2 ? (t = g * r, e = v * s) : (t = na(t, g), e = Mr(e, v)), [t, e];
}
function Yo(t, e, i, n) {
  let r = Cr(t, e, i, n);
  return t == 0 && (r[0] = 0), e == 0 && (r[1] = 0), r;
}
const Ko = 0.1, ll = {
  mode: 3,
  pad: Ko
}, Gn = {
  pad: 0,
  soft: null,
  mode: 0
}, Lu = {
  min: Gn,
  max: Gn
};
function kr(t, e, i, n) {
  return Dr(i) ? al(t, e, i) : (Gn.pad = i, Gn.soft = n ? 0 : null, Gn.mode = n ? 3 : 0, al(t, e, Lu));
}
function lt(t, e) {
  return t ?? e;
}
function Ru(t, e, i) {
  for (e = lt(e, 0), i = lt(i, t.length - 1); e <= i; ) {
    if (t[e] != null)
      return !0;
    e++;
  }
  return !1;
}
function al(t, e, i) {
  let n = i.min, r = i.max, s = lt(n.pad, 0), l = lt(r.pad, 0), h = lt(n.hard, -pt), d = lt(r.hard, pt), p = lt(n.soft, pt), b = lt(r.soft, -pt), g = lt(n.mode, 0), v = lt(r.mode, 0), S = e - t, E = Qe(S), H = Xt(Dt(t), Dt(e)), I = Qe(H), j = Dt(I - E);
  (S < 1e-24 || j > 10) && (S = 0, (t == 0 || e == 0) && (S = 1e-24, g == 2 && p != pt && (s = 0), v == 2 && b != -pt && (l = 0)));
  let w = S || H || 1e3, B = Qe(w), k = bn(10, ce(B)), J = w * (S == 0 ? t == 0 ? 0.1 : 1 : s), D = gt(na(t - J, k / 10), 24), Q = t >= p && (g == 1 || g == 3 && D <= p || g == 2 && D >= p) ? p : pt, K = Xt(h, D < Q && t >= Q ? Q : Ce(Q, D)), et = w * (S == 0 ? e == 0 ? 0.1 : 1 : l), Y = gt(Mr(e + et, k / 10), 24), A = e <= b && (v == 1 || v == 3 && Y >= b || v == 2 && Y <= b) ? b : -pt, Z = Ce(d, Y > A && e <= A ? A : Xt(A, Y));
  return K == Z && K == 0 && (Z = 100), [K, Z];
}
const Fu = new Intl.NumberFormat(Sn ? zu.language : "en-US"), qo = (t) => Fu.format(t), ue = Math, _r = ue.PI, Dt = ue.abs, ce = ue.floor, Mt = ue.round, _e = ue.ceil, Ce = ue.min, Xt = ue.max, bn = ue.pow, cl = ue.sign, Qe = ue.log10, Xl = ue.log2, Bu = (t, e = 1) => ue.sinh(t) * e, po = (t, e = 1) => ue.asinh(t / e), pt = 1 / 0;
function ul(t) {
  return (Qe((t ^ t >> 31) - (t >> 31)) | 0) + 1;
}
function Po(t, e, i) {
  return Ce(Xt(t, e), i);
}
function ta(t) {
  return typeof t == "function";
}
function it(t) {
  return ta(t) ? t : () => t;
}
const Iu = () => {
}, ea = (t) => t, ia = (t, e) => e, Uu = (t) => null, hl = (t) => !0, dl = (t, e) => t == e, ju = /\.\d*?(?=9{6,}|0{6,})/gm, Fi = (t) => {
  if (oa(t) || fi.has(t))
    return t;
  const e = `${t}`, i = e.match(ju);
  if (i == null)
    return t;
  let n = i[0].length - 1;
  if (e.indexOf("e-") != -1) {
    let [r, s] = e.split("e");
    return +`${Fi(r)}e${s}`;
  }
  return gt(t, n);
};
function Di(t, e) {
  return Fi(gt(Fi(t / e)) * e);
}
function Mr(t, e) {
  return Fi(_e(Fi(t / e)) * e);
}
function na(t, e) {
  return Fi(ce(Fi(t / e)) * e);
}
function gt(t, e = 0) {
  if (oa(t))
    return t;
  let i = 10 ** e, n = t * i * (1 + Number.EPSILON);
  return Mt(n) / i;
}
const fi = /* @__PURE__ */ new Map();
function ra(t) {
  return (("" + t).split(".")[1] || "").length;
}
function Qn(t, e, i, n) {
  let r = [], s = n.map(ra);
  for (let l = e; l < i; l++) {
    let h = Dt(l), d = gt(bn(t, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = t == 10 ? +`${n[p]}e${l}` : n[p] * d, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), v = t == 10 ? b : gt(b, g);
      r.push(v), fi.set(v, g);
    }
  }
  return r;
}
const Yn = {}, Zo = [], vn = [null, null], ci = Array.isArray, oa = Number.isInteger, Vu = (t) => t === void 0;
function fl(t) {
  return typeof t == "string";
}
function Dr(t) {
  let e = !1;
  if (t != null) {
    let i = t.constructor;
    e = i == null || i == Object;
  }
  return e;
}
function Wu(t) {
  return t != null && typeof t == "object";
}
const Gu = Object.getPrototypeOf(Uint8Array), sa = "__proto__";
function _n(t, e = Dr) {
  let i;
  if (ci(t)) {
    let n = t.find((r) => r != null);
    if (ci(n) || e(n)) {
      i = Array(t.length);
      for (let r = 0; r < t.length; r++)
        i[r] = _n(t[r], e);
    } else
      i = t.slice();
  } else if (t instanceof Gu)
    i = t.slice();
  else if (e(t)) {
    i = {};
    for (let n in t)
      n != sa && (i[n] = _n(t[n], e));
  } else
    i = t;
  return i;
}
function Pt(t) {
  let e = arguments;
  for (let i = 1; i < e.length; i++) {
    let n = e[i];
    for (let r in n)
      r != sa && (Dr(t[r]) ? Pt(t[r], _n(n[r])) : t[r] = _n(n[r]));
  }
  return t;
}
const Yu = 0, Ku = 1, qu = 2;
function Zu(t, e, i) {
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
function Ju(t, e) {
  if (th(t)) {
    let l = t[0].slice();
    for (let h = 1; h < t.length; h++)
      l.push(...t[h].slice(1));
    return eh(l[0]) || (l = Xu(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < t.length; l++) {
    let d = t[l][0], p = d.length;
    for (let b = 0; b < p; b++)
      i.add(d[b]);
  }
  let n = [Array.from(i).sort((l, h) => l - h)], r = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < r; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < t.length; l++) {
    let h = t[l], d = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], g = Array(r).fill(void 0), v = e ? e[l][p] : Ku, S = [];
      for (let E = 0; E < b.length; E++) {
        let H = b[E], I = s.get(d[E]);
        H === null ? v != Yu && (g[I] = H, v == qu && S.push(I)) : g[I] = H;
      }
      Zu(g, S, r), n.push(g);
    }
  }
  return n;
}
const Qu = typeof queueMicrotask > "u" ? (t) => Promise.resolve().then(t) : queueMicrotask;
function Xu(t) {
  let e = t[0], i = e.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => e[s] - e[l]);
  let r = [];
  for (let s = 0; s < t.length; s++) {
    let l = t[s], h = Array(i);
    for (let d = 0; d < i; d++)
      h[d] = l[n[d]];
    r.push(h);
  }
  return r;
}
function th(t) {
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
function eh(t, e = 100) {
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
  const s = Xt(1, ce((r - n + 1) / e));
  for (let l = t[n], h = n + s; h <= r; h += s) {
    const d = t[h];
    if (d != null) {
      if (d <= l)
        return !1;
      l = d;
    }
  }
  return !0;
}
const la = [
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
], aa = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function ca(t) {
  return t.slice(0, 3);
}
const ih = aa.map(ca), nh = la.map(ca), rh = {
  MMMM: la,
  MMM: nh,
  WWWW: aa,
  WWW: ih
};
function In(t) {
  return (t < 10 ? "0" : "") + t;
}
function oh(t) {
  return (t < 10 ? "00" : t < 100 ? "0" : "") + t;
}
const sh = {
  // 2019
  YYYY: (t) => t.getFullYear(),
  // 19
  YY: (t) => (t.getFullYear() + "").slice(2),
  // July
  MMMM: (t, e) => e.MMMM[t.getMonth()],
  // Jul
  MMM: (t, e) => e.MMM[t.getMonth()],
  // 07
  MM: (t) => In(t.getMonth() + 1),
  // 7
  M: (t) => t.getMonth() + 1,
  // 09
  DD: (t) => In(t.getDate()),
  // 9
  D: (t) => t.getDate(),
  // Monday
  WWWW: (t, e) => e.WWWW[t.getDay()],
  // Mon
  WWW: (t, e) => e.WWW[t.getDay()],
  // 03
  HH: (t) => In(t.getHours()),
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
  mm: (t) => In(t.getMinutes()),
  // 9
  m: (t) => t.getMinutes(),
  // 09
  ss: (t) => In(t.getSeconds()),
  // 9
  s: (t) => t.getSeconds(),
  // 374
  fff: (t) => oh(t.getMilliseconds())
};
function Jo(t, e) {
  e = e || rh;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(t); )
    i.push(r[0][0] == "{" ? sh[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, e);
    return l;
  };
}
const lh = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function ah(t, e) {
  let i;
  return e == "UTC" || e == "Etc/UTC" ? i = new Date(+t + t.getTimezoneOffset() * 6e4) : e == lh ? i = t : (i = new Date(t.toLocaleString("en-US", { timeZone: e })), i.setMilliseconds(t.getMilliseconds())), i;
}
const ua = (t) => t % 1 == 0, Ar = [1, 2, 2.5, 5], ch = Qn(10, -32, 0, Ar), ha = Qn(10, 0, 32, Ar), uh = ha.filter(ua), zi = ch.concat(ha), Qo = `
`, da = "{YYYY}", pl = Qo + da, fa = "{M}/{D}", Vn = Qo + fa, gr = Vn + "/{YY}", pa = "{aa}", hh = "{h}:{mm}", dn = hh + pa, gl = Qo + dn, ml = ":{ss}", ht = null;
function ga(t) {
  let e = t * 1e3, i = e * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (t == 1 ? Qn(10, 0, 3, Ar).filter(ua) : Qn(10, -3, 0, Ar)).concat([
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
    [l, da, ht, ht, ht, ht, ht, ht, 1],
    [r * 28, "{MMM}", pl, ht, ht, ht, ht, ht, 1],
    [r, fa, pl, ht, ht, ht, ht, ht, 1],
    [n, "{h}" + pa, gr, ht, Vn, ht, ht, ht, 1],
    [i, dn, gr, ht, Vn, ht, ht, ht, 1],
    [e, ml, gr + " " + dn, ht, Vn + " " + dn, ht, gl, ht, 1],
    [t, ml + ".{fff}", gr + " " + dn, ht, Vn + " " + dn, ht, gl, ht, 1]
  ];
  function b(g) {
    return (v, S, E, H, I, j) => {
      let w = [], B = I >= l, k = I >= s && I < l, J = g(E), D = gt(J * t, 3), Q = go(J.getFullYear(), B ? 0 : J.getMonth(), k || B ? 1 : J.getDate()), K = gt(Q * t, 3);
      if (k || B) {
        let et = k ? I / s : 0, Y = B ? I / l : 0, A = D == K ? D : gt(go(Q.getFullYear() + Y, Q.getMonth() + et, 1) * t, 3), Z = new Date(Mt(A / t)), z = Z.getFullYear(), V = Z.getMonth();
        for (let R = 0; A <= H; R++) {
          let nt = go(z + Y * R, V + et * R, 1), L = nt - g(gt(nt * t, 3));
          A = gt((+nt + L) * t, 3), A <= H && w.push(A);
        }
      } else {
        let et = I >= r ? r : I, Y = ce(E) - ce(D), A = K + Y + Mr(D - K, et);
        w.push(A);
        let Z = g(A), z = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, V = I / n, R = v.axes[S]._space, nt = j / R;
        for (; A = gt(A + I, t == 1 ? 0 : 3), !(A > H); )
          if (V > 1) {
            let L = ce(gt(z + V, 6)) % 24, ot = g(A).getHours() - L;
            ot > 1 && (ot = -1), A -= ot * n, z = (z + V) % 24;
            let dt = w[w.length - 1];
            gt((A - dt) / I, 3) * nt >= 0.7 && w.push(A);
          } else
            w.push(A);
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
const [dh, fh, ph] = ga(1), [gh, mh, bh] = ga(1e-3);
Qn(2, -53, 53, [1]);
function bl(t, e) {
  return t.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : e(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function vl(t, e) {
  return (i, n, r, s, l) => {
    let h = e.find((E) => l >= E[0]) || e[e.length - 1], d, p, b, g, v, S;
    return n.map((E) => {
      let H = t(E), I = H.getFullYear(), j = H.getMonth(), w = H.getDate(), B = H.getHours(), k = H.getMinutes(), J = H.getSeconds(), D = I != d && h[2] || j != p && h[3] || w != b && h[4] || B != g && h[5] || k != v && h[6] || J != S && h[7] || h[1];
      return d = I, p = j, b = w, g = B, v = k, S = J, D(H);
    });
  };
}
function vh(t, e) {
  let i = Jo(e);
  return (n, r, s, l, h) => r.map((d) => i(t(d)));
}
function go(t, e, i) {
  return new Date(t, e, i);
}
function _l(t, e) {
  return e(t);
}
const _h = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function yl(t, e) {
  return (i, n, r, s) => s == null ? Wo : e(t(n));
}
function yh(t, e) {
  let i = t.series[e];
  return i.width ? i.stroke(t, e) : i.points.width ? i.points.stroke(t, e) : null;
}
function wh(t, e) {
  return t.series[e].fill(t, e);
}
const xh = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Iu,
  markers: {
    show: !0,
    width: 2,
    stroke: yh,
    fill: wh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function $h(t, e) {
  let i = t.cursor.points, n = ve(), r = i.size(t, e);
  yt(n, Un, r), yt(n, jn, r);
  let s = r / -2;
  yt(n, "marginLeft", s), yt(n, "marginTop", s);
  let l = i.width(t, e, r);
  return l && yt(n, "borderWidth", l), n;
}
function Sh(t, e) {
  let i = t.series[e].points;
  return i._fill || i._stroke;
}
function kh(t, e) {
  let i = t.series[e].points;
  return i._stroke || i._fill;
}
function Ah(t, e) {
  return t.series[e].points.size;
}
const mo = [0, 0];
function Eh(t, e, i) {
  return mo[0] = e, mo[1] = i, mo;
}
function mr(t, e, i, n = !0) {
  return (r) => {
    r.button == 0 && (!n || r.target == e) && i(r);
  };
}
function bo(t, e, i, n = !0) {
  return (r) => {
    (!n || r.target == e) && i(r);
  };
}
const Ph = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: Eh,
  points: {
    one: !1,
    show: $h,
    size: Ah,
    width: 0,
    stroke: kh,
    fill: Sh
  },
  bind: {
    mousedown: mr,
    mouseup: mr,
    click: mr,
    // legend clicks, not .u-over clicks
    dblclick: mr,
    mousemove: bo,
    mouseleave: bo,
    mouseenter: bo
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
}, ma = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Xo = Pt({}, ma, {
  filter: ia
}), ba = Pt({}, Xo, {
  size: 10
}), va = Pt({}, ma, {
  show: !1
}), ts = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', _a = "bold " + ts, ya = 1.5, wl = {
  show: !0,
  scale: "x",
  stroke: Vo,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: _a,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Xo,
  ticks: ba,
  border: va,
  font: ts,
  lineGap: ya,
  rotate: 0
}, Th = "Value", Ch = "Time", xl = {
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
function Mh(t, e, i, n, r) {
  return e.map((s) => s == null ? "" : qo(s));
}
function Dh(t, e, i, n, r, s, l) {
  let h = [], d = fi.get(r) || 0;
  i = l ? i : gt(Mr(i, r), d);
  for (let p = i; p <= n; p = gt(p + r, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function To(t, e, i, n, r, s, l) {
  const h = [], d = t.scales[t.axes[e].scale].log, p = d == 10 ? Qe : Xl, b = ce(p(i));
  r = bn(d, b), d == 10 && (r = zi[Te(r, zi)]);
  let g = i, v = r * d;
  d == 10 && (v = zi[Te(v, zi)]);
  do
    h.push(g), g = g + r, d == 10 && !fi.has(g) && (g = gt(g, fi.get(r))), g >= v && (r = g, v = r * d, d == 10 && (v = zi[Te(v, zi)]));
  while (g <= n);
  return h;
}
function zh(t, e, i, n, r, s, l) {
  let d = t.scales[t.axes[e].scale].asinh, p = n > d ? To(t, e, Xt(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? To(t, e, Xt(d, -n), -i, r) : [d]).reverse().map((v) => -v).concat(b, p);
}
const wa = /./, Oh = /[12357]/, Nh = /[125]/, $l = /1/, Co = (t, e, i, n) => t.map((r, s) => e == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function Hh(t, e, i, n, r) {
  let s = t.axes[i], l = s.scale, h = t.scales[l], d = t.valToPos, p = s._space, b = d(10, l), g = d(9, l) - b >= p ? wa : d(7, l) - b >= p ? Oh : d(5, l) - b >= p ? Nh : $l;
  if (g == $l) {
    let v = Dt(d(1, l) - b);
    if (v < p)
      return Co(e.slice().reverse(), h.distr, g, _e(p / v)).reverse();
  }
  return Co(e, h.distr, g, 1);
}
function Lh(t, e, i, n, r) {
  let s = t.axes[i], l = s.scale, h = s._space, d = t.valToPos, p = Dt(d(1, l) - d(2, l));
  return p < h ? Co(e.slice().reverse(), 3, wa, _e(h / p)).reverse() : e;
}
function Rh(t, e, i, n) {
  return n == null ? Wo : e == null ? "" : qo(e);
}
const Sl = {
  show: !0,
  scale: "y",
  stroke: Vo,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: _a,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Xo,
  ticks: ba,
  border: va,
  font: ts,
  lineGap: ya,
  rotate: 0
};
function Fh(t, e) {
  let i = 3 + (t || 1) * 2;
  return gt(i * e, 3);
}
function Bh(t, e) {
  let { scale: i, idxs: n } = t.series[0], r = t._data[0], s = t.valToPos(r[n[0]], i, !0), l = t.valToPos(r[n[1]], i, !0), h = Dt(l - s), d = t.series[e], p = h / (d.points.space * ct);
  return n[1] - n[0] <= p;
}
const kl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pt,
  max: -pt
}, xa = (t, e, i, n, r) => r, Al = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: xa,
  alpha: 1,
  facets: [
    Pt({}, kl, { scale: "x" }),
    Pt({}, kl, { scale: "y" })
  ]
}, El = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: xa,
  alpha: 1,
  points: {
    show: Bh,
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
function Ih(t, e, i, n, r) {
  return i / 10;
}
const $a = {
  time: du,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Uh = Pt({}, $a, {
  time: !1,
  ori: 1
}), Pl = {};
function Sa(t, e) {
  let i = Pl[t];
  return i || (i = {
    key: t,
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
  }, t != null && (Pl[t] = i)), i;
}
const yn = 1, Mo = 2;
function Ui(t, e, i) {
  const n = t.mode, r = t.series[e], s = n == 2 ? t._data[e] : t._data, l = t.scales, h = t.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[e], b = n == 2 ? l[r.facets[0].scale] : l[t.series[0].scale], g = n == 2 ? l[r.facets[1].scale] : l[r.scale], v = h.left, S = h.top, E = h.width, H = h.height, I = t.valToPosH, j = t.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    p,
    b,
    g,
    I,
    j,
    v,
    S,
    E,
    H,
    Or,
    kn,
    Hr,
    Aa,
    Pa
  ) : i(
    r,
    d,
    p,
    b,
    g,
    j,
    I,
    S,
    v,
    H,
    E,
    Nr,
    An,
    ns,
    Ea,
    Ta
  );
}
function es(t, e) {
  let i = 0, n = 0, r = lt(t.bands, Zo);
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
function jh(t, e, i, n, r) {
  let s = t.mode, l = t.series[e], h = s == 2 ? l.facets[1].scale : l.scale, d = t.scales[h];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Xe(t, e, i, n, r, s) {
  return Ui(t, e, (l, h, d, p, b, g, v, S, E, H, I) => {
    let j = l.pxRound;
    const w = p.dir * (p.ori == 0 ? 1 : -1), B = p.ori == 0 ? kn : An;
    let k, J;
    w == 1 ? (k = i, J = n) : (k = n, J = i);
    let D = j(g(h[k], p, H, S)), Q = j(v(d[k], b, I, E)), K = j(g(h[J], p, H, S)), et = j(v(s == 1 ? b.max : b.min, b, I, E)), Y = new Path2D(r);
    return B(Y, K, et), B(Y, D, et), B(Y, D, Q), Y;
  });
}
function zr(t, e, i, n, r, s) {
  let l = null;
  if (t.length > 0) {
    l = new Path2D();
    const h = e == 0 ? Hr : ns;
    let d = i;
    for (let g = 0; g < t.length; g++) {
      let v = t[g];
      if (v[1] > v[0]) {
        let S = v[0] - d;
        S > 0 && h(l, d, n, S, n + s), d = v[1];
      }
    }
    let p = i + r - d, b = 10;
    p > 0 && h(l, d, n - b / 2, p, n + s + b);
  }
  return l;
}
function Vh(t, e, i) {
  let n = t[t.length - 1];
  n && n[0] == e ? n[1] = i : t.push([e, i]);
}
function is(t, e, i, n, r, s, l) {
  let h = [], d = t.length;
  for (let p = r == 1 ? i : n; p >= i && p <= n; p += r)
    if (e[p] === null) {
      let g = p, v = p;
      if (r == 1)
        for (; ++p <= n && e[p] === null; )
          v = p;
      else
        for (; --p >= i && e[p] === null; )
          v = p;
      let S = s(t[g]), E = v == g ? S : s(t[v]), H = g - r;
      S = l <= 0 && H >= 0 && H < d ? s(t[H]) : S;
      let j = v + r;
      E = l >= 0 && j >= 0 && j < d ? s(t[j]) : E, E >= S && h.push([S, E]);
    }
  return h;
}
function Tl(t) {
  return t == 0 ? ea : t == 1 ? Mt : (e) => Di(e, t);
}
function ka(t) {
  let e = t == 0 ? Or : Nr, i = t == 0 ? (r, s, l, h, d, p) => {
    r.arcTo(s, l, h, d, p);
  } : (r, s, l, h, d, p) => {
    r.arcTo(l, s, d, h, p);
  }, n = t == 0 ? (r, s, l, h, d) => {
    r.rect(s, l, h, d);
  } : (r, s, l, h, d) => {
    r.rect(l, s, d, h);
  };
  return (r, s, l, h, d, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(r, s, l, h, d) : (p = Ce(p, h / 2, d / 2), b = Ce(b, h / 2, d / 2), e(r, s + p, l), i(r, s + h, l, s + h, l + d, p), i(r, s + h, l + d, s, l + d, b), i(r, s, l + d, s, l, b), i(r, s, l, s + h, l, p), r.closePath());
  };
}
const Or = (t, e, i) => {
  t.moveTo(e, i);
}, Nr = (t, e, i) => {
  t.moveTo(i, e);
}, kn = (t, e, i) => {
  t.lineTo(e, i);
}, An = (t, e, i) => {
  t.lineTo(i, e);
}, Hr = ka(0), ns = ka(1), Aa = (t, e, i, n, r, s) => {
  t.arc(e, i, n, r, s);
}, Ea = (t, e, i, n, r, s) => {
  t.arc(i, e, n, r, s);
}, Pa = (t, e, i, n, r, s, l) => {
  t.bezierCurveTo(e, i, n, r, s, l);
}, Ta = (t, e, i, n, r, s, l) => {
  t.bezierCurveTo(i, e, r, n, l, s);
};
function Ca(t) {
  return (e, i, n, r, s) => Ui(e, i, (l, h, d, p, b, g, v, S, E, H, I) => {
    let { pxRound: j, points: w } = l, B, k;
    p.ori == 0 ? (B = Or, k = Aa) : (B = Nr, k = Ea);
    const J = gt(w.width * ct, 3);
    let D = (w.size - w.width) / 2 * ct, Q = gt(D * 2, 3), K = new Path2D(), et = new Path2D(), { left: Y, top: A, width: Z, height: z } = e.bbox;
    Hr(
      et,
      Y - Q,
      A - Q,
      Z + Q * 2,
      z + Q * 2
    );
    const V = (R) => {
      if (d[R] != null) {
        let nt = j(g(h[R], p, H, S)), L = j(v(d[R], b, I, E));
        B(K, nt + D, L), k(K, nt, L, D, 0, _r * 2);
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
      clip: et,
      flags: yn | Mo
    };
  });
}
function Ma(t) {
  return (e, i, n, r, s, l) => {
    n != r && (s != n && l != n && t(e, i, n), s != r && l != r && t(e, i, r), t(e, i, l));
  };
}
const Wh = Ma(kn), Gh = Ma(An);
function Da(t) {
  const e = lt(t?.alignGaps, 0);
  return (i, n, r, s) => Ui(i, n, (l, h, d, p, b, g, v, S, E, H, I) => {
    [r, s] = Tr(d, r, s);
    let j = l.pxRound, w = (z) => j(g(z, p, H, S)), B = (z) => j(v(z, b, I, E)), k, J;
    p.ori == 0 ? (k = kn, J = Wh) : (k = An, J = Gh);
    const D = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: yn }, K = Q.stroke;
    let et = !1;
    if (s - r >= H * 4) {
      let z = (O) => i.posToVal(O, p.key, !0), V = null, R = null, nt, L, te, wt = w(h[D == 1 ? r : s]), ot = w(h[r]), dt = w(h[s]), X = z(D == 1 ? ot + 1 : dt - 1);
      for (let O = D == 1 ? r : s; O >= r && O <= s; O += D) {
        let Tt = h[O], xt = (D == 1 ? Tt < X : Tt > X) ? wt : w(Tt), ut = d[O];
        xt == wt ? ut != null ? (L = ut, V == null ? (k(K, xt, B(L)), nt = V = R = L) : L < V ? V = L : L > R && (R = L)) : ut === null && (et = !0) : (V != null && J(K, wt, B(V), B(R), B(nt), B(L)), ut != null ? (L = ut, k(K, xt, B(L)), V = R = nt = L) : (V = R = null, ut === null && (et = !0)), wt = xt, X = z(wt + D));
      }
      V != null && V != R && te != wt && J(K, wt, B(V), B(R), B(nt), B(L));
    } else
      for (let z = D == 1 ? r : s; z >= r && z <= s; z += D) {
        let V = d[z];
        V === null ? et = !0 : V != null && k(K, w(h[z]), B(V));
      }
    let [A, Z] = es(i, n);
    if (l.fill != null || A != 0) {
      let z = Q.fill = new Path2D(K), V = l.fillTo(i, n, l.min, l.max, A), R = B(V), nt = w(h[r]), L = w(h[s]);
      D == -1 && ([L, nt] = [nt, L]), k(z, L, R), k(z, nt, R);
    }
    if (!l.spanGaps) {
      let z = [];
      et && z.push(...is(h, d, r, s, D, w, e)), Q.gaps = z = l.gaps(i, n, r, s, z), Q.clip = zr(z, p.ori, S, E, H, I);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      Xe(i, n, r, s, K, -1),
      Xe(i, n, r, s, K, 1)
    ] : Xe(i, n, r, s, K, Z)), Q;
  });
}
function Yh(t) {
  const e = lt(t.align, 1), i = lt(t.ascDesc, !1), n = lt(t.alignGaps, 0), r = lt(t.extend, !1);
  return (s, l, h, d) => Ui(s, l, (p, b, g, v, S, E, H, I, j, w, B) => {
    [h, d] = Tr(g, h, d);
    let k = p.pxRound, { left: J, width: D } = s.bbox, Q = (ot) => k(E(ot, v, w, I)), K = (ot) => k(H(ot, S, B, j)), et = v.ori == 0 ? kn : An;
    const Y = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: yn }, A = Y.stroke, Z = v.dir * (v.ori == 0 ? 1 : -1);
    let z = K(g[Z == 1 ? h : d]), V = Q(b[Z == 1 ? h : d]), R = V, nt = V;
    r && e == -1 && (nt = J, et(A, nt, z)), et(A, V, z);
    for (let ot = Z == 1 ? h : d; ot >= h && ot <= d; ot += Z) {
      let dt = g[ot];
      if (dt == null)
        continue;
      let X = Q(b[ot]), O = K(dt);
      e == 1 ? et(A, X, z) : et(A, R, O), et(A, X, O), z = O, R = X;
    }
    let L = R;
    r && e == 1 && (L = J + D, et(A, L, z));
    let [te, wt] = es(s, l);
    if (p.fill != null || te != 0) {
      let ot = Y.fill = new Path2D(A), dt = p.fillTo(s, l, p.min, p.max, te), X = K(dt);
      et(ot, L, X), et(ot, nt, X);
    }
    if (!p.spanGaps) {
      let ot = [];
      ot.push(...is(b, g, h, d, Z, Q, n));
      let dt = p.width * ct / 2, X = i || e == 1 ? dt : -dt, O = i || e == -1 ? -dt : dt;
      ot.forEach((Tt) => {
        Tt[0] += X, Tt[1] += O;
      }), Y.gaps = ot = p.gaps(s, l, h, d, ot), Y.clip = zr(ot, v.ori, I, j, w, B);
    }
    return wt != 0 && (Y.band = wt == 2 ? [
      Xe(s, l, h, d, A, -1),
      Xe(s, l, h, d, A, 1)
    ] : Xe(s, l, h, d, A, wt)), Y;
  });
}
function Cl(t, e, i, n, r, s, l = pt) {
  if (t.length > 1) {
    let h = null;
    for (let d = 0, p = 1 / 0; d < t.length; d++)
      if (e[d] !== void 0) {
        if (h != null) {
          let b = Dt(t[d] - t[h]);
          b < p && (p = b, l = Dt(i(t[d], n, r, s) - i(t[h], n, r, s)));
        }
        h = d;
      }
  }
  return l;
}
function Kh(t) {
  t = t || Yn;
  const e = lt(t.size, [0.6, pt, 1]), i = t.align || 0, n = t.gap || 0;
  let r = t.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = it(r), l = 1 - e[0], h = lt(e[1], pt), d = lt(e[2], 1), p = lt(t.disp, Yn), b = lt(t.each, (S) => {
  }), { fill: g, stroke: v } = p;
  return (S, E, H, I) => Ui(S, E, (j, w, B, k, J, D, Q, K, et, Y, A) => {
    let Z = j.pxRound, z = i, V = n * ct, R = h * ct, nt = d * ct, L, te;
    k.ori == 0 ? [L, te] = s(S, E) : [te, L] = s(S, E);
    const wt = k.dir * (k.ori == 0 ? 1 : -1);
    let ot = k.ori == 0 ? Hr : ns, dt = k.ori == 0 ? b : (C, mt, Ct, Gi, xi, Oe, $i) => {
      b(C, mt, Ct, xi, Gi, $i, Oe);
    }, X = lt(S.bands, Zo).find((C) => C.series[0] == E), O = X != null ? X.dir : 0, Tt = j.fillTo(S, E, j.min, j.max, O), Kt = Z(Q(Tt, J, A, et)), xt, ut, xe, ne = Y, St = Z(j.width * ct), ze = !1, Ye = null, he = null, ni = null, ji = null;
    g != null && (St == 0 || v != null) && (ze = !0, Ye = g.values(S, E, H, I), he = /* @__PURE__ */ new Map(), new Set(Ye).forEach((C) => {
      C != null && he.set(C, new Path2D());
    }), St > 0 && (ni = v.values(S, E, H, I), ji = /* @__PURE__ */ new Map(), new Set(ni).forEach((C) => {
      C != null && ji.set(C, new Path2D());
    })));
    let { x0: Vi, size: Mn } = p;
    if (Vi != null && Mn != null) {
      z = 1, w = Vi.values(S, E, H, I), Vi.unit == 2 && (w = w.map((Ct) => S.posToVal(K + Ct * Y, k.key, !0)));
      let C = Mn.values(S, E, H, I);
      Mn.unit == 2 ? ut = C[0] * Y : ut = D(C[0], k, Y, K) - D(0, k, Y, K), ne = Cl(w, B, D, k, Y, K, ne), xe = ne - ut + V;
    } else
      ne = Cl(w, B, D, k, Y, K, ne), xe = ne * l + V, ut = ne - xe;
    xe < 1 && (xe = 0), St >= ut / 2 && (St = 0), xe < 5 && (Z = ea);
    let rr = xe > 0, yi = ne - xe - (rr ? St : 0);
    ut = Z(Po(yi, nt, R)), xt = (z == 0 ? ut / 2 : z == wt ? 0 : ut) - z * wt * ((z == 0 ? V / 2 : 0) + (rr ? St / 2 : 0));
    const qt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Wi = ze ? null : new Path2D();
    let Ke = null;
    if (X != null)
      Ke = S.data[X.series[1]];
    else {
      let { y0: C, y1: mt } = p;
      C != null && mt != null && (B = mt.values(S, E, H, I), Ke = C.values(S, E, H, I));
    }
    let wi = L * ut, q = te * ut;
    for (let C = wt == 1 ? H : I; C >= H && C <= I; C += wt) {
      let mt = B[C];
      if (mt == null)
        continue;
      if (Ke != null) {
        let ee = Ke[C] ?? 0;
        if (mt - ee == 0)
          continue;
        Kt = Q(ee, J, A, et);
      }
      let Ct = k.distr != 2 || p != null ? w[C] : C, Gi = D(Ct, k, Y, K), xi = Q(lt(mt, Tt), J, A, et), Oe = Z(Gi - xt), $i = Z(Xt(xi, Kt)), re = Z(Ce(xi, Kt)), de = $i - re;
      if (mt != null) {
        let ee = mt < 0 ? q : wi, $e = mt < 0 ? wi : q;
        ze ? (St > 0 && ni[C] != null && ot(ji.get(ni[C]), Oe, re + ce(St / 2), ut, Xt(0, de - St), ee, $e), Ye[C] != null && ot(he.get(Ye[C]), Oe, re + ce(St / 2), ut, Xt(0, de - St), ee, $e)) : ot(Wi, Oe, re + ce(St / 2), ut, Xt(0, de - St), ee, $e), dt(
          S,
          E,
          C,
          Oe - St / 2,
          re,
          ut + St,
          de
        );
      }
    }
    return St > 0 ? qt.stroke = ze ? ji : Wi : ze || (qt._fill = j.width == 0 ? j._fill : j._stroke ?? j._fill, qt.width = 0), qt.fill = ze ? he : Wi, qt;
  });
}
function qh(t, e) {
  const i = lt(e?.alignGaps, 0);
  return (n, r, s, l) => Ui(n, r, (h, d, p, b, g, v, S, E, H, I, j) => {
    [s, l] = Tr(p, s, l);
    let w = h.pxRound, B = (L) => w(v(L, b, I, E)), k = (L) => w(S(L, g, j, H)), J, D, Q;
    b.ori == 0 ? (J = Or, Q = kn, D = Pa) : (J = Nr, Q = An, D = Ta);
    const K = b.dir * (b.ori == 0 ? 1 : -1);
    let et = B(d[K == 1 ? s : l]), Y = et, A = [], Z = [];
    for (let L = K == 1 ? s : l; L >= s && L <= l; L += K)
      if (p[L] != null) {
        let wt = d[L], ot = B(wt);
        A.push(Y = ot), Z.push(k(p[L]));
      }
    const z = { stroke: t(A, Z, J, Q, D, w), fill: null, clip: null, band: null, gaps: null, flags: yn }, V = z.stroke;
    let [R, nt] = es(n, r);
    if (h.fill != null || R != 0) {
      let L = z.fill = new Path2D(V), te = h.fillTo(n, r, h.min, h.max, R), wt = k(te);
      Q(L, Y, wt), Q(L, et, wt);
    }
    if (!h.spanGaps) {
      let L = [];
      L.push(...is(d, p, s, l, K, B, i)), z.gaps = L = h.gaps(n, r, s, l, L), z.clip = zr(L, b.ori, E, H, I, j);
    }
    return nt != 0 && (z.band = nt == 2 ? [
      Xe(n, r, s, l, V, -1),
      Xe(n, r, s, l, V, 1)
    ] : Xe(n, r, s, l, V, nt)), z;
  });
}
function Zh(t) {
  return qh(Jh, t);
}
function Jh(t, e, i, n, r, s) {
  const l = t.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, t[0], e[0]), l == 2)
    n(h, t[1], e[1]);
  else {
    let d = Array(l), p = Array(l - 1), b = Array(l - 1), g = Array(l - 1);
    for (let v = 0; v < l - 1; v++)
      b[v] = e[v + 1] - e[v], g[v] = t[v + 1] - t[v], p[v] = b[v] / g[v];
    d[0] = p[0];
    for (let v = 1; v < l - 1; v++)
      p[v] === 0 || p[v - 1] === 0 || p[v - 1] > 0 != p[v] > 0 ? d[v] = 0 : (d[v] = 3 * (g[v - 1] + g[v]) / ((2 * g[v] + g[v - 1]) / p[v - 1] + (g[v] + 2 * g[v - 1]) / p[v]), isFinite(d[v]) || (d[v] = 0));
    d[l - 1] = p[l - 2];
    for (let v = 0; v < l - 1; v++)
      r(
        h,
        t[v] + g[v] / 3,
        e[v] + d[v] * g[v] / 3,
        t[v + 1] - g[v] / 3,
        e[v + 1] - d[v + 1] * g[v] / 3,
        t[v + 1],
        e[v + 1]
      );
  }
  return h;
}
const Do = /* @__PURE__ */ new Set();
function Ml() {
  for (let t of Do)
    t.syncRect(!0);
}
Sn && (Hi(Mu, fn, Ml), Hi(Du, fn, Ml, !0), Hi(Sr, fn, () => {
  jt.pxRatio = ct;
}));
const Qh = Da(), Xh = Ca();
function Dl(t, e, i, n) {
  return (n ? [t[0], t[1]].concat(t.slice(2)) : [t[0]].concat(t.slice(1))).map((s, l) => zo(s, l, e, i));
}
function td(t, e) {
  return t.map((i, n) => n == 0 ? {} : Pt({}, e, i));
}
function zo(t, e, i, n) {
  return Pt({}, e == 0 ? i : n, t);
}
function za(t, e, i) {
  return e == null ? vn : [e, i];
}
const ed = za;
function id(t, e, i) {
  return e == null ? vn : kr(e, i, Ko, !0);
}
function Oa(t, e, i, n) {
  return e == null ? vn : Cr(e, i, t.scales[n].log, !1);
}
const nd = Oa;
function Na(t, e, i, n) {
  return e == null ? vn : Yo(e, i, t.scales[n].log, !1);
}
const rd = Na;
function od(t, e, i, n, r) {
  let s = Xt(ul(t), ul(e)), l = e - t, h = Te(r / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= r && s + (d < 5 ? fi.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function zl(t) {
  let e, i;
  return t = t.replace(/(\d+)px/, (n, r) => (e = Mt((i = +r) * ct)) + "px"), [t, e, i];
}
function sd(t) {
  t.show && [t.font, t.labelFont].forEach((e) => {
    let i = gt(e[2] * ct, 1);
    e[0] = e[0].replace(/[0-9.]+px/, i + "px"), e[1] = i;
  });
}
function jt(t, e, i) {
  const n = {
    mode: lt(t.mode, 1)
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
  const p = n.root = ve(fu);
  if (t.id != null && (p.id = t.id), ae(p, t.class), t.title) {
    let o = ve(mu, p);
    o.textContent = t.title;
  }
  const b = Ee("canvas"), g = n.ctx = b.getContext("2d"), v = ve(bu, p);
  Hi("click", v, (o) => {
    o.target === E && (bt != rn || $t != on) && Ut.click(n, o);
  }, !0);
  const S = n.under = ve(vu, v);
  v.appendChild(b);
  const E = n.over = ve(_u, v);
  t = _n(t);
  const H = +lt(t.pxAlign, 1), I = Tl(H);
  (t.plugins || []).forEach((o) => {
    o.opts && (t = o.opts(n, t) || t);
  });
  const j = t.ms || 1e-3, w = n.series = r == 1 ? Dl(t.series || [], xl, El, !1) : td(t.series || [null], Al), B = n.axes = Dl(t.axes || [], wl, Sl, !0), k = n.scales = {}, J = n.bands = t.bands || [];
  J.forEach((o) => {
    o.fill = it(o.fill || null), o.dir = lt(o.dir, -1);
  });
  const D = r == 2 ? w[1].facets[0].scale : w[0].scale, Q = {
    axes: tc,
    series: qa
  }, K = (t.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function et(o) {
    const a = o.distr == 3 ? (c) => Qe(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => po(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: m } = o, _ = m - f;
      return (u - f) / _;
    };
  }
  function Y(o) {
    let a = k[o];
    if (a == null) {
      let c = (t.scales || Yn)[o] || Yn;
      if (c.from != null) {
        Y(c.from);
        let u = Pt({}, k[c.from], c, { key: o });
        u.valToPct = et(u), k[o] = u;
      } else {
        a = k[o] = Pt({}, o == D ? $a : Uh, c), a.key = o;
        let u = a.time, f = a.range, m = ci(f);
        if ((o != D || r == 2 && !u) && (m && (f[0] == null || f[1] == null) && (f = {
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
        }, m = !1), !m && Dr(f))) {
          let _ = f;
          f = (y, x, P) => x == null ? vn : kr(x, P, _);
        }
        a.range = it(f || (u ? ed : o == D ? a.distr == 3 ? nd : a.distr == 4 ? rd : za : a.distr == 3 ? Oa : a.distr == 4 ? Na : id)), a.auto = it(m ? !1 : a.auto), a.clamp = it(a.clamp || Ih), a._min = a._max = null, a.valToPct = et(a);
      }
    }
  }
  Y("x"), Y("y"), r == 1 && w.forEach((o) => {
    Y(o.scale);
  }), B.forEach((o) => {
    Y(o.scale);
  });
  for (let o in t.scales)
    Y(o);
  const A = k[D], Z = A.distr;
  let z, V;
  A.ori == 0 ? (ae(p, pu), z = s, V = l) : (ae(p, gu), z = l, V = s);
  const R = {};
  for (let o in k) {
    let a = k[o];
    (a.min != null || a.max != null) && (R[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const nt = t.tzDate || ((o) => new Date(Mt(o / j))), L = t.fmtDate || Jo, te = j == 1 ? ph(nt) : bh(nt), wt = vl(nt, bl(j == 1 ? fh : mh, L)), ot = yl(nt, _l(_h, L)), dt = [], X = n.legend = Pt({}, xh, t.legend), O = n.cursor = Pt({}, Ph, { drag: { y: r == 2 } }, t.cursor), Tt = X.show, Kt = O.show, xt = X.markers;
  X.idxs = dt, xt.width = it(xt.width), xt.dash = it(xt.dash), xt.stroke = it(xt.stroke), xt.fill = it(xt.fill);
  let ut, xe, ne, St = [], ze = [], Ye, he = !1, ni = {};
  if (X.live) {
    const o = w[1] ? w[1].values : null;
    he = o != null, Ye = he ? o(n, 1, 0) : { _: 0 };
    for (let a in Ye)
      ni[a] = Wo;
  }
  if (Tt)
    if (ut = Ee("table", ku, p), ne = Ee("tbody", null, ut), X.mount(n, ut), he) {
      xe = Ee("thead", null, ut, ne);
      let o = Ee("tr", null, xe);
      Ee("th", null, o);
      for (var ji in Ye)
        Ee("th", Ks, o).textContent = ji;
    } else
      ae(ut, Eu), X.live && ae(ut, Au);
  const Vi = { show: !0 }, Mn = { show: !1 };
  function rr(o, a) {
    if (a == 0 && (he || !X.live || r == 2))
      return vn;
    let c = [], u = Ee("tr", Pu, ne, ne.childNodes[a]);
    ae(u, o.class), o.show || ae(u, Oi);
    let f = Ee("th", null, u);
    if (xt.show) {
      let y = ve(Tu, f);
      if (a > 0) {
        let x = xt.width(n, a);
        x && (y.style.border = x + "px " + xt.dash(n, a) + " " + xt.stroke(n, a)), y.style.background = xt.fill(n, a);
      }
    }
    let m = ve(Ks, f);
    o.label instanceof HTMLElement ? m.appendChild(o.label) : m.textContent = o.label, a > 0 && (xt.show || (m.style.color = o.width > 0 ? xt.stroke(n, a) : xt.fill(n, a)), qt("click", f, (y) => {
      if (O._lock)
        return;
      ki(y);
      let x = w.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let P = w.some((T, M) => M > 0 && M != x && T.show);
        w.forEach((T, M) => {
          M > 0 && He(M, P ? M == x ? Vi : Mn : Vi, !0, Et.setSeries);
        });
      } else
        He(x, { show: !o.show }, !0, Et.setSeries);
    }, !1), Ki && qt(Qs, f, (y) => {
      O._lock || (ki(y), He(w.indexOf(o), ln, !0, Et.setSeries));
    }, !1));
    for (var _ in Ye) {
      let y = Ee("td", Cu, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const yi = /* @__PURE__ */ new Map();
  function qt(o, a, c, u = !0) {
    const f = yi.get(a) || {}, m = O.bind[o](n, a, c, u);
    m && (Hi(o, a, f[o] = m), yi.set(a, f));
  }
  function Wi(o, a, c) {
    const u = yi.get(a) || {};
    for (let f in u)
      (o == null || f == o) && (Eo(f, a, u[f]), delete u[f]);
    o == null && yi.delete(a);
  }
  let Ke = 0, wi = 0, q = 0, C = 0, mt = 0, Ct = 0, Gi = mt, xi = Ct, Oe = q, $i = C, re = 0, de = 0, ee = 0, $e = 0;
  n.bbox = {};
  let Fr = !1, or = !1, Yi = !1, Si = !1, sr = !1, fe = !1;
  function Br(o, a, c) {
    (c || o != n.width || a != n.height) && ls(o, a), Xi(!1), Yi = !0, or = !0, tn();
  }
  function ls(o, a) {
    n.width = Ke = q = o, n.height = wi = C = a, mt = Ct = 0, Ua(), ja();
    let c = n.bbox;
    re = c.left = Di(mt * ct, 0.5), de = c.top = Di(Ct * ct, 0.5), ee = c.width = Di(q * ct, 0.5), $e = c.height = Di(C * ct, 0.5);
  }
  const Fa = 3;
  function Ba() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = Qa(a), u = Xa(a);
      o = a == Fa || c && u, o || (ls(n.width, n.height), or = !0);
    }
  }
  function Ia({ width: o, height: a }) {
    Br(o, a);
  }
  n.setSize = Ia;
  function Ua() {
    let o = !1, a = !1, c = !1, u = !1;
    B.forEach((f, m) => {
      if (f.show && f._show) {
        let { side: _, _size: y } = f, x = _ % 2, P = f.label != null ? f.labelSize : 0, T = y + P;
        T > 0 && (x ? (q -= T, _ == 3 ? (mt += T, u = !0) : c = !0) : (C -= T, _ == 0 ? (Ct += T, o = !0) : a = !0));
      }
    }), Ai[0] = o, Ai[1] = c, Ai[2] = a, Ai[3] = u, q -= ri[1] + ri[3], mt += ri[3], C -= ri[2] + ri[0], Ct += ri[0];
  }
  function ja() {
    let o = mt + q, a = Ct + C, c = mt, u = Ct;
    function f(m, _) {
      switch (m) {
        case 1:
          return o += _, o - _;
        case 2:
          return a += _, a - _;
        case 3:
          return c -= _, c + _;
        case 0:
          return u -= _, u + _;
      }
    }
    B.forEach((m, _) => {
      if (m.show && m._show) {
        let y = m.side;
        m._pos = f(y, m._size), m.label != null && (m._lpos = f(y, m.labelSize));
      }
    });
  }
  if (O.dataIdx == null) {
    let o = O.hover, a = o.skip = new Set(o.skip ?? []);
    a.add(void 0);
    let c = o.prox = it(o.prox), u = o.bias ??= 0;
    O.dataIdx = (f, m, _, y) => {
      if (m == 0)
        return _;
      let x = _, P = c(f, m, _, y) ?? pt, T = P >= 0 && P < pt, M = A.ori == 0 ? q : C, W = O.left, at = e[0], st = e[m];
      if (a.has(st[_])) {
        x = null;
        let tt = null, U = null, N;
        if (u == 0 || u == -1)
          for (N = _; tt == null && N-- > 0; )
            a.has(st[N]) || (tt = N);
        if (u == 0 || u == 1)
          for (N = _; U == null && N++ < st.length; )
            a.has(st[N]) || (U = N);
        if (tt != null || U != null)
          if (T) {
            let _t = tt == null ? -1 / 0 : z(at[tt], A, M, 0), kt = U == null ? 1 / 0 : z(at[U], A, M, 0), Bt = W - _t, ft = kt - W;
            Bt <= ft ? Bt <= P && (x = tt) : ft <= P && (x = U);
          } else
            x = U == null ? tt : tt == null ? U : _ - tt <= U - _ ? tt : U;
      } else T && Dt(W - z(at[_], A, M, 0)) > P && (x = null);
      return x;
    };
  }
  const ki = (o) => {
    O.event = o;
  };
  O.idxs = dt, O._lock = !1;
  let Wt = O.points;
  Wt.show = it(Wt.show), Wt.size = it(Wt.size), Wt.stroke = it(Wt.stroke), Wt.width = it(Wt.width), Wt.fill = it(Wt.fill);
  const Ne = n.focus = Pt({}, t.focus || { alpha: 0.3 }, O.focus), Ki = Ne.prox >= 0, qi = Ki && Wt.one;
  let pe = [], Zi = [], Ji = [];
  function as(o, a) {
    let c = Wt.show(n, a);
    if (c instanceof HTMLElement)
      return ae(c, Su), ae(c, o.class), Be(c, -10, -10, q, C), E.insertBefore(c, pe[a]), c;
  }
  function cs(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && k[o.scale].time, u = o.value;
      o.value = c ? fl(u) ? yl(nt, _l(u, L)) : u || ot : u || Rh, o.label = o.label || (c ? Ch : Th);
    }
    if (qi || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || Qh || Uu, o.fillTo = it(o.fillTo || jh), o.pxAlign = +lt(o.pxAlign, H), o.pxRound = Tl(o.pxAlign), o.stroke = it(o.stroke || null), o.fill = it(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = Fh(Xt(1, o.width), 1), u = o.points = Pt({}, {
        size: c,
        width: Xt(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: Xh,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = it(u.show), u.filter = it(u.filter), u.fill = it(u.fill), u.stroke = it(u.stroke), u.paths = it(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Tt) {
      let c = rr(o, a);
      St.splice(a, 0, c[0]), ze.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Kt) {
      dt.splice(a, 0, null);
      let c = null;
      qi ? a == 0 && (c = as(o, a)) : a > 0 && (c = as(o, a)), pe.splice(a, 0, c), Zi.splice(a, 0, 0), Ji.splice(a, 0, 0);
    }
    Ft("addSeries", a);
  }
  function Va(o, a) {
    a = a ?? w.length, o = r == 1 ? zo(o, a, xl, El) : zo(o, a, {}, Al), w.splice(a, 0, o), cs(w[a], a);
  }
  n.addSeries = Va;
  function Wa(o) {
    if (w.splice(o, 1), Tt) {
      X.values.splice(o, 1), ze.splice(o, 1);
      let a = St.splice(o, 1)[0];
      Wi(null, a.firstChild), a.remove();
    }
    Kt && (dt.splice(o, 1), pe.splice(o, 1)[0].remove(), Zi.splice(o, 1), Ji.splice(o, 1)), Ft("delSeries", o);
  }
  n.delSeries = Wa;
  const Ai = [!1, !1, !1, !1];
  function Ga(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = k[o.scale];
      u == null && (o.scale = c ? w[1].scale : D, u = k[o.scale]);
      let f = u.time;
      o.size = it(o.size), o.space = it(o.space), o.rotate = it(o.rotate), ci(o.incrs) && o.incrs.forEach((_) => {
        !fi.has(_) && fi.set(_, ra(_));
      }), o.incrs = it(o.incrs || (u.distr == 2 ? uh : f ? j == 1 ? dh : gh : zi)), o.splits = it(o.splits || (f && u.distr == 1 ? te : u.distr == 3 ? To : u.distr == 4 ? zh : Dh)), o.stroke = it(o.stroke), o.grid.stroke = it(o.grid.stroke), o.ticks.stroke = it(o.ticks.stroke), o.border.stroke = it(o.border.stroke);
      let m = o.values;
      o.values = // static array of tick values
      ci(m) && !ci(m[0]) ? it(m) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          ci(m) ? vl(nt, bl(m, L)) : (
            // fmtDate string tpl
            fl(m) ? vh(nt, m) : m || wt
          )
        ) : m || Mh
      ), o.filter = it(o.filter || (u.distr >= 3 && u.log == 10 ? Hh : u.distr == 3 && u.log == 2 ? Lh : ia)), o.font = zl(o.font), o.labelFont = zl(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (Ai[a] = !0, o._el = ve(yu, v));
    }
  }
  function Dn(o, a, c, u) {
    let [f, m, _, y] = c, x = a % 2, P = 0;
    return x == 0 && (y || m) && (P = a == 0 && !f || a == 2 && !_ ? Mt(wl.size / 3) : 0), x == 1 && (f || _) && (P = a == 1 && !m || a == 3 && !y ? Mt(Sl.size / 2) : 0), P;
  }
  const us = n.padding = (t.padding || [Dn, Dn, Dn, Dn]).map((o) => it(lt(o, Dn))), ri = n._padding = us.map((o, a) => o(n, a, Ai, 0));
  let It, Nt = null, Ht = null;
  const lr = r == 1 ? w[0].idxs : null;
  let Se = null, zn = !1;
  function hs(o, a) {
    if (e = o ?? [], n.data = n._data = e, r == 2) {
      It = 0;
      for (let c = 1; c < w.length; c++)
        It += e[c][0].length;
    } else {
      e.length == 0 && (n.data = n._data = e = [[]]), Se = e[0], It = Se.length;
      let c = e;
      if (Z == 2) {
        c = e.slice();
        let u = c[0] = Array(It);
        for (let f = 0; f < It; f++)
          u[f] = f;
      }
      n._data = e = c;
    }
    if (Xi(!0), Ft("setData"), Z == 2 && (Yi = !0), a !== !1) {
      let c = A;
      c.auto(n, zn) ? Ir() : si(D, c.min, c.max), Si = Si || O.left >= 0, fe = !0, tn();
    }
  }
  n.setData = hs;
  function Ir() {
    zn = !0;
    let o, a;
    r == 1 && (It > 0 ? (Nt = lr[0] = 0, Ht = lr[1] = It - 1, o = e[0][Nt], a = e[0][Ht], Z == 2 ? (o = Nt, a = Ht) : o == a && (Z == 3 ? [o, a] = Cr(o, o, A.log, !1) : Z == 4 ? [o, a] = Yo(o, o, A.log, !1) : A.time ? a = o + Mt(86400 / j) : [o, a] = kr(o, a, Ko, !0))) : (Nt = lr[0] = o = null, Ht = lr[1] = a = null)), si(D, o, a);
  }
  let ar, Qi, Ur, jr, Vr, Wr, Gr, Yr, Kr, ie;
  function ds(o, a, c, u, f, m) {
    o ??= Zs, c ??= Zo, u ??= "butt", f ??= Zs, m ??= "round", o != ar && (g.strokeStyle = ar = o), f != Qi && (g.fillStyle = Qi = f), a != Ur && (g.lineWidth = Ur = a), m != Vr && (g.lineJoin = Vr = m), u != Wr && (g.lineCap = Wr = u), c != jr && g.setLineDash(jr = c);
  }
  function fs(o, a, c, u) {
    a != Qi && (g.fillStyle = Qi = a), o != Gr && (g.font = Gr = o), c != Yr && (g.textAlign = Yr = c), u != Kr && (g.textBaseline = Kr = u);
  }
  function qr(o, a, c, u, f = 0) {
    if (u.length > 0 && o.auto(n, zn) && (a == null || a.min == null)) {
      let m = lt(Nt, 0), _ = lt(Ht, u.length - 1), y = c.min == null ? Hu(u, m, _, f, o.distr == 3) : [c.min, c.max];
      o.min = Ce(o.min, c.min = y[0]), o.max = Xt(o.max, c.max = y[1]);
    }
  }
  const ps = { min: null, max: null };
  function Ya() {
    for (let u in k) {
      let f = k[u];
      R[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      R[D] != null && f.auto(n, zn)) && (R[u] = ps);
    }
    for (let u in k) {
      let f = k[u];
      R[u] == null && f.from != null && R[f.from] != null && (R[u] = ps);
    }
    R[D] != null && Xi(!0);
    let o = {};
    for (let u in R) {
      let f = R[u];
      if (f != null) {
        let m = o[u] = _n(k[u], Wu);
        if (f.min != null)
          Pt(m, f);
        else if (u != D || r == 2)
          if (It == 0 && m.from == null) {
            let _ = m.range(n, null, null, u);
            m.min = _[0], m.max = _[1];
          } else
            m.min = pt, m.max = -pt;
      }
    }
    if (It > 0) {
      w.forEach((u, f) => {
        if (r == 1) {
          let m = u.scale, _ = R[m];
          if (_ == null)
            return;
          let y = o[m];
          if (f == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Nt = Te(y.min, e[0]), Ht = Te(y.max, e[0]), Ht - Nt > 1 && (e[0][Nt] < y.min && Nt++, e[0][Ht] > y.max && Ht--), u.min = Se[Nt], u.max = Se[Ht];
          } else u.show && u.auto && qr(y, _, u, e[f], u.sorted);
          u.idxs[0] = Nt, u.idxs[1] = Ht;
        } else if (f > 0 && u.show && u.auto) {
          let [m, _] = u.facets, y = m.scale, x = _.scale, [P, T] = e[f], M = o[y], W = o[x];
          M != null && qr(M, R[y], m, P, m.sorted), W != null && qr(W, R[x], _, T, _.sorted), u.min = _.min, u.max = _.max;
        }
      });
      for (let u in o) {
        let f = o[u], m = R[u];
        if (f.from == null && (m == null || m.min == null)) {
          let _ = f.range(
            n,
            f.min == pt ? null : f.min,
            f.max == -pt ? null : f.max,
            u
          );
          f.min = _[0], f.max = _[1];
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
          let _ = f.range(n, m.min, m.max, u);
          f.min = _[0], f.max = _[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let u in o) {
      let f = o[u], m = k[u];
      if (m.min != f.min || m.max != f.max) {
        m.min = f.min, m.max = f.max;
        let _ = m.distr;
        m._min = _ == 3 ? Qe(m.min) : _ == 4 ? po(m.min, m.asinh) : _ == 100 ? m.fwd(m.min) : m.min, m._max = _ == 3 ? Qe(m.max) : _ == 4 ? po(m.max, m.asinh) : _ == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      w.forEach((u, f) => {
        r == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Yi = !0, Ft("setScale", u);
      Kt && O.left >= 0 && (Si = fe = !0);
    }
    for (let u in R)
      R[u] = null;
  }
  function Ka(o) {
    let a = Po(Nt - 1, 0, It - 1), c = Po(Ht + 1, 0, It - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < It - 1; )
      c++;
    return [a, c];
  }
  function qa() {
    if (It > 0) {
      let o = w.some((a) => a._focus) && ie != Ne.alpha;
      o && (g.globalAlpha = ie = Ne.alpha), w.forEach((a, c) => {
        if (c > 0 && a.show && (gs(c, !1), gs(c, !0), a._paths == null)) {
          let u = ie;
          ie != a.alpha && (g.globalAlpha = ie = a.alpha);
          let f = r == 2 ? [0, e[c][0].length - 1] : Ka(e[c]);
          a._paths = a.paths(n, c, f[0], f[1]), ie != u && (g.globalAlpha = ie = u);
        }
      }), w.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = ie;
          ie != a.alpha && (g.globalAlpha = ie = a.alpha), a._paths != null && ms(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Nt, Ht, f), _ = a.points.filter(n, c, m, f);
            (m || _) && (a.points._paths = a.points.paths(n, c, Nt, Ht, _), ms(c, !0));
          }
          ie != u && (g.globalAlpha = ie = u), Ft("drawSeries", c);
        }
      }), o && (g.globalAlpha = ie = 1);
    }
  }
  function gs(o, a) {
    let c = a ? w[o].points : w[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function ms(o, a) {
    let c = a ? w[o].points : w[o], {
      stroke: u,
      fill: f,
      clip: m,
      flags: _,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: P = c.width
    } = c._paths;
    P = gt(P * ct, 3);
    let T = null, M = P % 2 / 2;
    a && x == null && (x = P > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && M > 0;
    if (W && g.translate(M, M), !a) {
      let at = re - P / 2, st = de - P / 2, tt = ee + P, U = $e + P;
      T = new Path2D(), T.rect(at, st, tt, U);
    }
    a ? Zr(y, P, c.dash, c.cap, x, u, f, _, m) : Za(o, y, P, c.dash, c.cap, x, u, f, _, T, m), W && g.translate(-M, -M);
  }
  function Za(o, a, c, u, f, m, _, y, x, P, T) {
    let M = !1;
    x != 0 && J.forEach((W, at) => {
      if (W.series[0] == o) {
        let st = w[W.series[1]], tt = e[W.series[1]], U = (st._paths || Yn).band;
        ci(U) && (U = W.dir == 1 ? U[0] : U[1]);
        let N, _t = null;
        st.show && U && Ru(tt, Nt, Ht) ? (_t = W.fill(n, at) || m, N = st._paths.clip) : U = null, Zr(a, c, u, f, _t, _, y, x, P, T, N, U), M = !0;
      }
    }), M || Zr(a, c, u, f, m, _, y, x, P, T);
  }
  const bs = yn | Mo;
  function Zr(o, a, c, u, f, m, _, y, x, P, T, M) {
    ds(o, a, c, u, f), (x || P || M) && (g.save(), x && g.clip(x), P && g.clip(P)), M ? (y & bs) == bs ? (g.clip(M), T && g.clip(T), ur(f, _), cr(o, m, a)) : y & Mo ? (ur(f, _), g.clip(M), cr(o, m, a)) : y & yn && (g.save(), g.clip(M), T && g.clip(T), ur(f, _), g.restore(), cr(o, m, a)) : (ur(f, _), cr(o, m, a)), (x || P || M) && g.restore();
  }
  function cr(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      g.strokeStyle = ar = f, g.stroke(u);
    }) : a != null && o && g.stroke(a));
  }
  function ur(o, a) {
    a instanceof Map ? a.forEach((c, u) => {
      g.fillStyle = Qi = u, g.fill(c);
    }) : a != null && o && g.fill(a);
  }
  function Ja(o, a, c, u) {
    let f = B[o], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let _ = f._space = f.space(n, o, a, c, u), y = f._incrs = f.incrs(n, o, a, c, u, _);
      m = od(a, c, y, u, _);
    }
    return f._found = m;
  }
  function Jr(o, a, c, u, f, m, _, y, x, P) {
    let T = _ % 2 / 2;
    H == 1 && g.translate(T, T), ds(y, _, x, P, y), g.beginPath();
    let M, W, at, st, tt = f + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (W = f, st = tt) : (M = f, at = tt);
    for (let U = 0; U < o.length; U++)
      a[U] != null && (c == 0 ? M = at = o[U] : W = st = o[U], g.moveTo(M, W), g.lineTo(at, st));
    g.stroke(), H == 1 && g.translate(-T, -T);
  }
  function Qa(o) {
    let a = !0;
    return B.forEach((c, u) => {
      if (!c.show)
        return;
      let f = k[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, Xi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Xi(!1));
      let m = c.side, _ = m % 2, { min: y, max: x } = f, [P, T] = Ja(u, y, x, _ == 0 ? q : C);
      if (T == 0)
        return;
      let M = f.distr == 2, W = c._splits = c.splits(n, u, y, x, P, T, M), at = f.distr == 2 ? W.map((N) => Se[N]) : W, st = f.distr == 2 ? Se[W[1]] - Se[W[0]] : P, tt = c._values = c.values(n, c.filter(n, at, u, T, st), u, T, st);
      c._rotate = m == 2 ? c.rotate(n, tt, u, T) : 0;
      let U = c._size;
      c._size = _e(c.size(n, tt, u, o)), U != null && c._size != U && (a = !1);
    }), a;
  }
  function Xa(o) {
    let a = !0;
    return us.forEach((c, u) => {
      let f = c(n, u, Ai, o);
      f != ri[u] && (a = !1), ri[u] = f;
    }), a;
  }
  function tc() {
    for (let o = 0; o < B.length; o++) {
      let a = B[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, m, _ = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [x, P] = a._found;
      if (a.label != null) {
        let Jt = a.labelGap * y, le = Mt((a._lpos + Jt) * ct);
        fs(a.labelFont[0], _, "center", c == 2 ? Bn : qs), g.save(), u == 1 ? (f = m = 0, g.translate(
          le,
          Mt(de + $e / 2)
        ), g.rotate((c == 3 ? -_r : _r) / 2)) : (f = Mt(re + ee / 2), m = le);
        let Ti = ta(a.label) ? a.label(n, o, x, P) : a.label;
        g.fillText(Ti, f, m), g.restore();
      }
      if (P == 0)
        continue;
      let T = k[a.scale], M = u == 0 ? ee : $e, W = u == 0 ? re : de, at = a._splits, st = T.distr == 2 ? at.map((Jt) => Se[Jt]) : at, tt = T.distr == 2 ? Se[at[1]] - Se[at[0]] : x, U = a.ticks, N = a.border, _t = U.show ? U.size : 0, kt = Mt(_t * ct), Bt = Mt((a.alignTo == 2 ? a._size - _t - a.gap : a.gap) * ct), ft = a._rotate * -_r / 180, At = I(a._pos * ct), oe = (kt + Bt) * y, Zt = At + oe;
      m = u == 0 ? Zt : 0, f = u == 1 ? Zt : 0;
      let ge = a.font[0], ke = a.align == 1 ? cn : a.align == 2 ? uo : ft > 0 ? cn : ft < 0 ? uo : u == 0 ? "center" : c == 3 ? uo : cn, Re = ft || u == 1 ? "middle" : c == 2 ? Bn : qs;
      fs(ge, _, ke, Re);
      let se = a.font[1] * a.lineGap, me = at.map((Jt) => I(h(Jt, T, M, W))), Ae = a._values;
      for (let Jt = 0; Jt < Ae.length; Jt++) {
        let le = Ae[Jt];
        if (le != null) {
          u == 0 ? f = me[Jt] : m = me[Jt], le = "" + le;
          let Ti = le.indexOf(`
`) == -1 ? [le] : le.split(/\n/gm);
          for (let Qt = 0; Qt < Ti.length; Qt++) {
            let Hs = Ti[Qt];
            ft ? (g.save(), g.translate(f, m + Qt * se), g.rotate(ft), g.fillText(Hs, 0, 0), g.restore()) : g.fillText(Hs, f, m + Qt * se);
          }
        }
      }
      U.show && Jr(
        me,
        U.filter(n, st, o, P, tt),
        u,
        c,
        At,
        kt,
        gt(U.width * ct, 3),
        U.stroke(n, o),
        U.dash,
        U.cap
      );
      let Fe = a.grid;
      Fe.show && Jr(
        me,
        Fe.filter(n, st, o, P, tt),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? de : re,
        u == 0 ? $e : ee,
        gt(Fe.width * ct, 3),
        Fe.stroke(n, o),
        Fe.dash,
        Fe.cap
      ), N.show && Jr(
        [At],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? de : re,
        u == 1 ? $e : ee,
        gt(N.width * ct, 3),
        N.stroke(n, o),
        N.dash,
        N.cap
      );
    }
    Ft("drawAxes");
  }
  function Xi(o) {
    w.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let hr = !1, Qr = !1, On = [];
  function ec() {
    Qr = !1;
    for (let o = 0; o < On.length; o++)
      Ft(...On[o]);
    On.length = 0;
  }
  function tn() {
    hr || (Qu(vs), hr = !0);
  }
  function ic(o, a = !1) {
    hr = !0, Qr = a, o(n), vs(), a && On.length > 0 && queueMicrotask(ec);
  }
  n.batch = ic;
  function vs() {
    if (Fr && (Ya(), Fr = !1), Yi && (Ba(), Yi = !1), or) {
      if (yt(S, cn, mt), yt(S, Bn, Ct), yt(S, Un, q), yt(S, jn, C), yt(E, cn, mt), yt(E, Bn, Ct), yt(E, Un, q), yt(E, jn, C), yt(v, Un, Ke), yt(v, jn, wi), b.width = Mt(Ke * ct), b.height = Mt(wi * ct), B.forEach(({ _el: o, _show: a, _size: c, _pos: u, side: f }) => {
        if (o != null)
          if (a) {
            let m = f === 3 || f === 0 ? c : 0, _ = f % 2 == 1;
            yt(o, _ ? "left" : "top", u - m), yt(o, _ ? "width" : "height", c), yt(o, _ ? "top" : "left", _ ? Ct : mt), yt(o, _ ? "height" : "width", _ ? C : q), Ao(o, Oi);
          } else
            ae(o, Oi);
      }), ar = Qi = Ur = Vr = Wr = Gr = Yr = Kr = jr = null, ie = 1, Ln(!0), mt != Gi || Ct != xi || q != Oe || C != $i) {
        Xi(!1);
        let o = q / Oe, a = C / $i;
        if (Kt && !Si && O.left >= 0) {
          O.left *= o, O.top *= a, en && Be(en, Mt(O.left), 0, q, C), nn && Be(nn, 0, Mt(O.top), q, C);
          for (let c = 0; c < pe.length; c++) {
            let u = pe[c];
            u != null && (Zi[c] *= o, Ji[c] *= a, Be(u, _e(Zi[c]), _e(Ji[c]), q, C));
          }
        }
        if (vt.show && !sr && vt.left >= 0 && vt.width > 0) {
          vt.left *= o, vt.width *= o, vt.top *= a, vt.height *= a;
          for (let c in ro)
            yt(sn, c, vt[c]);
        }
        Gi = mt, xi = Ct, Oe = q, $i = C;
      }
      Ft("setSize"), or = !1;
    }
    Ke > 0 && wi > 0 && (g.clearRect(0, 0, b.width, b.height), Ft("drawClear"), K.forEach((o) => o()), Ft("draw")), vt.show && sr && (dr(vt), sr = !1), Kt && Si && (Pi(null, !0, !1), Si = !1), X.show && X.live && fe && (io(), fe = !1), d || (d = !0, n.status = 1, Ft("ready")), zn = !1, hr = !1;
  }
  n.redraw = (o, a) => {
    Yi = a || !1, o !== !1 ? si(D, A.min, A.max) : tn();
  };
  function Xr(o, a) {
    let c = k[o];
    if (c.from == null) {
      if (It == 0) {
        let u = c.range(n, a.min, a.max, o);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (It > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      o == D && c.distr == 2 && It > 0 && (a.min = Te(a.min, e[0]), a.max = Te(a.max, e[0]), a.min == a.max && a.max++), R[o] = a, Fr = !0, tn();
    }
  }
  n.setScale = Xr;
  let to, eo, en, nn, _s, ys, rn, on, ws, xs, bt, $t, oi = !1;
  const Ut = O.drag;
  let Lt = Ut.x, Rt = Ut.y;
  Kt && (O.x && (to = ve(xu, E)), O.y && (eo = ve($u, E)), A.ori == 0 ? (en = to, nn = eo) : (en = eo, nn = to), bt = O.left, $t = O.top);
  const vt = n.select = Pt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, t.select), sn = vt.show ? ve(wu, vt.over ? E : S) : null;
  function dr(o, a) {
    if (vt.show) {
      for (let c in o)
        vt[c] = o[c], c in ro && yt(sn, c, o[c]);
      a !== !1 && Ft("setSelect");
    }
  }
  n.setSelect = dr;
  function nc(o) {
    if (w[o].show)
      Tt && Ao(St[o], Oi);
    else if (Tt && ae(St[o], Oi), Kt) {
      let c = qi ? pe[0] : pe[o];
      c != null && Be(c, -10, -10, q, C);
    }
  }
  function si(o, a, c) {
    Xr(o, { min: a, max: c });
  }
  function He(o, a, c, u) {
    a.focus != null && ac(o), a.show != null && w.forEach((f, m) => {
      m > 0 && (o == m || o == null) && (f.show = a.show, nc(m), r == 2 ? (si(f.facets[0].scale, null, null), si(f.facets[1].scale, null, null)) : si(f.scale, null, null), tn());
    }), c !== !1 && Ft("setSeries", o, a), u && Rn("setSeries", n, o, a);
  }
  n.setSeries = He;
  function rc(o, a) {
    Pt(J[o], a);
  }
  function oc(o, a) {
    o.fill = it(o.fill || null), o.dir = lt(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function sc(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = oc, n.setBand = rc, n.delBand = sc;
  function lc(o, a) {
    w[o].alpha = a, Kt && pe[o] != null && (pe[o].style.opacity = a), Tt && St[o] && (St[o].style.opacity = a);
  }
  let qe, li, Ei;
  const ln = { focus: !0 };
  function ac(o) {
    if (o != Ei) {
      let a = o == null, c = Ne.alpha != 1;
      w.forEach((u, f) => {
        if (r == 1 || f > 0) {
          let m = a || f == 0 || f == o;
          u._focus = a ? null : m, c && lc(f, m ? 1 : Ne.alpha);
        }
      }), Ei = o, c && tn();
    }
  }
  Tt && Ki && qt(Xs, ut, (o) => {
    O._lock || (ki(o), Ei != null && He(null, ln, !0, Et.setSeries));
  });
  function Le(o, a, c) {
    let u = k[a];
    c && (o = o / ct - (u.ori == 1 ? Ct : mt));
    let f = q;
    u.ori == 1 && (f = C, o = f - o), u.dir == -1 && (o = f - o);
    let m = u._min, _ = u._max, y = o / f, x = m + (_ - m) * y, P = u.distr;
    return P == 3 ? bn(10, x) : P == 4 ? Bu(x, u.asinh) : P == 100 ? u.bwd(x) : x;
  }
  function cc(o, a) {
    let c = Le(o, D, a);
    return Te(c, e[0], Nt, Ht);
  }
  n.valToIdx = (o) => Te(o, e[0]), n.posToIdx = cc, n.posToVal = Le, n.valToPos = (o, a, c) => k[a].ori == 0 ? s(
    o,
    k[a],
    c ? ee : q,
    c ? re : 0
  ) : l(
    o,
    k[a],
    c ? $e : C,
    c ? de : 0
  ), n.setCursor = (o, a, c) => {
    bt = o.left, $t = o.top, Pi(null, a, c);
  };
  function $s(o, a) {
    yt(sn, cn, vt.left = o), yt(sn, Un, vt.width = a);
  }
  function Ss(o, a) {
    yt(sn, Bn, vt.top = o), yt(sn, jn, vt.height = a);
  }
  let Nn = A.ori == 0 ? $s : Ss, Hn = A.ori == 1 ? $s : Ss;
  function uc() {
    if (Tt && X.live)
      for (let o = r == 2 ? 1 : 0; o < w.length; o++) {
        if (o == 0 && he)
          continue;
        let a = X.values[o], c = 0;
        for (let u in a)
          ze[o][c++].firstChild.nodeValue = a[u];
      }
  }
  function io(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, u) => {
      dt[u] = c;
    }) : Vu(o.idx) || dt.fill(o.idx), X.idx = dt[0]), Tt && X.live) {
      for (let c = 0; c < w.length; c++)
        (c > 0 || r == 1 && !he) && hc(c, dt[c]);
      uc();
    }
    fe = !1, a !== !1 && Ft("setLegend");
  }
  n.setLegend = io;
  function hc(o, a) {
    let c = w[o], u = o == 0 && Z == 2 ? Se : e[o], f;
    he ? f = c.values(n, o, a) ?? ni : (f = c.value(n, a == null ? null : u[a], o, a), f = f == null ? ni : { _: f }), X.values[o] = f;
  }
  function Pi(o, a, c) {
    ws = bt, xs = $t, [bt, $t] = O.move(n, bt, $t), O.left = bt, O.top = $t, Kt && (en && Be(en, Mt(bt), 0, q, C), nn && Be(nn, 0, Mt($t), q, C));
    let u, f = Nt > Ht;
    qe = pt, li = null;
    let m = A.ori == 0 ? q : C, _ = A.ori == 1 ? q : C;
    if (bt < 0 || It == 0 || f) {
      u = O.idx = null;
      for (let y = 0; y < w.length; y++) {
        let x = pe[y];
        x != null && Be(x, -10, -10, q, C);
      }
      Ki && He(null, ln, !0, o == null && Et.setSeries), X.live && (dt.fill(u), fe = !0);
    } else {
      let y, x, P;
      r == 1 && (y = A.ori == 0 ? bt : $t, x = Le(y, D), u = O.idx = Te(x, e[0], Nt, Ht), P = z(e[0][u], A, m, 0));
      let T = -10, M = -10, W = 0, at = 0, st = !0, tt = "", U = "";
      for (let N = r == 2 ? 1 : 0; N < w.length; N++) {
        let _t = w[N], kt = dt[N], Bt = kt == null ? null : r == 1 ? e[N][kt] : e[N][1][kt], ft = O.dataIdx(n, N, u, x), At = ft == null ? null : r == 1 ? e[N][ft] : e[N][1][ft];
        if (fe = fe || At != Bt || ft != kt, dt[N] = ft, N > 0 && _t.show) {
          let oe = ft == null ? -10 : ft == u ? P : z(r == 1 ? e[0][ft] : e[N][0][ft], A, m, 0), Zt = At == null ? -10 : V(At, r == 1 ? k[_t.scale] : k[_t.facets[1].scale], _, 0);
          if (Ki && At != null) {
            let ge = A.ori == 1 ? bt : $t, ke = Dt(Ne.dist(n, N, ft, Zt, ge));
            if (ke < qe) {
              let Re = Ne.bias;
              if (Re != 0) {
                let se = Le(ge, _t.scale), me = At >= 0 ? 1 : -1, Ae = se >= 0 ? 1 : -1;
                Ae == me && (Ae == 1 ? Re == 1 ? At >= se : At <= se : (
                  // >= 0
                  Re == 1 ? At <= se : At >= se
                )) && (qe = ke, li = N);
              } else
                qe = ke, li = N;
            }
          }
          if (fe || qi) {
            let ge, ke;
            A.ori == 0 ? (ge = oe, ke = Zt) : (ge = Zt, ke = oe);
            let Re, se, me, Ae, Fe, Jt, le = !0, Ti = Wt.bbox;
            if (Ti != null) {
              le = !1;
              let Qt = Ti(n, N);
              me = Qt.left, Ae = Qt.top, Re = Qt.width, se = Qt.height;
            } else
              me = ge, Ae = ke, Re = se = Wt.size(n, N);
            if (Jt = Wt.fill(n, N), Fe = Wt.stroke(n, N), qi)
              N == li && qe <= Ne.prox && (T = me, M = Ae, W = Re, at = se, st = le, tt = Jt, U = Fe);
            else {
              let Qt = pe[N];
              Qt != null && (Zi[N] = me, Ji[N] = Ae, sl(Qt, Re, se, le), rl(Qt, Jt, Fe), Be(Qt, _e(me), _e(Ae), q, C));
            }
          }
        }
      }
      if (qi) {
        let N = Ne.prox, _t = Ei == null ? qe <= N : qe > N || li != Ei;
        if (fe || _t) {
          let kt = pe[0];
          kt != null && (Zi[0] = T, Ji[0] = M, sl(kt, W, at, st), rl(kt, tt, U), Be(kt, _e(T), _e(M), q, C));
        }
      }
    }
    if (vt.show && oi)
      if (o != null) {
        let [y, x] = Et.scales, [P, T] = Et.match, [M, W] = o.cursor.sync.scales, at = o.cursor.drag;
        if (Lt = at._x, Rt = at._y, Lt || Rt) {
          let { left: st, top: tt, width: U, height: N } = o.select, _t = o.scales[M].ori, kt = o.posToVal, Bt, ft, At, oe, Zt, ge = y != null && P(y, M), ke = x != null && T(x, W);
          ge && Lt ? (_t == 0 ? (Bt = st, ft = U) : (Bt = tt, ft = N), At = k[y], oe = z(kt(Bt, M), At, m, 0), Zt = z(kt(Bt + ft, M), At, m, 0), Nn(Ce(oe, Zt), Dt(Zt - oe))) : Nn(0, m), ke && Rt ? (_t == 1 ? (Bt = st, ft = U) : (Bt = tt, ft = N), At = k[x], oe = V(kt(Bt, W), At, _, 0), Zt = V(kt(Bt + ft, W), At, _, 0), Hn(Ce(oe, Zt), Dt(Zt - oe))) : Hn(0, _);
        } else
          oo();
      } else {
        let y = Dt(ws - _s), x = Dt(xs - ys);
        if (A.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        Lt = Ut.x && y >= Ut.dist, Rt = Ut.y && x >= Ut.dist;
        let P = Ut.uni;
        P != null ? Lt && Rt && (Lt = y >= P, Rt = x >= P, !Lt && !Rt && (x > y ? Rt = !0 : Lt = !0)) : Ut.x && Ut.y && (Lt || Rt) && (Lt = Rt = !0);
        let T, M;
        Lt && (A.ori == 0 ? (T = rn, M = bt) : (T = on, M = $t), Nn(Ce(T, M), Dt(M - T)), Rt || Hn(0, _)), Rt && (A.ori == 1 ? (T = rn, M = bt) : (T = on, M = $t), Hn(Ce(T, M), Dt(M - T)), Lt || Nn(0, m)), !Lt && !Rt && (Nn(0, 0), Hn(0, 0));
      }
    if (Ut._x = Lt, Ut._y = Rt, o == null) {
      if (c) {
        if (Ns != null) {
          let [y, x] = Et.scales;
          Et.values[0] = y != null ? Le(A.ori == 0 ? bt : $t, y) : null, Et.values[1] = x != null ? Le(A.ori == 1 ? bt : $t, x) : null;
        }
        Rn(ho, n, bt, $t, q, C, u);
      }
      if (Ki) {
        let y = c && Et.setSeries, x = Ne.prox;
        Ei == null ? qe <= x && He(li, ln, !0, y) : qe > x ? He(null, ln, !0, y) : li != Ei && He(li, ln, !0, y);
      }
    }
    fe && (X.idx = u, io()), a !== !1 && Ft("setCursor");
  }
  let ai = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ai == null && Ln(!1), ai;
    }
  });
  function Ln(o = !1) {
    o ? ai = null : (ai = E.getBoundingClientRect(), Ft("syncRect", ai));
  }
  function ks(o, a, c, u, f, m, _) {
    O._lock || oi && o != null && o.movementX == 0 && o.movementY == 0 || (no(o, a, c, u, f, m, _, !1, o != null), o != null ? Pi(null, !0, !0) : Pi(a, !0, !1));
  }
  function no(o, a, c, u, f, m, _, y, x) {
    if (ai == null && Ln(!1), ki(o), o != null)
      c = o.clientX - ai.left, u = o.clientY - ai.top;
    else {
      if (c < 0 || u < 0) {
        bt = -10, $t = -10;
        return;
      }
      let [P, T] = Et.scales, M = a.cursor.sync, [W, at] = M.values, [st, tt] = M.scales, [U, N] = Et.match, _t = a.axes[0].side % 2 == 1, kt = A.ori == 0 ? q : C, Bt = A.ori == 1 ? q : C, ft = _t ? m : f, At = _t ? f : m, oe = _t ? u : c, Zt = _t ? c : u;
      if (st != null ? c = U(P, st) ? h(W, k[P], kt, 0) : -10 : c = kt * (oe / ft), tt != null ? u = N(T, tt) ? h(at, k[T], Bt, 0) : -10 : u = Bt * (Zt / At), A.ori == 1) {
        let ge = c;
        c = u, u = ge;
      }
    }
    x && (a == null || a.cursor.event.type == ho) && ((c <= 1 || c >= q - 1) && (c = Di(c, q)), (u <= 1 || u >= C - 1) && (u = Di(u, C))), y ? (_s = c, ys = u, [rn, on] = O.move(n, c, u)) : (bt = c, $t = u);
  }
  const ro = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function oo() {
    dr(ro, !1);
  }
  let As, Es, Ps, Ts;
  function Cs(o, a, c, u, f, m, _) {
    oi = !0, Lt = Rt = Ut._x = Ut._y = !1, no(o, a, c, u, f, m, _, !0, !1), o != null && (qt(fo, So, Ms, !1), Rn(Js, n, rn, on, q, C, null));
    let { left: y, top: x, width: P, height: T } = vt;
    As = y, Es = x, Ps = P, Ts = T;
  }
  function Ms(o, a, c, u, f, m, _) {
    oi = Ut._x = Ut._y = !1, no(o, a, c, u, f, m, _, !1, !0);
    let { left: y, top: x, width: P, height: T } = vt, M = P > 0 || T > 0, W = As != y || Es != x || Ps != P || Ts != T;
    if (M && W && dr(vt), Ut.setScale && M && W) {
      let at = y, st = P, tt = x, U = T;
      if (A.ori == 1 && (at = x, st = T, tt = y, U = P), Lt && si(
        D,
        Le(at, D),
        Le(at + st, D)
      ), Rt)
        for (let N in k) {
          let _t = k[N];
          N != D && _t.from == null && _t.min != pt && si(
            N,
            Le(tt + U, N),
            Le(tt, N)
          );
        }
      oo();
    } else O.lock && (O._lock = !O._lock, Pi(a, !0, o != null));
    o != null && (Wi(fo, So), Rn(fo, n, bt, $t, q, C, null));
  }
  function dc(o, a, c, u, f, m, _) {
    if (O._lock)
      return;
    ki(o);
    let y = oi;
    if (oi) {
      let x = !0, P = !0, T = 10, M, W;
      A.ori == 0 ? (M = Lt, W = Rt) : (M = Rt, W = Lt), M && W && (x = bt <= T || bt >= q - T, P = $t <= T || $t >= C - T), M && x && (bt = bt < rn ? 0 : q), W && P && ($t = $t < on ? 0 : C), Pi(null, !0, !0), oi = !1;
    }
    bt = -10, $t = -10, dt.fill(null), Pi(null, !0, !0), y && (oi = y);
  }
  function Ds(o, a, c, u, f, m, _) {
    O._lock || (ki(o), Ir(), oo(), o != null && Rn(tl, n, bt, $t, q, C, null));
  }
  function zs() {
    B.forEach(sd), Br(n.width, n.height, !0);
  }
  Hi(Sr, fn, zs);
  const an = {};
  an.mousedown = Cs, an.mousemove = ks, an.mouseup = Ms, an.dblclick = Ds, an.setSeries = (o, a, c, u) => {
    let f = Et.match[2];
    c = f(n, a, c), c != -1 && He(c, u, !0, !1);
  }, Kt && (qt(Js, E, Cs), qt(ho, E, ks), qt(Qs, E, (o) => {
    ki(o), Ln(!1);
  }), qt(Xs, E, dc), qt(tl, E, Ds), Do.add(n), n.syncRect = Ln);
  const fr = n.hooks = t.hooks || {};
  function Ft(o, a, c) {
    Qr ? On.push([o, a, c]) : o in fr && fr[o].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (t.plugins || []).forEach((o) => {
    for (let a in o.hooks)
      fr[a] = (fr[a] || []).concat(o.hooks[a]);
  });
  const Os = (o, a, c) => c, Et = Pt({
    key: null,
    setSeries: !1,
    filters: {
      pub: hl,
      sub: hl
    },
    scales: [D, w[1] ? w[1].scale : null],
    match: [dl, dl, Os],
    values: [null, null]
  }, O.sync);
  Et.match.length == 2 && Et.match.push(Os), O.sync = Et;
  const Ns = Et.key, so = Sa(Ns);
  function Rn(o, a, c, u, f, m, _) {
    Et.filters.pub(o, a, c, u, f, m, _) && so.pub(o, a, c, u, f, m, _);
  }
  so.sub(n);
  function fc(o, a, c, u, f, m, _) {
    Et.filters.sub(o, a, c, u, f, m, _) && an[o](null, a, c, u, f, m, _);
  }
  n.pub = fc;
  function pc() {
    so.unsub(n), Do.delete(n), yi.clear(), Eo(Sr, fn, zs), p.remove(), ut?.remove(), Ft("destroy");
  }
  n.destroy = pc;
  function lo() {
    Ft("init", t, e), hs(e || t.data, !1), R[D] ? Xr(D, R[D]) : Ir(), sr = vt.show && (vt.width > 0 || vt.height > 0), Si = fe = !0, Br(t.width, t.height);
  }
  return w.forEach(cs), B.forEach(Ga), i ? i instanceof HTMLElement ? (i.appendChild(p), lo()) : i(n, lo) : lo(), n;
}
jt.assign = Pt;
jt.fmtNum = qo;
jt.rangeNum = kr;
jt.rangeLog = Cr;
jt.rangeAsinh = Yo;
jt.orient = Ui;
jt.pxRatio = ct;
jt.join = Ju;
jt.fmtDate = Jo, jt.tzDate = ah;
jt.sync = Sa;
{
  jt.addGap = Vh, jt.clipGaps = zr;
  let t = jt.paths = {
    points: Ca
  };
  t.linear = Da, t.stepped = Yh, t.bars = Kh, t.spline = Zh;
}
const Ha = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}', rs = 24;
async function La(t, e, i = rs) {
  const n = /* @__PURE__ */ new Date(), r = new Date(n.getTime() - i * 60 * 60 * 1e3);
  return t.callWS({
    type: "history/history_during_period",
    start_time: r.toISOString(),
    end_time: n.toISOString(),
    entity_ids: e,
    minimal_response: !1,
    no_attributes: !0
  });
}
function pn(t) {
  if (!t) return [];
  const e = [];
  for (const i of t) {
    const n = parseFloat(i.s);
    Number.isFinite(n) && e.push([i.lu, n]);
  }
  return e.sort((i, n) => i[0] - n[0]), e;
}
function Ra(t, e) {
  const i = /* @__PURE__ */ new Set();
  for (const s of t) for (const [l] of s) i.add(l);
  if (i.size === 0)
    return [[e], ...t.map(() => [null])];
  const n = [...i].sort((s, l) => s - l), r = t.map((s) => {
    let l = -1, h = null;
    return n.map((d) => {
      for (; l + 1 < s.length && s[l + 1][0] <= d; )
        l++, h = s[l][1];
      return h;
    });
  });
  return [n, ...r];
}
var ld = Object.defineProperty, Lr = (t, e, i, n) => {
  for (var r = void 0, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = l(e, i, r) || r);
  return r && ld(e, i, r), r;
};
class En extends zt {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._hasFetched = !1, this._fetchGen = 0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._destroyPlot(), this._hasFetched = !1;
  }
  _observeResize() {
    if (!this._host || this._resizeObserver) return;
    const e = this.chartHeight;
    this._resizeObserver = new ResizeObserver((i) => {
      const n = i[0]?.contentRect.width ?? 0;
      this._plot && n > 0 && this._plot.setSize({ width: n, height: e });
    }), this._resizeObserver.observe(this._host);
  }
  _destroyPlot() {
    this._plot && (this._plot.destroy(), this._plot = null), this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null);
  }
}
Lr([
  rt()
], En.prototype, "_loading");
Lr([
  rt()
], En.prototype, "_error");
Lr([
  rt()
], En.prototype, "_empty");
Lr([
  xn(".chart-host")
], En.prototype, "_host");
var ad = Object.defineProperty, cd = Object.getOwnPropertyDescriptor, Pn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? cd(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && ad(e, i, r), r;
};
const Oo = 260;
let pi = class extends En {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this._intervals = [];
  }
  get chartHeight() {
    return Oo;
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
    const t = ++this._fetchGen;
    this._loading = !0, this._error = null, this._empty = !1;
    const e = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (i) => !!i
    );
    try {
      const i = await La(this.hass, e, rs);
      if (t !== this._fetchGen) return;
      this._renderPlot(i), this._loading = !1;
    } catch (i) {
      if (t !== this._fetchGen) return;
      this._error = i instanceof Error ? i.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
    }
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(t, e) {
    if (!t) return [];
    const i = [...t].sort((r, s) => r.lu - s.lu), n = [];
    for (let r = 0; r < i.length; r++) {
      const s = i[r].lu, l = i[r + 1]?.lu ?? e, h = i[r].s;
      (h === "heating" || h === "cooling") && n.push({ start: s, end: l, action: h });
    }
    return n;
  }
  _renderPlot(t) {
    if (!this._host) return;
    const e = Math.floor(Date.now() / 1e3), i = pn(t[this.roomEntity]), n = pn(t[this.lowEntity]), r = pn(t[this.highEntity]);
    if (this._intervals = this._actionIntervals(t[this.actionEntity], e), i.length === 0 && n.length === 0 && r.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = Ra([i, n, r], e), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new jt(l, s, this._host), this._observeResize());
  }
  _buildOpts(t) {
    const e = getComputedStyle(this), i = e.getPropertyValue("--cb-action-heating").trim() || "#d9603f", n = e.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", r = e.getPropertyValue("--primary-color").trim() || "#03a9f4";
    return {
      width: t,
      height: Oo,
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
              g <= b || (l.fillStyle = p.action === "heating" ? Ol(i, 0.18) : Ol(n, 0.18), l.fillRect(b, h, g - b, d));
            }
            l.restore();
          }
        ]
      }
    };
  }
  render() {
    return !this.hass || !this.roomEntity ? $`<div class="status">No room temperature sensor for this zone.</div>` : $`
      ${this._loading ? $`<div class="status">Loading 24 h history…</div>` : G}
      ${this._error ? $`<div class="status">${this._error}</div>` : G}
      ${this._empty ? $`<div class="status">
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
pi.styles = [
  Yt,
  Kn(Ha),
  Vt`
      :host {
        display: block;
        width: 100%;
        color-scheme: light dark;
      }
      .chart-host {
        width: 100%;
        height: ${Kn(Oo)}px;
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
Pn([
  F({ attribute: !1 })
], pi.prototype, "hass", 2);
Pn([
  F({ type: String })
], pi.prototype, "roomEntity", 2);
Pn([
  F({ type: String })
], pi.prototype, "lowEntity", 2);
Pn([
  F({ type: String })
], pi.prototype, "highEntity", 2);
Pn([
  F({ type: String })
], pi.prototype, "actionEntity", 2);
pi = Pn([
  Gt("comfort-band-history-chart")
], pi);
function Ol(t, e) {
  const i = t.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), d = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${d}, ${e})`;
  }
  const r = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return r ? `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${e})` : i;
}
var ud = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, nr = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? hd(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && ud(e, i, r), r;
};
const No = 220;
let Bi = class extends En {
  constructor() {
    super(...arguments), this.roomEntity = "", this.apparentEntity = "", this.humidityEntity = "";
  }
  get chartHeight() {
    return No;
  }
  updated(t) {
    if (!this._hasFetched) {
      this._hasFetched = !0, this._fetch();
      return;
    }
    (t.has("roomEntity") || t.has("apparentEntity") || t.has("humidityEntity")) && this._fetch();
  }
  async _fetch() {
    if (!this.hass || !this.roomEntity || !this.apparentEntity || !this.humidityEntity) return;
    const t = ++this._fetchGen;
    this._loading = !0, this._error = null, this._empty = !1;
    const e = [this.roomEntity, this.apparentEntity, this.humidityEntity];
    try {
      const i = await La(this.hass, e, rs);
      if (t !== this._fetchGen) return;
      this._renderPlot(i), this._loading = !1;
    } catch (i) {
      if (t !== this._fetchGen) return;
      this._error = i instanceof Error ? i.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
    }
  }
  _renderPlot(t) {
    if (!this._host) return;
    const e = Math.floor(Date.now() / 1e3), i = pn(t[this.roomEntity]), n = pn(t[this.apparentEntity]), r = pn(t[this.humidityEntity]);
    if (i.length === 0 && n.length === 0 && r.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = Ra([i, n, r], e), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new jt(l, s, this._host), this._observeResize());
  }
  _buildOpts(t) {
    const e = getComputedStyle(this), i = e.getPropertyValue("--primary-color").trim() || "#03a9f4", n = e.getPropertyValue("--cb-action-heating").trim() || "#d9603f", r = e.getPropertyValue("--secondary-text-color").trim() || "#727272";
    return {
      width: t,
      height: No,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: {
        x: { time: !0 },
        y: { auto: !0 },
        // Pin humidity to 0-100 so a 35-45 % working band doesn't
        // auto-zoom into looking like wild swings; users want the
        // absolute scale here.
        y2: { auto: !1, range: [0, 100] }
      },
      axes: [
        {
          stroke: "var(--secondary-text-color)",
          grid: { stroke: "var(--divider-color)" }
        },
        {
          scale: "y",
          side: 3,
          size: 38,
          stroke: "var(--secondary-text-color)",
          grid: { stroke: "var(--divider-color)" },
          values: (s, l) => l.map((h) => `${h.toFixed(1)}°`)
        },
        {
          scale: "y2",
          side: 1,
          size: 38,
          stroke: "var(--secondary-text-color)",
          // Hide the secondary grid to avoid two overlapping grid sets.
          grid: { show: !1 },
          values: (s, l) => l.map((h) => `${h.toFixed(0)}%`)
        }
      ],
      series: [
        {},
        {
          label: "Room",
          scale: "y",
          stroke: i,
          width: 2,
          spanGaps: !0
        },
        {
          label: "Apparent",
          scale: "y",
          stroke: n,
          width: 2,
          dash: [4, 3],
          spanGaps: !0
        },
        {
          label: "Humidity",
          scale: "y2",
          stroke: r,
          width: 1.2,
          spanGaps: !0
        }
      ]
    };
  }
  render() {
    if (!this.hass || !this.roomEntity || !this.apparentEntity || !this.humidityEntity)
      return $`<div class="status">Apparent-temperature comparison unavailable.</div>`;
    const t = this._loading || this._error !== null || this._empty;
    return $`
      ${this._loading ? $`<div class="status">Loading 24 h history…</div>` : G}
      ${this._error ? $`<div class="status">${this._error}</div>` : G}
      ${this._empty ? $`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : G}
      <div class="chart-host ${t ? "idle" : ""}"></div>
      ${t ? G : $`<div class="legend">
            <span
              ><span class="swatch" style="background:var(--primary-color)"></span>Room (°C)</span
            >
            <span
              ><span class="swatch dashed" style="color:var(--cb-action-heating)"></span>Apparent
              (°C)</span
            >
            <span
              ><span class="swatch" style="background:var(--secondary-text-color)"></span>Humidity
              (%, right axis)</span
            >
          </div>`}
    `;
  }
};
Bi.styles = [
  Yt,
  Kn(Ha),
  Vt`
      :host {
        display: block;
        width: 100%;
        color-scheme: light dark;
        /* Sit beneath the band chart with a visible gap. */
        margin-top: var(--cb-gap-lg);
      }
      .chart-host {
        width: 100%;
        height: ${Kn(No)}px;
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
      /* "Dashed" swatch to mirror the dashed apparent stroke in the chart. */
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
nr([
  F({ attribute: !1 })
], Bi.prototype, "hass", 2);
nr([
  F({ type: String })
], Bi.prototype, "roomEntity", 2);
nr([
  F({ type: String })
], Bi.prototype, "apparentEntity", 2);
nr([
  F({ type: String })
], Bi.prototype, "humidityEntity", 2);
Bi = nr([
  Gt("comfort-band-apparent-chart")
], Bi);
var dd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, os = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? fd(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && dd(e, i, r), r;
};
let Xn = class extends zt {
  render() {
    const t = this.entities?.roomTemperature;
    if (!t)
      return $`<div class="empty">No room temperature sensor for this zone.</div>`;
    const e = this.entities?.apparentTemperature, i = ql(this.hass, t);
    return $`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${t}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${this._renderApparentSection(t, e, i)}
    `;
  }
  /** Three states, in priority order:
   *  1. apparent entity missing — pre-v0.4 backend, can't render the chart at all
   *     and pointing at Settings would just chain to another upgrade hint
   *  2. humidity sensor unconfigured — the integration supports it, user just
   *     needs to attach one via the OptionsFlow surfaced in the Settings tab
   *  3. both present — render the chart */
  _renderApparentSection(t, e, i) {
    return e ? i ? $`<comfort-band-apparent-chart
      .hass=${this.hass}
      .roomEntity=${t}
      .apparentEntity=${e}
      .humidityEntity=${i}
    ></comfort-band-apparent-chart>` : $`<div class="hint">
        Configure a humidity sensor in the Settings tab to see how apparent temperature diverges
        from the raw reading.
      </div>` : $`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to see how apparent
        temperature diverges from the raw reading.
      </div>`;
  }
};
Xn.styles = [
  Yt,
  Vt`
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
os([
  F({ attribute: !1 })
], Xn.prototype, "hass", 2);
os([
  F({ attribute: !1 })
], Xn.prototype, "entities", 2);
Xn = os([
  Gt("comfort-band-insights-tab")
], Xn);
var pd = Object.defineProperty, gd = Object.getOwnPropertyDescriptor, Tn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? gd(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && pd(e, i, r), r;
};
const Je = 15, Ue = 0.5, Ze = 14, Ie = 28, Nl = 4, md = 500, un = 600, br = 200, Hl = 0, Ho = 24 * 60 - Je, vo = [0, 6, 12, 18, 24], Ll = [14, 18, 22, 26];
function Pe(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t);
  return e ? parseInt(e[1], 10) * 60 + parseInt(e[2], 10) : 0;
}
function _o(t) {
  const e = Math.max(0, Math.min(Ho, t)), i = Math.floor(e / 60), n = e % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function bd(t) {
  return Math.round(t / Je) * Je;
}
function yo(t) {
  return Math.round(t / Ue) * Ue;
}
function be(t, e, i) {
  return Math.min(i, Math.max(e, t));
}
let gi = class extends zt {
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
      }, md), this._drag = r;
    }, this._onHandlePointerMove = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "handle" || e.longPressed) return;
      const i = t.clientX - e.startX, n = t.clientY - e.startY;
      if (!e.moved && Math.hypot(i, n) < Nl) return;
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
      ), h = this._clientToTemp(t.clientY, s);
      let d = e.origin.low, p = e.origin.high;
      e.handle === "low" ? d = be(h, Ze, p - Ue) : p = be(h, d + Ue, Ie), this._preview = { at: _o(l), low: d, high: p };
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
      Math.hypot(i, n) >= Nl && (e.moved = !0);
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
      const s = i.getBoundingClientRect(), l = be(this._clientToMinutes(t.clientX, s), Hl, Ho);
      for (const b of this.transitions) if (Pe(b.at) === l) return;
      const h = this._clientToTemp(t.clientY, s), d = be(yo(h - 1.5), Ze, Ie - Ue), p = be(yo(h + 1.5), d + Ue, Ie);
      this._fire("transition-add", { at: _o(l), low: d, high: p });
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
          n = -Je;
          break;
        case "ArrowRight":
          n = Je;
          break;
        case "ArrowUp":
          r = Ue;
          break;
        case "ArrowDown":
          r = -Ue;
          break;
        default:
          return;
      }
      t.preventDefault();
      const s = this._timeRangeFor(e.at), l = be(Pe(e.at) + n, s.min, s.max);
      let h = e.low, d = e.high;
      if (i === "low" ? h = be(e.low + r, Ze, d - Ue) : d = be(e.high + r, h + Ue, Ie), l === Pe(e.at) && h === e.low && d === e.high)
        return;
      const p = _o(l);
      this._focusedAt === e.at && (this._focusedAt = p), this._fire("transition-update", {
        oldAt: e.at,
        transition: { at: p, low: h, high: d }
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
    return t / (24 * 60) * un;
  }
  _tempToY(t) {
    const e = be(t, Ze, Ie);
    return br - (e - Ze) / (Ie - Ze) * br;
  }
  _clientToMinutes(t, e) {
    if (e.width === 0) return 0;
    const i = be((t - e.left) / e.width, 0, 1);
    return bd(i * 24 * 60);
  }
  _clientToTemp(t, e) {
    if (e.height === 0) return Ze;
    const i = be((t - e.top) / e.height, 0, 1), n = Ie - i * (Ie - Ze);
    return yo(n);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((t) => Pe(t.at)).sort((t, e) => t - e);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(t) {
    const e = Pe(t), i = this._sortedAts().filter((s) => s !== e);
    let n = Hl, r = Ho;
    for (const s of i)
      s < e && s + Je > n && (n = s + Je), s > e && s - Je < r && (r = s - Je);
    return { min: n, max: r };
  }
  _fire(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const t = [...this.transitions].sort((i, n) => Pe(i.at) - Pe(n.at));
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
      const l = this._timeToX(Pe(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[e])]), r = s[e];
    }
    return n.push([un, this._tempToY(r)]), n;
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
    return $`
      <div class="chart">
        <svg
          viewBox="0 0 ${un} ${br}"
          preserveAspectRatio="none"
          role="group"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          <title>Schedule chart for the active profile</title>
          ${Ll.map(
      (h) => hi`<line class="grid" x1="0" x2=${un} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${vo.map(
      (h) => hi`<line class="grid" y1="0" y2=${br} x1=${h / 24 * un} x2=${h / 24 * un}></line>`
    )}
          ${t.length > 0 ? hi`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${t.map((h) => {
      const d = this._timeToX(Pe(h.at)), p = this._tempToY(h.low), b = this._tempToY(h.high), g = this._focusedAt === h.at && this._focusedHandle === "low", v = this._focusedAt === h.at && this._focusedHandle === "high", S = this._drag?.kind === "handle" && this._drag.origin.at === h.at ? this._drag.handle : null, E = `Low handle at ${h.at}, ${h.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, H = `High handle at ${h.at}, ${h.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, I = `handle low${g ? " focused" : ""}${S === "low" ? " dragging" : ""}`, j = `handle high${v ? " focused" : ""}${S === "high" ? " dragging" : ""}`;
      return hi`
              <circle
                class=${I}
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
        ${Ll.map(
      (h) => $`<div
              class="axis-label y"
              style="top: ${(Ie - h) / (Ie - Ze) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${vo.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === vo.length - 1 ? "axis-label x end" : "axis-label x";
      return $`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
        ${this.transitions.length === 0 ? $`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
gi.styles = [
  Yt,
  Vt`
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
Tn([
  F({ type: Array })
], gi.prototype, "transitions", 2);
Tn([
  rt()
], gi.prototype, "_drag", 2);
Tn([
  rt()
], gi.prototype, "_preview", 2);
Tn([
  rt()
], gi.prototype, "_focusedAt", 2);
Tn([
  rt()
], gi.prototype, "_focusedHandle", 2);
gi = Tn([
  Gt("comfort-band-schedule-chart")
], gi);
var vd = Object.defineProperty, _d = Object.getOwnPropertyDescriptor, vi = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? _d(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && vd(e, i, r), r;
};
let je = class extends zt {
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
    return $`
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
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : $`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
je.styles = [
  Yt,
  Vt`
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
  F({ type: Object })
], je.prototype, "transition", 2);
vi([
  F({ type: Boolean })
], je.prototype, "isNew", 2);
vi([
  rt()
], je.prototype, "_at", 2);
vi([
  rt()
], je.prototype, "_low", 2);
vi([
  rt()
], je.prototype, "_high", 2);
vi([
  rt()
], je.prototype, "_error", 2);
vi([
  xn('input[name="at"]')
], je.prototype, "_atInput", 2);
je = vi([
  Gt("transition-edit-dialog")
], je);
var yd = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, Ge = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? wd(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && yd(e, i, r), r;
};
function wo(t, e) {
  return Pe(t.at) - Pe(e.at);
}
let we = class extends zt {
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
      const { oldAt: e, transition: i } = t.detail, n = this._transitions.filter((r) => r.at !== e && r.at !== i.at).concat(i).sort(wo);
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
      i.sort(wo), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (t) => {
      const e = this._transitions.filter((i) => i.at !== t.detail.at);
      await this._writeSchedule(e), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._profile === "" && (this._profile = Rl(this.hass) ?? "home", this._subscribe());
  }
  updated(t) {
    if (t.has("hass") && this.hass) {
      const e = Rl(this.hass);
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
      const e = await Gc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          t === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(wo) : [], this._loading = !1);
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
      await Yc(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: t
      });
    } catch (i) {
      this._transitions = e, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return G;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? xd(this._transitions),
        high: this._newHigh ?? $d(this._transitions)
      };
      return $`
        <transition-edit-dialog
          .transition=${t}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return $`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? $`<div class="loading">Loading schedule…</div>` : this._error ? $`<div class="error" role="alert">${this._error}</div>` : $`
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
    return this._transitions.length === 0 ? G : $`
      <ul class="list">
        ${this._transitions.map((t) => {
      const e = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: t } }));
      return $`
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
we.styles = [
  Yt,
  Vt`
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
Ge([
  F({ attribute: !1 })
], we.prototype, "hass", 2);
Ge([
  F({ type: String })
], we.prototype, "zone", 2);
Ge([
  rt()
], we.prototype, "_profile", 2);
Ge([
  rt()
], we.prototype, "_transitions", 2);
Ge([
  rt()
], we.prototype, "_loading", 2);
Ge([
  rt()
], we.prototype, "_error", 2);
Ge([
  rt()
], we.prototype, "_mode", 2);
Ge([
  rt()
], we.prototype, "_editing", 2);
Ge([
  rt()
], we.prototype, "_newAt", 2);
we = Ge([
  Gt("comfort-band-schedule-tab")
], we);
function Rl(t) {
  const e = Kl(t);
  return e ? t.states[e]?.state ?? null : null;
}
function xd(t) {
  return t.length === 0 ? 19 : t[t.length - 1].low;
}
function $d(t) {
  return t.length === 0 ? 22 : t[t.length - 1].high;
}
var Sd = Object.defineProperty, kd = Object.getOwnPropertyDescriptor, Cn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? kd(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Sd(e, i, r), r;
};
let mi = class extends zt {
  constructor() {
    super(...arguments), this.zone = "", this._pendingByEntity = {}, this._error = null, this._onToggle = async (t) => {
      if (!this.hass) return;
      const e = !this._isOn(t);
      this._pendingByEntity = { ...this._pendingByEntity, [t]: e }, this._error = null;
      try {
        await this.hass.callService("switch", e ? "turn_on" : "turn_off", {
          entity_id: t
        });
      } catch (i) {
        this._error = i instanceof Error ? i.message : "Failed to toggle switch.";
      } finally {
        const i = { ...this._pendingByEntity };
        delete i[t], this._pendingByEntity = i;
      }
    };
  }
  /** Resolve the displayed state: optimistic flip wins if one is in flight,
   *  otherwise read the entity. */
  _isOn(t) {
    const e = this._pendingByEntity[t];
    return e ?? this.hass?.states[t]?.state === "on";
  }
  render() {
    if (!this.hass || !this.entities) return G;
    const t = this.entities.useApparentTemperature, e = this.entities.learningEnabled;
    if (t === null || e === null)
      return $`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const i = ql(this.hass, this.entities.roomTemperature);
    return $`
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : G}
      ${this._renderToggle({
      entityId: t,
      title: "Use apparent temperature",
      desc: $`When on, heating and cooling decisions use the humidity-adjusted "feels like"
        value instead of the raw sensor. Falls back to the raw value automatically if the humidity
        sensor is unavailable.`
    })}
      ${this._renderToggle({
      entityId: e,
      title: "Learning enabled",
      desc: $`Reserved for upcoming features (suggested-schedule nudges, predictive control).
        Has no effect today.`
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
  _renderToggle(t) {
    const e = this._isOn(t.entityId), i = this._pendingByEntity[t.entityId] !== void 0;
    return $`
      <div class="row">
        <div class="row-label">
          <div class="title">${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <button
          class="toggle"
          role="switch"
          aria-checked=${e ? "true" : "false"}
          aria-disabled=${i ? "true" : "false"}
          aria-label=${t.title}
          @click=${i ? null : () => this._onToggle(t.entityId)}
        >
          <span class="knob"></span>
        </button>
      </div>
    `;
  }
};
mi.styles = [
  Yt,
  Vt`
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
Cn([
  F({ attribute: !1 })
], mi.prototype, "hass", 2);
Cn([
  F({ type: String })
], mi.prototype, "zone", 2);
Cn([
  F({ attribute: !1 })
], mi.prototype, "entities", 2);
Cn([
  rt()
], mi.prototype, "_pendingByEntity", 2);
Cn([
  rt()
], mi.prototype, "_error", 2);
mi = Cn([
  Gt("comfort-band-settings-tab")
], mi);
var Ad = Object.defineProperty, Ed = Object.getOwnPropertyDescriptor, _i = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ed(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Ad(e, i, r), r;
};
const Mi = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" }
];
let Ve = class extends zt {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (t) => {
      this._activeTab = t;
    }, this._onTablistKeydown = (t) => {
      const e = Mi.findIndex((r) => r.id === this._activeTab);
      if (e < 0) return;
      let i;
      switch (t.key) {
        case "ArrowLeft":
          i = (e - 1 + Mi.length) % Mi.length;
          break;
        case "ArrowRight":
          i = (e + 1) % Mi.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Mi.length - 1;
          break;
        default:
          return;
      }
      t.preventDefault();
      const n = Mi[i].id;
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
  selectTab(t) {
    this._activeTab = t;
  }
  render() {
    if (!this._isOpen) return G;
    const t = this.zoneName || this.zone || "Comfort Band";
    return $`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${t}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Mi.map(
      (e) => $`
                <button
                  id="cb-tab-${e.id}"
                  role="tab"
                  aria-selected=${this._activeTab === e.id}
                  aria-controls="cb-panel"
                  tabindex=${this._activeTab === e.id ? 0 : -1}
                  @click=${() => this._onSelectTab(e.id)}
                >
                  ${e.label}
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
        return $`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return $`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return $`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "settings":
        return $`<comfort-band-settings-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`;
      case "insights":
        return $`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Ve.styles = [
  Yt,
  Vt`
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
_i([
  F({ attribute: !1 })
], Ve.prototype, "hass", 2);
_i([
  F({ type: String })
], Ve.prototype, "zone", 2);
_i([
  F({ type: String })
], Ve.prototype, "zoneName", 2);
_i([
  F({ attribute: !1 })
], Ve.prototype, "entities", 2);
_i([
  rt()
], Ve.prototype, "_activeTab", 2);
_i([
  rt()
], Ve.prototype, "_isOpen", 2);
_i([
  xn("dialog")
], Ve.prototype, "_dialog", 2);
Ve = _i([
  Gt("comfort-band-modal")
], Ve);
var Pd = Object.defineProperty, Td = Object.getOwnPropertyDescriptor, ss = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Td(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Pd(e, i, r), r;
};
let tr = class extends zt {
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
      return $`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const e = this.config.variant === "mini" ? "mini" : "tile";
    return $`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? $`<option value="" disabled selected>Select a zone…</option>` : null}
          ${t.map(
      (i) => $` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
tr.styles = [
  Yt,
  Vt`
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
ss([
  F({ attribute: !1 })
], tr.prototype, "hass", 2);
ss([
  F({ attribute: !1 })
], tr.prototype, "config", 2);
tr = ss([
  Gt("comfort-band-card-editor")
], tr);
var Cd = Object.defineProperty, Md = Object.getOwnPropertyDescriptor, Rr = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Md(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && Cd(e, i, r), r;
};
let wn = class extends zt {
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
    if (!this._config || !this.hass) return $``;
    const t = this._config.zone, e = cu(this.hass, t);
    if (e.deviceId === null)
      return $`<div class="placeholder">
        Comfort Band zone <code>${t}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, e);
    return $`
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
      ${i ? null : $`<comfort-band-modal
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
wn.styles = [
  Yt,
  Vt`
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
Rr([
  F({ attribute: !1 })
], wn.prototype, "hass", 2);
Rr([
  rt()
], wn.prototype, "_config", 2);
Rr([
  xn("comfort-band-modal")
], wn.prototype, "_modal", 2);
wn = Rr([
  Gt("comfort-band-card")
], wn);
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
