// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/07/2022, Added in findRestaurantById thunk so a restaurant
//  not in the state will load if available)
//  (DAB, 3/08/2022, Added in version control that will load the 
//  form in upload or create mode. Also added in useEffects that will 
//  upload the form from a database query)
//  (DAB, 3/10/2022, Added in comments and cleaned up debug statements)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import EditRestaurantForm from '../form/EditRestaurantForm';
import FormContainer from '../template/FormContainer';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { findByRestaurantIdThunk } from '../../actions/restaurants';

/**
 * The EditRestaurant View will allow a user to either create or update a restaurant
 * depending on the data in the database and state. The restaurant is queried off of 
 * the id in the param where no id will take the user to create a new restaurant.
 * 
 * @param { restaurants, findByRestaurantId } props 
 * @returns 
 */
function EditRestaurant(props) {
    // Loading in needed state and functions from redux
    const { restaurants, findByRestaurantIdThunk } = props;
    // Saving the param Id
    const { restaurantId } = useParams();
    // The isUpdate state will keep track of whether this is an update or create 
    // restaurant view
    const [isUpdate, setIsUpdate] = useState(false)

    // This useEffect will initially check if there is a restaurantId. If there is is not, 
    // it will query the database for that Id
    useEffect(() => {
        // If there is a restaurantId then the restaurant will be loaded in if needed. The 
        // isUpdate is also set to true so that form will render in update mode vs create
        if (restaurantId) {
            // Filtering to see if the restaurant is in state
            const paramRestaurant = restaurants.filter((restaurant) => (restaurant.id) == restaurantId)
            // If it is, then isUpdate is set to true
            if (paramRestaurant.length > 0) {
                setIsUpdate(true)
            }
            // Else the restaurant Id is queried in the database
            else {
                findByRestaurantIdThunk(restaurantId)
            }
        }
    }, []);

    // This useEffect will reRender when the restaurants state changes. It will check if the restaurant 
    // has been loaded into state. If it has, then isUpdate is set to true
    useEffect(() => {
        // If there are restaurants in state
        if (restaurants) {
            // Filtering to see if the restaurant is in state
            const paramRestaurant = restaurants.filter((restaurant) => (restaurant.id) == restaurantId)
            if (paramRestaurant.length > 0) {
                setIsUpdate(true);
            }
        }
    }, [restaurants]);

    
    // The getData() method filters the restaurants state for the restaurant based on id. If a restaurant 
    // is not found, an empty array is passed back
    const getData = () => {
        // Filtering to see if the restaurant is in state
        const paramRestaurant = restaurants.filter((restaurant) => (restaurant.id) == restaurantId);

        // If restaurants were found the data is returned to the caller
        if (paramRestaurant.length > 0) {
            return paramRestaurant;
        }
        // If no data was found an empty array is returned
        else {
            return []
        }
    }


    // Displays the header of EditRestaurant page. Depending on if the form will loaded 
    // in to update or add a restaurant
    const header = (
        <Container as="header">
            <div className="text-center p-1 mb-3">
                <h1>{isUpdate ? "Edit" : "Create"} Restaurant</h1>
            </div>
        </Container>
    );


    // The EditRestaurant View will display a header and main content. The content is 
    // wrapped in a page formatting BodyContainer
    return (
        <FormContainer className="editRestaurant">
            {header}
            <EditRestaurantForm restaurant={getData()} isUpdate={isUpdate} />
        </FormContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    restaurants: [...state.restaurants]
});


// Exporting the connect Wrapped EditRestaurant Component
export default connect(mapStateToProps, { findByRestaurantIdThunk })(EditRestaurant);