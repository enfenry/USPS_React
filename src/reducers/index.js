import { combineReducers } from 'redux';
<<<<<<< HEAD
import bookReducer from './bookReducer';
import { reducer as modal } from 'redux-modal';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  bookReducer,
  modal,
  form: formReducer
=======

import applicationsReducer from './applicationsReducer';
import customersReducer from './customersReducer';

const rootReducer = combineReducers({
  applicationsReducer,
  customersReducer

>>>>>>> 866918c33b2626a5fb4a72f5f4f87338a245936c
});

export default rootReducer;