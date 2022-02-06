// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserDashboard.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Col, Row, Button, CardGroup, Container, ListGroupItem, Alert} from 'react-bootstrap';
import { Link, Navigate, renderMatches } from 'react-router-dom';
import BodyContainer from '../template/BodyContainer';
import testData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import ModalDeleteFriend from '../modal/DeleteFriendConfirm';

function UserDashboard(props) {
    // Temporary test data 
    const [data, setData]=useState(testData);
    const [show, setShow] = useState(false);
    const [friend, setFriend] = useState([]);

    

    const { user, restaurant, review, message } = data; 
    const [currentUser, ...otherUser] = user;
    const { address: currentAddress }  = currentUser;
    const { friend: currentFriendList } = currentUser;

    const navigate = useNavigate();
    const showHandler = () => setShow(true);
    const closeHandler = () => setShow(false);

    const deleteFriend = () => {
        // Delete Friend Code Here
        console.log(friend.userName + " was deleted!");
    }

    const deleteHandler = (friend) => {
        setFriend(friend);
        console.log("FRIEND IN DELETE HANDLER IS ", friend)
        showHandler();
    }

    const userInfoHandler = () => {
        navigate("../editAccount");
    }

    const chatHandler = (id) => {
        navigate("../chat/" + id);
    }
    

    const userDetails = (
        <Card>
            <Card.Body className="border-0">
                <Card.Text as="div" className="mb-3">
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

    const friendList = (
        <Card style={{ height: "415px"}}>
            <Card.Title className="text-center">
                Friends
            </Card.Title>
            <Card.Body style={{ overflow: "auto"}}>
                <Card.Text as="div">
                    {currentFriendList.map((friend) => (
                        <ListGroup.Item key={friend.userId} id={friend.userId}>
                            <Row>
                                <Col className="d-flex align-items-center my-1 me-0 pe-0 flex-shrink-1">
                                    {friend.userName}
                                </Col>
                                <Col className="d-flex justify-content-end my-1 px-0 flex-shrink-1">
                                    <Button onClick={() => chatHandler(friend.userId)}>Chat</Button>
                                </Col>
                                <Col className="d-flex justify-content-center my-1 px-0 flex-shrink-1">
                                    <Button onClick={() => deleteHandler(friend)}>
                                        Delete
                                    </Button>
                                    
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    <ModalDeleteFriend 
                    show={show} 
                    deleteFriend={deleteFriend}
                    closeHandler={closeHandler} 
                    friend={friend} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
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
                        {friendList}
                    </Col>
                </Row>
            </Container>
            <Link to="/">Back to Home</Link>
        </Container>
            
        
    )
}

// Exporting the component
export default UserDashboard;