/**
 * Minimal Lit element fixture helpers for component tests.
 *
 * happy-dom + Lit don't need anything fancy — `createElement`, append, set
 * properties, await `updateComplete`. This file just dries up the boilerplate.
 */

import type { HassConnection } from '../src/types.js';

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
