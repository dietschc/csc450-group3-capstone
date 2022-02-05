// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingDigitalContact.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A React-Bootstrap formatted floating form text input is
 * returned with all needed basic functionality. It will 
 * allow CRUD operations to be performed on a digital contact.
 * 
 * @param { digitalContact, onChangeDigitalContact } props 
 * @returns 
 */
function FloatingDigitalContact(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { digitalContact, onChangeDigitalContact } = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel
                controlId="floatingDigitalContact" 
                label="DigitalContact">
                    <Form.Control
                        type="text"
                        placeholder="DigitalContact"
                        required
                        value={digitalContact}
                        onChange={onChangeDigitalContact}
                    />
                </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingDigitalContact;