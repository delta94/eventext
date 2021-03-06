import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './segment-items.styles.scss';

import Button from '../custom-button/custom-button.component';
import { deleteSegment } from '../../redux/segment/segment.actions';
import { showSuccessMessage } from '../../redux/ui/ui.actions';

const SegmentItems = ({ segment, history, deleteSegment, currentUser, showSuccessMessage }) => {
    const removeSegment = () => {
        deleteSegment(segment._id, currentUser._id)
            .then(() => showSuccessMessage('Successfully deleted!'));
    };

    return(
        <tr>
            <td 
                className='name'
                onClick={() => history.push(`/segments/edit/${segment._id}`)}>
                {segment.name}
            </td>
            <td className='center'>
                {segment.directoryIds.length}
            </td>
            <td className='right'>
                <Button color='blue' link={`segments/edit/${segment._id}`}>Edit</Button>&nbsp;
                <Button color='gray' action={removeSegment}><i className='far fa-trash-alt'></i></Button>
            </td>
        </tr>
    )
};

const mapStateToProps = state => ({
    currentUser: state.session.currentUser
}) 

const mapDispatchToProps = dispatch => ({
    deleteSegment: (segmentId, userId) => dispatch(deleteSegment(segmentId, userId)),
    showSuccessMessage: message => dispatch(showSuccessMessage(message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SegmentItems));