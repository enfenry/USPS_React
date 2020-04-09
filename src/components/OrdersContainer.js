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
        // applications, products, customers,
        requestState } = props;
    const {
        error,

        ordersCreateFailed, ordersCreateSuccess,
        ordersReadPending, ordersReadFailed, ordersReadSuccess,
        ordersUpdateFailed, ordersUpdateSuccess,
        ordersDeleteFailed, ordersDeleteSuccess,

        // Associated Entities required for displaying information in tables
        applicationsReadPending, applicationsReadFailed, applicationsReadSuccess,
        customersReadPending, customersReadFailed, customersReadSuccess,
        addressesReadPending, addressesReadFailed, addressesReadSuccess,
        productsReadPending, productsReadFailed, productsReadSuccess,


    } = requestState;

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
                    handleRefresh={() => props.actions.readOrders()}
                />
            </div>
        );
    }

    if (ordersReadPending || productsReadPending || customersReadPending || addressesReadPending) {
        return <LoadingIcon />;
    } else if (ordersReadFailed || productsReadFailed || customersReadFailed || addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading orders!
            </ErrorBanner>
        );
    } else if (ordersUpdateFailed || ordersCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if ((ordersReadSuccess || ordersCreateSuccess || ordersUpdateSuccess || ordersDeleteSuccess)
        && productsReadSuccess && customersReadSuccess && addressesReadSuccess) {
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
    const { applicationsReducer, productsReducer, ordersReducer, customersReducer, addressesReducer } = state;
    return {
        applications: applicationsReducer.applications,
        products: productsReducer.products,
        orders: ordersReducer.orders,
        customers: customersReducer.customers,
        addresses: addressesReducer.addresses,
        requestState: Object.assign({},
            applicationsReducer.requestState,
            productsReducer.requestState,
            addressesReducer.requestState,
            customersReducer.requestState,
            ordersReducer.requestState)
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