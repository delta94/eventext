import { textActionTypes } from './text.actions';
import { userActionTypes } from '../user/user.actions';

const initialState = {};

const textReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case userActionTypes.RECEIVE_ALL_USER_DATA:
            const texts = { ...action.data[0].data };

            Object.entries(texts).forEach(([k, v]) => {
                texts[v._id] = texts[k];
                delete texts[k];
            });

            return {
                ...state,
                ...texts
            };
        case textActionTypes.RECEIVE_TEXT:
            return {
                ...state,
                [action.text.data._id]: action.text.data
            };
        case textActionTypes.REMOVE_TEXT:
            const newState = {};

            Object.values(state).forEach(text => {
                if (text._id !== action.textId) newState[text._id] = text;
            });

            return newState;
        default:
            return state;
    }
};

export default textReducer;