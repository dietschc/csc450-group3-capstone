// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import mockStateData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RestaurantReviewDetail from '../subComponent/RestaurantReviewDetail';
import MainRRDetailButtonGroup from '../form/button/MainRRDetailButtonGroup';

function Main(props) {
        const [data, setData]=useState(mockStateData);

        const navigate = useNavigate();

        const moreHandler = (authorId, restaurantId) => {
            navigate("search/" + authorId + "/" + restaurantId);
        }

        const restaurantHandler = (restaurantId) => {
            navigate("restaurant/" + restaurantId);
        }

        const friendHandler = (friendId) => {
            // Add review author id to friend list
            console.log("UserId " + friendId + " was added to friend list.")
        }

        // Destructuring the needed data from the intitialState.json file
        const { user, restaurant, review, message } = data; 
        const [currentUser, ...otherUser] = user;
        const { address: currentAddress }  = currentUser;
        const { friend: currentFriendList } = currentUser;
    const devNav = (
        
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
    );

    const RRDButtonGroup = (review) => (
        <div>
            <MainRRDetailButtonGroup review={review}
            moreHandler={moreHandler}
            restaurantHandler={restaurantHandler} 
            friendHandler={friendHandler}/>
        </div>
    );

    return (
        <Container fluid className="justify-content-center" style={{maxWidth: "1000px"}}>
            <h1 className="mb-2">
                Restaurant Club
            </h1>
            <RestaurantReviewDetail restaurant={restaurant} review={review} buttons={RRDButtonGroup}/>
                
            <Container fluid
            style={{ maxWidth: "500px", fontSize: 30 }}
            className="pt-5"
            >
                {devNav}
            </Container>
        </Container>
        
    )
}

// Exporting the component
export default Main;