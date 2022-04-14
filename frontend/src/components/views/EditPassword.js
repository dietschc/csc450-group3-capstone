// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - EditPassword.js
// April 2, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/02/2022, Added in confirm password and implemented the functionality 
//  for admins to edit passwords)
//  (CPD, 4/14/2022, Added isLoading state and spinner code to the submit button)

// Using React library in order to build components 
// for the app and importing needed components such as State where variables are stored
import React, { useState } from 'react';
import { connect } from 'react-redux';
// Use to navigate back to the Dashboard page after successful update
import { useNavigate, useParams } from 'react-router-dom';
// Various containers from bootstrap to build the form
import { Form, Container, Button, FloatingLabel, Alert, Spinner } from 'react-bootstrap';
// Middleware to actually update the password
import { updatePasswordThunk, updatePasswordSecureThunk } from '../../actions/users';
import FormContainer from '../template/FormContainer';

/**
 * The EditPassword Component will allow the user to edit their password. 
 * A standard user will need to confirm they know their current password 
 * by typing it in while an admin will be allows to change the password 
 * without having the current password.
 * 
 * @param {*} props 
 * @returns 
 */
function EditPassword(props) {
    // User array and Thunk variables.
    const { users, updatePasswordThunk, updatePasswordSecureThunk, isLoading } = props;
    // Destructuring out the param if there is one
    const { userId } = useParams();

    // Variables for old password and new, both set to empty to state
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');

    // Username to match the update pulled from the user array
    const userName = useState(users.length > 0 ? users[0].auth.userName : "");

    // Navigate command for shorthand
    const navigate = useNavigate();

    // Dynamically update the oldPassword variable as entry typed in
    const onChangeOldPassword = e => {
        const { value, maxLength } = e.target;
        const oldPassword = value.slice(0, maxLength);
        setOldPassword(oldPassword);
    }

    // Dynamically update the newPassword variable as entry typed in
    const onChangeNewPassword = e => {
        const { value, maxLength } = e.target;
        const newPassword = value.slice(0, maxLength);
        setNewPassword(newPassword);
    }

    // Dynamically update the confirmPassword variable as entry typed in
    const onChangeConfirmPassword = e => {
        const { value, maxLength } = e.target;
        const newPassword = value.slice(0, maxLength);
        setConfirmPassword(newPassword);
    }

    // The handleSubmit function will verify the data is there to 
    // update the passwords and attempt to update them
    const handleSubmit = async (e) => {
        // Preventing default form submission action
        e.preventDefault();

        // If there is not a current submission request loading
        if (!isLoading.isLoadingUsers) {
            // If the password is confirmed to match, an attempt to update it in the 
            // database will be made
            if (passwordConfirmation()) {
                // If there is not a userId param, then the logged in user password 
                // will be updated if they match
                if (!userId) {
                    // Attempting to update the password
                    const isPasswordUpdated = await updatePasswordSecureThunk(users[0].id, oldPassword, newPassword);

                    if (isPasswordUpdated) {
                        // Successful update, navigating to dashboard
                        navigate("/userDashboard");
                    }
                    else {
                        // do something update failed
                        setUpdateErrorMessage("Password failed to update, check current password");
                    }
                }
                // Else, an admin is logged in so the password will be updated 
                // without providing the old password
                else {
                    // Attempting to update the password
                    const isPasswordUpdated = await updatePasswordThunk(userId, newPassword);

                    if (isPasswordUpdated) {
                        // Successful update, navigating to dashboard
                        navigate(`/userDashboard/${userId}`);
                    }
                    else {
                        // do something, update failed
                        setUpdateErrorMessage("Password failed to update, check userId");
                    }
                }
            }
        }
    }

    // The passwordConfirmation method checks to see that the two 
    // passwords match, if they do not an error message is set and 
    // false is returned. If they do, no message is set and true 
    // is returned
    const passwordConfirmation = () => {
        // If the passwords do not match and error message is set 
        // and false is returned
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords must match!");
            return false;
        }
        // If the passwords match, error message is set to empty string 
        // and true is returned
        else {
            setErrorMessage("");
            return true;
        }
    }


    return (
        <FormContainer>
            <Container className="mt-2" as="header">
                <h1>Change Password</h1>
            </Container>
            <Container fluid as="main" className="mt-5 justify-content-center align-center">
                <Form onSubmit={handleSubmit}>
                    {!userId && (<Form.Floating className="mb-3 justify-content-center">
                        <FloatingLabel
                            controlId="floatingOldPassword"
                            label="Old Password">
                            <Form.Control
                                type="password"
                                placeholder="Old"
                                required
                                value={oldPassword}
                                maxLength="64"
                                onChange={onChangeOldPassword}
                            />
                        </FloatingLabel>
                    </Form.Floating>)}
                    <Form.Floating className="mb-3 justify-content-center">
                        <FloatingLabel
                            controlId="floatingNewPassword"
                            label="New Password">
                            <Form.Control
                                type="password"
                                placeholder="New"
                                required
                                value={newPassword}
                                maxLength="64"
                                onChange={onChangeNewPassword}
                            />
                        </FloatingLabel>
                    </Form.Floating>
                    <Form.Floating className="mb-1 justify-content-center">
                        <FloatingLabel
                            controlId="floatingConfirmPassword"
                            label="Confirm Password">
                            <Form.Control
                                type="password"
                                placeholder="New"
                                required
                                value={confirmPassword}
                                maxLength="64"
                                onChange={onChangeConfirmPassword}
                            />
                        </FloatingLabel>
                    </Form.Floating>
                    <Form.Floating className="mb-3 justify-content-center">
                        <div className="d-flex flex-column flex-sm-row justify-content-center pt-3">
                            <Button type="submit">
                            {isLoading.isLoadingUsers ? (
                                <Spinner
                                as="span"
                                variant="light"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                animation="border"/>
                            ) : (
                                "Submit"
                            )}
                            </Button>
                        </div>
                    </Form.Floating>
                    {errorMessage && <Alert className="mb-0 text-center" variant="danger">{errorMessage}</Alert>}
                    {updateErrorMessage && <Alert className="mb-0 text-center" variant="danger">{updateErrorMessage}</Alert>}
                </Form>

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
// export default EditPassword;
export default connect(mapStateToProps, { updatePasswordThunk, updatePasswordSecureThunk })(EditPassword);