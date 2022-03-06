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
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl, FormGroup, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap';
import { connect } from "react-redux";
import XLContainer from '../template/XLContainer';
import RestaurantEditItem from '../subComponent/RestaurantEditItem';
import UserEditItem from '../subComponent/UserEditItem';
import { findByRestaurantNameThunk, deleteAllRestaurants } from '../../actions/restaurants';

function Admin(props) {
    // Destructuring the data to be used in the search
    const { users, restaurants } = props;
    const { findByRestaurantNameThunk, deleteAllRestaurants } = props;
    
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("");
    const [isShowResults, setIsShowResults] = useState(false);

    // ADMIN needs all user data anyway so we will load search results into state to be used in other areas, same with 
    // restaurants

    // Need a user search thunk that returns all users with a name LIKE userName
    // Need a restaurant search thunk that returns all restaurants with a name LIKE restaurantName

    // Loading the database data into state on page load
    // useEffect(() => {
    //     setSearchType("user")
    // }, []);
    

    // This submit handler will handle the search form when submitted and assign the 
    // search input and search type to their respective state variables
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        setSearchInput(e.target.search.value)

        setIsShowResults(true);

        console.log("USER TYPE IS", searchType);

        if (searchType === "user") {
            // await userSearch(searchInput);
            // NEED USER THUNK, then clear
        }
        else {
            restaurantSearch(searchInput)
            // await deleteAllRestaurants();
            // await findByRestaurantNameThunk(0, 25, searchInput);
        }

        setSearchInput("");


        //DEBUG
        console.log("FORM SUBMITTED")
    }
    

    // The userSearch method will filter user and return the filtered array with the results
    const userSearch = (userName) => {
        // Code for userName search
        let [mainUser, ...searchResults] = users;

        // Code for first name last name search
        // let searchResults = user.filter((user) => ((user.firstName).toLowerCase() + " " + (user.lastName).toLowerCase()).match(userName.toLowerCase() + ".*"));

        //DEBUG
        console.log("Search Results are ", searchResults)

        return searchResults;
    }

    // The restaurantSearch method will filter restaurant and return only the items that match the search input
    const restaurantSearch = async () => {
        console.log(searchInput)
        await deleteAllRestaurants();
        if (searchInput !== "") {
            await findByRestaurantNameThunk(0, 25, searchInput);
        }
        
        // Searching based off restaurant name
        // let searchResults = restaurants.filter((restaurant) => (restaurant.name).toLowerCase().match((restaurantName.toLowerCase()) + ".*"));
        let searchResults = restaurants;
        
        // DEBUG
        console.log("Search Results are ", searchResults)

        return restaurants;
    }

    const onChangeHandler = (e) => {
        setSearchType(e.target.value);
        setIsShowResults(false)
    }

    // The searchList method will return either the User or Restaurant EditItem component 
    // based off the search input and search criteria. If there are no matches the user 
    // is notified
    const searchList = () => {
      
        // if (searchType === "user") {
        //     //DEBUG
        //     console.log("Searching User")
        //     console.log(userSearch(searchInput));

        //     // The results of the userSearch
        //     const results = userSearch(searchInput);
        //     if (results.length < 1) {
        //         return (
        //             <h4 className="text-center">
        //                 Sorry  no results found for {searchInput}.
        //             </h4>
        //         )
        //     }
        //     else {
        //         // return (
        //         //     results.map((user) => <UserEditItem key={user.id} user={user} />)
        //         // )
        //     }
        // }
        // else {
        //     //DEBUG
        //     console.log("Restaurant Search");
        //     // console.log(restaurantSearch(searchInput))

        //     // The results of the restaurantSearch
        //     // restaurantSearch(searchInput);

        //     if (restaurants.length < 0) {
        //         return (
        //             <h4 className="text-center">
        //                 Sorry no results found for {searchInput}.
        //             </h4>
        //         )
        //     }
        //     else {
        //         return (
        //             restaurants.map((restaurant) => <RestaurantEditItem key={restaurant.id} restaurant={restaurant} />)
        //         )
        //     }
        // }
        
        if (!isShowResults) {
            return
        }
        else {
            if (searchType === "user") {
                //DEBUG
                console.log("Searching User")
                console.log(userSearch(searchInput));

                // The results of the userSearch
                const results = userSearch(searchInput);
                if (results.length < 1) {
                    return (
                        <h4 className="text-center">
                            Sorry  no results found for {searchInput}.
                        </h4>
                    )
                }
                else {
                    return (
                        results.map((user) => <UserEditItem key={user.id} user={user} />)
                    )
                }
            }
            else {
                //DEBUG
                console.log("Restaurant Search");
                // console.log(restaurantSearch(searchInput))

                // The results of the restaurantSearch
                // restaurantSearch(searchInput);

                if (restaurants.length < 1) {
                    return (
                        <h4 className="text-center">
                            Sorry no results found for {searchInput}.
                        </h4>
                    )
                }
                else {
                    return (
                        restaurants.map((restaurant) => <RestaurantEditItem key={restaurant.id} restaurant={restaurant} />)
                    )
                }
            }
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
            {/* {restaurants && restaurants.map((restaurant) => <RestaurantEditItem key={restaurant.id} restaurant={restaurant} />)} */}
            {searchList()}
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants],
    users: [...state.users],
});

// Exporting the component
export default connect(mapStateToProps, { findByRestaurantNameThunk, deleteAllRestaurants })(Admin);