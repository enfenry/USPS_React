import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connectModal } from 'redux-modal';

import AppUpdate from './AppUpdate';
import AppSelect from './AppSelect';

const MyModal = (props) => {
  
  function renderBody(label, entity) {

    if (label === 'Delete') {
      return (
      <div>
        <p>{'Are you sure?'}</p>
        <Button color="danger" onClick={props.handleAction}>{props.label}</Button>
        <Button color="secondary" onClick={props.handleHide}>Cancel</Button>
      </div>)
    }
    else if (label === 'Select') {
      switch (entity) {
        case 'Application':
          return (
            <AppSelect {...props} />
          );
        default:
          return 'Invalid Entity';
      }
    }
    else {
      switch (entity) {
        case 'Application':
          return (
            <AppUpdate {...props} />
          );
        default:
          return 'Invalid Entity';
      }
    }
  }


  return (
    <Modal isOpen={props.show} size ="lg"
    // backdrop={true}
    >
      <ModalHeader>{props.label} {props.name}</ModalHeader>
      <ModalBody>
        {renderBody(props.label, props.entity)}
      </ModalBody>
    </Modal>
  );
}

MyModal.propTypes = {
  name: PropTypes.string,
  entity: PropTypes.string,
  label: PropTypes.string,
  handleAction: PropTypes.func,
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const DynamicModal = (props) => {
  const WrappedMyModal = connectModal(props)(MyModal);
  return (
    <WrappedMyModal>
      {props.children}
    </WrappedMyModal>
  )
}

DynamicModal.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  entity: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default DynamicModal;
