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
