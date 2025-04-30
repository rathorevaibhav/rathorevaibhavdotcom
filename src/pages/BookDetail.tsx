
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { mockBooks } from "@/data/books";
import { ArrowLeft, Book as BookIcon, Calendar } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = mockBooks.find(book => book.id === Number(id));

  if (!book) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the book you're looking for.</p>
          <Link to="/books">
            <Button>Return to Books</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Link to="/books" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all books
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
              {book.category}
            </div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
            
            <div className="mb-4">
              <StarRating rating={book.rating} />
            </div>
            
            {book.readDate && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-12">
                <Calendar className="h-4 w-4" />
                <span>Last read: {book.readDate}</span>
              </div>
            )}

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookIcon className="h-5 w-5" />
                My Thoughts
              </h2>
              
              {book.review.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
