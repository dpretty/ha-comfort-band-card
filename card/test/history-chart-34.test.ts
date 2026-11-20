import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/history-chart.js';
import {
  actionAt,
  mixColor,
  readoutLine,
  readoutTime,
  stripRects,
  temperatureUnit,
  timeLabels,
} from '../src/history-chart.js';
import type { ComfortBandHistoryChart } from '../src/history-chart.js';
import type { HomeAssistant, HassConnection } from '../src/types.js';
import { captureSubscription, mount, teardown } from './_fixture.js';

// #34: a readout of the values at the pointer, a range picker, heating and
// cooling as a strip under the plot, and readable axes.

afterEach(() => {
  teardown();
  vi.useRealTimers();
});

const FULL = {
  roomEntity: 'sensor.gym_room_temperature',
  lowEntity: 'sensor.gym_effective_low',
  highEntity: 'sensor.gym_effective_high',
  actionEntity: 'sensor.gym_current_action',
};
const OVERLAYS = {
  ...FULL,
  apparentEntity: 'sensor.gym_apparent_temperature',
  humidityEntity: 'sensor.gym_humidity',
};

function makeHass(connection: HassConnection, unit: string | null = '°C'): HomeAssistant {
  return {
    states: {
      'sensor.gym_room_temperature': {
        entity_id: 'sensor.gym_room_temperature',
        state: '21',
        attributes: unit === null ? {} : { unit_of_measurement: unit },
        last_changed: '',
        last_updated: '',
      },
    },
    devices: {},
    entities: {},
    connection,
    callService: vi.fn(),
    callWS: vi.fn(),
    locale: { language: 'en-GB', time_format: '24' },
  };
}

type Internals = {
  _plot: unknown;
  _loading: boolean;
  _cursorIdx: number | null;
  _intervals: Array<{ start: number; end: number; action: 'heating' | 'cooling' }>;
  _stripColors: { heating: string; cooling: string };
  _buildOpts: (w: number) => {
    axes: Array<{
      ticks?: { show?: boolean };
      gap?: number;
      size?: number;
      values?: (u: unknown, vs: number[]) => string[];
    }>;
    hooks: {
      draw: Array<(u: unknown) => void>;
      setCursor: Array<(u: unknown) => void>;
    };
  };
  _actionIntervals: (
    points: Array<{ s: string; lu: number }>,
    now: number,
  ) => Array<{ start: number; end: number; action: string }>;
};
const internals = (el: ComfortBandHistoryChart) => el as unknown as Internals;

/** A stand-in for uPlot, so the chart's own code runs without a canvas. */
function fakePlot(seriesCount: number) {
  return {
    series: new Array(seriesCount + 1),
    destroy: vi.fn(),
    setSize: vi.fn(),
    setData: vi.fn(),
    redraw: vi.fn(),
    setSeries: vi.fn(),
  };
}

async function chart(
  props: Partial<ComfortBandHistoryChart>,
): Promise<{ el: ComfortBandHistoryChart; sub: ReturnType<typeof captureSubscription> }> {
  const sub = captureSubscription();
  const el = await mount('comfort-band-history-chart', {
    hass: makeHass(sub.connection),
    ...props,
  } as Partial<ComfortBandHistoryChart>);
  await new Promise((r) => setTimeout(r, 0));
  return { el, sub };
}

const root = (el: ComfortBandHistoryChart) => el.shadowRoot!;
const readout = (el: ComfortBandHistoryChart) =>
  root(el).querySelector('.readout')!.textContent!.replace(/\s+/g, ' ').trim();
const rangeButtons = (el: ComfortBandHistoryChart) =>
  Array.from(root(el).querySelectorAll<HTMLButtonElement>('.ranges button'));
const pressed = (el: ComfortBandHistoryChart) =>
  rangeButtons(el)
    .filter((b) => b.getAttribute('aria-pressed') === 'true')
    .map((b) => b.textContent!.trim());

