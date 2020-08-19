import React, { useState } from 'react';
import logo from '../../assets/logo.svg';

import './splash.styles.scss';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const Splash = () => {
    const [page, setPage] = useState('main');

    const form = () => {
        if (page === 'signIn') return <SignInForm setPage={setPage} />;
        if (page === 'signUp') return <SignUpForm setPage={setPage} />;
    };

    const buttons = () => (
        page === 'main'
            ? <div className='buttons'>
                <button
                    className='signin-button'
                    onClick={() => setPage('signIn')}>
                    Log In
                </button>
                <button
                    className='signup-button'
                    onClick={() => setPage('signUp')}>
                    Sign Up
                </button>
            </div>
            : null
    )

    return (
        <div className='splash'>
            <div className='main-container'>
                <img src={logo} className='logo' alt='logo' />
                {form()}
                {page === 'main' ? buttons() : null}
            </div>
        </div>
    )
}

export default Splash;