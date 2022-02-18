// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurantForm.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import FloatingAddress from './floatingComponents/FloatingAddress';
import FloatingStateZip from './floatingComponents/FloatingStateZip';
import FloatingCity from './floatingComponents/FloatingCity';
import FloatingRestaurantName from './floatingComponents/FloatingRestaurantName';
import FloatingPhone from './floatingComponents/FloatingPhone';
import FloatingDigitalContact from './floatingComponents/FloatingDigitalContact';
import FloatingWebsite from './floatingComponents/FloatingWebsite';
import EditFormButtons from './button/EditFormButtons';
import FloatingImageUpload from './floatingComponents/FloatingImageUpload';
import { connect } from 'react-redux';
import { addRestaurant, decrementRestaurantReviewCount, deleteAllRestaurants,
deleteRestaurant, incrementRestaurantReviewCount, updateRestaurant, updateRestaurantRating,
updateRestaurantReviewCount, updateRestaurantOwner } from '../../actions/restaurants';

function EditRestaurantForm(props) {
    // Redux store functions
    const { addRestaurant, decrementRestaurantReviewCount, deleteAllRestaurants,
        deleteRestaurant, incrementRestaurantReviewCount, updateRestaurant, updateRestaurantRating,
        updateRestaurantReviewCount, updateRestaurantOwner } = props;

    // Is this a restaurant add or update
    const { isUpdate } = props;

    // keeps track of if the form was submitted
    const [submitted, setSubmitted] = useState(false);

    //*******The following test states will be replaced by Redux in Milestone 2**********/
    const [restaurantName, setRestaurantName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [digitalContact, setDigitalContact] = useState("");
    const [website, setWebsite] = useState("");
    const [fileName, setFileName] = useState("");

    const onChangeRestaurantName = e => {
        const restaurantName = e.target.value;
        setRestaurantName(restaurantName);
    }

    const onChangeAddress = e => {
        const address = e.target.value;
        setAddress(address);
    }

    const onChangeCity = e => {
        const city = e.target.value;
        setCity(city);
    }

    const onChangeZip = e => {
        const zip = e.target.value;
        setZip(zip);
    }

    const onChangeState = e => {
        const state = e.target.value;
        setState(state);
    }

    const onChangePhone = e => {
        const phone = e.target.value;
        setPhone(phone);
    }

    const onChangeDigitalContact = e => {
        const digitalContact = e.target.value;
        setDigitalContact(digitalContact);
    }

    const onChangeWebsite = e => {
        const website = e.target.value;
        setWebsite(website);
    }

    const onChangeFileName = e => {
        const fileName = e.target.value;
        setFileName(fileName);
    }

    const saveAccount = () => {
        var data = {
            restaurantName: restaurantName,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phone: phone,
            digitalContact: digitalContact,
            website: website,
            fileName: fileName
        }

        // console.log(data);
        // setSubmitted(true);

        //DEBUG Redux Test data
        var testData = {
            restaurantId: 0,
            authorId: 11,
            authorUserName: "Test Author",
            ownerId: 12,
            restaurantName: "Happy Fun Time",
            digitalContact: "Test Contact",
            website: "Test Website",
            phone: "test number",
            addressId: 13,
            address: "123 Test Lane",
            city: "Testopolis",
            state: "CA",
            zip: "88444",
            ratingId: 13,
            tasteRating: 1,
            serviceRating: 2,
            cleanlinessRating: 3,
            overallRating: 5,
            reviewCount: 100,
            imageId: 10,
            imageLocation: "Fake Image Test"
        }

        // addRestaurant(testData.restaurantId, testData.authorId, testData.authorUserName, testData.ownerId, 
        //     testData.restaurantName, testData.digitalContact, testData.website, 
        //     testData.phone, testData.addressId, testData.address, testData.city, testData.state, testData.zip, 
        //     testData.ratingId, testData.tasteRating, testData.serviceRating, testData.cleanlinessRating, 
        //     testData.overallRating, 
        //     testData.reviewCount, testData.imageId, testData.imageLocation)
        // decrementRestaurantReviewCount(testData.restaurantId)
        // incrementRestaurantReviewCount(testData.restaurantId)
        // deleteRestaurant(testData.restaurantId)
        // updateRestaurantOwner(testData.restaurantId, testData.ownerId)

        // updateRestaurant(testData.restaurantId, testData.restaurantName, testData.authorId, testData.authorUserName, 
        //     testData.address, testData.city, testData.state, testData.zip, testData.phone, 
        //     testData.digitalContact, testData.website, testData.imageLocation)
        
        // updateRestaurantRating(testData.restaurantId, testData.tasteRating, testData.serviceRating, 
        //     testData.cleanlinessRating, testData.overallRating)
        // updateRestaurantReviewCount(testData.restaurantId, testData.reviewCount)

    }

    const clearForm = () => {
        setRestaurantName("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        setPhone("");
        setDigitalContact("");
        setWebsite("");
        setFileName("");
        console.log("Form cleared");
    }

    // The EditRestaurant form will be displayed using floating labels
    return (
        <Form>
            <FloatingRestaurantName restaurantName={restaurantName} onChangeRestaurantName={onChangeRestaurantName}/>
            <FloatingAddress address={address} onChangeAddress={onChangeAddress}/>
            <FloatingCity city={city} onChangeCity={onChangeCity}/>
            <FloatingStateZip state={state} zip={zip} onChangeState={onChangeState} onChangeZip={onChangeZip}/>
            <FloatingPhone phone={phone} onChangePhone={onChangePhone}/>
            <FloatingDigitalContact digitalContact={digitalContact} onChangeDigitalContact={onChangeDigitalContact}/>
            <FloatingWebsite website={website} onChangeWebsite={onChangeWebsite}/>
            <FloatingImageUpload fileName={fileName} onChangeFileName={onChangeFileName}/>
            <EditFormButtons isUpdate={isUpdate} saveAccount={saveAccount} clearForm={clearForm}/>
            
        </Form>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state => 
    ({
        reviews: [...state.reviews],
        users: [...state.users],
        messages: [...state.messages]
    });

// Mapping the state actions to props
const mapDispatchToProps = dispatch => 
    ({
        // This method will add a new review
        addRestaurant(restaurantId, authorId, authorUserName, ownerId, restaurantName, digitalContact, website, 
            phone, addressId, address, city, state, zip, ratingId, tasteRating, serviceRating, cleanlinessRating, overallRating, 
            reviewCount, imageId, imageLocation) {
            dispatch(addRestaurant(restaurantId, authorId, authorUserName, ownerId, restaurantName, digitalContact, website, 
                phone, addressId, address, city, state, zip, ratingId, tasteRating, serviceRating, cleanlinessRating, overallRating, 
                reviewCount, imageId, imageLocation)
                )
        },
        decrementRestaurantReviewCount(restaurantId) {
            dispatch(decrementRestaurantReviewCount(restaurantId)
            )
        },
        deleteAllRestaurants() {
            dispatch(deleteAllRestaurants()
            )
        },
        deleteRestaurant(id) {
            dispatch(deleteRestaurant(id))
        },
        incrementRestaurantReviewCount(restaurantId) {
            dispatch(incrementRestaurantReviewCount(restaurantId)
            )
        },
        updateRestaurantOwner(restaurantId, ownerId) {
            dispatch(updateRestaurantOwner(restaurantId, ownerId)
            )
        },
        updateRestaurant(restaurantId, restaurantName, authorId, authorUserName, address, 
            city, state, zip, phone, digitalContact, website, imageLocation) {
            dispatch(updateRestaurant(restaurantId, restaurantName, authorId, authorUserName, address, 
                city, state, zip, phone, digitalContact, website, imageLocation)
                )
        },
        updateRestaurantRating(restaurantId, tasteRating, serviceRating, 
            cleanlinessRating, overallRating) {
            dispatch(updateRestaurantRating(restaurantId, tasteRating, serviceRating, 
                cleanlinessRating, overallRating)
                )
        },
        updateRestaurantReviewCount(restaurantId, reviewCount) {
            dispatch(updateRestaurantReviewCount(restaurantId, reviewCount) 
            )
        }
    })


// Exporting the connect Wrapped EditRestaurantForm Component
export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurantForm);