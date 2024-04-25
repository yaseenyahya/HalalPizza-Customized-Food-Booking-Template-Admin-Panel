import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import LocalStorage from './auth/LocalStorage';
import store from './store';

import {
  setAuthUserUsername,
  setAuthUserId,
  setAuthUserRole,
  setAuthUserName,
  setAuthUserAvatar,
  setAuthUserSettingsJson,
  resetAuthUser,
} from './store/actions/AuthUserActions';
import { setConfigData } from './store/actions/OtherActions';
import { createRoot } from 'react-dom/client';

// Function to render the React app
const render = () => {
  const root = createRoot(document.getElementById('root'));
  root.render(

    <SnackbarProvider maxSnack={3}>
      <App reduxStore={store} />
    </SnackbarProvider>

  );
};


fetch(process.env.PUBLIC_URL + '/config/config.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((configData) => {
    const env = process.env.NODE_ENV;
    const config = configData[env];

    store.dispatch(setConfigData(config));
    // Create a WebSocketLink for subscriptions

    const url = `${config.backend_domain}${config.backend_port !== '' ? ':' + config.backend_port : ''}`;


    // Check if a username and password are stored in local storage
    const username = LocalStorage.getUsername();
    const password = LocalStorage.getPassword();

    if (username !== null && password !== null) {

      const postData = {
        username: username,
        password: password,
      };

      fetch(url + "/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || 'Login failed');
          }

          const user = await response.json();

          // Check user status and handle accordingly

          store.dispatch(setAuthUserUsername(user.name));
          store.dispatch(setAuthUserId(user.id));

          store.dispatch(setAuthUserRole(user.role));
          store.dispatch(setAuthUserName(user.username));
          store.dispatch(setAuthUserAvatar(user.avatar));

          store.dispatch(setAuthUserSettingsJson(user.settingsJSON));
          
          render();
        })
        .catch((error) => {
          console.error(error)
          store.dispatch(resetAuthUser());
          render(); // Rethrow the error to keep the promise rejected
        });

    } else {
      // No stored credentials, render the app
      render();
    }
  });

// Measure performance in your app (optional)
reportWebVitals();
