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
