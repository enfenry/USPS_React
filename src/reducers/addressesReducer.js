import { CREATE_ADDRESS_SUCCESSFUL, CREATE_ADDRESS_FAILURE, READ_ADDRESSES_SUCCESSFUL, READ_ADDRESSES_PENDING, READ_ADDRESSES_FAILURE, UPDATE_ADDRESS_SUCCESSFUL, UPDATE_ADDRESS_FAILURE, DELETE_ADDRESS_SUCCESSFUL, DELETE_ADDRESS_FAILURE

} from '../constants/actionTypes';

export default function addressesReducer(state = {}, action) {

    switch (action.type) {
        case CREATE_ADDRESS_SUCCESSFUL: {
            let newAddresses = [...state.addresses];
            newAddresses.push(action.data);
            return { ...state, addresses: newAddresses, addressesCreateSuccess: true, addressesCreateFailed: false };
        }
        case CREATE_ADDRESS_FAILURE:
            return { ...state, addresses: state.addresses, addressesCreateSuccess: false,  addressesCreateFailed: true };

            case UPDATE_ADDRESS_SUCCESSFUL: {
                const itemIndex = state.addresses.findIndex((e) => (e.ss_customaddressid === action.id));
                let apps = [...state.addresses];
                apps[itemIndex] = action.data;
                return { ...state, addresses: apps, addressesUpdateSuccess: true, addressesUpdateFailed: false };
            }
            case UPDATE_ADDRESS_FAILURE:
                return { ...state, addresses: state.addresses, addressesUpdateSuccess: false,  addressesUpdateFailed: true };
            case DELETE_ADDRESS_SUCCESSFUL:
                return { ...state, addresses: state.addresses.filter((e) => e.ss_customaddressid !== action.data), addressesDeleteSuccess: true, addressesDeleteFailed: false };
            case DELETE_ADDRESS_FAILURE:
                return { ...state, addressesDeleteSuccess: false, addressesDeleteFailed: true };    
            
        case READ_ADDRESSES_SUCCESSFUL:
            return { ...state, addresses: action.data.value, addressesReadSuccess: true, addressesReadPending: false, addressesReadFailed: false };
        case READ_ADDRESSES_PENDING:
            return { ...state, addressesReadSuccess: false, addressesReadPending: true, addressesReadFailed: false };
        case READ_ADDRESSES_FAILURE:
            return { ...state, addressesReadSuccess: false, addressesReadPending: false, addressesReadFailed: true };
        default:
            return state;
    }
}