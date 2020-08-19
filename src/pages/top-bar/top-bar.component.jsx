import React from 'react';
import { withRouter } from 'react-router-dom';

import './top-bar.styles.scss';
import logo from '../../assets/logo.png';

const TopBar = ({ history }) => (
    <div className='top-bar'>
        <img 
            onClick={() => history.push('/')} 
            className='logo' 
            alt='logo' 
            src={logo} />
    </div>
);

export default withRouter(TopBar);