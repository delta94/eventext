import React from 'react';

import './directory-items.styles.scss';

const DirectoryItems = ({ directory, people, setPeople }) => {

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

    return(
        <div 
            className={`directory ${clicked() ? 'clicked' : ''}`}
            onClick={() => handleClick()}>
            <div className='directory-name'>
                <i className='fas fa-user'></i>
                {directory.name}
            </div>
            <div className='directory-mobile'>
                {directory.mobile}
            </div>
        </div>
    )
};

export default DirectoryItems;