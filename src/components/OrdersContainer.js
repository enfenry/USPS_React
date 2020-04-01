"use strict"

import * as ordersActions from '../actions/ordersActions';
import OrdersRender from './OrdersRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const OrdersContainer = (props) => {

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

        applicationsRequestPending: state.applicationsReducer.applicationsRequestPending,
        applicationsRequestFailed: state.applicationsReducer.applicationsRequestFailed,
        applicationsRequestSuccess: state.applicationsReducer.applicationsRequestSuccess,

        customersRequestPending: state.customersReducer.customersRequestPending,
        customersRequestFailed: state.customersReducer.customersRequestFailed,
        customersRequestSuccess: state.customersReducer.customersRequestSuccess,

        productsRequestPending: state.productsReducer.productsRequestPending,
        productsRequestFailed: state.productsReducer.productsRequestFailed,
        productsRequestSuccess: state.productsReducer.productsRequestSuccess,

        ordersRequestPending: state.ordersReducer.ordersRequestPending,
        ordersRequestFailed: state.ordersReducer.ordersRequestFailed,
        ordersRequestSuccess: state.ordersReducer.ordersRequestSuccess,

        addressesRequestPending: state.addressesReducer.addressesRequestPending,
        addressesRequestFailed: state.addressesReducer.addressesRequestFailed,
        addressesRequestSuccess: state.addressesReducer.addressesRequestSuccess,
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