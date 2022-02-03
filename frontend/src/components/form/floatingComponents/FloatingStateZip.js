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

function FloatingStateZip(props) {
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