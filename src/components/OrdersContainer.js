"use strict"

import * as ordersActions from '../actions/ordersActions';
import OrdersRender from './OrdersRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const OrdersContainer = (props) => {

    console.log("orders container: ", props);

    if (props.applicationsReadPending || props.ordersReadPending || props.productsReadPending || props.customersReadPending || props.addressesReadPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.applicationsReadFailed || props.ordersReadFailed || props.productsReadFailed || props.customersReadFailed || props.addressesReadFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading entities!
            </div>
        );

    } else if (props.applicationsReadSuccess && props.ordersReadSuccess && props.productsReadSuccess && props.customersReadSuccess && props.addressesReadSuccess) {
        return (
            <div className="reactive-margin">
                <OrdersRender
                    orders={props.orders}
                    handleUpdate={(values, order) => {
                        props.actions.updateOrder(values, order.salesorderid)
                    }}
                    handleDelete={order => {
                        props.actions.deleteOrder(order.salesorderid)
                    }}
                    handleCreate={(values) => {
                        props.actions.createOrder(values)
                    }}
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


OrdersContainer.propTypes = {
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

        ordersReadPending: state.ordersReducer.ordersReadPending,
        ordersReadFailed: state.ordersReducer.ordersReadFailed,
        ordersReadSuccess: state.ordersReducer.ordersReadSuccess,
        
        ordersCreateFailed: state.ordersReducer.ordersCreateFailed,
        ordersCreateSuccess: state.ordersReducer.ordersCreateSuccess,

        ordersUpdateFailed: state.ordersReducer.ordersUpdateFailed,
        ordersUpdateSuccess: state.ordersReducer.ordersUpdateduccess,

        ordersDeleteFailed: state.ordersReducer.ordersDeleteFailed,
        ordersDeleteSuccess: state.ordersReducer.ordersDeleteSuccess,

        applicationsReadPending: state.applicationsReducer.applicationsReadPending,
        applicationsReadFailed: state.applicationsReducer.applicationsReadFailed,
        applicationsReadSuccess: state.applicationsReducer.applicationsReadSuccess,

        customersReadPending: state.customersReducer.customersReadPending,
        customersReadFailed: state.customersReducer.customersReadFailed,
        customersReadSuccess: state.customersReducer.customersReadSuccess,

        productsReadPending: state.productsReducer.productsReadPending,
        productsReadFailed: state.productsReducer.productsReadFailed,
        productsReadSuccess: state.productsReducer.productsReadSuccess,

        addressesReadPending: state.addressesReducer.addressesReadPending,
        addressesReadFailed: state.addressesReducer.addressesReadFailed,
        addressesReadSuccess: state.addressesReducer.addressesReadSuccess,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ordersActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersContainer);