# Aurora Polish — Implementation Plan (Plan 3 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use `- [ ]`.

**Goal:** Final polish for the Aurora rebrand — remove dead/legacy code, de-Lovable the project (SEO/meta + scripts + README), add Apple-style route cross-fades, make the playable instruments keyboard-accessible, and tune the hero orb material.

**Tech Stack:** unchanged. No new deps (we *remove* `lovable-tagger`).

**⚠️ Node:** prefix every node/npm/npx command with `export PATH="$HOME/.nvm/versions/node/v20.19.5/bin:$PATH"`. Verify `node -v` → `v20.19.5`.

**Branch:** `rebrand/aurora-theme`. Full gate per task: `npm test` + `npx tsc --noEmit` + `npm run build`.

---

## Task 1: Move NotFound into Aurora + delete legacy/dead files

After Plan 2, the manifest imports every page from `./pages/*` except `notFound` (still `@/pages/NotFound`). Move it in, then delete the now-unused legacy files.

**Files:** Create `src/themes/aurora/pages/NotFound.tsx`; Modify `src/themes/aurora/index.ts`; Delete legacy files.

- [ ] **Step 1:** Create `src/themes/aurora/pages/NotFound.tsx` by copying the CURRENT contents of `src/pages/NotFound.tsx` verbatim (it was already made on-brand in Plan 1). If it imports from `react-router-dom`, keep those imports.
- [ ] **Step 2:** In `src/themes/aurora/index.ts`, change `import NotFound from "@/pages/NotFound";` → `import NotFound from "./pages/NotFound";`.
- [ ] **Step 3:** Verify nothing else imports the legacy files, then delete the dead ones. For EACH file below, run `grep -rln "<import path>" src/` first; only delete if the sole remaining reference is the file itself:
  - `src/pages/Index.tsx`, `src/pages/Work.tsx`, `src/pages/Books.tsx`, `src/pages/BookDetail.tsx`, `src/pages/Movies.tsx`, `src/pages/NotFound.tsx`
  - `src/components/Layout.tsx` (Aurora has its own)
  - `src/components/BookCard.tsx` (Aurora has its own at `src/themes/aurora/components/BookCard.tsx`)
  - `src/components/ColoredCowIcon.tsx` — ONLY if grep shows no remaining importers (the Aurora footer uses a lucide icon for ColoredCow). If something still imports it, keep it.
  Use `git rm` for tracked files.
  **Keep:** `src/components/SubstackPosts.tsx` (used by Home), `src/components/StarRating.tsx` (used by Aurora Books/BookDetail/BookCard), and everything under `src/components/ui/`.
- [ ] **Step 4: full gate** — `npm test`, `npx tsc --noEmit`, `npm run build` all pass (tsc/build will fail if a deleted file was still referenced — that's the safety net).
- [ ] **Step 5: commit** `git add -A && git commit -m "chore: move NotFound into Aurora; remove legacy pages/components"`

---

## Task 2: De-Lovable — SEO/meta, scripts, README, tagger

**Files:** Modify `index.html`, `README.md`, `vite.config.ts`, `package.json`

- [ ] **Step 1: `index.html`** — replace the `<head>` contents to real, on-brand meta and REMOVE the `gptengineer.js` script + Lovable OG image. Target `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vaibhav Rathore — Software Engineer</title>
    <meta name="description" content="Vaibhav Rathore — software engineer at ColoredCow. Work, books, films, and the guitar & mandolin I play." />
    <meta name="author" content="Vaibhav Rathore" />
    <meta name="theme-color" content="#3B5BFF" />

    <meta property="og:title" content="Vaibhav Rathore — Software Engineer" />
    <meta property="og:description" content="Software engineer at ColoredCow. Work, books, films, and music." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rathorevaibhav.com" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Vaibhav Rathore — Software Engineer" />
    <meta name="twitter:description" content="Software engineer at ColoredCow. Work, books, films, and music." />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
(The `gptengineer.js` script tag and the `lovable.dev` OG image are removed. No `og:image` is set rather than pointing at Lovable — a real OG image can be added later.)
- [ ] **Step 2: `vite.config.ts`** — remove the `lovable-tagger`: delete the `import { componentTagger } from "lovable-tagger";` line and change `plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),` to `plugins: [react()],`. Keep the `vitest/config` import, alias, server, and `test` block exactly.
- [ ] **Step 3:** `export PATH=...; npm uninstall lovable-tagger`
- [ ] **Step 4: `README.md`** — replace the Lovable boilerplate with:
```markdown
# rathorevaibhav.com

Personal site of Vaibhav Rathore — software engineer at ColoredCow.

Built with Vite + React + TypeScript + Tailwind + shadcn/ui. The UI is organized as **swappable themes** (`src/themes/`), with all content in a single **content layer** (`src/content/`). The current theme is **Aurora** (light-first, with a 3D "Spotlight" hero and a playable Music page).

## Requirements
- **Node 20+** (an `.nvmrc` pins 20). Run `nvm use` before installing.

## Develop
```sh
nvm use
npm install
npm run dev      # http://localhost:8080
npm test         # Vitest
npm run build    # production build
```

## Structure
- `src/content/` — typed content (single source of truth)
- `src/themes/<id>/` — a theme's components + pages (Aurora is theme #1)
- `src/themes/registry.ts` / `resolver.ts` — theme selection (cookie/query/default)

