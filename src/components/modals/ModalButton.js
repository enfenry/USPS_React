import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalButton = (props) => {
  const {command, children} = props;

  function handleOpen () {
      props.show("dynamic", props);
  }

  function handleButtonStyle (command) {
    switch (command) {
      case 'Create':
        return 'primary'
      case 'View':
        return 'secondary';
      case 'Update':
        return 'success';
      case 'Delete':
        return 'danger';
      case 'Place Order':
        return 'primary';
      default:
        break;
    }
  }

    return (
      <div>
        <p>
          <Button color={handleButtonStyle(command)}
           onClick={() => handleOpen()}>{children}</Button>
        </p>
      </div>
    )
}

ModalButton.propTypes = {
  show: PropTypes.func,
  name: PropTypes.string,
  command: PropTypes.string,
  entity: PropTypes.string,
  initialValues: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ModalButton)