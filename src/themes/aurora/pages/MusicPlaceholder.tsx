import { Container } from "../components/Container";

export default function MusicPlaceholder() {
  return (
    <Container className="py-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Music</p>
      <h1 className="text-4xl font-extrabold tracking-tight">I don't just listen — I play.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Guitar and mandolin. The full interactive page (playable line-art instruments) lands next.
      </p>
    </Container>
  );
}
