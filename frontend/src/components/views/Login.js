// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Login.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/01/2022, Added in Login View Structure)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, FloatingLabel, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';
import { loginThunk, deleteUser } from '../../actions/users';
import { Link } from 'react-router-dom';

function Login(props) {
    const [submitted, setSubmitted] = useState(false)
    const [showError, setShowError] = useState(false)
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { loginThunk, deleteUser, users } = props;

    const onChangeUserName = e => {
        setShowError(false);
        const userName = e.target.value
        setUserName(userName);
    }

    const onChangePassword = e => {
        setShowError(false);
        const password = e.target.value
        setPassword(password);
    }

    const navigate = useNavigate();

    const loginAccount = async () => {
        // login(1);
        // logout(1);

        // console.log("Users: ", users);
        // console.log("Users: " + users[1].isLoggedIn);

        await loginThunk(userName, password)
            .then(res => {
                console.log("Results: ", res);

                if (res.isLoggedIn === true) {
                    console.log("SUCCESS");
                    setIsloggedIn(true);
                    // setSubmitted(true);
                } else {
                    clearForm();
                    setShowError(true);
                    console.log("FAIL");
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const logoutAccount = () => {
        // This will remove the user from state
        setIsloggedIn(false);
        deleteUser(users[0].id);
    }

    const clearForm = () => {
        setUserName("");
        setPassword("");
    }

    const createAccountHandler = () => {
        navigate("../editAccount", { itemId: 42, });
    }


    return (
        <Container fluid className="text-muted login" style={{ maxWidth: "500px" }}>

            <Container className="mt-2" as="header">
                <h1>Login</h1>
            </Container>
            <Container fluid as="main" className="mt-5 justify-content-center align-center">
                {submitted ? (
                    <div className="text-center">
                        <h4>Account logged in successfully!</h4>
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
                                    name="username"
                                    value={userName}
                                    onChange={onChangeUserName}
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
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </FloatingLabel>
                        </Form.Floating>

                        <div className="text-center">
                            {isLoggedIn ? (
                                <Button variant="outline-primary" onClick={logoutAccount}>
                                    Logout
                                </Button>

                            ) : (
                                <div>
                                    <div className="d-flex justify-content-around pt-2 pb-5">
                                        <Button variant="outline-primary" onClick={loginAccount}>
                                            Login
                                        </Button>

                                        <Button variant="outline-primary" onClick={() => createAccountHandler()}>
                                            Create Account
                                        </Button>
                                    </div>

                                    <div>
                                        {showError &&
                                            <Alert variant="danger" className="text-center">
                                                Incorrect user name or password!
                                            </Alert>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                )}
            </Container>
        </Container>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    users: [...state.users]
});

// Exporting the component
// export default Login;
export default connect(mapStateToProps, { loginThunk, deleteUser })(Login);