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
//  (CPD, 03/02/2022, Wiring up frontend to use parameters from backend 
//  (user, authentication, address))
//  (CPD, 03/03/2022, Got currentUser info including friends, reviews, 
//  and restaurants loading from backend)
//  (DAB, 03/27/2022, userDashboard now functional with admin edits)
//  (DAB, 03/27/2022, formatted the order of the functions alphabetically where 
//  possible and finished comments)
//  (DAB, 04/02/2022, Moved EditPassword Button into dashboard)
//  (DAB, 04/04/2022, Added Spinners for database load in and layoutEffect)
//  (DAB, 04/13/2022, isLoading state control added to delete friend and review. 
//  users can only send one of each corresponding request in at a time to 
//  prevent duplicate requests)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
import { deleteUser, findByUserIdThunk } from '../../actions/users';
import ThemedSpinner from '../subComponent/ThemedSpinner';

/**
 * The UserDashboard View will allow the user to view their account
 * specific data. Account information, reviews written, and friends 
 * can all be accessed here. It is the central hub for users to navigate 
 * their personal content. The user can also access Chat through the 
 * userDashboard so they can chat with their friends. A 'member' can 
 * only access their userDashboard while an 'admin' can use this page 
 * to view all users account data.
 * 
 * @param {*} props 
 * @returns 
 */
