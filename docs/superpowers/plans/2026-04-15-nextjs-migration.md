> **TO BE DELETED** — This plan file is for reference during implementation. Delete after the migration is complete.

# Rebuild rathorevaibhav.com — Next.js 15 Static + Design System

## Context

The `revamp` branch has a comprehensive design system spec (`docs/superpowers/specs/2026-04-15-design-system-and-site-structure.md`) and implementation plan (`docs/superpowers/plans/2026-04-15-site-rebuild.md`). Both target Vite + React SPA. The user now wants **Next.js 15 with static export** instead.

This plan adapts the existing design system to a Next.js 15 architecture while keeping the visual identity intact.

## What Changes vs the Existing Plan

| Aspect | Existing Plan (Vite SPA) | This Plan (Next.js 15 Static) |
|--------|--------------------------|-------------------------------|
| Framework | Vite + React 18 | Next.js 15 + React 19 |
| Routing | React Router DOM | App Router (file-based) |
| CSS | Tailwind v3 (`tailwind.config.ts`) | Tailwind v4 (CSS `@theme`) |
| Page transitions | `AnimatePresence` on `<Routes>` | `AnimatePresence` via layout client wrapper |
| Sidebar links | `<Link to>` (react-router) | `<Link href>` (next/link) |
| `useLocation()` | `react-router-dom` | `usePathname()` from `next/navigation` |
| Build output | `dist/` | `out/` (static export) |
| Deployment | Lovable | Vercel |
| Font loading | CSS `@import` from Google Fonts | `next/font/google` (self-hosted, better perf) |
| Entry point | `index.html` + `main.tsx` + `App.tsx` | `app/layout.tsx` |

## What Stays the Same (from the design system spec)

- Glass sidebar (desktop) + bottom nav (mobile)
- Mesh gradient backgrounds with animated blobs
- Section-colored identity (Home=teal, Work=orange, Books=emerald, Movies=rose, Music=violet)
- Framer Motion animations (page transitions, card hovers, stagger effects)
- Phosphor Icons (Duotone weight)
- Fonts: Sora (display), DM Sans (body), Fira Code (mono)
- Color palette: `bg=#fafafa`, `fg=#111`, `muted=#555`, `surface=#f0f0f0`, `border=#e5e5e5`
- Component specs: PageHeader, GridCard, glass cards, filter controls
- All data: books, movies, work, music (static TS files)
- No book detail pages (out of scope per spec)
- Light theme only (no dark mode)

## Target Structure

```
rathorevaibhavdotcom/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   ├── globals.css             # Tailwind v4 @theme + design system tokens
│   ├── page.tsx                # Home (/)
│   ├── work/
│   │   └── page.tsx            # Work timeline (/work)
│   ├── books/
│   │   └── page.tsx            # Books grid (/books)
│   ├── movies/
│   │   └── page.tsx            # Movies grid (/movies)
│   ├── music/
│   │   └── page.tsx            # Music grid (/music)
│   └── not-found.tsx           # 404
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx         # Glass sidebar (desktop) — 'use client'
│   │   ├── bottom-nav.tsx      # Mobile bottom nav — 'use client'
│   │   ├── footer.tsx          # Social links + copyright — 'use client'
│   │   ├── layout-shell.tsx    # Wraps sidebar + bottom-nav + content — 'use client'
│   │   └── page-transition.tsx # AnimatePresence wrapper — 'use client'
│   ├── shared/
│   │   ├── mesh-gradient.tsx   # Animated gradient blobs — 'use client'
│   │   ├── page-header.tsx     # Gradient bar + title + subtitle
│   │   └── grid-card.tsx       # Book/Movie/Music grid item — 'use client' (hover)
│   └── ui/                     # Deferred: design system components later
├── data/
│   ├── books.ts
│   ├── movies.ts
│   ├── work.ts
│   └── music.ts
├── hooks/
│   └── use-media-query.ts      # useIsMobile, useReducedMotion
├── lib/
│   ├── theme.ts                # Section colors, gradients, icons config
│   └── utils.ts                # cn() helper
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── docs/superpowers/           # Keep existing spec + plan for reference
├── next.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

## Key Next.js Adaptations

### 1. Page transitions with App Router

React Router's `AnimatePresence` wrapping `<Routes>` doesn't exist in Next.js. Instead:

```tsx
// components/layout/page-transition.tsx
'use client';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 2. Sidebar uses `next/link` + `usePathname()`

Replace all `react-router-dom` usage:
- `<Link to={path}>` → `<Link href={path}>`
- `useLocation().pathname` → `usePathname()` from `next/navigation`
- `getSectionByPath(location.pathname)` → `getSectionByPath(pathname)`

### 3. Fonts via `next/font/google`

```tsx
// app/layout.tsx
import { Sora, DM_Sans, Fira_Code } from 'next/font/google';

const sora = Sora({ subsets: ['latin'], variable: '--font-display', weight: ['200','300','400','500','600'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['300','400','500'] });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono', weight: ['300','400','500'] });
```

