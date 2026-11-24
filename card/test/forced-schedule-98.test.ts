/**
 * #98: in forced colours (a Windows contrast theme) the Schedule chart's
 * legend swatches took the page's colour, while the chart's SVG lines keep
 * theirs, so the legend no longer said which line was the low edge and which
 * the high. The swatches keep their colours there (opted out), each ringed
 * in the text colour by a shadow, which takes no room. As #90 does for the
 * History legend.
 *
 * jsdom has no forced colours or layout, so this pins the rules; real
 * browsers check the look.
 */

import { describe, expect, it } from 'vitest';
import '../src/schedule-chart.js';
import { cssRules } from './_css.js';

describe('#98 the Schedule legend swatches in forced colours', () => {
  // Read in each test, so CSS the helper can't parse fails a named test.
  const chart = () => cssRules('comfort-band-schedule-chart');

  // Every rule naming the legend, whole, in and out of forced colours: one
  // of them added, changed or put in another order among them fails here
  // (one moved past rules that don't name the legend doesn't).
  it('keeps each swatch its colour, ringed in the text colour, and nothing else changes', () => {
    expect(chart().filter((r) => r.selector.includes('legend'))).toEqual([
      {
        at: '',
        selector: '.legend',
        body:
          'display: flex; justify-content: flex-end; gap: var(--cb-gap-md); ' +
          'font-size: 11px; color: var(--cb-text-secondary);',
      },
      {
        at: '',
        selector: '.legend span::before',
        body:
          "content: ''; display: inline-block; width: 14px; height: 3px; " +
          'margin-right: 6px; vertical-align: middle; border-radius: 2px;',
      },
      {
        at: '',
        selector: '.legend .low::before',
        body: 'background: var(--cb-action-heating);',
      },
      {
        at: '',
        selector: '.legend .high::before',
        body: 'background: var(--cb-action-cooling);',
      },
      {
        at: '@media (forced-colors: active)',
        selector: '.legend span::before',
        body: 'forced-color-adjust: none; box-shadow: 0 0 0 1px CanvasText;',
      },
    ]);
  });

  // The swatches are the chart's only rule in forced colours, and the only
  // rule anywhere in its styles to set forced-color-adjust: one opting out
  // the lines or the labels, or a second forced rule, fails here.
  it('changes nothing else in forced colours', () => {
    const rules = chart();
    const forced = rules.filter((r) => r.at.includes('forced-colors'));
    expect(forced.map((r) => r.selector)).toEqual(['.legend span::before']);
    expect(
      rules.filter((r) => r.body.includes('forced-color-adjust')).map((r) => r.selector),
    ).toEqual(['.legend span::before']);
  });
});
