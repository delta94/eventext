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
        ? <h1 onClick={() => history.push('/segments')}>Segments</h1>
        : <h1 onClick={() => history.push('/')}>Text Messages</h1>
    )

    const Breadcrumb = () => {
        if (history.location.pathname === '/' || history.location.pathname === '/segments') {
            return null;
        } else {
            let title;
            let pathname = history.location.pathname;

            if (pathname === '/add') {
                title = <h1>Create Message</h1>;
            } else if (pathname === '/segments/add') {
                title = <h1>Create Segment</h1>;
            } else {
                const length = pathname.split("/").length;
                title = length > 3 ? <h1>Edit Segment</h1> : <h1>Edit Text</h1>;
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