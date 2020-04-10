import React from 'react';
import CustomerCreateOrUpdate from '../components/forms/customers/CustomerCreateOrUpdate';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import * as basicStateUtils from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('CustomerCreateOrUpdate renders correctly', () => {

    const state = basicStateUtils.getBasicState();
    const store = mockStore(state);
    const initialValues = state.customersReducer.customers[0];

    const component = renderer.create(
        <Provider store={store}>
            <CustomerCreateOrUpdate initialValues={initialValues} />
        </Provider>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});