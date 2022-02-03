import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import C from '../../constants';

function FloatingAddress(props) {
    const { address, onChangeAddress } = props;


    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel 
            controlId="floatingAddress" 
            label="Address">
                <Form.Control
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={onChangeAddress}
                />
            </FloatingLabel>
        </Form.Floating>
    )  
}

export default FloatingAddress;