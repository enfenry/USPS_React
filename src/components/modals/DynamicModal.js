import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connectModal } from 'redux-modal';

import AppCreateOrUpdate from '../forms/applications/AppCreateOrUpdate';
import AppView from '../forms/applications/AppView';
import OrderUpdate from '../forms/orders/OrderUpdate';
import OrderView from '../forms/orders/OrderView';
import CustomerCreateOrUpdate from '../forms/customers/CustomerCreateOrUpdate';
import CustomerView from '../forms/customers/CustomerView';
import AddressCreateOrUpdate from '../forms/addresses/AddressCreateOrUpdate';
import AddressView from '../forms/addresses/AddressView';


const MyModal = (props) => {
  const { onSubmit, handleHide, show, name, command, children, entity, initialValues } = props;

  const renderBody = () => {
    switch (command) {
      case 'Delete':
        return (
          <div>
            <p>Are you sure?</p>
            <Button color="danger" onClick={() => {
              new Promise(() => {
                onSubmit();
              })
                .then(
                  handleHide()
                )
            }}>{children}</Button>{' '}
            <Button color="secondary" onClick={handleHide}>Cancel</Button>
          </div>)
      case 'Place Order':
        
        return initialValues.statecode == 0 ? (
          <div>
            <p>Confirm Order?</p>
            <Button color="primary" onClick={() => {
              new Promise(() => {
                onSubmit();
              })
                .then(
                  handleHide()
                )
            }}>{children}</Button>{' '}
            <Button color="secondary" onClick={handleHide}>Cancel</Button>
          </div>)
          : (
            <div>
              <p>Cannot Place Order from an Inactive Application.</p>
              <Button color="secondary" onClick={handleHide}>Cancel</Button>
            </div>)
      case 'Create':
      case 'Update':
        switch (entity) {
          case 'Application':
            return (
              <AppCreateOrUpdate {...props} />
            );
          case 'Order':
            return (
              <OrderUpdate {...props} />
            );
          case 'Customer':
            return (
              <CustomerCreateOrUpdate {...props} />
            );
          case 'Address':
            return (
              <AddressCreateOrUpdate {...props} />
            )
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
          case 'Order':
            return (
              <OrderView {...props} />
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
      <ModalHeader>{command} {name}</ModalHeader>
      <ModalBody>
        {renderBody()}
      </ModalBody>
    </Modal>
  );
}

MyModal.propTypes = {
  name: PropTypes.string,
  entity: PropTypes.string,
  command: PropTypes.string,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
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
  command: PropTypes.string,
  entity: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default DynamicModal;
