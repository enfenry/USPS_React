import { READ_ENTITIES_SUCCESFUL, READ_ENTITIES_PENDING, READ_ENTITIES_FAILURE } from '../constants/actionTypes';

export default function entitiesReducer(state = {}, action) {
  switch (action.type) {
    case READ_ENTITIES_SUCCESFUL:
      return { ...state, entitiesData: { entities: action.data, requestSuccess: true } };
    case READ_ENTITIES_PENDING:
      return { ...state, entitiesData: { requestPending: true } };
    case READ_ENTITIES_FAILURE:
      return { ...state, entitiesData: { requestFailed: true } };
    default:
      return state;
  }
}

//this file was not deleted because we need at least one reducer