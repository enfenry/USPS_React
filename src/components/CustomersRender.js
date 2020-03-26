"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
//import InfiniteScroll from 'react-infinite-scroll-component';
import { MDBDataTable } from 'mdbreact';
//import {CustomersContainer} from './CustomersContainer';


const CustomersRender = ({ customers, handleSelect, handleUpdate, handleDelete, handleAdd }) => {
  function getTableBodyContent() {
    let tableData = customers;

    return tableData.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["select"] = (
        <input
          type="button"
          value="select"
          onClick={() => handleSelect(obj)}
        />
      );
      newObj["delete"] = (
        <input
          type="button"
          value="delete"
          onClick={() => handleDelete(obj)}
        />
      );
      newObj["update"] = (
        <input
          type="button"
          value="update"
          onClick={() => handleUpdate(obj)}
        />
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
        field: 'select',
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
    <div>
      <h1>Customers</h1>
      <MDBDataTable
        striped
        bordered
        small
        data={data}
      />
      <Button color="primary" onClick={handleAdd}>Add</Button>
    </div>
  );
}



CustomersRender.propTypes = {
  customers: PropTypes.array,
  handleSelect: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAdd: PropTypes.func,
};

export default CustomersRender;