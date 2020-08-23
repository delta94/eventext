import React from 'react';
import { connect } from 'react-redux';

import './text-preview.styles.scss';

import Button from '../custom-button/custom-button.component';
import TextFormPreview from '../text-form-preview/text-form-preview.component';

const TextPreview = ({ text, segment }) => {
    const renderButtons = () => {
        if (text && text.status === 'Draft') {
            return (
                <div className='preview-buttons'>
                    <Button color='white-blue' link=''>Cancel</Button>
                    <div className='edit-send-button'>
                        <Button color='blue' link={`edit/${text._id}`}>Edit</Button>
                        <Button color='red'>Send</Button>
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
                <div>
                    <label>Segment</label> {segment.name}
                </div>)
        } else {
            return null;
        }
    }

    const renderMedia = () => {
        if (text.media) {
            return (
                <div className='media'>
                    <label>Media</label><br />
                    <img src={text.media} alt='media' />
                </div>)
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
                    <label>Sent Date</label> {date}
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
                        <label>Event Name</label> {text.name}
                    </div>
                    {renderSegment()}
                    {renderSentDate()}
                    {renderMedia()}
                    <div className='message-container'>
                        <label>Message</label>
                        <div className='message'>{text.message}</div>
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

    return { text, segment };
}

export default connect(mapStateToProps)(TextPreview);