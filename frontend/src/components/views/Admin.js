// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Admin.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/10/2022, Added in basic Layout and functionality)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl, FormGroup, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap';
import { connect } from "react-redux";
import XLContainer from '../template/XLContainer';
import RestaurantEditItem from '../subComponent/RestaurantEditItem';
import UserEditItem from '../subComponent/UserEditItem';
import { findByRestaurantNameThunk, deleteAllRestaurants } from '../../actions/restaurants';
import { deleteAdditionalUsers, findByUserNameThunk } from '../../actions/users';
import BanUserConfirm from '../modal/BanUserConfirm';
import DeleteUserConfirm from '../modal/DeleteUserConfirm';
import DeleteRestaurantConfirm from '../modal/DeleteRestaurantConfirm';

function Admin(props) {
    // Destructuring the data and functions to be used in the search
    const { users, restaurants } = props;
    const {
        findByRestaurantNameThunk, deleteAllRestaurants,
        findByUserNameThunk, deleteAdditionalUsers
    } = props;

    // Component specific states
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("user");
    const [isShowResults, setIsShowResults] = useState(false);

    const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState(false);
    const [showBanUserConfirm, setShowBanUserConfirm] = useState(false);
    const [showDeleteRestaurantConfirm, setShowDeleteRestaurantConfirm] = useState(false);
    const [currentUserId, setCurrentUserId] = useState();
    const [currentRestaurantId, setCurrentRestaurantId] = useState()

    const showDeleteUserHandler = () => setShowDeleteUserConfirm(true);
    const closeDeleteUserHandler = () => setShowDeleteUserConfirm(false);

    const showBanUserHandler = () => setShowBanUserConfirm(true);
    const closeBanUserHandler = () => setShowBanUserConfirm(false);

    const showDeleteRestaurantHandler = () => setShowDeleteRestaurantConfirm(true);
    const closeDeleteRestaurantHandler = () => setShowDeleteRestaurantConfirm(false);

    const deleteUser = () => {
        console.log("USER DELETED", currentUserId);
    }

    const banUser = () => {
        console.log("BAN USER", currentUserId);
    }

    const deleteRestaurant = () => {
        console.log("RESTAURANT DELETED", currentRestaurantId)
    }

    const banUserButtonModal = (
        <BanUserConfirm
            show={showBanUserConfirm}
            banUser={banUser}
            closeHandler={closeBanUserHandler} />
    )

     const userDashboardButtonModal = (
        <DeleteUserConfirm 
            show={showDeleteUserConfirm}
            deleteUser={deleteUser}
            closeHandler={closeDeleteUserHandler} />
    )

    const deleteRestaurantButtonModal = (
        <DeleteRestaurantConfirm 
            show={showDeleteRestaurantConfirm}
            deleteRestaurant={deleteRestaurant}
            closeHandler={closeDeleteRestaurantHandler} /> 
    )


    // Creating a navigate instance to navigate the application to new routes
    const navigate = useNavigate();

    const dashboardHandler = (userId) => {
        // Navigating the user to the search page and passing 
        // the needed search parameters
        navigate(`../userDashboard/${userId}`);
    }

    const banHandler = (userId) => {
        // Shows a confirm modal before banning a user
        setCurrentUserId(userId);
        showBanUserHandler();
    }

    const userDeleteHandler = (userId) => {
        // Shows a confirm modal before deleting a user
        setCurrentUserId(userId);
        showDeleteUserHandler();
    }

    const viewRestaurantHandler = (restaurantId) => {
        // Navigate to restaurant view
        console.log("Viewing a restaurant ", restaurantId)
    }

    const editRestaurantHandler = (restaurantId) => {
        // Navigate to edit restaurant page
        console.log("Editing a restaurant ", restaurantId)
    }

    const deleteRestaurantHandler = (restaurantId) => {
        setCurrentRestaurantId(restaurantId);
        showDeleteRestaurantHandler();
    }


    // The onChangeHandler handles the actions of the search bar radio buttons
    const onChangeHandler = (e) => {
        setSearchType(e.target.value);
        setIsShowResults(false)
    }


    // The restaurantSearch method sets the Redux state to display search specific 
    // restaurants
    const restaurantSearch = async () => {
        // Current restaurants are deleted from state
        await deleteAllRestaurants();

        // If search input is not an empty string the database will be 
        // queried for restaurants matching the searchInput
        if (searchInput !== "") {
            await findByRestaurantNameThunk(0, 25, searchInput);
        }
    }


    // The searchList method will return either the User or Restaurant EditItem component 
    // based off the search input and search criteria. If there are no matches the user 
    // is notified
    const searchList = () => {
        // If no search was performed there is nothing displayed
        if (!isShowResults) {
            return
        }
        // Else the correct type of search is displayed
        else {
            // If the search is for users, they will be handled
            if (searchType === "user") {
                // Destructuring out the logged in user and displaying the rest
                const [loggedInUser, ...results] = users;

                // If there are were no results it is displayed on the screen
                if (results.length < 1) {
                    return (
                        <h4 className="text-center">
                            Sorry  no results found for {searchInput}.
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
                        banHandler={banHandler}
                        userDeleteHandler={userDeleteHandler}
                        banUserButtonModal={banUserButtonModal}
                        userDashboardButtonModal={userDashboardButtonModal}/>
                        ))
                    )
                }
            }
            // Else the restaurant search will be displayed
            else {
                // If there are were no results it is displayed on the screen
                if (restaurants.length < 1) {
                    return (
                        <h4 className="text-center">
                            Sorry no results found for {searchInput}.
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
    }


    // This submit handler will handle the search form when submitted and assign the 
    // search input and search type to their respective state variables
    const searchSubmitHandler = (e) => {
        // Preventing default form action
        e.preventDefault();

        // Setting states to display the correct data (user or restaurant)
        setSearchInput(e.target.search.value)
        setIsShowResults(true);

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


    // The userSearch method sets the Redux state to display search specific 
    // users
    const userSearch = async () => {
        // All except the logged in user is deleted from state
        await deleteAdditionalUsers();

        // If search input is not an empty string the database will be 
        // queried for users matching the searchInput
        if (searchInput !== "") {
            await findByUserNameThunk(0, 25, searchInput);
        }
    }

    

    

    

    return (
        <XLContainer>
            <h1>
                Admin
            </h1>
            <Form className="px-2" onSubmit={searchSubmitHandler}>
                <Row>
                    <FormGroup as={Col} sm={8} className="d-flex justify-content-around align-items-center px-1 mb-3">
                        <FormControl
                            type="search"
                            name="search"
                            value={searchInput}
                            onInput={e => setSearchInput(e.target.value)}
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </FormGroup>

                    <ButtonGroup as={Col} sm={4}
                        className="d-flex justify-content-around align-items-center"
                        name="searchOption"
                        onChange={e => onChangeHandler(e)}>
                        <Form.Check
                            label="User"
                            name="searchOption"
                            type="radio"
                            value="user"
                            defaultChecked
                            id="searchOptionRadio1"
                        />
                        <Form.Check
                            label="Restaurant"
                            name="searchOption"
                            type="radio"
                            value="restaurant"
                            id="searchOptionRadio1"
                        />
                    </ButtonGroup>
                </Row>
            </Form>
            {searchList()}
            {banUserButtonModal}
            {userDashboardButtonModal}
            {deleteRestaurantButtonModal}
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants],
    users: [...state.users],
});

// Exporting the component
export default connect(mapStateToProps, {
    findByRestaurantNameThunk, deleteAllRestaurants,
    findByUserNameThunk, deleteAdditionalUsers
})(Admin);