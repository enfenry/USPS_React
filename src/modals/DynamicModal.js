import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connectModal } from 'redux-modal'

const MyModal = (props) => {
  return (
    <Modal isOpen={props.show}
    // backdrop={true}
    >
      <ModalHeader>{props.label} {name}</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.handleAction}>{props.label}</Button>
        <Button color="secondary" onClick={props.handleHide}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

MyModal.propTypes = {
  name: PropTypes.string,
  entity: PropTypes.object,
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
  // useEffect(() => {
  //   console.log('DynamicModal props', this.props)
  // })

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
  entity: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default DynamicModal;
