import { READ_ADDRESSES_SUCCESSFUL, READ_ADDRESSES_PENDING, READ_ADDRESSES_FAILURE } from '../constants/actionTypes';

export default function addressesReducer(state = {}, action) {

    switch (action.type) {
        case READ_ADDRESSES_SUCCESSFUL:
            return { ...state, addresses: action.data.value, addressesRequestSuccess: true, addressesRequestPending: false, addressesRequestFailed: false };
        case READ_ADDRESSES_PENDING:
            return { ...state, addressesRequestSuccess: false, addressesRequestPending: true, addressesRequestFailed: false };
        case READ_ADDRESSES_FAILURE:
            return { ...state, addressesRequestSuccess: false, addressesRequestPending: false, addressesRequestFailed: true };
        default:
            return state;
    }
}