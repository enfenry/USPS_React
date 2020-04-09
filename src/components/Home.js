"use strict"

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Container,
    Row, Col
} from 'reactstrap';
import * as applicationsActions from '../actions/applicationsActions';
import { ADDRESS_CHANGE, MAIL_FORWARDING, PACKAGE_SUBMISSION } from '../constants/applicationTypes';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';
import HomeCard from './HomeCard';


const Home = (props) => {
    const { applications, customers, orders, requestState } = props;
    console.log('customers',customers);
    
    const getNewThisMonth = (array) => {
        let count = 0;
        var currentMonth = new Date().getMonth() + 1;

        array.forEach((el) => {
            var date1 = el.createdon.slice(5, 7);
            var dateStripped = date1.replace(/\b0+/, '');
            if (currentMonth == dateStripped)
                count++;
        });
        return count;
    }

    if (requestState.applicationsReadPending || requestState.orderssReadPending || requestState.customersReadPending) {
        return <LoadingIcon />;
    } else if (requestState.applicationsReadFailed || requestState.ordersReadFailed || requestState.customersReadFailed) {
        return (
            <ErrorBanner>
                Error while loading applications!
            </ErrorBanner>
        );
    } else if (requestState.applicationsReadSuccess && requestState.ordersReadSuccess && requestState.customersReadSuccess) {

        var distribution0 = [0, 0, 0];
        var distribution1 = [0, 0];
        var appsThisMonth = 0;
        var currentMonth = new Date().getMonth() + 1;

        applications.forEach((application) => {
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
            var date1 = application.createdon.slice(5, 7);
            var dateStripped = date1.replace(/\b0+/, '');
            if (currentMonth == dateStripped)
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
            <Container>
                <Row>
                    <Col xs="4">
                        <br />
                        <HomeCard color='primary' header='New Applications' title='Applications created this month: '>
                            {appsThisMonth}
                        </HomeCard>
                        <br />
                        <HomeCard color='warning' header='New Orders' title='Orders placed this month: '>{getNewThisMonth(orders)}</HomeCard>
                        <br />
                        <HomeCard color='danger' header='New Customers' title='Customers this month: '>{getNewThisMonth(customers)}</HomeCard>
                        <br />
                    </Col>
                    <Col xs="8">
                        <br />
                        <h3 style={{ textAlign: 'center' }}>Applications Data:</h3>
                        <br />
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
                    </Col>
                </Row>
            </Container>

        );

    } else {
        return null;
    }
}

Home.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { applicationsReducer, ordersReducer, customersReducer } = state;
    return {
        applications: applicationsReducer.applications,
        customers: customersReducer.customers,
        orders: ordersReducer.orders,
        requestState: Object.assign({},
            applicationsReducer.requestState,
            customersReducer.requestState,
            ordersReducer.requestState,
        )
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