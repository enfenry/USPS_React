import { READ_PRODUCTS_SUCCESSFUL, READ_PRODUCTS_PENDING, READ_PRODUCTS_FAILURE } from '../constants/actionTypes';

export default function productsReducer(state = {}, action) {

    switch (action.type) {
        case READ_PRODUCTS_SUCCESSFUL:
            return { ...state, products: action.data.value, requestState: { productsReadSuccess: true, productsReadPending: false, productsReadFailed: false, error: null } };
        case READ_PRODUCTS_PENDING:
            return { ...state, requestState: { productsReadSuccess: false, productsReadPending: true, productsReadFailed: false, error: null } };
        case READ_PRODUCTS_FAILURE:
            return { ...state, requestState: { productsReadSuccess: false, productsReadPending: false, productsReadFailed: true, error: action.error } };
        default:
            return state;
    }
}