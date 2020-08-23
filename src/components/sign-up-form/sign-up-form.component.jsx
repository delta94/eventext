import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './sign-up-form.styles.scss';

import Input from '../custom-input/custom-input.component';
import { createUser } from '../../redux/user/user.actions';

const SignUpForm = ({ setPage, createUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUpClass, setSignUpClass] = useState('');

    useEffect(() => {
        setSignUpClass('active');
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const user = { name, email, mobile, password, confirmPassword };
        createUser(user);
    };

    return (
        <div className={`sign-up ${signUpClass}`}>
            <form onSubmit={handleSubmit}>
                <Input type='text' handleChange={setName} value={name}>Full Name</Input>
                <Input type='text' handleChange={setEmail} value={email}>Email</Input>
                <Input type='tel' handleChange={setMobile} value={mobile}>Mobile Number</Input>
                <Input type='password' handleChange={setPassword} value={password}>Password</Input>
                <Input type='password' handleChange={setConfirmPassword} value={confirmPassword}>Confirm Password</Input>
                <button>Sign Up</button>
            </form>
            <div className='option'>
                Already have an account?&nbsp;
                <span className='link' onClick={() => setPage('signIn')}>Log In</span>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    createUser: user => dispatch(createUser(user))
});

export default connect(null, mapDispatchToProps)(SignUpForm);