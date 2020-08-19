import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './sign-in-form.styles.scss';

import Input from '../custom-input/custom-input.component';
import { login } from '../../redux/session/session.actions';

const SignInForm = ({ setPage, login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInClass, setSignInClass] = useState('');

    useEffect(() => {
        setSignInClass('active');
    }, []);

    const handleSubmit = (e, demo) => {
        e.preventDefault();

        let user;

        if (demo) {
            user = { email: 'june@gmail.com', password: '123456' };
        } else {
            user = { email, password };
        }
   
        login(user);
    };

    return (
        <div className={`sign-in ${signInClass}`}>
            <form>
                <Input type='email' handleChange={setEmail} value={email}>Email</Input>
                <Input type='password' handleChange={setPassword} value={password}>Password</Input>
                <button 
                    className='login-button'
                    onClick={e => handleSubmit(e)}>
                        Log In
                </button>
                <button 
                    className='demo-button'
                    onClick={e => handleSubmit(e, true)}>
                    Demo Login
                </button>
            </form>
            <div className='option'>
                Don't have an account?&nbsp;
                <span className='link' onClick={() => setPage('signUp')}>Sign Up</span>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

export default connect(null, mapDispatchToProps)(SignInForm);