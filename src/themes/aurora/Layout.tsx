import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Linkedin, Github, Instagram, ExternalLink, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, socialLinks } from "@/content";
import { Container } from "./components/Container";
import { SmoothScroll } from "./components/SmoothScroll";

const iconFor = { linkedin: Linkedin, github: Github, instagram: Instagram, coloredcow: ExternalLink } as const;

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navLinks.map((l) =>
        l.external ? (
          <a key={l.title} href={l.path} target="_blank" rel="noopener noreferrer"
             className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            {l.title}<ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <NavLink key={l.title} to={l.path} onClick={onNavigate} end={l.path === "/"}
            className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground")}>
            {l.title}
          </NavLink>
        )
      )}
    </>
  );
}

export default function AuroraLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <header className={cn("sticky top-0 z-50 transition-colors",
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent")}>
          <Container className="flex h-16 items-center justify-between">
            <Link to="/" className="text-base font-extrabold tracking-tight">Vaibhav Rathore</Link>
            <nav className="hidden items-center gap-7 md:flex"><NavItems /></nav>
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
                <SheetContent side="top" className="h-[100dvh]">
                  <div className="absolute right-4 top-4"><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-5 w-5" /></Button></div>
                  <div className="flex flex-col items-center gap-7 pt-16 text-lg"><NavItems onNavigate={() => setOpen(false)} /></div>
                </SheetContent>
              </Sheet>
            </div>
          </Container>
        </header>

        <main className="flex-1"><Outlet /></main>

        <footer className="mt-24 border-t border-border py-10">
          <Container className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((s) => {
                const Icon = iconFor[s.icon];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                     className="text-muted-foreground transition-colors hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--glow))]">
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vaibhav Rathore. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </SmoothScroll>
  );
}
