// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Login.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/01/2022, Added in Login View Structure)
//  (CPD, 2/22/22, Connected frontend to backend with loginThunk)
//  (DAB, 3/22/2022, Added in useLocation state to allow for a user to be redirected back 
//  to the previous location after logging in)
//  (TJI, 03/29/2022 - Added in character limits to match database)
//  (TJI, 04/02/2022, Removed call to password from state)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Container, FloatingLabel, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';
import { loginThunk, deleteAllUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { checkLogin } from '../../helperFunction/CheckLogin'

function Login(props) {

    const { loginThunk, deleteAllUsers, users } = props;

    const [isSubmitted, setSubmitted] = useState(false)
    const [isError, setShowError] = useState(false)
    const [isSuccess, setShowSuccess] = useState(false)
    const [userName, setUserName] = useState(users.length > 0 ? users[0].auth.userName : "");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    // Pulling state from useLocation to allow for the user to be redirected back to the page 
    // they were previously on before redirect
    const { state } = useLocation();

    const onChangeUserName = e => {
        setShowError(false);
        setShowSuccess(false);
        const {value, maxLength} = e.target;
        const userName = value.slice(0, maxLength);
        setUserName(userName);
    }

    const onChangePassword = e => {
        setShowError(false);
        setShowSuccess(false);
        const {value, maxLength} = e.target;
        const password = value.slice(0, maxLength);
        setPassword(password);
    }

    // Check if user is logged in
    const showLoginButtons = () => (
        <div className="text-center">
            {checkLogin(users) ? (
                <div className="d-flex justify-content-around pt-2 pb-5">
                    <Button variant="outline-primary" onClick={logoutAccount}>
                        Logout
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="d-flex justify-content-around pt-2 pb-5">
                        <Button type="submit" variant="outline-primary">
                            Login
                        </Button>

                        <Button variant="outline-primary" onClick={createAccountHandler}>
                            Create Account
                        </Button>
                    </div>

                    <div>
                        {isError &&
                            <Alert variant="danger" className="text-center">
                                Incorrect user name or password!
                            </Alert>
                        }
                    </div>
                </div>
            )}
            <div>
                {isSuccess &&
                    <Alert variant="success" className="text-center">
                        Account logged in successfully!
                    </Alert>
                }
            </div>
        </div>
    )

    const loginAccount = async (e) => {
        e.preventDefault();
        // login(1);
        // logout(1);

        // console.log("Users: ", users);
        // console.log("Users: " + users[1].isLoggedIn);

        // Call login thunk function which tries to authenticate against the backend
        await loginThunk(userName, password)
            .then(res => {
                console.log("Results: ", res);

                if (res.isLoggedIn === true) {
                    console.log("SUCCESS");

                    // setSubmitted(true);
                    setShowSuccess(true);

                    // Navigate to previous page or dashboard after .5 seconds
                    setTimeout(() => { navigate(state?.path || "../userDashboard") }, 500)
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
        // setIsloggedIn(false);
        deleteAllUsers();
        clearForm();
        // addUser("");
    }

    const clearForm = () => {
        setUserName("");
        setPassword("");
    }

    const createAccountHandler = () => {
        navigate("../editAccount");
    }

    return (
        <Container fluid className="text-muted login" style={{ maxWidth: "500px" }}>

            <Container className="mt-2" as="header">
                <h1>Login</h1>
            </Container>
            <Container fluid as="main" className="mt-5 justify-content-center align-center">
                {isSubmitted ? (
                    <div className="text-center">
                        <h4>Account logged in successfully!</h4>
                        <Link to={"/"}>
                            Back to Dashboard
                        </Link>
                    </div>
                ) : (
                    <Form onSubmit={loginAccount}>

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
                                    maxLength="64"
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
                                    maxLength="64"
                                />
                            </FloatingLabel>
                        </Form.Floating>

                        {showLoginButtons()}

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
export default connect(mapStateToProps, { loginThunk, deleteAllUsers })(Login);