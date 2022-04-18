// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingWebsite.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):
//  (TJI, 03/29/2022 - Added in character limits to match database)
//  (DAB, 04/16/2022, Added in input validation)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A React-Bootstrap formatted floating form text input is
 * returned with all needed basic functionality. It will 
 * allow CRUD operations to be performed on a website.
 * 
 * @param { website, onChangeWebsite, formError } props 
 * @returns 
 */
function FloatingWebsite(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { website, onChangeWebsite, formError } = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel
                controlId="floatingWebsite"
                label="Website">
                <Form.Control
                    type="text"
                    placeholder="Website"
                    required
                    value={ website }
                    onChange={ onChangeWebsite }
                    maxLength="255"
                    isInvalid={ !!formError?.website }
                />
                <Form.Control.Feedback type="invalid">
                    { formError?.website }
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Floating>
    )
}

// Exporting the component
export default FloatingWebsite;