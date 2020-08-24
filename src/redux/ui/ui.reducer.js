import { uiActionTypes } from './ui.actions';

const initialState = { successMessage: null };

const uiReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case uiActionTypes.SHOW_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.message
            };
        case uiActionTypes.CLEAR_SUCCESS_MESSAGE:
            return initialState;
        default:
            return state;
    }
};

export default uiReducer;