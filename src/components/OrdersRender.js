"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
import { MDBDataTable } from 'mdbreact';

const OrdersRender = ({ orders, handleUpdate, handleDelete, handleCreate }) => {

  function getAppBodyContent() {
    return orders.map(obj => {
      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))
      const appTypeLabel = getOrderTypeName(obj.salesorderid);

      newObj["view"] = (
        <ModalButton CRUDOption="View" label="View" name={obj.ss_name} entity="Order" 
        initialValues={{ ...obj, appTypeLabel: appTypeLabel }}  />
      );
      // newObj["delete"] = (
        // <ModalButton CRUDOption="Update" label="Update" name={obj.ss_name} entity="Application" 
        // initialValues={{ ...obj, appTypeLabel: appTypeLabel }}  onSubmit={(values) => handleUpdate(values, obj)} />
      // );
      newObj["update"] = (
        <ModalButton CRUDOption="Delete" label="Delete" name={obj.ss_name} entity="Application" 
        initialValues={{ ...obj, appTypeLabel: appTypeLabel }}  onSubmit={() => handleDelete(obj)} />
      );

      newObj["appTypeLabel"] = appTypeLabel;
      return newObj;
    });
  }

  let data = {
    columns: [
      {
        label: 'ID',
        field: 'salesorderid',
        sort: 'asc',
        width: 150
      },
      {
        label: 'destination',
        field: 'shipto_composite',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Parent Application',
        field: 'ss_application',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Created On',
        field: 'createdon',
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
    rows: getAppBodyContent()


  }
  return (
    <div>
      <h1>Order</h1>
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