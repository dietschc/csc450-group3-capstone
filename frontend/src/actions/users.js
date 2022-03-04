// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - users.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/16/2022, Added comments for actions)
//  (CPD, 2/22/2022, Added loginThunk)
//  (CPD, 2/26/2022, Added updateUserThunk and edited updateUser to destructure parameters)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';
import UserDataService from "../services/user.service";

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
    city, zip, state, userEmail, userPassword) => async dispatch => {
        /**
         * Call and await the user data service create method, passing the parameters and storing the 
         * results in a constant.
         */
        await UserDataService.create({
            userName, firstName, lastName, address, city, zip, state, userEmail, userPassword
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

// export const addUserThunk = (
//     userName, firstName, lastName, address,
//     city, zip, state, userEmail, userPassword) => async dispatch => {
//         try {

//             /**
//              * Call and await the user data service create method, passing the parameters and storing the 
//              * results in a constant.
//              */
//             const res = await UserDataService.create({
//                 userName, firstName, lastName, address, city, zip, state, userEmail, userPassword
//             });

//             const result = { ...res.data.newUser, ...res.data.newAddress, ...res.data.newAuth }
//             /**
//              * Dispatch result data to reducer which extracts values like userId, and authId from the res.data
//              * and loads that into state.
//              */
//             dispatch(addUser(result))

//             return Promise.resolve(result);
//         } catch (err) {
//             return Promise.reject(err);
//         }
//     };

/**
 * React Redux action will add a new user to state.
 * 
 * @param {*} param0 
 * @returns 
 */
export const addUser = ({ userId, userName,
    firstName, lastName, address, addressId, authId,
    city, state, zip, userEmail, permissionId, userPassword }) => ({
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
                id: permissionId,
                permissionName: "general"
            },
            password: userPassword,
            history: {
                id: v4(),
                created: new Date(),
                modified: ""
            }
        },
        email: userEmail,
        isLoggedIn: false
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
export const updateUser = ({id, userName, firstName, lastName,
    address, city, state, zip, email, password}) => ({
        type: C.UPDATE_USER,
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: {
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        auth: {
            userName: userName,
            password: password,
            history: {
                modified: new Date()
            }
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
            // Dispatch userId to add user state action
            return dispatch(addUser(result));
        })

        .then(res => {
            // console.log("res data: ", res);

            // Dispatch userId (now stored in id) to login state action
            return dispatch(login(res.id));
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