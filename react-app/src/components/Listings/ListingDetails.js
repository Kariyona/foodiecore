import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getListingById } from "../../store/listings";

const ListingDetails = () => {
    let dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector((state) => state.listings.listing)
    console.log("lalalallalallistings: ", listing)

    useEffect(() => {
        dispatch(getListingById(listingId));
    }, [dispatch, listingId])

    return (
        <div>
            {listing && (
                <>
                <h1>{listing.title}</h1>
                </>
            )}
        </div>
    )
}

export default ListingDetails;
