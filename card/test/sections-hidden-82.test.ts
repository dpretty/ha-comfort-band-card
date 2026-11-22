/**
 * #82: HA's sections view can hide a card where it is, with `display: none`
 * on what holds it. A dialog open from the card then has no box, and being
 * modal it leaves the page inert. The card watches its size and closes its
 * dialog when it's no longer drawn.
 *
 * jsdom has no layout, no `ResizeObserver` and no `<dialog>` behaviour. This
 * file stands in for them: the observer hands the card's callback to the
 * test, the test says whether the card is drawn by its client rects (none
 * under `display: none`, in Chromium and WebKit), and the dialog's
 * `showModal()`, `close()` and `close` event behave as a browser's.
 */

import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import '../src/comfort-band-card.js';
import type { ComfortBandCard } from '../src/comfort-band-card.js';
import type { HomeAssistant } from '../src/types.js';
import { stubConnection, teardown } from './_fixture.js';

const log: string[] = [];

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
    log.push('showModal');
  };
  proto.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    log.push('close');
    setTimeout(() => this.dispatchEvent(new Event('close')), 0);
  };
});

afterAll(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  teardown();
  log.length = 0;
  watches.length = 0;
});

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

async function settle(card: ComfortBandCard): Promise<void> {
  await new Promise((r) => setTimeout(r, 0));
  await card.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
}

async function cardIn(holder: HTMLElement, compact = false): Promise<ComfortBandCard> {
  const card = document.createElement('comfort-band-card');
  card.setConfig({ type: 'custom:comfort-band-card', zone: 'gym', compact });
  card.hass = makeHass();
  holder.appendChild(card);
  await card.updateComplete;
  return card;
}

const modalOf = (card: ComfortBandCard) => card.shadowRoot!.querySelector('comfort-band-modal');
const dialogOf = (card: ComfortBandCard) => modalOf(card)?.shadowRoot!.querySelector('dialog');

async function tapTile(card: ComfortBandCard): Promise<void> {
  card
    .shadowRoot!.querySelector('comfort-band-tile')!
    .dispatchEvent(new CustomEvent('comfort-band-tile-tap'));
  await settle(card);
}

/** Says whether the card is drawn, as its client rects do in a browser. */
function drawn(card: ComfortBandCard, yes: boolean): void {
  card.getClientRects = () => ({ length: yes ? 1 : 0 }) as DOMRectList;
}

/** Runs the card's observer, as a browser does when the card's size changes. */
function sizeChanges(card: ComfortBandCard): void {
  for (const watch of watches) {
    if (!watch.targets.includes(card)) continue;
    const entry = { target: card } as unknown as ResizeObserverEntry;
    watch.callback([entry], {} as ResizeObserver);
  }
}

function holder(): HTMLElement {
  const div = document.createElement('div');
  document.body.append(div);
  return div;
}

describe('#82 a dialog whose card is hidden where it is', () => {
  it('is closed when its card stops being drawn', async () => {
    const card = await cardIn(holder());
    await tapTile(card);
    expect(dialogOf(card)?.open).toBe(true);
    const closed = vi.fn();
    card.addEventListener('comfort-band-modal-close', closed);
    drawn(card, false);
    sizeChanges(card);
    expect(log).toEqual(['showModal', 'close']);
    await settle(card);
    expect(dialogOf(card)).toBeNull();
    expect(closed).toHaveBeenCalledTimes(1);
  });

  // Resized (a phone turned, a column narrowed), still drawn.
  it('stays open when its card changes size and is still drawn', async () => {
    const card = await cardIn(holder());
    await tapTile(card);
    drawn(card, true);
    sizeChanges(card);
    await settle(card);
    expect(dialogOf(card)?.open).toBe(true);
    expect(log).toEqual(['showModal']);
  });

  it('opens again from its tile once its card is drawn again', async () => {
    const card = await cardIn(holder());
    await tapTile(card);
    drawn(card, false);
    sizeChanges(card);
    await settle(card);
    drawn(card, true);
    sizeChanges(card);
    await tapTile(card);
    expect(dialogOf(card)?.open).toBe(true);
    expect(log).toEqual(['showModal', 'close', 'showModal']);
  });

  it('closes nothing when its card stops being drawn with no dialog open', async () => {
    const card = await cardIn(holder());
    drawn(card, false);
    sizeChanges(card);
    await settle(card);
    expect(log).toEqual([]);
  });

  // Watched all the same: HA hands a card a new config in place, and a
  // compact card made full opens a dialog.
  it('watches a compact card, which has nothing to close yet', async () => {
    const card = await cardIn(holder(), true);
    expect(modalOf(card)).toBeNull();
    expect(watches.filter((w) => w.targets.includes(card))).toHaveLength(1);
    drawn(card, false);
    expect(() => sizeChanges(card)).not.toThrow();
  });

  // The observer watches the card's box; an inline one never reports a
  // change in size, so hidden in place it would never be heard.
  it('is a block, so its box is what gets watched', async () => {
    const card = await cardIn(holder());
    const styles = (card.constructor as typeof ComfortBandCard).styles as { cssText: string }[];
    const css = styles.map((s) => s.cssText).join('\n');
    const displays = [...css.matchAll(/:host\s*\{([^}]*)\}/g)]
      .map((rule) => rule[1].match(/display:\s*([\w-]+)/)?.[1])
      .filter(Boolean);
    expect(displays).toEqual(['block']);
  });

  it('watches its size only while on the page', async () => {
    const place = holder();
    const card = await cardIn(place);
    const watching = () => watches.filter((w) => w.targets.includes(card)).length;
    expect(watching()).toBe(1);
    card.remove();
    expect(watching()).toBe(0);
    place.appendChild(card);
    expect(watching()).toBe(1);
  });
});
