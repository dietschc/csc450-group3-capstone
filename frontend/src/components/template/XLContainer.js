// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - XLContainer.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * This container will format the views with content wider than 1000px. 
 * 
 * @param { children } props 
 * @returns 
 */
function FormContainer(props) {
    // Saving props.children to a variable so they can be wrapped
    const children = props.children;
    
    return (
        <Container fluid className="justify-content-center" style={{maxWidth: "1000px"}}>
            {children}
        </Container>
    )  
}

// Exporting the component
export default FormContainer;