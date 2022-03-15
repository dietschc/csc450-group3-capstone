// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - messages.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/16/2022, Added in basic redux actions)
//  (DAB, 3/14/2022, Added findAllAfterDateOffsetLimitThunk to search 
//  for messages after the createdAt date)

// Using React library in order to build components 
// for the app and importing needed components
import { v4 } from 'uuid';
import C from '../constants';
import MessageDataService from '../services/message.service';

/**
 * React Redux reducer that will add a new message to state.
 * 
 * @param {*} toUserId 
 * @param {*} fromUserId 
 * @param {*} message 
 * @returns 
 */
export const addMessage = ({ userToId, userFromId, message, conversationId, createdAt, messageId }) => ({
    type: C.ADD_MESSAGE,
    id: messageId,
    userMessage: {
        id: conversationId,
        to: userToId,
        from: userFromId
    },
    message: message,
    timeStamp: createdAt || new Date()
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


/**
 * Thunk that downloads conversations based on the user IDs of both participants
 * 
 * @param {*} userToId 
 * @param {*} userFromId 
 * @returns 
 */
export const findByConversationIdOffsetLimitThunk =
    (userToId, userFromId, offset, limit) => async (dispatch) => {


        await MessageDataService.findByConversationIdOffsetLimit(userToId, userFromId, offset, limit)
            .then((res) => {

                // console.log("res: ", res.data);
                const messageData = res.data;

                // Add each friend from the array
                messageData.reverse().forEach(e => {
                    // console.log("e: ", e);

                    //({ toUserId, fromUserId, message }) 
                    const newMessage = {
                        ...e,
                        ...e.conversation
                    }

                    // Dispatch to add each message to state
                    dispatch(addMessage(newMessage));
                });
            })
            .catch((err) => {
                // Errors will be logged
                console.log(err);
            });
    };


/**
 * The findAllAfterDateOffsetLimitThunk will find all messages after the createdAt date given 
 * the userToId and userFromId. It will then return results up to the specified offset and limit 
 * then add results to state.
 * 
 * @param {*} createdAt 
 * @param {*} userToId 
 * @param {*} userFromId 
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
export const findAllAfterDateOffsetLimitThunk =
(createdAt, userToId, userFromId, offset, limit) => async (dispatch) => {
    await MessageDataService.findAllAfterDateOffsetLimit(createdAt, userToId, userFromId, offset, limit)
        .then((res) => {
            // If a result was found it is ordered and added to state
            if (res) {
                // Grabbing the data part of the response
                const messageData = res.data;

                // The data order will be reversed and then added to state one at 
                // at time
                messageData.reverse().forEach(e => {
                    // Prepping the data for the dispatch
                    const newMessage = {
                        ...e,
                        ...e.conversation
                    }

                    // Dispatch to add each message to state
                    dispatch(addMessage(newMessage));
                });
            }
            else {
                // If no data was found it is logged in the console
                console.log("No new messages found")
            }
        })
        .catch((err) => {
            // Errors will be logged
            console.log(err);
        });
};


/**
 * The sendMessageThunk will add a message to both state and the 
 * database given a userToId, userFromId, and a message.
 * 
 * @param {*} userToId 
 * @param {*} userFromId 
 * @param {*} message 
 * @returns 
 */
export const sendMessageThunk =
    (userToId, userFromId, message) => async (dispatch) => {

        // Call message data service to create a new message
        await MessageDataService.create({ userToId, userFromId, message })
            .then((res) => {
                const newMessage = {
                    ...res.data,
                    ...res.data.conversation
                }

                // Dispatch to add each message to state
                dispatch(addMessage(newMessage));

            })
            .catch((err) => {
                // Errors will be logged
                console.log(err);
            });
    };
