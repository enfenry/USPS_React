import { READ_APPLICATIONS_SUCCESFUL, READ_APPLICATIONS_PENDING, READ_APPLICATIONS_FAILURE, DELETE_APPLICATIONS_SUCCESFUL, DELETE_APPLICATIONS_FAILURE } from '../constants/actionTypes';

export default function applicationsReducer(state = {}, action) {
    switch (action.type) {
        case READ_APPLICATIONS_SUCCESFUL:
            return { ...state, applications: action.data.value, applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        case READ_APPLICATIONS_PENDING:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: true, applicationsRequestFailed: false };
        case READ_APPLICATIONS_FAILURE:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };
        case DELETE_APPLICATIONS_SUCCESFUL:
            return { ...state, applications: action.data.value, applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        case DELETE_APPLICATIONS_FAILURE:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };
        default:
            return state;
    }
}