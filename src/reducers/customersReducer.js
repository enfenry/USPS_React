import { CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILURE, READ_CUSTOMERS_SUCCESSFUL, READ_CUSTOMERS_PENDING, READ_CUSTOMERS_FAILURE, UPDATE_CUSTOMER_SUCCESSFUL, UPDATE_CUSTOMER_FAILURE, DELETE_CUSTOMER_SUCCESSFUL, DELETE_CUSTOMER_FAILURE } from '../constants/actionTypes'


export default function customersReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CUSTOMER_SUCCESSFUL: {
            let newCustomers = [...state.customers];
            newCustomers.push(action.data);
            return { ...state, customers: newCustomers, requestState: { ...state.requestState, customersCreateSuccess: true, customersCreateFailed: false, error: null } };
        }
        case CREATE_CUSTOMER_FAILURE:
            return { ...state, customers: state.customers, requestState: { ...state.requestState, customersCreateSuccess: false, customersCreateFailed: true, error: action.error } };

        case READ_CUSTOMERS_SUCCESSFUL:
            return { ...state, customers: action.data.value, requestState: { customersReadSuccess: true, customersReadPending: false, customersReadFailed: false, error: null } };
        case READ_CUSTOMERS_PENDING:
            return { ...state, requestState: { customersReadSuccess: false, customersReadPending: true, customersReadFailed: false, error: null } };
        case READ_CUSTOMERS_FAILURE:
            return { ...state, requestState: { customersReadSuccess: false, customersReadPending: false, customersReadFailed: true, error: action.error } };

        case UPDATE_CUSTOMER_SUCCESSFUL: {
            const itemIndex = state.customers.findIndex((e) => (e.contactid === action.id));
            let newCustomers = [...state.customers];
            newCustomers[itemIndex] = action.data;
            return { ...state, customers: newCustomers, requestState: { ...state.requestState, customersUpdateSuccess: true, customersUpdateFailed: false, error: null } };
        }
        case UPDATE_CUSTOMER_FAILURE:
            return { ...state, customers: state.customers, requestState: { ...state.requestState, customersUpdateSuccess: false, customersUpdateFailed: true, error: action.error } };

        case DELETE_CUSTOMER_SUCCESSFUL:
            return { ...state, customers: state.customers.filter((e) => e.contactid !== action.data), requestState: { ...state.requestState, customersDeleteSuccess: true, customersDeleteFailed: false, error: null } };
        case DELETE_CUSTOMER_FAILURE:
            return { ...state, requestState: { ...state.requestState, customersDeleteSuccess: false, customersDeleteFailed: true, error: action.error } };

        default:
            return state;
    }
}