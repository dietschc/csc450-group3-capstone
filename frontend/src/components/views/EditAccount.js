// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditAccount.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 1/29/22, GitHub-#29-EditAccount View Layout)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';

function EditAccount(props) {
    let editing = false

    // keeps track of if the form was submitted
    const [submitted, setSubmitted] = useState(false)

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUserName = e => {
        const userName = e.target.value
        setUserName(userName);
    }

    const onChangeFirstName = e => {
        const firstName = e.target.value
        setFirstName(firstName);
    }

    const onChangeLastName = e => {
        const lastName = e.target.value
        setLastName(lastName);
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

    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email);
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password);
    }

    const saveAccount = () => {
        var data = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            zip: zip,
            state: state,
            email: email,
            password: password
        }
        console.log(data)
        setSubmitted(true)
    }

    const clearForm = () => {
        setUserName("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setCity("");
        setZip("");
        setState("");
        setEmail("");
        setPassword("");
        console.log("Form cleared")
    }

    return (
        <Container className="text-muted" style={{ maxWidth: "500px" }}>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>{editing ? "Edit" : "Create"} Account</h1>
                </div>
            </Container>
            <Container fluid as="main" className="p-4 justify-content-center">
                {submitted ? (
                    <div className="text-center">
                        <h4>Account information submitted successfully</h4>
                        <Link to={"/"}>
                            Back to Dashboard
                        </Link>
                    </div>

                ) : (
                    <Form>
                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel 
                                controlId="floatingUserId" 
                                label="User Name">
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        required
                                        value={userName}
                                        onChange={onChangeUserName}
                                    />
                                </FloatingLabel>
                        </Form.Floating>

                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel 
                                controlId="floatingFirstName" 
                                label="First Name">
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        required
                                        value={firstName}
                                        onChange={onChangeFirstName}
                                    />
                                </FloatingLabel>
                        </Form.Floating>

                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel 
                                controlId="floatingLastName" 
                                label="Last Name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        value={lastName}
                                        onChange={onChangeLastName}
                                    />
                                </FloatingLabel>
                        </Form.Floating>
                        
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

                        
                        <Row className="justify-content-center">
                            <Form.Floating as={Col} sm={6} className="mb-3 justify-content-center">
                                <FloatingLabel 
                                    controlId="floatingState" 
                                    label="State">
                                       <Form.Select
                                        aria-label="select state options"
                                        value={state}
                                        onChange={onChangeState}>
                                            <option>Select</option>
                                            <option value="MN">MN</option>
                                            <option value="WI">WI</option>
                                            <option value="XX">XX</option>
                                        </Form.Select> 
                                    </FloatingLabel>
                            </Form.Floating>

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
                        </Row>

                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel
                                controlId="floatingEmail" 
                                label="Email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={onChangeEmail}
                                    />
                                </FloatingLabel>
                        </Form.Floating>

                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel
                                controlId="floatingPassword" 
                                label="Password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={onChangePassword}
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
                )}
            </Container>
        </Container>
    )
}

// Exporting the component
export default EditAccount;