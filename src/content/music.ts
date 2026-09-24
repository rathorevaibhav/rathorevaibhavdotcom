import type { Instrument, MusicFavorite } from "./types";
export const instruments: Instrument[] = [
  { id: "guitar", name: "Guitar", meta: "Classical / cutaway · standard tuning", note: "Six strings, endless rabbit holes — mostly fingerstyle, working songs out by ear." },
  { id: "mandolin", name: "Mandolin", meta: "A-style · GDAE, doubled", note: "Eight strings in four courses, tuned in fifths — bright, quick, a different headspace from guitar." },
];
export const musicFavorites: { onRepeat: MusicFavorite[]; allTime: MusicFavorite[] } = {
  onRepeat: [{ title: "—", artist: "—" }],
  allTime: [],
};
