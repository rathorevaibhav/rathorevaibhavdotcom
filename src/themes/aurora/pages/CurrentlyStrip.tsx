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
