"use strict"

import * as ordersActions from '../actions/ordersActions';
import OrdersRender from './OrdersRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const OrdersContainer = (props) => {
    const { actions, orders,
        // applications, products, customers, applicationRequestState,
        orderRequestState, productRequestState, customerRequestState, addressRequestState } = props;

    useEffect(() => {
        actions.readOrders();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <OrdersRender
                    orders={orders}
                    handleUpdate={(values, order) => {
                        actions.updateOrder(values, order.salesorderid)
                    }}
                    handleDelete={order => {
                        actions.deleteOrder(order.salesorderid)
                    }}
                    handleCreate={(values) => {
                        actions.createOrder(values)
                    }}
                />
            </div>
        );
    }

    if (orderRequestState.ordersReadPending || productRequestState.productsReadPending || customerRequestState.customersReadPending || addressRequestState.addressesReadPending) {
        return <LoadingIcon />;
    } else if (orderRequestState.ordersReadFailed || productRequestState.productsReadFailed || customerRequestState.customersReadFailed || addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading orders!
            </ErrorBanner>
        );
    } else if (orderRequestState.ordersUpdateFailed || orderRequestState.ordersCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {orderRequestState.error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if ((orderRequestState.ordersReadSuccess || orderRequestState.ordersCreateSuccess || orderRequestState.ordersUpdateSuccess || orderRequestState.ordersDeleteSuccess)
        && productRequestState.productsReadSuccess && customerRequestState.customersReadSuccess && addressRequestState.addressesReadSuccess) {
        return renderSuccess();
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