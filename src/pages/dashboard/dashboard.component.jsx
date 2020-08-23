import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './dashboard.styles.scss';

import SideBar from '../side-bar/side-bar.component';
import Header from '../../components/header/header.component';
import TextsDrafts from '../../components/texts-drafts/texts-drafts.component';
import TextsSent from '../../components/texts-sent/texts-sent.component';
import TextForm from '../../components/text-form/text-form.component';
import TextPreview from '../../components/text-preview/text-preview.component';
import Segments from '../../components/segments/segments.component';
import SegmentForm from '../../components/segment-form/segment-form.component';
import { logout } from '../../redux/session/session.actions';

const Dashboard = ({ logout }) => (
    <div className='dashboard'>
        <SideBar />
        <div className='main-container'>
            <Header />
            <div className='container'>
                <Route 
                    exact path='/' 
                    render={() => <><TextsDrafts /><TextsSent /></>}
                />
                <Route path='/add' component={TextForm} />
                <Route path='/edit/:textId' component={TextForm} />
                <Route path='/preview/:textId' component={TextPreview} />
                <Route exact path='/segments' component={Segments} />
                <Route path='/segments/add' component={SegmentForm} />
                <Route path='/segments/edit/:segmentId' component={SegmentForm} />
            </div>
        </div>
        <div className='signout-button' onClick={() => logout()}>
            <i className='fas fa-sign-out-alt'></i>
        </div>
    </div>
)

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Dashboard);