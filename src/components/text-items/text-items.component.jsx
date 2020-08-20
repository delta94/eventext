import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../custom-button/custom-button.component';
import { createText, deleteText } from '../../redux/text/text.actions';

import './text-items.styles.scss';

export const TextItems = ({ item, segment, createText, deleteText, currentUser, history }) => {
    const { _id, name, status } = item;

    const textName = (
        <td className='name' onClick={() => history.push(`/edit/${_id}`)}>
            {name}
        </td>
    )

    const segmentName = <td className='center'>{segment ? segment.name : null}</td>;

    const sentDate = status === 'Sent' ? <td className='center'>{item.updatedAt}</td> : null;

    const cloneText = () => {
        const data = Object.assign({}, item);
        data.status = 'Draft';
        data.stats = null;

        createText(data);
    };

    const removeText = () => {
        deleteText(item._id, currentUser._id);
    };

    const action = status === 'Sent' 
        ? <td className='right'>
            <Button color='red' action={cloneText}>Clone</Button>
        </td> 
        : <td className='right'>
            <Button link={`edit/${_id}`} color='blue'>Edit</Button>&nbsp;
            <Button color='gray' action={removeText}>Delete</Button>
        </td>;

    return(
        <tr>
            {textName}
            {sentDate}
            {segmentName}
            {action}
        </tr>
    )
}

const mapStateToProps = (state, ownProps) => ({
    segment: state.segments[ownProps.item.segmentId],
    currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
    createText: data => dispatch(createText(data)),
    deleteText: (textId, userId) => dispatch(deleteText(textId, userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextItems));