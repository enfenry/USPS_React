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
        <ModalButton CRUDOption="View" label="View" name={obj.fullname} entity="Customer"
          initialValues={{ ...obj }} />
      );
      newObj["delete"] = (
        <ModalButton CRUDOption="Update" label="Update" name={obj.fullname} entity="Customer"
          initialValues={{ ...obj }} onSubmit={(values) => handleUpdate(values, obj)} />
      );
      newObj["update"] = (
        <ModalButton CRUDOption="Delete" label="Delete" name={obj.fullname} entity="Customer"
          initialValues={{ ...obj }} onSubmit={() => handleDelete(obj)} />
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
      <ModalButton CRUDOption="Create" label="Create New Customer" name={`Customer ${customers.length}`} entity="Customer"
        onSubmit={(values) => handleCreate(values)} />
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