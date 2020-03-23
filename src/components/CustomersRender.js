"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const CustomersRender = ({ customers, handleSelect, handleUpdate, handleDelete, handleAdd }) => {
    return (
        <div>
            <h1>Customers</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">ID</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.contactid}>
                            <td>{customer.fullname}</td>
                            <td>{customer.contactid}</td>
                            <td align="right">
                                <button className="btn btn-success mr-1" onClick={() => handleSelect(customer)}>Select</button>
                                <button className="btn btn-secondary mr-1" onClick={() => handleUpdate(customer)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(customer)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
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