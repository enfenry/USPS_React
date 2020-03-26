import { READ_APPLICATIONS_SUCCESSFUL, READ_APPLICATIONS_PENDING, READ_APPLICATIONS_FAILURE, DELETE_APPLICATION_SUCCESSFUL, DELETE_APPLICATION_FAILURE } from '../constants/actionTypes';

export default function applicationsReducer(state = {}, action) {

    switch (action.type) {
        case READ_APPLICATIONS_SUCCESSFUL:
            return { ...state, applications: action.data.value, applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        case READ_APPLICATIONS_PENDING:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: true, applicationsRequestFailed: false };
        case READ_APPLICATIONS_FAILURE:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };
        case DELETE_APPLICATION_SUCCESSFUL:
            return { ...state, applications: state.applications.filter((e) => e.ss_applicationid !== action.data), applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        case DELETE_APPLICATION_FAILURE:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };
        default:
            return state;
    }
}