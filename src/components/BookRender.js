"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ModalContainer from '../modals/ModalContainer';

const BookRender = ({ bookData }) => {

    function createBookRow(book){
        let appTypeValue = book.ss_applicationtype;
        var appTypeLabel = ""
        if (appTypeValue === 717800000)
        {
            appTypeLabel = "Address Change"
        } else if (appTypeValue === 717800001)
        {
            appTypeLabel = "Mail Forwarding"
        } else if (appTypeValue === 717800002)
        {
            appTypeLabel = "Package Submission"
        }
        return (
            <tr key={book.ss_name }>
                <td> {book.ss_name} </td>
                <td> {book.ss_applicationid} </td>
                <td> {appTypeLabel} </td>
                <td> {book.createdon} </td>
                <td><ModalContainer label="Update" name={book.ss_name} entity={book}  /></td>
                <td><ModalContainer label="Delete" name={book.ss_name} entity={book}/></td>
                {/* <td><button className="btn btn-secondary update" onClick={() => handleUpdate(book)}>Update</button></td> */}
                {/* <td><button className="btn btn-danger delete" onClick={() => handleDelete(book)}>Delete</button></td> */}
            </tr>
        );
    }



    function handleAdd() {
        // this.props.toggleModal();
        // this.props.fillModal({},true);
        console.log('at handleAdd');
    }

    function handleUpdate(book) {
        // this.props.toggleModal();
        // this.props.fillModal(book,false);
        console.log('book at handleUpdate',book);
    }

    function handleDelete(book) {
        console.log('book at handleDelete', book);
        // BookActions.deleteBook(book);
    }

    let content = '';

    if(!bookData || bookData.requestPending){
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }
    

    if(bookData && bookData.requestSucessful){
        content = 
            (<table className="table">
                <thead>
                <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Created On</th>
                        <th></th>
                        <th></th>
                </tr>
                </thead>
                <tbody>
                    {console.log(bookData)}
                    {bookData.books.value.map((book) => createBookRow(book))}
                </tbody>    
            </table>)
    }

    if(bookData && bookData.requestFailed){
        content = 
        (
            <div className="alert alert-danger" role="alert">
                Error while loading books!
            </div>
        )
    }
        
    return(
        <div>
            <h1>Books</h1>
            {content}
            <Button color="primary" onClick={() => {handleAdd()}}>Add Book</Button>
        </div>
    );
}

BookRender.propTypes = {
    bookData: PropTypes.object,
    modal: PropTypes.object,
    toggleModal: PropTypes.func,
    fillModal: PropTypes.func
};

export default BookRender;
