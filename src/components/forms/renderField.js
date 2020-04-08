import React from 'react';
import { Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const renderField = (props) => {
    const { input, label, type, show, meta: { touched, error, warning } } = props;
  
    return (
      <div style={{ display: show ? 'block' : 'none' }} >
        <div className="control">
          <Label className="field">{label}</Label>
          <Input className="input" {...input} type={type}>
            {props.children}
          </Input>
          {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span style={{ color: 'orange' }}>{warning}</span>))}
        </div>
      </div>
    )
  }
  
  renderField.defaultProps = {
    show: true
  }
  
  renderField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    show: PropTypes.bool,
    meta: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

export default renderField;