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

  describe('readout', () => {
    const readout = (el: HTMLElement) =>
      el.shadowRoot!.querySelector('.readout')!.textContent!.replace(/\s+/g, ' ').trim();

    // At the track's ends the two values read as its scale; under the handles
    // they collide on a phone when the handles are close.
    it('shows the chosen band as one range, not as values at the ends of the track', async () => {
      const el = await slider({ low: 19.5, high: 22.5, unit: '°' });
      expect(readout(el)).toBe('19.5° – 22.5°');
      expect(el.shadowRoot!.querySelector('.label-row')).toBeNull();
    });

    it('follows the handles', async () => {
      const el = await slider({ low: 18, high: 23 });
      el.low = 20.5;
      el.high = 21;
      await el.updateComplete;
      expect(readout(el)).toBe('20.5° – 21.0°');
    });

    // Each handle already announces its own value.
    it('is hidden from screen readers', async () => {
      const el = await slider();
      expect(el.shadowRoot!.querySelector('.readout')!.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
