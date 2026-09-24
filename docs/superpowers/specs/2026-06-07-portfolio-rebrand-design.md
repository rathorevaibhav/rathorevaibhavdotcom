# Portfolio Rebrand — Design Spec (Theme: "Aurora")

**Date:** 2026-06-07
**Owner:** Vaibhav Rathore
**Status:** Approved design direction → ready for implementation planning
**Site:** rathorevaibhav.com — Vite + React SPA, hosted on Vercel

---

## 1. Summary

Rebrand the personal portfolio with a **sleek, premium, light-first** aesthetic inspired by Apple — calm typography, generous whitespace, refined scroll motion, and **one signature interactive 3D moment** (the "Spotlight" hero). The existing page structure is preserved (Home, Work, Books, Movies, Music, Blog). The site is built as the **first of several swappable themes** ("Aurora"), on a foundation that lets new themes and per-user A/B testing slot in later with minimal rework.

---

## 2. Goals

- Elevate today's generic, templated look into a distinctive, premium experience.
- Keep the existing information architecture and pages; highlight **work, hobbies, interests**.
- Apple-style **scroll/interaction polish** plus **one** signature 3D moment.
- Establish a **theme-ready architecture** — Aurora is "theme #1"; content is decoupled from presentation.
- Fast, accessible, and maintainable.

### Non-goals (for this iteration)

- **Dark mode** — not built now, but tokens are structured so a dark variant can be added per theme later.
- **Real-time 3D instruments** on the Music page — explored and intentionally dropped for now.
- **A/B testing engine, analytics, theme-switcher UI, Next.js migration** — architected-for, built later.
- **Third-party embeds** (e.g., Spotify) on the Music page.

---

## 3. Current state (what exists today)

- **Stack:** Vite, React 18, TypeScript, Tailwind, shadcn/ui (many Radix components), React Router v6, TanStack Query, `next-themes` (installed, unused).
- **Look:** light-mode only, **Nunito** font, **purple** accent (`#6E59A5`), card-heavy, basic fade-ins. Generic.
- **Pages:** Home (`Index`), Work (timeline), Books (+ `BookDetail`, `StarRating`), Movies (recently watched + favorites). `Music` is in the nav **but the route/page does not exist (dead link)**. Blog is an external Substack link.
- **Content:** mostly hardcoded placeholder copy inside page components.
- **Leftovers:** README + `index.html` reference Lovable; `index.html` loads `https://cdn.gpteng.co/gptengineer.js`; OG image points at Lovable.

---

## 4. Design direction — "Aurora"

Sleek & premium, **light-first**. Cool neutrals, lots of air, one confident accent, and a quiet "lighting" thread that ties the whole site to the Spotlight hero. Timeless and calm over loud/flashy. (Chosen over warmer/"luminous" and high-contrast/"mono" alternatives.)

---

## 5. Visual identity

### Color (light-first) — to become CSS variables / Tailwind tokens

| Role | Hex | Notes |
|---|---|---|
| Canvas | `#FFFFFF` | page background |
| Surface | `#F4F6FB` | soft section background |
| Surface 2 | `#EAEEF9` | deeper panel |
| Hairline | `#E6E8F0` | borders/dividers |
| Ink (primary) | `#0D1230` | deep indigo-navy text |
| Ink (soft) | `#55597A` | secondary text |
| Ink (tertiary) | `#9A9AA3` | labels/captions |
| **Accent (indigo)** | **`#3B5BFF`** | primary accent; hover ≈ `#2E49E6`; tint `#DFE4FF` |
| Glow (periwinkle) | `#7D8BFF` | lighting/orb glow |

Tokens authored so a future **dark** theme variant maps cleanly (semantic names, not raw colors, in components).

### Typography — **Inter** (replaces Nunito)

- Display / H1: Inter 800, tight tracking (≈ -0.03em), large/clamped.
- H2 / H3: Inter 700 / 600.
- Body: Inter 400–450, generous line-height (~1.6).
- Eyebrow / label: Inter 600, uppercase, letter-spacing ~0.14em, small.

Rationale: Inter is clean and SF-like — reads "Apple/premium" without the rounded, friendly feel of Nunito.

### Form & elevation

- **Pill** buttons; **16–20px** card radius; **very soft, layered** low-opacity shadows; **hairline** dividers.

