import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_CUSTOMERS_SUCCESSFUL, READ_CUSTOMERS_FAILURE, READ_CUSTOMERS_PENDING, 
    CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILURE,
    UPDATE_CUSTOMER_SUCCESSFUL, UPDATE_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_SUCCESSFUL, DELETE_CUSTOMER_FAILURE  
} from '../constants/actionTypes';

export const createCustomer = (values) => {
    
    let customer = {}

    if (values.firstname) {customer.firstname = values.firstname}
    if (values.lastname) {customer.lastname = values.lastname}
    if (values.emailaddress1) {customer.emailaddress1 = values.emailaddress1}

    let config = {
        method: 'post',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
            'Prefer': 'return=representation'
         },
         data: customer
    };

    return dispatch => {
        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/contacts", config)
            .then(res => {
                dispatch(_createCustomerSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_createCustomerFailed(error));
            });
    };
}


export const readCustomers = () => {

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
        dispatch(_readCustomersStarted());

        return adalApiFetch(axios, "https://sstack.crm.dynamics.com/api/data/v9.1/contacts", config)
            .then(res => {
                dispatch(_readCustomersSuccess(res));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_readCustomersFailed(error));
            });
    };
}

export const updateCustomer = (values, id) => {

    let customer = {}

    if (values.firstname) {customer.firstname = values.firstname}
    if (values.lastname) {customer.lastname = values.lastname}
    if (values.emailaddress1) {customer.emailaddress1 = values.emailaddress1}

    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/contacts(" + id + ")";
    let config = {
        method: 'patch',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        headers: {
           'Prefer': 'return=representation'
        },
        data: customer
    };

    return dispatch => {

        return adalApiFetch(axios, uri, config)
            .then((res) => {
                dispatch(_updateCustomerSuccess(res, id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_updateCustomerFailed(error));
            });
    }
}

export const deleteCustomer = (id) => {
    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/contacts(" + id + ")";
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
                dispatch(_deleteCustomerSuccess(id));
            })
            .catch((error) => {
                console.log(error);
                dispatch(_deleteCustomerFailed(error));
            });
    };
}

const _createCustomerSuccess = (res) => {
    return {
        type: CREATE_CUSTOMER_SUCCESSFUL,
        data: res.data
    };
}

const _createCustomerFailed = (error) => {
    return {
        type: CREATE_CUSTOMER_FAILURE,
        error
    };
}

const _readCustomersSuccess = (res) => {
    return {
        type: READ_CUSTOMERS_SUCCESSFUL,
        data: res.data
    };
}

const _readCustomersFailed = (error) => {
    return {
        type: READ_CUSTOMERS_FAILURE,
        error
    };
}

const _readCustomersStarted = () => {
    return {
        type: READ_CUSTOMERS_PENDING
    };
}

const _updateCustomerSuccess = (res, id) => {
    return {
        type: UPDATE_CUSTOMER_SUCCESSFUL,
        data: res.data,
        id: id
    };
}

const _updateCustomerFailed = (error) => {
    return {
        type: UPDATE_CUSTOMER_FAILURE,
        error
    };
}

const _deleteCustomerSuccess = (id) => {
    return {
        type: DELETE_CUSTOMER_SUCCESSFUL,
        data: id
    };
}

const _deleteCustomerFailed = (error) => {
    return {
        type: DELETE_CUSTOMER_FAILURE,
        error
    };
}
