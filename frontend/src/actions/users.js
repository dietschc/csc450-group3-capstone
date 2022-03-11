// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/16/2022, Added comments for actions)
//  (CPD, 2/22/2022, Added loginThunk)
//  (CPD, 2/26/2022, Added updateUserThunk and edited updateUser to destructure parameters)
//  (CPD, 3/1/2022, Fixed bug where state and zip are swapped when creating a new user)
//  (DAB, 3/06/2022, Added in findByUserNameThunk and updated addUser to not have a history 
//  table)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';
import UserDataService from "../services/user.service";
import { formatDBUserFind } from '../helperFunction/actionHelpers';
import AuthenticationDataService from '../services/authentication.service';

/**
 * The addUser action is called from components/views/EditAccount.js in saveAccount. It passes
 * parameters obtained from the text input form fields on the frontend to the backend via
 * the user data service.
 * 
 * @param {*} userName 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} address 
 * @param {*} city 
 * @param {*} zip 
 * @param {*} state 
 * @param {*} userEmail 
 * @param {*} userPassword 
 * @returns 
 */
export const addUserThunk = (
    userName, firstName, lastName, address,
    city, state, zip, userEmail, userPassword) => async dispatch => {
        /**
         * Call and await the user data service create method, passing the parameters and storing the 
         * results in a constant.
         */
        await UserDataService.create({
            userName, firstName, lastName, address, city, state, zip, userEmail, userPassword
        })
            .then(res => {
                // console.log("data: ", res.data);

                // This combines the 3 JSON objects into a single object
                const result = { ...res.data.newUser, ...res.data.newAddress, ...res.data.newAuth }
                dispatch(addUser(result))
            })
            .catch(err => {
                console.log(err)
            })
}

/**
 * The updatePermissionThunk will update a users permission to the specified 
 * settings. It will update it both in state and the database.
 * 
 * @param {*} userId 
 * @param {*} data 
 * @returns 
 */
export const updatePermissionThunk = (userId, data) => async dispatch => {
    // Making the call to the service to request an update to the database
    await AuthenticationDataService.updateByUserId(userId, data)
    .then(res => {
        // If there is a response the state will be updated
        if (res) {
            // Destructuring out permissionId and permission name from the data
            const { permissionId, permissionName } = data;

            // Dispatching the action to update state permission
            dispatch(updatePermission(userId, permissionId, permissionName))
        }
        else {
            console.log("Permission was not updated")
        }
    })
    .catch(err => {
        // If there is an error it will be logged
        console.log(err)
    })
}

/**
 * The deleteUserThunk will delete a user from both the database 
 * and state by referencing the userId.
 * 
 * @param {*} userId 
 * @returns 
 */
export const deleteUserThunk = (userId) => async dispatch => {
    // Making the call to the service to request the deletion of the user
    await UserDataService.delete(userId)
    .then(res => {
        // If there is a response the state will be updated
        if (res) {

            // Dispatching the action to delete the user from state
            dispatch(deleteUser(userId));
        }
    })
    .catch(err => {
        // If there is an error it will be logged
        console.log(err)
    })
}

/**
 * Searches the database by user name for all matching users up to the 
 * offset/limit. It will then add the results to state.
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @param {*} userName
 * @returns 
 */
 export const findByUserNameThunk = (offset, limit, userName) => async dispatch => {
    // The user database will be queried for all users within the 
    // parameter offset/limit that are like the userName
    await UserDataService.findByUserNameOffsetLimit(offset, limit, userName)
        .then(async res => {
            console.log(res);
            // If there is data in the query it is added to redux state
            if (res) {
                // Iterating through the restaurant data
                await res.data.map(user => {
                    // The user data is formatted to be added to redux state
                    const userData = formatDBUserFind(user);

                    // // Adding the user to redux state
                    dispatch(addUser(userData));

                    // Returning the user data
                    return userData;
                })
            }
        })
        .catch(err => {
            // If there is an error it will be logged
            console.log(err)
        })
}

/**
 * React Redux action will add a new user to state.
 * 
 * @param {*} param0 
 * @returns 
 */
export const addUser = ({ userId, userName,
    firstName, lastName, address, addressId, authId,
    city, state, zip, userEmail, permissionId, permissionName, 
    isLoggedIn, userPassword, createdAt, modifiedAt }) => ({
        type: C.ADD_USER,
        id: userId,
        firstName: firstName,
        lastName: lastName,
        address: {
            id: addressId,
            address: address,
            city: city,
            state: state,
            zip: zip,
        },
        auth: {
            id: authId,
            userName: userName,
            permission: {
                id: permissionId || 1,
                permissionName: permissionName || "member"
            },
            password: userPassword,
            createdAt: createdAt || new Date(),
            modifiedAt: modifiedAt || new Date()
        },
        email: userEmail,
        isLoggedIn: isLoggedIn || false
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
 * React Redux action that will delete all users but the main user 
 * at index 0
 * 
 * @returns 
 */
export const deleteAdditionalUsers = () => ({
    type: C.DELETE_ADDITIONAL_USERS
})

export const updateUserThunk = (id, data) => async dispatch => {
    /**
     * Call and await the user data service update method, passing the id and data
     */
    await UserDataService.update(id, data)
        .then(res => {
            const result = { id, ...data }
            console.log("result: ", result);
            dispatch(updateUser(result))
        })
        .catch(err => {
            console.log(err)
        })
}

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
export const updateUser = ({ id, userName, firstName, lastName,
    address, city, state, zip, userEmail, password }) => ({
        type: C.UPDATE_USER,
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
        address: {
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        auth: {
            userName: userName,
            password: password,
            modifiedAt: new Date()
            
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
export const addFriend = ({friendOneId, friendTwoId, userName}) => ({
    type: C.ADD_FRIEND,
    userId: friendOneId,
    id: friendTwoId,
    userName: userName
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
 * 
 * @param {*} userName 
 * @param {*} userPassword 
 * @returns 
 */
export const loginThunk = (userName, userPassword) => async dispatch => {
    /**
     * Call and await the user data service login method, passing the parameters and storing the 
     * results in res
     */
    return await UserDataService.login({ userName, userPassword })
        .then(res => {
            // console.log("res data: ", res);
            // Delete the current users in the Users state array
            dispatch(deleteAllUsers());
            const result = { ...res.data.getUser, ...res.data.getAddress, ...res.data.getAuth }
            const friends = [ ...res.data.friends ];

            // Return an array that contains the response from addUser in res[0]
            // and a copy of the friends array in res[1]
            return [dispatch(addUser(result)), friends];
        })
        .then(res => {
            // console.log("addfriend data: ", res[1]);

            // Add each friend to state
            res[1].forEach(e => {
                // console.log(e);
                
                const newFriend = { 
                    friendOneId: res[0].id, 
                    friendTwoId: e.userId, 
                    userName: e.userName
                }
                dispatch(addFriend(newFriend));
            });
            
            // Dispatch userId (now stored in id) to login state action
            return dispatch(login(res[0].id));
        })
        .catch(err => {
            console.log(err)
            return err;
        })
}

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