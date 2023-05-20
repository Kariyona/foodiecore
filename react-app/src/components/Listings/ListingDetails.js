import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { getListingById } from "../../store/listings";

const ListingDetails = () => {
    let dispatch = useDispatch();
    const history = useHistory();
    const { listingId } = useParams();
    const listing = useSelector((state) => state.listings.listing)

    useEffect(() => {
        dispatch(getListingById(listingId));
    }, [dispatch, listingId])

    const handleEdit = () => {
        history.push(`/listings/${listingId}/edit`)
    }

    return (
        <div className="listing-card-details">
            {listing && (
                <>
                <h1>{listing.title}</h1>
                <img src={listing.image_url} id="listing-image" />
                <p>{listing.address}, {listing.city}, {listing.state}</p>
                <p>Business hours: {listing.hours}pm</p>
                <p>{listing.description}</p>
                <button onClick={handleEdit}>Edit</button>
                </>
            )}
        </div>
    )
}

export default ListingDetails;
