// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - MainRRDetailButtonGroup.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/05/2022, Fixed moreHandler to return author.id)
//  (DAB, 4/04/2022, Friend button is not rendered if a user is 
//  not logged in)
//  (DAB, 4/09/2022, Friend button will not render if a user is 
//  already friends with the author)
//  (DAB, 4/10/2022, Current user will not have friend buttons on
//  either)

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * The MainRRDetailButtonGroup will display the buttons for the
 * RestaurantReviewDetail Component on the Main View. The buttons will
 * allow a search to be performed based off the current review, the
 * Restaurant View referencing that review to be opened, and the
 * ability to add the review author as a friend.
 *
 * @param { moreHandler, restaurantHandler, friendHandler, review, users } props
 * @returns
 */
function MainRRDetailButtonGroup(props) {
    // The form component specific props will be assigned and
    // used to process the form element
    const { moreHandler, restaurantHandler, friendHandler, review, users } = props;

    // This isFriend function will check the users friend list and return if they 
    // are friends with the review author or not
    const isFriend = () => {
        // Destructuring the needed data from the available arrays
        const [currentUser, ...rest] = users;
        const friendId = review?.author.id;
        const userFriendList = currentUser?.friends;

        // If the user has friends, the current friendId will be checked to see 
        // if it exists in the users friend list
        if (userFriendList) {
            // Filtering out the friend based off the current friendId
            const currentFriend = userFriendList.filter((friend) => friend.id === friendId);

            // Returning if the friend is in the friend list or not, or if the friendId is 
            // the currentUser
            return currentFriend.length > 0 || friendId === currentUser?.id;
        }

        // Since the user does not have friends, false is returned
        return false;
    }

    return (
        <div
            className="
      d-flex 
      flex-fill 
      flex-column 
      flex-sm-row 
      flex-wrap 
      px-0 mb-1 
      justify-content-center 
      justify-content-sm-center 
      justify-content-md-end"
            style={{ minWidth: "100%" }}>
            
            {users?.length > 0 && !isFriend() && <Button
                className="m-1 flex-grow-1 flex-sm-grow-0 align-self-sm-center"
                style={{ minWidth: "8rem" }}
                onClick={() => {
                    friendHandler(review.author.id);
                }}
            >
                Friend
            </Button>}
            <Button
                className="m-1 flex-grow-1 flex-sm-grow-0 align-self-sm-center"
                style={{ minWidth: "8rem" }}
                onClick={() => {
                    moreHandler(review.author.id, review.restaurant.id);
                }}
            >
                More
            </Button>
            <Button
                className="m-1 flex-grow-1 flex-sm-grow-0 align-self-sm-center"
                style={{ minWidth: "8rem" }}
                onClick={() => {
                    restaurantHandler(review.restaurant.id);
                }}
            >
                Restaurant
            </Button>

        </div>
    )
}

// Exporting the component
export default MainRRDetailButtonGroup;