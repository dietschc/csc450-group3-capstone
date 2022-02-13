// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Admin.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/10/2022, Added in basic Layout and functionality)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl, FormGroup, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap';
import XLContainer from '../template/XLContainer';
import mockStateData from '../../redux/initialState.json';
import RestaurantEditItem from '../subComponent/RestaurantEditItem';
import UserEditItem from '../subComponent/UserEditItem';

function Admin(props) {
    // The mock state will be held as data
    const [data, setData] = useState(mockStateData);
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchType, setSearchType ] = useState("");

    // Destructuring the data to be used in the search
    const { users, restaurants } = data;

    // This submit handler will handle the search form when submitted and assign the 
    // search input and search type to their respective state variables
    const searchSubmitHandler= (e) => {
        e.preventDefault();
        setSearchType(e.target.searchOption.value);
        setSearchInput(e.target.search.value)
        
        //DEBUG
        console.log("FORM SUBMITTED")
    }

    // The userSearch method will filter user and return the filtered array with the results
    const userSearch = (userName) => {
        // Code for userName search
        let searchResults = users.filter((user) => ((user.auth.userName).toLowerCase()).match(userName.toLowerCase() + ".*"));

        // Code for first name last name search
        // let searchResults = user.filter((user) => ((user.firstName).toLowerCase() + " " + (user.lastName).toLowerCase()).match(userName.toLowerCase() + ".*"));

        //DEBUG
        console.log("Search Results are ", searchResults)

        return searchResults;
    }

    // The restaurantSearch method will filter restaurant and return only the items that match the search input
    const restaurantSearch = (restaurantName) => {
        // Searching based off restaurant name
        let searchResults = restaurants.filter((restaurant) => (restaurant.name).toLowerCase().match((restaurantName.toLowerCase()) + ".*"));

        // DEBUG
        console.log("Search Results are ", searchResults)

        return searchResults;
    }

    // The searchList method will return either the User or Restaurant EditItem component 
    // based off the search input and search criteria. If there are no matches the user 
    // is notified
    const searchList = () => {
        if (searchInput === "") {
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
                        results.map((user) => <UserEditItem key={user.id} user={user}/>)
                    )  
                }
            }
            else {
                //DEBUG
                console.log("Restaurant Search");
                console.log(restaurantSearch(searchInput))

                // The results of the restaurantSearch
                const results = restaurantSearch(searchInput);

                if (results.length < 1) {
                    return (
                        <h4 className="text-center">
                            Sorry no results found for {searchInput}.
                        </h4>
                    )
                }
                else {
                    return (
                        results.map((restaurant) => <RestaurantEditItem key={restaurant.id} restaurant={restaurant}/>)
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
                    onChange={e => console.log(e.target.value)}>
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

// Exporting the component
export default Admin;