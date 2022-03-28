// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AuthAccount.js
// March 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/24/2022, Testing and added comments)

// Using React library in order to build components 
// for the app and importing needed components
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from 'react-redux';

/**
 * AuthLoggedIn wrapper will only allow the component to be displayed if 
 * the user is logged in. If they are not logged in then the user will be redirected 
 * to the login page to complete the log in process then returned to the original 
 * location to continue browsing.
 * 
 * @param {*} props 
 * @returns 
 */
function AuthLoggedIn(props) {
    // Destructuring users and children from props
    const { users, children } = props;
    // Creating a location object to hold this location in the react router
    const location = useLocation();

    // The checkAuthorization method checks that there is a user in state and that 
    // the user is logged in. True is returned if both of these conditions are true
    const checkAuthorization = () => {
        // If users is undefined false is returned
        if (!users) {
            return false;
        }

        // Checking that users has a user and that they are logged in
        const isLoggedIn = users.length > 0 && users[0]?.isLoggedIn;

        // true is returned if the user is logged in and false if not
        return isLoggedIn;
    }

    // If there are users in state and that user is logged in the page will be displayed, else they 
    // will be navigated to the login page then redirected back here after logging in
    return (checkAuthorization() ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />);
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users]
});

// Exporting the component
export default connect(mapStateToProps, null)(AuthLoggedIn);