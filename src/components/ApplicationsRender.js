"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ModalButton from './modals/ModalButton';
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

const ApplicationsRender = ({ applications, handleUpdate, handleDelete, handleCreate, handleAppToOrder }) => {

  function getAppBodyContent() {
    return applications.map(obj => {
      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))
      const appTypeLabel = getApplicationTypeName(obj.ss_applicationtype);

      newObj["view"] = (
        <ModalButton CRUDOption="View" label="View" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj, appTypeLabel: appTypeLabel }} />
      );
      newObj["update"] = (
        <ModalButton CRUDOption="Update" label="Update" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj, appTypeLabel: appTypeLabel }} onSubmit={(values) => handleUpdate(values, obj)} />
      );
      newObj["delete"] = (
        <ModalButton CRUDOption="Delete" label="Delete" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj, appTypeLabel: appTypeLabel }} onSubmit={() => handleDelete(obj)} />
      );

      newObj["toOrder"] = (
        <ModalButton CRUDOption="Place Order" label="Place Order" name={obj.ss_name} entity="Application"
          initialValues={{ ...obj, appTypeLabel: appTypeLabel }} onSubmit={() => handleAppToOrder(obj)} />
      );

      newObj["appTypeLabel"] = appTypeLabel;
      return newObj;
    });
  }

  let data = {
    columns: [
      {
        label: 'App Name',
        field: 'ss_name',
        sort: 'asc'
      },
      {
        label: 'Type',
        field: 'appTypeLabel',
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
        field: 'toOrder',
        sort: 'asc'
      },
      {
        label: '',
        field: 'update',
        sort: 'asc'
      },
      {
        label: '',
        field: 'delete',
        sort: 'asc'
      }

    ],
    rows: getAppBodyContent()


  }
  return (
    <div>
      <h1>Applications</h1>
      <ModalButton CRUDOption="Create" label="Create New Application" name={`Application ${applications.length}`} entity="Application"
        initialValues={{ ss_name: `Application ${applications.length}` }} onSubmit={(values) => handleCreate(values)} />
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

ApplicationsRender.propTypes = {
  applications: PropTypes.array,
  handleCreate: PropTypes.func,
  handleView: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAppToOrder: PropTypes.func
};

export default ApplicationsRender;