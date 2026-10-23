/**
 * `<comfort-band-settings-tab>` — a zone's settings, one Advanced tab
 * section at a time (`section`):
 *
 *   - comfort: "feels like", the humidity sensor, the deadbands, the band
 *     ramp and the default adjustment length;
 *   - automation: control on/off, learning, predictive control, and their
 *     timings folded under "Fine-tuning";
 *   - fan: fan control and its two modes;
 *   - peak: peak saving and its offsets and lead time;
 *   - schedules: which schedule the room follows.
 *
 * Switches flip at once and roll back on rejection. Steppers move a step
 * per tap and send once the taps stop; choices send when picked. What's
 * shown stays until HA reports the change (15 s at most), or goes back if
 * the call is refused. A setting whose entity isn't there (an older
 * integration, or the entity turned off) is left out, and the section
 * says so.
 */

import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { readHumiditySensor, type ZoneEntities } from '../helpers.js';
import type { HassEntity, HomeAssistant } from '../types.js';
import { tokens } from '../styles.js';
import { readPeak, readReadiness, readRoomSource, type StatusRow } from '../diagnostics.js';

export type SettingsSection = 'comfort' | 'automation' | 'fan' | 'peak' | 'schedules';

/** How long after the last tap on a stepper its value is sent. */
export const STEP_SEND_DELAY_MS = 1000;

/** How long a value that has gone through keeps showing while HA hasn't
 *  reported it yet. The integration saves a number through HA's debounced
 *  refresh: the first goes out at once, but another within 10 s waits for
 *  the end of those 10 s. */
export const SETTLE_MS = 15000;

interface Setting {
  kind: 'switch' | 'number' | 'select';
  /** The ZoneEntities field holding the setting's entity. */
  field: keyof ZoneEntities;
  title: string;
  desc: string;
  /** A choice's option as shown. */
  label?: (option: string) => string;
}

const sw = (field: keyof ZoneEntities, title: string, desc: string): Setting => ({
  kind: 'switch',
  field,
  title,
  desc,
});
const num = (field: keyof ZoneEntities, title: string, desc: string): Setting => ({
  kind: 'number',
  field,
  title,
  desc,
});
const pick = (
  field: keyof ZoneEntities,
  title: string,
  desc: string,
  label: (option: string) => string,
): Setting => ({ kind: 'select', field, title, desc, label });
/** A name someone typed, shown as typed. */
const asTyped = (option: string) => option;

/** Each section's settings, in order, each worded from what the
 *  integration's code does with it. Where another part of the controller
 *  can override a setting, the wording says only what's always true. */
