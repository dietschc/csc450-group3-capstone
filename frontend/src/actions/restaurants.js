// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurants.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/18/2022, Added in actions for restaurants)
//  (DAB, 2/19/2022, Added in comments, altered code for images update)
//  (DAB, 3/01/2022, Added in thunk methods )
//  (DAB, 3/02/20222, Added in comments)
//  (DAB, 3/05/2022, Added in findByRestaurantNameThunk)
//  (DAB, 3/06/2022, Added in deleteRestaurantThunk)
//  (DAB, 3/07/2022, Added in addRestaurantThunk and updateRestaurantThunk)
//  (DAB, 3/10/2022, Fixed addRestaurantThunk to match new image controller specs)
//  (DAB, 3/13/2022, Both updateRestaurantThunk and addRestaurantThunk work with image 
//  uploads and deletes. Fully functional by current models)
//  (DAB, 3/13/2022, Added comments and arranged methods for better readability)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import RestaurantDataService from "../services/restaurant.service";
import ImageDataService from "../services/image.service";
import { formatDBRestaurantFind, formatDBRestaurantCreate } from '../helperFunction/actionHelpers';


/************************************ REDUX THUNK ACTIONS ***********************************/


/**
 * The addRestaurantThunk will add a new restaurant to the image cloud, database, and 
 * redux state.
 * 
 * @param {*} userCreatorId 
 * @param {*} restaurantName 
 * @param {*} address 
 * @param {*} city 
 * @param {*} state 
 * @param {*} zip 
 * @param {*} restaurantPhone 
 * @param {*} restaurantDigiContact 
 * @param {*} restaurantWebsite 
 * @param {*} file 
 * @returns 
 */
export const addRestaurantThunk = (
    userCreatorId, restaurantName, address, city, state,
    zip, restaurantPhone, restaurantDigiContact, restaurantWebsite,
    file) => async dispatch => {
        // Defining imageLocation as an empty string for default
        let imageLocation = "";

        // If file exists, upload to cloud and add location to the new review
        if (file && file.size > 0) {
            // The default directory and type to be used with restaurant image uploads
            const directory = "main";
            const type = "restaurants";

            // Call and await the image data service upload method, passing the file as a parameter
            return await ImageDataService.upload(file, directory, type)
                .then(async res => {
                    // Upon result, either the newly created cloud server location or an empty 
                    // string will be used
                    imageLocation = res.data.location || "";

                    // Call and await the user data service create method, passing the parameters and storing the 
                    // results in a constant
                    return await RestaurantDataService.create({
                        userCreatorId, restaurantName, address, city, state,
                        zip, restaurantPhone, restaurantDigiContact, restaurantWebsite,
                        imageLocation
                    })
                        .then(res => {
                            // If the results are added to the database the state is updated 
                            // to reflect the change
                            if (res) {
                                // Formatting the data received from the restaurant data service 
                                // and saving it to a constant
                                const restaurantData = formatDBRestaurantCreate(res.data)

                                // Dispatching the formatted data to the redux action to add 
                                // it to state
                                dispatch(addRestaurant(restaurantData))

                                // Returning the data to the caller
                                return restaurantData;
                            }
                            // Else the console is logged a not added message and false is returned
                            else {
                                console.log("Restaurant was not added");

                                // Failed to update/upload, false is returned
                                return false;
                            }
                        })
                        .catch(err => {
                            // Any errors will be printed to the console
                            console.log(err)

                            // Failed to add/upload, false is returned
                            return false;
                        })
                })
                .catch(err => {
                    // Any errors will be printed to the console
                    console.log(err)

                    // Failed to add/upload, false is returned
                    return false;
                })
        }
        // Else there is not image to upload so the data is only updated in the database
        else {
            // Call and await the user data service create method, passing the parameters and storing the 
            // results in a constant
            return await RestaurantDataService.create({
                userCreatorId, restaurantName, address, city, state,
                zip, restaurantPhone, restaurantDigiContact, restaurantWebsite,
                imageLocation
            })
                .then(res => {
                    // If the results are added to the database the state is updated 
                    // to reflect the change
                    if (res) {
                        // Formatting the data received from the restaurant data service 
                        // and saving it to a constant
                        const restaurantData = formatDBRestaurantCreate(res.data)

                        // Dispatching the formatted data to the redux action to add 
                        // it to state
                        dispatch(addRestaurant(restaurantData))

                        // Returning the data to the caller
                        return restaurantData;
                    }
                    // Else the console is logged a not added message and false is returned
                    else {
                        console.log("Restaurant was not added");

                        // Failed to update/upload, false is returned
                        return false;
                    }
                })
                .catch(err => {
                    // Any errors will be printed to the console
                    console.log(err)

                    // Failed to update/upload, false is returned
                    return false;
                })
        }
    }


