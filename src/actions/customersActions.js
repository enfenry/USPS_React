import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_CUSTOMERS_SUCCESSFUL, READ_CUSTOMERS_FAILURE, READ_CUSTOMERS_PENDING } from '../constants/actionTypes';

export const readCustomers = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {
        dispatch(_readCustomersStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/contacts", config)
            .then(res => {
                dispatch(_readCustomersSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readCustomersFailed(error));
            });
    };
}

const _readCustomersSuccess = (res) => {
    return {
        type: READ_CUSTOMERS_SUCCESSFUL,
        data: res.data
    };
}

const _readCustomersFailed = (error) => {
    return {
        type: READ_CUSTOMERS_FAILURE,
        error
    };
}

const _readCustomersStarted = () => {
    return {
        type: READ_CUSTOMERS_PENDING
    };
}
