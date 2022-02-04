// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ListGroup } from 'react-bootstrap';

function Main(props) {
    return (

        <Container fluid as="main"
            style={{ maxWidth: "500px", fontSize: 30 }}
            className="pt-5"
        >
            <ListGroup variant="flush">
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/restaurant"
                >
                    Restaurant
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/chat"
                >
                    Chat
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/editAccount"
                >
                    Edit Account
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/editRestaurant"
                >
                    Edit Restaurant
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/login"
                >
                    Login
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/review"
                >
                    Review
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/search"
                >
                    Search
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/userDashboard"
                >
                    User Dashboard
                </ListGroup.Item>
                <ListGroup.Item
                    className="text-center text-muted"
                    action
                    href="/admin"
                >
                    Admin
                </ListGroup.Item>
            </ListGroup>
        </Container>

    )
}

// Exporting the component
export default Main;