describe('readoutLine', () => {
  const base = {
    when: '22:30',
    room: 21.3,
    apparent: 21.9,
    low: 19.5,
    high: 22.5,
    humidity: 45.4,
    action: 'heating' as const,
  };

  it('gives the time and each value, and heating or cooling', () => {
    expect(readoutLine(base)).toBe(
      '22:30 · Room 21.3° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45% · Heating',
    );
    expect(readoutLine({ ...base, action: 'cooling', room: 21 })).toBe(
      '22:30 · Room 21° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45% · Cooling',
    );
  });

  it('leaves out what isn’t there', () => {
    expect(
      readoutLine({
        when: 'Now',
        room: 21.3,
        apparent: null,
        low: 19.5,
        high: null,
        humidity: null,
        action: null,
      }),
    ).toBe('Now · Room 21.3°');
    expect(readoutLine({ ...base, room: null, low: null })).toBe(
      '22:30 · Feels like 21.9° · Humidity 45% · Heating',
    );
  });
});

describe('readoutTime', () => {
  const h24 = { locale: { language: 'en-GB', time_format: '24' } } as const;
  const h12 = { locale: { language: 'en-US', time_format: '12' } } as const;
  const now = new Date(2026, 10, 20, 16, 0).getTime();

  it('gives the time today, and the weekday with it another day', () => {
    expect(readoutTime(new Date(2026, 10, 20, 9, 30).getTime(), now, h24)).toBe('09:30');
    expect(readoutTime(new Date(2026, 10, 19, 22, 30).getTime(), now, h24)).toBe('Thu 22:30');
    expect(readoutTime(new Date(2026, 10, 14, 6, 0).getTime(), now, h12)).toBe('Sat 6 AM');
    expect(
      readoutTime(new Date(2026, 10, 19, 22, 30).getTime(), now, {
        locale: { language: 'fr', time_format: '24' },
      } as never),
    ).toBe('Thu 22:30');
  });
});

describe('actionAt', () => {
  const intervals = [
    { start: 100, end: 200, action: 'heating' as const },
    { start: 300, end: 360, action: 'cooling' as const },
  ];

  it('finds the action at a time, from its start up to its end', () => {
    expect(actionAt(intervals, 100)).toBe('heating');
    expect(actionAt(intervals, 199)).toBe('heating');
    expect(actionAt(intervals, 200)).toBeNull();
    expect(actionAt(intervals, 330)).toBe('cooling');
    expect(actionAt(intervals, 50)).toBeNull();
  });
});

describe('stripRects', () => {
  const toX = (v: number) => v;

  it('places each interval in whole pixels within the plot', () => {
    expect(stripRects([{ start: 20.4, end: 40.6, action: 'heating' }], toX, 10, 110)).toEqual([
      { x: 20, w: 21, action: 'heating' },
    ]);
    // Cut at the plot's edges.
    expect(
      stripRects(
        [
          { start: 0, end: 30, action: 'cooling' },
          { start: 100, end: 150, action: 'heating' },
        ],
        toX,
        10,
        110,
      ),
    ).toEqual([
      { x: 10, w: 20, action: 'cooling' },
      { x: 100, w: 10, action: 'heating' },
    ]);
  });

  it('gives a short cycle at least a pixel, and leaves out what’s outside the plot', () => {
    expect(stripRects([{ start: 50, end: 50.2, action: 'cooling' }], toX, 10, 110)).toEqual([
      { x: 50, w: 1, action: 'cooling' },
    ]);
    expect(stripRects([{ start: 50, end: 50, action: 'cooling' }], toX, 10, 110)).toEqual([
      { x: 50, w: 1, action: 'cooling' },
    ]);
    expect(
      stripRects(
        [
          { start: 0, end: 5, action: 'cooling' },
          { start: 0, end: 10, action: 'cooling' },
          { start: 110, end: 120, action: 'heating' },
          { start: 115, end: 120, action: 'heating' },
        ],
        toX,
        10,
        110,
      ),
    ).toEqual([]);
  });
});

