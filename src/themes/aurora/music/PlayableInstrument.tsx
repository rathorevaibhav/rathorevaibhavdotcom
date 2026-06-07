import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { StringAudio } from "./audio";
import type { InstrumentConfig } from "./instrumentConfigs";

const audio = new StringAudio();

export function PlayableInstrument({ config }: { config: InstrumentConfig }) {
  const reduced = useReducedMotion();
  const tremRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const t = tremRef.current;
    return () => { Object.values(t).forEach((id) => window.clearInterval(id)); };
  }, []);

  const [y1, y2] = config.stringY;
  const n = config.strings.length;
  const bw = (config.hit.max - config.hit.min) / n;

  function pluck(i: number) {
    const s = config.strings[i];
    audio.pluck(s.freq, { bright: s.bright });
    const g = document.getElementById(`${config.id}-str-${i}`);
    if (g && !reduced) { g.classList.remove("pluck"); void g.getBoundingClientRect(); g.classList.add("pluck"); }
  }
  function startTrem(i: number) {
    const s = config.strings[i];
    if (!s.trem || tremRef.current[i]) return;
    const g = document.getElementById(`${config.id}-str-${i}`);
    if (g && !reduced) g.classList.add("trem");
    tremRef.current[i] = window.setInterval(() => audio.pluck(s.freq, { bright: true, dur: 0.17, decay: 0.99 }), 70);
  }
  function stopTrem(i: number) {
    if (tremRef.current[i]) { window.clearInterval(tremRef.current[i]); delete tremRef.current[i]; }
    const g = document.getElementById(`${config.id}-str-${i}`);
    if (g) g.classList.remove("trem", "pluck");
  }

  return (
    <svg viewBox={config.viewBox} style={{ height: config.heightPx, width: "auto" }} className="instrument-svg overflow-visible" aria-label={`Line-art ${config.id}`} role="img">
      {config.outlinePaths.map((d, i) => <path key={i} d={d} className={`outline ${reduced ? "" : "draw"}`} />)}
      {config.holes.map((h, i) => (
        <g key={i}>
          {h.rosette && <circle cx={h.cx} cy={h.cy} r={h.rosette} className="rosette" />}
          <circle cx={h.cx} cy={h.cy} r={h.r} className="hole" />
        </g>
      ))}
      <rect x={config.bridge.x} y={config.bridge.y} width={config.bridge.w} height={config.bridge.h} rx={3} className="bridge" />
      {config.strings.map((s, i) => (
        <g key={i} id={`${config.id}-str-${i}`} className="string">
          {s.xs.map((x, j) => <line key={j} x1={x} y1={y1} x2={x} y2={y2} className="vis" />)}
        </g>
      ))}
      {config.strings.map((s, i) => {
        const cx = config.hit.min + (i + 0.5) * bw;
        return (
          <line key={`hit-${i}`} data-hit x1={cx} y1={y1 - 8} x2={cx} y2={y2 + 8}
            stroke="transparent" strokeWidth={bw} style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`Pluck ${config.id} string ${i + 1}`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pluck(i); } }}
            onPointerEnter={() => pluck(i)}
            onPointerDown={() => { pluck(i); if (s.trem) startTrem(i); }}
            onPointerUp={() => stopTrem(i)}
            onPointerLeave={() => stopTrem(i)}
            onPointerCancel={() => stopTrem(i)} />
        );
      })}
    </svg>
  );
}
