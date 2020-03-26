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
    
        tableData.forEach(obj => {
          obj["select"] = (
            <input
              type="button"
              value="select"
              onClick={() => handleSelect(obj)}
            />
          );
          obj["delete"] = (
            <input
              type="button"
              value="delete"
              onClick={() => handleDelete(obj)}
            />
          );
          obj["update"] = (
            <input
              type="button"
              value="update"
              onClick={() => handleUpdate(obj)}
            />
          );
        });
    
        return tableData;
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
                label: 'Email',
                field: 'emailaddress1',
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
            <Button color="primary" onClick={handleAdd}>Add New Customer</Button>
            <MDBDataTable
            striped
            bordered
            small
            data={data}
          />
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