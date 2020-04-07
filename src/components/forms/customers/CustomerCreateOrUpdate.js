import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from './CustomerValidate';

let CustomerCreateOrUpdate = props => {
  const { handleSubmit, handleHide, addresses, initialValues } = props;

  const displayById = (array, key, value, display) => {
    let filtered = array.filter(el => el[key] === value);
    return filtered.length ? filtered[0][display] : 'None';
  }

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormGroup className="field">
        <div className="control">
          <Field name="firstname" component={renderField} type="text" label="First Name" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="lastname" component={renderField} type="text" label="Last Name" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="emailaddress1" component={renderField} type="text" label="Email" />
        </div>
      </FormGroup>

      <div>
        <div>
          <span>Address Name: </span>
          <p>{displayById(addresses, "ss_customaddressid", initialValues._ss_contactcustomaddress_value, "ss_name")}</p>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <Button className="button is-link" color="success" onClick={handleSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={handleHide}>Cancel</Button>
        </div>
      </div>
    </Form>
  );
};

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

CustomerCreateOrUpdate.propTypes = {
  handleSubmit: PropTypes.func,
  handleHide: PropTypes.func,
  initialValues: PropTypes.object,
  addresses: PropTypes.arrayOf(PropTypes.object),
  appTypeValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

CustomerCreateOrUpdate = reduxForm({
  form: 'CustomerCreateOrUpdate',
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    props.handleHide();
  }
})(CustomerCreateOrUpdate);


function mapStateToProps(state) {
  return {
    addresses: state.addressesReducer.addresses
  }
}

export default connect(
  mapStateToProps
)(CustomerCreateOrUpdate);
