import { combineReducers } from 'redux';

import applicationsReducer from './applicationsReducer';
import customersReducer from './customersReducer';

const rootReducer = combineReducers({
  applicationsReducer,
  customersReducer

});

export default rootReducer;