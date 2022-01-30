// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditAccount.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 1/29/22, GitHub#29)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Row, Form, Container, Button } from 'react-bootstrap';

function EditAccount(props) {
    let editing = false
    let initialAccountState = ""

    const [account, setAccount] = useState(initialAccountState)
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // keeps track if account is submitted
    const [submitted, setSubmitted] = useState(false)


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
            zip: zip,
            state: state,
            email: email,
            password: password
        }
    }

    const clearForm = () => {
        setUserName("");
        setFirstName("");
        setLastName("");
        setZip("");
        setState("");
        setEmail("");
        setPassword("");
    }

    return (
        <Container fluid>
            {submitted ? (
                <div className="text-center">
                    <h4>Account information submitted successfully</h4>
                    <Link to={"/"}>
                        Back to Dashboard
                    </Link>
                </div>

            ) : (
                <Form className="p-3">
                    <div className="text-center">
                        <h4>{editing ? "Edit" : "Create"} Account</h4>
                    </div>

                    <Form.Group as={Row} className="mb-3 justify-content-md-center pt-2">
                        <Form.Label column sm={2}>User Name:</Form.Label>
                        <Form.Control
                            className="w-50"
                            type="text"
                            required
                            value={userName}
                            onChange={onChangeUserName}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center">
                        <Form.Label column sm={2}>First Name:</Form.Label>
                        <Form.Control
                            className="w-50"
                            type="text"
                            required
                            value={firstName}
                            onChange={onChangeFirstName}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center">
                        <Form.Label column sm={2}>Last Name:</Form.Label>
                        <Form.Control
                            className="w-50"
                            type="text"
                            required
                            value={lastName}
                            onChange={onChangeLastName}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center">
                        <Form.Label column sm={2}>Zip:</Form.Label>
                        <Form.Control
                            className="w-50"
                            type="text"
                            required
                            value={zip}
                            onChange={onChangeZip}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center">
                        <Form.Label column sm={2}>State:</Form.Label>
                        <Form.Select className="w-50" aria-label="select state options">
                            <option>Select State</option>
                            <option value="1">Minnesota</option>
                            <option value="2">Wisconsin</option>
                            <option value="3">Somewhere else</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center">
                        <Form.Label column sm={2}>Email:</Form.Label>
                        <Form.Control
                            className="w-50"
                            type="text"
                            required
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center">
                        <Form.Label column sm={2}>Password:</Form.Label>
                        <Form.Control
                            className="w-50"
                            type="text"
                            required
                            value={password}
                            onChange={onChangePassword}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-around pt-4">
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
    )
}

// Exporting the component
export default EditAccount;