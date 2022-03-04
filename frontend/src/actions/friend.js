// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components
// for the app and importing needed components
import C from "../constants";
import FriendDataService from "../services/friend.service";
import { formatDBFriendFind } from "../helperFunction/actionHelpers";
import { addFriend } from "./users";

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
