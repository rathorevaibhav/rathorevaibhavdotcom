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
