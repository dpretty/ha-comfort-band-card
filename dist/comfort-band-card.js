const ro = globalThis, wr = ro.ShadowRoot && (ro.ShadyCSS === void 0 || ro.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xr = Symbol(), ys = /* @__PURE__ */ new WeakMap();
let wl = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== xr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (wr && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = ys.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ys.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xl = (t) => new wl(typeof t == "string" ? t : t + "", void 0, xr), ee = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, o, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[s + 1], t[0]);
  return new wl(i, t, xr);
}, qa = (t, e) => {
  if (wr) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), o = ro.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, t.appendChild(n);
  }
}, ws = wr ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return xl(i);
})(t) : t;
const { is: Za, defineProperty: Ja, getOwnPropertyDescriptor: Qa, getOwnPropertyNames: Xa, getOwnPropertySymbols: tc, getPrototypeOf: ec } = Object, mo = globalThis, xs = mo.trustedTypes, ic = xs ? xs.emptyScript : "", nc = mo.reactiveElementPolyfillSupport, zn = (t, e) => t, lo = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ic : null;
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
} }, $r = (t, e) => !Za(t, e), $s = { attribute: !0, type: String, converter: lo, reflect: !1, useDefault: !1, hasChanged: $r };
Symbol.metadata ??= Symbol("metadata"), mo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let on = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = $s) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(e, n, i);
      o !== void 0 && Ja(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: o, set: s } = Qa(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? $s;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zn("elementProperties"))) return;
    const e = ec(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zn("properties"))) {
      const i = this.properties, n = [...Xa(i), ...tc(i)];
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
      for (const o of n) i.unshift(ws(o));
    } else e !== void 0 && i.push(ws(e));
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
    return qa(e, this.constructor.elementStyles), e;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : lo).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, o = n._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : lo;
      this._$Em = o;
      const h = l.fromAttribute(i, s.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, o = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (o === !1 && (s = this[e]), n ??= l.getPropertyOptions(e), !((n.hasChanged ?? $r)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, n)))) return;
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
on.elementStyles = [], on.shadowRootOptions = { mode: "open" }, on[zn("elementProperties")] = /* @__PURE__ */ new Map(), on[zn("finalized")] = /* @__PURE__ */ new Map(), nc?.({ ReactiveElement: on }), (mo.reactiveElementVersions ??= []).push("2.1.2");
const Sr = globalThis, Ss = (t) => t, ao = Sr.trustedTypes, As = ao ? ao.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, $l = "$lit$", ci = `lit$${Math.random().toFixed(9).slice(2)}$`, Sl = "?" + ci, oc = `<${Sl}>`, Di = document, Hn = () => Di.createComment(""), Ln = (t) => t === null || typeof t != "object" && typeof t != "function", Ar = Array.isArray, rc = (t) => Ar(t) || typeof t?.[Symbol.iterator] == "function", Jo = `[ 	
\f\r]`, En = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ks = /-->/g, Es = />/g, ki = RegExp(`>|${Jo}(?:([^\\s"'>=/]+)(${Jo}*=${Jo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ps = /'/g, Ts = /"/g, Al = /^(?:script|style|textarea|title)$/i, kl = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), F = kl(1), ui = kl(2), ln = Symbol.for("lit-noChange"), at = Symbol.for("lit-nothing"), Cs = /* @__PURE__ */ new WeakMap(), Ci = Di.createTreeWalker(Di, 129);
function El(t, e) {
  if (!Ar(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return As !== void 0 ? As.createHTML(e) : e;
}
const sc = (t, e) => {
  const i = t.length - 1, n = [];
  let o, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = En;
  for (let h = 0; h < i; h++) {
    const f = t[h];
    let p, b, g = -1, _ = 0;
    for (; _ < f.length && (l.lastIndex = _, b = l.exec(f), b !== null); ) _ = l.lastIndex, l === En ? b[1] === "!--" ? l = ks : b[1] !== void 0 ? l = Es : b[2] !== void 0 ? (Al.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = ki) : b[3] !== void 0 && (l = ki) : l === ki ? b[0] === ">" ? (l = o ?? En, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? ki : b[3] === '"' ? Ts : Ps) : l === Ts || l === Ps ? l = ki : l === ks || l === Es ? l = En : (l = ki, o = void 0);
    const k = l === ki && t[h + 1].startsWith("/>") ? " " : "";
    s += l === En ? f + oc : g >= 0 ? (n.push(p), f.slice(0, g) + $l + f.slice(g) + ci + k) : f + ci + (g === -2 ? h : k);
  }
  return [El(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Rn {
  constructor({ strings: e, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = e.length - 1, f = this.parts, [p, b] = sc(e, i);
    if (this.el = Rn.createElement(p, n), Ci.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = Ci.nextNode()) !== null && f.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith($l)) {
          const _ = b[l++], k = o.getAttribute(g).split(ci), P = /([.?@])?(.*)/.exec(_);
          f.push({ type: 1, index: s, name: P[2], strings: k, ctor: P[1] === "." ? ac : P[1] === "?" ? cc : P[1] === "@" ? uc : _o }), o.removeAttribute(g);
        } else g.startsWith(ci) && (f.push({ type: 6, index: s }), o.removeAttribute(g));
        if (Al.test(o.tagName)) {
          const g = o.textContent.split(ci), _ = g.length - 1;
          if (_ > 0) {
            o.textContent = ao ? ao.emptyScript : "";
            for (let k = 0; k < _; k++) o.append(g[k], Hn()), Ci.nextNode(), f.push({ type: 2, index: ++s });
            o.append(g[_], Hn());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Sl) f.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = o.data.indexOf(ci, g + 1)) !== -1; ) f.push({ type: 7, index: s }), g += ci.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const n = Di.createElement("template");
    return n.innerHTML = e, n;
  }
}
function an(t, e, i = t, n) {
  if (e === ln) return e;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Ln(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(t), o._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (e = an(t, o._$AS(t, e.values), o, n)), e;
}
class lc {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (e?.creationScope ?? Di).importNode(i, !0);
    Ci.currentNode = o;
    let s = Ci.nextNode(), l = 0, h = 0, f = n[0];
    for (; f !== void 0; ) {
      if (l === f.index) {
        let p;
        f.type === 2 ? p = new Vn(s, s.nextSibling, this, e) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, e) : f.type === 6 && (p = new hc(s, this, e)), this._$AV.push(p), f = n[++h];
      }
      l !== f?.index && (s = Ci.nextNode(), l++);
    }
    return Ci.currentNode = Di, o;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Vn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, o) {
    this.type = 2, this._$AH = at, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    e = an(this, e, i), Ln(e) ? e === at || e == null || e === "" ? (this._$AH !== at && this._$AR(), this._$AH = at) : e !== this._$AH && e !== ln && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rc(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== at && Ln(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Di.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Rn.createElement(El(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new lc(o, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Cs.get(e.strings);
    return i === void 0 && Cs.set(e.strings, i = new Rn(e)), i;
  }
  k(e) {
    Ar(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of e) o === i.length ? i.push(n = new Vn(this.O(Hn()), this.O(Hn()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = Ss(e).nextSibling;
      Ss(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class _o {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, o, s) {
    this.type = 1, this._$AH = at, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = at;
  }
  _$AI(e, i = this, n, o) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = an(this, e, i, 0), l = !Ln(e) || e !== this._$AH && e !== ln, l && (this._$AH = e);
    else {
      const h = e;
      let f, p;
      for (e = s[0], f = 0; f < s.length - 1; f++) p = an(this, h[n + f], i, f), p === ln && (p = this._$AH[f]), l ||= !Ln(p) || p !== this._$AH[f], p === at ? e = at : e !== at && (e += (p ?? "") + s[f + 1]), this._$AH[f] = p;
    }
    l && !o && this.j(e);
  }
  j(e) {
    e === at ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ac extends _o {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === at ? void 0 : e;
  }
}
class cc extends _o {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== at);
  }
}
class uc extends _o {
  constructor(e, i, n, o, s) {
    super(e, i, n, o, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = an(this, e, i, 0) ?? at) === ln) return;
    const n = this._$AH, o = e === at && n !== at || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== at && (n === at || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class hc {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    an(this, e);
  }
}
const fc = Sr.litHtmlPolyfillSupport;
fc?.(Rn, Vn), (Sr.litHtmlVersions ??= []).push("3.3.2");
const dc = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Vn(e.insertBefore(Hn(), s), s, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
const kr = globalThis;
class Vt extends on {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = dc(i, this.renderRoot, this.renderOptions);
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
Vt._$litElement$ = !0, Vt.finalized = !0, kr.litElementHydrateSupport?.({ LitElement: Vt });
const pc = kr.litElementPolyfillSupport;
pc?.({ LitElement: Vt });
(kr.litElementVersions ??= []).push("4.2.2");
const ce = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const gc = { attribute: !0, type: String, converter: lo, reflect: !1, hasChanged: $r }, mc = (t = gc, e, i) => {
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
function Y(t) {
  return (e, i) => typeof i == "object" ? mc(t, e, i) : ((n, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(t, e, i);
}
function mt(t) {
  return Y({ ...t, state: !0, attribute: !1 });
}
const _c = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
function Bn(t, e) {
  return (i, n, o) => {
    const s = (l) => l.renderRoot?.querySelector(t) ?? null;
    return _c(i, n, { get() {
      return s(this);
    } });
  };
}
const ue = ee`
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
function co(t) {
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
function uo(t) {
  return t === "heating" || t === "cooling" || t === "idle" ? t : "unknown";
}
function cr(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var bc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, jn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? vc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && bc(e, i, o), o;
};
const ur = 15, Pl = 28, yc = Pl - ur;
function Qo(t) {
  return Number.isNaN(t) || !Number.isFinite(t) ? 0 : (Math.max(ur, Math.min(Pl, t)) - ur) / yc * 100;
}
let zi = class extends Vt {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const t = uo(this.action), e = co(t), i = Number.isFinite(this.low), n = Number.isFinite(this.high), o = Number.isFinite(this.room), s = i ? Qo(this.low) : 0, l = n ? Qo(this.high) : 100, h = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = o ? Qo(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${t}`;
    return F`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${ui`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? ui`<rect class="band" x=${h} y="9" width=${f} height="6" rx="3" fill=${e}></rect>` : null}
        ${o ? ui`<circle cx=${p} cy="12" r="4.5" fill=${e}></circle>` : null}
        ${o ? ui`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${e}></circle>` : null}
      </svg>
    `;
  }
};
zi.styles = [
  ue,
  ee`
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
  ce("band-gauge")
], zi);
var wc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, We = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? xc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && wc(e, i, o), o;
};
let ye = class extends Vt {
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
    const t = $c(this.overrideEnds);
    return F`<div class="override-pill">Override${t ? ` · ${t}` : ""}</div>`;
  }
  _renderActionChip() {
    const t = uo(this.action);
    if (t === "idle" || t === "unknown") return null;
    const e = co(t);
    return F`<span class="action-chip" style="background:${e}">
      ${cr(t)}
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
    const t = uo(this.action), e = t === "heating" || t === "cooling", i = e ? `--cb-mini-bg:${co(t)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${e ? `, ${cr(t)}` : ""}`;
    return F`
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
  ue,
  ee`
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
], ye.prototype, "zoneName", 2);
We([
  Y({ type: Number })
], ye.prototype, "roomTemp", 2);
We([
  Y({ type: Number })
], ye.prototype, "low", 2);
We([
  Y({ type: Number })
], ye.prototype, "high", 2);
We([
  Y({ type: String })
], ye.prototype, "action", 2);
We([
  Y({ type: Boolean })
], ye.prototype, "overrideActive", 2);
We([
  Y({ type: String })
], ye.prototype, "overrideEnds", 2);
We([
  Y({ type: Boolean })
], ye.prototype, "noExpand", 2);
We([
  Y({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
ye = We([
  ce("comfort-band-tile")
], ye);
function $c(t) {
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
var Sc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, ei = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ac(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Sc(e, i, o), o;
};
let De = class extends Vt {
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
  ue,
  ee`
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
  mt()
], De.prototype, "_dragging", 2);
ei([
  Bn(".track")
], De.prototype, "_track", 2);
De = ei([
  ce("dual-handle-slider")
], De);
const bo = "comfort_band";
function kc(t, e, i) {
  return t.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...e }
  );
}
function Ec(t, e) {
  return t.callService(bo, "set_schedule", { ...e });
}
function Pc(t, e) {
  const i = { zone: e.zone };
  return e.low !== void 0 && (i.low = e.low), e.high !== void 0 && (i.high = e.high), e.hours !== void 0 && (i.hours = e.hours), t.callService(bo, "start_override", i);
}
function Tc(t, e) {
  return t.callService(bo, "cancel_override", { ...e });
}
function Cc(t, e) {
  return t.callService(bo, "set_profile", { ...e });
}
var Mc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, pn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Dc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Mc(e, i, o), o;
};
const zc = [1, 3, 6];
let hi = class extends Vt {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (t) => {
      this._pendingLow = t.detail.low, this._pendingHigh = t.detail.high;
    }, this._onSliderChange = (t) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Pc(this.hass, {
        zone: this.zone,
        low: t.detail.low,
        high: t.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Tc(this.hass, { zone: this.zone });
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
    if (!this.hass || !this.entities) return at;
    const t = this._numericState(this.entities.manualLow), e = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), o = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), l = this._stateOf(this.entities.currentAction)?.state ?? "unknown", h = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._pendingLow ?? (Number.isFinite(t) ? t : 19), p = this._pendingHigh ?? (Number.isFinite(e) ? e : 22), b = uo(l), g = b !== "idle" && b !== "unknown";
    return F`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${g ? F`<span class="action-chip" style="background:${co(b)}"
              >${cr(b)}</span
            >` : at}
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
    if (!t) return at;
    const e = this._stateOf(this.entities.overrideEnds)?.state, i = Oc(e ?? null);
    return F`
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
    return this.entities?.overrideHours ? F`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${zc.map(
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
hi.styles = [
  ue,
  ee`
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
  mt()
], hi.prototype, "_pendingLow", 2);
pn([
  mt()
], hi.prototype, "_pendingHigh", 2);
hi = pn([
  ce("comfort-band-now-tab")
], hi);
function Oc(t) {
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
const Er = "comfort_band", Nc = {
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
function Hc() {
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
function Tl(t, e) {
  for (const i of Object.values(t.devices))
    for (const [n, o] of i.identifiers)
      if (n === e[0] && o === e[1])
        return i;
  return null;
}
function Cl(t, e) {
  return Object.values(t.entities).filter(
    (i) => i.device_id === e && i.platform === Er
  );
}
function Lc(t, e) {
  const i = Hc(), n = Tl(t, [Er, `zone:${e}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const o of Cl(t, n.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Nc[s];
    l !== void 0 && (i[l] = o.entity_id);
  }
  return i;
}
function Ml(t) {
  const e = Tl(t, [Er, "profile_manager"]);
  if (e === null) return null;
  for (const i of Cl(t, e.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
var Rc = Object.defineProperty, Fc = Object.getOwnPropertyDescriptor, Dl = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Fc(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Rc(e, i, o), o;
};
let ho = class extends Vt {
  _onSelect(t) {
    this.hass && Cc(this.hass, { profile: t });
  }
  render() {
    if (!this.hass) return at;
    const t = Ml(this.hass);
    if (t === null)
      return F`<div class="empty">Profile manager not registered yet.</div>`;
    const e = this.hass.states[t], i = e?.attributes.options, n = Array.isArray(i) ? i.filter((s) => typeof s == "string") : [], o = e?.state ?? "";
    return n.length === 0 ? F`<div class="empty">No profiles configured.</div>` : F`
      <ul role="listbox" aria-label="Profiles">
        ${n.map(
      (s) => F`
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
              ${s === o ? F`<span class="badge">Active</span>` : at}
            </li>
          `
    )}
      </ul>
      <div class="footer">Create / rename / delete profiles in a future release.</div>
    `;
  }
};
ho.styles = [
  ue,
  ee`
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
Dl([
  Y({ attribute: !1 })
], ho.prototype, "hass", 2);
ho = Dl([
  ce("comfort-band-profiles-tab")
], ho);
const Uc = !0, zt = "u-", Ic = "uplot", Vc = zt + "hz", Bc = zt + "vt", jc = zt + "title", Wc = zt + "wrap", Yc = zt + "under", Gc = zt + "over", Kc = zt + "axis", Ti = zt + "off", qc = zt + "select", Zc = zt + "cursor-x", Jc = zt + "cursor-y", Qc = zt + "cursor-pt", Xc = zt + "legend", tu = zt + "live", eu = zt + "inline", iu = zt + "series", nu = zt + "marker", Ms = zt + "label", ou = zt + "value", Cn = "width", Mn = "height", Pn = "top", Ds = "bottom", en = "left", Xo = "right", Pr = "#000", zs = Pr + "0", tr = "mousemove", Os = "mousedown", er = "mouseup", Ns = "mouseenter", Hs = "mouseleave", Ls = "dblclick", ru = "resize", su = "scroll", Rs = "change", fo = "dppxchange", Tr = "--", gn = typeof window < "u", hr = gn ? document : null, sn = gn ? window : null, lu = gn ? navigator : null;
let lt, eo;
function fr() {
  let t = devicePixelRatio;
  lt != t && (lt = t, eo && pr(Rs, eo, fr), eo = matchMedia(`(min-resolution: ${lt - 1e-3}dppx) and (max-resolution: ${lt + 1e-3}dppx)`), Mi(Rs, eo, fr), sn.dispatchEvent(new CustomEvent(fo)));
}
function le(t, e) {
  if (e != null) {
    let i = t.classList;
    !i.contains(e) && i.add(e);
  }
}
function dr(t, e) {
  let i = t.classList;
  i.contains(e) && i.remove(e);
}
function yt(t, e, i) {
  t.style[e] = i + "px";
}
function Te(t, e, i, n) {
  let o = hr.createElement(t);
  return e != null && le(o, e), i?.insertBefore(o, n), o;
}
function be(t, e) {
  return Te("div", t, e);
}
const Fs = /* @__PURE__ */ new WeakMap();
function Ue(t, e, i, n, o) {
  let s = "translate(" + e + "px," + i + "px)", l = Fs.get(t);
  s != l && (t.style.transform = s, Fs.set(t, s), e < 0 || i < 0 || e > n || i > o ? le(t, Ti) : dr(t, Ti));
}
const Us = /* @__PURE__ */ new WeakMap();
function Is(t, e, i) {
  let n = e + i, o = Us.get(t);
  n != o && (Us.set(t, n), t.style.background = e, t.style.borderColor = i);
}
const Vs = /* @__PURE__ */ new WeakMap();
function Bs(t, e, i, n) {
  let o = e + "" + i, s = Vs.get(t);
  o != s && (Vs.set(t, o), t.style.height = i + "px", t.style.width = e + "px", t.style.marginLeft = n ? -e / 2 + "px" : 0, t.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Cr = { passive: !0 }, au = { ...Cr, capture: !0 };
function Mi(t, e, i, n) {
  e.addEventListener(t, i, n ? au : Cr);
}
function pr(t, e, i, n) {
  e.removeEventListener(t, i, Cr);
}
gn && fr();
function Ce(t, e, i, n) {
  let o;
  i = i || 0, n = n || e.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    o = s ? i + n >> 1 : ae((i + n) / 2), e[o] < t ? i = o : n = o;
  return t - e[i] <= e[n] - t ? i : n;
}
function zl(t) {
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
const Ol = (t) => t != null, Nl = (t) => t != null && t > 0, vo = zl(Ol), cu = zl(Nl);
function uu(t, e, i, n = 0, o = !1) {
  let s = o ? cu : vo, l = o ? Nl : Ol;
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
  return [h ?? dt, f ?? -dt];
}
function yo(t, e, i, n) {
  let o = Ys(t), s = Ys(e);
  t == e && (o == -1 ? (t *= i, e /= i) : (t /= i, e *= i));
  let l = i == 10 ? Xe : Hl, h = o == 1 ? ae : ve, f = s == 1 ? ve : ae, p = h(l(Dt(t))), b = f(l(Dt(e))), g = cn(i, p), _ = cn(i, b);
  return i == 10 && (p < 0 && (g = pt(g, -p)), b < 0 && (_ = pt(_, -b))), n || i == 2 ? (t = g * o, e = _ * s) : (t = Ul(t, g), e = wo(e, _)), [t, e];
}
function Mr(t, e, i, n) {
  let o = yo(t, e, i, n);
  return t == 0 && (o[0] = 0), e == 0 && (o[1] = 0), o;
}
const Dr = 0.1, js = {
  mode: 3,
  pad: Dr
}, On = {
  pad: 0,
  soft: null,
  mode: 0
}, hu = {
  min: On,
  max: On
};
function po(t, e, i, n) {
  return xo(i) ? Ws(t, e, i) : (On.pad = i, On.soft = n ? 0 : null, On.mode = n ? 3 : 0, Ws(t, e, hu));
}
function rt(t, e) {
  return t ?? e;
}
function fu(t, e, i) {
  for (e = rt(e, 0), i = rt(i, t.length - 1); e <= i; ) {
    if (t[e] != null)
      return !0;
    e++;
  }
  return !1;
}
function Ws(t, e, i) {
  let n = i.min, o = i.max, s = rt(n.pad, 0), l = rt(o.pad, 0), h = rt(n.hard, -dt), f = rt(o.hard, dt), p = rt(n.soft, dt), b = rt(o.soft, -dt), g = rt(n.mode, 0), _ = rt(o.mode, 0), k = e - t, P = Xe(k), L = Zt(Dt(t), Dt(e)), U = Xe(L), V = Dt(U - P);
  (k < 1e-24 || V > 10) && (k = 0, (t == 0 || e == 0) && (k = 1e-24, g == 2 && p != dt && (s = 0), _ == 2 && b != -dt && (l = 0)));
  let x = k || L || 1e3, R = Xe(x), $ = cn(10, ae(R)), Z = x * (k == 0 ? t == 0 ? 0.1 : 1 : s), M = pt(Ul(t - Z, $ / 10), 24), J = t >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : dt, G = Zt(h, M < J && t >= J ? J : Me(J, M)), tt = x * (k == 0 ? e == 0 ? 0.1 : 1 : l), W = pt(wo(e + tt, $ / 10), 24), S = e <= b && (_ == 1 || _ == 3 && W >= b || _ == 2 && W <= b) ? b : -dt, q = Me(f, W > S && e <= S ? S : Zt(S, W));
  return G == q && G == 0 && (q = 100), [G, q];
}
const du = new Intl.NumberFormat(gn ? lu.language : "en-US"), zr = (t) => du.format(t), he = Math, so = he.PI, Dt = he.abs, ae = he.floor, Mt = he.round, ve = he.ceil, Me = he.min, Zt = he.max, cn = he.pow, Ys = he.sign, Xe = he.log10, Hl = he.log2, pu = (t, e = 1) => he.sinh(t) * e, ir = (t, e = 1) => he.asinh(t / e), dt = 1 / 0;
function Gs(t) {
  return (Xe((t ^ t >> 31) - (t >> 31)) | 0) + 1;
}
function gr(t, e, i) {
  return Me(Zt(t, e), i);
}
function Ll(t) {
  return typeof t == "function";
}
function et(t) {
  return Ll(t) ? t : () => t;
}
const gu = () => {
}, Rl = (t) => t, Fl = (t, e) => e, mu = (t) => null, Ks = (t) => !0, qs = (t, e) => t == e, _u = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (t) => {
  if (Vl(t) || fi.has(t))
    return t;
  const e = `${t}`, i = e.match(_u);
  if (i == null)
    return t;
  let n = i[0].length - 1;
  if (e.indexOf("e-") != -1) {
    let [o, s] = e.split("e");
    return +`${Oi(o)}e${s}`;
  }
  return pt(t, n);
};
function Ei(t, e) {
  return Oi(pt(Oi(t / e)) * e);
}
function wo(t, e) {
  return Oi(ve(Oi(t / e)) * e);
}
function Ul(t, e) {
  return Oi(ae(Oi(t / e)) * e);
}
function pt(t, e = 0) {
  if (Vl(t))
    return t;
  let i = 10 ** e, n = t * i * (1 + Number.EPSILON);
  return Mt(n) / i;
}
const fi = /* @__PURE__ */ new Map();
function Il(t) {
  return (("" + t).split(".")[1] || "").length;
}
function Fn(t, e, i, n) {
  let o = [], s = n.map(Il);
  for (let l = e; l < i; l++) {
    let h = Dt(l), f = pt(cn(t, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = t == 10 ? +`${n[p]}e${l}` : n[p] * f, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = t == 10 ? b : pt(b, g);
      o.push(_), fi.set(_, g);
    }
  }
  return o;
}
const Nn = {}, Or = [], un = [null, null], ai = Array.isArray, Vl = Number.isInteger, bu = (t) => t === void 0;
function Zs(t) {
  return typeof t == "string";
}
function xo(t) {
  let e = !1;
  if (t != null) {
    let i = t.constructor;
    e = i == null || i == Object;
  }
  return e;
}
function vu(t) {
  return t != null && typeof t == "object";
}
const yu = Object.getPrototypeOf(Uint8Array), Bl = "__proto__";
function hn(t, e = xo) {
  let i;
  if (ai(t)) {
    let n = t.find((o) => o != null);
    if (ai(n) || e(n)) {
      i = Array(t.length);
      for (let o = 0; o < t.length; o++)
        i[o] = hn(t[o], e);
    } else
      i = t.slice();
  } else if (t instanceof yu)
    i = t.slice();
  else if (e(t)) {
    i = {};
    for (let n in t)
      n != Bl && (i[n] = hn(t[n], e));
  } else
    i = t;
  return i;
}
function Pt(t) {
  let e = arguments;
  for (let i = 1; i < e.length; i++) {
    let n = e[i];
    for (let o in n)
      o != Bl && (xo(t[o]) ? Pt(t[o], hn(n[o])) : t[o] = hn(n[o]));
  }
  return t;
}
const wu = 0, xu = 1, $u = 2;
function Su(t, e, i) {
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
function Au(t, e) {
  if (Pu(t)) {
    let l = t[0].slice();
    for (let h = 1; h < t.length; h++)
      l.push(...t[h].slice(1));
    return Tu(l[0]) || (l = Eu(l)), l;
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
      let b = h[p], g = Array(o).fill(void 0), _ = e ? e[l][p] : xu, k = [];
      for (let P = 0; P < b.length; P++) {
        let L = b[P], U = s.get(f[P]);
        L === null ? _ != wu && (g[U] = L, _ == $u && k.push(U)) : g[U] = L;
      }
      Su(g, k, o), n.push(g);
    }
  }
  return n;
}
const ku = typeof queueMicrotask > "u" ? (t) => Promise.resolve().then(t) : queueMicrotask;
function Eu(t) {
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
function Pu(t) {
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
function Tu(t, e = 100) {
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
  const s = Zt(1, ae((o - n + 1) / e));
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
const jl = [
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
], Wl = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Yl(t) {
  return t.slice(0, 3);
}
const Cu = Wl.map(Yl), Mu = jl.map(Yl), Du = {
  MMMM: jl,
  MMM: Mu,
  WWWW: Wl,
  WWW: Cu
};
function Tn(t) {
  return (t < 10 ? "0" : "") + t;
}
function zu(t) {
  return (t < 10 ? "00" : t < 100 ? "0" : "") + t;
}
const Ou = {
  // 2019
  YYYY: (t) => t.getFullYear(),
  // 19
  YY: (t) => (t.getFullYear() + "").slice(2),
  // July
  MMMM: (t, e) => e.MMMM[t.getMonth()],
  // Jul
  MMM: (t, e) => e.MMM[t.getMonth()],
  // 07
  MM: (t) => Tn(t.getMonth() + 1),
  // 7
  M: (t) => t.getMonth() + 1,
  // 09
  DD: (t) => Tn(t.getDate()),
  // 9
  D: (t) => t.getDate(),
  // Monday
  WWWW: (t, e) => e.WWWW[t.getDay()],
  // Mon
  WWW: (t, e) => e.WWW[t.getDay()],
  // 03
  HH: (t) => Tn(t.getHours()),
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
  mm: (t) => Tn(t.getMinutes()),
  // 9
  m: (t) => t.getMinutes(),
  // 09
  ss: (t) => Tn(t.getSeconds()),
  // 9
  s: (t) => t.getSeconds(),
  // 374
  fff: (t) => zu(t.getMilliseconds())
};
function Nr(t, e) {
  e = e || Du;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = n.exec(t); )
    i.push(o[0][0] == "{" ? Ou[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, e);
    return l;
  };
}
const Nu = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Hu(t, e) {
  let i;
  return e == "UTC" || e == "Etc/UTC" ? i = new Date(+t + t.getTimezoneOffset() * 6e4) : e == Nu ? i = t : (i = new Date(t.toLocaleString("en-US", { timeZone: e })), i.setMilliseconds(t.getMilliseconds())), i;
}
const Gl = (t) => t % 1 == 0, go = [1, 2, 2.5, 5], Lu = Fn(10, -32, 0, go), Kl = Fn(10, 0, 32, go), Ru = Kl.filter(Gl), Pi = Lu.concat(Kl), Hr = `
`, ql = "{YYYY}", Js = Hr + ql, Zl = "{M}/{D}", Dn = Hr + Zl, io = Dn + "/{YY}", Jl = "{aa}", Fu = "{h}:{mm}", rn = Fu + Jl, Qs = Hr + rn, Xs = ":{ss}", ut = null;
function Ql(t) {
  let e = t * 1e3, i = e * 60, n = i * 60, o = n * 24, s = o * 30, l = o * 365, f = (t == 1 ? Fn(10, 0, 3, go).filter(Gl) : Fn(10, -3, 0, go)).concat([
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
    [l, ql, ut, ut, ut, ut, ut, ut, 1],
    [o * 28, "{MMM}", Js, ut, ut, ut, ut, ut, 1],
    [o, Zl, Js, ut, ut, ut, ut, ut, 1],
    [n, "{h}" + Jl, io, ut, Dn, ut, ut, ut, 1],
    [i, rn, io, ut, Dn, ut, ut, ut, 1],
    [e, Xs, io + " " + rn, ut, Dn + " " + rn, ut, Qs, ut, 1],
    [t, Xs + ".{fff}", io + " " + rn, ut, Dn + " " + rn, ut, Qs, ut, 1]
  ];
  function b(g) {
    return (_, k, P, L, U, V) => {
      let x = [], R = U >= l, $ = U >= s && U < l, Z = g(P), M = pt(Z * t, 3), J = nr(Z.getFullYear(), R ? 0 : Z.getMonth(), $ || R ? 1 : Z.getDate()), G = pt(J * t, 3);
      if ($ || R) {
        let tt = $ ? U / s : 0, W = R ? U / l : 0, S = M == G ? M : pt(nr(J.getFullYear() + W, J.getMonth() + tt, 1) * t, 3), q = new Date(Mt(S / t)), D = q.getFullYear(), B = q.getMonth();
        for (let H = 0; S <= L; H++) {
          let it = nr(D + W * H, B + tt * H, 1), N = it - g(pt(it * t, 3));
          S = pt((+it + N) * t, 3), S <= L && x.push(S);
        }
      } else {
        let tt = U >= o ? o : U, W = ae(P) - ae(M), S = G + W + wo(M - G, tt);
        x.push(S);
        let q = g(S), D = q.getHours() + q.getMinutes() / i + q.getSeconds() / n, B = U / n, H = _.axes[k]._space, it = V / H;
        for (; S = pt(S + U, t == 1 ? 0 : 3), !(S > L); )
          if (B > 1) {
            let N = ae(pt(D + B, 6)) % 24, nt = g(S).getHours() - N;
            nt > 1 && (nt = -1), S -= nt * n, D = (D + B) % 24;
            let ht = x[x.length - 1];
            pt((S - ht) / U, 3) * it >= 0.7 && x.push(S);
          } else
            x.push(S);
      }
      return x;
    };
  }
  return [
    f,
    p,
    b
  ];
}
const [Uu, Iu, Vu] = Ql(1), [Bu, ju, Wu] = Ql(1e-3);
Fn(2, -53, 53, [1]);
function tl(t, e) {
  return t.map((i) => i.map(
    (n, o) => o == 0 || o == 8 || n == null ? n : e(o == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function el(t, e) {
  return (i, n, o, s, l) => {
    let h = e.find((P) => l >= P[0]) || e[e.length - 1], f, p, b, g, _, k;
    return n.map((P) => {
      let L = t(P), U = L.getFullYear(), V = L.getMonth(), x = L.getDate(), R = L.getHours(), $ = L.getMinutes(), Z = L.getSeconds(), M = U != f && h[2] || V != p && h[3] || x != b && h[4] || R != g && h[5] || $ != _ && h[6] || Z != k && h[7] || h[1];
      return f = U, p = V, b = x, g = R, _ = $, k = Z, M(L);
    });
  };
}
function Yu(t, e) {
  let i = Nr(e);
  return (n, o, s, l, h) => o.map((f) => i(t(f)));
}
function nr(t, e, i) {
  return new Date(t, e, i);
}
function il(t, e) {
  return e(t);
}
const Gu = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function nl(t, e) {
  return (i, n, o, s) => s == null ? Tr : e(t(n));
}
function Ku(t, e) {
  let i = t.series[e];
  return i.width ? i.stroke(t, e) : i.points.width ? i.points.stroke(t, e) : null;
}
function qu(t, e) {
  return t.series[e].fill(t, e);
}
const Zu = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: gu,
  markers: {
    show: !0,
    width: 2,
    stroke: Ku,
    fill: qu,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Ju(t, e) {
  let i = t.cursor.points, n = be(), o = i.size(t, e);
  yt(n, Cn, o), yt(n, Mn, o);
  let s = o / -2;
  yt(n, "marginLeft", s), yt(n, "marginTop", s);
  let l = i.width(t, e, o);
  return l && yt(n, "borderWidth", l), n;
}
function Qu(t, e) {
  let i = t.series[e].points;
  return i._fill || i._stroke;
}
function Xu(t, e) {
  let i = t.series[e].points;
  return i._stroke || i._fill;
}
function th(t, e) {
  return t.series[e].points.size;
}
const or = [0, 0];
function eh(t, e, i) {
  return or[0] = e, or[1] = i, or;
}
function no(t, e, i, n = !0) {
  return (o) => {
    o.button == 0 && (!n || o.target == e) && i(o);
  };
}
function rr(t, e, i, n = !0) {
  return (o) => {
    (!n || o.target == e) && i(o);
  };
}
const ih = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: eh,
  points: {
    one: !1,
    show: Ju,
    size: th,
    width: 0,
    stroke: Xu,
    fill: Qu
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
}, Xl = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Lr = Pt({}, Xl, {
  filter: Fl
}), ta = Pt({}, Lr, {
  size: 10
}), ea = Pt({}, Xl, {
  show: !1
}), Rr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', ia = "bold " + Rr, na = 1.5, ol = {
  show: !0,
  scale: "x",
  stroke: Pr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ia,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Lr,
  ticks: ta,
  border: ea,
  font: Rr,
  lineGap: na,
  rotate: 0
}, nh = "Value", oh = "Time", rl = {
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
function rh(t, e, i, n, o) {
  return e.map((s) => s == null ? "" : zr(s));
}
function sh(t, e, i, n, o, s, l) {
  let h = [], f = fi.get(o) || 0;
  i = l ? i : pt(wo(i, o), f);
  for (let p = i; p <= n; p = pt(p + o, f))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function mr(t, e, i, n, o, s, l) {
  const h = [], f = t.scales[t.axes[e].scale].log, p = f == 10 ? Xe : Hl, b = ae(p(i));
  o = cn(f, b), f == 10 && (o = Pi[Ce(o, Pi)]);
  let g = i, _ = o * f;
  f == 10 && (_ = Pi[Ce(_, Pi)]);
  do
    h.push(g), g = g + o, f == 10 && !fi.has(g) && (g = pt(g, fi.get(o))), g >= _ && (o = g, _ = o * f, f == 10 && (_ = Pi[Ce(_, Pi)]));
  while (g <= n);
  return h;
}
function lh(t, e, i, n, o, s, l) {
  let f = t.scales[t.axes[e].scale].asinh, p = n > f ? mr(t, e, Zt(f, i), n, o) : [f], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -f ? mr(t, e, Zt(f, -n), -i, o) : [f]).reverse().map((_) => -_).concat(b, p);
}
const oa = /./, ah = /[12357]/, ch = /[125]/, sl = /1/, _r = (t, e, i, n) => t.map((o, s) => e == 4 && o == 0 || s % n == 0 && i.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function uh(t, e, i, n, o) {
  let s = t.axes[i], l = s.scale, h = t.scales[l], f = t.valToPos, p = s._space, b = f(10, l), g = f(9, l) - b >= p ? oa : f(7, l) - b >= p ? ah : f(5, l) - b >= p ? ch : sl;
  if (g == sl) {
    let _ = Dt(f(1, l) - b);
    if (_ < p)
      return _r(e.slice().reverse(), h.distr, g, ve(p / _)).reverse();
  }
  return _r(e, h.distr, g, 1);
}
function hh(t, e, i, n, o) {
  let s = t.axes[i], l = s.scale, h = s._space, f = t.valToPos, p = Dt(f(1, l) - f(2, l));
  return p < h ? _r(e.slice().reverse(), 3, oa, ve(h / p)).reverse() : e;
}
function fh(t, e, i, n) {
  return n == null ? Tr : e == null ? "" : zr(e);
}
const ll = {
  show: !0,
  scale: "y",
  stroke: Pr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ia,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Lr,
  ticks: ta,
  border: ea,
  font: Rr,
  lineGap: na,
  rotate: 0
};
function dh(t, e) {
  let i = 3 + (t || 1) * 2;
  return pt(i * e, 3);
}
function ph(t, e) {
  let { scale: i, idxs: n } = t.series[0], o = t._data[0], s = t.valToPos(o[n[0]], i, !0), l = t.valToPos(o[n[1]], i, !0), h = Dt(l - s), f = t.series[e], p = h / (f.points.space * lt);
  return n[1] - n[0] <= p;
}
const al = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: dt,
  max: -dt
}, ra = (t, e, i, n, o) => o, cl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: ra,
  alpha: 1,
  facets: [
    Pt({}, al, { scale: "x" }),
    Pt({}, al, { scale: "y" })
  ]
}, ul = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: ra,
  alpha: 1,
  points: {
    show: ph,
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
function gh(t, e, i, n, o) {
  return i / 10;
}
const sa = {
  time: Uc,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, mh = Pt({}, sa, {
  time: !1,
  ori: 1
}), hl = {};
function la(t, e) {
  let i = hl[t];
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
  }, t != null && (hl[t] = i)), i;
}
const fn = 1, br = 2;
function Ni(t, e, i) {
  const n = t.mode, o = t.series[e], s = n == 2 ? t._data[e] : t._data, l = t.scales, h = t.bbox;
  let f = s[0], p = n == 2 ? s[1] : s[e], b = n == 2 ? l[o.facets[0].scale] : l[t.series[0].scale], g = n == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, k = h.top, P = h.width, L = h.height, U = t.valToPosH, V = t.valToPosV;
  return b.ori == 0 ? i(
    o,
    f,
    p,
    b,
    g,
    U,
    V,
    _,
    k,
    P,
    L,
    So,
    mn,
    ko,
    ca,
    ha
  ) : i(
    o,
    f,
    p,
    b,
    g,
    V,
    U,
    k,
    _,
    L,
    P,
    Ao,
    _n,
    Ir,
    ua,
    fa
  );
}
function Fr(t, e) {
  let i = 0, n = 0, o = rt(t.bands, Or);
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
function _h(t, e, i, n, o) {
  let s = t.mode, l = t.series[e], h = s == 2 ? l.facets[1].scale : l.scale, f = t.scales[h];
  return o == -1 ? f.min : o == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ti(t, e, i, n, o, s) {
  return Ni(t, e, (l, h, f, p, b, g, _, k, P, L, U) => {
    let V = l.pxRound;
    const x = p.dir * (p.ori == 0 ? 1 : -1), R = p.ori == 0 ? mn : _n;
    let $, Z;
    x == 1 ? ($ = i, Z = n) : ($ = n, Z = i);
    let M = V(g(h[$], p, L, k)), J = V(_(f[$], b, U, P)), G = V(g(h[Z], p, L, k)), tt = V(_(s == 1 ? b.max : b.min, b, U, P)), W = new Path2D(o);
    return R(W, G, tt), R(W, M, tt), R(W, M, J), W;
  });
}
function $o(t, e, i, n, o, s) {
  let l = null;
  if (t.length > 0) {
    l = new Path2D();
    const h = e == 0 ? ko : Ir;
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
function bh(t, e, i) {
  let n = t[t.length - 1];
  n && n[0] == e ? n[1] = i : t.push([e, i]);
}
function Ur(t, e, i, n, o, s, l) {
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
      let k = s(t[g]), P = _ == g ? k : s(t[_]), L = g - o;
      k = l <= 0 && L >= 0 && L < f ? s(t[L]) : k;
      let V = _ + o;
      P = l >= 0 && V >= 0 && V < f ? s(t[V]) : P, P >= k && h.push([k, P]);
    }
  return h;
}
function fl(t) {
  return t == 0 ? Rl : t == 1 ? Mt : (e) => Ei(e, t);
}
function aa(t) {
  let e = t == 0 ? So : Ao, i = t == 0 ? (o, s, l, h, f, p) => {
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
const So = (t, e, i) => {
  t.moveTo(e, i);
}, Ao = (t, e, i) => {
  t.moveTo(i, e);
}, mn = (t, e, i) => {
  t.lineTo(e, i);
}, _n = (t, e, i) => {
  t.lineTo(i, e);
}, ko = aa(0), Ir = aa(1), ca = (t, e, i, n, o, s) => {
  t.arc(e, i, n, o, s);
}, ua = (t, e, i, n, o, s) => {
  t.arc(i, e, n, o, s);
}, ha = (t, e, i, n, o, s, l) => {
  t.bezierCurveTo(e, i, n, o, s, l);
}, fa = (t, e, i, n, o, s, l) => {
  t.bezierCurveTo(i, e, o, n, l, s);
};
function da(t) {
  return (e, i, n, o, s) => Ni(e, i, (l, h, f, p, b, g, _, k, P, L, U) => {
    let { pxRound: V, points: x } = l, R, $;
    p.ori == 0 ? (R = So, $ = ca) : (R = Ao, $ = ua);
    const Z = pt(x.width * lt, 3);
    let M = (x.size - x.width) / 2 * lt, J = pt(M * 2, 3), G = new Path2D(), tt = new Path2D(), { left: W, top: S, width: q, height: D } = e.bbox;
    ko(
      tt,
      W - J,
      S - J,
      q + J * 2,
      D + J * 2
    );
    const B = (H) => {
      if (f[H] != null) {
        let it = V(g(h[H], p, L, k)), N = V(_(f[H], b, U, P));
        R(G, it + M, N), $(G, it, N, M, 0, so * 2);
      }
    };
    if (s)
      s.forEach(B);
    else
      for (let H = n; H <= o; H++)
        B(H);
    return {
      stroke: Z > 0 ? G : null,
      fill: G,
      clip: tt,
      flags: fn | br
    };
  });
}
function pa(t) {
  return (e, i, n, o, s, l) => {
    n != o && (s != n && l != n && t(e, i, n), s != o && l != o && t(e, i, o), t(e, i, l));
  };
}
const vh = pa(mn), yh = pa(_n);
function ga(t) {
  const e = rt(t?.alignGaps, 0);
  return (i, n, o, s) => Ni(i, n, (l, h, f, p, b, g, _, k, P, L, U) => {
    [o, s] = vo(f, o, s);
    let V = l.pxRound, x = (D) => V(g(D, p, L, k)), R = (D) => V(_(D, b, U, P)), $, Z;
    p.ori == 0 ? ($ = mn, Z = vh) : ($ = _n, Z = yh);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, G = J.stroke;
    let tt = !1;
    if (s - o >= L * 4) {
      let D = (z) => i.posToVal(z, p.key, !0), B = null, H = null, it, N, Jt, wt = x(h[M == 1 ? o : s]), nt = x(h[o]), ht = x(h[s]), Q = D(M == 1 ? nt + 1 : ht - 1);
      for (let z = M == 1 ? o : s; z >= o && z <= s; z += M) {
        let Tt = h[z], xt = (M == 1 ? Tt < Q : Tt > Q) ? wt : x(Tt), ct = f[z];
        xt == wt ? ct != null ? (N = ct, B == null ? ($(G, xt, R(N)), it = B = H = N) : N < B ? B = N : N > H && (H = N)) : ct === null && (tt = !0) : (B != null && Z(G, wt, R(B), R(H), R(it), R(N)), ct != null ? (N = ct, $(G, xt, R(N)), B = H = it = N) : (B = H = null, ct === null && (tt = !0)), wt = xt, Q = D(wt + M));
      }
      B != null && B != H && Jt != wt && Z(G, wt, R(B), R(H), R(it), R(N));
    } else
      for (let D = M == 1 ? o : s; D >= o && D <= s; D += M) {
        let B = f[D];
        B === null ? tt = !0 : B != null && $(G, x(h[D]), R(B));
      }
    let [S, q] = Fr(i, n);
    if (l.fill != null || S != 0) {
      let D = J.fill = new Path2D(G), B = l.fillTo(i, n, l.min, l.max, S), H = R(B), it = x(h[o]), N = x(h[s]);
      M == -1 && ([N, it] = [it, N]), $(D, N, H), $(D, it, H);
    }
    if (!l.spanGaps) {
      let D = [];
      tt && D.push(...Ur(h, f, o, s, M, x, e)), J.gaps = D = l.gaps(i, n, o, s, D), J.clip = $o(D, p.ori, k, P, L, U);
    }
    return q != 0 && (J.band = q == 2 ? [
      ti(i, n, o, s, G, -1),
      ti(i, n, o, s, G, 1)
    ] : ti(i, n, o, s, G, q)), J;
  });
}
function wh(t) {
  const e = rt(t.align, 1), i = rt(t.ascDesc, !1), n = rt(t.alignGaps, 0), o = rt(t.extend, !1);
  return (s, l, h, f) => Ni(s, l, (p, b, g, _, k, P, L, U, V, x, R) => {
    [h, f] = vo(g, h, f);
    let $ = p.pxRound, { left: Z, width: M } = s.bbox, J = (nt) => $(P(nt, _, x, U)), G = (nt) => $(L(nt, k, R, V)), tt = _.ori == 0 ? mn : _n;
    const W = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, S = W.stroke, q = _.dir * (_.ori == 0 ? 1 : -1);
    let D = G(g[q == 1 ? h : f]), B = J(b[q == 1 ? h : f]), H = B, it = B;
    o && e == -1 && (it = Z, tt(S, it, D)), tt(S, B, D);
    for (let nt = q == 1 ? h : f; nt >= h && nt <= f; nt += q) {
      let ht = g[nt];
      if (ht == null)
        continue;
      let Q = J(b[nt]), z = G(ht);
      e == 1 ? tt(S, Q, D) : tt(S, H, z), tt(S, Q, z), D = z, H = Q;
    }
    let N = H;
    o && e == 1 && (N = Z + M, tt(S, N, D));
    let [Jt, wt] = Fr(s, l);
    if (p.fill != null || Jt != 0) {
      let nt = W.fill = new Path2D(S), ht = p.fillTo(s, l, p.min, p.max, Jt), Q = G(ht);
      tt(nt, N, Q), tt(nt, it, Q);
    }
    if (!p.spanGaps) {
      let nt = [];
      nt.push(...Ur(b, g, h, f, q, J, n));
      let ht = p.width * lt / 2, Q = i || e == 1 ? ht : -ht, z = i || e == -1 ? -ht : ht;
      nt.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += z;
      }), W.gaps = nt = p.gaps(s, l, h, f, nt), W.clip = $o(nt, _.ori, U, V, x, R);
    }
    return wt != 0 && (W.band = wt == 2 ? [
      ti(s, l, h, f, S, -1),
      ti(s, l, h, f, S, 1)
    ] : ti(s, l, h, f, S, wt)), W;
  });
}
function dl(t, e, i, n, o, s, l = dt) {
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
function xh(t) {
  t = t || Nn;
  const e = rt(t.size, [0.6, dt, 1]), i = t.align || 0, n = t.gap || 0;
  let o = t.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = et(o), l = 1 - e[0], h = rt(e[1], dt), f = rt(e[2], 1), p = rt(t.disp, Nn), b = rt(t.each, (k) => {
  }), { fill: g, stroke: _ } = p;
  return (k, P, L, U) => Ni(k, P, (V, x, R, $, Z, M, J, G, tt, W, S) => {
    let q = V.pxRound, D = i, B = n * lt, H = h * lt, it = f * lt, N, Jt;
    $.ori == 0 ? [N, Jt] = s(k, P) : [Jt, N] = s(k, P);
    const wt = $.dir * ($.ori == 0 ? 1 : -1);
    let nt = $.ori == 0 ? ko : Ir, ht = $.ori == 0 ? b : (T, gt, Ct, Fi, bi, Oe, vi) => {
      b(T, gt, Ct, bi, Fi, vi, Oe);
    }, Q = rt(k.bands, Or).find((T) => T.series[0] == P), z = Q != null ? Q.dir : 0, Tt = V.fillTo(k, P, V.min, V.max, z), Wt = q(J(Tt, Z, S, tt)), xt, ct, $e, ie = W, St = q(V.width * lt), ze = !1, Ge = null, fe = null, ii = null, Hi = null;
    g != null && (St == 0 || _ != null) && (ze = !0, Ge = g.values(k, P, L, U), fe = /* @__PURE__ */ new Map(), new Set(Ge).forEach((T) => {
      T != null && fe.set(T, new Path2D());
    }), St > 0 && (ii = _.values(k, P, L, U), Hi = /* @__PURE__ */ new Map(), new Set(ii).forEach((T) => {
      T != null && Hi.set(T, new Path2D());
    })));
    let { x0: Li, size: vn } = p;
    if (Li != null && vn != null) {
      D = 1, x = Li.values(k, P, L, U), Li.unit == 2 && (x = x.map((Ct) => k.posToVal(G + Ct * W, $.key, !0)));
      let T = vn.values(k, P, L, U);
      vn.unit == 2 ? ct = T[0] * W : ct = M(T[0], $, W, G) - M(0, $, W, G), ie = dl(x, R, M, $, W, G, ie), $e = ie - ct + B;
    } else
      ie = dl(x, R, M, $, W, G, ie), $e = ie * l + B, ct = ie - $e;
    $e < 1 && ($e = 0), St >= ct / 2 && (St = 0), $e < 5 && (q = Rl);
    let Wn = $e > 0, mi = ie - $e - (Wn ? St : 0);
    ct = q(gr(mi, it, H)), xt = (D == 0 ? ct / 2 : D == wt ? 0 : ct) - D * wt * ((D == 0 ? B / 2 : 0) + (Wn ? St / 2 : 0));
    const Yt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ri = ze ? null : new Path2D();
    let Ke = null;
    if (Q != null)
      Ke = k.data[Q.series[1]];
    else {
      let { y0: T, y1: gt } = p;
      T != null && gt != null && (R = gt.values(k, P, L, U), Ke = T.values(k, P, L, U));
    }
    let _i = N * ct, K = Jt * ct;
    for (let T = wt == 1 ? L : U; T >= L && T <= U; T += wt) {
      let gt = R[T];
      if (gt == null)
        continue;
      if (Ke != null) {
        let Qt = Ke[T] ?? 0;
        if (gt - Qt == 0)
          continue;
        Wt = J(Qt, Z, S, tt);
      }
      let Ct = $.distr != 2 || p != null ? x[T] : T, Fi = M(Ct, $, W, G), bi = J(rt(gt, Tt), Z, S, tt), Oe = q(Fi - xt), vi = q(Zt(bi, Wt)), ne = q(Me(bi, Wt)), de = vi - ne;
      if (gt != null) {
        let Qt = gt < 0 ? K : _i, Se = gt < 0 ? _i : K;
        ze ? (St > 0 && ii[T] != null && nt(Hi.get(ii[T]), Oe, ne + ae(St / 2), ct, Zt(0, de - St), Qt, Se), Ge[T] != null && nt(fe.get(Ge[T]), Oe, ne + ae(St / 2), ct, Zt(0, de - St), Qt, Se)) : nt(Ri, Oe, ne + ae(St / 2), ct, Zt(0, de - St), Qt, Se), ht(
          k,
          P,
          T,
          Oe - St / 2,
          ne,
          ct + St,
          de
        );
      }
    }
    return St > 0 ? Yt.stroke = ze ? Hi : Ri : ze || (Yt._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Yt.width = 0), Yt.fill = ze ? fe : Ri, Yt;
  });
}
function $h(t, e) {
  const i = rt(e?.alignGaps, 0);
  return (n, o, s, l) => Ni(n, o, (h, f, p, b, g, _, k, P, L, U, V) => {
    [s, l] = vo(p, s, l);
    let x = h.pxRound, R = (N) => x(_(N, b, U, P)), $ = (N) => x(k(N, g, V, L)), Z, M, J;
    b.ori == 0 ? (Z = So, J = mn, M = ha) : (Z = Ao, J = _n, M = fa);
    const G = b.dir * (b.ori == 0 ? 1 : -1);
    let tt = R(f[G == 1 ? s : l]), W = tt, S = [], q = [];
    for (let N = G == 1 ? s : l; N >= s && N <= l; N += G)
      if (p[N] != null) {
        let wt = f[N], nt = R(wt);
        S.push(W = nt), q.push($(p[N]));
      }
    const D = { stroke: t(S, q, Z, J, M, x), fill: null, clip: null, band: null, gaps: null, flags: fn }, B = D.stroke;
    let [H, it] = Fr(n, o);
    if (h.fill != null || H != 0) {
      let N = D.fill = new Path2D(B), Jt = h.fillTo(n, o, h.min, h.max, H), wt = $(Jt);
      J(N, W, wt), J(N, tt, wt);
    }
    if (!h.spanGaps) {
      let N = [];
      N.push(...Ur(f, p, s, l, G, R, i)), D.gaps = N = h.gaps(n, o, s, l, N), D.clip = $o(N, b.ori, P, L, U, V);
    }
    return it != 0 && (D.band = it == 2 ? [
      ti(n, o, s, l, B, -1),
      ti(n, o, s, l, B, 1)
    ] : ti(n, o, s, l, B, it)), D;
  });
}
function Sh(t) {
  return $h(Ah, t);
}
function Ah(t, e, i, n, o, s) {
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
const vr = /* @__PURE__ */ new Set();
function pl() {
  for (let t of vr)
    t.syncRect(!0);
}
gn && (Mi(ru, sn, pl), Mi(su, sn, pl, !0), Mi(fo, sn, () => {
  jt.pxRatio = lt;
}));
const kh = ga(), Eh = da();
function gl(t, e, i, n) {
  return (n ? [t[0], t[1]].concat(t.slice(2)) : [t[0]].concat(t.slice(1))).map((s, l) => yr(s, l, e, i));
}
function Ph(t, e) {
  return t.map((i, n) => n == 0 ? {} : Pt({}, e, i));
}
function yr(t, e, i, n) {
  return Pt({}, e == 0 ? i : n, t);
}
function ma(t, e, i) {
  return e == null ? un : [e, i];
}
const Th = ma;
function Ch(t, e, i) {
  return e == null ? un : po(e, i, Dr, !0);
}
function _a(t, e, i, n) {
  return e == null ? un : yo(e, i, t.scales[n].log, !1);
}
const Mh = _a;
function ba(t, e, i, n) {
  return e == null ? un : Mr(e, i, t.scales[n].log, !1);
}
const Dh = ba;
function zh(t, e, i, n, o) {
  let s = Zt(Gs(t), Gs(e)), l = e - t, h = Ce(o / n * l, i);
  do {
    let f = i[h], p = n * f / l;
    if (p >= o && s + (f < 5 ? fi.get(f) : 0) <= 17)
      return [f, p];
  } while (++h < i.length);
  return [0, 0];
}
function ml(t) {
  let e, i;
  return t = t.replace(/(\d+)px/, (n, o) => (e = Mt((i = +o) * lt)) + "px"), [t, e, i];
}
function Oh(t) {
  t.show && [t.font, t.labelFont].forEach((e) => {
    let i = pt(e[2] * lt, 1);
    e[0] = e[0].replace(/[0-9.]+px/, i + "px"), e[1] = i;
  });
}
function jt(t, e, i) {
  const n = {
    mode: rt(t.mode, 1)
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
  const p = n.root = be(Ic);
  if (t.id != null && (p.id = t.id), le(p, t.class), t.title) {
    let r = be(jc, p);
    r.textContent = t.title;
  }
  const b = Te("canvas"), g = n.ctx = b.getContext("2d"), _ = be(Wc, p);
  Mi("click", _, (r) => {
    r.target === P && (_t != Zi || $t != Ji) && It.click(n, r);
  }, !0);
  const k = n.under = be(Yc, _);
  _.appendChild(b);
  const P = n.over = be(Gc, _);
  t = hn(t);
  const L = +rt(t.pxAlign, 1), U = fl(L);
  (t.plugins || []).forEach((r) => {
    r.opts && (t = r.opts(n, t) || t);
  });
  const V = t.ms || 1e-3, x = n.series = o == 1 ? gl(t.series || [], rl, ul, !1) : Ph(t.series || [null], cl), R = n.axes = gl(t.axes || [], ol, ll, !0), $ = n.scales = {}, Z = n.bands = t.bands || [];
  Z.forEach((r) => {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1);
  });
  const M = o == 2 ? x[1].facets[0].scale : x[0].scale, J = {
    axes: Oa,
    series: Ta
  }, G = (t.drawOrder || ["axes", "series"]).map((r) => J[r]);
  function tt(r) {
    const a = r.distr == 3 ? (c) => Xe(c > 0 ? c : r.clamp(n, c, r.min, r.max, r.key)) : r.distr == 4 ? (c) => ir(c, r.asinh) : r.distr == 100 ? (c) => r.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: d, _max: m } = r, v = m - d;
      return (u - d) / v;
    };
  }
  function W(r) {
    let a = $[r];
    if (a == null) {
      let c = (t.scales || Nn)[r] || Nn;
      if (c.from != null) {
        W(c.from);
        let u = Pt({}, $[c.from], c, { key: r });
        u.valToPct = tt(u), $[r] = u;
      } else {
        a = $[r] = Pt({}, r == M ? sa : mh, c), a.key = r;
        let u = a.time, d = a.range, m = ai(d);
        if ((r != M || o == 2 && !u) && (m && (d[0] == null || d[1] == null) && (d = {
          min: d[0] == null ? js : {
            mode: 1,
            hard: d[0],
            soft: d[0]
          },
          max: d[1] == null ? js : {
            mode: 1,
            hard: d[1],
            soft: d[1]
          }
        }, m = !1), !m && xo(d))) {
          let v = d;
          d = (y, w, A) => w == null ? un : po(w, A, v);
        }
        a.range = et(d || (u ? Th : r == M ? a.distr == 3 ? Mh : a.distr == 4 ? Dh : ma : a.distr == 3 ? _a : a.distr == 4 ? ba : Ch)), a.auto = et(m ? !1 : a.auto), a.clamp = et(a.clamp || gh), a._min = a._max = null, a.valToPct = tt(a);
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
  let D, B;
  S.ori == 0 ? (le(p, Vc), D = s, B = l) : (le(p, Bc), D = l, B = s);
  const H = {};
  for (let r in $) {
    let a = $[r];
    (a.min != null || a.max != null) && (H[r] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const it = t.tzDate || ((r) => new Date(Mt(r / V))), N = t.fmtDate || Nr, Jt = V == 1 ? Vu(it) : Wu(it), wt = el(it, tl(V == 1 ? Iu : ju, N)), nt = nl(it, il(Gu, N)), ht = [], Q = n.legend = Pt({}, Zu, t.legend), z = n.cursor = Pt({}, ih, { drag: { y: o == 2 } }, t.cursor), Tt = Q.show, Wt = z.show, xt = Q.markers;
  Q.idxs = ht, xt.width = et(xt.width), xt.dash = et(xt.dash), xt.stroke = et(xt.stroke), xt.fill = et(xt.fill);
  let ct, $e, ie, St = [], ze = [], Ge, fe = !1, ii = {};
  if (Q.live) {
    const r = x[1] ? x[1].values : null;
    fe = r != null, Ge = fe ? r(n, 1, 0) : { _: 0 };
    for (let a in Ge)
      ii[a] = Tr;
  }
  if (Tt)
    if (ct = Te("table", Xc, p), ie = Te("tbody", null, ct), Q.mount(n, ct), fe) {
      $e = Te("thead", null, ct, ie);
      let r = Te("tr", null, $e);
      Te("th", null, r);
      for (var Hi in Ge)
        Te("th", Ms, r).textContent = Hi;
    } else
      le(ct, eu), Q.live && le(ct, tu);
  const Li = { show: !0 }, vn = { show: !1 };
  function Wn(r, a) {
    if (a == 0 && (fe || !Q.live || o == 2))
      return un;
    let c = [], u = Te("tr", iu, ie, ie.childNodes[a]);
    le(u, r.class), r.show || le(u, Ti);
    let d = Te("th", null, u);
    if (xt.show) {
      let y = be(nu, d);
      if (a > 0) {
        let w = xt.width(n, a);
        w && (y.style.border = w + "px " + xt.dash(n, a) + " " + xt.stroke(n, a)), y.style.background = xt.fill(n, a);
      }
    }
    let m = be(Ms, d);
    r.label instanceof HTMLElement ? m.appendChild(r.label) : m.textContent = r.label, a > 0 && (xt.show || (m.style.color = r.width > 0 ? xt.stroke(n, a) : xt.fill(n, a)), Yt("click", d, (y) => {
      if (z._lock)
        return;
      wi(y);
      let w = x.indexOf(r);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = x.some((E, C) => C > 0 && C != w && E.show);
        x.forEach((E, C) => {
          C > 0 && He(C, A ? C == w ? Li : vn : Li, !0, Et.setSeries);
        });
      } else
        He(w, { show: !r.show }, !0, Et.setSeries);
    }, !1), Ii && Yt(Ns, d, (y) => {
      z._lock || (wi(y), He(x.indexOf(r), Xi, !0, Et.setSeries));
    }, !1));
    for (var v in Ge) {
      let y = Te("td", ou, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const mi = /* @__PURE__ */ new Map();
  function Yt(r, a, c, u = !0) {
    const d = mi.get(a) || {}, m = z.bind[r](n, a, c, u);
    m && (Mi(r, a, d[r] = m), mi.set(a, d));
  }
  function Ri(r, a, c) {
    const u = mi.get(a) || {};
    for (let d in u)
      (r == null || d == r) && (pr(d, a, u[d]), delete u[d]);
    r == null && mi.delete(a);
  }
  let Ke = 0, _i = 0, K = 0, T = 0, gt = 0, Ct = 0, Fi = gt, bi = Ct, Oe = K, vi = T, ne = 0, de = 0, Qt = 0, Se = 0;
  n.bbox = {};
  let Po = !1, Yn = !1, Ui = !1, yi = !1, Gn = !1, pe = !1;
  function To(r, a, c) {
    (c || r != n.width || a != n.height) && jr(r, a), Yi(!1), Ui = !0, Yn = !0, Gi();
  }
  function jr(r, a) {
    n.width = Ke = K = r, n.height = _i = T = a, gt = Ct = 0, xa(), $a();
    let c = n.bbox;
    ne = c.left = Ei(gt * lt, 0.5), de = c.top = Ei(Ct * lt, 0.5), Qt = c.width = Ei(K * lt, 0.5), Se = c.height = Ei(T * lt, 0.5);
  }
  const va = 3;
  function ya() {
    let r = !1, a = 0;
    for (; !r; ) {
      a++;
      let c = Da(a), u = za(a);
      r = a == va || c && u, r || (jr(n.width, n.height), Yn = !0);
    }
  }
  function wa({ width: r, height: a }) {
    To(r, a);
  }
  n.setSize = wa;
  function xa() {
    let r = !1, a = !1, c = !1, u = !1;
    R.forEach((d, m) => {
      if (d.show && d._show) {
        let { side: v, _size: y } = d, w = v % 2, A = d.label != null ? d.labelSize : 0, E = y + A;
        E > 0 && (w ? (K -= E, v == 3 ? (gt += E, u = !0) : c = !0) : (T -= E, v == 0 ? (Ct += E, r = !0) : a = !0));
      }
    }), xi[0] = r, xi[1] = c, xi[2] = a, xi[3] = u, K -= ni[1] + ni[3], gt += ni[3], T -= ni[2] + ni[0], Ct += ni[0];
  }
  function $a() {
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
        let y = m.side;
        m._pos = d(y, m._size), m.label != null && (m._lpos = d(y, m.labelSize));
      }
    });
  }
  if (z.dataIdx == null) {
    let r = z.hover, a = r.skip = new Set(r.skip ?? []);
    a.add(void 0);
    let c = r.prox = et(r.prox), u = r.bias ??= 0;
    z.dataIdx = (d, m, v, y) => {
      if (m == 0)
        return v;
      let w = v, A = c(d, m, v, y) ?? dt, E = A >= 0 && A < dt, C = S.ori == 0 ? K : T, j = z.left, st = e[0], ot = e[m];
      if (a.has(ot[v])) {
        w = null;
        let X = null, I = null, O;
        if (u == 0 || u == -1)
          for (O = v; X == null && O-- > 0; )
            a.has(ot[O]) || (X = O);
        if (u == 0 || u == 1)
          for (O = v; I == null && O++ < ot.length; )
            a.has(ot[O]) || (I = O);
        if (X != null || I != null)
          if (E) {
            let vt = X == null ? -1 / 0 : D(st[X], S, C, 0), At = I == null ? 1 / 0 : D(st[I], S, C, 0), Ft = j - vt, ft = At - j;
            Ft <= ft ? Ft <= A && (w = X) : ft <= A && (w = I);
          } else
            w = I == null ? X : X == null ? I : v - X <= I - v ? X : I;
      } else E && Dt(j - D(st[v], S, C, 0)) > A && (w = null);
      return w;
    };
  }
  const wi = (r) => {
    z.event = r;
  };
  z.idxs = ht, z._lock = !1;
  let Bt = z.points;
  Bt.show = et(Bt.show), Bt.size = et(Bt.size), Bt.stroke = et(Bt.stroke), Bt.width = et(Bt.width), Bt.fill = et(Bt.fill);
  const Ne = n.focus = Pt({}, t.focus || { alpha: 0.3 }, z.focus), Ii = Ne.prox >= 0, Vi = Ii && Bt.one;
  let ge = [], Bi = [], ji = [];
  function Wr(r, a) {
    let c = Bt.show(n, a);
    if (c instanceof HTMLElement)
      return le(c, Qc), le(c, r.class), Ue(c, -10, -10, K, T), P.insertBefore(c, ge[a]), c;
  }
  function Yr(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? Zs(u) ? nl(it, il(u, N)) : u || nt : u || fh, r.label = r.label || (c ? oh : nh);
    }
    if (Vi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || kh || mu, r.fillTo = et(r.fillTo || _h), r.pxAlign = +rt(r.pxAlign, L), r.pxRound = fl(r.pxAlign), r.stroke = et(r.stroke || null), r.fill = et(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = dh(Zt(1, r.width), 1), u = r.points = Pt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Eh,
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
      Vi ? a == 0 && (c = Wr(r, a)) : a > 0 && (c = Wr(r, a)), ge.splice(a, 0, c), Bi.splice(a, 0, 0), ji.splice(a, 0, 0);
    }
    Rt("addSeries", a);
  }
  function Sa(r, a) {
    a = a ?? x.length, r = o == 1 ? yr(r, a, rl, ul) : yr(r, a, {}, cl), x.splice(a, 0, r), Yr(x[a], a);
  }
  n.addSeries = Sa;
  function Aa(r) {
    if (x.splice(r, 1), Tt) {
      Q.values.splice(r, 1), ze.splice(r, 1);
      let a = St.splice(r, 1)[0];
      Ri(null, a.firstChild), a.remove();
    }
    Wt && (ht.splice(r, 1), ge.splice(r, 1)[0].remove(), Bi.splice(r, 1), ji.splice(r, 1)), Rt("delSeries", r);
  }
  n.delSeries = Aa;
  const xi = [!1, !1, !1, !1];
  function ka(r, a) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = $[r.scale];
      u == null && (r.scale = c ? x[1].scale : M, u = $[r.scale]);
      let d = u.time;
      r.size = et(r.size), r.space = et(r.space), r.rotate = et(r.rotate), ai(r.incrs) && r.incrs.forEach((v) => {
        !fi.has(v) && fi.set(v, Il(v));
      }), r.incrs = et(r.incrs || (u.distr == 2 ? Ru : d ? V == 1 ? Uu : Bu : Pi)), r.splits = et(r.splits || (d && u.distr == 1 ? Jt : u.distr == 3 ? mr : u.distr == 4 ? lh : sh)), r.stroke = et(r.stroke), r.grid.stroke = et(r.grid.stroke), r.ticks.stroke = et(r.ticks.stroke), r.border.stroke = et(r.border.stroke);
      let m = r.values;
      r.values = // static array of tick values
      ai(m) && !ai(m[0]) ? et(m) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          ai(m) ? el(it, tl(m, N)) : (
            // fmtDate string tpl
            Zs(m) ? Yu(it, m) : m || wt
          )
        ) : m || rh
      ), r.filter = et(r.filter || (u.distr >= 3 && u.log == 10 ? uh : u.distr == 3 && u.log == 2 ? hh : Fl)), r.font = ml(r.font), r.labelFont = ml(r.labelFont), r._size = r.size(n, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (xi[a] = !0, r._el = be(Kc, _));
    }
  }
  function yn(r, a, c, u) {
    let [d, m, v, y] = c, w = a % 2, A = 0;
    return w == 0 && (y || m) && (A = a == 0 && !d || a == 2 && !v ? Mt(ol.size / 3) : 0), w == 1 && (d || v) && (A = a == 1 && !m || a == 3 && !y ? Mt(ll.size / 2) : 0), A;
  }
  const Gr = n.padding = (t.padding || [yn, yn, yn, yn]).map((r) => et(rt(r, yn))), ni = n._padding = Gr.map((r, a) => r(n, a, xi, 0));
  let Ut, Ot = null, Nt = null;
  const Kn = o == 1 ? x[0].idxs : null;
  let Ae = null, wn = !1;
  function Kr(r, a) {
    if (e = r ?? [], n.data = n._data = e, o == 2) {
      Ut = 0;
      for (let c = 1; c < x.length; c++)
        Ut += e[c][0].length;
    } else {
      e.length == 0 && (n.data = n._data = e = [[]]), Ae = e[0], Ut = Ae.length;
      let c = e;
      if (q == 2) {
        c = e.slice();
        let u = c[0] = Array(Ut);
        for (let d = 0; d < Ut; d++)
          u[d] = d;
      }
      n._data = e = c;
    }
    if (Yi(!0), Rt("setData"), q == 2 && (Ui = !0), a !== !1) {
      let c = S;
      c.auto(n, wn) ? Co() : ri(M, c.min, c.max), yi = yi || z.left >= 0, pe = !0, Gi();
    }
  }
  n.setData = Kr;
  function Co() {
    wn = !0;
    let r, a;
    o == 1 && (Ut > 0 ? (Ot = Kn[0] = 0, Nt = Kn[1] = Ut - 1, r = e[0][Ot], a = e[0][Nt], q == 2 ? (r = Ot, a = Nt) : r == a && (q == 3 ? [r, a] = yo(r, r, S.log, !1) : q == 4 ? [r, a] = Mr(r, r, S.log, !1) : S.time ? a = r + Mt(86400 / V) : [r, a] = po(r, a, Dr, !0))) : (Ot = Kn[0] = r = null, Nt = Kn[1] = a = null)), ri(M, r, a);
  }
  let qn, Wi, Mo, Do, zo, Oo, No, Ho, Lo, Xt;
  function qr(r, a, c, u, d, m) {
    r ??= zs, c ??= Or, u ??= "butt", d ??= zs, m ??= "round", r != qn && (g.strokeStyle = qn = r), d != Wi && (g.fillStyle = Wi = d), a != Mo && (g.lineWidth = Mo = a), m != zo && (g.lineJoin = zo = m), u != Oo && (g.lineCap = Oo = u), c != Do && g.setLineDash(Do = c);
  }
  function Zr(r, a, c, u) {
    a != Wi && (g.fillStyle = Wi = a), r != No && (g.font = No = r), c != Ho && (g.textAlign = Ho = c), u != Lo && (g.textBaseline = Lo = u);
  }
  function Ro(r, a, c, u, d = 0) {
    if (u.length > 0 && r.auto(n, wn) && (a == null || a.min == null)) {
      let m = rt(Ot, 0), v = rt(Nt, u.length - 1), y = c.min == null ? uu(u, m, v, d, r.distr == 3) : [c.min, c.max];
      r.min = Me(r.min, c.min = y[0]), r.max = Zt(r.max, c.max = y[1]);
    }
  }
  const Jr = { min: null, max: null };
  function Ea() {
    for (let u in $) {
      let d = $[u];
      H[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      H[M] != null && d.auto(n, wn)) && (H[u] = Jr);
    }
    for (let u in $) {
      let d = $[u];
      H[u] == null && d.from != null && H[d.from] != null && (H[u] = Jr);
    }
    H[M] != null && Yi(!0);
    let r = {};
    for (let u in H) {
      let d = H[u];
      if (d != null) {
        let m = r[u] = hn($[u], vu);
        if (d.min != null)
          Pt(m, d);
        else if (u != M || o == 2)
          if (Ut == 0 && m.from == null) {
            let v = m.range(n, null, null, u);
            m.min = v[0], m.max = v[1];
          } else
            m.min = dt, m.max = -dt;
      }
    }
    if (Ut > 0) {
      x.forEach((u, d) => {
        if (o == 1) {
          let m = u.scale, v = H[m];
          if (v == null)
            return;
          let y = r[m];
          if (d == 0) {
            let w = y.range(n, y.min, y.max, m);
            y.min = w[0], y.max = w[1], Ot = Ce(y.min, e[0]), Nt = Ce(y.max, e[0]), Nt - Ot > 1 && (e[0][Ot] < y.min && Ot++, e[0][Nt] > y.max && Nt--), u.min = Ae[Ot], u.max = Ae[Nt];
          } else u.show && u.auto && Ro(y, v, u, e[d], u.sorted);
          u.idxs[0] = Ot, u.idxs[1] = Nt;
        } else if (d > 0 && u.show && u.auto) {
          let [m, v] = u.facets, y = m.scale, w = v.scale, [A, E] = e[d], C = r[y], j = r[w];
          C != null && Ro(C, H[y], m, A, m.sorted), j != null && Ro(j, H[w], v, E, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in r) {
        let d = r[u], m = H[u];
        if (d.from == null && (m == null || m.min == null)) {
          let v = d.range(
            n,
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
        m._min = v == 3 ? Xe(m.min) : v == 4 ? ir(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? Xe(m.max) : v == 4 ? ir(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[u] = c = !0;
      }
    }
    if (c) {
      x.forEach((u, d) => {
        o == 2 ? d > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Ui = !0, Rt("setScale", u);
      Wt && z.left >= 0 && (yi = pe = !0);
    }
    for (let u in H)
      H[u] = null;
  }
  function Pa(r) {
    let a = gr(Ot - 1, 0, Ut - 1), c = gr(Nt + 1, 0, Ut - 1);
    for (; r[a] == null && a > 0; )
      a--;
    for (; r[c] == null && c < Ut - 1; )
      c++;
    return [a, c];
  }
  function Ta() {
    if (Ut > 0) {
      let r = x.some((a) => a._focus) && Xt != Ne.alpha;
      r && (g.globalAlpha = Xt = Ne.alpha), x.forEach((a, c) => {
        if (c > 0 && a.show && (Qr(c, !1), Qr(c, !0), a._paths == null)) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha);
          let d = o == 2 ? [0, e[c][0].length - 1] : Pa(e[c]);
          a._paths = a.paths(n, c, d[0], d[1]), Xt != u && (g.globalAlpha = Xt = u);
        }
      }), x.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha), a._paths != null && Xr(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Ot, Nt, d), v = a.points.filter(n, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(n, c, Ot, Nt, v), Xr(c, !0));
          }
          Xt != u && (g.globalAlpha = Xt = u), Rt("drawSeries", c);
        }
      }), r && (g.globalAlpha = Xt = 1);
    }
  }
  function Qr(r, a) {
    let c = a ? x[r].points : x[r];
    c._stroke = c.stroke(n, r), c._fill = c.fill(n, r);
  }
  function Xr(r, a) {
    let c = a ? x[r].points : x[r], {
      stroke: u,
      fill: d,
      clip: m,
      flags: v,
      _stroke: y = c._stroke,
      _fill: w = c._fill,
      _width: A = c.width
    } = c._paths;
    A = pt(A * lt, 3);
    let E = null, C = A % 2 / 2;
    a && w == null && (w = A > 0 ? "#fff" : y);
    let j = c.pxAlign == 1 && C > 0;
    if (j && g.translate(C, C), !a) {
      let st = ne - A / 2, ot = de - A / 2, X = Qt + A, I = Se + A;
      E = new Path2D(), E.rect(st, ot, X, I);
    }
    a ? Fo(y, A, c.dash, c.cap, w, u, d, v, m) : Ca(r, y, A, c.dash, c.cap, w, u, d, v, E, m), j && g.translate(-C, -C);
  }
  function Ca(r, a, c, u, d, m, v, y, w, A, E) {
    let C = !1;
    w != 0 && Z.forEach((j, st) => {
      if (j.series[0] == r) {
        let ot = x[j.series[1]], X = e[j.series[1]], I = (ot._paths || Nn).band;
        ai(I) && (I = j.dir == 1 ? I[0] : I[1]);
        let O, vt = null;
        ot.show && I && fu(X, Ot, Nt) ? (vt = j.fill(n, st) || m, O = ot._paths.clip) : I = null, Fo(a, c, u, d, vt, v, y, w, A, E, O, I), C = !0;
      }
    }), C || Fo(a, c, u, d, m, v, y, w, A, E);
  }
  const ts = fn | br;
  function Fo(r, a, c, u, d, m, v, y, w, A, E, C) {
    qr(r, a, c, u, d), (w || A || C) && (g.save(), w && g.clip(w), A && g.clip(A)), C ? (y & ts) == ts ? (g.clip(C), E && g.clip(E), Jn(d, v), Zn(r, m, a)) : y & br ? (Jn(d, v), g.clip(C), Zn(r, m, a)) : y & fn && (g.save(), g.clip(C), E && g.clip(E), Jn(d, v), g.restore(), Zn(r, m, a)) : (Jn(d, v), Zn(r, m, a)), (w || A || C) && g.restore();
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
  function Ma(r, a, c, u) {
    let d = R[r], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let v = d._space = d.space(n, r, a, c, u), y = d._incrs = d.incrs(n, r, a, c, u, v);
      m = zh(a, c, y, u, v);
    }
    return d._found = m;
  }
  function Uo(r, a, c, u, d, m, v, y, w, A) {
    let E = v % 2 / 2;
    L == 1 && g.translate(E, E), qr(y, v, w, A, y), g.beginPath();
    let C, j, st, ot, X = d + (u == 0 || u == 3 ? -m : m);
    c == 0 ? (j = d, ot = X) : (C = d, st = X);
    for (let I = 0; I < r.length; I++)
      a[I] != null && (c == 0 ? C = st = r[I] : j = ot = r[I], g.moveTo(C, j), g.lineTo(st, ot));
    g.stroke(), L == 1 && g.translate(-E, -E);
  }
  function Da(r) {
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
      let m = c.side, v = m % 2, { min: y, max: w } = d, [A, E] = Ma(u, y, w, v == 0 ? K : T);
      if (E == 0)
        return;
      let C = d.distr == 2, j = c._splits = c.splits(n, u, y, w, A, E, C), st = d.distr == 2 ? j.map((O) => Ae[O]) : j, ot = d.distr == 2 ? Ae[j[1]] - Ae[j[0]] : A, X = c._values = c.values(n, c.filter(n, st, u, E, ot), u, E, ot);
      c._rotate = m == 2 ? c.rotate(n, X, u, E) : 0;
      let I = c._size;
      c._size = ve(c.size(n, X, u, r)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function za(r) {
    let a = !0;
    return Gr.forEach((c, u) => {
      let d = c(n, u, xi, r);
      d != ni[u] && (a = !1), ni[u] = d;
    }), a;
  }
  function Oa() {
    for (let r = 0; r < R.length; r++) {
      let a = R[r];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, d, m, v = a.stroke(n, r), y = c == 0 || c == 3 ? -1 : 1, [w, A] = a._found;
      if (a.label != null) {
        let Kt = a.labelGap * y, se = Mt((a._lpos + Kt) * lt);
        Zr(a.labelFont[0], v, "center", c == 2 ? Pn : Ds), g.save(), u == 1 ? (d = m = 0, g.translate(
          se,
          Mt(de + Se / 2)
        ), g.rotate((c == 3 ? -so : so) / 2)) : (d = Mt(ne + Qt / 2), m = se);
        let Ai = Ll(a.label) ? a.label(n, r, w, A) : a.label;
        g.fillText(Ai, d, m), g.restore();
      }
      if (A == 0)
        continue;
      let E = $[a.scale], C = u == 0 ? Qt : Se, j = u == 0 ? ne : de, st = a._splits, ot = E.distr == 2 ? st.map((Kt) => Ae[Kt]) : st, X = E.distr == 2 ? Ae[st[1]] - Ae[st[0]] : w, I = a.ticks, O = a.border, vt = I.show ? I.size : 0, At = Mt(vt * lt), Ft = Mt((a.alignTo == 2 ? a._size - vt - a.gap : a.gap) * lt), ft = a._rotate * -so / 180, kt = U(a._pos * lt), oe = (At + Ft) * y, Gt = kt + oe;
      m = u == 0 ? Gt : 0, d = u == 1 ? Gt : 0;
      let me = a.font[0], ke = a.align == 1 ? en : a.align == 2 ? Xo : ft > 0 ? en : ft < 0 ? Xo : u == 0 ? "center" : c == 3 ? Xo : en, Re = ft || u == 1 ? "middle" : c == 2 ? Pn : Ds;
      Zr(me, v, ke, Re);
      let re = a.font[1] * a.lineGap, _e = st.map((Kt) => U(h(Kt, E, C, j))), Ee = a._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let se = Ee[Kt];
        if (se != null) {
          u == 0 ? d = _e[Kt] : m = _e[Kt], se = "" + se;
          let Ai = se.indexOf(`
`) == -1 ? [se] : se.split(/\n/gm);
          for (let qt = 0; qt < Ai.length; qt++) {
            let vs = Ai[qt];
            ft ? (g.save(), g.translate(d, m + qt * re), g.rotate(ft), g.fillText(vs, 0, 0), g.restore()) : g.fillText(vs, d, m + qt * re);
          }
        }
      }
      I.show && Uo(
        _e,
        I.filter(n, ot, r, A, X),
        u,
        c,
        kt,
        At,
        pt(I.width * lt, 3),
        I.stroke(n, r),
        I.dash,
        I.cap
      );
      let Fe = a.grid;
      Fe.show && Uo(
        _e,
        Fe.filter(n, ot, r, A, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? de : ne,
        u == 0 ? Se : Qt,
        pt(Fe.width * lt, 3),
        Fe.stroke(n, r),
        Fe.dash,
        Fe.cap
      ), O.show && Uo(
        [kt],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? de : ne,
        u == 1 ? Se : Qt,
        pt(O.width * lt, 3),
        O.stroke(n, r),
        O.dash,
        O.cap
      );
    }
    Rt("drawAxes");
  }
  function Yi(r) {
    x.forEach((a, c) => {
      c > 0 && (a._paths = null, r && (o == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let Qn = !1, Io = !1, xn = [];
  function Na() {
    Io = !1;
    for (let r = 0; r < xn.length; r++)
      Rt(...xn[r]);
    xn.length = 0;
  }
  function Gi() {
    Qn || (ku(es), Qn = !0);
  }
  function Ha(r, a = !1) {
    Qn = !0, Io = a, r(n), es(), a && xn.length > 0 && queueMicrotask(Na);
  }
  n.batch = Ha;
  function es() {
    if (Po && (Ea(), Po = !1), Ui && (ya(), Ui = !1), Yn) {
      if (yt(k, en, gt), yt(k, Pn, Ct), yt(k, Cn, K), yt(k, Mn, T), yt(P, en, gt), yt(P, Pn, Ct), yt(P, Cn, K), yt(P, Mn, T), yt(_, Cn, Ke), yt(_, Mn, _i), b.width = Mt(Ke * lt), b.height = Mt(_i * lt), R.forEach(({ _el: r, _show: a, _size: c, _pos: u, side: d }) => {
        if (r != null)
          if (a) {
            let m = d === 3 || d === 0 ? c : 0, v = d % 2 == 1;
            yt(r, v ? "left" : "top", u - m), yt(r, v ? "width" : "height", c), yt(r, v ? "top" : "left", v ? Ct : gt), yt(r, v ? "height" : "width", v ? T : K), dr(r, Ti);
          } else
            le(r, Ti);
      }), qn = Wi = Mo = zo = Oo = No = Ho = Lo = Do = null, Xt = 1, An(!0), gt != Fi || Ct != bi || K != Oe || T != vi) {
        Yi(!1);
        let r = K / Oe, a = T / vi;
        if (Wt && !yi && z.left >= 0) {
          z.left *= r, z.top *= a, Ki && Ue(Ki, Mt(z.left), 0, K, T), qi && Ue(qi, 0, Mt(z.top), K, T);
          for (let c = 0; c < ge.length; c++) {
            let u = ge[c];
            u != null && (Bi[c] *= r, ji[c] *= a, Ue(u, ve(Bi[c]), ve(ji[c]), K, T));
          }
        }
        if (bt.show && !Gn && bt.left >= 0 && bt.width > 0) {
          bt.left *= r, bt.width *= r, bt.top *= a, bt.height *= a;
          for (let c in Go)
            yt(Qi, c, bt[c]);
        }
        Fi = gt, bi = Ct, Oe = K, vi = T;
      }
      Rt("setSize"), Yn = !1;
    }
    Ke > 0 && _i > 0 && (g.clearRect(0, 0, b.width, b.height), Rt("drawClear"), G.forEach((r) => r()), Rt("draw")), bt.show && Gn && (Xn(bt), Gn = !1), Wt && yi && (Si(null, !0, !1), yi = !1), Q.show && Q.live && pe && (Wo(), pe = !1), f || (f = !0, n.status = 1, Rt("ready")), wn = !1, Qn = !1;
  }
  n.redraw = (r, a) => {
    Ui = a || !1, r !== !1 ? ri(M, S.min, S.max) : Gi();
  };
  function Vo(r, a) {
    let c = $[r];
    if (c.from == null) {
      if (Ut == 0) {
        let u = c.range(n, a.min, a.max, r);
        a.min = u[0], a.max = u[1];
      }
      if (a.min > a.max) {
        let u = a.min;
        a.min = a.max, a.max = u;
      }
      if (Ut > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      r == M && c.distr == 2 && Ut > 0 && (a.min = Ce(a.min, e[0]), a.max = Ce(a.max, e[0]), a.min == a.max && a.max++), H[r] = a, Po = !0, Gi();
    }
  }
  n.setScale = Vo;
  let Bo, jo, Ki, qi, is, ns, Zi, Ji, os, rs, _t, $t, oi = !1;
  const It = z.drag;
  let Ht = It.x, Lt = It.y;
  Wt && (z.x && (Bo = be(Zc, P)), z.y && (jo = be(Jc, P)), S.ori == 0 ? (Ki = Bo, qi = jo) : (Ki = jo, qi = Bo), _t = z.left, $t = z.top);
  const bt = n.select = Pt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, t.select), Qi = bt.show ? be(qc, bt.over ? P : k) : null;
  function Xn(r, a) {
    if (bt.show) {
      for (let c in r)
        bt[c] = r[c], c in Go && yt(Qi, c, r[c]);
      a !== !1 && Rt("setSelect");
    }
  }
  n.setSelect = Xn;
  function La(r) {
    if (x[r].show)
      Tt && dr(St[r], Ti);
    else if (Tt && le(St[r], Ti), Wt) {
      let c = Vi ? ge[0] : ge[r];
      c != null && Ue(c, -10, -10, K, T);
    }
  }
  function ri(r, a, c) {
    Vo(r, { min: a, max: c });
  }
  function He(r, a, c, u) {
    a.focus != null && Va(r), a.show != null && x.forEach((d, m) => {
      m > 0 && (r == m || r == null) && (d.show = a.show, La(m), o == 2 ? (ri(d.facets[0].scale, null, null), ri(d.facets[1].scale, null, null)) : ri(d.scale, null, null), Gi());
    }), c !== !1 && Rt("setSeries", r, a), u && kn("setSeries", n, r, a);
  }
  n.setSeries = He;
  function Ra(r, a) {
    Pt(Z[r], a);
  }
  function Fa(r, a) {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1), a = a ?? Z.length, Z.splice(a, 0, r);
  }
  function Ua(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  n.addBand = Fa, n.setBand = Ra, n.delBand = Ua;
  function Ia(r, a) {
    x[r].alpha = a, Wt && ge[r] != null && (ge[r].style.opacity = a), Tt && St[r] && (St[r].style.opacity = a);
  }
  let qe, si, $i;
  const Xi = { focus: !0 };
  function Va(r) {
    if (r != $i) {
      let a = r == null, c = Ne.alpha != 1;
      x.forEach((u, d) => {
        if (o == 1 || d > 0) {
          let m = a || d == 0 || d == r;
          u._focus = a ? null : m, c && Ia(d, m ? 1 : Ne.alpha);
        }
      }), $i = r, c && Gi();
    }
  }
  Tt && Ii && Yt(Hs, ct, (r) => {
    z._lock || (wi(r), $i != null && He(null, Xi, !0, Et.setSeries));
  });
  function Le(r, a, c) {
    let u = $[a];
    c && (r = r / lt - (u.ori == 1 ? Ct : gt));
    let d = K;
    u.ori == 1 && (d = T, r = d - r), u.dir == -1 && (r = d - r);
    let m = u._min, v = u._max, y = r / d, w = m + (v - m) * y, A = u.distr;
    return A == 3 ? cn(10, w) : A == 4 ? pu(w, u.asinh) : A == 100 ? u.bwd(w) : w;
  }
  function Ba(r, a) {
    let c = Le(r, M, a);
    return Ce(c, e[0], Ot, Nt);
  }
  n.valToIdx = (r) => Ce(r, e[0]), n.posToIdx = Ba, n.posToVal = Le, n.valToPos = (r, a, c) => $[a].ori == 0 ? s(
    r,
    $[a],
    c ? Qt : K,
    c ? ne : 0
  ) : l(
    r,
    $[a],
    c ? Se : T,
    c ? de : 0
  ), n.setCursor = (r, a, c) => {
    _t = r.left, $t = r.top, Si(null, a, c);
  };
  function ss(r, a) {
    yt(Qi, en, bt.left = r), yt(Qi, Cn, bt.width = a);
  }
  function ls(r, a) {
    yt(Qi, Pn, bt.top = r), yt(Qi, Mn, bt.height = a);
  }
  let $n = S.ori == 0 ? ss : ls, Sn = S.ori == 1 ? ss : ls;
  function ja() {
    if (Tt && Q.live)
      for (let r = o == 2 ? 1 : 0; r < x.length; r++) {
        if (r == 0 && fe)
          continue;
        let a = Q.values[r], c = 0;
        for (let u in a)
          ze[r][c++].firstChild.nodeValue = a[u];
      }
  }
  function Wo(r, a) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      ht[u] = c;
    }) : bu(r.idx) || ht.fill(r.idx), Q.idx = ht[0]), Tt && Q.live) {
      for (let c = 0; c < x.length; c++)
        (c > 0 || o == 1 && !fe) && Wa(c, ht[c]);
      ja();
    }
    pe = !1, a !== !1 && Rt("setLegend");
  }
  n.setLegend = Wo;
  function Wa(r, a) {
    let c = x[r], u = r == 0 && q == 2 ? Ae : e[r], d;
    fe ? d = c.values(n, r, a) ?? ii : (d = c.value(n, a == null ? null : u[a], r, a), d = d == null ? ii : { _: d }), Q.values[r] = d;
  }
  function Si(r, a, c) {
    os = _t, rs = $t, [_t, $t] = z.move(n, _t, $t), z.left = _t, z.top = $t, Wt && (Ki && Ue(Ki, Mt(_t), 0, K, T), qi && Ue(qi, 0, Mt($t), K, T));
    let u, d = Ot > Nt;
    qe = dt, si = null;
    let m = S.ori == 0 ? K : T, v = S.ori == 1 ? K : T;
    if (_t < 0 || Ut == 0 || d) {
      u = z.idx = null;
      for (let y = 0; y < x.length; y++) {
        let w = ge[y];
        w != null && Ue(w, -10, -10, K, T);
      }
      Ii && He(null, Xi, !0, r == null && Et.setSeries), Q.live && (ht.fill(u), pe = !0);
    } else {
      let y, w, A;
      o == 1 && (y = S.ori == 0 ? _t : $t, w = Le(y, M), u = z.idx = Ce(w, e[0], Ot, Nt), A = D(e[0][u], S, m, 0));
      let E = -10, C = -10, j = 0, st = 0, ot = !0, X = "", I = "";
      for (let O = o == 2 ? 1 : 0; O < x.length; O++) {
        let vt = x[O], At = ht[O], Ft = At == null ? null : o == 1 ? e[O][At] : e[O][1][At], ft = z.dataIdx(n, O, u, w), kt = ft == null ? null : o == 1 ? e[O][ft] : e[O][1][ft];
        if (pe = pe || kt != Ft || ft != At, ht[O] = ft, O > 0 && vt.show) {
          let oe = ft == null ? -10 : ft == u ? A : D(o == 1 ? e[0][ft] : e[O][0][ft], S, m, 0), Gt = kt == null ? -10 : B(kt, o == 1 ? $[vt.scale] : $[vt.facets[1].scale], v, 0);
          if (Ii && kt != null) {
            let me = S.ori == 1 ? _t : $t, ke = Dt(Ne.dist(n, O, ft, Gt, me));
            if (ke < qe) {
              let Re = Ne.bias;
              if (Re != 0) {
                let re = Le(me, vt.scale), _e = kt >= 0 ? 1 : -1, Ee = re >= 0 ? 1 : -1;
                Ee == _e && (Ee == 1 ? Re == 1 ? kt >= re : kt <= re : (
                  // >= 0
                  Re == 1 ? kt <= re : kt >= re
                )) && (qe = ke, si = O);
              } else
                qe = ke, si = O;
            }
          }
          if (pe || Vi) {
            let me, ke;
            S.ori == 0 ? (me = oe, ke = Gt) : (me = Gt, ke = oe);
            let Re, re, _e, Ee, Fe, Kt, se = !0, Ai = Bt.bbox;
            if (Ai != null) {
              se = !1;
              let qt = Ai(n, O);
              _e = qt.left, Ee = qt.top, Re = qt.width, re = qt.height;
            } else
              _e = me, Ee = ke, Re = re = Bt.size(n, O);
            if (Kt = Bt.fill(n, O), Fe = Bt.stroke(n, O), Vi)
              O == si && qe <= Ne.prox && (E = _e, C = Ee, j = Re, st = re, ot = se, X = Kt, I = Fe);
            else {
              let qt = ge[O];
              qt != null && (Bi[O] = _e, ji[O] = Ee, Bs(qt, Re, re, se), Is(qt, Kt, Fe), Ue(qt, ve(_e), ve(Ee), K, T));
            }
          }
        }
      }
      if (Vi) {
        let O = Ne.prox, vt = $i == null ? qe <= O : qe > O || si != $i;
        if (pe || vt) {
          let At = ge[0];
          At != null && (Bi[0] = E, ji[0] = C, Bs(At, j, st, ot), Is(At, X, I), Ue(At, ve(E), ve(C), K, T));
        }
      }
    }
    if (bt.show && oi)
      if (r != null) {
        let [y, w] = Et.scales, [A, E] = Et.match, [C, j] = r.cursor.sync.scales, st = r.cursor.drag;
        if (Ht = st._x, Lt = st._y, Ht || Lt) {
          let { left: ot, top: X, width: I, height: O } = r.select, vt = r.scales[C].ori, At = r.posToVal, Ft, ft, kt, oe, Gt, me = y != null && A(y, C), ke = w != null && E(w, j);
          me && Ht ? (vt == 0 ? (Ft = ot, ft = I) : (Ft = X, ft = O), kt = $[y], oe = D(At(Ft, C), kt, m, 0), Gt = D(At(Ft + ft, C), kt, m, 0), $n(Me(oe, Gt), Dt(Gt - oe))) : $n(0, m), ke && Lt ? (vt == 1 ? (Ft = ot, ft = I) : (Ft = X, ft = O), kt = $[w], oe = B(At(Ft, j), kt, v, 0), Gt = B(At(Ft + ft, j), kt, v, 0), Sn(Me(oe, Gt), Dt(Gt - oe))) : Sn(0, v);
        } else
          Ko();
      } else {
        let y = Dt(os - is), w = Dt(rs - ns);
        if (S.ori == 1) {
          let j = y;
          y = w, w = j;
        }
        Ht = It.x && y >= It.dist, Lt = It.y && w >= It.dist;
        let A = It.uni;
        A != null ? Ht && Lt && (Ht = y >= A, Lt = w >= A, !Ht && !Lt && (w > y ? Lt = !0 : Ht = !0)) : It.x && It.y && (Ht || Lt) && (Ht = Lt = !0);
        let E, C;
        Ht && (S.ori == 0 ? (E = Zi, C = _t) : (E = Ji, C = $t), $n(Me(E, C), Dt(C - E)), Lt || Sn(0, v)), Lt && (S.ori == 1 ? (E = Zi, C = _t) : (E = Ji, C = $t), Sn(Me(E, C), Dt(C - E)), Ht || $n(0, m)), !Ht && !Lt && ($n(0, 0), Sn(0, 0));
      }
    if (It._x = Ht, It._y = Lt, r == null) {
      if (c) {
        if (bs != null) {
          let [y, w] = Et.scales;
          Et.values[0] = y != null ? Le(S.ori == 0 ? _t : $t, y) : null, Et.values[1] = w != null ? Le(S.ori == 1 ? _t : $t, w) : null;
        }
        kn(tr, n, _t, $t, K, T, u);
      }
      if (Ii) {
        let y = c && Et.setSeries, w = Ne.prox;
        $i == null ? qe <= w && He(si, Xi, !0, y) : qe > w ? He(null, Xi, !0, y) : si != $i && He(si, Xi, !0, y);
      }
    }
    pe && (Q.idx = u, Wo()), a !== !1 && Rt("setCursor");
  }
  let li = null;
  Object.defineProperty(n, "rect", {
    get() {
      return li == null && An(!1), li;
    }
  });
  function An(r = !1) {
    r ? li = null : (li = P.getBoundingClientRect(), Rt("syncRect", li));
  }
  function as(r, a, c, u, d, m, v) {
    z._lock || oi && r != null && r.movementX == 0 && r.movementY == 0 || (Yo(r, a, c, u, d, m, v, !1, r != null), r != null ? Si(null, !0, !0) : Si(a, !0, !1));
  }
  function Yo(r, a, c, u, d, m, v, y, w) {
    if (li == null && An(!1), wi(r), r != null)
      c = r.clientX - li.left, u = r.clientY - li.top;
    else {
      if (c < 0 || u < 0) {
        _t = -10, $t = -10;
        return;
      }
      let [A, E] = Et.scales, C = a.cursor.sync, [j, st] = C.values, [ot, X] = C.scales, [I, O] = Et.match, vt = a.axes[0].side % 2 == 1, At = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, ft = vt ? m : d, kt = vt ? d : m, oe = vt ? u : c, Gt = vt ? c : u;
      if (ot != null ? c = I(A, ot) ? h(j, $[A], At, 0) : -10 : c = At * (oe / ft), X != null ? u = O(E, X) ? h(st, $[E], Ft, 0) : -10 : u = Ft * (Gt / kt), S.ori == 1) {
        let me = c;
        c = u, u = me;
      }
    }
    w && (a == null || a.cursor.event.type == tr) && ((c <= 1 || c >= K - 1) && (c = Ei(c, K)), (u <= 1 || u >= T - 1) && (u = Ei(u, T))), y ? (is = c, ns = u, [Zi, Ji] = z.move(n, c, u)) : (_t = c, $t = u);
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
  let cs, us, hs, fs;
  function ds(r, a, c, u, d, m, v) {
    oi = !0, Ht = Lt = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !0, !1), r != null && (Yt(er, hr, ps, !1), kn(Os, n, Zi, Ji, K, T, null));
    let { left: y, top: w, width: A, height: E } = bt;
    cs = y, us = w, hs = A, fs = E;
  }
  function ps(r, a, c, u, d, m, v) {
    oi = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !1, !0);
    let { left: y, top: w, width: A, height: E } = bt, C = A > 0 || E > 0, j = cs != y || us != w || hs != A || fs != E;
    if (C && j && Xn(bt), It.setScale && C && j) {
      let st = y, ot = A, X = w, I = E;
      if (S.ori == 1 && (st = w, ot = E, X = y, I = A), Ht && ri(
        M,
        Le(st, M),
        Le(st + ot, M)
      ), Lt)
        for (let O in $) {
          let vt = $[O];
          O != M && vt.from == null && vt.min != dt && ri(
            O,
            Le(X + I, O),
            Le(X, O)
          );
        }
      Ko();
    } else z.lock && (z._lock = !z._lock, Si(a, !0, r != null));
    r != null && (Ri(er, hr), kn(er, n, _t, $t, K, T, null));
  }
  function Ya(r, a, c, u, d, m, v) {
    if (z._lock)
      return;
    wi(r);
    let y = oi;
    if (oi) {
      let w = !0, A = !0, E = 10, C, j;
      S.ori == 0 ? (C = Ht, j = Lt) : (C = Lt, j = Ht), C && j && (w = _t <= E || _t >= K - E, A = $t <= E || $t >= T - E), C && w && (_t = _t < Zi ? 0 : K), j && A && ($t = $t < Ji ? 0 : T), Si(null, !0, !0), oi = !1;
    }
    _t = -10, $t = -10, ht.fill(null), Si(null, !0, !0), y && (oi = y);
  }
  function gs(r, a, c, u, d, m, v) {
    z._lock || (wi(r), Co(), Ko(), r != null && kn(Ls, n, _t, $t, K, T, null));
  }
  function ms() {
    R.forEach(Oh), To(n.width, n.height, !0);
  }
  Mi(fo, sn, ms);
  const tn = {};
  tn.mousedown = ds, tn.mousemove = as, tn.mouseup = ps, tn.dblclick = gs, tn.setSeries = (r, a, c, u) => {
    let d = Et.match[2];
    c = d(n, a, c), c != -1 && He(c, u, !0, !1);
  }, Wt && (Yt(Os, P, ds), Yt(tr, P, as), Yt(Ns, P, (r) => {
    wi(r), An(!1);
  }), Yt(Hs, P, Ya), Yt(Ls, P, gs), vr.add(n), n.syncRect = An);
  const to = n.hooks = t.hooks || {};
  function Rt(r, a, c) {
    Io ? xn.push([r, a, c]) : r in to && to[r].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (t.plugins || []).forEach((r) => {
    for (let a in r.hooks)
      to[a] = (to[a] || []).concat(r.hooks[a]);
  });
  const _s = (r, a, c) => c, Et = Pt({
    key: null,
    setSeries: !1,
    filters: {
      pub: Ks,
      sub: Ks
    },
    scales: [M, x[1] ? x[1].scale : null],
    match: [qs, qs, _s],
    values: [null, null]
  }, z.sync);
  Et.match.length == 2 && Et.match.push(_s), z.sync = Et;
  const bs = Et.key, qo = la(bs);
  function kn(r, a, c, u, d, m, v) {
    Et.filters.pub(r, a, c, u, d, m, v) && qo.pub(r, a, c, u, d, m, v);
  }
  qo.sub(n);
  function Ga(r, a, c, u, d, m, v) {
    Et.filters.sub(r, a, c, u, d, m, v) && tn[r](null, a, c, u, d, m, v);
  }
  n.pub = Ga;
  function Ka() {
    qo.unsub(n), vr.delete(n), mi.clear(), pr(fo, sn, ms), p.remove(), ct?.remove(), Rt("destroy");
  }
  n.destroy = Ka;
  function Zo() {
    Rt("init", t, e), Kr(e || t.data, !1), H[M] ? Vo(M, H[M]) : Co(), Gn = bt.show && (bt.width > 0 || bt.height > 0), yi = pe = !0, To(t.width, t.height);
  }
  return x.forEach(Yr), R.forEach(ka), i ? i instanceof HTMLElement ? (i.appendChild(p), Zo()) : i(n, Zo) : Zo(), n;
}
jt.assign = Pt;
jt.fmtNum = zr;
jt.rangeNum = po;
jt.rangeLog = yo;
jt.rangeAsinh = Mr;
jt.orient = Ni;
jt.pxRatio = lt;
jt.join = Au;
jt.fmtDate = Nr, jt.tzDate = Hu;
jt.sync = la;
{
  jt.addGap = bh, jt.clipGaps = $o;
  let t = jt.paths = {
    points: da
  };
  t.linear = ga, t.stepped = wh, t.bars = xh, t.spline = Sh;
}
const Nh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Hh = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, Ye = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Lh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Hh(e, i, o), o;
};
const Rh = 24;
let we = class extends Vt {
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
    const t = /* @__PURE__ */ new Date(), e = new Date(t.getTime() - Rh * 60 * 60 * 1e3), i = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
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
              g <= b || (l.fillStyle = p.action === "heating" ? _l(i, 0.18) : _l(n, 0.18), l.fillRect(b, h, g - b, f));
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
we.styles = [
  ue,
  xl(Nh),
  ee`
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
], we.prototype, "hass", 2);
Ye([
  Y({ type: String })
], we.prototype, "roomEntity", 2);
Ye([
  Y({ type: String })
], we.prototype, "lowEntity", 2);
Ye([
  Y({ type: String })
], we.prototype, "highEntity", 2);
Ye([
  Y({ type: String })
], we.prototype, "actionEntity", 2);
Ye([
  mt()
], we.prototype, "_loading", 2);
Ye([
  mt()
], we.prototype, "_error", 2);
Ye([
  mt()
], we.prototype, "_empty", 2);
Ye([
  Bn(".chart-host")
], we.prototype, "_host", 2);
we = Ye([
  ce("comfort-band-history-chart")
], we);
function _l(t, e) {
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
var Fh = Object.defineProperty, Uh = Object.getOwnPropertyDescriptor, Vr = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Uh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Fh(e, i, o), o;
};
let Un = class extends Vt {
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
Un.styles = [
  ue,
  ee`
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
Vr([
  Y({ attribute: !1 })
], Un.prototype, "hass", 2);
Vr([
  Y({ attribute: !1 })
], Un.prototype, "entities", 2);
Un = Vr([
  ce("comfort-band-insights-tab")
], Un);
var Ih = Object.defineProperty, Vh = Object.getOwnPropertyDescriptor, bn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Vh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Ih(e, i, o), o;
};
const Qe = 15, Ve = 0.5, Ze = 14, Ie = 28, bl = 4, Bh = 500, nn = 600, oo = 200, jh = 0, Wh = 24 * 60 - Qe, sr = [0, 6, 12, 18, 24], vl = [14, 18, 22, 26];
function Je(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t);
  return e ? parseInt(e[1], 10) * 60 + parseInt(e[2], 10) : 0;
}
function lr(t) {
  const e = Math.floor(t / 60), i = t % 60;
  return `${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
function Yh(t) {
  return Math.round(t / Qe) * Qe;
}
function ar(t) {
  return Math.round(t / Ve) * Ve;
}
function Pe(t, e, i) {
  return Math.min(i, Math.max(e, t));
}
let di = class extends Vt {
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
        longPressed: !1
      };
      o.longPressTimer = window.setTimeout(() => {
        this._drag === o && !o.moved && (o.longPressed = !0, this._fire("transition-delete", { at: e.at }));
      }, Bh), this._drag = o;
    }, this._onHandlePointerMove = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "handle" || e.longPressed) return;
      const i = t.clientX - e.startX, n = t.clientY - e.startY;
      if (!e.moved && Math.hypot(i, n) < bl) return;
      e.moved || (e.moved = !0, e.longPressTimer !== null && (window.clearTimeout(e.longPressTimer), e.longPressTimer = null));
      const o = this._svg();
      if (!o) return;
      const s = o.getBoundingClientRect(), l = this._timeRangeFor(e.origin.at), h = Pe(this._clientToMinutes(t.clientX, s), l.min, l.max), f = this._clientToTemp(t.clientY, s);
      let p = e.origin.low, b = e.origin.high;
      e.handle === "low" ? p = Pe(f, Ze, b - Ve) : b = Pe(f, p + Ve, Ie), this._preview = { at: lr(h), low: p, high: b };
    }, this._onHandlePointerUp = (t, e) => {
      const i = this._drag;
      if (!i || i.kind !== "handle") return;
      const n = t.currentTarget;
      try {
        n.releasePointerCapture(t.pointerId);
      } catch {
      }
      i.longPressTimer !== null && (window.clearTimeout(i.longPressTimer), i.longPressTimer = null);
      const o = this._preview;
      if (this._drag = null, this._preview = null, !i.longPressed) {
        if (!i.moved) {
          this._fire("transition-edit", { transition: e });
          return;
        }
        o && this._fire("transition-update", {
          oldAt: e.at,
          transition: { at: o.at, low: o.low, high: o.high }
        });
      }
    }, this._onBackgroundPointerDown = (t) => {
      const e = this._svg();
      if (!e) return;
      e.setPointerCapture(t.pointerId);
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
      Math.hypot(i, n) >= bl && (e.moved = !0);
    }, this._onBackgroundPointerUp = (t) => {
      const e = this._drag;
      if (!e || e.kind !== "empty")
        return;
      const i = this._svg();
      try {
        i?.releasePointerCapture(t.pointerId);
      } catch {
      }
      const n = e.moved;
      if (this._drag = null, n || !i) return;
      const o = i.getBoundingClientRect(), s = this._clientToMinutes(t.clientX, o);
      for (const p of this.transitions) if (Je(p.at) === s) return;
      const l = this._clientToTemp(t.clientY, o), h = Pe(ar(l - 1.5), Ze, Ie - Ve), f = Pe(ar(l + 1.5), h + Ve, Ie);
      this._fire("transition-add", { at: lr(s), low: h, high: f });
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
          n = -Qe;
          break;
        case "ArrowRight":
          n = Qe;
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
      const s = this._timeRangeFor(e.at), l = Pe(Je(e.at) + n, s.min, s.max);
      let h = e.low, f = e.high;
      i === "low" ? h = Pe(e.low + o, Ze, f - Ve) : f = Pe(e.high + o, h + Ve, Ie), !(l === Je(e.at) && h === e.low && f === e.high) && this._fire("transition-update", {
        oldAt: e.at,
        transition: { at: lr(l), low: h, high: f }
      });
    }, this._onHandleFocus = (t, e) => {
      this._focusedAt = t.at, this._focusedHandle = e;
    }, this._onHandleBlur = () => {
      this._focusedAt = null, this._focusedHandle = null;
    };
  }
  disconnectedCallback() {
    this._drag && this._drag.kind === "handle" && this._drag.longPressTimer !== null && window.clearTimeout(this._drag.longPressTimer), super.disconnectedCallback();
  }
  _timeToX(t) {
    return t / (24 * 60) * nn;
  }
  _tempToY(t) {
    const e = Pe(t, Ze, Ie);
    return oo - (e - Ze) / (Ie - Ze) * oo;
  }
  _clientToMinutes(t, e) {
    if (e.width === 0) return 0;
    const i = Pe((t - e.left) / e.width, 0, 1);
    return Yh(i * 24 * 60);
  }
  _clientToTemp(t, e) {
    if (e.height === 0) return Ze;
    const i = Pe((t - e.top) / e.height, 0, 1), n = Ie - i * (Ie - Ze);
    return ar(n);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((t) => Je(t.at)).sort((t, e) => t - e);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(t) {
    const e = Je(t), i = this._sortedAts().filter((s) => s !== e);
    let n = jh, o = Wh;
    for (const s of i)
      s < e && s + Qe > n && (n = s + Qe), s > e && s - Qe < o && (o = s - Qe);
    return { min: n, max: o };
  }
  _fire(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const t = [...this.transitions].sort((i, n) => i.at.localeCompare(n.at));
    if (!this._preview || !this._drag || this._drag.kind !== "handle") return t;
    const e = this._drag;
    return t.map(
      (i) => i.at === e.origin.at ? { at: this._preview.at, low: this._preview.low, high: this._preview.high } : i
    );
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00. */
  _stepPoints(t, e) {
    const i = [...t].sort((l, h) => Je(l.at) - Je(h.at)), n = i[i.length - 1][e], o = [[0, this._tempToY(n)]];
    let s = n;
    for (const l of i) {
      const h = this._timeToX(Je(l.at));
      o.push([h, this._tempToY(s)]), o.push([h, this._tempToY(l[e])]), s = l[e];
    }
    return o.push([nn, this._tempToY(s)]), o;
  }
  _stepPath(t, e) {
    return t.length === 0 ? "" : this._stepPoints(t, e).map(([n, o], s) => `${s === 0 ? "M" : "L"} ${n} ${o}`).join(" ");
  }
  _fillPath(t) {
    if (t.length === 0) return "";
    const e = this._stepPoints(t, "high"), i = this._stepPoints(t, "low"), n = e.map(([s, l], h) => `${h === 0 ? "M" : "L"} ${s} ${l}`).join(" "), o = i.slice().reverse().map(([s, l]) => `L ${s} ${l}`).join(" ");
    return `${n} ${o} Z`;
  }
  render() {
    const t = this._renderedTransitions(), e = this._stepPath(t, "low"), i = this._stepPath(t, "high"), n = this._fillPath(t);
    return F`
      <div class="chart">
        <svg
          viewBox="0 0 ${nn} ${oo}"
          preserveAspectRatio="none"
          role="img"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          ${vl.map(
      (o) => ui`<line class="grid" x1="0" x2=${nn} y1=${this._tempToY(o)} y2=${this._tempToY(o)}></line>`
    )}
          ${sr.map(
      (o) => ui`<line class="grid" y1="0" y2=${oo} x1=${o / 24 * nn} x2=${o / 24 * nn}></line>`
    )}
          ${t.length > 0 ? ui`
                <path class="fill" d=${n}></path>
                <path class="line low" d=${e}></path>
                <path class="line high" d=${i}></path>
              ` : null}
          ${t.map((o) => {
      const s = this._timeToX(Je(o.at)), l = this._tempToY(o.low), h = this._tempToY(o.high), f = this._focusedAt === o.at && this._focusedHandle === "low", p = this._focusedAt === o.at && this._focusedHandle === "high", b = `Low handle at ${o.at}, ${o.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, g = `High handle at ${o.at}, ${o.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`;
      return ui`
              <circle
                class=${`handle low${f ? " focused" : ""}`}
                cx=${s}
                cy=${l}
                r="8"
                tabindex="0"
                role="slider"
                aria-label=${b}
                data-at=${o.at}
                data-handle="low"
                @pointerdown=${(_) => this._onHandlePointerDown(_, o, "low")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${(_) => this._onHandlePointerUp(_, o)}
                @pointercancel=${(_) => this._onHandlePointerUp(_, o)}
                @keydown=${(_) => this._onHandleKeyDown(_, o, "low")}
                @focus=${() => this._onHandleFocus(o, "low")}
                @blur=${this._onHandleBlur}
              ></circle>
              <circle
                class=${`handle high${p ? " focused" : ""}`}
                cx=${s}
                cy=${h}
                r="8"
                tabindex="0"
                role="slider"
                aria-label=${g}
                data-at=${o.at}
                data-handle="high"
                @pointerdown=${(_) => this._onHandlePointerDown(_, o, "high")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${(_) => this._onHandlePointerUp(_, o)}
                @pointercancel=${(_) => this._onHandlePointerUp(_, o)}
                @keydown=${(_) => this._onHandleKeyDown(_, o, "high")}
                @focus=${() => this._onHandleFocus(o, "high")}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
    })}
        </svg>
        ${vl.map(
      (o) => F`<div
              class="axis-label y"
              style="top: ${(Ie - o) / (Ie - Ze) * 100}%"
            >
              ${o}°
            </div>`
    )}
        ${sr.map((o, s) => {
      const l = s === 0 ? "axis-label x start" : s === sr.length - 1 ? "axis-label x end" : "axis-label x";
      return F`<div class=${l} style="left: ${o / 24 * 100}%">${o}h</div>`;
    })}
        ${this.transitions.length === 0 ? F`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
di.styles = [
  ue,
  ee`
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
  mt()
], di.prototype, "_drag", 2);
bn([
  mt()
], di.prototype, "_preview", 2);
bn([
  mt()
], di.prototype, "_focusedAt", 2);
bn([
  mt()
], di.prototype, "_focusedHandle", 2);
di = bn([
  ce("comfort-band-schedule-chart")
], di);
var Gh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, pi = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Kh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Gh(e, i, o), o;
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
Be.styles = [
  ue,
  ee`
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
  mt()
], Be.prototype, "_at", 2);
pi([
  mt()
], Be.prototype, "_low", 2);
pi([
  mt()
], Be.prototype, "_high", 2);
pi([
  mt()
], Be.prototype, "_error", 2);
pi([
  Bn('input[name="at"]')
], Be.prototype, "_atInput", 2);
Be = pi([
  ce("transition-edit-dialog")
], Be);
var qh = Object.defineProperty, Zh = Object.getOwnPropertyDescriptor, xe = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zh(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && qh(e, i, o), o;
};
let te = class extends Vt {
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
      const { oldAt: e, transition: i } = t.detail, n = this._transitions.filter((o) => o.at !== e && o.at !== i.at).concat(i).sort((o, s) => o.at.localeCompare(s.at));
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
      i.sort((n, o) => n.at.localeCompare(o.at)), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (t) => {
      const e = this._transitions.filter((i) => i.at !== t.detail.at);
      await this._writeSchedule(e), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._profile === "" && (this._profile = yl(this.hass) ?? "home", this._subscribe());
  }
  updated(t) {
    if (t.has("hass") && this.hass) {
      const e = yl(this.hass);
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
      const e = await kc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          t === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline] : [], this._loading = !1);
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
    if (this.hass)
      try {
        await Ec(this.hass, {
          zone: this.zone,
          profile: this._profile,
          transitions: t
        }), this._transitions = t;
      } catch (e) {
        this._error = e instanceof Error ? e.message : "Failed to save schedule.";
      }
  }
  render() {
    if (!this.hass) return at;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : {
        at: this._newAt,
        low: this._newLow ?? Jh(this._transitions),
        high: this._newHigh ?? Qh(this._transitions)
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
te.styles = [
  ue,
  ee`
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
xe([
  Y({ attribute: !1 })
], te.prototype, "hass", 2);
xe([
  Y({ type: String })
], te.prototype, "zone", 2);
xe([
  mt()
], te.prototype, "_profile", 2);
xe([
  mt()
], te.prototype, "_transitions", 2);
xe([
  mt()
], te.prototype, "_loading", 2);
xe([
  mt()
], te.prototype, "_error", 2);
xe([
  mt()
], te.prototype, "_mode", 2);
xe([
  mt()
], te.prototype, "_editing", 2);
xe([
  mt()
], te.prototype, "_newAt", 2);
xe([
  mt()
], te.prototype, "_newLow", 2);
xe([
  mt()
], te.prototype, "_newHigh", 2);
te = xe([
  ce("comfort-band-schedule-tab")
], te);
function yl(t) {
  const e = Ml(t);
  return e ? t.states[e]?.state ?? null : null;
}
function Jh(t) {
  return t.length === 0 ? 19 : t[t.length - 1].low;
}
function Qh(t) {
  return t.length === 0 ? 22 : t[t.length - 1].high;
}
var Xh = Object.defineProperty, tf = Object.getOwnPropertyDescriptor, gi = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? tf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && Xh(e, i, o), o;
};
const ef = [
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
            ${ef.map(
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
je.styles = [
  ue,
  ee`
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
  mt()
], je.prototype, "_activeTab", 2);
gi([
  mt()
], je.prototype, "_isOpen", 2);
gi([
  Bn("dialog")
], je.prototype, "_dialog", 2);
je = gi([
  ce("comfort-band-modal")
], je);
var nf = Object.defineProperty, of = Object.getOwnPropertyDescriptor, Br = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? of(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && nf(e, i, o), o;
};
let In = class extends Vt {
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
      (i) => F` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
In.styles = [
  ue,
  ee`
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
Br([
  Y({ attribute: !1 })
], In.prototype, "hass", 2);
Br([
  Y({ attribute: !1 })
], In.prototype, "config", 2);
In = Br([
  ce("comfort-band-card-editor")
], In);
var rf = Object.defineProperty, sf = Object.getOwnPropertyDescriptor, Eo = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? sf(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (o = (n ? l(e, i, o) : l(o)) || o);
  return n && o && rf(e, i, o), o;
};
let dn = class extends Vt {
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
    if (!this._config || !this.hass) return F``;
    const t = this._config.zone, e = Lc(this.hass, t);
    if (e.deviceId === null)
      return F`<div class="placeholder">
        Comfort Band zone <code>${t}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, e);
    return F`
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
      ${i ? null : F`<comfort-band-modal
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
dn.styles = [
  ue,
  ee`
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
  mt()
], dn.prototype, "_config", 2);
Eo([
  Bn("comfort-band-modal")
], dn.prototype, "_modal", 2);
dn = Eo([
  ce("comfort-band-card")
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
