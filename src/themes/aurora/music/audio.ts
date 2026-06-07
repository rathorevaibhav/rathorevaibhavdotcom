// Karplus-Strong plucked-string synthesis. `ksSamples` is pure + testable;
// StringAudio wraps Web Audio for actual playback (browser only).

export function ksSamples(freq: number, dur: number, decay: number, sampleRate: number): Float32Array {
  const N = Math.max(2, Math.round(sampleRate / freq));
  const len = Math.floor(dur * sampleRate);
  const d = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    if (i < N) d[i] = Math.random() * 2 - 1;
    else d[i] = decay * 0.5 * (d[i - N] + d[i - N + 1]);
  }
  return d;
}

export class StringAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  private ensure(): AudioContext {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** Pluck a note. bright=true → mandolin (paired detuned strings, quicker decay). */
  pluck(freq: number, opts?: { bright?: boolean; dur?: number; decay?: number }): void {
    const ctx = this.ensure();
    const bright = opts?.bright ?? false;
    const dur = opts?.dur ?? (bright ? 1.9 : 2.9);
    const decay = opts?.decay ?? (bright ? 0.9958 : 0.9974);
    const out = ctx.createGain();
    out.gain.value = bright ? 0.4 : 0.58;
    out.connect(this.master!);
    const freqs = bright ? [freq * 0.997, freq * 1.003] : [freq];
    for (const f of freqs) {
      const data = ksSamples(f, dur, decay, ctx.sampleRate);
      const buffer = ctx.createBuffer(1, data.length, ctx.sampleRate);
      buffer.copyToChannel(data, 0);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(out);
      src.start();
    }
  }
}
