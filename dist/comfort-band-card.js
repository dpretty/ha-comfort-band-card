const Lo = globalThis, dr = Lo.ShadowRoot && (Lo.ShadyCSS === void 0 || Lo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fr = Symbol(), ga = /* @__PURE__ */ new WeakMap();
let Ol = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== fr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (dr && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = ga.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ga.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const qo = (e) => new Ol(typeof e == "string" ? e : e + "", void 0, fr), De = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Ol(n, e, fr);
}, wu = (e, t) => {
  if (dr) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = Lo.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, ba = dr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return qo(n);
})(e) : e;
const { is: xu, defineProperty: $u, getOwnPropertyDescriptor: ku, getOwnPropertyNames: Su, getOwnPropertySymbols: Au, getPrototypeOf: Tu } = Object, Yo = globalThis, _a = Yo.trustedTypes, Cu = _a ? _a.emptyScript : "", Eu = Yo.reactiveElementPolyfillSupport, so = (e, t) => e, jo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Cu : null;
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
} }, pr = (e, t) => !xu(e, t), va = { attribute: !0, type: String, converter: jo, reflect: !1, useDefault: !1, hasChanged: pr };
Symbol.metadata ??= Symbol("metadata"), Yo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let xi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = va) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && $u(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = ku(this.prototype, t) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: o, set(r) {
      const c = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? va;
  }
  static _$Ei() {
    if (this.hasOwnProperty(so("elementProperties"))) return;
    const t = Tu(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(so("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(so("properties"))) {
      const n = this.properties, i = [...Su(n), ...Au(n)];
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
      for (const o of i) n.unshift(ba(o));
    } else t !== void 0 && n.push(ba(t));
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
    return wu(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : jo).toAttribute(n, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : jo;
      this._$Em = o;
      const c = r.fromAttribute(n, s.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? pr)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
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
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: r } = s, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, s, c);
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
xi.elementStyles = [], xi.shadowRootOptions = { mode: "open" }, xi[so("elementProperties")] = /* @__PURE__ */ new Map(), xi[so("finalized")] = /* @__PURE__ */ new Map(), Eu?.({ ReactiveElement: xi }), (Yo.reactiveElementVersions ??= []).push("2.1.2");
const mr = globalThis, ya = (e) => e, Uo = mr.trustedTypes, wa = Uo ? Uo.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Fl = "$lit$", wn = `lit$${Math.random().toFixed(9).slice(2)}$`, Ll = "?" + wn, Du = `<${Ll}>`, Vn = document, co = () => Vn.createComment(""), uo = (e) => e === null || typeof e != "object" && typeof e != "function", gr = Array.isArray, Pu = (e) => gr(e) || typeof e?.[Symbol.iterator] == "function", Ms = `[ 	
\f\r]`, Yi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xa = /-->/g, $a = />/g, Ln = RegExp(`>|${Ms}(?:([^\\s"'>=/]+)(${Ms}*=${Ms}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ka = /'/g, Sa = /"/g, Hl = /^(?:script|style|textarea|title)$/i, Rl = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), v = Rl(1), Zi = Rl(2), Ti = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Aa = /* @__PURE__ */ new WeakMap(), In = Vn.createTreeWalker(Vn, 129);
function jl(e, t) {
  if (!gr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wa !== void 0 ? wa.createHTML(t) : t;
}
const Mu = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Yi;
  for (let c = 0; c < n; c++) {
    const h = e[c];
    let f, g, m = -1, _ = 0;
    for (; _ < h.length && (r.lastIndex = _, g = r.exec(h), g !== null); ) _ = r.lastIndex, r === Yi ? g[1] === "!--" ? r = xa : g[1] !== void 0 ? r = $a : g[2] !== void 0 ? (Hl.test(g[2]) && (o = RegExp("</" + g[2], "g")), r = Ln) : g[3] !== void 0 && (r = Ln) : r === Ln ? g[0] === ">" ? (r = o ?? Yi, m = -1) : g[1] === void 0 ? m = -2 : (m = r.lastIndex - g[2].length, f = g[1], r = g[3] === void 0 ? Ln : g[3] === '"' ? Sa : ka) : r === Sa || r === ka ? r = Ln : r === xa || r === $a ? r = Yi : (r = Ln, o = void 0);
    const S = r === Ln && e[c + 1].startsWith("/>") ? " " : "";
    s += r === Yi ? h + Du : m >= 0 ? (i.push(f), h.slice(0, m) + Fl + h.slice(m) + wn + S) : h + wn + (m === -2 ? c : S);
  }
  return [jl(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ho {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const c = t.length - 1, h = this.parts, [f, g] = Mu(t, n);
    if (this.el = ho.createElement(f, i), In.currentNode = this.el.content, n === 2 || n === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = In.nextNode()) !== null && h.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(Fl)) {
          const _ = g[r++], S = o.getAttribute(m).split(wn), A = /([.?@])?(.*)/.exec(_);
          h.push({ type: 1, index: s, name: A[2], strings: S, ctor: A[1] === "." ? zu : A[1] === "?" ? Ou : A[1] === "@" ? Fu : Zo }), o.removeAttribute(m);
        } else m.startsWith(wn) && (h.push({ type: 6, index: s }), o.removeAttribute(m));
        if (Hl.test(o.tagName)) {
          const m = o.textContent.split(wn), _ = m.length - 1;
          if (_ > 0) {
            o.textContent = Uo ? Uo.emptyScript : "";
            for (let S = 0; S < _; S++) o.append(m[S], co()), In.nextNode(), h.push({ type: 2, index: ++s });
            o.append(m[_], co());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ll) h.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(wn, m + 1)) !== -1; ) h.push({ type: 7, index: s }), m += wn.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = Vn.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ci(e, t, n = e, i) {
  if (t === Ti) return t;
  let o = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = uo(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = o : n._$Cl = o), o !== void 0 && (t = Ci(e, o._$AS(e, t.values), o, i)), t;
}
class Nu {
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
    const { el: { content: n }, parts: i } = this._$AD, o = (t?.creationScope ?? Vn).importNode(n, !0);
    In.currentNode = o;
    let s = In.nextNode(), r = 0, c = 0, h = i[0];
    for (; h !== void 0; ) {
      if (r === h.index) {
        let f;
        h.type === 2 ? f = new bo(s, s.nextSibling, this, t) : h.type === 1 ? f = new h.ctor(s, h.name, h.strings, this, t) : h.type === 6 && (f = new Lu(s, this, t)), this._$AV.push(f), h = i[++c];
      }
      r !== h?.index && (s = In.nextNode(), r++);
    }
    return In.currentNode = Vn, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class bo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Ci(this, t, n), uo(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== Ti && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pu(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && uo(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Vn.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ho.createElement(jl(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(n);
    else {
      const s = new Nu(o, this), r = s.u(this.options);
      s.p(n), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = Aa.get(t.strings);
    return n === void 0 && Aa.set(t.strings, n = new ho(t)), n;
  }
  k(t) {
    gr(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new bo(this.O(co()), this.O(co()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const i = ya(t).nextSibling;
      ya(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Zo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = k;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = Ci(this, t, n, 0), r = !uo(t) || t !== this._$AH && t !== Ti, r && (this._$AH = t);
    else {
      const c = t;
      let h, f;
      for (t = s[0], h = 0; h < s.length - 1; h++) f = Ci(this, c[i + h], n, h), f === Ti && (f = this._$AH[h]), r ||= !uo(f) || f !== this._$AH[h], f === k ? t = k : t !== k && (t += (f ?? "") + s[h + 1]), this._$AH[h] = f;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zu extends Zo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class Ou extends Zo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class Fu extends Zo {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Ci(this, t, n, 0) ?? k) === Ti) return;
    const i = this._$AH, o = t === k && i !== k || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== k && (i === k || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lu {
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
const Hu = mr.litHtmlPolyfillSupport;
Hu?.(ho, bo), (mr.litHtmlVersions ??= []).push("3.3.2");
const Ru = (e, t, n) => {
  const i = n?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = o = new bo(t.insertBefore(co(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
const br = globalThis;
let Te = class extends xi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ru(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ti;
  }
};
Te._$litElement$ = !0, Te.finalized = !0, br.litElementHydrateSupport?.({ LitElement: Te });
const ju = br.litElementPolyfillSupport;
ju?.({ LitElement: Te });
(br.litElementVersions ??= []).push("4.2.2");
const Ie = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Uu = { attribute: !0, type: String, converter: jo, reflect: !1, hasChanged: pr }, Bu = (e = Uu, t, n) => {
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
  return (t, n) => typeof n == "object" ? Bu(e, t, n) : ((i, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
function G(e) {
  return D({ ...e, state: !0, attribute: !1 });
}
const Iu = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
function zi(e, t) {
  return (n, i, o) => {
    const s = (r) => r.renderRoot?.querySelector(e) ?? null;
    return Iu(n, i, { get() {
      return s(this);
    } });
  };
}
const We = De`
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
function Wu(e) {
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
function Gu(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
const Vu = 0.5, Ku = 10, qu = 35;
function zt(e) {
  return `${Zt(e.low)}–${Zt(e.high)}°`;
}
function Zt(e) {
  const t = Math.round(e * 10) / 10;
  return Number.isInteger(t) ? t.toFixed(0) : t.toFixed(1);
}
function Eo(e, t) {
  let n = t * Vu;
  return n > 0 && (n = Math.max(0, Math.min(n, qu - e.high))), n < 0 && (n = Math.min(0, Math.max(n, Ku - e.low))), { low: Ta(e.low + n), high: Ta(e.high + n) };
}
function Ta(e) {
  return Math.round(e * 10) / 10;
}
function Ul(e) {
  const { room: t, apparent: n, useApparent: i } = e, o = Number.isFinite(t) && Number.isFinite(n) && Js(n) !== Js(t);
  return i && Number.isFinite(n) ? {
    value: n,
    note: o ? `Feels like · room ${t.toFixed(1)}°` : "Feels like"
  } : { value: t, note: o ? `Feels like ${n.toFixed(1)}°` : "" };
}
function Js(e) {
  return Math.round(Number(e.toFixed(1)) * 10);
}
function Bl(e, t) {
  if (![e, t.low, t.high].every(Number.isFinite)) return null;
  const n = Js(e);
  return n < Math.round(t.low * 10) ? "below" : n > Math.round(t.high * 10) ? "above" : "in";
}
const Yu = {
  heating: "Heating",
  cooling: "Cooling",
  comfortable: "Comfortable",
  below: "A bit cool",
  above: "A bit warm"
};
function Il(e) {
  return e.doing ? { kind: "adjusting", text: e.doing } : e.enabled ? e.sensor === "offline" ? { kind: "sensor", text: "On hold: the room sensor is offline" } : e.sensor === "no-reading" ? { kind: "sensor", text: "On hold: no room temperature reading" } : e.sensor === "stand-in" ? { kind: "sensor", text: `Room sensor offline · ${Ca(e, !1).text}` } : Ca(e) : { kind: "paused", text: "Paused: not controlling this room" };
}
function Ca(e, t = !0) {
  if (!Number.isFinite(e.band.low) || !Number.isFinite(e.band.high))
    return { kind: "none", text: "Can't read this room's range" };
  const n = Bl(e.temperature, e.band), i = e.action === "heating" ? "heating" : e.action === "cooling" ? "cooling" : e.action === "idle" ? n === "in" ? "comfortable" : n ?? "idle" : "none", o = Yu[i];
  let s;
  if (e.overrideActive) {
    const c = e.scheduled === !0 && e.overrideEnds !== null && e.overrideEnds > e.now ? ` until ${e.formatTime(e.overrideEnds)}` : "";
    s = `${e.scheduled === !1 ? "set to" : "adjusted to"} ${zt(e.band)}${c}`;
  } else if (e.peak) {
    const c = Zu(e), h = c !== null ? ` until ${e.formatTime(c)}` : "", f = t && e.peak.kind === "relaxed" ? " for a peak" : "";
    s = `${zt(e.band)}${f}${h}`;
  } else {
    const c = e.scheduled === !0 && e.nextChange !== null && e.nextChange > e.now ? ` until ${e.formatTime(e.nextChange)}` : "";
    s = `${zt(e.band)}${c}`;
  }
  const r = o ? `${o} · ${s}` : s.charAt(0).toUpperCase() + s.slice(1);
  return { kind: i, text: r };
}
function Zu(e) {
  const t = e.peak?.at ?? null;
  return t === null || t <= e.now ? null : e.scheduled === !1 ? t : e.scheduled !== !0 ? null : e.nextChange === null ? t : e.nextChange <= e.now ? null : Math.min(t, e.nextChange);
}
function Wl(e) {
  if (e)
    try {
      return new Intl.DateTimeFormat("en", { timeZone: e }), e;
    } catch {
      return;
    }
}
function Si(e, t, n) {
  const i = new Date(e), o = Wl(n), s = t?.locale?.time_format, r = t?.locale?.language;
  let c;
  if (s === "12") c = !0;
  else if (s === "24") c = !1;
  else {
    const g = new Intl.DateTimeFormat(s === "system" ? void 0 : r, {
      hour: "numeric"
    }).resolvedOptions().hourCycle;
    c = g === "h11" || g === "h12";
  }
  const h = {
    hourCycle: c ? "h12" : "h23",
    hour: c ? "numeric" : "2-digit",
    ...o ? { timeZone: o } : {}
  }, f = o ? Number(
    new Intl.DateTimeFormat("en", { timeZone: o, minute: "numeric" }).formatToParts(i).find((g) => g.type === "minute")?.value
  ) : i.getMinutes();
  return (!c || f !== 0) && (h.minute = "2-digit"), new Intl.DateTimeFormat(r, h).format(i);
}
function Ns(e, t) {
  const n = /^(\d{1,2}):(\d{2})$/.exec(e);
  if (!n) return e;
  const i = Number(n[1]), o = Number(n[2]);
  return i > 23 || o > 59 ? e : Si(new Date(2e3, 0, 1, i, o).getTime(), t);
}
var Ju = Object.defineProperty, Qu = Object.getOwnPropertyDescriptor, Yn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Qu(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Ju(t, n, o), o;
};
const Qs = 15, Gl = 28, Xu = Gl - Qs;
function zs(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(Qs, Math.min(Gl, e)) - Qs) / Xu * 100;
}
let rn = class extends Te {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.roomLabel = "room", this.decorative = !1, this.action = "unknown";
  }
  render() {
    const e = Gu(this.action), t = Number.isFinite(this.low), n = Number.isFinite(this.high), i = Number.isFinite(this.room), o = t ? zs(this.low) : 0, s = n ? zs(this.high) : 100, r = Math.min(o, s), c = Math.max(0, Math.abs(s - o)), h = i ? zs(this.room) : 50, f = (S) => Number.isFinite(S) ? `${S.toFixed(1)}°` : "—", g = e === "heating" || e === "cooling" ? `, ${e}` : "", m = `Comfortable range ${f(this.low)} to ${f(this.high)}, ${this.roomLabel} ${f(this.room)}${g}`, _ = t && n;
    return v`
      <div
        class="gauge ${e}"
        role=${this.decorative ? k : "img"}
        aria-label=${this.decorative ? k : m}
        aria-hidden=${this.decorative ? "true" : k}
        style="--lo: ${r}%; --hi: ${r + c}%"
      >
        <div class="bar">
          <div class="track"></div>
          ${_ ? v`<div class="band" style="left: ${r}%; width: ${c}%"></div>` : k}
          ${i ? v`<div class="marker" style="left: ${h}%"></div>` : k}
        </div>
        <div class="limits">
          ${_ ? v`<span class="low">${Zt(Math.min(this.low, this.high))}°</span>
                <span class="high">${Zt(Math.max(this.low, this.high))}°</span>` : k}
        </div>
      </div>
    `;
  }
};
rn.styles = [
  We,
  De`
      :host {
        display: block;
        width: 100%;
        /* The limits' size; and the gauge's width is what's asked below. */
        font-size: 11px;
        container-type: inline-size;
      }
      .gauge {
        /* The action's colour, moved towards the text's: darker on a light
           card, lighter on a dark one, so it meets 3:1 against it (#22). */
        --cb-gauge-color: color-mix(in oklab, var(--cb-gauge-base) 70%, var(--cb-text-primary));
        --cb-gauge-base: var(--cb-action-unknown);
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
Yn([
  D({ type: Number })
], rn.prototype, "low", 2);
Yn([
  D({ type: Number })
], rn.prototype, "high", 2);
Yn([
  D({ type: Number })
], rn.prototype, "room", 2);
Yn([
  D({ type: String })
], rn.prototype, "roomLabel", 2);
Yn([
  D({ type: Boolean })
], rn.prototype, "decorative", 2);
Yn([
  D({ type: String })
], rn.prototype, "action", 2);
rn = Yn([
  Ie("band-gauge")
], rn);
function nn(e, t) {
  return t !== null ? e.states[t] : void 0;
}
function Do(e, t) {
  const n = nn(e, t);
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function Vl(e, t) {
  const n = nn(e, t.nextBandChange);
  if (!n) return { scheduled: null, nextChange: null };
  const i = n.attributes.scheduled, o = Date.parse(n.state);
  return {
    scheduled: typeof i == "boolean" ? i : null,
    nextChange: Number.isNaN(o) ? null : o
  };
}
function Oi(e, t) {
  const n = Do(e, t.roomTemperature), i = Do(e, t.apparentTemperature), o = nn(e, t.useApparentTemperature)?.state === "on", s = Date.parse(nn(e, t.overrideEnds)?.state ?? ""), r = nn(e, t.roomTemperature)?.attributes.source, c = r === "climate" || r === "fallback_sensor" ? r : null, h = nn(e, t.roomSensorUnavailable)?.state === "on" || c !== null, f = Number.isFinite(n) || Number.isFinite(i);
  return {
    enabled: nn(e, t.enabled)?.state !== "off",
    action: nn(e, t.currentAction)?.state ?? "unknown",
    room: n,
    apparent: i,
    useApparent: o,
    temperature: Ul({ room: n, apparent: i, useApparent: o }).value,
    feelsLike: o && Number.isFinite(i),
    band: {
      low: Do(e, t.effectiveLow),
      high: Do(e, t.effectiveHigh)
    },
    overrideActive: nn(e, t.overrideActive)?.state === "on",
    overrideEnds: Number.isNaN(s) ? null : s,
    ...Vl(e, t),
    sensor: h ? f ? "stand-in" : "offline" : f ? "ok" : "no-reading",
    standIn: c
  };
}
function _r(e) {
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
}, eh = {
  paused: vn.paused,
  sensor: vn.sensor,
  heating: vn.heating,
  cooling: vn.cooling,
  below: vn.below,
  above: vn.above,
  adjusted: "mdi:timer-outline"
};
function th(e) {
  if (!e.enabled) return ["paused"];
  const t = [];
  if (e.sensor !== "ok" && t.push("sensor"), !_r(e)) return t;
  if (e.action === "heating" || e.action === "cooling")
    t.push(e.action);
  else {
    const n = Bl(e.temperature, e.band);
    (n === "below" || n === "above") && t.push(n);
  }
  return e.overrideActive && e.scheduled !== !1 && t.push("adjusted"), t;
}
function nh(e) {
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
var ih = Object.defineProperty, oh = Object.getOwnPropertyDescriptor, St = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? oh(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && ih(t, n, o), o;
};
let rt = class extends Te {
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
            ${this.feelsLike ? v`<span class="sr-only"> feels like </span>` : k}${this._renderTemperature()}<span class="sr-only">. </span>
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
    const e = this.badges.includes("heating") ? "heating" : this.badges.includes("cooling") ? "cooling" : null, t = e ? `--cb-mini-bg:${Wu(e)}` : "", n = this._label();
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
              icon=${eh[i]}
              data-badge=${i}
              aria-hidden="true"
            ></ha-icon>`
    )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
};
rt.styles = [
  We,
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
St([
  D({ type: String })
], rt.prototype, "zoneName", 2);
St([
  D({ type: Number })
], rt.prototype, "temperature", 2);
St([
  D({ type: Boolean })
], rt.prototype, "feelsLike", 2);
St([
  D({ type: Number })
], rt.prototype, "low", 2);
St([
  D({ type: Number })
], rt.prototype, "high", 2);
St([
  D({ type: String })
], rt.prototype, "action", 2);
St([
  D({ type: String })
], rt.prototype, "statusKind", 2);
St([
  D({ type: String })
], rt.prototype, "statusText", 2);
St([
  D({ attribute: !1 })
], rt.prototype, "badges", 2);
St([
  D({ type: Boolean })
], rt.prototype, "noExpand", 2);
St([
  D({ type: String, reflect: !0 })
], rt.prototype, "variant", 2);
rt = St([
  Ie("comfort-band-tile")
], rt);
const sh = (e) => (...t) => ({ _$litDirective$: e, values: t });
let rh = class {
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
const ah = {}, lh = (e, t = ah) => e._$AH = t;
const ch = sh(class extends rh {
  constructor() {
    super(...arguments), this.key = k;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, n]) {
    return t !== this.key && (lh(e), this.key = t), n;
  }
}), Jo = "comfort_band", uh = {
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
function hh() {
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
function vr(e, t) {
  for (const n of Object.values(e.devices))
    for (const [i, o] of n.identifiers)
      if (i === t[0] && o === t[1])
        return n;
  return null;
}
function Kl(e, t) {
  return Object.values(e.entities).filter(
    (n) => n.device_id === t && n.platform === Jo
  );
}
function ql(e, t) {
  const n = hh(), i = vr(e, [Jo, `zone:${t}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const o of Kl(e, i.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const r = uh[s];
    r !== void 0 && (n[r] = o.entity_id);
  }
  return n;
}
function Bo(e) {
  return vr(e, [Jo, "profile_manager"]) !== null;
}
function yr(e) {
  return e ? !(e.state === "unavailable" && e.attributes.default_profile === void 0) : !1;
}
function Qo(e) {
  const t = vr(e, [Jo, "profile_manager"]);
  if (t === null) return null;
  for (const n of Kl(e, t.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
function Yl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function wr(e, t, n) {
  const i = t.name?.trim();
  if (i) return i;
  const o = n.deviceId !== null ? e.devices[n.deviceId]?.area_id : null, s = o ? e.areas?.[o]?.name?.trim() : void 0;
  return s || (n.deviceName ?? t.zone);
}
const Rt = "comfort_band";
function dh(e, t, n) {
  return e.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function fh(e, t) {
  return e.callService(Rt, "set_schedule", { ...t });
}
function Xs(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), t.hours !== void 0 && (n.hours = t.hours), t.until !== void 0 && (n.until = t.until), e.callService(Rt, "start_override", n);
}
function Zl(e) {
  return e.services?.[Rt]?.start_override?.fields?.until !== void 0;
}
function Ea(e, t) {
  const n = { zone: t.zone };
  return t.low !== void 0 && (n.low = t.low), t.high !== void 0 && (n.high = t.high), e.callService(Rt, "cancel_override", n);
}
function Da(e) {
  const t = e.services?.[Rt]?.cancel_override?.fields;
  return Zl(e) && t?.low !== void 0 && t?.high !== void 0;
}
function ph(e, t) {
  return e.callService(Rt, "set_profile", { ...t });
}
function mh(e, t) {
  const n = { name: t.name };
  return t.description !== void 0 && (n.description = t.description), e.callService(Rt, "create_profile", n);
}
function gh(e, t) {
  const n = { source: t.source, target: t.target };
  return t.description !== void 0 && (n.description = t.description), e.callService(Rt, "clone_profile", n);
}
function bh(e, t) {
  return e.callService(Rt, "rename_profile", { old: t.old, new: t.new });
}
function _h(e, t) {
  return e.callService(Rt, "delete_profile", { name: t.name });
}
function vh(e, t) {
  return e.callService(Rt, "record_feedback", { zone: t.zone, label: t.label });
}
const Jl = {
  basic: "Basic control",
  learning: "Learning",
  predictive: "Predictive control"
}, yh = {
  heating: "Heat",
  cooling: "Cool",
  idle: "Stay idle",
  unknown: "Nothing"
};
function Yt(e, t, n) {
  const i = t[n];
  return typeof i == "string" ? e.states[i] : void 0;
}
function ki(e, t, n) {
  if (typeof t[n] != "string") return "missing";
  const i = Yt(e, t, n)?.state;
  return i === "on" || i === "off" ? i : "unknown";
}
function Os(e) {
  return e === "heating" || e === "cooling" || e === "idle" || e === "unknown" ? e : null;
}
function wh(e, t) {
  return t.some((n) => typeof e[n] == "string");
}
const Pa = [
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
  const n = Pa.findIndex(([i]) => i === t);
  return Pa.slice(n).some(([, i]) => wh(e, i));
}
function xh(e, t) {
  const n = Yt(e, t, "roomTemperature");
  if (!n) return null;
  const i = n.attributes.source;
  return i === "primary" || i === "fallback_sensor" || i === "climate" ? i : i === "none" ? "none" : i === void 0 && n.state !== "unavailable" ? Number.isFinite(Number.parseFloat(n.state)) ? "primary" : "none" : null;
}
function $h(e, t) {
  const n = Yt(e, t, "peakSaving");
  return n && ["off", "no_signal", "waiting", "preconditioning", "active", "override"].includes(n.state) ? n.state === "active" : ki(e, t, "peakSavingEnabled") === "off" ? !1 : ro(t, "v0.24") ? null : !1;
}
function Ql(e, t) {
  const n = xh(e, t), i = ki(e, t, "mpcReady"), o = ki(e, t, "enabled"), s = {
    paused: o === "on" ? !1 : o === "off" ? !0 : null,
    noReading: n === "none",
    controller: null,
    reason: null,
    decision: Os(Yt(e, t, "currentAction")?.state),
    learning: Os(Yt(e, t, "predictedAction")?.state),
    predictive: i === "on" ? Os(Yt(e, t, "mpcAction")?.state) : i === "off" ? "not-ready" : null
  };
  if (n === null) return s;
  if (n === "fallback_sensor" || n === "climate")
    return { ...s, controller: "basic", reason: "stand-in" };
  const r = $h(e, t);
  if (r === null) return s;
  if (r) return { ...s, controller: "basic", reason: "peak" };
  const c = ki(e, t, "learningEnabled");
  if (c === "unknown") return s;
  if (c === "missing")
    return ro(t, "v0.4") ? s : { ...s, controller: "basic", reason: "no-learning" };
  if (c === "off") return { ...s, controller: "basic", reason: "learning-off" };
  if (!ro(t, "v0.6")) return s;
  const h = ki(e, t, "mpcEnabled");
  return h === "unknown" ? s : h === "missing" ? ro(t, "v0.8") ? s : { ...s, controller: "learning" } : h === "off" ? { ...s, controller: "learning" } : i === "on" ? { ...s, controller: "predictive" } : i === "off" ? { ...s, controller: "learning", reason: "not-ready" } : s;
}
function kh(e) {
  return e.paused === !0 ? "Paused" : e.noReading ? "On hold" : e.controller ? `${Jl[e.controller]} deciding` : "";
}
function qe(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : null;
}
function Xl(e) {
  const t = Math.abs(e);
  return t < 0.1 ? "under 0.1°" : `about ${Zt(t)}°`;
}
function Sh(e) {
  if (e < 90) {
    const t = Math.max(1, Math.round(e));
    return `${t} minute${t === 1 ? "" : "s"}`;
  }
  return `about ${Math.round(e / 60)} hours`;
}
function Ma(e, t, n) {
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
    value: Math.abs(t) < 0.05 ? "Holds it steady" : `${t > 0 ? "Warms it" : "Cools it"} ${Xl(t)} an hour`,
    source: n === "previous" ? `From an earlier ${i} run, as the latest is too short to tell.` : `From the latest ${i} run.`,
    known: !0
  };
}
function ec(e, t) {
  if (typeof t.thermalSlope != "string") return null;
  const n = Yt(e, t, "thermalSlope");
  if (!n || n.state === "unavailable") return "unavailable";
  const i = n.attributes, o = qe(i.idle_slope), s = qe(i.idle_slope_cached_age_min);
  let r;
  o === null ? r = {
    value: "Not learned yet",
    source: "Not enough recent readings while idle to learn from.",
    known: !1
  } : r = {
    value: Math.abs(o) < 0.05 ? "Holds steady" : `${o > 0 ? "Warms" : "Cools"} ${Xl(o)} an hour`,
    source: i.idle_slope_source === "cached" ? `From earlier readings${s !== null ? `, ${Sh(s)} old` : ""}.` : "From the latest readings while idle.",
    known: !0
  };
  const c = qe(i.recovery_slope_heat), h = qe(i.recovery_slope_cool), f = typeof i.last_updated == "string" ? Date.parse(i.last_updated) : NaN;
  return {
    idle: r,
    heat: Ma("heat", c, i.method_recovery_heat),
    cool: Ma("cool", h, i.method_recovery_cool),
    details: [
      {
        name: "On its own",
        perHour: o,
        samples: qe(i.sample_count_idle),
        spread: qe(i.std_dev_idle),
        method: typeof i.method_idle == "string" ? i.method_idle : null
      },
      {
        name: "Heating",
        perHour: c,
        samples: qe(i.sample_count_recovery_heat),
        spread: qe(i.std_dev_recovery_heat),
        method: typeof i.method_recovery_heat == "string" ? i.method_recovery_heat : null
      },
      {
        name: "Cooling",
        perHour: h,
        samples: qe(i.sample_count_recovery_cool),
        spread: qe(i.std_dev_recovery_cool),
        method: typeof i.method_recovery_cool == "string" ? i.method_recovery_cool : null
      }
    ],
    windowMinutes: qe(i.window_minutes),
    sampleCount: qe(i.sample_count),
    updated: Number.isFinite(f) ? f : null
  };
}
function Ah(e, t) {
  const n = ki(e, t, "mpcReady");
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
  const o = ec(e, t), s = o === "unavailable" ? null : o, r = [];
  return s && !s.idle.known && r.push("how this room drifts on its own"), s && !s.heat.known && !s.cool.known && r.push("how fast heating or cooling moves it"), {
    title: i,
    value: "Not yet",
    desc: r.length ? `Still to learn: ${r.join(", and ")}.` : "It’s still learning how this room warms and cools."
  };
}
function Th(e, t) {
  if (typeof t != "string" || !t) return null;
  const n = e.states[t]?.attributes.friendly_name;
  return typeof n == "string" && n ? n : t;
}
const Na = "Set under Settings → Devices & Services → Comfort Band → Configure.";
function Ch(e, t) {
  const n = Yt(e, t, "roomTemperature");
  if (!n) return null;
  const i = "Room reading", o = Th(e, n.attributes.fallback_temp_sensor), s = n.attributes.fallback_to_climate === !0, r = [o, s ? "the unit’s own reading" : null].filter(Boolean), c = `${r[0]} stands in if it has a reading${r.length > 1 ? `, otherwise ${r[1]} if it has one` : ""}`;
  switch (n.attributes.source) {
    case "primary":
      return {
        title: i,
        value: "Its own sensor",
        desc: r.length ? `If that goes offline for 5 minutes, ${c}. ${Na}` : `If that goes offline, control is on hold until it’s back. ${Na}`
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
function Wn(e, t, n, i) {
  const o = Wl(i), s = Si(e, n, o), r = n?.locale?.language, c = r?.startsWith("en") ? r : "en", h = (A) => {
    if (!o) {
      const U = new Date(A);
      return [U.getFullYear(), U.getMonth(), U.getDate()];
    }
    const O = new Intl.DateTimeFormat("en-US", {
      timeZone: o,
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).formatToParts(A), R = (U) => Number(O.find(($) => $.type === U)?.value);
    return [R("year"), R("month") - 1, R("day")];
  }, f = (A) => {
    const [O, R, U] = h(A);
    return Date.UTC(O, R, U);
  }, g = Math.round((f(e) - f(t)) / 864e5), m = o ? { timeZone: o } : {};
  if (g === 0) return s;
  if (g === 1) return `tomorrow ${s}`;
  if (g === -1) return `yesterday ${s}`;
  if (Math.abs(g) < 7)
    return `${new Intl.DateTimeFormat(c, { weekday: "short", ...m }).format(e)} ${s}`;
  const _ = h(e)[0] === h(t)[0];
  return `${new Intl.DateTimeFormat(c, {
    day: "numeric",
    month: "short",
    ..._ ? {} : { year: "numeric" },
    ...m
  }).format(e)}, ${s}`;
}
function Fs(e, t, n) {
  const i = typeof e == "string" ? Date.parse(e) : NaN;
  return Number.isFinite(i) ? Wn(i, t, n) : null;
}
function tc(e, t) {
  const n = [];
  return e !== null && Math.abs(e) >= 0.05 && n.push(`the bottom ${e < 0 ? "down" : "up"} ${Zt(Math.abs(e))}°`), t !== null && Math.abs(t) >= 0.05 && n.push(`the top ${t > 0 ? "up" : "down"} ${Zt(Math.abs(t))}°`), n.join(", ");
}
function xr(e, t) {
  const n = Yt(e, t, "peakSaving");
  if (!n) return null;
  const i = n.attributes;
  if (!tc(qe(i.low_adjustment), qe(i.high_adjustment))) return null;
  const o = (s) => {
    const r = typeof s == "string" ? Date.parse(s) : NaN;
    return Number.isFinite(r) ? r : null;
  };
  return n.state === "active" ? { kind: "relaxed", at: o(i.ends) } : n.state === "preconditioning" ? { kind: "ahead", at: o(i.next_start) } : null;
}
function Eh(e, t, n) {
  const i = Yt(e, t, "peakSaving");
  if (!i) return null;
  const o = i.attributes, s = "Right now", r = tc(qe(o.low_adjustment), qe(o.high_adjustment));
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
      const c = Fs(o.next_start, n, e);
      return {
        title: s,
        value: "No peak now",
        desc: c ? `The next one is announced for ${c}.` : "None is announced yet."
      };
    }
    case "preconditioning": {
      const c = Fs(o.next_start, n, e), h = o.precondition === "heating";
      return {
        title: s,
        value: h ? "Warming ahead" : "Cooling ahead",
        desc: `Getting the room ready for the next peak${c ? `, starting ${c}` : ""}${r ? `: ${r}` : ""}.`
      };
    }
    case "active": {
      const c = Fs(o.ends, n, e);
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
var Dh = Object.defineProperty, Ph = Object.getOwnPropertyDescriptor, jt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ph(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Dh(t, n, o), o;
};
const za = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], _i = {
  adjust: (e) => `Couldn’t adjust ${e ?? "the room"}. Try again.`,
  retime: (e) => `Couldn’t change how long the adjustment${e ? ` in ${e}` : ""} lasts. Try again.`,
  back: "Couldn’t go back to the schedule. Try again.",
  end: "Couldn’t end the adjustment. Try again.",
  // Undo isn't offered again after a refusal: nothing to try again.
  undo: "Couldn’t undo the change.",
  feedback: (e) => `${e}: not sent. Try again.`
}, Mh = 1500, Nh = 1500, Ls = 3;
let pt = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._feedbackConfirmed = null, this._feedbackFailed = null, this._feedbackTimer = null, this._feedbackSeq = 0, this._length = null, this._pickedNext = null, this._burst = null, this._burstTimer = null, this._busy = null, this._undo = null, this._undoWait = null, this._undoTick = null, this._onStep = (e) => {
      if (this._busy) return;
      let t = this._burst;
      if (!t) {
        const o = this._bandInForce();
        if (!o || !this.entities) return;
        t = { zone: this.zone, entities: this.entities, base: o, steps: 0, picked: !1 };
      }
      const n = Eo(t.base, t.steps), i = Eo(t.base, t.steps + e);
      i.low === n.low && i.high === n.high || (this._dropUndo(), this._burst = { ...t, steps: t.steps + e }, this._burstTimer !== null && clearTimeout(this._burstTimer), this._burstTimer = setTimeout(() => this._commitBurst(), Nh));
    }, this._onPickLength = (e) => {
      if (this._busy) return;
      const t = { length: this._length, pickedNext: this._pickedNext };
      if (this._length = e, this._pickedNext = e === "next" ? this._nextChange() : null, this._burst) {
        this._burst = { ...this._burst, picked: !0, before: this._burst.before ?? t };
        return;
      }
      this._stateOf(this.entities?.overrideActive ?? null)?.state === "on" && this._dropUndo(), this._retime(e, t);
    }, this._onBackToSchedule = () => {
      if (this._busy || !this.hass || !this.zone || this._stateOf(this.entities?.overrideActive ?? null)?.state !== "on") return;
      const e = this.hass, t = this.zone;
      this._dropBurst(), this._dropUndo();
      const n = this._undoFrom(), i = this._schedule().scheduled === !0;
      this._run(
        i ? "Going back to the schedule" : "Ending the adjustment",
        i ? _i.back : _i.end,
        () => Ea(e, { zone: t }),
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
      if (!e?.shown || !this.hass || !this.zone) return;
      const t = Po(e.before, e.shown) ?? "end", n = this.hass, i = this.zone, { before: o } = e, { doing: s } = this._undoWords(o, t);
      this._dropUndo(), this._run(
        s,
        _i.undo,
        () => t === "restore" ? Xs(n, {
          zone: i,
          low: o.low,
          high: o.high,
          until: new Date(o.ends).toISOString()
        }) : Ea(n, { zone: i, low: o.low, high: o.high })
      );
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      let n = !0;
      try {
        await vh(this.hass, { zone: this.zone, label: e });
      } catch {
        n = !1;
        const i = za.find((o) => o.label === e)?.text ?? e;
        this.announce?.(_i.feedback(i));
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = n ? e : null, this._feedbackFailed = n ? null : e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackFailed = null, this._feedbackTimer = null;
      }, Mh));
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
    e.key !== this._undoKey() || !t ? this._dropUndo() : e.shown === null ? Oa(e, t) ? this._armUndo({ ...e, shown: t }) : Ho(e.before, t) || this._dropUndo() : (!Ho(e.shown, t) || Po(e.before, t) === null) && this._dropUndo();
  }
  /** Offers Undo for a change HA shows, and looks again when an earlier end
   *  it would put back gets too near to. None where it would change nothing
   *  already: Back to schedule in an adjustment's last seconds. */
  _armUndo(e) {
    if (this._clearUndoTimers(), Po(e.before, e.shown) === null) {
      this._undo = null;
      return;
    }
    this._undo = e;
    const { before: t } = e;
    ic(t) && (this._undoTick = setTimeout(
      () => {
        this._undoTick = null, this._checkUndo(), this.requestUpdate();
      },
      t.ends - nc - Date.now() + 1
    ));
  }
  /** After a change made here goes through: Undo for it, at once where HA
   *  already shows it (its state can come first), else once it does. */
  _offerUndo(e) {
    const t = this._adjustment();
    t && Oa(e, t) ? this._armUndo({ ...e, shown: t }) : t && Ho(e.before, t) && (this._clearUndoTimers(), this._undo = { ...e, shown: null }, this._undoWait = setTimeout(() => {
      this._undoWait = null, this._undo?.shown === null && (this._undo = null);
    }, zh));
  }
  _dropUndo() {
    this._clearUndoTimers(), this._undo = null;
  }
  _clearUndoTimers() {
    this._undoWait !== null && clearTimeout(this._undoWait), this._undoTick !== null && clearTimeout(this._undoTick), this._undoWait = null, this._undoTick = null;
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
  /** The band in force, to the 0.1° shown, or null when it can't be read. */
  _bandInForce() {
    const e = this._numericState(this.entities?.effectiveLow ?? null), t = this._numericState(this.entities?.effectiveHigh ?? null);
    return !Number.isFinite(e) || !Number.isFinite(t) ? null : { low: Math.round(e * 10) / 10, high: Math.round(t * 10) / 10 };
  }
  /** The room's adjustment as HA shows it, or null where its manual band,
   *  whether one runs, or a running one's end can't be read: one re-timed
   *  elsewhere couldn't be told from it (#25 review). */
  _adjustment() {
    const e = this._numericState(this.entities?.manualLow ?? null), t = this._numericState(this.entities?.manualHigh ?? null);
    if (!Number.isFinite(e) || !Number.isFinite(t)) return null;
    const n = this._stateOf(this.entities?.overrideActive ?? null)?.state;
    if (n !== "on" && n !== "off") return null;
    const i = n === "on", o = Date.parse(this._stateOf(this.entities?.overrideEnds ?? null)?.state ?? "");
    return i && !Number.isFinite(o) ? null : { active: i, ends: i ? o : null, low: e, high: t };
  }
  /** What Undo would put back of the adjustment in force, where the
   *  integration can (v0.25.0+); null where it can't. */
  _undoFrom() {
    return !this.hass || !Da(this.hass) ? null : this._adjustment();
  }
  /** The room and the entity ids Undo reads, which it's for alone. */
  _undoKey() {
    const e = this.entities;
    return [
      this.zone,
      e?.manualLow,
      e?.manualHigh,
      e?.overrideActive,
      e?.overrideEnds,
      e?.nextBandChange
    ].join("|");
  }
  _schedule(e = this.entities) {
    return !this.hass || !e ? { scheduled: null, nextChange: null } : Vl(this.hass, e);
  }
  /** The schedule's next change (ms) in the room of `entities`, where an
   *  adjustment can last until it: integration v0.25.0+, a schedule setting
   *  the range, and its next change ahead. Null otherwise. */
  _nextChange(e = this.entities, t = Date.now()) {
    if (!this.hass || !Zl(this.hass)) return null;
    const { scheduled: n, nextChange: i } = this._schedule(e);
    return n === !0 && i !== null && i > t ? i : null;
  }
  /** The length in force: the one picked here, else three hours. A picked
   *  "Until" is for the change it named: once that's passed, or while HA
   *  names another, three hours. */
  _hours(e = this.entities) {
    const t = this._length ?? Ls;
    if (t !== "next") return t;
    const n = this._nextChange(e);
    return n !== null && n === this._pickedNext ? "next" : Ls;
  }
  /** Runs a call, saying what it's doing meanwhile. A failed call is
   *  reported by HA's own toast, and `refused` said to screen readers
   *  (#53); the status falls back to what is actually in force, and a
   *  length picked for it goes back to `before` (#27). One that went
   *  through, while the tab is open on the same room, gets `undo`, where
   *  given (#25). */
  async _run(e, t, n, i, o) {
    this._busy = e;
    let s = !1;
    try {
      await n(), s = !0;
    } catch {
      i && (this._length = i.length, this._pickedNext = i.pickedNext), this.announce?.(t);
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
    const r = this.hass, c = t === "next" ? this._nextChange(s) : null, h = c !== null ? new Date(c).toISOString() : void 0, f = c !== null ? void 0 : t === "next" ? Ls : t, g = () => Xs(r, { zone: o, low: e.low, high: e.high, hours: f, until: h });
    if (o !== this.zone) {
      g().catch(() => {
        const _ = s ? wr(this.hass ?? r, { zone: o }, s) : o;
        this.announce?.(_i[n](_));
      });
      return;
    }
    const m = this._undoFrom();
    this._run(
      `Adjusting to ${zt(e)}`,
      _i[n](),
      g,
      i,
      m ? {
        before: m,
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
      Eo(e.base, e.steps),
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
    if (this._stateOf(i?.overrideActive ?? null)?.state !== "on") return;
    const o = this._numericState(i?.manualLow ?? null), s = this._numericState(i?.manualHigh ?? null);
    !Number.isFinite(o) || !Number.isFinite(s) || this._sendBand({ low: o, high: s }, e, "retime", t, n, i);
  }
  /** What Undo does, in words: "back to 19–22° until 5 pm", and the status
   *  while it does it. With no schedule, a range has no end to name. Ending
   *  the adjustment is "back to the schedule" where one sets the range, and
   *  "end the adjustment" where that can't be told. */
  _undoWords(e, t) {
    const n = zt(e), i = this._schedule().scheduled;
    if (i === !1) return { label: `back to ${n}`, doing: `Going back to ${n}` };
    if (t === "restore") {
      const o = `until ${Si(e.ends, this.hass)}`;
      return { label: `back to ${n} ${o}`, doing: `Going back to ${n} ${o}` };
    }
    return i === !0 ? { label: "back to the schedule", doing: "Going back to the schedule" } : { label: "end the adjustment", doing: "Ending the adjustment" };
  }
  render() {
    if (!this.hass || !this.entities) return k;
    const e = Date.now(), t = Oi(this.hass, this.entities), { room: n, apparent: i, useApparent: o, feelsLike: s, overrideActive: r, scheduled: c } = t, { low: h, high: f } = t.band, g = Ul({ room: n, apparent: i, useApparent: o }), m = nh(t), _ = this._burst, S = _ && _.steps !== 0 ? `Adjusting to ${zt(Eo(_.base, _.steps))}` : this._busy, A = Il({
      ...t,
      peak: xr(this.hass, this.entities),
      doing: S,
      now: e,
      formatTime: (O) => Si(O, this.hass)
    });
    return v`
      <div class="temperature">
        <span class="value"
          >${Number.isFinite(g.value) ? `${g.value.toFixed(1)}°` : "—"}</span
        >
        ${g.note ? v`<span class="note">${g.note}</span>` : k}
      </div>
      ${o && !Number.isFinite(i) && Number.isFinite(n) ? v`<div class="warn">
            Apparent temperature mode is on but no humidity reading is available — decisions are
            using the raw room temperature.
          </div>` : k}
      <div class="gauge-row">
        <band-gauge
          .low=${h}
          .high=${f}
          .room=${g.value}
          .roomLabel=${s ? "feels like" : "room"}
          .action=${_r(t) ? t.action : "unknown"}
        ></band-gauge>
      </div>
      <div class="status ${A.kind}" role="status" aria-live="polite">
        <ha-icon icon=${vn[A.kind]} aria-hidden="true"></ha-icon>
        <span>${A.text}</span>
      </div>
      ${m ? v`<div class="notice">${m}</div>` : k}
      ${this._renderAdjust(r, c)} ${this._renderFeedbackSection()}
    `;
  }
  _renderAdjust(e, t) {
    const n = this._busy !== null ? "true" : "false", i = this._hours(), o = this._nextChange();
    return v`
      <section class="adjust">
        ${t === !1 ? k : v`<h3 id="adjust-for">Adjust for</h3>
              <div class="lengths" role="group" aria-labelledby="adjust-for">
                ${(o !== null ? [1, 3, "next"] : [1, 3]).map(
      (r) => v`<button
                      aria-pressed=${i === r ? "true" : "false"}
                      aria-disabled=${n}
                      data-length=${r}
                      @click=${() => this._onPickLength(r)}
                    >
                      ${r === "next" ? v`Until <span class="time">${Si(o, this.hass)}</span>` : `${r} h`}
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
            </div>` : k}
        ${t === !1 ? k : v`<button
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
    if (!this.hass || !Da(this.hass)) return k;
    const e = this._undo?.shown ? this._undo : null, t = e ? this._undoWords(e.before, Po(e.before, e.shown) ?? "end").label : null;
    return v`<button
      class="undo"
      aria-disabled=${e ? "false" : "true"}
      aria-label=${t ? `Undo: ${t}` : k}
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
          ${za.map(
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
pt.styles = [
  We,
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
        /* A border as well as the fill, so the choice shows in forced colours. */
        border: 2px solid currentColor;
        color: #ffffff;
        font-weight: 500;
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
jt([
  D({ attribute: !1 })
], pt.prototype, "hass", 2);
jt([
  D({ type: String })
], pt.prototype, "zone", 2);
jt([
  D({ attribute: !1 })
], pt.prototype, "entities", 2);
jt([
  D({ attribute: !1 })
], pt.prototype, "announce", 2);
jt([
  G()
], pt.prototype, "_feedbackConfirmed", 2);
jt([
  G()
], pt.prototype, "_feedbackFailed", 2);
jt([
  G()
], pt.prototype, "_length", 2);
jt([
  G()
], pt.prototype, "_burst", 2);
jt([
  G()
], pt.prototype, "_busy", 2);
jt([
  G()
], pt.prototype, "_undo", 2);
pt = jt([
  Ie("comfort-band-now-tab")
], pt);
const nc = 5e3, zh = 1e4;
function Oh(e, t) {
  return !(e.active !== t.active || e.low !== void 0 && Math.abs(e.low - t.low) > 0.05 || e.high !== void 0 && Math.abs(e.high - t.high) > 0.05 || e.ends !== void 0 && (t.ends === null || Math.abs(e.ends - t.ends) > 1e3));
}
function Ho(e, t) {
  return e.active === t.active && e.ends === t.ends && e.low === t.low && e.high === t.high;
}
function Oa(e, t) {
  return Oh(e.expect, t) && !Ho(e.before, t);
}
function ic(e, t = Date.now()) {
  return e.active && e.ends !== null && e.ends > t + nc;
}
function Po(e, t) {
  return ic(e) ? "restore" : t.active ? "end" : null;
}
var Fh = Object.defineProperty, Lh = Object.getOwnPropertyDescriptor, $r = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Lh(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Fh(t, n, o), o;
};
const Mo = 14, No = 28, Hn = 600, Ji = 200, Hs = [0, 6, 12, 18, 24], to = 32, Fa = [14, 18, 22, 26];
function xn(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function La(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
let fo = class extends Te {
  constructor() {
    super(...arguments), this.transitions = [], this.now = null;
  }
  _timeToX(e) {
    return e / (24 * 60) * Hn;
  }
  _tempToY(e) {
    const t = La(e, Mo, No);
    return Ji - (t - Mo) / (No - Mo) * Ji;
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
    return i.push([Hn, this._tempToY(o)]), i;
  }
  _pointsToPath(e) {
    return e.map(([t, n], i) => `${i === 0 ? "M" : "L"} ${t} ${n}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const n = this._pointsToPath(e), i = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${n} ${i} Z`;
  }
  render() {
    const e = [...this.transitions].sort((h, f) => xn(h.at) - xn(f.at)), t = e.length > 0, n = t ? this._stepPoints(e, "low") : [], i = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(n) : "", s = t ? this._pointsToPath(i) : "", r = t ? this._fillFromPoints(i, n) : "", c = this.now !== null && Number.isFinite(this.now) ? this._timeToX(La(this.now, 0, 24 * 60)) : null;
    return v`
      <div class="chart">
        <svg
          viewBox="0 0 ${Hn} ${Ji}"
          preserveAspectRatio="none"
          role="img"
          aria-label="The comfortable range through the day"
        >
          <title>The comfortable range through the day</title>
          ${Fa.map(
      (h) => Zi`<line class="grid" x1="0" x2=${Hn} y1=${this._tempToY(h)} y2=${this._tempToY(h)}></line>`
    )}
          ${Hs.map(
      (h) => Zi`<line class="grid" y1="0" y2=${Ji} x1=${h / 24 * Hn} x2=${h / 24 * Hn}></line>`
    )}
          ${t ? Zi`
                <path class="fill" d=${r}></path>
                <path class="line low" d=${o}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((h) => {
      const f = this._timeToX(xn(h.at));
      return Zi`
              <line class="marker low" x1=${f} x2=${f} y1=${this._tempToY(h.low)} y2=${this._tempToY(h.low)}></line>
              <line class="marker high" x1=${f} x2=${f} y1=${this._tempToY(h.high)} y2=${this._tempToY(h.high)}></line>
            `;
    })}
          ${c !== null ? Zi`<line class="now-line" x1=${c} x2=${c} y1="0" y2=${Ji}></line>` : null}
        </svg>
        ${c !== null ? v`<div
              class="now-label"
              aria-hidden="true"
              style="left: calc(${to}px + (100% - ${to}px) * ${c / Hn})"
            >
              Now
            </div>` : null}
        ${Fa.map(
      (h) => v`<div
              class="axis-label y"
              style="top: ${(No - h) / (No - Mo) * 100}%"
            >
              ${h}°
            </div>`
    )}
        ${Hs.map((h, f) => {
      const g = f === 0 ? "axis-label x start" : f === Hs.length - 1 ? "axis-label x end" : "axis-label x";
      return v`<div
            class=${g}
            style="left: calc(${to}px + (100% - ${to}px) * ${h / 24})"
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
fo.styles = [
  We,
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
        padding-left: ${qo(to)}px;
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
      /* A swatch of the line's colour: text in it would be too faint. */
      .legend span::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 3px;
        margin-right: 6px;
        vertical-align: middle;
        border-radius: 2px;
      }
      .legend .low::before {
        background: var(--cb-action-heating);
      }
      .legend .high::before {
        background: var(--cb-action-cooling);
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
$r([
  D({ type: Array })
], fo.prototype, "transitions", 2);
$r([
  D({ attribute: !1 })
], fo.prototype, "now", 2);
fo = $r([
  Ie("comfort-band-schedule-chart")
], fo);
var Hh = Object.defineProperty, Rh = Object.getOwnPropertyDescriptor, Sn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Rh(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Hh(t, n, o), o;
};
let Jt = class extends Te {
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
Jt.styles = [
  We,
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
Sn([
  D({ type: Object })
], Jt.prototype, "transition", 2);
Sn([
  D({ type: Boolean })
], Jt.prototype, "isNew", 2);
Sn([
  G()
], Jt.prototype, "_at", 2);
Sn([
  G()
], Jt.prototype, "_low", 2);
Sn([
  G()
], Jt.prototype, "_high", 2);
Sn([
  G()
], Jt.prototype, "_error", 2);
Sn([
  zi('input[name="at"]')
], Jt.prototype, "_atInput", 2);
Jt = Sn([
  Ie("transition-edit-dialog")
], Jt);
function Ha(e, t) {
  const n = t?.config?.time_zone;
  if (n)
    try {
      const o = new Intl.DateTimeFormat("en-GB", {
        timeZone: n,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(e), s = Number(o.find((c) => c.type === "hour")?.value), r = Number(o.find((c) => c.type === "minute")?.value);
      if (Number.isFinite(s) && Number.isFinite(r)) return s * 60 + r;
    } catch {
    }
  const i = new Date(e);
  return i.getHours() * 60 + i.getMinutes();
}
function jh(e, t) {
  if (e.length === 0) return null;
  let n = e.length - 1;
  for (let i = 0; i < e.length; i++)
    xn(e[i].at) <= t && (n = i);
  return n;
}
function Uh(e) {
  if (e.length < 2) return e.map(() => !1);
  const t = (n) => Math.round(n * 10);
  return e.map((n, i) => {
    const o = e[(i + e.length - 1) % e.length];
    return t(n.low) === t(o.low) && t(n.high) === t(o.high);
  });
}
function Io(e, t) {
  const n = t.scheduleAssignment;
  if (typeof n != "string") return ro(t, "v0.14") ? null : !0;
  const i = e.states[n];
  if (!i || i.state === "unavailable") return null;
  const o = i.attributes.schedule_id;
  return o === null ? !0 : typeof o == "string" ? !1 : null;
}
function Bh(e, t) {
  if (Io(e, t) !== !1) return null;
  const n = e.states[t.scheduleAssignment];
  return n?.state && n.state !== "unknown" ? n.state : null;
}
function Ih(e, t, n) {
  const i = Oi(e, t);
  if (!Number.isFinite(i.band.low) || !Number.isFinite(i.band.high)) return null;
  const o = e.config?.time_zone, s = (c) => c !== null && c > n;
  let r = "";
  if (i.overrideActive)
    i.scheduled === !0 && (r = s(i.overrideEnds) ? `, adjusted until ${Wn(i.overrideEnds, n, e, o)}` : ", adjusted");
  else {
    const c = xr(e, t);
    c?.kind === "relaxed" ? r = s(c.at) ? `, relaxed for a peak until ${Wn(c.at, n, e, o)}` : ", relaxed for a peak" : c?.kind === "ahead" && (r = s(c.at) ? `, getting ready for a peak starting ${Wn(c.at, n, e, o)}` : ", getting ready for a peak");
  }
  return `Now ${zt(i.band)}${r}`;
}
function Wh(e, t, n) {
  const i = Oi(e, t);
  if (i.scheduled !== !0 || i.nextChange === null || i.nextChange <= n) return null;
  const o = t.nextBandChange, s = o !== null ? e.states[o]?.attributes : void 0, r = s?.low, c = s?.high;
  if (typeof r != "number" || typeof c != "number" || !Number.isFinite(r) || !Number.isFinite(c)) return null;
  const h = Wn(i.nextChange, n, e, e.config?.time_zone);
  return `The ${Io(e, t) === !1 ? "shared schedule" : "schedule"}’s next change: ${h} → ${zt({ low: r, high: c })}`;
}
var Gh = Object.defineProperty, Vh = Object.getOwnPropertyDescriptor, Ze = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Vh(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Gh(t, n, o), o;
};
function Ra(e, t) {
  return xn(e.at) - xn(t.at);
}
const Rs = 15, js = 24 * 60;
function Kh(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((i) => xn(i.at))), n = Math.max(...t);
  for (let i = 1; i <= js / Rs; i++) {
    const o = (n + i * Rs) % js;
    if (!t.has(o)) return ja(o);
  }
  return ja((n + Rs) % js);
}
function ja(e) {
  const t = Math.floor(e / 60), n = e % 60;
  return `${t.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
let Be = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._editingList = !1, this._now = Date.now(), this._clock = null, this._scheduled = null, this._focusAfterMode = null, this._profile = "", this._listProfile = "", this._listZone = "", this._profileNotice = null, this._focusNotice = !1, this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._confirmingDeleteAt = null, this._adding = null, this._focusTrigger = null, this._subscribeGen = 0, this._onEditSchedule = () => {
      this._editingList = !0, this._focusAfterMode = "add";
    }, this._onDoneEditing = () => {
      this._editingList = !1, this._confirmingDeleteAt = null, this._focusAfterMode = "edit";
    }, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._adding = {
        at: Kh(this._transitions),
        low: qh(this._transitions),
        high: Yh(this._transitions)
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
      n.sort(Ra), this._exitDialogMode(), await this._writeSchedule(n);
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
    (t.has("_mode") && this._mode !== "list" || t.has("_confirmingDeleteAt") && this._confirmingDeleteAt !== null) && (this._profileNotice = null), e.has("hass") && this.hass && this._profile === "" && (this._profile = Ua(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((n) => n.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    const t = e.has("hass") && this.hass ? Ua(this.hass) : null, n = t && t !== this._profile ? t : null, i = e.has("zone") && e.get("zone") !== void 0;
    if ((n || i) && (this._profileNotice = null, (this._mode !== "list" || this._confirmingDeleteAt !== null) && this._dropChange(i ? Ia : Ba(this._listProfile, n)), n && (this._profile = n), this._transitions = [], this._listProfile = "", this._listZone = "", this._resubscribe()), this._focusNotice) {
      const o = this.shadowRoot?.querySelector(".profile-notice");
      o && (this._focusNotice = !1, o.focus());
    }
    if (e.has("_confirmingDeleteAt") && this._confirmingDeleteAt !== null && this.shadowRoot?.querySelector(
      "li.row.confirm .button.secondary"
    )?.focus(), this._focusAfterMode) {
      const o = this._focusAfterMode;
      this._focusAfterMode = null, this.shadowRoot?.querySelector(
        o === "add" ? ".list-toolbar .button.primary" : ".list-toolbar .button.secondary"
      )?.focus();
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
      const i = await dh(this.hass, { zone: t, profile: n }, (o) => {
        e === this._subscribeGen && (this._listZone = t, this._listProfile = n, this._transitions = o?.baseline ? [...o.baseline].sort(Ra) : [], this._loading = !1);
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
    n = n ?? t.querySelector(".list-toolbar button.primary"), n?.focus();
  }
  async _writeSchedule(e) {
    if (!this.hass) return;
    if (this._listZone !== this.zone || this._listProfile !== this._profile) {
      this._profileNotice = this._listZone !== this.zone ? Ia : Ba(this._listProfile, this._profile), this._focusTrigger = null, this._focusNotice = !0;
      return;
    }
    const t = this._transitions;
    this._transitions = e;
    try {
      await fh(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (n) {
      this._transitions === e && (this._transitions = t), this._error = n instanceof Error ? n.message : "Failed to save schedule.";
    }
  }
  render() {
    if (!this.hass) return k;
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
      ${this._profileNotice ? v`<div class="profile-notice" role="status" tabindex="-1">${this._profileNotice}</div>` : k}
      ${this._renderNow()}
      ${this._loading ? v`<div class="loading">Loading schedule…</div>` : this._error ? v`<div class="error" role="alert">${this._error}</div>` : v`
              <comfort-band-schedule-chart
                .transitions=${this._transitions}
                .now=${e ? Ha(this._now, this.hass) : null}
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
    return !this.hass || !this._listProfile || !Bo(this.hass) ? k : v`<div class="header">
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
    if (!this.hass || !this.entities || this._transitions.length === 0 || Io(this.hass, this.entities) !== !0) return !1;
    const e = Qo(this.hass), t = e ? this.hass.states[e] : void 0;
    return yr(t) ? t.state === this._listProfile : !Bo(this.hass);
  }
  /** The range in force now, from the integration's entities, and why it
   *  differs from the schedule's where that can be told; the schedule's
   *  next change, where a schedule sets the range (its place kept while its
   *  words, or whether a schedule sets the range, can't be read); and
   *  whether the room follows a shared schedule. */
  _renderNow() {
    if (!this.hass || !this.entities) return k;
    const e = Ih(this.hass, this.entities, this._now), t = this._scheduled === !0, n = t ? Wh(this.hass, this.entities, this._now) : null, i = Io(this.hass, this.entities) === !1, o = Bh(this.hass, this.entities);
    return v`
      <div class="now-line">${e ?? k}</div>
      ${t ? v`<div class="next-change">${n ?? k}</div>` : k}
      ${i ? v`<div class="shared-note">
            This room follows ${o ? `“${o}”, a shared schedule` : "a shared schedule"}.
            The changes below are this room’s own, not the ones in force.
          </div>` : k}
    `;
  }
  _renderList(e) {
    if (this._transitions.length === 0)
      return v`<div class="empty">
        ${this._editingList ? "No changes yet. Use “Add a change” to create one." : "No changes yet."}
      </div>`;
    const t = e ? jh(this._transitions, Ha(this._now, this.hass)) : null, n = Uh(this._transitions);
    return v`
      <ul class="list" role="list">
        ${this._transitions.map(
      (i, o) => this._confirmingDeleteAt === i.at ? this._renderConfirmRow(i) : this._editingList ? this._renderRow(i, o === t, n[o]) : this._renderReadRow(i, o === t, n[o])
    )}
      </ul>
    `;
  }
  _tags(e, t) {
    return v`${e ? v`<span class="tag current">Current</span>` : k}
    ${t ? v`<span class="tag same">Same as before</span>` : k}`;
  }
  _renderReadRow(e, t, n) {
    return v`
      <li
        class="row read ${t ? "current" : ""}"
        role="listitem"
        data-at=${e.at}
        aria-current=${t ? "true" : k}
      >
        <span class="at">${Ns(e.at, this.hass)}</span>
        <span class="band">${zt(e)}</span>
        ${this._tags(t, n)}
      </li>
    `;
  }
  _renderRow(e, t, n) {
    const i = Ns(e.at, this.hass), o = [
      `Edit the ${i} change, ${Zt(e.low)} to ${Zt(e.high)} degrees`,
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
        aria-current=${t ? "true" : k}
        @click=${this._onRowClicked(e)}
        @keydown=${this._onRowKeydown(e)}
      >
        <span class="at">${i}</span>
        <span class="band">${zt(e)}</span>
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
    const t = `Delete the ${Ns(e.at, this.hass)} change?`;
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
Be.styles = [
  We,
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
        margin-left: auto;
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
], Be.prototype, "hass", 2);
Ze([
  D({ type: String })
], Be.prototype, "zone", 2);
Ze([
  D({ attribute: !1 })
], Be.prototype, "entities", 2);
Ze([
  G()
], Be.prototype, "_editingList", 2);
Ze([
  G()
], Be.prototype, "_now", 2);
Ze([
  G()
], Be.prototype, "_profile", 2);
Ze([
  G()
], Be.prototype, "_listProfile", 2);
Ze([
  G()
], Be.prototype, "_listZone", 2);
Ze([
  G()
], Be.prototype, "_profileNotice", 2);
Ze([
  G()
], Be.prototype, "_transitions", 2);
Ze([
  G()
], Be.prototype, "_loading", 2);
Ze([
  G()
], Be.prototype, "_error", 2);
Ze([
  G()
], Be.prototype, "_mode", 2);
Ze([
  G()
], Be.prototype, "_editing", 2);
Ze([
  G()
], Be.prototype, "_confirmingDeleteAt", 2);
Be = Ze([
  Ie("comfort-band-schedule-tab")
], Be);
function Ua(e) {
  const t = Qo(e);
  if (!t) return null;
  const n = e.states[t];
  return !n || (n.state === "unavailable" || n.state === "unknown") && n.attributes.default_profile === void 0 ? null : n.state;
}
function Ba(e, t) {
  return `The active profile is “${t}”, so your change to the “${e}” schedule wasn’t saved.`;
}
const Ia = "This card now shows a different room, so your change wasn’t saved.";
function qh(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Yh(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Zh = Object.defineProperty, Jh = Object.getOwnPropertyDescriptor, Fi = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Jh(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Zh(t, n, o), o;
};
const Qh = 1e3, Xh = 15e3, vi = (e, t, n) => ({
  kind: "switch",
  field: e,
  title: t,
  desc: n
}), xt = (e, t, n) => ({
  kind: "number",
  field: e,
  title: t,
  desc: n
}), Us = (e, t, n, i) => ({ kind: "select", field: e, title: t, desc: n, label: i }), oc = (e) => e, ed = {
  comfort: {
    main: [
      vi(
        "useApparentTemperature",
        "Use “feels like”",
        "When on, heating and cooling go by the humidity-adjusted “feels like” temperature instead of the room’s own reading. Falls back to the room’s reading automatically if the humidity sensor is unavailable."
      ),
      xt(
        "deadbandBelow",
        "Heating starts below the range by",
        "How far below the range the room may drop before heating starts; heating stops at the bottom of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and heats towards the top of the range."
      ),
      xt(
        "deadbandAbove",
        "Cooling starts above the range by",
        "How far above the range the room may rise before cooling starts; cooling stops at the top of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and cools towards the bottom of the range."
      ),
      xt(
        "bandRampMinutes",
        "Ease schedule changes over",
        "Spreads each change of range over this long, centred on its time, instead of changing all at once. 0 changes at once."
      ),
      xt(
        "overrideHours",
        "Adjustments made elsewhere last",
        "How long an adjustment lasts when it’s started without a length: from the device page, or an automation that doesn’t give one. Warmer, Cooler and the exact range here set their own length."
      )
    ]
  },
  automation: {
    main: [
      vi(
        "enabled",
        "Control this room",
        "When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused."
      ),
      vi(
        "learningEnabled",
        "Learning",
        "Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings."
      ),
      vi(
        "mpcEnabled",
        "Predictive control",
        "Plans heating and cooling ahead, from what the room has learned and the schedule coming up. Needs Learning on. It plans only while it has recent enough readings of how this room warms and cools, usually after a few hours of normal running."
      )
    ],
    fine: [
      xt(
        "lookaheadMinutes",
        "Look ahead by",
        "How far ahead learning projects the room’s temperature, to start or stop early, or hold off."
      ),
      xt(
        "passiveTolerance",
        "Let it drift back within",
        "How far outside the range the room may be for learning to let it drift back on its own, rather than heat or cool."
      ),
      xt(
        "mpcHorizonMinutes",
        "Plan ahead by",
        "How far ahead predictive control plans, schedule changes included."
      ),
      xt(
        "minCycleMinutes",
        "Repeat a command no sooner than",
        "The least time before the unit is sent the same command again, such as a new setting while it’s already heating."
      ),
      xt(
        "crossModeMinMinutes",
        "Switch between heating and cooling no sooner than",
        "The least time between heating and then cooling, or the other way round."
      )
    ]
  },
  fan: {
    main: [
      vi(
        "fanControlEnabled",
        "Fan control",
        "Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen."
      ),
      Us(
        "activeFanMode",
        "Fan while heating or cooling",
        "The fan speed while the unit is working. Peak saving can leave it as it is during a peak.",
        Wa
      ),
      Us(
        "idleFanMode",
        "Fan while idle",
        "The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed.",
        Wa
      )
    ]
  },
  peak: {
    main: [
      vi(
        "peakSavingEnabled",
        "Peak saving",
        "Runs heating and cooling less in expensive power times. During one, the range widens, so the room drifts further before heating or cooling starts. Ahead of one that’s announced, the room can be warmed or cooled a little within its range. An adjustment in force sets both aside. Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure."
      ),
      xt(
        "peakHeatOffset",
        "Relax the bottom of the range by",
        "How far the bottom of the range drops during a peak; heating still starts the usual amount below it. Ahead of one, up to how far the bottom rises to warm the room first."
      ),
      xt(
        "peakCoolOffset",
        "Relax the top of the range by",
        "How far the top of the range rises during a peak; cooling still starts the usual amount above it. Ahead of one, up to how far the top falls to cool the room first."
      ),
      xt(
        "peakPreconditionMinutes",
        "Prepare ahead by",
        "How long before an announced peak to warm or cool the room. 0 doesn’t prepare."
      )
    ]
  },
  schedules: {
    main: [
      Us(
        "scheduleAssignment",
        "Follows",
        "Which schedule sets this room’s range: its own, or one shared with other rooms. The Schedule tab shows and changes the room’s own schedule, even while it follows a shared one.",
        oc
      )
    ]
  }
}, td = {
  fan: { what: "Fan control needs", since: "v0.13.0" },
  peak: { what: "Peak saving needs", since: "v0.24.0" },
  schedules: { what: "Choosing a shared schedule needs", since: "v0.14.0" }
};
function Wa(e) {
  if (e === "(none)") return "Leave as it is";
  const t = e.replace(/[-_]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Wo(e) {
  const t = String(e), n = t.indexOf(".");
  return n < 0 ? 0 : t.length - n - 1;
}
function nd(e, t) {
  return Math.max(Wo(t), Wo(Number(e.toFixed(3))));
}
function id(e) {
  const t = typeof e == "object" && e !== null ? e.message : void 0;
  return typeof t == "string" && t ? t : "That setting couldn’t be changed.";
}
function yi(e) {
  const t = typeof e == "number" ? e : Number.parseFloat(String(e));
  return Number.isFinite(t) ? t : null;
}
let $n = class extends Te {
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
    for (const [e, { baseline: t }] of [...this._settling])
      this.hass?.states[e] !== t && this._drop(e);
  }
  _entity(e) {
    const t = this.entities?.[e];
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
        this._error?.entityId === e && (this._error = null), r() && (this._reported(e, t) || !this.isConnected ? this._drop(e) : this._settle(e));
      },
      (c) => {
        this._error = { entityId: e, message: id(c) }, r() && this._drop(e);
      }
    );
  }
  /** Whether HA's state for the entity already says the value. */
  _reported(e, t) {
    const n = this.hass?.states[e]?.state;
    return typeof t == "boolean" ? n === (t ? "on" : "off") : typeof t == "number" ? Number.parseFloat(n ?? "") === t : n === t;
  }
  /** Keeps a value that has gone through showing until HA's state for its
   *  entity changes, or for SETTLE_MS at most. */
  _settle(e) {
    this._stopSettling(e), this._settling.set(e, {
      baseline: this.hass?.states[e],
      timer: setTimeout(() => this._drop(e), Xh)
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
    const t = this._pending[e];
    return typeof t == "boolean" ? t : this.hass?.states[e]?.state === "on";
  }
  _onStep(e, t) {
    const n = this.hass?.states[e];
    if (!n) return;
    const i = yi(n.attributes.step) ?? 1, o = yi(n.attributes.min) ?? -1 / 0, s = yi(n.attributes.max) ?? 1 / 0, r = this._pending[e], c = typeof r == "number" ? r : Number.parseFloat(n.state), h = Number.isFinite(o) ? o : 0, f = (c - h) / i, g = t > 0 ? Math.floor(f + 1e-9) + 1 : Math.ceil(f - 1e-9) - 1, m = Math.max(Wo(i), Wo(h)), _ = Math.min(s, Math.max(o, Number((h + g * i).toFixed(m))));
    this._pending = { ...this._pending, [e]: _ }, this._error = null, this._stopSettling(e);
    const S = this._timers.get(e);
    S !== void 0 && clearTimeout(S), this._timers.set(
      e,
      setTimeout(() => {
        this._timers.delete(e), this._send(e, _, "number", "set_value", { value: _ });
      }, Qh)
    );
  }
  _onChoose(e, t) {
    this._pending = { ...this._pending, [e]: t }, this._error = null, this._stopSettling(e), this._send(e, t, "select", "select_option", { option: t });
  }
  render() {
    if (!this.hass || !this.entities) return k;
    const { main: e, fine: t = [] } = ed[this.section], n = (h) => h.filter((f) => this._entity(f.field) !== null), i = n(e), o = n(t), s = e.length + t.length - i.length - o.length, r = i.length + o.length === 0, c = td[this.section];
    return v`
      ${this._error ? v`<div class="error" role="alert">${this._error.message}</div>` : k}
      ${this.section === "peak" ? this._renderStatus(Eh(this.hass, this.entities, Date.now()), "peak") : k}
      ${i.map((h) => this._renderSetting(h))}
      ${this.section === "comfort" ? v`${this._renderHumidity()}
          ${this._renderStatus(Ch(this.hass, this.entities), "source")}` : k}
      ${this.section === "automation" ? this._renderStatus(Ah(this.hass, this.entities), "readiness") : k}
      ${o.length ? v`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${o.map((h) => this._renderSetting(h))}
          </details>` : k}
      ${r ? v`<div class="upgrade-hint">
            ${c ? v`${c.what} the <code>comfort_band</code> integration ${c.since} or
                  later, with its entities turned on.` : v`These settings’ entities are turned off. Turn them on from this room’s device
                page, under Settings → Devices &amp; Services.`}
          </div>` : s > 0 ? v`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>` : k}
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
    ` : k;
  }
  _renderHumidity() {
    const e = this.entities.roomTemperature, t = e !== null ? this.hass.states[e] : void 0, n = t !== void 0 && t.state !== "unavailable", i = n ? Yl(this.hass, e) : null, o = t === void 0 ? "Can’t be read" : n ? i ? this._sensorText(i) : "Not configured" : "Can’t be read right now";
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
    const n = this.hass.states[e], i = yi(n?.attributes.step) ?? 1, o = yi(n?.attributes.min), s = yi(n?.attributes.max), r = typeof n?.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : "", c = this._pending[e], h = typeof c == "number" ? c : Number.parseFloat(n?.state ?? ""), f = Number.isFinite(h), g = f ? `${h.toFixed(nd(h, i))}${r ? ` ${r}` : ""}` : "—", m = `t-${t.field}`, _ = !f || o !== null && h <= o, S = !f || s !== null && h >= s;
    return v`
      <div class="row num" data-setting=${t.field}>
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
            aria-disabled=${S ? "true" : "false"}
            @click=${() => !S && this._onStep(e, 1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
  _renderSelect(e, t) {
    const n = this.hass.states[e], i = Array.isArray(n?.attributes.options) ? n.attributes.options.filter((g) => typeof g == "string") : [], o = this._pending[e], s = typeof o == "string" ? o : n?.state ?? "", r = `t-${t.field}`, c = n?.state === "unavailable" || i.length === 0, h = i.includes(s), f = t.label ?? oc;
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
          @change=${(g) => this._onChoose(e, g.target.value)}
        >
          ${h && !c ? k : v`<option value="" disabled .selected=${!0}>
                ${c ? "Unavailable" : "—"}
              </option>`}
          ${i.map(
      (g) => v`<option value=${g} .selected=${!c && g === s}>
                ${f(g)}
              </option>`
    )}
        </select>
      </div>
    `;
  }
  _renderToggle(e) {
    const t = this._isOn(e.entityId), n = this._pending[e.entityId] !== void 0, i = this.hass.states[e.entityId]?.state;
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
$n.styles = [
  We,
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
        margin-left: auto;
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
        margin-left: auto;
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
        font-size: 14px;
        text-overflow: ellipsis;
        /* With its own look, WebKit lets a long option's text out of the box. */
        overflow: hidden;
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
Fi([
  D({ attribute: !1 })
], $n.prototype, "hass", 2);
Fi([
  D({ attribute: !1 })
], $n.prototype, "entities", 2);
Fi([
  D({ type: String })
], $n.prototype, "section", 2);
Fi([
  G()
], $n.prototype, "_pending", 2);
Fi([
  G()
], $n.prototype, "_error", 2);
$n = Fi([
  Ie("comfort-band-settings-tab")
], $n);
var od = Object.defineProperty, sd = Object.getOwnPropertyDescriptor, cn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? sd(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && od(t, n, o), o;
};
let Ot = class extends Te {
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
Ot.styles = [
  We,
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
cn([
  D({ type: String })
], Ot.prototype, "mode", 2);
cn([
  D({ type: String })
], Ot.prototype, "existingName", 2);
cn([
  D({ type: Array })
], Ot.prototype, "existingNames", 2);
cn([
  D({ type: Boolean })
], Ot.prototype, "busy", 2);
cn([
  G()
], Ot.prototype, "_name", 2);
cn([
  G()
], Ot.prototype, "_description", 2);
cn([
  G()
], Ot.prototype, "_error", 2);
cn([
  zi('input[name="name"]')
], Ot.prototype, "_nameInput", 2);
Ot = cn([
  Ie("profile-edit-dialog")
], Ot);
var rd = Object.defineProperty, ad = Object.getOwnPropertyDescriptor, An = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ad(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && rd(t, n, o), o;
};
let Qt = class extends Te {
  constructor() {
    super(...arguments), this._mode = "list", this._target = null, this._openMenu = null, this._error = null, this._busy = !1, this._menuOpenedByKeyboard = !1, this._dialogTrigger = null, this._onDocumentClick = (e) => {
      if (this._openMenu === null) return;
      e.composedPath().some(
        (i) => i instanceof HTMLElement && (i.classList?.contains("menu") || i.classList?.contains("overflow"))
      ) || (this._openMenu = null);
    }, this._onDialogCancel = () => {
      this._busy || (this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog());
    }, this._onDialogSave = async (e) => {
      if (!this.hass || this._busy) return;
      const { name: t, description: n } = e.detail, i = this._mode, o = this._target;
      this._busy = !0, this._error = null;
      try {
        if (i === "create")
          await mh(this.hass, { name: t, description: n });
        else if (i === "clone" && o)
          await gh(this.hass, { source: o, target: t, description: n });
        else if (i === "rename" && o)
          t !== o && await bh(this.hass, { old: o, new: t });
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
        await _h(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Qo(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!yr(t)) return null;
    const n = t.attributes.options, i = Array.isArray(n) ? n.filter((g) => typeof g == "string") : [], o = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, r = typeof s == "string" && !!s, c = r ? s : "home", h = t.attributes.descriptions, f = {};
    if (h && typeof h == "object" && !Array.isArray(h))
      for (const [g, m] of Object.entries(h))
        typeof m == "string" && (f[g] = m);
    return { options: i, active: o, defaultProfile: c, descriptions: f, crudAvailable: r };
  }
  _onSelect(e) {
    this.hass && ph(this.hass, { profile: e }).catch(
      () => this.announce?.(`Couldn’t switch to “${e}”. Try again.`)
    );
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
        const r = this.shadowRoot?.querySelectorAll("li[data-profile]");
        (r ? Array.from(r).find((h) => h.dataset.profile === t) : void 0)?.querySelector(".overflow")?.focus();
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
    const i = this.shadowRoot?.activeElement, o = i ? n.indexOf(i) : -1;
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
      if (e === "__new__") {
        this.shadowRoot?.querySelector(".new-profile")?.focus();
        return;
      }
      const t = this.shadowRoot?.querySelectorAll("li[data-profile]");
      (t ? Array.from(t).find((i) => i.dataset.profile === e) : void 0)?.querySelector(".overflow")?.focus();
    });
  }
  render() {
    if (!this.hass) return k;
    const e = this._readState();
    if (e === null)
      return Bo(this.hass) ? v`<div class="empty">
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
          </button>` : k}
      <ul aria-label="Profiles">
        ${t.map(
      (r, c) => this._renderRow(r, c, n, i, o, s)
    )}
      </ul>
      ${s ? k : v`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, n, i, o, s) {
    const r = e === n, c = e === i, h = o[e] ?? "", f = `cb-profile-menu-${t}`;
    return v`
      <li
        data-profile=${e}
        tabindex="0"
        class=${r ? "active" : ""}
        aria-current=${r ? "true" : k}
        @click=${() => this._onSelect(e)}
        @keydown=${(g) => {
      if (g.key === "Escape" && this._openMenu !== null) {
        g.preventDefault(), g.stopPropagation(), this._openMenu = null, this._menuOpenedByKeyboard = !1;
        return;
      }
      g.target === g.currentTarget && (g.key === "Enter" || g.key === " ") && (g.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${h ? v`<span class="description">${h}</span>` : k}
        </span>
        ${r ? v`<span class="badge">Active</span>` : k}
        ${s ? v`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? f : k}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(g) => this._toggleMenu(e, g)}
            >
              ⋮
            </button>` : k}
        ${this._openMenu === e ? v`
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
                  ?disabled=${c}
                  aria-disabled=${c}
                  @click=${(g) => {
      g.stopPropagation(), c || this._onDelete(e);
    }}
                  title=${c ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : k}
      </li>
    `;
  }
};
Qt.styles = [
  We,
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
An([
  D({ attribute: !1 })
], Qt.prototype, "hass", 2);
An([
  D({ attribute: !1 })
], Qt.prototype, "announce", 2);
An([
  G()
], Qt.prototype, "_mode", 2);
An([
  G()
], Qt.prototype, "_target", 2);
An([
  G()
], Qt.prototype, "_openMenu", 2);
An([
  G()
], Qt.prototype, "_error", 2);
An([
  G()
], Qt.prototype, "_busy", 2);
Qt = An([
  Ie("comfort-band-profiles-tab")
], Qt);
const ld = !0, Oe = "u-", cd = "uplot", ud = Oe + "hz", hd = Oe + "vt", dd = Oe + "title", fd = Oe + "wrap", pd = Oe + "under", md = Oe + "over", gd = Oe + "axis", Bn = Oe + "off", bd = Oe + "select", _d = Oe + "cursor-x", vd = Oe + "cursor-y", yd = Oe + "cursor-pt", wd = Oe + "legend", xd = Oe + "live", $d = Oe + "inline", kd = Oe + "series", Sd = Oe + "marker", Ga = Oe + "label", Ad = Oe + "value", no = "width", io = "height", Qi = "top", Va = "bottom", wi = "left", Bs = "right", kr = "#000", Ka = kr + "0", Is = "mousemove", qa = "mousedown", Ws = "mouseup", Ya = "mouseenter", Za = "mouseleave", Ja = "dblclick", Td = "resize", Cd = "scroll", Qa = "change", Go = "dppxchange", Sr = "--", Li = typeof window < "u", er = Li ? document : null, Ai = Li ? window : null, Ed = Li ? navigator : null;
let ce, zo;
function tr() {
  let e = devicePixelRatio;
  ce != e && (ce = e, zo && ir(Qa, zo, tr), zo = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Gn(Qa, zo, tr), Ai.dispatchEvent(new CustomEvent(Go)));
}
function dt(e, t) {
  if (t != null) {
    let n = e.classList;
    !n.contains(t) && n.add(t);
  }
}
function nr(e, t) {
  let n = e.classList;
  n.contains(t) && n.remove(t);
}
function ye(e, t, n) {
  e.style[t] = n + "px";
}
function Pt(e, t, n, i) {
  let o = er.createElement(e);
  return t != null && dt(o, t), n?.insertBefore(o, i), o;
}
function $t(e, t) {
  return Pt("div", e, t);
}
const Xa = /* @__PURE__ */ new WeakMap();
function qt(e, t, n, i, o) {
  let s = "translate(" + t + "px," + n + "px)", r = Xa.get(e);
  s != r && (e.style.transform = s, Xa.set(e, s), t < 0 || n < 0 || t > i || n > o ? dt(e, Bn) : nr(e, Bn));
}
const el = /* @__PURE__ */ new WeakMap();
function tl(e, t, n) {
  let i = t + n, o = el.get(e);
  i != o && (el.set(e, i), e.style.background = t, e.style.borderColor = n);
}
const nl = /* @__PURE__ */ new WeakMap();
function il(e, t, n, i) {
  let o = t + "" + n, s = nl.get(e);
  o != s && (nl.set(e, o), e.style.height = n + "px", e.style.width = t + "px", e.style.marginLeft = i ? -t / 2 + "px" : 0, e.style.marginTop = i ? -n / 2 + "px" : 0);
}
const Ar = { passive: !0 }, Dd = { ...Ar, capture: !0 };
function Gn(e, t, n, i) {
  t.addEventListener(e, n, i ? Dd : Ar);
}
function ir(e, t, n, i) {
  t.removeEventListener(e, n, Ar);
}
Li && tr();
function Mt(e, t, n, i) {
  let o;
  n = n || 0, i = i || t.length - 1;
  let s = i <= 2147483647;
  for (; i - n > 1; )
    o = s ? n + i >> 1 : ft((n + i) / 2), t[o] < e ? n = o : i = o;
  return e - t[n] <= t[i] - e ? n : i;
}
function sc(e) {
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
const rc = (e) => e != null, ac = (e) => e != null && e > 0, Xo = sc(rc), Pd = sc(ac);
function Md(e, t, n, i = 0, o = !1) {
  let s = o ? Pd : Xo, r = o ? ac : rc;
  [t, n] = s(e, t, n);
  let c = e[t], h = e[t];
  if (t > -1)
    if (i == 1)
      c = e[t], h = e[n];
    else if (i == -1)
      c = e[n], h = e[t];
    else
      for (let f = t; f <= n; f++) {
        let g = e[f];
        r(g) && (g < c ? c = g : g > h && (h = g));
      }
  return [c ?? pe, h ?? -pe];
}
function es(e, t, n, i) {
  let o = rl(e), s = rl(t);
  e == t && (o == -1 ? (e *= n, t /= n) : (e /= n, t *= n));
  let r = n == 10 ? on : lc, c = o == 1 ? ft : kt, h = s == 1 ? kt : ft, f = c(r(ze(e))), g = h(r(ze(t))), m = Ei(n, f), _ = Ei(n, g);
  return n == 10 && (f < 0 && (m = me(m, -f)), g < 0 && (_ = me(_, -g))), i || n == 2 ? (e = m * o, t = _ * s) : (e = dc(e, m), t = ts(t, _)), [e, t];
}
function Tr(e, t, n, i) {
  let o = es(e, t, n, i);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const Cr = 0.1, ol = {
  mode: 3,
  pad: Cr
}, ao = {
  pad: 0,
  soft: null,
  mode: 0
}, Nd = {
  min: ao,
  max: ao
};
function Vo(e, t, n, i) {
  return ns(n) ? sl(e, t, n) : (ao.pad = n, ao.soft = i ? 0 : null, ao.mode = i ? 3 : 0, sl(e, t, Nd));
}
function ae(e, t) {
  return e ?? t;
}
function zd(e, t, n) {
  for (t = ae(t, 0), n = ae(n, e.length - 1); t <= n; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function sl(e, t, n) {
  let i = n.min, o = n.max, s = ae(i.pad, 0), r = ae(o.pad, 0), c = ae(i.hard, -pe), h = ae(o.hard, pe), f = ae(i.soft, pe), g = ae(o.soft, -pe), m = ae(i.mode, 0), _ = ae(o.mode, 0), S = t - e, A = on(S), O = nt(ze(e), ze(t)), R = on(O), U = ze(R - A);
  (S < 1e-24 || U > 10) && (S = 0, (e == 0 || t == 0) && (S = 1e-24, m == 2 && f != pe && (s = 0), _ == 2 && g != -pe && (r = 0)));
  let $ = S || O || 1e3, I = on($), T = Ei(10, ft(I)), Q = $ * (S == 0 ? e == 0 ? 0.1 : 1 : s), z = me(dc(e - Q, T / 10), 24), X = e >= f && (m == 1 || m == 3 && z <= f || m == 2 && z >= f) ? f : pe, Y = nt(c, z < X && e >= X ? X : Nt(X, z)), ne = $ * (S == 0 ? t == 0 ? 0.1 : 1 : r), q = me(ts(t + ne, T / 10), 24), C = t <= g && (_ == 1 || _ == 3 && q >= g || _ == 2 && q <= g) ? g : -pe, J = Nt(h, q > C && t <= C ? C : nt(C, q));
  return Y == J && Y == 0 && (J = 100), [Y, J];
}
const Od = new Intl.NumberFormat(Li ? Ed.language : "en-US"), Er = (e) => Od.format(e), mt = Math, Ro = mt.PI, ze = mt.abs, ft = mt.floor, Ne = mt.round, kt = mt.ceil, Nt = mt.min, nt = mt.max, Ei = mt.pow, rl = mt.sign, on = mt.log10, lc = mt.log2, Fd = (e, t = 1) => mt.sinh(e) * t, Gs = (e, t = 1) => mt.asinh(e / t), pe = 1 / 0;
function al(e) {
  return (on((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function or(e, t, n) {
  return Nt(nt(e, t), n);
}
function cc(e) {
  return typeof e == "function";
}
function ie(e) {
  return cc(e) ? e : () => e;
}
const Ld = () => {
}, uc = (e) => e, hc = (e, t) => t, Hd = (e) => null, ll = (e) => !0, cl = (e, t) => e == t, Rd = /\.\d*?(?=9{6,}|0{6,})/gm, Kn = (e) => {
  if (pc(e) || kn.has(e))
    return e;
  const t = `${e}`, n = t.match(Rd);
  if (n == null)
    return e;
  let i = n[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Kn(o)}e${s}`;
  }
  return me(e, i);
};
function jn(e, t) {
  return Kn(me(Kn(e / t)) * t);
}
function ts(e, t) {
  return Kn(kt(Kn(e / t)) * t);
}
function dc(e, t) {
  return Kn(ft(Kn(e / t)) * t);
}
function me(e, t = 0) {
  if (pc(e))
    return e;
  let n = 10 ** t, i = e * n * (1 + Number.EPSILON);
  return Ne(i) / n;
}
const kn = /* @__PURE__ */ new Map();
function fc(e) {
  return (("" + e).split(".")[1] || "").length;
}
function po(e, t, n, i) {
  let o = [], s = i.map(fc);
  for (let r = t; r < n; r++) {
    let c = ze(r), h = me(Ei(e, r), c);
    for (let f = 0; f < i.length; f++) {
      let g = e == 10 ? +`${i[f]}e${r}` : i[f] * h, m = (r >= 0 ? 0 : c) + (r >= s[f] ? 0 : s[f]), _ = e == 10 ? g : me(g, m);
      o.push(_), kn.set(_, m);
    }
  }
  return o;
}
const lo = {}, Dr = [], Di = [null, null], yn = Array.isArray, pc = Number.isInteger, jd = (e) => e === void 0;
function ul(e) {
  return typeof e == "string";
}
function ns(e) {
  let t = !1;
  if (e != null) {
    let n = e.constructor;
    t = n == null || n == Object;
  }
  return t;
}
function Ud(e) {
  return e != null && typeof e == "object";
}
const Bd = Object.getPrototypeOf(Uint8Array), mc = "__proto__";
function Pi(e, t = ns) {
  let n;
  if (yn(e)) {
    let i = e.find((o) => o != null);
    if (yn(i) || t(i)) {
      n = Array(e.length);
      for (let o = 0; o < e.length; o++)
        n[o] = Pi(e[o], t);
    } else
      n = e.slice();
  } else if (e instanceof Bd)
    n = e.slice();
  else if (t(e)) {
    n = {};
    for (let i in e)
      i != mc && (n[i] = Pi(e[i], t));
  } else
    n = e;
  return n;
}
function Ee(e) {
  let t = arguments;
  for (let n = 1; n < t.length; n++) {
    let i = t[n];
    for (let o in i)
      o != mc && (ns(e[o]) ? Ee(e[o], Pi(i[o])) : e[o] = Pi(i[o]));
  }
  return e;
}
const Id = 0, Wd = 1, Gd = 2;
function Vd(e, t, n) {
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
function Kd(e, t) {
  if (Zd(e)) {
    let r = e[0].slice();
    for (let c = 1; c < e.length; c++)
      r.push(...e[c].slice(1));
    return Jd(r[0]) || (r = Yd(r)), r;
  }
  let n = /* @__PURE__ */ new Set();
  for (let r = 0; r < e.length; r++) {
    let h = e[r][0], f = h.length;
    for (let g = 0; g < f; g++)
      n.add(h[g]);
  }
  let i = [Array.from(n).sort((r, c) => r - c)], o = i[0].length, s = /* @__PURE__ */ new Map();
  for (let r = 0; r < o; r++)
    s.set(i[0][r], r);
  for (let r = 0; r < e.length; r++) {
    let c = e[r], h = c[0];
    for (let f = 1; f < c.length; f++) {
      let g = c[f], m = Array(o).fill(void 0), _ = t ? t[r][f] : Wd, S = [];
      for (let A = 0; A < g.length; A++) {
        let O = g[A], R = s.get(h[A]);
        O === null ? _ != Id && (m[R] = O, _ == Gd && S.push(R)) : m[R] = O;
      }
      Vd(m, S, o), i.push(m);
    }
  }
  return i;
}
const qd = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Yd(e) {
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
function Zd(e) {
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
function Jd(e, t = 100) {
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
  const s = nt(1, ft((o - i + 1) / t));
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
const gc = [
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
], bc = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function _c(e) {
  return e.slice(0, 3);
}
const Qd = bc.map(_c), Xd = gc.map(_c), ef = {
  MMMM: gc,
  MMM: Xd,
  WWWW: bc,
  WWW: Qd
};
function Xi(e) {
  return (e < 10 ? "0" : "") + e;
}
function tf(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const nf = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Xi(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Xi(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Xi(e.getHours()),
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
  mm: (e) => Xi(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Xi(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => tf(e.getMilliseconds())
};
function Pr(e, t) {
  t = t || ef;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = i.exec(e); )
    n.push(o[0][0] == "{" ? nf[o[1]] : o[0]);
  return (s) => {
    let r = "";
    for (let c = 0; c < n.length; c++)
      r += typeof n[c] == "string" ? n[c] : n[c](s, t);
    return r;
  };
}
const of = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function sf(e, t) {
  let n;
  return t == "UTC" || t == "Etc/UTC" ? n = new Date(+e + e.getTimezoneOffset() * 6e4) : t == of ? n = e : (n = new Date(e.toLocaleString("en-US", { timeZone: t })), n.setMilliseconds(e.getMilliseconds())), n;
}
const vc = (e) => e % 1 == 0, Ko = [1, 2, 2.5, 5], rf = po(10, -32, 0, Ko), yc = po(10, 0, 32, Ko), af = yc.filter(vc), Un = rf.concat(yc), Mr = `
`, wc = "{YYYY}", hl = Mr + wc, xc = "{M}/{D}", oo = Mr + xc, Oo = oo + "/{YY}", $c = "{aa}", lf = "{h}:{mm}", $i = lf + $c, dl = Mr + $i, fl = ":{ss}", he = null;
function kc(e) {
  let t = e * 1e3, n = t * 60, i = n * 60, o = i * 24, s = o * 30, r = o * 365, h = (e == 1 ? po(10, 0, 3, Ko).filter(vc) : po(10, -3, 0, Ko)).concat([
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
  const f = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [r, wc, he, he, he, he, he, he, 1],
    [o * 28, "{MMM}", hl, he, he, he, he, he, 1],
    [o, xc, hl, he, he, he, he, he, 1],
    [i, "{h}" + $c, Oo, he, oo, he, he, he, 1],
    [n, $i, Oo, he, oo, he, he, he, 1],
    [t, fl, Oo + " " + $i, he, oo + " " + $i, he, dl, he, 1],
    [e, fl + ".{fff}", Oo + " " + $i, he, oo + " " + $i, he, dl, he, 1]
  ];
  function g(m) {
    return (_, S, A, O, R, U) => {
      let $ = [], I = R >= r, T = R >= s && R < r, Q = m(A), z = me(Q * e, 3), X = Vs(Q.getFullYear(), I ? 0 : Q.getMonth(), T || I ? 1 : Q.getDate()), Y = me(X * e, 3);
      if (T || I) {
        let ne = T ? R / s : 0, q = I ? R / r : 0, C = z == Y ? z : me(Vs(X.getFullYear() + q, X.getMonth() + ne, 1) * e, 3), J = new Date(Ne(C / e)), F = J.getFullYear(), V = J.getMonth();
        for (let B = 0; C <= O; B++) {
          let oe = Vs(F + q * B, V + ne * B, 1), j = oe - m(me(oe * e, 3));
          C = me((+oe + j) * e, 3), C <= O && $.push(C);
        }
      } else {
        let ne = R >= o ? o : R, q = ft(A) - ft(z), C = Y + q + ts(z - Y, ne);
        $.push(C);
        let J = m(C), F = J.getHours() + J.getMinutes() / n + J.getSeconds() / i, V = R / i, B = _.axes[S]._space, oe = U / B;
        for (; C = me(C + R, e == 1 ? 0 : 3), !(C > O); )
          if (V > 1) {
            let j = ft(me(F + V, 6)) % 24, se = m(C).getHours() - j;
            se > 1 && (se = -1), C -= se * i, F = (F + V) % 24;
            let de = $[$.length - 1];
            me((C - de) / R, 3) * oe >= 0.7 && $.push(C);
          } else
            $.push(C);
      }
      return $;
    };
  }
  return [
    h,
    f,
    g
  ];
}
const [cf, uf, hf] = kc(1), [df, ff, pf] = kc(1e-3);
po(2, -53, 53, [1]);
function pl(e, t) {
  return e.map((n) => n.map(
    (i, o) => o == 0 || o == 8 || i == null ? i : t(o == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function ml(e, t) {
  return (n, i, o, s, r) => {
    let c = t.find((A) => r >= A[0]) || t[t.length - 1], h, f, g, m, _, S;
    return i.map((A) => {
      let O = e(A), R = O.getFullYear(), U = O.getMonth(), $ = O.getDate(), I = O.getHours(), T = O.getMinutes(), Q = O.getSeconds(), z = R != h && c[2] || U != f && c[3] || $ != g && c[4] || I != m && c[5] || T != _ && c[6] || Q != S && c[7] || c[1];
      return h = R, f = U, g = $, m = I, _ = T, S = Q, z(O);
    });
  };
}
function mf(e, t) {
  let n = Pr(t);
  return (i, o, s, r, c) => o.map((h) => n(e(h)));
}
function Vs(e, t, n) {
  return new Date(e, t, n);
}
function gl(e, t) {
  return t(e);
}
const gf = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function bl(e, t) {
  return (n, i, o, s) => s == null ? Sr : t(e(i));
}
function bf(e, t) {
  let n = e.series[t];
  return n.width ? n.stroke(e, t) : n.points.width ? n.points.stroke(e, t) : null;
}
function _f(e, t) {
  return e.series[t].fill(e, t);
}
const vf = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Ld,
  markers: {
    show: !0,
    width: 2,
    stroke: bf,
    fill: _f,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function yf(e, t) {
  let n = e.cursor.points, i = $t(), o = n.size(e, t);
  ye(i, no, o), ye(i, io, o);
  let s = o / -2;
  ye(i, "marginLeft", s), ye(i, "marginTop", s);
  let r = n.width(e, t, o);
  return r && ye(i, "borderWidth", r), i;
}
function wf(e, t) {
  let n = e.series[t].points;
  return n._fill || n._stroke;
}
function xf(e, t) {
  let n = e.series[t].points;
  return n._stroke || n._fill;
}
function $f(e, t) {
  return e.series[t].points.size;
}
const Ks = [0, 0];
function kf(e, t, n) {
  return Ks[0] = t, Ks[1] = n, Ks;
}
function Fo(e, t, n, i = !0) {
  return (o) => {
    o.button == 0 && (!i || o.target == t) && n(o);
  };
}
function qs(e, t, n, i = !0) {
  return (o) => {
    (!i || o.target == t) && n(o);
  };
}
const Sf = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: kf,
  points: {
    one: !1,
    show: yf,
    size: $f,
    width: 0,
    stroke: xf,
    fill: wf
  },
  bind: {
    mousedown: Fo,
    mouseup: Fo,
    click: Fo,
    // legend clicks, not .u-over clicks
    dblclick: Fo,
    mousemove: qs,
    mouseleave: qs,
    mouseenter: qs
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
}, Sc = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Nr = Ee({}, Sc, {
  filter: hc
}), Ac = Ee({}, Nr, {
  size: 10
}), Tc = Ee({}, Sc, {
  show: !1
}), zr = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Cc = "bold " + zr, Ec = 1.5, _l = {
  show: !0,
  scale: "x",
  stroke: kr,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Cc,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Nr,
  ticks: Ac,
  border: Tc,
  font: zr,
  lineGap: Ec,
  rotate: 0
}, Af = "Value", Tf = "Time", vl = {
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
function Cf(e, t, n, i, o) {
  return t.map((s) => s == null ? "" : Er(s));
}
function Ef(e, t, n, i, o, s, r) {
  let c = [], h = kn.get(o) || 0;
  n = r ? n : me(ts(n, o), h);
  for (let f = n; f <= i; f = me(f + o, h))
    c.push(Object.is(f, -0) ? 0 : f);
  return c;
}
function sr(e, t, n, i, o, s, r) {
  const c = [], h = e.scales[e.axes[t].scale].log, f = h == 10 ? on : lc, g = ft(f(n));
  o = Ei(h, g), h == 10 && (o = Un[Mt(o, Un)]);
  let m = n, _ = o * h;
  h == 10 && (_ = Un[Mt(_, Un)]);
  do
    c.push(m), m = m + o, h == 10 && !kn.has(m) && (m = me(m, kn.get(o))), m >= _ && (o = m, _ = o * h, h == 10 && (_ = Un[Mt(_, Un)]));
  while (m <= i);
  return c;
}
function Df(e, t, n, i, o, s, r) {
  let h = e.scales[e.axes[t].scale].asinh, f = i > h ? sr(e, t, nt(h, n), i, o) : [h], g = i >= 0 && n <= 0 ? [0] : [];
  return (n < -h ? sr(e, t, nt(h, -i), -n, o) : [h]).reverse().map((_) => -_).concat(g, f);
}
const Dc = /./, Pf = /[12357]/, Mf = /[125]/, yl = /1/, rr = (e, t, n, i) => e.map((o, s) => t == 4 && o == 0 || s % i == 0 && n.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function Nf(e, t, n, i, o) {
  let s = e.axes[n], r = s.scale, c = e.scales[r], h = e.valToPos, f = s._space, g = h(10, r), m = h(9, r) - g >= f ? Dc : h(7, r) - g >= f ? Pf : h(5, r) - g >= f ? Mf : yl;
  if (m == yl) {
    let _ = ze(h(1, r) - g);
    if (_ < f)
      return rr(t.slice().reverse(), c.distr, m, kt(f / _)).reverse();
  }
  return rr(t, c.distr, m, 1);
}
function zf(e, t, n, i, o) {
  let s = e.axes[n], r = s.scale, c = s._space, h = e.valToPos, f = ze(h(1, r) - h(2, r));
  return f < c ? rr(t.slice().reverse(), 3, Dc, kt(c / f)).reverse() : t;
}
function Of(e, t, n, i) {
  return i == null ? Sr : t == null ? "" : Er(t);
}
const wl = {
  show: !0,
  scale: "y",
  stroke: kr,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: Cc,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Nr,
  ticks: Ac,
  border: Tc,
  font: zr,
  lineGap: Ec,
  rotate: 0
};
function Ff(e, t) {
  let n = 3 + (e || 1) * 2;
  return me(n * t, 3);
}
function Lf(e, t) {
  let { scale: n, idxs: i } = e.series[0], o = e._data[0], s = e.valToPos(o[i[0]], n, !0), r = e.valToPos(o[i[1]], n, !0), c = ze(r - s), h = e.series[t], f = c / (h.points.space * ce);
  return i[1] - i[0] <= f;
}
const xl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, Pc = (e, t, n, i, o) => o, $l = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Pc,
  alpha: 1,
  facets: [
    Ee({}, xl, { scale: "x" }),
    Ee({}, xl, { scale: "y" })
  ]
}, kl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Pc,
  alpha: 1,
  points: {
    show: Lf,
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
function Hf(e, t, n, i, o) {
  return n / 10;
}
const Mc = {
  time: ld,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Rf = Ee({}, Mc, {
  time: !1,
  ori: 1
}), Sl = {};
function Nc(e, t) {
  let n = Sl[e];
  return n || (n = {
    key: e,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((o) => o != i);
    },
    pub(i, o, s, r, c, h, f) {
      for (let g = 0; g < n.plots.length; g++)
        n.plots[g] != o && n.plots[g].pub(i, o, s, r, c, h, f);
    }
  }, e != null && (Sl[e] = n)), n;
}
const Mi = 1, ar = 2;
function Zn(e, t, n) {
  const i = e.mode, o = e.series[t], s = i == 2 ? e._data[t] : e._data, r = e.scales, c = e.bbox;
  let h = s[0], f = i == 2 ? s[1] : s[t], g = i == 2 ? r[o.facets[0].scale] : r[e.series[0].scale], m = i == 2 ? r[o.facets[1].scale] : r[o.scale], _ = c.left, S = c.top, A = c.width, O = c.height, R = e.valToPosH, U = e.valToPosV;
  return g.ori == 0 ? n(
    o,
    h,
    f,
    g,
    m,
    R,
    U,
    _,
    S,
    A,
    O,
    os,
    Hi,
    rs,
    Oc,
    Lc
  ) : n(
    o,
    h,
    f,
    g,
    m,
    U,
    R,
    S,
    _,
    O,
    A,
    ss,
    Ri,
    Lr,
    Fc,
    Hc
  );
}
function Or(e, t) {
  let n = 0, i = 0, o = ae(e.bands, Dr);
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
function jf(e, t, n, i, o) {
  let s = e.mode, r = e.series[t], c = s == 2 ? r.facets[1].scale : r.scale, h = e.scales[c];
  return o == -1 ? h.min : o == 1 ? h.max : h.distr == 3 ? h.dir == 1 ? h.min : h.max : 0;
}
function sn(e, t, n, i, o, s) {
  return Zn(e, t, (r, c, h, f, g, m, _, S, A, O, R) => {
    let U = r.pxRound;
    const $ = f.dir * (f.ori == 0 ? 1 : -1), I = f.ori == 0 ? Hi : Ri;
    let T, Q;
    $ == 1 ? (T = n, Q = i) : (T = i, Q = n);
    let z = U(m(c[T], f, O, S)), X = U(_(h[T], g, R, A)), Y = U(m(c[Q], f, O, S)), ne = U(_(s == 1 ? g.max : g.min, g, R, A)), q = new Path2D(o);
    return I(q, Y, ne), I(q, z, ne), I(q, z, X), q;
  });
}
function is(e, t, n, i, o, s) {
  let r = null;
  if (e.length > 0) {
    r = new Path2D();
    const c = t == 0 ? rs : Lr;
    let h = n;
    for (let m = 0; m < e.length; m++) {
      let _ = e[m];
      if (_[1] > _[0]) {
        let S = _[0] - h;
        S > 0 && c(r, h, i, S, i + s), h = _[1];
      }
    }
    let f = n + o - h, g = 10;
    f > 0 && c(r, h, i - g / 2, f, i + s + g);
  }
  return r;
}
function Uf(e, t, n) {
  let i = e[e.length - 1];
  i && i[0] == t ? i[1] = n : e.push([t, n]);
}
function Fr(e, t, n, i, o, s, r) {
  let c = [], h = e.length;
  for (let f = o == 1 ? n : i; f >= n && f <= i; f += o)
    if (t[f] === null) {
      let m = f, _ = f;
      if (o == 1)
        for (; ++f <= i && t[f] === null; )
          _ = f;
      else
        for (; --f >= n && t[f] === null; )
          _ = f;
      let S = s(e[m]), A = _ == m ? S : s(e[_]), O = m - o;
      S = r <= 0 && O >= 0 && O < h ? s(e[O]) : S;
      let U = _ + o;
      A = r >= 0 && U >= 0 && U < h ? s(e[U]) : A, A >= S && c.push([S, A]);
    }
  return c;
}
function Al(e) {
  return e == 0 ? uc : e == 1 ? Ne : (t) => jn(t, e);
}
function zc(e) {
  let t = e == 0 ? os : ss, n = e == 0 ? (o, s, r, c, h, f) => {
    o.arcTo(s, r, c, h, f);
  } : (o, s, r, c, h, f) => {
    o.arcTo(r, s, h, c, f);
  }, i = e == 0 ? (o, s, r, c, h) => {
    o.rect(s, r, c, h);
  } : (o, s, r, c, h) => {
    o.rect(r, s, h, c);
  };
  return (o, s, r, c, h, f = 0, g = 0) => {
    f == 0 && g == 0 ? i(o, s, r, c, h) : (f = Nt(f, c / 2, h / 2), g = Nt(g, c / 2, h / 2), t(o, s + f, r), n(o, s + c, r, s + c, r + h, f), n(o, s + c, r + h, s, r + h, g), n(o, s, r + h, s, r, g), n(o, s, r, s + c, r, f), o.closePath());
  };
}
const os = (e, t, n) => {
  e.moveTo(t, n);
}, ss = (e, t, n) => {
  e.moveTo(n, t);
}, Hi = (e, t, n) => {
  e.lineTo(t, n);
}, Ri = (e, t, n) => {
  e.lineTo(n, t);
}, rs = zc(0), Lr = zc(1), Oc = (e, t, n, i, o, s) => {
  e.arc(t, n, i, o, s);
}, Fc = (e, t, n, i, o, s) => {
  e.arc(n, t, i, o, s);
}, Lc = (e, t, n, i, o, s, r) => {
  e.bezierCurveTo(t, n, i, o, s, r);
}, Hc = (e, t, n, i, o, s, r) => {
  e.bezierCurveTo(n, t, o, i, r, s);
};
function Rc(e) {
  return (t, n, i, o, s) => Zn(t, n, (r, c, h, f, g, m, _, S, A, O, R) => {
    let { pxRound: U, points: $ } = r, I, T;
    f.ori == 0 ? (I = os, T = Oc) : (I = ss, T = Fc);
    const Q = me($.width * ce, 3);
    let z = ($.size - $.width) / 2 * ce, X = me(z * 2, 3), Y = new Path2D(), ne = new Path2D(), { left: q, top: C, width: J, height: F } = t.bbox;
    rs(
      ne,
      q - X,
      C - X,
      J + X * 2,
      F + X * 2
    );
    const V = (B) => {
      if (h[B] != null) {
        let oe = U(m(c[B], f, O, S)), j = U(_(h[B], g, R, A));
        I(Y, oe + z, j), T(Y, oe, j, z, 0, Ro * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let B = i; B <= o; B++)
        V(B);
    return {
      stroke: Q > 0 ? Y : null,
      fill: Y,
      clip: ne,
      flags: Mi | ar
    };
  });
}
function jc(e) {
  return (t, n, i, o, s, r) => {
    i != o && (s != i && r != i && e(t, n, i), s != o && r != o && e(t, n, o), e(t, n, r));
  };
}
const Bf = jc(Hi), If = jc(Ri);
function Uc(e) {
  const t = ae(e?.alignGaps, 0);
  return (n, i, o, s) => Zn(n, i, (r, c, h, f, g, m, _, S, A, O, R) => {
    [o, s] = Xo(h, o, s);
    let U = r.pxRound, $ = (F) => U(m(F, f, O, S)), I = (F) => U(_(F, g, R, A)), T, Q;
    f.ori == 0 ? (T = Hi, Q = Bf) : (T = Ri, Q = If);
    const z = f.dir * (f.ori == 0 ? 1 : -1), X = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Mi }, Y = X.stroke;
    let ne = !1;
    if (s - o >= O * 4) {
      let F = (L) => n.posToVal(L, f.key, !0), V = null, B = null, oe, j, it, we = $(c[z == 1 ? o : s]), se = $(c[o]), de = $(c[s]), ee = F(z == 1 ? se + 1 : de - 1);
      for (let L = z == 1 ? o : s; L >= o && L <= s; L += z) {
        let Pe = c[L], xe = (z == 1 ? Pe < ee : Pe > ee) ? we : $(Pe), ue = h[L];
        xe == we ? ue != null ? (j = ue, V == null ? (T(Y, xe, I(j)), oe = V = B = j) : j < V ? V = j : j > B && (B = j)) : ue === null && (ne = !0) : (V != null && Q(Y, we, I(V), I(B), I(oe), I(j)), ue != null ? (j = ue, T(Y, xe, I(j)), V = B = oe = j) : (V = B = null, ue === null && (ne = !0)), we = xe, ee = F(we + z));
      }
      V != null && V != B && it != we && Q(Y, we, I(V), I(B), I(oe), I(j));
    } else
      for (let F = z == 1 ? o : s; F >= o && F <= s; F += z) {
        let V = h[F];
        V === null ? ne = !0 : V != null && T(Y, $(c[F]), I(V));
      }
    let [C, J] = Or(n, i);
    if (r.fill != null || C != 0) {
      let F = X.fill = new Path2D(Y), V = r.fillTo(n, i, r.min, r.max, C), B = I(V), oe = $(c[o]), j = $(c[s]);
      z == -1 && ([j, oe] = [oe, j]), T(F, j, B), T(F, oe, B);
    }
    if (!r.spanGaps) {
      let F = [];
      ne && F.push(...Fr(c, h, o, s, z, $, t)), X.gaps = F = r.gaps(n, i, o, s, F), X.clip = is(F, f.ori, S, A, O, R);
    }
    return J != 0 && (X.band = J == 2 ? [
      sn(n, i, o, s, Y, -1),
      sn(n, i, o, s, Y, 1)
    ] : sn(n, i, o, s, Y, J)), X;
  });
}
function Wf(e) {
  const t = ae(e.align, 1), n = ae(e.ascDesc, !1), i = ae(e.alignGaps, 0), o = ae(e.extend, !1);
  return (s, r, c, h) => Zn(s, r, (f, g, m, _, S, A, O, R, U, $, I) => {
    [c, h] = Xo(m, c, h);
    let T = f.pxRound, { left: Q, width: z } = s.bbox, X = (se) => T(A(se, _, $, R)), Y = (se) => T(O(se, S, I, U)), ne = _.ori == 0 ? Hi : Ri;
    const q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: Mi }, C = q.stroke, J = _.dir * (_.ori == 0 ? 1 : -1);
    let F = Y(m[J == 1 ? c : h]), V = X(g[J == 1 ? c : h]), B = V, oe = V;
    o && t == -1 && (oe = Q, ne(C, oe, F)), ne(C, V, F);
    for (let se = J == 1 ? c : h; se >= c && se <= h; se += J) {
      let de = m[se];
      if (de == null)
        continue;
      let ee = X(g[se]), L = Y(de);
      t == 1 ? ne(C, ee, F) : ne(C, B, L), ne(C, ee, L), F = L, B = ee;
    }
    let j = B;
    o && t == 1 && (j = Q + z, ne(C, j, F));
    let [it, we] = Or(s, r);
    if (f.fill != null || it != 0) {
      let se = q.fill = new Path2D(C), de = f.fillTo(s, r, f.min, f.max, it), ee = Y(de);
      ne(se, j, ee), ne(se, oe, ee);
    }
    if (!f.spanGaps) {
      let se = [];
      se.push(...Fr(g, m, c, h, J, X, i));
      let de = f.width * ce / 2, ee = n || t == 1 ? de : -de, L = n || t == -1 ? -de : de;
      se.forEach((Pe) => {
        Pe[0] += ee, Pe[1] += L;
      }), q.gaps = se = f.gaps(s, r, c, h, se), q.clip = is(se, _.ori, R, U, $, I);
    }
    return we != 0 && (q.band = we == 2 ? [
      sn(s, r, c, h, C, -1),
      sn(s, r, c, h, C, 1)
    ] : sn(s, r, c, h, C, we)), q;
  });
}
function Tl(e, t, n, i, o, s, r = pe) {
  if (e.length > 1) {
    let c = null;
    for (let h = 0, f = 1 / 0; h < e.length; h++)
      if (t[h] !== void 0) {
        if (c != null) {
          let g = ze(e[h] - e[c]);
          g < f && (f = g, r = ze(n(e[h], i, o, s) - n(e[c], i, o, s)));
        }
        c = h;
      }
  }
  return r;
}
function Gf(e) {
  e = e || lo;
  const t = ae(e.size, [0.6, pe, 1]), n = e.align || 0, i = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = ie(o), r = 1 - t[0], c = ae(t[1], pe), h = ae(t[2], 1), f = ae(e.disp, lo), g = ae(e.each, (S) => {
  }), { fill: m, stroke: _ } = f;
  return (S, A, O, R) => Zn(S, A, (U, $, I, T, Q, z, X, Y, ne, q, C) => {
    let J = U.pxRound, F = n, V = i * ce, B = c * ce, oe = h * ce, j, it;
    T.ori == 0 ? [j, it] = s(S, A) : [it, j] = s(S, A);
    const we = T.dir * (T.ori == 0 ? 1 : -1);
    let se = T.ori == 0 ? rs : Lr, de = T.ori == 0 ? g : (M, ge, Me, ni, En, Bt, Dn) => {
      g(M, ge, Me, En, ni, Dn, Bt);
    }, ee = ae(S.bands, Dr).find((M) => M.series[0] == A), L = ee != null ? ee.dir : 0, Pe = U.fillTo(S, A, U.min, U.max, L), Je = J(X(Pe, Q, C, ne)), xe, ue, At, at = q, ke = J(U.width * ce), Ut = !1, Xt = null, gt = null, fn = null, Xn = null;
    m != null && (ke == 0 || _ != null) && (Ut = !0, Xt = m.values(S, A, O, R), gt = /* @__PURE__ */ new Map(), new Set(Xt).forEach((M) => {
      M != null && gt.set(M, new Path2D());
    }), ke > 0 && (fn = _.values(S, A, O, R), Xn = /* @__PURE__ */ new Map(), new Set(fn).forEach((M) => {
      M != null && Xn.set(M, new Path2D());
    })));
    let { x0: ei, size: Ui } = f;
    if (ei != null && Ui != null) {
      F = 1, $ = ei.values(S, A, O, R), ei.unit == 2 && ($ = $.map((Me) => S.posToVal(Y + Me * q, T.key, !0)));
      let M = Ui.values(S, A, O, R);
      Ui.unit == 2 ? ue = M[0] * q : ue = z(M[0], T, q, Y) - z(0, T, q, Y), at = Tl($, I, z, T, q, Y, at), At = at - ue + V;
    } else
      at = Tl($, I, z, T, q, Y, at), At = at * r + V, ue = at - At;
    At < 1 && (At = 0), ke >= ue / 2 && (ke = 0), At < 5 && (J = uc);
    let vo = At > 0, Tn = at - At - (vo ? ke : 0);
    ue = J(or(Tn, oe, B)), xe = (F == 0 ? ue / 2 : F == we ? 0 : ue) - F * we * ((F == 0 ? V / 2 : 0) + (vo ? ke / 2 : 0));
    const Qe = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, ti = Ut ? null : new Path2D();
    let en = null;
    if (ee != null)
      en = S.data[ee.series[1]];
    else {
      let { y0: M, y1: ge } = f;
      M != null && ge != null && (I = ge.values(S, A, O, R), en = M.values(S, A, O, R));
    }
    let Cn = j * ue, Z = it * ue;
    for (let M = we == 1 ? O : R; M >= O && M <= R; M += we) {
      let ge = I[M];
      if (ge == null)
        continue;
      if (en != null) {
        let ot = en[M] ?? 0;
        if (ge - ot == 0)
          continue;
        Je = X(ot, Q, C, ne);
      }
      let Me = T.distr != 2 || f != null ? $[M] : M, ni = z(Me, T, q, Y), En = X(ae(ge, Pe), Q, C, ne), Bt = J(ni - xe), Dn = J(nt(En, Je)), lt = J(Nt(En, Je)), bt = Dn - lt;
      if (ge != null) {
        let ot = ge < 0 ? Z : Cn, Tt = ge < 0 ? Cn : Z;
        Ut ? (ke > 0 && fn[M] != null && se(Xn.get(fn[M]), Bt, lt + ft(ke / 2), ue, nt(0, bt - ke), ot, Tt), Xt[M] != null && se(gt.get(Xt[M]), Bt, lt + ft(ke / 2), ue, nt(0, bt - ke), ot, Tt)) : se(ti, Bt, lt + ft(ke / 2), ue, nt(0, bt - ke), ot, Tt), de(
          S,
          A,
          M,
          Bt - ke / 2,
          lt,
          ue + ke,
          bt
        );
      }
    }
    return ke > 0 ? Qe.stroke = Ut ? Xn : ti : Ut || (Qe._fill = U.width == 0 ? U._fill : U._stroke ?? U._fill, Qe.width = 0), Qe.fill = Ut ? gt : ti, Qe;
  });
}
function Vf(e, t) {
  const n = ae(t?.alignGaps, 0);
  return (i, o, s, r) => Zn(i, o, (c, h, f, g, m, _, S, A, O, R, U) => {
    [s, r] = Xo(f, s, r);
    let $ = c.pxRound, I = (j) => $(_(j, g, R, A)), T = (j) => $(S(j, m, U, O)), Q, z, X;
    g.ori == 0 ? (Q = os, X = Hi, z = Lc) : (Q = ss, X = Ri, z = Hc);
    const Y = g.dir * (g.ori == 0 ? 1 : -1);
    let ne = I(h[Y == 1 ? s : r]), q = ne, C = [], J = [];
    for (let j = Y == 1 ? s : r; j >= s && j <= r; j += Y)
      if (f[j] != null) {
        let we = h[j], se = I(we);
        C.push(q = se), J.push(T(f[j]));
      }
    const F = { stroke: e(C, J, Q, X, z, $), fill: null, clip: null, band: null, gaps: null, flags: Mi }, V = F.stroke;
    let [B, oe] = Or(i, o);
    if (c.fill != null || B != 0) {
      let j = F.fill = new Path2D(V), it = c.fillTo(i, o, c.min, c.max, B), we = T(it);
      X(j, q, we), X(j, ne, we);
    }
    if (!c.spanGaps) {
      let j = [];
      j.push(...Fr(h, f, s, r, Y, I, n)), F.gaps = j = c.gaps(i, o, s, r, j), F.clip = is(j, g.ori, A, O, R, U);
    }
    return oe != 0 && (F.band = oe == 2 ? [
      sn(i, o, s, r, V, -1),
      sn(i, o, s, r, V, 1)
    ] : sn(i, o, s, r, V, oe)), F;
  });
}
function Kf(e) {
  return Vf(qf, e);
}
function qf(e, t, n, i, o, s) {
  const r = e.length;
  if (r < 2)
    return null;
  const c = new Path2D();
  if (n(c, e[0], t[0]), r == 2)
    i(c, e[1], t[1]);
  else {
    let h = Array(r), f = Array(r - 1), g = Array(r - 1), m = Array(r - 1);
    for (let _ = 0; _ < r - 1; _++)
      g[_] = t[_ + 1] - t[_], m[_] = e[_ + 1] - e[_], f[_] = g[_] / m[_];
    h[0] = f[0];
    for (let _ = 1; _ < r - 1; _++)
      f[_] === 0 || f[_ - 1] === 0 || f[_ - 1] > 0 != f[_] > 0 ? h[_] = 0 : (h[_] = 3 * (m[_ - 1] + m[_]) / ((2 * m[_] + m[_ - 1]) / f[_ - 1] + (m[_] + 2 * m[_ - 1]) / f[_]), isFinite(h[_]) || (h[_] = 0));
    h[r - 1] = f[r - 2];
    for (let _ = 0; _ < r - 1; _++)
      o(
        c,
        e[_] + m[_] / 3,
        t[_] + h[_] * m[_] / 3,
        e[_ + 1] - m[_] / 3,
        t[_ + 1] - h[_ + 1] * m[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return c;
}
const lr = /* @__PURE__ */ new Set();
function Cl() {
  for (let e of lr)
    e.syncRect(!0);
}
Li && (Gn(Td, Ai, Cl), Gn(Cd, Ai, Cl, !0), Gn(Go, Ai, () => {
  Ye.pxRatio = ce;
}));
const Yf = Uc(), Zf = Rc();
function El(e, t, n, i) {
  return (i ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, r) => cr(s, r, t, n));
}
function Jf(e, t) {
  return e.map((n, i) => i == 0 ? {} : Ee({}, t, n));
}
function cr(e, t, n, i) {
  return Ee({}, t == 0 ? n : i, e);
}
function Bc(e, t, n) {
  return t == null ? Di : [t, n];
}
const Qf = Bc;
function Xf(e, t, n) {
  return t == null ? Di : Vo(t, n, Cr, !0);
}
function Ic(e, t, n, i) {
  return t == null ? Di : es(t, n, e.scales[i].log, !1);
}
const ep = Ic;
function Wc(e, t, n, i) {
  return t == null ? Di : Tr(t, n, e.scales[i].log, !1);
}
const tp = Wc;
function np(e, t, n, i, o) {
  let s = nt(al(e), al(t)), r = t - e, c = Mt(o / i * r, n);
  do {
    let h = n[c], f = i * h / r;
    if (f >= o && s + (h < 5 ? kn.get(h) : 0) <= 17)
      return [h, f];
  } while (++c < n.length);
  return [0, 0];
}
function Dl(e) {
  let t, n;
  return e = e.replace(/(\d+)px/, (i, o) => (t = Ne((n = +o) * ce)) + "px"), [e, t, n];
}
function ip(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let n = me(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, n + "px"), t[1] = n;
  });
}
function Ye(e, t, n) {
  const i = {
    mode: ae(e.mode, 1)
  }, o = i.mode;
  function s(a, l, u, d) {
    let p = l.valToPct(a);
    return d + u * (l.dir == -1 ? 1 - p : p);
  }
  function r(a, l, u, d) {
    let p = l.valToPct(a);
    return d + u * (l.dir == -1 ? p : 1 - p);
  }
  function c(a, l, u, d) {
    return l.ori == 0 ? s(a, l, u, d) : r(a, l, u, d);
  }
  i.valToPosH = s, i.valToPosV = r;
  let h = !1;
  i.status = 0;
  const f = i.root = $t(cd);
  if (e.id != null && (f.id = e.id), dt(f, e.class), e.title) {
    let a = $t(dd, f);
    a.textContent = e.title;
  }
  const g = Pt("canvas"), m = i.ctx = g.getContext("2d"), _ = $t(fd, f);
  Gn("click", _, (a) => {
    a.target === A && (be != fi || $e != pi) && Ve.click(i, a);
  }, !0);
  const S = i.under = $t(pd, _);
  _.appendChild(g);
  const A = i.over = $t(md, _);
  e = Pi(e);
  const O = +ae(e.pxAlign, 1), R = Al(O);
  (e.plugins || []).forEach((a) => {
    a.opts && (e = a.opts(i, e) || e);
  });
  const U = e.ms || 1e-3, $ = i.series = o == 1 ? El(e.series || [], vl, kl, !1) : Jf(e.series || [null], $l), I = i.axes = El(e.axes || [], _l, wl, !0), T = i.scales = {}, Q = i.bands = e.bands || [];
  Q.forEach((a) => {
    a.fill = ie(a.fill || null), a.dir = ae(a.dir, -1);
  });
  const z = o == 2 ? $[1].facets[0].scale : $[0].scale, X = {
    axes: ru,
    series: tu
  }, Y = (e.drawOrder || ["axes", "series"]).map((a) => X[a]);
  function ne(a) {
    const l = a.distr == 3 ? (u) => on(u > 0 ? u : a.clamp(i, u, a.min, a.max, a.key)) : a.distr == 4 ? (u) => Gs(u, a.asinh) : a.distr == 100 ? (u) => a.fwd(u) : (u) => u;
    return (u) => {
      let d = l(u), { _min: p, _max: b } = a, y = b - p;
      return (d - p) / y;
    };
  }
  function q(a) {
    let l = T[a];
    if (l == null) {
      let u = (e.scales || lo)[a] || lo;
      if (u.from != null) {
        q(u.from);
        let d = Ee({}, T[u.from], u, { key: a });
        d.valToPct = ne(d), T[a] = d;
      } else {
        l = T[a] = Ee({}, a == z ? Mc : Rf, u), l.key = a;
        let d = l.time, p = l.range, b = yn(p);
        if ((a != z || o == 2 && !d) && (b && (p[0] == null || p[1] == null) && (p = {
          min: p[0] == null ? ol : {
            mode: 1,
            hard: p[0],
            soft: p[0]
          },
          max: p[1] == null ? ol : {
            mode: 1,
            hard: p[1],
            soft: p[1]
          }
        }, b = !1), !b && ns(p))) {
          let y = p;
          p = (w, x, E) => x == null ? Di : Vo(x, E, y);
        }
        l.range = ie(p || (d ? Qf : a == z ? l.distr == 3 ? ep : l.distr == 4 ? tp : Bc : l.distr == 3 ? Ic : l.distr == 4 ? Wc : Xf)), l.auto = ie(b ? !1 : l.auto), l.clamp = ie(l.clamp || Hf), l._min = l._max = null, l.valToPct = ne(l);
      }
    }
  }
  q("x"), q("y"), o == 1 && $.forEach((a) => {
    q(a.scale);
  }), I.forEach((a) => {
    q(a.scale);
  });
  for (let a in e.scales)
    q(a);
  const C = T[z], J = C.distr;
  let F, V;
  C.ori == 0 ? (dt(f, ud), F = s, V = r) : (dt(f, hd), F = r, V = s);
  const B = {};
  for (let a in T) {
    let l = T[a];
    (l.min != null || l.max != null) && (B[a] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const oe = e.tzDate || ((a) => new Date(Ne(a / U))), j = e.fmtDate || Pr, it = U == 1 ? hf(oe) : pf(oe), we = ml(oe, pl(U == 1 ? uf : ff, j)), se = bl(oe, gl(gf, j)), de = [], ee = i.legend = Ee({}, vf, e.legend), L = i.cursor = Ee({}, Sf, { drag: { y: o == 2 } }, e.cursor), Pe = ee.show, Je = L.show, xe = ee.markers;
  ee.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, At, at, ke = [], Ut = [], Xt, gt = !1, fn = {};
  if (ee.live) {
    const a = $[1] ? $[1].values : null;
    gt = a != null, Xt = gt ? a(i, 1, 0) : { _: 0 };
    for (let l in Xt)
      fn[l] = Sr;
  }
  if (Pe)
    if (ue = Pt("table", wd, f), at = Pt("tbody", null, ue), ee.mount(i, ue), gt) {
      At = Pt("thead", null, ue, at);
      let a = Pt("tr", null, At);
      Pt("th", null, a);
      for (var Xn in Xt)
        Pt("th", Ga, a).textContent = Xn;
    } else
      dt(ue, $d), ee.live && dt(ue, xd);
  const ei = { show: !0 }, Ui = { show: !1 };
  function vo(a, l) {
    if (l == 0 && (gt || !ee.live || o == 2))
      return Di;
    let u = [], d = Pt("tr", kd, at, at.childNodes[l]);
    dt(d, a.class), a.show || dt(d, Bn);
    let p = Pt("th", null, d);
    if (xe.show) {
      let w = $t(Sd, p);
      if (l > 0) {
        let x = xe.width(i, l);
        x && (w.style.border = x + "px " + xe.dash(i, l) + " " + xe.stroke(i, l)), w.style.background = xe.fill(i, l);
      }
    }
    let b = $t(Ga, p);
    a.label instanceof HTMLElement ? b.appendChild(a.label) : b.textContent = a.label, l > 0 && (xe.show || (b.style.color = a.width > 0 ? xe.stroke(i, l) : xe.fill(i, l)), Qe("click", p, (w) => {
      if (L._lock)
        return;
      Mn(w);
      let x = $.indexOf(a);
      if ((w.ctrlKey || w.metaKey) != ee.isolate) {
        let E = $.some((P, N) => N > 0 && N != x && P.show);
        $.forEach((P, N) => {
          N > 0 && Wt(N, E ? N == x ? ei : Ui : ei, !0, Ce.setSeries);
        });
      } else
        Wt(x, { show: !a.show }, !0, Ce.setSeries);
    }, !1), oi && Qe(Ya, p, (w) => {
      L._lock || (Mn(w), Wt($.indexOf(a), gi, !0, Ce.setSeries));
    }, !1));
    for (var y in Xt) {
      let w = Pt("td", Ad, d);
      w.textContent = "--", u.push(w);
    }
    return [d, u];
  }
  const Tn = /* @__PURE__ */ new Map();
  function Qe(a, l, u, d = !0) {
    const p = Tn.get(l) || {}, b = L.bind[a](i, l, u, d);
    b && (Gn(a, l, p[a] = b), Tn.set(l, p));
  }
  function ti(a, l, u) {
    const d = Tn.get(l) || {};
    for (let p in d)
      (a == null || p == a) && (ir(p, l, d[p]), delete d[p]);
    a == null && Tn.delete(l);
  }
  let en = 0, Cn = 0, Z = 0, M = 0, ge = 0, Me = 0, ni = ge, En = Me, Bt = Z, Dn = M, lt = 0, bt = 0, ot = 0, Tt = 0;
  i.bbox = {};
  let cs = !1, yo = !1, ii = !1, Pn = !1, wo = !1, _t = !1;
  function us(a, l, u) {
    (u || a != i.width || l != i.height) && jr(a, l), ci(!1), ii = !0, yo = !0, ui();
  }
  function jr(a, l) {
    i.width = en = Z = a, i.height = Cn = M = l, ge = Me = 0, qc(), Yc();
    let u = i.bbox;
    lt = u.left = jn(ge * ce, 0.5), bt = u.top = jn(Me * ce, 0.5), ot = u.width = jn(Z * ce, 0.5), Tt = u.height = jn(M * ce, 0.5);
  }
  const Gc = 3;
  function Vc() {
    let a = !1, l = 0;
    for (; !a; ) {
      l++;
      let u = ou(l), d = su(l);
      a = l == Gc || u && d, a || (jr(i.width, i.height), yo = !0);
    }
  }
  function Kc({ width: a, height: l }) {
    us(a, l);
  }
  i.setSize = Kc;
  function qc() {
    let a = !1, l = !1, u = !1, d = !1;
    I.forEach((p, b) => {
      if (p.show && p._show) {
        let { side: y, _size: w } = p, x = y % 2, E = p.label != null ? p.labelSize : 0, P = w + E;
        P > 0 && (x ? (Z -= P, y == 3 ? (ge += P, d = !0) : u = !0) : (M -= P, y == 0 ? (Me += P, a = !0) : l = !0));
      }
    }), Nn[0] = a, Nn[1] = u, Nn[2] = l, Nn[3] = d, Z -= pn[1] + pn[3], ge += pn[3], M -= pn[2] + pn[0], Me += pn[0];
  }
  function Yc() {
    let a = ge + Z, l = Me + M, u = ge, d = Me;
    function p(b, y) {
      switch (b) {
        case 1:
          return a += y, a - y;
        case 2:
          return l += y, l - y;
        case 3:
          return u -= y, u + y;
        case 0:
          return d -= y, d + y;
      }
    }
    I.forEach((b, y) => {
      if (b.show && b._show) {
        let w = b.side;
        b._pos = p(w, b._size), b.label != null && (b._lpos = p(w, b.labelSize));
      }
    });
  }
  if (L.dataIdx == null) {
    let a = L.hover, l = a.skip = new Set(a.skip ?? []);
    l.add(void 0);
    let u = a.prox = ie(a.prox), d = a.bias ??= 0;
    L.dataIdx = (p, b, y, w) => {
      if (b == 0)
        return y;
      let x = y, E = u(p, b, y, w) ?? pe, P = E >= 0 && E < pe, N = C.ori == 0 ? Z : M, K = L.left, le = t[0], re = t[b];
      if (l.has(re[y])) {
        x = null;
        let te = null, W = null, H;
        if (d == 0 || d == -1)
          for (H = y; te == null && H-- > 0; )
            l.has(re[H]) || (te = H);
        if (d == 0 || d == 1)
          for (H = y; W == null && H++ < re.length; )
            l.has(re[H]) || (W = H);
        if (te != null || W != null)
          if (P) {
            let ve = te == null ? -1 / 0 : F(le[te], C, N, 0), Se = W == null ? 1 / 0 : F(le[W], C, N, 0), Ue = K - ve, fe = Se - K;
            Ue <= fe ? Ue <= E && (x = te) : fe <= E && (x = W);
          } else
            x = W == null ? te : te == null ? W : y - te <= W - y ? te : W;
      } else P && ze(K - F(le[y], C, N, 0)) > E && (x = null);
      return x;
    };
  }
  const Mn = (a) => {
    L.event = a;
  };
  L.idxs = de, L._lock = !1;
  let Ke = L.points;
  Ke.show = ie(Ke.show), Ke.size = ie(Ke.size), Ke.stroke = ie(Ke.stroke), Ke.width = ie(Ke.width), Ke.fill = ie(Ke.fill);
  const It = i.focus = Ee({}, e.focus || { alpha: 0.3 }, L.focus), oi = It.prox >= 0, si = oi && Ke.one;
  let vt = [], ri = [], ai = [];
  function Ur(a, l) {
    let u = Ke.show(i, l);
    if (u instanceof HTMLElement)
      return dt(u, yd), dt(u, a.class), qt(u, -10, -10, Z, M), A.insertBefore(u, vt[l]), u;
  }
  function Br(a, l) {
    if (o == 1 || l > 0) {
      let u = o == 1 && T[a.scale].time, d = a.value;
      a.value = u ? ul(d) ? bl(oe, gl(d, j)) : d || se : d || Of, a.label = a.label || (u ? Tf : Af);
    }
    if (si || l > 0) {
      a.width = a.width == null ? 1 : a.width, a.paths = a.paths || Yf || Hd, a.fillTo = ie(a.fillTo || jf), a.pxAlign = +ae(a.pxAlign, O), a.pxRound = Al(a.pxAlign), a.stroke = ie(a.stroke || null), a.fill = ie(a.fill || null), a._stroke = a._fill = a._paths = a._focus = null;
      let u = Ff(nt(1, a.width), 1), d = a.points = Ee({}, {
        size: u,
        width: nt(1, u * 0.2),
        stroke: a.stroke,
        space: u * 2,
        paths: Zf,
        _stroke: null,
        _fill: null
      }, a.points);
      d.show = ie(d.show), d.filter = ie(d.filter), d.fill = ie(d.fill), d.stroke = ie(d.stroke), d.paths = ie(d.paths), d.pxAlign = a.pxAlign;
    }
    if (Pe) {
      let u = vo(a, l);
      ke.splice(l, 0, u[0]), Ut.splice(l, 0, u[1]), ee.values.push(null);
    }
    if (Je) {
      de.splice(l, 0, null);
      let u = null;
      si ? l == 0 && (u = Ur(a, l)) : l > 0 && (u = Ur(a, l)), vt.splice(l, 0, u), ri.splice(l, 0, 0), ai.splice(l, 0, 0);
    }
    je("addSeries", l);
  }
  function Zc(a, l) {
    l = l ?? $.length, a = o == 1 ? cr(a, l, vl, kl) : cr(a, l, {}, $l), $.splice(l, 0, a), Br($[l], l);
  }
  i.addSeries = Zc;
  function Jc(a) {
    if ($.splice(a, 1), Pe) {
      ee.values.splice(a, 1), Ut.splice(a, 1);
      let l = ke.splice(a, 1)[0];
      ti(null, l.firstChild), l.remove();
    }
    Je && (de.splice(a, 1), vt.splice(a, 1)[0].remove(), ri.splice(a, 1), ai.splice(a, 1)), je("delSeries", a);
  }
  i.delSeries = Jc;
  const Nn = [!1, !1, !1, !1];
  function Qc(a, l) {
    if (a._show = a.show, a.show) {
      let u = a.side % 2, d = T[a.scale];
      d == null && (a.scale = u ? $[1].scale : z, d = T[a.scale]);
      let p = d.time;
      a.size = ie(a.size), a.space = ie(a.space), a.rotate = ie(a.rotate), yn(a.incrs) && a.incrs.forEach((y) => {
        !kn.has(y) && kn.set(y, fc(y));
      }), a.incrs = ie(a.incrs || (d.distr == 2 ? af : p ? U == 1 ? cf : df : Un)), a.splits = ie(a.splits || (p && d.distr == 1 ? it : d.distr == 3 ? sr : d.distr == 4 ? Df : Ef)), a.stroke = ie(a.stroke), a.grid.stroke = ie(a.grid.stroke), a.ticks.stroke = ie(a.ticks.stroke), a.border.stroke = ie(a.border.stroke);
      let b = a.values;
      a.values = // static array of tick values
      yn(b) && !yn(b[0]) ? ie(b) : (
        // temporal
        p ? (
          // config array of fmtDate string tpls
          yn(b) ? ml(oe, pl(b, j)) : (
            // fmtDate string tpl
            ul(b) ? mf(oe, b) : b || we
          )
        ) : b || Cf
      ), a.filter = ie(a.filter || (d.distr >= 3 && d.log == 10 ? Nf : d.distr == 3 && d.log == 2 ? zf : hc)), a.font = Dl(a.font), a.labelFont = Dl(a.labelFont), a._size = a.size(i, null, l, 0), a._space = a._rotate = a._incrs = a._found = // foundIncrSpace
      a._splits = a._values = null, a._size > 0 && (Nn[l] = !0, a._el = $t(gd, _));
    }
  }
  function Bi(a, l, u, d) {
    let [p, b, y, w] = u, x = l % 2, E = 0;
    return x == 0 && (w || b) && (E = l == 0 && !p || l == 2 && !y ? Ne(_l.size / 3) : 0), x == 1 && (p || y) && (E = l == 1 && !b || l == 3 && !w ? Ne(wl.size / 2) : 0), E;
  }
  const Ir = i.padding = (e.padding || [Bi, Bi, Bi, Bi]).map((a) => ie(ae(a, Bi))), pn = i._padding = Ir.map((a, l) => a(i, l, Nn, 0));
  let Ge, Fe = null, Le = null;
  const xo = o == 1 ? $[0].idxs : null;
  let Ct = null, Ii = !1;
  function Wr(a, l) {
    if (t = a ?? [], i.data = i._data = t, o == 2) {
      Ge = 0;
      for (let u = 1; u < $.length; u++)
        Ge += t[u][0].length;
    } else {
      t.length == 0 && (i.data = i._data = t = [[]]), Ct = t[0], Ge = Ct.length;
      let u = t;
      if (J == 2) {
        u = t.slice();
        let d = u[0] = Array(Ge);
        for (let p = 0; p < Ge; p++)
          d[p] = p;
      }
      i._data = t = u;
    }
    if (ci(!0), je("setData"), J == 2 && (ii = !0), l !== !1) {
      let u = C;
      u.auto(i, Ii) ? hs() : gn(z, u.min, u.max), Pn = Pn || L.left >= 0, _t = !0, ui();
    }
  }
  i.setData = Wr;
  function hs() {
    Ii = !0;
    let a, l;
    o == 1 && (Ge > 0 ? (Fe = xo[0] = 0, Le = xo[1] = Ge - 1, a = t[0][Fe], l = t[0][Le], J == 2 ? (a = Fe, l = Le) : a == l && (J == 3 ? [a, l] = es(a, a, C.log, !1) : J == 4 ? [a, l] = Tr(a, a, C.log, !1) : C.time ? l = a + Ne(86400 / U) : [a, l] = Vo(a, l, Cr, !0))) : (Fe = xo[0] = a = null, Le = xo[1] = l = null)), gn(z, a, l);
  }
  let $o, li, ds, fs, ps, ms, gs, bs, _s, st;
  function Gr(a, l, u, d, p, b) {
    a ??= Ka, u ??= Dr, d ??= "butt", p ??= Ka, b ??= "round", a != $o && (m.strokeStyle = $o = a), p != li && (m.fillStyle = li = p), l != ds && (m.lineWidth = ds = l), b != ps && (m.lineJoin = ps = b), d != ms && (m.lineCap = ms = d), u != fs && m.setLineDash(fs = u);
  }
  function Vr(a, l, u, d) {
    l != li && (m.fillStyle = li = l), a != gs && (m.font = gs = a), u != bs && (m.textAlign = bs = u), d != _s && (m.textBaseline = _s = d);
  }
  function vs(a, l, u, d, p = 0) {
    if (d.length > 0 && a.auto(i, Ii) && (l == null || l.min == null)) {
      let b = ae(Fe, 0), y = ae(Le, d.length - 1), w = u.min == null ? Md(d, b, y, p, a.distr == 3) : [u.min, u.max];
      a.min = Nt(a.min, u.min = w[0]), a.max = nt(a.max, u.max = w[1]);
    }
  }
  const Kr = { min: null, max: null };
  function Xc() {
    for (let d in T) {
      let p = T[d];
      B[d] == null && // scales that have never been set (on init)
      (p.min == null || // or auto scales when the x scale was explicitly set
      B[z] != null && p.auto(i, Ii)) && (B[d] = Kr);
    }
    for (let d in T) {
      let p = T[d];
      B[d] == null && p.from != null && B[p.from] != null && (B[d] = Kr);
    }
    B[z] != null && ci(!0);
    let a = {};
    for (let d in B) {
      let p = B[d];
      if (p != null) {
        let b = a[d] = Pi(T[d], Ud);
        if (p.min != null)
          Ee(b, p);
        else if (d != z || o == 2)
          if (Ge == 0 && b.from == null) {
            let y = b.range(i, null, null, d);
            b.min = y[0], b.max = y[1];
          } else
            b.min = pe, b.max = -pe;
      }
    }
    if (Ge > 0) {
      $.forEach((d, p) => {
        if (o == 1) {
          let b = d.scale, y = B[b];
          if (y == null)
            return;
          let w = a[b];
          if (p == 0) {
            let x = w.range(i, w.min, w.max, b);
            w.min = x[0], w.max = x[1], Fe = Mt(w.min, t[0]), Le = Mt(w.max, t[0]), Le - Fe > 1 && (t[0][Fe] < w.min && Fe++, t[0][Le] > w.max && Le--), d.min = Ct[Fe], d.max = Ct[Le];
          } else d.show && d.auto && vs(w, y, d, t[p], d.sorted);
          d.idxs[0] = Fe, d.idxs[1] = Le;
        } else if (p > 0 && d.show && d.auto) {
          let [b, y] = d.facets, w = b.scale, x = y.scale, [E, P] = t[p], N = a[w], K = a[x];
          N != null && vs(N, B[w], b, E, b.sorted), K != null && vs(K, B[x], y, P, y.sorted), d.min = y.min, d.max = y.max;
        }
      });
      for (let d in a) {
        let p = a[d], b = B[d];
        if (p.from == null && (b == null || b.min == null)) {
          let y = p.range(
            i,
            p.min == pe ? null : p.min,
            p.max == -pe ? null : p.max,
            d
          );
          p.min = y[0], p.max = y[1];
        }
      }
    }
    for (let d in a) {
      let p = a[d];
      if (p.from != null) {
        let b = a[p.from];
        if (b.min == null)
          p.min = p.max = null;
        else {
          let y = p.range(i, b.min, b.max, d);
          p.min = y[0], p.max = y[1];
        }
      }
    }
    let l = {}, u = !1;
    for (let d in a) {
      let p = a[d], b = T[d];
      if (b.min != p.min || b.max != p.max) {
        b.min = p.min, b.max = p.max;
        let y = b.distr;
        b._min = y == 3 ? on(b.min) : y == 4 ? Gs(b.min, b.asinh) : y == 100 ? b.fwd(b.min) : b.min, b._max = y == 3 ? on(b.max) : y == 4 ? Gs(b.max, b.asinh) : y == 100 ? b.fwd(b.max) : b.max, l[d] = u = !0;
      }
    }
    if (u) {
      $.forEach((d, p) => {
        o == 2 ? p > 0 && l.y && (d._paths = null) : l[d.scale] && (d._paths = null);
      });
      for (let d in l)
        ii = !0, je("setScale", d);
      Je && L.left >= 0 && (Pn = _t = !0);
    }
    for (let d in B)
      B[d] = null;
  }
  function eu(a) {
    let l = or(Fe - 1, 0, Ge - 1), u = or(Le + 1, 0, Ge - 1);
    for (; a[l] == null && l > 0; )
      l--;
    for (; a[u] == null && u < Ge - 1; )
      u++;
    return [l, u];
  }
  function tu() {
    if (Ge > 0) {
      let a = $.some((l) => l._focus) && st != It.alpha;
      a && (m.globalAlpha = st = It.alpha), $.forEach((l, u) => {
        if (u > 0 && l.show && (qr(u, !1), qr(u, !0), l._paths == null)) {
          let d = st;
          st != l.alpha && (m.globalAlpha = st = l.alpha);
          let p = o == 2 ? [0, t[u][0].length - 1] : eu(t[u]);
          l._paths = l.paths(i, u, p[0], p[1]), st != d && (m.globalAlpha = st = d);
        }
      }), $.forEach((l, u) => {
        if (u > 0 && l.show) {
          let d = st;
          st != l.alpha && (m.globalAlpha = st = l.alpha), l._paths != null && Yr(u, !1);
          {
            let p = l._paths != null ? l._paths.gaps : null, b = l.points.show(i, u, Fe, Le, p), y = l.points.filter(i, u, b, p);
            (b || y) && (l.points._paths = l.points.paths(i, u, Fe, Le, y), Yr(u, !0));
          }
          st != d && (m.globalAlpha = st = d), je("drawSeries", u);
        }
      }), a && (m.globalAlpha = st = 1);
    }
  }
  function qr(a, l) {
    let u = l ? $[a].points : $[a];
    u._stroke = u.stroke(i, a), u._fill = u.fill(i, a);
  }
  function Yr(a, l) {
    let u = l ? $[a].points : $[a], {
      stroke: d,
      fill: p,
      clip: b,
      flags: y,
      _stroke: w = u._stroke,
      _fill: x = u._fill,
      _width: E = u.width
    } = u._paths;
    E = me(E * ce, 3);
    let P = null, N = E % 2 / 2;
    l && x == null && (x = E > 0 ? "#fff" : w);
    let K = u.pxAlign == 1 && N > 0;
    if (K && m.translate(N, N), !l) {
      let le = lt - E / 2, re = bt - E / 2, te = ot + E, W = Tt + E;
      P = new Path2D(), P.rect(le, re, te, W);
    }
    l ? ys(w, E, u.dash, u.cap, x, d, p, y, b) : nu(a, w, E, u.dash, u.cap, x, d, p, y, P, b), K && m.translate(-N, -N);
  }
  function nu(a, l, u, d, p, b, y, w, x, E, P) {
    let N = !1;
    x != 0 && Q.forEach((K, le) => {
      if (K.series[0] == a) {
        let re = $[K.series[1]], te = t[K.series[1]], W = (re._paths || lo).band;
        yn(W) && (W = K.dir == 1 ? W[0] : W[1]);
        let H, ve = null;
        re.show && W && zd(te, Fe, Le) ? (ve = K.fill(i, le) || b, H = re._paths.clip) : W = null, ys(l, u, d, p, ve, y, w, x, E, P, H, W), N = !0;
      }
    }), N || ys(l, u, d, p, b, y, w, x, E, P);
  }
  const Zr = Mi | ar;
  function ys(a, l, u, d, p, b, y, w, x, E, P, N) {
    Gr(a, l, u, d, p), (x || E || N) && (m.save(), x && m.clip(x), E && m.clip(E)), N ? (w & Zr) == Zr ? (m.clip(N), P && m.clip(P), So(p, y), ko(a, b, l)) : w & ar ? (So(p, y), m.clip(N), ko(a, b, l)) : w & Mi && (m.save(), m.clip(N), P && m.clip(P), So(p, y), m.restore(), ko(a, b, l)) : (So(p, y), ko(a, b, l)), (x || E || N) && m.restore();
  }
  function ko(a, l, u) {
    u > 0 && (l instanceof Map ? l.forEach((d, p) => {
      m.strokeStyle = $o = p, m.stroke(d);
    }) : l != null && a && m.stroke(l));
  }
  function So(a, l) {
    l instanceof Map ? l.forEach((u, d) => {
      m.fillStyle = li = d, m.fill(u);
    }) : l != null && a && m.fill(l);
  }
  function iu(a, l, u, d) {
    let p = I[a], b;
    if (d <= 0)
      b = [0, 0];
    else {
      let y = p._space = p.space(i, a, l, u, d), w = p._incrs = p.incrs(i, a, l, u, d, y);
      b = np(l, u, w, d, y);
    }
    return p._found = b;
  }
  function ws(a, l, u, d, p, b, y, w, x, E) {
    let P = y % 2 / 2;
    O == 1 && m.translate(P, P), Gr(w, y, x, E, w), m.beginPath();
    let N, K, le, re, te = p + (d == 0 || d == 3 ? -b : b);
    u == 0 ? (K = p, re = te) : (N = p, le = te);
    for (let W = 0; W < a.length; W++)
      l[W] != null && (u == 0 ? N = le = a[W] : K = re = a[W], m.moveTo(N, K), m.lineTo(le, re));
    m.stroke(), O == 1 && m.translate(-P, -P);
  }
  function ou(a) {
    let l = !0;
    return I.forEach((u, d) => {
      if (!u.show)
        return;
      let p = T[u.scale];
      if (p.min == null) {
        u._show && (l = !1, u._show = !1, ci(!1));
        return;
      } else
        u._show || (l = !1, u._show = !0, ci(!1));
      let b = u.side, y = b % 2, { min: w, max: x } = p, [E, P] = iu(d, w, x, y == 0 ? Z : M);
      if (P == 0)
        return;
      let N = p.distr == 2, K = u._splits = u.splits(i, d, w, x, E, P, N), le = p.distr == 2 ? K.map((H) => Ct[H]) : K, re = p.distr == 2 ? Ct[K[1]] - Ct[K[0]] : E, te = u._values = u.values(i, u.filter(i, le, d, P, re), d, P, re);
      u._rotate = b == 2 ? u.rotate(i, te, d, P) : 0;
      let W = u._size;
      u._size = kt(u.size(i, te, d, a)), W != null && u._size != W && (l = !1);
    }), l;
  }
  function su(a) {
    let l = !0;
    return Ir.forEach((u, d) => {
      let p = u(i, d, Nn, a);
      p != pn[d] && (l = !1), pn[d] = p;
    }), l;
  }
  function ru() {
    for (let a = 0; a < I.length; a++) {
      let l = I[a];
      if (!l.show || !l._show)
        continue;
      let u = l.side, d = u % 2, p, b, y = l.stroke(i, a), w = u == 0 || u == 3 ? -1 : 1, [x, E] = l._found;
      if (l.label != null) {
        let et = l.labelGap * w, ht = Ne((l._lpos + et) * ce);
        Vr(l.labelFont[0], y, "center", u == 2 ? Qi : Va), m.save(), d == 1 ? (p = b = 0, m.translate(
          ht,
          Ne(bt + Tt / 2)
        ), m.rotate((u == 3 ? -Ro : Ro) / 2)) : (p = Ne(lt + ot / 2), b = ht);
        let Fn = cc(l.label) ? l.label(i, a, x, E) : l.label;
        m.fillText(Fn, p, b), m.restore();
      }
      if (E == 0)
        continue;
      let P = T[l.scale], N = d == 0 ? ot : Tt, K = d == 0 ? lt : bt, le = l._splits, re = P.distr == 2 ? le.map((et) => Ct[et]) : le, te = P.distr == 2 ? Ct[le[1]] - Ct[le[0]] : x, W = l.ticks, H = l.border, ve = W.show ? W.size : 0, Se = Ne(ve * ce), Ue = Ne((l.alignTo == 2 ? l._size - ve - l.gap : l.gap) * ce), fe = l._rotate * -Ro / 180, Ae = R(l._pos * ce), ct = (Se + Ue) * w, Xe = Ae + ct;
      b = d == 0 ? Xe : 0, p = d == 1 ? Xe : 0;
      let yt = l.font[0], Et = l.align == 1 ? wi : l.align == 2 ? Bs : fe > 0 ? wi : fe < 0 ? Bs : d == 0 ? "center" : u == 3 ? Bs : wi, Vt = fe || d == 1 ? "middle" : u == 2 ? Qi : Va;
      Vr(yt, y, Et, Vt);
      let ut = l.font[1] * l.lineGap, wt = le.map((et) => R(c(et, P, N, K))), Dt = l._values;
      for (let et = 0; et < Dt.length; et++) {
        let ht = Dt[et];
        if (ht != null) {
          d == 0 ? p = wt[et] : b = wt[et], ht = "" + ht;
          let Fn = ht.indexOf(`
`) == -1 ? [ht] : ht.split(/\n/gm);
          for (let tt = 0; tt < Fn.length; tt++) {
            let ma = Fn[tt];
            fe ? (m.save(), m.translate(p, b + tt * ut), m.rotate(fe), m.fillText(ma, 0, 0), m.restore()) : m.fillText(ma, p, b + tt * ut);
          }
        }
      }
      W.show && ws(
        wt,
        W.filter(i, re, a, E, te),
        d,
        u,
        Ae,
        Se,
        me(W.width * ce, 3),
        W.stroke(i, a),
        W.dash,
        W.cap
      );
      let Kt = l.grid;
      Kt.show && ws(
        wt,
        Kt.filter(i, re, a, E, te),
        d,
        d == 0 ? 2 : 1,
        d == 0 ? bt : lt,
        d == 0 ? Tt : ot,
        me(Kt.width * ce, 3),
        Kt.stroke(i, a),
        Kt.dash,
        Kt.cap
      ), H.show && ws(
        [Ae],
        [1],
        d == 0 ? 1 : 0,
        d == 0 ? 1 : 2,
        d == 1 ? bt : lt,
        d == 1 ? Tt : ot,
        me(H.width * ce, 3),
        H.stroke(i, a),
        H.dash,
        H.cap
      );
    }
    je("drawAxes");
  }
  function ci(a) {
    $.forEach((l, u) => {
      u > 0 && (l._paths = null, a && (o == 1 ? (l.min = null, l.max = null) : l.facets.forEach((d) => {
        d.min = null, d.max = null;
      })));
    });
  }
  let Ao = !1, xs = !1, Wi = [];
  function au() {
    xs = !1;
    for (let a = 0; a < Wi.length; a++)
      je(...Wi[a]);
    Wi.length = 0;
  }
  function ui() {
    Ao || (qd(Jr), Ao = !0);
  }
  function lu(a, l = !1) {
    Ao = !0, xs = l, a(i), Jr(), l && Wi.length > 0 && queueMicrotask(au);
  }
  i.batch = lu;
  function Jr() {
    if (cs && (Xc(), cs = !1), ii && (Vc(), ii = !1), yo) {
      if (ye(S, wi, ge), ye(S, Qi, Me), ye(S, no, Z), ye(S, io, M), ye(A, wi, ge), ye(A, Qi, Me), ye(A, no, Z), ye(A, io, M), ye(_, no, en), ye(_, io, Cn), g.width = Ne(en * ce), g.height = Ne(Cn * ce), I.forEach(({ _el: a, _show: l, _size: u, _pos: d, side: p }) => {
        if (a != null)
          if (l) {
            let b = p === 3 || p === 0 ? u : 0, y = p % 2 == 1;
            ye(a, y ? "left" : "top", d - b), ye(a, y ? "width" : "height", u), ye(a, y ? "top" : "left", y ? Me : ge), ye(a, y ? "height" : "width", y ? M : Z), nr(a, Bn);
          } else
            dt(a, Bn);
      }), $o = li = ds = ps = ms = gs = bs = _s = fs = null, st = 1, Ki(!0), ge != ni || Me != En || Z != Bt || M != Dn) {
        ci(!1);
        let a = Z / Bt, l = M / Dn;
        if (Je && !Pn && L.left >= 0) {
          L.left *= a, L.top *= l, hi && qt(hi, Ne(L.left), 0, Z, M), di && qt(di, 0, Ne(L.top), Z, M);
          for (let u = 0; u < vt.length; u++) {
            let d = vt[u];
            d != null && (ri[u] *= a, ai[u] *= l, qt(d, kt(ri[u]), kt(ai[u]), Z, M));
          }
        }
        if (_e.show && !wo && _e.left >= 0 && _e.width > 0) {
          _e.left *= a, _e.width *= a, _e.top *= l, _e.height *= l;
          for (let u in Cs)
            ye(mi, u, _e[u]);
        }
        ni = ge, En = Me, Bt = Z, Dn = M;
      }
      je("setSize"), yo = !1;
    }
    en > 0 && Cn > 0 && (m.clearRect(0, 0, g.width, g.height), je("drawClear"), Y.forEach((a) => a()), je("draw")), _e.show && wo && (To(_e), wo = !1), Je && Pn && (On(null, !0, !1), Pn = !1), ee.show && ee.live && _t && (As(), _t = !1), h || (h = !0, i.status = 1, je("ready")), Ii = !1, Ao = !1;
  }
  i.redraw = (a, l) => {
    ii = l || !1, a !== !1 ? gn(z, C.min, C.max) : ui();
  };
  function $s(a, l) {
    let u = T[a];
    if (u.from == null) {
      if (Ge == 0) {
        let d = u.range(i, l.min, l.max, a);
        l.min = d[0], l.max = d[1];
      }
      if (l.min > l.max) {
        let d = l.min;
        l.min = l.max, l.max = d;
      }
      if (Ge > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      a == z && u.distr == 2 && Ge > 0 && (l.min = Mt(l.min, t[0]), l.max = Mt(l.max, t[0]), l.min == l.max && l.max++), B[a] = l, cs = !0, ui();
    }
  }
  i.setScale = $s;
  let ks, Ss, hi, di, Qr, Xr, fi, pi, ea, ta, be, $e, mn = !1;
  const Ve = L.drag;
  let He = Ve.x, Re = Ve.y;
  Je && (L.x && (ks = $t(_d, A)), L.y && (Ss = $t(vd, A)), C.ori == 0 ? (hi = ks, di = Ss) : (hi = Ss, di = ks), be = L.left, $e = L.top);
  const _e = i.select = Ee({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), mi = _e.show ? $t(bd, _e.over ? A : S) : null;
  function To(a, l) {
    if (_e.show) {
      for (let u in a)
        _e[u] = a[u], u in Cs && ye(mi, u, a[u]);
      l !== !1 && je("setSelect");
    }
  }
  i.setSelect = To;
  function cu(a) {
    if ($[a].show)
      Pe && nr(ke[a], Bn);
    else if (Pe && dt(ke[a], Bn), Je) {
      let u = si ? vt[0] : vt[a];
      u != null && qt(u, -10, -10, Z, M);
    }
  }
  function gn(a, l, u) {
    $s(a, { min: l, max: u });
  }
  function Wt(a, l, u, d) {
    l.focus != null && pu(a), l.show != null && $.forEach((p, b) => {
      b > 0 && (a == b || a == null) && (p.show = l.show, cu(b), o == 2 ? (gn(p.facets[0].scale, null, null), gn(p.facets[1].scale, null, null)) : gn(p.scale, null, null), ui());
    }), u !== !1 && je("setSeries", a, l), d && qi("setSeries", i, a, l);
  }
  i.setSeries = Wt;
  function uu(a, l) {
    Ee(Q[a], l);
  }
  function hu(a, l) {
    a.fill = ie(a.fill || null), a.dir = ae(a.dir, -1), l = l ?? Q.length, Q.splice(l, 0, a);
  }
  function du(a) {
    a == null ? Q.length = 0 : Q.splice(a, 1);
  }
  i.addBand = hu, i.setBand = uu, i.delBand = du;
  function fu(a, l) {
    $[a].alpha = l, Je && vt[a] != null && (vt[a].style.opacity = l), Pe && ke[a] && (ke[a].style.opacity = l);
  }
  let tn, bn, zn;
  const gi = { focus: !0 };
  function pu(a) {
    if (a != zn) {
      let l = a == null, u = It.alpha != 1;
      $.forEach((d, p) => {
        if (o == 1 || p > 0) {
          let b = l || p == 0 || p == a;
          d._focus = l ? null : b, u && fu(p, b ? 1 : It.alpha);
        }
      }), zn = a, u && ui();
    }
  }
  Pe && oi && Qe(Za, ue, (a) => {
    L._lock || (Mn(a), zn != null && Wt(null, gi, !0, Ce.setSeries));
  });
  function Gt(a, l, u) {
    let d = T[l];
    u && (a = a / ce - (d.ori == 1 ? Me : ge));
    let p = Z;
    d.ori == 1 && (p = M, a = p - a), d.dir == -1 && (a = p - a);
    let b = d._min, y = d._max, w = a / p, x = b + (y - b) * w, E = d.distr;
    return E == 3 ? Ei(10, x) : E == 4 ? Fd(x, d.asinh) : E == 100 ? d.bwd(x) : x;
  }
  function mu(a, l) {
    let u = Gt(a, z, l);
    return Mt(u, t[0], Fe, Le);
  }
  i.valToIdx = (a) => Mt(a, t[0]), i.posToIdx = mu, i.posToVal = Gt, i.valToPos = (a, l, u) => T[l].ori == 0 ? s(
    a,
    T[l],
    u ? ot : Z,
    u ? lt : 0
  ) : r(
    a,
    T[l],
    u ? Tt : M,
    u ? bt : 0
  ), i.setCursor = (a, l, u) => {
    be = a.left, $e = a.top, On(null, l, u);
  };
  function na(a, l) {
    ye(mi, wi, _e.left = a), ye(mi, no, _e.width = l);
  }
  function ia(a, l) {
    ye(mi, Qi, _e.top = a), ye(mi, io, _e.height = l);
  }
  let Gi = C.ori == 0 ? na : ia, Vi = C.ori == 1 ? na : ia;
  function gu() {
    if (Pe && ee.live)
      for (let a = o == 2 ? 1 : 0; a < $.length; a++) {
        if (a == 0 && gt)
          continue;
        let l = ee.values[a], u = 0;
        for (let d in l)
          Ut[a][u++].firstChild.nodeValue = l[d];
      }
  }
  function As(a, l) {
    if (a != null && (a.idxs ? a.idxs.forEach((u, d) => {
      de[d] = u;
    }) : jd(a.idx) || de.fill(a.idx), ee.idx = de[0]), Pe && ee.live) {
      for (let u = 0; u < $.length; u++)
        (u > 0 || o == 1 && !gt) && bu(u, de[u]);
      gu();
    }
    _t = !1, l !== !1 && je("setLegend");
  }
  i.setLegend = As;
  function bu(a, l) {
    let u = $[a], d = a == 0 && J == 2 ? Ct : t[a], p;
    gt ? p = u.values(i, a, l) ?? fn : (p = u.value(i, l == null ? null : d[l], a, l), p = p == null ? fn : { _: p }), ee.values[a] = p;
  }
  function On(a, l, u) {
    ea = be, ta = $e, [be, $e] = L.move(i, be, $e), L.left = be, L.top = $e, Je && (hi && qt(hi, Ne(be), 0, Z, M), di && qt(di, 0, Ne($e), Z, M));
    let d, p = Fe > Le;
    tn = pe, bn = null;
    let b = C.ori == 0 ? Z : M, y = C.ori == 1 ? Z : M;
    if (be < 0 || Ge == 0 || p) {
      d = L.idx = null;
      for (let w = 0; w < $.length; w++) {
        let x = vt[w];
        x != null && qt(x, -10, -10, Z, M);
      }
      oi && Wt(null, gi, !0, a == null && Ce.setSeries), ee.live && (de.fill(d), _t = !0);
    } else {
      let w, x, E;
      o == 1 && (w = C.ori == 0 ? be : $e, x = Gt(w, z), d = L.idx = Mt(x, t[0], Fe, Le), E = F(t[0][d], C, b, 0));
      let P = -10, N = -10, K = 0, le = 0, re = !0, te = "", W = "";
      for (let H = o == 2 ? 1 : 0; H < $.length; H++) {
        let ve = $[H], Se = de[H], Ue = Se == null ? null : o == 1 ? t[H][Se] : t[H][1][Se], fe = L.dataIdx(i, H, d, x), Ae = fe == null ? null : o == 1 ? t[H][fe] : t[H][1][fe];
        if (_t = _t || Ae != Ue || fe != Se, de[H] = fe, H > 0 && ve.show) {
          let ct = fe == null ? -10 : fe == d ? E : F(o == 1 ? t[0][fe] : t[H][0][fe], C, b, 0), Xe = Ae == null ? -10 : V(Ae, o == 1 ? T[ve.scale] : T[ve.facets[1].scale], y, 0);
          if (oi && Ae != null) {
            let yt = C.ori == 1 ? be : $e, Et = ze(It.dist(i, H, fe, Xe, yt));
            if (Et < tn) {
              let Vt = It.bias;
              if (Vt != 0) {
                let ut = Gt(yt, ve.scale), wt = Ae >= 0 ? 1 : -1, Dt = ut >= 0 ? 1 : -1;
                Dt == wt && (Dt == 1 ? Vt == 1 ? Ae >= ut : Ae <= ut : (
                  // >= 0
                  Vt == 1 ? Ae <= ut : Ae >= ut
                )) && (tn = Et, bn = H);
              } else
                tn = Et, bn = H;
            }
          }
          if (_t || si) {
            let yt, Et;
            C.ori == 0 ? (yt = ct, Et = Xe) : (yt = Xe, Et = ct);
            let Vt, ut, wt, Dt, Kt, et, ht = !0, Fn = Ke.bbox;
            if (Fn != null) {
              ht = !1;
              let tt = Fn(i, H);
              wt = tt.left, Dt = tt.top, Vt = tt.width, ut = tt.height;
            } else
              wt = yt, Dt = Et, Vt = ut = Ke.size(i, H);
            if (et = Ke.fill(i, H), Kt = Ke.stroke(i, H), si)
              H == bn && tn <= It.prox && (P = wt, N = Dt, K = Vt, le = ut, re = ht, te = et, W = Kt);
            else {
              let tt = vt[H];
              tt != null && (ri[H] = wt, ai[H] = Dt, il(tt, Vt, ut, ht), tl(tt, et, Kt), qt(tt, kt(wt), kt(Dt), Z, M));
            }
          }
        }
      }
      if (si) {
        let H = It.prox, ve = zn == null ? tn <= H : tn > H || bn != zn;
        if (_t || ve) {
          let Se = vt[0];
          Se != null && (ri[0] = P, ai[0] = N, il(Se, K, le, re), tl(Se, te, W), qt(Se, kt(P), kt(N), Z, M));
        }
      }
    }
    if (_e.show && mn)
      if (a != null) {
        let [w, x] = Ce.scales, [E, P] = Ce.match, [N, K] = a.cursor.sync.scales, le = a.cursor.drag;
        if (He = le._x, Re = le._y, He || Re) {
          let { left: re, top: te, width: W, height: H } = a.select, ve = a.scales[N].ori, Se = a.posToVal, Ue, fe, Ae, ct, Xe, yt = w != null && E(w, N), Et = x != null && P(x, K);
          yt && He ? (ve == 0 ? (Ue = re, fe = W) : (Ue = te, fe = H), Ae = T[w], ct = F(Se(Ue, N), Ae, b, 0), Xe = F(Se(Ue + fe, N), Ae, b, 0), Gi(Nt(ct, Xe), ze(Xe - ct))) : Gi(0, b), Et && Re ? (ve == 1 ? (Ue = re, fe = W) : (Ue = te, fe = H), Ae = T[x], ct = V(Se(Ue, K), Ae, y, 0), Xe = V(Se(Ue + fe, K), Ae, y, 0), Vi(Nt(ct, Xe), ze(Xe - ct))) : Vi(0, y);
        } else
          Es();
      } else {
        let w = ze(ea - Qr), x = ze(ta - Xr);
        if (C.ori == 1) {
          let K = w;
          w = x, x = K;
        }
        He = Ve.x && w >= Ve.dist, Re = Ve.y && x >= Ve.dist;
        let E = Ve.uni;
        E != null ? He && Re && (He = w >= E, Re = x >= E, !He && !Re && (x > w ? Re = !0 : He = !0)) : Ve.x && Ve.y && (He || Re) && (He = Re = !0);
        let P, N;
        He && (C.ori == 0 ? (P = fi, N = be) : (P = pi, N = $e), Gi(Nt(P, N), ze(N - P)), Re || Vi(0, y)), Re && (C.ori == 1 ? (P = fi, N = be) : (P = pi, N = $e), Vi(Nt(P, N), ze(N - P)), He || Gi(0, b)), !He && !Re && (Gi(0, 0), Vi(0, 0));
      }
    if (Ve._x = He, Ve._y = Re, a == null) {
      if (u) {
        if (pa != null) {
          let [w, x] = Ce.scales;
          Ce.values[0] = w != null ? Gt(C.ori == 0 ? be : $e, w) : null, Ce.values[1] = x != null ? Gt(C.ori == 1 ? be : $e, x) : null;
        }
        qi(Is, i, be, $e, Z, M, d);
      }
      if (oi) {
        let w = u && Ce.setSeries, x = It.prox;
        zn == null ? tn <= x && Wt(bn, gi, !0, w) : tn > x ? Wt(null, gi, !0, w) : bn != zn && Wt(bn, gi, !0, w);
      }
    }
    _t && (ee.idx = d, As()), l !== !1 && je("setCursor");
  }
  let _n = null;
  Object.defineProperty(i, "rect", {
    get() {
      return _n == null && Ki(!1), _n;
    }
  });
  function Ki(a = !1) {
    a ? _n = null : (_n = A.getBoundingClientRect(), je("syncRect", _n));
  }
  function oa(a, l, u, d, p, b, y) {
    L._lock || mn && a != null && a.movementX == 0 && a.movementY == 0 || (Ts(a, l, u, d, p, b, y, !1, a != null), a != null ? On(null, !0, !0) : On(l, !0, !1));
  }
  function Ts(a, l, u, d, p, b, y, w, x) {
    if (_n == null && Ki(!1), Mn(a), a != null)
      u = a.clientX - _n.left, d = a.clientY - _n.top;
    else {
      if (u < 0 || d < 0) {
        be = -10, $e = -10;
        return;
      }
      let [E, P] = Ce.scales, N = l.cursor.sync, [K, le] = N.values, [re, te] = N.scales, [W, H] = Ce.match, ve = l.axes[0].side % 2 == 1, Se = C.ori == 0 ? Z : M, Ue = C.ori == 1 ? Z : M, fe = ve ? b : p, Ae = ve ? p : b, ct = ve ? d : u, Xe = ve ? u : d;
      if (re != null ? u = W(E, re) ? c(K, T[E], Se, 0) : -10 : u = Se * (ct / fe), te != null ? d = H(P, te) ? c(le, T[P], Ue, 0) : -10 : d = Ue * (Xe / Ae), C.ori == 1) {
        let yt = u;
        u = d, d = yt;
      }
    }
    x && (l == null || l.cursor.event.type == Is) && ((u <= 1 || u >= Z - 1) && (u = jn(u, Z)), (d <= 1 || d >= M - 1) && (d = jn(d, M))), w ? (Qr = u, Xr = d, [fi, pi] = L.move(i, u, d)) : (be = u, $e = d);
  }
  const Cs = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Es() {
    To(Cs, !1);
  }
  let sa, ra, aa, la;
  function ca(a, l, u, d, p, b, y) {
    mn = !0, He = Re = Ve._x = Ve._y = !1, Ts(a, l, u, d, p, b, y, !0, !1), a != null && (Qe(Ws, er, ua, !1), qi(qa, i, fi, pi, Z, M, null));
    let { left: w, top: x, width: E, height: P } = _e;
    sa = w, ra = x, aa = E, la = P;
  }
  function ua(a, l, u, d, p, b, y) {
    mn = Ve._x = Ve._y = !1, Ts(a, l, u, d, p, b, y, !1, !0);
    let { left: w, top: x, width: E, height: P } = _e, N = E > 0 || P > 0, K = sa != w || ra != x || aa != E || la != P;
    if (N && K && To(_e), Ve.setScale && N && K) {
      let le = w, re = E, te = x, W = P;
      if (C.ori == 1 && (le = x, re = P, te = w, W = E), He && gn(
        z,
        Gt(le, z),
        Gt(le + re, z)
      ), Re)
        for (let H in T) {
          let ve = T[H];
          H != z && ve.from == null && ve.min != pe && gn(
            H,
            Gt(te + W, H),
            Gt(te, H)
          );
        }
      Es();
    } else L.lock && (L._lock = !L._lock, On(l, !0, a != null));
    a != null && (ti(Ws, er), qi(Ws, i, be, $e, Z, M, null));
  }
  function _u(a, l, u, d, p, b, y) {
    if (L._lock)
      return;
    Mn(a);
    let w = mn;
    if (mn) {
      let x = !0, E = !0, P = 10, N, K;
      C.ori == 0 ? (N = He, K = Re) : (N = Re, K = He), N && K && (x = be <= P || be >= Z - P, E = $e <= P || $e >= M - P), N && x && (be = be < fi ? 0 : Z), K && E && ($e = $e < pi ? 0 : M), On(null, !0, !0), mn = !1;
    }
    be = -10, $e = -10, de.fill(null), On(null, !0, !0), w && (mn = w);
  }
  function ha(a, l, u, d, p, b, y) {
    L._lock || (Mn(a), hs(), Es(), a != null && qi(Ja, i, be, $e, Z, M, null));
  }
  function da() {
    I.forEach(ip), us(i.width, i.height, !0);
  }
  Gn(Go, Ai, da);
  const bi = {};
  bi.mousedown = ca, bi.mousemove = oa, bi.mouseup = ua, bi.dblclick = ha, bi.setSeries = (a, l, u, d) => {
    let p = Ce.match[2];
    u = p(i, l, u), u != -1 && Wt(u, d, !0, !1);
  }, Je && (Qe(qa, A, ca), Qe(Is, A, oa), Qe(Ya, A, (a) => {
    Mn(a), Ki(!1);
  }), Qe(Za, A, _u), Qe(Ja, A, ha), lr.add(i), i.syncRect = Ki);
  const Co = i.hooks = e.hooks || {};
  function je(a, l, u) {
    xs ? Wi.push([a, l, u]) : a in Co && Co[a].forEach((d) => {
      d.call(null, i, l, u);
    });
  }
  (e.plugins || []).forEach((a) => {
    for (let l in a.hooks)
      Co[l] = (Co[l] || []).concat(a.hooks[l]);
  });
  const fa = (a, l, u) => u, Ce = Ee({
    key: null,
    setSeries: !1,
    filters: {
      pub: ll,
      sub: ll
    },
    scales: [z, $[1] ? $[1].scale : null],
    match: [cl, cl, fa],
    values: [null, null]
  }, L.sync);
  Ce.match.length == 2 && Ce.match.push(fa), L.sync = Ce;
  const pa = Ce.key, Ds = Nc(pa);
  function qi(a, l, u, d, p, b, y) {
    Ce.filters.pub(a, l, u, d, p, b, y) && Ds.pub(a, l, u, d, p, b, y);
  }
  Ds.sub(i);
  function vu(a, l, u, d, p, b, y) {
    Ce.filters.sub(a, l, u, d, p, b, y) && bi[a](null, l, u, d, p, b, y);
  }
  i.pub = vu;
  function yu() {
    Ds.unsub(i), lr.delete(i), Tn.clear(), ir(Go, Ai, da), f.remove(), ue?.remove(), je("destroy");
  }
  i.destroy = yu;
  function Ps() {
    je("init", e, t), Wr(t || e.data, !1), B[z] ? $s(z, B[z]) : hs(), wo = _e.show && (_e.width > 0 || _e.height > 0), Pn = _t = !0, us(e.width, e.height);
  }
  return $.forEach(Br), I.forEach(Qc), n ? n instanceof HTMLElement ? (n.appendChild(f), Ps()) : n(i, Ps) : Ps(), i;
}
Ye.assign = Ee;
Ye.fmtNum = Er;
Ye.rangeNum = Vo;
Ye.rangeLog = es;
Ye.rangeAsinh = Tr;
Ye.orient = Zn;
Ye.pxRatio = ce;
Ye.join = Kd;
Ye.fmtDate = Pr, Ye.tzDate = sf;
Ye.sync = Nc;
{
  Ye.addGap = Uf, Ye.clipGaps = is;
  let e = Ye.paths = {
    points: Rc
  };
  e.linear = Uc, e.stepped = Wf, e.bars = Gf, e.spline = Kf;
}
const op = 24;
async function sp(e, t, n, i) {
  const o = new Date(Date.now() - n * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (r) => {
      const c = r.states ?? {};
      if (Object.keys(c).length === 0) {
        Object.keys(s).length > 0 && i(s);
        return;
      }
      const h = (Date.now() - n * 60 * 60 * 1e3) / 1e3;
      for (const [f, g] of Object.entries(c)) {
        const m = s[f] ?? [];
        s[f] = [...m, ...g].filter((_) => _.lu >= h);
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
function eo(e) {
  if (!e) return [];
  const t = [];
  for (const n of e) {
    const i = parseFloat(n.s);
    Number.isFinite(i) && t.push([n.lu, i]);
  }
  return t.sort((n, i) => n[0] - i[0]), t;
}
function rp(e, t) {
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
const ap = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var lp = Object.defineProperty, as = (e, t, n, i) => {
  for (var o = void 0, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = r(t, n, o) || o);
  return o && lp(t, n, o), o;
};
const cp = [
  We,
  qo(ap),
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
], Pl = () => {
};
class ji extends Te {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = cp;
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
      const i = n[0]?.contentRect.width ?? 0;
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
}
as([
  G()
], ji.prototype, "_loading");
as([
  G()
], ji.prototype, "_error");
as([
  G()
], ji.prototype, "_empty");
as([
  zi(".chart-host")
], ji.prototype, "_host");
var up = Object.defineProperty, hp = Object.getOwnPropertyDescriptor, un = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && up(t, n, o), o;
};
const ur = 260, dp = 3;
let Ft = class extends ji {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return ur;
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
    this._unsubscribe && this._unsubscribe !== Pl && this._unsubscribe(), this._unsubscribe = Pl;
    const e = dp + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
    this._plot && this._plot.series.length !== 1 + e && this._destroyPlot();
    const t = ++this._fetchGen;
    this._loading = !0, this._error = null, this._empty = !1;
    const n = [
      this.roomEntity,
      this.lowEntity,
      this.highEntity,
      this.actionEntity,
      this.apparentEntity,
      this.humidityEntity
    ].filter((i) => !!i);
    try {
      const i = await sp(this.hass, n, op, (o) => {
        t === this._fetchGen && (this._renderPlot(o), this._loading = !1);
      });
      if (t !== this._fetchGen) {
        i();
        return;
      }
      this._unsubscribe = i;
    } catch (i) {
      if (t !== this._fetchGen) return;
      this._error = i instanceof Error ? i.message : "Failed to load history.", this._loading = !1, this._destroyPlot();
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
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(e, t) {
    if (!e) return [];
    const n = [...e].sort((o, s) => o.lu - s.lu), i = [];
    for (let o = 0; o < n.length; o++) {
      const s = n[o].lu, r = n[o + 1]?.lu ?? t, c = n[o].s;
      (c === "heating" || c === "cooling") && i.push({ start: s, end: r, action: c });
    }
    return i;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), n = eo(e[this.roomEntity]), i = eo(e[this.lowEntity]), o = eo(e[this.highEntity]), s = this._hasApparent ? eo(e[this.apparentEntity]) : [], r = this._hasHumidity ? eo(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), n.length === 0 && i.length === 0 && o.length === 0 && s.length === 0 && r.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const c = [n, i, o];
    this._hasApparent && c.push(s), this._hasHumidity && c.push(r);
    const h = rp(c, t), f = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: f.width, height: f.height }), this._plot.setData(h), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Ye(f, h, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = this._resolveColor("--cb-action-heating", "#d9603f"), n = this._resolveColor("--cb-action-cooling", "#2f7fcc"), i = this._resolveColor("--primary-color", "#03a9f4"), o = this._resolveColor("--secondary-text-color", "#727272"), s = this._resolveColor("--divider-color", "#e0e0e0"), r = [
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
    this._hasApparent && r.push({
      label: "Apparent",
      stroke: i,
      width: 1.5,
      dash: [4, 3],
      spanGaps: !0,
      show: !this._hiddenLabels.has("Apparent")
    }), this._hasHumidity && r.push({
      label: "Humidity",
      scale: "y2",
      stroke: o,
      width: 1.2,
      spanGaps: !0,
      show: !this._hiddenLabels.has("Humidity")
    });
    const c = [
      {
        stroke: o,
        grid: { stroke: s }
      },
      {
        stroke: o,
        grid: { stroke: s },
        size: 38
      }
    ];
    this._hasHumidity && c.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: o,
      grid: { show: !1 },
      values: (f, g) => g.map((m) => `${m.toFixed(0)}%`)
    });
    const h = {
      x: { time: !0 }
    };
    return this._hasHumidity && (h.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: ur,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: h,
      axes: c,
      series: r,
      hooks: {
        draw: [
          (f) => {
            const g = f.ctx;
            if (!g) return;
            const m = f.bbox.top, _ = f.bbox.height;
            g.save();
            for (const S of this._intervals) {
              const A = f.valToPos(S.start, "x", !0), O = f.valToPos(S.end, "x", !0);
              O <= A || (g.fillStyle = S.action === "heating" ? Ml(t, 0.18) : Ml(n, 0.18), g.fillRect(A, m, O - A, _));
            }
            g.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return v`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return v`
      ${this._loading ? v`<div class="status">Loading 24 h history…</div>` : k}
      ${this._error ? v`<div class="status">${this._error}</div>` : k}
      ${this._empty ? v`<div class="status">
            No history available yet — check back after the first hour of data.
          </div>` : k}
      <div class="chart-host ${e ? "idle" : ""}" role="img" aria-label=${t}></div>
      ${e ? k : this._renderLegend()}
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
    return v`<div class="legend">
      ${this._toggleItem(
      "Room",
      v`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      v`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : k}
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
    ) : k}
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
Ft.styles = [
  ...ji.styles,
  De`
      .chart-host {
        height: ${qo(ur)}px;
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
un([
  D({ attribute: !1 })
], Ft.prototype, "hass", 2);
un([
  D({ type: String })
], Ft.prototype, "roomEntity", 2);
un([
  D({ type: String })
], Ft.prototype, "lowEntity", 2);
un([
  D({ type: String })
], Ft.prototype, "highEntity", 2);
un([
  D({ type: String })
], Ft.prototype, "actionEntity", 2);
un([
  D({ type: String })
], Ft.prototype, "apparentEntity", 2);
un([
  D({ type: String })
], Ft.prototype, "humidityEntity", 2);
un([
  G()
], Ft.prototype, "_hiddenLabels", 2);
Ft = un([
  Ie("comfort-band-history-chart")
], Ft);
function Ml(e, t) {
  const n = e.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let s = i[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const r = parseInt(s.slice(0, 2), 16), c = parseInt(s.slice(2, 4), 16), h = parseInt(s.slice(4, 6), 16);
    return `rgba(${r}, ${c}, ${h}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : n;
}
var fp = Object.defineProperty, pp = Object.getOwnPropertyDescriptor, Hr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? pp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && fp(t, n, o), o;
};
let mo = class extends Te {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return v`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, n = Yl(this.hass, e), i = t ?? "", o = t && n ? n : "";
    return v`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${e}
        .lowEntity=${this.entities?.effectiveLow ?? ""}
        .highEntity=${this.entities?.effectiveHigh ?? ""}
        .actionEntity=${this.entities?.currentAction ?? ""}
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
    return e ? t ? k : v`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>` : v`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
mo.styles = [
  We,
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
Hr([
  D({ attribute: !1 })
], mo.prototype, "hass", 2);
Hr([
  D({ attribute: !1 })
], mo.prototype, "entities", 2);
mo = Hr([
  Ie("comfort-band-insights-tab")
], mo);
var mp = Object.defineProperty, gp = Object.getOwnPropertyDescriptor, _o = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? gp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && mp(t, n, o), o;
};
function bp(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Nl(e, t) {
  return `${e} ${t}${e === 1 ? "" : "s"}`;
}
const Ys = 10, _p = {
  too_cold: "Too cool",
  just_right: "Just right",
  too_hot: "Too warm"
}, vp = {
  wls: "Fitted",
  cached: "Earlier",
  previous: "Run before",
  rejected: "Set aside",
  none: "—"
};
let qn = class extends Te {
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
      const n = Array.isArray(t?.entries) ? t.entries : [];
      this._feedback = { kind: "ready", entries: n };
    } catch (t) {
      if (this._fetchedFor !== e) return;
      const n = typeof t == "object" && t !== null ? t.code : void 0;
      this._feedback = { kind: n === "unknown_command" ? "old" : "error" };
    }
  }
  render() {
    if (!this.hass || !this.entities) return k;
    const e = Ql(this.hass, this.entities), t = ec(this.hass, this.entities);
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
    return v`<div class="row" data-diag=${i || k}>
      <div class="row-label">
        <div class="title">${e}</div>
        ${n ? v`<div class="desc">${n}</div>` : k}
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
    ) : k;
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
    }, o = (s) => s ? yh[s] : "Can’t tell";
    return v`
      ${n}
      ${this._row(
      "Deciding now",
      e.controller ? Jl[e.controller] : "Can’t tell",
      e.controller ? e.reason ? i[e.reason] : "" : "Some of what decides it can’t be read.",
      "controller"
    )}
      ${this._row("Its decision", o(e.decision), "", "decision")}
      ${typeof t.predictedAction == "string" ? this._row("Learning would", o(e.learning), "", "learning") : k}
      ${typeof t.mpcAction == "string" || typeof t.mpcReady == "string" ? this._row(
      "Predictive control would",
      e.predictive === "not-ready" ? "Not ready yet" : o(e.predictive),
      "",
      "predictive"
    ) : k}
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
                    <td>${i.method ? vp[i.method] ?? i.method : "—"}</td>
                  </tr>`
    )}
            </tbody>
          </table>
        </div>
        <div class="note">
          ${e.windowMinutes !== null && e.sampleCount !== null ? `Learning keeps ${Nl(e.sampleCount, "reading")}, spanning ${Nl(Math.round(e.windowMinutes), "minute")}.` : ""}
          ${e.updated !== null ? `The newest is from ${Wn(e.updated, Date.now(), this.hass)}.` : ""}
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
    const t = Date.now(), n = e.entries.slice(-Ys).reverse();
    return v`
      <ul>
        ${n.map((i) => this._renderEntry(i, t))}
      </ul>
      ${e.entries.length > Ys ? v`<div class="note">The last ${Ys} of ${e.entries.length}.</div>` : k}
    `;
  }
  _renderEntry(e, t) {
    const n = Date.parse(e.timestamp), i = zt({ low: e.low, high: e.high }), o = typeof e.room_temp == "number" ? `${Zt(e.room_temp)}°, range ${i}` : `no reading, range ${i}`, s = [
      e.room_source === "fallback_sensor" || e.room_source === "climate" ? "stand-in reading" : "",
      e.peak_state === "active" ? "during a peak" : e.peak_state === "preconditioning" ? "ahead of a peak" : ""
    ].filter(Boolean);
    return v`<li>
      <span class="said">${_p[e.label] ?? e.label}</span>
      <div class="detail">
        ${bp(
      [Number.isFinite(n) ? Wn(n, t, this.hass) : "", o, ...s].filter(Boolean).join(" · ")
    )}
      </div>
    </li>`;
  }
};
qn.styles = [
  We,
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
        margin-left: auto;
        max-width: 100%;
        overflow-wrap: anywhere;
        font-size: 14px;
        color: var(--cb-text-primary);
        text-align: right;
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
      details.more > summary::before {
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
        text-align: right;
        white-space: nowrap;
      }
      th:first-child,
      td:first-child {
        padding-left: 0;
        text-align: left;
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
_o([
  D({ attribute: !1 })
], qn.prototype, "hass", 2);
_o([
  D({ type: String })
], qn.prototype, "zone", 2);
_o([
  D({ attribute: !1 })
], qn.prototype, "entities", 2);
_o([
  G()
], qn.prototype, "_feedback", 2);
qn = _o([
  Ie("comfort-band-diagnostics-tab")
], qn);
var yp = Object.defineProperty, wp = Object.getOwnPropertyDescriptor, hn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? wp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && yp(t, n, o), o;
};
let Lt = class extends Te {
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
Lt.styles = [
  We,
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
hn([
  D({ type: Number })
], Lt.prototype, "min", 2);
hn([
  D({ type: Number })
], Lt.prototype, "max", 2);
hn([
  D({ type: Number })
], Lt.prototype, "step", 2);
hn([
  D({ type: Number })
], Lt.prototype, "low", 2);
hn([
  D({ type: Number })
], Lt.prototype, "high", 2);
hn([
  D({ type: String })
], Lt.prototype, "unit", 2);
hn([
  G()
], Lt.prototype, "_dragging", 2);
hn([
  zi(".track")
], Lt.prototype, "_track", 2);
Lt = hn([
  Ie("dual-handle-slider")
], Lt);
var xp = Object.defineProperty, $p = Object.getOwnPropertyDescriptor, Jn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? $p(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && xp(t, n, o), o;
};
const kp = 16, Sp = 26, hr = 0.5, Zs = 3, Ap = "Couldn’t set the range. Try again.";
let an = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._heldRange = null, this._chain = Promise.resolve(), this._onInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onChange = (e) => {
      if (this._pendingLow = null, this._pendingHigh = null, !this.hass || !this.zone) return;
      const t = this.hass, n = {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high,
        hours: Zs
      };
      this._chain = this._chain.then(() => Xs(t, n)).catch(() => this.announce?.(Ap));
    };
  }
  render() {
    if (!this.hass || !this.entities) return k;
    const e = Oi(this.hass, this.entities), t = zl(this.hass, this.entities.manualLow), n = zl(this.hass, this.entities.manualHigh), i = Tp(e.band.low, e.band.high, t, n), o = this._pendingLow ?? i.low, s = this._pendingHigh ?? i.high, r = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(kp, Math.floor(i.low)),
      max: Math.max(Sp, Math.ceil(i.high))
    };
    this._heldRange = r;
    const c = e.scheduled === !1 ? "Sets this room’s range until you change it." : e.scheduled === !0 ? `Sets this room’s range for ${Zs} hours, then the schedule takes over again.` : `Sets this room’s range for ${Zs} hours.`;
    return v`
      <div role="group" aria-labelledby="exact-range-title" aria-describedby="exact-range-desc">
        <div class="title" id="exact-range-title">Set an exact range</div>
        <div class="desc" id="exact-range-desc">${c}</div>
        <dual-handle-slider
          .min=${r.min}
          .max=${r.max}
          .step=${hr}
          .low=${o}
          .high=${s}
          @input=${this._onInput}
          @change=${this._onChange}
        ></dual-handle-slider>
      </div>
    `;
  }
};
an.styles = [
  We,
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
Jn([
  D({ attribute: !1 })
], an.prototype, "hass", 2);
Jn([
  D({ type: String })
], an.prototype, "zone", 2);
Jn([
  D({ attribute: !1 })
], an.prototype, "entities", 2);
Jn([
  D({ attribute: !1 })
], an.prototype, "announce", 2);
Jn([
  G()
], an.prototype, "_pendingLow", 2);
Jn([
  G()
], an.prototype, "_pendingHigh", 2);
an = Jn([
  Ie("comfort-band-exact-range")
], an);
function zl(e, t) {
  const n = t !== null ? e.states[t] : void 0;
  if (!n) return NaN;
  const i = parseFloat(n.state);
  return Number.isFinite(i) ? i : NaN;
}
function Tp(e, t, n, i) {
  let o = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (o = e, s = t) : Number.isFinite(n) && Number.isFinite(i) && (o = n, s = i), o = Math.round(o * 10) / 10, s = Math.round(s * 10) / 10, s - o < hr && (s = o + hr), { low: o, high: s };
}
var Cp = Object.defineProperty, Ep = Object.getOwnPropertyDescriptor, Qn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ep(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Cp(t, n, o), o;
};
let ln = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this._historyOpen = !1, this._diagnosticsOpen = !1;
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
    const n = this._state(this.entities?.[e] ?? null);
    return n === "on" ? `${t} on` : n === "off" ? `${t} off` : "";
  }
  _schedulesSummary() {
    if (!this.hass) return "";
    const e = Qo(this.hass), t = e !== null ? this.hass.states[e] : void 0;
    if (!yr(t))
      return Bo(this.hass) ? "Not available right now" : "No profiles set up";
    const n = t.state;
    return !n || n === "unknown" ? "" : `Profile: ${n}`;
  }
  _section(e, t, n, i, o) {
    return v`
      <details
        data-section=${e}
        @toggle=${o ? (s) => o(s.target.open) : k}
      >
        <summary>
          <span class="label">
            <span class="name">${t}</span>
            ${n ? v`<span class="summary">${n}</span>` : k}
          </span>
        </summary>
        <div class="content">${i}</div>
      </details>
    `;
  }
  render() {
    return !this.hass || !this.entities ? k : v`
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
      kh(Ql(this.hass, this.entities)),
      this._diagnosticsOpen ? v`<comfort-band-diagnostics-tab
              .hass=${this.hass}
              .zone=${this.zone}
              .entities=${this.entities}
            ></comfort-band-diagnostics-tab>` : k,
      (e) => this._diagnosticsOpen = e
    )}
      ${this._section(
      "history",
      "History",
      "Last 24 hours",
      this._historyOpen ? v`<comfort-band-insights-tab
              .hass=${this.hass}
              .entities=${this.entities}
            ></comfort-band-insights-tab>` : k,
      (e) => this._historyOpen = e
    )}
    `;
  }
};
ln.styles = [
  We,
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
], ln.prototype, "_historyOpen", 2);
Qn([
  G()
], ln.prototype, "_diagnosticsOpen", 2);
ln = Qn([
  Ie("comfort-band-advanced-tab")
], ln);
var Dp = Object.defineProperty, Pp = Object.getOwnPropertyDescriptor, dn = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Pp(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Dp(t, n, o), o;
};
const Rn = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "advanced", label: "Advanced" }
];
let Ht = class extends Te {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._refusal = null, this._refusals = 0, this._announce = (e) => {
      !this._isOpen || !this.isConnected || (this._refusal = { words: e, n: ++this._refusals });
    }, this._quiet = () => {
      this._refusal = null;
    }, this._quietOnPress = { handleEvent: this._quiet, capture: !0 }, this._onClose = () => {
      this._isOpen = !1, this._refusal = null, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Rn.findIndex((o) => o.id === this._activeTab);
      if (t < 0) return;
      let n;
      switch (e.key) {
        case "ArrowLeft":
          n = (t - 1 + Rn.length) % Rn.length;
          break;
        case "ArrowRight":
          n = (t + 1) % Rn.length;
          break;
        case "Home":
          n = 0;
          break;
        case "End":
          n = Rn.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const i = Rn[n].id;
      this._activeTab = i, this.updateComplete.then(() => {
        this.renderRoot.querySelector(`#cb-tab-${i}`)?.focus();
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
  disconnectedCallback() {
    super.disconnectedCallback(), this._refusal = null;
  }
  render() {
    if (!this._isOpen) return k;
    const e = this.zoneName || this.zone || "Comfort Band";
    return v`
      <dialog
        @close=${this._onClose}
        @pointerdown=${this._quietOnPress}
        @keydown=${this._quietOnPress}
      >
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Rn.map(
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
          ${this._refusal ? ch(this._refusal.n, v`<span>${this._refusal.words}</span>`) : k}
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
Ht.styles = [
  We,
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
    `
];
dn([
  D({ attribute: !1 })
], Ht.prototype, "hass", 2);
dn([
  D({ type: String })
], Ht.prototype, "zone", 2);
dn([
  D({ type: String })
], Ht.prototype, "zoneName", 2);
dn([
  D({ attribute: !1 })
], Ht.prototype, "entities", 2);
dn([
  G()
], Ht.prototype, "_activeTab", 2);
dn([
  G()
], Ht.prototype, "_isOpen", 2);
dn([
  G()
], Ht.prototype, "_refusal", 2);
dn([
  zi("dialog")
], Ht.prototype, "_dialog", 2);
Ht = dn([
  Ie("comfort-band-modal")
], Ht);
var Mp = Object.defineProperty, Np = Object.getOwnPropertyDescriptor, Rr = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Np(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Mp(t, n, o), o;
};
let go = class extends Te {
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
    const e = ql(this.hass, this.config.zone);
    return wr(this.hass, { zone: this.config.zone }, e);
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
go.styles = [
  We,
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
Rr([
  D({ attribute: !1 })
], go.prototype, "hass", 2);
Rr([
  D({ attribute: !1 })
], go.prototype, "config", 2);
go = Rr([
  Ie("comfort-band-card-editor")
], go);
var zp = Object.defineProperty, Op = Object.getOwnPropertyDescriptor, ls = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Op(t, n) : t, s = e.length - 1, r; s >= 0; s--)
    (r = e[s]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && zp(t, n, o), o;
};
let Ni = class extends Te {
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
    const e = this._config.zone, t = ql(this.hass, e);
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
  _buildView(e, t) {
    const n = Oi(e, t), i = Il({
      ...n,
      peak: xr(e, t),
      doing: null,
      now: Date.now(),
      formatTime: (o) => Si(o, e)
    });
    return {
      zoneName: wr(e, this._config, t),
      temperature: n.temperature,
      feelsLike: n.feelsLike,
      low: n.band.low,
      high: n.band.high,
      action: _r(n) ? n.action : "unknown",
      statusKind: i.kind,
      statusText: i.text,
      badges: th(n)
    };
  }
};
Ni.styles = [
  We,
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
ls([
  D({ attribute: !1 })
], Ni.prototype, "hass", 2);
ls([
  G()
], Ni.prototype, "_config", 2);
ls([
  zi("comfort-band-modal")
], Ni.prototype, "_modal", 2);
Ni = ls([
  Ie("comfort-band-card")
], Ni);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.21.2 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
