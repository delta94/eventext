import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './index.css';
import App from './App';
import configureStore from './redux/store';
import { setAuthToken } from './redux/session/session.utils';
import { logout } from './redux/session/session.actions';
import * as serviceWorker from './serviceWorker';

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { 
      session: { 
        isAuthenticated: true, 
        currentUser: decodedUser 
      } 
    };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore();
  }

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
});

serviceWorker.unregister();
