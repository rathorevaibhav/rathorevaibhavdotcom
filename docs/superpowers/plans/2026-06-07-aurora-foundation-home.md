# Aurora Foundation + Home — Implementation Plan (Plan 1 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the portfolio to the light-first "Aurora" look and rebuild the Home page (with the Spotlight 3D hero and Apple-style scroll motion), on a theme-ready architecture where Aurora is "theme #1".

**Architecture:** Content is centralized in a typed `src/content/` layer (single source of truth). Each visual theme lives in `src/themes/<id>/` and provides a `Layout` (with `<Outlet/>`) plus a page component per route. A registry maps theme id → lazily-imported theme module; a resolver picks the active theme from `?theme=` / localStorage / default. The app renders the active theme's Layout + pages. Aurora is the only theme now; the structure makes adding more themes + A/B selection later low-rework. Stays a Vite SPA.

**Tech Stack:** Vite + React 18 + TypeScript + Tailwind + shadcn/ui + React Router (existing). Adds: `three` + `@react-three/fiber` + `@react-three/drei` (hero orb, lazy), `framer-motion` (reveals/transitions), `lenis` (smooth scroll), `@fontsource/inter`. Tests via Vitest + React Testing Library.

**Plan sequence:** This is Plan 1 of 3. Plan 2 = remaining pages (Work, Books, Movies, full Music page). Plan 3 = polish (orb refinement, perf/a11y pass, SEO + Lovable cleanup, content fill-in).

**Branch:** Work continues on `rebrand/aurora-theme` (already created; the design spec is committed there).

**Manual verification convention:** Visual steps say `Run: npm run dev` and open `http://localhost:8080`. Logic is covered by Vitest (`npm test`).

---

## File structure (created/modified in this plan)

**Created**
- `src/test/setup.ts` — Vitest + jest-dom setup
- `src/content/types.ts` — content types (Profile, WorkEntry, Movie, Instrument, MusicFavorite, NavLink, SocialLink)
- `src/content/profile.ts`, `links.ts`, `hobbies.ts`, `interests.ts`, `work.ts`, `movies.ts`, `music.ts` — content data
- `src/content/index.ts` — aggregates + re-exports `books`
- `src/content/selectors.ts` — `getLatestBook`, `getRecentMovie`, `getCurrentTrack`, `getCurrently`
- `src/content/selectors.test.ts`
- `src/themes/types.ts` — `Theme`, `ThemeId`, `RouteKey`
- `src/themes/registry.ts` — `themeRegistry`, `availableThemeIds`, `DEFAULT_THEME_ID`
- `src/themes/resolver.ts` — `selectThemeId`, `readStoredTheme`, `storeTheme`
- `src/themes/resolver.test.ts`
- `src/themes/ActiveThemeProvider.tsx` — loads active theme, builds routes
- `src/themes/aurora/index.ts` — Aurora theme manifest
- `src/themes/aurora/Layout.tsx` — Aurora shell (sticky nav + footer + `<Outlet/>`)
- `src/themes/aurora/components/Container.tsx`
- `src/themes/aurora/components/Reveal.tsx` — scroll-reveal wrapper
- `src/themes/aurora/components/SmoothScroll.tsx` — Lenis provider
- `src/themes/aurora/components/ErrorBoundary.tsx`
- `src/themes/aurora/hero/OrbScene.tsx` — R3F orb (lazy)
- `src/themes/aurora/hero/SpotlightHero.tsx`
- `src/themes/aurora/pages/Home.tsx`
- `src/themes/aurora/pages/CurrentlyStrip.tsx`
- `src/themes/aurora/pages/MusicPlaceholder.tsx`
- `src/themes/aurora/Layout.test.tsx`, `src/themes/aurora/pages/Home.test.tsx`

**Modified**
- `package.json` — deps + `test` script
- `vite.config.ts` — Vitest config (jsdom, alias, setup)
- `src/index.css` — Aurora tokens, Inter, motion base
- `tailwind.config.ts` — Inter font, Aurora color/shadow tokens
- `src/App.tsx` — render through `ActiveThemeProvider`
- `src/pages/Index.tsx` → replaced by Aurora Home routing (kept as legacy import target only if needed)
- `src/pages/Work.tsx`, `Books.tsx`, `BookDetail.tsx`, `Movies.tsx`, `NotFound.tsx` — strip internal `<Layout>` so they render content-only inside the theme shell

---

