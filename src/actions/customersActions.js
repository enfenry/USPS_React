import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_CUSTOMERS_SUCCESFUL, READ_CUSTOMERS_FAILURE, READ_CUSTOMERS_PENDING, DELETE_CUSTOMER_SUCCESFUL, DELETE_CUSTOMER_FAILURE } from '../constants/actionTypes';

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

export const deleteCustomer = (id) => {

    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/contacts(" + id + ")";
    let config = {
        method: 'delete',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };
    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then(res => {
                dispatch(_deleteCustomerSuccess(res));
                console.log("good");
            })
            .catch((error) => {
                console.log("bad");
                console.log(error);
                dispatch(_deleteCustomerFailed(error));
            });
    };
}
   


const _readCustomersSuccess = (res) => {
    return {
        type: READ_CUSTOMERS_SUCCESFUL,
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

    const _deleteCustomerSuccess = (res) => {
        return {
            type: DELETE_CUSTOMER_SUCCESFUL,
            data: res////// Need haandle on our current applications store
        };
    }
    
    const _deleteCustomerFailed = (error) => {
        return {
            type: DELETE_CUSTOMER_FAILURE,
            error
        };
    }

