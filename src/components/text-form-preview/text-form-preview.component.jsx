import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './text-form-preview.styles.scss';

import Select from '../custom-select/custom-select.component';

const TextFormPreview = ({ media, message, image, tags, directories, segmentId }) => {
    const [view, setView] = useState('View as');
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    useEffect(() => {
        setView('View as');
        setFirstName(null);
        setLastName(null);
    }, [segmentId]);

    useEffect(() => {
        if (view !== 'View as') {
            setFirstName(directories[view].firstName);
            setLastName(directories[view].lastName);
        }
    }, [view]);

    tags.forEach(tag => {
        let sample;

        switch(tag) {
            case '{first_name}':
                sample = firstName ? firstName : '{first_name}';
                break;
            case '{last_name}':
                sample = lastName ? lastName : '{last_name}';
                break;
            default:
                return;
        }

        message = message.split(tag).join(sample);
    });

    return (
        <div className='form-preview'>
            <div className='view-as'>
                <Select color='white-blue' options={Object.keys(directories)} setState={setView}>{view}</Select>
            </div>
            <div className='phone-mockup'>
                <div className='preview'>
                    <div className='title'>Text Message</div>
                    {media ? image : null}
                    {message === ''
                        ? null
                        : <div className='text' data-test='preview-text'>{message}</div>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const directories = {};
    const segmentId = ownProps.segmentId;

    if (segmentId && state.segments[segmentId]) {
        const directoryIds = state.segments[segmentId].directoryIds;
     
        directoryIds.forEach(id => {
            if (state.directories[id]) {
                const firstName = state.directories[id].firstName;
                const lastName = state.directories[id].lastName;
                const fullName = `${firstName} ${lastName}`;
                directories[fullName] = { firstName, lastName };
            }
        });
    }

    return { directories, segmentId };
};

export default connect(mapStateToProps)(TextFormPreview);