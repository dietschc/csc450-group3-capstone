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
import { Link } from 'react-router-dom';

function Main(props) {
    return (

        <Container fluid as="main"
            style={{ maxWidth: "500px", fontSize: 30 }}
            className="pt-5"
        >
            <ListGroup variant="flush">
                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/restaurant">
                        Restaurant
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/chat">
                        Chat
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/editAccount">
                        Edit Account
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/editRestaurant">
                        Edit Restaurant
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/login">
                        Login
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/review">
                        Review
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/search">
                        Search
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/userDashboard">
                        User Dashboard
                    </Link>
                </ListGroup.Item>

                <ListGroup.Item className="text-center text-muted">
                    <Link className="text-decoration-none text-reset" to="/Admin">
                        Admin
                    </Link>
                </ListGroup.Item>

            </ListGroup>
        </Container>
    )
}

// Exporting the component
export default Main;