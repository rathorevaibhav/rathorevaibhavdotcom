// Geometry ported verbatim from the approved interactive mockup.
// Strings fan from nut x → bridge x; mandolin courses are paired (pair: true).

export interface StringSpec { nut: number; brg: number; freq: number; pair?: boolean; bright?: boolean; trem?: boolean; }
export interface HLine { x1: number; y: number; x2: number; }
export interface InstrumentConfig {
  id: "guitar" | "mandolin";
  viewBox: string;
  heightPx: number;                 // rendered svg height (mandolin smaller → real size ratio)
  outlinePaths: string[];           // headstock + body (class "outline")
  fretboardPath: string;            // the neck (class "fb")
  slots?: { x: number; y: number; w: number; h: number }[]; // slotted-headstock cutouts
  pegs: { cx: number; cy: number; r: number }[];
  nut: HLine;
  frets: HLine[];
  holes: { cx: number; cy: number; r: number; rosette?: number }[];
  bridge: { x: number; y: number; w: number; h: number };
  tail?: string;                    // mandolin tailpiece
  tailStrings?: { centers: number[]; yTop: number; yBot: number };
  strings: StringSpec[];            // each = one course
  stringY: [number, number];        // [yNut, yBridge]
  hit: { min: number; max: number };
}

export const GUITAR: InstrumentConfig = {
  id: "guitar",
  viewBox: "0 0 200 520",
  heightPx: 450,
  outlinePaths: [
    "M86,22 L114,22 L116,68 L84,68 Z", // slotted classical headstock
    "M100,300 C70,300 44,318 38,352 C33,378 44,388 46,400 C30,430 26,470 40,494 C56,512 80,514 100,514 C120,514 144,512 160,494 C174,470 170,430 154,400 C156,388 166,380 168,360 C169,344 160,332 146,330 C134,328 128,318 122,308 C114,302 108,300 100,300 Z",
  ],
  fretboardPath: "M87,69 L113,69 L116,302 L84,302 Z",
  slots: [
    { x: 90, y: 30, w: 7, h: 30 },
    { x: 103, y: 30, w: 7, h: 30 },
  ],
  pegs: [
    { cx: 86, cy: 36, r: 1.8 }, { cx: 86, cy: 45, r: 1.8 }, { cx: 86, cy: 54, r: 1.8 },
    { cx: 114, cy: 36, r: 1.8 }, { cx: 114, cy: 45, r: 1.8 }, { cx: 114, cy: 54, r: 1.8 },
  ],
  nut: { x1: 86, y: 69, x2: 114 },
  frets: [
    { x1: 86, y: 118, x2: 114 },
    { x1: 85.4, y: 166, x2: 114.6 },
    { x1: 84.9, y: 214, x2: 115.1 },
    { x1: 84.5, y: 258, x2: 115.5 },
  ],
  holes: [{ cx: 100, cy: 362, r: 25, rosette: 30 }],
  bridge: { x: 72, y: 426, w: 56, h: 13 },
  strings: [
    { nut: 90, brg: 82, freq: 82.41 },
    { nut: 94, brg: 89, freq: 110.0 },
    { nut: 98, brg: 96, freq: 146.83 },
    { nut: 102, brg: 104, freq: 196.0 },
    { nut: 106, brg: 111, freq: 246.94 },
    { nut: 110, brg: 118, freq: 329.63 },
  ],
  stringY: [70, 432],
  hit: { min: 78, max: 122 },
};

export const MANDOLIN: InstrumentConfig = {
  id: "mandolin",
  viewBox: "0 0 200 520",
  heightPx: 375,
  outlinePaths: [
    "M86,20 L114,20 L116,62 L84,62 Z", // headstock
    "M100,258 C128,258 176,306 176,365 C176,410 142,446 100,446 C58,446 24,410 24,365 C24,306 72,258 100,258 Z", // A-style egg body
  ],
  fretboardPath: "M87,63 L113,63 L115,300 L85,300 Z", // extends over the body toward the soundhole
  pegs: [
    { cx: 86, cy: 28, r: 1.7 }, { cx: 86, cy: 36, r: 1.7 }, { cx: 86, cy: 44, r: 1.7 }, { cx: 86, cy: 52, r: 1.7 },
    { cx: 114, cy: 28, r: 1.7 }, { cx: 114, cy: 36, r: 1.7 }, { cx: 114, cy: 44, r: 1.7 }, { cx: 114, cy: 52, r: 1.7 },
  ],
  nut: { x1: 86, y: 63, x2: 114 },
  frets: [
    { x1: 86, y: 108, x2: 114 },
    { x1: 85.6, y: 152, x2: 114.4 },
    { x1: 85.2, y: 196, x2: 114.8 },
    { x1: 84.8, y: 248, x2: 115.2 },
  ],
  holes: [{ cx: 100, cy: 322, r: 19, rosette: 24 }],
  bridge: { x: 74, y: 392, w: 52, h: 10 },
  tail: "M88,420 L112,420 L108,442 L92,442 Z",
  tailStrings: { centers: [90, 96, 104, 110], yTop: 402, yBot: 420 },
  strings: [
    { nut: 93, brg: 90, freq: 196.0, pair: true, bright: true, trem: true },
    { nut: 98, brg: 96, freq: 293.66, pair: true, bright: true, trem: true },
    { nut: 103, brg: 104, freq: 440.0, pair: true, bright: true, trem: true },
    { nut: 108, brg: 110, freq: 659.25, pair: true, bright: true, trem: true },
  ],
  stringY: [63, 397],
  hit: { min: 86, max: 114 },
};
