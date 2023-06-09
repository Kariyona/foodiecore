import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReviewById, getReviewsOfListing } from '../../store/reviews';

const DeleteReviewModal = ({ reviewId, listingId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleDeleteSubmit = async () => {
        await dispatch(deleteReviewById(reviewId))
        await dispatch(getReviewsOfListing(listingId))
        closeModal();
    }

    return (
        <div style={{ padding: "20px" }}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDeleteSubmit}>Yes</button>
            <button onClick={closeModal} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    )
}

export default DeleteReviewModal;
