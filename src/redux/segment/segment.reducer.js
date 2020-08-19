import { userActionTypes } from '../user/user.actions';

const segmentReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case userActionTypes.RECEIVE_ALL_USER_DATA:
            const segments = { ...action.data[1].data };

            Object.entries(segments).forEach(([k, v]) => {
                segments[v._id] = segments[k];
                delete segments[k];
            });

            return {
                ...state,
                ...segments
            };
        default:
            return state;
    }
};

export default segmentReducer;