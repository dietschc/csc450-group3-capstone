// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - BodyContainer.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * This template will be the formatting for the body of the app. 
 * 
 * @param {*} props 
 * @returns 
 */
function BodyContainer(props) {
    // Saving props.children to a variable so they can be wrapped
    const children = props.children;
    
    return (
        <Container fluid className="text-muted" style={{ maxWidth: "500px" }}>
            {children}
        </Container>
    )  
}

// Exporting the component
export default BodyContainer;