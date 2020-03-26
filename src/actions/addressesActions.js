import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_ADDRESSES_SUCCESSFUL, READ_ADDRESSES_FAILURE, READ_ADDRESSES_PENDING} from '../constants/actionTypes';

export const readAddresses = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {
        dispatch(_readAddressesStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/ss_customaddresses", config)
            .then(res => {
                dispatch(_readAddressesSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readAddressesFailed(error));
            });
    };
}

const _readAddressesSuccess = (res) => {
    return {
        type: READ_ADDRESSES_SUCCESSFUL,
        data: res.data
    };
}

const _readAddressesFailed = (error) => {
    return {
        type: READ_ADDRESSES_FAILURE,
        error
    };
}

const _readAddressesStarted = () => {
    return {
        type: READ_ADDRESSES_PENDING
    };
}
