import {READ_ORDERS_SUCCESSFUL, READ_ORDERS_PENDING, READ_ORDERS_FAILURE,
        UPDATE_ORDER_SUCCESSFUL, UPDATE_ORDER_FAILURE, DELETE_ORDER_SUCCESSFUL, DELETE_ORDER_FAILURE, } from '../constants/actionTypes';

export default function ordersReducer(state = {}, action) {

    switch (action.type) {
        case READ_ORDERS_SUCCESSFUL:
            return { ...state, orders: action.data.value, requestState: {ordersReadSuccess: true, ordersReadPending: false, ordersReadFailed: false, error: null  }};
        case READ_ORDERS_PENDING:
            return { ...state, requestState: { ordersReadSuccess: false, ordersReadPending: true, ordersReadFailed: false, error: null  }};
        case READ_ORDERS_FAILURE:
            return { ...state, requestState: { ordersReadSuccess: false, ordersReadPending: false, ordersReadFailed: true, error: action.error  }};

        case UPDATE_ORDER_SUCCESSFUL: {
            const itemIndex = state.orders.findIndex((e) => (e.salesorderid === action.id));
            let newOrders = [...state.orders];
            newOrders[itemIndex] = action.data;
            return { ...state, orders: newOrders, requestState: {ordersUpdateSuccess: true, ordersUpdateFailed: false, error: null } };
        }
        case UPDATE_ORDER_FAILURE:
            return { ...state, orders: state.orders, requestState: {ordersUpdateSuccess: false, ordersUpdateFailed: true, error: action.error  }};

        case DELETE_ORDER_SUCCESSFUL:
            return { ...state, orders: state.orders.filter((e) => e.salesorderid !== action.data), requestState: {ordersDeleteSuccess: true, ordersDeleteFailed: false, error: null  }};
        case DELETE_ORDER_FAILURE:
            return { ...state, requestState: {ordersDeleteSuccess: false, ordersDeleteFailed: true, error: action.error  }};
        default:
            return state;
    }
}