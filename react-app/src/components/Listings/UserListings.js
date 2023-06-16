// import ListingIndexItem from './ListingIndexItem'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListingById,
  editListing,
  getListingsByUserId,
} from "../../store/listings";
import { useHistory, useParams } from "react-router-dom";
import ListingIndexItem from "./ListingIndexItem";
import "./Listings.css";
import { getReviewsByUserId } from "../../store/reviews";
import DeleteReviewModal from "../Reviews/DeleteModalReview";
import OpenModalButton from "../OpenModalButton";
import DeleteListingModal from "./DeleteModal";

function UserListings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userListings = useSelector((state) => state.listings.userListings);
  const userReviews = useSelector((state) => state.reviews.userReviews);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getListingsByUserId(id));
    dispatch(getReviewsByUserId(id));
  }, [dispatch, id]);

  const handleEditListing = (listingId) => {
    history.push(`/listings/${listingId}/edit`);
  };

  // const handleDeleteListing = (listingId) => {
  //   dispatch(deleteListingById(listingId))
  // }

  return (
    <>
      <h1>Take a peep at your listings...</h1>
      <div className="listing-card-row">
        {Object.values(userListings).length === 0 ? (
          <p>No listings to show</p>
        ) : (
          Object.values(userListings).map((listing) => (
            <div className="listing-card">
              <img src={listing.image_url} id="ad-image" />
              <h2>{listing.title}</h2>
              {listing.city}, {listing.state}, {listing.country}
              <div className="edit-delete-listing-button">
                <button
                  className="edit-listing-button cursor-pointer"
                  onClick={() => handleEditListing(listing.id)}
                >
                  Edit
                </button>

                <OpenModalButton
                  modalComponent={
                    <DeleteListingModal id={id} listingId={listing.id} />
                  }
                  buttonText="Delete"
                  className="modal-delete-button cursor-pointer"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* <h1>Take a peep at your reviews...</h1>
      <div className="review-card-row">
        {Object.values(userReviews).length === 0 ? (
          <p>"No reviews yet</p>
        ) : (
          Object.values(userReviews).map((review) => (
            <div key={review.id}>
              <p>---- Title of Restaurant ----</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div> */}
    </>
  );
}

export default UserListings;
