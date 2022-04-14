// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingImageUpload.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 3/7/22, Removed required from this component)
//  (DAB, 3/07/2022, Images are no longer required)
//  (CPD, 3/11/22, Updated name of changeHandler to more accurately reflect its purpose)

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * A React-Bootstrap formatted floating form file input is
 * returned with all needed basic functionality. It will
 * allow CRUD operations to be performed on a file image with
 * the specified ext's.
 *
 * @param { onChangeFile, formError } props
 * @returns
 */
function FloatingImageUpload(props) {
    // The form component specific props will be assigned and
    // used to process the form element
    const { onChangeFile, formError } = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <Form.Label htmlFor="floatingImageUpload" hidden>
                Image Upload
            </Form.Label>
            <Form.Control
                id="floatingImageUpload"
                aria-label="Image Upload"
                className="pt-3"
                type="file"
                onChange={onChangeFile}
                accept=".jpg,.png,.jpeg,.gif"
                isInvalid={ !!formError?.file}
            />
            <Form.Control.Feedback type="invalid">
                {formError?.file}
            </Form.Control.Feedback>
        </Form.Floating>
    );
}

// Exporting the component
export default FloatingImageUpload;
