// "use strict"

// import React from 'react';
// import PropTypes from 'prop-types';
// import BookActions from '../actions/bookActions';
// import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// const BookModal = (props) => {
//     const {
//         modal,
//         toggleModal,
//         handleInputChange
//     } = props;

//     const handleSubmit = () => {
//         if (modal.book.isAdding) {
//             BookActions.addBook(modal.book);
//         }
//         else {
//             BookActions.updateBook(modal.book);
//         }
//         toggleModal();
//     }

//     return (
//         // <Modal isOpen={modal.show} toggle={toggleModal}>
//         //     <ModalHeader toggle={toggleModal}>{modal.isAdding ? `Add Book` : `Update Book`}</ModalHeader>
//         //     <ModalBody>
//         //         <Form>
//         //             <div className="form-group">
//         //                 <label htmlFor="recipient-name" className="col-form-label">Title:</label>
//         //                 <input className="form-control" id="title" value={modal.book.title || ''} onChange={(event) => handleInputChange(event)} />
//         //             </div>
//         //             <div className="form-group">
//         //                 <label htmlFor="message-text" className="col-form-label">Author:</label>
//         //                 <input className="form-control" id="author" value={modal.book.author || ''} onChange={(event) => handleInputChange(event)} />
//         //             </div>
//         //             <div className="form-group">
//         //                 <label htmlFor="message-text" className="col-form-label">Publisher:</label>
//         //                 <input className="form-control" id="publisher" value={modal.book.publisher || ''} onChange={(event) => handleInputChange(event)} />
//         //             </div>
//         //         </Form>
//         //     </ModalBody>
//         //     <ModalFooter>
//         //         <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
//         //         <Button color="secondary" onClick={toggleModal}>Close</Button>
//         //     </ModalFooter>
//         // </Modal>

//         <Modal isOpen={true}>
//             <ModalHeader>Hello World
//             </ModalHeader>
//             <ModalBody>
//                 <Form>
//                 </Form>
//             </ModalBody>
//             <ModalFooter>
//             </ModalFooter>
//         </Modal>
//     );
// }

// BookModal.propTypes = {
//     modal: PropTypes.object.isRequired,
//     toggleModal: PropTypes.func.isRequired,
//     handleInputChange: PropTypes.func,
// };

// export default BookModal;