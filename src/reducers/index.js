import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import { reducer as modal } from 'redux-modal'

const rootReducer = combineReducers({
  bookReducer,
  modal
});

export default rootReducer;
