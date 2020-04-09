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
    const { actions, customers, customerRequestState, addressRequestState } = props;

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
                />
            </div>
        );
    }

    if (customerRequestState.customersReadPending || addressRequestState.addressesReadPending) {
        return <LoadingIcon />;
    } else if (customerRequestState.customersReadFailed || addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading customers!
            </ErrorBanner>
        );
    } else if (customerRequestState.customersDeleteFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {customerRequestState.error.message}
                    <br />
                    Cannot delete: Record is associated with another entity record.
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if (customerRequestState.customersUpdateFailed || customerRequestState.customersCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {customerRequestState.error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if ((customerRequestState.customersReadSuccess || customerRequestState.customersCreateSuccess || customerRequestState.customersUpdateSuccess || customerRequestState.customersDeleteSuccess) && addressRequestState.addressesReadSuccess) {
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
    return {
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,
        customerRequestState: state.customersReducer.requestState,
        addressRequestState: state.addressesReducer.requestState
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