const ur = globalThis, Co = ur.ShadowRoot && (ur.ShadyCSS === void 0 || ur.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, To = Symbol(), Cs = /* @__PURE__ */ new WeakMap();
let zl = class {
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
const Po = (e) => new zl(typeof e == "string" ? e : e + "", void 0, To), je = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new zl(i, e, To);
}, cc = (e, t) => {
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
const { is: uc, defineProperty: hc, getOwnPropertyDescriptor: dc, getOwnPropertyNames: fc, getOwnPropertySymbols: pc, getPrototypeOf: mc } = Object, yr = globalThis, Ps = yr.trustedTypes, gc = Ps ? Ps.emptyScript : "", bc = yr.reactiveElementPolyfillSupport, Hn = (e, t) => e, dr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? gc : null;
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
} }, Do = (e, t) => !uc(e, t), Ds = { attribute: !0, type: String, converter: dr, reflect: !1, useDefault: !1, hasChanged: Do };
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
      r !== void 0 && hc(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: r, set: s } = dc(this.prototype, t) ?? { get() {
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
    const t = mc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Hn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Hn("properties"))) {
      const i = this.properties, n = [...fc(i), ...pc(i)];
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
    return cc(t, this.constructor.elementStyles), t;
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
sn.elementStyles = [], sn.shadowRootOptions = { mode: "open" }, sn[Hn("elementProperties")] = /* @__PURE__ */ new Map(), sn[Hn("finalized")] = /* @__PURE__ */ new Map(), bc?.({ ReactiveElement: sn }), (yr.reactiveElementVersions ??= []).push("2.1.2");
const Mo = globalThis, Ms = (e) => e, fr = Mo.trustedTypes, zs = fr ? fr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ol = "$lit$", ai = `lit$${Math.random().toFixed(9).slice(2)}$`, Nl = "?" + ai, vc = `<${Nl}>`, Mi = document, In = () => Mi.createComment(""), Bn = (e) => e === null || typeof e != "object" && typeof e != "function", zo = Array.isArray, _c = (e) => zo(e) || typeof e?.[Symbol.iterator] == "function", to = `[ 	
\f\r]`, Pn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Os = /-->/g, Ns = />/g, ki = RegExp(`>|${to}(?:([^\\s"'>=/]+)(${to}*=${to}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ls = /'/g, Hs = /"/g, Ll = /^(?:script|style|textarea|title)$/i, Hl = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), w = Hl(1), ci = Hl(2), cn = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), Rs = /* @__PURE__ */ new WeakMap(), Ti = Mi.createTreeWalker(Mi, 129);
function Rl(e, t) {
  if (!zo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zs !== void 0 ? zs.createHTML(t) : t;
}
const yc = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Pn;
  for (let h = 0; h < i; h++) {
    const d = e[h];
    let p, b, m = -1, v = 0;
    for (; v < d.length && (l.lastIndex = v, b = l.exec(d), b !== null); ) v = l.lastIndex, l === Pn ? b[1] === "!--" ? l = Os : b[1] !== void 0 ? l = Ns : b[2] !== void 0 ? (Ll.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = ki) : b[3] !== void 0 && (l = ki) : l === ki ? b[0] === ">" ? (l = r ?? Pn, m = -1) : b[1] === void 0 ? m = -2 : (m = l.lastIndex - b[2].length, p = b[1], l = b[3] === void 0 ? ki : b[3] === '"' ? Hs : Ls) : l === Hs || l === Ls ? l = ki : l === Os || l === Ns ? l = Pn : (l = ki, r = void 0);
    const A = l === ki && e[h + 1].startsWith("/>") ? " " : "";
    s += l === Pn ? d + vc : m >= 0 ? (n.push(p), d.slice(0, m) + Ol + d.slice(m) + ai + A) : d + ai + (m === -2 ? h : A);
  }
  return [Rl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Un {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const h = t.length - 1, d = this.parts, [p, b] = yc(t, i);
    if (this.el = Un.createElement(p, n), Ti.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (r = Ti.nextNode()) !== null && d.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const m of r.getAttributeNames()) if (m.endsWith(Ol)) {
          const v = b[l++], A = r.getAttribute(m).split(ai), E = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: s, name: E[2], strings: A, ctor: E[1] === "." ? xc : E[1] === "?" ? $c : E[1] === "@" ? kc : wr }), r.removeAttribute(m);
        } else m.startsWith(ai) && (d.push({ type: 6, index: s }), r.removeAttribute(m));
        if (Ll.test(r.tagName)) {
          const m = r.textContent.split(ai), v = m.length - 1;
          if (v > 0) {
            r.textContent = fr ? fr.emptyScript : "";
            for (let A = 0; A < v; A++) r.append(m[A], In()), Ti.nextNode(), d.push({ type: 2, index: ++s });
            r.append(m[v], In());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Nl) d.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = r.data.indexOf(ai, m + 1)) !== -1; ) d.push({ type: 7, index: s }), m += ai.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Mi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function un(e, t, i = e, n) {
  if (t === cn) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Bn(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = un(e, r._$AS(e, t.values), r, n)), t;
}
class wc {
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
        d.type === 2 ? p = new Gn(s, s.nextSibling, this, t) : d.type === 1 ? p = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (p = new Sc(s, this, t)), this._$AV.push(p), d = n[++h];
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
    t = un(this, t, i), Bn(t) ? t === G || t == null || t === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : t !== this._$AH && t !== cn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _c(t) ? this.k(t) : this._(t);
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
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Un.createElement(Rl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new wc(r, this), l = s.u(this.options);
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
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = G;
  }
  _$AI(t, i = this, n, r) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) t = un(this, t, i, 0), l = !Bn(t) || t !== this._$AH && t !== cn, l && (this._$AH = t);
    else {
      const h = t;
      let d, p;
      for (t = s[0], d = 0; d < s.length - 1; d++) p = un(this, h[n + d], i, d), p === cn && (p = this._$AH[d]), l ||= !Bn(p) || p !== this._$AH[d], p === G ? t = G : t !== G && (t += (p ?? "") + s[d + 1]), this._$AH[d] = p;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xc extends wr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class $c extends wr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class kc extends wr {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = un(this, t, i, 0) ?? G) === cn) return;
    const n = this._$AH, r = t === G && n !== G || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== G && (n === G || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Sc {
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
const Ac = Mo.litHtmlPolyfillSupport;
Ac?.(Un, Gn), (Mo.litHtmlVersions ??= []).push("3.3.2");
const Ec = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Gn(t.insertBefore(In(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const Oo = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ec(i, this.renderRoot, this.renderOptions);
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
ze._$litElement$ = !0, ze.finalized = !0, Oo.litElementHydrateSupport?.({ LitElement: ze });
const Cc = Oo.litElementPolyfillSupport;
Cc?.({ LitElement: ze });
(Oo.litElementVersions ??= []).push("4.2.2");
const Qe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Tc = { attribute: !0, type: String, converter: dr, reflect: !1, hasChanged: Do }, Pc = (e = Tc, t, i) => {
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
  return (t, i) => typeof i == "object" ? Pc(e, t, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
function re(e) {
  return I({ ...e, state: !0, attribute: !1 });
}
const Dc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function gn(e, t) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Dc(i, n, { get() {
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
function mr(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
function po(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var Mc = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, Kn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? zc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Mc(t, i, r), r;
};
const mo = 15, Fl = 28, Oc = Fl - mo;
function io(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(mo, Math.min(Fl, e)) - mo) / Oc * 100;
}
let zi = class extends ze {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = mr(this.action), t = pr(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? io(this.low) : 0, l = n ? io(this.high) : 100, h = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), p = r ? io(this.room) : 50, b = (v) => Number.isFinite(v) ? `${v.toFixed(1)}°` : "—", m = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return w`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${m}>
        ${ci`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? ci`<rect class="band" x=${h} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${r ? ci`<circle cx=${p} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${r ? ci`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${t}></circle>` : null}
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
var Nc = Object.defineProperty, Lc = Object.getOwnPropertyDescriptor, jt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Lc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Nc(t, i, r), r;
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
    const e = Hc(this.overrideEnds);
    return w`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = mr(this.action);
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
    const e = mr(this.action), t = e === "heating" || e === "cooling", i = t ? `--cb-mini-bg:${pr(e)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${po(e)}` : ""}`;
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
function Hc(e) {
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
var Rc = Object.defineProperty, Fc = Object.getOwnPropertyDescriptor, Jt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Fc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Rc(t, i, r), r;
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
      <div class="readout" aria-hidden="true">${this._fmt(this.low)} – ${this._fmt(this.high)}</div>
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
Jt([
  I({ type: Number })
], Tt.prototype, "min", 2);
Jt([
  I({ type: Number })
], Tt.prototype, "max", 2);
Jt([
  I({ type: Number })
], Tt.prototype, "step", 2);
Jt([
  I({ type: Number })
], Tt.prototype, "low", 2);
Jt([
  I({ type: Number })
], Tt.prototype, "high", 2);
Jt([
  I({ type: String })
], Tt.prototype, "unit", 2);
Jt([
  re()
], Tt.prototype, "_dragging", 2);
Jt([
  gn(".track")
], Tt.prototype, "_track", 2);
Tt = Jt([
  Qe("dual-handle-slider")
], Tt);
const Qt = "comfort_band";
function Ic(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Bc(e, t) {
  return e.callService(Qt, "set_schedule", { ...t });
}
function Uc(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(Qt, "start_override", i);
}
function jc(e, t) {
  return e.callService(Qt, "cancel_override", { ...t });
}
function Vc(e, t) {
  return e.callService(Qt, "set_profile", { ...t });
}
function Wc(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(Qt, "create_profile", i);
}
function Gc(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(Qt, "clone_profile", i);
}
function Kc(e, t) {
  return e.callService(Qt, "rename_profile", { old: t.old, new: t.new });
}
function qc(e, t) {
  return e.callService(Qt, "delete_profile", { name: t.name });
}
function Yc(e, t) {
  return e.callService(Qt, "record_feedback", { zone: t.zone, label: t.label });
}
var Zc = Object.defineProperty, Jc = Object.getOwnPropertyDescriptor, Ni = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Jc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Zc(t, i, r), r;
};
const Qc = [1, 3, 6], Xc = [
  { label: "too_cold", text: "Too cool" },
  { label: "just_right", text: "Just right" },
  { label: "too_hot", text: "Too warm" }
], eu = 1500, tu = 16, iu = 26, go = 0.5;
let Yt = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._feedbackConfirmed = null, this._feedbackTimer = null, this._heldRange = null, this._feedbackSeq = 0, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Uc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || jc(this.hass, { zone: this.zone });
    }, this._onFeedbackTap = async (e) => {
      if (!this.hass || !this.zone) return;
      const t = ++this._feedbackSeq;
      try {
        await Yc(this.hass, { zone: this.zone, label: e });
      } catch {
        return;
      }
      t === this._feedbackSeq && (this._feedbackConfirmed = e, this._feedbackTimer !== null && clearTimeout(this._feedbackTimer), this._feedbackTimer = setTimeout(() => {
        this._feedbackConfirmed = null, this._feedbackTimer = null;
      }, eu));
    }, this._onPickHours = (e) => {
      !this.hass || !this.entities?.overrideHours || this.hass.callService("number", "set_value", {
        entity_id: this.entities.overrideHours,
        value: e
      });
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._feedbackTimer !== null && (clearTimeout(this._feedbackTimer), this._feedbackTimer = null), this._feedbackConfirmed = null;
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
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.apparentTemperature), l = this._numericState(this.entities.overrideHours), h = this._stateOf(this.entities.currentAction)?.state ?? "unknown", d = this._stateOf(this.entities.overrideActive)?.state === "on", p = this._stateOf(this.entities.useApparentTemperature)?.state === "on", b = Number.isFinite(r) && Number.isFinite(s) && Math.abs(s - r) >= 0.1, m = nu(i, n, e, t), v = this._pendingLow ?? m.low, A = this._pendingHigh ?? m.high, E = this._pendingLow !== null && this._heldRange ? this._heldRange : {
      min: Math.min(tu, Math.floor(m.low)),
      max: Math.max(iu, Math.ceil(m.high))
    };
    this._heldRange = E;
    const z = mr(h), B = z !== "idle" && z !== "unknown";
    return w`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${B ? w`<span class="action-chip" style="background:${pr(z)}"
              >${po(z)}</span
            >` : G}
      </div>
      ${this._renderFeelsLikeRow({ apparent: s, showFeelsLike: b, useApparentOn: p })}
      <div class="gauge-row">
        <band-gauge .low=${i} .high=${n} .room=${r} .action=${h}></band-gauge>
      </div>

      ${this._renderFeedbackSection()}

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${E.min}
          .max=${E.max}
          .step=${go}
          .low=${v}
          .high=${A}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(d)} ${this._renderHoursSection(l)}
    `;
  }
  _renderFeedbackSection() {
    return w`
      <section>
        <h3>How does it feel?</h3>
        <div class="feedback-row">
          ${Xc.map(
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
    if (!e) return G;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = ru(t ?? null);
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
        ${r ? w`<span class="driving">Driving decisions</span>` : G}
      </div>` : r ? w`<div class="feels-like">
        <span class="driving">Driving decisions</span>
      </div>` : n ? w`<div class="feels-like">
        <span class="muted-warn">
          Apparent temperature mode is on but no humidity reading is available — decisions are using
          the raw room temperature.
        </span>
      </div>` : G;
  }
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? w`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Qc.map(
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
    ` : G;
  }
};
Yt.styles = [
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
Ni([
  I({ attribute: !1 })
], Yt.prototype, "hass", 2);
Ni([
  I({ type: String })
], Yt.prototype, "zone", 2);
Ni([
  I({ attribute: !1 })
], Yt.prototype, "entities", 2);
Ni([
  re()
], Yt.prototype, "_pendingLow", 2);
Ni([
  re()
], Yt.prototype, "_pendingHigh", 2);
Ni([
  re()
], Yt.prototype, "_feedbackConfirmed", 2);
Yt = Ni([
  Qe("comfort-band-now-tab")
], Yt);
function nu(e, t, i, n) {
  let r = 19, s = 22;
  return Number.isFinite(e) && Number.isFinite(t) ? (r = e, s = t) : Number.isFinite(i) && Number.isFinite(n) && (r = i, s = n), r = Math.round(r * 10) / 10, s = Math.round(s * 10) / 10, s - r < go && (s = r + go), { low: r, high: s };
}
function ru(e) {
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
var ou = Object.defineProperty, su = Object.getOwnPropertyDescriptor, Xt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? su(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ou(t, i, r), r;
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
  I({ type: String })
], Pt.prototype, "mode", 2);
Xt([
  I({ type: String })
], Pt.prototype, "existingName", 2);
Xt([
  I({ type: Array })
], Pt.prototype, "existingNames", 2);
Xt([
  I({ type: Boolean })
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
  gn('input[name="name"]')
], Pt.prototype, "_nameInput", 2);
Pt = Xt([
  Qe("profile-edit-dialog")
], Pt);
const No = "comfort_band", lu = {
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
function au() {
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
function Il(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, r] of i.identifiers)
      if (n === t[0] && r === t[1])
        return i;
  return null;
}
function Bl(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === No
  );
}
function Ul(e, t) {
  const i = au(), n = Il(e, [No, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Bl(e, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = lu[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function jl(e) {
  const t = Il(e, [No, "profile_manager"]);
  if (t === null) return null;
  for (const i of Bl(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function Vl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
function Wl(e, t, i) {
  const n = t.name?.trim();
  if (n) return n;
  const r = i.deviceId !== null ? e.devices[i.deviceId]?.area_id : null, s = r ? e.areas?.[r]?.name?.trim() : void 0;
  return s || (i.deviceName ?? t.zone);
}
var cu = Object.defineProperty, uu = Object.getOwnPropertyDescriptor, Li = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? uu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && cu(t, i, r), r;
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
          await Wc(this.hass, { name: t, description: i });
        else if (n === "clone" && r)
          await Gc(this.hass, { source: r, target: t, description: i });
        else if (n === "rename" && r)
          t !== r && await Kc(this.hass, { old: r, new: t });
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
        await qc(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = jl(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!t) return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], r = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, l = typeof s == "string" && !!s, h = l ? s : "home", d = t.attributes.descriptions, p = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [b, m] of Object.entries(d))
        typeof m == "string" && (p[b] = m);
    return { options: n, active: r, defaultProfile: h, descriptions: p, crudAvailable: l };
  }
  _onSelect(e) {
    this.hass && Vc(this.hass, { profile: e });
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
          </button>` : G}
      <ul aria-label="Profiles">
        ${t.map(
      (l, h) => this._renderRow(l, h, i, n, r, s)
    )}
      </ul>
      ${s ? G : w`<p class="upgrade-hint">
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
        aria-current=${l ? "true" : G}
        @click=${() => this._onSelect(e)}
        @keydown=${(b) => {
      (b.key === "Enter" || b.key === " ") && (b.preventDefault(), this._onSelect(e));
    }}
      >
        <span class="label">
          <span class="name">${e}</span>
          ${d ? w`<span class="description">${d}</span>` : G}
        </span>
        ${l ? w`<span class="badge">Active</span>` : G}
        ${s ? w`<button
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
            ` : G}
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
  I({ attribute: !1 })
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
const hu = !0, Oe = "u-", du = "uplot", fu = Oe + "hz", pu = Oe + "vt", mu = Oe + "title", gu = Oe + "wrap", bu = Oe + "under", vu = Oe + "over", _u = Oe + "axis", Ci = Oe + "off", yu = Oe + "select", wu = Oe + "cursor-x", xu = Oe + "cursor-y", $u = Oe + "cursor-pt", ku = Oe + "legend", Su = Oe + "live", Au = Oe + "inline", Eu = Oe + "series", Cu = Oe + "marker", Fs = Oe + "label", Tu = Oe + "value", On = "width", Nn = "height", Dn = "top", Is = "bottom", rn = "left", no = "right", Lo = "#000", Bs = Lo + "0", ro = "mousemove", Us = "mousedown", oo = "mouseup", js = "mouseenter", Vs = "mouseleave", Ws = "dblclick", Pu = "resize", Du = "scroll", Gs = "change", gr = "dppxchange", Ho = "--", bn = typeof window < "u", bo = bn ? document : null, an = bn ? window : null, Mu = bn ? navigator : null;
let ce, rr;
function vo() {
  let e = devicePixelRatio;
  ce != e && (ce = e, rr && yo(Gs, rr, vo), rr = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Di(Gs, rr, vo), an.dispatchEvent(new CustomEvent(gr)));
}
function at(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function _o(e, t) {
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
function vt(e, t) {
  return At("div", e, t);
}
const Ks = /* @__PURE__ */ new WeakMap();
function It(e, t, i, n, r) {
  let s = "translate(" + t + "px," + i + "px)", l = Ks.get(e);
  s != l && (e.style.transform = s, Ks.set(e, s), t < 0 || i < 0 || t > n || i > r ? at(e, Ci) : _o(e, Ci));
}
const qs = /* @__PURE__ */ new WeakMap();
function Ys(e, t, i) {
  let n = t + i, r = qs.get(e);
  n != r && (qs.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const Zs = /* @__PURE__ */ new WeakMap();
function Js(e, t, i, n) {
  let r = t + "" + i, s = Zs.get(e);
  r != s && (Zs.set(e, r), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const Ro = { passive: !0 }, zu = { ...Ro, capture: !0 };
function Di(e, t, i, n) {
  t.addEventListener(e, i, n ? zu : Ro);
}
function yo(e, t, i, n) {
  t.removeEventListener(e, i, Ro);
}
bn && vo();
function Et(e, t, i, n) {
  let r;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ct((i + n) / 2), t[r] < e ? i = r : n = r;
  return e - t[i] <= t[n] - e ? i : n;
}
function Gl(e) {
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
const Kl = (e) => e != null, ql = (e) => e != null && e > 0, xr = Gl(Kl), Ou = Gl(ql);
function Nu(e, t, i, n = 0, r = !1) {
  let s = r ? Ou : xr, l = r ? ql : Kl;
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
  let r = el(e), s = el(t);
  e == t && (r == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Kt : Yl, h = r == 1 ? ct : _t, d = s == 1 ? _t : ct, p = h(l(Me(e))), b = d(l(Me(t))), m = hn(i, p), v = hn(i, b);
  return i == 10 && (p < 0 && (m = me(m, -p)), b < 0 && (v = me(v, -b))), n || i == 2 ? (e = m * r, t = v * s) : (e = Xl(e, m), t = kr(t, v)), [e, t];
}
function Fo(e, t, i, n) {
  let r = $r(e, t, i, n);
  return e == 0 && (r[0] = 0), t == 0 && (r[1] = 0), r;
}
const Io = 0.1, Qs = {
  mode: 3,
  pad: Io
}, Rn = {
  pad: 0,
  soft: null,
  mode: 0
}, Lu = {
  min: Rn,
  max: Rn
};
function br(e, t, i, n) {
  return Sr(i) ? Xs(e, t, i) : (Rn.pad = i, Rn.soft = n ? 0 : null, Rn.mode = n ? 3 : 0, Xs(e, t, Lu));
}
function le(e, t) {
  return e ?? t;
}
function Hu(e, t, i) {
  for (t = le(t, 0), i = le(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function Xs(e, t, i) {
  let n = i.min, r = i.max, s = le(n.pad, 0), l = le(r.pad, 0), h = le(n.hard, -pe), d = le(r.hard, pe), p = le(n.soft, pe), b = le(r.soft, -pe), m = le(n.mode, 0), v = le(r.mode, 0), A = t - e, E = Kt(A), z = Je(Me(e), Me(t)), B = Kt(z), j = Me(B - E);
  (A < 1e-24 || j > 10) && (A = 0, (e == 0 || t == 0) && (A = 1e-24, m == 2 && p != pe && (s = 0), v == 2 && b != -pe && (l = 0)));
  let $ = A || z || 1e3, F = Kt($), k = hn(10, ct(F)), J = $ * (A == 0 ? e == 0 ? 0.1 : 1 : s), M = me(Xl(e - J, k / 10), 24), Q = e >= p && (m == 1 || m == 3 && M <= p || m == 2 && M >= p) ? p : pe, q = Je(h, M < Q && e >= Q ? Q : Ct(Q, M)), te = $ * (A == 0 ? t == 0 ? 0.1 : 1 : l), K = me(kr(t + te, k / 10), 24), S = t <= b && (v == 1 || v == 3 && K >= b || v == 2 && K <= b) ? b : -pe, Z = Ct(d, K > S && t <= S ? S : Je(S, K));
  return q == Z && q == 0 && (Z = 100), [q, Z];
}
const Ru = new Intl.NumberFormat(bn ? Mu.language : "en-US"), Bo = (e) => Ru.format(e), ht = Math, hr = ht.PI, Me = ht.abs, ct = ht.floor, De = ht.round, _t = ht.ceil, Ct = ht.min, Je = ht.max, hn = ht.pow, el = ht.sign, Kt = ht.log10, Yl = ht.log2, Fu = (e, t = 1) => ht.sinh(e) * t, so = (e, t = 1) => ht.asinh(e / t), pe = 1 / 0;
function tl(e) {
  return (Kt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function wo(e, t, i) {
  return Ct(Je(e, t), i);
}
function Zl(e) {
  return typeof e == "function";
}
function ie(e) {
  return Zl(e) ? e : () => e;
}
const Iu = () => {
}, Jl = (e) => e, Ql = (e, t) => t, Bu = (e) => null, il = (e) => !0, nl = (e, t) => e == t, Uu = /\.\d*?(?=9{6,}|0{6,})/gm, Oi = (e) => {
  if (ta(e) || ui.has(e))
    return e;
  const t = `${e}`, i = t.match(Uu);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [r, s] = t.split("e");
    return +`${Oi(r)}e${s}`;
  }
  return me(e, n);
};
function Ai(e, t) {
  return Oi(me(Oi(e / t)) * t);
}
function kr(e, t) {
  return Oi(_t(Oi(e / t)) * t);
}
function Xl(e, t) {
  return Oi(ct(Oi(e / t)) * t);
}
function me(e, t = 0) {
  if (ta(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return De(n) / i;
}
const ui = /* @__PURE__ */ new Map();
function ea(e) {
  return (("" + e).split(".")[1] || "").length;
}
function jn(e, t, i, n) {
  let r = [], s = n.map(ea);
  for (let l = t; l < i; l++) {
    let h = Me(l), d = me(hn(e, l), h);
    for (let p = 0; p < n.length; p++) {
      let b = e == 10 ? +`${n[p]}e${l}` : n[p] * d, m = (l >= 0 ? 0 : h) + (l >= s[p] ? 0 : s[p]), v = e == 10 ? b : me(b, m);
      r.push(v), ui.set(v, m);
    }
  }
  return r;
}
const Fn = {}, Uo = [], dn = [null, null], li = Array.isArray, ta = Number.isInteger, ju = (e) => e === void 0;
function rl(e) {
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
function Vu(e) {
  return e != null && typeof e == "object";
}
const Wu = Object.getPrototypeOf(Uint8Array), ia = "__proto__";
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
  } else if (e instanceof Wu)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != ia && (i[n] = fn(e[n], t));
  } else
    i = e;
  return i;
}
function Ce(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let r in n)
      r != ia && (Sr(e[r]) ? Ce(e[r], fn(n[r])) : e[r] = fn(n[r]));
  }
  return e;
}
const Gu = 0, Ku = 1, qu = 2;
function Yu(e, t, i) {
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
function Zu(e, t) {
  if (Xu(e)) {
    let l = e[0].slice();
    for (let h = 1; h < e.length; h++)
      l.push(...e[h].slice(1));
    return eh(l[0]) || (l = Qu(l)), l;
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
      let b = h[p], m = Array(r).fill(void 0), v = t ? t[l][p] : Ku, A = [];
      for (let E = 0; E < b.length; E++) {
        let z = b[E], B = s.get(d[E]);
        z === null ? v != Gu && (m[B] = z, v == qu && A.push(B)) : m[B] = z;
      }
      Yu(m, A, r), n.push(m);
    }
  }
  return n;
}
const Ju = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Qu(e) {
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
function Xu(e) {
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
function eh(e, t = 100) {
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
const na = [
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
], ra = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function oa(e) {
  return e.slice(0, 3);
}
const th = ra.map(oa), ih = na.map(oa), nh = {
  MMMM: na,
  MMM: ih,
  WWWW: ra,
  WWW: th
};
function Mn(e) {
  return (e < 10 ? "0" : "") + e;
}
function rh(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const oh = {
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
  fff: (e) => rh(e.getMilliseconds())
};
function jo(e, t) {
  t = t || nh;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(e); )
    i.push(r[0][0] == "{" ? oh[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let h = 0; h < i.length; h++)
      l += typeof i[h] == "string" ? i[h] : i[h](s, t);
    return l;
  };
}
const sh = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function lh(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == sh ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const sa = (e) => e % 1 == 0, vr = [1, 2, 2.5, 5], ah = jn(10, -32, 0, vr), la = jn(10, 0, 32, vr), ch = la.filter(sa), Ei = ah.concat(la), Vo = `
`, aa = "{YYYY}", ol = Vo + aa, ca = "{M}/{D}", Ln = Vo + ca, or = Ln + "/{YY}", ua = "{aa}", uh = "{h}:{mm}", ln = uh + ua, sl = Vo + ln, ll = ":{ss}", he = null;
function ha(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (e == 1 ? jn(10, 0, 3, vr).filter(sa) : jn(10, -3, 0, vr)).concat([
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
    [l, aa, he, he, he, he, he, he, 1],
    [r * 28, "{MMM}", ol, he, he, he, he, he, 1],
    [r, ca, ol, he, he, he, he, he, 1],
    [n, "{h}" + ua, or, he, Ln, he, he, he, 1],
    [i, ln, or, he, Ln, he, he, he, 1],
    [t, ll, or + " " + ln, he, Ln + " " + ln, he, sl, he, 1],
    [e, ll + ".{fff}", or + " " + ln, he, Ln + " " + ln, he, sl, he, 1]
  ];
  function b(m) {
    return (v, A, E, z, B, j) => {
      let $ = [], F = B >= l, k = B >= s && B < l, J = m(E), M = me(J * e, 3), Q = lo(J.getFullYear(), F ? 0 : J.getMonth(), k || F ? 1 : J.getDate()), q = me(Q * e, 3);
      if (k || F) {
        let te = k ? B / s : 0, K = F ? B / l : 0, S = M == q ? M : me(lo(Q.getFullYear() + K, Q.getMonth() + te, 1) * e, 3), Z = new Date(De(S / e)), O = Z.getFullYear(), V = Z.getMonth();
        for (let R = 0; S <= z; R++) {
          let ne = lo(O + K * R, V + te * R, 1), H = ne - m(me(ne * e, 3));
          S = me((+ne + H) * e, 3), S <= z && $.push(S);
        }
      } else {
        let te = B >= r ? r : B, K = ct(E) - ct(M), S = q + K + kr(M - q, te);
        $.push(S);
        let Z = m(S), O = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, V = B / n, R = v.axes[A]._space, ne = j / R;
        for (; S = me(S + B, e == 1 ? 0 : 3), !(S > z); )
          if (V > 1) {
            let H = ct(me(O + V, 6)) % 24, oe = m(S).getHours() - H;
            oe > 1 && (oe = -1), S -= oe * n, O = (O + V) % 24;
            let de = $[$.length - 1];
            me((S - de) / B, 3) * ne >= 0.7 && $.push(S);
          } else
            $.push(S);
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
const [hh, dh, fh] = ha(1), [ph, mh, gh] = ha(1e-3);
jn(2, -53, 53, [1]);
function al(e, t) {
  return e.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function cl(e, t) {
  return (i, n, r, s, l) => {
    let h = t.find((E) => l >= E[0]) || t[t.length - 1], d, p, b, m, v, A;
    return n.map((E) => {
      let z = e(E), B = z.getFullYear(), j = z.getMonth(), $ = z.getDate(), F = z.getHours(), k = z.getMinutes(), J = z.getSeconds(), M = B != d && h[2] || j != p && h[3] || $ != b && h[4] || F != m && h[5] || k != v && h[6] || J != A && h[7] || h[1];
      return d = B, p = j, b = $, m = F, v = k, A = J, M(z);
    });
  };
}
function bh(e, t) {
  let i = jo(t);
  return (n, r, s, l, h) => r.map((d) => i(e(d)));
}
function lo(e, t, i) {
  return new Date(e, t, i);
}
function ul(e, t) {
  return t(e);
}
const vh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function hl(e, t) {
  return (i, n, r, s) => s == null ? Ho : t(e(n));
}
function _h(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function yh(e, t) {
  return e.series[t].fill(e, t);
}
const wh = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Iu,
  markers: {
    show: !0,
    width: 2,
    stroke: _h,
    fill: yh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function xh(e, t) {
  let i = e.cursor.points, n = vt(), r = i.size(e, t);
  ye(n, On, r), ye(n, Nn, r);
  let s = r / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, r);
  return l && ye(n, "borderWidth", l), n;
}
function $h(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function kh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function Sh(e, t) {
  return e.series[t].points.size;
}
const ao = [0, 0];
function Ah(e, t, i) {
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
const Eh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: Ah,
  points: {
    one: !1,
    show: xh,
    size: Sh,
    width: 0,
    stroke: kh,
    fill: $h
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
}, da = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Wo = Ce({}, da, {
  filter: Ql
}), fa = Ce({}, Wo, {
  size: 10
}), pa = Ce({}, da, {
  show: !1
}), Go = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', ma = "bold " + Go, ga = 1.5, dl = {
  show: !0,
  scale: "x",
  stroke: Lo,
  space: 50,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ma,
  side: 2,
  //	class: "x-vals",
  //	incrs: timeIncrs,
  //	values: timeVals,
  //	filter: retArg1,
  grid: Wo,
  ticks: fa,
  border: pa,
  font: Go,
  lineGap: ga,
  rotate: 0
}, Ch = "Value", Th = "Time", fl = {
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
function Ph(e, t, i, n, r) {
  return t.map((s) => s == null ? "" : Bo(s));
}
function Dh(e, t, i, n, r, s, l) {
  let h = [], d = ui.get(r) || 0;
  i = l ? i : me(kr(i, r), d);
  for (let p = i; p <= n; p = me(p + r, d))
    h.push(Object.is(p, -0) ? 0 : p);
  return h;
}
function xo(e, t, i, n, r, s, l) {
  const h = [], d = e.scales[e.axes[t].scale].log, p = d == 10 ? Kt : Yl, b = ct(p(i));
  r = hn(d, b), d == 10 && (r = Ei[Et(r, Ei)]);
  let m = i, v = r * d;
  d == 10 && (v = Ei[Et(v, Ei)]);
  do
    h.push(m), m = m + r, d == 10 && !ui.has(m) && (m = me(m, ui.get(r))), m >= v && (r = m, v = r * d, d == 10 && (v = Ei[Et(v, Ei)]));
  while (m <= n);
  return h;
}
function Mh(e, t, i, n, r, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, p = n > d ? xo(e, t, Je(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? xo(e, t, Je(d, -n), -i, r) : [d]).reverse().map((v) => -v).concat(b, p);
}
const ba = /./, zh = /[12357]/, Oh = /[125]/, pl = /1/, $o = (e, t, i, n) => e.map((r, s) => t == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function Nh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = e.scales[l], d = e.valToPos, p = s._space, b = d(10, l), m = d(9, l) - b >= p ? ba : d(7, l) - b >= p ? zh : d(5, l) - b >= p ? Oh : pl;
  if (m == pl) {
    let v = Me(d(1, l) - b);
    if (v < p)
      return $o(t.slice().reverse(), h.distr, m, _t(p / v)).reverse();
  }
  return $o(t, h.distr, m, 1);
}
function Lh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, h = s._space, d = e.valToPos, p = Me(d(1, l) - d(2, l));
  return p < h ? $o(t.slice().reverse(), 3, ba, _t(h / p)).reverse() : t;
}
function Hh(e, t, i, n) {
  return n == null ? Ho : t == null ? "" : Bo(t);
}
const ml = {
  show: !0,
  scale: "y",
  stroke: Lo,
  space: 30,
  gap: 5,
  alignTo: 1,
  size: 50,
  labelGap: 0,
  labelSize: 30,
  labelFont: ma,
  side: 3,
  //	class: "y-vals",
  //	incrs: numIncrs,
  //	values: (vals, space) => vals,
  //	filter: retArg1,
  grid: Wo,
  ticks: fa,
  border: pa,
  font: Go,
  lineGap: ga,
  rotate: 0
};
function Rh(e, t) {
  let i = 3 + (e || 1) * 2;
  return me(i * t, 3);
}
function Fh(e, t) {
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
}, va = (e, t, i, n, r) => r, bl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: va,
  alpha: 1,
  facets: [
    Ce({}, gl, { scale: "x" }),
    Ce({}, gl, { scale: "y" })
  ]
}, vl = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: va,
  alpha: 1,
  points: {
    show: Fh,
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
function Ih(e, t, i, n, r) {
  return i / 10;
}
const _a = {
  time: hu,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Bh = Ce({}, _a, {
  time: !1,
  ori: 1
}), _l = {};
function ya(e, t) {
  let i = _l[e];
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
  }, e != null && (_l[e] = i)), i;
}
const pn = 1, ko = 2;
function Hi(e, t, i) {
  const n = e.mode, r = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, h = e.bbox;
  let d = s[0], p = n == 2 ? s[1] : s[t], b = n == 2 ? l[r.facets[0].scale] : l[e.series[0].scale], m = n == 2 ? l[r.facets[1].scale] : l[r.scale], v = h.left, A = h.top, E = h.width, z = h.height, B = e.valToPosH, j = e.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    p,
    b,
    m,
    B,
    j,
    v,
    A,
    E,
    z,
    Er,
    vn,
    Tr,
    xa,
    ka
  ) : i(
    r,
    d,
    p,
    b,
    m,
    j,
    B,
    A,
    v,
    z,
    E,
    Cr,
    _n,
    Yo,
    $a,
    Sa
  );
}
function Ko(e, t) {
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
function Uh(e, t, i, n, r) {
  let s = e.mode, l = e.series[t], h = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[h];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function qt(e, t, i, n, r, s) {
  return Hi(e, t, (l, h, d, p, b, m, v, A, E, z, B) => {
    let j = l.pxRound;
    const $ = p.dir * (p.ori == 0 ? 1 : -1), F = p.ori == 0 ? vn : _n;
    let k, J;
    $ == 1 ? (k = i, J = n) : (k = n, J = i);
    let M = j(m(h[k], p, z, A)), Q = j(v(d[k], b, B, E)), q = j(m(h[J], p, z, A)), te = j(v(s == 1 ? b.max : b.min, b, B, E)), K = new Path2D(r);
    return F(K, q, te), F(K, M, te), F(K, M, Q), K;
  });
}
function Ar(e, t, i, n, r, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const h = t == 0 ? Tr : Yo;
    let d = i;
    for (let m = 0; m < e.length; m++) {
      let v = e[m];
      if (v[1] > v[0]) {
        let A = v[0] - d;
        A > 0 && h(l, d, n, A, n + s), d = v[1];
      }
    }
    let p = i + r - d, b = 10;
    p > 0 && h(l, d, n - b / 2, p, n + s + b);
  }
  return l;
}
function jh(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function qo(e, t, i, n, r, s, l) {
  let h = [], d = e.length;
  for (let p = r == 1 ? i : n; p >= i && p <= n; p += r)
    if (t[p] === null) {
      let m = p, v = p;
      if (r == 1)
        for (; ++p <= n && t[p] === null; )
          v = p;
      else
        for (; --p >= i && t[p] === null; )
          v = p;
      let A = s(e[m]), E = v == m ? A : s(e[v]), z = m - r;
      A = l <= 0 && z >= 0 && z < d ? s(e[z]) : A;
      let j = v + r;
      E = l >= 0 && j >= 0 && j < d ? s(e[j]) : E, E >= A && h.push([A, E]);
    }
  return h;
}
function yl(e) {
  return e == 0 ? Jl : e == 1 ? De : (t) => Ai(t, e);
}
function wa(e) {
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
}, Tr = wa(0), Yo = wa(1), xa = (e, t, i, n, r, s) => {
  e.arc(t, i, n, r, s);
}, $a = (e, t, i, n, r, s) => {
  e.arc(i, t, n, r, s);
}, ka = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(t, i, n, r, s, l);
}, Sa = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(i, t, r, n, l, s);
};
function Aa(e) {
  return (t, i, n, r, s) => Hi(t, i, (l, h, d, p, b, m, v, A, E, z, B) => {
    let { pxRound: j, points: $ } = l, F, k;
    p.ori == 0 ? (F = Er, k = xa) : (F = Cr, k = $a);
    const J = me($.width * ce, 3);
    let M = ($.size - $.width) / 2 * ce, Q = me(M * 2, 3), q = new Path2D(), te = new Path2D(), { left: K, top: S, width: Z, height: O } = t.bbox;
    Tr(
      te,
      K - Q,
      S - Q,
      Z + Q * 2,
      O + Q * 2
    );
    const V = (R) => {
      if (d[R] != null) {
        let ne = j(m(h[R], p, z, A)), H = j(v(d[R], b, B, E));
        F(q, ne + M, H), k(q, ne, H, M, 0, hr * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let R = n; R <= r; R++)
        V(R);
    return {
      stroke: J > 0 ? q : null,
      fill: q,
      clip: te,
      flags: pn | ko
    };
  });
}
function Ea(e) {
  return (t, i, n, r, s, l) => {
    n != r && (s != n && l != n && e(t, i, n), s != r && l != r && e(t, i, r), e(t, i, l));
  };
}
const Vh = Ea(vn), Wh = Ea(_n);
function Ca(e) {
  const t = le(e?.alignGaps, 0);
  return (i, n, r, s) => Hi(i, n, (l, h, d, p, b, m, v, A, E, z, B) => {
    [r, s] = xr(d, r, s);
    let j = l.pxRound, $ = (O) => j(m(O, p, z, A)), F = (O) => j(v(O, b, B, E)), k, J;
    p.ori == 0 ? (k = vn, J = Vh) : (k = _n, J = Wh);
    const M = p.dir * (p.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: pn }, q = Q.stroke;
    let te = !1;
    if (s - r >= z * 4) {
      let O = (N) => i.posToVal(N, p.key, !0), V = null, R = null, ne, H, et, we = $(h[M == 1 ? r : s]), oe = $(h[r]), de = $(h[s]), X = O(M == 1 ? oe + 1 : de - 1);
      for (let N = M == 1 ? r : s; N >= r && N <= s; N += M) {
        let Te = h[N], xe = (M == 1 ? Te < X : Te > X) ? we : $(Te), ue = d[N];
        xe == we ? ue != null ? (H = ue, V == null ? (k(q, xe, F(H)), ne = V = R = H) : H < V ? V = H : H > R && (R = H)) : ue === null && (te = !0) : (V != null && J(q, we, F(V), F(R), F(ne), F(H)), ue != null ? (H = ue, k(q, xe, F(H)), V = R = ne = H) : (V = R = null, ue === null && (te = !0)), we = xe, X = O(we + M));
      }
      V != null && V != R && et != we && J(q, we, F(V), F(R), F(ne), F(H));
    } else
      for (let O = M == 1 ? r : s; O >= r && O <= s; O += M) {
        let V = d[O];
        V === null ? te = !0 : V != null && k(q, $(h[O]), F(V));
      }
    let [S, Z] = Ko(i, n);
    if (l.fill != null || S != 0) {
      let O = Q.fill = new Path2D(q), V = l.fillTo(i, n, l.min, l.max, S), R = F(V), ne = $(h[r]), H = $(h[s]);
      M == -1 && ([H, ne] = [ne, H]), k(O, H, R), k(O, ne, R);
    }
    if (!l.spanGaps) {
      let O = [];
      te && O.push(...qo(h, d, r, s, M, $, t)), Q.gaps = O = l.gaps(i, n, r, s, O), Q.clip = Ar(O, p.ori, A, E, z, B);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      qt(i, n, r, s, q, -1),
      qt(i, n, r, s, q, 1)
    ] : qt(i, n, r, s, q, Z)), Q;
  });
}
function Gh(e) {
  const t = le(e.align, 1), i = le(e.ascDesc, !1), n = le(e.alignGaps, 0), r = le(e.extend, !1);
  return (s, l, h, d) => Hi(s, l, (p, b, m, v, A, E, z, B, j, $, F) => {
    [h, d] = xr(m, h, d);
    let k = p.pxRound, { left: J, width: M } = s.bbox, Q = (oe) => k(E(oe, v, $, B)), q = (oe) => k(z(oe, A, F, j)), te = v.ori == 0 ? vn : _n;
    const K = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: pn }, S = K.stroke, Z = v.dir * (v.ori == 0 ? 1 : -1);
    let O = q(m[Z == 1 ? h : d]), V = Q(b[Z == 1 ? h : d]), R = V, ne = V;
    r && t == -1 && (ne = J, te(S, ne, O)), te(S, V, O);
    for (let oe = Z == 1 ? h : d; oe >= h && oe <= d; oe += Z) {
      let de = m[oe];
      if (de == null)
        continue;
      let X = Q(b[oe]), N = q(de);
      t == 1 ? te(S, X, O) : te(S, R, N), te(S, X, N), O = N, R = X;
    }
    let H = R;
    r && t == 1 && (H = J + M, te(S, H, O));
    let [et, we] = Ko(s, l);
    if (p.fill != null || et != 0) {
      let oe = K.fill = new Path2D(S), de = p.fillTo(s, l, p.min, p.max, et), X = q(de);
      te(oe, H, X), te(oe, ne, X);
    }
    if (!p.spanGaps) {
      let oe = [];
      oe.push(...qo(b, m, h, d, Z, Q, n));
      let de = p.width * ce / 2, X = i || t == 1 ? de : -de, N = i || t == -1 ? -de : de;
      oe.forEach((Te) => {
        Te[0] += X, Te[1] += N;
      }), K.gaps = oe = p.gaps(s, l, h, d, oe), K.clip = Ar(oe, v.ori, B, j, $, F);
    }
    return we != 0 && (K.band = we == 2 ? [
      qt(s, l, h, d, S, -1),
      qt(s, l, h, d, S, 1)
    ] : qt(s, l, h, d, S, we)), K;
  });
}
function wl(e, t, i, n, r, s, l = pe) {
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
function Kh(e) {
  e = e || Fn;
  const t = le(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let r = e.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = ie(r), l = 1 - t[0], h = le(t[1], pe), d = le(t[2], 1), p = le(e.disp, Fn), b = le(e.each, (A) => {
  }), { fill: m, stroke: v } = p;
  return (A, E, z, B) => Hi(A, E, (j, $, F, k, J, M, Q, q, te, K, S) => {
    let Z = j.pxRound, O = i, V = n * ce, R = h * ce, ne = d * ce, H, et;
    k.ori == 0 ? [H, et] = s(A, E) : [et, H] = s(A, E);
    const we = k.dir * (k.ori == 0 ? 1 : -1);
    let oe = k.ori == 0 ? Tr : Yo, de = k.ori == 0 ? b : (P, ge, Pe, Bi, gi, Ot, bi) => {
      b(P, ge, Pe, gi, Bi, bi, Ot);
    }, X = le(A.bands, Uo).find((P) => P.series[0] == E), N = X != null ? X.dir : 0, Te = j.fillTo(A, E, j.min, j.max, N), Ge = Z(Q(Te, J, S, te)), xe, ue, wt, nt = K, ke = Z(j.width * ce), zt = !1, Vt = null, dt = null, ti = null, Ri = null;
    m != null && (ke == 0 || v != null) && (zt = !0, Vt = m.values(A, E, z, B), dt = /* @__PURE__ */ new Map(), new Set(Vt).forEach((P) => {
      P != null && dt.set(P, new Path2D());
    }), ke > 0 && (ti = v.values(A, E, z, B), Ri = /* @__PURE__ */ new Map(), new Set(ti).forEach((P) => {
      P != null && Ri.set(P, new Path2D());
    })));
    let { x0: Fi, size: xn } = p;
    if (Fi != null && xn != null) {
      O = 1, $ = Fi.values(A, E, z, B), Fi.unit == 2 && ($ = $.map((Pe) => A.posToVal(q + Pe * K, k.key, !0)));
      let P = xn.values(A, E, z, B);
      xn.unit == 2 ? ue = P[0] * K : ue = M(P[0], k, K, q) - M(0, k, K, q), nt = wl($, F, M, k, K, q, nt), wt = nt - ue + V;
    } else
      nt = wl($, F, M, k, K, q, nt), wt = nt * l + V, ue = nt - wt;
    wt < 1 && (wt = 0), ke >= ue / 2 && (ke = 0), wt < 5 && (Z = Jl);
    let qn = wt > 0, pi = nt - wt - (qn ? ke : 0);
    ue = Z(wo(pi, ne, R)), xe = (O == 0 ? ue / 2 : O == we ? 0 : ue) - O * we * ((O == 0 ? V / 2 : 0) + (qn ? ke / 2 : 0));
    const Ke = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ii = zt ? null : new Path2D();
    let Wt = null;
    if (X != null)
      Wt = A.data[X.series[1]];
    else {
      let { y0: P, y1: ge } = p;
      P != null && ge != null && (F = ge.values(A, E, z, B), Wt = P.values(A, E, z, B));
    }
    let mi = H * ue, Y = et * ue;
    for (let P = we == 1 ? z : B; P >= z && P <= B; P += we) {
      let ge = F[P];
      if (ge == null)
        continue;
      if (Wt != null) {
        let tt = Wt[P] ?? 0;
        if (ge - tt == 0)
          continue;
        Ge = Q(tt, J, S, te);
      }
      let Pe = k.distr != 2 || p != null ? $[P] : P, Bi = M(Pe, k, K, q), gi = Q(le(ge, Te), J, S, te), Ot = Z(Bi - xe), bi = Z(Je(gi, Ge)), rt = Z(Ct(gi, Ge)), ft = bi - rt;
      if (ge != null) {
        let tt = ge < 0 ? Y : mi, xt = ge < 0 ? mi : Y;
        zt ? (ke > 0 && ti[P] != null && oe(Ri.get(ti[P]), Ot, rt + ct(ke / 2), ue, Je(0, ft - ke), tt, xt), Vt[P] != null && oe(dt.get(Vt[P]), Ot, rt + ct(ke / 2), ue, Je(0, ft - ke), tt, xt)) : oe(Ii, Ot, rt + ct(ke / 2), ue, Je(0, ft - ke), tt, xt), de(
          A,
          E,
          P,
          Ot - ke / 2,
          rt,
          ue + ke,
          ft
        );
      }
    }
    return ke > 0 ? Ke.stroke = zt ? Ri : Ii : zt || (Ke._fill = j.width == 0 ? j._fill : j._stroke ?? j._fill, Ke.width = 0), Ke.fill = zt ? dt : Ii, Ke;
  });
}
function qh(e, t) {
  const i = le(t?.alignGaps, 0);
  return (n, r, s, l) => Hi(n, r, (h, d, p, b, m, v, A, E, z, B, j) => {
    [s, l] = xr(p, s, l);
    let $ = h.pxRound, F = (H) => $(v(H, b, B, E)), k = (H) => $(A(H, m, j, z)), J, M, Q;
    b.ori == 0 ? (J = Er, Q = vn, M = ka) : (J = Cr, Q = _n, M = Sa);
    const q = b.dir * (b.ori == 0 ? 1 : -1);
    let te = F(d[q == 1 ? s : l]), K = te, S = [], Z = [];
    for (let H = q == 1 ? s : l; H >= s && H <= l; H += q)
      if (p[H] != null) {
        let we = d[H], oe = F(we);
        S.push(K = oe), Z.push(k(p[H]));
      }
    const O = { stroke: e(S, Z, J, Q, M, $), fill: null, clip: null, band: null, gaps: null, flags: pn }, V = O.stroke;
    let [R, ne] = Ko(n, r);
    if (h.fill != null || R != 0) {
      let H = O.fill = new Path2D(V), et = h.fillTo(n, r, h.min, h.max, R), we = k(et);
      Q(H, K, we), Q(H, te, we);
    }
    if (!h.spanGaps) {
      let H = [];
      H.push(...qo(d, p, s, l, q, F, i)), O.gaps = H = h.gaps(n, r, s, l, H), O.clip = Ar(H, b.ori, E, z, B, j);
    }
    return ne != 0 && (O.band = ne == 2 ? [
      qt(n, r, s, l, V, -1),
      qt(n, r, s, l, V, 1)
    ] : qt(n, r, s, l, V, ne)), O;
  });
}
function Yh(e) {
  return qh(Zh, e);
}
function Zh(e, t, i, n, r, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const h = new Path2D();
  if (i(h, e[0], t[0]), l == 2)
    n(h, e[1], t[1]);
  else {
    let d = Array(l), p = Array(l - 1), b = Array(l - 1), m = Array(l - 1);
    for (let v = 0; v < l - 1; v++)
      b[v] = t[v + 1] - t[v], m[v] = e[v + 1] - e[v], p[v] = b[v] / m[v];
    d[0] = p[0];
    for (let v = 1; v < l - 1; v++)
      p[v] === 0 || p[v - 1] === 0 || p[v - 1] > 0 != p[v] > 0 ? d[v] = 0 : (d[v] = 3 * (m[v - 1] + m[v]) / ((2 * m[v] + m[v - 1]) / p[v - 1] + (m[v] + 2 * m[v - 1]) / p[v]), isFinite(d[v]) || (d[v] = 0));
    d[l - 1] = p[l - 2];
    for (let v = 0; v < l - 1; v++)
      r(
        h,
        e[v] + m[v] / 3,
        t[v] + d[v] * m[v] / 3,
        e[v + 1] - m[v] / 3,
        t[v + 1] - d[v + 1] * m[v] / 3,
        e[v + 1],
        t[v + 1]
      );
  }
  return h;
}
const So = /* @__PURE__ */ new Set();
function xl() {
  for (let e of So)
    e.syncRect(!0);
}
bn && (Di(Pu, an, xl), Di(Du, an, xl, !0), Di(gr, an, () => {
  We.pxRatio = ce;
}));
const Jh = Ca(), Qh = Aa();
function $l(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Ao(s, l, t, i));
}
function Xh(e, t) {
  return e.map((i, n) => n == 0 ? {} : Ce({}, t, i));
}
function Ao(e, t, i, n) {
  return Ce({}, t == 0 ? i : n, e);
}
function Ta(e, t, i) {
  return t == null ? dn : [t, i];
}
const ed = Ta;
function td(e, t, i) {
  return t == null ? dn : br(t, i, Io, !0);
}
function Pa(e, t, i, n) {
  return t == null ? dn : $r(t, i, e.scales[n].log, !1);
}
const id = Pa;
function Da(e, t, i, n) {
  return t == null ? dn : Fo(t, i, e.scales[n].log, !1);
}
const nd = Da;
function rd(e, t, i, n, r) {
  let s = Je(tl(e), tl(t)), l = t - e, h = Et(r / n * l, i);
  do {
    let d = i[h], p = n * d / l;
    if (p >= r && s + (d < 5 ? ui.get(d) : 0) <= 17)
      return [d, p];
  } while (++h < i.length);
  return [0, 0];
}
function kl(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, r) => (t = De((i = +r) * ce)) + "px"), [e, t, i];
}
function od(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = me(t[2] * ce, 1);
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
  const p = n.root = vt(du);
  if (e.id != null && (p.id = e.id), at(p, e.class), e.title) {
    let o = vt(mu, p);
    o.textContent = e.title;
  }
  const b = At("canvas"), m = n.ctx = b.getContext("2d"), v = vt(gu, p);
  Di("click", v, (o) => {
    o.target === E && (be != Qi || $e != Xi) && Ue.click(n, o);
  }, !0);
  const A = n.under = vt(bu, v);
  v.appendChild(b);
  const E = n.over = vt(vu, v);
  e = fn(e);
  const z = +le(e.pxAlign, 1), B = yl(z);
  (e.plugins || []).forEach((o) => {
    o.opts && (e = o.opts(n, e) || e);
  });
  const j = e.ms || 1e-3, $ = n.series = r == 1 ? $l(e.series || [], fl, vl, !1) : Xh(e.series || [null], bl), F = n.axes = $l(e.axes || [], dl, ml, !0), k = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((o) => {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1);
  });
  const M = r == 2 ? $[1].facets[0].scale : $[0].scale, Q = {
    axes: qa,
    series: ja
  }, q = (e.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function te(o) {
    const a = o.distr == 3 ? (c) => Kt(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => so(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = a(c), { _min: f, _max: g } = o, _ = g - f;
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
        a = k[o] = Ce({}, o == M ? _a : Bh, c), a.key = o;
        let u = a.time, f = a.range, g = li(f);
        if ((o != M || r == 2 && !u) && (g && (f[0] == null || f[1] == null) && (f = {
          min: f[0] == null ? Qs : {
            mode: 1,
            hard: f[0],
            soft: f[0]
          },
          max: f[1] == null ? Qs : {
            mode: 1,
            hard: f[1],
            soft: f[1]
          }
        }, g = !1), !g && Sr(f))) {
          let _ = f;
          f = (y, x, C) => x == null ? dn : br(x, C, _);
        }
        a.range = ie(f || (u ? ed : o == M ? a.distr == 3 ? id : a.distr == 4 ? nd : Ta : a.distr == 3 ? Pa : a.distr == 4 ? Da : td)), a.auto = ie(g ? !1 : a.auto), a.clamp = ie(a.clamp || Ih), a._min = a._max = null, a.valToPct = te(a);
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
  const S = k[M], Z = S.distr;
  let O, V;
  S.ori == 0 ? (at(p, fu), O = s, V = l) : (at(p, pu), O = l, V = s);
  const R = {};
  for (let o in k) {
    let a = k[o];
    (a.min != null || a.max != null) && (R[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const ne = e.tzDate || ((o) => new Date(De(o / j))), H = e.fmtDate || jo, et = j == 1 ? fh(ne) : gh(ne), we = cl(ne, al(j == 1 ? dh : mh, H)), oe = hl(ne, ul(vh, H)), de = [], X = n.legend = Ce({}, wh, e.legend), N = n.cursor = Ce({}, Eh, { drag: { y: r == 2 } }, e.cursor), Te = X.show, Ge = N.show, xe = X.markers;
  X.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, wt, nt, ke = [], zt = [], Vt, dt = !1, ti = {};
  if (X.live) {
    const o = $[1] ? $[1].values : null;
    dt = o != null, Vt = dt ? o(n, 1, 0) : { _: 0 };
    for (let a in Vt)
      ti[a] = Ho;
  }
  if (Te)
    if (ue = At("table", ku, p), nt = At("tbody", null, ue), X.mount(n, ue), dt) {
      wt = At("thead", null, ue, nt);
      let o = At("tr", null, wt);
      At("th", null, o);
      for (var Ri in Vt)
        At("th", Fs, o).textContent = Ri;
    } else
      at(ue, Au), X.live && at(ue, Su);
  const Fi = { show: !0 }, xn = { show: !1 };
  function qn(o, a) {
    if (a == 0 && (dt || !X.live || r == 2))
      return dn;
    let c = [], u = At("tr", Eu, nt, nt.childNodes[a]);
    at(u, o.class), o.show || at(u, Ci);
    let f = At("th", null, u);
    if (xe.show) {
      let y = vt(Cu, f);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (y.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let g = vt(Fs, f);
    o.label instanceof HTMLElement ? g.appendChild(o.label) : g.textContent = o.label, a > 0 && (xe.show || (g.style.color = o.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ke("click", f, (y) => {
      if (N._lock)
        return;
      _i(y);
      let x = $.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let C = $.some((T, D) => D > 0 && D != x && T.show);
        $.forEach((T, D) => {
          D > 0 && Lt(D, C ? D == x ? Fi : xn : Fi, !0, Ee.setSeries);
        });
      } else
        Lt(x, { show: !o.show }, !0, Ee.setSeries);
    }, !1), ji && Ke(js, f, (y) => {
      N._lock || (_i(y), Lt($.indexOf(o), tn, !0, Ee.setSeries));
    }, !1));
    for (var _ in Vt) {
      let y = At("td", Tu, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const pi = /* @__PURE__ */ new Map();
  function Ke(o, a, c, u = !0) {
    const f = pi.get(a) || {}, g = N.bind[o](n, a, c, u);
    g && (Di(o, a, f[o] = g), pi.set(a, f));
  }
  function Ii(o, a, c) {
    const u = pi.get(a) || {};
    for (let f in u)
      (o == null || f == o) && (yo(f, a, u[f]), delete u[f]);
    o == null && pi.delete(a);
  }
  let Wt = 0, mi = 0, Y = 0, P = 0, ge = 0, Pe = 0, Bi = ge, gi = Pe, Ot = Y, bi = P, rt = 0, ft = 0, tt = 0, xt = 0;
  n.bbox = {};
  let Mr = !1, Yn = !1, Ui = !1, vi = !1, Zn = !1, pt = !1;
  function zr(o, a, c) {
    (c || o != n.width || a != n.height) && Qo(o, a), qi(!1), Ui = !0, Yn = !0, Yi();
  }
  function Qo(o, a) {
    n.width = Wt = Y = o, n.height = mi = P = a, ge = Pe = 0, La(), Ha();
    let c = n.bbox;
    rt = c.left = Ai(ge * ce, 0.5), ft = c.top = Ai(Pe * ce, 0.5), tt = c.width = Ai(Y * ce, 0.5), xt = c.height = Ai(P * ce, 0.5);
  }
  const za = 3;
  function Oa() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = Ga(a), u = Ka(a);
      o = a == za || c && u, o || (Qo(n.width, n.height), Yn = !0);
    }
  }
  function Na({ width: o, height: a }) {
    zr(o, a);
  }
  n.setSize = Na;
  function La() {
    let o = !1, a = !1, c = !1, u = !1;
    F.forEach((f, g) => {
      if (f.show && f._show) {
        let { side: _, _size: y } = f, x = _ % 2, C = f.label != null ? f.labelSize : 0, T = y + C;
        T > 0 && (x ? (Y -= T, _ == 3 ? (ge += T, u = !0) : c = !0) : (P -= T, _ == 0 ? (Pe += T, o = !0) : a = !0));
      }
    }), yi[0] = o, yi[1] = c, yi[2] = a, yi[3] = u, Y -= ii[1] + ii[3], ge += ii[3], P -= ii[2] + ii[0], Pe += ii[0];
  }
  function Ha() {
    let o = ge + Y, a = Pe + P, c = ge, u = Pe;
    function f(g, _) {
      switch (g) {
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
    F.forEach((g, _) => {
      if (g.show && g._show) {
        let y = g.side;
        g._pos = f(y, g._size), g.label != null && (g._lpos = f(y, g.labelSize));
      }
    });
  }
  if (N.dataIdx == null) {
    let o = N.hover, a = o.skip = new Set(o.skip ?? []);
    a.add(void 0);
    let c = o.prox = ie(o.prox), u = o.bias ??= 0;
    N.dataIdx = (f, g, _, y) => {
      if (g == 0)
        return _;
      let x = _, C = c(f, g, _, y) ?? pe, T = C >= 0 && C < pe, D = S.ori == 0 ? Y : P, W = N.left, ae = t[0], se = t[g];
      if (a.has(se[_])) {
        x = null;
        let ee = null, U = null, L;
        if (u == 0 || u == -1)
          for (L = _; ee == null && L-- > 0; )
            a.has(se[L]) || (ee = L);
        if (u == 0 || u == 1)
          for (L = _; U == null && L++ < se.length; )
            a.has(se[L]) || (U = L);
        if (ee != null || U != null)
          if (T) {
            let _e = ee == null ? -1 / 0 : O(ae[ee], S, D, 0), Se = U == null ? 1 / 0 : O(ae[U], S, D, 0), Ie = W - _e, fe = Se - W;
            Ie <= fe ? Ie <= C && (x = ee) : fe <= C && (x = U);
          } else
            x = U == null ? ee : ee == null ? U : _ - ee <= U - _ ? ee : U;
      } else T && Me(W - O(ae[_], S, D, 0)) > C && (x = null);
      return x;
    };
  }
  const _i = (o) => {
    N.event = o;
  };
  N.idxs = de, N._lock = !1;
  let Ve = N.points;
  Ve.show = ie(Ve.show), Ve.size = ie(Ve.size), Ve.stroke = ie(Ve.stroke), Ve.width = ie(Ve.width), Ve.fill = ie(Ve.fill);
  const Nt = n.focus = Ce({}, e.focus || { alpha: 0.3 }, N.focus), ji = Nt.prox >= 0, Vi = ji && Ve.one;
  let mt = [], Wi = [], Gi = [];
  function Xo(o, a) {
    let c = Ve.show(n, a);
    if (c instanceof HTMLElement)
      return at(c, $u), at(c, o.class), It(c, -10, -10, Y, P), E.insertBefore(c, mt[a]), c;
  }
  function es(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && k[o.scale].time, u = o.value;
      o.value = c ? rl(u) ? hl(ne, ul(u, H)) : u || oe : u || Hh, o.label = o.label || (c ? Th : Ch);
    }
    if (Vi || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || Jh || Bu, o.fillTo = ie(o.fillTo || Uh), o.pxAlign = +le(o.pxAlign, z), o.pxRound = yl(o.pxAlign), o.stroke = ie(o.stroke || null), o.fill = ie(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = Rh(Je(1, o.width), 1), u = o.points = Ce({}, {
        size: c,
        width: Je(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: Qh,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = ie(u.show), u.filter = ie(u.filter), u.fill = ie(u.fill), u.stroke = ie(u.stroke), u.paths = ie(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Te) {
      let c = qn(o, a);
      ke.splice(a, 0, c[0]), zt.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Ge) {
      de.splice(a, 0, null);
      let c = null;
      Vi ? a == 0 && (c = Xo(o, a)) : a > 0 && (c = Xo(o, a)), mt.splice(a, 0, c), Wi.splice(a, 0, 0), Gi.splice(a, 0, 0);
    }
    Fe("addSeries", a);
  }
  function Ra(o, a) {
    a = a ?? $.length, o = r == 1 ? Ao(o, a, fl, vl) : Ao(o, a, {}, bl), $.splice(a, 0, o), es($[a], a);
  }
  n.addSeries = Ra;
  function Fa(o) {
    if ($.splice(o, 1), Te) {
      X.values.splice(o, 1), zt.splice(o, 1);
      let a = ke.splice(o, 1)[0];
      Ii(null, a.firstChild), a.remove();
    }
    Ge && (de.splice(o, 1), mt.splice(o, 1)[0].remove(), Wi.splice(o, 1), Gi.splice(o, 1)), Fe("delSeries", o);
  }
  n.delSeries = Fa;
  const yi = [!1, !1, !1, !1];
  function Ia(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = k[o.scale];
      u == null && (o.scale = c ? $[1].scale : M, u = k[o.scale]);
      let f = u.time;
      o.size = ie(o.size), o.space = ie(o.space), o.rotate = ie(o.rotate), li(o.incrs) && o.incrs.forEach((_) => {
        !ui.has(_) && ui.set(_, ea(_));
      }), o.incrs = ie(o.incrs || (u.distr == 2 ? ch : f ? j == 1 ? hh : ph : Ei)), o.splits = ie(o.splits || (f && u.distr == 1 ? et : u.distr == 3 ? xo : u.distr == 4 ? Mh : Dh)), o.stroke = ie(o.stroke), o.grid.stroke = ie(o.grid.stroke), o.ticks.stroke = ie(o.ticks.stroke), o.border.stroke = ie(o.border.stroke);
      let g = o.values;
      o.values = // static array of tick values
      li(g) && !li(g[0]) ? ie(g) : (
        // temporal
        f ? (
          // config array of fmtDate string tpls
          li(g) ? cl(ne, al(g, H)) : (
            // fmtDate string tpl
            rl(g) ? bh(ne, g) : g || we
          )
        ) : g || Ph
      ), o.filter = ie(o.filter || (u.distr >= 3 && u.log == 10 ? Nh : u.distr == 3 && u.log == 2 ? Lh : Ql)), o.font = kl(o.font), o.labelFont = kl(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (yi[a] = !0, o._el = vt(_u, v));
    }
  }
  function $n(o, a, c, u) {
    let [f, g, _, y] = c, x = a % 2, C = 0;
    return x == 0 && (y || g) && (C = a == 0 && !f || a == 2 && !_ ? De(dl.size / 3) : 0), x == 1 && (f || _) && (C = a == 1 && !g || a == 3 && !y ? De(ml.size / 2) : 0), C;
  }
  const ts = n.padding = (e.padding || [$n, $n, $n, $n]).map((o) => ie(le(o, $n))), ii = n._padding = ts.map((o, a) => o(n, a, yi, 0));
  let Be, Ne = null, Le = null;
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
    if (qi(!0), Fe("setData"), Z == 2 && (Ui = !0), a !== !1) {
      let c = S;
      c.auto(n, kn) ? Or() : ri(M, c.min, c.max), vi = vi || N.left >= 0, pt = !0, Yi();
    }
  }
  n.setData = is;
  function Or() {
    kn = !0;
    let o, a;
    r == 1 && (Be > 0 ? (Ne = Jn[0] = 0, Le = Jn[1] = Be - 1, o = t[0][Ne], a = t[0][Le], Z == 2 ? (o = Ne, a = Le) : o == a && (Z == 3 ? [o, a] = $r(o, o, S.log, !1) : Z == 4 ? [o, a] = Fo(o, o, S.log, !1) : S.time ? a = o + De(86400 / j) : [o, a] = br(o, a, Io, !0))) : (Ne = Jn[0] = o = null, Le = Jn[1] = a = null)), ri(M, o, a);
  }
  let Qn, Ki, Nr, Lr, Hr, Rr, Fr, Ir, Br, it;
  function ns(o, a, c, u, f, g) {
    o ??= Bs, c ??= Uo, u ??= "butt", f ??= Bs, g ??= "round", o != Qn && (m.strokeStyle = Qn = o), f != Ki && (m.fillStyle = Ki = f), a != Nr && (m.lineWidth = Nr = a), g != Hr && (m.lineJoin = Hr = g), u != Rr && (m.lineCap = Rr = u), c != Lr && m.setLineDash(Lr = c);
  }
  function rs(o, a, c, u) {
    a != Ki && (m.fillStyle = Ki = a), o != Fr && (m.font = Fr = o), c != Ir && (m.textAlign = Ir = c), u != Br && (m.textBaseline = Br = u);
  }
  function Ur(o, a, c, u, f = 0) {
    if (u.length > 0 && o.auto(n, kn) && (a == null || a.min == null)) {
      let g = le(Ne, 0), _ = le(Le, u.length - 1), y = c.min == null ? Nu(u, g, _, f, o.distr == 3) : [c.min, c.max];
      o.min = Ct(o.min, c.min = y[0]), o.max = Je(o.max, c.max = y[1]);
    }
  }
  const os = { min: null, max: null };
  function Ba() {
    for (let u in k) {
      let f = k[u];
      R[u] == null && // scales that have never been set (on init)
      (f.min == null || // or auto scales when the x scale was explicitly set
      R[M] != null && f.auto(n, kn)) && (R[u] = os);
    }
    for (let u in k) {
      let f = k[u];
      R[u] == null && f.from != null && R[f.from] != null && (R[u] = os);
    }
    R[M] != null && qi(!0);
    let o = {};
    for (let u in R) {
      let f = R[u];
      if (f != null) {
        let g = o[u] = fn(k[u], Vu);
        if (f.min != null)
          Ce(g, f);
        else if (u != M || r == 2)
          if (Be == 0 && g.from == null) {
            let _ = g.range(n, null, null, u);
            g.min = _[0], g.max = _[1];
          } else
            g.min = pe, g.max = -pe;
      }
    }
    if (Be > 0) {
      $.forEach((u, f) => {
        if (r == 1) {
          let g = u.scale, _ = R[g];
          if (_ == null)
            return;
          let y = o[g];
          if (f == 0) {
            let x = y.range(n, y.min, y.max, g);
            y.min = x[0], y.max = x[1], Ne = Et(y.min, t[0]), Le = Et(y.max, t[0]), Le - Ne > 1 && (t[0][Ne] < y.min && Ne++, t[0][Le] > y.max && Le--), u.min = $t[Ne], u.max = $t[Le];
          } else u.show && u.auto && Ur(y, _, u, t[f], u.sorted);
          u.idxs[0] = Ne, u.idxs[1] = Le;
        } else if (f > 0 && u.show && u.auto) {
          let [g, _] = u.facets, y = g.scale, x = _.scale, [C, T] = t[f], D = o[y], W = o[x];
          D != null && Ur(D, R[y], g, C, g.sorted), W != null && Ur(W, R[x], _, T, _.sorted), u.min = _.min, u.max = _.max;
        }
      });
      for (let u in o) {
        let f = o[u], g = R[u];
        if (f.from == null && (g == null || g.min == null)) {
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
        let g = o[f.from];
        if (g.min == null)
          f.min = f.max = null;
        else {
          let _ = f.range(n, g.min, g.max, u);
          f.min = _[0], f.max = _[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let u in o) {
      let f = o[u], g = k[u];
      if (g.min != f.min || g.max != f.max) {
        g.min = f.min, g.max = f.max;
        let _ = g.distr;
        g._min = _ == 3 ? Kt(g.min) : _ == 4 ? so(g.min, g.asinh) : _ == 100 ? g.fwd(g.min) : g.min, g._max = _ == 3 ? Kt(g.max) : _ == 4 ? so(g.max, g.asinh) : _ == 100 ? g.fwd(g.max) : g.max, a[u] = c = !0;
      }
    }
    if (c) {
      $.forEach((u, f) => {
        r == 2 ? f > 0 && a.y && (u._paths = null) : a[u.scale] && (u._paths = null);
      });
      for (let u in a)
        Ui = !0, Fe("setScale", u);
      Ge && N.left >= 0 && (vi = pt = !0);
    }
    for (let u in R)
      R[u] = null;
  }
  function Ua(o) {
    let a = wo(Ne - 1, 0, Be - 1), c = wo(Le + 1, 0, Be - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < Be - 1; )
      c++;
    return [a, c];
  }
  function ja() {
    if (Be > 0) {
      let o = $.some((a) => a._focus) && it != Nt.alpha;
      o && (m.globalAlpha = it = Nt.alpha), $.forEach((a, c) => {
        if (c > 0 && a.show && (ss(c, !1), ss(c, !0), a._paths == null)) {
          let u = it;
          it != a.alpha && (m.globalAlpha = it = a.alpha);
          let f = r == 2 ? [0, t[c][0].length - 1] : Ua(t[c]);
          a._paths = a.paths(n, c, f[0], f[1]), it != u && (m.globalAlpha = it = u);
        }
      }), $.forEach((a, c) => {
        if (c > 0 && a.show) {
          let u = it;
          it != a.alpha && (m.globalAlpha = it = a.alpha), a._paths != null && ls(c, !1);
          {
            let f = a._paths != null ? a._paths.gaps : null, g = a.points.show(n, c, Ne, Le, f), _ = a.points.filter(n, c, g, f);
            (g || _) && (a.points._paths = a.points.paths(n, c, Ne, Le, _), ls(c, !0));
          }
          it != u && (m.globalAlpha = it = u), Fe("drawSeries", c);
        }
      }), o && (m.globalAlpha = it = 1);
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
      clip: g,
      flags: _,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: C = c.width
    } = c._paths;
    C = me(C * ce, 3);
    let T = null, D = C % 2 / 2;
    a && x == null && (x = C > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && D > 0;
    if (W && m.translate(D, D), !a) {
      let ae = rt - C / 2, se = ft - C / 2, ee = tt + C, U = xt + C;
      T = new Path2D(), T.rect(ae, se, ee, U);
    }
    a ? jr(y, C, c.dash, c.cap, x, u, f, _, g) : Va(o, y, C, c.dash, c.cap, x, u, f, _, T, g), W && m.translate(-D, -D);
  }
  function Va(o, a, c, u, f, g, _, y, x, C, T) {
    let D = !1;
    x != 0 && J.forEach((W, ae) => {
      if (W.series[0] == o) {
        let se = $[W.series[1]], ee = t[W.series[1]], U = (se._paths || Fn).band;
        li(U) && (U = W.dir == 1 ? U[0] : U[1]);
        let L, _e = null;
        se.show && U && Hu(ee, Ne, Le) ? (_e = W.fill(n, ae) || g, L = se._paths.clip) : U = null, jr(a, c, u, f, _e, _, y, x, C, T, L, U), D = !0;
      }
    }), D || jr(a, c, u, f, g, _, y, x, C, T);
  }
  const as = pn | ko;
  function jr(o, a, c, u, f, g, _, y, x, C, T, D) {
    ns(o, a, c, u, f), (x || C || D) && (m.save(), x && m.clip(x), C && m.clip(C)), D ? (y & as) == as ? (m.clip(D), T && m.clip(T), er(f, _), Xn(o, g, a)) : y & ko ? (er(f, _), m.clip(D), Xn(o, g, a)) : y & pn && (m.save(), m.clip(D), T && m.clip(T), er(f, _), m.restore(), Xn(o, g, a)) : (er(f, _), Xn(o, g, a)), (x || C || D) && m.restore();
  }
  function Xn(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((u, f) => {
      m.strokeStyle = Qn = f, m.stroke(u);
    }) : a != null && o && m.stroke(a));
  }
  function er(o, a) {
    a instanceof Map ? a.forEach((c, u) => {
      m.fillStyle = Ki = u, m.fill(c);
    }) : a != null && o && m.fill(a);
  }
  function Wa(o, a, c, u) {
    let f = F[o], g;
    if (u <= 0)
      g = [0, 0];
    else {
      let _ = f._space = f.space(n, o, a, c, u), y = f._incrs = f.incrs(n, o, a, c, u, _);
      g = rd(a, c, y, u, _);
    }
    return f._found = g;
  }
  function Vr(o, a, c, u, f, g, _, y, x, C) {
    let T = _ % 2 / 2;
    z == 1 && m.translate(T, T), ns(y, _, x, C, y), m.beginPath();
    let D, W, ae, se, ee = f + (u == 0 || u == 3 ? -g : g);
    c == 0 ? (W = f, se = ee) : (D = f, ae = ee);
    for (let U = 0; U < o.length; U++)
      a[U] != null && (c == 0 ? D = ae = o[U] : W = se = o[U], m.moveTo(D, W), m.lineTo(ae, se));
    m.stroke(), z == 1 && m.translate(-T, -T);
  }
  function Ga(o) {
    let a = !0;
    return F.forEach((c, u) => {
      if (!c.show)
        return;
      let f = k[c.scale];
      if (f.min == null) {
        c._show && (a = !1, c._show = !1, qi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, qi(!1));
      let g = c.side, _ = g % 2, { min: y, max: x } = f, [C, T] = Wa(u, y, x, _ == 0 ? Y : P);
      if (T == 0)
        return;
      let D = f.distr == 2, W = c._splits = c.splits(n, u, y, x, C, T, D), ae = f.distr == 2 ? W.map((L) => $t[L]) : W, se = f.distr == 2 ? $t[W[1]] - $t[W[0]] : C, ee = c._values = c.values(n, c.filter(n, ae, u, T, se), u, T, se);
      c._rotate = g == 2 ? c.rotate(n, ee, u, T) : 0;
      let U = c._size;
      c._size = _t(c.size(n, ee, u, o)), U != null && c._size != U && (a = !1);
    }), a;
  }
  function Ka(o) {
    let a = !0;
    return ts.forEach((c, u) => {
      let f = c(n, u, yi, o);
      f != ii[u] && (a = !1), ii[u] = f;
    }), a;
  }
  function qa() {
    for (let o = 0; o < F.length; o++) {
      let a = F[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, u = c % 2, f, g, _ = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [x, C] = a._found;
      if (a.label != null) {
        let Ye = a.labelGap * y, lt = De((a._lpos + Ye) * ce);
        rs(a.labelFont[0], _, "center", c == 2 ? Dn : Is), m.save(), u == 1 ? (f = g = 0, m.translate(
          lt,
          De(ft + xt / 2)
        ), m.rotate((c == 3 ? -hr : hr) / 2)) : (f = De(rt + tt / 2), g = lt);
        let $i = Zl(a.label) ? a.label(n, o, x, C) : a.label;
        m.fillText($i, f, g), m.restore();
      }
      if (C == 0)
        continue;
      let T = k[a.scale], D = u == 0 ? tt : xt, W = u == 0 ? rt : ft, ae = a._splits, se = T.distr == 2 ? ae.map((Ye) => $t[Ye]) : ae, ee = T.distr == 2 ? $t[ae[1]] - $t[ae[0]] : x, U = a.ticks, L = a.border, _e = U.show ? U.size : 0, Se = De(_e * ce), Ie = De((a.alignTo == 2 ? a._size - _e - a.gap : a.gap) * ce), fe = a._rotate * -hr / 180, Ae = B(a._pos * ce), ot = (Se + Ie) * y, qe = Ae + ot;
      g = u == 0 ? qe : 0, f = u == 1 ? qe : 0;
      let gt = a.font[0], kt = a.align == 1 ? rn : a.align == 2 ? no : fe > 0 ? rn : fe < 0 ? no : u == 0 ? "center" : c == 3 ? no : rn, Rt = fe || u == 1 ? "middle" : c == 2 ? Dn : Is;
      rs(gt, _, kt, Rt);
      let st = a.font[1] * a.lineGap, bt = ae.map((Ye) => B(h(Ye, T, D, W))), St = a._values;
      for (let Ye = 0; Ye < St.length; Ye++) {
        let lt = St[Ye];
        if (lt != null) {
          u == 0 ? f = bt[Ye] : g = bt[Ye], lt = "" + lt;
          let $i = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let Ze = 0; Ze < $i.length; Ze++) {
            let Es = $i[Ze];
            fe ? (m.save(), m.translate(f, g + Ze * st), m.rotate(fe), m.fillText(Es, 0, 0), m.restore()) : m.fillText(Es, f, g + Ze * st);
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
        me(U.width * ce, 3),
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
        me(Ft.width * ce, 3),
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
        me(L.width * ce, 3),
        L.stroke(n, o),
        L.dash,
        L.cap
      );
    }
    Fe("drawAxes");
  }
  function qi(o) {
    $.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let tr = !1, Wr = !1, Sn = [];
  function Ya() {
    Wr = !1;
    for (let o = 0; o < Sn.length; o++)
      Fe(...Sn[o]);
    Sn.length = 0;
  }
  function Yi() {
    tr || (Ju(cs), tr = !0);
  }
  function Za(o, a = !1) {
    tr = !0, Wr = a, o(n), cs(), a && Sn.length > 0 && queueMicrotask(Ya);
  }
  n.batch = Za;
  function cs() {
    if (Mr && (Ba(), Mr = !1), Ui && (Oa(), Ui = !1), Yn) {
      if (ye(A, rn, ge), ye(A, Dn, Pe), ye(A, On, Y), ye(A, Nn, P), ye(E, rn, ge), ye(E, Dn, Pe), ye(E, On, Y), ye(E, Nn, P), ye(v, On, Wt), ye(v, Nn, mi), b.width = De(Wt * ce), b.height = De(mi * ce), F.forEach(({ _el: o, _show: a, _size: c, _pos: u, side: f }) => {
        if (o != null)
          if (a) {
            let g = f === 3 || f === 0 ? c : 0, _ = f % 2 == 1;
            ye(o, _ ? "left" : "top", u - g), ye(o, _ ? "width" : "height", c), ye(o, _ ? "top" : "left", _ ? Pe : ge), ye(o, _ ? "height" : "width", _ ? P : Y), _o(o, Ci);
          } else
            at(o, Ci);
      }), Qn = Ki = Nr = Hr = Rr = Fr = Ir = Br = Lr = null, it = 1, Cn(!0), ge != Bi || Pe != gi || Y != Ot || P != bi) {
        qi(!1);
        let o = Y / Ot, a = P / bi;
        if (Ge && !vi && N.left >= 0) {
          N.left *= o, N.top *= a, Zi && It(Zi, De(N.left), 0, Y, P), Ji && It(Ji, 0, De(N.top), Y, P);
          for (let c = 0; c < mt.length; c++) {
            let u = mt[c];
            u != null && (Wi[c] *= o, Gi[c] *= a, It(u, _t(Wi[c]), _t(Gi[c]), Y, P));
          }
        }
        if (ve.show && !Zn && ve.left >= 0 && ve.width > 0) {
          ve.left *= o, ve.width *= o, ve.top *= a, ve.height *= a;
          for (let c in Jr)
            ye(en, c, ve[c]);
        }
        Bi = ge, gi = Pe, Ot = Y, bi = P;
      }
      Fe("setSize"), Yn = !1;
    }
    Wt > 0 && mi > 0 && (m.clearRect(0, 0, b.width, b.height), Fe("drawClear"), q.forEach((o) => o()), Fe("draw")), ve.show && Zn && (ir(ve), Zn = !1), Ge && vi && (xi(null, !0, !1), vi = !1), X.show && X.live && pt && (Yr(), pt = !1), d || (d = !0, n.status = 1, Fe("ready")), kn = !1, tr = !1;
  }
  n.redraw = (o, a) => {
    Ui = a || !1, o !== !1 ? ri(M, S.min, S.max) : Yi();
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
  let Kr, qr, Zi, Ji, us, hs, Qi, Xi, ds, fs, be, $e, ni = !1;
  const Ue = N.drag;
  let He = Ue.x, Re = Ue.y;
  Ge && (N.x && (Kr = vt(wu, E)), N.y && (qr = vt(xu, E)), S.ori == 0 ? (Zi = Kr, Ji = qr) : (Zi = qr, Ji = Kr), be = N.left, $e = N.top);
  const ve = n.select = Ce({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), en = ve.show ? vt(yu, ve.over ? E : A) : null;
  function ir(o, a) {
    if (ve.show) {
      for (let c in o)
        ve[c] = o[c], c in Jr && ye(en, c, o[c]);
      a !== !1 && Fe("setSelect");
    }
  }
  n.setSelect = ir;
  function Ja(o) {
    if ($[o].show)
      Te && _o(ke[o], Ci);
    else if (Te && at(ke[o], Ci), Ge) {
      let c = Vi ? mt[0] : mt[o];
      c != null && It(c, -10, -10, Y, P);
    }
  }
  function ri(o, a, c) {
    Gr(o, { min: a, max: c });
  }
  function Lt(o, a, c, u) {
    a.focus != null && ic(o), a.show != null && $.forEach((f, g) => {
      g > 0 && (o == g || o == null) && (f.show = a.show, Ja(g), r == 2 ? (ri(f.facets[0].scale, null, null), ri(f.facets[1].scale, null, null)) : ri(f.scale, null, null), Yi());
    }), c !== !1 && Fe("setSeries", o, a), u && Tn("setSeries", n, o, a);
  }
  n.setSeries = Lt;
  function Qa(o, a) {
    Ce(J[o], a);
  }
  function Xa(o, a) {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function ec(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = Xa, n.setBand = Qa, n.delBand = ec;
  function tc(o, a) {
    $[o].alpha = a, Ge && mt[o] != null && (mt[o].style.opacity = a), Te && ke[o] && (ke[o].style.opacity = a);
  }
  let Gt, oi, wi;
  const tn = { focus: !0 };
  function ic(o) {
    if (o != wi) {
      let a = o == null, c = Nt.alpha != 1;
      $.forEach((u, f) => {
        if (r == 1 || f > 0) {
          let g = a || f == 0 || f == o;
          u._focus = a ? null : g, c && tc(f, g ? 1 : Nt.alpha);
        }
      }), wi = o, c && Yi();
    }
  }
  Te && ji && Ke(Vs, ue, (o) => {
    N._lock || (_i(o), wi != null && Lt(null, tn, !0, Ee.setSeries));
  });
  function Ht(o, a, c) {
    let u = k[a];
    c && (o = o / ce - (u.ori == 1 ? Pe : ge));
    let f = Y;
    u.ori == 1 && (f = P, o = f - o), u.dir == -1 && (o = f - o);
    let g = u._min, _ = u._max, y = o / f, x = g + (_ - g) * y, C = u.distr;
    return C == 3 ? hn(10, x) : C == 4 ? Fu(x, u.asinh) : C == 100 ? u.bwd(x) : x;
  }
  function nc(o, a) {
    let c = Ht(o, M, a);
    return Et(c, t[0], Ne, Le);
  }
  n.valToIdx = (o) => Et(o, t[0]), n.posToIdx = nc, n.posToVal = Ht, n.valToPos = (o, a, c) => k[a].ori == 0 ? s(
    o,
    k[a],
    c ? tt : Y,
    c ? rt : 0
  ) : l(
    o,
    k[a],
    c ? xt : P,
    c ? ft : 0
  ), n.setCursor = (o, a, c) => {
    be = o.left, $e = o.top, xi(null, a, c);
  };
  function ps(o, a) {
    ye(en, rn, ve.left = o), ye(en, On, ve.width = a);
  }
  function ms(o, a) {
    ye(en, Dn, ve.top = o), ye(en, Nn, ve.height = a);
  }
  let An = S.ori == 0 ? ps : ms, En = S.ori == 1 ? ps : ms;
  function rc() {
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
    }) : ju(o.idx) || de.fill(o.idx), X.idx = de[0]), Te && X.live) {
      for (let c = 0; c < $.length; c++)
        (c > 0 || r == 1 && !dt) && oc(c, de[c]);
      rc();
    }
    pt = !1, a !== !1 && Fe("setLegend");
  }
  n.setLegend = Yr;
  function oc(o, a) {
    let c = $[o], u = o == 0 && Z == 2 ? $t : t[o], f;
    dt ? f = c.values(n, o, a) ?? ti : (f = c.value(n, a == null ? null : u[a], o, a), f = f == null ? ti : { _: f }), X.values[o] = f;
  }
  function xi(o, a, c) {
    ds = be, fs = $e, [be, $e] = N.move(n, be, $e), N.left = be, N.top = $e, Ge && (Zi && It(Zi, De(be), 0, Y, P), Ji && It(Ji, 0, De($e), Y, P));
    let u, f = Ne > Le;
    Gt = pe, oi = null;
    let g = S.ori == 0 ? Y : P, _ = S.ori == 1 ? Y : P;
    if (be < 0 || Be == 0 || f) {
      u = N.idx = null;
      for (let y = 0; y < $.length; y++) {
        let x = mt[y];
        x != null && It(x, -10, -10, Y, P);
      }
      ji && Lt(null, tn, !0, o == null && Ee.setSeries), X.live && (de.fill(u), pt = !0);
    } else {
      let y, x, C;
      r == 1 && (y = S.ori == 0 ? be : $e, x = Ht(y, M), u = N.idx = Et(x, t[0], Ne, Le), C = O(t[0][u], S, g, 0));
      let T = -10, D = -10, W = 0, ae = 0, se = !0, ee = "", U = "";
      for (let L = r == 2 ? 1 : 0; L < $.length; L++) {
        let _e = $[L], Se = de[L], Ie = Se == null ? null : r == 1 ? t[L][Se] : t[L][1][Se], fe = N.dataIdx(n, L, u, x), Ae = fe == null ? null : r == 1 ? t[L][fe] : t[L][1][fe];
        if (pt = pt || Ae != Ie || fe != Se, de[L] = fe, L > 0 && _e.show) {
          let ot = fe == null ? -10 : fe == u ? C : O(r == 1 ? t[0][fe] : t[L][0][fe], S, g, 0), qe = Ae == null ? -10 : V(Ae, r == 1 ? k[_e.scale] : k[_e.facets[1].scale], _, 0);
          if (ji && Ae != null) {
            let gt = S.ori == 1 ? be : $e, kt = Me(Nt.dist(n, L, fe, qe, gt));
            if (kt < Gt) {
              let Rt = Nt.bias;
              if (Rt != 0) {
                let st = Ht(gt, _e.scale), bt = Ae >= 0 ? 1 : -1, St = st >= 0 ? 1 : -1;
                St == bt && (St == 1 ? Rt == 1 ? Ae >= st : Ae <= st : (
                  // >= 0
                  Rt == 1 ? Ae <= st : Ae >= st
                )) && (Gt = kt, oi = L);
              } else
                Gt = kt, oi = L;
            }
          }
          if (pt || Vi) {
            let gt, kt;
            S.ori == 0 ? (gt = ot, kt = qe) : (gt = qe, kt = ot);
            let Rt, st, bt, St, Ft, Ye, lt = !0, $i = Ve.bbox;
            if ($i != null) {
              lt = !1;
              let Ze = $i(n, L);
              bt = Ze.left, St = Ze.top, Rt = Ze.width, st = Ze.height;
            } else
              bt = gt, St = kt, Rt = st = Ve.size(n, L);
            if (Ye = Ve.fill(n, L), Ft = Ve.stroke(n, L), Vi)
              L == oi && Gt <= Nt.prox && (T = bt, D = St, W = Rt, ae = st, se = lt, ee = Ye, U = Ft);
            else {
              let Ze = mt[L];
              Ze != null && (Wi[L] = bt, Gi[L] = St, Js(Ze, Rt, st, lt), Ys(Ze, Ye, Ft), It(Ze, _t(bt), _t(St), Y, P));
            }
          }
        }
      }
      if (Vi) {
        let L = Nt.prox, _e = wi == null ? Gt <= L : Gt > L || oi != wi;
        if (pt || _e) {
          let Se = mt[0];
          Se != null && (Wi[0] = T, Gi[0] = D, Js(Se, W, ae, se), Ys(Se, ee, U), It(Se, _t(T), _t(D), Y, P));
        }
      }
    }
    if (ve.show && ni)
      if (o != null) {
        let [y, x] = Ee.scales, [C, T] = Ee.match, [D, W] = o.cursor.sync.scales, ae = o.cursor.drag;
        if (He = ae._x, Re = ae._y, He || Re) {
          let { left: se, top: ee, width: U, height: L } = o.select, _e = o.scales[D].ori, Se = o.posToVal, Ie, fe, Ae, ot, qe, gt = y != null && C(y, D), kt = x != null && T(x, W);
          gt && He ? (_e == 0 ? (Ie = se, fe = U) : (Ie = ee, fe = L), Ae = k[y], ot = O(Se(Ie, D), Ae, g, 0), qe = O(Se(Ie + fe, D), Ae, g, 0), An(Ct(ot, qe), Me(qe - ot))) : An(0, g), kt && Re ? (_e == 1 ? (Ie = se, fe = U) : (Ie = ee, fe = L), Ae = k[x], ot = V(Se(Ie, W), Ae, _, 0), qe = V(Se(Ie + fe, W), Ae, _, 0), En(Ct(ot, qe), Me(qe - ot))) : En(0, _);
        } else
          Qr();
      } else {
        let y = Me(ds - us), x = Me(fs - hs);
        if (S.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        He = Ue.x && y >= Ue.dist, Re = Ue.y && x >= Ue.dist;
        let C = Ue.uni;
        C != null ? He && Re && (He = y >= C, Re = x >= C, !He && !Re && (x > y ? Re = !0 : He = !0)) : Ue.x && Ue.y && (He || Re) && (He = Re = !0);
        let T, D;
        He && (S.ori == 0 ? (T = Qi, D = be) : (T = Xi, D = $e), An(Ct(T, D), Me(D - T)), Re || En(0, _)), Re && (S.ori == 1 ? (T = Qi, D = be) : (T = Xi, D = $e), En(Ct(T, D), Me(D - T)), He || An(0, g)), !He && !Re && (An(0, 0), En(0, 0));
      }
    if (Ue._x = He, Ue._y = Re, o == null) {
      if (c) {
        if (As != null) {
          let [y, x] = Ee.scales;
          Ee.values[0] = y != null ? Ht(S.ori == 0 ? be : $e, y) : null, Ee.values[1] = x != null ? Ht(S.ori == 1 ? be : $e, x) : null;
        }
        Tn(ro, n, be, $e, Y, P, u);
      }
      if (ji) {
        let y = c && Ee.setSeries, x = Nt.prox;
        wi == null ? Gt <= x && Lt(oi, tn, !0, y) : Gt > x ? Lt(null, tn, !0, y) : oi != wi && Lt(oi, tn, !0, y);
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
  function gs(o, a, c, u, f, g, _) {
    N._lock || ni && o != null && o.movementX == 0 && o.movementY == 0 || (Zr(o, a, c, u, f, g, _, !1, o != null), o != null ? xi(null, !0, !0) : xi(a, !0, !1));
  }
  function Zr(o, a, c, u, f, g, _, y, x) {
    if (si == null && Cn(!1), _i(o), o != null)
      c = o.clientX - si.left, u = o.clientY - si.top;
    else {
      if (c < 0 || u < 0) {
        be = -10, $e = -10;
        return;
      }
      let [C, T] = Ee.scales, D = a.cursor.sync, [W, ae] = D.values, [se, ee] = D.scales, [U, L] = Ee.match, _e = a.axes[0].side % 2 == 1, Se = S.ori == 0 ? Y : P, Ie = S.ori == 1 ? Y : P, fe = _e ? g : f, Ae = _e ? f : g, ot = _e ? u : c, qe = _e ? c : u;
      if (se != null ? c = U(C, se) ? h(W, k[C], Se, 0) : -10 : c = Se * (ot / fe), ee != null ? u = L(T, ee) ? h(ae, k[T], Ie, 0) : -10 : u = Ie * (qe / Ae), S.ori == 1) {
        let gt = c;
        c = u, u = gt;
      }
    }
    x && (a == null || a.cursor.event.type == ro) && ((c <= 1 || c >= Y - 1) && (c = Ai(c, Y)), (u <= 1 || u >= P - 1) && (u = Ai(u, P))), y ? (us = c, hs = u, [Qi, Xi] = N.move(n, c, u)) : (be = c, $e = u);
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
  let bs, vs, _s, ys;
  function ws(o, a, c, u, f, g, _) {
    ni = !0, He = Re = Ue._x = Ue._y = !1, Zr(o, a, c, u, f, g, _, !0, !1), o != null && (Ke(oo, bo, xs, !1), Tn(Us, n, Qi, Xi, Y, P, null));
    let { left: y, top: x, width: C, height: T } = ve;
    bs = y, vs = x, _s = C, ys = T;
  }
  function xs(o, a, c, u, f, g, _) {
    ni = Ue._x = Ue._y = !1, Zr(o, a, c, u, f, g, _, !1, !0);
    let { left: y, top: x, width: C, height: T } = ve, D = C > 0 || T > 0, W = bs != y || vs != x || _s != C || ys != T;
    if (D && W && ir(ve), Ue.setScale && D && W) {
      let ae = y, se = C, ee = x, U = T;
      if (S.ori == 1 && (ae = x, se = T, ee = y, U = C), He && ri(
        M,
        Ht(ae, M),
        Ht(ae + se, M)
      ), Re)
        for (let L in k) {
          let _e = k[L];
          L != M && _e.from == null && _e.min != pe && ri(
            L,
            Ht(ee + U, L),
            Ht(ee, L)
          );
        }
      Qr();
    } else N.lock && (N._lock = !N._lock, xi(a, !0, o != null));
    o != null && (Ii(oo, bo), Tn(oo, n, be, $e, Y, P, null));
  }
  function sc(o, a, c, u, f, g, _) {
    if (N._lock)
      return;
    _i(o);
    let y = ni;
    if (ni) {
      let x = !0, C = !0, T = 10, D, W;
      S.ori == 0 ? (D = He, W = Re) : (D = Re, W = He), D && W && (x = be <= T || be >= Y - T, C = $e <= T || $e >= P - T), D && x && (be = be < Qi ? 0 : Y), W && C && ($e = $e < Xi ? 0 : P), xi(null, !0, !0), ni = !1;
    }
    be = -10, $e = -10, de.fill(null), xi(null, !0, !0), y && (ni = y);
  }
  function $s(o, a, c, u, f, g, _) {
    N._lock || (_i(o), Or(), Qr(), o != null && Tn(Ws, n, be, $e, Y, P, null));
  }
  function ks() {
    F.forEach(od), zr(n.width, n.height, !0);
  }
  Di(gr, an, ks);
  const nn = {};
  nn.mousedown = ws, nn.mousemove = gs, nn.mouseup = xs, nn.dblclick = $s, nn.setSeries = (o, a, c, u) => {
    let f = Ee.match[2];
    c = f(n, a, c), c != -1 && Lt(c, u, !0, !1);
  }, Ge && (Ke(Us, E, ws), Ke(ro, E, gs), Ke(js, E, (o) => {
    _i(o), Cn(!1);
  }), Ke(Vs, E, sc), Ke(Ws, E, $s), So.add(n), n.syncRect = Cn);
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
      pub: il,
      sub: il
    },
    scales: [M, $[1] ? $[1].scale : null],
    match: [nl, nl, Ss],
    values: [null, null]
  }, N.sync);
  Ee.match.length == 2 && Ee.match.push(Ss), N.sync = Ee;
  const As = Ee.key, Xr = ya(As);
  function Tn(o, a, c, u, f, g, _) {
    Ee.filters.pub(o, a, c, u, f, g, _) && Xr.pub(o, a, c, u, f, g, _);
  }
  Xr.sub(n);
  function lc(o, a, c, u, f, g, _) {
    Ee.filters.sub(o, a, c, u, f, g, _) && nn[o](null, a, c, u, f, g, _);
  }
  n.pub = lc;
  function ac() {
    Xr.unsub(n), So.delete(n), pi.clear(), yo(gr, an, ks), p.remove(), ue?.remove(), Fe("destroy");
  }
  n.destroy = ac;
  function eo() {
    Fe("init", e, t), is(t || e.data, !1), R[M] ? Gr(M, R[M]) : Or(), Zn = ve.show && (ve.width > 0 || ve.height > 0), vi = pt = !0, zr(e.width, e.height);
  }
  return $.forEach(es), F.forEach(Ia), i ? i instanceof HTMLElement ? (i.appendChild(p), eo()) : i(n, eo) : eo(), n;
}
We.assign = Ce;
We.fmtNum = Bo;
We.rangeNum = br;
We.rangeLog = $r;
We.rangeAsinh = Fo;
We.orient = Hi;
We.pxRatio = ce;
We.join = Zu;
We.fmtDate = jo, We.tzDate = lh;
We.sync = ya;
{
  We.addGap = jh, We.clipGaps = Ar;
  let e = We.paths = {
    points: Aa
  };
  e.linear = Ca, e.stepped = Gh, e.bars = Kh, e.spline = Yh;
}
const sd = 24;
async function ld(e, t, i, n) {
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
        const m = s[p] ?? [];
        s[p] = [...m, ...b].filter((v) => v.lu >= d);
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
function ad(e, t) {
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
const cd = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var ud = Object.defineProperty, Pr = (e, t, i, n) => {
  for (var r = void 0, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = l(t, i, r) || r);
  return r && ud(t, i, r), r;
};
const hd = [
  Xe,
  Po(cd),
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
    this.styles = hd;
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
  gn(".chart-host")
], yn.prototype, "_host");
var dd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, ei = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? fd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && dd(t, i, r), r;
};
const Eo = 260, pd = 3;
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
    this._unsubscribe && this._unsubscribe !== Sl && this._unsubscribe(), this._unsubscribe = Sl;
    const e = pd + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const n = await ld(this.hass, i, sd, (r) => {
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
    const d = ad(h, t), p = this._buildOpts(this._host.clientWidth || 400);
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
      values: (p, b) => b.map((m) => `${m.toFixed(0)}%`)
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
            const m = p.bbox.top, v = p.bbox.height;
            b.save();
            for (const A of this._intervals) {
              const E = p.valToPos(A.start, "x", !0), z = p.valToPos(A.end, "x", !0);
              z <= E || (b.fillStyle = A.action === "heating" ? Al(t, 0.18) : Al(i, 0.18), b.fillRect(E, m, z - E, v));
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
      ${this._loading ? w`<div class="status">Loading 24 h history…</div>` : G}
      ${this._error ? w`<div class="status">${this._error}</div>` : G}
      ${this._empty ? w`<div class="status">
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
    return w`<div class="legend">
      ${this._toggleItem(
      "Room",
      w`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      w`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : G}
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
  I({ attribute: !1 })
], Dt.prototype, "hass", 2);
ei([
  I({ type: String })
], Dt.prototype, "roomEntity", 2);
ei([
  I({ type: String })
], Dt.prototype, "lowEntity", 2);
ei([
  I({ type: String })
], Dt.prototype, "highEntity", 2);
ei([
  I({ type: String })
], Dt.prototype, "actionEntity", 2);
ei([
  I({ type: String })
], Dt.prototype, "apparentEntity", 2);
ei([
  I({ type: String })
], Dt.prototype, "humidityEntity", 2);
ei([
  re()
], Dt.prototype, "_hiddenLabels", 2);
Dt = ei([
  Qe("comfort-band-history-chart")
], Dt);
function Al(e, t) {
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
var md = Object.defineProperty, gd = Object.getOwnPropertyDescriptor, Zo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? gd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && md(t, i, r), r;
};
let Vn = class extends ze {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return w`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = Vl(this.hass, e), n = t ?? "", r = t && i ? i : "";
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
    return e ? t ? G : w`<div class="hint">
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
  I({ attribute: !1 })
], Vn.prototype, "hass", 2);
Zo([
  I({ attribute: !1 })
], Vn.prototype, "entities", 2);
Vn = Zo([
  Qe("comfort-band-insights-tab")
], Vn);
var bd = Object.defineProperty, vd = Object.getOwnPropertyDescriptor, Ma = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? vd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && bd(t, i, r), r;
};
const lr = 14, ar = 28, on = 600, cr = 200, uo = [0, 6, 12, 18, 24], El = [14, 18, 22, 26];
function Pi(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function _d(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let _r = class extends ze {
  constructor() {
    super(...arguments), this.transitions = [];
  }
  _timeToX(e) {
    return e / (24 * 60) * on;
  }
  _tempToY(e) {
    const t = _d(e, lr, ar);
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
    const e = [...this.transitions].sort((h, d) => Pi(h.at) - Pi(d.at)), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], r = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return w`
      <div class="chart">
        <svg
          viewBox="0 0 ${on} ${cr}"
          preserveAspectRatio="none"
          role="img"
          aria-label="Schedule visualization for the active profile"
        >
          <title>Schedule visualization for the active profile</title>
          ${El.map(
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
      const d = this._timeToX(Pi(h.at));
      return ci`
              <circle class="marker low" cx=${d} cy=${this._tempToY(h.low)} r="5"></circle>
              <circle class="marker high" cx=${d} cy=${this._tempToY(h.high)} r="5"></circle>
            `;
    })}
        </svg>
        ${El.map(
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
Ma([
  I({ type: Array })
], _r.prototype, "transitions", 2);
_r = Ma([
  Qe("comfort-band-schedule-chart")
], _r);
var yd = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, di = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? wd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && yd(t, i, r), r;
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
  re()
], Bt.prototype, "_at", 2);
di([
  re()
], Bt.prototype, "_low", 2);
di([
  re()
], Bt.prototype, "_high", 2);
di([
  re()
], Bt.prototype, "_error", 2);
di([
  gn('input[name="at"]')
], Bt.prototype, "_atInput", 2);
Bt = di([
  Qe("transition-edit-dialog")
], Bt);
var xd = Object.defineProperty, $d = Object.getOwnPropertyDescriptor, Mt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? $d(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && xd(t, i, r), r;
};
function Cl(e, t) {
  return Pi(e.at) - Pi(t.at);
}
const ho = 15, fo = 24 * 60;
function kd(e) {
  if (e.length === 0) return "06:00";
  const t = new Set(e.map((n) => Pi(n.at))), i = Math.max(...t);
  for (let n = 1; n <= fo / ho; n++) {
    const r = (i + n * ho) % fo;
    if (!t.has(r)) return Tl(r);
  }
  return Tl((i + ho) % fo);
}
function Tl(e) {
  const t = Math.floor(e / 60), i = e % 60;
  return `${t.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
let ut = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._confirmingDeleteAt = null, this._focusTrigger = null, this._subscribeGen = 0, this._onAddClicked = () => {
      this._focusTrigger = { kind: "add" }, this._newAt = kd(this._transitions), this._newLow = Dl(this._transitions), this._newHigh = Ml(this._transitions), this._editing = null, this._mode = "add";
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
      i.sort(Cl), await this._writeSchedule(i), this._exitDialogMode();
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._exitDialogMode();
    }, this._onDialogCancel = () => {
      this._exitDialogMode();
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = Pl(this.hass) ?? "home", this._subscribe()), e.has("_transitions") && this._confirmingDeleteAt !== null && !this._transitions.some((t) => t.at === this._confirmingDeleteAt) && (this._confirmingDeleteAt = null);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Pl(this.hass);
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
      const t = await Ic(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(Cl) : [], this._loading = !1);
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
      await Bc(this.hass, {
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
        low: this._newLow ?? Dl(this._transitions),
        high: this._newHigh ?? Ml(this._transitions)
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
  I({ attribute: !1 })
], ut.prototype, "hass", 2);
Mt([
  I({ type: String })
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
function Pl(e) {
  const t = jl(e);
  return t ? e.states[t]?.state ?? null : null;
}
function Dl(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function Ml(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var Sd = Object.defineProperty, Ad = Object.getOwnPropertyDescriptor, wn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ad(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Sd(t, i, r), r;
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
    if (!this.hass || !this.entities) return G;
    const e = this.entities.useApparentTemperature, t = this.entities.learningEnabled;
    if (e === null || t === null)
      return w`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const i = Vl(this.hass, this.entities.roomTemperature);
    return w`
      ${this._error ? w`<div class="error" role="alert">${this._error}</div>` : G}
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
      // plain on/off at the deadband edges. Samples are recorded either way.
      desc: w`Uses what this room has learned about how quickly it warms and cools to time
        heating and cooling: starting early rather than waiting for the room to get too cold or
        warm, stopping early so it doesn't overshoot, and holding off while it's already heading
        back on its own. Predictive control (the “MPC enabled” switch) needs this on too. While it's
        off, the room keeps recording readings; it just doesn't act on what it has learned.`
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
  I({ attribute: !1 })
], hi.prototype, "hass", 2);
wn([
  I({ type: String })
], hi.prototype, "zone", 2);
wn([
  I({ attribute: !1 })
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
var Ed = Object.defineProperty, Cd = Object.getOwnPropertyDescriptor, fi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Cd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Ed(t, i, r), r;
};
const Si = [
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
      const t = Si.findIndex((r) => r.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + Si.length) % Si.length;
          break;
        case "ArrowRight":
          i = (t + 1) % Si.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Si.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = Si[i].id;
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
    return w`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Si.map(
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
Ut.styles = [
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
  re()
], Ut.prototype, "_activeTab", 2);
fi([
  re()
], Ut.prototype, "_isOpen", 2);
fi([
  gn("dialog")
], Ut.prototype, "_dialog", 2);
Ut = fi([
  Qe("comfort-band-modal")
], Ut);
var Td = Object.defineProperty, Pd = Object.getOwnPropertyDescriptor, Jo = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Pd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Td(t, i, r), r;
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
    const e = Ul(this.hass, this.config.zone);
    return Wl(this.hass, { zone: this.config.zone }, e);
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
  I({ attribute: !1 })
], Wn.prototype, "hass", 2);
Jo([
  I({ attribute: !1 })
], Wn.prototype, "config", 2);
Wn = Jo([
  Qe("comfort-band-card-editor")
], Wn);
var Dd = Object.defineProperty, Md = Object.getOwnPropertyDescriptor, Dr = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Md(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Dd(t, i, r), r;
};
let mn = class extends ze {
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
    const e = this._config.zone, t = Ul(this.hass, e);
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
      zoneName: Wl(e, this._config, t),
      low: n(t.effectiveLow),
      high: n(t.effectiveHigh),
      roomTemp: n(t.roomTemperature),
      action: i(t.currentAction)?.state ?? "unknown",
      overrideActive: i(t.overrideActive)?.state === "on",
      overrideEnds: i(t.overrideEnds)?.state ?? null
    };
  }
};
mn.styles = [
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
], mn.prototype, "hass", 2);
Dr([
  re()
], mn.prototype, "_config", 2);
Dr([
  gn("comfort-band-modal")
], mn.prototype, "_modal", 2);
mn = Dr([
  Qe("comfort-band-card")
], mn);
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
