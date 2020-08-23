import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './segment-list-dropdown.styles.scss';

const SegmentListDropdown = ({ directories }) => {
    const [dropdownClass, setDropdownClass] = useState('');
    
    useEffect(() => {
        setDropdownClass('active');
    }, []);

    return (
        <div className={`dropdown-container ${dropdownClass}`}>
            <div className='dropdown-tip' />
            <ul className='dropdown'>
                {directories.map(directory => (
                    <li key={directory._id}>{directory.firstName} {directory.lastName}</li>
                ))}
            </ul>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    const directories = [];
    
    ownProps.directoryIds.forEach(id => {
        directories.push(state.directories[id]);
    });

    return ({ directories })
}

export default connect(mapStateToProps)(SegmentListDropdown);