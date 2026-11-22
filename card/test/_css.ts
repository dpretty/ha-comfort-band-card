/** One CSS rule of a component's styles: its selector list as written
 *  (white space folded), its declarations, and the at-rules it's in. */
export interface CssRule {
  at: string;
  selector: string;
  body: string;
}

/** Every rule in a custom element's static `styles` (the shared ones it
 *  includes too), comments stripped, in order. */
export function cssRules(tag: string): CssRule[] {
  const css = (customElements.get(tag) as unknown as { styles: Array<{ cssText: string }> }).styles
    .flat()
    .map((s) => s.cssText)
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const out: CssRule[] = [];
  const open: string[] = [];
  let text = '';
  for (const ch of css) {
    if (ch === '{') {
      open.push(text.replace(/\s+/g, ' ').trim());
      text = '';
    } else if (ch === '}') {
      const head = open.pop()!;
      if (!head.startsWith('@')) {
        out.push({ at: open.join(' '), selector: head, body: text.replace(/\s+/g, ' ').trim() });
      }
      text = '';
    } else {
      text += ch;
    }
  }
  return out;
}
