import { READ_ORDERS_SUCCESSFUL, READ_ORDERS_PENDING, READ_ORDERS_FAILURE } from '../constants/actionTypes';

export default function ordersReducer(state = {}, action) {

    switch (action.type) {
        case READ_ORDERS_SUCCESSFUL:
            return { ...state, orders: action.data.value, ordersRequestSuccess: true, ordersRequestPending: false, ordersRequestFailed: false };
        case READ_ORDERS_PENDING:
            return { ...state, ordersRequestSuccess: false, ordersRequestPending: true, ordersRequestFailed: false };
        case READ_ORDERS_FAILURE:
            return { ...state, ordersRequestSuccess: false, ordersRequestPending: false, ordersRequestFailed: true };
        default:
            return state;
    }
}