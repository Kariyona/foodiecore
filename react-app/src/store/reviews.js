// action constants
export const GET_LISTING_REVIEWS = "reviews/GET_REVIEWS"
export const GET_REVIEW = "reviews/GET_REVIEW";

// action creators
export const getListingReviews = (reviews) => ({
    type: GET_LISTING_REVIEWS,
    payload: reviews
})

export const getReview = (review) => ({
    type: GET_REVIEW,
    payload: review
})


// THUNKS - START
/********************* retrieve reviews for a listing *********************/
export const getReviewsOfListing = (listingId) => async (dispatch) => {
    const response = await fetch (`/api/listings/${listingId}/reviews`)
    if (!response.ok) {
        const errors = await response.json();
        return errors;
    } else {
        const reviews = await response.json();
        dispatch(getListingReviews(reviews))
        return reviews;
    }
}

// REDUCERS
const initialState = { reviews: {} };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTING_REVIEWS: {
            const newState = { ...state, reviews: action.payload }
            return newState;
        }
        default:
            return state;
    }
}
