// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditRestaurantForm.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/18/2022, Added in redux connect for state)
//  (DAB, 3/07/2022, Create and Update Restaurant is working but
//  no current authentication or undefined protections)
//  (DAB, 3/10/2022, Added in comments and cleaned up debugs)
//  (DAB, 3/13/2022, Both add and update restaurant are working as
//  fully intended with image uploads/deletes)
//  (TJI, 04/10/2022 - Added Tooltip for DigiContact)
//  (DAB, 04/13/2022, Added multiple request protection and spinner for adding
//  restaurants)
//  (DAB, 04/14/2022, Added in form validation for max size files)
//  (DAB, 04/16/2022, Added validation for external URL form entries)

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import FloatingAddress from "./floatingComponents/FloatingAddress";
import FloatingStateZip from "./floatingComponents/FloatingStateZip";
import FloatingCity from "./floatingComponents/FloatingCity";
import FloatingRestaurantName from "./floatingComponents/FloatingRestaurantName";
import FloatingPhone from "./floatingComponents/FloatingPhone";
import FloatingDigitalContact from "./floatingComponents/FloatingDigitalContact";
import FloatingWebsite from "./floatingComponents/FloatingWebsite";
import EditFormButtons from "./button/EditFormButtons";
import FloatingImageUpload from "./floatingComponents/FloatingImageUpload";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addRestaurantThunk,
    updateRestaurantThunk,
} from "../../actions/restaurants";
import {
    formatPhoneNumber,
    unformatPhoneNumber,
    formatZipCode,
} from "../../helperFunction/FormatString";
import ModalConfirmation from "../modal/ModalCancelConfirm";
import C from "../../constants";

/**
 * The EditRestaurantForm will display a form that will allow the user to
 * create and/or update a restaurant depending on if a user is logged in and
 * that isUpdate is true (edit) or false(create).
 *
 * @param {
 * isUpdate,
 * isLoading,
 * restaurant,
 * users,
 * addRestaurantThunk,
 * updateRestaurantThunk
 * } props
 * @returns
 */
