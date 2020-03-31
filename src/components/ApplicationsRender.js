"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ModalButton from '../modals/ModalButton';
import { MDBDataTable } from 'mdbreact';
import { ADDRESS_CHANGE, MAIL_FORWARDING, PACKAGE_SUBMISSION } from '../constants/applicationTypes';


export function getApplicationTypeName(applicationType) {
  switch (applicationType) {
    case ADDRESS_CHANGE:
      return "Address Change";
    case MAIL_FORWARDING:
      return "Mail Forwarding";
    case PACKAGE_SUBMISSION:
      return "Package Submission";
    default:
      return applicationType;
  }
}


const ApplicationsRender = ({ applications, handleUpdate, handleDelete, handleAdd }) => {

  function getAppBodyContent() {
    let tableData = applications;

    return tableData.map(obj => {
      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))
      const appTypeLabel = getApplicationTypeName(obj.ss_applicationtype);

      newObj["view"] = (
        <ModalButton label="View" data={{ ...obj, appTypeLabel: appTypeLabel }} entity="Application" />
      );
      newObj["delete"] = (
        <ModalButton label="Update" data={{ ...obj, appTypeLabel: appTypeLabel }} entity="Application" onSubmit={(values) => handleUpdate(values, obj)} />
      );
      newObj["update"] = (
        <ModalButton label="Delete" data={{ ...obj, appTypeLabel: appTypeLabel }} entity="Application" onSubmit={() => handleDelete(obj)} />
      );

      newObj["appTypeLabel"] = appTypeLabel;
      return newObj;
    });


    // return tableData;
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
        field: 'appTypeLabel',
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
    <React.Fragment>
      <h1>Applications</h1>
      <Button color="primary" onClick={handleAdd}>Create New Application</Button>
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

ApplicationsRender.propTypes = {
  applications: PropTypes.array,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAdd: PropTypes.func,
};

export default ApplicationsRender;