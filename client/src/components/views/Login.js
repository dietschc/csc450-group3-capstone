// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Login.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    return (
        <div className="login">
            <h1>
                Welcome to the Login Page!
            </h1>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

// Exporting the component
export default Login;