### "Lighting" motif (the signature thread)

The Spotlight orb anchors the hero. Elsewhere the same light returns *quietly*: a soft indigo glow behind a heading, a gentle hover-lift, light-following highlights on focus. Subtle, never neon.

---

## 6. Signature moment — the "Spotlight" hero

**Bright studio** treatment (light-first): a glossy 3D **orb that behaves like a movable light**. It follows the cursor and the hero subtly lights up around it; gentle idle motion when untouched.

- **Tech:** real WebGL via **React Three Fiber + drei** (one scene, hero only).
- **Performance:** the orb is the *only* WebGL on the site; **lazy-loaded** (dynamic import) after first paint.
- **Fallback:** a static, pre-lit image/composition for no-JS, slow connections, low-power/mobile, and `prefers-reduced-motion`.
- **Reduced motion:** static lit composition; no cursor tracking.
- **Optional enhancement:** a faint glassy **refraction** on the orb (the "Prism" nod) — nice-to-have in polish.

---

## 7. Motion system (Apple-style)

- **Scroll-reveals:** sections/elements fade + rise as they enter, via **Framer Motion** (its `whileInView`), keeping animations off the main thread where possible.
- **Pinned hero handoff:** as you scroll out of the hero, the orb scales/drifts and the headline settles into the page.
- **Subtle parallax / depth** on imagery and the orb's glow echoes.
- **Smooth/momentum scroll** via **Lenis** — kept subtle, **easy to disable**, and gated behind `prefers-reduced-motion`.
- **Route transitions:** soft cross-fade between pages.
- Everything honors `prefers-reduced-motion` (motion off → clean static layout).

---

## 8. Information architecture & pages (structure preserved)

**Global** — Header: sticky, minimal, blurs content on scroll; links: Home · Work · Books · Movies · **Music** · Blog↗. Footer: restyled, social icons with hover-glow.

- **Home:** hero (Spotlight) → "What I work on" (ColoredCow featured) → **Hobbies + Interests** → **NEW "Currently" strip** (teases latest book / film / track, pulled from the content layer) → Blog (Substack post previews as Aurora cards).
- **Work:** the professional **timeline**, refined; indigo nodes that "light up" as they reach center; each entry slides + fades in on scroll.
- **Books:** grid + detail pages + star ratings (kept); cleaner cover cards, hover lift, optional sort (rating/recent); covers fade up in a stagger.
- **Movies:** "recently watched" feature + all-time favorites grid (kept); bigger feature poster, refined genre badges, tidy responsive grid.
- **Music:** **NEW** page — fixes the dead nav link. See §9.
- **Blog & Footer:** blog stays external (Substack); latest posts shown on Home as Aurora cards.

---

## 9. Music page (detailed)

**Concept:** "I don't just listen — I play." Musician-first, then listener.

1. **Intro** stating he's a player (guitar + mandolin).
2. **Two instrument showcases, shown separately:**
   - **Guitar** — classical/cutaway body, **6 strings**, standard tuning **E A D G B E**, warm tone.
   - **Mandolin** — **A-style** teardrop body (rounded, smooth lower bout, sized ~5/6 of the guitar), **8 strings in 4 courses**, standard tuning **G D A E**, bright paired-string tone.
   - Rendered as elegant **Aurora line-art (SVG)** that draws itself in on scroll.
   - **Playable strings** via **Web Audio**, using **Karplus–Strong** plucked-string synthesis (rings and decays naturally — not a synthy/electric blip). Tap or strum a string; **press & hold a mandolin course = tremolo** (its signature rapid re-picking). Generous invisible hit-zones so strings are easy to target despite realistic spacing.
   - A short **personal note** per instrument (style, years playing, what they love) — content from user.
3. **Listener section:** "On repeat" + "All-time favourites" — **curated albums/artists only, no third-party embeds.**

**Accessibility:** strings are keyboard-activatable with aria labels; audio is opt-in (starts on first user interaction, per browser autoplay rules); `prefers-reduced-motion` disables draw-in and string vibration.

**From user (later):** instrument notes + a handful of favorite albums/artists.

---

## 10. Content strategy

