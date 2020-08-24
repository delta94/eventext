export const uiActionTypes = {
    SHOW_SUCCESS_MESSAGE: 'SHOW_SUCCESS_MESSAGE',
    CLEAR_SUCCESS_MESSAGE: 'CLEAR_SUCCESS_MESSAGE'
};

export const showSuccessMessage = message => ({
    type: uiActionTypes.SHOW_SUCCESS_MESSAGE,
    message
});

export const clearSuccessMessage = () => ({
    type: uiActionTypes.CLEAR_SUCCESS_MESSAGE
});