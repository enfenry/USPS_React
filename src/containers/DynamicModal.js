import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Button, Modal } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connectModal } from 'redux-modal'

class MyModal extends Component {
  static propTypes = {
    message: PropTypes.string,
    handleHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };

  render() {
    const { show, handleHide, message } = this.props

    return (
      <Modal isOpen={show}
      // backdrop={true}
      >
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>Close</Button>
          <Button color="secondary" onClick={this.handleClose}>Save Changes</Button>
        </ModalFooter>
      </Modal>

    );
  }
}

export default class DynamicModal extends Component {
  static propTypes = {
    name: PropTypes.string,
  };
  render() {
    const { name } = this.props
    const WrappedMyModal = connectModal({ name })(MyModal)
    return <WrappedMyModal />
  }
}