No Google Fonts `<link>` in HTML — Next.js self-hosts the fonts.

### 4. Static export config

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

### 5. Tailwind v4 theme (replaces tailwind.config.ts)

All theme tokens move to `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  --color-bg: #fafafa;
  --color-fg: #111111;
  --color-muted: #555555;
  --color-surface: #f0f0f0;
  --color-border: #e5e5e5;

  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}
```

## Implementation Steps

### Phase 1: Scaffold + Strip (on `revamp` branch)

1. Delete all old source files (`src/components/`, `src/pages/`, `src/App.*`, `src/index.css`, `src/main.tsx`, `components.json`)
2. Keep `src/data/books.ts` content (will move to `data/books.ts`)
3. Keep `docs/superpowers/` (spec + plan for reference)
4. Initialize Next.js 15: `npx create-next-app@latest temp --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*"`
5. Copy Next.js scaffolding into repo (next.config.ts, tsconfig.json, app/ skeleton)
6. Remove all Vite files: `vite.config.ts`, `index.html`, `postcss.config.js`, `tailwind.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `bun.lockb`
7. Remove Lovable artifacts
8. Write new `package.json` with only needed deps:
   - `next`, `react`, `react-dom` (v19)
   - `motion` (Framer Motion)
   - `@phosphor-icons/react`
   - `clsx`, `tailwind-merge`
   - Dev: `tailwindcss` v4, `@tailwindcss/postcss`, `tw-animate-css`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
9. `npm install` + verify `npm run build` works with placeholder app

### Phase 2: Design System Foundation

1. Set up `app/globals.css` with Tailwind v4 `@theme` block (colors, spacing, radii from spec)
2. Set up `app/layout.tsx` with fonts via `next/font/google`, metadata, `<html>` + `<body>`
3. Create `lib/utils.ts` (cn helper)
4. Create `lib/theme.ts` (section colors, gradients, icons — same as existing plan but with `next/link` types)

### Phase 3: Data Layer

1. Move `books.ts` to `data/books.ts` (rename `coverImage` → `coverUrl`)
2. Create `data/movies.ts` (extract from current Movies.tsx)
3. Create `data/work.ts` (extract from current Work.tsx)
4. Create `data/music.ts` (placeholder entries)

### Phase 4: Layout Components

1. `components/layout/sidebar.tsx` — glass sidebar, `'use client'`, uses `usePathname()` + `next/link`
2. `components/layout/bottom-nav.tsx` — mobile nav, `'use client'`
3. `components/layout/footer.tsx` — social links, `'use client'` (uses `usePathname` for section color)
4. `components/layout/page-transition.tsx` — AnimatePresence wrapper, `'use client'`
5. `components/layout/layout-shell.tsx` — ties together sidebar, bottom-nav, footer, mesh gradient, page transition

### Phase 5: Shared Components

1. `components/shared/mesh-gradient.tsx` — animated gradient blobs (same as existing plan)
2. `components/shared/page-header.tsx` — gradient bar + title + subtitle
3. `components/shared/grid-card.tsx` — book/movie/music grid item with hover animation

### Phase 6: Hooks

1. `hooks/use-media-query.ts` — `useIsMobile()`, `useReducedMotion()`

### Phase 7: Pages

1. **Home** (`app/page.tsx`) — centered statement, hero text, mesh gradient background
2. **Work** (`app/work/page.tsx`) — glass cards list, orange/amber accent
3. **Books** (`app/books/page.tsx`) — `'use client'` (search/filter state), 2:3 cover grid, emerald accent
4. **Movies** (`app/movies/page.tsx`) — 2:3 poster grid, rose accent, category tabs
5. **Music** (`app/music/page.tsx`) — 1:1 album art grid, violet accent
6. **404** (`app/not-found.tsx`)

### Phase 8: Cleanup + Build

1. Delete `src/` directory entirely
2. Remove any remaining unused files
3. Update `.gitignore` (add `.next`, `out`)
4. `npm run build` — verify static export to `out/`
5. `npx serve out` — test locally, verify all pages and interactions

### Phase 9: Deploy to Vercel

1. Push branch to GitHub
2. Import repo at vercel.com
3. Verify build + preview URL
4. Configure custom domain if needed

## Verification

- [ ] `npm run build` succeeds with static export to `out/`
- [ ] All 6 pages render: `/`, `/work`, `/books`, `/movies`, `/music`, 404
- [ ] Glass sidebar expands on hover (desktop), bottom nav shows (mobile)
- [ ] Mesh gradient blobs animate on home, static glow on inner pages
- [ ] Section colors change per page (sidebar icon + footer hover + glow)
- [ ] Page transitions animate (fade + slide)
- [ ] Book search and category/year filtering works
- [ ] Movie category tabs work
- [ ] Reduced motion respected
- [ ] External links (Blog, social) open in new tab
- [ ] No Lovable/GPTEngineer artifacts remain
- [ ] Vercel deploy succeeds