/**
 * The deleteRestaurantThunk will delete a restaurant from both the database 
 * and state by referencing the userId.
 * 
 * @param {*} userId 
 * @returns 
 */
export const deleteRestaurantThunk = (restaurantId) => async dispatch => {
    // Making the call to the service to request the deletion of the restaurant
    await RestaurantDataService.delete(restaurantId)
        .then(res => {
            // If there is a response the state will be updated
            if (res) {

                // Dispatching the action to delete the restaurant from state
                dispatch(deleteRestaurant(restaurantId));
            }
        })
        .catch(err => {
            // If there is an error it will be logged
            console.log(err)
        })
}


/**
 * Searches the database for all restaurants with up to the offset/limit. It will then 
 * add the results to state.
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
export const findAllRestaurantsOrderedThunk = (offset, limit) => async dispatch => {
    // The restaurant database will be queried for all restaurants within the 
    // parameter offset/limit
    await RestaurantDataService.findAllOffsetLimit(offset, limit)
        .then(async res => {
            // If there is data in the query it is added to redux state
            if (res) {
                // Iterating through the restaurant data
                await res.data.map(restaurant => {
                    // The restaurant data is formatted to be added to redux state
                    const restaurantData = formatDBRestaurantFind(restaurant);

                    // Adding the restaurant to redux state
                    dispatch(addRestaurant(restaurantData));

                    // Returning the restaurant data
                    return restaurant;
                })
            }
        })
        .catch(err => {
            // If there is an error it will be logged
            console.log(err)
        })
}


/**
 * Searches the database by restaurant name for all matching restaurants up to the 
 * offset/limit. It will then add the results to state.
 * 
 * @param {*} restaurantName
 * @returns 
 */
export const findByRestaurantIdThunk = (restaurantId) => async dispatch => {
    // The restaurant database will be queried for all restaurants within the 
    // parameter offset/limit that are like the restaurantName
    return await RestaurantDataService.get(restaurantId)
        .then(async res => {
            // If there is data in the query it is added to redux state
            if (res) {
                // The restaurant data is formatted to be added to redux state
                const restaurantData = formatDBRestaurantFind(res.data);

                // Adding the restaurant to redux state
                dispatch(addRestaurant(restaurantData));

                // Returning true if data was added to the state
                return true;
            }
            // Else data was not found so false is returned
            else {
                console.log("Restaurant not found");
                return false;
            }
        }
        )
        .catch(err => {
            // If there is an error it will be logged, and false 
            // will be returned
            console.log(err)
            return false;
        })
}


/**
 * Searches the database by restaurant name for all matching restaurants up to the 
 * offset/limit. It will then add the results to state.
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @param {*} restaurantName
 * @returns 
 */
export const findByRestaurantNameThunk = (offset, limit, restaurantName) => async dispatch => {
    // The restaurant database will be queried for all restaurants within the 
    // parameter offset/limit that are like the restaurantName
    await RestaurantDataService.findByNameOffsetLimit(offset, limit, restaurantName)
        .then(async res => {
            console.log(res);
            // If there is data in the query it is added to redux state
            if (res) {
                // Iterating through the restaurant data
                await res.data.map(restaurant => {
                    // The restaurant data is formatted to be added to redux state
                    const restaurantData = formatDBRestaurantFind(restaurant);

                    // Adding the restaurant to redux state
                    dispatch(addRestaurant(restaurantData));

                    // Returning the restaurant data
                    return restaurant;
                })
            }
        })
        .catch(err => {
            // If there is an error it will be logged
            console.log(err)
        })
}


/**
 * The updateRestaurantThunk will update an existing restaurant in the database. It 
 * updates the state, database, and image cloud server with the new data. 
 * 
 * @param {*} restaurantId 
 * @param {
 * @param restaurantName
 * @param restaurantDigiContact
 * @param restaurantPhone
 * @param userCreatorId
 * @param restaurantWebsite
 * @param userName
 * @param imageId
 * @param imageLocation
 * @param address
 * @param city
 * @param state
 * @param zip
 * @param file - file to upload, only uploads one file at index 0
 * } param1 
 * @returns 
 */
