import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteListingById, getListingById } from "../../store/listings";
import {
  deleteReviewById,
  getReviewById,
  getReviewsOfListing,
} from "../../store/reviews";
import CreateReviewForm from "../Reviews/CreateReviewForm";
import { useModal } from "../../context/Modal";
import EditReviewModal from "../Reviews/EditModalReview";
import DeleteReviewModal from "../Reviews/DeleteModalReview";
import OpenModalButton from "../OpenModalButton/index";
import { FaStar } from "react-icons/fa";

const ListingDetails = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);
  const user = useSelector((state) => state.session.user);

  const reviews = useSelector((state) => state.reviews.reviews);
  const ownerOfListing = user && listing && user.id === listing.user_id;

  const { setModalContent } = useModal();
  const [editReviewId, setEditReviewId] = useState(null);
  // const [showModal, setShowModal]
  useEffect(() => {
    dispatch(getListingById(listingId));
    dispatch(getReviewsOfListing(listingId));
  }, [dispatch, listingId]);

  // const listingCheck = async () => {
  //   const listing = await dispatch(getListingById(listingId))
  //   if (listing.errors) return "fail"
  //   else return "pass"
  // }

  // const check = listingCheck()

  if (!listing) return null;

  const handleReviewEdit = (reviewId) => {
    setEditReviewId(reviewId);
    setModalContent(<EditReviewModal reviewId={reviewId} />);
  };

  let userHasReview = false;
  for (const review of Object.values(reviews)) {
    if (review.user_id === user?.id) {
      userHasReview = true;
      break;
    }
  }

  return (
    <>
      <div className="test-container">
        <div className="create-new-review">
          {user && !userHasReview && (
            <div>
              <h2>Create a New Review</h2>
              <CreateReviewForm listingId={listingId} />
            </div>
          )}
        </div>

        <div className="listing-and-review">
          <div className="listing-card-details">
            {listing && (
              <>
                <h1>{listing.title}</h1>
                <img src={listing.image_url} id="listing-image" />
                <p>
                  {listing.address}, {listing.city}, {listing.state}
                </p>
                <p>Business hours: {listing.hours}pm</p>
                <p>{listing.description}</p>
              </>
            )}
          </div>

          <div className="review-container">
            {Object.values(reviews).length === 0 ? (
              <p>Be the first to post a review!</p>
            ) : (
              Object.values(reviews).map((review) => (
                <div className="review-card" key={review.id}>
                  <div className="review-img-and-info">
                    <img src={review.user?.user_pfp} id="review-user-image" />
                    <div className="user-review-info">
                      <p>
                        {review.user?.first_name} {review.user?.last_name}
                        <br />
                        <span className="user-location">
                          {review.user?.city}, {review.user?.state}
                        </span>{" "}
                        <br />
                        {/* rating: {review.rating} */}
                        {[...Array(5)].map((star, index) => {
                          return <FaStar key={index} color={index < review.rating ? "gold" : "grey"}/>
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="reviews-container">
                    <p id="review-comment">{review.comment}</p>
                    {user && review.user_id === user.id && (
                      <div className="edit-delete-buttons">
                        <button onClick={() => handleReviewEdit(review.id)}>
                          Edit Review
                        </button>

                        <OpenModalButton
                          modalComponent={
                            <DeleteReviewModal
                              reviewId={review.id}
                              listingId={listingId}
                            />
                          }
                          buttonText="Delete"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
