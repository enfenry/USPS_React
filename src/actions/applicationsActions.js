import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_APPLICATIONS_SUCCESSFUL, READ_APPLICATIONS_FAILURE, READ_APPLICATIONS_PENDING, 
         CREATE_APPLICATION_SUCCESSFUL, CREATE_APPLICATION_FAILURE,
         UPDATE_APPLICATION_SUCCESSFUL, UPDATE_APPLICATION_FAILURE,
         DELETE_APPLICATION_SUCCESSFUL, DELETE_APPLICATION_FAILURE  
} from '../constants/actionTypes';

export const addApplication = () => {

    let config = {
        method: 'post',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': 'return=representation'
         },
    };

    return dispatch => {
        dispatch(_readApplicationsStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/ss_applications", config)
            .then(res => {
                dispatch(_readApplicationsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readApplicationsFailed(error));
            });
    };
}

export const readApplications = () => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {
        dispatch(_readApplicationsStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/ss_applications", config)
            .then(res => {
                dispatch(_readApplicationsSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readApplicationsFailed(error));
            });
    };
}


export const updateApplication = (values, id) => {

    let application = {}

    if (values.ss_name) {application.ss_name = values.ss_name}
    if (values.ss_applicationtype) {application.ss_applicationtype = parseInt(values.ss_applicationtype)}

    if (values._ss_customer_value) {application["ss_Customer@odata.bind"] = `/contacts(${values._ss_customer_value})`}
    if (values._ss_product_value) {application["ss_Product@odata.bind"] = `/products(${values._ss_product_value})`}
    if (values._ss_shippingspeed_value) {application["ss_Product@odata.bind"] = `/products(${values._ss_shippingspeed_value})`}
    if (values._ss_destinationaddress_value) {application["ss_DestinationAddress@odata.bind"] = `/ss_customaddresses(${values._ss_destinationaddress_value})`}

    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/ss_applications(" + id + ")";
    let config = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
           'Prefer': 'return=representation'
        },
        data: application
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then((res) => {
                dispatch(_updateApplicationSuccess(res, id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_updateApplicationFailed(error));
            });
    }
}

export const deleteApplication = (id) => {
    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/ss_applications(" + id + ")";
    let config = {
        method: 'delete',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then(() => {
                dispatch(_deleteApplicationSuccess(id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_deleteApplicationFailed(error));
            });
    };
}

const _readApplicationsSuccess = (res) => {
    return {
        type: READ_APPLICATIONS_SUCCESSFUL,
        data: res.data
    };
}

const _readApplicationsFailed = (error) => {
    return {
        type: READ_APPLICATIONS_FAILURE,
        error
    };
}

const _readApplicationsStarted = () => {
    return {
        type: READ_APPLICATIONS_PENDING
    };
}

const _updateApplicationSuccess = (res, id) => {
    return {
        type: UPDATE_APPLICATION_SUCCESSFUL,
        data: res.data,
        id: id
    };
}

const _updateApplicationFailed = (error) => {
    return {
        type: UPDATE_APPLICATION_FAILURE,
        error
    };
}

const _deleteApplicationSuccess = (id) => {
    console.log(id);
    return {
        type: DELETE_APPLICATION_SUCCESSFUL,
        data: id
    };
}

const _deleteApplicationFailed = (error) => {
    return {
        type: DELETE_APPLICATION_FAILURE,
        error
    };
}
