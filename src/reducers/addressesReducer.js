import { CREATE_ADDRESS_SUCCESSFUL, CREATE_ADDRESS_FAILURE, READ_ADDRESSES_SUCCESSFUL, READ_ADDRESSES_PENDING, READ_ADDRESSES_FAILURE, UPDATE_ADDRESS_SUCCESSFUL, UPDATE_ADDRESS_FAILURE, DELETE_ADDRESS_SUCCESSFUL, DELETE_ADDRESS_FAILURE

} from '../constants/actionTypes';

export default function addressesReducer(state = {}, action) {

    switch (action.type) {
        case CREATE_ADDRESS_SUCCESSFUL: {
            let newAddresses = [...state.addresses];
            newAddresses.push(action.data);
            return { ...state, addresses: newAddresses, addressesRequestSuccess: true, addressesRequestPending: false, addressesRequestFailed: false };
        }
        case CREATE_ADDRESS_FAILURE:
            return { ...state, addresses: state.addresses, addressesRequestSuccess: false, addressesRequestPending: false, addressesRequestFailed: true };

            case UPDATE_ADDRESS_SUCCESSFUL: {
                const itemIndex = state.addresses.findIndex((e) => (e.ss_customaddressid === action.id));
                let apps = [...state.addresses];
                apps[itemIndex] = action.data;
                return { ...state, addresses: apps, addressesRequestSuccess: true, addressesRequestPending: false, addressesRequestFailed: false };
            }
            case UPDATE_ADDRESS_FAILURE:
                return { ...state, addresses: state.addresses, addressesRequestSuccess: false, addressesRequestPending: false, addressesRequestFailed: true };
            case DELETE_ADDRESS_SUCCESSFUL:
                return { ...state, addresses: state.addresses.filter((e) => e.ss_customaddressid !== action.data), addressesRequestSuccess: true, addressesRequestPending: false, addressesRequestFailed: false };
            case DELETE_ADDRESS_FAILURE:
                return { ...state, addressesRequestSuccess: false, addressesRequestPending: false, addressesRequestFailed: true };    
            
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