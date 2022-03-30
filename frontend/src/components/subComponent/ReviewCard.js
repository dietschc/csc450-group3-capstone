// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - ReviewCard.js
// March 4, 2022
// Last Edited (Initials, Date, Edits):
// (TJI) 29 March 2022 - Added in alt tag for images

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Card } from 'react-bootstrap';
import RestaurantHeadingCardBody from '../subComponent/RestaurantHeadingCardBody';
import FullStarRatingRow from '../subComponent/FullStarRatingRow';
import ReviewTextCardBody from '../subComponent/ReviewTextCardBody';

/**
 * The ReviewCard component will display individual review information for 
 * restaurant. It accepts one restaurant and one review
 * 
 * @param { restaurant, restaurant } props 
 * @returns 
 */
function ReviewCard(props) {
    // The component needed props are destructured
    const { review, restaurant } = props;

    return (
        <Card className="mb-2" style={{}}>
            <RestaurantHeadingCardBody restaurant={restaurant} />
            <Card.Img className="mx-auto"
                style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }}
                src={review.images[0].imageLocation}
                alt={restaurant.name} />
            <Card.Text className="text-center pt-1">
                {review.author.userName}
            </Card.Text>
            <FullStarRatingRow review={review} />
            <ReviewTextCardBody review={review} />
        </Card>
    )
}

// Exporting the component
export default ReviewCard;