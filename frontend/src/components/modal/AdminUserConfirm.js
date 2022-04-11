// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AdminUserConfirm.js
// April 11, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to give a user admin permissions. If the 
 * confirmation is accepted the adminUser function will handle the 
 * admin granting permissions of that user.
 * 
 * @param { show, adminUser, closeHandler } props 
 * @returns 
 */
function AdminUserConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, adminUser, closeHandler } = props;

    // The yesHandler will call both the adminUser and closeHandler 
    // functions in order to add admin privileges
    const yesHandler = () => {
        adminUser();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Admin User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to give this user admin permissions?
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
export default AdminUserConfirm;