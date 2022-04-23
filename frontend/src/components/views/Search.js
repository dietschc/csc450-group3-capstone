// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 02/7/22, Search View Layout - Implemented layout, style and search cards)
//  (DAB, 03/05/2022, Added in functionality for the search view  and added 
//  some comments)
//  (DAB, 04/04/2022, Added Spinners for database load in)
//  (DAB, 4/10/2022, Button is now responsive and follows expanding theme)
//  (DAB, 04/14/2022, added endLoadingAll action to page load in to clean 
//  up any skipped load ins)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import XLContainer from '../template/XLContainer';
import SearchCard from '../subComponent/SearchCard';
import { connect } from "react-redux";
import {
    deleteAllRestaurants,
    findByRestaurantNameThunk
} from "../../actions/restaurants";
import { endLoadingAll } from '../../actions/isLoading';
import { useNavigate } from 'react-router-dom';
import ThemedSpinner from '../subComponent/ThemedSpinner';

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
    const { restaurants, isLoading } = props;
    const { 
        deleteAllRestaurants, 
        findByRestaurantNameThunk, 
        endLoadingAll 
    } = props;
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
        }
    }

    // Loading the database data into state when params are updated on params
    useEffect(() => {
        loadState();
        // Ending any unfinished load ins
        endLoadingAll();
    }, [restaurantName, authorId, restaurantId]);

    return (
        <XLContainer>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>Search Results</h1>
                </div>
            </Container>
            {isLoading?.isLoadingRestaurants ?
                (
                    <ThemedSpinner />
                ) : (
                    <Container fluid as="main" className="pb-3">
                        {restaurants.length > 0 ?
                            restaurants.map((restaurant, index) => (
                                <SearchCard restaurant={restaurant} key={index} />)
                            ) : (
                                <h2
                                    className="text-center"
                                    style={{ fontSize: "1.6rem" }}>
                                    No Restaurants Found!
                                </h2>
                            )
                        }
                    </Container>
                )
            }
            <Container fluid className="d-flex flex-column flex-sm-row justify-content-center">
                <Button onClick={() => navigate('../editRestaurant')}>
                    Add Restaurant
                </Button>
            </Container>
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants],
    isLoading: { ...state.isLoading }
});

// Exporting the component
export default connect(mapStateToProps, {
    deleteAllRestaurants,
    findByRestaurantNameThunk,
    endLoadingAll
})(Search);