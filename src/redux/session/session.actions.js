import * as sessionUtil from './session.utils';
import jwt_decode from 'jwt-decode';

export const sessionActionTypes = {
    RECEIVE_CURRENT_USER: 'RECEIVE_CURRENT_USER',
    LOGOUT_USER: 'LOGOUT_USER'
};

export const receiveCurrentUser = user => ({
    type: sessionActionTypes.RECEIVE_CURRENT_USER,
    user
});

export const logoutUser = () => ({
    type: sessionActionTypes.LOGOUT_USER
});

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    sessionUtil.setAuthToken(false);
    dispatch(logoutUser());
};

export const login = user => dispatch => (
    sessionUtil.login(user)
        .then(user => {
            const { token } = user.data;
            localStorage.setItem("jwtToken", token);
            sessionUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        })
);