# Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild rathorevaibhav.com as a personal digital garden with a vibrant design system — glass sidebar, mesh gradients, Framer Motion animations, and section-colored identity.

**Architecture:** Single-page React app (Vite + TypeScript). Static data files for content (books, movies, work, music). Tailwind CSS for styling, Framer Motion for all animation. Glass sidebar on desktop, bottom nav on mobile. Each section (Home, Work, Books, Movies, Music) has its own gradient color identity.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion (`motion`), Phosphor Icons (`@phosphor-icons/react`), React Router DOM, Google Fonts (Sora, DM Sans, Fira Code)

**Spec:** `docs/superpowers/specs/2026-04-15-design-system-and-site-structure.md`

---

### Task 1: Strip Project to Skeleton

**Files:**
- Delete: `src/components/ui/*` (all 50+ shadcn files), `src/components/BookCard.tsx`, `src/components/ColoredCowIcon.tsx`, `src/components/Footer.tsx`, `src/components/Layout.tsx`, `src/components/StarRating.tsx`, `src/components/SubstackPosts.tsx`
- Delete: `src/pages/Index.tsx`, `src/pages/Work.tsx`, `src/pages/Books.tsx`, `src/pages/BookDetail.tsx`, `src/pages/Movies.tsx`, `src/pages/NotFound.tsx`
- Delete: `src/App.css`, `src/App.tsx`, `src/index.css`, `src/lib/types.ts`, `src/hooks/use-mobile.tsx`, `src/hooks/use-toast.ts`
- Delete: `components.json`
- Modify: `package.json`, `vite.config.ts`

- [ ] **Step 1: Delete all old source files**

```bash
# Remove all shadcn UI components
rm -rf src/components/ui/

# Remove old custom components
rm -f src/components/BookCard.tsx src/components/ColoredCowIcon.tsx src/components/Footer.tsx src/components/Layout.tsx src/components/StarRating.tsx src/components/SubstackPosts.tsx

# Remove old pages
rm -f src/pages/Index.tsx src/pages/Work.tsx src/pages/Books.tsx src/pages/BookDetail.tsx src/pages/Movies.tsx src/pages/NotFound.tsx

# Remove old styles and config
rm -f src/App.css src/App.tsx src/index.css src/lib/types.ts src/hooks/use-mobile.tsx src/hooks/use-toast.ts
rm -f components.json
```

- [ ] **Step 2: Gut package.json — remove unused deps, add new ones**

Replace the full `package.json` with:

```json
{
  "name": "rathorevaibhav-dotcom",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@phosphor-icons/react": "^2.1.7",
    "clsx": "^2.1.1",
    "motion": "^12.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "@eslint/js": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
}
```

- [ ] **Step 3: Clean up vite.config.ts — remove lovable-tagger**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 4: Install dependencies**

```bash
rm -rf node_modules bun.lockb package-lock.json
npm install
```

- [ ] **Step 5: Create placeholder files so the project compiles**

Create `src/App.tsx`:
```tsx
export default function App() {
  return <div>Rebuilding...</div>;
}
```

Create `src/main.tsx`:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Create `src/styles/index.css` (empty for now):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create empty directories:
```bash
mkdir -p src/components/layout src/components/shared src/pages src/data src/hooks src/lib src/styles
```

- [ ] **Step 6: Verify build works**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: strip project to skeleton for rebuild"
```

---

### Task 2: Design System Foundation

**Files:**
- Create: `src/styles/index.css`
- Modify: `tailwind.config.ts`
- Modify: `index.html`

- [ ] **Step 1: Update index.html — fonts + meta**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vaibhav Rathore</title>
    <meta name="description" content="Software engineer, reader, listener. A digital garden of work and interests." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Write tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        bg: "#fafafa",
        fg: "#111111",
        muted: "#555555",
        surface: "#f0f0f0",
        border: "#e5e5e5",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

- [ ] **Step 3: Write src/styles/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg text-fg font-body antialiased;
    font-size: 15px;
    line-height: 1.7;
  }

  h1, h2, h3, h4 {
    @apply font-display;
  }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Builds successfully.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/styles/index.css index.html
git commit -m "feat: design system foundation — fonts, colors, spacing"
```

