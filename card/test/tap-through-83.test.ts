/**
 * #83: a room's dialog closes by itself when its card leaves the page (#75)
 * or is hidden where it is (#82). A finger already on the dialog then, let
 * go, would tap whatever is now under it on the dashboard. A touch's end
 * goes to the element it began on, wherever that is by then, so each touch
 * begun in the dialog waits for its end there and cancels it if the dialog
 * has closed: that finger does nothing. Cancelled, a touch makes no click
 * (nor the mouse events a browser makes for a tap). Let go with the dialog
 * still open, its tap is kept in the dialog until its click: HA's update
 * closing the dialog can run between the touch's end and the click.
 *
 * jsdom has no `<dialog>` behaviour, no layout and no `ResizeObserver`, so
 * this file stands in for them as `modal-75.test.ts` and
 * `sections-hidden-82.test.ts` do.
 */

import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/comfort-band-card.js';
import type { ComfortBandCard } from '../src/comfort-band-card.js';
import { TAP_WITHIN_MS, type ComfortBandModal } from '../src/modal.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection, teardown } from './_fixture.js';

interface Watch {
  callback: ResizeObserverCallback;
  targets: Element[];
}
const watches: Watch[] = [];

class StandInResizeObserver {
  private watch: Watch;
  constructor(callback: ResizeObserverCallback) {
    this.watch = { callback, targets: [] };
    watches.push(this.watch);
  }
  observe(target: Element): void {
    this.watch.targets.push(target);
  }
  unobserve(target: Element): void {
    this.watch.targets = this.watch.targets.filter((t) => t !== target);
  }
  disconnect(): void {
    this.watch.targets = [];
  }
}

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', StandInResizeObserver);
  const proto = window.HTMLDialogElement.prototype as HTMLDialogElement;
  Object.defineProperty(proto, 'open', {
    configurable: true,
    get(this: HTMLDialogElement) {
      return this.hasAttribute('open');
    },
  });
  proto.showModal = function (this: HTMLDialogElement) {
    if (this.hasAttribute('open')) throw new DOMException('Already open', 'InvalidStateError');
    this.setAttribute('open', '');
  };
  proto.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    setTimeout(() => this.dispatchEvent(new Event('close')), 0);
  };
});

afterAll(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  // A new press ends any tap a test left kept in its dialog.
  window.dispatchEvent(new Event('pointerdown'));
  teardown();
  watches.length = 0;
});

const entities = { deviceId: 'dev-gym', deviceName: 'gym' } as unknown as ZoneEntities;

function makeHass(): HomeAssistant {
  return {
    states: {},
    devices: {
      'dev-gym': {
        id: 'dev-gym',
        identifiers: [['comfort_band', 'zone:gym']],
        name: 'Gym',
        name_by_user: null,
        area_id: null,
      },
    },
    entities: {},
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

/** Lets `close` fire, and Lit render. */
async function settle(el: { updateComplete: Promise<boolean> }): Promise<void> {
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
}

function holder(): HTMLElement {
  const div = document.createElement('div');
  document.body.append(div);
  return div;
}

async function openModalIn(place: HTMLElement): Promise<ComfortBandModal> {
  const el = document.createElement('comfort-band-modal');
  Object.assign(el, { hass: makeHass(), zone: 'gym', zoneName: 'Gym', entities });
  place.appendChild(el);
  await el.updateComplete;
  el.open();
  await settle(el);
  return el;
}

const dialogIn = (root: ShadowRoot) => root.querySelector('dialog');

/** A finger coming down on `target`; `lift` lets it go there, as a
 *  browser sends a touch's end to where it began. */
function press(target: Element): { lift: (cancelable?: boolean) => TouchEvent } {
  target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, composed: true }));
  return {
    lift(cancelable = true) {
      const e = new TouchEvent('touchend', { bubbles: true, cancelable, composed: true });
      target.dispatchEvent(e);
      return e;
    },
  };
}

/** The mouse events and click a browser makes for a tap, on `target`;
 *  says which were stopped. */
function tapLands(target: Element): boolean[] {
  return (['mousedown', 'mouseup', 'click'] as const).map((type) => {
    const e = new MouseEvent(type, { bubbles: true, cancelable: true, composed: true });
    target.dispatchEvent(e);
    return e.defaultPrevented;
  });
}

/** A control on the dashboard, counting what it hears of a tap. */
function pageControl(place: HTMLElement): { el: HTMLButtonElement; heard: string[] } {
  const el = document.createElement('button');
  const heard: string[] = [];
  for (const type of ['mousedown', 'mouseup', 'click']) {
    el.addEventListener(type, () => heard.push(type));
  }
  place.appendChild(el);
  return { el, heard };
}

async function openCardIn(place: HTMLElement): Promise<ComfortBandCard> {
  const card = document.createElement('comfort-band-card') as ComfortBandCard;
  card.setConfig({ type: 'custom:comfort-band-card', zone: 'gym' });
  card.hass = makeHass();
  place.appendChild(card);
  await card.updateComplete;
  card
    .shadowRoot!.querySelector('comfort-band-tile')!
    .dispatchEvent(new CustomEvent('comfort-band-tile-tap'));
  await settle(card);
  return card;
}

