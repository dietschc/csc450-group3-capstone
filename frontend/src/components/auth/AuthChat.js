// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AuthChat.js
// March 22, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from 'react-redux';

/**
 * AuthAccount wrapper will only allow the component to be displayed if 
 * there is a use and they are logged in. On successful login it will then 
 * take the user back to the original page they were trying to access.
 * 
 * @param {*} props 
 * @returns 
 */
function AuthChat(props) {
    const { users, children } = props;
    const location = useLocation();

    return (users.length > 0 && (users[0].isLoggedIn && users[0]?.auth?.permission?.permissionName === "admin") ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>);
  }

  // Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users]
  });
  
// Exporting the component
export default connect(mapStateToProps, null)(AuthChat);