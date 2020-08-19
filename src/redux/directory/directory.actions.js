import * as directoryUtil from './directory.utils';

export const directoryTypes = {
    RECEIVE_ALL_DIRECTORIES: 'RECEIVE_ALL_DIRECTORIES'
};

const receiveAllDirectories = directories => ({
    type: directoryTypes.RECEIVE_ALL_DIRECTORIES,
    directories
});

export const fetchAllDirectories = userId => dispatch => (
    directoryUtil.fetchAllDirectories(userId)
        .then(directories => dispatch(receiveAllDirectories(directories)))
);