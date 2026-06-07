import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "../components/Container";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { profile, socialLinks } from "@/content";

const OrbScene = lazy(() => import("./OrbScene"));

const githubUrl =
  socialLinks.find((link) => link.icon === "github")?.href ??
  "https://github.com/rathorevaibhav";

export function SpotlightHero() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const enable3D = mounted && !reduced;

  return (
    <section className="relative overflow-hidden">
      {/* soft glow backdrop */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
           style={{ background: "radial-gradient(circle, hsl(var(--glow)/.45), transparent 60%)" }} />
      <Container className="grid min-h-[88vh] items-center gap-8 py-20 md:grid-cols-2">
        <div className="relative z-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{profile.role} · {profile.org}</p>
          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">{profile.headline}</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">{profile.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6"><Link to="/work">View my work</Link></Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </Button>
          </div>
        </div>

        <div className="relative h-[320px] md:h-[460px]">
          {/* Always-present CSS fallback orb (also the no-WebGL / reduced-motion visual) */}
          <div data-testid="orb-fallback" aria-hidden
               className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-72 md:w-72"
               style={{ background: "radial-gradient(circle at 38% 32%, #ffffff, #dfe4ff 28%, #7d8bff 62%, #2a2f8f 100%)",
                        boxShadow: "0 40px 80px -24px rgba(60,70,160,.5)" }} />
          {enable3D && (
            <ErrorBoundary>
              <Suspense fallback={null}>
                <div className="absolute inset-0"><OrbScene /></div>
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </Container>
    </section>
  );
}
