/**
 * #75: a card moved in the page with its dialog open (HA's masonry view
 * re-columning, a visibility condition) leaves the dialog open but not
 * modal. Back on the page, it's shown modal again, on the tab it was on.
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

async function openIn(holder: HTMLElement): Promise<ComfortBandModal> {
  const el = document.createElement('comfort-band-modal');
  Object.assign(el, { hass: makeHass(), zone: 'gym', zoneName: 'Gym', entities });
  holder.appendChild(el);
  await el.updateComplete;
  el.open();
  await settle(el);
  return el;
}

const dialogOf = (el: ComfortBandModal) => el.shadowRoot!.querySelector('dialog');

/** Moves the card as a re-columning view does: the browser makes the dialog
 *  stop being modal as it leaves the page. */
async function move(el: ComfortBandModal, to: HTMLElement): Promise<void> {
  const dialog = dialogOf(el);
  if (dialog) modal.set(dialog, false);
  to.appendChild(el);
  await settle(el);
}

function holders(): [HTMLElement, HTMLElement] {
  const a = document.createElement('div');
  const b = document.createElement('div');
  document.body.append(a, b);
  return [a, b];
}

describe('#75 a dialog left open as its card moves', () => {
  it('is shown modal again once its card is back on the page', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    expect(log).toEqual(['showModal']);
    await move(el, b);
    const dialog = dialogOf(el);
    expect(dialog).not.toBeNull();
    expect(dialog!.matches(':modal')).toBe(true);
    expect(log).toEqual(['showModal', 'close', 'showModal']);
  });

  it('stays open through the close on its way back, on the tab it was on', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    el.selectTab('advanced');
    await el.updateComplete;
    const closed = vi.fn();
    el.addEventListener('comfort-band-modal-close', closed);
    await move(el, b);
    expect(dialogOf(el)).not.toBeNull();
    expect(closed).not.toHaveBeenCalled();
    const selected = el.shadowRoot!.querySelector('button[role="tab"][aria-selected="true"]');
    expect(selected?.textContent?.trim()).toBe('Advanced');
  });

  // Before #75, `showModal()` threw on a dialog open but not modal: the tile
  // did nothing, and only the dialog's ✕ closed it, where that could be
  // reached.
  it('opens modal from its tile while open but not modal', async () => {
    const [a] = holders();
    const el = await openIn(a);
    modal.set(dialogOf(el)!, false);
    expect(() => el.open()).not.toThrow();
    await settle(el);
    expect(dialogOf(el)!.matches(':modal')).toBe(true);
  });

  // Within the task: a frame painted between the move and the re-show would
  // show the dialog sized from what holds the card.
  it('is shown modal again before the next task', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    modal.set(dialogOf(el)!, false);
    b.appendChild(el);
    await el.updateComplete;
    await Promise.resolve();
    expect(dialogOf(el)!.matches(':modal')).toBe(true);
  });

  // Chrome before 105 and Safari before 15.6 have <dialog> but can't parse
  // `:modal`: there the dialog is taken as not modal, so shown modal again.
  it('shows it modal again where the engine can’t tell whether it is', async () => {
    const proto = window.HTMLDialogElement.prototype as HTMLDialogElement;
    const tracked = proto.matches;
    proto.matches = function (this: HTMLDialogElement, selector: string) {
      if (selector === ':modal') throw new SyntaxError("':modal' is not a valid selector");
      return tracked.call(this, selector);
    };
    try {
      const [a, b] = holders();
      const el = await openIn(a);
      await move(el, b);
      expect(log).toEqual(['showModal', 'close', 'showModal']);
      expect(dialogOf(el)).not.toBeNull();
    } finally {
      proto.matches = tracked;
    }
  });

  it('leaves a modal dialog as it is when opened again', async () => {
    const [a] = holders();
    const el = await openIn(a);
    el.open();
    await settle(el);
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

  it('shows nothing for a closed dialog whose card moves', async () => {
    const [a, b] = holders();
    const el = await openIn(a);
    el.close();
    await settle(el);
    log.length = 0;
    await move(el, b);
    expect(dialogOf(el)).toBeNull();
    expect(log).toEqual([]);
  });

  it('shows nothing while its card is off the page', async () => {
    const [a] = holders();
    const el = await openIn(a);
    modal.set(dialogOf(el)!, false);
    el.remove();
    log.length = 0;
    el.open();
    await new Promise((r) => setTimeout(r, 0));
    expect(log).toEqual([]);
  });
});
