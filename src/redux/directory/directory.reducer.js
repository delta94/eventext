import { userActionTypes } from '../user/user.actions';
import { sessionActionTypes } from '../session/session.actions';
import { directoryActionTypes } from '../directory/directory.actions';

const initialState = {};

const directoryReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch (action.type) {
        case userActionTypes.RECEIVE_ALL_USER_DATA:
            const directories = action.data[2].data;
            
            Object.entries(directories).forEach(([k, v]) => {
                directories[v._id] = directories[k];
                delete directories[k];
            });

            return {
                ...state,
                ...directories
            };
        case directoryActionTypes.RECEIVE_DIRECTORY:
            return {
                ...state,
                [action.directory._id]: action.directory
            };
        case sessionActionTypes.LOGOUT_USER:
            return initialState;    
        default:
            return state;
    }
};

export default directoryReducer;