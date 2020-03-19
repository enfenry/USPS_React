import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Button } from 'reactstrap'
import DynamicModal from './DynamicModal'
import PropTypes from 'prop-types';

const ModalContainer = (props) => {

  function handleOpen (name) {
      props.show(name, props);
  }

  function handleButtonStyle (label) {
    switch (label) {
      case 'Update':
        return 'btn btn-primary';
      case 'Delete':
        return 'btn btn-danger';
      default:
        break;
    }
  }

    return (
      <div>
        <p>
          <Button className={handleButtonStyle(props.label)} onClick={() => handleOpen("dynamic")}>{props.label}</Button>
          <DynamicModal name="dynamic">
            Content to be rendered here.
            </DynamicModal>
        </p>
      </div>
    )
}

ModalContainer.propTypes = {
  show: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  entity: PropTypes.object
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ModalContainer)