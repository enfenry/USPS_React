import React from 'react';
import AppUpdate from '../modals/AppUpdate';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('AppUpdate renders correctly', () => {

    const store = mockStore({
        productsReducer: { products: [] },
        ordersReducer: { orders: [] },
        customersReducer: {
            customers: [
                {
                    contactid: "A",
                    fullname: "Alice Astronaut"
                },
                {
                    contactid: "B",
                    fullname: "Bobby Butcher"
                },
                {
                    contactid: "C",
                    fullname: "Charlie Cobbler"
                }
            ],
        },
        addressesReducer: { addresses: [] },
    });

    const component = renderer.create(
        <Provider store={store}>
            <AppUpdate
                data={{
                    _ss_customer_value: "B"
                }}
            />
        </Provider>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});