import React from 'react';
import { withRouter } from 'react-router-dom';

import { CustomButton } from './custom-button.styles';

const Button = ({ children, link, action, color, history }) => {

    const redirect = () => {
        history.push(`/${link}`);
    };

    const handleAction = e => {
        action ? action(e) : e.preventDefault();
    };

    return (
        <CustomButton
            color={color}
            onClick={e => link === undefined ? handleAction(e) : redirect()}>
            {children}
        </CustomButton>
    )
};

export default withRouter(Button);