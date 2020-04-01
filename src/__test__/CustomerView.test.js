import React from 'react';
import CustomerView from '../components/forms/customers/CustomerView';
import renderer from 'react-test-renderer';

test('CustomerView renders correctly', () => {

    const component = renderer.create(
        <CustomerView
            initialValues={{
                firstname: "example first name",
                lastname: "example last name",
                emailaddress1: "example email address",
            }}
        />
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});