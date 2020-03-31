"use strict"

import * as applicationsActions from '../actions/applicationsActions';
import ApplicationsRender from './ApplicationsRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ApplicationsContainer = (props) => {

    if (props.applicationsRequestPending || props.ordersRequestPending || props.productsRequestPending || props.customersRequestPending || props.addressesRequestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.applicationsRequestFailed || props.ordersRequestFailed || props.productsRequestFailed || props.customersRequestFailed || props.addressesRequestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading entities!
            </div>
        );
    } else if (props.applicationsRequestSuccess && props.ordersRequestSuccess && props.productsRequestSuccess && props.customersRequestSuccess && props.addressesRequestSuccess) {
        return (
            <div className="reactive-margin">
                <ApplicationsRender
                    applications={props.applications}
                    handleUpdate={(values, application) => {
                        props.actions.updateApplication(values, application.ss_applicationid)
                    }}
                    handleDelete={x => {
                        props.actions.deleteApplication(x.ss_applicationid)
                    }}
                    handleAdd={() => console.log("Add")}
                />
            </div>
        );
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                Invalid state! This message should never appear.
            </div>
        );
    }
}

ApplicationsContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        applications: state.applicationsReducer.applications,
        products: state.productsReducer.products,
        orders: state.ordersReducer.orders,
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,

        applicationsRequestPending: state.applicationsReducer.applicationsRequestPending,
        applicationsRequestFailed: state.applicationsReducer.applicationsRequestFailed,
        applicationsRequestSuccess: state.applicationsReducer.applicationsRequestSuccess,

        productsRequestPending: state.productsReducer.productsRequestPending,
        productsRequestFailed: state.productsReducer.productsRequestFailed,
        productsRequestSuccess: state.productsReducer.productsRequestSuccess,

        ordersRequestPending: state.ordersReducer.ordersRequestPending,
        ordersRequestFailed: state.ordersReducer.ordersRequestFailed,
        ordersRequestSuccess: state.ordersReducer.ordersRequestSuccess,

        addressesRequestPending: state.addressesReducer.addressesRequestPending,
        addressesRequestFailed: state.addressesReducer.addressesRequestFailed,
        addressesRequestSuccess: state.addressesReducer.addressesRequestSuccess,

        customersRequestPending: state.customersReducer.customersRequestPending,
        customersRequestFailed: state.customersReducer.customersRequestFailed,
        customersRequestSuccess: state.customersReducer.customersRequestSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(applicationsActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsContainer);