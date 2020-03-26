import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

let AppUpdate = props => {
  const { handleSubmit, handleHide, name, data, appTypeValue, customers } = props;
  const showPackageFields = (appTypeValue || data.appTypeLabel) === 'Package Submission';
  
  const renderCustomerOptions = customers => {
    return customers.map(customer => {
      return (
        <option key={customer.contactid} value={customer.contactid}>{customer.fullname}</option>
      )
    })
  }

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormGroup className="field">
        <div className="control">
          <Field name="ss_name" component={renderField} type="text" label="Name" defaultValue={name} />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_applicationtype" component={renderField} type="view"
            label="Application Type" defaultValue={data.appTypeLabel}>
            <option value="Address Change">Address Change</option>
            <option value="Package Submission">Package Submission</option>
            <option value="Mail Forwarding">Mail Forwarding</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_product_value" component={renderField} type="view"
            label="Product" defaultValue={data._ss_product_value}>
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
          <Field show={showPackageFields} name="_ss_shippingspeed_value" component={renderField} type="view"
            label="Shipping Speed" defaultValue={data._ss_shippingspeed_value}>
            {/* Shipping Speed Products */}
            <option value="StandardShipping">Standard Shipping</option>
            <option value="PriorityMail">Priority Mail</option>
            <option value="PriorityMailExpress">Priority Mail Express</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_customer_value" component={renderField} type="view"
            label="Customer" defaultValue={data._ss_customer_value}>
            {renderCustomerOptions(customers)}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_destinationaddress_value" component={renderField} type="view"
            label="Destination Address" defaultValue={data._ss_destinationaddress_value}>
            {/* Need to pull data at some point to create options for each Address */}
            <option value="ExampleAddress1">Example Address 1</option>
          </Field>
        </div>
      </FormGroup>


      <div className="field">
        <div className="control">
          <Button className="button is-link" color="success" onClick={handleHide}>Submit</Button>{' '}
          <Button color="secondary" onClick={handleHide}>Cancel</Button>
        </div>
      </div>
    </Form>
  );
};

const validate = val => {
  const errors = {};

  if (!val.ss_name) {
    errors.firstName = 'Required';
  }
  return errors;
};

const renderField = (props) => {

  const { input, label, type, defaultValue, show, meta: { touched, error, warning } } = props;

  // Necessary due to Field component from redux-form (conflicts with defaultValue being set)
  delete input.value;

  return (
    <div style={{ display: show ? 'block' : 'none' }} >
      <div className="control">
        <Label className="field">{label}</Label>
        <Input className="input" {...input} type={type} defaultValue={defaultValue}>
          {props.children}
        </Input>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
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
  customers: PropTypes.arrayOf(PropTypes.object),
  appTypeValue: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

AppUpdate = reduxForm({
  form: 'appUpdate',
  validate,
})(AppUpdate);

function mapStateToProps(state) {
  const selector = formValueSelector('appUpdate');
  const appTypeValue = selector(state, 'ss_applicationtype')

  return {
    appTypeValue,
    customers: state.customersReducer.customers,
  }
}

export default connect(
  mapStateToProps
)(AppUpdate);