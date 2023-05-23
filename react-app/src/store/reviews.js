// action constants
export const GET_LISTING_REVIEWS = "reviews/GET_REVIEWS"
export const GET_REVIEW = "reviews/GET_REVIEW";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";

// action creators
export const getListingReviews = (reviews) => ({
    type: GET_LISTING_REVIEWS,
    payload: reviews
})

export const getReview = (review) => ({
    type: GET_REVIEW,
    payload: review
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
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

/**************************** create a review *****************************/
export const createNewReview = (listingId, review) => async (dispatch) => {
    const response = await fetch(`/api/listings/${listingId}/reviews/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    if (!response.ok) {
        const errors = await response.json()
        return errors;
    } else {
        const createdReview = await response.json()
        dispatch(createReview(createdReview))
        return createdReview;
    }
}

/**************************** edit a review *****************************/
export const editReview = (reviewData, reviewId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData)
    })
    if (!response.ok) {
        const errors = await response.json()
        return errors;
    } else {
        const updatedReview = await response.json()
        dispatch(updateReview(updatedReview))
        return updatedReview;
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
        case CREATE_REVIEW: {
            const newState = { ...state };
            newState.reviews[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_REVIEW: {
            const updatedReview = action.payload;
            return { ...state, reviews: { ...state.reviews, [updatedReview.id]: updatedReview}}
        }
        default:
            return state;
    }
}
