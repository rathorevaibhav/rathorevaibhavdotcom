
import { Link } from "react-router-dom";
import { Book } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/books/${book.id}`} className="block transition-all hover:shadow-lg">
      <Card className="overflow-hidden h-full">
        <div className="aspect-[2/3] overflow-hidden bg-gray-100 relative">
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {book.category}
          </div>
          <h3 className="text-lg font-semibold line-clamp-2 leading-tight mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          <StarRating rating={book.rating} />
        </CardContent>
      </Card>
    </Link>
  );
}
