import React from 'react';
import CustomerCreateOrUpdate from '../components/forms/customers/CustomerCreateOrUpdate';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import basicState from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('CustomerCreateOrUpdate renders correctly', () => {

    const store = mockStore(basicState);
    const initialValues = basicState.customersReducer.customers[0];

    const component = renderer.create(
        <Provider store={store}>
            <CustomerCreateOrUpdate initialValues={initialValues} />
        </Provider>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});