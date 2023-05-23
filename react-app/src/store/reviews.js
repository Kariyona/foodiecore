// action constants
export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const GET_REVIEW = "reviews/GET_REVIEW";

// action creators
export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
})

export const getReview = (review) => ({
    type: GET_REVIEW,
    payload: review
})

// THUNKS - START
/********************* retrieve all reviews *********************/

