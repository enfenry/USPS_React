"use strict"

import * as customersActions from '../actions/customersActions';
import CustomersRender from './CustomersRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const CustomersContainer = (props) => {

    console.log(props);

    if (props.customersRequestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.customersRequestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        );
    } else if (props.customersRequestSuccess) {
        console.log(props.customers);
        return (
            <div className="m-5">
                <CustomersRender
                    customers={props.customers}
                    handleView={x => console.log("View is fa sar work", x)}
                    handleUpdate={x => console.log("Update", x)}
                    handleDelete={x => props.actions.deleteCustomer(x.contactid)}
                    handleAdd={() => console.log("Add")}
                />
            </div>
        );
    } else {
        return null;
    }
}

CustomersContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        customers: state.customersReducer.customers,
        customersRequestPending: state.customersReducer.customersRequestPending,
        customersRequestFailed: state.customersReducer.customersRequestFailed,
        customersRequestSuccess: state.customersReducer.customersRequestSuccess
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