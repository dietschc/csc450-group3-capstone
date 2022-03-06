// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - BanUserConfirm.js
// March 6, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to ban a user. If the confirmation 
 * is accepted the banUser function will handle the 
 * banning of that user.
 * 
 * @param { show, banUser, closeHandler } props 
 * @returns 
 */
function BanUserConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, banUser, closeHandler } = props;

    // The yesHandler will call both the banUser and closeHandler 
    // functions in order to ban the user
    const yesHandler = () => {
        banUser();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Ban user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to ban this user?
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
export default BanUserConfirm;