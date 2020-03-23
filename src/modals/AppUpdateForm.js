import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

// const AppUpdateForm = (props) => {
//   // console.log('appUpdate props',props);
//   return (
//     <Form>
//       <FormGroup>
//         <Label for="appName">Name</Label>
//         <Input type="text" name="appName"
//           // id="appNameId"
//           placeholder={props.name} defaultValue={props.name} />
//       </FormGroup>
//       <FormGroup>
//         <Label for="appType">Select</Label>
//         <Input type="select" name="appType"
//           defaultValue={props.data.appTypeLabel}
//         // id="appTypeId"
//         >
//           <option value="Address Change">Address Change</option>
//           <option value="Package Submission">Package Submission</option>
//           <option value="Mail Forwarding">Mail Forwarding</option>
//         </Input>
//       </FormGroup>
//       <FormGroup>
//         <Label for="appType">Select</Label>
//         <Input type="select" name="appType"
//           defaultValue={props.data.appTypeLabel}
//         // id="appTypeId"
//         >
//           <option value="Address Change">Address Change</option>
//           <option value="Package Submission">Package Submission</option>
//           <option value="Mail Forwarding">Mail Forwarding</option>
//         </Input>
//       </FormGroup>
//       <Button color="primary" onClick={props.handleAction}>{props.label}</Button>
//     </Form>
//   );
// }

// export default AppUpdateForm;


let SignInForm = props => {
  const { handleSubmit } = props;
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

      <div className="field">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
      </div>

    </Form>
  );
};

const validate = val => {
  const errors = {};
  
  if (!val.appName) {
    console.log('App Name is required');
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

SignInForm = reduxForm({
  form: 'signIn',
  validate,
})(SignInForm);

export default SignInForm;