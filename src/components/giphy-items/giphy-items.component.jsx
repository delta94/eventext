import React, { useState } from 'react';

import './giphy-items.styles.scss';

const GiphyItems = ({ giphy, currentGiphy, setCurrentGiphy }) => {

    return (
        <div className='giphy-items' onClick={() => setCurrentGiphy(giphy.images.downsized.url)}>
            <div 
                className={`giphy ${currentGiphy === giphy.images.downsized.url ? 'selected' : ''}`}
                style={{ backgroundImage: `url(${giphy.images.downsized.url})`}} 
            />
        </div>
    )
}

export default GiphyItems;