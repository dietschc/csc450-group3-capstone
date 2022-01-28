// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Alert, Card, Nav, Row, Col, Form, Container, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function MainNav(props) {
    return (
        <div className="mainNav">
            <h1>
                Welcome to the Main Navigation!
            </h1>
            <Link to="/">Back to Home</Link>
            <Container fluid>
            <Navbar
            className="mainNav bg-light"
            collapseOnSelect
            expand="md"
            style={{ maxHeight: "100px" }}>
                <Navbar.Brand>
                    <img
                        src="logo.gif"
                        width="90"
                        height="90"
                        className="flex-begin"
                        alt="Restaurant Club Logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav fill variant="pills" className="me-auto justify-content-end flex-grow-1 pe-3" defaultActiveKey="/">
                            <Nav.Item>
                                <Nav.Link href="/">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/userDashboard">
                                    Dashboard
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/login">
                                    Login
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Form className="d-flex">
                                    <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    style={{ minWidth:"10rem"}}/>
                                    <Button variant="outline-success">
                                        Search
                                    </Button>
                                </Form>
                            </Nav.Item> 
                            
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
            </Container>   
        </div>
    )
}

// Exporting the component
export default MainNav;