function UserDashboard(props) {
    // Destructuring out needed state and actions
    const { users, restaurants, reviews, isLoading } = props;
    const {
        findByAuthorIdThunk,
        deleteFriendThunk,
        deleteAllReviews,
        deleteAllRestaurants,
        deleteReviewThunk,
        findByUserIdThunk,
        deleteUser
    } = props;

    // Destructuring out the param if there is one
    const { userId } = useParams();
    // Allows for the navigation to the specified webpage
    const navigate = useNavigate();

    // Initializing the local state variables
    const [showFriendConfirm, setShowFriendConfirm] = useState(false);
    const [showReviewConfirm, setShowReviewConfirm] = useState(false);
    const [friend, setFriend] = useState([]);
    const [currentReview, setCurrentReview] = useState([]);
    const [user, setUser] = useState(users.length > 0 ? users[0] : []);
    const [currentAddress, setCurrentAddress] = useState(users.length > 0 ? users[0].address : []);
    const [friends, setFriends] = useState(users.length > 0 ? users[0].friends : []);

    // Deleting old state before the DOM is painted
    useLayoutEffect(() => {
        // Deleting the state in redux
        deleteAllReviews();
        deleteAllRestaurants();
    }, [])

    // This useEffect renders only once on the initial page load in
    useEffect(() => {
        // loading in the current state to start up the page
        loadState();
    }, []);


    // This useEffect will trigger a rerender every time the users state array 
    // changes
    useEffect(() => {
        // If there is a param userId, that user will be added to the the current 
        // local state
        if (userId) {
            // Filtering for the user that matches the param userId and assigning 
            // their data to the local state
            const tempUser = users.filter(user => Number(userId) === user.id)[0]
            setUser(tempUser)
            setCurrentAddress(tempUser?.address)
            setFriends(tempUser?.friends || []);
        }
        // Else there is no userId so only friends is rerendered on the main userDashboard
        else {
            setFriends(users[0]?.friends)
        }
    }, [users])


    // Navigates to the Chat page passing the requested friend to 
    // chat with's ID into the URL. Used with the FriendList.js 
    // Component. Admins cannot access users chat
    const chatHandler = (friend) => {
        // If there is not a userId the chat functionality will work
        if (!userId) {
            navigate("../chat/" + friend.id);
        }
    }

    // Redirect for hitting the Update Password button
    const changePasswordHandler = () => {
        if (!userId) {
            navigate("../editPassword");
        }
        else {
            navigate(`../editPassword/${userId}`);
        }
    }


    // Handlers to hide the confirmation modals
    const closeFriendHandler = () => setShowFriendConfirm(false);
    const closeReviewHandler = () => setShowReviewConfirm(false);


    // Deletes the friend with the returned friend.userId. Action changes 
    // depending on if there is a param userId
    const deleteFriend = async () => {
        // If there is not a param userId in the URL the target 
        // will be users[0]
        if (!userId) {
            // Define our id parameter
            const id = users.length > 0 ? users[0].id : "";
            // Define our friend id parameter
            const friendId = friend.id;

            // Call thunk method and pass parameters to backend
            await deleteFriendThunk(id, friendId);
        }
        // Else the param userId is used to delete the friend data/state
        else {
            // Assigning needed parameters
            const id = user.id;
            const friendId = friend.id;

            // Call the thunk method to delete the friend from state and 
            // the database
            await deleteFriendThunk(id, friendId);
        }
    }


    // Handles the click on the delete friend button and sets 
    // the selected friend into state
    const deleteFriendHandler = (friend) => {
        // This will allow only one request at a time so duplicates are not 
        // made
        if (!isLoading.isLoadingFriends) {
            // Setting the friend from the event to local state
            setFriend(friend);

            // Showing the confirmation modal
            showFriendHandler();
        }
    }


    // Deletes the review with the returned reviewId
    const deleteReview = async () => {
        // Define our id parameters from local state 
        const reviewId = currentReview.id;
        const imageLocation = currentReview.images[0].imageLocation ?? "";

        // Call thunk method and pass parameters to backend
        await deleteReviewThunk(reviewId, imageLocation);
    }


    // Handles the click on the delete review button and sets 
    // the selected review into state
    const deleteReviewHandler = (review) => {
        // Only one review can be deleted at a time
        if (!isLoading.isLoadingReviews) {
            // Setting the current review to delete
            setCurrentReview(review);

            // Showing a confirm modal
            showReviewHandler();
        }
    }


    // The loadState function is async and it will load in the reviews/account/restaurants only 
    // if needed for the current user
    const loadState = async () => {
        // If there is a param userId, that users data will be retrieved and loaded into state
        if (userId) {
            // Searching the database to check if the userId exists and load their reviews/restaurants 
            // into state
            const result = await findByAuthorIdThunk(userId);
            // If no user is found, since only admins can access the param userDashboard page they are 
            // sent back to the admin page to search for another user
            if (!result) {
                navigate("/admin")
            }
            // Else a user was found so that user is freshly retrieved from the database and added to 
            // state
            else {
                // If the userId does not match the admins id, the user will be deleted and re added
                if (userId != users[0].id) {
                    // Filtering out to check if the userId user is currently in state
                    const tempUser = users.filter(user => Number(userId) === user.id);

                    // If they are, they are deleted from state
                    if (tempUser.length > 0) {
                        await deleteUser(Number(userId));
                    }

                    // The users data is then fetched and freshly added to keep it up to date
                    await findByUserIdThunk(userId)
                }
            }
        }
        // Else, there is no param userId
        else {
            // The current users data review/restaurant data is retrieved and added to state
            findByAuthorIdThunk(user.id);
        }
    }


    // Navigates to the Review page passing the requested review to 
    // Review with the review ID into the URL. Used with the 
    // RestaurantReviewDetail.js Component
    const reviewEditHandler = (review) => {
        const restaurantId = review.restaurant.id;
        const reviewId = review.id;
        navigate(`../review/${restaurantId}/${reviewId}`);
    }


    // Handlers to show the confirmation modals
    const showFriendHandler = () => setShowFriendConfirm(true);
    const showReviewHandler = () => setShowReviewConfirm(true);


    // Navigates to the user editAccount page. This is used 
    // in the UserInfo.js component to edit the current account
    const userInfoHandler = () => {
        // If an admin in not logged in it will navigate 
        // to the standard editAccount page
        if (!userId) {
            navigate("../editAccount");
        }
        // If an admin is logged in it will direct them to the 
        // edit the user with the param userId
        else {
            navigate(`/editAccount/${userId}`);
        }
    }


    //*************************** RENDER FUNCTIONS  *********************************/


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
            <h1>
                {user && `${user?.auth?.userName}'s`} Dashboard
            </h1>
            {isLoading?.isLoadingUsers ?
                (
                    <ThemedSpinner />
                ) : (
                    <Row>
                        <Col className="pb-2 px-1" md={6}>
                            <UserInfo
                                currentUser={user}
                                currentAddress={currentAddress}
                                userInfoHandler={userInfoHandler}
                                changePasswordHandler={changePasswordHandler} />
                        </Col>
                        <Col className="pb-2 px-1" md={6}>
                            <FriendList
                                friend={friend}
                                chatHandler={chatHandler}
                                deleteFriendHandler={deleteFriendHandler}
                                showFriendConfirm={showFriendConfirm}
                                deleteFriend={deleteFriend}
                                closeFriendHandler={closeFriendHandler}
                                friends={friends}
                                closeReviewHandler={closeReviewHandler}
                                restaurant={restaurants}
                                userId={userId} />
                        </Col>
                    </Row>
                )
            }
            {isLoading?.isLoadingRestaurants ?
                (
                    <ThemedSpinner />
                ) : (
                    <RestaurantReviewDetail
                        reviews={reviews}
                        restaurants={restaurants}
                        buttonGroup={buttonGroup}
                        modal={deleteButtonModal} />
                )
            }
        </Container>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    users: [...state.users],
    restaurants: [...state.restaurants],
    reviews: [...state.reviews],
    isLoading: { ...state.isLoading }
});

// Exporting the component after wrapping in connect
export default connect(mapStateToProps, {
    findByAuthorIdThunk,
    deleteFriendThunk,
    deleteAllRestaurants,
    deleteAllReviews,
    deleteReviewThunk,
    findByUserIdThunk,
    deleteUser
})(UserDashboard);