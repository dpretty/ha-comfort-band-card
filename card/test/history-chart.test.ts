import { afterEach, describe, it, expect, vi } from 'vitest';
import '../src/history-chart.js';
import type { ComfortBandHistoryChart } from '../src/history-chart.js';
import type { HomeAssistant, HassConnection } from '../src/types.js';
import { captureSubscription, mount, stubConnection, teardown } from './_fixture.js';

afterEach(teardown);

function makeHass(connection: HassConnection): HomeAssistant {
  return {
    states: {},
    devices: {},
    entities: {},
    connection,
    callService: vi.fn(),
    callWS: vi.fn(),
  };
}

async function chart(props: Partial<ComfortBandHistoryChart>): Promise<ComfortBandHistoryChart> {
  return mount('comfort-band-history-chart', props);
}

const FULL_PROPS = {
  roomEntity: 'sensor.gym_room_temperature',
  lowEntity: 'sensor.gym_effective_low',
  highEntity: 'sensor.gym_effective_high',
  actionEntity: 'sensor.gym_current_action',
};

/** v0.8.2: superset including the new apparent + humidity overlay entities. */
const FULL_PROPS_WITH_OVERLAYS = {
  ...FULL_PROPS,
  apparentEntity: 'sensor.gym_apparent_temperature',
  humidityEntity: 'sensor.gym_humidity',
};

