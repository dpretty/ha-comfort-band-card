const ur = globalThis, Eo = ur.ShadowRoot && (ur.ShadyCSS === void 0 || ur.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Co = Symbol(), Es = /* @__PURE__ */ new WeakMap();
let Ml = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Co) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Eo && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Es.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Es.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const To = (e) => new Ml(typeof e == "string" ? e : e + "", void 0, Co), je = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new Ml(i, e, Co);
}, sc = (e, t) => {
  if (Eo) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = ur.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Cs = Eo ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return To(i);
})(e) : e;
const { is: lc, defineProperty: ac, getOwnPropertyDescriptor: cc, getOwnPropertyNames: uc, getOwnPropertySymbols: hc, getPrototypeOf: dc } = Object, yr = globalThis, Ts = yr.trustedTypes, fc = Ts ? Ts.emptyScript : "", pc = yr.reactiveElementPolyfillSupport, Hn = (e, t) => e, dr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? fc : null;
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
} }, Po = (e, t) => !lc(e, t), Ps = { attribute: !0, type: String, converter: dr, reflect: !1, useDefault: !1, hasChanged: Po };
Symbol.metadata ??= Symbol("metadata"), yr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let on = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ps) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, i);
      r !== void 0 && ac(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: s } = cc(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ps;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Hn("elementProperties"))) return;
    const t = dc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Hn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Hn("properties"))) {
      const i = this.properties, n = [...uc(i), ...hc(i)];
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
      for (const r of n) i.unshift(Cs(r));
    } else t !== void 0 && i.push(Cs(t));
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
    return sc(t, this.constructor.elementStyles), t;
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
      if (r === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Po)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
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
on.elementStyles = [], on.shadowRootOptions = { mode: "open" }, on[Hn("elementProperties")] = /* @__PURE__ */ new Map(), on[Hn("finalized")] = /* @__PURE__ */ new Map(), pc?.({ ReactiveElement: on }), (yr.reactiveElementVersions ??= []).push("2.1.2");
const Do = globalThis, Ds = (e) => e, fr = Do.trustedTypes, Ms = fr ? fr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, zl = "$lit$", si = `lit$${Math.random().toFixed(9).slice(2)}$`, Ol = "?" + si, gc = `<${Ol}>`, Mi = document, In = () => Mi.createComment(""), Bn = (e) => e === null || typeof e != "object" && typeof e != "function", Mo = Array.isArray, mc = (e) => Mo(e) || typeof e?.[Symbol.iterator] == "function", to = `[ 	
\f\r]`, Pn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zs = /-->/g, Os = />/g, Si = RegExp(`>|${to}(?:([^\\s"'>=/]+)(${to}*=${to}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ns = /'/g, Ls = /"/g, Nl = /^(?:script|style|textarea|title)$/i, Ll = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), x = Ll(1), li = Ll(2), an = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), Hs = /* @__PURE__ */ new WeakMap(), Ti = Mi.createTreeWalker(Mi, 129);
function Hl(e, t) {
  if (!Mo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ms !== void 0 ? Ms.createHTML(t) : t;
}
const bc = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Pn;
  for (let h = 0; h < i; h++) {
    const d = e[h];
    let p, b, g = -1, v = 0;
    for (; v < d.length && (l.lastIndex = v, b = l.exec(d), b !== null); ) v = l.lastIndex, l === Pn ? b[1] === "!--" ? l = zs : b[1] !== void 0 ? l = Os : b[2] !== void 0 ? (Nl.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = Si) : b[3] !== void 0 && (l = Si) : l === Si ? b[0] === ">" ? (l = r ?? Pn, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? Si : b[3] === '"' ? Ls : Ns) : l === Ls || l === Ns ? l = Si : l === zs || l === Os ? l = Pn : (l = Si, r = void 0);
    const S = l === Si && e[h + 1].startsWith("/>") ? " " : "";
    s += l === Pn ? d + gc : g >= 0 ? (n.push(p), d.slice(0, g) + zl + d.slice(g) + si + S) : d + si + (g === -2 ? h : S);
  }
  return [Hl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Un {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, d = this.parts, [p, b] = bc(t, i);
    if (this.el = Un.createElement(p, n), Ti.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Ti.nextNode()) !== null && d.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(zl)) {
          const v = b[l++], S = r.getAttribute(g).split(si), E = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: s, name: E[2], strings: S, ctor: E[1] === "." ? _c : E[1] === "?" ? yc : E[1] === "@" ? wc : wr }), r.removeAttribute(g);
        } else g.startsWith(si) && (d.push({ type: 6, index: s }), r.removeAttribute(g));
        if (Nl.test(r.tagName)) {
          const g = r.textContent.split(si), v = g.length - 1;
          if (v > 0) {
            r.textContent = fr ? fr.emptyScript : "";
            for (let S = 0; S < v; S++) r.append(g[S], In()), Ti.nextNode(), d.push({ type: 2, index: ++s });
            r.append(g[v], In());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ol) d.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(si, g + 1)) !== -1; ) d.push({ type: 7, index: s }), g += si.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Mi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function cn(e, t, i = e, n) {
  if (t === an) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Bn(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = cn(e, r._$AS(e, t.values), r, n)), t;
}
class vc {
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? Mi).importNode(i, !0);
    Ti.currentNode = r;
    let s = Ti.nextNode(), l = 0, h = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let p;
        d.type === 2 ? p = new Gn(s, s.nextSibling, this, t) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (p = new xc(s, this, t)), this._$AV.push(p), d = n[++h];
      }
      l !== d?.index && (s = Ti.nextNode(), l++);
    }
    return Ti.currentNode = Mi, r;
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
    t = cn(this, t, i), Bn(t) ? t === G || t == null || t === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : t !== this._$AH && t !== an && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : mc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== G && Bn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Mi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Un.createElement(Hl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new vc(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Hs.get(t.strings);
    return i === void 0 && Hs.set(t.strings, i = new Un(t)), i;
  }
  k(t) {
    Mo(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of t) r === i.length ? i.push(n = new Gn(this.O(In()), this.O(In()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ds(t).nextSibling;
      Ds(t).remove(), t = n;
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
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = G;
  }
  _$AI(t, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = cn(this, t, i, 0), l = !Bn(t) || t !== this._$AH && t !== an, l && (this._$AH = t);
    else {
      const h = t;
      let d, p;
      for (t = s[0], d = 0; d < s.length - 1; d++) p = cn(this, h[n + d], i, d), p === an && (p = this._$AH[d]), l ||= !Bn(p) || p !== this._$AH[d], p === G ? t = G : t !== G && (t += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _c extends wr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class yc extends wr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class wc extends wr {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = cn(this, t, i, 0) ?? G) === an) return;
    const n = this._$AH, r = t === G && n !== G || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== G && (n === G || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    cn(this, t);
  }
}
const $c = Do.litHtmlPolyfillSupport;
$c?.(Un, Gn), (Do.litHtmlVersions ??= []).push("3.3.2");
const Sc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Gn(t.insertBefore(In(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const zo = globalThis;
class ze extends on {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Sc(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return an;
  }
}
ze._$litElement$ = !0, ze.finalized = !0, zo.litElementHydrateSupport?.({ LitElement: ze });
const kc = zo.litElementPolyfillSupport;
kc?.({ LitElement: ze });
(zo.litElementVersions ??= []).push("4.2.2");
const Qe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Ac = { attribute: !0, type: String, converter: dr, reflect: !1, hasChanged: Po }, Ec = (e = Ac, t, i) => {
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
function I(e) {
  return (t, i) => typeof i == "object" ? Ec(e, t, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
function le(e) {
  return I({ ...e, state: !0, attribute: !1 });
}
const Cc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function gn(e, t) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Cc(i, n, { get() {
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
var Tc = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, Kn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Pc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Tc(t, i, r), r;
};
const go = 15, Rl = 28, Dc = Rl - go;
function io(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(go, Math.min(Rl, e)) - go) / Dc * 100;
}
let zi = class extends ze {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = gr(this.action), t = pr(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? io(this.low) : 0, l = n ? io(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = r ? io(this.room) : 50, b = (v) => Number.isFinite(v) ? `${v.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return x`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${li`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? li`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${r ? li`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${r ? li`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
zi.styles = [
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
Kn([
  I({ type: Number })
], zi.prototype, "low", 2);
Kn([
  I({ type: Number })
], zi.prototype, "high", 2);
Kn([
  I({ type: Number })
], zi.prototype, "room", 2);
Kn([
  I({ type: String })
], zi.prototype, "action", 2);
zi = Kn([
  Qe("band-gauge")
], zi);
var Mc = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, jt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? zc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Mc(t, i, r), r;
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
    const e = Oc(this.overrideEnds);
    return x`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = gr(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = pr(e);
    return x`<span class="action-chip" style="background:${t}">
      ${po(e)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : x`
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
    return x`
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
jt([
  I({ type: String })
], yt.prototype, "zoneName", 2);
jt([
  I({ type: Number })
], yt.prototype, "roomTemp", 2);
jt([
  I({ type: Number })
], yt.prototype, "low", 2);
jt([
  I({ type: Number })
], yt.prototype, "high", 2);
jt([
  I({ type: String })
], yt.prototype, "action", 2);
jt([
  I({ type: Boolean })
], yt.prototype, "overrideActive", 2);
jt([
  I({ type: String })
], yt.prototype, "overrideEnds", 2);
jt([
  I({ type: Boolean })
], yt.prototype, "noExpand", 2);
jt([
  I({ type: String, reflect: !0 })
], yt.prototype, "variant", 2);
yt = jt([
  Qe("comfort-band-tile")
], yt);
function Oc(e) {
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
var Nc = Object.defineProperty, Lc = Object.getOwnPropertyDescriptor, Zt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Lc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Nc(t, i, r), r;
};
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
    return x`
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
Zt([
  I({ type: Number })
], Tt.prototype, "min", 2);
Zt([
  I({ type: Number })
], Tt.prototype, "max", 2);
Zt([
  I({ type: Number })
], Tt.prototype, "step", 2);
Zt([
  I({ type: Number })
], Tt.prototype, "low", 2);
Zt([
  I({ type: Number })
], Tt.prototype, "high", 2);
Zt([
  I({ type: String })
], Tt.prototype, "unit", 2);
Zt([
  le()
], Tt.prototype, "_dragging", 2);
Zt([
  gn(".track")
], Tt.prototype, "_track", 2);
Tt = Zt([
  Qe("dual-handle-slider")
], Tt);
const hi = "comfort_band";
function Hc(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Rc(e, t) {
  return e.callService(hi, "set_schedule", { ...t });
}
function Fc(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(hi, "start_override", i);
}
function Ic(e, t) {
  return e.callService(hi, "cancel_override", { ...t });
}
function Bc(e, t) {
  return e.callService(hi, "set_profile", { ...t });
}
function Uc(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(hi, "create_profile", i);
}
function jc(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(hi, "clone_profile", i);
}
function Vc(e, t) {
  return e.callService(hi, "rename_profile", { old: t.old, new: t.new });
}
function Wc(e, t) {
  return e.callService(hi, "delete_profile", { name: t.name });
}
var Gc = Object.defineProperty, Kc = Object.getOwnPropertyDescriptor, mn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Kc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Gc(t, i, r), r;
};
const Yc = [1, 3, 6];
let ai = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Fc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Ic(this.hass, { zone: this.zone });
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
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.apparentTemperature), l = this._numericState(this.entities.overrideHours), h = this._stateOf(this.entities.currentAction)?.state ?? "unknown", d = this._stateOf(this.entities.overrideActive)?.state === "on", p = this._stateOf(this.entities.useApparentTemperature)?.state === "on", b = Number.isFinite(r) && Number.isFinite(s) && Math.abs(s - r) >= 0.1, g = this._pendingLow ?? (Number.isFinite(e) ? e : 19), v = this._pendingHigh ?? (Number.isFinite(t) ? t : 22), S = gr(h), E = S !== "idle" && S !== "unknown";
    return x`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${E ? x`<span class="action-chip" style="background:${pr(S)}"
              >${po(S)}</span
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
  _renderOverrideSection(e) {
    if (!e) return G;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = qc(t ?? null);
    return x`
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
    return i ? x`<div class="feels-like">
        <span>Feels like ${t.toFixed(1)}°</span>
        ${r ? x`<span class="driving">Driving decisions</span>` : G}
      </div>` : r ? x`<div class="feels-like">
        <span class="driving">Driving decisions</span>
      </div>` : n ? x`<div class="feels-like">
        <span class="muted-warn">
          Apparent temperature mode is on but no humidity reading is available — decisions are using
          the raw room temperature.
        </span>
      </div>` : G;
  }
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? x`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Yc.map(
      (t) => x`
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
ai.styles = [
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
mn([
  I({ attribute: !1 })
], ai.prototype, "hass", 2);
mn([
  I({ type: String })
], ai.prototype, "zone", 2);
mn([
  I({ attribute: !1 })
], ai.prototype, "entities", 2);
mn([
  le()
], ai.prototype, "_pendingLow", 2);
mn([
  le()
], ai.prototype, "_pendingHigh", 2);
ai = mn([
  Qe("comfort-band-now-tab")
], ai);
function qc(e) {
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
var Zc = Object.defineProperty, Jc = Object.getOwnPropertyDescriptor, Jt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Jc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Zc(t, i, r), r;
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
    return x`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? x`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? x`<label>
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
      ${this._error ? x`<div class="error" role="alert">${this._error}</div>` : null}
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
Jt([
  I({ type: String })
], Pt.prototype, "mode", 2);
Jt([
  I({ type: String })
], Pt.prototype, "existingName", 2);
Jt([
  I({ type: Array })
], Pt.prototype, "existingNames", 2);
Jt([
  I({ type: Boolean })
], Pt.prototype, "busy", 2);
Jt([
  le()
], Pt.prototype, "_name", 2);
Jt([
  le()
], Pt.prototype, "_description", 2);
Jt([
  le()
], Pt.prototype, "_error", 2);
Jt([
  gn('input[name="name"]')
], Pt.prototype, "_nameInput", 2);
Pt = Jt([
  Qe("profile-edit-dialog")
], Pt);
const Oo = "comfort_band", Qc = {
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
function Xc() {
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
function Fl(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, r] of i.identifiers)
      if (n === t[0] && r === t[1])
        return i;
  return null;
}
function Il(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Oo
  );
}
function eu(e, t) {
  const i = Xc(), n = Fl(e, [Oo, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Il(e, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = Qc[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function Bl(e) {
  const t = Fl(e, [Oo, "profile_manager"]);
  if (t === null) return null;
  for (const i of Il(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function Ul(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
var tu = Object.defineProperty, iu = Object.getOwnPropertyDescriptor, Ni = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? iu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && tu(t, i, r), r;
};
let qt = class extends ze {
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
          await Uc(this.hass, { name: t, description: i });
        else if (n === "clone" && r)
          await jc(this.hass, { source: r, target: t, description: i });
        else if (n === "rename" && r)
          t !== r && await Vc(this.hass, { old: r, new: t });
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
        await Wc(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Bl(this.hass);
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
    this.hass && Bc(this.hass, { profile: e });
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
      return x`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: r, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return x`
        ${this._error ? x`<div class="error" role="alert">${this._error}</div>` : null}
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
      return x`
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
            ${l ? x`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? x`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? x`<div class="empty">No profiles configured.</div>` : x`
      ${this._error ? x`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? x`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : G}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, r, s)
    )}
      </ul>
      ${s ? G : x`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, r, s) {
    const l = e === i, h = e === n, d = r[e] ?? "", p = `cb-profile-menu-${t}`;
    return x`
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
          ${d ? x`<span class="description">${d}</span>` : G}
        </span>
        ${l ? x`<span class="badge">Active</span>` : G}
        ${s ? x`<button
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
        ${this._openMenu === e ? x`
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
qt.styles = [
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
Ni([
  I({ attribute: !1 })
], qt.prototype, "hass", 2);
Ni([
  le()
], qt.prototype, "_mode", 2);
Ni([
  le()
], qt.prototype, "_target", 2);
Ni([
  le()
], qt.prototype, "_openMenu", 2);
Ni([
  le()
], qt.prototype, "_error", 2);
Ni([
  le()
], qt.prototype, "_busy", 2);
qt = Ni([
  Qe("comfort-band-profiles-tab")
], qt);
const nu = !0, Oe = "u-", ru = "uplot", ou = Oe + "hz", su = Oe + "vt", lu = Oe + "title", au = Oe + "wrap", cu = Oe + "under", uu = Oe + "over", hu = Oe + "axis", Ci = Oe + "off", du = Oe + "select", fu = Oe + "cursor-x", pu = Oe + "cursor-y", gu = Oe + "cursor-pt", mu = Oe + "legend", bu = Oe + "live", vu = Oe + "inline", _u = Oe + "series", yu = Oe + "marker", Rs = Oe + "label", wu = Oe + "value", On = "width", Nn = "height", Dn = "top", Fs = "bottom", nn = "left", no = "right", No = "#000", Is = No + "0", ro = "mousemove", Bs = "mousedown", oo = "mouseup", Us = "mouseenter", js = "mouseleave", Vs = "dblclick", xu = "resize", $u = "scroll", Ws = "change", mr = "dppxchange", Lo = "--", bn = typeof window < "u", mo = bn ? document : null, ln = bn ? window : null, Su = bn ? navigator : null;
let ce, rr;
function bo() {
  let e = devicePixelRatio;
  ce != e && (ce = e, rr && _o(Ws, rr, bo), rr = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Di(Ws, rr, bo), ln.dispatchEvent(new CustomEvent(mr)));
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
  let r = mo.createElement(e);
  return t != null && at(r, t), i?.insertBefore(r, n), r;
}
function vt(e, t) {
  return At("div", e, t);
}
const Gs = /* @__PURE__ */ new WeakMap();
function It(e, t, i, n, r) {
  let s = "translate(" + t + "px," + i + "px)", l = Gs.get(e);
  s != l && (e.style.transform = s, Gs.set(e, s), t < 0 || i < 0 || t > n || i > r ? at(e, Ci) : vo(e, Ci));
}
const Ks = /* @__PURE__ */ new WeakMap();
function Ys(e, t, i) {
  let n = t + i, r = Ks.get(e);
  n != r && (Ks.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const qs = /* @__PURE__ */ new WeakMap();
function Zs(e, t, i, n) {
  let r = t + "" + i, s = qs.get(e);
  r != s && (qs.set(e, r), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Ho = { passive: !0 }, ku = { ...Ho, capture: !0 };
function Di(e, t, i, n) {
  t.addEventListener(e, i, n ? ku : Ho);
}
function _o(e, t, i, n) {
  t.removeEventListener(e, i, Ho);
}
bn && bo();
function Et(e, t, i, n) {
  let r;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ct((i + n) / 2), t[r] < e ? i = r : n = r;
  return e - t[i] <= t[n] - e ? i : n;
}
function jl(e) {
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
const Vl = (e) => e != null, Wl = (e) => e != null && e > 0, xr = jl(Vl), Au = jl(Wl);
function Eu(e, t, i, n = 0, r = !1) {
  let s = r ? Au : xr, l = r ? Wl : Vl;
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
  let r = Xs(e), s = Xs(t);
  e == t && (r == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Kt : Gl, h = r == 1 ? ct : _t, d = s == 1 ? _t : ct, p = h(l(Me(e))), b = d(l(Me(t))), g = un(i, p), v = un(i, b);
  return i == 10 && (p < 0 && (g = ge(g, -p)), b < 0 && (v = ge(v, -b))), n || i == 2 ? (e = g * r, t = v * s) : (e = Zl(e, g), t = Sr(t, v)), [e, t];
}
function Ro(e, t, i, n) {
  let r = $r(e, t, i, n);
  return e == 0 && (r[0] = 0), t == 0 && (r[1] = 0), r;
}
const Fo = 0.1, Js = {
  mode: 3,
  pad: Fo
}, Rn = {
  pad: 0,
  soft: null,
  mode: 0
}, Cu = {
  min: Rn,
  max: Rn
};
function br(e, t, i, n) {
  return kr(i) ? Qs(e, t, i) : (Rn.pad = i, Rn.soft = n ? 0 : null, Rn.mode = n ? 3 : 0, Qs(e, t, Cu));
}
function se(e, t) {
  return e ?? t;
}
function Tu(e, t, i) {
  for (t = se(t, 0), i = se(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Qs(e, t, i) {
  let n = i.min, r = i.max, s = se(n.pad, 0), l = se(r.pad, 0), h = se(n.hard, -pe), d = se(r.hard, pe), p = se(n.soft, pe), b = se(r.soft, -pe), g = se(n.mode, 0), v = se(r.mode, 0), S = t - e, E = Kt(S), L = Je(Me(e), Me(t)), B = Kt(L), j = Me(B - E);
  (S < 1e-24 || j > 10) && (S = 0, (e == 0 || t == 0) && (S = 1e-24, g == 2 && p != pe && (s = 0), v == 2 && b != -pe && (l = 0)));
  let $ = S || L || 1e3, F = Kt($), k = un(10, ct(F)), J = $ * (S == 0 ? e == 0 ? 0.1 : 1 : s), M = ge(Zl(e - J, k / 10), 24), Q = e >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : pe, Y = Je(h, M < Q && e >= Q ? Q : Ct(Q, M)), te = $ * (S == 0 ? t == 0 ? 0.1 : 1 : l), K = ge(Sr(t + te, k / 10), 24), A = t <= b && (v == 1 || v == 3 && K >= b || v == 2 && K <= b) ? b : -pe, Z = Ct(d, K > A && t <= A ? A : Je(A, K));
  return Y == Z && Y == 0 && (Z = 100), [Y, Z];
}
const Pu = new Intl.NumberFormat(bn ? Su.language : "en-US"), Io = (e) => Pu.format(e), ht = Math, hr = ht.PI, Me = ht.abs, ct = ht.floor, De = ht.round, _t = ht.ceil, Ct = ht.min, Je = ht.max, un = ht.pow, Xs = ht.sign, Kt = ht.log10, Gl = ht.log2, Du = (e, t = 1) => ht.sinh(e) * t, so = (e, t = 1) => ht.asinh(e / t), pe = 1 / 0;
function el(e) {
  return (Kt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function yo(e, t, i) {
  return Ct(Je(e, t), i);
}
function Kl(e) {
  return typeof e == "function";
}
function ie(e) {
  return Kl(e) ? e : () => e;
}
const Mu = () => {
}, Yl = (e) => e, ql = (e, t) => t, zu = (e) => null, tl = (e) => !0, il = (e, t) => e == t, Ou = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (e) => {
  if (Ql(e) || ci.has(e))
    return e;
  const t = `${e}`, i = t.match(Ou);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [r, s] = t.split("e");
    return +`${Oi(r)}e${s}`;
  }
  return ge(e, n);
};
function Ai(e, t) {
  return Oi(ge(Oi(e / t)) * t);
}
function Sr(e, t) {
  return Oi(_t(Oi(e / t)) * t);
}
function Zl(e, t) {
  return Oi(ct(Oi(e / t)) * t);
}
function ge(e, t = 0) {
  if (Ql(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return De(n) / i;
}
const ci = /* @__PURE__ */ new Map();
function Jl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function jn(e, t, i, n) {
  let r = [], s = n.map(Jl);
  for (let l = t; l < i; l++) {
    let h = Me(l), d = ge(un(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * d, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), v = e == 10 ? b : ge(b, g);
      r.push(v), ci.set(v, g);
    }
  }
  return r;
}
const Fn = {}, Bo = [], hn = [null, null], oi = Array.isArray, Ql = Number.isInteger, Nu = (e) => e === void 0;
function nl(e) {
  return typeof e == "string";
}
function kr(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function Lu(e) {
  return e != null && typeof e == "object";
}
const Hu = Object.getPrototypeOf(Uint8Array), Xl = "__proto__";
function dn(e, t = kr) {
  let i;
  if (oi(e)) {
    let n = e.find((r) => r != null);
    if (oi(n) || t(n)) {
      i = Array(e.length);
      for (let r = 0; r < e.length; r++)
        i[r] = dn(e[r], t);
    } else
      i = e.slice();
  } else if (e instanceof Hu)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != Xl && (i[n] = dn(e[n], t));
  } else
    i = e;
  return i;
}
function Ce(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let r in n)
      r != Xl && (kr(e[r]) ? Ce(e[r], dn(n[r])) : e[r] = dn(n[r]));
  }
  return e;
}
const Ru = 0, Fu = 1, Iu = 2;
function Bu(e, t, i) {
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
function Uu(e, t) {
  if (Wu(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return Gu(l[0]) || (l = Vu(l)), l;
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
      let b = h[p], g = Array(r).fill(void 0), v = t ? t[l][p] : Fu, S = [];
      for (let E = 0; E < b.length; E++) {
        let L = b[E], B = s.get(d[E]);
        L === null ? v != Ru && (g[B] = L, v == Iu && S.push(B)) : g[B] = L;
      }
      Bu(g, S, r), n.push(g);
    }
  }
  return n;
}
const ju = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Vu(e) {
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
function Wu(e) {
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
function Gu(e, t = 100) {
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
const ea = [
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
], ta = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function ia(e) {
  return e.slice(0, 3);
}
const Ku = ta.map(ia), Yu = ea.map(ia), qu = {
  MMMM: ea,
  MMM: Yu,
  WWWW: ta,
  WWW: Ku
};
function Mn(e) {
  return (e < 10 ? "0" : "") + e;
}
function Zu(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Ju = {
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
  fff: (e) => Zu(e.getMilliseconds())
};
function Uo(e, t) {
  t = t || qu;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(e); )
    i.push(r[0][0] == "{" ? Ju[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const Qu = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Xu(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Qu ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const na = (e) => e % 1 == 0, vr = [1, 2, 2.5, 5], eh = jn(10, -32, 0, vr), ra = jn(10, 0, 32, vr), th = ra.filter(na), Ei = eh.concat(ra), jo = `
`, oa = "{YYYY}", rl = jo + oa, sa = "{M}/{D}", Ln = jo + sa, or = Ln + "/{YY}", la = "{aa}", ih = "{h}:{mm}", sn = ih + la, ol = jo + sn, sl = ":{ss}", he = null;
function aa(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (e == 1 ? jn(10, 0, 3, vr).filter(na) : jn(10, -3, 0, vr)).concat([
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
    [l, oa, he, he, he, he, he, he, 1],
    [r * 28, "{MMM}", rl, he, he, he, he, he, 1],
    [r, sa, rl, he, he, he, he, he, 1],
    [n, "{h}" + la, or, he, Ln, he, he, he, 1],
    [i, sn, or, he, Ln, he, he, he, 1],
    [t, sl, or + " " + sn, he, Ln + " " + sn, he, ol, he, 1],
    [e, sl + ".{fff}", or + " " + sn, he, Ln + " " + sn, he, ol, he, 1]
  ];
  function b(g) {
    return (v, S, E, L, B, j) => {
      let $ = [], F = B >= l, k = B >= s && B < l, J = g(E), M = ge(J * e, 3), Q = lo(J.getFullYear(), F ? 0 : J.getMonth(), k || F ? 1 : J.getDate()), Y = ge(Q * e, 3);
      if (k || F) {
        let te = k ? B / s : 0, K = F ? B / l : 0, A = M == Y ? M : ge(lo(Q.getFullYear() + K, Q.getMonth() + te, 1) * e, 3), Z = new Date(De(A / e)), z = Z.getFullYear(), V = Z.getMonth();
        for (let R = 0; A <= L; R++) {
          let ne = lo(z + K * R, V + te * R, 1), H = ne - g(ge(ne * e, 3));
          A = ge((+ne + H) * e, 3), A <= L && $.push(A);
        }
      } else {
        let te = B >= r ? r : B, K = ct(E) - ct(M), A = Y + K + Sr(M - Y, te);
        $.push(A);
        let Z = g(A), z = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, V = B / n, R = v.axes[S]._space, ne = j / R;
        for (; A = ge(A + B, e == 1 ? 0 : 3), !(A > L); )
          if (V > 1) {
            let H = ct(ge(z + V, 6)) % 24, re = g(A).getHours() - H;
            re > 1 && (re = -1), A -= re * n, z = (z + V) % 24;
            let de = $[$.length - 1];
            ge((A - de) / B, 3) * ne >= 0.7 && $.push(A);
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
const [nh, rh, oh] = aa(1), [sh, lh, ah] = aa(1e-3);
jn(2, -53, 53, [1]);
function ll(e, t) {
  return e.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function al(e, t) {
  return (i, n, r, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], d, p, b, g, v, S;
    return n.map((E) => {
      let L = e(E), B = L.getFullYear(), j = L.getMonth(), $ = L.getDate(), F = L.getHours(), k = L.getMinutes(), J = L.getSeconds(), M = B != d && h[2] || j != p && h[3] || $ != b && h[4] || F != g && h[5] || k != v && h[6] || J != S && h[7] || h[1];
      return d = B, p = j, b = $, g = F, v = k, S = J, M(L);
    });
  };
}
function ch(e, t) {
  let i = Uo(t);
  return (n, r, s, l, h) => r.map((d) => i(e(d)));
}
function lo(e, t, i) {
  return new Date(e, t, i);
}
function cl(e, t) {
  return t(e);
}
const uh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function ul(e, t) {
  return (i, n, r, s) => s == null ? Lo : t(e(n));
}
function hh(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function dh(e, t) {
  return e.series[t].fill(e, t);
}
const fh = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Mu,
  markers: {
    show: !0,
    width: 2,
    stroke: hh,
    fill: dh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function ph(e, t) {
  let i = e.cursor.points, n = vt(), r = i.size(e, t);
  ye(n, On, r), ye(n, Nn, r);
  let s = r / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, r);
  return l && ye(n, "borderWidth", l), n;
}
function gh(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function mh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function bh(e, t) {
  return e.series[t].points.size;
}
const ao = [0, 0];
function vh(e, t, i) {
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
const _h = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: vh,
  points: {
    one: !1,
    show: ph,
    size: bh,
    width: 0,
    stroke: mh,
    fill: gh
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
}, ca = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Vo = Ce({}, ca, {
  filter: ql
}), ua = Ce({}, Vo, {
  size: 10
}), ha = Ce({}, ca, {
  show: !1
}), Wo = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', da = "bold " + Wo, fa = 1.5, hl = {
  show: !0,
  scale: "x",
  stroke: No,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: da,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Vo,
  ticks: ua,
  border: ha,
  font: Wo,
  lineGap: fa,
  rotate: 0
}, yh = "Value", wh = "Time", dl = {
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
function xh(e, t, i, n, r) {
  return t.map((s) => s == null ? "" : Io(s));
}
function $h(e, t, i, n, r, s, l) {
  let h = [], d = ci.get(r) || 0;
  i = l ? i : ge(Sr(i, r), d);
  for (let p = i; p <= n; p = ge(p + r, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function wo(e, t, i, n, r, s, l) {
  const h = [], d = e.scales[e.axes[t].scale].log, p = d == 10 ? Kt : Gl, b = ct(p(i));
  r = un(d, b), d == 10 && (r = Ei[Et(r, Ei)]);
  let g = i, v = r * d;
  d == 10 && (v = Ei[Et(v, Ei)]);
  do
    h.push(g), g = g + r, d == 10 && !ci.has(g) && (g = ge(g, ci.get(r))), g >= v && (r = g, v = r * d, d == 10 && (v = Ei[Et(v, Ei)]));
  while (g <= n);
  return h;
}
function Sh(e, t, i, n, r, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, p = n > d ? wo(e, t, Je(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? wo(e, t, Je(d, -n), -i, r) : [d]).reverse().map((v) => -v).concat(b, p);
}
const pa = /./, kh = /[12357]/, Ah = /[125]/, fl = /1/, xo = (e, t, i, n) => e.map((r, s) => t == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function Eh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], d = e.valToPos, p = s._space, b = d(10, l), g = d(9, l) - b >= p ? pa : d(7, l) - b >= p ? kh : d(5, l) - b >= p ? Ah : fl;
  if (g == fl) {
    let v = Me(d(1, l) - b);
    if (v < p)
      return xo(t.slice().reverse(), h.distr, g, _t(p / v)).reverse();
  }
  return xo(t, h.distr, g, 1);
}
function Ch(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = s._space, d = e.valToPos, p = Me(d(1, l) - d(2, l));
  return p < h ? xo(t.slice().reverse(), 3, pa, _t(h / p)).reverse() : t;
}
function Th(e, t, i, n) {
  return n == null ? Lo : t == null ? "" : Io(t);
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
  labelFont: da,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Vo,
  ticks: ua,
  border: ha,
  font: Wo,
  lineGap: fa,
  rotate: 0
};
function Ph(e, t) {
  let i = 3 + (e || 1) * 2;
  return ge(i * t, 3);
}
function Dh(e, t) {
  let { scale: i, idxs: n } = e.series[0], r = e._data[0], s = e.valToPos(r[n[0]], i, !0), l = e.valToPos(r[n[1]], i, !0), h = Me(l - s), d = e.series[t], p = h / (d.points.space * ce);
  return n[1] - n[0] <= p;
}
const gl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, ga = (e, t, i, n, r) => r, ml = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: ga,
  alpha: 1,
  facets: [
    Ce({}, gl, { scale: "x" }),
    Ce({}, gl, { scale: "y" })
  ]
}, bl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: ga,
  alpha: 1,
  points: {
    show: Dh,
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
function Mh(e, t, i, n, r) {
  return i / 10;
}
const ma = {
  time: nu,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, zh = Ce({}, ma, {
  time: !1,
  ori: 1
}), vl = {};
function ba(e, t) {
  let i = vl[e];
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
  }, e != null && (vl[e] = i)), i;
}
const fn = 1, $o = 2;
function Li(e, t, i) {
  const n = e.mode, r = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[r.facets[0].scale] : l[e.series[0].scale], g = n == 2 ? l[r.facets[1].scale] : l[r.scale], v = h.left, S = h.top, E = h.width, L = h.height, B = e.valToPosH, j = e.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    p,
    b,
    g,
    B,
    j,
    v,
    S,
    E,
    L,
    Er,
    vn,
    Tr,
    _a,
    wa
  ) : i(
    r,
    d,
    p,
    b,
    g,
    j,
    B,
    S,
    v,
    L,
    E,
    Cr,
    _n,
    Yo,
    ya,
    xa
  );
}
function Go(e, t) {
  let i = 0, n = 0, r = se(e.bands, Bo);
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
function Oh(e, t, i, n, r) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[h];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Yt(e, t, i, n, r, s) {
  return Li(e, t, (l, h, d, p, b, g, v, S, E, L, B) => {
    let j = l.pxRound;
    const $ = p.dir * (p.ori == 0 ? 1 : -1), F = p.ori == 0 ? vn : _n;
    let k, J;
    $ == 1 ? (k = i, J = n) : (k = n, J = i);
    let M = j(g(h[k], p, L, S)), Q = j(v(d[k], b, B, E)), Y = j(g(h[J], p, L, S)), te = j(v(s == 1 ? b.max : b.min, b, B, E)), K = new Path2D(r);
    return F(K, Y, te), F(K, M, te), F(K, M, Q), K;
  });
}
function Ar(e, t, i, n, r, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? Tr : Yo;
    let d = i;
    for (let g = 0; g < e.length; g++) {
      let v = e[g];
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
function Nh(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function Ko(e, t, i, n, r, s, l) {
  let h = [], d = e.length;
  for (let p = r == 1 ? i : n; p >= i && p <= n; p += r)
    if (t[p] === null) {
      let g = p, v = p;
      if (r == 1)
        for (; ++p <= n && t[p] === null; )
          v = p;
      else
        for (; --p >= i && t[p] === null; )
          v = p;
      let S = s(e[g]), E = v == g ? S : s(e[v]), L = g - r;
      S = l <= 0 && L >= 0 && L < d ? s(e[L]) : S;
      let j = v + r;
      E = l >= 0 && j >= 0 && j < d ? s(e[j]) : E, E >= S && h.push([S, E]);
    }
  return h;
}
function _l(e) {
  return e == 0 ? Yl : e == 1 ? De : (t) => Ai(t, e);
}
function va(e) {
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
}, vn = (e, t, i) => {
  e.lineTo(t, i);
}, _n = (e, t, i) => {
  e.lineTo(i, t);
}, Tr = va(0), Yo = va(1), _a = (e, t, i, n, r, s) => {
  e.arc(t, i, n, r, s);
}, ya = (e, t, i, n, r, s) => {
  e.arc(i, t, n, r, s);
}, wa = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(t, i, n, r, s, l);
}, xa = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(i, t, r, n, l, s);
};
function $a(e) {
  return (t, i, n, r, s) => Li(t, i, (l, h, d, p, b, g, v, S, E, L, B) => {
    let { pxRound: j, points: $ } = l, F, k;
    p.ori == 0 ? (F = Er, k = _a) : (F = Cr, k = ya);
    const J = ge($.width * ce, 3);
    let M = ($.size - $.width) / 2 * ce, Q = ge(M * 2, 3), Y = new Path2D(), te = new Path2D(), { left: K, top: A, width: Z, height: z } = t.bbox;
    Tr(
      te,
      K - Q,
      A - Q,
      Z + Q * 2,
      z + Q * 2
    );
    const V = (R) => {
      if (d[R] != null) {
        let ne = j(g(h[R], p, L, S)), H = j(v(d[R], b, B, E));
        F(Y, ne + M, H), k(Y, ne, H, M, 0, hr * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let R = n; R <= r; R++)
        V(R);
    return {
      stroke: J > 0 ? Y : null,
      fill: Y,
      clip: te,
      flags: fn | $o
    };
  });
}
function Sa(e) {
  return (t, i, n, r, s, l) => {
    n != r && (s != n && l != n && e(t, i, n), s != r && l != r && e(t, i, r), e(t, i, l));
  };
}
const Lh = Sa(vn), Hh = Sa(_n);
function ka(e) {
  const t = se(e?.alignGaps, 0);
  return (i, n, r, s) => Li(i, n, (l, h, d, p, b, g, v, S, E, L, B) => {
    [r, s] = xr(d, r, s);
    let j = l.pxRound, $ = (z) => j(g(z, p, L, S)), F = (z) => j(v(z, b, B, E)), k, J;
    p.ori == 0 ? (k = vn, J = Lh) : (k = _n, J = Hh);
    const M = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, Y = Q.stroke;
    let te = !1;
    if (s - r >= L * 4) {
      let z = (O) => i.posToVal(O, p.key, !0), V = null, R = null, ne, H, et, we = $(h[M == 1 ? r : s]), re = $(h[r]), de = $(h[s]), X = z(M == 1 ? re + 1 : de - 1);
      for (let O = M == 1 ? r : s; O >= r && O <= s; O += M) {
        let Te = h[O], xe = (M == 1 ? Te < X : Te > X) ? we : $(Te), ue = d[O];
        xe == we ? ue != null ? (H = ue, V == null ? (k(Y, xe, F(H)), ne = V = R = H) : H < V ? V = H : H > R && (R = H)) : ue === null && (te = !0) : (V != null && J(Y, we, F(V), F(R), F(ne), F(H)), ue != null ? (H = ue, k(Y, xe, F(H)), V = R = ne = H) : (V = R = null, ue === null && (te = !0)), we = xe, X = z(we + M));
      }
      V != null && V != R && et != we && J(Y, we, F(V), F(R), F(ne), F(H));
    } else
      for (let z = M == 1 ? r : s; z >= r && z <= s; z += M) {
        let V = d[z];
        V === null ? te = !0 : V != null && k(Y, $(h[z]), F(V));
      }
    let [A, Z] = Go(i, n);
    if (l.fill != null || A != 0) {
      let z = Q.fill = new Path2D(Y), V = l.fillTo(i, n, l.min, l.max, A), R = F(V), ne = $(h[r]), H = $(h[s]);
      M == -1 && ([H, ne] = [ne, H]), k(z, H, R), k(z, ne, R);
    }
    if (!l.spanGaps) {
      let z = [];
      te && z.push(...Ko(h, d, r, s, M, $, t)), Q.gaps = z = l.gaps(i, n, r, s, z), Q.clip = Ar(z, p.ori, S, E, L, B);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      Yt(i, n, r, s, Y, -1),
      Yt(i, n, r, s, Y, 1)
    ] : Yt(i, n, r, s, Y, Z)), Q;
  });
}
function Rh(e) {
  const t = se(e.align, 1), i = se(e.ascDesc, !1), n = se(e.alignGaps, 0), r = se(e.extend, !1);
  return (s, l, h, d) => Li(s, l, (p, b, g, v, S, E, L, B, j, $, F) => {
    [h, d] = xr(g, h, d);
    let k = p.pxRound, { left: J, width: M } = s.bbox, Q = (re) => k(E(re, v, $, B)), Y = (re) => k(L(re, S, F, j)), te = v.ori == 0 ? vn : _n;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, A = K.stroke, Z = v.dir * (v.ori == 0 ? 1 : -1);
    let z = Y(g[Z == 1 ? h : d]), V = Q(b[Z == 1 ? h : d]), R = V, ne = V;
    r && t == -1 && (ne = J, te(A, ne, z)), te(A, V, z);
    for (let re = Z == 1 ? h : d; re >= h && re <= d; re += Z) {
      let de = g[re];
      if (de == null)
        continue;
      let X = Q(b[re]), O = Y(de);
      t == 1 ? te(A, X, z) : te(A, R, O), te(A, X, O), z = O, R = X;
    }
    let H = R;
    r && t == 1 && (H = J + M, te(A, H, z));
    let [et, we] = Go(s, l);
    if (p.fill != null || et != 0) {
      let re = K.fill = new Path2D(A), de = p.fillTo(s, l, p.min, p.max, et), X = Y(de);
      te(re, H, X), te(re, ne, X);
    }
    if (!p.spanGaps) {
      let re = [];
      re.push(...Ko(b, g, h, d, Z, Q, n));
      let de = p.width * ce / 2, X = i || t == 1 ? de : -de, O = i || t == -1 ? -de : de;
      re.forEach((Te) => {
        Te[0] += X, Te[1] += O;
      }), K.gaps = re = p.gaps(s, l, h, d, re), K.clip = Ar(re, v.ori, B, j, $, F);
    }
    return we != 0 && (K.band = we == 2 ? [
      Yt(s, l, h, d, A, -1),
      Yt(s, l, h, d, A, 1)
    ] : Yt(s, l, h, d, A, we)), K;
  });
}
function yl(e, t, i, n, r, s, l = pe) {
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
function Fh(e) {
  e = e || Fn;
  const t = se(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let r = e.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = ie(r), l = 1 - t[0], h = se(t[1], pe), d = se(t[2], 1), p = se(e.disp, Fn), b = se(e.each, (S) => {
  }), { fill: g, stroke: v } = p;
  return (S, E, L, B) => Li(S, E, (j, $, F, k, J, M, Q, Y, te, K, A) => {
    let Z = j.pxRound, z = i, V = n * ce, R = h * ce, ne = d * ce, H, et;
    k.ori == 0 ? [H, et] = s(S, E) : [et, H] = s(S, E);
    const we = k.dir * (k.ori == 0 ? 1 : -1);
    let re = k.ori == 0 ? Tr : Yo, de = k.ori == 0 ? b : (P, me, Pe, Ii, mi, Ot, bi) => {
      b(P, me, Pe, mi, Ii, bi, Ot);
    }, X = se(S.bands, Bo).find((P) => P.series[0] == E), O = X != null ? X.dir : 0, Te = j.fillTo(S, E, j.min, j.max, O), Ge = Z(Q(Te, J, A, te)), xe, ue, wt, nt = K, Se = Z(j.width * ce), zt = !1, Vt = null, dt = null, Xt = null, Hi = null;
    g != null && (Se == 0 || v != null) && (zt = !0, Vt = g.values(S, E, L, B), dt = /* @__PURE__ */ new Map(), new Set(Vt).forEach((P) => {
      P != null && dt.set(P, new Path2D());
    }), Se > 0 && (Xt = v.values(S, E, L, B), Hi = /* @__PURE__ */ new Map(), new Set(Xt).forEach((P) => {
      P != null && Hi.set(P, new Path2D());
    })));
    let { x0: Ri, size: xn } = p;
    if (Ri != null && xn != null) {
      z = 1, $ = Ri.values(S, E, L, B), Ri.unit == 2 && ($ = $.map((Pe) => S.posToVal(Y + Pe * K, k.key, !0)));
      let P = xn.values(S, E, L, B);
      xn.unit == 2 ? ue = P[0] * K : ue = M(P[0], k, K, Y) - M(0, k, K, Y), nt = yl($, F, M, k, K, Y, nt), wt = nt - ue + V;
    } else
      nt = yl($, F, M, k, K, Y, nt), wt = nt * l + V, ue = nt - wt;
    wt < 1 && (wt = 0), Se >= ue / 2 && (Se = 0), wt < 5 && (Z = Yl);
    let Yn = wt > 0, pi = nt - wt - (Yn ? Se : 0);
    ue = Z(yo(pi, ne, R)), xe = (z == 0 ? ue / 2 : z == we ? 0 : ue) - z * we * ((z == 0 ? V / 2 : 0) + (Yn ? Se / 2 : 0));
    const Ke = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Fi = zt ? null : new Path2D();
    let Wt = null;
    if (X != null)
      Wt = S.data[X.series[1]];
    else {
      let { y0: P, y1: me } = p;
      P != null && me != null && (F = me.values(S, E, L, B), Wt = P.values(S, E, L, B));
    }
    let gi = H * ue, q = et * ue;
    for (let P = we == 1 ? L : B; P >= L && P <= B; P += we) {
      let me = F[P];
      if (me == null)
        continue;
      if (Wt != null) {
        let tt = Wt[P] ?? 0;
        if (me - tt == 0)
          continue;
        Ge = Q(tt, J, A, te);
      }
      let Pe = k.distr != 2 || p != null ? $[P] : P, Ii = M(Pe, k, K, Y), mi = Q(se(me, Te), J, A, te), Ot = Z(Ii - xe), bi = Z(Je(mi, Ge)), rt = Z(Ct(mi, Ge)), ft = bi - rt;
      if (me != null) {
        let tt = me < 0 ? q : gi, xt = me < 0 ? gi : q;
        zt ? (Se > 0 && Xt[P] != null && re(Hi.get(Xt[P]), Ot, rt + ct(Se / 2), ue, Je(0, ft - Se), tt, xt), Vt[P] != null && re(dt.get(Vt[P]), Ot, rt + ct(Se / 2), ue, Je(0, ft - Se), tt, xt)) : re(Fi, Ot, rt + ct(Se / 2), ue, Je(0, ft - Se), tt, xt), de(
          S,
          E,
          P,
          Ot - Se / 2,
          rt,
          ue + Se,
          ft
        );
      }
    }
    return Se > 0 ? Ke.stroke = zt ? Hi : Fi : zt || (Ke._fill = j.width == 0 ? j._fill : j._stroke ?? j._fill, Ke.width = 0), Ke.fill = zt ? dt : Fi, Ke;
  });
}
function Ih(e, t) {
  const i = se(t?.alignGaps, 0);
  return (n, r, s, l) => Li(n, r, (h, d, p, b, g, v, S, E, L, B, j) => {
    [s, l] = xr(p, s, l);
    let $ = h.pxRound, F = (H) => $(v(H, b, B, E)), k = (H) => $(S(H, g, j, L)), J, M, Q;
    b.ori == 0 ? (J = Er, Q = vn, M = wa) : (J = Cr, Q = _n, M = xa);
    const Y = b.dir * (b.ori == 0 ? 1 : -1);
    let te = F(d[Y == 1 ? s : l]), K = te, A = [], Z = [];
    for (let H = Y == 1 ? s : l; H >= s && H <= l; H += Y)
      if (p[H] != null) {
        let we = d[H], re = F(we);
        A.push(K = re), Z.push(k(p[H]));
      }
    const z = { stroke: e(A, Z, J, Q, M, $), fill: null, clip: null, band: null, gaps: null, flags: fn }, V = z.stroke;
    let [R, ne] = Go(n, r);
    if (h.fill != null || R != 0) {
      let H = z.fill = new Path2D(V), et = h.fillTo(n, r, h.min, h.max, R), we = k(et);
      Q(H, K, we), Q(H, te, we);
    }
    if (!h.spanGaps) {
      let H = [];
      H.push(...Ko(d, p, s, l, Y, F, i)), z.gaps = H = h.gaps(n, r, s, l, H), z.clip = Ar(H, b.ori, E, L, B, j);
    }
    return ne != 0 && (z.band = ne == 2 ? [
      Yt(n, r, s, l, V, -1),
      Yt(n, r, s, l, V, 1)
    ] : Yt(n, r, s, l, V, ne)), z;
  });
}
function Bh(e) {
  return Ih(Uh, e);
}
function Uh(e, t, i, n, r, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, e[0], t[0]), l == 2)
    n(h, e[1], t[1]);
  else {
    let d = Array(l), p = Array(l - 1), b = Array(l - 1), g = Array(l - 1);
    for (let v = 0; v < l - 1; v++)
      b[v] = t[v + 1] - t[v], g[v] = e[v + 1] - e[v], p[v] = b[v] / g[v];
    d[0] = p[0];
    for (let v = 1; v < l - 1; v++)
      p[v] === 0 || p[v - 1] === 0 || p[v - 1] > 0 != p[v] > 0 ? d[v] = 0 : (d[v] = 3 * (g[v - 1] + g[v]) / ((2 * g[v] + g[v - 1]) / p[v - 1] + (g[v] + 2 * g[v - 1]) / p[v]), isFinite(d[v]) || (d[v] = 0));
    d[l - 1] = p[l - 2];
    for (let v = 0; v < l - 1; v++)
      r(
        h,
        e[v] + g[v] / 3,
        t[v] + d[v] * g[v] / 3,
        e[v + 1] - g[v] / 3,
        t[v + 1] - d[v + 1] * g[v] / 3,
        e[v + 1],
        t[v + 1]
      );
  }
  return h;
}
const So = /* @__PURE__ */ new Set();
function wl() {
  for (let e of So)
    e.syncRect(!0);
}
bn && (Di(xu, ln, wl), Di($u, ln, wl, !0), Di(mr, ln, () => {
  We.pxRatio = ce;
}));
const jh = ka(), Vh = $a();
function xl(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => ko(s, l, t, i));
}
function Wh(e, t) {
  return e.map((i, n) => n == 0 ? {} : Ce({}, t, i));
}
function ko(e, t, i, n) {
  return Ce({}, t == 0 ? i : n, e);
}
function Aa(e, t, i) {
  return t == null ? hn : [t, i];
}
const Gh = Aa;
function Kh(e, t, i) {
  return t == null ? hn : br(t, i, Fo, !0);
}
function Ea(e, t, i, n) {
  return t == null ? hn : $r(t, i, e.scales[n].log, !1);
}
const Yh = Ea;
function Ca(e, t, i, n) {
  return t == null ? hn : Ro(t, i, e.scales[n].log, !1);
}
const qh = Ca;
function Zh(e, t, i, n, r) {
  let s = Je(el(e), el(t)), l = t - e, h = Et(r / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= r && s + (d < 5 ? ci.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function $l(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, r) => (t = De((i = +r) * ce)) + "px"), [e, t, i];
}
function Jh(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = ge(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function We(e, t, i) {
  const n = {
    mode: se(e.mode, 1)
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
  const p = n.root = vt(ru);
  if (e.id != null && (p.id = e.id), at(p, e.class), e.title) {
    let o = vt(lu, p);
    o.textContent = e.title;
  }
  const b = At("canvas"), g = n.ctx = b.getContext("2d"), v = vt(au, p);
  Di("click", v, (o) => {
    o.target === E && (be != Ji || $e != Qi) && Ue.click(n, o);
  }, !0);
  const S = n.under = vt(cu, v);
  v.appendChild(b);
  const E = n.over = vt(uu, v);
  e = dn(e);
  const L = +se(e.pxAlign, 1), B = _l(L);
  (e.plugins || []).forEach((o) => {
    o.opts && (e = o.opts(n, e) || e);
  });
  const j = e.ms || 1e-3, $ = n.series = r == 1 ? xl(e.series || [], dl, bl, !1) : Wh(e.series || [null], ml), F = n.axes = xl(e.axes || [], hl, pl, !0), k = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((o) => {
    o.fill = ie(o.fill || null), o.dir = se(o.dir, -1);
  });
  const M = r == 2 ? $[1].facets[0].scale : $[0].scale, Q = {
    axes: Wa,
    series: Ia
  }, Y = (e.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function te(o) {
    const a = o.distr == 3 ? (c) => Kt(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => so(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: m } = o, _ = m - f;
      return (u - f) / _;
    };
  }
  function K(o) {
    let a = k[o];
    if (a == null) {
      let c = (e.scales || Fn)[o] || Fn;
      if (c.from != null) {
        K(c.from);
        let u = Ce({}, k[c.from], c, { key: o });
        u.valToPct = te(u), k[o] = u;
      } else {
        a = k[o] = Ce({}, o == M ? ma : zh, c), a.key = o;
        let u = a.time, f = a.range, m = oi(f);
        if ((o != M || r == 2 && !u) && (m && (f[0] == null || f[1] == null) && (f = {
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
        }, m = !1), !m && kr(f))) {
          let _ = f;
          f = (y, w, C) => w == null ? hn : br(w, C, _);
        }
        a.range = ie(f || (u ? Gh : o == M ? a.distr == 3 ? Yh : a.distr == 4 ? qh : Aa : a.distr == 3 ? Ea : a.distr == 4 ? Ca : Kh)), a.auto = ie(m ? !1 : a.auto), a.clamp = ie(a.clamp || Mh), a._min = a._max = null, a.valToPct = te(a);
      }
    }
  }
  K("x"), K("y"), r == 1 && $.forEach((o) => {
    K(o.scale);
  }), F.forEach((o) => {
    K(o.scale);
  });
  for (let o in e.scales)
    K(o);
  const A = k[M], Z = A.distr;
  let z, V;
  A.ori == 0 ? (at(p, ou), z = s, V = l) : (at(p, su), z = l, V = s);
  const R = {};
  for (let o in k) {
    let a = k[o];
    (a.min != null || a.max != null) && (R[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const ne = e.tzDate || ((o) => new Date(De(o / j))), H = e.fmtDate || Uo, et = j == 1 ? oh(ne) : ah(ne), we = al(ne, ll(j == 1 ? rh : lh, H)), re = ul(ne, cl(uh, H)), de = [], X = n.legend = Ce({}, fh, e.legend), O = n.cursor = Ce({}, _h, { drag: { y: r == 2 } }, e.cursor), Te = X.show, Ge = O.show, xe = X.markers;
  X.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, wt, nt, Se = [], zt = [], Vt, dt = !1, Xt = {};
  if (X.live) {
    const o = $[1] ? $[1].values : null;
    dt = o != null, Vt = dt ? o(n, 1, 0) : { _: 0 };
    for (let a in Vt)
      Xt[a] = Lo;
  }
  if (Te)
    if (ue = At("table", mu, p), nt = At("tbody", null, ue), X.mount(n, ue), dt) {
      wt = At("thead", null, ue, nt);
      let o = At("tr", null, wt);
      At("th", null, o);
      for (var Hi in Vt)
        At("th", Rs, o).textContent = Hi;
    } else
      at(ue, vu), X.live && at(ue, bu);
  const Ri = { show: !0 }, xn = { show: !1 };
  function Yn(o, a) {
    if (a == 0 && (dt || !X.live || r == 2))
      return hn;
    let c = [], u = At("tr", _u, nt, nt.childNodes[a]);
    at(u, o.class), o.show || at(u, Ci);
    let f = At("th", null, u);
    if (xe.show) {
      let y = vt(yu, f);
      if (a > 0) {
        let w = xe.width(n, a);
        w && (y.style.border = w + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let m = vt(Rs, f);
    o.label instanceof HTMLElement ? m.appendChild(o.label) : m.textContent = o.label, a > 0 && (xe.show || (m.style.color = o.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ke("click", f, (y) => {
      if (O._lock)
        return;
      _i(y);
      let w = $.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let C = $.some((T, D) => D > 0 && D != w && T.show);
        $.forEach((T, D) => {
          D > 0 && Lt(D, C ? D == w ? Ri : xn : Ri, !0, Ee.setSeries);
        });
      } else
        Lt(w, { show: !o.show }, !0, Ee.setSeries);
    }, !1), Ui && Ke(Us, f, (y) => {
      O._lock || (_i(y), Lt($.indexOf(o), en, !0, Ee.setSeries));
    }, !1));
    for (var _ in Vt) {
      let y = At("td", wu, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const pi = /* @__PURE__ */ new Map();
  function Ke(o, a, c, u = !0) {
    const f = pi.get(a) || {}, m = O.bind[o](n, a, c, u);
    m && (Di(o, a, f[o] = m), pi.set(a, f));
  }
  function Fi(o, a, c) {
    const u = pi.get(a) || {};
    for (let f in u)
      (o == null || f == o) && (_o(f, a, u[f]), delete u[f]);
    o == null && pi.delete(a);
  }
  let Wt = 0, gi = 0, q = 0, P = 0, me = 0, Pe = 0, Ii = me, mi = Pe, Ot = q, bi = P, rt = 0, ft = 0, tt = 0, xt = 0;
  n.bbox = {};
  let Mr = !1, qn = !1, Bi = !1, vi = !1, Zn = !1, pt = !1;
  function zr(o, a, c) {
    (c || o != n.width || a != n.height) && Jo(o, a), Ki(!1), Bi = !0, qn = !0, Yi();
  }
  function Jo(o, a) {
    n.width = Wt = q = o, n.height = gi = P = a, me = Pe = 0, za(), Oa();
    let c = n.bbox;
    rt = c.left = Ai(me * ce, 0.5), ft = c.top = Ai(Pe * ce, 0.5), tt = c.width = Ai(q * ce, 0.5), xt = c.height = Ai(P * ce, 0.5);
  }
  const Pa = 3;
  function Da() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = ja(a), u = Va(a);
      o = a == Pa || c && u, o || (Jo(n.width, n.height), qn = !0);
    }
  }
  function Ma({ width: o, height: a }) {
    zr(o, a);
  }
  n.setSize = Ma;
  function za() {
    let o = !1, a = !1, c = !1, u = !1;
    F.forEach((f, m) => {
      if (f.show && f._show) {
        let { side: _, _size: y } = f, w = _ % 2, C = f.label != null ? f.labelSize : 0, T = y + C;
        T > 0 && (w ? (q -= T, _ == 3 ? (me += T, u = !0) : c = !0) : (P -= T, _ == 0 ? (Pe += T, o = !0) : a = !0));
      }
    }), yi[0] = o, yi[1] = c, yi[2] = a, yi[3] = u, q -= ei[1] + ei[3], me += ei[3], P -= ei[2] + ei[0], Pe += ei[0];
  }
  function Oa() {
    let o = me + q, a = Pe + P, c = me, u = Pe;
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
    F.forEach((m, _) => {
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
    O.dataIdx = (f, m, _, y) => {
      if (m == 0)
        return _;
      let w = _, C = c(f, m, _, y) ?? pe, T = C >= 0 && C < pe, D = A.ori == 0 ? q : P, W = O.left, ae = t[0], oe = t[m];
      if (a.has(oe[_])) {
        w = null;
        let ee = null, U = null, N;
        if (u == 0 || u == -1)
          for (N = _; ee == null && N-- > 0; )
            a.has(oe[N]) || (ee = N);
        if (u == 0 || u == 1)
          for (N = _; U == null && N++ < oe.length; )
            a.has(oe[N]) || (U = N);
        if (ee != null || U != null)
          if (T) {
            let _e = ee == null ? -1 / 0 : z(ae[ee], A, D, 0), ke = U == null ? 1 / 0 : z(ae[U], A, D, 0), Ie = W - _e, fe = ke - W;
            Ie <= fe ? Ie <= C && (w = ee) : fe <= C && (w = U);
          } else
            w = U == null ? ee : ee == null ? U : _ - ee <= U - _ ? ee : U;
      } else T && Me(W - z(ae[_], A, D, 0)) > C && (w = null);
      return w;
    };
  }
  const _i = (o) => {
    O.event = o;
  };
  O.idxs = de, O._lock = !1;
  let Ve = O.points;
  Ve.show = ie(Ve.show), Ve.size = ie(Ve.size), Ve.stroke = ie(Ve.stroke), Ve.width = ie(Ve.width), Ve.fill = ie(Ve.fill);
  const Nt = n.focus = Ce({}, e.focus || { alpha: 0.3 }, O.focus), Ui = Nt.prox >= 0, ji = Ui && Ve.one;
  let gt = [], Vi = [], Wi = [];
  function Qo(o, a) {
    let c = Ve.show(n, a);
    if (c instanceof HTMLElement)
      return at(c, gu), at(c, o.class), It(c, -10, -10, q, P), E.insertBefore(c, gt[a]), c;
  }
  function Xo(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && k[o.scale].time, u = o.value;
      o.value = c ? nl(u) ? ul(ne, cl(u, H)) : u || re : u || Th, o.label = o.label || (c ? wh : yh);
    }
    if (ji || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || jh || zu, o.fillTo = ie(o.fillTo || Oh), o.pxAlign = +se(o.pxAlign, L), o.pxRound = _l(o.pxAlign), o.stroke = ie(o.stroke || null), o.fill = ie(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = Ph(Je(1, o.width), 1), u = o.points = Ce({}, {
        size: c,
        width: Je(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: Vh,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = ie(u.show), u.filter = ie(u.filter), u.fill = ie(u.fill), u.stroke = ie(u.stroke), u.paths = ie(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Te) {
      let c = Yn(o, a);
      Se.splice(a, 0, c[0]), zt.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Ge) {
      de.splice(a, 0, null);
      let c = null;
      ji ? a == 0 && (c = Qo(o, a)) : a > 0 && (c = Qo(o, a)), gt.splice(a, 0, c), Vi.splice(a, 0, 0), Wi.splice(a, 0, 0);
    }
    Fe("addSeries", a);
  }
  function Na(o, a) {
    a = a ?? $.length, o = r == 1 ? ko(o, a, dl, bl) : ko(o, a, {}, ml), $.splice(a, 0, o), Xo($[a], a);
  }
  n.addSeries = Na;
  function La(o) {
    if ($.splice(o, 1), Te) {
      X.values.splice(o, 1), zt.splice(o, 1);
      let a = Se.splice(o, 1)[0];
      Fi(null, a.firstChild), a.remove();
    }
    Ge && (de.splice(o, 1), gt.splice(o, 1)[0].remove(), Vi.splice(o, 1), Wi.splice(o, 1)), Fe("delSeries", o);
  }
  n.delSeries = La;
  const yi = [!1, !1, !1, !1];
  function Ha(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = k[o.scale];
      u == null && (o.scale = c ? $[1].scale : M, u = k[o.scale]);
      let f = u.time;
      o.size = ie(o.size), o.space = ie(o.space), o.rotate = ie(o.rotate), oi(o.incrs) && o.incrs.forEach((_) => {
        !ci.has(_) && ci.set(_, Jl(_));
      }), o.incrs = ie(o.incrs || (u.distr == 2 ? th : f ? j == 1 ? nh : sh : Ei)), o.splits = ie(o.splits || (f && u.distr == 1 ? et : u.distr == 3 ? wo : u.distr == 4 ? Sh : $h)), o.stroke = ie(o.stroke), o.grid.stroke = ie(o.grid.stroke), o.ticks.stroke = ie(o.ticks.stroke), o.border.stroke = ie(o.border.stroke);
      let m = o.values;
      o.values = // static array of tick values
      oi(m) && !oi(m[0]) ? ie(m) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          oi(m) ? al(ne, ll(m, H)) : (
            // fmtDate string tpl
            nl(m) ? ch(ne, m) : m || we
          )
        ) : m || xh
      ), o.filter = ie(o.filter || (u.distr >= 3 && u.log == 10 ? Eh : u.distr == 3 && u.log == 2 ? Ch : ql)), o.font = $l(o.font), o.labelFont = $l(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (yi[a] = !0, o._el = vt(hu, v));
    }
  }
  function $n(o, a, c, u) {
    let [f, m, _, y] = c, w = a % 2, C = 0;
    return w == 0 && (y || m) && (C = a == 0 && !f || a == 2 && !_ ? De(hl.size / 3) : 0), w == 1 && (f || _) && (C = a == 1 && !m || a == 3 && !y ? De(pl.size / 2) : 0), C;
  }
  const es = n.padding = (e.padding || [$n, $n, $n, $n]).map((o) => ie(se(o, $n))), ei = n._padding = es.map((o, a) => o(n, a, yi, 0));
  let Be, Ne = null, Le = null;
  const Jn = r == 1 ? $[0].idxs : null;
  let $t = null, Sn = !1;
  function ts(o, a) {
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
    if (Ki(!0), Fe("setData"), Z == 2 && (Bi = !0), a !== !1) {
      let c = A;
      c.auto(n, Sn) ? Or() : ii(M, c.min, c.max), vi = vi || O.left >= 0, pt = !0, Yi();
    }
  }
  n.setData = ts;
  function Or() {
    Sn = !0;
    let o, a;
    r == 1 && (Be > 0 ? (Ne = Jn[0] = 0, Le = Jn[1] = Be - 1, o = t[0][Ne], a = t[0][Le], Z == 2 ? (o = Ne, a = Le) : o == a && (Z == 3 ? [o, a] = $r(o, o, A.log, !1) : Z == 4 ? [o, a] = Ro(o, o, A.log, !1) : A.time ? a = o + De(86400 / j) : [o, a] = br(o, a, Fo, !0))) : (Ne = Jn[0] = o = null, Le = Jn[1] = a = null)), ii(M, o, a);
  }
  let Qn, Gi, Nr, Lr, Hr, Rr, Fr, Ir, Br, it;
  function is(o, a, c, u, f, m) {
    o ??= Is, c ??= Bo, u ??= "butt", f ??= Is, m ??= "round", o != Qn && (g.strokeStyle = Qn = o), f != Gi && (g.fillStyle = Gi = f), a != Nr && (g.lineWidth = Nr = a), m != Hr && (g.lineJoin = Hr = m), u != Rr && (g.lineCap = Rr = u), c != Lr && g.setLineDash(Lr = c);
  }
  function ns(o, a, c, u) {
    a != Gi && (g.fillStyle = Gi = a), o != Fr && (g.font = Fr = o), c != Ir && (g.textAlign = Ir = c), u != Br && (g.textBaseline = Br = u);
  }
  function Ur(o, a, c, u, f = 0) {
    if (u.length > 0 && o.auto(n, Sn) && (a == null || a.min == null)) {
      let m = se(Ne, 0), _ = se(Le, u.length - 1), y = c.min == null ? Eu(u, m, _, f, o.distr == 3) : [c.min, c.max];
      o.min = Ct(o.min, c.min = y[0]), o.max = Je(o.max, c.max = y[1]);
    }
  }
  const rs = { min: null, max: null };
  function Ra() {
    for (let u in k) {
      let f = k[u];
      R[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      R[M] != null && f.auto(n, Sn)) && (R[u] = rs);
    }
    for (let u in k) {
      let f = k[u];
      R[u] == null && f.from != null && R[f.from] != null && (R[u] = rs);
    }
    R[M] != null && Ki(!0);
    let o = {};
    for (let u in R) {
      let f = R[u];
      if (f != null) {
        let m = o[u] = dn(k[u], Lu);
        if (f.min != null)
          Ce(m, f);
        else if (u != M || r == 2)
          if (Be == 0 && m.from == null) {
            let _ = m.range(n, null, null, u);
            m.min = _[0], m.max = _[1];
          } else
            m.min = pe, m.max = -pe;
      }
    }
    if (Be > 0) {
      $.forEach((u, f) => {
        if (r == 1) {
          let m = u.scale, _ = R[m];
          if (_ == null)
            return;
          let y = o[m];
          if (f == 0) {
            let w = y.range(n, y.min, y.max, m);
            y.min = w[0], y.max = w[1], Ne = Et(y.min, t[0]), Le = Et(y.max, t[0]), Le - Ne > 1 && (t[0][Ne] < y.min && Ne++, t[0][Le] > y.max && Le--), u.min = $t[Ne], u.max = $t[Le];
          } else u.show && u.auto && Ur(y, _, u, t[f], u.sorted);
          u.idxs[0] = Ne, u.idxs[1] = Le;
        } else if (f > 0 && u.show && u.auto) {
          let [m, _] = u.facets, y = m.scale, w = _.scale, [C, T] = t[f], D = o[y], W = o[w];
          D != null && Ur(D, R[y], m, C, m.sorted), W != null && Ur(W, R[w], _, T, _.sorted), u.min = _.min, u.max = _.max;
        }
      });
      for (let u in o) {
        let f = o[u], m = R[u];
        if (f.from == null && (m == null || m.min == null)) {
          let _ = f.range(
            n,
            f.min == pe ? null : f.min,
            f.max == -pe ? null : f.max,
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
        m._min = _ == 3 ? Kt(m.min) : _ == 4 ? so(m.min, m.asinh) : _ == 100 ? m.fwd(m.min) : m.min, m._max = _ == 3 ? Kt(m.max) : _ == 4 ? so(m.max, m.asinh) : _ == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      $.forEach((u, f) => {
        r == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Bi = !0, Fe("setScale", u);
      Ge && O.left >= 0 && (vi = pt = !0);
    }
    for (let u in R)
      R[u] = null;
  }
  function Fa(o) {
    let a = yo(Ne - 1, 0, Be - 1), c = yo(Le + 1, 0, Be - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < Be - 1; )
      c++;
    return [a, c];
  }
  function Ia() {
    if (Be > 0) {
      let o = $.some((a) => a._focus) && it != Nt.alpha;
      o && (g.globalAlpha = it = Nt.alpha), $.forEach((a, c) => {
        if (c > 0 && a.show && (os(c, !1), os(c, !0), a._paths == null)) {
          let u = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha);
          let f = r == 2 ? [0, t[c][0].length - 1] : Fa(t[c]);
          a._paths = a.paths(n, c, f[0], f[1]), it != u && (g.globalAlpha = it = u);
        }
      }), $.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha), a._paths != null && ss(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Ne, Le, f), _ = a.points.filter(n, c, m, f);
            (m || _) && (a.points._paths = a.points.paths(n, c, Ne, Le, _), ss(c, !0));
          }
          it != u && (g.globalAlpha = it = u), Fe("drawSeries", c);
        }
      }), o && (g.globalAlpha = it = 1);
    }
  }
  function os(o, a) {
    let c = a ? $[o].points : $[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function ss(o, a) {
    let c = a ? $[o].points : $[o], {
      stroke: u,
      fill: f,
      clip: m,
      flags: _,
      _stroke: y = c._stroke,
      _fill: w = c._fill,
      _width: C = c.width
    } = c._paths;
    C = ge(C * ce, 3);
    let T = null, D = C % 2 / 2;
    a && w == null && (w = C > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && D > 0;
    if (W && g.translate(D, D), !a) {
      let ae = rt - C / 2, oe = ft - C / 2, ee = tt + C, U = xt + C;
      T = new Path2D(), T.rect(ae, oe, ee, U);
    }
    a ? jr(y, C, c.dash, c.cap, w, u, f, _, m) : Ba(o, y, C, c.dash, c.cap, w, u, f, _, T, m), W && g.translate(-D, -D);
  }
  function Ba(o, a, c, u, f, m, _, y, w, C, T) {
    let D = !1;
    w != 0 && J.forEach((W, ae) => {
      if (W.series[0] == o) {
        let oe = $[W.series[1]], ee = t[W.series[1]], U = (oe._paths || Fn).band;
        oi(U) && (U = W.dir == 1 ? U[0] : U[1]);
        let N, _e = null;
        oe.show && U && Tu(ee, Ne, Le) ? (_e = W.fill(n, ae) || m, N = oe._paths.clip) : U = null, jr(a, c, u, f, _e, _, y, w, C, T, N, U), D = !0;
      }
    }), D || jr(a, c, u, f, m, _, y, w, C, T);
  }
  const ls = fn | $o;
  function jr(o, a, c, u, f, m, _, y, w, C, T, D) {
    is(o, a, c, u, f), (w || C || D) && (g.save(), w && g.clip(w), C && g.clip(C)), D ? (y & ls) == ls ? (g.clip(D), T && g.clip(T), er(f, _), Xn(o, m, a)) : y & $o ? (er(f, _), g.clip(D), Xn(o, m, a)) : y & fn && (g.save(), g.clip(D), T && g.clip(T), er(f, _), g.restore(), Xn(o, m, a)) : (er(f, _), Xn(o, m, a)), (w || C || D) && g.restore();
  }
  function Xn(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      g.strokeStyle = Qn = f, g.stroke(u);
    }) : a != null && o && g.stroke(a));
  }
  function er(o, a) {
    a instanceof Map ? a.forEach((c, u) => {
      g.fillStyle = Gi = u, g.fill(c);
    }) : a != null && o && g.fill(a);
  }
  function Ua(o, a, c, u) {
    let f = F[o], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let _ = f._space = f.space(n, o, a, c, u), y = f._incrs = f.incrs(n, o, a, c, u, _);
      m = Zh(a, c, y, u, _);
    }
    return f._found = m;
  }
  function Vr(o, a, c, u, f, m, _, y, w, C) {
    let T = _ % 2 / 2;
    L == 1 && g.translate(T, T), is(y, _, w, C, y), g.beginPath();
    let D, W, ae, oe, ee = f + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (W = f, oe = ee) : (D = f, ae = ee);
    for (let U = 0; U < o.length; U++)
      a[U] != null && (c == 0 ? D = ae = o[U] : W = oe = o[U], g.moveTo(D, W), g.lineTo(ae, oe));
    g.stroke(), L == 1 && g.translate(-T, -T);
  }
  function ja(o) {
    let a = !0;
    return F.forEach((c, u) => {
      if (!c.show)
        return;
      let f = k[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, Ki(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Ki(!1));
      let m = c.side, _ = m % 2, { min: y, max: w } = f, [C, T] = Ua(u, y, w, _ == 0 ? q : P);
      if (T == 0)
        return;
      let D = f.distr == 2, W = c._splits = c.splits(n, u, y, w, C, T, D), ae = f.distr == 2 ? W.map((N) => $t[N]) : W, oe = f.distr == 2 ? $t[W[1]] - $t[W[0]] : C, ee = c._values = c.values(n, c.filter(n, ae, u, T, oe), u, T, oe);
      c._rotate = m == 2 ? c.rotate(n, ee, u, T) : 0;
      let U = c._size;
      c._size = _t(c.size(n, ee, u, o)), U != null && c._size != U && (a = !1);
    }), a;
  }
  function Va(o) {
    let a = !0;
    return es.forEach((c, u) => {
      let f = c(n, u, yi, o);
      f != ei[u] && (a = !1), ei[u] = f;
    }), a;
  }
  function Wa() {
    for (let o = 0; o < F.length; o++) {
      let a = F[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, m, _ = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [w, C] = a._found;
      if (a.label != null) {
        let qe = a.labelGap * y, lt = De((a._lpos + qe) * ce);
        ns(a.labelFont[0], _, "center", c == 2 ? Dn : Fs), g.save(), u == 1 ? (f = m = 0, g.translate(
          lt,
          De(ft + xt / 2)
        ), g.rotate((c == 3 ? -hr : hr) / 2)) : (f = De(rt + tt / 2), m = lt);
        let $i = Kl(a.label) ? a.label(n, o, w, C) : a.label;
        g.fillText($i, f, m), g.restore();
      }
      if (C == 0)
        continue;
      let T = k[a.scale], D = u == 0 ? tt : xt, W = u == 0 ? rt : ft, ae = a._splits, oe = T.distr == 2 ? ae.map((qe) => $t[qe]) : ae, ee = T.distr == 2 ? $t[ae[1]] - $t[ae[0]] : w, U = a.ticks, N = a.border, _e = U.show ? U.size : 0, ke = De(_e * ce), Ie = De((a.alignTo == 2 ? a._size - _e - a.gap : a.gap) * ce), fe = a._rotate * -hr / 180, Ae = B(a._pos * ce), ot = (ke + Ie) * y, Ye = Ae + ot;
      m = u == 0 ? Ye : 0, f = u == 1 ? Ye : 0;
      let mt = a.font[0], St = a.align == 1 ? nn : a.align == 2 ? no : fe > 0 ? nn : fe < 0 ? no : u == 0 ? "center" : c == 3 ? no : nn, Rt = fe || u == 1 ? "middle" : c == 2 ? Dn : Fs;
      ns(mt, _, St, Rt);
      let st = a.font[1] * a.lineGap, bt = ae.map((qe) => B(h(qe, T, D, W))), kt = a._values;
      for (let qe = 0; qe < kt.length; qe++) {
        let lt = kt[qe];
        if (lt != null) {
          u == 0 ? f = bt[qe] : m = bt[qe], lt = "" + lt;
          let $i = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let Ze = 0; Ze < $i.length; Ze++) {
            let As = $i[Ze];
            fe ? (g.save(), g.translate(f, m + Ze * st), g.rotate(fe), g.fillText(As, 0, 0), g.restore()) : g.fillText(As, f, m + Ze * st);
          }
        }
      }
      U.show && Vr(
        bt,
        U.filter(n, oe, o, C, ee),
        u,
        c,
        Ae,
        ke,
        ge(U.width * ce, 3),
        U.stroke(n, o),
        U.dash,
        U.cap
      );
      let Ft = a.grid;
      Ft.show && Vr(
        bt,
        Ft.filter(n, oe, o, C, ee),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? ft : rt,
        u == 0 ? xt : tt,
        ge(Ft.width * ce, 3),
        Ft.stroke(n, o),
        Ft.dash,
        Ft.cap
      ), N.show && Vr(
        [Ae],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? ft : rt,
        u == 1 ? xt : tt,
        ge(N.width * ce, 3),
        N.stroke(n, o),
        N.dash,
        N.cap
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
  let tr = !1, Wr = !1, kn = [];
  function Ga() {
    Wr = !1;
    for (let o = 0; o < kn.length; o++)
      Fe(...kn[o]);
    kn.length = 0;
  }
  function Yi() {
    tr || (ju(as), tr = !0);
  }
  function Ka(o, a = !1) {
    tr = !0, Wr = a, o(n), as(), a && kn.length > 0 && queueMicrotask(Ga);
  }
  n.batch = Ka;
  function as() {
    if (Mr && (Ra(), Mr = !1), Bi && (Da(), Bi = !1), qn) {
      if (ye(S, nn, me), ye(S, Dn, Pe), ye(S, On, q), ye(S, Nn, P), ye(E, nn, me), ye(E, Dn, Pe), ye(E, On, q), ye(E, Nn, P), ye(v, On, Wt), ye(v, Nn, gi), b.width = De(Wt * ce), b.height = De(gi * ce), F.forEach(({ _el: o, _show: a, _size: c, _pos: u, side: f }) => {
        if (o != null)
          if (a) {
            let m = f === 3 || f === 0 ? c : 0, _ = f % 2 == 1;
            ye(o, _ ? "left" : "top", u - m), ye(o, _ ? "width" : "height", c), ye(o, _ ? "top" : "left", _ ? Pe : me), ye(o, _ ? "height" : "width", _ ? P : q), vo(o, Ci);
          } else
            at(o, Ci);
      }), Qn = Gi = Nr = Hr = Rr = Fr = Ir = Br = Lr = null, it = 1, Cn(!0), me != Ii || Pe != mi || q != Ot || P != bi) {
        Ki(!1);
        let o = q / Ot, a = P / bi;
        if (Ge && !vi && O.left >= 0) {
          O.left *= o, O.top *= a, qi && It(qi, De(O.left), 0, q, P), Zi && It(Zi, 0, De(O.top), q, P);
          for (let c = 0; c < gt.length; c++) {
            let u = gt[c];
            u != null && (Vi[c] *= o, Wi[c] *= a, It(u, _t(Vi[c]), _t(Wi[c]), q, P));
          }
        }
        if (ve.show && !Zn && ve.left >= 0 && ve.width > 0) {
          ve.left *= o, ve.width *= o, ve.top *= a, ve.height *= a;
          for (let c in Jr)
            ye(Xi, c, ve[c]);
        }
        Ii = me, mi = Pe, Ot = q, bi = P;
      }
      Fe("setSize"), qn = !1;
    }
    Wt > 0 && gi > 0 && (g.clearRect(0, 0, b.width, b.height), Fe("drawClear"), Y.forEach((o) => o()), Fe("draw")), ve.show && Zn && (ir(ve), Zn = !1), Ge && vi && (xi(null, !0, !1), vi = !1), X.show && X.live && pt && (qr(), pt = !1), d || (d = !0, n.status = 1, Fe("ready")), Sn = !1, tr = !1;
  }
  n.redraw = (o, a) => {
    Bi = a || !1, o !== !1 ? ii(M, A.min, A.max) : Yi();
  };
  function Gr(o, a) {
    let c = k[o];
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
      o == M && c.distr == 2 && Be > 0 && (a.min = Et(a.min, t[0]), a.max = Et(a.max, t[0]), a.min == a.max && a.max++), R[o] = a, Mr = !0, Yi();
    }
  }
  n.setScale = Gr;
  let Kr, Yr, qi, Zi, cs, us, Ji, Qi, hs, ds, be, $e, ti = !1;
  const Ue = O.drag;
  let He = Ue.x, Re = Ue.y;
  Ge && (O.x && (Kr = vt(fu, E)), O.y && (Yr = vt(pu, E)), A.ori == 0 ? (qi = Kr, Zi = Yr) : (qi = Yr, Zi = Kr), be = O.left, $e = O.top);
  const ve = n.select = Ce({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), Xi = ve.show ? vt(du, ve.over ? E : S) : null;
  function ir(o, a) {
    if (ve.show) {
      for (let c in o)
        ve[c] = o[c], c in Jr && ye(Xi, c, o[c]);
      a !== !1 && Fe("setSelect");
    }
  }
  n.setSelect = ir;
  function Ya(o) {
    if ($[o].show)
      Te && vo(Se[o], Ci);
    else if (Te && at(Se[o], Ci), Ge) {
      let c = ji ? gt[0] : gt[o];
      c != null && It(c, -10, -10, q, P);
    }
  }
  function ii(o, a, c) {
    Gr(o, { min: a, max: c });
  }
  function Lt(o, a, c, u) {
    a.focus != null && Xa(o), a.show != null && $.forEach((f, m) => {
      m > 0 && (o == m || o == null) && (f.show = a.show, Ya(m), r == 2 ? (ii(f.facets[0].scale, null, null), ii(f.facets[1].scale, null, null)) : ii(f.scale, null, null), Yi());
    }), c !== !1 && Fe("setSeries", o, a), u && Tn("setSeries", n, o, a);
  }
  n.setSeries = Lt;
  function qa(o, a) {
    Ce(J[o], a);
  }
  function Za(o, a) {
    o.fill = ie(o.fill || null), o.dir = se(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function Ja(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = Za, n.setBand = qa, n.delBand = Ja;
  function Qa(o, a) {
    $[o].alpha = a, Ge && gt[o] != null && (gt[o].style.opacity = a), Te && Se[o] && (Se[o].style.opacity = a);
  }
  let Gt, ni, wi;
  const en = { focus: !0 };
  function Xa(o) {
    if (o != wi) {
      let a = o == null, c = Nt.alpha != 1;
      $.forEach((u, f) => {
        if (r == 1 || f > 0) {
          let m = a || f == 0 || f == o;
          u._focus = a ? null : m, c && Qa(f, m ? 1 : Nt.alpha);
        }
      }), wi = o, c && Yi();
    }
  }
  Te && Ui && Ke(js, ue, (o) => {
    O._lock || (_i(o), wi != null && Lt(null, en, !0, Ee.setSeries));
  });
  function Ht(o, a, c) {
    let u = k[a];
    c && (o = o / ce - (u.ori == 1 ? Pe : me));
    let f = q;
    u.ori == 1 && (f = P, o = f - o), u.dir == -1 && (o = f - o);
    let m = u._min, _ = u._max, y = o / f, w = m + (_ - m) * y, C = u.distr;
    return C == 3 ? un(10, w) : C == 4 ? Du(w, u.asinh) : C == 100 ? u.bwd(w) : w;
  }
  function ec(o, a) {
    let c = Ht(o, M, a);
    return Et(c, t[0], Ne, Le);
  }
  n.valToIdx = (o) => Et(o, t[0]), n.posToIdx = ec, n.posToVal = Ht, n.valToPos = (o, a, c) => k[a].ori == 0 ? s(
    o,
    k[a],
    c ? tt : q,
    c ? rt : 0
  ) : l(
    o,
    k[a],
    c ? xt : P,
    c ? ft : 0
  ), n.setCursor = (o, a, c) => {
    be = o.left, $e = o.top, xi(null, a, c);
  };
  function fs(o, a) {
    ye(Xi, nn, ve.left = o), ye(Xi, On, ve.width = a);
  }
  function ps(o, a) {
    ye(Xi, Dn, ve.top = o), ye(Xi, Nn, ve.height = a);
  }
  let An = A.ori == 0 ? fs : ps, En = A.ori == 1 ? fs : ps;
  function tc() {
    if (Te && X.live)
      for (let o = r == 2 ? 1 : 0; o < $.length; o++) {
        if (o == 0 && dt)
          continue;
        let a = X.values[o], c = 0;
        for (let u in a)
          zt[o][c++].firstChild.nodeValue = a[u];
      }
  }
  function qr(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, u) => {
      de[u] = c;
    }) : Nu(o.idx) || de.fill(o.idx), X.idx = de[0]), Te && X.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || r == 1 && !dt) && ic(c, de[c]);
      tc();
    }
    pt = !1, a !== !1 && Fe("setLegend");
  }
  n.setLegend = qr;
  function ic(o, a) {
    let c = $[o], u = o == 0 && Z == 2 ? $t : t[o], f;
    dt ? f = c.values(n, o, a) ?? Xt : (f = c.value(n, a == null ? null : u[a], o, a), f = f == null ? Xt : { _: f }), X.values[o] = f;
  }
  function xi(o, a, c) {
    hs = be, ds = $e, [be, $e] = O.move(n, be, $e), O.left = be, O.top = $e, Ge && (qi && It(qi, De(be), 0, q, P), Zi && It(Zi, 0, De($e), q, P));
    let u, f = Ne > Le;
    Gt = pe, ni = null;
    let m = A.ori == 0 ? q : P, _ = A.ori == 1 ? q : P;
    if (be < 0 || Be == 0 || f) {
      u = O.idx = null;
      for (let y = 0; y < $.length; y++) {
        let w = gt[y];
        w != null && It(w, -10, -10, q, P);
      }
      Ui && Lt(null, en, !0, o == null && Ee.setSeries), X.live && (de.fill(u), pt = !0);
    } else {
      let y, w, C;
      r == 1 && (y = A.ori == 0 ? be : $e, w = Ht(y, M), u = O.idx = Et(w, t[0], Ne, Le), C = z(t[0][u], A, m, 0));
      let T = -10, D = -10, W = 0, ae = 0, oe = !0, ee = "", U = "";
      for (let N = r == 2 ? 1 : 0; N < $.length; N++) {
        let _e = $[N], ke = de[N], Ie = ke == null ? null : r == 1 ? t[N][ke] : t[N][1][ke], fe = O.dataIdx(n, N, u, w), Ae = fe == null ? null : r == 1 ? t[N][fe] : t[N][1][fe];
        if (pt = pt || Ae != Ie || fe != ke, de[N] = fe, N > 0 && _e.show) {
          let ot = fe == null ? -10 : fe == u ? C : z(r == 1 ? t[0][fe] : t[N][0][fe], A, m, 0), Ye = Ae == null ? -10 : V(Ae, r == 1 ? k[_e.scale] : k[_e.facets[1].scale], _, 0);
          if (Ui && Ae != null) {
            let mt = A.ori == 1 ? be : $e, St = Me(Nt.dist(n, N, fe, Ye, mt));
            if (St < Gt) {
              let Rt = Nt.bias;
              if (Rt != 0) {
                let st = Ht(mt, _e.scale), bt = Ae >= 0 ? 1 : -1, kt = st >= 0 ? 1 : -1;
                kt == bt && (kt == 1 ? Rt == 1 ? Ae >= st : Ae <= st : (
                  // >= 0
                  Rt == 1 ? Ae <= st : Ae >= st
                )) && (Gt = St, ni = N);
              } else
                Gt = St, ni = N;
            }
          }
          if (pt || ji) {
            let mt, St;
            A.ori == 0 ? (mt = ot, St = Ye) : (mt = Ye, St = ot);
            let Rt, st, bt, kt, Ft, qe, lt = !0, $i = Ve.bbox;
            if ($i != null) {
              lt = !1;
              let Ze = $i(n, N);
              bt = Ze.left, kt = Ze.top, Rt = Ze.width, st = Ze.height;
            } else
              bt = mt, kt = St, Rt = st = Ve.size(n, N);
            if (qe = Ve.fill(n, N), Ft = Ve.stroke(n, N), ji)
              N == ni && Gt <= Nt.prox && (T = bt, D = kt, W = Rt, ae = st, oe = lt, ee = qe, U = Ft);
            else {
              let Ze = gt[N];
              Ze != null && (Vi[N] = bt, Wi[N] = kt, Zs(Ze, Rt, st, lt), Ys(Ze, qe, Ft), It(Ze, _t(bt), _t(kt), q, P));
            }
          }
        }
      }
      if (ji) {
        let N = Nt.prox, _e = wi == null ? Gt <= N : Gt > N || ni != wi;
        if (pt || _e) {
          let ke = gt[0];
          ke != null && (Vi[0] = T, Wi[0] = D, Zs(ke, W, ae, oe), Ys(ke, ee, U), It(ke, _t(T), _t(D), q, P));
        }
      }
    }
    if (ve.show && ti)
      if (o != null) {
        let [y, w] = Ee.scales, [C, T] = Ee.match, [D, W] = o.cursor.sync.scales, ae = o.cursor.drag;
        if (He = ae._x, Re = ae._y, He || Re) {
          let { left: oe, top: ee, width: U, height: N } = o.select, _e = o.scales[D].ori, ke = o.posToVal, Ie, fe, Ae, ot, Ye, mt = y != null && C(y, D), St = w != null && T(w, W);
          mt && He ? (_e == 0 ? (Ie = oe, fe = U) : (Ie = ee, fe = N), Ae = k[y], ot = z(ke(Ie, D), Ae, m, 0), Ye = z(ke(Ie + fe, D), Ae, m, 0), An(Ct(ot, Ye), Me(Ye - ot))) : An(0, m), St && Re ? (_e == 1 ? (Ie = oe, fe = U) : (Ie = ee, fe = N), Ae = k[w], ot = V(ke(Ie, W), Ae, _, 0), Ye = V(ke(Ie + fe, W), Ae, _, 0), En(Ct(ot, Ye), Me(Ye - ot))) : En(0, _);
        } else
          Qr();
      } else {
        let y = Me(hs - cs), w = Me(ds - us);
        if (A.ori == 1) {
          let W = y;
          y = w, w = W;
        }
        He = Ue.x && y >= Ue.dist, Re = Ue.y && w >= Ue.dist;
        let C = Ue.uni;
        C != null ? He && Re && (He = y >= C, Re = w >= C, !He && !Re && (w > y ? Re = !0 : He = !0)) : Ue.x && Ue.y && (He || Re) && (He = Re = !0);
        let T, D;
        He && (A.ori == 0 ? (T = Ji, D = be) : (T = Qi, D = $e), An(Ct(T, D), Me(D - T)), Re || En(0, _)), Re && (A.ori == 1 ? (T = Ji, D = be) : (T = Qi, D = $e), En(Ct(T, D), Me(D - T)), He || An(0, m)), !He && !Re && (An(0, 0), En(0, 0));
      }
    if (Ue._x = He, Ue._y = Re, o == null) {
      if (c) {
        if (ks != null) {
          let [y, w] = Ee.scales;
          Ee.values[0] = y != null ? Ht(A.ori == 0 ? be : $e, y) : null, Ee.values[1] = w != null ? Ht(A.ori == 1 ? be : $e, w) : null;
        }
        Tn(ro, n, be, $e, q, P, u);
      }
      if (Ui) {
        let y = c && Ee.setSeries, w = Nt.prox;
        wi == null ? Gt <= w && Lt(ni, en, !0, y) : Gt > w ? Lt(null, en, !0, y) : ni != wi && Lt(ni, en, !0, y);
      }
    }
    pt && (X.idx = u, qr()), a !== !1 && Fe("setCursor");
  }
  let ri = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ri == null && Cn(!1), ri;
    }
  });
  function Cn(o = !1) {
    o ? ri = null : (ri = E.getBoundingClientRect(), Fe("syncRect", ri));
  }
  function gs(o, a, c, u, f, m, _) {
    O._lock || ti && o != null && o.movementX == 0 && o.movementY == 0 || (Zr(o, a, c, u, f, m, _, !1, o != null), o != null ? xi(null, !0, !0) : xi(a, !0, !1));
  }
  function Zr(o, a, c, u, f, m, _, y, w) {
    if (ri == null && Cn(!1), _i(o), o != null)
      c = o.clientX - ri.left, u = o.clientY - ri.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [C, T] = Ee.scales, D = a.cursor.sync, [W, ae] = D.values, [oe, ee] = D.scales, [U, N] = Ee.match, _e = a.axes[0].side % 2 == 1, ke = A.ori == 0 ? q : P, Ie = A.ori == 1 ? q : P, fe = _e ? m : f, Ae = _e ? f : m, ot = _e ? u : c, Ye = _e ? c : u;
      if (oe != null ? c = U(C, oe) ? h(W, k[C], ke, 0) : -10 : c = ke * (ot / fe), ee != null ? u = N(T, ee) ? h(ae, k[T], Ie, 0) : -10 : u = Ie * (Ye / Ae), A.ori == 1) {
        let mt = c;
        c = u, u = mt;
      }
    }
    w && (a == null || a.cursor.event.type == ro) && ((c <= 1 || c >= q - 1) && (c = Ai(c, q)), (u <= 1 || u >= P - 1) && (u = Ai(u, P))), y ? (cs = c, us = u, [Ji, Qi] = O.move(n, c, u)) : (be = c, $e = u);
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
  let ms, bs, vs, _s;
  function ys(o, a, c, u, f, m, _) {
    ti = !0, He = Re = Ue._x = Ue._y = !1, Zr(o, a, c, u, f, m, _, !0, !1), o != null && (Ke(oo, mo, ws, !1), Tn(Bs, n, Ji, Qi, q, P, null));
    let { left: y, top: w, width: C, height: T } = ve;
    ms = y, bs = w, vs = C, _s = T;
  }
  function ws(o, a, c, u, f, m, _) {
    ti = Ue._x = Ue._y = !1, Zr(o, a, c, u, f, m, _, !1, !0);
    let { left: y, top: w, width: C, height: T } = ve, D = C > 0 || T > 0, W = ms != y || bs != w || vs != C || _s != T;
    if (D && W && ir(ve), Ue.setScale && D && W) {
      let ae = y, oe = C, ee = w, U = T;
      if (A.ori == 1 && (ae = w, oe = T, ee = y, U = C), He && ii(
        M,
        Ht(ae, M),
        Ht(ae + oe, M)
      ), Re)
        for (let N in k) {
          let _e = k[N];
          N != M && _e.from == null && _e.min != pe && ii(
            N,
            Ht(ee + U, N),
            Ht(ee, N)
          );
        }
      Qr();
    } else O.lock && (O._lock = !O._lock, xi(a, !0, o != null));
    o != null && (Fi(oo, mo), Tn(oo, n, be, $e, q, P, null));
  }
  function nc(o, a, c, u, f, m, _) {
    if (O._lock)
      return;
    _i(o);
    let y = ti;
    if (ti) {
      let w = !0, C = !0, T = 10, D, W;
      A.ori == 0 ? (D = He, W = Re) : (D = Re, W = He), D && W && (w = be <= T || be >= q - T, C = $e <= T || $e >= P - T), D && w && (be = be < Ji ? 0 : q), W && C && ($e = $e < Qi ? 0 : P), xi(null, !0, !0), ti = !1;
    }
    be = -10, $e = -10, de.fill(null), xi(null, !0, !0), y && (ti = y);
  }
  function xs(o, a, c, u, f, m, _) {
    O._lock || (_i(o), Or(), Qr(), o != null && Tn(Vs, n, be, $e, q, P, null));
  }
  function $s() {
    F.forEach(Jh), zr(n.width, n.height, !0);
  }
  Di(mr, ln, $s);
  const tn = {};
  tn.mousedown = ys, tn.mousemove = gs, tn.mouseup = ws, tn.dblclick = xs, tn.setSeries = (o, a, c, u) => {
    let f = Ee.match[2];
    c = f(n, a, c), c != -1 && Lt(c, u, !0, !1);
  }, Ge && (Ke(Bs, E, ys), Ke(ro, E, gs), Ke(Us, E, (o) => {
    _i(o), Cn(!1);
  }), Ke(js, E, nc), Ke(Vs, E, xs), So.add(n), n.syncRect = Cn);
  const nr = n.hooks = e.hooks || {};
  function Fe(o, a, c) {
    Wr ? kn.push([o, a, c]) : o in nr && nr[o].forEach((u) => {
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
      pub: tl,
      sub: tl
    },
    scales: [M, $[1] ? $[1].scale : null],
    match: [il, il, Ss],
    values: [null, null]
  }, O.sync);
  Ee.match.length == 2 && Ee.match.push(Ss), O.sync = Ee;
  const ks = Ee.key, Xr = ba(ks);
  function Tn(o, a, c, u, f, m, _) {
    Ee.filters.pub(o, a, c, u, f, m, _) && Xr.pub(o, a, c, u, f, m, _);
  }
  Xr.sub(n);
  function rc(o, a, c, u, f, m, _) {
    Ee.filters.sub(o, a, c, u, f, m, _) && tn[o](null, a, c, u, f, m, _);
  }
  n.pub = rc;
  function oc() {
    Xr.unsub(n), So.delete(n), pi.clear(), _o(mr, ln, $s), p.remove(), ue?.remove(), Fe("destroy");
  }
  n.destroy = oc;
  function eo() {
    Fe("init", e, t), ts(t || e.data, !1), R[M] ? Gr(M, R[M]) : Or(), Zn = ve.show && (ve.width > 0 || ve.height > 0), vi = pt = !0, zr(e.width, e.height);
  }
  return $.forEach(Xo), F.forEach(Ha), i ? i instanceof HTMLElement ? (i.appendChild(p), eo()) : i(n, eo) : eo(), n;
}
We.assign = Ce;
We.fmtNum = Io;
We.rangeNum = br;
We.rangeLog = $r;
We.rangeAsinh = Ro;
We.orient = Li;
We.pxRatio = ce;
We.join = Uu;
We.fmtDate = Uo, We.tzDate = Xu;
We.sync = ba;
{
  We.addGap = Nh, We.clipGaps = Ar;
  let e = We.paths = {
    points: $a
  };
  e.linear = ka, e.stepped = Rh, e.bars = Fh, e.spline = Bh;
}
const Qh = 24;
async function Xh(e, t, i, n) {
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
        s[p] = [...g, ...b].filter((v) => v.lu >= d);
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
function ed(e, t) {
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
const td = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var id = Object.defineProperty, Pr = (e, t, i, n) => {
  for (var r = void 0, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = l(t, i, r) || r);
  return r && id(t, i, r), r;
};
const nd = [
  Xe,
  To(td),
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
], Sl = () => {
};
class yn extends ze {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = nd;
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
  le()
], yn.prototype, "_loading");
Pr([
  le()
], yn.prototype, "_error");
Pr([
  le()
], yn.prototype, "_empty");
Pr([
  gn(".chart-host")
], yn.prototype, "_host");
var rd = Object.defineProperty, od = Object.getOwnPropertyDescriptor, Qt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? od(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && rd(t, i, r), r;
};
const Ao = 260, sd = 3;
let Dt = class extends yn {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return Ao;
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
    this._unsubscribe && this._unsubscribe !== Sl && this._unsubscribe(), this._unsubscribe = Sl;
    const e = sd + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const n = await Xh(this.hass, i, Qh, (r) => {
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
    const d = ed(h, t), p = this._buildOpts(this._host.clientWidth || 400);
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
      height: Ao,
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
            const g = p.bbox.top, v = p.bbox.height;
            b.save();
            for (const S of this._intervals) {
              const E = p.valToPos(S.start, "x", !0), L = p.valToPos(S.end, "x", !0);
              L <= E || (b.fillStyle = S.action === "heating" ? kl(t, 0.18) : kl(i, 0.18), b.fillRect(E, g, L - E, v));
            }
            b.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return x`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return x`
      ${this._loading ? x`<div class="status">Loading 24 h history…</div>` : G}
      ${this._error ? x`<div class="status">${this._error}</div>` : G}
      ${this._empty ? x`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : G}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? G : this._renderLegend()}
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
    return x`<div class="legend">
      ${this._toggleItem(
      "Room",
      x`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      x`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : G}
      ${this._toggleItem(
      "Low band",
      x`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      x`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      x`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
      "Humidity (%, right axis)"
    ) : G}
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
    return x`<span
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
        height: ${To(Ao)}px;
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
Qt([
  I({ attribute: !1 })
], Dt.prototype, "hass", 2);
Qt([
  I({ type: String })
], Dt.prototype, "roomEntity", 2);
Qt([
  I({ type: String })
], Dt.prototype, "lowEntity", 2);
Qt([
  I({ type: String })
], Dt.prototype, "highEntity", 2);
Qt([
  I({ type: String })
], Dt.prototype, "actionEntity", 2);
Qt([
  I({ type: String })
], Dt.prototype, "apparentEntity", 2);
Qt([
  I({ type: String })
], Dt.prototype, "humidityEntity", 2);
Qt([
  le()
], Dt.prototype, "_hiddenLabels", 2);
Dt = Qt([
  Qe("comfort-band-history-chart")
], Dt);
function kl(e, t) {
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
var ld = Object.defineProperty, ad = Object.getOwnPropertyDescriptor, qo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ad(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ld(t, i, r), r;
};
let Vn = class extends ze {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return x`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = Ul(this.hass, e), n = t ?? "", r = t && i ? i : "";
    return x`
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
    return e ? t ? G : x`<div class="hint">
        Configure a humidity sensor in the Settings tab to also add humidity to the chart.
      </div>` : x`<div class="hint">
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
qo([
  I({ attribute: !1 })
], Vn.prototype, "hass", 2);
qo([
  I({ attribute: !1 })
], Vn.prototype, "entities", 2);
Vn = qo([
  Qe("comfort-band-insights-tab")
], Vn);
var cd = Object.defineProperty, ud = Object.getOwnPropertyDescriptor, Ta = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ud(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && cd(t, i, r), r;
};
const lr = 14, ar = 28, rn = 600, cr = 200, uo = [0, 6, 12, 18, 24], Al = [14, 18, 22, 26];
function Pi(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function hd(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let _r = class extends ze {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * rn;
  }
  _tempToY(e) {
    const t = hd(e, lr, ar);
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
      const l = this._timeToX(Pi(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[t])]), r = s[t];
    }
    return n.push([rn, this._tempToY(r)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([r, s]) => `L ${r} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, d) => Pi(h.at) - Pi(d.at)), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], r = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return x`
      <div class="chart">
        <svg
          viewBox="0 0 ${rn} ${cr}"
          preserveAspectRatio="none"
          role="img"
          aria-label="Schedule visualization for the active profile"
        >
          <title>Schedule visualization for the active profile</title>
          ${Al.map(
      (h) => li`<line class="grid" x1="0" x2=${rn} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${uo.map(
      (h) => li`<line class="grid" y1="0" y2=${cr} x1=${h / 24 * rn} x2=${h / 24 * rn}></line>`
    )}
          ${t ? li`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const d = this._timeToX(Pi(h.at));
      return li`
              <circle class="marker low" cx=${d} cy=${this._tempToY(h.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(h.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${Al.map(
      (h) => x`<div
              class="axis-label y"
              style="top: ${(ar - h) / (ar - lr) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${uo.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === uo.length - 1 ? "axis-label x end" : "axis-label x";
      return x`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
      </div>
    `;
  }
};
_r.styles = [
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
Ta([
  I({ type: Array })
], _r.prototype, "transitions", 2);
_r = Ta([
  Qe("comfort-band-schedule-chart")
], _r);
var dd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, di = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? fd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && dd(t, i, r), r;
};
let Bt = class extends ze {
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
    return x`
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
      ${this._error ? x`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : x`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Bt.styles = [
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
di([
  I({ type: Object })
], Bt.prototype, "transition", 2);
di([
  I({ type: Boolean })
], Bt.prototype, "isNew", 2);
di([
  le()
], Bt.prototype, "_at", 2);
di([
  le()
], Bt.prototype, "_low", 2);
di([
  le()
], Bt.prototype, "_high", 2);
di([
  le()
], Bt.prototype, "_error", 2);
di([
  gn('input[name="at"]')
], Bt.prototype, "_atInput", 2);
Bt = di([
  Qe("transition-edit-dialog")
], Bt);
var pd = Object.defineProperty, gd = Object.getOwnPropertyDescriptor, Mt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? gd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && pd(t, i, r), r;
};
function El(e, t) {
  return Pi(e.at) - Pi(t.at);
}
const ho = 15, fo = 24 * 60;
function md(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((n) => Pi(n.at))), i = Math.max(...t);
  for (let n = 1; n <= fo / ho; n++) {
    const r = (i + n * ho) % fo;
    if (!t.has(r)) return Cl(r);
  }
  return Cl((i + ho) % fo);
}
function Cl(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
let ut = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = md(this._transitions), this._newLow = Pl(this._transitions), this._newHigh = Dl(this._transitions), this._editing = null, this._mode = "add";
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
      i.sort(El), await this._writeSchedule(i), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = Tl(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Tl(this.hass);
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
      const t = await Hc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(El) : [], this._loading = !1);
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
      await Rc(this.hass, {
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
        low: this._newLow ?? Pl(this._transitions),
        high: this._newHigh ?? Dl(this._transitions)
      };
      return x`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return x`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? x`<div class="loading">Loading schedule…</div>` : this._error ? x`<div class="error" role="alert">${this._error}</div>` : x`
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
    return this._transitions.length === 0 ? x`<div class="empty">No transitions yet. Use “Add transition” to create one.</div>` : x`
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
    return x`
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
    return x`
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
  I({ attribute: !1 })
], ut.prototype, "hass", 2);
Mt([
  I({ type: String })
], ut.prototype, "zone", 2);
Mt([
  le()
], ut.prototype, "_profile", 2);
Mt([
  le()
], ut.prototype, "_transitions", 2);
Mt([
  le()
], ut.prototype, "_loading", 2);
Mt([
  le()
], ut.prototype, "_error", 2);
Mt([
  le()
], ut.prototype, "_mode", 2);
Mt([
  le()
], ut.prototype, "_editing", 2);
Mt([
  le()
], ut.prototype, "_newAt", 2);
Mt([
  le()
], ut.prototype, "_confirmingDeleteAt", 2);
ut = Mt([
  Qe("comfort-band-schedule-tab")
], ut);
function Tl(e) {
  const t = Bl(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Pl(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Dl(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var bd = Object.defineProperty, vd = Object.getOwnPropertyDescriptor, wn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? vd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && bd(t, i, r), r;
};
let ui = class extends ze {
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
      return x`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const i = Ul(this.hass, this.entities.roomTemperature);
    return x`
      ${this._error ? x`<div class="error" role="alert">${this._error}</div>` : G}
      ${this._renderToggle({
      entityId: e,
      title: "Use apparent temperature",
      desc: x`When on, heating and cooling decisions use the humidity-adjusted "feels like"
        value instead of the raw sensor. Falls back to the raw value automatically if the humidity
        sensor is unavailable.`
    })}
      ${this._renderToggle({
      entityId: t,
      title: "Learning enabled",
      desc: x`Reserved for upcoming features (suggested-schedule nudges, predictive control).
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
  _renderToggle(e) {
    const t = this._isOn(e.entityId), i = this._pendingByEntity[e.entityId] !== void 0;
    return x`
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
ui.styles = [
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
  I({ attribute: !1 })
], ui.prototype, "hass", 2);
wn([
  I({ type: String })
], ui.prototype, "zone", 2);
wn([
  I({ attribute: !1 })
], ui.prototype, "entities", 2);
wn([
  le()
], ui.prototype, "_pendingByEntity", 2);
wn([
  le()
], ui.prototype, "_error", 2);
ui = wn([
  Qe("comfort-band-settings-tab")
], ui);
var _d = Object.defineProperty, yd = Object.getOwnPropertyDescriptor, fi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? yd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && _d(t, i, r), r;
};
const ki = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" }
];
let Ut = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = ki.findIndex((r) => r.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + ki.length) % ki.length;
          break;
        case "ArrowRight":
          i = (t + 1) % ki.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = ki.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = ki[i].id;
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
    if (!this._isOpen) return G;
    const e = this.zoneName || this.zone || "Comfort Band";
    return x`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${ki.map(
      (t) => x`
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
        return x`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return x`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return x`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "settings":
        return x`<comfort-band-settings-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`;
      case "insights":
        return x`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Ut.styles = [
  Xe,
  je`
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
fi([
  I({ attribute: !1 })
], Ut.prototype, "hass", 2);
fi([
  I({ type: String })
], Ut.prototype, "zone", 2);
fi([
  I({ type: String })
], Ut.prototype, "zoneName", 2);
fi([
  I({ attribute: !1 })
], Ut.prototype, "entities", 2);
fi([
  le()
], Ut.prototype, "_activeTab", 2);
fi([
  le()
], Ut.prototype, "_isOpen", 2);
fi([
  gn("dialog")
], Ut.prototype, "_dialog", 2);
Ut = fi([
  Qe("comfort-band-modal")
], Ut);
var wd = Object.defineProperty, xd = Object.getOwnPropertyDescriptor, Zo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? xd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && wd(t, i, r), r;
};
let Wn = class extends ze {
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
      return x`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return x`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? x`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (i) => x` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
Zo([
  I({ attribute: !1 })
], Wn.prototype, "hass", 2);
Zo([
  I({ attribute: !1 })
], Wn.prototype, "config", 2);
Wn = Zo([
  Qe("comfort-band-card-editor")
], Wn);
var $d = Object.defineProperty, Sd = Object.getOwnPropertyDescriptor, Dr = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Sd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && $d(t, i, r), r;
};
let pn = class extends ze {
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
    if (!this._config || !this.hass) return x``;
    const e = this._config.zone, t = eu(this.hass, e);
    if (t.deviceId === null)
      return x`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, t);
    return x`
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
      ${i ? null : x`<comfort-band-modal
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
pn.styles = [
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
  I({ attribute: !1 })
], pn.prototype, "hass", 2);
Dr([
  le()
], pn.prototype, "_config", 2);
Dr([
  gn("comfort-band-modal")
], pn.prototype, "_modal", 2);
pn = Dr([
  Qe("comfort-band-card")
], pn);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.9.1 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
