// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - auth-header.js
// March 28, 2022
// Last Edited (Initials, Date, Edits):

export default function authHeader() {
    // Read redux store directly out of local storage
    const user = JSON.parse(localStorage.getItem('redux-store.users[0]'));
    
    // If this is a valid user with an access token
    if (user && user.accessToken) {
        // For Node.js Express back-end set the x-access-token value
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
