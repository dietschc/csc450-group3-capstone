// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserDashboard.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/04/2022, wrote the code that will be the UserInfo Component)
//  (DAB, 02/05/2022, fine tuned code for UserInfo Component)
//  (DAB, 02/05/2022, wrote the code that will be the FriendList Component)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Col, Row, Button, CardGroup, Container, ListGroupItem, Alert} from 'react-bootstrap';
import { Link, Navigate, renderMatches } from 'react-router-dom';
import BodyContainer from '../template/BodyContainer';
import testData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import ModalDeleteFriend from '../modal/DeleteFriendConfirm';
import DeleteReviewConfirm from '../modal/DeleteReviewConfirm';

function UserDashboard(props) {
    // Temporary test data 
    const [data, setData]=useState(testData);
    const [showFriendConfirm, setShowFriendConfirm] = useState(false);
    const [showReviewConfirm, setShowReviewConfirm] = useState(false);
    const [friend, setFriend] = useState([]);
    const [currentReview, setCurrentReview] = useState([]);

    

    const { user, restaurant, review, message } = data; 
    const [currentUser, ...otherUser] = user;
    const { address: currentAddress }  = currentUser;
    const { friend: currentFriendList } = currentUser;

    const navigate = useNavigate();
    const showFriendHandler = () => setShowFriendConfirm(true);
    const closeFriendHandler = () => setShowFriendConfirm(false);
    const showReviewHandler = () => setShowReviewConfirm(true);
    const closeReviewHandler = () => setShowReviewConfirm(false);

    const deleteFriend = () => {
        // Delete Friend Code Here
        console.log(friend.userName + " was deleted!");
    }
    const deleteReview = () => {
        // Delete Friend Code Here
        console.log(currentReview.reviewId + " review was deleted!");
    }

    const deleteFriendHandler = (friend) => {
        setFriend(friend);
        console.log("FRIEND IN DELETE HANDLER IS ", friend)
        showFriendHandler();
    }

    const deleteReviewHandler = (review) => {
        setCurrentReview(review);
        console.log("FRIEND IN DELETE HANDLER IS ", currentReview)
        showReviewHandler();
    }

    const userInfoHandler = () => {
        navigate("../editAccount");
    }

    const chatHandler = (id) => {
        navigate("../chat/" + id);
    }

    const reviewEditHandler = (id) => {
        navigate("../review/" + id)
    }
    

    const userDetails = (
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
                <Button className="mx-auto d-flex" onClick={() => userInfoHandler()}>Update</Button>
            </Card.Body>
        </Card>
    )

    const friendList = (
        <Card style={{ height: "449px"}}>
            <Card.Title className="text-center">
                Friends
            </Card.Title>
            <Card.Body style={{ overflow: "auto"}}>
                <ListGroup className="mb-3">
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
                                    <Button onClick={() => deleteFriendHandler(friend)}>
                                        Delete
                                    </Button>
                                    
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                    <ModalDeleteFriend 
                    show={showFriendConfirm} 
                    deleteFriend={deleteFriend}
                    closeHandler={closeFriendHandler} 
                    friend={friend} />
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
                    <Col className="px-1 pb-2" md={6}>
                        {userDetails}
                    </Col>
                    <Col className="px-1 pb-2" md={6}>
                        {friendList}
                    </Col>
                </Row>
                <Row>
                    {review.map((review) => (
                        <Card className="mb-2" key={review.reviewId} style={{}}>
                            <Card.Body>
                                <Card.Title as="h2" className="text-center">
                                    {review.restaurant.name}
                                </Card.Title>
                                <Card.Text className="text-center">
                                    {review.author.userName}
                                </Card.Text>
                            </Card.Body>
                            {console.log(review)}
                            <Card.Img className="mx-auto" style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }} src={review.image[0].imageLocation} />
                            <Card.Body>
                                <Card.Title className="text-center">
                                    {review.reviewTitle}
                                </Card.Title>
                                <Card.Text>
                                    {review.reviewText}
                                </Card.Text>
                                <Container  fluid className="d-flex px-0 justify-content-center justify-content-sm-center justify-content-md-end ">
                                    <Button className="mx-1" style={{ width: "5rem" }} onClick={() => {reviewEditHandler(review.reviewId)}}>
                                        Edit
                                    </Button>
                                    <Button className="mx-1" style={{ width: "5rem" }} onClick={() => {deleteReviewHandler(review)}}>
                                        Delete
                                    </Button>
                                </Container>
                            </Card.Body>
                        </Card>
                    ))}
                    <DeleteReviewConfirm 
                    show={showReviewConfirm} 
                    deleteReview={deleteReview}
                    closeHandler={closeReviewHandler} 
                    review={review} />
                </Row>
            </Container>
            <Link to="/">Back to Home</Link>
        </Container>
            
        
    )
}

// Exporting the component
export default UserDashboard;