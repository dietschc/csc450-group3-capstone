// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - CheckLogin.js
// February 26, 2022
// Last Edited (Initials, Date, Edits):

/**
 * Simple method to check if a user is logged in, works by importing
 * the module into a view with the users.state loaded from redux. Then
 * you just pass the copy of the users array here to check for a login.
 * 
 * @returns 
 */
export const checkLogin = (users) => {
    if (users.length > 0 && users[0].isLoggedIn === true) {
        // console.log("Not Undefined and Not Null " + users[0].isLoggedIn);
        return true;
    } else {
        // console.log('Undefined or Null')
        return false;
    }
}