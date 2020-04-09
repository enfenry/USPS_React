import React from 'react';
import AppView from '../components/forms/applications/AppView';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import * as basicStateUtils from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('AppView renders correctly', () => {

    const state = basicStateUtils.getBasicState();
    const store = mockStore(state);
    const initialValues = state.applicationsReducer.applications[0];

    const component = renderer.create(
        <Provider store={store}>
            <AppView
                name="example name"
                initialValues={{ ...initialValues, appTypeLabel: "example app type" }}
            />
        </Provider>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});