import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

let AppUpdate = props => {
  const { handleSubmit, handleHide, name, data, appTypeValue, customers, addresses, products } = props;
  const isPackageSubmission = (appTypeValue || data.appTypeLabel) === 'Package Submission';
  const isMailForwarding = (appTypeValue || data.appTypeLabel) === 'Mail Forwarding';
  const isAddressChange = (appTypeValue || data.appTypeLabel) === 'Address Change';

  const shippingSpeeds = products.filter(product => product.hierarchypath === "USPS\\Shipping Speed");

  const renderOptions = (array, value, display) => {
    return array.map(el => {
      return (
        <option key={el[value]} value={el[value]}>{el[display]}</option>
      )
    })
  }

  const filterProducts = () => {
    let filterProducts = products;
    if (isPackageSubmission) {
      filterProducts = products.filter(product => product.hierarchypath === "USPS\\Package Submission");
    }
    else if (isMailForwarding) {
      filterProducts = products.filter(product => product.hierarchypath === "USPS\\Mail Forwarding");
    }
    else if (isAddressChange) {
      filterProducts = products.filter(product => product.hierarchypath === "USPS\\Address Change");
    }
    return filterProducts;
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
          <Field name="ss_applicationtype" component={renderField} type="select"
            label="Application Type" defaultValue={data.appTypeLabel}>
            <option value="Address Change">Address Change</option>
            <option value="Package Submission">Package Submission</option>
            <option value="Mail Forwarding">Mail Forwarding</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_product_value" component={renderField} type="select"
            label="Product" defaultValue={data._ss_product_value}>
            <option value={null}></option>
            {renderOptions(filterProducts(), "productid", "name")}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field show={isPackageSubmission} name="_ss_shippingspeed_value" component={renderField} type="select"
            label="Shipping Speed" defaultValue={data._ss_shippingspeed_value}>
            <option value={null}></option>
            {renderOptions(shippingSpeeds, "productid", "name")}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_customer_value" component={renderField} type="select"
            label="Customer" defaultValue={data._ss_customer_value}>
            {renderOptions(customers, "contactid", "fullname")}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_destinationaddress_value" component={renderField} type="select"
            label="Destination Address" defaultValue={data._ss_destinationaddress_value}>
            {renderOptions(addresses, "ss_customaddressid", "ss_name")}
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
    errors.ss_name = 'Required';
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
  addresses: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
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
    addresses: state.addressesReducer.addresses,
    products: state.productsReducer.products,
  }
}

export default connect(
  mapStateToProps
)(AppUpdate);