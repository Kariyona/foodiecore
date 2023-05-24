import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewById } from '../../store/reviews';

const DeleteReviewModal = ({ reviewId, onDelete }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewById(reviewId))
        onDelete()
        closeModal()
    }

    return (
        <div>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={handleDeleteReview}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default DeleteReviewModal;
