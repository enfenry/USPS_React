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

    useEffect(() => {
        const { actions } = props;
        actions.readCustomers();
    }, []);

    if (props.customerRequestState.error) {
        console.log('props.customerRequestState', props.customerRequestState);
    }

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <CustomersRender
                    customers={props.customers}
                    handleUpdate={(values, customer) => {
                        props.actions.updateCustomer(values, customer.contactid)
                    }}
                    handleDelete={customer => {
                        props.actions.deleteCustomer(customer.contactid)
                    }}
                    handleCreate={(values) => {
                        props.actions.createCustomer(values)
                    }}
                />
            </div>
        );
    }

    renderSuccess.propTypes = {
        customers: PropTypes.array,
        actions: PropTypes.obj
    }

    if (props.customerRequestState.customersReadPending || props.addressRequestState.addressesReadPending) {
        return <LoadingIcon />;
    } else if (props.customerRequestState.customersReadFailed || props.addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading customers!
            </ErrorBanner>
        );
    } else if (props.customerRequestState.customersDeleteFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {props.customerRequestState.error.message}
                    <br />
                    Cannot delete: Record is associated with another entity record.
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if ((props.customerRequestState.customersReadSuccess || props.customerRequestState.customersCreateSuccess || props.customerRequestState.customersUpdateSuccess || props.customerRequestState.customersDeleteSuccess) && props.addressRequestState.addressesReadSuccess) {
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