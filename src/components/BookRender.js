"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ModalContainer from '../modals/ModalContainer';

const BookRender = ({ bookData }) => {

    function createBookRow(book) {
        let appTypeValue = book.ss_applicationtype;
        var appTypeLabel = ""
        if (appTypeValue === 717800000) {
            appTypeLabel = "Address Change"
        } else if (appTypeValue === 717800001) {
            appTypeLabel = "Mail Forwarding"
        } else if (appTypeValue === 717800002) {
            appTypeLabel = "Package Submission"
        }
        return (
            <tr key={book.ss_name}>
                <td> {book.ss_name} </td>
                <td> {book.ss_applicationid} </td>
                <td> {appTypeLabel} </td>
                <td> {book.createdon} </td>
                <td><ModalContainer label="Select" data={{ ...book, appTypeLabel: appTypeLabel }} entity="Application" /></td>
                <td><ModalContainer label="Update" data={{ ...book, appTypeLabel: appTypeLabel }} entity="Application" onSubmit={handleUpdate} /></td>
                <td><ModalContainer label="Delete" data={{ ...book, appTypeLabel: appTypeLabel }} entity="Application" onSubmit={handleDelete} /></td>
            </tr>
        );
    }

    function handleAdd(values) {
        console.log('handleAdd values',values);
    }
    function handleUpdate(values) {
        console.log('handleUpdate values', values);
    }

    function handleDelete(values) {
        console.log('handleDelete values', values);
    }


    let content = '';

    if (!bookData || bookData.requestPending) {
        content = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }


    if (bookData && bookData.requestSucessful) {
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(bookData)}
                    {bookData.books.value.map((book) => createBookRow(book))}
                </tbody>
            </table>)
    }

    if (bookData && bookData.requestFailed) {
        content =
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
    }

    return (
        <div>
            <h1>Books</h1>
            {content}
            <Button color="primary" onClick={() => { handleAdd() }}>Add Book</Button>
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
