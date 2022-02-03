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

function FloatingStateOptionList(props) {
    const state = props.state;
    const onChangeState = props.onChangeState;
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