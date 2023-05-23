import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteListingById, getListingById } from "../../store/listings";
import { getReviewsOfListing } from "../../store/reviews";

const ListingDetails = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.reviews)
  const ownerOfListing = user && listing && user.id === listing.user_id;

  console.log("this is reviews: ", reviews)
  useEffect(() => {
    dispatch(getListingById(listingId));
    dispatch(getReviewsOfListing(listingId));
  }, [dispatch, listingId]);

  const handleEdit = () => {
    history.push(`/listings/${listingId}/edit`);
  };

  const handleDelete = (listingId) => {
    dispatch(deleteListingById(listingId));
  };

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
            {ownerOfListing && <button onClick={handleEdit}>Edit</button>}
            {ownerOfListing && (
              <button onClick={() => handleDelete(listingId)}>Delete</button>
            )}
          </>
        )}
      </div>

      <div className="review-card">
        {Object.values(reviews).map((review) => (
            <div key={review.id}>
                Review: {review.comment}
            </div>
        ))}
      </div>

    </>
  );
};

export default ListingDetails;
