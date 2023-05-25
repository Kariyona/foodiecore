import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteListingById, getListingById } from "../../store/listings";
import { deleteReviewById, getReviewById, getReviewsOfListing } from "../../store/reviews";
import CreateReviewForm from "../Reviews/CreateReviewForm";
import { useModal } from "../../context/Modal";
import EditReviewModal from "../Reviews/EditModalReview";
import DeleteReviewModal from '../Reviews/DeleteModalReview';
import OpenModalButton from '../OpenModalButton/index'

const ListingDetails = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);
  const user = useSelector((state) => state.session.user);

  const reviews = useSelector((state) => state.reviews.reviews);
  const ownerOfListing = user && listing && user.id === listing.user_id;
  // console.log("this is reviews: ", reviews)

  const { setModalContent } = useModal();
  const [editReviewId, setEditReviewId] = useState(null);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  // const [showModal, setShowModal]
  useEffect(() => {
    dispatch(getListingById(listingId));
    dispatch(getReviewsOfListing(listingId));
  }, [dispatch, listingId]);

  if (!listing) return null;

  const handleEditListing = () => {
    history.push(`/listings/${listingId}/edit`);
  };

  const handleDeleteListing = (listingId) => {
    dispatch(deleteListingById(listingId));
  };

  const handleReviewEdit = (reviewId) => {
    setEditReviewId(reviewId)
    setModalContent(<EditReviewModal reviewId={reviewId}/>)
  }

  // const handleReviewDelete = (reviewId) => {
  //   setModalContent(<DeleteReviewModal reviewId={reviewId} onDelete={() => setDeleteReviewId(reviewId)}/>)
  // }

  // const handleReviewDelete = (reviewId) => {
  //   dispatch(deleteReviewById(reviewId))
  //   setDeleteReviewId(reviewId)
  // }


  // const filteredReviews = Object.values(reviews).filter((review) => review.id !== deleteReviewId)

  return (
    <>
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
            {ownerOfListing && <button onClick={handleEditListing}>Edit</button>}
            {ownerOfListing && (
              <button onClick={() => handleDeleteListing(listingId)}>Delete</button>
            )}
          </>
        )}
      </div>

      <div className="review-card">
        {Object.values(reviews).map((review) => (
          <div key={review.id}>
            <img src={review.user?.user_pfp} id="review-user-image" />
            <p>
              {review.user?.first_name} {review.user?.last_name}
            </p>
            <p>
              {review.user?.city}, {review.user?.state}
            </p>
            <p>rating: {review.rating}</p>
            <p>{review.comment}</p>
            {user && review.user_id === user.id && (
              <>
                <button onClick={()=>handleReviewEdit(review.id)}>Edit Review</button>

                <OpenModalButton
                      modalComponent={
                        <DeleteReviewModal
                          reviewId={review.id}
                          listingId={listingId}
                        />
                      }
                      buttonText="Delete"
                    />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="create-new-review">
        {user && (
          <div>
            <h2>Create a New Review</h2>
            <CreateReviewForm listingId={listingId}/>
          </div>
        )}
      </div>
    </>
  );
};

export default ListingDetails;
