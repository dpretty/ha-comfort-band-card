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
