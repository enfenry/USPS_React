import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from './OrderValidate';
import { renderField, displayById } from '../formUtils';

let OrderCreateOrUpdate = props => {
  const { handleSubmit, handleHide, initialValues, 
    // customers, 
    addresses, applications } = props;

  const renderOptions = (array, value, display) => {
    return array.map(el => {
      return (
        <option key={el[value]} value={el[value]}>{el[display]}</option>
      )
    })
  }

  return (
    <Form onSubmit={handleSubmit} className="form">
      <div>
        <span>Order Number: </span>
        <p>{name}</p>
      </div>
      <div>
        <span>Parent Application: </span>
        <p>{displayById(applications, "ss_applicationid", initialValues._ss_application_value, "ss_name")}</p>
      </div>
      <div>
        <span>Total Amount: </span>
        <p>{`$${initialValues['totalamount']}`}</p>
      </div>

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

OrderCreateOrUpdate.propTypes = {
  handleSubmit: PropTypes.func,
  handleHide: PropTypes.func,
  initialValues: PropTypes.object,
  customers: PropTypes.arrayOf(PropTypes.object),
  addresses: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  applications: PropTypes.arrayOf(PropTypes.object),
  appTypeValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

OrderCreateOrUpdate = reduxForm({
  form: 'OrderCreateOrUpdate',
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    props.handleHide();
  }
})(OrderCreateOrUpdate);

function mapStateToProps(state) {
  const selector = formValueSelector('OrderCreateOrUpdate');
  const appTypeValue = selector(state, 'ss_applicationtype')

  return {
    appTypeValue,
    applications: state.applicationsReducer.applications,
    customers: state.customersReducer.customers,
    addresses: state.addressesReducer.addresses,
    products: state.productsReducer.products,
  }
}

export default connect(
  mapStateToProps
)(OrderCreateOrUpdate);