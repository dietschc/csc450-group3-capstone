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

export default FloatingStateZip;