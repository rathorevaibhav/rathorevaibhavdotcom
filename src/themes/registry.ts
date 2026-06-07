import type { Theme, ThemeId } from "./types";

// Each theme is a dynamic import → code-split per theme.
export const themeRegistry: Record<ThemeId, () => Promise<{ default: Theme }>> = {
  aurora: () => import("./aurora"),
};

export const availableThemeIds: ThemeId[] = Object.keys(themeRegistry);
export const DEFAULT_THEME_ID: ThemeId = "aurora";
