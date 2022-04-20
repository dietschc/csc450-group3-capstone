// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FriendList.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/27/2022, Took out admins ability to view private chat)
//  (DAB, 4/10/2022, Style changes to allow for greater responsiveness)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Card, ListGroup, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import ModalDeleteFriend from '../modal/DeleteFriendConfirm';

/**
 * A React Bootstrap formatted component that will render a friend list 
 * that will allow the user to either chat with the friend or delete 
 * them.
 * 
 * @param { friend, chatHandler, deleteFriendHandler, showFriendConfirm, 
 * deleteFriendHandler, showFriendConfirm, deleteFriend, closeFriendHandler, 
 * friends 
 * } props 
 * @returns 
 */
function FriendList(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const {
        friend, chatHandler,
        deleteFriendHandler, showFriendConfirm,
        deleteFriend, closeFriendHandler,
        friends, userId
    } = props;

    return (
        <Card style={{ height: "450px" }}>
            <Card.Title className="text-center mt-2">
                Friends
            </Card.Title>
            <Card.Body className="p-2 m-0" style={{ overflow: "auto" }}>
                <ListGroup className="">
                    {friends.map((friend, index) => (
                        <ListGroup.Item className="mb-1 p-2 border-1" key={index} id={friend.userId}>
                            <Row className="d-flex flex-row align-content-center">
                                <div className="d-flex flex-column flex-sm-row m-0 p-0">
                                    <div
                                        className="
                                        d-flex 
                                        flex-fill 
                                        justify-content-center 
                                        justify-content-sm-start 
                                        align-self-center 
                                        m-0 
                                        px-2"
                                        style={{wordBreak: "break-all"}}
                                    >
                                        {friend.userName}
                                    </div>
                                    <div
                                        className="
                                        d-flex 
                                        flex-column 
                                        justify-content-end 
                                        flex-sm-row 
                                        m-0 
                                        p-0 
                                        px-1"
                                    >
                                        {!userId &&
                                            <Button
                                                className="m-1 align-self-sm-center"
                                                style={{ minWidth: "4.3rem", height: "38px" }}
                                                onClick={() => chatHandler(friend)}>
                                                Chat
                                            </Button>
                                        }
                                        <Button
                                            className="m-1 align-self-sm-center"
                                            style={{ minWidth: "4.3rem", height: "38px" }}
                                            onClick={() => deleteFriendHandler(friend)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>

                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <ModalDeleteFriend
                    show={showFriendConfirm}
                    deleteFriend={deleteFriend}
                    closeHandler={closeFriendHandler}
                    friend={friend} />
            </Card.Body>
        </Card>
    )
}

// Exporting the component
export default FriendList;
