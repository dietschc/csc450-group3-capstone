// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AuthChat.js
// March 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/24/2022, Added in authorization functionality)

// Using React library in order to build components 
// for the app and importing needed components
import React from "react";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * AuthChat wrapper will only allow the component to be displayed if 
 * there is a use and they are logged in and the friend in in their friend list state. 
 * If there friend is not in their friend list or they are not logged in, they will be 
 * navigated to the userDashboard page.
 * 
 * @param {*} props 
 * @returns 
 */
function AuthChat(props) {
    // Destructuring the users and children from state
    const { users, children } = props;
    // Extract friend ID from parameters
    const { id: friendId } = useParams();

    // The checkAuthorization method checks if a user is in state first. If the user 
    // is in state that user is checked to be logged in and have the param friendId in 
    // their friends list state. If all checks out true is returned
    const checkAuthorization = () => {
        // Checking the users state has a user
        if (users.length <= 0) {
            // If no users in state false is returned
            return false;
        }

        // Is the user logged in?
        const isLoggedIn = users[0]?.isLoggedIn;
        // Is the friend in the users friend list?
        const isFriend = users[0]?.friends.filter((friend) => friend.id === Number(friendId)).length > 0;

        // true is returned if both the user is logged in and has the param friendId in their friends list state
        return isLoggedIn && isFriend;
    }

    // If the authorization passes the page is displayed, else they are navigated to the userDashboard
    return (checkAuthorization() ? children : <Navigate to="/userDashboard" />);
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users]
});

// Exporting the component
export default connect(mapStateToProps, null)(AuthChat);