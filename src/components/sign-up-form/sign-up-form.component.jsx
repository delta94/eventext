import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './sign-up-form.styles.scss';

import Input from '../custom-input/custom-input.component';
import { createUser } from '../../redux/user/user.actions';
import { clearErrors } from '../../redux/error/error.actions';

const SignUpForm = ({ setPage, createUser, errors, clearErrors }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUpClass, setSignUpClass] = useState('');

    useEffect(() => {
        setSignUpClass('active');
        return () => clearErrors();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        clearErrors();
        const user = { name, email, mobile, password, confirmPassword };
        createUser(user);
    };

    return (
        <div className={`sign-up ${signUpClass}`}>
            <form onSubmit={handleSubmit}>
                <Input type='text' handleChange={setName} value={name}>Full Name</Input>
                {errors.name ? <div className='error-message'><span>{errors.name}</span></div> : null}
                <Input type='text' handleChange={setEmail} value={email}>Email</Input>
                {errors.email ? <div className='error-message'><span>{errors.email}</span></div> : null}
                <Input type='tel' handleChange={setMobile} value={mobile}>Mobile Number</Input>
                {errors.mobile ? <div className='error-message'><span>{errors.mobile}</span></div> : null}
                <Input type='password' handleChange={setPassword} value={password}>Password</Input>
                {errors.password ? <div className='error-message'><span>{errors.password}</span></div> : null}
                <Input type='password' handleChange={setConfirmPassword} value={confirmPassword}>Confirm Password</Input>
                {errors.confirmPassword ? <div className='error-message'><span>{errors.confirmPassword}</span></div> : null}
                <button>Sign Up</button>
            </form>
            <div className='option'>
                Already have an account?&nbsp;
                <span className='link' onClick={() => setPage('signIn')}>Log In</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);