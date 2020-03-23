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

import * as applicationsActions from './actions/applicationsActions';
import * as customersActions from './actions/customersActions';

const store = configureStore();

runWithAdal(authContext, () => {

  store.dispatch(applicationsActions.readApplications());
  store.dispatch(customersActions.readCustomers());


  ReactDom.render((
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('app'));
}, false);