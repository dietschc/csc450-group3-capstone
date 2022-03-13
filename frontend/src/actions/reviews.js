// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviews.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/14/2022, Started writing redux actions for reviews/users)
//  (DAB, 2/15/2022, Finished basic redux actions for reviews)
//  (DAB, 2/15/2022, Moved reviews, users into their own files into their own files)
//  (DAB, 3/01/2022, Added in redux thunks to retrieve reviews from the database and 
//  load then into state (findAllReviewsOrdered))
//  (DAB, 3/05/2022, Added in findReviewByAuthorThunk and findReviewByAuthorRestaurantThunk)
//  (CPD, 3/06/2022, Added deleteReviewThunk)
//  (CPD, 3/09/2022, Worked on getting addReviewThunk with image upload working)
//  (CPD, 3/10/2022, Worked on getting review edit/update working, including updating image)
//  (CPD, 3/12/2022, Added image delete code to updateReviewThunk)
//  (CPD, 3/12/2022, Implemented user subdirectories for review images)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import ReviewDataService from "../services/review.service";
import ImageDataService from "../services/image.service";
import { formatDBReviewFind } from '../helperFunction/actionHelpers';

/**
 * This thunk will search the database and return reviews written by the specified author
 * that matches the author Id
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @param {*} reviewAuthorId
 * @returns 
 */
export const findReviewByAuthorThunk = (offset, limit, reviewAuthorId) => async dispatch => {
    // Making a call to the database to request the reviews
    await ReviewDataService.findByAuthorIdOffsetLimit(offset, limit, reviewAuthorId)
        .then(async res => {
            // If data was found in the database query it is formatted 
            // for redux and added to state
            if (res) {
                // Iterating through the review data
                await res.data.map(review => {
                    // Formatting the database data so it matches redux
                    const reviewData = formatDBReviewFind(review);

                    // Adding the current review to state
                    dispatch(addReview(reviewData));

                    // Returning the current review
                    return review;
                })
            }
        })
        .catch(err => {
            // If there was an error it is logged in the console
            console.log(err)
        })
}

/**
 * This thunk will search the database and return reviews written by the specified author
 * that matches both the review author and restaurant Id's.
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @param {*} authorId
 * @param {*} restaurantId
 * @returns 
 */
export const findReviewByAuthorRestaurantThunk = (offset, limit, authorId, restaurantId) => async dispatch => {
    // Making a call to the database to request the reviews
    await ReviewDataService.findByRestaurantAuthorIdOffsetLimit(offset, limit, authorId, restaurantId)
        .then(async res => {
            // If data was found in the database query it is formatted 
            // for redux and added to state
            if (res) {
                // Iterating through the review data
                await res.data.map(review => {
                    // Formatting the database data so it matches redux
                    const reviewData = formatDBReviewFind(review);

                    // Adding the current review to state
                    dispatch(addReview(reviewData));

                    // Returning the current review
                    return review;
                })
            }
        })
        .catch(err => {
            // If there was an error it is logged in the console
            console.log(err)
        })
}

/**
 * Searches the database for all reviews with up to the offset/limit. It will then 
 * add the results to state.
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
export const findAllReviewsOrderedThunk = (offset, limit) => async dispatch => {
    // Making a call to the database to request the reviews
    await ReviewDataService.findAllOffsetLimit(offset, limit)
        .then(async res => {
            // If data was found in the database query it is formatted 
            // for redux and added to state
            if (res) {
                // Iterating through the review data
                await res.data.map(review => {
                    // Formatting the database data so it matches redux
                    const reviewData = formatDBReviewFind(review);

                    // Adding the current review to state
                    dispatch(addReview(reviewData));

                    // Returning the current review
                    return review;
                })
            }
        })
        .catch(err => {
            // If there was an error it is logged in the console
            console.log(err)
        })
}

/**
 * The findReviewByRestaurantThunk will find all reviews matching the restaurantId
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @param {*} restaurantId 
 * @returns 
 */
export const findReviewByRestaurantThunk = (offset, limit, restaurantId) => async dispatch => {
    // Making a call to the database to request the reviews
    await ReviewDataService.findByRestaurantIdOffsetLimit(offset, limit, restaurantId)
        .then(async res => {
            // If data was found in the database query it is formatted 
            // for redux and added to state
            if (res) {
                // Iterating through the review data
                await res.data.map(review => {
                    // Formatting the database data so it matches redux
                    const reviewData = formatDBReviewFind(review);

                    // Adding the current review to state
                    dispatch(addReview(reviewData));

                    // Returning the current review
                    return review;
                })
            }
        })
        .catch(err => {
            // If there was an error it is logged in the console
            console.log(err)
        })
}

