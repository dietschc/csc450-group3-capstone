// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingZip.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function FloatingZip(props) {
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
                value={zip}
                onChange={onChangeZip}
                />
            </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingZip;