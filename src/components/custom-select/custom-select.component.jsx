import React, { useState, useEffect } from 'react';

import './custom-select.styles.scss';

import Button from '../custom-button/custom-button.component';

const Select = ({ children, options, setState, defaultText, insertButton, color, id }) => {

    const [dropdown, toggleDropdown] = useState('none');

    useEffect(() => {
        const toggle = e => {
            if (e.target.closest(`[id=${id}]`)) { 
                toggleDropdown('block');
            } else if (dropdown === 'block') { 
                toggleDropdown('none');
            }
        };

        window.addEventListener('click', toggle);

        return () => {
            window.removeEventListener('click', toggle);
        };
    });

    const dropdownMenu = options.map((option, i) => (
        <li key={i} onClick={() => setState(option)}>{option}</li>
    ));

    const InsertButton = () => (
        insertButton && children !== defaultText
            ? <span className='insert-button'> 
                <Button color='blue' action={insertButton.action}>
                    {insertButton.text}
                </Button>
            </span>
            : null
    )

    return (
        <div className='select'>
            <span id={`${id}`}>
                <Button color={color}>
                    {children}  <i className='fas fa-caret-down'></i>
                </Button>
            </span>
            <div 
                className='dropdown'
                style={{ display: dropdown }}>
                <ul className='menus'>
                    {dropdownMenu}
                </ul>
            </div>
            <InsertButton />
        </div>
    )
};

export default Select;