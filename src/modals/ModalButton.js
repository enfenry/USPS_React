import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalButton = (props) => {
  const {label} = props;

  function handleOpen () {
      props.show("dynamic", props);
  }

  function handleButtonStyle (label) {
    switch (label) {
      case 'Add':
        return 'btn-primary'
      case 'View':
        return 'btn-secondary';
      case 'Update':
        return 'btn-success';
      case 'Delete':
        return 'btn-danger';
      default:
        break;
    }
  }

    return (
      <div>
        <p>
          <Button className={'btn ' + handleButtonStyle(label)}
           onClick={() => handleOpen()}>{label}</Button>
        </p>
      </div>
    )
}

ModalButton.propTypes = {
  show: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
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