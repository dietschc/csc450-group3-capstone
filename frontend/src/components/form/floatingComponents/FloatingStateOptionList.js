// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingStateOptionList.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { FloatingLabel, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import C from '../../../constants';

/**
 * A React-Bootstrap formatted floating form select option list is
 * returned with all needed basic functionality. It will 
 * allow CRUD operations to be performed on the state.
 * 
 * @param { state, onChangeState } props 
 * @returns 
 */
function FloatingStateOptionList(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { state, onChangeState } = props;

    // Maps out options for the floatingState Select
    const stateOptions = C.STATE_LIST.map((state, index) => (
        <option key={index} value={state}>{state}</option>
        )
    )

    return (
        <Form.Floating as={Col} sm={6} className="mb-3 justify-content-center">
            <FloatingLabel 
            controlId="floatingState" 
            label="State">
                <Form.Select
                aria-label="select state options"
                value={state}
                required
                onChange={onChangeState}>
                    <option>Select</option>
                    {stateOptions}
                </Form.Select>
            </FloatingLabel>
        </Form.Floating>
    )
}

// Exporting the component
export default FloatingStateOptionList;