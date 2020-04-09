import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_ORDERS_SUCCESSFUL, READ_ORDERS_FAILURE, READ_ORDERS_PENDING,
        UPDATE_ORDER_SUCCESSFUL, UPDATE_ORDER_FAILURE,
        DELETE_ORDER_SUCCESSFUL, DELETE_ORDER_FAILURE
} from '../constants/actionTypes';

export const readOrders = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': "odata.include-annotations=*"
         }
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

export const updateOrder = (values, id) => {

    let order = {}

    if (values.ss_customaddressid) {order.ss_customaddressid = values.ss_customaddressid}

    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/salesorders(" + id + ")";
    let config = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
           'Prefer': 'return=representation'
        },
        data: order
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then((res) => {
                dispatch(_updateOrderSuccess(res, id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_updateOrderFailed(error));
            });
    }
}

export const deleteOrder = (id) => {
    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/salesorders(" + id + ")";
    let config = {
        method: 'delete',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'order/json',
        'Content-Type': 'order/json; charset=utf-8',
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then(() => {
                dispatch(_deleteOrderSuccess(id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_deleteOrderFailed(error));
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

const _updateOrderSuccess = (res, id) => {
    return {
        type: UPDATE_ORDER_SUCCESSFUL,
        data: res.data,
        id: id
    };
}

const _updateOrderFailed = (error) => {
    return {
        type: UPDATE_ORDER_FAILURE,
        error
    };
}

const _deleteOrderSuccess = (id) => {
    return {
        type: DELETE_ORDER_SUCCESSFUL,
        data: id
    };
}

const _deleteOrderFailed = (error) => {
    return {
        type: DELETE_ORDER_FAILURE,
        error
    };
}

