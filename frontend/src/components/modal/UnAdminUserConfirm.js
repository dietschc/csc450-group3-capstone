// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UnAdminUserConfirm.js
// April 11, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to remove and admins privileges. If the 
 * confirmation is accepted the unAdminUser function will handle the 
 * removal of that users admin permissions.
 * 
 * @param { show, unAdminUser, closeHandler } props 
 * @returns 
 */
function UnAdminUserConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, unAdminUser, closeHandler } = props;

    // The yesHandler will call both the unAdminUser and closeHandler 
    // functions in order to remove an admins permissions
    const yesHandler = () => {
        unAdminUser();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>UnAdmin User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to remove this users admin permissions?
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
export default UnAdminUserConfirm;