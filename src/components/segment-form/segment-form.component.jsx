import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './segment-form.styles.scss';

import Directories from '../directories/directories.component';
import Button from '../custom-button/custom-button.component';
import { createSegment, updateSegment } from '../../redux/segment/segment.actions';

const SegmentForm = ({ segment, createSegment, updateSegment, currentUser, history }) => {
    const [name, setName] = useState(segment ? segment.name : '');
    const [people, setPeople] = useState(segment ? segment.directoryIds : []);

    const handleSubmit = e => {
        e.preventDefault();
        
        const data = { name, directoryIds: people };

        if (segment) {
            const _id = segment._id;
            data._id = _id;
    
            updateSegment(data, currentUser._id)
                .then(() => history.push('/segments'));
        } else {
            createSegment(data, currentUser._id)
                .then(() => history.push('/segments'));
        }
    };

    return (
        <div className='segment-form'>
            <form>
                <div className='segment-name'>
                    <label>Segment Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Segment Name'
                    />
                </div>
                <div className='directory-counter'>
                    <i className='fas fa-users'></i> {people.length}
                </div>
                <div className='cancel-save-buttons'>
                    <Button color='white-blue' link='segments'>Cancel</Button>
                    <Button color='dark-blue' action={handleSubmit}>Save</Button>
                </div>
            </form>
            <Directories setPeople={setPeople} people={people} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    segment: state.segments[ownProps.match.params.segmentId],
    currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    createSegment: (segment, userId) => dispatch(createSegment(segment, userId)),
    updateSegment: (segment, userId) => dispatch(updateSegment(segment, userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SegmentForm));