The user has ideas but not final copy. Approach:
- I draft **tasteful placeholder copy in Vaibhav's voice** (hero headline/subhead, work entries, Music intro, "Currently" strip), clearly marked as editable.
- No photo required for launch — the orb is the hero.
- **From user, when ready:** real role/project descriptions, instrument notes, favorite albums/artists, confirmation of social links, optional photo.
- All content lives in the **content layer** (§11), never hardcoded in theme components.

---

## 11. Architecture — theme-ready foundation

**Decision:** build Aurora as **theme #1** inside a structure that supports many themes and future per-user A/B testing, while staying a Vite SPA for now.

- **Content layer** (`src/content/`): typed **single source of truth** for all page content (bio, work, books, movies, music/instruments, hobbies, interests, links), decoupled from any theme.
- **Theme modules** (`src/themes/<id>/`): each theme owns its **components** (Layout, nav, footer, per-page sections) **and design tokens**. Because each theme owns its components, themes may differ in **layout — small to significant**, not just color. Aurora is the first.
- **Theme registry + resolver:** registry maps `themeId → lazily-loaded theme module` (each theme is **code-split**, so a visitor downloads only the active theme; Aurora's R3F/Three never bloats a lighter theme). The resolver picks the active theme (default Aurora now; `?theme=` override; cookie/session later) and renders its Layout + the current route's page component.
- **Routing:** shared routes; route → page resolves to the active theme's component.
- **Stay a Vite SPA** now. Deferred (no rework needed when added): A/B bucketing across N themes, analytics, a theme-switcher UI, and an optional **Next.js-on-Vercel / edge-middleware** migration (the "proper" upgrade for flash-free, edge-bucketed A/B + server analytics).

---

## 12. Tech stack & cross-cutting concerns

**Keep:** Vite · React 18 · TypeScript · Tailwind · shadcn/ui · React Router · TanStack Query.

**Add:**
- `@react-three/fiber` + `@react-three/drei` + `three` — Spotlight orb (hero only, lazy-loaded).
- `framer-motion` — scroll-reveals + route transitions.
- `lenis` — smooth/momentum scroll (reduced-motion gated, easy to disable).
- **Inter** font (via `@fontsource/inter` or Google Fonts).

**Re-theme:** replace the CSS variables in `index.css` + `tailwind.config.ts` with Aurora tokens; retire Nunito + the old purple.

**Housekeeping:** update `<title>` / description / OG / Twitter meta for the rebrand; remove the leftover Lovable `gptengineer.js` script and stale OG image; refresh README.

**Performance budget:** lazy 3D + static fallback; per-theme code splitting; optimized images; watch LCP/CLS; the orb defers until after first paint.

**Accessibility:** semantic HTML; visible focus states; sufficient contrast (body text uses deep ink, not the accent); `prefers-reduced-motion` honored throughout; keyboard support + aria for the interactive instruments.

---

## 13. Build phases

1. **Foundation + Home (the "wow"):** theme architecture (content layer, Aurora theme module, registry/resolver, lazy loading) · Aurora tokens + Inter · restyled Layout/nav/footer · Home with the **Spotlight hero** + "Currently" strip · motion system · reduced-motion support.
2. **The rest of the pages:** Work · Books (+ detail) · Movies · the **new Music page** (line-art instruments + playable strings + mandolin tremolo).
3. **Polish:** refine the 3D orb (optional refraction) · performance + accessibility pass · meta/SEO + Lovable cleanup · fill in real content.

**Later (no rework needed):** additional themes · A/B bucketing + analytics · theme-switcher UI · dark mode · Spotify integration · possible Next.js/edge migration.

---

## 14. Risks / open items

- **Smooth scroll (Lenis)** can read as "hijacking" to some users — keep it subtle and trivially disableable.
- **3D performance** on low-end/mobile — mitigated by lazy load + static fallback + reduced-motion.
- **Web Audio autoplay policies** — audio begins only on first user interaction.
- **Real content pending** from the user — placeholders until provided.

---

## 15. Success criteria

- Reads as premium / Apple-like and light-first; a clear step-change from the current site.
- The Spotlight hero works (with a graceful fallback) and respects reduced motion.
- All existing pages preserved; the **Music page exists** and the nav has **no dead links**.
- **Theme-ready:** adding a second theme requires **no content rework** (content layer is reused as-is).
- Fast (good Lighthouse scores) and accessible.
