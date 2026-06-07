# Aurora Pages + Music — Implementation Plan (Plan 2 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Redesign the remaining pages (Work, Books + detail, Movies) into the Aurora theme, and build the full interactive **Music** page (playable line-art guitar + A-style mandolin with Web-Audio Karplus–Strong synthesis and mandolin tremolo) — all consuming the content layer.

**Architecture:** Each page becomes an Aurora-owned component under `src/themes/aurora/pages/` (and Aurora-owned sub-components under `src/themes/aurora/`), consuming `src/content`. The Aurora manifest (`src/themes/aurora/index.ts`) is repointed from the legacy `@/pages/*` to these. Legacy `src/pages/*` are left in place (dead) for Plan 3 cleanup. Reuse Aurora primitives from Plan 1: `Container`, `Reveal`, card token classes (`shadow-soft`, `bg-card`, `border-border`, `rounded-2xl`), `StarRating` (reused as-is).

**Tech Stack:** Same as Plan 1. Music audio uses the browser **Web Audio API** (no new deps). Tests via Vitest + RTL.

**⚠️ Node:** Every `node`/`npm`/`npx` command must be prefixed with `export PATH="$HOME/.nvm/versions/node/v20.19.5/bin:$PATH"` (shell default is Node 12, too old). Verify `node -v` → `v20.19.5`.

**Branch:** continue on `rebrand/aurora-theme`. Full gate per task: `npm test`, `npx tsc --noEmit`, `npm run build` (all pass — there is no dangling-import phase in this plan).

---

## File structure (Plan 2)

**Created**
- `src/themes/aurora/pages/Work.tsx` (+ `Work.test.tsx`)
- `src/themes/aurora/pages/Books.tsx`, `BookDetail.tsx` (+ `Books.test.tsx`)
- `src/themes/aurora/components/BookCard.tsx`
- `src/themes/aurora/pages/Movies.tsx` (+ `Movies.test.tsx`)
- `src/themes/aurora/music/audio.ts` (+ `audio.test.ts`) — Karplus–Strong engine
- `src/themes/aurora/music/PlayableInstrument.tsx` — SVG line-art instrument with playable strings
- `src/themes/aurora/music/instrumentConfigs.ts` — guitar + mandolin geometry/tuning
- `src/themes/aurora/pages/Music.tsx` (+ `Music.test.tsx`)

**Modified**
- `src/content/movies.ts` — full 23-film list migrated from the legacy page
- `src/content/music.ts` — (already has instruments + favorites; no change unless noted)
- `src/themes/aurora/index.ts` — repoint pages to the new Aurora components; drop `MusicPlaceholder`
- Delete `src/themes/aurora/pages/MusicPlaceholder.tsx` (superseded)

---

## Task 1: Migrate full Movies data into the content layer

**Files:** Modify `src/content/movies.ts`

