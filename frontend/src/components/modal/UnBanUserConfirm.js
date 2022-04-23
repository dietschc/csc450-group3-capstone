// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UnBanUserConfirm.js
// April 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to unBan a user. If the confirmation 
 * is accepted the unBanUser function will handle the 
 * unBanning of that user.
 * 
 * @param { show, unBanUser, closeHandler } props 
 * @returns 
 */
function UnBanUserConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, unBanUser, closeHandler } = props;

    // The yesHandler will call both the unBanUser and closeHandler 
    // functions in order to ban the user
    const yesHandler = () => {
        unBanUser();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>UnBan User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to unBan this user?
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
export default UnBanUserConfirm;