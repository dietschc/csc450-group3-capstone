// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - EditPassword.js
// April 2, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/02/2022, Added in confirm password and implemented the functionality
//  for admins to edit passwords)
//  (CPD, 4/14/2022, Added isLoading state and spinner code to the submit button)
//  (DAB, 4/14/2022, Added form validation)

// Using React library in order to build components
// for the app and importing needed components such as State where variables are stored
import React, { useState } from "react";
import { connect } from "react-redux";
// Use to navigate back to the Dashboard page after successful update
import { useNavigate, useParams } from "react-router-dom";
// Various containers from bootstrap to build the form
import {
    Form,
    Container,
    Button,
    FloatingLabel,
    Alert,
    Spinner,
} from "react-bootstrap";
// Middleware to actually update the password
import {
    updatePasswordThunk,
    updatePasswordSecureThunk,
} from "../../actions/users";
import FormContainer from "../template/FormContainer";

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
    const { users, updatePasswordThunk, updatePasswordSecureThunk, isLoading } =
        props;
    // Destructuring out the param if there is one
    const { userId } = useParams();

    // Variables for old password and new, both set to empty to state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateErrorMessage, setUpdateErrorMessage] = useState("");
    // The formError local state will hold any errors found in the
    // form and their error message
    const [formError, setFormError] = useState({});

    // Navigate command for shorthand
    const navigate = useNavigate();

    // The formErrorCheck will hold the logic for checking the
    // form for errors and return them as an object
    const formErrorCheck = () => {
        // Initial empty currentError object
        const currentError = {};

        // If the file size is greater than allowed a max file error
        // will be returned
        if (newPassword !== confirmPassword) {
            currentError.newPassword = `Passwords must match!`;
            currentError.confirmPassword = `Passwords must match!`;
        }

        // Returning the error found object to the caller
        return currentError;
    };


    // The handleSubmit function will verify the data is there to
    // update the passwords and attempt to update them
    const handleSubmit = async (e) => {
        // Preventing default form submission action
        e.preventDefault();

        // If there is not a current submission request loading
        if (!isLoading.isLoadingUsers) {
            // Checking if the form has any errors
            const currentFormError = formErrorCheck();

            // If the form has errors, the error messages are displayed
            if (Object.keys(currentFormError).length > 0) {
                setFormError(currentFormError);
            }
            // Else the form does not have errors so it
            // will submit
            else {
                // If there is not a userId param, then the logged in user password
                // will be updated if they match
                if (!userId) {
                    // Attempting to update the password
                    const isPasswordUpdated =
                        await updatePasswordSecureThunk(
                            users[0].id,
                            oldPassword,
                            newPassword
                        );

                    if (isPasswordUpdated) {
                        // Successful update, navigating to dashboard
                        navigate("/userDashboard");
                    } else {
                        // Update failed. Though the error cannot be pinpointed 
                        // the user is given the most probable issues
                        setUpdateErrorMessage(
                            "Password failed to update, check current password"
                        );
                        setFormError({
                            ...formError,
                            oldPassword: `Verify you have entered the correct password`
                        });
                    }
                }
                // Else, an admin is logged in so the password will be updated
                // without providing the old password
                else {
                    // Attempting to update the password
                    const isPasswordUpdated = await updatePasswordThunk(
                        userId,
                        newPassword
                    );

                    if (isPasswordUpdated) {
                        // Successful update, navigating to dashboard
                        navigate(`/userDashboard/${userId}`);
                    } else {
                        // do something, update failed
                        setUpdateErrorMessage(
                            "Password failed to update, check userId"
                        );
                    }
                }
            }
        }
    };


    // Dynamically update the oldPassword variable as entry typed in
    const onChangeOldPassword = (e) => {
        // Getting old password off the form, formatting it, and 
        // assigning to oldPassword
        const { value, maxLength } = e.target;
        const oldPassword = value.slice(0, maxLength);
        setOldPassword(oldPassword);

        // If there was an error message, the message is reset
        if (updateErrorMessage) {
            setUpdateErrorMessage("");
        }

        // If the form had an error it is reset
        if (formError.oldPassword) {
            setFormError({
                ...formError,
                oldPassword: null,
            });
        }
    };


    // Dynamically update the newPassword variable as entry typed in
    const onChangeNewPassword = (e) => {
        const { value, maxLength } = e.target;
        const newPassword = value.slice(0, maxLength);
        setNewPassword(newPassword);

        // If there was an error message, the message is reset
        if (updateErrorMessage) {
            setUpdateErrorMessage("");
        }

        // If the form had an error it is reset
        if (formError.newPassword) {
            setFormError({
                ...formError,
                newPassword: null,
                confirmPassword: null,
            });
        }
    };


    // Dynamically update the confirmPassword variable as entry typed in
    const onChangeConfirmPassword = (e) => {
        const { value, maxLength } = e.target;
        const newPassword = value.slice(0, maxLength);
        setConfirmPassword(newPassword);

        // If there was an error message, the message is reset
        if (updateErrorMessage) {
            setUpdateErrorMessage("");
        }
        
        // If the form had an error it is reset
        if (formError.confirmPassword) {
            setFormError({
                ...formError,
                newPassword: null,
                confirmPassword: null,

            });
        }
    };

    return (
        <FormContainer>
            <Container className="mt-2" as="header">
                <h1>Change Password</h1>
            </Container>
            <Container
                fluid
                as="main"
                className="mt-5 justify-content-center align-center"
            >
                <Form onSubmit={handleSubmit}>
                    {!userId && (
                        <Form.Floating className="mb-3 justify-content-center">
                            <FloatingLabel
                                controlId="floatingOldPassword"
                                label="Old Password"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Old"
                                    required
                                    value={oldPassword}
                                    maxLength="64"
                                    onChange={onChangeOldPassword}
                                    isInvalid={!!formError.oldPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formError?.oldPassword}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Floating>
                    )}
                    <Form.Floating className="mb-3 justify-content-center">
                        <FloatingLabel
                            controlId="floatingNewPassword"
                            label="New Password"
                        >
                            <Form.Control
                                type="password"
                                placeholder="New"
                                required
                                value={newPassword}
                                maxLength="64"
                                onChange={onChangeNewPassword}
                                isInvalid={!!formError.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formError?.newPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Floating>
                    <Form.Floating className="mb-1 justify-content-center">
                        <FloatingLabel
                            controlId="floatingConfirmPassword"
                            label="Confirm Password"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Confirm"
                                required
                                value={confirmPassword}
                                maxLength="64"
                                onChange={onChangeConfirmPassword}
                                isInvalid={!!formError.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formError?.confirmPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Floating>
                    <Form.Floating className="mb-3 justify-content-center">
                        <div className="d-flex flex-column flex-sm-row justify-content-center pt-3">
                            <Button type="submit" style={{ minWidth: "10rem" }}>
                                {isLoading.isLoadingUsers ? (
                                    <Spinner
                                        as="span"
                                        variant="light"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        animation="border"
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </Form.Floating>
                    {updateErrorMessage && (
                        <Alert className="mb-0 text-center mt-1" variant="danger">
                            {updateErrorMessage}
                        </Alert>
                    )}
                </Form>
            </Container>
        </FormContainer>
    );
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users],
    isLoading: { ...state.isLoading },
});

// Exporting the component
// export default EditPassword;
export default connect(mapStateToProps, {
    updatePasswordThunk,
    updatePasswordSecureThunk,
})(EditPassword);
