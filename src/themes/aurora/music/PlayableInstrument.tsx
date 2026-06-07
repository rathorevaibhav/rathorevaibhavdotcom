import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { StringAudio } from "./audio";
import type { InstrumentConfig } from "./instrumentConfigs";

const audio = new StringAudio();

export function PlayableInstrument({ config }: { config: InstrumentConfig }) {
  const reduced = useReducedMotion();
  const timers = useRef<Record<number, { delay?: number; interval?: number }>>({});

  useEffect(() => {
    const t = timers.current;
    return () => {
      Object.values(t).forEach((x) => {
        if (x.delay) window.clearTimeout(x.delay);
        if (x.interval) window.clearInterval(x.interval);
      });
    };
  }, []);

  const [y1, y2] = config.stringY;
  const n = config.strings.length;
  const bw = (config.hit.max - config.hit.min) / n;
  const draw = reduced ? "" : "draw";

  const group = (i: number) => document.getElementById(`${config.id}-str-${i}`);

  function pluck(i: number) {
    const s = config.strings[i];
    audio.pluck(s.freq, { bright: s.bright });
    const g = group(i);
    if (g && !reduced) { g.classList.remove("pluck"); void g.getBoundingClientRect(); g.classList.add("pluck"); }
  }
  function press(i: number) {
    pluck(i);
    const s = config.strings[i];
    if (!s.trem) return;
    const t = (timers.current[i] ||= {});
    t.delay = window.setTimeout(() => {
      const g = group(i);
      if (g && !reduced) g.classList.add("trem");
      t.interval = window.setInterval(() => audio.pluck(s.freq, { bright: true, dur: 0.17, decay: 0.99 }), 70);
    }, 150);
  }
  function release(i: number) {
    const t = timers.current[i];
    if (t) {
      if (t.delay) window.clearTimeout(t.delay);
      if (t.interval) window.clearInterval(t.interval);
      delete timers.current[i];
    }
    const g = group(i);
    if (g) g.classList.remove("trem", "pluck");
  }

  return (
    <svg viewBox={config.viewBox} style={{ height: config.heightPx, width: "auto" }} className="instrument-svg overflow-visible" role="img" aria-label={`Line-art ${config.id}`}>
      {config.outlinePaths.map((d, i) => <path key={`o${i}`} className={`edge ${draw}`} d={d} />)}
      <path className={`fb ${draw}`} d={config.fretboardPath} />
      {config.frets.map((f, i) => <line key={`f${i}`} className="fret" x1={f.x1} y1={f.y} x2={f.x2} y2={f.y} />)}
      <line className="nut" x1={config.nut.x1} y1={config.nut.y} x2={config.nut.x2} y2={config.nut.y} />
      {config.slots?.map((s, i) => <rect key={`sl${i}`} className="slot" x={s.x} y={s.y} width={s.w} height={s.h} rx={3} />)}
      {config.pegs.map((p, i) => <circle key={`p${i}`} className="peg" cx={p.cx} cy={p.cy} r={p.r} />)}
      {config.holes.map((h, i) => (
        <g key={`h${i}`}>
          {h.rosette ? <circle className="rosette" cx={h.cx} cy={h.cy} r={h.rosette} /> : null}
          <circle className="hole" cx={h.cx} cy={h.cy} r={h.r} />
        </g>
      ))}
      <rect className="bridge" x={config.bridge.x} y={config.bridge.y} width={config.bridge.w} height={config.bridge.h} rx={2.5} />
      {config.tail ? <path className="tail" d={config.tail} /> : null}
      {config.tailStrings
        ? config.tailStrings.centers.flatMap((c, i) => {
            const { yTop, yBot } = config.tailStrings!;
            const bx = 100 - (100 - c) * 0.3;
            return [
              <line key={`t${i}a`} className="tailstr" x1={c - 1.6} y1={yTop} x2={bx} y2={yBot} />,
              <line key={`t${i}b`} className="tailstr" x1={c + 1.6} y1={yTop} x2={bx} y2={yBot} />,
            ];
          })
        : null}
      {config.strings.map((s, i) => (
        <g key={`g${i}`} id={`${config.id}-str-${i}`} className="string">
          {s.pair ? (
            <>
              <line className="vis" x1={s.nut - 1.2} y1={y1} x2={s.brg - 1.6} y2={y2} />
              <line className="vis" x1={s.nut + 1.2} y1={y1} x2={s.brg + 1.6} y2={y2} />
            </>
          ) : (
            <line className="vis" x1={s.nut} y1={y1} x2={s.brg} y2={y2} />
          )}
        </g>
      ))}
      {config.strings.map((s, i) => (
        <rect
          key={`hit${i}`}
          data-hit
          role="button"
          tabIndex={0}
          aria-label={`Pluck ${config.id} string ${i + 1}`}
          x={config.hit.min + i * bw}
          y={y1 - 8}
          width={bw}
          height={y2 - y1 + 16}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onPointerEnter={() => pluck(i)}
          onPointerDown={() => press(i)}
          onPointerUp={() => release(i)}
          onPointerLeave={() => release(i)}
          onPointerCancel={() => release(i)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pluck(i); } }}
        />
      ))}
    </svg>
  );
}