describe('timeLabels', () => {
  const at = (h: number, m = 0, day = 20) => new Date(2026, 10, day, h, m).getTime() / 1000;
  const h24 = { locale: { language: 'en-GB', time_format: '24' } } as const;
  const h12 = { locale: { language: 'en-US', time_format: '12' } } as const;

  it('writes times in HA’s 12/24-hour setting, the day under midnight', () => {
    expect(timeLabels([at(18), at(0, 0, 21), at(6, 30)], 24 * 3600, h24)).toEqual([
      '18:00',
      '00:00\nSat 21',
      '06:30',
    ]);
    expect(timeLabels([at(18), at(0, 0, 21)], 24 * 3600, h12)).toEqual(['6 PM', '12 AM\nSat 21']);
  });

  it('writes the day alone at midnight over more than a day and a half', () => {
    expect(timeLabels([at(0, 0, 14), at(12, 0, 14)], 7 * 24 * 3600, h24)).toEqual([
      'Sat 14',
      '12:00',
    ]);
    expect(timeLabels([at(0, 0, 14)], 36 * 3600, h24)).toEqual(['00:00\nSat 14']);
  });

  it('names days in English where HA’s language isn’t', () => {
    expect(
      timeLabels([at(0, 0, 21)], 7 * 24 * 3600, {
        locale: { language: 'de', time_format: '24' },
      } as never),
    ).toEqual(['Sat 21']);
  });
});

describe('temperatureUnit and mixColor', () => {
  it('takes the room temperature’s unit, or "°"', () => {
    const states = (attributes: Record<string, unknown>) =>
      ({
        states: {
          'sensor.x': { entity_id: 'sensor.x', state: '1', attributes },
        },
      }) as unknown as HomeAssistant;
    expect(temperatureUnit(states({ unit_of_measurement: '°F' }), 'sensor.x')).toBe('°F');
    expect(temperatureUnit(states({ unit_of_measurement: ' °C ' }), 'sensor.x')).toBe('°C');
    expect(temperatureUnit(states({ unit_of_measurement: ' ' }), 'sensor.x')).toBe('°');
    expect(temperatureUnit(states({}), 'sensor.x')).toBe('°');
    expect(temperatureUnit(undefined, 'sensor.x')).toBe('°');
  });

  it('mixes a colour part of the way to another', () => {
    expect(mixColor('#ff6f22', '#141414', 0.3)).toBe('rgb(185, 84, 30)');
    expect(mixColor('#f00', 'rgb(0, 0, 255)', 0.5)).toBe('rgb(128, 0, 128)');
    expect(mixColor('rgba(0, 0, 0, 0.5)', '#ffffff', 0.25)).toBe('rgb(64, 64, 64)');
    // Unreadable: as given.
    expect(mixColor(' red ', '#000', 0.3)).toBe('red');
    expect(mixColor('#123456', 'var(--x)', 0.3)).toBe('#123456');
  });
});

