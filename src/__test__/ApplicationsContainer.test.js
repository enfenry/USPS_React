import React from 'react';
import ApplicationsContainer from '../components/ApplicationsContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import basicState from "./basicState"; 
import cloneDeep from "lodash.clonedeep";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('ApplicationsContainer renders correctly', () => {

  const store = mockStore(basicState);

  const component = renderer.create(
    <Provider store={store}>
      <ApplicationsContainer />
    </Provider>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('ApplicationsContainer shows error when orders have an error', () => {

  var state = cloneDeep(basicState);
  delete(state.ordersReducer.orders);
  delete(state.ordersReducer.ordersRequestSuccess);
  state.ordersReducer.ordersRequestFailed = true;
  const store = mockStore(state);

  const component = renderer.create(
    <Provider store={store}>
      <ApplicationsContainer />
    </Provider>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});