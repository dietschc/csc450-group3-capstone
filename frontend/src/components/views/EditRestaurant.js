// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EditRestaurantForm from '../form/EditRestaurantForm';
import FormContainer from '../template/FormContainer';
import { connect } from 'react-redux';
import { addRestaurant, decrementRestaurantReviewCount, deleteAllRestaurants,
deleteRestaurant, incrementRestaurantReviewCount, updateRestaurant, updateRestaurantRating,
updateRestaurantReviewCount, updateRestaurantOwner } from '../../actions/restaurants';

function EditRestaurant(props) {
    // These variables will keep track if the form was submitted and weather the 
    // form should load as an update or add
    const submitted = false;
    const isUpdate = false;

    const { addRestaurant, decrementRestaurantReviewCount, deleteAllRestaurants,
        deleteRestaurant, incrementRestaurantReviewCount, updateRestaurant, updateRestaurantRating,
        updateRestaurantReviewCount, updateRestaurantOwner } = props;

    

    // Displays the header of EditRestaurant page. Depending on if the form will loaded 
    // in to update or add a restaurant
    const header =  (
        <Container as="header">
            <div className="text-center p-1">
                <h1>{isUpdate ? "Edit" : "Create"} Restaurant</h1>
            </div>
        </Container>
    );
    
    // Displays the main content. The EditRestaurantForm Component will be displayed first. 
    // After the form is submitted, the user will be notified by changing the content 
    // of the screen to notify the user that the form was successfully submitted
    const main =  (
        <Container fluid as="main" className="p-4 justify-content-center editRestaurant">
            {submitted ? 
                (
                    <div className="text-center">
                        <h4>Account information submitted successfully</h4>
                        <LinkContainer to="/">
                            <Nav.Link>
                                Back to Dashboard
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                ) : 
                (
                <EditRestaurantForm isUpdate={isUpdate}/>
                )
            }
        </Container>
    );
    
    // The EditRestaurant View will display a header and main content. The content is 
    // wrapped in a page formatting BodyContainer
    return (
        <FormContainer>
            {header}
            {main}
        </FormContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state => 
    ({
        reviews: [...state.reviews],
        users: [...state.users],
        messages: [...state.messages]
    });

// Mapping the state actions to props
const mapDispatchToProps = dispatch => 
    ({
        // This method will add a new review
        addRestaurant(restaurantId, authorId, authorUserName, ownerId, restaurantName, digitalContact, website, 
            phone, addressId, address, city, state, zip, ratingId, tasteRating, serviceRating, cleanlinessRating, overallRating, 
            reviewCount, imageId, imageLocation) {
            dispatch(addRestaurant(restaurantId, authorId, authorUserName, ownerId, restaurantName, digitalContact, website, 
                phone, addressId, address, city, state, zip, ratingId, tasteRating, serviceRating, cleanlinessRating, overallRating, 
                reviewCount, imageId, imageLocation)
                )
        },
        decrementRestaurantReviewCount(restaurantId) {
            dispatch(decrementRestaurantReviewCount(restaurantId)
            )
        },
        deleteAllRestaurants() {
            dispatch(deleteAllRestaurants()
            )
        },
        deleteRestaurant(id) {
            dispatch(deleteRestaurant(id))
        },
        incrementRestaurantReviewCount(restaurantId) {
            dispatch(incrementRestaurantReviewCount(restaurantId)
            )
        },
        updateRestaurantOwner(ownerId) {
            dispatch(updateRestaurantOwner(ownerId)
            )
        },
        updateRestaurant(restaurantName, authorId, authorUserName, address, 
            city, state, zip, phone, digitalContact, website, imageLocation) {
            dispatch(updateRestaurant(restaurantName, authorId, authorUserName, address, 
                city, state, zip, phone, digitalContact, website, imageLocation)
                )
        },
        updateRestaurantRating(restaurantId, tasteRating, serviceRating, 
            cleanlinessRating, overallRating) {
            dispatch(updateRestaurantRating(restaurantId, tasteRating, serviceRating, 
                cleanlinessRating, overallRating)
                )
        },
        updateRestaurantReviewCount(restaurantId, reviewCount) {
            dispatch(updateRestaurantReviewCount(restaurantId, reviewCount) 
            )
        }
    })


// Exporting the connect Wrapped EditRestaurant Component
export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurant);