/*
 Copyright (c) 2018 Red Hat, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { keycloak } from './keycloak-config';

keycloak.init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 }).success(authenticated => {
  if (keycloak.authenticated) {
    sessionStorage.setItem('kctoken', keycloak.token);
    //Updating some value in store to re-render the component
    //store.dispatch(setUser('Welcome!'));
    
    keycloak.loadUserProfile().success(result => {
        console.log(result)
    }).error(err => {console.log('cant get user profile')})

    setInterval(() => {
      keycloak.updateToken(10)
        .success(() => sessionStorage.setItem('kctoken', keycloak.token))
        .error(() => keycloak.logout());
    }, 10000);
  } else {
      keycloak.login();
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
