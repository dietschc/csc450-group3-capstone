// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserEditItem.js
// February 10, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/06/2022, Added functionality for the component buttons)
//  (DAB, 4/03/2022, Added in responsive ban/unBan user functionality)
//  (DAB, 4/10/2022, Buttons now are uniform size and responsive)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { ListGroup, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * The UserEditItem Component allows the manipulation of user data 
 * by the admin. The admin can be redirected to the user dashboard, 
 * change the user privileges to banned/unBanned, or delete the 
 * user completely.
 * 
 * @param { user } props 
 * @returns 
 */
function UserEditItem(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const {
        user
    } = props;
    const {
        dashboardHandler,
        banHandler,
        unBanHandler,
        userDeleteHandler
    } = props;

    // Assigning the userId and userPermission to variables for easy 
    // reference
    const userId = user.id;
    const userPermission = user?.auth?.permission?.permissionName;


    // Checking if the user is an admin
    const isAdmin = () => {
        return userPermission === 'admin';
    }


    // Checking if the user if banned
    const isBanned = () => {
        return userPermission === 'banned';
    }


    // The banButtonDisplay render function will allow and 
    // display either the Ban or UnBan button along with all 
    // functionality
    const banButtonDisplay = () => (
        !isBanned() ? (
            <Button className="m-1"
                style={{ minWidth: "7rem" }}
                onClick={() => banHandler(userId)}>
                Ban
            </Button>
        ) : (
            <Button className="m-1"
                style={{ minWidth: "7rem" }}
                onClick={() => unBanHandler(userId)}>
                UnBan
            </Button>
        )
    )

    return (
        <ListGroup as="ul" className="justify-content-center px-0 mb-2">
            <ListGroup.Item
                as="li"
                className="border-3"
                style={{ minHeight: "3rem" }}
                action>
                <Row
                    className="d-flex justify-content-between align-items-center">
                    <Col
                        sm={4}
                        md={6}
                        className="
                        d-flex 
                        justify-content-center 
                        justify-content-sm-start 
                        align-content-center 
                        px-0 
                        mx-0"
                        style={{wordBreak: "break-all"}}>
                        <div className="pb-1">
                            {user.auth.userName}
                        </div>
                    </Col>
                    <Col
                        sm={8}
                        md={6}
                        className="
                        d-flex 
                        flex-column 
                        flex-sm-row 
                        justify-content-between px-0">
                        <Button
                            className="m-1"
                            style={{ minWidth: "7rem" }}
                            onClick={() => dashboardHandler(userId)}>
                            Dashboard
                        </Button>
                        {!isAdmin() && banButtonDisplay()}
                        <Button className="m-1"
                            style={{ minWidth: "7rem" }}
                            onClick={() => userDeleteHandler(userId)}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>

        </ListGroup>
    )
}

// Exporting the component
export default UserEditItem;