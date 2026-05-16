const ro = globalThis, xr = ro.ShadowRoot && (ro.ShadyCSS === void 0 || ro.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $r = Symbol(), ys = /* @__PURE__ */ new WeakMap();
let Sl = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== $r) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (xr && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = ys.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ys.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Al = (e) => new Sl(typeof e == "string" ? e : e + "", void 0, $r), te = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Sl(n, e, $r);
}, Qa = (e, t) => {
  if (xr) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = ro.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, xs = xr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Al(n);
})(e) : e;
const { is: Xa, defineProperty: tc, getOwnPropertyDescriptor: ec, getOwnPropertyNames: ic, getOwnPropertySymbols: nc, getPrototypeOf: oc } = Object, mo = globalThis, $s = mo.trustedTypes, rc = $s ? $s.emptyScript : "", sc = mo.reactiveElementPolyfillSupport, zn = (e, t) => e, lo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? rc : null;
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
} }, Sr = (e, t) => !Xa(e, t), Ss = { attribute: !0, type: String, converter: lo, reflect: !1, useDefault: !1, hasChanged: Sr };
Symbol.metadata ??= Symbol("metadata"), mo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let on = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Ss) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && tc(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = ec(this.prototype, t) ?? { get() {
      return this[n];
    }, set(l) {
      this[n] = l;
    } };
    return { get: o, set(l) {
      const h = o?.call(this);
      s?.call(this, l), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ss;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zn("elementProperties"))) return;
    const t = oc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zn("properties"))) {
      const n = this.properties, i = [...ic(n), ...nc(n)];
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
      for (const o of i) n.unshift(xs(o));
    } else t !== void 0 && n.push(xs(t));
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
    return Qa(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : lo).toAttribute(n, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : lo;
      this._$Em = o;
      const h = l.fromAttribute(n, s.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (s = this[t]), i ??= l.getPropertyOptions(t), !((i.hasChanged ?? Sr)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: s }, l) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, l ?? n ?? this[t]), s !== !0 || l !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: l } = s, h = this[o];
        l !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, s, h);
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
on.elementStyles = [], on.shadowRootOptions = { mode: "open" }, on[zn("elementProperties")] = /* @__PURE__ */ new Map(), on[zn("finalized")] = /* @__PURE__ */ new Map(), sc?.({ ReactiveElement: on }), (mo.reactiveElementVersions ??= []).push("2.1.2");
const Ar = globalThis, As = (e) => e, ao = Ar.trustedTypes, ks = ao ? ao.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, kl = "$lit$", ci = `lit$${Math.random().toFixed(9).slice(2)}$`, El = "?" + ci, lc = `<${El}>`, Di = document, Hn = () => Di.createComment(""), Ln = (e) => e === null || typeof e != "object" && typeof e != "function", kr = Array.isArray, ac = (e) => kr(e) || typeof e?.[Symbol.iterator] == "function", Jo = `[ 	
\f\r]`, En = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Es = /-->/g, Ps = />/g, ki = RegExp(`>|${Jo}(?:([^\\s"'>=/]+)(${Jo}*=${Jo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ts = /'/g, Cs = /"/g, Pl = /^(?:script|style|textarea|title)$/i, Tl = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), U = Tl(1), ui = Tl(2), ln = Symbol.for("lit-noChange"), at = Symbol.for("lit-nothing"), Ms = /* @__PURE__ */ new WeakMap(), Ci = Di.createTreeWalker(Di, 129);
function Cl(e, t) {
  if (!kr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ks !== void 0 ? ks.createHTML(t) : t;
}
const cc = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = En;
  for (let h = 0; h < n; h++) {
    const f = e[h];
    let p, b, g = -1, _ = 0;
    for (; _ < f.length && (l.lastIndex = _, b = l.exec(f), b !== null); ) _ = l.lastIndex, l === En ? b[1] === "!--" ? l = Es : b[1] !== void 0 ? l = Ps : b[2] !== void 0 ? (Pl.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = ki) : b[3] !== void 0 && (l = ki) : l === ki ? b[0] === ">" ? (l = o ?? En, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? ki : b[3] === '"' ? Cs : Ts) : l === Cs || l === Ts ? l = ki : l === Es || l === Ps ? l = En : (l = ki, o = void 0);
    const A = l === ki && e[h + 1].startsWith("/>") ? " " : "";
    s += l === En ? f + lc : g >= 0 ? (i.push(p), f.slice(0, g) + kl + f.slice(g) + ci + A) : f + ci + (g === -2 ? h : A);
  }
  return [Cl(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Rn {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, f = this.parts, [p, b] = cc(t, n);
    if (this.el = Rn.createElement(p, i), Ci.currentNode = this.el.content, n === 2 || n === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = Ci.nextNode()) !== null && f.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith(kl)) {
          const _ = b[l++], A = o.getAttribute(g).split(ci), E = /([.?@])?(.*)/.exec(_);
          f.push({ type: 1, index: s, name: E[2], strings: A, ctor: E[1] === "." ? hc : E[1] === "?" ? fc : E[1] === "@" ? dc : _o }), o.removeAttribute(g);
        } else g.startsWith(ci) && (f.push({ type: 6, index: s }), o.removeAttribute(g));
        if (Pl.test(o.tagName)) {
          const g = o.textContent.split(ci), _ = g.length - 1;
          if (_ > 0) {
            o.textContent = ao ? ao.emptyScript : "";
            for (let A = 0; A < _; A++) o.append(g[A], Hn()), Ci.nextNode(), f.push({ type: 2, index: ++s });
            o.append(g[_], Hn());
          }
        }
      } else if (o.nodeType === 8) if (o.data === El) f.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = o.data.indexOf(ci, g + 1)) !== -1; ) f.push({ type: 7, index: s }), g += ci.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = Di.createElement("template");
    return i.innerHTML = t, i;
  }
}
function an(e, t, n = e, i) {
  if (t === ln) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = Ln(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = an(e, o._$AS(e, t.values), o, i)), t;
}
class uc {
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
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? Di).importNode(n, !0);
    Ci.currentNode = o;
    let s = Ci.nextNode(), l = 0, h = 0, f = i[0];
    for (; f !== void 0; ) {
      if (l === f.index) {
        let p;
        f.type === 2 ? p = new Vn(s, s.nextSibling, this, t) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, t) : f.type === 6 && (p = new pc(s, this, t)), this._$AV.push(p), f = i[++h];
      }
      l !== f?.index && (s = Ci.nextNode(), l++);
    }
    return Ci.currentNode = Di, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Vn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = at, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = an(this, t, n), Ln(t) ? t === at || t == null || t === "" ? (this._$AH !== at && this._$AR(), this._$AH = at) : t !== this._$AH && t !== ln && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ac(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== at && Ln(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Di.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Rn.createElement(Cl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new uc(o, this), l = s.u(this.options);
      s.p(n), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = Ms.get(t.strings);
    return n === void 0 && Ms.set(t.strings, n = new Rn(t)), n;
  }
  k(t) {
    kr(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new Vn(this.O(Hn()), this.O(Hn()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = As(t).nextSibling;
      As(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class _o {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = at, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = at;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = an(this, t, n, 0), l = !Ln(t) || t !== this._$AH && t !== ln, l && (this._$AH = t);
    else {
      const h = t;
      let f, p;
      for (t = s[0], f = 0; f < s.length - 1; f++) p = an(this, h[i + f], n, f), p === ln && (p = this._$AH[f]), l ||= !Ln(p) || p !== this._$AH[f], p === at ? t = at : t !== at && (t += (p ?? "") + s[f + 1]), this._$AH[f] = p;
    }
    l && !o && this.j(t);
  }
  j(t) {
    t === at ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class hc extends _o {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === at ? void 0 : t;
  }
}
class fc extends _o {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== at);
  }
}
class dc extends _o {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = an(this, t, n, 0) ?? at) === ln) return;
    const i = this._$AH, o = t === at && i !== at || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== at && (i === at || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class pc {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    an(this, t);
  }
}
const gc = Ar.litHtmlPolyfillSupport;
gc?.(Rn, Vn), (Ar.litHtmlVersions ??= []).push("3.3.2");
const mc = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new Vn(t.insertBefore(Hn(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const Er = globalThis;
class Vt extends on {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = mc(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ln;
  }
}
Vt._$litElement$ = !0, Vt.finalized = !0, Er.litElementHydrateSupport?.({ LitElement: Vt });
const _c = Er.litElementPolyfillSupport;
_c?.({ LitElement: Vt });
(Er.litElementVersions ??= []).push("4.2.2");
const ae = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const bc = { attribute: !0, type: String, converter: lo, reflect: !1, hasChanged: Sr }, vc = (e = bc, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: l } = n;
    return { set(h) {
      const f = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(l, f, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(l, void 0, e, h), h;
    } };
  }
  if (i === "setter") {
    const { name: l } = n;
    return function(h) {
      const f = this[l];
      t.call(this, h), this.requestUpdate(l, f, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Y(e) {
  return (t, n) => typeof n == "object" ? vc(e, t, n) : ((i, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function $t(e) {
  return Y({ ...e, state: !0, attribute: !1 });
}
const wc = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function Bn(e, t) {
  return (n, i, o) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return wc(n, i, { get() {
      return s(this);
    } });
  };
}
const ce = te`
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
function co(e) {
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
function uo(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
function ur(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var yc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, jn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? xc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && yc(t, n, o), o;
};
const hr = 15, Ml = 28, $c = Ml - hr;
function Qo(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(hr, Math.min(Ml, e)) - hr) / $c * 100;
}
let zi = class extends Vt {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = uo(this.action), t = co(e), n = Number.isFinite(this.low), i = Number.isFinite(this.high), o = Number.isFinite(this.room), s = n ? Qo(this.low) : 0, l = i ? Qo(this.high) : 100, h = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = o ? Qo(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return U`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${ui`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${n && i ? ui`<rect class="band" x=${h} y="9" width=${f} height="6" rx="3" fill=${t}></rect>` : null}
        ${o ? ui`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${o ? ui`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
zi.styles = [
  ce,
  te`
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
jn([
  Y({ type: Number })
], zi.prototype, "low", 2);
jn([
  Y({ type: Number })
], zi.prototype, "high", 2);
jn([
  Y({ type: Number })
], zi.prototype, "room", 2);
jn([
  Y({ type: String })
], zi.prototype, "action", 2);
zi = jn([
  ae("band-gauge")
], zi);
var Sc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, We = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ac(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Sc(t, n, o), o;
};
let we = class extends Vt {
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
    const e = kc(this.overrideEnds);
    return U`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = uo(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = co(e);
    return U`<span class="action-chip" style="background:${t}">
      ${ur(e)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : U`
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
    const e = uo(this.action), t = e === "heating" || e === "cooling", n = t ? `--cb-mini-bg:${co(e)}` : "", i = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${ur(e)}` : ""}`;
    return U`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${t ? "tinted" : ""}"
        style=${n}
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        aria-label=${i}
        title=${i}
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        ${this._renderRoomTemp()}
      </div>
    `;
  }
};
we.styles = [
  ce,
  te`
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
  Y({ type: String })
], we.prototype, "zoneName", 2);
We([
  Y({ type: Number })
], we.prototype, "roomTemp", 2);
We([
  Y({ type: Number })
], we.prototype, "low", 2);
We([
  Y({ type: Number })
], we.prototype, "high", 2);
We([
  Y({ type: String })
], we.prototype, "action", 2);
We([
  Y({ type: Boolean })
], we.prototype, "overrideActive", 2);
We([
  Y({ type: String })
], we.prototype, "overrideEnds", 2);
We([
  Y({ type: Boolean })
], we.prototype, "noExpand", 2);
We([
  Y({ type: String, reflect: !0 })
], we.prototype, "variant", 2);
we = We([
  ae("comfort-band-tile")
], we);
function kc(e) {
  if (!e) return "";
  const t = Date.parse(e);
  if (Number.isNaN(t)) return "";
  const n = t - Date.now();
  if (n <= 0) return "";
  const i = Math.round(n / 6e4);
  if (i < 60) return `${i}m left`;
  const o = Math.floor(i / 60), s = i % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var Ec = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, ei = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Pc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Ec(t, n, o), o;
};
let De = class extends Vt {
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
    return U`
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
          @pointerdown=${(n) => this._onThumbPointerDown(n, "low")}
          @keydown=${(n) => this._onKeyDown(n, "low")}
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
          @pointerdown=${(n) => this._onThumbPointerDown(n, "high")}
          @keydown=${(n) => this._onKeyDown(n, "high")}
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
  ce,
  te`
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
  Y({ type: Number })
], De.prototype, "min", 2);
ei([
  Y({ type: Number })
], De.prototype, "max", 2);
ei([
  Y({ type: Number })
], De.prototype, "step", 2);
ei([
  Y({ type: Number })
], De.prototype, "low", 2);
ei([
  Y({ type: Number })
], De.prototype, "high", 2);
ei([
  Y({ type: String })
], De.prototype, "unit", 2);
ei([
  $t()
], De.prototype, "_dragging", 2);
ei([
  Bn(".track")
], De.prototype, "_track", 2);
De = ei([
  ae("dual-handle-slider")
], De);
const bo = "comfort_band";
function Tc(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Cc(e, t) {
  return e.callService(bo, "set_schedule", { ...t });
}
function Mc(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), e.callService(bo, "start_override", n);
}
function Dc(e, t) {
  return e.callService(bo, "cancel_override", { ...t });
}
function zc(e, t) {
  return e.callService(bo, "set_profile", { ...t });
}
var Oc = Object.defineProperty, Nc = Object.getOwnPropertyDescriptor, pn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Nc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Oc(t, n, o), o;
};
const Hc = [1, 3, 6];
let hi = class extends Vt {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Mc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Dc(this.hass, { zone: this.zone });
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
    const n = parseFloat(t.state);
    return Number.isFinite(n) ? n : NaN;
  }
  render() {
    if (!this.hass || !this.entities) return at;
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), n = this._numericState(this.entities.effectiveLow), i = this._numericState(this.entities.effectiveHigh), o = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), l = this._stateOf(this.entities.currentAction)?.state ?? "unknown", h = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._pendingLow ?? (Number.isFinite(e) ? e : 19), p = this._pendingHigh ?? (Number.isFinite(t) ? t : 22), b = uo(l), g = b !== "idle" && b !== "unknown";
    return U`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${g ? U`<span class="action-chip" style="background:${co(b)}"
              >${ur(b)}</span
            >` : at}
      </div>
      <div class="gauge-row">
        <band-gauge .low=${n} .high=${i} .room=${o} .action=${l}></band-gauge>
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
    if (!e) return at;
    const t = this._stateOf(this.entities.overrideEnds)?.state, n = Lc(t ?? null);
    return U`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${n ? ` · ${n}` : ""}</span>
          <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        </div>
      </section>
    `;
  }
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? U`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Hc.map(
      (t) => U`
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
    ` : at;
  }
};
hi.styles = [
  ce,
  te`
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
pn([
  Y({ attribute: !1 })
], hi.prototype, "hass", 2);
pn([
  Y({ type: String })
], hi.prototype, "zone", 2);
pn([
  Y({ attribute: !1 })
], hi.prototype, "entities", 2);
pn([
  $t()
], hi.prototype, "_pendingLow", 2);
pn([
  $t()
], hi.prototype, "_pendingHigh", 2);
hi = pn([
  ae("comfort-band-now-tab")
], hi);
function Lc(e) {
  if (!e) return "";
  const t = Date.parse(e);
  if (Number.isNaN(t)) return "";
  const n = t - Date.now();
  if (n <= 0) return "";
  const i = Math.round(n / 6e4);
  if (i < 60) return `${i}m left`;
  const o = Math.floor(i / 60), s = i % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
const Pr = "comfort_band", Rc = {
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
function Fc() {
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
function Dl(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function zl(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Pr
  );
}
function Uc(e, t) {
  const n = Fc(), i = Dl(e, [Pr, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of zl(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Rc[s];
    l !== void 0 && (n[l] = o.entity_id);
  }
  return n;
}
function Ol(e) {
  const t = Dl(e, [Pr, "profile_manager"]);
  if (t === null) return null;
  for (const n of zl(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
var Ic = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, Nl = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Vc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Ic(t, n, o), o;
};
let ho = class extends Vt {
  _onSelect(e) {
    this.hass && zc(this.hass, { profile: e });
  }
  render() {
    if (!this.hass) return at;
    const e = Ol(this.hass);
    if (e === null)
      return U`<div class="empty">Profile manager not registered yet.</div>`;
    const t = this.hass.states[e], n = t?.attributes.options, i = Array.isArray(n) ? n.filter((s) => typeof s == "string") : [], o = t?.state ?? "";
    return i.length === 0 ? U`<div class="empty">No profiles configured.</div>` : U`
      <ul role="listbox" aria-label="Profiles">
        ${i.map(
      (s) => U`
            <li
              role="option"
              tabindex="0"
              class=${s === o ? "active" : ""}
              aria-selected=${s === o}
              @click=${() => this._onSelect(s)}
              @keydown=${(l) => {
        (l.key === "Enter" || l.key === " ") && (l.preventDefault(), this._onSelect(s));
      }}
            >
              <span class="name">${s}</span>
              ${s === o ? U`<span class="badge">Active</span>` : at}
            </li>
          `
    )}
      </ul>
      <div class="footer">Create / rename / delete profiles in a future release.</div>
    `;
  }
};
ho.styles = [
  ce,
  te`
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
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--cb-gap-sm);
      }
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
      .name {
        font-weight: 500;
        text-transform: capitalize;
      }
      .badge {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.85;
      }
      .footer {
        margin-top: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
      }
    `
];
Nl([
  Y({ attribute: !1 })
], ho.prototype, "hass", 2);
ho = Nl([
  ae("comfort-band-profiles-tab")
], ho);
const Bc = !0, zt = "u-", jc = "uplot", Wc = zt + "hz", Yc = zt + "vt", Gc = zt + "title", Kc = zt + "wrap", qc = zt + "under", Zc = zt + "over", Jc = zt + "axis", Ti = zt + "off", Qc = zt + "select", Xc = zt + "cursor-x", tu = zt + "cursor-y", eu = zt + "cursor-pt", iu = zt + "legend", nu = zt + "live", ou = zt + "inline", ru = zt + "series", su = zt + "marker", Ds = zt + "label", lu = zt + "value", Cn = "width", Mn = "height", Pn = "top", zs = "bottom", en = "left", Xo = "right", Tr = "#000", Os = Tr + "0", tr = "mousemove", Ns = "mousedown", er = "mouseup", Hs = "mouseenter", Ls = "mouseleave", Rs = "dblclick", au = "resize", cu = "scroll", Fs = "change", fo = "dppxchange", Cr = "--", gn = typeof window < "u", fr = gn ? document : null, sn = gn ? window : null, uu = gn ? navigator : null;
let lt, eo;
function dr() {
  let e = devicePixelRatio;
  lt != e && (lt = e, eo && gr(Fs, eo, dr), eo = matchMedia(`(min-resolution: ${lt - 1e-3}dppx) and (max-resolution: ${lt + 1e-3}dppx)`), Mi(Fs, eo, dr), sn.dispatchEvent(new CustomEvent(fo)));
}
function se(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function pr(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function vt(e, t, n) {
  e.style[t] = n + "px";
}
function Pe(e, t, n, i) {
  let o = fr.createElement(e);
  return t != null && se(o, t), n?.insertBefore(o, i), o;
}
function be(e, t) {
  return Pe("div", e, t);
}
const Us = /* @__PURE__ */ new WeakMap();
function Ue(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", l = Us.get(e);
  s != l && (e.style.transform = s, Us.set(e, s), t < 0 || n < 0 || t > i || n > o ? se(e, Ti) : pr(e, Ti));
}
const Is = /* @__PURE__ */ new WeakMap();
function Vs(e, t, n) {
  let i = t + n, o = Is.get(e);
  i != o && (Is.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const Bs = /* @__PURE__ */ new WeakMap();
function js(e, t, n, i) {
  let o = t + "" + n, s = Bs.get(e);
  o != s && (Bs.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const Mr = { passive: !0 }, hu = { ...Mr, capture: !0 };
function Mi(e, t, n, i) {
  t.addEventListener(e, n, i ? hu : Mr);
}
function gr(e, t, n, i) {
  t.removeEventListener(e, n, Mr);
}
gn && dr();
function Ce(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : le((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function Hl(e) {
  return (n, i, o) => {
    let s = -1, l = -1;
    for (let h = i; h <= o; h++)
      if (e(n[h])) {
        s = h;
        break;
      }
    for (let h = o; h >= i; h--)
      if (e(n[h])) {
        l = h;
        break;
      }
    return [s, l];
  };
}
const Ll = (e) => e != null, Rl = (e) => e != null && e > 0, vo = Hl(Ll), fu = Hl(Rl);
function du(e, t, n, i = 0, o = !1) {
  let s = o ? fu : vo, l = o ? Rl : Ll;
  [t, n] = s(e, t, n);
  let h = e[t], f = e[t];
  if (t > -1)
    if (i == 1)
      h = e[t], f = e[n];
    else if (i == -1)
      h = e[n], f = e[t];
    else
      for (let p = t; p <= n; p++) {
        let b = e[p];
        l(b) && (b < h ? h = b : b > f && (f = b));
      }
  return [h ?? dt, f ?? -dt];
}
function wo(e, t, n, i) {
  let o = Gs(e), s = Gs(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let l = n == 10 ? Xe : Fl, h = o == 1 ? le : ve, f = s == 1 ? ve : le, p = h(l(Dt(e))), b = f(l(Dt(t))), g = cn(n, p), _ = cn(n, b);
  return n == 10 && (p < 0 && (g = pt(g, -p)), b < 0 && (_ = pt(_, -b))), i || n == 2 ? (e = g * o, t = _ * s) : (e = Bl(e, g), t = yo(t, _)), [e, t];
}
function Dr(e, t, n, i) {
  let o = wo(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const zr = 0.1, Ws = {
  mode: 3,
  pad: zr
}, On = {
  pad: 0,
  soft: null,
  mode: 0
}, pu = {
  min: On,
  max: On
};
function po(e, t, n, i) {
  return xo(n) ? Ys(e, t, n) : (On.pad = n, On.soft = i ? 0 : null, On.mode = i ? 3 : 0, Ys(e, t, pu));
}
function rt(e, t) {
  return e ?? t;
}
function gu(e, t, n) {
  for (t = rt(t, 0), n = rt(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Ys(e, t, n) {
  let i = n.min, o = n.max, s = rt(i.pad, 0), l = rt(o.pad, 0), h = rt(i.hard, -dt), f = rt(o.hard, dt), p = rt(i.soft, dt), b = rt(o.soft, -dt), g = rt(i.mode, 0), _ = rt(o.mode, 0), A = t - e, E = Xe(A), N = Zt(Dt(e), Dt(t)), F = Xe(N), V = Dt(F - E);
  (A < 1e-24 || V > 10) && (A = 0, (e == 0 || t == 0) && (A = 1e-24, g == 2 && p != dt && (s = 0), _ == 2 && b != -dt && (l = 0)));
  let y = A || N || 1e3, R = Xe(y), $ = cn(10, le(R)), Z = y * (A == 0 ? e == 0 ? 0.1 : 1 : s), M = pt(Bl(e - Z, $ / 10), 24), J = e >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : dt, G = Zt(h, M < J && e >= J ? J : Me(J, M)), tt = y * (A == 0 ? t == 0 ? 0.1 : 1 : l), W = pt(yo(t + tt, $ / 10), 24), S = t <= b && (_ == 1 || _ == 3 && W >= b || _ == 2 && W <= b) ? b : -dt, q = Me(f, W > S && t <= S ? S : Zt(S, W));
  return G == q && G == 0 && (q = 100), [G, q];
}
const mu = new Intl.NumberFormat(gn ? uu.language : "en-US"), Or = (e) => mu.format(e), ue = Math, so = ue.PI, Dt = ue.abs, le = ue.floor, Mt = ue.round, ve = ue.ceil, Me = ue.min, Zt = ue.max, cn = ue.pow, Gs = ue.sign, Xe = ue.log10, Fl = ue.log2, _u = (e, t = 1) => ue.sinh(e) * t, ir = (e, t = 1) => ue.asinh(e / t), dt = 1 / 0;
function Ks(e) {
  return (Xe((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function mr(e, t, n) {
  return Me(Zt(e, t), n);
}
function Ul(e) {
  return typeof e == "function";
}
function et(e) {
  return Ul(e) ? e : () => e;
}
const bu = () => {
}, Il = (e) => e, Vl = (e, t) => t, vu = (e) => null, qs = (e) => !0, Zs = (e, t) => e == t, wu = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (e) => {
  if (Wl(e) || fi.has(e))
    return e;
  const t = `${e}`, n = t.match(wu);
  if (n == null)
    return e;
  let i = n[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Oi(o)}e${s}`;
  }
  return pt(e, i);
};
function Ei(e, t) {
  return Oi(pt(Oi(e / t)) * t);
}
function yo(e, t) {
  return Oi(ve(Oi(e / t)) * t);
}
function Bl(e, t) {
  return Oi(le(Oi(e / t)) * t);
}
function pt(e, t = 0) {
  if (Wl(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Mt(i) / n;
}
const fi = /* @__PURE__ */ new Map();
function jl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Fn(e, t, n, i) {
  let o = [], s = i.map(jl);
  for (let l = t; l < n; l++) {
    let h = Dt(l), f = pt(cn(e, l), h);
    for (let p = 0; p < i.length; p++) {
      let b = e == 10 ? +`${i[p]}e${l}` : i[p] * f, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : pt(b, g);
      o.push(_), fi.set(_, g);
    }
  }
  return o;
}
const Nn = {}, Nr = [], un = [null, null], ai = Array.isArray, Wl = Number.isInteger, yu = (e) => e === void 0;
function Js(e) {
  return typeof e == "string";
}
function xo(e) {
  let t = !1;
  if (e != null) {
    let n = e.constructor;
    t = n == null || n == Object;
  }
  return t;
}
function xu(e) {
  return e != null && typeof e == "object";
}
const $u = Object.getPrototypeOf(Uint8Array), Yl = "__proto__";
function hn(e, t = xo) {
  let n;
  if (ai(e)) {
    let i = e.find((o) => o != null);
    if (ai(i) || t(i)) {
      n = Array(e.length);
      for (let o = 0; o < e.length; o++)
        n[o] = hn(e[o], t);
    } else
      n = e.slice();
  } else if (e instanceof $u)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != Yl && (n[i] = hn(e[i], t));
  } else
    n = e;
  return n;
}
function Pt(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != Yl && (xo(e[o]) ? Pt(e[o], hn(i[o])) : e[o] = hn(i[o]));
  }
  return e;
}
const Su = 0, Au = 1, ku = 2;
function Eu(e, t, n) {
  for (let i = 0, o, s = -1; i < t.length; i++) {
    let l = t[i];
    if (l > s) {
      for (o = l - 1; o >= 0 && e[o] == null; )
        e[o--] = null;
      for (o = l + 1; o < n && e[o] == null; )
        e[s = o++] = null;
    }
  }
}
function Pu(e, t) {
  if (Mu(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return Du(l[0]) || (l = Cu(l)), l;
  }
  let n = /* @__PURE__ */ new Set();
  for (let l = 0; l < e.length; l++) {
    let f = e[l][0], p = f.length;
    for (let b = 0; b < p; b++)
      n.add(f[b]);
  }
  let i = [Array.from(n).sort((l, h) => l - h)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < o; l++)
    s.set(i[0][l], l);
  for (let l = 0; l < e.length; l++) {
    let h = e[l], f = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], g = Array(o).fill(void 0), _ = t ? t[l][p] : Au, A = [];
      for (let E = 0; E < b.length; E++) {
        let N = b[E], F = s.get(f[E]);
        N === null ? _ != Su && (g[F] = N, _ == ku && A.push(F)) : g[F] = N;
      }
      Eu(g, A, o), i.push(g);
    }
  }
  return i;
}
const Tu = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Cu(e) {
  let t = e[0], n = t.length, i = Array(n);
  for (let s = 0; s < i.length; s++)
    i[s] = s;
  i.sort((s, l) => t[s] - t[l]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let l = e[s], h = Array(n);
    for (let f = 0; f < n; f++)
      h[f] = l[i[f]];
    o.push(h);
  }
  return o;
}
function Mu(e) {
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
function Du(e, t = 100) {
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
  const s = Zt(1, le((o - i + 1) / t));
  for (let l = e[i], h = i + s; h <= o; h += s) {
    const f = e[h];
    if (f != null) {
      if (f <= l)
        return !1;
      l = f;
    }
  }
  return !0;
}
const Gl = [
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
], Kl = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function ql(e) {
  return e.slice(0, 3);
}
const zu = Kl.map(ql), Ou = Gl.map(ql), Nu = {
  MMMM: Gl,
  MMM: Ou,
  WWWW: Kl,
  WWW: zu
};
function Tn(e) {
  return (e < 10 ? "0" : "") + e;
}
function Hu(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Lu = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Tn(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Tn(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Tn(e.getHours()),
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
  mm: (e) => Tn(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Tn(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => Hu(e.getMilliseconds())
};
function Hr(e, t) {
  t = t || Nu;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? Lu[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < n.length; h++)
      l += typeof n[h] == "string" ? n[h] : n[h](s, t);
    return l;
  };
}
const Ru = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Fu(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ru ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const Zl = (e) => e % 1 == 0, go = [1, 2, 2.5, 5], Uu = Fn(10, -32, 0, go), Jl = Fn(10, 0, 32, go), Iu = Jl.filter(Zl), Pi = Uu.concat(Jl), Lr = `
`, Ql = "{YYYY}", Qs = Lr + Ql, Xl = "{M}/{D}", Dn = Lr + Xl, io = Dn + "/{YY}", ta = "{aa}", Vu = "{h}:{mm}", rn = Vu + ta, Xs = Lr + rn, tl = ":{ss}", ut = null;
function ea(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, l = o * 365, f = (e == 1 ? Fn(10, 0, 3, go).filter(Zl) : Fn(10, -3, 0, go)).concat([
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
    [l, Ql, ut, ut, ut, ut, ut, ut, 1],
    [o * 28, "{MMM}", Qs, ut, ut, ut, ut, ut, 1],
    [o, Xl, Qs, ut, ut, ut, ut, ut, 1],
    [i, "{h}" + ta, io, ut, Dn, ut, ut, ut, 1],
    [n, rn, io, ut, Dn, ut, ut, ut, 1],
    [t, tl, io + " " + rn, ut, Dn + " " + rn, ut, Xs, ut, 1],
    [e, tl + ".{fff}", io + " " + rn, ut, Dn + " " + rn, ut, Xs, ut, 1]
  ];
  function b(g) {
    return (_, A, E, N, F, V) => {
      let y = [], R = F >= l, $ = F >= s && F < l, Z = g(E), M = pt(Z * e, 3), J = nr(Z.getFullYear(), R ? 0 : Z.getMonth(), $ || R ? 1 : Z.getDate()), G = pt(J * e, 3);
      if ($ || R) {
        let tt = $ ? F / s : 0, W = R ? F / l : 0, S = M == G ? M : pt(nr(J.getFullYear() + W, J.getMonth() + tt, 1) * e, 3), q = new Date(Mt(S / e)), D = q.getFullYear(), B = q.getMonth();
        for (let L = 0; S <= N; L++) {
          let it = nr(D + W * L, B + tt * L, 1), H = it - g(pt(it * e, 3));
          S = pt((+it + H) * e, 3), S <= N && y.push(S);
        }
      } else {
        let tt = F >= o ? o : F, W = le(E) - le(M), S = G + W + yo(M - G, tt);
        y.push(S);
        let q = g(S), D = q.getHours() + q.getMinutes() / n + q.getSeconds() / i, B = F / i, L = _.axes[A]._space, it = V / L;
        for (; S = pt(S + F, e == 1 ? 0 : 3), !(S > N); )
          if (B > 1) {
            let H = le(pt(D + B, 6)) % 24, nt = g(S).getHours() - H;
            nt > 1 && (nt = -1), S -= nt * i, D = (D + B) % 24;
            let ht = y[y.length - 1];
            pt((S - ht) / F, 3) * it >= 0.7 && y.push(S);
          } else
            y.push(S);
      }
      return y;
    };
  }
  return [
    f,
    p,
    b
  ];
}
const [Bu, ju, Wu] = ea(1), [Yu, Gu, Ku] = ea(1e-3);
Fn(2, -53, 53, [1]);
function el(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function il(e, t) {
  return (n, i, o, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], f, p, b, g, _, A;
    return i.map((E) => {
      let N = e(E), F = N.getFullYear(), V = N.getMonth(), y = N.getDate(), R = N.getHours(), $ = N.getMinutes(), Z = N.getSeconds(), M = F != f && h[2] || V != p && h[3] || y != b && h[4] || R != g && h[5] || $ != _ && h[6] || Z != A && h[7] || h[1];
      return f = F, p = V, b = y, g = R, _ = $, A = Z, M(N);
    });
  };
}
function qu(e, t) {
  let n = Hr(t);
  return (i, o, s, l, h) => o.map((f) => n(e(f)));
}
function nr(e, t, n) {
  return new Date(e, t, n);
}
function nl(e, t) {
  return t(e);
}
const Zu = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function ol(e, t) {
  return (n, i, o, s) => s == null ? Cr : t(e(i));
}
function Ju(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Qu(e, t) {
  return e.series[t].fill(e, t);
}
const Xu = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: bu,
  markers: {
    show: !0,
    width: 2,
    stroke: Ju,
    fill: Qu,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function th(e, t) {
  let n = e.cursor.points, i = be(), o = n.size(e, t);
  vt(i, Cn, o), vt(i, Mn, o);
  let s = o / -2;
  vt(i, "marginLeft", s), vt(i, "marginTop", s);
  let l = n.width(e, t, o);
  return l && vt(i, "borderWidth", l), i;
}
function eh(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function ih(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function nh(e, t) {
  return e.series[t].points.size;
}
const or = [0, 0];
function oh(e, t, n) {
  return or[0] = t, or[1] = n, or;
}
function no(e, t, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == t) && n(o);
  };
}
function rr(e, t, n, i = !0) {
  return (o) => {
    (!i || o.target == t) && n(o);
  };
}
const rh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: oh,
  points: {
    one: !1,
    show: th,
    size: nh,
    width: 0,
    stroke: ih,
    fill: eh
  },
  bind: {
    mousedown: no,
    mouseup: no,
    click: no,
    // legend clicks, not .u-over clicks
    dblclick: no,
    mousemove: rr,
    mouseleave: rr,
    mouseenter: rr
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
}, ia = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Rr = Pt({}, ia, {
  filter: Vl
}), na = Pt({}, Rr, {
  size: 10
}), oa = Pt({}, ia, {
  show: !1
}), Fr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', ra = "bold " + Fr, sa = 1.5, rl = {
  show: !0,
  scale: "x",
  stroke: Tr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ra,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Rr,
  ticks: na,
  border: oa,
  font: Fr,
  lineGap: sa,
  rotate: 0
}, sh = "Value", lh = "Time", sl = {
  show: !0,
  scale: "x",
  auto: !1,
  sorted: 1,
  //	label: "Time",
  //	value: v => stamp(new Date(v * 1e3)),
  // internal caches
  min: dt,
  max: -dt,
  idxs: []
};
function ah(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : Or(s));
}
function ch(e, t, n, i, o, s, l) {
  let h = [], f = fi.get(o) || 0;
  n = l ? n : pt(yo(n, o), f);
  for (let p = n; p <= i; p = pt(p + o, f))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function _r(e, t, n, i, o, s, l) {
  const h = [], f = e.scales[e.axes[t].scale].log, p = f == 10 ? Xe : Fl, b = le(p(n));
  o = cn(f, b), f == 10 && (o = Pi[Ce(o, Pi)]);
  let g = n, _ = o * f;
  f == 10 && (_ = Pi[Ce(_, Pi)]);
  do
    h.push(g), g = g + o, f == 10 && !fi.has(g) && (g = pt(g, fi.get(o))), g >= _ && (o = g, _ = o * f, f == 10 && (_ = Pi[Ce(_, Pi)]));
  while (g <= i);
  return h;
}
function uh(e, t, n, i, o, s, l) {
  let f = e.scales[e.axes[t].scale].asinh, p = i > f ? _r(e, t, Zt(f, n), i, o) : [f], b = i >= 0 && n <= 0 ? [0] : [];
  return (n < -f ? _r(e, t, Zt(f, -i), -n, o) : [f]).reverse().map((_) => -_).concat(b, p);
}
const la = /./, hh = /[12357]/, fh = /[125]/, ll = /1/, br = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function dh(e, t, n, i, o) {
  let s = e.axes[n], l = s.scale, h = e.scales[l], f = e.valToPos, p = s._space, b = f(10, l), g = f(9, l) - b >= p ? la : f(7, l) - b >= p ? hh : f(5, l) - b >= p ? fh : ll;
  if (g == ll) {
    let _ = Dt(f(1, l) - b);
    if (_ < p)
      return br(t.slice().reverse(), h.distr, g, ve(p / _)).reverse();
  }
  return br(t, h.distr, g, 1);
}
function ph(e, t, n, i, o) {
  let s = e.axes[n], l = s.scale, h = s._space, f = e.valToPos, p = Dt(f(1, l) - f(2, l));
  return p < h ? br(t.slice().reverse(), 3, la, ve(h / p)).reverse() : t;
}
function gh(e, t, n, i) {
  return i == null ? Cr : t == null ? "" : Or(t);
}
const al = {
  show: !0,
  scale: "y",
  stroke: Tr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ra,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Rr,
  ticks: na,
  border: oa,
  font: Fr,
  lineGap: sa,
  rotate: 0
};
function mh(e, t) {
  let n = 3 + (e || 1) * 2;
  return pt(n * t, 3);
}
function _h(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), l = e.valToPos(o[i[1]], n, !0), h = Dt(l - s), f = e.series[t], p = h / (f.points.space * lt);
  return i[1] - i[0] <= p;
}
const cl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: dt,
  max: -dt
}, aa = (e, t, n, i, o) => o, ul = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: aa,
  alpha: 1,
  facets: [
    Pt({}, cl, { scale: "x" }),
    Pt({}, cl, { scale: "y" })
  ]
}, hl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: aa,
  alpha: 1,
  points: {
    show: _h,
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
  min: dt,
  max: -dt,
  idxs: [],
  path: null,
  clip: null
};
function bh(e, t, n, i, o) {
  return n / 10;
}
const ca = {
  time: Bc,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, vh = Pt({}, ca, {
  time: !1,
  ori: 1
}), fl = {};
function ua(e, t) {
  let n = fl[e];
  return n || (n = {
    key: e,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, l, h, f, p) {
      for (let b = 0; b < n.plots.length; b++)
        n.plots[b] != o && n.plots[b].pub(i, o, s, l, h, f, p);
    }
  }, e != null && (fl[e] = n)), n;
}
const fn = 1, vr = 2;
function Ni(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let f = s[0], p = i == 2 ? s[1] : s[t], b = i == 2 ? l[o.facets[0].scale] : l[e.series[0].scale], g = i == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, A = h.top, E = h.width, N = h.height, F = e.valToPosH, V = e.valToPosV;
  return b.ori == 0 ? n(
    o,
    f,
    p,
    b,
    g,
    F,
    V,
    _,
    A,
    E,
    N,
    So,
    mn,
    ko,
    fa,
    pa
  ) : n(
    o,
    f,
    p,
    b,
    g,
    V,
    F,
    A,
    _,
    N,
    E,
    Ao,
    _n,
    Vr,
    da,
    ga
  );
}
function Ur(e, t) {
  let n = 0, i = 0, o = rt(e.bands, Nr);
  for (let s = 0; s < o.length; s++) {
    let l = o[s];
    l.series[0] == t ? n = l.dir : l.series[1] == t && (l.dir == 1 ? i |= 1 : i |= 2);
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
function wh(e, t, n, i, o) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, f = e.scales[h];
  return o == -1 ? f.min : o == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ti(e, t, n, i, o, s) {
  return Ni(e, t, (l, h, f, p, b, g, _, A, E, N, F) => {
    let V = l.pxRound;
    const y = p.dir * (p.ori == 0 ? 1 : -1), R = p.ori == 0 ? mn : _n;
    let $, Z;
    y == 1 ? ($ = n, Z = i) : ($ = i, Z = n);
    let M = V(g(h[$], p, N, A)), J = V(_(f[$], b, F, E)), G = V(g(h[Z], p, N, A)), tt = V(_(s == 1 ? b.max : b.min, b, F, E)), W = new Path2D(o);
    return R(W, G, tt), R(W, M, tt), R(W, M, J), W;
  });
}
function $o(e, t, n, i, o, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? ko : Vr;
    let f = n;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
      if (_[1] > _[0]) {
        let A = _[0] - f;
        A > 0 && h(l, f, i, A, i + s), f = _[1];
      }
    }
    let p = n + o - f, b = 10;
    p > 0 && h(l, f, i - b / 2, p, i + s + b);
  }
  return l;
}
function yh(e, t, n) {
  let i = e[e.length - 1];
  i && i[0] == t ? i[1] = n : e.push([t, n]);
}
function Ir(e, t, n, i, o, s, l) {
  let h = [], f = e.length;
  for (let p = o == 1 ? n : i; p >= n && p <= i; p += o)
    if (t[p] === null) {
      let g = p, _ = p;
      if (o == 1)
        for (; ++p <= i && t[p] === null; )
          _ = p;
      else
        for (; --p >= n && t[p] === null; )
          _ = p;
      let A = s(e[g]), E = _ == g ? A : s(e[_]), N = g - o;
      A = l <= 0 && N >= 0 && N < f ? s(e[N]) : A;
      let V = _ + o;
      E = l >= 0 && V >= 0 && V < f ? s(e[V]) : E, E >= A && h.push([A, E]);
    }
  return h;
}
function dl(e) {
  return e == 0 ? Il : e == 1 ? Mt : (t) => Ei(t, e);
}
function ha(e) {
  let t = e == 0 ? So : Ao, n = e == 0 ? (o, s, l, h, f, p) => {
    o.arcTo(s, l, h, f, p);
  } : (o, s, l, h, f, p) => {
    o.arcTo(l, s, f, h, p);
  }, i = e == 0 ? (o, s, l, h, f) => {
    o.rect(s, l, h, f);
  } : (o, s, l, h, f) => {
    o.rect(l, s, f, h);
  };
  return (o, s, l, h, f, p = 0, b = 0) => {
    p == 0 && b == 0 ? i(o, s, l, h, f) : (p = Me(p, h / 2, f / 2), b = Me(b, h / 2, f / 2), t(o, s + p, l), n(o, s + h, l, s + h, l + f, p), n(o, s + h, l + f, s, l + f, b), n(o, s, l + f, s, l, b), n(o, s, l, s + h, l, p), o.closePath());
  };
}
const So = (e, t, n) => {
  e.moveTo(t, n);
}, Ao = (e, t, n) => {
  e.moveTo(n, t);
}, mn = (e, t, n) => {
  e.lineTo(t, n);
}, _n = (e, t, n) => {
  e.lineTo(n, t);
}, ko = ha(0), Vr = ha(1), fa = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, da = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, pa = (e, t, n, i, o, s, l) => {
  e.bezierCurveTo(t, n, i, o, s, l);
}, ga = (e, t, n, i, o, s, l) => {
  e.bezierCurveTo(n, t, o, i, l, s);
};
function ma(e) {
  return (t, n, i, o, s) => Ni(t, n, (l, h, f, p, b, g, _, A, E, N, F) => {
    let { pxRound: V, points: y } = l, R, $;
    p.ori == 0 ? (R = So, $ = fa) : (R = Ao, $ = da);
    const Z = pt(y.width * lt, 3);
    let M = (y.size - y.width) / 2 * lt, J = pt(M * 2, 3), G = new Path2D(), tt = new Path2D(), { left: W, top: S, width: q, height: D } = t.bbox;
    ko(
      tt,
      W - J,
      S - J,
      q + J * 2,
      D + J * 2
    );
    const B = (L) => {
      if (f[L] != null) {
        let it = V(g(h[L], p, N, A)), H = V(_(f[L], b, F, E));
        R(G, it + M, H), $(G, it, H, M, 0, so * 2);
      }
    };
    if (s)
      s.forEach(B);
    else
      for (let L = i; L <= o; L++)
        B(L);
    return {
      stroke: Z > 0 ? G : null,
      fill: G,
      clip: tt,
      flags: fn | vr
    };
  });
}
function _a(e) {
  return (t, n, i, o, s, l) => {
    i != o && (s != i && l != i && e(t, n, i), s != o && l != o && e(t, n, o), e(t, n, l));
  };
}
const xh = _a(mn), $h = _a(_n);
function ba(e) {
  const t = rt(e?.alignGaps, 0);
  return (n, i, o, s) => Ni(n, i, (l, h, f, p, b, g, _, A, E, N, F) => {
    [o, s] = vo(f, o, s);
    let V = l.pxRound, y = (D) => V(g(D, p, N, A)), R = (D) => V(_(D, b, F, E)), $, Z;
    p.ori == 0 ? ($ = mn, Z = xh) : ($ = _n, Z = $h);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, G = J.stroke;
    let tt = !1;
    if (s - o >= N * 4) {
      let D = (z) => n.posToVal(z, p.key, !0), B = null, L = null, it, H, Jt, wt = y(h[M == 1 ? o : s]), nt = y(h[o]), ht = y(h[s]), Q = D(M == 1 ? nt + 1 : ht - 1);
      for (let z = M == 1 ? o : s; z >= o && z <= s; z += M) {
        let Tt = h[z], yt = (M == 1 ? Tt < Q : Tt > Q) ? wt : y(Tt), ct = f[z];
        yt == wt ? ct != null ? (H = ct, B == null ? ($(G, yt, R(H)), it = B = L = H) : H < B ? B = H : H > L && (L = H)) : ct === null && (tt = !0) : (B != null && Z(G, wt, R(B), R(L), R(it), R(H)), ct != null ? (H = ct, $(G, yt, R(H)), B = L = it = H) : (B = L = null, ct === null && (tt = !0)), wt = yt, Q = D(wt + M));
      }
      B != null && B != L && Jt != wt && Z(G, wt, R(B), R(L), R(it), R(H));
    } else
      for (let D = M == 1 ? o : s; D >= o && D <= s; D += M) {
        let B = f[D];
        B === null ? tt = !0 : B != null && $(G, y(h[D]), R(B));
      }
    let [S, q] = Ur(n, i);
    if (l.fill != null || S != 0) {
      let D = J.fill = new Path2D(G), B = l.fillTo(n, i, l.min, l.max, S), L = R(B), it = y(h[o]), H = y(h[s]);
      M == -1 && ([H, it] = [it, H]), $(D, H, L), $(D, it, L);
    }
    if (!l.spanGaps) {
      let D = [];
      tt && D.push(...Ir(h, f, o, s, M, y, t)), J.gaps = D = l.gaps(n, i, o, s, D), J.clip = $o(D, p.ori, A, E, N, F);
    }
    return q != 0 && (J.band = q == 2 ? [
      ti(n, i, o, s, G, -1),
      ti(n, i, o, s, G, 1)
    ] : ti(n, i, o, s, G, q)), J;
  });
}
function Sh(e) {
  const t = rt(e.align, 1), n = rt(e.ascDesc, !1), i = rt(e.alignGaps, 0), o = rt(e.extend, !1);
  return (s, l, h, f) => Ni(s, l, (p, b, g, _, A, E, N, F, V, y, R) => {
    [h, f] = vo(g, h, f);
    let $ = p.pxRound, { left: Z, width: M } = s.bbox, J = (nt) => $(E(nt, _, y, F)), G = (nt) => $(N(nt, A, R, V)), tt = _.ori == 0 ? mn : _n;
    const W = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, S = W.stroke, q = _.dir * (_.ori == 0 ? 1 : -1);
    let D = G(g[q == 1 ? h : f]), B = J(b[q == 1 ? h : f]), L = B, it = B;
    o && t == -1 && (it = Z, tt(S, it, D)), tt(S, B, D);
    for (let nt = q == 1 ? h : f; nt >= h && nt <= f; nt += q) {
      let ht = g[nt];
      if (ht == null)
        continue;
      let Q = J(b[nt]), z = G(ht);
      t == 1 ? tt(S, Q, D) : tt(S, L, z), tt(S, Q, z), D = z, L = Q;
    }
    let H = L;
    o && t == 1 && (H = Z + M, tt(S, H, D));
    let [Jt, wt] = Ur(s, l);
    if (p.fill != null || Jt != 0) {
      let nt = W.fill = new Path2D(S), ht = p.fillTo(s, l, p.min, p.max, Jt), Q = G(ht);
      tt(nt, H, Q), tt(nt, it, Q);
    }
    if (!p.spanGaps) {
      let nt = [];
      nt.push(...Ir(b, g, h, f, q, J, i));
      let ht = p.width * lt / 2, Q = n || t == 1 ? ht : -ht, z = n || t == -1 ? -ht : ht;
      nt.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += z;
      }), W.gaps = nt = p.gaps(s, l, h, f, nt), W.clip = $o(nt, _.ori, F, V, y, R);
    }
    return wt != 0 && (W.band = wt == 2 ? [
      ti(s, l, h, f, S, -1),
      ti(s, l, h, f, S, 1)
    ] : ti(s, l, h, f, S, wt)), W;
  });
}
function pl(e, t, n, i, o, s, l = dt) {
  if (e.length > 1) {
    let h = null;
    for (let f = 0, p = 1 / 0; f < e.length; f++)
      if (t[f] !== void 0) {
        if (h != null) {
          let b = Dt(e[f] - e[h]);
          b < p && (p = b, l = Dt(n(e[f], i, o, s) - n(e[h], i, o, s)));
        }
        h = f;
      }
  }
  return l;
}
function Ah(e) {
  e = e || Nn;
  const t = rt(e.size, [0.6, dt, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = et(o), l = 1 - t[0], h = rt(t[1], dt), f = rt(t[2], 1), p = rt(e.disp, Nn), b = rt(e.each, (A) => {
  }), { fill: g, stroke: _ } = p;
  return (A, E, N, F) => Ni(A, E, (V, y, R, $, Z, M, J, G, tt, W, S) => {
    let q = V.pxRound, D = n, B = i * lt, L = h * lt, it = f * lt, H, Jt;
    $.ori == 0 ? [H, Jt] = s(A, E) : [Jt, H] = s(A, E);
    const wt = $.dir * ($.ori == 0 ? 1 : -1);
    let nt = $.ori == 0 ? ko : Vr, ht = $.ori == 0 ? b : (T, gt, Ct, Fi, bi, Oe, vi) => {
      b(T, gt, Ct, bi, Fi, vi, Oe);
    }, Q = rt(A.bands, Nr).find((T) => T.series[0] == E), z = Q != null ? Q.dir : 0, Tt = V.fillTo(A, E, V.min, V.max, z), Wt = q(J(Tt, Z, S, tt)), yt, ct, $e, ee = W, St = q(V.width * lt), ze = !1, Ke = null, he = null, ii = null, Hi = null;
    g != null && (St == 0 || _ != null) && (ze = !0, Ke = g.values(A, E, N, F), he = /* @__PURE__ */ new Map(), new Set(Ke).forEach((T) => {
      T != null && he.set(T, new Path2D());
    }), St > 0 && (ii = _.values(A, E, N, F), Hi = /* @__PURE__ */ new Map(), new Set(ii).forEach((T) => {
      T != null && Hi.set(T, new Path2D());
    })));
    let { x0: Li, size: vn } = p;
    if (Li != null && vn != null) {
      D = 1, y = Li.values(A, E, N, F), Li.unit == 2 && (y = y.map((Ct) => A.posToVal(G + Ct * W, $.key, !0)));
      let T = vn.values(A, E, N, F);
      vn.unit == 2 ? ct = T[0] * W : ct = M(T[0], $, W, G) - M(0, $, W, G), ee = pl(y, R, M, $, W, G, ee), $e = ee - ct + B;
    } else
      ee = pl(y, R, M, $, W, G, ee), $e = ee * l + B, ct = ee - $e;
    $e < 1 && ($e = 0), St >= ct / 2 && (St = 0), $e < 5 && (q = Il);
    let Wn = $e > 0, mi = ee - $e - (Wn ? St : 0);
    ct = q(mr(mi, it, L)), yt = (D == 0 ? ct / 2 : D == wt ? 0 : ct) - D * wt * ((D == 0 ? B / 2 : 0) + (Wn ? St / 2 : 0));
    const Yt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ri = ze ? null : new Path2D();
    let qe = null;
    if (Q != null)
      qe = A.data[Q.series[1]];
    else {
      let { y0: T, y1: gt } = p;
      T != null && gt != null && (R = gt.values(A, E, N, F), qe = T.values(A, E, N, F));
    }
    let _i = H * ct, K = Jt * ct;
    for (let T = wt == 1 ? N : F; T >= N && T <= F; T += wt) {
      let gt = R[T];
      if (gt == null)
        continue;
      if (qe != null) {
        let Qt = qe[T] ?? 0;
        if (gt - Qt == 0)
          continue;
        Wt = J(Qt, Z, S, tt);
      }
      let Ct = $.distr != 2 || p != null ? y[T] : T, Fi = M(Ct, $, W, G), bi = J(rt(gt, Tt), Z, S, tt), Oe = q(Fi - yt), vi = q(Zt(bi, Wt)), ie = q(Me(bi, Wt)), fe = vi - ie;
      if (gt != null) {
        let Qt = gt < 0 ? K : _i, Se = gt < 0 ? _i : K;
        ze ? (St > 0 && ii[T] != null && nt(Hi.get(ii[T]), Oe, ie + le(St / 2), ct, Zt(0, fe - St), Qt, Se), Ke[T] != null && nt(he.get(Ke[T]), Oe, ie + le(St / 2), ct, Zt(0, fe - St), Qt, Se)) : nt(Ri, Oe, ie + le(St / 2), ct, Zt(0, fe - St), Qt, Se), ht(
          A,
          E,
          T,
          Oe - St / 2,
          ie,
          ct + St,
          fe
        );
      }
    }
    return St > 0 ? Yt.stroke = ze ? Hi : Ri : ze || (Yt._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Yt.width = 0), Yt.fill = ze ? he : Ri, Yt;
  });
}
function kh(e, t) {
  const n = rt(t?.alignGaps, 0);
  return (i, o, s, l) => Ni(i, o, (h, f, p, b, g, _, A, E, N, F, V) => {
    [s, l] = vo(p, s, l);
    let y = h.pxRound, R = (H) => y(_(H, b, F, E)), $ = (H) => y(A(H, g, V, N)), Z, M, J;
    b.ori == 0 ? (Z = So, J = mn, M = pa) : (Z = Ao, J = _n, M = ga);
    const G = b.dir * (b.ori == 0 ? 1 : -1);
    let tt = R(f[G == 1 ? s : l]), W = tt, S = [], q = [];
    for (let H = G == 1 ? s : l; H >= s && H <= l; H += G)
      if (p[H] != null) {
        let wt = f[H], nt = R(wt);
        S.push(W = nt), q.push($(p[H]));
      }
    const D = { stroke: e(S, q, Z, J, M, y), fill: null, clip: null, band: null, gaps: null, flags: fn }, B = D.stroke;
    let [L, it] = Ur(i, o);
    if (h.fill != null || L != 0) {
      let H = D.fill = new Path2D(B), Jt = h.fillTo(i, o, h.min, h.max, L), wt = $(Jt);
      J(H, W, wt), J(H, tt, wt);
    }
    if (!h.spanGaps) {
      let H = [];
      H.push(...Ir(f, p, s, l, G, R, n)), D.gaps = H = h.gaps(i, o, s, l, H), D.clip = $o(H, b.ori, E, N, F, V);
    }
    return it != 0 && (D.band = it == 2 ? [
      ti(i, o, s, l, B, -1),
      ti(i, o, s, l, B, 1)
    ] : ti(i, o, s, l, B, it)), D;
  });
}
function Eh(e) {
  return kh(Ph, e);
}
function Ph(e, t, n, i, o, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (n(h, e[0], t[0]), l == 2)
    i(h, e[1], t[1]);
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
const wr = /* @__PURE__ */ new Set();
function gl() {
  for (let e of wr)
    e.syncRect(!0);
}
gn && (Mi(au, sn, gl), Mi(cu, sn, gl, !0), Mi(fo, sn, () => {
  jt.pxRatio = lt;
}));
const Th = ba(), Ch = ma();
function ml(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => yr(s, l, t, n));
}
function Mh(e, t) {
  return e.map((n, i) => i == 0 ? {} : Pt({}, t, n));
}
function yr(e, t, n, i) {
  return Pt({}, t == 0 ? n : i, e);
}
function va(e, t, n) {
  return t == null ? un : [t, n];
}
const Dh = va;
function zh(e, t, n) {
  return t == null ? un : po(t, n, zr, !0);
}
function wa(e, t, n, i) {
  return t == null ? un : wo(t, n, e.scales[i].log, !1);
}
const Oh = wa;
function ya(e, t, n, i) {
  return t == null ? un : Dr(t, n, e.scales[i].log, !1);
}
const Nh = ya;
function Hh(e, t, n, i, o) {
  let s = Zt(Ks(e), Ks(t)), l = t - e, h = Ce(o / i * l, n);
  do {
    let f = n[h], p = i * f / l;
    if (p >= o && s + (f < 5 ? fi.get(f) : 0) <= 17)
      return [f, p];
  } while (++h < n.length);
  return [0, 0];
}
function _l(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Mt((n = +o) * lt)) + "px"), [e, t, n];
}
function Lh(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let n = pt(t[2] * lt, 1);
    t[0] = t[0].replace(/[0-9.]+px/, n + "px"), t[1] = n;
  });
}
function jt(e, t, n) {
  const i = {
    mode: rt(e.mode, 1)
  }, o = i.mode;
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
  i.valToPosH = s, i.valToPosV = l;
  let f = !1;
  i.status = 0;
  const p = i.root = be(jc);
  if (e.id != null && (p.id = e.id), se(p, e.class), e.title) {
    let r = be(Gc, p);
    r.textContent = e.title;
  }
  const b = Pe("canvas"), g = i.ctx = b.getContext("2d"), _ = be(Kc, p);
  Mi("click", _, (r) => {
    r.target === E && (mt != Zi || xt != Ji) && It.click(i, r);
  }, !0);
  const A = i.under = be(qc, _);
  _.appendChild(b);
  const E = i.over = be(Zc, _);
  e = hn(e);
  const N = +rt(e.pxAlign, 1), F = dl(N);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(i, e) || e);
  });
  const V = e.ms || 1e-3, y = i.series = o == 1 ? ml(e.series || [], sl, hl, !1) : Mh(e.series || [null], ul), R = i.axes = ml(e.axes || [], rl, al, !0), $ = i.scales = {}, Z = i.bands = e.bands || [];
  Z.forEach((r) => {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1);
  });
  const M = o == 2 ? y[1].facets[0].scale : y[0].scale, J = {
    axes: La,
    series: Da
  }, G = (e.drawOrder || ["axes", "series"]).map((r) => J[r]);
  function tt(r) {
    const a = r.distr == 3 ? (c) => Xe(c > 0 ? c : r.clamp(i, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => ir(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: d, _max: m } = r, v = m - d;
      return (u - d) / v;
    };
  }
  function W(r) {
    let a = $[r];
    if (a == null) {
      let c = (e.scales || Nn)[r] || Nn;
      if (c.from != null) {
        W(c.from);
        let u = Pt({}, $[c.from], c, { key: r });
        u.valToPct = tt(u), $[r] = u;
      } else {
        a = $[r] = Pt({}, r == M ? ca : vh, c), a.key = r;
        let u = a.time, d = a.range, m = ai(d);
        if ((r != M || o == 2 && !u) && (m && (d[0] == null || d[1] == null) && (d = {
          min: d[0] == null ? Ws : {
            mode: 1,
            hard: d[0],
            soft: d[0]
          },
          max: d[1] == null ? Ws : {
            mode: 1,
            hard: d[1],
            soft: d[1]
          }
        }, m = !1), !m && xo(d))) {
          let v = d;
          d = (w, x, k) => x == null ? un : po(x, k, v);
        }
        a.range = et(d || (u ? Dh : r == M ? a.distr == 3 ? Oh : a.distr == 4 ? Nh : va : a.distr == 3 ? wa : a.distr == 4 ? ya : zh)), a.auto = et(m ? !1 : a.auto), a.clamp = et(a.clamp || bh), a._min = a._max = null, a.valToPct = tt(a);
      }
    }
  }
  W("x"), W("y"), o == 1 && y.forEach((r) => {
    W(r.scale);
  }), R.forEach((r) => {
    W(r.scale);
  });
  for (let r in e.scales)
    W(r);
  const S = $[M], q = S.distr;
  let D, B;
  S.ori == 0 ? (se(p, Wc), D = s, B = l) : (se(p, Yc), D = l, B = s);
  const L = {};
  for (let r in $) {
    let a = $[r];
    (a.min != null || a.max != null) && (L[r] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const it = e.tzDate || ((r) => new Date(Mt(r / V))), H = e.fmtDate || Hr, Jt = V == 1 ? Wu(it) : Ku(it), wt = il(it, el(V == 1 ? ju : Gu, H)), nt = ol(it, nl(Zu, H)), ht = [], Q = i.legend = Pt({}, Xu, e.legend), z = i.cursor = Pt({}, rh, { drag: { y: o == 2 } }, e.cursor), Tt = Q.show, Wt = z.show, yt = Q.markers;
  Q.idxs = ht, yt.width = et(yt.width), yt.dash = et(yt.dash), yt.stroke = et(yt.stroke), yt.fill = et(yt.fill);
  let ct, $e, ee, St = [], ze = [], Ke, he = !1, ii = {};
  if (Q.live) {
    const r = y[1] ? y[1].values : null;
    he = r != null, Ke = he ? r(i, 1, 0) : { _: 0 };
    for (let a in Ke)
      ii[a] = Cr;
  }
  if (Tt)
    if (ct = Pe("table", iu, p), ee = Pe("tbody", null, ct), Q.mount(i, ct), he) {
      $e = Pe("thead", null, ct, ee);
      let r = Pe("tr", null, $e);
      Pe("th", null, r);
      for (var Hi in Ke)
        Pe("th", Ds, r).textContent = Hi;
    } else
      se(ct, ou), Q.live && se(ct, nu);
  const Li = { show: !0 }, vn = { show: !1 };
  function Wn(r, a) {
    if (a == 0 && (he || !Q.live || o == 2))
      return un;
    let c = [], u = Pe("tr", ru, ee, ee.childNodes[a]);
    se(u, r.class), r.show || se(u, Ti);
    let d = Pe("th", null, u);
    if (yt.show) {
      let w = be(su, d);
      if (a > 0) {
        let x = yt.width(i, a);
        x && (w.style.border = x + "px " + yt.dash(i, a) + " " + yt.stroke(i, a)), w.style.background = yt.fill(i, a);
      }
    }
    let m = be(Ds, d);
    r.label instanceof HTMLElement ? m.appendChild(r.label) : m.textContent = r.label, a > 0 && (yt.show || (m.style.color = r.width > 0 ? yt.stroke(i, a) : yt.fill(i, a)), Yt("click", d, (w) => {
      if (z._lock)
        return;
      yi(w);
      let x = y.indexOf(r);
      if ((w.ctrlKey || w.metaKey) != Q.isolate) {
        let k = y.some((P, C) => C > 0 && C != x && P.show);
        y.forEach((P, C) => {
          C > 0 && He(C, k ? C == x ? Li : vn : Li, !0, Et.setSeries);
        });
      } else
        He(x, { show: !r.show }, !0, Et.setSeries);
    }, !1), Ii && Yt(Hs, d, (w) => {
      z._lock || (yi(w), He(y.indexOf(r), Xi, !0, Et.setSeries));
    }, !1));
    for (var v in Ke) {
      let w = Pe("td", lu, u);
      w.textContent = "--", c.push(w);
    }
    return [u, c];
  }
  const mi = /* @__PURE__ */ new Map();
  function Yt(r, a, c, u = !0) {
    const d = mi.get(a) || {}, m = z.bind[r](i, a, c, u);
    m && (Mi(r, a, d[r] = m), mi.set(a, d));
  }
  function Ri(r, a, c) {
    const u = mi.get(a) || {};
    for (let d in u)
      (r == null || d == r) && (gr(d, a, u[d]), delete u[d]);
    r == null && mi.delete(a);
  }
  let qe = 0, _i = 0, K = 0, T = 0, gt = 0, Ct = 0, Fi = gt, bi = Ct, Oe = K, vi = T, ie = 0, fe = 0, Qt = 0, Se = 0;
  i.bbox = {};
  let Po = !1, Yn = !1, Ui = !1, wi = !1, Gn = !1, de = !1;
  function To(r, a, c) {
    (c || r != i.width || a != i.height) && Wr(r, a), Yi(!1), Ui = !0, Yn = !0, Gi();
  }
  function Wr(r, a) {
    i.width = qe = K = r, i.height = _i = T = a, gt = Ct = 0, Aa(), ka();
    let c = i.bbox;
    ie = c.left = Ei(gt * lt, 0.5), fe = c.top = Ei(Ct * lt, 0.5), Qt = c.width = Ei(K * lt, 0.5), Se = c.height = Ei(T * lt, 0.5);
  }
  const xa = 3;
  function $a() {
    let r = !1, a = 0;
    for (; !r; ) {
      a++;
      let c = Na(a), u = Ha(a);
      r = a == xa || c && u, r || (Wr(i.width, i.height), Yn = !0);
    }
  }
  function Sa({ width: r, height: a }) {
    To(r, a);
  }
  i.setSize = Sa;
  function Aa() {
    let r = !1, a = !1, c = !1, u = !1;
    R.forEach((d, m) => {
      if (d.show && d._show) {
        let { side: v, _size: w } = d, x = v % 2, k = d.label != null ? d.labelSize : 0, P = w + k;
        P > 0 && (x ? (K -= P, v == 3 ? (gt += P, u = !0) : c = !0) : (T -= P, v == 0 ? (Ct += P, r = !0) : a = !0));
      }
    }), xi[0] = r, xi[1] = c, xi[2] = a, xi[3] = u, K -= ni[1] + ni[3], gt += ni[3], T -= ni[2] + ni[0], Ct += ni[0];
  }
  function ka() {
    let r = gt + K, a = Ct + T, c = gt, u = Ct;
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
    R.forEach((m, v) => {
      if (m.show && m._show) {
        let w = m.side;
        m._pos = d(w, m._size), m.label != null && (m._lpos = d(w, m.labelSize));
      }
    });
  }
  if (z.dataIdx == null) {
    let r = z.hover, a = r.skip = new Set(r.skip ?? []);
    a.add(void 0);
    let c = r.prox = et(r.prox), u = r.bias ??= 0;
    z.dataIdx = (d, m, v, w) => {
      if (m == 0)
        return v;
      let x = v, k = c(d, m, v, w) ?? dt, P = k >= 0 && k < dt, C = S.ori == 0 ? K : T, j = z.left, st = t[0], ot = t[m];
      if (a.has(ot[v])) {
        x = null;
        let X = null, I = null, O;
        if (u == 0 || u == -1)
          for (O = v; X == null && O-- > 0; )
            a.has(ot[O]) || (X = O);
        if (u == 0 || u == 1)
          for (O = v; I == null && O++ < ot.length; )
            a.has(ot[O]) || (I = O);
        if (X != null || I != null)
          if (P) {
            let bt = X == null ? -1 / 0 : D(st[X], S, C, 0), At = I == null ? 1 / 0 : D(st[I], S, C, 0), Ft = j - bt, ft = At - j;
            Ft <= ft ? Ft <= k && (x = X) : ft <= k && (x = I);
          } else
            x = I == null ? X : X == null ? I : v - X <= I - v ? X : I;
      } else P && Dt(j - D(st[v], S, C, 0)) > k && (x = null);
      return x;
    };
  }
  const yi = (r) => {
    z.event = r;
  };
  z.idxs = ht, z._lock = !1;
  let Bt = z.points;
  Bt.show = et(Bt.show), Bt.size = et(Bt.size), Bt.stroke = et(Bt.stroke), Bt.width = et(Bt.width), Bt.fill = et(Bt.fill);
  const Ne = i.focus = Pt({}, e.focus || { alpha: 0.3 }, z.focus), Ii = Ne.prox >= 0, Vi = Ii && Bt.one;
  let pe = [], Bi = [], ji = [];
  function Yr(r, a) {
    let c = Bt.show(i, a);
    if (c instanceof HTMLElement)
      return se(c, eu), se(c, r.class), Ue(c, -10, -10, K, T), E.insertBefore(c, pe[a]), c;
  }
  function Gr(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? Js(u) ? ol(it, nl(u, H)) : u || nt : u || gh, r.label = r.label || (c ? lh : sh);
    }
    if (Vi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Th || vu, r.fillTo = et(r.fillTo || wh), r.pxAlign = +rt(r.pxAlign, N), r.pxRound = dl(r.pxAlign), r.stroke = et(r.stroke || null), r.fill = et(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = mh(Zt(1, r.width), 1), u = r.points = Pt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Ch,
        _stroke: null,
        _fill: null
      }, r.points);
      u.show = et(u.show), u.filter = et(u.filter), u.fill = et(u.fill), u.stroke = et(u.stroke), u.paths = et(u.paths), u.pxAlign = r.pxAlign;
    }
    if (Tt) {
      let c = Wn(r, a);
      St.splice(a, 0, c[0]), ze.splice(a, 0, c[1]), Q.values.push(null);
    }
    if (Wt) {
      ht.splice(a, 0, null);
      let c = null;
      Vi ? a == 0 && (c = Yr(r, a)) : a > 0 && (c = Yr(r, a)), pe.splice(a, 0, c), Bi.splice(a, 0, 0), ji.splice(a, 0, 0);
    }
    Rt("addSeries", a);
  }
  function Ea(r, a) {
    a = a ?? y.length, r = o == 1 ? yr(r, a, sl, hl) : yr(r, a, {}, ul), y.splice(a, 0, r), Gr(y[a], a);
  }
  i.addSeries = Ea;
  function Pa(r) {
    if (y.splice(r, 1), Tt) {
      Q.values.splice(r, 1), ze.splice(r, 1);
      let a = St.splice(r, 1)[0];
      Ri(null, a.firstChild), a.remove();
    }
    Wt && (ht.splice(r, 1), pe.splice(r, 1)[0].remove(), Bi.splice(r, 1), ji.splice(r, 1)), Rt("delSeries", r);
  }
  i.delSeries = Pa;
  const xi = [!1, !1, !1, !1];
  function Ta(r, a) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = $[r.scale];
      u == null && (r.scale = c ? y[1].scale : M, u = $[r.scale]);
      let d = u.time;
      r.size = et(r.size), r.space = et(r.space), r.rotate = et(r.rotate), ai(r.incrs) && r.incrs.forEach((v) => {
        !fi.has(v) && fi.set(v, jl(v));
      }), r.incrs = et(r.incrs || (u.distr == 2 ? Iu : d ? V == 1 ? Bu : Yu : Pi)), r.splits = et(r.splits || (d && u.distr == 1 ? Jt : u.distr == 3 ? _r : u.distr == 4 ? uh : ch)), r.stroke = et(r.stroke), r.grid.stroke = et(r.grid.stroke), r.ticks.stroke = et(r.ticks.stroke), r.border.stroke = et(r.border.stroke);
      let m = r.values;
      r.values = // static array of tick values
      ai(m) && !ai(m[0]) ? et(m) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          ai(m) ? il(it, el(m, H)) : (
            // fmtDate string tpl
            Js(m) ? qu(it, m) : m || wt
          )
        ) : m || ah
      ), r.filter = et(r.filter || (u.distr >= 3 && u.log == 10 ? dh : u.distr == 3 && u.log == 2 ? ph : Vl)), r.font = _l(r.font), r.labelFont = _l(r.labelFont), r._size = r.size(i, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (xi[a] = !0, r._el = be(Jc, _));
    }
  }
  function wn(r, a, c, u) {
    let [d, m, v, w] = c, x = a % 2, k = 0;
    return x == 0 && (w || m) && (k = a == 0 && !d || a == 2 && !v ? Mt(rl.size / 3) : 0), x == 1 && (d || v) && (k = a == 1 && !m || a == 3 && !w ? Mt(al.size / 2) : 0), k;
  }
  const Kr = i.padding = (e.padding || [wn, wn, wn, wn]).map((r) => et(rt(r, wn))), ni = i._padding = Kr.map((r, a) => r(i, a, xi, 0));
  let Ut, Ot = null, Nt = null;
  const Kn = o == 1 ? y[0].idxs : null;
  let Ae = null, yn = !1;
  function qr(r, a) {
    if (t = r ?? [], i.data = i._data = t, o == 2) {
      Ut = 0;
      for (let c = 1; c < y.length; c++)
        Ut += t[c][0].length;
    } else {
      t.length == 0 && (i.data = i._data = t = [[]]), Ae = t[0], Ut = Ae.length;
      let c = t;
      if (q == 2) {
        c = t.slice();
        let u = c[0] = Array(Ut);
        for (let d = 0; d < Ut; d++)
          u[d] = d;
      }
      i._data = t = c;
    }
    if (Yi(!0), Rt("setData"), q == 2 && (Ui = !0), a !== !1) {
      let c = S;
      c.auto(i, yn) ? Co() : ri(M, c.min, c.max), wi = wi || z.left >= 0, de = !0, Gi();
    }
  }
  i.setData = qr;
  function Co() {
    yn = !0;
    let r, a;
    o == 1 && (Ut > 0 ? (Ot = Kn[0] = 0, Nt = Kn[1] = Ut - 1, r = t[0][Ot], a = t[0][Nt], q == 2 ? (r = Ot, a = Nt) : r == a && (q == 3 ? [r, a] = wo(r, r, S.log, !1) : q == 4 ? [r, a] = Dr(r, r, S.log, !1) : S.time ? a = r + Mt(86400 / V) : [r, a] = po(r, a, zr, !0))) : (Ot = Kn[0] = r = null, Nt = Kn[1] = a = null)), ri(M, r, a);
  }
  let qn, Wi, Mo, Do, zo, Oo, No, Ho, Lo, Xt;
  function Zr(r, a, c, u, d, m) {
    r ??= Os, c ??= Nr, u ??= "butt", d ??= Os, m ??= "round", r != qn && (g.strokeStyle = qn = r), d != Wi && (g.fillStyle = Wi = d), a != Mo && (g.lineWidth = Mo = a), m != zo && (g.lineJoin = zo = m), u != Oo && (g.lineCap = Oo = u), c != Do && g.setLineDash(Do = c);
  }
  function Jr(r, a, c, u) {
    a != Wi && (g.fillStyle = Wi = a), r != No && (g.font = No = r), c != Ho && (g.textAlign = Ho = c), u != Lo && (g.textBaseline = Lo = u);
  }
  function Ro(r, a, c, u, d = 0) {
    if (u.length > 0 && r.auto(i, yn) && (a == null || a.min == null)) {
      let m = rt(Ot, 0), v = rt(Nt, u.length - 1), w = c.min == null ? du(u, m, v, d, r.distr == 3) : [c.min, c.max];
      r.min = Me(r.min, c.min = w[0]), r.max = Zt(r.max, c.max = w[1]);
    }
  }
  const Qr = { min: null, max: null };
  function Ca() {
    for (let u in $) {
      let d = $[u];
      L[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      L[M] != null && d.auto(i, yn)) && (L[u] = Qr);
    }
    for (let u in $) {
      let d = $[u];
      L[u] == null && d.from != null && L[d.from] != null && (L[u] = Qr);
    }
    L[M] != null && Yi(!0);
    let r = {};
    for (let u in L) {
      let d = L[u];
      if (d != null) {
        let m = r[u] = hn($[u], xu);
        if (d.min != null)
          Pt(m, d);
        else if (u != M || o == 2)
          if (Ut == 0 && m.from == null) {
            let v = m.range(i, null, null, u);
            m.min = v[0], m.max = v[1];
          } else
            m.min = dt, m.max = -dt;
      }
    }
    if (Ut > 0) {
      y.forEach((u, d) => {
        if (o == 1) {
          let m = u.scale, v = L[m];
          if (v == null)
            return;
          let w = r[m];
          if (d == 0) {
            let x = w.range(i, w.min, w.max, m);
            w.min = x[0], w.max = x[1], Ot = Ce(w.min, t[0]), Nt = Ce(w.max, t[0]), Nt - Ot > 1 && (t[0][Ot] < w.min && Ot++, t[0][Nt] > w.max && Nt--), u.min = Ae[Ot], u.max = Ae[Nt];
          } else u.show && u.auto && Ro(w, v, u, t[d], u.sorted);
          u.idxs[0] = Ot, u.idxs[1] = Nt;
        } else if (d > 0 && u.show && u.auto) {
          let [m, v] = u.facets, w = m.scale, x = v.scale, [k, P] = t[d], C = r[w], j = r[x];
          C != null && Ro(C, L[w], m, k, m.sorted), j != null && Ro(j, L[x], v, P, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in r) {
        let d = r[u], m = L[u];
        if (d.from == null && (m == null || m.min == null)) {
          let v = d.range(
            i,
            d.min == dt ? null : d.min,
            d.max == -dt ? null : d.max,
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
          let v = d.range(i, m.min, m.max, u);
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
        m._min = v == 3 ? Xe(m.min) : v == 4 ? ir(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? Xe(m.max) : v == 4 ? ir(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      y.forEach((u, d) => {
        o == 2 ? d > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Ui = !0, Rt("setScale", u);
      Wt && z.left >= 0 && (wi = de = !0);
    }
    for (let u in L)
      L[u] = null;
  }
  function Ma(r) {
    let a = mr(Ot - 1, 0, Ut - 1), c = mr(Nt + 1, 0, Ut - 1);
    for (; r[a] == null && a > 0; )
      a--;
    for (; r[c] == null && c < Ut - 1; )
      c++;
    return [a, c];
  }
  function Da() {
    if (Ut > 0) {
      let r = y.some((a) => a._focus) && Xt != Ne.alpha;
      r && (g.globalAlpha = Xt = Ne.alpha), y.forEach((a, c) => {
        if (c > 0 && a.show && (Xr(c, !1), Xr(c, !0), a._paths == null)) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha);
          let d = o == 2 ? [0, t[c][0].length - 1] : Ma(t[c]);
          a._paths = a.paths(i, c, d[0], d[1]), Xt != u && (g.globalAlpha = Xt = u);
        }
      }), y.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha), a._paths != null && ts(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(i, c, Ot, Nt, d), v = a.points.filter(i, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(i, c, Ot, Nt, v), ts(c, !0));
          }
          Xt != u && (g.globalAlpha = Xt = u), Rt("drawSeries", c);
        }
      }), r && (g.globalAlpha = Xt = 1);
    }
  }
  function Xr(r, a) {
    let c = a ? y[r].points : y[r];
    c._stroke = c.stroke(i, r), c._fill = c.fill(i, r);
  }
  function ts(r, a) {
    let c = a ? y[r].points : y[r], {
      stroke: u,
      fill: d,
      clip: m,
      flags: v,
      _stroke: w = c._stroke,
      _fill: x = c._fill,
      _width: k = c.width
    } = c._paths;
    k = pt(k * lt, 3);
    let P = null, C = k % 2 / 2;
    a && x == null && (x = k > 0 ? "#fff" : w);
    let j = c.pxAlign == 1 && C > 0;
    if (j && g.translate(C, C), !a) {
      let st = ie - k / 2, ot = fe - k / 2, X = Qt + k, I = Se + k;
      P = new Path2D(), P.rect(st, ot, X, I);
    }
    a ? Fo(w, k, c.dash, c.cap, x, u, d, v, m) : za(r, w, k, c.dash, c.cap, x, u, d, v, P, m), j && g.translate(-C, -C);
  }
  function za(r, a, c, u, d, m, v, w, x, k, P) {
    let C = !1;
    x != 0 && Z.forEach((j, st) => {
      if (j.series[0] == r) {
        let ot = y[j.series[1]], X = t[j.series[1]], I = (ot._paths || Nn).band;
        ai(I) && (I = j.dir == 1 ? I[0] : I[1]);
        let O, bt = null;
        ot.show && I && gu(X, Ot, Nt) ? (bt = j.fill(i, st) || m, O = ot._paths.clip) : I = null, Fo(a, c, u, d, bt, v, w, x, k, P, O, I), C = !0;
      }
    }), C || Fo(a, c, u, d, m, v, w, x, k, P);
  }
  const es = fn | vr;
  function Fo(r, a, c, u, d, m, v, w, x, k, P, C) {
    Zr(r, a, c, u, d), (x || k || C) && (g.save(), x && g.clip(x), k && g.clip(k)), C ? (w & es) == es ? (g.clip(C), P && g.clip(P), Jn(d, v), Zn(r, m, a)) : w & vr ? (Jn(d, v), g.clip(C), Zn(r, m, a)) : w & fn && (g.save(), g.clip(C), P && g.clip(P), Jn(d, v), g.restore(), Zn(r, m, a)) : (Jn(d, v), Zn(r, m, a)), (x || k || C) && g.restore();
  }
  function Zn(r, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, d) => {
      g.strokeStyle = qn = d, g.stroke(u);
    }) : a != null && r && g.stroke(a));
  }
  function Jn(r, a) {
    a instanceof Map ? a.forEach((c, u) => {
      g.fillStyle = Wi = u, g.fill(c);
    }) : a != null && r && g.fill(a);
  }
  function Oa(r, a, c, u) {
    let d = R[r], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let v = d._space = d.space(i, r, a, c, u), w = d._incrs = d.incrs(i, r, a, c, u, v);
      m = Hh(a, c, w, u, v);
    }
    return d._found = m;
  }
  function Uo(r, a, c, u, d, m, v, w, x, k) {
    let P = v % 2 / 2;
    N == 1 && g.translate(P, P), Zr(w, v, x, k, w), g.beginPath();
    let C, j, st, ot, X = d + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (j = d, ot = X) : (C = d, st = X);
    for (let I = 0; I < r.length; I++)
      a[I] != null && (c == 0 ? C = st = r[I] : j = ot = r[I], g.moveTo(C, j), g.lineTo(st, ot));
    g.stroke(), N == 1 && g.translate(-P, -P);
  }
  function Na(r) {
    let a = !0;
    return R.forEach((c, u) => {
      if (!c.show)
        return;
      let d = $[c.scale];
      if (d.min == null) {
        c._show && (a = !1, c._show = !1, Yi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Yi(!1));
      let m = c.side, v = m % 2, { min: w, max: x } = d, [k, P] = Oa(u, w, x, v == 0 ? K : T);
      if (P == 0)
        return;
      let C = d.distr == 2, j = c._splits = c.splits(i, u, w, x, k, P, C), st = d.distr == 2 ? j.map((O) => Ae[O]) : j, ot = d.distr == 2 ? Ae[j[1]] - Ae[j[0]] : k, X = c._values = c.values(i, c.filter(i, st, u, P, ot), u, P, ot);
      c._rotate = m == 2 ? c.rotate(i, X, u, P) : 0;
      let I = c._size;
      c._size = ve(c.size(i, X, u, r)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function Ha(r) {
    let a = !0;
    return Kr.forEach((c, u) => {
      let d = c(i, u, xi, r);
      d != ni[u] && (a = !1), ni[u] = d;
    }), a;
  }
  function La() {
    for (let r = 0; r < R.length; r++) {
      let a = R[r];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, d, m, v = a.stroke(i, r), w = c == 0 || c == 3 ? -1 : 1, [x, k] = a._found;
      if (a.label != null) {
        let Kt = a.labelGap * w, re = Mt((a._lpos + Kt) * lt);
        Jr(a.labelFont[0], v, "center", c == 2 ? Pn : zs), g.save(), u == 1 ? (d = m = 0, g.translate(
          re,
          Mt(fe + Se / 2)
        ), g.rotate((c == 3 ? -so : so) / 2)) : (d = Mt(ie + Qt / 2), m = re);
        let Ai = Ul(a.label) ? a.label(i, r, x, k) : a.label;
        g.fillText(Ai, d, m), g.restore();
      }
      if (k == 0)
        continue;
      let P = $[a.scale], C = u == 0 ? Qt : Se, j = u == 0 ? ie : fe, st = a._splits, ot = P.distr == 2 ? st.map((Kt) => Ae[Kt]) : st, X = P.distr == 2 ? Ae[st[1]] - Ae[st[0]] : x, I = a.ticks, O = a.border, bt = I.show ? I.size : 0, At = Mt(bt * lt), Ft = Mt((a.alignTo == 2 ? a._size - bt - a.gap : a.gap) * lt), ft = a._rotate * -so / 180, kt = F(a._pos * lt), ne = (At + Ft) * w, Gt = kt + ne;
      m = u == 0 ? Gt : 0, d = u == 1 ? Gt : 0;
      let ge = a.font[0], ke = a.align == 1 ? en : a.align == 2 ? Xo : ft > 0 ? en : ft < 0 ? Xo : u == 0 ? "center" : c == 3 ? Xo : en, Re = ft || u == 1 ? "middle" : c == 2 ? Pn : zs;
      Jr(ge, v, ke, Re);
      let oe = a.font[1] * a.lineGap, me = st.map((Kt) => F(h(Kt, P, C, j))), Ee = a._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let re = Ee[Kt];
        if (re != null) {
          u == 0 ? d = me[Kt] : m = me[Kt], re = "" + re;
          let Ai = re.indexOf(`
`) == -1 ? [re] : re.split(/\n/gm);
          for (let qt = 0; qt < Ai.length; qt++) {
            let ws = Ai[qt];
            ft ? (g.save(), g.translate(d, m + qt * oe), g.rotate(ft), g.fillText(ws, 0, 0), g.restore()) : g.fillText(ws, d, m + qt * oe);
          }
        }
      }
      I.show && Uo(
        me,
        I.filter(i, ot, r, k, X),
        u,
        c,
        kt,
        At,
        pt(I.width * lt, 3),
        I.stroke(i, r),
        I.dash,
        I.cap
      );
      let Fe = a.grid;
      Fe.show && Uo(
        me,
        Fe.filter(i, ot, r, k, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? fe : ie,
        u == 0 ? Se : Qt,
        pt(Fe.width * lt, 3),
        Fe.stroke(i, r),
        Fe.dash,
        Fe.cap
      ), O.show && Uo(
        [kt],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? fe : ie,
        u == 1 ? Se : Qt,
        pt(O.width * lt, 3),
        O.stroke(i, r),
        O.dash,
        O.cap
      );
    }
    Rt("drawAxes");
  }
  function Yi(r) {
    y.forEach((a, c) => {
      c > 0 && (a._paths = null, r && (o == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let Qn = !1, Io = !1, xn = [];
  function Ra() {
    Io = !1;
    for (let r = 0; r < xn.length; r++)
      Rt(...xn[r]);
    xn.length = 0;
  }
  function Gi() {
    Qn || (Tu(is), Qn = !0);
  }
  function Fa(r, a = !1) {
    Qn = !0, Io = a, r(i), is(), a && xn.length > 0 && queueMicrotask(Ra);
  }
  i.batch = Fa;
  function is() {
    if (Po && (Ca(), Po = !1), Ui && ($a(), Ui = !1), Yn) {
      if (vt(A, en, gt), vt(A, Pn, Ct), vt(A, Cn, K), vt(A, Mn, T), vt(E, en, gt), vt(E, Pn, Ct), vt(E, Cn, K), vt(E, Mn, T), vt(_, Cn, qe), vt(_, Mn, _i), b.width = Mt(qe * lt), b.height = Mt(_i * lt), R.forEach(({ _el: r, _show: a, _size: c, _pos: u, side: d }) => {
        if (r != null)
          if (a) {
            let m = d === 3 || d === 0 ? c : 0, v = d % 2 == 1;
            vt(r, v ? "left" : "top", u - m), vt(r, v ? "width" : "height", c), vt(r, v ? "top" : "left", v ? Ct : gt), vt(r, v ? "height" : "width", v ? T : K), pr(r, Ti);
          } else
            se(r, Ti);
      }), qn = Wi = Mo = zo = Oo = No = Ho = Lo = Do = null, Xt = 1, An(!0), gt != Fi || Ct != bi || K != Oe || T != vi) {
        Yi(!1);
        let r = K / Oe, a = T / vi;
        if (Wt && !wi && z.left >= 0) {
          z.left *= r, z.top *= a, Ki && Ue(Ki, Mt(z.left), 0, K, T), qi && Ue(qi, 0, Mt(z.top), K, T);
          for (let c = 0; c < pe.length; c++) {
            let u = pe[c];
            u != null && (Bi[c] *= r, ji[c] *= a, Ue(u, ve(Bi[c]), ve(ji[c]), K, T));
          }
        }
        if (_t.show && !Gn && _t.left >= 0 && _t.width > 0) {
          _t.left *= r, _t.width *= r, _t.top *= a, _t.height *= a;
          for (let c in Go)
            vt(Qi, c, _t[c]);
        }
        Fi = gt, bi = Ct, Oe = K, vi = T;
      }
      Rt("setSize"), Yn = !1;
    }
    qe > 0 && _i > 0 && (g.clearRect(0, 0, b.width, b.height), Rt("drawClear"), G.forEach((r) => r()), Rt("draw")), _t.show && Gn && (Xn(_t), Gn = !1), Wt && wi && (Si(null, !0, !1), wi = !1), Q.show && Q.live && de && (Wo(), de = !1), f || (f = !0, i.status = 1, Rt("ready")), yn = !1, Qn = !1;
  }
  i.redraw = (r, a) => {
    Ui = a || !1, r !== !1 ? ri(M, S.min, S.max) : Gi();
  };
  function Vo(r, a) {
    let c = $[r];
    if (c.from == null) {
      if (Ut == 0) {
        let u = c.range(i, a.min, a.max, r);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (Ut > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      r == M && c.distr == 2 && Ut > 0 && (a.min = Ce(a.min, t[0]), a.max = Ce(a.max, t[0]), a.min == a.max && a.max++), L[r] = a, Po = !0, Gi();
    }
  }
  i.setScale = Vo;
  let Bo, jo, Ki, qi, ns, os, Zi, Ji, rs, ss, mt, xt, oi = !1;
  const It = z.drag;
  let Ht = It.x, Lt = It.y;
  Wt && (z.x && (Bo = be(Xc, E)), z.y && (jo = be(tu, E)), S.ori == 0 ? (Ki = Bo, qi = jo) : (Ki = jo, qi = Bo), mt = z.left, xt = z.top);
  const _t = i.select = Pt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), Qi = _t.show ? be(Qc, _t.over ? E : A) : null;
  function Xn(r, a) {
    if (_t.show) {
      for (let c in r)
        _t[c] = r[c], c in Go && vt(Qi, c, r[c]);
      a !== !1 && Rt("setSelect");
    }
  }
  i.setSelect = Xn;
  function Ua(r) {
    if (y[r].show)
      Tt && pr(St[r], Ti);
    else if (Tt && se(St[r], Ti), Wt) {
      let c = Vi ? pe[0] : pe[r];
      c != null && Ue(c, -10, -10, K, T);
    }
  }
  function ri(r, a, c) {
    Vo(r, { min: a, max: c });
  }
  function He(r, a, c, u) {
    a.focus != null && Wa(r), a.show != null && y.forEach((d, m) => {
      m > 0 && (r == m || r == null) && (d.show = a.show, Ua(m), o == 2 ? (ri(d.facets[0].scale, null, null), ri(d.facets[1].scale, null, null)) : ri(d.scale, null, null), Gi());
    }), c !== !1 && Rt("setSeries", r, a), u && kn("setSeries", i, r, a);
  }
  i.setSeries = He;
  function Ia(r, a) {
    Pt(Z[r], a);
  }
  function Va(r, a) {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1), a = a ?? Z.length, Z.splice(a, 0, r);
  }
  function Ba(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  i.addBand = Va, i.setBand = Ia, i.delBand = Ba;
  function ja(r, a) {
    y[r].alpha = a, Wt && pe[r] != null && (pe[r].style.opacity = a), Tt && St[r] && (St[r].style.opacity = a);
  }
  let Ze, si, $i;
  const Xi = { focus: !0 };
  function Wa(r) {
    if (r != $i) {
      let a = r == null, c = Ne.alpha != 1;
      y.forEach((u, d) => {
        if (o == 1 || d > 0) {
          let m = a || d == 0 || d == r;
          u._focus = a ? null : m, c && ja(d, m ? 1 : Ne.alpha);
        }
      }), $i = r, c && Gi();
    }
  }
  Tt && Ii && Yt(Ls, ct, (r) => {
    z._lock || (yi(r), $i != null && He(null, Xi, !0, Et.setSeries));
  });
  function Le(r, a, c) {
    let u = $[a];
    c && (r = r / lt - (u.ori == 1 ? Ct : gt));
    let d = K;
    u.ori == 1 && (d = T, r = d - r), u.dir == -1 && (r = d - r);
    let m = u._min, v = u._max, w = r / d, x = m + (v - m) * w, k = u.distr;
    return k == 3 ? cn(10, x) : k == 4 ? _u(x, u.asinh) : k == 100 ? u.bwd(x) : x;
  }
  function Ya(r, a) {
    let c = Le(r, M, a);
    return Ce(c, t[0], Ot, Nt);
  }
  i.valToIdx = (r) => Ce(r, t[0]), i.posToIdx = Ya, i.posToVal = Le, i.valToPos = (r, a, c) => $[a].ori == 0 ? s(
    r,
    $[a],
    c ? Qt : K,
    c ? ie : 0
  ) : l(
    r,
    $[a],
    c ? Se : T,
    c ? fe : 0
  ), i.setCursor = (r, a, c) => {
    mt = r.left, xt = r.top, Si(null, a, c);
  };
  function ls(r, a) {
    vt(Qi, en, _t.left = r), vt(Qi, Cn, _t.width = a);
  }
  function as(r, a) {
    vt(Qi, Pn, _t.top = r), vt(Qi, Mn, _t.height = a);
  }
  let $n = S.ori == 0 ? ls : as, Sn = S.ori == 1 ? ls : as;
  function Ga() {
    if (Tt && Q.live)
      for (let r = o == 2 ? 1 : 0; r < y.length; r++) {
        if (r == 0 && he)
          continue;
        let a = Q.values[r], c = 0;
        for (let u in a)
          ze[r][c++].firstChild.nodeValue = a[u];
      }
  }
  function Wo(r, a) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      ht[u] = c;
    }) : yu(r.idx) || ht.fill(r.idx), Q.idx = ht[0]), Tt && Q.live) {
      for (let c = 0; c < y.length; c++)
        (c > 0 || o == 1 && !he) && Ka(c, ht[c]);
      Ga();
    }
    de = !1, a !== !1 && Rt("setLegend");
  }
  i.setLegend = Wo;
  function Ka(r, a) {
    let c = y[r], u = r == 0 && q == 2 ? Ae : t[r], d;
    he ? d = c.values(i, r, a) ?? ii : (d = c.value(i, a == null ? null : u[a], r, a), d = d == null ? ii : { _: d }), Q.values[r] = d;
  }
  function Si(r, a, c) {
    rs = mt, ss = xt, [mt, xt] = z.move(i, mt, xt), z.left = mt, z.top = xt, Wt && (Ki && Ue(Ki, Mt(mt), 0, K, T), qi && Ue(qi, 0, Mt(xt), K, T));
    let u, d = Ot > Nt;
    Ze = dt, si = null;
    let m = S.ori == 0 ? K : T, v = S.ori == 1 ? K : T;
    if (mt < 0 || Ut == 0 || d) {
      u = z.idx = null;
      for (let w = 0; w < y.length; w++) {
        let x = pe[w];
        x != null && Ue(x, -10, -10, K, T);
      }
      Ii && He(null, Xi, !0, r == null && Et.setSeries), Q.live && (ht.fill(u), de = !0);
    } else {
      let w, x, k;
      o == 1 && (w = S.ori == 0 ? mt : xt, x = Le(w, M), u = z.idx = Ce(x, t[0], Ot, Nt), k = D(t[0][u], S, m, 0));
      let P = -10, C = -10, j = 0, st = 0, ot = !0, X = "", I = "";
      for (let O = o == 2 ? 1 : 0; O < y.length; O++) {
        let bt = y[O], At = ht[O], Ft = At == null ? null : o == 1 ? t[O][At] : t[O][1][At], ft = z.dataIdx(i, O, u, x), kt = ft == null ? null : o == 1 ? t[O][ft] : t[O][1][ft];
        if (de = de || kt != Ft || ft != At, ht[O] = ft, O > 0 && bt.show) {
          let ne = ft == null ? -10 : ft == u ? k : D(o == 1 ? t[0][ft] : t[O][0][ft], S, m, 0), Gt = kt == null ? -10 : B(kt, o == 1 ? $[bt.scale] : $[bt.facets[1].scale], v, 0);
          if (Ii && kt != null) {
            let ge = S.ori == 1 ? mt : xt, ke = Dt(Ne.dist(i, O, ft, Gt, ge));
            if (ke < Ze) {
              let Re = Ne.bias;
              if (Re != 0) {
                let oe = Le(ge, bt.scale), me = kt >= 0 ? 1 : -1, Ee = oe >= 0 ? 1 : -1;
                Ee == me && (Ee == 1 ? Re == 1 ? kt >= oe : kt <= oe : (
                  // >= 0
                  Re == 1 ? kt <= oe : kt >= oe
                )) && (Ze = ke, si = O);
              } else
                Ze = ke, si = O;
            }
          }
          if (de || Vi) {
            let ge, ke;
            S.ori == 0 ? (ge = ne, ke = Gt) : (ge = Gt, ke = ne);
            let Re, oe, me, Ee, Fe, Kt, re = !0, Ai = Bt.bbox;
            if (Ai != null) {
              re = !1;
              let qt = Ai(i, O);
              me = qt.left, Ee = qt.top, Re = qt.width, oe = qt.height;
            } else
              me = ge, Ee = ke, Re = oe = Bt.size(i, O);
            if (Kt = Bt.fill(i, O), Fe = Bt.stroke(i, O), Vi)
              O == si && Ze <= Ne.prox && (P = me, C = Ee, j = Re, st = oe, ot = re, X = Kt, I = Fe);
            else {
              let qt = pe[O];
              qt != null && (Bi[O] = me, ji[O] = Ee, js(qt, Re, oe, re), Vs(qt, Kt, Fe), Ue(qt, ve(me), ve(Ee), K, T));
            }
          }
        }
      }
      if (Vi) {
        let O = Ne.prox, bt = $i == null ? Ze <= O : Ze > O || si != $i;
        if (de || bt) {
          let At = pe[0];
          At != null && (Bi[0] = P, ji[0] = C, js(At, j, st, ot), Vs(At, X, I), Ue(At, ve(P), ve(C), K, T));
        }
      }
    }
    if (_t.show && oi)
      if (r != null) {
        let [w, x] = Et.scales, [k, P] = Et.match, [C, j] = r.cursor.sync.scales, st = r.cursor.drag;
        if (Ht = st._x, Lt = st._y, Ht || Lt) {
          let { left: ot, top: X, width: I, height: O } = r.select, bt = r.scales[C].ori, At = r.posToVal, Ft, ft, kt, ne, Gt, ge = w != null && k(w, C), ke = x != null && P(x, j);
          ge && Ht ? (bt == 0 ? (Ft = ot, ft = I) : (Ft = X, ft = O), kt = $[w], ne = D(At(Ft, C), kt, m, 0), Gt = D(At(Ft + ft, C), kt, m, 0), $n(Me(ne, Gt), Dt(Gt - ne))) : $n(0, m), ke && Lt ? (bt == 1 ? (Ft = ot, ft = I) : (Ft = X, ft = O), kt = $[x], ne = B(At(Ft, j), kt, v, 0), Gt = B(At(Ft + ft, j), kt, v, 0), Sn(Me(ne, Gt), Dt(Gt - ne))) : Sn(0, v);
        } else
          Ko();
      } else {
        let w = Dt(rs - ns), x = Dt(ss - os);
        if (S.ori == 1) {
          let j = w;
          w = x, x = j;
        }
        Ht = It.x && w >= It.dist, Lt = It.y && x >= It.dist;
        let k = It.uni;
        k != null ? Ht && Lt && (Ht = w >= k, Lt = x >= k, !Ht && !Lt && (x > w ? Lt = !0 : Ht = !0)) : It.x && It.y && (Ht || Lt) && (Ht = Lt = !0);
        let P, C;
        Ht && (S.ori == 0 ? (P = Zi, C = mt) : (P = Ji, C = xt), $n(Me(P, C), Dt(C - P)), Lt || Sn(0, v)), Lt && (S.ori == 1 ? (P = Zi, C = mt) : (P = Ji, C = xt), Sn(Me(P, C), Dt(C - P)), Ht || $n(0, m)), !Ht && !Lt && ($n(0, 0), Sn(0, 0));
      }
    if (It._x = Ht, It._y = Lt, r == null) {
      if (c) {
        if (vs != null) {
          let [w, x] = Et.scales;
          Et.values[0] = w != null ? Le(S.ori == 0 ? mt : xt, w) : null, Et.values[1] = x != null ? Le(S.ori == 1 ? mt : xt, x) : null;
        }
        kn(tr, i, mt, xt, K, T, u);
      }
      if (Ii) {
        let w = c && Et.setSeries, x = Ne.prox;
        $i == null ? Ze <= x && He(si, Xi, !0, w) : Ze > x ? He(null, Xi, !0, w) : si != $i && He(si, Xi, !0, w);
      }
    }
    de && (Q.idx = u, Wo()), a !== !1 && Rt("setCursor");
  }
  let li = null;
  Object.defineProperty(i, "rect", {
    get() {
      return li == null && An(!1), li;
    }
  });
  function An(r = !1) {
    r ? li = null : (li = E.getBoundingClientRect(), Rt("syncRect", li));
  }
  function cs(r, a, c, u, d, m, v) {
    z._lock || oi && r != null && r.movementX == 0 && r.movementY == 0 || (Yo(r, a, c, u, d, m, v, !1, r != null), r != null ? Si(null, !0, !0) : Si(a, !0, !1));
  }
  function Yo(r, a, c, u, d, m, v, w, x) {
    if (li == null && An(!1), yi(r), r != null)
      c = r.clientX - li.left, u = r.clientY - li.top;
    else {
      if (c < 0 || u < 0) {
        mt = -10, xt = -10;
        return;
      }
      let [k, P] = Et.scales, C = a.cursor.sync, [j, st] = C.values, [ot, X] = C.scales, [I, O] = Et.match, bt = a.axes[0].side % 2 == 1, At = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, ft = bt ? m : d, kt = bt ? d : m, ne = bt ? u : c, Gt = bt ? c : u;
      if (ot != null ? c = I(k, ot) ? h(j, $[k], At, 0) : -10 : c = At * (ne / ft), X != null ? u = O(P, X) ? h(st, $[P], Ft, 0) : -10 : u = Ft * (Gt / kt), S.ori == 1) {
        let ge = c;
        c = u, u = ge;
      }
    }
    x && (a == null || a.cursor.event.type == tr) && ((c <= 1 || c >= K - 1) && (c = Ei(c, K)), (u <= 1 || u >= T - 1) && (u = Ei(u, T))), w ? (ns = c, os = u, [Zi, Ji] = z.move(i, c, u)) : (mt = c, xt = u);
  }
  const Go = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Ko() {
    Xn(Go, !1);
  }
  let us, hs, fs, ds;
  function ps(r, a, c, u, d, m, v) {
    oi = !0, Ht = Lt = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !0, !1), r != null && (Yt(er, fr, gs, !1), kn(Ns, i, Zi, Ji, K, T, null));
    let { left: w, top: x, width: k, height: P } = _t;
    us = w, hs = x, fs = k, ds = P;
  }
  function gs(r, a, c, u, d, m, v) {
    oi = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !1, !0);
    let { left: w, top: x, width: k, height: P } = _t, C = k > 0 || P > 0, j = us != w || hs != x || fs != k || ds != P;
    if (C && j && Xn(_t), It.setScale && C && j) {
      let st = w, ot = k, X = x, I = P;
      if (S.ori == 1 && (st = x, ot = P, X = w, I = k), Ht && ri(
        M,
        Le(st, M),
        Le(st + ot, M)
      ), Lt)
        for (let O in $) {
          let bt = $[O];
          O != M && bt.from == null && bt.min != dt && ri(
            O,
            Le(X + I, O),
            Le(X, O)
          );
        }
      Ko();
    } else z.lock && (z._lock = !z._lock, Si(a, !0, r != null));
    r != null && (Ri(er, fr), kn(er, i, mt, xt, K, T, null));
  }
  function qa(r, a, c, u, d, m, v) {
    if (z._lock)
      return;
    yi(r);
    let w = oi;
    if (oi) {
      let x = !0, k = !0, P = 10, C, j;
      S.ori == 0 ? (C = Ht, j = Lt) : (C = Lt, j = Ht), C && j && (x = mt <= P || mt >= K - P, k = xt <= P || xt >= T - P), C && x && (mt = mt < Zi ? 0 : K), j && k && (xt = xt < Ji ? 0 : T), Si(null, !0, !0), oi = !1;
    }
    mt = -10, xt = -10, ht.fill(null), Si(null, !0, !0), w && (oi = w);
  }
  function ms(r, a, c, u, d, m, v) {
    z._lock || (yi(r), Co(), Ko(), r != null && kn(Rs, i, mt, xt, K, T, null));
  }
  function _s() {
    R.forEach(Lh), To(i.width, i.height, !0);
  }
  Mi(fo, sn, _s);
  const tn = {};
  tn.mousedown = ps, tn.mousemove = cs, tn.mouseup = gs, tn.dblclick = ms, tn.setSeries = (r, a, c, u) => {
    let d = Et.match[2];
    c = d(i, a, c), c != -1 && He(c, u, !0, !1);
  }, Wt && (Yt(Ns, E, ps), Yt(tr, E, cs), Yt(Hs, E, (r) => {
    yi(r), An(!1);
  }), Yt(Ls, E, qa), Yt(Rs, E, ms), wr.add(i), i.syncRect = An);
  const to = i.hooks = e.hooks || {};
  function Rt(r, a, c) {
    Io ? xn.push([r, a, c]) : r in to && to[r].forEach((u) => {
      u.call(null, i, a, c);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let a in r.hooks)
      to[a] = (to[a] || []).concat(r.hooks[a]);
  });
  const bs = (r, a, c) => c, Et = Pt({
    key: null,
    setSeries: !1,
    filters: {
      pub: qs,
      sub: qs
    },
    scales: [M, y[1] ? y[1].scale : null],
    match: [Zs, Zs, bs],
    values: [null, null]
  }, z.sync);
  Et.match.length == 2 && Et.match.push(bs), z.sync = Et;
  const vs = Et.key, qo = ua(vs);
  function kn(r, a, c, u, d, m, v) {
    Et.filters.pub(r, a, c, u, d, m, v) && qo.pub(r, a, c, u, d, m, v);
  }
  qo.sub(i);
  function Za(r, a, c, u, d, m, v) {
    Et.filters.sub(r, a, c, u, d, m, v) && tn[r](null, a, c, u, d, m, v);
  }
  i.pub = Za;
  function Ja() {
    qo.unsub(i), wr.delete(i), mi.clear(), gr(fo, sn, _s), p.remove(), ct?.remove(), Rt("destroy");
  }
  i.destroy = Ja;
  function Zo() {
    Rt("init", e, t), qr(t || e.data, !1), L[M] ? Vo(M, L[M]) : Co(), Gn = _t.show && (_t.width > 0 || _t.height > 0), wi = de = !0, To(e.width, e.height);
  }
  return y.forEach(Gr), R.forEach(Ta), n ? n instanceof HTMLElement ? (n.appendChild(p), Zo()) : n(i, Zo) : Zo(), i;
}
jt.assign = Pt;
jt.fmtNum = Or;
jt.rangeNum = po;
jt.rangeLog = wo;
jt.rangeAsinh = Dr;
jt.orient = Ni;
jt.pxRatio = lt;
jt.join = Pu;
jt.fmtDate = Hr, jt.tzDate = Fu;
jt.sync = ua;
{
  jt.addGap = yh, jt.clipGaps = $o;
  let e = jt.paths = {
    points: ma
  };
  e.linear = ba, e.stepped = Sh, e.bars = Ah, e.spline = Eh;
}
const Rh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Fh = Object.defineProperty, Uh = Object.getOwnPropertyDescriptor, Ye = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Uh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Fh(t, n, o), o;
};
const Ih = 24;
let ye = class extends Vt {
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
    const e = /* @__PURE__ */ new Date(), t = new Date(e.getTime() - Ih * 60 * 60 * 1e3), n = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (i) => !!i
    );
    try {
      const i = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: t.toISOString(),
        end_time: e.toISOString(),
        entity_ids: n,
        minimal_response: !1,
        no_attributes: !0
      });
      this._renderPlot(i), this._loading = !1;
    } catch (i) {
      this._error = i instanceof Error ? i.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
    }
  }
  /** Convert HA's `[{s, lu}, ...]` to a (sorted by time) numeric series.
   *  Skips entries whose state isn't a finite number. */
  _numericSeries(e) {
    if (!e) return [];
    const t = [];
    for (const n of e) {
      const i = parseFloat(n.s);
      Number.isFinite(i) && t.push([n.lu, i]);
    }
    return t.sort((n, i) => n[0] - i[0]), t;
  }
  /** Build aligned uPlot data: a single sorted x axis and forward-filled
   *  values for each numeric series. */
  _alignSeries(e, t) {
    const n = /* @__PURE__ */ new Set();
    for (const s of e) for (const [l] of s) n.add(l);
    if (n.size === 0) return [[t], ...e.map(() => [null])];
    const i = [...n].sort((s, l) => s - l), o = e.map((s) => {
      let l = -1, h = null;
      return i.map((f) => {
        for (; l + 1 < s.length && s[l + 1][0] <= f; )
          l++, h = s[l][1];
        return h;
      });
    });
    return [i, ...o];
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(e, t) {
    if (!e) return [];
    const n = [...e].sort((o, s) => o.lu - s.lu), i = [];
    for (let o = 0; o < n.length; o++) {
      const s = n[o].lu, l = n[o + 1]?.lu ?? t, h = n[o].s;
      (h === "heating" || h === "cooling") && i.push({ start: s, end: l, action: h });
    }
    return i;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), n = this._numericSeries(e[this.roomEntity]), i = this._numericSeries(e[this.lowEntity]), o = this._numericSeries(e[this.highEntity]);
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), n.length === 0 && i.length === 0 && o.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([n, i, o], t), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new jt(l, s, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = getComputedStyle(this), n = t.getPropertyValue("--cb-action-heating").trim() || "#d9603f", i = t.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", o = t.getPropertyValue("--primary-color").trim() || "#03a9f4";
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
          stroke: n,
          width: 1.5,
          dash: [6, 3],
          spanGaps: !0
        },
        {
          label: "High",
          stroke: i,
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
              g <= b || (l.fillStyle = p.action === "heating" ? bl(n, 0.18) : bl(i, 0.18), l.fillRect(b, h, g - b, f));
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
    return !this.hass || !this.roomEntity ? U`<div class="status">No room temperature sensor for this zone.</div>` : U`
      ${this._loading ? U`<div class="status">Loading 24 h history…</div>` : at}
      ${this._error ? U`<div class="status">${this._error}</div>` : at}
      ${this._empty ? U`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : at}
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
ye.styles = [
  ce,
  Al(Rh),
  te`
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
  Y({ attribute: !1 })
], ye.prototype, "hass", 2);
Ye([
  Y({ type: String })
], ye.prototype, "roomEntity", 2);
Ye([
  Y({ type: String })
], ye.prototype, "lowEntity", 2);
Ye([
  Y({ type: String })
], ye.prototype, "highEntity", 2);
Ye([
  Y({ type: String })
], ye.prototype, "actionEntity", 2);
Ye([
  $t()
], ye.prototype, "_loading", 2);
Ye([
  $t()
], ye.prototype, "_error", 2);
Ye([
  $t()
], ye.prototype, "_empty", 2);
Ye([
  Bn(".chart-host")
], ye.prototype, "_host", 2);
ye = Ye([
  ae("comfort-band-history-chart")
], ye);
function bl(e, t) {
  const n = e.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let s = i[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), f = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${f}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : n;
}
var Vh = Object.defineProperty, Bh = Object.getOwnPropertyDescriptor, Br = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Bh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Vh(t, n, o), o;
};
let Un = class extends Vt {
  render() {
    const e = this.entities?.roomTemperature;
    return e ? U`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${at}
    ` : U`<div class="empty">No room temperature sensor for this zone.</div>`;
  }
};
Un.styles = [
  ce,
  te`
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
Br([
  Y({ attribute: !1 })
], Un.prototype, "hass", 2);
Br([
  Y({ attribute: !1 })
], Un.prototype, "entities", 2);
Un = Br([
  ae("comfort-band-insights-tab")
], Un);
var jh = Object.defineProperty, Wh = Object.getOwnPropertyDescriptor, bn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Wh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && jh(t, n, o), o;
};
const Qe = 15, Ve = 0.5, Je = 14, Ie = 28, vl = 4, Yh = 500, nn = 600, oo = 200, wl = 0, yl = 24 * 60 - Qe, sr = [0, 6, 12, 18, 24], xl = [14, 18, 22, 26];
function Te(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function lr(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function Gh(e) {
  return Math.round(e / Qe) * Qe;
}
function ar(e) {
  return Math.round(e / Ve) * Ve;
}
function _e(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
let di = class extends Vt {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (e, t, n) => {
      e.stopPropagation(), e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
      const o = {
        kind: "handle",
        handle: n,
        origin: { ...t },
        startX: e.clientX,
        startY: e.clientY,
        moved: !1,
        longPressTimer: null,
        longPressed: !1
      };
      o.longPressTimer = window.setTimeout(() => {
        o.longPressTimer = null, this._drag === o && !o.moved && (o.longPressed = !0, this._fire("transition-delete", { at: o.origin.at }));
      }, Yh), this._drag = o;
    }, this._onHandlePointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle" || t.longPressed) return;
      const n = e.clientX - t.startX, i = e.clientY - t.startY;
      if (!t.moved && Math.hypot(n, i) < vl) return;
      t.moved || (t.moved = !0, t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null));
      const o = this._svg();
      if (!o) return;
      const s = o.getBoundingClientRect(), l = this._timeRangeFor(t.origin.at), h = _e(this._clientToMinutes(e.clientX, s), l.min, l.max), f = this._clientToTemp(e.clientY, s);
      let p = t.origin.low, b = t.origin.high;
      t.handle === "low" ? p = _e(f, Je, b - Ve) : b = _e(f, p + Ve, Ie), this._preview = { at: lr(h), low: p, high: b };
    }, this._onHandlePointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle") return;
      const n = e.currentTarget;
      try {
        n.releasePointerCapture(e.pointerId);
      } catch {
      }
      t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null);
      const i = this._preview;
      if (this._drag = null, this._preview = null, !t.longPressed) {
        if (!t.moved) {
          this._fire("transition-edit", { transition: t.origin });
          return;
        }
        i && (this._focusedAt === t.origin.at && (this._focusedAt = i.at), this._fire("transition-update", {
          oldAt: t.origin.at,
          transition: { at: i.at, low: i.low, high: i.high }
        }));
      }
    }, this._onHandlePointerCancel = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle") return;
      const n = e.currentTarget;
      try {
        n.releasePointerCapture(e.pointerId);
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
      const n = {
        kind: "empty",
        startX: e.clientX,
        startY: e.clientY,
        moved: !1
      };
      this._drag = n;
    }, this._onBackgroundPointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty" || t.moved) return;
      const n = e.clientX - t.startX, i = e.clientY - t.startY;
      Math.hypot(n, i) >= vl && (t.moved = !0);
    }, this._onBackgroundPointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty")
        return;
      const n = this._svg();
      try {
        n?.releasePointerCapture(e.pointerId);
      } catch {
      }
      const i = t.moved, o = e.type === "pointercancel";
      if (this._drag = null, o || i || !n) return;
      const s = n.getBoundingClientRect(), l = _e(this._clientToMinutes(e.clientX, s), wl, yl);
      for (const b of this.transitions) if (Te(b.at) === l) return;
      const h = this._clientToTemp(e.clientY, s), f = _e(ar(h - 1.5), Je, Ie - Ve), p = _e(ar(h + 1.5), f + Ve, Ie);
      this._fire("transition-add", { at: lr(l), low: f, high: p });
    }, this._onHandleKeyDown = (e, t, n) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(), this._fire("transition-edit", { transition: t });
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault(), this._fire("transition-delete", { at: t.at });
        return;
      }
      let i = 0, o = 0;
      switch (e.key) {
        case "ArrowLeft":
          i = -Qe;
          break;
        case "ArrowRight":
          i = Qe;
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
      e.preventDefault();
      const s = this._timeRangeFor(t.at), l = _e(Te(t.at) + i, s.min, s.max);
      let h = t.low, f = t.high;
      if (n === "low" ? h = _e(t.low + o, Je, f - Ve) : f = _e(t.high + o, h + Ve, Ie), l === Te(t.at) && h === t.low && f === t.high)
        return;
      const p = lr(l);
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
    this._drag && this._drag.kind === "handle" && this._drag.longPressTimer !== null && window.clearTimeout(this._drag.longPressTimer), super.disconnectedCallback();
  }
  _timeToX(e) {
    return e / (24 * 60) * nn;
  }
  _tempToY(e) {
    const t = _e(e, Je, Ie);
    return oo - (t - Je) / (Ie - Je) * oo;
  }
  _clientToMinutes(e, t) {
    if (t.width === 0) return 0;
    const n = _e((e - t.left) / t.width, 0, 1);
    return Gh(n * 24 * 60);
  }
  _clientToTemp(e, t) {
    if (t.height === 0) return Je;
    const n = _e((e - t.top) / t.height, 0, 1), i = Ie - n * (Ie - Je);
    return ar(i);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((e) => Te(e.at)).sort((e, t) => e - t);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(e) {
    const t = Te(e), n = this._sortedAts().filter((s) => s !== t);
    let i = wl, o = yl;
    for (const s of n)
      s < t && s + Qe > i && (i = s + Qe), s > t && s - Qe < o && (o = s - Qe);
    return { min: i, max: o };
  }
  _fire(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const e = [...this.transitions].sort((n, i) => Te(n.at) - Te(i.at));
    if (!this._preview || !this._drag || this._drag.kind !== "handle") return e;
    const t = this._drag;
    return e.map(
      (n) => n.at === t.origin.at ? { at: this._preview.at, low: this._preview.low, high: this._preview.high } : n
    );
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is already sorted by `at` ascending — every
   *  caller goes through `_renderedTransitions()` which sorts. */
  _stepPoints(e, t) {
    const n = e[e.length - 1][t], i = [[0, this._tempToY(n)]];
    let o = n;
    for (const s of e) {
      const l = this._timeToX(Te(s.at));
      i.push([l, this._tempToY(o)]), i.push([l, this._tempToY(s[t])]), o = s[t];
    }
    return i.push([nn, this._tempToY(o)]), i;
  }
  _pointsToPath(e) {
    return e.map(([t, n], i) => `${i === 0 ? "M" : "L"} ${t} ${n}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const n = this._pointsToPath(e), i = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${n} ${i} Z`;
  }
  render() {
    const e = this._renderedTransitions(), t = e.length > 0, n = t ? this._stepPoints(e, "low") : [], i = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(n) : "", s = t ? this._pointsToPath(i) : "", l = t ? this._fillFromPoints(i, n) : "";
    return U`
      <div class="chart">
        <svg
          viewBox="0 0 ${nn} ${oo}"
          preserveAspectRatio="none"
          role="group"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          <title>Schedule chart for the active profile</title>
          ${xl.map(
      (h) => ui`<line class="grid" x1="0" x2=${nn} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${sr.map(
      (h) => ui`<line class="grid" y1="0" y2=${oo} x1=${h / 24 * nn} x2=${h / 24 * nn}></line>`
    )}
          ${e.length > 0 ? ui`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const f = this._timeToX(Te(h.at)), p = this._tempToY(h.low), b = this._tempToY(h.high), g = this._focusedAt === h.at && this._focusedHandle === "low", _ = this._focusedAt === h.at && this._focusedHandle === "high", A = this._drag?.kind === "handle" && this._drag.origin.at === h.at ? this._drag.handle : null, E = `Low handle at ${h.at}, ${h.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, N = `High handle at ${h.at}, ${h.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, F = `handle low${g ? " focused" : ""}${A === "low" ? " dragging" : ""}`, V = `handle high${_ ? " focused" : ""}${A === "high" ? " dragging" : ""}`;
      return ui`
              <circle
                class=${F}
                cx=${f}
                cy=${p}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${E}
                data-at=${h.at}
                data-handle="low"
                @pointerdown=${(y) => this._onHandlePointerDown(y, h, "low")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(y) => this._onHandleKeyDown(y, h, "low")}
                @focus=${() => this._onHandleFocus(h, "low")}
                @blur=${this._onHandleBlur}
              ></circle>
              <circle
                class=${V}
                cx=${f}
                cy=${b}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${N}
                data-at=${h.at}
                data-handle="high"
                @pointerdown=${(y) => this._onHandlePointerDown(y, h, "high")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(y) => this._onHandleKeyDown(y, h, "high")}
                @focus=${() => this._onHandleFocus(h, "high")}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
    })}
        </svg>
        ${xl.map(
      (h) => U`<div
              class="axis-label y"
              style="top: ${(Ie - h) / (Ie - Je) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${sr.map((h, f) => {
      const p = f === 0 ? "axis-label x start" : f === sr.length - 1 ? "axis-label x end" : "axis-label x";
      return U`<div class=${p} style="left: ${h / 24 * 100}%">${h}h</div>`;
    })}
        ${this.transitions.length === 0 ? U`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
di.styles = [
  ce,
  te`
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
        left: -28px;
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
bn([
  Y({ type: Array })
], di.prototype, "transitions", 2);
bn([
  $t()
], di.prototype, "_drag", 2);
bn([
  $t()
], di.prototype, "_preview", 2);
bn([
  $t()
], di.prototype, "_focusedAt", 2);
bn([
  $t()
], di.prototype, "_focusedHandle", 2);
di = bn([
  ae("comfort-band-schedule-chart")
], di);
var Kh = Object.defineProperty, qh = Object.getOwnPropertyDescriptor, pi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? qh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Kh(t, n, o), o;
};
let Be = class extends Vt {
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
    return U`
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
      ${this._error ? U`<div class="error">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : U`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Be.styles = [
  ce,
  te`
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
pi([
  Y({ type: Object })
], Be.prototype, "transition", 2);
pi([
  Y({ type: Boolean })
], Be.prototype, "isNew", 2);
pi([
  $t()
], Be.prototype, "_at", 2);
pi([
  $t()
], Be.prototype, "_low", 2);
pi([
  $t()
], Be.prototype, "_high", 2);
pi([
  $t()
], Be.prototype, "_error", 2);
pi([
  Bn('input[name="at"]')
], Be.prototype, "_atInput", 2);
Be = pi([
  ae("transition-edit-dialog")
], Be);
var Zh = Object.defineProperty, Jh = Object.getOwnPropertyDescriptor, Ge = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Jh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Zh(t, n, o), o;
};
function cr(e, t) {
  return Te(e.at) - Te(t.at);
}
let xe = class extends Vt {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._subscribeGen = 0, this._onAdd = (e) => {
      this._newAt = e.detail.at, this._newLow = e.detail.low, this._newHigh = e.detail.high, this._editing = null, this._mode = "add";
    }, this._onEdit = (e) => {
      this._editing = e.detail.transition, this._mode = "edit";
    }, this._onDelete = async (e) => {
      if (!this.hass) return;
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      await this._writeSchedule(t);
    }, this._onUpdate = async (e) => {
      if (!this.hass) return;
      const { oldAt: t, transition: n } = e.detail, i = this._transitions.filter((o) => o.at !== t && o.at !== n.at).concat(n).sort(cr);
      await this._writeSchedule(i);
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
      n.sort(cr), await this._writeSchedule(n), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      await this._writeSchedule(t), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = $l(this.hass) ?? "home", this._subscribe());
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = $l(this.hass);
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
      const t = await Tc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (n) => {
          e === this._subscribeGen && (this._transitions = n?.baseline ? [...n.baseline].sort(cr) : [], this._loading = !1);
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
    if (this.hass)
      try {
        await Cc(this.hass, {
          zone: this.zone,
          profile: this._profile,
          transitions: e
        }), this._transitions = e;
      } catch (t) {
        this._error = t instanceof Error ? t.message : "Failed to save schedule.";
      }
  }
  render() {
    if (!this.hass) return at;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? Qh(this._transitions),
        high: this._newHigh ?? Xh(this._transitions)
      };
      return U`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return U`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? U`<div class="loading">Loading schedule…</div>` : this._error ? U`<div class="error">${this._error}</div>` : U`
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
    return this._transitions.length === 0 ? at : U`
      <ul class="list">
        ${this._transitions.map(
      (e) => U`
            <li
              @click=${() => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: e } }))}
            >
              <span class="at">${e.at}</span>
              <span>${e.low.toFixed(1)}° – ${e.high.toFixed(1)}°</span>
            </li>
          `
    )}
      </ul>
    `;
  }
};
xe.styles = [
  ce,
  te`
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
  Y({ attribute: !1 })
], xe.prototype, "hass", 2);
Ge([
  Y({ type: String })
], xe.prototype, "zone", 2);
Ge([
  $t()
], xe.prototype, "_profile", 2);
Ge([
  $t()
], xe.prototype, "_transitions", 2);
Ge([
  $t()
], xe.prototype, "_loading", 2);
Ge([
  $t()
], xe.prototype, "_error", 2);
Ge([
  $t()
], xe.prototype, "_mode", 2);
Ge([
  $t()
], xe.prototype, "_editing", 2);
Ge([
  $t()
], xe.prototype, "_newAt", 2);
xe = Ge([
  ae("comfort-band-schedule-tab")
], xe);
function $l(e) {
  const t = Ol(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Qh(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Xh(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var tf = Object.defineProperty, ef = Object.getOwnPropertyDescriptor, gi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ef(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && tf(t, n, o), o;
};
const nf = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "insights", label: "Insights" }
];
let je = class extends Vt {
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
    if (!this._isOpen) return at;
    const e = this.zoneName || this.zone || "Comfort Band";
    return U`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${nf.map(
      (t) => U`
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
        return U`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return U`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return U`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "insights":
        return U`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
je.styles = [
  ce,
  te`
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
gi([
  Y({ attribute: !1 })
], je.prototype, "hass", 2);
gi([
  Y({ type: String })
], je.prototype, "zone", 2);
gi([
  Y({ type: String })
], je.prototype, "zoneName", 2);
gi([
  Y({ attribute: !1 })
], je.prototype, "entities", 2);
gi([
  $t()
], je.prototype, "_activeTab", 2);
gi([
  $t()
], je.prototype, "_isOpen", 2);
gi([
  Bn("dialog")
], je.prototype, "_dialog", 2);
je = gi([
  ae("comfort-band-modal")
], je);
var of = Object.defineProperty, rf = Object.getOwnPropertyDescriptor, jr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? rf(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && of(t, n, o), o;
};
let In = class extends Vt {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (e) => {
      const t = e.target.value;
      this._fireConfig({ ...this.config, zone: t });
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
      return U`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return U`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? U`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (n) => U` <option value=${n} ?selected=${n === this.config.zone}>${n}</option> `
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
In.styles = [
  ce,
  te`
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
jr([
  Y({ attribute: !1 })
], In.prototype, "hass", 2);
jr([
  Y({ attribute: !1 })
], In.prototype, "config", 2);
In = jr([
  ae("comfort-band-card-editor")
], In);
var sf = Object.defineProperty, lf = Object.getOwnPropertyDescriptor, Eo = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? lf(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && sf(t, n, o), o;
};
let dn = class extends Vt {
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
    if (!this._config || !this.hass) return U``;
    const e = this._config.zone, t = Uc(this.hass, e);
    if (t.deviceId === null)
      return U`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const n = this._config.compact === !0, i = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return U`
      <comfort-band-tile
        zoneName=${o.zoneName}
        .roomTemp=${o.roomTemp}
        .low=${o.low}
        .high=${o.high}
        .action=${o.action}
        .overrideActive=${o.overrideActive}
        .overrideEnds=${o.overrideEnds}
        .noExpand=${n}
        .variant=${i}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${n ? null : U`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const n = (o) => o !== null ? e.states[o] : void 0, i = (o) => {
      const s = n(o);
      if (!s) return NaN;
      const l = parseFloat(s.state);
      return Number.isFinite(l) ? l : NaN;
    };
    return {
      zoneName: t.deviceName ?? this._config.zone,
      low: i(t.effectiveLow),
      high: i(t.effectiveHigh),
      roomTemp: i(t.roomTemperature),
      action: n(t.currentAction)?.state ?? "unknown",
      overrideActive: n(t.overrideActive)?.state === "on",
      overrideEnds: n(t.overrideEnds)?.state ?? null
    };
  }
};
dn.styles = [
  ce,
  te`
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
Eo([
  Y({ attribute: !1 })
], dn.prototype, "hass", 2);
Eo([
  $t()
], dn.prototype, "_config", 2);
Eo([
  Bn("comfort-band-modal")
], dn.prototype, "_modal", 2);
dn = Eo([
  ae("comfort-band-card")
], dn);
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
