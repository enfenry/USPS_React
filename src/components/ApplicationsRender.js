"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ModalButton from '../modals/ModalButton';
// import DynamicModal from '../modals/DynamicModal';

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
    return (
        <div>
            {/* <DynamicModal name="dynamic"/> */}
            <h1>Applications</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Created On</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => {
                        const appTypeLabel = getApplicationTypeName(application.ss_applicationtype);
                        return (
                            <tr key={application.ss_applicationid}>
                                <td>{application.ss_name}</td>
                                <td>{application.ss_applicationid}</td>
                                <td>{appTypeLabel}</td>
                                <td>{application.createdon}</td>
                                <td align="right"><ModalButton label="Select" data={{ ...application, appTypeLabel: appTypeLabel }} entity="Application" /></td>
                                <td align="right"><ModalButton label="Update" data={{ ...application, appTypeLabel: appTypeLabel }} entity="Application" onSubmit={(values) => handleUpdate(values, application)} /></td>
                                <td align="right"><ModalButton label="Delete" data={{ ...application, appTypeLabel: appTypeLabel }} entity="Application" onSubmit={() => handleDelete(application)} /></td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
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