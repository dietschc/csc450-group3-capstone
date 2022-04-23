// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - messages.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/16/2022, Added in basic redux actions)
//  (DAB, 3/14/2022, Added findAllAfterDateOffsetLimitThunk to search 
//  for messages after the createdAt date)
//  (DAB, 3/15/2022, Altered the findAllAfterDateOffsetLimitThunk to 
//  return results based off a messageId )
//  (DAB, 3/28/2022, findAllAfterDateOffsetLimitThunk now checks 
//  that the result data is not already in state before adding)
//  (DAB, 3/28/2022, Updated the service name for findAllAfterDateOffsetLimit 
//  to describe its behavior of findAllByIdOffsetLimit)
//  (DAB, 4/04/2022, Added isLoading to findByConversationIdOffsetLimitThunk)
//  (DAB, 4/04/2022, Organized code)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import MessageDataService from '../services/message.service';
import { endLoadingMessages, startLoadingMessages } from './isLoading';


/************************************ REDUX THUNK ACTIONS ***********************************/


/**
 * Thunk that downloads conversations based on the user IDs of both participants
 * 
 * @param {*} userToId 
 * @param {*} userFromId 
 * @returns 
 */
export const findByConversationIdOffsetLimitThunk =
    (userToId, userFromId, offset, limit) => async (dispatch) => {
        // Setting isLoadingMessages to true
        await dispatch(await startLoadingMessages());

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

        // Setting isLoadingMessages to false
        dispatch(endLoadingMessages());
    }


/**
* The findAllAfterDateOffsetLimitThunk will find all messages after the messageId given 
* the userToId and userFromId. It will then return results up to the specified offset and limit 
* then add results to state.
* 
* @param {*} messageId 
* @param {*} userToId 
* @param {*} userFromId 
* @param {*} offset 
* @param {*} limit 
* @returns 
*/
export const findAllByIdOffsetLimitThunk =
    (messageId, userToId, userFromId, offset, limit) => async (dispatch, getState) => {
        // Attempting to retrieve messages from the database
        const isMessages = await MessageDataService.findAllByIdOffsetLimit(messageId, userToId, userFromId, offset, limit)
            .then((res) => {
                // If a result was found it is ordered and added to state
                if (res.data.length > 0) {
                    // Destructuring messages from state
                    const { messages } = getState();

                    // Assigning filteredData to the results
                    let filteredResults = res.data;

                    // If there are messages in the raw data will be filtered to exclude 
                    // any possible duplicate messages
                    if (messages.length > 0) {
                        // Applying a filter to the raw data
                        filteredResults = res.data.filter(message => {
                            // Checking if the raw data matches any in state. If it does not match any, it 
                            // passes the filter and will be added to state
                            if ((messages.filter(stateMessage => stateMessage.id === message.messageId).length <= 0)) {

                                // Returning the message raw data to be added to state
                                return message;
                            }
                        });
                    }

                    // The data order will be reversed and then added to state one at 
                    // at time
                    filteredResults.reverse().forEach(e => {
                        // Prepping the data for the dispatch
                        const newMessage = {
                            ...e,
                            ...e.conversation
                        }

                        // Dispatch to add each message to state
                        dispatch(addMessage(newMessage));
                    });
                    return true;
                }
                else {
                    return false;
                }
            })
            .catch((err) => {
                // Errors will be logged
                console.log(err);
                return false;
            });

        // Returning if the query was a success or not
        return isMessages;
    }


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


/************************************ REACT REDUX ACTIONS ***********************************/


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
});


/**
 * React Redux reducer that will delete all messages from state.
 * 
 * @returns 
 */
export const deleteAllMessages = () => ({
    type: C.DELETE_ALL_MESSAGES
});


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
});