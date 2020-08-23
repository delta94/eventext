import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './text-preview.styles.scss';

import Button from '../custom-button/custom-button.component';
import TextFormPreview from '../text-form-preview/text-form-preview.component';
import SegmentListDropdown from '../segment-list-dropdown/segment-list-dropdown';
import { sendText } from '../../redux/text/text.actions';

const TextPreview = ({ text, segment, sendText, currentUser, history }) => {
    const [segmentDropdown, showSegmentDropdown] = useState(false);

    const handleSubmit = () => {
        sendText(text._id, currentUser._id)
            .then(() => history.push('/'));
    };

    const renderButtons = () => {
        if (text && text.status === 'Draft') {
            return (
                <div className='preview-buttons'>
                    <Button color='white-blue' link=''>Cancel</Button>
                    <div className='edit-send-button'>
                        <Button color='blue' link={`edit/${text._id}`}>Edit</Button>
                        <Button color='red' action={handleSubmit}>Send</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Button color='white-blue' link=''>Back</Button>
                </div>
            )
        }
    };

    const renderSegment = () => {
        if (segment) {
            return (
                <div className='segment-count'>
                    <label>Segment</label> {segment.name}
                    <div className='count'>
                        (<span 
                            onMouseEnter={() => showSegmentDropdown(true)}
                            onMouseLeave={() => showSegmentDropdown(false)}>
                            {segment.directoryIds.length}
                        </span>)
                        {segmentDropdown
                            ? <SegmentListDropdown directoryIds={segment.directoryIds} />
                            : null}
                    </div>
                </div>)
        } else {
            return null;
        }
    }

    const renderMedia = () => {
        if (text.media) {
            return <div><img src={text.media} alt='media' /></div>
        } else {
            return null;
        }
    }

    const renderSentDate = () => {
        let date = text.updatedAt.split('-');
        const year = date.shift();
        date.push(year);
        date[1] = date[1].slice(0, 2);
        date = date.join('/')
        
        if (text.status === 'Sent') {
            return (
                <div>
                    <label>Date Sent</label> {date}
                </div>
            )
        } else {
            return null;
        }
    }

    if (text) {
        return(
            <div className='text-preview-container'>
                <div className='text-preview'>
                    <div>
                        <label>Event</label>{text.name}
                    </div>
                    {renderSegment()}
                    {renderSentDate()}
                    <div className='message-container'>
                        <label>Message</label>
                        <div className='message'>
                            {renderMedia()}
                            {text.message}
                        </div>
                    </div>
                    {renderButtons()}
                </div>
                <TextFormPreview 
                    media={text.media} 
                    message={text.message} 
                    image={<img src={text.media} alt='image' />} 
                    tags={['{first_name}', '{last_name}']} 
                    segmentId={text.segmentId}
                />
            </div>
        )
    } else {
        return null;
    }
};

const mapStateToProps = (state, ownProps) => {
    const text = state.texts[ownProps.match.params.textId];
    const segment = text ? state.segments[text.segmentId] : null;
    const currentUser = state.session.currentUser;

    return { text, segment, currentUser };
}

const mapDispatchToProps = dispatch => ({
    sendText: (textId, userId) => dispatch(sendText(textId, userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextPreview));