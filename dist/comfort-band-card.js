const gr = globalThis, zo = gr.ShadowRoot && (gr.ShadyCSS === void 0 || gr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Oo = Symbol(), zs = /* @__PURE__ */ new WeakMap();
let Hl = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Oo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (zo && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = zs.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && zs.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const No = (e) => new Hl(typeof e == "string" ? e : e + "", void 0, Oo), je = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, r, s) => n + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[s + 1], e[0]);
  return new Hl(i, e, Oo);
}, cc = (e, t) => {
  if (zo) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), r = gr.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, e.appendChild(n);
  }
}, Os = zo ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return No(i);
})(e) : e;
const { is: uc, defineProperty: hc, getOwnPropertyDescriptor: dc, getOwnPropertyNames: fc, getOwnPropertySymbols: pc, getPrototypeOf: gc } = Object, Sr = globalThis, Ns = Sr.trustedTypes, mc = Ns ? Ns.emptyScript : "", bc = Sr.reactiveElementPolyfillSupport, Vn = (e, t) => e, br = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? mc : null;
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
} }, Ho = (e, t) => !uc(e, t), Hs = { attribute: !0, type: String, converter: br, reflect: !1, useDefault: !1, hasChanged: Ho };
Symbol.metadata ??= Symbol("metadata"), Sr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let hn = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Hs) {
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
      const u = r?.call(this);
      s?.call(this, l), this.requestUpdate(t, u, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Hs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Vn("elementProperties"))) return;
    const t = gc(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Vn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Vn("properties"))) {
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
      for (const r of n) i.unshift(Os(r));
    } else t !== void 0 && i.push(Os(t));
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : br).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const s = n.getPropertyOptions(r), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : br;
      this._$Em = r;
      const u = l.fromAttribute(i, s.type);
      this[r] = u ?? this._$Ej?.get(r) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, r = !1, s) {
    if (t !== void 0) {
      const l = this.constructor;
      if (r === !1 && (s = this[t]), n ??= l.getPropertyOptions(t), !((n.hasChanged ?? Ho)(s, i) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, n)))) return;
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
        const { wrapped: l } = s, u = this[r];
        l !== !0 || this._$AL.has(r) || u === void 0 || this.C(r, void 0, s, u);
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
hn.elementStyles = [], hn.shadowRootOptions = { mode: "open" }, hn[Vn("elementProperties")] = /* @__PURE__ */ new Map(), hn[Vn("finalized")] = /* @__PURE__ */ new Map(), bc?.({ ReactiveElement: hn }), (Sr.reactiveElementVersions ??= []).push("2.1.2");
const Lo = globalThis, Ls = (e) => e, _r = Lo.trustedTypes, Rs = _r ? _r.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ll = "$lit$", di = `lit$${Math.random().toFixed(9).slice(2)}$`, Rl = "?" + di, _c = `<${Rl}>`, Ri = document, Yn = () => Ri.createComment(""), Kn = (e) => e === null || typeof e != "object" && typeof e != "function", Ro = Array.isArray, vc = (e) => Ro(e) || typeof e?.[Symbol.iterator] == "function", oo = `[ 	
\f\r]`, Ln = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fs = /-->/g, Is = />/g, Di = RegExp(`>|${oo}(?:([^\\s"'>=/]+)(${oo}*=${oo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Bs = /'/g, Us = /"/g, Fl = /^(?:script|style|textarea|title)$/i, Il = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), $ = Il(1), fi = Il(2), pn = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), js = /* @__PURE__ */ new WeakMap(), Hi = Ri.createTreeWalker(Ri, 129);
function Bl(e, t) {
  if (!Ro(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rs !== void 0 ? Rs.createHTML(t) : t;
}
const yc = (e, t) => {
  const i = e.length - 1, n = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Ln;
  for (let u = 0; u < i; u++) {
    const d = e[u];
    let f, b, g = -1, _ = 0;
    for (; _ < d.length && (l.lastIndex = _, b = l.exec(d), b !== null); ) _ = l.lastIndex, l === Ln ? b[1] === "!--" ? l = Fs : b[1] !== void 0 ? l = Is : b[2] !== void 0 ? (Fl.test(b[2]) && (r = RegExp("</" + b[2], "g")), l = Di) : b[3] !== void 0 && (l = Di) : l === Di ? b[0] === ">" ? (l = r ?? Ln, g = -1) : b[1] === void 0 ? g = -2 : (g = l.lastIndex - b[2].length, f = b[1], l = b[3] === void 0 ? Di : b[3] === '"' ? Us : Bs) : l === Us || l === Bs ? l = Di : l === Fs || l === Is ? l = Ln : (l = Di, r = void 0);
    const S = l === Di && e[u + 1].startsWith("/>") ? " " : "";
    s += l === Ln ? d + _c : g >= 0 ? (n.push(f), d.slice(0, g) + Ll + d.slice(g) + di + S) : d + di + (g === -2 ? u : S);
  }
  return [Bl(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class qn {
  constructor({ strings: t, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let s = 0, l = 0;
    const u = t.length - 1, d = this.parts, [f, b] = yc(t, i);
    if (this.el = qn.createElement(f, n), Hi.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Hi.nextNode()) !== null && d.length < u; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(Ll)) {
          const _ = b[l++], S = r.getAttribute(g).split(di), E = /([.?@])?(.*)/.exec(_);
          d.push({ type: 1, index: s, name: E[2], strings: S, ctor: E[1] === "." ? xc : E[1] === "?" ? $c : E[1] === "@" ? Sc : kr }), r.removeAttribute(g);
        } else g.startsWith(di) && (d.push({ type: 6, index: s }), r.removeAttribute(g));
        if (Fl.test(r.tagName)) {
          const g = r.textContent.split(di), _ = g.length - 1;
          if (_ > 0) {
            r.textContent = _r ? _r.emptyScript : "";
            for (let S = 0; S < _; S++) r.append(g[S], Yn()), Hi.nextNode(), d.push({ type: 2, index: ++s });
            r.append(g[_], Yn());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Rl) d.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(di, g + 1)) !== -1; ) d.push({ type: 7, index: s }), g += di.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Ri.createElement("template");
    return n.innerHTML = t, n;
  }
}
function gn(e, t, i = e, n) {
  if (t === pn) return t;
  let r = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const s = Kn(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(e), r._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = r : i._$Cl = r), r !== void 0 && (t = gn(e, r._$AS(e, t.values), r, n)), t;
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
    const { el: { content: i }, parts: n } = this._$AD, r = (t?.creationScope ?? Ri).importNode(i, !0);
    Hi.currentNode = r;
    let s = Hi.nextNode(), l = 0, u = 0, d = n[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let f;
        d.type === 2 ? f = new Xn(s, s.nextSibling, this, t) : d.type === 1 ? f = new d.ctor(s, d.name, d.strings, this, t) : d.type === 6 && (f = new kc(s, this, t)), this._$AV.push(f), d = n[++u];
      }
      l !== d?.index && (s = Hi.nextNode(), l++);
    }
    return Hi.currentNode = Ri, r;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Xn {
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
    t = gn(this, t, i), Kn(t) ? t === G || t == null || t === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : t !== this._$AH && t !== pn && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vc(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== G && Kn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ri.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = qn.createElement(Bl(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const s = new wc(r, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = js.get(t.strings);
    return i === void 0 && js.set(t.strings, i = new qn(t)), i;
  }
  k(t) {
    Ro(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const s of t) r === i.length ? i.push(n = new Xn(this.O(Yn()), this.O(Yn()), this, this.options)) : n = i[r], n._$AI(s), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = Ls(t).nextSibling;
      Ls(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class kr {
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
    if (s === void 0) t = gn(this, t, i, 0), l = !Kn(t) || t !== this._$AH && t !== pn, l && (this._$AH = t);
    else {
      const u = t;
      let d, f;
      for (t = s[0], d = 0; d < s.length - 1; d++) f = gn(this, u[n + d], i, d), f === pn && (f = this._$AH[d]), l ||= !Kn(f) || f !== this._$AH[d], f === G ? t = G : t !== G && (t += (f ?? "") + s[d + 1]), this._$AH[d] = f;
    }
    l && !r && this.j(t);
  }
  j(t) {
    t === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xc extends kr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class $c extends kr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class Sc extends kr {
  constructor(t, i, n, r, s) {
    super(t, i, n, r, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = gn(this, t, i, 0) ?? G) === pn) return;
    const n = this._$AH, r = t === G && n !== G || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== G && (n === G || r);
    r && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class kc {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    gn(this, t);
  }
}
const Ac = Lo.litHtmlPolyfillSupport;
Ac?.(qn, Xn), (Lo.litHtmlVersions ??= []).push("3.3.2");
const Ec = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const s = i?.renderBefore ?? null;
    n._$litPart$ = r = new Xn(t.insertBefore(Yn(), s), s, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
const Fo = globalThis;
class ze extends hn {
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
    return pn;
  }
}
ze._$litElement$ = !0, ze.finalized = !0, Fo.litElementHydrateSupport?.({ LitElement: ze });
const Pc = Fo.litElementPolyfillSupport;
Pc?.({ LitElement: ze });
(Fo.litElementVersions ??= []).push("4.2.2");
const Qe = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Tc = { attribute: !0, type: String, converter: br, reflect: !1, hasChanged: Ho }, Cc = (e = Tc, t, i) => {
  const { kind: n, metadata: r } = i;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: l } = i;
    return { set(u) {
      const d = t.get.call(this);
      t.set.call(this, u), this.requestUpdate(l, d, e, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(l, void 0, e, u), u;
    } };
  }
  if (n === "setter") {
    const { name: l } = i;
    return function(u) {
      const d = this[l];
      t.call(this, u), this.requestUpdate(l, d, e, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function I(e) {
  return (t, i) => typeof i == "object" ? Cc(e, t, i) : ((n, r, s) => {
    const l = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n), l ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(e, t, i);
}
function re(e) {
  return I({ ...e, state: !0, attribute: !1 });
}
const Dc = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
function wn(e, t) {
  return (i, n, r) => {
    const s = (l) => l.renderRoot?.querySelector(e) ?? null;
    return Dc(i, n, { get() {
      return s(this);
    } });
  };
}
const Xe = je`
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
function vr(e) {
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
function yr(e) {
  return e === "heating" || e === "cooling" || e === "idle" ? e : "unknown";
}
function vo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var Mc = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, er = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? zc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Mc(t, i, r), r;
};
const yo = 15, Ul = 28, Oc = Ul - yo;
function so(e) {
  return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (Math.max(yo, Math.min(Ul, e)) - yo) / Oc * 100;
}
let Fi = class extends ze {
  constructor() {
    super(...arguments), this.low = NaN, this.high = NaN, this.room = NaN, this.action = "unknown";
  }
  render() {
    const e = yr(this.action), t = vr(e), i = Number.isFinite(this.low), n = Number.isFinite(this.high), r = Number.isFinite(this.room), s = i ? so(this.low) : 0, l = n ? so(this.high) : 100, u = Math.min(s, l), d = Math.max(0, Math.abs(l - s)), f = r ? so(this.room) : 50, b = (_) => Number.isFinite(_) ? `${_.toFixed(1)}°` : "—", g = `Comfort band gauge: low ${b(this.low)}, room ${b(this.room)}, high ${b(this.high)}, action ${e}`;
    return $`
      <svg viewBox="0 0 100 24" preserveAspectRatio="none" role="img" aria-label=${g}>
        ${fi`<rect class="track" x="0" y="10" width="100" height="4" rx="2"></rect>`}
        ${i && n ? fi`<rect class="band" x=${u} y="9" width=${d} height="6" rx="3" fill=${t}></rect>` : null}
        ${r ? fi`<circle cx=${f} cy="12" r="4.5" fill=${t}></circle>` : null}
        ${r ? fi`<circle class="marker-ring" cx=${f} cy="12" r="3" stroke=${t}></circle>` : null}
      </svg>
    `;
  }
};
Fi.styles = [
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
er([
  I({ type: Number })
], Fi.prototype, "low", 2);
er([
  I({ type: Number })
], Fi.prototype, "high", 2);
er([
  I({ type: Number })
], Fi.prototype, "room", 2);
er([
  I({ type: String })
], Fi.prototype, "action", 2);
Fi = er([
  Qe("band-gauge")
], Fi);
var Nc = Object.defineProperty, Hc = Object.getOwnPropertyDescriptor, Gt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Hc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
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
    const e = Lc(this.overrideEnds);
    return $`<div class="override-pill">Override${e ? ` · ${e}` : ""}</div>`;
  }
  _renderActionChip() {
    const e = yr(this.action);
    if (e === "idle" || e === "unknown") return null;
    const t = vr(e);
    return $`<span class="action-chip" style="background:${t}">
      ${vo(e)}
    </span>`;
  }
  render() {
    return this.variant === "mini" ? this._renderMini() : $`
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
    const e = yr(this.action), t = e === "heating" || e === "cooling", i = t ? `--cb-mini-bg:${vr(e)}` : "", n = `${this.zoneName || "Zone"} ${this._renderRoomTemp()}${t ? `, ${vo(e)}` : ""}`;
    return $`
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
Gt([
  I({ type: String })
], yt.prototype, "zoneName", 2);
Gt([
  I({ type: Number })
], yt.prototype, "roomTemp", 2);
Gt([
  I({ type: Number })
], yt.prototype, "low", 2);
Gt([
  I({ type: Number })
], yt.prototype, "high", 2);
Gt([
  I({ type: String })
], yt.prototype, "action", 2);
Gt([
  I({ type: Boolean })
], yt.prototype, "overrideActive", 2);
Gt([
  I({ type: String })
], yt.prototype, "overrideEnds", 2);
Gt([
  I({ type: Boolean })
], yt.prototype, "noExpand", 2);
Gt([
  I({ type: String, reflect: !0 })
], yt.prototype, "variant", 2);
yt = Gt([
  Qe("comfort-band-tile")
], yt);
function Lc(e) {
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
var Rc = Object.defineProperty, Fc = Object.getOwnPropertyDescriptor, ii = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Fc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Rc(t, i, r), r;
};
let Dt = class extends ze {
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
    return $`
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
Dt.styles = [
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
ii([
  I({ type: Number })
], Dt.prototype, "min", 2);
ii([
  I({ type: Number })
], Dt.prototype, "max", 2);
ii([
  I({ type: Number })
], Dt.prototype, "step", 2);
ii([
  I({ type: Number })
], Dt.prototype, "low", 2);
ii([
  I({ type: Number })
], Dt.prototype, "high", 2);
ii([
  I({ type: String })
], Dt.prototype, "unit", 2);
ii([
  re()
], Dt.prototype, "_dragging", 2);
ii([
  wn(".track")
], Dt.prototype, "_track", 2);
Dt = ii([
  Qe("dual-handle-slider")
], Dt);
const _i = "comfort_band";
function Ic(e, t, i) {
  return e.connection.subscribeMessage(
    (n) => i(n.schedule),
    { type: "comfort_band/subscribe_schedule", ...t }
  );
}
function Bc(e, t) {
  return e.callService(_i, "set_schedule", { ...t });
}
function Uc(e, t) {
  const i = { zone: t.zone };
  return t.low !== void 0 && (i.low = t.low), t.high !== void 0 && (i.high = t.high), t.hours !== void 0 && (i.hours = t.hours), e.callService(_i, "start_override", i);
}
function jc(e, t) {
  return e.callService(_i, "cancel_override", { ...t });
}
function Vc(e, t) {
  return e.callService(_i, "set_profile", { ...t });
}
function Wc(e, t) {
  const i = { name: t.name };
  return t.description !== void 0 && (i.description = t.description), e.callService(_i, "create_profile", i);
}
function Gc(e, t) {
  const i = { source: t.source, target: t.target };
  return t.description !== void 0 && (i.description = t.description), e.callService(_i, "clone_profile", i);
}
function Yc(e, t) {
  return e.callService(_i, "rename_profile", { old: t.old, new: t.new });
}
function Kc(e, t) {
  return e.callService(_i, "delete_profile", { name: t.name });
}
var qc = Object.defineProperty, Zc = Object.getOwnPropertyDescriptor, xn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Zc(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && qc(t, i, r), r;
};
const Jc = [1, 3, 6];
let pi = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this._pendingLow = null, this._pendingHigh = null, this._onSliderInput = (e) => {
      this._pendingLow = e.detail.low, this._pendingHigh = e.detail.high;
    }, this._onSliderChange = (e) => {
      !this.hass || !this.zone || (this._pendingLow = null, this._pendingHigh = null, Uc(this.hass, {
        zone: this.zone,
        low: e.detail.low,
        high: e.detail.high
      }));
    }, this._onCancel = () => {
      !this.hass || !this.zone || jc(this.hass, { zone: this.zone });
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
    if (!this.hass || !this.entities) return G;
    const e = this._numericState(this.entities.manualLow), t = this._numericState(this.entities.manualHigh), i = this._numericState(this.entities.effectiveLow), n = this._numericState(this.entities.effectiveHigh), r = this._numericState(this.entities.roomTemperature), s = this._numericState(this.entities.apparentTemperature), l = this._numericState(this.entities.overrideHours), u = this._stateOf(this.entities.currentAction)?.state ?? "unknown", d = this._stateOf(this.entities.overrideActive)?.state === "on", f = this._stateOf(this.entities.useApparentTemperature)?.state === "on", b = Number.isFinite(r) && Number.isFinite(s) && Math.abs(s - r) >= 0.1, g = this._pendingLow ?? (Number.isFinite(e) ? e : 19), _ = this._pendingHigh ?? (Number.isFinite(t) ? t : 22), S = yr(u), E = S !== "idle" && S !== "unknown";
    return $`
      <div class="header-row">
        <div class="room-temp">${Number.isFinite(r) ? `${r.toFixed(1)}°` : "—"}</div>
        ${E ? $`<span class="action-chip" style="background:${vr(S)}"
              >${vo(S)}</span
            >` : G}
      </div>
      ${this._renderFeelsLikeRow({ apparent: s, showFeelsLike: b, useApparentOn: f })}
      <div class="gauge-row">
        <band-gauge .low=${i} .high=${n} .room=${r} .action=${u}></band-gauge>
      </div>

      <section>
        <h3>Manual band</h3>
        <dual-handle-slider
          .min=${16}
          .max=${26}
          .step=${0.5}
          .low=${g}
          .high=${_}
          @input=${this._onSliderInput}
          @change=${this._onSliderChange}
        ></dual-handle-slider>
      </section>

      ${this._renderOverrideSection(d)} ${this._renderHoursSection(l)}
    `;
  }
  _renderOverrideSection(e) {
    if (!e) return G;
    const t = this._stateOf(this.entities.overrideEnds)?.state, i = Qc(t ?? null);
    return $`
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
    return i ? $`<div class="feels-like">
        <span>Feels like ${t.toFixed(1)}°</span>
        ${r ? $`<span class="driving">Driving decisions</span>` : G}
      </div>` : r ? $`<div class="feels-like">
        <span class="driving">Driving decisions</span>
      </div>` : n ? $`<div class="feels-like">
        <span class="muted-warn">
          Apparent temperature mode is on but no humidity reading is available — decisions are using
          the raw room temperature.
        </span>
      </div>` : G;
  }
  _renderHoursSection(e) {
    return this.entities?.overrideHours ? $`
      <section>
        <h3>Override duration</h3>
        <div class="preset-row">
          ${Jc.map(
      (t) => $`
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
pi.styles = [
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
    `
];
xn([
  I({ attribute: !1 })
], pi.prototype, "hass", 2);
xn([
  I({ type: String })
], pi.prototype, "zone", 2);
xn([
  I({ attribute: !1 })
], pi.prototype, "entities", 2);
xn([
  re()
], pi.prototype, "_pendingLow", 2);
xn([
  re()
], pi.prototype, "_pendingHigh", 2);
pi = xn([
  Qe("comfort-band-now-tab")
], pi);
function Qc(e) {
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
var Xc = Object.defineProperty, eu = Object.getOwnPropertyDescriptor, ni = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? eu(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Xc(t, i, r), r;
};
let Mt = class extends ze {
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
    return $`
      <h3>${this._heading()}</h3>
      ${this.mode === "clone" ? $`<p class="source">Copying schedules from <strong>${this.existingName}</strong>.</p>` : null}
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
      ${this.mode !== "rename" ? $`<label>
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
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
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
Mt.styles = [
  Xe,
  je`
      :host {
        display: block;
        padding: var(--cb-gap-md);
        background: var(--card-background-color, var(--primary-background-color, #ffffff));
        color: var(--primary-text-color, #212121);
        border-radius: var(--cb-radius-card);
        color-scheme: light dark;
      }
      h3 {
        margin: 0 0 var(--cb-gap-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #212121);
      }
      .source {
        margin: 0 0 var(--cb-gap-md);
        font-size: 12px;
        color: var(--secondary-text-color, #727272);
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: var(--cb-gap-md);
        font-size: 12px;
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
        color: var(--primary-text-color, #212121);
      }
    `
];
ni([
  I({ type: String })
], Mt.prototype, "mode", 2);
ni([
  I({ type: String })
], Mt.prototype, "existingName", 2);
ni([
  I({ type: Array })
], Mt.prototype, "existingNames", 2);
ni([
  I({ type: Boolean })
], Mt.prototype, "busy", 2);
ni([
  re()
], Mt.prototype, "_name", 2);
ni([
  re()
], Mt.prototype, "_description", 2);
ni([
  re()
], Mt.prototype, "_error", 2);
ni([
  wn('input[name="name"]')
], Mt.prototype, "_nameInput", 2);
Mt = ni([
  Qe("profile-edit-dialog")
], Mt);
const Io = "comfort_band", tu = {
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
function iu() {
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
function jl(e, t) {
  for (const i of Object.values(e.devices))
    for (const [n, r] of i.identifiers)
      if (n === t[0] && r === t[1])
        return i;
  return null;
}
function Vl(e, t) {
  return Object.values(e.entities).filter(
    (i) => i.device_id === t && i.platform === Io
  );
}
function nu(e, t) {
  const i = iu(), n = jl(e, [Io, `zone:${t}`]);
  if (n === null) return i;
  i.deviceId = n.id, i.deviceName = n.name_by_user ?? n.name;
  for (const r of Vl(e, n.id)) {
    const s = r.translation_key;
    if (s === null) continue;
    const l = tu[s];
    l !== void 0 && (i[l] = r.entity_id);
  }
  return i;
}
function Wl(e) {
  const t = jl(e, [Io, "profile_manager"]);
  if (t === null) return null;
  for (const i of Vl(e, t.id))
    if (i.translation_key === "active_profile")
      return i.entity_id;
  return null;
}
function Gl(e, t) {
  return !e || !t ? null : e.states[t]?.attributes.humidity_sensor ?? null;
}
var ru = Object.defineProperty, ou = Object.getOwnPropertyDescriptor, Bi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ou(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ru(t, i, r), r;
};
let ti = class extends ze {
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
          t !== r && await Yc(this.hass, { old: r, new: t });
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
        await Kc(this.hass, { name: e }), this._mode = "list", this._target = null, this._error = null, this._restoreFocusAfterDialog();
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
    const e = Wl(this.hass);
    if (e === null) return null;
    const t = this.hass.states[e];
    if (!t) return null;
    const i = t.attributes.options, n = Array.isArray(i) ? i.filter((b) => typeof b == "string") : [], r = typeof t.state == "string" ? t.state : "", s = t.attributes.default_profile, l = typeof s == "string" && !!s, u = l ? s : "home", d = t.attributes.descriptions, f = {};
    if (d && typeof d == "object" && !Array.isArray(d))
      for (const [b, g] of Object.entries(d))
        typeof g == "string" && (f[b] = g);
    return { options: n, active: r, defaultProfile: u, descriptions: f, crudAvailable: l };
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
      return $`<div class="empty">Profile manager not registered yet.</div>`;
    const { options: t, active: i, defaultProfile: n, descriptions: r, crudAvailable: s } = e;
    if (this._mode === "create" || this._mode === "clone" || this._mode === "rename")
      return $`
        ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
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
      return $`
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
            ${l ? $`This profile is active — deleting will switch to
                  <strong>${n}</strong>.` : ""}
          </p>
          ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
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
    return t.length === 0 ? $`<div class="empty">No profiles configured.</div>` : $`
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
      ${s ? $`<button class="new-profile" type="button" @click=${this._onNew}>
            + New profile
          </button>` : G}
      <ul aria-label="Profiles">
        ${t.map(
      (l, u) => this._renderRow(l, u, i, n, r, s)
    )}
      </ul>
      ${s ? G : $`<p class="upgrade-hint">
            Profile management (create, clone, rename, delete) requires the
            <code>comfort_band</code> integration v0.3.0 or later.
          </p>`}
    `;
  }
  _renderRow(e, t, i, n, r, s) {
    const l = e === i, u = e === n, d = r[e] ?? "", f = `cb-profile-menu-${t}`;
    return $`
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
          ${d ? $`<span class="description">${d}</span>` : G}
        </span>
        ${l ? $`<span class="badge">Active</span>` : G}
        ${s ? $`<button
              class="overflow"
              type="button"
              aria-label="More actions for ${e}"
              aria-haspopup="menu"
              aria-controls=${this._openMenu === e ? f : G}
              aria-expanded=${this._openMenu === e ? "true" : "false"}
              @click=${(b) => this._toggleMenu(e, b)}
            >
              ⋮
            </button>` : G}
        ${this._openMenu === e ? $`
              <div
                id=${f}
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
                  ?disabled=${u}
                  aria-disabled=${u}
                  @click=${(b) => {
      b.stopPropagation(), u || this._onDelete(e);
    }}
                  title=${u ? "Default profile cannot be deleted" : "Delete"}
                >
                  Delete
                </button>
              </div>
            ` : G}
      </li>
    `;
  }
};
ti.styles = [
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
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
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
        color: var(--primary-text-color, #212121);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `
];
Bi([
  I({ attribute: !1 })
], ti.prototype, "hass", 2);
Bi([
  re()
], ti.prototype, "_mode", 2);
Bi([
  re()
], ti.prototype, "_target", 2);
Bi([
  re()
], ti.prototype, "_openMenu", 2);
Bi([
  re()
], ti.prototype, "_error", 2);
Bi([
  re()
], ti.prototype, "_busy", 2);
ti = Bi([
  Qe("comfort-band-profiles-tab")
], ti);
const su = !0, Oe = "u-", lu = "uplot", au = Oe + "hz", cu = Oe + "vt", uu = Oe + "title", hu = Oe + "wrap", du = Oe + "under", fu = Oe + "over", pu = Oe + "axis", Ni = Oe + "off", gu = Oe + "select", mu = Oe + "cursor-x", bu = Oe + "cursor-y", _u = Oe + "cursor-pt", vu = Oe + "legend", yu = Oe + "live", wu = Oe + "inline", xu = Oe + "series", $u = Oe + "marker", Vs = Oe + "label", Su = Oe + "value", Bn = "width", Un = "height", Rn = "top", Ws = "bottom", cn = "left", lo = "right", Bo = "#000", Gs = Bo + "0", ao = "mousemove", Ys = "mousedown", co = "mouseup", Ks = "mouseenter", qs = "mouseleave", Zs = "dblclick", ku = "resize", Au = "scroll", Js = "change", wr = "dppxchange", Uo = "--", $n = typeof window < "u", wo = $n ? document : null, fn = $n ? window : null, Eu = $n ? navigator : null;
let ce, hr;
function xo() {
  let e = devicePixelRatio;
  ce != e && (ce = e, hr && So(Js, hr, xo), hr = matchMedia(`(min-resolution: ${ce - 1e-3}dppx) and (max-resolution: ${ce + 1e-3}dppx)`), Li(Js, hr, xo), fn.dispatchEvent(new CustomEvent(wr)));
}
function at(e, t) {
  if (t != null) {
    let i = e.classList;
    !i.contains(t) && i.add(t);
  }
}
function $o(e, t) {
  let i = e.classList;
  i.contains(t) && i.remove(t);
}
function ye(e, t, i) {
  e.style[t] = i + "px";
}
function Et(e, t, i, n) {
  let r = wo.createElement(e);
  return t != null && at(r, t), i?.insertBefore(r, n), r;
}
function _t(e, t) {
  return Et("div", e, t);
}
const Qs = /* @__PURE__ */ new WeakMap();
function Bt(e, t, i, n, r) {
  let s = "translate(" + t + "px," + i + "px)", l = Qs.get(e);
  s != l && (e.style.transform = s, Qs.set(e, s), t < 0 || i < 0 || t > n || i > r ? at(e, Ni) : $o(e, Ni));
}
const Xs = /* @__PURE__ */ new WeakMap();
function el(e, t, i) {
  let n = t + i, r = Xs.get(e);
  n != r && (Xs.set(e, n), e.style.background = t, e.style.borderColor = i);
}
const tl = /* @__PURE__ */ new WeakMap();
function il(e, t, i, n) {
  let r = t + "" + i, s = tl.get(e);
  r != s && (tl.set(e, r), e.style.height = i + "px", e.style.width = t + "px", e.style.marginLeft = n ? -t / 2 + "px" : 0, e.style.marginTop = n ? -i / 2 + "px" : 0);
}
const jo = { passive: !0 }, Pu = { ...jo, capture: !0 };
function Li(e, t, i, n) {
  t.addEventListener(e, i, n ? Pu : jo);
}
function So(e, t, i, n) {
  t.removeEventListener(e, i, jo);
}
$n && xo();
function Tt(e, t, i, n) {
  let r;
  i = i || 0, n = n || t.length - 1;
  let s = n <= 2147483647;
  for (; n - i > 1; )
    r = s ? i + n >> 1 : ct((i + n) / 2), t[r] < e ? i = r : n = r;
  return e - t[i] <= t[n] - e ? i : n;
}
function Yl(e) {
  return (i, n, r) => {
    let s = -1, l = -1;
    for (let u = n; u <= r; u++)
      if (e(i[u])) {
        s = u;
        break;
      }
    for (let u = r; u >= n; u--)
      if (e(i[u])) {
        l = u;
        break;
      }
    return [s, l];
  };
}
const Kl = (e) => e != null, ql = (e) => e != null && e > 0, Ar = Yl(Kl), Tu = Yl(ql);
function Cu(e, t, i, n = 0, r = !1) {
  let s = r ? Tu : Ar, l = r ? ql : Kl;
  [t, i] = s(e, t, i);
  let u = e[t], d = e[t];
  if (t > -1)
    if (n == 1)
      u = e[t], d = e[i];
    else if (n == -1)
      u = e[i], d = e[t];
    else
      for (let f = t; f <= i; f++) {
        let b = e[f];
        l(b) && (b < u ? u = b : b > d && (d = b));
      }
  return [u ?? pe, d ?? -pe];
}
function Er(e, t, i, n) {
  let r = ol(e), s = ol(t);
  e == t && (r == -1 ? (e *= i, t /= i) : (e /= i, t *= i));
  let l = i == 10 ? Xt : Zl, u = r == 1 ? ct : vt, d = s == 1 ? vt : ct, f = u(l(Me(e))), b = d(l(Me(t))), g = mn(i, f), _ = mn(i, b);
  return i == 10 && (f < 0 && (g = ge(g, -f)), b < 0 && (_ = ge(_, -b))), n || i == 2 ? (e = g * r, t = _ * s) : (e = ea(e, g), t = Pr(t, _)), [e, t];
}
function Vo(e, t, i, n) {
  let r = Er(e, t, i, n);
  return e == 0 && (r[0] = 0), t == 0 && (r[1] = 0), r;
}
const Wo = 0.1, nl = {
  mode: 3,
  pad: Wo
}, Wn = {
  pad: 0,
  soft: null,
  mode: 0
}, Du = {
  min: Wn,
  max: Wn
};
function xr(e, t, i, n) {
  return Tr(i) ? rl(e, t, i) : (Wn.pad = i, Wn.soft = n ? 0 : null, Wn.mode = n ? 3 : 0, rl(e, t, Du));
}
function le(e, t) {
  return e ?? t;
}
function Mu(e, t, i) {
  for (t = le(t, 0), i = le(i, e.length - 1); t <= i; ) {
    if (e[t] != null)
      return !0;
    t++;
  }
  return !1;
}
function rl(e, t, i) {
  let n = i.min, r = i.max, s = le(n.pad, 0), l = le(r.pad, 0), u = le(n.hard, -pe), d = le(r.hard, pe), f = le(n.soft, pe), b = le(r.soft, -pe), g = le(n.mode, 0), _ = le(r.mode, 0), S = t - e, E = Xt(S), z = Je(Me(e), Me(t)), B = Xt(z), j = Me(B - E);
  (S < 1e-24 || j > 10) && (S = 0, (e == 0 || t == 0) && (S = 1e-24, g == 2 && f != pe && (s = 0), _ == 2 && b != -pe && (l = 0)));
  let w = S || z || 1e3, F = Xt(w), k = mn(10, ct(F)), J = w * (S == 0 ? e == 0 ? 0.1 : 1 : s), M = ge(ea(e - J, k / 10), 24), Q = e >= f && (g == 1 || g == 3 && M <= f || g == 2 && M >= f) ? f : pe, K = Je(u, M < Q && e >= Q ? Q : Ct(Q, M)), te = w * (S == 0 ? t == 0 ? 0.1 : 1 : l), Y = ge(Pr(t + te, k / 10), 24), A = t <= b && (_ == 1 || _ == 3 && Y >= b || _ == 2 && Y <= b) ? b : -pe, Z = Ct(d, Y > A && t <= A ? A : Je(A, Y));
  return K == Z && K == 0 && (Z = 100), [K, Z];
}
const zu = new Intl.NumberFormat($n ? Eu.language : "en-US"), Go = (e) => zu.format(e), ut = Math, mr = ut.PI, Me = ut.abs, ct = ut.floor, De = ut.round, vt = ut.ceil, Ct = ut.min, Je = ut.max, mn = ut.pow, ol = ut.sign, Xt = ut.log10, Zl = ut.log2, Ou = (e, t = 1) => ut.sinh(e) * t, uo = (e, t = 1) => ut.asinh(e / t), pe = 1 / 0;
function sl(e) {
  return (Xt((e ^ e >> 31) - (e >> 31)) | 0) + 1;
}
function ko(e, t, i) {
  return Ct(Je(e, t), i);
}
function Jl(e) {
  return typeof e == "function";
}
function ie(e) {
  return Jl(e) ? e : () => e;
}
const Nu = () => {
}, Ql = (e) => e, Xl = (e, t) => t, Hu = (e) => null, ll = (e) => !0, al = (e, t) => e == t, Lu = /\.\d*?(?=9{6,}|0{6,})/gm, Ii = (e) => {
  if (ia(e) || gi.has(e))
    return e;
  const t = `${e}`, i = t.match(Lu);
  if (i == null)
    return e;
  let n = i[0].length - 1;
  if (t.indexOf("e-") != -1) {
    let [r, s] = t.split("e");
    return +`${Ii(r)}e${s}`;
  }
  return ge(e, n);
};
function zi(e, t) {
  return Ii(ge(Ii(e / t)) * t);
}
function Pr(e, t) {
  return Ii(vt(Ii(e / t)) * t);
}
function ea(e, t) {
  return Ii(ct(Ii(e / t)) * t);
}
function ge(e, t = 0) {
  if (ia(e))
    return e;
  let i = 10 ** t, n = e * i * (1 + Number.EPSILON);
  return De(n) / i;
}
const gi = /* @__PURE__ */ new Map();
function ta(e) {
  return (("" + e).split(".")[1] || "").length;
}
function Zn(e, t, i, n) {
  let r = [], s = n.map(ta);
  for (let l = t; l < i; l++) {
    let u = Me(l), d = ge(mn(e, l), u);
    for (let f = 0; f < n.length; f++) {
      let b = e == 10 ? +`${n[f]}e${l}` : n[f] * d, g = (l >= 0 ? 0 : u) + (l >= s[f] ? 0 : s[f]), _ = e == 10 ? b : ge(b, g);
      r.push(_), gi.set(_, g);
    }
  }
  return r;
}
const Gn = {}, Yo = [], bn = [null, null], hi = Array.isArray, ia = Number.isInteger, Ru = (e) => e === void 0;
function cl(e) {
  return typeof e == "string";
}
function Tr(e) {
  let t = !1;
  if (e != null) {
    let i = e.constructor;
    t = i == null || i == Object;
  }
  return t;
}
function Fu(e) {
  return e != null && typeof e == "object";
}
const Iu = Object.getPrototypeOf(Uint8Array), na = "__proto__";
function _n(e, t = Tr) {
  let i;
  if (hi(e)) {
    let n = e.find((r) => r != null);
    if (hi(n) || t(n)) {
      i = Array(e.length);
      for (let r = 0; r < e.length; r++)
        i[r] = _n(e[r], t);
    } else
      i = e.slice();
  } else if (e instanceof Iu)
    i = e.slice();
  else if (t(e)) {
    i = {};
    for (let n in e)
      n != na && (i[n] = _n(e[n], t));
  } else
    i = e;
  return i;
}
function Pe(e) {
  let t = arguments;
  for (let i = 1; i < t.length; i++) {
    let n = t[i];
    for (let r in n)
      r != na && (Tr(e[r]) ? Pe(e[r], _n(n[r])) : e[r] = _n(n[r]));
  }
  return e;
}
const Bu = 0, Uu = 1, ju = 2;
function Vu(e, t, i) {
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
function Wu(e, t) {
  if (Ku(e)) {
    let l = e[0].slice();
    for (let u = 1; u < e.length; u++)
      l.push(...e[u].slice(1));
    return qu(l[0]) || (l = Yu(l)), l;
  }
  let i = /* @__PURE__ */ new Set();
  for (let l = 0; l < e.length; l++) {
    let d = e[l][0], f = d.length;
    for (let b = 0; b < f; b++)
      i.add(d[b]);
  }
  let n = [Array.from(i).sort((l, u) => l - u)], r = n[0].length, s = /* @__PURE__ */ new Map();
  for (let l = 0; l < r; l++)
    s.set(n[0][l], l);
  for (let l = 0; l < e.length; l++) {
    let u = e[l], d = u[0];
    for (let f = 1; f < u.length; f++) {
      let b = u[f], g = Array(r).fill(void 0), _ = t ? t[l][f] : Uu, S = [];
      for (let E = 0; E < b.length; E++) {
        let z = b[E], B = s.get(d[E]);
        z === null ? _ != Bu && (g[B] = z, _ == ju && S.push(B)) : g[B] = z;
      }
      Vu(g, S, r), n.push(g);
    }
  }
  return n;
}
const Gu = typeof queueMicrotask > "u" ? (e) => Promise.resolve().then(e) : queueMicrotask;
function Yu(e) {
  let t = e[0], i = t.length, n = Array(i);
  for (let s = 0; s < n.length; s++)
    n[s] = s;
  n.sort((s, l) => t[s] - t[l]);
  let r = [];
  for (let s = 0; s < e.length; s++) {
    let l = e[s], u = Array(i);
    for (let d = 0; d < i; d++)
      u[d] = l[n[d]];
    r.push(u);
  }
  return r;
}
function Ku(e) {
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
function qu(e, t = 100) {
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
  for (let l = e[n], u = n + s; u <= r; u += s) {
    const d = e[u];
    if (d != null) {
      if (d <= l)
        return !1;
      l = d;
    }
  }
  return !0;
}
const ra = [
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
], oa = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function sa(e) {
  return e.slice(0, 3);
}
const Zu = oa.map(sa), Ju = ra.map(sa), Qu = {
  MMMM: ra,
  MMM: Ju,
  WWWW: oa,
  WWW: Zu
};
function Fn(e) {
  return (e < 10 ? "0" : "") + e;
}
function Xu(e) {
  return (e < 10 ? "00" : e < 100 ? "0" : "") + e;
}
const eh = {
  // 2019
  YYYY: (e) => e.getFullYear(),
  // 19
  YY: (e) => (e.getFullYear() + "").slice(2),
  // July
  MMMM: (e, t) => t.MMMM[e.getMonth()],
  // Jul
  MMM: (e, t) => t.MMM[e.getMonth()],
  // 07
  MM: (e) => Fn(e.getMonth() + 1),
  // 7
  M: (e) => e.getMonth() + 1,
  // 09
  DD: (e) => Fn(e.getDate()),
  // 9
  D: (e) => e.getDate(),
  // Monday
  WWWW: (e, t) => t.WWWW[e.getDay()],
  // Mon
  WWW: (e, t) => t.WWW[e.getDay()],
  // 03
  HH: (e) => Fn(e.getHours()),
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
  mm: (e) => Fn(e.getMinutes()),
  // 9
  m: (e) => e.getMinutes(),
  // 09
  ss: (e) => Fn(e.getSeconds()),
  // 9
  s: (e) => e.getSeconds(),
  // 374
  fff: (e) => Xu(e.getMilliseconds())
};
function Ko(e, t) {
  t = t || Qu;
  let i = [], n = /\{([a-z]+)\}|[^{]+/gi, r;
  for (; r = n.exec(e); )
    i.push(r[0][0] == "{" ? eh[r[1]] : r[0]);
  return (s) => {
    let l = "";
    for (let u = 0; u < i.length; u++)
      l += typeof i[u] == "string" ? i[u] : i[u](s, t);
    return l;
  };
}
const th = new Intl.DateTimeFormat().resolvedOptions().timeZone;
function ih(e, t) {
  let i;
  return t == "UTC" || t == "Etc/UTC" ? i = new Date(+e + e.getTimezoneOffset() * 6e4) : t == th ? i = e : (i = new Date(e.toLocaleString("en-US", { timeZone: t })), i.setMilliseconds(e.getMilliseconds())), i;
}
const la = (e) => e % 1 == 0, $r = [1, 2, 2.5, 5], nh = Zn(10, -32, 0, $r), aa = Zn(10, 0, 32, $r), rh = aa.filter(la), Oi = nh.concat(aa), qo = `
`, ca = "{YYYY}", ul = qo + ca, ua = "{M}/{D}", jn = qo + ua, dr = jn + "/{YY}", ha = "{aa}", oh = "{h}:{mm}", dn = oh + ha, hl = qo + dn, dl = ":{ss}", he = null;
function da(e) {
  let t = e * 1e3, i = t * 60, n = i * 60, r = n * 24, s = r * 30, l = r * 365, d = (e == 1 ? Zn(10, 0, 3, $r).filter(la) : Zn(10, -3, 0, $r)).concat([
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
  const f = [
    //   tick incr    default          year                    month   day                   hour    min       sec   mode
    [l, ca, he, he, he, he, he, he, 1],
    [r * 28, "{MMM}", ul, he, he, he, he, he, 1],
    [r, ua, ul, he, he, he, he, he, 1],
    [n, "{h}" + ha, dr, he, jn, he, he, he, 1],
    [i, dn, dr, he, jn, he, he, he, 1],
    [t, dl, dr + " " + dn, he, jn + " " + dn, he, hl, he, 1],
    [e, dl + ".{fff}", dr + " " + dn, he, jn + " " + dn, he, hl, he, 1]
  ];
  function b(g) {
    return (_, S, E, z, B, j) => {
      let w = [], F = B >= l, k = B >= s && B < l, J = g(E), M = ge(J * e, 3), Q = ho(J.getFullYear(), F ? 0 : J.getMonth(), k || F ? 1 : J.getDate()), K = ge(Q * e, 3);
      if (k || F) {
        let te = k ? B / s : 0, Y = F ? B / l : 0, A = M == K ? M : ge(ho(Q.getFullYear() + Y, Q.getMonth() + te, 1) * e, 3), Z = new Date(De(A / e)), O = Z.getFullYear(), V = Z.getMonth();
        for (let R = 0; A <= z; R++) {
          let ne = ho(O + Y * R, V + te * R, 1), L = ne - g(ge(ne * e, 3));
          A = ge((+ne + L) * e, 3), A <= z && w.push(A);
        }
      } else {
        let te = B >= r ? r : B, Y = ct(E) - ct(M), A = K + Y + Pr(M - K, te);
        w.push(A);
        let Z = g(A), O = Z.getHours() + Z.getMinutes() / i + Z.getSeconds() / n, V = B / n, R = _.axes[S]._space, ne = j / R;
        for (; A = ge(A + B, e == 1 ? 0 : 3), !(A > z); )
          if (V > 1) {
            let L = ct(ge(O + V, 6)) % 24, oe = g(A).getHours() - L;
            oe > 1 && (oe = -1), A -= oe * n, O = (O + V) % 24;
            let de = w[w.length - 1];
            ge((A - de) / B, 3) * ne >= 0.7 && w.push(A);
          } else
            w.push(A);
      }
      return w;
    };
  }
  return [
    d,
    f,
    b
  ];
}
const [sh, lh, ah] = da(1), [ch, uh, hh] = da(1e-3);
Zn(2, -53, 53, [1]);
function fl(e, t) {
  return e.map((i) => i.map(
    (n, r) => r == 0 || r == 8 || n == null ? n : t(r == 1 || i[8] == 0 ? n : i[1] + n)
  ));
}
function pl(e, t) {
  return (i, n, r, s, l) => {
    let u = t.find((E) => l >= E[0]) || t[t.length - 1], d, f, b, g, _, S;
    return n.map((E) => {
      let z = e(E), B = z.getFullYear(), j = z.getMonth(), w = z.getDate(), F = z.getHours(), k = z.getMinutes(), J = z.getSeconds(), M = B != d && u[2] || j != f && u[3] || w != b && u[4] || F != g && u[5] || k != _ && u[6] || J != S && u[7] || u[1];
      return d = B, f = j, b = w, g = F, _ = k, S = J, M(z);
    });
  };
}
function dh(e, t) {
  let i = Ko(t);
  return (n, r, s, l, u) => r.map((d) => i(e(d)));
}
function ho(e, t, i) {
  return new Date(e, t, i);
}
function gl(e, t) {
  return t(e);
}
const fh = "{YYYY}-{MM}-{DD} {h}:{mm}{aa}";
function ml(e, t) {
  return (i, n, r, s) => s == null ? Uo : t(e(n));
}
function ph(e, t) {
  let i = e.series[t];
  return i.width ? i.stroke(e, t) : i.points.width ? i.points.stroke(e, t) : null;
}
function gh(e, t) {
  return e.series[t].fill(e, t);
}
const mh = {
  show: !0,
  live: !0,
  isolate: !1,
  mount: Nu,
  markers: {
    show: !0,
    width: 2,
    stroke: ph,
    fill: gh,
    dash: "solid"
  },
  idx: null,
  idxs: null,
  values: []
};
function bh(e, t) {
  let i = e.cursor.points, n = _t(), r = i.size(e, t);
  ye(n, Bn, r), ye(n, Un, r);
  let s = r / -2;
  ye(n, "marginLeft", s), ye(n, "marginTop", s);
  let l = i.width(e, t, r);
  return l && ye(n, "borderWidth", l), n;
}
function _h(e, t) {
  let i = e.series[t].points;
  return i._fill || i._stroke;
}
function vh(e, t) {
  let i = e.series[t].points;
  return i._stroke || i._fill;
}
function yh(e, t) {
  return e.series[t].points.size;
}
const fo = [0, 0];
function wh(e, t, i) {
  return fo[0] = t, fo[1] = i, fo;
}
function fr(e, t, i, n = !0) {
  return (r) => {
    r.button == 0 && (!n || r.target == t) && i(r);
  };
}
function po(e, t, i, n = !0) {
  return (r) => {
    (!n || r.target == t) && i(r);
  };
}
const xh = {
  show: !0,
  x: !0,
  y: !0,
  lock: !1,
  move: wh,
  points: {
    one: !1,
    show: bh,
    size: yh,
    width: 0,
    stroke: vh,
    fill: _h
  },
  bind: {
    mousedown: fr,
    mouseup: fr,
    click: fr,
    // legend clicks, not .u-over clicks
    dblclick: fr,
    mousemove: po,
    mouseleave: po,
    mouseenter: po
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
}, fa = {
  show: !0,
  stroke: "rgba(0,0,0,0.07)",
  width: 2
  //	dash: [],
}, Zo = Pe({}, fa, {
  filter: Xl
}), pa = Pe({}, Zo, {
  size: 10
}), ga = Pe({}, fa, {
  show: !1
}), Jo = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', ma = "bold " + Jo, ba = 1.5, bl = {
  show: !0,
  scale: "x",
  stroke: Bo,
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
  grid: Zo,
  ticks: pa,
  border: ga,
  font: Jo,
  lineGap: ba,
  rotate: 0
}, $h = "Value", Sh = "Time", _l = {
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
function kh(e, t, i, n, r) {
  return t.map((s) => s == null ? "" : Go(s));
}
function Ah(e, t, i, n, r, s, l) {
  let u = [], d = gi.get(r) || 0;
  i = l ? i : ge(Pr(i, r), d);
  for (let f = i; f <= n; f = ge(f + r, d))
    u.push(Object.is(f, -0) ? 0 : f);
  return u;
}
function Ao(e, t, i, n, r, s, l) {
  const u = [], d = e.scales[e.axes[t].scale].log, f = d == 10 ? Xt : Zl, b = ct(f(i));
  r = mn(d, b), d == 10 && (r = Oi[Tt(r, Oi)]);
  let g = i, _ = r * d;
  d == 10 && (_ = Oi[Tt(_, Oi)]);
  do
    u.push(g), g = g + r, d == 10 && !gi.has(g) && (g = ge(g, gi.get(r))), g >= _ && (r = g, _ = r * d, d == 10 && (_ = Oi[Tt(_, Oi)]));
  while (g <= n);
  return u;
}
function Eh(e, t, i, n, r, s, l) {
  let d = e.scales[e.axes[t].scale].asinh, f = n > d ? Ao(e, t, Je(d, i), n, r) : [d], b = n >= 0 && i <= 0 ? [0] : [];
  return (i < -d ? Ao(e, t, Je(d, -n), -i, r) : [d]).reverse().map((_) => -_).concat(b, f);
}
const _a = /./, Ph = /[12357]/, Th = /[125]/, vl = /1/, Eo = (e, t, i, n) => e.map((r, s) => t == 4 && r == 0 || s % n == 0 && i.test(r.toExponential()[r < 0 ? 1 : 0]) ? r : null);
function Ch(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, u = e.scales[l], d = e.valToPos, f = s._space, b = d(10, l), g = d(9, l) - b >= f ? _a : d(7, l) - b >= f ? Ph : d(5, l) - b >= f ? Th : vl;
  if (g == vl) {
    let _ = Me(d(1, l) - b);
    if (_ < f)
      return Eo(t.slice().reverse(), u.distr, g, vt(f / _)).reverse();
  }
  return Eo(t, u.distr, g, 1);
}
function Dh(e, t, i, n, r) {
  let s = e.axes[i], l = s.scale, u = s._space, d = e.valToPos, f = Me(d(1, l) - d(2, l));
  return f < u ? Eo(t.slice().reverse(), 3, _a, vt(u / f)).reverse() : t;
}
function Mh(e, t, i, n) {
  return n == null ? Uo : t == null ? "" : Go(t);
}
const yl = {
  show: !0,
  scale: "y",
  stroke: Bo,
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
  grid: Zo,
  ticks: pa,
  border: ga,
  font: Jo,
  lineGap: ba,
  rotate: 0
};
function zh(e, t) {
  let i = 3 + (e || 1) * 2;
  return ge(i * t, 3);
}
function Oh(e, t) {
  let { scale: i, idxs: n } = e.series[0], r = e._data[0], s = e.valToPos(r[n[0]], i, !0), l = e.valToPos(r[n[1]], i, !0), u = Me(l - s), d = e.series[t], f = u / (d.points.space * ce);
  return n[1] - n[0] <= f;
}
const wl = {
  scale: null,
  auto: !0,
  sorted: 0,
  // internal caches
  min: pe,
  max: -pe
}, va = (e, t, i, n, r) => r, xl = {
  show: !0,
  auto: !0,
  sorted: 0,
  gaps: va,
  alpha: 1,
  facets: [
    Pe({}, wl, { scale: "x" }),
    Pe({}, wl, { scale: "y" })
  ]
}, $l = {
  scale: "y",
  auto: !0,
  sorted: 0,
  show: !0,
  spanGaps: !1,
  gaps: va,
  alpha: 1,
  points: {
    show: Oh,
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
function Nh(e, t, i, n, r) {
  return i / 10;
}
const ya = {
  time: su,
  auto: !0,
  distr: 1,
  log: 10,
  asinh: 1,
  min: null,
  max: null,
  dir: 1,
  ori: 0
}, Hh = Pe({}, ya, {
  time: !1,
  ori: 1
}), Sl = {};
function wa(e, t) {
  let i = Sl[e];
  return i || (i = {
    key: e,
    plots: [],
    sub(n) {
      i.plots.push(n);
    },
    unsub(n) {
      i.plots = i.plots.filter((r) => r != n);
    },
    pub(n, r, s, l, u, d, f) {
      for (let b = 0; b < i.plots.length; b++)
        i.plots[b] != r && i.plots[b].pub(n, r, s, l, u, d, f);
    }
  }, e != null && (Sl[e] = i)), i;
}
const vn = 1, Po = 2;
function Ui(e, t, i) {
  const n = e.mode, r = e.series[t], s = n == 2 ? e._data[t] : e._data, l = e.scales, u = e.bbox;
  let d = s[0], f = n == 2 ? s[1] : s[t], b = n == 2 ? l[r.facets[0].scale] : l[e.series[0].scale], g = n == 2 ? l[r.facets[1].scale] : l[r.scale], _ = u.left, S = u.top, E = u.width, z = u.height, B = e.valToPosH, j = e.valToPosV;
  return b.ori == 0 ? i(
    r,
    d,
    f,
    b,
    g,
    B,
    j,
    _,
    S,
    E,
    z,
    Dr,
    Sn,
    zr,
    $a,
    ka
  ) : i(
    r,
    d,
    f,
    b,
    g,
    j,
    B,
    S,
    _,
    z,
    E,
    Mr,
    kn,
    es,
    Sa,
    Aa
  );
}
function Qo(e, t) {
  let i = 0, n = 0, r = le(e.bands, Yo);
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
function Lh(e, t, i, n, r) {
  let s = e.mode, l = e.series[t], u = s == 2 ? l.facets[1].scale : l.scale, d = e.scales[u];
  return r == -1 ? d.min : r == 1 ? d.max : d.distr == 3 ? d.dir == 1 ? d.min : d.max : 0;
}
function ei(e, t, i, n, r, s) {
  return Ui(e, t, (l, u, d, f, b, g, _, S, E, z, B) => {
    let j = l.pxRound;
    const w = f.dir * (f.ori == 0 ? 1 : -1), F = f.ori == 0 ? Sn : kn;
    let k, J;
    w == 1 ? (k = i, J = n) : (k = n, J = i);
    let M = j(g(u[k], f, z, S)), Q = j(_(d[k], b, B, E)), K = j(g(u[J], f, z, S)), te = j(_(s == 1 ? b.max : b.min, b, B, E)), Y = new Path2D(r);
    return F(Y, K, te), F(Y, M, te), F(Y, M, Q), Y;
  });
}
function Cr(e, t, i, n, r, s) {
  let l = null;
  if (e.length > 0) {
    l = new Path2D();
    const u = t == 0 ? zr : es;
    let d = i;
    for (let g = 0; g < e.length; g++) {
      let _ = e[g];
      if (_[1] > _[0]) {
        let S = _[0] - d;
        S > 0 && u(l, d, n, S, n + s), d = _[1];
      }
    }
    let f = i + r - d, b = 10;
    f > 0 && u(l, d, n - b / 2, f, n + s + b);
  }
  return l;
}
function Rh(e, t, i) {
  let n = e[e.length - 1];
  n && n[0] == t ? n[1] = i : e.push([t, i]);
}
function Xo(e, t, i, n, r, s, l) {
  let u = [], d = e.length;
  for (let f = r == 1 ? i : n; f >= i && f <= n; f += r)
    if (t[f] === null) {
      let g = f, _ = f;
      if (r == 1)
        for (; ++f <= n && t[f] === null; )
          _ = f;
      else
        for (; --f >= i && t[f] === null; )
          _ = f;
      let S = s(e[g]), E = _ == g ? S : s(e[_]), z = g - r;
      S = l <= 0 && z >= 0 && z < d ? s(e[z]) : S;
      let j = _ + r;
      E = l >= 0 && j >= 0 && j < d ? s(e[j]) : E, E >= S && u.push([S, E]);
    }
  return u;
}
function kl(e) {
  return e == 0 ? Ql : e == 1 ? De : (t) => zi(t, e);
}
function xa(e) {
  let t = e == 0 ? Dr : Mr, i = e == 0 ? (r, s, l, u, d, f) => {
    r.arcTo(s, l, u, d, f);
  } : (r, s, l, u, d, f) => {
    r.arcTo(l, s, d, u, f);
  }, n = e == 0 ? (r, s, l, u, d) => {
    r.rect(s, l, u, d);
  } : (r, s, l, u, d) => {
    r.rect(l, s, d, u);
  };
  return (r, s, l, u, d, f = 0, b = 0) => {
    f == 0 && b == 0 ? n(r, s, l, u, d) : (f = Ct(f, u / 2, d / 2), b = Ct(b, u / 2, d / 2), t(r, s + f, l), i(r, s + u, l, s + u, l + d, f), i(r, s + u, l + d, s, l + d, b), i(r, s, l + d, s, l, b), i(r, s, l, s + u, l, f), r.closePath());
  };
}
const Dr = (e, t, i) => {
  e.moveTo(t, i);
}, Mr = (e, t, i) => {
  e.moveTo(i, t);
}, Sn = (e, t, i) => {
  e.lineTo(t, i);
}, kn = (e, t, i) => {
  e.lineTo(i, t);
}, zr = xa(0), es = xa(1), $a = (e, t, i, n, r, s) => {
  e.arc(t, i, n, r, s);
}, Sa = (e, t, i, n, r, s) => {
  e.arc(i, t, n, r, s);
}, ka = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(t, i, n, r, s, l);
}, Aa = (e, t, i, n, r, s, l) => {
  e.bezierCurveTo(i, t, r, n, l, s);
};
function Ea(e) {
  return (t, i, n, r, s) => Ui(t, i, (l, u, d, f, b, g, _, S, E, z, B) => {
    let { pxRound: j, points: w } = l, F, k;
    f.ori == 0 ? (F = Dr, k = $a) : (F = Mr, k = Sa);
    const J = ge(w.width * ce, 3);
    let M = (w.size - w.width) / 2 * ce, Q = ge(M * 2, 3), K = new Path2D(), te = new Path2D(), { left: Y, top: A, width: Z, height: O } = t.bbox;
    zr(
      te,
      Y - Q,
      A - Q,
      Z + Q * 2,
      O + Q * 2
    );
    const V = (R) => {
      if (d[R] != null) {
        let ne = j(g(u[R], f, z, S)), L = j(_(d[R], b, B, E));
        F(K, ne + M, L), k(K, ne, L, M, 0, mr * 2);
      }
    };
    if (s)
      s.forEach(V);
    else
      for (let R = n; R <= r; R++)
        V(R);
    return {
      stroke: J > 0 ? K : null,
      fill: K,
      clip: te,
      flags: vn | Po
    };
  });
}
function Pa(e) {
  return (t, i, n, r, s, l) => {
    n != r && (s != n && l != n && e(t, i, n), s != r && l != r && e(t, i, r), e(t, i, l));
  };
}
const Fh = Pa(Sn), Ih = Pa(kn);
function Ta(e) {
  const t = le(e?.alignGaps, 0);
  return (i, n, r, s) => Ui(i, n, (l, u, d, f, b, g, _, S, E, z, B) => {
    [r, s] = Ar(d, r, s);
    let j = l.pxRound, w = (O) => j(g(O, f, z, S)), F = (O) => j(_(O, b, B, E)), k, J;
    f.ori == 0 ? (k = Sn, J = Fh) : (k = kn, J = Ih);
    const M = f.dir * (f.ori == 0 ? 1 : -1), Q = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: vn }, K = Q.stroke;
    let te = !1;
    if (s - r >= z * 4) {
      let O = (N) => i.posToVal(N, f.key, !0), V = null, R = null, ne, L, et, we = w(u[M == 1 ? r : s]), oe = w(u[r]), de = w(u[s]), X = O(M == 1 ? oe + 1 : de - 1);
      for (let N = M == 1 ? r : s; N >= r && N <= s; N += M) {
        let Te = u[N], xe = (M == 1 ? Te < X : Te > X) ? we : w(Te), ue = d[N];
        xe == we ? ue != null ? (L = ue, V == null ? (k(K, xe, F(L)), ne = V = R = L) : L < V ? V = L : L > R && (R = L)) : ue === null && (te = !0) : (V != null && J(K, we, F(V), F(R), F(ne), F(L)), ue != null ? (L = ue, k(K, xe, F(L)), V = R = ne = L) : (V = R = null, ue === null && (te = !0)), we = xe, X = O(we + M));
      }
      V != null && V != R && et != we && J(K, we, F(V), F(R), F(ne), F(L));
    } else
      for (let O = M == 1 ? r : s; O >= r && O <= s; O += M) {
        let V = d[O];
        V === null ? te = !0 : V != null && k(K, w(u[O]), F(V));
      }
    let [A, Z] = Qo(i, n);
    if (l.fill != null || A != 0) {
      let O = Q.fill = new Path2D(K), V = l.fillTo(i, n, l.min, l.max, A), R = F(V), ne = w(u[r]), L = w(u[s]);
      M == -1 && ([L, ne] = [ne, L]), k(O, L, R), k(O, ne, R);
    }
    if (!l.spanGaps) {
      let O = [];
      te && O.push(...Xo(u, d, r, s, M, w, t)), Q.gaps = O = l.gaps(i, n, r, s, O), Q.clip = Cr(O, f.ori, S, E, z, B);
    }
    return Z != 0 && (Q.band = Z == 2 ? [
      ei(i, n, r, s, K, -1),
      ei(i, n, r, s, K, 1)
    ] : ei(i, n, r, s, K, Z)), Q;
  });
}
function Bh(e) {
  const t = le(e.align, 1), i = le(e.ascDesc, !1), n = le(e.alignGaps, 0), r = le(e.extend, !1);
  return (s, l, u, d) => Ui(s, l, (f, b, g, _, S, E, z, B, j, w, F) => {
    [u, d] = Ar(g, u, d);
    let k = f.pxRound, { left: J, width: M } = s.bbox, Q = (oe) => k(E(oe, _, w, B)), K = (oe) => k(z(oe, S, F, j)), te = _.ori == 0 ? Sn : kn;
    const Y = { stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: vn }, A = Y.stroke, Z = _.dir * (_.ori == 0 ? 1 : -1);
    let O = K(g[Z == 1 ? u : d]), V = Q(b[Z == 1 ? u : d]), R = V, ne = V;
    r && t == -1 && (ne = J, te(A, ne, O)), te(A, V, O);
    for (let oe = Z == 1 ? u : d; oe >= u && oe <= d; oe += Z) {
      let de = g[oe];
      if (de == null)
        continue;
      let X = Q(b[oe]), N = K(de);
      t == 1 ? te(A, X, O) : te(A, R, N), te(A, X, N), O = N, R = X;
    }
    let L = R;
    r && t == 1 && (L = J + M, te(A, L, O));
    let [et, we] = Qo(s, l);
    if (f.fill != null || et != 0) {
      let oe = Y.fill = new Path2D(A), de = f.fillTo(s, l, f.min, f.max, et), X = K(de);
      te(oe, L, X), te(oe, ne, X);
    }
    if (!f.spanGaps) {
      let oe = [];
      oe.push(...Xo(b, g, u, d, Z, Q, n));
      let de = f.width * ce / 2, X = i || t == 1 ? de : -de, N = i || t == -1 ? -de : de;
      oe.forEach((Te) => {
        Te[0] += X, Te[1] += N;
      }), Y.gaps = oe = f.gaps(s, l, u, d, oe), Y.clip = Cr(oe, _.ori, B, j, w, F);
    }
    return we != 0 && (Y.band = we == 2 ? [
      ei(s, l, u, d, A, -1),
      ei(s, l, u, d, A, 1)
    ] : ei(s, l, u, d, A, we)), Y;
  });
}
function Al(e, t, i, n, r, s, l = pe) {
  if (e.length > 1) {
    let u = null;
    for (let d = 0, f = 1 / 0; d < e.length; d++)
      if (t[d] !== void 0) {
        if (u != null) {
          let b = Me(e[d] - e[u]);
          b < f && (f = b, l = Me(i(e[d], n, r, s) - i(e[u], n, r, s)));
        }
        u = d;
      }
  }
  return l;
}
function Uh(e) {
  e = e || Gn;
  const t = le(e.size, [0.6, pe, 1]), i = e.align || 0, n = e.gap || 0;
  let r = e.radius;
  r = // [valueRadius, baselineRadius]
  r == null ? [0, 0] : typeof r == "number" ? [r, 0] : r;
  const s = ie(r), l = 1 - t[0], u = le(t[1], pe), d = le(t[2], 1), f = le(e.disp, Gn), b = le(e.each, (S) => {
  }), { fill: g, stroke: _ } = f;
  return (S, E, z, B) => Ui(S, E, (j, w, F, k, J, M, Q, K, te, Y, A) => {
    let Z = j.pxRound, O = i, V = n * ce, R = u * ce, ne = d * ce, L, et;
    k.ori == 0 ? [L, et] = s(S, E) : [et, L] = s(S, E);
    const we = k.dir * (k.ori == 0 ? 1 : -1);
    let oe = k.ori == 0 ? zr : es, de = k.ori == 0 ? b : (C, me, Ce, Gi, $i, Nt, Si) => {
      b(C, me, Ce, $i, Gi, Si, Nt);
    }, X = le(S.bands, Yo).find((C) => C.series[0] == E), N = X != null ? X.dir : 0, Te = j.fillTo(S, E, j.min, j.max, N), Ge = Z(Q(Te, J, A, te)), xe, ue, xt, nt = Y, Se = Z(j.width * ce), Ot = !1, Kt = null, ht = null, oi = null, ji = null;
    g != null && (Se == 0 || _ != null) && (Ot = !0, Kt = g.values(S, E, z, B), ht = /* @__PURE__ */ new Map(), new Set(Kt).forEach((C) => {
      C != null && ht.set(C, new Path2D());
    }), Se > 0 && (oi = _.values(S, E, z, B), ji = /* @__PURE__ */ new Map(), new Set(oi).forEach((C) => {
      C != null && ji.set(C, new Path2D());
    })));
    let { x0: Vi, size: Tn } = f;
    if (Vi != null && Tn != null) {
      O = 1, w = Vi.values(S, E, z, B), Vi.unit == 2 && (w = w.map((Ce) => S.posToVal(K + Ce * Y, k.key, !0)));
      let C = Tn.values(S, E, z, B);
      Tn.unit == 2 ? ue = C[0] * Y : ue = M(C[0], k, Y, K) - M(0, k, Y, K), nt = Al(w, F, M, k, Y, K, nt), xt = nt - ue + V;
    } else
      nt = Al(w, F, M, k, Y, K, nt), xt = nt * l + V, ue = nt - xt;
    xt < 1 && (xt = 0), Se >= ue / 2 && (Se = 0), xt < 5 && (Z = Ql);
    let tr = xt > 0, wi = nt - xt - (tr ? Se : 0);
    ue = Z(ko(wi, ne, R)), xe = (O == 0 ? ue / 2 : O == we ? 0 : ue) - O * we * ((O == 0 ? V / 2 : 0) + (tr ? Se / 2 : 0));
    const Ye = { stroke: null, fill: null, clip: null, band: null, gaps: null, flags: 0 }, Wi = Ot ? null : new Path2D();
    let qt = null;
    if (X != null)
      qt = S.data[X.series[1]];
    else {
      let { y0: C, y1: me } = f;
      C != null && me != null && (F = me.values(S, E, z, B), qt = C.values(S, E, z, B));
    }
    let xi = L * ue, q = et * ue;
    for (let C = we == 1 ? z : B; C >= z && C <= B; C += we) {
      let me = F[C];
      if (me == null)
        continue;
      if (qt != null) {
        let tt = qt[C] ?? 0;
        if (me - tt == 0)
          continue;
        Ge = Q(tt, J, A, te);
      }
      let Ce = k.distr != 2 || f != null ? w[C] : C, Gi = M(Ce, k, Y, K), $i = Q(le(me, Te), J, A, te), Nt = Z(Gi - xe), Si = Z(Je($i, Ge)), rt = Z(Ct($i, Ge)), dt = Si - rt;
      if (me != null) {
        let tt = me < 0 ? q : xi, $t = me < 0 ? xi : q;
        Ot ? (Se > 0 && oi[C] != null && oe(ji.get(oi[C]), Nt, rt + ct(Se / 2), ue, Je(0, dt - Se), tt, $t), Kt[C] != null && oe(ht.get(Kt[C]), Nt, rt + ct(Se / 2), ue, Je(0, dt - Se), tt, $t)) : oe(Wi, Nt, rt + ct(Se / 2), ue, Je(0, dt - Se), tt, $t), de(
          S,
          E,
          C,
          Nt - Se / 2,
          rt,
          ue + Se,
          dt
        );
      }
    }
    return Se > 0 ? Ye.stroke = Ot ? ji : Wi : Ot || (Ye._fill = j.width == 0 ? j._fill : j._stroke ?? j._fill, Ye.width = 0), Ye.fill = Ot ? ht : Wi, Ye;
  });
}
function jh(e, t) {
  const i = le(t?.alignGaps, 0);
  return (n, r, s, l) => Ui(n, r, (u, d, f, b, g, _, S, E, z, B, j) => {
    [s, l] = Ar(f, s, l);
    let w = u.pxRound, F = (L) => w(_(L, b, B, E)), k = (L) => w(S(L, g, j, z)), J, M, Q;
    b.ori == 0 ? (J = Dr, Q = Sn, M = ka) : (J = Mr, Q = kn, M = Aa);
    const K = b.dir * (b.ori == 0 ? 1 : -1);
    let te = F(d[K == 1 ? s : l]), Y = te, A = [], Z = [];
    for (let L = K == 1 ? s : l; L >= s && L <= l; L += K)
      if (f[L] != null) {
        let we = d[L], oe = F(we);
        A.push(Y = oe), Z.push(k(f[L]));
      }
    const O = { stroke: e(A, Z, J, Q, M, w), fill: null, clip: null, band: null, gaps: null, flags: vn }, V = O.stroke;
    let [R, ne] = Qo(n, r);
    if (u.fill != null || R != 0) {
      let L = O.fill = new Path2D(V), et = u.fillTo(n, r, u.min, u.max, R), we = k(et);
      Q(L, Y, we), Q(L, te, we);
    }
    if (!u.spanGaps) {
      let L = [];
      L.push(...Xo(d, f, s, l, K, F, i)), O.gaps = L = u.gaps(n, r, s, l, L), O.clip = Cr(L, b.ori, E, z, B, j);
    }
    return ne != 0 && (O.band = ne == 2 ? [
      ei(n, r, s, l, V, -1),
      ei(n, r, s, l, V, 1)
    ] : ei(n, r, s, l, V, ne)), O;
  });
}
function Vh(e) {
  return jh(Wh, e);
}
function Wh(e, t, i, n, r, s) {
  const l = e.length;
  if (l < 2)
    return null;
  const u = new Path2D();
  if (i(u, e[0], t[0]), l == 2)
    n(u, e[1], t[1]);
  else {
    let d = Array(l), f = Array(l - 1), b = Array(l - 1), g = Array(l - 1);
    for (let _ = 0; _ < l - 1; _++)
      b[_] = t[_ + 1] - t[_], g[_] = e[_ + 1] - e[_], f[_] = b[_] / g[_];
    d[0] = f[0];
    for (let _ = 1; _ < l - 1; _++)
      f[_] === 0 || f[_ - 1] === 0 || f[_ - 1] > 0 != f[_] > 0 ? d[_] = 0 : (d[_] = 3 * (g[_ - 1] + g[_]) / ((2 * g[_] + g[_ - 1]) / f[_ - 1] + (g[_] + 2 * g[_ - 1]) / f[_]), isFinite(d[_]) || (d[_] = 0));
    d[l - 1] = f[l - 2];
    for (let _ = 0; _ < l - 1; _++)
      r(
        u,
        e[_] + g[_] / 3,
        t[_] + d[_] * g[_] / 3,
        e[_ + 1] - g[_] / 3,
        t[_ + 1] - d[_ + 1] * g[_] / 3,
        e[_ + 1],
        t[_ + 1]
      );
  }
  return u;
}
const To = /* @__PURE__ */ new Set();
function El() {
  for (let e of To)
    e.syncRect(!0);
}
$n && (Li(ku, fn, El), Li(Au, fn, El, !0), Li(wr, fn, () => {
  We.pxRatio = ce;
}));
const Gh = Ta(), Yh = Ea();
function Pl(e, t, i, n) {
  return (n ? [e[0], e[1]].concat(e.slice(2)) : [e[0]].concat(e.slice(1))).map((s, l) => Co(s, l, t, i));
}
function Kh(e, t) {
  return e.map((i, n) => n == 0 ? {} : Pe({}, t, i));
}
function Co(e, t, i, n) {
  return Pe({}, t == 0 ? i : n, e);
}
function Ca(e, t, i) {
  return t == null ? bn : [t, i];
}
const qh = Ca;
function Zh(e, t, i) {
  return t == null ? bn : xr(t, i, Wo, !0);
}
function Da(e, t, i, n) {
  return t == null ? bn : Er(t, i, e.scales[n].log, !1);
}
const Jh = Da;
function Ma(e, t, i, n) {
  return t == null ? bn : Vo(t, i, e.scales[n].log, !1);
}
const Qh = Ma;
function Xh(e, t, i, n, r) {
  let s = Je(sl(e), sl(t)), l = t - e, u = Tt(r / n * l, i);
  do {
    let d = i[u], f = n * d / l;
    if (f >= r && s + (d < 5 ? gi.get(d) : 0) <= 17)
      return [d, f];
  } while (++u < i.length);
  return [0, 0];
}
function Tl(e) {
  let t, i;
  return e = e.replace(/(\d+)px/, (n, r) => (t = De((i = +r) * ce)) + "px"), [e, t, i];
}
function ed(e) {
  e.show && [e.font, e.labelFont].forEach((t) => {
    let i = ge(t[2] * ce, 1);
    t[0] = t[0].replace(/[0-9.]+px/, i + "px"), t[1] = i;
  });
}
function We(e, t, i) {
  const n = {
    mode: le(e.mode, 1)
  }, r = n.mode;
  function s(o, a, c, h) {
    let p = a.valToPct(o);
    return h + c * (a.dir == -1 ? 1 - p : p);
  }
  function l(o, a, c, h) {
    let p = a.valToPct(o);
    return h + c * (a.dir == -1 ? p : 1 - p);
  }
  function u(o, a, c, h) {
    return a.ori == 0 ? s(o, a, c, h) : l(o, a, c, h);
  }
  n.valToPosH = s, n.valToPosV = l;
  let d = !1;
  n.status = 0;
  const f = n.root = _t(lu);
  if (e.id != null && (f.id = e.id), at(f, e.class), e.title) {
    let o = _t(uu, f);
    o.textContent = e.title;
  }
  const b = Et("canvas"), g = n.ctx = b.getContext("2d"), _ = _t(hu, f);
  Li("click", _, (o) => {
    o.target === E && (be != rn || $e != on) && Ue.click(n, o);
  }, !0);
  const S = n.under = _t(du, _);
  _.appendChild(b);
  const E = n.over = _t(fu, _);
  e = _n(e);
  const z = +le(e.pxAlign, 1), B = kl(z);
  (e.plugins || []).forEach((o) => {
    o.opts && (e = o.opts(n, e) || e);
  });
  const j = e.ms || 1e-3, w = n.series = r == 1 ? Pl(e.series || [], _l, $l, !1) : Kh(e.series || [null], xl), F = n.axes = Pl(e.axes || [], bl, yl, !0), k = n.scales = {}, J = n.bands = e.bands || [];
  J.forEach((o) => {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1);
  });
  const M = r == 2 ? w[1].facets[0].scale : w[0].scale, Q = {
    axes: Ka,
    series: ja
  }, K = (e.drawOrder || ["axes", "series"]).map((o) => Q[o]);
  function te(o) {
    const a = o.distr == 3 ? (c) => Xt(c > 0 ? c : o.clamp(n, c, o.min, o.max, o.key)) : o.distr == 4 ? (c) => uo(c, o.asinh) : o.distr == 100 ? (c) => o.fwd(c) : (c) => c;
    return (c) => {
      let h = a(c), { _min: p, _max: m } = o, v = m - p;
      return (h - p) / v;
    };
  }
  function Y(o) {
    let a = k[o];
    if (a == null) {
      let c = (e.scales || Gn)[o] || Gn;
      if (c.from != null) {
        Y(c.from);
        let h = Pe({}, k[c.from], c, { key: o });
        h.valToPct = te(h), k[o] = h;
      } else {
        a = k[o] = Pe({}, o == M ? ya : Hh, c), a.key = o;
        let h = a.time, p = a.range, m = hi(p);
        if ((o != M || r == 2 && !h) && (m && (p[0] == null || p[1] == null) && (p = {
          min: p[0] == null ? nl : {
            mode: 1,
            hard: p[0],
            soft: p[0]
          },
          max: p[1] == null ? nl : {
            mode: 1,
            hard: p[1],
            soft: p[1]
          }
        }, m = !1), !m && Tr(p))) {
          let v = p;
          p = (y, x, P) => x == null ? bn : xr(x, P, v);
        }
        a.range = ie(p || (h ? qh : o == M ? a.distr == 3 ? Jh : a.distr == 4 ? Qh : Ca : a.distr == 3 ? Da : a.distr == 4 ? Ma : Zh)), a.auto = ie(m ? !1 : a.auto), a.clamp = ie(a.clamp || Nh), a._min = a._max = null, a.valToPct = te(a);
      }
    }
  }
  Y("x"), Y("y"), r == 1 && w.forEach((o) => {
    Y(o.scale);
  }), F.forEach((o) => {
    Y(o.scale);
  });
  for (let o in e.scales)
    Y(o);
  const A = k[M], Z = A.distr;
  let O, V;
  A.ori == 0 ? (at(f, au), O = s, V = l) : (at(f, cu), O = l, V = s);
  const R = {};
  for (let o in k) {
    let a = k[o];
    (a.min != null || a.max != null) && (R[o] = { min: a.min, max: a.max }, a.min = a.max = null);
  }
  const ne = e.tzDate || ((o) => new Date(De(o / j))), L = e.fmtDate || Ko, et = j == 1 ? ah(ne) : hh(ne), we = pl(ne, fl(j == 1 ? lh : uh, L)), oe = ml(ne, gl(fh, L)), de = [], X = n.legend = Pe({}, mh, e.legend), N = n.cursor = Pe({}, xh, { drag: { y: r == 2 } }, e.cursor), Te = X.show, Ge = N.show, xe = X.markers;
  X.idxs = de, xe.width = ie(xe.width), xe.dash = ie(xe.dash), xe.stroke = ie(xe.stroke), xe.fill = ie(xe.fill);
  let ue, xt, nt, Se = [], Ot = [], Kt, ht = !1, oi = {};
  if (X.live) {
    const o = w[1] ? w[1].values : null;
    ht = o != null, Kt = ht ? o(n, 1, 0) : { _: 0 };
    for (let a in Kt)
      oi[a] = Uo;
  }
  if (Te)
    if (ue = Et("table", vu, f), nt = Et("tbody", null, ue), X.mount(n, ue), ht) {
      xt = Et("thead", null, ue, nt);
      let o = Et("tr", null, xt);
      Et("th", null, o);
      for (var ji in Kt)
        Et("th", Vs, o).textContent = ji;
    } else
      at(ue, wu), X.live && at(ue, yu);
  const Vi = { show: !0 }, Tn = { show: !1 };
  function tr(o, a) {
    if (a == 0 && (ht || !X.live || r == 2))
      return bn;
    let c = [], h = Et("tr", xu, nt, nt.childNodes[a]);
    at(h, o.class), o.show || at(h, Ni);
    let p = Et("th", null, h);
    if (xe.show) {
      let y = _t($u, p);
      if (a > 0) {
        let x = xe.width(n, a);
        x && (y.style.border = x + "px " + xe.dash(n, a) + " " + xe.stroke(n, a)), y.style.background = xe.fill(n, a);
      }
    }
    let m = _t(Vs, p);
    o.label instanceof HTMLElement ? m.appendChild(o.label) : m.textContent = o.label, a > 0 && (xe.show || (m.style.color = o.width > 0 ? xe.stroke(n, a) : xe.fill(n, a)), Ye("click", p, (y) => {
      if (N._lock)
        return;
      Ai(y);
      let x = w.indexOf(o);
      if ((y.ctrlKey || y.metaKey) != X.isolate) {
        let P = w.some((T, D) => D > 0 && D != x && T.show);
        w.forEach((T, D) => {
          D > 0 && Lt(D, P ? D == x ? Vi : Tn : Vi, !0, Ee.setSeries);
        });
      } else
        Lt(x, { show: !o.show }, !0, Ee.setSeries);
    }, !1), Ki && Ye(Ks, p, (y) => {
      N._lock || (Ai(y), Lt(w.indexOf(o), ln, !0, Ee.setSeries));
    }, !1));
    for (var v in Kt) {
      let y = Et("td", Su, h);
      y.textContent = "--", c.push(y);
    }
    return [h, c];
  }
  const wi = /* @__PURE__ */ new Map();
  function Ye(o, a, c, h = !0) {
    const p = wi.get(a) || {}, m = N.bind[o](n, a, c, h);
    m && (Li(o, a, p[o] = m), wi.set(a, p));
  }
  function Wi(o, a, c) {
    const h = wi.get(a) || {};
    for (let p in h)
      (o == null || p == o) && (So(p, a, h[p]), delete h[p]);
    o == null && wi.delete(a);
  }
  let qt = 0, xi = 0, q = 0, C = 0, me = 0, Ce = 0, Gi = me, $i = Ce, Nt = q, Si = C, rt = 0, dt = 0, tt = 0, $t = 0;
  n.bbox = {};
  let Hr = !1, ir = !1, Yi = !1, ki = !1, nr = !1, ft = !1;
  function Lr(o, a, c) {
    (c || o != n.width || a != n.height) && ns(o, a), Xi(!1), Yi = !0, ir = !0, en();
  }
  function ns(o, a) {
    n.width = qt = q = o, n.height = xi = C = a, me = Ce = 0, Ha(), La();
    let c = n.bbox;
    rt = c.left = zi(me * ce, 0.5), dt = c.top = zi(Ce * ce, 0.5), tt = c.width = zi(q * ce, 0.5), $t = c.height = zi(C * ce, 0.5);
  }
  const za = 3;
  function Oa() {
    let o = !1, a = 0;
    for (; !o; ) {
      a++;
      let c = Ga(a), h = Ya(a);
      o = a == za || c && h, o || (ns(n.width, n.height), ir = !0);
    }
  }
  function Na({ width: o, height: a }) {
    Lr(o, a);
  }
  n.setSize = Na;
  function Ha() {
    let o = !1, a = !1, c = !1, h = !1;
    F.forEach((p, m) => {
      if (p.show && p._show) {
        let { side: v, _size: y } = p, x = v % 2, P = p.label != null ? p.labelSize : 0, T = y + P;
        T > 0 && (x ? (q -= T, v == 3 ? (me += T, h = !0) : c = !0) : (C -= T, v == 0 ? (Ce += T, o = !0) : a = !0));
      }
    }), Ei[0] = o, Ei[1] = c, Ei[2] = a, Ei[3] = h, q -= si[1] + si[3], me += si[3], C -= si[2] + si[0], Ce += si[0];
  }
  function La() {
    let o = me + q, a = Ce + C, c = me, h = Ce;
    function p(m, v) {
      switch (m) {
        case 1:
          return o += v, o - v;
        case 2:
          return a += v, a - v;
        case 3:
          return c -= v, c + v;
        case 0:
          return h -= v, h + v;
      }
    }
    F.forEach((m, v) => {
      if (m.show && m._show) {
        let y = m.side;
        m._pos = p(y, m._size), m.label != null && (m._lpos = p(y, m.labelSize));
      }
    });
  }
  if (N.dataIdx == null) {
    let o = N.hover, a = o.skip = new Set(o.skip ?? []);
    a.add(void 0);
    let c = o.prox = ie(o.prox), h = o.bias ??= 0;
    N.dataIdx = (p, m, v, y) => {
      if (m == 0)
        return v;
      let x = v, P = c(p, m, v, y) ?? pe, T = P >= 0 && P < pe, D = A.ori == 0 ? q : C, W = N.left, ae = t[0], se = t[m];
      if (a.has(se[v])) {
        x = null;
        let ee = null, U = null, H;
        if (h == 0 || h == -1)
          for (H = v; ee == null && H-- > 0; )
            a.has(se[H]) || (ee = H);
        if (h == 0 || h == 1)
          for (H = v; U == null && H++ < se.length; )
            a.has(se[H]) || (U = H);
        if (ee != null || U != null)
          if (T) {
            let ve = ee == null ? -1 / 0 : O(ae[ee], A, D, 0), ke = U == null ? 1 / 0 : O(ae[U], A, D, 0), Ie = W - ve, fe = ke - W;
            Ie <= fe ? Ie <= P && (x = ee) : fe <= P && (x = U);
          } else
            x = U == null ? ee : ee == null ? U : v - ee <= U - v ? ee : U;
      } else T && Me(W - O(ae[v], A, D, 0)) > P && (x = null);
      return x;
    };
  }
  const Ai = (o) => {
    N.event = o;
  };
  N.idxs = de, N._lock = !1;
  let Ve = N.points;
  Ve.show = ie(Ve.show), Ve.size = ie(Ve.size), Ve.stroke = ie(Ve.stroke), Ve.width = ie(Ve.width), Ve.fill = ie(Ve.fill);
  const Ht = n.focus = Pe({}, e.focus || { alpha: 0.3 }, N.focus), Ki = Ht.prox >= 0, qi = Ki && Ve.one;
  let pt = [], Zi = [], Ji = [];
  function rs(o, a) {
    let c = Ve.show(n, a);
    if (c instanceof HTMLElement)
      return at(c, _u), at(c, o.class), Bt(c, -10, -10, q, C), E.insertBefore(c, pt[a]), c;
  }
  function os(o, a) {
    if (r == 1 || a > 0) {
      let c = r == 1 && k[o.scale].time, h = o.value;
      o.value = c ? cl(h) ? ml(ne, gl(h, L)) : h || oe : h || Mh, o.label = o.label || (c ? Sh : $h);
    }
    if (qi || a > 0) {
      o.width = o.width == null ? 1 : o.width, o.paths = o.paths || Gh || Hu, o.fillTo = ie(o.fillTo || Lh), o.pxAlign = +le(o.pxAlign, z), o.pxRound = kl(o.pxAlign), o.stroke = ie(o.stroke || null), o.fill = ie(o.fill || null), o._stroke = o._fill = o._paths = o._focus = null;
      let c = zh(Je(1, o.width), 1), h = o.points = Pe({}, {
        size: c,
        width: Je(1, c * 0.2),
        stroke: o.stroke,
        space: c * 2,
        paths: Yh,
        _stroke: null,
        _fill: null
      }, o.points);
      h.show = ie(h.show), h.filter = ie(h.filter), h.fill = ie(h.fill), h.stroke = ie(h.stroke), h.paths = ie(h.paths), h.pxAlign = o.pxAlign;
    }
    if (Te) {
      let c = tr(o, a);
      Se.splice(a, 0, c[0]), Ot.splice(a, 0, c[1]), X.values.push(null);
    }
    if (Ge) {
      de.splice(a, 0, null);
      let c = null;
      qi ? a == 0 && (c = rs(o, a)) : a > 0 && (c = rs(o, a)), pt.splice(a, 0, c), Zi.splice(a, 0, 0), Ji.splice(a, 0, 0);
    }
    Fe("addSeries", a);
  }
  function Ra(o, a) {
    a = a ?? w.length, o = r == 1 ? Co(o, a, _l, $l) : Co(o, a, {}, xl), w.splice(a, 0, o), os(w[a], a);
  }
  n.addSeries = Ra;
  function Fa(o) {
    if (w.splice(o, 1), Te) {
      X.values.splice(o, 1), Ot.splice(o, 1);
      let a = Se.splice(o, 1)[0];
      Wi(null, a.firstChild), a.remove();
    }
    Ge && (de.splice(o, 1), pt.splice(o, 1)[0].remove(), Zi.splice(o, 1), Ji.splice(o, 1)), Fe("delSeries", o);
  }
  n.delSeries = Fa;
  const Ei = [!1, !1, !1, !1];
  function Ia(o, a) {
    if (o._show = o.show, o.show) {
      let c = o.side % 2, h = k[o.scale];
      h == null && (o.scale = c ? w[1].scale : M, h = k[o.scale]);
      let p = h.time;
      o.size = ie(o.size), o.space = ie(o.space), o.rotate = ie(o.rotate), hi(o.incrs) && o.incrs.forEach((v) => {
        !gi.has(v) && gi.set(v, ta(v));
      }), o.incrs = ie(o.incrs || (h.distr == 2 ? rh : p ? j == 1 ? sh : ch : Oi)), o.splits = ie(o.splits || (p && h.distr == 1 ? et : h.distr == 3 ? Ao : h.distr == 4 ? Eh : Ah)), o.stroke = ie(o.stroke), o.grid.stroke = ie(o.grid.stroke), o.ticks.stroke = ie(o.ticks.stroke), o.border.stroke = ie(o.border.stroke);
      let m = o.values;
      o.values = // static array of tick values
      hi(m) && !hi(m[0]) ? ie(m) : (
        // temporal
        p ? (
          // config array of fmtDate string tpls
          hi(m) ? pl(ne, fl(m, L)) : (
            // fmtDate string tpl
            cl(m) ? dh(ne, m) : m || we
          )
        ) : m || kh
      ), o.filter = ie(o.filter || (h.distr >= 3 && h.log == 10 ? Ch : h.distr == 3 && h.log == 2 ? Dh : Xl)), o.font = Tl(o.font), o.labelFont = Tl(o.labelFont), o._size = o.size(n, null, a, 0), o._space = o._rotate = o._incrs = o._found = // foundIncrSpace
      o._splits = o._values = null, o._size > 0 && (Ei[a] = !0, o._el = _t(pu, _));
    }
  }
  function Cn(o, a, c, h) {
    let [p, m, v, y] = c, x = a % 2, P = 0;
    return x == 0 && (y || m) && (P = a == 0 && !p || a == 2 && !v ? De(bl.size / 3) : 0), x == 1 && (p || v) && (P = a == 1 && !m || a == 3 && !y ? De(yl.size / 2) : 0), P;
  }
  const ss = n.padding = (e.padding || [Cn, Cn, Cn, Cn]).map((o) => ie(le(o, Cn))), si = n._padding = ss.map((o, a) => o(n, a, Ei, 0));
  let Be, Ne = null, He = null;
  const rr = r == 1 ? w[0].idxs : null;
  let St = null, Dn = !1;
  function ls(o, a) {
    if (t = o ?? [], n.data = n._data = t, r == 2) {
      Be = 0;
      for (let c = 1; c < w.length; c++)
        Be += t[c][0].length;
    } else {
      t.length == 0 && (n.data = n._data = t = [[]]), St = t[0], Be = St.length;
      let c = t;
      if (Z == 2) {
        c = t.slice();
        let h = c[0] = Array(Be);
        for (let p = 0; p < Be; p++)
          h[p] = p;
      }
      n._data = t = c;
    }
    if (Xi(!0), Fe("setData"), Z == 2 && (Yi = !0), a !== !1) {
      let c = A;
      c.auto(n, Dn) ? Rr() : ai(M, c.min, c.max), ki = ki || N.left >= 0, ft = !0, en();
    }
  }
  n.setData = ls;
  function Rr() {
    Dn = !0;
    let o, a;
    r == 1 && (Be > 0 ? (Ne = rr[0] = 0, He = rr[1] = Be - 1, o = t[0][Ne], a = t[0][He], Z == 2 ? (o = Ne, a = He) : o == a && (Z == 3 ? [o, a] = Er(o, o, A.log, !1) : Z == 4 ? [o, a] = Vo(o, o, A.log, !1) : A.time ? a = o + De(86400 / j) : [o, a] = xr(o, a, Wo, !0))) : (Ne = rr[0] = o = null, He = rr[1] = a = null)), ai(M, o, a);
  }
  let or, Qi, Fr, Ir, Br, Ur, jr, Vr, Wr, it;
  function as(o, a, c, h, p, m) {
    o ??= Gs, c ??= Yo, h ??= "butt", p ??= Gs, m ??= "round", o != or && (g.strokeStyle = or = o), p != Qi && (g.fillStyle = Qi = p), a != Fr && (g.lineWidth = Fr = a), m != Br && (g.lineJoin = Br = m), h != Ur && (g.lineCap = Ur = h), c != Ir && g.setLineDash(Ir = c);
  }
  function cs(o, a, c, h) {
    a != Qi && (g.fillStyle = Qi = a), o != jr && (g.font = jr = o), c != Vr && (g.textAlign = Vr = c), h != Wr && (g.textBaseline = Wr = h);
  }
  function Gr(o, a, c, h, p = 0) {
    if (h.length > 0 && o.auto(n, Dn) && (a == null || a.min == null)) {
      let m = le(Ne, 0), v = le(He, h.length - 1), y = c.min == null ? Cu(h, m, v, p, o.distr == 3) : [c.min, c.max];
      o.min = Ct(o.min, c.min = y[0]), o.max = Je(o.max, c.max = y[1]);
    }
  }
  const us = { min: null, max: null };
  function Ba() {
    for (let h in k) {
      let p = k[h];
      R[h] == null && // scales that have never been set (on init)
      (p.min == null || // or auto scales when the x scale was explicitly set
      R[M] != null && p.auto(n, Dn)) && (R[h] = us);
    }
    for (let h in k) {
      let p = k[h];
      R[h] == null && p.from != null && R[p.from] != null && (R[h] = us);
    }
    R[M] != null && Xi(!0);
    let o = {};
    for (let h in R) {
      let p = R[h];
      if (p != null) {
        let m = o[h] = _n(k[h], Fu);
        if (p.min != null)
          Pe(m, p);
        else if (h != M || r == 2)
          if (Be == 0 && m.from == null) {
            let v = m.range(n, null, null, h);
            m.min = v[0], m.max = v[1];
          } else
            m.min = pe, m.max = -pe;
      }
    }
    if (Be > 0) {
      w.forEach((h, p) => {
        if (r == 1) {
          let m = h.scale, v = R[m];
          if (v == null)
            return;
          let y = o[m];
          if (p == 0) {
            let x = y.range(n, y.min, y.max, m);
            y.min = x[0], y.max = x[1], Ne = Tt(y.min, t[0]), He = Tt(y.max, t[0]), He - Ne > 1 && (t[0][Ne] < y.min && Ne++, t[0][He] > y.max && He--), h.min = St[Ne], h.max = St[He];
          } else h.show && h.auto && Gr(y, v, h, t[p], h.sorted);
          h.idxs[0] = Ne, h.idxs[1] = He;
        } else if (p > 0 && h.show && h.auto) {
          let [m, v] = h.facets, y = m.scale, x = v.scale, [P, T] = t[p], D = o[y], W = o[x];
          D != null && Gr(D, R[y], m, P, m.sorted), W != null && Gr(W, R[x], v, T, v.sorted), h.min = v.min, h.max = v.max;
        }
      });
      for (let h in o) {
        let p = o[h], m = R[h];
        if (p.from == null && (m == null || m.min == null)) {
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
    for (let h in o) {
      let p = o[h];
      if (p.from != null) {
        let m = o[p.from];
        if (m.min == null)
          p.min = p.max = null;
        else {
          let v = p.range(n, m.min, m.max, h);
          p.min = v[0], p.max = v[1];
        }
      }
    }
    let a = {}, c = !1;
    for (let h in o) {
      let p = o[h], m = k[h];
      if (m.min != p.min || m.max != p.max) {
        m.min = p.min, m.max = p.max;
        let v = m.distr;
        m._min = v == 3 ? Xt(m.min) : v == 4 ? uo(m.min, m.asinh) : v == 100 ? m.fwd(m.min) : m.min, m._max = v == 3 ? Xt(m.max) : v == 4 ? uo(m.max, m.asinh) : v == 100 ? m.fwd(m.max) : m.max, a[h] = c = !0;
      }
    }
    if (c) {
      w.forEach((h, p) => {
        r == 2 ? p > 0 && a.y && (h._paths = null) : a[h.scale] && (h._paths = null);
      });
      for (let h in a)
        Yi = !0, Fe("setScale", h);
      Ge && N.left >= 0 && (ki = ft = !0);
    }
    for (let h in R)
      R[h] = null;
  }
  function Ua(o) {
    let a = ko(Ne - 1, 0, Be - 1), c = ko(He + 1, 0, Be - 1);
    for (; o[a] == null && a > 0; )
      a--;
    for (; o[c] == null && c < Be - 1; )
      c++;
    return [a, c];
  }
  function ja() {
    if (Be > 0) {
      let o = w.some((a) => a._focus) && it != Ht.alpha;
      o && (g.globalAlpha = it = Ht.alpha), w.forEach((a, c) => {
        if (c > 0 && a.show && (hs(c, !1), hs(c, !0), a._paths == null)) {
          let h = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha);
          let p = r == 2 ? [0, t[c][0].length - 1] : Ua(t[c]);
          a._paths = a.paths(n, c, p[0], p[1]), it != h && (g.globalAlpha = it = h);
        }
      }), w.forEach((a, c) => {
        if (c > 0 && a.show) {
          let h = it;
          it != a.alpha && (g.globalAlpha = it = a.alpha), a._paths != null && ds(c, !1);
          {
            let p = a._paths != null ? a._paths.gaps : null, m = a.points.show(n, c, Ne, He, p), v = a.points.filter(n, c, m, p);
            (m || v) && (a.points._paths = a.points.paths(n, c, Ne, He, v), ds(c, !0));
          }
          it != h && (g.globalAlpha = it = h), Fe("drawSeries", c);
        }
      }), o && (g.globalAlpha = it = 1);
    }
  }
  function hs(o, a) {
    let c = a ? w[o].points : w[o];
    c._stroke = c.stroke(n, o), c._fill = c.fill(n, o);
  }
  function ds(o, a) {
    let c = a ? w[o].points : w[o], {
      stroke: h,
      fill: p,
      clip: m,
      flags: v,
      _stroke: y = c._stroke,
      _fill: x = c._fill,
      _width: P = c.width
    } = c._paths;
    P = ge(P * ce, 3);
    let T = null, D = P % 2 / 2;
    a && x == null && (x = P > 0 ? "#fff" : y);
    let W = c.pxAlign == 1 && D > 0;
    if (W && g.translate(D, D), !a) {
      let ae = rt - P / 2, se = dt - P / 2, ee = tt + P, U = $t + P;
      T = new Path2D(), T.rect(ae, se, ee, U);
    }
    a ? Yr(y, P, c.dash, c.cap, x, h, p, v, m) : Va(o, y, P, c.dash, c.cap, x, h, p, v, T, m), W && g.translate(-D, -D);
  }
  function Va(o, a, c, h, p, m, v, y, x, P, T) {
    let D = !1;
    x != 0 && J.forEach((W, ae) => {
      if (W.series[0] == o) {
        let se = w[W.series[1]], ee = t[W.series[1]], U = (se._paths || Gn).band;
        hi(U) && (U = W.dir == 1 ? U[0] : U[1]);
        let H, ve = null;
        se.show && U && Mu(ee, Ne, He) ? (ve = W.fill(n, ae) || m, H = se._paths.clip) : U = null, Yr(a, c, h, p, ve, v, y, x, P, T, H, U), D = !0;
      }
    }), D || Yr(a, c, h, p, m, v, y, x, P, T);
  }
  const fs = vn | Po;
  function Yr(o, a, c, h, p, m, v, y, x, P, T, D) {
    as(o, a, c, h, p), (x || P || D) && (g.save(), x && g.clip(x), P && g.clip(P)), D ? (y & fs) == fs ? (g.clip(D), T && g.clip(T), lr(p, v), sr(o, m, a)) : y & Po ? (lr(p, v), g.clip(D), sr(o, m, a)) : y & vn && (g.save(), g.clip(D), T && g.clip(T), lr(p, v), g.restore(), sr(o, m, a)) : (lr(p, v), sr(o, m, a)), (x || P || D) && g.restore();
  }
  function sr(o, a, c) {
    c > 0 && (a instanceof Map ? a.forEach((h, p) => {
      g.strokeStyle = or = p, g.stroke(h);
    }) : a != null && o && g.stroke(a));
  }
  function lr(o, a) {
    a instanceof Map ? a.forEach((c, h) => {
      g.fillStyle = Qi = h, g.fill(c);
    }) : a != null && o && g.fill(a);
  }
  function Wa(o, a, c, h) {
    let p = F[o], m;
    if (h <= 0)
      m = [0, 0];
    else {
      let v = p._space = p.space(n, o, a, c, h), y = p._incrs = p.incrs(n, o, a, c, h, v);
      m = Xh(a, c, y, h, v);
    }
    return p._found = m;
  }
  function Kr(o, a, c, h, p, m, v, y, x, P) {
    let T = v % 2 / 2;
    z == 1 && g.translate(T, T), as(y, v, x, P, y), g.beginPath();
    let D, W, ae, se, ee = p + (h == 0 || h == 3 ? -m : m);
    c == 0 ? (W = p, se = ee) : (D = p, ae = ee);
    for (let U = 0; U < o.length; U++)
      a[U] != null && (c == 0 ? D = ae = o[U] : W = se = o[U], g.moveTo(D, W), g.lineTo(ae, se));
    g.stroke(), z == 1 && g.translate(-T, -T);
  }
  function Ga(o) {
    let a = !0;
    return F.forEach((c, h) => {
      if (!c.show)
        return;
      let p = k[c.scale];
      if (p.min == null) {
        c._show && (a = !1, c._show = !1, Xi(!1));
        return;
      } else
        c._show || (a = !1, c._show = !0, Xi(!1));
      let m = c.side, v = m % 2, { min: y, max: x } = p, [P, T] = Wa(h, y, x, v == 0 ? q : C);
      if (T == 0)
        return;
      let D = p.distr == 2, W = c._splits = c.splits(n, h, y, x, P, T, D), ae = p.distr == 2 ? W.map((H) => St[H]) : W, se = p.distr == 2 ? St[W[1]] - St[W[0]] : P, ee = c._values = c.values(n, c.filter(n, ae, h, T, se), h, T, se);
      c._rotate = m == 2 ? c.rotate(n, ee, h, T) : 0;
      let U = c._size;
      c._size = vt(c.size(n, ee, h, o)), U != null && c._size != U && (a = !1);
    }), a;
  }
  function Ya(o) {
    let a = !0;
    return ss.forEach((c, h) => {
      let p = c(n, h, Ei, o);
      p != si[h] && (a = !1), si[h] = p;
    }), a;
  }
  function Ka() {
    for (let o = 0; o < F.length; o++) {
      let a = F[o];
      if (!a.show || !a._show)
        continue;
      let c = a.side, h = c % 2, p, m, v = a.stroke(n, o), y = c == 0 || c == 3 ? -1 : 1, [x, P] = a._found;
      if (a.label != null) {
        let qe = a.labelGap * y, lt = De((a._lpos + qe) * ce);
        cs(a.labelFont[0], v, "center", c == 2 ? Rn : Ws), g.save(), h == 1 ? (p = m = 0, g.translate(
          lt,
          De(dt + $t / 2)
        ), g.rotate((c == 3 ? -mr : mr) / 2)) : (p = De(rt + tt / 2), m = lt);
        let Ci = Jl(a.label) ? a.label(n, o, x, P) : a.label;
        g.fillText(Ci, p, m), g.restore();
      }
      if (P == 0)
        continue;
      let T = k[a.scale], D = h == 0 ? tt : $t, W = h == 0 ? rt : dt, ae = a._splits, se = T.distr == 2 ? ae.map((qe) => St[qe]) : ae, ee = T.distr == 2 ? St[ae[1]] - St[ae[0]] : x, U = a.ticks, H = a.border, ve = U.show ? U.size : 0, ke = De(ve * ce), Ie = De((a.alignTo == 2 ? a._size - ve - a.gap : a.gap) * ce), fe = a._rotate * -mr / 180, Ae = B(a._pos * ce), ot = (ke + Ie) * y, Ke = Ae + ot;
      m = h == 0 ? Ke : 0, p = h == 1 ? Ke : 0;
      let gt = a.font[0], kt = a.align == 1 ? cn : a.align == 2 ? lo : fe > 0 ? cn : fe < 0 ? lo : h == 0 ? "center" : c == 3 ? lo : cn, Ft = fe || h == 1 ? "middle" : c == 2 ? Rn : Ws;
      cs(gt, v, kt, Ft);
      let st = a.font[1] * a.lineGap, mt = ae.map((qe) => B(u(qe, T, D, W))), At = a._values;
      for (let qe = 0; qe < At.length; qe++) {
        let lt = At[qe];
        if (lt != null) {
          h == 0 ? p = mt[qe] : m = mt[qe], lt = "" + lt;
          let Ci = lt.indexOf(`
`) == -1 ? [lt] : lt.split(/\n/gm);
          for (let Ze = 0; Ze < Ci.length; Ze++) {
            let Ms = Ci[Ze];
            fe ? (g.save(), g.translate(p, m + Ze * st), g.rotate(fe), g.fillText(Ms, 0, 0), g.restore()) : g.fillText(Ms, p, m + Ze * st);
          }
        }
      }
      U.show && Kr(
        mt,
        U.filter(n, se, o, P, ee),
        h,
        c,
        Ae,
        ke,
        ge(U.width * ce, 3),
        U.stroke(n, o),
        U.dash,
        U.cap
      );
      let It = a.grid;
      It.show && Kr(
        mt,
        It.filter(n, se, o, P, ee),
        h,
        h == 0 ? 2 : 1,
        h == 0 ? dt : rt,
        h == 0 ? $t : tt,
        ge(It.width * ce, 3),
        It.stroke(n, o),
        It.dash,
        It.cap
      ), H.show && Kr(
        [Ae],
        [1],
        h == 0 ? 1 : 0,
        h == 0 ? 1 : 2,
        h == 1 ? dt : rt,
        h == 1 ? $t : tt,
        ge(H.width * ce, 3),
        H.stroke(n, o),
        H.dash,
        H.cap
      );
    }
    Fe("drawAxes");
  }
  function Xi(o) {
    w.forEach((a, c) => {
      c > 0 && (a._paths = null, o && (r == 1 ? (a.min = null, a.max = null) : a.facets.forEach((h) => {
        h.min = null, h.max = null;
      })));
    });
  }
  let ar = !1, qr = !1, Mn = [];
  function qa() {
    qr = !1;
    for (let o = 0; o < Mn.length; o++)
      Fe(...Mn[o]);
    Mn.length = 0;
  }
  function en() {
    ar || (Gu(ps), ar = !0);
  }
  function Za(o, a = !1) {
    ar = !0, qr = a, o(n), ps(), a && Mn.length > 0 && queueMicrotask(qa);
  }
  n.batch = Za;
  function ps() {
    if (Hr && (Ba(), Hr = !1), Yi && (Oa(), Yi = !1), ir) {
      if (ye(S, cn, me), ye(S, Rn, Ce), ye(S, Bn, q), ye(S, Un, C), ye(E, cn, me), ye(E, Rn, Ce), ye(E, Bn, q), ye(E, Un, C), ye(_, Bn, qt), ye(_, Un, xi), b.width = De(qt * ce), b.height = De(xi * ce), F.forEach(({ _el: o, _show: a, _size: c, _pos: h, side: p }) => {
        if (o != null)
          if (a) {
            let m = p === 3 || p === 0 ? c : 0, v = p % 2 == 1;
            ye(o, v ? "left" : "top", h - m), ye(o, v ? "width" : "height", c), ye(o, v ? "top" : "left", v ? Ce : me), ye(o, v ? "height" : "width", v ? C : q), $o(o, Ni);
          } else
            at(o, Ni);
      }), or = Qi = Fr = Br = Ur = jr = Vr = Wr = Ir = null, it = 1, Nn(!0), me != Gi || Ce != $i || q != Nt || C != Si) {
        Xi(!1);
        let o = q / Nt, a = C / Si;
        if (Ge && !ki && N.left >= 0) {
          N.left *= o, N.top *= a, tn && Bt(tn, De(N.left), 0, q, C), nn && Bt(nn, 0, De(N.top), q, C);
          for (let c = 0; c < pt.length; c++) {
            let h = pt[c];
            h != null && (Zi[c] *= o, Ji[c] *= a, Bt(h, vt(Zi[c]), vt(Ji[c]), q, C));
          }
        }
        if (_e.show && !nr && _e.left >= 0 && _e.width > 0) {
          _e.left *= o, _e.width *= o, _e.top *= a, _e.height *= a;
          for (let c in to)
            ye(sn, c, _e[c]);
        }
        Gi = me, $i = Ce, Nt = q, Si = C;
      }
      Fe("setSize"), ir = !1;
    }
    qt > 0 && xi > 0 && (g.clearRect(0, 0, b.width, b.height), Fe("drawClear"), K.forEach((o) => o()), Fe("draw")), _e.show && nr && (cr(_e), nr = !1), Ge && ki && (Ti(null, !0, !1), ki = !1), X.show && X.live && ft && (Xr(), ft = !1), d || (d = !0, n.status = 1, Fe("ready")), Dn = !1, ar = !1;
  }
  n.redraw = (o, a) => {
    Yi = a || !1, o !== !1 ? ai(M, A.min, A.max) : en();
  };
  function Zr(o, a) {
    let c = k[o];
    if (c.from == null) {
      if (Be == 0) {
        let h = c.range(n, a.min, a.max, o);
        a.min = h[0], a.max = h[1];
      }
      if (a.min > a.max) {
        let h = a.min;
        a.min = a.max, a.max = h;
      }
      if (Be > 1 && a.min != null && a.max != null && a.max - a.min < 1e-16)
        return;
      o == M && c.distr == 2 && Be > 0 && (a.min = Tt(a.min, t[0]), a.max = Tt(a.max, t[0]), a.min == a.max && a.max++), R[o] = a, Hr = !0, en();
    }
  }
  n.setScale = Zr;
  let Jr, Qr, tn, nn, gs, ms, rn, on, bs, _s, be, $e, li = !1;
  const Ue = N.drag;
  let Le = Ue.x, Re = Ue.y;
  Ge && (N.x && (Jr = _t(mu, E)), N.y && (Qr = _t(bu, E)), A.ori == 0 ? (tn = Jr, nn = Qr) : (tn = Qr, nn = Jr), be = N.left, $e = N.top);
  const _e = n.select = Pe({
    show: !0,
    over: !0,
    left: 0,
    width: 0,
    top: 0,
    height: 0
  }, e.select), sn = _e.show ? _t(gu, _e.over ? E : S) : null;
  function cr(o, a) {
    if (_e.show) {
      for (let c in o)
        _e[c] = o[c], c in to && ye(sn, c, o[c]);
      a !== !1 && Fe("setSelect");
    }
  }
  n.setSelect = cr;
  function Ja(o) {
    if (w[o].show)
      Te && $o(Se[o], Ni);
    else if (Te && at(Se[o], Ni), Ge) {
      let c = qi ? pt[0] : pt[o];
      c != null && Bt(c, -10, -10, q, C);
    }
  }
  function ai(o, a, c) {
    Zr(o, { min: a, max: c });
  }
  function Lt(o, a, c, h) {
    a.focus != null && ic(o), a.show != null && w.forEach((p, m) => {
      m > 0 && (o == m || o == null) && (p.show = a.show, Ja(m), r == 2 ? (ai(p.facets[0].scale, null, null), ai(p.facets[1].scale, null, null)) : ai(p.scale, null, null), en());
    }), c !== !1 && Fe("setSeries", o, a), h && Hn("setSeries", n, o, a);
  }
  n.setSeries = Lt;
  function Qa(o, a) {
    Pe(J[o], a);
  }
  function Xa(o, a) {
    o.fill = ie(o.fill || null), o.dir = le(o.dir, -1), a = a ?? J.length, J.splice(a, 0, o);
  }
  function ec(o) {
    o == null ? J.length = 0 : J.splice(o, 1);
  }
  n.addBand = Xa, n.setBand = Qa, n.delBand = ec;
  function tc(o, a) {
    w[o].alpha = a, Ge && pt[o] != null && (pt[o].style.opacity = a), Te && Se[o] && (Se[o].style.opacity = a);
  }
  let Zt, ci, Pi;
  const ln = { focus: !0 };
  function ic(o) {
    if (o != Pi) {
      let a = o == null, c = Ht.alpha != 1;
      w.forEach((h, p) => {
        if (r == 1 || p > 0) {
          let m = a || p == 0 || p == o;
          h._focus = a ? null : m, c && tc(p, m ? 1 : Ht.alpha);
        }
      }), Pi = o, c && en();
    }
  }
  Te && Ki && Ye(qs, ue, (o) => {
    N._lock || (Ai(o), Pi != null && Lt(null, ln, !0, Ee.setSeries));
  });
  function Rt(o, a, c) {
    let h = k[a];
    c && (o = o / ce - (h.ori == 1 ? Ce : me));
    let p = q;
    h.ori == 1 && (p = C, o = p - o), h.dir == -1 && (o = p - o);
    let m = h._min, v = h._max, y = o / p, x = m + (v - m) * y, P = h.distr;
    return P == 3 ? mn(10, x) : P == 4 ? Ou(x, h.asinh) : P == 100 ? h.bwd(x) : x;
  }
  function nc(o, a) {
    let c = Rt(o, M, a);
    return Tt(c, t[0], Ne, He);
  }
  n.valToIdx = (o) => Tt(o, t[0]), n.posToIdx = nc, n.posToVal = Rt, n.valToPos = (o, a, c) => k[a].ori == 0 ? s(
    o,
    k[a],
    c ? tt : q,
    c ? rt : 0
  ) : l(
    o,
    k[a],
    c ? $t : C,
    c ? dt : 0
  ), n.setCursor = (o, a, c) => {
    be = o.left, $e = o.top, Ti(null, a, c);
  };
  function vs(o, a) {
    ye(sn, cn, _e.left = o), ye(sn, Bn, _e.width = a);
  }
  function ys(o, a) {
    ye(sn, Rn, _e.top = o), ye(sn, Un, _e.height = a);
  }
  let zn = A.ori == 0 ? vs : ys, On = A.ori == 1 ? vs : ys;
  function rc() {
    if (Te && X.live)
      for (let o = r == 2 ? 1 : 0; o < w.length; o++) {
        if (o == 0 && ht)
          continue;
        let a = X.values[o], c = 0;
        for (let h in a)
          Ot[o][c++].firstChild.nodeValue = a[h];
      }
  }
  function Xr(o, a) {
    if (o != null && (o.idxs ? o.idxs.forEach((c, h) => {
      de[h] = c;
    }) : Ru(o.idx) || de.fill(o.idx), X.idx = de[0]), Te && X.live) {
      for (let c = 0; c < w.length; c++)
        (c > 0 || r == 1 && !ht) && oc(c, de[c]);
      rc();
    }
    ft = !1, a !== !1 && Fe("setLegend");
  }
  n.setLegend = Xr;
  function oc(o, a) {
    let c = w[o], h = o == 0 && Z == 2 ? St : t[o], p;
    ht ? p = c.values(n, o, a) ?? oi : (p = c.value(n, a == null ? null : h[a], o, a), p = p == null ? oi : { _: p }), X.values[o] = p;
  }
  function Ti(o, a, c) {
    bs = be, _s = $e, [be, $e] = N.move(n, be, $e), N.left = be, N.top = $e, Ge && (tn && Bt(tn, De(be), 0, q, C), nn && Bt(nn, 0, De($e), q, C));
    let h, p = Ne > He;
    Zt = pe, ci = null;
    let m = A.ori == 0 ? q : C, v = A.ori == 1 ? q : C;
    if (be < 0 || Be == 0 || p) {
      h = N.idx = null;
      for (let y = 0; y < w.length; y++) {
        let x = pt[y];
        x != null && Bt(x, -10, -10, q, C);
      }
      Ki && Lt(null, ln, !0, o == null && Ee.setSeries), X.live && (de.fill(h), ft = !0);
    } else {
      let y, x, P;
      r == 1 && (y = A.ori == 0 ? be : $e, x = Rt(y, M), h = N.idx = Tt(x, t[0], Ne, He), P = O(t[0][h], A, m, 0));
      let T = -10, D = -10, W = 0, ae = 0, se = !0, ee = "", U = "";
      for (let H = r == 2 ? 1 : 0; H < w.length; H++) {
        let ve = w[H], ke = de[H], Ie = ke == null ? null : r == 1 ? t[H][ke] : t[H][1][ke], fe = N.dataIdx(n, H, h, x), Ae = fe == null ? null : r == 1 ? t[H][fe] : t[H][1][fe];
        if (ft = ft || Ae != Ie || fe != ke, de[H] = fe, H > 0 && ve.show) {
          let ot = fe == null ? -10 : fe == h ? P : O(r == 1 ? t[0][fe] : t[H][0][fe], A, m, 0), Ke = Ae == null ? -10 : V(Ae, r == 1 ? k[ve.scale] : k[ve.facets[1].scale], v, 0);
          if (Ki && Ae != null) {
            let gt = A.ori == 1 ? be : $e, kt = Me(Ht.dist(n, H, fe, Ke, gt));
            if (kt < Zt) {
              let Ft = Ht.bias;
              if (Ft != 0) {
                let st = Rt(gt, ve.scale), mt = Ae >= 0 ? 1 : -1, At = st >= 0 ? 1 : -1;
                At == mt && (At == 1 ? Ft == 1 ? Ae >= st : Ae <= st : (
                  // >= 0
                  Ft == 1 ? Ae <= st : Ae >= st
                )) && (Zt = kt, ci = H);
              } else
                Zt = kt, ci = H;
            }
          }
          if (ft || qi) {
            let gt, kt;
            A.ori == 0 ? (gt = ot, kt = Ke) : (gt = Ke, kt = ot);
            let Ft, st, mt, At, It, qe, lt = !0, Ci = Ve.bbox;
            if (Ci != null) {
              lt = !1;
              let Ze = Ci(n, H);
              mt = Ze.left, At = Ze.top, Ft = Ze.width, st = Ze.height;
            } else
              mt = gt, At = kt, Ft = st = Ve.size(n, H);
            if (qe = Ve.fill(n, H), It = Ve.stroke(n, H), qi)
              H == ci && Zt <= Ht.prox && (T = mt, D = At, W = Ft, ae = st, se = lt, ee = qe, U = It);
            else {
              let Ze = pt[H];
              Ze != null && (Zi[H] = mt, Ji[H] = At, il(Ze, Ft, st, lt), el(Ze, qe, It), Bt(Ze, vt(mt), vt(At), q, C));
            }
          }
        }
      }
      if (qi) {
        let H = Ht.prox, ve = Pi == null ? Zt <= H : Zt > H || ci != Pi;
        if (ft || ve) {
          let ke = pt[0];
          ke != null && (Zi[0] = T, Ji[0] = D, il(ke, W, ae, se), el(ke, ee, U), Bt(ke, vt(T), vt(D), q, C));
        }
      }
    }
    if (_e.show && li)
      if (o != null) {
        let [y, x] = Ee.scales, [P, T] = Ee.match, [D, W] = o.cursor.sync.scales, ae = o.cursor.drag;
        if (Le = ae._x, Re = ae._y, Le || Re) {
          let { left: se, top: ee, width: U, height: H } = o.select, ve = o.scales[D].ori, ke = o.posToVal, Ie, fe, Ae, ot, Ke, gt = y != null && P(y, D), kt = x != null && T(x, W);
          gt && Le ? (ve == 0 ? (Ie = se, fe = U) : (Ie = ee, fe = H), Ae = k[y], ot = O(ke(Ie, D), Ae, m, 0), Ke = O(ke(Ie + fe, D), Ae, m, 0), zn(Ct(ot, Ke), Me(Ke - ot))) : zn(0, m), kt && Re ? (ve == 1 ? (Ie = se, fe = U) : (Ie = ee, fe = H), Ae = k[x], ot = V(ke(Ie, W), Ae, v, 0), Ke = V(ke(Ie + fe, W), Ae, v, 0), On(Ct(ot, Ke), Me(Ke - ot))) : On(0, v);
        } else
          io();
      } else {
        let y = Me(bs - gs), x = Me(_s - ms);
        if (A.ori == 1) {
          let W = y;
          y = x, x = W;
        }
        Le = Ue.x && y >= Ue.dist, Re = Ue.y && x >= Ue.dist;
        let P = Ue.uni;
        P != null ? Le && Re && (Le = y >= P, Re = x >= P, !Le && !Re && (x > y ? Re = !0 : Le = !0)) : Ue.x && Ue.y && (Le || Re) && (Le = Re = !0);
        let T, D;
        Le && (A.ori == 0 ? (T = rn, D = be) : (T = on, D = $e), zn(Ct(T, D), Me(D - T)), Re || On(0, v)), Re && (A.ori == 1 ? (T = rn, D = be) : (T = on, D = $e), On(Ct(T, D), Me(D - T)), Le || zn(0, m)), !Le && !Re && (zn(0, 0), On(0, 0));
      }
    if (Ue._x = Le, Ue._y = Re, o == null) {
      if (c) {
        if (Ds != null) {
          let [y, x] = Ee.scales;
          Ee.values[0] = y != null ? Rt(A.ori == 0 ? be : $e, y) : null, Ee.values[1] = x != null ? Rt(A.ori == 1 ? be : $e, x) : null;
        }
        Hn(ao, n, be, $e, q, C, h);
      }
      if (Ki) {
        let y = c && Ee.setSeries, x = Ht.prox;
        Pi == null ? Zt <= x && Lt(ci, ln, !0, y) : Zt > x ? Lt(null, ln, !0, y) : ci != Pi && Lt(ci, ln, !0, y);
      }
    }
    ft && (X.idx = h, Xr()), a !== !1 && Fe("setCursor");
  }
  let ui = null;
  Object.defineProperty(n, "rect", {
    get() {
      return ui == null && Nn(!1), ui;
    }
  });
  function Nn(o = !1) {
    o ? ui = null : (ui = E.getBoundingClientRect(), Fe("syncRect", ui));
  }
  function ws(o, a, c, h, p, m, v) {
    N._lock || li && o != null && o.movementX == 0 && o.movementY == 0 || (eo(o, a, c, h, p, m, v, !1, o != null), o != null ? Ti(null, !0, !0) : Ti(a, !0, !1));
  }
  function eo(o, a, c, h, p, m, v, y, x) {
    if (ui == null && Nn(!1), Ai(o), o != null)
      c = o.clientX - ui.left, h = o.clientY - ui.top;
    else {
      if (c < 0 || h < 0) {
        be = -10, $e = -10;
        return;
      }
      let [P, T] = Ee.scales, D = a.cursor.sync, [W, ae] = D.values, [se, ee] = D.scales, [U, H] = Ee.match, ve = a.axes[0].side % 2 == 1, ke = A.ori == 0 ? q : C, Ie = A.ori == 1 ? q : C, fe = ve ? m : p, Ae = ve ? p : m, ot = ve ? h : c, Ke = ve ? c : h;
      if (se != null ? c = U(P, se) ? u(W, k[P], ke, 0) : -10 : c = ke * (ot / fe), ee != null ? h = H(T, ee) ? u(ae, k[T], Ie, 0) : -10 : h = Ie * (Ke / Ae), A.ori == 1) {
        let gt = c;
        c = h, h = gt;
      }
    }
    x && (a == null || a.cursor.event.type == ao) && ((c <= 1 || c >= q - 1) && (c = zi(c, q)), (h <= 1 || h >= C - 1) && (h = zi(h, C))), y ? (gs = c, ms = h, [rn, on] = N.move(n, c, h)) : (be = c, $e = h);
  }
  const to = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  function io() {
    cr(to, !1);
  }
  let xs, $s, Ss, ks;
  function As(o, a, c, h, p, m, v) {
    li = !0, Le = Re = Ue._x = Ue._y = !1, eo(o, a, c, h, p, m, v, !0, !1), o != null && (Ye(co, wo, Es, !1), Hn(Ys, n, rn, on, q, C, null));
    let { left: y, top: x, width: P, height: T } = _e;
    xs = y, $s = x, Ss = P, ks = T;
  }
  function Es(o, a, c, h, p, m, v) {
    li = Ue._x = Ue._y = !1, eo(o, a, c, h, p, m, v, !1, !0);
    let { left: y, top: x, width: P, height: T } = _e, D = P > 0 || T > 0, W = xs != y || $s != x || Ss != P || ks != T;
    if (D && W && cr(_e), Ue.setScale && D && W) {
      let ae = y, se = P, ee = x, U = T;
      if (A.ori == 1 && (ae = x, se = T, ee = y, U = P), Le && ai(
        M,
        Rt(ae, M),
        Rt(ae + se, M)
      ), Re)
        for (let H in k) {
          let ve = k[H];
          H != M && ve.from == null && ve.min != pe && ai(
            H,
            Rt(ee + U, H),
            Rt(ee, H)
          );
        }
      io();
    } else N.lock && (N._lock = !N._lock, Ti(a, !0, o != null));
    o != null && (Wi(co, wo), Hn(co, n, be, $e, q, C, null));
  }
  function sc(o, a, c, h, p, m, v) {
    if (N._lock)
      return;
    Ai(o);
    let y = li;
    if (li) {
      let x = !0, P = !0, T = 10, D, W;
      A.ori == 0 ? (D = Le, W = Re) : (D = Re, W = Le), D && W && (x = be <= T || be >= q - T, P = $e <= T || $e >= C - T), D && x && (be = be < rn ? 0 : q), W && P && ($e = $e < on ? 0 : C), Ti(null, !0, !0), li = !1;
    }
    be = -10, $e = -10, de.fill(null), Ti(null, !0, !0), y && (li = y);
  }
  function Ps(o, a, c, h, p, m, v) {
    N._lock || (Ai(o), Rr(), io(), o != null && Hn(Zs, n, be, $e, q, C, null));
  }
  function Ts() {
    F.forEach(ed), Lr(n.width, n.height, !0);
  }
  Li(wr, fn, Ts);
  const an = {};
  an.mousedown = As, an.mousemove = ws, an.mouseup = Es, an.dblclick = Ps, an.setSeries = (o, a, c, h) => {
    let p = Ee.match[2];
    c = p(n, a, c), c != -1 && Lt(c, h, !0, !1);
  }, Ge && (Ye(Ys, E, As), Ye(ao, E, ws), Ye(Ks, E, (o) => {
    Ai(o), Nn(!1);
  }), Ye(qs, E, sc), Ye(Zs, E, Ps), To.add(n), n.syncRect = Nn);
  const ur = n.hooks = e.hooks || {};
  function Fe(o, a, c) {
    qr ? Mn.push([o, a, c]) : o in ur && ur[o].forEach((h) => {
      h.call(null, n, a, c);
    });
  }
  (e.plugins || []).forEach((o) => {
    for (let a in o.hooks)
      ur[a] = (ur[a] || []).concat(o.hooks[a]);
  });
  const Cs = (o, a, c) => c, Ee = Pe({
    key: null,
    setSeries: !1,
    filters: {
      pub: ll,
      sub: ll
    },
    scales: [M, w[1] ? w[1].scale : null],
    match: [al, al, Cs],
    values: [null, null]
  }, N.sync);
  Ee.match.length == 2 && Ee.match.push(Cs), N.sync = Ee;
  const Ds = Ee.key, no = wa(Ds);
  function Hn(o, a, c, h, p, m, v) {
    Ee.filters.pub(o, a, c, h, p, m, v) && no.pub(o, a, c, h, p, m, v);
  }
  no.sub(n);
  function lc(o, a, c, h, p, m, v) {
    Ee.filters.sub(o, a, c, h, p, m, v) && an[o](null, a, c, h, p, m, v);
  }
  n.pub = lc;
  function ac() {
    no.unsub(n), To.delete(n), wi.clear(), So(wr, fn, Ts), f.remove(), ue?.remove(), Fe("destroy");
  }
  n.destroy = ac;
  function ro() {
    Fe("init", e, t), ls(t || e.data, !1), R[M] ? Zr(M, R[M]) : Rr(), nr = _e.show && (_e.width > 0 || _e.height > 0), ki = ft = !0, Lr(e.width, e.height);
  }
  return w.forEach(os), F.forEach(Ia), i ? i instanceof HTMLElement ? (i.appendChild(f), ro()) : i(n, ro) : ro(), n;
}
We.assign = Pe;
We.fmtNum = Go;
We.rangeNum = xr;
We.rangeLog = Er;
We.rangeAsinh = Vo;
We.orient = Ui;
We.pxRatio = ce;
We.join = Wu;
We.fmtDate = Ko, We.tzDate = ih;
We.sync = wa;
{
  We.addGap = Rh, We.clipGaps = Cr;
  let e = We.paths = {
    points: Ea
  };
  e.linear = Ta, e.stepped = Bh, e.bars = Uh, e.spline = Vh;
}
const td = 24;
async function id(e, t, i, n) {
  const r = new Date(Date.now() - i * 60 * 60 * 1e3), s = {};
  return e.connection.subscribeMessage(
    (l) => {
      const u = l.states ?? {};
      if (Object.keys(u).length === 0) {
        Object.keys(s).length > 0 && n(s);
        return;
      }
      const d = (Date.now() - i * 60 * 60 * 1e3) / 1e3;
      for (const [f, b] of Object.entries(u)) {
        const g = s[f] ?? [];
        s[f] = [...g, ...b].filter((_) => _.lu >= d);
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
function In(e) {
  if (!e) return [];
  const t = [];
  for (const i of e) {
    const n = parseFloat(i.s);
    Number.isFinite(n) && t.push([i.lu, n]);
  }
  return t.sort((i, n) => i[0] - n[0]), t;
}
function nd(e, t) {
  const i = /* @__PURE__ */ new Set();
  for (const s of e) for (const [l] of s) i.add(l);
  if (i.size === 0)
    return [[t], ...e.map(() => [null])];
  const n = [...i].sort((s, l) => s - l), r = e.map((s) => {
    let l = -1, u = null;
    return n.map((d) => {
      for (; l + 1 < s.length && s[l + 1][0] <= d; )
        l++, u = s[l][1];
      return u;
    });
  });
  return [n, ...r];
}
const rd = '.uplot,.uplot *,.uplot *:before,.uplot *:after{box-sizing:border-box}.uplot{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5;width:min-content}.u-title{text-align:center;font-size:18px;font-weight:700}.u-wrap{position:relative;user-select:none}.u-over,.u-under{position:absolute}.u-under{overflow:hidden}.uplot canvas{display:block;position:relative;width:100%;height:100%}.u-axis{position:absolute}.u-legend{font-size:14px;margin:auto;text-align:center}.u-inline{display:block}.u-inline *{display:inline-block}.u-inline tr{margin-right:16px}.u-legend th{font-weight:600}.u-legend th>*{vertical-align:middle;display:inline-block}.u-legend .u-marker{width:1em;height:1em;margin-right:4px;background-clip:padding-box!important}.u-inline.u-live th:after{content:":";vertical-align:middle}.u-inline:not(.u-live) .u-value{display:none}.u-series>*{padding:4px}.u-series th{cursor:pointer}.u-legend .u-off>*{opacity:.3}.u-select{background:#00000012;position:absolute;pointer-events:none}.u-cursor-x,.u-cursor-y{position:absolute;left:0;top:0;pointer-events:none;will-change:transform}.u-hz .u-cursor-x,.u-vt .u-cursor-y{height:100%;border-right:1px dashed #607D8B}.u-hz .u-cursor-y,.u-vt .u-cursor-x{width:100%;border-bottom:1px dashed #607D8B}.u-cursor-pt{position:absolute;top:0;left:0;border-radius:50%;border:0 solid;pointer-events:none;will-change:transform;background-clip:padding-box!important}.u-axis.u-off,.u-select.u-off,.u-cursor-x.u-off,.u-cursor-y.u-off,.u-cursor-pt.u-off{display:none}';
var od = Object.defineProperty, Or = (e, t, i, n) => {
  for (var r = void 0, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = l(t, i, r) || r);
  return r && od(t, i, r), r;
};
const sd = [
  Xe,
  No(rd),
  je`
    :host {
      display: block;
      width: 100%;
      color-scheme: light dark;
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
], Cl = () => {
};
class An extends ze {
  constructor() {
    super(...arguments), this._loading = !0, this._error = null, this._empty = !1, this._plot = null, this._resizeObserver = null, this._unsubscribe = null, this._fetchGen = 0;
  }
  static {
    this.styles = sd;
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
Or([
  re()
], An.prototype, "_loading");
Or([
  re()
], An.prototype, "_error");
Or([
  re()
], An.prototype, "_empty");
Or([
  wn(".chart-host")
], An.prototype, "_host");
var ld = Object.defineProperty, ad = Object.getOwnPropertyDescriptor, ri = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? ad(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ld(t, i, r), r;
};
const Do = 260, cd = 3;
let zt = class extends An {
  constructor() {
    super(...arguments), this.roomEntity = "", this.lowEntity = "", this.highEntity = "", this.actionEntity = "", this.apparentEntity = "", this.humidityEntity = "", this._intervals = [], this._hiddenLabels = /* @__PURE__ */ new Set();
  }
  get chartHeight() {
    return Do;
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
    this._unsubscribe && this._unsubscribe !== Cl && this._unsubscribe(), this._unsubscribe = Cl;
    const e = cd + (this._hasApparent ? 1 : 0) + (this._hasHumidity ? 1 : 0);
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
      const n = await id(this.hass, i, td, (r) => {
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
      const s = i[r].lu, l = i[r + 1]?.lu ?? t, u = i[r].s;
      (u === "heating" || u === "cooling") && n.push({ start: s, end: l, action: u });
    }
    return n;
  }
  _renderPlot(e) {
    if (!this._host) return;
    const t = Math.floor(Date.now() / 1e3), i = In(e[this.roomEntity]), n = In(e[this.lowEntity]), r = In(e[this.highEntity]), s = this._hasApparent ? In(e[this.apparentEntity]) : [], l = this._hasHumidity ? In(e[this.humidityEntity]) : [];
    if (this._intervals = this._actionIntervals(e[this.actionEntity], t), i.length === 0 && n.length === 0 && r.length === 0 && s.length === 0 && l.length === 0 && this._intervals.length === 0) {
      this._destroyPlot(), this._empty = !0;
      return;
    }
    this._empty = !1;
    const u = [i, n, r];
    this._hasApparent && u.push(s), this._hasHumidity && u.push(l);
    const d = nd(u, t), f = this._buildOpts(this._host.clientWidth || 400);
    this._plot ? (this._plot.setSize({ width: f.width, height: f.height }), this._plot.setData(d), this._plot.redraw(!1, !0)) : (this._host.innerHTML = "", this._plot = new We(f, d, this._host), this._observeResize());
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
    const u = [
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
    this._hasHumidity && u.push({
      scale: "y2",
      side: 1,
      size: 38,
      stroke: r,
      grid: { show: !1 },
      values: (f, b) => b.map((g) => `${g.toFixed(0)}%`)
    });
    const d = {
      x: { time: !0 }
    };
    return this._hasHumidity && (d.y2 = { auto: !1, range: [0, 100] }), {
      width: e,
      height: Do,
      pxAlign: 1,
      cursor: { drag: { x: !1, y: !1 }, points: { size: 6 } },
      legend: { show: !1 },
      scales: d,
      axes: u,
      series: l,
      hooks: {
        draw: [
          (f) => {
            const b = f.ctx;
            if (!b) return;
            const g = f.bbox.top, _ = f.bbox.height;
            b.save();
            for (const S of this._intervals) {
              const E = f.valToPos(S.start, "x", !0), z = f.valToPos(S.end, "x", !0);
              z <= E || (b.fillStyle = S.action === "heating" ? Dl(t, 0.18) : Dl(i, 0.18), b.fillRect(E, g, z - E, _));
            }
            b.restore();
          }
        ]
      }
    };
  }
  render() {
    if (!this.hass || !this.roomEntity)
      return $`<div class="status">No room temperature sensor for this zone.</div>`;
    const e = this._loading || this._error !== null || this._empty, t = [
      "Room temperature",
      this._hasApparent ? ", apparent temperature" : "",
      ", effective band edges",
      this._hasHumidity ? ", humidity" : "",
      " and heating/cooling shading — last 24 hours"
    ].join("");
    return $`
      ${this._loading ? $`<div class="status">Loading 24 h history…</div>` : G}
      ${this._error ? $`<div class="status">${this._error}</div>` : G}
      ${this._empty ? $`<div class="status">
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
    return $`<div class="legend">
      ${this._toggleItem(
      "Room",
      $`<span class="swatch" style="background:var(--primary-color)"></span>`
    )}
      ${this._hasApparent ? this._toggleItem(
      "Apparent",
      $`<span class="swatch dashed" style="color:var(--primary-color)"></span>`
    ) : G}
      ${this._toggleItem(
      "Low band",
      $`<span class="swatch" style="background:var(--cb-action-heating)"></span>`
    )}
      ${this._toggleItem(
      "High band",
      $`<span class="swatch" style="background:var(--cb-action-cooling)"></span>`
    )}
      ${this._hasHumidity ? this._toggleItem(
      "Humidity",
      $`<span class="swatch" style="background:var(--secondary-text-color)"></span>`,
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
    return $`<span
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
zt.styles = [
  ...An.styles,
  je`
      .chart-host {
        height: ${No(Do)}px;
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
ri([
  I({ attribute: !1 })
], zt.prototype, "hass", 2);
ri([
  I({ type: String })
], zt.prototype, "roomEntity", 2);
ri([
  I({ type: String })
], zt.prototype, "lowEntity", 2);
ri([
  I({ type: String })
], zt.prototype, "highEntity", 2);
ri([
  I({ type: String })
], zt.prototype, "actionEntity", 2);
ri([
  I({ type: String })
], zt.prototype, "apparentEntity", 2);
ri([
  I({ type: String })
], zt.prototype, "humidityEntity", 2);
ri([
  re()
], zt.prototype, "_hiddenLabels", 2);
zt = ri([
  Qe("comfort-band-history-chart")
], zt);
function Dl(e, t) {
  const i = e.trim(), n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(i);
  if (n) {
    let s = n[1];
    s.length === 3 && (s = s.replace(/(.)/g, "$1$1"));
    const l = parseInt(s.slice(0, 2), 16), u = parseInt(s.slice(2, 4), 16), d = parseInt(s.slice(4, 6), 16);
    return `rgba(${l}, ${u}, ${d}, ${t})`;
  }
  const r = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(i);
  return r ? `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${t})` : i;
}
var ud = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, ts = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? hd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && ud(t, i, r), r;
};
let Jn = class extends ze {
  render() {
    const e = this.entities?.roomTemperature;
    if (!e)
      return $`<div class="empty">No room temperature sensor for this zone.</div>`;
    const t = this.entities?.apparentTemperature, i = Gl(this.hass, e), n = t ?? "", r = t && i ? i : "";
    return $`
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
    return e ? t ? G : $`<div class="hint">
        Configure a humidity sensor in the Settings tab to also add humidity to the chart.
      </div>` : $`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
  }
};
Jn.styles = [
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
ts([
  I({ attribute: !1 })
], Jn.prototype, "hass", 2);
ts([
  I({ attribute: !1 })
], Jn.prototype, "entities", 2);
Jn = ts([
  Qe("comfort-band-insights-tab")
], Jn);
var dd = Object.defineProperty, fd = Object.getOwnPropertyDescriptor, En = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? fd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && dd(t, i, r), r;
};
const Qt = 15, jt = 0.5, Jt = 14, Ut = 28, Ml = 4, pd = 500, un = 600, pr = 200, zl = 0, Mo = 24 * 60 - Qt, go = [0, 6, 12, 18, 24], Ol = [14, 18, 22, 26];
function Pt(e) {
  const t = /^(\d{1,2}):(\d{2})$/.exec(e);
  return t ? parseInt(t[1], 10) * 60 + parseInt(t[2], 10) : 0;
}
function mo(e) {
  const t = Math.max(0, Math.min(Mo, e)), i = Math.floor(t / 60), n = t % 60;
  return `${i.toString().padStart(2, "0")}:${n.toString().padStart(2, "0")}`;
}
function gd(e) {
  return Math.round(e / Qt) * Qt;
}
function bo(e) {
  return Math.round(e / jt) * jt;
}
function bt(e, t, i) {
  return Math.min(i, Math.max(t, e));
}
let mi = class extends ze {
  constructor() {
    super(...arguments), this.transitions = [], this._drag = null, this._preview = null, this._focusedAt = null, this._focusedHandle = null, this._onHandlePointerDown = (e, t, i) => {
      e.stopPropagation(), e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
      const r = {
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
      r.longPressTimer = window.setTimeout(() => {
        r.longPressTimer = null, this._drag === r && !r.moved && (r.longPressed = !0, this._fire("transition-delete", { at: r.origin.at }));
      }, pd), this._drag = r;
    }, this._onHandlePointerMove = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "handle" || t.longPressed) return;
      const i = e.clientX - t.startX, n = e.clientY - t.startY;
      if (!t.moved && Math.hypot(i, n) < Ml) return;
      t.moved || (t.moved = !0, t.longPressTimer !== null && (window.clearTimeout(t.longPressTimer), t.longPressTimer = null));
      const r = this._svg();
      if (!r) {
        this._preview = { at: t.origin.at, low: t.origin.low, high: t.origin.high };
        return;
      }
      const s = r.getBoundingClientRect(), l = bt(
        this._clientToMinutes(e.clientX, s),
        t.range.min,
        t.range.max
      ), u = this._clientToTemp(e.clientY, s);
      let d = t.origin.low, f = t.origin.high;
      t.handle === "low" ? d = bt(u, Jt, f - jt) : f = bt(u, d + jt, Ut), this._preview = { at: mo(l), low: d, high: f };
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
      Math.hypot(i, n) >= Ml && (t.moved = !0);
    }, this._onBackgroundPointerUp = (e) => {
      const t = this._drag;
      if (!t || t.kind !== "empty")
        return;
      const i = this._svg();
      try {
        i?.releasePointerCapture(e.pointerId);
      } catch {
      }
      const n = t.moved, r = e.type === "pointercancel";
      if (this._drag = null, r || n || !i) return;
      const s = i.getBoundingClientRect(), l = bt(this._clientToMinutes(e.clientX, s), zl, Mo);
      for (const b of this.transitions) if (Pt(b.at) === l) return;
      const u = this._clientToTemp(e.clientY, s), d = bt(bo(u - 1.5), Jt, Ut - jt), f = bt(bo(u + 1.5), d + jt, Ut);
      this._fire("transition-add", { at: mo(l), low: d, high: f });
    }, this._onHandleKeyDown = (e, t, i) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(), this._fire("transition-edit", { transition: t });
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault(), this._fire("transition-delete", { at: t.at });
        return;
      }
      let n = 0, r = 0;
      switch (e.key) {
        case "ArrowLeft":
          n = -Qt;
          break;
        case "ArrowRight":
          n = Qt;
          break;
        case "ArrowUp":
          r = jt;
          break;
        case "ArrowDown":
          r = -jt;
          break;
        default:
          return;
      }
      e.preventDefault();
      const s = this._timeRangeFor(t.at), l = bt(Pt(t.at) + n, s.min, s.max);
      let u = t.low, d = t.high;
      if (i === "low" ? u = bt(t.low + r, Jt, d - jt) : d = bt(t.high + r, u + jt, Ut), l === Pt(t.at) && u === t.low && d === t.high)
        return;
      const f = mo(l);
      this._focusedAt === t.at && (this._focusedAt = f), this._fire("transition-update", {
        oldAt: t.at,
        transition: { at: f, low: u, high: d }
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
    return e / (24 * 60) * un;
  }
  _tempToY(e) {
    const t = bt(e, Jt, Ut);
    return pr - (t - Jt) / (Ut - Jt) * pr;
  }
  _clientToMinutes(e, t) {
    if (t.width === 0) return 0;
    const i = bt((e - t.left) / t.width, 0, 1);
    return gd(i * 24 * 60);
  }
  _clientToTemp(e, t) {
    if (t.height === 0) return Jt;
    const i = bt((e - t.top) / t.height, 0, 1), n = Ut - i * (Ut - Jt);
    return bo(n);
  }
  _svg() {
    return this.shadowRoot?.querySelector("svg") ?? null;
  }
  _sortedAts() {
    return this.transitions.map((e) => Pt(e.at)).sort((e, t) => e - t);
  }
  /** Allowed time range for a dragging transition: open interval between its neighbours. */
  _timeRangeFor(e) {
    const t = Pt(e), i = this._sortedAts().filter((s) => s !== t);
    let n = zl, r = Mo;
    for (const s of i)
      s < t && s + Qt > n && (n = s + Qt), s > t && s - Qt < r && (r = s - Qt);
    return { min: n, max: r };
  }
  _fire(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ----- render -----
  _renderedTransitions() {
    const e = [...this.transitions].sort((i, n) => Pt(i.at) - Pt(n.at));
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
    let r = i;
    for (const s of e) {
      const l = this._timeToX(Pt(s.at));
      n.push([l, this._tempToY(r)]), n.push([l, this._tempToY(s[t])]), r = s[t];
    }
    return n.push([un, this._tempToY(r)]), n;
  }
  _pointsToPath(e) {
    return e.map(([t, i], n) => `${n === 0 ? "M" : "L"} ${t} ${i}`).join(" ");
  }
  _fillFromPoints(e, t) {
    const i = this._pointsToPath(e), n = t.slice().reverse().map(([r, s]) => `L ${r} ${s}`).join(" ");
    return `${i} ${n} Z`;
  }
  render() {
    const e = this._renderedTransitions(), t = e.length > 0, i = t ? this._stepPoints(e, "low") : [], n = t ? this._stepPoints(e, "high") : [], r = t ? this._pointsToPath(i) : "", s = t ? this._pointsToPath(n) : "", l = t ? this._fillFromPoints(n, i) : "";
    return $`
      <div class="chart">
        <svg
          viewBox="0 0 ${un} ${pr}"
          preserveAspectRatio="none"
          role="group"
          aria-label="Schedule chart: drag the circular handles to adjust each transition's time and band."
          @pointerdown=${this._onBackgroundPointerDown}
          @pointermove=${this._onBackgroundPointerMove}
          @pointerup=${this._onBackgroundPointerUp}
          @pointercancel=${this._onBackgroundPointerUp}
        >
          <title>Schedule chart for the active profile</title>
          ${Ol.map(
      (u) => fi`<line class="grid" x1="0" x2=${un} y1=${this._tempToY(u)} y2=${this._tempToY(u)}></line>`
    )}
          ${go.map(
      (u) => fi`<line class="grid" y1="0" y2=${pr} x1=${u / 24 * un} x2=${u / 24 * un}></line>`
    )}
          ${e.length > 0 ? fi`
                <path class="fill" d=${l}></path>
                <path class="line low" d=${r}></path>
                <path class="line high" d=${s}></path>
              ` : null}
          ${e.map((u) => {
      const d = this._timeToX(Pt(u.at)), f = this._tempToY(u.low), b = this._tempToY(u.high), g = this._focusedAt === u.at && this._focusedHandle === "low", _ = this._focusedAt === u.at && this._focusedHandle === "high", S = this._drag?.kind === "handle" && this._drag.origin.at === u.at ? this._drag.handle : null, E = `Low handle at ${u.at}, ${u.low.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, z = `High handle at ${u.at}, ${u.high.toFixed(1)} °C. Arrow keys to nudge, Enter to edit, Delete to remove.`, B = `handle low${g ? " focused" : ""}${S === "low" ? " dragging" : ""}`, j = `handle high${_ ? " focused" : ""}${S === "high" ? " dragging" : ""}`;
      return fi`
              <circle
                class=${B}
                cx=${d}
                cy=${f}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${E}
                data-at=${u.at}
                data-handle="low"
                @pointerdown=${(w) => this._onHandlePointerDown(w, u, "low")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(w) => this._onHandleKeyDown(w, u, "low")}
                @focus=${() => this._onHandleFocus(u, "low")}
                @blur=${this._onHandleBlur}
              ></circle>
              <circle
                class=${j}
                cx=${d}
                cy=${b}
                r="8"
                tabindex="0"
                role="button"
                aria-label=${z}
                data-at=${u.at}
                data-handle="high"
                @pointerdown=${(w) => this._onHandlePointerDown(w, u, "high")}
                @pointermove=${this._onHandlePointerMove}
                @pointerup=${this._onHandlePointerUp}
                @pointercancel=${this._onHandlePointerCancel}
                @keydown=${(w) => this._onHandleKeyDown(w, u, "high")}
                @focus=${() => this._onHandleFocus(u, "high")}
                @blur=${this._onHandleBlur}
              ></circle>
            `;
    })}
        </svg>
        ${Ol.map(
      (u) => $`<div
              class="axis-label y"
              style="top: ${(Ut - u) / (Ut - Jt) * 100}%"
            >
              ${u}°
            </div>`
    )}
        ${go.map((u, d) => {
      const f = d === 0 ? "axis-label x start" : d === go.length - 1 ? "axis-label x end" : "axis-label x";
      return $`<div class=${f} style="left: ${u / 24 * 100}%">${u}h</div>`;
    })}
        ${this.transitions.length === 0 ? $`<div class="empty-hint">Tap the chart to add a transition.</div>` : null}
      </div>
    `;
  }
};
mi.styles = [
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
        user-select: none;
        touch-action: none;
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
        left: 4px;
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
En([
  I({ type: Array })
], mi.prototype, "transitions", 2);
En([
  re()
], mi.prototype, "_drag", 2);
En([
  re()
], mi.prototype, "_preview", 2);
En([
  re()
], mi.prototype, "_focusedAt", 2);
En([
  re()
], mi.prototype, "_focusedHandle", 2);
mi = En([
  Qe("comfort-band-schedule-chart")
], mi);
var md = Object.defineProperty, bd = Object.getOwnPropertyDescriptor, vi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? bd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && md(t, i, r), r;
};
let Vt = class extends ze {
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
    return $`
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
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : null}
      <div class="actions">
        ${this.isNew ? null : $`<button class="button danger" @click=${this._onDelete}>Delete</button>`}
        <div class="spacer"></div>
        <button class="button secondary" @click=${this._onCancel}>Cancel</button>
        <button class="button primary" @click=${this._onSave}>Save</button>
      </div>
    `;
  }
};
Vt.styles = [
  Xe,
  je`
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
        color: var(--primary-text-color, #212121);
      }
      .button.danger {
        background: transparent;
        color: var(--error-color, #b71c1c);
        border-color: var(--divider-color, #cccccc);
      }
    `
];
vi([
  I({ type: Object })
], Vt.prototype, "transition", 2);
vi([
  I({ type: Boolean })
], Vt.prototype, "isNew", 2);
vi([
  re()
], Vt.prototype, "_at", 2);
vi([
  re()
], Vt.prototype, "_low", 2);
vi([
  re()
], Vt.prototype, "_high", 2);
vi([
  re()
], Vt.prototype, "_error", 2);
vi([
  wn('input[name="at"]')
], Vt.prototype, "_atInput", 2);
Vt = vi([
  Qe("transition-edit-dialog")
], Vt);
var _d = Object.defineProperty, vd = Object.getOwnPropertyDescriptor, Yt = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? vd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && _d(t, i, r), r;
};
function _o(e, t) {
  return Pt(e.at) - Pt(t.at);
}
let wt = class extends ze {
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
      const { oldAt: t, transition: i } = e.detail, n = this._transitions.filter((r) => r.at !== t && r.at !== i.at).concat(i).sort(_o);
      await this._writeSchedule(n);
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
      i.sort(_o), await this._writeSchedule(i), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogDelete = async (e) => {
      const t = this._transitions.filter((i) => i.at !== e.detail.at);
      await this._writeSchedule(t), this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    }, this._onDialogCancel = () => {
      this._mode = "list", this._editing = null, this._newLow = void 0, this._newHigh = void 0;
    };
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._profile === "" && (this._profile = Nl(this.hass) ?? "home", this._subscribe());
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      const t = Nl(this.hass);
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
      const t = await Ic(
        this.hass,
        { zone: this.zone, profile: this._profile },
        (i) => {
          e === this._subscribeGen && (this._transitions = i?.baseline ? [...i.baseline].sort(_o) : [], this._loading = !1);
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
        low: this._newLow ?? yd(this._transitions),
        high: this._newHigh ?? wd(this._transitions)
      };
      return $`
        <transition-edit-dialog
          .transition=${e}
          .isNew=${this._mode === "add"}
          @dialog-save=${this._onDialogSave}
          @dialog-cancel=${this._onDialogCancel}
          @dialog-delete=${this._onDialogDelete}
        ></transition-edit-dialog>
      `;
    }
    return $`
      <div class="header">
        <span class="profile-label">Active profile</span>
        <span class="profile-value">${this._profile || "—"}</span>
      </div>
      ${this._loading ? $`<div class="loading">Loading schedule…</div>` : this._error ? $`<div class="error" role="alert">${this._error}</div>` : $`
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
    return this._transitions.length === 0 ? G : $`
      <ul class="list">
        ${this._transitions.map((e) => {
      const t = () => this._onEdit(new CustomEvent("transition-edit", { detail: { transition: e } }));
      return $`
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
wt.styles = [
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
Yt([
  I({ attribute: !1 })
], wt.prototype, "hass", 2);
Yt([
  I({ type: String })
], wt.prototype, "zone", 2);
Yt([
  re()
], wt.prototype, "_profile", 2);
Yt([
  re()
], wt.prototype, "_transitions", 2);
Yt([
  re()
], wt.prototype, "_loading", 2);
Yt([
  re()
], wt.prototype, "_error", 2);
Yt([
  re()
], wt.prototype, "_mode", 2);
Yt([
  re()
], wt.prototype, "_editing", 2);
Yt([
  re()
], wt.prototype, "_newAt", 2);
wt = Yt([
  Qe("comfort-band-schedule-tab")
], wt);
function Nl(e) {
  const t = Wl(e);
  return t ? e.states[t]?.state ?? null : null;
}
function yd(e) {
  return e.length === 0 ? 19 : e[e.length - 1].low;
}
function wd(e) {
  return e.length === 0 ? 22 : e[e.length - 1].high;
}
var xd = Object.defineProperty, $d = Object.getOwnPropertyDescriptor, Pn = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? $d(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && xd(t, i, r), r;
};
let bi = class extends ze {
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
      return $`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    const i = Gl(this.hass, this.entities.roomTemperature);
    return $`
      ${this._error ? $`<div class="error" role="alert">${this._error}</div>` : G}
      ${this._renderToggle({
      entityId: e,
      title: "Use apparent temperature",
      desc: $`When on, heating and cooling decisions use the humidity-adjusted "feels like"
        value instead of the raw sensor. Falls back to the raw value automatically if the humidity
        sensor is unavailable.`
    })}
      ${this._renderToggle({
      entityId: t,
      title: "Learning enabled",
      desc: $`Reserved for upcoming features (suggested-schedule nudges, predictive control).
        Has no effect today.`
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
    return $`
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
bi.styles = [
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
Pn([
  I({ attribute: !1 })
], bi.prototype, "hass", 2);
Pn([
  I({ type: String })
], bi.prototype, "zone", 2);
Pn([
  I({ attribute: !1 })
], bi.prototype, "entities", 2);
Pn([
  re()
], bi.prototype, "_pendingByEntity", 2);
Pn([
  re()
], bi.prototype, "_error", 2);
bi = Pn([
  Qe("comfort-band-settings-tab")
], bi);
var Sd = Object.defineProperty, kd = Object.getOwnPropertyDescriptor, yi = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? kd(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Sd(t, i, r), r;
};
const Mi = [
  { id: "now", label: "Now" },
  { id: "schedule", label: "Schedule" },
  { id: "profiles", label: "Profiles" },
  { id: "settings", label: "Settings" },
  { id: "insights", label: "Insights" }
];
let Wt = class extends ze {
  constructor() {
    super(...arguments), this.zone = "", this.zoneName = "", this._activeTab = "now", this._isOpen = !1, this._onClose = () => {
      this._isOpen = !1, this.dispatchEvent(
        new CustomEvent("comfort-band-modal-close", { bubbles: !0, composed: !0 })
      );
    }, this._onSelectTab = (e) => {
      this._activeTab = e;
    }, this._onTablistKeydown = (e) => {
      const t = Mi.findIndex((r) => r.id === this._activeTab);
      if (t < 0) return;
      let i;
      switch (e.key) {
        case "ArrowLeft":
          i = (t - 1 + Mi.length) % Mi.length;
          break;
        case "ArrowRight":
          i = (t + 1) % Mi.length;
          break;
        case "Home":
          i = 0;
          break;
        case "End":
          i = Mi.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      const n = Mi[i].id;
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
    return $`
      <dialog @close=${this._onClose}>
        <div class="frame">
          <header>
            <h2>${e}</h2>
            <button class="close" @click=${this.close} aria-label="Close">×</button>
          </header>
          <nav role="tablist" @keydown=${this._onTablistKeydown}>
            ${Mi.map(
      (t) => $`
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
        return $`<comfort-band-now-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-now-tab>`;
      case "schedule":
        return $`<comfort-band-schedule-tab
          .hass=${this.hass}
          .zone=${this.zone}
        ></comfort-band-schedule-tab>`;
      case "profiles":
        return $`<comfort-band-profiles-tab .hass=${this.hass}></comfort-band-profiles-tab>`;
      case "settings":
        return $`<comfort-band-settings-tab
          .hass=${this.hass}
          .zone=${this.zone}
          .entities=${this.entities}
        ></comfort-band-settings-tab>`;
      case "insights":
        return $`<comfort-band-insights-tab
          .hass=${this.hass}
          .entities=${this.entities}
        ></comfort-band-insights-tab>`;
    }
  }
};
Wt.styles = [
  Xe,
  je`
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
yi([
  I({ attribute: !1 })
], Wt.prototype, "hass", 2);
yi([
  I({ type: String })
], Wt.prototype, "zone", 2);
yi([
  I({ type: String })
], Wt.prototype, "zoneName", 2);
yi([
  I({ attribute: !1 })
], Wt.prototype, "entities", 2);
yi([
  re()
], Wt.prototype, "_activeTab", 2);
yi([
  re()
], Wt.prototype, "_isOpen", 2);
yi([
  wn("dialog")
], Wt.prototype, "_dialog", 2);
Wt = yi([
  Qe("comfort-band-modal")
], Wt);
var Ad = Object.defineProperty, Ed = Object.getOwnPropertyDescriptor, is = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ed(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Ad(t, i, r), r;
};
let Qn = class extends ze {
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
      return $`<div class="empty">
        No Comfort Band zones found. Add one via Settings → Devices & Services first.
      </div>`;
    const t = this.config.variant === "mini" ? "mini" : "tile";
    return $`
      <label>
        Zone
        <select @change=${this._onZoneChange} .value=${this.config.zone || ""}>
          ${this.config.zone === "" ? $`<option value="" disabled selected>Select a zone…</option>` : null}
          ${e.map(
      (i) => $` <option value=${i} ?selected=${i === this.config.zone}>${i}</option> `
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
Qn.styles = [
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
is([
  I({ attribute: !1 })
], Qn.prototype, "hass", 2);
is([
  I({ attribute: !1 })
], Qn.prototype, "config", 2);
Qn = is([
  Qe("comfort-band-card-editor")
], Qn);
var Pd = Object.defineProperty, Td = Object.getOwnPropertyDescriptor, Nr = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Td(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (r = (n ? l(t, i, r) : l(r)) || r);
  return n && r && Pd(t, i, r), r;
};
let yn = class extends ze {
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
    if (!this._config || !this.hass) return $``;
    const e = this._config.zone, t = nu(this.hass, e);
    if (t.deviceId === null)
      return $`<div class="placeholder">
        Comfort Band zone <code>${e}</code> not found. Add it via Settings → Devices &
        Services.
      </div>`;
    const i = this._config.compact === !0, n = this._config.variant === "mini" ? "mini" : "tile", r = this._buildView(this.hass, t);
    return $`
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
      ${i ? null : $`<comfort-band-modal
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
yn.styles = [
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
Nr([
  I({ attribute: !1 })
], yn.prototype, "hass", 2);
Nr([
  re()
], yn.prototype, "_config", 2);
Nr([
  wn("comfort-band-modal")
], yn.prototype, "_modal", 2);
yn = Nr([
  Qe("comfort-band-card")
], yn);
(window.customCards ??= []).push({
  type: "comfort-band-card",
  name: "Comfort Band",
  description: "Schedule editor and live status for a Comfort Band zone.",
  preview: !1
});
console.info(
  "%c COMFORT-BAND-CARD %c v0.8.4 ",
  "color:white;background:#2196F3;padding:2px 4px;border-radius:3px",
  "color:#000;background:#fff;padding:2px 4px;border-radius:3px"
);
