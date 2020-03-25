"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ModalButton from '../modals/ModalButton';
// import DynamicModal from '../modals/DynamicModal';
import { MDBDataTable } from 'mdbreact';


function getApplicationTypeName(applicationType) {
    switch (applicationType) {
        case 717800000:
            return "Address Change";
        case 717800001:
            return "Mail Forwarding";
        case 717800002:
            return "Package Submission";
        default:
            return applicationType;
    }
}


const ApplicationsRender = ({ applications, handleSelect, handleUpdate, handleDelete, handleAdd }) => {
    const appTypeLabel = getApplicationTypeName(applications.ss_applicationtype);

    function getAppBodyContent() {
        let tableData = applications;
    
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
                field: 'ss_applicationid',
                sort: 'asc',
                width: 150
              },
    
              {
                label: 'App Name',
                field: 'ss_name',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Type',
                field: 'ss_applicationtype',
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
        rows: getAppBodyContent()
            
          
    }
    return (
        <div>
            {/* <DynamicModal name="dynamic"/> */}
            <h1>Applications</h1>
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

ApplicationsRender.propTypes = {
    applications: PropTypes.array,
    handleSelect: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func,
    handleAdd: PropTypes.func,
};

export default ApplicationsRender;