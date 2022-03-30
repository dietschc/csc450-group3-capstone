// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - TestData.js
// March 4, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 3/5/2022, Added friend test data and functions)
//  (DAB, 03/13/2022, Added in messages and more friends)
// (TJI) Fixed a typo in a state field

const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const Authentication = db.authentication;
const User = db.users;
const Address = db.address;
const Friend = db.friend;
const Image = db.image;
const Rating = db.rating;
const Restaurant = db.restaurants;
const History = db.history;
const Review = db.review;
const ReviewImage = db.reviewImage;
const Message = db.message;
const Conversation = db.conversation;


const user1Data = {
    address: "1742 Nicolett St NW",
    city: "Carlson",
    state: "MN",
    zip: "90210",
    firstName: "tom",
    lastName: "jones",
    userEmail: "email1@yahoo.com",
    userName: "test",
    userPassword: "test"
}

const user2Data = {
    address: "1742 Evergreen Terrace",
    city: "Springfield",
    state: "MN",
    zip: "90210",
    firstName: "apples",
    lastName: "apples",
    userEmail: "apples",
    userName: "orange",
    userPassword: "banana"
}

const user3Data = {
    address: "1742 Evergreen Terrace",
    city: "Springfield",
    state: "MN",
    zip: "90210",
    firstName: "Nick",
    lastName: "Heart",
    userEmail: "apples",
    userName: "AppleEater",
    userPassword: "apples"
}

const user4Data = {
    address: "5000 Evergreen Terrace",
    city: "Williston",
    state: "MN",
    zip: "55100",
    firstName: "apples",
    lastName: "caramel",
    userEmail: "apples",
    userName: "spiderman",
    userPassword: "apples"
}

const user5Data = {
    address: "12754 Happy St NW",
    city: "Tampico",
    state: "FL",
    zip: "66123",
    firstName: "Admi",
    lastName: "Nistrator",
    userEmail: "boss@admin.com",
    userName: "admin",
    userPassword: "admin"
}
const restaurant1Data = {
    userCreatorId: 1,
    address: "Happy Day St",
    city: "Sunshine",
    state: "MN",
    zip: "11111",
    imageLocation: "/reviewImages/0/olive-garden-restaurants-italian-style-g2-rdv.jpg",
    restaurantName: "Uncle Bens",
    restaurantDigiContact: "uncleBen@yahoo.com",
    restaurantPhone: "1112223333",
    restaurantWebsite: "uncleBens.com"
}

const restaurant2Data = {
    userCreatorId: 2,
    address: "1525 County Rd C West",
    city: "Roseville",
    state: "MN",
    zip: "55113",
    imageLocation: "/reviewImages/0/olive-garden-restaurants-italian-style-g2-rdv.jpg",
    restaurantName: "Olive Garden",
    restaurantDigiContact: "https://m.olivegarden.com/contact-us",
    restaurantPhone: "6516389557",
    restaurantWebsite: "https://www.olivegarden.com/locations/mn/roseville/roseville-snelling-and-county-road-c/1245?cmpid=br:og_ag:ie_ch:loc_ca:OGGMB_sn:gmb_gt:roseville-mn-1245_pl:locurl_rd:1184"
}

const restaurant3Data = {
    userCreatorId: 3,
    address: "209 Radio Dr",
    city: "Woodbury",
    state: "MN",
    zip: "55125",
    imageLocation: "/reviewImages/1/roadhouse.jpg",
    restaurantName: "Texas Roadhouse",
    restaurantDigiContact: "https://www.texasroadhouse.com/contact-us",
    restaurantPhone: "6124217171",
    restaurantWebsite: "https://www.texasroadhouse.com/locations/661-woodburymn"
}

const restaurant4Data = {
    userCreatorId: 4,
    address: "12450 Business Park Blvd N",
    city: "Champlin",
    state: "MN",
    zip: "55301",
    imageLocation: "/reviewImages/2/willyMcoysChamplin.jpg",
    restaurantName: "Willy McCoys",
    restaurantDigiContact: "happycontact",
    restaurantPhone: "7634225020",
    restaurantWebsite: "https://www.willymccoys.com/location/champlin/"
}

const review1Data = {
    userId: 1,
    restaurantId: 2,
    reviewTitle: "Best Pasta in Town!!",
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet mauris ac eros efficitur consectetur in eget nunc. Vestibulum ac venenatis tortor, id finibus.",
    tasteRating: 5,
    serviceRating: 4,
    cleanlinessRating: 3,
    overallRating: 4,
    imageLocation: "/reviewImages/0/olive-garden-restaurants-italian-style-g2-rdv.jpg"
}

