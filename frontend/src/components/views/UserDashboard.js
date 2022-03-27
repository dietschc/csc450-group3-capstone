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
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)
//  (CPD, 03/02/2022, Wiring up frontend to use parameters from backend (user, authentication, address))
//  (CPD, 03/03/2022, Got currentUser info including friends, reviews, and restaurants loading from backend)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FriendList from '../subComponent/FriendList';
import UserInfo from '../subComponent/UserInfo';
import RestaurantReviewDetail from '../subComponent/RestaurantReviewDetail';
import UDRestaurantReviewDetail from '../form/button/UDRestaurantReviewDetail';
import DeleteReviewConfirm from '../modal/DeleteReviewConfirm';
import { findByAuthorIdThunk } from '../../actions/reviewsRestaurants';
import { deleteFriendThunk } from '../../actions/friend';
import { deleteAllReviews, deleteReviewThunk } from '../../actions/reviews';
import { deleteAllRestaurants } from '../../actions/restaurants';
import { deleteAdditionalUsers, deleteUser, findByUserIdThunk } from '../../actions/users';

function UserDashboard(props) {
    const {
        users,
        restaurants,
        reviews,
        findByAuthorIdThunk,
        deleteFriendThunk,
        deleteAdditionalUsers,
        deleteAllReviews,
        deleteAllRestaurants,
        deleteReviewThunk,
        findByUserIdThunk,
        deleteUser
    } = props;
    const { userId } = useParams();


    // *** Temporary test data, this will be replaced with Redux in the future ***
    // const [data, setData] = useState(mockStateData);
    const [showFriendConfirm, setShowFriendConfirm] = useState(false);
    const [showReviewConfirm, setShowReviewConfirm] = useState(false);
    const [friend, setFriend] = useState([]);
    const [currentReview, setCurrentReview] = useState([]);

    // const [show, setShow] = useState(false);

    const [user, setUser] = useState(users.length > 0 ? users[0] : []);
    const [currentAddress, setCurrentAddress] = useState(users.length > 0 ? users[0].address : []);
    const [friends, setFriends] = useState(users.length > 0 ? users[0].friends : []);
    // Destructuring the needed data from the intitialState.json file
    // const { messages } = data;
    // let [user = []] = users;
    // let { address: currentAddress = [] } = user;
    // let { friends = [] } = user;

    const loadState = async () => {
        await deleteAllReviews();
        await deleteAllRestaurants();

        console.log("USER ID FOR PARAM IS", userId)
        if (userId) {
            const result = await findByAuthorIdThunk(userId);
            console.log("Result in loadState is", result)
            if (!result) {
                navigate("/admin")
                console.log("Should navigate to admin here")
            }
            else {
                if (userId != users[0].id) {
                    // add a user to state, and filter for that user. 
                    // Assign this user to the user variable
                    const tempUser = users.filter(user => Number(userId) === user.id);
                    // if (tempUser.length < 1) {
                    //     console.log("LOADING IN A NEW USER< SHOULD NOT BE IN STATE")
                    //     await findByUserIdThunk(userId)
                    // }
                    if (tempUser.length > 0) {
                        await deleteUser(Number(userId));
                    }
                    console.log("LOADING IN A NEW USER< SHOULD NOT BE IN STATE")
                    await findByUserIdThunk(userId)




                }
            }

        }
        else {
            findByAuthorIdThunk(user.id);
        }

    }

    useEffect(() => {
        // deleteAdditionalUsers();
        loadState();
    }, []);

    useEffect(() => {
        if (userId) {
            // user = users.filter(user => Number(userId) === user.id)[0]
            const tempUser = users.filter(user => Number(userId) === user.id)[0]
            setUser(tempUser)
            setCurrentAddress(tempUser?.address)
            setFriends(tempUser?.friends || []);
            // currentAddress = await user.address;
            console.log("USER IS", tempUser)
        }
        else {
            setFriends(users[0]?.friends)
        }
    }, [users])

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
        if (!userId) {
            // Define our id paramaeter
            const id = users.length > 0 ? users[0].id : "";

            // Define our friend id parameter
            const friendId = friend.id;

            // Call thunk method and pass parameters to backend
            deleteFriendThunk(id, friendId);
            console.log(friend.userName + " was deleted!");
        }
        else {
            const id = user.id;
            const friendId = friend.id;

            deleteFriendThunk(id, friendId);
            console.log(friend.userName + " was deleted")
        }
        
    }

    // Handlers for the DeleteReviewConfirm modal
    const showReviewHandler = () => setShowReviewConfirm(true);
    const closeReviewHandler = () => setShowReviewConfirm(false);

    // Deletes the review with the returned reviewId
    const deleteReview = () => {
        // Define our id parameter 
        const reviewId = currentReview.id;
        const imageLocation = currentReview.images[0].imageLocation ?? "";

        // console.log("review id is: ", reviewId);

        // Call thunk method and pass parameters to backend
        deleteReviewThunk(reviewId, imageLocation);

        console.log(currentReview.id + " review was deleted!");
    }

    // Handles the click on the delete review button and sets 
    // the selected review into state
    const deleteReviewHandler = (review) => {
        setCurrentReview(review);
        console.log("REVIEW IN DELETE HANDLER IS ", review);
        showReviewHandler();
    }

    // Navigates to the user editAccount page. This is used 
    // in the UserInfo.js component to edit the current account
    const userInfoHandler = () => {
        if (!userId) {
            navigate("../editAccount");
        }
        else {
            navigate(`/editAccount/${userId}`);
        }
        
    }

    // Navigates to the Chat page passing the requested friend to 
    // chat with's ID into the URL. Used with the FriendList.js 
    // Component
    const chatHandler = (friend) => {
        console.log("FRIEND ID FOR CHAT HANDLER IS ", friend.id);
        if (!userId) {
            navigate("../chat/" + friend.id);
        }
        else {
            // setShow(true);
        }

    }

    // Navigates to the Review page passing the requested review to 
    // Review with the review ID into the URL. Used with the 
    // RestaurantReviewDetail.js Component
    const reviewEditHandler = (review) => {
        console.log("REVIEW IN EDIT HANDLER IS ", review.id);
        const restaurantId = review.restaurant.id;
        const reviewId = review.id;
        navigate(`../review/${restaurantId}/${reviewId}`);
    }

    // These buttons will be passed into the RestaurantReviewDetail.js 
    // Component to allow the desired functionality with the component. 
    // The review variable needs to be passed as an argument so it can 
    // be generated in the parent
    const buttonGroup = (review) => (
        <UDRestaurantReviewDetail reviewEditHandler={reviewEditHandler}
            deleteReviewHandler={deleteReviewHandler} review={review} />
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
        <Container className="justify-content-center" style={{ maxWidth: "1000px" }}>
            {/* {console.log("Test is ", users)}
            {console.log("Current User is ", user)}
            {console.log("Current Address is ", currentAddress)}
            {console.log("Test Data .user is ", mockStateData.users)} */}
            <h1>
                User Dashboard
            </h1>
            <Row>
                <Col className="pb-2" md={6}>
                    <UserInfo
                        currentUser={user}
                        currentAddress={currentAddress}
                        userInfoHandler={userInfoHandler} />
                </Col>
                <Col className="pb-2" md={6}>
                    <FriendList friend={friend} chatHandler={chatHandler}
                        deleteFriendHandler={deleteFriendHandler} showFriendConfirm={showFriendConfirm}
                        deleteFriend={deleteFriend} closeFriendHandler={closeFriendHandler}
                        friends={friends} closeReviewHandler={closeReviewHandler}
                        restaurant={restaurants} userId={userId} />
                </Col>
            </Row>
            <RestaurantReviewDetail reviews={reviews} restaurants={restaurants}
                buttonGroup={buttonGroup} modal={deleteButtonModal} />
        </Container>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    users: [...state.users],
    restaurants: [...state.restaurants],
    reviews: [...state.reviews]
});

// Exporting the component
// export default UserDashboard;
export default connect(mapStateToProps, {
    findByAuthorIdThunk,
    deleteFriendThunk,
    deleteAllRestaurants,
    deleteAllReviews,
    deleteReviewThunk,
    findByUserIdThunk,
    deleteAdditionalUsers,
    deleteUser
})(UserDashboard);