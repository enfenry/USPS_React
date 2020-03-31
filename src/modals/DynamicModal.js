import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connectModal } from 'redux-modal';

import AppUpdate from './AppUpdate';
import AppView from './AppView';

const MyModal = (props) => {
  const {onSubmit, handleHide, show, name, label, entity} = props;

  const renderBody = (label, entity) => {

    switch (label) {
      case 'Delete':
        return (
          <div>
            <p>{'Are you sure?'}</p>
            <Button color="danger" onClick={onSubmit}>{label}</Button>
            <Button color="secondary" onClick={handleHide}>Cancel</Button>
          </div>)
      case 'Update':
        switch (entity) {
          case 'Application':
            return (
              <AppUpdate {...props}/>
            );
          default:
            return 'Invalid Entity';
        }
      case 'View':
      default:
        switch (entity) {
          case 'Application':
            return (
              <AppView {...props} />
            );
          default:
            return 'Invalid Entity';
        }
    }
  }


  return (
    <Modal isOpen={show} size="lg"
    // backdrop={true}
    >
      <ModalHeader>{label} {name}</ModalHeader>
      <ModalBody>
        {renderBody(label, entity)}
      </ModalBody>
    </Modal>
  );
}

MyModal.propTypes = {
  name: PropTypes.string,
  entity: PropTypes.string,
  label: PropTypes.string,
  onSubmit: PropTypes.func,
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
