import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from './AddressValidate';

let AddressCreateOrUpdate = props => {
  const { handleSubmit, handleHide } = props;

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormGroup className="field">
        <div className="control">
          <Field name="ss_name" component={renderField} type="text" label="Name" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_line1" component={renderField} type="text" label="Line 1" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_line2" component={renderField} type="text" label="Line 2" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_line3" component={renderField} type="text" label="Line 3" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_city" component={renderField} type="text" label="City" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_state" component={renderField} type="text" label="State" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_country" component={renderField} type="text" label="Country" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_postalcode" component={renderField} type="text" label="Postal Code" />
        </div>
      </FormGroup>

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

AddressCreateOrUpdate.propTypes = {
  handleSubmit: PropTypes.func,
  handleHide: PropTypes.func,
  initialValues: PropTypes.object,
  customers: PropTypes.arrayOf(PropTypes.object),
  addresses: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  appTypeValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

AddressCreateOrUpdate = reduxForm({
  form: 'AddressCreateOrUpdate',
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    props.handleHide();
  }
})(AddressCreateOrUpdate);

export default connect()(AddressCreateOrUpdate);