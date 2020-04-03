import React from 'react';
import AddressCreateOrUpdate from '../components/forms/addresses/AddressCreateOrUpdate';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import basicState from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('AddressCreateOrUpdate renders correctly', () => {

    const store = mockStore(basicState);
    const initialValues = basicState.addressesReducer.addresses[0];

    const component = renderer.create(
        <Provider store={store}>
            <AddressCreateOrUpdate initialValues={initialValues} />
        </Provider>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});