---

### Task 3: Utility Helpers and Section Theme Config

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/theme.ts`

- [ ] **Step 1: Create src/lib/utils.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create src/lib/theme.ts**

This is the central config for section colors, gradients, and icons. Every component references this.

```ts
import type { Icon } from "@phosphor-icons/react";
import {
  House,
  Briefcase,
  BookOpen,
  FilmStrip,
  MusicNotes,
  ArrowSquareOut,
} from "@phosphor-icons/react";

export type SectionId = "home" | "work" | "books" | "movies" | "music" | "blog";

export interface SectionTheme {
  id: SectionId;
  label: string;
  path: string;
  icon: Icon;
  from: string;
  to: string;
  glow: string;
  external?: boolean;
}

export const sections: SectionTheme[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: House,
    from: "#0d9488",
    to: "#22d3ee",
    glow: "rgba(34,211,238,0.2)",
  },
  {
    id: "work",
    label: "Work",
    path: "/work",
    icon: Briefcase,
    from: "#ea580c",
    to: "#fbbf24",
    glow: "rgba(251,191,36,0.2)",
  },
  {
    id: "books",
    label: "Books",
    path: "/books",
    icon: BookOpen,
    from: "#059669",
    to: "#34d399",
    glow: "rgba(52,211,153,0.2)",
  },
  {
    id: "movies",
    label: "Movies",
    path: "/movies",
    icon: FilmStrip,
    from: "#e11d48",
    to: "#fb7185",
    glow: "rgba(251,113,133,0.2)",
  },
  {
    id: "music",
    label: "Music",
    path: "/music",
    icon: MusicNotes,
    from: "#7c3aed",
    to: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
  },
  {
    id: "blog",
    label: "Blog",
    path: "https://rathorevaibhav.substack.com/",
    icon: ArrowSquareOut,
    from: "#888888",
    to: "#aaaaaa",
    glow: "rgba(136,136,136,0.1)",
    external: true,
  },
];

export function getSectionByPath(pathname: string): SectionTheme {
  const match = sections.find(
    (s) => !s.external && (s.path === pathname || (s.path !== "/" && pathname.startsWith(s.path)))
  );
  return match ?? sections[0];
}

export function gradientStyle(from: string, to: string) {
  return `linear-gradient(135deg, ${from}, ${to})`;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts src/lib/theme.ts
git commit -m "feat: utility helpers and section theme config"
```

---

### Task 4: Data Layer

**Files:**
- Modify: `src/data/books.ts`
- Create: `src/data/movies.ts`
- Create: `src/data/work.ts`
- Create: `src/data/music.ts`

- [ ] **Step 1: Rewrite src/data/books.ts with clean types**

Keep all existing book data but update the type. The existing `mockBooks` array stays, just rename the type and field (`coverImage` → `coverUrl`).

```ts
export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  rating: number;
  readDate?: string;
  review?: string;
}