const review2Data = {
    userId: 1,
    restaurantId: 4,
    reviewTitle: "Best Burgers in Town!!",
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur ante non sem elementum, id lacinia sapien malesuada. Ut vel elementum ipsum, a placerat mauris. Nam augue felis, viverra a molestie at, varius eu libero. ",
    tasteRating: 5,
    serviceRating: 3,
    cleanlinessRating: 1,
    overallRating: 3,
    imageLocation: "/reviewImages/2/willyMcoysChamplin.jpg"
}

const review3Data = {
    userId: 2,
    restaurantId: 3,
    reviewTitle: "Best Steaks in Town!!",
    reviewText: "Morbi semper tincidunt justo, dignissim mattis enim. Duis porttitor ante vitae mi finibus molestie. Nulla cursus pretium eros, sed fermentum lacus luctus a. Duis aliquet mi non tincidunt porta. Aliquam in ornare ligula.",
    tasteRating: 5,
    serviceRating: 5,
    cleanlinessRating: 5,
    overallRating: 5,
    imageLocation: "/reviewImages/1/roadhouse.jpg"
}

const review4Data = {
    userId: 3,
    restaurantId: 1,
    reviewTitle: "Title",
    reviewText: "Review Body Text",
    tasteRating: 1,
    serviceRating: 1,
    cleanlinessRating: 1,
    overallRating: 1,
    imageLocation: "/reviewImages/0/olive-garden-restaurants-italian-style-g2-rdv.jpg"
}

const friend1Data = {
    friendOneId: 1,
    friendTwoId: 3
}

const friend4Data = {
    friendOneId: 3,
    friendTwoId: 1
}

const friend2Data = {
    friendOneId: 2,
    friendTwoId: 1
}

const friend5Data = {
    friendOneId: 1,
    friendTwoId: 2
}

const friend3Data = {
    friendOneId: 2,
    friendTwoId: 3
}

const friend6Data = {
    friendOneId: 3,
    friendTwoId: 2
}

const friend7Data = {
    friendOneId: 2,
    friendTwoId: 4
}

const friend8Data = {
    friendOneId: 4,
    friendTwoId: 2
}

const friend9Data = {
    friendOneId: 5,
    friendTwoId: 1
}

const friend10Data = {
    friendOneId: 1,
    friendTwoId: 5
}

const friend11Data = {
    friendOneId: 5,
    friendTwoId: 2
}

const friend12Data = {
    friendOneId: 2,
    friendTwoId: 5
}

const friend13Data = {
    friendOneId: 5,
    friendTwoId: 3
}

const friend14Data = {
    friendOneId: 3,
    friendTwoId: 5
}

const friend15Data = {
    friendOneId: 5,
    friendTwoId: 4
}

const friend16Data = {
    friendOneId: 4,
    friendTwoId: 5
}

const friend17Data = {
    friendOneId: 4,
    friendTwoId: 3
}

const friend18Data = {
    friendOneId: 3,
    friendTwoId: 4
}

const friend19Data = {
    friendOneId: 4,
    friendTwoId: 1
}

const friend20Data = {
    friendOneId: 1,
    friendTwoId: 4
}

const friendArray = [
    friend1Data,
    friend2Data,
    friend3Data,
    friend4Data,
    friend5Data,
    friend6Data,
    friend7Data,
    friend8Data,
    friend9Data,
    friend10Data,
    friend11Data,
    friend12Data,
    friend13Data,
    friend14Data,
    friend15Data,
    friend16Data,
    friend17Data,
    friend18Data,
    friend19Data,
    friend20Data
]

const message1Data = {
    userToId: 5,
    userFromId: 1,
    message: "Hello buddy!"
}

const message2Data = {
    userToId: 1,
    userFromId: 5,
    message: "Hey there"
}

const message3Data = {
    userToId: 5,
    userFromId: 1,
    message: "Where can I find some good steak?"
}

const message4Data = {
    userToId: 5,
    userFromId: 1,
    message: "All the ones I found have been very dry!"
}

const message5Data = {
    userToId: 1,
    userFromId: 5,
    message: "Roadhouse is my favorite. Check out the reviews, they are awesome!"
}

const message6Data = {
    userToId: 1,
    userFromId: 5,
    message: "Thanks"
}

const message7Data = {
    userToId: 3,
    userFromId: 1,
    message: "Hi, thanks for the add!"
}

const message8Data = {
    userToId: 3,
    userFromId: 1,
    message: "No problem, we seem to enjoy the same foods"
}

const message9Data = {
    userToId: 3,
    userFromId: 1,
    message: "I am looking to wine and dine, any suggestions?"
}

const message10Data = {
    userToId: 1,
    userFromId: 3,
    message: "Osaka hibachi is pretty cool if you go earlier"
}

