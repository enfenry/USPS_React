import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connectModal } from 'redux-modal'

class MyModal extends Component {

  static propTypes = {
    name: PropTypes.string,
    entity: PropTypes.object,
    label: PropTypes.string,
    handleHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };


  render() {
    const { show, handleHide } = this.props

    return (
      <Modal isOpen={show}
      // backdrop={true}
      >
        <ModalHeader>{this.props.label} {this.props.name}</ModalHeader>
        <ModalBody>
          {this.props.children}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleClose}>{this.props.label}</Button>
          <Button color="secondary" onClick={handleHide}>Cancel</Button>
        </ModalFooter>
      </Modal>

    );
  }
}

export default class DynamicModal extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    entity: PropTypes.object
  };

  componentDidMount() {
    console.log('DynamicModal props', this.props)
  }

  render() {
    const { name } = this.props
    const WrappedMyModal = connectModal({ name })(MyModal)
    return (
      <WrappedMyModal>
        {this.props.children}
      </WrappedMyModal>
    )
  }
}