export const books: Book[] = [
  // ... copy all existing book objects from the current file,
  // renaming `coverImage` to `coverUrl` in each entry.
  // Keep all data exactly as-is otherwise.
];
```

Important: mechanically rename every `coverImage:` key to `coverUrl:` in the existing data. Do not change URLs, text, or structure.

- [ ] **Step 2: Create src/data/movies.ts**

Migrate existing movie data from the current `Movies.tsx` page into a standalone data file.

```ts
export interface Movie {
  id: number;
  title: string;
  director?: string;
  year: number;
  posterUrl?: string;
  genre: string[];
  category: "all-time" | "recent";
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Superboys of Malegaon",
    director: "Reema Kagti",
    year: 2024,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYmJjZGFkMzktMjAxZC00ZTNiLTljMzItYzVjMTcyYWNiYWNkXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg",
    genre: ["Biography", "Comedy", "Drama"],
    category: "recent",
  },
  { id: 2, title: "War Dogs", year: 2016, genre: ["Comedy", "Crime", "Drama"], category: "all-time" },
  { id: 3, title: "Ready Player One", year: 2018, genre: ["Sci-Fi", "Action", "Adventure"], category: "all-time" },
  { id: 4, title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Adventure", "Drama"], category: "all-time" },
  { id: 5, title: "Top Gun: Maverick", year: 2022, genre: ["Action", "Drama"], category: "all-time" },
  { id: 6, title: "Yesterday", year: 2019, genre: ["Comedy", "Music", "Fantasy"], category: "all-time" },
  { id: 7, title: "Edge of Tomorrow", year: 2014, genre: ["Action", "Sci-Fi"], category: "all-time" },
  { id: 8, title: "Spiderman: No Way Home", year: 2021, genre: ["Action", "Adventure", "Fantasy"], category: "all-time" },
  { id: 9, title: "Ad Astra", year: 2019, genre: ["Sci-Fi", "Adventure", "Drama"], category: "all-time" },
  { id: 10, title: "Godzilla Minus One", year: 2023, genre: ["Action", "Adventure", "Drama"], category: "all-time" },
  { id: 11, title: "The Big Short", year: 2015, genre: ["Biography", "Comedy", "Drama"], category: "all-time" },
  { id: 12, title: "Article 370", year: 2023, genre: ["Drama", "Thriller"], category: "all-time" },
  { id: 13, title: "Maharaja", year: 2023, genre: ["Action", "Drama"], category: "all-time" },
  { id: 14, title: "The Truman Show", year: 1998, genre: ["Comedy", "Drama"], category: "all-time" },
  { id: 15, title: "Moneyball", year: 2011, genre: ["Biography", "Drama", "Sport"], category: "all-time" },
  { id: 16, title: "Oppenheimer", year: 2023, genre: ["Biography", "Drama", "History"], category: "all-time" },
  { id: 17, title: "Prestige", year: 2006, genre: ["Drama", "Mystery", "Sci-Fi"], category: "all-time" },
  { id: 18, title: "Intern", year: 2015, genre: ["Comedy", "Drama"], category: "all-time" },
  { id: 19, title: "Seven", year: 1995, genre: ["Crime", "Drama", "Mystery"], category: "all-time" },
  { id: 20, title: "Laapata Ladies", year: 2023, genre: ["Comedy", "Drama"], category: "all-time" },
  { id: 21, title: "Badla", year: 2019, genre: ["Crime", "Drama", "Mystery"], category: "all-time" },
  { id: 22, title: "Inglorious Bastards", year: 2009, genre: ["Adventure", "Drama", "War"], category: "all-time" },
  { id: 23, title: "Air", year: 2023, genre: ["Drama", "Sport"], category: "all-time" },
  { id: 24, title: "The Green Mile", year: 1999, genre: ["Crime", "Drama", "Fantasy"], category: "all-time" },
];
```

- [ ] **Step 3: Create src/data/work.ts**

```ts
export interface WorkEntry {
  id: number;
  title: string;
  company: string;
  description: string;
  startYear: number;
  endYear: number | null;
}

export const workEntries: WorkEntry[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "ColoredCow",
    description: "Leading development of complex web applications using React and TypeScript. Mentoring junior developers and implementing best practices.",
    startYear: 2023,
    endYear: null,
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "ColoredCow",
    description: "Developed and maintained multiple client projects. Collaborated with cross-functional teams to deliver high-quality solutions.",
    startYear: 2021,
    endYear: 2023,
  },
  {
    id: 3,
    title: "Junior Software Engineer",
    company: "ColoredCow",
    description: "Started professional career in web development. Worked on frontend development using React and contributed to various client projects.",
    startYear: 2019,
    endYear: 2021,
  },
];
```

- [ ] **Step 4: Create src/data/music.ts**

Placeholder with a few entries — Vaibhav can fill in real data later.

```ts
export interface Album {
  id: number;
  albumName: string;
  artist: string;
  coverUrl?: string;
  year: number;
  genre?: string;
  spotifyUrl?: string;
}

