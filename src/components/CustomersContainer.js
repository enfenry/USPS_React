"use strict"

import * as customersActions from '../actions/customersActions';
import CustomersRender from './CustomersRender';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const CustomersContainer = (props) => {

    useEffect(() => {
        const { actions } = props;
        actions.readCustomers();
     }, []);

     console.log("customers:", props);

    if (props.customerRequestState.customersReadPending || props.addressRequestState.addressesReadPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.customerRequestState.customersReadFailed || props.addressRequestState.addressesReadFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        );
    } else if ((props.customerRequestState.customersReadSuccess || props.customerRequestState.customersCreateSuccess || props.customerRequestState.customersUpdateSuccess || props.customerRequestState.customersDeleteSuccess) && props.addressRequestState.addressesReadSuccess) {
        return (
            <div className="reactive-margin">
                <CustomersRender
                    customers={props.customers}
                    handleUpdate={(values, customer) => {
                        props.actions.updateCustomer(values, customer.contactid)
                    }}
                    handleDelete={customer => {
                        props.actions.deleteCustomer(customer.contactid)
                    }}
                    handleCreate={(values) => {
                        props.actions.createCustomer(values)
                    }}
                    handleRefresh={() => props.actions.readCustomers()}
                />
            </div>
        );
    } else {
        return null;
    }
}

CustomersContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,
        customerRequestState: state.customersReducer.requestState,
        addressRequestState: state.addressesReducer.requestState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(customersActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomersContainer);