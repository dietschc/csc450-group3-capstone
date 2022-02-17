// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - messages.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/16/2022, Added in basic redux actions)

// Using React library in order to build components 
// for the app and importing needed components
import { v4 } from 'uuid';
import C from '../constants';

/**
 * React Redux reducer that will add a new message to state.
 * 
 * @param {*} toUserId 
 * @param {*} fromUserId 
 * @param {*} message 
 * @returns 
 */
export const addMessage = (toUserId, fromUserId, message) => ({
    type: C.ADD_MESSAGE,
    id: v4(),
    userMessage: {
        id: v4(),
        to: toUserId,
        from: fromUserId
    },
    message: message,
    timeStamp: new Date()
})

/**
 * React Redux reducer that will delete all messages from state.
 * 
 * @returns 
 */
export const deleteAllMessages = () => ({
    type: C.DELETE_ALL_MESSAGES
})

/**
 * React Redux reducer that will delete a message with the 
 * parameter id.
 * 
 * @param {*} id 
 * @returns 
 */
export const deleteMessage = (id) => ({
    type: C.DELETE_MESSAGE,
    id: id
})