import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './text-form.styles.scss';

import TextFormPreview from '../text-form-preview/text-form-preview.component';
import { createText, updateText } from '../../redux/text/text.actions';
import Button from '../custom-button/custom-button.component';
import Select from '../custom-select/custom-select.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import GiphyModal from '../giphy-modal/giphy-modal.component';

const TextForm = ({ text, segment, segments, createText, updateText, currentUser, history }) => {
  
    const [name, setName] = useState('');
    const [segmentName, setSegmentName] = useState(Object.keys(segments)[0]);
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [tag, setTag] = useState('Add Tag');
    const [giphyModal, setGiphyModal] = useState(false);
    const textarea = useRef();
    const tags = ['{first_name}', '{last_name}'];

    useEffect(() => {
        if (text) {
            setName(text.name);
            setSegmentName(segment ? segment.name : null);
            setMedia(text.media);
            setMessage(text.message);
        }
    }, [text]);

    const handleSubmit = e => {
        e.preventDefault();

        const segmentId = segments[segmentName];
        const data = { name, message, media, segmentId, status: 'Draft' };
        const userId = currentUser._id;

        if (text) {
            data._id = text._id;
            updateText(data, userId)
                .then(response => history.push(`/preview/${response.text.data._id}`));
        } else {
            createText(data, userId)
                .then(response => history.push(`/preview/${response.text.data._id}`));
        }
    };

    const insertTag = () => {
        textarea.current.focus();
        const start = textarea.current.selectionStart;
        const end = textarea.current.selectionEnd;
        const newMessage = message.slice(0, start) + tag + message.slice(end);
        setMessage(newMessage);
    };

    const MediaPreview = () => (
        media
            ? <div className='media-preview'>
                <Image />
                <div className='label-close-btn'>
                    MMS Media
                    <i onClick={() => setMedia(null)} className='fas fa-times'></i>
                </div>
            </div>
            : null
    )

    const Image = () => (
        <WithSpinner media={media} loading={loading} setLoading={setLoading} />
    );

    const openGiphyModal = e => {
        e.preventDefault();
        setGiphyModal(true)
    };

    const closeGiphyModal = e => {
        setGiphyModal(false)
    };

    return (
        <div className='form-container'>
            {giphyModal ? <GiphyModal closeGiphyModal={closeGiphyModal} media={media} setMedia={setMedia} /> : null}
            <div className='form'>
                <form>
                    <div className='event-name'>
                        <label>Event Name</label>
                        <input 
                            type='text' 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            placeholder='Event Name' 
                            data-test='input-name'
                        />
                    </div>
                    <div className='segment'>
                        <label>Segment</label>
                        {Object.keys(segments).length > 0
                            ? <Select
                                options={Object.keys(segments)}
                                setState={setSegmentName}
                                color='white-blue'
                                id='segment'>
                                {segmentName}
                            </Select>
                            : <Button 
                                link='segments/add' 
                                color='white-blue'>
                                Create Segment
                            </Button>}
                    </div>
                    <div className='message'>
                        <label>Message</label>
                        <MediaPreview />
                        <div className='media-tag'>
                            <div className='media-button'>
                                <Button color='blue' action={openGiphyModal}>{media ? 'Edit' : 'Add'} Sticker</Button>
                            </div>
                            <div className='tag-button'>
                                <Select 
                                    options={tags}
                                    setState={setTag}
                                    insertButton={{ text: 'Insert Tag', action: insertTag }}
                                    defaultText='Add Tag'
                                    color={tag === 'Add Tag' ? 'blue' : 'white-blue'}
                                    id='tag'>
                                    {tag}
                                </Select>
                            </div>
                        </div>
                        <textarea 
                            ref={textarea} 
                            value={message} 
                            onChange={e => setMessage(e.target.value)} 
                            placeholder='Add message'
                            data-test='input-text'
                        />
                    </div>
                    <div className='cancel-save-btn'>
                        <Button link='' color='white-blue'>Cancel</Button>
                        <span data-test='submit-button'>
                            <Button color='blue' action={handleSubmit}>Save & Preview</Button>
                        </span>
                    </div>
                </form>
            </div>
            <TextFormPreview media={media} message={message} image={<Image />} tags={tags} segmentId={segments[segmentName]} />
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.currentUser;
    const text = state.texts[ownProps.match.params.textId];
    const segment = text ? state.segments[text.segmentId] : null;
    const segments = {};

    Object.values(state.segments).forEach(segment => {
        const id = segment._id;
        const name = segment.name;
        segments[name] = id;
    });

    return ({
        text,
        segment,
        segments,
        currentUser
    });
};

const mapDispatchToProps = dispatch => ({
    createText: (text, userId) => dispatch(createText(text, userId)),
    updateText: (id, data) => dispatch(updateText(id, data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextForm));