// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - CancelFormButton.js
// April 7, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
// Using the button components from Bootstrap
import { Button } from 'react-bootstrap';
// Using useNavigate to change the window's location
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function CancelFormButton(props) {
    // Initializing useNavigate
    const navigate = useNavigate();

    // On click, navigate to the previous page (-1)
    const returnHandler = () => {
        navigate(-1)
    }
    
    // Basic button with onClick functionality to the returnHandler
    return (
        <Button className="ml-1 w-25" onClick={returnHandler}>
            Cancel
        </Button>
    )
}

// Exporting the component
export default CancelFormButton;