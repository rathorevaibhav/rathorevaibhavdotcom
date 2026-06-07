import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Theme } from "./types";
import { themeRegistry, availableThemeIds, DEFAULT_THEME_ID } from "./registry";
import { selectThemeId, readStoredTheme, storeTheme } from "./resolver";

export function ActiveThemeProvider() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const id = selectThemeId({
      search: window.location.search,
      stored: readStoredTheme(),
      available: availableThemeIds,
      fallback: DEFAULT_THEME_ID,
    });
    storeTheme(id);
    let alive = true;
    themeRegistry[id]().then((mod) => { if (alive) setTheme(mod.default); });
    return () => { alive = false; };
  }, []);

  if (!theme) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">…</div>;
  }

  const { Layout, pages } = theme;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<pages.home />} />
        <Route path="/work" element={<pages.work />} />
        <Route path="/books" element={<pages.books />} />
        <Route path="/books/:id" element={<pages.bookDetail />} />
        <Route path="/movies" element={<pages.movies />} />
        <Route path="/music" element={<pages.music />} />
        <Route path="*" element={<pages.notFound />} />
      </Route>
    </Routes>
  );
}
