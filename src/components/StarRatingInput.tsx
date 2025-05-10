import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
  maxRating?: number;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating, maxRating = 5 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button" // Prevent form submission on click
            key={starValue}
            className={`cursor-pointer transition-colors duration-150 focus:outline-none ${
              starValue <= (hoverRating || rating)
                ? 'text-yellow-400'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${starValue} out of ${maxRating} stars`}
          >
            <Star fill={starValue <= (hoverRating || rating) ? 'currentColor' : 'none'} className="h-7 w-7" />
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
