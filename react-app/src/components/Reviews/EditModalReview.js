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
    <div style={{ padding: "20px"}}>
      <h2 style={{ color: "rgb(251, 160, 165)" }}>Edit Review</h2>
      <form>
        <label style={{ marginBottom: "7px"}} >Rating 1-5:</label>
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        {validationErrors.rating && (
          <span className="errors">{validationErrors.rating}</span>
        )}
        <label style={{ marginBottom: "7px"}} >What did you think about this place?</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginBottom: "30px" }}
        />

        {validationErrors.comment && (
          <span className="errors">{validationErrors.comment}</span>
        )}
      </form>
      <button onClick={handleEditReview} style={{backgroundColor: "pink", borderRadius: "7px"}}>Save</button>
      <button onClick={closeModal} style={{ marginLeft: "10px", backgroundColor: "#ccc", borderRadius: "7px" }}>
        Cancel
      </button>
    </div>
  );
};

export default EditReviewModal;
