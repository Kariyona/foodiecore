import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewReview } from "../../store/reviews";

const CreateReviewForm = ({listingId}) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createNewReview(listingId, {
        rating,
        comment
    }))

    // Reset form fields
    setRating('')
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating 1-5:
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <label>
        What did you think about this place?
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default CreateReviewForm;
