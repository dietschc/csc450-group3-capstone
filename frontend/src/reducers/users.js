// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/14/2022, Wrote reducer to add a user to users)
//  (DAB, 2/15/2022, Wrote redux reducers/actions for login, logout, friends, and remaining users)
//  (DAB, 2/16/2022, Wrote redux reducers/actions for permissions and tested)
//  (DAB, 3/06/2022, Added in DELETE_ADDITIONAL_USERS, took out the history state for user)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
// import { v4 } from 'uuid';

// The users reducer will allow the users [] state to be 
// altered
export const users = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER:
            return [
                ...state,
                user({}, action)
            ]
        case C.DELETE_ALL_USERS:
            return []
        case C.DELETE_ADDITIONAL_USERS:
            return state.filter((user, index) => index === 0)
        case C.DELETE_USER:
            return state.filter((user) => user.id !== action.id)
        case C.UPDATE_USER:
            return state.map((currentUser) => {
                if (currentUser.id === action.id) {
                    return user(currentUser, action)
                }
                else {
                    return currentUser
                }
            })
        case C.ADD_FRIEND:
            return state.map((currentUser) => {
                if (currentUser.id === action.userId) {
                    return user(currentUser, action)
                }
                else {
                    return currentUser
                }
            })
        case C.DELETE_ALL_FRIENDS:
            return state.map((currentUser) => {
                if (currentUser.id === action.id) {
                    return user(currentUser, action)
                }
                else {
                    return currentUser
                }
            })
            case C.DELETE_FRIEND:
                return state.map((currentUser) => {
                    if (currentUser.id === action.userId) {
                        return user(currentUser, action)
                    }
                    else {
                        return currentUser
                    }
                })
            case C.LOGIN:
                return state.map((currentUser) => {
                    if (currentUser.id === action.id) {
                        return user(currentUser, action)
                    }
                    else {
                        return currentUser
                    }
                })
            case C.LOGOUT:
                return state.map((currentUser) => {
                    if (currentUser.id === action.id) {
                        return user(currentUser, action)
                    }
                    else {
                        return currentUser
                    }
                })
            case C.UPDATE_PERMISSION:
                return state.map((currentUser) => {
                    if (currentUser.id === action.id) {
                        return user(currentUser, action)
                    }
                    else {
                        return currentUser
                    }
                })
        default:
            return state;
    }
}

// The user reducer will allow the user {} state to be 
// altered
export const user = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER:
            return {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                friends: friends([], action),
                address: address({}, action),
                auth: auth({}, action),
                isLoggedIn: action.isLoggedIn,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case C.UPDATE_USER:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                address: address(state.address, action),
                auth: auth(state.auth, action)
            }
        case C.ADD_FRIEND:
            return {
                ...state,
                friends: friends(state.friends, action)
            }
        case C.DELETE_ALL_FRIENDS:
            return {
                ...state,
                friends: friends([], action)
            }
        case C.DELETE_FRIEND:
            return {
                ...state,
                friends: friends(state.friends, action)
            }
        case C.LOGIN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        case C.LOGOUT:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        case C.UPDATE_PERMISSION:
            return {
                ...state,
                auth: auth(state.auth, action)
            }
        default:
            return state;
    }
}

// The auth reducer will allow the auth {} state to be 
// altered
export const auth = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER:
            return {
                id: action.id,
                userName: action.auth.userName,
                permission: permission({}, action),
                password: action.auth.password,
                createdAt: action.auth.createdAt,
                modifiedAt: action.auth.modifiedAt
            }
        case C.UPDATE_USER:
            return {
                ...state,
                userName: action.auth.userName,
                password: action.auth.password,
                modifiedAt: action.auth.modifiedAt
            }
        case C.UPDATE_PERMISSION:
            return {
                ...state,
                permission: permission(state.permission, action)
            }
        default:
            return state;
    }
}

// The permission reducer will allow the permission {} state to be 
// altered
export const permission = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER:
            return {
                id: action.auth.permission.id,
                permissionName: action.auth.permission.permissionName
            }
        case C.UPDATE_PERMISSION:
            return {
                id: action.permissionId,
                permissionName: action.permissionName
            }
        default:
            return state;
    }
}

// The history reducer will allow the history {} state to be 
// altered
export const history = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER: 
            return {
                id: action.id,
                created: action.auth.history.created,
                modified: action.auth.history.modified
            }
        case C.UPDATE_USER:
            return {
                ...state,
                modified: action.auth.history.modified
            }
        default:
            return state;
    }
}

// The address reducer will allow the address {} state to be 
// altered
export const address = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER:
            return {
                id: action.address.id,
                address: action.address.address,
                city: action.address.city,
                state: action.address.state,
                zip: action.address.zip
            }
        case C.UPDATE_USER:
            return {
                ...state,
                address: action.address.address,
                city: action.address.city,
                state: action.address.state,
                zip: action.address.zip
            }
        default:
            return state;
    }
}

// The friends reducer will allow the friends [] state to be 
// altered
export const friends = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER:
            return []
        case C.ADD_FRIEND:
            console.log("STATE IN FRIEND", state)
            return [
                ...state,
                friend({}, action)
            ]
        case C.DELETE_ALL_FRIENDS:
            return []
        case C.DELETE_FRIEND:
            return state.filter((friend) => friend.id !== action.id)
        default:
            return state;
    }
}

// The friend reducer will allow the friend {} state to be 
// altered
export const friend = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_FRIEND:
            return {
                id: action.id,
                userName: action.userName
            }
        default:
            return state;
    }
}