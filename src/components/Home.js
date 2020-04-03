"use strict"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import * as applicationsActions from '../actions/applicationsActions';
import {ADDRESS_CHANGE, MAIL_FORWARDING, PACKAGE_SUBMISSION} from '../constants/applicationTypes';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Home = (props) => {

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

        var distribution0 = [0, 0, 0];
        var distribution1 = [0, 0];
        var appsThisMonth=0;
        var currentMonth=new Date().getMonth()+1;
        console.log(currentMonth);
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
            distribution1[application.statecode]++;
            var date1 = application.createdon.slice(5,7);
            var dateStripped=date1.replace(/\b0+/, '');
            if(currentMonth==dateStripped) 
                appsThisMonth++;
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
                    <h2>Applications this month:{appsThisMonth}</h2>
                </div>
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
)(Home);