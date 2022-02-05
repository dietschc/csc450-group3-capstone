// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserDashboard.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Col, Row, Button, CardGroup, Container} from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import BodyContainer from '../template/BodyContainer';
import testData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';

function UserDashboard(props) {
    // Temporary test data 
    const [data, setData]=useState(testData);

    const { user, restaurant, review, message } = data; 
    const [currentUser, ...otherUser] = user;
    const { address: currentAddress }  = currentUser;
    const navigate = useNavigate();

    const userInfoHandler = () => {
        navigate("../editAccount");
    }

    const userDetails = (
        <Card >
            <Card.Body className="border-0">
                <Card.Text>
                    <ListGroup>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    User Id:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser.id}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    First Name:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser.firstName}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Last Name:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser.lastName}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Address:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress.address}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    City:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress.city}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    State:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress.state}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Zip:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress.zip}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Email:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser.email}
                                </Col>
                            </Row>
                            
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Text>
                <Button className="mx-auto d-flex" onClick={() => userInfoHandler()}>Update</Button>
            </Card.Body>
        </Card>
    )
    return (
        
        <Container className="justify-content-center">
            <h1>
                User Dashboard
            </h1>
            {console.log("Test is ", user)}
            {console.log("Current User is ", currentUser)}
            {console.log("Current Address is ", currentAddress)}
            {console.log("Test Data .user is ", testData.user)}
            <Container fluid>
                <Row>
                    <Col md={6}>
                        {userDetails}
                    </Col>
                    <Col md={6}>
                        <Card>
                        <Card.Title>
                            Card 2
                        </Card.Title>
                    </Card>
                    </Col>
                
                </Row>
                
                </Container>
            
            
            <Link to="/">Back to Home</Link>
        </Container>
            
        
    )
}

// Exporting the component
export default UserDashboard;