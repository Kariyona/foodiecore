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
            <h3 style={{ color: "rgb(251, 160, 165)" }}>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDeleteSubmit} style={{ backgroundColor: "pink", borderRadius: "7px"}}>Yes</button>
            <button onClick={closeModal} style={{ marginLeft: "10px", backgroundColor: "#ccc", borderRadius: "7px" }}>Cancel</button>
        </div>
    )
}

export default DeleteReviewModal;
