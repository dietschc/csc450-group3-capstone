// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AuthAdmin.js
// March 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/24/2022, Updated logic and added comments)

// Using React library in order to build components 
// for the app and importing needed components
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from 'react-redux';

/**
 * AuthAdmin wrapper will only allow the component to be displayed if 
 * a user is logged in has admin permission. If the conditions are not met they 
 * will be directed to the login page to use a different account.
 * 
 * @param {*} props 
 * @returns 
 */
function AuthAdmin(props) {
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
        // Checking if the user holds an admin permission
        const isAdmin = users[0]?.auth?.permission?.permissionName === 'admin';

        // true is returned if the user is logged in and false if not
        return isLoggedIn && isAdmin;
    }

    // If the authorization passes the page is displayed, else they are navigated to the login page
    return (checkAuthorization() ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />);
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users]
});

// Exporting the component
export default connect(mapStateToProps, null)(AuthAdmin);