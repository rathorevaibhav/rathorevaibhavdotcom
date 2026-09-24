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
