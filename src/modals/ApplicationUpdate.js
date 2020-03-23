import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const ApplicationUpdate = (props) => {
// console.log('appUpdate props',props);
  return (
    <Form>
      <FormGroup>
        <Label for="appName">Name</Label>
        <Input type="text" name="appName" 
        // id="appNameId"
         placeholder={props.name} defaultValue={props.name}/>
      </FormGroup>
      <FormGroup>
        <Label for="appType">Select</Label>
        <Input type="select" name="appType" 
        defaultValue={props.data.appTypeLabel}
        // id="appTypeId"
        >
          <option value="Address Change">Address Change</option>
          <option value="Package Submission">Package Submission</option>
          <option value="Mail Forwarding">Mail Forwarding</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="appType">Select</Label>
        <Input type="select" name="appType" 
        defaultValue={props.data.appTypeLabel}
        // id="appTypeId"
        >
          <option value="Address Change">Address Change</option>
          <option value="Package Submission">Package Submission</option>
          <option value="Mail Forwarding">Mail Forwarding</option>
        </Input>
      </FormGroup>
      <Button color="primary" onClick={props.handleAction}>{props.label}</Button>
    </Form>
  );
}

export default ApplicationUpdate;