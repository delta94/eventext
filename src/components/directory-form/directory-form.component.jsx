import React, { useState, useRef } from 'react';

import './directory-form.styles.scss';

const DirectoryForm = () => {
    const [formClass, setFormClass] = useState('');
    const [number, setNumber] = useState('');

    const handleBlur = () => {
        if (number === '') setFormClass('');
    };

    return(
        <div className={`directory-form ${formClass}`}>
            <div className='directory-number'>
                <input 
                    type='text' 
                    placeholder='Add new number' 
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    onFocus={() => setFormClass('active')}
                    onBlur={() => handleBlur()}
                />
                <i className='fas fa-phone-alt'></i>
            </div>
        </div>
    )
}

export default DirectoryForm;