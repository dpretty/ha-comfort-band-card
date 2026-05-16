const ro = globalThis, $r = ro.ShadowRoot && (ro.ShadyCSS === void 0 || ro.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Sr = Symbol(), xs = /* @__PURE__ */ new WeakMap();
let Sl = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Sr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if ($r && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = xs.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && xs.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Al = (e) => new Sl(typeof e == "string" ? e : e + "", void 0, Sr), te = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Sl(i, e, Sr);
}, Qa = (e, t) => {
  if ($r) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = ro.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, $s = $r ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Al(i);
})(e) : e;
const { is: Xa, defineProperty: tc, getOwnPropertyDescriptor: ec, getOwnPropertyNames: ic, getOwnPropertySymbols: nc, getPrototypeOf: oc } = Object, mo = globalThis, Ss = mo.trustedTypes, rc = Ss ? Ss.emptyScript : "", sc = mo.reactiveElementPolyfillSupport, zn = (e, t) => e, lo = { toAttribute(e, t) {
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
} }, Ar = (e, t) => !Xa(e, t), As = { attribute: !0, type: String, converter: lo, reflect: !1, useDefault: !1, hasChanged: Ar };
Symbol.metadata ??= Symbol("metadata"), mo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let on = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = As) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && tc(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = ec(this.prototype, t) ?? { get() {
      return this[i];
    }, set(l) {
      this[i] = l;
    } };
    return { get: o, set(l) {
      const h = o?.call(this);
      s?.call(this, l), this.requestUpdate(t, h, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? As;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zn("elementProperties"))) return;
    const t = oc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zn("properties"))) {
      const i = this.properties, n = [...ic(i), ...nc(i)];
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
      for (const o of n) i.unshift($s(o));
    } else t !== void 0 && i.push($s(t));
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
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : lo).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : lo;
      this._$Em = o;
      const h = l.fromAttribute(i, s.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Ar)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, l) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, l ?? i ?? this[t]), s !== !0 || l !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: l } = s, h = this[o];
        l !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, s, h);
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
on.elementStyles = [], on.shadowRootOptions = { mode: "open" }, on[zn("elementProperties")] = /* @__PURE__ */ new Map(), on[zn("finalized")] = /* @__PURE__ */ new Map(), sc?.({ ReactiveElement: on }), (mo.reactiveElementVersions ??= []).push("2.1.2");
const kr = globalThis, ks = (e) => e, ao = kr.trustedTypes, Es = ao ? ao.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, kl = "$lit$", ci = `lit$${Math.random().toFixed(9).slice(2)}$`, El = "?" + ci, lc = `<${El}>`, Di = document, Hn = () => Di.createComment(""), Ln = (e) => e === null || typeof e != "object" && typeof e != "function", Er = Array.isArray, ac = (e) => Er(e) || typeof e?.[Symbol.iterator] == "function", Jo = `[ 	
\f\r]`, En = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ps = /-->/g, Ts = />/g, ki = RegExp(`>|${Jo}(?:([^\\s"'>=/]+)(${Jo}*=${Jo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cs = /'/g, Ms = /"/g, Pl = /^(?:script|style|textarea|title)$/i, Tl = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), U = Tl(1), ui = Tl(2), ln = Symbol.for("lit-noChange"), at = Symbol.for("lit-nothing"), Ds = /* @__PURE__ */ new WeakMap(), Ci = Di.createTreeWalker(Di, 129);
function Cl(e, t) {
  if (!Er(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Es !== void 0 ? Es.createHTML(t) : t;
}
const cc = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = En;
  for (let h = 0; h < i; h++) {
    const f = e[h];
    let p, b, g = -1, _ = 0;
    for (; _ < f.length && (l.lastIndex = _, b = l.exec(f), b !== null); ) _ = l.lastIndex, l === En ? b[1] === "!--" ? l = Ps : b[1] !== void 0 ? l = Ts : b[2] !== void 0 ? (Pl.test(b[2]) && (o = RegExp("</" + b[2], "g")), l = ki) : b[3] !== void 0 && (l = ki) : l === ki ? b[0] === ">" ? (l = o ?? En, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? ki : b[3] === '"' ? Ms : Cs) : l === Ms || l === Cs ? l = ki : l === Ps || l === Ts ? l = En : (l = ki, o = void 0);
    const A = l === ki && e[h + 1].startsWith("/>") ? " " : "";
    s += l === En ? f + lc : g >= 0 ? (n.push(p), f.slice(0, g) + kl + f.slice(g) + ci + A) : f + ci + (g === -2 ? h : A);
  }
  return [Cl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Rn {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, f = this.parts, [p, b] = cc(t, i);
    if (this.el = Rn.createElement(p, n), Ci.currentNode = this.el.content, i === 2 || i === 3) {
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
  static createElement(t, i) {
    const n = Di.createElement("template");
    return n.innerHTML = t, n;
  }
}
function an(e, t, i = e, n) {
  if (t === ln) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Ln(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = an(e, o._$AS(e, t.values), o, n)), t;
}
class uc {
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
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? Di).importNode(i, !0);
    Ci.currentNode = o;
    let s = Ci.nextNode(), l = 0, h = 0, f = n[0];
    for (; f !== void 0; ) {
      if (l === f.index) {
        let p;
        f.type === 2 ? p = new Vn(s, s.nextSibling, this, t) : f.type === 1 ? p = new f.ctor(s, f.name, f.strings, this, t) : f.type === 6 && (p = new pc(s, this, t)), this._$AV.push(p), f = n[++h];
      }
      l !== f?.index && (s = Ci.nextNode(), l++);
    }
    return Ci.currentNode = Di, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Vn {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = at, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = an(this, t, i), Ln(t) ? t === at || t == null || t === "" ? (this._$AH !== at && this._$AR(), this._$AH = at) : t !== this._$AH && t !== ln && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ac(t) ? this.k(t) : this._(t);
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
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Rn.createElement(Cl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const s = new uc(o, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Ds.get(t.strings);
    return i === void 0 && Ds.set(t.strings, i = new Rn(t)), i;
  }
  k(t) {
    Er(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new Vn(this.O(Hn()), this.O(Hn()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = ks(t).nextSibling;
      ks(t).remove(), t = n;
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
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = at, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = at;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = an(this, t, i, 0), l = !Ln(t) || t !== this._$AH && t !== ln, l && (this._$AH = t);
    else {
      const h = t;
      let f, p;
      for (t = s[0], f = 0; f < s.length - 1; f++) p = an(this, h[n + f], i, f), p === ln && (p = this._$AH[f]), l ||= !Ln(p) || p !== this._$AH[f], p === at ? t = at : t !== at && (t += (p ?? "") + s[f + 1]), this._$AH[f] = p;
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
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = an(this, t, i, 0) ?? at) === ln) return;
    const n = this._$AH, o = t === at && n !== at || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== at && (n === at || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class pc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    an(this, t);
  }
}
const gc = kr.litHtmlPolyfillSupport;
gc?.(Rn, Vn), (kr.litHtmlVersions ??= []).push("3.3.2");
const mc = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = o = new Vn(t.insertBefore(Hn(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const Pr = globalThis;
class Vt extends on {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = mc(i, this.renderRoot, this.renderOptions);
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
Vt._$litElement$ = !0, Vt.finalized = !0, Pr.litElementHydrateSupport?.({ LitElement: Vt });
const _c = Pr.litElementPolyfillSupport;
_c?.({ LitElement: Vt });
(Pr.litElementVersions ??= []).push("4.2.2");
const ae = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const bc = { attribute: !0, type: String, converter: lo, reflect: !1, hasChanged: Ar }, vc = (e = bc, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: l } = i;
    return { set(h) {
      const f = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(l, f, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(l, void 0, e, h), h;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(h) {
      const f = this[l];
      t.call(this, h), this.requestUpdate(l, f, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Y(e) {
  return (t, i) => typeof i == "object" ? vc(e, t, i) : ((n, o, s) => {
    const l = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
function $t(e) {
  return Y({ ...e, state: !0, attribute: !1 });
}
const wc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function Bn(e, t) {
  return (i, n, o) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return wc(i, n, { get() {
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
var yc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, jn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? xc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && yc(t, i, o), o;
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
    const e = uo(this.action), t = co(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), o = Number.isFinite(this.room), s = i ? Qo(this.low) : 0, l = n ? Qo(this.high) : 100, h = Math.min(s, l), f = Math.max(0, Math.abs(l - s)), p = o ? Qo(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return U`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${ui`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? ui`<rect class="band" x=${h} y="9" width=${f} height="6" rx="3" fill=${t}></rect>` : null}
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
var Sc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, We = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ac(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Sc(t, i, o), o;
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
    const e = uo(this.action), t = e === "heating" || e === "cooling", i = t ? `--cb-mini-bg:${co(e)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${ur(e)}` : ""}`;
    return U`
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
  const i = t - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const o = Math.floor(n / 60), s = n % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
var Ec = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, ei = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Pc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Ec(t, i, o), o;
};
let De = class extends Vt {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (e, t) => {
      e.preventDefault();
      const i = e.currentTarget;
      i.setPointerCapture(e.pointerId), this._dragging = t;
      const n = (s) => {
        this._setHandle(t, this._xToValue(s.clientX)) && this._fire("input");
      }, o = (s) => {
        i.releasePointerCapture(s.pointerId), i.removeEventListener("pointermove", n), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o), this._dragging = null, this._fire("change");
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
function Tc(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Cc(e, t) {
  return e.callService(bo, "set_schedule", { ...t });
}
function Mc(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(bo, "start_override", i);
}
function Dc(e, t) {
  return e.callService(bo, "cancel_override", { ...t });
}
function zc(e, t) {
  return e.callService(bo, "set_profile", { ...t });
}
var Oc = Object.defineProperty, Nc = Object.getOwnPropertyDescriptor, pn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Nc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Oc(t, i, o), o;
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
    const i = parseFloat(t.state);
    return Number.isFinite(i) ? i : NaN;
  }
  render() {
    if (!this.hass || !this.entities) return at;
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), o = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.overrideHours), l = this._stateOf(this.entities.currentAction)?.state ?? "unknown", h = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._pendingLow ?? (Number.isFinite(e) ? e : 19), p = this._pendingHigh ?? (Number.isFinite(t) ? t : 22), b = uo(l), g = b !== "idle" && b !== "unknown";
    return U`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(o) ? `${o.toFixed(1)}°` : "—"}</div>
        ${g ? U`<span class="action-chip" style="background:${co(b)}"
              >${ur(b)}</span
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
  _renderOverrideSection(e) {
    if (!e) return at;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = Lc(t ?? null);
    return U`
      <section>
        <h3>Override</h3>
        <div class="override-row">
          <span>Active${i ? ` · ${i}` : ""}</span>
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
  const i = t - Date.now();
  if (i <= 0) return "";
  const n = Math.round(i / 6e4);
  if (n < 60) return `${n}m left`;
  const o = Math.floor(n / 60), s = n % 60;
  return s ? `${o}h ${s}m left` : `${o}h left`;
}
const Tr = "comfort_band", Rc = {
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
  for (const i of Object.values(e.devices))
    for (const [n, o] of i.identifiers)
      if (n === t[0] && o === t[1])
        return i;
  return null;
}
function zl(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Tr
  );
}
function Uc(e, t) {
  const i = Fc(), n = Dl(e, [Tr, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const o of zl(e, n.id)) {
    const s = o.translation_key;
    if (s === null) continue;
    const l = Rc[s];
    l !== void 0 && (i[l] = o.entity_id);
  }
  return i;
}
function Ol(e) {
  const t = Dl(e, [Tr, "profile_manager"]);
  if (t === null) return null;
  for (const i of zl(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
var Ic = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, Nl = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Vc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Ic(t, i, o), o;
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
    const t = this.hass.states[e], i = t?.attributes.options, n = Array.isArray(i) ? i.filter((s) => typeof s == "string") : [], o = t?.state ?? "";
    return n.length === 0 ? U`<div class="empty">No profiles configured.</div>` : U`
      <ul role="listbox" aria-label="Profiles">
        ${n.map(
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
const Bc = !0, zt = "u-", jc = "uplot", Wc = zt + "hz", Yc = zt + "vt", Gc = zt + "title", Kc = zt + "wrap", qc = zt + "under", Zc = zt + "over", Jc = zt + "axis", Ti = zt + "off", Qc = zt + "select", Xc = zt + "cursor-x", tu = zt + "cursor-y", eu = zt + "cursor-pt", iu = zt + "legend", nu = zt + "live", ou = zt + "inline", ru = zt + "series", su = zt + "marker", zs = zt + "label", lu = zt + "value", Cn = "width", Mn = "height", Pn = "top", Os = "bottom", en = "left", Xo = "right", Cr = "#000", Ns = Cr + "0", tr = "mousemove", Hs = "mousedown", er = "mouseup", Ls = "mouseenter", Rs = "mouseleave", Fs = "dblclick", au = "resize", cu = "scroll", Us = "change", fo = "dppxchange", Mr = "--", gn = typeof window < "u", fr = gn ? document : null, sn = gn ? window : null, uu = gn ? navigator : null;
let lt, eo;
function dr() {
  let e = devicePixelRatio;
  lt != e && (lt = e, eo && gr(Us, eo, dr), eo = matchMedia(`(min-resolution: ${lt - 1e-3}dppx) and (max-resolution: ${lt + 1e-3}dppx)`), Mi(Us, eo, dr), sn.dispatchEvent(new CustomEvent(fo)));
}
function se(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function pr(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function vt(e, t, i) {
  e.style[t] = i + "px";
}
function Pe(e, t, i, n) {
  let o = fr.createElement(e);
  return t != null && se(o, t), i?.insertBefore(o, n), o;
}
function be(e, t) {
  return Pe("div", e, t);
}
const Is = /* @__PURE__ */ new WeakMap();
function Ue(e, t, i, n, o) {
  let s = "translate(" + t + "px," + i + "px)", l = Is.get(e);
  s != l && (e.style.transform = s, Is.set(e, s), t < 0 || i < 0 || t > n || i > o ? se(e, Ti) : pr(e, Ti));
}
const Vs = /* @__PURE__ */ new WeakMap();
function Bs(e, t, i) {
  let n = t + i, o = Vs.get(e);
  n != o && (Vs.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const js = /* @__PURE__ */ new WeakMap();
function Ws(e, t, i, n) {
  let o = t + "" + i, s = js.get(e);
  o != s && (js.set(e, o), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Dr = { passive: !0 }, hu = { ...Dr, capture: !0 };
function Mi(e, t, i, n) {
  t.addEventListener(e, i, n ? hu : Dr);
}
function gr(e, t, i, n) {
  t.removeEventListener(e, i, Dr);
}
gn && dr();
function Ce(e, t, i, n) {
  let o;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    o = s ? i + n >> 1 : le((i + n) / 2), t[o] < e ? i = o : n = o;
  return e - t[i] <= t[n] - e ? i : n;
}
function Hl(e) {
  return (i, n, o) => {
    let s = -1, l = -1;
    for (let h = n; h <= o; h++)
      if (e(i[h])) {
        s = h;
        break;
      }
    for (let h = o; h >= n; h--)
      if (e(i[h])) {
        l = h;
        break;
      }
    return [s, l];
  };
}
const Ll = (e) => e != null, Rl = (e) => e != null && e > 0, vo = Hl(Ll), fu = Hl(Rl);
function du(e, t, i, n = 0, o = !1) {
  let s = o ? fu : vo, l = o ? Rl : Ll;
  [t, i] = s(e, t, i);
  let h = e[t], f = e[t];
  if (t > -1)
    if (n == 1)
      h = e[t], f = e[i];
    else if (n == -1)
      h = e[i], f = e[t];
    else
      for (let p = t; p <= i; p++) {
        let b = e[p];
        l(b) && (b < h ? h = b : b > f && (f = b));
      }
  return [h ?? dt, f ?? -dt];
}
function wo(e, t, i, n) {
  let o = Ks(e), s = Ks(t);
  e == t && (o == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Xe : Fl, h = o == 1 ? le : ve, f = s == 1 ? ve : le, p = h(l(Dt(e))), b = f(l(Dt(t))), g = cn(i, p), _ = cn(i, b);
  return i == 10 && (p < 0 && (g = pt(g, -p)), b < 0 && (_ = pt(_, -b))), n || i == 2 ? (e = g * o, t = _ * s) : (e = Bl(e, g), t = yo(t, _)), [e, t];
}
function zr(e, t, i, n) {
  let o = wo(e, t, i, n);
  return e == 0 && (o[0] = 0), t == 0 && (o[1] = 0), o;
}
const Or = 0.1, Ys = {
  mode: 3,
  pad: Or
}, On = {
  pad: 0,
  soft: null,
  mode: 0
}, pu = {
  min: On,
  max: On
};
function po(e, t, i, n) {
  return xo(i) ? Gs(e, t, i) : (On.pad = i, On.soft = n ? 0 : null, On.mode = n ? 3 : 0, Gs(e, t, pu));
}
function rt(e, t) {
  return e ?? t;
}
function gu(e, t, i) {
  for (t = rt(t, 0), i = rt(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Gs(e, t, i) {
  let n = i.min, o = i.max, s = rt(n.pad, 0), l = rt(o.pad, 0), h = rt(n.hard, -dt), f = rt(o.hard, dt), p = rt(n.soft, dt), b = rt(o.soft, -dt), g = rt(n.mode, 0), _ = rt(o.mode, 0), A = t - e, E = Xe(A), N = Zt(Dt(e), Dt(t)), F = Xe(N), V = Dt(F - E);
  (A < 1e-24 || V > 10) && (A = 0, (e == 0 || t == 0) && (A = 1e-24, g == 2 && p != dt && (s = 0), _ == 2 && b != -dt && (l = 0)));
  let y = A || N || 1e3, R = Xe(y), $ = cn(10, le(R)), Z = y * (A == 0 ? e == 0 ? 0.1 : 1 : s), M = pt(Bl(e - Z, $ / 10), 24), J = e >= p && (g == 1 || g == 3 && M <= p || g == 2 && M >= p) ? p : dt, G = Zt(h, M < J && e >= J ? J : Me(J, M)), tt = y * (A == 0 ? t == 0 ? 0.1 : 1 : l), W = pt(yo(t + tt, $ / 10), 24), S = t <= b && (_ == 1 || _ == 3 && W >= b || _ == 2 && W <= b) ? b : -dt, q = Me(f, W > S && t <= S ? S : Zt(S, W));
  return G == q && G == 0 && (q = 100), [G, q];
}
const mu = new Intl.NumberFormat(gn ? uu.language : "en-US"), Nr = (e) => mu.format(e), ue = Math, so = ue.PI, Dt = ue.abs, le = ue.floor, Mt = ue.round, ve = ue.ceil, Me = ue.min, Zt = ue.max, cn = ue.pow, Ks = ue.sign, Xe = ue.log10, Fl = ue.log2, _u = (e, t = 1) => ue.sinh(e) * t, ir = (e, t = 1) => ue.asinh(e / t), dt = 1 / 0;
function qs(e) {
  return (Xe((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function mr(e, t, i) {
  return Me(Zt(e, t), i);
}
function Ul(e) {
  return typeof e == "function";
}
function et(e) {
  return Ul(e) ? e : () => e;
}
const bu = () => {
}, Il = (e) => e, Vl = (e, t) => t, vu = (e) => null, Zs = (e) => !0, Js = (e, t) => e == t, wu = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (e) => {
  if (Wl(e) || fi.has(e))
    return e;
  const t = `${e}`, i = t.match(wu);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [o, s] = t.split("e");
    return +`${Oi(o)}e${s}`;
  }
  return pt(e, n);
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
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return Mt(n) / i;
}
const fi = /* @__PURE__ */ new Map();
function jl(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Fn(e, t, i, n) {
  let o = [], s = n.map(jl);
  for (let l = t; l < i; l++) {
    let h = Dt(l), f = pt(cn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * f, g = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), _ = e == 10 ? b : pt(b, g);
      o.push(_), fi.set(_, g);
    }
  }
  return o;
}
const Nn = {}, Hr = [], un = [null, null], ai = Array.isArray, Wl = Number.isInteger, yu = (e) => e === void 0;
function Qs(e) {
  return typeof e == "string";
}
function xo(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function xu(e) {
  return e != null && typeof e == "object";
}
const $u = Object.getPrototypeOf(Uint8Array), Yl = "__proto__";
function hn(e, t = xo) {
  let i;
  if (ai(e)) {
    let n = e.find((o) => o != null);
    if (ai(n) || t(n)) {
      i = Array(e.length);
      for (let o = 0; o < e.length; o++)
        i[o] = hn(e[o], t);
    } else
      i = e.slice();
  } else if (e instanceof $u)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != Yl && (i[n] = hn(e[n], t));
  } else
    i = e;
  return i;
}
function Pt(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let o in n)
      o != Yl && (xo(e[o]) ? Pt(e[o], hn(n[o])) : e[o] = hn(n[o]));
  }
  return e;
}
const Su = 0, Au = 1, ku = 2;
function Eu(e, t, i) {
  for (let n = 0, o, s = -1; n < t.length; n++) {
    let l = t[n];
    if (l > s) {
      for (o = l - 1; o >= 0 && e[o] == null; )
        e[o--] = null;
      for (o = l + 1; o < i && e[o] == null; )
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
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < e.length; l++) {
    let f = e[l][0], p = f.length;
    for (let b = 0; b < p; b++)
      i.add(f[b]);
  }
  let n = [Array.from(i).sort((l, h) => l - h)], o = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < o; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < e.length; l++) {
    let h = e[l], f = h[0];
    for (let p = 1; p < h.length; p++) {
      let b = h[p], g = Array(o).fill(void 0), _ = t ? t[l][p] : Au, A = [];
      for (let E = 0; E < b.length; E++) {
        let N = b[E], F = s.get(f[E]);
        N === null ? _ != Su && (g[F] = N, _ == ku && A.push(F)) : g[F] = N;
      }
      Eu(g, A, o), n.push(g);
    }
  }
  return n;
}
const Tu = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Cu(e) {
  let t = e[0], i = t.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => t[s] - t[l]);
  let o = [];
  for (let s = 0; s < e.length; s++) {
    let l = e[s], h = Array(i);
    for (let f = 0; f < i; f++)
      h[f] = l[n[f]];
    o.push(h);
  }
  return o;
}
function Mu(e) {
  let t = e[0][0], i = t.length;
  for (let n = 1; n < e.length; n++) {
    let o = e[n][0];
    if (o.length != i)
      return !1;
    if (o != t) {
      for (let s = 0; s < i; s++)
        if (o[s] != t[s])
          return !1;
    }
  }
  return !0;
}
function Du(e, t = 100) {
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
  const s = Zt(1, le((o - n + 1) / t));
  for (let l = e[n], h = n + s; h <= o; h += s) {
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
function Lr(e, t) {
  t = t || Nu;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, o;
  for (; o = n.exec(e); )
    i.push(o[0][0] == "{" ? Lu[o[1]] : o[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const Ru = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Fu(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == Ru ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const Zl = (e) => e % 1 == 0, go = [1, 2, 2.5, 5], Uu = Fn(10, -32, 0, go), Jl = Fn(10, 0, 32, go), Iu = Jl.filter(Zl), Pi = Uu.concat(Jl), Rr = `
`, Ql = "{YYYY}", Xs = Rr + Ql, Xl = "{M}/{D}", Dn = Rr + Xl, io = Dn + "/{YY}", ta = "{aa}", Vu = "{h}:{mm}", rn = Vu + ta, tl = Rr + rn, el = ":{ss}", ut = null;
function ea(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, o = n * 24, s = o * 30, l = o * 365, f = (e == 1 ? Fn(10, 0, 3, go).filter(Zl) : Fn(10, -3, 0, go)).concat([
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
    [o * 28, "{MMM}", Xs, ut, ut, ut, ut, ut, 1],
    [o, Xl, Xs, ut, ut, ut, ut, ut, 1],
    [n, "{h}" + ta, io, ut, Dn, ut, ut, ut, 1],
    [i, rn, io, ut, Dn, ut, ut, ut, 1],
    [t, el, io + " " + rn, ut, Dn + " " + rn, ut, tl, ut, 1],
    [e, el + ".{fff}", io + " " + rn, ut, Dn + " " + rn, ut, tl, ut, 1]
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
        let q = g(S), D = q.getHours() + q.getMinutes() / i + q.getSeconds() / n, B = F / n, L = _.axes[A]._space, it = V / L;
        for (; S = pt(S + F, e == 1 ? 0 : 3), !(S > N); )
          if (B > 1) {
            let H = le(pt(D + B, 6)) % 24, nt = g(S).getHours() - H;
            nt > 1 && (nt = -1), S -= nt * n, D = (D + B) % 24;
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
function il(e, t) {
  return e.map((i) => i.map(
    (n, o) => o == 0 || o == 8 || n == null ? n : t(o == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function nl(e, t) {
  return (i, n, o, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], f, p, b, g, _, A;
    return n.map((E) => {
      let N = e(E), F = N.getFullYear(), V = N.getMonth(), y = N.getDate(), R = N.getHours(), $ = N.getMinutes(), Z = N.getSeconds(), M = F != f && h[2] || V != p && h[3] || y != b && h[4] || R != g && h[5] || $ != _ && h[6] || Z != A && h[7] || h[1];
      return f = F, p = V, b = y, g = R, _ = $, A = Z, M(N);
    });
  };
}
function qu(e, t) {
  let i = Lr(t);
  return (n, o, s, l, h) => o.map((f) => i(e(f)));
}
function nr(e, t, i) {
  return new Date(e, t, i);
}
function ol(e, t) {
  return t(e);
}
const Zu = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function rl(e, t) {
  return (i, n, o, s) => s == null ? Mr : t(e(n));
}
function Ju(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
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
  let i = e.cursor.points, n = be(), o = i.size(e, t);
  vt(n, Cn, o), vt(n, Mn, o);
  let s = o / -2;
  vt(n, "marginLeft", s), vt(n, "marginTop", s);
  let l = i.width(e, t, o);
  return l && vt(n, "borderWidth", l), n;
}
function eh(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function ih(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function nh(e, t) {
  return e.series[t].points.size;
}
const or = [0, 0];
function oh(e, t, i) {
  return or[0] = t, or[1] = i, or;
}
function no(e, t, i, n = !0) {
  return (o) => {
    o.button == 0 && (!n || o.target == t) && i(o);
  };
}
function rr(e, t, i, n = !0) {
  return (o) => {
    (!n || o.target == t) && i(o);
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
}, ia = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Fr = Pt({}, ia, {
  filter: Vl
}), na = Pt({}, Fr, {
  size: 10
}), oa = Pt({}, ia, {
  show: !1
}), Ur = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', ra = "bold " + Ur, sa = 1.5, sl = {
  show: !0,
  scale: "x",
  stroke: Cr,
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
  grid: Fr,
  ticks: na,
  border: oa,
  font: Ur,
  lineGap: sa,
  rotate: 0
}, sh = "Value", lh = "Time", ll = {
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
function ah(e, t, i, n, o) {
  return t.map((s) => s == null ? "" : Nr(s));
}
function ch(e, t, i, n, o, s, l) {
  let h = [], f = fi.get(o) || 0;
  i = l ? i : pt(yo(i, o), f);
  for (let p = i; p <= n; p = pt(p + o, f))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function _r(e, t, i, n, o, s, l) {
  const h = [], f = e.scales[e.axes[t].scale].log, p = f == 10 ? Xe : Fl, b = le(p(i));
  o = cn(f, b), f == 10 && (o = Pi[Ce(o, Pi)]);
  let g = i, _ = o * f;
  f == 10 && (_ = Pi[Ce(_, Pi)]);
  do
    h.push(g), g = g + o, f == 10 && !fi.has(g) && (g = pt(g, fi.get(o))), g >= _ && (o = g, _ = o * f, f == 10 && (_ = Pi[Ce(_, Pi)]));
  while (g <= n);
  return h;
}
function uh(e, t, i, n, o, s, l) {
  let f = e.scales[e.axes[t].scale].asinh, p = n > f ? _r(e, t, Zt(f, i), n, o) : [f], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -f ? _r(e, t, Zt(f, -n), -i, o) : [f]).reverse().map((_) => -_).concat(b, p);
}
const la = /./, hh = /[12357]/, fh = /[125]/, al = /1/, br = (e, t, i, n) => e.map((o, s) => t == 4 && o == 0 || s % n == 0 && i.test(o.toExponential()[o < 0 ? 1 : 0]) ? o : null);
function dh(e, t, i, n, o) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], f = e.valToPos, p = s._space, b = f(10, l), g = f(9, l) - b >= p ? la : f(7, l) - b >= p ? hh : f(5, l) - b >= p ? fh : al;
  if (g == al) {
    let _ = Dt(f(1, l) - b);
    if (_ < p)
      return br(t.slice().reverse(), h.distr, g, ve(p / _)).reverse();
  }
  return br(t, h.distr, g, 1);
}
function ph(e, t, i, n, o) {
  let s = e.axes[i], l = s.scale, h = s._space, f = e.valToPos, p = Dt(f(1, l) - f(2, l));
  return p < h ? br(t.slice().reverse(), 3, la, ve(h / p)).reverse() : t;
}
function gh(e, t, i, n) {
  return n == null ? Mr : t == null ? "" : Nr(t);
}
const cl = {
  show: !0,
  scale: "y",
  stroke: Cr,
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
  grid: Fr,
  ticks: na,
  border: oa,
  font: Ur,
  lineGap: sa,
  rotate: 0
};
function mh(e, t) {
  let i = 3 + (e || 1) * 2;
  return pt(i * t, 3);
}
function _h(e, t) {
  let { scale: i, idxs: n } = e.series[0], o = e._data[0], s = e.valToPos(o[n[0]], i, !0), l = e.valToPos(o[n[1]], i, !0), h = Dt(l - s), f = e.series[t], p = h / (f.points.space * lt);
  return n[1] - n[0] <= p;
}
const ul = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: dt,
  max: -dt
}, aa = (e, t, i, n, o) => o, hl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: aa,
  alpha: 1,
  facets: [
    Pt({}, ul, { scale: "x" }),
    Pt({}, ul, { scale: "y" })
  ]
}, fl = {
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
function bh(e, t, i, n, o) {
  return i / 10;
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
}), dl = {};
function ua(e, t) {
  let i = dl[e];
  return i || (i = {
    key: e,
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
  }, e != null && (dl[e] = i)), i;
}
const fn = 1, vr = 2;
function Ni(e, t, i) {
  const n = e.mode, o = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let f = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[o.facets[0].scale] : l[e.series[0].scale], g = n == 2 ? l[o.facets[1].scale] : l[o.scale], _ = h.left, A = h.top, E = h.width, N = h.height, F = e.valToPosH, V = e.valToPosV;
  return b.ori == 0 ? i(
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
  ) : i(
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
    Br,
    da,
    ga
  );
}
function Ir(e, t) {
  let i = 0, n = 0, o = rt(e.bands, Hr);
  for (let s = 0; s < o.length; s++) {
    let l = o[s];
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
function wh(e, t, i, n, o) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, f = e.scales[h];
  return o == -1 ? f.min : o == 1 ? f.max : f.distr == 3 ? f.dir == 1 ? f.min : f.max : 0;
}
function ti(e, t, i, n, o, s) {
  return Ni(e, t, (l, h, f, p, b, g, _, A, E, N, F) => {
    let V = l.pxRound;
    const y = p.dir * (p.ori == 0 ? 1 : -1), R = p.ori == 0 ? mn : _n;
    let $, Z;
    y == 1 ? ($ = i, Z = n) : ($ = n, Z = i);
    let M = V(g(h[$], p, N, A)), J = V(_(f[$], b, F, E)), G = V(g(h[Z], p, N, A)), tt = V(_(s == 1 ? b.max : b.min, b, F, E)), W = new Path2D(o);
    return R(W, G, tt), R(W, M, tt), R(W, M, J), W;
  });
}
function $o(e, t, i, n, o, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? ko : Br;
    let f = i;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
      if (_[1] > _[0]) {
        let A = _[0] - f;
        A > 0 && h(l, f, n, A, n + s), f = _[1];
      }
    }
    let p = i + o - f, b = 10;
    p > 0 && h(l, f, n - b / 2, p, n + s + b);
  }
  return l;
}
function yh(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function Vr(e, t, i, n, o, s, l) {
  let h = [], f = e.length;
  for (let p = o == 1 ? i : n; p >= i && p <= n; p += o)
    if (t[p] === null) {
      let g = p, _ = p;
      if (o == 1)
        for (; ++p <= n && t[p] === null; )
          _ = p;
      else
        for (; --p >= i && t[p] === null; )
          _ = p;
      let A = s(e[g]), E = _ == g ? A : s(e[_]), N = g - o;
      A = l <= 0 && N >= 0 && N < f ? s(e[N]) : A;
      let V = _ + o;
      E = l >= 0 && V >= 0 && V < f ? s(e[V]) : E, E >= A && h.push([A, E]);
    }
  return h;
}
function pl(e) {
  return e == 0 ? Il : e == 1 ? Mt : (t) => Ei(t, e);
}
function ha(e) {
  let t = e == 0 ? So : Ao, i = e == 0 ? (o, s, l, h, f, p) => {
    o.arcTo(s, l, h, f, p);
  } : (o, s, l, h, f, p) => {
    o.arcTo(l, s, f, h, p);
  }, n = e == 0 ? (o, s, l, h, f) => {
    o.rect(s, l, h, f);
  } : (o, s, l, h, f) => {
    o.rect(l, s, f, h);
  };
  return (o, s, l, h, f, p = 0, b = 0) => {
    p == 0 && b == 0 ? n(o, s, l, h, f) : (p = Me(p, h / 2, f / 2), b = Me(b, h / 2, f / 2), t(o, s + p, l), i(o, s + h, l, s + h, l + f, p), i(o, s + h, l + f, s, l + f, b), i(o, s, l + f, s, l, b), i(o, s, l, s + h, l, p), o.closePath());
  };
}
const So = (e, t, i) => {
  e.moveTo(t, i);
}, Ao = (e, t, i) => {
  e.moveTo(i, t);
}, mn = (e, t, i) => {
  e.lineTo(t, i);
}, _n = (e, t, i) => {
  e.lineTo(i, t);
}, ko = ha(0), Br = ha(1), fa = (e, t, i, n, o, s) => {
  e.arc(t, i, n, o, s);
}, da = (e, t, i, n, o, s) => {
  e.arc(i, t, n, o, s);
}, pa = (e, t, i, n, o, s, l) => {
  e.bezierCurveTo(t, i, n, o, s, l);
}, ga = (e, t, i, n, o, s, l) => {
  e.bezierCurveTo(i, t, o, n, l, s);
};
function ma(e) {
  return (t, i, n, o, s) => Ni(t, i, (l, h, f, p, b, g, _, A, E, N, F) => {
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
      for (let L = n; L <= o; L++)
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
  return (t, i, n, o, s, l) => {
    n != o && (s != n && l != n && e(t, i, n), s != o && l != o && e(t, i, o), e(t, i, l));
  };
}
const xh = _a(mn), $h = _a(_n);
function ba(e) {
  const t = rt(e?.alignGaps, 0);
  return (i, n, o, s) => Ni(i, n, (l, h, f, p, b, g, _, A, E, N, F) => {
    [o, s] = vo(f, o, s);
    let V = l.pxRound, y = (D) => V(g(D, p, N, A)), R = (D) => V(_(D, b, F, E)), $, Z;
    p.ori == 0 ? ($ = mn, Z = xh) : ($ = _n, Z = $h);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: fn }, G = J.stroke;
    let tt = !1;
    if (s - o >= N * 4) {
      let D = (z) => i.posToVal(z, p.key, !0), B = null, L = null, it, H, Jt, wt = y(h[M == 1 ? o : s]), nt = y(h[o]), ht = y(h[s]), Q = D(M == 1 ? nt + 1 : ht - 1);
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
    let [S, q] = Ir(i, n);
    if (l.fill != null || S != 0) {
      let D = J.fill = new Path2D(G), B = l.fillTo(i, n, l.min, l.max, S), L = R(B), it = y(h[o]), H = y(h[s]);
      M == -1 && ([H, it] = [it, H]), $(D, H, L), $(D, it, L);
    }
    if (!l.spanGaps) {
      let D = [];
      tt && D.push(...Vr(h, f, o, s, M, y, t)), J.gaps = D = l.gaps(i, n, o, s, D), J.clip = $o(D, p.ori, A, E, N, F);
    }
    return q != 0 && (J.band = q == 2 ? [
      ti(i, n, o, s, G, -1),
      ti(i, n, o, s, G, 1)
    ] : ti(i, n, o, s, G, q)), J;
  });
}
function Sh(e) {
  const t = rt(e.align, 1), i = rt(e.ascDesc, !1), n = rt(e.alignGaps, 0), o = rt(e.extend, !1);
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
    let [Jt, wt] = Ir(s, l);
    if (p.fill != null || Jt != 0) {
      let nt = W.fill = new Path2D(S), ht = p.fillTo(s, l, p.min, p.max, Jt), Q = G(ht);
      tt(nt, H, Q), tt(nt, it, Q);
    }
    if (!p.spanGaps) {
      let nt = [];
      nt.push(...Vr(b, g, h, f, q, J, n));
      let ht = p.width * lt / 2, Q = i || t == 1 ? ht : -ht, z = i || t == -1 ? -ht : ht;
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
function gl(e, t, i, n, o, s, l = dt) {
  if (e.length > 1) {
    let h = null;
    for (let f = 0, p = 1 / 0; f < e.length; f++)
      if (t[f] !== void 0) {
        if (h != null) {
          let b = Dt(e[f] - e[h]);
          b < p && (p = b, l = Dt(i(e[f], n, o, s) - i(e[h], n, o, s)));
        }
        h = f;
      }
  }
  return l;
}
function Ah(e) {
  e = e || Nn;
  const t = rt(e.size, [0.6, dt, 1]), i = e.align || 0, n = e.gap || 0;
  let o = e.radius;
  o = // [valueRadius, baselineRadius]
  o == null ? [0, 0] : typeof o == "number" ? [o, 0] : o;
  const s = et(o), l = 1 - t[0], h = rt(t[1], dt), f = rt(t[2], 1), p = rt(e.disp, Nn), b = rt(e.each, (A) => {
  }), { fill: g, stroke: _ } = p;
  return (A, E, N, F) => Ni(A, E, (V, y, R, $, Z, M, J, G, tt, W, S) => {
    let q = V.pxRound, D = i, B = n * lt, L = h * lt, it = f * lt, H, Jt;
    $.ori == 0 ? [H, Jt] = s(A, E) : [Jt, H] = s(A, E);
    const wt = $.dir * ($.ori == 0 ? 1 : -1);
    let nt = $.ori == 0 ? ko : Br, ht = $.ori == 0 ? b : (T, gt, Ct, Fi, bi, Oe, vi) => {
      b(T, gt, Ct, bi, Fi, vi, Oe);
    }, Q = rt(A.bands, Hr).find((T) => T.series[0] == E), z = Q != null ? Q.dir : 0, Tt = V.fillTo(A, E, V.min, V.max, z), Wt = q(J(Tt, Z, S, tt)), yt, ct, $e, ee = W, St = q(V.width * lt), ze = !1, Ke = null, he = null, ii = null, Hi = null;
    g != null && (St == 0 || _ != null) && (ze = !0, Ke = g.values(A, E, N, F), he = /* @__PURE__ */ new Map(), new Set(Ke).forEach((T) => {
      T != null && he.set(T, new Path2D());
    }), St > 0 && (ii = _.values(A, E, N, F), Hi = /* @__PURE__ */ new Map(), new Set(ii).forEach((T) => {
      T != null && Hi.set(T, new Path2D());
    })));
    let { x0: Li, size: vn } = p;
    if (Li != null && vn != null) {
      D = 1, y = Li.values(A, E, N, F), Li.unit == 2 && (y = y.map((Ct) => A.posToVal(G + Ct * W, $.key, !0)));
      let T = vn.values(A, E, N, F);
      vn.unit == 2 ? ct = T[0] * W : ct = M(T[0], $, W, G) - M(0, $, W, G), ee = gl(y, R, M, $, W, G, ee), $e = ee - ct + B;
    } else
      ee = gl(y, R, M, $, W, G, ee), $e = ee * l + B, ct = ee - $e;
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
  const i = rt(t?.alignGaps, 0);
  return (n, o, s, l) => Ni(n, o, (h, f, p, b, g, _, A, E, N, F, V) => {
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
    let [L, it] = Ir(n, o);
    if (h.fill != null || L != 0) {
      let H = D.fill = new Path2D(B), Jt = h.fillTo(n, o, h.min, h.max, L), wt = $(Jt);
      J(H, W, wt), J(H, tt, wt);
    }
    if (!h.spanGaps) {
      let H = [];
      H.push(...Vr(f, p, s, l, G, R, i)), D.gaps = H = h.gaps(n, o, s, l, H), D.clip = $o(H, b.ori, E, N, F, V);
    }
    return it != 0 && (D.band = it == 2 ? [
      ti(n, o, s, l, B, -1),
      ti(n, o, s, l, B, 1)
    ] : ti(n, o, s, l, B, it)), D;
  });
}
function Eh(e) {
  return kh(Ph, e);
}
function Ph(e, t, i, n, o, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, e[0], t[0]), l == 2)
    n(h, e[1], t[1]);
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
function ml() {
  for (let e of wr)
    e.syncRect(!0);
}
gn && (Mi(au, sn, ml), Mi(cu, sn, ml, !0), Mi(fo, sn, () => {
  jt.pxRatio = lt;
}));
const Th = ba(), Ch = ma();
function _l(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => yr(s, l, t, i));
}
function Mh(e, t) {
  return e.map((i, n) => n == 0 ? {} : Pt({}, t, i));
}
function yr(e, t, i, n) {
  return Pt({}, t == 0 ? i : n, e);
}
function va(e, t, i) {
  return t == null ? un : [t, i];
}
const Dh = va;
function zh(e, t, i) {
  return t == null ? un : po(t, i, Or, !0);
}
function wa(e, t, i, n) {
  return t == null ? un : wo(t, i, e.scales[n].log, !1);
}
const Oh = wa;
function ya(e, t, i, n) {
  return t == null ? un : zr(t, i, e.scales[n].log, !1);
}
const Nh = ya;
function Hh(e, t, i, n, o) {
  let s = Zt(qs(e), qs(t)), l = t - e, h = Ce(o / n * l, i);
  do {
    let f = i[h], p = n * f / l;
    if (p >= o && s + (f < 5 ? fi.get(f) : 0) <= 17)
      return [f, p];
  } while (++h < i.length);
  return [0, 0];
}
function bl(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, o) => (t = Mt((i = +o) * lt)) + "px"), [e, t, i];
}
function Lh(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = pt(t[2] * lt, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function jt(e, t, i) {
  const n = {
    mode: rt(e.mode, 1)
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
  const p = n.root = be(jc);
  if (e.id != null && (p.id = e.id), se(p, e.class), e.title) {
    let r = be(Gc, p);
    r.textContent = e.title;
  }
  const b = Pe("canvas"), g = n.ctx = b.getContext("2d"), _ = be(Kc, p);
  Mi("click", _, (r) => {
    r.target === E && (mt != Zi || xt != Ji) && It.click(n, r);
  }, !0);
  const A = n.under = be(qc, _);
  _.appendChild(b);
  const E = n.over = be(Zc, _);
  e = hn(e);
  const N = +rt(e.pxAlign, 1), F = pl(N);
  (e.plugins || []).forEach((r) => {
    r.opts && (e = r.opts(n, e) || e);
  });
  const V = e.ms || 1e-3, y = n.series = o == 1 ? _l(e.series || [], ll, fl, !1) : Mh(e.series || [null], hl), R = n.axes = _l(e.axes || [], sl, cl, !0), $ = n.scales = {}, Z = n.bands = e.bands || [];
  Z.forEach((r) => {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1);
  });
  const M = o == 2 ? y[1].facets[0].scale : y[0].scale, J = {
    axes: La,
    series: Da
  }, G = (e.drawOrder || ["axes", "series"]).map((r) => J[r]);
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
      let c = (e.scales || Nn)[r] || Nn;
      if (c.from != null) {
        W(c.from);
        let u = Pt({}, $[c.from], c, { key: r });
        u.valToPct = tt(u), $[r] = u;
      } else {
        a = $[r] = Pt({}, r == M ? ca : vh, c), a.key = r;
        let u = a.time, d = a.range, m = ai(d);
        if ((r != M || o == 2 && !u) && (m && (d[0] == null || d[1] == null) && (d = {
          min: d[0] == null ? Ys : {
            mode: 1,
            hard: d[0],
            soft: d[0]
          },
          max: d[1] == null ? Ys : {
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
  const it = e.tzDate || ((r) => new Date(Mt(r / V))), H = e.fmtDate || Lr, Jt = V == 1 ? Wu(it) : Ku(it), wt = nl(it, il(V == 1 ? ju : Gu, H)), nt = rl(it, ol(Zu, H)), ht = [], Q = n.legend = Pt({}, Xu, e.legend), z = n.cursor = Pt({}, rh, { drag: { y: o == 2 } }, e.cursor), Tt = Q.show, Wt = z.show, yt = Q.markers;
  Q.idxs = ht, yt.width = et(yt.width), yt.dash = et(yt.dash), yt.stroke = et(yt.stroke), yt.fill = et(yt.fill);
  let ct, $e, ee, St = [], ze = [], Ke, he = !1, ii = {};
  if (Q.live) {
    const r = y[1] ? y[1].values : null;
    he = r != null, Ke = he ? r(n, 1, 0) : { _: 0 };
    for (let a in Ke)
      ii[a] = Mr;
  }
  if (Tt)
    if (ct = Pe("table", iu, p), ee = Pe("tbody", null, ct), Q.mount(n, ct), he) {
      $e = Pe("thead", null, ct, ee);
      let r = Pe("tr", null, $e);
      Pe("th", null, r);
      for (var Hi in Ke)
        Pe("th", zs, r).textContent = Hi;
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
        let x = yt.width(n, a);
        x && (w.style.border = x + "px " + yt.dash(n, a) + " " + yt.stroke(n, a)), w.style.background = yt.fill(n, a);
      }
    }
    let m = be(zs, d);
    r.label instanceof HTMLElement ? m.appendChild(r.label) : m.textContent = r.label, a > 0 && (yt.show || (m.style.color = r.width > 0 ? yt.stroke(n, a) : yt.fill(n, a)), Yt("click", d, (w) => {
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
    }, !1), Ii && Yt(Ls, d, (w) => {
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
    const d = mi.get(a) || {}, m = z.bind[r](n, a, c, u);
    m && (Mi(r, a, d[r] = m), mi.set(a, d));
  }
  function Ri(r, a, c) {
    const u = mi.get(a) || {};
    for (let d in u)
      (r == null || d == r) && (gr(d, a, u[d]), delete u[d]);
    r == null && mi.delete(a);
  }
  let qe = 0, _i = 0, K = 0, T = 0, gt = 0, Ct = 0, Fi = gt, bi = Ct, Oe = K, vi = T, ie = 0, fe = 0, Qt = 0, Se = 0;
  n.bbox = {};
  let Po = !1, Yn = !1, Ui = !1, wi = !1, Gn = !1, de = !1;
  function To(r, a, c) {
    (c || r != n.width || a != n.height) && Yr(r, a), Yi(!1), Ui = !0, Yn = !0, Gi();
  }
  function Yr(r, a) {
    n.width = qe = K = r, n.height = _i = T = a, gt = Ct = 0, Aa(), ka();
    let c = n.bbox;
    ie = c.left = Ei(gt * lt, 0.5), fe = c.top = Ei(Ct * lt, 0.5), Qt = c.width = Ei(K * lt, 0.5), Se = c.height = Ei(T * lt, 0.5);
  }
  const xa = 3;
  function $a() {
    let r = !1, a = 0;
    for (; !r; ) {
      a++;
      let c = Na(a), u = Ha(a);
      r = a == xa || c && u, r || (Yr(n.width, n.height), Yn = !0);
    }
  }
  function Sa({ width: r, height: a }) {
    To(r, a);
  }
  n.setSize = Sa;
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
  const Ne = n.focus = Pt({}, e.focus || { alpha: 0.3 }, z.focus), Ii = Ne.prox >= 0, Vi = Ii && Bt.one;
  let pe = [], Bi = [], ji = [];
  function Gr(r, a) {
    let c = Bt.show(n, a);
    if (c instanceof HTMLElement)
      return se(c, eu), se(c, r.class), Ue(c, -10, -10, K, T), E.insertBefore(c, pe[a]), c;
  }
  function Kr(r, a) {
    if (o == 1 || a > 0) {
      let c = o == 1 && $[r.scale].time, u = r.value;
      r.value = c ? Qs(u) ? rl(it, ol(u, H)) : u || nt : u || gh, r.label = r.label || (c ? lh : sh);
    }
    if (Vi || a > 0) {
      r.width = r.width == null ? 1 : r.width, r.paths = r.paths || Th || vu, r.fillTo = et(r.fillTo || wh), r.pxAlign = +rt(r.pxAlign, N), r.pxRound = pl(r.pxAlign), r.stroke = et(r.stroke || null), r.fill = et(r.fill || null), r._stroke = r._fill = r._paths = r._focus = null;
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
      Vi ? a == 0 && (c = Gr(r, a)) : a > 0 && (c = Gr(r, a)), pe.splice(a, 0, c), Bi.splice(a, 0, 0), ji.splice(a, 0, 0);
    }
    Rt("addSeries", a);
  }
  function Ea(r, a) {
    a = a ?? y.length, r = o == 1 ? yr(r, a, ll, fl) : yr(r, a, {}, hl), y.splice(a, 0, r), Kr(y[a], a);
  }
  n.addSeries = Ea;
  function Pa(r) {
    if (y.splice(r, 1), Tt) {
      Q.values.splice(r, 1), ze.splice(r, 1);
      let a = St.splice(r, 1)[0];
      Ri(null, a.firstChild), a.remove();
    }
    Wt && (ht.splice(r, 1), pe.splice(r, 1)[0].remove(), Bi.splice(r, 1), ji.splice(r, 1)), Rt("delSeries", r);
  }
  n.delSeries = Pa;
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
          ai(m) ? nl(it, il(m, H)) : (
            // fmtDate string tpl
            Qs(m) ? qu(it, m) : m || wt
          )
        ) : m || ah
      ), r.filter = et(r.filter || (u.distr >= 3 && u.log == 10 ? dh : u.distr == 3 && u.log == 2 ? ph : Vl)), r.font = bl(r.font), r.labelFont = bl(r.labelFont), r._size = r.size(n, null, a, 0), r._space = r._rotate = r._incrs = r._found = // foundIncrSpace
      r._splits = r._values = null, r._size > 0 && (xi[a] = !0, r._el = be(Jc, _));
    }
  }
  function wn(r, a, c, u) {
    let [d, m, v, w] = c, x = a % 2, k = 0;
    return x == 0 && (w || m) && (k = a == 0 && !d || a == 2 && !v ? Mt(sl.size / 3) : 0), x == 1 && (d || v) && (k = a == 1 && !m || a == 3 && !w ? Mt(cl.size / 2) : 0), k;
  }
  const qr = n.padding = (e.padding || [wn, wn, wn, wn]).map((r) => et(rt(r, wn))), ni = n._padding = qr.map((r, a) => r(n, a, xi, 0));
  let Ut, Ot = null, Nt = null;
  const Kn = o == 1 ? y[0].idxs : null;
  let Ae = null, yn = !1;
  function Zr(r, a) {
    if (t = r ?? [], n.data = n._data = t, o == 2) {
      Ut = 0;
      for (let c = 1; c < y.length; c++)
        Ut += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), Ae = t[0], Ut = Ae.length;
      let c = t;
      if (q == 2) {
        c = t.slice();
        let u = c[0] = Array(Ut);
        for (let d = 0; d < Ut; d++)
          u[d] = d;
      }
      n._data = t = c;
    }
    if (Yi(!0), Rt("setData"), q == 2 && (Ui = !0), a !== !1) {
      let c = S;
      c.auto(n, yn) ? Co() : ri(M, c.min, c.max), wi = wi || z.left >= 0, de = !0, Gi();
    }
  }
  n.setData = Zr;
  function Co() {
    yn = !0;
    let r, a;
    o == 1 && (Ut > 0 ? (Ot = Kn[0] = 0, Nt = Kn[1] = Ut - 1, r = t[0][Ot], a = t[0][Nt], q == 2 ? (r = Ot, a = Nt) : r == a && (q == 3 ? [r, a] = wo(r, r, S.log, !1) : q == 4 ? [r, a] = zr(r, r, S.log, !1) : S.time ? a = r + Mt(86400 / V) : [r, a] = po(r, a, Or, !0))) : (Ot = Kn[0] = r = null, Nt = Kn[1] = a = null)), ri(M, r, a);
  }
  let qn, Wi, Mo, Do, zo, Oo, No, Ho, Lo, Xt;
  function Jr(r, a, c, u, d, m) {
    r ??= Ns, c ??= Hr, u ??= "butt", d ??= Ns, m ??= "round", r != qn && (g.strokeStyle = qn = r), d != Wi && (g.fillStyle = Wi = d), a != Mo && (g.lineWidth = Mo = a), m != zo && (g.lineJoin = zo = m), u != Oo && (g.lineCap = Oo = u), c != Do && g.setLineDash(Do = c);
  }
  function Qr(r, a, c, u) {
    a != Wi && (g.fillStyle = Wi = a), r != No && (g.font = No = r), c != Ho && (g.textAlign = Ho = c), u != Lo && (g.textBaseline = Lo = u);
  }
  function Ro(r, a, c, u, d = 0) {
    if (u.length > 0 && r.auto(n, yn) && (a == null || a.min == null)) {
      let m = rt(Ot, 0), v = rt(Nt, u.length - 1), w = c.min == null ? du(u, m, v, d, r.distr == 3) : [c.min, c.max];
      r.min = Me(r.min, c.min = w[0]), r.max = Zt(r.max, c.max = w[1]);
    }
  }
  const Xr = { min: null, max: null };
  function Ca() {
    for (let u in $) {
      let d = $[u];
      L[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      L[M] != null && d.auto(n, yn)) && (L[u] = Xr);
    }
    for (let u in $) {
      let d = $[u];
      L[u] == null && d.from != null && L[d.from] != null && (L[u] = Xr);
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
            let v = m.range(n, null, null, u);
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
            let x = w.range(n, w.min, w.max, m);
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
        if (c > 0 && a.show && (ts(c, !1), ts(c, !0), a._paths == null)) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha);
          let d = o == 2 ? [0, t[c][0].length - 1] : Ma(t[c]);
          a._paths = a.paths(n, c, d[0], d[1]), Xt != u && (g.globalAlpha = Xt = u);
        }
      }), y.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = Xt;
          Xt != a.alpha && (g.globalAlpha = Xt = a.alpha), a._paths != null && es(c, !1);
          {
            let d = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Ot, Nt, d), v = a.points.filter(n, c, m, d);
            (m || v) && (a.points._paths = a.points.paths(n, c, Ot, Nt, v), es(c, !0));
          }
          Xt != u && (g.globalAlpha = Xt = u), Rt("drawSeries", c);
        }
      }), r && (g.globalAlpha = Xt = 1);
    }
  }
  function ts(r, a) {
    let c = a ? y[r].points : y[r];
    c._stroke = c.stroke(n, r), c._fill = c.fill(n, r);
  }
  function es(r, a) {
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
        ot.show && I && gu(X, Ot, Nt) ? (bt = j.fill(n, st) || m, O = ot._paths.clip) : I = null, Fo(a, c, u, d, bt, v, w, x, k, P, O, I), C = !0;
      }
    }), C || Fo(a, c, u, d, m, v, w, x, k, P);
  }
  const is = fn | vr;
  function Fo(r, a, c, u, d, m, v, w, x, k, P, C) {
    Jr(r, a, c, u, d), (x || k || C) && (g.save(), x && g.clip(x), k && g.clip(k)), C ? (w & is) == is ? (g.clip(C), P && g.clip(P), Jn(d, v), Zn(r, m, a)) : w & vr ? (Jn(d, v), g.clip(C), Zn(r, m, a)) : w & fn && (g.save(), g.clip(C), P && g.clip(P), Jn(d, v), g.restore(), Zn(r, m, a)) : (Jn(d, v), Zn(r, m, a)), (x || k || C) && g.restore();
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
      let v = d._space = d.space(n, r, a, c, u), w = d._incrs = d.incrs(n, r, a, c, u, v);
      m = Hh(a, c, w, u, v);
    }
    return d._found = m;
  }
  function Uo(r, a, c, u, d, m, v, w, x, k) {
    let P = v % 2 / 2;
    N == 1 && g.translate(P, P), Jr(w, v, x, k, w), g.beginPath();
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
      let C = d.distr == 2, j = c._splits = c.splits(n, u, w, x, k, P, C), st = d.distr == 2 ? j.map((O) => Ae[O]) : j, ot = d.distr == 2 ? Ae[j[1]] - Ae[j[0]] : k, X = c._values = c.values(n, c.filter(n, st, u, P, ot), u, P, ot);
      c._rotate = m == 2 ? c.rotate(n, X, u, P) : 0;
      let I = c._size;
      c._size = ve(c.size(n, X, u, r)), I != null && c._size != I && (a = !1);
    }), a;
  }
  function Ha(r) {
    let a = !0;
    return qr.forEach((c, u) => {
      let d = c(n, u, xi, r);
      d != ni[u] && (a = !1), ni[u] = d;
    }), a;
  }
  function La() {
    for (let r = 0; r < R.length; r++) {
      let a = R[r];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, d, m, v = a.stroke(n, r), w = c == 0 || c == 3 ? -1 : 1, [x, k] = a._found;
      if (a.label != null) {
        let Kt = a.labelGap * w, re = Mt((a._lpos + Kt) * lt);
        Qr(a.labelFont[0], v, "center", c == 2 ? Pn : Os), g.save(), u == 1 ? (d = m = 0, g.translate(
          re,
          Mt(fe + Se / 2)
        ), g.rotate((c == 3 ? -so : so) / 2)) : (d = Mt(ie + Qt / 2), m = re);
        let Ai = Ul(a.label) ? a.label(n, r, x, k) : a.label;
        g.fillText(Ai, d, m), g.restore();
      }
      if (k == 0)
        continue;
      let P = $[a.scale], C = u == 0 ? Qt : Se, j = u == 0 ? ie : fe, st = a._splits, ot = P.distr == 2 ? st.map((Kt) => Ae[Kt]) : st, X = P.distr == 2 ? Ae[st[1]] - Ae[st[0]] : x, I = a.ticks, O = a.border, bt = I.show ? I.size : 0, At = Mt(bt * lt), Ft = Mt((a.alignTo == 2 ? a._size - bt - a.gap : a.gap) * lt), ft = a._rotate * -so / 180, kt = F(a._pos * lt), ne = (At + Ft) * w, Gt = kt + ne;
      m = u == 0 ? Gt : 0, d = u == 1 ? Gt : 0;
      let ge = a.font[0], ke = a.align == 1 ? en : a.align == 2 ? Xo : ft > 0 ? en : ft < 0 ? Xo : u == 0 ? "center" : c == 3 ? Xo : en, Re = ft || u == 1 ? "middle" : c == 2 ? Pn : Os;
      Qr(ge, v, ke, Re);
      let oe = a.font[1] * a.lineGap, me = st.map((Kt) => F(h(Kt, P, C, j))), Ee = a._values;
      for (let Kt = 0; Kt < Ee.length; Kt++) {
        let re = Ee[Kt];
        if (re != null) {
          u == 0 ? d = me[Kt] : m = me[Kt], re = "" + re;
          let Ai = re.indexOf(`
`) == -1 ? [re] : re.split(/\n/gm);
          for (let qt = 0; qt < Ai.length; qt++) {
            let ys = Ai[qt];
            ft ? (g.save(), g.translate(d, m + qt * oe), g.rotate(ft), g.fillText(ys, 0, 0), g.restore()) : g.fillText(ys, d, m + qt * oe);
          }
        }
      }
      I.show && Uo(
        me,
        I.filter(n, ot, r, k, X),
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
        me,
        Fe.filter(n, ot, r, k, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? fe : ie,
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
        u == 1 ? fe : ie,
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
    Qn || (Tu(ns), Qn = !0);
  }
  function Fa(r, a = !1) {
    Qn = !0, Io = a, r(n), ns(), a && xn.length > 0 && queueMicrotask(Ra);
  }
  n.batch = Fa;
  function ns() {
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
    qe > 0 && _i > 0 && (g.clearRect(0, 0, b.width, b.height), Rt("drawClear"), G.forEach((r) => r()), Rt("draw")), _t.show && Gn && (Xn(_t), Gn = !1), Wt && wi && (Si(null, !0, !1), wi = !1), Q.show && Q.live && de && (Wo(), de = !1), f || (f = !0, n.status = 1, Rt("ready")), yn = !1, Qn = !1;
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
      r == M && c.distr == 2 && Ut > 0 && (a.min = Ce(a.min, t[0]), a.max = Ce(a.max, t[0]), a.min == a.max && a.max++), L[r] = a, Po = !0, Gi();
    }
  }
  n.setScale = Vo;
  let Bo, jo, Ki, qi, os, rs, Zi, Ji, ss, ls, mt, xt, oi = !1;
  const It = z.drag;
  let Ht = It.x, Lt = It.y;
  Wt && (z.x && (Bo = be(Xc, E)), z.y && (jo = be(tu, E)), S.ori == 0 ? (Ki = Bo, qi = jo) : (Ki = jo, qi = Bo), mt = z.left, xt = z.top);
  const _t = n.select = Pt({
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
  n.setSelect = Xn;
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
    }), c !== !1 && Rt("setSeries", r, a), u && kn("setSeries", n, r, a);
  }
  n.setSeries = He;
  function Ia(r, a) {
    Pt(Z[r], a);
  }
  function Va(r, a) {
    r.fill = et(r.fill || null), r.dir = rt(r.dir, -1), a = a ?? Z.length, Z.splice(a, 0, r);
  }
  function Ba(r) {
    r == null ? Z.length = 0 : Z.splice(r, 1);
  }
  n.addBand = Va, n.setBand = Ia, n.delBand = Ba;
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
  Tt && Ii && Yt(Rs, ct, (r) => {
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
  n.valToIdx = (r) => Ce(r, t[0]), n.posToIdx = Ya, n.posToVal = Le, n.valToPos = (r, a, c) => $[a].ori == 0 ? s(
    r,
    $[a],
    c ? Qt : K,
    c ? ie : 0
  ) : l(
    r,
    $[a],
    c ? Se : T,
    c ? fe : 0
  ), n.setCursor = (r, a, c) => {
    mt = r.left, xt = r.top, Si(null, a, c);
  };
  function as(r, a) {
    vt(Qi, en, _t.left = r), vt(Qi, Cn, _t.width = a);
  }
  function cs(r, a) {
    vt(Qi, Pn, _t.top = r), vt(Qi, Mn, _t.height = a);
  }
  let $n = S.ori == 0 ? as : cs, Sn = S.ori == 1 ? as : cs;
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
  n.setLegend = Wo;
  function Ka(r, a) {
    let c = y[r], u = r == 0 && q == 2 ? Ae : t[r], d;
    he ? d = c.values(n, r, a) ?? ii : (d = c.value(n, a == null ? null : u[a], r, a), d = d == null ? ii : { _: d }), Q.values[r] = d;
  }
  function Si(r, a, c) {
    ss = mt, ls = xt, [mt, xt] = z.move(n, mt, xt), z.left = mt, z.top = xt, Wt && (Ki && Ue(Ki, Mt(mt), 0, K, T), qi && Ue(qi, 0, Mt(xt), K, T));
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
        let bt = y[O], At = ht[O], Ft = At == null ? null : o == 1 ? t[O][At] : t[O][1][At], ft = z.dataIdx(n, O, u, x), kt = ft == null ? null : o == 1 ? t[O][ft] : t[O][1][ft];
        if (de = de || kt != Ft || ft != At, ht[O] = ft, O > 0 && bt.show) {
          let ne = ft == null ? -10 : ft == u ? k : D(o == 1 ? t[0][ft] : t[O][0][ft], S, m, 0), Gt = kt == null ? -10 : B(kt, o == 1 ? $[bt.scale] : $[bt.facets[1].scale], v, 0);
          if (Ii && kt != null) {
            let ge = S.ori == 1 ? mt : xt, ke = Dt(Ne.dist(n, O, ft, Gt, ge));
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
              let qt = Ai(n, O);
              me = qt.left, Ee = qt.top, Re = qt.width, oe = qt.height;
            } else
              me = ge, Ee = ke, Re = oe = Bt.size(n, O);
            if (Kt = Bt.fill(n, O), Fe = Bt.stroke(n, O), Vi)
              O == si && Ze <= Ne.prox && (P = me, C = Ee, j = Re, st = oe, ot = re, X = Kt, I = Fe);
            else {
              let qt = pe[O];
              qt != null && (Bi[O] = me, ji[O] = Ee, Ws(qt, Re, oe, re), Bs(qt, Kt, Fe), Ue(qt, ve(me), ve(Ee), K, T));
            }
          }
        }
      }
      if (Vi) {
        let O = Ne.prox, bt = $i == null ? Ze <= O : Ze > O || si != $i;
        if (de || bt) {
          let At = pe[0];
          At != null && (Bi[0] = P, ji[0] = C, Ws(At, j, st, ot), Bs(At, X, I), Ue(At, ve(P), ve(C), K, T));
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
        let w = Dt(ss - os), x = Dt(ls - rs);
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
        if (ws != null) {
          let [w, x] = Et.scales;
          Et.values[0] = w != null ? Le(S.ori == 0 ? mt : xt, w) : null, Et.values[1] = x != null ? Le(S.ori == 1 ? mt : xt, x) : null;
        }
        kn(tr, n, mt, xt, K, T, u);
      }
      if (Ii) {
        let w = c && Et.setSeries, x = Ne.prox;
        $i == null ? Ze <= x && He(si, Xi, !0, w) : Ze > x ? He(null, Xi, !0, w) : si != $i && He(si, Xi, !0, w);
      }
    }
    de && (Q.idx = u, Wo()), a !== !1 && Rt("setCursor");
  }
  let li = null;
  Object.defineProperty(n, "rect", {
    get() {
      return li == null && An(!1), li;
    }
  });
  function An(r = !1) {
    r ? li = null : (li = E.getBoundingClientRect(), Rt("syncRect", li));
  }
  function us(r, a, c, u, d, m, v) {
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
    x && (a == null || a.cursor.event.type == tr) && ((c <= 1 || c >= K - 1) && (c = Ei(c, K)), (u <= 1 || u >= T - 1) && (u = Ei(u, T))), w ? (os = c, rs = u, [Zi, Ji] = z.move(n, c, u)) : (mt = c, xt = u);
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
  let hs, fs, ds, ps;
  function gs(r, a, c, u, d, m, v) {
    oi = !0, Ht = Lt = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !0, !1), r != null && (Yt(er, fr, ms, !1), kn(Hs, n, Zi, Ji, K, T, null));
    let { left: w, top: x, width: k, height: P } = _t;
    hs = w, fs = x, ds = k, ps = P;
  }
  function ms(r, a, c, u, d, m, v) {
    oi = It._x = It._y = !1, Yo(r, a, c, u, d, m, v, !1, !0);
    let { left: w, top: x, width: k, height: P } = _t, C = k > 0 || P > 0, j = hs != w || fs != x || ds != k || ps != P;
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
    r != null && (Ri(er, fr), kn(er, n, mt, xt, K, T, null));
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
  function _s(r, a, c, u, d, m, v) {
    z._lock || (yi(r), Co(), Ko(), r != null && kn(Fs, n, mt, xt, K, T, null));
  }
  function bs() {
    R.forEach(Lh), To(n.width, n.height, !0);
  }
  Mi(fo, sn, bs);
  const tn = {};
  tn.mousedown = gs, tn.mousemove = us, tn.mouseup = ms, tn.dblclick = _s, tn.setSeries = (r, a, c, u) => {
    let d = Et.match[2];
    c = d(n, a, c), c != -1 && He(c, u, !0, !1);
  }, Wt && (Yt(Hs, E, gs), Yt(tr, E, us), Yt(Ls, E, (r) => {
    yi(r), An(!1);
  }), Yt(Rs, E, qa), Yt(Fs, E, _s), wr.add(n), n.syncRect = An);
  const to = n.hooks = e.hooks || {};
  function Rt(r, a, c) {
    Io ? xn.push([r, a, c]) : r in to && to[r].forEach((u) => {
      u.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((r) => {
    for (let a in r.hooks)
      to[a] = (to[a] || []).concat(r.hooks[a]);
  });
  const vs = (r, a, c) => c, Et = Pt({
    key: null,
    setSeries: !1,
    filters: {
      pub: Zs,
      sub: Zs
    },
    scales: [M, y[1] ? y[1].scale : null],
    match: [Js, Js, vs],
    values: [null, null]
  }, z.sync);
  Et.match.length == 2 && Et.match.push(vs), z.sync = Et;
  const ws = Et.key, qo = ua(ws);
  function kn(r, a, c, u, d, m, v) {
    Et.filters.pub(r, a, c, u, d, m, v) && qo.pub(r, a, c, u, d, m, v);
  }
  qo.sub(n);
  function Za(r, a, c, u, d, m, v) {
    Et.filters.sub(r, a, c, u, d, m, v) && tn[r](null, a, c, u, d, m, v);
  }
  n.pub = Za;
  function Ja() {
    qo.unsub(n), wr.delete(n), mi.clear(), gr(fo, sn, bs), p.remove(), ct?.remove(), Rt("destroy");
  }
  n.destroy = Ja;
  function Zo() {
    Rt("init", e, t), Zr(t || e.data, !1), L[M] ? Vo(M, L[M]) : Co(), Gn = _t.show && (_t.width > 0 || _t.height > 0), wi = de = !0, To(e.width, e.height);
  }
  return y.forEach(Kr), R.forEach(Ta), i ? i instanceof HTMLElement ? (i.appendChild(p), Zo()) : i(n, Zo) : Zo(), n;
}
jt.assign = Pt;
jt.fmtNum = Nr;
jt.rangeNum = po;
jt.rangeLog = wo;
jt.rangeAsinh = zr;
jt.orient = Ni;
jt.pxRatio = lt;
jt.join = Pu;
jt.fmtDate = Lr, jt.tzDate = Fu;
jt.sync = ua;
{
  jt.addGap = yh, jt.clipGaps = $o;
  let e = jt.paths = {
    points: ma
  };
  e.linear = ba, e.stepped = Sh, e.bars = Ah, e.spline = Eh;
}
const Rh = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var Fh = Object.defineProperty, Uh = Object.getOwnPropertyDescriptor, Ye = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Uh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Fh(t, i, o), o;
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
    const e = /* @__PURE__ */ new Date(), t = new Date(e.getTime() - Ih * 60 * 60 * 1e3), i = [this.roomEntity, this.lowEntity, this.highEntity, this.actionEntity].filter(
      (n) => !!n
    );
    try {
      const n = await this.hass.callWS({
        type: "history/history_during_period",
        start_time: t.toISOString(),
        end_time: e.toISOString(),
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
  _numericSeries(e) {
    if (!e) return [];
    const t = [];
    for (const i of e) {
      const n = parseFloat(i.s);
      Number.isFinite(n) && t.push([i.lu, n]);
    }
    return t.sort((i, n) => i[0] - n[0]), t;
  }
  /** Build aligned uPlot data: a single sorted x axis and forward-filled
   *  values for each numeric series. */
  _alignSeries(e, t) {
    const i = /* @__PURE__ */ new Set();
    for (const s of e) for (const [l] of s) i.add(l);
    if (i.size === 0) return [[t], ...e.map(() => [null])];
    const n = [...i].sort((s, l) => s - l), o = e.map((s) => {
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
  _actionIntervals(e, t) {
    if (!e) return [];
    const i = [...e].sort((o, s) => o.lu - s.lu), n = [];
    for (let o = 0; o < i.length; o++) {
      const s = i[o].lu, l = i[o + 1]?.lu ?? t, h = i[o].s;
      (h === "heating" || h === "cooling") && n.push({ start: s, end: l, action: h });
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), i = this._numericSeries(e[this.roomEntity]), n = this._numericSeries(e[this.lowEntity]), o = this._numericSeries(e[this.highEntity]);
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && o.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const s = this._alignSeries([i, n, o], t), l = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: l.width, height: l.height }), this._plot.setData(s), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new jt(l, s, this._host), this._observeResize());
  }
  _buildOpts(e) {
    const t = getComputedStyle(this), i = t.getPropertyValue("--cb-action-heating").trim() || "#d9603f", n = t.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", o = t.getPropertyValue("--primary-color").trim() || "#03a9f4";
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
              g <= b || (l.fillStyle = p.action === "heating" ? vl(i, 0.18) : vl(n, 0.18), l.fillRect(b, h, g - b, f));
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
function vl(e, t) {
  const i = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), h = parseInt(s.slice(2, 4), 16), f = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${h}, ${f}, ${t})`;
  }
  const o = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return o ? `rgba(${o[1]}, ${o[2]}, ${o[3]}, ${t})` : i;
}
var Vh = Object.defineProperty, Bh = Object.getOwnPropertyDescriptor, jr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Bh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Vh(t, i, o), o;
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
jr([
  Y({ attribute: !1 })
], Un.prototype, "hass", 2);
jr([
  Y({ attribute: !1 })
], Un.prototype, "entities", 2);
Un = jr([
  ae("comfort-band-insights-tab")
], Un);
var jh = Object.defineProperty, Wh = Object.getOwnPropertyDescriptor, bn = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && jh(t, i, o), o;
};
const Qe = 15, Ve = 0.5, Je = 14, Ie = 28, wl = 4, Yh = 500, nn = 600, oo = 200, yl = 0, xr = 24 * 60 - Qe, sr = [0, 6, 12, 18, 24], xl = [14, 18, 22, 26];
function Te(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function lr(e) {
  const t = Math.max(0, Math.min(xr, e)), i = Math.floor(t / 60), n = t % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function Gh(e) {
  return Math.round(e / Qe) * Qe;
}
function ar(e) {
  return Math.round(e / Ve) * Ve;
}
function _e(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let di = class extends Vt {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (e, t, i) => {
      e.stopPropagation(), e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
      const o = {
        kind: "handle",
        handle: i,
        origin: { ...t },
        startX: e.clientX,
        startY: e.clientY,
        moved: !1,
        longPressTimer: null,
        longPressed: !1,
        range: this._timeRangeFor(t.at)
      };
      o.longPressTimer = window.setTimeout(() => {
        o.longPressTimer = null, this._drag === o && !o.moved && (o.longPressed = !0, this._fire("transition-delete", { at: o.origin.at }));
      }, Yh), this._drag = o;
    }, this._onHandlePointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle" || t.longPressed) return;
      const i = e.clientX - t.startX, n = e.clientY - t.startY;
      if (!t.moved && Math.hypot(i, n) < wl) return;
      t.moved || (t.moved = !0, t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null));
      const o = this._svg();
      if (!o) {
        this._preview = { at: t.origin.at, low: t.origin.low, high: t.origin.high };
        return;
      }
      const s = o.getBoundingClientRect(), l = _e(
        this._clientToMinutes(e.clientX, s),
        t.range.min,
        t.range.max
      ), h = this._clientToTemp(e.clientY, s);
      let f = t.origin.low, p = t.origin.high;
      t.handle === "low" ? f = _e(h, Je, p - Ve) : p = _e(h, f + Ve, Ie), this._preview = { at: lr(l), low: f, high: p };
    }, this._onHandlePointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle") return;
      const i = e.currentTarget;
      try {
        i.releasePointerCapture(e.pointerId);
      } catch {
      }
      t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null);
      const n = this._preview;
      if (this._drag = null, this._preview = null, !t.longPressed) {
        if (!t.moved) {
          this._fire("transition-edit", { transition: t.origin });
          return;
        }
        n && (this._focusedAt === t.origin.at && (this._focusedAt = n.at), this._fire("transition-update", {
          oldAt: t.origin.at,
          transition: { at: n.at, low: n.low, high: n.high }
        }));
      }
    }, this._onHandlePointerCancel = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle") return;
      const i = e.currentTarget;
      try {
        i.releasePointerCapture(e.pointerId);
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
      const i = {
        kind: "empty",
        startX: e.clientX,
        startY: e.clientY,
        moved: !1
      };
      this._drag = i;
    }, this._onBackgroundPointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty" || t.moved) return;
      const i = e.clientX - t.startX, n = e.clientY - t.startY;
      Math.hypot(i, n) >= wl && (t.moved = !0);
    }, this._onBackgroundPointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty")
        return;
      const i = this._svg();
      try {
        i?.releasePointerCapture(e.pointerId);
      } catch {
      }
      const n = t.moved, o = e.type === "pointercancel";
      if (this._drag = null, o || n || !i) return;
      const s = i.getBoundingClientRect(), l = _e(this._clientToMinutes(e.clientX, s), yl, xr);
      for (const b of this.transitions) if (Te(b.at) === l) return;
      const h = this._clientToTemp(e.clientY, s), f = _e(ar(h - 1.5), Je, Ie - Ve), p = _e(ar(h + 1.5), f + Ve, Ie);
      this._fire("transition-add", { at: lr(l), low: f, high: p });
    }, this._onHandleKeyDown = (e, t, i) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(), this._fire("transition-edit", { transition: t });
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault(), this._fire("transition-delete", { at: t.at });
        return;
      }
      let n = 0, o = 0;
      switch (e.key) {
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
      e.preventDefault();
      const s = this._timeRangeFor(t.at), l = _e(Te(t.at) + n, s.min, s.max);
      let h = t.low, f = t.high;
      if (i === "low" ? h = _e(t.low + o, Je, f - Ve) : f = _e(t.high + o, h + Ve, Ie), l === Te(t.at) && h === t.low && f === t.high)
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
    this._drag && this._drag.kind === "handle" && this._drag.longPressTimer !== null && window.clearTimeout(this._drag.longPressTimer), this._drag = null, this._preview = null, super.disconnectedCallback();
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
    const i = _e((e - t.left) / t.width, 0, 1);
    return Gh(i * 24 * 60);
  }
  _clientToTemp(e, t) {
    if (t.height === 0) return Je;
    const i = _e((e - t.top) / t.height, 0, 1), n = Ie - i * (Ie - Je);
    return ar(n);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((e) => Te(e.at)).sort((e, t) => e - t);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(e) {
    const t = Te(e), i = this._sortedAts().filter((s) => s !== t);
    let n = yl, o = xr;
    for (const s of i)
      s < t && s + Qe > n && (n = s + Qe), s > t && s - Qe < o && (o = s - Qe);
    return { min: n, max: o };
  }
  _fire(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const e = [...this.transitions].sort((i, n) => Te(i.at) - Te(n.at));
    if (!this._preview || !this._drag || this._drag.kind !== "handle") return e;
    const t = this._drag;
    return e.map(
      (i) => i.at === t.origin.at ? { at: this._preview.at, low: this._preview.low, high: this._preview.high } : i
    );
  }
  /** Collect (x, y) corners of a stepped line over one day. The day wraps:
   *  the value held from 00:00 until the first transition fires is the
   *  same as the value held from the last transition until 24:00.
   *  Assumes `transitions` is already sorted by `at` ascending — every
   *  caller goes through `_renderedTransitions()` which sorts. */
  _stepPoints(e, t) {
    const i = e[e.length - 1][t], n = [[0, this._tempToY(i)]];
    let o = i;
    for (const s of e) {
      const l = this._timeToX(Te(s.at));
      n.push([l, this._tempToY(o)]), n.push([l, this._tempToY(s[t])]), o = s[t];
    }
    return n.push([nn, this._tempToY(o)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([o, s]) => `L ${o} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = this._renderedTransitions(), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], o = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
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
var Kh = Object.defineProperty, qh = Object.getOwnPropertyDescriptor, pi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? qh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Kh(t, i, o), o;
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
var Zh = Object.defineProperty, Jh = Object.getOwnPropertyDescriptor, Ge = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Jh(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && Zh(t, i, o), o;
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
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t);
    }, this._onUpdate = async (e) => {
      if (!this.hass) return;
      const { oldAt: t, transition: i } = e.detail, n = this._transitions.filter((o) => o.at !== t && o.at !== i.at).concat(i).sort(cr);
      await this._writeSchedule(n);
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
      i.sort(cr), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
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
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(cr) : [], this._loading = !1);
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
    if (!this.hass) return;
    const t = this._transitions;
    this._transitions = e;
    try {
      await Cc(this.hass, {
        zone: this.zone,
        profile: this._profile,
        transitions: e
      });
    } catch (i) {
      this._transitions = t, this._error = i instanceof Error ? i.message : "Failed to save schedule.";
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
        ${this._transitions.map((e) => {
      const t = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: e } }));
      return U`
            <li
              role="button"
              tabindex="0"
              aria-label="Edit transition at ${e.at}, ${e.low.toFixed(1)} to ${e.high.toFixed(
        1
      )} degrees"
              @click=${t}
              @keydown=${(i) => {
        (i.key === "Enter" || i.key === " ") && (i.preventDefault(), t());
      }}
            >
              <span class="at">${e.at}</span>
              <span>${e.low.toFixed(1)}° – ${e.high.toFixed(1)}°</span>
            </li>
          `;
    })}
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
var tf = Object.defineProperty, ef = Object.getOwnPropertyDescriptor, gi = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ef(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && tf(t, i, o), o;
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
var of = Object.defineProperty, rf = Object.getOwnPropertyDescriptor, Wr = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? rf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && of(t, i, o), o;
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
      (i) => U` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
Wr([
  Y({ attribute: !1 })
], In.prototype, "hass", 2);
Wr([
  Y({ attribute: !1 })
], In.prototype, "config", 2);
In = Wr([
  ae("comfort-band-card-editor")
], In);
var sf = Object.defineProperty, lf = Object.getOwnPropertyDescriptor, Eo = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? lf(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (o = (n ? l(t, i, o) : l(o)) || o);
  return n && o && sf(t, i, o), o;
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
    if (!this._config || !this.hass) return U``;
    const e = this._config.zone, t = Uc(this.hass, e);
    if (t.deviceId === null)
      return U`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", o = this._buildView(this.hass, t);
    return U`
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
      ${i ? null : U`<comfort-band-modal
            .hass=${this.hass}
            zone=${e}
            zoneName=${o.zoneName}
            .entities=${t}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(e, t) {
    const i = (o) => o !== null ? e.states[o] : void 0, n = (o) => {
      const s = i(o);
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
