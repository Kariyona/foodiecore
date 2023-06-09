import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./stars.css";

const StarRating = ({rating, setRating}) => {
//   const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="star-container">
      {[...Array(5)].map((star, position) => {
        const ratingValue = position + 1;

        return (
          <label key={position}>
            <input
              type="radio"
              name="rating"
              id="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              size={30}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
