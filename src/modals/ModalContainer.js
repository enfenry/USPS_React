import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Button } from 'reactstrap'
import DynamicModal from './DynamicModal'
import PropTypes from 'prop-types';

const ModalContainer = (props) => {
  // console.log('modalcontainer props', props);
  function handleOpen (name) {
    let newProps = {...props, name: props.data.ss_name};
    // console.log('newProps at handleOpen', newProps);
      props.show(name, newProps);
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
          <Button className={handleButtonStyle(props.label)} onClick={() => handleOpen(props.data.ss_name)}>{props.label}</Button>
          <DynamicModal name={props.data.ss_name} />
        </p>
      </div>
    )
}

ModalContainer.propTypes = {
  show: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  entity: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ModalContainer)