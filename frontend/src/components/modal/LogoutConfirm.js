// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - DeleteFriendConfirm.js
// March 5, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function LogoutConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, logout, closeHandler } = props;

    // The yesHandler will call both the logout and closeHandler 
    // functions in order to logout
    const yesHandler = () => {
        logout();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Logout Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to logout?
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
export default LogoutConfirm;