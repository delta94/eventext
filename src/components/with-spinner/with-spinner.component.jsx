import React from 'react';

import { Spinner } from './with-spinner.styles';

const WithSpinner = ({ media, loading, setLoading }) => {

    return (
        <>
            {loading ? <Spinner /> : null}
            <img 
                src={media} 
                alt='media' 
                style={{ display: loading ? 'none' : 'block' }}
                onLoad={() => setLoading(false)}
            />
        </>
    )
};

export default WithSpinner;