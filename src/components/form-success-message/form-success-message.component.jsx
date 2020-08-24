import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './form-success-message.styles.scss';

import { clearSuccessMessage } from '../../redux/ui/ui.actions';

const FormSuccessMessage = ({ children, clearSuccessMessage }) => {
    const [messageClass, setMessageClass] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setMessageClass('active');

            setTimeout(() => {
                setMessageClass('');

                setTimeout(() => {
                    clearSuccessMessage();
                }, 250);
            }, 3000);
        }, 100);
    }, []);

    return (
        <div className='form-success-message-container'>
            <div className={`form-success-message ${messageClass}`}>
                <i className='fas fa-check-circle'></i>{children}
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    clearSuccessMessage: () => dispatch(clearSuccessMessage())
});

export default connect(null, mapDispatchToProps)(FormSuccessMessage);