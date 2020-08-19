import React, { useState } from 'react';

import './segment-form.styles.scss';

import DirectoryForm from '../directory-form/directory-form.component';

const SegmentForm = () => {
    const [name, setName] = useState('');

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
            </form>
            <DirectoryForm />
        </div>
    )
}

export default SegmentForm;