"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
import { MDBDataTable } from 'mdbreact';



const ApplicationsRender = ({ applications, handleUpdate, handleDelete, handleCreate, handleAppToOrder }) => {

  console.log('applications',applications);

  function getAppBodyContent() {
    return applications.map(obj => {
      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <ModalButton command="View" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj }}>View</ModalButton>
      );
      newObj["update"] = (
        <ModalButton command="Update" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj }} 
          onSubmit={(values) => handleUpdate(values, obj)}>Update</ModalButton>
      );
      newObj["delete"] = (
        <ModalButton command="Delete" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj }} 
          onSubmit={() => handleDelete(obj)}>Delete</ModalButton>
      );

      newObj["toOrder"] = (
        <ModalButton command="Place Order" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj }} 
          onSubmit={() => handleAppToOrder(obj)}>Place Order</ModalButton>
      );

      return newObj;
    });
  }

  let data = {
    columns: [
      {
        label: 'App Name',
        field: 'ss_name',
        sort: 'asc'
      },
      {
        label: 'Type',
        field: 'ss_applicationtype@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
      {
        label: 'Created On',
        field: 'createdon',
        sort: 'asc'
      },
      {
        label: '',
        field: 'view',
        sort: 'asc'
      },
      {
        label: '',
        field: 'toOrder',
        sort: 'asc'
      },
      {
        label: '',
        field: 'update',
        sort: 'asc'
      },
      {
        label: '',
        field: 'delete',
        sort: 'asc'
      }

    ],
    rows: getAppBodyContent()


  }
  return (
    <div>
      <h1>Applications</h1>
      <ModalButton command="Create" name={`Application ${applications.length}`} entity="Application"
        initialValues={{ ss_name: `Application ${applications.length}` }} 
        onSubmit={(values) => handleCreate(values)}>Create New Application</ModalButton>
      <MDBDataTable  
        striped
        bordered
        small
        responsive
        data={data}
      />
    </div>
  );
}

ApplicationsRender.propTypes = {
  applications: PropTypes.array,
  handleCreate: PropTypes.func,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAppToOrder: PropTypes.func
};

export default ApplicationsRender;