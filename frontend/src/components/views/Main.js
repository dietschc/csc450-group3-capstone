// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Alert, Card, Nav, Row, Col, Form, Container, FormControl, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function Main(props) {
    return (
        <div className="main">
            <Container fluid>
                    <ListGroup as="ul">
                    <ListGroup.Item as="li" className="border-0 text-center text-muted pb-0">
                        One time
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="border-0 text-center text-muted pt-0">
                        Two times
                    </ListGroup.Item>
                </ListGroup>
            </Container>
            
            <h1>
                Welcome to the Home Page!
            </h1>
            <ul>
                <li>
                    <Link to="/restaurant">Restaurant </Link>  
                </li>
                <li>
                    <Link to="/chat">Chat </Link> 
                </li>
                <li>
                    <Link to="/editAccount">Edit Account </Link>  
                </li>
                <li>
                    <Link to="/editRestaurant">Edit Restaurant </Link>  
                </li>
                <li>
                    <Link to="/login">Login </Link> 
                </li>
                <li>
                    <Link to="/review">Review </Link>
                </li>
                <li>
                    <Link to="/search">Search </Link> 
                </li>
                <li>
                    <Link to="/userDashboard">User Dashboard </Link>
                </li>
                <li>
                    <Link to="/admin">Admin </Link>
                </li>
                
            </ul>
        </div>
    )
}

// Exporting the component
export default Main;