/**
 * The add review thunk takes all the parameters from the review form, including a file upload and 
 * passes them to the backend to create a new review. If a file is included it will be uploaded
 * to the cloud and it's location will be stored in the review details.
 * 
 * I tried to break this apart into two thunk functions but I was running into a lot of issues.
 * 
 * @param {*} userId 
 * @param {*} restaurantId 
 * @param {*} reviewTitle 
 * @param {*} reviewText 
 * @param {*} tasteRating 
 * @param {*} serviceRating 
 * @param {*} cleanlinessRating 
 * @param {*} overallRating 
 * @param {*} file 
 * @returns 
 */
export const addReviewThunk = (userId, restaurantId, reviewTitle, reviewText, tasteRating, serviceRating,
    cleanlinessRating, overallRating, file) => async dispatch => {

        // If file exists, upload to cloud and add location to the new review
        if (file.size > 0) {
            // Parameters for user subdirectories
            const id = userId;
            const type = "users";

            // Call and await the image data service upload method, passing the file as a parameter
            await ImageDataService.upload(file, id, type)
                .then(res => {
                    // console.log("location: ", res.data.location);

                    // Set the image location from the response data
                    const imageLocation = res.data.location;

                    // If the imageLocation exists, this implies success uploading
                    if (imageLocation) {
                        // Call the review data service create method, passing the form data parameters
                        ReviewDataService.create({
                            userId, restaurantId, reviewTitle, reviewText, tasteRating, serviceRating,
                            cleanlinessRating, overallRating, imageLocation
                        })
                    }

                    // It is not necessary to add the review to state since visiting the homepage or dashboard
                    // will automatically refresh all the reviews in state
                    // dispatch(addReview(result))
                })
                .catch(err => {
                    console.log(err)
                })

            // Otherwise use an empty string for the location when creating the new review
        } else {
            const imageLocation = "";

            // Call the create review data data service, passing parameters
            await ReviewDataService.create({
                userId, restaurantId, reviewTitle, reviewText, tasteRating, serviceRating,
                cleanlinessRating, overallRating, imageLocation
            })
                .then(res => {
                    // console.log("res data: ", res.data);

                    // It is not necessary to add the review to state since visiting the homepage or dashboard
                    // will automatically refresh all the reviews in state
                    // dispatch(addReview(result))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

/**
 * This function takes a single parameter, which is the reviewId of the review to be deleted.
 * 
 * @param {*} reviewId 
 * @returns 
 */
export const deleteReviewThunk = (reviewId, imageLocation) => async dispatch => {

    // Delete the image from cloud storage if it exists
    if (imageLocation !== '') {
        await ImageDataService.delete(imageLocation);
    }

    //Call and await the review data service delete method, passing the parameters
    await ReviewDataService.delete(reviewId)
        .then(review => {

            // Variable that will indicate if the review was deleted from the database
            const isFriendDeleted = review.data.message.includes("success") ? true : false;

            if (isFriendDeleted) {
                // console.log("result: ", res);

                // Delete review from state
                dispatch(deleteReview(reviewId))
            }
        })
        // Catch and log any errors
        .catch(err => {
            console.log(err)
        })
}


/**
 * React-Redux action to add a review to redux state.
 * 
 * @param {
 * @param {*} userName - User name of the user who wrote this review.
 * @param {*} reviewId - Id of the review.
 * @param {*} userId - User Id of the user who wrote this review.
 * @param {*} restaurantId - Restaurant Id of the restaurant being reviewed.
 * @param {*} restaurantName - Name of the restaurant being reviewed.
 * @param {*} tasteRating - Taste rating for the review.
 * @param {*} serviceRating - Service rating for the review.
 * @param {*} cleanlinessRating - Cleanliness rating for the review.
 * @param {*} overallRating - Overall rating for the review.
 * @param {*} reviewTitle - Title of the review.
 * @param {*} reviewText - Body review text.
 * @param {*} created - DateTime of review creation
 * @param {*} modified - DateTime of review modification.
 * @param {*} imageLocation - File location the image will be stored at.
 * } param0 
 * @returns 
 */
export const addReview = ({ userName, reviewId, userId, imageId,
    historyId, restaurantId, ratingId, restaurantName, tasteRating,
    serviceRating, cleanlinessRating, overallRating, reviewTitle,
    reviewText, created, modified, imageLocation }) => ({
        type: C.ADD_REVIEW,
        id: reviewId,
        author: {
            id: userId,
            userName: userName
        },
        restaurant: {
            id: restaurantId,
            name: restaurantName
        },
        rating: {
            id: ratingId,
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        },
        reviewTitle: reviewTitle,
        reviewText: reviewText,
        images: {
            id: imageId,
            imageLocation: imageLocation
        },
        history: {
            id: historyId,
            created: created,
            modified: modified
        }
    })

// React-Redux action to delete a review based off id from redux state
export const deleteReview = (reviewId) => ({
    type: C.DELETE_REVIEW,
    id: reviewId
})

/**
 * React-Redux action to delete all reviews from redux state.
 * 
 * @returns 
 */
export const deleteAllReviews = () => ({
    type: C.DELETE_ALL_REVIEWS
})

/**
 * The update review thunk will update the parameters, including a new file if it was uploaded. This 
 * function will also delete the old cloud image if a new one is uploaded.
 * 
 * @param {*} reviewId 
 * @param {*} userId 
 * @param {*} reviewTitle 
 * @param {*} reviewText 
 * @param {*} tasteRating 
 * @param {*} serviceRating 
 * @param {*} cleanlinessRating 
 * @param {*} overallRating 
 * @param {*} file 
 * @param {*} imageLocation 
 * @returns 
 */
export const updateReviewThunk = (reviewId, userId, reviewTitle, reviewText, tasteRating, serviceRating,
    cleanlinessRating, overallRating, file, imageLocation) => async dispatch => {

        // If input file exists, upload to cloud and add location to the new review
        if (file.size > 0) {

            // Delete old image from cloud if it exists
            if (imageLocation !== '') {
                const oldLocation = imageLocation;
                console.log("old location: ", oldLocation);
                await ImageDataService.delete(oldLocation);
            }

            // Parameters for user subdirectories
            const id = userId;
            const type = "users";

            // Call and await the image data service upload method, passing the file as a parameter
            await ImageDataService.upload(file, id, type)

                .then(res => {
                    // console.log("location: ", res.data.location);

                    // Set the image location from the response data
                    const imageLocation = res.data.location;

                    // If the imageLocation exists, this implies success uploading
                    if (imageLocation) {
                        // Call the review data service create method, passing the form data parameters
                        ReviewDataService.update(reviewId, {
                            userId, reviewTitle, reviewText, tasteRating, serviceRating,
                            cleanlinessRating, overallRating, imageLocation
                        })
                    }

                    // It is not necessary to add the review to state since visiting the homepage or dashboard
                    // will automatically refresh all the reviews in state
                })
                .catch(err => {
                    console.log(err)
                })

            // Otherwise use existing imageLocation 
        } else {
            // Call the create review data data service, passing parameters
            await ReviewDataService.update(reviewId, {
                userId, reviewTitle, reviewText, tasteRating, serviceRating,
                cleanlinessRating, overallRating, imageLocation
            })
                .then(res => {
                    // console.log("res data: ", res.data);

                    // It is not necessary to add the review to state since visiting the homepage or dashboard
                    // will automatically refresh all the reviews in state
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

/**
 * React-Redux action to update redux state.
 * 
 * @param {
 * reviewId - Id of review to update.
 * tasteRating - Taste rating for the review.
 * serviceRating - Service rating for the review.
 * cleanlinessRating - Cleanliness rating for the review.
 * overallRating - Overall rating for the review.
 * reviewTitle - Title of the review.
 * reviewText - Body review text.
 * imageLocation - File location the image will be stored at. 
 * } param0 
 * @returns 
 */
export const updateReview = ({ reviewId, tasteRating,
    serviceRating, cleanlinessRating, overallRating, reviewTitle,
    reviewText, imageLocation, modified }) => ({
        type: C.UPDATE_REVIEW,
        id: reviewId,
        rating: {
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        },
        reviewTitle: reviewTitle,
        reviewText: reviewText,
        images: {
            imageLocation: imageLocation
        },
        history: {
            modified: modified
        }
    })