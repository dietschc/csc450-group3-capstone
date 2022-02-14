// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - index.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';

// Use constants to build actions below

// This action will add a new user to state
export const addUser = (userName, 
    firstName, lastName, address, 
    city, state, zip, email, password) => ({
        type: C.ADD_USER,
        id: v4(),
        firstName: firstName,
        lastName: lastName,
        address: {
            id: v4(),
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        auth: {
            id: v4(),
            userName: userName,
            permission: {
                id: 0,
                permissionName: "general"
            },
            password: password,
            history: {
                id: v4(),
                created: new Date(),
                modified: ""
            }
        },
        email: email,
        isLoggedIn: false
})