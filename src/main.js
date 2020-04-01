import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

import DevTools from './DevTools';
 
//testing -Matt
import configureStore from './store/configureStore';

import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig.js';

import { App } from './components/App.js';

import * as applicationsActions from './actions/applicationsActions';
import * as customersActions from './actions/customersActions';
import * as ordersActions from './actions/ordersActions';
import * as productsActions from './actions/productsActions';
import * as addressesActions from './actions/addressesActions';

const store = configureStore();

runWithAdal(authContext, () => {

  store.dispatch(applicationsActions.readApplications());
  store.dispatch(customersActions.readCustomers());
  store.dispatch(ordersActions.readOrders());
  store.dispatch(productsActions.readProducts());
  store.dispatch(addressesActions.readAddresses());

  ReactDom.render((
    <Provider store={store}>
      <HashRouter>
        <App />
        <DevTools />
      </HashRouter>
    </Provider>
  ), document.getElementById('app'));
}, false);