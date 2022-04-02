// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - EditPassword.js
// April 2, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components such as State where variables are stored
import React, { useState } from 'react';
import { connect } from 'react-redux';
// Use to navigate back to the Dashboard page after successful update
import { useNavigate } from 'react-router-dom';
// Various containers from bootstrap to build the form
import { Form, Container, Button, FloatingLabel } from 'react-bootstrap';
// Middleware to actually update the password
import { editPasswordThunk } from '../../actions/users';


function EditPassword(props)
{
    // User array and Thunk variables.
    const { users, editPasswordThunk } = props;

    // Variables for old password and new, both set to empty to state
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    // Username to match the update pulled from the user array
    const userName = useState(users.length > 0 ? users[0].auth.userName : "");

    // Navigate command for shorthand
    const navigate = useNavigate();

    // Dynamically update the oldPassword variable as entry typed in
    const onChangeOldPassword = e =>{
        const {value, maxLength} = e.target;
        const oldPassword = value.slice(0, maxLength);
        setOldPassword(oldPassword);
    }

    // Dynamically update the newPassword variable as entry typed in
    const onChangeNewPassword = e =>
    {
        const {value, maxLength} = e.target;
        const newPassword = value.slice(0, maxLength);
        setNewPassword(newPassword);
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        // After adjusting the password, if successful move to the Dashboard else stay on screen
        await editPasswordThunk(userName, oldPassword, newPassword)
        .then(res => {
            if (res[0])
            {
                setTimeout(() => { navigate("../userDashboard") }, 500);
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    return(
        <Container fluid className="text-muted login" style={{ maxWidth: "500px" }}>
            <Container className="mt-2" as="header">
                <h1>Change Password</h1>
            </Container>
            <Container fluid as="main" className="mt-5 justify-content-center align-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Floating className="mb-3 justify-content-center">
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
                    </Form.Floating>
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
                    <Form.Floating className="mb-3 justify-content-center">
                        <div className="d-flex justify-content-around pt-2 pb-5">
                            <Button type="submit" className="mr-1 w-25" variant="outline-primary">
                                Submit
                            </Button>
                        </div>
                    </Form.Floating>
                </Form>
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
// export default EditPassword;
export default connect(mapStateToProps, { editPasswordThunk })(EditPassword);