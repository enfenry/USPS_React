"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
import { MDBDataTable } from 'mdbreact';

const CustomersRender = ({ customers, handleUpdate, handleDelete, handleCreate }) => {

  function getTableBodyContent() {
    return customers.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <ModalButton command="View" name={obj.fullname} entity="Customer"
          initialValues={{ ...obj }}>View</ModalButton>
      );
      newObj["delete"] = (
        <ModalButton command="Update" name={obj.fullname} entity="Customer"
          initialValues={{ ...obj }} 
          onSubmit={(values) => handleUpdate(values, obj)}>Update</ModalButton>
      );
      newObj["update"] = (
        <ModalButton command="Delete" name={obj.fullname} entity="Customer"
          initialValues={{ ...obj }} 
          onSubmit={() => handleDelete(obj)}>Delete</ModalButton>
      );

      return newObj;
    });

  }
  let data = {
    columns: [
      {
        label: 'Name',
        field: 'fullname',
        sort: 'asc'
      },
      {
        label: 'Email',
        field: 'emailaddress1',
        sort: 'asc'
      },
      {
        label: '',
        field: 'view',
        sort: 'asc'
      },
      {
        label: '',
        field: 'delete',
        sort: 'asc'
      },
      {
        label: '',
        field: 'update',
        sort: 'asc'
      },

    ],
    rows: getTableBodyContent()


  }

  return (
    <React.Fragment>
      <h1>Customers</h1>
      <ModalButton command="Create" name={`Customer ${customers.length}`} entity="Customer"
        onSubmit={(values) => handleCreate(values)} >Create New Customer</ModalButton>
      <MDBDataTable
        striped
        bordered
        small
        responsive
        data={data}
      />
    </React.Fragment>
  );
}

CustomersRender.propTypes = {
  customers: PropTypes.array,
  handleCreate: PropTypes.func,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
};

export default CustomersRender;