/**
 * #113: the card built for ES2022, and its bundle held a class static block,
 * so it couldn't even be parsed below Safari 16.4 and Chrome 94: on an iPad on
 * iOS 15.4–16.3, which Home Assistant itself supports, the card didn't load.
 * It now builds for Chrome 85, Firefox 98 and Safari/iOS 15.4 (Dave's choice;
 * HA's own floor reaches further, to Chrome 67).
 *
 * These read the committed bundle (`dist/`, which CI rebuilds and compares):
 * it must parse as ES2021, the newest syntax all of those run, and use no
 * built-in newer than them. The gauge's colour, from color-mix() (Safari
 * 16.2, Chrome 111), falls back to the action's own colour where it's
 * missing. None of these old browsers runs here: the checks are on the text.
 */

import { parse } from 'acorn';
import { describe, expect, it } from 'vitest';
// As text: the bundle CI rebuilds and compares, and the build's config (whose
// own import of esbuild doesn't run under jsdom).
import bundleText from '../../dist/comfort-band-card.js?raw';
import configText from '../../vite.config.ts?raw';
import '../src/band-gauge.js';

const bundle = () => bundleText;

describe('#113 the build floor', () => {
  it('builds for Chrome 85, Firefox 98 and Safari/iOS 15.4', () => {
    const targets = /^\s*target: (\[[^\]]*\]),$/m.exec(configText);
    expect(targets, 'one build.target array').not.toBeNull();
    expect(configText.match(/^\s*target:/gm)).toHaveLength(1);
    expect(JSON.parse(targets![1].replace(/'/g, '"'))).toEqual([
      'chrome85',
      'edge85',
      'firefox98',
      'safari15.4',
      'ios15.4',
    ]);
  });

  // ES2022 and later syntax (class static blocks, class fields, private
  // `#x in`, top-level await, the regex `d` flag) fails here. ES2021's, such
  // as logical assignment (`??=`), runs in all of them.
  it('parses as ES2021', () => {
    expect(() => parse(bundle(), { ecmaVersion: 2021, sourceType: 'module' })).not.toThrow();
  });

  // Syntax acorn accepts at ES2021 that the floor doesn't: regex lookbehind
  // (Safari 16.4) and the `v` flag. And built-ins newer than the floor, which
  // would load and then throw: `.at()` and `Object.hasOwn` (Chrome 92/93),
  // `structuredClone`, the copying array methods, `findLast`,
  // `Object.groupBy`, `Promise.withResolvers`, `Array.fromAsync`.
  it('uses no regex syntax or built-in newer than the floor', () => {
    const text = bundle();
    const found = [
      /\(\?<[=!]/,
      /\/[dgimsuy]*v[dgimsuy]*[,;)\]}\s]/,
      /\.at\(/,
      /\bObject\.hasOwn\b/,
      /\bstructuredClone\b/,
      /\.(toSorted|toReversed|toSpliced|findLast|findLastIndex)\(/,
      /\bObject\.groupBy\b|\bMap\.groupBy\b/,
      /\bPromise\.withResolvers\b/,
      /\bArray\.fromAsync\b/,
    ].filter((p) => p.test(text));
    expect(found.map(String)).toEqual([]);
  });

  // color-mix() only inside an @supports that checks for it, with the
  // action's own colour as the gauge's default.
  it('gives the gauge a colour where color-mix() is missing', () => {
    const styles = (
      customElements.get('band-gauge') as unknown as { styles: Array<{ cssText: string }> }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const outside = styles.replace(/@supports \(color: color-mix\([^)]*\)\) \{[\s\S]*?\}\s*\}/, '');
    expect(outside).not.toMatch(/color-mix\(/);
    expect(outside).toMatch(/\.gauge \{[^}]*--cb-gauge-color: var\(--cb-gauge-base\);/);
    expect(bundle()).toContain('@supports (color: color-mix(in oklab, red, blue))');
  });
});
