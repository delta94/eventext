import { userActionTypes } from '../user/user.actions';
import { sessionActionTypes } from '../session/session.actions';

const initialState = {};

const directoryReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch (action.type) {
        case userActionTypes.RECEIVE_ALL_USER_DATA:
            const directories = action.data[2].data;
            
            return {
                ...state,
                ...directories
            };
        case sessionActionTypes.LOGOUT_USER:
            return initialState;    
        default:
            return state;
    }
};

export default directoryReducer;