// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - token.service.js
// March 29, 2022
// Last Edited (Initials, Date, Edits):

class TokenService {

    getLocalRefreshToken() {
        // Read redux store directly out of local storage
        const store = JSON.parse(localStorage.getItem('redux-store'));

        // Extract first user (users[0]) from array
        const [user] = store.users;

        return user?.refreshToken;
    }

    getLocalAccessToken() {
        // Read redux store directly out of local storage
        const store = JSON.parse(localStorage.getItem('redux-store'));

        // // Extract first user (users[0]) from array
        const [user] = store.users;

        return user?.accessToken;
    }

    updateLocalAccessToken(token) {
        // Read redux store directly out of local storage
        let store = JSON.parse(localStorage.getItem('redux-store'));

        // Extract first user (users[0]) from array
        const [user] = store.users;

        user.accessToken = token;
        user.firstName = "coleman";

        store.users[0] = user;

        console.log("update the store: ", store);

        // localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('redux-store', JSON.stringify(store));
    }

    getUser() {
        // Read redux store directly out of local storage
        const store = JSON.parse(localStorage.getItem('redux-store'));

        // Extract first user (users[0]) from array
        const [user] = store.users;

        return user;
    }

    setUser(user) {
        // console.log(JSON.stringify(user));

        // localStorage.setItem("redux-store.users[0]", JSON.stringify(user));
        // Read redux store directly out of local storage
        let store = JSON.parse(localStorage.getItem('redux-store'));

        // Set first user in users array to the value of user
        store.users[0] = user;

        console.log("update the store: ", store);

        // localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem('redux-store', JSON.stringify(store));
    }

}

export default new TokenService();
