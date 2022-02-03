import React from 'react'
import { Form, FloatingLabel, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import C from '../../constants';

function FloatingZip(props) {
    const { zip, onChangeZip } = props;


    return (
        <Form.Floating as={Col} sm={6} className="mb-3 justify-content-center">
            <FloatingLabel 
            controlId="floatingZip" 
            label="Zip">
                <Form.Control
                type="text"
                placeholder="Zip"
                required
                value={zip}
                onChange={onChangeZip}
                />
            </FloatingLabel>
        </Form.Floating>
        
    )  
}

export default FloatingZip;