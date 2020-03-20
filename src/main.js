import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';

//testing -Matt
import configureStore from './store/configureStore';

import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig.js';

import { App } from './components/App.js';

import * as entityActions from './actions/entityActions';
import { columnConfig } from './columnConfig';

const store = configureStore();

for (var prop in columnConfig) {
  if (Object.prototype.hasOwnProperty.call(columnConfig, prop)) {
    store.dispatch(entityActions.readEntities(prop, columnConfig[prop].uri));
  }
}

runWithAdal(authContext, () => {
  ReactDom.render((
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('app'));
}, false);