export const albums: Album[] = [
  {
    id: 1,
    albumName: "Con Todo El Mundo",
    artist: "Khruangbin",
    year: 2018,
    genre: "Psychedelic",
  },
  {
    id: 2,
    albumName: "In Rainbows",
    artist: "Radiohead",
    year: 2007,
    genre: "Alternative Rock",
  },
  {
    id: 3,
    albumName: "Random Access Memories",
    artist: "Daft Punk",
    year: 2013,
    genre: "Electronic",
  },
  {
    id: 4,
    albumName: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    genre: "Hip Hop",
  },
];
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: data layer — books, movies, work, music"
```

---

### Task 5: useMediaQuery Hook

**Files:**
- Create: `src/hooks/useMediaQuery.ts`

- [ ] **Step 1: Create src/hooks/useMediaQuery.ts**

```ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return !useMediaQuery("(min-width: 768px)");
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useMediaQuery.ts
git commit -m "feat: useMediaQuery, useIsMobile, and useReducedMotion hooks"
```

---

### Task 6: MeshGradient Component

**Files:**
- Create: `src/components/shared/MeshGradient.tsx`

- [ ] **Step 1: Create src/components/shared/MeshGradient.tsx**

```tsx
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface Blob {
  color: string;
  x: string;
  y: string;
  size: number;
}

interface MeshGradientProps {
  blobs?: Blob[];
  animated?: boolean;
  dotGrid?: boolean;
}

const defaultBlobs: Blob[] = [
  { color: "rgba(34,211,238,0.12)", x: "70%", y: "10%", size: 500 },
  { color: "rgba(167,139,250,0.10)", x: "20%", y: "80%", size: 450 },
  { color: "rgba(251,113,133,0.07)", x: "50%", y: "40%", size: 300 },
];

