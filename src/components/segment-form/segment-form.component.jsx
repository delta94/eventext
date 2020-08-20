import React, { useState } from 'react';
import { connect } from 'react-redux';

import './segment-form.styles.scss';

import Directories from '../directories/directories.component';
import Button from '../custom-button/custom-button.component';

const SegmentForm = ({ segment }) => {
    const [name, setName] = useState('');
    const [people, setPeople] = useState([]);

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
                    <i className='fas fa-users'></i> {people.length} people selected
                </div>
                <div className='cancel-save-buttons'>
                    <Button color='white-blue' link='segments'>Cancel</Button>
                    <Button color='dark-blue'>Save</Button>
                </div>
            </form>
            <Directories setPeople={setPeople} people={people} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    segment: state.segments[ownProps.match.params.segmentId]
});

export default connect(mapStateToProps)(SegmentForm);