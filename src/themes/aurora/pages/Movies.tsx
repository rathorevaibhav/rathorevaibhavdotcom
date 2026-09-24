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
