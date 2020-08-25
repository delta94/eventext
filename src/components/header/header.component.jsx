import React from 'react';
import { withRouter } from 'react-router-dom';

import './header.styles.scss';

import Button from '../custom-button/custom-button.component';

const Header = ({ history }) => {
 
    const CreateButton = () => {
        if (history.location.pathname === '/') {
            return <Button link='add' color='blue'>New</Button>;
        } else if (history.location.pathname === '/segments') {
            return <Button link='segments/add' color='blue'>New</Button>;
        } else {
            return null;
        }
    }

    const Title = () => (
        history.location.pathname.split('segments').length > 1
        ? <h1 onClick={() => history.push('/segments')}>Group</h1>
        : <h1 onClick={() => history.push('/')}>Text Messages</h1>
    )

    const Breadcrumb = () => {
        if (history.location.pathname === '/' || history.location.pathname === '/segments') {
            return null;
        } else {
            let title;
            const page = history.location.pathname.split('/');

            if (page[1] === 'segments') {
                title = page[2] === 'add' ? <h1>Create Group</h1> : <h1>Edit Group</h1>;
            } else {
                if (page[1] === 'add') {
                    title = <h1>Create Message</h1>;
                } else if (page[1] === 'edit') {
                    title = <h1>Edit Message</h1>
                } else {
                    title = <h1>View Message</h1>
                }
            }

            return (
                <><i className="fas fa-chevron-right"></i>{title}</>
            )
        }
    }

    return (
        <div className='header-container'>
            <div className='header'>
                <div className='breadcrumb'>
                    <Title />
                    <Breadcrumb />
                </div>
                <CreateButton />
            </div>
            <hr />
        </div>
    )
}

export default withRouter(Header);