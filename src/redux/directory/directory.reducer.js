import { userActionTypes } from '../user/user.actions';

const directoryReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case userActionTypes.RECEIVE_ALL_USER_DATA:
            const directories = action.data[2].data;
            
            return {
                ...state,
                ...directories
            };
        default:
            return state;
    }
};

export default directoryReducer;