export const sessionErrorActionTypes = {
    RECEIVE_SESSION_ERRORS: 'RECEIVE_SESSION_ERRORS'
};

export const receiveSessionErrors = errors => ({
    type: sessionErrorActionTypes.RECEIVE_SESSION_ERRORS,
    errors
});