const message11Data = {
    userToId: 3,
    userFromId: 1,
    message: "Awesome, I will try it!"
}

const message12Data = {
    userToId: 1,
    userFromId: 2,
    message: "Hi"
}


const message13Data = {
    userToId: 2,
    userFromId: 1,
    message: "Yo"
}

const message14Data = {
    userToId: 1,
    userFromId: 2,
    message: "Burger at Mcoys in 30?"
}

const message15Data = {
    userToId: 2,
    userFromId: 1,
    message: "You bet"
}

const messageArray = [
    message1Data,
    message2Data,
    message3Data,
    message4Data,
    message5Data,
    message6Data,
    message7Data,
    message8Data,
    message9Data,
    message10Data,
    message11Data,
    message12Data,
    message13Data,
    message14Data,
    message15Data
]

loadTestData = async () => {
    console.log("Adding Permission table data");
    await db.permission.create({ permissionName: "member" });
    await db.permission.create({ permissionName: "owner" });
    await db.permission.create({ permissionName: "banned" });
    await db.permission.create({ permissionName: "admin" });

    console.log("Loading in Users")
    await addUser(user1Data)
    await addUser(user2Data)
    await addUser(user3Data)
    await addUser(user4Data)
    await addUser(user5Data)

    // Set user 5 to admin permission
    const data = {
        userId: 5,
        permissionId: 4
    }

    // Set user 2 to owner permission
    const data2 = {
        userId: 2,
        permissionId: 2
    }

    await updatePermission(data);
    await updatePermission(data2);

    console.log("Loading in Restaurants")
    await addRestaurant(restaurant1Data)
    await addRestaurant(restaurant2Data)
    await addRestaurant(restaurant3Data)
    await addRestaurant(restaurant4Data)

    console.log("Loading in Reviews")
    await addReview(review1Data)
    await addReview(review2Data)
    await addReview(review3Data)
    await addReview(review4Data)

    console.log("Loading in Friends")
    await friendArray.forEach(async friend => await addFriend(friend))

    console.log("Loading in Messages")
    await messageArray.forEach(message => addMessage(message));
}

const addUser = async ({ userName, firstName, lastName, address,
    city, state, zip, userEmail, userPassword }) => {
    // Build parameters for address table insert
    const addressData = {
        address: address,
        city: city,
        state: state,
        zip: zip,
    };

    // Wait for the address to be created, then copy to a const
    const newAddress = await Address.create(addressData)
        .then(newAddress => {
            return newAddress;
        })

    // Build parameters for user table insert
    const user = {
        addressId: newAddress.addressId,
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
    };

    // Wait for a user to be created, then copy to a const
    const newUser = await User.create(user)
        .then(newUser => {
            return newUser;
        })

    // Debug code
    // console.log("new user: " + JSON.stringify(newUser));

    // Build parameters for authentication table insert
    const authentication = {
        userId: newUser.userId,
        // Default permissionId level is 1 for members
        permissionId: 1, // FK constraint with Permission table
        userName: userName,
        userPassword: userPassword,
        // historyId: null, // FK constraing with History table
    }

    // Save Authentication in the database
    Authentication.create(authentication)
}

addRestaurant = async ({ userCreatorId, restaurantName,
    restaurantDigiContact, restaurantWebsite,
    restaurantPhone, address,
    city, state, zip, imageLocation }) => {
    // Creating an array to hold the needed table ideas as the adjoining 
    // restaurant tables are created
    const restaurantData = {
        userCreatorId: userCreatorId,
        userOwnerId: null,
        ratingId: null,
        addressId: null,
        imageId: null,
        restaurantName: restaurantName,
        restaurantDigiContact: restaurantDigiContact,
        restaurantWebsite: restaurantWebsite,
        restaurantPhone: restaurantPhone,
        reviewCount: 0
    };

    const imageData = {
        imageLocation: imageLocation
    }

    const addressData = {
        address: address,
        city: city,
        state: state,
        zip: zip,
    };

    // Ratings start off with a default of 0 so they will show 
    // no stars
    const ratingData = {
        tasteRating: 0,
        serviceRating: 0,
        cleanlinessRating: 0,
        overallRating: 0
    }

    // Wait for the address to be created, then copy to a const
    await Address.create(addressData)
        .then(newAddress => {
            // Assigning the id of the newly created table to the restaurant array
            restaurantData.addressId = newAddress.addressId;
            // Returning the instance
            return newAddress;
        })

    // Wait for the image to be created, then copy to a const
    await Image.create(imageData)
        .then(newImage => {
            // Assigning the id of the newly created table to the restaurant array
            restaurantData.imageId = newImage.imageId;
            // Returning the instance
            return newImage;
        })

    // Wait for the rating to be created, then copy to a const
    await Rating.create(ratingData)
        .then(newRating => {
            restaurantData.ratingId = newRating.ratingId;
            return newRating;
        })

    // Save Restaurant in the database
    await Restaurant.create(restaurantData)
}

