const ur = globalThis, Co = ur.ShadowRoot && (ur.ShadyCSS === void 0 || ur.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, To = Symbol(), Cs = /* @__PURE__ */ new WeakMap();
let Ll = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== To) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Co && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Cs.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Cs.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Po = (e) => new Ll(typeof e == "string" ? e : e + "", void 0, To), je = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new Ll(i, e, To);
}, fc = (e, t) => {
  if (Co) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = ur.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ts = Co ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Po(i);
})(e) : e;
const { is: pc, defineProperty: gc, getOwnPropertyDescriptor: mc, getOwnPropertyNames: bc, getOwnPropertySymbols: _c, getPrototypeOf: vc } = Object, yr = globalThis, Ps = yr.trustedTypes, yc = Ps ? Ps.emptyScript : "", wc = yr.reactiveElementPolyfillSupport, Hn = (e, t) => e, dr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? yc : null;
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
} }, Do = (e, t) => !pc(e, t), Ds = { attribute: !0, type: String, converter: dr, reflect: !1, useDefault: !1, hasChanged: Do };
Symbol.metadata ??= Symbol("metadata"), yr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let sn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ds) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && gc(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: s } = mc(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ds;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Hn("elementProperties"))) return;
    const t = vc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Hn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Hn("properties"))) {
      const i = this.properties, n = [...bc(i), ..._c(i)];
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
      for (const r of n) i.unshift(Ts(r));
    } else t !== void 0 && i.push(Ts(t));
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
    return fc(t, this.constructor.elementStyles), t;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : dr).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : dr;
      this._$Em = r;
      const h = l.fromAttribute(i, s.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, r = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Do)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
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
sn.elementStyles = [], sn.shadowRootOptions = { mode: "open" }, sn[Hn("elementProperties")] = /* @__PURE__ */ new Map(), sn[Hn("finalized")] = /* @__PURE__ */ new Map(), wc?.({ ReactiveElement: sn }), (yr.reactiveElementVersions ??= []).push("2.1.2");
const Mo = globalThis, Ms = (e) => e, fr = Mo.trustedTypes, zs = fr ? fr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Hl = "$lit$", ai = `lit$${Math.random().toFixed(9).slice(2)}$`, Rl = "?" + ai, xc = `<${Rl}>`, zi = document, In = () => zi.createComment(""), Bn = (e) => e === null || typeof e != "object" && typeof e != "function", zo = Array.isArray, $c = (e) => zo(e) || typeof e?.[Symbol.iterator] == "function", to = `[ 	
\f\r]`, Pn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ns = /-->/g, Os = />/g, Si = RegExp(`>|${to}(?:([^\\s"'>=/]+)(${to}*=${to}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ls = /'/g, Hs = /"/g, Fl = /^(?:script|style|textarea|title)$/i, Il = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), w = Il(1), ci = Il(2), cn = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), Rs = /* @__PURE__ */ new WeakMap(), Pi = zi.createTreeWalker(zi, 129);
function Bl(e, t) {
  if (!zo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zs !== void 0 ? zs.createHTML(t) : t;
}
const kc = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Pn;
  for (let h = 0; h < i; h++) {
    const d = e[h];
    let p, b, g = -1, _ = 0;
    for (; _ < d.length && (l.lastIndex = _, b = l.exec(d), b !== null); ) _ = l.lastIndex, l === Pn ? b[1] === "!--" ? l = Ns : b[1] !== void 0 ? l = Os : b[2] !== void 0 ? (Fl.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = Si) : b[3] !== void 0 && (l = Si) : l === Si ? b[0] === ">" ? (l = r ?? Pn, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Si : b[3] === '"' ? Hs : Ls) : l === Hs || l === Ls ? l = Si : l === Ns || l === Os ? l = Pn : (l = Si, r = void 0);
    const k = l === Si && e[h + 1].startsWith("/>") ? " " : "";
    s += l === Pn ? d + xc : g >= 0 ? (n.push(p), d.slice(0, g) + Hl + d.slice(g) + ai + k) : d + ai + (g === -2 ? h : k);
  }
  return [Bl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Un {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, d = this.parts, [p, b] = kc(t, i);
    if (this.el = Un.createElement(p, n), Pi.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Pi.nextNode()) !== null && d.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Hl)) {
          const _ = b[l++], k = r.getAttribute(g).split(ai), E = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: s, name: E[2], strings: k, ctor: E[1] === "." ? Ac : E[1] === "?" ? Ec : E[1] === "@" ? Cc : wr }), r.removeAttribute(g);
        } else g.startsWith(ai) && (d.push({ type: 6, index: s }), r.removeAttribute(g));
        if (Fl.test(r.tagName)) {
          const g = r.textContent.split(ai), _ = g.length - 1;
          if (_ > 0) {
            r.textContent = fr ? fr.emptyScript : "";
            for (let k = 0; k < _; k++) r.append(g[k], In()), Pi.nextNode(), d.push({ type: 2, index: ++s });
            r.append(g[_], In());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Rl) d.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(ai, g + 1)) !== -1; ) d.push({ type: 7, index: s }), g += ai.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = zi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function un(e, t, i = e, n) {
  if (t === cn) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Bn(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = un(e, r._$AS(e, t.values), r, n)), t;
}
class Sc {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? zi).importNode(i, !0);
    Pi.currentNode = r;
    let s = Pi.nextNode(), l = 0, h = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let p;
        d.type === 2 ? p = new Gn(s, s.nextSibling, this, t) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (p = new Tc(s, this, t)), this._$AV.push(p), d = n[++h];
      }
      l !== d?.index && (s = Pi.nextNode(), l++);
    }
    return Pi.currentNode = zi, r;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Gn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, r) {
    this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = un(this, t, i), Bn(t) ? t === V || t == null || t === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : t !== this._$AH && t !== cn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : $c(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== V && Bn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(zi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Un.createElement(Bl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new Sc(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Rs.get(t.strings);
    return i === void 0 && Rs.set(t.strings, i = new Un(t)), i;
  }
  k(t) {
    zo(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of t) r === i.length ? i.push(n = new Gn(this.O(In()), this.O(In()), this, this.options)) : n = i[r], n._$AI(s), r++;
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
class wr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, r, s) {
    this.type = 1, this._$AH = V, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = V;
  }
  _$AI(t, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = un(this, t, i, 0), l = !Bn(t) || t !== this._$AH && t !== cn, l && (this._$AH = t);
    else {
      const h = t;
      let d, p;
      for (t = s[0], d = 0; d < s.length - 1; d++) p = un(this, h[n + d], i, d), p === cn && (p = this._$AH[d]), l ||= !Bn(p) || p !== this._$AH[d], p === V ? t = V : t !== V && (t += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ac extends wr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === V ? void 0 : t;
  }
}
class Ec extends wr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== V);
  }
}
class Cc extends wr {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = un(this, t, i, 0) ?? V) === cn) return;
    const n = this._$AH, r = t === V && n !== V || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== V && (n === V || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Tc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    un(this, t);
  }
}
const Pc = Mo.litHtmlPolyfillSupport;
Pc?.(Un, Gn), (Mo.litHtmlVersions ??= []).push("3.3.2");
const Dc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Gn(t.insertBefore(In(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const No = globalThis;
class ze extends sn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Dc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return cn;
  }
}
ze._$litElement$ = !0, ze.finalized = !0, No.litElementHydrateSupport?.({ LitElement: ze });
const Mc = No.litElementPolyfillSupport;
Mc?.({ LitElement: ze });
(No.litElementVersions ??= []).push("4.2.2");
const Qe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const zc = { attribute: !0, type: String, converter: dr, reflect: !1, hasChanged: Do }, Nc = (e = zc, t, i) => {
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
function B(e) {
  return (t, i) => typeof i == "object" ? Nc(e, t, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
function re(e) {
  return B({ ...e, state: !0, attribute: !1 });
}
const Oc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function mn(e, t) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Oc(i, n, { get() {
      return s(this);
    } });
  };
}
const Xe = je`
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
function pr(e) {
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
function gr(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
function po(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var Lc = Object.defineProperty, Hc = Object.getOwnPropertyDescriptor, qn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Hc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Lc(t, i, r), r;
};
const go = 15, Ul = 28, Rc = Ul - go;
function io(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(go, Math.min(Ul, e)) - go) / Rc * 100;
}
let Ni = class extends ze {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = gr(this.action), t = pr(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? io(this.low) : 0, l = n ? io(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = r ? io(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return w`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${ci`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? ci`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${r ? ci`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${r ? ci`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
Ni.styles = [
  Xe,
  je`
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
  B({ type: Number })
], Ni.prototype, "low", 2);
qn([
  B({ type: Number })
], Ni.prototype, "high", 2);
qn([
  B({ type: Number })
], Ni.prototype, "room", 2);
qn([
  B({ type: String })
], Ni.prototype, "action", 2);
Ni = qn([
  Qe("band-gauge")
], Ni);
var Fc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, Vt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ic(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Fc(t, i, r), r;
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
    const e = Bc(this.overrideEnds);
    return w`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = gr(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = pr(e);
    return w`<span class="action-chip" style="background:${t}">
      ${po(e)}
    </span>`;
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
    const e = gr(this.action), t = e === "heating" || e === "cooling", i = t ? `--cb-mini-bg:${pr(e)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${po(e)}` : ""}`;
    return w`
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
  je`
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
Vt([
  B({ type: String })
], yt.prototype, "zoneName", 2);
Vt([
  B({ type: Number })
], yt.prototype, "roomTemp", 2);
Vt([
  B({ type: Number })
], yt.prototype, "low", 2);
Vt([
  B({ type: Number })
], yt.prototype, "high", 2);
Vt([
  B({ type: String })
], yt.prototype, "action", 2);
Vt([
  B({ type: Boolean })
], yt.prototype, "overrideActive", 2);
Vt([
  B({ type: String })
], yt.prototype, "overrideEnds", 2);
Vt([
  B({ type: Boolean })
], yt.prototype, "noExpand", 2);
Vt([
  B({ type: String, reflect: !0 })
], yt.prototype, "variant", 2);
yt = Vt([
  Qe("comfort-band-tile")
], yt);
function Bc(e) {
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
var Uc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, Jt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? jc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Uc(t, i, r), r;
};
const Vc = 14, Fs = 6;
let Tt = class extends ze {
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
    return w`
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
      <div class="label-row">${this._renderValues(e, t)}</div>
    `;
  }
  _renderValues(e, t) {
    if (t - e < Vc) {
      const r = e + t < 100;
      return w`<span class="value-pair" style="left:${r ? e : t}%; transform:translateX(${r ? "0%" : "-100%"})"
        ><span class="value-low">${this._fmt(this.low)}</span
        ><span class="value-high">${this._fmt(this.high)}</span></span
      >`;
    }
    const i = e < Fs ? "0%" : "-50%", n = t > 100 - Fs ? "-100%" : "-50%";
    return w`<span class="value-low" style="left:${e}%; transform:translateX(${i})"
        >${this._fmt(this.low)}</span
      ><span class="value-high" style="left:${t}%; transform:translateX(${n})"
        >${this._fmt(this.high)}</span
      >`;
  }
};
Tt.styles = [
  Xe,
  je`
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
      /* Each value sits under its own handle. Pinned to the track ends, they
         read as the slider's scale rather than the chosen band. */
      .label-row {
        position: relative;
        height: 18px;
        font-size: 12px;
        color: var(--cb-text-secondary);
        margin-top: 14px;
        font-variant-numeric: tabular-nums;
      }
      .value-low,
      .value-high,
      .value-pair {
        position: absolute;
        top: 0;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      .value-pair {
        display: flex;
        gap: 12px;
      }
      .value-pair > span {
        position: static;
      }
    `
];
Jt([
  B({ type: Number })
], Tt.prototype, "min", 2);
Jt([
  B({ type: Number })
], Tt.prototype, "max", 2);
Jt([
  B({ type: Number })
], Tt.prototype, "step", 2);
Jt([
  B({ type: Number })
], Tt.prototype, "low", 2);
Jt([
  B({ type: Number })
], Tt.prototype, "high", 2);
Jt([
  B({ type: String })
], Tt.prototype, "unit", 2);
Jt([
  re()
], Tt.prototype, "_dragging", 2);
Jt([
  mn(".track")
], Tt.prototype, "_track", 2);
Tt = Jt([
  Qe("dual-handle-slider")
], Tt);
const Qt = "comfort_band";
function Wc(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Gc(e, t) {
  return e.callService(Qt, "set_schedule", { ...t });
}
function jl(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(Qt, "start_override", i);
}
function qc(e, t) {
  return e.callService(Qt, "cancel_override", { ...t });
}
function Kc(e, t) {
  return e.callService(Qt, "set_profile", { ...t });
}
function Yc(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(Qt, "create_profile", i);
}
function Zc(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(Qt, "clone_profile", i);
}
function Jc(e, t) {
  return e.callService(Qt, "rename_profile", { old: t.old, new: t.new });
}
function Qc(e, t) {
  return e.callService(Qt, "delete_profile", { name: t.name });
}
function Xc(e, t) {
  return e.callService(Qt, "record_feedback", { zone: t.zone, label: t.label });
}
var eu = Object.defineProperty, tu = Object.getOwnPropertyDescriptor, di = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? tu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && eu(t, i, r), r;
};
const iu = [1, 3, 6], nu = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], ru = 1500, ou = 16, su = 26, mo = 0.5, lu = 1e4, au = 4e3, cu = 5e3;
let Bt = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._feedbackConfirmed = null, this._feedbackTimer = null, this._notice = null, this._noticeTimer = null, this._run = null, this._seq = 0, this._queue = Promise.resolve(), this._inFlight = 0, this._settling = !1, this._settleTimer = null, this._feedbackSeq = 0, this._onSliderInput = (e) => {
      this._seq++, this._stopSettling(), this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      const { low: t, high: i } = e.detail;
      this._pendingLow = t, this._pendingHigh = i, this._change({
        call: (n, r) => jl(n, { zone: r, low: t, high: i }),
        done: () => `Adjusted to ${Bs(t)} – ${Bs(i)}${this._until()}`,
        failed: "Couldn't adjust this room. Try again.",
        settle: !0
      });
    }, this._onCancel = () => {
      this._releasePending(), this._change({
        call: (e, t) => qc(e, { zone: t }),
        // Not "back to the schedule": a zone with no schedule keeps the band.
        done: () => "Override cancelled",
        failed: "Couldn't cancel the override. Try again."
      });
    }, this._onUndo = async () => {
      const e = this._notice?.run, t = this.hass, i = this.zone;
      if (!e?.point || !e.changed || !t || !i) return;
      const n = e.point, r = ++this._seq;
      this._run = null, this._clearNotice(), this._releasePending();
      try {
        await this._send(() => hu(t, i, n));
      } catch {
        if (r !== this._seq) return;
        this._run = e, this._showNotice({ text: "Couldn't undo that.", error: !0, run: e });
        return;
      }
      r === this._seq && this._showNotice({ text: "Undone" });
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await Xc(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, ru));
    }, this._onPickHours = (e) => {
      !this.hass || !this.entities?.overrideHours || this.hass.callService("number", "set_value", {
        entity_id: this.entities.overrideHours,
        value: e
      });
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._feedbackTimer !== null && (clearTimeout(this._feedbackTimer), this._feedbackTimer = null), this._feedbackConfirmed = null, this._seq++, this._run = null, this._clearNotice(), this._releasePending();
  }
  willUpdate(e) {
    if (e.has("hass") && this._settling && this.entities) {
      const t = this._numericState(this.entities.effectiveLow), i = this._numericState(this.entities.effectiveHigh);
      this._pendingLow !== null && this._pendingHigh !== null && Math.abs(t - this._pendingLow) < 0.01 && Math.abs(i - this._pendingHigh) < 0.01 && this._releasePending();
    }
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
  /** Makes one change, as part of the run in progress or as the first of a new one. */
  async _change(e) {
    const t = this.hass, i = this.zone;
    if (!t || !i) return;
    const n = ++this._seq, r = this._run ??= { point: this._undoPoint(), changed: !1 };
    try {
      await this._send(() => e.call(t, i));
    } catch {
      if (n !== this._seq) return;
      e.settle && this._releasePending(), this._run = r, this._showNotice({ text: e.failed, error: !0, run: r });
      return;
    }
    r.changed = !0, n === this._seq && (e.settle && this._startSettling(), this._run = r, this._showNotice({ text: e.done(), run: r }));
  }
  /**
   * Reads the state a run would go back to: the manual band, and whether an
   * override was running and when it ends. Returns undefined, so no Undo is
   * offered, when any of it can't be read, and while an earlier call is still
   * going through, since `hass` may not show its result yet.
   */
  _undoPoint() {
    const e = this.entities;
    if (!e || this._inFlight > 0) return;
    const t = this._numericState(e.manualLow), i = this._numericState(e.manualHigh);
    if (!Number.isFinite(t) || !Number.isFinite(i)) return;
    const n = this._stateOf(e.overrideActive)?.state;
    if (n === "off") return { low: t, high: i, endsAt: null };
    if (n !== "on") return;
    const r = Date.parse(this._stateOf(e.overrideEnds)?.state ?? "");
    return Number.isNaN(r) ? void 0 : { low: t, high: i, endsAt: r };
  }
  _send(e) {
    this._inFlight++;
    const t = this._queue.then(e).finally(() => this._inFlight--);
    return this._queue = t.catch(() => {
    }), t;
  }
  /** " until 14:30", from the zone's override length, which the service uses
   *  when none is passed. */
  _until() {
    const e = this._numericState(this.entities?.overrideHours ?? null);
    return Number.isFinite(e) ? ` until ${du(Date.now() + e * 36e5)}` : "";
  }
  _showNotice(e) {
    this._clearNotice(), this._notice = e, this._noticeTimer = setTimeout(
      () => {
        this._clearNotice(), this._inFlight === 0 && (this._run = null);
      },
      Is(e) ? lu : au
    );
  }
  _clearNotice() {
    this._noticeTimer !== null && clearTimeout(this._noticeTimer), this._noticeTimer = null, this._notice = null;
  }
  _startSettling() {
    this._stopSettling(), this._settling = !0, this._settleTimer = setTimeout(() => this._releasePending(), cu);
  }
  _stopSettling() {
    this._settleTimer !== null && clearTimeout(this._settleTimer), this._settleTimer = null, this._settling = !1;
  }
  _releasePending() {
    this._stopSettling(), this._pendingLow = null, this._pendingHigh = null;
  }
  render() {
    if (!this.hass || !this.entities) return V;
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.apparentTemperature), l = this._numericState(this.entities.overrideHours), h = this._stateOf(this.entities.currentAction)?.state ?? "unknown", d = this._stateOf(this.entities.overrideActive)?.state === "on", p = this._stateOf(this.entities.useApparentTemperature)?.state === "on", b = Number.isFinite(r) && Number.isFinite(s) && Math.abs(s - r) >= 0.1, g = uu(i, n, e, t), _ = this._pendingLow ?? g.low, k = this._pendingHigh ?? g.high, E = Math.min(ou, Math.floor(Math.min(g.low, _))), z = Math.max(su, Math.ceil(Math.max(g.high, k))), R = gr(h), j = R !== "idle" && R !== "unknown";
    return w`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${j ? w`<span class="action-chip" style="background:${pr(R)}"
              >${po(R)}</span
            >` : V}
      </div>
      ${this._renderFeelsLikeRow({ apparent: s, showFeelsLike: b, useApparentOn: p })}
      <div class="gauge-row">
        <band-gauge .low=${i} .high=${n} .room=${r} .action=${h}></band-gauge>
      </div>

      ${this._renderFeedbackSection()}

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${E}
          .max=${z}
          .step=${mo}
          .low=${_}
          .high=${k}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
        ${this._renderNotice()}
      </section>

      ${this._renderOverrideSection(d)} ${this._renderHoursSection(l)}
    `;
  }
  _renderNotice() {
    const e = this._notice;
    return w`<div class="notice-region" role="status" aria-live="polite">
      ${e ? w`<div class="notice ${e.error ? "error" : ""}">
            <span>${e.text}</span>
            ${Is(e) ? w`<button class="undo" @click=${() => void this._onUndo()}>Undo</button>` : V}
          </div>` : V}
    </div>`;
  }
  _renderFeedbackSection() {
    return w`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${nu.map(
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
  _renderOverrideSection(e) {
    if (!e) return V;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = fu(t ?? null);
    return w`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${i ? ` · ${i}` : ""}</span>
          <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        </div>
      </section>
    `;
  }
  _renderFeelsLikeRow(e) {
    const { apparent: t, showFeelsLike: i, useApparentOn: n } = e, r = n && Number.isFinite(t);
    return i ? w`<div class="feels-like">
        <span>Feels like ${t.toFixed(1)}°</span>
        ${r ? w`<span class="driving">Driving decisions</span>` : V}
      </div>` : r ? w`<div class="feels-like">
        <span class="driving">Driving decisions</span>
      </div>` : n ? w`<div class="feels-like">
        <span class="muted-warn">
          Apparent temperature mode is on but no humidity reading is available — decisions are using
          the raw room temperature.
        </span>
      </div>` : V;
  }
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? w`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${iu.map(
      (t) => w`
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
    ` : V;
  }
};
Bt.styles = [
  Xe,
  je`
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
      .notice {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--cb-gap-sm);
        margin-top: var(--cb-gap-sm);
        padding: var(--cb-gap-sm) var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--cb-track-bg);
        font-size: 13px;
        color: var(--cb-text-primary);
      }
      .notice.error {
        color: var(--error-color, #db4437);
      }
      .undo {
        font: inherit;
        font-weight: 500;
        /* WCAG 2.5.5: a comfortable touch target on a wall panel. */
        min-height: 44px;
        min-width: 64px;
        padding: 0 12px;
        border: none;
        border-radius: var(--cb-radius-pill);
        background: transparent;
        color: var(--cb-accent, var(--primary-color, #03a9f4));
        cursor: pointer;
      }
      .undo:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
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
      .feedback-pill:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 1px;
      }
      .feedback-pill.confirmed {
        background: var(--success-color, #2e7d32);
        color: #ffffff;
        border-color: transparent;
      }
    `
];
di([
  B({ attribute: !1 })
], Bt.prototype, "hass", 2);
di([
  B({ type: String })
], Bt.prototype, "zone", 2);
di([
  B({ attribute: !1 })
], Bt.prototype, "entities", 2);
di([
  re()
], Bt.prototype, "_pendingLow", 2);
di([
  re()
], Bt.prototype, "_pendingHigh", 2);
di([
  re()
], Bt.prototype, "_feedbackConfirmed", 2);
di([
  re()
], Bt.prototype, "_notice", 2);
Bt = di([
  Qe("comfort-band-now-tab")
], Bt);
function uu(e, t, i, n) {
  let r = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (r = e, s = t) : Number.isFinite(i) && Number.isFinite(n) && (r = i, s = n), r = Math.round(r * 10) / 10, s = Math.round(s * 10) / 10, s - r < mo && (s = r + mo), { low: r, high: s };
}
function Is(e) {
  return e.run?.point !== void 0 && e.run.changed;
}
function hu(e, t, i) {
  const n = i.endsAt === null ? 0 : (i.endsAt - Date.now()) / 36e5;
  return jl(e, { zone: t, low: i.low, high: i.high, hours: Math.max(0, n) });
}
function Bs(e) {
  return `${e.toFixed(1)}°`;
}
function du(e) {
  return new Date(e).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
function fu(e) {
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
var pu = Object.defineProperty, gu = Object.getOwnPropertyDescriptor, Xt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? gu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && pu(t, i, r), r;
};
let Pt = class extends ze {
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
Pt.styles = [
  Xe,
  je`
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
Xt([
  B({ type: String })
], Pt.prototype, "mode", 2);
Xt([
  B({ type: String })
], Pt.prototype, "existingName", 2);
Xt([
  B({ type: Array })
], Pt.prototype, "existingNames", 2);
Xt([
  B({ type: Boolean })
], Pt.prototype, "busy", 2);
Xt([
  re()
], Pt.prototype, "_name", 2);
Xt([
  re()
], Pt.prototype, "_description", 2);
Xt([
  re()
], Pt.prototype, "_error", 2);
Xt([
  mn('input[name="name"]')
], Pt.prototype, "_nameInput", 2);
Pt = Xt([
  Qe("profile-edit-dialog")
], Pt);
const Oo = "comfort_band", mu = {
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
function bu() {
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
function Vl(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, r] of i.identifiers)
      if (n === t[0] && r === t[1])
        return i;
  return null;
}
function Wl(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Oo
  );
}
function Gl(e, t) {
  const i = bu(), n = Vl(e, [Oo, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Wl(e, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = mu[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function ql(e) {
  const t = Vl(e, [Oo, "profile_manager"]);
  if (t === null) return null;
  for (const i of Wl(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function Kl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function Yl(e, t, i) {
  const n = t.name?.trim();
  if (n) return n;
  const r = i.deviceId !== null ? e.devices[i.deviceId]?.area_id : null, s = r ? e.areas?.[r]?.name?.trim() : void 0;
  return s || (i.deviceName ?? t.zone);
}
var _u = Object.defineProperty, vu = Object.getOwnPropertyDescriptor, Li = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? vu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && _u(t, i, r), r;
};
let Zt = class extends ze {
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
          await Yc(this.hass, { name: t, description: i });
        else if (n === "clone" && r)
          await Zc(this.hass, { source: r, target: t, description: i });
        else if (n === "rename" && r)
          t !== r && await Jc(this.hass, { old: r, new: t });
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
        await Qc(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = ql(this.hass);
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
    this.hass && Kc(this.hass, { profile: e });
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
    if (!this.hass) return V;
    const e = this._readState();
    if (e === null)
      return w`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: r, crudAvailable: s } = e;
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
          </button>` : V}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, r, s)
    )}
      </ul>
      ${s ? V : w`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, r, s) {
    const l = e === i, h = e === n, d = r[e] ?? "", p = `cb-profile-menu-${t}`;
    return w`
      <li
        data-profile=${e}
        tabindex="0"
        class=${l ? "active" : ""}
        aria-current=${l ? "true" : V}
        @click=${() => this._onSelect(e)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? w`<span class="description">${d}</span>` : V}
        </span>
        ${l ? w`<span class="badge">Active</span>` : V}
        ${s ? w`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? p : V}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(b) => this._toggleMenu(e, b)}
            >
              ⋮
            </button>` : V}
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
            ` : V}
      </li>
    `;
  }
};
Zt.styles = [
  Xe,
  je`
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
Li([
  B({ attribute: !1 })
], Zt.prototype, "hass", 2);
Li([
  re()
], Zt.prototype, "_mode", 2);
Li([
  re()
], Zt.prototype, "_target", 2);
Li([
  re()
], Zt.prototype, "_openMenu", 2);
Li([
  re()
], Zt.prototype, "_error", 2);
Li([
  re()
], Zt.prototype, "_busy", 2);
Zt = Li([
  Qe("comfort-band-profiles-tab")
], Zt);
const yu = !0, Ne = "u-", wu = "uplot", xu = Ne + "hz", $u = Ne + "vt", ku = Ne + "title", Su = Ne + "wrap", Au = Ne + "under", Eu = Ne + "over", Cu = Ne + "axis", Ti = Ne + "off", Tu = Ne + "select", Pu = Ne + "cursor-x", Du = Ne + "cursor-y", Mu = Ne + "cursor-pt", zu = Ne + "legend", Nu = Ne + "live", Ou = Ne + "inline", Lu = Ne + "series", Hu = Ne + "marker", Us = Ne + "label", Ru = Ne + "value", Nn = "width", On = "height", Dn = "top", js = "bottom", rn = "left", no = "right", Lo = "#000", Vs = Lo + "0", ro = "mousemove", Ws = "mousedown", oo = "mouseup", Gs = "mouseenter", qs = "mouseleave", Ks = "dblclick", Fu = "resize", Iu = "scroll", Ys = "change", mr = "dppxchange", Ho = "--", bn = typeof window < "u", bo = bn ? document : null, an = bn ? window : null, Bu = bn ? navigator : null;
let ce, rr;
function _o() {
  let e = devicePixelRatio;
  ce != e && (ce = e, rr && yo(Ys, rr, _o), rr = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Mi(Ys, rr, _o), an.dispatchEvent(new CustomEvent(mr)));
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
function At(e, t, i, n) {
  let r = bo.createElement(e);
  return t != null && at(r, t), i?.insertBefore(r, n), r;
}
function _t(e, t) {
  return At("div", e, t);
}
const Zs = /* @__PURE__ */ new WeakMap();
function It(e, t, i, n, r) {
  let s = "translate(" + t + "px," + i + "px)", l = Zs.get(e);
  s != l && (e.style.transform = s, Zs.set(e, s), t < 0 || i < 0 || t > n || i > r ? at(e, Ti) : vo(e, Ti));
}
const Js = /* @__PURE__ */ new WeakMap();
function Qs(e, t, i) {
  let n = t + i, r = Js.get(e);
  n != r && (Js.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const Xs = /* @__PURE__ */ new WeakMap();
function el(e, t, i, n) {
  let r = t + "" + i, s = Xs.get(e);
  r != s && (Xs.set(e, r), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Ro = { passive: !0 }, Uu = { ...Ro, capture: !0 };
function Mi(e, t, i, n) {
  t.addEventListener(e, i, n ? Uu : Ro);
}
function yo(e, t, i, n) {
  t.removeEventListener(e, i, Ro);
}
bn && _o();
function Et(e, t, i, n) {
  let r;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ct((i + n) / 2), t[r] < e ? i = r : n = r;
  return e - t[i] <= t[n] - e ? i : n;
}
function Zl(e) {
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
const Jl = (e) => e != null, Ql = (e) => e != null && e > 0, xr = Zl(Jl), ju = Zl(Ql);
function Vu(e, t, i, n = 0, r = !1) {
  let s = r ? ju : xr, l = r ? Ql : Jl;
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
function $r(e, t, i, n) {
  let r = nl(e), s = nl(t);
  e == t && (r == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Kt : Xl, h = r == 1 ? ct : vt, d = s == 1 ? vt : ct, p = h(l(Me(e))), b = d(l(Me(t))), g = hn(i, p), _ = hn(i, b);
  return i == 10 && (p < 0 && (g = ge(g, -p)), b < 0 && (_ = ge(_, -b))), n || i == 2 ? (e = g * r, t = _ * s) : (e = na(e, g), t = kr(t, _)), [e, t];
}
function Fo(e, t, i, n) {
  let r = $r(e, t, i, n);
  return e == 0 && (r[0] = 0), t == 0 && (r[1] = 0), r;
}
const Io = 0.1, tl = {
  mode: 3,
  pad: Io
}, Rn = {
  pad: 0,
  soft: null,
  mode: 0
}, Wu = {
  min: Rn,
  max: Rn
};
function br(e, t, i, n) {
  return Sr(i) ? il(e, t, i) : (Rn.pad = i, Rn.soft = n ? 0 : null, Rn.mode = n ? 3 : 0, il(e, t, Wu));
}
function le(e, t) {
  return e ?? t;
}
function Gu(e, t, i) {
  for (t = le(t, 0), i = le(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function il(e, t, i) {
  let n = i.min, r = i.max, s = le(n.pad, 0), l = le(r.pad, 0), h = le(n.hard, -pe), d = le(r.hard, pe), p = le(n.soft, pe), b = le(r.soft, -pe), g = le(n.mode, 0), _ = le(r.mode, 0), k = t - e, E = Kt(k), z = Je(Me(e), Me(t)), R = Kt(z), j = Me(R - E);
  (k < 1e-24 || j > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, g == 2 && p != pe && (s = 0), _ == 2 && b != -pe && (l = 0)));
  let $ = k || z || 1e3, I = Kt($), S = hn(10, ct(I)), J = $ * (k == 0 ? e == 0 ? 0.1 : 1 : s), M = ge(na(e - J, S / 10), 24), Q = e >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : pe, K = Je(h, M < Q && e >= Q ? Q : Ct(Q, M)), te = $ * (k == 0 ? t == 0 ? 0.1 : 1 : l), q = ge(kr(t + te, S / 10), 24), A = t <= b && (_ == 1 || _ == 3 && q >= b || _ == 2 && q <= b) ? b : -pe, Z = Ct(d, q > A && t <= A ? A : Je(A, q));
  return K == Z && K == 0 && (Z = 100), [K, Z];
}
const qu = new Intl.NumberFormat(bn ? Bu.language : "en-US"), Bo = (e) => qu.format(e), ht = Math, hr = ht.PI, Me = ht.abs, ct = ht.floor, De = ht.round, vt = ht.ceil, Ct = ht.min, Je = ht.max, hn = ht.pow, nl = ht.sign, Kt = ht.log10, Xl = ht.log2, Ku = (e, t = 1) => ht.sinh(e) * t, so = (e, t = 1) => ht.asinh(e / t), pe = 1 / 0;
function rl(e) {
  return (Kt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function wo(e, t, i) {
  return Ct(Je(e, t), i);
}
function ea(e) {
  return typeof e == "function";
}
function ie(e) {
  return ea(e) ? e : () => e;
}
const Yu = () => {
}, ta = (e) => e, ia = (e, t) => t, Zu = (e) => null, ol = (e) => !0, sl = (e, t) => e == t, Ju = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (e) => {
  if (oa(e) || ui.has(e))
    return e;
  const t = `${e}`, i = t.match(Ju);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [r, s] = t.split("e");
    return +`${Oi(r)}e${s}`;
  }
  return ge(e, n);
};
function Ei(e, t) {
  return Oi(ge(Oi(e / t)) * t);
}
function kr(e, t) {
  return Oi(vt(Oi(e / t)) * t);
}
function na(e, t) {
  return Oi(ct(Oi(e / t)) * t);
}
function ge(e, t = 0) {
  if (oa(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return De(n) / i;
}
const ui = /* @__PURE__ */ new Map();
function ra(e) {
  return (("" + e).split(".")[1] || "").length;
}
function jn(e, t, i, n) {
  let r = [], s = n.map(ra);
  for (let l = t; l < i; l++) {
    let h = Me(l), d = ge(hn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * d, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : ge(b, g);
      r.push(_), ui.set(_, g);
    }
  }
  return r;
}
const Fn = {}, Uo = [], dn = [null, null], li = Array.isArray, oa = Number.isInteger, Qu = (e) => e === void 0;
function ll(e) {
  return typeof e == "string";
}
function Sr(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function Xu(e) {
  return e != null && typeof e == "object";
}
const eh = Object.getPrototypeOf(Uint8Array), sa = "__proto__";
function fn(e, t = Sr) {
  let i;
  if (li(e)) {
    let n = e.find((r) => r != null);
    if (li(n) || t(n)) {
      i = Array(e.length);
      for (let r = 0; r < e.length; r++)
        i[r] = fn(e[r], t);
    } else
      i = e.slice();
  } else if (e instanceof eh)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != sa && (i[n] = fn(e[n], t));
  } else
    i = e;
  return i;
}
function Ce(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let r in n)
      r != sa && (Sr(e[r]) ? Ce(e[r], fn(n[r])) : e[r] = fn(n[r]));
  }
  return e;
}
const th = 0, ih = 1, nh = 2;
function rh(e, t, i) {
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
function oh(e, t) {
  if (ah(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return ch(l[0]) || (l = lh(l)), l;
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
      let b = h[p], g = Array(r).fill(void 0), _ = t ? t[l][p] : ih, k = [];
      for (let E = 0; E < b.length; E++) {
        let z = b[E], R = s.get(d[E]);
        z === null ? _ != th && (g[R] = z, _ == nh && k.push(R)) : g[R] = z;
      }
      rh(g, k, r), n.push(g);
    }
  }
  return n;
}
const sh = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function lh(e) {
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
function ah(e) {
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
function ch(e, t = 100) {
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
function ca(e) {
  return e.slice(0, 3);
}
const uh = aa.map(ca), hh = la.map(ca), dh = {
  MMMM: la,
  MMM: hh,
  WWWW: aa,
  WWW: uh
};
function Mn(e) {
  return (e < 10 ? "0" : "") + e;
}
function fh(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const ph = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Mn(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Mn(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Mn(e.getHours()),
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
  mm: (e) => Mn(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Mn(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => fh(e.getMilliseconds())
};
function jo(e, t) {
  t = t || dh;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(e); )
    i.push(r[0][0] == "{" ? ph[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const gh = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function mh(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == gh ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const ua = (e) => e % 1 == 0, _r = [1, 2, 2.5, 5], bh = jn(10, -32, 0, _r), ha = jn(10, 0, 32, _r), _h = ha.filter(ua), Ci = bh.concat(ha), Vo = `
`, da = "{YYYY}", al = Vo + da, fa = "{M}/{D}", Ln = Vo + fa, or = Ln + "/{YY}", pa = "{aa}", vh = "{h}:{mm}", ln = vh + pa, cl = Vo + ln, ul = ":{ss}", he = null;
function ga(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (e == 1 ? jn(10, 0, 3, _r).filter(ua) : jn(10, -3, 0, _r)).concat([
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
    [l, da, he, he, he, he, he, he, 1],
    [r * 28, "{MMM}", al, he, he, he, he, he, 1],
    [r, fa, al, he, he, he, he, he, 1],
    [n, "{h}" + pa, or, he, Ln, he, he, he, 1],
    [i, ln, or, he, Ln, he, he, he, 1],
    [t, ul, or + " " + ln, he, Ln + " " + ln, he, cl, he, 1],
    [e, ul + ".{fff}", or + " " + ln, he, Ln + " " + ln, he, cl, he, 1]
  ];
  function b(g) {
    return (_, k, E, z, R, j) => {
      let $ = [], I = R >= l, S = R >= s && R < l, J = g(E), M = ge(J * e, 3), Q = lo(J.getFullYear(), I ? 0 : J.getMonth(), S || I ? 1 : J.getDate()), K = ge(Q * e, 3);
      if (S || I) {
        let te = S ? R / s : 0, q = I ? R / l : 0, A = M == K ? M : ge(lo(Q.getFullYear() + q, Q.getMonth() + te, 1) * e, 3), Z = new Date(De(A / e)), N = Z.getFullYear(), W = Z.getMonth();
        for (let F = 0; A <= z; F++) {
          let ne = lo(N + q * F, W + te * F, 1), H = ne - g(ge(ne * e, 3));
          A = ge((+ne + H) * e, 3), A <= z && $.push(A);
        }
      } else {
        let te = R >= r ? r : R, q = ct(E) - ct(M), A = K + q + kr(M - K, te);
        $.push(A);
        let Z = g(A), N = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, W = R / n, F = _.axes[k]._space, ne = j / F;
        for (; A = ge(A + R, e == 1 ? 0 : 3), !(A > z); )
          if (W > 1) {
            let H = ct(ge(N + W, 6)) % 24, oe = g(A).getHours() - H;
            oe > 1 && (oe = -1), A -= oe * n, N = (N + W) % 24;
            let de = $[$.length - 1];
            ge((A - de) / R, 3) * ne >= 0.7 && $.push(A);
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
const [yh, wh, xh] = ga(1), [$h, kh, Sh] = ga(1e-3);
jn(2, -53, 53, [1]);
function hl(e, t) {
  return e.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function dl(e, t) {
  return (i, n, r, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], d, p, b, g, _, k;
    return n.map((E) => {
      let z = e(E), R = z.getFullYear(), j = z.getMonth(), $ = z.getDate(), I = z.getHours(), S = z.getMinutes(), J = z.getSeconds(), M = R != d && h[2] || j != p && h[3] || $ != b && h[4] || I != g && h[5] || S != _ && h[6] || J != k && h[7] || h[1];
      return d = R, p = j, b = $, g = I, _ = S, k = J, M(z);
    });
  };
}
function Ah(e, t) {
  let i = jo(t);
  return (n, r, s, l, h) => r.map((d) => i(e(d)));
}
function lo(e, t, i) {
  return new Date(e, t, i);
}
function fl(e, t) {
  return t(e);
}
const Eh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function pl(e, t) {
  return (i, n, r, s) => s == null ? Ho : t(e(n));
}
function Ch(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function Th(e, t) {
  return e.series[t].fill(e, t);
}
const Ph = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Yu,
  markers: {
    show: !0,
    width: 2,
    stroke: Ch,
    fill: Th,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Dh(e, t) {
  let i = e.cursor.points, n = _t(), r = i.size(e, t);
  ye(n, Nn, r), ye(n, On, r);
  let s = r / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, r);
  return l && ye(n, "borderWidth", l), n;
}
function Mh(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function zh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function Nh(e, t) {
  return e.series[t].points.size;
}
const ao = [0, 0];
function Oh(e, t, i) {
  return ao[0] = t, ao[1] = i, ao;
}
function sr(e, t, i, n = !0) {
  return (r) => {
    r.button == 0 && (!n || r.target == t) && i(r);
  };
}
function co(e, t, i, n = !0) {
  return (r) => {
    (!n || r.target == t) && i(r);
  };
}
const Lh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: Oh,
  points: {
    one: !1,
    show: Dh,
    size: Nh,
    width: 0,
    stroke: zh,
    fill: Mh
  },
  bind: {
    mousedown: sr,
    mouseup: sr,
    click: sr,
    // legend clicks, not .u-over clicks
    dblclick: sr,
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
}, ma = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Wo = Ce({}, ma, {
  filter: ia
}), ba = Ce({}, Wo, {
  size: 10
}), _a = Ce({}, ma, {
  show: !1
}), Go = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', va = "bold " + Go, ya = 1.5, gl = {
  show: !0,
  scale: "x",
  stroke: Lo,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: va,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Wo,
  ticks: ba,
  border: _a,
  font: Go,
  lineGap: ya,
  rotate: 0
}, Hh = "Value", Rh = "Time", ml = {
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
function Fh(e, t, i, n, r) {
  return t.map((s) => s == null ? "" : Bo(s));
}
function Ih(e, t, i, n, r, s, l) {
  let h = [], d = ui.get(r) || 0;
  i = l ? i : ge(kr(i, r), d);
  for (let p = i; p <= n; p = ge(p + r, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function xo(e, t, i, n, r, s, l) {
  const h = [], d = e.scales[e.axes[t].scale].log, p = d == 10 ? Kt : Xl, b = ct(p(i));
  r = hn(d, b), d == 10 && (r = Ci[Et(r, Ci)]);
  let g = i, _ = r * d;
  d == 10 && (_ = Ci[Et(_, Ci)]);
  do
    h.push(g), g = g + r, d == 10 && !ui.has(g) && (g = ge(g, ui.get(r))), g >= _ && (r = g, _ = r * d, d == 10 && (_ = Ci[Et(_, Ci)]));
  while (g <= n);
  return h;
}
function Bh(e, t, i, n, r, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, p = n > d ? xo(e, t, Je(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? xo(e, t, Je(d, -n), -i, r) : [d]).reverse().map((_) => -_).concat(b, p);
}
const wa = /./, Uh = /[12357]/, jh = /[125]/, bl = /1/, $o = (e, t, i, n) => e.map((r, s) => t == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function Vh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], d = e.valToPos, p = s._space, b = d(10, l), g = d(9, l) - b >= p ? wa : d(7, l) - b >= p ? Uh : d(5, l) - b >= p ? jh : bl;
  if (g == bl) {
    let _ = Me(d(1, l) - b);
    if (_ < p)
      return $o(t.slice().reverse(), h.distr, g, vt(p / _)).reverse();
  }
  return $o(t, h.distr, g, 1);
}
function Wh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = s._space, d = e.valToPos, p = Me(d(1, l) - d(2, l));
  return p < h ? $o(t.slice().reverse(), 3, wa, vt(h / p)).reverse() : t;
}
function Gh(e, t, i, n) {
  return n == null ? Ho : t == null ? "" : Bo(t);
}
const _l = {
  show: !0,
  scale: "y",
  stroke: Lo,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: va,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Wo,
  ticks: ba,
  border: _a,
  font: Go,
  lineGap: ya,
  rotate: 0
};
function qh(e, t) {
  let i = 3 + (e || 1) * 2;
  return ge(i * t, 3);
}
function Kh(e, t) {
  let { scale: i, idxs: n } = e.series[0], r = e._data[0], s = e.valToPos(r[n[0]], i, !0), l = e.valToPos(r[n[1]], i, !0), h = Me(l - s), d = e.series[t], p = h / (d.points.space * ce);
  return n[1] - n[0] <= p;
}
const vl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, xa = (e, t, i, n, r) => r, yl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: xa,
  alpha: 1,
  facets: [
    Ce({}, vl, { scale: "x" }),
    Ce({}, vl, { scale: "y" })
  ]
}, wl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: xa,
  alpha: 1,
  points: {
    show: Kh,
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
function Yh(e, t, i, n, r) {
  return i / 10;
}
const $a = {
  time: yu,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Zh = Ce({}, $a, {
  time: !1,
  ori: 1
}), xl = {};
function ka(e, t) {
  let i = xl[e];
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
  }, e != null && (xl[e] = i)), i;
}
const pn = 1, ko = 2;
function Hi(e, t, i) {
  const n = e.mode, r = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[r.facets[0].scale] : l[e.series[0].scale], g = n == 2 ? l[r.facets[1].scale] : l[r.scale], _ = h.left, k = h.top, E = h.width, z = h.height, R = e.valToPosH, j = e.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    p,
    b,
    g,
    R,
    j,
    _,
    k,
    E,
    z,
    Er,
    _n,
    Tr,
    Aa,
    Ca
  ) : i(
    r,
    d,
    p,
    b,
    g,
    j,
    R,
    k,
    _,
    z,
    E,
    Cr,
    vn,
    Yo,
    Ea,
    Ta
  );
}
function qo(e, t) {
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
function Jh(e, t, i, n, r) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[h];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Yt(e, t, i, n, r, s) {
  return Hi(e, t, (l, h, d, p, b, g, _, k, E, z, R) => {
    let j = l.pxRound;
    const $ = p.dir * (p.ori == 0 ? 1 : -1), I = p.ori == 0 ? _n : vn;
    let S, J;
    $ == 1 ? (S = i, J = n) : (S = n, J = i);
    let M = j(g(h[S], p, z, k)), Q = j(_(d[S], b, R, E)), K = j(g(h[J], p, z, k)), te = j(_(s == 1 ? b.max : b.min, b, R, E)), q = new Path2D(r);
    return I(q, K, te), I(q, M, te), I(q, M, Q), q;
  });
}
function Ar(e, t, i, n, r, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? Tr : Yo;
    let d = i;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
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
function Qh(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function Ko(e, t, i, n, r, s, l) {
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
      let k = s(e[g]), E = _ == g ? k : s(e[_]), z = g - r;
      k = l <= 0 && z >= 0 && z < d ? s(e[z]) : k;
      let j = _ + r;
      E = l >= 0 && j >= 0 && j < d ? s(e[j]) : E, E >= k && h.push([k, E]);
    }
  return h;
}
function $l(e) {
  return e == 0 ? ta : e == 1 ? De : (t) => Ei(t, e);
}
function Sa(e) {
  let t = e == 0 ? Er : Cr, i = e == 0 ? (r, s, l, h, d, p) => {
    r.arcTo(s, l, h, d, p);
  } : (r, s, l, h, d, p) => {
    r.arcTo(l, s, d, h, p);
  }, n = e == 0 ? (r, s, l, h, d) => {
    r.rect(s, l, h, d);
  } : (r, s, l, h, d) => {
    r.rect(l, s, d, h);
  };
  return (r, s, l, h, d, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(r, s, l, h, d) : (p = Ct(p, h / 2, d / 2), b = Ct(b, h / 2, d / 2), t(r, s + p, l), i(r, s + h, l, s + h, l + d, p), i(r, s + h, l + d, s, l + d, b), i(r, s, l + d, s, l, b), i(r, s, l, s + h, l, p), r.closePath());
  };
}
const Er = (e, t, i) => {
  e.moveTo(t, i);
}, Cr = (e, t, i) => {
  e.moveTo(i, t);
}, _n = (e, t, i) => {
  e.lineTo(t, i);
}, vn = (e, t, i) => {
  e.lineTo(i, t);
}, Tr = Sa(0), Yo = Sa(1), Aa = (e, t, i, n, r, s) => {
  e.arc(t, i, n, r, s);
}, Ea = (e, t, i, n, r, s) => {
  e.arc(i, t, n, r, s);
}, Ca = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(t, i, n, r, s, l);
}, Ta = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(i, t, r, n, l, s);
};
function Pa(e) {
  return (t, i, n, r, s) => Hi(t, i, (l, h, d, p, b, g, _, k, E, z, R) => {
    let { pxRound: j, points: $ } = l, I, S;
    p.ori == 0 ? (I = Er, S = Aa) : (I = Cr, S = Ea);
    const J = ge($.width * ce, 3);
    let M = ($.size - $.width) / 2 * ce, Q = ge(M * 2, 3), K = new Path2D(), te = new Path2D(), { left: q, top: A, width: Z, height: N } = t.bbox;
    Tr(
      te,
      q - Q,
      A - Q,
      Z + Q * 2,
      N + Q * 2
    );
    const W = (F) => {
      if (d[F] != null) {
        let ne = j(g(h[F], p, z, k)), H = j(_(d[F], b, R, E));
        I(K, ne + M, H), S(K, ne, H, M, 0, hr * 2);
      }
    };
    if (s)
      s.forEach(W);
    else
      for (let F = n; F <= r; F++)
        W(F);
    return {
      stroke: J > 0 ? K : null,
      fill: K,
      clip: te,
      flags: pn | ko
    };
  });
}
function Da(e) {
  return (t, i, n, r, s, l) => {
    n != r && (s != n && l != n && e(t, i, n), s != r && l != r && e(t, i, r), e(t, i, l));
  };
}
const Xh = Da(_n), ed = Da(vn);
function Ma(e) {
  const t = le(e?.alignGaps, 0);
  return (i, n, r, s) => Hi(i, n, (l, h, d, p, b, g, _, k, E, z, R) => {
    [r, s] = xr(d, r, s);
    let j = l.pxRound, $ = (N) => j(g(N, p, z, k)), I = (N) => j(_(N, b, R, E)), S, J;
    p.ori == 0 ? (S = _n, J = Xh) : (S = vn, J = ed);
    const M = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: pn }, K = Q.stroke;
    let te = !1;
    if (s - r >= z * 4) {
      let N = (O) => i.posToVal(O, p.key, !0), W = null, F = null, ne, H, et, we = $(h[M == 1 ? r : s]), oe = $(h[r]), de = $(h[s]), X = N(M == 1 ? oe + 1 : de - 1);
      for (let O = M == 1 ? r : s; O >= r && O <= s; O += M) {
        let Te = h[O], xe = (M == 1 ? Te < X : Te > X) ? we : $(Te), ue = d[O];
        xe == we ? ue != null ? (H = ue, W == null ? (S(K, xe, I(H)), ne = W = F = H) : H < W ? W = H : H > F && (F = H)) : ue === null && (te = !0) : (W != null && J(K, we, I(W), I(F), I(ne), I(H)), ue != null ? (H = ue, S(K, xe, I(H)), W = F = ne = H) : (W = F = null, ue === null && (te = !0)), we = xe, X = N(we + M));
      }
      W != null && W != F && et != we && J(K, we, I(W), I(F), I(ne), I(H));
    } else
      for (let N = M == 1 ? r : s; N >= r && N <= s; N += M) {
        let W = d[N];
        W === null ? te = !0 : W != null && S(K, $(h[N]), I(W));
      }
    let [A, Z] = qo(i, n);
    if (l.fill != null || A != 0) {
      let N = Q.fill = new Path2D(K), W = l.fillTo(i, n, l.min, l.max, A), F = I(W), ne = $(h[r]), H = $(h[s]);
      M == -1 && ([H, ne] = [ne, H]), S(N, H, F), S(N, ne, F);
    }
    if (!l.spanGaps) {
      let N = [];
      te && N.push(...Ko(h, d, r, s, M, $, t)), Q.gaps = N = l.gaps(i, n, r, s, N), Q.clip = Ar(N, p.ori, k, E, z, R);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      Yt(i, n, r, s, K, -1),
      Yt(i, n, r, s, K, 1)
    ] : Yt(i, n, r, s, K, Z)), Q;
  });
}
function td(e) {
  const t = le(e.align, 1), i = le(e.ascDesc, !1), n = le(e.alignGaps, 0), r = le(e.extend, !1);
  return (s, l, h, d) => Hi(s, l, (p, b, g, _, k, E, z, R, j, $, I) => {
    [h, d] = xr(g, h, d);
    let S = p.pxRound, { left: J, width: M } = s.bbox, Q = (oe) => S(E(oe, _, $, R)), K = (oe) => S(z(oe, k, I, j)), te = _.ori == 0 ? _n : vn;
    const q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: pn }, A = q.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let N = K(g[Z == 1 ? h : d]), W = Q(b[Z == 1 ? h : d]), F = W, ne = W;
    r && t == -1 && (ne = J, te(A, ne, N)), te(A, W, N);
    for (let oe = Z == 1 ? h : d; oe >= h && oe <= d; oe += Z) {
      let de = g[oe];
      if (de == null)
        continue;
      let X = Q(b[oe]), O = K(de);
      t == 1 ? te(A, X, N) : te(A, F, O), te(A, X, O), N = O, F = X;
    }
    let H = F;
    r && t == 1 && (H = J + M, te(A, H, N));
    let [et, we] = qo(s, l);
    if (p.fill != null || et != 0) {
      let oe = q.fill = new Path2D(A), de = p.fillTo(s, l, p.min, p.max, et), X = K(de);
      te(oe, H, X), te(oe, ne, X);
    }
    if (!p.spanGaps) {
      let oe = [];
      oe.push(...Ko(b, g, h, d, Z, Q, n));
      let de = p.width * ce / 2, X = i || t == 1 ? de : -de, O = i || t == -1 ? -de : de;
      oe.forEach((Te) => {
        Te[0] += X, Te[1] += O;
      }), q.gaps = oe = p.gaps(s, l, h, d, oe), q.clip = Ar(oe, _.ori, R, j, $, I);
    }
    return we != 0 && (q.band = we == 2 ? [
      Yt(s, l, h, d, A, -1),
      Yt(s, l, h, d, A, 1)
    ] : Yt(s, l, h, d, A, we)), q;
  });
}
function kl(e, t, i, n, r, s, l = pe) {
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
function id(e) {
  e = e || Fn;
  const t = le(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let r = e.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = ie(r), l = 1 - t[0], h = le(t[1], pe), d = le(t[2], 1), p = le(e.disp, Fn), b = le(e.each, (k) => {
  }), { fill: g, stroke: _ } = p;
  return (k, E, z, R) => Hi(k, E, (j, $, I, S, J, M, Q, K, te, q, A) => {
    let Z = j.pxRound, N = i, W = n * ce, F = h * ce, ne = d * ce, H, et;
    S.ori == 0 ? [H, et] = s(k, E) : [et, H] = s(k, E);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let oe = S.ori == 0 ? Tr : Yo, de = S.ori == 0 ? b : (P, me, Pe, Bi, bi, Nt, _i) => {
      b(P, me, Pe, bi, Bi, _i, Nt);
    }, X = le(k.bands, Uo).find((P) => P.series[0] == E), O = X != null ? X.dir : 0, Te = j.fillTo(k, E, j.min, j.max, O), Ge = Z(Q(Te, J, A, te)), xe, ue, wt, nt = q, ke = Z(j.width * ce), zt = !1, Wt = null, dt = null, ti = null, Ri = null;
    g != null && (ke == 0 || _ != null) && (zt = !0, Wt = g.values(k, E, z, R), dt = /* @__PURE__ */ new Map(), new Set(Wt).forEach((P) => {
      P != null && dt.set(P, new Path2D());
    }), ke > 0 && (ti = _.values(k, E, z, R), Ri = /* @__PURE__ */ new Map(), new Set(ti).forEach((P) => {
      P != null && Ri.set(P, new Path2D());
    })));
    let { x0: Fi, size: xn } = p;
    if (Fi != null && xn != null) {
      N = 1, $ = Fi.values(k, E, z, R), Fi.unit == 2 && ($ = $.map((Pe) => k.posToVal(K + Pe * q, S.key, !0)));
      let P = xn.values(k, E, z, R);
      xn.unit == 2 ? ue = P[0] * q : ue = M(P[0], S, q, K) - M(0, S, q, K), nt = kl($, I, M, S, q, K, nt), wt = nt - ue + W;
    } else
      nt = kl($, I, M, S, q, K, nt), wt = nt * l + W, ue = nt - wt;
    wt < 1 && (wt = 0), ke >= ue / 2 && (ke = 0), wt < 5 && (Z = ta);
    let Kn = wt > 0, gi = nt - wt - (Kn ? ke : 0);
    ue = Z(wo(gi, ne, F)), xe = (N == 0 ? ue / 2 : N == we ? 0 : ue) - N * we * ((N == 0 ? W / 2 : 0) + (Kn ? ke / 2 : 0));
    const qe = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ii = zt ? null : new Path2D();
    let Gt = null;
    if (X != null)
      Gt = k.data[X.series[1]];
    else {
      let { y0: P, y1: me } = p;
      P != null && me != null && (I = me.values(k, E, z, R), Gt = P.values(k, E, z, R));
    }
    let mi = H * ue, Y = et * ue;
    for (let P = we == 1 ? z : R; P >= z && P <= R; P += we) {
      let me = I[P];
      if (me == null)
        continue;
      if (Gt != null) {
        let tt = Gt[P] ?? 0;
        if (me - tt == 0)
          continue;
        Ge = Q(tt, J, A, te);
      }
      let Pe = S.distr != 2 || p != null ? $[P] : P, Bi = M(Pe, S, q, K), bi = Q(le(me, Te), J, A, te), Nt = Z(Bi - xe), _i = Z(Je(bi, Ge)), rt = Z(Ct(bi, Ge)), ft = _i - rt;
      if (me != null) {
        let tt = me < 0 ? Y : mi, xt = me < 0 ? mi : Y;
        zt ? (ke > 0 && ti[P] != null && oe(Ri.get(ti[P]), Nt, rt + ct(ke / 2), ue, Je(0, ft - ke), tt, xt), Wt[P] != null && oe(dt.get(Wt[P]), Nt, rt + ct(ke / 2), ue, Je(0, ft - ke), tt, xt)) : oe(Ii, Nt, rt + ct(ke / 2), ue, Je(0, ft - ke), tt, xt), de(
          k,
          E,
          P,
          Nt - ke / 2,
          rt,
          ue + ke,
          ft
        );
      }
    }
    return ke > 0 ? qe.stroke = zt ? Ri : Ii : zt || (qe._fill = j.width == 0 ? j._fill : j._stroke ?? j._fill, qe.width = 0), qe.fill = zt ? dt : Ii, qe;
  });
}
function nd(e, t) {
  const i = le(t?.alignGaps, 0);
  return (n, r, s, l) => Hi(n, r, (h, d, p, b, g, _, k, E, z, R, j) => {
    [s, l] = xr(p, s, l);
    let $ = h.pxRound, I = (H) => $(_(H, b, R, E)), S = (H) => $(k(H, g, j, z)), J, M, Q;
    b.ori == 0 ? (J = Er, Q = _n, M = Ca) : (J = Cr, Q = vn, M = Ta);
    const K = b.dir * (b.ori == 0 ? 1 : -1);
    let te = I(d[K == 1 ? s : l]), q = te, A = [], Z = [];
    for (let H = K == 1 ? s : l; H >= s && H <= l; H += K)
      if (p[H] != null) {
        let we = d[H], oe = I(we);
        A.push(q = oe), Z.push(S(p[H]));
      }
    const N = { stroke: e(A, Z, J, Q, M, $), fill: null, clip: null, band: null, gaps: null, flags: pn }, W = N.stroke;
    let [F, ne] = qo(n, r);
    if (h.fill != null || F != 0) {
      let H = N.fill = new Path2D(W), et = h.fillTo(n, r, h.min, h.max, F), we = S(et);
      Q(H, q, we), Q(H, te, we);
    }
    if (!h.spanGaps) {
      let H = [];
      H.push(...Ko(d, p, s, l, K, I, i)), N.gaps = H = h.gaps(n, r, s, l, H), N.clip = Ar(H, b.ori, E, z, R, j);
    }
    return ne != 0 && (N.band = ne == 2 ? [
      Yt(n, r, s, l, W, -1),
      Yt(n, r, s, l, W, 1)
    ] : Yt(n, r, s, l, W, ne)), N;
  });
}
function rd(e) {
  return nd(od, e);
}
function od(e, t, i, n, r, s) {
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
const So = /* @__PURE__ */ new Set();
function Sl() {
  for (let e of So)
    e.syncRect(!0);
}
bn && (Mi(Fu, an, Sl), Mi(Iu, an, Sl, !0), Mi(mr, an, () => {
  We.pxRatio = ce;
}));
const sd = Ma(), ld = Pa();
function Al(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Ao(s, l, t, i));
}
function ad(e, t) {
  return e.map((i, n) => n == 0 ? {} : Ce({}, t, i));
}
function Ao(e, t, i, n) {
  return Ce({}, t == 0 ? i : n, e);
}
function za(e, t, i) {
  return t == null ? dn : [t, i];
}
const cd = za;
function ud(e, t, i) {
  return t == null ? dn : br(t, i, Io, !0);
}
function Na(e, t, i, n) {
  return t == null ? dn : $r(t, i, e.scales[n].log, !1);
}
const hd = Na;
function Oa(e, t, i, n) {
  return t == null ? dn : Fo(t, i, e.scales[n].log, !1);
}
const dd = Oa;
function fd(e, t, i, n, r) {
  let s = Je(rl(e), rl(t)), l = t - e, h = Et(r / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= r && s + (d < 5 ? ui.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function El(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, r) => (t = De((i = +r) * ce)) + "px"), [e, t, i];
}
function pd(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = ge(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function We(e, t, i) {
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
  const p = n.root = _t(wu);
  if (e.id != null && (p.id = e.id), at(p, e.class), e.title) {
    let o = _t(ku, p);
    o.textContent = e.title;
  }
  const b = At("canvas"), g = n.ctx = b.getContext("2d"), _ = _t(Su, p);
  Mi("click", _, (o) => {
    o.target === E && (be != Qi || $e != Xi) && Ue.click(n, o);
  }, !0);
  const k = n.under = _t(Au, _);
  _.appendChild(b);
  const E = n.over = _t(Eu, _);
  e = fn(e);
  const z = +le(e.pxAlign, 1), R = $l(z);
  (e.plugins || []).forEach((o) => {
    o.opts && (e = o.opts(n, e) || e);
  });
  const j = e.ms || 1e-3, $ = n.series = r == 1 ? Al(e.series || [], ml, wl, !1) : ad(e.series || [null], yl), I = n.axes = Al(e.axes || [], gl, _l, !0), S = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((o) => {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1);
  });
  const M = r == 2 ? $[1].facets[0].scale : $[0].scale, Q = {
    axes: Qa,
    series: qa
  }, K = (e.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function te(o) {
    const a = o.distr == 3 ? (c) => Kt(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => so(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: m } = o, v = m - f;
      return (u - f) / v;
    };
  }
  function q(o) {
    let a = S[o];
    if (a == null) {
      let c = (e.scales || Fn)[o] || Fn;
      if (c.from != null) {
        q(c.from);
        let u = Ce({}, S[c.from], c, { key: o });
        u.valToPct = te(u), S[o] = u;
      } else {
        a = S[o] = Ce({}, o == M ? $a : Zh, c), a.key = o;
        let u = a.time, f = a.range, m = li(f);
        if ((o != M || r == 2 && !u) && (m && (f[0] == null || f[1] == null) && (f = {
          min: f[0] == null ? tl : {
            mode: 1,
            hard: f[0],
            soft: f[0]
          },
          max: f[1] == null ? tl : {
            mode: 1,
            hard: f[1],
            soft: f[1]
          }
        }, m = !1), !m && Sr(f))) {
          let v = f;
          f = (y, x, C) => x == null ? dn : br(x, C, v);
        }
        a.range = ie(f || (u ? cd : o == M ? a.distr == 3 ? hd : a.distr == 4 ? dd : za : a.distr == 3 ? Na : a.distr == 4 ? Oa : ud)), a.auto = ie(m ? !1 : a.auto), a.clamp = ie(a.clamp || Yh), a._min = a._max = null, a.valToPct = te(a);
      }
    }
  }
  q("x"), q("y"), r == 1 && $.forEach((o) => {
    q(o.scale);
  }), I.forEach((o) => {
    q(o.scale);
  });
  for (let o in e.scales)
    q(o);
  const A = S[M], Z = A.distr;
  let N, W;
  A.ori == 0 ? (at(p, xu), N = s, W = l) : (at(p, $u), N = l, W = s);
  const F = {};
  for (let o in S) {
    let a = S[o];
    (a.min != null || a.max != null) && (F[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const ne = e.tzDate || ((o) => new Date(De(o / j))), H = e.fmtDate || jo, et = j == 1 ? xh(ne) : Sh(ne), we = dl(ne, hl(j == 1 ? wh : kh, H)), oe = pl(ne, fl(Eh, H)), de = [], X = n.legend = Ce({}, Ph, e.legend), O = n.cursor = Ce({}, Lh, { drag: { y: r == 2 } }, e.cursor), Te = X.show, Ge = O.show, xe = X.markers;
  X.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, wt, nt, ke = [], zt = [], Wt, dt = !1, ti = {};
  if (X.live) {
    const o = $[1] ? $[1].values : null;
    dt = o != null, Wt = dt ? o(n, 1, 0) : { _: 0 };
    for (let a in Wt)
      ti[a] = Ho;
  }
  if (Te)
    if (ue = At("table", zu, p), nt = At("tbody", null, ue), X.mount(n, ue), dt) {
      wt = At("thead", null, ue, nt);
      let o = At("tr", null, wt);
      At("th", null, o);
      for (var Ri in Wt)
        At("th", Us, o).textContent = Ri;
    } else
      at(ue, Ou), X.live && at(ue, Nu);
  const Fi = { show: !0 }, xn = { show: !1 };
  function Kn(o, a) {
    if (a == 0 && (dt || !X.live || r == 2))
      return dn;
    let c = [], u = At("tr", Lu, nt, nt.childNodes[a]);
    at(u, o.class), o.show || at(u, Ti);
    let f = At("th", null, u);
    if (xe.show) {
      let y = _t(Hu, f);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (y.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let m = _t(Us, f);
    o.label instanceof HTMLElement ? m.appendChild(o.label) : m.textContent = o.label, a > 0 && (xe.show || (m.style.color = o.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), qe("click", f, (y) => {
      if (O._lock)
        return;
      yi(y);
      let x = $.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let C = $.some((T, D) => D > 0 && D != x && T.show);
        $.forEach((T, D) => {
          D > 0 && Lt(D, C ? D == x ? Fi : xn : Fi, !0, Ee.setSeries);
        });
      } else
        Lt(x, { show: !o.show }, !0, Ee.setSeries);
    }, !1), ji && qe(Gs, f, (y) => {
      O._lock || (yi(y), Lt($.indexOf(o), tn, !0, Ee.setSeries));
    }, !1));
    for (var v in Wt) {
      let y = At("td", Ru, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const gi = /* @__PURE__ */ new Map();
  function qe(o, a, c, u = !0) {
    const f = gi.get(a) || {}, m = O.bind[o](n, a, c, u);
    m && (Mi(o, a, f[o] = m), gi.set(a, f));
  }
  function Ii(o, a, c) {
    const u = gi.get(a) || {};
    for (let f in u)
      (o == null || f == o) && (yo(f, a, u[f]), delete u[f]);
    o == null && gi.delete(a);
  }
  let Gt = 0, mi = 0, Y = 0, P = 0, me = 0, Pe = 0, Bi = me, bi = Pe, Nt = Y, _i = P, rt = 0, ft = 0, tt = 0, xt = 0;
  n.bbox = {};
  let Mr = !1, Yn = !1, Ui = !1, vi = !1, Zn = !1, pt = !1;
  function zr(o, a, c) {
    (c || o != n.width || a != n.height) && Qo(o, a), Ki(!1), Ui = !0, Yn = !0, Yi();
  }
  function Qo(o, a) {
    n.width = Gt = Y = o, n.height = mi = P = a, me = Pe = 0, Ia(), Ba();
    let c = n.bbox;
    rt = c.left = Ei(me * ce, 0.5), ft = c.top = Ei(Pe * ce, 0.5), tt = c.width = Ei(Y * ce, 0.5), xt = c.height = Ei(P * ce, 0.5);
  }
  const Ha = 3;
  function Ra() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = Za(a), u = Ja(a);
      o = a == Ha || c && u, o || (Qo(n.width, n.height), Yn = !0);
    }
  }
  function Fa({ width: o, height: a }) {
    zr(o, a);
  }
  n.setSize = Fa;
  function Ia() {
    let o = !1, a = !1, c = !1, u = !1;
    I.forEach((f, m) => {
      if (f.show && f._show) {
        let { side: v, _size: y } = f, x = v % 2, C = f.label != null ? f.labelSize : 0, T = y + C;
        T > 0 && (x ? (Y -= T, v == 3 ? (me += T, u = !0) : c = !0) : (P -= T, v == 0 ? (Pe += T, o = !0) : a = !0));
      }
    }), wi[0] = o, wi[1] = c, wi[2] = a, wi[3] = u, Y -= ii[1] + ii[3], me += ii[3], P -= ii[2] + ii[0], Pe += ii[0];
  }
  function Ba() {
    let o = me + Y, a = Pe + P, c = me, u = Pe;
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
    I.forEach((m, v) => {
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
      let x = v, C = c(f, m, v, y) ?? pe, T = C >= 0 && C < pe, D = A.ori == 0 ? Y : P, G = O.left, ae = t[0], se = t[m];
      if (a.has(se[v])) {
        x = null;
        let ee = null, U = null, L;
        if (u == 0 || u == -1)
          for (L = v; ee == null && L-- > 0; )
            a.has(se[L]) || (ee = L);
        if (u == 0 || u == 1)
          for (L = v; U == null && L++ < se.length; )
            a.has(se[L]) || (U = L);
        if (ee != null || U != null)
          if (T) {
            let ve = ee == null ? -1 / 0 : N(ae[ee], A, D, 0), Se = U == null ? 1 / 0 : N(ae[U], A, D, 0), Ie = G - ve, fe = Se - G;
            Ie <= fe ? Ie <= C && (x = ee) : fe <= C && (x = U);
          } else
            x = U == null ? ee : ee == null ? U : v - ee <= U - v ? ee : U;
      } else T && Me(G - N(ae[v], A, D, 0)) > C && (x = null);
      return x;
    };
  }
  const yi = (o) => {
    O.event = o;
  };
  O.idxs = de, O._lock = !1;
  let Ve = O.points;
  Ve.show = ie(Ve.show), Ve.size = ie(Ve.size), Ve.stroke = ie(Ve.stroke), Ve.width = ie(Ve.width), Ve.fill = ie(Ve.fill);
  const Ot = n.focus = Ce({}, e.focus || { alpha: 0.3 }, O.focus), ji = Ot.prox >= 0, Vi = ji && Ve.one;
  let gt = [], Wi = [], Gi = [];
  function Xo(o, a) {
    let c = Ve.show(n, a);
    if (c instanceof HTMLElement)
      return at(c, Mu), at(c, o.class), It(c, -10, -10, Y, P), E.insertBefore(c, gt[a]), c;
  }
  function es(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && S[o.scale].time, u = o.value;
      o.value = c ? ll(u) ? pl(ne, fl(u, H)) : u || oe : u || Gh, o.label = o.label || (c ? Rh : Hh);
    }
    if (Vi || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || sd || Zu, o.fillTo = ie(o.fillTo || Jh), o.pxAlign = +le(o.pxAlign, z), o.pxRound = $l(o.pxAlign), o.stroke = ie(o.stroke || null), o.fill = ie(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = qh(Je(1, o.width), 1), u = o.points = Ce({}, {
        size: c,
        width: Je(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: ld,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = ie(u.show), u.filter = ie(u.filter), u.fill = ie(u.fill), u.stroke = ie(u.stroke), u.paths = ie(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Te) {
      let c = Kn(o, a);
      ke.splice(a, 0, c[0]), zt.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Ge) {
      de.splice(a, 0, null);
      let c = null;
      Vi ? a == 0 && (c = Xo(o, a)) : a > 0 && (c = Xo(o, a)), gt.splice(a, 0, c), Wi.splice(a, 0, 0), Gi.splice(a, 0, 0);
    }
    Fe("addSeries", a);
  }
  function Ua(o, a) {
    a = a ?? $.length, o = r == 1 ? Ao(o, a, ml, wl) : Ao(o, a, {}, yl), $.splice(a, 0, o), es($[a], a);
  }
  n.addSeries = Ua;
  function ja(o) {
    if ($.splice(o, 1), Te) {
      X.values.splice(o, 1), zt.splice(o, 1);
      let a = ke.splice(o, 1)[0];
      Ii(null, a.firstChild), a.remove();
    }
    Ge && (de.splice(o, 1), gt.splice(o, 1)[0].remove(), Wi.splice(o, 1), Gi.splice(o, 1)), Fe("delSeries", o);
  }
  n.delSeries = ja;
  const wi = [!1, !1, !1, !1];
  function Va(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = S[o.scale];
      u == null && (o.scale = c ? $[1].scale : M, u = S[o.scale]);
      let f = u.time;
      o.size = ie(o.size), o.space = ie(o.space), o.rotate = ie(o.rotate), li(o.incrs) && o.incrs.forEach((v) => {
        !ui.has(v) && ui.set(v, ra(v));
      }), o.incrs = ie(o.incrs || (u.distr == 2 ? _h : f ? j == 1 ? yh : $h : Ci)), o.splits = ie(o.splits || (f && u.distr == 1 ? et : u.distr == 3 ? xo : u.distr == 4 ? Bh : Ih)), o.stroke = ie(o.stroke), o.grid.stroke = ie(o.grid.stroke), o.ticks.stroke = ie(o.ticks.stroke), o.border.stroke = ie(o.border.stroke);
      let m = o.values;
      o.values = // static array of tick values
      li(m) && !li(m[0]) ? ie(m) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          li(m) ? dl(ne, hl(m, H)) : (
            // fmtDate string tpl
            ll(m) ? Ah(ne, m) : m || we
          )
        ) : m || Fh
      ), o.filter = ie(o.filter || (u.distr >= 3 && u.log == 10 ? Vh : u.distr == 3 && u.log == 2 ? Wh : ia)), o.font = El(o.font), o.labelFont = El(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (wi[a] = !0, o._el = _t(Cu, _));
    }
  }
  function $n(o, a, c, u) {
    let [f, m, v, y] = c, x = a % 2, C = 0;
    return x == 0 && (y || m) && (C = a == 0 && !f || a == 2 && !v ? De(gl.size / 3) : 0), x == 1 && (f || v) && (C = a == 1 && !m || a == 3 && !y ? De(_l.size / 2) : 0), C;
  }
  const ts = n.padding = (e.padding || [$n, $n, $n, $n]).map((o) => ie(le(o, $n))), ii = n._padding = ts.map((o, a) => o(n, a, wi, 0));
  let Be, Oe = null, Le = null;
  const Jn = r == 1 ? $[0].idxs : null;
  let $t = null, kn = !1;
  function is(o, a) {
    if (t = o ?? [], n.data = n._data = t, r == 2) {
      Be = 0;
      for (let c = 1; c < $.length; c++)
        Be += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), $t = t[0], Be = $t.length;
      let c = t;
      if (Z == 2) {
        c = t.slice();
        let u = c[0] = Array(Be);
        for (let f = 0; f < Be; f++)
          u[f] = f;
      }
      n._data = t = c;
    }
    if (Ki(!0), Fe("setData"), Z == 2 && (Ui = !0), a !== !1) {
      let c = A;
      c.auto(n, kn) ? Nr() : ri(M, c.min, c.max), vi = vi || O.left >= 0, pt = !0, Yi();
    }
  }
  n.setData = is;
  function Nr() {
    kn = !0;
    let o, a;
    r == 1 && (Be > 0 ? (Oe = Jn[0] = 0, Le = Jn[1] = Be - 1, o = t[0][Oe], a = t[0][Le], Z == 2 ? (o = Oe, a = Le) : o == a && (Z == 3 ? [o, a] = $r(o, o, A.log, !1) : Z == 4 ? [o, a] = Fo(o, o, A.log, !1) : A.time ? a = o + De(86400 / j) : [o, a] = br(o, a, Io, !0))) : (Oe = Jn[0] = o = null, Le = Jn[1] = a = null)), ri(M, o, a);
  }
  let Qn, qi, Or, Lr, Hr, Rr, Fr, Ir, Br, it;
  function ns(o, a, c, u, f, m) {
    o ??= Vs, c ??= Uo, u ??= "butt", f ??= Vs, m ??= "round", o != Qn && (g.strokeStyle = Qn = o), f != qi && (g.fillStyle = qi = f), a != Or && (g.lineWidth = Or = a), m != Hr && (g.lineJoin = Hr = m), u != Rr && (g.lineCap = Rr = u), c != Lr && g.setLineDash(Lr = c);
  }
  function rs(o, a, c, u) {
    a != qi && (g.fillStyle = qi = a), o != Fr && (g.font = Fr = o), c != Ir && (g.textAlign = Ir = c), u != Br && (g.textBaseline = Br = u);
  }
  function Ur(o, a, c, u, f = 0) {
    if (u.length > 0 && o.auto(n, kn) && (a == null || a.min == null)) {
      let m = le(Oe, 0), v = le(Le, u.length - 1), y = c.min == null ? Vu(u, m, v, f, o.distr == 3) : [c.min, c.max];
      o.min = Ct(o.min, c.min = y[0]), o.max = Je(o.max, c.max = y[1]);
    }
  }
  const os = { min: null, max: null };
  function Wa() {
    for (let u in S) {
      let f = S[u];
      F[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      F[M] != null && f.auto(n, kn)) && (F[u] = os);
    }
    for (let u in S) {
      let f = S[u];
      F[u] == null && f.from != null && F[f.from] != null && (F[u] = os);
    }
    F[M] != null && Ki(!0);
    let o = {};
    for (let u in F) {
      let f = F[u];
      if (f != null) {
        let m = o[u] = fn(S[u], Xu);
        if (f.min != null)
          Ce(m, f);
        else if (u != M || r == 2)
          if (Be == 0 && m.from == null) {
            let v = m.range(n, null, null, u);
            m.min = v[0], m.max = v[1];
          } else
            m.min = pe, m.max = -pe;
      }
    }
    if (Be > 0) {
      $.forEach((u, f) => {
        if (r == 1) {
          let m = u.scale, v = F[m];
          if (v == null)
            return;
          let y = o[m];
          if (f == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Oe = Et(y.min, t[0]), Le = Et(y.max, t[0]), Le - Oe > 1 && (t[0][Oe] < y.min && Oe++, t[0][Le] > y.max && Le--), u.min = $t[Oe], u.max = $t[Le];
          } else u.show && u.auto && Ur(y, v, u, t[f], u.sorted);
          u.idxs[0] = Oe, u.idxs[1] = Le;
        } else if (f > 0 && u.show && u.auto) {
          let [m, v] = u.facets, y = m.scale, x = v.scale, [C, T] = t[f], D = o[y], G = o[x];
          D != null && Ur(D, F[y], m, C, m.sorted), G != null && Ur(G, F[x], v, T, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in o) {
        let f = o[u], m = F[u];
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
        m._min = v == 3 ? Kt(m.min) : v == 4 ? so(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? Kt(m.max) : v == 4 ? so(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      $.forEach((u, f) => {
        r == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Ui = !0, Fe("setScale", u);
      Ge && O.left >= 0 && (vi = pt = !0);
    }
    for (let u in F)
      F[u] = null;
  }
  function Ga(o) {
    let a = wo(Oe - 1, 0, Be - 1), c = wo(Le + 1, 0, Be - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < Be - 1; )
      c++;
    return [a, c];
  }
  function qa() {
    if (Be > 0) {
      let o = $.some((a) => a._focus) && it != Ot.alpha;
      o && (g.globalAlpha = it = Ot.alpha), $.forEach((a, c) => {
        if (c > 0 && a.show && (ss(c, !1), ss(c, !0), a._paths == null)) {
          let u = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha);
          let f = r == 2 ? [0, t[c][0].length - 1] : Ga(t[c]);
          a._paths = a.paths(n, c, f[0], f[1]), it != u && (g.globalAlpha = it = u);
        }
      }), $.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha), a._paths != null && ls(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Oe, Le, f), v = a.points.filter(n, c, m, f);
            (m || v) && (a.points._paths = a.points.paths(n, c, Oe, Le, v), ls(c, !0));
          }
          it != u && (g.globalAlpha = it = u), Fe("drawSeries", c);
        }
      }), o && (g.globalAlpha = it = 1);
    }
  }
  function ss(o, a) {
    let c = a ? $[o].points : $[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function ls(o, a) {
    let c = a ? $[o].points : $[o], {
      stroke: u,
      fill: f,
      clip: m,
      flags: v,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: C = c.width
    } = c._paths;
    C = ge(C * ce, 3);
    let T = null, D = C % 2 / 2;
    a && x == null && (x = C > 0 ? "#fff" : y);
    let G = c.pxAlign == 1 && D > 0;
    if (G && g.translate(D, D), !a) {
      let ae = rt - C / 2, se = ft - C / 2, ee = tt + C, U = xt + C;
      T = new Path2D(), T.rect(ae, se, ee, U);
    }
    a ? jr(y, C, c.dash, c.cap, x, u, f, v, m) : Ka(o, y, C, c.dash, c.cap, x, u, f, v, T, m), G && g.translate(-D, -D);
  }
  function Ka(o, a, c, u, f, m, v, y, x, C, T) {
    let D = !1;
    x != 0 && J.forEach((G, ae) => {
      if (G.series[0] == o) {
        let se = $[G.series[1]], ee = t[G.series[1]], U = (se._paths || Fn).band;
        li(U) && (U = G.dir == 1 ? U[0] : U[1]);
        let L, ve = null;
        se.show && U && Gu(ee, Oe, Le) ? (ve = G.fill(n, ae) || m, L = se._paths.clip) : U = null, jr(a, c, u, f, ve, v, y, x, C, T, L, U), D = !0;
      }
    }), D || jr(a, c, u, f, m, v, y, x, C, T);
  }
  const as = pn | ko;
  function jr(o, a, c, u, f, m, v, y, x, C, T, D) {
    ns(o, a, c, u, f), (x || C || D) && (g.save(), x && g.clip(x), C && g.clip(C)), D ? (y & as) == as ? (g.clip(D), T && g.clip(T), er(f, v), Xn(o, m, a)) : y & ko ? (er(f, v), g.clip(D), Xn(o, m, a)) : y & pn && (g.save(), g.clip(D), T && g.clip(T), er(f, v), g.restore(), Xn(o, m, a)) : (er(f, v), Xn(o, m, a)), (x || C || D) && g.restore();
  }
  function Xn(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      g.strokeStyle = Qn = f, g.stroke(u);
    }) : a != null && o && g.stroke(a));
  }
  function er(o, a) {
    a instanceof Map ? a.forEach((c, u) => {
      g.fillStyle = qi = u, g.fill(c);
    }) : a != null && o && g.fill(a);
  }
  function Ya(o, a, c, u) {
    let f = I[o], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let v = f._space = f.space(n, o, a, c, u), y = f._incrs = f.incrs(n, o, a, c, u, v);
      m = fd(a, c, y, u, v);
    }
    return f._found = m;
  }
  function Vr(o, a, c, u, f, m, v, y, x, C) {
    let T = v % 2 / 2;
    z == 1 && g.translate(T, T), ns(y, v, x, C, y), g.beginPath();
    let D, G, ae, se, ee = f + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (G = f, se = ee) : (D = f, ae = ee);
    for (let U = 0; U < o.length; U++)
      a[U] != null && (c == 0 ? D = ae = o[U] : G = se = o[U], g.moveTo(D, G), g.lineTo(ae, se));
    g.stroke(), z == 1 && g.translate(-T, -T);
  }
  function Za(o) {
    let a = !0;
    return I.forEach((c, u) => {
      if (!c.show)
        return;
      let f = S[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, Ki(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Ki(!1));
      let m = c.side, v = m % 2, { min: y, max: x } = f, [C, T] = Ya(u, y, x, v == 0 ? Y : P);
      if (T == 0)
        return;
      let D = f.distr == 2, G = c._splits = c.splits(n, u, y, x, C, T, D), ae = f.distr == 2 ? G.map((L) => $t[L]) : G, se = f.distr == 2 ? $t[G[1]] - $t[G[0]] : C, ee = c._values = c.values(n, c.filter(n, ae, u, T, se), u, T, se);
      c._rotate = m == 2 ? c.rotate(n, ee, u, T) : 0;
      let U = c._size;
      c._size = vt(c.size(n, ee, u, o)), U != null && c._size != U && (a = !1);
    }), a;
  }
  function Ja(o) {
    let a = !0;
    return ts.forEach((c, u) => {
      let f = c(n, u, wi, o);
      f != ii[u] && (a = !1), ii[u] = f;
    }), a;
  }
  function Qa() {
    for (let o = 0; o < I.length; o++) {
      let a = I[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, m, v = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [x, C] = a._found;
      if (a.label != null) {
        let Ye = a.labelGap * y, lt = De((a._lpos + Ye) * ce);
        rs(a.labelFont[0], v, "center", c == 2 ? Dn : js), g.save(), u == 1 ? (f = m = 0, g.translate(
          lt,
          De(ft + xt / 2)
        ), g.rotate((c == 3 ? -hr : hr) / 2)) : (f = De(rt + tt / 2), m = lt);
        let ki = ea(a.label) ? a.label(n, o, x, C) : a.label;
        g.fillText(ki, f, m), g.restore();
      }
      if (C == 0)
        continue;
      let T = S[a.scale], D = u == 0 ? tt : xt, G = u == 0 ? rt : ft, ae = a._splits, se = T.distr == 2 ? ae.map((Ye) => $t[Ye]) : ae, ee = T.distr == 2 ? $t[ae[1]] - $t[ae[0]] : x, U = a.ticks, L = a.border, ve = U.show ? U.size : 0, Se = De(ve * ce), Ie = De((a.alignTo == 2 ? a._size - ve - a.gap : a.gap) * ce), fe = a._rotate * -hr / 180, Ae = R(a._pos * ce), ot = (Se + Ie) * y, Ke = Ae + ot;
      m = u == 0 ? Ke : 0, f = u == 1 ? Ke : 0;
      let mt = a.font[0], kt = a.align == 1 ? rn : a.align == 2 ? no : fe > 0 ? rn : fe < 0 ? no : u == 0 ? "center" : c == 3 ? no : rn, Rt = fe || u == 1 ? "middle" : c == 2 ? Dn : js;
      rs(mt, v, kt, Rt);
      let st = a.font[1] * a.lineGap, bt = ae.map((Ye) => R(h(Ye, T, D, G))), St = a._values;
      for (let Ye = 0; Ye < St.length; Ye++) {
        let lt = St[Ye];
        if (lt != null) {
          u == 0 ? f = bt[Ye] : m = bt[Ye], lt = "" + lt;
          let ki = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let Ze = 0; Ze < ki.length; Ze++) {
            let Es = ki[Ze];
            fe ? (g.save(), g.translate(f, m + Ze * st), g.rotate(fe), g.fillText(Es, 0, 0), g.restore()) : g.fillText(Es, f, m + Ze * st);
          }
        }
      }
      U.show && Vr(
        bt,
        U.filter(n, se, o, C, ee),
        u,
        c,
        Ae,
        Se,
        ge(U.width * ce, 3),
        U.stroke(n, o),
        U.dash,
        U.cap
      );
      let Ft = a.grid;
      Ft.show && Vr(
        bt,
        Ft.filter(n, se, o, C, ee),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? ft : rt,
        u == 0 ? xt : tt,
        ge(Ft.width * ce, 3),
        Ft.stroke(n, o),
        Ft.dash,
        Ft.cap
      ), L.show && Vr(
        [Ae],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? ft : rt,
        u == 1 ? xt : tt,
        ge(L.width * ce, 3),
        L.stroke(n, o),
        L.dash,
        L.cap
      );
    }
    Fe("drawAxes");
  }
  function Ki(o) {
    $.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let tr = !1, Wr = !1, Sn = [];
  function Xa() {
    Wr = !1;
    for (let o = 0; o < Sn.length; o++)
      Fe(...Sn[o]);
    Sn.length = 0;
  }
  function Yi() {
    tr || (sh(cs), tr = !0);
  }
  function ec(o, a = !1) {
    tr = !0, Wr = a, o(n), cs(), a && Sn.length > 0 && queueMicrotask(Xa);
  }
  n.batch = ec;
  function cs() {
    if (Mr && (Wa(), Mr = !1), Ui && (Ra(), Ui = !1), Yn) {
      if (ye(k, rn, me), ye(k, Dn, Pe), ye(k, Nn, Y), ye(k, On, P), ye(E, rn, me), ye(E, Dn, Pe), ye(E, Nn, Y), ye(E, On, P), ye(_, Nn, Gt), ye(_, On, mi), b.width = De(Gt * ce), b.height = De(mi * ce), I.forEach(({ _el: o, _show: a, _size: c, _pos: u, side: f }) => {
        if (o != null)
          if (a) {
            let m = f === 3 || f === 0 ? c : 0, v = f % 2 == 1;
            ye(o, v ? "left" : "top", u - m), ye(o, v ? "width" : "height", c), ye(o, v ? "top" : "left", v ? Pe : me), ye(o, v ? "height" : "width", v ? P : Y), vo(o, Ti);
          } else
            at(o, Ti);
      }), Qn = qi = Or = Hr = Rr = Fr = Ir = Br = Lr = null, it = 1, Cn(!0), me != Bi || Pe != bi || Y != Nt || P != _i) {
        Ki(!1);
        let o = Y / Nt, a = P / _i;
        if (Ge && !vi && O.left >= 0) {
          O.left *= o, O.top *= a, Zi && It(Zi, De(O.left), 0, Y, P), Ji && It(Ji, 0, De(O.top), Y, P);
          for (let c = 0; c < gt.length; c++) {
            let u = gt[c];
            u != null && (Wi[c] *= o, Gi[c] *= a, It(u, vt(Wi[c]), vt(Gi[c]), Y, P));
          }
        }
        if (_e.show && !Zn && _e.left >= 0 && _e.width > 0) {
          _e.left *= o, _e.width *= o, _e.top *= a, _e.height *= a;
          for (let c in Jr)
            ye(en, c, _e[c]);
        }
        Bi = me, bi = Pe, Nt = Y, _i = P;
      }
      Fe("setSize"), Yn = !1;
    }
    Gt > 0 && mi > 0 && (g.clearRect(0, 0, b.width, b.height), Fe("drawClear"), K.forEach((o) => o()), Fe("draw")), _e.show && Zn && (ir(_e), Zn = !1), Ge && vi && ($i(null, !0, !1), vi = !1), X.show && X.live && pt && (Yr(), pt = !1), d || (d = !0, n.status = 1, Fe("ready")), kn = !1, tr = !1;
  }
  n.redraw = (o, a) => {
    Ui = a || !1, o !== !1 ? ri(M, A.min, A.max) : Yi();
  };
  function Gr(o, a) {
    let c = S[o];
    if (c.from == null) {
      if (Be == 0) {
        let u = c.range(n, a.min, a.max, o);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (Be > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      o == M && c.distr == 2 && Be > 0 && (a.min = Et(a.min, t[0]), a.max = Et(a.max, t[0]), a.min == a.max && a.max++), F[o] = a, Mr = !0, Yi();
    }
  }
  n.setScale = Gr;
  let qr, Kr, Zi, Ji, us, hs, Qi, Xi, ds, fs, be, $e, ni = !1;
  const Ue = O.drag;
  let He = Ue.x, Re = Ue.y;
  Ge && (O.x && (qr = _t(Pu, E)), O.y && (Kr = _t(Du, E)), A.ori == 0 ? (Zi = qr, Ji = Kr) : (Zi = Kr, Ji = qr), be = O.left, $e = O.top);
  const _e = n.select = Ce({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), en = _e.show ? _t(Tu, _e.over ? E : k) : null;
  function ir(o, a) {
    if (_e.show) {
      for (let c in o)
        _e[c] = o[c], c in Jr && ye(en, c, o[c]);
      a !== !1 && Fe("setSelect");
    }
  }
  n.setSelect = ir;
  function tc(o) {
    if ($[o].show)
      Te && vo(ke[o], Ti);
    else if (Te && at(ke[o], Ti), Ge) {
      let c = Vi ? gt[0] : gt[o];
      c != null && It(c, -10, -10, Y, P);
    }
  }
  function ri(o, a, c) {
    Gr(o, { min: a, max: c });
  }
  function Lt(o, a, c, u) {
    a.focus != null && sc(o), a.show != null && $.forEach((f, m) => {
      m > 0 && (o == m || o == null) && (f.show = a.show, tc(m), r == 2 ? (ri(f.facets[0].scale, null, null), ri(f.facets[1].scale, null, null)) : ri(f.scale, null, null), Yi());
    }), c !== !1 && Fe("setSeries", o, a), u && Tn("setSeries", n, o, a);
  }
  n.setSeries = Lt;
  function ic(o, a) {
    Ce(J[o], a);
  }
  function nc(o, a) {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function rc(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = nc, n.setBand = ic, n.delBand = rc;
  function oc(o, a) {
    $[o].alpha = a, Ge && gt[o] != null && (gt[o].style.opacity = a), Te && ke[o] && (ke[o].style.opacity = a);
  }
  let qt, oi, xi;
  const tn = { focus: !0 };
  function sc(o) {
    if (o != xi) {
      let a = o == null, c = Ot.alpha != 1;
      $.forEach((u, f) => {
        if (r == 1 || f > 0) {
          let m = a || f == 0 || f == o;
          u._focus = a ? null : m, c && oc(f, m ? 1 : Ot.alpha);
        }
      }), xi = o, c && Yi();
    }
  }
  Te && ji && qe(qs, ue, (o) => {
    O._lock || (yi(o), xi != null && Lt(null, tn, !0, Ee.setSeries));
  });
  function Ht(o, a, c) {
    let u = S[a];
    c && (o = o / ce - (u.ori == 1 ? Pe : me));
    let f = Y;
    u.ori == 1 && (f = P, o = f - o), u.dir == -1 && (o = f - o);
    let m = u._min, v = u._max, y = o / f, x = m + (v - m) * y, C = u.distr;
    return C == 3 ? hn(10, x) : C == 4 ? Ku(x, u.asinh) : C == 100 ? u.bwd(x) : x;
  }
  function lc(o, a) {
    let c = Ht(o, M, a);
    return Et(c, t[0], Oe, Le);
  }
  n.valToIdx = (o) => Et(o, t[0]), n.posToIdx = lc, n.posToVal = Ht, n.valToPos = (o, a, c) => S[a].ori == 0 ? s(
    o,
    S[a],
    c ? tt : Y,
    c ? rt : 0
  ) : l(
    o,
    S[a],
    c ? xt : P,
    c ? ft : 0
  ), n.setCursor = (o, a, c) => {
    be = o.left, $e = o.top, $i(null, a, c);
  };
  function ps(o, a) {
    ye(en, rn, _e.left = o), ye(en, Nn, _e.width = a);
  }
  function gs(o, a) {
    ye(en, Dn, _e.top = o), ye(en, On, _e.height = a);
  }
  let An = A.ori == 0 ? ps : gs, En = A.ori == 1 ? ps : gs;
  function ac() {
    if (Te && X.live)
      for (let o = r == 2 ? 1 : 0; o < $.length; o++) {
        if (o == 0 && dt)
          continue;
        let a = X.values[o], c = 0;
        for (let u in a)
          zt[o][c++].firstChild.nodeValue = a[u];
      }
  }
  function Yr(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, u) => {
      de[u] = c;
    }) : Qu(o.idx) || de.fill(o.idx), X.idx = de[0]), Te && X.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || r == 1 && !dt) && cc(c, de[c]);
      ac();
    }
    pt = !1, a !== !1 && Fe("setLegend");
  }
  n.setLegend = Yr;
  function cc(o, a) {
    let c = $[o], u = o == 0 && Z == 2 ? $t : t[o], f;
    dt ? f = c.values(n, o, a) ?? ti : (f = c.value(n, a == null ? null : u[a], o, a), f = f == null ? ti : { _: f }), X.values[o] = f;
  }
  function $i(o, a, c) {
    ds = be, fs = $e, [be, $e] = O.move(n, be, $e), O.left = be, O.top = $e, Ge && (Zi && It(Zi, De(be), 0, Y, P), Ji && It(Ji, 0, De($e), Y, P));
    let u, f = Oe > Le;
    qt = pe, oi = null;
    let m = A.ori == 0 ? Y : P, v = A.ori == 1 ? Y : P;
    if (be < 0 || Be == 0 || f) {
      u = O.idx = null;
      for (let y = 0; y < $.length; y++) {
        let x = gt[y];
        x != null && It(x, -10, -10, Y, P);
      }
      ji && Lt(null, tn, !0, o == null && Ee.setSeries), X.live && (de.fill(u), pt = !0);
    } else {
      let y, x, C;
      r == 1 && (y = A.ori == 0 ? be : $e, x = Ht(y, M), u = O.idx = Et(x, t[0], Oe, Le), C = N(t[0][u], A, m, 0));
      let T = -10, D = -10, G = 0, ae = 0, se = !0, ee = "", U = "";
      for (let L = r == 2 ? 1 : 0; L < $.length; L++) {
        let ve = $[L], Se = de[L], Ie = Se == null ? null : r == 1 ? t[L][Se] : t[L][1][Se], fe = O.dataIdx(n, L, u, x), Ae = fe == null ? null : r == 1 ? t[L][fe] : t[L][1][fe];
        if (pt = pt || Ae != Ie || fe != Se, de[L] = fe, L > 0 && ve.show) {
          let ot = fe == null ? -10 : fe == u ? C : N(r == 1 ? t[0][fe] : t[L][0][fe], A, m, 0), Ke = Ae == null ? -10 : W(Ae, r == 1 ? S[ve.scale] : S[ve.facets[1].scale], v, 0);
          if (ji && Ae != null) {
            let mt = A.ori == 1 ? be : $e, kt = Me(Ot.dist(n, L, fe, Ke, mt));
            if (kt < qt) {
              let Rt = Ot.bias;
              if (Rt != 0) {
                let st = Ht(mt, ve.scale), bt = Ae >= 0 ? 1 : -1, St = st >= 0 ? 1 : -1;
                St == bt && (St == 1 ? Rt == 1 ? Ae >= st : Ae <= st : (
                  // >= 0
                  Rt == 1 ? Ae <= st : Ae >= st
                )) && (qt = kt, oi = L);
              } else
                qt = kt, oi = L;
            }
          }
          if (pt || Vi) {
            let mt, kt;
            A.ori == 0 ? (mt = ot, kt = Ke) : (mt = Ke, kt = ot);
            let Rt, st, bt, St, Ft, Ye, lt = !0, ki = Ve.bbox;
            if (ki != null) {
              lt = !1;
              let Ze = ki(n, L);
              bt = Ze.left, St = Ze.top, Rt = Ze.width, st = Ze.height;
            } else
              bt = mt, St = kt, Rt = st = Ve.size(n, L);
            if (Ye = Ve.fill(n, L), Ft = Ve.stroke(n, L), Vi)
              L == oi && qt <= Ot.prox && (T = bt, D = St, G = Rt, ae = st, se = lt, ee = Ye, U = Ft);
            else {
              let Ze = gt[L];
              Ze != null && (Wi[L] = bt, Gi[L] = St, el(Ze, Rt, st, lt), Qs(Ze, Ye, Ft), It(Ze, vt(bt), vt(St), Y, P));
            }
          }
        }
      }
      if (Vi) {
        let L = Ot.prox, ve = xi == null ? qt <= L : qt > L || oi != xi;
        if (pt || ve) {
          let Se = gt[0];
          Se != null && (Wi[0] = T, Gi[0] = D, el(Se, G, ae, se), Qs(Se, ee, U), It(Se, vt(T), vt(D), Y, P));
        }
      }
    }
    if (_e.show && ni)
      if (o != null) {
        let [y, x] = Ee.scales, [C, T] = Ee.match, [D, G] = o.cursor.sync.scales, ae = o.cursor.drag;
        if (He = ae._x, Re = ae._y, He || Re) {
          let { left: se, top: ee, width: U, height: L } = o.select, ve = o.scales[D].ori, Se = o.posToVal, Ie, fe, Ae, ot, Ke, mt = y != null && C(y, D), kt = x != null && T(x, G);
          mt && He ? (ve == 0 ? (Ie = se, fe = U) : (Ie = ee, fe = L), Ae = S[y], ot = N(Se(Ie, D), Ae, m, 0), Ke = N(Se(Ie + fe, D), Ae, m, 0), An(Ct(ot, Ke), Me(Ke - ot))) : An(0, m), kt && Re ? (ve == 1 ? (Ie = se, fe = U) : (Ie = ee, fe = L), Ae = S[x], ot = W(Se(Ie, G), Ae, v, 0), Ke = W(Se(Ie + fe, G), Ae, v, 0), En(Ct(ot, Ke), Me(Ke - ot))) : En(0, v);
        } else
          Qr();
      } else {
        let y = Me(ds - us), x = Me(fs - hs);
        if (A.ori == 1) {
          let G = y;
          y = x, x = G;
        }
        He = Ue.x && y >= Ue.dist, Re = Ue.y && x >= Ue.dist;
        let C = Ue.uni;
        C != null ? He && Re && (He = y >= C, Re = x >= C, !He && !Re && (x > y ? Re = !0 : He = !0)) : Ue.x && Ue.y && (He || Re) && (He = Re = !0);
        let T, D;
        He && (A.ori == 0 ? (T = Qi, D = be) : (T = Xi, D = $e), An(Ct(T, D), Me(D - T)), Re || En(0, v)), Re && (A.ori == 1 ? (T = Qi, D = be) : (T = Xi, D = $e), En(Ct(T, D), Me(D - T)), He || An(0, m)), !He && !Re && (An(0, 0), En(0, 0));
      }
    if (Ue._x = He, Ue._y = Re, o == null) {
      if (c) {
        if (As != null) {
          let [y, x] = Ee.scales;
          Ee.values[0] = y != null ? Ht(A.ori == 0 ? be : $e, y) : null, Ee.values[1] = x != null ? Ht(A.ori == 1 ? be : $e, x) : null;
        }
        Tn(ro, n, be, $e, Y, P, u);
      }
      if (ji) {
        let y = c && Ee.setSeries, x = Ot.prox;
        xi == null ? qt <= x && Lt(oi, tn, !0, y) : qt > x ? Lt(null, tn, !0, y) : oi != xi && Lt(oi, tn, !0, y);
      }
    }
    pt && (X.idx = u, Yr()), a !== !1 && Fe("setCursor");
  }
  let si = null;
  Object.defineProperty(n, "rect", {
    get() {
      return si == null && Cn(!1), si;
    }
  });
  function Cn(o = !1) {
    o ? si = null : (si = E.getBoundingClientRect(), Fe("syncRect", si));
  }
  function ms(o, a, c, u, f, m, v) {
    O._lock || ni && o != null && o.movementX == 0 && o.movementY == 0 || (Zr(o, a, c, u, f, m, v, !1, o != null), o != null ? $i(null, !0, !0) : $i(a, !0, !1));
  }
  function Zr(o, a, c, u, f, m, v, y, x) {
    if (si == null && Cn(!1), yi(o), o != null)
      c = o.clientX - si.left, u = o.clientY - si.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [C, T] = Ee.scales, D = a.cursor.sync, [G, ae] = D.values, [se, ee] = D.scales, [U, L] = Ee.match, ve = a.axes[0].side % 2 == 1, Se = A.ori == 0 ? Y : P, Ie = A.ori == 1 ? Y : P, fe = ve ? m : f, Ae = ve ? f : m, ot = ve ? u : c, Ke = ve ? c : u;
      if (se != null ? c = U(C, se) ? h(G, S[C], Se, 0) : -10 : c = Se * (ot / fe), ee != null ? u = L(T, ee) ? h(ae, S[T], Ie, 0) : -10 : u = Ie * (Ke / Ae), A.ori == 1) {
        let mt = c;
        c = u, u = mt;
      }
    }
    x && (a == null || a.cursor.event.type == ro) && ((c <= 1 || c >= Y - 1) && (c = Ei(c, Y)), (u <= 1 || u >= P - 1) && (u = Ei(u, P))), y ? (us = c, hs = u, [Qi, Xi] = O.move(n, c, u)) : (be = c, $e = u);
  }
  const Jr = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Qr() {
    ir(Jr, !1);
  }
  let bs, _s, vs, ys;
  function ws(o, a, c, u, f, m, v) {
    ni = !0, He = Re = Ue._x = Ue._y = !1, Zr(o, a, c, u, f, m, v, !0, !1), o != null && (qe(oo, bo, xs, !1), Tn(Ws, n, Qi, Xi, Y, P, null));
    let { left: y, top: x, width: C, height: T } = _e;
    bs = y, _s = x, vs = C, ys = T;
  }
  function xs(o, a, c, u, f, m, v) {
    ni = Ue._x = Ue._y = !1, Zr(o, a, c, u, f, m, v, !1, !0);
    let { left: y, top: x, width: C, height: T } = _e, D = C > 0 || T > 0, G = bs != y || _s != x || vs != C || ys != T;
    if (D && G && ir(_e), Ue.setScale && D && G) {
      let ae = y, se = C, ee = x, U = T;
      if (A.ori == 1 && (ae = x, se = T, ee = y, U = C), He && ri(
        M,
        Ht(ae, M),
        Ht(ae + se, M)
      ), Re)
        for (let L in S) {
          let ve = S[L];
          L != M && ve.from == null && ve.min != pe && ri(
            L,
            Ht(ee + U, L),
            Ht(ee, L)
          );
        }
      Qr();
    } else O.lock && (O._lock = !O._lock, $i(a, !0, o != null));
    o != null && (Ii(oo, bo), Tn(oo, n, be, $e, Y, P, null));
  }
  function uc(o, a, c, u, f, m, v) {
    if (O._lock)
      return;
    yi(o);
    let y = ni;
    if (ni) {
      let x = !0, C = !0, T = 10, D, G;
      A.ori == 0 ? (D = He, G = Re) : (D = Re, G = He), D && G && (x = be <= T || be >= Y - T, C = $e <= T || $e >= P - T), D && x && (be = be < Qi ? 0 : Y), G && C && ($e = $e < Xi ? 0 : P), $i(null, !0, !0), ni = !1;
    }
    be = -10, $e = -10, de.fill(null), $i(null, !0, !0), y && (ni = y);
  }
  function $s(o, a, c, u, f, m, v) {
    O._lock || (yi(o), Nr(), Qr(), o != null && Tn(Ks, n, be, $e, Y, P, null));
  }
  function ks() {
    I.forEach(pd), zr(n.width, n.height, !0);
  }
  Mi(mr, an, ks);
  const nn = {};
  nn.mousedown = ws, nn.mousemove = ms, nn.mouseup = xs, nn.dblclick = $s, nn.setSeries = (o, a, c, u) => {
    let f = Ee.match[2];
    c = f(n, a, c), c != -1 && Lt(c, u, !0, !1);
  }, Ge && (qe(Ws, E, ws), qe(ro, E, ms), qe(Gs, E, (o) => {
    yi(o), Cn(!1);
  }), qe(qs, E, uc), qe(Ks, E, $s), So.add(n), n.syncRect = Cn);
  const nr = n.hooks = e.hooks || {};
  function Fe(o, a, c) {
    Wr ? Sn.push([o, a, c]) : o in nr && nr[o].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((o) => {
    for (let a in o.hooks)
      nr[a] = (nr[a] || []).concat(o.hooks[a]);
  });
  const Ss = (o, a, c) => c, Ee = Ce({
    key: null,
    setSeries: !1,
    filters: {
      pub: ol,
      sub: ol
    },
    scales: [M, $[1] ? $[1].scale : null],
    match: [sl, sl, Ss],
    values: [null, null]
  }, O.sync);
  Ee.match.length == 2 && Ee.match.push(Ss), O.sync = Ee;
  const As = Ee.key, Xr = ka(As);
  function Tn(o, a, c, u, f, m, v) {
    Ee.filters.pub(o, a, c, u, f, m, v) && Xr.pub(o, a, c, u, f, m, v);
  }
  Xr.sub(n);
  function hc(o, a, c, u, f, m, v) {
    Ee.filters.sub(o, a, c, u, f, m, v) && nn[o](null, a, c, u, f, m, v);
  }
  n.pub = hc;
  function dc() {
    Xr.unsub(n), So.delete(n), gi.clear(), yo(mr, an, ks), p.remove(), ue?.remove(), Fe("destroy");
  }
  n.destroy = dc;
  function eo() {
    Fe("init", e, t), is(t || e.data, !1), F[M] ? Gr(M, F[M]) : Nr(), Zn = _e.show && (_e.width > 0 || _e.height > 0), vi = pt = !0, zr(e.width, e.height);
  }
  return $.forEach(es), I.forEach(Va), i ? i instanceof HTMLElement ? (i.appendChild(p), eo()) : i(n, eo) : eo(), n;
}
We.assign = Ce;
We.fmtNum = Bo;
We.rangeNum = br;
We.rangeLog = $r;
We.rangeAsinh = Fo;
We.orient = Hi;
We.pxRatio = ce;
We.join = oh;
We.fmtDate = jo, We.tzDate = mh;
We.sync = ka;
{
  We.addGap = Qh, We.clipGaps = Ar;
  let e = We.paths = {
    points: Pa
  };
  e.linear = Ma, e.stepped = td, e.bars = id, e.spline = rd;
}
const gd = 24;
async function md(e, t, i, n) {
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
        const g = s[p] ?? [];
        s[p] = [...g, ...b].filter((_) => _.lu >= d);
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
function zn(e) {
  if (!e) return [];
  const t = [];
  for (const i of e) {
    const n = parseFloat(i.s);
    Number.isFinite(n) && t.push([i.lu, n]);
  }
  return t.sort((i, n) => i[0] - n[0]), t;
}
function bd(e, t) {
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
const _d = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var vd = Object.defineProperty, Pr = (e, t, i, n) => {
  for (var r = void 0, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = l(t, i, r) || r);
  return r && vd(t, i, r), r;
};
const yd = [
  Xe,
  Po(_d),
  je`
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
], Cl = () => {
};
class yn extends ze {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = yd;
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
Pr([
  re()
], yn.prototype, "_loading");
Pr([
  re()
], yn.prototype, "_error");
Pr([
  re()
], yn.prototype, "_empty");
Pr([
  mn(".chart-host")
], yn.prototype, "_host");
var wd = Object.defineProperty, xd = Object.getOwnPropertyDescriptor, ei = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? xd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && wd(t, i, r), r;
};
const Eo = 260, $d = 3;
let Dt = class extends yn {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return Eo;
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
    this._unsubscribe && this._unsubscribe !== Cl && this._unsubscribe(), this._unsubscribe = Cl;
    const e = $d + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const n = await md(this.hass, i, gd, (r) => {
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
    const t = Math.floor(Date.now() / 1e3), i = zn(e[this.roomEntity]), n = zn(e[this.lowEntity]), r = zn(e[this.highEntity]), s = this._hasApparent ? zn(e[this.apparentEntity]) : [], l = this._hasHumidity ? zn(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && r.length === 0 && s.length === 0 && l.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const h = [i, n, r];
    this._hasApparent && h.push(s), this._hasHumidity && h.push(l);
    const d = bd(h, t), p = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: p.width, height: p.height }), this._plot.setData(d), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new We(p, d, this._host), this._observeResize());
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
      values: (p, b) => b.map((g) => `${g.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: Eo,
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
            const g = p.bbox.top, _ = p.bbox.height;
            b.save();
            for (const k of this._intervals) {
              const E = p.valToPos(k.start, "x", !0), z = p.valToPos(k.end, "x", !0);
              z <= E || (b.fillStyle = k.action === "heating" ? Tl(t, 0.18) : Tl(i, 0.18), b.fillRect(E, g, z - E, _));
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
      ${this._loading ? w`<div class="status">Loading 24 h history…</div>` : V}
      ${this._error ? w`<div class="status">${this._error}</div>` : V}
      ${this._empty ? w`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : V}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? V : this._renderLegend()}
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
    ) : V}
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
    ) : V}
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
      @keydown=${(r) => this._onLabelKeyDown(r, e)}
      >${t}${i ?? e}</span
    >`;
  }
};
Dt.styles = [
  ...yn.styles,
  je`
      .chart-host {
        height: ${Po(Eo)}px;
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
ei([
  B({ attribute: !1 })
], Dt.prototype, "hass", 2);
ei([
  B({ type: String })
], Dt.prototype, "roomEntity", 2);
ei([
  B({ type: String })
], Dt.prototype, "lowEntity", 2);
ei([
  B({ type: String })
], Dt.prototype, "highEntity", 2);
ei([
  B({ type: String })
], Dt.prototype, "actionEntity", 2);
ei([
  B({ type: String })
], Dt.prototype, "apparentEntity", 2);
ei([
  B({ type: String })
], Dt.prototype, "humidityEntity", 2);
ei([
  re()
], Dt.prototype, "_hiddenLabels", 2);
Dt = ei([
  Qe("comfort-band-history-chart")
], Dt);
function Tl(e, t) {
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
var kd = Object.defineProperty, Sd = Object.getOwnPropertyDescriptor, Zo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Sd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && kd(t, i, r), r;
};
let Vn = class extends ze {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return w`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = Kl(this.hass, e), n = t ?? "", r = t && i ? i : "";
    return w`
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
   *  missing first (pre-v0.4 backend — pointing at Settings would chain
   *  to a second upgrade hint), then humidity (configurable via Settings
   *  → OptionsFlow). Both present → no hint. */
  _renderOverlayHint(e, t) {
    return e ? t ? V : w`<div class="hint">
        Configure a humidity sensor in the Settings tab to also add humidity to the chart.
      </div>` : w`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
Vn.styles = [
  Xe,
  je`
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
Zo([
  B({ attribute: !1 })
], Vn.prototype, "hass", 2);
Zo([
  B({ attribute: !1 })
], Vn.prototype, "entities", 2);
Vn = Zo([
  Qe("comfort-band-insights-tab")
], Vn);
var Ad = Object.defineProperty, Ed = Object.getOwnPropertyDescriptor, La = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ed(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Ad(t, i, r), r;
};
const lr = 14, ar = 28, on = 600, cr = 200, uo = [0, 6, 12, 18, 24], Pl = [14, 18, 22, 26];
function Di(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function Cd(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let vr = class extends ze {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * on;
  }
  _tempToY(e) {
    const t = Cd(e, lr, ar);
    return cr - (t - lr) / (ar - lr) * cr;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const i = e[e.length - 1][t], n = [[0, this._tempToY(i)]];
    let r = i;
    for (const s of e) {
      const l = this._timeToX(Di(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[t])]), r = s[t];
    }
    return n.push([on, this._tempToY(r)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([r, s]) => `L ${r} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, d) => Di(h.at) - Di(d.at)), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], r = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return w`
      <div class="chart">
        <svg
          viewBox="0 0 ${on} ${cr}"
          preserveAspectRatio="none"
          role="img"
          aria-label="Schedule visualization for the active profile"
        >
          <title>Schedule visualization for the active profile</title>
          ${Pl.map(
      (h) => ci`<line class="grid" x1="0" x2=${on} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${uo.map(
      (h) => ci`<line class="grid" y1="0" y2=${cr} x1=${h / 24 * on} x2=${h / 24 * on}></line>`
    )}
          ${t ? ci`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const d = this._timeToX(Di(h.at));
      return ci`
              <circle class="marker low" cx=${d} cy=${this._tempToY(h.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(h.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${Pl.map(
      (h) => w`<div
              class="axis-label y"
              style="top: ${(ar - h) / (ar - lr) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${uo.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === uo.length - 1 ? "axis-label x end" : "axis-label x";
      return w`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
      </div>
    `;
  }
};
vr.styles = [
  Xe,
  je`
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
La([
  B({ type: Array })
], vr.prototype, "transitions", 2);
vr = La([
  Qe("comfort-band-schedule-chart")
], vr);
var Td = Object.defineProperty, Pd = Object.getOwnPropertyDescriptor, fi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Pd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Td(t, i, r), r;
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
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(this._at) ? Number.isNaN(this._low) || Number.isNaN(this._high) ? (this._error = "Low and high must be numbers.", !1) : this._low >= this._high ? (this._error = "Low must be less than high.", !1) : this._low < 10 || this._high > 35 ? (this._error = "Temperatures must be between 10 °C and 35 °C.", !1) : (this._error = null, !0) : (this._error = "Time must be HH:MM (24h, e.g. 06:00).", !1);
  }
  render() {
    return w`
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
  je`
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
fi([
  B({ type: Object })
], Ut.prototype, "transition", 2);
fi([
  B({ type: Boolean })
], Ut.prototype, "isNew", 2);
fi([
  re()
], Ut.prototype, "_at", 2);
fi([
  re()
], Ut.prototype, "_low", 2);
fi([
  re()
], Ut.prototype, "_high", 2);
fi([
  re()
], Ut.prototype, "_error", 2);
fi([
  mn('input[name="at"]')
], Ut.prototype, "_atInput", 2);
Ut = fi([
  Qe("transition-edit-dialog")
], Ut);
var Dd = Object.defineProperty, Md = Object.getOwnPropertyDescriptor, Mt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Md(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Dd(t, i, r), r;
};
function Dl(e, t) {
  return Di(e.at) - Di(t.at);
}
const ho = 15, fo = 24 * 60;
function zd(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((n) => Di(n.at))), i = Math.max(...t);
  for (let n = 1; n <= fo / ho; n++) {
    const r = (i + n * ho) % fo;
    if (!t.has(r)) return Ml(r);
  }
  return Ml((i + ho) % fo);
}
function Ml(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
let ut = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = zd(this._transitions), this._newLow = Nl(this._transitions), this._newHigh = Ol(this._transitions), this._editing = null, this._mode = "add";
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
      i.sort(Dl), await this._writeSchedule(i), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = zl(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = zl(this.hass);
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
      const t = await Wc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(Dl) : [], this._loading = !1);
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
      await Gc(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return V;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? Nl(this._transitions),
        high: this._newHigh ?? Ol(this._transitions)
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
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? w`<div class="loading">Loading schedule…</div>` : this._error ? w`<div class="error" role="alert">${this._error}</div>` : w`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
              ></comfort-band-schedule-chart>
              <div class="list-toolbar">
                <button class="button primary" @click=${this._onAddClicked}>
                  + Add transition
                </button>
              </div>
              ${this._renderList()}
            `}
    `;
  }
  _renderList() {
    return this._transitions.length === 0 ? w`<div class="empty">No transitions yet. Use “Add transition” to create one.</div>` : w`
      <ul class="list" role="list">
        ${this._transitions.map(
      (e) => this._confirmingDeleteAt === e.at ? this._renderConfirmRow(e) : this._renderRow(e)
    )}
      </ul>
    `;
  }
  _renderRow(e) {
    const t = `Edit transition at ${e.at}, ${e.low.toFixed(1)} to ${e.high.toFixed(
      1
    )} degrees`;
    return w`
      <li
        class="row"
        role="listitem"
        tabindex="0"
        data-at=${e.at}
        aria-label=${t}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${e.at}</span>
        <span class="band">${e.low.toFixed(1)}° – ${e.high.toFixed(1)}°</span>
        <span class="actions">
          <button
            class="button secondary"
            aria-label="Edit transition at ${e.at}"
            @click=${this._onEditClicked(e)}
          >
            Edit
          </button>
          <button
            class="button danger"
            aria-label="Delete transition at ${e.at}"
            @click=${this._onDeleteClicked(e)}
          >
            Delete
          </button>
        </span>
      </li>
    `;
  }
  _renderConfirmRow(e) {
    return w`
      <li
        class="row confirm"
        role="alertdialog"
        aria-label="Delete transition at ${e.at}?"
        @keydown=${this._onConfirmKeydown}
      >
        <span class="confirm-text">Delete transition at ${e.at}?</span>
        <span class="actions">
          <button class="button secondary" @click=${this._onCancelDelete}>Cancel</button>
          <button class="button danger" @click=${this._onConfirmDelete}>Delete</button>
        </span>
      </li>
    `;
  }
};
ut.styles = [
  Xe,
  je`
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
  B({ attribute: !1 })
], ut.prototype, "hass", 2);
Mt([
  B({ type: String })
], ut.prototype, "zone", 2);
Mt([
  re()
], ut.prototype, "_profile", 2);
Mt([
  re()
], ut.prototype, "_transitions", 2);
Mt([
  re()
], ut.prototype, "_loading", 2);
Mt([
  re()
], ut.prototype, "_error", 2);
Mt([
  re()
], ut.prototype, "_mode", 2);
Mt([
  re()
], ut.prototype, "_editing", 2);
Mt([
  re()
], ut.prototype, "_newAt", 2);
Mt([
  re()
], ut.prototype, "_confirmingDeleteAt", 2);
ut = Mt([
  Qe("comfort-band-schedule-tab")
], ut);
function zl(e) {
  const t = ql(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Nl(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Ol(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Nd = Object.defineProperty, Od = Object.getOwnPropertyDescriptor, wn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Od(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Nd(t, i, r), r;
};
let hi = class extends ze {
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
    if (!this.hass || !this.entities) return V;
    const e = this.entities.useApparentTemperature, t = this.entities.learningEnabled;
    if (e === null || t === null)
      return w`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const i = Kl(this.hass, this.entities.roomTemperature);
    return w`
      ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : V}
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
      // plain on/off at the band edges. Samples are recorded either way.
      desc: w`Uses what this room has learned about how quickly it warms and cools to start and
        stop ahead of time, instead of waiting for the temperature to reach the edge of the
        comfortable range. Predictive control (the MPC switch) needs this on too. While it's off,
        the room still records how it warms and cools; it just doesn't act on it.`
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
hi.styles = [
  Xe,
  je`
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
wn([
  B({ attribute: !1 })
], hi.prototype, "hass", 2);
wn([
  B({ type: String })
], hi.prototype, "zone", 2);
wn([
  B({ attribute: !1 })
], hi.prototype, "entities", 2);
wn([
  re()
], hi.prototype, "_pendingByEntity", 2);
wn([
  re()
], hi.prototype, "_error", 2);
hi = wn([
  Qe("comfort-band-settings-tab")
], hi);
var Ld = Object.defineProperty, Hd = Object.getOwnPropertyDescriptor, pi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Hd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Ld(t, i, r), r;
};
const Ai = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" }
];
let jt = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Ai.findIndex((r) => r.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + Ai.length) % Ai.length;
          break;
        case "ArrowRight":
          i = (t + 1) % Ai.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Ai.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = Ai[i].id;
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
    if (!this._isOpen) return V;
    const e = this.zoneName || this.zone || "Comfort Band";
    return w`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Ai.map(
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
jt.styles = [
  Xe,
  je`
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
pi([
  B({ attribute: !1 })
], jt.prototype, "hass", 2);
pi([
  B({ type: String })
], jt.prototype, "zone", 2);
pi([
  B({ type: String })
], jt.prototype, "zoneName", 2);
pi([
  B({ attribute: !1 })
], jt.prototype, "entities", 2);
pi([
  re()
], jt.prototype, "_activeTab", 2);
pi([
  re()
], jt.prototype, "_isOpen", 2);
pi([
  mn("dialog")
], jt.prototype, "_dialog", 2);
jt = pi([
  Qe("comfort-band-modal")
], jt);
var Rd = Object.defineProperty, Fd = Object.getOwnPropertyDescriptor, Jo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Fd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Rd(t, i, r), r;
};
let Wn = class extends ze {
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
    const e = Gl(this.hass, this.config.zone);
    return Yl(this.hass, { zone: this.config.zone }, e);
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
Wn.styles = [
  Xe,
  je`
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
Jo([
  B({ attribute: !1 })
], Wn.prototype, "hass", 2);
Jo([
  B({ attribute: !1 })
], Wn.prototype, "config", 2);
Wn = Jo([
  Qe("comfort-band-card-editor")
], Wn);
var Id = Object.defineProperty, Bd = Object.getOwnPropertyDescriptor, Dr = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Bd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Id(t, i, r), r;
};
let gn = class extends ze {
  constructor() {
    super(...arguments), this._onTileTap = () => {
      this._modal?.open();
    };
  }
  setConfig(e) {
    if (!e?.zone)
      throw new Error("comfort-band-card: `zone` is required");
    if (e.name != null && typeof e.name != "string")
      throw new Error("comfort-band-card: `name` must be a string");
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
    if (!this._config || !this.hass) return w``;
    const e = this._config.zone, t = Gl(this.hass, e);
    if (t.deviceId === null)
      return w`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, t);
    return w`
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
      ${i ? null : w`<comfort-band-modal
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
      zoneName: Yl(e, this._config, t),
      low: n(t.effectiveLow),
      high: n(t.effectiveHigh),
      roomTemp: n(t.roomTemperature),
      action: i(t.currentAction)?.state ?? "unknown",
      overrideActive: i(t.overrideActive)?.state === "on",
      overrideEnds: i(t.overrideEnds)?.state ?? null
    };
  }
};
gn.styles = [
  Xe,
  je`
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
Dr([
  B({ attribute: !1 })
], gn.prototype, "hass", 2);
Dr([
  re()
], gn.prototype, "_config", 2);
Dr([
  mn("comfort-band-modal")
], gn.prototype, "_modal", 2);
gn = Dr([
  Qe("comfort-band-card")
], gn);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.11.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
