import {READ_ORDERLINES_SUCCESSFUL, READ_ORDERLINES_PENDING, READ_ORDERLINES_FAILURE} from '../constants/actionTypes';

export default function OrderLinesReducer(state = {}, action) {

switch (action.type) {
    case READ_ORDERLINES_SUCCESSFUL:
        return { ...state, orderLines: action.data.value, requestState: {orderLinesReadSuccess: true, orderLinesReadPending: false, orderLinesReadFailed: false, error: null  }};
    case READ_ORDERLINES_PENDING:
        return { ...state, requestState: { orderLinesReadSuccess: false, orderLinesReadPending: true, orderLinesReadFailed: false, error: null  }};
    case READ_ORDERLINES_FAILURE:
        return { ...state, requestState: { orderLinesReadSuccess: false, orderLinesReadPending: false, orderLinesReadFailed: true, error: action.error  }};
    default:
        return state;
    }
}