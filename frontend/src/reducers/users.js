// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/14/2022, Wrote reducer to add a user to users)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';

// The users reducer will allow the users [] state to be 
// altered
export const users = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER:
            return [
                ...state,
                user({}, action)
            ]
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
                isLoggedIn: action.isLoggedIn
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
                history: history({}, action)
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
        default:
            return state;
    }
}

// The friend reducer will allow the friend {} state to be 
// altered
export const friend = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}