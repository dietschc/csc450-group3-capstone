// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/16/2022, Added comments for actions)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';

// Use constants to build actions below. Still looking into 
// correct file structure

/**
 * React Redux action will add a new user to state.
 * 
 * @param {*} userName 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} address 
 * @param {*} city 
 * @param {*} state 
 * @param {*} zip 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
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

/**
 * React Redux action that will delete a user from state 
 * by user Id.
 * 
 * @param {*} userId 
 * @returns 
 */
export const deleteUser = (userId) => ({
    type: C.DELETE_USER,
    id: userId
})

/**
 * React Redux action that will delete all users from state.
 * 
 * @returns 
 */
export const deleteAllUsers = () => ({
    type: C.DELETE_ALL_USERS
})

/**
 * React Redux action that will update a user in state with 
 * the matching userId.
 * 
 * @param {*} userId 
 * @param {*} userName 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} address 
 * @param {*} city 
 * @param {*} state 
 * @param {*} zip 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
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

/**
 * React Redux action that add a friend for a user with 
 * the matching userId.
 * 
 * @param {*} userId 
 * @param {*} friendId 
 * @param {*} friendUserName 
 * @returns 
 */
export const addFriend = (userId, friendId, friendUserName) => ({
    type: C.ADD_FRIEND,
    userId: userId,
    id: friendId,
    userName: friendUserName
})

/**
 * React Redux action that will delete a friend from a 
 * users friends state with matching user and friend Id's.
 * 
 * @param {*} userId 
 * @param {*} friendId 
 * @returns 
 */
export const deleteFriend = (userId, friendId) => ({
    type: C.DELETE_FRIEND,
    userId: userId,
    id: friendId
})

/**
 * React Redux action that will delete all friends from a 
 * user state by user Id.
 * 
 * @param {*} userId 
 * @returns 
 */
export const deleteAllFriends = (userId) => ({
    type: C.DELETE_ALL_FRIENDS,
    id: userId
})

/**
 * React Redux action that log in a user with matching user Id.
 * 
 * @param {*} userId 
 * @returns 
 */
export const login = (userId) => ({
    type: C.LOGIN,
    id: userId,
    isLoggedIn: true
})

/**
 * React Redux action that log out a user with matching user Id.
 * 
 * @param {*} userId 
 * @returns 
 */
export const logout = (userId) => ({
    type: C.LOGOUT,
    id: userId,
    isLoggedIn: false
})

/**
 * React Redux action that will update a users permission based off 
 * of user Id.
 * 
 * @param {*} userId 
 * @param {*} permissionId 
 * @param {*} permissionName 
 * @returns 
 */
export const updatePermission = (userId, permissionId, permissionName) => ({
    type: C.UPDATE_PERMISSION,
    id: userId,
    permissionId: permissionId,
    permissionName: permissionName
})