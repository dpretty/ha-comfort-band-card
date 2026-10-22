const $o = globalThis, Us = $o.ShadowRoot && ($o.ShadyCSS === void 0 || $o.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Vs = Symbol(), Kr = /* @__PURE__ */ new WeakMap();
let tl = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Vs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Us && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Kr.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Kr.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ws = (e) => new tl(typeof e == "string" ? e : e + "", void 0, Vs), Ne = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new tl(i, e, Vs);
}, Hc = (e, t) => {
  if (Us) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = $o.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, qr = Us ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Ws(i);
})(e) : e;
const { is: Fc, defineProperty: Rc, getOwnPropertyDescriptor: Bc, getOwnPropertyNames: jc, getOwnPropertySymbols: Ic, getPrototypeOf: Uc } = Object, Mo = globalThis, Yr = Mo.trustedTypes, Vc = Yr ? Yr.emptyScript : "", Wc = Mo.reactiveElementPolyfillSupport, Gn = (e, t) => e, So = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Vc : null;
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
} }, Gs = (e, t) => !Fc(e, t), Zr = { attribute: !0, type: String, converter: So, reflect: !1, useDefault: !1, hasChanged: Gs };
Symbol.metadata ??= Symbol("metadata"), Mo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let pn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Zr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Rc(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: r } = Bc(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const u = o?.call(this);
      r?.call(this, a), this.requestUpdate(t, u, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Gn("elementProperties"))) return;
    const t = Uc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Gn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Gn("properties"))) {
      const i = this.properties, n = [...jc(i), ...Ic(i)];
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
      for (const o of n) i.unshift(qr(o));
    } else t !== void 0 && i.push(qr(t));
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
    return Hc(t, this.constructor.elementStyles), t;
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
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : So).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : So;
      this._$Em = o;
      const u = a.fromAttribute(i, r.type);
      this[o] = u ?? this._$Ej?.get(o) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? Gs)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: r }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: a } = r, u = this[o];
        a !== !0 || this._$AL.has(o) || u === void 0 || this.C(o, void 0, r, u);
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
pn.elementStyles = [], pn.shadowRootOptions = { mode: "open" }, pn[Gn("elementProperties")] = /* @__PURE__ */ new Map(), pn[Gn("finalized")] = /* @__PURE__ */ new Map(), Wc?.({ ReactiveElement: pn }), (Mo.reactiveElementVersions ??= []).push("2.1.2");
const Ks = globalThis, Jr = (e) => e, Ao = Ks.trustedTypes, Qr = Ao ? Ao.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, il = "$lit$", di = `lit$${Math.random().toFixed(9).slice(2)}$`, nl = "?" + di, Gc = `<${nl}>`, Fi = document, Yn = () => Fi.createComment(""), Zn = (e) => e === null || typeof e != "object" && typeof e != "function", qs = Array.isArray, Kc = (e) => qs(e) || typeof e?.[Symbol.iterator] == "function", ps = `[ 	
\f\r]`, Rn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Xr = /-->/g, ea = />/g, Pi = RegExp(`>|${ps}(?:([^\\s"'>=/]+)(${ps}*=${ps}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ta = /'/g, ia = /"/g, ol = /^(?:script|style|textarea|title)$/i, sl = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), y = sl(1), fi = sl(2), bn = Symbol.for("lit-noChange"), N = Symbol.for("lit-nothing"), na = /* @__PURE__ */ new WeakMap(), Oi = Fi.createTreeWalker(Fi, 129);
function rl(e, t) {
  if (!qs(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qr !== void 0 ? Qr.createHTML(t) : t;
}
const qc = (e, t) => {
  const i = e.length - 1, n = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Rn;
  for (let u = 0; u < i; u++) {
    const d = e[u];
    let f, g, m = -1, _ = 0;
    for (; _ < d.length && (a.lastIndex = _, g = a.exec(d), g !== null); ) _ = a.lastIndex, a === Rn ? g[1] === "!--" ? a = Xr : g[1] !== void 0 ? a = ea : g[2] !== void 0 ? (ol.test(g[2]) && (o = RegExp("</" + g[2], "g")), a = Pi) : g[3] !== void 0 && (a = Pi) : a === Pi ? g[0] === ">" ? (a = o ?? Rn, m = -1) : g[1] === void 0 ? m = -2 : (m = a.lastIndex - g[2].length, f = g[1], a = g[3] === void 0 ? Pi : g[3] === '"' ? ia : ta) : a === ia || a === ta ? a = Pi : a === Xr || a === ea ? a = Rn : (a = Pi, o = void 0);
    const k = a === Pi && e[u + 1].startsWith("/>") ? " " : "";
    r += a === Rn ? d + Gc : m >= 0 ? (n.push(f), d.slice(0, m) + il + d.slice(m) + di + k) : d + di + (m === -2 ? u : k);
  }
  return [rl(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Jn {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let r = 0, a = 0;
    const u = t.length - 1, d = this.parts, [f, g] = qc(t, i);
    if (this.el = Jn.createElement(f, n), Oi.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = Oi.nextNode()) !== null && d.length < u; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(il)) {
          const _ = g[a++], k = o.getAttribute(m).split(di), C = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: r, name: C[2], strings: k, ctor: C[1] === "." ? Zc : C[1] === "?" ? Jc : C[1] === "@" ? Qc : zo }), o.removeAttribute(m);
        } else m.startsWith(di) && (d.push({ type: 6, index: r }), o.removeAttribute(m));
        if (ol.test(o.tagName)) {
          const m = o.textContent.split(di), _ = m.length - 1;
          if (_ > 0) {
            o.textContent = Ao ? Ao.emptyScript : "";
            for (let k = 0; k < _; k++) o.append(m[k], Yn()), Oi.nextNode(), d.push({ type: 2, index: ++r });
            o.append(m[_], Yn());
          }
        }
      } else if (o.nodeType === 8) if (o.data === nl) d.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(di, m + 1)) !== -1; ) d.push({ type: 7, index: r }), m += di.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = Fi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function _n(e, t, i = e, n) {
  if (t === bn) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = Zn(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = _n(e, o._$AS(e, t.values), o, n)), t;
}
class Yc {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Fi).importNode(i, !0);
    Oi.currentNode = o;
    let r = Oi.nextNode(), a = 0, u = 0, d = n[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let f;
        d.type === 2 ? f = new io(r, r.nextSibling, this, t) : d.type === 1 ? f = new d.ctor(r, d.name, d.strings, this, t) : d.type === 6 && (f = new Xc(r, this, t)), this._$AV.push(f), d = n[++u];
      }
      a !== d?.index && (r = Oi.nextNode(), a++);
    }
    return Oi.currentNode = Fi, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class io {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = N, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = _n(this, t, i), Zn(t) ? t === N || t == null || t === "" ? (this._$AH !== N && this._$AR(), this._$AH = N) : t !== this._$AH && t !== bn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== N && Zn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Fi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Jn.createElement(rl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const r = new Yc(o, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = na.get(t.strings);
    return i === void 0 && na.set(t.strings, i = new Jn(t)), i;
  }
  k(t) {
    qs(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const r of t) o === i.length ? i.push(n = new io(this.O(Yn()), this.O(Yn()), this, this.options)) : n = i[o], n._$AI(r), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Jr(t).nextSibling;
      Jr(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class zo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, r) {
    this.type = 1, this._$AH = N, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = N;
  }
  _$AI(t, i = this, n, o) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = _n(this, t, i, 0), a = !Zn(t) || t !== this._$AH && t !== bn, a && (this._$AH = t);
    else {
      const u = t;
      let d, f;
      for (t = r[0], d = 0; d < r.length - 1; d++) f = _n(this, u[n + d], i, d), f === bn && (f = this._$AH[d]), a ||= !Zn(f) || f !== this._$AH[d], f === N ? t = N : t !== N && (t += (f ?? "") + r[d + 1]), this._$AH[d] = f;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === N ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Zc extends zo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === N ? void 0 : t;
  }
}
class Jc extends zo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== N);
  }
}
class Qc extends zo {
  constructor(t, i, n, o, r) {
    super(t, i, n, o, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = _n(this, t, i, 0) ?? N) === bn) return;
    const n = this._$AH, o = t === N && n !== N || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== N && (n === N || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    _n(this, t);
  }
}
const eu = Ks.litHtmlPolyfillSupport;
eu?.(Jn, io), (Ks.litHtmlVersions ??= []).push("3.3.2");
const tu = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = o = new io(t.insertBefore(Yn(), r), r, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const Ys = globalThis;
class Ce extends pn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = tu(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return bn;
  }
}
Ce._$litElement$ = !0, Ce.finalized = !0, Ys.litElementHydrateSupport?.({ LitElement: Ce });
const iu = Ys.litElementPolyfillSupport;
iu?.({ LitElement: Ce });
(Ys.litElementVersions ??= []).push("4.2.2");
const Ve = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const nu = { attribute: !0, type: String, converter: So, reflect: !1, hasChanged: Gs }, ou = (e = nu, t, i) => {
  const { kind: n, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(u) {
      const d = t.get.call(this);
      t.set.call(this, u), this.requestUpdate(a, d, e, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(a, void 0, e, u), u;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(u) {
      const d = this[a];
      t.call(this, u), this.requestUpdate(a, d, e, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function z(e) {
  return (t, i) => typeof i == "object" ? ou(e, t, i) : ((n, o, r) => {
    const a = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, i);
}
function te(e) {
  return z({ ...e, state: !0, attribute: !1 });
}
const su = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function kn(e, t) {
  return (i, n, o) => {
    const r = (a) => a.renderRoot?.querySelector(e) ?? null;
    return su(i, n, { get() {
      return r(this);
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
function al(e) {
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
function ru(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
var au = Object.defineProperty, lu = Object.getOwnPropertyDescriptor, ji = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? lu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && au(t, i, o), o;
};
const Ts = 15, ll = 28, cu = ll - Ts;
function ms(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(Ts, Math.min(ll, e)) - Ts) / cu * 100;
}
let Qt = class extends Ce {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = ru(this.action), t = al(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), o = Number.isFinite(this.room), r = i ? ms(this.low) : 0, a = n ? ms(this.high) : 100, u = Math.min(r, a), d = Math.max(0, Math.abs(a - r)), f = o ? ms(this.room) : 50, g = (k) => Number.isFinite(k) ? `${k.toFixed(1)}°` : "—", m = e === "heating" || e === "cooling" ? `, ${e}` : "", _ = `Comfortable range ${g(this.low)} to ${g(this.high)}, ${this.roomLabel} ${g(this.room)}${m}`;
    return y`
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        role=${this.decorative ? N : "img"}
        aria-label=${this.decorative ? N : _}
        aria-hidden=${this.decorative ? "true" : N}
      >
        ${fi`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? fi`<rect class="band" x=${u} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${o ? fi`<circle cx=${f} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${o ? fi`<circle class="marker-ring" cx=${f} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
Qt.styles = [
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
ji([
  z({ type: Number })
], Qt.prototype, "low", 2);
ji([
  z({ type: Number })
], Qt.prototype, "high", 2);
ji([
  z({ type: Number })
], Qt.prototype, "room", 2);
ji([
  z({ type: String })
], Qt.prototype, "roomLabel", 2);
ji([
  z({ type: Boolean })
], Qt.prototype, "decorative", 2);
ji([
  z({ type: String })
], Qt.prototype, "action", 2);
Qt = ji([
  Ve("band-gauge")
], Qt);
const uu = 0.5, hu = 10, du = 35;
function Qn(e) {
  return `${Co(e.low)}–${Co(e.high)}°`;
}
function Co(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function mo(e, t) {
  let i = t * uu;
  return i > 0 && (i = Math.max(0, Math.min(i, du - e.high))), i < 0 && (i = Math.min(0, Math.max(i, hu - e.low))), { low: oa(e.low + i), high: oa(e.high + i) };
}
function oa(e) {
  return Math.round(e * 10) / 10;
}
function cl(e) {
  const { room: t, apparent: i, useApparent: n } = e, o = Number.isFinite(t) && Number.isFinite(i) && Ps(i) !== Ps(t);
  return n && Number.isFinite(i) ? {
    value: i,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${i.toFixed(1)}°` : "" };
}
function Ps(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function ul(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const i = Ps(e);
  return i < Math.round(t.low * 10) ? "below" : i > Math.round(t.high * 10) ? "above" : "in";
}
const fu = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function hl(e) {
  if (e.doing) return { kind: "adjusting", text: e.doing };
  if (!e.enabled) return { kind: "paused", text: "Paused: not controlling this room" };
  if (e.sensor === "offline")
    return { kind: "sensor", text: "On hold: the room sensor is offline" };
  if (e.sensor === "no-reading")
    return { kind: "sensor", text: "On hold: no room temperature reading" };
  const t = pu(e);
  return e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${t.text}` } : t;
}
function pu(e) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const t = ul(e.temperature, e.band), i = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? t === "in" ? "comfortable" : t ?? "idle" : "none", n = fu[i];
  let o;
  if (e.overrideActive) {
    const a = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    o = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${Qn(e.band)}${a}`;
  } else {
    const a = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    o = `${Qn(e.band)}${a}`;
  }
  const r = n ? `${n} · ${o}` : o.charAt(0).toUpperCase() + o.slice(1);
  return { kind: i, text: r };
}
function Zs(e, t) {
  const i = new Date(e), n = t?.locale?.time_format, o = t?.locale?.language;
  let r;
  if (n === "12") r = !0;
  else if (n === "24") r = !1;
  else {
    const u = new Intl.DateTimeFormat(n === "system" ? void 0 : o, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    r = u === "h11" || u === "h12";
  }
  const a = {
    hourCycle: r ? "h12" : "h23",
    hour: r ? "numeric" : "2-digit"
  };
  return (!r || i.getMinutes() !== 0) && (a.minute = "2-digit"), new Intl.DateTimeFormat(o, a).format(i);
}
function sa(e, t) {
  const i = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!i) return e;
  const n = Number(i[1]), o = Number(i[2]);
  return n > 23 || o > 59 ? e : Zs(new Date(2e3, 0, 1, n, o).getTime(), t);
}
function Yt(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function go(e, t) {
  const i = Yt(e, t);
  if (!i) return NaN;
  const n = parseFloat(i.state);
  return Number.isFinite(n) ? n : NaN;
}
function dl(e, t) {
  const i = Yt(e, t.nextBandChange);
  if (!i) return { scheduled: null, nextChange: null };
  const n = i.attributes.scheduled, o = Date.parse(i.state);
  return {
    scheduled: typeof n == "boolean" ? n : null,
    nextChange: Number.isNaN(o) ? null : o
  };
}
function Js(e, t) {
  const i = go(e, t.roomTemperature), n = go(e, t.apparentTemperature), o = Yt(e, t.useApparentTemperature)?.state === "on", r = Date.parse(Yt(e, t.overrideEnds)?.state ?? ""), a = Yt(e, t.roomTemperature)?.attributes.source, u = a === "climate" || a === "fallback_sensor" ? a : null, d = Yt(e, t.roomSensorUnavailable)?.state === "on" || u !== null, f = Number.isFinite(i) || Number.isFinite(n);
  return {
    enabled: Yt(e, t.enabled)?.state !== "off",
    action: Yt(e, t.currentAction)?.state ?? "unknown",
    room: i,
    apparent: n,
    useApparent: o,
    temperature: cl({ room: i, apparent: n, useApparent: o }).value,
    feelsLike: o && Number.isFinite(n),
    band: {
      low: go(e, t.effectiveLow),
      high: go(e, t.effectiveHigh)
    },
    overrideActive: Yt(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(r) ? null : r,
    ...dl(e, t),
    sensor: d ? f ? "stand-in" : "offline" : f ? "ok" : "no-reading",
    standIn: u
  };
}
function Qs(e) {
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
}, mu = {
  paused: ui.paused,
  sensor: ui.sensor,
  heating: ui.heating,
  cooling: ui.cooling,
  below: ui.below,
  above: ui.above,
  adjusted: "mdi:timer-outline"
};
function gu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !Qs(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const i = ul(e.temperature, e.band);
    (i === "below" || i === "above") && t.push(i);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function bu(e) {
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
var _u = Object.defineProperty, vu = Object.getOwnPropertyDescriptor, xt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? vu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && _u(t, i, o), o;
};
let nt = class extends Ce {
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
            ${this.feelsLike ? y`<span class="sr-only"> feels like </span>` : N}${this._renderTemperature()}<span class="sr-only">. </span>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${al(e)}` : "", i = this._label();
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
              icon=${mu[n]}
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
xt([
  z({ type: String })
], nt.prototype, "zoneName", 2);
xt([
  z({ type: Number })
], nt.prototype, "temperature", 2);
xt([
  z({ type: Boolean })
], nt.prototype, "feelsLike", 2);
xt([
  z({ type: Number })
], nt.prototype, "low", 2);
xt([
  z({ type: Number })
], nt.prototype, "high", 2);
xt([
  z({ type: String })
], nt.prototype, "action", 2);
xt([
  z({ type: String })
], nt.prototype, "statusKind", 2);
xt([
  z({ type: String })
], nt.prototype, "statusText", 2);
xt([
  z({ attribute: !1 })
], nt.prototype, "badges", 2);
xt([
  z({ type: Boolean })
], nt.prototype, "noExpand", 2);
xt([
  z({ type: String, reflect: !0 })
], nt.prototype, "variant", 2);
nt = xt([
  Ve("comfort-band-tile")
], nt);
const ei = "comfort_band";
function yu(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function wu(e, t) {
  return e.callService(ei, "set_schedule", { ...t });
}
function fl(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(ei, "start_override", i);
}
function xu(e, t) {
  return e.callService(ei, "cancel_override", { ...t });
}
function $u(e, t) {
  return e.callService(ei, "set_profile", { ...t });
}
function ku(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(ei, "create_profile", i);
}
function Su(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(ei, "clone_profile", i);
}
function Au(e, t) {
  return e.callService(ei, "rename_profile", { old: t.old, new: t.new });
}
function Cu(e, t) {
  return e.callService(ei, "delete_profile", { name: t.name });
}
function Eu(e, t) {
  return e.callService(ei, "record_feedback", { zone: t.zone, label: t.label });
}
var Tu = Object.defineProperty, Pu = Object.getOwnPropertyDescriptor, bi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Pu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Tu(t, i, o), o;
};
const Du = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], Mu = 1500, zu = 1500, Nu = 3;
let Ut = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this._feedbackConfirmed = null, this._feedbackTimer = null, this._feedbackSeq = 0, this._length = null, this._burst = null, this._burstTimer = null, this._busy = null, this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const o = this._bandInForce();
        if (!o) return;
        t = { base: o, steps: 0, picked: !1 };
      }
      const i = mo(t.base, t.steps), n = mo(t.base, t.steps + e);
      n.low === i.low && n.high === i.high || (this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), zu));
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
      this._run(i, () => xu(e, { zone: t }));
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await Eu(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, Mu));
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
    return !this.hass || !this.entities ? { scheduled: null, nextChange: null } : dl(this.hass, this.entities);
  }
  /** The length in force: the one picked here, else three hours. */
  _hours() {
    return this._length ?? Nu;
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
      `Adjusting to ${Qn(e)}`,
      () => fl(i, { zone: n, low: e.low, high: e.high, hours: t })
    );
  }
  /** Sends the taps so far as one change; nothing if they cancel out, unless
   *  a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    this._burst = null, e && (e.steps !== 0 ? this._sendBand(mo(e.base, e.steps), this._hours()) : e.picked && this._retime(this._hours()));
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
    if (!this.hass || !this.entities) return N;
    const e = Date.now(), t = Js(this.hass, this.entities), { room: i, apparent: n, useApparent: o, feelsLike: r, overrideActive: a, scheduled: u } = t, { low: d, high: f } = t.band, g = cl({ room: i, apparent: n, useApparent: o }), m = bu(t), _ = this._burst, k = _ && _.steps !== 0 ? `Adjusting to ${Qn(mo(_.base, _.steps))}` : this._busy, C = hl({
      ...t,
      doing: k,
      now: e,
      formatTime: (O) => Zs(O, this.hass)
    });
    return y`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(g.value) ? `${g.value.toFixed(1)}°` : "—"}</span
        >
        ${g.note ? y`<span class="note">${g.note}</span>` : N}
      </div>
      ${o && !Number.isFinite(n) && Number.isFinite(i) ? y`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : N}
      <div class="gauge-row">
        <band-gauge
          .low=${d}
          .high=${f}
          .room=${g.value}
          .roomLabel=${r ? "feels like" : "room"}
          .action=${Qs(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${C.kind}" role="status" aria-live="polite">
        <ha-icon icon=${ui[C.kind]} aria-hidden="true"></ha-icon>
        <span>${C.text}</span>
      </div>
      ${m ? y`<div class="notice">${m}</div>` : N}
      ${this._renderAdjust(a, u)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const i = this._busy !== null ? "true" : "false", n = this._hours();
    return y`
      <section class="adjust">
        ${t === !1 ? N : y`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${[1, 3].map(
      (r) => y`<button
                      aria-pressed=${n === r ? "true" : "false"}
                      aria-disabled=${i}
                      data-length=${r}
                      @click=${() => this._onPickLength(r)}
                    >
                      ${r} h
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
            </div>` : N}
        ${e && t !== !1 ? y`<button class="back" aria-disabled=${i} @click=${this._onBackToSchedule}>
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>` : N}
      </section>
    `;
  }
  _renderFeedbackSection() {
    return y`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${Du.map(
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
Ut.styles = [
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
bi([
  z({ attribute: !1 })
], Ut.prototype, "hass", 2);
bi([
  z({ type: String })
], Ut.prototype, "zone", 2);
bi([
  z({ attribute: !1 })
], Ut.prototype, "entities", 2);
bi([
  te()
], Ut.prototype, "_feedbackConfirmed", 2);
bi([
  te()
], Ut.prototype, "_length", 2);
bi([
  te()
], Ut.prototype, "_burst", 2);
bi([
  te()
], Ut.prototype, "_busy", 2);
Ut = bi([
  Ve("comfort-band-now-tab")
], Ut);
var Ou = Object.defineProperty, Lu = Object.getOwnPropertyDescriptor, pl = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Lu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Ou(t, i, o), o;
};
const bo = 14, _o = 28, un = 600, vo = 200, gs = [0, 6, 12, 18, 24], ra = [14, 18, 22, 26];
function Li(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function Hu(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let Eo = class extends Ce {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * un;
  }
  _tempToY(e) {
    const t = Hu(e, bo, _o);
    return vo - (t - bo) / (_o - bo) * vo;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const i = e[e.length - 1][t], n = [[0, this._tempToY(i)]];
    let o = i;
    for (const r of e) {
      const a = this._timeToX(Li(r.at));
      n.push([a, this._tempToY(o)]), n.push([a, this._tempToY(r[t])]), o = r[t];
    }
    return n.push([un, this._tempToY(o)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([o, r]) => `L ${o} ${r}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = [...this.transitions].sort((u, d) => Li(u.at) - Li(d.at)), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(i) : "", r = t ? this._pointsToPath(n) : "", a = t ? this._fillFromPoints(n, i) : "";
    return y`
      <div class="chart">
        <svg
          viewBox="0 0 ${un} ${vo}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${ra.map(
      (u) => fi`<line class="grid" x1="0" x2=${un} y1=${this._tempToY(u)} y2=${this._tempToY(u)}></line>`
    )}
          ${gs.map(
      (u) => fi`<line class="grid" y1="0" y2=${vo} x1=${u / 24 * un} x2=${u / 24 * un}></line>`
    )}
          ${t ? fi`
                <path class="fill" d=${a}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${r}></path>
              ` : null}
          ${e.map((u) => {
      const d = this._timeToX(Li(u.at));
      return fi`
              <circle class="marker low" cx=${d} cy=${this._tempToY(u.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(u.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${ra.map(
      (u) => y`<div
              class="axis-label y"
              style="top: ${(_o - u) / (_o - bo) * 100}%"
            >
              ${u}°
            </div>`
    )}
        ${gs.map((u, d) => {
      const f = d === 0 ? "axis-label x start" : d === gs.length - 1 ? "axis-label x end" : "axis-label x";
      return y`<div class=${f} style="left: ${u / 24 * 100}%">${u}h</div>`;
    })}
      </div>
    `;
  }
};
Eo.styles = [
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
pl([
  z({ type: Array })
], Eo.prototype, "transitions", 2);
Eo = pl([
  Ve("comfort-band-schedule-chart")
], Eo);
var Fu = Object.defineProperty, Ru = Object.getOwnPropertyDescriptor, _i = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ru(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Fu(t, i, o), o;
};
let Vt = class extends Ce {
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
Vt.styles = [
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
_i([
  z({ type: Object })
], Vt.prototype, "transition", 2);
_i([
  z({ type: Boolean })
], Vt.prototype, "isNew", 2);
_i([
  te()
], Vt.prototype, "_at", 2);
_i([
  te()
], Vt.prototype, "_low", 2);
_i([
  te()
], Vt.prototype, "_high", 2);
_i([
  te()
], Vt.prototype, "_error", 2);
_i([
  kn('input[name="at"]')
], Vt.prototype, "_atInput", 2);
Vt = _i([
  Ve("transition-edit-dialog")
], Vt);
const No = "comfort_band", Bu = {
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
  use_apparent_temperature: "useApparentTemperature",
  cross_mode_min_minutes: "crossModeMinMinutes",
  lookahead_minutes: "lookaheadMinutes",
  passive_tolerance: "passiveTolerance",
  mpc_horizon_minutes: "mpcHorizonMinutes",
  band_ramp_minutes: "bandRampMinutes",
  peak_heat_offset: "peakHeatOffset",
  peak_cool_offset: "peakCoolOffset",
  peak_precondition_minutes: "peakPreconditionMinutes",
  mpc_enabled: "mpcEnabled",
  fan_control_enabled: "fanControlEnabled",
  peak_saving_enabled: "peakSavingEnabled",
  active_fan_mode: "activeFanMode",
  idle_fan_mode: "idleFanMode",
  schedule_assignment: "scheduleAssignment"
};
function ju() {
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
    crossModeMinMinutes: null,
    lookaheadMinutes: null,
    passiveTolerance: null,
    mpcHorizonMinutes: null,
    bandRampMinutes: null,
    peakHeatOffset: null,
    peakCoolOffset: null,
    peakPreconditionMinutes: null,
    mpcEnabled: null,
    fanControlEnabled: null,
    peakSavingEnabled: null,
    activeFanMode: null,
    idleFanMode: null,
    scheduleAssignment: null,
    deviceId: null,
    deviceName: null
  };
}
function Xs(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, o] of i.identifiers)
      if (n === t[0] && o === t[1])
        return i;
  return null;
}
function ml(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === No
  );
}
function gl(e, t) {
  const i = ju(), n = Xs(e, [No, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const o of ml(e, n.id)) {
    const r = o.translation_key;
    if (r === null) continue;
    const a = Bu[r];
    a !== void 0 && (i[a] = o.entity_id);
  }
  return i;
}
function bl(e) {
  return Xs(e, [No, "profile_manager"]) !== null;
}
function _l(e) {
  return e ? !(e.state === "unavailable" && e.attributes.default_profile === void 0) : !1;
}
function er(e) {
  const t = Xs(e, [No, "profile_manager"]);
  if (t === null) return null;
  for (const i of ml(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function vl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function yl(e, t, i) {
  const n = t.name?.trim();
  if (n) return n;
  const o = i.deviceId !== null ? e.devices[i.deviceId]?.area_id : null, r = o ? e.areas?.[o]?.name?.trim() : void 0;
  return r || (i.deviceName ?? t.zone);
}
var Iu = Object.defineProperty, Uu = Object.getOwnPropertyDescriptor, Nt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Uu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Iu(t, i, o), o;
};
function aa(e, t) {
  return Li(e.at) - Li(t.at);
}
const bs = 15, _s = 24 * 60;
function Vu(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((n) => Li(n.at))), i = Math.max(...t);
  for (let n = 1; n <= _s / bs; n++) {
    const o = (i + n * bs) % _s;
    if (!t.has(o)) return la(o);
  }
  return la((i + bs) % _s);
}
function la(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
let ht = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = Vu(this._transitions), this._newLow = ca(this._transitions), this._newHigh = ua(this._transitions), this._editing = null, this._mode = "add";
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
        for (const o of this._transitions)
          o.at !== n && o.at !== t.at && i.push(o);
        i.push(t);
      } else {
        for (const n of this._transitions)
          n.at !== t.at && i.push(n);
        i.push(t);
      }
      i.sort(aa), await this._writeSchedule(i), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = vs(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = vs(this.hass);
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
      const t = await yu(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(aa) : [], this._loading = !1);
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
      await wu(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return N;
    if (this._mode === "add" || this._mode === "edit") {
      const e = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? ca(this._transitions),
        high: this._newHigh ?? ua(this._transitions)
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
    const e = this.hass ? vs(this.hass) : null;
    return !e || e === "unavailable" || e === "unknown" ? N : y`<div class="header">
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
    const t = sa(e.at, this.hass), i = `Edit the ${t} change, ${Co(e.low)} to ${Co(e.high)} degrees`;
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
        <span class="band">${Qn(e)}</span>
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
    const t = `Delete the ${sa(e.at, this.hass)} change?`;
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
Nt([
  z({ attribute: !1 })
], ht.prototype, "hass", 2);
Nt([
  z({ type: String })
], ht.prototype, "zone", 2);
Nt([
  te()
], ht.prototype, "_profile", 2);
Nt([
  te()
], ht.prototype, "_transitions", 2);
Nt([
  te()
], ht.prototype, "_loading", 2);
Nt([
  te()
], ht.prototype, "_error", 2);
Nt([
  te()
], ht.prototype, "_mode", 2);
Nt([
  te()
], ht.prototype, "_editing", 2);
Nt([
  te()
], ht.prototype, "_newAt", 2);
Nt([
  te()
], ht.prototype, "_confirmingDeleteAt", 2);
ht = Nt([
  Ve("comfort-band-schedule-tab")
], ht);
function vs(e) {
  const t = er(e);
  return t ? e.states[t]?.state ?? null : null;
}
function ca(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function ua(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Wu = Object.defineProperty, Gu = Object.getOwnPropertyDescriptor, Sn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Gu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Wu(t, i, o), o;
};
const Ku = 1e3, hn = (e, t, i) => ({
  kind: "switch",
  field: e,
  title: t,
  desc: i
}), vt = (e, t, i) => ({
  kind: "number",
  field: e,
  title: t,
  desc: i
}), ys = (e, t, i) => ({
  kind: "select",
  field: e,
  title: t,
  desc: i
}), qu = {
  comfort: {
    main: [
      hn(
        "useApparentTemperature",
        "Use “feels like”",
        "When on, heating and cooling go by the humidity-adjusted “feels like” temperature instead of the room’s own reading. Falls back to the room’s reading automatically if the humidity sensor is unavailable."
      ),
      vt(
        "deadbandBelow",
        "Heating starts below the range by",
        "How far below the range the room may drop before heating starts. Heating stops once it’s back at the bottom of the range."
      ),
      vt(
        "deadbandAbove",
        "Cooling starts above the range by",
        "How far above the range the room may rise before cooling starts. Cooling stops once it’s back at the top of the range."
      ),
      vt(
        "bandRampMinutes",
        "Ease schedule changes over",
        "Spreads each change of range over this long, centred on its time, instead of changing all at once. 0 changes at once."
      ),
      vt(
        "overrideHours",
        "Adjustments made elsewhere last",
        "How long an adjustment lasts when it’s started without a length: from the device page, or an automation that doesn’t give one. Warmer, Cooler and the exact range here set their own length."
      )
    ]
  },
  automation: {
    main: [
      hn(
        "enabled",
        "Control this room",
        "When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused."
      ),
      hn(
        "learningEnabled",
        "Learning",
        "Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings; it just doesn’t act on what it has learned."
      ),
      hn(
        "mpcEnabled",
        "Predictive control",
        "Plans whole heating and cooling cycles ahead, from what the room has learned and the schedule coming up. Needs Learning on, and acts once the room has learned enough, usually after a few hours of normal running."
      )
    ],
    fine: [
      vt(
        "lookaheadMinutes",
        "Look ahead by",
        "How far ahead learning projects the room’s temperature, to start early or hold off."
      ),
      vt(
        "passiveTolerance",
        "Let it drift back within",
        "How far outside the range the room may be for learning to let it drift back on its own, rather than heat or cool."
      ),
      vt(
        "mpcHorizonMinutes",
        "Plan ahead by",
        "How far ahead predictive control plans, schedule changes included."
      ),
      vt(
        "minCycleMinutes",
        "Repeat a command no sooner than",
        "The least time before the unit is sent the same command again, such as a new setting while it’s already heating."
      ),
      vt(
        "crossModeMinMinutes",
        "Switch between heating and cooling no sooner than",
        "The least time after heating stops before cooling may start, or the other way round."
      )
    ]
  },
  fan: {
    main: [
      hn(
        "fanControlEnabled",
        "Fan control",
        "Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen."
      ),
      ys(
        "activeFanMode",
        "Fan while heating or cooling",
        "The fan speed while the unit is working."
      ),
      ys(
        "idleFanMode",
        "Fan while idle",
        "The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed."
      )
    ]
  },
  peak: {
    main: [
      hn(
        "peakSavingEnabled",
        "Peak saving",
        "Keeps heating and cooling out of expensive power times: relaxes the range during one, and warms or cools the room a little ahead of one that’s announced. Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure."
      ),
      vt(
        "peakHeatOffset",
        "Relax the bottom of the range by",
        "How much lower the room may go during a peak before heating, and how much warmer to make it ahead of one."
      ),
      vt(
        "peakCoolOffset",
        "Relax the top of the range by",
        "How much warmer the room may get during a peak before cooling, and how much cooler to make it ahead of one."
      ),
      vt(
        "peakPreconditionMinutes",
        "Prepare ahead by",
        "How long before an announced peak to warm or cool the room. 0 doesn’t prepare."
      )
    ]
  },
  schedules: {
    main: [
      ys(
        "scheduleAssignment",
        "Follows",
        "Which schedule sets this room’s range: its own, or one shared with other rooms."
      )
    ]
  }
}, Yu = {
  comfort: "v0.4.0",
  automation: "v0.6.0",
  fan: "v0.13.0",
  peak: "v0.24.0",
  schedules: "v0.14.0"
};
function Zu(e) {
  if (e === "(none)") return "Leave as it is";
  const t = e.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function ha(e) {
  const t = String(e), i = t.indexOf(".");
  return i < 0 ? 0 : t.length - i - 1;
}
function dn(e) {
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) ? t : null;
}
let pi = class extends Ce {
  constructor() {
    super(...arguments), this.section = "comfort", this._pending = {}, this._error = null, this._timers = /* @__PURE__ */ new Map(), this._chain = Promise.resolve(), this._onToggle = (e) => {
      if (this._pending[e] !== void 0) return;
      const t = !this._isOn(e);
      this._pending = { ...this._pending, [e]: t }, this._error = null, this._send(e, "switch", t ? "turn_on" : "turn_off", {});
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const [e, t] of this._timers) {
      clearTimeout(t), this._timers.delete(e);
      const i = this._pending[e];
      typeof i == "number" && this._send(e, "number", "set_value", { value: i });
    }
  }
  _entity(e) {
    const t = this.entities?.[e];
    return typeof t == "string" ? t : null;
  }
  /** Sends a call after the ones before it; drops the shown-ahead value
   *  once it's through (HA has reported the change by then) or refused. */
  _send(e, t, i, n) {
    const o = this.hass;
    if (!o) return;
    const r = n.value ?? n.option ?? i;
    this._chain = this._chain.then(() => o.callService(t, i, { entity_id: e, ...n })).catch((a) => {
      this._error = a instanceof Error ? a.message : "That setting couldn’t be changed.";
    }).finally(() => {
      const a = this._pending[e];
      if ((typeof a == "boolean" ? a ? "turn_on" : "turn_off" : a) === r && !this._timers.has(e)) {
        const d = { ...this._pending };
        delete d[e], this._pending = d;
      }
    });
  }
  _isOn(e) {
    const t = this._pending[e];
    return typeof t == "boolean" ? t : this.hass?.states[e]?.state === "on";
  }
  _onStep(e, t) {
    const i = this.hass?.states[e];
    if (!i) return;
    const n = dn(i.attributes.step) ?? 1, o = dn(i.attributes.min) ?? -1 / 0, r = dn(i.attributes.max) ?? 1 / 0, a = this._pending[e], u = typeof a == "number" ? a : Number.parseFloat(i.state);
    if (!Number.isFinite(u)) return;
    const d = ha(n), f = Number(Math.min(r, Math.max(o, u + t * n)).toFixed(d));
    if (f === u) return;
    this._pending = { ...this._pending, [e]: f }, this._error = null;
    const g = this._timers.get(e);
    g !== void 0 && clearTimeout(g), this._timers.set(
      e,
      setTimeout(() => {
        this._timers.delete(e), this._send(e, "number", "set_value", { value: f });
      }, Ku)
    );
  }
  _onChoose(e, t) {
    this._pending = { ...this._pending, [e]: t }, this._error = null, this._send(e, "select", "select_option", { option: t });
  }
  render() {
    if (!this.hass || !this.entities) return N;
    const { main: e, fine: t = [] } = qu[this.section], i = (u) => u.filter((d) => this._entity(d.field) !== null), n = i(e), o = i(t), r = e.length + t.length - n.length - o.length, a = n.length + o.length === 0;
    return y`
      ${this._error ? y`<div class="error" role="alert">${this._error}</div>` : N}
      ${n.map((u) => this._renderSetting(u))}
      ${this.section === "comfort" ? this._renderHumidity() : N}
      ${o.length ? y`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${o.map((u) => this._renderSetting(u))}
          </details>` : N}
      ${a ? y`<div class="upgrade-hint">
            These settings need the <code>comfort_band</code> integration
            ${Yu[this.section]} or later, with their entities turned on.
          </div>` : r > 0 ? y`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>` : N}
    `;
  }
  _renderSetting(e) {
    const t = this._entity(e.field);
    switch (e.kind) {
      case "switch":
        return this._renderToggle({
          entityId: t,
          field: e.field,
          title: e.title,
          desc: y`${e.desc}`
        });
      case "number":
        return this._renderNumber(t, e);
      case "select":
        return this._renderSelect(t, e);
    }
  }
  _renderHumidity() {
    const e = this.entities.roomTemperature, t = e !== null ? this.hass.states[e] : void 0, i = t !== void 0 && t.state !== "unavailable", n = i ? vl(this.hass, e) : null, o = i ? n ? this._sensorText(n) : "Not configured" : "Can’t be read right now";
    return y`
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">
            ${i ? n ? "Change it" : "Set one up" : "Set"} under Settings → Devices &amp;
            Services → Comfort Band → Configure.
          </div>
        </div>
        <div class="info-value ${n ? "" : "unconfigured"}">${o}</div>
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
    const o = typeof t.attributes.unit_of_measurement == "string" ? t.attributes.unit_of_measurement : "";
    return `${i} · ${t.state}${o ? ` ${o}` : ""}`;
  }
  _renderNumber(e, t) {
    const i = this.hass.states[e], n = dn(i?.attributes.step) ?? 1, o = dn(i?.attributes.min), r = dn(i?.attributes.max), a = typeof i?.attributes.unit_of_measurement == "string" ? i.attributes.unit_of_measurement : "", u = this._pending[e], d = typeof u == "number" ? u : Number.parseFloat(i?.state ?? ""), f = Number.isFinite(d), g = f ? `${d.toFixed(ha(n))}${a ? ` ${a}` : ""}` : "—", m = `t-${t.field}`, _ = !f || o !== null && d <= o, k = !f || r !== null && d >= r;
    return y`
      <div class="row" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${m}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <div class="stepper" role="group" aria-labelledby=${m}>
          <button
            class="step"
            type="button"
            aria-label="Decrease"
            aria-disabled=${_ ? "true" : "false"}
            @click=${() => !_ && this._onStep(e, -1)}
          >
            −
          </button>
          <output class="value" aria-live="polite">${g}</output>
          <button
            class="step"
            type="button"
            aria-label="Increase"
            aria-disabled=${k ? "true" : "false"}
            @click=${() => !k && this._onStep(e, 1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
  _renderSelect(e, t) {
    const i = this.hass.states[e], n = Array.isArray(i?.attributes.options) ? i.attributes.options.filter((d) => typeof d == "string") : [], o = this._pending[e], r = typeof o == "string" ? o : i?.state ?? "", a = `t-${t.field}`, u = n.includes(r);
    return y`
      <div class="row" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${a}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <select
          class="choice"
          aria-labelledby=${a}
          ?disabled=${!u}
          @change=${(d) => this._onChoose(e, d.target.value)}
        >
          ${u ? N : y`<option value="" .selected=${!0}>—</option>`}
          ${n.map(
      (d) => y`<option value=${d} .selected=${d === r}>${Zu(d)}</option>`
    )}
        </select>
      </div>
    `;
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), i = this._pending[e.entityId] !== void 0;
    return y`
      <div class="row" data-setting=${e.field}>
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
pi.styles = [
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
      .stepper {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        gap: 2px;
      }
      /* WCAG 2.5.5: 44x44 targets on the steppers too. */
      .step {
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: var(--cb-radius-pill);
        background: transparent;
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }
      .step:focus-visible,
      .choice:focus-visible,
      summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .step[aria-disabled='true'] {
        opacity: 0.4;
        cursor: default;
      }
      .value {
        min-width: 4.5em;
        text-align: center;
        font-size: 14px;
        font-variant-numeric: tabular-nums;
        color: var(--cb-text-primary);
      }
      .choice {
        flex: 0 0 auto;
        max-width: 45%;
        min-height: 44px;
        padding: 0 8px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 8px;
        background: var(--card-background-color, #ffffff);
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 14px;
      }
      .note {
        margin-top: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      /* "Fine-tuning", folded inside Automation. */
      details.fine {
        margin-top: var(--cb-gap-sm);
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      details.fine > summary {
        display: flex;
        align-items: center;
        min-height: 44px;
        list-style: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      details.fine > summary::-webkit-details-marker {
        display: none;
      }
      details.fine > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 8px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.fine[open] > summary::before {
        transform: rotate(45deg);
      }
      details.fine .fine-summary {
        margin-left: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `
];
Sn([
  z({ attribute: !1 })
], pi.prototype, "hass", 2);
Sn([
  z({ attribute: !1 })
], pi.prototype, "entities", 2);
Sn([
  z({ type: String })
], pi.prototype, "section", 2);
Sn([
  te()
], pi.prototype, "_pending", 2);
Sn([
  te()
], pi.prototype, "_error", 2);
pi = Sn([
  Ve("comfort-band-settings-tab")
], pi);
var Ju = Object.defineProperty, Qu = Object.getOwnPropertyDescriptor, ti = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Qu(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Ju(t, i, o), o;
};
let Dt = class extends Ce {
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
Dt.styles = [
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
  z({ type: String })
], Dt.prototype, "mode", 2);
ti([
  z({ type: String })
], Dt.prototype, "existingName", 2);
ti([
  z({ type: Array })
], Dt.prototype, "existingNames", 2);
ti([
  z({ type: Boolean })
], Dt.prototype, "busy", 2);
ti([
  te()
], Dt.prototype, "_name", 2);
ti([
  te()
], Dt.prototype, "_description", 2);
ti([
  te()
], Dt.prototype, "_error", 2);
ti([
  kn('input[name="name"]')
], Dt.prototype, "_nameInput", 2);
Dt = ti([
  Ve("profile-edit-dialog")
], Dt);
var Xu = Object.defineProperty, eh = Object.getOwnPropertyDescriptor, Ii = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? eh(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Xu(t, i, o), o;
};
let Xt = class extends Ce {
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
          await ku(this.hass, { name: t, description: i });
        else if (n === "clone" && o)
          await Su(this.hass, { source: o, target: t, description: i });
        else if (n === "rename" && o)
          t !== o && await Au(this.hass, { old: o, new: t });
        else
          return;
        this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
      } catch (r) {
        this._error = r instanceof Error ? r.message : "Failed to save profile.";
      } finally {
        this._busy = !1;
      }
    }, this._onConfirmDelete = async () => {
      if (!this.hass || !this._target || this._busy) return;
      const e = this._target;
      this._busy = !0, this._error = null;
      try {
        await Cu(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = er(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!_l(t)) return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((g) => typeof g == "string") : [], o = typeof t.state == "string" ? t.state : "", r = t.attributes.default_profile, a = typeof r == "string" && !!r, u = a ? r : "home", d = t.attributes.descriptions, f = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [g, m] of Object.entries(d))
        typeof m == "string" && (f[g] = m);
    return { options: n, active: o, defaultProfile: u, descriptions: f, crudAvailable: a };
  }
  _onSelect(e) {
    this.hass && $u(this.hass, { profile: e });
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
        const a = this.shadowRoot?.querySelectorAll("li[data-profile]");
        (a ? Array.from(a).find((d) => d.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
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
    if (!this.hass) return N;
    const e = this._readState();
    if (e === null)
      return bl(this.hass) ? y`<div class="empty">
            Profiles aren't available right now. If the Comfort Band Profiles entry or its active
            profile entity is disabled, turn it back on under Settings → Devices &amp; Services.
          </div>` : y`<div class="empty">
            No profiles set up. Profiles are named sets of schedules, such as Home and Away, that
            every room switches between together. To use them, add Comfort Band again under Settings
            → Devices &amp; Services and choose “Set up profile manager”.
          </div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: o, crudAvailable: r } = e;
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
      const a = this._target === i;
      return y`
        <div
          class="confirm-delete"
          @keydown=${(u) => {
        u.key === "Escape" && !this._busy && (u.preventDefault(), this._onDialogCancel());
      }}
          tabindex="-1"
        >
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${" "}
            ${a ? y`This profile is active — deleting will switch to
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
      ${r ? y`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : N}
      <ul aria-label="Profiles">
        ${t.map(
      (a, u) => this._renderRow(a, u, i, n, o, r)
    )}
      </ul>
      ${r ? N : y`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, o, r) {
    const a = e === i, u = e === n, d = o[e] ?? "", f = `cb-profile-menu-${t}`;
    return y`
      <li
        data-profile=${e}
        tabindex="0"
        class=${a ? "active" : ""}
        aria-current=${a ? "true" : N}
        @click=${() => this._onSelect(e)}
        @keydown=${(g) => {
      g.target === g.currentTarget && (g.key === "Enter" || g.key === " ") && (g.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? y`<span class="description">${d}</span>` : N}
        </span>
        ${a ? y`<span class="badge">Active</span>` : N}
        ${r ? y`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? f : N}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(g) => this._toggleMenu(e, g)}
              @keydown=${(g) => {
      g.key === "Escape" && this._openMenu === e && (g.preventDefault(), g.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1);
    }}
            >
              ⋮
            </button>` : N}
        ${this._openMenu === e ? y`
              <div
                id=${f}
                class="menu"
                role="menu"
                @click=${(g) => g.stopPropagation()}
                @keydown=${(g) => this._onMenuKeydown(g, e)}
              >
                <button
                  role="menuitem"
                  @click=${(g) => {
      g.stopPropagation(), this._onClone(e);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(g) => {
      g.stopPropagation(), this._onRename(e);
    }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${u}
                  aria-disabled=${u}
                  @click=${(g) => {
      g.stopPropagation(), u || this._onDelete(e);
    }}
                  title=${u ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : N}
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
Ii([
  z({ attribute: !1 })
], Xt.prototype, "hass", 2);
Ii([
  te()
], Xt.prototype, "_mode", 2);
Ii([
  te()
], Xt.prototype, "_target", 2);
Ii([
  te()
], Xt.prototype, "_openMenu", 2);
Ii([
  te()
], Xt.prototype, "_error", 2);
Ii([
  te()
], Xt.prototype, "_busy", 2);
Xt = Ii([
  Ve("comfort-band-profiles-tab")
], Xt);
const th = !0, Oe = "u-", ih = "uplot", nh = Oe + "hz", oh = Oe + "vt", sh = Oe + "title", rh = Oe + "wrap", ah = Oe + "under", lh = Oe + "over", ch = Oe + "axis", Ni = Oe + "off", uh = Oe + "select", hh = Oe + "cursor-x", dh = Oe + "cursor-y", fh = Oe + "cursor-pt", ph = Oe + "legend", mh = Oe + "live", gh = Oe + "inline", bh = Oe + "series", _h = Oe + "marker", da = Oe + "label", vh = Oe + "value", Un = "width", Vn = "height", Bn = "top", fa = "bottom", fn = "left", ws = "right", tr = "#000", pa = tr + "0", xs = "mousemove", ma = "mousedown", $s = "mouseup", ga = "mouseenter", ba = "mouseleave", _a = "dblclick", yh = "resize", wh = "scroll", va = "change", To = "dppxchange", ir = "--", An = typeof window < "u", Ds = An ? document : null, gn = An ? window : null, xh = An ? navigator : null;
let ce, yo;
function Ms() {
  let e = devicePixelRatio;
  ce != e && (ce = e, yo && Ns(va, yo, Ms), yo = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Hi(va, yo, Ms), gn.dispatchEvent(new CustomEvent(To)));
}
function ct(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function zs(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function ye(e, t, i) {
  e.style[t] = i + "px";
}
function Et(e, t, i, n) {
  let o = Ds.createElement(e);
  return t != null && ct(o, t), i?.insertBefore(o, n), o;
}
function yt(e, t) {
  return Et("div", e, t);
}
const ya = /* @__PURE__ */ new WeakMap();
function It(e, t, i, n, o) {
  let r = "translate(" + t + "px," + i + "px)", a = ya.get(e);
  r != a && (e.style.transform = r, ya.set(e, r), t < 0 || i < 0 || t > n || i > o ? ct(e, Ni) : zs(e, Ni));
}
const wa = /* @__PURE__ */ new WeakMap();
function xa(e, t, i) {
  let n = t + i, o = wa.get(e);
  n != o && (wa.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const $a = /* @__PURE__ */ new WeakMap();
function ka(e, t, i, n) {
  let o = t + "" + i, r = $a.get(e);
  o != r && ($a.set(e, o), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const nr = { passive: !0 }, $h = { ...nr, capture: !0 };
function Hi(e, t, i, n) {
  t.addEventListener(e, i, n ? $h : nr);
}
function Ns(e, t, i, n) {
  t.removeEventListener(e, i, nr);
}
An && Ms();
function Tt(e, t, i, n) {
  let o;
  i = i || 0, n = n || t.length - 1;
  let r = n <= 2147483647;
  for (; n - i > 1; )
    o = r ? i + n >> 1 : ut((i + n) / 2), t[o] < e ? i = o : n = o;
  return e - t[i] <= t[n] - e ? i : n;
}
function wl(e) {
  return (i, n, o) => {
    let r = -1, a = -1;
    for (let u = n; u <= o; u++)
      if (e(i[u])) {
        r = u;
        break;
      }
    for (let u = o; u >= n; u--)
      if (e(i[u])) {
        a = u;
        break;
      }
    return [r, a];
  };
}
const xl = (e) => e != null, $l = (e) => e != null && e > 0, Oo = wl(xl), kh = wl($l);
function Sh(e, t, i, n = 0, o = !1) {
  let r = o ? kh : Oo, a = o ? $l : xl;
  [t, i] = r(e, t, i);
  let u = e[t], d = e[t];
  if (t > -1)
    if (n == 1)
      u = e[t], d = e[i];
    else if (n == -1)
      u = e[i], d = e[t];
    else
      for (let f = t; f <= i; f++) {
        let g = e[f];
        a(g) && (g < u ? u = g : g > d && (d = g));
      }
  return [u ?? pe, d ?? -pe];
}
function Lo(e, t, i, n) {
  let o = Ca(e), r = Ca(t);
  e == t && (o == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let a = i == 10 ? Zt : kl, u = o == 1 ? ut : wt, d = r == 1 ? wt : ut, f = u(a(ze(e))), g = d(a(ze(t))), m = vn(i, f), _ = vn(i, g);
  return i == 10 && (f < 0 && (m = me(m, -f)), g < 0 && (_ = me(_, -g))), n || i == 2 ? (e = m * o, t = _ * r) : (e = El(e, m), t = Ho(t, _)), [e, t];
}
function or(e, t, i, n) {
  let o = Lo(e, t, i, n);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const sr = 0.1, Sa = {
  mode: 3,
  pad: sr
}, Kn = {
  pad: 0,
  soft: null,
  mode: 0
}, Ah = {
  min: Kn,
  max: Kn
};
function Po(e, t, i, n) {
  return Fo(i) ? Aa(e, t, i) : (Kn.pad = i, Kn.soft = n ? 0 : null, Kn.mode = n ? 3 : 0, Aa(e, t, Ah));
}
function ae(e, t) {
  return e ?? t;
}
function Ch(e, t, i) {
  for (t = ae(t, 0), i = ae(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Aa(e, t, i) {
  let n = i.min, o = i.max, r = ae(n.pad, 0), a = ae(o.pad, 0), u = ae(n.hard, -pe), d = ae(o.hard, pe), f = ae(n.soft, pe), g = ae(o.soft, -pe), m = ae(n.mode, 0), _ = ae(o.mode, 0), k = t - e, C = Zt(k), O = Xe(ze(e), ze(t)), I = Zt(O), V = ze(I - C);
  (k < 1e-24 || V > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, m == 2 && f != pe && (r = 0), _ == 2 && g != -pe && (a = 0)));
  let $ = k || O || 1e3, j = Zt($), S = vn(10, ut(j)), J = $ * (k == 0 ? e == 0 ? 0.1 : 1 : r), M = me(El(e - J, S / 10), 24), Q = e >= f && (m == 1 || m == 3 && M <= f || m == 2 && M >= f) ? f : pe, q = Xe(u, M < Q && e >= Q ? Q : Pt(Q, M)), ie = $ * (k == 0 ? t == 0 ? 0.1 : 1 : a), K = me(Ho(t + ie, S / 10), 24), A = t <= g && (_ == 1 || _ == 3 && K >= g || _ == 2 && K <= g) ? g : -pe, Z = Pt(d, K > A && t <= A ? A : Xe(A, K));
  return q == Z && q == 0 && (Z = 100), [q, Z];
}
const Eh = new Intl.NumberFormat(An ? xh.language : "en-US"), rr = (e) => Eh.format(e), dt = Math, ko = dt.PI, ze = dt.abs, ut = dt.floor, Me = dt.round, wt = dt.ceil, Pt = dt.min, Xe = dt.max, vn = dt.pow, Ca = dt.sign, Zt = dt.log10, kl = dt.log2, Th = (e, t = 1) => dt.sinh(e) * t, ks = (e, t = 1) => dt.asinh(e / t), pe = 1 / 0;
function Ea(e) {
  return (Zt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function Os(e, t, i) {
  return Pt(Xe(e, t), i);
}
function Sl(e) {
  return typeof e == "function";
}
function ne(e) {
  return Sl(e) ? e : () => e;
}
const Ph = () => {
}, Al = (e) => e, Cl = (e, t) => t, Dh = (e) => null, Ta = (e) => !0, Pa = (e, t) => e == t, Mh = /\.\d*?(?=9{6,}|0{6,})/gm, Ri = (e) => {
  if (Pl(e) || mi.has(e))
    return e;
  const t = `${e}`, i = t.match(Mh);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, r] = t.split("e");
    return +`${Ri(o)}e${r}`;
  }
  return me(e, n);
};
function Mi(e, t) {
  return Ri(me(Ri(e / t)) * t);
}
function Ho(e, t) {
  return Ri(wt(Ri(e / t)) * t);
}
function El(e, t) {
  return Ri(ut(Ri(e / t)) * t);
}
function me(e, t = 0) {
  if (Pl(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return Me(n) / i;
}
const mi = /* @__PURE__ */ new Map();
function Tl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Xn(e, t, i, n) {
  let o = [], r = n.map(Tl);
  for (let a = t; a < i; a++) {
    let u = ze(a), d = me(vn(e, a), u);
    for (let f = 0; f < n.length; f++) {
      let g = e == 10 ? +`${n[f]}e${a}` : n[f] * d, m = (a >= 0 ? 0 : u) + (a >= r[f] ? 0 : r[f]), _ = e == 10 ? g : me(g, m);
      o.push(_), mi.set(_, m);
    }
  }
  return o;
}
const qn = {}, ar = [], yn = [null, null], hi = Array.isArray, Pl = Number.isInteger, zh = (e) => e === void 0;
function Da(e) {
  return typeof e == "string";
}
function Fo(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function Nh(e) {
  return e != null && typeof e == "object";
}
const Oh = Object.getPrototypeOf(Uint8Array), Dl = "__proto__";
function wn(e, t = Fo) {
  let i;
  if (hi(e)) {
    let n = e.find((o) => o != null);
    if (hi(n) || t(n)) {
      i = Array(e.length);
      for (let o = 0; o < e.length; o++)
        i[o] = wn(e[o], t);
    } else
      i = e.slice();
  } else if (e instanceof Oh)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != Dl && (i[n] = wn(e[n], t));
  } else
    i = e;
  return i;
}
function Te(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let o in n)
      o != Dl && (Fo(e[o]) ? Te(e[o], wn(n[o])) : e[o] = wn(n[o]));
  }
  return e;
}
const Lh = 0, Hh = 1, Fh = 2;
function Rh(e, t, i) {
  for (let n = 0, o, r = -1; n < t.length; n++) {
    let a = t[n];
    if (a > r) {
      for (o = a - 1; o >= 0 && e[o] == null; )
        e[o--] = null;
      for (o = a + 1; o < i && e[o] == null; )
        e[r = o++] = null;
    }
  }
}
function Bh(e, t) {
  if (Uh(e)) {
    let a = e[0].slice();
    for (let u = 1; u < e.length; u++)
      a.push(...e[u].slice(1));
    return Vh(a[0]) || (a = Ih(a)), a;
  }
  let i = /* @__PURE__ */ new Set();
  for (let a = 0; a < e.length; a++) {
    let d = e[a][0], f = d.length;
    for (let g = 0; g < f; g++)
      i.add(d[g]);
  }
  let n = [Array.from(i).sort((a, u) => a - u)], o = n[0].length, r = /* @__PURE__ */ new Map();
  for (let a = 0; a < o; a++)
    r.set(n[0][a], a);
  for (let a = 0; a < e.length; a++) {
    let u = e[a], d = u[0];
    for (let f = 1; f < u.length; f++) {
      let g = u[f], m = Array(o).fill(void 0), _ = t ? t[a][f] : Hh, k = [];
      for (let C = 0; C < g.length; C++) {
        let O = g[C], I = r.get(d[C]);
        O === null ? _ != Lh && (m[I] = O, _ == Fh && k.push(I)) : m[I] = O;
      }
      Rh(m, k, o), n.push(m);
    }
  }
  return n;
}
const jh = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Ih(e) {
  let t = e[0], i = t.length, n = Array(i);
  for (let r = 0; r < n.length; r++)
    n[r] = r;
  n.sort((r, a) => t[r] - t[a]);
  let o = [];
  for (let r = 0; r < e.length; r++) {
    let a = e[r], u = Array(i);
    for (let d = 0; d < i; d++)
      u[d] = a[n[d]];
    o.push(u);
  }
  return o;
}
function Uh(e) {
  let t = e[0][0], i = t.length;
  for (let n = 1; n < e.length; n++) {
    let o = e[n][0];
    if (o.length != i)
      return !1;
    if (o != t) {
      for (let r = 0; r < i; r++)
        if (o[r] != t[r])
          return !1;
    }
  }
  return !0;
}
function Vh(e, t = 100) {
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
  const r = Xe(1, ut((o - n + 1) / t));
  for (let a = e[n], u = n + r; u <= o; u += r) {
    const d = e[u];
    if (d != null) {
      if (d <= a)
        return !1;
      a = d;
    }
  }
  return !0;
}
const Ml = [
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
], zl = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Nl(e) {
  return e.slice(0, 3);
}
const Wh = zl.map(Nl), Gh = Ml.map(Nl), Kh = {
  MMMM: Ml,
  MMM: Gh,
  WWWW: zl,
  WWW: Wh
};
function jn(e) {
  return (e < 10 ? "0" : "") + e;
}
function qh(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Yh = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => jn(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => jn(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => jn(e.getHours()),
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
  mm: (e) => jn(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => jn(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => qh(e.getMilliseconds())
};
function lr(e, t) {
  t = t || Kh;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = n.exec(e); )
    i.push(o[0][0] == "{" ? Yh[o[1]] : o[0]);
  return (r) => {
    let a = "";
    for (let u = 0; u < i.length; u++)
      a += typeof i[u] == "string" ? i[u] : i[u](r, t);
    return a;
  };
}
const Zh = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Jh(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Zh ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const Ol = (e) => e % 1 == 0, Do = [1, 2, 2.5, 5], Qh = Xn(10, -32, 0, Do), Ll = Xn(10, 0, 32, Do), Xh = Ll.filter(Ol), zi = Qh.concat(Ll), cr = `
`, Hl = "{YYYY}", Ma = cr + Hl, Fl = "{M}/{D}", Wn = cr + Fl, wo = Wn + "/{YY}", Rl = "{aa}", ed = "{h}:{mm}", mn = ed + Rl, za = cr + mn, Na = ":{ss}", he = null;
function Bl(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, o = n * 24, r = o * 30, a = o * 365, d = (e == 1 ? Xn(10, 0, 3, Do).filter(Ol) : Xn(10, -3, 0, Do)).concat([
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
    r,
    r * 2,
    r * 3,
    r * 4,
    r * 6,
    // century divisors
    a,
    a * 2,
    a * 5,
    a * 10,
    a * 25,
    a * 50,
    a * 100
  ]);
  const f = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [a, Hl, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", Ma, he, he, he, he, he, 1],
    [o, Fl, Ma, he, he, he, he, he, 1],
    [n, "{h}" + Rl, wo, he, Wn, he, he, he, 1],
    [i, mn, wo, he, Wn, he, he, he, 1],
    [t, Na, wo + " " + mn, he, Wn + " " + mn, he, za, he, 1],
    [e, Na + ".{fff}", wo + " " + mn, he, Wn + " " + mn, he, za, he, 1]
  ];
  function g(m) {
    return (_, k, C, O, I, V) => {
      let $ = [], j = I >= a, S = I >= r && I < a, J = m(C), M = me(J * e, 3), Q = Ss(J.getFullYear(), j ? 0 : J.getMonth(), S || j ? 1 : J.getDate()), q = me(Q * e, 3);
      if (S || j) {
        let ie = S ? I / r : 0, K = j ? I / a : 0, A = M == q ? M : me(Ss(Q.getFullYear() + K, Q.getMonth() + ie, 1) * e, 3), Z = new Date(Me(A / e)), L = Z.getFullYear(), W = Z.getMonth();
        for (let B = 0; A <= O; B++) {
          let oe = Ss(L + K * B, W + ie * B, 1), R = oe - m(me(oe * e, 3));
          A = me((+oe + R) * e, 3), A <= O && $.push(A);
        }
      } else {
        let ie = I >= o ? o : I, K = ut(C) - ut(M), A = q + K + Ho(M - q, ie);
        $.push(A);
        let Z = m(A), L = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, W = I / n, B = _.axes[k]._space, oe = V / B;
        for (; A = me(A + I, e == 1 ? 0 : 3), !(A > O); )
          if (W > 1) {
            let R = ut(me(L + W, 6)) % 24, se = m(A).getHours() - R;
            se > 1 && (se = -1), A -= se * n, L = (L + W) % 24;
            let de = $[$.length - 1];
            me((A - de) / I, 3) * oe >= 0.7 && $.push(A);
          } else
            $.push(A);
      }
      return $;
    };
  }
  return [
    d,
    f,
    g
  ];
}
const [td, id, nd] = Bl(1), [od, sd, rd] = Bl(1e-3);
Xn(2, -53, 53, [1]);
function Oa(e, t) {
  return e.map((i) => i.map(
    (n, o) => o == 0 || o == 8 || n == null ? n : t(o == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function La(e, t) {
  return (i, n, o, r, a) => {
    let u = t.find((C) => a >= C[0]) || t[t.length - 1], d, f, g, m, _, k;
    return n.map((C) => {
      let O = e(C), I = O.getFullYear(), V = O.getMonth(), $ = O.getDate(), j = O.getHours(), S = O.getMinutes(), J = O.getSeconds(), M = I != d && u[2] || V != f && u[3] || $ != g && u[4] || j != m && u[5] || S != _ && u[6] || J != k && u[7] || u[1];
      return d = I, f = V, g = $, m = j, _ = S, k = J, M(O);
    });
  };
}
function ad(e, t) {
  let i = lr(t);
  return (n, o, r, a, u) => o.map((d) => i(e(d)));
}
function Ss(e, t, i) {
  return new Date(e, t, i);
}
function Ha(e, t) {
  return t(e);
}
const ld = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Fa(e, t) {
  return (i, n, o, r) => r == null ? ir : t(e(n));
}
function cd(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function ud(e, t) {
  return e.series[t].fill(e, t);
}
const hd = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Ph,
  markers: {
    show: !0,
    width: 2,
    stroke: cd,
    fill: ud,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function dd(e, t) {
  let i = e.cursor.points, n = yt(), o = i.size(e, t);
  ye(n, Un, o), ye(n, Vn, o);
  let r = o / -2;
  ye(n, "marginLeft", r), ye(n, "marginTop", r);
  let a = i.width(e, t, o);
  return a && ye(n, "borderWidth", a), n;
}
function fd(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function pd(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function md(e, t) {
  return e.series[t].points.size;
}
const As = [0, 0];
function gd(e, t, i) {
  return As[0] = t, As[1] = i, As;
}
function xo(e, t, i, n = !0) {
  return (o) => {
    o.button == 0 && (!n || o.target == t) && i(o);
  };
}
function Cs(e, t, i, n = !0) {
  return (o) => {
    (!n || o.target == t) && i(o);
  };
}
const bd = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: gd,
  points: {
    one: !1,
    show: dd,
    size: md,
    width: 0,
    stroke: pd,
    fill: fd
  },
  bind: {
    mousedown: xo,
    mouseup: xo,
    click: xo,
    // legend clicks, not .u-over clicks
    dblclick: xo,
    mousemove: Cs,
    mouseleave: Cs,
    mouseenter: Cs
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
}, jl = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, ur = Te({}, jl, {
  filter: Cl
}), Il = Te({}, ur, {
  size: 10
}), Ul = Te({}, jl, {
  show: !1
}), hr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Vl = "bold " + hr, Wl = 1.5, Ra = {
  show: !0,
  scale: "x",
  stroke: tr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Vl,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: ur,
  ticks: Il,
  border: Ul,
  font: hr,
  lineGap: Wl,
  rotate: 0
}, _d = "Value", vd = "Time", Ba = {
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
function yd(e, t, i, n, o) {
  return t.map((r) => r == null ? "" : rr(r));
}
function wd(e, t, i, n, o, r, a) {
  let u = [], d = mi.get(o) || 0;
  i = a ? i : me(Ho(i, o), d);
  for (let f = i; f <= n; f = me(f + o, d))
    u.push(Object.is(f, -0) ? 0 : f);
  return u;
}
function Ls(e, t, i, n, o, r, a) {
  const u = [], d = e.scales[e.axes[t].scale].log, f = d == 10 ? Zt : kl, g = ut(f(i));
  o = vn(d, g), d == 10 && (o = zi[Tt(o, zi)]);
  let m = i, _ = o * d;
  d == 10 && (_ = zi[Tt(_, zi)]);
  do
    u.push(m), m = m + o, d == 10 && !mi.has(m) && (m = me(m, mi.get(o))), m >= _ && (o = m, _ = o * d, d == 10 && (_ = zi[Tt(_, zi)]));
  while (m <= n);
  return u;
}
function xd(e, t, i, n, o, r, a) {
  let d = e.scales[e.axes[t].scale].asinh, f = n > d ? Ls(e, t, Xe(d, i), n, o) : [d], g = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? Ls(e, t, Xe(d, -n), -i, o) : [d]).reverse().map((_) => -_).concat(g, f);
}
const Gl = /./, $d = /[12357]/, kd = /[125]/, ja = /1/, Hs = (e, t, i, n) => e.map((o, r) => t == 4 && o == 0 || r % n == 0 && i.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function Sd(e, t, i, n, o) {
  let r = e.axes[i], a = r.scale, u = e.scales[a], d = e.valToPos, f = r._space, g = d(10, a), m = d(9, a) - g >= f ? Gl : d(7, a) - g >= f ? $d : d(5, a) - g >= f ? kd : ja;
  if (m == ja) {
    let _ = ze(d(1, a) - g);
    if (_ < f)
      return Hs(t.slice().reverse(), u.distr, m, wt(f / _)).reverse();
  }
  return Hs(t, u.distr, m, 1);
}
function Ad(e, t, i, n, o) {
  let r = e.axes[i], a = r.scale, u = r._space, d = e.valToPos, f = ze(d(1, a) - d(2, a));
  return f < u ? Hs(t.slice().reverse(), 3, Gl, wt(u / f)).reverse() : t;
}
function Cd(e, t, i, n) {
  return n == null ? ir : t == null ? "" : rr(t);
}
const Ia = {
  show: !0,
  scale: "y",
  stroke: tr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Vl,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: ur,
  ticks: Il,
  border: Ul,
  font: hr,
  lineGap: Wl,
  rotate: 0
};
function Ed(e, t) {
  let i = 3 + (e || 1) * 2;
  return me(i * t, 3);
}
function Td(e, t) {
  let { scale: i, idxs: n } = e.series[0], o = e._data[0], r = e.valToPos(o[n[0]], i, !0), a = e.valToPos(o[n[1]], i, !0), u = ze(a - r), d = e.series[t], f = u / (d.points.space * ce);
  return n[1] - n[0] <= f;
}
const Ua = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, Kl = (e, t, i, n, o) => o, Va = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Kl,
  alpha: 1,
  facets: [
    Te({}, Ua, { scale: "x" }),
    Te({}, Ua, { scale: "y" })
  ]
}, Wa = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Kl,
  alpha: 1,
  points: {
    show: Td,
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
function Pd(e, t, i, n, o) {
  return i / 10;
}
const ql = {
  time: th,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Dd = Te({}, ql, {
  time: !1,
  ori: 1
}), Ga = {};
function Yl(e, t) {
  let i = Ga[e];
  return i || (i = {
    key: e,
    plots: [],
    sub(n) {
      i.plots.push(n);
    },
    unsub(n) {
      i.plots = i.plots.filter((o) => o != n);
    },
    pub(n, o, r, a, u, d, f) {
      for (let g = 0; g < i.plots.length; g++)
        i.plots[g] != o && i.plots[g].pub(n, o, r, a, u, d, f);
    }
  }, e != null && (Ga[e] = i)), i;
}
const xn = 1, Fs = 2;
function Ui(e, t, i) {
  const n = e.mode, o = e.series[t], r = n == 2 ? e._data[t] : e._data, a = e.scales, u = e.bbox;
  let d = r[0], f = n == 2 ? r[1] : r[t], g = n == 2 ? a[o.facets[0].scale] : a[e.series[0].scale], m = n == 2 ? a[o.facets[1].scale] : a[o.scale], _ = u.left, k = u.top, C = u.width, O = u.height, I = e.valToPosH, V = e.valToPosV;
  return g.ori == 0 ? i(
    o,
    d,
    f,
    g,
    m,
    I,
    V,
    _,
    k,
    C,
    O,
    Bo,
    Cn,
    Io,
    Jl,
    Xl
  ) : i(
    o,
    d,
    f,
    g,
    m,
    V,
    I,
    k,
    _,
    O,
    C,
    jo,
    En,
    pr,
    Ql,
    ec
  );
}
function dr(e, t) {
  let i = 0, n = 0, o = ae(e.bands, ar);
  for (let r = 0; r < o.length; r++) {
    let a = o[r];
    a.series[0] == t ? i = a.dir : a.series[1] == t && (a.dir == 1 ? n |= 1 : n |= 2);
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
function Md(e, t, i, n, o) {
  let r = e.mode, a = e.series[t], u = r == 2 ? a.facets[1].scale : a.scale, d = e.scales[u];
  return o == -1 ? d.min : o == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function Jt(e, t, i, n, o, r) {
  return Ui(e, t, (a, u, d, f, g, m, _, k, C, O, I) => {
    let V = a.pxRound;
    const $ = f.dir * (f.ori == 0 ? 1 : -1), j = f.ori == 0 ? Cn : En;
    let S, J;
    $ == 1 ? (S = i, J = n) : (S = n, J = i);
    let M = V(m(u[S], f, O, k)), Q = V(_(d[S], g, I, C)), q = V(m(u[J], f, O, k)), ie = V(_(r == 1 ? g.max : g.min, g, I, C)), K = new Path2D(o);
    return j(K, q, ie), j(K, M, ie), j(K, M, Q), K;
  });
}
function Ro(e, t, i, n, o, r) {
  let a = null;
  if (e.length > 0) {
    a = new Path2D();
    const u = t == 0 ? Io : pr;
    let d = i;
    for (let m = 0; m < e.length; m++) {
      let _ = e[m];
      if (_[1] > _[0]) {
        let k = _[0] - d;
        k > 0 && u(a, d, n, k, n + r), d = _[1];
      }
    }
    let f = i + o - d, g = 10;
    f > 0 && u(a, d, n - g / 2, f, n + r + g);
  }
  return a;
}
function zd(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function fr(e, t, i, n, o, r, a) {
  let u = [], d = e.length;
  for (let f = o == 1 ? i : n; f >= i && f <= n; f += o)
    if (t[f] === null) {
      let m = f, _ = f;
      if (o == 1)
        for (; ++f <= n && t[f] === null; )
          _ = f;
      else
        for (; --f >= i && t[f] === null; )
          _ = f;
      let k = r(e[m]), C = _ == m ? k : r(e[_]), O = m - o;
      k = a <= 0 && O >= 0 && O < d ? r(e[O]) : k;
      let V = _ + o;
      C = a >= 0 && V >= 0 && V < d ? r(e[V]) : C, C >= k && u.push([k, C]);
    }
  return u;
}
function Ka(e) {
  return e == 0 ? Al : e == 1 ? Me : (t) => Mi(t, e);
}
function Zl(e) {
  let t = e == 0 ? Bo : jo, i = e == 0 ? (o, r, a, u, d, f) => {
    o.arcTo(r, a, u, d, f);
  } : (o, r, a, u, d, f) => {
    o.arcTo(a, r, d, u, f);
  }, n = e == 0 ? (o, r, a, u, d) => {
    o.rect(r, a, u, d);
  } : (o, r, a, u, d) => {
    o.rect(a, r, d, u);
  };
  return (o, r, a, u, d, f = 0, g = 0) => {
    f == 0 && g == 0 ? n(o, r, a, u, d) : (f = Pt(f, u / 2, d / 2), g = Pt(g, u / 2, d / 2), t(o, r + f, a), i(o, r + u, a, r + u, a + d, f), i(o, r + u, a + d, r, a + d, g), i(o, r, a + d, r, a, g), i(o, r, a, r + u, a, f), o.closePath());
  };
}
const Bo = (e, t, i) => {
  e.moveTo(t, i);
}, jo = (e, t, i) => {
  e.moveTo(i, t);
}, Cn = (e, t, i) => {
  e.lineTo(t, i);
}, En = (e, t, i) => {
  e.lineTo(i, t);
}, Io = Zl(0), pr = Zl(1), Jl = (e, t, i, n, o, r) => {
  e.arc(t, i, n, o, r);
}, Ql = (e, t, i, n, o, r) => {
  e.arc(i, t, n, o, r);
}, Xl = (e, t, i, n, o, r, a) => {
  e.bezierCurveTo(t, i, n, o, r, a);
}, ec = (e, t, i, n, o, r, a) => {
  e.bezierCurveTo(i, t, o, n, a, r);
};
function tc(e) {
  return (t, i, n, o, r) => Ui(t, i, (a, u, d, f, g, m, _, k, C, O, I) => {
    let { pxRound: V, points: $ } = a, j, S;
    f.ori == 0 ? (j = Bo, S = Jl) : (j = jo, S = Ql);
    const J = me($.width * ce, 3);
    let M = ($.size - $.width) / 2 * ce, Q = me(M * 2, 3), q = new Path2D(), ie = new Path2D(), { left: K, top: A, width: Z, height: L } = t.bbox;
    Io(
      ie,
      K - Q,
      A - Q,
      Z + Q * 2,
      L + Q * 2
    );
    const W = (B) => {
      if (d[B] != null) {
        let oe = V(m(u[B], f, O, k)), R = V(_(d[B], g, I, C));
        j(q, oe + M, R), S(q, oe, R, M, 0, ko * 2);
      }
    };
    if (r)
      r.forEach(W);
    else
      for (let B = n; B <= o; B++)
        W(B);
    return {
      stroke: J > 0 ? q : null,
      fill: q,
      clip: ie,
      flags: xn | Fs
    };
  });
}
function ic(e) {
  return (t, i, n, o, r, a) => {
    n != o && (r != n && a != n && e(t, i, n), r != o && a != o && e(t, i, o), e(t, i, a));
  };
}
const Nd = ic(Cn), Od = ic(En);
function nc(e) {
  const t = ae(e?.alignGaps, 0);
  return (i, n, o, r) => Ui(i, n, (a, u, d, f, g, m, _, k, C, O, I) => {
    [o, r] = Oo(d, o, r);
    let V = a.pxRound, $ = (L) => V(m(L, f, O, k)), j = (L) => V(_(L, g, I, C)), S, J;
    f.ori == 0 ? (S = Cn, J = Nd) : (S = En, J = Od);
    const M = f.dir * (f.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: xn }, q = Q.stroke;
    let ie = !1;
    if (r - o >= O * 4) {
      let L = (H) => i.posToVal(H, f.key, !0), W = null, B = null, oe, R, et, we = $(u[M == 1 ? o : r]), se = $(u[o]), de = $(u[r]), X = L(M == 1 ? se + 1 : de - 1);
      for (let H = M == 1 ? o : r; H >= o && H <= r; H += M) {
        let Pe = u[H], xe = (M == 1 ? Pe < X : Pe > X) ? we : $(Pe), ue = d[H];
        xe == we ? ue != null ? (R = ue, W == null ? (S(q, xe, j(R)), oe = W = B = R) : R < W ? W = R : R > B && (B = R)) : ue === null && (ie = !0) : (W != null && J(q, we, j(W), j(B), j(oe), j(R)), ue != null ? (R = ue, S(q, xe, j(R)), W = B = oe = R) : (W = B = null, ue === null && (ie = !0)), we = xe, X = L(we + M));
      }
      W != null && W != B && et != we && J(q, we, j(W), j(B), j(oe), j(R));
    } else
      for (let L = M == 1 ? o : r; L >= o && L <= r; L += M) {
        let W = d[L];
        W === null ? ie = !0 : W != null && S(q, $(u[L]), j(W));
      }
    let [A, Z] = dr(i, n);
    if (a.fill != null || A != 0) {
      let L = Q.fill = new Path2D(q), W = a.fillTo(i, n, a.min, a.max, A), B = j(W), oe = $(u[o]), R = $(u[r]);
      M == -1 && ([R, oe] = [oe, R]), S(L, R, B), S(L, oe, B);
    }
    if (!a.spanGaps) {
      let L = [];
      ie && L.push(...fr(u, d, o, r, M, $, t)), Q.gaps = L = a.gaps(i, n, o, r, L), Q.clip = Ro(L, f.ori, k, C, O, I);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      Jt(i, n, o, r, q, -1),
      Jt(i, n, o, r, q, 1)
    ] : Jt(i, n, o, r, q, Z)), Q;
  });
}
function Ld(e) {
  const t = ae(e.align, 1), i = ae(e.ascDesc, !1), n = ae(e.alignGaps, 0), o = ae(e.extend, !1);
  return (r, a, u, d) => Ui(r, a, (f, g, m, _, k, C, O, I, V, $, j) => {
    [u, d] = Oo(m, u, d);
    let S = f.pxRound, { left: J, width: M } = r.bbox, Q = (se) => S(C(se, _, $, I)), q = (se) => S(O(se, k, j, V)), ie = _.ori == 0 ? Cn : En;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: xn }, A = K.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let L = q(m[Z == 1 ? u : d]), W = Q(g[Z == 1 ? u : d]), B = W, oe = W;
    o && t == -1 && (oe = J, ie(A, oe, L)), ie(A, W, L);
    for (let se = Z == 1 ? u : d; se >= u && se <= d; se += Z) {
      let de = m[se];
      if (de == null)
        continue;
      let X = Q(g[se]), H = q(de);
      t == 1 ? ie(A, X, L) : ie(A, B, H), ie(A, X, H), L = H, B = X;
    }
    let R = B;
    o && t == 1 && (R = J + M, ie(A, R, L));
    let [et, we] = dr(r, a);
    if (f.fill != null || et != 0) {
      let se = K.fill = new Path2D(A), de = f.fillTo(r, a, f.min, f.max, et), X = q(de);
      ie(se, R, X), ie(se, oe, X);
    }
    if (!f.spanGaps) {
      let se = [];
      se.push(...fr(g, m, u, d, Z, Q, n));
      let de = f.width * ce / 2, X = i || t == 1 ? de : -de, H = i || t == -1 ? -de : de;
      se.forEach((Pe) => {
        Pe[0] += X, Pe[1] += H;
      }), K.gaps = se = f.gaps(r, a, u, d, se), K.clip = Ro(se, _.ori, I, V, $, j);
    }
    return we != 0 && (K.band = we == 2 ? [
      Jt(r, a, u, d, A, -1),
      Jt(r, a, u, d, A, 1)
    ] : Jt(r, a, u, d, A, we)), K;
  });
}
function qa(e, t, i, n, o, r, a = pe) {
  if (e.length > 1) {
    let u = null;
    for (let d = 0, f = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (u != null) {
          let g = ze(e[d] - e[u]);
          g < f && (f = g, a = ze(i(e[d], n, o, r) - i(e[u], n, o, r)));
        }
        u = d;
      }
  }
  return a;
}
function Hd(e) {
  e = e || qn;
  const t = ae(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const r = ne(o), a = 1 - t[0], u = ae(t[1], pe), d = ae(t[2], 1), f = ae(e.disp, qn), g = ae(e.each, (k) => {
  }), { fill: m, stroke: _ } = f;
  return (k, C, O, I) => Ui(k, C, (V, $, j, S, J, M, Q, q, ie, K, A) => {
    let Z = V.pxRound, L = i, W = n * ce, B = u * ce, oe = d * ce, R, et;
    S.ori == 0 ? [R, et] = r(k, C) : [et, R] = r(k, C);
    const we = S.dir * (S.ori == 0 ? 1 : -1);
    let se = S.ori == 0 ? Io : pr, de = S.ori == 0 ? g : (P, ge, De, Ki, xi, Lt, $i) => {
      g(P, ge, De, xi, Ki, $i, Lt);
    }, X = ae(k.bands, ar).find((P) => P.series[0] == C), H = X != null ? X.dir : 0, Pe = V.fillTo(k, C, V.min, V.max, H), qe = Z(Q(Pe, J, A, ie)), xe, ue, $t, ot = K, ke = Z(V.width * ce), Ot = !1, Gt = null, ft = null, oi = null, Vi = null;
    m != null && (ke == 0 || _ != null) && (Ot = !0, Gt = m.values(k, C, O, I), ft = /* @__PURE__ */ new Map(), new Set(Gt).forEach((P) => {
      P != null && ft.set(P, new Path2D());
    }), ke > 0 && (oi = _.values(k, C, O, I), Vi = /* @__PURE__ */ new Map(), new Set(oi).forEach((P) => {
      P != null && Vi.set(P, new Path2D());
    })));
    let { x0: Wi, size: Dn } = f;
    if (Wi != null && Dn != null) {
      L = 1, $ = Wi.values(k, C, O, I), Wi.unit == 2 && ($ = $.map((De) => k.posToVal(q + De * K, S.key, !0)));
      let P = Dn.values(k, C, O, I);
      Dn.unit == 2 ? ue = P[0] * K : ue = M(P[0], S, K, q) - M(0, S, K, q), ot = qa($, j, M, S, K, q, ot), $t = ot - ue + W;
    } else
      ot = qa($, j, M, S, K, q, ot), $t = ot * a + W, ue = ot - $t;
    $t < 1 && ($t = 0), ke >= ue / 2 && (ke = 0), $t < 5 && (Z = Al);
    let oo = $t > 0, yi = ot - $t - (oo ? ke : 0);
    ue = Z(Os(yi, oe, B)), xe = (L == 0 ? ue / 2 : L == we ? 0 : ue) - L * we * ((L == 0 ? W / 2 : 0) + (oo ? ke / 2 : 0));
    const Ye = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Gi = Ot ? null : new Path2D();
    let Kt = null;
    if (X != null)
      Kt = k.data[X.series[1]];
    else {
      let { y0: P, y1: ge } = f;
      P != null && ge != null && (j = ge.values(k, C, O, I), Kt = P.values(k, C, O, I));
    }
    let wi = R * ue, Y = et * ue;
    for (let P = we == 1 ? O : I; P >= O && P <= I; P += we) {
      let ge = j[P];
      if (ge == null)
        continue;
      if (Kt != null) {
        let tt = Kt[P] ?? 0;
        if (ge - tt == 0)
          continue;
        qe = Q(tt, J, A, ie);
      }
      let De = S.distr != 2 || f != null ? $[P] : P, Ki = M(De, S, K, q), xi = Q(ae(ge, Pe), J, A, ie), Lt = Z(Ki - xe), $i = Z(Xe(xi, qe)), st = Z(Pt(xi, qe)), pt = $i - st;
      if (ge != null) {
        let tt = ge < 0 ? Y : wi, kt = ge < 0 ? wi : Y;
        Ot ? (ke > 0 && oi[P] != null && se(Vi.get(oi[P]), Lt, st + ut(ke / 2), ue, Xe(0, pt - ke), tt, kt), Gt[P] != null && se(ft.get(Gt[P]), Lt, st + ut(ke / 2), ue, Xe(0, pt - ke), tt, kt)) : se(Gi, Lt, st + ut(ke / 2), ue, Xe(0, pt - ke), tt, kt), de(
          k,
          C,
          P,
          Lt - ke / 2,
          st,
          ue + ke,
          pt
        );
      }
    }
    return ke > 0 ? Ye.stroke = Ot ? Vi : Gi : Ot || (Ye._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Ye.width = 0), Ye.fill = Ot ? ft : Gi, Ye;
  });
}
function Fd(e, t) {
  const i = ae(t?.alignGaps, 0);
  return (n, o, r, a) => Ui(n, o, (u, d, f, g, m, _, k, C, O, I, V) => {
    [r, a] = Oo(f, r, a);
    let $ = u.pxRound, j = (R) => $(_(R, g, I, C)), S = (R) => $(k(R, m, V, O)), J, M, Q;
    g.ori == 0 ? (J = Bo, Q = Cn, M = Xl) : (J = jo, Q = En, M = ec);
    const q = g.dir * (g.ori == 0 ? 1 : -1);
    let ie = j(d[q == 1 ? r : a]), K = ie, A = [], Z = [];
    for (let R = q == 1 ? r : a; R >= r && R <= a; R += q)
      if (f[R] != null) {
        let we = d[R], se = j(we);
        A.push(K = se), Z.push(S(f[R]));
      }
    const L = { stroke: e(A, Z, J, Q, M, $), fill: null, clip: null, band: null, gaps: null, flags: xn }, W = L.stroke;
    let [B, oe] = dr(n, o);
    if (u.fill != null || B != 0) {
      let R = L.fill = new Path2D(W), et = u.fillTo(n, o, u.min, u.max, B), we = S(et);
      Q(R, K, we), Q(R, ie, we);
    }
    if (!u.spanGaps) {
      let R = [];
      R.push(...fr(d, f, r, a, q, j, i)), L.gaps = R = u.gaps(n, o, r, a, R), L.clip = Ro(R, g.ori, C, O, I, V);
    }
    return oe != 0 && (L.band = oe == 2 ? [
      Jt(n, o, r, a, W, -1),
      Jt(n, o, r, a, W, 1)
    ] : Jt(n, o, r, a, W, oe)), L;
  });
}
function Rd(e) {
  return Fd(Bd, e);
}
function Bd(e, t, i, n, o, r) {
  const a = e.length;
  if (a < 2)
    return null;
  const u = new Path2D();
  if (i(u, e[0], t[0]), a == 2)
    n(u, e[1], t[1]);
  else {
    let d = Array(a), f = Array(a - 1), g = Array(a - 1), m = Array(a - 1);
    for (let _ = 0; _ < a - 1; _++)
      g[_] = t[_ + 1] - t[_], m[_] = e[_ + 1] - e[_], f[_] = g[_] / m[_];
    d[0] = f[0];
    for (let _ = 1; _ < a - 1; _++)
      f[_] === 0 || f[_ - 1] === 0 || f[_ - 1] > 0 != f[_] > 0 ? d[_] = 0 : (d[_] = 3 * (m[_ - 1] + m[_]) / ((2 * m[_] + m[_ - 1]) / f[_ - 1] + (m[_] + 2 * m[_ - 1]) / f[_]), isFinite(d[_]) || (d[_] = 0));
    d[a - 1] = f[a - 2];
    for (let _ = 0; _ < a - 1; _++)
      o(
        u,
        e[_] + m[_] / 3,
        t[_] + d[_] * m[_] / 3,
        e[_ + 1] - m[_] / 3,
        t[_ + 1] - d[_ + 1] * m[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return u;
}
const Rs = /* @__PURE__ */ new Set();
function Ya() {
  for (let e of Rs)
    e.syncRect(!0);
}
An && (Hi(yh, gn, Ya), Hi(wh, gn, Ya, !0), Hi(To, gn, () => {
  Ke.pxRatio = ce;
}));
const jd = nc(), Id = tc();
function Za(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((r, a) => Bs(r, a, t, i));
}
function Ud(e, t) {
  return e.map((i, n) => n == 0 ? {} : Te({}, t, i));
}
function Bs(e, t, i, n) {
  return Te({}, t == 0 ? i : n, e);
}
function oc(e, t, i) {
  return t == null ? yn : [t, i];
}
const Vd = oc;
function Wd(e, t, i) {
  return t == null ? yn : Po(t, i, sr, !0);
}
function sc(e, t, i, n) {
  return t == null ? yn : Lo(t, i, e.scales[n].log, !1);
}
const Gd = sc;
function rc(e, t, i, n) {
  return t == null ? yn : or(t, i, e.scales[n].log, !1);
}
const Kd = rc;
function qd(e, t, i, n, o) {
  let r = Xe(Ea(e), Ea(t)), a = t - e, u = Tt(o / n * a, i);
  do {
    let d = i[u], f = n * d / a;
    if (f >= o && r + (d < 5 ? mi.get(d) : 0) <= 17)
      return [d, f];
  } while (++u < i.length);
  return [0, 0];
}
function Ja(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, o) => (t = Me((i = +o) * ce)) + "px"), [e, t, i];
}
function Yd(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function Ke(e, t, i) {
  const n = {
    mode: ae(e.mode, 1)
  }, o = n.mode;
  function r(s, l, c, h) {
    let p = l.valToPct(s);
    return h + c * (l.dir == -1 ? 1 - p : p);
  }
  function a(s, l, c, h) {
    let p = l.valToPct(s);
    return h + c * (l.dir == -1 ? p : 1 - p);
  }
  function u(s, l, c, h) {
    return l.ori == 0 ? r(s, l, c, h) : a(s, l, c, h);
  }
  n.valToPosH = r, n.valToPosV = a;
  let d = !1;
  n.status = 0;
  const f = n.root = yt(ih);
  if (e.id != null && (f.id = e.id), ct(f, e.class), e.title) {
    let s = yt(sh, f);
    s.textContent = e.title;
  }
  const g = Et("canvas"), m = n.ctx = g.getContext("2d"), _ = yt(rh, f);
  Hi("click", _, (s) => {
    s.target === C && (be != sn || $e != rn) && Ue.click(n, s);
  }, !0);
  const k = n.under = yt(ah, _);
  _.appendChild(g);
  const C = n.over = yt(lh, _);
  e = wn(e);
  const O = +ae(e.pxAlign, 1), I = Ka(O);
  (e.plugins || []).forEach((s) => {
    s.opts && (e = s.opts(n, e) || e);
  });
  const V = e.ms || 1e-3, $ = n.series = o == 1 ? Za(e.series || [], Ba, Wa, !1) : Ud(e.series || [null], Va), j = n.axes = Za(e.axes || [], Ra, Ia, !0), S = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((s) => {
    s.fill = ne(s.fill || null), s.dir = ae(s.dir, -1);
  });
  const M = o == 2 ? $[1].facets[0].scale : $[0].scale, Q = {
    axes: xc,
    series: bc
  }, q = (e.drawOrder || ["axes", "series"]).map((s) => Q[s]);
  function ie(s) {
    const l = s.distr == 3 ? (c) => Zt(c > 0 ? c : s.clamp(n, c, s.min, s.max, s.key)) : s.distr == 4 ? (c) => ks(c, s.asinh) : s.distr == 100 ? (c) => s.fwd(c) : (c) => c;
    return (c) => {
      let h = l(c), { _min: p, _max: b } = s, v = b - p;
      return (h - p) / v;
    };
  }
  function K(s) {
    let l = S[s];
    if (l == null) {
      let c = (e.scales || qn)[s] || qn;
      if (c.from != null) {
        K(c.from);
        let h = Te({}, S[c.from], c, { key: s });
        h.valToPct = ie(h), S[s] = h;
      } else {
        l = S[s] = Te({}, s == M ? ql : Dd, c), l.key = s;
        let h = l.time, p = l.range, b = hi(p);
        if ((s != M || o == 2 && !h) && (b && (p[0] == null || p[1] == null) && (p = {
          min: p[0] == null ? Sa : {
            mode: 1,
            hard: p[0],
            soft: p[0]
          },
          max: p[1] == null ? Sa : {
            mode: 1,
            hard: p[1],
            soft: p[1]
          }
        }, b = !1), !b && Fo(p))) {
          let v = p;
          p = (w, x, E) => x == null ? yn : Po(x, E, v);
        }
        l.range = ne(p || (h ? Vd : s == M ? l.distr == 3 ? Gd : l.distr == 4 ? Kd : oc : l.distr == 3 ? sc : l.distr == 4 ? rc : Wd)), l.auto = ne(b ? !1 : l.auto), l.clamp = ne(l.clamp || Pd), l._min = l._max = null, l.valToPct = ie(l);
      }
    }
  }
  K("x"), K("y"), o == 1 && $.forEach((s) => {
    K(s.scale);
  }), j.forEach((s) => {
    K(s.scale);
  });
  for (let s in e.scales)
    K(s);
  const A = S[M], Z = A.distr;
  let L, W;
  A.ori == 0 ? (ct(f, nh), L = r, W = a) : (ct(f, oh), L = a, W = r);
  const B = {};
  for (let s in S) {
    let l = S[s];
    (l.min != null || l.max != null) && (B[s] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const oe = e.tzDate || ((s) => new Date(Me(s / V))), R = e.fmtDate || lr, et = V == 1 ? nd(oe) : rd(oe), we = La(oe, Oa(V == 1 ? id : sd, R)), se = Fa(oe, Ha(ld, R)), de = [], X = n.legend = Te({}, hd, e.legend), H = n.cursor = Te({}, bd, { drag: { y: o == 2 } }, e.cursor), Pe = X.show, qe = H.show, xe = X.markers;
  X.idxs = de, xe.width = ne(xe.width), xe.dash = ne(xe.dash), xe.stroke = ne(xe.stroke), xe.fill = ne(xe.fill);
  let ue, $t, ot, ke = [], Ot = [], Gt, ft = !1, oi = {};
  if (X.live) {
    const s = $[1] ? $[1].values : null;
    ft = s != null, Gt = ft ? s(n, 1, 0) : { _: 0 };
    for (let l in Gt)
      oi[l] = ir;
  }
  if (Pe)
    if (ue = Et("table", ph, f), ot = Et("tbody", null, ue), X.mount(n, ue), ft) {
      $t = Et("thead", null, ue, ot);
      let s = Et("tr", null, $t);
      Et("th", null, s);
      for (var Vi in Gt)
        Et("th", da, s).textContent = Vi;
    } else
      ct(ue, gh), X.live && ct(ue, mh);
  const Wi = { show: !0 }, Dn = { show: !1 };
  function oo(s, l) {
    if (l == 0 && (ft || !X.live || o == 2))
      return yn;
    let c = [], h = Et("tr", bh, ot, ot.childNodes[l]);
    ct(h, s.class), s.show || ct(h, Ni);
    let p = Et("th", null, h);
    if (xe.show) {
      let w = yt(_h, p);
      if (l > 0) {
        let x = xe.width(n, l);
        x && (w.style.border = x + "px " + xe.dash(n, l) + " " + xe.stroke(n, l)), w.style.background = xe.fill(n, l);
      }
    }
    let b = yt(da, p);
    s.label instanceof HTMLElement ? b.appendChild(s.label) : b.textContent = s.label, l > 0 && (xe.show || (b.style.color = s.width > 0 ? xe.stroke(n, l) : xe.fill(n, l)), Ye("click", p, (w) => {
      if (H._lock)
        return;
      Si(w);
      let x = $.indexOf(s);
      if ((w.ctrlKey || w.metaKey) != X.isolate) {
        let E = $.some((T, D) => D > 0 && D != x && T.show);
        $.forEach((T, D) => {
          D > 0 && Ft(D, E ? D == x ? Wi : Dn : Wi, !0, Ee.setSeries);
        });
      } else
        Ft(x, { show: !s.show }, !0, Ee.setSeries);
    }, !1), Yi && Ye(ga, p, (w) => {
      H._lock || (Si(w), Ft($.indexOf(s), ln, !0, Ee.setSeries));
    }, !1));
    for (var v in Gt) {
      let w = Et("td", vh, h);
      w.textContent = "--", c.push(w);
    }
    return [h, c];
  }
  const yi = /* @__PURE__ */ new Map();
  function Ye(s, l, c, h = !0) {
    const p = yi.get(l) || {}, b = H.bind[s](n, l, c, h);
    b && (Hi(s, l, p[s] = b), yi.set(l, p));
  }
  function Gi(s, l, c) {
    const h = yi.get(l) || {};
    for (let p in h)
      (s == null || p == s) && (Ns(p, l, h[p]), delete h[p]);
    s == null && yi.delete(l);
  }
  let Kt = 0, wi = 0, Y = 0, P = 0, ge = 0, De = 0, Ki = ge, xi = De, Lt = Y, $i = P, st = 0, pt = 0, tt = 0, kt = 0;
  n.bbox = {};
  let Wo = !1, so = !1, qi = !1, ki = !1, ro = !1, mt = !1;
  function Go(s, l, c) {
    (c || s != n.width || l != n.height) && br(s, l), en(!1), qi = !0, so = !0, tn();
  }
  function br(s, l) {
    n.width = Kt = Y = s, n.height = wi = P = l, ge = De = 0, uc(), hc();
    let c = n.bbox;
    st = c.left = Mi(ge * ce, 0.5), pt = c.top = Mi(De * ce, 0.5), tt = c.width = Mi(Y * ce, 0.5), kt = c.height = Mi(P * ce, 0.5);
  }
  const ac = 3;
  function lc() {
    let s = !1, l = 0;
    for (; !s; ) {
      l++;
      let c = yc(l), h = wc(l);
      s = l == ac || c && h, s || (br(n.width, n.height), so = !0);
    }
  }
  function cc({ width: s, height: l }) {
    Go(s, l);
  }
  n.setSize = cc;
  function uc() {
    let s = !1, l = !1, c = !1, h = !1;
    j.forEach((p, b) => {
      if (p.show && p._show) {
        let { side: v, _size: w } = p, x = v % 2, E = p.label != null ? p.labelSize : 0, T = w + E;
        T > 0 && (x ? (Y -= T, v == 3 ? (ge += T, h = !0) : c = !0) : (P -= T, v == 0 ? (De += T, s = !0) : l = !0));
      }
    }), Ai[0] = s, Ai[1] = c, Ai[2] = l, Ai[3] = h, Y -= si[1] + si[3], ge += si[3], P -= si[2] + si[0], De += si[0];
  }
  function hc() {
    let s = ge + Y, l = De + P, c = ge, h = De;
    function p(b, v) {
      switch (b) {
        case 1:
          return s += v, s - v;
        case 2:
          return l += v, l - v;
        case 3:
          return c -= v, c + v;
        case 0:
          return h -= v, h + v;
      }
    }
    j.forEach((b, v) => {
      if (b.show && b._show) {
        let w = b.side;
        b._pos = p(w, b._size), b.label != null && (b._lpos = p(w, b.labelSize));
      }
    });
  }
  if (H.dataIdx == null) {
    let s = H.hover, l = s.skip = new Set(s.skip ?? []);
    l.add(void 0);
    let c = s.prox = ne(s.prox), h = s.bias ??= 0;
    H.dataIdx = (p, b, v, w) => {
      if (b == 0)
        return v;
      let x = v, E = c(p, b, v, w) ?? pe, T = E >= 0 && E < pe, D = A.ori == 0 ? Y : P, G = H.left, le = t[0], re = t[b];
      if (l.has(re[v])) {
        x = null;
        let ee = null, U = null, F;
        if (h == 0 || h == -1)
          for (F = v; ee == null && F-- > 0; )
            l.has(re[F]) || (ee = F);
        if (h == 0 || h == 1)
          for (F = v; U == null && F++ < re.length; )
            l.has(re[F]) || (U = F);
        if (ee != null || U != null)
          if (T) {
            let ve = ee == null ? -1 / 0 : L(le[ee], A, D, 0), Se = U == null ? 1 / 0 : L(le[U], A, D, 0), je = G - ve, fe = Se - G;
            je <= fe ? je <= E && (x = ee) : fe <= E && (x = U);
          } else
            x = U == null ? ee : ee == null ? U : v - ee <= U - v ? ee : U;
      } else T && ze(G - L(le[v], A, D, 0)) > E && (x = null);
      return x;
    };
  }
  const Si = (s) => {
    H.event = s;
  };
  H.idxs = de, H._lock = !1;
  let Ge = H.points;
  Ge.show = ne(Ge.show), Ge.size = ne(Ge.size), Ge.stroke = ne(Ge.stroke), Ge.width = ne(Ge.width), Ge.fill = ne(Ge.fill);
  const Ht = n.focus = Te({}, e.focus || { alpha: 0.3 }, H.focus), Yi = Ht.prox >= 0, Zi = Yi && Ge.one;
  let gt = [], Ji = [], Qi = [];
  function _r(s, l) {
    let c = Ge.show(n, l);
    if (c instanceof HTMLElement)
      return ct(c, fh), ct(c, s.class), It(c, -10, -10, Y, P), C.insertBefore(c, gt[l]), c;
  }
  function vr(s, l) {
    if (o == 1 || l > 0) {
      let c = o == 1 && S[s.scale].time, h = s.value;
      s.value = c ? Da(h) ? Fa(oe, Ha(h, R)) : h || se : h || Cd, s.label = s.label || (c ? vd : _d);
    }
    if (Zi || l > 0) {
      s.width = s.width == null ? 1 : s.width, s.paths = s.paths || jd || Dh, s.fillTo = ne(s.fillTo || Md), s.pxAlign = +ae(s.pxAlign, O), s.pxRound = Ka(s.pxAlign), s.stroke = ne(s.stroke || null), s.fill = ne(s.fill || null), s._stroke = s._fill = s._paths = s._focus = null;
      let c = Ed(Xe(1, s.width), 1), h = s.points = Te({}, {
        size: c,
        width: Xe(1, c * 0.2),
        stroke: s.stroke,
        space: c * 2,
        paths: Id,
        _stroke: null,
        _fill: null
      }, s.points);
      h.show = ne(h.show), h.filter = ne(h.filter), h.fill = ne(h.fill), h.stroke = ne(h.stroke), h.paths = ne(h.paths), h.pxAlign = s.pxAlign;
    }
    if (Pe) {
      let c = oo(s, l);
      ke.splice(l, 0, c[0]), Ot.splice(l, 0, c[1]), X.values.push(null);
    }
    if (qe) {
      de.splice(l, 0, null);
      let c = null;
      Zi ? l == 0 && (c = _r(s, l)) : l > 0 && (c = _r(s, l)), gt.splice(l, 0, c), Ji.splice(l, 0, 0), Qi.splice(l, 0, 0);
    }
    Be("addSeries", l);
  }
  function dc(s, l) {
    l = l ?? $.length, s = o == 1 ? Bs(s, l, Ba, Wa) : Bs(s, l, {}, Va), $.splice(l, 0, s), vr($[l], l);
  }
  n.addSeries = dc;
  function fc(s) {
    if ($.splice(s, 1), Pe) {
      X.values.splice(s, 1), Ot.splice(s, 1);
      let l = ke.splice(s, 1)[0];
      Gi(null, l.firstChild), l.remove();
    }
    qe && (de.splice(s, 1), gt.splice(s, 1)[0].remove(), Ji.splice(s, 1), Qi.splice(s, 1)), Be("delSeries", s);
  }
  n.delSeries = fc;
  const Ai = [!1, !1, !1, !1];
  function pc(s, l) {
    if (s._show = s.show, s.show) {
      let c = s.side % 2, h = S[s.scale];
      h == null && (s.scale = c ? $[1].scale : M, h = S[s.scale]);
      let p = h.time;
      s.size = ne(s.size), s.space = ne(s.space), s.rotate = ne(s.rotate), hi(s.incrs) && s.incrs.forEach((v) => {
        !mi.has(v) && mi.set(v, Tl(v));
      }), s.incrs = ne(s.incrs || (h.distr == 2 ? Xh : p ? V == 1 ? td : od : zi)), s.splits = ne(s.splits || (p && h.distr == 1 ? et : h.distr == 3 ? Ls : h.distr == 4 ? xd : wd)), s.stroke = ne(s.stroke), s.grid.stroke = ne(s.grid.stroke), s.ticks.stroke = ne(s.ticks.stroke), s.border.stroke = ne(s.border.stroke);
      let b = s.values;
      s.values = // static array of tick values
      hi(b) && !hi(b[0]) ? ne(b) : (
        // temporal
        p ? (
          // config array of fmtDate string tpls
          hi(b) ? La(oe, Oa(b, R)) : (
            // fmtDate string tpl
            Da(b) ? ad(oe, b) : b || we
          )
        ) : b || yd
      ), s.filter = ne(s.filter || (h.distr >= 3 && h.log == 10 ? Sd : h.distr == 3 && h.log == 2 ? Ad : Cl)), s.font = Ja(s.font), s.labelFont = Ja(s.labelFont), s._size = s.size(n, null, l, 0), s._space = s._rotate = s._incrs = s._found = // foundIncrSpace
      s._splits = s._values = null, s._size > 0 && (Ai[l] = !0, s._el = yt(ch, _));
    }
  }
  function Mn(s, l, c, h) {
    let [p, b, v, w] = c, x = l % 2, E = 0;
    return x == 0 && (w || b) && (E = l == 0 && !p || l == 2 && !v ? Me(Ra.size / 3) : 0), x == 1 && (p || v) && (E = l == 1 && !b || l == 3 && !w ? Me(Ia.size / 2) : 0), E;
  }
  const yr = n.padding = (e.padding || [Mn, Mn, Mn, Mn]).map((s) => ne(ae(s, Mn))), si = n._padding = yr.map((s, l) => s(n, l, Ai, 0));
  let Ie, Le = null, He = null;
  const ao = o == 1 ? $[0].idxs : null;
  let St = null, zn = !1;
  function wr(s, l) {
    if (t = s ?? [], n.data = n._data = t, o == 2) {
      Ie = 0;
      for (let c = 1; c < $.length; c++)
        Ie += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), St = t[0], Ie = St.length;
      let c = t;
      if (Z == 2) {
        c = t.slice();
        let h = c[0] = Array(Ie);
        for (let p = 0; p < Ie; p++)
          h[p] = p;
      }
      n._data = t = c;
    }
    if (en(!0), Be("setData"), Z == 2 && (qi = !0), l !== !1) {
      let c = A;
      c.auto(n, zn) ? Ko() : ai(M, c.min, c.max), ki = ki || H.left >= 0, mt = !0, tn();
    }
  }
  n.setData = wr;
  function Ko() {
    zn = !0;
    let s, l;
    o == 1 && (Ie > 0 ? (Le = ao[0] = 0, He = ao[1] = Ie - 1, s = t[0][Le], l = t[0][He], Z == 2 ? (s = Le, l = He) : s == l && (Z == 3 ? [s, l] = Lo(s, s, A.log, !1) : Z == 4 ? [s, l] = or(s, s, A.log, !1) : A.time ? l = s + Me(86400 / V) : [s, l] = Po(s, l, sr, !0))) : (Le = ao[0] = s = null, He = ao[1] = l = null)), ai(M, s, l);
  }
  let lo, Xi, qo, Yo, Zo, Jo, Qo, Xo, es, it;
  function xr(s, l, c, h, p, b) {
    s ??= pa, c ??= ar, h ??= "butt", p ??= pa, b ??= "round", s != lo && (m.strokeStyle = lo = s), p != Xi && (m.fillStyle = Xi = p), l != qo && (m.lineWidth = qo = l), b != Zo && (m.lineJoin = Zo = b), h != Jo && (m.lineCap = Jo = h), c != Yo && m.setLineDash(Yo = c);
  }
  function $r(s, l, c, h) {
    l != Xi && (m.fillStyle = Xi = l), s != Qo && (m.font = Qo = s), c != Xo && (m.textAlign = Xo = c), h != es && (m.textBaseline = es = h);
  }
  function ts(s, l, c, h, p = 0) {
    if (h.length > 0 && s.auto(n, zn) && (l == null || l.min == null)) {
      let b = ae(Le, 0), v = ae(He, h.length - 1), w = c.min == null ? Sh(h, b, v, p, s.distr == 3) : [c.min, c.max];
      s.min = Pt(s.min, c.min = w[0]), s.max = Xe(s.max, c.max = w[1]);
    }
  }
  const kr = { min: null, max: null };
  function mc() {
    for (let h in S) {
      let p = S[h];
      B[h] == null && // scales that have never been set (on init)
      (p.min == null || // or auto scales when the x scale was explicitly set
      B[M] != null && p.auto(n, zn)) && (B[h] = kr);
    }
    for (let h in S) {
      let p = S[h];
      B[h] == null && p.from != null && B[p.from] != null && (B[h] = kr);
    }
    B[M] != null && en(!0);
    let s = {};
    for (let h in B) {
      let p = B[h];
      if (p != null) {
        let b = s[h] = wn(S[h], Nh);
        if (p.min != null)
          Te(b, p);
        else if (h != M || o == 2)
          if (Ie == 0 && b.from == null) {
            let v = b.range(n, null, null, h);
            b.min = v[0], b.max = v[1];
          } else
            b.min = pe, b.max = -pe;
      }
    }
    if (Ie > 0) {
      $.forEach((h, p) => {
        if (o == 1) {
          let b = h.scale, v = B[b];
          if (v == null)
            return;
          let w = s[b];
          if (p == 0) {
            let x = w.range(n, w.min, w.max, b);
            w.min = x[0], w.max = x[1], Le = Tt(w.min, t[0]), He = Tt(w.max, t[0]), He - Le > 1 && (t[0][Le] < w.min && Le++, t[0][He] > w.max && He--), h.min = St[Le], h.max = St[He];
          } else h.show && h.auto && ts(w, v, h, t[p], h.sorted);
          h.idxs[0] = Le, h.idxs[1] = He;
        } else if (p > 0 && h.show && h.auto) {
          let [b, v] = h.facets, w = b.scale, x = v.scale, [E, T] = t[p], D = s[w], G = s[x];
          D != null && ts(D, B[w], b, E, b.sorted), G != null && ts(G, B[x], v, T, v.sorted), h.min = v.min, h.max = v.max;
        }
      });
      for (let h in s) {
        let p = s[h], b = B[h];
        if (p.from == null && (b == null || b.min == null)) {
          let v = p.range(
            n,
            p.min == pe ? null : p.min,
            p.max == -pe ? null : p.max,
            h
          );
          p.min = v[0], p.max = v[1];
        }
      }
    }
    for (let h in s) {
      let p = s[h];
      if (p.from != null) {
        let b = s[p.from];
        if (b.min == null)
          p.min = p.max = null;
        else {
          let v = p.range(n, b.min, b.max, h);
          p.min = v[0], p.max = v[1];
        }
      }
    }
    let l = {}, c = !1;
    for (let h in s) {
      let p = s[h], b = S[h];
      if (b.min != p.min || b.max != p.max) {
        b.min = p.min, b.max = p.max;
        let v = b.distr;
        b._min = v == 3 ? Zt(b.min) : v == 4 ? ks(b.min, b.asinh) : v == 100 ? b.fwd(b.min) : b.min, b._max = v == 3 ? Zt(b.max) : v == 4 ? ks(b.max, b.asinh) : v == 100 ? b.fwd(b.max) : b.max, l[h] = c = !0;
      }
    }
    if (c) {
      $.forEach((h, p) => {
        o == 2 ? p > 0 && l.y && (h._paths = null) : l[h.scale] && (h._paths = null);
      });
      for (let h in l)
        qi = !0, Be("setScale", h);
      qe && H.left >= 0 && (ki = mt = !0);
    }
    for (let h in B)
      B[h] = null;
  }
  function gc(s) {
    let l = Os(Le - 1, 0, Ie - 1), c = Os(He + 1, 0, Ie - 1);
    for (; s[l] == null && l > 0; )
      l--;
    for (; s[c] == null && c < Ie - 1; )
      c++;
    return [l, c];
  }
  function bc() {
    if (Ie > 0) {
      let s = $.some((l) => l._focus) && it != Ht.alpha;
      s && (m.globalAlpha = it = Ht.alpha), $.forEach((l, c) => {
        if (c > 0 && l.show && (Sr(c, !1), Sr(c, !0), l._paths == null)) {
          let h = it;
          it != l.alpha && (m.globalAlpha = it = l.alpha);
          let p = o == 2 ? [0, t[c][0].length - 1] : gc(t[c]);
          l._paths = l.paths(n, c, p[0], p[1]), it != h && (m.globalAlpha = it = h);
        }
      }), $.forEach((l, c) => {
        if (c > 0 && l.show) {
          let h = it;
          it != l.alpha && (m.globalAlpha = it = l.alpha), l._paths != null && Ar(c, !1);
          {
            let p = l._paths != null ? l._paths.gaps : null, b = l.points.show(n, c, Le, He, p), v = l.points.filter(n, c, b, p);
            (b || v) && (l.points._paths = l.points.paths(n, c, Le, He, v), Ar(c, !0));
          }
          it != h && (m.globalAlpha = it = h), Be("drawSeries", c);
        }
      }), s && (m.globalAlpha = it = 1);
    }
  }
  function Sr(s, l) {
    let c = l ? $[s].points : $[s];
    c._stroke = c.stroke(n, s), c._fill = c.fill(n, s);
  }
  function Ar(s, l) {
    let c = l ? $[s].points : $[s], {
      stroke: h,
      fill: p,
      clip: b,
      flags: v,
      _stroke: w = c._stroke,
      _fill: x = c._fill,
      _width: E = c.width
    } = c._paths;
    E = me(E * ce, 3);
    let T = null, D = E % 2 / 2;
    l && x == null && (x = E > 0 ? "#fff" : w);
    let G = c.pxAlign == 1 && D > 0;
    if (G && m.translate(D, D), !l) {
      let le = st - E / 2, re = pt - E / 2, ee = tt + E, U = kt + E;
      T = new Path2D(), T.rect(le, re, ee, U);
    }
    l ? is(w, E, c.dash, c.cap, x, h, p, v, b) : _c(s, w, E, c.dash, c.cap, x, h, p, v, T, b), G && m.translate(-D, -D);
  }
  function _c(s, l, c, h, p, b, v, w, x, E, T) {
    let D = !1;
    x != 0 && J.forEach((G, le) => {
      if (G.series[0] == s) {
        let re = $[G.series[1]], ee = t[G.series[1]], U = (re._paths || qn).band;
        hi(U) && (U = G.dir == 1 ? U[0] : U[1]);
        let F, ve = null;
        re.show && U && Ch(ee, Le, He) ? (ve = G.fill(n, le) || b, F = re._paths.clip) : U = null, is(l, c, h, p, ve, v, w, x, E, T, F, U), D = !0;
      }
    }), D || is(l, c, h, p, b, v, w, x, E, T);
  }
  const Cr = xn | Fs;
  function is(s, l, c, h, p, b, v, w, x, E, T, D) {
    xr(s, l, c, h, p), (x || E || D) && (m.save(), x && m.clip(x), E && m.clip(E)), D ? (w & Cr) == Cr ? (m.clip(D), T && m.clip(T), uo(p, v), co(s, b, l)) : w & Fs ? (uo(p, v), m.clip(D), co(s, b, l)) : w & xn && (m.save(), m.clip(D), T && m.clip(T), uo(p, v), m.restore(), co(s, b, l)) : (uo(p, v), co(s, b, l)), (x || E || D) && m.restore();
  }
  function co(s, l, c) {
    c > 0 && (l instanceof Map ? l.forEach((h, p) => {
      m.strokeStyle = lo = p, m.stroke(h);
    }) : l != null && s && m.stroke(l));
  }
  function uo(s, l) {
    l instanceof Map ? l.forEach((c, h) => {
      m.fillStyle = Xi = h, m.fill(c);
    }) : l != null && s && m.fill(l);
  }
  function vc(s, l, c, h) {
    let p = j[s], b;
    if (h <= 0)
      b = [0, 0];
    else {
      let v = p._space = p.space(n, s, l, c, h), w = p._incrs = p.incrs(n, s, l, c, h, v);
      b = qd(l, c, w, h, v);
    }
    return p._found = b;
  }
  function ns(s, l, c, h, p, b, v, w, x, E) {
    let T = v % 2 / 2;
    O == 1 && m.translate(T, T), xr(w, v, x, E, w), m.beginPath();
    let D, G, le, re, ee = p + (h == 0 || h == 3 ? -b : b);
    c == 0 ? (G = p, re = ee) : (D = p, le = ee);
    for (let U = 0; U < s.length; U++)
      l[U] != null && (c == 0 ? D = le = s[U] : G = re = s[U], m.moveTo(D, G), m.lineTo(le, re));
    m.stroke(), O == 1 && m.translate(-T, -T);
  }
  function yc(s) {
    let l = !0;
    return j.forEach((c, h) => {
      if (!c.show)
        return;
      let p = S[c.scale];
      if (p.min == null) {
        c._show && (l = !1, c._show = !1, en(!1));
        return;
      } else
        c._show || (l = !1, c._show = !0, en(!1));
      let b = c.side, v = b % 2, { min: w, max: x } = p, [E, T] = vc(h, w, x, v == 0 ? Y : P);
      if (T == 0)
        return;
      let D = p.distr == 2, G = c._splits = c.splits(n, h, w, x, E, T, D), le = p.distr == 2 ? G.map((F) => St[F]) : G, re = p.distr == 2 ? St[G[1]] - St[G[0]] : E, ee = c._values = c.values(n, c.filter(n, le, h, T, re), h, T, re);
      c._rotate = b == 2 ? c.rotate(n, ee, h, T) : 0;
      let U = c._size;
      c._size = wt(c.size(n, ee, h, s)), U != null && c._size != U && (l = !1);
    }), l;
  }
  function wc(s) {
    let l = !0;
    return yr.forEach((c, h) => {
      let p = c(n, h, Ai, s);
      p != si[h] && (l = !1), si[h] = p;
    }), l;
  }
  function xc() {
    for (let s = 0; s < j.length; s++) {
      let l = j[s];
      if (!l.show || !l._show)
        continue;
      let c = l.side, h = c % 2, p, b, v = l.stroke(n, s), w = c == 0 || c == 3 ? -1 : 1, [x, E] = l._found;
      if (l.label != null) {
        let Je = l.labelGap * w, lt = Me((l._lpos + Je) * ce);
        $r(l.labelFont[0], v, "center", c == 2 ? Bn : fa), m.save(), h == 1 ? (p = b = 0, m.translate(
          lt,
          Me(pt + kt / 2)
        ), m.rotate((c == 3 ? -ko : ko) / 2)) : (p = Me(st + tt / 2), b = lt);
        let Ti = Sl(l.label) ? l.label(n, s, x, E) : l.label;
        m.fillText(Ti, p, b), m.restore();
      }
      if (E == 0)
        continue;
      let T = S[l.scale], D = h == 0 ? tt : kt, G = h == 0 ? st : pt, le = l._splits, re = T.distr == 2 ? le.map((Je) => St[Je]) : le, ee = T.distr == 2 ? St[le[1]] - St[le[0]] : x, U = l.ticks, F = l.border, ve = U.show ? U.size : 0, Se = Me(ve * ce), je = Me((l.alignTo == 2 ? l._size - ve - l.gap : l.gap) * ce), fe = l._rotate * -ko / 180, Ae = I(l._pos * ce), rt = (Se + je) * w, Ze = Ae + rt;
      b = h == 0 ? Ze : 0, p = h == 1 ? Ze : 0;
      let bt = l.font[0], At = l.align == 1 ? fn : l.align == 2 ? ws : fe > 0 ? fn : fe < 0 ? ws : h == 0 ? "center" : c == 3 ? ws : fn, Bt = fe || h == 1 ? "middle" : c == 2 ? Bn : fa;
      $r(bt, v, At, Bt);
      let at = l.font[1] * l.lineGap, _t = le.map((Je) => I(u(Je, T, D, G))), Ct = l._values;
      for (let Je = 0; Je < Ct.length; Je++) {
        let lt = Ct[Je];
        if (lt != null) {
          h == 0 ? p = _t[Je] : b = _t[Je], lt = "" + lt;
          let Ti = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let Qe = 0; Qe < Ti.length; Qe++) {
            let Gr = Ti[Qe];
            fe ? (m.save(), m.translate(p, b + Qe * at), m.rotate(fe), m.fillText(Gr, 0, 0), m.restore()) : m.fillText(Gr, p, b + Qe * at);
          }
        }
      }
      U.show && ns(
        _t,
        U.filter(n, re, s, E, ee),
        h,
        c,
        Ae,
        Se,
        me(U.width * ce, 3),
        U.stroke(n, s),
        U.dash,
        U.cap
      );
      let jt = l.grid;
      jt.show && ns(
        _t,
        jt.filter(n, re, s, E, ee),
        h,
        h == 0 ? 2 : 1,
        h == 0 ? pt : st,
        h == 0 ? kt : tt,
        me(jt.width * ce, 3),
        jt.stroke(n, s),
        jt.dash,
        jt.cap
      ), F.show && ns(
        [Ae],
        [1],
        h == 0 ? 1 : 0,
        h == 0 ? 1 : 2,
        h == 1 ? pt : st,
        h == 1 ? kt : tt,
        me(F.width * ce, 3),
        F.stroke(n, s),
        F.dash,
        F.cap
      );
    }
    Be("drawAxes");
  }
  function en(s) {
    $.forEach((l, c) => {
      c > 0 && (l._paths = null, s && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((h) => {
        h.min = null, h.max = null;
      })));
    });
  }
  let ho = !1, os = !1, Nn = [];
  function $c() {
    os = !1;
    for (let s = 0; s < Nn.length; s++)
      Be(...Nn[s]);
    Nn.length = 0;
  }
  function tn() {
    ho || (jh(Er), ho = !0);
  }
  function kc(s, l = !1) {
    ho = !0, os = l, s(n), Er(), l && Nn.length > 0 && queueMicrotask($c);
  }
  n.batch = kc;
  function Er() {
    if (Wo && (mc(), Wo = !1), qi && (lc(), qi = !1), so) {
      if (ye(k, fn, ge), ye(k, Bn, De), ye(k, Un, Y), ye(k, Vn, P), ye(C, fn, ge), ye(C, Bn, De), ye(C, Un, Y), ye(C, Vn, P), ye(_, Un, Kt), ye(_, Vn, wi), g.width = Me(Kt * ce), g.height = Me(wi * ce), j.forEach(({ _el: s, _show: l, _size: c, _pos: h, side: p }) => {
        if (s != null)
          if (l) {
            let b = p === 3 || p === 0 ? c : 0, v = p % 2 == 1;
            ye(s, v ? "left" : "top", h - b), ye(s, v ? "width" : "height", c), ye(s, v ? "top" : "left", v ? De : ge), ye(s, v ? "height" : "width", v ? P : Y), zs(s, Ni);
          } else
            ct(s, Ni);
      }), lo = Xi = qo = Zo = Jo = Qo = Xo = es = Yo = null, it = 1, Hn(!0), ge != Ki || De != xi || Y != Lt || P != $i) {
        en(!1);
        let s = Y / Lt, l = P / $i;
        if (qe && !ki && H.left >= 0) {
          H.left *= s, H.top *= l, nn && It(nn, Me(H.left), 0, Y, P), on && It(on, 0, Me(H.top), Y, P);
          for (let c = 0; c < gt.length; c++) {
            let h = gt[c];
            h != null && (Ji[c] *= s, Qi[c] *= l, It(h, wt(Ji[c]), wt(Qi[c]), Y, P));
          }
        }
        if (_e.show && !ro && _e.left >= 0 && _e.width > 0) {
          _e.left *= s, _e.width *= s, _e.top *= l, _e.height *= l;
          for (let c in us)
            ye(an, c, _e[c]);
        }
        Ki = ge, xi = De, Lt = Y, $i = P;
      }
      Be("setSize"), so = !1;
    }
    Kt > 0 && wi > 0 && (m.clearRect(0, 0, g.width, g.height), Be("drawClear"), q.forEach((s) => s()), Be("draw")), _e.show && ro && (fo(_e), ro = !1), qe && ki && (Ei(null, !0, !1), ki = !1), X.show && X.live && mt && (ls(), mt = !1), d || (d = !0, n.status = 1, Be("ready")), zn = !1, ho = !1;
  }
  n.redraw = (s, l) => {
    qi = l || !1, s !== !1 ? ai(M, A.min, A.max) : tn();
  };
  function ss(s, l) {
    let c = S[s];
    if (c.from == null) {
      if (Ie == 0) {
        let h = c.range(n, l.min, l.max, s);
        l.min = h[0], l.max = h[1];
      }
      if (l.min > l.max) {
        let h = l.min;
        l.min = l.max, l.max = h;
      }
      if (Ie > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      s == M && c.distr == 2 && Ie > 0 && (l.min = Tt(l.min, t[0]), l.max = Tt(l.max, t[0]), l.min == l.max && l.max++), B[s] = l, Wo = !0, tn();
    }
  }
  n.setScale = ss;
  let rs, as, nn, on, Tr, Pr, sn, rn, Dr, Mr, be, $e, ri = !1;
  const Ue = H.drag;
  let Fe = Ue.x, Re = Ue.y;
  qe && (H.x && (rs = yt(hh, C)), H.y && (as = yt(dh, C)), A.ori == 0 ? (nn = rs, on = as) : (nn = as, on = rs), be = H.left, $e = H.top);
  const _e = n.select = Te({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), an = _e.show ? yt(uh, _e.over ? C : k) : null;
  function fo(s, l) {
    if (_e.show) {
      for (let c in s)
        _e[c] = s[c], c in us && ye(an, c, s[c]);
      l !== !1 && Be("setSelect");
    }
  }
  n.setSelect = fo;
  function Sc(s) {
    if ($[s].show)
      Pe && zs(ke[s], Ni);
    else if (Pe && ct(ke[s], Ni), qe) {
      let c = Zi ? gt[0] : gt[s];
      c != null && It(c, -10, -10, Y, P);
    }
  }
  function ai(s, l, c) {
    ss(s, { min: l, max: c });
  }
  function Ft(s, l, c, h) {
    l.focus != null && Pc(s), l.show != null && $.forEach((p, b) => {
      b > 0 && (s == b || s == null) && (p.show = l.show, Sc(b), o == 2 ? (ai(p.facets[0].scale, null, null), ai(p.facets[1].scale, null, null)) : ai(p.scale, null, null), tn());
    }), c !== !1 && Be("setSeries", s, l), h && Fn("setSeries", n, s, l);
  }
  n.setSeries = Ft;
  function Ac(s, l) {
    Te(J[s], l);
  }
  function Cc(s, l) {
    s.fill = ne(s.fill || null), s.dir = ae(s.dir, -1), l = l ?? J.length, J.splice(l, 0, s);
  }
  function Ec(s) {
    s == null ? J.length = 0 : J.splice(s, 1);
  }
  n.addBand = Cc, n.setBand = Ac, n.delBand = Ec;
  function Tc(s, l) {
    $[s].alpha = l, qe && gt[s] != null && (gt[s].style.opacity = l), Pe && ke[s] && (ke[s].style.opacity = l);
  }
  let qt, li, Ci;
  const ln = { focus: !0 };
  function Pc(s) {
    if (s != Ci) {
      let l = s == null, c = Ht.alpha != 1;
      $.forEach((h, p) => {
        if (o == 1 || p > 0) {
          let b = l || p == 0 || p == s;
          h._focus = l ? null : b, c && Tc(p, b ? 1 : Ht.alpha);
        }
      }), Ci = s, c && tn();
    }
  }
  Pe && Yi && Ye(ba, ue, (s) => {
    H._lock || (Si(s), Ci != null && Ft(null, ln, !0, Ee.setSeries));
  });
  function Rt(s, l, c) {
    let h = S[l];
    c && (s = s / ce - (h.ori == 1 ? De : ge));
    let p = Y;
    h.ori == 1 && (p = P, s = p - s), h.dir == -1 && (s = p - s);
    let b = h._min, v = h._max, w = s / p, x = b + (v - b) * w, E = h.distr;
    return E == 3 ? vn(10, x) : E == 4 ? Th(x, h.asinh) : E == 100 ? h.bwd(x) : x;
  }
  function Dc(s, l) {
    let c = Rt(s, M, l);
    return Tt(c, t[0], Le, He);
  }
  n.valToIdx = (s) => Tt(s, t[0]), n.posToIdx = Dc, n.posToVal = Rt, n.valToPos = (s, l, c) => S[l].ori == 0 ? r(
    s,
    S[l],
    c ? tt : Y,
    c ? st : 0
  ) : a(
    s,
    S[l],
    c ? kt : P,
    c ? pt : 0
  ), n.setCursor = (s, l, c) => {
    be = s.left, $e = s.top, Ei(null, l, c);
  };
  function zr(s, l) {
    ye(an, fn, _e.left = s), ye(an, Un, _e.width = l);
  }
  function Nr(s, l) {
    ye(an, Bn, _e.top = s), ye(an, Vn, _e.height = l);
  }
  let On = A.ori == 0 ? zr : Nr, Ln = A.ori == 1 ? zr : Nr;
  function Mc() {
    if (Pe && X.live)
      for (let s = o == 2 ? 1 : 0; s < $.length; s++) {
        if (s == 0 && ft)
          continue;
        let l = X.values[s], c = 0;
        for (let h in l)
          Ot[s][c++].firstChild.nodeValue = l[h];
      }
  }
  function ls(s, l) {
    if (s != null && (s.idxs ? s.idxs.forEach((c, h) => {
      de[h] = c;
    }) : zh(s.idx) || de.fill(s.idx), X.idx = de[0]), Pe && X.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || o == 1 && !ft) && zc(c, de[c]);
      Mc();
    }
    mt = !1, l !== !1 && Be("setLegend");
  }
  n.setLegend = ls;
  function zc(s, l) {
    let c = $[s], h = s == 0 && Z == 2 ? St : t[s], p;
    ft ? p = c.values(n, s, l) ?? oi : (p = c.value(n, l == null ? null : h[l], s, l), p = p == null ? oi : { _: p }), X.values[s] = p;
  }
  function Ei(s, l, c) {
    Dr = be, Mr = $e, [be, $e] = H.move(n, be, $e), H.left = be, H.top = $e, qe && (nn && It(nn, Me(be), 0, Y, P), on && It(on, 0, Me($e), Y, P));
    let h, p = Le > He;
    qt = pe, li = null;
    let b = A.ori == 0 ? Y : P, v = A.ori == 1 ? Y : P;
    if (be < 0 || Ie == 0 || p) {
      h = H.idx = null;
      for (let w = 0; w < $.length; w++) {
        let x = gt[w];
        x != null && It(x, -10, -10, Y, P);
      }
      Yi && Ft(null, ln, !0, s == null && Ee.setSeries), X.live && (de.fill(h), mt = !0);
    } else {
      let w, x, E;
      o == 1 && (w = A.ori == 0 ? be : $e, x = Rt(w, M), h = H.idx = Tt(x, t[0], Le, He), E = L(t[0][h], A, b, 0));
      let T = -10, D = -10, G = 0, le = 0, re = !0, ee = "", U = "";
      for (let F = o == 2 ? 1 : 0; F < $.length; F++) {
        let ve = $[F], Se = de[F], je = Se == null ? null : o == 1 ? t[F][Se] : t[F][1][Se], fe = H.dataIdx(n, F, h, x), Ae = fe == null ? null : o == 1 ? t[F][fe] : t[F][1][fe];
        if (mt = mt || Ae != je || fe != Se, de[F] = fe, F > 0 && ve.show) {
          let rt = fe == null ? -10 : fe == h ? E : L(o == 1 ? t[0][fe] : t[F][0][fe], A, b, 0), Ze = Ae == null ? -10 : W(Ae, o == 1 ? S[ve.scale] : S[ve.facets[1].scale], v, 0);
          if (Yi && Ae != null) {
            let bt = A.ori == 1 ? be : $e, At = ze(Ht.dist(n, F, fe, Ze, bt));
            if (At < qt) {
              let Bt = Ht.bias;
              if (Bt != 0) {
                let at = Rt(bt, ve.scale), _t = Ae >= 0 ? 1 : -1, Ct = at >= 0 ? 1 : -1;
                Ct == _t && (Ct == 1 ? Bt == 1 ? Ae >= at : Ae <= at : (
                  // >= 0
                  Bt == 1 ? Ae <= at : Ae >= at
                )) && (qt = At, li = F);
              } else
                qt = At, li = F;
            }
          }
          if (mt || Zi) {
            let bt, At;
            A.ori == 0 ? (bt = rt, At = Ze) : (bt = Ze, At = rt);
            let Bt, at, _t, Ct, jt, Je, lt = !0, Ti = Ge.bbox;
            if (Ti != null) {
              lt = !1;
              let Qe = Ti(n, F);
              _t = Qe.left, Ct = Qe.top, Bt = Qe.width, at = Qe.height;
            } else
              _t = bt, Ct = At, Bt = at = Ge.size(n, F);
            if (Je = Ge.fill(n, F), jt = Ge.stroke(n, F), Zi)
              F == li && qt <= Ht.prox && (T = _t, D = Ct, G = Bt, le = at, re = lt, ee = Je, U = jt);
            else {
              let Qe = gt[F];
              Qe != null && (Ji[F] = _t, Qi[F] = Ct, ka(Qe, Bt, at, lt), xa(Qe, Je, jt), It(Qe, wt(_t), wt(Ct), Y, P));
            }
          }
        }
      }
      if (Zi) {
        let F = Ht.prox, ve = Ci == null ? qt <= F : qt > F || li != Ci;
        if (mt || ve) {
          let Se = gt[0];
          Se != null && (Ji[0] = T, Qi[0] = D, ka(Se, G, le, re), xa(Se, ee, U), It(Se, wt(T), wt(D), Y, P));
        }
      }
    }
    if (_e.show && ri)
      if (s != null) {
        let [w, x] = Ee.scales, [E, T] = Ee.match, [D, G] = s.cursor.sync.scales, le = s.cursor.drag;
        if (Fe = le._x, Re = le._y, Fe || Re) {
          let { left: re, top: ee, width: U, height: F } = s.select, ve = s.scales[D].ori, Se = s.posToVal, je, fe, Ae, rt, Ze, bt = w != null && E(w, D), At = x != null && T(x, G);
          bt && Fe ? (ve == 0 ? (je = re, fe = U) : (je = ee, fe = F), Ae = S[w], rt = L(Se(je, D), Ae, b, 0), Ze = L(Se(je + fe, D), Ae, b, 0), On(Pt(rt, Ze), ze(Ze - rt))) : On(0, b), At && Re ? (ve == 1 ? (je = re, fe = U) : (je = ee, fe = F), Ae = S[x], rt = W(Se(je, G), Ae, v, 0), Ze = W(Se(je + fe, G), Ae, v, 0), Ln(Pt(rt, Ze), ze(Ze - rt))) : Ln(0, v);
        } else
          hs();
      } else {
        let w = ze(Dr - Tr), x = ze(Mr - Pr);
        if (A.ori == 1) {
          let G = w;
          w = x, x = G;
        }
        Fe = Ue.x && w >= Ue.dist, Re = Ue.y && x >= Ue.dist;
        let E = Ue.uni;
        E != null ? Fe && Re && (Fe = w >= E, Re = x >= E, !Fe && !Re && (x > w ? Re = !0 : Fe = !0)) : Ue.x && Ue.y && (Fe || Re) && (Fe = Re = !0);
        let T, D;
        Fe && (A.ori == 0 ? (T = sn, D = be) : (T = rn, D = $e), On(Pt(T, D), ze(D - T)), Re || Ln(0, v)), Re && (A.ori == 1 ? (T = sn, D = be) : (T = rn, D = $e), Ln(Pt(T, D), ze(D - T)), Fe || On(0, b)), !Fe && !Re && (On(0, 0), Ln(0, 0));
      }
    if (Ue._x = Fe, Ue._y = Re, s == null) {
      if (c) {
        if (Wr != null) {
          let [w, x] = Ee.scales;
          Ee.values[0] = w != null ? Rt(A.ori == 0 ? be : $e, w) : null, Ee.values[1] = x != null ? Rt(A.ori == 1 ? be : $e, x) : null;
        }
        Fn(xs, n, be, $e, Y, P, h);
      }
      if (Yi) {
        let w = c && Ee.setSeries, x = Ht.prox;
        Ci == null ? qt <= x && Ft(li, ln, !0, w) : qt > x ? Ft(null, ln, !0, w) : li != Ci && Ft(li, ln, !0, w);
      }
    }
    mt && (X.idx = h, ls()), l !== !1 && Be("setCursor");
  }
  let ci = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ci == null && Hn(!1), ci;
    }
  });
  function Hn(s = !1) {
    s ? ci = null : (ci = C.getBoundingClientRect(), Be("syncRect", ci));
  }
  function Or(s, l, c, h, p, b, v) {
    H._lock || ri && s != null && s.movementX == 0 && s.movementY == 0 || (cs(s, l, c, h, p, b, v, !1, s != null), s != null ? Ei(null, !0, !0) : Ei(l, !0, !1));
  }
  function cs(s, l, c, h, p, b, v, w, x) {
    if (ci == null && Hn(!1), Si(s), s != null)
      c = s.clientX - ci.left, h = s.clientY - ci.top;
    else {
      if (c < 0 || h < 0) {
        be = -10, $e = -10;
        return;
      }
      let [E, T] = Ee.scales, D = l.cursor.sync, [G, le] = D.values, [re, ee] = D.scales, [U, F] = Ee.match, ve = l.axes[0].side % 2 == 1, Se = A.ori == 0 ? Y : P, je = A.ori == 1 ? Y : P, fe = ve ? b : p, Ae = ve ? p : b, rt = ve ? h : c, Ze = ve ? c : h;
      if (re != null ? c = U(E, re) ? u(G, S[E], Se, 0) : -10 : c = Se * (rt / fe), ee != null ? h = F(T, ee) ? u(le, S[T], je, 0) : -10 : h = je * (Ze / Ae), A.ori == 1) {
        let bt = c;
        c = h, h = bt;
      }
    }
    x && (l == null || l.cursor.event.type == xs) && ((c <= 1 || c >= Y - 1) && (c = Mi(c, Y)), (h <= 1 || h >= P - 1) && (h = Mi(h, P))), w ? (Tr = c, Pr = h, [sn, rn] = H.move(n, c, h)) : (be = c, $e = h);
  }
  const us = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function hs() {
    fo(us, !1);
  }
  let Lr, Hr, Fr, Rr;
  function Br(s, l, c, h, p, b, v) {
    ri = !0, Fe = Re = Ue._x = Ue._y = !1, cs(s, l, c, h, p, b, v, !0, !1), s != null && (Ye($s, Ds, jr, !1), Fn(ma, n, sn, rn, Y, P, null));
    let { left: w, top: x, width: E, height: T } = _e;
    Lr = w, Hr = x, Fr = E, Rr = T;
  }
  function jr(s, l, c, h, p, b, v) {
    ri = Ue._x = Ue._y = !1, cs(s, l, c, h, p, b, v, !1, !0);
    let { left: w, top: x, width: E, height: T } = _e, D = E > 0 || T > 0, G = Lr != w || Hr != x || Fr != E || Rr != T;
    if (D && G && fo(_e), Ue.setScale && D && G) {
      let le = w, re = E, ee = x, U = T;
      if (A.ori == 1 && (le = x, re = T, ee = w, U = E), Fe && ai(
        M,
        Rt(le, M),
        Rt(le + re, M)
      ), Re)
        for (let F in S) {
          let ve = S[F];
          F != M && ve.from == null && ve.min != pe && ai(
            F,
            Rt(ee + U, F),
            Rt(ee, F)
          );
        }
      hs();
    } else H.lock && (H._lock = !H._lock, Ei(l, !0, s != null));
    s != null && (Gi($s, Ds), Fn($s, n, be, $e, Y, P, null));
  }
  function Nc(s, l, c, h, p, b, v) {
    if (H._lock)
      return;
    Si(s);
    let w = ri;
    if (ri) {
      let x = !0, E = !0, T = 10, D, G;
      A.ori == 0 ? (D = Fe, G = Re) : (D = Re, G = Fe), D && G && (x = be <= T || be >= Y - T, E = $e <= T || $e >= P - T), D && x && (be = be < sn ? 0 : Y), G && E && ($e = $e < rn ? 0 : P), Ei(null, !0, !0), ri = !1;
    }
    be = -10, $e = -10, de.fill(null), Ei(null, !0, !0), w && (ri = w);
  }
  function Ir(s, l, c, h, p, b, v) {
    H._lock || (Si(s), Ko(), hs(), s != null && Fn(_a, n, be, $e, Y, P, null));
  }
  function Ur() {
    j.forEach(Yd), Go(n.width, n.height, !0);
  }
  Hi(To, gn, Ur);
  const cn = {};
  cn.mousedown = Br, cn.mousemove = Or, cn.mouseup = jr, cn.dblclick = Ir, cn.setSeries = (s, l, c, h) => {
    let p = Ee.match[2];
    c = p(n, l, c), c != -1 && Ft(c, h, !0, !1);
  }, qe && (Ye(ma, C, Br), Ye(xs, C, Or), Ye(ga, C, (s) => {
    Si(s), Hn(!1);
  }), Ye(ba, C, Nc), Ye(_a, C, Ir), Rs.add(n), n.syncRect = Hn);
  const po = n.hooks = e.hooks || {};
  function Be(s, l, c) {
    os ? Nn.push([s, l, c]) : s in po && po[s].forEach((h) => {
      h.call(null, n, l, c);
    });
  }
  (e.plugins || []).forEach((s) => {
    for (let l in s.hooks)
      po[l] = (po[l] || []).concat(s.hooks[l]);
  });
  const Vr = (s, l, c) => c, Ee = Te({
    key: null,
    setSeries: !1,
    filters: {
      pub: Ta,
      sub: Ta
    },
    scales: [M, $[1] ? $[1].scale : null],
    match: [Pa, Pa, Vr],
    values: [null, null]
  }, H.sync);
  Ee.match.length == 2 && Ee.match.push(Vr), H.sync = Ee;
  const Wr = Ee.key, ds = Yl(Wr);
  function Fn(s, l, c, h, p, b, v) {
    Ee.filters.pub(s, l, c, h, p, b, v) && ds.pub(s, l, c, h, p, b, v);
  }
  ds.sub(n);
  function Oc(s, l, c, h, p, b, v) {
    Ee.filters.sub(s, l, c, h, p, b, v) && cn[s](null, l, c, h, p, b, v);
  }
  n.pub = Oc;
  function Lc() {
    ds.unsub(n), Rs.delete(n), yi.clear(), Ns(To, gn, Ur), f.remove(), ue?.remove(), Be("destroy");
  }
  n.destroy = Lc;
  function fs() {
    Be("init", e, t), wr(t || e.data, !1), B[M] ? ss(M, B[M]) : Ko(), ro = _e.show && (_e.width > 0 || _e.height > 0), ki = mt = !0, Go(e.width, e.height);
  }
  return $.forEach(vr), j.forEach(pc), i ? i instanceof HTMLElement ? (i.appendChild(f), fs()) : i(n, fs) : fs(), n;
}
Ke.assign = Te;
Ke.fmtNum = rr;
Ke.rangeNum = Po;
Ke.rangeLog = Lo;
Ke.rangeAsinh = or;
Ke.orient = Ui;
Ke.pxRatio = ce;
Ke.join = Bh;
Ke.fmtDate = lr, Ke.tzDate = Jh;
Ke.sync = Yl;
{
  Ke.addGap = zd, Ke.clipGaps = Ro;
  let e = Ke.paths = {
    points: tc
  };
  e.linear = nc, e.stepped = Ld, e.bars = Hd, e.spline = Rd;
}
const Zd = 24;
async function Jd(e, t, i, n) {
  const o = new Date(Date.now() - i * 60 * 60 * 1e3), r = {};
  return e.connection.subscribeMessage(
    (a) => {
      const u = a.states ?? {};
      if (Object.keys(u).length === 0) {
        Object.keys(r).length > 0 && n(r);
        return;
      }
      const d = (Date.now() - i * 60 * 60 * 1e3) / 1e3;
      for (const [f, g] of Object.entries(u)) {
        const m = r[f] ?? [];
        r[f] = [...m, ...g].filter((_) => _.lu >= d);
      }
      n(r);
    },
    {
      type: "history/stream",
      start_time: o.toISOString(),
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
function In(e) {
  if (!e) return [];
  const t = [];
  for (const i of e) {
    const n = parseFloat(i.s);
    Number.isFinite(n) && t.push([i.lu, n]);
  }
  return t.sort((i, n) => i[0] - n[0]), t;
}
function Qd(e, t) {
  const i = /* @__PURE__ */ new Set();
  for (const r of e) for (const [a] of r) i.add(a);
  if (i.size === 0)
    return [[t], ...e.map(() => [null])];
  const n = [...i].sort((r, a) => r - a), o = e.map((r) => {
    let a = -1, u = null;
    return n.map((d) => {
      for (; a + 1 < r.length && r[a + 1][0] <= d; )
        a++, u = r[a][1];
      return u;
    });
  });
  return [n, ...o];
}
const Xd = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var ef = Object.defineProperty, Uo = (e, t, i, n) => {
  for (var o = void 0, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = a(t, i, o) || o);
  return o && ef(t, i, o), o;
};
const tf = [
  We,
  Ws(Xd),
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
], Qa = () => {
};
class Tn extends Ce {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = tf;
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
Uo([
  te()
], Tn.prototype, "_loading");
Uo([
  te()
], Tn.prototype, "_error");
Uo([
  te()
], Tn.prototype, "_empty");
Uo([
  kn(".chart-host")
], Tn.prototype, "_host");
var nf = Object.defineProperty, of = Object.getOwnPropertyDescriptor, ii = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? of(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && nf(t, i, o), o;
};
const js = 260, sf = 3;
let Mt = class extends Tn {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return js;
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
    this._unsubscribe && this._unsubscribe !== Qa && this._unsubscribe(), this._unsubscribe = Qa;
    const e = sf + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const n = await Jd(this.hass, i, Zd, (o) => {
        t === this._fetchGen && (this._renderPlot(o), this._loading = !1);
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
    const i = [...e].sort((o, r) => o.lu - r.lu), n = [];
    for (let o = 0; o < i.length; o++) {
      const r = i[o].lu, a = i[o + 1]?.lu ?? t, u = i[o].s;
      (u === "heating" || u === "cooling") && n.push({ start: r, end: a, action: u });
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), i = In(e[this.roomEntity]), n = In(e[this.lowEntity]), o = In(e[this.highEntity]), r = this._hasApparent ? In(e[this.apparentEntity]) : [], a = this._hasHumidity ? In(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && o.length === 0 && r.length === 0 && a.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const u = [i, n, o];
    this._hasApparent && u.push(r), this._hasHumidity && u.push(a);
    const d = Qd(u, t), f = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: f.width, height: f.height }), this._plot.setData(d), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Ke(f, d, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = this._resolveColor("--cb-action-heating", "#d9603f"), i = this._resolveColor("--cb-action-cooling", "#2f7fcc"), n = this._resolveColor("--primary-color", "#03a9f4"), o = this._resolveColor("--secondary-text-color", "#727272"), r = this._resolveColor("--divider-color", "#e0e0e0"), a = [
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
    this._hasApparent && a.push({
      label: "Apparent",
      stroke: n,
      width: 1.5,
      dash: [4, 3],
      spanGaps: !0,
      show: !this._hiddenLabels.has("Apparent")
    }), this._hasHumidity && a.push({
      label: "Humidity",
      scale: "y2",
      stroke: o,
      width: 1.2,
      spanGaps: !0,
      show: !this._hiddenLabels.has("Humidity")
    });
    const u = [
      {
        stroke: o,
        grid: { stroke: r }
      },
      {
        stroke: o,
        grid: { stroke: r },
        size: 38
      }
    ];
    this._hasHumidity && u.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: o,
      grid: { show: !1 },
      values: (f, g) => g.map((m) => `${m.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: js,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: d,
      axes: u,
      series: a,
      hooks: {
        draw: [
          (f) => {
            const g = f.ctx;
            if (!g) return;
            const m = f.bbox.top, _ = f.bbox.height;
            g.save();
            for (const k of this._intervals) {
              const C = f.valToPos(k.start, "x", !0), O = f.valToPos(k.end, "x", !0);
              O <= C || (g.fillStyle = k.action === "heating" ? Xa(t, 0.18) : Xa(i, 0.18), g.fillRect(C, m, O - C, _));
            }
            g.restore();
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
      ${this._loading ? y`<div class="status">Loading 24 h history…</div>` : N}
      ${this._error ? y`<div class="status">${this._error}</div>` : N}
      ${this._empty ? y`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : N}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? N : this._renderLegend()}
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
    ) : N}
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
    ) : N}
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
      @keydown=${(o) => this._onLabelKeyDown(o, e)}
      >${t}${i ?? e}</span
    >`;
  }
};
Mt.styles = [
  ...Tn.styles,
  Ne`
      .chart-host {
        height: ${Ws(js)}px;
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
  z({ attribute: !1 })
], Mt.prototype, "hass", 2);
ii([
  z({ type: String })
], Mt.prototype, "roomEntity", 2);
ii([
  z({ type: String })
], Mt.prototype, "lowEntity", 2);
ii([
  z({ type: String })
], Mt.prototype, "highEntity", 2);
ii([
  z({ type: String })
], Mt.prototype, "actionEntity", 2);
ii([
  z({ type: String })
], Mt.prototype, "apparentEntity", 2);
ii([
  z({ type: String })
], Mt.prototype, "humidityEntity", 2);
ii([
  te()
], Mt.prototype, "_hiddenLabels", 2);
Mt = ii([
  Ve("comfort-band-history-chart")
], Mt);
function Xa(e, t) {
  const i = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let r = n[1];
    r.length === 3 && (r = r.replace(/(.)/g, "$1$1"));
    const a = parseInt(r.slice(0, 2), 16), u = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16);
    return `rgba(${a}, ${u}, ${d}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : i;
}
var rf = Object.defineProperty, af = Object.getOwnPropertyDescriptor, mr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? af(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && rf(t, i, o), o;
};
let eo = class extends Ce {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return y`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = vl(this.hass, e), n = t ?? "", o = t && i ? i : "";
    return y`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
        .apparentEntity=${n}
        .humidityEntity=${o}
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
    return e ? t ? N : y`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : y`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
eo.styles = [
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
mr([
  z({ attribute: !1 })
], eo.prototype, "hass", 2);
mr([
  z({ attribute: !1 })
], eo.prototype, "entities", 2);
eo = mr([
  Ve("comfort-band-insights-tab")
], eo);
var lf = Object.defineProperty, cf = Object.getOwnPropertyDescriptor, ni = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? cf(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && lf(t, i, o), o;
};
let zt = class extends Ce {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (e, t) => {
      e.preventDefault();
      const i = e.currentTarget;
      i.setPointerCapture(e.pointerId), this._dragging = t;
      const n = (r) => {
        this._setHandle(t, this._xToValue(r.clientX)) && this._fire("input");
      }, o = (r) => {
        i.releasePointerCapture(r.pointerId), i.removeEventListener("pointermove", n), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o), this._dragging = null, this._fire("change");
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
  z({ type: Number })
], zt.prototype, "min", 2);
ni([
  z({ type: Number })
], zt.prototype, "max", 2);
ni([
  z({ type: Number })
], zt.prototype, "step", 2);
ni([
  z({ type: Number })
], zt.prototype, "low", 2);
ni([
  z({ type: Number })
], zt.prototype, "high", 2);
ni([
  z({ type: String })
], zt.prototype, "unit", 2);
ni([
  te()
], zt.prototype, "_dragging", 2);
ni([
  kn(".track")
], zt.prototype, "_track", 2);
zt = ni([
  Ve("dual-handle-slider")
], zt);
var uf = Object.defineProperty, hf = Object.getOwnPropertyDescriptor, Pn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? hf(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && uf(t, i, o), o;
};
const df = 16, ff = 26, Is = 0.5, Es = 3;
let gi = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._heldRange = null, this._chain = Promise.resolve(), this._onInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onChange = (e) => {
      if (this._pendingLow = null, this._pendingHigh = null, !this.hass || !this.zone) return;
      const t = this.hass, i = {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high,
        hours: Es
      };
      this._chain = this._chain.then(() => fl(t, i)).catch(() => {
      });
    };
  }
  render() {
    if (!this.hass || !this.entities) return N;
    const e = Js(this.hass, this.entities), t = el(this.hass, this.entities.manualLow), i = el(this.hass, this.entities.manualHigh), n = pf(e.band.low, e.band.high, t, i), o = this._pendingLow ?? n.low, r = this._pendingHigh ?? n.high, a = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(df, Math.floor(n.low)),
      max: Math.max(ff, Math.ceil(n.high))
    };
    this._heldRange = a;
    const u = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${Es} hours, then the schedule takes over again.` : `Sets this room’s range for ${Es} hours.`;
    return y`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${u}</div>
        <dual-handle-slider
          .min=${a.min}
          .max=${a.max}
          .step=${Is}
          .low=${o}
          .high=${r}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
};
gi.styles = [
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
Pn([
  z({ attribute: !1 })
], gi.prototype, "hass", 2);
Pn([
  z({ type: String })
], gi.prototype, "zone", 2);
Pn([
  z({ attribute: !1 })
], gi.prototype, "entities", 2);
Pn([
  te()
], gi.prototype, "_pendingLow", 2);
Pn([
  te()
], gi.prototype, "_pendingHigh", 2);
gi = Pn([
  Ve("comfort-band-exact-range")
], gi);
function el(e, t) {
  const i = t !== null ? e.states[t] : void 0;
  if (!i) return NaN;
  const n = parseFloat(i.state);
  return Number.isFinite(n) ? n : NaN;
}
function pf(e, t, i, n) {
  let o = 19, r = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, r = t) : Number.isFinite(i) && Number.isFinite(n) && (o = i, r = n), o = Math.round(o * 10) / 10, r = Math.round(r * 10) / 10, r - o < Is && (r = o + Is), { low: o, high: r };
}
var mf = Object.defineProperty, gf = Object.getOwnPropertyDescriptor, no = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gf(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && mf(t, i, o), o;
};
let Bi = class extends Ce {
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
    const e = this._state(this.entities?.enabled ?? null), t = this._state(this.entities?.learningEnabled ?? null);
    return [
      e === "on" ? "Controlling" : e === "off" ? "Paused" : "",
      t === "on" ? "learning on" : t === "off" ? "learning off" : ""
    ].filter(Boolean).join(" · ").replace(/^l/, "L");
  }
  /** "Fan control on", "Peak saving off": a section led by one switch. */
  _switchSummary(e, t) {
    const i = this._state(this.entities?.[e] ?? null);
    return i === "on" ? `${t} on` : i === "off" ? `${t} off` : "";
  }
  _schedulesSummary() {
    if (!this.hass) return "";
    const e = er(this.hass), t = e !== null ? this.hass.states[e] : void 0;
    if (!_l(t))
      return bl(this.hass) ? "Not available right now" : "No profiles set up";
    const i = t.state;
    return !i || i === "unknown" ? "" : `Profile: ${i}`;
  }
  _section(e, t, i, n, o) {
    return y`
      <details
        data-section=${e}
        @toggle=${o ? (r) => o(r.target.open) : N}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${i ? y`<span class="summary">${i}</span>` : N}
          </span>
        </summary>
        <div class="content">${n}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? N : y`
      ${this._section(
      "comfort",
      "Comfort",
      this._comfortSummary(),
      y`<comfort-band-settings-tab
            section="comfort"
            .hass=${this.hass}
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
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "fan",
      "Fan",
      this._switchSummary("fanControlEnabled", "Fan control"),
      y`<comfort-band-settings-tab
          section="fan"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "peak",
      "Peak saving",
      this._switchSummary("peakSavingEnabled", "Peak saving"),
      y`<comfort-band-settings-tab
          section="peak"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "schedules",
      "Schedules",
      this._schedulesSummary(),
      y`<comfort-band-settings-tab
            section="schedules"
            .hass=${this.hass}
            .entities=${this.entities}
          ></comfort-band-settings-tab>
          <comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`
    )}
      ${this._section(
      "history",
      "History",
      "Last 24 hours",
      this._historyOpen ? y`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : N,
      (e) => this._historyOpen = e
    )}
    `;
  }
};
Bi.styles = [
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
no([
  z({ attribute: !1 })
], Bi.prototype, "hass", 2);
no([
  z({ type: String })
], Bi.prototype, "zone", 2);
no([
  z({ attribute: !1 })
], Bi.prototype, "entities", 2);
no([
  te()
], Bi.prototype, "_historyOpen", 2);
Bi = no([
  Ve("comfort-band-advanced-tab")
], Bi);
var bf = Object.defineProperty, _f = Object.getOwnPropertyDescriptor, vi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? _f(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && bf(t, i, o), o;
};
const Di = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "advanced", label: "Advanced" }
];
let Wt = class extends Ce {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Di.findIndex((o) => o.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + Di.length) % Di.length;
          break;
        case "ArrowRight":
          i = (t + 1) % Di.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Di.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = Di[i].id;
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
    if (!this._isOpen) return N;
    const e = this.zoneName || this.zone || "Comfort Band";
    return y`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Di.map(
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
Wt.styles = [
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
vi([
  z({ attribute: !1 })
], Wt.prototype, "hass", 2);
vi([
  z({ type: String })
], Wt.prototype, "zone", 2);
vi([
  z({ type: String })
], Wt.prototype, "zoneName", 2);
vi([
  z({ attribute: !1 })
], Wt.prototype, "entities", 2);
vi([
  te()
], Wt.prototype, "_activeTab", 2);
vi([
  te()
], Wt.prototype, "_isOpen", 2);
vi([
  kn("dialog")
], Wt.prototype, "_dialog", 2);
Wt = vi([
  Ve("comfort-band-modal")
], Wt);
var vf = Object.defineProperty, yf = Object.getOwnPropertyDescriptor, gr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? yf(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && vf(t, i, o), o;
};
let to = class extends Ce {
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
    const e = gl(this.hass, this.config.zone);
    return yl(this.hass, { zone: this.config.zone }, e);
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
to.styles = [
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
gr([
  z({ attribute: !1 })
], to.prototype, "hass", 2);
gr([
  z({ attribute: !1 })
], to.prototype, "config", 2);
to = gr([
  Ve("comfort-band-card-editor")
], to);
var wf = Object.defineProperty, xf = Object.getOwnPropertyDescriptor, Vo = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? xf(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && wf(t, i, o), o;
};
let $n = class extends Ce {
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
    if (!this._config || !this.hass) return y``;
    const e = this._config.zone, t = gl(this.hass, e);
    if (t.deviceId === null)
      return y`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return y`
      <comfort-band-tile
        zoneName=${o.zoneName}
        .temperature=${o.temperature}
        .feelsLike=${o.feelsLike}
        .low=${o.low}
        .high=${o.high}
        .action=${o.action}
        .statusKind=${o.statusKind}
        .statusText=${o.statusText}
        .badges=${o.badges}
        .noExpand=${i}
        .variant=${n}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${i ? null : y`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const i = Js(e, t), n = hl({
      ...i,
      doing: null,
      now: Date.now(),
      formatTime: (o) => Zs(o, e)
    });
    return {
      zoneName: yl(e, this._config, t),
      temperature: i.temperature,
      feelsLike: i.feelsLike,
      low: i.band.low,
      high: i.band.high,
      action: Qs(i) ? i.action : "unknown",
      statusKind: n.kind,
      statusText: n.text,
      badges: gu(i)
    };
  }
};
$n.styles = [
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
Vo([
  z({ attribute: !1 })
], $n.prototype, "hass", 2);
Vo([
  te()
], $n.prototype, "_config", 2);
Vo([
  kn("comfort-band-modal")
], $n.prototype, "_modal", 2);
$n = Vo([
  Ve("comfort-band-card")
], $n);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.16.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
