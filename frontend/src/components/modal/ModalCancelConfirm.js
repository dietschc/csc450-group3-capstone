// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - DeleteFriendConfirm.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):
//  (TJI, 04/07/2022) - Added in Cancel Button

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CancelFormButton from '../form/button/CancelFormButton';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to delete a friend. If the confirmation 
 * is accepted the deleteFriend function will handle the 
 * deletion of that friend.
 * 
 * @param { show, clearForm, closeHandler } props 
 * @returns 
 */
function ModalConfirmation(props) {
    // Destructuring the needed functions and variables from props
    const { show, clearForm, closeHandler } = props;

    // The yesHandler will call both the deleteFriend and closeHandler 
    // functions in order to delete the friend
    const yesHandler = () => {
        clearForm();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Clear Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to clear the form?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={yesHandler}>
                    Yes
                </Button>
                <Button variant="primary" onClick={closeHandler}>
                    No
                </Button>
                <CancelFormButton />
            </Modal.Footer>
        </Modal>
    )  
}

// Exporting the component
export default ModalConfirmation;