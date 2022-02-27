// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditAccount.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 1/29/22, GitHub-#29-EditAccount View Layout)
//  (DAB, 2/13/2022, Added in react redux connect)
//  (CPD, 2/22/22, Connected frontend to backend with addUserThunk)
//  (CPD, 2/27/22, Got states working with redux so we can update values now)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../template/FormContainer';
import { addUserThunk, updateUserThunk } from '../../actions/users';
import { checkLogin } from '../../helperFunction/CheckLogin'

function EditAccount(props) {
    const { addUserThunk, updateUserThunk, users } = props;

    // keeps track of if the form was submitted
    const [submitted, setSubmitted] = useState(false)

    // Maps expressions to user object return values
    const currentUser = (expr) => {
        // If the users array is empty, everything in here will be undefined
        if (users.length > 0) {

            // Put the first user from the users array into current user
            const [currentUser] = users;

            // Switch statement for argument expression
            switch (expr) {
                case "userName":
                    return currentUser.auth.userName;
                case "firstName":
                    return currentUser.firstName;
                case "lastName":
                    return currentUser.lastName;
                case "address":
                    return currentUser.address.address;
                case "city":
                    return currentUser.address.city;
                case "zip":
                    return currentUser.address.zip;
                case "state":
                    return currentUser.address.state;
                case "email":
                    return currentUser.email;
                case "password":
                    return currentUser.auth.password;
                default:
                    return "";
            }

            // If the users list is empty return empty string
        } else {
            return "";
        }
    }

    const [userName, setUserName] = useState(currentUser("userName"));
    const [firstName, setFirstName] = useState(currentUser("firstName"));
    const [lastName, setLastName] = useState(currentUser("lastName"));
    const [address, setAddress] = useState(currentUser("address"));
    const [city, setCity] = useState(currentUser("city"));
    const [zip, setZip] = useState(currentUser("zip"));
    const [state, setState] = useState(currentUser("state"));
    const [email, setEmail] = useState(currentUser("email"));
    const [password, setPassword] = useState(currentUser("password"));

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

    // Check if user is logged in
    const editing = checkLogin(users);

    const saveAccount = () => {

        // Call to redux-thunk action -> call to service class -> call to backend -> call to DB
        addUserThunk(userName, firstName, lastName, address, city, state, zip, email, password)

        let data = {
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

        // This variable is used for testing the following 
        // reducers/actions
        let testData = {
            userId: 0,
            userName: "uName",
            firstName: "fName",
            lastName: "lName",
            address: "address",
            city: "city",
            zip: "zip",
            state: "state",
            email: "email",
            password: "password",
            friendId: 2,
            friendUserName: "testFriend",
            permissionId: 1,
            permissionName: "testPermission"
        }

        // addUser(testData.userName, testData.firstName, 
        //     testData.lastName, testData.address, 
        //     testData.city, testData.zip, testData.state, 
        //     testData.email, testData.password);

        // deleteUser(testData.userId)
        // deleteAllUsers()
        // updateUser(testData.userId, testData.userName, testData.firstName, 
        //     testData.lastName, testData.address, 
        //     testData.city, testData.zip, testData.state, 
        //     testData.email, testData.password)
        // addFriend(testData.userId, testData.friendId, testData.friendUserName)
        // deleteFriend(testData.userId, testData.friendId)
        // deleteAllFriends(testData.userId)
        // login(testData.userId)
        // logout(testData.userId)
        // updatePermission(testData.userId, testData.permissionId, testData.permissionName)

        console.log(data)
        setSubmitted(true)
    }

    const updateAccount = () => {
        const id = users.length > 0 ? users[0].id : "";

        let data = {
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

        // Call to redux-thunk action -> call to service class -> call to backend -> call to DB
        updateUserThunk(id, data)
        // console.log("id: ", id);
        // console.log("updating with data: ", data);
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
        <FormContainer>
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
                            {editing ? (
                                <Button variant="outline-primary" onClick={updateAccount}>
                                    Update
                                </Button>
                            ) : (
                                <Button variant="outline-primary" onClick={saveAccount}>
                                    Submit
                                </Button>
                            )}

                            <Button variant="outline-primary" onClick={clearForm}>
                                Clear
                            </Button>
                        </div>
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

// // Mapping the state actions to props
// const mapDispatchToProps = dispatch => 
//     ({
//         // This method will add a new user to users
//         addUser(userName, firstName, lastName, 
//             address, city, state, zip, email, password) {
//             dispatch(addUser(userName, firstName, lastName, 
//                 address, city, state, zip, email, password))
//         },
//         deleteUser(userId) {
//             dispatch(deleteUser(userId))
//         },
//         deleteAllUsers() {
//             dispatch(deleteAllUsers())
//         },
//         updateUser(userId, userName, firstName, lastName, 
//             address, city, state, zip, email, password) {
//             dispatch(updateUser(userId, userName, firstName, lastName, 
//                 address, city, state, zip, email, password))
//         },
//         addFriend(userId, friendId, friendUserName) {
//             dispatch(addFriend(userId, friendId, friendUserName))
//         },
//         deleteFriend(userId, friendId) {
//             dispatch(deleteFriend(userId, friendId))
//         },
//         deleteAllFriends(userId) {
//             dispatch(deleteAllFriends(userId))
//         },
//         login(userId) {
//             dispatch(login(userId))
//         },
//         logout(userId) {
//             dispatch(logout(userId))
//         },
//         updatePermission(userId, permissionId, permissionName) {
//             dispatch(updatePermission(userId, permissionId, permissionName))
//         }

//     })


// Exporting the connect Wrapped EditAccount Component
export default connect(mapStateToProps, { addUserThunk, updateUserThunk })(EditAccount);