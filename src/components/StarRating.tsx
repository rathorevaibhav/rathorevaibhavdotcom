
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
