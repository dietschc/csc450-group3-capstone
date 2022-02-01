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
import { Row, Col, Form, Container, Button } from 'react-bootstrap';

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
            lastname: lastName,
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
        <Container className="text-muted" style={{ maxWidth: "700px" }}>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>{editing ? "Edit" : "Create"} Account</h1>
                </div>
            </Container>
            <Container fluid as="main" className="p-4">
                {submitted ? (
                    <div className="text-center">
                        <h4>Account information submitted successfully</h4>
                        <Link to={"/"}>
                            Back to Dashboard
                        </Link>
                    </div>

                ) : (
                    <Form>
                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>User Name:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={onChangeUserName}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>First Name:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={onChangeFirstName}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>Last Name:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={onChangeLastName}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>Address:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={address}
                                    onChange={onChangeAddress}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>City:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={city}
                                    onChange={onChangeCity}
                                />
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-md-center">
                        <Form.Group as={Col} sm={4} className="mb-3">
                            <Row>
                            <Form.Label column sm={3}>Zip:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={zip}
                                    onChange={onChangeZip}
                                />
                            </Col>
                            </Row>
                        </Form.Group>
                        
                        <Form.Group as={Col} sm={4} className="mb-3">
                            <Row>
                            <Form.Label column sm={3}>State:</Form.Label>
                                <Col sm={9}>
                                <Form.Select
                                    aria-label="select state options"
                                    value={state}
                                    onChange={onChangeState}
                                >
                                    <option>Select</option>
                                    <option value="MN">MN</option>
                                    <option value="WI">WI</option>
                                    <option value="XX">XX</option>
                                </Form.Select>
                                </Col>
                                </Row>
                        </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>Email:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-md-center">
                            <Form.Label column sm={3}>Password:</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    required
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </Col>
                        </Form.Group>

                        <div className="d-flex justify-content-around pt-4 pb-5">
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