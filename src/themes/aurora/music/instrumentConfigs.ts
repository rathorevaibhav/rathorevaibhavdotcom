export interface StringSpec { xs: number[]; freq: number; bright?: boolean; trem?: boolean; }
export interface InstrumentConfig {
  id: "guitar" | "mandolin";
  viewBox: string;
  heightPx: number;        // rendered svg height (mandolin smaller → real size ratio)
  outlinePaths: string[];  // body/neck/headstock outline <path d> strings
  holes: { cx: number; cy: number; r: number; rosette?: number }[];
  bridge: { x: number; y: number; w: number; h: number };
  strings: StringSpec[];   // each = one course; xs may hold 1 (guitar) or 2 (mandolin pair) visible lines
  stringY: [number, number];
  hit: { min: number; max: number };
}

export const GUITAR: InstrumentConfig = {
  id: "guitar", viewBox: "0 0 200 520", heightPx: 450,
  outlinePaths: [
    "M70,18 L170,18 L184,58 L54,58 Z",                       // headstock
    "M120,300 C70,300 44,318 38,352 C33,378 44,388 46,400 C30,430 26,470 40,494 C56,512 80,514 100,514 C120,514 144,512 160,494 C174,470 170,430 154,400 C156,388 166,380 168,360 C169,344 160,332 146,330 C134,328 128,318 122,308 C114,302 108,300 100,300 Z", // dreadnought-ish body
  ],
  holes: [{ cx: 100, cy: 346, r: 30, rosette: 36 }],
  bridge: { x: 80, y: 382, w: 80, h: 13 },
  strings: [
    { xs: [64], freq: 82.41 }, { xs: [86], freq: 110.0 }, { xs: [108], freq: 146.83 },
    { xs: [130], freq: 196.0 }, { xs: [152], freq: 246.94 }, { xs: [174], freq: 329.63 },
  ],
  stringY: [46, 384], hit: { min: 78, max: 122 },
};

export const MANDOLIN: InstrumentConfig = {
  id: "mandolin", viewBox: "0 0 200 520", heightPx: 375,
  outlinePaths: [
    "M74,18 L166,18 L174,58 L66,58 Z",                       // headstock
    "M100,258 C128,258 176,306 176,365 C176,410 142,446 100,446 C58,446 24,410 24,365 C24,306 72,258 100,258 Z", // A-style egg body
  ],
  holes: [{ cx: 100, cy: 322, r: 19, rosette: 24 }],
  bridge: { x: 76, y: 392, w: 48, h: 10 },
  strings: [
    { xs: [80.5, 87.5], freq: 196.0, bright: true, trem: true },
    { xs: [104.5, 111.5], freq: 293.66, bright: true, trem: true },
    { xs: [128.5, 135.5], freq: 440.0, bright: true, trem: true },
    { xs: [152.5, 159.5], freq: 659.25, bright: true, trem: true },
  ],
  stringY: [46, 358], hit: { min: 86, max: 114 },
};
