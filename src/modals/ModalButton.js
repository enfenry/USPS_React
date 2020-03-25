import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalButton = (props) => {

  function handleOpen (name) {
    let newProps = {...props, name: props.data.ss_name};
      props.show(name, newProps);
  }

  function handleButtonStyle (label) {
    switch (label) {
      case 'Select':
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
          <Button className={'btn ' + handleButtonStyle(props.label)}
           onClick={() => handleOpen("dynamic")}>{props.label}</Button>
        </p>
      </div>
    )
}

ModalButton.propTypes = {
  show: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  entity: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ModalButton)