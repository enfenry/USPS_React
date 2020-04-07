import { CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILURE, READ_CUSTOMERS_SUCCESSFUL, READ_CUSTOMERS_PENDING, READ_CUSTOMERS_FAILURE, UPDATE_CUSTOMER_SUCCESSFUL, UPDATE_CUSTOMER_FAILURE, DELETE_CUSTOMER_SUCCESSFUL, DELETE_CUSTOMER_FAILURE } from '../constants/actionTypes'


export default function customersReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESSFUL: {
            let newCustomers = [...state.customers];
            newCustomers.push(action.data);
            return { ...state, customers: newCustomers, customersCreateSuccess: true, customersCreateFailed: false };
        }
        case CREATE_CUSTOMER_FAILURE:
            return { ...state, customers: state.customers, customersCreateSuccess: false, customersCreateailed: true };

        case READ_CUSTOMERS_SUCCESSFUL:
            return { ...state, customers: action.data.value, customersReadSuccess: true, customersReadPending: false, customersReadFailed: false };
        case READ_CUSTOMERS_PENDING:
            return { ...state, customersReadSuccess: false, customersReadPending: true, customersReadFailed: false };
        case READ_CUSTOMERS_FAILURE:
            return { ...state, customersReadSuccess: false, customersReadPending: false, customersReadFailed: true };

        case UPDATE_CUSTOMER_SUCCESSFUL: {
            const itemIndex = state.customers.findIndex((e) => (e.contactid === action.id));
            let apps = [...state.customers];
            apps[itemIndex] = action.data;
            return { ...state, customers: apps, customersUpdateSuccess: true, customersUpdateFailed: false };
        }
        case UPDATE_CUSTOMER_FAILURE:
            return { ...state, customers: state.customers, customersUpdateSuccess: false, customersUpdateFailed: true };
        case DELETE_CUSTOMER_SUCCESSFUL:
            return { ...state, customers: state.customers.filter((e) => e.contactid !== action.data), customersDeleteSuccess: true, customersDeleteFailed: false };
        case DELETE_CUSTOMER_FAILURE:
            return { ...state, customersDeleteSuccess: false, customersDeleteFailed: true };

        default:
            return state;
    }
}