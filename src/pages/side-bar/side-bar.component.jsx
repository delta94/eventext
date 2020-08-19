import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import logoIcon from '../../assets/logo-icon.svg';

import './side-bar.styles.scss';

const SideBar = ({ history, currentUser }) => (
    <div className='side-bar'>
        <img src={logoIcon} alt='logo' className='logo-icon' />
        <div className='welcome-message'>
            Welcome, {currentUser ? currentUser.name : null}!
        </div>
        <div className='menu' onClick={() => history.push('/')}>
            <i className='fas fa-envelope-open-text'></i>
            <span className='title'>Messages</span>
        </div>
        <div className='menu' onClick={() => history.push('/segments')}>
            <i className='fas fa-users'></i>
            <span className='title'>Segments</span>
        </div>
        <hr />
        <a href='https://github.com/juneseong' target='_blank' rel='noopener noreferrer'>
            <div className='menu'>
                <i className="fab fa-github"></i>
                <span className='title'>Github</span>
            </div>
        </a>
        <a href='https://linkedin.com/in/juneseong' target='_blank' rel='noopener noreferrer'>
            <div className='menu'>
                <i className="fab fa-linkedin-in"></i>
                <span className='title'>LinkedIn</span>
            </div>
        </a>
        <a href='https://juneseong.com' target='_blank' rel='noopener noreferrer'>
            <div className='menu'>
                <i className="fas fa-briefcase"></i>
                <span className='title'>Portfolio</span>
            </div>
        </a>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.session.currentUser
})

export default withRouter(connect(mapStateToProps)(SideBar));