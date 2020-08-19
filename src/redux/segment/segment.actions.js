import * as segmentUtil from './segment.utils';

export const segmentActionTypes = {
    REMOVE_SEGMENT: 'REMOVE_SEGMENT'
};

const removeSegment = segmentId => ({
    type: segmentActionTypes.REMOVE_SEGMENT,
    segmentId
});

export const deleteSegment = (segmentId, userId) => dispatch => (
    segmentUtil.deleteSegment(segmentId, userId)
        .then(segment => dispatch(removeSegment(segment.data._id)))
);