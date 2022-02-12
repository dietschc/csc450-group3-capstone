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

function EditRestaurantForm(props) {
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
        console.log(data);
        setSubmitted(true);
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

// Exporting the component
export default EditRestaurantForm;