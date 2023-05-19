// action constants
export const GET_LISTINGS = "listings/GET_LISTINGS";
export const GET_LISTING = "listings/GET_LISTING";
export const DELETE_LISTING = "listings/DELETE_LISTING";
export const CREATE_LISTING = "listings/CREATE_LISTING";

// ACTION CREATORS
export const getListings = (listings) => ({
    type: GET_LISTINGS,
    payload: listings
});

export const getListing = (listing) => ({
    type: GET_LISTING,
    payload: listing
});

export const deleteListing = (listingId) => ({
    type: DELETE_LISTING,
    payload: listingId
})

export const createListing = (listing) => ({
    type: CREATE_LISTING,
    payload: listing
})


// THUNKS - START
/********************* retrieve all listings *********************/
export const getAllListings = () => async (dispatch) => {
    const response = await fetch (`/api/listings`)
    if (!response.ok) {
        const errors = await response.json()
        return errors;
    } else {
        const listings = await response.json();
        dispatch(getListings(listings))
        return listings;
    }
}

/********************* retrieve one listing *********************/export const getListingById = (listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/${listingId}`);
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const listing  = await response.json();
        dispatch(getListing(listing))
        return listing;
    }
}

/********************* delete a listing *********************/
export const deleteListingById = (listingId) => async (dispatch) => {
    const response = await fetch(`/api/listings/${listingId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        dispatch(deleteListing(listingId))
    }
}

/********************* create a listing *********************/
export const createNewListing = (listing) => async (dispatch) => {
    const response = await fetch(`/api/listings/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listing)
    });
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const listing = await response.json()
        dispatch(createListing(listing))
        return listing
    }
}

// REDUCERS
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
        case DELETE_LISTING: {
            const newState = { ...state };
            delete newState.allListings[action.payload]
            return newState
        }
        case CREATE_LISTING: {
            const newState = { ...state };
            // Use new listings ID as the key to add new listing into all listings obj
            newState.allListings[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
}
