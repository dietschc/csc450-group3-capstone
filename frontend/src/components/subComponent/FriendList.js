// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FriendList.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/27/2022, Took out admins ability to view private chat)

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
        <Card style={{ height: "480px" }}>
            <Card.Title className="text-center">
                Friends
            </Card.Title>
            <Card.Body style={{ overflow: "auto" }}>
                <ListGroup className="mb-3">
                    {friends.map((friend, index) => (  
                        <ListGroup.Item key={index} id={friend.userId}>
                            <Row>
                                <Col className="d-flex align-items-center my-1 me-0 pe-0 flex-shrink-1">
                                    {friend.userName}
                                </Col>
                                <Col className="d-flex justify-content-end my-1 px-0 flex-shrink-1">
                                    {!userId && <Button onClick={() => chatHandler(friend)}>Chat</Button>}
                                </Col>
                                <Col className="d-flex justify-content-center my-1 px-0 flex-shrink-1">
                                    <Button onClick={() => deleteFriendHandler(friend)}>
                                        Delete
                                    </Button>

                                </Col>
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