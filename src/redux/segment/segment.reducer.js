import { userActionTypes } from '../user/user.actions';
import { segmentActionTypes } from './segment.actions';

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
        case segmentActionTypes.REMOVE_SEGMENT:
            const newState = {};

            Object.values(state).forEach(segment => {
                if (segment._id !== action.segmentId) newState[segment._id] = segment;
            });

            return newState;
        default:
            return state;
    }
};

export default segmentReducer;