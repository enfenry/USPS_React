import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_APPLICATIONS_SUCCESFUL, READ_APPLICATIONS_FAILURE, READ_APPLICATIONS_PENDING, DELETE_APPLICATION_SUCCESFUL, DELETE_APPLICATION_FAILURE } from '../constants/actionTypes';

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
            .then(res => {
                dispatch(_deleteApplicationSuccess(res));
                console.log("good");
            })
            .catch((error) => {
                console.log("bad");
                console.log(error);
                dispatch(_deleteApplicationFailed(error));
            });
    };
}

const _readApplicationsSuccess = (res) => {
    return {
        type: READ_APPLICATIONS_SUCCESFUL,
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

const _deleteApplicationSuccess = (res) => {
    return {
        type: DELETE_APPLICATION_SUCCESFUL,
        data: res////// Need haandle on our current applications store
    };
}

const _deleteApplicationFailed = (error) => {
    return {
        type: DELETE_APPLICATION_FAILURE,
        error
    };
}
