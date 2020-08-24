import jwt_decode from 'jwt-decode';
import * as userUtil from './user.utils';
import * as sessionUtil from '../session/session.utils';
import { receiveCurrentUser } from '../session/session.actions';
import { receiveSessionErrors } from '../error/session-error/session-error.actions';

export const userActionTypes = {
    RECEIVE_ALL_USER_DATA: 'RECEIVE_ALL_USER_DATA'
};

const receiveAllUserData = data => ({
    type: userActionTypes.RECEIVE_ALL_USER_DATA,
    data
});

export const createUser = user => dispatch => (
    userUtil.createUser(user)
        .then(user => {
            console.log('user', user);
            const { token } = user.data;
            localStorage.setItem('jwtToken', token);
            sessionUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        }, errors => dispatch(receiveSessionErrors(errors.response.data)))
);

export const fetchAllData = userId => dispatch => (
    userUtil.fetchAllData(userId)
        .then(data => dispatch(receiveAllUserData(data)))
);