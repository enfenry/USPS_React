import React from 'react';
import AppCreateOrUpdate from '../components/forms/applications/AppCreateOrUpdate';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import * as basicStateUtils from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('AppCreateOrUpdate renders correctly', () => {

    const state = basicStateUtils.getBasicState();
    const store = mockStore(state);
    const initialValues = state.applicationsReducer.applications[0];

    const component = renderer.create(
        <Provider store={store}>
            <AppCreateOrUpdate initialValues={initialValues} />
        </Provider>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});