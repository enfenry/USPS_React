"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import CustomerModal from '../components/CustomerModal';
import { Button } from 'reactstrap';

const CustomerRender = ({ customerData }) => {

    function createCustomerRow(customer){
        return (
            <tr key={customer.customer_Lname}>
                <td> {customer.Lname} </td>
                <td> {customer.Fname} </td>
                <td> {customer.Address} </td>
                <td><button className="btn btn-secondary update" onClick={() => handleUpdate(customer)}>Update</button></td>
                <td><button className="btn btn-danger delete" onClick={() => handleDelete(customer)}>Delete</button></td>
            </tr>
        );
    }


    function handleAdd() {
        // this.props.toggleModal();
        // this.props.fillModal({},true);
        console.log('at handleAdd');
    }

    function handleUpdate(customer) {
        // this.props.toggleModal();
        // this.props.fillModal(customer,false);
        console.log('customer at handleUpdate',customer);
    }

    function handleDelete(customer) {
        console.log('customer at handleDelete', customer);
        // BookActions.deleteBook(book);
    }

    let content = '';

    if(!customerData || customerData.requestPending){
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }
    

    if(customerData && customerData.requestSucessful){
        content = 
            (<table className="table">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData.customer.map((customer) => createCustomerRow(customer))}
                </tbody>    
            </table>)
    }

    if(customerData && customerData.requestFailed){
        content = 
        (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        )
    }
        
    return(
        <div>
            <h1>Customers</h1>
            {content}
            <CustomerModal />
            {/* <BookModal modal={this.props.modal} toggleModal={this.props.toggleModal} handleInputChange={this.props.handleInputChange} /> */}
            <Button color="primary" onClick={() => {handleAdd()}}>Add Customer</Button>
        </div>
    );
}

CustomerRender.propTypes = {
    customerData: PropTypes.object,
    modal: PropTypes.object,
    toggleModal: PropTypes.func,
    fillModal: PropTypes.func
};

export default CustomerRender;
