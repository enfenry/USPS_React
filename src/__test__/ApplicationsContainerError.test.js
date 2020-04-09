import React from 'react';
import ApplicationsContainer from '../components/ApplicationsContainer';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import * as basicStateUtils from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('ApplicationsContainer shows error when orders have an error', () => {

    var state = basicStateUtils.getBasicState();
    state.ordersReducer.ordersRequestSuccess = false;
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