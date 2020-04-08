import { CREATE_APPLICATION_SUCCESSFUL, CREATE_APPLICATION_FAILURE, READ_APPLICATIONS_SUCCESSFUL, READ_APPLICATIONS_PENDING, READ_APPLICATIONS_FAILURE,
         UPDATE_APPLICATION_SUCCESSFUL, UPDATE_APPLICATION_FAILURE, DELETE_APPLICATION_SUCCESSFUL, DELETE_APPLICATION_FAILURE, 
         APP_TO_ORDER_SUCCESSFUL, APP_TO_ORDER_FAILURE} from '../constants/actionTypes'
export default function applicationsReducer(state = {}, action) {

    switch (action.type) {

        case CREATE_APPLICATION_SUCCESSFUL: {
        let newApplications = [...state.applications];
        newApplications.push(action.data);
            return { ...state, applications: newApplications, requestState: {applicationsCreateSuccess: true, applicationsCreateFailed: false, error: null }}; 
        }
        case CREATE_APPLICATION_FAILURE:
            return { ...state, applications:state.applications, requestState: {applicationsCreateSuccess: false, applicationsCreateFailed: true, error: action.data }};    

        case READ_APPLICATIONS_SUCCESSFUL:
            return { ...state, applications: action.data.value, requestState: { applicationsReadSuccess: true, applicationsReadPending: false, applicationsReadFailed: false, error: null }};
        case READ_APPLICATIONS_PENDING:
            return { ...state, requestState: { applicationsReadSuccess: false, applicationsReadPending: true, applicationsReadFailed: false, error: null  }};
        case READ_APPLICATIONS_FAILURE:
            return { ...state, requestState: { applicationsReadSuccess: false, applicationsReadPending: false, applicationsReadFailed: true, error: action.error}};

        case UPDATE_APPLICATION_SUCCESSFUL: {
            const itemIndex = state.applications.findIndex((e) => (e.ss_applicationid === action.id));
            let apps = [...state.applications];   
            apps[itemIndex]=action.data;
            return { ...state, applications: apps, requestState: {applicationsUpdateSuccess: true,  applicationsUpdateFailed: false, error: null  }};
        }
        case UPDATE_APPLICATION_FAILURE:
            return { ...state, applications:state.applications, requestState: {applicationsUpdateSuccess: false, applicationsUpdateFailed: true, error: action.error}};    

        case DELETE_APPLICATION_SUCCESSFUL:
            return { ...state, applications: state.applications.filter((e) => e.ss_applicationid !== action.data), requestState: {applicationsDeleteSuccess: true, applicationsDeleteFailed: false, error: null  }};
        case DELETE_APPLICATION_FAILURE:
            return { ...state, applicationsDeleteSuccess: false,  requestState: { applicationsDeleteFailed: true, error: action.error }};

        case APP_TO_ORDER_SUCCESSFUL:
            return { ...state, requestState: { applicationsToOrderSuccess: true,  applicationsToOrderFailed: false, error: null }};
        case APP_TO_ORDER_FAILURE:
            return { ...state, requestState: { applicationsToOrderSuccess: false, applicationsToOrderFailed: true, error: action.error }};     

        default:
            return state;
    }
}