describe('#83 a finger on a dialog that closes by itself', () => {
  it('taps nothing once the dialog has left the page', async () => {
    const el = await openModalIn(holder());
    const finger = press(dialogIn(el.shadowRoot!)!.querySelector('.close')!);
    el.remove();
    await settle(el);
    expect(dialogIn(el.shadowRoot!)).toBeNull();
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  it('taps nothing once its card is hidden where it is', async () => {
    const card = await openCardIn(holder());
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    const finger = press(dialogIn(modal.shadowRoot!)!.querySelector('.close')!);
    card.getClientRects = () => ({ length: 0 }) as DOMRectList;
    for (const w of watches.filter((w) => w.targets.includes(card))) {
      w.callback([{ target: card } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    }
    // Let go before the dialog's `close` has even fired.
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  // As the History chart's drawing is: removed from the chart as it leaves,
  // so the touch's end no longer passes through the dialog.
  it('taps nothing when what it pressed was taken out of the dialog', async () => {
    const card = await openCardIn(holder());
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    const tab = dialogIn(modal.shadowRoot!)!.querySelector('comfort-band-now-tab')!;
    const drawing = document.createElement('div');
    tab.shadowRoot!.append(drawing);
    const finger = press(drawing);
    drawing.remove();
    card.remove();
    await settle(card);
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  // Its backdrop, on a screen where it floats.
  it('taps nothing when it pressed the dialog itself', async () => {
    const el = await openModalIn(holder());
    const finger = press(dialogIn(el.shadowRoot!)!);
    el.remove();
    await settle(el);
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  it('taps nothing when what it pressed keeps its touches to itself', async () => {
    const el = await openModalIn(holder());
    const close = dialogIn(el.shadowRoot!)!.querySelector('.close')!;
    close.addEventListener('touchstart', (e) => e.stopPropagation());
    const finger = press(close);
    el.remove();
    await settle(el);
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  // The dialog it began in: the room opened again (another finger on its
  // tile) is a new one, and opening it doesn't give the old touch a tap.
  it('taps nothing when its room is opened again before it is let go', async () => {
    const place = holder();
    const card = await openCardIn(place);
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    const finger = press(dialogIn(modal.shadowRoot!)!.querySelector('.close')!);
    card.remove();
    await settle(card);
    place.appendChild(card);
    card
      .shadowRoot!.querySelector('comfort-band-tile')!
      .dispatchEvent(new CustomEvent('comfort-band-tile-tap'));
    await settle(card);
    expect(dialogIn(modal.shadowRoot!)?.open).toBe(true);
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  // ✕ closes it on the click, which comes after the touch ends.
  it('taps as ever while the dialog is open', async () => {
    const el = await openModalIn(holder());
    const dialog = dialogIn(el.shadowRoot!)!;
    expect(press(dialog).lift().defaultPrevented).toBe(false);
    // A control inside a tab, in the tab's own shadow root.
    const inTab = document.createElement('button');
    dialog.querySelector('comfort-band-now-tab')!.shadowRoot!.append(inTab);
    expect(press(inTab).lift().defaultPrevented).toBe(false);
    expect(tapLands(inTab)).toEqual([false, false, false]);
    const close = dialog.querySelector('.close')!;
    expect(press(close).lift().defaultPrevented).toBe(false);
    expect(tapLands(close)).toEqual([false, false, false]);
    expect(dialog.open).toBe(false);
  });

  it('taps nothing after other taps in the dialog', async () => {
    const el = await openModalIn(holder());
    const schedule = dialogIn(el.shadowRoot!)!.querySelector('#cb-tab-schedule')!;
    press(schedule).lift();
    expect(tapLands(schedule)).toEqual([false, false, false]);
    const finger = press(dialogIn(el.shadowRoot!)!.querySelector('.close')!);
    el.remove();
    await settle(el);
    expect(finger.lift().defaultPrevented).toBe(true);
  });

  // A touch the browser has made a scroll can't be cancelled; asked to,
  // Chromium warns in the console.
  it("doesn't cancel a touch that can't be cancelled", async () => {
    const el = await openModalIn(holder());
    const close = dialogIn(el.shadowRoot!)!.querySelector('.close')!;
    press(close);
    el.remove();
    await settle(el);
    const e = new TouchEvent('touchend', { bubbles: true, cancelable: false, composed: true });
    const cancel = vi.spyOn(e, 'preventDefault');
    close.dispatchEvent(e);
    expect(cancel).not.toHaveBeenCalled();
  });

  // Cancelled, the tap makes no mouse events, so none is waited for: a
  // click on the dashboard without a press (from a key) lands.
  it('leaves the next tap, on the dashboard, alone', async () => {
    const page = holder();
    const el = await openModalIn(page);
    const finger = press(dialogIn(el.shadowRoot!)!.querySelector('.close')!);
    el.remove();
    await settle(el);
    expect(finger.lift().defaultPrevented).toBe(true);
    const other = pageControl(page);
    expect(press(other.el).lift().defaultPrevented).toBe(false);
    expect(tapLands(other.el)).toEqual([false, false, false]);
  });
});

// Chromium holds back HA's updates while a finger is down, and runs them as
// it's let go: an update hiding the card closes the dialog after the touch's
// end, before the tap's click.
describe('#83 a tap let go just before its dialog closes by itself', () => {
  async function letGoOnClose(place: HTMLElement): Promise<ComfortBandCard> {
    const card = await openCardIn(place);
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    expect(
      press(dialogIn(modal.shadowRoot!)!.querySelector('.close')!).lift().defaultPrevented,
    ).toBe(false);
    return card;
  }

  it('lands nowhere when its card leaves the page before the click', async () => {
    const place = holder();
    const card = await letGoOnClose(place);
    card.remove();
    const page = pageControl(place);
    // Not even heard by a listener on the window that came later.
    const later = vi.fn();
    window.addEventListener('click', later, true);
    try {
      expect(tapLands(page.el)).toEqual([true, true, true]);
    } finally {
      window.removeEventListener('click', later, true);
    }
    expect(page.heard).toEqual([]);
    expect(later).not.toHaveBeenCalled();
  });

  // Hidden, its card has no box; the dialog stays open until the card's
  // observer runs, at the next frame.
  it('lands nowhere when its card is hidden, before its dialog has closed', async () => {
    const place = holder();
    const card = await letGoOnClose(place);
    card.getClientRects = () => ({ length: 0 }) as DOMRectList;
    const page = pageControl(place);
    expect(tapLands(page.el)).toEqual([true, true, true]);
    expect(page.heard).toEqual([]);
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    expect(dialogIn(modal.shadowRoot!)?.open).toBe(true);
  });

  // Kept in the dialog it began in: another room's, opened in its place
  // (by an automation, say), isn't that.
  it("lands nowhere in another room's dialog", async () => {
    const place = holder();
    const card = await letGoOnClose(place);
    card.remove();
    const other = await openCardIn(place);
    const modal = other.shadowRoot!.querySelector('comfort-band-modal')!;
    const tab = dialogIn(modal.shadowRoot!)!.querySelector('#cb-tab-schedule')!;
    expect(tapLands(tab)).toEqual([true, true, true]);
    expect(tab.getAttribute('aria-selected')).toBe('false');
  });

  it('keeps nothing once its click has landed in the dialog', async () => {
    const place = holder();
    const el = await openModalIn(place);
    const schedule = dialogIn(el.shadowRoot!)!.querySelector('#cb-tab-schedule')!;
    press(schedule).lift();
    expect(tapLands(schedule)).toEqual([false, false, false]);
    expect(tapLands(pageControl(place).el)).toEqual([false, false, false]);
  });

  it('keeps nothing once its click has come', async () => {
    const place = holder();
    const card = await letGoOnClose(place);
    card.remove();
    const page = pageControl(place);
    expect(tapLands(page.el)).toEqual([true, true, true]);
    expect(tapLands(page.el)).toEqual([false, false, false]);
    expect(page.heard).toEqual(['mousedown', 'mouseup', 'click']);
  });

  it('keeps nothing once a new press comes', async () => {
    const place = holder();
    const card = await letGoOnClose(place);
    card.remove();
    const page = pageControl(place);
    // Even pressing a control that keeps its pointer to itself.
    page.el.addEventListener('pointerdown', (e) => e.stopPropagation());
    page.el.dispatchEvent(new Event('pointerdown', { bubbles: true, composed: true }));
    expect(tapLands(page.el)).toEqual([false, false, false]);
  });

  // Long enough for a tap a browser holds back to see if it's a double tap
  // (about 300 ms); short enough that a click from a key soon after lands.
  it('keeps nothing once its time is up', async () => {
    expect(TAP_WITHIN_MS).toBeGreaterThanOrEqual(300);
    expect(TAP_WITHIN_MS).toBeLessThanOrEqual(1000);
    const place = holder();
    const card = await openCardIn(place);
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    const finger = press(dialogIn(modal.shadowRoot!)!.querySelector('.close')!);
    vi.useFakeTimers();
    try {
      finger.lift();
      card.remove();
      const page = pageControl(place);
      vi.advanceTimersByTime(TAP_WITHIN_MS - 1);
      const down = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      page.el.dispatchEvent(down);
      expect(down.defaultPrevented).toBe(true);
      vi.advanceTimersByTime(1);
      expect(tapLands(page.el)).toEqual([false, false, false]);
    } finally {
      vi.useRealTimers();
    }
  });

  // No tap comes of a scroll.
  it('keeps nothing of a touch the browser made a scroll', async () => {
    const place = holder();
    const card = await openCardIn(place);
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    press(dialogIn(modal.shadowRoot!)!.querySelector('.close')!).lift(false);
    card.remove();
    const page = pageControl(place);
    expect(tapLands(page.el)).toEqual([false, false, false]);
  });
});