export function MeshGradient({
  blobs = defaultBlobs,
  animated = true,
  dotGrid = true,
}: MeshGradientProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, i) => {
        const el = (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
              filter: "blur(60px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        );

        if (!shouldAnimate) return el;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
              filter: "blur(60px)",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, 10, -5, 0],
              y: [0, -8, 5, 0],
              opacity: [0.6, 1, 0.7, 0.6],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {dotGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/MeshGradient.tsx
git commit -m "feat: MeshGradient component with animated blobs and dot grid"
```

---

### Task 7: PageHeader Component

**Files:**
- Create: `src/components/shared/PageHeader.tsx`

- [ ] **Step 1: Create src/components/shared/PageHeader.tsx**

```tsx
import { motion } from "motion/react";
import { gradientStyle } from "@/lib/theme";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  from: string;
  to: string;
}

export function PageHeader({ title, subtitle, from, to }: PageHeaderProps) {
  return (
    <div className="mb-[28px]">
      <motion.div
        className="h-[3px] w-[80px] rounded-full mb-md"
        style={{ background: gradientStyle(from, to) }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.h1
        className="font-display text-[32px] font-light tracking-[-1px] text-fg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-[13px] text-muted mt-[6px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/PageHeader.tsx
git commit -m "feat: PageHeader component with gradient bar and animations"
```

---

### Task 8: Glass Sidebar (Desktop)

**Files:**
- Create: `src/components/layout/Sidebar.tsx`

- [ ] **Step 1: Create src/components/layout/Sidebar.tsx**

```tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { sections, getSectionByPath, gradientStyle } from "@/lib/theme";

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const currentSection = getSectionByPath(location.pathname);

  return (
    <motion.nav
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center py-[28px] border-r"
      style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.6)",
      }}
      animate={{ width: expanded ? 180 : 56 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {sections.map((section, index) => {
        const isActive = section.id === currentSection.id;
        const IconComponent = section.icon;
        const isExternal = section.external;

        const iconEl = (
          <IconComponent
            size={20}
            weight="duotone"
            style={{
              color: isActive ? section.from : "#888",
              opacity: isActive ? 1 : 0.5,
              filter: isActive ? `drop-shadow(0 0 6px ${section.glow})` : "none",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          />
        );

        const content = (
          <motion.div
            className={`flex items-center gap-[12px] rounded-[10px] px-[10px] py-[8px] w-full ${
              isActive && expanded ? "" : ""
            }`}
            style={{
              background: isActive && expanded ? `${section.from}14` : "transparent",
            }}
            layout
          >
            {iconEl}
            <AnimatePresence>
              {expanded && (
                <motion.span
                  className="text-[13px] whitespace-nowrap"
                  style={{
                    color: isActive ? section.from : "#666",
                    fontWeight: isActive ? 500 : 400,
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15, delay: index * 0.05 }}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );

        const wrapperClass = isExternal ? "mt-auto" : index === 0 ? "" : "";

        if (isExternal) {
          return (
            <a
              key={section.id}
              href={section.path}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex justify-center ${wrapperClass}`}
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={section.id}
            to={section.path}
            className="w-full flex justify-center"
            style={isExternal ? {} : { marginTop: section.id === "blog" ? "auto" : undefined }}
          >
            {content}
          </Link>
        );
      })}
    </motion.nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Sidebar.tsx
git commit -m "feat: glass sidebar with expand-on-hover and gradient icons"
```

---

### Task 9: Bottom Navigation (Mobile)

**Files:**
- Create: `src/components/layout/BottomNav.tsx`

- [ ] **Step 1: Create src/components/layout/BottomNav.tsx**

```tsx
import { Link, useLocation } from "react-router-dom";
import { sections, getSectionByPath } from "@/lib/theme";

export function BottomNav() {
  const location = useLocation();
  const currentSection = getSectionByPath(location.pathname);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t md:hidden"
      style={{
        height: 56,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(0,0,0,0.06)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {sections.map((section) => {
        const isActive = section.id === currentSection.id;
        const IconComponent = section.icon;

        if (section.external) {
          return (
            <a
              key={section.id}
              href={section.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-[8px]"
            >
              <IconComponent
                size={16}
                weight="duotone"
                style={{
                  color: "#888",
                  opacity: 0.5,
                }}
              />
            </a>
          );
        }

        return (
          <Link
            key={section.id}
            to={section.path}
            className="flex items-center justify-center p-[8px]"
          >
            <IconComponent
              size={16}
              weight="duotone"
              style={{
                color: isActive ? section.from : "#888",
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? `drop-shadow(0 0 6px ${section.glow})` : "none",
                transition: "all 0.2s",
              }}
            />
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/BottomNav.tsx
git commit -m "feat: mobile bottom navigation with glass effect"
```

---

### Task 10: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create src/components/layout/Footer.tsx**

```tsx
import {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  Cow,
} from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { getSectionByPath } from "@/lib/theme";

const socialLinks = [
  { icon: LinkedinLogo, href: "https://linkedin.com/in/rathorevaibhav", label: "LinkedIn" },
  { icon: GithubLogo, href: "https://github.com/rathorevaibhav", label: "GitHub" },
  { icon: InstagramLogo, href: "https://instagram.com/rathorevaibhav", label: "Instagram" },
  { icon: Cow, href: "https://coloredcow.com", label: "ColoredCow" },
];

export function Footer() {
  const location = useLocation();
  const section = getSectionByPath(location.pathname);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-xl mt-auto">
      <div className="flex flex-col items-center gap-md">
        <div className="flex items-center gap-lg">
          {socialLinks.map(({ icon: IconComponent, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#888] transition-all duration-200"
              style={{}}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = section.from;
                e.currentTarget.style.filter = `drop-shadow(0 0 6px ${section.glow})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#888";
                e.currentTarget.style.filter = "none";
              }}
            >
              <IconComponent size={20} weight="duotone" />
            </a>
          ))}
        </div>
        <p className="text-[13px] text-[#999]">
          &copy; {currentYear} Vaibhav Rathore
        </p>
      </div>
    </footer>
  );
}
```

Note: `Cow` may not exist in Phosphor. If it doesn't, use a simple SVG or the `Globe` icon as a stand-in. Check `@phosphor-icons/react` exports during implementation — if `Cow` is not available, replace with a custom ColoredCow SVG component or `Globe`.

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: footer with social links and section-colored hover"
```

---

### Task 11: Layout Wrapper

**Files:**
- Create: `src/components/layout/Layout.tsx`

- [ ] **Step 1: Create src/components/layout/Layout.tsx**

```tsx
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { getSectionByPath } from "@/lib/theme";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const section = getSectionByPath(location.pathname);
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background layer */}
      {isHome ? (
        <MeshGradient animated dotGrid />
      ) : (
        <MeshGradient
          blobs={[
            { color: section.glow, x: "80%", y: "10%", size: 350 },
          ]}
          animated={false}
          dotGrid={false}
        />
      )}

      {/* Sidebar (desktop only) */}
      {!isMobile && <Sidebar />}

      {/* Main content */}
      <main
        className="flex-1 relative z-10"
        style={{
          paddingLeft: isMobile ? 20 : 56 + 32,
          paddingRight: isMobile ? 20 : 32,
          paddingTop: 32,
          paddingBottom: isMobile ? 56 + 20 : 32,
        }}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <div
        style={{
          paddingLeft: isMobile ? 0 : 56,
          paddingBottom: isMobile ? 56 : 0,
        }}
      >
        <Footer />
      </div>

      {/* Bottom nav (mobile only) */}
      {isMobile && <BottomNav />}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Layout.tsx
git commit -m "feat: layout wrapper with sidebar, bottom nav, mesh gradient, footer"
```

---

### Task 12: App.tsx + Routing with AnimatePresence

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Write src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Books from "@/pages/Books";
import Movies from "@/pages/Movies";
import Music from "@/pages/Music";
import NotFound from "@/pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/books" element={<Books />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/music" element={<Music />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Create placeholder pages so it compiles**

Create all page files with minimal content for now. Each page will be fully built in subsequent tasks.

`src/pages/Home.tsx`:
```tsx
export default function Home() {
  return <div>Home</div>;
}
```

`src/pages/Work.tsx`:
```tsx
export default function Work() {
  return <div>Work</div>;
}
```

`src/pages/Books.tsx`:
```tsx
export default function Books() {
  return <div>Books</div>;
}
```

`src/pages/Movies.tsx`:
```tsx
export default function Movies() {
  return <div>Movies</div>;
}
```

`src/pages/Music.tsx`:
```tsx
export default function Music() {
  return <div>Music</div>;
}
```

`src/pages/NotFound.tsx`:
```tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-md">
      <h1 className="font-display text-[52px] font-extralight tracking-[-2px]">404</h1>
      <p className="text-muted">Page not found.</p>
      <Link to="/" className="text-[13px] text-[#0d9488] hover:underline">
        Go home
      </Link>
    </div>
  );
}
```

- [ ] **Step 3: Verify build + dev server**

```bash
npm run build
npm run dev
```

Expected: Build succeeds. Dev server starts. Navigating to localhost:8080 shows "Home" with the glass sidebar and mesh gradient background.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/pages/ src/main.tsx
git commit -m "feat: routing with AnimatePresence and placeholder pages"
```

---

### Task 13: Home Page

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Build the Home page**

```tsx
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <motion.p
          className="font-mono text-[12px] text-muted tracking-[3px] uppercase mb-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Vaibhav Rathore
        </motion.p>

        <motion.h1
          className="font-display text-[44px] md:text-[52px] font-extralight tracking-[-2px] leading-[1.15] text-fg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Software engineer,
          <br />
          <span
            className="font-light"
            style={{
              background: "linear-gradient(135deg, #0d9488, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            reader
          </span>
          ,{" "}
          <span
            className="font-light"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            listener
          </span>
          .
        </motion.h1>

        <motion.div
          className="mx-auto mt-lg rounded-full h-[2px] w-[48px]"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Navigate to `http://localhost:8080`. Expected: centered hero statement with gradient text, animated entrance, mesh gradient blobs behind, glass sidebar on left.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: home page — poster layout with gradient text and animations"
```

---

### Task 14: Work Page

**Files:**
- Modify: `src/pages/Work.tsx`

- [ ] **Step 1: Build the Work page**

```tsx
import { motion } from "motion/react";
import { PageHeader } from "@/components/shared/PageHeader";
import { workEntries } from "@/data/work";
import { sections } from "@/lib/theme";

const workSection = sections.find((s) => s.id === "work")!;

export default function Work() {
  return (
    <div>
      <PageHeader
        title="My Work"
        subtitle="Building software that makes a difference."
        from={workSection.from}
        to={workSection.to}
      />

      <div className="flex flex-col gap-[12px]">
        {workEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm rounded-[14px] border border-[#eee] px-lg py-[20px]"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
              x: 2,
              boxShadow: `0 4px 24px ${workSection.glow}`,
            }}
          >
            <div>
              <p className="font-display text-[16px] font-normal text-fg">
                {entry.title}
              </p>
              <p className="text-[13px] text-muted mt-[4px]">
                {entry.company} &middot; {entry.description}
              </p>
            </div>
            <span
              className="font-mono text-[11px] tracking-[0.5px] shrink-0"
              style={{ color: entry.endYear === null ? workSection.from : "#999" }}
            >
              {entry.startYear} &rarr; {entry.endYear ?? "present"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/work`. Expected: gradient bar + heading, glass list cards with dates in mono, hover slide right + orange glow.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Work.tsx
git commit -m "feat: work page — glass card list with orange accent"
```

---

### Task 15: GridCard Component

**Files:**
- Create: `src/components/shared/GridCard.tsx`

- [ ] **Step 1: Create src/components/shared/GridCard.tsx**

Reusable card for Books, Movies, and Music grids.

```tsx
import { motion } from "motion/react";

interface GridCardProps {
  aspectRatio?: string;
  imageUrl?: string;
  glow: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}

export function GridCard({
  aspectRatio = "2/3",
  imageUrl,
  glow,
  children,
  overlay,
}: GridCardProps) {
  return (
    <motion.div
      className="relative rounded-md overflow-hidden cursor-default"
      style={{ aspectRatio }}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: `0 8px 40px ${glow}`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-surface" />
      )}

      {overlay && (
        <div className="absolute inset-0">{overlay}</div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-[12px] relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/GridCard.tsx
git commit -m "feat: GridCard component for visual grid pages"
```

---

### Task 16: Books Page

**Files:**
- Modify: `src/pages/Books.tsx`

- [ ] **Step 1: Build the Books page**

```tsx
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GridCard } from "@/components/shared/GridCard";
import { books } from "@/data/books";
import { sections } from "@/lib/theme";

const bookSection = sections.find((s) => s.id === "books")!;

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const years = useMemo(() => {
    const allYears = books
      .filter((b) => b.readDate)
      .map((b) => {
        const match = b.readDate?.match(/\d{4}/);
        return match ? match[0] : null;
      })
      .filter(Boolean) as string[];
    return [...new Set(allYears)].sort((a, b) => Number(b) - Number(a));
  }, []);

  // Default to latest year
  const activeYear = selectedYear ?? years[0] ?? null;

  const filtered = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = !activeYear || book.readDate?.includes(activeYear);
      return matchesSearch && matchesYear;
    });
  }, [searchQuery, activeYear]);

  return (
    <div>
      <PageHeader
        title="Books I've Read"
        subtitle="Science fiction, philosophy, and everything in between."
        from={bookSection.from}
        to={bookSection.to}
      />

      {/* Search + Year filters */}
      <div className="flex flex-col sm:flex-row gap-[12px] items-start sm:items-center mb-lg">
        <div
          className="flex items-center gap-[6px] rounded-lg border border-border px-[14px] py-[8px] flex-1 max-w-[300px]"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <MagnifyingGlass size={14} className="text-[#bbb]" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[12px] text-fg outline-none w-full placeholder:text-[#666]"
          />
        </div>

        <div className="flex gap-[8px] flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year === activeYear ? null : year)}
              className="text-[11px] px-[12px] py-[6px] rounded-sm transition-all"
              style={{
                color: year === activeYear ? bookSection.from : "#999",
                fontWeight: year === activeYear ? 500 : 400,
                background:
                  year === activeYear ? `${bookSection.from}14` : "transparent",
              }}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-md">
          {filtered.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GridCard
                imageUrl={book.coverUrl}
                glow={bookSection.glow}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  style={{ zIndex: -1 }}
                />
                <p className="text-[11px] font-medium text-white">{book.title}</p>
                <p className="text-[10px] text-white/60">{book.author}</p>
              </GridCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted py-2xl">
          No books found matching your search.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/books`. Expected: gradient header, search input, year filter pills, grid of book covers (2:3), hover lifts with green glow.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Books.tsx
git commit -m "feat: books page — visual grid with search and year filters"
```

---

### Task 17: Movies Page

**Files:**
- Modify: `src/pages/Movies.tsx`

- [ ] **Step 1: Build the Movies page**

```tsx
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GridCard } from "@/components/shared/GridCard";
import { movies } from "@/data/movies";
import { sections } from "@/lib/theme";

const movieSection = sections.find((s) => s.id === "movies")!;

type MovieCategory = "all" | "all-time" | "recent";

export default function Movies() {
  const [category, setCategory] = useState<MovieCategory>("all");

  const filtered = useMemo(() => {
    if (category === "all") return movies;
    return movies.filter((m) => m.category === category);
  }, [category]);

  const tabs: { label: string; value: MovieCategory }[] = [
    { label: "All", value: "all" },
    { label: "All-Time Favorites", value: "all-time" },
    { label: "Recent Watches", value: "recent" },
  ];

  return (
    <div>
      <PageHeader
        title="Films I Love"
        subtitle="Favorites, discoveries, and rewatches."
        from={movieSection.from}
        to={movieSection.to}
      />

      {/* Category tabs */}
      <div className="flex gap-[4px] mb-lg flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCategory(tab.value)}
            className="text-[12px] px-md py-[8px] rounded-[10px] transition-all"
            style={{
              color: category === tab.value ? movieSection.from : "#666",
              fontWeight: category === tab.value ? 500 : 400,
              background:
                category === tab.value ? `${movieSection.from}14` : "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-md">
        {filtered.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GridCard
              imageUrl={movie.posterUrl}
              glow={movieSection.glow}
              overlay={
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              }
            >
              <p className="text-[11px] font-medium text-white">{movie.title}</p>
              <p className="text-[10px] text-white/60">
                {movie.year}
                {movie.director ? ` \u00B7 ${movie.director}` : ""}
              </p>
            </GridCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/movies`. Expected: rose/pink accent, category tabs, poster grid, dark gradient overlay on posters, hover lifts with rose glow.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Movies.tsx
git commit -m "feat: movies page — poster grid with category filters"
```

---

### Task 18: Music Page

**Files:**
- Modify: `src/pages/Music.tsx`

- [ ] **Step 1: Build the Music page**

```tsx
import { motion } from "motion/react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GridCard } from "@/components/shared/GridCard";
import { albums } from "@/data/music";
import { sections } from "@/lib/theme";

const musicSection = sections.find((s) => s.id === "music")!;

export default function Music() {
  return (
    <div>
      <PageHeader
        title="What I Listen To"
        subtitle="Albums, playlists, and sonic discoveries."
        from={musicSection.from}
        to={musicSection.to}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-md">
        {albums.map((album, index) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div>
              <GridCard
                aspectRatio="1/1"
                imageUrl={album.coverUrl}
                glow={musicSection.glow}
              >
                {!album.coverUrl && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${musicSection.from}20, ${musicSection.to}10)`,
                    }}
                  >
                    <span className="font-display text-[14px] text-muted font-light">
                      {album.artist}
                    </span>
                  </div>
                )}
              </GridCard>
              <p className="text-[12px] font-medium text-fg mt-[10px]">
                {album.albumName}
              </p>
              <p className="text-[11px] text-muted">{album.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/music`. Expected: violet accent, 1:1 album grid, title + artist below each card, hover lifts with violet glow. Albums without cover URLs show a gradient placeholder with artist name.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Music.tsx
git commit -m "feat: music page — album grid with violet accent"
```

---

### Task 19: Final Polish and Verification

**Files:**
- Possibly modify any files where issues are found

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: No errors, no warnings.

- [ ] **Step 2: Run dev server and test all pages**

```bash
npm run dev
```

Check each page:
- `/` — hero statement, gradient text, mesh gradient blobs, sidebar
- `/work` — glass cards, orange accent, hover effects
- `/books` — grid, search, year filters, green accent
- `/movies` — poster grid, category tabs, rose accent
- `/music` — album grid, violet accent
- `/*` — 404 page
- Blog sidebar link opens Substack in new tab

Check mobile (resize browser < 768px):
- Sidebar disappears, bottom nav appears
- Grids reduce columns
- Footer still renders

- [ ] **Step 3: Fix any issues found**

Address any visual bugs, spacing problems, or build errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: site rebuild complete — all pages, design system, animations"
```
