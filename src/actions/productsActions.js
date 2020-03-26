import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_PRODUCTS_SUCCESSFUL, READ_PRODUCTS_FAILURE, READ_PRODUCTS_PENDING} from '../constants/actionTypes';

export const readProducts = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {
        dispatch(_readProductsStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/products", config)
            .then(res => {
                dispatch(_readProductsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readProductsFailed(error));
            });
    };
}

const _readProductsSuccess = (res) => {
    return {
        type: READ_PRODUCTS_SUCCESSFUL,
        data: res.data
    };
}

const _readProductsFailed = (error) => {
    return {
        type: READ_PRODUCTS_FAILURE,
        error
    };
}

const _readProductsStarted = () => {
    return {
        type: READ_PRODUCTS_PENDING
    };
}
