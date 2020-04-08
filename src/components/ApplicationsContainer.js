"use strict"

import * as applicationsActions from '../actions/applicationsActions';
import ApplicationsRender from './ApplicationsRender';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const ApplicationsContainer = (props) => {

    useEffect(() => {
       const { actions } = props;
       actions.readApplications();
    }, [] );

    console.log("props:", props);

    if (props.applicationRequestState.applicationsReadPending || props.productRequestState.productsReadPending || props.customerRequestState.customersReadPending || props.addressRequestState.addressesReadPending) {
        return <LoadingIcon/>;
    }
    if (props.applicationRequestState.applicationsReadFailed || props.productRequestState.productsReadFailed || props.customerRequestState.customersReadFailed || props.addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading customers!
            </ErrorBanner>
        );
    }
    if ((props.applicationRequestState.applicationsReadSuccess || props.applicationRequestState.applicationsUpdateSuccess || props.applicationRequestState.applicationsCreateSuccess|| props.applicationRequestState.applicationsToOrderSuccess) && props.productRequestState.productsReadSuccess && props.customerRequestState.customersReadSuccess && props.addressRequestState.addressesReadSuccess) {
        return (
            <div className="reactive-margin">
                <ApplicationsRender
                    applications={props.applications}
                    handleUpdate={(values, application) => {
                        props.actions.updateApplication(values, application.ss_applicationid)
                    }}
                    handleDelete={application => {
                        props.actions.deleteApplication(application.ss_applicationid)
                    }}
                    handleCreate={(values) => {
                        props.actions.createApplication(values)
                    }}
                    handleAppToOrder={(application) => {
                            props.actions.applicationToOrder(application.ss_applicationid)
                    }}
                />
            </div>
        );
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