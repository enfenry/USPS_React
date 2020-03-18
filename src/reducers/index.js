import { combineReducers } from 'redux';
import entitiesReducer from './entitiesReducer';

const rootReducer = combineReducers({
  entitiesReducer,
});

export default rootReducer;