function EditRestaurantForm(props) {
    // Destructuring needed redux store state and functions
    const { isUpdate, restaurant, users, isLoading } = props;
    // Redux store functions
    const { addRestaurantThunk, updateRestaurantThunk } = props;

    // Component specific state to handle form data
    const [restaurantName, setRestaurantName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [digitalContact, setDigitalContact] = useState("");
    const [imageId, setImageId] = useState("");
    const [website, setWebsite] = useState("");
    const [file, setFile] = useState("");
    const [imageLocationName, setImageLocationName] = useState("");
    const [tempFileUrl, setTempFileUrl] = useState("");
    const [showClearFormConfirm, setShowClearFormConfirm] = useState(false);
    // The formError local state will hold any errors found in the
    // form and their error message
    const [formError, setFormError] = useState({});

    // Creating a navigate instance to navigate the application to new routes
    const navigate = useNavigate();

    // This useEffect will trigger a render when restaurant prop is altered
    useEffect(() => {
        // If there is a restaurant in the restaurant prop
        if (restaurant.length > 0) {
            // That restaurant is destructured into currentRestaurant
            const [currentRestaurant] = restaurant;

            // The form values are set to match those found in the restaurant
            // data
            setRestaurantName(currentRestaurant.name);
            setAddress(currentRestaurant.address.address);
            setCity(currentRestaurant.address.city);
            setZip(currentRestaurant.address.zip);
            setState(currentRestaurant.address.state);
            setPhone(formatPhoneNumber(currentRestaurant.phone));
            setDigitalContact(currentRestaurant.digitalContact);
            setWebsite(currentRestaurant.website);
            setImageId(currentRestaurant.images[0].id);
            setImageLocationName(currentRestaurant.images[0].imageLocation);
        }
    }, [restaurant]);

    // The clearForm method will clear the form values
    const clearForm = () => {
        setRestaurantName("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        setPhone("");
        setDigitalContact("");
        setWebsite("");
        setImageLocationName("");
        setTempFileUrl("");
        setFile(null);
        document.getElementById("floatingImageUpload").value = null;
    };

    // The close handler will close the clear form modal
    const closeClearFormHandler = () => setShowClearFormConfirm(false);

    // The formErrorCheck will hold the logic for checking the
    // form for errors and return them as an object
    const formErrorCheck = () => {
        // Initial empty currentError object
        const currentError = {};

        // If the file size is greater than allowed a max file error
        // will be returned
        if (file?.size > C.MAX_UPLOAD_SIZE) {
            currentError.file = `Max file size is ${C.MAX_UPLOAD_SIZE / 1024 / 1024
                }MB!`;
        }

        // If the digitalContact is blank nothing will be checked
        if (digitalContact?.length < 1) {
            // No error, field is empty
        }
        // If the entry does not have .com it will fail validation
        else if (!digitalContact.match(/.com/gi)) {
            currentError.digitalContact = `Entry must contain .com`;
        }
        // Else if either http:// or https:// is in the entry it 
        // will fail validation
        else if (digitalContact.match(/https?:\/\//gi)) {
            currentError.digitalContact = `Do not include the http`;
        }

        // If the entry does not have .com it will fail validation
        if (!website.match(/.com/gi)) {
            currentError.website = `Entry must contain .com`;
        }
        // Else if either http:// or https:// is in the entry it 
        // will fail validation
        else if (website.match(/https?:\/\//gi)) {
            currentError.website = `Do not include the http`;
        }

        // Returning the error found object to the caller
        return currentError;
    };

    // The imagePreview method will show a preview image of the element that will be
    // submitted to the database
    const imagePreview = () =>
        (tempFileUrl || (restaurant.length > 0 && imageLocationName)) && (
            <div
                className="d-flex mx-auto"
                style={{
                    maxHeight: "40rem",
                    maxWidth: "40rem",
                    overflow: "hidden",
                }}
            >
                <Image
                    className="p-3"
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                    }}
                    src={tempFileUrl !== "" ? tempFileUrl : imageLocationName}
                    alt="Upload Preview"
                />
            </div>
        );

    // Change handler for the function name specific form input
    const onChangeAddress = (e) => {
        const { value, maxLength } = e.target;
        const address = value.slice(0, maxLength);
        setAddress(address);
    };

    // Change handler for the function name specific form input
    const onChangeCity = (e) => {
        const { value, maxLength } = e.target;
        const city = value.slice(0, maxLength);
        setCity(city);
    };

    // Change handler for the function name specific form input
    const onChangeDigitalContact = (e) => {
        const { value, maxLength } = e.target;
        const digitalContact = value.slice(0, maxLength);
        setDigitalContact(digitalContact);

        // If the form had an error it is reset
        if (formError?.digitalContact) {
            setFormError({
                ...formError,
                digitalContact: null,
            });
        }
    };

    // Change handler for the function file specific form input
    const onChangeFile = (e) => {
        // Assigning the file from the input to file
        const file = e.target.files[0];

        // Setting the file to local state
        setFile(file);

        // If there is a file the tempFileUrl will be set to that
        // file
        if (file) {
            setTempFileUrl(URL.createObjectURL(file));
        }
        // Else the tempFileUrl will be an empty string
        else {
            setTempFileUrl("");
        }

        // If the form had an error it is reset
        if (formError?.file) {
            setFormError({
                ...formError,
                file: null,
            });
        }
    };

    // Change handler for the function name specific form input
    const onChangePhone = (e) => {
        const { value, maxLength } = e.target;
        const phone = formatPhoneNumber(value);
        setPhone(phone);
    };

    // Change handler for the function name specific form input
    const onChangeRestaurantName = (e) => {
        const { value, maxLength } = e.target;
        const restaurantName = value.slice(0, maxLength);
        setRestaurantName(restaurantName);
    };

    // Change handler for the function name specific form input
    const onChangeState = (e) => {
        const state = e.target.value;
        setState(state);
    };

    // Change handler for the function website specific form input
    const onChangeWebsite = (e) => {
        const { value, maxLength } = e.target;
        const website = value.slice(0, maxLength);
        setWebsite(website);

        // If the form had an error it is reset
        if (formError?.website) {
            setFormError({
                ...formError,
                website: null,
            });
        }
    };

    // Change handler for the function name specific form input
    const onChangeZip = (e) => {
        const { value, maxLength } = e.target;
        const zip = formatZipCode(value);
        setZip(zip);
    };

    // The saveAccount method will save an account to the database and
    // update the state. It will call the correct Thunk depending on
    // if the current form is displaying an update or create
    const saveAccount = async (e) => {
        // Preventing the default submit form action
        e.preventDefault();

        if (!isLoading.isLoadingRestaurants) {
            // Checking if the form has any errors
            const currentFormErrorList = formErrorCheck();

            // If the form has errors, the error messages are displayed
            if (Object.keys(currentFormErrorList).length > 0) {
                setFormError(currentFormErrorList);
            }
            // Else the form does not have errors so it 
            // will submit
            else {
                // If the form is in update view
                if (isUpdate) {
                    // If there is a user in state
                    if (users && users.length > 0) {
                        // The user information is destructured from the state
                        const [currentUser] = users;
                        const [currentRestaurant] = restaurant;
                        const userCreatorId = currentUser.id;
                        const userName = currentUser.auth.userName;

                        // The updateData variable will hold the needed data to
                        // update the restaurant in the correct format
                        const updateData = {
                            restaurantName: restaurantName,
                            restaurantDigiContact: digitalContact,
                            restaurantPhone: unformatPhoneNumber(phone),
                            userCreatorId: userCreatorId,
                            restaurantWebsite: website,
                            userName: userName,
                            imageId: imageId,
                            imageLocation: imageLocationName || "",
                            address: address,
                            city: city,
                            state: state || "",
                            zip: zip,
                            file: file,
                        };

                        // The update Thunk is called and if the
                        // update is successful the user is redirected
                        // to the updated restaurant page
                        await updateRestaurantThunk(
                            currentRestaurant.id,
                            updateData
                        ).then((isUpdated) => {
                            // If the entry was updated the user is redirected
                            if (isUpdated) {
                                clearForm();
                                // Navigating the user to the restaurant view for the updated restaurant
                                navigate(
                                    `../restaurant/${currentRestaurant.id}`
                                );
                            }
                            // If no update occurs a log is sent
                            else {
                                console.log("Restaurant was not updated.");
                            }
                        })
                            .catch(err => console.log(err));
                    }
                }
                // Else there is no restaurant and a new one will be created
                else {
                    // If a user is logged in
                    if (users && users.length > 0) {
                        // The users id is destructured from state
                        const userCreatorId = users[0].id;

                        // The form phone number is unformatted to be saved in the database
                        const rawPhone = unformatPhoneNumber(phone);

                        // The restaurant is added to the database and state by
                        // calling the addRestaurantThunk
                        await addRestaurantThunk(
                            userCreatorId,
                            restaurantName,
                            address,
                            city,
                            state,
                            zip,
                            rawPhone,
                            digitalContact,
                            website,
                            file
                        ).then((restaurantData) => {
                            // If data is returned the update is successful and the user
                            // is navigated to the id of the newly stored restaurant
                            if (restaurantData) {
                                clearForm();
                                navigate(
                                    `../restaurant/${restaurantData.restaurantId}`
                                );
                            }
                            // Else the restaurant was not updated and the user remains
                            // on the page to fix errors
                            else {
                                console.log(
                                    "There was an issue creating restaurant"
                                );
                            }
                        })
                            .catch(err => console.log(err));
                    }
                }
            }
        }
    };

    // The show handler will show the close form modal
    const showClearFormHandler = () => setShowClearFormConfirm(true);

    // The EditRestaurant form will be displayed using floating labels
    return (
        <Form onSubmit={saveAccount}>
            <FloatingRestaurantName
                restaurantName={restaurantName}
                onChangeRestaurantName={onChangeRestaurantName}
            />
            <FloatingAddress
                address={address}
                onChangeAddress={onChangeAddress}
            />
            <FloatingCity city={city} onChangeCity={onChangeCity} />
            <FloatingStateZip
                state={state}
                zip={zip}
                onChangeState={onChangeState}
                onChangeZip={onChangeZip}
            />
            <FloatingPhone phone={phone} onChangePhone={onChangePhone} />
            <FloatingDigitalContact
                formError={formError}
                digitalContact={digitalContact}
                onChangeDigitalContact={onChangeDigitalContact}
            />
            <FloatingWebsite
                formError={formError}
                website={website}
                onChangeWebsite={onChangeWebsite}
            />
            <FloatingImageUpload
                formError={formError}
                onChangeFile={onChangeFile}
            />
            {imagePreview()}
            <EditFormButtons
                isUpdate={isUpdate}
                isLoading={isLoading}
                saveAccount={saveAccount}
                clearFormHandler={showClearFormHandler}
            />
            <ModalConfirmation
                show={showClearFormConfirm}
                closeHandler={closeClearFormHandler}
                clearForm={clearForm}
            />
        </Form>
    );
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users],
    isLoading: { ...state.isLoading },
});

// Exporting the connect Wrapped EditRestaurantForm Component
export default connect(mapStateToProps, {
    addRestaurantThunk,
    updateRestaurantThunk,
})(EditRestaurantForm);
