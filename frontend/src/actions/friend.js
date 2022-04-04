// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/04/2022, Organized code)

// Using React library in order to build components
// for the app and importing needed components
import FriendDataService from "../services/friend.service";
import { addFriend, deleteFriend } from "./users";


/************************************ REDUX THUNK ACTIONS ***********************************/


/**
 * Adds a friend to the database then to the user friend list in state.
 *
 * @param {*} friendOneId
 * @param {*} friendTwoId
 * @returns
 */
export const addFriendThunk =
    (friendOneId, friendTwoId) => async (dispatch) => {
        /**
         * Call and await the user data service create method, passing the parameters and storing the
         * results in a constant.
         */
        await FriendDataService.create({ friendOneId, friendTwoId })
            .then((friend) => {
                // Variable that will indicate if the friend was added to the database
                const isFriendAdded = !friend.data.message ? true : false;

                // If the friend was added to the database it is also added to state
                if (isFriendAdded) {
                    dispatch(addFriend(friend.data));
                }
                // Else a message is returned indicating the friend was not added to state
                else {
                    console.log("Friend was not added to state");
                }
            })
            .catch((err) => {
                // Errors will be logged
                console.log(err);
            });
    };


/**
 * Deletes a friend from the database and state.
 * 
 * @param {*} id 
 * @param {*} friendId 
 * @returns 
 */
export const deleteFriendThunk =
    (id, friendId) => async dispatch => {
        /**
         * Call and await the user data service create method, passing the parameters and storing the
         * results in a constant.
         */
        //  console.log("from thunk: ", data);
        await FriendDataService.delete(id, friendId)
            .then((friend) => {
                // console.log("friend return: ", friend);

                // Variable that will indicate if the friend was added to the database
                const isFriendDeleted = friend.data.message.includes("success") ? true : false;
                // If the friend was added to the database it is also added to state
                if (isFriendDeleted) {
                    const userId = id;
                    dispatch(deleteFriend(userId, friendId));
                }
                // Else a message is returned indicating the friend was not added to state
                else {
                    console.log("Friend was not deleted from state");
                }
            })
            .catch((err) => {
                // Errors will be logged
                console.log(err);
            });
    };
