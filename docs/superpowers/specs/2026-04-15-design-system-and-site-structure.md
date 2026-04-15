# Design System & Site Structure — rathorevaibhav.com

## Overview

A personal digital garden that doubles as a piece of design craft. The site is a space for Vaibhav's work, reading, film, and music interests — presented through a minimal structure with vibrant, modern visual treatment.

**Philosophy:** Restraint in layout, richness in color and motion. The structure stays out of the way; the gradients, glass, and animation make it feel alive.

## Tech Stack

- **Framework:** React + Vite + TypeScript (rebuild from current skeleton, strip all existing components/pages)
- **Styling:** Tailwind CSS (keep, reconfigure for new design system)
- **Animation:** Framer Motion (`motion` package)
- **Icons:** Phosphor Icons — Duotone weight (`@phosphor-icons/react`)
- **Fonts:** Google Fonts — Sora (display), DM Sans (body), Fira Code (mono)
- **Routing:** React Router DOM (keep)
- **Remove:** All shadcn/ui components, @radix-ui packages, recharts, react-hook-form, zod, react-day-picker, embla-carousel, cmdk, vaul, sonner, next-themes, input-otp, react-resizable-panels, lovable-tagger, and all other unused dependencies

## Pages

| Page | Route | Layout | Accent Gradient |
|------|-------|--------|----------------|
| Home | `/` | Poster (centered statement) | Teal → Cyan |
| Work | `/work` | List (glass cards) | Orange → Amber |
| Books | `/books` | Visual grid (2:3 covers) | Emerald → Mint |
| Movies | `/movies` | Visual grid (2:3 posters) | Rose → Pink |
| Music | `/music` | Visual grid (1:1 album art) | Violet → Lavender |
| Blog | External | Opens Substack in new tab | — |

**Out of scope for initial build:**
- Book detail pages (`/books/:id`) -- the grid is the experience. Can be added later.
- Dark mode -- light theme only for now.

---

## Design System

### Color Palette

#### Base

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#fafafa` | Page background |
| `--fg` | `#111111` | Primary text |
| `--muted` | `#555555` | Secondary text |
| `--surface` | `#f0f0f0` | Card backgrounds, hover states |
| `--border` | `#e5e5e5` | Borders, dividers |

#### Section Gradients

Each section has a gradient pair used for accents, glows, borders, and active states.

| Section | From | To | Glow Color (20% opacity) |
|---------|------|----|--------------------------|
| Home | `#0d9488` (teal) | `#22d3ee` (cyan) | `rgba(34,211,238,0.2)` |
| Work | `#ea580c` (orange) | `#fbbf24` (amber) | `rgba(251,191,36,0.2)` |
| Books | `#059669` (emerald) | `#34d399` (mint) | `rgba(52,211,153,0.2)` |
| Movies | `#e11d48` (rose) | `#fb7185` (pink) | `rgba(251,113,133,0.2)` |
| Music | `#7c3aed` (violet) | `#a78bfa` (lavender) | `rgba(167,139,250,0.2)` |

Gradients are applied as:
- `linear-gradient(135deg, from, to)` for bars, icons, text
- `radial-gradient(circle, glow-color, transparent 70%)` with `filter: blur(40-60px)` for ambient glows
- `box-shadow: 0 8px 40px glow-color` for card hover states

### Typography

| Role | Font | Weight | Size (desktop) | Tracking |
|------|------|--------|----------------|----------|
| Display (h1) | Sora | 200–300 | 44–52px | -2px |
| Heading (h2) | Sora | 300 | 32px | -1px |
| Heading (h3) | Sora | 400–500 | 18–20px | -0.5px |
| Body | DM Sans | 400 | 15px | 0 |
| Small/Caption | DM Sans | 400 | 12–13px | 0 |
| Label | DM Sans | 500 | 10–11px | 1.5px (uppercase) |
| Mono accent | Fira Code | 300–400 | 11–12px | 0.3–0.5px |

Font loading: Google Fonts with `display=swap`. Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`.

### Icons

**Library:** Phosphor Icons, Duotone weight

**Package:** `@phosphor-icons/react`

**Usage:**
- Sidebar nav: 20px, section gradient color when active, `#888` when inactive
- Inline: 16px
- Active icons get a colored glow via `filter: drop-shadow(0 0 6px <glow-color>)`

**Section icons:**
| Section | Icon |
|---------|------|
| Home | `House` |
| Work | `Briefcase` |
| Books | `BookOpen` |
| Movies | `FilmStrip` |
| Music | `MusicNotes` |
| Blog | `ArrowSquareOut` (external link indicator) |

### Spacing

