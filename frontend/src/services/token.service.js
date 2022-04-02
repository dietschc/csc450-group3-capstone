// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - token.service.js
// March 29, 2022
// Last Edited (Initials, Date, Edits):

class TokenService {

    /**
     * This method can be used to retrieve the currently logged in user refresh token
     * 
     * @returns 
     */
    getLocalRefreshToken() {
        // Read redux store directly out of local storage
        const store = JSON.parse(localStorage.getItem('redux-store'));

        // Extract first user (users[0]) from array
        const [user] = store.users;

        return user?.auth.refreshToken;
    }

    /**
     * This method can be used to retrieve the currently logged in user local access token
     * 
     * @returns 
     */
    getLocalAccessToken() {
        // Read redux store directly out of local storage
        const store = JSON.parse(localStorage.getItem('redux-store'));

        // // Extract first user (users[0]) from array
        const [user] = store.users;

        return user?.auth.accessToken;
    }

    /**
    * This method returns the currently logged in user information
    * 
    * @returns 
    */
    getUser() {
        // Read redux store directly out of local storage
        const store = JSON.parse(localStorage.getItem('redux-store'));

        // Extract first user (users[0]) from array
        const [user] = store.users;

        return user;
    }

    /**
     * This is an outdated method to update the local access token
     * 
     * @param {*} token 
     */
    // updateLocalAccessToken(token) {
    //     // Read redux store directly out of local storage
    //     let store = JSON.parse(localStorage.getItem('redux-store'));

    //     // Extract first user (users[0]) from array
    //     let [user] = store.users;

    //     // Set the the new access token
    //     user.accessToken = token;
    //     user.firstName = "coleman";

    //     // Put the updated user object back in the store
    //     store.users[0] = user;

    //     console.log("update the store: ", store);

    //     // localStorage.setItem("user", JSON.stringify(user));
    //     localStorage.setItem('redux-store', JSON.stringify(store));
    // }

    /**
     * This is an outdated method to modify the state with an updated user
     * 
     * @param {*} user 
     */
    // setUser(user) {
    //     // console.log(JSON.stringify(user));

    //     // localStorage.setItem("redux-store.users[0]", JSON.stringify(user));
    //     // Read redux store directly out of local storage
    //     let store = JSON.parse(localStorage.getItem('redux-store'));

    //     // Set first user in users array to the value of user
    //     store.users[0] = user;

    //     console.log("update the store: ", store);

    //     // localStorage.setItem("user", JSON.stringify(user));
    //     localStorage.setItem('redux-store', JSON.stringify(store));
    // }

}

export default new TokenService();
