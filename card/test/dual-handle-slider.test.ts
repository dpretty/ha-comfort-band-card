import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/dual-handle-slider.js';
import type { DualHandleSlider } from '../src/dual-handle-slider.js';
import { mount, teardown } from './_fixture.js';

afterEach(teardown);

async function slider(props: Partial<DualHandleSlider> = {}): Promise<DualHandleSlider> {
  return mount('dual-handle-slider', {
    min: 16,
    max: 26,
    step: 0.5,
    low: 19,
    high: 22,
    ...props,
  });
}

function getThumbs(el: DualHandleSlider): { low: HTMLElement; high: HTMLElement } {
  const thumbs = el.shadowRoot!.querySelectorAll<HTMLElement>('.thumb');
  return { low: thumbs[0], high: thumbs[1] };
}

describe('dual-handle-slider', () => {
  it('renders two thumbs with role=slider and the right aria values', async () => {
    const el = await slider();
    const { low, high } = getThumbs(el);
    expect(low.getAttribute('role')).toBe('slider');
    expect(high.getAttribute('role')).toBe('slider');
    expect(low.getAttribute('aria-valuenow')).toBe('19');
    expect(high.getAttribute('aria-valuenow')).toBe('22');
    expect(low.getAttribute('aria-valuemax')).toBe('21.5');
    expect(high.getAttribute('aria-valuemin')).toBe('19.5');
  });

  it('shows formatted values in the label row', async () => {
    const el = await slider({ low: 19.5, high: 22.5, unit: '°' });
    const labels = el.shadowRoot!.querySelectorAll('.label-row span');
    expect(labels[0].textContent).toContain('19.5°');
    expect(labels[1].textContent).toContain('22.5°');
  });

  it('arrow keys step the focused thumb and fire a change event', async () => {
    const el = await slider({ low: 19, high: 22, step: 0.5 });
    const { low } = getThumbs(el);
    const events: Array<{ low: number; high: number }> = [];
    el.addEventListener('change', (e) => events.push((e as CustomEvent).detail));

    low.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(el.low).toBe(19.5);
    expect(events).toEqual([{ low: 19.5, high: 22 }]);

    low.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(el.low).toBe(19);
  });

  it('arrow keys cannot push low past high - step', async () => {
    const el = await slider({ low: 21.5, high: 22, step: 0.5 });
    const { low } = getThumbs(el);
    low.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    // Already at high - step (21.5); ArrowRight is rejected.
    expect(el.low).toBe(21.5);
  });

  it('arrow keys cannot push high below low + step', async () => {
    const el = await slider({ low: 19, high: 19.5, step: 0.5 });
    const { high } = getThumbs(el);
    high.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(el.high).toBe(19.5);
  });

  it('Home/End jump to the bounds (within constraints)', async () => {
    const el = await slider({ low: 19, high: 22, step: 0.5 });
    const { low, high } = getThumbs(el);
    const fire = vi.fn();
    el.addEventListener('change', fire);

    low.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await el.updateComplete;
    expect(el.low).toBe(16);

    high.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await el.updateComplete;
    expect(el.high).toBe(26);
  });

  it('snaps to step boundaries on programmatic prop set', async () => {
    // The snap function rounds to step intervals starting from `min`, so
    // the user can't end up with values like 19.31 that the integration
    // would refuse.
    const el = await slider({ low: 19, high: 22 });
    const { low } = getThumbs(el);
    low.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(el.low % 0.5).toBe(0);
  });

  describe('value labels', () => {
    function labels(el: HTMLElement) {
      const row = el.shadowRoot!.querySelector('.label-row')!;
      const lo = row.querySelector('.value-low') as HTMLElement;
      const hi = row.querySelector('.value-high') as HTMLElement;
      const pair = row.querySelector('.value-pair') as HTMLElement | null;
      return {
        lo: lo.style,
        hi: hi.style,
        text: [lo.textContent, hi.textContent],
        pair: pair && { left: pair.style.left, transform: pair.style.transform },
      };
    }

    const at = (low: number, high: number) =>
      mount('dual-handle-slider', { min: 16, max: 26, low, high });

    it('sits each value under its own handle, not at the ends of the track', async () => {
      // 18 and 23 on a 16–26 track are 20 % and 70 % along.
      const { lo, hi, text, pair } = labels(await at(18, 23));
      expect(pair).toBeNull();
      expect(text).toEqual(['18.0°', '23.0°']);
      expect([lo.left, hi.left]).toEqual(['20%', '70%']);
      expect([lo.transform, hi.transform]).toEqual(['translateX(-50%)', 'translateX(-50%)']);
    });

    it('aligns a value inwards near either end of the track', async () => {
      // 16.5 and 25.5 are 5 % from the ends; 16.75 and 25.25 are 7.5 %.
      const near = labels(await at(16.5, 25.5));
      expect([near.lo.transform, near.hi.transform]).toEqual([
        'translateX(0%)',
        'translateX(-100%)',
      ]);
      teardown();
      const clear = labels(await at(16.75, 25.25));
      expect([clear.lo.transform, clear.hi.transform]).toEqual([
        'translateX(-50%)',
        'translateX(-50%)',
      ]);
    });

    // Apart, each value is centred under its handle; close, they would
    // overlap, so they sit side by side as one pair.
    it('pairs the two values once the handles are closer than 14 % of the track', async () => {
      // 20 and 21.5 are 15 % apart; 20 and 21.35 are 13.5 %.
      expect(labels(await at(20, 21.5)).pair).toBeNull();
      teardown();
      const close = labels(await at(20, 21.35));
      expect(close.pair).not.toBeNull();
      expect(close.text).toEqual(['20.0°', '21.4°']);
    });

    it('runs the pair from the low handle when the handles are in the left half', async () => {
      // 16 and 17 are 0 % and 10 % along: the pair starts at the track's start.
      expect(labels(await at(16, 17)).pair).toEqual({ left: '0%', transform: 'translateX(0%)' });
      teardown();
      // 20 and 20.5 are 40 % and 45 %, together less than 100.
      expect(labels(await at(20, 20.5)).pair).toEqual({
        left: '40%',
        transform: 'translateX(0%)',
      });
    });

    it('runs the pair back from the high handle when they are in the right half', async () => {
      // 25 and 26 end at the track's end.
      expect(labels(await at(25, 26)).pair).toEqual({
        left: '100%',
        transform: 'translateX(-100%)',
      });
      teardown();
      // 21 and 22 are 50 % and 60 %.
      expect(labels(await at(21, 22)).pair).toEqual({
        left: '60%',
        transform: 'translateX(-100%)',
      });
    });
  });
});
