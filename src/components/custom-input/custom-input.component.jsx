import React from 'react';

import './custom-input.styles.scss';

const Input = ({ children, value, type, handleChange }) => (
    <div className='input'>
        <input 
            type={type} 
            value={value}
            onChange={e => handleChange(e.target.value)}
        />
        <label className={value ? 'shrink' : ''}>
            {children}
        </label>
    </div>
);

export default Input;