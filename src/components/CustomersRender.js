"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
//import InfiniteScroll from 'react-infinite-scroll-component'; 
import { MDBDataTable } from 'mdbreact';
//import {CustomersContainer} from './CustomersContainer';


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
        label: 'ID',
        field: 'contactid',
        sort: 'asc',
        width: 150
      },

      {
        label: 'Name',
        field: 'fullname',
        sort: 'asc',
        width: 150
      },
      {
        label: '',
        field: 'view',
        sort: 'asc',
        width: 150
      },
      {
        label: '',
        field: 'delete',
        sort: 'asc',
        width: 150
      },
      {
        label: '',
        field: 'update',
        sort: 'asc',
        width: 150
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