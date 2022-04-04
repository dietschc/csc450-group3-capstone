// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - ThemedSpinner.js
// April 4, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Spinner } from 'react-bootstrap';

function ThemedSpinner(props) {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" />
        </div>
    )
}

// Exporting the component
export default ThemedSpinner;