/**
 * #75: a card leaving the page with its dialog open (HA's masonry view
 * re-columning as a phone turns, a visibility condition, another view)
 * would leave the dialog open but not modal: put back, sized from what
 * holds the card, with no backdrop and no Esc; hidden, back that way
 * whenever the card is. The dialog is closed as the card leaves; the tile
 * opens it again.
 *
 * jsdom has no `<dialog>` behaviour, so this file stands in for the
 * browser's: `showModal()` refuses an open dialog, `close()` fires `close`
 * later (as a task in WebKit; Chromium sends it with the next rendering
 * update), `:modal` is tracked, and the test does what the browser's
 * removing steps do (a modal dialog taken off the page stays open but stops
 * being modal).
 */

import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/modal.js';
import type { ComfortBandModal } from '../src/modal.js';
import type { ZoneEntities } from '../src/helpers.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection, teardown } from './_fixture.js';

const modal = new WeakMap<Element, boolean>();
const log: string[] = [];

beforeAll(() => {
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
    modal.set(this, true);
    log.push('showModal');
  };
  proto.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    modal.set(this, false);
    log.push('close');
    setTimeout(() => this.dispatchEvent(new Event('close')), 0);
  };
  const matches = Element.prototype.matches;
  proto.matches = function (this: HTMLDialogElement, selector: string) {
    return selector === ':modal' ? modal.get(this) === true : matches.call(this, selector);
  };
});

afterEach(() => {
  teardown();
  log.length = 0;
});

const entities = { deviceId: 'dev-gym', deviceName: 'gym' } as unknown as ZoneEntities;

function makeHass(): HomeAssistant {
  return {
    states: {},
    devices: {},
    entities: {},
    connection: stubConnection(),
    callService: vi.fn().mockResolvedValue(undefined),
    callWS: vi.fn().mockResolvedValue(undefined),
  };
}

/** Lets `close` fire, and Lit render. */
async function settle(el: ComfortBandModal): Promise<void> {
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
}

function makeIn(holder: HTMLElement): ComfortBandModal {
  const el = document.createElement('comfort-band-modal');
  Object.assign(el, { hass: makeHass(), zone: 'gym', zoneName: 'Gym', entities });
  holder.appendChild(el);
  return el;
}

async function openIn(holder: HTMLElement): Promise<ComfortBandModal> {
  const el = makeIn(holder);
  await el.updateComplete;
  el.open();
  await settle(el);
  return el;
}

const dialogOf = (el: ComfortBandModal) => el.shadowRoot!.querySelector('dialog');

/** Takes the card off the page as the browser does: a modal dialog stops
 *  being modal as it leaves. */
function takeOff(el: ComfortBandModal): void {
  const dialog = dialogOf(el);
  if (dialog) modal.set(dialog, false);
  el.remove();
}

function holders(): [HTMLElement, HTMLElement] {
  const a = document.createElement('div');
  const b = document.createElement('div');
  document.body.append(a, b);
  return [a, b];
}

describe('#75 a dialog whose card leaves the page', () => {
  it('is closed when its card moves in the page', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    el.selectTab('schedule');
    await el.updateComplete;
    const closed = vi.fn();
    el.addEventListener('comfort-band-modal-close', closed);
    takeOff(el);
    b.appendChild(el);
    await settle(el);
    expect(dialogOf(el)).toBeNull();
    expect(log).toEqual(['showModal', 'close']);
    expect(closed).toHaveBeenCalledTimes(1);
  });

  // A move in one step (HA's masonry view, reusing its columns, puts a card
  // already on the page before another): the card is back on the page by
  // the time it hears it left.
  it('is closed when its card moves in one step', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    modal.set(dialogOf(el)!, false);
    b.appendChild(el);
    expect(el.isConnected).toBe(true);
    await settle(el);
    expect(dialogOf(el)).toBeNull();
    expect(log).toEqual(['showModal', 'close']);
  });

  // Closed as it leaves, not as it comes back: left open off the page, it
  // would come back with the card, not modal, however much later.
  it('is closed as its card leaves, and stays closed when it’s back', async () => {
    const [a] = holders();
    const el = await openIn(a);
    takeOff(el);
    expect(log).toEqual(['showModal', 'close']);
    expect(dialogOf(el)!.open).toBe(false);
    await settle(el);
    a.appendChild(el);
    await settle(el);
    expect(dialogOf(el)).toBeNull();
    expect(log).toEqual(['showModal', 'close']);
  });

  // `open()` is what the room's tile calls.
  it('opens modal again once its card has moved, on Now', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    el.selectTab('advanced');
    await el.updateComplete;
    takeOff(el);
    b.appendChild(el);
    await settle(el);
    el.open();
    await settle(el);
    expect(dialogOf(el)!.matches(':modal')).toBe(true);
    expect(log).toEqual(['showModal', 'close', 'showModal']);
    const selected = el.shadowRoot!.querySelector('button[role="tab"][aria-selected="true"]');
    expect(selected?.textContent?.trim()).toBe('Now');
  });

  it('closes nothing when its card moves with the dialog closed', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    el.close();
    await settle(el);
    log.length = 0;
    const closed = vi.fn();
    el.addEventListener('comfort-band-modal-close', closed);
    takeOff(el);
    b.appendChild(el);
    await settle(el);
    expect(log).toEqual([]);
    expect(closed).not.toHaveBeenCalled();
  });

  it('leaves another room’s dialog open when a card with none moves', async () => {
    const [a, b] = holders();
    const roomA = await openIn(a);
    const roomB = makeIn(b);
    await roomB.updateComplete;
    takeOff(roomB);
    a.appendChild(roomB);
    await settle(roomB);
    expect(dialogOf(roomA)!.matches(':modal')).toBe(true);
    expect(log).toEqual(['showModal']);
  });

  it('still closes when closed', async () => {
    const [a] = holders();
    const el = await openIn(a);
    const closed = vi.fn();
    el.addEventListener('comfort-band-modal-close', closed);
    el.close();
    await settle(el);
    expect(dialogOf(el)).toBeNull();
    expect(closed).toHaveBeenCalledTimes(1);
  });
});
