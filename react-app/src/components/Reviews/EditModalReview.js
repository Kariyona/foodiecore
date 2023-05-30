import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editReview, getReviewById } from "../../store/reviews";

const EditReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const review = useSelector((state) => state.reviews.review);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(getReviewById(reviewId));
  }, [dispatch, reviewId]);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  const handleEditReview = (e) => {
    e.preventDefault();

    const errors = {};
    if (rating < 1 || rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }
    if (comment.length < 25) {
      errors.comment = "Review must be at least 25 characters";
    }

    if (Object.values(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    dispatch(
      editReview(
        {
          id: reviewId,
          rating,
          comment,
        },
        reviewId
      )
    );
    closeModal();
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <form>
        <label>
          Rating 1-5:
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        {validationErrors.rating && (
          <span className="errors">{validationErrors.rating}</span>
        )}
        <label>
          What did you think about this place?
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        {validationErrors.comment && (
          <span className="errors">{validationErrors.comment}</span>
        )}
      </form>
      <button onClick={handleEditReview}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default EditReviewModal;
