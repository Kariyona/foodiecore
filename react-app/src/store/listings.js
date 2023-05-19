// constants
const GET_LISTINGS = "listings/GET_LISTINGS";
const GET_LISTING = "listings/GET_LISTING";

export const getListings = (listings) => ({
    type: GET_LISTINGS,
    payload: listings
});

export const getListing = (listing) => ({
    type: GET_LISTING,
    payload: listing
});


// thunks
export const getAllListings = () => async (dispatch) => {
    const response = await fetch (`/api/listings`)
    if (response.ok) {
        const listings = await response.json();
        dispatch(getListings(listings))
        return listings;
    }
}

export const getListingById = (listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/${listingId}`);
    if (response.ok) {
        const listing  = await response.json();
        dispatch(getListing(listing))
        return listing;
    }
}

const initialState = {  allListings: {}, listing: {} };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTINGS: {
            // const newState = { ...state, listings: action.payload };
            // return newState
            return { ...state, allListings: action.payload};
        }
        case GET_LISTING: {
            // const newState = { ...state, listing: action.payload };
            // return newState
            return { ...state, listing: action.payload};
        }
        default:
            return state;
    }
}
