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

  useEffect(() => {
    dispatch(getReviewById(reviewId));
  }, [dispatch, reviewId]);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

    const handleEditReview = async (e) => {
        e.preventDefault();
        const updatedReview = await dispatch(
            editReview({
                id: reviewId,
                rating,
                comment
            }, reviewId)
        )
        if (updatedReview) {
            closeModal()
        }
    }

//   const handleEditReview = () => {
//     const editedReview = {
//       rating,
//       comment
//     };
//     dispatch(editReview(editedReview, reviewId));
//     closeModal();
//   };

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
        <label>
          What did you think about this place?
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </form>
      <button onClick={handleEditReview}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default EditReviewModal;
