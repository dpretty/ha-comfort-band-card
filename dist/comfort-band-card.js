const Ro = globalThis, vr = Ro.ShadowRoot && (Ro.ShadyCSS === void 0 || Ro.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wr = Symbol(), xa = /* @__PURE__ */ new WeakMap();
let Kl = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== wr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (vr && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = xa.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && xa.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zo = (e) => new Kl(typeof e == "string" ? e : e + "", void 0, wr), De = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Kl(n, e, wr);
}, Fh = (e, t) => {
  if (vr) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = Ro.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, $a = vr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Zo(n);
})(e) : e;
const { is: Hh, defineProperty: Lh, getOwnPropertyDescriptor: Rh, getOwnPropertyNames: jh, getOwnPropertySymbols: Ih, getPrototypeOf: Uh } = Object, Jo = globalThis, ka = Jo.trustedTypes, Bh = ka ? ka.emptyScript : "", zs = Jo.reactiveElementPolyfillSupport, oo = (e, t) => e, Uo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Bh : null;
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
} }, yr = (e, t) => !Hh(e, t), Sa = { attribute: !0, type: String, converter: Uo, reflect: !1, useDefault: !1, hasChanged: yr };
Symbol.metadata ??= Symbol("metadata"), Jo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let $i = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Sa) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Lh(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = Rh(this.prototype, t) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: o, set(r) {
      const c = o == null ? void 0 : o.call(this);
      s == null || s.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Sa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(oo("elementProperties"))) return;
    const t = Uh(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(oo("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(oo("properties"))) {
      const n = this.properties, i = [...jh(n), ...Ih(n)];
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
      for (const o of i) n.unshift($a(o));
    } else t !== void 0 && n.push($a(t));
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
    var t;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((n) => n(this));
  }
  addController(t) {
    var n;
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) == null || n.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$EO) == null || n.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Fh(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    var s;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : Uo).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var s, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((s = c.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? c.converter : Uo;
      this._$Em = o;
      const d = h.fromAttribute(n, c.type);
      this[o] = d ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (s = this[t]), i ??= c.getPropertyOptions(t), !((i.hasChanged ?? yr)(s, n) || i.useDefault && i.reflect && s === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: s }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? n ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [s, r] of o) {
        const { wrapped: c } = r, h = this[s];
        c !== !0 || this._$AL.has(s) || h === void 0 || this.C(s, void 0, r, h);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((o) => {
        var s;
        return (s = o.hostUpdate) == null ? void 0 : s.call(o);
      }), this.update(n)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
$i.elementStyles = [], $i.shadowRootOptions = { mode: "open" }, $i[oo("elementProperties")] = /* @__PURE__ */ new Map(), $i[oo("finalized")] = /* @__PURE__ */ new Map(), zs == null || zs({ ReactiveElement: $i }), (Jo.reactiveElementVersions ??= []).push("2.1.2");
const xr = globalThis, Aa = (e) => e, Bo = xr.trustedTypes, Ta = Bo ? Bo.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ql = "$lit$", yn = `lit$${Math.random().toFixed(9).slice(2)}$`, Yl = "?" + yn, Wh = `<${Yl}>`, Kn = document, co = () => Kn.createComment(""), ho = (e) => e === null || typeof e != "object" && typeof e != "function", $r = Array.isArray, Gh = (e) => $r(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Os = `[ 	
\f\r]`, qi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ca = /-->/g, Ea = />/g, Rn = RegExp(`>|${Os}(?:([^\\s"'>=/]+)(${Os}*=${Os}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Da = /'/g, Ma = /"/g, Zl = /^(?:script|style|textarea|title)$/i, Jl = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), v = Jl(1), Yi = Jl(2), Ti = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Pa = /* @__PURE__ */ new WeakMap(), Gn = Kn.createTreeWalker(Kn, 129);
function Ql(e, t) {
  if (!$r(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ta !== void 0 ? Ta.createHTML(t) : t;
}
const Vh = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = qi;
  for (let c = 0; c < n; c++) {
    const h = e[c];
    let d, p, g = -1, b = 0;
    for (; b < h.length && (r.lastIndex = b, p = r.exec(h), p !== null); ) b = r.lastIndex, r === qi ? p[1] === "!--" ? r = Ca : p[1] !== void 0 ? r = Ea : p[2] !== void 0 ? (Zl.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = Rn) : p[3] !== void 0 && (r = Rn) : r === Rn ? p[0] === ">" ? (r = o ?? qi, g = -1) : p[1] === void 0 ? g = -2 : (g = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? Rn : p[3] === '"' ? Ma : Da) : r === Ma || r === Da ? r = Rn : r === Ca || r === Ea ? r = qi : (r = Rn, o = void 0);
    const x = r === Rn && e[c + 1].startsWith("/>") ? " " : "";
    s += r === qi ? h + Wh : g >= 0 ? (i.push(d), h.slice(0, g) + ql + h.slice(g) + yn + x) : h + yn + (g === -2 ? c : x);
  }
  return [Ql(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class uo {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const c = t.length - 1, h = this.parts, [d, p] = Vh(t, n);
    if (this.el = uo.createElement(d, i), Gn.currentNode = this.el.content, n === 2 || n === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (o = Gn.nextNode()) !== null && h.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const g of o.getAttributeNames()) if (g.endsWith(ql)) {
          const b = p[r++], x = o.getAttribute(g).split(yn), A = /([.?@])?(.*)/.exec(b);
          h.push({ type: 1, index: s, name: A[2], strings: x, ctor: A[1] === "." ? qh : A[1] === "?" ? Yh : A[1] === "@" ? Zh : Qo }), o.removeAttribute(g);
        } else g.startsWith(yn) && (h.push({ type: 6, index: s }), o.removeAttribute(g));
        if (Zl.test(o.tagName)) {
          const g = o.textContent.split(yn), b = g.length - 1;
          if (b > 0) {
            o.textContent = Bo ? Bo.emptyScript : "";
            for (let x = 0; x < b; x++) o.append(g[x], co()), Gn.nextNode(), h.push({ type: 2, index: ++s });
            o.append(g[b], co());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Yl) h.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = o.data.indexOf(yn, g + 1)) !== -1; ) h.push({ type: 7, index: s }), g += yn.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = Kn.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ci(e, t, n = e, i) {
  var r, c;
  if (t === Ti) return t;
  let o = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const s = ho(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = Ci(e, o._$AS(e, t.values), o, i)), t;
}
class Kh {
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
    const { el: { content: n }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? Kn).importNode(n, !0);
    Gn.currentNode = o;
    let s = Gn.nextNode(), r = 0, c = 0, h = i[0];
    for (; h !== void 0; ) {
      if (r === h.index) {
        let d;
        h.type === 2 ? d = new _o(s, s.nextSibling, this, t) : h.type === 1 ? d = new h.ctor(s, h.name, h.strings, this, t) : h.type === 6 && (d = new Jh(s, this, t)), this._$AV.push(d), h = i[++c];
      }
      r !== (h == null ? void 0 : h.index) && (s = Gn.nextNode(), r++);
    }
    return Gn.currentNode = Kn, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class _o {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = Ci(this, t, n), ho(t) ? t === S || t == null || t === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : t !== this._$AH && t !== Ti && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gh(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== S && ho(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Kn.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = uo.createElement(Ql(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(n);
    else {
      const r = new Kh(o, this), c = r.u(this.options);
      r.p(n), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = Pa.get(t.strings);
    return n === void 0 && Pa.set(t.strings, n = new uo(t)), n;
  }
  k(t) {
    $r(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new _o(this.O(co()), this.O(co()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const o = Aa(t).nextSibling;
      Aa(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class Qo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = S;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = Ci(this, t, n, 0), r = !ho(t) || t !== this._$AH && t !== Ti, r && (this._$AH = t);
    else {
      const c = t;
      let h, d;
      for (t = s[0], h = 0; h < s.length - 1; h++) d = Ci(this, c[i + h], n, h), d === Ti && (d = this._$AH[h]), r ||= !ho(d) || d !== this._$AH[h], d === S ? t = S : t !== S && (t += (d ?? "") + s[h + 1]), this._$AH[h] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qh extends Qo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === S ? void 0 : t;
  }
}
class Yh extends Qo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== S);
  }
}
class Zh extends Qo {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Ci(this, t, n, 0) ?? S) === Ti) return;
    const i = this._$AH, o = t === S && i !== S || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== S && (i === S || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jh {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ci(this, t);
  }
}
const Fs = xr.litHtmlPolyfillSupport;
Fs == null || Fs(uo, _o), (xr.litHtmlVersions ??= []).push("3.3.2");
const Qh = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = o = new _o(t.insertBefore(co(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const so = globalThis;
let Te = class extends $i {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qh(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return Ti;
  }
};
var Vl;
Te._$litElement$ = !0, Te.finalized = !0, (Vl = so.litElementHydrateSupport) == null || Vl.call(so, { LitElement: Te });
const Hs = so.litElementPolyfillSupport;
Hs == null || Hs({ LitElement: Te });
(so.litElementVersions ??= []).push("4.2.2");
const Ge = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Xh = { attribute: !0, type: String, converter: Uo, reflect: !1, hasChanged: yr }, eu = (e = Xh, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: r } = n;
    return { set(c) {
      const h = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, h, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, e, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(c) {
      const h = this[r];
      t.call(this, c), this.requestUpdate(r, h, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function D(e) {
  return (t, n) => typeof n == "object" ? eu(e, t, n) : ((i, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function G(e) {
  return D({ ...e, state: !0, attribute: !1 });
}
const tu = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function zi(e, t) {
  return (n, i, o) => {
    const s = (r) => {
      var c;
      return ((c = r.renderRoot) == null ? void 0 : c.querySelector(e)) ?? null;
    };
    return tu(n, i, { get() {
      return s(this);
    } });
  };
}
const Ve = De`
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
function nu(e) {
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
function iu(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
const ou = 0.5, su = 10, ru = 35;
function Ct(e) {
  return `${rt(e.low)}–${rt(e.high)}°`;
}
function rt(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function Mo(e, t) {
  let n = t * ou;
  return n > 0 && (n = Math.max(0, Math.min(n, ru - e.high))), n < 0 && (n = Math.min(0, Math.max(n, su - e.low))), { low: Na(e.low + n), high: Na(e.high + n) };
}
function Na(e) {
  return Math.round(e * 10) / 10;
}
function Xl(e) {
  const { room: t, apparent: n, useApparent: i } = e, o = Number.isFinite(t) && Number.isFinite(n) && or(n) !== or(t);
  return i && Number.isFinite(n) ? {
    value: n,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${n.toFixed(1)}°` : "" };
}
function or(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function ec(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const n = or(e);
  return n < Math.round(t.low * 10) ? "below" : n > Math.round(t.high * 10) ? "above" : "in";
}
const au = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function tc(e) {
  return e.doing ? { kind: "adjusting", text: e.doing } : e.enabled ? e.sensor === "offline" ? { kind: "sensor", text: "On hold: the room sensor is offline" } : e.sensor === "no-reading" ? { kind: "sensor", text: "On hold: no room temperature reading" } : e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${za(e, !1).text}` } : za(e) : { kind: "paused", text: "Paused: not controlling this room" };
}
function za(e, t = !0) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const n = ec(e.temperature, e.band), i = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? n === "in" ? "comfortable" : n ?? "idle" : "none", o = au[i];
  let s;
  if (e.overrideActive) {
    const c = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    s = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${Ct(e.band)}${c}`;
  } else if (e.peak) {
    const c = lu(e), h = c !== null ? ` until ${e.formatTime(c)}` : "", d = t && e.peak.kind === "relaxed" ? " for a peak" : "";
    s = `${Ct(e.band)}${d}${h}`;
  } else {
    const c = e.peakComing != null && e.nextChange !== null && e.peakComing < e.nextChange, h = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now && !c ? ` until ${e.formatTime(e.nextChange)}` : "";
    s = `${Ct(e.band)}${h}`;
  }
  const r = o ? `${o} · ${s}` : s.charAt(0).toUpperCase() + s.slice(1);
  return { kind: i, text: r };
}
function lu(e) {
  var n;
  const t = ((n = e.peak) == null ? void 0 : n.at) ?? null;
  return t === null || t <= e.now ? null : e.scheduled === !1 ? t : e.scheduled !== !0 ? null : e.nextChange === null ? t : e.nextChange <= e.now ? null : Math.min(t, e.nextChange);
}
function nc(e) {
  if (e)
    try {
      return new Intl.DateTimeFormat("en", { timeZone: e }), e;
    } catch {
      return;
    }
}
function $n(e, t, n) {
  var p, g, b;
  const i = new Date(e), o = nc(n), s = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.time_format, r = (g = t == null ? void 0 : t.locale) == null ? void 0 : g.language;
  let c;
  if (s === "12") c = !0;
  else if (s === "24") c = !1;
  else {
    const x = new Intl.DateTimeFormat(s === "system" ? void 0 : r, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    c = x === "h11" || x === "h12";
  }
  const h = {
    hourCycle: c ? "h12" : "h23",
    hour: c ? "numeric" : "2-digit",
    ...o ? { timeZone: o } : {}
  }, d = o ? Number(
    (b = new Intl.DateTimeFormat("en", { timeZone: o, minute: "numeric" }).formatToParts(i).find((x) => x.type === "minute")) == null ? void 0 : b.value
  ) : i.getMinutes();
  return (!c || d !== 0) && (h.minute = "2-digit"), new Intl.DateTimeFormat(r, h).format(i);
}
function Ls(e, t) {
  const n = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!n) return e;
  const i = Number(n[1]), o = Number(n[2]);
  return i > 23 || o > 59 ? e : $n(new Date(2e3, 0, 1, i, o).getTime(), t);
}
var cu = Object.defineProperty, hu = Object.getOwnPropertyDescriptor, Zn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hu(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && cu(t, n, o), o;
};
const sr = 15, ic = 28, uu = ic - sr;
function Rs(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(sr, Math.min(ic, e)) - sr) / uu * 100;
}
let an = class extends Te {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = iu(this.action), t = Number.isFinite(this.low), n = Number.isFinite(this.high), i = Number.isFinite(this.room), o = t ? Rs(this.low) : 0, s = n ? Rs(this.high) : 100, r = Math.min(o, s), c = Math.max(0, Math.abs(s - o)), h = i ? Rs(this.room) : 50, d = (x) => Number.isFinite(x) ? `${x.toFixed(1)}°` : "—", p = e === "heating" || e === "cooling" ? `, ${e}` : "", g = `Comfortable range ${d(this.low)} to ${d(this.high)}, ${this.roomLabel} ${d(this.room)}${p}`, b = t && n;
    return v`
      <div
        class="gauge ${e}"
        role=${this.decorative ? S : "img"}
        aria-label=${this.decorative ? S : g}
        aria-hidden=${this.decorative ? "true" : S}
        style="--lo: ${r}%; --hi: ${r + c}%"
      >
        <div class="bar">
          <div class="track"></div>
          ${b ? v`<div class="band" style="left: ${r}%; width: ${c}%"></div>` : S}
          ${i ? v`<div class="marker" style="left: ${h}%"></div>` : S}
        </div>
        <div class="limits">
          ${b ? v`<span class="low">${rt(Math.min(this.low, this.high))}°</span>
                <span class="high">${rt(Math.max(this.low, this.high))}°</span>` : S}
        </div>
      </div>
    `;
  }
};
an.styles = [
  Ve,
  De`
      :host {
        display: block;
        width: 100%;
        /* The limits' size; and the gauge's width is what's asked below. */
        font-size: 11px;
        container-type: inline-size;
      }
      .gauge {
        /* The action's colour as it is, where color-mix() is missing (before
           Safari 16.2 and Chrome 111, #113): a custom property set to an
           unsupported function resolves to nothing, which would leave the
           band and marker unpainted. */
        --cb-gauge-color: var(--cb-gauge-base);
        --cb-gauge-base: var(--cb-action-unknown);
      }
      /* The action's colour, moved towards the text's: darker on a light
         card, lighter on a dark one, so it meets 3:1 against it (#22). */
      @supports (color: color-mix(in oklab, red, blue)) {
        .gauge {
          --cb-gauge-color: color-mix(in oklab, var(--cb-gauge-base) 70%, var(--cb-text-primary));
        }
      }
      .gauge.heating {
        --cb-gauge-base: var(--cb-action-heating);
      }
      .gauge.cooling {
        --cb-gauge-base: var(--cb-action-cooling);
      }
      /* The theme's idle grey, mixed as the others are, so it stands out
         from the track; unmixed, and faded, it didn't (#22). */
      .gauge.idle {
        --cb-gauge-base: var(--cb-action-idle);
      }
      .bar {
        position: relative;
        height: 24px;
        /* Printed as shown, not without its backgrounds. */
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      .track,
      .band {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .track {
        left: 0;
        right: 0;
        height: 4px;
        border-radius: 2px;
        background: var(--cb-track-bg);
      }
      .band {
        height: 6px;
        border-radius: 3px;
        background: var(--cb-gauge-color);
      }
      /* Round at any width: its own box, not a stretched circle. */
      .marker {
        position: absolute;
        top: 50%;
        width: 9px;
        height: 9px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2.5px solid var(--cb-gauge-color);
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
        transform: translate(-50%, -50%);
      }
      /* The band's limits, under its ends: the low one ending at the band's
         start, the high one starting at its end, so they never overlap, and
         kept within the gauge (each is at most 5ch, plus its 2px). The row
         is there, empty, when the band can't be read, so the gauge's height
         doesn't change. In HA's own font, inherited. */
      .limits {
        position: relative;
        height: 14px;
        line-height: 14px;
        color: var(--cb-text-secondary);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .limits span {
        position: absolute;
        top: 0;
      }
      .limits .low {
        left: min(max(var(--lo), 5ch + 2px), 100% - 5ch - 2px);
        transform: translateX(-100%);
        padding-right: 2px;
      }
      .limits .high {
        left: max(
          min(var(--hi), 100% - 5ch - 2px),
          min(max(var(--lo), 5ch + 2px), 100% - 5ch - 2px)
        );
        padding-left: 2px;
      }
      /* Too narrow for both: none, rather than either outside the gauge. */
      @container (width < 11ch) {
        .limits span {
          visibility: hidden;
        }
      }
      /* Windows contrast themes make backgrounds the Canvas colour, which
         would lose the track and band: draw them in the system's colours. */
      @media (forced-colors: active) {
        .track,
        .band,
        .marker {
          forced-color-adjust: none;
        }
        .track {
          background: GrayText;
        }
        .band {
          background: CanvasText;
        }
        .marker {
          border-color: CanvasText;
          background: Canvas;
        }
      }
    `
];
Zn([
  D({ type: Number })
], an.prototype, "low", 2);
Zn([
  D({ type: Number })
], an.prototype, "high", 2);
Zn([
  D({ type: Number })
], an.prototype, "room", 2);
Zn([
  D({ type: String })
], an.prototype, "roomLabel", 2);
Zn([
  D({ type: Boolean })
], an.prototype, "decorative", 2);
Zn([
  D({ type: String })
], an.prototype, "action", 2);
an = Zn([
  Ge("band-gauge")
], an);
function on(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function Po(e, t) {
  const n = on(e, t);
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function oc(e, t) {
  const n = on(e, t.nextBandChange);
  if (!n) return { scheduled: null, nextChange: null };
  const i = n.attributes.scheduled, o = Date.parse(n.state);
  return {
    scheduled: typeof i == "boolean" ? i : null,
    nextChange: Number.isNaN(o) ? null : o
  };
}
function Oi(e, t) {
  var p, g, b, x, A, z, F;
  const n = Po(e, t.roomTemperature), i = Po(e, t.apparentTemperature), o = ((p = on(e, t.useApparentTemperature)) == null ? void 0 : p.state) === "on", s = Date.parse(((g = on(e, t.overrideEnds)) == null ? void 0 : g.state) ?? ""), r = (b = on(e, t.roomTemperature)) == null ? void 0 : b.attributes.source, c = r === "climate" || r === "fallback_sensor" ? r : null, h = ((x = on(e, t.roomSensorUnavailable)) == null ? void 0 : x.state) === "on" || c !== null, d = Number.isFinite(n) || Number.isFinite(i);
  return {
    enabled: ((A = on(e, t.enabled)) == null ? void 0 : A.state) !== "off",
    action: ((z = on(e, t.currentAction)) == null ? void 0 : z.state) ?? "unknown",
    room: n,
    apparent: i,
    useApparent: o,
    temperature: Xl({ room: n, apparent: i, useApparent: o }).value,
    feelsLike: o && Number.isFinite(i),
    band: {
      low: Po(e, t.effectiveLow),
      high: Po(e, t.effectiveHigh)
    },
    overrideActive: ((F = on(e, t.overrideActive)) == null ? void 0 : F.state) === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...oc(e, t),
    sensor: h ? d ? "stand-in" : "offline" : d ? "ok" : "no-reading",
    standIn: c
  };
}
function kr(e) {
  return e.enabled && (e.sensor === "ok" || e.sensor === "stand-in");
}
const vn = {
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
}, du = {
  paused: vn.paused,
  sensor: vn.sensor,
  heating: vn.heating,
  cooling: vn.cooling,
  below: vn.below,
  above: vn.above,
  adjusted: "mdi:timer-outline"
};
function fu(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !kr(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const n = ec(e.temperature, e.band);
    (n === "below" || n === "above") && t.push(n);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function pu(e) {
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
var gu = Object.defineProperty, mu = Object.getOwnPropertyDescriptor, Et = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? mu(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && gu(t, n, o), o;
};
let at = class extends Te {
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
    return this.variant === "mini" ? this._renderMini() : v`
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
            ${this.feelsLike ? v`<span class="sr-only"> feels like </span>` : S}${this._renderTemperature()}<span class="sr-only">. </span>
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
        ${this.statusText ? v`<div class="status ${this.statusKind}">
              <ha-icon icon=${vn[this.statusKind]} aria-hidden="true"></ha-icon>
              <span>${_u(this.statusText)}</span>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${nu(e)}` : "", n = this._label();
    return v`
      <div
        class="mini ${this.noExpand ? "no-expand" : ""} ${e ? "tinted" : ""}"
        style=${t}
        role="${this.noExpand ? "group" : "button"}"
        tabindex="${this.noExpand ? -1 : 0}"
        aria-label=${n}
        title=${n}
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        ${this.badges.map(
      (i) => v`<ha-icon
              icon=${du[i]}
              data-badge=${i}
              aria-hidden="true"
            ></ha-icon>`
    )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
};
at.styles = [
  Ve,
  De`
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
      /* The gauge sits beside the temperature while there's room for it at
         110 px, and wraps under it, at the tile's width, when there isn't: a
         tile under about 220 px, as two side by side on a phone (#3). Beside
         the temperature it shrank to 37 px on a 320 px phone. Not a container
         query: containment would size a tile placed at its own width (on a
         floorplan) to nothing. */
      .body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--cb-gap-sm) var(--cb-gap-md);
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
        flex: 1 1 110px;
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
      /* A range stays on one line, not broken after its dash (#3). */
      .nowrap {
        white-space: nowrap;
      }
    `
];
Et([
  D({ type: String })
], at.prototype, "zoneName", 2);
Et([
  D({ type: Number })
], at.prototype, "temperature", 2);
Et([
  D({ type: Boolean })
], at.prototype, "feelsLike", 2);
Et([
  D({ type: Number })
], at.prototype, "low", 2);
Et([
  D({ type: Number })
], at.prototype, "high", 2);
Et([
  D({ type: String })
], at.prototype, "action", 2);
Et([
  D({ type: String })
], at.prototype, "statusKind", 2);
Et([
  D({ type: String })
], at.prototype, "statusText", 2);
Et([
  D({ attribute: !1 })
], at.prototype, "badges", 2);
Et([
  D({ type: Boolean })
], at.prototype, "noExpand", 2);
Et([
  D({ type: String, reflect: !0 })
], at.prototype, "variant", 2);
at = Et([
  Ge("comfort-band-tile")
], at);
const bu = /(-?\d+(?:\.\d+)?–-?\d+(?:\.\d+)?°)/;
function _u(e) {
  return e.split(bu).map((t, n) => n % 2 === 1 ? v`<span class="nowrap">${t}</span>` : t);
}
const vu = (e) => (...t) => ({ _$litDirective$: e, values: t });
let wu = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, n, i) {
    this._$Ct = t, this._$AM = n, this._$Ci = i;
  }
  _$AS(t, n) {
    return this.update(t, n);
  }
  update(t, n) {
    return this.render(...n);
  }
};
const yu = {}, xu = (e, t = yu) => e._$AH = t;
const $u = vu(class extends wu {
  constructor() {
    super(...arguments), this.key = S;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, n]) {
    return t !== this.key && (xu(e), this.key = t), n;
  }
}), Xo = "comfort_band", ku = {
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
  schedule_assignment: "scheduleAssignment",
  mpc_ready: "mpcReady",
  thermal_slope: "thermalSlope",
  predicted_action: "predictedAction",
  mpc_action: "mpcAction",
  peak_saving: "peakSaving"
};
function Su() {
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
    mpcReady: null,
    thermalSlope: null,
    predictedAction: null,
    mpcAction: null,
    peakSaving: null,
    deviceId: null,
    deviceName: null
  };
}
function Sr(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function sc(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Xo
  );
}
function rc(e, t) {
  const n = Su(), i = Sr(e, [Xo, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of sc(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const r = ku[s];
    r !== void 0 && (n[r] = o.entity_id);
  }
  return n;
}
function Wo(e) {
  return Sr(e, [Xo, "profile_manager"]) !== null;
}
function Ar(e) {
  return e ? !(e.state === "unavailable" && e.attributes.default_profile === void 0) : !1;
}
function es(e) {
  const t = Sr(e, [Xo, "profile_manager"]);
  if (t === null) return null;
  for (const n of sc(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
function ac(e, t) {
  var i;
  return !e || !t ? null : ((i = e.states[t]) == null ? void 0 : i.attributes.humidity_sensor) ?? null;
}
function Tr(e, t, n) {
  var r, c, h, d, p;
  const i = (r = t.name) == null ? void 0 : r.trim();
  if (i) return i;
  const o = n.deviceId !== null ? (c = e.devices[n.deviceId]) == null ? void 0 : c.area_id : null, s = o ? (p = (d = (h = e.areas) == null ? void 0 : h[o]) == null ? void 0 : d.name) == null ? void 0 : p.trim() : void 0;
  return s || (n.deviceName ?? t.zone);
}
const Ut = "comfort_band";
function Au(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Tu(e, t) {
  return e.callService(Ut, "set_schedule", { ...t });
}
function rr(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), t.until !== void 0 && (n.until = t.until), e.callService(Ut, "start_override", n);
}
function lc(e) {
  var t, n, i, o;
  return ((o = (i = (n = (t = e.services) == null ? void 0 : t[Ut]) == null ? void 0 : n.start_override) == null ? void 0 : i.fields) == null ? void 0 : o.until) !== void 0;
}
function Oa(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), e.callService(Ut, "cancel_override", n);
}
function Fa(e) {
  var n, i, o;
  const t = (o = (i = (n = e.services) == null ? void 0 : n[Ut]) == null ? void 0 : i.cancel_override) == null ? void 0 : o.fields;
  return lc(e) && (t == null ? void 0 : t.low) !== void 0 && (t == null ? void 0 : t.high) !== void 0;
}
function Cu(e, t) {
  return e.callService(Ut, "set_profile", { ...t });
}
function Eu(e, t) {
  const n = { name: t.name };
  return t.description !== void 0 && (n.description = t.description), e.callService(Ut, "create_profile", n);
}
function Du(e, t) {
  const n = { source: t.source, target: t.target };
  return t.description !== void 0 && (n.description = t.description), e.callService(Ut, "clone_profile", n);
}
function Mu(e, t) {
  return e.callService(Ut, "rename_profile", { old: t.old, new: t.new });
}
function Pu(e, t) {
  return e.callService(Ut, "delete_profile", { name: t.name });
}
function Nu(e, t) {
  return e.callService(Ut, "record_feedback", { zone: t.zone, label: t.label });
}
const cc = {
  basic: "Basic control",
  learning: "Learning",
  predictive: "Predictive control"
}, zu = {
  heating: "Heat",
  cooling: "Cool",
  idle: "Stay idle",
  unknown: "Nothing"
};
function gt(e, t, n) {
  const i = t[n];
  return typeof i == "string" ? e.states[i] : void 0;
}
function Si(e, t, n) {
  var o;
  if (typeof t[n] != "string") return "missing";
  const i = (o = gt(e, t, n)) == null ? void 0 : o.state;
  return i === "on" || i === "off" ? i : "unknown";
}
function js(e) {
  return e === "heating" || e === "cooling" || e === "idle" || e === "unknown" ? e : null;
}
function Ou(e, t) {
  return t.some((n) => typeof e[n] == "string");
}
const Ha = [
  ["v0.4", ["learningEnabled", "useApparentTemperature", "apparentTemperature"]],
  ["v0.5", ["crossModeMinMinutes"]],
  ["v0.6", ["predictedAction", "thermalSlope", "lookaheadMinutes"]],
  ["v0.7", ["passiveTolerance"]],
  ["v0.8", ["mpcEnabled", "mpcReady", "mpcAction", "mpcHorizonMinutes"]],
  ["v0.10", ["bandRampMinutes"]],
  ["v0.13", ["fanControlEnabled", "activeFanMode", "idleFanMode"]],
  ["v0.14", ["scheduleAssignment"]],
  ["v0.16", ["roomSensorUnavailable"]],
  ["v0.23", ["nextBandChange"]],
  [
    "v0.24",
    [
      "peakSaving",
      "peakSavingEnabled",
      "peakHeatOffset",
      "peakCoolOffset",
      "peakPreconditionMinutes"
    ]
  ]
];
function ro(e, t) {
  const n = Ha.findIndex(([i]) => i === t);
  return Ha.slice(n).some(([, i]) => Ou(e, i));
}
function Fu(e, t) {
  const n = gt(e, t, "roomTemperature");
  if (!n) return null;
  const i = n.attributes.source;
  return i === "primary" || i === "fallback_sensor" || i === "climate" ? i : i === "none" ? "none" : i === void 0 && n.state !== "unavailable" ? Number.isFinite(Number.parseFloat(n.state)) ? "primary" : "none" : null;
}
function Hu(e, t) {
  const n = gt(e, t, "peakSaving");
  return n && ["off", "no_signal", "waiting", "preconditioning", "active", "override"].includes(n.state) ? n.state === "active" : Si(e, t, "peakSavingEnabled") === "off" ? !1 : ro(t, "v0.24") ? null : !1;
}
function hc(e, t) {
  var d, p, g;
  const n = Fu(e, t), i = Si(e, t, "mpcReady"), o = Si(e, t, "enabled"), s = {
    paused: o === "on" ? !1 : o === "off" ? !0 : null,
    noReading: n === "none",
    controller: null,
    reason: null,
    decision: js((d = gt(e, t, "currentAction")) == null ? void 0 : d.state),
    learning: js((p = gt(e, t, "predictedAction")) == null ? void 0 : p.state),
    predictive: i === "on" ? js((g = gt(e, t, "mpcAction")) == null ? void 0 : g.state) : i === "off" ? "not-ready" : null
  };
  if (n === null) return s;
  if (n === "fallback_sensor" || n === "climate")
    return { ...s, controller: "basic", reason: "stand-in" };
  const r = Hu(e, t);
  if (r === null) return s;
  if (r) return { ...s, controller: "basic", reason: "peak" };
  const c = Si(e, t, "learningEnabled");
  if (c === "unknown") return s;
  if (c === "missing")
    return ro(t, "v0.4") ? s : { ...s, controller: "basic", reason: "no-learning" };
  if (c === "off") return { ...s, controller: "basic", reason: "learning-off" };
  if (!ro(t, "v0.6")) return s;
  const h = Si(e, t, "mpcEnabled");
  return h === "unknown" ? s : h === "missing" ? ro(t, "v0.8") ? s : { ...s, controller: "learning" } : h === "off" ? { ...s, controller: "learning" } : i === "on" ? { ...s, controller: "predictive" } : i === "off" ? { ...s, controller: "learning", reason: "not-ready" } : s;
}
function Lu(e) {
  return e.paused === !0 ? "Paused" : e.noReading ? "On hold" : e.controller ? `${cc[e.controller]} deciding` : "";
}
function Ue(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function uc(e) {
  const t = Math.abs(e);
  return t < 0.1 ? "under 0.1°" : `about ${rt(t)}°`;
}
function Ru(e) {
  if (e < 90) {
    const t = Math.max(1, Math.round(e));
    return `${t} minute${t === 1 ? "" : "s"}`;
  }
  return `about ${Math.round(e / 60)} hours`;
}
function La(e, t, n) {
  const i = e === "heat" ? "heating" : "cooling";
  return n === "rejected" ? {
    value: "Not known",
    source: `The latest ${i} run’s readings didn’t show the room ${e === "heat" ? "warming" : "cooling"}, so they were set aside.`,
    known: !1
  } : t === null ? {
    value: "Not learned yet",
    source: `Not enough recent ${i} to learn from.`,
    known: !1
  } : {
    value: Math.abs(t) < 0.05 ? "Holds it steady" : `${t > 0 ? "Warms it" : "Cools it"} ${uc(t)} an hour`,
    source: n === "previous" ? `From an earlier ${i} run, as the latest is too short to tell.` : `From the latest ${i} run.`,
    known: !0
  };
}
function dc(e, t) {
  if (typeof t.thermalSlope != "string") return null;
  const n = gt(e, t, "thermalSlope");
  if (!n || n.state === "unavailable") return "unavailable";
  const i = n.attributes, o = Ue(i.idle_slope), s = Ue(i.idle_slope_cached_age_min);
  let r;
  o === null ? r = {
    value: "Not learned yet",
    source: "Not enough recent readings while idle to learn from.",
    known: !1
  } : r = {
    value: Math.abs(o) < 0.05 ? "Holds steady" : `${o > 0 ? "Warms" : "Cools"} ${uc(o)} an hour`,
    source: i.idle_slope_source === "cached" ? `From earlier readings${s !== null ? `, ${Ru(s)} old` : ""}.` : "From the latest readings while idle.",
    known: !0
  };
  const c = Ue(i.recovery_slope_heat), h = Ue(i.recovery_slope_cool), d = typeof i.last_updated == "string" ? Date.parse(i.last_updated) : NaN;
  return {
    idle: r,
    heat: La("heat", c, i.method_recovery_heat),
    cool: La("cool", h, i.method_recovery_cool),
    details: [
      {
        name: "On its own",
        perHour: o,
        samples: Ue(i.sample_count_idle),
        spread: Ue(i.std_dev_idle),
        method: typeof i.method_idle == "string" ? i.method_idle : null
      },
      {
        name: "Heating",
        perHour: c,
        samples: Ue(i.sample_count_recovery_heat),
        spread: Ue(i.std_dev_recovery_heat),
        method: typeof i.method_recovery_heat == "string" ? i.method_recovery_heat : null
      },
      {
        name: "Cooling",
        perHour: h,
        samples: Ue(i.sample_count_recovery_cool),
        spread: Ue(i.std_dev_recovery_cool),
        method: typeof i.method_recovery_cool == "string" ? i.method_recovery_cool : null
      }
    ],
    windowMinutes: Ue(i.window_minutes),
    sampleCount: Ue(i.sample_count),
    updated: Number.isFinite(d) ? d : null
  };
}
function ju(e, t) {
  const n = Si(e, t, "mpcReady");
  if (n === "missing") return null;
  const i = "Ready to plan";
  if (n === "unknown")
    return { title: i, value: "Can’t tell", desc: "Its readiness can’t be read right now." };
  if (n === "on")
    return {
      title: i,
      value: "Yes",
      desc: "It has learned how this room drifts on its own and how fast heating or cooling moves it."
    };
  const o = dc(e, t), s = o === "unavailable" ? null : o, r = [];
  return s && !s.idle.known && r.push("how this room drifts on its own"), s && !s.heat.known && !s.cool.known && r.push("how fast heating or cooling moves it"), {
    title: i,
    value: "Not yet",
    desc: r.length ? `Still to learn: ${r.join(", and ")}.` : "It’s still learning how this room warms and cools."
  };
}
function Iu(e, t) {
  var i;
  if (typeof t != "string" || !t) return null;
  const n = (i = e.states[t]) == null ? void 0 : i.attributes.friendly_name;
  return typeof n == "string" && n ? n : t;
}
const Ra = "Set under Settings → Devices & Services → Comfort Band → Configure.";
function Uu(e, t) {
  const n = gt(e, t, "roomTemperature");
  if (!n) return null;
  const i = "Room reading", o = Iu(e, n.attributes.fallback_temp_sensor), s = n.attributes.fallback_to_climate === !0, r = [o, s ? "the unit’s own reading" : null].filter(Boolean), c = `${r[0]} stands in if it has a reading${r.length > 1 ? `, otherwise ${r[1]} if it has one` : ""}`;
  switch (n.attributes.source) {
    case "primary":
      return {
        title: i,
        value: "Its own sensor",
        desc: r.length ? `If that goes offline for 5 minutes, ${c}. ${Ra}` : `If that goes offline, control is on hold until it’s back. ${Ra}`
      };
    case "fallback_sensor":
      return {
        title: i,
        value: `Stand-in: ${o ?? "the stand-in sensor"}`,
        desc: "Its own sensor is offline. Basic control decides until it’s back."
      };
    case "climate":
      return {
        title: i,
        value: "Stand-in: the unit’s own reading",
        desc: "Its own sensor is offline. Basic control decides until it’s back."
      };
    case "none":
      return {
        title: i,
        value: "None right now",
        desc: r.length ? `Its own sensor has no reading, so control is on hold. A stand-in is used only once its own sensor has been offline for 5 minutes, and only while it has a reading: ${r.join(", otherwise ")}.` : "Its own sensor has no reading and no stand-in is set up, so control is on hold."
      };
    default:
      return null;
  }
}
function fo(e, t, n, i) {
  var A;
  const o = nc(i), s = $n(e, n, o), r = (A = n == null ? void 0 : n.locale) == null ? void 0 : A.language, c = r != null && r.startsWith("en") ? r : "en", h = (z) => {
    if (!o) {
      const $ = new Date(z);
      return [$.getFullYear(), $.getMonth(), $.getDate()];
    }
    const F = new Intl.DateTimeFormat("en-US", {
      timeZone: o,
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).formatToParts(z), B = ($) => {
      var j;
      return Number((j = F.find((T) => T.type === $)) == null ? void 0 : j.value);
    };
    return [B("year"), B("month") - 1, B("day")];
  }, d = (z) => {
    const [F, B, $] = h(z);
    return Date.UTC(F, B, $);
  }, p = Math.round((d(e) - d(t)) / 864e5), g = o ? { timeZone: o } : {};
  if (p === 0) return s;
  if (p === 1) return `tomorrow ${s}`;
  if (p === -1) return `yesterday ${s}`;
  if (Math.abs(p) < 7)
    return `${new Intl.DateTimeFormat(c, { weekday: "short", ...g }).format(e)} ${s}`;
  const b = h(e)[0] === h(t)[0];
  return `${new Intl.DateTimeFormat(c, {
    day: "numeric",
    month: "short",
    ...b ? {} : { year: "numeric" },
    ...g
  }).format(e)}, ${s}`;
}
function Is(e, t, n) {
  const i = typeof e == "string" ? Date.parse(e) : NaN;
  return Number.isFinite(i) ? fo(i, t, n) : null;
}
function fc(e, t) {
  const n = [];
  return e !== null && Math.abs(e) >= 0.05 && n.push(`the bottom ${e < 0 ? "down" : "up"} ${rt(Math.abs(e))}°`), t !== null && Math.abs(t) >= 0.05 && n.push(`the top ${t > 0 ? "up" : "down"} ${rt(Math.abs(t))}°`), n.join(", ");
}
function vo(e, t) {
  const n = gt(e, t, "peakSaving");
  if (!n) return null;
  const i = n.attributes;
  if (!fc(Ue(i.low_adjustment), Ue(i.high_adjustment))) return null;
  const o = (s) => {
    const r = typeof s == "string" ? Date.parse(s) : NaN;
    return Number.isFinite(r) ? r : null;
  };
  return n.state === "active" ? { kind: "relaxed", at: o(i.ends) } : n.state === "preconditioning" ? { kind: "ahead", at: o(i.next_start) } : null;
}
function Bu(e, t, n) {
  var o;
  if (((o = vo(e, t)) == null ? void 0 : o.kind) !== "relaxed") return n;
  const i = gt(e, t, "peakSaving").attributes;
  return {
    low: n.low - (Ue(i.low_adjustment) ?? 0),
    high: n.high - (Ue(i.high_adjustment) ?? 0)
  };
}
function pc(e, t) {
  const n = gt(e, t, "peakSaving");
  if (!n || vo(e, t) || n.state !== "waiting" && n.state !== "preconditioning") return null;
  const i = typeof n.attributes.next_start == "string" ? Date.parse(n.attributes.next_start) : NaN;
  if (!Number.isFinite(i)) return null;
  const o = (r) => {
    var d;
    const c = (d = gt(e, t, r)) == null ? void 0 : d.state, h = c === void 0 || c.trim() === "" ? NaN : Number(c);
    return Number.isFinite(h) ? h : null;
  };
  if (o("peakHeatOffset") === 0 && o("peakCoolOffset") === 0) return null;
  if (n.state === "preconditioning") return -1 / 0;
  const s = o("peakPreconditionMinutes");
  return s === null ? -1 / 0 : i - s * 6e4;
}
function Wu(e, t, n) {
  const i = gt(e, t, "peakSaving");
  if (!i) return null;
  const o = i.attributes, s = "Right now", r = fc(Ue(o.low_adjustment), Ue(o.high_adjustment));
  switch (i.state) {
    case "off":
      return o.peak_entity ? { title: s, value: "Off", desc: "Peak saving is switched off." } : {
        title: s,
        value: "Off",
        desc: "No peak entity is chosen. Choose one under Settings → Devices & Services → Comfort Band → Configure."
      };
    case "no_signal":
      return {
        title: s,
        value: "No peak signal",
        desc: "The peak entity can’t be read, so it counts as no peak."
      };
    case "waiting": {
      const c = Is(o.next_start, n, e);
      return {
        title: s,
        value: "No peak now",
        desc: c ? `The next one is announced for ${c}.` : "None is announced yet."
      };
    }
    case "preconditioning": {
      const c = Is(o.next_start, n, e), h = o.precondition === "heating";
      return {
        title: s,
        value: h ? "Warming ahead" : "Cooling ahead",
        desc: `Getting the room ready for the next peak${c ? `, starting ${c}` : ""}${r ? `: ${r}` : ""}.`
      };
    }
    case "active": {
      const c = Is(o.ends, n, e);
      return {
        title: s,
        value: "Peak on",
        desc: [
          c ? `Until ${c}.` : "",
          r ? `The range is relaxed: ${r}.` : "",
          "Basic control decides meanwhile."
        ].filter(Boolean).join(" ")
      };
    }
    case "override":
      return {
        title: s,
        value: "Standing aside",
        desc: "An adjustment is in force, so peak saving stands aside."
      };
    default:
      return { title: s, value: "Can’t tell", desc: "Its status can’t be read right now." };
  }
}
var Gu = Object.defineProperty, Vu = Object.getOwnPropertyDescriptor, Bt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Vu(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Gu(t, n, o), o;
};
const ja = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], vi = {
  adjust: (e) => `Couldn’t adjust ${e ?? "the room"}. Try again.`,
  retime: (e) => `Couldn’t change how long the adjustment${e ? ` in ${e}` : ""} lasts. Try again.`,
  back: "Couldn’t go back to the schedule. Try again.",
  end: "Couldn’t end the adjustment. Try again.",
  // Undo isn't offered again after a refusal: nothing to try again.
  undo: "Couldn’t undo the change.",
  feedback: (e) => `${e}: not sent. Try again.`
}, Ku = 1500, qu = 1500, Us = 3;
let bt = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._feedbackConfirmed = null, this._feedbackFailed = null, this._feedbackTimer = null, this._feedbackSeq = 0, this._length = null, this._pickedNext = null, this._burst = null, this._burstTimer = null, this._busy = null, this._undo = null, this._undoWait = null, this._undoTick = null, this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const o = this._bandInForce();
        if (!o || !this.entities) return;
        t = { zone: this.zone, entities: this.entities, base: o, steps: 0, picked: !1 };
      }
      const n = Mo(t.base, t.steps), i = Mo(t.base, t.steps + e);
      i.low === n.low && i.high === n.high || (this._dropUndo(), this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), qu));
    }, this._onPickLength = (e) => {
      var n, i;
      if (this._busy) return;
      const t = { length: this._length, pickedNext: this._pickedNext };
      if (this._length = e, this._pickedNext = e === "next" ? this._nextChange() : null, this._burst) {
        this._burst = { ...this._burst, picked: !0, before: this._burst.before ?? t };
        return;
      }
      ((i = this._stateOf(((n = this.entities) == null ? void 0 : n.overrideActive) ?? null)) == null ? void 0 : i.state) === "on" && this._dropUndo(), this._retime(e, t);
    }, this._onBackToSchedule = () => {
      var o, s;
      if (this._busy || !this.hass || !this.zone || ((s = this._stateOf(((o = this.entities) == null ? void 0 : o.overrideActive) ?? null)) == null ? void 0 : s.state) !== "on") return;
      const e = this.hass, t = this.zone;
      this._dropBurst(), this._dropUndo();
      const n = this._undoFrom(), i = this._schedule().scheduled === !0;
      this._run(
        i ? "Going back to the schedule" : "Ending the adjustment",
        i ? vi.back : vi.end,
        () => Oa(e, { zone: t }),
        void 0,
        // It ends the adjustment and keeps the band.
        n ? {
          before: n,
          key: this._undoKey(),
          expect: { active: !1, low: n.low, high: n.high }
        } : void 0
      );
    }, this._onUndo = () => {
      const e = this._undo;
      if (!(e != null && e.shown) || !this.hass || !this.zone) return;
      const t = No(e.before, e.shown) ?? "end", n = this.hass, i = this.zone, { before: o } = e, { doing: s } = this._undoWords(o, t);
      this._dropUndo(), this._run(
        s,
        vi.undo,
        () => t === "restore" ? rr(n, {
          zone: i,
          low: o.low,
          high: o.high,
          until: new Date(o.ends).toISOString()
        }) : Oa(n, { zone: i, low: o.low, high: o.high })
      );
    }, this._onFeedbackTap = async (e) => {
      var i, o;
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      let n = !0;
      try {
        await Nu(this.hass, { zone: this.zone, label: e });
      } catch {
        n = !1;
        const s = ((i = ja.find((r) => r.label === e)) == null ? void 0 : i.text) ?? e;
        (o = this.announce) == null || o.call(this, vi.feedback(s));
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = n ? e : null, this._feedbackFailed = n ? null : e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackFailed = null, this._feedbackTimer = null;
      }, Ku));
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._feedbackTimer !== null && (clearTimeout(this._feedbackTimer), this._feedbackTimer = null), this._feedbackConfirmed = null, this._feedbackFailed = null, this._commitBurst(), this._dropUndo();
  }
  /** Sends taps held for another room to theirs (#52), and keeps Undo
   *  only while it would put back what its change replaced (#25). */
  willUpdate(e) {
    this._burst && this._burst.zone !== this.zone && this._commitBurst(), (e.has("hass") || e.has("zone") || e.has("entities")) && this._checkUndo();
  }
  /** Keeps Undo only while it would put back what the change it undoes
   *  replaced, and nothing has changed since. */
  _checkUndo() {
    const e = this._undo;
    if (!e) return;
    const t = this._adjustment();
    e.key !== this._undoKey() || !t ? this._dropUndo() : e.shown === null ? Ia(e, t) ? this._armUndo({ ...e, shown: t }) : jo(e.before, t) || this._dropUndo() : (!jo(e.shown, t) || No(e.before, t) === null) && this._dropUndo();
  }
  /** Offers Undo for a change HA shows, and looks again when an earlier end
   *  it would put back gets too near to. None where it would change nothing
   *  already: Back to schedule in an adjustment's last seconds. */
  _armUndo(e) {
    if (this._clearUndoTimers(), No(e.before, e.shown) === null) {
      this._undo = null;
      return;
    }
    this._undo = e;
    const { before: t } = e;
    mc(t) && (this._undoTick = setTimeout(
      () => {
        this._undoTick = null, this._checkUndo(), this.requestUpdate();
      },
      t.ends - gc - Date.now() + 1
    ));
  }
  /** After a change made here goes through: Undo for it, at once where HA
   *  already shows it (its state can come first), else once it does. */
  _offerUndo(e) {
    const t = this._adjustment();
    t && Ia(e, t) ? this._armUndo({ ...e, shown: t }) : t && jo(e.before, t) && (this._clearUndoTimers(), this._undo = { ...e, shown: null }, this._undoWait = setTimeout(() => {
      var n;
      this._undoWait = null, ((n = this._undo) == null ? void 0 : n.shown) === null && (this._undo = null);
    }, Yu));
  }
  _dropUndo() {
    this._clearUndoTimers(), this._undo = null;
  }
  _clearUndoTimers() {
    this._undoWait !== null && clearTimeout(this._undoWait), this._undoTick !== null && clearTimeout(this._undoTick), this._undoWait = null, this._undoTick = null;
  }
  get _stateOf() {
    var t;
    const e = ((t = this.hass) == null ? void 0 : t.states) ?? {};
    return (n) => n !== null ? e[n] : void 0;
  }
  _numericState(e) {
    const t = this._stateOf(e);
    if (!t) return NaN;
    const n = parseFloat(t.state);
    return Number.isFinite(n) ? n : NaN;
  }
  /** The band Warmer and Cooler move, to the tenth, or null when it can't
   *  be read: the band in force, without a peak's relaxing (#69). A
   *  tap starts an adjustment, which can outlast the peak, and peak saving
   *  stands aside while it runs: from the relaxed band, the peak's wider
   *  range would stay in force for all of it. Taken when the first tap of a
   *  burst is made. */
  _bandInForce() {
    var i, o;
    const e = this._numericState(((i = this.entities) == null ? void 0 : i.effectiveLow) ?? null), t = this._numericState(((o = this.entities) == null ? void 0 : o.effectiveHigh) ?? null);
    if (!Number.isFinite(e) || !Number.isFinite(t) || !this.hass || !this.entities)
      return null;
    const n = Bu(this.hass, this.entities, { low: e, high: t });
    return { low: Math.round(n.low * 10) / 10, high: Math.round(n.high * 10) / 10 };
  }
  /** The room's adjustment as HA shows it, or null where its manual band,
   *  whether one runs, or a running one's end can't be read: one re-timed
   *  elsewhere couldn't be told from it (#25 review). */
  _adjustment() {
    var s, r, c, h, d, p;
    const e = this._numericState(((s = this.entities) == null ? void 0 : s.manualLow) ?? null), t = this._numericState(((r = this.entities) == null ? void 0 : r.manualHigh) ?? null);
    if (!Number.isFinite(e) || !Number.isFinite(t)) return null;
    const n = (h = this._stateOf(((c = this.entities) == null ? void 0 : c.overrideActive) ?? null)) == null ? void 0 : h.state;
    if (n !== "on" && n !== "off") return null;
    const i = n === "on", o = Date.parse(((p = this._stateOf(((d = this.entities) == null ? void 0 : d.overrideEnds) ?? null)) == null ? void 0 : p.state) ?? "");
    return i && !Number.isFinite(o) ? null : { active: i, ends: i ? o : null, low: e, high: t };
  }
  /** What Undo would put back of the adjustment in force, where the
   *  integration can (v0.25.0+); null where it can't. */
  _undoFrom() {
    return !this.hass || !Fa(this.hass) ? null : this._adjustment();
  }
  /** The room and the entity ids Undo reads, which it's for alone. */
  _undoKey() {
    const e = this.entities;
    return [
      this.zone,
      e == null ? void 0 : e.manualLow,
      e == null ? void 0 : e.manualHigh,
      e == null ? void 0 : e.overrideActive,
      e == null ? void 0 : e.overrideEnds,
      e == null ? void 0 : e.nextBandChange
    ].join("|");
  }
  _schedule(e = this.entities) {
    return !this.hass || !e ? { scheduled: null, nextChange: null } : oc(this.hass, e);
  }
  /** The schedule's next change (ms) in the room of `entities`, where an
   *  adjustment can last until it: integration v0.25.0+, a schedule setting
   *  the range, and its next change ahead. Null otherwise. */
  _nextChange(e = this.entities, t = Date.now()) {
    if (!this.hass || !lc(this.hass)) return null;
    const { scheduled: n, nextChange: i } = this._schedule(e);
    return n === !0 && i !== null && i > t ? i : null;
  }
  /** The length in force: the one picked here, else three hours. A picked
   *  "Until" is for the change it named: once that's passed, or while HA
   *  names another, three hours. */
  _hours(e = this.entities) {
    const t = this._length ?? Us;
    if (t !== "next") return t;
    const n = this._nextChange(e);
    return n !== null && n === this._pickedNext ? "next" : Us;
  }
  /** Runs a call, saying what it's doing meanwhile. A failed call is
   *  reported by HA's own toast, and `refused` said to screen readers
   *  (#53); the status falls back to what is actually in force, and a
   *  length picked for it goes back to `before` (#27). One that went
   *  through, while the tab is open on the same room, gets `undo`, where
   *  given (#25). */
  async _run(e, t, n, i, o) {
    var r;
    this._busy = e;
    let s = !1;
    try {
      await n(), s = !0;
    } catch {
      i && (this._length = i.length, this._pickedNext = i.pickedNext), (r = this.announce) == null || r.call(this, t);
    } finally {
      this._busy = null;
    }
    s && o && this.isConnected && o.key === this._undoKey() && this._offerUndo(o);
  }
  /** Adjusts `zone`, by default the tab's room, to `band`: a new range, or
   *  the one in force re-timed (`retime`), for the words a refusal is said
   *  in. For another room (taps held when the tab moved on, #52) the tab
   *  doesn't wait for the call or put a length back: HA's toast tells of a
   *  refusal, and the words name the room. */
  _sendBand(e, t, n, i, o = this.zone, s = this.entities) {
    if (!this.hass || !o) return;
    const r = this.hass, c = t === "next" ? this._nextChange(s) : null, h = c !== null ? new Date(c).toISOString() : void 0, d = c !== null ? void 0 : t === "next" ? Us : t, p = () => rr(r, { zone: o, low: e.low, high: e.high, hours: d, until: h });
    if (o !== this.zone) {
      p().catch(() => {
        var x;
        const b = s ? Tr(this.hass ?? r, { zone: o }, s) : o;
        (x = this.announce) == null || x.call(this, vi[n](b));
      });
      return;
    }
    const g = this._undoFrom();
    this._run(
      `Adjusting to ${Ct(e)}`,
      vi[n](),
      p,
      i,
      g ? {
        before: g,
        key: this._undoKey(),
        expect: {
          active: !0,
          low: e.low,
          high: e.high,
          ...c !== null ? { ends: c } : {}
        }
      } : void 0
    );
  }
  /** Sends the taps so far as one change, to the room they were made in;
   *  nothing if they cancel out, unless a length was picked meanwhile. */
  _commitBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null;
    const e = this._burst;
    if (this._burst = null, !e) return;
    const { zone: t, entities: n } = e, i = this._hours(n);
    e.steps !== 0 ? this._sendBand(
      Mo(e.base, e.steps),
      i,
      "adjust",
      e.before,
      t,
      n
    ) : e.picked && this._retime(i, e.before, t, n);
  }
  _dropBurst() {
    this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = null, this._burst = null;
  }
  /** Gives a running adjustment a new length, keeping its band: the
   *  integration keeps an adjustment's band in the manual values. */
  _retime(e, t, n = this.zone, i = this.entities) {
    var r;
    if (((r = this._stateOf((i == null ? void 0 : i.overrideActive) ?? null)) == null ? void 0 : r.state) !== "on") return;
    const o = this._numericState((i == null ? void 0 : i.manualLow) ?? null), s = this._numericState((i == null ? void 0 : i.manualHigh) ?? null);
    !Number.isFinite(o) || !Number.isFinite(s) || this._sendBand({ low: o, high: s }, e, "retime", t, n, i);
  }
  /** What Undo does, in words: "back to 19–22° until 5 pm", and the status
   *  while it does it. With no schedule, a range has no end to name. Ending
   *  the adjustment is "back to the schedule" where one sets the range, and
   *  "end the adjustment" where that can't be told. */
  _undoWords(e, t) {
    const n = Ct(e), i = this._schedule().scheduled;
    if (i === !1) return { label: `back to ${n}`, doing: `Going back to ${n}` };
    if (t === "restore") {
      const o = `until ${$n(e.ends, this.hass)}`;
      return { label: `back to ${n} ${o}`, doing: `Going back to ${n} ${o}` };
    }
    return i === !0 ? { label: "back to the schedule", doing: "Going back to the schedule" } : { label: "end the adjustment", doing: "Ending the adjustment" };
  }
  render() {
    if (!this.hass || !this.entities) return S;
    const e = Date.now(), t = Oi(this.hass, this.entities), { room: n, apparent: i, useApparent: o, feelsLike: s, overrideActive: r, scheduled: c } = t, { low: h, high: d } = t.band, p = Xl({ room: n, apparent: i, useApparent: o }), g = pu(t), b = this._burst, x = b && b.steps !== 0 ? `Adjusting to ${Ct(Mo(b.base, b.steps))}` : this._busy, A = tc({
      ...t,
      peak: vo(this.hass, this.entities),
      peakComing: pc(this.hass, this.entities),
      doing: x,
      now: e,
      formatTime: (z) => $n(z, this.hass)
    });
    return v`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(p.value) ? `${p.value.toFixed(1)}°` : "—"}</span
        >
        ${p.note ? v`<span class="note">${p.note}</span>` : S}
      </div>
      ${o && !Number.isFinite(i) && Number.isFinite(n) ? v`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : S}
      <div class="gauge-row">
        <band-gauge
          .low=${h}
          .high=${d}
          .room=${p.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${kr(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${A.kind}" role="status" aria-live="polite">
        <ha-icon icon=${vn[A.kind]} aria-hidden="true"></ha-icon>
        <span>${A.text}</span>
      </div>
      ${g ? v`<div class="notice">${g}</div>` : S}
      ${this._renderAdjust(r, c)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const n = this._busy !== null ? "true" : "false", i = this._hours(), o = this._nextChange();
    return v`
      <section class="adjust">
        ${t === !1 ? S : v`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${(o !== null ? [1, 3, "next"] : [1, 3]).map(
      (r) => v`<button
                      aria-pressed=${i === r ? "true" : "false"}
                      aria-disabled=${n}
                      data-length=${r}
                      @click=${() => this._onPickLength(r)}
                    >
                      ${r === "next" ? v`Until <span class="time">${$n(o, this.hass)}</span>` : `${r} h`}
                    </button>`
    )}
              </div>`}
        ${this._bandInForce() !== null ? v`<div class="steps">
              <button class="cooler" aria-disabled=${n} @click=${() => this._onStep(-1)}>
                <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon> Cooler
              </button>
              <button class="warmer" aria-disabled=${n} @click=${() => this._onStep(1)}>
                <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon> Warmer
              </button>
            </div>` : S}
        ${t === !1 ? S : v`<button
              class="back"
              aria-disabled=${n === "true" || !e ? "true" : "false"}
              @click=${this._onBackToSchedule}
            >
              ${t === !0 ? "Back to schedule" : "End adjustment"}
            </button>`}
        ${this._renderUndo()}
      </section>
    `;
  }
  /** Undo, where it can be offered: greyed and inert until there's a
   *  change to undo. The same button throughout, so focus stays on it. */
  _renderUndo() {
    var n;
    if (!this.hass || !Fa(this.hass)) return S;
    const e = (n = this._undo) != null && n.shown ? this._undo : null, t = e ? this._undoWords(e.before, No(e.before, e.shown) ?? "end").label : null;
    return v`<button
      class="undo"
      aria-disabled=${e ? "false" : "true"}
      aria-label=${t ? `Undo: ${t}` : S}
      @click=${this._onUndo}
    >
      Undo
    </button>`;
  }
  _renderFeedbackSection() {
    return v`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${ja.map(
      (e) => v`
              <button
                class="feedback-pill ${this._feedbackConfirmed === e.label ? "confirmed" : this._feedbackFailed === e.label ? "failed" : ""}"
                data-feedback=${e.label}
                aria-label="Feedback: ${e.text}"
                @click=${() => void this._onFeedbackTap(e.label)}
              >
                ${this._feedbackConfirmed === e.label ? "Thanks!" : this._feedbackFailed === e.label ? "Not sent" : e.text}
              </button>
            `
    )}
        </div>
      </section>
    `;
  }
};
bt.styles = [
  Ve,
  De`
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
        /* Two lines' height, whether its words take one or two, so going
           from the room's state to "Adjusting to …" at a tap, and back as
           HA answers, doesn't move the controls below it (#55). */
        min-height: 3.2em;
        min-height: 2lh;
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
      .back,
      .undo {
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
      /* "Until 10:30 pm" takes more room than "1 h": the time on one line. */
      .lengths button[data-length='next'] {
        flex: 1.6;
      }
      .lengths .time {
        white-space: nowrap;
      }
      .steps button {
        font-size: 15px;
      }
      .lengths button[aria-pressed='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
        /* A border as well as the fill. Forced colours keep it but not the
           fill, and below 100% zoom it can round to the others' width, so
           there the theme's selection colours mark the choice (below). */
        border: 2px solid currentColor;
        color: #ffffff;
        font-weight: 500;
      }
      /* Forced colours (a Windows contrast theme): the length picked is
         filled with the theme's selection colours, as the History chart's
         range on show is (#73, #89); a fill shows at any zoom, and nothing
         changes size. Left to forced colours, its words would sit on a
         plate of the page's colour, so it takes every colour itself, all
         the theme's: its focus ring Highlight, as forced colours make the
         others'. */
      @media (forced-colors: active) {
        .lengths button[aria-pressed='true'] {
          forced-color-adjust: none;
          background: Highlight;
          border-color: Highlight;
          color: HighlightText;
          outline-color: Highlight;
        }
      }
      .lengths button[aria-disabled='true'],
      .steps button[aria-disabled='true'],
      .back[aria-disabled='true'],
      .undo[aria-disabled='true'] {
        opacity: 0.5;
        cursor: default;
      }
      .back,
      .undo {
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
      /* Two pixels of the error colour, inset, so the pill keeps its size. */
      .feedback-pill.failed {
        border-color: var(--error-color, #db4437);
        box-shadow: inset 0 0 0 1px var(--error-color, #db4437);
      }
    `
];
Bt([
  D({ attribute: !1 })
], bt.prototype, "hass", 2);
Bt([
  D({ type: String })
], bt.prototype, "zone", 2);
Bt([
  D({ attribute: !1 })
], bt.prototype, "entities", 2);
Bt([
  D({ attribute: !1 })
], bt.prototype, "announce", 2);
Bt([
  G()
], bt.prototype, "_feedbackConfirmed", 2);
Bt([
  G()
], bt.prototype, "_feedbackFailed", 2);
Bt([
  G()
], bt.prototype, "_length", 2);
Bt([
  G()
], bt.prototype, "_burst", 2);
Bt([
  G()
], bt.prototype, "_busy", 2);
Bt([
  G()
], bt.prototype, "_undo", 2);
bt = Bt([
  Ge("comfort-band-now-tab")
], bt);
const gc = 5e3, Yu = 1e4;
function Zu(e, t) {
  return !(e.active !== t.active || e.low !== void 0 && Math.abs(e.low - t.low) > 0.05 || e.high !== void 0 && Math.abs(e.high - t.high) > 0.05 || e.ends !== void 0 && (t.ends === null || Math.abs(e.ends - t.ends) > 1e3));
}
function jo(e, t) {
  return e.active === t.active && e.ends === t.ends && e.low === t.low && e.high === t.high;
}
function Ia(e, t) {
  return Zu(e.expect, t) && !jo(e.before, t);
}
function mc(e, t = Date.now()) {
  return e.active && e.ends !== null && e.ends > t + gc;
}
function No(e, t) {
  return mc(e) ? "restore" : t.active ? "end" : null;
}
var Ju = Object.defineProperty, Qu = Object.getOwnPropertyDescriptor, Cr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Qu(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Ju(t, n, o), o;
};
const zo = 14, Oo = 28, jn = 600, Zi = 200, Bs = [0, 6, 12, 18, 24], eo = 32, Ua = [14, 18, 22, 26];
function xn(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function Ba(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
let po = class extends Te {
  constructor() {
    super(...arguments), this.transitions = [], this.now = null;
  }
  _timeToX(e) {
    return e / (24 * 60) * jn;
  }
  _tempToY(e) {
    const t = Ba(e, zo, Oo);
    return Zi - (t - zo) / (Oo - zo) * Zi;
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is sorted by `at` ascending — the caller sorts. */
  _stepPoints(e, t) {
    const n = e[e.length - 1][t], i = [[0, this._tempToY(n)]];
    let o = n;
    for (const s of e) {
      const r = this._timeToX(xn(s.at));
      i.push([r, this._tempToY(o)]), i.push([r, this._tempToY(s[t])]), o = s[t];
    }
    return i.push([jn, this._tempToY(o)]), i;
  }
  _pointsToPath(e) {
    return e.map(([t, n], i) => `${i === 0 ? "M" : "L"} ${t} ${n}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const n = this._pointsToPath(e), i = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${n} ${i} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, d) => xn(h.at) - xn(d.at)), t = e.length > 0, n = t ? this._stepPoints(e, "low") : [], i = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(n) : "", s = t ? this._pointsToPath(i) : "", r = t ? this._fillFromPoints(i, n) : "", c = this.now !== null && Number.isFinite(this.now) ? this._timeToX(Ba(this.now, 0, 24 * 60)) : null;
    return v`
      <div class="chart">
        <svg
          viewBox="0 0 ${jn} ${Zi}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${Ua.map(
      (h) => Yi`<line class="grid" x1="0" x2=${jn} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${Bs.map(
      (h) => Yi`<line class="grid" y1="0" y2=${Zi} x1=${h / 24 * jn} x2=${h / 24 * jn}></line>`
    )}
          ${t ? Yi`
                <path class="fill" d=${r}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const d = this._timeToX(xn(h.at));
      return Yi`
              <line class="marker low" x1=${d} x2=${d} y1=${this._tempToY(h.low)} y2=${this._tempToY(h.low)}></line>
              <line class="marker high" x1=${d} x2=${d} y1=${this._tempToY(h.high)} y2=${this._tempToY(h.high)}></line>
            `;
    })}
          ${c !== null ? Yi`<line class="now-line" x1=${c} x2=${c} y1="0" y2=${Zi}></line>` : null}
        </svg>
        ${c !== null ? v`<div
              class="now-label"
              aria-hidden="true"
              style="left: calc(${eo}px + (100% - ${eo}px) * ${c / jn})"
            >
              Now
            </div>` : null}
        ${Ua.map(
      (h) => v`<div
              class="axis-label y"
              style="top: ${(Oo - h) / (Oo - zo) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${Bs.map((h, d) => {
      const p = d === 0 ? "axis-label x start" : d === Bs.length - 1 ? "axis-label x end" : "axis-label x";
      return v`<div
            class=${p}
            style="left: calc(${eo}px + (100% - ${eo}px) * ${h / 24})"
          >
            ${h}h
          </div>`;
    })}
      </div>
      ${t ? v`<div class="legend" aria-hidden="true">
            <span class="low">Low</span><span class="high">High</span>
          </div>` : null}
    `;
  }
};
po.styles = [
  Ve,
  De`
      :host {
        display: block;
        position: relative;
        /* Room above for the now label, clear of the line over the chart. */
        margin: 18px 0 var(--cb-gap-md);
      }
      .chart {
        position: relative;
        width: 100%;
        height: 200px;
        /* Reserve a left gutter so the Y-axis temperature labels sit
           inside the chart's bounding box. Without this they overflow
           the schedule-tab's 12 px padding and the modal clips their
           leading digit ("25°" rendered as "5°"). */
        padding-left: ${Zo(eo)}px;
        box-sizing: border-box;
        /* Room below for the hour labels (16 px down), with or without the
           legend: the legend's own margin would collapse into this one. */
        margin-bottom: 22px;
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
      .line.low,
      .marker.low {
        stroke: var(--cb-action-heating);
      }
      .line.high,
      .marker.high {
        stroke: var(--cb-action-cooling);
      }
      /* A dot: a line of no length with a round cap. Its stroke doesn't
         scale, so it stays round where a circle would stretch with the
         chart's width. */
      .marker {
        stroke-width: 9;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .now-line {
        stroke: var(--cb-text-secondary);
        stroke-width: 1.5;
        stroke-dasharray: 4 3;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      /* Text in HTML over the chart, as the axis labels are: the SVG
         stretches to the card's width. */
      .now-label {
        position: absolute;
        top: -14px;
        transform: translateX(-50%);
        font-size: 11px;
        line-height: 1;
        color: var(--cb-text-secondary);
        pointer-events: none;
        white-space: nowrap;
      }
      /* Below the chart, clear of its lines and labels. */
      .legend {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-md);
        font-size: 11px;
        color: var(--cb-text-secondary);
      }
      /* A swatch of the line's colour: text in it would be too faint.
         Spaced on its word's side, in right-to-left too (#101). */
      .legend span::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 3px;
        margin-inline-end: 6px;
        vertical-align: middle;
        border-radius: 2px;
      }
      .legend .low::before {
        background: var(--cb-action-heating);
      }
      .legend .high::before {
        background: var(--cb-action-cooling);
      }
      /* Forced colours (a Windows contrast theme) give both swatches the
         page's colour but leave the chart's lines alone, so the legend no
         longer said which line was which (#98). The swatches keep their
         colours there, as the lines do, each ringed in the text colour so it
         shows against the page whatever its colour. The ring is a shadow,
         which takes no room. */
      @media (forced-colors: active) {
        .legend span::before {
          forced-color-adjust: none;
          box-shadow: 0 0 0 1px CanvasText;
        }
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
Cr([
  D({ type: Array })
], po.prototype, "transitions", 2);
Cr([
  D({ attribute: !1 })
], po.prototype, "now", 2);
po = Cr([
  Ge("comfort-band-schedule-chart")
], po);
var Xu = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, Tn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ed(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Xu(t, n, o), o;
};
let Qt = class extends Te {
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
    queueMicrotask(() => {
      var e;
      return (e = this._atInput) == null ? void 0 : e.focus();
    });
  }
  _validate() {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(this._at) ? Number.isNaN(this._low) || Number.isNaN(this._high) ? (this._error = "Lowest and highest must be numbers.", !1) : this._low >= this._high ? (this._error = "Lowest must be below highest.", !1) : this._low < 10 || this._high > 35 ? (this._error = "Temperatures must be between 10 °C and 35 °C.", !1) : (this._error = null, !0) : (this._error = "Time must be HH:MM (24h, e.g. 06:00).", !1);
  }
  render() {
    return v`
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
      ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : v`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Qt.styles = [
  Ve,
  De`
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
      /* 44px tall (WCAG 2.5.5), and 16px type: iOS zooms the page into a
         field set smaller when it's focused (#3). */
      input {
        font: inherit;
        font-size: 16px;
        min-height: 44px;
        box-sizing: border-box;
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
Tn([
  D({ type: Object })
], Qt.prototype, "transition", 2);
Tn([
  D({ type: Boolean })
], Qt.prototype, "isNew", 2);
Tn([
  G()
], Qt.prototype, "_at", 2);
Tn([
  G()
], Qt.prototype, "_low", 2);
Tn([
  G()
], Qt.prototype, "_high", 2);
Tn([
  G()
], Qt.prototype, "_error", 2);
Tn([
  zi('input[name="at"]')
], Qt.prototype, "_atInput", 2);
Qt = Tn([
  Ge("transition-edit-dialog")
], Qt);
function Wa(e, t) {
  var o, s, r;
  const n = (o = t == null ? void 0 : t.config) == null ? void 0 : o.time_zone;
  if (n)
    try {
      const c = new Intl.DateTimeFormat("en-GB", {
        timeZone: n,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(e), h = Number((s = c.find((p) => p.type === "hour")) == null ? void 0 : s.value), d = Number((r = c.find((p) => p.type === "minute")) == null ? void 0 : r.value);
      if (Number.isFinite(h) && Number.isFinite(d)) return h * 60 + d;
    } catch {
    }
  const i = new Date(e);
  return i.getHours() * 60 + i.getMinutes();
}
function td(e, t) {
  if (e.length === 0) return null;
  let n = e.length - 1;
  for (let i = 0; i < e.length; i++)
    xn(e[i].at) <= t && (n = i);
  return n;
}
function nd(e) {
  if (e.length < 2) return e.map(() => !1);
  const t = (n) => Math.round(n * 10);
  return e.map((n, i) => {
    const o = e[(i + e.length - 1) % e.length];
    return t(n.low) === t(o.low) && t(n.high) === t(o.high);
  });
}
function Go(e, t) {
  const n = t.scheduleAssignment;
  if (typeof n != "string") return ro(t, "v0.14") ? null : !0;
  const i = e.states[n];
  if (!i || i.state === "unavailable") return null;
  const o = i.attributes.schedule_id;
  return o === null ? !0 : typeof o == "string" ? !1 : null;
}
function id(e, t) {
  if (Go(e, t) !== !1) return null;
  const n = e.states[t.scheduleAssignment];
  return n != null && n.state && n.state !== "unknown" ? n.state : null;
}
function od(e, t, n) {
  var h;
  const i = Oi(e, t);
  if (!Number.isFinite(i.band.low) || !Number.isFinite(i.band.high)) return null;
  const o = (h = e.config) == null ? void 0 : h.time_zone, s = (d) => d !== null && d > n, r = (d, p) => [
    d,
    { whole: fo(p, n, e, o) }
  ];
  let c = [];
  if (i.overrideActive)
    i.scheduled === !0 && (c = s(i.overrideEnds) ? r(", adjusted until ", i.overrideEnds) : [", adjusted"]);
  else {
    const d = vo(e, t);
    (d == null ? void 0 : d.kind) === "relaxed" ? c = s(d.at) ? r(", relaxed for a peak until ", d.at) : [", relaxed for a peak"] : (d == null ? void 0 : d.kind) === "ahead" && (c = s(d.at) ? r(", getting ready for a peak starting ", d.at) : [", getting ready for a peak"]);
  }
  return ["Now ", { whole: Ct(i.band) }, ...c];
}
function sd(e, t, n) {
  var p, g;
  const i = Oi(e, t);
  if (i.scheduled !== !0 || i.nextChange === null || i.nextChange <= n) return null;
  const o = t.nextBandChange, s = o !== null ? (p = e.states[o]) == null ? void 0 : p.attributes : void 0, r = s == null ? void 0 : s.low, c = s == null ? void 0 : s.high;
  if (typeof r != "number" || typeof c != "number" || !Number.isFinite(r) || !Number.isFinite(c)) return null;
  const h = fo(i.nextChange, n, e, (g = e.config) == null ? void 0 : g.time_zone);
  return [
    `The ${Go(e, t) === !1 ? "shared schedule" : "schedule"}’s next change: `,
    { whole: h },
    { whole: ` → ${Ct({ low: r, high: c })}` }
  ];
}
var rd = Object.defineProperty, ad = Object.getOwnPropertyDescriptor, Ze = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ad(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && rd(t, n, o), o;
};
function Ga(e, t) {
  return xn(e.at) - xn(t.at);
}
const Ws = 15, Gs = 24 * 60;
function ld(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((i) => xn(i.at))), n = Math.max(...t);
  for (let i = 1; i <= Gs / Ws; i++) {
    const o = (n + i * Ws) % Gs;
    if (!t.has(o)) return Va(o);
  }
  return Va((n + Ws) % Gs);
}
function Va(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
let We = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._editingList = !1, this._now = Date.now(), this._clock = null, this._scheduled = null, this._focusAfterMode = null, this._profile = "", this._listProfile = "", this._listZone = "", this._profileNotice = null, this._focusNotice = !1, this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._confirmingDeleteAt = null, this._adding = null, this._focusTrigger = null, this._subscribeGen = 0, this._onEditSchedule = () => {
      this._editingList = !0, this._focusAfterMode = "add";
    }, this._onDoneEditing = () => {
      this._editingList = !1, this._confirmingDeleteAt = null, this._focusAfterMode = "edit";
    }, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._adding = {
        at: ld(this._transitions),
        low: cd(this._transitions),
        high: hd(this._transitions)
      }, this._editing = null, this._mode = "add";
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
      const n = this._transitions.filter((i) => i.at !== t);
      await this._writeSchedule(n), this.updateComplete.then(() => this._restoreFocus());
    }, this._onConfirmKeydown = (e) => {
      e.key === "Escape" && (e.preventDefault(), this._confirmingDeleteAt = null, this.updateComplete.then(() => this._restoreFocus()));
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
      n.sort(Ga), this._exitDialogMode(), await this._writeSchedule(n);
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((n) => n.at !== e.detail.at);
      this._exitDialogMode(), await this._writeSchedule(t);
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    if (e.has("hass") && (this._now = Date.now()), e.has("zone") && (this._scheduled = null), this.hass && this.entities) {
      const n = Oi(this.hass, this.entities).scheduled;
      n !== null && (this._scheduled = n);
    }
    const t = e;
    (t.has("_mode") && this._mode !== "list" || t.has("_confirmingDeleteAt") && this._confirmingDeleteAt !== null) && (this._profileNotice = null), e.has("hass") && this.hass && this._profile === "" && (this._profile = qa(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((n) => n.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    var o, s, r, c;
    const t = e.has("hass") && this.hass ? qa(this.hass) : null, n = t && t !== this._profile ? t : null, i = e.has("zone") && e.get("zone") !== void 0;
    if ((n || i) && (this._profileNotice = null, (this._mode !== "list" || this._confirmingDeleteAt !== null) && this._dropChange(i ? Za : Ya(this._listProfile, n)), n && (this._profile = n), this._transitions = [], this._listProfile = "", this._listZone = "", this._resubscribe()), this._focusNotice) {
      const h = (o = this.shadowRoot) == null ? void 0 : o.querySelector(".profile-notice");
      h && (this._focusNotice = !1, h.focus());
    }
    if (e.has("_confirmingDeleteAt") && this._confirmingDeleteAt !== null) {
      const h = (s = this.shadowRoot) == null ? void 0 : s.querySelector(
        "li.row.confirm .button.secondary"
      );
      h == null || h.focus();
    }
    if (this._focusAfterMode) {
      const h = this._focusAfterMode;
      this._focusAfterMode = null, (c = (r = this.shadowRoot) == null ? void 0 : r.querySelector(
        h === "add" ? ".list-toolbar .button.primary" : ".list-toolbar .button.secondary"
      )) == null || c.focus();
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._now = Date.now(), this._tick(), this.hass && this.zone && this._profile && !this._unsub && this._subscribe();
  }
  /** Moves "now" on at the next minute, and again at each after it. */
  _tick() {
    this._clock = setTimeout(
      () => {
        this._now = Date.now(), this._tick();
      },
      6e4 - Date.now() % 6e4
    );
  }
  disconnectedCallback() {
    this._clock !== null && clearTimeout(this._clock), this._clock = null, this._unsubscribe(), super.disconnectedCallback();
  }
  async _subscribe() {
    if (!this.hass || !this.zone || !this._profile) {
      this._loading = !1;
      return;
    }
    const e = ++this._subscribeGen, t = this.zone, n = this._profile;
    this._transitions.length === 0 && (this._loading = !0), this._error = null;
    try {
      const i = await Au(this.hass, { zone: t, profile: n }, (o) => {
        e === this._subscribeGen && (this._listZone = t, this._listProfile = n, this._transitions = o != null && o.baseline ? [...o.baseline].sort(Ga) : [], this._loading = !1);
      });
      if (e !== this._subscribeGen) {
        i();
        return;
      }
      this._unsub = i;
    } catch (i) {
      if (e !== this._subscribeGen) return;
      this._error = i instanceof Error ? i.message : "Failed to subscribe.", this._loading = !1;
    }
  }
  _unsubscribe() {
    var e;
    this._subscribeGen++, (e = this._unsub) == null || e.call(this), this._unsub = void 0;
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
  /** Closes the form or the delete confirm without writing, and says why
   *  with `notice`: the active profile, or the room, changed while the
   *  change was being made. */
  _dropChange(e) {
    this._profileNotice = e, this._mode = "list", this._editing = null, this._adding = null, this._confirmingDeleteAt = null, this._focusTrigger = null, this._focusNotice = !0;
  }
  _exitDialogMode() {
    this._mode = "list", this._editing = null, this._adding = null, this.updateComplete.then(() => this._restoreFocus());
  }
  _restoreFocus() {
    const e = this._focusTrigger;
    if (this._focusTrigger = null, !e) return;
    const t = this.shadowRoot;
    if (!t) return;
    let n = null;
    if (e.kind === "add")
      n = t.querySelector(".list-toolbar button.primary");
    else {
      const i = t.querySelector(`li.row[data-at="${e.at}"]`);
      i && e.button === "edit" ? n = i.querySelector("button.secondary") : i && e.button === "delete" ? n = i.querySelector("button.danger") : n = i;
    }
    n = n ?? t.querySelector(".list-toolbar button.primary"), n == null || n.focus();
  }
  async _writeSchedule(e) {
    if (!this.hass) return;
    if (this._listZone !== this.zone || this._listProfile !== this._profile) {
      this._profileNotice = this._listZone !== this.zone ? Za : Ya(this._listProfile, this._profile), this._focusTrigger = null, this._focusNotice = !0;
      return;
    }
    const t = this._transitions;
    this._transitions = e;
    try {
      await Tu(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (n) {
      this._transitions === e && (this._transitions = t), this._error = n instanceof Error ? n.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return S;
    if (this._mode === "add" || this._mode === "edit") {
      const t = this._mode === "edit" ? this._editing : this._adding;
      return v`
        <transition-edit-dialog
          .transition=${t}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    const e = this._listInForce();
    return v`
      ${this._renderHeader()}
      ${this._profileNotice ? v`<div class="profile-notice" role="status" tabindex="-1">${this._profileNotice}</div>` : S}
      ${this._renderNow()}
      ${this._loading ? v`<div class="loading">Loading schedule…</div>` : this._error ? v`<div class="error" role="alert">${this._error}</div>` : v`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
                .now=${e ? Wa(this._now, this.hass) : null}
              ></comfort-band-schedule-chart>
              <div class="list-toolbar">
                ${this._editingList ? v`<button class="button primary" @click=${this._onAddClicked}>
                        + Add a change
                      </button>
                      <button class="button secondary" @click=${this._onDoneEditing}>Done</button>` : v`<button class="button secondary" @click=${this._onEditSchedule}>
                      Edit schedule
                    </button>`}
              </div>
              ${this._renderList(e)}
            `}
    `;
  }
  /**
   * Which profile's schedule this is, named as typed, where profiles are set
   * up: the profile the list on screen is for, so nothing while one loads
   * (#46). Where the profile select can't be read when the tab opens, that's
   * the profile the tab falls back to; if it can't be read later, it's the
   * last one read.
   * Not "the room follows it": with no schedule of its own in the active
   * profile, a room follows the default profile's.
   */
  _renderHeader() {
    return !this.hass || !this._listProfile || !Wo(this.hass) ? S : v`<div class="header">
      <span class="profile-label">Schedule: ${this._listProfile}</span>
    </div>`;
  }
  /**
   * Whether this list is the one in force: the room's own schedule (not a
   * shared one) for the active profile, with changes in it (without, the
   * room follows the default profile's schedule, or its own range). Where
   * the profile select can't be read, the list shown may not be the active
   * profile's, so it's only taken as in force without a profile manager at
   * all. While a change of profile or room loads the new list, there's
   * none on screen.
   */
  _listInForce() {
    if (!this.hass || !this.entities || this._transitions.length === 0 || Go(this.hass, this.entities) !== !0) return !1;
    const e = es(this.hass), t = e ? this.hass.states[e] : void 0;
    return Ar(t) ? t.state === this._listProfile : !Wo(this.hass);
  }
  /** The range in force now, from the integration's entities, and why it
   *  differs from the schedule's where that can be told; the schedule's
   *  next change, where a schedule sets the range (its place kept while its
   *  words, or whether a schedule sets the range, can't be read); and
   *  whether the room follows a shared schedule. */
  _renderNow() {
    if (!this.hass || !this.entities) return S;
    const e = od(this.hass, this.entities, this._now), t = this._scheduled === !0, n = t ? sd(this.hass, this.entities, this._now) : null, i = Go(this.hass, this.entities) === !1, o = id(this.hass, this.entities);
    return v`
      <div class="now-line">${e ? Ka(e) : S}</div>
      ${t ? v`<div class="next-change">${n ? Ka(n) : S}</div>` : S}
      ${i ? v`<div class="shared-note">
            This room follows ${o ? `“${o}”, a shared schedule` : "a shared schedule"}.
            The changes below are this room’s own, not the ones in force.
          </div>` : S}
    `;
  }
  _renderList(e) {
    if (this._transitions.length === 0)
      return v`<div class="empty">
        ${this._editingList ? "No changes yet. Use “Add a change” to create one." : "No changes yet."}
      </div>`;
    const t = e ? td(this._transitions, Wa(this._now, this.hass)) : null, n = nd(this._transitions);
    return v`
      <ul class="list" role="list">
        ${this._transitions.map(
      (i, o) => this._confirmingDeleteAt === i.at ? this._renderConfirmRow(i) : this._editingList ? this._renderRow(i, o === t, n[o]) : this._renderReadRow(i, o === t, n[o])
    )}
      </ul>
    `;
  }
  _tags(e, t) {
    return v`${e ? v`<span class="tag current">Current</span>` : S}
    ${t ? v`<span class="tag same">Same as before</span>` : S}`;
  }
  _renderReadRow(e, t, n) {
    return v`
      <li
        class="row read ${t ? "current" : ""}"
        role="listitem"
        data-at=${e.at}
        aria-current=${t ? "true" : S}
      >
        <span class="at">${Ls(e.at, this.hass)}</span>
        <span class="band">${Ct(e)}</span>
        ${this._tags(t, n)}
      </li>
    `;
  }
  _renderRow(e, t, n) {
    const i = Ls(e.at, this.hass), o = [
      `Edit the ${i} change, ${rt(e.low)} to ${rt(e.high)} degrees`,
      t ? "current" : "",
      n ? "same as before" : ""
    ].filter(Boolean).join(", ");
    return v`
      <li
        class="row ${t ? "current" : ""}"
        role="listitem"
        tabindex="0"
        data-at=${e.at}
        aria-label=${o}
        aria-current=${t ? "true" : S}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${i}</span>
        <span class="band">${Ct(e)}</span>
        ${this._tags(t, n)}
        <span class="actions">
          <button
            class="button secondary"
            aria-label="Edit the ${i} change"
            @click=${this._onEditClicked(e)}
          >
            Edit
          </button>
          <button
            class="button danger"
            aria-label="Delete the ${i} change"
            @click=${this._onDeleteClicked(e)}
          >
            Delete
          </button>
        </span>
      </li>
    `;
  }
  _renderConfirmRow(e) {
    const t = `Delete the ${Ls(e.at, this.hass)} change?`;
    return v`
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
We.styles = [
  Ve,
  De`
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
        overflow-wrap: anywhere;
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
        /* A row with its tags and buttons wraps on a phone rather than
           widening the dialog. */
        flex-wrap: wrap;
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
        white-space: nowrap;
      }
      .row .actions {
        display: flex;
        gap: 4px;
        margin-inline-start: auto;
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
      /* Each two lines' height, whether its words take one or two, so a
         reason coming or going, or a time changing, as HA updates doesn't
         move the chart and list below (#47; as the Now tab's status, #55).
         Its own line height, so two lines are exactly that in any engine. */
      .now-line,
      .next-change {
        line-height: 1.35;
        min-height: 2.7em;
      }
      .now-line {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      /* A time or a range kept on one line (#66). */
      .whole {
        white-space: nowrap;
      }
      .next-change {
        font-size: 13px;
        color: var(--cb-text-secondary);
      }
      .profile-notice {
        margin-bottom: var(--cb-gap-sm);
        /* A profile's name can be long and unbroken. */
        overflow-wrap: anywhere;
        padding: var(--cb-gap-sm);
        border-radius: 6px;
        background: var(--cb-track-bg);
        color: var(--cb-text-primary);
        font-size: 13px;
        line-height: 1.35;
      }
      .shared-note {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.35;
        color: var(--cb-text-secondary);
      }
      .list-toolbar {
        gap: var(--cb-gap-sm);
      }
      /* Read first: rows aren't buttons until "Edit schedule". */
      .row.read {
        cursor: default;
      }
      .row.read:not(.current):hover {
        background: none;
      }
      .row.current {
        box-shadow: inset 3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));
        background: var(--cb-track-bg);
      }
      /* The bar at the row's start, in right-to-left too (#109). */
      .row.current:dir(rtl) {
        box-shadow: inset -3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));
      }
      /* On the highlight, secondary text would be too faint. */
      .row.current .band,
      .row.current .tag {
        color: var(--cb-text-primary);
      }
      .tag {
        flex: none;
        padding: 2px 8px;
        border-radius: var(--cb-radius-pill);
        border: 1px solid var(--divider-color, #cccccc);
        font-size: 11px;
        color: var(--cb-text-secondary);
      }
      .tag.current {
        border-color: var(--cb-accent, var(--primary-color, #03a9f4));
        color: var(--cb-text-primary);
      }
      .empty {
        text-align: center;
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
      }
    `
];
Ze([
  D({ attribute: !1 })
], We.prototype, "hass", 2);
Ze([
  D({ type: String })
], We.prototype, "zone", 2);
Ze([
  D({ attribute: !1 })
], We.prototype, "entities", 2);
Ze([
  G()
], We.prototype, "_editingList", 2);
Ze([
  G()
], We.prototype, "_now", 2);
Ze([
  G()
], We.prototype, "_profile", 2);
Ze([
  G()
], We.prototype, "_listProfile", 2);
Ze([
  G()
], We.prototype, "_listZone", 2);
Ze([
  G()
], We.prototype, "_profileNotice", 2);
Ze([
  G()
], We.prototype, "_transitions", 2);
Ze([
  G()
], We.prototype, "_loading", 2);
Ze([
  G()
], We.prototype, "_error", 2);
Ze([
  G()
], We.prototype, "_mode", 2);
Ze([
  G()
], We.prototype, "_editing", 2);
Ze([
  G()
], We.prototype, "_confirmingDeleteAt", 2);
We = Ze([
  Ge("comfort-band-schedule-tab")
], We);
function Ka(e) {
  return e.map(
    (t, n) => typeof t == "string" ? t : typeof e[n - 1] == "object" ? v`<wbr /><span class="whole">${t.whole}</span>` : v`<span class="whole">${t.whole}</span>`
  );
}
function qa(e) {
  const t = es(e);
  if (!t) return null;
  const n = e.states[t];
  return !n || (n.state === "unavailable" || n.state === "unknown") && n.attributes.default_profile === void 0 ? null : n.state;
}
function Ya(e, t) {
  return `The active profile is “${t}”, so your change to the “${e}” schedule wasn’t saved.`;
}
const Za = "This card now shows a different room, so your change wasn’t saved.";
function cd(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function hd(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var ud = Object.defineProperty, dd = Object.getOwnPropertyDescriptor, Fi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? dd(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && ud(t, n, o), o;
};
const fd = 1e3, pd = 15e3, wi = (e, t, n) => ({
  kind: "switch",
  field: e,
  title: t,
  desc: n
}), St = (e, t, n) => ({
  kind: "number",
  field: e,
  title: t,
  desc: n
}), Vs = (e, t, n, i) => ({ kind: "select", field: e, title: t, desc: n, label: i }), bc = (e) => e, gd = {
  comfort: {
    main: [
      wi(
        "useApparentTemperature",
        "Use “feels like”",
        "When on, heating and cooling go by the humidity-adjusted “feels like” temperature instead of the room’s own reading. Falls back to the room’s reading automatically if the humidity sensor is unavailable."
      ),
      St(
        "deadbandBelow",
        "Heating starts below the range by",
        "How far below the range the room may drop before heating starts; heating stops at the bottom of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and heats towards the top of the range."
      ),
      St(
        "deadbandAbove",
        "Cooling starts above the range by",
        "How far above the range the room may rise before cooling starts; cooling stops at the top of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and cools towards the bottom of the range."
      ),
      St(
        "bandRampMinutes",
        "Ease schedule changes over",
        "Spreads each change of range over this long, centred on its time, instead of changing all at once. 0 changes at once."
      ),
      St(
        "overrideHours",
        "Adjustments made elsewhere last",
        "How long an adjustment lasts when it’s started without a length: from the device page, or an automation that doesn’t give one. Warmer, Cooler and the exact range here set their own length."
      )
    ]
  },
  automation: {
    main: [
      wi(
        "enabled",
        "Control this room",
        "When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused."
      ),
      wi(
        "learningEnabled",
        "Learning",
        "Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings."
      ),
      wi(
        "mpcEnabled",
        "Predictive control",
        "Plans heating and cooling ahead, from what the room has learned and the schedule coming up. Needs Learning on. It plans only while it has recent enough readings of how this room warms and cools, usually after a few hours of normal running."
      )
    ],
    fine: [
      St(
        "lookaheadMinutes",
        "Look ahead by",
        "How far ahead learning projects the room’s temperature, to start or stop early, or hold off."
      ),
      St(
        "passiveTolerance",
        "Let it drift back within",
        "How far outside the range the room may be for learning to let it drift back on its own, rather than heat or cool."
      ),
      St(
        "mpcHorizonMinutes",
        "Plan ahead by",
        "How far ahead predictive control plans, schedule changes included."
      ),
      St(
        "minCycleMinutes",
        "Repeat a command no sooner than",
        "The least time before the unit is sent the same command again, such as a new setting while it’s already heating."
      ),
      St(
        "crossModeMinMinutes",
        "Switch between heating and cooling no sooner than",
        "The least time between heating and then cooling, or the other way round."
      )
    ]
  },
  fan: {
    main: [
      wi(
        "fanControlEnabled",
        "Fan control",
        "Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen."
      ),
      Vs(
        "activeFanMode",
        "Fan while heating or cooling",
        "The fan speed while the unit is working. Peak saving can leave it as it is during a peak.",
        Ja
      ),
      Vs(
        "idleFanMode",
        "Fan while idle",
        "The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed.",
        Ja
      )
    ]
  },
  peak: {
    main: [
      wi(
        "peakSavingEnabled",
        "Peak saving",
        "Runs heating and cooling less in expensive power times. During one, the range widens, so the room drifts further before heating or cooling starts. Ahead of one that’s announced, the room can be warmed or cooled a little within its range. An adjustment in force sets both aside. Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure."
      ),
      St(
        "peakHeatOffset",
        "Relax the bottom of the range by",
        "How far the bottom of the range drops during a peak; heating still starts the usual amount below it. Ahead of one, up to how far the bottom rises to warm the room first."
      ),
      St(
        "peakCoolOffset",
        "Relax the top of the range by",
        "How far the top of the range rises during a peak; cooling still starts the usual amount above it. Ahead of one, up to how far the top falls to cool the room first."
      ),
      St(
        "peakPreconditionMinutes",
        "Prepare ahead by",
        "How long before an announced peak to warm or cool the room. 0 doesn’t prepare."
      )
    ]
  },
  schedules: {
    main: [
      Vs(
        "scheduleAssignment",
        "Follows",
        "Which schedule sets this room’s range: its own, or one shared with other rooms. The Schedule tab shows and changes the room’s own schedule, even while it follows a shared one.",
        bc
      )
    ]
  }
}, md = {
  fan: { what: "Fan control needs", since: "v0.13.0" },
  peak: { what: "Peak saving needs", since: "v0.24.0" },
  schedules: { what: "Choosing a shared schedule needs", since: "v0.14.0" }
};
function Ja(e) {
  if (e === "(none)") return "Leave as it is";
  const t = e.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Vo(e) {
  const t = String(e), n = t.indexOf(".");
  return n < 0 ? 0 : t.length - n - 1;
}
function bd(e, t) {
  return Math.max(Vo(t), Vo(Number(e.toFixed(3))));
}
function _d(e) {
  const t = typeof e == "object" && e !== null ? e.message : void 0;
  return typeof t == "string" && t ? t : "That setting couldn’t be changed.";
}
function yi(e) {
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) ? t : null;
}
let kn = class extends Te {
  constructor() {
    super(...arguments), this.section = "comfort", this._pending = {}, this._error = null, this._timers = /* @__PURE__ */ new Map(), this._settling = /* @__PURE__ */ new Map(), this._chain = Promise.resolve(), this._onToggle = (e) => {
      if (this._pending[e] !== void 0) return;
      const t = !this._isOn(e);
      this._pending = { ...this._pending, [e]: t }, this._error = null, this._send(e, t, "switch", t ? "turn_on" : "turn_off", {});
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const [e, t] of this._timers) {
      clearTimeout(t), this._timers.delete(e);
      const n = this._pending[e];
      typeof n == "number" && this._send(e, n, "number", "set_value", { value: n });
    }
    for (const e of [...this._settling.keys()]) this._drop(e);
  }
  /** A value that has gone through shows until HA's state for its entity
   *  changes, then HA's state shows: the value sent, or what HA made of it. */
  willUpdate() {
    var e;
    for (const [t, { baseline: n }] of [...this._settling])
      ((e = this.hass) == null ? void 0 : e.states[t]) !== n && this._drop(t);
  }
  _entity(e) {
    var n;
    const t = (n = this.entities) == null ? void 0 : n[e];
    return typeof t == "string" ? t : null;
  }
  /** Sends a call for the value shown, after the ones before it. Refused,
   *  the value in force shows again; through, the value shows until HA
   *  reports it. A newer tap or choice made meanwhile keeps showing. */
  _send(e, t, n, i, o) {
    const s = this.hass;
    if (!s) return;
    const r = () => this._pending[e] === t && !this._timers.has(e);
    this._chain = this._chain.then(() => s.callService(n, i, { entity_id: e, ...o })).then(
      () => {
        var c;
        ((c = this._error) == null ? void 0 : c.entityId) === e && (this._error = null), r() && (this._reported(e, t) || !this.isConnected ? this._drop(e) : this._settle(e));
      },
      (c) => {
        this._error = { entityId: e, message: _d(c) }, r() && this._drop(e);
      }
    );
  }
  /** Whether HA's state for the entity already says the value. */
  _reported(e, t) {
    var i, o;
    const n = (o = (i = this.hass) == null ? void 0 : i.states[e]) == null ? void 0 : o.state;
    return typeof t == "boolean" ? n === (t ? "on" : "off") : typeof t == "number" ? Number.parseFloat(n ?? "") === t : n === t;
  }
  /** Keeps a value that has gone through showing until HA's state for its
   *  entity changes, or for SETTLE_MS at most. */
  _settle(e) {
    var t;
    this._stopSettling(e), this._settling.set(e, {
      baseline: (t = this.hass) == null ? void 0 : t.states[e],
      timer: setTimeout(() => this._drop(e), pd)
    });
  }
  _stopSettling(e) {
    const t = this._settling.get(e);
    t && clearTimeout(t.timer), this._settling.delete(e);
  }
  /** Shows HA's value again. */
  _drop(e) {
    if (this._stopSettling(e), this._pending[e] === void 0) return;
    const t = { ...this._pending };
    delete t[e], this._pending = t;
  }
  _isOn(e) {
    var n, i;
    const t = this._pending[e];
    return typeof t == "boolean" ? t : ((i = (n = this.hass) == null ? void 0 : n.states[e]) == null ? void 0 : i.state) === "on";
  }
  _onStep(e, t) {
    var A;
    const n = (A = this.hass) == null ? void 0 : A.states[e];
    if (!n) return;
    const i = yi(n.attributes.step) ?? 1, o = yi(n.attributes.min) ?? -1 / 0, s = yi(n.attributes.max) ?? 1 / 0, r = this._pending[e], c = typeof r == "number" ? r : Number.parseFloat(n.state), h = Number.isFinite(o) ? o : 0, d = (c - h) / i, p = t > 0 ? Math.floor(d + 1e-9) + 1 : Math.ceil(d - 1e-9) - 1, g = Math.max(Vo(i), Vo(h)), b = Math.min(s, Math.max(o, Number((h + p * i).toFixed(g))));
    this._pending = { ...this._pending, [e]: b }, this._error = null, this._stopSettling(e);
    const x = this._timers.get(e);
    x !== void 0 && clearTimeout(x), this._timers.set(
      e,
      setTimeout(() => {
        this._timers.delete(e), this._send(e, b, "number", "set_value", { value: b });
      }, fd)
    );
  }
  _onChoose(e, t) {
    this._pending = { ...this._pending, [e]: t }, this._error = null, this._stopSettling(e), this._send(e, t, "select", "select_option", { option: t });
  }
  render() {
    if (!this.hass || !this.entities) return S;
    const { main: e, fine: t = [] } = gd[this.section], n = (h) => h.filter((d) => this._entity(d.field) !== null), i = n(e), o = n(t), s = e.length + t.length - i.length - o.length, r = i.length + o.length === 0, c = md[this.section];
    return v`
      ${this._error ? v`<div class="error" role="alert">${this._error.message}</div>` : S}
      ${this.section === "peak" ? this._renderStatus(Wu(this.hass, this.entities, Date.now()), "peak") : S}
      ${i.map((h) => this._renderSetting(h))}
      ${this.section === "comfort" ? v`${this._renderHumidity()}
          ${this._renderStatus(Uu(this.hass, this.entities), "source")}` : S}
      ${this.section === "automation" ? this._renderStatus(ju(this.hass, this.entities), "readiness") : S}
      ${o.length ? v`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${o.map((h) => this._renderSetting(h))}
          </details>` : S}
      ${r ? v`<div class="upgrade-hint">
            ${c ? v`${c.what} the <code>comfort_band</code> integration ${c.since} or
                  later, with its entities turned on.` : v`These settings’ entities are turned off. Turn them on from this room’s device
                page, under Settings → Devices &amp; Services.`}
          </div>` : s > 0 ? v`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>` : S}
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
          desc: v`${e.desc}`
        });
      case "number":
        return this._renderNumber(t, e);
      case "select":
        return this._renderSelect(t, e);
    }
  }
  /** What the integration is doing, beside the settings it explains. */
  _renderStatus(e, t) {
    return e ? v`
      <div class="row" data-status=${t}>
        <div class="row-label">
          <div class="title">${e.title}</div>
          <div class="desc">${e.desc}</div>
        </div>
        <div class="info-value">${e.value}</div>
      </div>
    ` : S;
  }
  _renderHumidity() {
    const e = this.entities.roomTemperature, t = e !== null ? this.hass.states[e] : void 0, n = t !== void 0 && t.state !== "unavailable", i = n ? ac(this.hass, e) : null, o = t === void 0 ? "Can’t be read" : n ? i ? this._sensorText(i) : "Not configured" : "Can’t be read right now";
    return v`
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">${t === void 0 ? "It’s read from this room’s Room temperature sensor, which is turned off. Turn it on from this room’s device page, under Settings → Devices & Services." : `${n ? i ? "Change it" : "Set one up" : "Set"} under Settings → Devices & Services → Comfort Band → Configure.`}</div>
        </div>
        <div class="info-value ${i ? "" : "unconfigured"}">${o}</div>
      </div>
    `;
  }
  /** "Bedroom humidity · 54%": the sensor's own name and reading, not its
   *  ID, the reading as HA formats it where the frontend can. */
  _sensorText(e) {
    const t = this.hass.states[e];
    if (!t) return e;
    const n = typeof t.attributes.friendly_name == "string" && t.attributes.friendly_name ? t.attributes.friendly_name : e, i = Number.parseFloat(t.state);
    if (!Number.isFinite(i)) return `${n} · no reading`;
    if (this.hass.formatEntityState) return `${n} · ${this.hass.formatEntityState(t)}`;
    const o = typeof t.attributes.unit_of_measurement == "string" ? t.attributes.unit_of_measurement : "";
    return `${n} · ${t.state}${o ? ` ${o}` : ""}`;
  }
  _renderNumber(e, t) {
    const n = this.hass.states[e], i = yi(n == null ? void 0 : n.attributes.step) ?? 1, o = yi(n == null ? void 0 : n.attributes.min), s = yi(n == null ? void 0 : n.attributes.max), r = typeof (n == null ? void 0 : n.attributes.unit_of_measurement) == "string" ? n.attributes.unit_of_measurement : "", c = this._pending[e], h = typeof c == "number" ? c : Number.parseFloat((n == null ? void 0 : n.state) ?? ""), d = Number.isFinite(h), p = d ? `${h.toFixed(bd(h, i))}${r ? ` ${r}` : ""}` : "—", g = `t-${t.field}`, b = !d || o !== null && h <= o, x = !d || s !== null && h >= s;
    return v`
      <div class="row num" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${g}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <div class="stepper" role="group" aria-labelledby=${g}>
          <button
            class="step"
            type="button"
            aria-label="Decrease"
            aria-disabled=${b ? "true" : "false"}
            @click=${() => !b && this._onStep(e, -1)}
          >
            −
          </button>
          <output class="value" aria-live="polite">${p}</output>
          <button
            class="step"
            type="button"
            aria-label="Increase"
            aria-disabled=${x ? "true" : "false"}
            @click=${() => !x && this._onStep(e, 1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
  _renderSelect(e, t) {
    const n = this.hass.states[e], i = Array.isArray(n == null ? void 0 : n.attributes.options) ? n.attributes.options.filter((p) => typeof p == "string") : [], o = this._pending[e], s = typeof o == "string" ? o : (n == null ? void 0 : n.state) ?? "", r = `t-${t.field}`, c = (n == null ? void 0 : n.state) === "unavailable" || i.length === 0, h = i.includes(s), d = t.label ?? bc;
    return v`
      <div class="row pick" data-setting=${t.field}>
        <div class="row-label">
          <div class="title" id=${r}>${t.title}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <select
          class="choice"
          aria-labelledby=${r}
          ?disabled=${c}
          @change=${(p) => this._onChoose(e, p.target.value)}
        >
          ${h && !c ? S : v`<option value="" disabled .selected=${!0}>
                ${c ? "Unavailable" : "—"}
              </option>`}
          ${i.map(
      (p) => v`<option value=${p} .selected=${!c && p === s}>
                ${d(p)}
              </option>`
    )}
        </select>
      </div>
    `;
  }
  _renderToggle(e) {
    var o;
    const t = this._isOn(e.entityId), n = this._pending[e.entityId] !== void 0, i = (o = this.hass.states[e.entityId]) == null ? void 0 : o.state;
    return i !== "on" && i !== "off" ? v`
        <div class="row" data-setting=${e.field}>
          <div class="row-label">
            <div class="title">${e.title}</div>
            <div class="desc">${e.desc}</div>
          </div>
          <div class="info-value unconfigured">
            ${i === void 0 || i === "unavailable" ? "Unavailable" : "Unknown"}
          </div>
        </div>
      ` : v`
      <div class="row" data-setting=${e.field}>
        <div class="row-label">
          <div class="title">${e.title}</div>
          <div class="desc">${e.desc}</div>
        </div>
        <button
          class="toggle"
          role="switch"
          aria-checked=${t ? "true" : "false"}
          aria-disabled=${n ? "true" : "false"}
          aria-label=${e.title}
          @click=${n ? null : () => this._onToggle(e.entityId)}
        >
          <span class="knob"></span>
        </button>
      </div>
    `;
  }
};
kn.styles = [
  Ve,
  De`
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
        /* An entity ID named in it wraps rather than widening the dialog. */
        overflow-wrap: anywhere;
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
      /* The knob starts at the switch's start and moves to its end when on,
         mirrored in right-to-left, as phone switches do (#109). */
      .toggle .knob {
        position: absolute;
        top: 50%;
        inset-inline-start: 4px;
        width: 24px;
        height: 24px;
        margin-top: -12px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: inset-inline-start 0.15s ease;
      }
      .toggle[aria-checked='true'] .knob {
        inset-inline-start: 24px;
      }
      .toggle[aria-disabled='true'] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      /* Forced colours (a Windows contrast theme) give the track and the
         knob the page's colour, and neither has a border, so the whole
         switch vanished (#88). There it's drawn in the theme's button
         colours, a track edged and a knob in its text colour; on, the track
         is filled with the selection colour, the knob in that colour's
         text. Opted out, as #73's buttons, every colour is its own, the
         focus ring Highlight as forced colours make the others'. The edge
         is an inset shadow: a border would take room inside the button,
         rounded to whole device pixels, and move the knob. */
      @media (forced-colors: active) {
        .toggle {
          forced-color-adjust: none;
          background: ButtonFace;
          box-shadow: inset 0 0 0 2px ButtonText;
        }
        .toggle:focus-visible {
          outline-color: Highlight;
        }
        .toggle[aria-checked='true'] {
          background: Highlight;
          box-shadow: none;
        }
        .toggle .knob {
          background: ButtonText;
          box-shadow: none;
        }
        .toggle[aria-checked='true'] .knob {
          background: HighlightText;
        }
      }
      .info-value {
        /* A long name or ID wraps rather than squeezing the label out. */
        max-width: 55%;
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--cb-text-primary);
        text-align: end;
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
      /* A stepper too wide to leave its title room goes below it. */
      .row.num {
        flex-wrap: wrap;
      }
      .row.num .row-label {
        flex: 1 1 12em;
      }
      .stepper {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        gap: 2px;
        margin-inline-start: auto;
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
      /* A choice too wide to sit beside its title goes below it. */
      .row.pick {
        flex-wrap: wrap;
      }
      .row.pick .row-label {
        flex: 1 1 12em;
      }
      /* WCAG 2.5.5: 44px tall. WebKit's own menu button ignores the height and
         the border, so it's drawn here, chevron included. */
      .choice {
        flex: 0 1 auto;
        max-width: 100%;
        min-height: 44px;
        margin-inline-start: auto;
        padding: 0 28px 0 10px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 8px;
        -webkit-appearance: none;
        appearance: none;
        background-color: var(--card-background-color, #ffffff);
        background-image:
          linear-gradient(45deg, transparent 50%, var(--cb-text-secondary) 50%),
          linear-gradient(135deg, var(--cb-text-secondary) 50%, transparent 50%);
        background-position:
          calc(100% - 15px) 50%,
          calc(100% - 10px) 50%;
        background-size: 5px 5px;
        background-repeat: no-repeat;
        color: var(--cb-text-primary);
        font: inherit;
        /* iOS zooms the page into a select set smaller when it's tapped (#3). */
        font-size: 16px;
        text-overflow: ellipsis;
        /* With its own look, WebKit lets a long option's text out of the box. */
        overflow: hidden;
      }
      /* In right-to-left the arrow and the room for it move to the end
         together (#109). One rule for both: a browser without :dir() drops
         it whole and keeps them together on the right, as before. */
      .choice:dir(rtl) {
        padding: 0 10px 0 28px;
        background-position:
          10px 50%,
          15px 50%;
      }
      .choice:disabled {
        opacity: 0.6;
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
      /* Spaced on its words' side, and closed, pointing towards them, in
         right-to-left too (#108). */
      details.fine > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin-block: 0;
        margin-inline: 2px 8px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.fine:not([open]) > summary:dir(rtl)::before {
        transform: rotate(135deg);
      }
      details.fine[open] > summary::before {
        transform: rotate(45deg);
      }
      details.fine .fine-summary {
        margin-inline-start: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `
];
Fi([
  D({ attribute: !1 })
], kn.prototype, "hass", 2);
Fi([
  D({ attribute: !1 })
], kn.prototype, "entities", 2);
Fi([
  D({ type: String })
], kn.prototype, "section", 2);
Fi([
  G()
], kn.prototype, "_pending", 2);
Fi([
  G()
], kn.prototype, "_error", 2);
kn = Fi([
  Ge("comfort-band-settings-tab")
], kn);
var vd = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, hn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? wd(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && vd(t, n, o), o;
};
let Rt = class extends Te {
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
      var t, n;
      (t = this._nameInput) == null || t.focus(), (n = this._nameInput) == null || n.select();
    });
  }
  _validate() {
    const e = this._name.trim();
    return e ? this.existingNames.some(
      (n) => n === e && !(this.mode === "rename" && n === this.existingName)
    ) ? (this._error = `Profile ${e} already exists.`, !1) : (this._error = null, !0) : (this._error = "Name cannot be empty.", !1);
  }
  _heading() {
    return this.mode === "create" ? "New profile" : this.mode === "clone" ? "Clone profile" : "Rename profile";
  }
  render() {
    return v`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? v`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? v`<label>
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
      ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
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
Rt.styles = [
  Ve,
  De`
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
      /* 44px tall (WCAG 2.5.5), and 16px type: iOS zooms the page into a
         field set smaller when it's focused (#3). */
      input {
        font: inherit;
        font-size: 16px;
        min-height: 44px;
        box-sizing: border-box;
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
hn([
  D({ type: String })
], Rt.prototype, "mode", 2);
hn([
  D({ type: String })
], Rt.prototype, "existingName", 2);
hn([
  D({ type: Array })
], Rt.prototype, "existingNames", 2);
hn([
  D({ type: Boolean })
], Rt.prototype, "busy", 2);
hn([
  G()
], Rt.prototype, "_name", 2);
hn([
  G()
], Rt.prototype, "_description", 2);
hn([
  G()
], Rt.prototype, "_error", 2);
hn([
  zi('input[name="name"]')
], Rt.prototype, "_nameInput", 2);
Rt = hn([
  Ge("profile-edit-dialog")
], Rt);
var yd = Object.defineProperty, xd = Object.getOwnPropertyDescriptor, Cn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? xd(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && yd(t, n, o), o;
};
let Xt = class extends Te {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._busy = !1, this._menuOpenedByKeyboard = !1, this._dialogTrigger = null, this._onDocumentClick = (e) => {
      if (this._openMenu === null) return;
      e.composedPath().some(
        (i) => {
          var o, s;
          return i instanceof HTMLElement && (((o = i.classList) == null ? void 0 : o.contains("menu")) || ((s = i.classList) == null ? void 0 : s.contains("overflow")));
        }
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._busy || (this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog());
    }, this._onDialogSave = async (e) => {
      if (!this.hass || this._busy) return;
      const { name: t, description: n } = e.detail, i = this._mode, o = this._target;
      this._busy = !0, this._error = null;
      try {
        if (i === "create")
          await Eu(this.hass, { name: t, description: n });
        else if (i === "clone" && o)
          await Du(this.hass, { source: o, target: t, description: n });
        else if (i === "rename" && o)
          t !== o && await Mu(this.hass, { old: o, new: t });
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
        await Pu(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
      var t, n;
      !this._menuOpenedByKeyboard || this._openMenu === null || (n = (t = this.shadowRoot) == null ? void 0 : t.querySelector('.menu button[role="menuitem"]:not([disabled])')) == null || n.focus();
    }), e.has("_mode") && this._mode === "confirm-delete" && requestAnimationFrame(() => {
      var t, n;
      (n = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".confirm-delete")) == null || n.focus();
    });
  }
  _readState() {
    if (!this.hass) return null;
    const e = es(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!Ar(t)) return null;
    const n = t.attributes.options, i = Array.isArray(n) ? n.filter((p) => typeof p == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, r = typeof s == "string" && !!s, c = r ? s : "home", h = t.attributes.descriptions, d = {};
    if (h && typeof h == "object" && !Array.isArray(h))
      for (const [p, g] of Object.entries(h))
        typeof g == "string" && (d[p] = g);
    return { options: i, active: o, defaultProfile: c, descriptions: d, crudAvailable: r };
  }
  _onSelect(e) {
    this.hass && Cu(this.hass, { profile: e }).catch(
      () => {
        var t;
        return (t = this.announce) == null ? void 0 : t.call(this, `Couldn’t switch to “${e}”. Try again.`);
      }
    );
  }
  _toggleMenu(e, t) {
    t.stopPropagation(), this._menuOpenedByKeyboard = this._openMenu !== e && t instanceof MouseEvent && t.detail === 0, this._openMenu = this._openMenu === e ? null : e;
  }
  /** Keyboard navigation inside the open overflow menu — Escape closes,
   *  ArrowUp/ArrowDown moves focus, satisfying ARIA's `role="menu"` contract. */
  _onMenuKeydown(e, t) {
    var r;
    if (e.key === "Tab") {
      this._openMenu = null, this._menuOpenedByKeyboard = !1;
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault(), e.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1, requestAnimationFrame(() => {
        var d, p;
        const c = (d = this.shadowRoot) == null ? void 0 : d.querySelectorAll("li[data-profile]"), h = c ? Array.from(c).find((g) => g.dataset.profile === t) : void 0;
        (p = h == null ? void 0 : h.querySelector(".overflow")) == null || p.focus();
      });
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault(), e.stopPropagation();
    const n = Array.from(
      e.currentTarget.querySelectorAll(
        'button[role="menuitem"]:not([disabled])'
      )
    );
    if (n.length === 0) return;
    const i = (r = this.shadowRoot) == null ? void 0 : r.activeElement, o = i ? n.indexOf(i) : -1;
    (e.key === "ArrowDown" ? n[(o + 1) % n.length] : n[(o - 1 + n.length) % n.length]).focus();
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
      var i, o, s, r;
      if (e === "__new__") {
        (o = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".new-profile")) == null || o.focus();
        return;
      }
      const t = (s = this.shadowRoot) == null ? void 0 : s.querySelectorAll("li[data-profile]"), n = t ? Array.from(t).find((c) => c.dataset.profile === e) : void 0;
      (r = n == null ? void 0 : n.querySelector(".overflow")) == null || r.focus();
    });
  }
  render() {
    if (!this.hass) return S;
    const e = this._readState();
    if (e === null)
      return Wo(this.hass) ? v`<div class="empty">
            Profiles aren't available right now. If the Comfort Band Profiles entry or its active
            profile entity is disabled, turn it back on under Settings → Devices &amp; Services.
          </div>` : v`<div class="empty">
            No profiles set up. Profiles are named sets of schedules, such as Home and Away, that
            every room switches between together. To use them, add Comfort Band again under Settings
            → Devices &amp; Services and choose “Set up profile manager”.
          </div>`;
    const { options: t, active: n, defaultProfile: i, descriptions: o, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return v`
        ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
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
      const r = this._target === n;
      return v`
        <div
          class="confirm-delete"
          @keydown=${(c) => {
        c.key === "Escape" && !this._busy && (c.preventDefault(), this._onDialogCancel());
      }}
          tabindex="-1"
        >
          <h3>Delete profile?</h3>
          <p>
            Delete <strong>${this._target}</strong>?${" "}
            ${r ? v`This profile is active — deleting will switch to
                  <strong>${i}</strong>.` : ""}
          </p>
          ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? v`<div class="empty">No profiles configured.</div>` : v`
      ${this._error ? v`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? v`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : S}
      <ul aria-label="Profiles">
        ${t.map(
      (r, c) => this._renderRow(r, c, n, i, o, s)
    )}
      </ul>
      ${s ? S : v`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, n, i, o, s) {
    const r = e === n, c = e === i, h = o[e] ?? "", d = `cb-profile-menu-${t}`;
    return v`
      <li
        data-profile=${e}
        tabindex="0"
        class=${r ? "active" : ""}
        aria-current=${r ? "true" : S}
        @click=${() => this._onSelect(e)}
        @keydown=${(p) => {
      if (p.key === "Escape" && this._openMenu !== null) {
        p.preventDefault(), p.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1;
        return;
      }
      p.target === p.currentTarget && (p.key === "Enter" || p.key === " ") && (p.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${h ? v`<span class="description">${h}</span>` : S}
        </span>
        ${r ? v`<span class="badge">Active</span>` : S}
        ${s ? v`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? d : S}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(p) => this._toggleMenu(e, p)}
            >
              ⋮
            </button>` : S}
        ${this._openMenu === e ? v`
              <div
                id=${d}
                class="menu"
                role="menu"
                @click=${(p) => p.stopPropagation()}
                @keydown=${(p) => this._onMenuKeydown(p, e)}
              >
                <button
                  role="menuitem"
                  @click=${(p) => {
      p.stopPropagation(), this._onClone(e);
    }}
                >
                  Clone
                </button>
                <button
                  role="menuitem"
                  @click=${(p) => {
      p.stopPropagation(), this._onRename(e);
    }}
                >
                  Rename
                </button>
                <button
                  role="menuitem"
                  class="danger"
                  ?disabled=${c}
                  aria-disabled=${c}
                  @click=${(p) => {
      p.stopPropagation(), c || this._onDelete(e);
    }}
                  title=${c ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : S}
      </li>
    `;
  }
};
Xt.styles = [
  Ve,
  De`
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
      /* WCAG 2.5.5: 44px tall (#3), as the menu's items are. */
      .new-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        min-height: 44px;
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
        text-align: start;
        font: inherit;
        font-size: 13px;
        min-height: 44px;
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
Cn([
  D({ attribute: !1 })
], Xt.prototype, "hass", 2);
Cn([
  D({ attribute: !1 })
], Xt.prototype, "announce", 2);
Cn([
  G()
], Xt.prototype, "_mode", 2);
Cn([
  G()
], Xt.prototype, "_target", 2);
Cn([
  G()
], Xt.prototype, "_openMenu", 2);
Cn([
  G()
], Xt.prototype, "_error", 2);
Cn([
  G()
], Xt.prototype, "_busy", 2);
Xt = Cn([
  Ge("comfort-band-profiles-tab")
], Xt);
const $d = !0, Oe = "u-", kd = "uplot", Sd = Oe + "hz", Ad = Oe + "vt", Td = Oe + "title", Cd = Oe + "wrap", Ed = Oe + "under", Dd = Oe + "over", Md = Oe + "axis", Wn = Oe + "off", Pd = Oe + "select", Nd = Oe + "cursor-x", zd = Oe + "cursor-y", Od = Oe + "cursor-pt", Fd = Oe + "legend", Hd = Oe + "live", Ld = Oe + "inline", Rd = Oe + "series", jd = Oe + "marker", Qa = Oe + "label", Id = Oe + "value", to = "width", no = "height", Ji = "top", Xa = "bottom", xi = "left", Ks = "right", Er = "#000", el = Er + "0", qs = "mousemove", tl = "mousedown", Ys = "mouseup", nl = "mouseenter", il = "mouseleave", ol = "dblclick", Ud = "resize", Bd = "scroll", sl = "change", Ko = "dppxchange", Dr = "--", Hi = typeof window < "u", ar = Hi ? document : null, Ai = Hi ? window : null, Wd = Hi ? navigator : null;
let he, Fo;
function lr() {
  let e = devicePixelRatio;
  he != e && (he = e, Fo && hr(sl, Fo, lr), Fo = matchMedia(`(min-resolution: ${he - 1e-3}dppx) and (max-resolution: ${he + 1e-3}dppx)`), Vn(sl, Fo, lr), Ai.dispatchEvent(new CustomEvent(Ko)));
}
function pt(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function cr(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function we(e, t, n) {
  e.style[t] = n + "px";
}
function Ft(e, t, n, i) {
  let o = ar.createElement(e);
  return t != null && pt(o, t), n != null && n.insertBefore(o, i), o;
}
function At(e, t) {
  return Ft("div", e, t);
}
const rl = /* @__PURE__ */ new WeakMap();
function Jt(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", r = rl.get(e);
  s != r && (e.style.transform = s, rl.set(e, s), t < 0 || n < 0 || t > i || n > o ? pt(e, Wn) : cr(e, Wn));
}
const al = /* @__PURE__ */ new WeakMap();
function ll(e, t, n) {
  let i = t + n, o = al.get(e);
  i != o && (al.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const cl = /* @__PURE__ */ new WeakMap();
function hl(e, t, n, i) {
  let o = t + "" + n, s = cl.get(e);
  o != s && (cl.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const Mr = { passive: !0 }, Gd = { ...Mr, capture: !0 };
function Vn(e, t, n, i) {
  t.addEventListener(e, n, i ? Gd : Mr);
}
function hr(e, t, n, i) {
  t.removeEventListener(e, n, Mr);
}
Hi && lr();
function Ht(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : mt((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function _c(e) {
  return (n, i, o) => {
    let s = -1, r = -1;
    for (let c = i; c <= o; c++)
      if (e(n[c])) {
        s = c;
        break;
      }
    for (let c = o; c >= i; c--)
      if (e(n[c])) {
        r = c;
        break;
      }
    return [s, r];
  };
}
const vc = (e) => e != null, wc = (e) => e != null && e > 0, ts = _c(vc), Vd = _c(wc);
function Kd(e, t, n, i = 0, o = !1) {
  let s = o ? Vd : ts, r = o ? wc : vc;
  [t, n] = s(e, t, n);
  let c = e[t], h = e[t];
  if (t > -1)
    if (i == 1)
      c = e[t], h = e[n];
    else if (i == -1)
      c = e[n], h = e[t];
    else
      for (let d = t; d <= n; d++) {
        let p = e[d];
        r(p) && (p < c ? c = p : p > h && (h = p));
      }
  return [c ?? pe, h ?? -pe];
}
function ns(e, t, n, i) {
  let o = fl(e), s = fl(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let r = n == 10 ? sn : yc, c = o == 1 ? mt : Tt, h = s == 1 ? Tt : mt, d = c(r(ze(e))), p = h(r(ze(t))), g = Ei(n, d), b = Ei(n, p);
  return n == 10 && (d < 0 && (g = ge(g, -d)), p < 0 && (b = ge(b, -p))), i || n == 2 ? (e = g * o, t = b * s) : (e = Sc(e, g), t = is(t, b)), [e, t];
}
function Pr(e, t, n, i) {
  let o = ns(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const Nr = 0.1, ul = {
  mode: 3,
  pad: Nr
}, ao = {
  pad: 0,
  soft: null,
  mode: 0
}, qd = {
  min: ao,
  max: ao
};
function qo(e, t, n, i) {
  return os(n) ? dl(e, t, n) : (ao.pad = n, ao.soft = i ? 0 : null, ao.mode = i ? 3 : 0, dl(e, t, qd));
}
function le(e, t) {
  return e ?? t;
}
function Yd(e, t, n) {
  for (t = le(t, 0), n = le(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function dl(e, t, n) {
  let i = n.min, o = n.max, s = le(i.pad, 0), r = le(o.pad, 0), c = le(i.hard, -pe), h = le(o.hard, pe), d = le(i.soft, pe), p = le(o.soft, -pe), g = le(i.mode, 0), b = le(o.mode, 0), x = t - e, A = sn(x), z = nt(ze(e), ze(t)), F = sn(z), B = ze(F - A);
  (x < 1e-24 || B > 10) && (x = 0, (e == 0 || t == 0) && (x = 1e-24, g == 2 && d != pe && (s = 0), b == 2 && p != -pe && (r = 0)));
  let $ = x || z || 1e3, j = sn($), T = Ei(10, mt(j)), Q = $ * (x == 0 ? e == 0 ? 0.1 : 1 : s), O = ge(Sc(e - Q, T / 10), 24), X = e >= d && (g == 1 || g == 3 && O <= d || g == 2 && O >= d) ? d : pe, Y = nt(c, O < X && e >= X ? X : Lt(X, O)), ne = $ * (x == 0 ? t == 0 ? 0.1 : 1 : r), q = ge(is(t + ne, T / 10), 24), C = t <= p && (b == 1 || b == 3 && q >= p || b == 2 && q <= p) ? p : -pe, J = Lt(h, q > C && t <= C ? C : nt(C, q));
  return Y == J && Y == 0 && (J = 100), [Y, J];
}
const Zd = new Intl.NumberFormat(Hi ? Wd.language : "en-US"), zr = (e) => Zd.format(e), _t = Math, Io = _t.PI, ze = _t.abs, mt = _t.floor, Ne = _t.round, Tt = _t.ceil, Lt = _t.min, nt = _t.max, Ei = _t.pow, fl = _t.sign, sn = _t.log10, yc = _t.log2, Jd = (e, t = 1) => _t.sinh(e) * t, Zs = (e, t = 1) => _t.asinh(e / t), pe = 1 / 0;
function pl(e) {
  return (sn((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function ur(e, t, n) {
  return Lt(nt(e, t), n);
}
function xc(e) {
  return typeof e == "function";
}
function ie(e) {
  return xc(e) ? e : () => e;
}
const Qd = () => {
}, $c = (e) => e, kc = (e, t) => t, Xd = (e) => null, gl = (e) => !0, ml = (e, t) => e == t, ef = /\.\d*?(?=9{6,}|0{6,})/gm, qn = (e) => {
  if (Tc(e) || Sn.has(e))
    return e;
  const t = `${e}`, n = t.match(ef);
  if (n == null)
    return e;
  let i = n[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${qn(o)}e${s}`;
  }
  return ge(e, i);
};
function Un(e, t) {
  return qn(ge(qn(e / t)) * t);
}
function is(e, t) {
  return qn(Tt(qn(e / t)) * t);
}
function Sc(e, t) {
  return qn(mt(qn(e / t)) * t);
}
function ge(e, t = 0) {
  if (Tc(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Ne(i) / n;
}
const Sn = /* @__PURE__ */ new Map();
function Ac(e) {
  return (("" + e).split(".")[1] || "").length;
}
function go(e, t, n, i) {
  let o = [], s = i.map(Ac);
  for (let r = t; r < n; r++) {
    let c = ze(r), h = ge(Ei(e, r), c);
    for (let d = 0; d < i.length; d++) {
      let p = e == 10 ? +`${i[d]}e${r}` : i[d] * h, g = (r >= 0 ? 0 : c) + (r >= s[d] ? 0 : s[d]), b = e == 10 ? p : ge(p, g);
      o.push(b), Sn.set(b, g);
    }
  }
  return o;
}
const lo = {}, Or = [], Di = [null, null], wn = Array.isArray, Tc = Number.isInteger, tf = (e) => e === void 0;
function bl(e) {
  return typeof e == "string";
}
function os(e) {
  let t = !1;
  if (e != null) {
    let n = e.constructor;
    t = n == null || n == Object;
  }
  return t;
}
function nf(e) {
  return e != null && typeof e == "object";
}
const of = Object.getPrototypeOf(Uint8Array), Cc = "__proto__";
function Mi(e, t = os) {
  let n;
  if (wn(e)) {
    let i = e.find((o) => o != null);
    if (wn(i) || t(i)) {
      n = Array(e.length);
      for (let o = 0; o < e.length; o++)
        n[o] = Mi(e[o], t);
    } else
      n = e.slice();
  } else if (e instanceof of)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != Cc && (n[i] = Mi(e[i], t));
  } else
    n = e;
  return n;
}
function Ee(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != Cc && (os(e[o]) ? Ee(e[o], Mi(i[o])) : e[o] = Mi(i[o]));
  }
  return e;
}
const sf = 0, rf = 1, af = 2;
function lf(e, t, n) {
  for (let i = 0, o, s = -1; i < t.length; i++) {
    let r = t[i];
    if (r > s) {
      for (o = r - 1; o >= 0 && e[o] == null; )
        e[o--] = null;
      for (o = r + 1; o < n && e[o] == null; )
        e[s = o++] = null;
    }
  }
}
function cf(e, t) {
  if (df(e)) {
    let r = e[0].slice();
    for (let c = 1; c < e.length; c++)
      r.push(...e[c].slice(1));
    return ff(r[0]) || (r = uf(r)), r;
  }
  let n = /* @__PURE__ */ new Set();
  for (let r = 0; r < e.length; r++) {
    let h = e[r][0], d = h.length;
    for (let p = 0; p < d; p++)
      n.add(h[p]);
  }
  let i = [Array.from(n).sort((r, c) => r - c)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let r = 0; r < o; r++)
    s.set(i[0][r], r);
  for (let r = 0; r < e.length; r++) {
    let c = e[r], h = c[0];
    for (let d = 1; d < c.length; d++) {
      let p = c[d], g = Array(o).fill(void 0), b = t ? t[r][d] : rf, x = [];
      for (let A = 0; A < p.length; A++) {
        let z = p[A], F = s.get(h[A]);
        z === null ? b != sf && (g[F] = z, b == af && x.push(F)) : g[F] = z;
      }
      lf(g, x, o), i.push(g);
    }
  }
  return i;
}
const hf = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function uf(e) {
  let t = e[0], n = t.length, i = Array(n);
  for (let s = 0; s < i.length; s++)
    i[s] = s;
  i.sort((s, r) => t[s] - t[r]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let r = e[s], c = Array(n);
    for (let h = 0; h < n; h++)
      c[h] = r[i[h]];
    o.push(c);
  }
  return o;
}
function df(e) {
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
function ff(e, t = 100) {
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
  const s = nt(1, mt((o - i + 1) / t));
  for (let r = e[i], c = i + s; c <= o; c += s) {
    const h = e[c];
    if (h != null) {
      if (h <= r)
        return !1;
      r = h;
    }
  }
  return !0;
}
const Ec = [
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
], Dc = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function Mc(e) {
  return e.slice(0, 3);
}
const pf = Dc.map(Mc), gf = Ec.map(Mc), mf = {
  MMMM: Ec,
  MMM: gf,
  WWWW: Dc,
  WWW: pf
};
function Qi(e) {
  return (e < 10 ? "0" : "") + e;
}
function bf(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const _f = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Qi(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Qi(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Qi(e.getHours()),
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
  mm: (e) => Qi(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Qi(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => bf(e.getMilliseconds())
};
function Fr(e, t) {
  t = t || mf;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? _f[o[1]] : o[0]);
  return (s) => {
    let r = "";
    for (let c = 0; c < n.length; c++)
      r += typeof n[c] == "string" ? n[c] : n[c](s, t);
    return r;
  };
}
const vf = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function wf(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == vf ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const Pc = (e) => e % 1 == 0, Yo = [1, 2, 2.5, 5], yf = go(10, -32, 0, Yo), Nc = go(10, 0, 32, Yo), xf = Nc.filter(Pc), Bn = yf.concat(Nc), Hr = `
`, zc = "{YYYY}", _l = Hr + zc, Oc = "{M}/{D}", io = Hr + Oc, Ho = io + "/{YY}", Fc = "{aa}", $f = "{h}:{mm}", ki = $f + Fc, vl = Hr + ki, wl = ":{ss}", ue = null;
function Hc(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, r = o * 365, h = (e == 1 ? go(10, 0, 3, Yo).filter(Pc) : go(10, -3, 0, Yo)).concat([
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
    r,
    r * 2,
    r * 5,
    r * 10,
    r * 25,
    r * 50,
    r * 100
  ]);
  const d = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [r, zc, ue, ue, ue, ue, ue, ue, 1],
    [o * 28, "{MMM}", _l, ue, ue, ue, ue, ue, 1],
    [o, Oc, _l, ue, ue, ue, ue, ue, 1],
    [i, "{h}" + Fc, Ho, ue, io, ue, ue, ue, 1],
    [n, ki, Ho, ue, io, ue, ue, ue, 1],
    [t, wl, Ho + " " + ki, ue, io + " " + ki, ue, vl, ue, 1],
    [e, wl + ".{fff}", Ho + " " + ki, ue, io + " " + ki, ue, vl, ue, 1]
  ];
  function p(g) {
    return (b, x, A, z, F, B) => {
      let $ = [], j = F >= r, T = F >= s && F < r, Q = g(A), O = ge(Q * e, 3), X = Js(Q.getFullYear(), j ? 0 : Q.getMonth(), T || j ? 1 : Q.getDate()), Y = ge(X * e, 3);
      if (T || j) {
        let ne = T ? F / s : 0, q = j ? F / r : 0, C = O == Y ? O : ge(Js(X.getFullYear() + q, X.getMonth() + ne, 1) * e, 3), J = new Date(Ne(C / e)), H = J.getFullYear(), V = J.getMonth();
        for (let U = 0; C <= z; U++) {
          let oe = Js(H + q * U, V + ne * U, 1), I = oe - g(ge(oe * e, 3));
          C = ge((+oe + I) * e, 3), C <= z && $.push(C);
        }
      } else {
        let ne = F >= o ? o : F, q = mt(A) - mt(O), C = Y + q + is(O - Y, ne);
        $.push(C);
        let J = g(C), H = J.getHours() + J.getMinutes() / n + J.getSeconds() / i, V = F / i, U = b.axes[x]._space, oe = B / U;
        for (; C = ge(C + F, e == 1 ? 0 : 3), !(C > z); )
          if (V > 1) {
            let I = mt(ge(H + V, 6)) % 24, se = g(C).getHours() - I;
            se > 1 && (se = -1), C -= se * i, H = (H + V) % 24;
            let de = $[$.length - 1];
            ge((C - de) / F, 3) * oe >= 0.7 && $.push(C);
          } else
            $.push(C);
      }
      return $;
    };
  }
  return [
    h,
    d,
    p
  ];
}
const [kf, Sf, Af] = Hc(1), [Tf, Cf, Ef] = Hc(1e-3);
go(2, -53, 53, [1]);
function yl(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function xl(e, t) {
  return (n, i, o, s, r) => {
    let c = t.find((A) => r >= A[0]) || t[t.length - 1], h, d, p, g, b, x;
    return i.map((A) => {
      let z = e(A), F = z.getFullYear(), B = z.getMonth(), $ = z.getDate(), j = z.getHours(), T = z.getMinutes(), Q = z.getSeconds(), O = F != h && c[2] || B != d && c[3] || $ != p && c[4] || j != g && c[5] || T != b && c[6] || Q != x && c[7] || c[1];
      return h = F, d = B, p = $, g = j, b = T, x = Q, O(z);
    });
  };
}
function Df(e, t) {
  let n = Fr(t);
  return (i, o, s, r, c) => o.map((h) => n(e(h)));
}
function Js(e, t, n) {
  return new Date(e, t, n);
}
function $l(e, t) {
  return t(e);
}
const Mf = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function kl(e, t) {
  return (n, i, o, s) => s == null ? Dr : t(e(i));
}
function Pf(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function Nf(e, t) {
  return e.series[t].fill(e, t);
}
const zf = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Qd,
  markers: {
    show: !0,
    width: 2,
    stroke: Pf,
    fill: Nf,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function Of(e, t) {
  let n = e.cursor.points, i = At(), o = n.size(e, t);
  we(i, to, o), we(i, no, o);
  let s = o / -2;
  we(i, "marginLeft", s), we(i, "marginTop", s);
  let r = n.width(e, t, o);
  return r && we(i, "borderWidth", r), i;
}
function Ff(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function Hf(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function Lf(e, t) {
  return e.series[t].points.size;
}
const Qs = [0, 0];
function Rf(e, t, n) {
  return Qs[0] = t, Qs[1] = n, Qs;
}
function Lo(e, t, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == t) && n(o);
  };
}
function Xs(e, t, n, i = !0) {
  return (o) => {
    (!i || o.target == t) && n(o);
  };
}
const jf = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: Rf,
  points: {
    one: !1,
    show: Of,
    size: Lf,
    width: 0,
    stroke: Hf,
    fill: Ff
  },
  bind: {
    mousedown: Lo,
    mouseup: Lo,
    click: Lo,
    // legend clicks, not .u-over clicks
    dblclick: Lo,
    mousemove: Xs,
    mouseleave: Xs,
    mouseenter: Xs
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
}, Lc = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Lr = Ee({}, Lc, {
  filter: kc
}), Rc = Ee({}, Lr, {
  size: 10
}), jc = Ee({}, Lc, {
  show: !1
}), Rr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Ic = "bold " + Rr, Uc = 1.5, Sl = {
  show: !0,
  scale: "x",
  stroke: Er,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Ic,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Lr,
  ticks: Rc,
  border: jc,
  font: Rr,
  lineGap: Uc,
  rotate: 0
}, If = "Value", Uf = "Time", Al = {
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
function Bf(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : zr(s));
}
function Wf(e, t, n, i, o, s, r) {
  let c = [], h = Sn.get(o) || 0;
  n = r ? n : ge(is(n, o), h);
  for (let d = n; d <= i; d = ge(d + o, h))
    c.push(Object.is(d, -0) ? 0 : d);
  return c;
}
function dr(e, t, n, i, o, s, r) {
  const c = [], h = e.scales[e.axes[t].scale].log, d = h == 10 ? sn : yc, p = mt(d(n));
  o = Ei(h, p), h == 10 && (o = Bn[Ht(o, Bn)]);
  let g = n, b = o * h;
  h == 10 && (b = Bn[Ht(b, Bn)]);
  do
    c.push(g), g = g + o, h == 10 && !Sn.has(g) && (g = ge(g, Sn.get(o))), g >= b && (o = g, b = o * h, h == 10 && (b = Bn[Ht(b, Bn)]));
  while (g <= i);
  return c;
}
function Gf(e, t, n, i, o, s, r) {
  let h = e.scales[e.axes[t].scale].asinh, d = i > h ? dr(e, t, nt(h, n), i, o) : [h], p = i >= 0 && n <= 0 ? [0] : [];
  return (n < -h ? dr(e, t, nt(h, -i), -n, o) : [h]).reverse().map((b) => -b).concat(p, d);
}
const Bc = /./, Vf = /[12357]/, Kf = /[125]/, Tl = /1/, fr = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function qf(e, t, n, i, o) {
  let s = e.axes[n], r = s.scale, c = e.scales[r], h = e.valToPos, d = s._space, p = h(10, r), g = h(9, r) - p >= d ? Bc : h(7, r) - p >= d ? Vf : h(5, r) - p >= d ? Kf : Tl;
  if (g == Tl) {
    let b = ze(h(1, r) - p);
    if (b < d)
      return fr(t.slice().reverse(), c.distr, g, Tt(d / b)).reverse();
  }
  return fr(t, c.distr, g, 1);
}
function Yf(e, t, n, i, o) {
  let s = e.axes[n], r = s.scale, c = s._space, h = e.valToPos, d = ze(h(1, r) - h(2, r));
  return d < c ? fr(t.slice().reverse(), 3, Bc, Tt(c / d)).reverse() : t;
}
function Zf(e, t, n, i) {
  return i == null ? Dr : t == null ? "" : zr(t);
}
const Cl = {
  show: !0,
  scale: "y",
  stroke: Er,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Ic,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Lr,
  ticks: Rc,
  border: jc,
  font: Rr,
  lineGap: Uc,
  rotate: 0
};
function Jf(e, t) {
  let n = 3 + (e || 1) * 2;
  return ge(n * t, 3);
}
function Qf(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), r = e.valToPos(o[i[1]], n, !0), c = ze(r - s), h = e.series[t], d = c / (h.points.space * he);
  return i[1] - i[0] <= d;
}
const El = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, Wc = (e, t, n, i, o) => o, Dl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Wc,
  alpha: 1,
  facets: [
    Ee({}, El, { scale: "x" }),
    Ee({}, El, { scale: "y" })
  ]
}, Ml = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Wc,
  alpha: 1,
  points: {
    show: Qf,
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
function Xf(e, t, n, i, o) {
  return n / 10;
}
const Gc = {
  time: $d,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, ep = Ee({}, Gc, {
  time: !1,
  ori: 1
}), Pl = {};
function Vc(e, t) {
  let n = Pl[e];
  return n || (n = {
    key: e,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, r, c, h, d) {
      for (let p = 0; p < n.plots.length; p++)
        n.plots[p] != o && n.plots[p].pub(i, o, s, r, c, h, d);
    }
  }, e != null && (Pl[e] = n)), n;
}
const Pi = 1, pr = 2;
function Jn(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, r = e.scales, c = e.bbox;
  let h = s[0], d = i == 2 ? s[1] : s[t], p = i == 2 ? r[o.facets[0].scale] : r[e.series[0].scale], g = i == 2 ? r[o.facets[1].scale] : r[o.scale], b = c.left, x = c.top, A = c.width, z = c.height, F = e.valToPosH, B = e.valToPosV;
  return p.ori == 0 ? n(
    o,
    h,
    d,
    p,
    g,
    F,
    B,
    b,
    x,
    A,
    z,
    rs,
    Li,
    ls,
    qc,
    Zc
  ) : n(
    o,
    h,
    d,
    p,
    g,
    B,
    F,
    x,
    b,
    z,
    A,
    as,
    Ri,
    Ur,
    Yc,
    Jc
  );
}
function jr(e, t) {
  let n = 0, i = 0, o = le(e.bands, Or);
  for (let s = 0; s < o.length; s++) {
    let r = o[s];
    r.series[0] == t ? n = r.dir : r.series[1] == t && (r.dir == 1 ? i |= 1 : i |= 2);
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
function tp(e, t, n, i, o) {
  let s = e.mode, r = e.series[t], c = s == 2 ? r.facets[1].scale : r.scale, h = e.scales[c];
  return o == -1 ? h.min : o == 1 ? h.max : h.distr == 3 ? h.dir == 1 ? h.min : h.max : 0;
}
function rn(e, t, n, i, o, s) {
  return Jn(e, t, (r, c, h, d, p, g, b, x, A, z, F) => {
    let B = r.pxRound;
    const $ = d.dir * (d.ori == 0 ? 1 : -1), j = d.ori == 0 ? Li : Ri;
    let T, Q;
    $ == 1 ? (T = n, Q = i) : (T = i, Q = n);
    let O = B(g(c[T], d, z, x)), X = B(b(h[T], p, F, A)), Y = B(g(c[Q], d, z, x)), ne = B(b(s == 1 ? p.max : p.min, p, F, A)), q = new Path2D(o);
    return j(q, Y, ne), j(q, O, ne), j(q, O, X), q;
  });
}
function ss(e, t, n, i, o, s) {
  let r = null;
  if (e.length > 0) {
    r = new Path2D();
    const c = t == 0 ? ls : Ur;
    let h = n;
    for (let g = 0; g < e.length; g++) {
      let b = e[g];
      if (b[1] > b[0]) {
        let x = b[0] - h;
        x > 0 && c(r, h, i, x, i + s), h = b[1];
      }
    }
    let d = n + o - h, p = 10;
    d > 0 && c(r, h, i - p / 2, d, i + s + p);
  }
  return r;
}
function np(e, t, n) {
  let i = e[e.length - 1];
  i && i[0] == t ? i[1] = n : e.push([t, n]);
}
function Ir(e, t, n, i, o, s, r) {
  let c = [], h = e.length;
  for (let d = o == 1 ? n : i; d >= n && d <= i; d += o)
    if (t[d] === null) {
      let g = d, b = d;
      if (o == 1)
        for (; ++d <= i && t[d] === null; )
          b = d;
      else
        for (; --d >= n && t[d] === null; )
          b = d;
      let x = s(e[g]), A = b == g ? x : s(e[b]), z = g - o;
      x = r <= 0 && z >= 0 && z < h ? s(e[z]) : x;
      let B = b + o;
      A = r >= 0 && B >= 0 && B < h ? s(e[B]) : A, A >= x && c.push([x, A]);
    }
  return c;
}
function Nl(e) {
  return e == 0 ? $c : e == 1 ? Ne : (t) => Un(t, e);
}
function Kc(e) {
  let t = e == 0 ? rs : as, n = e == 0 ? (o, s, r, c, h, d) => {
    o.arcTo(s, r, c, h, d);
  } : (o, s, r, c, h, d) => {
    o.arcTo(r, s, h, c, d);
  }, i = e == 0 ? (o, s, r, c, h) => {
    o.rect(s, r, c, h);
  } : (o, s, r, c, h) => {
    o.rect(r, s, h, c);
  };
  return (o, s, r, c, h, d = 0, p = 0) => {
    d == 0 && p == 0 ? i(o, s, r, c, h) : (d = Lt(d, c / 2, h / 2), p = Lt(p, c / 2, h / 2), t(o, s + d, r), n(o, s + c, r, s + c, r + h, d), n(o, s + c, r + h, s, r + h, p), n(o, s, r + h, s, r, p), n(o, s, r, s + c, r, d), o.closePath());
  };
}
const rs = (e, t, n) => {
  e.moveTo(t, n);
}, as = (e, t, n) => {
  e.moveTo(n, t);
}, Li = (e, t, n) => {
  e.lineTo(t, n);
}, Ri = (e, t, n) => {
  e.lineTo(n, t);
}, ls = Kc(0), Ur = Kc(1), qc = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, Yc = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, Zc = (e, t, n, i, o, s, r) => {
  e.bezierCurveTo(t, n, i, o, s, r);
}, Jc = (e, t, n, i, o, s, r) => {
  e.bezierCurveTo(n, t, o, i, r, s);
};
function Qc(e) {
  return (t, n, i, o, s) => Jn(t, n, (r, c, h, d, p, g, b, x, A, z, F) => {
    let { pxRound: B, points: $ } = r, j, T;
    d.ori == 0 ? (j = rs, T = qc) : (j = as, T = Yc);
    const Q = ge($.width * he, 3);
    let O = ($.size - $.width) / 2 * he, X = ge(O * 2, 3), Y = new Path2D(), ne = new Path2D(), { left: q, top: C, width: J, height: H } = t.bbox;
    ls(
      ne,
      q - X,
      C - X,
      J + X * 2,
      H + X * 2
    );
    const V = (U) => {
      if (h[U] != null) {
        let oe = B(g(c[U], d, z, x)), I = B(b(h[U], p, F, A));
        j(Y, oe + O, I), T(Y, oe, I, O, 0, Io * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let U = i; U <= o; U++)
        V(U);
    return {
      stroke: Q > 0 ? Y : null,
      fill: Y,
      clip: ne,
      flags: Pi | pr
    };
  });
}
function Xc(e) {
  return (t, n, i, o, s, r) => {
    i != o && (s != i && r != i && e(t, n, i), s != o && r != o && e(t, n, o), e(t, n, r));
  };
}
const ip = Xc(Li), op = Xc(Ri);
function eh(e) {
  const t = le(e == null ? void 0 : e.alignGaps, 0);
  return (n, i, o, s) => Jn(n, i, (r, c, h, d, p, g, b, x, A, z, F) => {
    [o, s] = ts(h, o, s);
    let B = r.pxRound, $ = (H) => B(g(H, d, z, x)), j = (H) => B(b(H, p, F, A)), T, Q;
    d.ori == 0 ? (T = Li, Q = ip) : (T = Ri, Q = op);
    const O = d.dir * (d.ori == 0 ? 1 : -1), X = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Pi }, Y = X.stroke;
    let ne = !1;
    if (s - o >= z * 4) {
      let H = (L) => n.posToVal(L, d.key, !0), V = null, U = null, oe, I, it, ye = $(c[O == 1 ? o : s]), se = $(c[o]), de = $(c[s]), ee = H(O == 1 ? se + 1 : de - 1);
      for (let L = O == 1 ? o : s; L >= o && L <= s; L += O) {
        let Me = c[L], xe = (O == 1 ? Me < ee : Me > ee) ? ye : $(Me), re = h[L];
        xe == ye ? re != null ? (I = re, V == null ? (T(Y, xe, j(I)), oe = V = U = I) : I < V ? V = I : I > U && (U = I)) : re === null && (ne = !0) : (V != null && Q(Y, ye, j(V), j(U), j(oe), j(I)), re != null ? (I = re, T(Y, xe, j(I)), V = U = oe = I) : (V = U = null, re === null && (ne = !0)), ye = xe, ee = H(ye + O));
      }
      V != null && V != U && it != ye && Q(Y, ye, j(V), j(U), j(oe), j(I));
    } else
      for (let H = O == 1 ? o : s; H >= o && H <= s; H += O) {
        let V = h[H];
        V === null ? ne = !0 : V != null && T(Y, $(c[H]), j(V));
      }
    let [C, J] = jr(n, i);
    if (r.fill != null || C != 0) {
      let H = X.fill = new Path2D(Y), V = r.fillTo(n, i, r.min, r.max, C), U = j(V), oe = $(c[o]), I = $(c[s]);
      O == -1 && ([I, oe] = [oe, I]), T(H, I, U), T(H, oe, U);
    }
    if (!r.spanGaps) {
      let H = [];
      ne && H.push(...Ir(c, h, o, s, O, $, t)), X.gaps = H = r.gaps(n, i, o, s, H), X.clip = ss(H, d.ori, x, A, z, F);
    }
    return J != 0 && (X.band = J == 2 ? [
      rn(n, i, o, s, Y, -1),
      rn(n, i, o, s, Y, 1)
    ] : rn(n, i, o, s, Y, J)), X;
  });
}
function sp(e) {
  const t = le(e.align, 1), n = le(e.ascDesc, !1), i = le(e.alignGaps, 0), o = le(e.extend, !1);
  return (s, r, c, h) => Jn(s, r, (d, p, g, b, x, A, z, F, B, $, j) => {
    [c, h] = ts(g, c, h);
    let T = d.pxRound, { left: Q, width: O } = s.bbox, X = (se) => T(A(se, b, $, F)), Y = (se) => T(z(se, x, j, B)), ne = b.ori == 0 ? Li : Ri;
    const q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Pi }, C = q.stroke, J = b.dir * (b.ori == 0 ? 1 : -1);
    let H = Y(g[J == 1 ? c : h]), V = X(p[J == 1 ? c : h]), U = V, oe = V;
    o && t == -1 && (oe = Q, ne(C, oe, H)), ne(C, V, H);
    for (let se = J == 1 ? c : h; se >= c && se <= h; se += J) {
      let de = g[se];
      if (de == null)
        continue;
      let ee = X(p[se]), L = Y(de);
      t == 1 ? ne(C, ee, H) : ne(C, U, L), ne(C, ee, L), H = L, U = ee;
    }
    let I = U;
    o && t == 1 && (I = Q + O, ne(C, I, H));
    let [it, ye] = jr(s, r);
    if (d.fill != null || it != 0) {
      let se = q.fill = new Path2D(C), de = d.fillTo(s, r, d.min, d.max, it), ee = Y(de);
      ne(se, I, ee), ne(se, oe, ee);
    }
    if (!d.spanGaps) {
      let se = [];
      se.push(...Ir(p, g, c, h, J, X, i));
      let de = d.width * he / 2, ee = n || t == 1 ? de : -de, L = n || t == -1 ? -de : de;
      se.forEach((Me) => {
        Me[0] += ee, Me[1] += L;
      }), q.gaps = se = d.gaps(s, r, c, h, se), q.clip = ss(se, b.ori, F, B, $, j);
    }
    return ye != 0 && (q.band = ye == 2 ? [
      rn(s, r, c, h, C, -1),
      rn(s, r, c, h, C, 1)
    ] : rn(s, r, c, h, C, ye)), q;
  });
}
function zl(e, t, n, i, o, s, r = pe) {
  if (e.length > 1) {
    let c = null;
    for (let h = 0, d = 1 / 0; h < e.length; h++)
      if (t[h] !== void 0) {
        if (c != null) {
          let p = ze(e[h] - e[c]);
          p < d && (d = p, r = ze(n(e[h], i, o, s) - n(e[c], i, o, s)));
        }
        c = h;
      }
  }
  return r;
}
function rp(e) {
  e = e || lo;
  const t = le(e.size, [0.6, pe, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), r = 1 - t[0], c = le(t[1], pe), h = le(t[2], 1), d = le(e.disp, lo), p = le(e.each, (x) => {
  }), { fill: g, stroke: b } = d;
  return (x, A, z, F) => Jn(x, A, (B, $, j, T, Q, O, X, Y, ne, q, C) => {
    let J = B.pxRound, H = n, V = i * he, U = c * he, oe = h * he, I, it;
    T.ori == 0 ? [I, it] = s(x, A) : [it, I] = s(x, A);
    const ye = T.dir * (T.ori == 0 ? 1 : -1);
    let se = T.ori == 0 ? ls : Ur, de = T.ori == 0 ? p : (P, me, Pe, ii, Mn, Gt, Pn) => {
      p(P, me, Pe, Mn, ii, Pn, Gt);
    }, ee = le(x.bands, Or).find((P) => P.series[0] == A), L = ee != null ? ee.dir : 0, Me = B.fillTo(x, A, B.min, B.max, L), Je = J(X(Me, Q, C, ne)), xe, re, Mt, ct = q, ke = J(B.width * he), Wt = !1, en = null, vt = null, fn = null, ei = null;
    g != null && (ke == 0 || b != null) && (Wt = !0, en = g.values(x, A, z, F), vt = /* @__PURE__ */ new Map(), new Set(en).forEach((P) => {
      P != null && vt.set(P, new Path2D());
    }), ke > 0 && (fn = b.values(x, A, z, F), ei = /* @__PURE__ */ new Map(), new Set(fn).forEach((P) => {
      P != null && ei.set(P, new Path2D());
    })));
    let { x0: ti, size: ji } = d;
    if (ti != null && ji != null) {
      H = 1, $ = ti.values(x, A, z, F), ti.unit == 2 && ($ = $.map((Pe) => x.posToVal(Y + Pe * q, T.key, !0)));
      let P = ji.values(x, A, z, F);
      ji.unit == 2 ? re = P[0] * q : re = O(P[0], T, q, Y) - O(0, T, q, Y), ct = zl($, j, O, T, q, Y, ct), Mt = ct - re + V;
    } else
      ct = zl($, j, O, T, q, Y, ct), Mt = ct * r + V, re = ct - Mt;
    Mt < 1 && (Mt = 0), ke >= re / 2 && (ke = 0), Mt < 5 && (J = $c);
    let yo = Mt > 0, En = ct - Mt - (yo ? ke : 0);
    re = J(ur(En, oe, U)), xe = (H == 0 ? re / 2 : H == ye ? 0 : re) - H * ye * ((H == 0 ? V / 2 : 0) + (yo ? ke / 2 : 0));
    const Qe = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, ni = Wt ? null : new Path2D();
    let tn = null;
    if (ee != null)
      tn = x.data[ee.series[1]];
    else {
      let { y0: P, y1: me } = d;
      P != null && me != null && (j = me.values(x, A, z, F), tn = P.values(x, A, z, F));
    }
    let Dn = I * re, Z = it * re;
    for (let P = ye == 1 ? z : F; P >= z && P <= F; P += ye) {
      let me = j[P];
      if (me == null)
        continue;
      if (tn != null) {
        let ot = tn[P] ?? 0;
        if (me - ot == 0)
          continue;
        Je = X(ot, Q, C, ne);
      }
      let Pe = T.distr != 2 || d != null ? $[P] : P, ii = O(Pe, T, q, Y), Mn = X(le(me, Me), Q, C, ne), Gt = J(ii - xe), Pn = J(nt(Mn, Je)), ht = J(Lt(Mn, Je)), wt = Pn - ht;
      if (me != null) {
        let ot = me < 0 ? Z : Dn, Pt = me < 0 ? Dn : Z;
        Wt ? (ke > 0 && fn[P] != null && se(ei.get(fn[P]), Gt, ht + mt(ke / 2), re, nt(0, wt - ke), ot, Pt), en[P] != null && se(vt.get(en[P]), Gt, ht + mt(ke / 2), re, nt(0, wt - ke), ot, Pt)) : se(ni, Gt, ht + mt(ke / 2), re, nt(0, wt - ke), ot, Pt), de(
          x,
          A,
          P,
          Gt - ke / 2,
          ht,
          re + ke,
          wt
        );
      }
    }
    return ke > 0 ? Qe.stroke = Wt ? ei : ni : Wt || (Qe._fill = B.width == 0 ? B._fill : B._stroke ?? B._fill, Qe.width = 0), Qe.fill = Wt ? vt : ni, Qe;
  });
}
function ap(e, t) {
  const n = le(t == null ? void 0 : t.alignGaps, 0);
  return (i, o, s, r) => Jn(i, o, (c, h, d, p, g, b, x, A, z, F, B) => {
    [s, r] = ts(d, s, r);
    let $ = c.pxRound, j = (I) => $(b(I, p, F, A)), T = (I) => $(x(I, g, B, z)), Q, O, X;
    p.ori == 0 ? (Q = rs, X = Li, O = Zc) : (Q = as, X = Ri, O = Jc);
    const Y = p.dir * (p.ori == 0 ? 1 : -1);
    let ne = j(h[Y == 1 ? s : r]), q = ne, C = [], J = [];
    for (let I = Y == 1 ? s : r; I >= s && I <= r; I += Y)
      if (d[I] != null) {
        let ye = h[I], se = j(ye);
        C.push(q = se), J.push(T(d[I]));
      }
    const H = { stroke: e(C, J, Q, X, O, $), fill: null, clip: null, band: null, gaps: null, flags: Pi }, V = H.stroke;
    let [U, oe] = jr(i, o);
    if (c.fill != null || U != 0) {
      let I = H.fill = new Path2D(V), it = c.fillTo(i, o, c.min, c.max, U), ye = T(it);
      X(I, q, ye), X(I, ne, ye);
    }
    if (!c.spanGaps) {
      let I = [];
      I.push(...Ir(h, d, s, r, Y, j, n)), H.gaps = I = c.gaps(i, o, s, r, I), H.clip = ss(I, p.ori, A, z, F, B);
    }
    return oe != 0 && (H.band = oe == 2 ? [
      rn(i, o, s, r, V, -1),
      rn(i, o, s, r, V, 1)
    ] : rn(i, o, s, r, V, oe)), H;
  });
}
function lp(e) {
  return ap(cp, e);
}
function cp(e, t, n, i, o, s) {
  const r = e.length;
  if (r < 2)
    return null;
  const c = new Path2D();
  if (n(c, e[0], t[0]), r == 2)
    i(c, e[1], t[1]);
  else {
    let h = Array(r), d = Array(r - 1), p = Array(r - 1), g = Array(r - 1);
    for (let b = 0; b < r - 1; b++)
      p[b] = t[b + 1] - t[b], g[b] = e[b + 1] - e[b], d[b] = p[b] / g[b];
    h[0] = d[0];
    for (let b = 1; b < r - 1; b++)
      d[b] === 0 || d[b - 1] === 0 || d[b - 1] > 0 != d[b] > 0 ? h[b] = 0 : (h[b] = 3 * (g[b - 1] + g[b]) / ((2 * g[b] + g[b - 1]) / d[b - 1] + (g[b] + 2 * g[b - 1]) / d[b]), isFinite(h[b]) || (h[b] = 0));
    h[r - 1] = d[r - 2];
    for (let b = 0; b < r - 1; b++)
      o(
        c,
        e[b] + g[b] / 3,
        t[b] + h[b] * g[b] / 3,
        e[b + 1] - g[b] / 3,
        t[b + 1] - h[b + 1] * g[b] / 3,
        e[b + 1],
        t[b + 1]
      );
  }
  return c;
}
const gr = /* @__PURE__ */ new Set();
function Ol() {
  for (let e of gr)
    e.syncRect(!0);
}
Hi && (Vn(Ud, Ai, Ol), Vn(Bd, Ai, Ol, !0), Vn(Ko, Ai, () => {
  Be.pxRatio = he;
}));
const hp = eh(), up = Qc();
function Fl(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, r) => mr(s, r, t, n));
}
function dp(e, t) {
  return e.map((n, i) => i == 0 ? {} : Ee({}, t, n));
}
function mr(e, t, n, i) {
  return Ee({}, t == 0 ? n : i, e);
}
function th(e, t, n) {
  return t == null ? Di : [t, n];
}
const fp = th;
function pp(e, t, n) {
  return t == null ? Di : qo(t, n, Nr, !0);
}
function nh(e, t, n, i) {
  return t == null ? Di : ns(t, n, e.scales[i].log, !1);
}
const gp = nh;
function ih(e, t, n, i) {
  return t == null ? Di : Pr(t, n, e.scales[i].log, !1);
}
const mp = ih;
function bp(e, t, n, i, o) {
  let s = nt(pl(e), pl(t)), r = t - e, c = Ht(o / i * r, n);
  do {
    let h = n[c], d = i * h / r;
    if (d >= o && s + (h < 5 ? Sn.get(h) : 0) <= 17)
      return [h, d];
  } while (++c < n.length);
  return [0, 0];
}
function Hl(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Ne((n = +o) * he)) + "px"), [e, t, n];
}
function _p(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let n = ge(t[2] * he, 1);
    t[0] = t[0].replace(/[0-9.]+px/, n + "px"), t[1] = n;
  });
}
function Be(e, t, n) {
  const i = {
    mode: le(e.mode, 1)
  }, o = i.mode;
  function s(a, l, u, f) {
    let m = l.valToPct(a);
    return f + u * (l.dir == -1 ? 1 - m : m);
  }
  function r(a, l, u, f) {
    let m = l.valToPct(a);
    return f + u * (l.dir == -1 ? m : 1 - m);
  }
  function c(a, l, u, f) {
    return l.ori == 0 ? s(a, l, u, f) : r(a, l, u, f);
  }
  i.valToPosH = s, i.valToPosV = r;
  let h = !1;
  i.status = 0;
  const d = i.root = At(kd);
  if (e.id != null && (d.id = e.id), pt(d, e.class), e.title) {
    let a = At(Td, d);
    a.textContent = e.title;
  }
  const p = Ft("canvas"), g = i.ctx = p.getContext("2d"), b = At(Cd, d);
  Vn("click", b, (a) => {
    a.target === A && (be != pi || $e != gi) && qe.click(i, a);
  }, !0);
  const x = i.under = At(Ed, b);
  b.appendChild(p);
  const A = i.over = At(Dd, b);
  e = Mi(e);
  const z = +le(e.pxAlign, 1), F = Nl(z);
  (e.plugins || []).forEach((a) => {
    a.opts && (e = a.opts(i, e) || e);
  });
  const B = e.ms || 1e-3, $ = i.series = o == 1 ? Fl(e.series || [], Al, Ml, !1) : dp(e.series || [null], Dl), j = i.axes = Fl(e.axes || [], Sl, Cl, !0), T = i.scales = {}, Q = i.bands = e.bands || [];
  Q.forEach((a) => {
    a.fill = ie(a.fill || null), a.dir = le(a.dir, -1);
  });
  const O = o == 2 ? $[1].facets[0].scale : $[0].scale, X = {
    axes: yh,
    series: mh
  }, Y = (e.drawOrder || ["axes", "series"]).map((a) => X[a]);
  function ne(a) {
    const l = a.distr == 3 ? (u) => sn(u > 0 ? u : a.clamp(i, u, a.min, a.max, a.key)) : a.distr == 4 ? (u) => Zs(u, a.asinh) : a.distr == 100 ? (u) => a.fwd(u) : (u) => u;
    return (u) => {
      let f = l(u), { _min: m, _max: _ } = a, w = _ - m;
      return (f - m) / w;
    };
  }
  function q(a) {
    let l = T[a];
    if (l == null) {
      let u = (e.scales || lo)[a] || lo;
      if (u.from != null) {
        q(u.from);
        let f = Ee({}, T[u.from], u, { key: a });
        f.valToPct = ne(f), T[a] = f;
      } else {
        l = T[a] = Ee({}, a == O ? Gc : ep, u), l.key = a;
        let f = l.time, m = l.range, _ = wn(m);
        if ((a != O || o == 2 && !f) && (_ && (m[0] == null || m[1] == null) && (m = {
          min: m[0] == null ? ul : {
            mode: 1,
            hard: m[0],
            soft: m[0]
          },
          max: m[1] == null ? ul : {
            mode: 1,
            hard: m[1],
            soft: m[1]
          }
        }, _ = !1), !_ && os(m))) {
          let w = m;
          m = (y, k, E) => k == null ? Di : qo(k, E, w);
        }
        l.range = ie(m || (f ? fp : a == O ? l.distr == 3 ? gp : l.distr == 4 ? mp : th : l.distr == 3 ? nh : l.distr == 4 ? ih : pp)), l.auto = ie(_ ? !1 : l.auto), l.clamp = ie(l.clamp || Xf), l._min = l._max = null, l.valToPct = ne(l);
      }
    }
  }
  q("x"), q("y"), o == 1 && $.forEach((a) => {
    q(a.scale);
  }), j.forEach((a) => {
    q(a.scale);
  });
  for (let a in e.scales)
    q(a);
  const C = T[O], J = C.distr;
  let H, V;
  C.ori == 0 ? (pt(d, Sd), H = s, V = r) : (pt(d, Ad), H = r, V = s);
  const U = {};
  for (let a in T) {
    let l = T[a];
    (l.min != null || l.max != null) && (U[a] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const oe = e.tzDate || ((a) => new Date(Ne(a / B))), I = e.fmtDate || Fr, it = B == 1 ? Af(oe) : Ef(oe), ye = xl(oe, yl(B == 1 ? Sf : Cf, I)), se = kl(oe, $l(Mf, I)), de = [], ee = i.legend = Ee({}, zf, e.legend), L = i.cursor = Ee({}, jf, { drag: { y: o == 2 } }, e.cursor), Me = ee.show, Je = L.show, xe = ee.markers;
  ee.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let re, Mt, ct, ke = [], Wt = [], en, vt = !1, fn = {};
  if (ee.live) {
    const a = $[1] ? $[1].values : null;
    vt = a != null, en = vt ? a(i, 1, 0) : { _: 0 };
    for (let l in en)
      fn[l] = Dr;
  }
  if (Me)
    if (re = Ft("table", Fd, d), ct = Ft("tbody", null, re), ee.mount(i, re), vt) {
      Mt = Ft("thead", null, re, ct);
      let a = Ft("tr", null, Mt);
      Ft("th", null, a);
      for (var ei in en)
        Ft("th", Qa, a).textContent = ei;
    } else
      pt(re, Ld), ee.live && pt(re, Hd);
  const ti = { show: !0 }, ji = { show: !1 };
  function yo(a, l) {
    if (l == 0 && (vt || !ee.live || o == 2))
      return Di;
    let u = [], f = Ft("tr", Rd, ct, ct.childNodes[l]);
    pt(f, a.class), a.show || pt(f, Wn);
    let m = Ft("th", null, f);
    if (xe.show) {
      let y = At(jd, m);
      if (l > 0) {
        let k = xe.width(i, l);
        k && (y.style.border = k + "px " + xe.dash(i, l) + " " + xe.stroke(i, l)), y.style.background = xe.fill(i, l);
      }
    }
    let _ = At(Qa, m);
    a.label instanceof HTMLElement ? _.appendChild(a.label) : _.textContent = a.label, l > 0 && (xe.show || (_.style.color = a.width > 0 ? xe.stroke(i, l) : xe.fill(i, l)), Qe("click", m, (y) => {
      if (L._lock)
        return;
      zn(y);
      let k = $.indexOf(a);
      if ((y.ctrlKey || y.metaKey) != ee.isolate) {
        let E = $.some((M, N) => N > 0 && N != k && M.show);
        $.forEach((M, N) => {
          N > 0 && Kt(N, E ? N == k ? ti : ji : ti, !0, Ce.setSeries);
        });
      } else
        Kt(k, { show: !a.show }, !0, Ce.setSeries);
    }, !1), si && Qe(nl, m, (y) => {
      L._lock || (zn(y), Kt($.indexOf(a), bi, !0, Ce.setSeries));
    }, !1));
    for (var w in en) {
      let y = Ft("td", Id, f);
      y.textContent = "--", u.push(y);
    }
    return [f, u];
  }
  const En = /* @__PURE__ */ new Map();
  function Qe(a, l, u, f = !0) {
    const m = En.get(l) || {}, _ = L.bind[a](i, l, u, f);
    _ && (Vn(a, l, m[a] = _), En.set(l, m));
  }
  function ni(a, l, u) {
    const f = En.get(l) || {};
    for (let m in f)
      (a == null || m == a) && (hr(m, l, f[m]), delete f[m]);
    a == null && En.delete(l);
  }
  let tn = 0, Dn = 0, Z = 0, P = 0, me = 0, Pe = 0, ii = me, Mn = Pe, Gt = Z, Pn = P, ht = 0, wt = 0, ot = 0, Pt = 0;
  i.bbox = {};
  let us = !1, xo = !1, oi = !1, Nn = !1, $o = !1, yt = !1;
  function ds(a, l, u) {
    (u || a != i.width || l != i.height) && Vr(a, l), hi(!1), oi = !0, xo = !0, ui();
  }
  function Vr(a, l) {
    i.width = tn = Z = a, i.height = Dn = P = l, me = Pe = 0, ch(), hh();
    let u = i.bbox;
    ht = u.left = Un(me * he, 0.5), wt = u.top = Un(Pe * he, 0.5), ot = u.width = Un(Z * he, 0.5), Pt = u.height = Un(P * he, 0.5);
  }
  const rh = 3;
  function ah() {
    let a = !1, l = 0;
    for (; !a; ) {
      l++;
      let u = vh(l), f = wh(l);
      a = l == rh || u && f, a || (Vr(i.width, i.height), xo = !0);
    }
  }
  function lh({ width: a, height: l }) {
    ds(a, l);
  }
  i.setSize = lh;
  function ch() {
    let a = !1, l = !1, u = !1, f = !1;
    j.forEach((m, _) => {
      if (m.show && m._show) {
        let { side: w, _size: y } = m, k = w % 2, E = m.label != null ? m.labelSize : 0, M = y + E;
        M > 0 && (k ? (Z -= M, w == 3 ? (me += M, f = !0) : u = !0) : (P -= M, w == 0 ? (Pe += M, a = !0) : l = !0));
      }
    }), On[0] = a, On[1] = u, On[2] = l, On[3] = f, Z -= pn[1] + pn[3], me += pn[3], P -= pn[2] + pn[0], Pe += pn[0];
  }
  function hh() {
    let a = me + Z, l = Pe + P, u = me, f = Pe;
    function m(_, w) {
      switch (_) {
        case 1:
          return a += w, a - w;
        case 2:
          return l += w, l - w;
        case 3:
          return u -= w, u + w;
        case 0:
          return f -= w, f + w;
      }
    }
    j.forEach((_, w) => {
      if (_.show && _._show) {
        let y = _.side;
        _._pos = m(y, _._size), _.label != null && (_._lpos = m(y, _.labelSize));
      }
    });
  }
  if (L.dataIdx == null) {
    let a = L.hover, l = a.skip = new Set(a.skip ?? []);
    l.add(void 0);
    let u = a.prox = ie(a.prox), f = a.bias ??= 0;
    L.dataIdx = (m, _, w, y) => {
      if (_ == 0)
        return w;
      let k = w, E = u(m, _, w, y) ?? pe, M = E >= 0 && E < pe, N = C.ori == 0 ? Z : P, K = L.left, ce = t[0], ae = t[_];
      if (l.has(ae[w])) {
        k = null;
        let te = null, W = null, R;
        if (f == 0 || f == -1)
          for (R = w; te == null && R-- > 0; )
            l.has(ae[R]) || (te = R);
        if (f == 0 || f == 1)
          for (R = w; W == null && R++ < ae.length; )
            l.has(ae[R]) || (W = R);
        if (te != null || W != null)
          if (M) {
            let ve = te == null ? -1 / 0 : H(ce[te], C, N, 0), Se = W == null ? 1 / 0 : H(ce[W], C, N, 0), Ie = K - ve, fe = Se - K;
            Ie <= fe ? Ie <= E && (k = te) : fe <= E && (k = W);
          } else
            k = W == null ? te : te == null ? W : w - te <= W - w ? te : W;
      } else M && ze(K - H(ce[w], C, N, 0)) > E && (k = null);
      return k;
    };
  }
  const zn = (a) => {
    L.event = a;
  };
  L.idxs = de, L._lock = !1;
  let Ye = L.points;
  Ye.show = ie(Ye.show), Ye.size = ie(Ye.size), Ye.stroke = ie(Ye.stroke), Ye.width = ie(Ye.width), Ye.fill = ie(Ye.fill);
  const Vt = i.focus = Ee({}, e.focus || { alpha: 0.3 }, L.focus), si = Vt.prox >= 0, ri = si && Ye.one;
  let xt = [], ai = [], li = [];
  function Kr(a, l) {
    let u = Ye.show(i, l);
    if (u instanceof HTMLElement)
      return pt(u, Od), pt(u, a.class), Jt(u, -10, -10, Z, P), A.insertBefore(u, xt[l]), u;
  }
  function qr(a, l) {
    if (o == 1 || l > 0) {
      let u = o == 1 && T[a.scale].time, f = a.value;
      a.value = u ? bl(f) ? kl(oe, $l(f, I)) : f || se : f || Zf, a.label = a.label || (u ? Uf : If);
    }
    if (ri || l > 0) {
      a.width = a.width == null ? 1 : a.width, a.paths = a.paths || hp || Xd, a.fillTo = ie(a.fillTo || tp), a.pxAlign = +le(a.pxAlign, z), a.pxRound = Nl(a.pxAlign), a.stroke = ie(a.stroke || null), a.fill = ie(a.fill || null), a._stroke = a._fill = a._paths = a._focus = null;
      let u = Jf(nt(1, a.width), 1), f = a.points = Ee({}, {
        size: u,
        width: nt(1, u * 0.2),
        stroke: a.stroke,
        space: u * 2,
        paths: up,
        _stroke: null,
        _fill: null
      }, a.points);
      f.show = ie(f.show), f.filter = ie(f.filter), f.fill = ie(f.fill), f.stroke = ie(f.stroke), f.paths = ie(f.paths), f.pxAlign = a.pxAlign;
    }
    if (Me) {
      let u = yo(a, l);
      ke.splice(l, 0, u[0]), Wt.splice(l, 0, u[1]), ee.values.push(null);
    }
    if (Je) {
      de.splice(l, 0, null);
      let u = null;
      ri ? l == 0 && (u = Kr(a, l)) : l > 0 && (u = Kr(a, l)), xt.splice(l, 0, u), ai.splice(l, 0, 0), li.splice(l, 0, 0);
    }
    je("addSeries", l);
  }
  function uh(a, l) {
    l = l ?? $.length, a = o == 1 ? mr(a, l, Al, Ml) : mr(a, l, {}, Dl), $.splice(l, 0, a), qr($[l], l);
  }
  i.addSeries = uh;
  function dh(a) {
    if ($.splice(a, 1), Me) {
      ee.values.splice(a, 1), Wt.splice(a, 1);
      let l = ke.splice(a, 1)[0];
      ni(null, l.firstChild), l.remove();
    }
    Je && (de.splice(a, 1), xt.splice(a, 1)[0].remove(), ai.splice(a, 1), li.splice(a, 1)), je("delSeries", a);
  }
  i.delSeries = dh;
  const On = [!1, !1, !1, !1];
  function fh(a, l) {
    if (a._show = a.show, a.show) {
      let u = a.side % 2, f = T[a.scale];
      f == null && (a.scale = u ? $[1].scale : O, f = T[a.scale]);
      let m = f.time;
      a.size = ie(a.size), a.space = ie(a.space), a.rotate = ie(a.rotate), wn(a.incrs) && a.incrs.forEach((w) => {
        !Sn.has(w) && Sn.set(w, Ac(w));
      }), a.incrs = ie(a.incrs || (f.distr == 2 ? xf : m ? B == 1 ? kf : Tf : Bn)), a.splits = ie(a.splits || (m && f.distr == 1 ? it : f.distr == 3 ? dr : f.distr == 4 ? Gf : Wf)), a.stroke = ie(a.stroke), a.grid.stroke = ie(a.grid.stroke), a.ticks.stroke = ie(a.ticks.stroke), a.border.stroke = ie(a.border.stroke);
      let _ = a.values;
      a.values = // static array of tick values
      wn(_) && !wn(_[0]) ? ie(_) : (
        // temporal
        m ? (
          // config array of fmtDate string tpls
          wn(_) ? xl(oe, yl(_, I)) : (
            // fmtDate string tpl
            bl(_) ? Df(oe, _) : _ || ye
          )
        ) : _ || Bf
      ), a.filter = ie(a.filter || (f.distr >= 3 && f.log == 10 ? qf : f.distr == 3 && f.log == 2 ? Yf : kc)), a.font = Hl(a.font), a.labelFont = Hl(a.labelFont), a._size = a.size(i, null, l, 0), a._space = a._rotate = a._incrs = a._found = // foundIncrSpace
      a._splits = a._values = null, a._size > 0 && (On[l] = !0, a._el = At(Md, b));
    }
  }
  function Ii(a, l, u, f) {
    let [m, _, w, y] = u, k = l % 2, E = 0;
    return k == 0 && (y || _) && (E = l == 0 && !m || l == 2 && !w ? Ne(Sl.size / 3) : 0), k == 1 && (m || w) && (E = l == 1 && !_ || l == 3 && !y ? Ne(Cl.size / 2) : 0), E;
  }
  const Yr = i.padding = (e.padding || [Ii, Ii, Ii, Ii]).map((a) => ie(le(a, Ii))), pn = i._padding = Yr.map((a, l) => a(i, l, On, 0));
  let Ke, Fe = null, He = null;
  const ko = o == 1 ? $[0].idxs : null;
  let Nt = null, Ui = !1;
  function Zr(a, l) {
    if (t = a ?? [], i.data = i._data = t, o == 2) {
      Ke = 0;
      for (let u = 1; u < $.length; u++)
        Ke += t[u][0].length;
    } else {
      t.length == 0 && (i.data = i._data = t = [[]]), Nt = t[0], Ke = Nt.length;
      let u = t;
      if (J == 2) {
        u = t.slice();
        let f = u[0] = Array(Ke);
        for (let m = 0; m < Ke; m++)
          f[m] = m;
      }
      i._data = t = u;
    }
    if (hi(!0), je("setData"), J == 2 && (oi = !0), l !== !1) {
      let u = C;
      u.auto(i, Ui) ? fs() : mn(O, u.min, u.max), Nn = Nn || L.left >= 0, yt = !0, ui();
    }
  }
  i.setData = Zr;
  function fs() {
    Ui = !0;
    let a, l;
    o == 1 && (Ke > 0 ? (Fe = ko[0] = 0, He = ko[1] = Ke - 1, a = t[0][Fe], l = t[0][He], J == 2 ? (a = Fe, l = He) : a == l && (J == 3 ? [a, l] = ns(a, a, C.log, !1) : J == 4 ? [a, l] = Pr(a, a, C.log, !1) : C.time ? l = a + Ne(86400 / B) : [a, l] = qo(a, l, Nr, !0))) : (Fe = ko[0] = a = null, He = ko[1] = l = null)), mn(O, a, l);
  }
  let So, ci, ps, gs, ms, bs, _s, vs, ws, st;
  function Jr(a, l, u, f, m, _) {
    a ??= el, u ??= Or, f ??= "butt", m ??= el, _ ??= "round", a != So && (g.strokeStyle = So = a), m != ci && (g.fillStyle = ci = m), l != ps && (g.lineWidth = ps = l), _ != ms && (g.lineJoin = ms = _), f != bs && (g.lineCap = bs = f), u != gs && g.setLineDash(gs = u);
  }
  function Qr(a, l, u, f) {
    l != ci && (g.fillStyle = ci = l), a != _s && (g.font = _s = a), u != vs && (g.textAlign = vs = u), f != ws && (g.textBaseline = ws = f);
  }
  function ys(a, l, u, f, m = 0) {
    if (f.length > 0 && a.auto(i, Ui) && (l == null || l.min == null)) {
      let _ = le(Fe, 0), w = le(He, f.length - 1), y = u.min == null ? Kd(f, _, w, m, a.distr == 3) : [u.min, u.max];
      a.min = Lt(a.min, u.min = y[0]), a.max = nt(a.max, u.max = y[1]);
    }
  }
  const Xr = { min: null, max: null };
  function ph() {
    for (let f in T) {
      let m = T[f];
      U[f] == null && // scales that have never been set (on init)
      (m.min == null || // or auto scales when the x scale was explicitly set
      U[O] != null && m.auto(i, Ui)) && (U[f] = Xr);
    }
    for (let f in T) {
      let m = T[f];
      U[f] == null && m.from != null && U[m.from] != null && (U[f] = Xr);
    }
    U[O] != null && hi(!0);
    let a = {};
    for (let f in U) {
      let m = U[f];
      if (m != null) {
        let _ = a[f] = Mi(T[f], nf);
        if (m.min != null)
          Ee(_, m);
        else if (f != O || o == 2)
          if (Ke == 0 && _.from == null) {
            let w = _.range(i, null, null, f);
            _.min = w[0], _.max = w[1];
          } else
            _.min = pe, _.max = -pe;
      }
    }
    if (Ke > 0) {
      $.forEach((f, m) => {
        if (o == 1) {
          let _ = f.scale, w = U[_];
          if (w == null)
            return;
          let y = a[_];
          if (m == 0) {
            let k = y.range(i, y.min, y.max, _);
            y.min = k[0], y.max = k[1], Fe = Ht(y.min, t[0]), He = Ht(y.max, t[0]), He - Fe > 1 && (t[0][Fe] < y.min && Fe++, t[0][He] > y.max && He--), f.min = Nt[Fe], f.max = Nt[He];
          } else f.show && f.auto && ys(y, w, f, t[m], f.sorted);
          f.idxs[0] = Fe, f.idxs[1] = He;
        } else if (m > 0 && f.show && f.auto) {
          let [_, w] = f.facets, y = _.scale, k = w.scale, [E, M] = t[m], N = a[y], K = a[k];
          N != null && ys(N, U[y], _, E, _.sorted), K != null && ys(K, U[k], w, M, w.sorted), f.min = w.min, f.max = w.max;
        }
      });
      for (let f in a) {
        let m = a[f], _ = U[f];
        if (m.from == null && (_ == null || _.min == null)) {
          let w = m.range(
            i,
            m.min == pe ? null : m.min,
            m.max == -pe ? null : m.max,
            f
          );
          m.min = w[0], m.max = w[1];
        }
      }
    }
    for (let f in a) {
      let m = a[f];
      if (m.from != null) {
        let _ = a[m.from];
        if (_.min == null)
          m.min = m.max = null;
        else {
          let w = m.range(i, _.min, _.max, f);
          m.min = w[0], m.max = w[1];
        }
      }
    }
    let l = {}, u = !1;
    for (let f in a) {
      let m = a[f], _ = T[f];
      if (_.min != m.min || _.max != m.max) {
        _.min = m.min, _.max = m.max;
        let w = _.distr;
        _._min = w == 3 ? sn(_.min) : w == 4 ? Zs(_.min, _.asinh) : w == 100 ? _.fwd(_.min) : _.min, _._max = w == 3 ? sn(_.max) : w == 4 ? Zs(_.max, _.asinh) : w == 100 ? _.fwd(_.max) : _.max, l[f] = u = !0;
      }
    }
    if (u) {
      $.forEach((f, m) => {
        o == 2 ? m > 0 && l.y && (f._paths = null) : l[f.scale] && (f._paths = null);
      });
      for (let f in l)
        oi = !0, je("setScale", f);
      Je && L.left >= 0 && (Nn = yt = !0);
    }
    for (let f in U)
      U[f] = null;
  }
  function gh(a) {
    let l = ur(Fe - 1, 0, Ke - 1), u = ur(He + 1, 0, Ke - 1);
    for (; a[l] == null && l > 0; )
      l--;
    for (; a[u] == null && u < Ke - 1; )
      u++;
    return [l, u];
  }
  function mh() {
    if (Ke > 0) {
      let a = $.some((l) => l._focus) && st != Vt.alpha;
      a && (g.globalAlpha = st = Vt.alpha), $.forEach((l, u) => {
        if (u > 0 && l.show && (ea(u, !1), ea(u, !0), l._paths == null)) {
          let f = st;
          st != l.alpha && (g.globalAlpha = st = l.alpha);
          let m = o == 2 ? [0, t[u][0].length - 1] : gh(t[u]);
          l._paths = l.paths(i, u, m[0], m[1]), st != f && (g.globalAlpha = st = f);
        }
      }), $.forEach((l, u) => {
        if (u > 0 && l.show) {
          let f = st;
          st != l.alpha && (g.globalAlpha = st = l.alpha), l._paths != null && ta(u, !1);
          {
            let m = l._paths != null ? l._paths.gaps : null, _ = l.points.show(i, u, Fe, He, m), w = l.points.filter(i, u, _, m);
            (_ || w) && (l.points._paths = l.points.paths(i, u, Fe, He, w), ta(u, !0));
          }
          st != f && (g.globalAlpha = st = f), je("drawSeries", u);
        }
      }), a && (g.globalAlpha = st = 1);
    }
  }
  function ea(a, l) {
    let u = l ? $[a].points : $[a];
    u._stroke = u.stroke(i, a), u._fill = u.fill(i, a);
  }
  function ta(a, l) {
    let u = l ? $[a].points : $[a], {
      stroke: f,
      fill: m,
      clip: _,
      flags: w,
      _stroke: y = u._stroke,
      _fill: k = u._fill,
      _width: E = u.width
    } = u._paths;
    E = ge(E * he, 3);
    let M = null, N = E % 2 / 2;
    l && k == null && (k = E > 0 ? "#fff" : y);
    let K = u.pxAlign == 1 && N > 0;
    if (K && g.translate(N, N), !l) {
      let ce = ht - E / 2, ae = wt - E / 2, te = ot + E, W = Pt + E;
      M = new Path2D(), M.rect(ce, ae, te, W);
    }
    l ? xs(y, E, u.dash, u.cap, k, f, m, w, _) : bh(a, y, E, u.dash, u.cap, k, f, m, w, M, _), K && g.translate(-N, -N);
  }
  function bh(a, l, u, f, m, _, w, y, k, E, M) {
    let N = !1;
    k != 0 && Q.forEach((K, ce) => {
      if (K.series[0] == a) {
        let ae = $[K.series[1]], te = t[K.series[1]], W = (ae._paths || lo).band;
        wn(W) && (W = K.dir == 1 ? W[0] : W[1]);
        let R, ve = null;
        ae.show && W && Yd(te, Fe, He) ? (ve = K.fill(i, ce) || _, R = ae._paths.clip) : W = null, xs(l, u, f, m, ve, w, y, k, E, M, R, W), N = !0;
      }
    }), N || xs(l, u, f, m, _, w, y, k, E, M);
  }
  const na = Pi | pr;
  function xs(a, l, u, f, m, _, w, y, k, E, M, N) {
    Jr(a, l, u, f, m), (k || E || N) && (g.save(), k && g.clip(k), E && g.clip(E)), N ? (y & na) == na ? (g.clip(N), M && g.clip(M), To(m, w), Ao(a, _, l)) : y & pr ? (To(m, w), g.clip(N), Ao(a, _, l)) : y & Pi && (g.save(), g.clip(N), M && g.clip(M), To(m, w), g.restore(), Ao(a, _, l)) : (To(m, w), Ao(a, _, l)), (k || E || N) && g.restore();
  }
  function Ao(a, l, u) {
    u > 0 && (l instanceof Map ? l.forEach((f, m) => {
      g.strokeStyle = So = m, g.stroke(f);
    }) : l != null && a && g.stroke(l));
  }
  function To(a, l) {
    l instanceof Map ? l.forEach((u, f) => {
      g.fillStyle = ci = f, g.fill(u);
    }) : l != null && a && g.fill(l);
  }
  function _h(a, l, u, f) {
    let m = j[a], _;
    if (f <= 0)
      _ = [0, 0];
    else {
      let w = m._space = m.space(i, a, l, u, f), y = m._incrs = m.incrs(i, a, l, u, f, w);
      _ = bp(l, u, y, f, w);
    }
    return m._found = _;
  }
  function $s(a, l, u, f, m, _, w, y, k, E) {
    let M = w % 2 / 2;
    z == 1 && g.translate(M, M), Jr(y, w, k, E, y), g.beginPath();
    let N, K, ce, ae, te = m + (f == 0 || f == 3 ? -_ : _);
    u == 0 ? (K = m, ae = te) : (N = m, ce = te);
    for (let W = 0; W < a.length; W++)
      l[W] != null && (u == 0 ? N = ce = a[W] : K = ae = a[W], g.moveTo(N, K), g.lineTo(ce, ae));
    g.stroke(), z == 1 && g.translate(-M, -M);
  }
  function vh(a) {
    let l = !0;
    return j.forEach((u, f) => {
      if (!u.show)
        return;
      let m = T[u.scale];
      if (m.min == null) {
        u._show && (l = !1, u._show = !1, hi(!1));
        return;
      } else
        u._show || (l = !1, u._show = !0, hi(!1));
      let _ = u.side, w = _ % 2, { min: y, max: k } = m, [E, M] = _h(f, y, k, w == 0 ? Z : P);
      if (M == 0)
        return;
      let N = m.distr == 2, K = u._splits = u.splits(i, f, y, k, E, M, N), ce = m.distr == 2 ? K.map((R) => Nt[R]) : K, ae = m.distr == 2 ? Nt[K[1]] - Nt[K[0]] : E, te = u._values = u.values(i, u.filter(i, ce, f, M, ae), f, M, ae);
      u._rotate = _ == 2 ? u.rotate(i, te, f, M) : 0;
      let W = u._size;
      u._size = Tt(u.size(i, te, f, a)), W != null && u._size != W && (l = !1);
    }), l;
  }
  function wh(a) {
    let l = !0;
    return Yr.forEach((u, f) => {
      let m = u(i, f, On, a);
      m != pn[f] && (l = !1), pn[f] = m;
    }), l;
  }
  function yh() {
    for (let a = 0; a < j.length; a++) {
      let l = j[a];
      if (!l.show || !l._show)
        continue;
      let u = l.side, f = u % 2, m, _, w = l.stroke(i, a), y = u == 0 || u == 3 ? -1 : 1, [k, E] = l._found;
      if (l.label != null) {
        let et = l.labelGap * y, ft = Ne((l._lpos + et) * he);
        Qr(l.labelFont[0], w, "center", u == 2 ? Ji : Xa), g.save(), f == 1 ? (m = _ = 0, g.translate(
          ft,
          Ne(wt + Pt / 2)
        ), g.rotate((u == 3 ? -Io : Io) / 2)) : (m = Ne(ht + ot / 2), _ = ft);
        let Ln = xc(l.label) ? l.label(i, a, k, E) : l.label;
        g.fillText(Ln, m, _), g.restore();
      }
      if (E == 0)
        continue;
      let M = T[l.scale], N = f == 0 ? ot : Pt, K = f == 0 ? ht : wt, ce = l._splits, ae = M.distr == 2 ? ce.map((et) => Nt[et]) : ce, te = M.distr == 2 ? Nt[ce[1]] - Nt[ce[0]] : k, W = l.ticks, R = l.border, ve = W.show ? W.size : 0, Se = Ne(ve * he), Ie = Ne((l.alignTo == 2 ? l._size - ve - l.gap : l.gap) * he), fe = l._rotate * -Io / 180, Ae = F(l._pos * he), ut = (Se + Ie) * y, Xe = Ae + ut;
      _ = f == 0 ? Xe : 0, m = f == 1 ? Xe : 0;
      let $t = l.font[0], zt = l.align == 1 ? xi : l.align == 2 ? Ks : fe > 0 ? xi : fe < 0 ? Ks : f == 0 ? "center" : u == 3 ? Ks : xi, Yt = fe || f == 1 ? "middle" : u == 2 ? Ji : Xa;
      Qr($t, w, zt, Yt);
      let dt = l.font[1] * l.lineGap, kt = ce.map((et) => F(c(et, M, N, K))), Ot = l._values;
      for (let et = 0; et < Ot.length; et++) {
        let ft = Ot[et];
        if (ft != null) {
          f == 0 ? m = kt[et] : _ = kt[et], ft = "" + ft;
          let Ln = ft.indexOf(`
`) == -1 ? [ft] : ft.split(/\n/gm);
          for (let tt = 0; tt < Ln.length; tt++) {
            let ya = Ln[tt];
            fe ? (g.save(), g.translate(m, _ + tt * dt), g.rotate(fe), g.fillText(ya, 0, 0), g.restore()) : g.fillText(ya, m, _ + tt * dt);
          }
        }
      }
      W.show && $s(
        kt,
        W.filter(i, ae, a, E, te),
        f,
        u,
        Ae,
        Se,
        ge(W.width * he, 3),
        W.stroke(i, a),
        W.dash,
        W.cap
      );
      let Zt = l.grid;
      Zt.show && $s(
        kt,
        Zt.filter(i, ae, a, E, te),
        f,
        f == 0 ? 2 : 1,
        f == 0 ? wt : ht,
        f == 0 ? Pt : ot,
        ge(Zt.width * he, 3),
        Zt.stroke(i, a),
        Zt.dash,
        Zt.cap
      ), R.show && $s(
        [Ae],
        [1],
        f == 0 ? 1 : 0,
        f == 0 ? 1 : 2,
        f == 1 ? wt : ht,
        f == 1 ? Pt : ot,
        ge(R.width * he, 3),
        R.stroke(i, a),
        R.dash,
        R.cap
      );
    }
    je("drawAxes");
  }
  function hi(a) {
    $.forEach((l, u) => {
      u > 0 && (l._paths = null, a && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((f) => {
        f.min = null, f.max = null;
      })));
    });
  }
  let Co = !1, ks = !1, Bi = [];
  function xh() {
    ks = !1;
    for (let a = 0; a < Bi.length; a++)
      je(...Bi[a]);
    Bi.length = 0;
  }
  function ui() {
    Co || (hf(ia), Co = !0);
  }
  function $h(a, l = !1) {
    Co = !0, ks = l, a(i), ia(), l && Bi.length > 0 && queueMicrotask(xh);
  }
  i.batch = $h;
  function ia() {
    if (us && (ph(), us = !1), oi && (ah(), oi = !1), xo) {
      if (we(x, xi, me), we(x, Ji, Pe), we(x, to, Z), we(x, no, P), we(A, xi, me), we(A, Ji, Pe), we(A, to, Z), we(A, no, P), we(b, to, tn), we(b, no, Dn), p.width = Ne(tn * he), p.height = Ne(Dn * he), j.forEach(({ _el: a, _show: l, _size: u, _pos: f, side: m }) => {
        if (a != null)
          if (l) {
            let _ = m === 3 || m === 0 ? u : 0, w = m % 2 == 1;
            we(a, w ? "left" : "top", f - _), we(a, w ? "width" : "height", u), we(a, w ? "top" : "left", w ? Pe : me), we(a, w ? "height" : "width", w ? P : Z), cr(a, Wn);
          } else
            pt(a, Wn);
      }), So = ci = ps = ms = bs = _s = vs = ws = gs = null, st = 1, Vi(!0), me != ii || Pe != Mn || Z != Gt || P != Pn) {
        hi(!1);
        let a = Z / Gt, l = P / Pn;
        if (Je && !Nn && L.left >= 0) {
          L.left *= a, L.top *= l, di && Jt(di, Ne(L.left), 0, Z, P), fi && Jt(fi, 0, Ne(L.top), Z, P);
          for (let u = 0; u < xt.length; u++) {
            let f = xt[u];
            f != null && (ai[u] *= a, li[u] *= l, Jt(f, Tt(ai[u]), Tt(li[u]), Z, P));
          }
        }
        if (_e.show && !$o && _e.left >= 0 && _e.width > 0) {
          _e.left *= a, _e.width *= a, _e.top *= l, _e.height *= l;
          for (let u in Ds)
            we(mi, u, _e[u]);
        }
        ii = me, Mn = Pe, Gt = Z, Pn = P;
      }
      je("setSize"), xo = !1;
    }
    tn > 0 && Dn > 0 && (g.clearRect(0, 0, p.width, p.height), je("drawClear"), Y.forEach((a) => a()), je("draw")), _e.show && $o && (Eo(_e), $o = !1), Je && Nn && (Hn(null, !0, !1), Nn = !1), ee.show && ee.live && yt && (Cs(), yt = !1), h || (h = !0, i.status = 1, je("ready")), Ui = !1, Co = !1;
  }
  i.redraw = (a, l) => {
    oi = l || !1, a !== !1 ? mn(O, C.min, C.max) : ui();
  };
  function Ss(a, l) {
    let u = T[a];
    if (u.from == null) {
      if (Ke == 0) {
        let f = u.range(i, l.min, l.max, a);
        l.min = f[0], l.max = f[1];
      }
      if (l.min > l.max) {
        let f = l.min;
        l.min = l.max, l.max = f;
      }
      if (Ke > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      a == O && u.distr == 2 && Ke > 0 && (l.min = Ht(l.min, t[0]), l.max = Ht(l.max, t[0]), l.min == l.max && l.max++), U[a] = l, us = !0, ui();
    }
  }
  i.setScale = Ss;
  let As, Ts, di, fi, oa, sa, pi, gi, ra, aa, be, $e, gn = !1;
  const qe = L.drag;
  let Le = qe.x, Re = qe.y;
  Je && (L.x && (As = At(Nd, A)), L.y && (Ts = At(zd, A)), C.ori == 0 ? (di = As, fi = Ts) : (di = Ts, fi = As), be = L.left, $e = L.top);
  const _e = i.select = Ee({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), mi = _e.show ? At(Pd, _e.over ? A : x) : null;
  function Eo(a, l) {
    if (_e.show) {
      for (let u in a)
        _e[u] = a[u], u in Ds && we(mi, u, a[u]);
      l !== !1 && je("setSelect");
    }
  }
  i.setSelect = Eo;
  function kh(a) {
    if ($[a].show)
      Me && cr(ke[a], Wn);
    else if (Me && pt(ke[a], Wn), Je) {
      let u = ri ? xt[0] : xt[a];
      u != null && Jt(u, -10, -10, Z, P);
    }
  }
  function mn(a, l, u) {
    Ss(a, { min: l, max: u });
  }
  function Kt(a, l, u, f) {
    l.focus != null && Eh(a), l.show != null && $.forEach((m, _) => {
      _ > 0 && (a == _ || a == null) && (m.show = l.show, kh(_), o == 2 ? (mn(m.facets[0].scale, null, null), mn(m.facets[1].scale, null, null)) : mn(m.scale, null, null), ui());
    }), u !== !1 && je("setSeries", a, l), f && Ki("setSeries", i, a, l);
  }
  i.setSeries = Kt;
  function Sh(a, l) {
    Ee(Q[a], l);
  }
  function Ah(a, l) {
    a.fill = ie(a.fill || null), a.dir = le(a.dir, -1), l = l ?? Q.length, Q.splice(l, 0, a);
  }
  function Th(a) {
    a == null ? Q.length = 0 : Q.splice(a, 1);
  }
  i.addBand = Ah, i.setBand = Sh, i.delBand = Th;
  function Ch(a, l) {
    $[a].alpha = l, Je && xt[a] != null && (xt[a].style.opacity = l), Me && ke[a] && (ke[a].style.opacity = l);
  }
  let nn, bn, Fn;
  const bi = { focus: !0 };
  function Eh(a) {
    if (a != Fn) {
      let l = a == null, u = Vt.alpha != 1;
      $.forEach((f, m) => {
        if (o == 1 || m > 0) {
          let _ = l || m == 0 || m == a;
          f._focus = l ? null : _, u && Ch(m, _ ? 1 : Vt.alpha);
        }
      }), Fn = a, u && ui();
    }
  }
  Me && si && Qe(il, re, (a) => {
    L._lock || (zn(a), Fn != null && Kt(null, bi, !0, Ce.setSeries));
  });
  function qt(a, l, u) {
    let f = T[l];
    u && (a = a / he - (f.ori == 1 ? Pe : me));
    let m = Z;
    f.ori == 1 && (m = P, a = m - a), f.dir == -1 && (a = m - a);
    let _ = f._min, w = f._max, y = a / m, k = _ + (w - _) * y, E = f.distr;
    return E == 3 ? Ei(10, k) : E == 4 ? Jd(k, f.asinh) : E == 100 ? f.bwd(k) : k;
  }
  function Dh(a, l) {
    let u = qt(a, O, l);
    return Ht(u, t[0], Fe, He);
  }
  i.valToIdx = (a) => Ht(a, t[0]), i.posToIdx = Dh, i.posToVal = qt, i.valToPos = (a, l, u) => T[l].ori == 0 ? s(
    a,
    T[l],
    u ? ot : Z,
    u ? ht : 0
  ) : r(
    a,
    T[l],
    u ? Pt : P,
    u ? wt : 0
  ), i.setCursor = (a, l, u) => {
    be = a.left, $e = a.top, Hn(null, l, u);
  };
  function la(a, l) {
    we(mi, xi, _e.left = a), we(mi, to, _e.width = l);
  }
  function ca(a, l) {
    we(mi, Ji, _e.top = a), we(mi, no, _e.height = l);
  }
  let Wi = C.ori == 0 ? la : ca, Gi = C.ori == 1 ? la : ca;
  function Mh() {
    if (Me && ee.live)
      for (let a = o == 2 ? 1 : 0; a < $.length; a++) {
        if (a == 0 && vt)
          continue;
        let l = ee.values[a], u = 0;
        for (let f in l)
          Wt[a][u++].firstChild.nodeValue = l[f];
      }
  }
  function Cs(a, l) {
    if (a != null && (a.idxs ? a.idxs.forEach((u, f) => {
      de[f] = u;
    }) : tf(a.idx) || de.fill(a.idx), ee.idx = de[0]), Me && ee.live) {
      for (let u = 0; u < $.length; u++)
        (u > 0 || o == 1 && !vt) && Ph(u, de[u]);
      Mh();
    }
    yt = !1, l !== !1 && je("setLegend");
  }
  i.setLegend = Cs;
  function Ph(a, l) {
    let u = $[a], f = a == 0 && J == 2 ? Nt : t[a], m;
    vt ? m = u.values(i, a, l) ?? fn : (m = u.value(i, l == null ? null : f[l], a, l), m = m == null ? fn : { _: m }), ee.values[a] = m;
  }
  function Hn(a, l, u) {
    ra = be, aa = $e, [be, $e] = L.move(i, be, $e), L.left = be, L.top = $e, Je && (di && Jt(di, Ne(be), 0, Z, P), fi && Jt(fi, 0, Ne($e), Z, P));
    let f, m = Fe > He;
    nn = pe, bn = null;
    let _ = C.ori == 0 ? Z : P, w = C.ori == 1 ? Z : P;
    if (be < 0 || Ke == 0 || m) {
      f = L.idx = null;
      for (let y = 0; y < $.length; y++) {
        let k = xt[y];
        k != null && Jt(k, -10, -10, Z, P);
      }
      si && Kt(null, bi, !0, a == null && Ce.setSeries), ee.live && (de.fill(f), yt = !0);
    } else {
      let y, k, E;
      o == 1 && (y = C.ori == 0 ? be : $e, k = qt(y, O), f = L.idx = Ht(k, t[0], Fe, He), E = H(t[0][f], C, _, 0));
      let M = -10, N = -10, K = 0, ce = 0, ae = !0, te = "", W = "";
      for (let R = o == 2 ? 1 : 0; R < $.length; R++) {
        let ve = $[R], Se = de[R], Ie = Se == null ? null : o == 1 ? t[R][Se] : t[R][1][Se], fe = L.dataIdx(i, R, f, k), Ae = fe == null ? null : o == 1 ? t[R][fe] : t[R][1][fe];
        if (yt = yt || Ae != Ie || fe != Se, de[R] = fe, R > 0 && ve.show) {
          let ut = fe == null ? -10 : fe == f ? E : H(o == 1 ? t[0][fe] : t[R][0][fe], C, _, 0), Xe = Ae == null ? -10 : V(Ae, o == 1 ? T[ve.scale] : T[ve.facets[1].scale], w, 0);
          if (si && Ae != null) {
            let $t = C.ori == 1 ? be : $e, zt = ze(Vt.dist(i, R, fe, Xe, $t));
            if (zt < nn) {
              let Yt = Vt.bias;
              if (Yt != 0) {
                let dt = qt($t, ve.scale), kt = Ae >= 0 ? 1 : -1, Ot = dt >= 0 ? 1 : -1;
                Ot == kt && (Ot == 1 ? Yt == 1 ? Ae >= dt : Ae <= dt : (
                  // >= 0
                  Yt == 1 ? Ae <= dt : Ae >= dt
                )) && (nn = zt, bn = R);
              } else
                nn = zt, bn = R;
            }
          }
          if (yt || ri) {
            let $t, zt;
            C.ori == 0 ? ($t = ut, zt = Xe) : ($t = Xe, zt = ut);
            let Yt, dt, kt, Ot, Zt, et, ft = !0, Ln = Ye.bbox;
            if (Ln != null) {
              ft = !1;
              let tt = Ln(i, R);
              kt = tt.left, Ot = tt.top, Yt = tt.width, dt = tt.height;
            } else
              kt = $t, Ot = zt, Yt = dt = Ye.size(i, R);
            if (et = Ye.fill(i, R), Zt = Ye.stroke(i, R), ri)
              R == bn && nn <= Vt.prox && (M = kt, N = Ot, K = Yt, ce = dt, ae = ft, te = et, W = Zt);
            else {
              let tt = xt[R];
              tt != null && (ai[R] = kt, li[R] = Ot, hl(tt, Yt, dt, ft), ll(tt, et, Zt), Jt(tt, Tt(kt), Tt(Ot), Z, P));
            }
          }
        }
      }
      if (ri) {
        let R = Vt.prox, ve = Fn == null ? nn <= R : nn > R || bn != Fn;
        if (yt || ve) {
          let Se = xt[0];
          Se != null && (ai[0] = M, li[0] = N, hl(Se, K, ce, ae), ll(Se, te, W), Jt(Se, Tt(M), Tt(N), Z, P));
        }
      }
    }
    if (_e.show && gn)
      if (a != null) {
        let [y, k] = Ce.scales, [E, M] = Ce.match, [N, K] = a.cursor.sync.scales, ce = a.cursor.drag;
        if (Le = ce._x, Re = ce._y, Le || Re) {
          let { left: ae, top: te, width: W, height: R } = a.select, ve = a.scales[N].ori, Se = a.posToVal, Ie, fe, Ae, ut, Xe, $t = y != null && E(y, N), zt = k != null && M(k, K);
          $t && Le ? (ve == 0 ? (Ie = ae, fe = W) : (Ie = te, fe = R), Ae = T[y], ut = H(Se(Ie, N), Ae, _, 0), Xe = H(Se(Ie + fe, N), Ae, _, 0), Wi(Lt(ut, Xe), ze(Xe - ut))) : Wi(0, _), zt && Re ? (ve == 1 ? (Ie = ae, fe = W) : (Ie = te, fe = R), Ae = T[k], ut = V(Se(Ie, K), Ae, w, 0), Xe = V(Se(Ie + fe, K), Ae, w, 0), Gi(Lt(ut, Xe), ze(Xe - ut))) : Gi(0, w);
        } else
          Ms();
      } else {
        let y = ze(ra - oa), k = ze(aa - sa);
        if (C.ori == 1) {
          let K = y;
          y = k, k = K;
        }
        Le = qe.x && y >= qe.dist, Re = qe.y && k >= qe.dist;
        let E = qe.uni;
        E != null ? Le && Re && (Le = y >= E, Re = k >= E, !Le && !Re && (k > y ? Re = !0 : Le = !0)) : qe.x && qe.y && (Le || Re) && (Le = Re = !0);
        let M, N;
        Le && (C.ori == 0 ? (M = pi, N = be) : (M = gi, N = $e), Wi(Lt(M, N), ze(N - M)), Re || Gi(0, w)), Re && (C.ori == 1 ? (M = pi, N = be) : (M = gi, N = $e), Gi(Lt(M, N), ze(N - M)), Le || Wi(0, _)), !Le && !Re && (Wi(0, 0), Gi(0, 0));
      }
    if (qe._x = Le, qe._y = Re, a == null) {
      if (u) {
        if (wa != null) {
          let [y, k] = Ce.scales;
          Ce.values[0] = y != null ? qt(C.ori == 0 ? be : $e, y) : null, Ce.values[1] = k != null ? qt(C.ori == 1 ? be : $e, k) : null;
        }
        Ki(qs, i, be, $e, Z, P, f);
      }
      if (si) {
        let y = u && Ce.setSeries, k = Vt.prox;
        Fn == null ? nn <= k && Kt(bn, bi, !0, y) : nn > k ? Kt(null, bi, !0, y) : bn != Fn && Kt(bn, bi, !0, y);
      }
    }
    yt && (ee.idx = f, Cs()), l !== !1 && je("setCursor");
  }
  let _n = null;
  Object.defineProperty(i, "rect", {
    get() {
      return _n == null && Vi(!1), _n;
    }
  });
  function Vi(a = !1) {
    a ? _n = null : (_n = A.getBoundingClientRect(), je("syncRect", _n));
  }
  function ha(a, l, u, f, m, _, w) {
    L._lock || gn && a != null && a.movementX == 0 && a.movementY == 0 || (Es(a, l, u, f, m, _, w, !1, a != null), a != null ? Hn(null, !0, !0) : Hn(l, !0, !1));
  }
  function Es(a, l, u, f, m, _, w, y, k) {
    if (_n == null && Vi(!1), zn(a), a != null)
      u = a.clientX - _n.left, f = a.clientY - _n.top;
    else {
      if (u < 0 || f < 0) {
        be = -10, $e = -10;
        return;
      }
      let [E, M] = Ce.scales, N = l.cursor.sync, [K, ce] = N.values, [ae, te] = N.scales, [W, R] = Ce.match, ve = l.axes[0].side % 2 == 1, Se = C.ori == 0 ? Z : P, Ie = C.ori == 1 ? Z : P, fe = ve ? _ : m, Ae = ve ? m : _, ut = ve ? f : u, Xe = ve ? u : f;
      if (ae != null ? u = W(E, ae) ? c(K, T[E], Se, 0) : -10 : u = Se * (ut / fe), te != null ? f = R(M, te) ? c(ce, T[M], Ie, 0) : -10 : f = Ie * (Xe / Ae), C.ori == 1) {
        let $t = u;
        u = f, f = $t;
      }
    }
    k && (l == null || l.cursor.event.type == qs) && ((u <= 1 || u >= Z - 1) && (u = Un(u, Z)), (f <= 1 || f >= P - 1) && (f = Un(f, P))), y ? (oa = u, sa = f, [pi, gi] = L.move(i, u, f)) : (be = u, $e = f);
  }
  const Ds = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Ms() {
    Eo(Ds, !1);
  }
  let ua, da, fa, pa;
  function ga(a, l, u, f, m, _, w) {
    gn = !0, Le = Re = qe._x = qe._y = !1, Es(a, l, u, f, m, _, w, !0, !1), a != null && (Qe(Ys, ar, ma, !1), Ki(tl, i, pi, gi, Z, P, null));
    let { left: y, top: k, width: E, height: M } = _e;
    ua = y, da = k, fa = E, pa = M;
  }
  function ma(a, l, u, f, m, _, w) {
    gn = qe._x = qe._y = !1, Es(a, l, u, f, m, _, w, !1, !0);
    let { left: y, top: k, width: E, height: M } = _e, N = E > 0 || M > 0, K = ua != y || da != k || fa != E || pa != M;
    if (N && K && Eo(_e), qe.setScale && N && K) {
      let ce = y, ae = E, te = k, W = M;
      if (C.ori == 1 && (ce = k, ae = M, te = y, W = E), Le && mn(
        O,
        qt(ce, O),
        qt(ce + ae, O)
      ), Re)
        for (let R in T) {
          let ve = T[R];
          R != O && ve.from == null && ve.min != pe && mn(
            R,
            qt(te + W, R),
            qt(te, R)
          );
        }
      Ms();
    } else L.lock && (L._lock = !L._lock, Hn(l, !0, a != null));
    a != null && (ni(Ys, ar), Ki(Ys, i, be, $e, Z, P, null));
  }
  function Nh(a, l, u, f, m, _, w) {
    if (L._lock)
      return;
    zn(a);
    let y = gn;
    if (gn) {
      let k = !0, E = !0, M = 10, N, K;
      C.ori == 0 ? (N = Le, K = Re) : (N = Re, K = Le), N && K && (k = be <= M || be >= Z - M, E = $e <= M || $e >= P - M), N && k && (be = be < pi ? 0 : Z), K && E && ($e = $e < gi ? 0 : P), Hn(null, !0, !0), gn = !1;
    }
    be = -10, $e = -10, de.fill(null), Hn(null, !0, !0), y && (gn = y);
  }
  function ba(a, l, u, f, m, _, w) {
    L._lock || (zn(a), fs(), Ms(), a != null && Ki(ol, i, be, $e, Z, P, null));
  }
  function _a() {
    j.forEach(_p), ds(i.width, i.height, !0);
  }
  Vn(Ko, Ai, _a);
  const _i = {};
  _i.mousedown = ga, _i.mousemove = ha, _i.mouseup = ma, _i.dblclick = ba, _i.setSeries = (a, l, u, f) => {
    let m = Ce.match[2];
    u = m(i, l, u), u != -1 && Kt(u, f, !0, !1);
  }, Je && (Qe(tl, A, ga), Qe(qs, A, ha), Qe(nl, A, (a) => {
    zn(a), Vi(!1);
  }), Qe(il, A, Nh), Qe(ol, A, ba), gr.add(i), i.syncRect = Vi);
  const Do = i.hooks = e.hooks || {};
  function je(a, l, u) {
    ks ? Bi.push([a, l, u]) : a in Do && Do[a].forEach((f) => {
      f.call(null, i, l, u);
    });
  }
  (e.plugins || []).forEach((a) => {
    for (let l in a.hooks)
      Do[l] = (Do[l] || []).concat(a.hooks[l]);
  });
  const va = (a, l, u) => u, Ce = Ee({
    key: null,
    setSeries: !1,
    filters: {
      pub: gl,
      sub: gl
    },
    scales: [O, $[1] ? $[1].scale : null],
    match: [ml, ml, va],
    values: [null, null]
  }, L.sync);
  Ce.match.length == 2 && Ce.match.push(va), L.sync = Ce;
  const wa = Ce.key, Ps = Vc(wa);
  function Ki(a, l, u, f, m, _, w) {
    Ce.filters.pub(a, l, u, f, m, _, w) && Ps.pub(a, l, u, f, m, _, w);
  }
  Ps.sub(i);
  function zh(a, l, u, f, m, _, w) {
    Ce.filters.sub(a, l, u, f, m, _, w) && _i[a](null, l, u, f, m, _, w);
  }
  i.pub = zh;
  function Oh() {
    Ps.unsub(i), gr.delete(i), En.clear(), hr(Ko, Ai, _a), d.remove(), re == null || re.remove(), je("destroy");
  }
  i.destroy = Oh;
  function Ns() {
    je("init", e, t), Zr(t || e.data, !1), U[O] ? Ss(O, U[O]) : fs(), $o = _e.show && (_e.width > 0 || _e.height > 0), Nn = yt = !0, ds(e.width, e.height);
  }
  return $.forEach(qr), j.forEach(fh), n ? n instanceof HTMLElement ? (n.appendChild(d), Ns()) : n(i, Ns) : Ns(), i;
}
Be.assign = Ee;
Be.fmtNum = zr;
Be.rangeNum = qo;
Be.rangeLog = ns;
Be.rangeAsinh = Pr;
Be.orient = Jn;
Be.pxRatio = he;
Be.join = cf;
Be.fmtDate = Fr, Be.tzDate = wf;
Be.sync = Vc;
{
  Be.addGap = np, Be.clipGaps = ss;
  let e = Be.paths = {
    points: Qc
  };
  e.linear = eh, e.stepped = sp, e.bars = rp, e.spline = lp;
}
const vp = 24;
async function wp(e, t, n, i) {
  const o = new Date(Date.now() - n * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (r) => {
      const c = r.states ?? {};
      if (Object.keys(c).length === 0) {
        Object.keys(s).length > 0 && i(s);
        return;
      }
      const h = (Date.now() - n * 60 * 60 * 1e3) / 1e3;
      for (const [d, p] of Object.entries(c)) {
        const g = s[d] ?? [];
        s[d] = yp([...g, ...p], h);
      }
      i(s);
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
function yp(e, t) {
  const n = [...e].sort((r, c) => r.lu - c.lu), i = n.filter((r) => r.lu >= t), o = n.filter((r) => r.lu < t), s = o[o.length - 1];
  return s && (i.length === 0 || i[0].lu > t) && i.unshift({ ...s, lu: t }), i;
}
function Xi(e) {
  if (!e) return [];
  const t = [];
  for (const n of e) {
    const i = parseFloat(n.s);
    Number.isFinite(i) && t.push([n.lu, i]);
  }
  return t.sort((n, i) => n[0] - i[0]), t;
}
function xp(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const s of e) for (const [r] of s) n.add(r);
  if (n.size === 0)
    return [[t], ...e.map(() => [null])];
  const i = [...n].sort((s, r) => s - r), o = e.map((s) => {
    let r = -1, c = null;
    return i.map((h) => {
      for (; r + 1 < s.length && s[r + 1][0] <= h; )
        r++, c = s[r][1];
      return c;
    });
  });
  return [i, ...o];
}
const $p = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;-webkit-user-select:none;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var kp = Object.defineProperty, cs = (e, t, n, i) => {
  for (var o = void 0, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = r(t, n, o) || o);
  return o && kp(t, n, o), o;
};
const Sp = [
  Ve,
  Zo($p),
  De`
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
    /* Spaced on its words' side, in right-to-left too (#101). */
    .legend .swatch {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 2px;
      vertical-align: middle;
      margin-inline-end: 4px;
    }
    /* Forced colours (a Windows contrast theme) give every swatch the
       page's colour but leave the chart's canvas alone, so the legend no
       longer said which line was which (#90). The swatches keep their
       colours there, as the lines do, each ringed in the text colour so it
       shows against the page whatever its colour. The ring is a shadow,
       which takes no room. */
    @media (forced-colors: active) {
      .legend .swatch {
        forced-color-adjust: none;
        box-shadow: 0 0 0 1px CanvasText;
      }
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
], Ll = () => {
}, Gr = class Gr extends Te {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
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
    this._resizeObserver = new ResizeObserver((n) => {
      var o;
      const i = ((o = n[0]) == null ? void 0 : o.contentRect.width) ?? 0;
      this._plot && i > 0 && this._plot.setSize({ width: i, height: t });
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
  _resolveColor(t, n) {
    return getComputedStyle(this).getPropertyValue(t).trim() || n;
  }
  _destroyPlot() {
    this._plot && (this._plot.destroy(), this._plot = null), this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null);
  }
};
Gr.styles = Sp;
let An = Gr;
cs([
  G()
], An.prototype, "_loading");
cs([
  G()
], An.prototype, "_error");
cs([
  G()
], An.prototype, "_empty");
cs([
  zi(".chart-host")
], An.prototype, "_host");
var Ap = Object.defineProperty, Tp = Object.getOwnPropertyDescriptor, Dt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Tp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Ap(t, n, o), o;
};
const br = 260, oh = [
  { hours: 6, label: "6 h", words: "6 hours" },
  { hours: 24, label: "24 h", words: "24 hours" },
  { hours: 168, label: "7 d", words: "7 days" }
], er = 6, tr = 3, Cp = 3;
let lt = class extends An {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._data = null, this._stripColors = { heating: "", cooling: "" }, this._hours = vp, this._switching = !1, this._cursorIdx = null, this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return br;
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
    (e.has("roomEntity") || e.has("lowEntity") || e.has("highEntity") || e.has("actionEntity") || e.has("apparentEntity") || e.has("humidityEntity") || e.has("_hours")) && (e.has("_hours") || (this._switching = !1), this._subscribe());
  }
  async _subscribe() {
    if (!this.hass || !this.roomEntity) return;
    this._unsubscribe && this._unsubscribe !== Ll && this._unsubscribe(), this._unsubscribe = Ll;
    const e = Cp + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
    this._plot && this._plot.series.length !== 1 + e && this._destroyPlot();
    const t = ++this._fetchGen;
    this._plot || (this._switching = !1), this._switching || (this._loading = !0), this._error = null, this._empty = !1;
    const n = [
      this.roomEntity,
      this.lowEntity,
      this.highEntity,
      this.actionEntity,
      this.apparentEntity,
      this.humidityEntity
    ].filter((i) => !!i);
    this._cursorIdx = null;
    try {
      const i = await wp(this.hass, n, this._hours, (o) => {
        t === this._fetchGen && (this._renderPlot(o), this._loading = !1, this._switching = !1);
      });
      if (t !== this._fetchGen) {
        i();
        return;
      }
      this._unsubscribe = i;
    } catch (i) {
      if (t !== this._fetchGen) return;
      this._error = i instanceof Error ? i.message : "Failed to load history.", this._loading = !1, this._data = null, this._destroyPlot();
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
    const n = new Set(this._hiddenLabels), i = n.has(e);
    i ? n.delete(e) : n.add(e), this._hiddenLabels = n, this._plot && this._plot.setSeries(t, { show: i });
  }
  /** Keyboard equivalent of click — Enter or Space activates the toggle.
   *  Matches WAI-ARIA "button" pattern for keyboard accessibility. */
  _onLabelKeyDown(e, t) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._toggleLabel(t));
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. A run of
   *  the same action reported again is one interval (#34: drawn as one).
   *  The one in force now runs on (its end Infinity): the readout's "Now"
   *  is in it, and the strip draws it to the plot's edge. */
  _actionIntervals(e) {
    var i;
    if (!e) return [];
    const t = [...e].sort((o, s) => o.lu - s.lu), n = [];
    for (let o = 0; o < t.length; o++) {
      const s = t[o].lu, r = ((i = t[o + 1]) == null ? void 0 : i.lu) ?? 1 / 0, c = t[o].s;
      if (c === "heating" || c === "cooling") {
        const h = n[n.length - 1];
        h && h.action === c && h.end === s ? h.end = r : n.push({ start: s, end: r, action: c });
      }
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), n = Xi(e[this.roomEntity]), i = Xi(e[this.lowEntity]), o = Xi(e[this.highEntity]), s = this._hasApparent ? Xi(e[this.apparentEntity]) : [], r = this._hasHumidity ? Xi(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity]), n.length === 0 && i.length === 0 && o.length === 0 && s.length === 0 && r.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._data = null, this._empty = !0;
      return;
    }
    this._empty = !1;
    const c = [n, i, o];
    this._hasApparent && c.push(s), this._hasHumidity && c.push(r);
    const h = [
      ...this._intervals.flatMap((b) => [b.start, b.end]).filter((b) => Number.isFinite(b)),
      t
    ].map((b) => [b, 0]), p = xp([...c, h], t).slice(0, -1);
    this._data = p, this.requestUpdate();
    const g = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: g.width, height: g.height }), this._plot.setData(p), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Be(g, p, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = this._resolveColor("--cb-action-heating", "#d9603f"), n = this._resolveColor("--cb-action-cooling", "#2f7fcc"), i = this._resolveColor("--primary-color", "#03a9f4"), o = this._resolveColor("--secondary-text-color", "#727272"), s = this._resolveColor("--divider-color", "#e0e0e0"), r = this._resolveColor("--primary-text-color", "#212121");
    this._stripColors = {
      heating: Il(t, r, 0.3),
      cooling: Il(n, r, 0.3)
    };
    const c = [
      {},
      {
        label: "Room",
        stroke: i,
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
        stroke: n,
        width: 1.5,
        dash: [6, 3],
        spanGaps: !0,
        show: !this._hiddenLabels.has("High band")
      }
    ];
    this._hasApparent && c.push({
      label: "Apparent",
      stroke: i,
      width: 1.5,
      dash: [4, 3],
      spanGaps: !0,
      show: !this._hiddenLabels.has("Apparent")
    }), this._hasHumidity && c.push({
      label: "Humidity",
      scale: "y2",
      stroke: o,
      width: 1.2,
      spanGaps: !0,
      show: !this._hiddenLabels.has("Humidity")
    });
    const h = [
      {
        stroke: o,
        grid: { stroke: s },
        ticks: { show: !1 },
        gap: tr * 2 + er + 2,
        size: 50 + tr * 2 + er,
        values: (p, g) => Np(g, (p.scales.x.max ?? 0) - (p.scales.x.min ?? 0), this.hass)
      },
      // The temperature axis's numbers as uPlot writes them, to whatever
      // step it takes (#34 review: a unit after them, rounded, got steps
      // like 0.025 wrong twice, so they're as on main).
      {
        stroke: o,
        grid: { stroke: s },
        size: jl
      }
    ];
    this._hasHumidity && h.push({
      scale: "y2",
      side: 1,
      size: jl,
      stroke: o,
      grid: { show: !1 },
      values: (p, g) => g.map((b) => `${b.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: br,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: d,
      axes: h,
      series: c,
      hooks: {
        // Heating and cooling as a strip under the plot, clear of the
        // lines (#34): short cycles read as ticks, not stripes across it.
        draw: [
          (p) => {
            const g = p.ctx;
            if (!g) return;
            const b = Be.pxRatio || 1, x = Math.round(p.bbox.top + p.bbox.height + tr * b), A = Math.round(er * b), z = Pp(
              this._intervals,
              (F) => p.valToPos(F, "x", !0),
              p.bbox.left,
              p.bbox.left + p.bbox.width
            );
            g.save();
            for (const F of z)
              g.fillStyle = this._stripColors[F.action], g.fillRect(F.x, x, F.w, A);
            g.restore();
          }
        ],
        // The readout follows the pointer, or a tap (#34).
        setCursor: [
          (p) => {
            this._cursorIdx = p.cursor.idx ?? null;
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return v`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = Rl(this._hours), n = [
      "Room temperature",
      this._hasApparent ? ", feels like" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      ` and heating/cooling — last ${t}`
    ].join("");
    return v`
      <div class="ranges" role="group" aria-label="Show the last">
        ${oh.map(
      (i) => v`<button
              type="button"
              aria-label=${i.words}
              aria-pressed=${this._hours === i.hours ? "true" : "false"}
              @click=${() => this._pickRange(i.hours)}
            >
              ${i.label}
            </button>`
    )}
      </div>
      <div class="readout">${e ? S : this._readout()}</div>
      ${this._loading ? v`<div class="status">Loading ${t} of history…</div>` : S}
      ${this._error ? v`<div class="status">${this._error}</div>` : S}
      ${this._empty ? v`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : S}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${n}></div>
      ${e ? S : this._renderLegend()}
    `;
  }
  /** Shows the last `hours` (#34): a new subscription for that window. */
  _pickRange(e) {
    e !== this._hours && (this._switching = !0, this._hours = e);
  }
  /** The readout line (#34): the time and each shown series' value at the
   *  pointer's point, or now's (the last point is now: "Now"), and heating
   *  or cooling then. */
  _readout() {
    if (this._switching) return `Loading ${Rl(this._hours)} of history…`;
    const e = this._data, t = e == null ? void 0 : e[0];
    if (!e || !t || t.length === 0) return "";
    const n = this._cursorIdx !== null && this._cursorIdx < t.length - 1 ? this._cursorIdx : null, i = t[n ?? t.length - 1], o = (s) => {
      var h;
      if (this._hiddenLabels.has(s)) return null;
      const r = this._seriesIndexForLabel(s), c = r < 0 ? null : ((h = e[r]) == null ? void 0 : h[n ?? t.length - 1]) ?? null;
      return typeof c == "number" && Number.isFinite(c) ? c : null;
    };
    return Ep({
      when: n === null ? "Now" : Dp(i * 1e3, Date.now(), this.hass),
      room: o("Room"),
      apparent: o("Apparent"),
      low: o("Low band"),
      high: o("High band"),
      humidity: o("Humidity"),
      action: Mp(this._intervals, i)
    });
  }
  /** Custom legend with per-series toggles (v0.8.3+). Each line-series
   *  swatch is a button — click / Enter / Space flips that series'
   *  `_hiddenLabels` membership, uPlot's setSeries hides / shows the
   *  line immediately, and the toggle's visual reflects the new state.
   *  Heating / Cooling (the strip, #34) are non-interactive in v0.8.3
   *  because they live in a `draw` hook rather than as uPlot series;
   *  toggling them needs a different code path. Marked with
   *  `aria-pressed="false"` only on the toggleable items so screen
   *  readers don't announce the strip's swatches as buttons. */
  _renderLegend() {
    return v`<div class="legend">
      ${this._toggleItem(
      "Room",
      v`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      v`<span class="swatch dashed" style="color:var(--primary-color)"></span>`,
      "Feels like"
    ) : S}
      ${this._toggleItem(
      "Low band",
      v`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      v`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      v`<span class="swatch" style="background:var(--cb-text-secondary)"></span>`,
      "Humidity (%, right axis)"
    ) : S}
      <span
        ><span
          class="swatch"
          style="background:${this._stripColors.heating || "var(--cb-action-heating)"}"
        ></span>
        Heating</span
      >
      <span
        ><span
          class="swatch"
          style="background:${this._stripColors.cooling || "var(--cb-action-cooling)"}"
        ></span>
        Cooling</span
      >
    </div>`;
  }
  /** Build a single clickable legend item. `label` is the canonical
   *  series label used both for display and for `_seriesIndexForLabel`
   *  / `_hiddenLabels` lookups; `displayText` lets callers override the
   *  visible string (Humidity's "(%, right axis)" suffix doesn't belong
   *  in the toggle key). */
  _toggleItem(e, t, n) {
    const i = this._hiddenLabels.has(e);
    return v`<span
      class="toggle ${i ? "hidden" : ""}"
      role="button"
      tabindex="0"
      aria-pressed=${i ? "true" : "false"}
      @click=${() => this._toggleLabel(e)}
      @keydown=${(o) => this._onLabelKeyDown(o, e)}
      >${t}${n ?? e}</span
    >`;
  }
};
lt.styles = [
  ...An.styles,
  De`
      .chart-host {
        height: ${Zo(br)}px;
      }
      .ranges {
        display: flex;
        justify-content: flex-end;
        gap: var(--cb-gap-xs);
      }
      .ranges button {
        font: inherit;
        font-size: 12px;
        min-width: 44px;
        min-height: 44px;
        padding: 0 12px;
        border-radius: 16px;
        border: 1px solid var(--cb-track-bg);
        background: transparent;
        color: var(--cb-text-secondary);
        cursor: pointer;
      }
      .ranges button[aria-pressed='true'] {
        background: var(--cb-track-bg);
        border-color: var(--cb-text-secondary);
        color: var(--cb-text-primary);
        font-weight: 500;
      }
      .ranges button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      /* Forced colours (a Windows contrast theme) give every range button
         the same border and background, so only the weight would mark the
         one on show, and some fonts have no weight between. The theme's
         selection colours fill it there (#73): a fill shows at any zoom,
         where a thicker border can round to the others' width, and nothing
         changes size. Left to forced colours, its words would sit on a
         plate of the page's colour, so it takes every colour itself, all
         the theme's: its focus ring Highlight, as forced colours make the
         others'. */
      @media (forced-colors: active) {
        .ranges button[aria-pressed='true'] {
          forced-color-adjust: none;
          background: Highlight;
          border-color: Highlight;
          color: HighlightText;
          outline-color: Highlight;
        }
      }
      /* Two lines' height whatever its words take, so the chart under it
         doesn't move as the pointer does (#34). */
      .readout {
        font-size: 12px;
        line-height: 1.35;
        min-height: 2.7em;
        padding: var(--cb-gap-xs) 0;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
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
      /* With the toggles 44px tall (#3), their own height spaces the rows;
         a gap as well would only make the legend taller. */
      .legend {
        row-gap: 0;
        align-items: center;
      }
      /* v0.8.3: clickable legend toggles. Pointer cursor signals
         interactivity; no underline on hover (the legend isn't a
         link). Hidden state dims the whole item and strikes the
         label so it's obvious which series the user has muted.
         WCAG 2.5.5: 44px tall and at least as wide (#3). */
      .legend .toggle {
        display: inline-flex;
        align-items: center;
        min-width: 44px;
        min-height: 44px;
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
Dt([
  D({ attribute: !1 })
], lt.prototype, "hass", 2);
Dt([
  D({ type: String })
], lt.prototype, "roomEntity", 2);
Dt([
  D({ type: String })
], lt.prototype, "lowEntity", 2);
Dt([
  D({ type: String })
], lt.prototype, "highEntity", 2);
Dt([
  D({ type: String })
], lt.prototype, "actionEntity", 2);
Dt([
  D({ type: String })
], lt.prototype, "apparentEntity", 2);
Dt([
  D({ type: String })
], lt.prototype, "humidityEntity", 2);
Dt([
  G()
], lt.prototype, "_hours", 2);
Dt([
  G()
], lt.prototype, "_switching", 2);
Dt([
  G()
], lt.prototype, "_cursorIdx", 2);
Dt([
  G()
], lt.prototype, "_hiddenLabels", 2);
lt = Dt([
  Ge("comfort-band-history-chart")
], lt);
function Rl(e) {
  var t;
  return ((t = oh.find((n) => n.hours === e)) == null ? void 0 : t.words) ?? `${e} hours`;
}
function Ep(e) {
  const t = [e.when];
  return e.room !== null && t.push(`Room ${rt(e.room)}°`), e.apparent !== null && t.push(`Feels like ${rt(e.apparent)}°`), e.low !== null && e.high !== null ? t.push(`Range ${Ct({ low: e.low, high: e.high })}`) : e.low !== null ? t.push(`Low ${rt(e.low)}°`) : e.high !== null && t.push(`High ${rt(e.high)}°`), e.humidity !== null && t.push(`Humidity ${Math.round(e.humidity)}%`), e.action && t.push(e.action === "heating" ? "Heating" : "Cooling"), t.join(" · ");
}
function Dp(e, t, n) {
  const i = $n(e, n), o = new Date(e), s = (h) => new Date(h.getFullYear(), h.getMonth(), h.getDate()).getTime(), r = Math.round((s(new Date(t)) - s(o)) / 864e5);
  if (r === 0) return i;
  const c = sh(n).format(o);
  return r >= 7 ? `${c} ${o.getDate()} ${i}` : `${c} ${i}`;
}
function jl(e, t, n, i) {
  var r;
  const o = e.axes[n];
  if (i > 1 && o._size !== void 0) return o._size;
  let s = (((r = o.ticks) == null ? void 0 : r.size) ?? 10) + (o.gap ?? 5);
  if (t && t.length > 0 && e.ctx) {
    const c = e.ctx;
    o.font && (c.font = o.font[0]);
    const h = Math.max(...t.map((d) => c.measureText(d).width));
    s += h / (Be.pxRatio || 1);
  }
  return Math.ceil(s) + 2;
}
function sh(e) {
  var n;
  const t = (n = e == null ? void 0 : e.locale) == null ? void 0 : n.language;
  return new Intl.DateTimeFormat(t != null && t.startsWith("en") ? t : "en", { weekday: "short" });
}
function Mp(e, t) {
  var n;
  return ((n = e.find((i) => i.start <= t && t < i.end)) == null ? void 0 : n.action) ?? null;
}
function Pp(e, t, n, i) {
  const o = [];
  for (const s of e) {
    const r = Math.max(n, t(s.start)), c = Math.min(i, t(s.end));
    if (c < r || c === r && (r <= n || c >= i)) continue;
    const h = Math.round(r);
    o.push({ x: h, w: Math.max(1, Math.round(c) - h), action: s.action });
  }
  return o;
}
function Np(e, t, n) {
  const i = sh(n), o = { format: (r) => `${i.format(r)} ${r.getDate()}` }, s = t > 36 * 3600;
  return e.map((r) => {
    const c = new Date(r * 1e3), h = $n(r * 1e3, n);
    if (c.getHours() !== 0 || c.getMinutes() !== 0) return h;
    const d = o.format(c);
    return s ? d : `${h}
${d}`;
  });
}
function Il(e, t, n) {
  const i = Ul(e), o = Ul(t);
  if (!i || !o) return e.trim();
  const s = i.map((r, c) => Math.round(r + (o[c] - r) * n));
  return `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
}
function Ul(e) {
  const t = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);
  if (n) {
    let o = n[1];
    return o.length === 3 && (o = o.replace(/(.)/g, "$1$1")), [parseInt(o.slice(0, 2), 16), parseInt(o.slice(2, 4), 16), parseInt(o.slice(4, 6), 16)];
  }
  const i = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(t);
  return i ? [Number(i[1]), Number(i[2]), Number(i[3])] : null;
}
var zp = Object.defineProperty, Op = Object.getOwnPropertyDescriptor, Br = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Op(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && zp(t, n, o), o;
};
let mo = class extends Te {
  render() {
    var s, r, c, h, d;
    const e = (s = this.entities) == null ? void 0 : s.roomTemperature;
    if (!e)
      return v`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = (r = this.entities) == null ? void 0 : r.apparentTemperature, n = ac(this.hass, e), i = t ?? "", o = t && n ? n : "";
    return v`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${((c = this.entities) == null ? void 0 : c.effectiveLow) ?? ""}
        .highEntity=${((h = this.entities) == null ? void 0 : h.effectiveHigh) ?? ""}
        .actionEntity=${((d = this.entities) == null ? void 0 : d.currentAction) ?? ""}
        .apparentEntity=${i}
        .humidityEntity=${o}
      ></comfort-band-history-chart>
      ${this._renderOverlayHint(t, n)}
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
    return e ? t ? S : v`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : v`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
mo.styles = [
  Ve,
  De`
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
Br([
  D({ attribute: !1 })
], mo.prototype, "hass", 2);
Br([
  D({ attribute: !1 })
], mo.prototype, "entities", 2);
mo = Br([
  Ge("comfort-band-insights-tab")
], mo);
var Fp = Object.defineProperty, Hp = Object.getOwnPropertyDescriptor, wo = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Hp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Fp(t, n, o), o;
};
function Lp(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Bl(e, t) {
  return `${e} ${t}${e === 1 ? "" : "s"}`;
}
const nr = 10, Rp = {
  too_cold: "Too cool",
  just_right: "Just right",
  too_hot: "Too warm"
}, jp = {
  wls: "Fitted",
  cached: "Earlier",
  previous: "Run before",
  rejected: "Set aside",
  none: "—"
};
let Yn = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._feedback = { kind: "loading" }, this._fetchedFor = null;
  }
  willUpdate(e) {
    super.willUpdate(e), this.hass && this.zone && this._fetchedFor !== this.zone && (this._fetchedFor = this.zone, this._feedback = { kind: "loading" }, this._load(this.zone));
  }
  async _load(e) {
    try {
      const t = await this.hass.callWS({
        type: "comfort_band/get_feedback",
        zone: e
      });
      if (this._fetchedFor !== e) return;
      const n = Array.isArray(t == null ? void 0 : t.entries) ? t.entries : [];
      this._feedback = { kind: "ready", entries: n };
    } catch (t) {
      if (this._fetchedFor !== e) return;
      const n = typeof t == "object" && t !== null ? t.code : void 0;
      this._feedback = { kind: n === "unknown_command" ? "old" : "error" };
    }
  }
  render() {
    if (!this.hass || !this.entities) return S;
    const e = hc(this.hass, this.entities), t = dc(this.hass, this.entities);
    return v`
      <h3>Heating and cooling</h3>
      ${this._renderDeciding(e)}
      <h3>What it has learned</h3>
      ${t === "unavailable" ? v`<div class="note">What it has learned can’t be read right now.</div>` : t ? this._renderRates(t) : v`<div class="note">
              What it has learned needs the <code>comfort_band</code> integration v0.6.0 or later,
              with its entities turned on.
            </div>`}
      <h3>Feedback</h3>
      <div role="status">${this._renderFeedback()}</div>
    `;
  }
  _row(e, t, n = "", i = "") {
    return v`<div class="row" data-diag=${i || S}>
      <div class="row-label">
        <div class="title">${e}</div>
        ${n ? v`<div class="desc">${n}</div>` : S}
      </div>
      <div class="value">${t}</div>
    </div>`;
  }
  _renderDeciding(e) {
    const t = this.entities, n = e.paused === !0 ? this._row(
      "Paused",
      "",
      "“Control this room” is off, so nothing is sent to the unit. Below is what it would do.",
      "paused"
    ) : e.paused === null ? this._row(
      "Control this room",
      "Can’t tell",
      "Whether it’s paused can’t be read.",
      "paused"
    ) : S;
    if (e.noReading)
      return v`${n}
      ${this._row(
        "On hold",
        "",
        "There’s no room reading, so nothing is decided until there is.",
        "on-hold"
      )}`;
    const i = {
      "stand-in": "While a stand-in sensor is in use.",
      peak: "While a peak is on.",
      "learning-off": "Learning is off.",
      "no-learning": "This version of the integration has no learning.",
      "not-ready": "Predictive control is on, but not ready to plan yet."
    }, o = (s) => s ? zu[s] : "Can’t tell";
    return v`
      ${n}
      ${this._row(
      "Deciding now",
      e.controller ? cc[e.controller] : "Can’t tell",
      e.controller ? e.reason ? i[e.reason] : "" : "Some of what decides it can’t be read.",
      "controller"
    )}
      ${this._row("Its decision", o(e.decision), "", "decision")}
      ${typeof t.predictedAction == "string" ? this._row("Learning would", o(e.learning), "", "learning") : S}
      ${typeof t.mpcAction == "string" || typeof t.mpcReady == "string" ? this._row(
      "Predictive control would",
      e.predictive === "not-ready" ? "Not ready yet" : o(e.predictive),
      "",
      "predictive"
    ) : S}
    `;
  }
  _renderRates(e) {
    const t = (i) => i === null ? "—" : `${i > 0 ? "+" : i < 0 ? "−" : ""}${Math.abs(i).toFixed(2)}`, n = (i) => i.method !== "cached" && i.method !== "previous";
    return v`
      ${this._row("On its own", e.idle.value, e.idle.source, "idle")}
      ${this._row("Heating", e.heat.value, e.heat.source, "heat")}
      ${this._row("Cooling", e.cool.value, e.cool.source, "cool")}
      <details class="more">
        <summary>Details</summary>
        <div class="table-wrap" tabindex="0" role="region" aria-label="The rates in numbers">
          <table>
            <thead>
              <tr>
                <td></td>
                <th scope="col">°C an hour</th>
                <th scope="col">Readings</th>
                <th scope="col">Spread</th>
                <th scope="col">How</th>
              </tr>
            </thead>
            <tbody>
              ${e.details.map(
      (i) => v`<tr>
                    <th scope="row">${i.name}</th>
                    <td>${t(i.perHour)}</td>
                    <td>${n(i) && i.samples !== null ? i.samples : "—"}</td>
                    <td>${n(i) && i.spread !== null ? `${i.spread.toFixed(2)}°` : "—"}</td>
                    <td>${i.method ? jp[i.method] ?? i.method : "—"}</td>
                  </tr>`
    )}
            </tbody>
          </table>
        </div>
        <div class="note">
          ${e.windowMinutes !== null && e.sampleCount !== null ? `Learning keeps ${Bl(e.sampleCount, "reading")}, spanning ${Bl(Math.round(e.windowMinutes), "minute")}.` : ""}
          ${e.updated !== null ? `The newest is from ${fo(e.updated, Date.now(), this.hass)}.` : ""}
        </div>
      </details>
    `;
  }
  _renderFeedback() {
    const e = this._feedback;
    if (e.kind === "loading") return v`<div class="note">Loading…</div>`;
    if (e.kind === "old")
      return v`<div class="note">
        Feedback needs the <code>comfort_band</code> integration v0.11.0 or later.
      </div>`;
    if (e.kind === "error")
      return v`<div class="note">Feedback can’t be loaded right now.</div>`;
    if (e.entries.length === 0)
      return v`<div class="note">
        None yet. Taps on “How does it feel?” on the Now tab show here.
      </div>`;
    const t = Date.now(), n = e.entries.slice(-nr).reverse();
    return v`
      <ul>
        ${n.map((i) => this._renderEntry(i, t))}
      </ul>
      ${e.entries.length > nr ? v`<div class="note">The last ${nr} of ${e.entries.length}.</div>` : S}
    `;
  }
  _renderEntry(e, t) {
    const n = Date.parse(e.timestamp), i = Ct({ low: e.low, high: e.high }), o = typeof e.room_temp == "number" ? `${rt(e.room_temp)}°, range ${i}` : `no reading, range ${i}`, s = [
      e.room_source === "fallback_sensor" || e.room_source === "climate" ? "stand-in reading" : "",
      e.peak_state === "active" ? "during a peak" : e.peak_state === "preconditioning" ? "ahead of a peak" : ""
    ].filter(Boolean);
    return v`<li>
      <span class="said">${Rp[e.label] ?? e.label}</span>
      <div class="detail">
        ${Lp(
      [Number.isFinite(n) ? fo(n, t, this.hass) : "", o, ...s].filter(Boolean).join(" · ")
    )}
      </div>
    </li>`;
  }
};
Yn.styles = [
  Ve,
  De`
      :host {
        display: block;
      }
      h3 {
        margin: var(--cb-gap-md) 0 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
      }
      h3:first-child {
        margin-top: 0;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 4px var(--cb-gap-md);
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .row-label {
        flex: 1 1 12em;
        min-width: 0;
      }
      .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .desc,
      .note {
        overflow-wrap: anywhere;
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.35;
        color: var(--cb-text-secondary);
      }
      .value {
        margin-inline-start: auto;
        max-width: 100%;
        overflow-wrap: anywhere;
        font-size: 14px;
        color: var(--cb-text-primary);
        text-align: end;
      }
      details.more {
        margin-top: var(--cb-gap-sm);
      }
      details.more > summary {
        display: flex;
        align-items: center;
        min-height: 44px;
        list-style: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      details.more > summary::-webkit-details-marker {
        display: none;
      }
      /* Spaced on its words' side, and closed, pointing towards them, in
         right-to-left too (#108). */
      details.more > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin-block: 0;
        margin-inline: 2px 8px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.more:not([open]) > summary:dir(rtl)::before {
        transform: rotate(135deg);
      }
      details.more[open] > summary::before {
        transform: rotate(45deg);
      }
      details.more > summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      /* The raw numbers scroll sideways in their own box rather than
         widening the dialog. */
      .table-wrap {
        overflow-x: auto;
      }
      .table-wrap:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      table {
        border-collapse: collapse;
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        color: var(--cb-text-primary);
      }
      th,
      td {
        padding: 4px 5px;
        text-align: end;
        white-space: nowrap;
      }
      th:first-child,
      td:first-child {
        padding-inline-start: 0;
        text-align: start;
      }
      thead th {
        font-weight: 500;
        color: var(--cb-text-secondary);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      li .said {
        font-weight: 500;
      }
      li .detail {
        margin-top: 2px;
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `
];
wo([
  D({ attribute: !1 })
], Yn.prototype, "hass", 2);
wo([
  D({ type: String })
], Yn.prototype, "zone", 2);
wo([
  D({ attribute: !1 })
], Yn.prototype, "entities", 2);
wo([
  G()
], Yn.prototype, "_feedback", 2);
Yn = wo([
  Ge("comfort-band-diagnostics-tab")
], Yn);
var Ip = Object.defineProperty, Up = Object.getOwnPropertyDescriptor, un = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Up(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Ip(t, n, o), o;
};
let jt = class extends Te {
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
    var i;
    const t = (i = this._track) == null ? void 0 : i.getBoundingClientRect();
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
    return v`
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
          @pointerdown=${(n) => this._onThumbPointerDown(n, "low")}
          @keydown=${(n) => this._onKeyDown(n, "low")}
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
          @pointerdown=${(n) => this._onThumbPointerDown(n, "high")}
          @keydown=${(n) => this._onKeyDown(n, "high")}
        ></div>
      </div>
      <div class="readout" aria-hidden="true">${this._fmt(this.low)} – ${this._fmt(this.high)}</div>
    `;
  }
};
jt.styles = [
  Ve,
  De`
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
un([
  D({ type: Number })
], jt.prototype, "min", 2);
un([
  D({ type: Number })
], jt.prototype, "max", 2);
un([
  D({ type: Number })
], jt.prototype, "step", 2);
un([
  D({ type: Number })
], jt.prototype, "low", 2);
un([
  D({ type: Number })
], jt.prototype, "high", 2);
un([
  D({ type: String })
], jt.prototype, "unit", 2);
un([
  G()
], jt.prototype, "_dragging", 2);
un([
  zi(".track")
], jt.prototype, "_track", 2);
jt = un([
  Ge("dual-handle-slider")
], jt);
var Bp = Object.defineProperty, Wp = Object.getOwnPropertyDescriptor, Qn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Wp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Bp(t, n, o), o;
};
const Gp = 16, Vp = 26, _r = 0.5, ir = 3, Kp = "Couldn’t set the range. Try again.";
let ln = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._heldRange = null, this._chain = Promise.resolve(), this._onInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onChange = (e) => {
      if (this._pendingLow = null, this._pendingHigh = null, !this.hass || !this.zone) return;
      const t = this.hass, n = {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high,
        hours: ir
      };
      this._chain = this._chain.then(() => rr(t, n)).catch(() => {
        var i;
        return (i = this.announce) == null ? void 0 : i.call(this, Kp);
      });
    };
  }
  render() {
    if (!this.hass || !this.entities) return S;
    const e = Oi(this.hass, this.entities), t = Wl(this.hass, this.entities.manualLow), n = Wl(this.hass, this.entities.manualHigh), i = qp(e.band.low, e.band.high, t, n), o = this._pendingLow ?? i.low, s = this._pendingHigh ?? i.high, r = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(Gp, Math.floor(i.low)),
      max: Math.max(Vp, Math.ceil(i.high))
    };
    this._heldRange = r;
    const c = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${ir} hours, then the schedule takes over again.` : `Sets this room’s range for ${ir} hours.`;
    return v`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${c}</div>
        <dual-handle-slider
          .min=${r.min}
          .max=${r.max}
          .step=${_r}
          .low=${o}
          .high=${s}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
};
ln.styles = [
  Ve,
  De`
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
Qn([
  D({ attribute: !1 })
], ln.prototype, "hass", 2);
Qn([
  D({ type: String })
], ln.prototype, "zone", 2);
Qn([
  D({ attribute: !1 })
], ln.prototype, "entities", 2);
Qn([
  D({ attribute: !1 })
], ln.prototype, "announce", 2);
Qn([
  G()
], ln.prototype, "_pendingLow", 2);
Qn([
  G()
], ln.prototype, "_pendingHigh", 2);
ln = Qn([
  Ge("comfort-band-exact-range")
], ln);
function Wl(e, t) {
  const n = t !== null ? e.states[t] : void 0;
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function qp(e, t, n, i) {
  let o = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, s = t) : Number.isFinite(n) && Number.isFinite(i) && (o = n, s = i), o = Math.round(o * 10) / 10, s = Math.round(s * 10) / 10, s - o < _r && (s = o + _r), { low: o, high: s };
}
var Yp = Object.defineProperty, Zp = Object.getOwnPropertyDescriptor, Xn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Zp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Yp(t, n, o), o;
};
let cn = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._historyOpen = !1, this._diagnosticsOpen = !1;
  }
  _state(e) {
    var t, n;
    return e !== null ? (n = (t = this.hass) == null ? void 0 : t.states[e]) == null ? void 0 : n.state : void 0;
  }
  _comfortSummary() {
    var t;
    const e = this._state(((t = this.entities) == null ? void 0 : t.useApparentTemperature) ?? null);
    return e === "on" ? "“Feels like” on" : e === "off" ? "“Feels like” off" : "";
  }
  _automationSummary() {
    var n, i;
    const e = this._state(((n = this.entities) == null ? void 0 : n.enabled) ?? null), t = this._state(((i = this.entities) == null ? void 0 : i.learningEnabled) ?? null);
    return [
      e === "on" ? "Controlling" : e === "off" ? "Paused" : "",
      t === "on" ? "learning on" : t === "off" ? "learning off" : ""
    ].filter(Boolean).join(" · ").replace(/^l/, "L");
  }
  /** "Fan control on", "Peak saving off": a section led by one switch. */
  _switchSummary(e, t) {
    var i;
    const n = this._state(((i = this.entities) == null ? void 0 : i[e]) ?? null);
    return n === "on" ? `${t} on` : n === "off" ? `${t} off` : "";
  }
  _schedulesSummary() {
    if (!this.hass) return "";
    const e = es(this.hass), t = e !== null ? this.hass.states[e] : void 0;
    if (!Ar(t))
      return Wo(this.hass) ? "Not available right now" : "No profiles set up";
    const n = t.state;
    return !n || n === "unknown" ? "" : `Profile: ${n}`;
  }
  _section(e, t, n, i, o) {
    return v`
      <details
        data-section=${e}
        @toggle=${o ? (s) => o(s.target.open) : S}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${n ? v`<span class="summary">${n}</span>` : S}
          </span>
        </summary>
        <div class="content">${i}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? S : v`
      ${this._section(
      "comfort",
      "Comfort",
      this._comfortSummary(),
      v`<comfort-band-settings-tab
            section="comfort"
            .hass=${this.hass}
            .entities=${this.entities}
          ></comfort-band-settings-tab>
          <comfort-band-exact-range
            .hass=${this.hass}
            .zone=${this.zone}
            .entities=${this.entities}
            .announce=${this.announce}
          ></comfort-band-exact-range>`
    )}
      ${this._section(
      "automation",
      "Automation",
      this._automationSummary(),
      v`<comfort-band-settings-tab
          section="automation"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "fan",
      "Fan",
      this._switchSummary("fanControlEnabled", "Fan control"),
      v`<comfort-band-settings-tab
          section="fan"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "peak",
      "Peak saving",
      this._switchSummary("peakSavingEnabled", "Peak saving"),
      v`<comfort-band-settings-tab
          section="peak"
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`
    )}
      ${this._section(
      "schedules",
      "Schedules",
      this._schedulesSummary(),
      v`<comfort-band-settings-tab
            section="schedules"
            .hass=${this.hass}
            .entities=${this.entities}
          ></comfort-band-settings-tab>
          <h3 class="subhead">Profiles</h3>
          <comfort-band-profiles-tab
            .hass=${this.hass}
            .announce=${this.announce}
          ></comfort-band-profiles-tab>`
    )}
      ${this._section(
      "diagnostics",
      "Diagnostics",
      Lu(hc(this.hass, this.entities)),
      this._diagnosticsOpen ? v`<comfort-band-diagnostics-tab
              .hass=${this.hass}
              .zone=${this.zone}
              .entities=${this.entities}
            ></comfort-band-diagnostics-tab>` : S,
      (e) => this._diagnosticsOpen = e
    )}
      ${this._section(
      "history",
      "History",
      // Not a range: the chart offers 6 h, 24 h and 7 d (#34).
      "6 hours to 7 days",
      this._historyOpen ? v`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : S,
      (e) => this._historyOpen = e
    )}
    `;
  }
};
cn.styles = [
  Ve,
  De`
      :host {
        display: block;
        padding: var(--cb-gap-sm) var(--cb-gap-md) var(--cb-gap-md);
      }
      details {
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      /* "Profiles", under Schedules after "Follows". */
      .subhead {
        margin: var(--cb-gap-md) 0 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
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
         that turns down when the section is open. In right-to-left it's
         spaced on its words' side and, closed, points towards them (#108). */
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
        margin-block: 0;
        margin-inline: 2px 6px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details:not([open]) > summary:dir(rtl)::before {
        transform: rotate(135deg);
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
Xn([
  D({ attribute: !1 })
], cn.prototype, "hass", 2);
Xn([
  D({ type: String })
], cn.prototype, "zone", 2);
Xn([
  D({ attribute: !1 })
], cn.prototype, "entities", 2);
Xn([
  D({ attribute: !1 })
], cn.prototype, "announce", 2);
Xn([
  G()
], cn.prototype, "_historyOpen", 2);
Xn([
  G()
], cn.prototype, "_diagnosticsOpen", 2);
cn = Xn([
  Ge("comfort-band-advanced-tab")
], cn);
var Jp = Object.defineProperty, Qp = Object.getOwnPropertyDescriptor, dn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Qp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Jp(t, n, o), o;
};
const In = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "advanced", label: "Advanced" }
], Xp = 1e3, Gl = ["mousedown", "mouseup", "click"];
function eg(e) {
  const t = (o) => {
    o.composedPath().includes(e) || (o.preventDefault(), o.stopImmediatePropagation()), o.type === "click" && n();
  }, n = () => {
    clearTimeout(i);
    for (const o of Gl) window.removeEventListener(o, t, !0);
    window.removeEventListener("pointerdown", n, !0);
  };
  for (const o of Gl) window.addEventListener(o, t, !0);
  window.addEventListener("pointerdown", n, !0);
  const i = setTimeout(n, Xp);
}
let It = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._refusal = null, this._refusals = 0, this._announce = (e) => {
      !this._isOpen || !this.isConnected || (this._refusal = { words: e, n: ++this._refusals });
    }, this._quiet = () => {
      this._refusal = null;
    }, this._quietOnPress = { handleEvent: this._quiet, capture: !0 }, this._onTouchStart = {
      handleEvent: (e) => {
        var n;
        const t = e.currentTarget;
        (n = e.composedPath()[0]) == null || n.addEventListener(
          "touchend",
          (i) => {
            i.cancelable && (t.open ? eg(t) : i.preventDefault());
          },
          { once: !0 }
        );
      },
      capture: !0,
      passive: !0
    }, this._onClose = () => {
      this._isOpen = !1, this._refusal = null, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = In.findIndex((o) => o.id === this._activeTab);
      if (t < 0) return;
      let n;
      switch (e.key) {
        case "ArrowLeft":
          n = (t - 1 + In.length) % In.length;
          break;
        case "ArrowRight":
          n = (t + 1) % In.length;
          break;
        case "Home":
          n = 0;
          break;
        case "End":
          n = In.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const i = In[n].id;
      this._activeTab = i, this.updateComplete.then(() => {
        const o = this.renderRoot.querySelector(`#cb-tab-${i}`);
        o == null || o.focus();
      });
    };
  }
  /** Opens on Now, whichever tab it was left on: the family's tap shouldn't
   *  land on Advanced because someone set the house up last. */
  open() {
    this._activeTab = "now", this._isOpen = !0, this.updateComplete.then(() => {
      var e;
      return (e = this._dialog) == null ? void 0 : e.showModal();
    });
  }
  close() {
    var e;
    (e = this._dialog) == null || e.close();
  }
  selectTab(e) {
    this._activeTab = e;
  }
  /**
   * Leaving the page, the dialog is closed (#75). A modal dialog taken off
   * the page stays open but stops being modal: put back (HA's masonry view
   * re-columning as a phone turns), it would sit in what holds the card,
   * sized from it, with no backdrop and no Esc, where the next card or a
   * floorplan's edge can cover it; hidden (a visibility condition, another
   * view), it would come back that way whenever the card does. Closed, it
   * never comes back by itself: the room's tile opens it again.
   */
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this._refusal = null, (e = this._dialog) != null && e.open && this._dialog.close();
  }
  render() {
    if (!this._isOpen) return S;
    const e = this.zoneName || this.zone || "Comfort Band";
    return v`
      <dialog
        @close=${this._onClose}
        @pointerdown=${this._quietOnPress}
        @keydown=${this._quietOnPress}
        @touchstart=${this._onTouchStart}
      >
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${In.map(
      (t) => v`
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
        <div class="refusal" role="alert">
          ${this._refusal ? $u(this._refusal.n, v`<span>${this._refusal.words}</span>`) : S}
        </div>
      </dialog>
    `;
  }
  _renderTab() {
    switch (this._activeTab) {
      case "now":
        return v`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
          .announce=${this._announce}
        ></comfort-band-now-tab>`;
      case "schedule":
        return v`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-schedule-tab>`;
      case "advanced":
        return v`<comfort-band-advanced-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
          .announce=${this._announce}
        ></comfort-band-advanced-tab>`;
    }
  }
};
It.styles = [
  Ve,
  De`
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
      /* WCAG 2.5.5: 44px each way (#3). The margins take the extra out of
         the header's padding, so the header is no taller and the ✕ sits
         where it did, at the line's end in either direction. */
      .close {
        font: inherit;
        font-size: 22px;
        line-height: 1;
        background: transparent;
        border: none;
        color: var(--cb-text-secondary);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        min-height: 44px;
        margin-block: -7px;
        margin-inline-end: -7px;
        padding: 0;
      }
      nav {
        flex-shrink: 0;
        display: flex;
        gap: 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        overflow-x: auto;
      }
      /* WCAG 2.5.5: 44px tall (#3). */
      nav button {
        font: inherit;
        font-size: 13px;
        min-height: 44px;
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
      /* Forced colours (a Windows contrast theme) give every tab the text
         colour, words and underline, so the tab on show looked like the
         others. There the theme's selection colours fill it, as the History
         chart's range on show (#73) and the Now tab's length (#89). Opted
         out, every colour is its own, or its words would sit on a plate of
         the page's colour. The keys take focus to the tab on show, so its
         ring goes inside, in the words' colour: one in the fill's colour
         wouldn't show on it, and the tab bar's edges would cut off one
         outside (#87). */
      @media (forced-colors: active) {
        nav button[aria-selected='true'] {
          forced-color-adjust: none;
          background: Highlight;
          border-bottom-color: Highlight;
          color: HighlightText;
        }
        nav button[aria-selected='true']:focus-visible {
          outline: 2px solid HighlightText;
          outline-offset: -4px;
        }
      }
      .panel {
        overflow-y: auto;
        flex: 1;
      }
      /* Heard, not seen: nothing on screen changes or moves (#53). */
      .refusal {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      .placeholder {
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
      }
      /* A phone (#3): full screen, where HA's own dialogs are (450 px wide
         or 500 px tall, or less). A floating dialog left 19 px of dashboard down
         each side of a 320 px phone. The padding keeps the header and the
         panel's end clear of a notch or the home indicator. */
      @media (max-width: 450px), (max-height: 500px) {
        dialog {
          box-sizing: border-box;
          width: 100%;
          max-width: none;
          height: 100%;
          max-height: none;
          margin: 0;
          border-radius: 0;
          box-shadow: none;
          padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0)
            env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
        }
        .frame {
          height: 100%;
        }
      }
    `
];
dn([
  D({ attribute: !1 })
], It.prototype, "hass", 2);
dn([
  D({ type: String })
], It.prototype, "zone", 2);
dn([
  D({ type: String })
], It.prototype, "zoneName", 2);
dn([
  D({ attribute: !1 })
], It.prototype, "entities", 2);
dn([
  G()
], It.prototype, "_activeTab", 2);
dn([
  G()
], It.prototype, "_isOpen", 2);
dn([
  G()
], It.prototype, "_refusal", 2);
dn([
  zi("dialog")
], It.prototype, "_dialog", 2);
It = dn([
  Ge("comfort-band-modal")
], It);
var tg = Object.defineProperty, ng = Object.getOwnPropertyDescriptor, Wr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ng(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && tg(t, n, o), o;
};
let bo = class extends Te {
  constructor() {
    super(...arguments), this.config = {
      type: "custom:comfort-band-card",
      zone: ""
    }, this._onZoneChange = (e) => {
      const t = e.target.value;
      this._fireConfig({ ...this.config, zone: t });
    }, this._onNameChange = (e) => {
      const t = e.target, n = t.value.trim();
      t.value = n;
      const i = { ...this.config };
      n ? i.name = n : delete i.name, this._fireConfig(i);
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
      ...e.name != null ? { name: e.name } : {},
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
  /** The name the card shows when `name` is unset, used as the placeholder. */
  _defaultName() {
    if (!this.hass || !this.config.zone) return "";
    const e = rc(this.hass, this.config.zone);
    return Tr(this.hass, { zone: this.config.zone }, e);
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
      return v`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return v`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? v`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (n) => v` <option value=${n} ?selected=${n === this.config.zone}>${n}</option> `
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
bo.styles = [
  Ve,
  De`
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
      /* In right-to-left the arrow and the room for it move to the end
         together (#109). One rule for both: a browser without :dir() drops
         it whole and keeps them together on the right, as before. */
      select:dir(rtl) {
        padding: 8px 8px 8px 32px;
        background-position:
          12px 50%,
          18px 50%;
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
Wr([
  D({ attribute: !1 })
], bo.prototype, "hass", 2);
Wr([
  D({ attribute: !1 })
], bo.prototype, "config", 2);
bo = Wr([
  Ge("comfort-band-card-editor")
], bo);
var ig = Object.defineProperty, og = Object.getOwnPropertyDescriptor, hs = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? og(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && ig(t, n, o), o;
};
let Ni = class extends Te {
  constructor() {
    super(...arguments), this._onTileTap = () => {
      var e;
      (e = this._modal) == null || e.open();
    }, this._drawn = new ResizeObserver(() => {
      var e;
      this.getClientRects().length === 0 && ((e = this._modal) == null || e.close());
    });
  }
  setConfig(e) {
    if (!(e != null && e.zone))
      throw new Error("comfort-band-card: `zone` is required");
    const t = e.name;
    if (typeof t == "number") e = { ...e, name: String(t) };
    else if (t != null && typeof t != "string")
      throw new Error("comfort-band-card: `name` must be text");
    this._config = e;
  }
  /** HA's panel/grid uses this to size the card. ~1 row per ~50 px of content. */
  getCardSize() {
    var e;
    return ((e = this._config) == null ? void 0 : e.variant) === "mini" ? 1 : 2;
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
    if (!this._config || !this.hass) return v``;
    const e = this._config.zone, t = rc(this.hass, e);
    if (t.deviceId === null)
      return v`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const n = this._config.compact === !0, i = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return v`
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
        .noExpand=${n}
        .variant=${i}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${n ? null : v`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  connectedCallback() {
    super.connectedCallback(), this._drawn.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._drawn.disconnect();
  }
  _buildView(e, t) {
    const n = Oi(e, t), i = tc({
      ...n,
      peak: vo(e, t),
      peakComing: pc(e, t),
      doing: null,
      now: Date.now(),
      formatTime: (o) => $n(o, e)
    });
    return {
      zoneName: Tr(e, this._config, t),
      temperature: n.temperature,
      feelsLike: n.feelsLike,
      low: n.band.low,
      high: n.band.high,
      action: kr(n) ? n.action : "unknown",
      statusKind: i.kind,
      statusText: i.text,
      badges: fu(n)
    };
  }
};
Ni.styles = [
  Ve,
  De`
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
hs([
  D({ attribute: !1 })
], Ni.prototype, "hass", 2);
hs([
  G()
], Ni.prototype, "_config", 2);
hs([
  zi("comfort-band-modal")
], Ni.prototype, "_modal", 2);
Ni = hs([
  Ge("comfort-band-card")
], Ni);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.22.17 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
