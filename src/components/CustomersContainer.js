"use strict"

import * as customersActions from '../actions/customersActions';
import CustomersRender from './CustomersRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const CustomersContainer = (props) => {
    const { actions, customers, requestState } = props;
    const {
        error,

        customersCreateFailed, customersCreateSuccess,
        customersReadPending, customersReadFailed, customersReadSuccess,
        customersUpdateFailed, customersUpdateSuccess,
        customersDeleteFailed, customersDeleteSuccess,

        // Associated Entities required for displaying information in tables
        addressesReadPending, addressesReadFailed, addressesReadSuccess,
    } = requestState;

    useEffect(() => {
        actions.readCustomers();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <CustomersRender
                    customers={customers}
                    handleUpdate={(values, customer) => {
                        actions.updateCustomer(values, customer.contactid)
                    }}
                    handleDelete={customer => {
                        actions.deleteCustomer(customer.contactid)
                    }}
                    handleCreate={(values) => {
                        actions.createCustomer(values)
                    }}
                    handleRefresh={() => props.actions.readCustomers()}
                />
            </div>
        );
    }

    if (customersReadPending || addressesReadPending) {
        return <LoadingIcon />;
    } else if (customersReadFailed || addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading customers!
            </ErrorBanner>
        );
    } else if (customersDeleteFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {error.message}
                    <br />
                    Cannot delete: Record is associated with another entity record.
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if (customersUpdateFailed || customersCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if ((customersReadSuccess || customersCreateSuccess || customersUpdateSuccess || customersDeleteSuccess) && addressesReadSuccess) {
        return renderSuccess();
    } else {
        return (
            <ErrorBanner>
                Invalid state! This message should never appear.
            </ErrorBanner>
        );
    }
}

CustomersContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { customersReducer, addressesReducer } = state;
    return {
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,
        requestState: Object.assign({},
            addressesReducer.requestState,
            customersReducer.requestState)
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