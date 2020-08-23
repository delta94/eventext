import React, { useEffect } from 'react';

import './giphy-items.styles.scss';

const GiphyItems = ({ giphy, currentGiphy, setCurrentGiphy }) => {
    const url = giphy.images.downsized.url;
    
    return (
        <div className='giphy-items' onClick={() => setCurrentGiphy(url)}>
            <div 
                className={`giphy ${currentGiphy === url ? 'selected' : ''}`}
                style={{ backgroundImage: `url(${url})`}} 
            />
        </div>
    )
}

export default GiphyItems;