export const SETTINGS: Record<SettingsSection, { main: Setting[]; fine?: Setting[] }> = {
  comfort: {
    main: [
      sw(
        'useApparentTemperature',
        'Use “feels like”',
        'When on, heating and cooling go by the humidity-adjusted “feels like” temperature instead of the room’s own reading. Falls back to the room’s reading automatically if the humidity sensor is unavailable.',
      ),
      num(
        'deadbandBelow',
        'Heating starts below the range by',
        'How far below the range the room may drop before heating starts; heating stops at the bottom of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and heats towards the top of the range.',
      ),
      num(
        'deadbandAbove',
        'Cooling starts above the range by',
        'How far above the range the room may rise before cooling starts; cooling stops at the top of the range. Learning can start or stop it early, or hold off. Predictive control, while it’s planning, doesn’t use this, and cools towards the bottom of the range.',
      ),
      num(
        'bandRampMinutes',
        'Ease schedule changes over',
        'Spreads each change of range over this long, centred on its time, instead of changing all at once. 0 changes at once.',
      ),
      num(
        'overrideHours',
        'Adjustments made elsewhere last',
        'How long an adjustment lasts when it’s started without a length: from the device page, or an automation that doesn’t give one. Warmer, Cooler and the exact range here set their own length.',
      ),
    ],
  },
  automation: {
    main: [
      sw(
        'enabled',
        'Control this room',
        'When off, this room still works out what it would do but sends nothing to the unit, and the Now tab says it’s paused.',
      ),
      sw(
        'learningEnabled',
        'Learning',
        'Uses what this room has learned about how quickly it warms and cools to time heating and cooling: starting early rather than waiting for the room to get too cold or warm, stopping early so it doesn’t overshoot, and holding off while it’s already heading back on its own. Predictive control needs this on too. While it’s off, the room keeps recording readings.',
      ),
      sw(
        'mpcEnabled',
        'Predictive control',
        'Plans heating and cooling ahead, from what the room has learned and the schedule coming up. Needs Learning on. It plans only while it has recent enough readings of how this room warms and cools, usually after a few hours of normal running.',
      ),
    ],
    fine: [
      num(
        'lookaheadMinutes',
        'Look ahead by',
        'How far ahead learning projects the room’s temperature, to start or stop early, or hold off.',
      ),
      num(
        'passiveTolerance',
        'Let it drift back within',
        'How far outside the range the room may be for learning to let it drift back on its own, rather than heat or cool.',
      ),
      num(
        'mpcHorizonMinutes',
        'Plan ahead by',
        'How far ahead predictive control plans, schedule changes included.',
      ),
      num(
        'minCycleMinutes',
        'Repeat a command no sooner than',
        'The least time before the unit is sent the same command again, such as a new setting while it’s already heating.',
      ),
      num(
        'crossModeMinMinutes',
        'Switch between heating and cooling no sooner than',
        'The least time between heating and then cooling, or the other way round.',
      ),
    ],
  },
  fan: {
    main: [
      sw(
        'fanControlEnabled',
        'Fan control',
        'Sets the unit’s fan by what it’s doing, using the two choices below. Nothing changes until one is chosen.',
      ),
      pick(
        'activeFanMode',
        'Fan while heating or cooling',
        'The fan speed while the unit is working. Peak saving can leave it as it is during a peak.',
        optionLabel,
      ),
      pick(
        'idleFanMode',
        'Fan while idle',
        'The fan speed while the unit isn’t heating or cooling. A quiet one stops air rushing round at full speed.',
        optionLabel,
      ),
    ],
  },
  peak: {
    main: [
      sw(
        'peakSavingEnabled',
        'Peak saving',
        'Runs heating and cooling less in expensive power times. During one, the range widens, so the room drifts further before heating or cooling starts. Ahead of one that’s announced, the room can be warmed or cooled a little within its range. An adjustment in force sets both aside. Needs a peak entity chosen under Settings → Devices & Services → Comfort Band → Configure.',
      ),
      num(
        'peakHeatOffset',
        'Relax the bottom of the range by',
        'How far the bottom of the range drops during a peak; heating still starts the usual amount below it. Ahead of one, up to how far the bottom rises to warm the room first.',
      ),
      num(
        'peakCoolOffset',
        'Relax the top of the range by',
        'How far the top of the range rises during a peak; cooling still starts the usual amount above it. Ahead of one, up to how far the top falls to cool the room first.',
      ),
      num(
        'peakPreconditionMinutes',
        'Prepare ahead by',
        'How long before an announced peak to warm or cool the room. 0 doesn’t prepare.',
      ),
    ],
  },
  schedules: {
    main: [
      pick(
        'scheduleAssignment',
        'Follows',
        'Which schedule sets this room’s range: its own, or one shared with other rooms. The Schedule tab shows and changes the room’s own schedule, even while it follows a shared one.',
        asTyped,
      ),
    ],
  },
};

/** What each section's settings do and the integration version they
 *  arrived in, for the note when none of them is there. Comfort's and
 *  automation's first ones came with v0.1.0, as far back as the card goes:
 *  there, none means turned off. */
const SECTION_NEEDS: Partial<Record<SettingsSection, { what: string; since: string }>> = {
  fan: { what: 'Fan control needs', since: 'v0.13.0' },
  peak: { what: 'Peak saving needs', since: 'v0.24.0' },
  schedules: { what: 'Choosing a shared schedule needs', since: 'v0.14.0' },
};

/** A select option as people say it: "medium-low" → "Medium low"; the
 *  fan selects' "(none)" leaves the fan alone. */
