// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import FloatingAddress from './FloatingAddress';
import FloatingStateZip from './FloatingStateZip';

function EditRestaurantForm(props) {
    let editing = false

    // keeps track of if the form was submitted
    const [submitted, setSubmitted] = useState(false)

    const [restaurantName, setRestaurantName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [digitalContact, setDigitalContact] = useState("");
    const [website, setWebsite] = useState("");

    const onChangeRestaurantName = e => {
        const restaurantName = e.target.value
        setRestaurantName(restaurantName);
    }

    const onChangeAddress = e => {
        const address = e.target.value
        setAddress(address);
    }

    const onChangeCity = e => {
        const city = e.target.value
        setCity(city);
    }

    const onChangeZip = e => {
        const zip = e.target.value
        setZip(zip);
    }

    const onChangeState = e => {
        const state = e.target.value
        setState(state);
    }

    const onChangePhone = e => {
        const phone = e.target.value
        setPhone(phone);
    }

    const onChangeDigitalContact = e => {
        const digitalContact = e.target.value
        setDigitalContact(digitalContact);
    }

    const onChangeWebsite = e => {
        const website = e.target.value
        setWebsite(website);
    }

    const saveAccount = () => {
        var data = {
            restaurantName: restaurantName,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phone: phone,
            digitalContact: digitalContact,
            website: website
        }
        console.log(data)
        setSubmitted(true)
    }

    const clearForm = () => {
        setRestaurantName("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        setPhone("");
        setDigitalContact("");
        setWebsite("");
        console.log("Form cleared")
    }
    return (
        <Form>
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
            
            <FloatingAddress address={address} onChangeAddress={onChangeAddress}/>
            
            <Form.Floating className="mb-3 justify-content-center">
                <FloatingLabel 
                    controlId="floatingCity" 
                    label="City">
                        <Form.Control
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={onChangeCity}
                        />
                    </FloatingLabel>
            </Form.Floating>

            
            <FloatingStateZip state={state} zip={zip} onChangeState={onChangeState} onChangeZip={onChangeZip}/>

            <Form.Floating className="mb-3 justify-content-center">
                <FloatingLabel 
                    controlId="floatingPhone" 
                    label="Phone">
                        <Form.Control
                            type="phone"
                            placeholder="Phone"
                            required
                            value={phone}
                            onChange={onChangePhone}
                        />
                    </FloatingLabel>
            </Form.Floating>

            <Form.Floating className="mb-3 justify-content-center">
                <FloatingLabel
                    controlId="floatingDigitalContact" 
                    label="DigitalContact">
                        <Form.Control
                            type="text"
                            placeholder="DigitalContact"
                            required
                            value={digitalContact}
                            onChange={onChangeDigitalContact}
                        />
                    </FloatingLabel>
            </Form.Floating>

            <Form.Floating className="mb-3 justify-content-center">
                <FloatingLabel 
                    controlId="floatingWebsite" 
                    label="Website">
                        <Form.Control
                            type="text"
                            placeholder="Website"
                            required
                            value={website}
                            onChange={onChangeWebsite}
                        />
                    </FloatingLabel>
            </Form.Floating>

            <div className="d-flex justify-content-around pt-2 pb-5">
                <Button variant="outline-primary" onClick={saveAccount}>
                    {editing ? "Update" : "Submit"}
                </Button>

                <Button variant="outline-primary" onClick={clearForm}>
                    Clear
                </Button>
            </div>
        </Form>
    )
}

// Exporting the component
export default EditRestaurantForm;