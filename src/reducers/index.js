import { combineReducers } from 'redux';
import applicationsReducer from './applicationsReducer';
import customersReducer from './customersReducer';
import ordersReducer from './ordersReducer';
import productsReducer from './productsReducer';
import addressesReducer from './addressesReducer';

import { reducer as modal } from 'redux-modal';
import { reducer as formReducer } from 'redux-form';

 const rootReducer = combineReducers({
  applicationsReducer,
  customersReducer,
  ordersReducer,
  productsReducer,
  addressesReducer,
  modal,
  form: formReducer
});

export default rootReducer;