export const updateRestaurantThunk = (restaurantId,
    {
        restaurantName,
        restaurantDigiContact,
        restaurantPhone,
        userCreatorId,
        restaurantWebsite,
        userName,
        imageId,
        imageLocation,
        address,
        city,
        state,
        zip,
        file
    }) => async dispatch => {
        // If file exists, upload to cloud and add location to the new review
        if (file && file.size > 0) {
            // The default directory and type to be used with restaurant image uploads
            const directory = "main";
            const type = "restaurants";

            // If the imageLocation is not an empty string then it is deleted from the image 
            // cloud server
            imageLocation !== "" && await ImageDataService.delete(imageLocation)
                .catch(err => {
                    // If there is an error it will be logged
                    console.log(`Did not delete an image ${err}`)
                });

            // Call and await the image data service upload method, passing the file as a parameter
            return await ImageDataService.upload(file, directory, type)
                .then(async res => {
                    // Upon result, either the newly created cloud server location or an empty 
                    // string will be used
                    imageLocation = res.data.location || "";

                    // Making the call to the service to request an update to the database
                    return await RestaurantDataService.update(restaurantId,
                        {
                            restaurantName,
                            restaurantDigiContact,
                            restaurantPhone,
                            userCreatorId,
                            restaurantWebsite,
                            userName,
                            imageId,
                            imageLocation,
                            address,
                            city,
                            state,
                            zip
                        })
                        .then(res => {
                            // If the results are updated in the database the state is updated 
                            // to reflect the change
                            if (res) {
                                // Creating an imageArray to update the redux state
                                const imageArray =
                                    [
                                        {
                                            imageId: imageId,
                                            imageLocation: imageLocation
                                        }
                                    ]

                                // Dispatching the action to update state permission from the param data
                                dispatch(updateRestaurant({
                                    restaurantId,
                                    restaurantName,
                                    restaurantDigiContact,
                                    restaurantPhone,
                                    userCreatorId,
                                    restaurantWebsite,
                                    userName,
                                    imageArray,
                                    address,
                                    city,
                                    state,
                                    zip
                                }))

                                // A successful update returns true
                                return true;
                            }
                            // If no update occurred the console is logged a not 
                            // added message and false is returned
                            else {
                                console.log("Restaurant was not updated")

                                // False is returned for no update
                                return false;
                            }
                        })
                        .catch(err => {
                            // Any errors will be printed to the console
                            console.log(err)

                            // Failed to update/upload, false is returned
                            return false;
                        });
                })
                .catch(err => {
                    // Any errors will be printed to the console
                    console.log(err);

                    // Failed to update/upload, false is returned
                    return false;
                });
        }
        else {
            // Making the call to the service to request an update to the database
            return await RestaurantDataService.update(restaurantId,
                {
                    restaurantName,
                    restaurantDigiContact,
                    restaurantPhone,
                    userCreatorId,
                    restaurantWebsite,
                    userName,
                    imageId,
                    imageLocation,
                    address,
                    city,
                    state,
                    zip
                })
                .then(res => {
                    // If the results are updated in the database the state is updated 
                    // to reflect the change
                    if (res) {
                        // Creating an imageArray to update the redux state
                        const imageArray =
                            [
                                {
                                    imageId: imageId,
                                    imageLocation: imageLocation
                                }
                            ]

                        // Dispatching the action to update state permission from the param data
                        dispatch(updateRestaurant({
                            restaurantId,
                            restaurantName,
                            restaurantDigiContact,
                            restaurantPhone,
                            userCreatorId,
                            restaurantWebsite,
                            userName,
                            imageArray,
                            address,
                            city,
                            state,
                            zip
                        }))

                        // A successful update returns true
                        return true;
                    }
                    // If no update occurred the console is logged a not 
                    // added message and false is returned
                    else {
                        console.log("Restaurant was not updated")

                        // False is returned for no update
                        return false;
                    }
                })
                .catch(err => {
                    // If there is an error it will be logged
                    console.log(err)

                    // Failed to update/upload, false is returned
                    return false;
                })
        }
    }


/************************************ REACT REDUX ACTIONS ***********************************/


/**
 * React Redux reducer that will add a new restaurant to state.
 * 
 * @param {
 * @param {*} restaurantId - Id of the restaurant.
 * @param {*} userCreatorId - Id of the user who created/updated the restaurant.
 * @param {*} userName - User name of the user who created/updated the restaurant.
 * @param {*} userOwnerId - Id of the user who owns the restaurant.
 * @param {*} restaurantName - Name of the restaurant.
 * @param {*} restaurantDigiContact - Digital contact link of the restaurant, typically 
 * a URL to the contact page of their website.
 * @param {*} restaurantWebsite - Main website URL of the restaurant.
 * @param {*} restaurantPhone - Restaurant phone number.
 * @param {*} addressId - Database address Id of the restaurant.
 * @param {*} address - Physical address of the restaurant.
 * @param {*} city - City of the restaurant.
 * @param {*} state - State of the restaurant.
 * @param {*} zip - Zip of the restaurant.
 * @param {*} ratingId - Database ratingId.
 * @param {*} tasteRating - int taste rating.
 * @param {*} serviceRating - int service rating.
 * @param {*} cleanlinessRating - int cleanliness rating.
 * @param {*} overallRating - int overall rating.
 * @param {*} reviewCount - int total number of reviews for this restaurant.
 * @param {*} imageId - Database image id.
 * @param {*} imageLocation - File location of the image.
 * } param0 
 * @returns 
 */
