// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingPhone.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function FloatingPhone(props) {
    const { phone, onChangePhone} = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel 
                controlId="floatingPhone" 
                label="Phone">
                    <Form.Control
                        type="phone"
                        placeholder="Phone"
                        required
                        value={phone}
                        onChange={onChangePhone}
                    />
                </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingPhone;