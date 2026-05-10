const qn = globalThis, ur = qn.ShadowRoot && (qn.ShadyCSS === void 0 || qn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fr = Symbol(), cs = /* @__PURE__ */ new WeakMap();
let ul = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== fr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ur && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = cs.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && cs.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const fl = (t) => new ul(typeof t == "string" ? t : t + "", void 0, fr), te = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[s + 1], t[0]);
  return new ul(n, t, fr);
}, Fa = (t, e) => {
  if (ur) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), o = qn.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, t.appendChild(i);
  }
}, us = ur ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return fl(n);
})(t) : t;
const { is: Va, defineProperty: Ua, getOwnPropertyDescriptor: Ia, getOwnPropertyNames: ja, getOwnPropertySymbols: Ba, getPrototypeOf: Wa } = Object, so = globalThis, fs = so.trustedTypes, Ga = fs ? fs.emptyScript : "", Ya = so.reactiveElementPolyfillSupport, $n = (t, e) => t, Jn = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ga : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, hr = (t, e) => !Va(t, e), hs = { attribute: !0, type: String, converter: Jn, reflect: !1, useDefault: !1, hasChanged: hr };
Symbol.metadata ??= Symbol("metadata"), so.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ki = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = hs) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, n);
      o !== void 0 && Ua(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: o, set: s } = Ia(this.prototype, e) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const f = o?.call(this);
      s?.call(this, a), this.requestUpdate(e, f, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? hs;
  }
  static _$Ei() {
    if (this.hasOwnProperty($n("elementProperties"))) return;
    const e = Wa(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($n("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($n("properties"))) {
      const n = this.properties, i = [...ja(n), ...Ba(n)];
      for (const o of i) this.createProperty(o, n[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, o] of n) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const o = this._$Eu(n, i);
      o !== void 0 && this._$Eh.set(o, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) n.unshift(us(o));
    } else e !== void 0 && n.push(us(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Fa(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Jn).toAttribute(n, i.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Jn;
      this._$Em = o;
      const f = a.fromAttribute(n, s.type);
      this[o] = f ?? this._$Ej?.get(o) ?? f, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, o = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? hr)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: o, wrapped: s }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? n ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: a } = s, f = this[o];
        a !== !0 || this._$AL.has(o) || f === void 0 || this.C(o, void 0, s, f);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ki.elementStyles = [], Ki.shadowRootOptions = { mode: "open" }, Ki[$n("elementProperties")] = /* @__PURE__ */ new Map(), Ki[$n("finalized")] = /* @__PURE__ */ new Map(), Ya?.({ ReactiveElement: Ki }), (so.reactiveElementVersions ??= []).push("2.1.2");
const dr = globalThis, ds = (t) => t, Qn = dr.trustedTypes, ps = Qn ? Qn.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hl = "$lit$", ni = `lit$${Math.random().toFixed(9).slice(2)}$`, dl = "?" + ni, Ka = `<${dl}>`, Si = document, En = () => Si.createComment(""), kn = (t) => t === null || typeof t != "object" && typeof t != "function", pr = Array.isArray, qa = (t) => pr(t) || typeof t?.[Symbol.iterator] == "function", Io = `[ 	
\f\r]`, vn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ms = /-->/g, gs = />/g, bi = RegExp(`>|${Io}(?:([^\\s"'>=/]+)(${Io}*=${Io}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vs = /'/g, bs = /"/g, pl = /^(?:script|style|textarea|title)$/i, ml = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), F = ml(1), Wn = ml(2), Ji = Symbol.for("lit-noChange"), at = Symbol.for("lit-nothing"), _s = /* @__PURE__ */ new WeakMap(), xi = Si.createTreeWalker(Si, 129);
function gl(t, e) {
  if (!pr(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ps !== void 0 ? ps.createHTML(e) : e;
}
const Za = (t, e) => {
  const n = t.length - 1, i = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = vn;
  for (let f = 0; f < n; f++) {
    const h = t[f];
    let p, b, m = -1, v = 0;
    for (; v < h.length && (a.lastIndex = v, b = a.exec(h), b !== null); ) v = a.lastIndex, a === vn ? b[1] === "!--" ? a = ms : b[1] !== void 0 ? a = gs : b[2] !== void 0 ? (pl.test(b[2]) && (o = RegExp("</" + b[2], "g")), a = bi) : b[3] !== void 0 && (a = bi) : a === bi ? b[0] === ">" ? (a = o ?? vn, m = -1) : b[1] === void 0 ? m = -2 : (m = a.lastIndex - b[2].length, p = b[1], a = b[3] === void 0 ? bi : b[3] === '"' ? bs : vs) : a === bs || a === vs ? a = bi : a === ms || a === gs ? a = vn : (a = bi, o = void 0);
    const E = a === bi && t[f + 1].startsWith("/>") ? " " : "";
    s += a === vn ? h + Ka : m >= 0 ? (i.push(p), h.slice(0, m) + hl + h.slice(m) + ni + E) : h + ni + (m === -2 ? f : E);
  }
  return [gl(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Pn {
  constructor({ strings: e, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const f = e.length - 1, h = this.parts, [p, b] = Za(e, n);
    if (this.el = Pn.createElement(p, i), xi.currentNode = this.el.content, n === 2 || n === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = xi.nextNode()) !== null && h.length < f; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(hl)) {
          const v = b[a++], E = o.getAttribute(m).split(ni), P = /([.?@])?(.*)/.exec(v);
          h.push({ type: 1, index: s, name: P[2], strings: E, ctor: P[1] === "." ? Qa : P[1] === "?" ? Xa : P[1] === "@" ? tc : lo }), o.removeAttribute(m);
        } else m.startsWith(ni) && (h.push({ type: 6, index: s }), o.removeAttribute(m));
        if (pl.test(o.tagName)) {
          const m = o.textContent.split(ni), v = m.length - 1;
          if (v > 0) {
            o.textContent = Qn ? Qn.emptyScript : "";
            for (let E = 0; E < v; E++) o.append(m[E], En()), xi.nextNode(), h.push({ type: 2, index: ++s });
            o.append(m[v], En());
          }
        }
      } else if (o.nodeType === 8) if (o.data === dl) h.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(ni, m + 1)) !== -1; ) h.push({ type: 7, index: s }), m += ni.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const i = Si.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Qi(t, e, n = t, i) {
  if (e === Ji) return e;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = kn(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(t), o._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (e = Qi(t, o._$AS(t, e.values), o, i)), e;
}
class Ja {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: i } = this._$AD, o = (e?.creationScope ?? Si).importNode(n, !0);
    xi.currentNode = o;
    let s = xi.nextNode(), a = 0, f = 0, h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let p;
        h.type === 2 ? p = new zn(s, s.nextSibling, this, e) : h.type === 1 ? p = new h.ctor(s, h.name, h.strings, this, e) : h.type === 6 && (p = new ec(s, this, e)), this._$AV.push(p), h = i[++f];
      }
      a !== h?.index && (s = xi.nextNode(), a++);
    }
    return xi.currentNode = Si, o;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class zn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, i, o) {
    this.type = 2, this._$AH = at, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = Qi(this, e, n), kn(e) ? e === at || e == null || e === "" ? (this._$AH !== at && this._$AR(), this._$AH = at) : e !== this._$AH && e !== Ji && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qa(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== at && kn(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Si.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Pn.createElement(gl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new Ja(o, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = _s.get(e.strings);
    return n === void 0 && _s.set(e.strings, n = new Pn(e)), n;
  }
  k(e) {
    pr(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of e) o === n.length ? n.push(i = new zn(this.O(En()), this.O(En()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = ds(e).nextSibling;
      ds(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class lo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, o, s) {
    this.type = 1, this._$AH = at, this._$AN = void 0, this.element = e, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = at;
  }
  _$AI(e, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = Qi(this, e, n, 0), a = !kn(e) || e !== this._$AH && e !== Ji, a && (this._$AH = e);
    else {
      const f = e;
      let h, p;
      for (e = s[0], h = 0; h < s.length - 1; h++) p = Qi(this, f[i + h], n, h), p === Ji && (p = this._$AH[h]), a ||= !kn(p) || p !== this._$AH[h], p === at ? e = at : e !== at && (e += (p ?? "") + s[h + 1]), this._$AH[h] = p;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === at ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qa extends lo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === at ? void 0 : e;
  }
}
class Xa extends lo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== at);
  }
}
class tc extends lo {
  constructor(e, n, i, o, s) {
    super(e, n, i, o, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Qi(this, e, n, 0) ?? at) === Ji) return;
    const i = this._$AH, o = e === at && i !== at || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== at && (i === at || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ec {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Qi(this, e);
  }
}
const ic = dr.litHtmlPolyfillSupport;
ic?.(Pn, zn), (dr.litHtmlVersions ??= []).push("3.3.2");
const nc = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new zn(e.insertBefore(En(), s), s, void 0, n ?? {});
  }
  return o._$AI(t), o;
};
const mr = globalThis;
class It extends Ki {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = nc(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ji;
  }
}
It._$litElement$ = !0, It.finalized = !0, mr.litElementHydrateSupport?.({ LitElement: It });
const oc = mr.litElementPolyfillSupport;
oc?.({ LitElement: It });
(mr.litElementVersions ??= []).push("4.2.2");
const ae = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const rc = { attribute: !0, type: String, converter: Jn, reflect: !1, hasChanged: hr }, sc = (t = rc, e, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(n.name, t), i === "accessor") {
    const { name: a } = n;
    return { set(f) {
      const h = e.get.call(this);
      e.set.call(this, f), this.requestUpdate(a, h, t, !0, f);
    }, init(f) {
      return f !== void 0 && this.C(a, void 0, t, f), f;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(f) {
      const h = this[a];
      e.call(this, f), this.requestUpdate(a, h, t, !0, f);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function G(t) {
  return (e, n) => typeof n == "object" ? sc(t, e, n) : ((i, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(t, e, n);
}
function Pt(t) {
  return G({ ...t, state: !0, attribute: !1 });
}
const lc = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function Dn(t, e) {
  return (n, i, o) => {
    const s = (a) => a.renderRoot?.querySelector(t) ?? null;
    return lc(n, i, { get() {
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
function Xn(t) {
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
function to(t) {
  return t === "heating" || t === "cooling" || t === "idle" ? t : "unknown";
}
function Qo(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var ac = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, On = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? cc(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && ac(e, n, o), o;
};
const Xo = 15, vl = 28, uc = vl - Xo;
function jo(t) {
  return Number.isNaN(t) || !Number.isFinite(t) ? 0 : (Math.max(Xo, Math.min(vl, t)) - Xo) / uc * 100;
}
let Ai = class extends It {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const t = to(this.action), e = Xn(t), n = Number.isFinite(this.low), i = Number.isFinite(this.high), o = Number.isFinite(this.room), s = n ? jo(this.low) : 0, a = i ? jo(this.high) : 100, f = Math.min(s, a), h = Math.max(0, Math.abs(a - s)), p = o ? jo(this.room) : 50, b = (v) => Number.isFinite(v) ? `${v.toFixed(1)}°` : "—", m = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${t}`;
    return F`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${m}>
        ${Wn`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${n && i ? Wn`<rect class="band" x=${f} y="9" width=${h} height="6" rx="3" fill=${e}></rect>` : null}
        ${o ? Wn`<circle cx=${p} cy="12" r="4.5" fill=${e}></circle>` : null}
        ${o ? Wn`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${e}></circle>` : null}
      </svg>
    `;
  }
};
Ai.styles = [
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
On([
  G({ type: Number })
], Ai.prototype, "low", 2);
On([
  G({ type: Number })
], Ai.prototype, "high", 2);
On([
  G({ type: Number })
], Ai.prototype, "room", 2);
On([
  G({ type: String })
], Ai.prototype, "action", 2);
Ai = On([
  ae("band-gauge")
], Ai);
var fc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, Ue = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hc(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && fc(e, n, o), o;
};
let _e = class extends It {
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
    const t = dc(this.overrideEnds);
    return F`<div class="override-pill">Override${t ? ` · ${t}` : ""}</div>`;
  }
  _renderActionChip() {
    const t = to(this.action);
    if (t === "idle" || t === "unknown") return null;
    const e = Xn(t);
    return F`<span class="action-chip" style="background:${e}">
      ${Qo(t)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : F`
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
    const t = to(this.action), e = t === "heating" || t === "cooling", n = e ? `--cb-mini-bg:${Xn(t)}` : "", i = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${e ? `, ${Qo(t)}` : ""}`;
    return F`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${e ? "tinted" : ""}"
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
_e.styles = [
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
        background: var(--cb-mini-bg, var(--ha-card-background, var(--card-background-color, #ffffff)));
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
Ue([
  G({ type: String })
], _e.prototype, "zoneName", 2);
Ue([
  G({ type: Number })
], _e.prototype, "roomTemp", 2);
Ue([
  G({ type: Number })
], _e.prototype, "low", 2);
Ue([
  G({ type: Number })
], _e.prototype, "high", 2);
Ue([
  G({ type: String })
], _e.prototype, "action", 2);
Ue([
  G({ type: Boolean })
], _e.prototype, "overrideActive", 2);
Ue([
  G({ type: String })
], _e.prototype, "overrideEnds", 2);
Ue([
  G({ type: Boolean })
], _e.prototype, "noExpand", 2);
Ue([
  G({ type: String, reflect: !0 })
], _e.prototype, "variant", 2);
_e = Ue([
  ae("comfort-band-tile")
], _e);
function dc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const n = e - Date.now();
  if (n <= 0) return "";
  const i = Math.round(n / 6e4);
  if (i < 60) return `${i}m left`;
  const o = Math.floor(i / 60), s = i % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var pc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, qe = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? mc(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && pc(e, n, o), o;
};
let Ce = class extends It {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (t, e) => {
      t.preventDefault();
      const n = t.currentTarget;
      n.setPointerCapture(t.pointerId), this._dragging = e;
      const i = (s) => {
        this._setHandle(e, this._xToValue(s.clientX)) && this._fire("input");
      }, o = (s) => {
        n.releasePointerCapture(s.pointerId), n.removeEventListener("pointermove", i), n.removeEventListener("pointerup", o), n.removeEventListener("pointercancel", o), this._dragging = null, this._fire("change");
      };
      n.addEventListener("pointermove", i), n.addEventListener("pointerup", o), n.addEventListener("pointercancel", o);
    }, this._onTrackPointerDown = (t) => {
      if (t.target.classList.contains("thumb")) return;
      const e = this._xToValue(t.clientX), n = (this.low + this.high) / 2, i = e < n ? "low" : "high";
      this._setHandle(i, e) && this._fire("change");
    }, this._onKeyDown = (t, e) => {
      let n = 0;
      switch (t.key) {
        case "ArrowLeft":
        case "ArrowDown":
          n = -this.step;
          break;
        case "ArrowRight":
        case "ArrowUp":
          n = this.step;
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
      const i = e === "low" ? this.low : this.high;
      this._setHandle(e, i + n) && this._fire("change");
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
    const n = this._snap(e);
    if (t === "low") {
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
  _xToValue(t) {
    const e = this._track?.getBoundingClientRect();
    if (!e || e.width === 0) return this.min;
    const n = Math.max(0, Math.min(1, (t - e.left) / e.width));
    return this.min + n * (this.max - this.min);
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
    return F`
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
          @pointerdown=${(n) => this._onThumbPointerDown(n, "low")}
          @keydown=${(n) => this._onKeyDown(n, "low")}
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
Ce.styles = [
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
qe([
  G({ type: Number })
], Ce.prototype, "min", 2);
qe([
  G({ type: Number })
], Ce.prototype, "max", 2);
qe([
  G({ type: Number })
], Ce.prototype, "step", 2);
qe([
  G({ type: Number })
], Ce.prototype, "low", 2);
qe([
  G({ type: Number })
], Ce.prototype, "high", 2);
qe([
  G({ type: String })
], Ce.prototype, "unit", 2);
qe([
  Pt()
], Ce.prototype, "_dragging", 2);
qe([
  Dn(".track")
], Ce.prototype, "_track", 2);
Ce = qe([
  ae("dual-handle-slider")
], Ce);
const ao = "comfort_band";
function gc(t, e) {
  return t.callWS({
    type: "comfort_band/get_schedule",
    ...e
  });
}
function vc(t, e) {
  return t.callService(ao, "set_schedule", { ...e });
}
function bc(t, e) {
  const n = { zone: e.zone };
  return e.low !== void 0 && (n.low = e.low), e.high !== void 0 && (n.high = e.high), e.hours !== void 0 && (n.hours = e.hours), t.callService(ao, "start_override", n);
}
function _c(t, e) {
  return t.callService(ao, "cancel_override", { ...e });
}
function yc(t, e) {
  return t.callService(ao, "set_profile", { ...e });
}
var wc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, rn = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? xc(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && wc(e, n, o), o;
};
const $c = [1, 3, 6];
let oi = class extends It {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (t) => {
      this._pendingLow = t.detail.low, this._pendingHigh = t.detail.high;
    }, this._onSliderChange = (t) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, bc(this.hass, {
        zone: this.zone,
        low: t.detail.low,
        high: t.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || _c(this.hass, { zone: this.zone });
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
    const n = parseFloat(e.state);
    return Number.isFinite(n) ? n : NaN;
  }
  render() {
    if (!this.hass || !this.entities) return at;
    const t = this._numericState(this.entities.manualLow), e = this._numericState(this.entities.manualHigh), n = this._numericState(this.entities.effectiveLow), i = this._numericState(this.entities.effectiveHigh), o = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), a = this._stateOf(this.entities.currentAction)?.state ?? "unknown", f = this._stateOf(this.entities.overrideActive)?.state === "on", h = this._pendingLow ?? (Number.isFinite(t) ? t : 19), p = this._pendingHigh ?? (Number.isFinite(e) ? e : 22), b = to(a), m = b !== "idle" && b !== "unknown";
    return F`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${m ? F`<span class="action-chip" style="background:${Xn(b)}"
              >${Qo(b)}</span
            >` : at}
      </div>
      <div class="gauge-row">
        <band-gauge .low=${n} .high=${i} .room=${o} .action=${a}></band-gauge>
      </div>

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${16}
          .max=${26}
          .step=${0.5}
          .low=${h}
          .high=${p}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(f)} ${this._renderHoursSection(s)}
    `;
  }
  _renderOverrideSection(t) {
    if (!t) return at;
    const e = this._stateOf(this.entities.overrideEnds)?.state, n = Sc(e ?? null);
    return F`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${n ? ` · ${n}` : ""}</span>
          <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        </div>
      </section>
    `;
  }
  _renderHoursSection(t) {
    return this.entities?.overrideHours ? F`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${$c.map(
      (e) => F`
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
    ` : at;
  }
};
oi.styles = [
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
rn([
  G({ attribute: !1 })
], oi.prototype, "hass", 2);
rn([
  G({ type: String })
], oi.prototype, "zone", 2);
rn([
  G({ attribute: !1 })
], oi.prototype, "entities", 2);
rn([
  Pt()
], oi.prototype, "_pendingLow", 2);
rn([
  Pt()
], oi.prototype, "_pendingHigh", 2);
oi = rn([
  ae("comfort-band-now-tab")
], oi);
function Sc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const n = e - Date.now();
  if (n <= 0) return "";
  const i = Math.round(n / 6e4);
  if (i < 60) return `${i}m left`;
  const o = Math.floor(i / 60), s = i % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
const gr = "comfort_band", Ac = {
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
function Ec() {
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
function bl(t, e) {
  for (const n of Object.values(t.devices))
    for (const [i, o] of n.identifiers)
      if (i === e[0] && o === e[1])
        return n;
  return null;
}
function _l(t, e) {
  return Object.values(t.entities).filter(
    (n) => n.device_id === e && n.platform === gr
  );
}
function kc(t, e) {
  const n = Ec(), i = bl(t, [gr, `zone:${e}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of _l(t, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const a = Ac[s];
    a !== void 0 && (n[a] = o.entity_id);
  }
  return n;
}
function yl(t) {
  const e = bl(t, [gr, "profile_manager"]);
  if (e === null) return null;
  for (const n of _l(t, e.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
var Pc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, wl = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Tc(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Pc(e, n, o), o;
};
let eo = class extends It {
  _onSelect(t) {
    this.hass && yc(this.hass, { profile: t });
  }
  render() {
    if (!this.hass) return at;
    const t = yl(this.hass);
    if (t === null)
      return F`<div class="empty">Profile manager not registered yet.</div>`;
    const e = this.hass.states[t], n = e?.attributes.options, i = Array.isArray(n) ? n.filter((s) => typeof s == "string") : [], o = e?.state ?? "";
    return i.length === 0 ? F`<div class="empty">No profiles configured.</div>` : F`
      <ul role="listbox" aria-label="Profiles">
        ${i.map(
      (s) => F`
            <li
              role="option"
              tabindex="0"
              class=${s === o ? "active" : ""}
              aria-selected=${s === o}
              @click=${() => this._onSelect(s)}
              @keydown=${(a) => {
        (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this._onSelect(s));
      }}
            >
              <span class="name">${s}</span>
              ${s === o ? F`<span class="badge">Active</span>` : at}
            </li>
          `
    )}
      </ul>
      <div class="footer">Create / rename / delete profiles in a future release.</div>
    `;
  }
};
eo.styles = [
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
wl([
  G({ attribute: !1 })
], eo.prototype, "hass", 2);
eo = wl([
  ae("comfort-band-profiles-tab")
], eo);
const Cc = !0, Dt = "u-", Mc = "uplot", zc = Dt + "hz", Dc = Dt + "vt", Oc = Dt + "title", Nc = Dt + "wrap", Lc = Dt + "under", Hc = Dt + "over", Rc = Dt + "axis", wi = Dt + "off", Fc = Dt + "select", Vc = Dt + "cursor-x", Uc = Dt + "cursor-y", Ic = Dt + "cursor-pt", jc = Dt + "legend", Bc = Dt + "live", Wc = Dt + "inline", Gc = Dt + "series", Yc = Dt + "marker", ys = Dt + "label", Kc = Dt + "value", yn = "width", wn = "height", bn = "top", ws = "bottom", Yi = "left", Bo = "right", vr = "#000", xs = vr + "0", Wo = "mousemove", $s = "mousedown", Go = "mouseup", Ss = "mouseenter", As = "mouseleave", Es = "dblclick", qc = "resize", Zc = "scroll", ks = "change", io = "dppxchange", br = "--", sn = typeof window < "u", tr = sn ? document : null, Zi = sn ? window : null, Jc = sn ? navigator : null;
let lt, Gn;
function er() {
  let t = devicePixelRatio;
  lt != t && (lt = t, Gn && nr(ks, Gn, er), Gn = matchMedia(`(min-resolution: ${lt - 1e-3}dppx) and (max-resolution: ${lt + 1e-3}dppx)`), $i(ks, Gn, er), Zi.dispatchEvent(new CustomEvent(io)));
}
function se(t, e) {
  if (e != null) {
    let n = t.classList;
    !n.contains(e) && n.add(e);
  }
}
function ir(t, e) {
  let n = t.classList;
  n.contains(e) && n.remove(e);
}
function _t(t, e, n) {
  t.style[e] = n + "px";
}
function ke(t, e, n, i) {
  let o = tr.createElement(t);
  return e != null && se(o, e), n?.insertBefore(o, i), o;
}
function ve(t, e) {
  return ke("div", t, e);
}
const Ps = /* @__PURE__ */ new WeakMap();
function Re(t, e, n, i, o) {
  let s = "translate(" + e + "px," + n + "px)", a = Ps.get(t);
  s != a && (t.style.transform = s, Ps.set(t, s), e < 0 || n < 0 || e > i || n > o ? se(t, wi) : ir(t, wi));
}
const Ts = /* @__PURE__ */ new WeakMap();
function Cs(t, e, n) {
  let i = e + n, o = Ts.get(t);
  i != o && (Ts.set(t, i), t.style.background = e, t.style.borderColor = n);
}
const Ms = /* @__PURE__ */ new WeakMap();
function zs(t, e, n, i) {
  let o = e + "" + n, s = Ms.get(t);
  o != s && (Ms.set(t, o), t.style.height = n + "px", t.style.width = e + "px", t.style.marginLeft = i ? -e / 2 + "px" : 0, t.style.marginTop = i ? -n / 2 + "px" : 0);
}
const _r = { passive: !0 }, Qc = { ..._r, capture: !0 };
function $i(t, e, n, i) {
  e.addEventListener(t, n, i ? Qc : _r);
}
function nr(t, e, n, i) {
  e.removeEventListener(t, n, _r);
}
sn && er();
function Pe(t, e, n, i) {
  let o;
  n = n || 0, i = i || e.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : le((n + i) / 2), e[o] < t ? n = o : i = o;
  return t - e[n] <= e[i] - t ? n : i;
}
function xl(t) {
  return (n, i, o) => {
    let s = -1, a = -1;
    for (let f = i; f <= o; f++)
      if (t(n[f])) {
        s = f;
        break;
      }
    for (let f = o; f >= i; f--)
      if (t(n[f])) {
        a = f;
        break;
      }
    return [s, a];
  };
}
const $l = (t) => t != null, Sl = (t) => t != null && t > 0, co = xl($l), Xc = xl(Sl);
function tu(t, e, n, i = 0, o = !1) {
  let s = o ? Xc : co, a = o ? Sl : $l;
  [e, n] = s(t, e, n);
  let f = t[e], h = t[e];
  if (e > -1)
    if (i == 1)
      f = t[e], h = t[n];
    else if (i == -1)
      f = t[n], h = t[e];
    else
      for (let p = e; p <= n; p++) {
        let b = t[p];
        a(b) && (b < f ? f = b : b > h && (h = b));
      }
  return [f ?? dt, h ?? -dt];
}
function uo(t, e, n, i) {
  let o = Ns(t), s = Ns(e);
  t == e && (o == -1 ? (t *= n, e /= n) : (t /= n, e *= n));
  let a = n == 10 ? Ye : Al, f = o == 1 ? le : be, h = s == 1 ? be : le, p = f(a(zt(t))), b = h(a(zt(e))), m = Xi(n, p), v = Xi(n, b);
  return n == 10 && (p < 0 && (m = pt(m, -p)), b < 0 && (v = pt(v, -b))), i || n == 2 ? (t = m * o, e = v * s) : (t = Tl(t, m), e = fo(e, v)), [t, e];
}
function yr(t, e, n, i) {
  let o = uo(t, e, n, i);
  return t == 0 && (o[0] = 0), e == 0 && (o[1] = 0), o;
}
const wr = 0.1, Ds = {
  mode: 3,
  pad: wr
}, Sn = {
  pad: 0,
  soft: null,
  mode: 0
}, eu = {
  min: Sn,
  max: Sn
};
function no(t, e, n, i) {
  return ho(n) ? Os(t, e, n) : (Sn.pad = n, Sn.soft = i ? 0 : null, Sn.mode = i ? 3 : 0, Os(t, e, eu));
}
function rt(t, e) {
  return t ?? e;
}
function iu(t, e, n) {
  for (e = rt(e, 0), n = rt(n, t.length - 1); e <= n; ) {
    if (t[e] != null)
      return !0;
    e++;
  }
  return !1;
}
function Os(t, e, n) {
  let i = n.min, o = n.max, s = rt(i.pad, 0), a = rt(o.pad, 0), f = rt(i.hard, -dt), h = rt(o.hard, dt), p = rt(i.soft, dt), b = rt(o.soft, -dt), m = rt(i.mode, 0), v = rt(o.mode, 0), E = e - t, P = Ye(E), H = Zt(zt(t), zt(e)), V = Ye(H), I = zt(V - P);
  (E < 1e-24 || I > 10) && (E = 0, (t == 0 || e == 0) && (E = 1e-24, m == 2 && p != dt && (s = 0), v == 2 && b != -dt && (a = 0)));
  let x = E || H || 1e3, R = Ye(x), $ = Xi(10, le(R)), Z = x * (E == 0 ? t == 0 ? 0.1 : 1 : s), M = pt(Tl(t - Z, $ / 10), 24), J = t >= p && (m == 1 || m == 3 && M <= p || m == 2 && M >= p) ? p : dt, Y = Zt(f, M < J && t >= J ? J : Te(J, M)), tt = x * (E == 0 ? e == 0 ? 0.1 : 1 : a), W = pt(fo(e + tt, $ / 10), 24), S = e <= b && (v == 1 || v == 3 && W >= b || v == 2 && W <= b) ? b : -dt, q = Te(h, W > S && e <= S ? S : Zt(S, W));
  return Y == q && Y == 0 && (q = 100), [Y, q];
}
const nu = new Intl.NumberFormat(sn ? Jc.language : "en-US"), xr = (t) => nu.format(t), ue = Math, Zn = ue.PI, zt = ue.abs, le = ue.floor, Mt = ue.round, be = ue.ceil, Te = ue.min, Zt = ue.max, Xi = ue.pow, Ns = ue.sign, Ye = ue.log10, Al = ue.log2, ou = (t, e = 1) => ue.sinh(t) * e, Yo = (t, e = 1) => ue.asinh(t / e), dt = 1 / 0;
function Ls(t) {
  return (Ye((t ^ t >> 31) - (t >> 31)) | 0) + 1;
}
function or(t, e, n) {
  return Te(Zt(t, e), n);
}
function El(t) {
  return typeof t == "function";
}
function et(t) {
  return El(t) ? t : () => t;
}
const ru = () => {
}, kl = (t) => t, Pl = (t, e) => e, su = (t) => null, Hs = (t) => !0, Rs = (t, e) => t == e, lu = /\.\d*?(?=9{6,}|0{6,})/gm, Ei = (t) => {
  if (Ml(t) || ri.has(t))
    return t;
  const e = `${t}`, n = e.match(lu);
  if (n == null)
    return t;
  let i = n[0].length - 1;
  if (e.indexOf("e-") != -1) {
    let [o, s] = e.split("e");
    return +`${Ei(o)}e${s}`;
  }
  return pt(t, i);
};
function _i(t, e) {
  return Ei(pt(Ei(t / e)) * e);
}
function fo(t, e) {
  return Ei(be(Ei(t / e)) * e);
}
function Tl(t, e) {
  return Ei(le(Ei(t / e)) * e);
}
function pt(t, e = 0) {
  if (Ml(t))
    return t;
  let n = 10 ** e, i = t * n * (1 + Number.EPSILON);
  return Mt(i) / n;
}
const ri = /* @__PURE__ */ new Map();
function Cl(t) {
  return (("" + t).split(".")[1] || "").length;
}
function Tn(t, e, n, i) {
  let o = [], s = i.map(Cl);
  for (let a = e; a < n; a++) {
    let f = zt(a), h = pt(Xi(t, a), f);
    for (let p = 0; p < i.length; p++) {
      let b = t == 10 ? +`${i[p]}e${a}` : i[p] * h, m = (a >= 0 ? 0 : f) + (a >= s[p] ? 0 : s[p]), v = t == 10 ? b : pt(b, m);
      o.push(v), ri.set(v, m);
    }
  }
  return o;
}
const An = {}, $r = [], tn = [null, null], ii = Array.isArray, Ml = Number.isInteger, au = (t) => t === void 0;
function Fs(t) {
  return typeof t == "string";
}
function ho(t) {
  let e = !1;
  if (t != null) {
    let n = t.constructor;
    e = n == null || n == Object;
  }
  return e;
}
function cu(t) {
  return t != null && typeof t == "object";
}
const uu = Object.getPrototypeOf(Uint8Array), zl = "__proto__";
function en(t, e = ho) {
  let n;
  if (ii(t)) {
    let i = t.find((o) => o != null);
    if (ii(i) || e(i)) {
      n = Array(t.length);
      for (let o = 0; o < t.length; o++)
        n[o] = en(t[o], e);
    } else
      n = t.slice();
  } else if (t instanceof uu)
    n = t.slice();
  else if (e(t)) {
    n = {};
    for (let i in t)
      i != zl && (n[i] = en(t[i], e));
  } else
    n = t;
  return n;
}
function kt(t) {
  let e = arguments;
  for (let n = 1; n < e.length; n++) {
    let i = e[n];
    for (let o in i)
      o != zl && (ho(t[o]) ? kt(t[o], en(i[o])) : t[o] = en(i[o]));
  }
  return t;
}
const fu = 0, hu = 1, du = 2;
function pu(t, e, n) {
  for (let i = 0, o, s = -1; i < e.length; i++) {
    let a = e[i];
    if (a > s) {
      for (o = a - 1; o >= 0 && t[o] == null; )
        t[o--] = null;
      for (o = a + 1; o < n && t[o] == null; )
        t[s = o++] = null;
    }
  }
}
function mu(t, e) {
  if (bu(t)) {
    let a = t[0].slice();
    for (let f = 1; f < t.length; f++)
      a.push(...t[f].slice(1));
    return _u(a[0]) || (a = vu(a)), a;
  }
  let n = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length; a++) {
    let h = t[a][0], p = h.length;
    for (let b = 0; b < p; b++)
      n.add(h[b]);
  }
  let i = [Array.from(n).sort((a, f) => a - f)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let a = 0; a < o; a++)
    s.set(i[0][a], a);
  for (let a = 0; a < t.length; a++) {
    let f = t[a], h = f[0];
    for (let p = 1; p < f.length; p++) {
      let b = f[p], m = Array(o).fill(void 0), v = e ? e[a][p] : hu, E = [];
      for (let P = 0; P < b.length; P++) {
        let H = b[P], V = s.get(h[P]);
        H === null ? v != fu && (m[V] = H, v == du && E.push(V)) : m[V] = H;
      }
      pu(m, E, o), i.push(m);
    }
  }
  return i;
}
const gu = typeof queueMicrotask > "u" ? (t) => Promise.resolve().then(t) : queueMicrotask;
function vu(t) {
  let e = t[0], n = e.length, i = Array(n);
  for (let s = 0; s < i.length; s++)
    i[s] = s;
  i.sort((s, a) => e[s] - e[a]);
  let o = [];
  for (let s = 0; s < t.length; s++) {
    let a = t[s], f = Array(n);
    for (let h = 0; h < n; h++)
      f[h] = a[i[h]];
    o.push(f);
  }
  return o;
}
function bu(t) {
  let e = t[0][0], n = e.length;
  for (let i = 1; i < t.length; i++) {
    let o = t[i][0];
    if (o.length != n)
      return !1;
    if (o != e) {
      for (let s = 0; s < n; s++)
        if (o[s] != e[s])
          return !1;
    }
  }
  return !0;
}
function _u(t, e = 100) {
  const n = t.length;
  if (n <= 1)
    return !0;
  let i = 0, o = n - 1;
  for (; i <= o && t[i] == null; )
    i++;
  for (; o >= i && t[o] == null; )
    o--;
  if (o <= i)
    return !0;
  const s = Zt(1, le((o - i + 1) / e));
  for (let a = t[i], f = i + s; f <= o; f += s) {
    const h = t[f];
    if (h != null) {
      if (h <= a)
        return !1;
      a = h;
    }
  }
  return !0;
}
const Dl = [
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
], Ol = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Nl(t) {
  return t.slice(0, 3);
}
const yu = Ol.map(Nl), wu = Dl.map(Nl), xu = {
  MMMM: Dl,
  MMM: wu,
  WWWW: Ol,
  WWW: yu
};
function _n(t) {
  return (t < 10 ? "0" : "") + t;
}
function $u(t) {
  return (t < 10 ? "00" : t < 100 ? "0" : "") + t;
}
const Su = {
  // 2019
  YYYY: (t) => t.getFullYear(),
  // 19
  YY: (t) => (t.getFullYear() + "").slice(2),
  // July
  MMMM: (t, e) => e.MMMM[t.getMonth()],
  // Jul
  MMM: (t, e) => e.MMM[t.getMonth()],
  // 07
  MM: (t) => _n(t.getMonth() + 1),
  // 7
  M: (t) => t.getMonth() + 1,
  // 09
  DD: (t) => _n(t.getDate()),
  // 9
  D: (t) => t.getDate(),
  // Monday
  WWWW: (t, e) => e.WWWW[t.getDay()],
  // Mon
  WWW: (t, e) => e.WWW[t.getDay()],
  // 03
  HH: (t) => _n(t.getHours()),
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
  mm: (t) => _n(t.getMinutes()),
  // 9
  m: (t) => t.getMinutes(),
  // 09
  ss: (t) => _n(t.getSeconds()),
  // 9
  s: (t) => t.getSeconds(),
  // 374
  fff: (t) => $u(t.getMilliseconds())
};
function Sr(t, e) {
  e = e || xu;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(t); )
    n.push(o[0][0] == "{" ? Su[o[1]] : o[0]);
  return (s) => {
    let a = "";
    for (let f = 0; f < n.length; f++)
      a += typeof n[f] == "string" ? n[f] : n[f](s, e);
    return a;
  };
}
const Au = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Eu(t, e) {
  let n;
  return e == "UTC" || e == "Etc/UTC" ? n = new Date(+t + t.getTimezoneOffset() * 6e4) : e == Au ? n = t : (n = new Date(t.toLocaleString("en-US", { timeZone: e })), n.setMilliseconds(t.getMilliseconds())), n;
}
const Ll = (t) => t % 1 == 0, oo = [1, 2, 2.5, 5], ku = Tn(10, -32, 0, oo), Hl = Tn(10, 0, 32, oo), Pu = Hl.filter(Ll), yi = ku.concat(Hl), Ar = `
`, Rl = "{YYYY}", Vs = Ar + Rl, Fl = "{M}/{D}", xn = Ar + Fl, Yn = xn + "/{YY}", Vl = "{aa}", Tu = "{h}:{mm}", qi = Tu + Vl, Us = Ar + qi, Is = ":{ss}", ut = null;
function Ul(t) {
  let e = t * 1e3, n = e * 60, i = n * 60, o = i * 24, s = o * 30, a = o * 365, h = (t == 1 ? Tn(10, 0, 3, oo).filter(Ll) : Tn(10, -3, 0, oo)).concat([
    // minute divisors (# of secs)
    e,
    e * 5,
    e * 10,
    e * 15,
    e * 30,
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
    a,
    a * 2,
    a * 5,
    a * 10,
    a * 25,
    a * 50,
    a * 100
  ]);
  const p = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [a, Rl, ut, ut, ut, ut, ut, ut, 1],
    [o * 28, "{MMM}", Vs, ut, ut, ut, ut, ut, 1],
    [o, Fl, Vs, ut, ut, ut, ut, ut, 1],
    [i, "{h}" + Vl, Yn, ut, xn, ut, ut, ut, 1],
    [n, qi, Yn, ut, xn, ut, ut, ut, 1],
    [e, Is, Yn + " " + qi, ut, xn + " " + qi, ut, Us, ut, 1],
    [t, Is + ".{fff}", Yn + " " + qi, ut, xn + " " + qi, ut, Us, ut, 1]
  ];
  function b(m) {
    return (v, E, P, H, V, I) => {
      let x = [], R = V >= a, $ = V >= s && V < a, Z = m(P), M = pt(Z * t, 3), J = Ko(Z.getFullYear(), R ? 0 : Z.getMonth(), $ || R ? 1 : Z.getDate()), Y = pt(J * t, 3);
      if ($ || R) {
        let tt = $ ? V / s : 0, W = R ? V / a : 0, S = M == Y ? M : pt(Ko(J.getFullYear() + W, J.getMonth() + tt, 1) * t, 3), q = new Date(Mt(S / t)), z = q.getFullYear(), j = q.getMonth();
        for (let L = 0; S <= H; L++) {
          let it = Ko(z + W * L, j + tt * L, 1), N = it - m(pt(it * t, 3));
          S = pt((+it + N) * t, 3), S <= H && x.push(S);
        }
      } else {
        let tt = V >= o ? o : V, W = le(P) - le(M), S = Y + W + fo(M - Y, tt);
        x.push(S);
        let q = m(S), z = q.getHours() + q.getMinutes() / n + q.getSeconds() / i, j = V / i, L = v.axes[E]._space, it = I / L;
        for (; S = pt(S + V, t == 1 ? 0 : 3), !(S > H); )
          if (j > 1) {
            let N = le(pt(z + j, 6)) % 24, nt = m(S).getHours() - N;
            nt > 1 && (nt = -1), S -= nt * i, z = (z + j) % 24;
            let ft = x[x.length - 1];
            pt((S - ft) / V, 3) * it >= 0.7 && x.push(S);
          } else
            x.push(S);
      }
      return x;
    };
  }
  return [
    h,
    p,
    b
  ];
}
const [Cu, Mu, zu] = Ul(1), [Du, Ou, Nu] = Ul(1e-3);
Tn(2, -53, 53, [1]);
function js(t, e) {
  return t.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : e(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function Bs(t, e) {
  return (n, i, o, s, a) => {
    let f = e.find((P) => a >= P[0]) || e[e.length - 1], h, p, b, m, v, E;
    return i.map((P) => {
      let H = t(P), V = H.getFullYear(), I = H.getMonth(), x = H.getDate(), R = H.getHours(), $ = H.getMinutes(), Z = H.getSeconds(), M = V != h && f[2] || I != p && f[3] || x != b && f[4] || R != m && f[5] || $ != v && f[6] || Z != E && f[7] || f[1];
      return h = V, p = I, b = x, m = R, v = $, E = Z, M(H);
    });
  };
}
function Lu(t, e) {
  let n = Sr(e);
  return (i, o, s, a, f) => o.map((h) => n(t(h)));
}
function Ko(t, e, n) {
  return new Date(t, e, n);
}
function Ws(t, e) {
  return e(t);
}
const Hu = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Gs(t, e) {
  return (n, i, o, s) => s == null ? br : e(t(i));
}
function Ru(t, e) {
  let n = t.series[e];
  return n.width ? n.stroke(t, e) : n.points.width ? n.points.stroke(t, e) : null;
}
function Fu(t, e) {
  return t.series[e].fill(t, e);
}
const Vu = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: ru,
  markers: {
    show: !0,
    width: 2,
    stroke: Ru,
    fill: Fu,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Uu(t, e) {
  let n = t.cursor.points, i = ve(), o = n.size(t, e);
  _t(i, yn, o), _t(i, wn, o);
  let s = o / -2;
  _t(i, "marginLeft", s), _t(i, "marginTop", s);
  let a = n.width(t, e, o);
  return a && _t(i, "borderWidth", a), i;
}
function Iu(t, e) {
  let n = t.series[e].points;
  return n._fill || n._stroke;
}
function ju(t, e) {
  let n = t.series[e].points;
  return n._stroke || n._fill;
}
function Bu(t, e) {
  return t.series[e].points.size;
}
const qo = [0, 0];
function Wu(t, e, n) {
  return qo[0] = e, qo[1] = n, qo;
}
function Kn(t, e, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == e) && n(o);
  };
}
function Zo(t, e, n, i = !0) {
  return (o) => {
    (!i || o.target == e) && n(o);
  };
}
const Gu = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: Wu,
  points: {
    one: !1,
    show: Uu,
    size: Bu,
    width: 0,
    stroke: ju,
    fill: Iu
  },
  bind: {
    mousedown: Kn,
    mouseup: Kn,
    click: Kn,
    // legend clicks, not .u-over clicks
    dblclick: Kn,
    mousemove: Zo,
    mouseleave: Zo,
    mouseenter: Zo
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
    dist: (t, e, n, i, o) => i - o,
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
}, Il = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Er = kt({}, Il, {
  filter: Pl
}), jl = kt({}, Er, {
  size: 10
}), Bl = kt({}, Il, {
  show: !1
}), kr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Wl = "bold " + kr, Gl = 1.5, Ys = {
  show: !0,
  scale: "x",
  stroke: vr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Wl,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Er,
  ticks: jl,
  border: Bl,
  font: kr,
  lineGap: Gl,
  rotate: 0
}, Yu = "Value", Ku = "Time", Ks = {
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
function qu(t, e, n, i, o) {
  return e.map((s) => s == null ? "" : xr(s));
}
function Zu(t, e, n, i, o, s, a) {
  let f = [], h = ri.get(o) || 0;
  n = a ? n : pt(fo(n, o), h);
  for (let p = n; p <= i; p = pt(p + o, h))
    f.push(Object.is(p, -0) ? 0 : p);
  return f;
}
function rr(t, e, n, i, o, s, a) {
  const f = [], h = t.scales[t.axes[e].scale].log, p = h == 10 ? Ye : Al, b = le(p(n));
  o = Xi(h, b), h == 10 && (o = yi[Pe(o, yi)]);
  let m = n, v = o * h;
  h == 10 && (v = yi[Pe(v, yi)]);
  do
    f.push(m), m = m + o, h == 10 && !ri.has(m) && (m = pt(m, ri.get(o))), m >= v && (o = m, v = o * h, h == 10 && (v = yi[Pe(v, yi)]));
  while (m <= i);
  return f;
}
function Ju(t, e, n, i, o, s, a) {
  let h = t.scales[t.axes[e].scale].asinh, p = i > h ? rr(t, e, Zt(h, n), i, o) : [h], b = i >= 0 && n <= 0 ? [0] : [];
  return (n < -h ? rr(t, e, Zt(h, -i), -n, o) : [h]).reverse().map((v) => -v).concat(b, p);
}
const Yl = /./, Qu = /[12357]/, Xu = /[125]/, qs = /1/, sr = (t, e, n, i) => t.map((o, s) => e == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function tf(t, e, n, i, o) {
  let s = t.axes[n], a = s.scale, f = t.scales[a], h = t.valToPos, p = s._space, b = h(10, a), m = h(9, a) - b >= p ? Yl : h(7, a) - b >= p ? Qu : h(5, a) - b >= p ? Xu : qs;
  if (m == qs) {
    let v = zt(h(1, a) - b);
    if (v < p)
      return sr(e.slice().reverse(), f.distr, m, be(p / v)).reverse();
  }
  return sr(e, f.distr, m, 1);
}
function ef(t, e, n, i, o) {
  let s = t.axes[n], a = s.scale, f = s._space, h = t.valToPos, p = zt(h(1, a) - h(2, a));
  return p < f ? sr(e.slice().reverse(), 3, Yl, be(f / p)).reverse() : e;
}
function nf(t, e, n, i) {
  return i == null ? br : e == null ? "" : xr(e);
}
const Zs = {
  show: !0,
  scale: "y",
  stroke: vr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Wl,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Er,
  ticks: jl,
  border: Bl,
  font: kr,
  lineGap: Gl,
  rotate: 0
};
function of(t, e) {
  let n = 3 + (t || 1) * 2;
  return pt(n * e, 3);
}
function rf(t, e) {
  let { scale: n, idxs: i } = t.series[0], o = t._data[0], s = t.valToPos(o[i[0]], n, !0), a = t.valToPos(o[i[1]], n, !0), f = zt(a - s), h = t.series[e], p = f / (h.points.space * lt);
  return i[1] - i[0] <= p;
}
const Js = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: dt,
  max: -dt
}, Kl = (t, e, n, i, o) => o, Qs = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Kl,
  alpha: 1,
  facets: [
    kt({}, Js, { scale: "x" }),
    kt({}, Js, { scale: "y" })
  ]
}, Xs = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Kl,
  alpha: 1,
  points: {
    show: rf,
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
function sf(t, e, n, i, o) {
  return n / 10;
}
const ql = {
  time: Cc,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, lf = kt({}, ql, {
  time: !1,
  ori: 1
}), tl = {};
function Zl(t, e) {
  let n = tl[t];
  return n || (n = {
    key: t,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, a, f, h, p) {
      for (let b = 0; b < n.plots.length; b++)
        n.plots[b] != o && n.plots[b].pub(i, o, s, a, f, h, p);
    }
  }, t != null && (tl[t] = n)), n;
}
const nn = 1, lr = 2;
function ki(t, e, n) {
  const i = t.mode, o = t.series[e], s = i == 2 ? t._data[e] : t._data, a = t.scales, f = t.bbox;
  let h = s[0], p = i == 2 ? s[1] : s[e], b = i == 2 ? a[o.facets[0].scale] : a[t.series[0].scale], m = i == 2 ? a[o.facets[1].scale] : a[o.scale], v = f.left, E = f.top, P = f.width, H = f.height, V = t.valToPosH, I = t.valToPosV;
  return b.ori == 0 ? n(
    o,
    h,
    p,
    b,
    m,
    V,
    I,
    v,
    E,
    P,
    H,
    mo,
    ln,
    vo,
    Ql,
    ta
  ) : n(
    o,
    h,
    p,
    b,
    m,
    I,
    V,
    E,
    v,
    H,
    P,
    go,
    an,
    Cr,
    Xl,
    ea
  );
}
function Pr(t, e) {
  let n = 0, i = 0, o = rt(t.bands, $r);
  for (let s = 0; s < o.length; s++) {
    let a = o[s];
    a.series[0] == e ? n = a.dir : a.series[1] == e && (a.dir == 1 ? i |= 1 : i |= 2);
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
function af(t, e, n, i, o) {
  let s = t.mode, a = t.series[e], f = s == 2 ? a.facets[1].scale : a.scale, h = t.scales[f];
  return o == -1 ? h.min : o == 1 ? h.max : h.distr == 3 ? h.dir == 1 ? h.min : h.max : 0;
}
function Ke(t, e, n, i, o, s) {
  return ki(t, e, (a, f, h, p, b, m, v, E, P, H, V) => {
    let I = a.pxRound;
    const x = p.dir * (p.ori == 0 ? 1 : -1), R = p.ori == 0 ? ln : an;
    let $, Z;
    x == 1 ? ($ = n, Z = i) : ($ = i, Z = n);
    let M = I(m(f[$], p, H, E)), J = I(v(h[$], b, V, P)), Y = I(m(f[Z], p, H, E)), tt = I(v(s == 1 ? b.max : b.min, b, V, P)), W = new Path2D(o);
    return R(W, Y, tt), R(W, M, tt), R(W, M, J), W;
  });
}
function po(t, e, n, i, o, s) {
  let a = null;
  if (t.length > 0) {
    a = new Path2D();
    const f = e == 0 ? vo : Cr;
    let h = n;
    for (let m = 0; m < t.length; m++) {
      let v = t[m];
      if (v[1] > v[0]) {
        let E = v[0] - h;
        E > 0 && f(a, h, i, E, i + s), h = v[1];
      }
    }
    let p = n + o - h, b = 10;
    p > 0 && f(a, h, i - b / 2, p, i + s + b);
  }
  return a;
}
function cf(t, e, n) {
  let i = t[t.length - 1];
  i && i[0] == e ? i[1] = n : t.push([e, n]);
}
function Tr(t, e, n, i, o, s, a) {
  let f = [], h = t.length;
  for (let p = o == 1 ? n : i; p >= n && p <= i; p += o)
    if (e[p] === null) {
      let m = p, v = p;
      if (o == 1)
        for (; ++p <= i && e[p] === null; )
          v = p;
      else
        for (; --p >= n && e[p] === null; )
          v = p;
      let E = s(t[m]), P = v == m ? E : s(t[v]), H = m - o;
      E = a <= 0 && H >= 0 && H < h ? s(t[H]) : E;
      let I = v + o;
      P = a >= 0 && I >= 0 && I < h ? s(t[I]) : P, P >= E && f.push([E, P]);
    }
  return f;
}
function el(t) {
  return t == 0 ? kl : t == 1 ? Mt : (e) => _i(e, t);
}
function Jl(t) {
  let e = t == 0 ? mo : go, n = t == 0 ? (o, s, a, f, h, p) => {
    o.arcTo(s, a, f, h, p);
  } : (o, s, a, f, h, p) => {
    o.arcTo(a, s, h, f, p);
  }, i = t == 0 ? (o, s, a, f, h) => {
    o.rect(s, a, f, h);
  } : (o, s, a, f, h) => {
    o.rect(a, s, h, f);
  };
  return (o, s, a, f, h, p = 0, b = 0) => {
    p == 0 && b == 0 ? i(o, s, a, f, h) : (p = Te(p, f / 2, h / 2), b = Te(b, f / 2, h / 2), e(o, s + p, a), n(o, s + f, a, s + f, a + h, p), n(o, s + f, a + h, s, a + h, b), n(o, s, a + h, s, a, b), n(o, s, a, s + f, a, p), o.closePath());
  };
}
const mo = (t, e, n) => {
  t.moveTo(e, n);
}, go = (t, e, n) => {
  t.moveTo(n, e);
}, ln = (t, e, n) => {
  t.lineTo(e, n);
}, an = (t, e, n) => {
  t.lineTo(n, e);
}, vo = Jl(0), Cr = Jl(1), Ql = (t, e, n, i, o, s) => {
  t.arc(e, n, i, o, s);
}, Xl = (t, e, n, i, o, s) => {
  t.arc(n, e, i, o, s);
}, ta = (t, e, n, i, o, s, a) => {
  t.bezierCurveTo(e, n, i, o, s, a);
}, ea = (t, e, n, i, o, s, a) => {
  t.bezierCurveTo(n, e, o, i, a, s);
};
function ia(t) {
  return (e, n, i, o, s) => ki(e, n, (a, f, h, p, b, m, v, E, P, H, V) => {
    let { pxRound: I, points: x } = a, R, $;
    p.ori == 0 ? (R = mo, $ = Ql) : (R = go, $ = Xl);
    const Z = pt(x.width * lt, 3);
    let M = (x.size - x.width) / 2 * lt, J = pt(M * 2, 3), Y = new Path2D(), tt = new Path2D(), { left: W, top: S, width: q, height: z } = e.bbox;
    vo(
      tt,
      W - J,
      S - J,
      q + J * 2,
      z + J * 2
    );
    const j = (L) => {
      if (h[L] != null) {
        let it = I(m(f[L], p, H, E)), N = I(v(h[L], b, V, P));
        R(Y, it + M, N), $(Y, it, N, M, 0, Zn * 2);
      }
    };
    if (s)
      s.forEach(j);
    else
      for (let L = i; L <= o; L++)
        j(L);
    return {
      stroke: Z > 0 ? Y : null,
      fill: Y,
      clip: tt,
      flags: nn | lr
    };
  });
}
function na(t) {
  return (e, n, i, o, s, a) => {
    i != o && (s != i && a != i && t(e, n, i), s != o && a != o && t(e, n, o), t(e, n, a));
  };
}
const uf = na(ln), ff = na(an);
function oa(t) {
  const e = rt(t?.alignGaps, 0);
  return (n, i, o, s) => ki(n, i, (a, f, h, p, b, m, v, E, P, H, V) => {
    [o, s] = co(h, o, s);
    let I = a.pxRound, x = (z) => I(m(z, p, H, E)), R = (z) => I(v(z, b, V, P)), $, Z;
    p.ori == 0 ? ($ = ln, Z = uf) : ($ = an, Z = ff);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: nn }, Y = J.stroke;
    let tt = !1;
    if (s - o >= H * 4) {
      let z = (D) => n.posToVal(D, p.key, !0), j = null, L = null, it, N, Jt, yt = x(f[M == 1 ? o : s]), nt = x(f[o]), ft = x(f[s]), Q = z(M == 1 ? nt + 1 : ft - 1);
      for (let D = M == 1 ? o : s; D >= o && D <= s; D += M) {
        let Tt = f[D], wt = (M == 1 ? Tt < Q : Tt > Q) ? yt : x(Tt), ct = h[D];
        wt == yt ? ct != null ? (N = ct, j == null ? ($(Y, wt, R(N)), it = j = L = N) : N < j ? j = N : N > L && (L = N)) : ct === null && (tt = !0) : (j != null && Z(Y, yt, R(j), R(L), R(it), R(N)), ct != null ? (N = ct, $(Y, wt, R(N)), j = L = it = N) : (j = L = null, ct === null && (tt = !0)), yt = wt, Q = z(yt + M));
      }
      j != null && j != L && Jt != yt && Z(Y, yt, R(j), R(L), R(it), R(N));
    } else
      for (let z = M == 1 ? o : s; z >= o && z <= s; z += M) {
        let j = h[z];
        j === null ? tt = !0 : j != null && $(Y, x(f[z]), R(j));
      }
    let [S, q] = Pr(n, i);
    if (a.fill != null || S != 0) {
      let z = J.fill = new Path2D(Y), j = a.fillTo(n, i, a.min, a.max, S), L = R(j), it = x(f[o]), N = x(f[s]);
      M == -1 && ([N, it] = [it, N]), $(z, N, L), $(z, it, L);
    }
    if (!a.spanGaps) {
      let z = [];
      tt && z.push(...Tr(f, h, o, s, M, x, e)), J.gaps = z = a.gaps(n, i, o, s, z), J.clip = po(z, p.ori, E, P, H, V);
    }
    return q != 0 && (J.band = q == 2 ? [
      Ke(n, i, o, s, Y, -1),
      Ke(n, i, o, s, Y, 1)
    ] : Ke(n, i, o, s, Y, q)), J;
  });
}
function hf(t) {
  const e = rt(t.align, 1), n = rt(t.ascDesc, !1), i = rt(t.alignGaps, 0), o = rt(t.extend, !1);
  return (s, a, f, h) => ki(s, a, (p, b, m, v, E, P, H, V, I, x, R) => {
    [f, h] = co(m, f, h);
    let $ = p.pxRound, { left: Z, width: M } = s.bbox, J = (nt) => $(P(nt, v, x, V)), Y = (nt) => $(H(nt, E, R, I)), tt = v.ori == 0 ? ln : an;
    const W = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: nn }, S = W.stroke, q = v.dir * (v.ori == 0 ? 1 : -1);
    let z = Y(m[q == 1 ? f : h]), j = J(b[q == 1 ? f : h]), L = j, it = j;
    o && e == -1 && (it = Z, tt(S, it, z)), tt(S, j, z);
    for (let nt = q == 1 ? f : h; nt >= f && nt <= h; nt += q) {
      let ft = m[nt];
      if (ft == null)
        continue;
      let Q = J(b[nt]), D = Y(ft);
      e == 1 ? tt(S, Q, z) : tt(S, L, D), tt(S, Q, D), z = D, L = Q;
    }
    let N = L;
    o && e == 1 && (N = Z + M, tt(S, N, z));
    let [Jt, yt] = Pr(s, a);
    if (p.fill != null || Jt != 0) {
      let nt = W.fill = new Path2D(S), ft = p.fillTo(s, a, p.min, p.max, Jt), Q = Y(ft);
      tt(nt, N, Q), tt(nt, it, Q);
    }
    if (!p.spanGaps) {
      let nt = [];
      nt.push(...Tr(b, m, f, h, q, J, i));
      let ft = p.width * lt / 2, Q = n || e == 1 ? ft : -ft, D = n || e == -1 ? -ft : ft;
      nt.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += D;
      }), W.gaps = nt = p.gaps(s, a, f, h, nt), W.clip = po(nt, v.ori, V, I, x, R);
    }
    return yt != 0 && (W.band = yt == 2 ? [
      Ke(s, a, f, h, S, -1),
      Ke(s, a, f, h, S, 1)
    ] : Ke(s, a, f, h, S, yt)), W;
  });
}
function il(t, e, n, i, o, s, a = dt) {
  if (t.length > 1) {
    let f = null;
    for (let h = 0, p = 1 / 0; h < t.length; h++)
      if (e[h] !== void 0) {
        if (f != null) {
          let b = zt(t[h] - t[f]);
          b < p && (p = b, a = zt(n(t[h], i, o, s) - n(t[f], i, o, s)));
        }
        f = h;
      }
  }
  return a;
}
function df(t) {
  t = t || An;
  const e = rt(t.size, [0.6, dt, 1]), n = t.align || 0, i = t.gap || 0;
  let o = t.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = et(o), a = 1 - e[0], f = rt(e[1], dt), h = rt(e[2], 1), p = rt(t.disp, An), b = rt(t.each, (E) => {
  }), { fill: m, stroke: v } = p;
  return (E, P, H, V) => ki(E, P, (I, x, R, $, Z, M, J, Y, tt, W, S) => {
    let q = I.pxRound, z = n, j = i * lt, L = f * lt, it = h * lt, N, Jt;
    $.ori == 0 ? [N, Jt] = s(E, P) : [Jt, N] = s(E, P);
    const yt = $.dir * ($.ori == 0 ? 1 : -1);
    let nt = $.ori == 0 ? vo : Cr, ft = $.ori == 0 ? b : (T, mt, Ct, Mi, ui, ze, fi) => {
      b(T, mt, Ct, ui, Mi, fi, ze);
    }, Q = rt(E.bands, $r).find((T) => T.series[0] == P), D = Q != null ? Q.dir : 0, Tt = I.fillTo(E, P, I.min, I.max, D), Wt = q(J(Tt, Z, S, tt)), wt, ct, xe, ee = W, $t = q(I.width * lt), Me = !1, Be = null, fe = null, Ze = null, Pi = null;
    m != null && ($t == 0 || v != null) && (Me = !0, Be = m.values(E, P, H, V), fe = /* @__PURE__ */ new Map(), new Set(Be).forEach((T) => {
      T != null && fe.set(T, new Path2D());
    }), $t > 0 && (Ze = v.values(E, P, H, V), Pi = /* @__PURE__ */ new Map(), new Set(Ze).forEach((T) => {
      T != null && Pi.set(T, new Path2D());
    })));
    let { x0: Ti, size: cn } = p;
    if (Ti != null && cn != null) {
      z = 1, x = Ti.values(E, P, H, V), Ti.unit == 2 && (x = x.map((Ct) => E.posToVal(Y + Ct * W, $.key, !0)));
      let T = cn.values(E, P, H, V);
      cn.unit == 2 ? ct = T[0] * W : ct = M(T[0], $, W, Y) - M(0, $, W, Y), ee = il(x, R, M, $, W, Y, ee), xe = ee - ct + j;
    } else
      ee = il(x, R, M, $, W, Y, ee), xe = ee * a + j, ct = ee - xe;
    xe < 1 && (xe = 0), $t >= ct / 2 && ($t = 0), xe < 5 && (q = kl);
    let Nn = xe > 0, ai = ee - xe - (Nn ? $t : 0);
    ct = q(or(ai, it, L)), wt = (z == 0 ? ct / 2 : z == yt ? 0 : ct) - z * yt * ((z == 0 ? j / 2 : 0) + (Nn ? $t / 2 : 0));
    const Gt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ci = Me ? null : new Path2D();
    let We = null;
    if (Q != null)
      We = E.data[Q.series[1]];
    else {
      let { y0: T, y1: mt } = p;
      T != null && mt != null && (R = mt.values(E, P, H, V), We = T.values(E, P, H, V));
    }
    let ci = N * ct, K = Jt * ct;
    for (let T = yt == 1 ? H : V; T >= H && T <= V; T += yt) {
      let mt = R[T];
      if (mt == null)
        continue;
      if (We != null) {
        let Qt = We[T] ?? 0;
        if (mt - Qt == 0)
          continue;
        Wt = J(Qt, Z, S, tt);
      }
      let Ct = $.distr != 2 || p != null ? x[T] : T, Mi = M(Ct, $, W, Y), ui = J(rt(mt, Tt), Z, S, tt), ze = q(Mi - wt), fi = q(Zt(ui, Wt)), ie = q(Te(ui, Wt)), he = fi - ie;
      if (mt != null) {
        let Qt = mt < 0 ? K : ci, $e = mt < 0 ? ci : K;
        Me ? ($t > 0 && Ze[T] != null && nt(Pi.get(Ze[T]), ze, ie + le($t / 2), ct, Zt(0, he - $t), Qt, $e), Be[T] != null && nt(fe.get(Be[T]), ze, ie + le($t / 2), ct, Zt(0, he - $t), Qt, $e)) : nt(Ci, ze, ie + le($t / 2), ct, Zt(0, he - $t), Qt, $e), ft(
          E,
          P,
          T,
          ze - $t / 2,
          ie,
          ct + $t,
          he
        );
      }
    }
    return $t > 0 ? Gt.stroke = Me ? Pi : Ci : Me || (Gt._fill = I.width == 0 ? I._fill : I._stroke ?? I._fill, Gt.width = 0), Gt.fill = Me ? fe : Ci, Gt;
  });
}
function pf(t, e) {
  const n = rt(e?.alignGaps, 0);
  return (i, o, s, a) => ki(i, o, (f, h, p, b, m, v, E, P, H, V, I) => {
    [s, a] = co(p, s, a);
    let x = f.pxRound, R = (N) => x(v(N, b, V, P)), $ = (N) => x(E(N, m, I, H)), Z, M, J;
    b.ori == 0 ? (Z = mo, J = ln, M = ta) : (Z = go, J = an, M = ea);
    const Y = b.dir * (b.ori == 0 ? 1 : -1);
    let tt = R(h[Y == 1 ? s : a]), W = tt, S = [], q = [];
    for (let N = Y == 1 ? s : a; N >= s && N <= a; N += Y)
      if (p[N] != null) {
        let yt = h[N], nt = R(yt);
        S.push(W = nt), q.push($(p[N]));
      }
    const z = { stroke: t(S, q, Z, J, M, x), fill: null, clip: null, band: null, gaps: null, flags: nn }, j = z.stroke;
    let [L, it] = Pr(i, o);
    if (f.fill != null || L != 0) {
      let N = z.fill = new Path2D(j), Jt = f.fillTo(i, o, f.min, f.max, L), yt = $(Jt);
      J(N, W, yt), J(N, tt, yt);
    }
    if (!f.spanGaps) {
      let N = [];
      N.push(...Tr(h, p, s, a, Y, R, n)), z.gaps = N = f.gaps(i, o, s, a, N), z.clip = po(N, b.ori, P, H, V, I);
    }
    return it != 0 && (z.band = it == 2 ? [
      Ke(i, o, s, a, j, -1),
      Ke(i, o, s, a, j, 1)
    ] : Ke(i, o, s, a, j, it)), z;
  });
}
function mf(t) {
  return pf(gf, t);
}
function gf(t, e, n, i, o, s) {
  const a = t.length;
  if (a < 2)
    return null;
  const f = new Path2D();
  if (n(f, t[0], e[0]), a == 2)
    i(f, t[1], e[1]);
  else {
    let h = Array(a), p = Array(a - 1), b = Array(a - 1), m = Array(a - 1);
    for (let v = 0; v < a - 1; v++)
      b[v] = e[v + 1] - e[v], m[v] = t[v + 1] - t[v], p[v] = b[v] / m[v];
    h[0] = p[0];
    for (let v = 1; v < a - 1; v++)
      p[v] === 0 || p[v - 1] === 0 || p[v - 1] > 0 != p[v] > 0 ? h[v] = 0 : (h[v] = 3 * (m[v - 1] + m[v]) / ((2 * m[v] + m[v - 1]) / p[v - 1] + (m[v] + 2 * m[v - 1]) / p[v]), isFinite(h[v]) || (h[v] = 0));
    h[a - 1] = p[a - 2];
    for (let v = 0; v < a - 1; v++)
      o(
        f,
        t[v] + m[v] / 3,
        e[v] + h[v] * m[v] / 3,
        t[v + 1] - m[v] / 3,
        e[v + 1] - h[v + 1] * m[v] / 3,
        t[v + 1],
        e[v + 1]
      );
  }
  return f;
}
const ar = /* @__PURE__ */ new Set();
function nl() {
  for (let t of ar)
    t.syncRect(!0);
}
sn && ($i(qc, Zi, nl), $i(Zc, Zi, nl, !0), $i(io, Zi, () => {
  Bt.pxRatio = lt;
}));
const vf = oa(), bf = ia();
function ol(t, e, n, i) {
  return (i ? [t[0], t[1]].concat(t.slice(2)) : [t[0]].concat(t.slice(1))).map((s, a) => cr(s, a, e, n));
}
function _f(t, e) {
  return t.map((n, i) => i == 0 ? {} : kt({}, e, n));
}
function cr(t, e, n, i) {
  return kt({}, e == 0 ? n : i, t);
}
function ra(t, e, n) {
  return e == null ? tn : [e, n];
}
const yf = ra;
function wf(t, e, n) {
  return e == null ? tn : no(e, n, wr, !0);
}
function sa(t, e, n, i) {
  return e == null ? tn : uo(e, n, t.scales[i].log, !1);
}
const xf = sa;
function la(t, e, n, i) {
  return e == null ? tn : yr(e, n, t.scales[i].log, !1);
}
const $f = la;
function Sf(t, e, n, i, o) {
  let s = Zt(Ls(t), Ls(e)), a = e - t, f = Pe(o / i * a, n);
  do {
    let h = n[f], p = i * h / a;
    if (p >= o && s + (h < 5 ? ri.get(h) : 0) <= 17)
      return [h, p];
  } while (++f < n.length);
  return [0, 0];
}
function rl(t) {
  let e, n;
  return t = t.replace(/(\d+)px/, (i, o) => (e = Mt((n = +o) * lt)) + "px"), [t, e, n];
}
function Af(t) {
  t.show && [t.font, t.labelFont].forEach((e) => {
    let n = pt(e[2] * lt, 1);
    e[0] = e[0].replace(/[0-9.]+px/, n + "px"), e[1] = n;
  });
}
function Bt(t, e, n) {
  const i = {
    mode: rt(t.mode, 1)
  }, o = i.mode;
  function s(r, l, c, u) {
    let d = l.valToPct(r);
    return u + c * (l.dir == -1 ? 1 - d : d);
  }
  function a(r, l, c, u) {
    let d = l.valToPct(r);
    return u + c * (l.dir == -1 ? d : 1 - d);
  }
  function f(r, l, c, u) {
    return l.ori == 0 ? s(r, l, c, u) : a(r, l, c, u);
  }
  i.valToPosH = s, i.valToPosV = a;
  let h = !1;
  i.status = 0;
  const p = i.root = ve(Mc);
  if (t.id != null && (p.id = t.id), se(p, t.class), t.title) {
    let r = ve(Oc, p);
    r.textContent = t.title;
  }
  const b = ke("canvas"), m = i.ctx = b.getContext("2d"), v = ve(Nc, p);
  $i("click", v, (r) => {
    r.target === P && (gt != Ii || xt != ji) && Ut.click(i, r);
  }, !0);
  const E = i.under = ve(Lc, v);
  v.appendChild(b);
  const P = i.over = ve(Hc, v);
  t = en(t);
  const H = +rt(t.pxAlign, 1), V = el(H);
  (t.plugins || []).forEach((r) => {
    r.opts && (t = r.opts(i, t) || t);
  });
  const I = t.ms || 1e-3, x = i.series = o == 1 ? ol(t.series || [], Ks, Xs, !1) : _f(t.series || [null], Qs), R = i.axes = ol(t.axes || [], Ys, Zs, !0), $ = i.scales = {}, Z = i.bands = t.bands || [];
  Z.forEach((r) => {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1);
  });
  const M = o == 2 ? x[1].facets[0].scale : x[0].scale, J = {
    axes: Sa,
    series: _a
  }, Y = (t.drawOrder || ["axes", "series"]).map((r) => J[r]);
  function tt(r) {
    const l = r.distr == 3 ? (c) => Ye(c > 0 ? c : r.clamp(i, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => Yo(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let u = l(c), { _min: d, _max: g } = r, _ = g - d;
      return (u - d) / _;
    };
  }
  function W(r) {
    let l = $[r];
    if (l == null) {
      let c = (t.scales || An)[r] || An;
      if (c.from != null) {
        W(c.from);
        let u = kt({}, $[c.from], c, { key: r });
        u.valToPct = tt(u), $[r] = u;
      } else {
        l = $[r] = kt({}, r == M ? ql : lf, c), l.key = r;
        let u = l.time, d = l.range, g = ii(d);
        if ((r != M || o == 2 && !u) && (g && (d[0] == null || d[1] == null) && (d = {
          min: d[0] == null ? Ds : {
            mode: 1,
            hard: d[0],
            soft: d[0]
          },
          max: d[1] == null ? Ds : {
            mode: 1,
            hard: d[1],
            soft: d[1]
          }
        }, g = !1), !g && ho(d))) {
          let _ = d;
          d = (y, w, A) => w == null ? tn : no(w, A, _);
        }
        l.range = et(d || (u ? yf : r == M ? l.distr == 3 ? xf : l.distr == 4 ? $f : ra : l.distr == 3 ? sa : l.distr == 4 ? la : wf)), l.auto = et(g ? !1 : l.auto), l.clamp = et(l.clamp || sf), l._min = l._max = null, l.valToPct = tt(l);
      }
    }
  }
  W("x"), W("y"), o == 1 && x.forEach((r) => {
    W(r.scale);
  }), R.forEach((r) => {
    W(r.scale);
  });
  for (let r in t.scales)
    W(r);
  const S = $[M], q = S.distr;
  let z, j;
  S.ori == 0 ? (se(p, zc), z = s, j = a) : (se(p, Dc), z = a, j = s);
  const L = {};
  for (let r in $) {
    let l = $[r];
    (l.min != null || l.max != null) && (L[r] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const it = t.tzDate || ((r) => new Date(Mt(r / I))), N = t.fmtDate || Sr, Jt = I == 1 ? zu(it) : Nu(it), yt = Bs(it, js(I == 1 ? Mu : Ou, N)), nt = Gs(it, Ws(Hu, N)), ft = [], Q = i.legend = kt({}, Vu, t.legend), D = i.cursor = kt({}, Gu, { drag: { y: o == 2 } }, t.cursor), Tt = Q.show, Wt = D.show, wt = Q.markers;
  Q.idxs = ft, wt.width = et(wt.width), wt.dash = et(wt.dash), wt.stroke = et(wt.stroke), wt.fill = et(wt.fill);
  let ct, xe, ee, $t = [], Me = [], Be, fe = !1, Ze = {};
  if (Q.live) {
    const r = x[1] ? x[1].values : null;
    fe = r != null, Be = fe ? r(i, 1, 0) : { _: 0 };
    for (let l in Be)
      Ze[l] = br;
  }
  if (Tt)
    if (ct = ke("table", jc, p), ee = ke("tbody", null, ct), Q.mount(i, ct), fe) {
      xe = ke("thead", null, ct, ee);
      let r = ke("tr", null, xe);
      ke("th", null, r);
      for (var Pi in Be)
        ke("th", ys, r).textContent = Pi;
    } else
      se(ct, Wc), Q.live && se(ct, Bc);
  const Ti = { show: !0 }, cn = { show: !1 };
  function Nn(r, l) {
    if (l == 0 && (fe || !Q.live || o == 2))
      return tn;
    let c = [], u = ke("tr", Gc, ee, ee.childNodes[l]);
    se(u, r.class), r.show || se(u, wi);
    let d = ke("th", null, u);
    if (wt.show) {
      let y = ve(Yc, d);
      if (l > 0) {
        let w = wt.width(i, l);
        w && (y.style.border = w + "px " + wt.dash(i, l) + " " + wt.stroke(i, l)), y.style.background = wt.fill(i, l);
      }
    }
    let g = ve(ys, d);
    r.label instanceof HTMLElement ? g.appendChild(r.label) : g.textContent = r.label, l > 0 && (wt.show || (g.style.color = r.width > 0 ? wt.stroke(i, l) : wt.fill(i, l)), Gt("click", d, (y) => {
      if (D._lock)
        return;
      di(y);
      let w = x.indexOf(r);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = x.some((k, C) => C > 0 && C != w && k.show);
        x.forEach((k, C) => {
          C > 0 && Oe(C, A ? C == w ? Ti : cn : Ti, !0, Et.setSeries);
        });
      } else
        Oe(w, { show: !r.show }, !0, Et.setSeries);
    }, !1), Di && Gt(Ss, d, (y) => {
      D._lock || (di(y), Oe(x.indexOf(r), Wi, !0, Et.setSeries));
    }, !1));
    for (var _ in Be) {
      let y = ke("td", Kc, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const ai = /* @__PURE__ */ new Map();
  function Gt(r, l, c, u = !0) {
    const d = ai.get(l) || {}, g = D.bind[r](i, l, c, u);
    g && ($i(r, l, d[r] = g), ai.set(l, d));
  }
  function Ci(r, l, c) {
    const u = ai.get(l) || {};
    for (let d in u)
      (r == null || d == r) && (nr(d, l, u[d]), delete u[d]);
    r == null && ai.delete(l);
  }
  let We = 0, ci = 0, K = 0, T = 0, mt = 0, Ct = 0, Mi = mt, ui = Ct, ze = K, fi = T, ie = 0, he = 0, Qt = 0, $e = 0;
  i.bbox = {};
  let _o = !1, Ln = !1, zi = !1, hi = !1, Hn = !1, de = !1;
  function yo(r, l, c) {
    (c || r != i.width || l != i.height) && Dr(r, l), Ri(!1), zi = !0, Ln = !0, Fi();
  }
  function Dr(r, l) {
    i.width = We = K = r, i.height = ci = T = l, mt = Ct = 0, ha(), da();
    let c = i.bbox;
    ie = c.left = _i(mt * lt, 0.5), he = c.top = _i(Ct * lt, 0.5), Qt = c.width = _i(K * lt, 0.5), $e = c.height = _i(T * lt, 0.5);
  }
  const ca = 3;
  function ua() {
    let r = !1, l = 0;
    for (; !r; ) {
      l++;
      let c = xa(l), u = $a(l);
      r = l == ca || c && u, r || (Dr(i.width, i.height), Ln = !0);
    }
  }
  function fa({ width: r, height: l }) {
    yo(r, l);
  }
  i.setSize = fa;
  function ha() {
    let r = !1, l = !1, c = !1, u = !1;
    R.forEach((d, g) => {
      if (d.show && d._show) {
        let { side: _, _size: y } = d, w = _ % 2, A = d.label != null ? d.labelSize : 0, k = y + A;
        k > 0 && (w ? (K -= k, _ == 3 ? (mt += k, u = !0) : c = !0) : (T -= k, _ == 0 ? (Ct += k, r = !0) : l = !0));
      }
    }), pi[0] = r, pi[1] = c, pi[2] = l, pi[3] = u, K -= Je[1] + Je[3], mt += Je[3], T -= Je[2] + Je[0], Ct += Je[0];
  }
  function da() {
    let r = mt + K, l = Ct + T, c = mt, u = Ct;
    function d(g, _) {
      switch (g) {
        case 1:
          return r += _, r - _;
        case 2:
          return l += _, l - _;
        case 3:
          return c -= _, c + _;
        case 0:
          return u -= _, u + _;
      }
    }
    R.forEach((g, _) => {
      if (g.show && g._show) {
        let y = g.side;
        g._pos = d(y, g._size), g.label != null && (g._lpos = d(y, g.labelSize));
      }
    });
  }
  if (D.dataIdx == null) {
    let r = D.hover, l = r.skip = new Set(r.skip ?? []);
    l.add(void 0);
    let c = r.prox = et(r.prox), u = r.bias ??= 0;
    D.dataIdx = (d, g, _, y) => {
      if (g == 0)
        return _;
      let w = _, A = c(d, g, _, y) ?? dt, k = A >= 0 && A < dt, C = S.ori == 0 ? K : T, B = D.left, st = e[0], ot = e[g];
      if (l.has(ot[_])) {
        w = null;
        let X = null, U = null, O;
        if (u == 0 || u == -1)
          for (O = _; X == null && O-- > 0; )
            l.has(ot[O]) || (X = O);
        if (u == 0 || u == 1)
          for (O = _; U == null && O++ < ot.length; )
            l.has(ot[O]) || (U = O);
        if (X != null || U != null)
          if (k) {
            let bt = X == null ? -1 / 0 : z(st[X], S, C, 0), St = U == null ? 1 / 0 : z(st[U], S, C, 0), Ft = B - bt, ht = St - B;
            Ft <= ht ? Ft <= A && (w = X) : ht <= A && (w = U);
          } else
            w = U == null ? X : X == null ? U : _ - X <= U - _ ? X : U;
      } else k && zt(B - z(st[_], S, C, 0)) > A && (w = null);
      return w;
    };
  }
  const di = (r) => {
    D.event = r;
  };
  D.idxs = ft, D._lock = !1;
  let jt = D.points;
  jt.show = et(jt.show), jt.size = et(jt.size), jt.stroke = et(jt.stroke), jt.width = et(jt.width), jt.fill = et(jt.fill);
  const De = i.focus = kt({}, t.focus || { alpha: 0.3 }, D.focus), Di = De.prox >= 0, Oi = Di && jt.one;
  let pe = [], Ni = [], Li = [];
  function Or(r, l) {
    let c = jt.show(i, l);
    if (c instanceof HTMLElement)
      return se(c, Ic), se(c, r.class), Re(c, -10, -10, K, T), P.insertBefore(c, pe[l]), c;
  }
  function Nr(r, l) {
    if (o == 1 || l > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? Fs(u) ? Gs(it, Ws(u, N)) : u || nt : u || nf, r.label = r.label || (c ? Ku : Yu);
    }
    if (Oi || l > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || vf || su, r.fillTo = et(r.fillTo || af), r.pxAlign = +rt(r.pxAlign, H), r.pxRound = el(r.pxAlign), r.stroke = et(r.stroke || null), r.fill = et(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = of(Zt(1, r.width), 1), u = r.points = kt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: bf,
        _stroke: null,
        _fill: null
      }, r.points);
      u.show = et(u.show), u.filter = et(u.filter), u.fill = et(u.fill), u.stroke = et(u.stroke), u.paths = et(u.paths), u.pxAlign = r.pxAlign;
    }
    if (Tt) {
      let c = Nn(r, l);
      $t.splice(l, 0, c[0]), Me.splice(l, 0, c[1]), Q.values.push(null);
    }
    if (Wt) {
      ft.splice(l, 0, null);
      let c = null;
      Oi ? l == 0 && (c = Or(r, l)) : l > 0 && (c = Or(r, l)), pe.splice(l, 0, c), Ni.splice(l, 0, 0), Li.splice(l, 0, 0);
    }
    Rt("addSeries", l);
  }
  function pa(r, l) {
    l = l ?? x.length, r = o == 1 ? cr(r, l, Ks, Xs) : cr(r, l, {}, Qs), x.splice(l, 0, r), Nr(x[l], l);
  }
  i.addSeries = pa;
  function ma(r) {
    if (x.splice(r, 1), Tt) {
      Q.values.splice(r, 1), Me.splice(r, 1);
      let l = $t.splice(r, 1)[0];
      Ci(null, l.firstChild), l.remove();
    }
    Wt && (ft.splice(r, 1), pe.splice(r, 1)[0].remove(), Ni.splice(r, 1), Li.splice(r, 1)), Rt("delSeries", r);
  }
  i.delSeries = ma;
  const pi = [!1, !1, !1, !1];
  function ga(r, l) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = $[r.scale];
      u == null && (r.scale = c ? x[1].scale : M, u = $[r.scale]);
      let d = u.time;
      r.size = et(r.size), r.space = et(r.space), r.rotate = et(r.rotate), ii(r.incrs) && r.incrs.forEach((_) => {
        !ri.has(_) && ri.set(_, Cl(_));
      }), r.incrs = et(r.incrs || (u.distr == 2 ? Pu : d ? I == 1 ? Cu : Du : yi)), r.splits = et(r.splits || (d && u.distr == 1 ? Jt : u.distr == 3 ? rr : u.distr == 4 ? Ju : Zu)), r.stroke = et(r.stroke), r.grid.stroke = et(r.grid.stroke), r.ticks.stroke = et(r.ticks.stroke), r.border.stroke = et(r.border.stroke);
      let g = r.values;
      r.values = // static array of tick values
      ii(g) && !ii(g[0]) ? et(g) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          ii(g) ? Bs(it, js(g, N)) : (
            // fmtDate string tpl
            Fs(g) ? Lu(it, g) : g || yt
          )
        ) : g || qu
      ), r.filter = et(r.filter || (u.distr >= 3 && u.log == 10 ? tf : u.distr == 3 && u.log == 2 ? ef : Pl)), r.font = rl(r.font), r.labelFont = rl(r.labelFont), r._size = r.size(i, null, l, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (pi[l] = !0, r._el = ve(Rc, v));
    }
  }
  function un(r, l, c, u) {
    let [d, g, _, y] = c, w = l % 2, A = 0;
    return w == 0 && (y || g) && (A = l == 0 && !d || l == 2 && !_ ? Mt(Ys.size / 3) : 0), w == 1 && (d || _) && (A = l == 1 && !g || l == 3 && !y ? Mt(Zs.size / 2) : 0), A;
  }
  const Lr = i.padding = (t.padding || [un, un, un, un]).map((r) => et(rt(r, un))), Je = i._padding = Lr.map((r, l) => r(i, l, pi, 0));
  let Vt, Ot = null, Nt = null;
  const Rn = o == 1 ? x[0].idxs : null;
  let Se = null, fn = !1;
  function Hr(r, l) {
    if (e = r ?? [], i.data = i._data = e, o == 2) {
      Vt = 0;
      for (let c = 1; c < x.length; c++)
        Vt += e[c][0].length;
    } else {
      e.length == 0 && (i.data = i._data = e = [[]]), Se = e[0], Vt = Se.length;
      let c = e;
      if (q == 2) {
        c = e.slice();
        let u = c[0] = Array(Vt);
        for (let d = 0; d < Vt; d++)
          u[d] = d;
      }
      i._data = e = c;
    }
    if (Ri(!0), Rt("setData"), q == 2 && (zi = !0), l !== !1) {
      let c = S;
      c.auto(i, fn) ? wo() : Xe(M, c.min, c.max), hi = hi || D.left >= 0, de = !0, Fi();
    }
  }
  i.setData = Hr;
  function wo() {
    fn = !0;
    let r, l;
    o == 1 && (Vt > 0 ? (Ot = Rn[0] = 0, Nt = Rn[1] = Vt - 1, r = e[0][Ot], l = e[0][Nt], q == 2 ? (r = Ot, l = Nt) : r == l && (q == 3 ? [r, l] = uo(r, r, S.log, !1) : q == 4 ? [r, l] = yr(r, r, S.log, !1) : S.time ? l = r + Mt(86400 / I) : [r, l] = no(r, l, wr, !0))) : (Ot = Rn[0] = r = null, Nt = Rn[1] = l = null)), Xe(M, r, l);
  }
  let Fn, Hi, xo, $o, So, Ao, Eo, ko, Po, Xt;
  function Rr(r, l, c, u, d, g) {
    r ??= xs, c ??= $r, u ??= "butt", d ??= xs, g ??= "round", r != Fn && (m.strokeStyle = Fn = r), d != Hi && (m.fillStyle = Hi = d), l != xo && (m.lineWidth = xo = l), g != So && (m.lineJoin = So = g), u != Ao && (m.lineCap = Ao = u), c != $o && m.setLineDash($o = c);
  }
  function Fr(r, l, c, u) {
    l != Hi && (m.fillStyle = Hi = l), r != Eo && (m.font = Eo = r), c != ko && (m.textAlign = ko = c), u != Po && (m.textBaseline = Po = u);
  }
  function To(r, l, c, u, d = 0) {
    if (u.length > 0 && r.auto(i, fn) && (l == null || l.min == null)) {
      let g = rt(Ot, 0), _ = rt(Nt, u.length - 1), y = c.min == null ? tu(u, g, _, d, r.distr == 3) : [c.min, c.max];
      r.min = Te(r.min, c.min = y[0]), r.max = Zt(r.max, c.max = y[1]);
    }
  }
  const Vr = { min: null, max: null };
  function va() {
    for (let u in $) {
      let d = $[u];
      L[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      L[M] != null && d.auto(i, fn)) && (L[u] = Vr);
    }
    for (let u in $) {
      let d = $[u];
      L[u] == null && d.from != null && L[d.from] != null && (L[u] = Vr);
    }
    L[M] != null && Ri(!0);
    let r = {};
    for (let u in L) {
      let d = L[u];
      if (d != null) {
        let g = r[u] = en($[u], cu);
        if (d.min != null)
          kt(g, d);
        else if (u != M || o == 2)
          if (Vt == 0 && g.from == null) {
            let _ = g.range(i, null, null, u);
            g.min = _[0], g.max = _[1];
          } else
            g.min = dt, g.max = -dt;
      }
    }
    if (Vt > 0) {
      x.forEach((u, d) => {
        if (o == 1) {
          let g = u.scale, _ = L[g];
          if (_ == null)
            return;
          let y = r[g];
          if (d == 0) {
            let w = y.range(i, y.min, y.max, g);
            y.min = w[0], y.max = w[1], Ot = Pe(y.min, e[0]), Nt = Pe(y.max, e[0]), Nt - Ot > 1 && (e[0][Ot] < y.min && Ot++, e[0][Nt] > y.max && Nt--), u.min = Se[Ot], u.max = Se[Nt];
          } else u.show && u.auto && To(y, _, u, e[d], u.sorted);
          u.idxs[0] = Ot, u.idxs[1] = Nt;
        } else if (d > 0 && u.show && u.auto) {
          let [g, _] = u.facets, y = g.scale, w = _.scale, [A, k] = e[d], C = r[y], B = r[w];
          C != null && To(C, L[y], g, A, g.sorted), B != null && To(B, L[w], _, k, _.sorted), u.min = _.min, u.max = _.max;
        }
      });
      for (let u in r) {
        let d = r[u], g = L[u];
        if (d.from == null && (g == null || g.min == null)) {
          let _ = d.range(
            i,
            d.min == dt ? null : d.min,
            d.max == -dt ? null : d.max,
            u
          );
          d.min = _[0], d.max = _[1];
        }
      }
    }
    for (let u in r) {
      let d = r[u];
      if (d.from != null) {
        let g = r[d.from];
        if (g.min == null)
          d.min = d.max = null;
        else {
          let _ = d.range(i, g.min, g.max, u);
          d.min = _[0], d.max = _[1];
        }
      }
    }
    let l = {}, c = !1;
    for (let u in r) {
      let d = r[u], g = $[u];
      if (g.min != d.min || g.max != d.max) {
        g.min = d.min, g.max = d.max;
        let _ = g.distr;
        g._min = _ == 3 ? Ye(g.min) : _ == 4 ? Yo(g.min, g.asinh) : _ == 100 ? g.fwd(g.min) : g.min, g._max = _ == 3 ? Ye(g.max) : _ == 4 ? Yo(g.max, g.asinh) : _ == 100 ? g.fwd(g.max) : g.max, l[u] = c = !0;
      }
    }
    if (c) {
      x.forEach((u, d) => {
        o == 2 ? d > 0 && l.y && (u._paths = null) : l[u.scale] && (u._paths = null);
      });
      for (let u in l)
        zi = !0, Rt("setScale", u);
      Wt && D.left >= 0 && (hi = de = !0);
    }
    for (let u in L)
      L[u] = null;
  }
  function ba(r) {
    let l = or(Ot - 1, 0, Vt - 1), c = or(Nt + 1, 0, Vt - 1);
    for (; r[l] == null && l > 0; )
      l--;
    for (; r[c] == null && c < Vt - 1; )
      c++;
    return [l, c];
  }
  function _a() {
    if (Vt > 0) {
      let r = x.some((l) => l._focus) && Xt != De.alpha;
      r && (m.globalAlpha = Xt = De.alpha), x.forEach((l, c) => {
        if (c > 0 && l.show && (Ur(c, !1), Ur(c, !0), l._paths == null)) {
          let u = Xt;
          Xt != l.alpha && (m.globalAlpha = Xt = l.alpha);
          let d = o == 2 ? [0, e[c][0].length - 1] : ba(e[c]);
          l._paths = l.paths(i, c, d[0], d[1]), Xt != u && (m.globalAlpha = Xt = u);
        }
      }), x.forEach((l, c) => {
        if (c > 0 && l.show) {
          let u = Xt;
          Xt != l.alpha && (m.globalAlpha = Xt = l.alpha), l._paths != null && Ir(c, !1);
          {
            let d = l._paths != null ? l._paths.gaps : null, g = l.points.show(i, c, Ot, Nt, d), _ = l.points.filter(i, c, g, d);
            (g || _) && (l.points._paths = l.points.paths(i, c, Ot, Nt, _), Ir(c, !0));
          }
          Xt != u && (m.globalAlpha = Xt = u), Rt("drawSeries", c);
        }
      }), r && (m.globalAlpha = Xt = 1);
    }
  }
  function Ur(r, l) {
    let c = l ? x[r].points : x[r];
    c._stroke = c.stroke(i, r), c._fill = c.fill(i, r);
  }
  function Ir(r, l) {
    let c = l ? x[r].points : x[r], {
      stroke: u,
      fill: d,
      clip: g,
      flags: _,
      _stroke: y = c._stroke,
      _fill: w = c._fill,
      _width: A = c.width
    } = c._paths;
    A = pt(A * lt, 3);
    let k = null, C = A % 2 / 2;
    l && w == null && (w = A > 0 ? "#fff" : y);
    let B = c.pxAlign == 1 && C > 0;
    if (B && m.translate(C, C), !l) {
      let st = ie - A / 2, ot = he - A / 2, X = Qt + A, U = $e + A;
      k = new Path2D(), k.rect(st, ot, X, U);
    }
    l ? Co(y, A, c.dash, c.cap, w, u, d, _, g) : ya(r, y, A, c.dash, c.cap, w, u, d, _, k, g), B && m.translate(-C, -C);
  }
  function ya(r, l, c, u, d, g, _, y, w, A, k) {
    let C = !1;
    w != 0 && Z.forEach((B, st) => {
      if (B.series[0] == r) {
        let ot = x[B.series[1]], X = e[B.series[1]], U = (ot._paths || An).band;
        ii(U) && (U = B.dir == 1 ? U[0] : U[1]);
        let O, bt = null;
        ot.show && U && iu(X, Ot, Nt) ? (bt = B.fill(i, st) || g, O = ot._paths.clip) : U = null, Co(l, c, u, d, bt, _, y, w, A, k, O, U), C = !0;
      }
    }), C || Co(l, c, u, d, g, _, y, w, A, k);
  }
  const jr = nn | lr;
  function Co(r, l, c, u, d, g, _, y, w, A, k, C) {
    Rr(r, l, c, u, d), (w || A || C) && (m.save(), w && m.clip(w), A && m.clip(A)), C ? (y & jr) == jr ? (m.clip(C), k && m.clip(k), Un(d, _), Vn(r, g, l)) : y & lr ? (Un(d, _), m.clip(C), Vn(r, g, l)) : y & nn && (m.save(), m.clip(C), k && m.clip(k), Un(d, _), m.restore(), Vn(r, g, l)) : (Un(d, _), Vn(r, g, l)), (w || A || C) && m.restore();
  }
  function Vn(r, l, c) {
    c > 0 && (l instanceof Map ? l.forEach((u, d) => {
      m.strokeStyle = Fn = d, m.stroke(u);
    }) : l != null && r && m.stroke(l));
  }
  function Un(r, l) {
    l instanceof Map ? l.forEach((c, u) => {
      m.fillStyle = Hi = u, m.fill(c);
    }) : l != null && r && m.fill(l);
  }
  function wa(r, l, c, u) {
    let d = R[r], g;
    if (u <= 0)
      g = [0, 0];
    else {
      let _ = d._space = d.space(i, r, l, c, u), y = d._incrs = d.incrs(i, r, l, c, u, _);
      g = Sf(l, c, y, u, _);
    }
    return d._found = g;
  }
  function Mo(r, l, c, u, d, g, _, y, w, A) {
    let k = _ % 2 / 2;
    H == 1 && m.translate(k, k), Rr(y, _, w, A, y), m.beginPath();
    let C, B, st, ot, X = d + (u == 0 || u == 3 ? -g : g);
    c == 0 ? (B = d, ot = X) : (C = d, st = X);
    for (let U = 0; U < r.length; U++)
      l[U] != null && (c == 0 ? C = st = r[U] : B = ot = r[U], m.moveTo(C, B), m.lineTo(st, ot));
    m.stroke(), H == 1 && m.translate(-k, -k);
  }
  function xa(r) {
    let l = !0;
    return R.forEach((c, u) => {
      if (!c.show)
        return;
      let d = $[c.scale];
      if (d.min == null) {
        c._show && (l = !1, c._show = !1, Ri(!1));
        return;
      } else
        c._show || (l = !1, c._show = !0, Ri(!1));
      let g = c.side, _ = g % 2, { min: y, max: w } = d, [A, k] = wa(u, y, w, _ == 0 ? K : T);
      if (k == 0)
        return;
      let C = d.distr == 2, B = c._splits = c.splits(i, u, y, w, A, k, C), st = d.distr == 2 ? B.map((O) => Se[O]) : B, ot = d.distr == 2 ? Se[B[1]] - Se[B[0]] : A, X = c._values = c.values(i, c.filter(i, st, u, k, ot), u, k, ot);
      c._rotate = g == 2 ? c.rotate(i, X, u, k) : 0;
      let U = c._size;
      c._size = be(c.size(i, X, u, r)), U != null && c._size != U && (l = !1);
    }), l;
  }
  function $a(r) {
    let l = !0;
    return Lr.forEach((c, u) => {
      let d = c(i, u, pi, r);
      d != Je[u] && (l = !1), Je[u] = d;
    }), l;
  }
  function Sa() {
    for (let r = 0; r < R.length; r++) {
      let l = R[r];
      if (!l.show || !l._show)
        continue;
      let c = l.side, u = c % 2, d, g, _ = l.stroke(i, r), y = c == 0 || c == 3 ? -1 : 1, [w, A] = l._found;
      if (l.label != null) {
        let Kt = l.labelGap * y, re = Mt((l._lpos + Kt) * lt);
        Fr(l.labelFont[0], _, "center", c == 2 ? bn : ws), m.save(), u == 1 ? (d = g = 0, m.translate(
          re,
          Mt(he + $e / 2)
        ), m.rotate((c == 3 ? -Zn : Zn) / 2)) : (d = Mt(ie + Qt / 2), g = re);
        let vi = El(l.label) ? l.label(i, r, w, A) : l.label;
        m.fillText(vi, d, g), m.restore();
      }
      if (A == 0)
        continue;
      let k = $[l.scale], C = u == 0 ? Qt : $e, B = u == 0 ? ie : he, st = l._splits, ot = k.distr == 2 ? st.map((Kt) => Se[Kt]) : st, X = k.distr == 2 ? Se[st[1]] - Se[st[0]] : w, U = l.ticks, O = l.border, bt = U.show ? U.size : 0, St = Mt(bt * lt), Ft = Mt((l.alignTo == 2 ? l._size - bt - l.gap : l.gap) * lt), ht = l._rotate * -Zn / 180, At = V(l._pos * lt), ne = (St + Ft) * y, Yt = At + ne;
      g = u == 0 ? Yt : 0, d = u == 1 ? Yt : 0;
      let me = l.font[0], Ae = l.align == 1 ? Yi : l.align == 2 ? Bo : ht > 0 ? Yi : ht < 0 ? Bo : u == 0 ? "center" : c == 3 ? Bo : Yi, Le = ht || u == 1 ? "middle" : c == 2 ? bn : ws;
      Fr(me, _, Ae, Le);
      let oe = l.font[1] * l.lineGap, ge = st.map((Kt) => V(f(Kt, k, C, B))), Ee = l._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let re = Ee[Kt];
        if (re != null) {
          u == 0 ? d = ge[Kt] : g = ge[Kt], re = "" + re;
          let vi = re.indexOf(`
`) == -1 ? [re] : re.split(/\n/gm);
          for (let qt = 0; qt < vi.length; qt++) {
            let as = vi[qt];
            ht ? (m.save(), m.translate(d, g + qt * oe), m.rotate(ht), m.fillText(as, 0, 0), m.restore()) : m.fillText(as, d, g + qt * oe);
          }
        }
      }
      U.show && Mo(
        ge,
        U.filter(i, ot, r, A, X),
        u,
        c,
        At,
        St,
        pt(U.width * lt, 3),
        U.stroke(i, r),
        U.dash,
        U.cap
      );
      let He = l.grid;
      He.show && Mo(
        ge,
        He.filter(i, ot, r, A, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? he : ie,
        u == 0 ? $e : Qt,
        pt(He.width * lt, 3),
        He.stroke(i, r),
        He.dash,
        He.cap
      ), O.show && Mo(
        [At],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? he : ie,
        u == 1 ? $e : Qt,
        pt(O.width * lt, 3),
        O.stroke(i, r),
        O.dash,
        O.cap
      );
    }
    Rt("drawAxes");
  }
  function Ri(r) {
    x.forEach((l, c) => {
      c > 0 && (l._paths = null, r && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let In = !1, zo = !1, hn = [];
  function Aa() {
    zo = !1;
    for (let r = 0; r < hn.length; r++)
      Rt(...hn[r]);
    hn.length = 0;
  }
  function Fi() {
    In || (gu(Br), In = !0);
  }
  function Ea(r, l = !1) {
    In = !0, zo = l, r(i), Br(), l && hn.length > 0 && queueMicrotask(Aa);
  }
  i.batch = Ea;
  function Br() {
    if (_o && (va(), _o = !1), zi && (ua(), zi = !1), Ln) {
      if (_t(E, Yi, mt), _t(E, bn, Ct), _t(E, yn, K), _t(E, wn, T), _t(P, Yi, mt), _t(P, bn, Ct), _t(P, yn, K), _t(P, wn, T), _t(v, yn, We), _t(v, wn, ci), b.width = Mt(We * lt), b.height = Mt(ci * lt), R.forEach(({ _el: r, _show: l, _size: c, _pos: u, side: d }) => {
        if (r != null)
          if (l) {
            let g = d === 3 || d === 0 ? c : 0, _ = d % 2 == 1;
            _t(r, _ ? "left" : "top", u - g), _t(r, _ ? "width" : "height", c), _t(r, _ ? "top" : "left", _ ? Ct : mt), _t(r, _ ? "height" : "width", _ ? T : K), ir(r, wi);
          } else
            se(r, wi);
      }), Fn = Hi = xo = So = Ao = Eo = ko = Po = $o = null, Xt = 1, mn(!0), mt != Mi || Ct != ui || K != ze || T != fi) {
        Ri(!1);
        let r = K / ze, l = T / fi;
        if (Wt && !hi && D.left >= 0) {
          D.left *= r, D.top *= l, Vi && Re(Vi, Mt(D.left), 0, K, T), Ui && Re(Ui, 0, Mt(D.top), K, T);
          for (let c = 0; c < pe.length; c++) {
            let u = pe[c];
            u != null && (Ni[c] *= r, Li[c] *= l, Re(u, be(Ni[c]), be(Li[c]), K, T));
          }
        }
        if (vt.show && !Hn && vt.left >= 0 && vt.width > 0) {
          vt.left *= r, vt.width *= r, vt.top *= l, vt.height *= l;
          for (let c in Ro)
            _t(Bi, c, vt[c]);
        }
        Mi = mt, ui = Ct, ze = K, fi = T;
      }
      Rt("setSize"), Ln = !1;
    }
    We > 0 && ci > 0 && (m.clearRect(0, 0, b.width, b.height), Rt("drawClear"), Y.forEach((r) => r()), Rt("draw")), vt.show && Hn && (jn(vt), Hn = !1), Wt && hi && (gi(null, !0, !1), hi = !1), Q.show && Q.live && de && (Lo(), de = !1), h || (h = !0, i.status = 1, Rt("ready")), fn = !1, In = !1;
  }
  i.redraw = (r, l) => {
    zi = l || !1, r !== !1 ? Xe(M, S.min, S.max) : Fi();
  };
  function Do(r, l) {
    let c = $[r];
    if (c.from == null) {
      if (Vt == 0) {
        let u = c.range(i, l.min, l.max, r);
        l.min = u[0], l.max = u[1];
      }
      if (l.min > l.max) {
        let u = l.min;
        l.min = l.max, l.max = u;
      }
      if (Vt > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      r == M && c.distr == 2 && Vt > 0 && (l.min = Pe(l.min, e[0]), l.max = Pe(l.max, e[0]), l.min == l.max && l.max++), L[r] = l, _o = !0, Fi();
    }
  }
  i.setScale = Do;
  let Oo, No, Vi, Ui, Wr, Gr, Ii, ji, Yr, Kr, gt, xt, Qe = !1;
  const Ut = D.drag;
  let Lt = Ut.x, Ht = Ut.y;
  Wt && (D.x && (Oo = ve(Vc, P)), D.y && (No = ve(Uc, P)), S.ori == 0 ? (Vi = Oo, Ui = No) : (Vi = No, Ui = Oo), gt = D.left, xt = D.top);
  const vt = i.select = kt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, t.select), Bi = vt.show ? ve(Fc, vt.over ? P : E) : null;
  function jn(r, l) {
    if (vt.show) {
      for (let c in r)
        vt[c] = r[c], c in Ro && _t(Bi, c, r[c]);
      l !== !1 && Rt("setSelect");
    }
  }
  i.setSelect = jn;
  function ka(r) {
    if (x[r].show)
      Tt && ir($t[r], wi);
    else if (Tt && se($t[r], wi), Wt) {
      let c = Oi ? pe[0] : pe[r];
      c != null && Re(c, -10, -10, K, T);
    }
  }
  function Xe(r, l, c) {
    Do(r, { min: l, max: c });
  }
  function Oe(r, l, c, u) {
    l.focus != null && za(r), l.show != null && x.forEach((d, g) => {
      g > 0 && (r == g || r == null) && (d.show = l.show, ka(g), o == 2 ? (Xe(d.facets[0].scale, null, null), Xe(d.facets[1].scale, null, null)) : Xe(d.scale, null, null), Fi());
    }), c !== !1 && Rt("setSeries", r, l), u && gn("setSeries", i, r, l);
  }
  i.setSeries = Oe;
  function Pa(r, l) {
    kt(Z[r], l);
  }
  function Ta(r, l) {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1), l = l ?? Z.length, Z.splice(l, 0, r);
  }
  function Ca(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  i.addBand = Ta, i.setBand = Pa, i.delBand = Ca;
  function Ma(r, l) {
    x[r].alpha = l, Wt && pe[r] != null && (pe[r].style.opacity = l), Tt && $t[r] && ($t[r].style.opacity = l);
  }
  let Ge, ti, mi;
  const Wi = { focus: !0 };
  function za(r) {
    if (r != mi) {
      let l = r == null, c = De.alpha != 1;
      x.forEach((u, d) => {
        if (o == 1 || d > 0) {
          let g = l || d == 0 || d == r;
          u._focus = l ? null : g, c && Ma(d, g ? 1 : De.alpha);
        }
      }), mi = r, c && Fi();
    }
  }
  Tt && Di && Gt(As, ct, (r) => {
    D._lock || (di(r), mi != null && Oe(null, Wi, !0, Et.setSeries));
  });
  function Ne(r, l, c) {
    let u = $[l];
    c && (r = r / lt - (u.ori == 1 ? Ct : mt));
    let d = K;
    u.ori == 1 && (d = T, r = d - r), u.dir == -1 && (r = d - r);
    let g = u._min, _ = u._max, y = r / d, w = g + (_ - g) * y, A = u.distr;
    return A == 3 ? Xi(10, w) : A == 4 ? ou(w, u.asinh) : A == 100 ? u.bwd(w) : w;
  }
  function Da(r, l) {
    let c = Ne(r, M, l);
    return Pe(c, e[0], Ot, Nt);
  }
  i.valToIdx = (r) => Pe(r, e[0]), i.posToIdx = Da, i.posToVal = Ne, i.valToPos = (r, l, c) => $[l].ori == 0 ? s(
    r,
    $[l],
    c ? Qt : K,
    c ? ie : 0
  ) : a(
    r,
    $[l],
    c ? $e : T,
    c ? he : 0
  ), i.setCursor = (r, l, c) => {
    gt = r.left, xt = r.top, gi(null, l, c);
  };
  function qr(r, l) {
    _t(Bi, Yi, vt.left = r), _t(Bi, yn, vt.width = l);
  }
  function Zr(r, l) {
    _t(Bi, bn, vt.top = r), _t(Bi, wn, vt.height = l);
  }
  let dn = S.ori == 0 ? qr : Zr, pn = S.ori == 1 ? qr : Zr;
  function Oa() {
    if (Tt && Q.live)
      for (let r = o == 2 ? 1 : 0; r < x.length; r++) {
        if (r == 0 && fe)
          continue;
        let l = Q.values[r], c = 0;
        for (let u in l)
          Me[r][c++].firstChild.nodeValue = l[u];
      }
  }
  function Lo(r, l) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      ft[u] = c;
    }) : au(r.idx) || ft.fill(r.idx), Q.idx = ft[0]), Tt && Q.live) {
      for (let c = 0; c < x.length; c++)
        (c > 0 || o == 1 && !fe) && Na(c, ft[c]);
      Oa();
    }
    de = !1, l !== !1 && Rt("setLegend");
  }
  i.setLegend = Lo;
  function Na(r, l) {
    let c = x[r], u = r == 0 && q == 2 ? Se : e[r], d;
    fe ? d = c.values(i, r, l) ?? Ze : (d = c.value(i, l == null ? null : u[l], r, l), d = d == null ? Ze : { _: d }), Q.values[r] = d;
  }
  function gi(r, l, c) {
    Yr = gt, Kr = xt, [gt, xt] = D.move(i, gt, xt), D.left = gt, D.top = xt, Wt && (Vi && Re(Vi, Mt(gt), 0, K, T), Ui && Re(Ui, 0, Mt(xt), K, T));
    let u, d = Ot > Nt;
    Ge = dt, ti = null;
    let g = S.ori == 0 ? K : T, _ = S.ori == 1 ? K : T;
    if (gt < 0 || Vt == 0 || d) {
      u = D.idx = null;
      for (let y = 0; y < x.length; y++) {
        let w = pe[y];
        w != null && Re(w, -10, -10, K, T);
      }
      Di && Oe(null, Wi, !0, r == null && Et.setSeries), Q.live && (ft.fill(u), de = !0);
    } else {
      let y, w, A;
      o == 1 && (y = S.ori == 0 ? gt : xt, w = Ne(y, M), u = D.idx = Pe(w, e[0], Ot, Nt), A = z(e[0][u], S, g, 0));
      let k = -10, C = -10, B = 0, st = 0, ot = !0, X = "", U = "";
      for (let O = o == 2 ? 1 : 0; O < x.length; O++) {
        let bt = x[O], St = ft[O], Ft = St == null ? null : o == 1 ? e[O][St] : e[O][1][St], ht = D.dataIdx(i, O, u, w), At = ht == null ? null : o == 1 ? e[O][ht] : e[O][1][ht];
        if (de = de || At != Ft || ht != St, ft[O] = ht, O > 0 && bt.show) {
          let ne = ht == null ? -10 : ht == u ? A : z(o == 1 ? e[0][ht] : e[O][0][ht], S, g, 0), Yt = At == null ? -10 : j(At, o == 1 ? $[bt.scale] : $[bt.facets[1].scale], _, 0);
          if (Di && At != null) {
            let me = S.ori == 1 ? gt : xt, Ae = zt(De.dist(i, O, ht, Yt, me));
            if (Ae < Ge) {
              let Le = De.bias;
              if (Le != 0) {
                let oe = Ne(me, bt.scale), ge = At >= 0 ? 1 : -1, Ee = oe >= 0 ? 1 : -1;
                Ee == ge && (Ee == 1 ? Le == 1 ? At >= oe : At <= oe : (
                  // >= 0
                  Le == 1 ? At <= oe : At >= oe
                )) && (Ge = Ae, ti = O);
              } else
                Ge = Ae, ti = O;
            }
          }
          if (de || Oi) {
            let me, Ae;
            S.ori == 0 ? (me = ne, Ae = Yt) : (me = Yt, Ae = ne);
            let Le, oe, ge, Ee, He, Kt, re = !0, vi = jt.bbox;
            if (vi != null) {
              re = !1;
              let qt = vi(i, O);
              ge = qt.left, Ee = qt.top, Le = qt.width, oe = qt.height;
            } else
              ge = me, Ee = Ae, Le = oe = jt.size(i, O);
            if (Kt = jt.fill(i, O), He = jt.stroke(i, O), Oi)
              O == ti && Ge <= De.prox && (k = ge, C = Ee, B = Le, st = oe, ot = re, X = Kt, U = He);
            else {
              let qt = pe[O];
              qt != null && (Ni[O] = ge, Li[O] = Ee, zs(qt, Le, oe, re), Cs(qt, Kt, He), Re(qt, be(ge), be(Ee), K, T));
            }
          }
        }
      }
      if (Oi) {
        let O = De.prox, bt = mi == null ? Ge <= O : Ge > O || ti != mi;
        if (de || bt) {
          let St = pe[0];
          St != null && (Ni[0] = k, Li[0] = C, zs(St, B, st, ot), Cs(St, X, U), Re(St, be(k), be(C), K, T));
        }
      }
    }
    if (vt.show && Qe)
      if (r != null) {
        let [y, w] = Et.scales, [A, k] = Et.match, [C, B] = r.cursor.sync.scales, st = r.cursor.drag;
        if (Lt = st._x, Ht = st._y, Lt || Ht) {
          let { left: ot, top: X, width: U, height: O } = r.select, bt = r.scales[C].ori, St = r.posToVal, Ft, ht, At, ne, Yt, me = y != null && A(y, C), Ae = w != null && k(w, B);
          me && Lt ? (bt == 0 ? (Ft = ot, ht = U) : (Ft = X, ht = O), At = $[y], ne = z(St(Ft, C), At, g, 0), Yt = z(St(Ft + ht, C), At, g, 0), dn(Te(ne, Yt), zt(Yt - ne))) : dn(0, g), Ae && Ht ? (bt == 1 ? (Ft = ot, ht = U) : (Ft = X, ht = O), At = $[w], ne = j(St(Ft, B), At, _, 0), Yt = j(St(Ft + ht, B), At, _, 0), pn(Te(ne, Yt), zt(Yt - ne))) : pn(0, _);
        } else
          Fo();
      } else {
        let y = zt(Yr - Wr), w = zt(Kr - Gr);
        if (S.ori == 1) {
          let B = y;
          y = w, w = B;
        }
        Lt = Ut.x && y >= Ut.dist, Ht = Ut.y && w >= Ut.dist;
        let A = Ut.uni;
        A != null ? Lt && Ht && (Lt = y >= A, Ht = w >= A, !Lt && !Ht && (w > y ? Ht = !0 : Lt = !0)) : Ut.x && Ut.y && (Lt || Ht) && (Lt = Ht = !0);
        let k, C;
        Lt && (S.ori == 0 ? (k = Ii, C = gt) : (k = ji, C = xt), dn(Te(k, C), zt(C - k)), Ht || pn(0, _)), Ht && (S.ori == 1 ? (k = Ii, C = gt) : (k = ji, C = xt), pn(Te(k, C), zt(C - k)), Lt || dn(0, g)), !Lt && !Ht && (dn(0, 0), pn(0, 0));
      }
    if (Ut._x = Lt, Ut._y = Ht, r == null) {
      if (c) {
        if (ls != null) {
          let [y, w] = Et.scales;
          Et.values[0] = y != null ? Ne(S.ori == 0 ? gt : xt, y) : null, Et.values[1] = w != null ? Ne(S.ori == 1 ? gt : xt, w) : null;
        }
        gn(Wo, i, gt, xt, K, T, u);
      }
      if (Di) {
        let y = c && Et.setSeries, w = De.prox;
        mi == null ? Ge <= w && Oe(ti, Wi, !0, y) : Ge > w ? Oe(null, Wi, !0, y) : ti != mi && Oe(ti, Wi, !0, y);
      }
    }
    de && (Q.idx = u, Lo()), l !== !1 && Rt("setCursor");
  }
  let ei = null;
  Object.defineProperty(i, "rect", {
    get() {
      return ei == null && mn(!1), ei;
    }
  });
  function mn(r = !1) {
    r ? ei = null : (ei = P.getBoundingClientRect(), Rt("syncRect", ei));
  }
  function Jr(r, l, c, u, d, g, _) {
    D._lock || Qe && r != null && r.movementX == 0 && r.movementY == 0 || (Ho(r, l, c, u, d, g, _, !1, r != null), r != null ? gi(null, !0, !0) : gi(l, !0, !1));
  }
  function Ho(r, l, c, u, d, g, _, y, w) {
    if (ei == null && mn(!1), di(r), r != null)
      c = r.clientX - ei.left, u = r.clientY - ei.top;
    else {
      if (c < 0 || u < 0) {
        gt = -10, xt = -10;
        return;
      }
      let [A, k] = Et.scales, C = l.cursor.sync, [B, st] = C.values, [ot, X] = C.scales, [U, O] = Et.match, bt = l.axes[0].side % 2 == 1, St = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, ht = bt ? g : d, At = bt ? d : g, ne = bt ? u : c, Yt = bt ? c : u;
      if (ot != null ? c = U(A, ot) ? f(B, $[A], St, 0) : -10 : c = St * (ne / ht), X != null ? u = O(k, X) ? f(st, $[k], Ft, 0) : -10 : u = Ft * (Yt / At), S.ori == 1) {
        let me = c;
        c = u, u = me;
      }
    }
    w && (l == null || l.cursor.event.type == Wo) && ((c <= 1 || c >= K - 1) && (c = _i(c, K)), (u <= 1 || u >= T - 1) && (u = _i(u, T))), y ? (Wr = c, Gr = u, [Ii, ji] = D.move(i, c, u)) : (gt = c, xt = u);
  }
  const Ro = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Fo() {
    jn(Ro, !1);
  }
  let Qr, Xr, ts, es;
  function is(r, l, c, u, d, g, _) {
    Qe = !0, Lt = Ht = Ut._x = Ut._y = !1, Ho(r, l, c, u, d, g, _, !0, !1), r != null && (Gt(Go, tr, ns, !1), gn($s, i, Ii, ji, K, T, null));
    let { left: y, top: w, width: A, height: k } = vt;
    Qr = y, Xr = w, ts = A, es = k;
  }
  function ns(r, l, c, u, d, g, _) {
    Qe = Ut._x = Ut._y = !1, Ho(r, l, c, u, d, g, _, !1, !0);
    let { left: y, top: w, width: A, height: k } = vt, C = A > 0 || k > 0, B = Qr != y || Xr != w || ts != A || es != k;
    if (C && B && jn(vt), Ut.setScale && C && B) {
      let st = y, ot = A, X = w, U = k;
      if (S.ori == 1 && (st = w, ot = k, X = y, U = A), Lt && Xe(
        M,
        Ne(st, M),
        Ne(st + ot, M)
      ), Ht)
        for (let O in $) {
          let bt = $[O];
          O != M && bt.from == null && bt.min != dt && Xe(
            O,
            Ne(X + U, O),
            Ne(X, O)
          );
        }
      Fo();
    } else D.lock && (D._lock = !D._lock, gi(l, !0, r != null));
    r != null && (Ci(Go, tr), gn(Go, i, gt, xt, K, T, null));
  }
  function La(r, l, c, u, d, g, _) {
    if (D._lock)
      return;
    di(r);
    let y = Qe;
    if (Qe) {
      let w = !0, A = !0, k = 10, C, B;
      S.ori == 0 ? (C = Lt, B = Ht) : (C = Ht, B = Lt), C && B && (w = gt <= k || gt >= K - k, A = xt <= k || xt >= T - k), C && w && (gt = gt < Ii ? 0 : K), B && A && (xt = xt < ji ? 0 : T), gi(null, !0, !0), Qe = !1;
    }
    gt = -10, xt = -10, ft.fill(null), gi(null, !0, !0), y && (Qe = y);
  }
  function os(r, l, c, u, d, g, _) {
    D._lock || (di(r), wo(), Fo(), r != null && gn(Es, i, gt, xt, K, T, null));
  }
  function rs() {
    R.forEach(Af), yo(i.width, i.height, !0);
  }
  $i(io, Zi, rs);
  const Gi = {};
  Gi.mousedown = is, Gi.mousemove = Jr, Gi.mouseup = ns, Gi.dblclick = os, Gi.setSeries = (r, l, c, u) => {
    let d = Et.match[2];
    c = d(i, l, c), c != -1 && Oe(c, u, !0, !1);
  }, Wt && (Gt($s, P, is), Gt(Wo, P, Jr), Gt(Ss, P, (r) => {
    di(r), mn(!1);
  }), Gt(As, P, La), Gt(Es, P, os), ar.add(i), i.syncRect = mn);
  const Bn = i.hooks = t.hooks || {};
  function Rt(r, l, c) {
    zo ? hn.push([r, l, c]) : r in Bn && Bn[r].forEach((u) => {
      u.call(null, i, l, c);
    });
  }
  (t.plugins || []).forEach((r) => {
    for (let l in r.hooks)
      Bn[l] = (Bn[l] || []).concat(r.hooks[l]);
  });
  const ss = (r, l, c) => c, Et = kt({
    key: null,
    setSeries: !1,
    filters: {
      pub: Hs,
      sub: Hs
    },
    scales: [M, x[1] ? x[1].scale : null],
    match: [Rs, Rs, ss],
    values: [null, null]
  }, D.sync);
  Et.match.length == 2 && Et.match.push(ss), D.sync = Et;
  const ls = Et.key, Vo = Zl(ls);
  function gn(r, l, c, u, d, g, _) {
    Et.filters.pub(r, l, c, u, d, g, _) && Vo.pub(r, l, c, u, d, g, _);
  }
  Vo.sub(i);
  function Ha(r, l, c, u, d, g, _) {
    Et.filters.sub(r, l, c, u, d, g, _) && Gi[r](null, l, c, u, d, g, _);
  }
  i.pub = Ha;
  function Ra() {
    Vo.unsub(i), ar.delete(i), ai.clear(), nr(io, Zi, rs), p.remove(), ct?.remove(), Rt("destroy");
  }
  i.destroy = Ra;
  function Uo() {
    Rt("init", t, e), Hr(e || t.data, !1), L[M] ? Do(M, L[M]) : wo(), Hn = vt.show && (vt.width > 0 || vt.height > 0), hi = de = !0, yo(t.width, t.height);
  }
  return x.forEach(Nr), R.forEach(ga), n ? n instanceof HTMLElement ? (n.appendChild(p), Uo()) : n(i, Uo) : Uo(), i;
}
Bt.assign = kt;
Bt.fmtNum = xr;
Bt.rangeNum = no;
Bt.rangeLog = uo;
Bt.rangeAsinh = yr;
Bt.orient = ki;
Bt.pxRatio = lt;
Bt.join = mu;
Bt.fmtDate = Sr, Bt.tzDate = Eu;
Bt.sync = Zl;
{
  Bt.addGap = cf, Bt.clipGaps = po;
  let t = Bt.paths = {
    points: ia
  };
  t.linear = oa, t.stepped = hf, t.bars = df, t.spline = mf;
}
const Ef = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var kf = Object.defineProperty, Pf = Object.getOwnPropertyDescriptor, Ie = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Pf(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && kf(e, n, o), o;
};
const Tf = 24;
let ye = class extends It {
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
    const t = /* @__PURE__ */ new Date(), e = new Date(t.getTime() - Tf * 60 * 60 * 1e3), n = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (i) => !!i
    );
    try {
      const i = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: e.toISOString(),
        end_time: t.toISOString(),
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
  _numericSeries(t) {
    if (!t) return [];
    const e = [];
    for (const n of t) {
      const i = parseFloat(n.s);
      Number.isFinite(i) && e.push([n.lu, i]);
    }
    return e.sort((n, i) => n[0] - i[0]), e;
  }
  /** Build aligned uPlot data: a single sorted x axis and forward-filled
   *  values for each numeric series. */
  _alignSeries(t, e) {
    const n = /* @__PURE__ */ new Set();
    for (const s of t) for (const [a] of s) n.add(a);
    if (n.size === 0) return [[e], ...t.map(() => [null])];
    const i = [...n].sort((s, a) => s - a), o = t.map((s) => {
      let a = -1, f = null;
      return i.map((h) => {
        for (; a + 1 < s.length && s[a + 1][0] <= h; )
          a++, f = s[a][1];
        return f;
      });
    });
    return [i, ...o];
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(t, e) {
    if (!t) return [];
    const n = [...t].sort((o, s) => o.lu - s.lu), i = [];
    for (let o = 0; o < n.length; o++) {
      const s = n[o].lu, a = n[o + 1]?.lu ?? e, f = n[o].s;
      (f === "heating" || f === "cooling") && i.push({ start: s, end: a, action: f });
    }
    return i;
  }
  _renderPlot(t) {
    if (!this._host) return;
    const e = Math.floor(Date.now() / 1e3), n = this._numericSeries(t[this.roomEntity]), i = this._numericSeries(t[this.lowEntity]), o = this._numericSeries(t[this.highEntity]);
    if (this._intervals = this._actionIntervals(t[this.actionEntity], e), n.length === 0 && i.length === 0 && o.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([n, i, o], e), a = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: a.width, height: a.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Bt(a, s, this._host), this._observeResize());
  }
  _buildOpts(t) {
    const e = getComputedStyle(this), n = e.getPropertyValue("--cb-action-heating").trim() || "#d9603f", i = e.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", o = e.getPropertyValue("--primary-color").trim() || "#03a9f4";
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
            const a = s.ctx;
            if (!a) return;
            const f = s.bbox.top, h = s.bbox.height;
            a.save();
            for (const p of this._intervals) {
              const b = s.valToPos(p.start, "x", !0), m = s.valToPos(p.end, "x", !0);
              m <= b || (a.fillStyle = p.action === "heating" ? sl(n, 0.18) : sl(i, 0.18), a.fillRect(b, f, m - b, h));
            }
            a.restore();
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
    return !this.hass || !this.roomEntity ? F`<div class="status">No room temperature sensor for this zone.</div>` : F`
      ${this._loading ? F`<div class="status">Loading 24 h history…</div>` : at}
      ${this._error ? F`<div class="status">${this._error}</div>` : at}
      ${this._empty ? F`<div class="status">
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
  fl(Ef),
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
Ie([
  G({ attribute: !1 })
], ye.prototype, "hass", 2);
Ie([
  G({ type: String })
], ye.prototype, "roomEntity", 2);
Ie([
  G({ type: String })
], ye.prototype, "lowEntity", 2);
Ie([
  G({ type: String })
], ye.prototype, "highEntity", 2);
Ie([
  G({ type: String })
], ye.prototype, "actionEntity", 2);
Ie([
  Pt()
], ye.prototype, "_loading", 2);
Ie([
  Pt()
], ye.prototype, "_error", 2);
Ie([
  Pt()
], ye.prototype, "_empty", 2);
Ie([
  Dn(".chart-host")
], ye.prototype, "_host", 2);
ye = Ie([
  ae("comfort-band-history-chart")
], ye);
function sl(t, e) {
  const n = t.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let s = i[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const a = parseInt(s.slice(0, 2), 16), f = parseInt(s.slice(2, 4), 16), h = parseInt(s.slice(4, 6), 16);
    return `rgba(${a}, ${f}, ${h}, ${e})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${e})` : n;
}
var Cf = Object.defineProperty, Mf = Object.getOwnPropertyDescriptor, Mr = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Mf(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Cf(e, n, o), o;
};
let Cn = class extends It {
  render() {
    const t = this.entities?.roomTemperature;
    return t ? F`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${t}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${at}
    ` : F`<div class="empty">No room temperature sensor for this zone.</div>`;
  }
};
Cn.styles = [
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
Mr([
  G({ attribute: !1 })
], Cn.prototype, "hass", 2);
Mr([
  G({ attribute: !1 })
], Cn.prototype, "entities", 2);
Cn = Mr([
  ae("comfort-band-insights-tab")
], Cn);
var zf = Object.defineProperty, Df = Object.getOwnPropertyDescriptor, aa = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Df(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && zf(e, n, o), o;
};
const Of = 500, Nf = 1.5, Lf = 15, ll = [0, 6, 12, 18, 24];
function al(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t);
  return e ? parseInt(e[1], 10) * 60 + parseInt(e[2], 10) : 0;
}
function Hf(t) {
  const e = Math.max(0, Math.min(1439, t)), n = Math.floor(e / 60), i = e % 60;
  return `${n.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
function Jo(t) {
  return t / (24 * 60) * 100;
}
function Rf(t, e) {
  return Math.round(t / e) * e;
}
let ro = class extends It {
  constructor() {
    super(...arguments), this.transitions = [], this._longPressTimer = null, this._onTrackTap = (t) => {
      if (t.target.classList.contains("point")) return;
      const e = this.shadowRoot?.querySelector(".track");
      if (!e) return;
      const n = e.getBoundingClientRect(), i = this._xToMinutes(t.clientX, n);
      for (const o of this.transitions) {
        const s = al(o.at);
        if (Math.abs(Jo(s) - Jo(i)) < Nf) return;
      }
      this.dispatchEvent(
        new CustomEvent("transition-add", {
          detail: { at: Hf(i) },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._onPointTap = (t) => {
      this.dispatchEvent(
        new CustomEvent("transition-edit", {
          detail: { transition: t },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._onPointPointerDown = (t, e) => {
      t.stopPropagation(), this._longPressTimer !== null && window.clearTimeout(this._longPressTimer);
      const n = t.currentTarget;
      let i = !1;
      this._longPressTimer = window.setTimeout(() => {
        i = !0, this._longPressTimer = null, this.dispatchEvent(
          new CustomEvent("transition-delete", {
            detail: { at: e.at },
            bubbles: !0,
            composed: !0
          })
        );
      }, Of);
      const o = () => {
        n.removeEventListener("pointerup", o), n.removeEventListener("pointercancel", o), n.removeEventListener("pointerleave", o), this._longPressTimer !== null && (window.clearTimeout(this._longPressTimer), this._longPressTimer = null, i || this._onPointTap(e));
      };
      n.addEventListener("pointerup", o), n.addEventListener("pointercancel", o), n.addEventListener("pointerleave", o);
    }, this._onPointKeyDown = (t, e) => {
      t.key === "Enter" || t.key === " " ? (t.preventDefault(), this._onPointTap(e)) : (t.key === "Delete" || t.key === "Backspace") && (t.preventDefault(), this.dispatchEvent(
        new CustomEvent("transition-delete", {
          detail: { at: e.at },
          bubbles: !0,
          composed: !0
        })
      ));
    };
  }
  _xToMinutes(t, e) {
    if (e.width === 0) return 0;
    const n = Math.max(0, Math.min(1, (t - e.left) / e.width));
    return Rf(n * 24 * 60, Lf);
  }
  render() {
    return F`
      <div class="ruler">
        <div class="track" @click=${this._onTrackTap}></div>
        ${ll.map((t, e) => {
      const n = e === 0 ? "hour-tick start" : e === ll.length - 1 ? "hour-tick terminal" : "hour-tick";
      return F`<div class=${n} style="left:${t / 24 * 100}%">${t}h</div>`;
    })}
        ${this.transitions.map((t) => {
      const e = al(t.at), n = Jo(e), i = `Transition at ${t.at}, low ${t.low.toFixed(1)} degrees, high ${t.high.toFixed(1)} degrees. Tap to edit, long-press or Delete to remove.`;
      return F`
            <button
              class="point"
              role="button"
              style="left:${n}%"
              tabindex="0"
              aria-label=${i}
              data-at=${t.at}
              @pointerdown=${(o) => this._onPointPointerDown(o, t)}
              @keydown=${(o) => this._onPointKeyDown(o, t)}
            ></button>
            <div class="point-label" style="left:${n}%">
              ${t.at} · ${t.low.toFixed(1)}–${t.high.toFixed(1)}°
            </div>
          `;
    })}
      </div>
      ${this.transitions.length === 0 ? F`<div class="empty-hint">Tap the timeline to add a transition.</div>` : null}
    `;
  }
};
ro.styles = [
  ce,
  te`
      :host {
        display: block;
      }
      .ruler {
        position: relative;
        height: 50px;
        margin: var(--cb-gap-md) 0;
      }
      .track {
        position: absolute;
        top: 36px;
        left: 0;
        right: 0;
        height: 6px;
        background: var(--cb-track-bg);
        border-radius: 3px;
        cursor: pointer;
      }
      .hour-tick {
        position: absolute;
        top: 18px;
        font-size: 10px;
        color: var(--cb-text-secondary);
        transform: translateX(-50%);
        font-variant-numeric: tabular-nums;
      }
      .hour-tick.terminal {
        transform: translateX(-100%);
      }
      .hour-tick.start {
        transform: translateX(0);
      }
      .point {
        position: absolute;
        top: 30px;
        width: 18px;
        height: 18px;
        margin-left: -9px;
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        border: 2px solid var(--ha-card-background, #ffffff);
        border-radius: 50%;
        cursor: pointer;
        touch-action: none;
        z-index: 1;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }
      .point:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 3px;
      }
      .point-label {
        /* Hidden — densely packed transitions stack labels into an
           unreadable mess. The list view under the timeline shows the
           same data cleanly, and aria-label on each .point button
           preserves it for screen readers. */
        display: none;
      }
      .empty-hint {
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
        margin-top: var(--cb-gap-sm);
      }
    `
];
aa([
  G({ type: Array })
], ro.prototype, "transitions", 2);
ro = aa([
  ae("timeline-editor")
], ro);
var Ff = Object.defineProperty, Vf = Object.getOwnPropertyDescriptor, si = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Vf(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Ff(e, n, o), o;
};
let Fe = class extends It {
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
    return F`
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
      ${this._error ? F`<div class="error">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : F`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Fe.styles = [
  ce,
  te`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
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
si([
  G({ type: Object })
], Fe.prototype, "transition", 2);
si([
  G({ type: Boolean })
], Fe.prototype, "isNew", 2);
si([
  Pt()
], Fe.prototype, "_at", 2);
si([
  Pt()
], Fe.prototype, "_low", 2);
si([
  Pt()
], Fe.prototype, "_high", 2);
si([
  Pt()
], Fe.prototype, "_error", 2);
si([
  Dn('input[name="at"]')
], Fe.prototype, "_atInput", 2);
Fe = si([
  ae("transition-edit-dialog")
], Fe);
var Uf = Object.defineProperty, If = Object.getOwnPropertyDescriptor, je = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? If(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Uf(e, n, o), o;
};
let we = class extends It {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !0, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._onAdd = (t) => {
      this._newAt = t.detail.at, this._editing = null, this._mode = "add";
    }, this._onEdit = (t) => {
      this._editing = t.detail.transition, this._mode = "edit";
    }, this._onDelete = async (t) => {
      if (!this.hass) return;
      const e = this._transitions.filter((n) => n.at !== t.detail.at);
      await this._writeSchedule(e);
    }, this._onDialogSave = async (t) => {
      const e = t.detail.transition, n = [];
      if (this._mode === "edit" && this._editing) {
        const i = this._editing.at;
        for (const o of this._transitions)
          o.at !== i && o.at !== e.at && n.push(o);
        n.push(e);
      } else {
        for (const i of this._transitions)
          i.at !== e.at && n.push(i);
        n.push(e);
      }
      n.sort((i, o) => i.at.localeCompare(o.at)), await this._writeSchedule(n), this._mode = "list", this._editing = null;
    }, this._onDialogDelete = async (t) => {
      const e = this._transitions.filter((n) => n.at !== t.detail.at);
      await this._writeSchedule(e), this._mode = "list", this._editing = null;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null;
    };
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._profile === "" && (this._profile = cl(this.hass) ?? "home", this._refresh());
  }
  updated(t) {
    if (t.has("hass") && this.hass) {
      const e = cl(this.hass);
      e && e !== this._profile && (this._profile = e, this._refresh());
    }
  }
  async _refresh() {
    if (!(!this.hass || !this.zone || !this._profile)) {
      this._loading = !0, this._error = null;
      try {
        const t = await gc(this.hass, {
          zone: this.zone,
          profile: this._profile
        });
        this._transitions = t?.baseline ? [...t.baseline] : [];
      } catch (t) {
        this._error = t instanceof Error ? t.message : "Failed to load schedule.";
      } finally {
        this._loading = !1;
      }
    }
  }
  async _writeSchedule(t) {
    if (this.hass)
      try {
        await vc(this.hass, {
          zone: this.zone,
          profile: this._profile,
          transitions: t
        }), this._transitions = t, this._refresh();
      } catch (e) {
        this._error = e instanceof Error ? e.message : "Failed to save schedule.";
      }
  }
  render() {
    if (!this.hass) return at;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: jf(this._transitions),
        high: Bf(this._transitions)
      };
      return F`
        <transition-edit-dialog
          .transition=${t}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return F`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? F`<div class="loading">Loading schedule…</div>` : this._error ? F`<div class="error">${this._error}</div>` : F`
              <timeline-editor
                .transitions=${this._transitions}
                @transition-add=${this._onAdd}
                @transition-edit=${this._onEdit}
                @transition-delete=${this._onDelete}
              ></timeline-editor>
              ${this._renderList()}
            `}
    `;
  }
  _renderList() {
    return this._transitions.length === 0 ? at : F`
      <ul class="list">
        ${this._transitions.map(
      (t) => F`
            <li
              @click=${() => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: t } }))}
            >
              <span class="at">${t.at}</span>
              <span>${t.low.toFixed(1)}° – ${t.high.toFixed(1)}°</span>
            </li>
          `
    )}
      </ul>
    `;
  }
};
we.styles = [
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
je([
  G({ attribute: !1 })
], we.prototype, "hass", 2);
je([
  G({ type: String })
], we.prototype, "zone", 2);
je([
  Pt()
], we.prototype, "_profile", 2);
je([
  Pt()
], we.prototype, "_transitions", 2);
je([
  Pt()
], we.prototype, "_loading", 2);
je([
  Pt()
], we.prototype, "_error", 2);
je([
  Pt()
], we.prototype, "_mode", 2);
je([
  Pt()
], we.prototype, "_editing", 2);
je([
  Pt()
], we.prototype, "_newAt", 2);
we = je([
  ae("comfort-band-schedule-tab")
], we);
function cl(t) {
  const e = yl(t);
  return e ? t.states[e]?.state ?? null : null;
}
function jf(t) {
  return t.length === 0 ? 19 : t[t.length - 1].low;
}
function Bf(t) {
  return t.length === 0 ? 22 : t[t.length - 1].high;
}
var Wf = Object.defineProperty, Gf = Object.getOwnPropertyDescriptor, li = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Gf(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Wf(e, n, o), o;
};
const Yf = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "insights", label: "Insights" }
];
let Ve = class extends It {
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
    if (!this._isOpen) return at;
    const t = this.zoneName || this.zone || "Comfort Band";
    return F`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${t}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${Yf.map(
      (e) => F`
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
        return F`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return F`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return F`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "insights":
        return F`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Ve.styles = [
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
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
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
li([
  G({ attribute: !1 })
], Ve.prototype, "hass", 2);
li([
  G({ type: String })
], Ve.prototype, "zone", 2);
li([
  G({ type: String })
], Ve.prototype, "zoneName", 2);
li([
  G({ attribute: !1 })
], Ve.prototype, "entities", 2);
li([
  Pt()
], Ve.prototype, "_activeTab", 2);
li([
  Pt()
], Ve.prototype, "_isOpen", 2);
li([
  Dn("dialog")
], Ve.prototype, "_dialog", 2);
Ve = li([
  ae("comfort-band-modal")
], Ve);
var Kf = Object.defineProperty, qf = Object.getOwnPropertyDescriptor, zr = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? qf(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Kf(e, n, o), o;
};
let Mn = class extends It {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (t) => {
      const e = t.target.value;
      this._fireConfig({ ...this.config, zone: e });
    }, this._onCompactChange = (t) => {
      const e = t.target.checked, n = { ...this.config };
      e ? n.compact = !0 : delete n.compact, this._fireConfig(n);
    }, this._onVariantChange = (t) => {
      const e = t.target.value, n = { ...this.config };
      e === "mini" ? n.variant = "mini" : delete n.variant, this._fireConfig(n);
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
      for (const [n, i] of e.identifiers)
        n === "comfort_band" && i.startsWith("zone:") && t.push(i.slice(5));
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
      return F`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const e = this.config.variant === "mini" ? "mini" : "tile";
    return F`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? F`<option value="" disabled selected>Select a zone…</option>` : null}
          ${t.map(
      (n) => F` <option value=${n} ?selected=${n === this.config.zone}>${n}</option> `
    )}
        </select>
      </label>
      <label>
        Variant
        <select @change=${this._onVariantChange} .value=${e}>
          <option value="tile" ?selected=${e === "tile"}>Tile (default)</option>
          <option value="mini" ?selected=${e === "mini"}>Mini (number only, for floorplans)</option>
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
Mn.styles = [
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
zr([
  G({ attribute: !1 })
], Mn.prototype, "hass", 2);
zr([
  G({ attribute: !1 })
], Mn.prototype, "config", 2);
Mn = zr([
  ae("comfort-band-card-editor")
], Mn);
var Zf = Object.defineProperty, Jf = Object.getOwnPropertyDescriptor, bo = (t, e, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Jf(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = (i ? a(e, n, o) : a(o)) || o);
  return i && o && Zf(e, n, o), o;
};
let on = class extends It {
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
      for (const n of Object.values(t.devices)) {
        for (const [i, o] of n.identifiers)
          if (i === "comfort_band" && o.startsWith("zone:")) {
            e = o.slice(5);
            break;
          }
        if (e) break;
      }
    return { type: "custom:comfort-band-card", zone: e };
  }
  render() {
    if (!this._config || !this.hass) return F``;
    const t = this._config.zone, e = kc(this.hass, t);
    if (e.deviceId === null)
      return F`<div class="placeholder">
        Comfort Band zone <code>${t}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const n = this._config.compact === !0, i = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, e);
    return F`
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
      ${n ? null : F`<comfort-band-modal
            .hass=${this.hass}
            zone=${t}
            zoneName=${o.zoneName}
            .entities=${e}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(t, e) {
    const n = (o) => o !== null ? t.states[o] : void 0, i = (o) => {
      const s = n(o);
      if (!s) return NaN;
      const a = parseFloat(s.state);
      return Number.isFinite(a) ? a : NaN;
    };
    return {
      zoneName: e.deviceName ?? this._config.zone,
      low: i(e.effectiveLow),
      high: i(e.effectiveHigh),
      roomTemp: i(e.roomTemperature),
      action: n(e.currentAction)?.state ?? "unknown",
      overrideActive: n(e.overrideActive)?.state === "on",
      overrideEnds: n(e.overrideEnds)?.state ?? null
    };
  }
};
on.styles = [
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
bo([
  G({ attribute: !1 })
], on.prototype, "hass", 2);
bo([
  Pt()
], on.prototype, "_config", 2);
bo([
  Dn("comfort-band-modal")
], on.prototype, "_modal", 2);
on = bo([
  ae("comfort-band-card")
], on);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.3.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
