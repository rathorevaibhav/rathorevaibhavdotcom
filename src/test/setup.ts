import "@testing-library/jest-dom/vitest";

// jsdom does not implement matchMedia; polyfill it so components that gate on
// media queries (e.g. prefers-reduced-motion) render in tests. Defaults to
// matches: false (i.e. no reduced-motion preference).
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// jsdom does not implement ResizeObserver; provide a no-op so libraries that
// construct one on mount (e.g. Lenis smooth-scroll) don't throw in tests.
if (typeof globalThis !== "undefined" && !("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as typeof ResizeObserver;
}
