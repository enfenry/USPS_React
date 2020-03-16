import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';
 
//testing -Matt
import configureStore from './store/configureStore';

import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig.js';

import {App} from './components/App.js';

const store = configureStore();

runWithAdal(authContext, () => {
  ReactDom.render((
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('app'));
}, false);