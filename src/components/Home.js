"use strict"

import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
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

    const getNewThisMonth = (array) => {
        let count = 0;
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();

        array.forEach((el) => {
            var date1 = el.createdon.slice(5, 7);
            var monthStripped = date1.replace(/\b0+/, '');
            var year = el.createdon.slice(0, 4);
            if (currentMonth == monthStripped && year == currentYear)
                count++;
        });
        return count;
    }

    const getLastSixMonths = (array) => {
        let count = [0, 0, 0, 0, 0, 0];
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();
        var monthList = [0, 0, 0, 0, 0, currentMonth];
        var yearList = [0, 0, 0, 0, 0, currentYear];
        var pivotIndex = 0;
        for (var i = 4; i >= 0; i--) {
            if (monthList[i + 1] - 1 > 0) {
                monthList[i] = monthList[i + 1] - 1;
                yearList[i] = yearList[i + 1];
            } else {
                monthList[i] = 12;
                pivotIndex = i;
                yearList[i] = yearList[i + 1] - 1;
            }
        }
        console.log(monthList);
        console.log(yearList);
        console.log(pivotIndex);

        array.forEach((el) => {
            var year = el.createdon.slice(0, 4);

            var month = el.createdon.slice(5, 7);
            var monthStripped = month.replace(/\b0+/, '');
            if ((monthList[0] <= monthStripped && monthStripped <= monthList[pivotIndex])
                || (monthList[pivotIndex + 1] <= monthStripped && monthStripped <= monthList[5])) {

                var monthIndex = monthList.indexOf(Number(monthStripped));
                if (yearList[monthIndex] == Number(year)) {
                    console.log("madeit");
                    count[monthIndex] = count[monthIndex] + 1;
                }
            }
        });
        console.log(count);
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

        });

        const applicationData = {
            labels: [
                "5 months",
                "4 months",
                "3 months",
                "2 months",
                "1 month",
                "This month",
            ],
            datasets: [
                {
                    label: 'Applications in the last 6 months',

                    data: getLastSixMonths(applications),


                    backgroundColor: [
                        '#FF6384',
                        '#FF6384',
                        '#FF6384',
                        '#FF6384',
                        '#FF6384',
                        '#FF6384'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#FF6384',
                        '#FF6384',
                        '#FF6384',
                        '#FF6384',
                        '#FF6384'
                    ]
                },
                {
                    label: 'Orders in the last 6 months',

                    data: getLastSixMonths(orders),


                    backgroundColor: [
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB'


                    ]
                },
                {
                    label: 'New Customers in the last 6 months',

                    data: getLastSixMonths(customers),


                    backgroundColor: [
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56'

                    ]
                }
            ]
        };

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
                            {getNewThisMonth(applications)}
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
                            <Bar
                                label='Applications in the last 6 months'
                                data={applicationData}
                                height={256}
                                options={{ maintainAspectRatio: false }}
                            />
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