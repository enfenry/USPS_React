import { combineReducers } from 'redux';
import applicationsReducer from './applicationsReducer';
import customersReducer from './customersReducer';
import { reducer as modal } from 'redux-modal';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  applicationsReducer,
  customersReducer,
  modal,
  form: formReducer
});

export default rootReducer;