export const addRestaurant = ({ restaurantId, userCreatorId,
    userName, userOwnerId, restaurantName,
    restaurantDigiContact, restaurantWebsite,
    restaurantPhone, addressId, address,
    city, state, zip, ratingId, tasteRating,
    serviceRating, cleanlinessRating, overallRating,
    reviewCount, imageId, imageLocation }) => ({
        type: C.ADD_RESTAURANT,
        id: restaurantId,
        author: {
            id: userCreatorId,
            userName: userName
        },
        ownerId: userOwnerId,
        name: restaurantName,
        digitalContact: restaurantDigiContact,
        website: restaurantWebsite,
        phone: restaurantPhone,
        address: {
            id: addressId,
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        rating: {
            id: ratingId,
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        },
        reviewCount: reviewCount,
        images: [
            {
                id: imageId,
                imageLocation: imageLocation
            }
        ]
    })

/**
 * React Redux reducer that will decrement the review count in state.
 * 
 * @param {*} restaurantId 
 * @returns 
 */
export const decrementRestaurantReviewCount = (restaurantId) => ({
    type: C.DECREMENT_RESTAURANT_REVIEW_COUNT,
    id: restaurantId
})

/**
 * React Redux reducer that will delete all restaurants from state.
 * 
 * @returns 
 */
export const deleteAllRestaurants = () => ({
    type: C.DELETE_ALL_RESTAURANTS
})

/**
 * React Redux reducer that will delete a restaurant from state.
 * @param {*} restaurantId 
 * @returns 
 */
export const deleteRestaurant = (restaurantId) => ({
    type: C.DELETE_RESTAURANT,
    id: restaurantId
})

/**
 * React Redux reducer that will increment the review count in state.
 * 
 * @param {*} restaurantId 
 * @returns 
 */
export const incrementRestaurantReviewCount = (restaurantId) => ({
    type: C.INCREMENT_RESTAURANT_REVIEW_COUNT,
    id: restaurantId
})

/**
 * React Redux reducer that will update a restaurant owner Id in state 
 * based off the param restaurant id.
 * 
 * @param {*} restaurantId 
 * @param {*} ownerId 
 * @returns 
 */
export const updateRestaurantOwner = (restaurantId, ownerId) => ({
    type: C.UPDATE_RESTAURANT_OWNER,
    id: restaurantId,
    ownerId: ownerId
})

/**
 * React Redux reducer that will update the restaurant in state.
 * @param {*} restaurantId 
 * @param {*} restaurantName 
 * @param {*} authorId 
 * @param {*} authorUserName 
 * @param {*} address 
 * @param {*} city 
 * @param {*} state 
 * @param {*} zip 
 * @param {*} phone 
 * @param {*} digitalContact 
 * @param {*} website 
 * @param {*} imageLocation 
 * @returns 
 */
export const updateRestaurant = ({ restaurantId, restaurantName, userCreatorId, userName, address,
    city, state, zip, restaurantPhone, restaurantDigiContact, restaurantWebsite, imageArray }) => ({
        type: C.UPDATE_RESTAURANT,
        id: restaurantId,
        author: {
            id: userCreatorId,
            userName: userName
        },
        name: restaurantName,
        digitalContact: restaurantDigiContact,
        website: restaurantWebsite,
        phone: restaurantPhone,
        address: {
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        images: imageArray
    })

/**
 * React Redux reducer that will update the restaurant rating in state for the 
 * param id restaurant.
 * 
 * @param {*} restaurantId 
 * @param {*} tasteRating 
 * @param {*} serviceRating 
 * @param {*} cleanlinessRating 
 * @param {*} overallRating 
 * @returns 
 */
export const updateRestaurantRating = (restaurantId, tasteRating, serviceRating,
    cleanlinessRating, overallRating) => ({
        type: C.UPDATE_RESTAURANT_RATING,
        id: restaurantId,
        rating: {
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        }
    })

/**
 * React Redux update the restaurant review count with a new number.
 * 
 * @param {*} restaurantId 
 * @param {*} reviewCount 
 * @returns 
 */
export const updateRestaurantReviewCount = (restaurantId, reviewCount) => ({
    type: C.UPDATE_RESTAURANT_REVIEW_COUNT,
    id: restaurantId,
    reviewCount: reviewCount
})