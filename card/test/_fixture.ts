/**
 * Minimal Lit element fixture helpers for component tests.
 *
 * happy-dom + Lit don't need anything fancy — `createElement`, append, set
 * properties, await `updateComplete`. This file just dries up the boilerplate.
 */

import { vi } from 'vitest';
import type { HassConnection, UnsubscribeFunc } from '../src/types.js';

interface LitLike extends HTMLElement {
  updateComplete: Promise<boolean>;
}

export async function mount<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
): Promise<HTMLElementTagNameMap[K]> {
  const el = document.createElement(tag);
  Object.assign(el, props);
  document.body.appendChild(el);
  await (el as unknown as LitLike).updateComplete;
  return el;
}

export function teardown(): void {
  document.body.innerHTML = '';
}

/**
 * No-op `HassConnection` stub for tests that don't exercise subscriptions
 * but still need to satisfy the `HomeAssistant` type.
 */
export function stubConnection(): HassConnection {
  return {
    subscribeMessage: async () => () => {},
  };
}

/**
 * Controllable `HassConnection` factory for tests that exercise the v0.8.1+
 * `history/stream` subscription. Each call to `subscribeMessage` stores the
 * callback + the message payload so the test can later emit fake stream
 * events into the subscriber. Returns the recorded handles directly so
 * tests can assert on them.
 *
 * Usage:
 *   const sub = captureSubscription();
 *   const hass = makeHass(sub.connection);
 *   ... mount component ...
 *   sub.emit({ states: { 'sensor.x': [{ s: '21', lu: 100 }] } });
 *
 * Supports multiple concurrent subscribes (e.g. resubscribe-on-entity-change
 * paths). The most recent callback is the one `emit()` invokes; prior
 * subscribers' callbacks are still accessible via `subscriptions[i].callback`.
 */
export interface CapturedSubscription {
  callback: (event: unknown) => void;
  message: Record<string, unknown>;
  unsubscribe: ReturnType<typeof vi.fn<UnsubscribeFunc>>;
}

export interface SubscriptionCapture {
  connection: HassConnection;
  subscribeMessage: ReturnType<typeof vi.fn>;
  subscriptions: CapturedSubscription[];
  /** Emit an event to the LATEST subscriber's callback. */
  emit: (event: unknown) => void;
  /** Total subscribe calls (alias for `subscribeMessage.mock.calls.length`). */
  readonly callCount: number;
}

export function captureSubscription(): SubscriptionCapture {
  const subscriptions: CapturedSubscription[] = [];
  const subscribeMessage = vi.fn(
    async (cb: (event: unknown) => void, msg: Record<string, unknown>) => {
      const unsubscribe = vi.fn<UnsubscribeFunc>();
      subscriptions.push({ callback: cb, message: msg, unsubscribe });
      return unsubscribe;
    },
  );
  return {
    connection: { subscribeMessage } as unknown as HassConnection,
    subscribeMessage,
    subscriptions,
    emit: (event: unknown) => {
      const latest = subscriptions[subscriptions.length - 1];
      if (latest) latest.callback(event);
    },
    get callCount(): number {
      return subscribeMessage.mock.calls.length;
    },
  };
}
