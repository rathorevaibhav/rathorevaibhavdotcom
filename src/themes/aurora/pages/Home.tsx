import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SpotlightHero } from "../hero/SpotlightHero";
import { CurrentlyStrip } from "./CurrentlyStrip";
import { SubstackPosts } from "@/components/SubstackPosts";
import { hobbies, interests } from "@/content";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <ul className="space-y-3 text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />{it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SpotlightHero />
      <CurrentlyStrip />

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">What I work on</h2>
              <Link to="/work" className="text-sm font-medium text-primary hover:text-primary/80">View all →</Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift">
              <h3 className="mb-2 text-xl font-semibold">ColoredCow</h3>
              <p className="text-muted-foreground">Senior Software Engineer — leading projects, mentoring engineers, and building scalable web applications with modern tools.</p>
              <Link to="/work" className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary/80">Learn more about my work →</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal><List title="Hobbies" items={hobbies} /></Reveal>
            <Reveal delay={0.08}><List title="Interests" items={interests} /></Reveal>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Reveal><SubstackPosts /></Reveal>
        </Container>
      </section>
    </>
  );
}
