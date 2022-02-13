// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserDashboard.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/04/2022, wrote the code that will be the UserInfo Component)
//  (DAB, 02/05/2022, fine tuned code for UserInfo Component)
//  (DAB, 02/05/2022, wrote the code that will be the FriendList Component)
//  (DAB, 02/06/2022, finished the code for RestaurantDetailDetail Component)
//  (DAB, 02/06/2022, breaking up components/functionality into their own .js files)
//  (DAB, 02/07/2022, changed buttons to buttonGroup function)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import mockStateData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import FriendList from '../subComponent/FriendList';
import UserInfo from '../subComponent/UserInfo';
import RestaurantReviewDetail from '../subComponent/RestaurantReviewDetail';
import UDRestaurantReviewDetail from '../form/button/UDRestaurantReviewDetail';
import DeleteReviewConfirm from '../modal/DeleteReviewConfirm';

function UserDashboard(props) {
    // *** Temporary test data, this will be replaced with Redux in the future ***
    const [data, setData]=useState(mockStateData);
    const [showFriendConfirm, setShowFriendConfirm] = useState(false);
    const [showReviewConfirm, setShowReviewConfirm] = useState(false);
    const [friend, setFriend] = useState([]);
    const [currentReview, setCurrentReview] = useState([]);

    // Destructuring the needed data from the intitialState.json file
    const { users, restaurants, reviews, messages } = data; 
    const [user, ...otherUser] = users;
    const { address: currentAddress }  = user;
    const { friends } = user;

    // Allows for the navigation to the specified webpage
    const navigate = useNavigate();

    // Handlers for the DeleteFriendConfirm modal
    const showFriendHandler = () => setShowFriendConfirm(true);
    const closeFriendHandler = () => setShowFriendConfirm(false);

    // Handles the click on the delete friend button and sets 
    // the selected friend into state
    const deleteFriendHandler = (friend) => {
        setFriend(friend);
        console.log("FRIEND IN DELETE HANDLER IS ", friend);
        showFriendHandler();
    }

    // Deletes the friend with the returned friend.userId
    const deleteFriend = () => {
            // Delete Friend Code Here, use friend.userId to 
            // grab the correct friend
            console.log(friend.userName + " was deleted!");
        }

    // Handlers for the DeleteReviewConfirm modal
    const showReviewHandler = () => setShowReviewConfirm(true);
    const closeReviewHandler = () => setShowReviewConfirm(false);

    // Deletes the review with the returned reviewId
    const deleteReview = () => {
        // Delete Review Code Here
        console.log(currentReview.reviewId + " review was deleted!");
    }

    // Handles the click on the delete review button and sets 
    // the selected review into state
    const deleteReviewHandler = (review) => {
        setCurrentReview(review);
        console.log("REVIEW IN DELETE HANDLER IS ", currentReview);
        showReviewHandler();
    }

    // Navigates to the user editAccount page. This is used 
    // in the UserInfo.js component to edit the current account
    const userInfoHandler = () => {
        navigate("../editAccount");
    }

    // Navigates to the Chat page passing the requested friend to 
    // chat with's ID into the URL. Used with the FriendList.js 
    // Component
    const chatHandler = (id) => {
        navigate("../chat/" + id);
    }

    // Navigates to the Review page passing the requested review to 
    // Review with the review ID into the URL. Used with the 
    // RestaurantReviewDetail.js Component
    const reviewEditHandler = (id) => {
        navigate("../review/" + id);
    }

    // These buttons will be passed into the RestaurantReviewDetail.js 
    // Component to allow the desired functionality with the component. 
    // The review variable needs to be passed as an argument so it can 
    // be generated in the parent
    const buttonGroup = (review) => (
        <UDRestaurantReviewDetail reviewEditHandler={reviewEditHandler} 
        deleteReviewHandler={deleteReviewHandler} review={review}/>
    )

    // This modal will be passed into the RestaurantReviewDetail.js 
    // Component to allow a confirmation before a review is deleted
    const deleteButtonModal = (
        <DeleteReviewConfirm 
        show={showReviewConfirm} 
        deleteReview={deleteReview}
        closeHandler={closeReviewHandler} />
    )

    return (
        <Container className="justify-content-center" style={{maxWidth: "1000px"}}>
            {console.log("Test is ", users)}
            {console.log("Current User is ", user)}
            {console.log("Current Address is ", currentAddress)}
            {console.log("Test Data .user is ", mockStateData.users)}
            <h1>
                User Dashboard
            </h1>
            <Row>
                <Col className="pb-2" md={6}>
                    <UserInfo 
                    currentUser={user}   
                    currentAddress={currentAddress} 
                    userInfoHandler={userInfoHandler}/>
                </Col>
                <Col className="pb-2" md={6}>
                    <FriendList friend={friend} chatHandler={chatHandler} 
                    deleteFriendHandler={deleteFriendHandler} showFriendConfirm={showFriendConfirm} 
                    deleteFriend={deleteFriend} closeFriendHandler={closeFriendHandler}
                    friends={friends} closeReviewHandler={closeReviewHandler} 
                    restaurant={restaurants}/>
                </Col>
            </Row>
            <RestaurantReviewDetail reviews={reviews} restaurants={restaurants} 
            buttonGroup={buttonGroup} modal={deleteButtonModal}/>
        </Container>
    )
}

// Exporting the component
export default UserDashboard;