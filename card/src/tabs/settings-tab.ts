/**
 * `<comfort-band-settings-tab>` — Settings tab content.
 *
 * Thin per-zone affordance for the two behaviour switches that v0.4
 * introduced (learning_enabled, use_apparent_temperature) and a read-only
 * view of the optional humidity sensor. NOT trying to duplicate HA's
 * Device card — every existing tunable (deadband, override hours, etc.)
 * stays on the Device card where it already lives.
 *
 * Optimistic UI: each toggle flips local state immediately, awaits the
 * service call, and rolls back on rejection. Matches the schedule-tab
 * `_writeSchedule` pattern.
 *
 * Graceful degradation: when the new entities don't exist (pre-v0.4
 * integration), the tab renders an upgrade hint instead — mirrors the
 * Profiles-tab `crudAvailable` gate.
 */

import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ZoneEntities } from '../helpers.js';
import type { HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';

@customElement('comfort-band-settings-tab')
export class ComfortBandSettingsTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public zone = '';
  @property({ attribute: false }) public entities?: ZoneEntities;

  /** Optimistic state for the two switches, keyed by entity_id. Cleared
   *  on success; rolled back on failure with `_error` set. */
  @state() private _pendingByEntity: Record<string, boolean | null> = {};
  @state() private _error: string | null = null;

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
        padding: var(--cb-gap-md);
      }
      .row {
        display: flex;
        align-items: flex-start;
        gap: var(--cb-gap-md);
        padding: var(--cb-gap-sm) 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .row:last-of-type {
        border-bottom: none;
      }
      .row-label {
        flex: 1;
        min-width: 0;
      }
      .row-label .title {
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      .row-label .desc {
        margin-top: 4px;
        font-size: 12px;
        color: var(--cb-text-secondary);
        line-height: 1.35;
      }
      /* WCAG 2.5.5: 44x44 minimum tap target on the toggle. */
      .toggle {
        position: relative;
        flex: 0 0 auto;
        width: 52px;
        min-height: 44px;
        padding: 0;
        border: none;
        border-radius: var(--cb-radius-pill);
        background: var(--cb-track-bg);
        cursor: pointer;
      }
      .toggle:hover:not([aria-disabled='true']) {
        filter: brightness(0.92);
      }
      .toggle:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .toggle[aria-checked='true'] {
        background: var(--cb-accent, var(--primary-color, #03a9f4));
      }
      .toggle .knob {
        position: absolute;
        top: 50%;
        left: 4px;
        width: 24px;
        height: 24px;
        margin-top: -12px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: left 0.15s ease;
      }
      .toggle[aria-checked='true'] .knob {
        left: 24px;
      }
      .toggle[aria-disabled='true'] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .info-value {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 12px;
        color: var(--cb-text-primary);
        word-break: break-all;
      }
      .info-value.unconfigured {
        font-style: italic;
        color: var(--cb-text-secondary);
        font-family: inherit;
      }
      .error {
        margin-bottom: var(--cb-gap-sm);
        padding: 8px 12px;
        border-radius: 6px;
        background: rgba(183, 28, 28, 0.1);
        color: var(--error-color, #b71c1c);
        font-size: 12px;
      }
      .upgrade-hint {
        margin-top: var(--cb-gap-md);
        font-size: 12px;
        color: var(--cb-text-secondary);
        text-align: center;
      }
      .upgrade-hint code {
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 11px;
      }
    `,
  ];

  /** Resolve the displayed state: optimistic flip wins if one is in flight,
   *  otherwise read the entity. */
  private _isOn(entityId: string): boolean {
    const pending = this._pendingByEntity[entityId];
    if (pending !== undefined && pending !== null) return pending;
    return this.hass?.states[entityId]?.state === 'on';
  }

  private _onToggle = async (entityId: string): Promise<void> => {
    if (!this.hass) return;
    const target = !this._isOn(entityId);
    // Optimistic flip. The HA state push that follows a successful
    // callService arrives via the entity-state subscription, so we drop
    // the pending value in `finally` — on success the next render reads
    // the real value, on failure we already rolled back.
    this._pendingByEntity = { ...this._pendingByEntity, [entityId]: target };
    this._error = null;
    try {
      await this.hass.callService('switch', target ? 'turn_on' : 'turn_off', {
        entity_id: entityId,
      });
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to toggle switch.';
    } finally {
      const next = { ...this._pendingByEntity };
      delete next[entityId];
      this._pendingByEntity = next;
    }
  };

  protected override render() {
    if (!this.hass || !this.entities) return nothing;

    const useApparent = this.entities.useApparentTemperature;
    const learning = this.entities.learningEnabled;
    // Feature gate: if EITHER switch is missing the integration is
    // either pre-v0.4 or partially set up. Render the upgrade hint
    // rather than half a tab — defensive against a future split where
    // only one of the two entities exists.
    if (useApparent === null || learning === null) {
      return html`<div class="upgrade-hint">
        Settings require the <code>comfort_band</code> integration v0.4.0 or later.
      </div>`;
    }

    // The Room Temperature sensor's `humidity_sensor` attribute carries
    // the currently-configured sensor entity_id. None if not configured.
    const roomTempState = this.entities.roomTemperature
      ? this.hass.states[this.entities.roomTemperature]
      : undefined;
    const humiditySensor = roomTempState?.attributes.humidity_sensor as string | null | undefined;

    return html`
      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : nothing}
      ${useApparent !== null
        ? this._renderToggle({
            entityId: useApparent,
            title: 'Use apparent temperature',
            desc: html`When on, heating and cooling decisions use the humidity-adjusted "feels like"
            value instead of the raw sensor. Falls back to the raw value automatically if the
            humidity sensor is unavailable.`,
          })
        : nothing}
      ${learning !== null
        ? this._renderToggle({
            entityId: learning,
            title: 'Learning enabled',
            desc: html`Reserved for upcoming features (suggested-schedule nudges, predictive
            control). Has no effect today.`,
          })
        : nothing}
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">
            Configure via Settings → Devices &amp; Services → Comfort Band → Configure.
          </div>
        </div>
        <div class="info-value ${humiditySensor ? '' : 'unconfigured'}">
          ${humiditySensor ?? 'Not configured'}
        </div>
      </div>
    `;
  }

  private _renderToggle(opts: { entityId: string; title: string; desc: TemplateResult }) {
    const on = this._isOn(opts.entityId);
    // Disabled while a service call is in flight to prevent a double-tap
    // from dispatching two concurrent turn_on/turn_off pairs.
    const pending = this._pendingByEntity[opts.entityId] !== undefined;
    // Bespoke <button role="switch"> rather than <ha-switch> / <mwc-switch>:
    // those are private HA internal elements with no stable API for custom
    // cards. The hand-rolled control is WCAG-correct (44px target,
    // aria-checked, focus-visible) at the cost of ~50 lines of CSS.
    return html`
      <div class="row">
        <div class="row-label">
          <div class="title">${opts.title}</div>
          <div class="desc">${opts.desc}</div>
        </div>
        <button
          class="toggle"
          role="switch"
          aria-checked=${on ? 'true' : 'false'}
          aria-disabled=${pending ? 'true' : 'false'}
          aria-label=${opts.title}
          @click=${pending ? null : () => this._onToggle(opts.entityId)}
        >
          <span class="knob"></span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'comfort-band-settings-tab': ComfortBandSettingsTab;
  }
}
