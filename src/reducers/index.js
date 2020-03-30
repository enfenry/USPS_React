import { combineReducers } from 'redux';
import * as entityReducers from '..reducers';

import { reducer as modal } from 'redux-modal';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entityReducers,
  modal,
  form: formReducer
});

export default rootReducer;