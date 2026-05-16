const qn = globalThis, ro = qn.ShadowRoot && (qn.ShadyCSS === void 0 || qn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lo = Symbol(), ar = /* @__PURE__ */ new WeakMap();
let cl = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== lo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ro && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = ar.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ar.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ul = (t) => new cl(typeof t == "string" ? t : t + "", void 0, lo), te = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new cl(n, t, lo);
}, Fa = (t, e) => {
  if (ro) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = qn.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, cr = ro ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return ul(n);
})(t) : t;
const { is: Ua, defineProperty: Va, getOwnPropertyDescriptor: Ia, getOwnPropertyNames: ja, getOwnPropertySymbols: Ba, getPrototypeOf: Wa } = Object, ss = globalThis, ur = ss.trustedTypes, Ga = ur ? ur.emptyScript : "", Ya = ss.reactiveElementPolyfillSupport, $n = (t, e) => t, Jn = { toAttribute(t, e) {
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
} }, ao = (t, e) => !Ua(t, e), fr = { attribute: !0, type: String, converter: Jn, reflect: !1, useDefault: !1, hasChanged: ao };
Symbol.metadata ??= Symbol("metadata"), ss.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ki = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = fr) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && Va(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: r } = Ia(this.prototype, e) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: s, set(a) {
      const f = s?.call(this);
      r?.call(this, a), this.requestUpdate(e, f, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fr;
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
      for (const s of i) this.createProperty(s, n[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) n.unshift(cr(s));
    } else e !== void 0 && n.push(cr(e));
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
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Jn).toAttribute(n, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Jn;
      this._$Em = s;
      const f = a.fromAttribute(n, r.type);
      this[s] = f ?? this._$Ej?.get(s) ?? f, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? ao)(r, n) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? n ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: a } = r, f = this[s];
        a !== !0 || this._$AL.has(s) || f === void 0 || this.C(s, void 0, r, f);
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
Ki.elementStyles = [], Ki.shadowRootOptions = { mode: "open" }, Ki[$n("elementProperties")] = /* @__PURE__ */ new Map(), Ki[$n("finalized")] = /* @__PURE__ */ new Map(), Ya?.({ ReactiveElement: Ki }), (ss.reactiveElementVersions ??= []).push("2.1.2");
const co = globalThis, hr = (t) => t, Qn = co.trustedTypes, dr = Qn ? Qn.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, fl = "$lit$", ni = `lit$${Math.random().toFixed(9).slice(2)}$`, hl = "?" + ni, Ka = `<${hl}>`, Si = document, En = () => Si.createComment(""), kn = (t) => t === null || typeof t != "object" && typeof t != "function", uo = Array.isArray, qa = (t) => uo(t) || typeof t?.[Symbol.iterator] == "function", Fs = `[ 	
\f\r]`, bn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pr = /-->/g, mr = />/g, vi = RegExp(`>|${Fs}(?:([^\\s"'>=/]+)(${Fs}*=${Fs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gr = /'/g, br = /"/g, dl = /^(?:script|style|textarea|title)$/i, pl = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), F = pl(1), Wn = pl(2), Ji = Symbol.for("lit-noChange"), at = Symbol.for("lit-nothing"), vr = /* @__PURE__ */ new WeakMap(), xi = Si.createTreeWalker(Si, 129);
function ml(t, e) {
  if (!uo(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dr !== void 0 ? dr.createHTML(e) : e;
}
const Za = (t, e) => {
  const n = t.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = bn;
  for (let f = 0; f < n; f++) {
    const h = t[f];
    let p, v, m = -1, b = 0;
    for (; b < h.length && (a.lastIndex = b, v = a.exec(h), v !== null); ) b = a.lastIndex, a === bn ? v[1] === "!--" ? a = pr : v[1] !== void 0 ? a = mr : v[2] !== void 0 ? (dl.test(v[2]) && (s = RegExp("</" + v[2], "g")), a = vi) : v[3] !== void 0 && (a = vi) : a === vi ? v[0] === ">" ? (a = s ?? bn, m = -1) : v[1] === void 0 ? m = -2 : (m = a.lastIndex - v[2].length, p = v[1], a = v[3] === void 0 ? vi : v[3] === '"' ? br : gr) : a === br || a === gr ? a = vi : a === pr || a === mr ? a = bn : (a = vi, s = void 0);
    const E = a === vi && t[f + 1].startsWith("/>") ? " " : "";
    r += a === bn ? h + Ka : m >= 0 ? (i.push(p), h.slice(0, m) + fl + h.slice(m) + ni + E) : h + ni + (m === -2 ? f : E);
  }
  return [ml(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Pn {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const f = e.length - 1, h = this.parts, [p, v] = Za(e, n);
    if (this.el = Pn.createElement(p, i), xi.currentNode = this.el.content, n === 2 || n === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = xi.nextNode()) !== null && h.length < f; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(fl)) {
          const b = v[a++], E = s.getAttribute(m).split(ni), P = /([.?@])?(.*)/.exec(b);
          h.push({ type: 1, index: r, name: P[2], strings: E, ctor: P[1] === "." ? Qa : P[1] === "?" ? Xa : P[1] === "@" ? tc : os }), s.removeAttribute(m);
        } else m.startsWith(ni) && (h.push({ type: 6, index: r }), s.removeAttribute(m));
        if (dl.test(s.tagName)) {
          const m = s.textContent.split(ni), b = m.length - 1;
          if (b > 0) {
            s.textContent = Qn ? Qn.emptyScript : "";
            for (let E = 0; E < b; E++) s.append(m[E], En()), xi.nextNode(), h.push({ type: 2, index: ++r });
            s.append(m[b], En());
          }
        }
      } else if (s.nodeType === 8) if (s.data === hl) h.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(ni, m + 1)) !== -1; ) h.push({ type: 7, index: r }), m += ni.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const i = Si.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Qi(t, e, n = t, i) {
  if (e === Ji) return e;
  let s = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const r = kn(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = s : n._$Cl = s), s !== void 0 && (e = Qi(t, s._$AS(t, e.values), s, i)), e;
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
    const { el: { content: n }, parts: i } = this._$AD, s = (e?.creationScope ?? Si).importNode(n, !0);
    xi.currentNode = s;
    let r = xi.nextNode(), a = 0, f = 0, h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let p;
        h.type === 2 ? p = new zn(r, r.nextSibling, this, e) : h.type === 1 ? p = new h.ctor(r, h.name, h.strings, this, e) : h.type === 6 && (p = new ec(r, this, e)), this._$AV.push(p), h = i[++f];
      }
      a !== h?.index && (r = xi.nextNode(), a++);
    }
    return xi.currentNode = Si, s;
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
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = at, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Pn.createElement(ml(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const r = new Ja(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = vr.get(e.strings);
    return n === void 0 && vr.set(e.strings, n = new Pn(e)), n;
  }
  k(e) {
    uo(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const r of e) s === n.length ? n.push(i = new zn(this.O(En()), this.O(En()), this, this.options)) : i = n[s], i._$AI(r), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = hr(e).nextSibling;
      hr(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class os {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, r) {
    this.type = 1, this._$AH = at, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = at;
  }
  _$AI(e, n = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = Qi(this, e, n, 0), a = !kn(e) || e !== this._$AH && e !== Ji, a && (this._$AH = e);
    else {
      const f = e;
      let h, p;
      for (e = r[0], h = 0; h < r.length - 1; h++) p = Qi(this, f[i + h], n, h), p === Ji && (p = this._$AH[h]), a ||= !kn(p) || p !== this._$AH[h], p === at ? e = at : e !== at && (e += (p ?? "") + r[h + 1]), this._$AH[h] = p;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === at ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qa extends os {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === at ? void 0 : e;
  }
}
class Xa extends os {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== at);
  }
}
class tc extends os {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Qi(this, e, n, 0) ?? at) === Ji) return;
    const i = this._$AH, s = e === at && i !== at || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== at && (i === at || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
const ic = co.litHtmlPolyfillSupport;
ic?.(Pn, zn), (co.litHtmlVersions ??= []).push("3.3.2");
const nc = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = n?.renderBefore ?? null;
    i._$litPart$ = s = new zn(e.insertBefore(En(), r), r, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
const fo = globalThis;
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
It._$litElement$ = !0, It.finalized = !0, fo.litElementHydrateSupport?.({ LitElement: It });
const sc = fo.litElementPolyfillSupport;
sc?.({ LitElement: It });
(fo.litElementVersions ??= []).push("4.2.2");
const ae = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const oc = { attribute: !0, type: String, converter: Jn, reflect: !1, hasChanged: ao }, rc = (t = oc, e, n) => {
  const { kind: i, metadata: s } = n;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(n.name, t), i === "accessor") {
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
function Y(t) {
  return (e, n) => typeof n == "object" ? rc(t, e, n) : ((i, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, n);
}
function Pt(t) {
  return Y({ ...t, state: !0, attribute: !1 });
}
const lc = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function Dn(t, e) {
  return (n, i, s) => {
    const r = (a) => a.renderRoot?.querySelector(t) ?? null;
    return lc(n, i, { get() {
      return r(this);
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
function ho(t) {
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
function po(t) {
  return t === "heating" || t === "cooling" || t === "idle" ? t : "unknown";
}
function gl(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var ac = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, On = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? cc(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && ac(e, n, s), s;
};
const qs = 15, bl = 28, uc = bl - qs;
function Us(t) {
  return Number.isNaN(t) || !Number.isFinite(t) ? 0 : (Math.max(qs, Math.min(bl, t)) - qs) / uc * 100;
}
let Ai = class extends It {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const t = po(this.action), e = ho(t), n = Number.isFinite(this.low), i = Number.isFinite(this.high), s = Number.isFinite(this.room), r = n ? Us(this.low) : 0, a = i ? Us(this.high) : 100, f = Math.min(r, a), h = Math.max(0, Math.abs(a - r)), p = s ? Us(this.room) : 50, v = (b) => Number.isFinite(b) ? `${b.toFixed(1)}°` : "—", m = `Comfort band gauge: low ${v(this.low)}, room ${v(this.room)}, high ${v(this.high)}, action ${t}`;
    return F`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${m}>
        ${Wn`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${n && i ? Wn`<rect class="band" x=${f} y="9" width=${h} height="6" rx="3" fill=${e}></rect>` : null}
        ${s ? Wn`<circle cx=${p} cy="12" r="4.5" fill=${e}></circle>` : null}
        ${s ? Wn`<circle class="marker-ring" cx=${p} cy="12" r="3" stroke=${e}></circle>` : null}
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
  Y({ type: Number })
], Ai.prototype, "low", 2);
On([
  Y({ type: Number })
], Ai.prototype, "high", 2);
On([
  Y({ type: Number })
], Ai.prototype, "room", 2);
On([
  Y({ type: String })
], Ai.prototype, "action", 2);
Ai = On([
  ae("band-gauge")
], Ai);
var fc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, Ke = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? hc(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && fc(e, n, s), s;
};
let Te = class extends It {
  constructor() {
    super(...arguments), this.zoneName = "", this.roomTemp = NaN, this.low = NaN, this.high = NaN, this.action = "unknown", this.overrideActive = !1, this.overrideEnds = null, this.noExpand = !1;
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
    const t = po(this.action);
    if (t === "idle" || t === "unknown") return null;
    const e = ho(t);
    return F`<span class="action-chip" style="background:${e}">
      ${gl(t)}
    </span>`;
  }
  render() {
    return F`
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
};
Te.styles = [
  ce,
  te`
      :host {
        display: block;
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
Ke([
  Y({ type: String })
], Te.prototype, "zoneName", 2);
Ke([
  Y({ type: Number })
], Te.prototype, "roomTemp", 2);
Ke([
  Y({ type: Number })
], Te.prototype, "low", 2);
Ke([
  Y({ type: Number })
], Te.prototype, "high", 2);
Ke([
  Y({ type: String })
], Te.prototype, "action", 2);
Ke([
  Y({ type: Boolean })
], Te.prototype, "overrideActive", 2);
Ke([
  Y({ type: String })
], Te.prototype, "overrideEnds", 2);
Ke([
  Y({ type: Boolean })
], Te.prototype, "noExpand", 2);
Te = Ke([
  ae("comfort-band-tile")
], Te);
function dc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const n = e - Date.now();
  if (n <= 0) return "";
  const i = Math.round(n / 6e4);
  if (i < 60) return `${i}m left`;
  const s = Math.floor(i / 60), r = i % 60;
  return r ? `${s}h ${r}m left` : `${s}h left`;
}
var pc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, qe = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? mc(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && pc(e, n, s), s;
};
let Ce = class extends It {
  constructor() {
    super(...arguments), this.min = 16, this.max = 26, this.step = 0.5, this.low = 19, this.high = 22, this.unit = "°", this._dragging = null, this._onThumbPointerDown = (t, e) => {
      t.preventDefault();
      const n = t.currentTarget;
      n.setPointerCapture(t.pointerId), this._dragging = e;
      const i = (r) => {
        this._setHandle(e, this._xToValue(r.clientX)) && this._fire("input");
      }, s = (r) => {
        n.releasePointerCapture(r.pointerId), n.removeEventListener("pointermove", i), n.removeEventListener("pointerup", s), n.removeEventListener("pointercancel", s), this._dragging = null, this._fire("change");
      };
      n.addEventListener("pointermove", i), n.addEventListener("pointerup", s), n.addEventListener("pointercancel", s);
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
  Y({ type: Number })
], Ce.prototype, "min", 2);
qe([
  Y({ type: Number })
], Ce.prototype, "max", 2);
qe([
  Y({ type: Number })
], Ce.prototype, "step", 2);
qe([
  Y({ type: Number })
], Ce.prototype, "low", 2);
qe([
  Y({ type: Number })
], Ce.prototype, "high", 2);
qe([
  Y({ type: String })
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
const rs = "comfort_band";
function gc(t, e, n) {
  return t.connection.subscribeMessage(
    (i) => n(i.schedule),
    { type: "comfort_band/subscribe_schedule", ...e }
  );
}
function bc(t, e) {
  return t.callService(rs, "set_schedule", { ...e });
}
function vc(t, e) {
  const n = { zone: e.zone };
  return e.low !== void 0 && (n.low = e.low), e.high !== void 0 && (n.high = e.high), e.hours !== void 0 && (n.hours = e.hours), t.callService(rs, "start_override", n);
}
function _c(t, e) {
  return t.callService(rs, "cancel_override", { ...e });
}
function yc(t, e) {
  return t.callService(rs, "set_profile", { ...e });
}
var wc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, on = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? xc(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && wc(e, n, s), s;
};
const $c = [1, 3, 6];
let si = class extends It {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (t) => {
      this._pendingLow = t.detail.low, this._pendingHigh = t.detail.high;
    }, this._onSliderChange = (t) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, vc(this.hass, {
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
    const t = this._numericState(this.entities.manualLow), e = this._numericState(this.entities.manualHigh), n = this._numericState(this.entities.effectiveLow), i = this._numericState(this.entities.effectiveHigh), s = this._numericState(this.entities.roomTemperature), r = this._numericState(this.entities.overrideHours), a = this._stateOf(this.entities.currentAction)?.state ?? "unknown", f = this._stateOf(this.entities.overrideActive)?.state === "on", h = this._pendingLow ?? (Number.isFinite(t) ? t : 19), p = this._pendingHigh ?? (Number.isFinite(e) ? e : 22), v = po(a), m = v !== "idle" && v !== "unknown";
    return F`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(s) ? `${s.toFixed(1)}°` : "—"}</div>
        ${m ? F`<span class="action-chip" style="background:${ho(v)}"
              >${gl(v)}</span
            >` : at}
      </div>
      <div class="gauge-row">
        <band-gauge .low=${n} .high=${i} .room=${s} .action=${a}></band-gauge>
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

      ${this._renderOverrideSection(f)} ${this._renderHoursSection(r)}
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
si.styles = [
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
on([
  Y({ attribute: !1 })
], si.prototype, "hass", 2);
on([
  Y({ type: String })
], si.prototype, "zone", 2);
on([
  Y({ attribute: !1 })
], si.prototype, "entities", 2);
on([
  Pt()
], si.prototype, "_pendingLow", 2);
on([
  Pt()
], si.prototype, "_pendingHigh", 2);
si = on([
  ae("comfort-band-now-tab")
], si);
function Sc(t) {
  if (!t) return "";
  const e = Date.parse(t);
  if (Number.isNaN(e)) return "";
  const n = e - Date.now();
  if (n <= 0) return "";
  const i = Math.round(n / 6e4);
  if (i < 60) return `${i}m left`;
  const s = Math.floor(i / 60), r = i % 60;
  return r ? `${s}h ${r}m left` : `${s}h left`;
}
const mo = "comfort_band", Ac = {
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
function vl(t, e) {
  for (const n of Object.values(t.devices))
    for (const [i, s] of n.identifiers)
      if (i === e[0] && s === e[1])
        return n;
  return null;
}
function _l(t, e) {
  return Object.values(t.entities).filter(
    (n) => n.device_id === e && n.platform === mo
  );
}
function kc(t, e) {
  const n = Ec(), i = vl(t, [mo, `zone:${e}`]);
  if (i === null) return n;
  n.deviceId = i.id, n.deviceName = i.name_by_user ?? i.name;
  for (const s of _l(t, i.id)) {
    const r = s.translation_key;
    if (r === null) continue;
    const a = Ac[r];
    a !== void 0 && (n[a] = s.entity_id);
  }
  return n;
}
function yl(t) {
  const e = vl(t, [mo, "profile_manager"]);
  if (e === null) return null;
  for (const n of _l(t, e.id))
    if (n.translation_key === "active_profile")
      return n.entity_id;
  return null;
}
var Pc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, wl = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Tc(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Pc(e, n, s), s;
};
let Xn = class extends It {
  _onSelect(t) {
    this.hass && yc(this.hass, { profile: t });
  }
  render() {
    if (!this.hass) return at;
    const t = yl(this.hass);
    if (t === null)
      return F`<div class="empty">Profile manager not registered yet.</div>`;
    const e = this.hass.states[t], n = e?.attributes.options, i = Array.isArray(n) ? n.filter((r) => typeof r == "string") : [], s = e?.state ?? "";
    return i.length === 0 ? F`<div class="empty">No profiles configured.</div>` : F`
      <ul role="listbox" aria-label="Profiles">
        ${i.map(
      (r) => F`
            <li
              role="option"
              tabindex="0"
              class=${r === s ? "active" : ""}
              aria-selected=${r === s}
              @click=${() => this._onSelect(r)}
              @keydown=${(a) => {
        (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this._onSelect(r));
      }}
            >
              <span class="name">${r}</span>
              ${r === s ? F`<span class="badge">Active</span>` : at}
            </li>
          `
    )}
      </ul>
      <div class="footer">Create / rename / delete profiles in a future release.</div>
    `;
  }
};
Xn.styles = [
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
  Y({ attribute: !1 })
], Xn.prototype, "hass", 2);
Xn = wl([
  ae("comfort-band-profiles-tab")
], Xn);
const Cc = !0, Dt = "u-", Mc = "uplot", zc = Dt + "hz", Dc = Dt + "vt", Oc = Dt + "title", Nc = Dt + "wrap", Lc = Dt + "under", Hc = Dt + "over", Rc = Dt + "axis", wi = Dt + "off", Fc = Dt + "select", Uc = Dt + "cursor-x", Vc = Dt + "cursor-y", Ic = Dt + "cursor-pt", jc = Dt + "legend", Bc = Dt + "live", Wc = Dt + "inline", Gc = Dt + "series", Yc = Dt + "marker", _r = Dt + "label", Kc = Dt + "value", yn = "width", wn = "height", vn = "top", yr = "bottom", Yi = "left", Vs = "right", go = "#000", wr = go + "0", Is = "mousemove", xr = "mousedown", js = "mouseup", $r = "mouseenter", Sr = "mouseleave", Ar = "dblclick", qc = "resize", Zc = "scroll", Er = "change", ts = "dppxchange", bo = "--", rn = typeof window < "u", Zs = rn ? document : null, Zi = rn ? window : null, Jc = rn ? navigator : null;
let lt, Gn;
function Js() {
  let t = devicePixelRatio;
  lt != t && (lt = t, Gn && Xs(Er, Gn, Js), Gn = matchMedia(`(min-resolution: ${lt - 1e-3}dppx) and (max-resolution: ${lt + 1e-3}dppx)`), $i(Er, Gn, Js), Zi.dispatchEvent(new CustomEvent(ts)));
}
function re(t, e) {
  if (e != null) {
    let n = t.classList;
    !n.contains(e) && n.add(e);
  }
}
function Qs(t, e) {
  let n = t.classList;
  n.contains(e) && n.remove(e);
}
function _t(t, e, n) {
  t.style[e] = n + "px";
}
function Ee(t, e, n, i) {
  let s = Zs.createElement(t);
  return e != null && re(s, e), n?.insertBefore(s, i), s;
}
function be(t, e) {
  return Ee("div", t, e);
}
const kr = /* @__PURE__ */ new WeakMap();
function Re(t, e, n, i, s) {
  let r = "translate(" + e + "px," + n + "px)", a = kr.get(t);
  r != a && (t.style.transform = r, kr.set(t, r), e < 0 || n < 0 || e > i || n > s ? re(t, wi) : Qs(t, wi));
}
const Pr = /* @__PURE__ */ new WeakMap();
function Tr(t, e, n) {
  let i = e + n, s = Pr.get(t);
  i != s && (Pr.set(t, i), t.style.background = e, t.style.borderColor = n);
}
const Cr = /* @__PURE__ */ new WeakMap();
function Mr(t, e, n, i) {
  let s = e + "" + n, r = Cr.get(t);
  s != r && (Cr.set(t, s), t.style.height = n + "px", t.style.width = e + "px", t.style.marginLeft = i ? -e / 2 + "px" : 0, t.style.marginTop = i ? -n / 2 + "px" : 0);
}
const vo = { passive: !0 }, Qc = { ...vo, capture: !0 };
function $i(t, e, n, i) {
  e.addEventListener(t, n, i ? Qc : vo);
}
function Xs(t, e, n, i) {
  e.removeEventListener(t, n, vo);
}
rn && Js();
function ke(t, e, n, i) {
  let s;
  n = n || 0, i = i || e.length - 1;
  let r = i <= 2147483647;
  for (; i - n > 1; )
    s = r ? n + i >> 1 : le((n + i) / 2), e[s] < t ? n = s : i = s;
  return t - e[n] <= e[i] - t ? n : i;
}
function xl(t) {
  return (n, i, s) => {
    let r = -1, a = -1;
    for (let f = i; f <= s; f++)
      if (t(n[f])) {
        r = f;
        break;
      }
    for (let f = s; f >= i; f--)
      if (t(n[f])) {
        a = f;
        break;
      }
    return [r, a];
  };
}
const $l = (t) => t != null, Sl = (t) => t != null && t > 0, ls = xl($l), Xc = xl(Sl);
function tu(t, e, n, i = 0, s = !1) {
  let r = s ? Xc : ls, a = s ? Sl : $l;
  [e, n] = r(t, e, n);
  let f = t[e], h = t[e];
  if (e > -1)
    if (i == 1)
      f = t[e], h = t[n];
    else if (i == -1)
      f = t[n], h = t[e];
    else
      for (let p = e; p <= n; p++) {
        let v = t[p];
        a(v) && (v < f ? f = v : v > h && (h = v));
      }
  return [f ?? dt, h ?? -dt];
}
function as(t, e, n, i) {
  let s = Or(t), r = Or(e);
  t == e && (s == -1 ? (t *= n, e /= n) : (t /= n, e *= n));
  let a = n == 10 ? Ge : Al, f = s == 1 ? le : ve, h = r == 1 ? ve : le, p = f(a(zt(t))), v = h(a(zt(e))), m = Xi(n, p), b = Xi(n, v);
  return n == 10 && (p < 0 && (m = pt(m, -p)), v < 0 && (b = pt(b, -v))), i || n == 2 ? (t = m * s, e = b * r) : (t = Tl(t, m), e = cs(e, b)), [t, e];
}
function _o(t, e, n, i) {
  let s = as(t, e, n, i);
  return t == 0 && (s[0] = 0), e == 0 && (s[1] = 0), s;
}
const yo = 0.1, zr = {
  mode: 3,
  pad: yo
}, Sn = {
  pad: 0,
  soft: null,
  mode: 0
}, eu = {
  min: Sn,
  max: Sn
};
function es(t, e, n, i) {
  return us(n) ? Dr(t, e, n) : (Sn.pad = n, Sn.soft = i ? 0 : null, Sn.mode = i ? 3 : 0, Dr(t, e, eu));
}
function ot(t, e) {
  return t ?? e;
}
function iu(t, e, n) {
  for (e = ot(e, 0), n = ot(n, t.length - 1); e <= n; ) {
    if (t[e] != null)
      return !0;
    e++;
  }
  return !1;
}
function Dr(t, e, n) {
  let i = n.min, s = n.max, r = ot(i.pad, 0), a = ot(s.pad, 0), f = ot(i.hard, -dt), h = ot(s.hard, dt), p = ot(i.soft, dt), v = ot(s.soft, -dt), m = ot(i.mode, 0), b = ot(s.mode, 0), E = e - t, P = Ge(E), H = Zt(zt(t), zt(e)), U = Ge(H), I = zt(U - P);
  (E < 1e-24 || I > 10) && (E = 0, (t == 0 || e == 0) && (E = 1e-24, m == 2 && p != dt && (r = 0), b == 2 && v != -dt && (a = 0)));
  let x = E || H || 1e3, R = Ge(x), $ = Xi(10, le(R)), Z = x * (E == 0 ? t == 0 ? 0.1 : 1 : r), M = pt(Tl(t - Z, $ / 10), 24), J = t >= p && (m == 1 || m == 3 && M <= p || m == 2 && M >= p) ? p : dt, G = Zt(f, M < J && t >= J ? J : Pe(J, M)), tt = x * (E == 0 ? e == 0 ? 0.1 : 1 : a), W = pt(cs(e + tt, $ / 10), 24), S = e <= v && (b == 1 || b == 3 && W >= v || b == 2 && W <= v) ? v : -dt, q = Pe(h, W > S && e <= S ? S : Zt(S, W));
  return G == q && G == 0 && (q = 100), [G, q];
}
const nu = new Intl.NumberFormat(rn ? Jc.language : "en-US"), wo = (t) => nu.format(t), ue = Math, Zn = ue.PI, zt = ue.abs, le = ue.floor, Mt = ue.round, ve = ue.ceil, Pe = ue.min, Zt = ue.max, Xi = ue.pow, Or = ue.sign, Ge = ue.log10, Al = ue.log2, su = (t, e = 1) => ue.sinh(t) * e, Bs = (t, e = 1) => ue.asinh(t / e), dt = 1 / 0;
function Nr(t) {
  return (Ge((t ^ t >> 31) - (t >> 31)) | 0) + 1;
}
function to(t, e, n) {
  return Pe(Zt(t, e), n);
}
function El(t) {
  return typeof t == "function";
}
function et(t) {
  return El(t) ? t : () => t;
}
const ou = () => {
}, kl = (t) => t, Pl = (t, e) => e, ru = (t) => null, Lr = (t) => !0, Hr = (t, e) => t == e, lu = /\.\d*?(?=9{6,}|0{6,})/gm, Ei = (t) => {
  if (Ml(t) || oi.has(t))
    return t;
  const e = `${t}`, n = e.match(lu);
  if (n == null)
    return t;
  let i = n[0].length - 1;
  if (e.indexOf("e-") != -1) {
    let [s, r] = e.split("e");
    return +`${Ei(s)}e${r}`;
  }
  return pt(t, i);
};
function _i(t, e) {
  return Ei(pt(Ei(t / e)) * e);
}
function cs(t, e) {
  return Ei(ve(Ei(t / e)) * e);
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
const oi = /* @__PURE__ */ new Map();
function Cl(t) {
  return (("" + t).split(".")[1] || "").length;
}
function Tn(t, e, n, i) {
  let s = [], r = i.map(Cl);
  for (let a = e; a < n; a++) {
    let f = zt(a), h = pt(Xi(t, a), f);
    for (let p = 0; p < i.length; p++) {
      let v = t == 10 ? +`${i[p]}e${a}` : i[p] * h, m = (a >= 0 ? 0 : f) + (a >= r[p] ? 0 : r[p]), b = t == 10 ? v : pt(v, m);
      s.push(b), oi.set(b, m);
    }
  }
  return s;
}
const An = {}, xo = [], tn = [null, null], ii = Array.isArray, Ml = Number.isInteger, au = (t) => t === void 0;
function Rr(t) {
  return typeof t == "string";
}
function us(t) {
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
function en(t, e = us) {
  let n;
  if (ii(t)) {
    let i = t.find((s) => s != null);
    if (ii(i) || e(i)) {
      n = Array(t.length);
      for (let s = 0; s < t.length; s++)
        n[s] = en(t[s], e);
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
    for (let s in i)
      s != zl && (us(t[s]) ? kt(t[s], en(i[s])) : t[s] = en(i[s]));
  }
  return t;
}
const fu = 0, hu = 1, du = 2;
function pu(t, e, n) {
  for (let i = 0, s, r = -1; i < e.length; i++) {
    let a = e[i];
    if (a > r) {
      for (s = a - 1; s >= 0 && t[s] == null; )
        t[s--] = null;
      for (s = a + 1; s < n && t[s] == null; )
        t[r = s++] = null;
    }
  }
}
function mu(t, e) {
  if (vu(t)) {
    let a = t[0].slice();
    for (let f = 1; f < t.length; f++)
      a.push(...t[f].slice(1));
    return _u(a[0]) || (a = bu(a)), a;
  }
  let n = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length; a++) {
    let h = t[a][0], p = h.length;
    for (let v = 0; v < p; v++)
      n.add(h[v]);
  }
  let i = [Array.from(n).sort((a, f) => a - f)], s = i[0].length, r = /* @__PURE__ */ new Map();
  for (let a = 0; a < s; a++)
    r.set(i[0][a], a);
  for (let a = 0; a < t.length; a++) {
    let f = t[a], h = f[0];
    for (let p = 1; p < f.length; p++) {
      let v = f[p], m = Array(s).fill(void 0), b = e ? e[a][p] : hu, E = [];
      for (let P = 0; P < v.length; P++) {
        let H = v[P], U = r.get(h[P]);
        H === null ? b != fu && (m[U] = H, b == du && E.push(U)) : m[U] = H;
      }
      pu(m, E, s), i.push(m);
    }
  }
  return i;
}
const gu = typeof queueMicrotask > "u" ? (t) => Promise.resolve().then(t) : queueMicrotask;
function bu(t) {
  let e = t[0], n = e.length, i = Array(n);
  for (let r = 0; r < i.length; r++)
    i[r] = r;
  i.sort((r, a) => e[r] - e[a]);
  let s = [];
  for (let r = 0; r < t.length; r++) {
    let a = t[r], f = Array(n);
    for (let h = 0; h < n; h++)
      f[h] = a[i[h]];
    s.push(f);
  }
  return s;
}
function vu(t) {
  let e = t[0][0], n = e.length;
  for (let i = 1; i < t.length; i++) {
    let s = t[i][0];
    if (s.length != n)
      return !1;
    if (s != e) {
      for (let r = 0; r < n; r++)
        if (s[r] != e[r])
          return !1;
    }
  }
  return !0;
}
function _u(t, e = 100) {
  const n = t.length;
  if (n <= 1)
    return !0;
  let i = 0, s = n - 1;
  for (; i <= s && t[i] == null; )
    i++;
  for (; s >= i && t[s] == null; )
    s--;
  if (s <= i)
    return !0;
  const r = Zt(1, le((s - i + 1) / e));
  for (let a = t[i], f = i + r; f <= s; f += r) {
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
function $o(t, e) {
  e = e || xu;
  let n = [], i = /\{([a-z]+)\}|[^{]+/gi, s;
  for (; s = i.exec(t); )
    n.push(s[0][0] == "{" ? Su[s[1]] : s[0]);
  return (r) => {
    let a = "";
    for (let f = 0; f < n.length; f++)
      a += typeof n[f] == "string" ? n[f] : n[f](r, e);
    return a;
  };
}
const Au = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function Eu(t, e) {
  let n;
  return e == "UTC" || e == "Etc/UTC" ? n = new Date(+t + t.getTimezoneOffset() * 6e4) : e == Au ? n = t : (n = new Date(t.toLocaleString("en-US", { timeZone: e })), n.setMilliseconds(t.getMilliseconds())), n;
}
const Ll = (t) => t % 1 == 0, is = [1, 2, 2.5, 5], ku = Tn(10, -32, 0, is), Hl = Tn(10, 0, 32, is), Pu = Hl.filter(Ll), yi = ku.concat(Hl), So = `
`, Rl = "{YYYY}", Fr = So + Rl, Fl = "{M}/{D}", xn = So + Fl, Yn = xn + "/{YY}", Ul = "{aa}", Tu = "{h}:{mm}", qi = Tu + Ul, Ur = So + qi, Vr = ":{ss}", ut = null;
function Vl(t) {
  let e = t * 1e3, n = e * 60, i = n * 60, s = i * 24, r = s * 30, a = s * 365, h = (t == 1 ? Tn(10, 0, 3, is).filter(Ll) : Tn(10, -3, 0, is)).concat([
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
    s,
    s * 2,
    s * 3,
    s * 4,
    s * 5,
    s * 6,
    s * 7,
    s * 8,
    s * 9,
    s * 10,
    s * 15,
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
  const p = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [a, Rl, ut, ut, ut, ut, ut, ut, 1],
    [s * 28, "{MMM}", Fr, ut, ut, ut, ut, ut, 1],
    [s, Fl, Fr, ut, ut, ut, ut, ut, 1],
    [i, "{h}" + Ul, Yn, ut, xn, ut, ut, ut, 1],
    [n, qi, Yn, ut, xn, ut, ut, ut, 1],
    [e, Vr, Yn + " " + qi, ut, xn + " " + qi, ut, Ur, ut, 1],
    [t, Vr + ".{fff}", Yn + " " + qi, ut, xn + " " + qi, ut, Ur, ut, 1]
  ];
  function v(m) {
    return (b, E, P, H, U, I) => {
      let x = [], R = U >= a, $ = U >= r && U < a, Z = m(P), M = pt(Z * t, 3), J = Ws(Z.getFullYear(), R ? 0 : Z.getMonth(), $ || R ? 1 : Z.getDate()), G = pt(J * t, 3);
      if ($ || R) {
        let tt = $ ? U / r : 0, W = R ? U / a : 0, S = M == G ? M : pt(Ws(J.getFullYear() + W, J.getMonth() + tt, 1) * t, 3), q = new Date(Mt(S / t)), z = q.getFullYear(), j = q.getMonth();
        for (let L = 0; S <= H; L++) {
          let it = Ws(z + W * L, j + tt * L, 1), N = it - m(pt(it * t, 3));
          S = pt((+it + N) * t, 3), S <= H && x.push(S);
        }
      } else {
        let tt = U >= s ? s : U, W = le(P) - le(M), S = G + W + cs(M - G, tt);
        x.push(S);
        let q = m(S), z = q.getHours() + q.getMinutes() / n + q.getSeconds() / i, j = U / i, L = b.axes[E]._space, it = I / L;
        for (; S = pt(S + U, t == 1 ? 0 : 3), !(S > H); )
          if (j > 1) {
            let N = le(pt(z + j, 6)) % 24, nt = m(S).getHours() - N;
            nt > 1 && (nt = -1), S -= nt * i, z = (z + j) % 24;
            let ft = x[x.length - 1];
            pt((S - ft) / U, 3) * it >= 0.7 && x.push(S);
          } else
            x.push(S);
      }
      return x;
    };
  }
  return [
    h,
    p,
    v
  ];
}
const [Cu, Mu, zu] = Vl(1), [Du, Ou, Nu] = Vl(1e-3);
Tn(2, -53, 53, [1]);
function Ir(t, e) {
  return t.map((n) => n.map(
    (i, s) => s == 0 || s == 8 || i == null ? i : e(s == 1 || n[8] == 0 ? i : n[1] + i)
  ));
}
function jr(t, e) {
  return (n, i, s, r, a) => {
    let f = e.find((P) => a >= P[0]) || e[e.length - 1], h, p, v, m, b, E;
    return i.map((P) => {
      let H = t(P), U = H.getFullYear(), I = H.getMonth(), x = H.getDate(), R = H.getHours(), $ = H.getMinutes(), Z = H.getSeconds(), M = U != h && f[2] || I != p && f[3] || x != v && f[4] || R != m && f[5] || $ != b && f[6] || Z != E && f[7] || f[1];
      return h = U, p = I, v = x, m = R, b = $, E = Z, M(H);
    });
  };
}
function Lu(t, e) {
  let n = $o(e);
  return (i, s, r, a, f) => s.map((h) => n(t(h)));
}
function Ws(t, e, n) {
  return new Date(t, e, n);
}
function Br(t, e) {
  return e(t);
}
const Hu = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function Wr(t, e) {
  return (n, i, s, r) => r == null ? bo : e(t(i));
}
function Ru(t, e) {
  let n = t.series[e];
  return n.width ? n.stroke(t, e) : n.points.width ? n.points.stroke(t, e) : null;
}
function Fu(t, e) {
  return t.series[e].fill(t, e);
}
const Uu = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: ou,
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
function Vu(t, e) {
  let n = t.cursor.points, i = be(), s = n.size(t, e);
  _t(i, yn, s), _t(i, wn, s);
  let r = s / -2;
  _t(i, "marginLeft", r), _t(i, "marginTop", r);
  let a = n.width(t, e, s);
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
const Gs = [0, 0];
function Wu(t, e, n) {
  return Gs[0] = e, Gs[1] = n, Gs;
}
function Kn(t, e, n, i = !0) {
  return (s) => {
    s.button == 0 && (!i || s.target == e) && n(s);
  };
}
function Ys(t, e, n, i = !0) {
  return (s) => {
    (!i || s.target == e) && n(s);
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
    show: Vu,
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
    mousemove: Ys,
    mouseleave: Ys,
    mouseenter: Ys
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
    dist: (t, e, n, i, s) => i - s,
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
}, Ao = kt({}, Il, {
  filter: Pl
}), jl = kt({}, Ao, {
  size: 10
}), Bl = kt({}, Il, {
  show: !1
}), Eo = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', Wl = "bold " + Eo, Gl = 1.5, Gr = {
  show: !0,
  scale: "x",
  stroke: go,
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
  grid: Ao,
  ticks: jl,
  border: Bl,
  font: Eo,
  lineGap: Gl,
  rotate: 0
}, Yu = "Value", Ku = "Time", Yr = {
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
function qu(t, e, n, i, s) {
  return e.map((r) => r == null ? "" : wo(r));
}
function Zu(t, e, n, i, s, r, a) {
  let f = [], h = oi.get(s) || 0;
  n = a ? n : pt(cs(n, s), h);
  for (let p = n; p <= i; p = pt(p + s, h))
    f.push(Object.is(p, -0) ? 0 : p);
  return f;
}
function eo(t, e, n, i, s, r, a) {
  const f = [], h = t.scales[t.axes[e].scale].log, p = h == 10 ? Ge : Al, v = le(p(n));
  s = Xi(h, v), h == 10 && (s = yi[ke(s, yi)]);
  let m = n, b = s * h;
  h == 10 && (b = yi[ke(b, yi)]);
  do
    f.push(m), m = m + s, h == 10 && !oi.has(m) && (m = pt(m, oi.get(s))), m >= b && (s = m, b = s * h, h == 10 && (b = yi[ke(b, yi)]));
  while (m <= i);
  return f;
}
function Ju(t, e, n, i, s, r, a) {
  let h = t.scales[t.axes[e].scale].asinh, p = i > h ? eo(t, e, Zt(h, n), i, s) : [h], v = i >= 0 && n <= 0 ? [0] : [];
  return (n < -h ? eo(t, e, Zt(h, -i), -n, s) : [h]).reverse().map((b) => -b).concat(v, p);
}
const Yl = /./, Qu = /[12357]/, Xu = /[125]/, Kr = /1/, io = (t, e, n, i) => t.map((s, r) => e == 4 && s == 0 || r % i == 0 && n.test(s.toExponential()[s < 0 ? 1 : 0]) ? s : null);
function tf(t, e, n, i, s) {
  let r = t.axes[n], a = r.scale, f = t.scales[a], h = t.valToPos, p = r._space, v = h(10, a), m = h(9, a) - v >= p ? Yl : h(7, a) - v >= p ? Qu : h(5, a) - v >= p ? Xu : Kr;
  if (m == Kr) {
    let b = zt(h(1, a) - v);
    if (b < p)
      return io(e.slice().reverse(), f.distr, m, ve(p / b)).reverse();
  }
  return io(e, f.distr, m, 1);
}
function ef(t, e, n, i, s) {
  let r = t.axes[n], a = r.scale, f = r._space, h = t.valToPos, p = zt(h(1, a) - h(2, a));
  return p < f ? io(e.slice().reverse(), 3, Yl, ve(f / p)).reverse() : e;
}
function nf(t, e, n, i) {
  return i == null ? bo : e == null ? "" : wo(e);
}
const qr = {
  show: !0,
  scale: "y",
  stroke: go,
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
  grid: Ao,
  ticks: jl,
  border: Bl,
  font: Eo,
  lineGap: Gl,
  rotate: 0
};
function sf(t, e) {
  let n = 3 + (t || 1) * 2;
  return pt(n * e, 3);
}
function of(t, e) {
  let { scale: n, idxs: i } = t.series[0], s = t._data[0], r = t.valToPos(s[i[0]], n, !0), a = t.valToPos(s[i[1]], n, !0), f = zt(a - r), h = t.series[e], p = f / (h.points.space * lt);
  return i[1] - i[0] <= p;
}
const Zr = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: dt,
  max: -dt
}, Kl = (t, e, n, i, s) => s, Jr = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: Kl,
  alpha: 1,
  facets: [
    kt({}, Zr, { scale: "x" }),
    kt({}, Zr, { scale: "y" })
  ]
}, Qr = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: Kl,
  alpha: 1,
  points: {
    show: of,
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
function rf(t, e, n, i, s) {
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
}), Xr = {};
function Zl(t, e) {
  let n = Xr[t];
  return n || (n = {
    key: t,
    plots: [],
    sub(i) {
      n.plots.push(i);
    },
    unsub(i) {
      n.plots = n.plots.filter((s) => s != i);
    },
    pub(i, s, r, a, f, h, p) {
      for (let v = 0; v < n.plots.length; v++)
        n.plots[v] != s && n.plots[v].pub(i, s, r, a, f, h, p);
    }
  }, t != null && (Xr[t] = n)), n;
}
const nn = 1, no = 2;
function ki(t, e, n) {
  const i = t.mode, s = t.series[e], r = i == 2 ? t._data[e] : t._data, a = t.scales, f = t.bbox;
  let h = r[0], p = i == 2 ? r[1] : r[e], v = i == 2 ? a[s.facets[0].scale] : a[t.series[0].scale], m = i == 2 ? a[s.facets[1].scale] : a[s.scale], b = f.left, E = f.top, P = f.width, H = f.height, U = t.valToPosH, I = t.valToPosV;
  return v.ori == 0 ? n(
    s,
    h,
    p,
    v,
    m,
    U,
    I,
    b,
    E,
    P,
    H,
    hs,
    ln,
    ps,
    Ql,
    ta
  ) : n(
    s,
    h,
    p,
    v,
    m,
    I,
    U,
    E,
    b,
    H,
    P,
    ds,
    an,
    To,
    Xl,
    ea
  );
}
function ko(t, e) {
  let n = 0, i = 0, s = ot(t.bands, xo);
  for (let r = 0; r < s.length; r++) {
    let a = s[r];
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
function af(t, e, n, i, s) {
  let r = t.mode, a = t.series[e], f = r == 2 ? a.facets[1].scale : a.scale, h = t.scales[f];
  return s == -1 ? h.min : s == 1 ? h.max : h.distr == 3 ? h.dir == 1 ? h.min : h.max : 0;
}
function Ye(t, e, n, i, s, r) {
  return ki(t, e, (a, f, h, p, v, m, b, E, P, H, U) => {
    let I = a.pxRound;
    const x = p.dir * (p.ori == 0 ? 1 : -1), R = p.ori == 0 ? ln : an;
    let $, Z;
    x == 1 ? ($ = n, Z = i) : ($ = i, Z = n);
    let M = I(m(f[$], p, H, E)), J = I(b(h[$], v, U, P)), G = I(m(f[Z], p, H, E)), tt = I(b(r == 1 ? v.max : v.min, v, U, P)), W = new Path2D(s);
    return R(W, G, tt), R(W, M, tt), R(W, M, J), W;
  });
}
function fs(t, e, n, i, s, r) {
  let a = null;
  if (t.length > 0) {
    a = new Path2D();
    const f = e == 0 ? ps : To;
    let h = n;
    for (let m = 0; m < t.length; m++) {
      let b = t[m];
      if (b[1] > b[0]) {
        let E = b[0] - h;
        E > 0 && f(a, h, i, E, i + r), h = b[1];
      }
    }
    let p = n + s - h, v = 10;
    p > 0 && f(a, h, i - v / 2, p, i + r + v);
  }
  return a;
}
function cf(t, e, n) {
  let i = t[t.length - 1];
  i && i[0] == e ? i[1] = n : t.push([e, n]);
}
function Po(t, e, n, i, s, r, a) {
  let f = [], h = t.length;
  for (let p = s == 1 ? n : i; p >= n && p <= i; p += s)
    if (e[p] === null) {
      let m = p, b = p;
      if (s == 1)
        for (; ++p <= i && e[p] === null; )
          b = p;
      else
        for (; --p >= n && e[p] === null; )
          b = p;
      let E = r(t[m]), P = b == m ? E : r(t[b]), H = m - s;
      E = a <= 0 && H >= 0 && H < h ? r(t[H]) : E;
      let I = b + s;
      P = a >= 0 && I >= 0 && I < h ? r(t[I]) : P, P >= E && f.push([E, P]);
    }
  return f;
}
function tl(t) {
  return t == 0 ? kl : t == 1 ? Mt : (e) => _i(e, t);
}
function Jl(t) {
  let e = t == 0 ? hs : ds, n = t == 0 ? (s, r, a, f, h, p) => {
    s.arcTo(r, a, f, h, p);
  } : (s, r, a, f, h, p) => {
    s.arcTo(a, r, h, f, p);
  }, i = t == 0 ? (s, r, a, f, h) => {
    s.rect(r, a, f, h);
  } : (s, r, a, f, h) => {
    s.rect(a, r, h, f);
  };
  return (s, r, a, f, h, p = 0, v = 0) => {
    p == 0 && v == 0 ? i(s, r, a, f, h) : (p = Pe(p, f / 2, h / 2), v = Pe(v, f / 2, h / 2), e(s, r + p, a), n(s, r + f, a, r + f, a + h, p), n(s, r + f, a + h, r, a + h, v), n(s, r, a + h, r, a, v), n(s, r, a, r + f, a, p), s.closePath());
  };
}
const hs = (t, e, n) => {
  t.moveTo(e, n);
}, ds = (t, e, n) => {
  t.moveTo(n, e);
}, ln = (t, e, n) => {
  t.lineTo(e, n);
}, an = (t, e, n) => {
  t.lineTo(n, e);
}, ps = Jl(0), To = Jl(1), Ql = (t, e, n, i, s, r) => {
  t.arc(e, n, i, s, r);
}, Xl = (t, e, n, i, s, r) => {
  t.arc(n, e, i, s, r);
}, ta = (t, e, n, i, s, r, a) => {
  t.bezierCurveTo(e, n, i, s, r, a);
}, ea = (t, e, n, i, s, r, a) => {
  t.bezierCurveTo(n, e, s, i, a, r);
};
function ia(t) {
  return (e, n, i, s, r) => ki(e, n, (a, f, h, p, v, m, b, E, P, H, U) => {
    let { pxRound: I, points: x } = a, R, $;
    p.ori == 0 ? (R = hs, $ = Ql) : (R = ds, $ = Xl);
    const Z = pt(x.width * lt, 3);
    let M = (x.size - x.width) / 2 * lt, J = pt(M * 2, 3), G = new Path2D(), tt = new Path2D(), { left: W, top: S, width: q, height: z } = e.bbox;
    ps(
      tt,
      W - J,
      S - J,
      q + J * 2,
      z + J * 2
    );
    const j = (L) => {
      if (h[L] != null) {
        let it = I(m(f[L], p, H, E)), N = I(b(h[L], v, U, P));
        R(G, it + M, N), $(G, it, N, M, 0, Zn * 2);
      }
    };
    if (r)
      r.forEach(j);
    else
      for (let L = i; L <= s; L++)
        j(L);
    return {
      stroke: Z > 0 ? G : null,
      fill: G,
      clip: tt,
      flags: nn | no
    };
  });
}
function na(t) {
  return (e, n, i, s, r, a) => {
    i != s && (r != i && a != i && t(e, n, i), r != s && a != s && t(e, n, s), t(e, n, a));
  };
}
const uf = na(ln), ff = na(an);
function sa(t) {
  const e = ot(t?.alignGaps, 0);
  return (n, i, s, r) => ki(n, i, (a, f, h, p, v, m, b, E, P, H, U) => {
    [s, r] = ls(h, s, r);
    let I = a.pxRound, x = (z) => I(m(z, p, H, E)), R = (z) => I(b(z, v, U, P)), $, Z;
    p.ori == 0 ? ($ = ln, Z = uf) : ($ = an, Z = ff);
    const M = p.dir * (p.ori == 0 ? 1 : -1), J = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: nn }, G = J.stroke;
    let tt = !1;
    if (r - s >= H * 4) {
      let z = (D) => n.posToVal(D, p.key, !0), j = null, L = null, it, N, Jt, yt = x(f[M == 1 ? s : r]), nt = x(f[s]), ft = x(f[r]), Q = z(M == 1 ? nt + 1 : ft - 1);
      for (let D = M == 1 ? s : r; D >= s && D <= r; D += M) {
        let Tt = f[D], wt = (M == 1 ? Tt < Q : Tt > Q) ? yt : x(Tt), ct = h[D];
        wt == yt ? ct != null ? (N = ct, j == null ? ($(G, wt, R(N)), it = j = L = N) : N < j ? j = N : N > L && (L = N)) : ct === null && (tt = !0) : (j != null && Z(G, yt, R(j), R(L), R(it), R(N)), ct != null ? (N = ct, $(G, wt, R(N)), j = L = it = N) : (j = L = null, ct === null && (tt = !0)), yt = wt, Q = z(yt + M));
      }
      j != null && j != L && Jt != yt && Z(G, yt, R(j), R(L), R(it), R(N));
    } else
      for (let z = M == 1 ? s : r; z >= s && z <= r; z += M) {
        let j = h[z];
        j === null ? tt = !0 : j != null && $(G, x(f[z]), R(j));
      }
    let [S, q] = ko(n, i);
    if (a.fill != null || S != 0) {
      let z = J.fill = new Path2D(G), j = a.fillTo(n, i, a.min, a.max, S), L = R(j), it = x(f[s]), N = x(f[r]);
      M == -1 && ([N, it] = [it, N]), $(z, N, L), $(z, it, L);
    }
    if (!a.spanGaps) {
      let z = [];
      tt && z.push(...Po(f, h, s, r, M, x, e)), J.gaps = z = a.gaps(n, i, s, r, z), J.clip = fs(z, p.ori, E, P, H, U);
    }
    return q != 0 && (J.band = q == 2 ? [
      Ye(n, i, s, r, G, -1),
      Ye(n, i, s, r, G, 1)
    ] : Ye(n, i, s, r, G, q)), J;
  });
}
function hf(t) {
  const e = ot(t.align, 1), n = ot(t.ascDesc, !1), i = ot(t.alignGaps, 0), s = ot(t.extend, !1);
  return (r, a, f, h) => ki(r, a, (p, v, m, b, E, P, H, U, I, x, R) => {
    [f, h] = ls(m, f, h);
    let $ = p.pxRound, { left: Z, width: M } = r.bbox, J = (nt) => $(P(nt, b, x, U)), G = (nt) => $(H(nt, E, R, I)), tt = b.ori == 0 ? ln : an;
    const W = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: nn }, S = W.stroke, q = b.dir * (b.ori == 0 ? 1 : -1);
    let z = G(m[q == 1 ? f : h]), j = J(v[q == 1 ? f : h]), L = j, it = j;
    s && e == -1 && (it = Z, tt(S, it, z)), tt(S, j, z);
    for (let nt = q == 1 ? f : h; nt >= f && nt <= h; nt += q) {
      let ft = m[nt];
      if (ft == null)
        continue;
      let Q = J(v[nt]), D = G(ft);
      e == 1 ? tt(S, Q, z) : tt(S, L, D), tt(S, Q, D), z = D, L = Q;
    }
    let N = L;
    s && e == 1 && (N = Z + M, tt(S, N, z));
    let [Jt, yt] = ko(r, a);
    if (p.fill != null || Jt != 0) {
      let nt = W.fill = new Path2D(S), ft = p.fillTo(r, a, p.min, p.max, Jt), Q = G(ft);
      tt(nt, N, Q), tt(nt, it, Q);
    }
    if (!p.spanGaps) {
      let nt = [];
      nt.push(...Po(v, m, f, h, q, J, i));
      let ft = p.width * lt / 2, Q = n || e == 1 ? ft : -ft, D = n || e == -1 ? -ft : ft;
      nt.forEach((Tt) => {
        Tt[0] += Q, Tt[1] += D;
      }), W.gaps = nt = p.gaps(r, a, f, h, nt), W.clip = fs(nt, b.ori, U, I, x, R);
    }
    return yt != 0 && (W.band = yt == 2 ? [
      Ye(r, a, f, h, S, -1),
      Ye(r, a, f, h, S, 1)
    ] : Ye(r, a, f, h, S, yt)), W;
  });
}
function el(t, e, n, i, s, r, a = dt) {
  if (t.length > 1) {
    let f = null;
    for (let h = 0, p = 1 / 0; h < t.length; h++)
      if (e[h] !== void 0) {
        if (f != null) {
          let v = zt(t[h] - t[f]);
          v < p && (p = v, a = zt(n(t[h], i, s, r) - n(t[f], i, s, r)));
        }
        f = h;
      }
  }
  return a;
}
function df(t) {
  t = t || An;
  const e = ot(t.size, [0.6, dt, 1]), n = t.align || 0, i = t.gap || 0;
  let s = t.radius;
  s = // [valueRadius, baselineRadius]
  s == null ? [0, 0] : typeof s == "number" ? [s, 0] : s;
  const r = et(s), a = 1 - e[0], f = ot(e[1], dt), h = ot(e[2], 1), p = ot(t.disp, An), v = ot(t.each, (E) => {
  }), { fill: m, stroke: b } = p;
  return (E, P, H, U) => ki(E, P, (I, x, R, $, Z, M, J, G, tt, W, S) => {
    let q = I.pxRound, z = n, j = i * lt, L = f * lt, it = h * lt, N, Jt;
    $.ori == 0 ? [N, Jt] = r(E, P) : [Jt, N] = r(E, P);
    const yt = $.dir * ($.ori == 0 ? 1 : -1);
    let nt = $.ori == 0 ? ps : To, ft = $.ori == 0 ? v : (T, mt, Ct, Mi, ui, ze, fi) => {
      v(T, mt, Ct, ui, Mi, fi, ze);
    }, Q = ot(E.bands, xo).find((T) => T.series[0] == P), D = Q != null ? Q.dir : 0, Tt = I.fillTo(E, P, I.min, I.max, D), Wt = q(J(Tt, Z, S, tt)), wt, ct, we, ee = W, $t = q(I.width * lt), Me = !1, je = null, fe = null, Ze = null, Pi = null;
    m != null && ($t == 0 || b != null) && (Me = !0, je = m.values(E, P, H, U), fe = /* @__PURE__ */ new Map(), new Set(je).forEach((T) => {
      T != null && fe.set(T, new Path2D());
    }), $t > 0 && (Ze = b.values(E, P, H, U), Pi = /* @__PURE__ */ new Map(), new Set(Ze).forEach((T) => {
      T != null && Pi.set(T, new Path2D());
    })));
    let { x0: Ti, size: cn } = p;
    if (Ti != null && cn != null) {
      z = 1, x = Ti.values(E, P, H, U), Ti.unit == 2 && (x = x.map((Ct) => E.posToVal(G + Ct * W, $.key, !0)));
      let T = cn.values(E, P, H, U);
      cn.unit == 2 ? ct = T[0] * W : ct = M(T[0], $, W, G) - M(0, $, W, G), ee = el(x, R, M, $, W, G, ee), we = ee - ct + j;
    } else
      ee = el(x, R, M, $, W, G, ee), we = ee * a + j, ct = ee - we;
    we < 1 && (we = 0), $t >= ct / 2 && ($t = 0), we < 5 && (q = kl);
    let Nn = we > 0, ai = ee - we - (Nn ? $t : 0);
    ct = q(to(ai, it, L)), wt = (z == 0 ? ct / 2 : z == yt ? 0 : ct) - z * yt * ((z == 0 ? j / 2 : 0) + (Nn ? $t / 2 : 0));
    const Gt = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Ci = Me ? null : new Path2D();
    let Be = null;
    if (Q != null)
      Be = E.data[Q.series[1]];
    else {
      let { y0: T, y1: mt } = p;
      T != null && mt != null && (R = mt.values(E, P, H, U), Be = T.values(E, P, H, U));
    }
    let ci = N * ct, K = Jt * ct;
    for (let T = yt == 1 ? H : U; T >= H && T <= U; T += yt) {
      let mt = R[T];
      if (mt == null)
        continue;
      if (Be != null) {
        let Qt = Be[T] ?? 0;
        if (mt - Qt == 0)
          continue;
        Wt = J(Qt, Z, S, tt);
      }
      let Ct = $.distr != 2 || p != null ? x[T] : T, Mi = M(Ct, $, W, G), ui = J(ot(mt, Tt), Z, S, tt), ze = q(Mi - wt), fi = q(Zt(ui, Wt)), ie = q(Pe(ui, Wt)), he = fi - ie;
      if (mt != null) {
        let Qt = mt < 0 ? K : ci, xe = mt < 0 ? ci : K;
        Me ? ($t > 0 && Ze[T] != null && nt(Pi.get(Ze[T]), ze, ie + le($t / 2), ct, Zt(0, he - $t), Qt, xe), je[T] != null && nt(fe.get(je[T]), ze, ie + le($t / 2), ct, Zt(0, he - $t), Qt, xe)) : nt(Ci, ze, ie + le($t / 2), ct, Zt(0, he - $t), Qt, xe), ft(
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
  const n = ot(e?.alignGaps, 0);
  return (i, s, r, a) => ki(i, s, (f, h, p, v, m, b, E, P, H, U, I) => {
    [r, a] = ls(p, r, a);
    let x = f.pxRound, R = (N) => x(b(N, v, U, P)), $ = (N) => x(E(N, m, I, H)), Z, M, J;
    v.ori == 0 ? (Z = hs, J = ln, M = ta) : (Z = ds, J = an, M = ea);
    const G = v.dir * (v.ori == 0 ? 1 : -1);
    let tt = R(h[G == 1 ? r : a]), W = tt, S = [], q = [];
    for (let N = G == 1 ? r : a; N >= r && N <= a; N += G)
      if (p[N] != null) {
        let yt = h[N], nt = R(yt);
        S.push(W = nt), q.push($(p[N]));
      }
    const z = { stroke: t(S, q, Z, J, M, x), fill: null, clip: null, band: null, gaps: null, flags: nn }, j = z.stroke;
    let [L, it] = ko(i, s);
    if (f.fill != null || L != 0) {
      let N = z.fill = new Path2D(j), Jt = f.fillTo(i, s, f.min, f.max, L), yt = $(Jt);
      J(N, W, yt), J(N, tt, yt);
    }
    if (!f.spanGaps) {
      let N = [];
      N.push(...Po(h, p, r, a, G, R, n)), z.gaps = N = f.gaps(i, s, r, a, N), z.clip = fs(N, v.ori, P, H, U, I);
    }
    return it != 0 && (z.band = it == 2 ? [
      Ye(i, s, r, a, j, -1),
      Ye(i, s, r, a, j, 1)
    ] : Ye(i, s, r, a, j, it)), z;
  });
}
function mf(t) {
  return pf(gf, t);
}
function gf(t, e, n, i, s, r) {
  const a = t.length;
  if (a < 2)
    return null;
  const f = new Path2D();
  if (n(f, t[0], e[0]), a == 2)
    i(f, t[1], e[1]);
  else {
    let h = Array(a), p = Array(a - 1), v = Array(a - 1), m = Array(a - 1);
    for (let b = 0; b < a - 1; b++)
      v[b] = e[b + 1] - e[b], m[b] = t[b + 1] - t[b], p[b] = v[b] / m[b];
    h[0] = p[0];
    for (let b = 1; b < a - 1; b++)
      p[b] === 0 || p[b - 1] === 0 || p[b - 1] > 0 != p[b] > 0 ? h[b] = 0 : (h[b] = 3 * (m[b - 1] + m[b]) / ((2 * m[b] + m[b - 1]) / p[b - 1] + (m[b] + 2 * m[b - 1]) / p[b]), isFinite(h[b]) || (h[b] = 0));
    h[a - 1] = p[a - 2];
    for (let b = 0; b < a - 1; b++)
      s(
        f,
        t[b] + m[b] / 3,
        e[b] + h[b] * m[b] / 3,
        t[b + 1] - m[b] / 3,
        e[b + 1] - h[b + 1] * m[b] / 3,
        t[b + 1],
        e[b + 1]
      );
  }
  return f;
}
const so = /* @__PURE__ */ new Set();
function il() {
  for (let t of so)
    t.syncRect(!0);
}
rn && ($i(qc, Zi, il), $i(Zc, Zi, il, !0), $i(ts, Zi, () => {
  Bt.pxRatio = lt;
}));
const bf = sa(), vf = ia();
function nl(t, e, n, i) {
  return (i ? [t[0], t[1]].concat(t.slice(2)) : [t[0]].concat(t.slice(1))).map((r, a) => oo(r, a, e, n));
}
function _f(t, e) {
  return t.map((n, i) => i == 0 ? {} : kt({}, e, n));
}
function oo(t, e, n, i) {
  return kt({}, e == 0 ? n : i, t);
}
function oa(t, e, n) {
  return e == null ? tn : [e, n];
}
const yf = oa;
function wf(t, e, n) {
  return e == null ? tn : es(e, n, yo, !0);
}
function ra(t, e, n, i) {
  return e == null ? tn : as(e, n, t.scales[i].log, !1);
}
const xf = ra;
function la(t, e, n, i) {
  return e == null ? tn : _o(e, n, t.scales[i].log, !1);
}
const $f = la;
function Sf(t, e, n, i, s) {
  let r = Zt(Nr(t), Nr(e)), a = e - t, f = ke(s / i * a, n);
  do {
    let h = n[f], p = i * h / a;
    if (p >= s && r + (h < 5 ? oi.get(h) : 0) <= 17)
      return [h, p];
  } while (++f < n.length);
  return [0, 0];
}
function sl(t) {
  let e, n;
  return t = t.replace(/(\d+)px/, (i, s) => (e = Mt((n = +s) * lt)) + "px"), [t, e, n];
}
function Af(t) {
  t.show && [t.font, t.labelFont].forEach((e) => {
    let n = pt(e[2] * lt, 1);
    e[0] = e[0].replace(/[0-9.]+px/, n + "px"), e[1] = n;
  });
}
function Bt(t, e, n) {
  const i = {
    mode: ot(t.mode, 1)
  }, s = i.mode;
  function r(o, l, c, u) {
    let d = l.valToPct(o);
    return u + c * (l.dir == -1 ? 1 - d : d);
  }
  function a(o, l, c, u) {
    let d = l.valToPct(o);
    return u + c * (l.dir == -1 ? d : 1 - d);
  }
  function f(o, l, c, u) {
    return l.ori == 0 ? r(o, l, c, u) : a(o, l, c, u);
  }
  i.valToPosH = r, i.valToPosV = a;
  let h = !1;
  i.status = 0;
  const p = i.root = be(Mc);
  if (t.id != null && (p.id = t.id), re(p, t.class), t.title) {
    let o = be(Oc, p);
    o.textContent = t.title;
  }
  const v = Ee("canvas"), m = i.ctx = v.getContext("2d"), b = be(Nc, p);
  $i("click", b, (o) => {
    o.target === P && (gt != Ii || xt != ji) && Vt.click(i, o);
  }, !0);
  const E = i.under = be(Lc, b);
  b.appendChild(v);
  const P = i.over = be(Hc, b);
  t = en(t);
  const H = +ot(t.pxAlign, 1), U = tl(H);
  (t.plugins || []).forEach((o) => {
    o.opts && (t = o.opts(i, t) || t);
  });
  const I = t.ms || 1e-3, x = i.series = s == 1 ? nl(t.series || [], Yr, Qr, !1) : _f(t.series || [null], Jr), R = i.axes = nl(t.axes || [], Gr, qr, !0), $ = i.scales = {}, Z = i.bands = t.bands || [];
  Z.forEach((o) => {
    o.fill = et(o.fill || null), o.dir = ot(o.dir, -1);
  });
  const M = s == 2 ? x[1].facets[0].scale : x[0].scale, J = {
    axes: Sa,
    series: _a
  }, G = (t.drawOrder || ["axes", "series"]).map((o) => J[o]);
  function tt(o) {
    const l = o.distr == 3 ? (c) => Ge(c > 0 ? c : o.clamp(i, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => Bs(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let u = l(c), { _min: d, _max: g } = o, _ = g - d;
      return (u - d) / _;
    };
  }
  function W(o) {
    let l = $[o];
    if (l == null) {
      let c = (t.scales || An)[o] || An;
      if (c.from != null) {
        W(c.from);
        let u = kt({}, $[c.from], c, { key: o });
        u.valToPct = tt(u), $[o] = u;
      } else {
        l = $[o] = kt({}, o == M ? ql : lf, c), l.key = o;
        let u = l.time, d = l.range, g = ii(d);
        if ((o != M || s == 2 && !u) && (g && (d[0] == null || d[1] == null) && (d = {
          min: d[0] == null ? zr : {
            mode: 1,
            hard: d[0],
            soft: d[0]
          },
          max: d[1] == null ? zr : {
            mode: 1,
            hard: d[1],
            soft: d[1]
          }
        }, g = !1), !g && us(d))) {
          let _ = d;
          d = (y, w, A) => w == null ? tn : es(w, A, _);
        }
        l.range = et(d || (u ? yf : o == M ? l.distr == 3 ? xf : l.distr == 4 ? $f : oa : l.distr == 3 ? ra : l.distr == 4 ? la : wf)), l.auto = et(g ? !1 : l.auto), l.clamp = et(l.clamp || rf), l._min = l._max = null, l.valToPct = tt(l);
      }
    }
  }
  W("x"), W("y"), s == 1 && x.forEach((o) => {
    W(o.scale);
  }), R.forEach((o) => {
    W(o.scale);
  });
  for (let o in t.scales)
    W(o);
  const S = $[M], q = S.distr;
  let z, j;
  S.ori == 0 ? (re(p, zc), z = r, j = a) : (re(p, Dc), z = a, j = r);
  const L = {};
  for (let o in $) {
    let l = $[o];
    (l.min != null || l.max != null) && (L[o] = { min: l.min, max: l.max }, l.min = l.max = null);
  }
  const it = t.tzDate || ((o) => new Date(Mt(o / I))), N = t.fmtDate || $o, Jt = I == 1 ? zu(it) : Nu(it), yt = jr(it, Ir(I == 1 ? Mu : Ou, N)), nt = Wr(it, Br(Hu, N)), ft = [], Q = i.legend = kt({}, Uu, t.legend), D = i.cursor = kt({}, Gu, { drag: { y: s == 2 } }, t.cursor), Tt = Q.show, Wt = D.show, wt = Q.markers;
  Q.idxs = ft, wt.width = et(wt.width), wt.dash = et(wt.dash), wt.stroke = et(wt.stroke), wt.fill = et(wt.fill);
  let ct, we, ee, $t = [], Me = [], je, fe = !1, Ze = {};
  if (Q.live) {
    const o = x[1] ? x[1].values : null;
    fe = o != null, je = fe ? o(i, 1, 0) : { _: 0 };
    for (let l in je)
      Ze[l] = bo;
  }
  if (Tt)
    if (ct = Ee("table", jc, p), ee = Ee("tbody", null, ct), Q.mount(i, ct), fe) {
      we = Ee("thead", null, ct, ee);
      let o = Ee("tr", null, we);
      Ee("th", null, o);
      for (var Pi in je)
        Ee("th", _r, o).textContent = Pi;
    } else
      re(ct, Wc), Q.live && re(ct, Bc);
  const Ti = { show: !0 }, cn = { show: !1 };
  function Nn(o, l) {
    if (l == 0 && (fe || !Q.live || s == 2))
      return tn;
    let c = [], u = Ee("tr", Gc, ee, ee.childNodes[l]);
    re(u, o.class), o.show || re(u, wi);
    let d = Ee("th", null, u);
    if (wt.show) {
      let y = be(Yc, d);
      if (l > 0) {
        let w = wt.width(i, l);
        w && (y.style.border = w + "px " + wt.dash(i, l) + " " + wt.stroke(i, l)), y.style.background = wt.fill(i, l);
      }
    }
    let g = be(_r, d);
    o.label instanceof HTMLElement ? g.appendChild(o.label) : g.textContent = o.label, l > 0 && (wt.show || (g.style.color = o.width > 0 ? wt.stroke(i, l) : wt.fill(i, l)), Gt("click", d, (y) => {
      if (D._lock)
        return;
      di(y);
      let w = x.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != Q.isolate) {
        let A = x.some((k, C) => C > 0 && C != w && k.show);
        x.forEach((k, C) => {
          C > 0 && Oe(C, A ? C == w ? Ti : cn : Ti, !0, Et.setSeries);
        });
      } else
        Oe(w, { show: !o.show }, !0, Et.setSeries);
    }, !1), Di && Gt($r, d, (y) => {
      D._lock || (di(y), Oe(x.indexOf(o), Wi, !0, Et.setSeries));
    }, !1));
    for (var _ in je) {
      let y = Ee("td", Kc, u);
      y.textContent = "--", c.push(y);
    }
    return [u, c];
  }
  const ai = /* @__PURE__ */ new Map();
  function Gt(o, l, c, u = !0) {
    const d = ai.get(l) || {}, g = D.bind[o](i, l, c, u);
    g && ($i(o, l, d[o] = g), ai.set(l, d));
  }
  function Ci(o, l, c) {
    const u = ai.get(l) || {};
    for (let d in u)
      (o == null || d == o) && (Xs(d, l, u[d]), delete u[d]);
    o == null && ai.delete(l);
  }
  let Be = 0, ci = 0, K = 0, T = 0, mt = 0, Ct = 0, Mi = mt, ui = Ct, ze = K, fi = T, ie = 0, he = 0, Qt = 0, xe = 0;
  i.bbox = {};
  let gs = !1, Ln = !1, zi = !1, hi = !1, Hn = !1, de = !1;
  function bs(o, l, c) {
    (c || o != i.width || l != i.height) && zo(o, l), Ri(!1), zi = !0, Ln = !0, Fi();
  }
  function zo(o, l) {
    i.width = Be = K = o, i.height = ci = T = l, mt = Ct = 0, ha(), da();
    let c = i.bbox;
    ie = c.left = _i(mt * lt, 0.5), he = c.top = _i(Ct * lt, 0.5), Qt = c.width = _i(K * lt, 0.5), xe = c.height = _i(T * lt, 0.5);
  }
  const ca = 3;
  function ua() {
    let o = !1, l = 0;
    for (; !o; ) {
      l++;
      let c = xa(l), u = $a(l);
      o = l == ca || c && u, o || (zo(i.width, i.height), Ln = !0);
    }
  }
  function fa({ width: o, height: l }) {
    bs(o, l);
  }
  i.setSize = fa;
  function ha() {
    let o = !1, l = !1, c = !1, u = !1;
    R.forEach((d, g) => {
      if (d.show && d._show) {
        let { side: _, _size: y } = d, w = _ % 2, A = d.label != null ? d.labelSize : 0, k = y + A;
        k > 0 && (w ? (K -= k, _ == 3 ? (mt += k, u = !0) : c = !0) : (T -= k, _ == 0 ? (Ct += k, o = !0) : l = !0));
      }
    }), pi[0] = o, pi[1] = c, pi[2] = l, pi[3] = u, K -= Je[1] + Je[3], mt += Je[3], T -= Je[2] + Je[0], Ct += Je[0];
  }
  function da() {
    let o = mt + K, l = Ct + T, c = mt, u = Ct;
    function d(g, _) {
      switch (g) {
        case 1:
          return o += _, o - _;
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
    let o = D.hover, l = o.skip = new Set(o.skip ?? []);
    l.add(void 0);
    let c = o.prox = et(o.prox), u = o.bias ??= 0;
    D.dataIdx = (d, g, _, y) => {
      if (g == 0)
        return _;
      let w = _, A = c(d, g, _, y) ?? dt, k = A >= 0 && A < dt, C = S.ori == 0 ? K : T, B = D.left, rt = e[0], st = e[g];
      if (l.has(st[_])) {
        w = null;
        let X = null, V = null, O;
        if (u == 0 || u == -1)
          for (O = _; X == null && O-- > 0; )
            l.has(st[O]) || (X = O);
        if (u == 0 || u == 1)
          for (O = _; V == null && O++ < st.length; )
            l.has(st[O]) || (V = O);
        if (X != null || V != null)
          if (k) {
            let vt = X == null ? -1 / 0 : z(rt[X], S, C, 0), St = V == null ? 1 / 0 : z(rt[V], S, C, 0), Ft = B - vt, ht = St - B;
            Ft <= ht ? Ft <= A && (w = X) : ht <= A && (w = V);
          } else
            w = V == null ? X : X == null ? V : _ - X <= V - _ ? X : V;
      } else k && zt(B - z(rt[_], S, C, 0)) > A && (w = null);
      return w;
    };
  }
  const di = (o) => {
    D.event = o;
  };
  D.idxs = ft, D._lock = !1;
  let jt = D.points;
  jt.show = et(jt.show), jt.size = et(jt.size), jt.stroke = et(jt.stroke), jt.width = et(jt.width), jt.fill = et(jt.fill);
  const De = i.focus = kt({}, t.focus || { alpha: 0.3 }, D.focus), Di = De.prox >= 0, Oi = Di && jt.one;
  let pe = [], Ni = [], Li = [];
  function Do(o, l) {
    let c = jt.show(i, l);
    if (c instanceof HTMLElement)
      return re(c, Ic), re(c, o.class), Re(c, -10, -10, K, T), P.insertBefore(c, pe[l]), c;
  }
  function Oo(o, l) {
    if (s == 1 || l > 0) {
      let c = s == 1 && $[o.scale].time, u = o.value;
      o.value = c ? Rr(u) ? Wr(it, Br(u, N)) : u || nt : u || nf, o.label = o.label || (c ? Ku : Yu);
    }
    if (Oi || l > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || bf || ru, o.fillTo = et(o.fillTo || af), o.pxAlign = +ot(o.pxAlign, H), o.pxRound = tl(o.pxAlign), o.stroke = et(o.stroke || null), o.fill = et(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = sf(Zt(1, o.width), 1), u = o.points = kt({}, {
        size: c,
        width: Zt(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: vf,
        _stroke: null,
        _fill: null
      }, o.points);
      u.show = et(u.show), u.filter = et(u.filter), u.fill = et(u.fill), u.stroke = et(u.stroke), u.paths = et(u.paths), u.pxAlign = o.pxAlign;
    }
    if (Tt) {
      let c = Nn(o, l);
      $t.splice(l, 0, c[0]), Me.splice(l, 0, c[1]), Q.values.push(null);
    }
    if (Wt) {
      ft.splice(l, 0, null);
      let c = null;
      Oi ? l == 0 && (c = Do(o, l)) : l > 0 && (c = Do(o, l)), pe.splice(l, 0, c), Ni.splice(l, 0, 0), Li.splice(l, 0, 0);
    }
    Rt("addSeries", l);
  }
  function pa(o, l) {
    l = l ?? x.length, o = s == 1 ? oo(o, l, Yr, Qr) : oo(o, l, {}, Jr), x.splice(l, 0, o), Oo(x[l], l);
  }
  i.addSeries = pa;
  function ma(o) {
    if (x.splice(o, 1), Tt) {
      Q.values.splice(o, 1), Me.splice(o, 1);
      let l = $t.splice(o, 1)[0];
      Ci(null, l.firstChild), l.remove();
    }
    Wt && (ft.splice(o, 1), pe.splice(o, 1)[0].remove(), Ni.splice(o, 1), Li.splice(o, 1)), Rt("delSeries", o);
  }
  i.delSeries = ma;
  const pi = [!1, !1, !1, !1];
  function ga(o, l) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, u = $[o.scale];
      u == null && (o.scale = c ? x[1].scale : M, u = $[o.scale]);
      let d = u.time;
      o.size = et(o.size), o.space = et(o.space), o.rotate = et(o.rotate), ii(o.incrs) && o.incrs.forEach((_) => {
        !oi.has(_) && oi.set(_, Cl(_));
      }), o.incrs = et(o.incrs || (u.distr == 2 ? Pu : d ? I == 1 ? Cu : Du : yi)), o.splits = et(o.splits || (d && u.distr == 1 ? Jt : u.distr == 3 ? eo : u.distr == 4 ? Ju : Zu)), o.stroke = et(o.stroke), o.grid.stroke = et(o.grid.stroke), o.ticks.stroke = et(o.ticks.stroke), o.border.stroke = et(o.border.stroke);
      let g = o.values;
      o.values = // static array of tick values
      ii(g) && !ii(g[0]) ? et(g) : (
        // temporal
        d ? (
          // config array of fmtDate string tpls
          ii(g) ? jr(it, Ir(g, N)) : (
            // fmtDate string tpl
            Rr(g) ? Lu(it, g) : g || yt
          )
        ) : g || qu
      ), o.filter = et(o.filter || (u.distr >= 3 && u.log == 10 ? tf : u.distr == 3 && u.log == 2 ? ef : Pl)), o.font = sl(o.font), o.labelFont = sl(o.labelFont), o._size = o.size(i, null, l, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (pi[l] = !0, o._el = be(Rc, b));
    }
  }
  function un(o, l, c, u) {
    let [d, g, _, y] = c, w = l % 2, A = 0;
    return w == 0 && (y || g) && (A = l == 0 && !d || l == 2 && !_ ? Mt(Gr.size / 3) : 0), w == 1 && (d || _) && (A = l == 1 && !g || l == 3 && !y ? Mt(qr.size / 2) : 0), A;
  }
  const No = i.padding = (t.padding || [un, un, un, un]).map((o) => et(ot(o, un))), Je = i._padding = No.map((o, l) => o(i, l, pi, 0));
  let Ut, Ot = null, Nt = null;
  const Rn = s == 1 ? x[0].idxs : null;
  let $e = null, fn = !1;
  function Lo(o, l) {
    if (e = o ?? [], i.data = i._data = e, s == 2) {
      Ut = 0;
      for (let c = 1; c < x.length; c++)
        Ut += e[c][0].length;
    } else {
      e.length == 0 && (i.data = i._data = e = [[]]), $e = e[0], Ut = $e.length;
      let c = e;
      if (q == 2) {
        c = e.slice();
        let u = c[0] = Array(Ut);
        for (let d = 0; d < Ut; d++)
          u[d] = d;
      }
      i._data = e = c;
    }
    if (Ri(!0), Rt("setData"), q == 2 && (zi = !0), l !== !1) {
      let c = S;
      c.auto(i, fn) ? vs() : Xe(M, c.min, c.max), hi = hi || D.left >= 0, de = !0, Fi();
    }
  }
  i.setData = Lo;
  function vs() {
    fn = !0;
    let o, l;
    s == 1 && (Ut > 0 ? (Ot = Rn[0] = 0, Nt = Rn[1] = Ut - 1, o = e[0][Ot], l = e[0][Nt], q == 2 ? (o = Ot, l = Nt) : o == l && (q == 3 ? [o, l] = as(o, o, S.log, !1) : q == 4 ? [o, l] = _o(o, o, S.log, !1) : S.time ? l = o + Mt(86400 / I) : [o, l] = es(o, l, yo, !0))) : (Ot = Rn[0] = o = null, Nt = Rn[1] = l = null)), Xe(M, o, l);
  }
  let Fn, Hi, _s, ys, ws, xs, $s, Ss, As, Xt;
  function Ho(o, l, c, u, d, g) {
    o ??= wr, c ??= xo, u ??= "butt", d ??= wr, g ??= "round", o != Fn && (m.strokeStyle = Fn = o), d != Hi && (m.fillStyle = Hi = d), l != _s && (m.lineWidth = _s = l), g != ws && (m.lineJoin = ws = g), u != xs && (m.lineCap = xs = u), c != ys && m.setLineDash(ys = c);
  }
  function Ro(o, l, c, u) {
    l != Hi && (m.fillStyle = Hi = l), o != $s && (m.font = $s = o), c != Ss && (m.textAlign = Ss = c), u != As && (m.textBaseline = As = u);
  }
  function Es(o, l, c, u, d = 0) {
    if (u.length > 0 && o.auto(i, fn) && (l == null || l.min == null)) {
      let g = ot(Ot, 0), _ = ot(Nt, u.length - 1), y = c.min == null ? tu(u, g, _, d, o.distr == 3) : [c.min, c.max];
      o.min = Pe(o.min, c.min = y[0]), o.max = Zt(o.max, c.max = y[1]);
    }
  }
  const Fo = { min: null, max: null };
  function ba() {
    for (let u in $) {
      let d = $[u];
      L[u] == null && // scales that have never been set (on init)
      (d.min == null || // or auto scales when the x scale was explicitly set
      L[M] != null && d.auto(i, fn)) && (L[u] = Fo);
    }
    for (let u in $) {
      let d = $[u];
      L[u] == null && d.from != null && L[d.from] != null && (L[u] = Fo);
    }
    L[M] != null && Ri(!0);
    let o = {};
    for (let u in L) {
      let d = L[u];
      if (d != null) {
        let g = o[u] = en($[u], cu);
        if (d.min != null)
          kt(g, d);
        else if (u != M || s == 2)
          if (Ut == 0 && g.from == null) {
            let _ = g.range(i, null, null, u);
            g.min = _[0], g.max = _[1];
          } else
            g.min = dt, g.max = -dt;
      }
    }
    if (Ut > 0) {
      x.forEach((u, d) => {
        if (s == 1) {
          let g = u.scale, _ = L[g];
          if (_ == null)
            return;
          let y = o[g];
          if (d == 0) {
            let w = y.range(i, y.min, y.max, g);
            y.min = w[0], y.max = w[1], Ot = ke(y.min, e[0]), Nt = ke(y.max, e[0]), Nt - Ot > 1 && (e[0][Ot] < y.min && Ot++, e[0][Nt] > y.max && Nt--), u.min = $e[Ot], u.max = $e[Nt];
          } else u.show && u.auto && Es(y, _, u, e[d], u.sorted);
          u.idxs[0] = Ot, u.idxs[1] = Nt;
        } else if (d > 0 && u.show && u.auto) {
          let [g, _] = u.facets, y = g.scale, w = _.scale, [A, k] = e[d], C = o[y], B = o[w];
          C != null && Es(C, L[y], g, A, g.sorted), B != null && Es(B, L[w], _, k, _.sorted), u.min = _.min, u.max = _.max;
        }
      });
      for (let u in o) {
        let d = o[u], g = L[u];
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
    for (let u in o) {
      let d = o[u];
      if (d.from != null) {
        let g = o[d.from];
        if (g.min == null)
          d.min = d.max = null;
        else {
          let _ = d.range(i, g.min, g.max, u);
          d.min = _[0], d.max = _[1];
        }
      }
    }
    let l = {}, c = !1;
    for (let u in o) {
      let d = o[u], g = $[u];
      if (g.min != d.min || g.max != d.max) {
        g.min = d.min, g.max = d.max;
        let _ = g.distr;
        g._min = _ == 3 ? Ge(g.min) : _ == 4 ? Bs(g.min, g.asinh) : _ == 100 ? g.fwd(g.min) : g.min, g._max = _ == 3 ? Ge(g.max) : _ == 4 ? Bs(g.max, g.asinh) : _ == 100 ? g.fwd(g.max) : g.max, l[u] = c = !0;
      }
    }
    if (c) {
      x.forEach((u, d) => {
        s == 2 ? d > 0 && l.y && (u._paths = null) : l[u.scale] && (u._paths = null);
      });
      for (let u in l)
        zi = !0, Rt("setScale", u);
      Wt && D.left >= 0 && (hi = de = !0);
    }
    for (let u in L)
      L[u] = null;
  }
  function va(o) {
    let l = to(Ot - 1, 0, Ut - 1), c = to(Nt + 1, 0, Ut - 1);
    for (; o[l] == null && l > 0; )
      l--;
    for (; o[c] == null && c < Ut - 1; )
      c++;
    return [l, c];
  }
  function _a() {
    if (Ut > 0) {
      let o = x.some((l) => l._focus) && Xt != De.alpha;
      o && (m.globalAlpha = Xt = De.alpha), x.forEach((l, c) => {
        if (c > 0 && l.show && (Uo(c, !1), Uo(c, !0), l._paths == null)) {
          let u = Xt;
          Xt != l.alpha && (m.globalAlpha = Xt = l.alpha);
          let d = s == 2 ? [0, e[c][0].length - 1] : va(e[c]);
          l._paths = l.paths(i, c, d[0], d[1]), Xt != u && (m.globalAlpha = Xt = u);
        }
      }), x.forEach((l, c) => {
        if (c > 0 && l.show) {
          let u = Xt;
          Xt != l.alpha && (m.globalAlpha = Xt = l.alpha), l._paths != null && Vo(c, !1);
          {
            let d = l._paths != null ? l._paths.gaps : null, g = l.points.show(i, c, Ot, Nt, d), _ = l.points.filter(i, c, g, d);
            (g || _) && (l.points._paths = l.points.paths(i, c, Ot, Nt, _), Vo(c, !0));
          }
          Xt != u && (m.globalAlpha = Xt = u), Rt("drawSeries", c);
        }
      }), o && (m.globalAlpha = Xt = 1);
    }
  }
  function Uo(o, l) {
    let c = l ? x[o].points : x[o];
    c._stroke = c.stroke(i, o), c._fill = c.fill(i, o);
  }
  function Vo(o, l) {
    let c = l ? x[o].points : x[o], {
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
      let rt = ie - A / 2, st = he - A / 2, X = Qt + A, V = xe + A;
      k = new Path2D(), k.rect(rt, st, X, V);
    }
    l ? ks(y, A, c.dash, c.cap, w, u, d, _, g) : ya(o, y, A, c.dash, c.cap, w, u, d, _, k, g), B && m.translate(-C, -C);
  }
  function ya(o, l, c, u, d, g, _, y, w, A, k) {
    let C = !1;
    w != 0 && Z.forEach((B, rt) => {
      if (B.series[0] == o) {
        let st = x[B.series[1]], X = e[B.series[1]], V = (st._paths || An).band;
        ii(V) && (V = B.dir == 1 ? V[0] : V[1]);
        let O, vt = null;
        st.show && V && iu(X, Ot, Nt) ? (vt = B.fill(i, rt) || g, O = st._paths.clip) : V = null, ks(l, c, u, d, vt, _, y, w, A, k, O, V), C = !0;
      }
    }), C || ks(l, c, u, d, g, _, y, w, A, k);
  }
  const Io = nn | no;
  function ks(o, l, c, u, d, g, _, y, w, A, k, C) {
    Ho(o, l, c, u, d), (w || A || C) && (m.save(), w && m.clip(w), A && m.clip(A)), C ? (y & Io) == Io ? (m.clip(C), k && m.clip(k), Vn(d, _), Un(o, g, l)) : y & no ? (Vn(d, _), m.clip(C), Un(o, g, l)) : y & nn && (m.save(), m.clip(C), k && m.clip(k), Vn(d, _), m.restore(), Un(o, g, l)) : (Vn(d, _), Un(o, g, l)), (w || A || C) && m.restore();
  }
  function Un(o, l, c) {
    c > 0 && (l instanceof Map ? l.forEach((u, d) => {
      m.strokeStyle = Fn = d, m.stroke(u);
    }) : l != null && o && m.stroke(l));
  }
  function Vn(o, l) {
    l instanceof Map ? l.forEach((c, u) => {
      m.fillStyle = Hi = u, m.fill(c);
    }) : l != null && o && m.fill(l);
  }
  function wa(o, l, c, u) {
    let d = R[o], g;
    if (u <= 0)
      g = [0, 0];
    else {
      let _ = d._space = d.space(i, o, l, c, u), y = d._incrs = d.incrs(i, o, l, c, u, _);
      g = Sf(l, c, y, u, _);
    }
    return d._found = g;
  }
  function Ps(o, l, c, u, d, g, _, y, w, A) {
    let k = _ % 2 / 2;
    H == 1 && m.translate(k, k), Ho(y, _, w, A, y), m.beginPath();
    let C, B, rt, st, X = d + (u == 0 || u == 3 ? -g : g);
    c == 0 ? (B = d, st = X) : (C = d, rt = X);
    for (let V = 0; V < o.length; V++)
      l[V] != null && (c == 0 ? C = rt = o[V] : B = st = o[V], m.moveTo(C, B), m.lineTo(rt, st));
    m.stroke(), H == 1 && m.translate(-k, -k);
  }
  function xa(o) {
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
      let C = d.distr == 2, B = c._splits = c.splits(i, u, y, w, A, k, C), rt = d.distr == 2 ? B.map((O) => $e[O]) : B, st = d.distr == 2 ? $e[B[1]] - $e[B[0]] : A, X = c._values = c.values(i, c.filter(i, rt, u, k, st), u, k, st);
      c._rotate = g == 2 ? c.rotate(i, X, u, k) : 0;
      let V = c._size;
      c._size = ve(c.size(i, X, u, o)), V != null && c._size != V && (l = !1);
    }), l;
  }
  function $a(o) {
    let l = !0;
    return No.forEach((c, u) => {
      let d = c(i, u, pi, o);
      d != Je[u] && (l = !1), Je[u] = d;
    }), l;
  }
  function Sa() {
    for (let o = 0; o < R.length; o++) {
      let l = R[o];
      if (!l.show || !l._show)
        continue;
      let c = l.side, u = c % 2, d, g, _ = l.stroke(i, o), y = c == 0 || c == 3 ? -1 : 1, [w, A] = l._found;
      if (l.label != null) {
        let Kt = l.labelGap * y, oe = Mt((l._lpos + Kt) * lt);
        Ro(l.labelFont[0], _, "center", c == 2 ? vn : yr), m.save(), u == 1 ? (d = g = 0, m.translate(
          oe,
          Mt(he + xe / 2)
        ), m.rotate((c == 3 ? -Zn : Zn) / 2)) : (d = Mt(ie + Qt / 2), g = oe);
        let bi = El(l.label) ? l.label(i, o, w, A) : l.label;
        m.fillText(bi, d, g), m.restore();
      }
      if (A == 0)
        continue;
      let k = $[l.scale], C = u == 0 ? Qt : xe, B = u == 0 ? ie : he, rt = l._splits, st = k.distr == 2 ? rt.map((Kt) => $e[Kt]) : rt, X = k.distr == 2 ? $e[rt[1]] - $e[rt[0]] : w, V = l.ticks, O = l.border, vt = V.show ? V.size : 0, St = Mt(vt * lt), Ft = Mt((l.alignTo == 2 ? l._size - vt - l.gap : l.gap) * lt), ht = l._rotate * -Zn / 180, At = U(l._pos * lt), ne = (St + Ft) * y, Yt = At + ne;
      g = u == 0 ? Yt : 0, d = u == 1 ? Yt : 0;
      let me = l.font[0], Se = l.align == 1 ? Yi : l.align == 2 ? Vs : ht > 0 ? Yi : ht < 0 ? Vs : u == 0 ? "center" : c == 3 ? Vs : Yi, Le = ht || u == 1 ? "middle" : c == 2 ? vn : yr;
      Ro(me, _, Se, Le);
      let se = l.font[1] * l.lineGap, ge = rt.map((Kt) => U(f(Kt, k, C, B))), Ae = l._values;
      for (let Kt = 0; Kt < Ae.length; Kt++) {
        let oe = Ae[Kt];
        if (oe != null) {
          u == 0 ? d = ge[Kt] : g = ge[Kt], oe = "" + oe;
          let bi = oe.indexOf(`
`) == -1 ? [oe] : oe.split(/\n/gm);
          for (let qt = 0; qt < bi.length; qt++) {
            let lr = bi[qt];
            ht ? (m.save(), m.translate(d, g + qt * se), m.rotate(ht), m.fillText(lr, 0, 0), m.restore()) : m.fillText(lr, d, g + qt * se);
          }
        }
      }
      V.show && Ps(
        ge,
        V.filter(i, st, o, A, X),
        u,
        c,
        At,
        St,
        pt(V.width * lt, 3),
        V.stroke(i, o),
        V.dash,
        V.cap
      );
      let He = l.grid;
      He.show && Ps(
        ge,
        He.filter(i, st, o, A, X),
        u,
        u == 0 ? 2 : 1,
        u == 0 ? he : ie,
        u == 0 ? xe : Qt,
        pt(He.width * lt, 3),
        He.stroke(i, o),
        He.dash,
        He.cap
      ), O.show && Ps(
        [At],
        [1],
        u == 0 ? 1 : 0,
        u == 0 ? 1 : 2,
        u == 1 ? he : ie,
        u == 1 ? xe : Qt,
        pt(O.width * lt, 3),
        O.stroke(i, o),
        O.dash,
        O.cap
      );
    }
    Rt("drawAxes");
  }
  function Ri(o) {
    x.forEach((l, c) => {
      c > 0 && (l._paths = null, o && (s == 1 ? (l.min = null, l.max = null) : l.facets.forEach((u) => {
        u.min = null, u.max = null;
      })));
    });
  }
  let In = !1, Ts = !1, hn = [];
  function Aa() {
    Ts = !1;
    for (let o = 0; o < hn.length; o++)
      Rt(...hn[o]);
    hn.length = 0;
  }
  function Fi() {
    In || (gu(jo), In = !0);
  }
  function Ea(o, l = !1) {
    In = !0, Ts = l, o(i), jo(), l && hn.length > 0 && queueMicrotask(Aa);
  }
  i.batch = Ea;
  function jo() {
    if (gs && (ba(), gs = !1), zi && (ua(), zi = !1), Ln) {
      if (_t(E, Yi, mt), _t(E, vn, Ct), _t(E, yn, K), _t(E, wn, T), _t(P, Yi, mt), _t(P, vn, Ct), _t(P, yn, K), _t(P, wn, T), _t(b, yn, Be), _t(b, wn, ci), v.width = Mt(Be * lt), v.height = Mt(ci * lt), R.forEach(({ _el: o, _show: l, _size: c, _pos: u, side: d }) => {
        if (o != null)
          if (l) {
            let g = d === 3 || d === 0 ? c : 0, _ = d % 2 == 1;
            _t(o, _ ? "left" : "top", u - g), _t(o, _ ? "width" : "height", c), _t(o, _ ? "top" : "left", _ ? Ct : mt), _t(o, _ ? "height" : "width", _ ? T : K), Qs(o, wi);
          } else
            re(o, wi);
      }), Fn = Hi = _s = ws = xs = $s = Ss = As = ys = null, Xt = 1, mn(!0), mt != Mi || Ct != ui || K != ze || T != fi) {
        Ri(!1);
        let o = K / ze, l = T / fi;
        if (Wt && !hi && D.left >= 0) {
          D.left *= o, D.top *= l, Ui && Re(Ui, Mt(D.left), 0, K, T), Vi && Re(Vi, 0, Mt(D.top), K, T);
          for (let c = 0; c < pe.length; c++) {
            let u = pe[c];
            u != null && (Ni[c] *= o, Li[c] *= l, Re(u, ve(Ni[c]), ve(Li[c]), K, T));
          }
        }
        if (bt.show && !Hn && bt.left >= 0 && bt.width > 0) {
          bt.left *= o, bt.width *= o, bt.top *= l, bt.height *= l;
          for (let c in Ns)
            _t(Bi, c, bt[c]);
        }
        Mi = mt, ui = Ct, ze = K, fi = T;
      }
      Rt("setSize"), Ln = !1;
    }
    Be > 0 && ci > 0 && (m.clearRect(0, 0, v.width, v.height), Rt("drawClear"), G.forEach((o) => o()), Rt("draw")), bt.show && Hn && (jn(bt), Hn = !1), Wt && hi && (gi(null, !0, !1), hi = !1), Q.show && Q.live && de && (Ds(), de = !1), h || (h = !0, i.status = 1, Rt("ready")), fn = !1, In = !1;
  }
  i.redraw = (o, l) => {
    zi = l || !1, o !== !1 ? Xe(M, S.min, S.max) : Fi();
  };
  function Cs(o, l) {
    let c = $[o];
    if (c.from == null) {
      if (Ut == 0) {
        let u = c.range(i, l.min, l.max, o);
        l.min = u[0], l.max = u[1];
      }
      if (l.min > l.max) {
        let u = l.min;
        l.min = l.max, l.max = u;
      }
      if (Ut > 1 && l.min != null && l.max != null && l.max - l.min < 1e-16)
        return;
      o == M && c.distr == 2 && Ut > 0 && (l.min = ke(l.min, e[0]), l.max = ke(l.max, e[0]), l.min == l.max && l.max++), L[o] = l, gs = !0, Fi();
    }
  }
  i.setScale = Cs;
  let Ms, zs, Ui, Vi, Bo, Wo, Ii, ji, Go, Yo, gt, xt, Qe = !1;
  const Vt = D.drag;
  let Lt = Vt.x, Ht = Vt.y;
  Wt && (D.x && (Ms = be(Uc, P)), D.y && (zs = be(Vc, P)), S.ori == 0 ? (Ui = Ms, Vi = zs) : (Ui = zs, Vi = Ms), gt = D.left, xt = D.top);
  const bt = i.select = kt({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, t.select), Bi = bt.show ? be(Fc, bt.over ? P : E) : null;
  function jn(o, l) {
    if (bt.show) {
      for (let c in o)
        bt[c] = o[c], c in Ns && _t(Bi, c, o[c]);
      l !== !1 && Rt("setSelect");
    }
  }
  i.setSelect = jn;
  function ka(o) {
    if (x[o].show)
      Tt && Qs($t[o], wi);
    else if (Tt && re($t[o], wi), Wt) {
      let c = Oi ? pe[0] : pe[o];
      c != null && Re(c, -10, -10, K, T);
    }
  }
  function Xe(o, l, c) {
    Cs(o, { min: l, max: c });
  }
  function Oe(o, l, c, u) {
    l.focus != null && za(o), l.show != null && x.forEach((d, g) => {
      g > 0 && (o == g || o == null) && (d.show = l.show, ka(g), s == 2 ? (Xe(d.facets[0].scale, null, null), Xe(d.facets[1].scale, null, null)) : Xe(d.scale, null, null), Fi());
    }), c !== !1 && Rt("setSeries", o, l), u && gn("setSeries", i, o, l);
  }
  i.setSeries = Oe;
  function Pa(o, l) {
    kt(Z[o], l);
  }
  function Ta(o, l) {
    o.fill = et(o.fill || null), o.dir = ot(o.dir, -1), l = l ?? Z.length, Z.splice(l, 0, o);
  }
  function Ca(o) {
    o == null ? Z.length = 0 : Z.splice(o, 1);
  }
  i.addBand = Ta, i.setBand = Pa, i.delBand = Ca;
  function Ma(o, l) {
    x[o].alpha = l, Wt && pe[o] != null && (pe[o].style.opacity = l), Tt && $t[o] && ($t[o].style.opacity = l);
  }
  let We, ti, mi;
  const Wi = { focus: !0 };
  function za(o) {
    if (o != mi) {
      let l = o == null, c = De.alpha != 1;
      x.forEach((u, d) => {
        if (s == 1 || d > 0) {
          let g = l || d == 0 || d == o;
          u._focus = l ? null : g, c && Ma(d, g ? 1 : De.alpha);
        }
      }), mi = o, c && Fi();
    }
  }
  Tt && Di && Gt(Sr, ct, (o) => {
    D._lock || (di(o), mi != null && Oe(null, Wi, !0, Et.setSeries));
  });
  function Ne(o, l, c) {
    let u = $[l];
    c && (o = o / lt - (u.ori == 1 ? Ct : mt));
    let d = K;
    u.ori == 1 && (d = T, o = d - o), u.dir == -1 && (o = d - o);
    let g = u._min, _ = u._max, y = o / d, w = g + (_ - g) * y, A = u.distr;
    return A == 3 ? Xi(10, w) : A == 4 ? su(w, u.asinh) : A == 100 ? u.bwd(w) : w;
  }
  function Da(o, l) {
    let c = Ne(o, M, l);
    return ke(c, e[0], Ot, Nt);
  }
  i.valToIdx = (o) => ke(o, e[0]), i.posToIdx = Da, i.posToVal = Ne, i.valToPos = (o, l, c) => $[l].ori == 0 ? r(
    o,
    $[l],
    c ? Qt : K,
    c ? ie : 0
  ) : a(
    o,
    $[l],
    c ? xe : T,
    c ? he : 0
  ), i.setCursor = (o, l, c) => {
    gt = o.left, xt = o.top, gi(null, l, c);
  };
  function Ko(o, l) {
    _t(Bi, Yi, bt.left = o), _t(Bi, yn, bt.width = l);
  }
  function qo(o, l) {
    _t(Bi, vn, bt.top = o), _t(Bi, wn, bt.height = l);
  }
  let dn = S.ori == 0 ? Ko : qo, pn = S.ori == 1 ? Ko : qo;
  function Oa() {
    if (Tt && Q.live)
      for (let o = s == 2 ? 1 : 0; o < x.length; o++) {
        if (o == 0 && fe)
          continue;
        let l = Q.values[o], c = 0;
        for (let u in l)
          Me[o][c++].firstChild.nodeValue = l[u];
      }
  }
  function Ds(o, l) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, u) => {
      ft[u] = c;
    }) : au(o.idx) || ft.fill(o.idx), Q.idx = ft[0]), Tt && Q.live) {
      for (let c = 0; c < x.length; c++)
        (c > 0 || s == 1 && !fe) && Na(c, ft[c]);
      Oa();
    }
    de = !1, l !== !1 && Rt("setLegend");
  }
  i.setLegend = Ds;
  function Na(o, l) {
    let c = x[o], u = o == 0 && q == 2 ? $e : e[o], d;
    fe ? d = c.values(i, o, l) ?? Ze : (d = c.value(i, l == null ? null : u[l], o, l), d = d == null ? Ze : { _: d }), Q.values[o] = d;
  }
  function gi(o, l, c) {
    Go = gt, Yo = xt, [gt, xt] = D.move(i, gt, xt), D.left = gt, D.top = xt, Wt && (Ui && Re(Ui, Mt(gt), 0, K, T), Vi && Re(Vi, 0, Mt(xt), K, T));
    let u, d = Ot > Nt;
    We = dt, ti = null;
    let g = S.ori == 0 ? K : T, _ = S.ori == 1 ? K : T;
    if (gt < 0 || Ut == 0 || d) {
      u = D.idx = null;
      for (let y = 0; y < x.length; y++) {
        let w = pe[y];
        w != null && Re(w, -10, -10, K, T);
      }
      Di && Oe(null, Wi, !0, o == null && Et.setSeries), Q.live && (ft.fill(u), de = !0);
    } else {
      let y, w, A;
      s == 1 && (y = S.ori == 0 ? gt : xt, w = Ne(y, M), u = D.idx = ke(w, e[0], Ot, Nt), A = z(e[0][u], S, g, 0));
      let k = -10, C = -10, B = 0, rt = 0, st = !0, X = "", V = "";
      for (let O = s == 2 ? 1 : 0; O < x.length; O++) {
        let vt = x[O], St = ft[O], Ft = St == null ? null : s == 1 ? e[O][St] : e[O][1][St], ht = D.dataIdx(i, O, u, w), At = ht == null ? null : s == 1 ? e[O][ht] : e[O][1][ht];
        if (de = de || At != Ft || ht != St, ft[O] = ht, O > 0 && vt.show) {
          let ne = ht == null ? -10 : ht == u ? A : z(s == 1 ? e[0][ht] : e[O][0][ht], S, g, 0), Yt = At == null ? -10 : j(At, s == 1 ? $[vt.scale] : $[vt.facets[1].scale], _, 0);
          if (Di && At != null) {
            let me = S.ori == 1 ? gt : xt, Se = zt(De.dist(i, O, ht, Yt, me));
            if (Se < We) {
              let Le = De.bias;
              if (Le != 0) {
                let se = Ne(me, vt.scale), ge = At >= 0 ? 1 : -1, Ae = se >= 0 ? 1 : -1;
                Ae == ge && (Ae == 1 ? Le == 1 ? At >= se : At <= se : (
                  // >= 0
                  Le == 1 ? At <= se : At >= se
                )) && (We = Se, ti = O);
              } else
                We = Se, ti = O;
            }
          }
          if (de || Oi) {
            let me, Se;
            S.ori == 0 ? (me = ne, Se = Yt) : (me = Yt, Se = ne);
            let Le, se, ge, Ae, He, Kt, oe = !0, bi = jt.bbox;
            if (bi != null) {
              oe = !1;
              let qt = bi(i, O);
              ge = qt.left, Ae = qt.top, Le = qt.width, se = qt.height;
            } else
              ge = me, Ae = Se, Le = se = jt.size(i, O);
            if (Kt = jt.fill(i, O), He = jt.stroke(i, O), Oi)
              O == ti && We <= De.prox && (k = ge, C = Ae, B = Le, rt = se, st = oe, X = Kt, V = He);
            else {
              let qt = pe[O];
              qt != null && (Ni[O] = ge, Li[O] = Ae, Mr(qt, Le, se, oe), Tr(qt, Kt, He), Re(qt, ve(ge), ve(Ae), K, T));
            }
          }
        }
      }
      if (Oi) {
        let O = De.prox, vt = mi == null ? We <= O : We > O || ti != mi;
        if (de || vt) {
          let St = pe[0];
          St != null && (Ni[0] = k, Li[0] = C, Mr(St, B, rt, st), Tr(St, X, V), Re(St, ve(k), ve(C), K, T));
        }
      }
    }
    if (bt.show && Qe)
      if (o != null) {
        let [y, w] = Et.scales, [A, k] = Et.match, [C, B] = o.cursor.sync.scales, rt = o.cursor.drag;
        if (Lt = rt._x, Ht = rt._y, Lt || Ht) {
          let { left: st, top: X, width: V, height: O } = o.select, vt = o.scales[C].ori, St = o.posToVal, Ft, ht, At, ne, Yt, me = y != null && A(y, C), Se = w != null && k(w, B);
          me && Lt ? (vt == 0 ? (Ft = st, ht = V) : (Ft = X, ht = O), At = $[y], ne = z(St(Ft, C), At, g, 0), Yt = z(St(Ft + ht, C), At, g, 0), dn(Pe(ne, Yt), zt(Yt - ne))) : dn(0, g), Se && Ht ? (vt == 1 ? (Ft = st, ht = V) : (Ft = X, ht = O), At = $[w], ne = j(St(Ft, B), At, _, 0), Yt = j(St(Ft + ht, B), At, _, 0), pn(Pe(ne, Yt), zt(Yt - ne))) : pn(0, _);
        } else
          Ls();
      } else {
        let y = zt(Go - Bo), w = zt(Yo - Wo);
        if (S.ori == 1) {
          let B = y;
          y = w, w = B;
        }
        Lt = Vt.x && y >= Vt.dist, Ht = Vt.y && w >= Vt.dist;
        let A = Vt.uni;
        A != null ? Lt && Ht && (Lt = y >= A, Ht = w >= A, !Lt && !Ht && (w > y ? Ht = !0 : Lt = !0)) : Vt.x && Vt.y && (Lt || Ht) && (Lt = Ht = !0);
        let k, C;
        Lt && (S.ori == 0 ? (k = Ii, C = gt) : (k = ji, C = xt), dn(Pe(k, C), zt(C - k)), Ht || pn(0, _)), Ht && (S.ori == 1 ? (k = Ii, C = gt) : (k = ji, C = xt), pn(Pe(k, C), zt(C - k)), Lt || dn(0, g)), !Lt && !Ht && (dn(0, 0), pn(0, 0));
      }
    if (Vt._x = Lt, Vt._y = Ht, o == null) {
      if (c) {
        if (rr != null) {
          let [y, w] = Et.scales;
          Et.values[0] = y != null ? Ne(S.ori == 0 ? gt : xt, y) : null, Et.values[1] = w != null ? Ne(S.ori == 1 ? gt : xt, w) : null;
        }
        gn(Is, i, gt, xt, K, T, u);
      }
      if (Di) {
        let y = c && Et.setSeries, w = De.prox;
        mi == null ? We <= w && Oe(ti, Wi, !0, y) : We > w ? Oe(null, Wi, !0, y) : ti != mi && Oe(ti, Wi, !0, y);
      }
    }
    de && (Q.idx = u, Ds()), l !== !1 && Rt("setCursor");
  }
  let ei = null;
  Object.defineProperty(i, "rect", {
    get() {
      return ei == null && mn(!1), ei;
    }
  });
  function mn(o = !1) {
    o ? ei = null : (ei = P.getBoundingClientRect(), Rt("syncRect", ei));
  }
  function Zo(o, l, c, u, d, g, _) {
    D._lock || Qe && o != null && o.movementX == 0 && o.movementY == 0 || (Os(o, l, c, u, d, g, _, !1, o != null), o != null ? gi(null, !0, !0) : gi(l, !0, !1));
  }
  function Os(o, l, c, u, d, g, _, y, w) {
    if (ei == null && mn(!1), di(o), o != null)
      c = o.clientX - ei.left, u = o.clientY - ei.top;
    else {
      if (c < 0 || u < 0) {
        gt = -10, xt = -10;
        return;
      }
      let [A, k] = Et.scales, C = l.cursor.sync, [B, rt] = C.values, [st, X] = C.scales, [V, O] = Et.match, vt = l.axes[0].side % 2 == 1, St = S.ori == 0 ? K : T, Ft = S.ori == 1 ? K : T, ht = vt ? g : d, At = vt ? d : g, ne = vt ? u : c, Yt = vt ? c : u;
      if (st != null ? c = V(A, st) ? f(B, $[A], St, 0) : -10 : c = St * (ne / ht), X != null ? u = O(k, X) ? f(rt, $[k], Ft, 0) : -10 : u = Ft * (Yt / At), S.ori == 1) {
        let me = c;
        c = u, u = me;
      }
    }
    w && (l == null || l.cursor.event.type == Is) && ((c <= 1 || c >= K - 1) && (c = _i(c, K)), (u <= 1 || u >= T - 1) && (u = _i(u, T))), y ? (Bo = c, Wo = u, [Ii, ji] = D.move(i, c, u)) : (gt = c, xt = u);
  }
  const Ns = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function Ls() {
    jn(Ns, !1);
  }
  let Jo, Qo, Xo, tr;
  function er(o, l, c, u, d, g, _) {
    Qe = !0, Lt = Ht = Vt._x = Vt._y = !1, Os(o, l, c, u, d, g, _, !0, !1), o != null && (Gt(js, Zs, ir, !1), gn(xr, i, Ii, ji, K, T, null));
    let { left: y, top: w, width: A, height: k } = bt;
    Jo = y, Qo = w, Xo = A, tr = k;
  }
  function ir(o, l, c, u, d, g, _) {
    Qe = Vt._x = Vt._y = !1, Os(o, l, c, u, d, g, _, !1, !0);
    let { left: y, top: w, width: A, height: k } = bt, C = A > 0 || k > 0, B = Jo != y || Qo != w || Xo != A || tr != k;
    if (C && B && jn(bt), Vt.setScale && C && B) {
      let rt = y, st = A, X = w, V = k;
      if (S.ori == 1 && (rt = w, st = k, X = y, V = A), Lt && Xe(
        M,
        Ne(rt, M),
        Ne(rt + st, M)
      ), Ht)
        for (let O in $) {
          let vt = $[O];
          O != M && vt.from == null && vt.min != dt && Xe(
            O,
            Ne(X + V, O),
            Ne(X, O)
          );
        }
      Ls();
    } else D.lock && (D._lock = !D._lock, gi(l, !0, o != null));
    o != null && (Ci(js, Zs), gn(js, i, gt, xt, K, T, null));
  }
  function La(o, l, c, u, d, g, _) {
    if (D._lock)
      return;
    di(o);
    let y = Qe;
    if (Qe) {
      let w = !0, A = !0, k = 10, C, B;
      S.ori == 0 ? (C = Lt, B = Ht) : (C = Ht, B = Lt), C && B && (w = gt <= k || gt >= K - k, A = xt <= k || xt >= T - k), C && w && (gt = gt < Ii ? 0 : K), B && A && (xt = xt < ji ? 0 : T), gi(null, !0, !0), Qe = !1;
    }
    gt = -10, xt = -10, ft.fill(null), gi(null, !0, !0), y && (Qe = y);
  }
  function nr(o, l, c, u, d, g, _) {
    D._lock || (di(o), vs(), Ls(), o != null && gn(Ar, i, gt, xt, K, T, null));
  }
  function sr() {
    R.forEach(Af), bs(i.width, i.height, !0);
  }
  $i(ts, Zi, sr);
  const Gi = {};
  Gi.mousedown = er, Gi.mousemove = Zo, Gi.mouseup = ir, Gi.dblclick = nr, Gi.setSeries = (o, l, c, u) => {
    let d = Et.match[2];
    c = d(i, l, c), c != -1 && Oe(c, u, !0, !1);
  }, Wt && (Gt(xr, P, er), Gt(Is, P, Zo), Gt($r, P, (o) => {
    di(o), mn(!1);
  }), Gt(Sr, P, La), Gt(Ar, P, nr), so.add(i), i.syncRect = mn);
  const Bn = i.hooks = t.hooks || {};
  function Rt(o, l, c) {
    Ts ? hn.push([o, l, c]) : o in Bn && Bn[o].forEach((u) => {
      u.call(null, i, l, c);
    });
  }
  (t.plugins || []).forEach((o) => {
    for (let l in o.hooks)
      Bn[l] = (Bn[l] || []).concat(o.hooks[l]);
  });
  const or = (o, l, c) => c, Et = kt({
    key: null,
    setSeries: !1,
    filters: {
      pub: Lr,
      sub: Lr
    },
    scales: [M, x[1] ? x[1].scale : null],
    match: [Hr, Hr, or],
    values: [null, null]
  }, D.sync);
  Et.match.length == 2 && Et.match.push(or), D.sync = Et;
  const rr = Et.key, Hs = Zl(rr);
  function gn(o, l, c, u, d, g, _) {
    Et.filters.pub(o, l, c, u, d, g, _) && Hs.pub(o, l, c, u, d, g, _);
  }
  Hs.sub(i);
  function Ha(o, l, c, u, d, g, _) {
    Et.filters.sub(o, l, c, u, d, g, _) && Gi[o](null, l, c, u, d, g, _);
  }
  i.pub = Ha;
  function Ra() {
    Hs.unsub(i), so.delete(i), ai.clear(), Xs(ts, Zi, sr), p.remove(), ct?.remove(), Rt("destroy");
  }
  i.destroy = Ra;
  function Rs() {
    Rt("init", t, e), Lo(e || t.data, !1), L[M] ? Cs(M, L[M]) : vs(), Hn = bt.show && (bt.width > 0 || bt.height > 0), hi = de = !0, bs(t.width, t.height);
  }
  return x.forEach(Oo), R.forEach(ga), n ? n instanceof HTMLElement ? (n.appendChild(p), Rs()) : n(i, Rs) : Rs(), i;
}
Bt.assign = kt;
Bt.fmtNum = wo;
Bt.rangeNum = es;
Bt.rangeLog = as;
Bt.rangeAsinh = _o;
Bt.orient = ki;
Bt.pxRatio = lt;
Bt.join = mu;
Bt.fmtDate = $o, Bt.tzDate = Eu;
Bt.sync = Zl;
{
  Bt.addGap = cf, Bt.clipGaps = fs;
  let t = Bt.paths = {
    points: ia
  };
  t.linear = sa, t.stepped = hf, t.bars = df, t.spline = mf;
}
const Ef = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var kf = Object.defineProperty, Pf = Object.getOwnPropertyDescriptor, Ve = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Pf(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && kf(e, n, s), s;
};
const Tf = 24;
let _e = class extends It {
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
    for (const r of t) for (const [a] of r) n.add(a);
    if (n.size === 0) return [[e], ...t.map(() => [null])];
    const i = [...n].sort((r, a) => r - a), s = t.map((r) => {
      let a = -1, f = null;
      return i.map((h) => {
        for (; a + 1 < r.length && r[a + 1][0] <= h; )
          a++, f = r[a][1];
        return f;
      });
    });
    return [i, ...s];
  }
  /** Convert the action history into [{start, end, action}] intervals,
   *  filtering out idle/unknown so we only paint heating/cooling. */
  _actionIntervals(t, e) {
    if (!t) return [];
    const n = [...t].sort((s, r) => s.lu - r.lu), i = [];
    for (let s = 0; s < n.length; s++) {
      const r = n[s].lu, a = n[s + 1]?.lu ?? e, f = n[s].s;
      (f === "heating" || f === "cooling") && i.push({ start: r, end: a, action: f });
    }
    return i;
  }
  _renderPlot(t) {
    if (!this._host) return;
    const e = Math.floor(Date.now() / 1e3), n = this._numericSeries(t[this.roomEntity]), i = this._numericSeries(t[this.lowEntity]), s = this._numericSeries(t[this.highEntity]);
    if (this._intervals = this._actionIntervals(t[this.actionEntity], e), n.length === 0 && i.length === 0 && s.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const r = this._alignSeries([n, i, s], e), a = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: a.width, height: a.height }), this._plot.setData(r), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new Bt(a, r, this._host), this._observeResize());
  }
  _buildOpts(t) {
    const e = getComputedStyle(this), n = e.getPropertyValue("--cb-action-heating").trim() || "#d9603f", i = e.getPropertyValue("--cb-action-cooling").trim() || "#2f7fcc", s = e.getPropertyValue("--primary-color").trim() || "#03a9f4";
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
          stroke: s,
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
          (r) => {
            const a = r.ctx;
            if (!a) return;
            const f = r.bbox.top, h = r.bbox.height;
            a.save();
            for (const p of this._intervals) {
              const v = r.valToPos(p.start, "x", !0), m = r.valToPos(p.end, "x", !0);
              m <= v || (a.fillStyle = p.action === "heating" ? ol(n, 0.18) : ol(i, 0.18), a.fillRect(v, f, m - v, h));
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
_e.styles = [
  ce,
  ul(Ef),
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
Ve([
  Y({ attribute: !1 })
], _e.prototype, "hass", 2);
Ve([
  Y({ type: String })
], _e.prototype, "roomEntity", 2);
Ve([
  Y({ type: String })
], _e.prototype, "lowEntity", 2);
Ve([
  Y({ type: String })
], _e.prototype, "highEntity", 2);
Ve([
  Y({ type: String })
], _e.prototype, "actionEntity", 2);
Ve([
  Pt()
], _e.prototype, "_loading", 2);
Ve([
  Pt()
], _e.prototype, "_error", 2);
Ve([
  Pt()
], _e.prototype, "_empty", 2);
Ve([
  Dn(".chart-host")
], _e.prototype, "_host", 2);
_e = Ve([
  ae("comfort-band-history-chart")
], _e);
function ol(t, e) {
  const n = t.trim(), i = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(n);
  if (i) {
    let r = i[1];
    r.length === 3 && (r = r.replace(/(.)/g, "$1$1"));
    const a = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), h = parseInt(r.slice(4, 6), 16);
    return `rgba(${a}, ${f}, ${h}, ${e})`;
  }
  const s = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return s ? `rgba(${s[1]}, ${s[2]}, ${s[3]}, ${e})` : n;
}
var Cf = Object.defineProperty, Mf = Object.getOwnPropertyDescriptor, Co = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Mf(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Cf(e, n, s), s;
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
Co([
  Y({ attribute: !1 })
], Cn.prototype, "hass", 2);
Co([
  Y({ attribute: !1 })
], Cn.prototype, "entities", 2);
Cn = Co([
  ae("comfort-band-insights-tab")
], Cn);
var zf = Object.defineProperty, Df = Object.getOwnPropertyDescriptor, aa = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Df(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && zf(e, n, s), s;
};
const Of = 500, Nf = 1.5, Lf = 15, rl = [0, 6, 12, 18, 24];
function ll(t) {
  const e = /^(\d{1,2}):(\d{2})$/.exec(t);
  return e ? parseInt(e[1], 10) * 60 + parseInt(e[2], 10) : 0;
}
function Hf(t) {
  const e = Math.max(0, Math.min(1439, t)), n = Math.floor(e / 60), i = e % 60;
  return `${n.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
}
function Ks(t) {
  return t / (24 * 60) * 100;
}
function Rf(t, e) {
  return Math.round(t / e) * e;
}
let ns = class extends It {
  constructor() {
    super(...arguments), this.transitions = [], this._longPressTimer = null, this._onTrackTap = (t) => {
      if (t.target.classList.contains("point")) return;
      const e = this.shadowRoot?.querySelector(".track");
      if (!e) return;
      const n = e.getBoundingClientRect(), i = this._xToMinutes(t.clientX, n);
      for (const s of this.transitions) {
        const r = ll(s.at);
        if (Math.abs(Ks(r) - Ks(i)) < Nf) return;
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
      const s = () => {
        n.removeEventListener("pointerup", s), n.removeEventListener("pointercancel", s), n.removeEventListener("pointerleave", s), this._longPressTimer !== null && (window.clearTimeout(this._longPressTimer), this._longPressTimer = null, i || this._onPointTap(e));
      };
      n.addEventListener("pointerup", s), n.addEventListener("pointercancel", s), n.addEventListener("pointerleave", s);
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
        ${rl.map((t, e) => {
      const n = e === 0 ? "hour-tick start" : e === rl.length - 1 ? "hour-tick terminal" : "hour-tick";
      return F`<div class=${n} style="left:${t / 24 * 100}%">${t}h</div>`;
    })}
        ${this.transitions.map((t) => {
      const e = ll(t.at), n = Ks(e), i = `Transition at ${t.at}, low ${t.low.toFixed(1)} degrees, high ${t.high.toFixed(1)} degrees. Tap to edit, long-press or Delete to remove.`;
      return F`
            <button
              class="point"
              role="button"
              style="left:${n}%"
              tabindex="0"
              aria-label=${i}
              data-at=${t.at}
              @pointerdown=${(s) => this._onPointPointerDown(s, t)}
              @keydown=${(s) => this._onPointKeyDown(s, t)}
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
ns.styles = [
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
  Y({ type: Array })
], ns.prototype, "transitions", 2);
ns = aa([
  ae("timeline-editor")
], ns);
var Ff = Object.defineProperty, Uf = Object.getOwnPropertyDescriptor, ri = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Uf(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Ff(e, n, s), s;
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
ri([
  Y({ type: Object })
], Fe.prototype, "transition", 2);
ri([
  Y({ type: Boolean })
], Fe.prototype, "isNew", 2);
ri([
  Pt()
], Fe.prototype, "_at", 2);
ri([
  Pt()
], Fe.prototype, "_low", 2);
ri([
  Pt()
], Fe.prototype, "_high", 2);
ri([
  Pt()
], Fe.prototype, "_error", 2);
ri([
  Dn('input[name="at"]')
], Fe.prototype, "_atInput", 2);
Fe = ri([
  ae("transition-edit-dialog")
], Fe);
var Vf = Object.defineProperty, If = Object.getOwnPropertyDescriptor, Ie = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? If(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Vf(e, n, s), s;
};
let ye = class extends It {
  constructor() {
    super(...arguments), this.zone = "", this._profile = "", this._transitions = [], this._loading = !1, this._error = null, this._mode = "list", this._editing = null, this._newAt = "06:00", this._subscribeGen = 0, this._onAdd = (t) => {
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
        for (const s of this._transitions)
          s.at !== i && s.at !== e.at && n.push(s);
        n.push(e);
      } else {
        for (const i of this._transitions)
          i.at !== e.at && n.push(i);
        n.push(e);
      }
      n.sort((i, s) => i.at.localeCompare(s.at)), await this._writeSchedule(n), this._mode = "list", this._editing = null;
    }, this._onDialogDelete = async (t) => {
      const e = this._transitions.filter((n) => n.at !== t.detail.at);
      await this._writeSchedule(e), this._mode = "list", this._editing = null;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null;
    };
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._profile === "" && (this._profile = al(this.hass) ?? "home", this._subscribe());
  }
  updated(t) {
    if (t.has("hass") && this.hass) {
      const e = al(this.hass);
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
    if (!this.hass || !this.zone || !this._profile) return;
    const t = ++this._subscribeGen;
    this._transitions.length === 0 && (this._loading = !0), this._error = null;
    try {
      const e = await gc(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (n) => {
          t === this._subscribeGen && (this._transitions = n?.baseline ? [...n.baseline] : [], this._loading = !1);
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
  async _resubscribe() {
    this._unsubscribe(), await this._subscribe();
  }
  async _writeSchedule(t) {
    if (this.hass)
      try {
        await bc(this.hass, {
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
ye.styles = [
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
Ie([
  Y({ attribute: !1 })
], ye.prototype, "hass", 2);
Ie([
  Y({ type: String })
], ye.prototype, "zone", 2);
Ie([
  Pt()
], ye.prototype, "_profile", 2);
Ie([
  Pt()
], ye.prototype, "_transitions", 2);
Ie([
  Pt()
], ye.prototype, "_loading", 2);
Ie([
  Pt()
], ye.prototype, "_error", 2);
Ie([
  Pt()
], ye.prototype, "_mode", 2);
Ie([
  Pt()
], ye.prototype, "_editing", 2);
Ie([
  Pt()
], ye.prototype, "_newAt", 2);
ye = Ie([
  ae("comfort-band-schedule-tab")
], ye);
function al(t) {
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
  for (var s = i > 1 ? void 0 : i ? Gf(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Wf(e, n, s), s;
};
const Yf = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "insights", label: "Insights" }
];
let Ue = class extends It {
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
Ue.styles = [
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
  Y({ attribute: !1 })
], Ue.prototype, "hass", 2);
li([
  Y({ type: String })
], Ue.prototype, "zone", 2);
li([
  Y({ type: String })
], Ue.prototype, "zoneName", 2);
li([
  Y({ attribute: !1 })
], Ue.prototype, "entities", 2);
li([
  Pt()
], Ue.prototype, "_activeTab", 2);
li([
  Pt()
], Ue.prototype, "_isOpen", 2);
li([
  Dn("dialog")
], Ue.prototype, "_dialog", 2);
Ue = li([
  ae("comfort-band-modal")
], Ue);
var Kf = Object.defineProperty, qf = Object.getOwnPropertyDescriptor, Mo = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? qf(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Kf(e, n, s), s;
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
    };
  }
  setConfig(t) {
    this.config = {
      type: t.type ?? "custom:comfort-band-card",
      zone: t.zone ?? "",
      ...t.compact !== void 0 ? { compact: t.compact } : {}
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
    return t.length === 0 ? F`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>` : F`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? F`<option value="" disabled selected>Select a zone…</option>` : null}
          ${t.map(
      (e) => F` <option value=${e} ?selected=${e === this.config.zone}>${e}</option> `
    )}
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
Mo([
  Y({ attribute: !1 })
], Mn.prototype, "hass", 2);
Mo([
  Y({ attribute: !1 })
], Mn.prototype, "config", 2);
Mn = Mo([
  ae("comfort-band-card-editor")
], Mn);
var Zf = Object.defineProperty, Jf = Object.getOwnPropertyDescriptor, ms = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Jf(e, n) : e, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (s = (i ? a(e, n, s) : a(s)) || s);
  return i && s && Zf(e, n, s), s;
};
let sn = class extends It {
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
    return 2;
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
        for (const [i, s] of n.identifiers)
          if (i === "comfort_band" && s.startsWith("zone:")) {
            e = s.slice(5);
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
    const n = this._config.compact === !0, i = this._buildView(this.hass, e);
    return F`
      <comfort-band-tile
        zoneName=${i.zoneName}
        .roomTemp=${i.roomTemp}
        .low=${i.low}
        .high=${i.high}
        .action=${i.action}
        .overrideActive=${i.overrideActive}
        .overrideEnds=${i.overrideEnds}
        .noExpand=${n}
        @comfort-band-tile-tap=${this._onTileTap}
      ></comfort-band-tile>
      ${n ? null : F`<comfort-band-modal
            .hass=${this.hass}
            zone=${t}
            zoneName=${i.zoneName}
            .entities=${e}
          ></comfort-band-modal>`}
    `;
  }
  _buildView(t, e) {
    const n = (s) => s !== null ? t.states[s] : void 0, i = (s) => {
      const r = n(s);
      if (!r) return NaN;
      const a = parseFloat(r.state);
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
sn.styles = [
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
ms([
  Y({ attribute: !1 })
], sn.prototype, "hass", 2);
ms([
  Pt()
], sn.prototype, "_config", 2);
ms([
  Dn("comfort-band-modal")
], sn.prototype, "_modal", 2);
sn = ms([
  ae("comfort-band-card")
], sn);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.2.0 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
