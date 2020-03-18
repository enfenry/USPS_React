import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_ENTITIES_SUCCESFUL, READ_ENTITIES_FAILURE, READ_ENTITIES_PENDING } from '../constants/actionTypes';

export const readEntities = (uri) => {

    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    return dispatch => {
        dispatch(_readEntitiesStarted());

        return adalApiFetch(axios, uri, config)
            .then(res => {
                dispatch(_readEntitiesSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readEntitiesFailed(error));
            });
    };
}

const _readEntitiesSuccess = (res) => {
    return {
        type: READ_ENTITIES_SUCCESFUL,
        data: res.data
    };
}

const _readEntitiesFailed = (error) => {
    return {
        type: READ_ENTITIES_FAILURE,
        error
    };
}

const _readEntitiesStarted = () => {
    return {
        type: READ_ENTITIES_PENDING
    };
}