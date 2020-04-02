import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connectModal } from 'redux-modal';

import AppCreateOrUpdate from '../forms/applications/AppCreateOrUpdate';
import AppView from '../forms/applications/AppView';
import CustomerCreateOrUpdate from '../forms/customers/CustomerCreateOrUpdate';
import CustomerView from '../forms/customers/CustomerView';
import AddressCreateOrUpdate from '../forms/addresses/AddressCreateOrUpdate';
import AddressView from '../forms/addresses/AddressView';


const MyModal = (props) => {
  const { onSubmit, handleHide, show, name, CRUDOption, label, entity } = props;

  const renderBody = () => {

    switch (CRUDOption) {
      case 'Delete':
        return (
          <div>
            <p>{'Are you sure?'}</p>
            <Button color="danger" onClick={() => {
              new Promise(() => {
                onSubmit();
              })
                .then(
                  handleHide()
                )
            }}>{label}</Button>{' '}
            <Button color="secondary" onClick={handleHide}>Cancel</Button>
          </div>)
      case 'Create':
      case 'Update':
        switch (entity) {
          case 'Application':
            return (
              <AppCreateOrUpdate {...props} />
            );
          case 'Customer':
            return (
              <CustomerCreateOrUpdate {...props} />
            );
            case 'Address':
            return (
              <AddressCreateOrUpdate {...props} />
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
          case 'Customer':
            return (
              <CustomerView {...props} />
            );
            case 'Address':
            return (
              <AddressView {...props} />
            );
          default:
            return (
              <div>
                <p>{'Invalid Entity'}</p>
                <Button color="secondary" onClick={handleHide}>Cancel</Button>
              </div>)
        }
    }
  }


  return (
    <Modal isOpen={show} size="lg"
    // backdrop={true}
    >
      <ModalHeader>{CRUDOption} {name}</ModalHeader>
      <ModalBody>
        {renderBody()}
      </ModalBody>
    </Modal>
  );
}

MyModal.propTypes = {
  name: PropTypes.string,
  entity: PropTypes.string,
  label: PropTypes.string,
  CRUDOption: PropTypes.string,
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
  CRUDOption: PropTypes.string,
  entity: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default DynamicModal;
