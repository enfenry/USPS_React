"use strict"

import * as applicationsActions from '../actions/applicationsActions';
import ApplicationsRender from './ApplicationsRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ApplicationsContainer = (props) => {

    console.log(props);

    if (props.applicationsRequestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.applicationsRequestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading applications!
            </div>
        );
    } else if (props.applicationsRequestSuccess) {
        console.log(props.applications);
        return (
            <div className="m-5">
                <ApplicationsRender
                    applications={props.applications}
                    handleUpdate={ (values,application) => {
                        console.log("Update values", values);
                        console.log("Update application", application);
                    }}
                    handleDelete={x => props.actions.deleteApplication(x.ss_applicationid)}
                    handleAdd={() => console.log("Add")}
                />
            </div>
        );
    } else {
        return null;
    }
}

ApplicationsContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        applications: state.applicationsReducer.applications,
        applicationsRequestPending: state.applicationsReducer.applicationsRequestPending,
        applicationsRequestFailed: state.applicationsReducer.applicationsRequestFailed,
        applicationsRequestSuccess: state.applicationsReducer.applicationsRequestSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(applicationsActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationsContainer);