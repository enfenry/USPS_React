"use strict"

import * as applicationsActions from '../actions/applicationsActions';
import * as ordersActions from '../actions/ordersActions';
import ApplicationsRender from './ApplicationsRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ApplicationsContainer = (props) => {

    // useEffect(() => {
    //    // const { actions } = props;
    // }, [] );
    
    if (props.applicationsReadPending || props.ordersReadPending || props.productsReadPending || props.customersReadPending || props.addressesReadPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    if (props.applicationsReadFailed || props.ordersReadFailed || props.productsReadFailed || props.customersReadFailed || props.addressesReadFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading entities!
            </div>
        );

    }
    if (props.applicationsReadSuccess && props.ordersReadSuccess && props.productsReadSuccess && props.customersReadSuccess && props.addressesReadSuccess) {
        return (
            <div className="reactive-margin">
                <ApplicationsRender
                    applications={props.applications}
                    handleUpdate={(values, application) => {
                        props.actions.updateApplication(values, application.ss_applicationid)
                    }}
                    handleDelete={application => {
                        props.actions.deleteApplication(application.ss_applicationid)
                    }}
                    handleCreate={(values) => {
                        props.actions.createApplication(values)
                    }}
                    handleAppToOrder={(application) => {
                        new Promise(() => {
                            props.actions.applicationToOrder(application.ss_applicationid); // How to launch only after state change
                        })
                            .then(props.orderActions.readOrders());// Add output params to action? setTimeout? setTimeout(f(), 300));
                    }}
                />
            </div>
        );
    } 
    else {
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
        error: state.error,

        applicationsReadPending: state.applicationsReducer.applicationsReadPending,
        applicationsReadFailed: state.applicationsReducer.applicationsReadFailed,
        applicationsReadSuccess: state.applicationsReducer.applicationsReadSuccess,

        applicationsCreateFailed: state.applicationsReducer.applicationsCreateFailed,
        applicationsCreateSuccess: state.applicationsReducer.applicationsCreateSuccess,

        applicationsUpdateFailed: state.applicationsReducer.applicationsUpdateFailed,
        applicationsUpdateSuccess: state.applicationsReducer.applicationsUpdateduccess,

        applicationsDeleteFailed: state.applicationsReducer.applicationsDeleteFailed,
        applicationsDeleteSuccess: state.applicationsReducer.applicationsDeleteSuccess,

        applicationsToOrderFailed: state.applicationsReducer.applicationsToOrderFailed,
        applicationsToOrderSuccess: state.applicationsReducer.applicationsDeleteSuccess,

        customersReadPending: state.customersReducer.customersReadPending,
        customersReadFailed: state.customersReducer.customersReadFailed,
        customersReadSuccess: state.customersReducer.customersReadSuccess,

        productsReadPending: state.productsReducer.productsReadPending,
        productsReadFailed: state.productsReducer.productsReadFailed,
        productsReadSuccess: state.productsReducer.productsReadSuccess,

        ordersReadPending: state.ordersReducer.ordersReadPending,
        ordersReadFailed: state.ordersReducer.ordersReadFailed,
        ordersReadSuccess: state.ordersReducer.ordersReadSuccess,

        addressesReadPending: state.addressesReducer.addressesReadPending,
        addressesReadFailed: state.addressesReducer.addressesReadFailed,
        addressesReadSuccess: state.addressesReducer.addressesReadSuccess,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(applicationsActions, dispatch),
        orderActions: bindActionCreators(ordersActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsContainer);