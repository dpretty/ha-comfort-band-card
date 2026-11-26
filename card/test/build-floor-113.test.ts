/**
 * #113: the card built for ES2022, and its bundle held a class static block,
 * so it couldn't even be parsed below Safari 16.4 and Chrome 94: on an iPad on
 * iOS 15.4–16.3, which Home Assistant itself supports, the card didn't load.
 * It now builds for Chrome and Edge 87, Firefox 98 and Safari/iOS 15.4
 * (Dave's choice; HA's own floor reaches further, to Chrome 67). Chrome 87 is
 * where the logical insets and margins the card uses arrived.
 *
 * These read the committed bundle (`dist/`, which CI rebuilds and compares):
 * it must parse as ES2021, the newest syntax all of those run, and use none
 * of a list of regex features and built-ins newer than them. The gauge's
 * colour, from color-mix() (Safari 16.2, Chrome 111, Firefox 113), falls back
 * to the action's own colour where it's missing. None of these old browsers
 * runs here: the checks are on the text.
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
  it('builds for Chrome and Edge 87, Firefox 98 and Safari/iOS 15.4', () => {
    const targets = /^\s*target: (\[[^\]]*\]),$/m.exec(configText);
    expect(targets, 'one build.target array').not.toBeNull();
    expect(configText.match(/^\s*target:/gm)).toHaveLength(1);
    expect(JSON.parse(targets![1].replace(/'/g, '"'))).toEqual([
      'chrome87',
      'edge87',
      'firefox98',
      'safari15.4',
      'ios15.4',
    ]);
  });

  // ES2022 and later syntax (class static blocks, class fields, private
  // `#x in`, top-level await, a regex literal's `d` or `v` flag) fails here;
  // a flag esbuild has moved into `new RegExp(…)` doesn't.
  // ES2021's, such as logical assignment (`??=`), runs in all of them.
  it('parses as ES2021', () => {
    expect(() => parse(bundle(), { ecmaVersion: 2021, sourceType: 'module' })).not.toThrow();
  });

  // Regex lookbehind (Safari 16.4), in a literal or a string. A regex
  // literal's `d` (Chrome 90) or `v` flag fails "parses as ES2021", but for
  // these targets esbuild writes such a literal as `new RegExp(…, "d")`, and
  // the flags there aren't read: the card has none (#113's review). And a list
  // of built-ins newer than the floor, which would load and then throw or be
  // ignored. It's a list, not every one: an options object such as
  // `addEventListener`'s `signal`, say, isn't read, nor is CSS.
  it('uses no lookbehind, and none of a list of built-ins newer than the floor', () => {
    const text = bundle();
    const found = [
      /\(\?<[=!]/,
      /\.at\(/,
      /\bObject\.hasOwn\b/,
      /\bstructuredClone\b/,
      /\.(toSorted|toReversed|toSpliced|with|findLast|findLastIndex)\(/,
      /\bObject\.groupBy\b|\bMap\.groupBy\b/,
      /\bPromise\.withResolvers\b/,
      /\bArray\.fromAsync\b/,
      /\bcrypto\.randomUUID\b/,
      /\brequestIdleCallback\b/,
      /\bIntl\.Segmenter\b/,
      /\bAbortSignal\.(timeout|any)\b/,
      /\.checkVisibility\(/,
      /\.isWellFormed\(|\.toWellFormed\(/,
      /\.(union|intersection|difference|symmetricDifference|isSubsetOf|isSupersetOf|isDisjointFrom)\(/,
      /:modal\b/,
    ].filter((p) => p.test(text));
    expect(found.map(String)).toEqual([]);
  });

  // color-mix() only inside an @supports that checks for it, with the
  // action's own colour as the gauge's default; and nowhere else in the
  // bundle, any component's styles.
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
    const supported =
      /@supports \(color: color-mix\(in oklab, red, blue\)\) \{\s*\.gauge \{\s*--cb-gauge-color: color-mix\([^;]*\);\s*\}\s*\}/;
    expect(bundle()).toMatch(supported);
    expect(bundle().replace(supported, '')).not.toMatch(/color-mix\(/);
  });
});
