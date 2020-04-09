import React from 'react';
import ApplicationsContainer from '../components/ApplicationsContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import * as basicStateUtils from "./basicState"; 

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('ApplicationsContainer renders correctly', () => {

  const store = mockStore(basicStateUtils.getBasicState());

  const component = renderer.create(
    <Provider store={store}>
      <ApplicationsContainer />
    </Provider>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});