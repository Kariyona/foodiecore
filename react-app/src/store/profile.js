// action constants
export const GET_USERNAME = "profile/GET_USERNAME";

export const getUsername = (username) => ({
    type: GET_USERNAME,
    payload: username
})

// reducer
const initialState = { username: null };
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERNAME:
            return { ...state, username: action.payload };
        default:
            return state;
    }
}
