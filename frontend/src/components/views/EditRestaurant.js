// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  Container } from 'react-bootstrap';
import EditRestaurantForm from '../form/EditRestaurantForm';
import BodyContainer from '../template/BodyContainer';

function EditRestaurant(props) {
    const submitted = false;
    const editing = false;
    
    return (
        <BodyContainer>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>{editing ? "Edit" : "Create"} Restaurant</h1>
                </div>
            </Container>
            <Container fluid as="main" className="p-4 justify-content-center editRestaurant">
                {submitted ? (
                    <div className="text-center">
                        <h4>Account information submitted successfully</h4>
                        <Link to={"/"}>
                            Back to Dashboard
                        </Link>
                    </div>

                ) : (
                    <EditRestaurantForm />
                )}
            </Container>
        </BodyContainer>
    )
}

// Exporting the component
export default EditRestaurant;