import { combineReducers } from 'redux';
import applicationsReducer from './applicationsReducer';
import addressesReducer from './addressesReducer';
import customersReducer from './customersReducer';
import ordersReducer from './ordersReducer';
import productsReducer from './productsReducer';

import { reducer as modal } from 'redux-modal';
import { reducer as formReducer } from 'redux-form';

 const rootReducer = combineReducers({
  applicationsReducer,
  addressesReducer,
  productsReducer,
  customersReducer,
  ordersReducer,
  modal,
  form: formReducer
});

export default rootReducer;