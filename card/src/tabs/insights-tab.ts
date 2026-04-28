/**
 * `<comfort-band-insights-tab>` — Insights tab content.
 *
 * Renders `<comfort-band-history-chart>` (a custom uPlot chart that we
 * own) for room temperature, effective low band, effective high band,
 * and heating/cooling shading. v0.1 wrapped HA's built-in `history-graph`
 * but couldn't override the auto-assigned colours for `current_action`;
 * the custom chart fixes that with `idle = blank, heating = red,
 * cooling = blue`.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../history-chart.js';
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
    `,
  ];

  protected override render() {
    const room = this.entities?.roomTemperature;
    if (!room) {
      return html`<div class="empty">No room temperature sensor for this zone.</div>`;
    }
    return html`
      <comfort-band-history-chart
        .hass=${this.hass}
        .roomEntity=${room}
        .lowEntity=${this.entities?.effectiveLow ?? ''}
        .highEntity=${this.entities?.effectiveHigh ?? ''}
        .actionEntity=${this.entities?.currentAction ?? ''}
      ></comfort-band-history-chart>
      ${nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-insights-tab': ComfortBandInsightsTab;
  }
}
