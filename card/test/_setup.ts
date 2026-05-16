/**
 * Vitest setup — stubs browser APIs that jsdom doesn't provide but uPlot
 * (transitively imported by history-chart.ts) reads at module load.
 */

// Unconditionally — jsdom's matchMedia (when present) returns undefined-ish
// for unknown queries, which uPlot then crashes on. We need a callable.
(window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia = (
  query: string,
): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

// uPlot also reads `devicePixelRatio` at module load.
if (!('devicePixelRatio' in window) || !window.devicePixelRatio) {
  Object.defineProperty(window, 'devicePixelRatio', { value: 1, configurable: true });
}

// ResizeObserver isn't in jsdom either; provide a no-op.
if (!('ResizeObserver' in window)) {
  (window as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
    class StubResizeObserver {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    } as unknown as typeof ResizeObserver;
}

// jsdom doesn't implement Pointer Events fully — `setPointerCapture` /
// `releasePointerCapture` throw "Not implemented." No-op them so drag tests
// using these APIs (e.g. `schedule-chart`) don't need per-test stubbing.
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = function () {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = function () {};
}
