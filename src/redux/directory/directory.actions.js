import * as directoryUtil from './directory.utils';

export const directoryActionTypes = {
    RECEIVE_DIRECTORY: 'RECEIVE_DIRECTORY',
    REMOVE_DIRECTORY: 'REMOVE_DIRECTORY'
};

const receiveDirectory = directory => ({
    type: directoryActionTypes.RECEIVE_DIRECTORY,
    directory
});

const removeDirectory = directoryId => ({
    type: directoryActionTypes.REMOVE_DIRECTORY,
    directoryId
});

export const createDirectory = (directory, userId) => dispatch => (
    directoryUtil.createDirectory(directory, userId)
        .then(directory => dispatch(receiveDirectory(directory.data)))
);

export const deleteDirectory = (directoryId, userId) => dispatch => (
    directoryUtil.deleteDirectory(directoryId, userId)
        .then(directory => dispatch(removeDirectory(directory.data._id)))
);