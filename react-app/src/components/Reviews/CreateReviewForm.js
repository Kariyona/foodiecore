import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewReview } from "../../store/reviews";
import "./ReviewForm.css"

const CreateReviewForm = ({ listingId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const errors = {};
    if (rating > 5 || rating < 1) errors.rating = "Rating must be between 1-5";
    if (comment.length < 25)
      errors.comment = "Review must be at least 25 characters";
    setValidationErrors(errors);
    const errorArr = Object.values(validationErrors);
    if (errorArr.length > 0) {
      return;
    } else {
      dispatch(
        createNewReview(listingId, {
          rating,
          comment,
        })
      );
      // Reset form fields
      setRating("");
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating 1-5:</label>
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      {isSubmitted && <span className="errors">{validationErrors.rating}</span>}

      <label>What did you think about this place?</label>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {isSubmitted && (
        <span className="errors">{validationErrors.comment}</span>
      )}
      <button className="submit-review-button" type="submit">Submit Review</button>
    </form>
  );
};

export default CreateReviewForm;