describe('comfort-band-history-chart', () => {
  it('renders an empty message when roomEntity is missing', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), roomEntity: '' });
    expect(el.shadowRoot!.querySelector('.status')!.textContent).toContain('No room temperature');
    expect(sub.callCount).toBe(0);
  });

  it('opens a history/stream subscription with the active entities', async () => {
    const sub = captureSubscription();
    await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    // Wait one microtask so connectedCallback's update has a chance to run.
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
    const msg = sub.subscriptions[0].message;
    expect(msg.type).toBe('history/stream');
    expect(msg.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_effective_low',
      'sensor.gym_effective_high',
      'sensor.gym_current_action',
    ]);
    expect(msg.no_attributes).toBe(true);
    expect(msg.significant_changes_only).toBe(false);
    expect(typeof msg.start_time).toBe('string');
  });

  it('skips empty entity slots from the subscription request', async () => {
    const sub = captureSubscription();
    await chart({
      hass: makeHass(sub.connection),
      roomEntity: 'sensor.gym_room_temperature',
      lowEntity: '',
      highEntity: '',
      actionEntity: '',
    });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.subscriptions[0].message.entity_ids).toEqual(['sensor.gym_room_temperature']);
  });

  it('shows the empty state when the initial event has no usable history', async () => {
    const sub = captureSubscription();
    const el = await chart({
      hass: makeHass(sub.connection),
      roomEntity: 'sensor.gym_room_temperature',
    });
    await new Promise((r) => setTimeout(r, 0));
    // Emit an empty initial event — every entity has an empty array.
    sub.emit({ states: { 'sensor.gym_room_temperature': [] } });
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  it('shows the empty state when overlays are wired but every series is empty', async () => {
    // v0.8.2 added apparent + humidity to the empty-check conjunction
    // (`room && low && high && apparent && humidity` all length 0). A
    // regression would let the chart escape the empty branch when only
    // the overlay series are empty and try to render against a
    // zero-row alignSeries result.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    sub.emit({
      states: {
        'sensor.gym_room_temperature': [],
        'sensor.gym_effective_low': [],
        'sensor.gym_effective_high': [],
        'sensor.gym_apparent_temperature': [],
        'sensor.gym_humidity': [],
      },
    });
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('No history available');
  });

  // Not tested at the DOM level: the symmetric "action-only data
  // keeps chart out of empty state" case (the F12 fix that added
  // `this._intervals.length === 0` to the empty-check conjunction).
  // Any test that asserts the chart escapes the empty branch by
  // construction triggers a `new uPlot(...)` and the same teardown
  // race we work around in the legend tests above — and here the
  // workaround (force `_loading = false` directly) doesn't help
  // because the construction happens inside `_renderPlot` regardless
  // of `_loading`. The fix is a single AND-clause addition pinned by
  // its inline rationale.

  it('shows an error status when subscribeMessage rejects', async () => {
    // Custom connection that rejects on subscribe (e.g. recorder
    // component disabled). The chart's catch path sets `_error`.
    const failing: HassConnection = {
      subscribeMessage: vi.fn().mockRejectedValue(new Error('history-disabled')),
    };
    const el = await chart({
      hass: makeHass(failing),
      roomEntity: 'sensor.gym_room_temperature',
    });
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.textContent).toContain('history-disabled');
  });

  it('unsubscribes when the element is disconnected', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.subscriptions[0].unsubscribe).not.toHaveBeenCalled();

    el.remove();
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
  });

  it('tears down a subscription that resolves after the element is disconnected', async () => {
    // Disconnect-during-pending-subscribe: the WS round-trip is still in
    // flight when the element is removed from the DOM. Without the
    // `_fetchGen` bump in `disconnectedCallback`, the eventual
    // `subscribeMessage` resolution would see `gen === _fetchGen`,
    // store the real `unsub` on a dead element, and leak the HA
    // subscription forever (HA keeps streaming, the merge closure
    // accumulates data, `unsub()` never called).
    //
    // The fix bumps `_fetchGen` on disconnect; when the pending
    // subscribe resolves, its gen check fails and it tears itself down
    // via the stale-gen branch (`unsub()` called).
    //
    // We can't use `captureSubscription()` here because it resolves
    // synchronously — we need to control when the subscribe promise
    // resolves so we can interleave a disconnect between subscribe-start
    // and subscribe-resolve. Hand-rolled mock with an externally
    // resolvable `subscribePromise` does the job.
    let resolveSub: (unsub: () => void) => void = () => {};
    const subscribePromise = new Promise<() => void>((resolve) => {
      resolveSub = resolve;
    });
    const slowConnection: HassConnection = {
      subscribeMessage: vi.fn(async (_cb, _msg) => subscribePromise),
    };
    const el = await chart({ hass: makeHass(slowConnection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(slowConnection.subscribeMessage).toHaveBeenCalledOnce();

    // Disconnect while the subscribe is still pending.
    el.remove();

    // Now resolve the pending subscribe with the real unsubscribe handle.
    // The chart's gen-mismatch branch must call `realUnsub()` itself —
    // proves the leak fix works.
    const realUnsub = vi.fn();
    resolveSub(realUnsub);
    // Microtask drain for the await resumption.
    await new Promise((r) => setTimeout(r, 0));
    expect(realUnsub).toHaveBeenCalledOnce();
  });

  it('resubscribes when an entity prop changes', async () => {
    // Live-stream pattern: changing entities means the existing
    // subscription's entity list is stale. Tear it down and open a
    // fresh one. Tests the (a) unsubscribe of the old, (b) subscribe
    // of the new, all via the captured subscriptions[].
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.lowEntity = 'sensor.gym_alt_low';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[0].unsubscribe).toHaveBeenCalledOnce();
    expect(sub.subscriptions[1].message.entity_ids).toContain('sensor.gym_alt_low');
  });

  it('drops events from a prior subscription generation', async () => {
    // Sequence:
    //   1. First subscribe (gen=1).
    //   2. Change entity → triggers second subscribe (gen=2).
    //   3. First subscription's callback fires a LATE event with data.
    //   4. Chart must ignore that event (stale gen).
    // Validates the `_fetchGen` guard. Without it, the late event
    // would land on _renderPlot with the old entity_id's data, which
    // doesn't match the chart's current bindings.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));

    el.lowEntity = 'sensor.gym_alt_low';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);

    // Emit on the FIRST subscription (now stale). The chart should
    // ignore it because gen has advanced.
    const now = Math.floor(Date.now() / 1000);
    sub.subscriptions[0].callback({
      states: {
        'sensor.gym_room_temperature': [{ s: '21.0', lu: now - 60 }],
        'sensor.gym_effective_low': [{ s: '19.5', lu: now - 60 }],
        'sensor.gym_effective_high': [{ s: '22.5', lu: now - 60 }],
      },
    });
    await el.updateComplete;
    // Chart is still loading because the second subscription hasn't
    // emitted yet; the stale event was dropped without clearing
    // `_loading`. The .status div is showing the loading text.
    expect(el.shadowRoot!.querySelector('.status')?.textContent).toContain('Loading');
  });

  it('does not unsubscribe when hass ticks without an entity change', async () => {
    // The chart should hold the subscription across hass updates — the
    // subscription itself streams live data, so a fresh hass object
    // doesn't invalidate it. Without this, every state push in HA
    // would churn the subscription.
    const sub = captureSubscription();
    const conn = sub.connection;
    const el = await chart({ hass: makeHass(conn), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.hass = makeHass(conn);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);
    expect(sub.subscriptions[0].unsubscribe).not.toHaveBeenCalled();
  });

  // ----- v0.8.2: apparent + humidity overlays -----

  it('extends the subscription with apparent + humidity entities when those props are set', async () => {
    // The merged chart subscribes to up to 6 entities. The order
    // matches the props declaration so the subscription request is
    // deterministic for HACS users debugging WS frames.
    const sub = captureSubscription();
    await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.subscriptions[0].message.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_effective_low',
      'sensor.gym_effective_high',
      'sensor.gym_current_action',
      'sensor.gym_apparent_temperature',
      'sensor.gym_humidity',
    ]);
  });

  it('omits apparent + humidity from the subscription when those props are empty', async () => {
    // The v0.8.1 four-entity shape still works for zones without an
    // apparent or humidity sensor — defends the degraded path.
    const sub = captureSubscription();
    await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.subscriptions[0].message.entity_ids).toEqual([
      'sensor.gym_room_temperature',
      'sensor.gym_effective_low',
      'sensor.gym_effective_high',
      'sensor.gym_current_action',
    ]);
  });

  it('resubscribes when apparentEntity changes', async () => {
    // Apparent is an optional overlay; switching zones (e.g. Insights
    // tab swapping the device) must tear down + reopen so the chart
    // doesn't keep streaming the old zone's apparent series.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.apparentEntity = 'sensor.living_apparent_temperature';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[1].message.entity_ids).toContain('sensor.living_apparent_temperature');
  });

  it('resubscribes when humidityEntity changes', async () => {
    // Symmetric with the apparent test above. Also covers the case
    // where the user wires a humidity sensor on a previously dry zone:
    // the chart picks up the new entity on the next refresh.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(1);

    el.humidityEntity = 'sensor.gym_humidity_v2';
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(sub.callCount).toBe(2);
    expect(sub.subscriptions[1].message.entity_ids).toContain('sensor.gym_humidity_v2');
  });

  it('renders Apparent + Humidity legend entries only when those props are set', async () => {
    // Legend reflects what the chart is actually drawing. Empty
    // overlays must NOT advertise themselves; otherwise a swatch
    // without a series is confusing.
    //
    // We force the chart out of its loading state directly instead of
    // emitting subscription data — emitting would trigger `_renderPlot`
    // and a uPlot construction, whose deferred initial commit can fire
    // AFTER teardown nulls the canvas (uPlot has no public API to
    // synchronously flush pending draws). The legend itself depends
    // only on the `_loading` / `_empty` / `_error` `@state` fields,
    // not on uPlot — so this gets us identical Lit render coverage
    // without the asynchronous-cleanup race.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;
    const legendText = el.shadowRoot!.querySelector('.legend')!.textContent ?? '';
    expect(legendText).toContain('Apparent');
    expect(legendText).toContain('Humidity');
  });

  it('omits Apparent + Humidity legend entries when those props are empty', async () => {
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;
    const legendText = el.shadowRoot!.querySelector('.legend')!.textContent ?? '';
    expect(legendText).not.toContain('Apparent');
    expect(legendText).not.toContain('Humidity');
  });

  it('reflects the active overlays in the aria-label', async () => {
    // Screen-reader users get the same disclosure sighted users get
    // from the legend — when apparent and humidity are absent, the
    // label says so by omission; when present, the label lists them.
    const sub = captureSubscription();
    const elWith = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    const labelWith = elWith.shadowRoot!.querySelector('.chart-host')!.getAttribute('aria-label');
    expect(labelWith).toContain('apparent temperature');
    expect(labelWith).toContain('humidity');

    const elWithout = await chart({
      hass: makeHass(captureSubscription().connection),
      ...FULL_PROPS,
    });
    await new Promise((r) => setTimeout(r, 0));
    const labelWithout = elWithout
      .shadowRoot!.querySelector('.chart-host')!
      .getAttribute('aria-label');
    expect(labelWithout).not.toContain('apparent temperature');
    expect(labelWithout).not.toContain('humidity');
  });

  // ----- v0.8.3: per-series legend toggles -----

  it('toggles a series into the hidden set when its legend item is clicked', async () => {
    // Use the same `_loading = false` workaround as the other legend
    // tests above to bypass uPlot construction — we're asserting on
    // Lit-rendered legend state, not on the canvas. The toggle's
    // setSeries call is no-op when `_plot` is null (correct: the
    // hidden set is captured for the next plot construction).
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;

    const toggles = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.legend .toggle'));
    const apparent = toggles.find((t) => t.textContent?.includes('Apparent'));
    expect(apparent).toBeDefined();
    expect(apparent!.classList.contains('hidden')).toBe(false);
    expect(apparent!.getAttribute('aria-pressed')).toBe('false');

    apparent!.click();
    await el.updateComplete;

    expect((el as unknown as { _hiddenLabels: Set<string> })._hiddenLabels.has('Apparent')).toBe(
      true,
    );
    const apparentAfter = Array.from(
      el.shadowRoot!.querySelectorAll<HTMLElement>('.legend .toggle'),
    ).find((t) => t.textContent?.includes('Apparent'));
    expect(apparentAfter!.classList.contains('hidden')).toBe(true);
    expect(apparentAfter!.getAttribute('aria-pressed')).toBe('true');
  });

  it('removes a label from the hidden set on a second click', async () => {
    // Round-trip the toggle to confirm un-hiding works too.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;

    const findRoom = () =>
      Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.legend .toggle')).find((t) =>
        t.textContent?.includes('Room'),
      )!;

    findRoom().click();
    await el.updateComplete;
    expect((el as unknown as { _hiddenLabels: Set<string> })._hiddenLabels.has('Room')).toBe(true);

    findRoom().click();
    await el.updateComplete;
    expect((el as unknown as { _hiddenLabels: Set<string> })._hiddenLabels.has('Room')).toBe(false);
    expect(findRoom().classList.contains('hidden')).toBe(false);
  });

  it('ignores toggle clicks for labels not currently in the chart', async () => {
    // Apparent isn't wired in this scenario (FULL_PROPS, not _WITH_OVERLAYS).
    // The legend won't show an Apparent item, but the internal toggle method
    // — if called externally — should no-op for an absent series rather
    // than poison `_hiddenLabels` with a label that doesn't map to any series.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;

    // Directly invoke the internal toggle for a non-present label.
    (el as unknown as { _toggleLabel: (l: string) => void })._toggleLabel('Apparent');
    await el.updateComplete;
    expect((el as unknown as { _hiddenLabels: Set<string> })._hiddenLabels.has('Apparent')).toBe(
      false,
    );
  });

  it('persists hidden state through plot re-creation via the show: field', async () => {
    // The toggle's setSeries call is no-op when the plot is null
    // (loading, or just after _destroyPlot during a zone-shape switch).
    // The hidden set is captured in _hiddenLabels and applied at the
    // next _buildOpts call via the `show: !this._hiddenLabels.has(...)`
    // line on each toggleable series. If someone removes those lines,
    // a hidden series would silently reappear on the next plot
    // construction — this test pins the regression.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;

    // Hide Apparent via the public toggle path.
    const findApparent = () =>
      Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.legend .toggle')).find((t) =>
        t.textContent?.includes('Apparent'),
      )!;
    findApparent().click();
    await el.updateComplete;

    // Inspect what _buildOpts would emit if it ran now (e.g. fresh
    // plot construction). The series array should mark Apparent as
    // show: false.
    const opts = (
      el as unknown as {
        _buildOpts: (w: number) => { series: { label?: string; show?: boolean }[] };
      }
    )._buildOpts(400);
    const apparentSeries = opts.series.find((s) => s.label === 'Apparent');
    expect(apparentSeries).toBeDefined();
    expect(apparentSeries!.show).toBe(false);
    // Sanity: a non-hidden series remains show: true (or undefined,
    // which uPlot treats as visible by default — but our code sets
    // it explicitly).
    const roomSeries = opts.series.find((s) => s.label === 'Room');
    expect(roomSeries!.show).toBe(true);
  });

  it('responds to keyboard activation (Enter / Space) on a toggle', async () => {
    // WAI-ARIA button pattern: Enter and Space must activate the
    // toggle the same way a mouse click does, so keyboard users get
    // the same control. Sanity-check both keys.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;

    const findHumidity = () =>
      Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.legend .toggle')).find((t) =>
        t.textContent?.includes('Humidity'),
      )!;

    findHumidity().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect((el as unknown as { _hiddenLabels: Set<string> })._hiddenLabels.has('Humidity')).toBe(
      true,
    );

    findHumidity().dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    expect((el as unknown as { _hiddenLabels: Set<string> })._hiddenLabels.has('Humidity')).toBe(
      false,
    );
  });

  // Smoke check: stubConnection still satisfies HomeAssistant type for
  // tests that don't exercise the subscription path.
  it('compiles against the stubConnection no-op helper', async () => {
    const el = await chart({ hass: makeHass(stubConnection()), roomEntity: '' });
    expect(el.shadowRoot!.textContent).toContain('No room temperature');
  });

  // ----- v0.8.4: linear band paths -----

  it('renders the Low / High band series as linear (no stepped paths)', async () => {
    // v0.8.4 dropped `paths: STEPPED_PATHS` on the band series so the
    // backend's v0.10.0 ramp smoothing displays as a smooth curve
    // instead of a fine staircase. This test pins that decision so a
    // future "let's bring back stepped for X" change doesn't silently
    // revert the v0.10.0 visual.
    const sub = captureSubscription();
    const el = await chart({ hass: makeHass(sub.connection), ...FULL_PROPS_WITH_OVERLAYS });
    await new Promise((r) => setTimeout(r, 0));
    (el as unknown as { _loading: boolean })._loading = false;
    await el.updateComplete;

    const opts = (
      el as unknown as {
        _buildOpts: (w: number) => { series: { label?: string; paths?: unknown }[] };
      }
    )._buildOpts(400);
    const lowSeries = opts.series.find((s) => s.label === 'Low band');
    const highSeries = opts.series.find((s) => s.label === 'High band');
    expect(lowSeries).toBeDefined();
    expect(highSeries).toBeDefined();
    expect(lowSeries!.paths).toBeUndefined();
    expect(highSeries!.paths).toBeUndefined();
  });
});
