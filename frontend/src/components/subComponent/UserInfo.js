// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserInfo.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Card, ListGroup, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A React Bootstrap formatted component that will render a user info 
 * list. It will allow the user to see their specific details and 
 * choose to edit them.
 * 
 * @param { currentUser, currentAddress, userInfoHandler } props 
 * @returns 
 */
function UserInfo(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { currentUser, currentAddress, userInfoHandler } = props;

    return (
        <Card>
            <Card.Title className="text-center">
                User Information
            </Card.Title>
            <Card.Body className="border-0">
                    <ListGroup className="mb-3">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    User Id:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser?.id}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    First Name:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser?.firstName}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Last Name:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser?.lastName}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Address:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress?.address}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    City:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress?.city}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    State:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress?.state}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Zip:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentAddress?.zip}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col xs={5} lg={4}>
                                    Email:
                                </Col>
                                <Col className="justify-content-start" xs={7} lg={8}>
                                    {currentUser?.email}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                <Button className="mx-auto d-flex" onClick={() => userInfoHandler()}>Update</Button>
            </Card.Body>
        </Card>
    )  
}

// Exporting the component
export default UserInfo;