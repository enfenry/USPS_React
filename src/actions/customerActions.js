
import axios from 'axios'
import { adalApiFetch } from '../adalConfig.js';

import { READ_BOOKS_SUCCESFUL, READ_BOOKS_FAILURE, READ_BOOKS_PENDING} from '../constants/actionTypes';

export const readBooks = () => {

    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/contacts?$select=createdon,firstname,lastname";
    let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      };

  return dispatch => {
      dispatch(_readBookStarted());

      return adalApiFetch(axios, uri, config)
      .then(res => {
          dispatch(_readBookSuccess(res));
      })
      .catch( (error) => {
          console.log(error);
          dispatch(_readBookFailed(error));
      });
  };
}

const _readBookSuccess = (res) => {
    return {
        type: READ_BOOKS_SUCCESFUL,
        data:  res.data
    };
}

const _readBookFailed = (error) => {
    return {
        type: READ_BOOKS_FAILURE,
        error  
    };
}

const _readBookStarted = () => {
    return {
        type: READ_BOOKS_PENDING
    };
}