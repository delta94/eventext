import { errorActionTypes } from '../error.actions';
import { sessionErrorActionTypes } from './session-error.actions';

const initialState = {};

const sessionErrorReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case sessionErrorActionTypes.RECEIVE_SESSION_ERRORS:
            return {
                ...state,
                ...action.errors
            };
        case errorActionTypes.CLEAR_ERRORS:
            return initialState;
        default:
            return state;
    }
};

export default sessionErrorReducer;