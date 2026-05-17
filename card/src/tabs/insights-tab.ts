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

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../history-chart.js';
import '../apparent-chart.js';
import type { ZoneEntities } from '../helpers.js';
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
      .hint {
        margin-top: var(--cb-gap-lg);
        padding: var(--cb-gap-md);
        color: var(--cb-text-secondary);
        font-size: 12px;
        text-align: center;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
    `,
  ];

  protected override render() {
    const room = this.entities?.roomTemperature;
    if (!room) {
      return html`<div class="empty">No room temperature sensor for this zone.</div>`;
    }

    const apparent = this.entities?.apparentTemperature;
    const humidity =
      (this.hass?.states[room]?.attributes.humidity_sensor as string | null | undefined) ?? null;
    const showApparentChart = Boolean(apparent && humidity);

    return html`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${room}
        .lowEntity=${this.entities?.effectiveLow ?? ''}
        .highEntity=${this.entities?.effectiveHigh ?? ''}
        .actionEntity=${this.entities?.currentAction ?? ''}
      ></comfort-band-history-chart>
      ${showApparentChart
        ? html`<comfort-band-apparent-chart
            .hass=${this.hass}
            .roomEntity=${room}
            .apparentEntity=${apparent ?? ''}
            .humidityEntity=${humidity ?? ''}
          ></comfort-band-apparent-chart>`
        : html`<div class="hint">
            Configure a humidity sensor in the Settings tab to see how apparent temperature diverges
            from the raw reading.
          </div>`}
      ${nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-insights-tab': ComfortBandInsightsTab;
  }
}
