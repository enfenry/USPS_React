import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Button } from 'reactstrap'
import DynamicModal from './DynamicModal'
import PropTypes from 'prop-types';

class ModalContainer extends Component {
  static propTypes = {
    show: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    entity: PropTypes.object
  };

  handleOpen = name => () => {
    this.props.show(name, this.props)
  };

  handleButtonStyle = label => {
    switch (label) {
      case 'Update':
        return 'btn btn-primary';
      case 'Delete':
        return 'btn btn-danger';
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <p>
          <Button className={this.handleButtonStyle(this.props.label)} onClick={this.handleOpen("dynamic")}>{this.props.label}</Button>
          <DynamicModal name="dynamic">
            Content to be rendered here.
            </DynamicModal>
        </p>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ModalContainer)