describe('comfort-band-history-chart ranges (#34)', () => {
  it('offers 6 h, 24 h and 7 d, showing 24 h to start with', async () => {
    const { el, sub } = await chart(FULL);
    expect(rangeButtons(el).map((b) => b.textContent!.trim())).toEqual(['6 h', '24 h', '7 d']);
    expect(pressed(el)).toEqual(['24 h']);
    expect(root(el).querySelector('.ranges')!.getAttribute('aria-label')).toBe('Show the last');
    const start = Date.parse(sub.subscriptions[0].message.start_time as string);
    expect(Date.now() - start).toBeGreaterThanOrEqual(24 * 3600_000 - 1000);
    expect(Date.now() - start).toBeLessThan(24 * 3600_000 + 60_000);
    expect(root(el).querySelector('.status')!.textContent).toContain(
      'Loading 24 hours of history…',
    );
  });

  it('asks HA for the range picked, in place of the last', async () => {
    const { el, sub } = await chart(FULL);
    rangeButtons(el)[2].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
    const start = Date.parse(sub.subscriptions[1].message.start_time as string);
    expect(Date.now() - start).toBeGreaterThanOrEqual(168 * 3600_000 - 1000);
    expect(Date.now() - start).toBeLessThan(168 * 3600_000 + 60_000);
    expect(pressed(el)).toEqual(['7 d']);
    expect(root(el).querySelector('.status')!.textContent).toContain('Loading 7 days of history…');
    expect(root(el).querySelector('.chart-host')!.getAttribute('aria-label')).toContain(
      'last 7 days',
    );
    rangeButtons(el)[0].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    const six = Date.parse(sub.subscriptions[2].message.start_time as string);
    expect(Date.now() - six).toBeLessThan(6 * 3600_000 + 60_000);
    expect(Date.now() - six).toBeGreaterThanOrEqual(6 * 3600_000 - 1000);
  });

  it('asks nothing new for the range already shown', async () => {
    const { el, sub } = await chart(FULL);
    rangeButtons(el)[1].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
  });

  // With a chart drawn, it stays until the new range's history arrives.
  it('keeps the chart while another range loads, the readout saying so', async () => {
    const { el, sub } = await chart(FULL);
    const now = Math.floor(Date.now() / 1000);
    internals(el)._plot = fakePlot(3);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    rangeButtons(el)[2].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(readout(el)).toBe('Loading 7 days of history…');
    expect(root(el).querySelector('.status')).toBeNull();
    expect(root(el).querySelector('.chart-host')!.classList.contains('idle')).toBe(false);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [{ s: '20.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 20° · Range 19–22°');
  });
});

describe('comfort-band-history-chart readout (#34)', () => {
  /** A chart with history delivered: a stand-in for uPlot drawn. */
  async function withHistory(props = OVERLAYS) {
    const { el, sub } = await chart(props);
    const now = Math.floor(Date.now() / 1000);
    const count = props === OVERLAYS ? 5 : 3;
    internals(el)._plot = fakePlot(count);
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [
          { s: '20.0', lu: now - 7200 },
          { s: '21.3', lu: now - 60 },
        ],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 7200 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 7200 }],
        'sensor.gym_apparent_temperature': [{ s: '21.9', lu: now - 7200 }],
        'sensor.gym_humidity': [{ s: '45', lu: now - 7200 }],
        'sensor.gym_current_action': [
          { s: 'heating', lu: now - 7200 },
          { s: 'idle', lu: now - 3600 },
        ],
      },
    });
    await el.updateComplete;
    return { el, now };
  }

  it('gives the latest values as "Now" without a pointer', async () => {
    const { el } = await withHistory();
    expect(readout(el)).toBe(
      'Now · Room 21.3° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45%',
    );
  });

  it('gives the values where the pointer is, with heating or cooling then', async () => {
    const { el, now } = await withHistory();
    internals(el)._cursorIdx = 0;
    await el.updateComplete;
    // Two hours ago: today's time, or yesterday's with its weekday.
    const when = readoutTime((now - 7200) * 1000, Date.now(), {
      locale: { language: 'en-GB', time_format: '24' },
    } as never);
    expect(readout(el)).toBe(
      `${when} · Room 20° · Feels like 21.9° · Range 19.5–22.5° · Humidity 45% · Heating`,
    );
  });

  it('leaves out a series hidden in the legend', async () => {
    const { el } = await withHistory();
    const toggle = Array.from(root(el).querySelectorAll<HTMLElement>('.legend .toggle')).find((t) =>
      t.textContent!.includes('Humidity'),
    )!;
    toggle.click();
    await el.updateComplete;
    expect(readout(el)).toBe('Now · Room 21.3° · Feels like 21.9° · Range 19.5–22.5°');
  });

  it('follows uPlot’s cursor, back to the latest when it leaves', async () => {
    const { el } = await withHistory();
    const hook = internals(el)._buildOpts(400).hooks.setCursor[0];
    hook({ cursor: { idx: 0 } });
    expect(internals(el)._cursorIdx).toBe(0);
    hook({ cursor: { idx: null } });
    expect(internals(el)._cursorIdx).toBeNull();
    hook({ cursor: {} });
    expect(internals(el)._cursorIdx).toBeNull();
  });

  it('forgets the pointer’s point when another range is picked', async () => {
    const { el } = await withHistory();
    internals(el)._cursorIdx = 0;
    rangeButtons(el)[0].click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(internals(el)._cursorIdx).toBeNull();
  });

  it('is two lines tall whatever its words take', () => {
    const css = (
      customElements.get('comfort-band-history-chart') as unknown as {
        styles: Array<{ cssText: string }>;
      }
    ).styles
      .flat()
      .map((s) => s.cssText)
      .join('\n');
    const rule = /\.readout\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
    expect(rule).toMatch(/line-height:\s*1\.35/);
    expect(rule).toMatch(/min-height:\s*2\.7em/);
  });
});

