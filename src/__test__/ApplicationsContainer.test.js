import React from 'react';
import ApplicationsContainer from '../components/ApplicationsContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('ApplicationsContainer renders correctly', () => {

  const store = mockStore({
    applicationsReducer: {
      applications: [{
        ss_name: "example name",
        ss_applicationid: "example id",
        createdon: "example date",
        ss_applicationtype: "example application type"
      }],
      applicationsRequestSuccess: true
    }
  });
  const component = renderer.create(
    <Provider store={store}>
      <ApplicationsContainer />
    </Provider>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});