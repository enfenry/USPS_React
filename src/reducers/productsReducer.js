import { READ_PRODUCTS_SUCCESSFUL, READ_PRODUCTS_PENDING, READ_PRODUCTS_FAILURE } from '../constants/actionTypes';

export default function productsReducer(state = {}, action) {

    switch (action.type) {
        case READ_PRODUCTS_SUCCESSFUL:
            return { ...state, products: action.data.value, productsReadSuccess: true, productsReadPending: false, productsReadFailed: false };
        case READ_PRODUCTS_PENDING:
            return { ...state, productsReadSuccess: false, productsReadPending: true, productsReadFailed: false };
        case READ_PRODUCTS_FAILURE:
            return { ...state, productsReadSuccess: false, productsReadPending: false, productsReadFailed: true };
        default:
            return state;
    }
}