- [ ] **Step 1: Replace `src/content/movies.ts`** with the full list (the recently-watched film keeps `recent: true`, the 23 favourites from the legacy page, titles reconciled):
```ts
import type { Movie } from "./types";
export const movies: Movie[] = [
  { title: "Superboys of Malegaon", year: 2024, director: "Reema Kagti", genre: ["Biography", "Comedy", "Drama"], image: "https://m.media-amazon.com/images/M/MV5BYmJjZGFkMzktMjAxZC00ZTNiLTljMzItYzVjMTcyYWNiYWNkXkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg", recent: true },
  { title: "War Dogs", year: 2016, genre: ["Comedy", "Crime", "Drama"] },
  { title: "Ready Player One", year: 2018, genre: ["Sci-Fi", "Action", "Adventure"] },
  { title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Adventure", "Drama"] },
  { title: "Top Gun: Maverick", year: 2022, genre: ["Action", "Drama"] },
  { title: "Yesterday", year: 2019, genre: ["Comedy", "Music", "Fantasy"] },
  { title: "Edge of Tomorrow", year: 2014, genre: ["Action", "Sci-Fi"] },
  { title: "Spider-Man: No Way Home", year: 2021, genre: ["Action", "Adventure", "Fantasy"] },
  { title: "Ad Astra", year: 2019, genre: ["Sci-Fi", "Adventure", "Drama"] },
  { title: "Godzilla Minus One", year: 2023, genre: ["Action", "Adventure", "Drama"] },
  { title: "The Big Short", year: 2015, genre: ["Biography", "Comedy", "Drama"] },
  { title: "Article 370", year: 2023, genre: ["Drama", "Thriller"] },
  { title: "Maharaja", year: 2023, genre: ["Action", "Drama"] },
  { title: "The Truman Show", year: 1998, genre: ["Comedy", "Drama"] },
  { title: "Moneyball", year: 2011, genre: ["Biography", "Drama", "Sport"] },
  { title: "Oppenheimer", year: 2023, genre: ["Biography", "Drama", "History"] },
  { title: "The Prestige", year: 2006, genre: ["Drama", "Mystery", "Sci-Fi"] },
  { title: "The Intern", year: 2015, genre: ["Comedy", "Drama"] },
  { title: "Se7en", year: 1995, genre: ["Crime", "Drama", "Mystery"] },
  { title: "Laapataa Ladies", year: 2023, genre: ["Comedy", "Drama"] },
  { title: "Badla", year: 2019, genre: ["Crime", "Drama", "Mystery"] },
  { title: "Inglourious Basterds", year: 2009, genre: ["Adventure", "Drama", "War"] },
  { title: "Air", year: 2023, genre: ["Drama", "Sport"] },
  { title: "The Green Mile", year: 1999, genre: ["Crime", "Drama", "Fantasy"] },
];
```
- [ ] **Step 2:** `npm test` (selectors still pass — `getRecentMovie` finds the `recent` film), `npx tsc --noEmit` clean.
- [ ] **Step 3: Commit** `git add src/content/movies.ts && git commit -m "feat: migrate full movies list into content layer"`

---

## Task 2: Aurora Work page

**Files:** Create `src/themes/aurora/pages/Work.tsx`, `src/themes/aurora/pages/Work.test.tsx`; Modify `src/themes/aurora/index.ts`

- [ ] **Step 1: failing test `Work.test.tsx`:**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Work from "./Work";

describe("Aurora Work", () => {
  it("renders the heading and a role from the content layer", () => {
    render(<MemoryRouter><Work /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: /work/i })).toBeInTheDocument();
    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
  });
});
```
- [ ] **Step 2:** run `npm test -- Work` → FAIL.
- [ ] **Step 3: implement `src/themes/aurora/pages/Work.tsx`:**
```tsx
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { workEntries } from "@/content";

