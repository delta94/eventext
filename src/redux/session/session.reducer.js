import { sessionActionTypes } from "./session.actions";

const initialState = {
    currentUser: null,
    isAuthenticated: false
};

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch (action.type) {
        case sessionActionTypes.RECEIVE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
                isAuthenticated: true
            };
        case sessionActionTypes.LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};

export default sessionReducer;