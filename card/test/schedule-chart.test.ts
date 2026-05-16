import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/schedule-chart.js';
import type { ComfortBandScheduleChart } from '../src/schedule-chart.js';
import type { Transition } from '../src/types.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

// 600 px wide, 200 px tall — matches the chart's viewBox so a clientX of
// `x` maps directly to the SVG x-coord, and a clientY of `y` maps directly
// to the SVG y-coord. Makes the time/temperature maths in tests obvious.
const RECT = {
  left: 0,
  top: 0,
  width: 600,
  height: 200,
  right: 600,
  bottom: 200,
  x: 0,
  y: 0,
  toJSON() {},
};

const SCHEDULE: Transition[] = [
  { at: '06:00', low: 20, high: 23 },
  { at: '22:00', low: 18, high: 21 },
];

async function chart(transitions: Transition[] = SCHEDULE): Promise<ComfortBandScheduleChart> {
  const el = await mount('comfort-band-schedule-chart', { transitions });
  const svg = el.shadowRoot!.querySelector('svg') as SVGElement;
  Object.defineProperty(svg, 'getBoundingClientRect', { value: () => RECT, configurable: true });
  return el;
}

function pointer(type: string, x: number, y: number): PointerEvent {
  const ev = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(ev, { clientX: x, clientY: y, pointerId: 1 });
  return ev as PointerEvent;
}

// Mirrors the chart's mapping: 600 px wide => 24h, time-to-x in minutes.
function xFromTime(at: string): number {
  const [h, m] = at.split(':').map(Number);
  return ((h * 60 + m) / (24 * 60)) * 600;
}
// 200 px tall => 14..28 °C inverted.
function yFromTemp(temp: number): number {
  return 200 - ((temp - 14) / (28 - 14)) * 200;
}

