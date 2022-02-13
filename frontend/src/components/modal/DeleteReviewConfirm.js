// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - DeleteFriendConfirm.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * A React Bootstrap formatted confirmation modal that will ask 
 * a user if they wish to delete a friend. If the confirmation 
 * is accepted the deleteFriend function will handle the 
 * deletion of that friend.
 * 
 * @param { show, friend, deleteFriend, closeHandler } props 
 * @returns 
 */
function DeleteReviewConfirm(props) {
    // Destructuring the needed functions and variables from props
    const { show, deleteReview, closeHandler } = props;

    // The yesHandler will call both the deleteFriend and closeHandler 
    // functions in order to delete the friend
    const yesHandler = () => {
        deleteReview();
        closeHandler();
    }
    
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Delete review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this review?
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
export default DeleteReviewConfirm;