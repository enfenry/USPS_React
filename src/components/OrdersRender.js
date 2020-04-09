"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
import { MDBDataTable } from 'mdbreact';

const OrdersRender = ({ orders, handleUpdate, handleDelete}) => {

  function getAppBodyContent() {
    return orders.map(obj => {
      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <ModalButton command="View" name={obj.ordernumber} entity="Order" 
        initialValues={{ ...obj}}>View</ModalButton>
      );
      newObj["delete"] = (
        <ModalButton command="Update" name={obj.ordernumber} entity="Application" 
        initialValues={{ ...obj }}  
        onSubmit={(values) => handleUpdate(values, obj)}>Update</ModalButton>
      );
      newObj["update"] = (
        <ModalButton command="Delete" name={obj.ordernumber} entity="Application" 
        initialValues={{ ...obj }}  
        onSubmit={() => handleDelete(obj)}>Delete</ModalButton>
      );

      return newObj;
    });
  }

  let data = {
    columns: [
      {
        label: 'Order Number',
        field: 'ordernumber',
        sort: 'asc'
      },
      {
        label: 'Destination',
        field: '_ss_destinationaddress_value',
        sort: 'asc'
      },
      {
        label: 'Parent Application',
        field: '_ss_application_value',
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
        field: 'delete',
        sort: 'asc'
      },
      {
        label: '',
        field: 'update',
        sort: 'asc'
      },

    ],
    rows: getAppBodyContent()


  }
  return (
    <div>
      <h1>Orders</h1>
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

OrdersRender.propTypes = {
  orders: PropTypes.array,
  handleCreate: PropTypes.func,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
};

export default OrdersRender;