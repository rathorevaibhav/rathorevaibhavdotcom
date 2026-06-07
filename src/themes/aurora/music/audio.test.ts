import { describe, it, expect } from "vitest";
import { ksSamples } from "./audio";

describe("ksSamples (Karplus-Strong)", () => {
  it("produces a decaying buffer of the requested length", () => {
    const sr = 44100;
    const buf = ksSamples(220, 0.5, 0.996, sr);
    expect(buf.length).toBe(Math.floor(0.5 * sr));
    // energy in the first 10ms should exceed the last 10ms (it decays)
    const w = Math.floor(0.01 * sr);
    const energy = (a: Float32Array, s: number) => { let e = 0; for (let i = s; i < s + w; i++) e += a[i] * a[i]; return e; };
    expect(energy(buf, 0)).toBeGreaterThan(energy(buf, buf.length - w));
  });
});
