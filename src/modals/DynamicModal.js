import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connectModal } from 'redux-modal'

import AppUpdateForm from './AppUpdateForm';

const MyModal = (props) => {
  
  function renderBody(label, entity) {
    // console.log('label', label,'entity',entity);
    if (label === 'Delete') {
      return (<div>{'Are you sure?'}
        <Button color="delete" onClick={props.handleAction}>{props.label}</Button>
      </div>)
    }
    else {
      switch (entity) {
        case 'Application':
          return (
            <AppUpdateForm {...props} />
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
      <ModalFooter>
        <Button color="secondary" onClick={props.handleHide}>Cancel</Button>
      </ModalFooter>
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
