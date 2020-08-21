import * as segmentUtil from './segment.utils';

export const segmentActionTypes = {
    RECEIVE_SEGMENT: 'RECEIVE_SEGMENT',
    REMOVE_SEGMENT: 'REMOVE_SEGMENT'
};

const receiveSegment = segment => ({
    type: segmentActionTypes.RECEIVE_SEGMENT,
    segment
});

const removeSegment = segmentId => ({
    type: segmentActionTypes.REMOVE_SEGMENT,
    segmentId
});

export const createSegment = (segment, userId) => dispatch => (
    segmentUtil.createSegment(segment, userId)
        .then(segment => dispatch(receiveSegment(segment.data)))
);

export const updateSegment = (segment, userId) => dispatch => (
    segmentUtil.updateSegment(segment, userId)
        .then(segment => dispatch(receiveSegment(segment.data)))
);

export const deleteSegment = (segmentId, userId) => dispatch => (
    segmentUtil.deleteSegment(segmentId, userId)
        .then(segment => dispatch(removeSegment(segment.data._id)))
);