Deployed on Vercel.
```
- [ ] **Step 5: full gate** (test/tsc/build — build must still succeed without the tagger).
- [ ] **Step 6: commit** `git add -A && git commit -m "chore: de-Lovable (meta/OG, remove gptengineer script + tagger, real README)"`

---

## Task 3: Apple-style route cross-fade

**Files:** Modify `src/themes/aurora/Layout.tsx`

- [ ] **Step 1:** In `src/themes/aurora/Layout.tsx`, wrap the `<Outlet />` in an `AnimatePresence` cross-fade keyed by pathname, reduced-motion aware. Add imports:
```tsx
import { Outlet, useLocation, Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
```
Then replace `<main className="flex-1"><Outlet /></main>` with:
```tsx
        <main className="flex-1">
          <RouteFade />
        </main>
```
and add this component in the same file (above `export default function AuroraLayout`):
```tsx
function RouteFade() {
  const location = useLocation();
  const reduced = useReducedMotion();
  if (reduced) return <Outlet />;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
```
(Keep the existing `Link`/`NavLink`/`Outlet` usage in the header; just ensure the imports include `useLocation`.)
- [ ] **Step 2: full gate.** The existing `Layout.test.tsx` must still pass (it renders a routed body inside the Layout — the fade wrapper renders children synchronously).
- [ ] **Step 3: commit** `git add src/themes/aurora/Layout.tsx && git commit -m "feat: soft cross-fade page transitions (reduced-motion aware)"`

---

## Task 4: Keyboard accessibility for the playable strings

**Files:** Modify `src/themes/aurora/music/PlayableInstrument.tsx`; Modify `src/themes/aurora/music/PlayableInstrument.test.tsx`

- [ ] **Step 1:** Make each `[data-hit]` lane keyboard-operable. On the hit `<line>`, add: `role="button"`, `tabIndex={0}`, an `aria-label` (e.g. `\`Pluck ${config.id} string ${i + 1}\``), and an `onKeyDown` that plucks on Enter/Space:
```tsx
            role="button"
            tabIndex={0}
            aria-label={`Pluck ${config.id} string ${i + 1}`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pluck(i); } }}
```
(Add these to the existing hit `<line>` alongside the pointer handlers.) Also add a focus-visible style in the instrument CSS in `src/index.css`:
```css
  .instrument-svg [data-hit]:focus-visible { outline: 2px solid hsl(var(--primary)); outline-offset: 2px; }
```
- [ ] **Step 2:** extend `PlayableInstrument.test.tsx` with an assertion that hit lanes are focusable buttons:
```tsx
  it("exposes keyboard-operable string controls", () => {
    const { container } = render(<PlayableInstrument config={GUITAR} />);
    const hits = container.querySelectorAll('[data-hit][role="button"]');
    expect(hits.length).toBe(GUITAR.strings.length);
    expect(hits[0].getAttribute("tabindex")).toBe("0");
  });
```
- [ ] **Step 3: full gate** (`npm test -- PlayableInstrument` + full suite + tsc + build).
- [ ] **Step 4: commit** `git add src/themes/aurora/music/PlayableInstrument.tsx src/themes/aurora/music/PlayableInstrument.test.tsx src/index.css && git commit -m "a11y: keyboard-operable instrument strings + focus ring"`

---

## Task 5: Hero orb material polish

**Files:** Modify `src/themes/aurora/hero/OrbScene.tsx`

- [ ] **Step 1:** Give the orb a glassier, more premium surface with a subtle clearcoat (keeps the drei `Environment` reflections). Replace the `<meshStandardMaterial .../>` line in `src/themes/aurora/hero/OrbScene.tsx` with:
```tsx
        <meshPhysicalMaterial color="#e9ecff" metalness={0.35} roughness={0.12} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.2} />
```
Leave the rest of the scene (camera, lights, cursor-follow point light, `Environment preset="city"`, rotation) unchanged.
- [ ] **Step 2: full gate** — `npm run build` succeeds; the orb chunk remains lazy. (Visual quality is confirmed by the human during final verification — the always-on CSS fallback still protects against any WebGL issue.)
- [ ] **Step 3: commit** `git add src/themes/aurora/hero/OrbScene.tsx && git commit -m "polish: glassier hero orb (physical material + clearcoat)"`

---

## Task 6: Final verification + review + finish

- [ ] **Step 1:** `npm test` (all pass), `npx tsc --noEmit` (clean), `npm run build` (succeeds), dev smoke (`npm run dev` → curl `:8080` → 200).
- [ ] **Step 2:** Confirm de-Lovable: `grep -rn "gpteng\|lovable" index.html vite.config.ts package.json README.md` returns nothing (or only incidental).
- [ ] **Step 3:** Dispatch a final code-review subagent over the Plan 2+3 diff; fix any must-fix findings.
- [ ] **Step 4:** Use superpowers:finishing-a-development-branch to present integration options.

---

## Spec coverage (Plan 3)
- §12 SEO/meta + remove Lovable script + README → Task 2.
- §7 route cross-fade → Task 3.
- §12 a11y (keyboard for interactive instruments, focus) → Task 4.
- §6 orb polish (material; refraction nod via clearcoat/physical) → Task 5.
- Cleanup of dead `src/pages/*` + old `Layout`/`BookCard`/`Index` → Task 1.

**Intentionally deferred (out of scope, low value/high effort):** shrinking the Three.js chunk below Vite's 500 kB warning (it's lazy + gated; three core is irreducibly large), full dark-mode theme, Spotify integration, Next.js/edge migration, real OG image asset. Instrument string-geometry fine-tuning is a visual pass for the owner.
