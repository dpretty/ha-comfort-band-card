/** One CSS rule of a component's styles: its selector list as written
 *  (white space folded), its declarations, and the at-rules it's in. */
export interface CssRule {
  at: string;
  selector: string;
  body: string;
}

/** Every rule in a custom element's static `styles` (the shared ones it
 *  includes too), comments stripped, in order. Statement at-rules
 *  (`@layer x;`) between rules are skipped. Nesting isn't parsed: a rule
 *  inside a rule throws, so a test reading it fails rather than misses it. */
export function cssRules(tag: string): CssRule[] {
  const css = (customElements.get(tag) as unknown as { styles: Array<{ cssText: string }> }).styles
    .flat()
    .map((s) => s.cssText)
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const out: CssRule[] = [];
  // The heads of the blocks open around the text being read: an at-rule's
  // (`@media …`), holding rules, or a rule's, holding declarations.
  const open: string[] = [];
  let text = '';
  for (const ch of css) {
    const inRule = open.length > 0 && !open[open.length - 1]!.startsWith('@');
    if (ch === '{') {
      if (inRule) throw new Error(`cssRules: a rule nested in "${open[open.length - 1]}"`);
      open.push(text.replace(/\s+/g, ' ').trim());
      text = '';
    } else if (ch === '}') {
      const head = open.pop()!;
      if (!head.startsWith('@')) {
        out.push({ at: open.join(' '), selector: head, body: text.replace(/\s+/g, ' ').trim() });
      }
      text = '';
    } else if (ch === ';' && !inRule) {
      text = '';
    } else {
      text += ch;
    }
  }
  return out;
}

/** A declaration that spaces, places or aligns by a physical side: a left or
 *  right side in the property's name (`margin-left`, `border-top-right-radius`,
 *  `left`), a `left` or `right` keyword in its value, `-webkit-` ones too
 *  (`text-align`, `float`, `justify-self`, `transition: left`), `inset`, or a
 *  `margin`/`padding` shorthand whose left and right differ; `!important`
 *  aside. It doesn't read other shorthands' sides (`border-radius`,
 *  `border-width`, `scroll-margin`), nor offsets (`translate`,
 *  `background-position`, `box-shadow`). From #101; the tabs use it too
 *  (#109). */
export function physical(decl: string): boolean {
  const i = decl.indexOf(':');
  const prop = decl.slice(0, i).trim().toLowerCase();
  const value = decl
    .slice(i + 1)
    .replace(/!\s*important\s*$/i, '')
    .trim()
    .toLowerCase();
  if (/(^|-)(left|right)(-|$)/.test(prop) || prop === 'inset') return true;
  // A keyword on its own (or `-webkit-` one), not part of a name such as
  // `var(--x-left)`.
  if (/(^|[\s,(])(-webkit-)?(left|right)($|[\s,)])/.test(value)) return true;
  if (prop === 'margin' || prop === 'padding') {
    // Split on spaces outside brackets: `var(--x) 0 0 6px` is four values.
    const parts = value.split(/\s+(?![^(]*\))/);
    return parts.length === 4 && parts[1] !== parts[3];
  }
  return false;
}
