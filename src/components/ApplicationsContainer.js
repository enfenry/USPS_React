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
    const { actions, applications, applicationRequestState, productRequestState, customerRequestState, addressRequestState } = props;

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
                />
            </div>
        );
    }

    if (applicationRequestState.applicationsReadPending || productRequestState.productsReadPending || customerRequestState.customersReadPending || addressRequestState.addressesReadPending) {
        return <LoadingIcon />;
    }
    else if (applicationRequestState.applicationsReadFailed || productRequestState.productsReadFailed || customerRequestState.customersReadFailed || addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading applications!
            </ErrorBanner>
        );
    }
    else if (applicationRequestState.applicationsUpdateFailed || applicationRequestState.applicationsCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {addressRequestState.error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    }
    else if ((applicationRequestState.applicationsReadSuccess || applicationRequestState.applicationsUpdateSuccess || applicationRequestState.applicationsCreateSuccess || applicationRequestState.applicationsToOrderSuccess) && productRequestState.productsReadSuccess && customerRequestState.customersReadSuccess && addressRequestState.addressesReadSuccess) {
        return renderSuccess();
    }
    else {
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
    return {
        applications: state.applicationsReducer.applications,
        products: state.productsReducer.products,
        orders: state.ordersReducer.orders,
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,

        applicationRequestState: state.applicationsReducer.requestState,
        productRequestState: state.productsReducer.requestState,
        addressRequestState: state.addressesReducer.requestState,
        customerRequestState: state.customersReducer.requestState,
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