describe('comfort-band-schedule-chart', () => {
  it('renders two stepped polylines, one filled path, and 2N handles', async () => {
    const el = await chart();
    expect(el.shadowRoot!.querySelectorAll('.line.low').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.line.high').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.fill').length).toBe(1);
    expect(el.shadowRoot!.querySelectorAll('.handle').length).toBe(SCHEDULE.length * 2);
  });

  it('shows the empty hint when there are no transitions', async () => {
    const el = await chart([]);
    expect(el.shadowRoot!.querySelector('.empty-hint')).not.toBeNull();
    expect(el.shadowRoot!.querySelectorAll('.handle').length).toBe(0);
  });

  it('emits transition-edit on a tap (no movement) on a handle', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-edit', fire);
    const handle = el.shadowRoot!.querySelector('.handle') as SVGElement;
    handle.dispatchEvent(pointer('pointerdown', xFromTime('06:00'), yFromTemp(20)));
    handle.dispatchEvent(pointer('pointerup', xFromTime('06:00'), yFromTemp(20)));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({ transition: SCHEDULE[0] });
  });

  it('emits transition-delete on long-press', async () => {
    vi.useFakeTimers();
    try {
      const el = await chart();
      const fire = vi.fn();
      el.addEventListener('transition-delete', fire);
      const handle = el.shadowRoot!.querySelector('.handle') as SVGElement;
      handle.dispatchEvent(pointer('pointerdown', xFromTime('06:00'), yFromTemp(20)));
      vi.advanceTimersByTime(600);
      expect(fire).toHaveBeenCalledOnce();
      expect(fire.mock.calls[0][0].detail).toEqual({ at: '06:00' });
    } finally {
      vi.useRealTimers();
    }
  });

  it('emits transition-update when a low handle is dragged vertically by 1°C', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    const startX = xFromTime('06:00');
    const startY = yFromTemp(20);
    handle.dispatchEvent(pointer('pointerdown', startX, startY));
    handle.dispatchEvent(pointer('pointermove', startX, yFromTemp(21)));
    handle.dispatchEvent(pointer('pointerup', startX, yFromTemp(21)));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({
      oldAt: '06:00',
      transition: { at: '06:00', low: 21, high: 23 },
    });
  });

  it('emits transition-update with new at when a handle is dragged horizontally', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    const startX = xFromTime('06:00');
    const startY = yFromTemp(20);
    const endX = xFromTime('06:30');
    handle.dispatchEvent(pointer('pointerdown', startX, startY));
    handle.dispatchEvent(pointer('pointermove', endX, startY));
    handle.dispatchEvent(pointer('pointerup', endX, startY));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({
      oldAt: '06:00',
      transition: { at: '06:30', low: 20, high: 23 },
    });
  });

  it('clamps a low-handle drag upward to stop short of high - 0.5°C', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    const startX = xFromTime('06:00');
    const startY = yFromTemp(20);
    // Try to drag low all the way up to 25 °C — way above high (23).
    handle.dispatchEvent(pointer('pointerdown', startX, startY));
    handle.dispatchEvent(pointer('pointermove', startX, yFromTemp(25)));
    handle.dispatchEvent(pointer('pointerup', startX, yFromTemp(25)));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({
      oldAt: '06:00',
      transition: { at: '06:00', low: 22.5, high: 23 },
    });
  });

  it('clamps a high-handle drag downward to stop short of low + 0.5°C', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.high') as SVGElement;
    const startX = xFromTime('06:00');
    const startY = yFromTemp(23);
    handle.dispatchEvent(pointer('pointerdown', startX, startY));
    handle.dispatchEvent(pointer('pointermove', startX, yFromTemp(17)));
    handle.dispatchEvent(pointer('pointerup', startX, yFromTemp(17)));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({
      oldAt: '06:00',
      transition: { at: '06:00', low: 20, high: 20.5 },
    });
  });

  it('prevents a horizontal drag from colliding with another transition', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelectorAll('.handle.low')[0] as SVGElement;
    // Try to drag 06:00 all the way to 23:00 — would land beyond 22:00.
    const startX = xFromTime('06:00');
    const startY = yFromTemp(20);
    handle.dispatchEvent(pointer('pointerdown', startX, startY));
    handle.dispatchEvent(pointer('pointermove', xFromTime('23:00'), startY));
    handle.dispatchEvent(pointer('pointerup', xFromTime('23:00'), startY));
    expect(fire).toHaveBeenCalledOnce();
    // Clamped to one snap-step before 22:00.
    expect(fire.mock.calls[0][0].detail.transition.at).toBe('21:45');
  });

  it('tap on empty space emits transition-add with snapped at + band centred on tap temp', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-add', fire);
    const svg = el.shadowRoot!.querySelector('svg') as SVGElement;
    const x = xFromTime('12:00');
    const y = yFromTemp(21);
    svg.dispatchEvent(pointer('pointerdown', x, y));
    svg.dispatchEvent(pointer('pointerup', x, y));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({ at: '12:00', low: 19.5, high: 22.5 });
  });

  it('tap on empty space does not fire when it lands on an existing transitions at-slot', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-add', fire);
    const svg = el.shadowRoot!.querySelector('svg') as SVGElement;
    // Same snap-slot as the 06:00 transition.
    const x = xFromTime('06:00');
    const y = yFromTemp(15);
    svg.dispatchEvent(pointer('pointerdown', x, y));
    svg.dispatchEvent(pointer('pointerup', x, y));
    expect(fire).not.toHaveBeenCalled();
  });

  it('keyboard: ArrowRight on a focused handle emits transition-update with +15 min', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({
      oldAt: '06:00',
      transition: { at: '06:15', low: 20, high: 23 },
    });
  });

  it('keyboard: ArrowUp on a low handle emits transition-update with +0.5°C', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({
      oldAt: '06:00',
      transition: { at: '06:00', low: 20.5, high: 23 },
    });
  });

  it('keyboard: Delete on a focused handle emits transition-delete', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-delete', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', bubbles: true }));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({ at: '06:00' });
  });

  it('keyboard: Enter on a focused handle emits transition-edit', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-edit', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail).toEqual({ transition: SCHEDULE[0] });
  });

  it('pointercancel mid-drag tears down state without firing any event', async () => {
    const el = await chart();
    const update = vi.fn();
    const edit = vi.fn();
    el.addEventListener('transition-update', update);
    el.addEventListener('transition-edit', edit);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(pointer('pointerdown', xFromTime('06:00'), yFromTemp(20)));
    handle.dispatchEvent(pointer('pointermove', xFromTime('06:00'), yFromTemp(21)));
    handle.dispatchEvent(pointer('pointercancel', xFromTime('06:00'), yFromTemp(21)));
    expect(update).not.toHaveBeenCalled();
    expect(edit).not.toHaveBeenCalled();
  });

  it('pointercancel on the SVG background does not fire transition-add', async () => {
    const el = await chart();
    const fire = vi.fn();
    el.addEventListener('transition-add', fire);
    const svg = el.shadowRoot!.querySelector('svg') as SVGElement;
    const x = xFromTime('12:00');
    const y = yFromTemp(21);
    svg.dispatchEvent(pointer('pointerdown', x, y));
    svg.dispatchEvent(pointer('pointercancel', x, y));
    expect(fire).not.toHaveBeenCalled();
  });

  it('tap on the right edge clamps to 23:45 rather than emitting "24:00"', async () => {
    const el = await chart([]);
    const fire = vi.fn();
    el.addEventListener('transition-add', fire);
    const svg = el.shadowRoot!.querySelector('svg') as SVGElement;
    // Rightmost pixel — would otherwise format to "24:00" which is invalid.
    svg.dispatchEvent(pointer('pointerdown', 600, yFromTemp(21)));
    svg.dispatchEvent(pointer('pointerup', 600, yFromTemp(21)));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail.at).toBe('23:45');
  });

  it('pointercancel before any movement does not fire transition-edit', async () => {
    const el = await chart();
    const edit = vi.fn();
    el.addEventListener('transition-edit', edit);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(pointer('pointerdown', xFromTime('06:00'), yFromTemp(20)));
    handle.dispatchEvent(pointer('pointercancel', xFromTime('06:00'), yFromTemp(20)));
    expect(edit).not.toHaveBeenCalled();
  });

  it('drags a handle horizontally with only one transition (no collision clamp over-restricts)', async () => {
    const el = await chart([{ at: '06:00', low: 20, high: 23 }]);
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    const startY = yFromTemp(20);
    handle.dispatchEvent(pointer('pointerdown', xFromTime('06:00'), startY));
    handle.dispatchEvent(pointer('pointermove', xFromTime('14:00'), startY));
    handle.dispatchEvent(pointer('pointerup', xFromTime('14:00'), startY));
    expect(fire).toHaveBeenCalledOnce();
    expect(fire.mock.calls[0][0].detail.transition.at).toBe('14:00');
  });

  it('keyboard: ArrowLeft at 00:00 is clamped (no event)', async () => {
    const el = await chart([{ at: '00:00', low: 20, high: 23 }]);
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(fire).not.toHaveBeenCalled();
  });

  it('keyboard: ArrowRight at 23:45 is clamped (no event)', async () => {
    const el = await chart([{ at: '23:45', low: 20, high: 23 }]);
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(fire).not.toHaveBeenCalled();
  });

  it('keyboard: ArrowUp on a high handle at Y_AXIS_MAX is clamped (no event)', async () => {
    const el = await chart([{ at: '06:00', low: 26, high: 28 }]);
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.high') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(fire).not.toHaveBeenCalled();
  });

  it('keyboard: ArrowDown on a low handle at Y_AXIS_MIN is clamped (no event)', async () => {
    const el = await chart([{ at: '06:00', low: 14, high: 18 }]);
    const fire = vi.fn();
    el.addEventListener('transition-update', fire);
    const handle = el.shadowRoot!.querySelector('.handle.low') as SVGElement;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(fire).not.toHaveBeenCalled();
  });
});
