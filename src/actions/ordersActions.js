import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_ORDERS_SUCCESSFUL, READ_ORDERS_FAILURE, READ_ORDERS_PENDING} from '../constants/actionTypes';

export const readOrders = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {
        dispatch(_readOrdersStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/salesorders", config)
            .then(res => {
                dispatch(_readOrdersSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readOrdersFailed(error));
            });
    };
}

const _readOrdersSuccess = (res) => {
    return {
        type: READ_ORDERS_SUCCESSFUL,
        data: res.data
    };
}

const _readOrdersFailed = (error) => {
    return {
        type: READ_ORDERS_FAILURE,
        error
    };
}

const _readOrdersStarted = () => {
    return {
        type: READ_ORDERS_PENDING
    };
}

