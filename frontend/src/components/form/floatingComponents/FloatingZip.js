// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingZip.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/07/2022, Added in some validation)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A React-Bootstrap formatted floating form text input is
 * returned with all needed basic functionality. It will 
 * allow CRUD operations to be performed on a zip code.
 * 
 * @param { zip, onChangeZip } props 
 * @returns 
 */
function FloatingZip(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { zip, onChangeZip } = props;

    return (
        <Form.Floating as={Col} sm={6} className="mb-3 justify-content-center">
            <FloatingLabel 
            controlId="floatingZip" 
            label="Zip">
                <Form.Control
                type="text"
                placeholder="Zip"
                required
                pattern="[0-9]*" 
                maxLength="5" 
                minLength="5"
                value={zip}
                onChange={onChangeZip}
                />
            </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingZip;