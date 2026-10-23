import { afterEach, describe, it, expect } from 'vitest';
import '../src/schedule-chart.js';
import type { ComfortBandScheduleChart } from '../src/schedule-chart.js';
import type { Transition } from '../src/types.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

// v0.9.0: the schedule-chart is now a pure read-only visualization. All
// interaction (drag, long-press, tap-to-add, keyboard nudges) moved into
// the schedule-tab's list view. These tests cover the chart's render
// contract — caller passes transitions, chart draws stepped lines + fill
// + markers. The companion editor tests live in schedule-tab.test.ts.

const SCHEDULE: Transition[] = [
  { at: '06:00', low: 20, high: 23 },
  { at: '22:00', low: 18, high: 21 },
];

async function chart(transitions: Transition[] = SCHEDULE): Promise<ComfortBandScheduleChart> {
  return mount('comfort-band-schedule-chart', { transitions });
}

describe('comfort-band-schedule-chart', () => {
  it('renders two stepped polylines, one filled path, and 2N markers', async () => {
    const el = await chart();
    expect(el.shadowRoot!.querySelectorAll('.line.low').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.line.high').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.fill').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.marker').length).toBe(SCHEDULE.length * 2);
  });

  it('renders no paths or markers when there are no transitions', async () => {
    const el = await chart([]);
    expect(el.shadowRoot!.querySelector('.line.low')).toBeNull();
    expect(el.shadowRoot!.querySelector('.line.high')).toBeNull();
    expect(el.shadowRoot!.querySelector('.fill')).toBeNull();
    expect(el.shadowRoot!.querySelectorAll('.marker').length).toBe(0);
  });

  it('renders the axis labels regardless of transition count', async () => {
    const empty = await chart([]);
    // 4 Y temp ticks + 5 X hour ticks = 9 axis labels.
    expect(empty.shadowRoot!.querySelectorAll('.axis-label').length).toBe(9);
    const full = await chart();
    expect(full.shadowRoot!.querySelectorAll('.axis-label').length).toBe(9);
  });

  it('markers are non-interactive (no tabindex, no role=button, no listeners attribute)', async () => {
    // The whole point of v0.9.0 — circles are visual only. A future regression
    // re-introducing interactivity would re-introduce the v0.8.x drag bugs.
    const el = await chart();
    const markers = el.shadowRoot!.querySelectorAll('.marker');
    expect(markers.length).toBe(SCHEDULE.length * 2);
    markers.forEach((m) => {
      expect(m.getAttribute('tabindex')).toBeNull();
      expect(m.getAttribute('role')).toBeNull();
      expect(m.getAttribute('aria-label')).toBeNull();
    });
  });

  it('exports parseTime for sort-order parity with the chart', async () => {
    const { parseTime } = await import('../src/schedule-chart.js');
    expect(parseTime('00:00')).toBe(0);
    expect(parseTime('06:00')).toBe(360);
    expect(parseTime('23:45')).toBe(23 * 60 + 45);
    expect(parseTime('garbage')).toBe(0);
  });

  // #33: colour isn't the only cue.
  it('colours the low edge for heating and the high for cooling, and names them below', async () => {
    const el = await chart();
    const css = (
      customElements.get('comfort-band-schedule-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(
      /\.line\.low,\s*\.marker\.low\s*\{[^}]*stroke:\s*var\(--cb-action-heating\)/,
    );
    expect(css).toMatch(
      /\.line\.high,\s*\.marker\.high\s*\{[^}]*stroke:\s*var\(--cb-action-cooling\)/,
    );
    expect(css).toMatch(/\.legend \.low::before\s*\{[^}]*background:\s*var\(--cb-action-heating\)/);
    expect(css).toMatch(
      /\.legend \.high::before\s*\{[^}]*background:\s*var\(--cb-action-cooling\)/,
    );
    const legend = el.shadowRoot!.querySelector('.legend')!;
    expect(legend.getAttribute('aria-hidden')).toBe('true');
    expect(Array.from(legend.children).map((c) => [c.className, c.textContent!.trim()])).toEqual([
      ['low', 'Low'],
      ['high', 'High'],
    ]);
  });

  // The hour labels sit across the plot, beside the temperatures' gutter.
  it('places the hours beside the gutter, as the lines are', async () => {
    const el = await chart();
    expect(
      Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.axis-label.x')).map((l) =>
        l.getAttribute('style'),
      ),
    ).toEqual([0, 0.25, 0.5, 0.75, 1].map((f) => `left: calc(32px + (100% - 32px) * ${f})`));
  });

  it('has no legend without changes', async () => {
    const el = await chart([]);
    expect(el.shadowRoot!.querySelector('.legend')).toBeNull();
  });

  // A dot is a line of no length with a round cap, its stroke unscaled.
  it('draws each change as a round dot', async () => {
    const el = await chart();
    const css = (
      customElements.get('comfort-band-schedule-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    const marker = /\.marker\s*\{([^}]*)\}/.exec(css)![1];
    expect(marker).toMatch(/stroke-width:\s*9;/);
    expect(marker).toMatch(/stroke-linecap:\s*round/);
    expect(marker).toMatch(/vector-effect:\s*non-scaling-stroke/);
    for (const m of Array.from(el.shadowRoot!.querySelectorAll('.marker'))) {
      expect(m.getAttribute('x2')).toBe(m.getAttribute('x1'));
      expect(m.getAttribute('y2')).toBe(m.getAttribute('y1'));
    }
    // Each at its own edge: 14–28 °C up the 200-unit-high plot.
    const y = (t: number) => String(200 - ((t - 14) / 14) * 200);
    const [low, high] = ['low', 'high'].map(
      (edge) => el.shadowRoot!.querySelector(`.marker.${edge}`)!,
    );
    expect([low.getAttribute('y1'), high.getAttribute('y1')]).toEqual([y(20), y(23)]);
  });

  // Real browsers check the spacing itself (#33 review): the now label sits
  // 14 px above the plot, and the hour labels 16 px below it.
  it('leaves room for the now label above and the hour labels below', () => {
    const css = (
      customElements.get('comfort-band-schedule-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    expect(css).toMatch(/:host\s*\{[^}]*margin:\s*18px 0 var\(--cb-gap-md\)/);
    expect(css).toMatch(/\.chart\s*\{[^}]*margin-bottom:\s*22px/);
    expect(css).toMatch(/\.now-label\s*\{[^}]*top:\s*-14px;[^}]*transform:\s*translateX\(-50%\)/);
    expect(css).toMatch(/\.now-line\s*\{[^}]*stroke-width:\s*1\.5/);
  });

  it('marks now, beside its gutter', async () => {
    const el = await mount('comfort-band-schedule-chart', { transitions: SCHEDULE, now: 18 * 60 });
    const line = el.shadowRoot!.querySelector('.now-line')!;
    expect([line.getAttribute('x1'), line.getAttribute('x2')]).toEqual(['450', '450']);
    expect([line.getAttribute('y1'), line.getAttribute('y2')]).toEqual(['0', '200']);
    const label = el.shadowRoot!.querySelector<HTMLElement>('.now-label')!;
    expect(label.textContent!.trim()).toBe('Now');
    expect(label.getAttribute('aria-hidden')).toBe('true');
    expect(label.getAttribute('style')).toContain('calc(32px + (100% - 32px) * 0.75)');
  });

  it('keeps the now marker on the chart', async () => {
    const el = await mount('comfort-band-schedule-chart', { transitions: SCHEDULE, now: 2000 });
    expect(el.shadowRoot!.querySelector('.now-line')!.getAttribute('x1')).toBe('600');
  });

  it('marks no now without one', async () => {
    const el = await chart();
    expect(el.shadowRoot!.querySelector('.now-line')).toBeNull();
    expect(el.shadowRoot!.querySelector('.now-label')).toBeNull();
  });

  it('describes itself in plain words', async () => {
    const el = await chart();
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).toBe('The comfortable range through the day');
    expect(svg.querySelector('title')!.textContent).toBe('The comfortable range through the day');
  });
});
