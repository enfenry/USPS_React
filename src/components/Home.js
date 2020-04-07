"use strict"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import * as applicationsActions from '../actions/applicationsActions';
import {ADDRESS_CHANGE, MAIL_FORWARDING, PACKAGE_SUBMISSION} from '../constants/applicationTypes';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Home = (props) => {

    if (props.applicationsReadPending) {


        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );


    } else if (props.applicationsReadFailed) {

        return (
            <div className="alert alert-danger" role="alert">
                Error while loading applications!
            </div>
        );

    } else if (props.applicationsReadSuccess) {

        var distribution0 = [0, 0, 0];
        props.applications.forEach((application) => {
            switch (application.ss_applicationtype) {
                case ADDRESS_CHANGE:
                    distribution0[0]++;
                    break;
                case MAIL_FORWARDING:
                    distribution0[1]++;
                    break;
                case PACKAGE_SUBMISSION:
                    distribution0[2]++;

                    break;
            }
        });


        var distribution1 = [0, 0];
        props.applications.forEach((application) => {
            distribution1[application.statecode]++;
        });

        const data0 = {

            labels: [
                "Address Change",
                "Mail Forwarding",
                "Package Submission"
            ],
            datasets: [{
                data: distribution0,

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


        const data1 = {
            labels: [
                "Active",
                "Inactive",
            ],
            datasets: [{
                data: distribution1,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }]
        };

        return (
            <React.Fragment>
                <div>
                    <Doughnut
                        data={data0}
                        height={256}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                <div>
                    <Doughnut
                        data={data1}
                        height={256}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </React.Fragment>

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
        applications: state.applicationsReducer.applications,
        applicationsReadPending: state.applicationsReducer.applicationsReadPending,
        applicationsReadFailed: state.applicationsReducer.applicationsReadFailed,
        applicationsReadSuccess: state.applicationsReducer.applicationsReadSuccess

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
)(Home);