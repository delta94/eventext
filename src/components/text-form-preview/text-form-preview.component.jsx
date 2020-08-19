import React from 'react';

import './text-form-preview.styles.scss';

const TextFormPreview = ({ media, message, tags, image }) => {

    tags.forEach(tag => {
        let sample;

        switch(tag) {
            case '{first_name}':
                sample = 'Elizabeth';
                break;
            case '{last_name}':
                sample = 'Lee';
                break;
            case '{nickname}':
                sample = 'Liz';
                break;
            default:
                return;
        }

        message = message.split(tag).join(sample);
    });

    return (
        <div className='form-preview'>
            <div className='phone-mockup'>
                <div className='preview'>
                    <div className='title'>Text Message</div>
                    {media ? image : null}
                    <div className='text' data-test='preview-text'>{message}</div>
                </div>
            </div>
        </div>
    )
}

export default TextFormPreview;