## Task 1: Dependencies + Vitest test harness

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/sanity.test.ts`

- [ ] **Step 1: Install runtime + dev dependencies**

Run:
```bash
npm install three @react-three/fiber @react-three/drei framer-motion lenis @fontsource/inter
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/three
```
Expected: installs succeed; `package.json` dependencies updated.

- [ ] **Step 2: Add the `test` script to `package.json`**

In `package.json` `"scripts"`, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Configure Vitest in `vite.config.ts`**

Replace the file with (note import is now from `vitest/config`):
```ts
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
}));
```

- [ ] **Step 4: Create the test setup file**

Create `src/test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Write a sanity test**

Create `src/test/sanity.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: PASS (1 test passed).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/test/
git commit -m "chore: add 3D/motion deps and Vitest test harness"
```

---

## Task 2: Aurora design tokens (CSS variables, Tailwind, Inter)

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Import Inter in `src/main.tsx`**

Replace `src/main.tsx` with:
```tsx
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

- [ ] **Step 2: Rewrite `src/index.css` with Aurora tokens**

Replace the entire file with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Aurora — light-first. HSL triples (no hsl() wrapper) for shadcn compatibility. */
    --background: 0 0% 100%;           /* #FFFFFF */
    --foreground: 231 56% 12%;         /* #0D1230 ink */
    --surface: 226 50% 97%;            /* #F4F6FB */
    --surface-2: 224 52% 95%;          /* #EAEEF9 */
    --card: 0 0% 100%;
    --card-foreground: 231 56% 12%;
    --popover: 0 0% 100%;
    --popover-foreground: 231 56% 12%;
    --primary: 230 100% 62%;           /* #3B5BFF indigo accent */
    --primary-foreground: 0 0% 100%;
    --secondary: 226 50% 97%;
    --secondary-foreground: 231 56% 12%;
    --muted: 226 50% 97%;
    --muted-foreground: 233 16% 41%;   /* #55597A ink-soft */
    --accent: 231 100% 93%;            /* #DFE4FF tint */
    --accent-foreground: 231 56% 12%;
    --glow: 231 100% 75%;              /* #7D8BFF periwinkle glow */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 228 30% 92%;             /* #E6E8F0 hairline */
    --input: 228 30% 92%;
    --ring: 230 100% 62%;
    --radius: 1rem;
  }

  * { @apply border-border; }
  html { scroll-behavior: smooth; }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }

  /* Honor reduced motion globally */
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
}
```

- [ ] **Step 3: Update `tailwind.config.ts`**