export function optionLabel(option: string): string {
  if (option === '(none)') return 'Leave as it is';
  const words = option.replace(/[-_]/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Decimal places a stepper's step shows: 0.1 and 0.5 → 1, 1 and 15 → 0. */
export function stepDecimals(step: number): number {
  const text = String(step);
  const dot = text.indexOf('.');
  return dot < 0 ? 0 : text.length - dot - 1;
}

/** Decimal places a value shows: the step's, or more for a value set
 *  elsewhere off the step's grid (0.25 on a 0.1 step), up to 3. */
function valueDecimals(value: number, step: number): number {
  return Math.max(stepDecimals(step), stepDecimals(Number(value.toFixed(3))));
}

/** HA's error text: the frontend rejects with `{code, message}`, not an Error. */
function errorText(err: unknown): string {
  const message =
    typeof err === 'object' && err !== null ? (err as { message?: unknown }).message : undefined;
  return typeof message === 'string' && message ? message : 'That setting couldn’t be changed.';
}

function attrNumber(value: unknown): number | null {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  return Number.isFinite(n) ? n : null;
}

@customElement('comfort-band-settings-tab')
export class ComfortBandSettingsTab extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public entities?: ZoneEntities;
  /** Which of the Advanced tab's sections this shows. */
  @property({ type: String }) public section: SettingsSection = 'comfort';

  /** Values shown ahead of HA, keyed by entity_id: a switch's flip, a
   *  stepper's taps not yet confirmed, a choice going through. */
  @state() private _pending: Record<string, boolean | number | string> = {};
  /** A refused call's error, and its entity: a later call for the same
   *  one going through clears it. */
  @state() private _error: { entityId: string; message: string } | null = null;
  /** A stepper's send timer, per entity. */
  private _timers = new Map<string, ReturnType<typeof setTimeout>>();
  /** Values that have gone through but HA hasn't reported yet: HA's state
   *  for the entity when the call came back, and the timer that stops
   *  waiting for a new one. */
  private _settling = new Map<
    string,
    { baseline: HassEntity | undefined; timer: ReturnType<typeof setTimeout> }
  >();
  /** Calls go one after another, so they land in the order made. */
  private _chain: Promise<unknown> = Promise.resolve();

  public static override styles = [
    tokens,
    css`
      :host {
        display: block;
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
        /* A long name or ID wraps rather than squeezing the label out. */
        max-width: 55%;
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--cb-text-primary);
        text-align: right;
      }
      .info-value.unconfigured {
        font-style: italic;
        color: var(--cb-text-secondary);
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
      /* A stepper too wide to leave its title room goes below it. */
      .row.num {
        flex-wrap: wrap;
      }
      .row.num .row-label {
        flex: 1 1 12em;
      }
      .stepper {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        gap: 2px;
        margin-left: auto;
      }
      /* WCAG 2.5.5: 44x44 targets on the steppers too. */
      .step {
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: var(--cb-radius-pill);
        background: transparent;
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }
      .step:focus-visible,
      .choice:focus-visible,
      summary:focus-visible {
        outline: 2px solid var(--cb-accent, var(--primary-color, #03a9f4));
        outline-offset: 2px;
      }
      .step[aria-disabled='true'] {
        opacity: 0.4;
        cursor: default;
      }
      .value {
        min-width: 4.5em;
        text-align: center;
        font-size: 14px;
        font-variant-numeric: tabular-nums;
        color: var(--cb-text-primary);
      }
      /* A choice too wide to sit beside its title goes below it. */
      .row.pick {
        flex-wrap: wrap;
      }
      .row.pick .row-label {
        flex: 1 1 12em;
      }
      /* WCAG 2.5.5: 44px tall. WebKit's own menu button ignores the height and
         the border, so it's drawn here, chevron included. */
      .choice {
        flex: 0 1 auto;
        max-width: 100%;
        min-height: 44px;
        margin-left: auto;
        padding: 0 28px 0 10px;
        border: 1px solid var(--divider-color, #cccccc);
        border-radius: 8px;
        -webkit-appearance: none;
        appearance: none;
        background-color: var(--card-background-color, #ffffff);
        background-image:
          linear-gradient(45deg, transparent 50%, var(--cb-text-secondary) 50%),
          linear-gradient(135deg, var(--cb-text-secondary) 50%, transparent 50%);
        background-position:
          calc(100% - 15px) 50%,
          calc(100% - 10px) 50%;
        background-size: 5px 5px;
        background-repeat: no-repeat;
        color: var(--cb-text-primary);
        font: inherit;
        font-size: 14px;
        text-overflow: ellipsis;
        /* With its own look, WebKit lets a long option's text out of the box. */
        overflow: hidden;
      }
      .choice:disabled {
        opacity: 0.6;
      }
      .note {
        margin-top: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
      /* "Fine-tuning", folded inside Automation. */
      details.fine {
        margin-top: var(--cb-gap-sm);
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }
      details.fine > summary {
        display: flex;
        align-items: center;
        min-height: 44px;
        list-style: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--cb-text-primary);
      }
      details.fine > summary::-webkit-details-marker {
        display: none;
      }
      details.fine > summary::before {
        content: '';
        flex: none;
        width: 6px;
        height: 6px;
        margin: 0 8px 0 2px;
        border-right: 2px solid var(--cb-text-secondary);
        border-bottom: 2px solid var(--cb-text-secondary);
        transform: rotate(-45deg);
        transition: transform 0.15s ease;
      }
      details.fine[open] > summary::before {
        transform: rotate(45deg);
      }
      details.fine .fine-summary {
        margin-left: var(--cb-gap-sm);
        font-size: 12px;
        color: var(--cb-text-secondary);
      }
    `,
  ];

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Steps tapped but not yet sent still go.
    for (const [entityId, timer] of this._timers) {
      clearTimeout(timer);
      this._timers.delete(entityId);
      const value = this._pending[entityId];
      if (typeof value === 'number') this._send(entityId, value, 'number', 'set_value', { value });
    }
    // Shown again, it shows what HA says.
    for (const entityId of [...this._settling.keys()]) this._drop(entityId);
  }

  /** A value that has gone through shows until HA's state for its entity
   *  changes, then HA's state shows: the value sent, or what HA made of it. */
  protected override willUpdate(): void {
    for (const [entityId, { baseline }] of [...this._settling]) {
      if (this.hass?.states[entityId] !== baseline) this._drop(entityId);
    }
  }

  private _entity(field: keyof ZoneEntities): string | null {
    const id = this.entities?.[field];
    return typeof id === 'string' ? id : null;
  }

  /** Sends a call for the value shown, after the ones before it. Refused,
   *  the value in force shows again; through, the value shows until HA
   *  reports it. A newer tap or choice made meanwhile keeps showing. */
  private _send(
    entityId: string,
    value: boolean | number | string,
    domain: string,
    service: string,
    data: Record<string, unknown>,
  ): void {
    const hass = this.hass;
    if (!hass) return;
    const current = () => this._pending[entityId] === value && !this._timers.has(entityId);
    this._chain = this._chain
      .then(() => hass.callService(domain, service, { entity_id: entityId, ...data }))
      .then(
        () => {
          if (this._error?.entityId === entityId) this._error = null;
          if (!current()) return;
          // Taken off the page (its taps sent as it went), it waits for nothing.
          if (this._reported(entityId, value) || !this.isConnected) this._drop(entityId);
          else this._settle(entityId);
        },
        (err: unknown) => {
          this._error = { entityId, message: errorText(err) };
          if (current()) this._drop(entityId);
        },
      );
  }

  /** Whether HA's state for the entity already says the value. */
  private _reported(entityId: string, value: boolean | number | string): boolean {
    const state = this.hass?.states[entityId]?.state;
    if (typeof value === 'boolean') return state === (value ? 'on' : 'off');
    if (typeof value === 'number') return Number.parseFloat(state ?? '') === value;
    return state === value;
  }

  /** Keeps a value that has gone through showing until HA's state for its
   *  entity changes, or for SETTLE_MS at most. */
  private _settle(entityId: string): void {
    // Two calls for the same value can both come back while it's shown (a
    // choice of A, B, then A again): the later one's wait replaces the first.
    this._stopSettling(entityId);
    this._settling.set(entityId, {
      baseline: this.hass?.states[entityId],
      timer: setTimeout(() => this._drop(entityId), SETTLE_MS),
    });
  }

  private _stopSettling(entityId: string): void {
    const settling = this._settling.get(entityId);
    if (settling) clearTimeout(settling.timer);
    this._settling.delete(entityId);
  }

  /** Shows HA's value again. */
  private _drop(entityId: string): void {
    this._stopSettling(entityId);
    if (this._pending[entityId] === undefined) return;
    const next = { ...this._pending };
    delete next[entityId];
    this._pending = next;
  }

  private _isOn(entityId: string): boolean {
    const pending = this._pending[entityId];
    if (typeof pending === 'boolean') return pending;
    return this.hass?.states[entityId]?.state === 'on';
  }

  private _onToggle = (entityId: string): void => {
    if (this._pending[entityId] !== undefined) return;
    const target = !this._isOn(entityId);
    this._pending = { ...this._pending, [entityId]: target };
    this._error = null;
    this._send(entityId, target, 'switch', target ? 'turn_on' : 'turn_off', {});
  };

  private _onStep(entityId: string, direction: 1 | -1): void {
    const s = this.hass?.states[entityId];
    if (!s) return;
    const step = attrNumber(s.attributes.step) ?? 1;
    const min = attrNumber(s.attributes.min) ?? -Infinity;
    const max = attrNumber(s.attributes.max) ?? Infinity;
    const shown = this._pending[entityId];
    // Its buttons don't call this at a limit, or with no value to step from.
    const current = typeof shown === 'number' ? shown : Number.parseFloat(s.state);
    // The steps run from the bottom limit, as on HA's own slider. A value set
    // elsewhere off them goes to the next one along.
    const base = Number.isFinite(min) ? min : 0;
    const steps = (current - base) / step;
    const k = direction > 0 ? Math.floor(steps + 1e-9) + 1 : Math.ceil(steps - 1e-9) - 1;
    const decimals = Math.max(stepDecimals(step), stepDecimals(base));
    // Rounded, then held to the limits, which needn't be on the grid.
    const next = Math.min(max, Math.max(min, Number((base + k * step).toFixed(decimals))));
    this._pending = { ...this._pending, [entityId]: next };
    this._error = null;
    this._stopSettling(entityId);
    const timer = this._timers.get(entityId);
    if (timer !== undefined) clearTimeout(timer);
    this._timers.set(
      entityId,
      setTimeout(() => {
        this._timers.delete(entityId);
        this._send(entityId, next, 'number', 'set_value', { value: next });
      }, STEP_SEND_DELAY_MS),
    );
  }

  private _onChoose(entityId: string, option: string): void {
    this._pending = { ...this._pending, [entityId]: option };
    this._error = null;
    this._stopSettling(entityId);
    this._send(entityId, option, 'select', 'select_option', { option });
  }

  protected override render() {
    if (!this.hass || !this.entities) return nothing;
    const { main, fine = [] } = SETTINGS[this.section];
    const present = (list: Setting[]) => list.filter((s) => this._entity(s.field) !== null);
    const shownMain = present(main);
    const shownFine = present(fine);
    const missing = main.length + fine.length - shownMain.length - shownFine.length;
    const none = shownMain.length + shownFine.length === 0;
    const needs = SECTION_NEEDS[this.section];
    return html`
      ${this._error ? html`<div class="error" role="alert">${this._error.message}</div>` : nothing}
      ${this.section === 'peak'
        ? this._renderStatus(readPeak(this.hass, this.entities, Date.now()), 'peak')
        : nothing}
      ${shownMain.map((s) => this._renderSetting(s))}
      ${this.section === 'comfort'
        ? html`${this._renderHumidity()}
          ${this._renderStatus(readRoomSource(this.hass, this.entities), 'source')}`
        : nothing}
      ${this.section === 'automation'
        ? this._renderStatus(readReadiness(this.hass, this.entities), 'readiness')
        : nothing}
      ${shownFine.length
        ? html`<details class="fine">
            <summary>Fine-tuning <span class="fine-summary">Timings and tolerances</span></summary>
            ${shownFine.map((s) => this._renderSetting(s))}
          </details>`
        : nothing}
      ${none
        ? html`<div class="upgrade-hint">
            ${needs
              ? html`${needs.what} the <code>comfort_band</code> integration ${needs.since} or
                  later, with its entities turned on.`
              : html`These settings’ entities are turned off. Turn them on from this room’s device
                page, under Settings → Devices &amp; Services.`}
          </div>`
        : missing > 0
          ? html`<div class="note">
              Some settings aren’t shown: they need a newer <code>comfort_band</code>, or their
              entities are turned off.
            </div>`
          : nothing}
    `;
  }

  private _renderSetting(setting: Setting): TemplateResult {
    const entityId = this._entity(setting.field)!;
    switch (setting.kind) {
      case 'switch':
        return this._renderToggle({
          entityId,
          field: setting.field,
          title: setting.title,
          desc: html`${setting.desc}`,
        });
      case 'number':
        return this._renderNumber(entityId, setting);
      case 'select':
        return this._renderSelect(entityId, setting);
    }
  }

  /** What the integration is doing, beside the settings it explains. */
  private _renderStatus(row: StatusRow | null, id: string) {
    if (!row) return nothing;
    return html`
      <div class="row" data-status=${id}>
        <div class="row-label">
          <div class="title">${row.title}</div>
          <div class="desc">${row.desc}</div>
        </div>
        <div class="info-value">${row.value}</div>
      </div>
    `;
  }

  private _renderHumidity() {
    // The Room Temperature sensor's `humidity_sensor` attribute carries the
    // configured sensor. HA drops attributes from an unavailable entity, and
    // a disabled one isn't there at all: then it can't be told.
    const room = this.entities!.roomTemperature;
    const roomState = room !== null ? this.hass!.states[room] : undefined;
    const known = roomState !== undefined && roomState.state !== 'unavailable';
    const humidity = known ? readHumiditySensor(this.hass!, room) : null;
    const value =
      roomState === undefined
        ? 'Can’t be read'
        : !known
          ? 'Can’t be read right now'
          : humidity
            ? this._sensorText(humidity)
            : 'Not configured';
    const desc =
      roomState === undefined
        ? 'It’s read from this room’s Room temperature sensor, which is turned off. Turn it on from this room’s device page, under Settings → Devices & Services.'
        : `${!known ? 'Set' : humidity ? 'Change it' : 'Set one up'} under Settings → Devices & Services → Comfort Band → Configure.`;
    return html`
      <div class="row">
        <div class="row-label">
          <div class="title">Humidity sensor</div>
          <div class="desc">${desc}</div>
        </div>
        <div class="info-value ${humidity ? '' : 'unconfigured'}">${value}</div>
      </div>
    `;
  }

  /** "Bedroom humidity · 54%": the sensor's own name and reading, not its
   *  ID, the reading as HA formats it where the frontend can. */
  private _sensorText(entityId: string): string {
    const s = this.hass!.states[entityId];
    if (!s) return entityId;
    const name =
      typeof s.attributes.friendly_name === 'string' && s.attributes.friendly_name
        ? s.attributes.friendly_name
        : entityId;
    const value = Number.parseFloat(s.state);
    if (!Number.isFinite(value)) return `${name} · no reading`;
    if (this.hass!.formatEntityState) return `${name} · ${this.hass!.formatEntityState(s)}`;
    const unit =
      typeof s.attributes.unit_of_measurement === 'string' ? s.attributes.unit_of_measurement : '';
    return `${name} · ${s.state}${unit ? ` ${unit}` : ''}`;
  }

  private _renderNumber(entityId: string, setting: Setting) {
    const s = this.hass!.states[entityId];
    const step = attrNumber(s?.attributes.step) ?? 1;
    const min = attrNumber(s?.attributes.min);
    const max = attrNumber(s?.attributes.max);
    const unit =
      typeof s?.attributes.unit_of_measurement === 'string' ? s.attributes.unit_of_measurement : '';
    const shown = this._pending[entityId];
    const value = typeof shown === 'number' ? shown : Number.parseFloat(s?.state ?? '');
    const readable = Number.isFinite(value);
    const text = readable
      ? `${value.toFixed(valueDecimals(value, step))}${unit ? ` ${unit}` : ''}`
      : '—';
    const titleId = `t-${setting.field}`;
    const atMin = !readable || (min !== null && value <= min);
    const atMax = !readable || (max !== null && value >= max);
    return html`
      <div class="row num" data-setting=${setting.field}>
        <div class="row-label">
          <div class="title" id=${titleId}>${setting.title}</div>
          <div class="desc">${setting.desc}</div>
        </div>
        <div class="stepper" role="group" aria-labelledby=${titleId}>
          <button
            class="step"
            type="button"
            aria-label="Decrease"
            aria-disabled=${atMin ? 'true' : 'false'}
            @click=${() => !atMin && this._onStep(entityId, -1)}
          >
            −
          </button>
          <output class="value" aria-live="polite">${text}</output>
          <button
            class="step"
            type="button"
            aria-label="Increase"
            aria-disabled=${atMax ? 'true' : 'false'}
            @click=${() => !atMax && this._onStep(entityId, 1)}
          >
            +
          </button>
        </div>
      </div>
    `;
  }

  private _renderSelect(entityId: string, setting: Setting) {
    const s = this.hass!.states[entityId];
    const options = Array.isArray(s?.attributes.options)
      ? (s.attributes.options as unknown[]).filter((o): o is string => typeof o === 'string')
      : [];
    const shown = this._pending[entityId];
    const value = typeof shown === 'string' ? shown : (s?.state ?? '');
    const titleId = `t-${setting.field}`;
    // No options: missing from HA, or a fanless unit's fan select.
    const unavailable = s?.state === 'unavailable' || options.length === 0;
    // A value that isn't one of the options (a fan mode the unit no longer
    // offers reads "unknown") shows a dash, and a choice can still be made.
    const listed = options.includes(value);
    const label = setting.label ?? asTyped;
    return html`
      <div class="row pick" data-setting=${setting.field}>
        <div class="row-label">
          <div class="title" id=${titleId}>${setting.title}</div>
          <div class="desc">${setting.desc}</div>
        </div>
        <select
          class="choice"
          aria-labelledby=${titleId}
          ?disabled=${unavailable}
          @change=${(e: Event) => this._onChoose(entityId, (e.target as HTMLSelectElement).value)}
        >
          ${listed && !unavailable
            ? nothing
            : html`<option value="" disabled .selected=${true}>
                ${unavailable ? 'Unavailable' : '—'}
              </option>`}
          ${options.map(
            (o) =>
              html`<option value=${o} .selected=${!unavailable && o === value}>
                ${label(o)}
              </option>`,
          )}
        </select>
      </div>
    `;
  }

  private _renderToggle(opts: {
    entityId: string;
    field: keyof ZoneEntities;
    title: string;
    desc: TemplateResult;
  }) {
    const on = this._isOn(opts.entityId);
    // Takes no press from the tap until HA reports the change (15 s at most)
    // or refuses it, so a double tap can't send turn_on and turn_off
    // together.
    const pending = this._pending[opts.entityId] !== undefined;
    // Neither on nor off: HA says so rather than the switch looking off. HA
    // skips an unavailable entity in a call without an error.
    const state = this.hass!.states[opts.entityId]?.state;
    if (state !== 'on' && state !== 'off') {
      return html`
        <div class="row" data-setting=${opts.field}>
          <div class="row-label">
            <div class="title">${opts.title}</div>
            <div class="desc">${opts.desc}</div>
          </div>
          <div class="info-value unconfigured">
            ${state === undefined || state === 'unavailable' ? 'Unavailable' : 'Unknown'}
          </div>
        </div>
      `;
    }
    // Bespoke <button role="switch"> rather than <ha-switch> / <mwc-switch>:
    // those are private HA internal elements with no stable API for custom
    // cards. The hand-rolled control is WCAG-correct (44px target,
    // aria-checked, focus-visible) at the cost of ~50 lines of CSS.
    return html`
      <div class="row" data-setting=${opts.field}>
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
