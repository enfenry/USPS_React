import { HIDE_MODAL, SHOW_MODAL } from '../constants/actionTypes';

export const hideModal = ({modalProps, modalType}) => {
    return dispatch => {
        dispatch({
            type: HIDE_MODAL,
            modalProps,
            modalType
        });
    };
  }

export const showModal = ({modalProps, modalType}) => {
  return dispatch => {
      dispatch({
          type: SHOW_MODAL,
          modalProps,
          modalType
      });
  };
}

