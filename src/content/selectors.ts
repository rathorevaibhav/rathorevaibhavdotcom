import { books, movies, musicFavorites } from "./index";
import type { Book, Movie, MusicFavorite } from "./types";

export function getLatestBook(): Book {
  return books[0];
}
export function getRecentMovie(): Movie {
  return movies.find((m) => m.recent) ?? movies[0];
}
export function getCurrentTrack(): MusicFavorite | undefined {
  const t = musicFavorites.onRepeat[0];
  return t && t.title !== "—" ? t : undefined;
}
export function getCurrently(): { book: Book; movie: Movie; track?: MusicFavorite } {
  return { book: getLatestBook(), movie: getRecentMovie(), track: getCurrentTrack() };
}
