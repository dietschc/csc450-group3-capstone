// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Admin.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/10/2022, Added in basic Layout and functionality)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)
//  (DAB, 03/06/2022, Added redux connect, state to props, and Searches functional)
//  (DAB, 03/07/2022, Confirm modals are added for all crit operations)
//  (DAB, 04/03/2022, Added in unBan functionality for admins, and took out the 
//  ability for admins to ban other admins)
//  (DAB, 04/04/2022, Added Spinners for database load in and changed it so that 
//  search button does not activate if there is already an html request in)
//  (DAB, 04/11/2022, Adding the ability for an admin to grant and remove admin 
//  privileges to other admins)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import XLContainer from '../template/XLContainer';
import RestaurantEditItem from '../subComponent/RestaurantEditItem';
import UserEditItem from '../subComponent/UserEditItem';
import {
    findByRestaurantNameThunk,
    deleteAllRestaurants,
    deleteRestaurantThunk
} from '../../actions/restaurants';
import {
    deleteAdditionalUsers,
    findByUserNameThunk,
    updatePermissionThunk,
    deleteUserThunk
} from '../../actions/users';
import C from '../../constants';
import BanUserConfirm from '../modal/BanUserConfirm';
import UnBanUserConfirm from '../modal/UnBanUserConfirm';
import AdminUserConfirm from '../modal/AdminUserConfirm';
import UnAdminUserConfirm from '../modal/UnAdminUserConfirm';
import DeleteUserConfirm from '../modal/DeleteUserConfirm';
import DeleteRestaurantConfirm from '../modal/DeleteRestaurantConfirm';
import AdminSearchForm from '../form/AdminSearchForm';
import ThemedSpinner from '../subComponent/ThemedSpinner';

/**
 * The Admin View allows users with admin permission to perform CRUD 
 * operations on users and restaurants. It operates as a search hub 
 * so the data can be found efficiently.
 * 
 * @param {*} props 
 * @returns 
 */
