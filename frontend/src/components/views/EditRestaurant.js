// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import EditRestaurantForm from '../form/EditRestaurantForm';

function EditRestaurant(props) {
    const submitted = false;
    const editing = false;
    
    return (
        <Container fluid className="text-muted" style={{ maxWidth: "500px" }}>
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
        </Container>
    )
}

// Exporting the component
export default EditRestaurant;