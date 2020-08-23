import * as textUtil from './text.utils';

export const textActionTypes = {
    RECEIVE_TEXT: 'RECEIVE_TEXT',
    REMOVE_TEXT: 'REMOVE_TEXT'
};

const receiveText = text => ({
    type: textActionTypes.RECEIVE_TEXT,
    text
});

const removeText = textId => ({
    type: textActionTypes.REMOVE_TEXT,
    textId
});

export const createText = (text, userId) => dispatch => (
    textUtil.createText(text, userId)
        .then(text => dispatch(receiveText(text)))
);

export const updateText = (text, userId) => dispatch => (
    textUtil.updateText(text, userId)
        .then(text => dispatch(receiveText(text)))
);

export const deleteText = (textId, userId) => dispatch => (
    textUtil.deleteText(textId, userId)
        .then(text => dispatch(removeText(text.data._id)))
);

export const sendText = (textId, userId) => dispatch => (
    textUtil.sendText(textId, userId)
        .then(text => dispatch(receiveText(text)))
);