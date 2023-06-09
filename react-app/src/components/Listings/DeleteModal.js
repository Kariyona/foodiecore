import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteListingById, getListingsByUserId } from "../../store/listings";
import "./Listings.css"

function DeleteListingModal({ listingId, id}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteSubmit = async () => {
    await dispatch(deleteListingById(listingId));
    await dispatch(getListingsByUserId(id))
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this restaurant from the listings?</p>

        <button className="delete-listing-button" onClick={handleDeleteSubmit}>
          Yes (Delete)
        </button>
        <button className="keep-listing-button" onClick={closeModal}>
          No (Keep)
        </button>

    </div>
  );
}

export default DeleteListingModal;
