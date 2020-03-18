import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

import DevTools from './containers/DevTools';
 
//testing -Matt
import configureStore from './store/configureStore';

import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig.js';

import {App} from './components/App.js';

const store = configureStore();

runWithAdal(authContext, () => {
  ReactDom.render((
    <Provider store={store}>
      <div>
      <HashRouter>
        <App />
        <DevTools />
      </HashRouter>
      </div>
    </Provider>
  ), document.getElementById('app'));
}, false);