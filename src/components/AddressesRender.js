"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
//import InfiniteScroll from 'react-infinite-scroll-component';
import { MDBDataTable } from 'mdbreact';
//import {CustomersContainer} from './CustomersContainer';


const AddressesRender = ({ addresses, handleUpdate, handleDelete, handleCreate }) => {

  function getTableBodyContent() {
    return addresses.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <ModalButton command="View" name={obj.ss_name} entity="Address"
          initialValues={{ ...obj }}>View</ModalButton>
      );
      newObj["delete"] = (
        <ModalButton command="Update" name={obj.ss_name} entity="Address"
          initialValues={{ ...obj }} 
          onSubmit={(values) => handleUpdate(values, obj)}>Update</ModalButton>
      );
      newObj["update"] = (
        <ModalButton command="Delete" name={obj.ss_name} entity="Address"
          initialValues={{ ...obj }} 
          onSubmit={() => handleDelete(obj)} >Delete</ModalButton>
      );

      return newObj;
    });

  }
  let data = {
    columns: [
      {
        label: 'Name',
        field: 'ss_name',
        sort: 'asc'
      },
      {
        label: 'Line 1',
        field: 'ss_line1',
        sort: 'asc'
      },
      {
        label: 'Line 2',
        field: 'ss_line2',
        sort: 'asc'
      },
      {
        label: 'Line 3',
        field: 'ss_line3',
        sort: 'asc'
      },
      {
        label: 'City',
        field: 'ss_city',
        sort: 'asc'
      },
      {
        label: 'State',
        field: 'ss_state',
        sort: 'asc'
      },
      {
        label: 'Country',
        field: 'ss_country',
        sort: 'asc'
      },
      {
        label: 'Postal Code',
        field: 'ss_postalcode',
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
      <h1>Addresses</h1>
      <ModalButton command="Create" name={`Address ${addresses.length}`} entity="Address"
        onSubmit={(values) => handleCreate(values)}>Create New Address</ModalButton>
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

AddressesRender.propTypes = {
  addresses: PropTypes.array,
  handleCreate: PropTypes.func,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
};

export default AddressesRender;