addReview = async ({ userId, restaurantId, reviewTitle, reviewText, tasteRating, serviceRating,
    cleanlinessRating, overallRating, imageLocation }) => {
    // Creating an array to hold the needed table ideas as the adjoining 
    // restaurant tables are created
    const reviewData = {
        userId: userId,
        restaurantId: restaurantId,
        ratingId: null,
        reviewTitle: reviewTitle,
        reviewText: reviewText,
        historyId: null
    };

    const ratingData = {
        tasteRating: tasteRating,
        serviceRating: serviceRating,
        cleanlinessRating: cleanlinessRating,
        overallRating: overallRating
    }

    const imageData = {
        imageLocation: imageLocation
    }

    // Creating new timestamps for the the review creation
    const historyData = {
        modified: new Date(),
        created: new Date()
    }

    // Searching the database to verify a restaurant exists to write the review for
    await Restaurant.findByPk(reviewData.restaurantId)
        .then(async (restaurant) => {
            // If a restaurant was found the rating will be created
            if (restaurant) {
                // A new history entry is added for the rating
                const newHistory = await History.create(historyData)
                    .then(history => {
                        // The reviewData array is updated with the historyId
                        reviewData.historyId = history.historyId;

                        // The history object is returned to the caller
                        return history;
                    });

                // A new rating is created for the review
                const newRating = await Rating.create(ratingData)
                    .then(rating => {
                        // The ratingId is updated in the reviewData array
                        reviewData.ratingId = rating.ratingId;

                        // Returning the rating query instance
                        return rating;
                    });

                // A new image row in the image table is created for the review
                const newImage = await Image.create(imageData)
                    .then(image => {
                        // Returning the image instance to the caller
                        return image;
                    });

                // Creating the review table for the new review
                const newReview = await Review.create(reviewData)
                    .then(newReview => {
                        // The new review object is returned to the caller
                        return newReview;
                    });

                // Searching for the restaurant rating to update
                await Rating.findByPk(restaurant.ratingId)
                    .then(async rating => {
                        // Updating the restaurant rating by adding in the new rating to the 
                        // restaurants rating table
                        await rating.update({
                            tasteRating: rating.tasteRating + tasteRating,
                            serviceRating: rating.serviceRating + serviceRating,
                            cleanlinessRating: rating.cleanlinessRating + cleanlinessRating,
                            overallRating: rating.overallRating + overallRating
                        });

                        // Incrementing the restaurants reviewCount by 1 since there is one new review
                        await restaurant.increment('reviewCount', { by: 1 });
                    });

                // Connecting the review and image tables for the new review image
                await ReviewImage.create({
                    imageId: newImage.imageId,
                    reviewId: newReview.reviewId
                })
            }
            // Else the restaurant does not exist so a review cannot be created for it
            else {
            }
        })
}

const addFriend = async ({ friendOneId, friendTwoId }) => {
    // Create a Friend
    const friend = {
        friendOneId: friendOneId,
        friendTwoId: friendTwoId
    };

    // Save Friend in the database
    Friend.create(friend)
}

const updatePermission = async (data) => {
    await Authentication.update(data, { where: { userId: data.userId } })
}

const addMessage = async (data) => {
    // Creating a message data object to hold the message data as 
    // it is created
    const messageData = {
        conversationId: null,
        message: data.message,
    }

    // Searching if the conversation between the two users exists or not
    await Conversation.findOne({
        where: {
            [Op.and]: [
                { userToId: data.userToId },
                { userFromId: data.userFromId }
            ]
        }
    }).then(async conversation => {
        // If the conversation exists, a mew message is added to the database
        if (conversation) {
            // Assigning the correct conversation id to the message data
            messageData.conversationId = conversation.conversationId;

            // Creating the new message and returning the values created
            await Message.create(messageData);
        }
        // Else there is not a conversation entry in the database so a new 
        // one is created before the message is added
        else {
            // Creating a new conversation with the message details
            conversation = await Conversation.create(data)
            .then(newConversation => {
                // Assigning the correct conversationId to the message data
                messageData.conversationId = newConversation.conversationId;

                // Returning that conversation data
                return newConversation;
            })
            .catch(err => {
                // If there is an error it is logged
                console.log(err);
            });

            // Creating the message in the database with the message data
            await Message.create(messageData);
        }
    })
}

module.exports = { loadTestData }
