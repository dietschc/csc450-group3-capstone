// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingCity.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function FloatingCity(props) {
    const { city, onChangeCity } = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel 
                controlId="floatingCity" 
                label="City">
                    <Form.Control
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={onChangeCity}
                    />
                </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingCity;