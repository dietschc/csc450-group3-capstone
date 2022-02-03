// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingWebsite.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function FloatingWebsite(props) {
    const { website, onChangeWebsite } = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel 
                controlId="floatingWebsite" 
                label="Website">
                    <Form.Control
                        type="text"
                        placeholder="Website"
                        required
                        value={website}
                        onChange={onChangeWebsite}
                    />
                </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingWebsite;