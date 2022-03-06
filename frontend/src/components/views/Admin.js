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
import { deleteAdditionalUsers, findByUserNameThunk } from '../../actions/users';

function Admin(props) {
    // Destructuring the data to be used in the search
    const { users, restaurants } = props;
    const { 
        findByRestaurantNameThunk, deleteAllRestaurants,
        findByUserNameThunk, deleteAdditionalUsers
    } = props;
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("user");
    const [isShowResults, setIsShowResults] = useState(false);

    // This submit handler will handle the search form when submitted and assign the 
    // search input and search type to their respective state variables
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        setSearchInput(e.target.search.value)

        setIsShowResults(true);

        console.log("USER TYPE IS", searchType);

        if (searchType === "user") {
            userSearch(searchInput)
        }
        else {
            console.log("in restaurant search")
            restaurantSearch(searchInput)
        }

        setSearchInput("");
    }


    // The userSearch method will filter user and return the filtered array with the results
    const userSearch = async () => {
        await deleteAdditionalUsers();

        if (searchInput !== "") {
            await findByUserNameThunk(0, 25, searchInput);
        }

    }

    // The restaurantSearch method will filter restaurant and return only the items that match the search input
    const restaurantSearch = async () => {
        console.log(searchInput)
        await deleteAllRestaurants();

        if (searchInput !== "") {
            await findByRestaurantNameThunk(0, 25, searchInput);
        }

    }

    const onChangeHandler = (e) => {
        setSearchType(e.target.value);
        setIsShowResults(false)
    }

    // The searchList method will return either the User or Restaurant EditItem component 
    // based off the search input and search criteria. If there are no matches the user 
    // is notified
    const searchList = () => {

        if (!isShowResults) {
            return
        }
        else {
            if (searchType === "user") {

                // The results of the userSearch
                const [mainUser, ...results] = users;
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
export default connect(mapStateToProps, {
    findByRestaurantNameThunk, deleteAllRestaurants,
    findByUserNameThunk, deleteAdditionalUsers
})(Admin);