// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - DeleteUserConfirm.js
// March 6, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to delete a user. If the confirmation 
 * is accepted the deleteUser function will handle the 
 * deletion of that user.
 * 
 * @param { show, user, deleteUser, closeHandler } props 
 * @returns 
 */
function DeleteUserConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, deleteUser, closeHandler } = props;

    // The yesHandler will call both the deleteUser and closeHandler 
    // functions in order to delete the user
    const yesHandler = () => {
        deleteUser();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Delete user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this user?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={yesHandler}>
                    Yes
                </Button>
                <Button variant="primary" onClick={closeHandler}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )  
}

// Exporting the component
export default DeleteUserConfirm;