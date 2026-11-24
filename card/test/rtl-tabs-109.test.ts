/**
 * #109: in a right-to-left layout (HA in Hebrew or Arabic), parts of the
 * tabs and the card editor were placed by a physical side, so they didn't
 * mirror: the profile menu's items sat at its far end, the Settings switches'
 * knobs, the steppers, choices and values were pushed or aligned to the
 * right, Diagnostics' numbers likewise, Fine-tuning's grey words sat flush
 * against its title, the drop-down arrows stayed on the right (where the
 * words start), and the Schedule list's current row kept its bar on the left.
 *
 * Each is now placed by the start or end side. The Settings switches mirror
 * (Dave's choice): on, the knob sits at the end, the left in right-to-left.
 * The arrows and the bar, which have no logical form, get a right-to-left
 * rule of their own (`:dir(rtl)`); a browser without `:dir()` drops just that
 * rule and keeps the rest.
 *
 * jsdom has no layout, and its `:dir()` doesn't follow the page, so this
 * pins the rules; real browsers check the placement.
 */

import { describe, expect, it } from 'vitest';
import '../src/tabs/settings-tab.js';
import '../src/tabs/profiles-tab.js';
import '../src/tabs/schedule-tab.js';
import '../src/tabs/diagnostics-tab.js';
import '../src/card-editor.js';
import { cssRules, physical } from './_css.js';

const TAGS = [
  'comfort-band-settings-tab',
  'comfort-band-profiles-tab',
  'comfort-band-schedule-tab',
  'comfort-band-diagnostics-tab',
  'comfort-band-card-editor',
];

/** The body of the one rule with exactly this selector, outside at-rules. */
function body(tag: string, selector: string): string {
  const found = cssRules(tag).filter((r) => r.at === '' && r.selector === selector);
  expect(found, `${tag} ${selector}`).toHaveLength(1);
  return found[0].body;
}

describe('#109 the tabs in right-to-left', () => {
  // Every rule in the tabs and the editor, in and out of at-rules: a left or
  // right longhand, left/right positioning, float or text-align to a side, or
  // an uneven margin/padding shorthand fails here. The disclosure chevrons
  // aside: they're drawn with a right and bottom border and turned for the
  // direction, which #108's test pins.
  it('places nothing in the tabs or the editor by a left or right side', () => {
    for (const tag of TAGS) {
      expect(
        cssRules(tag)
          .filter((r) => !r.selector.endsWith('summary::before'))
          .flatMap((r) =>
            r.body
              .split(/;\s*/)
              .filter(Boolean)
              .filter(physical)
              .map((d) => `${r.selector} { ${d} }`),
          ),
        tag,
      ).toEqual([]);
    }
  });

  it('mirrors the Settings switches: the knob from the start, to the end when on', () => {
    expect(body('comfort-band-settings-tab', '.toggle .knob')).toContain(
      'inset-inline-start: 4px;',
    );
    expect(body('comfort-band-settings-tab', '.toggle .knob')).toContain(
      'transition: inset-inline-start 0.15s ease;',
    );
    expect(body('comfort-band-settings-tab', ".toggle[aria-checked='true'] .knob")).toBe(
      'inset-inline-start: 24px;',
    );
  });

  it('pushes and aligns to the end, and spaces from the start', () => {
    const want: Array<[string, string, string]> = [
      ['comfort-band-settings-tab', '.stepper', 'margin-inline-start: auto;'],
      ['comfort-band-settings-tab', '.choice', 'margin-inline-start: auto;'],
      ['comfort-band-settings-tab', '.choice', 'padding-block: 0; padding-inline: 10px 28px;'],
      ['comfort-band-settings-tab', '.info-value', 'text-align: end;'],
      [
        'comfort-band-settings-tab',
        'details.fine .fine-summary',
        'margin-inline-start: var(--cb-gap-sm);',
      ],
      ['comfort-band-profiles-tab', '.menu button', 'text-align: start;'],
      ['comfort-band-schedule-tab', '.row .actions', 'margin-inline-start: auto;'],
      ['comfort-band-diagnostics-tab', '.value', 'margin-inline-start: auto;'],
      ['comfort-band-diagnostics-tab', '.value', 'text-align: end;'],
      ['comfort-band-diagnostics-tab', 'th, td', 'text-align: end;'],
      [
        'comfort-band-diagnostics-tab',
        'th:first-child, td:first-child',
        'padding-inline-start: 0; text-align: start;',
      ],
      ['comfort-band-card-editor', 'select', 'padding-block: 8px; padding-inline: 8px 32px;'],
    ];
    for (const [tag, selector, decls] of want) {
      expect(body(tag, selector), `${tag} ${selector}`).toContain(decls);
    }
  });

  // The arrow is two small triangles drawn as backgrounds, `size` wide, the
  // first `far` from the end and the second `near`. In right-to-left the
  // same picture sits as far from the start: the first at `near`, the second
  // at `near + size`, so the pair spans the same room on the other side.
  for (const [tag, selector, size, far, near] of [
    ['comfort-band-settings-tab', '.choice', 5, 15, 10],
    ['comfort-band-card-editor', 'select', 6, 18, 12],
  ] as const) {
    it(`mirrors the drop-down arrow of ${tag} ${selector}`, () => {
      expect(body(tag, selector)).toContain(
        `background-position: calc(100% - ${far}px) 50%, calc(100% - ${near}px) 50%;`,
      );
      expect(body(tag, `${selector}:dir(rtl)`)).toBe(
        `background-position: ${near}px 50%, ${near + size}px 50%;`,
      );
    });
  }

  it('keeps the Schedule current row’s bar at its start', () => {
    expect(body('comfort-band-schedule-tab', '.row.current')).toContain(
      'box-shadow: inset 3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));',
    );
    expect(body('comfort-band-schedule-tab', '.row.current:dir(rtl)')).toBe(
      'box-shadow: inset -3px 0 0 var(--cb-accent, var(--primary-color, #03a9f4));',
    );
  });
});
