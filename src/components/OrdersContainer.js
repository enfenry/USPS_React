"use strict"

import * as ordersActions from '../actions/ordersActions';
import OrdersRender from './OrdersRender';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const OrdersContainer = (props) => {

    useEffect(() => {
        const { actions } = props;
        actions.readOrders();
     }, [] );

    if (props.orderRequestState.ordersReadPending || props.productRequestState.productsReadPending || props.customerRequestState.customersReadPending || props.addressRequestState.addressesReadPending) {
        return <LoadingIcon/>;
    } else if (props.orderRequestState.ordersReadFailed || props.productRequestState.productsReadFailed || props.customerRequestState.customersReadFailed || props.addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading customers!
            </ErrorBanner>
        );

    } else if ((props.orderRequestState.ordersReadSuccess || props.orderRequestState.ordersCreateSuccess || props.orderRequestState.ordersUpdateSuccess || props.orderRequestState.ordersDeleteSuccess) && props.productRequestState.productsReadSuccess && props.customerRequestState.customersReadSuccess && props.addressRequestState.addressesReadSuccess) {
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
            <ErrorBanner>
                Invalid state! This message should never appear.
            </ErrorBanner>
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

        orderRequestState: state.ordersReducer.requestState,
        productRequestState: state.productsReducer.requestState,
        addressRequestState: state.addressesReducer.requestState,
        customerRequestState: state.customersReducer.requestState,
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