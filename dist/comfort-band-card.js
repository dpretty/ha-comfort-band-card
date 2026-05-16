const ro = globalThis, wr = ro.ShadowRoot && (ro.ShadyCSS === void 0 || ro.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xr = Symbol(), ys = /* @__PURE__ */ new WeakMap();
let $l = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== xr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (wr && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = ys.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ys.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Sl = (e) => new $l(typeof e == "string" ? e : e + "", void 0, xr), te = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new $l(n, e, xr);
}, Ja = (e, t) => {
  if (wr) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = ro.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, ws = wr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Sl(n);
})(e) : e;
const { is: Qa, defineProperty: Xa, getOwnPropertyDescriptor: tc, getOwnPropertyNames: ec, getOwnPropertySymbols: ic, getPrototypeOf: nc } = Object, mo = globalThis, xs = mo.trustedTypes, oc = xs ? xs.emptyScript : "", rc = mo.reactiveElementPolyfillSupport, zn = (e, t) => e, lo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? oc : null;
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
} }, $r = (e, t) => !Qa(e, t), $s = { attribute: !0, type: String, converter: lo, reflect: !1, useDefault: !1, hasChanged: $r };
Symbol.metadata ??= Symbol("metadata"), mo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let on = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = $s) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Xa(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = tc(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? $s;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zn("elementProperties"))) return;
    const t = nc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zn("properties"))) {
      const n = this.properties, i = [...ec(n), ...ic(n)];
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
      for (const o of i) n.unshift(ws(o));
    } else t !== void 0 && n.push(ws(t));
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
    return Ja(t, this.constructor.elementStyles), t;
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
      if (o === !1 && (s = this[t]), i ??= l.getPropertyOptions(t), !((i.hasChanged ?? $r)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, i)))) return;
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
on.elementStyles = [], on.shadowRootOptions = { mode: "open" }, on[zn("elementProperties")] = /* @__PURE__ */ new Map(), on[zn("finalized")] = /* @__PURE__ */ new Map(), rc?.({ ReactiveElement: on }), (mo.reactiveElementVersions ??= []).push("2.1.2");
const Sr = globalThis, Ss = (e) => e, ao = Sr.trustedTypes, As = ao ? ao.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Al = "$lit$", ci = `lit$${Math.random().toFixed(9).slice(2)}$`, kl = "?" + ci, sc = `<${kl}>`, Di = document, Hn = () => Di.createComment(""), Ln = (e) => e === null || typeof e != "object" && typeof e != "function", Ar = Array.isArray, lc = (e) => Ar(e) || typeof e?.[Symbol.iterator] == "function", Jo = `[ 	
\f\r]`, En = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ks = /-->/g, Es = />/g, ki = RegExp(`>|${Jo}(?:([^\\s"'>=/]+)(${Jo}*=${Jo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ps = /'/g, Ts = /"/g, El = /^(?:script|style|textarea|title)$/i, Pl = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), F = Pl(1), ui = Pl(2), ln = Symbol.for("lit-noChange"), at = Symbol.for("lit-nothing"), Cs = /* @__PURE__ */ new WeakMap(), Ci = Di.createTreeWalker(Di, 129);
function Tl(e, t) {
  if (!Ar(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return As !== void 0 ? As.createHTML(t) : t;
}
const ac = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = En;
  for (let h = 0; h < n; h++) {
    const f = e[h];
    let p, b, g = -1, _ = 0;
    for (; _ < f.length && (l.lastIndex = _, b = l.exec(f), b !== null); ) _ = l.lastIndex, l === En ? b[1] === "!--" ? l = ks : b[1] !== void 0 ? l = Es : b[2] !== void 0 ? (El.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = ki) : b[3] !== void 0 && (l = ki) : l === ki ? b[0] === ">" ? (l = o ?? En, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? ki : b[3] === '"' ? Ts : Ps) : l === Ts || l === Ps ? l = ki : l === ks || l === Es ? l = En : (l = ki, o = void 0);
    const k = l === ki && e[h + 1].startsWith("/>") ? " " : "";
    s += l === En ? f + sc : g >= 0 ? (i.push(p), f.slice(0, g) + Al + f.slice(g) + ci + k) : f + ci + (g === -2 ? h : k);
  }
  return [Tl(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Rn {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, f = this.parts, [p, b] = ac(t, n);
    if (this.el = Rn.createElement(p, i), Ci.currentNode = this.el.content, n === 2 || n === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = Ci.nextNode()) !== null && f.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith(Al)) {
          const _ = b[l++], k = o.getAttribute(g).split(ci), P = /([.?@])?(.*)/.exec(_);
          f.push({ type: 1, index: s, name: P[2], strings: k, ctor: P[1] === "." ? uc : P[1] === "?" ? hc : P[1] === "@" ? fc : _o }), o.removeAttribute(g);
        } else g.startsWith(ci) && (f.push({ type: 6, index: s }), o.removeAttribute(g));
        if (El.test(o.tagName)) {
          const g = o.textContent.split(ci), _ = g.length - 1;
          if (_ > 0) {
            o.textContent = ao ? ao.emptyScript : "";
            for (let k = 0; k < _; k++) o.append(g[k], Hn()), Ci.nextNode(), f.push({ type: 2, index: ++s });
            o.append(g[_], Hn());
          }
        }
      } else if (o.nodeType === 8) if (o.data === kl) f.push({ type: 2, index: s });
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
class cc {
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
        f.type === 2 ? p = new Vn(s, s.nextSibling, this, t) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, t) : f.type === 6 && (p = new dc(s, this, t)), this._$AV.push(p), f = i[++h];
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
    t = an(this, t, n), Ln(t) ? t === at || t == null || t === "" ? (this._$AH !== at && this._$AR(), this._$AH = at) : t !== this._$AH && t !== ln && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : lc(t) ? this.k(t) : this._(t);
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
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Rn.createElement(Tl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new cc(o, this), l = s.u(this.options);
      s.p(n), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = Cs.get(t.strings);
    return n === void 0 && Cs.set(t.strings, n = new Rn(t)), n;
  }
  k(t) {
    Ar(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new Vn(this.O(Hn()), this.O(Hn()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = Ss(t).nextSibling;
      Ss(t).remove(), t = i;
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
class uc extends _o {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === at ? void 0 : t;
  }
}
class hc extends _o {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== at);
  }
}
class fc extends _o {
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
class dc {
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
const pc = Sr.litHtmlPolyfillSupport;
pc?.(Rn, Vn), (Sr.litHtmlVersions ??= []).push("3.3.2");
const gc = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new Vn(t.insertBefore(Hn(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const kr = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = gc(n, this.renderRoot, this.renderOptions);
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
const mc = kr.litElementPolyfillSupport;
mc?.({ LitElement: Vt });
(kr.litElementVersions ??= []).push("4.2.2");
const ae = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const _c = { attribute: !0, type: String, converter: lo, reflect: !1, hasChanged: $r }, bc = (e = _c, t, n) => {
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
  return (t, n) => typeof n == "object" ? bc(e, t, n) : ((i, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function $t(e) {
  return Y({ ...e, state: !0, attribute: !1 });
}
const vc = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function Bn(e, t) {
  return (n, i, o) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return vc(n, i, { get() {
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
function cr(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var yc = Object.defineProperty, wc = Object.getOwnPropertyDescriptor, jn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? wc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && yc(t, n, o), o;
};
const ur = 15, Cl = 28, xc = Cl - ur;
function Qo(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(ur, Math.min(Cl, e)) - ur) / xc * 100;
}
let zi = class extends Vt {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = uo(this.action), t = co(e), n = Number.isFinite(this.low), i = Number.isFinite(this.high), o = Number.isFinite(this.room), s = n ? Qo(this.low) : 0, l = i ? Qo(this.high) : 100, h = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = o ? Qo(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return F`
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
var $c = Object.defineProperty, Sc = Object.getOwnPropertyDescriptor, je = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Sc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && $c(t, n, o), o;
};
let ye = class extends Vt {
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
    const e = Ac(this.overrideEnds);
    return F`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = uo(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = co(e);
    return F`<span class="action-chip" style="background:${t}">
      ${cr(e)}
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
    const e = uo(this.action), t = e === "heating" || e === "cooling", n = t ? `--cb-mini-bg:${co(e)}` : "", i = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${cr(e)}` : ""}`;
    return F`
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
ye.styles = [
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
je([
  Y({ type: String })
], ye.prototype, "zoneName", 2);
je([
  Y({ type: Number })
], ye.prototype, "roomTemp", 2);
je([
  Y({ type: Number })
], ye.prototype, "low", 2);
je([
  Y({ type: Number })
], ye.prototype, "high", 2);
je([
  Y({ type: String })
], ye.prototype, "action", 2);
je([
  Y({ type: Boolean })
], ye.prototype, "overrideActive", 2);
je([
  Y({ type: String })
], ye.prototype, "overrideEnds", 2);
je([
  Y({ type: Boolean })
], ye.prototype, "noExpand", 2);
je([
  Y({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
ye = je([
  ae("comfort-band-tile")
], ye);
function Ac(e) {
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
var kc = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, ei = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ec(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && kc(t, n, o), o;
};
let Me = class extends Vt {
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
    return F`
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
Me.styles = [
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
], Me.prototype, "min", 2);
ei([
  Y({ type: Number })
], Me.prototype, "max", 2);
ei([
  Y({ type: Number })
], Me.prototype, "step", 2);
ei([
  Y({ type: Number })
], Me.prototype, "low", 2);
ei([
  Y({ type: Number })
], Me.prototype, "high", 2);
ei([
  Y({ type: String })
], Me.prototype, "unit", 2);
ei([
  $t()
], Me.prototype, "_dragging", 2);
ei([
  Bn(".track")
], Me.prototype, "_track", 2);
Me = ei([
  ae("dual-handle-slider")
], Me);
const bo = "comfort_band";
function Pc(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Tc(e, t) {
  return e.callService(bo, "set_schedule", { ...t });
}
function Cc(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), e.callService(bo, "start_override", n);
}
function Mc(e, t) {
  return e.callService(bo, "cancel_override", { ...t });
}
function Dc(e, t) {
  return e.callService(bo, "set_profile", { ...t });
}
var zc = Object.defineProperty, Oc = Object.getOwnPropertyDescriptor, pn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Oc(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && zc(t, n, o), o;
};
const Nc = [1, 3, 6];
let hi = class extends Vt {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Cc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || Mc(this.hass, { zone: this.zone });
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
    return F`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${g ? F`<span class="action-chip" style="background:${co(b)}"
              >${cr(b)}</span
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
    const t = this._stateOf(this.entities.overrideEnds)?.state, n = Hc(t ?? null);
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
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? F`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Nc.map(
      (t) => F`
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
function Hc(e) {
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
const Er = "comfort_band", Lc = {
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
function Rc() {
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
function Ml(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function Dl(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Er
  );
}
function Fc(e, t) {
  const n = Rc(), i = Ml(e, [Er, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of Dl(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Lc[s];
    l !== void 0 && (n[l] = o.entity_id);
  }
  return n;
}
function zl(e) {
  const t = Ml(e, [Er, "profile_manager"]);
  if (t === null) return null;
  for (const n of Dl(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
var Uc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, Ol = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ic(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Uc(t, n, o), o;
};
let ho = class extends Vt {
  _onSelect(e) {
    this.hass && Dc(this.hass, { profile: e });
  }
  render() {
    if (!this.hass) return at;
    const e = zl(this.hass);
    if (e === null)
      return F`<div class="empty">Profile manager not registered yet.</div>`;
    const t = this.hass.states[e], n = t?.attributes.options, i = Array.isArray(n) ? n.filter((s) => typeof s == "string") : [], o = t?.state ?? "";
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
Ol([
  Y({ attribute: !1 })
], ho.prototype, "hass", 2);
ho = Ol([
  ae("comfort-band-profiles-tab")
], ho);
const Vc = !0, zt = "u-", Bc = "uplot", jc = zt + "hz", Wc = zt + "vt", Yc = zt + "title", Gc = zt + "wrap", Kc = zt + "under", qc = zt + "over", Zc = zt + "axis", Ti = zt + "off", Jc = zt + "select", Qc = zt + "cursor-x", Xc = zt + "cursor-y", tu = zt + "cursor-pt", eu = zt + "legend", iu = zt + "live", nu = zt + "inline", ou = zt + "series", ru = zt + "marker", Ms = zt + "label", su = zt + "value", Cn = "width", Mn = "height", Pn = "top", Ds = "bottom", en = "left", Xo = "right", Pr = "#000", zs = Pr + "0", tr = "mousemove", Os = "mousedown", er = "mouseup", Ns = "mouseenter", Hs = "mouseleave", Ls = "dblclick", lu = "resize", au = "scroll", Rs = "change", fo = "dppxchange", Tr = "--", gn = typeof window < "u", hr = gn ? document : null, sn = gn ? window : null, cu = gn ? navigator : null;
let lt, eo;
function fr() {
  let e = devicePixelRatio;
  lt != e && (lt = e, eo && pr(Rs, eo, fr), eo = matchMedia(`(min-resolution: ${lt - 1e-3}dppx) and (max-resolution: ${lt + 1e-3}dppx)`), Mi(Rs, eo, fr), sn.dispatchEvent(new CustomEvent(fo)));
}
function se(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function dr(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function vt(e, t, n) {
  e.style[t] = n + "px";
}
function Pe(e, t, n, i) {
  let o = hr.createElement(e);
  return t != null && se(o, t), n?.insertBefore(o, i), o;
}
function be(e, t) {
  return Pe("div", e, t);
}
const Fs = /* @__PURE__ */ new WeakMap();
function Fe(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", l = Fs.get(e);
  s != l && (e.style.transform = s, Fs.set(e, s), t < 0 || n < 0 || t > i || n > o ? se(e, Ti) : dr(e, Ti));
}
const Us = /* @__PURE__ */ new WeakMap();
function Is(e, t, n) {
  let i = t + n, o = Us.get(e);
  i != o && (Us.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const Vs = /* @__PURE__ */ new WeakMap();
function Bs(e, t, n, i) {
  let o = t + "" + n, s = Vs.get(e);
  o != s && (Vs.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const Cr = { passive: !0 }, uu = { ...Cr, capture: !0 };
function Mi(e, t, n, i) {
  t.addEventListener(e, n, i ? uu : Cr);
}
function pr(e, t, n, i) {
  t.removeEventListener(e, n, Cr);
}
gn && fr();
function Te(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : le((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function Nl(e) {
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
const Hl = (e) => e != null, Ll = (e) => e != null && e > 0, vo = Nl(Hl), hu = Nl(Ll);
function fu(e, t, n, i = 0, o = !1) {
  let s = o ? hu : vo, l = o ? Ll : Hl;
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
function yo(e, t, n, i) {
  let o = Ys(e), s = Ys(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let l = n == 10 ? Xe : Rl, h = o == 1 ? le : ve, f = s == 1 ? ve : le, p = h(l(Dt(e))), b = f(l(Dt(t))), g = cn(n, p), _ = cn(n, b);
  return n == 10 && (p < 0 && (g = pt(g, -p)), b < 0 && (_ = pt(_, -b))), i || n == 2 ? (e = g * o, t = _ * s) : (e = Vl(e, g), t = wo(t, _)), [e, t];
}
function Mr(e, t, n, i) {
  let o = yo(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const Dr = 0.1, js = {
  mode: 3,
  pad: Dr
}, On = {
  pad: 0,
  soft: null,
  mode: 0
}, du = {
  min: On,
  max: On
};
function po(e, t, n, i) {
  return xo(n) ? Ws(e, t, n) : (On.pad = n, On.soft = i ? 0 : null, On.mode = i ? 3 : 0, Ws(e, t, du));
}
function rt(e, t) {
  return e ?? t;
}
function pu(e, t, n) {
  for (t = rt(t, 0), n = rt(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Ws(e, t, n) {
  let i = n.min, o = n.max, s = rt(i.pad, 0), l = rt(o.pad, 0), h = rt(i.hard, -dt), f = rt(o.hard, dt), p = rt(i.soft, dt), b = rt(o.soft, -dt), g = rt(i.mode, 0), _ = rt(o.mode, 0), k = t - e, P = Xe(k), L = Zt(Dt(e), Dt(t)), U = Xe(L), V = Dt(U - P);
  (k < 1e-24 || V > 10) && (k = 0, (e == 0 || t == 0) && (k = 1e-24, g == 2 && p != dt && (s = 0), _ == 2 && b != -dt && (l = 0)));
  let x = k || L || 1e3, R = Xe(x), $ = cn(10, le(R)), Z = x * (k == 0 ? e == 0 ? 0.1 : 1 : s), M = pt(Vl(e - Z, $ / 10), 24), J = e >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : dt, G = Zt(h, M < J && e >= J ? J : Ce(J, M)), tt = x * (k == 0 ? t == 0 ? 0.1 : 1 : l), W = pt(wo(t + tt, $ / 10), 24), S = t <= b && (_ == 1 || _ == 3 && W >= b || _ == 2 && W <= b) ? b : -dt, q = Ce(f, W > S && t <= S ? S : Zt(S, W));
  return G == q && G == 0 && (q = 100), [G, q];
}
const gu = new Intl.NumberFormat(gn ? cu.language : "en-US"), zr = (e) => gu.format(e), ue = Math, so = ue.PI, Dt = ue.abs, le = ue.floor, Mt = ue.round, ve = ue.ceil, Ce = ue.min, Zt = ue.max, cn = ue.pow, Ys = ue.sign, Xe = ue.log10, Rl = ue.log2, mu = (e, t = 1) => ue.sinh(e) * t, ir = (e, t = 1) => ue.asinh(e / t), dt = 1 / 0;
function Gs(e) {
  return (Xe((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function gr(e, t, n) {
  return Ce(Zt(e, t), n);
}
function Fl(e) {
  return typeof e == "function";
}
function et(e) {
  return Fl(e) ? e : () => e;
}
const _u = () => {
}, Ul = (e) => e, Il = (e, t) => t, bu = (e) => null, Ks = (e) => !0, qs = (e, t) => e == t, vu = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (e) => {
  if (jl(e) || fi.has(e))
    return e;
  const t = `${e}`, n = t.match(vu);
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
function wo(e, t) {
  return Oi(ve(Oi(e / t)) * t);
}
function Vl(e, t) {
  return Oi(le(Oi(e / t)) * t);
}
function pt(e, t = 0) {
  if (jl(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Mt(i) / n;
}
const fi = /* @__PURE__ */ new Map();
function Bl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Fn(e, t, n, i) {
  let o = [], s = i.map(Bl);
  for (let l = t; l < n; l++) {
    let h = Dt(l), f = pt(cn(e, l), h);
    for (let p = 0; p < i.length; p++) {
      let b = e == 10 ? +`${i[p]}e${l}` : i[p] * f, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : pt(b, g);
      o.push(_), fi.set(_, g);
    }
  }
  return o;
}
const Nn = {}, Or = [], un = [null, null], ai = Array.isArray, jl = Number.isInteger, yu = (e) => e === void 0;
function Zs(e) {
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
function wu(e) {
  return e != null && typeof e == "object";
}
const xu = Object.getPrototypeOf(Uint8Array), Wl = "__proto__";
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
  } else if (e instanceof xu)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != Wl && (n[i] = hn(e[i], t));
  } else
    n = e;
  return n;
}
function Pt(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != Wl && (xo(e[o]) ? Pt(e[o], hn(i[o])) : e[o] = hn(i[o]));
  }
  return e;
}
const $u = 0, Su = 1, Au = 2;
function ku(e, t, n) {
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
function Eu(e, t) {
  if (Cu(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return Mu(l[0]) || (l = Tu(l)), l;
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
      let b = h[p], g = Array(o).fill(void 0), _ = t ? t[l][p] : Su, k = [];
      for (let P = 0; P < b.length; P++) {
        let L = b[P], U = s.get(f[P]);
        L === null ? _ != $u && (g[U] = L, _ == Au && k.push(U)) : g[U] = L;
      }
      ku(g, k, o), i.push(g);
    }
  }
  return i;
}
const Pu = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Tu(e) {
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
function Cu(e) {
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
function Mu(e, t = 100) {
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
const Yl = [
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
], Gl = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Kl(e) {
  return e.slice(0, 3);
}
const Du = Gl.map(Kl), zu = Yl.map(Kl), Ou = {
  MMMM: Yl,
  MMM: zu,
  WWWW: Gl,
  WWW: Du
};
function Tn(e) {
  return (e < 10 ? "0" : "") + e;
}
function Nu(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const Hu = {
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
  fff: (e) => Nu(e.getMilliseconds())
};
function Nr(e, t) {
  t = t || Ou;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? Hu[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < n.length; h++)
      l += typeof n[h] == "string" ? n[h] : n[h](s, t);
    return l;
  };
}
const Lu = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Ru(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Lu ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const ql = (e) => e % 1 == 0, go = [1, 2, 2.5, 5], Fu = Fn(10, -32, 0, go), Zl = Fn(10, 0, 32, go), Uu = Zl.filter(ql), Pi = Fu.concat(Zl), Hr = `
`, Jl = "{YYYY}", Js = Hr + Jl, Ql = "{M}/{D}", Dn = Hr + Ql, io = Dn + "/{YY}", Xl = "{aa}", Iu = "{h}:{mm}", rn = Iu + Xl, Qs = Hr + rn, Xs = ":{ss}", ut = null;
function ta(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, l = o * 365, f = (e == 1 ? Fn(10, 0, 3, go).filter(ql) : Fn(10, -3, 0, go)).concat([
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
    [l, Jl, ut, ut, ut, ut, ut, ut, 1],
    [o * 28, "{MMM}", Js, ut, ut, ut, ut, ut, 1],
    [o, Ql, Js, ut, ut, ut, ut, ut, 1],
    [i, "{h}" + Xl, io, ut, Dn, ut, ut, ut, 1],
    [n, rn, io, ut, Dn, ut, ut, ut, 1],
    [t, Xs, io + " " + rn, ut, Dn + " " + rn, ut, Qs, ut, 1],
    [e, Xs + ".{fff}", io + " " + rn, ut, Dn + " " + rn, ut, Qs, ut, 1]
  ];
  function b(g) {
    return (_, k, P, L, U, V) => {
      let x = [], R = U >= l, $ = U >= s && U < l, Z = g(P), M = pt(Z * e, 3), J = nr(Z.getFullYear(), R ? 0 : Z.getMonth(), $ || R ? 1 : Z.getDate()), G = pt(J * e, 3);
      if ($ || R) {
        let tt = $ ? U / s : 0, W = R ? U / l : 0, S = M == G ? M : pt(nr(J.getFullYear() + W, J.getMonth() + tt, 1) * e, 3), q = new Date(Mt(S / e)), D = q.getFullYear(), B = q.getMonth();
        for (let H = 0; S <= L; H++) {
          let it = nr(D + W * H, B + tt * H, 1), N = it - g(pt(it * e, 3));
          S = pt((+it + N) * e, 3), S <= L && x.push(S);
        }
      } else {
        let tt = U >= o ? o : U, W = le(P) - le(M), S = G + W + wo(M - G, tt);
        x.push(S);
        let q = g(S), D = q.getHours() + q.getMinutes() / n + q.getSeconds() / i, B = U / i, H = _.axes[k]._space, it = V / H;
        for (; S = pt(S + U, e == 1 ? 0 : 3), !(S > L); )
          if (B > 1) {
            let N = le(pt(D + B, 6)) % 24, nt = g(S).getHours() - N;
            nt > 1 && (nt = -1), S -= nt * i, D = (D + B) % 24;
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
const [Vu, Bu, ju] = ta(1), [Wu, Yu, Gu] = ta(1e-3);
Fn(2, -53, 53, [1]);
function tl(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function el(e, t) {
  return (n, i, o, s, l) => {
    let h = t.find((P) => l >= P[0]) || t[t.length - 1], f, p, b, g, _, k;
    return i.map((P) => {
      let L = e(P), U = L.getFullYear(), V = L.getMonth(), x = L.getDate(), R = L.getHours(), $ = L.getMinutes(), Z = L.getSeconds(), M = U != f && h[2] || V != p && h[3] || x != b && h[4] || R != g && h[5] || $ != _ && h[6] || Z != k && h[7] || h[1];
      return f = U, p = V, b = x, g = R, _ = $, k = Z, M(L);
    });
  };
}
function Ku(e, t) {
  let n = Nr(t);
  return (i, o, s, l, h) => o.map((f) => n(e(f)));
}
function nr(e, t, n) {
  return new Date(e, t, n);
}
function il(e, t) {
  return t(e);
}
const qu = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function nl(e, t) {
  return (n, i, o, s) => s == null ? Tr : t(e(i));
}
function Zu(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Ju(e, t) {
  return e.series[t].fill(e, t);
}
const Qu = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: _u,
  markers: {
    show: !0,
    width: 2,
    stroke: Zu,
    fill: Ju,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Xu(e, t) {
  let n = e.cursor.points, i = be(), o = n.size(e, t);
  vt(i, Cn, o), vt(i, Mn, o);
  let s = o / -2;
  vt(i, "marginLeft", s), vt(i, "marginTop", s);
  let l = n.width(e, t, o);
  return l && vt(i, "borderWidth", l), i;
}
function th(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function eh(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function ih(e, t) {
  return e.series[t].points.size;
}
const or = [0, 0];
function nh(e, t, n) {
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
const oh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: nh,
  points: {
    one: !1,
    show: Xu,
    size: ih,
    width: 0,
    stroke: eh,
    fill: th
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
}, ea = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Lr = Pt({}, ea, {
  filter: Il
}), ia = Pt({}, Lr, {
  size: 10
}), na = Pt({}, ea, {
  show: !1
}), Rr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', oa = "bold " + Rr, ra = 1.5, ol = {
  show: !0,
  scale: "x",
  stroke: Pr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: oa,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Lr,
  ticks: ia,
  border: na,
  font: Rr,
  lineGap: ra,
  rotate: 0
}, rh = "Value", sh = "Time", rl = {
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
function lh(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : zr(s));
}
function ah(e, t, n, i, o, s, l) {
  let h = [], f = fi.get(o) || 0;
  n = l ? n : pt(wo(n, o), f);
  for (let p = n; p <= i; p = pt(p + o, f))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function mr(e, t, n, i, o, s, l) {
  const h = [], f = e.scales[e.axes[t].scale].log, p = f == 10 ? Xe : Rl, b = le(p(n));
  o = cn(f, b), f == 10 && (o = Pi[Te(o, Pi)]);
  let g = n, _ = o * f;
  f == 10 && (_ = Pi[Te(_, Pi)]);
  do
    h.push(g), g = g + o, f == 10 && !fi.has(g) && (g = pt(g, fi.get(o))), g >= _ && (o = g, _ = o * f, f == 10 && (_ = Pi[Te(_, Pi)]));
  while (g <= i);
  return h;
}
function ch(e, t, n, i, o, s, l) {
  let f = e.scales[e.axes[t].scale].asinh, p = i > f ? mr(e, t, Zt(f, n), i, o) : [f], b = i >= 0 && n <= 0 ? [0] : [];
  return (n < -f ? mr(e, t, Zt(f, -i), -n, o) : [f]).reverse().map((_) => -_).concat(b, p);
}
const sa = /./, uh = /[12357]/, hh = /[125]/, sl = /1/, _r = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function fh(e, t, n, i, o) {
  let s = e.axes[n], l = s.scale, h = e.scales[l], f = e.valToPos, p = s._space, b = f(10, l), g = f(9, l) - b >= p ? sa : f(7, l) - b >= p ? uh : f(5, l) - b >= p ? hh : sl;
  if (g == sl) {
    let _ = Dt(f(1, l) - b);
    if (_ < p)
      return _r(t.slice().reverse(), h.distr, g, ve(p / _)).reverse();
  }
  return _r(t, h.distr, g, 1);
}
function dh(e, t, n, i, o) {
  let s = e.axes[n], l = s.scale, h = s._space, f = e.valToPos, p = Dt(f(1, l) - f(2, l));
  return p < h ? _r(t.slice().reverse(), 3, sa, ve(h / p)).reverse() : t;
}
function ph(e, t, n, i) {
  return i == null ? Tr : t == null ? "" : zr(t);
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
  labelFont: oa,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Lr,
  ticks: ia,
  border: na,
  font: Rr,
  lineGap: ra,
  rotate: 0
};
function gh(e, t) {
  let n = 3 + (e || 1) * 2;
  return pt(n * t, 3);
}
function mh(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), l = e.valToPos(o[i[1]], n, !0), h = Dt(l - s), f = e.series[t], p = h / (f.points.space * lt);
  return i[1] - i[0] <= p;
}
const al = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: dt,
  max: -dt
}, la = (e, t, n, i, o) => o, cl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: la,
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
  gaps: la,
  alpha: 1,
  points: {
    show: mh,
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
function _h(e, t, n, i, o) {
  return n / 10;
}
const aa = {
  time: Vc,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, bh = Pt({}, aa, {
  time: !1,
  ori: 1
}), hl = {};
function ca(e, t) {
  let n = hl[e];
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
  }, e != null && (hl[e] = n)), n;
}
const fn = 1, br = 2;
function Ni(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let f = s[0], p = i == 2 ? s[1] : s[t], b = i == 2 ? l[o.facets[0].scale] : l[e.series[0].scale], g = i == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, k = h.top, P = h.width, L = h.height, U = e.valToPosH, V = e.valToPosV;
  return b.ori == 0 ? n(
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
    ha,
    da
  ) : n(
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
    fa,
    pa
  );
}
function Fr(e, t) {
  let n = 0, i = 0, o = rt(e.bands, Or);
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
function vh(e, t, n, i, o) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, f = e.scales[h];
  return o == -1 ? f.min : o == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ti(e, t, n, i, o, s) {
  return Ni(e, t, (l, h, f, p, b, g, _, k, P, L, U) => {
    let V = l.pxRound;
    const x = p.dir * (p.ori == 0 ? 1 : -1), R = p.ori == 0 ? mn : _n;
    let $, Z;
    x == 1 ? ($ = n, Z = i) : ($ = i, Z = n);
    let M = V(g(h[$], p, L, k)), J = V(_(f[$], b, U, P)), G = V(g(h[Z], p, L, k)), tt = V(_(s == 1 ? b.max : b.min, b, U, P)), W = new Path2D(o);
    return R(W, G, tt), R(W, M, tt), R(W, M, J), W;
  });
}
function $o(e, t, n, i, o, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? ko : Ir;
    let f = n;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
      if (_[1] > _[0]) {
        let k = _[0] - f;
        k > 0 && h(l, f, i, k, i + s), f = _[1];
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
function Ur(e, t, n, i, o, s, l) {
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
      let k = s(e[g]), P = _ == g ? k : s(e[_]), L = g - o;
      k = l <= 0 && L >= 0 && L < f ? s(e[L]) : k;
      let V = _ + o;
      P = l >= 0 && V >= 0 && V < f ? s(e[V]) : P, P >= k && h.push([k, P]);
    }
  return h;
}
function fl(e) {
  return e == 0 ? Ul : e == 1 ? Mt : (t) => Ei(t, e);
}
function ua(e) {
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
    p == 0 && b == 0 ? i(o, s, l, h, f) : (p = Ce(p, h / 2, f / 2), b = Ce(b, h / 2, f / 2), t(o, s + p, l), n(o, s + h, l, s + h, l + f, p), n(o, s + h, l + f, s, l + f, b), n(o, s, l + f, s, l, b), n(o, s, l, s + h, l, p), o.closePath());
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
}, ko = ua(0), Ir = ua(1), ha = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, fa = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, da = (e, t, n, i, o, s, l) => {
  e.bezierCurveTo(t, n, i, o, s, l);
}, pa = (e, t, n, i, o, s, l) => {
  e.bezierCurveTo(n, t, o, i, l, s);
};
function ga(e) {
  return (t, n, i, o, s) => Ni(t, n, (l, h, f, p, b, g, _, k, P, L, U) => {
    let { pxRound: V, points: x } = l, R, $;
    p.ori == 0 ? (R = So, $ = ha) : (R = Ao, $ = fa);
    const Z = pt(x.width * lt, 3);
    let M = (x.size - x.width) / 2 * lt, J = pt(M * 2, 3), G = new Path2D(), tt = new Path2D(), { left: W, top: S, width: q, height: D } = t.bbox;
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
      for (let H = i; H <= o; H++)
        B(H);
    return {
      stroke: Z > 0 ? G : null,
      fill: G,
      clip: tt,
      flags: fn | br
    };
  });
}
function ma(e) {
  return (t, n, i, o, s, l) => {
    i != o && (s != i && l != i && e(t, n, i), s != o && l != o && e(t, n, o), e(t, n, l));
  };
}
const wh = ma(mn), xh = ma(_n);
function _a(e) {
  const t = rt(e?.alignGaps, 0);
  return (n, i, o, s) => Ni(n, i, (l, h, f, p, b, g, _, k, P, L, U) => {
    [o, s] = vo(f, o, s);
    let V = l.pxRound, x = (D) => V(g(D, p, L, k)), R = (D) => V(_(D, b, U, P)), $, Z;
    p.ori == 0 ? ($ = mn, Z = wh) : ($ = _n, Z = xh);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, G = J.stroke;
    let tt = !1;
    if (s - o >= L * 4) {
      let D = (z) => n.posToVal(z, p.key, !0), B = null, H = null, it, N, Jt, yt = x(h[M == 1 ? o : s]), nt = x(h[o]), ht = x(h[s]), Q = D(M == 1 ? nt + 1 : ht - 1);
      for (let z = M == 1 ? o : s; z >= o && z <= s; z += M) {
        let Tt = h[z], wt = (M == 1 ? Tt < Q : Tt > Q) ? yt : x(Tt), ct = f[z];
        wt == yt ? ct != null ? (N = ct, B == null ? ($(G, wt, R(N)), it = B = H = N) : N < B ? B = N : N > H && (H = N)) : ct === null && (tt = !0) : (B != null && Z(G, yt, R(B), R(H), R(it), R(N)), ct != null ? (N = ct, $(G, wt, R(N)), B = H = it = N) : (B = H = null, ct === null && (tt = !0)), yt = wt, Q = D(yt + M));
      }
      B != null && B != H && Jt != yt && Z(G, yt, R(B), R(H), R(it), R(N));
    } else
      for (let D = M == 1 ? o : s; D >= o && D <= s; D += M) {
        let B = f[D];
        B === null ? tt = !0 : B != null && $(G, x(h[D]), R(B));
      }
    let [S, q] = Fr(n, i);
    if (l.fill != null || S != 0) {
      let D = J.fill = new Path2D(G), B = l.fillTo(n, i, l.min, l.max, S), H = R(B), it = x(h[o]), N = x(h[s]);
      M == -1 && ([N, it] = [it, N]), $(D, N, H), $(D, it, H);
    }
    if (!l.spanGaps) {
      let D = [];
      tt && D.push(...Ur(h, f, o, s, M, x, t)), J.gaps = D = l.gaps(n, i, o, s, D), J.clip = $o(D, p.ori, k, P, L, U);
    }
    return q != 0 && (J.band = q == 2 ? [
      ti(n, i, o, s, G, -1),
      ti(n, i, o, s, G, 1)
    ] : ti(n, i, o, s, G, q)), J;
  });
}
function $h(e) {
  const t = rt(e.align, 1), n = rt(e.ascDesc, !1), i = rt(e.alignGaps, 0), o = rt(e.extend, !1);
  return (s, l, h, f) => Ni(s, l, (p, b, g, _, k, P, L, U, V, x, R) => {
    [h, f] = vo(g, h, f);
    let $ = p.pxRound, { left: Z, width: M } = s.bbox, J = (nt) => $(P(nt, _, x, U)), G = (nt) => $(L(nt, k, R, V)), tt = _.ori == 0 ? mn : _n;
    const W = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, S = W.stroke, q = _.dir * (_.ori == 0 ? 1 : -1);
    let D = G(g[q == 1 ? h : f]), B = J(b[q == 1 ? h : f]), H = B, it = B;
    o && t == -1 && (it = Z, tt(S, it, D)), tt(S, B, D);
    for (let nt = q == 1 ? h : f; nt >= h && nt <= f; nt += q) {
      let ht = g[nt];
      if (ht == null)
        continue;
      let Q = J(b[nt]), z = G(ht);
      t == 1 ? tt(S, Q, D) : tt(S, H, z), tt(S, Q, z), D = z, H = Q;
    }
    let N = H;
    o && t == 1 && (N = Z + M, tt(S, N, D));
    let [Jt, yt] = Fr(s, l);
    if (p.fill != null || Jt != 0) {
      let nt = W.fill = new Path2D(S), ht = p.fillTo(s, l, p.min, p.max, Jt), Q = G(ht);
      tt(nt, N, Q), tt(nt, it, Q);
    }
    if (!p.spanGaps) {
      let nt = [];
      nt.push(...Ur(b, g, h, f, q, J, i));
      let ht = p.width * lt / 2, Q = n || t == 1 ? ht : -ht, z = n || t == -1 ? -ht : ht;
      nt.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += z;
      }), W.gaps = nt = p.gaps(s, l, h, f, nt), W.clip = $o(nt, _.ori, U, V, x, R);
    }
    return yt != 0 && (W.band = yt == 2 ? [
      ti(s, l, h, f, S, -1),
      ti(s, l, h, f, S, 1)
    ] : ti(s, l, h, f, S, yt)), W;
  });
}
function dl(e, t, n, i, o, s, l = dt) {
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
function Sh(e) {
  e = e || Nn;
  const t = rt(e.size, [0.6, dt, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = et(o), l = 1 - t[0], h = rt(t[1], dt), f = rt(t[2], 1), p = rt(e.disp, Nn), b = rt(e.each, (k) => {
  }), { fill: g, stroke: _ } = p;
  return (k, P, L, U) => Ni(k, P, (V, x, R, $, Z, M, J, G, tt, W, S) => {
    let q = V.pxRound, D = n, B = i * lt, H = h * lt, it = f * lt, N, Jt;
    $.ori == 0 ? [N, Jt] = s(k, P) : [Jt, N] = s(k, P);
    const yt = $.dir * ($.ori == 0 ? 1 : -1);
    let nt = $.ori == 0 ? ko : Ir, ht = $.ori == 0 ? b : (T, gt, Ct, Fi, bi, ze, vi) => {
      b(T, gt, Ct, bi, Fi, vi, ze);
    }, Q = rt(k.bands, Or).find((T) => T.series[0] == P), z = Q != null ? Q.dir : 0, Tt = V.fillTo(k, P, V.min, V.max, z), Wt = q(J(Tt, Z, S, tt)), wt, ct, $e, ee = W, St = q(V.width * lt), De = !1, Ge = null, he = null, ii = null, Hi = null;
    g != null && (St == 0 || _ != null) && (De = !0, Ge = g.values(k, P, L, U), he = /* @__PURE__ */ new Map(), new Set(Ge).forEach((T) => {
      T != null && he.set(T, new Path2D());
    }), St > 0 && (ii = _.values(k, P, L, U), Hi = /* @__PURE__ */ new Map(), new Set(ii).forEach((T) => {
      T != null && Hi.set(T, new Path2D());
    })));
    let { x0: Li, size: vn } = p;
    if (Li != null && vn != null) {
      D = 1, x = Li.values(k, P, L, U), Li.unit == 2 && (x = x.map((Ct) => k.posToVal(G + Ct * W, $.key, !0)));
      let T = vn.values(k, P, L, U);
      vn.unit == 2 ? ct = T[0] * W : ct = M(T[0], $, W, G) - M(0, $, W, G), ee = dl(x, R, M, $, W, G, ee), $e = ee - ct + B;
    } else
      ee = dl(x, R, M, $, W, G, ee), $e = ee * l + B, ct = ee - $e;
    $e < 1 && ($e = 0), St >= ct / 2 && (St = 0), $e < 5 && (q = Ul);
    let Wn = $e > 0, mi = ee - $e - (Wn ? St : 0);
    ct = q(gr(mi, it, H)), wt = (D == 0 ? ct / 2 : D == yt ? 0 : ct) - D * yt * ((D == 0 ? B / 2 : 0) + (Wn ? St / 2 : 0));
    const Yt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ri = De ? null : new Path2D();
    let Ke = null;
    if (Q != null)
      Ke = k.data[Q.series[1]];
    else {
      let { y0: T, y1: gt } = p;
      T != null && gt != null && (R = gt.values(k, P, L, U), Ke = T.values(k, P, L, U));
    }
    let _i = N * ct, K = Jt * ct;
    for (let T = yt == 1 ? L : U; T >= L && T <= U; T += yt) {
      let gt = R[T];
      if (gt == null)
        continue;
      if (Ke != null) {
        let Qt = Ke[T] ?? 0;
        if (gt - Qt == 0)
          continue;
        Wt = J(Qt, Z, S, tt);
      }
      let Ct = $.distr != 2 || p != null ? x[T] : T, Fi = M(Ct, $, W, G), bi = J(rt(gt, Tt), Z, S, tt), ze = q(Fi - wt), vi = q(Zt(bi, Wt)), ie = q(Ce(bi, Wt)), fe = vi - ie;
      if (gt != null) {
        let Qt = gt < 0 ? K : _i, Se = gt < 0 ? _i : K;
        De ? (St > 0 && ii[T] != null && nt(Hi.get(ii[T]), ze, ie + le(St / 2), ct, Zt(0, fe - St), Qt, Se), Ge[T] != null && nt(he.get(Ge[T]), ze, ie + le(St / 2), ct, Zt(0, fe - St), Qt, Se)) : nt(Ri, ze, ie + le(St / 2), ct, Zt(0, fe - St), Qt, Se), ht(
          k,
          P,
          T,
          ze - St / 2,
          ie,
          ct + St,
          fe
        );
      }
    }
    return St > 0 ? Yt.stroke = De ? Hi : Ri : De || (Yt._fill = V.width == 0 ? V._fill : V._stroke ?? V._fill, Yt.width = 0), Yt.fill = De ? he : Ri, Yt;
  });
}
function Ah(e, t) {
  const n = rt(t?.alignGaps, 0);
  return (i, o, s, l) => Ni(i, o, (h, f, p, b, g, _, k, P, L, U, V) => {
    [s, l] = vo(p, s, l);
    let x = h.pxRound, R = (N) => x(_(N, b, U, P)), $ = (N) => x(k(N, g, V, L)), Z, M, J;
    b.ori == 0 ? (Z = So, J = mn, M = da) : (Z = Ao, J = _n, M = pa);
    const G = b.dir * (b.ori == 0 ? 1 : -1);
    let tt = R(f[G == 1 ? s : l]), W = tt, S = [], q = [];
    for (let N = G == 1 ? s : l; N >= s && N <= l; N += G)
      if (p[N] != null) {
        let yt = f[N], nt = R(yt);
        S.push(W = nt), q.push($(p[N]));
      }
    const D = { stroke: e(S, q, Z, J, M, x), fill: null, clip: null, band: null, gaps: null, flags: fn }, B = D.stroke;
    let [H, it] = Fr(i, o);
    if (h.fill != null || H != 0) {
      let N = D.fill = new Path2D(B), Jt = h.fillTo(i, o, h.min, h.max, H), yt = $(Jt);
      J(N, W, yt), J(N, tt, yt);
    }
    if (!h.spanGaps) {
      let N = [];
      N.push(...Ur(f, p, s, l, G, R, n)), D.gaps = N = h.gaps(i, o, s, l, N), D.clip = $o(N, b.ori, P, L, U, V);
    }
    return it != 0 && (D.band = it == 2 ? [
      ti(i, o, s, l, B, -1),
      ti(i, o, s, l, B, 1)
    ] : ti(i, o, s, l, B, it)), D;
  });
}
function kh(e) {
  return Ah(Eh, e);
}
function Eh(e, t, n, i, o, s) {
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
const vr = /* @__PURE__ */ new Set();
function pl() {
  for (let e of vr)
    e.syncRect(!0);
}
gn && (Mi(lu, sn, pl), Mi(au, sn, pl, !0), Mi(fo, sn, () => {
  jt.pxRatio = lt;
}));
const Ph = _a(), Th = ga();
function gl(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => yr(s, l, t, n));
}
function Ch(e, t) {
  return e.map((n, i) => i == 0 ? {} : Pt({}, t, n));
}
function yr(e, t, n, i) {
  return Pt({}, t == 0 ? n : i, e);
}
function ba(e, t, n) {
  return t == null ? un : [t, n];
}
const Mh = ba;
function Dh(e, t, n) {
  return t == null ? un : po(t, n, Dr, !0);
}
function va(e, t, n, i) {
  return t == null ? un : yo(t, n, e.scales[i].log, !1);
}
const zh = va;
function ya(e, t, n, i) {
  return t == null ? un : Mr(t, n, e.scales[i].log, !1);
}
const Oh = ya;
function Nh(e, t, n, i, o) {
  let s = Zt(Gs(e), Gs(t)), l = t - e, h = Te(o / i * l, n);
  do {
    let f = n[h], p = i * f / l;
    if (p >= o && s + (f < 5 ? fi.get(f) : 0) <= 17)
      return [f, p];
  } while (++h < n.length);
  return [0, 0];
}
function ml(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Mt((n = +o) * lt)) + "px"), [e, t, n];
}
function Hh(e) {
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
  const p = i.root = be(Bc);
  if (e.id != null && (p.id = e.id), se(p, e.class), e.title) {
    let r = be(Yc, p);
    r.textContent = e.title;
  }
  const b = Pe("canvas"), g = i.ctx = b.getContext("2d"), _ = be(Gc, p);
  Mi("click", _, (r) => {
    r.target === P && (mt != Zi || xt != Ji) && It.click(i, r);
  }, !0);
  const k = i.under = be(Kc, _);
  _.appendChild(b);
  const P = i.over = be(qc, _);
  e = hn(e);
  const L = +rt(e.pxAlign, 1), U = fl(L);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(i, e) || e);
  });
  const V = e.ms || 1e-3, x = i.series = o == 1 ? gl(e.series || [], rl, ul, !1) : Ch(e.series || [null], cl), R = i.axes = gl(e.axes || [], ol, ll, !0), $ = i.scales = {}, Z = i.bands = e.bands || [];
  Z.forEach((r) => {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1);
  });
  const M = o == 2 ? x[1].facets[0].scale : x[0].scale, J = {
    axes: Ha,
    series: Ma
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
        a = $[r] = Pt({}, r == M ? aa : bh, c), a.key = r;
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
        a.range = et(d || (u ? Mh : r == M ? a.distr == 3 ? zh : a.distr == 4 ? Oh : ba : a.distr == 3 ? va : a.distr == 4 ? ya : Dh)), a.auto = et(m ? !1 : a.auto), a.clamp = et(a.clamp || _h), a._min = a._max = null, a.valToPct = tt(a);
      }
    }
  }
  W("x"), W("y"), o == 1 && x.forEach((r) => {
    W(r.scale);
  }), R.forEach((r) => {
    W(r.scale);
  });
  for (let r in e.scales)
    W(r);
  const S = $[M], q = S.distr;
  let D, B;
  S.ori == 0 ? (se(p, jc), D = s, B = l) : (se(p, Wc), D = l, B = s);
  const H = {};
  for (let r in $) {
    let a = $[r];
    (a.min != null || a.max != null) && (H[r] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const it = e.tzDate || ((r) => new Date(Mt(r / V))), N = e.fmtDate || Nr, Jt = V == 1 ? ju(it) : Gu(it), yt = el(it, tl(V == 1 ? Bu : Yu, N)), nt = nl(it, il(qu, N)), ht = [], Q = i.legend = Pt({}, Qu, e.legend), z = i.cursor = Pt({}, oh, { drag: { y: o == 2 } }, e.cursor), Tt = Q.show, Wt = z.show, wt = Q.markers;
  Q.idxs = ht, wt.width = et(wt.width), wt.dash = et(wt.dash), wt.stroke = et(wt.stroke), wt.fill = et(wt.fill);
  let ct, $e, ee, St = [], De = [], Ge, he = !1, ii = {};
  if (Q.live) {
    const r = x[1] ? x[1].values : null;
    he = r != null, Ge = he ? r(i, 1, 0) : { _: 0 };
    for (let a in Ge)
      ii[a] = Tr;
  }
  if (Tt)
    if (ct = Pe("table", eu, p), ee = Pe("tbody", null, ct), Q.mount(i, ct), he) {
      $e = Pe("thead", null, ct, ee);
      let r = Pe("tr", null, $e);
      Pe("th", null, r);
      for (var Hi in Ge)
        Pe("th", Ms, r).textContent = Hi;
    } else
      se(ct, nu), Q.live && se(ct, iu);
  const Li = { show: !0 }, vn = { show: !1 };
  function Wn(r, a) {
    if (a == 0 && (he || !Q.live || o == 2))
      return un;
    let c = [], u = Pe("tr", ou, ee, ee.childNodes[a]);
    se(u, r.class), r.show || se(u, Ti);
    let d = Pe("th", null, u);
    if (wt.show) {
      let y = be(ru, d);
      if (a > 0) {
        let w = wt.width(i, a);
        w && (y.style.border = w + "px " + wt.dash(i, a) + " " + wt.stroke(i, a)), y.style.background = wt.fill(i, a);
      }
    }
    let m = be(Ms, d);
    r.label instanceof HTMLElement ? m.appendChild(r.label) : m.textContent = r.label, a > 0 && (wt.show || (m.style.color = r.width > 0 ? wt.stroke(i, a) : wt.fill(i, a)), Yt("click", d, (y) => {
      if (z._lock)
        return;
      wi(y);
      let w = x.indexOf(r);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = x.some((E, C) => C > 0 && C != w && E.show);
        x.forEach((E, C) => {
          C > 0 && Ne(C, A ? C == w ? Li : vn : Li, !0, Et.setSeries);
        });
      } else
        Ne(w, { show: !r.show }, !0, Et.setSeries);
    }, !1), Ii && Yt(Ns, d, (y) => {
      z._lock || (wi(y), Ne(x.indexOf(r), Xi, !0, Et.setSeries));
    }, !1));
    for (var v in Ge) {
      let y = Pe("td", su, u);
      y.textContent = "--", c.push(y);
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
      (r == null || d == r) && (pr(d, a, u[d]), delete u[d]);
    r == null && mi.delete(a);
  }
  let Ke = 0, _i = 0, K = 0, T = 0, gt = 0, Ct = 0, Fi = gt, bi = Ct, ze = K, vi = T, ie = 0, fe = 0, Qt = 0, Se = 0;
  i.bbox = {};
  let Po = !1, Yn = !1, Ui = !1, yi = !1, Gn = !1, de = !1;
  function To(r, a, c) {
    (c || r != i.width || a != i.height) && jr(r, a), Yi(!1), Ui = !0, Yn = !0, Gi();
  }
  function jr(r, a) {
    i.width = Ke = K = r, i.height = _i = T = a, gt = Ct = 0, Sa(), Aa();
    let c = i.bbox;
    ie = c.left = Ei(gt * lt, 0.5), fe = c.top = Ei(Ct * lt, 0.5), Qt = c.width = Ei(K * lt, 0.5), Se = c.height = Ei(T * lt, 0.5);
  }
  const wa = 3;
  function xa() {
    let r = !1, a = 0;
    for (; !r; ) {
      a++;
      let c = Oa(a), u = Na(a);
      r = a == wa || c && u, r || (jr(i.width, i.height), Yn = !0);
    }
  }
  function $a({ width: r, height: a }) {
    To(r, a);
  }
  i.setSize = $a;
  function Sa() {
    let r = !1, a = !1, c = !1, u = !1;
    R.forEach((d, m) => {
      if (d.show && d._show) {
        let { side: v, _size: y } = d, w = v % 2, A = d.label != null ? d.labelSize : 0, E = y + A;
        E > 0 && (w ? (K -= E, v == 3 ? (gt += E, u = !0) : c = !0) : (T -= E, v == 0 ? (Ct += E, r = !0) : a = !0));
      }
    }), xi[0] = r, xi[1] = c, xi[2] = a, xi[3] = u, K -= ni[1] + ni[3], gt += ni[3], T -= ni[2] + ni[0], Ct += ni[0];
  }
  function Aa() {
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
      let w = v, A = c(d, m, v, y) ?? dt, E = A >= 0 && A < dt, C = S.ori == 0 ? K : T, j = z.left, st = t[0], ot = t[m];
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
            let bt = X == null ? -1 / 0 : D(st[X], S, C, 0), At = I == null ? 1 / 0 : D(st[I], S, C, 0), Ft = j - bt, ft = At - j;
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
  const Oe = i.focus = Pt({}, e.focus || { alpha: 0.3 }, z.focus), Ii = Oe.prox >= 0, Vi = Ii && Bt.one;
  let pe = [], Bi = [], ji = [];
  function Wr(r, a) {
    let c = Bt.show(i, a);
    if (c instanceof HTMLElement)
      return se(c, tu), se(c, r.class), Fe(c, -10, -10, K, T), P.insertBefore(c, pe[a]), c;
  }
  function Yr(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? Zs(u) ? nl(it, il(u, N)) : u || nt : u || ph, r.label = r.label || (c ? sh : rh);
    }
    if (Vi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Ph || bu, r.fillTo = et(r.fillTo || vh), r.pxAlign = +rt(r.pxAlign, L), r.pxRound = fl(r.pxAlign), r.stroke = et(r.stroke || null), r.fill = et(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
      let c = gh(Zt(1, r.width), 1), u = r.points = Pt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: r.stroke,
        space: c * 2,
        paths: Th,
        _stroke: null,
        _fill: null
      }, r.points);
      u.show = et(u.show), u.filter = et(u.filter), u.fill = et(u.fill), u.stroke = et(u.stroke), u.paths = et(u.paths), u.pxAlign = r.pxAlign;
    }
    if (Tt) {
      let c = Wn(r, a);
      St.splice(a, 0, c[0]), De.splice(a, 0, c[1]), Q.values.push(null);
    }
    if (Wt) {
      ht.splice(a, 0, null);
      let c = null;
      Vi ? a == 0 && (c = Wr(r, a)) : a > 0 && (c = Wr(r, a)), pe.splice(a, 0, c), Bi.splice(a, 0, 0), ji.splice(a, 0, 0);
    }
    Rt("addSeries", a);
  }
  function ka(r, a) {
    a = a ?? x.length, r = o == 1 ? yr(r, a, rl, ul) : yr(r, a, {}, cl), x.splice(a, 0, r), Yr(x[a], a);
  }
  i.addSeries = ka;
  function Ea(r) {
    if (x.splice(r, 1), Tt) {
      Q.values.splice(r, 1), De.splice(r, 1);
      let a = St.splice(r, 1)[0];
      Ri(null, a.firstChild), a.remove();
    }
    Wt && (ht.splice(r, 1), pe.splice(r, 1)[0].remove(), Bi.splice(r, 1), ji.splice(r, 1)), Rt("delSeries", r);
  }
  i.delSeries = Ea;
  const xi = [!1, !1, !1, !1];
  function Pa(r, a) {
    if (r._show = r.show, r.show) {
      let c = r.side % 2, u = $[r.scale];
      u == null && (r.scale = c ? x[1].scale : M, u = $[r.scale]);
      let d = u.time;
      r.size = et(r.size), r.space = et(r.space), r.rotate = et(r.rotate), ai(r.incrs) && r.incrs.forEach((v) => {
        !fi.has(v) && fi.set(v, Bl(v));
      }), r.incrs = et(r.incrs || (u.distr == 2 ? Uu : d ? V == 1 ? Vu : Wu : Pi)), r.splits = et(r.splits || (d && u.distr == 1 ? Jt : u.distr == 3 ? mr : u.distr == 4 ? ch : ah)), r.stroke = et(r.stroke), r.grid.stroke = et(r.grid.stroke), r.ticks.stroke = et(r.ticks.stroke), r.border.stroke = et(r.border.stroke);
      let m = r.values;
      r.values = // static array of tick values
      ai(m) && !ai(m[0]) ? et(m) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          ai(m) ? el(it, tl(m, N)) : (
            // fmtDate string tpl
            Zs(m) ? Ku(it, m) : m || yt
          )
        ) : m || lh
      ), r.filter = et(r.filter || (u.distr >= 3 && u.log == 10 ? fh : u.distr == 3 && u.log == 2 ? dh : Il)), r.font = ml(r.font), r.labelFont = ml(r.labelFont), r._size = r.size(i, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (xi[a] = !0, r._el = be(Zc, _));
    }
  }
  function yn(r, a, c, u) {
    let [d, m, v, y] = c, w = a % 2, A = 0;
    return w == 0 && (y || m) && (A = a == 0 && !d || a == 2 && !v ? Mt(ol.size / 3) : 0), w == 1 && (d || v) && (A = a == 1 && !m || a == 3 && !y ? Mt(ll.size / 2) : 0), A;
  }
  const Gr = i.padding = (e.padding || [yn, yn, yn, yn]).map((r) => et(rt(r, yn))), ni = i._padding = Gr.map((r, a) => r(i, a, xi, 0));
  let Ut, Ot = null, Nt = null;
  const Kn = o == 1 ? x[0].idxs : null;
  let Ae = null, wn = !1;
  function Kr(r, a) {
    if (t = r ?? [], i.data = i._data = t, o == 2) {
      Ut = 0;
      for (let c = 1; c < x.length; c++)
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
      c.auto(i, wn) ? Co() : ri(M, c.min, c.max), yi = yi || z.left >= 0, de = !0, Gi();
    }
  }
  i.setData = Kr;
  function Co() {
    wn = !0;
    let r, a;
    o == 1 && (Ut > 0 ? (Ot = Kn[0] = 0, Nt = Kn[1] = Ut - 1, r = t[0][Ot], a = t[0][Nt], q == 2 ? (r = Ot, a = Nt) : r == a && (q == 3 ? [r, a] = yo(r, r, S.log, !1) : q == 4 ? [r, a] = Mr(r, r, S.log, !1) : S.time ? a = r + Mt(86400 / V) : [r, a] = po(r, a, Dr, !0))) : (Ot = Kn[0] = r = null, Nt = Kn[1] = a = null)), ri(M, r, a);
  }
  let qn, Wi, Mo, Do, zo, Oo, No, Ho, Lo, Xt;
  function qr(r, a, c, u, d, m) {
    r ??= zs, c ??= Or, u ??= "butt", d ??= zs, m ??= "round", r != qn && (g.strokeStyle = qn = r), d != Wi && (g.fillStyle = Wi = d), a != Mo && (g.lineWidth = Mo = a), m != zo && (g.lineJoin = zo = m), u != Oo && (g.lineCap = Oo = u), c != Do && g.setLineDash(Do = c);
  }
  function Zr(r, a, c, u) {
    a != Wi && (g.fillStyle = Wi = a), r != No && (g.font = No = r), c != Ho && (g.textAlign = Ho = c), u != Lo && (g.textBaseline = Lo = u);
  }
  function Ro(r, a, c, u, d = 0) {
    if (u.length > 0 && r.auto(i, wn) && (a == null || a.min == null)) {
      let m = rt(Ot, 0), v = rt(Nt, u.length - 1), y = c.min == null ? fu(u, m, v, d, r.distr == 3) : [c.min, c.max];
      r.min = Ce(r.min, c.min = y[0]), r.max = Zt(r.max, c.max = y[1]);
    }
  }
  const Jr = { min: null, max: null };
  function Ta() {
    for (let u in $) {
      let d = $[u];
      H[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      H[M] != null && d.auto(i, wn)) && (H[u] = Jr);
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
        let m = r[u] = hn($[u], wu);
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
      x.forEach((u, d) => {
        if (o == 1) {
          let m = u.scale, v = H[m];
          if (v == null)
            return;
          let y = r[m];
          if (d == 0) {
            let w = y.range(i, y.min, y.max, m);
            y.min = w[0], y.max = w[1], Ot = Te(y.min, t[0]), Nt = Te(y.max, t[0]), Nt - Ot > 1 && (t[0][Ot] < y.min && Ot++, t[0][Nt] > y.max && Nt--), u.min = Ae[Ot], u.max = Ae[Nt];
          } else u.show && u.auto && Ro(y, v, u, t[d], u.sorted);
          u.idxs[0] = Ot, u.idxs[1] = Nt;
        } else if (d > 0 && u.show && u.auto) {
          let [m, v] = u.facets, y = m.scale, w = v.scale, [A, E] = t[d], C = r[y], j = r[w];
          C != null && Ro(C, H[y], m, A, m.sorted), j != null && Ro(j, H[w], v, E, v.sorted), u.min = v.min, u.max = v.max;
        }
      });
      for (let u in r) {
        let d = r[u], m = H[u];
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
      x.forEach((u, d) => {
        o == 2 ? d > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Ui = !0, Rt("setScale", u);
      Wt && z.left >= 0 && (yi = de = !0);
    }
    for (let u in H)
      H[u] = null;
  }
  function Ca(r) {
    let a = gr(Ot - 1, 0, Ut - 1), c = gr(Nt + 1, 0, Ut - 1);
    for (; r[a] == null && a > 0; )
      a--;
    for (; r[c] == null && c < Ut - 1; )
      c++;
    return [a, c];
  }
  function Ma() {
    if (Ut > 0) {
      let r = x.some((a) => a._focus) && Xt != Oe.alpha;
      r && (g.globalAlpha = Xt = Oe.alpha), x.forEach((a, c) => {
        if (c > 0 && a.show && (Qr(c, !1), Qr(c, !0), a._paths == null)) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha);
          let d = o == 2 ? [0, t[c][0].length - 1] : Ca(t[c]);
          a._paths = a.paths(i, c, d[0], d[1]), Xt != u && (g.globalAlpha = Xt = u);
        }
      }), x.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha), a._paths != null && Xr(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(i, c, Ot, Nt, d), v = a.points.filter(i, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(i, c, Ot, Nt, v), Xr(c, !0));
          }
          Xt != u && (g.globalAlpha = Xt = u), Rt("drawSeries", c);
        }
      }), r && (g.globalAlpha = Xt = 1);
    }
  }
  function Qr(r, a) {
    let c = a ? x[r].points : x[r];
    c._stroke = c.stroke(i, r), c._fill = c.fill(i, r);
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
      let st = ie - A / 2, ot = fe - A / 2, X = Qt + A, I = Se + A;
      E = new Path2D(), E.rect(st, ot, X, I);
    }
    a ? Fo(y, A, c.dash, c.cap, w, u, d, v, m) : Da(r, y, A, c.dash, c.cap, w, u, d, v, E, m), j && g.translate(-C, -C);
  }
  function Da(r, a, c, u, d, m, v, y, w, A, E) {
    let C = !1;
    w != 0 && Z.forEach((j, st) => {
      if (j.series[0] == r) {
        let ot = x[j.series[1]], X = t[j.series[1]], I = (ot._paths || Nn).band;
        ai(I) && (I = j.dir == 1 ? I[0] : I[1]);
        let O, bt = null;
        ot.show && I && pu(X, Ot, Nt) ? (bt = j.fill(i, st) || m, O = ot._paths.clip) : I = null, Fo(a, c, u, d, bt, v, y, w, A, E, O, I), C = !0;
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
  function za(r, a, c, u) {
    let d = R[r], m;
    if (u <= 0)
      m = [0, 0];
    else {
      let v = d._space = d.space(i, r, a, c, u), y = d._incrs = d.incrs(i, r, a, c, u, v);
      m = Nh(a, c, y, u, v);
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
  function Oa(r) {
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
      let m = c.side, v = m % 2, { min: y, max: w } = d, [A, E] = za(u, y, w, v == 0 ? K : T);
      if (E == 0)
        return;
      let C = d.distr == 2, j = c._splits = c.splits(i, u, y, w, A, E, C), st = d.distr == 2 ? j.map((O) => Ae[O]) : j, ot = d.distr == 2 ? Ae[j[1]] - Ae[j[0]] : A, X = c._values = c.values(i, c.filter(i, st, u, E, ot), u, E, ot);
      c._rotate = m == 2 ? c.rotate(i, X, u, E) : 0;
      let I = c._size;
      c._size = ve(c.size(i, X, u, r)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function Na(r) {
    let a = !0;
    return Gr.forEach((c, u) => {
      let d = c(i, u, xi, r);
      d != ni[u] && (a = !1), ni[u] = d;
    }), a;
  }
  function Ha() {
    for (let r = 0; r < R.length; r++) {
      let a = R[r];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, d, m, v = a.stroke(i, r), y = c == 0 || c == 3 ? -1 : 1, [w, A] = a._found;
      if (a.label != null) {
        let Kt = a.labelGap * y, re = Mt((a._lpos + Kt) * lt);
        Zr(a.labelFont[0], v, "center", c == 2 ? Pn : Ds), g.save(), u == 1 ? (d = m = 0, g.translate(
          re,
          Mt(fe + Se / 2)
        ), g.rotate((c == 3 ? -so : so) / 2)) : (d = Mt(ie + Qt / 2), m = re);
        let Ai = Fl(a.label) ? a.label(i, r, w, A) : a.label;
        g.fillText(Ai, d, m), g.restore();
      }
      if (A == 0)
        continue;
      let E = $[a.scale], C = u == 0 ? Qt : Se, j = u == 0 ? ie : fe, st = a._splits, ot = E.distr == 2 ? st.map((Kt) => Ae[Kt]) : st, X = E.distr == 2 ? Ae[st[1]] - Ae[st[0]] : w, I = a.ticks, O = a.border, bt = I.show ? I.size : 0, At = Mt(bt * lt), Ft = Mt((a.alignTo == 2 ? a._size - bt - a.gap : a.gap) * lt), ft = a._rotate * -so / 180, kt = U(a._pos * lt), ne = (At + Ft) * y, Gt = kt + ne;
      m = u == 0 ? Gt : 0, d = u == 1 ? Gt : 0;
      let ge = a.font[0], ke = a.align == 1 ? en : a.align == 2 ? Xo : ft > 0 ? en : ft < 0 ? Xo : u == 0 ? "center" : c == 3 ? Xo : en, Le = ft || u == 1 ? "middle" : c == 2 ? Pn : Ds;
      Zr(ge, v, ke, Le);
      let oe = a.font[1] * a.lineGap, me = st.map((Kt) => U(h(Kt, E, C, j))), Ee = a._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let re = Ee[Kt];
        if (re != null) {
          u == 0 ? d = me[Kt] : m = me[Kt], re = "" + re;
          let Ai = re.indexOf(`
`) == -1 ? [re] : re.split(/\n/gm);
          for (let qt = 0; qt < Ai.length; qt++) {
            let vs = Ai[qt];
            ft ? (g.save(), g.translate(d, m + qt * oe), g.rotate(ft), g.fillText(vs, 0, 0), g.restore()) : g.fillText(vs, d, m + qt * oe);
          }
        }
      }
      I.show && Uo(
        me,
        I.filter(i, ot, r, A, X),
        u,
        c,
        kt,
        At,
        pt(I.width * lt, 3),
        I.stroke(i, r),
        I.dash,
        I.cap
      );
      let Re = a.grid;
      Re.show && Uo(
        me,
        Re.filter(i, ot, r, A, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? fe : ie,
        u == 0 ? Se : Qt,
        pt(Re.width * lt, 3),
        Re.stroke(i, r),
        Re.dash,
        Re.cap
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
    x.forEach((a, c) => {
      c > 0 && (a._paths = null, r && (o == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let Qn = !1, Io = !1, xn = [];
  function La() {
    Io = !1;
    for (let r = 0; r < xn.length; r++)
      Rt(...xn[r]);
    xn.length = 0;
  }
  function Gi() {
    Qn || (Pu(es), Qn = !0);
  }
  function Ra(r, a = !1) {
    Qn = !0, Io = a, r(i), es(), a && xn.length > 0 && queueMicrotask(La);
  }
  i.batch = Ra;
  function es() {
    if (Po && (Ta(), Po = !1), Ui && (xa(), Ui = !1), Yn) {
      if (vt(k, en, gt), vt(k, Pn, Ct), vt(k, Cn, K), vt(k, Mn, T), vt(P, en, gt), vt(P, Pn, Ct), vt(P, Cn, K), vt(P, Mn, T), vt(_, Cn, Ke), vt(_, Mn, _i), b.width = Mt(Ke * lt), b.height = Mt(_i * lt), R.forEach(({ _el: r, _show: a, _size: c, _pos: u, side: d }) => {
        if (r != null)
          if (a) {
            let m = d === 3 || d === 0 ? c : 0, v = d % 2 == 1;
            vt(r, v ? "left" : "top", u - m), vt(r, v ? "width" : "height", c), vt(r, v ? "top" : "left", v ? Ct : gt), vt(r, v ? "height" : "width", v ? T : K), dr(r, Ti);
          } else
            se(r, Ti);
      }), qn = Wi = Mo = zo = Oo = No = Ho = Lo = Do = null, Xt = 1, An(!0), gt != Fi || Ct != bi || K != ze || T != vi) {
        Yi(!1);
        let r = K / ze, a = T / vi;
        if (Wt && !yi && z.left >= 0) {
          z.left *= r, z.top *= a, Ki && Fe(Ki, Mt(z.left), 0, K, T), qi && Fe(qi, 0, Mt(z.top), K, T);
          for (let c = 0; c < pe.length; c++) {
            let u = pe[c];
            u != null && (Bi[c] *= r, ji[c] *= a, Fe(u, ve(Bi[c]), ve(ji[c]), K, T));
          }
        }
        if (_t.show && !Gn && _t.left >= 0 && _t.width > 0) {
          _t.left *= r, _t.width *= r, _t.top *= a, _t.height *= a;
          for (let c in Go)
            vt(Qi, c, _t[c]);
        }
        Fi = gt, bi = Ct, ze = K, vi = T;
      }
      Rt("setSize"), Yn = !1;
    }
    Ke > 0 && _i > 0 && (g.clearRect(0, 0, b.width, b.height), Rt("drawClear"), G.forEach((r) => r()), Rt("draw")), _t.show && Gn && (Xn(_t), Gn = !1), Wt && yi && (Si(null, !0, !1), yi = !1), Q.show && Q.live && de && (Wo(), de = !1), f || (f = !0, i.status = 1, Rt("ready")), wn = !1, Qn = !1;
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
      r == M && c.distr == 2 && Ut > 0 && (a.min = Te(a.min, t[0]), a.max = Te(a.max, t[0]), a.min == a.max && a.max++), H[r] = a, Po = !0, Gi();
    }
  }
  i.setScale = Vo;
  let Bo, jo, Ki, qi, is, ns, Zi, Ji, os, rs, mt, xt, oi = !1;
  const It = z.drag;
  let Ht = It.x, Lt = It.y;
  Wt && (z.x && (Bo = be(Qc, P)), z.y && (jo = be(Xc, P)), S.ori == 0 ? (Ki = Bo, qi = jo) : (Ki = jo, qi = Bo), mt = z.left, xt = z.top);
  const _t = i.select = Pt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), Qi = _t.show ? be(Jc, _t.over ? P : k) : null;
  function Xn(r, a) {
    if (_t.show) {
      for (let c in r)
        _t[c] = r[c], c in Go && vt(Qi, c, r[c]);
      a !== !1 && Rt("setSelect");
    }
  }
  i.setSelect = Xn;
  function Fa(r) {
    if (x[r].show)
      Tt && dr(St[r], Ti);
    else if (Tt && se(St[r], Ti), Wt) {
      let c = Vi ? pe[0] : pe[r];
      c != null && Fe(c, -10, -10, K, T);
    }
  }
  function ri(r, a, c) {
    Vo(r, { min: a, max: c });
  }
  function Ne(r, a, c, u) {
    a.focus != null && ja(r), a.show != null && x.forEach((d, m) => {
      m > 0 && (r == m || r == null) && (d.show = a.show, Fa(m), o == 2 ? (ri(d.facets[0].scale, null, null), ri(d.facets[1].scale, null, null)) : ri(d.scale, null, null), Gi());
    }), c !== !1 && Rt("setSeries", r, a), u && kn("setSeries", i, r, a);
  }
  i.setSeries = Ne;
  function Ua(r, a) {
    Pt(Z[r], a);
  }
  function Ia(r, a) {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1), a = a ?? Z.length, Z.splice(a, 0, r);
  }
  function Va(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  i.addBand = Ia, i.setBand = Ua, i.delBand = Va;
  function Ba(r, a) {
    x[r].alpha = a, Wt && pe[r] != null && (pe[r].style.opacity = a), Tt && St[r] && (St[r].style.opacity = a);
  }
  let qe, si, $i;
  const Xi = { focus: !0 };
  function ja(r) {
    if (r != $i) {
      let a = r == null, c = Oe.alpha != 1;
      x.forEach((u, d) => {
        if (o == 1 || d > 0) {
          let m = a || d == 0 || d == r;
          u._focus = a ? null : m, c && Ba(d, m ? 1 : Oe.alpha);
        }
      }), $i = r, c && Gi();
    }
  }
  Tt && Ii && Yt(Hs, ct, (r) => {
    z._lock || (wi(r), $i != null && Ne(null, Xi, !0, Et.setSeries));
  });
  function He(r, a, c) {
    let u = $[a];
    c && (r = r / lt - (u.ori == 1 ? Ct : gt));
    let d = K;
    u.ori == 1 && (d = T, r = d - r), u.dir == -1 && (r = d - r);
    let m = u._min, v = u._max, y = r / d, w = m + (v - m) * y, A = u.distr;
    return A == 3 ? cn(10, w) : A == 4 ? mu(w, u.asinh) : A == 100 ? u.bwd(w) : w;
  }
  function Wa(r, a) {
    let c = He(r, M, a);
    return Te(c, t[0], Ot, Nt);
  }
  i.valToIdx = (r) => Te(r, t[0]), i.posToIdx = Wa, i.posToVal = He, i.valToPos = (r, a, c) => $[a].ori == 0 ? s(
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
  function ss(r, a) {
    vt(Qi, en, _t.left = r), vt(Qi, Cn, _t.width = a);
  }
  function ls(r, a) {
    vt(Qi, Pn, _t.top = r), vt(Qi, Mn, _t.height = a);
  }
  let $n = S.ori == 0 ? ss : ls, Sn = S.ori == 1 ? ss : ls;
  function Ya() {
    if (Tt && Q.live)
      for (let r = o == 2 ? 1 : 0; r < x.length; r++) {
        if (r == 0 && he)
          continue;
        let a = Q.values[r], c = 0;
        for (let u in a)
          De[r][c++].firstChild.nodeValue = a[u];
      }
  }
  function Wo(r, a) {
    if (r != null && (r.idxs ? r.idxs.forEach((c, u) => {
      ht[u] = c;
    }) : yu(r.idx) || ht.fill(r.idx), Q.idx = ht[0]), Tt && Q.live) {
      for (let c = 0; c < x.length; c++)
        (c > 0 || o == 1 && !he) && Ga(c, ht[c]);
      Ya();
    }
    de = !1, a !== !1 && Rt("setLegend");
  }
  i.setLegend = Wo;
  function Ga(r, a) {
    let c = x[r], u = r == 0 && q == 2 ? Ae : t[r], d;
    he ? d = c.values(i, r, a) ?? ii : (d = c.value(i, a == null ? null : u[a], r, a), d = d == null ? ii : { _: d }), Q.values[r] = d;
  }
  function Si(r, a, c) {
    os = mt, rs = xt, [mt, xt] = z.move(i, mt, xt), z.left = mt, z.top = xt, Wt && (Ki && Fe(Ki, Mt(mt), 0, K, T), qi && Fe(qi, 0, Mt(xt), K, T));
    let u, d = Ot > Nt;
    qe = dt, si = null;
    let m = S.ori == 0 ? K : T, v = S.ori == 1 ? K : T;
    if (mt < 0 || Ut == 0 || d) {
      u = z.idx = null;
      for (let y = 0; y < x.length; y++) {
        let w = pe[y];
        w != null && Fe(w, -10, -10, K, T);
      }
      Ii && Ne(null, Xi, !0, r == null && Et.setSeries), Q.live && (ht.fill(u), de = !0);
    } else {
      let y, w, A;
      o == 1 && (y = S.ori == 0 ? mt : xt, w = He(y, M), u = z.idx = Te(w, t[0], Ot, Nt), A = D(t[0][u], S, m, 0));
      let E = -10, C = -10, j = 0, st = 0, ot = !0, X = "", I = "";
      for (let O = o == 2 ? 1 : 0; O < x.length; O++) {
        let bt = x[O], At = ht[O], Ft = At == null ? null : o == 1 ? t[O][At] : t[O][1][At], ft = z.dataIdx(i, O, u, w), kt = ft == null ? null : o == 1 ? t[O][ft] : t[O][1][ft];
        if (de = de || kt != Ft || ft != At, ht[O] = ft, O > 0 && bt.show) {
          let ne = ft == null ? -10 : ft == u ? A : D(o == 1 ? t[0][ft] : t[O][0][ft], S, m, 0), Gt = kt == null ? -10 : B(kt, o == 1 ? $[bt.scale] : $[bt.facets[1].scale], v, 0);
          if (Ii && kt != null) {
            let ge = S.ori == 1 ? mt : xt, ke = Dt(Oe.dist(i, O, ft, Gt, ge));
            if (ke < qe) {
              let Le = Oe.bias;
              if (Le != 0) {
                let oe = He(ge, bt.scale), me = kt >= 0 ? 1 : -1, Ee = oe >= 0 ? 1 : -1;
                Ee == me && (Ee == 1 ? Le == 1 ? kt >= oe : kt <= oe : (
                  // >= 0
                  Le == 1 ? kt <= oe : kt >= oe
                )) && (qe = ke, si = O);
              } else
                qe = ke, si = O;
            }
          }
          if (de || Vi) {
            let ge, ke;
            S.ori == 0 ? (ge = ne, ke = Gt) : (ge = Gt, ke = ne);
            let Le, oe, me, Ee, Re, Kt, re = !0, Ai = Bt.bbox;
            if (Ai != null) {
              re = !1;
              let qt = Ai(i, O);
              me = qt.left, Ee = qt.top, Le = qt.width, oe = qt.height;
            } else
              me = ge, Ee = ke, Le = oe = Bt.size(i, O);
            if (Kt = Bt.fill(i, O), Re = Bt.stroke(i, O), Vi)
              O == si && qe <= Oe.prox && (E = me, C = Ee, j = Le, st = oe, ot = re, X = Kt, I = Re);
            else {
              let qt = pe[O];
              qt != null && (Bi[O] = me, ji[O] = Ee, Bs(qt, Le, oe, re), Is(qt, Kt, Re), Fe(qt, ve(me), ve(Ee), K, T));
            }
          }
        }
      }
      if (Vi) {
        let O = Oe.prox, bt = $i == null ? qe <= O : qe > O || si != $i;
        if (de || bt) {
          let At = pe[0];
          At != null && (Bi[0] = E, ji[0] = C, Bs(At, j, st, ot), Is(At, X, I), Fe(At, ve(E), ve(C), K, T));
        }
      }
    }
    if (_t.show && oi)
      if (r != null) {
        let [y, w] = Et.scales, [A, E] = Et.match, [C, j] = r.cursor.sync.scales, st = r.cursor.drag;
        if (Ht = st._x, Lt = st._y, Ht || Lt) {
          let { left: ot, top: X, width: I, height: O } = r.select, bt = r.scales[C].ori, At = r.posToVal, Ft, ft, kt, ne, Gt, ge = y != null && A(y, C), ke = w != null && E(w, j);
          ge && Ht ? (bt == 0 ? (Ft = ot, ft = I) : (Ft = X, ft = O), kt = $[y], ne = D(At(Ft, C), kt, m, 0), Gt = D(At(Ft + ft, C), kt, m, 0), $n(Ce(ne, Gt), Dt(Gt - ne))) : $n(0, m), ke && Lt ? (bt == 1 ? (Ft = ot, ft = I) : (Ft = X, ft = O), kt = $[w], ne = B(At(Ft, j), kt, v, 0), Gt = B(At(Ft + ft, j), kt, v, 0), Sn(Ce(ne, Gt), Dt(Gt - ne))) : Sn(0, v);
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
        Ht && (S.ori == 0 ? (E = Zi, C = mt) : (E = Ji, C = xt), $n(Ce(E, C), Dt(C - E)), Lt || Sn(0, v)), Lt && (S.ori == 1 ? (E = Zi, C = mt) : (E = Ji, C = xt), Sn(Ce(E, C), Dt(C - E)), Ht || $n(0, m)), !Ht && !Lt && ($n(0, 0), Sn(0, 0));
      }
    if (It._x = Ht, It._y = Lt, r == null) {
      if (c) {
        if (bs != null) {
          let [y, w] = Et.scales;
          Et.values[0] = y != null ? He(S.ori == 0 ? mt : xt, y) : null, Et.values[1] = w != null ? He(S.ori == 1 ? mt : xt, w) : null;
        }
        kn(tr, i, mt, xt, K, T, u);
      }
      if (Ii) {
        let y = c && Et.setSeries, w = Oe.prox;
        $i == null ? qe <= w && Ne(si, Xi, !0, y) : qe > w ? Ne(null, Xi, !0, y) : si != $i && Ne(si, Xi, !0, y);
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
        mt = -10, xt = -10;
        return;
      }
      let [A, E] = Et.scales, C = a.cursor.sync, [j, st] = C.values, [ot, X] = C.scales, [I, O] = Et.match, bt = a.axes[0].side % 2 == 1, At = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, ft = bt ? m : d, kt = bt ? d : m, ne = bt ? u : c, Gt = bt ? c : u;
      if (ot != null ? c = I(A, ot) ? h(j, $[A], At, 0) : -10 : c = At * (ne / ft), X != null ? u = O(E, X) ? h(st, $[E], Ft, 0) : -10 : u = Ft * (Gt / kt), S.ori == 1) {
        let ge = c;
        c = u, u = ge;
      }
    }
    w && (a == null || a.cursor.event.type == tr) && ((c <= 1 || c >= K - 1) && (c = Ei(c, K)), (u <= 1 || u >= T - 1) && (u = Ei(u, T))), y ? (is = c, ns = u, [Zi, Ji] = z.move(i, c, u)) : (mt = c, xt = u);
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
    oi = !0, Ht = Lt = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !0, !1), r != null && (Yt(er, hr, ps, !1), kn(Os, i, Zi, Ji, K, T, null));
    let { left: y, top: w, width: A, height: E } = _t;
    cs = y, us = w, hs = A, fs = E;
  }
  function ps(r, a, c, u, d, m, v) {
    oi = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !1, !0);
    let { left: y, top: w, width: A, height: E } = _t, C = A > 0 || E > 0, j = cs != y || us != w || hs != A || fs != E;
    if (C && j && Xn(_t), It.setScale && C && j) {
      let st = y, ot = A, X = w, I = E;
      if (S.ori == 1 && (st = w, ot = E, X = y, I = A), Ht && ri(
        M,
        He(st, M),
        He(st + ot, M)
      ), Lt)
        for (let O in $) {
          let bt = $[O];
          O != M && bt.from == null && bt.min != dt && ri(
            O,
            He(X + I, O),
            He(X, O)
          );
        }
      Ko();
    } else z.lock && (z._lock = !z._lock, Si(a, !0, r != null));
    r != null && (Ri(er, hr), kn(er, i, mt, xt, K, T, null));
  }
  function Ka(r, a, c, u, d, m, v) {
    if (z._lock)
      return;
    wi(r);
    let y = oi;
    if (oi) {
      let w = !0, A = !0, E = 10, C, j;
      S.ori == 0 ? (C = Ht, j = Lt) : (C = Lt, j = Ht), C && j && (w = mt <= E || mt >= K - E, A = xt <= E || xt >= T - E), C && w && (mt = mt < Zi ? 0 : K), j && A && (xt = xt < Ji ? 0 : T), Si(null, !0, !0), oi = !1;
    }
    mt = -10, xt = -10, ht.fill(null), Si(null, !0, !0), y && (oi = y);
  }
  function gs(r, a, c, u, d, m, v) {
    z._lock || (wi(r), Co(), Ko(), r != null && kn(Ls, i, mt, xt, K, T, null));
  }
  function ms() {
    R.forEach(Hh), To(i.width, i.height, !0);
  }
  Mi(fo, sn, ms);
  const tn = {};
  tn.mousedown = ds, tn.mousemove = as, tn.mouseup = ps, tn.dblclick = gs, tn.setSeries = (r, a, c, u) => {
    let d = Et.match[2];
    c = d(i, a, c), c != -1 && Ne(c, u, !0, !1);
  }, Wt && (Yt(Os, P, ds), Yt(tr, P, as), Yt(Ns, P, (r) => {
    wi(r), An(!1);
  }), Yt(Hs, P, Ka), Yt(Ls, P, gs), vr.add(i), i.syncRect = An);
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
  const bs = Et.key, qo = ca(bs);
  function kn(r, a, c, u, d, m, v) {
    Et.filters.pub(r, a, c, u, d, m, v) && qo.pub(r, a, c, u, d, m, v);
  }
  qo.sub(i);
  function qa(r, a, c, u, d, m, v) {
    Et.filters.sub(r, a, c, u, d, m, v) && tn[r](null, a, c, u, d, m, v);
  }
  i.pub = qa;
  function Za() {
    qo.unsub(i), vr.delete(i), mi.clear(), pr(fo, sn, ms), p.remove(), ct?.remove(), Rt("destroy");
  }
  i.destroy = Za;
  function Zo() {
    Rt("init", e, t), Kr(t || e.data, !1), H[M] ? Vo(M, H[M]) : Co(), Gn = _t.show && (_t.width > 0 || _t.height > 0), yi = de = !0, To(e.width, e.height);
  }
  return x.forEach(Yr), R.forEach(Pa), n ? n instanceof HTMLElement ? (n.appendChild(p), Zo()) : n(i, Zo) : Zo(), i;
}
jt.assign = Pt;
jt.fmtNum = zr;
jt.rangeNum = po;
jt.rangeLog = yo;
jt.rangeAsinh = Mr;
jt.orient = Ni;
jt.pxRatio = lt;
jt.join = Eu;
jt.fmtDate = Nr, jt.tzDate = Ru;
jt.sync = ca;
{
  jt.addGap = yh, jt.clipGaps = $o;
  let e = jt.paths = {
    points: ga
  };
  e.linear = _a, e.stepped = $h, e.bars = Sh, e.spline = kh;
}
const Lh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Rh = Object.defineProperty, Fh = Object.getOwnPropertyDescriptor, We = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Fh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Rh(t, n, o), o;
};
const Uh = 24;
let we = class extends Vt {
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
    const e = /* @__PURE__ */ new Date(), t = new Date(e.getTime() - Uh * 60 * 60 * 1e3), n = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
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
              g <= b || (l.fillStyle = p.action === "heating" ? _l(n, 0.18) : _l(i, 0.18), l.fillRect(b, h, g - b, f));
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
  ce,
  Sl(Lh),
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
We([
  Y({ attribute: !1 })
], we.prototype, "hass", 2);
We([
  Y({ type: String })
], we.prototype, "roomEntity", 2);
We([
  Y({ type: String })
], we.prototype, "lowEntity", 2);
We([
  Y({ type: String })
], we.prototype, "highEntity", 2);
We([
  Y({ type: String })
], we.prototype, "actionEntity", 2);
We([
  $t()
], we.prototype, "_loading", 2);
We([
  $t()
], we.prototype, "_error", 2);
We([
  $t()
], we.prototype, "_empty", 2);
We([
  Bn(".chart-host")
], we.prototype, "_host", 2);
we = We([
  ae("comfort-band-history-chart")
], we);
function _l(e, t) {
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
var Ih = Object.defineProperty, Vh = Object.getOwnPropertyDescriptor, Vr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Vh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Ih(t, n, o), o;
};
let Un = class extends Vt {
  render() {
    const e = this.entities?.roomTemperature;
    return e ? F`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
      ></comfort-band-history-chart>
      ${at}
    ` : F`<div class="empty">No room temperature sensor for this zone.</div>`;
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
Vr([
  Y({ attribute: !1 })
], Un.prototype, "hass", 2);
Vr([
  Y({ attribute: !1 })
], Un.prototype, "entities", 2);
Un = Vr([
  ae("comfort-band-insights-tab")
], Un);
var Bh = Object.defineProperty, jh = Object.getOwnPropertyDescriptor, bn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? jh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Bh(t, n, o), o;
};
const Qe = 15, Ie = 0.5, Ze = 14, Ue = 28, bl = 4, Wh = 500, nn = 600, oo = 200, vl = 0, yl = 24 * 60 - Qe, sr = [0, 6, 12, 18, 24], wl = [14, 18, 22, 26];
function Je(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function lr(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function Yh(e) {
  return Math.round(e / Qe) * Qe;
}
function ar(e) {
  return Math.round(e / Ie) * Ie;
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
      }, Wh), this._drag = o;
    }, this._onHandlePointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle" || t.longPressed) return;
      const n = e.clientX - t.startX, i = e.clientY - t.startY;
      if (!t.moved && Math.hypot(n, i) < bl) return;
      t.moved || (t.moved = !0, t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null));
      const o = this._svg();
      if (!o) return;
      const s = o.getBoundingClientRect(), l = this._timeRangeFor(t.origin.at), h = _e(this._clientToMinutes(e.clientX, s), l.min, l.max), f = this._clientToTemp(e.clientY, s);
      let p = t.origin.low, b = t.origin.high;
      t.handle === "low" ? p = _e(f, Ze, b - Ie) : b = _e(f, p + Ie, Ue), this._preview = { at: lr(h), low: p, high: b };
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
        i && this._fire("transition-update", {
          oldAt: t.origin.at,
          transition: { at: i.at, low: i.low, high: i.high }
        });
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
      t.setPointerCapture(e.pointerId);
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
      Math.hypot(n, i) >= bl && (t.moved = !0);
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
      const s = n.getBoundingClientRect(), l = _e(this._clientToMinutes(e.clientX, s), vl, yl);
      for (const b of this.transitions) if (Je(b.at) === l) return;
      const h = this._clientToTemp(e.clientY, s), f = _e(ar(h - 1.5), Ze, Ue - Ie), p = _e(ar(h + 1.5), f + Ie, Ue);
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
          o = Ie;
          break;
        case "ArrowDown":
          o = -Ie;
          break;
        default:
          return;
      }
      e.preventDefault();
      const s = this._timeRangeFor(t.at), l = _e(Je(t.at) + i, s.min, s.max);
      let h = t.low, f = t.high;
      n === "low" ? h = _e(t.low + o, Ze, f - Ie) : f = _e(t.high + o, h + Ie, Ue), !(l === Je(t.at) && h === t.low && f === t.high) && this._fire("transition-update", {
        oldAt: t.at,
        transition: { at: lr(l), low: h, high: f }
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
    const t = _e(e, Ze, Ue);
    return oo - (t - Ze) / (Ue - Ze) * oo;
  }
  _clientToMinutes(e, t) {
    if (t.width === 0) return 0;
    const n = _e((e - t.left) / t.width, 0, 1);
    return Yh(n * 24 * 60);
  }
  _clientToTemp(e, t) {
    if (t.height === 0) return Ze;
    const n = _e((e - t.top) / t.height, 0, 1), i = Ue - n * (Ue - Ze);
    return ar(i);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((e) => Je(e.at)).sort((e, t) => e - t);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(e) {
    const t = Je(e), n = this._sortedAts().filter((s) => s !== t);
    let i = vl, o = yl;
    for (const s of n)
      s < t && s + Qe > i && (i = s + Qe), s > t && s - Qe < o && (o = s - Qe);
    return { min: i, max: o };
  }
  _fire(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const e = [...this.transitions].sort((n, i) => Je(n.at) - Je(i.at));
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
      const l = this._timeToX(Je(s.at));
      i.push([l, this._tempToY(o)]), i.push([l, this._tempToY(s[t])]), o = s[t];
    }
    return i.push([nn, this._tempToY(o)]), i;
  }
  _stepPath(e, t) {
    return e.length === 0 ? "" : this._stepPoints(e, t).map(([i, o], s) => `${s === 0 ? "M" : "L"} ${i} ${o}`).join(" ");
  }
  _fillPath(e) {
    if (e.length === 0) return "";
    const t = this._stepPoints(e, "high"), n = this._stepPoints(e, "low"), i = t.map(([s, l], h) => `${h === 0 ? "M" : "L"} ${s} ${l}`).join(" "), o = n.slice().reverse().map(([s, l]) => `L ${s} ${l}`).join(" ");
    return `${i} ${o} Z`;
  }
  render() {
    const e = this._renderedTransitions(), t = this._stepPath(e, "low"), n = this._stepPath(e, "high"), i = this._fillPath(e);
    return F`
      <div class="chart">
        <svg
          viewBox="0 0 ${nn} ${oo}"
          preserveAspectRatio="none"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          ${wl.map(
      (o) => ui`<line class="grid" x1="0" x2=${nn} y1=${this._tempToY(o)} y2=${this._tempToY(o)}></line>`
    )}
          ${sr.map(
      (o) => ui`<line class="grid" y1="0" y2=${oo} x1=${o / 24 * nn} x2=${o / 24 * nn}></line>`
    )}
          ${e.length > 0 ? ui`
                <path class="fill" d=${i}></path>
                <path class="line low" d=${t}></path>
                <path class="line high" d=${n}></path>
              ` : null}
          ${e.map((o) => {
      const s = this._timeToX(Je(o.at)), l = this._tempToY(o.low), h = this._tempToY(o.high), f = this._focusedAt === o.at && this._focusedHandle === "low", p = this._focusedAt === o.at && this._focusedHandle === "high", b = `Low handle at ${o.at}, ${o.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, g = `High handle at ${o.at}, ${o.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`;
      return ui`
              <circle
                class=${`handle low${f ? " focused" : ""}`}
                cx=${s}
                cy=${l}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${b}
                data-at=${o.at}
                data-handle="low"
                @pointerdown=${(_) => this._onHandlePointerDown(_, o, "low")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
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
                role="button"
                aria-label=${g}
                data-at=${o.at}
                data-handle="high"
                @pointerdown=${(_) => this._onHandlePointerDown(_, o, "high")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(_) => this._onHandleKeyDown(_, o, "high")}
                @focus=${() => this._onHandleFocus(o, "high")}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
    })}
        </svg>
        ${wl.map(
      (o) => F`<div
              class="axis-label y"
              style="top: ${(Ue - o) / (Ue - Ze) * 100}%"
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
var Gh = Object.defineProperty, Kh = Object.getOwnPropertyDescriptor, pi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Kh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Gh(t, n, o), o;
};
let Ve = class extends Vt {
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
    return F`
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
Ve.styles = [
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
], Ve.prototype, "transition", 2);
pi([
  Y({ type: Boolean })
], Ve.prototype, "isNew", 2);
pi([
  $t()
], Ve.prototype, "_at", 2);
pi([
  $t()
], Ve.prototype, "_low", 2);
pi([
  $t()
], Ve.prototype, "_high", 2);
pi([
  $t()
], Ve.prototype, "_error", 2);
pi([
  Bn('input[name="at"]')
], Ve.prototype, "_atInput", 2);
Ve = pi([
  ae("transition-edit-dialog")
], Ve);
var qh = Object.defineProperty, Zh = Object.getOwnPropertyDescriptor, Ye = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Zh(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && qh(t, n, o), o;
};
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
      const { oldAt: t, transition: n } = e.detail, i = this._transitions.filter((o) => o.at !== t && o.at !== n.at).concat(n).sort((o, s) => o.at.localeCompare(s.at));
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
      n.sort((i, o) => i.at.localeCompare(o.at)), await this._writeSchedule(n), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      await this._writeSchedule(t), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = xl(this.hass) ?? "home", this._subscribe());
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = xl(this.hass);
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
      const t = await Pc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (n) => {
          e === this._subscribeGen && (this._transitions = n?.baseline ? [...n.baseline] : [], this._loading = !1);
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
        await Tc(this.hass, {
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
        low: this._newLow ?? Jh(this._transitions),
        high: this._newHigh ?? Qh(this._transitions)
      };
      return F`
        <transition-edit-dialog
          .transition=${e}
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
      (e) => F`
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
Ye([
  Y({ attribute: !1 })
], xe.prototype, "hass", 2);
Ye([
  Y({ type: String })
], xe.prototype, "zone", 2);
Ye([
  $t()
], xe.prototype, "_profile", 2);
Ye([
  $t()
], xe.prototype, "_transitions", 2);
Ye([
  $t()
], xe.prototype, "_loading", 2);
Ye([
  $t()
], xe.prototype, "_error", 2);
Ye([
  $t()
], xe.prototype, "_mode", 2);
Ye([
  $t()
], xe.prototype, "_editing", 2);
Ye([
  $t()
], xe.prototype, "_newAt", 2);
xe = Ye([
  ae("comfort-band-schedule-tab")
], xe);
function xl(e) {
  const t = zl(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Jh(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Qh(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Xh = Object.defineProperty, tf = Object.getOwnPropertyDescriptor, gi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? tf(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && Xh(t, n, o), o;
};
const ef = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "insights", label: "Insights" }
];
let Be = class extends Vt {
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
    return F`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist">
            ${ef.map(
      (t) => F`
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
Be.styles = [
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
], Be.prototype, "hass", 2);
gi([
  Y({ type: String })
], Be.prototype, "zone", 2);
gi([
  Y({ type: String })
], Be.prototype, "zoneName", 2);
gi([
  Y({ attribute: !1 })
], Be.prototype, "entities", 2);
gi([
  $t()
], Be.prototype, "_activeTab", 2);
gi([
  $t()
], Be.prototype, "_isOpen", 2);
gi([
  Bn("dialog")
], Be.prototype, "_dialog", 2);
Be = gi([
  ae("comfort-band-modal")
], Be);
var nf = Object.defineProperty, of = Object.getOwnPropertyDescriptor, Br = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? of(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && nf(t, n, o), o;
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
      return F`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return F`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? F`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (n) => F` <option value=${n} ?selected=${n === this.config.zone}>${n}</option> `
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
Br([
  Y({ attribute: !1 })
], In.prototype, "hass", 2);
Br([
  Y({ attribute: !1 })
], In.prototype, "config", 2);
In = Br([
  ae("comfort-band-card-editor")
], In);
var rf = Object.defineProperty, sf = Object.getOwnPropertyDescriptor, Eo = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? sf(t, n) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (i ? l(t, n, o) : l(o)) || o);
  return i && o && rf(t, n, o), o;
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
    if (!this._config || !this.hass) return F``;
    const e = this._config.zone, t = Fc(this.hass, e);
    if (t.deviceId === null)
      return F`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const n = this._config.compact === !0, i = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
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
