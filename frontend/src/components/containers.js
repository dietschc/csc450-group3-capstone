// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - containers.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

/**
 * 
 * THIS IS FOR POSSIBLE FUTURE IMPLEMENTATION OF USING CONTAINER COMPONENTS. 
 * NOT REQUIRED OR DETERMINED WILL BE USED.
 * 
 */

// Using React library in order to build components 
// for the app and importing needed components
import { connect } from 'react-redux';
import { Admin } from './views/Admin';
import { Chat } from './views/Chat';
import { EditAccount } from './views/EditAccount';
import { Login } from './views/Login';
import { Main } from './views/Main';
import { MainNav } from './views/MainNav';
import { Restaurant } from './views/Restaurant';
import { Review } from './views/Review';
import { Search } from './views/Search';
import { UserDashboard } from './views/UserDashboard';

// Test component
export const LoginUI = connect(
    null,
    null
)(Login);