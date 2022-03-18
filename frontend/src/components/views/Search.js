// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 02/7/22, Search View Layout - Implemented layout, style and search cards)
//  (DAB, 03/05/2022, Added in functionality for the search view  and added 
//  some comments)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import XLContainer from '../template/XLContainer';
import SearchCard from '../subComponent/SearchCard';
import { connect } from "react-redux";
import {
    deleteAllRestaurants,
    findByRestaurantNameThunk
} from "../../actions/restaurants";
import { useNavigate } from 'react-router-dom';

/**
 * The Search View works in conjunction with the search bar on the MainNav view. It 
 * will search for restaurants by matching restaurant names and return the like results 
 * to display on the page.
 * 
 * @param {*} props 
 * @returns 
 */
function Search(props) {
    // Pulling the needed methods/variables from props and params
    const { restaurants } = props;
    const { deleteAllRestaurants, findByRestaurantNameThunk } = props;
    const { restaurantName, authorId, restaurantId } = useParams();
    // Creating a navigate instance to navigate the application to new routes
    const navigate = useNavigate();

    // This function will load the state depending on the variables 
    // available
    const loadState = () => {
        // All restaurants will be deleted pre search
        deleteAllRestaurants();

        // If there is a restaurantName then the search results are checked 
        // and the result is displayed
        if (restaurantName) {
            findByRestaurantNameThunk(0, 25, restaurantName);
            console.log(restaurantName);
        }
    }

    // Loading the database data into state when params are updated on params
    useEffect(() => {
        loadState();
    }, [restaurantName, authorId, restaurantId]);

    return (
        <XLContainer>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>Search Results</h1>
                </div>
            </Container>
            <Container fluid as="main" className="pb-3">
                {restaurants.length > 0 ? restaurants.map((restaurant, index) => (
                    <SearchCard restaurant={restaurant} key={index} />
                )) :
                    <h3 className="text-center mt-4">No Restaurants Found!</h3>}
            </Container>
            <Container fluid className="d-flex justify-content-center">
                <Button onClick={() => navigate('../editRestaurant')}>
                    Add Restaurant
                </Button>
            </Container>
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants]
});

// Exporting the component
export default connect(mapStateToProps, {
    deleteAllRestaurants, 
    findByRestaurantNameThunk
})(Search);