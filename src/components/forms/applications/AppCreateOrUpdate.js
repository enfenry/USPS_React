import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ADDRESS_CHANGE, MAIL_FORWARDING, PACKAGE_SUBMISSION } from '../../../constants/applicationTypes';
import validate from './AppValidate';
import { renderField } from '../formUtils';

 function getApplicationTypeName(applicationType) {
  switch (applicationType) {
    case ADDRESS_CHANGE:
      return "Address Change";
    case MAIL_FORWARDING:
      return "Mail Forwarding";
    case PACKAGE_SUBMISSION:
      return "Package Submission";
    default:
      return applicationType;
  }
}

let AppCreateOrUpdate = props => {
  const { handleSubmit, handleHide, appTypeValue, customers, addresses, products } = props;

  const isPackageSubmission = parseInt(appTypeValue) === PACKAGE_SUBMISSION;
  const shippingSpeeds = products.filter(product => product.hierarchypath === "USPS\\Shipping Speed");

  const renderOptions = (array, value, display) => {
    return array.map(el => {
      return (
        <option key={el[value]} value={el[value]}>{el[display]}</option>
      )
    })
  }

  const filterProducts = () => {
    return products.filter(product => product.hierarchypath === `USPS\\${(getApplicationTypeName(parseInt(appTypeValue)))}`);
  }

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormGroup className="field">
        <div className="control">
          <Field name="ss_name" component={renderField} type="text" label="Name" />
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="ss_applicationtype" component={renderField} type="select"
            label="Application Type">
            <option value={null}></option>
            <option value={ADDRESS_CHANGE}>Address Change</option>
            <option value={MAIL_FORWARDING}>Mail Forwarding</option>
            <option value={PACKAGE_SUBMISSION}>Package Submission</option>
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_product_value" component={renderField} type="select"
            label="Product">
            <option value={null}></option>
            {renderOptions(filterProducts(), "productid", "name")}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field show={isPackageSubmission} name="_ss_shippingspeed_value" component={renderField} type="select"
            label="Shipping Speed">
            <option value={null}></option>
            {renderOptions(shippingSpeeds, "productid", "name")}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_customer_value" component={renderField} type="select"
            label="Customer">
            <option value={null}></option>
            {renderOptions(customers, "contactid", "fullname")}
          </Field>
        </div>
      </FormGroup>

      <FormGroup className="field">
        <div className="control">
          <Field name="_ss_destinationaddress_value" component={renderField} type="select"
            label="Destination Address" >
            <option value={null}></option>
            {renderOptions(addresses, "ss_customaddressid", "ss_name")}
          </Field>
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

AppCreateOrUpdate.propTypes = {
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

AppCreateOrUpdate = reduxForm({
  form: 'AppCreateOrUpdate',
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    props.handleHide();
  }
})(AppCreateOrUpdate);

function mapStateToProps(state) {
  const selector = formValueSelector('AppCreateOrUpdate');
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
)(AppCreateOrUpdate);