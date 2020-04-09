import {
    CREATE_ADDRESS_SUCCESSFUL, CREATE_ADDRESS_FAILURE, READ_ADDRESSES_SUCCESSFUL, READ_ADDRESSES_PENDING, READ_ADDRESSES_FAILURE, UPDATE_ADDRESS_SUCCESSFUL, UPDATE_ADDRESS_FAILURE, DELETE_ADDRESS_SUCCESSFUL, DELETE_ADDRESS_FAILURE

} from '../constants/actionTypes';

export default function addressesReducer(state = {}, action) {

    switch (action.type) {
        case CREATE_ADDRESS_SUCCESSFUL: {
            let newAddresses = [...state.addresses];
            newAddresses.push(action.data);
            return { ...state, addresses: newAddresses, requestState: { ...state.requestState, addressesCreateSuccess: true, addressesCreateFailed: false, error: null } };
        }
        case CREATE_ADDRESS_FAILURE:
            return { ...state, addresses: state.addresses, requestState: { ...state.requestState, addressesCreateSuccess: false, addressesCreateFailed: true, error: action.error } };

        case UPDATE_ADDRESS_SUCCESSFUL: {
            const itemIndex = state.addresses.findIndex((e) => (e.ss_customaddressid === action.id));
            let newAddresses = [...state.addresses];
            newAddresses[itemIndex] = action.data;
            return { ...state, addresses: newAddresses, requestState: { ...state.requestState, addressesUpdateSuccess: true, addressesUpdateFailed: false, error: null } };
        }
        case UPDATE_ADDRESS_FAILURE:
            return { ...state, addresses: state.addresses, requestState: { ...state.requestState, addressesUpdateSuccess: false, addressesUpdateFailed: true, error: action.error } };
        case DELETE_ADDRESS_SUCCESSFUL:

            return { ...state, addresses: state.addresses.filter((e) => e.ss_customaddressid !== action.data), requestState: { ...state.requestState, addressesDeleteSuccess: true, addressesDeleteFailed: false, error: null } };
        case DELETE_ADDRESS_FAILURE:
            return { ...state, requestState: { ...state.requestState, addressesDeleteSuccess: false, addressesDeleteFailed: true, error: action.error } };

        case READ_ADDRESSES_SUCCESSFUL:
            return { ...state, addresses: action.data.value, requestState: { addressesReadSuccess: true, addressesReadPending: false, addressesReadFailed: false, error: null } };
        case READ_ADDRESSES_PENDING:
            return { ...state, requestState: { addressesReadSuccess: false, addressesReadPending: true, addressesReadFailed: false, error: null } };
        case READ_ADDRESSES_FAILURE:
            return { ...state, requestState: { addressesReadSuccess: false, addressesReadPending: false, addressesReadFailed: true, error: action.error } };
        default:
            return state;
    }
}