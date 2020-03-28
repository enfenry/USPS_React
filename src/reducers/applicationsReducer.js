import { CREATE_APPLICATION_SUCCESSFUL, CREATE_APPLICATION_FAILURE, READ_APPLICATIONS_SUCCESSFUL, READ_APPLICATIONS_PENDING, READ_APPLICATIONS_FAILURE, UPDATE_APPLICATION_SUCCESSFUL, UPDATE_APPLICATION_FAILURE, DELETE_APPLICATION_SUCCESSFUL, DELETE_APPLICATION_FAILURE } from '../constants/actionTypes'
export default function applicationsReducer(state = {}, action) {

    switch (action.type) {

        case CREATE_APPLICATION_SUCCESSFUL: {
            let apps = JSON.parse(JSON.stringify(state.applications)).push(action.data);    
            return { ...state, applications: apps, applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        }
        case CREATE_APPLICATION_FAILURE:
            return { ...state, applications:state.applications, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };    

        case READ_APPLICATIONS_SUCCESSFUL:
            return { ...state, applications: action.data.value, applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        case READ_APPLICATIONS_PENDING:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: true, applicationsRequestFailed: false };
        case READ_APPLICATIONS_FAILURE:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };

        case UPDATE_APPLICATION_SUCCESSFUL: {
            const itemIndex = state.applications.findIndex((e) => (e.ss_applicationid === action.id));
            let apps = JSON.parse(JSON.stringify(state.applications));    
            apps[itemIndex]=action.data
            return { ...state, applications: apps, applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        }
        case UPDATE_APPLICATION_FAILURE:
            return { ...state, applications:state.applications, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };    

        case DELETE_APPLICATION_SUCCESSFUL:
            return { ...state, applications: state.applications.filter((e) => e.ss_applicationid !== action.data), applicationsRequestSuccess: true, applicationsRequestPending: false, applicationsRequestFailed: false };
        case DELETE_APPLICATION_FAILURE:
            return { ...state, applicationsRequestSuccess: false, applicationsRequestPending: false, applicationsRequestFailed: true };
        default:
            return state;
    }
}