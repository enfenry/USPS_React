import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from './CustomerValidate';
import renderField from '../renderField';

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

CustomerCreateOrUpdate.propTypes = {
  handleSubmit: PropTypes.func,
  handleHide: PropTypes.func,
  initialValues: PropTypes.object,
  addresses: PropTypes.arrayOf(PropTypes.object),
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
