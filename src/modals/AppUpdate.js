import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types'

let AppUpdate = props => {
  const { handleSubmit } = props;

  console.log('AppUpdate props', props);
  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormGroup className="field">
        <div className="control">
          <Field name="appName" component={renderField} type="text" label="Name" defaultValue={props.name} />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="appType" component={renderField} type="select"
            label="Application Type" defaultValue={props.data.appTypeLabel}>
            <option value="Address Change">Address Change</option>
            <option value="Package Submission">Package Submission</option>
            <option value="Mail Forwarding">Mail Forwarding</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="product" component={renderField} type="select"
            label="Product" defaultValue={props.data._ss_product_value}>
            {/* Package Submission Products */}
            <option value="EnvelopeFlatRate">Envelope (Flat Rate)</option>
            <option value="SmallBoxFlatRate">Small Box (Flat Rate)</option>
            <option value="MediumBoxFlatRate">Medium Box (Flat Rate)</option>
            <option value="LargeBoxFlatRate">Large Box (Flat Rate)</option>
            <option value="CalculatedVolume">Calculated Volume</option>

            {/* Forward Duration Products */}
            <option value="1Year">1 Year</option>
            <option value="2Years">2 Years</option>

            {/* Change Address Products */}
            <option value="ChangeAddress">Change Address</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="shippingSpeed" component={renderField} type="select"
            label="Shipping Speed" defaultValue={props.data._ss_shippingspeed_value}>
            {/* Shipping Speed Products */}
            <option value="StandardShipping">Standard Shipping</option>
            <option value="PriorityMail">Priority Mail</option>
            <option value="PriorityMailExpress">Priority Mail Express</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="customer" component={renderField} type="select"
            label="Customer" defaultValue={props.data._ss_customer_value}>
            {/* Need to pull data at some point to create options for each Address */}
            <option value="ExampleCustomer1">Example Customer 1</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="destinationAddress" component={renderField} type="select"
            label="Destination Address" defaultValue={props.data._ss_destinationaddress_value}>
            {/* Need to pull data at some point to create options for each Address */}
            <option value="ExampleAddress1">Example Address 1</option>
          </Field>
        </div>
      </FormGroup>


      <div className="field">
        <div className="control">
          <Button className="button is-link" color="success">Submit</Button>{' '}
          <Button color="secondary" onClick={props.handleHide}>Cancel</Button>
        </div>
      </div>
    </Form>
  );
};

const validate = val => {
  const errors = {};

  if (!val.appName) {
    errors.firstName = 'Required';
  }
  return errors;
};

const renderField = (props) => {

  const { input, label, type, defaultValue, meta: { touched, error, warning } } = props;

  // Necessary due to Field component from redux-form (conflicts with defaultValue being set)
  delete input.value;

  function checkType(type) {
    if (type === "select") {
      return (
        <Input className="input" {...input} type={type} defaultValue={defaultValue}>
          {props.children}
        </Input>
      )
    }
    else {
      return (
        <Input className="input" {...input} placeholder={label} type={type} defaultValue={defaultValue} />
      )
    }
  }

  return (
    <div>
      <div className="control">
        <Label className="field">{label}</Label>
        {checkType(type)}
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

AppUpdate.propTypes = {
  handleSubmit: PropTypes.func,
  handleHide: PropTypes.func,
  name: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

AppUpdate = reduxForm({
  form: 'appUpdate',
  validate,
})(AppUpdate);

export default AppUpdate;