describe('comfort-band-history-chart strip and axes (#34)', () => {
  it('draws heating and cooling as a strip under the plot, in their mixed colours', async () => {
    const { el } = await chart(FULL);
    const opts = internals(el)._buildOpts(400);
    internals(el)._intervals = [
      { start: 20, end: 40, action: 'heating' },
      { start: 60, end: 61, action: 'cooling' },
    ];
    const fills: Array<{ style: string; args: number[] }> = [];
    const ctx = {
      fillStyle: '',
      save: vi.fn(),
      restore: vi.fn(),
      fillRect(...args: number[]) {
        fills.push({ style: this.fillStyle, args });
      },
    };
    opts.hooks.draw[0]({
      ctx,
      bbox: { left: 10, top: 5, width: 100, height: 50 },
      valToPos: (v: number) => v,
    });
    const { heating, cooling } = internals(el)._stripColors;
    expect(heating).toMatch(/^rgb\(/);
    expect(cooling).toMatch(/^rgb\(/);
    // 3 px under the plot, 6 px tall.
    expect(fills).toEqual([
      { style: heating, args: [20, 58, 20, 6] },
      { style: cooling, args: [60, 58, 1, 6] },
    ]);
  });

  it('draws a run of the same action as one interval', async () => {
    const { el } = await chart(FULL);
    const runs = internals(el)._actionIntervals(
      [
        { s: 'heating', lu: 0 },
        { s: 'heating', lu: 60 },
        { s: 'heating', lu: 120 },
        { s: 'idle', lu: 180 },
        { s: 'cooling', lu: 240 },
        { s: 'heating', lu: 300 },
      ],
      400,
    );
    expect(runs).toEqual([
      { start: 0, end: 180, action: 'heating' },
      { start: 240, end: 300, action: 'cooling' },
      { start: 300, end: 400, action: 'heating' },
    ]);
  });

  it('shows the strip’s colours in the legend', async () => {
    const { el } = await chart(FULL);
    internals(el)._buildOpts(400);
    internals(el)._loading = false;
    el.requestUpdate();
    await el.updateComplete;
    const swatch = (name: string) =>
      Array.from(root(el).querySelectorAll('.legend > span'))
        .find((s) => s.textContent!.includes(name))!
        .querySelector<HTMLElement>('.swatch')!;
    expect(swatch('Heating').style.background).toBe(internals(el)._stripColors.heating);
    expect(swatch('Cooling').style.background).toBe(internals(el)._stripColors.cooling);
    expect(swatch('Heating').style.opacity).toBe('');
  });

  it('labels the time axis in HA’s setting, leaving room for the strip', async () => {
    const { el } = await chart(FULL);
    const x = internals(el)._buildOpts(400).axes[0];
    expect(x.ticks?.show).toBe(false);
    expect(x.gap).toBe(14);
    expect(x.size).toBe(62);
    const at = new Date(2026, 10, 20, 18, 0).getTime() / 1000;
    expect(x.values!({ scales: { x: { min: at - 3600, max: at + 3600 } } }, [at])).toEqual([
      '18:00',
    ]);
  });

  it('writes the temperature axis with its unit, and "100%" with room', async () => {
    const { el } = await chart(OVERLAYS);
    const axes = internals(el)._buildOpts(400).axes;
    expect(axes[1].values!({}, [18, 19.5])).toEqual(['18°C', '19.5°C']);
    expect(axes[1].size).toBe(48);
    expect(axes[2].size).toBe(46);
    expect(axes[2].values!({}, [100])).toEqual(['100%']);
  });

  it('writes "°" alone where HA gives no unit', async () => {
    const sub = captureSubscription();
    const el = await mount('comfort-band-history-chart', {
      hass: makeHass(sub.connection, null),
      ...FULL,
    } as Partial<ComfortBandHistoryChart>);
    expect(internals(el)._buildOpts(400).axes[1].values!({}, [20])).toEqual(['20°']);
  });
});