export default function Work() {
  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Work</p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">My professional journey</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">Roles, milestones, and the products I've helped build.</p>
      </Reveal>

      <div className="relative mt-14 pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden />
        <div className="space-y-10">
          {workEntries.map((w, i) => (
            <Reveal key={w.year + w.title} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/.12)]" aria-hidden />
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift">
                  <div className="mb-1 text-sm font-semibold text-primary">{w.year}</div>
                  <h2 className="text-xl font-bold">{w.title}{w.org ? <span className="text-muted-foreground font-medium"> · {w.org}</span> : null}</h2>
                  <p className="mt-2 text-muted-foreground">{w.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
```
- [ ] **Step 4:** run `npm test -- Work` → PASS.
- [ ] **Step 5: repoint manifest** — in `src/themes/aurora/index.ts`, replace `import Work from "@/pages/Work";` with `import Work from "./pages/Work";` (keep the `pages.work` mapping).
- [ ] **Step 6: full gate** `npm test`, `npx tsc --noEmit`, `npm run build` — all pass.
- [ ] **Step 7: commit** `git add src/themes/aurora/pages/Work.tsx src/themes/aurora/pages/Work.test.tsx src/themes/aurora/index.ts && git commit -m "feat: Aurora Work page (timeline from content)"`

---

## Task 3: Aurora Books page + Aurora BookCard

**Files:** Create `src/themes/aurora/components/BookCard.tsx`, `src/themes/aurora/pages/Books.tsx`, `src/themes/aurora/pages/Books.test.tsx`; Modify `src/themes/aurora/index.ts`

- [ ] **Step 1: `src/themes/aurora/components/BookCard.tsx`:**
```tsx
import { Link } from "react-router-dom";
import type { Book } from "@/content";
import { StarRating } from "@/components/StarRating";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
        <div className="aspect-[2/3] overflow-hidden bg-surface-2">
          <img src={book.coverImage} alt={`${book.title} cover`} loading="lazy"
               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4">
          <div className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{book.category}</div>
          <h3 className="line-clamp-2 text-base font-semibold leading-tight">{book.title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{book.author}</p>
          <div className="mt-2"><StarRating rating={book.rating} /></div>
        </div>
      </div>
    </Link>
  );
}
```
- [ ] **Step 2: failing test `Books.test.tsx`:**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Books from "./Books";

describe("Aurora Books", () => {
  it("renders the heading and at least one book title", () => {
    render(<MemoryRouter><Books /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: /books/i })).toBeInTheDocument();
    expect(screen.getByText(/Becoming a Technical Leader/i)).toBeInTheDocument();
  });
});
```
- [ ] **Step 3:** `npm test -- Books` → FAIL.
- [ ] **Step 4: implement `src/themes/aurora/pages/Books.tsx`** (search + category filter, Aurora-styled; uses content `books`):
```tsx
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { BookCard } from "../components/BookCard";
import { books } from "@/content";

export default function Books() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => [...new Set(books.map((b) => b.category))].sort(), []);
  const filtered = useMemo(
    () =>
      books.filter((b) => {
        const q = query.toLowerCase();
        const matchesQ = b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
        const matchesCat = category === "all" || b.category === category;
        return matchesQ && matchesCat;
      }),
    [query, category]
  );

  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Books</p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Books I've read</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">Notes and ratings on what I've been reading.</p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or author" className="pl-10" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-[220px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {filtered.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">No books match your search.</p>
      )}
    </Container>
  );
}
```
- [ ] **Step 5:** `npm test -- Books` → PASS.
- [ ] **Step 6: repoint manifest** — `import Books from "./pages/Books";` (replace the `@/pages/Books` import). (BookDetail repointed in Task 4.)
- [ ] **Step 7: full gate** (test/tsc/build).
- [ ] **Step 8: commit** `git add src/themes/aurora/components/BookCard.tsx src/themes/aurora/pages/Books.tsx src/themes/aurora/pages/Books.test.tsx src/themes/aurora/index.ts && git commit -m "feat: Aurora Books page + book card"`

---

## Task 4: Aurora BookDetail page

**Files:** Create `src/themes/aurora/pages/BookDetail.tsx`; Modify `src/themes/aurora/index.ts`

- [ ] **Step 1: implement `src/themes/aurora/pages/BookDetail.tsx`:**
```tsx
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Container } from "../components/Container";
import { books } from "@/content";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find that book.</p>
        <Button asChild className="mt-6 rounded-full"><Link to="/books">Back to books</Link></Button>
      </Container>
    );
  }

  return (
    <Container className="py-16 md:py-20">
      <Link to="/books" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
        <ArrowLeft className="h-4 w-4" /> Back to all books
      </Link>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-soft aspect-[2/3]">
            <img src={book.coverImage} alt={`${book.title} cover`} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{book.category}</div>
          <h1 className="text-3xl font-extrabold tracking-tight">{book.title}</h1>
          <p className="mt-1 text-lg text-muted-foreground">by {book.author}</p>
          <div className="mt-3"><StarRating rating={book.rating} /></div>
          {book.readDate && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> Last read: {book.readDate}
            </div>
          )}
          <div className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><BookOpen className="h-5 w-5 text-primary" /> My thoughts</h2>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              {book.review.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
```
- [ ] **Step 2: repoint manifest** — `import BookDetail from "./pages/BookDetail";`
- [ ] **Step 3: full gate** (test/tsc/build). (Books.test covers list; BookDetail is exercised by build/tsc — no new test required, but you may add a smoke test if quick.)
- [ ] **Step 4: commit** `git add src/themes/aurora/pages/BookDetail.tsx src/themes/aurora/index.ts && git commit -m "feat: Aurora book detail page"`

---

## Task 5: Aurora Movies page

**Files:** Create `src/themes/aurora/pages/Movies.tsx`, `src/themes/aurora/pages/Movies.test.tsx`; Modify `src/themes/aurora/index.ts`

- [ ] **Step 1: failing test `Movies.test.tsx`:**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Movies from "./Movies";

describe("Aurora Movies", () => {
  it("renders heading + the recently-watched feature + a favourite", () => {
    render(<Movies />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Recently watched/i)).toBeInTheDocument();
    expect(screen.getByText(/Interstellar/i)).toBeInTheDocument();
  });
});
```
- [ ] **Step 2:** `npm test -- Movies` → FAIL.
- [ ] **Step 3: implement `src/themes/aurora/pages/Movies.tsx`** (featured recent + favourites grid; `recent` filtered out of the grid; stable order — no random shuffle):
```tsx
import { Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { movies } from "@/content";

export default function Movies() {
  const recent = movies.find((m) => m.recent);
  const favourites = movies.filter((m) => !m.recent);

  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Movies</p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Cinematic journey</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">The rare films that left a mark — ones I think everyone should see at least once.</p>
      </Reveal>

      {recent && (
        <section className="mt-14">
          <div className="mb-4 flex items-center gap-2"><Film className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">Recently watched</h2></div>
          <Reveal>
            <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:grid-cols-3">
              {recent.image && (
                <div className="md:col-span-1"><img src={recent.image} alt={recent.title} className="h-64 w-full object-cover md:h-full" /></div>
              )}
              <div className="p-6 md:col-span-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold">{recent.title}</h3>
                  <span className="text-sm text-muted-foreground">{recent.year}</span>
                </div>
                {recent.director && <p className="mt-2 text-muted-foreground">Director: {recent.director}</p>}
                <div className="mt-4 flex flex-wrap gap-2">{recent.genre.map((g) => <Badge key={g} variant="outline">{g}</Badge>)}</div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mt-14">
        <div className="mb-4 flex items-center gap-2"><Film className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">All-time favourites</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-lift">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold leading-tight">{m.title}</h3>
                  <span className="text-sm text-muted-foreground">{m.year}</span>
                </div>
                <div className="mt-auto flex flex-wrap gap-1 pt-3">{m.genre.map((g) => <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
```
- [ ] **Step 4:** `npm test -- Movies` → PASS.
- [ ] **Step 5: repoint manifest** — `import Movies from "./pages/Movies";`
- [ ] **Step 6: full gate** (test/tsc/build).
- [ ] **Step 7: commit** `git add src/themes/aurora/pages/Movies.tsx src/themes/aurora/pages/Movies.test.tsx src/themes/aurora/index.ts && git commit -m "feat: Aurora Movies page (content-driven, stable order)"`

---

## Task 6: Music audio engine (Karplus–Strong)

**Files:** Create `src/themes/aurora/music/audio.ts`, `src/themes/aurora/music/audio.test.ts`

The pure sample-generation is unit-tested; the `AudioContext` playback layer is browser-only (not unit-tested).

- [ ] **Step 1: failing test `audio.test.ts`:**
```ts
import { describe, it, expect } from "vitest";
import { ksSamples } from "./audio";

describe("ksSamples (Karplus-Strong)", () => {
  it("produces a decaying buffer of the requested length", () => {
    const sr = 44100;
    const buf = ksSamples(220, 0.5, 0.996, sr);
    expect(buf.length).toBe(Math.floor(0.5 * sr));
    // energy in the first 10ms should exceed the last 10ms (it decays)
    const w = Math.floor(0.01 * sr);
    const energy = (a: Float32Array, s: number) => { let e = 0; for (let i = s; i < s + w; i++) e += a[i] * a[i]; return e; };
    expect(energy(buf, 0)).toBeGreaterThan(energy(buf, buf.length - w));
  });
});
```
- [ ] **Step 2:** `npm test -- audio` → FAIL.
- [ ] **Step 3: implement `src/themes/aurora/music/audio.ts`:**
```ts
// Karplus-Strong plucked-string synthesis. `ksSamples` is pure + testable;
// StringAudio wraps Web Audio for actual playback (browser only).

export function ksSamples(freq: number, dur: number, decay: number, sampleRate: number): Float32Array {
  const N = Math.max(2, Math.round(sampleRate / freq));
  const len = Math.floor(dur * sampleRate);
  const d = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    if (i < N) d[i] = Math.random() * 2 - 1;
    else d[i] = decay * 0.5 * (d[i - N] + d[i - N + 1]);
  }
  return d;
}

export class StringAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  private ensure(): AudioContext {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** Pluck a note. bright=true → mandolin (paired detuned strings, quicker decay). */
  pluck(freq: number, opts?: { bright?: boolean; dur?: number; decay?: number }): void {
    const ctx = this.ensure();
    const bright = opts?.bright ?? false;
    const dur = opts?.dur ?? (bright ? 1.9 : 2.9);
    const decay = opts?.decay ?? (bright ? 0.9958 : 0.9974);
    const out = ctx.createGain();
    out.gain.value = bright ? 0.4 : 0.58;
    out.connect(this.master!);
    const freqs = bright ? [freq * 0.997, freq * 1.003] : [freq];
    for (const f of freqs) {
      const data = ksSamples(f, dur, decay, ctx.sampleRate);
      const buffer = ctx.createBuffer(1, data.length, ctx.sampleRate);
      buffer.copyToChannel(data, 0);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(out);
      src.start();
    }
  }
}
```
- [ ] **Step 4:** `npm test -- audio` → PASS.
- [ ] **Step 5: commit** `git add src/themes/aurora/music/audio.ts src/themes/aurora/music/audio.test.ts && git commit -m "feat: Karplus-Strong string-audio engine"`

---

## Task 7: PlayableInstrument component + instrument configs

**Files:** Create `src/themes/aurora/music/instrumentConfigs.ts`, `src/themes/aurora/music/PlayableInstrument.tsx`, `src/themes/aurora/music/PlayableInstrument.test.tsx`

This ports the approved interactive line-art instruments (classical/cutaway guitar — 6 strings, standard EADGBE; A-style mandolin — 8 strings in 4 courses, GDAE; mandolin courses support press-and-hold tremolo). Strings have full-length invisible "lane" hit-zones for easy targeting; pluck triggers a wobble + a note via `StringAudio`.

- [ ] **Step 1: `src/themes/aurora/music/instrumentConfigs.ts`:**
```ts
export interface StringSpec { xs: number[]; freq: number; bright?: boolean; trem?: boolean; }
export interface InstrumentConfig {
  id: "guitar" | "mandolin";
  viewBox: string;
  heightPx: number;        // rendered svg height (mandolin smaller → real size ratio)
  outlinePaths: string[];  // body/neck/headstock outline <path d> strings
  holes: { cx: number; cy: number; r: number; rosette?: number }[];
  bridge: { x: number; y: number; w: number; h: number };
  strings: StringSpec[];   // each = one course; xs may hold 1 (guitar) or 2 (mandolin pair) visible lines
  stringY: [number, number];
  hit: { min: number; max: number };
}

export const GUITAR: InstrumentConfig = {
  id: "guitar", viewBox: "0 0 200 520", heightPx: 450,
  outlinePaths: [
    "M70,18 L170,18 L184,58 L54,58 Z",                       // headstock
    "M120,300 C70,300 44,318 38,352 C33,378 44,388 46,400 C30,430 26,470 40,494 C56,512 80,514 100,514 C120,514 144,512 160,494 C174,470 170,430 154,400 C156,388 166,380 168,360 C169,344 160,332 146,330 C134,328 128,318 122,308 C114,302 108,300 100,300 Z", // dreadnought-ish body
  ],
  holes: [{ cx: 100, cy: 346, r: 30, rosette: 36 }],
  bridge: { x: 80, y: 382, w: 80, h: 13 },
  strings: [
    { xs: [64], freq: 82.41 }, { xs: [86], freq: 110.0 }, { xs: [108], freq: 146.83 },
    { xs: [130], freq: 196.0 }, { xs: [152], freq: 246.94 }, { xs: [174], freq: 329.63 },
  ],
  stringY: [46, 384], hit: { min: 78, max: 122 },
};

export const MANDOLIN: InstrumentConfig = {
  id: "mandolin", viewBox: "0 0 200 520", heightPx: 375,
  outlinePaths: [
    "M74,18 L166,18 L174,58 L66,58 Z",                       // headstock
    "M100,258 C128,258 176,306 176,365 C176,410 142,446 100,446 C58,446 24,410 24,365 C24,306 72,258 100,258 Z", // A-style egg body
  ],
  holes: [{ cx: 100, cy: 322, r: 19, rosette: 24 }],
  bridge: { x: 76, y: 392, w: 48, h: 10 },
  strings: [
    { xs: [80.5, 87.5], freq: 196.0, bright: true, trem: true },
    { xs: [104.5, 111.5], freq: 293.66, bright: true, trem: true },
    { xs: [128.5, 135.5], freq: 440.0, bright: true, trem: true },
    { xs: [152.5, 159.5], freq: 659.25, bright: true, trem: true },
  ],
  stringY: [46, 358], hit: { min: 86, max: 114 },
};
```
- [ ] **Step 2: failing test `PlayableInstrument.test.tsx`:**
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PlayableInstrument } from "./PlayableInstrument";
import { GUITAR, MANDOLIN } from "./instrumentConfigs";

describe("PlayableInstrument", () => {
  it("renders an svg with the right number of string courses + hit lanes", () => {
    const { container } = render(<PlayableInstrument config={GUITAR} />);
    expect(container.querySelector("svg")).toBeTruthy();
    expect(container.querySelectorAll('[data-hit]').length).toBe(GUITAR.strings.length);
  });
  it("renders mandolin with 4 courses (8 visible strings)", () => {
    const { container } = render(<PlayableInstrument config={MANDOLIN} />);
    expect(container.querySelectorAll('[data-hit]').length).toBe(4);
    expect(container.querySelectorAll('.vis').length).toBe(8);
  });
});
```
- [ ] **Step 3:** `npm test -- PlayableInstrument` → FAIL.
- [ ] **Step 4: implement `src/themes/aurora/music/PlayableInstrument.tsx`:**
```tsx
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { StringAudio } from "./audio";
import type { InstrumentConfig } from "./instrumentConfigs";

const audio = new StringAudio();

export function PlayableInstrument({ config }: { config: InstrumentConfig }) {
  const reduced = useReducedMotion();
  const tremRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const t = tremRef.current;
    return () => { Object.values(t).forEach((id) => window.clearInterval(id)); };
  }, []);

  const [y1, y2] = config.stringY;
  const n = config.strings.length;
  const bw = (config.hit.max - config.hit.min) / n;

  function pluck(i: number) {
    const s = config.strings[i];
    audio.pluck(s.freq, { bright: s.bright });
    const g = document.getElementById(`${config.id}-str-${i}`);
    if (g && !reduced) { g.classList.remove("pluck"); void g.getBoundingClientRect(); g.classList.add("pluck"); }
  }
  function startTrem(i: number) {
    const s = config.strings[i];
    if (!s.trem || tremRef.current[i]) return;
    const g = document.getElementById(`${config.id}-str-${i}`);
    if (g && !reduced) g.classList.add("trem");
    tremRef.current[i] = window.setInterval(() => audio.pluck(s.freq, { bright: true, dur: 0.17, decay: 0.99 }), 70);
  }
  function stopTrem(i: number) {
    if (tremRef.current[i]) { window.clearInterval(tremRef.current[i]); delete tremRef.current[i]; }
    const g = document.getElementById(`${config.id}-str-${i}`);
    if (g) g.classList.remove("trem", "pluck");
  }

  return (
    <svg viewBox={config.viewBox} style={{ height: config.heightPx, width: "auto" }} className="instrument-svg overflow-visible" aria-label={`Line-art ${config.id}`} role="img">
      {config.outlinePaths.map((d, i) => <path key={i} d={d} className={`outline ${reduced ? "" : "draw"}`} />)}
      {config.holes.map((h, i) => (
        <g key={i}>
          {h.rosette && <circle cx={h.cx} cy={h.cy} r={h.rosette} className="rosette" />}
          <circle cx={h.cx} cy={h.cy} r={h.r} className="hole" />
        </g>
      ))}
      <rect x={config.bridge.x} y={config.bridge.y} width={config.bridge.w} height={config.bridge.h} rx={3} className="bridge" />
      {config.strings.map((s, i) => (
        <g key={i} id={`${config.id}-str-${i}`} className="string">
          {s.xs.map((x, j) => <line key={j} x1={x} y1={y1} x2={x} y2={y2} className="vis" />)}
        </g>
      ))}
      {config.strings.map((s, i) => {
        const cx = config.hit.min + (i + 0.5) * bw;
        return (
          <line key={`hit-${i}`} data-hit x1={cx} y1={y1 - 8} x2={cx} y2={y2 + 8}
            stroke="transparent" strokeWidth={bw} style={{ cursor: "pointer" }}
            onPointerEnter={() => pluck(i)}
            onPointerDown={() => { pluck(i); if (s.trem) startTrem(i); }}
            onPointerUp={() => stopTrem(i)}
            onPointerLeave={() => stopTrem(i)}
            onPointerCancel={() => stopTrem(i)} />
        );
      })}
    </svg>
  );
}
```
- [ ] **Step 5:** add the instrument CSS to `src/index.css` (inside `@layer base`, after the reduced-motion block):
```css
  .instrument-svg .outline { fill: #fbfcff; stroke: hsl(var(--primary)/.75); stroke-width: 2.4; stroke-linejoin: round; }
  .instrument-svg .hole { fill: hsl(var(--surface-2)); stroke: hsl(var(--primary)/.75); stroke-width: 2; }
  .instrument-svg .rosette { fill: none; stroke: hsl(var(--glow)/.6); stroke-width: 2.4; }
  .instrument-svg .bridge { fill: hsl(var(--accent)); stroke: hsl(var(--primary)/.7); stroke-width: 1.5; }
  .instrument-svg .vis { stroke: hsl(var(--glow)); stroke-width: 1.9; transition: stroke .5s ease; }
  .instrument-svg .string.pluck .vis, .instrument-svg .string.trem .vis { stroke: hsl(var(--primary)); }
  .instrument-svg .draw { stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: draw 1.8s ease forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  .instrument-svg .string.pluck { animation: pluck .5s ease-out; }
  .instrument-svg .string.trem { animation: trem .1s linear infinite; }
  @keyframes pluck { 0%{transform:translateX(0)} 15%{transform:translateX(2.6px)} 38%{transform:translateX(-2px)} 60%{transform:translateX(1.3px)} 80%{transform:translateX(-.7px)} 100%{transform:translateX(0)} }
  @keyframes trem { 0%{transform:translateX(1.8px)} 50%{transform:translateX(-1.8px)} 100%{transform:translateX(1.8px)} }
```
- [ ] **Step 6:** `npm test -- PlayableInstrument` → PASS. Full `npm test`, `tsc`, `build`.
- [ ] **Step 7: commit** `git add src/themes/aurora/music/ src/index.css && git commit -m "feat: playable line-art instruments (guitar + mandolin)"`

---

## Task 8: Music page + manifest swap

**Files:** Create `src/themes/aurora/pages/Music.tsx`, `src/themes/aurora/pages/Music.test.tsx`; Modify `src/themes/aurora/index.ts`; Delete `src/themes/aurora/pages/MusicPlaceholder.tsx`

- [ ] **Step 1: failing test `Music.test.tsx`:**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Music from "./Music";

describe("Aurora Music", () => {
  it("renders the musician intro + both instruments", () => {
    render(<Music />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Guitar/i)).toBeInTheDocument();
    expect(screen.getByText(/Mandolin/i)).toBeInTheDocument();
  });
});
```
- [ ] **Step 2:** `npm test -- Music` → FAIL.
- [ ] **Step 3: implement `src/themes/aurora/pages/Music.tsx`:**
```tsx
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PlayableInstrument } from "../music/PlayableInstrument";
import { GUITAR, MANDOLIN } from "../music/instrumentConfigs";
import { instruments, musicFavorites } from "@/content";

const configFor = { guitar: GUITAR, mandolin: MANDOLIN } as const;

export default function Music() {
  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Music</p>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">I don't just listen —<br />I play.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">Guitar and mandolin. Tap or strum the strings below; hold a mandolin course for tremolo.</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {instruments.map((inst) => (
          <Reveal key={inst.id}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-xl font-bold">{inst.name}</h2>
                <span className="rounded-full border border-accent bg-accent/40 px-3 py-1 text-xs font-semibold text-primary">♪ pluck / hold</span>
              </div>
              <div className="flex h-[470px] items-end justify-center">
                <PlayableInstrument config={configFor[inst.id]} />
              </div>
              <p className="text-sm text-muted-foreground">{inst.note}</p>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{inst.meta}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">On repeat</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {musicFavorites.onRepeat.filter((t) => t.title !== "—").length === 0 ? (
            <p className="text-muted-foreground">Coming soon — favourite albums &amp; artists.</p>
          ) : (
            musicFavorites.onRepeat.map((t) => (
              <div key={t.title} className="rounded-xl border border-border bg-card px-4 py-3 shadow-soft">
                <div className="font-semibold leading-tight">{t.title}</div>
                <div className="text-sm text-muted-foreground">{t.artist}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </Container>
  );
}
```
- [ ] **Step 4:** `npm test -- Music` → PASS.
- [ ] **Step 5: swap manifest** — in `src/themes/aurora/index.ts`: replace `import MusicPlaceholder from "./pages/MusicPlaceholder";` with `import Music from "./pages/Music";` and map `music: Music`. Then delete `src/themes/aurora/pages/MusicPlaceholder.tsx`.
- [ ] **Step 6: full gate** (test/tsc/build).
- [ ] **Step 7: commit** `git add src/themes/aurora/pages/Music.tsx src/themes/aurora/pages/Music.test.tsx src/themes/aurora/index.ts && git rm src/themes/aurora/pages/MusicPlaceholder.tsx && git commit -m "feat: full interactive Music page (playable guitar + mandolin)"`

---

## Task 9: Full verification + final review

- [ ] **Step 1:** `npm test` (all pass), `npx tsc --noEmit` (clean), `npm run build` (succeeds; lazy OrbScene chunk still present).
- [ ] **Step 2: dev smoke** — `npm run dev`, curl `http://localhost:8080/` → 200.
- [ ] **Step 3:** confirm manifest imports are all `./pages/*` (no remaining `@/pages/*` imports in `src/themes/aurora/index.ts`).
- [ ] **Step 4: commit** any final touch-ups: `git commit -am "chore: Plan 2 complete (pages + Music)"` (only if there are changes).

---

## Spec coverage (Plan 2)
- §8 Work / Books / Movies redesign → Tasks 2-5.
- §9 Music page (musician-first; playable guitar + A-style mandolin; standard tunings; mandolin tremolo; Karplus-Strong; curated favourites) → Tasks 6-8.
- §11 theme-readiness → all new pages are Aurora-owned + content-driven; manifest repointed.
- Movies data centralized + stable order (no random shuffle) → Task 1, Task 5.

**Deferred to Plan 3:** orb material/refraction polish, route cross-fade, perf pass (3D chunk), a11y pass, SEO/meta + Lovable script removal, delete dead `src/pages/*` + `src/components/Layout.tsx` + `src/components/BookCard.tsx` (legacy) + `Index.tsx`, content fill-in, keyboard a11y for the instrument strings.
