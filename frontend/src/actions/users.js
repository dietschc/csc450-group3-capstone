// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';

// Use constants to build actions below. Still looking into 
// correct file structure

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

export const deleteUser = (userId) => ({
    type: C.DELETE_USER,
    id: userId
})

export const deleteAllUsers = () => ({
    type: C.DELETE_ALL_USERS
})

export const updateUser = (userId, userName, firstName, lastName, address, city, state, zip, email, password) => ({
    type: C.UPDATE_USER,
    id: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: {
        address: address,
        city: city,
        state: state,
        zip: zip
    },
    auth: {
        userName: userName,
        password: password,
        history: {
            modified: new Date()
        }
    }
})

export const addFriend = (userId, friendId, friendUserName) => ({
    type: C.ADD_FRIEND,
    userId: userId,
    id: friendId,
    userName: friendUserName
})

export const deleteFriend = (userId, friendId) => ({
    type: C.DELETE_FRIEND,
    userId: userId,
    id: friendId
})

export const deleteAllFriends = (userId) => ({
    type: C.DELETE_ALL_FRIENDS,
    id: userId
})

export const login = (userId) => ({
    type: C.LOGIN,
    id: userId,
    isLoggedIn: true
})

export const logout = (userId) => ({
    type: C.LOGOUT,
    id: userId,
    isLoggedIn: false
})