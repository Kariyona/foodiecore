import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getListingById } from "../../store/listings";

const ListingDetails = () => {
    let dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector((state) => state.listings.listing)

    useEffect(() => {
        dispatch(getListingById(listingId));
    }, [dispatch, listingId])

    return (
        <div className="listing-card-details">
            {listing && (
                <>
                <h1>{listing.title}</h1>
                <img src={listing.image_url} id="listing-image" />
                <p>Business hours: {listing.hours}pm</p>
                <p>{listing.description}</p>
                <button>Edit</button>
                </>
            )}
        </div>
    )
}

export default ListingDetails;
