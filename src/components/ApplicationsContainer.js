"use strict"

import * as applicationsActions from '../actions/applicationsActions';
import ApplicationsRender from './ApplicationsRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const ApplicationsContainer = (props) => {
    const { actions, applications, requestState } = props;
    const {
        error,

        applicationsCreateFailed, applicationsCreateSuccess,
        applicationsReadPending, applicationsReadFailed, applicationsReadSuccess,
        applicationsUpdateFailed, applicationsUpdateSuccess,
        applicationsDeleteFailed, applicationsDeleteSuccess,

        applicationsToOrderFailed, applicationsToOrderSuccess,

        // Associated Entities required for displaying information in tables
        customersReadPending, customersReadFailed, customersReadSuccess,
        addressesReadPending, addressesReadFailed, addressesReadSuccess,
        productsReadPending, productsReadFailed, productsReadSuccess,
    } = requestState;

    console.log(actions);

    useEffect(() => {
        actions.readApplications();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <ApplicationsRender
                    applications={applications}
                    handleUpdate={(values, application) => {
                        actions.updateApplication(values, application.ss_applicationid)
                    }}
                    handleDelete={application => {
                        actions.deleteApplication(application.ss_applicationid)
                    }}
                    handleCreate={(values) => {
                        actions.createApplication(values)
                    }}
                    handleAppToOrder={(application) => {
                        actions.applicationToOrder(application.ss_applicationid)
                    }}
                    handleRefresh={() => actions.readApplications()}
                />
            </div>
        );
    }

    if (applicationsReadPending || productsReadPending || customersReadPending || addressesReadPending) {
        return <LoadingIcon />;
    } else if (applicationsReadFailed || productsReadFailed || customersReadFailed || addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading applications!
            </ErrorBanner>
        );
    } else if (applicationsUpdateFailed || applicationsCreateFailed || applicationsToOrderFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if (applicationsDeleteFailed) {
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
    } else if ((applicationsReadSuccess || applicationsUpdateSuccess || applicationsCreateSuccess || applicationsDeleteSuccess || applicationsToOrderSuccess) && productsReadSuccess && customersReadSuccess && addressesReadSuccess) {
        return renderSuccess();
    } else {
        return (
            <ErrorBanner>
               Invalid state! This message should never appear.
            </ErrorBanner>
        );
    }
}

ApplicationsContainer.propTypes = {
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
            customersReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(applicationsActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsContainer);