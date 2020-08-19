import React from 'react';

import './directory-items.styles.scss';

const DirectoryItems = ({ directory }) => (
    <div className='directory'>
        <div className='directory-name'>
            {directory.name}
        </div>
        <div className='directory-mobile'>
            {directory.mobile}
        </div>
    </div>
);

export default DirectoryItems;