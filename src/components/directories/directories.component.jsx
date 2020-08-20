import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './directories.styles.scss';

import DirectoryItems from '../directory-items/directory-items.component';
import DirectoryForm from '../directory-form/directory-form.component';

const Directories = ({ directories, people, setPeople }) => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className='directories-container'>
            <div className='directory-search-bar'>
                <div className='search-box'>
                    <input 
                        type='text' 
                        value={searchInput} 
                        onChange={e => setSearchInput(e.target.value)}  
                        placeholder='Search'  
                    />
                    <i className='fas fa-search'></i>
                </div>
            </div>
            <div className='directories'>
                {directories.map(directory => (
                    directory.name.toLowerCase().includes(searchInput.toLowerCase())
                    ? <DirectoryItems 
                        key={directory._id} 
                        directory={directory} 
                        people={people}
                        setPeople={setPeople}
                    />
                    : null
                ))}
            </div>
            <DirectoryForm />
        </div>
    )
}

const mapStateToProps = state => ({
    directories: Object.values(state.directories)
});

export default withRouter(connect(mapStateToProps)(Directories));