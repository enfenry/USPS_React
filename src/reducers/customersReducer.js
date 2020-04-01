import { CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILURE, READ_CUSTOMERS_SUCCESSFUL, READ_CUSTOMERS_PENDING, READ_CUSTOMERS_FAILURE, UPDATE_CUSTOMER_SUCCESSFUL, UPDATE_CUSTOMER_FAILURE, DELETE_CUSTOMER_SUCCESSFUL, DELETE_CUSTOMER_FAILURE } from '../constants/actionTypes'


export default function customersReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESSFUL: {
            let newCustomers = [...state.customers];
            newCustomers.push(action.data);
            return { ...state, customers: newCustomers, customersRequestSuccess: true, customersRequestPending: false, customersRequestFailed: false };
        }
        case CREATE_CUSTOMER_FAILURE:
            return { ...state, customers: state.customers, customersRequestSuccess: false, customersRequestPending: false, customersRequestFailed: true };

        case READ_CUSTOMERS_SUCCESSFUL:
            return { ...state, customers: action.data.value, customersRequestSuccess: true, customersRequestPending: false, customersRequestFailed: false };
        case READ_CUSTOMERS_PENDING:
            return { ...state, customersRequestSuccess: false, customersRequestPending: true, customersRequestFailed: false };
        case READ_CUSTOMERS_FAILURE:
            return { ...state, customersRequestSuccess: false, customersRequestPending: false, customersRequestFailed: true };

        case UPDATE_CUSTOMER_SUCCESSFUL: {
            const itemIndex = state.customers.findIndex((e) => (e.contactid === action.id));
            let apps = [...state.customers];
            apps[itemIndex] = action.data;
            return { ...state, customers: apps, customersRequestSuccess: true, customersRequestPending: false, customersRequestFailed: false };
        }
        case UPDATE_CUSTOMER_FAILURE:
            return { ...state, customers: state.customers, customersRequestSuccess: false, customersRequestPending: false, customersRequestFailed: true };
        case DELETE_CUSTOMER_SUCCESSFUL:
            return { ...state, customers: state.customers.filter((e) => e.contactid !== action.data), customersRequestSuccess: true, customersRequestPending: false, customersRequestFailed: false };
        case DELETE_CUSTOMER_FAILURE:
            return { ...state, customersRequestSuccess: false, customersRequestPending: false, customersRequestFailed: true };

        default:
            return state;
    }
}