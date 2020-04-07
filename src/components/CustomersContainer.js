"use strict"

import * as customersActions from '../actions/customersActions';
import CustomersRender from './CustomersRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const CustomersContainer = (props) => {

    if (props.customersReadPending || props.addressesReadPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.customersReadFailed || props.addressesReadPending) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        );
    } else if (props.customersReadSuccess && props.addressesReadPending) {
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
        error: state.error,
        
        customersReadPending: state.customersReducer.customersReadPending,
        customersReadFailed: state.customersReducer.customersReadFailed,
        customersReadSuccess: state.customersReducer.customersReadSuccess,

        customersCreateFailed: state.customersReducer.customersCreateFailed,
        customersCreateSuccess: state.customersReducer.customersCreateSuccess,

        customersUpdateFailed: state.customersReducer.customersUpdateFailed,
        customersUpdateSuccess: state.customersReducer.customersUpdateduccess,

        customersDeleteFailed: state.customersReducer.customersDeleteFailed,
        customersDeleteSuccess: state.customersReducer.customersDeleteSuccess,

        addressesReadPending: state.addressesReducer.addressesReadPending,
        addressesReadFailed: state.addressesReducer.addressesReadFailed,
        addressesReadSuccess: state.addressesReducer.addressesReadSuccess,

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