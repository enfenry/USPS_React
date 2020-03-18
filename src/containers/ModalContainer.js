import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Button } from 'react-bootstrap'
import DynamicModal from './DynamicModal'
import PropTypes from 'prop-types';

class ModalContainer extends Component {
  static propTypes = {
    show: PropTypes.func
  };

  handleOpen = name => () => {
    this.props.show(name, { message: `This is a ${name} modal` })
  };

  render() {
    return (
      <div>
        <p>
          <Button bsStyle="primary" onClick={this.handleOpen('dynamic')}>Launch dynamic modal</Button>
          <DynamicModal name="dynamic" />
        </p>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ModalContainer)