function Admin(props) {
    // Destructuring the data and functions to be used in the search
    const { users, restaurants, isLoading } = props;
    const {
        findByRestaurantNameThunk, deleteAllRestaurants,
        deleteRestaurantThunk, findByUserNameThunk,
        deleteAdditionalUsers, updatePermissionThunk,
        deleteUserThunk
    } = props;

    // Component specific states
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("user");
    const [isShowResults, setIsShowResults] = useState(false);

    // Modal specific states that allow the the modals to be hidden or displayed as 
    // well as the data in the modal to be stored in temp state for CRUD operations
    const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState(false);
    const [showAdminUserConfirm, setShowAdminUserConfirm] = useState(false);
    const [showUnAdminUserConfirm, setShowUnAdminUserConfirm] = useState(false);
    const [showBanUserConfirm, setShowBanUserConfirm] = useState(false);
    const [showUnBanUserConfirm, setShowUnBanUserConfirm] = useState(false);
    const [showDeleteRestaurantConfirm, setShowDeleteRestaurantConfirm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState();
    const [currentRestaurantId, setCurrentRestaurantId] = useState()

    // Creating a navigate instance to navigate the application to new routes
    const navigate = useNavigate();

    // The show and close handlers will either show or close their respective 
    // modals
    const showDeleteUserHandler = () => setShowDeleteUserConfirm(true);
    const closeDeleteUserHandler = () => setShowDeleteUserConfirm(false);
    const showAdminUserHandler = () => setShowAdminUserConfirm(true);
    const showUnAdminUserHandler = () => setShowUnAdminUserConfirm(true);
    const closeAdminUserHandler = () => setShowAdminUserConfirm(false);
    const closeUnAdminUserHandler = () => setShowUnAdminUserConfirm(false);
    const showBanUserHandler = () => setShowBanUserConfirm(true);
    const showUnBanUserHandler = () => setShowUnBanUserConfirm(true);
    const closeBanUserHandler = () => setShowBanUserConfirm(false);
    const closeUnBanUserHandler = () => setShowUnBanUserConfirm(false);
    const showDeleteRestaurantHandler = () => setShowDeleteRestaurantConfirm(true);
    const closeDeleteRestaurantHandler = () => setShowDeleteRestaurantConfirm(false);


    /****************************** USER METHODS ******************************************/


    // The adminHandler will display a modal verifying 
    // if the user should get admin privileges
    const adminHandler = (userId) => {
        // Setting the current id and showing the modal 
        // before allowing the action
        setCurrentUserId(userId);
        showAdminUserHandler();
    }


    // The adminUser method will update a users permission to admin in both state 
    // and the database
    const adminUser = () => {
        // Giving the user admin permissions in both state and the database with the 
        // ADMIN_USER_PERMISSION constant that holds the correct permissionId and 
        // permissionName
        updatePermissionThunk(currentUserId, C.ADMIN_USER_PERMISSION);
    }


    // The banHandler will display a modal verifying 
    // if the user should be banned
    const banHandler = (userId) => {
        // Setting the current id and showing the modal 
        // before allowing the action
        setCurrentUserId(userId);
        showBanUserHandler();
    }


    // The banUser method will update a users permission to banned in both state 
    // and the database
    const banUser = () => {
        // Banning a user in both state and the database with the BAN_USER_PERMISSION 
        // constant that holds the correct permissionId and permissionName
        updatePermissionThunk(currentUserId, C.BAN_USER_PERMISSION);
    }


    // The dashboardHandler will navigate the user to the dashboard 
    // for the selected userId
    const dashboardHandler = (userId) => {
        // Navigating the user to the search page and passing 
        // the needed search parameters
        navigate(`../userDashboard/${userId}`);
    }


    // The deleteUser method will delete a user from both state and the database
    const deleteUser = () => {
        deleteUserThunk(currentUserId);
    }


    // The unAdminHandler will display a modal verifying 
    // if the user should have their admin privileges removed
    const unAdminHandler = (userId) => {
        // Setting the current id and showing the modal 
        // before allowing the action
        setCurrentUserId(userId);
        showUnAdminUserHandler();
    }


    // The unAdminUser method will update a users permission to member in both state 
    // and the database
    const unAdminUser = () => {
        // Removing a users admin permission in both state and the database 
        // with the UN_ADMIN_USER_PERMISSION constant that holds the correct \
        // permissionId and permissionName
        updatePermissionThunk(currentUserId, C.UN_ADMIN_USER_PERMISSION);
    }


    // The unBanHandler will display a modal verifying 
    // if the user should be unBanned
    const unBanHandler = (userId) => {
        // Setting the current id and showing the modal 
        // before allowing the action
        setCurrentUserId(userId);
        showUnBanUserHandler();
    }


    // The unBanUser method will update a users permission to member in both state 
    // and the database
    const unBanUser = () => {
        // UnBanning a user in both state and the database with the UN_BAN_USER_PERMISSION 
        // constant that holds the correct permissionId and permissionName
        updatePermissionThunk(currentUserId, C.UN_BAN_USER_PERMISSION);
    }


    // The userDeleteHandler will display a modal verifying 
    // if the user should be deleted
    const userDeleteHandler = (userId) => {
        // Setting the current id and showing the modal 
        // before allowing the action
        setCurrentUserId(userId);
        showDeleteUserHandler();
    }


    // The userSearch method sets the Redux state to display search specific 
    // users
    const userSearch = async () => {
        // If search input is not an empty string the database will be 
        // queried for users matching the searchInput
        if (searchInput !== "") {
            // All except the logged in user is deleted from state
            await deleteAdditionalUsers();

            // Searching the database for the user name
            await findByUserNameThunk(0, 25, searchInput);
        }
    }


    /************************** RESTAURANT METHODS **************************************/


    // The deleteRestaurant method will delete a restaurant from both state and 
    // the database
    const deleteRestaurant = () => {
        // Deleting the restaurant from state and the database
        deleteRestaurantThunk(currentRestaurantId);
    }


    // The deleteRestaurantHandler will display a modal verifying 
    // if the restaurant should be deleted
    const deleteRestaurantHandler = (restaurantId) => {
        // Setting the current id and showing the modal 
        // before allowing the action
        setCurrentRestaurantId(restaurantId);
        showDeleteRestaurantHandler();
    }


    // The editRestaurantHandler will navigate the user to the edit restaurant
    // view for the selected restaurantId
    const editRestaurantHandler = (restaurantId) => {
        // Navigate to the edit restaurant page
        navigate(`../editRestaurant/${restaurantId}`);

    }


    // The restaurantSearch method sets the Redux state to display search specific 
    // restaurants
    const restaurantSearch = async () => {
        // If search input is not an empty string the database will be 
        // queried for restaurants matching the searchInput
        if (searchInput !== "") {
            // Current restaurants are deleted from state
            await deleteAllRestaurants();

            // Searching the database for the restaurant name
            await findByRestaurantNameThunk(0, 25, searchInput);
        }
    }


    // The viewRestaurantHandler will navigate the user to the restaurant
    // for the selected restaurantId
    const viewRestaurantHandler = (restaurantId) => {
        // Navigate to restaurant view
        navigate(`../restaurant/${restaurantId}`);
    }


    /************************** FORM HANDLERS **************************************/


    // The onChangeHandler handles the actions of the search bar radio buttons
    const onChangeHandler = (e) => {
        // Setting the state to the selected radio button
        setSearchType(e.target.value);
        // Setting the search results not to show
        setIsShowResults(false)
    }


    // This submit handler will handle the search form when submitted and assign the 
    // search input and search type to their respective state variables
    const searchSubmitHandler = (e) => {
        // Preventing default form action
        e.preventDefault();

        // Setting states to display the correct data (user or restaurant)
        setSearchInput(e.target.search.value)
        setIsShowResults(true);

        // If there is already a search running the user has to wait
        if (!isLoading?.isLoadingRestaurants && !isLoading?.isLoadingUsers) {
            // If the searchType is user the userSearch method  
            // will be called
            if (searchType === "user") {
                userSearch(searchInput)
            }
            // Else the restaurantSearch method will be called
            else {
                restaurantSearch(searchInput)
            }

            // Clearing the search input for added UX
            setSearchInput("");
        }
    }


    /************************** RENDER METHODS **************************************/


    // The searchList method will return either the User or Restaurant EditItem component 
    // based off the search input and search criteria. If there are no matches the user 
    // is notified
    const searchList = () => {
        // If the search is for users, they will be handled
        if (searchType === "user") {
            // Destructuring out the logged in user and displaying the rest
            const [loggedInUser, ...results] = users;

            // If there are were no results it is displayed on the screen
            if (results.length < 1) {
                return (isShowResults &&
                    <h4 className="text-center">
                        Sorry  no results found.
                    </h4>
                )
            }
            // Else there were results then they are mapped on the screen in their 
            // respective component
            else {
                return (
                    results.map((user) => (
                        <UserEditItem
                            key={user.id}
                            user={user}
                            dashboardHandler={dashboardHandler}
                            adminHandler={adminHandler}
                            unAdminHandler={unAdminHandler}
                            banHandler={banHandler}
                            unBanHandler={unBanHandler}
                            userDeleteHandler={userDeleteHandler} />
                    ))
                )
            }
        }
        // Else the restaurant search will be displayed
        else {
            // If there are were no results it is displayed on the screen
            if (restaurants.length < 1) {
                return (isShowResults &&
                    <h4 className="text-center">
                        Sorry no results found.
                    </h4>
                )
            }
            // Else there were results then they are mapped on the screen in their 
            // respective component
            else {
                return (
                    restaurants.map((restaurant) => (
                        <RestaurantEditItem
                            key={restaurant.id}
                            restaurant={restaurant}
                            viewRestaurantHandler={viewRestaurantHandler}
                            editRestaurantHandler={editRestaurantHandler}
                            deleteRestaurantHandler={deleteRestaurantHandler}
                        />
                    ))
                )
            }
        }

    }


    /********************************** MODALS *******************************************/


    // The modal will display before a user can be given admin privileges
    const adminUserButtonModal = (
        <AdminUserConfirm
            show={showAdminUserConfirm}
            adminUser={adminUser}
            closeHandler={closeAdminUserHandler} />
    )


    // The modal will display before a user can have admin privileges removed
    const unAdminUserButtonModal = (
        <UnAdminUserConfirm
            show={showUnAdminUserConfirm}
            unAdminUser={unAdminUser}
            closeHandler={closeUnAdminUserHandler} />
    )


    // The modal will display before a user can be banned
    const banUserButtonModal = (
        <BanUserConfirm
            show={showBanUserConfirm}
            banUser={banUser}
            closeHandler={closeBanUserHandler} />
    )


    // The modal will display before a user can be unBanned
    const unBanUserButtonModal = (
        <UnBanUserConfirm
            show={showUnBanUserConfirm}
            unBanUser={unBanUser}
            closeHandler={closeUnBanUserHandler} />
    )


    // The modal will display before a restaurant can be deleted
    const deleteRestaurantButtonModal = (
        <DeleteRestaurantConfirm
            show={showDeleteRestaurantConfirm}
            deleteRestaurant={deleteRestaurant}
            closeHandler={closeDeleteRestaurantHandler} />
    )


    // The modal will display before a user can be deleted
    const userDeleteButtonModal = (
        <DeleteUserConfirm
            show={showDeleteUserConfirm}
            deleteUser={deleteUser}
            closeHandler={closeDeleteUserHandler} />
    )


    return (
        <XLContainer>
            <h1>
                Admin
            </h1>
            <AdminSearchForm
                searchSubmitHandler={searchSubmitHandler}
                setSearchInput={setSearchInput}
                onChangeHandler={onChangeHandler}
                searchInput={searchInput} />
            {isLoading?.isLoadingRestaurants || isLoading?.isLoadingUsers ?
                (
                    <ThemedSpinner />
                ) :
                (
                    searchList()
                )
            }
            {adminUserButtonModal}
            {unAdminUserButtonModal}
            {banUserButtonModal}
            {unBanUserButtonModal}
            {userDeleteButtonModal}
            {deleteRestaurantButtonModal}
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants],
    users: [...state.users],
    isLoading: { ...state.isLoading }
});

// Exporting the component
export default connect(mapStateToProps, {
    findByRestaurantNameThunk, deleteAllRestaurants,
    findByUserNameThunk, deleteAdditionalUsers,
    updatePermissionThunk, deleteUserThunk,
    deleteRestaurantThunk
})(Admin);