Base unit: 4px. Common values:

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight gaps |
| `sm` | 8px | Icon gaps, inline spacing |
| `md` | 16px | Card padding, grid gaps |
| `lg` | 24px | Section gaps |
| `xl` | 32px | Page padding |
| `2xl` | 48px | Section separation |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 8px | Pills, small buttons |
| `md` | 12px | Grid cards, covers |
| `lg` | 16px | Content cards, inputs |
| `xl` | 20px | Page frames, major containers |

---

## Component Specifications

### Glass Sidebar (Desktop)

**Collapsed state (default):**
- Width: 56px
- Background: `rgba(255,255,255,0.5)` with `backdrop-filter: blur(20px)`
- Border-right: `1px solid rgba(255,255,255,0.6)`
- Fixed to left edge, full viewport height
- Icons centered vertically, 28px gap between icons
- Active icon: section gradient color + glow drop-shadow
- Inactive icons: `#888`, 50% opacity
- Blog icon at bottom with `margin-top: auto`

**Expanded state (on hover):**
- Width: 180px
- Background: `rgba(255,255,255,0.55)` with `backdrop-filter: blur(20px)`
- Icons + text labels appear
- Active item: 8% opacity section color background with rounded corners (10px)
- Transition: Framer Motion `layout` animation with spring physics
- Labels stagger in with 50ms delay each

**Framer Motion config:**
```
width: { type: "spring", stiffness: 300, damping: 30 }
labels: { opacity: [0, 1], transition: { delay: index * 0.05 } }
```

### Bottom Navigation (Mobile, < 768px)

- Sidebar hidden entirely on mobile
- Bottom nav bar: glass background, fixed to bottom
- Same icons, smaller (16px)
- Active icon glows, others muted
- Height: ~56px with safe-area-inset-bottom padding

### Mesh Gradient Background

Ambient gradient blobs used on the homepage and as subtle washes on inner pages.

**Homepage:**
- 2–3 radial gradient blobs positioned absolutely
- Colors: teal/cyan + violet/lavender + a subtle pink
- `filter: blur(50-60px)`
- Animated with Framer Motion: slow x/y drift (5-10px range), opacity pulse
- Dot-grid overlay: `radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)` at 24px spacing

**Inner pages:**
- Single subtle glow blob in the section's gradient color
- Positioned in a corner, 8% opacity, blur(40px)
- Static (no animation) to keep focus on content

### Page Header Pattern

Each inner page follows this pattern:
1. Gradient accent bar: 80px wide, 3px tall, section gradient, top-left
2. Page title: Sora 32px, weight 300, tracking -1px
3. Subtitle: DM Sans 13px, `#888`, 6px below title
4. 28px gap before content

### Content Cards

**Books/Movies/Music grid items:**
- Border-radius: 12px
- Overflow: hidden
- Hover: Framer Motion `whileHover={{ scale: 1.03, y: -4 }}` with spring
- Hover glow: section-colored `box-shadow` fades in

**Work list items:**
- Glass background: `rgba(255,255,255,0.6)` with `backdrop-filter: blur(8px)`
- Border: `1px solid #eee`
- Border-radius: 14px
- Padding: 20px 24px
- Layout: flex, space-between, title+description left, date (Fira Code) right
- Hover: subtle slide right (2px) + orange glow appears

### Footer

Simple, centered footer at the bottom of every page. Matches the current site's structure:

