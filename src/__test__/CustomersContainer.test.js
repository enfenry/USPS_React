import React from 'react';
import CustomersContainer from '../components/CustomersContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import * as basicStateUtils from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('CustomersContainer renders correctly', () => {

  const store = mockStore(basicStateUtils.getBasicState());
  
  const component = renderer.create(
    <Provider store={store}>
      <CustomersContainer />
    </Provider>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});