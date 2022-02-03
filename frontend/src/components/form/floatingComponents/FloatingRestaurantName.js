// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FloatingRestaurantName.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function FloatingRestaurantName(props) {
    const { restaurantName, onChangeRestaurantName } = props;

    return (
        <Form.Floating className="mb-3 justify-content-center">
            <FloatingLabel 
                controlId="floatingRestaurantName" 
                label="Restaurant Name">
                    <Form.Control
                        type="text"
                        placeholder="Restaurant Name"
                        required
                        value={restaurantName}
                        onChange={onChangeRestaurantName}
                    />
                </FloatingLabel>
        </Form.Floating>
    )  
}

// Exporting the component
export default FloatingRestaurantName;