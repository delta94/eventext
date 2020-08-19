import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './App.css';
import './reset.css';

import Dashboard from './pages/dashboard/dashboard.component';
import Splash from './pages/splash/splash.component';
import { fetchAllData } from './redux/user/user.actions';

const App = ({ loggedIn, currentUser, fetchAllData }) => {
  useEffect(() => {
    if (loggedIn) fetchAllData(currentUser._id);
  }, [currentUser]);

  return loggedIn ? <Dashboard /> : <Splash />;
};

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchAllData: userId => dispatch(fetchAllData(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);