Replace the file with:
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: { DEFAULT: "hsl(var(--surface))", 2: "hsl(var(--surface-2))" },
        glow: "hsl(var(--glow))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 4px)", sm: "calc(var(--radius) - 8px)" },
      boxShadow: {
        soft: "0 1px 2px rgba(13,18,48,.06), 0 12px 30px -16px rgba(13,18,48,.25)",
        lift: "0 1px 2px rgba(13,18,48,.06), 0 22px 46px -18px rgba(13,18,48,.35)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { "fade-up": "fade-up 0.6s ease forwards" },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

- [ ] **Step 4: Verify visually**

Run: `npm run dev` → open `http://localhost:8080`
Expected: site loads in Inter; backgrounds white, text deep navy, links/buttons indigo (current pages may look unstyled-but-functional — that's fine, they're redesigned later). No console errors about missing CSS variables.

- [ ] **Step 5: Commit**

```bash
git add src/index.css tailwind.config.ts src/main.tsx
git commit -m "feat: Aurora design tokens, Inter font, reduced-motion base"
```

---

## Task 3: Content layer + selectors (TDD)

**Files:**
- Create: `src/content/types.ts`, `profile.ts`, `links.ts`, `hobbies.ts`, `interests.ts`, `work.ts`, `movies.ts`, `music.ts`, `index.ts`, `selectors.ts`
- Create: `src/content/selectors.test.ts`

- [ ] **Step 1: Create content types**

Create `src/content/types.ts`:
```ts
import type { Book } from "@/lib/types";
export type { Book };

export interface Profile {
  name: string;
  role: string;
  org: string;
  tagline: string;
  headline: string;       // hero headline
  subhead: string;        // hero subhead
}
export interface WorkEntry { year: string; title: string; org?: string; description: string; }
export interface Movie { title: string; year: number; director?: string; genre: string[]; image?: string; recent?: boolean; }
export interface Instrument { id: "guitar" | "mandolin"; name: string; meta: string; note: string; }
export interface MusicFavorite { title: string; artist: string; }
export interface NavLink { title: string; path: string; external?: boolean; }
export interface SocialLink { label: string; href: string; icon: "linkedin" | "github" | "instagram" | "coloredcow"; }
```

- [ ] **Step 2: Create profile + links + hobbies + interests**

Create `src/content/profile.ts`:
```ts
import type { Profile } from "./types";
export const profile: Profile = {
  name: "Vaibhav Rathore",
  role: "Software Engineer",
  org: "ColoredCow",
  tagline: "Engineer, avid reader, and music enthusiast.",
  headline: "Building products that make an impact.",
  subhead: "Software engineer at ColoredCow — and an avid reader, film lover, and someone who actually plays the instruments on the Music page.",
};
```
Create `src/content/links.ts`:
```ts
import type { NavLink, SocialLink } from "./types";
export const navLinks: NavLink[] = [
  { title: "Home", path: "/" },
  { title: "Work", path: "/work" },
  { title: "Books", path: "/books" },
  { title: "Movies", path: "/movies" },
  { title: "Music", path: "/music" },
  { title: "Blog", path: "https://rathorevaibhav.substack.com/", external: true },
];
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/rathorevaibhav", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/rathorevaibhav", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/rathorevaibhav", icon: "instagram" },
  { label: "ColoredCow", href: "https://coloredcow.com", icon: "coloredcow" },
];
```
Create `src/content/hobbies.ts`:
```ts
export const hobbies: string[] = [
  "Playing guitar and mandolin",
  "Reading science fiction and philosophy",
  "Watching and dissecting films",
  "Hiking and exploring the outdoors",
];
```
Create `src/content/interests.ts`:
```ts
export const interests: string[] = [
  "Web development and modern frontend",
  "UI/UX design and accessibility",
  "Open source and community building",
  "Applied AI and machine learning",
];
```

- [ ] **Step 3: Move Work + Movies data into the content layer**

Create `src/content/work.ts` (copied from the array currently in `src/pages/Work.tsx`, typed):
```ts
import type { WorkEntry } from "./types";
export const workEntries: WorkEntry[] = [
  { year: "2023", title: "Senior Software Engineer", org: "ColoredCow", description: "Led development of complex web applications using React and TypeScript. Mentored junior developers and implemented best practices." },
  { year: "2021", title: "Software Engineer", org: "ColoredCow", description: "Developed and maintained multiple client projects. Collaborated with cross-functional teams to deliver high-quality solutions." },
  { year: "2019", title: "Junior Software Engineer", org: "ColoredCow", description: "Started professional career in web development. Worked on frontend development using React and contributed to various client projects." },
];
```
Create `src/content/movies.ts` (copied from the arrays in `src/pages/Movies.tsx`; merge `recentMovies` with `recent: true`):
```ts
import type { Movie } from "./types";
export const movies: Movie[] = [
  { title: "Superboys of Malegaon", year: 2024, director: "Reema Kagti", genre: ["Biography", "Comedy", "Drama"], image: "https://m.media-amazon.com/images/M/MV5BYmJjZGFkMzktMjAxZC00ZTNiLTljMzItYzVjMTcyYWNiYWNkXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg", recent: true },
  { title: "War Dogs", year: 2016, genre: ["Comedy", "Crime", "Drama"] },
  { title: "Ready Player One", year: 2018, genre: ["Sci-Fi", "Action", "Adventure"] },
  { title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Adventure", "Drama"] },
  { title: "Top Gun: Maverick", year: 2022, genre: ["Action", "Drama"] },
  { title: "Oppenheimer", year: 2023, genre: ["Biography", "Drama", "History"] },
  { title: "The Prestige", year: 2006, genre: ["Drama", "Mystery", "Sci-Fi"] },
  { title: "The Truman Show", year: 1998, genre: ["Comedy", "Drama"] },
  { title: "Moneyball", year: 2011, genre: ["Biography", "Drama", "Sport"] },
  { title: "The Green Mile", year: 1999, genre: ["Crime", "Drama", "Fantasy"] },
];
```
> Note: the full favorites list lives in `src/pages/Movies.tsx` today; copy all entries across when migrating the Movies page in Plan 2. The subset above is enough for Home's "Currently" strip now.

- [ ] **Step 4: Create music content**

Create `src/content/music.ts`:
```ts
import type { Instrument, MusicFavorite } from "./types";
export const instruments: Instrument[] = [
  { id: "guitar", name: "Guitar", meta: "Classical / cutaway · standard tuning", note: "Six strings, endless rabbit holes — mostly fingerstyle, working songs out by ear." },
  { id: "mandolin", name: "Mandolin", meta: "A-style · GDAE, doubled", note: "Eight strings in four courses, tuned in fifths — bright, quick, a different headspace from guitar." },
];
export const musicFavorites: { onRepeat: MusicFavorite[]; allTime: MusicFavorite[] } = {
  onRepeat: [{ title: "—", artist: "—" }],
  allTime: [],
};
```
> Placeholder favorites; the user will provide real albums/artists. Instruments power both the Music page (Plan 2) and the Home "Currently" strip.

- [ ] **Step 5: Aggregate in `index.ts`**

Create `src/content/index.ts`:
```ts
import { mockBooks } from "@/data/books";
export const books = mockBooks;
export { profile } from "./profile";
export { navLinks, socialLinks } from "./links";
export { hobbies } from "./hobbies";
export { interests } from "./interests";
export { workEntries } from "./work";
export { movies } from "./movies";
export { instruments, musicFavorites } from "./music";
export * from "./types";
```

- [ ] **Step 6: Write the failing selectors test**

Create `src/content/selectors.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { getLatestBook, getRecentMovie, getCurrentTrack, getCurrently } from "./selectors";

describe("content selectors", () => {
  it("getLatestBook returns a book with a title", () => {
    expect(getLatestBook().title.length).toBeGreaterThan(0);
  });
  it("getRecentMovie returns the movie flagged recent", () => {
    expect(getRecentMovie().recent).toBe(true);
  });
  it("getCurrentTrack returns the first on-repeat track or undefined", () => {
    const t = getCurrentTrack();
    expect(t === undefined || typeof t.title === "string").toBe(true);
  });
  it("getCurrently bundles book + movie + track", () => {
    const c = getCurrently();
    expect(c.book.title.length).toBeGreaterThan(0);
    expect(c.movie.title.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 7: Run it to verify it fails**

Run: `npm test -- selectors`
Expected: FAIL ("Failed to resolve import ./selectors" or "is not a function").

- [ ] **Step 8: Implement selectors**

Create `src/content/selectors.ts`:
```ts
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
```

- [ ] **Step 9: Run tests to verify pass**

Run: `npm test -- selectors`
Expected: PASS (4 tests).

- [ ] **Step 10: Commit**

```bash
git add src/content/
git commit -m "feat: centralized content layer + Home selectors"
```

---

## Task 4: Theme contract + registry + resolver (TDD resolver)

**Files:**
- Create: `src/themes/types.ts`, `src/themes/registry.ts`, `src/themes/resolver.ts`
- Create: `src/themes/resolver.test.ts`

- [ ] **Step 1: Define the theme contract**

Create `src/themes/types.ts`:
```ts
import type { ComponentType } from "react";

export type ThemeId = string;
export type RouteKey = "home" | "work" | "books" | "bookDetail" | "movies" | "music" | "notFound";

export interface Theme {
  id: ThemeId;
  name: string;
  Layout: ComponentType;                       // renders chrome + <Outlet/>
  pages: Record<RouteKey, ComponentType>;
}
```

- [ ] **Step 2: Write the failing resolver test**

Create `src/themes/resolver.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { selectThemeId } from "./resolver";

const available = ["aurora", "noir"];

describe("selectThemeId", () => {
  it("uses ?theme= when valid", () => {
    expect(selectThemeId({ search: "?theme=noir", stored: null, available, fallback: "aurora" })).toBe("noir");
  });
  it("ignores invalid ?theme= and falls back to stored", () => {
    expect(selectThemeId({ search: "?theme=ghost", stored: "noir", available, fallback: "aurora" })).toBe("noir");
  });
  it("uses stored when no query", () => {
    expect(selectThemeId({ search: "", stored: "noir", available, fallback: "aurora" })).toBe("noir");
  });
  it("falls back to default when nothing valid", () => {
    expect(selectThemeId({ search: "", stored: "ghost", available, fallback: "aurora" })).toBe("aurora");
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- resolver`
Expected: FAIL (cannot resolve `./resolver`).

- [ ] **Step 4: Implement the resolver**

Create `src/themes/resolver.ts`:
```ts
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
```

- [ ] **Step 5: Run tests to verify pass**

Run: `npm test -- resolver`
Expected: PASS (4 tests).

- [ ] **Step 6: Create the registry (lazy theme imports)**

Create `src/themes/registry.ts`:
```ts
import type { Theme, ThemeId } from "./types";

// Each theme is a dynamic import → code-split per theme.
export const themeRegistry: Record<ThemeId, () => Promise<{ default: Theme }>> = {
  aurora: () => import("./aurora"),
};

export const availableThemeIds: ThemeId[] = Object.keys(themeRegistry);
export const DEFAULT_THEME_ID: ThemeId = "aurora";
```

- [ ] **Step 7: Commit**

```bash
git add src/themes/types.ts src/themes/registry.ts src/themes/resolver.ts src/themes/resolver.test.ts
git commit -m "feat: theme contract, registry, and resolver"
```

---

## Task 5: Strip internal Layout from legacy pages (content-only)

The Aurora shell wraps all routes via `<Outlet/>`, so legacy pages must render content only (no `<Layout>`).

**Files:**
- Modify: `src/pages/Work.tsx`, `src/pages/Books.tsx`, `src/pages/BookDetail.tsx`, `src/pages/Movies.tsx`, `src/pages/NotFound.tsx`

- [ ] **Step 1: Remove `<Layout>` wrappers**

In each file that currently wraps its content in `<Layout>`: delete the `import { Layout } ...` line and replace the outer `<Layout> ... </Layout>` with a React fragment `<> ... </>` (keep all inner content). If a file (e.g. `NotFound.tsx`) is already content-only with no `<Layout>`, leave it unchanged. Example for `src/pages/Work.tsx`:
```tsx
// remove: import { Layout } from '@/components/Layout';
const Work = () => {
  return (
    <>
      {/* ...existing inner content unchanged... */}
    </>
  );
};
export default Work;
```
Repeat identically for `Books.tsx`, `BookDetail.tsx`, `Movies.tsx`, `NotFound.tsx`.

- [ ] **Step 2: Verify they still compile**

Run: `npx tsc --noEmit`
Expected: no errors related to these files.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Work.tsx src/pages/Books.tsx src/pages/BookDetail.tsx src/pages/Movies.tsx src/pages/NotFound.tsx
git commit -m "refactor: legacy pages render content-only (theme shell owns Layout)"
```

---

## Task 6: Aurora Layout (sticky nav + footer) + Container

**Files:**
- Create: `src/themes/aurora/components/Container.tsx`
- Create: `src/themes/aurora/Layout.tsx`
- Create: `src/themes/aurora/Layout.test.tsx`

- [ ] **Step 1: Create Container + SmoothScroll**

Create `src/themes/aurora/components/Container.tsx`:
```tsx
import { cn } from "@/lib/utils";
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>{children}</div>;
}
```

Create `src/themes/aurora/components/SmoothScroll.tsx` (Lenis momentum scroll, reduced-motion aware):
```tsx
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: Write the failing Layout test**

Create `src/themes/aurora/Layout.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AuroraLayout from "./Layout";

describe("AuroraLayout", () => {
  it("renders the wordmark and nav links", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<AuroraLayout />}>
            <Route index element={<div>page body</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Vaibhav Rathore")).toBeInTheDocument();
    expect(screen.getAllByText("Work").length).toBeGreaterThan(0);
    expect(screen.getByText("page body")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- Layout`
Expected: FAIL (cannot resolve `./Layout`).

- [ ] **Step 4: Implement Aurora Layout**

Create `src/themes/aurora/Layout.tsx`:
```tsx
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Linkedin, Github, Instagram, ExternalLink, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, socialLinks } from "@/content";
import { Container } from "./components/Container";
import { SmoothScroll } from "./components/SmoothScroll";

const iconFor = { linkedin: Linkedin, github: Github, instagram: Instagram, coloredcow: ExternalLink } as const;

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navLinks.map((l) =>
        l.external ? (
          <a key={l.title} href={l.path} target="_blank" rel="noopener noreferrer"
             className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            {l.title}<ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <NavLink key={l.title} to={l.path} onClick={onNavigate} end={l.path === "/"}
            className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground")}>
            {l.title}
          </NavLink>
        )
      )}
    </>
  );
}

export default function AuroraLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <header className={cn("sticky top-0 z-50 transition-colors",
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent")}>
          <Container className="flex h-16 items-center justify-between">
            <Link to="/" className="text-base font-extrabold tracking-tight">Vaibhav Rathore</Link>
            <nav className="hidden items-center gap-7 md:flex"><NavItems /></nav>
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
                <SheetContent side="top" className="h-[100dvh]">
                  <div className="absolute right-4 top-4"><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-5 w-5" /></Button></div>
                  <div className="flex flex-col items-center gap-7 pt-16 text-lg"><NavItems onNavigate={() => setOpen(false)} /></div>
                </SheetContent>
              </Sheet>
            </div>
          </Container>
        </header>

        <main className="flex-1"><Outlet /></main>

        <footer className="mt-24 border-t border-border py-10">
          <Container className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((s) => {
                const Icon = iconFor[s.icon];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                     className="text-muted-foreground transition-colors hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--glow))]">
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vaibhav Rathore. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </SmoothScroll>
  );
}
```
> `Container` and `SmoothScroll` were both created in Step 1, so this import resolves. The Lenis smooth-scroll respects `prefers-reduced-motion`.

- [ ] **Step 5: Commit**

```bash
git add src/themes/aurora/Layout.tsx src/themes/aurora/components/Container.tsx src/themes/aurora/components/SmoothScroll.tsx src/themes/aurora/Layout.test.tsx
git commit -m "feat: Aurora layout shell (sticky blur nav + footer)"
```

---

## Task 7: Motion primitives — Reveal + ErrorBoundary

> `SmoothScroll` was already created in Task 6, Step 1.

**Files:**
- Create: `src/themes/aurora/components/Reveal.tsx`
- Create: `src/themes/aurora/components/ErrorBoundary.tsx`
- Create: `src/themes/aurora/components/Reveal.test.tsx`

- [ ] **Step 1: Write the failing Reveal test**

Create `src/themes/aurora/components/Reveal.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal><p>hello</p></Reveal>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- Reveal`
Expected: FAIL (cannot resolve `./Reveal`).

- [ ] **Step 3: Implement Reveal**

Create `src/themes/aurora/components/Reveal.tsx`:
```tsx
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Implement ErrorBoundary (keeps the hero fallback if 3D fails)**

Create `src/themes/aurora/components/ErrorBoundary.tsx`:
```tsx
import { Component, type ReactNode } from "react";
export class ErrorBoundary extends Component<{ fallback?: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <>{this.props.fallback ?? null}</> : this.props.children; }
}
```

- [ ] **Step 5: Run Reveal + Layout tests**

Run: `npm test -- Reveal Layout`
Expected: PASS (Reveal renders children; AuroraLayout renders wordmark + nav + outlet body).

- [ ] **Step 6: Commit**

```bash
git add src/themes/aurora/components/
git commit -m "feat: motion primitives (Reveal, ErrorBoundary)"
```

---

## Task 8: Spotlight hero — orb scene + fallback + cursor light

**Files:**
- Create: `src/themes/aurora/hero/OrbScene.tsx`
- Create: `src/themes/aurora/hero/SpotlightHero.tsx`
- Create: `src/themes/aurora/hero/SpotlightHero.test.tsx`

- [ ] **Step 1: Implement the R3F orb scene (lazy-loaded chunk)**

Create `src/themes/aurora/hero/OrbScene.tsx`:
```tsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const { pointer, viewport } = useThree();
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.12;
    if (light.current) {
      const tx = pointer.x * (viewport.width / 2);
      const ty = pointer.y * (viewport.height / 2);
      light.current.position.x += (tx - light.current.position.x) * 0.08;
      light.current.position.y += (ty - light.current.position.y) * 0.08;
    }
  });
  return (
    <group>
      <pointLight ref={light} position={[2, 2, 3]} intensity={30} distance={18} color="#aab6ff" />
      <mesh ref={mesh}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial color="#e4e8ff" metalness={0.55} roughness={0.18} envMapIntensity={1.1} />
      </mesh>
    </group>
  );
}

export default function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-4, 5, 5]} intensity={1.1} />
      <Orb />
      <Environment preset="city" />
    </Canvas>
  );
}
```
> Tune `intensity`/`metalness`/`roughness` in Plan 3 polish. `alpha: true` lets the light page show through.

- [ ] **Step 2: Write the failing hero test**

Create `src/themes/aurora/hero/SpotlightHero.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SpotlightHero } from "./SpotlightHero";

describe("SpotlightHero", () => {
  it("renders headline, subhead and CTAs (3D is progressive enhancement)", () => {
    render(<MemoryRouter><SpotlightHero /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/View my work/i)).toBeInTheDocument();
    expect(screen.getByTestId("orb-fallback")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- SpotlightHero`
Expected: FAIL (cannot resolve `./SpotlightHero`).

- [ ] **Step 4: Implement SpotlightHero**

Create `src/themes/aurora/hero/SpotlightHero.tsx`:
```tsx
import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "../components/Container";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { profile } from "@/content";

const OrbScene = lazy(() => import("./OrbScene"));

export function SpotlightHero() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const enable3D = mounted && !reduced;

  return (
    <section className="relative overflow-hidden">
      {/* soft glow backdrop */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
           style={{ background: "radial-gradient(circle, hsl(var(--glow)/.45), transparent 60%)" }} />
      <Container className="grid min-h-[88vh] items-center gap-8 py-20 md:grid-cols-2">
        <div className="relative z-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{profile.role} · {profile.org}</p>
          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">{profile.headline}</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">{profile.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6"><Link to="/work">View my work</Link></Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <a href="https://github.com/rathorevaibhav" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </Button>
          </div>
        </div>

        <div className="relative h-[320px] md:h-[460px]">
          {/* Always-present CSS fallback orb (also the no-WebGL / reduced-motion visual) */}
          <div data-testid="orb-fallback" aria-hidden
               className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-72 md:w-72"
               style={{ background: "radial-gradient(circle at 38% 32%, #ffffff, #dfe4ff 28%, #7d8bff 62%, #2a2f8f 100%)",
                        boxShadow: "0 40px 80px -24px rgba(60,70,160,.5)" }} />
          {enable3D && (
            <ErrorBoundary>
              <Suspense fallback={null}>
                <div className="absolute inset-0"><OrbScene /></div>
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Run the hero test**

Run: `npm test -- SpotlightHero`
Expected: PASS (headline, CTA, and `orb-fallback` present; the lazy 3D scene is not required for the test).

- [ ] **Step 6: Commit**

```bash
git add src/themes/aurora/hero/
git commit -m "feat: Spotlight hero with R3F orb + CSS fallback + cursor light"
```

---

## Task 9: Aurora Home page + "Currently" strip

**Files:**
- Create: `src/themes/aurora/pages/CurrentlyStrip.tsx`
- Create: `src/themes/aurora/pages/Home.tsx`
- Create: `src/themes/aurora/pages/Home.test.tsx`

- [ ] **Step 1: Implement the Currently strip**

Create `src/themes/aurora/pages/CurrentlyStrip.tsx`:
```tsx
import { BookOpen, Film, Music } from "lucide-react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { getCurrently } from "@/content/selectors";

export function CurrentlyStrip() {
  const { book, movie, track } = getCurrently();
  const items = [
    { icon: BookOpen, label: "Reading", primary: book.title, secondary: book.author },
    { icon: Film, label: "Watching", primary: movie.title, secondary: String(movie.year) },
    { icon: Music, label: "On repeat", primary: track?.title ?? "Guitar & mandolin", secondary: track?.artist ?? "Things I'm learning" },
  ];
  return (
    <section className="py-8">
      <Container>
        <Reveal>
          <div className="grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-3">
            {items.map((it) => (
              <div key={it.label} className="flex items-start gap-3">
                <it.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{it.label}</div>
                  <div className="font-semibold leading-tight">{it.primary}</div>
                  <div className="text-sm text-muted-foreground">{it.secondary}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write the failing Home test**

Create `src/themes/aurora/pages/Home.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Aurora Home", () => {
  it("renders the hero headline and section headings", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/What I work on/i)).toBeInTheDocument();
    expect(screen.getByText(/Hobbies/i)).toBeInTheDocument();
    expect(screen.getByText(/Interests/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- Home`
Expected: FAIL (cannot resolve `./Home`).

- [ ] **Step 4: Implement the Home page**

Create `src/themes/aurora/pages/Home.tsx`:
```tsx
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SpotlightHero } from "../hero/SpotlightHero";
import { CurrentlyStrip } from "./CurrentlyStrip";
import { SubstackPosts } from "@/components/SubstackPosts";
import { hobbies, interests } from "@/content";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <ul className="space-y-3 text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />{it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SpotlightHero />
      <CurrentlyStrip />

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">What I work on</h2>
              <Link to="/work" className="text-sm font-medium text-primary hover:text-primary/80">View all →</Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift">
              <h3 className="mb-2 text-xl font-semibold">ColoredCow</h3>
              <p className="text-muted-foreground">Senior Software Engineer — leading projects, mentoring engineers, and building scalable web applications with modern tools.</p>
              <Link to="/work" className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary/80">Learn more about my work →</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal><List title="Hobbies" items={hobbies} /></Reveal>
            <Reveal delay={0.08}><List title="Interests" items={interests} /></Reveal>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal><SubstackPosts /></Reveal>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Run the Home test**

Run: `npm test -- Home`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/themes/aurora/pages/Home.tsx src/themes/aurora/pages/CurrentlyStrip.tsx src/themes/aurora/pages/Home.test.tsx
git commit -m "feat: Aurora Home (hero + currently strip + work/hobbies/interests/blog)"
```

---

## Task 10: Aurora manifest + Music placeholder + ActiveThemeProvider + App wiring

**Files:**
- Create: `src/themes/aurora/pages/MusicPlaceholder.tsx`
- Create: `src/themes/aurora/index.ts`
- Create: `src/themes/ActiveThemeProvider.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Music placeholder (fixes the dead nav link)**

Create `src/themes/aurora/pages/MusicPlaceholder.tsx`:
```tsx
import { Container } from "../components/Container";

export default function MusicPlaceholder() {
  return (
    <Container className="py-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Music</p>
      <h1 className="text-4xl font-extrabold tracking-tight">I don't just listen — I play.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Guitar and mandolin. The full interactive page (playable line-art instruments) lands next.
      </p>
    </Container>
  );
}
```

- [ ] **Step 2: Create the Aurora theme manifest**

Create `src/themes/aurora/index.ts`:
```ts
import type { Theme } from "../types";
import AuroraLayout from "./Layout";
import Home from "./pages/Home";
import MusicPlaceholder from "./pages/MusicPlaceholder";
import Work from "@/pages/Work";
import Books from "@/pages/Books";
import BookDetail from "@/pages/BookDetail";
import Movies from "@/pages/Movies";
import NotFound from "@/pages/NotFound";

const aurora: Theme = {
  id: "aurora",
  name: "Aurora",
  Layout: AuroraLayout,
  pages: { home: Home, work: Work, books: Books, bookDetail: BookDetail, movies: Movies, music: MusicPlaceholder, notFound: NotFound },
};
export default aurora;
```
> Work/Books/Movies still use their existing (pre-redesign) content here — they render inside the Aurora shell now and get fully redesigned in Plan 2.

- [ ] **Step 3: Create ActiveThemeProvider (resolve + lazy-load + build routes)**

Create `src/themes/ActiveThemeProvider.tsx`:
```tsx
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
```

- [ ] **Step 4: Wire `src/App.tsx` to the provider**

Replace `src/App.tsx` with:
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ActiveThemeProvider } from "./themes/ActiveThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ActiveThemeProvider />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```
> `src/pages/Index.tsx` is now unused (Aurora's Home replaces it). Leave the file in place for reference; it can be deleted in Plan 3 cleanup.

- [ ] **Step 5: Typecheck + run all tests**

Run: `npx tsc --noEmit && npm test`
Expected: no type errors; all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/themes/ src/App.tsx
git commit -m "feat: active-theme provider + route Aurora as theme #1"
```

---

## Task 11: Full-site verification

**Files:** none (verification only)

- [ ] **Step 1: Run the dev server**

Run: `npm run dev` → open `http://localhost:8080`

- [ ] **Step 2: Verify Home**

Confirm: Inter type; Spotlight hero shows the orb (move the mouse — the light/highlight follows); scrolling reveals sections with a gentle fade-up; "Currently" strip shows latest book/film/instrument; sticky nav gains a blur/border after scrolling; footer social icons glow on hover.

- [ ] **Step 3: Verify the other routes load inside the Aurora shell**

Visit `/work`, `/books`, `/books/1`, `/movies`, `/music`, and a bogus path. Each renders within the new nav/footer (older page bodies are expected — they're redesigned in Plan 2). `/music` no longer 404s.

- [ ] **Step 4: Verify reduced-motion + theme override**

In the browser/OS, enable "reduce motion" and reload — the orb shows as the static fallback, no smooth-scroll, sections appear without animation. Then visit `/?theme=aurora` (should load normally) and `/?theme=ghost` (invalid → falls back to Aurora).

- [ ] **Step 5: Production build sanity**

Run: `npm run build`
Expected: build succeeds; output shows the theme + 3D in separate lazy chunks.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: Aurora foundation + Home complete (Plan 1 of 3)"
```

---

## Spec coverage check (Plan 1 scope)

- §5 Visual identity → Task 2 (tokens, Inter, forms via Tailwind).
- §6 Spotlight hero → Task 8 (orb + cursor light + fallback + reduced-motion).
- §7 Motion system → Task 7 (Reveal, Lenis) + Task 6 (sticky/blur nav). Route cross-fade is deferred to Plan 3 polish.
- §8 Home + nav/footer + "Currently" strip → Tasks 6, 9.
- §8 Music dead link → Task 10 (placeholder; full page in Plan 2).
- §10 Content strategy → Task 3 (content layer + placeholder copy in voice).
- §11 Architecture (content layer, theme modules, registry, resolver, lazy) → Tasks 3, 4, 10.
- §12 Stack/deps + reduced-motion + a11y basics → Tasks 1, 2, 6–8.

**Deferred to Plan 2:** Work/Books/Movies redesign, full Music page (playable line-art guitar + A-style mandolin, Karplus–Strong audio + tremolo, standard tunings, curated favourites), full Movies data migration.
**Deferred to Plan 3:** orb material/refraction polish, route cross-fade, performance + a11y pass, SEO/meta + Lovable `gptengineer.js` removal, delete unused `src/pages/Index.tsx` + old `src/components/Layout.tsx`, content fill-in.
