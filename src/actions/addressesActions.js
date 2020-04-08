import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_ADDRESSES_SUCCESSFUL, READ_ADDRESSES_FAILURE, READ_ADDRESSES_PENDING, 
    CREATE_ADDRESSES_SUCCESSFUL, CREATE_ADDRESSES_FAILURE,
    UPDATE_ADDRESSES_SUCCESSFUL, UPDATE_ADDRESSES_FAILURE,
    DELETE_ADDRESSES_SUCCESSFUL, DELETE_ADDRESSES_FAILURE 

} from '../constants/actionTypes';

export const readAddresses = () => {

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

export const createAddress = (values) => {
    
    let address = {}

    if (values.ss_name) {address.ss_name = values.ss_name}
    if (values.ss_line1) {address.ss_line1 = values.ss_line1}
    if (values.ss_line2) {address.ss_line2 = values.ss_line2}
    if (values.ss_line3) {address.ss_line3 = values.ss_line3}
    if (values.ss_city) {address.ss_city = values.ss_city}
    if (values.ss_state) {address.ss_state = values.ss_state}
    if (values.ss_country) {address.ss_country = values.ss_country}
    if (values.ss_postalcode) {address.ss_postalcode = values.ss_postalcode}



    let config = {
        method: 'post',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': 'return=representation'
         },
         data: address
    };
    return dispatch => {
        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/ss_customaddresses", config)
            .then(res => {
                dispatch(_createAddressSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_createAddressFailed(error));
            });
    };
}

export const updateAddress = (values, id) => {

    let address = {}

    if (values.ss_name) {address.ss_name = values.ss_name}
    if (values.ss_line1) {address.ss_line1 = values.ss_line1}
    if (values.ss_line2) {address.ss_line2 = values.ss_line2}
    if (values.ss_line3) {address.ss_line3 = values.ss_line3}
    if (values.ss_city) {address.ss_city = values.ss_city}
    if (values.ss_state) {address.ss_state = values.ss_state}
    if (values.ss_country) {address.ss_country = values.ss_country}
    if (values.ss_postalcode) {address.ss_postalcode = values.ss_postalcode}



    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/ss_customaddresses(" + id + ")";
    let config = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
           'Prefer': 'return=representation'
        },
        data: address
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then((res) => {
                dispatch(_updateAddressSuccess(res, id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_updateAddressFailed(error));
            });
    }
}

export const deleteAddress = (id) => {
    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/ss_customaddresses(" + id + ")";
    let config = {
        method: 'delete',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then(() => {
                dispatch(_deleteAddressSuccess(id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_deleteAddressFailed(error));
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

const _createAddressSuccess = (res) => {
    return {
        type: CREATE_ADDRESSES_SUCCESSFUL,
        data: res.data
    };
}

const _createAddressFailed = (error) => {
    return {
        type: CREATE_ADDRESSES_FAILURE,
        error
    };
}
const _updateAddressSuccess = (res, id) => {
    return {
        type: UPDATE_ADDRESSES_SUCCESSFUL,
        data: res.data,
        id: id
    };
}

const _updateAddressFailed = (error) => {
    return {
        type: UPDATE_ADDRESSES_FAILURE,
        error
    };
}

const _deleteAddressSuccess = (id) => {
    return {
        type: DELETE_ADDRESSES_SUCCESSFUL,
        data: id
    };
}

const _deleteAddressFailed = (error) => {
    return {
        type: DELETE_ADDRESSES_FAILURE,
        error
    };
}


