"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
//import InfiniteScroll from 'react-infinite-scroll-component';
import { MDBDataTable } from 'mdbreact';
//import {CustomersContainer} from './CustomersContainer';


const CustomersRender = ({ customers, handleView, handleUpdate, handleDelete, handleAdd }) => {
    function getTableBodyContent() {
        let tableData = customers;
    
        tableData.forEach(obj => {
          obj["view"] = (
            <input
              type="button"
              value="view"
              onClick={() => handleView(obj)}
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
    handleView: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func,
    handleAdd: PropTypes.func,
};

export default CustomersRender;