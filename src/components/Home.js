"use strict"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import * as entityActions from '../actions/entityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Home = (props) => {

    if (!props.entitiesData) {
        return (
            <div className="alert alert-danger" role="alert">
                No entity data!
            </div>
        );
    }

    let applicationsData = props.entitiesData["/applications"];

    if (!applicationsData) {
        return (
            <div className="alert alert-danger" role="alert">
                Entities not found!
            </div>
        );
    } else if (applicationsData.requestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (applicationsData.requestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading entities!
            </div>
        );
    } else if (applicationsData.requestSuccess) {

        var distribution = [0, 0, 0];
        applicationsData.entities.value.forEach((application) => {
            switch (application.ss_applicationtype) {
                case 717800000:
                    distribution[0]++;
                    break;
                case 717800001:
                    distribution[1]++;
                    break;
                case 717800002:
                    distribution[2]++;
                    break;
            }
        });

        const data = {
            labels: [
                "Address Change",
                "Mail Forwarding",
                "Package Submission"
            ],
            datasets: [{
                data: distribution,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        return (
            <div className="mr-xl-n2">
                <Doughnut 
                    data={data}
                    height={256}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        );

    } else {
        return null;
    }
}

Home.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        entitiesData: state.entitiesReducer.entitiesData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(entityActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);