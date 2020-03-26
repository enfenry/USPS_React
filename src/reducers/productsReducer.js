import { READ_PRODUCTS_SUCCESSFUL, READ_PRODUCTS_PENDING, READ_PRODUCTS_FAILURE } from '../constants/actionTypes';

export default function productsReducer(state = {}, action) {

    switch (action.type) {
        case READ_PRODUCTS_SUCCESSFUL:
            return { ...state, products: action.data.value, productsRequestSuccess: true, productsRequestPending: false, productsRequestFailed: false };
        case READ_PRODUCTS_PENDING:
            return { ...state, productsRequestSuccess: false, productsRequestPending: true, productsRequestFailed: false };
        case READ_PRODUCTS_FAILURE:
            return { ...state, productsRequestSuccess: false, productsRequestPending: false, productsRequestFailed: true };
        default:
            return state;
    }
}