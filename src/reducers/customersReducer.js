import { READ_CUSTOMERS_SUCCESSFUL, READ_CUSTOMERS_PENDING, READ_CUSTOMERS_FAILURE } from '../constants/actionTypes';

export default function customersReducer(state = {}, action) {
    switch (action.type) {
        case READ_CUSTOMERS_SUCCESSFUL:
            return { ...state, customers: action.data.value, customersRequestSuccess: true, customersRequestPending: false, customersRequestFailed: false };
        case READ_CUSTOMERS_PENDING:
            return { ...state, customersRequestSuccess: false, customersRequestPending: true, customersRequestFailed: false };
        case READ_CUSTOMERS_FAILURE:
            return { ...state, customersRequestSuccess: false, customersRequestPending: false, customersRequestFailed: true };
        default:
            return state;
    }
}