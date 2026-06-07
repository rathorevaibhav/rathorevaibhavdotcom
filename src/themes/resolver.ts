import type { ThemeId } from "./types";

const STORAGE_KEY = "theme";

export function selectThemeId(opts: {
  search: string;
  stored: string | null;
  available: ThemeId[];
  fallback: ThemeId;
}): ThemeId {
  const { search, stored, available, fallback } = opts;
  const fromQuery = new URLSearchParams(search).get("theme");
  if (fromQuery && available.includes(fromQuery)) return fromQuery;
  if (stored && available.includes(stored)) return stored;
  return fallback;
}

export function readStoredTheme(): string | null {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
export function storeTheme(id: ThemeId): void {
  try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
}
