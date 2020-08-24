import React from 'react';
import { connect } from 'react-redux';

import './directory-items.styles.scss';

import { deleteDirectory } from '../../redux/directory/directory.actions';
import { showSuccessMessage } from '../../redux/ui/ui.actions';

const DirectoryItems = ({ directory, people, setPeople, deleteDirectory, showSuccessMessage, currentUser }) => {

    const handleClick = () => {
        if (clicked()) {
            const newPeople = people.filter(personId => personId !== directory._id);
            setPeople(newPeople);
        } else {
            const personId = directory._id;
            const newPeople = [...people, personId];
            setPeople(newPeople);
        }
    };

    const clicked = () => people.includes(directory._id);

    const handleDelete = () => {
        deleteDirectory(directory._id, currentUser._id)
            .then(() => {
                showSuccessMessage('Successfully deleted!');
                
                if (clicked()) {
                    const newPeople = people.filter(personId => personId !== directory._id);
                    setPeople(newPeople);
                }
            });
    };

    return(
        <div 
            className={`directory ${clicked() ? 'clicked' : ''}`}
            onClick={() => handleClick()}>
            <div className='directory-name'>
                <i className='fas fa-user'></i>
                {directory.firstName} {directory.lastName}
            </div>
            <div className='directory-mobile'>
                {directory.mobile}
                <i onMouseDown={handleDelete} className='fas fa-minus-circle'></i>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    deleteDirectory: (directoryId, userId) => dispatch(deleteDirectory(directoryId, userId)),
    showSuccessMessage: message => dispatch(showSuccessMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryItems);