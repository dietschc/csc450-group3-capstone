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
//  (CPD, 4/14/2022, Added isLoading state and spinner code to the submit buttons)
//  (DAB, 04/14/2022, added endLoadingAll action to page load in to clean 
//  up any skipped load ins)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Container, FloatingLabel, Alert, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginThunk, deleteAllUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { checkLogin } from '../../helperFunction/CheckLogin'
import FormContainer from '../template/FormContainer';
import { endLoadingAll } from '../../actions/isLoading';

/**
 * The Login Component will allow a user to either login to their 
 * account or move on to create a new account. 
 * 
 * @param {*} props 
 * @returns 
 */
function Login(props) {
    // Destructuring needed state and functions from props
    const {
        users,
        isLoading,
        loginThunk,
        deleteAllUsers,
        endLoadingAll
    } = props;

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

    // Loading the database data into state on page load
    useEffect(() => {
        // Ending any unfinished load ins
        endLoadingAll();
    }, []);

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
                                type="submit"
                            >
                                {isLoading.isLoadingUsers ? (
                                    <Spinner
                                        as="span"
                                        variant="light"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        animation="border" />
                                ) : (
                                    "Login"
                                )}
                            </Button>

                            <Button
                                className="my-1"
                                style={{ minWidth: "10rem" }}
                                onClick={createAccountHandler}
                            >
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

        // If there is not a current submission request loading
        if (!isLoading.isLoadingUsers) {

            // Call login thunk function which tries to authenticate against the backend
            await loginThunk(userName, password)
                .then(res => {
                    // If res was successful
                    if (res) {
                        // setSubmitted(true);
                        setShowSuccess(true);

                        // Navigate to previous page or dashboard
                        navigate(state?.path || "../userDashboard");
                    } else {
                        clearForm();
                        setShowError(true);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
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
    users: [...state.users],
    isLoading: { ...state.isLoading }
});

// Exporting the component
// export default Login;
export default connect(mapStateToProps, { loginThunk, deleteAllUsers, endLoadingAll })(Login);