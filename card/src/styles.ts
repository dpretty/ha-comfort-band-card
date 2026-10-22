/**
 * Shared CSS tokens for the Comfort Band card.
 *
 * Action colours follow the convention used elsewhere in HA: red for
 * heating, blue for cooling, neutral grey for idle, light grey for unknown.
 * Falls back to HA theme variables so themes can override.
 *
 * v0.9.1: text + surface fallbacks use the CSS `light-dark()` function so
 * the card stays readable in HA dark themes even when the HA theme
 * variables (`--primary-text-color`, etc.) don't propagate into the
 * top-layer `<dialog>` element's CSS context. The `:host`-level
 * `color-scheme: light dark` is what tells the browser which side of
 * `light-dark(...)` to pick. When HA's variables ARE set (typical case),
 * the `var(--ha-token, light-dark(...))` short-circuits to the HA value
 * and no behaviour changes. The fallback only activates when the HA
 * token is unset OR doesn't inherit.
 *
 * Browser support: Chrome 123+, Firefox 120+, Safari 17.5+ (all April-May
 * 2024). On older browsers, `light-dark()` is invalid-at-computed-value-time,
 * so `--cb-text-primary` substitutes the literal `light-dark(...)` string
 * when HA's `--primary-text-color` isn't set, and any `color:` consumer
 * falls to the property's initial value (`canvastext`, ~black/white per
 * `color-scheme`). In the typical case (HA's variable IS set) the chain
 * short-circuits and the older-browser path never runs.
 *
 * Programmatic readers (`_resolveColor` in chart-base.ts) bypass the
 * cb-* tokens and read the raw HA tokens directly, because
 * `getComputedStyle().getPropertyValue('--cb-text-primary')` returns the
 * substituted-but-unresolved `light-dark(...)` string — canvas APIs
 * can't parse that.
 */

import { css } from 'lit';
import type { ComfortBandAction } from './types.js';

export const tokens = css`
  :host {
    color-scheme: light dark;

    --cb-action-heating: var(--cb-color-heat, var(--state-climate-heat-color, #d9603f));
    --cb-action-cooling: var(--cb-color-cool, var(--state-climate-cool-color, #2f7fcc));
    --cb-action-idle: var(--cb-color-idle, var(--state-inactive-color, #888888));
    --cb-action-unknown: var(--cb-color-unknown, var(--disabled-color, #bdbdbd));

    --cb-track-bg: var(--divider-color, light-dark(#e0e0e0, #3a3a3a));
    --cb-text-primary: var(--primary-text-color, light-dark(#212121, #ffffff));
    --cb-text-secondary: var(--secondary-text-color, light-dark(#727272, #b3b3b3));

    --cb-radius-card: 12px;
    --cb-radius-pill: 999px;
    --cb-gap-xs: 4px;
    --cb-gap-sm: 8px;
    --cb-gap-md: 12px;
    --cb-gap-lg: 16px;
  }
`;

/** Maps an action string to its CSS custom-property reference. */
export function actionColorVar(action: ComfortBandAction | string | null | undefined): string {
  switch (action) {
    case 'heating':
      return 'var(--cb-action-heating)';
    case 'cooling':
      return 'var(--cb-action-cooling)';
    case 'idle':
      return 'var(--cb-action-idle)';
    default:
      return 'var(--cb-action-unknown)';
  }
}

/** Coerce any string to a known action, falling back to 'unknown'. */
export function asAction(value: unknown): ComfortBandAction {
  if (value === 'heating' || value === 'cooling' || value === 'idle') return value;
  return 'unknown';
}
