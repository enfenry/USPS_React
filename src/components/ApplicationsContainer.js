"use strict"

import * as applicationsActions from '../actions/applicationsActions';
import ApplicationsRender from './ApplicationsRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ApplicationsContainer = (props) => {

    console.log(props);

    if (props.applicationsRequestPending || props.ordersRequestPending || props.productsRequestPending || props.customersRequestPending || props.addressesRequestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.applicationsRequestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading applications!
            </div>
        );
    } else if (props.applicationsRequestSuccess) {
        return (
            <div className="m-5">
                <ApplicationsRender
                    applications={props.applications}
                    handleUpdate={(values, application) => {
                        console.log('values',values);
                        console.log('application',application);
                        props.actions.updateApplication(values, application.ss_applicationid)
                    }}
                    handleDelete={x => {
                        props.actions.deleteApplication(x.ss_applicationid)}}
                    handleAdd={() => console.log("Add")}
                />
            </div>
        );
    } else {
        return null;
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
        addressesRequestSuccess: state.addressesReducer.addressesRequestSuccess
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