- Social icon row: LinkedIn, GitHub, Instagram, ColoredCow — Phosphor Duotone icons, 20px
- Icons: `#888` default, section gradient color on hover (uses the current page's section color)
- Copyright line below: DM Sans 13px, `#999`
- Top border: `1px solid var(--border)`
- Padding: 32px vertical
- On mobile: same layout, stacks naturally since it's centered

**File:** `src/components/layout/Footer.tsx`

### Filter Controls

**Year filter pills (Books):**
- Active: section color text, 500 weight, section color 8% opacity background, border-radius 8px
- Inactive: `#999` text, no background
- Click toggles year filter

**Category tabs (Movies):**
- Same pattern as year pills but larger padding (8px 16px)
- Active: section color fill, inactive: transparent

**Search input:**
- Glass background, border-radius 10px
- Left-aligned search icon
- Placeholder text in `#666`

---

## Animation Specifications (Framer Motion)

### Homepage

| Element | Animation | Config |
|---------|-----------|--------|
| Name text | Fade + slide up | `y: [20, 0], opacity: [0, 1], delay: 0` |
| Hero lines | Stagger slide up | `y: [30, 0], opacity: [0, 1], stagger: 0.15` |
| Gradient bar | Width grow | `scaleX: [0, 1], delay: 0.5` |
| Mesh blobs | Slow drift + pulse | `x: [0, 10, 0], opacity: [0.5, 0.8, 0.5], duration: 6s, repeat: Infinity` |

### Page Transitions

| Transition | Animation | Config |
|------------|-----------|--------|
| Page enter | Fade + slide up | `opacity: [0, 1], y: [20, 0], duration: 0.4` |
| Page exit | Fade out | `opacity: [1, 0], duration: 0.2` |

Use `AnimatePresence` wrapping the `<Routes>` outlet.

### Sidebar

| Element | Animation | Config |
|---------|-----------|--------|
| Width change | Spring | `type: "spring", stiffness: 300, damping: 30` |
| Labels appear | Stagger fade | `opacity: [0, 1], x: [-8, 0], stagger: 0.05` |
| Icon glow (hover) | Glow intensify | `filter` transition, `duration: 0.2` |

### Content

| Element | Animation | Config |
|---------|-----------|--------|
| Grid items | Stagger in | `opacity: [0, 1], y: [20, 0], stagger: 0.05` on `useInView` |
| Card hover | Lift + glow | `scale: 1.03, y: -4, boxShadow: "0 8px 40px <glow>"` |
| Work card hover | Slide right | `x: 2, boxShadow: "0 4px 24px <glow>"` |
| Filter pill | Scale on click | `scale: [1, 0.95, 1], duration: 0.15` |

### Reduced Motion

Respect `prefers-reduced-motion`:
- Disable mesh blob animation
- Replace slide transitions with simple fades
- Disable hover scale effects
- Keep color and glow changes (non-motion)

---

## Responsive Behavior

| Breakpoint | Sidebar | Grid Columns | Notes |
|------------|---------|--------------|-------|
| ≥ 1024px | Icon rail (56px) | 5 | Full experience |
| 768–1023px | Icon rail (56px) | 3–4 | Slightly compressed |
| < 768px | Bottom nav bar | 2–3 | Sidebar hidden, bottom glass nav |

Content max-width: none (fluid within sidebar offset). Page padding: 32px desktop, 20px mobile.

---

## Data

### Books
Keep existing `src/data/books.ts` data structure. Fields needed:
- `id`, `title`, `author`, `category`, `coverUrl`, `rating`, `readDate`, `review` (optional)

### Movies
Create `src/data/movies.ts`. Fields:
- `id`, `title`, `director`, `year`, `posterUrl`, `genre`, `rating`, `category` (all-time / recent / by-genre)

### Work
Create `src/data/work.ts`. Fields:
- `id`, `title`, `company`, `description`, `startYear`, `endYear` (nullable for current)

### Music
Create `src/data/music.ts`. Fields:
- `id`, `albumName`, `artist`, `coverUrl`, `year`, `genre`, `spotifyUrl` (optional)

All data is static JSON/TS — no backend, no API calls (except Blog which is external).

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Glass sidebar (desktop)
│   │   ├── BottomNav.tsx        # Mobile bottom nav
│   │   ├── Footer.tsx           # Social links + copyright
│   │   └── Layout.tsx           # Main layout wrapper
│   ├── shared/
│   │   ├── MeshGradient.tsx     # Animated gradient background
│   │   ├── PageHeader.tsx       # Gradient bar + title + subtitle
│   │   ├── GlassCard.tsx        # Reusable glass card
│   │   └── GridCard.tsx         # Book/Movie/Music grid item
│   └── ui/                      # Minimal: only what's actually used
├── pages/
│   ├── Home.tsx
│   ├── Work.tsx
│   ├── Books.tsx
│   ├── Movies.tsx
│   ├── Music.tsx
│   └── NotFound.tsx
├── data/
│   ├── books.ts
│   ├── movies.ts
│   ├── work.ts
│   └── music.ts
├── hooks/
│   └── useMediaQuery.ts         # For responsive sidebar/bottom-nav
├── lib/
│   └── utils.ts                 # cn() helper, gradient configs
├── styles/
│   └── index.css                # Tailwind directives, CSS variables, font imports
├── App.tsx
└── main.tsx
```

## What Gets Deleted

Everything from the current `src/` except the data patterns. Specifically:
- All 50+ `src/components/ui/*.tsx` shadcn components
- All current pages (`Index.tsx`, `Work.tsx`, `Books.tsx`, `BookDetail.tsx`, `Movies.tsx`)
- Current `Layout.tsx`, `Footer.tsx`, `BookCard.tsx`, `StarRating.tsx`, `SubstackPosts.tsx`, `ColoredCowIcon.tsx`
- Current `App.css`, `index.css`
- Current `tailwind.config.ts` (will be rewritten)
- Current `components.json` (shadcn config)

Retain: `books.ts` data (adapt structure), `vite.config.ts` (minimal changes), `tsconfig*.json`, `package.json` (gut dependencies)
