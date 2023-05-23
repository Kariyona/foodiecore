import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteListingById, getListingById } from "../../store/listings";

const ListingDetails = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);
  const user = useSelector((state) => state.session.user);

  const ownerOfListing = user && listing && user.id === listing.user_id;

  useEffect(() => {
    dispatch(getListingById(listingId));
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

        <div className="review-card">

        </div>
      </div>
    </>
  );
};

export default ListingDetails;
