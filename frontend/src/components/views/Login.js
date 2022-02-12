// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Login.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/01/2022, Added in Login View Structure)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, Container, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(props) {
    const initialFormData = Object.freeze({
        username: "",
        password: ""
    })
    //const[userName, setUserName] = useState();
    //const [password, setPassword] = useState();
    const navigate = useNavigate();
    
    //const login = () => {};

    //const onChangePassword = () => {};
    //const onChangeUserName = () => {};

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) =>
    {
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        })
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        //console.log(formData);
        //TO DO: add login functionality to database
    }

    const createAccountHandler = () => {
        navigate("../editAccount", {itemId: 42, });
    }


    return (
        <Container fluid className="text-muted login" style={{ maxWidth: "500px" }}>

            <Container className="mt-2" as="header">
                    <h1>Login</h1>
            </Container>
            <Container fluid as="main" className="mt-5 justify-content-center align-center">
            
                    <Form>

                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel 
                                controlId="floatingUserId" 
                                label="User Name">
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        required
                                        name = "username"
                                        onChange={handleChange}
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
                                        name = "password"
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                        </Form.Floating>

                        <div className="d-flex justify-content-around pt-2 pb-5">
                            <Button variant="outline-primary" onClick={handleSubmit}>
                                Login
                            </Button>

                            <Button variant="outline-primary" onClick={() => createAccountHandler()}>
                                Create Account
                            </Button>
                        </div>

                    </Form>
                
            </Container>

        </Container>
    )
}

// Exporting the component
export default Login;