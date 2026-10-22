/**
 * `<comfort-band-insights-tab>` — Insights tab content.
 *
 * Renders the unified `<comfort-band-history-chart>`: room temperature,
 * effective low/high band edges (linear, so v0.10.0 backend band-ramp
 * smoothing displays as the smooth curve it actually is — for non-ramp
 * zones the values are constant between transitions so the rendering
 * is visually equivalent to stepped), heating/cooling shading,
 * plus an optional apparent-temperature overlay AND optional humidity
 * overlay on a right-side y2 axis. v0.8.2 folded the separate
 * `<comfort-band-apparent-chart>` into the unified chart — stacking
 * them made it hard to read whether apparent crossed a band while raw
 * stayed inside.
 *
 * Pedagogical hint banners still show beneath the chart when apparent
 * (pre-v0.4 backend) or humidity (sensor not configured) are missing —
 * these point users to the action that unlocks the overlay, and would
 * just be lost if the chart silently skipped the series.
 *
 * The humidity sensor entity_id isn't a first-class `ZoneEntities`
 * field — the backend exposes it as a `humidity_sensor` attribute on
 * `RoomTemperatureSensor`, so we read it from there. Same path the
 * Settings tab uses.
 */

import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../history-chart.js';
import { readHumiditySensor, type ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';

@customElement('comfort-band-insights-tab')
export class ComfortBandInsightsTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public entities?: ZoneEntities;

  public static override styles = [
    tokens,
    css`
      /* Inside the Advanced tab's section, which does the padding. */
      :host {
        display: block;
      }
      .empty {
        padding: var(--cb-gap-lg);
        color: var(--cb-text-secondary);
        font-size: 13px;
        text-align: center;
      }
      /* Deliberately .hint (not .upgrade-hint like settings-tab /
         profiles-tab use): this banner covers two semantically distinct
         cases — "upgrade integration" AND "configure humidity sensor".
         The latter is a configuration nudge, not an upgrade gate, so
         the more general name is the right call. Also visually
         different: the Insights tab uses a top border to separate the
         hint from the band chart sitting above it. */
      .hint {
        margin-top: var(--cb-gap-lg);
        padding: var(--cb-gap-md);
        color: var(--cb-text-secondary);
        font-size: 12px;
        text-align: center;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      .hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
    `,
  ];

  protected override render() {
    const room = this.entities?.roomTemperature;
    if (!room) {
      return html`<div class="empty">No room temperature sensor for this zone.</div>`;
    }

    const apparent = this.entities?.apparentTemperature;
    const humidity = readHumiditySensor(this.hass, room);

    // Chart always renders (we have a room sensor). Apparent + humidity
    // are wired in only when BOTH are available — humidity alone
    // (without apparent) would render a bare grey trace on a 0-100 %
    // axis with no temperature context, contradicting the
    // pedagogical hint banner below ("upgrade to overlay apparent").
    // Pre-v0.4 backend: no apparent → no humidity, only base chart.
    // Apparent present but humidity sensor unconfigured: apparent
    // overlay only, no humidity. Both present: both overlays.
    const apparentEntity = apparent ?? '';
    const humidityEntity = apparent && humidity ? humidity : '';
    return html`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${room}
        .lowEntity=${this.entities?.effectiveLow ?? ''}
        .highEntity=${this.entities?.effectiveHigh ?? ''}
        .actionEntity=${this.entities?.currentAction ?? ''}
        .apparentEntity=${apparentEntity}
        .humidityEntity=${humidityEntity}
      ></comfort-band-history-chart>
      ${this._renderOverlayHint(apparent, humidity)}
    `;
  }

  /** Hint banner shown when one of the optional overlays can't render.
   *  Covers both the apparent-missing and humidity-missing cases (was
   *  `_renderApparentSection` pre-v0.8.2, which chose between rendering
   *  the standalone apparent chart OR a hint; the v0.8.2 merge removed
   *  the chart branch and renamed accordingly). Priority order: apparent
   *  missing first (pre-v0.4 backend — pointing at Settings would chain
   *  to a second upgrade hint), then humidity (configurable via Settings
   *  → OptionsFlow). Both present → no hint. */
  private _renderOverlayHint(
    apparent: string | null | undefined,
    humidity: string | null,
  ): TemplateResult | typeof nothing {
    if (!apparent) {
      return html`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to overlay apparent
        temperature on the chart.
      </div>`;
    }
    if (!humidity) {
      // Apparent IS already on the chart at this point (the gate
      // above passed) — the hint adds humidity to the picture, not
      // both at once.
      return html`<div class="hint">
        Set up a humidity sensor under Settings → Devices &amp; Services → Comfort Band → Configure
        to add humidity to the chart.
      </div>`;
    }
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-insights-tab': ComfortBandInsightsTab;
  }
}
