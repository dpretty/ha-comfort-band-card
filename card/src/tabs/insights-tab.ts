/**
 * `<comfort-band-insights-tab>` — Insights tab content.
 *
 * Renders two stacked charts:
 *   - `<comfort-band-history-chart>` — room temperature, effective band
 *     edges, and heating/cooling shading. Always rendered when a room
 *     temperature sensor exists.
 *   - `<comfort-band-apparent-chart>` — room vs apparent temperature
 *     with humidity overlay. Rendered only when the zone has a humidity
 *     sensor configured (otherwise apparent equals room by design and
 *     the comparison is uninformative).
 *
 * The humidity sensor entity_id isn't a first-class `ZoneEntities`
 * field — the backend exposes it as a `humidity_sensor` attribute on
 * `RoomTemperatureSensor`, so we read it from there. Same path the
 * Settings tab uses.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../history-chart.js';
import '../apparent-chart.js';
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
      :host {
        display: block;
        padding: var(--cb-gap-md);
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

    return html`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${room}
        .lowEntity=${this.entities?.effectiveLow ?? ''}
        .highEntity=${this.entities?.effectiveHigh ?? ''}
        .actionEntity=${this.entities?.currentAction ?? ''}
      ></comfort-band-history-chart>
      ${this._renderApparentSection(room, apparent, humidity)}
    `;
  }

  /** Three states, in priority order:
   *  1. apparent entity missing — pre-v0.4 backend, can't render the chart at all
   *     and pointing at Settings would just chain to another upgrade hint
   *  2. humidity sensor unconfigured — the integration supports it, user just
   *     needs to attach one via the OptionsFlow surfaced in the Settings tab
   *  3. both present — render the chart */
  private _renderApparentSection(
    room: string,
    apparent: string | null | undefined,
    humidity: string | null,
  ) {
    if (!apparent) {
      return html`<div class="hint">
        Upgrade the <code>comfort_band</code> integration to v0.4.0 or later to see how apparent
        temperature diverges from the raw reading.
      </div>`;
    }
    if (!humidity) {
      return html`<div class="hint">
        Configure a humidity sensor in the Settings tab to see how apparent temperature diverges
        from the raw reading.
      </div>`;
    }
    return html`<comfort-band-apparent-chart
      .hass=${this.hass}
      .roomEntity=${room}
      .apparentEntity=${apparent}
      .humidityEntity=${humidity}
    ></comfort-band-apparent-chart>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-insights-tab': ComfortBandInsightsTab;
  }
}
