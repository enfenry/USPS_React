"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

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
            <h1>Applications</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Created On</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application =>
                        <tr key={application.ss_applicationid}>
                            <td>{application.ss_name}</td>
                            <td>{application.ss_applicationid}</td>
                            <td>{getApplicationTypeName(application.applicationType)}</td>
                            <td>{application.createdon}</td>
                            <td align="right">
                                <button className="btn btn-success mr-1" onClick={() => handleSelect(application)}>Select</button>
                                <button className="btn btn-secondary mr-1" onClick={() => handleUpdate(application)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(application)}>Delete</button>
                            </td>
                        </tr>
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