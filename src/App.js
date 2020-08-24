import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import './reset.css';

import Dashboard from './pages/dashboard/dashboard.component';
import Splash from './pages/splash/splash.component';
import FormSuccessMessage from './components/form-success-message/form-success-message.component';
import { fetchAllData } from './redux/user/user.actions';

const App = ({ loggedIn, currentUser, fetchAllData, successMessage }) => {
  useEffect(() => {
    if (loggedIn) fetchAllData(currentUser._id);
  }, [currentUser]);

  return (
    <div>
      {successMessage
        ? <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        : null}
      {loggedIn 
        ? <Dashboard /> 
        : <Splash />}
    </div>
  )
};

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.currentUser,
  successMessage: state.ui.successMessage
});

const mapDispatchToProps = dispatch => ({
  fetchAllData: userId => dispatch(fetchAllData(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);