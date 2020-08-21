import * as directoryUtil from './directory.utils';

export const directoryActionTypes = {
    RECEIVE_DIRECTORY: 'RECEIVE_DIRECTORY'
};

const receiveDirectory = directory => ({
    type: directoryActionTypes.RECEIVE_DIRECTORY,
    directory
});

export const createDirectory = (directory, userId) => dispatch => (
    directoryUtil.createDirectory(directory, userId)
        .then(directory => dispatch(receiveDirectory(directory.data)))
);