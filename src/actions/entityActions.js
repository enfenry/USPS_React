import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_ENTITIES_SUCCESFUL, READ_ENTITIES_FAILURE, READ_ENTITIES_PENDING, DELETE_ENTITIES_SUCCESFUL, DELETE_ENTITIES_FAILURE} from '../constants/actionTypes';

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

// export const addEntities = (uri) => {

//     let config = {
//         method: 'post',
//         'OData-MaxVersion': 4.0,
//         'OData-Version': 4.0,
//         Accept: 'application/json',
//         'Content-Type': 'application/json; charset=utf-8',
//     };

    
//     return dispatch => {
//         dispatch(_readEntitiesStarted());

//         return adalApiFetch(axios, uri, config)
//             .then(res => {
//                 dispatch(_readEntitiesSuccess(res));
//             })
//             .catch((error) => {
//                 console.log(error);
//                 dispatch(_readEntitiesFailed(error));
//             });
//     };

// }

// export const updateEntities = (uri) => {

//     let config = {
//         method: 'put',
//         'OData-MaxVersion': 4.0,
//         'OData-Version': 4.0,
//         Accept: 'application/json',
//         'Content-Type': 'application/json; charset=utf-8',
//     };

//     return dispatch => {
//         dispatch(_readEntitiesStarted());

//         return adalApiFetch(axios, uri, config)
//             .then(res => {
//                 dispatch(_readEntitiesSuccess(res));
//             })
//             .catch((error) => {
//                 console.log(error);
//                 dispatch(_readEntitiesFailed(error));
//             });
//     };
// }

export const deleteEntities = (base_uri, id) => {
    let uri = base_uri+"("+id+")";
    let config = {
        method: 'delete',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    console.log(uri);

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then(res => {
                dispatch(_deleteEntitiesSuccess(res));
                console.log("good");
            })
            .catch((error) => {
                console.log("bad");
                console.log(error);
                dispatch(_deleteEntitiesFailed(error));
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

const _deleteEntitiesSuccess = (res) => {
    return {
        type: DELETE_ENTITIES_SUCCESFUL,
        data: res////// Need haandle on our current entities store
    };
}

const _deleteEntitiesFailed = (error) => {
    return {
        type: DELETE_ENTITIES_FAILURE,
        error
    };
}
