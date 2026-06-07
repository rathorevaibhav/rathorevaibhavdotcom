import { Link } from "react-router-dom";
import type { Book } from "@/content";
import { StarRating } from "@/components/StarRating";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
        <div className="aspect-[2/3] overflow-hidden bg-surface-2">
          <img src={book.coverImage} alt={`${book.title} cover`} loading="lazy"
               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4">
          <div className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{book.category}</div>
          <h3 className="line-clamp-2 text-base font-semibold leading-tight">{book.title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{book.author}</p>
          <div className="mt-2"><StarRating rating={book.rating} /></div>
        </div>
      </div>
    </Link>
  );
}
