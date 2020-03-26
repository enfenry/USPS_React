import React from 'react';
import CustomersContainer from '../components/CustomersContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('CustomersContainer renders correctly', () => {

  const store = mockStore({
    customersReducer: {
      customers: [{
        fullname: "example name",
        contactid: "example id"
      }],
      customersRequestSuccess: true
    }
  });
  const component = renderer.create(
    <Provider store={store}>
      <CustomersContainer />
    </Provider>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});