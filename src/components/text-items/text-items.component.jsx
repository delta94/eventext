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

    const sentDate = () => {
        let date = item.updatedAt.split('-');
        const year = date.shift();
        date.push(year);
        date[1] = date[1].slice(0, 2);
        date = date.join('/')

        return status === 'Sent' ? <td className='center'>{date}</td> : null;
    };

    const cloneText = () => {
        const newData = { name: item.name, message: item.message, media: item.media, segmentId: segment._id, status: 'Draft' };

        createText(newData, currentUser._id);
    };

    const removeText = () => {
        deleteText(item._id, currentUser._id);
    };

    const action = status === 'Sent' 
        ? <td className='right'>
            <Button color='red' action={cloneText}><i className='far fa-clone'></i></Button>
        </td> 
        : <td className='right'>
            <Button link={`edit/${_id}`} color='blue'>Edit</Button>&nbsp;
            <Button color='gray' action={removeText}><i className='far fa-trash-alt'></i></Button>
        </td>;

    return(
        <tr>
            {textName}
            {sentDate()}
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
    createText: (data, userId) => dispatch(createText(data, userId)),
    deleteText: (textId, userId) => dispatch(deleteText(textId, userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextItems));