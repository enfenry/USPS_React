import React from 'react';
import AppView from '../components/forms/applications/AppView';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import basicState from "./basicState";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('AppView renders correctly', () => {

    const store = mockStore(basicState);
    const initialValues = basicState.applicationsReducer.applications[0];

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