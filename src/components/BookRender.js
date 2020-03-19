"use strict"

import React from 'react';
import PropTypes from 'prop-types';
//import BookModal from '../components/BookModal';
import { Button } from 'reactstrap';
//<BookModal /><BookModal modal={this.props.modal} toggleModal={this.props.toggleModal} handleInputChange={this.props.handleInputChange} />


const BookRender = ({ bookData }) => {

    function createBookRow(book){
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td><button className="btn btn-secondary update" onClick={() => handleUpdate(book)}>Update</button></td>
                <td><button className="btn btn-danger delete" onClick={() => handleDelete(book)}>Delete</button></td>
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
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.books.map((book) => createBookRow(book))}
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
