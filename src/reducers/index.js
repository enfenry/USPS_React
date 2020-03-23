import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import { reducer as modal } from 'redux-modal';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  bookReducer,
  modal,
  form: formReducer
});

export default rootReducer;
