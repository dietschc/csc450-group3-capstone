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
//  (DAB, 4/10/2022, Added comments)
//  (DAB, 4/10/2022, Button are now responsive and follow expanding theme)

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
import FormContainer from '../template/FormContainer';

/**
 * The Login Component will allow a user to either login to their 
 * account or move on to create a new account. 
 * 
 * @param {*} props 
 * @returns 
 */
function Login(props) {
    // Destructuring needed state and functions from props
    const { users } = props;
    const { loginThunk, deleteAllUsers } = props;

    // Setting local state variables
    const [isSubmitted, setSubmitted] = useState(false)
    const [isError, setShowError] = useState(false)
    const [isSuccess, setShowSuccess] = useState(false)
    const [userName, setUserName] = useState(users.length > 0 ? users[0].auth.userName : "");
    const [password, setPassword] = useState("");

    // Creating a navigate instance that will allow for traversal through the app
    const navigate = useNavigate();
    // Pulling state from useLocation to allow for the user to be redirected back to the page 
    // they were previously on before redirect
    const { state } = useLocation();

    const onChangeUserName = e => {
        setShowError(false);
        setShowSuccess(false);
        const { value, maxLength } = e.target;
        const userName = value.slice(0, maxLength);
        setUserName(userName);
    }

    const onChangePassword = e => {
        setShowError(false);
        setShowSuccess(false);
        const { value, maxLength } = e.target;
        const password = value.slice(0, maxLength);
        setPassword(password);
    }

    // Check if user is logged in
    const showLoginButtons = () => (
        <div className="text-center">
            {checkLogin(users) ?
                (
                    <div className="d-flex flex-column flex-sm-row justify-content-center pt-2 pb-5">
                        <Button
                            style={{ minWidth: "10rem" }}
                            onClick={logoutAccount}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="p-0 m-0">
                        <div className="d-flex flex-column flex-sm-row justify-content-around p-0 m-0">
                            <Button
                                className="my-1"
                                style={{ minWidth: "10rem" }}
                                type="submit">
                                Login
                            </Button>
                            <Button
                                className="my-1"
                                style={{ minWidth: "10rem" }}
                                onClick={createAccountHandler}>
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
                )
            }
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
                // console.log("Results: ", res);

                if (res.isLoggedIn === true) {
                    // console.log("LOGIN SUCCESS");

                    // setSubmitted(true);
                    setShowSuccess(true);

                    // Navigate to previous page or dashboard after .5 seconds
                    setTimeout(() => { navigate(state?.path || "../userDashboard") }, 500)
                } else {
                    clearForm();
                    setShowError(true);
                    // console.log("LOGIN FAIL");
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
        <FormContainer>
            <Container className="mt-2" as="header">
                <h1>Login</h1>
            </Container>
            <Container fluid as="main" className="justify-content-center align-center">
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
        </FormContainer>
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