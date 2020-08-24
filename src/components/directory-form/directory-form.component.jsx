import React, { useState } from 'react';
import { connect } from 'react-redux';

import './directory-form.styles.scss';

import Button from '../custom-button/custom-button.component';
import { createDirectory } from '../../redux/directory/directory.actions'; 
import { showSuccessMessage } from '../../redux/ui/ui.actions';

const DirectoryForm = ({ formClass, setFormClass, createDirectory, currentUser, showSuccessMessage }) => {
    const [mobile, setMobile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault();

        const directory = { firstName, lastName, mobile };
        createDirectory(directory, currentUser._id)
            .then(() => {
                setMobile('');
                setFirstName('');
                setLastName('');
                showSuccessMessage('Successfully added!');
            });
    };

    const handleBlur = () => {
        if (mobile === '' && firstName === '' && lastName === '') setFormClass('');
    };

    return(
        <div className={`directory-form ${formClass}`}>
            <form>
                <div className='directory-number'>
                    <input 
                        type='text' 
                        placeholder='Add new number' 
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        onFocus={() => setFormClass('active')}
                        onBlur={() => handleBlur()}
                    />
                    <i className='fas fa-phone-alt'></i>
                </div>
                <div className={`directory-name-button ${formClass}`}>
                    <div className='directory-name'>
                        <input
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            onFocus={() => setFormClass('active')}
                            onBlur={() => handleBlur()}
                            className='first-name'
                        />
                        <input
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            onFocus={() => setFormClass('active')}
                            onBlur={() => handleBlur()}
                            className='last-name'
                        />
                        <i className='far fa-user'></i>
                    </div>
                    <Button color='blue' action={handleSubmit}>Add</Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
    createDirectory: (directory, userId) => dispatch(createDirectory(directory, userId)),
    showSuccessMessage: message => dispatch(showSuccessMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryForm);