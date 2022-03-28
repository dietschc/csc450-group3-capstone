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
import { useNavigate, useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../template/FormContainer';
import { addUserThunk, updateUserThunk, findByUserIdThunk, deleteUser } from '../../actions/users';
import { checkLogin } from '../../helperFunction/CheckLogin'
import FloatingStateOptionList from '../form/floatingComponents/FloatingStateOptionList';

function EditAccount(props) {
    const { addUserThunk, updateUserThunk, users, findByUserIdThunk, deleteUser } = props;

    // keeps track of if the form was submitted
    const [submitted, setSubmitted] = useState(false)
    // const [validated, setValidated] = useState(false);
    // Check if user is logged in
    const isEditing = checkLogin(users);

    const [userName, setUserName] = useState(users.length > 0 ? users[0].auth.userName : "");
    const [firstName, setFirstName] = useState(users.length > 0 ? users[0].firstName : "");
    const [lastName, setLastName] = useState(users.length > 0 ? users[0].lastName : "");
    const [address, setAddress] = useState(users.length > 0 ? users[0].address.address : "");
    const [city, setCity] = useState(users.length > 0 ? users[0].address.city : "");
    const [zip, setZip] = useState(users.length > 0 ? users[0].address.zip : "");
    const [state, setState] = useState(users.length > 0 ? users[0].address.state : "");
    const [email, setEmail] = useState(users.length > 0 ? users[0].email : "");
    const [password, setPassword] = useState(users.length > 0 ? users[0].auth.password : "");
    const [user, setUser] = useState();

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        if (users.length > 0) {
            loadData();
        }
    }, [])

    useEffect(() => {
        if (userId) {
            const checkUser = users.filter(currentUser => currentUser.id === Number(userId));
            if (checkUser.length > 0) {
                setUser(checkUser[0]);
                setForm(checkUser[0]);
                console.log("CheckUser is ", checkUser);
                
                
                
            }
        }

    }, [users])

    const loadData = async () => {
        if (userId) {
                
            // Check if userId is in state
            const checkUser = users.filter(currentUser => currentUser.id === Number(userId));
            if (checkUser.length > 0) {
                setUser(checkUser[0]);
            }
            else {
                const result = await findByUserIdThunk(userId)
                console.log("RESULT IS", result)
                if (!result) {
                    // Navigating back to the add new user dashboard
                    clearForm();
                    navigate('/admin');
                    console.log("No matching user, navigating back to createUser")
                }
            }
            // If it is reference possibly (change all to reference), if not database call 
            // then add to user reference in next useEffect with [users]
            // Set the form fields to the user in userId
            // 
        }
        else {
            setUser(users[0]);
            console.log("In useEffect else")
            console.log("User is set to ", users[0])
        }
    }

    const setForm = (user) => {
        setUserName(user.auth.userName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAddress(user.address.address);
        setCity(user.address.city);
        setZip(user.address.zip);
        setState(user.address.state);
        setEmail(user.email);
        setPassword(user.auth.password);
        console.log("Form updated")
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log("handle submit pressed");
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        // setValidated(true);
        // navigate(`/userDashboard/${userId}`)

        if (isEditing) {
            updateAccount();
        } else {
            saveAccount();
        }
    };

    const saveAccount = () => {
        // Call to redux-thunk action -> call to service class -> call to backend -> call to DB
        addUserThunk(userName, firstName, lastName, address, city, state, zip, email, password)

        setSubmitted(true)

        // Bring back to user dashboard after
        setTimeout(() => { navigate("../userDashboard") }, 500);
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
            userEmail: email,
            password: password
        }
        if (!userId) {
            // Call to redux-thunk action -> call to service class -> call to backend -> call to DB
            updateUserThunk(id, data)
            // console.log("id: ", id);
            // console.log("updating with data: ", data);
            // Bring back to user dashboard after
            setTimeout(() => { navigate("../userDashboard") }, 500);
        }
        else {
            updateUserThunk(userId, data);
            deleteUser(userId);
            // setTimeout(() => { navigate(`/userDashboard/${userId}`) }, 500);
            navigate(`/userDashboard/${userId}`)
        }
        

        // Bring back to user dashboard after
        // setTimeout(() => { navigate("../userDashboard") }, 500);
    }

    /**
     * Depening on whether you are logged in or not will determine the type of submit button
     * and calls the relevant save/update function.
     */
    const displaySubmitButton = () => (
        <div className="d-flex justify-content-around pt-2 pb-5">
            {isEditing ? (
                <Button type="submit" variant="outline-primary">
                    Update
                </Button>
            ) : (
                <Button type="submit" variant="outline-primary">
                    Submit
                </Button>
            )}

            <Button variant="outline-primary" onClick={clearForm}>
                Clear
            </Button>
        </div>
    )

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
                    <h1>{isEditing ? "Edit" : "Create"} Account</h1>
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
                    <Form onSubmit={handleSubmit}>
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
                                    value={city}
                                    onChange={onChangeCity}
                                />
                            </FloatingLabel>
                        </Form.Floating>


                        <Row className="justify-content-center">

                            <FloatingStateOptionList state={state} onChangeState={onChangeState} />

                            <Form.Floating as={Col} sm={6} className="mb-3 justify-content-center">
                                <FloatingLabel
                                    controlId="floatingZip"
                                    label="Zip">
                                    <Form.Control
                                        type="text"
                                        placeholder="Zip"
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

                        {displaySubmitButton()}

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
export default connect(mapStateToProps, { addUserThunk, updateUserThunk, findByUserIdThunk, deleteUser })(EditAccount);