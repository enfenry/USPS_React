import {READ_ORDERS_SUCCESSFUL, READ_ORDERS_PENDING, READ_ORDERS_FAILURE,
        UPDATE_ORDER_SUCCESSFUL, UPDATE_ORDER_FAILURE, DELETE_ORDER_SUCCESSFUL, DELETE_ORDER_FAILURE, } from '../constants/actionTypes';

export default function ordersReducer(state = {}, action) {

    switch (action.type) {
        case READ_ORDERS_SUCCESSFUL:
            return { ...state, orders: action.data.value, ordersReadSuccess: true, ordersReadPending: false, ordersReadFailed: false };
        case READ_ORDERS_PENDING:
            return { ...state, ordersReadSuccess: false, ordersReadPending: true, ordersReadFailed: false };
        case READ_ORDERS_FAILURE:
            return { ...state, ordersReadSuccess: false, ordersReadPending: false, ordersReadFailed: true };

        case UPDATE_ORDER_SUCCESSFUL: {
            const itemIndex = state.orders.findIndex((e) => (e.salesorderid === action.id));
            let newOrders = [...state.orders];
            newOrders[itemIndex] = action.data;
            return { ...state, orders: newOrders, ordersUpdateSuccess: true, ordersUpdateFailed: false };
        }
        case UPDATE_ORDER_FAILURE:
            return { ...state, orders: state.orders, ordersUpdateSuccess: false, ordersUpdateFailed: true };

        case DELETE_ORDER_SUCCESSFUL:
            return { ...state, orders: state.orders.filter((e) => e.salesorderid !== action.data), ordersDeleteSuccess: true, ordersDeleteFailed: false };
        case DELETE_ORDER_FAILURE:
            return { ...state, ordersDeleteSuccess: false, ordersDeleteFailed: true };
        default:
            return state;
    }
}