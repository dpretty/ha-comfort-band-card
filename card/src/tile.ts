/**
 * `<comfort-band-tile>` — compact tile.
 *
 * Composed of zone display name + prominent temperature (the one that drives
 * control) + horizontal `<band-gauge>` + the Now tab's status sentence with
 * its icon. The `mini` variant is the number alone, with an icon in front
 * for anything notable. Tap fires `comfort-band-tile-tap`; the parent card
 * opens the modal in response.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './band-gauge.js';
import type { ComfortBandCardVariant } from './types.js';
import type { StatusKind } from './now-status.js';
import { type Badge, BADGE_ICONS, STATUS_ICONS } from './room-status.js';
import { tokens, actionColorVar } from './styles.js';

@customElement('comfort-band-tile')
export class ComfortBandTile extends LitElement {
  @property({ type: String }) public zoneName = '';
  /** The temperature that drives control. */
  @property({ type: Number }) public temperature = NaN;
  /** Whether `temperature` is "feels like", for the gauge's label. */
  @property({ type: Boolean }) public feelsLike = false;
  @property({ type: Number }) public low = NaN;
  @property({ type: Number }) public high = NaN;
  /** Colours the gauge; `unknown` while the room isn't being controlled. */
  @property({ type: String }) public action: string | null = 'unknown';
  @property({ type: String }) public statusKind: StatusKind = 'none';
  /** The Now tab's status sentence. */
  @property({ type: String }) public statusText = '';
  /** The mini chip's icons, most urgent first; none for a comfortable room. */
  @property({ attribute: false }) public badges: Badge[] = [];
  /** Disable the tap-to-expand affordance. Used for compact embeds. */
  @property({ type: Boolean }) public noExpand = false;
  /** Visual variant. `mini` renders a content-sized chip: the temperature,
   *  with an icon in front for anything notable. */
  @property({ type: String, reflect: true }) public variant: ComfortBandCardVariant = 'tile';

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      :host([variant='mini']) {
        display: inline-block;
      }
      .tile {
        display: flex;
        flex-direction: column;
        gap: var(--cb-gap-sm);
        padding: var(--cb-gap-md);
        border-radius: var(--cb-radius-card);
        background: var(--ha-card-background, var(--card-background-color, #ffffff));
        box-shadow: var(--ha-card-box-shadow, none);
        cursor: pointer;
        transition: transform 0.12s ease;
      }
      .tile.no-expand {
        cursor: default;
      }
      .tile:not(.no-expand):hover {
        transform: translateY(-1px);
      }
      .tile:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .mini {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: 4px 10px;
        border-radius: var(--cb-radius-pill);
        background: var(
          --cb-mini-bg,
          var(--ha-card-background, var(--card-background-color, #ffffff))
        );
        color: var(--cb-mini-fg, var(--cb-text-primary));
        box-shadow: var(--ha-card-box-shadow, none);
        font-size: 18px;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.12s ease;
      }
      .mini.no-expand {
        cursor: default;
      }
      /* WCAG 2.5.5: a touch target at least 44px each way, without making
         the chip any bigger on the floorplan. Only for a chip that opens:
         a compact one would just take taps from what's around it. */
      .mini:not(.no-expand)::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: max(100%, 44px);
        height: max(100%, 44px);
        transform: translate(-50%, -50%);
      }
      .mini ha-icon {
        --mdc-icon-size: 16px;
      }
      .mini.tinted {
        --cb-mini-fg: var(--cb-text-on-action, #ffffff);
      }
      .mini:not(.no-expand):hover {
        transform: translateY(-1px);
      }
      .mini:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--cb-gap-sm);
      }
      .zone-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--cb-text-primary);
        font-family: var(--paper-font-body1_-_font-family, sans-serif);
      }
      .body {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-md);
      }
      .room-temp {
        font-size: 32px;
        font-weight: 300;
        color: var(--cb-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1;
        min-width: 70px;
      }
      .gauge-wrap {
        flex: 1;
        min-width: 0;
      }
      .status {
        display: flex;
        align-items: center;
        gap: var(--cb-gap-xs);
        font-size: 13px;
        color: var(--cb-text-primary);
      }
      .status ha-icon {
        --mdc-icon-size: 18px;
        flex: none;
        color: var(--cb-text-secondary);
      }
      .status.heating ha-icon {
        color: var(--cb-action-heating);
      }
      .status.cooling ha-icon {
        color: var(--cb-action-cooling);
      }
      .status.sensor ha-icon {
        color: var(--warning-color, #ffa600);
      }
    `,
  ];

  private _onTap(event: MouseEvent | KeyboardEvent) {
    if (this.noExpand) return;
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('comfort-band-tile-tap', { bubbles: true, composed: true }));
  }

  private _renderTemperature(): string {
    return Number.isFinite(this.temperature) ? `${this.temperature.toFixed(1)}°` : '—';
  }

  protected override render() {
    if (this.variant === 'mini') return this._renderMini();
    return html`
      <div
        class="tile ${this.noExpand ? 'no-expand' : ''}"
        role="${this.noExpand ? 'group' : 'button'}"
        tabindex="${this.noExpand ? -1 : 0}"
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        <div class="header">
          <div class="zone-name">${this.zoneName || '—'}</div>
        </div>
        <div class="body">
          <div class="room-temp">${this._renderTemperature()}</div>
          <div class="gauge-wrap">
            <band-gauge
              .low=${this.low}
              .high=${this.high}
              .room=${this.temperature}
              .roomLabel=${this.feelsLike ? 'feels like' : 'room'}
              .action=${this.action}
            ></band-gauge>
          </div>
        </div>
        ${this.statusText
          ? html`<div class="status ${this.statusKind}">
              <ha-icon icon=${STATUS_ICONS[this.statusKind]} aria-hidden="true"></ha-icon>
              <span>${this.statusText}</span>
            </div>`
          : null}
      </div>
    `;
  }

  private _renderMini() {
    // The tint repeats what the heating or cooling icon already says.
    const tint = this.badges.includes('heating')
      ? 'heating'
      : this.badges.includes('cooling')
        ? 'cooling'
        : null;
    const style = tint ? `--cb-mini-bg:${actionColorVar(tint)}` : '';
    const name = `${this.zoneName || 'Zone'} ${this._renderTemperature()}`;
    const label = this.statusText ? `${name}. ${this.statusText}` : name;
    return html`
      <div
        class="mini ${this.noExpand ? 'no-expand' : ''} ${tint ? 'tinted' : ''}"
        style=${style}
        role="${this.noExpand ? 'group' : 'button'}"
        tabindex="${this.noExpand ? -1 : 0}"
        aria-label=${label}
        title=${label}
        @click=${this._onTap}
        @keydown=${this._onTap}
      >
        ${this.badges.map(
          (badge) =>
            html`<ha-icon
              icon=${BADGE_ICONS[badge]}
              data-badge=${badge}
              aria-hidden="true"
            ></ha-icon>`,
        )}
        <span class="value">${this._renderTemperature()}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-tile': ComfortBandTile;
  }
}
