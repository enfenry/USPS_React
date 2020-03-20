import { READ_ENTITIES_SUCCESFUL, READ_ENTITIES_PENDING, READ_ENTITIES_FAILURE, DELETE_ENTITIES_SUCCESFUL, DELETE_ENTITIES_FAILURE } from '../constants/actionTypes';

export default function entitiesReducer(state = {}, action) {

  let entitiesData = {};
  entitiesData = Object.assign(entitiesData, state.entitiesData);

  switch (action.type) {
    case READ_ENTITIES_SUCCESFUL:
      entitiesData[action.path] = { entities: action.data, requestSuccess: true };
      return { ...state, entitiesData };
    case READ_ENTITIES_PENDING:
      entitiesData[action.path] = { requestPending: true };
      return { ...state, entitiesData };
    case READ_ENTITIES_FAILURE:
      entitiesData[action.path] = { requestFailed: true };
      return { ...state, entitiesData };
    case DELETE_ENTITIES_SUCCESFUL:
      entitiesData[action.path] = { entities: action.data, requestSuccess: true };
      return { ...state, entitiesData };
    case DELETE_ENTITIES_FAILURE:
      entitiesData[action.path] = { requestFailed: true };
      return { ...state, entitiesData };
    default:
      return state;
  }
}

//this file was not deleted because we need at least one reducer