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
import BodyContainer from '../template/BodyContainer';

function EditRestaurant(props) {
    // These variables will keep track if the form was submitted and weather the 
    // form should load as an update or add
    const submitted = false;
    const isUpdate = false;

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
        <BodyContainer>
            {header}
            {main}
        </BodyContainer>
    )
}

// Exporting the component
export default EditRestaurant;