/**
 * #83: a room's dialog closes by itself when its card leaves the page (#75)
 * or is hidden where it is (#82). A finger already on the dialog then, let
 * go, would tap whatever is now under it on the dashboard. The touch's end
 * still goes where the touch began, so the dialog cancels it: that finger
 * does nothing. Cancelled, a touch makes no click (nor the mouse events
 * a browser makes for a tap).
 *
 * jsdom has no `<dialog>` behaviour, no layout and no `ResizeObserver`, so
 * this file stands in for them as `modal-75.test.ts` and
 * `sections-hidden-82.test.ts` do.
 */

import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/comfort-band-card.js';
import type { ComfortBandCard } from '../src/comfort-band-card.js';
import type { ComfortBandModal } from '../src/modal.js';
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

/** A finger let go where it came down: on `target`. */
function touchEnd(target: EventTarget, cancelable = true): TouchEvent {
  const e = new TouchEvent('touchend', { bubbles: true, cancelable, composed: true });
  target.dispatchEvent(e);
  return e;
}

describe('#83 a finger on a dialog that closes by itself', () => {
  it('taps nothing once its card has left the page', async () => {
    const el = await openModalIn(holder());
    const pressed = dialogIn(el.shadowRoot!)!.querySelector('.close')!;
    el.remove();
    await settle(el);
    expect(dialogIn(el.shadowRoot!)).toBeNull();
    expect(touchEnd(pressed).defaultPrevented).toBe(true);
  });

  it('taps nothing once its card is hidden where it is', async () => {
    const card = document.createElement('comfort-band-card') as ComfortBandCard;
    card.setConfig({ type: 'custom:comfort-band-card', zone: 'gym' });
    card.hass = makeHass();
    holder().appendChild(card);
    await card.updateComplete;
    card
      .shadowRoot!.querySelector('comfort-band-tile')!
      .dispatchEvent(new CustomEvent('comfort-band-tile-tap'));
    await settle(card);
    const modal = card.shadowRoot!.querySelector('comfort-band-modal')!;
    const pressed = dialogIn(modal.shadowRoot!)!.querySelector('.close')!;
    card.getClientRects = () => ({ length: 0 }) as DOMRectList;
    for (const w of watches.filter((w) => w.targets.includes(card))) {
      w.callback([{ target: card } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    }
    // Let go before the dialog's `close` has even fired.
    expect(touchEnd(pressed).defaultPrevented).toBe(true);
  });

  // ✕ closes it on the click, which comes after the touch ends.
  it('taps as ever while the dialog is open', async () => {
    const el = await openModalIn(holder());
    const dialog = dialogIn(el.shadowRoot!)!;
    expect(touchEnd(dialog.querySelector('.close')!).defaultPrevented).toBe(false);
    expect(touchEnd(dialog).defaultPrevented).toBe(false);
  });

  // A touch the browser has made a scroll can't be cancelled; asked to,
  // Chromium warns in the console.
  it("doesn't cancel a touch that can't be cancelled", async () => {
    const el = await openModalIn(holder());
    const pressed = dialogIn(el.shadowRoot!)!.querySelector('.close')!;
    el.remove();
    await settle(el);
    const e = new TouchEvent('touchend', { bubbles: true, cancelable: false, composed: true });
    const cancel = vi.spyOn(e, 'preventDefault');
    pressed.dispatchEvent(e);
    expect(cancel).not.toHaveBeenCalled();
  });

  it('leaves the next tap, on the dashboard, alone', async () => {
    const page = holder();
    const el = await openModalIn(page);
    el.remove();
    await settle(el);
    const other = document.createElement('button');
    page.appendChild(other);
    expect(touchEnd(other).defaultPrevented).toBe(false);
  });
});
