// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingStateZip.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import FloatingZip from './FloatingZip';
import FloatingStateOptionList from './FloatingStateOptionList';

/**
 * A React-Bootstrap formatted Row of the FloatingStateOptionList 
 * and FloatingZip Components. It allows for the common state/zip 
 * pairing to be dropped in where needed.
 * 
 * @param { zip, onChangeZip, state, onChangeState } props 
 * @returns 
 */
function FloatingStateZip(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { zip, onChangeZip, state, onChangeState } = props;

    return (
        <Row className="justify-content-center">
            <FloatingStateOptionList state={state} onChangeState={onChangeState}/>
            <FloatingZip zip={zip} onChangeZip={onChangeZip}/>
        </Row>
    )  
}

// Exporting the component
export default FloatingStateZip;