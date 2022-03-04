// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';
import FriendDataService from "../services/friend.service";
import { formatDBFriendFind } from '../helperFunction/actionHelpers';
import { addFriend } from './users';

/**
 * Adds a friend to the database then to the user friend list in state.
 * 
 * @param {*} friendOneId 
 * @param {*} friendTwoId 
 * @returns 
 */
export const addFriendThunk = (friendOneId, friendTwoId) => async dispatch => {
        /**
         * Call and await the user data service create method, passing the parameters and storing the 
         * results in a constant.
         */
        await FriendDataService.create(
            friendOneId, friendTwoId
        )
            .then(friend => {
                console.log("data: ", friend.data);

                // This combines the 3 JSON objects into a single object
                const friendData = formatDBFriendFind(friend)

                console.log("FORMATTED DATA", friendData)
                dispatch(addFriend(friendData))
            })
            .catch(err => {
                console.log(err)
            })
    }