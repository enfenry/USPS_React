"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import ModalButton from './modals/ModalButton';
import { MDBDataTable } from 'mdbreact';
import { displayById } from './forms/formUtils';

const OrdersRender = ({ orders, applications, customers, addresses, handleUpdate, handleDelete, handleRefresh}) => {

  function getAppBodyContent() {
    return orders.map(obj => {
      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["displayApplication"] = displayById(applications, "ss_applicationid", obj._ss_application_value, "ss_name");
      newObj["displayCustomer"] = displayById(customers, "contactid", obj._customerid_value, "fullname");
      newObj["displayDestination"] = displayById(addresses, "ss_customaddressid", obj._ss_destinationaddress_value, "ss_name");

      newObj["view"] = (
        <ModalButton command="View" name={obj.ordernumber} entity="Order" 
        initialValues={{ ...obj}}>View</ModalButton>
      );
      newObj["delete"] = (
        <ModalButton command="Update" name={obj.ordernumber} entity="Order" 
        initialValues={{ ...obj }}  
        onSubmit={(values) => handleUpdate(values, obj)}>Update</ModalButton>
      );
      newObj["update"] = (
        <ModalButton command="Delete" name={obj.ordernumber} entity="Order" 
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
        field: 'displayDestination',
        sort: 'asc'
      },
      {
        label: 'Customer',
        field: 'displayCustomer',
        sort: 'asc'
      },
      {
        label: 'Total Amount',
        field: 'totalamount',
        sort: 'asc'
      },
      {
        label: 'Parent Application',
        field: 'displayApplication',
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
      <Button color='info' onClick={() => handleRefresh()}>Refresh Data</Button>
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
  applications: PropTypes.array,
  customers: PropTypes.array,
  addresses: PropTypes.array,
  handleCreate: PropTypes.func,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleRefresh: PropTypes.func
};

export default OrdersRender;