import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';
import {READ_ORDERLINES_SUCCESSFUL, READ_ORDERLINES_PENDING, READ_ORDERLINES_FAILURE} from '../constants/actionTypes';

export const readOrderLines = () => {

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
        dispatch(_readProductsStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/salesorderdetails?$select=productname,_productid_value,quantity,priceperunit,baseamount,_salesorderid_value", config)
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
        type: READ_ORDERLINES_SUCCESSFUL,
        data: res.data
    };
}

const _readProductsFailed = (error) => {
    return {
        type: READ_ORDERLINES_FAILURE,
        error
    };
}

const _readProductsStarted = () => {
    return {
        type: READ_ORDERLINES_PENDING
    };
}
