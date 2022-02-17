// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - messages.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';

// The messages reducer will allow the messages [] state to be 
// altered
export const messages = (state = [], action) => {
    switch (action.type) {
        case C.ADD_MESSAGE:
            return [
                ...state,
                message({}, action)
            ]
        case C.DELETE_ALL_MESSAGES:
            return []
        case C.DELETE_MESSAGE:
            return state.filter((currentMessage) => currentMessage.id !== action.id)
        default:
            return state;
    }
}

// The messages reducer will allow the messages {} state to be 
// altered
export const message = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_MESSAGE:
            return {
                id: action.id,
                userMessage: userMessage({}, action),
                message: action.message,
                timeStamp: action.timeStamp
            }
        default:
            return state;
    }
}

// The userMessage reducer will allow the userMessage {} state to be 
// altered
export const userMessage = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_MESSAGE:
            return {
                id: action.userMessage.id,
                to: action.userMessage.to,
                from: action.userMessage.from
            }
        default:
            return state;
    }
}