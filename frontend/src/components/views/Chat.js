// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)
//  (DAB, 03/14/2022, Chat box now scrolls to the bottom after each message)
//  (DAB, 03/14/2022, Chat now works with interval chat on 15 sec delay)
//  (DAB, 03/14/2022, Added comments)
//  (DAB, 03/15/2022, Fixed logic for interval database retrieval)F

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import FormContainer from '../template/XLContainer';
import { connect } from 'react-redux';
import { formatTimeCalendar } from '../../helperFunction/FormatString';
import {
    findByConversationIdOffsetLimitThunk,
    findAllAfterDateOffsetLimitThunk,
    deleteAllMessages,
    sendMessageThunk
} from '../../actions/messages';

/**
 * The Chat View will allow friends to talk to one another via text 
 * based chat.
 * 
 * @param {*} props 
 * @returns 
 */
function Chat(props) {
    const {
        messages,
        users,
        deleteAllMessages,
        findByConversationIdOffsetLimitThunk,
        findAllAfterDateOffsetLimitThunk,
        sendMessageThunk
    } = props;

    // The chatMessage will hold the state of the message text area
    const [chatMessage, setChatMessage] = useState("");
    const updateMessageIdRef = useRef(0);
    // This Ref will allow for the program to know if a query has returned data
    const isQueriedRef = useRef(false);
    // This const references the end of the message body
    const messageScrollTo = useRef();
    // The messageRef will be used in useEffects to query the database with the most recent data
    const messagesRef = useRef(messages);
    // Extract friend ID from parameters
    const { id: friendId } = useParams();
    // Extract current user from users state array
    const [user] = users;
    // Create a copy of the friends array
    const friends = user?.friends;
    // Get friend specified in parameter
    const [paramFriend] = friends ? friends.filter((friend) => (friend.id) === Number(friendId)) : [];
    // Convenience variables to reference current state
    const userName = user?.auth?.userName;
    const friendName = paramFriend?.userName;


    // The loadState method will load the initial Chat state from the database
    const loadState = async () => {
        // All old messages are deleted
        deleteAllMessages();

        // New messages are queried from the database
        await findByConversationIdOffsetLimitThunk(user.id, friendId, 0, 15);

        // If there are messages found, the most recent messageId is filtered from messages
        if (messages && messages.length > 0) {
            updateMessageIdRef.current = messagesRef.current.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        }
    }


    // The database is queried for new messages that may exist in the database, 
    // the state is only updated if data is found
    const loadNewMessages = async () => {
        await findAllAfterDateOffsetLimitThunk(updateMessageIdRef.current, user.id, friendId, 0, 15)
            .then(res => {
                // If results were returned from the database query, isQueried is set to true to update the 
                // newest messageId
                if (res) {
                    isQueriedRef.current = true;
                }
            })
    }


    // The use effect will rerender only once initially and will only load state 
    // if a user is logged in. It will also start an interval to search the database for new 
    // messages to this user
    useEffect(() => {
        // If a user is logged in the messages will be loaded and an interval set to retrieve new 
        // messages
        if (user?.id) {
            // Loading in the initial message state
            loadState();

            // Setting an interval to query the database and retrieve new messages
            const interval = setInterval(async () => {
                // Calling loadNewMessages to check and possibly load in new messages
                await loadNewMessages();
            }, 8000);

            // The interval is cleared when the component is unmounted
            return () => clearInterval(interval);
        }

    }, []);


    // The use effect will rerender only when messages state has changed. It 
    // will scroll to the end of the message box and update the needed variables
    // that affect messages
    useEffect(() => {
        // Scrolling to the last message
        messageEndScroll()

        // If new messages were found in the database and added, the oldest messageId will be updated
        if (isQueriedRef.current) {
            // Storing the messageId in to be used in the database query
            updateMessageIdRef.current = messages.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);

            // The messageId is updated so isQueried is set to false
            isQueriedRef.current = false;
        }

        // Updating the current reference to the messages array to be used in useEffect
        messagesRef.current = messages;
    }, [messages]);


    // This function will set chatMessage state with the new message
    const onChangeMessage = (e) => {
        const chatMessage = e.target.value
        setChatMessage(chatMessage);
    }


    // The sendMessageHandler will sent the message to be added to both the database 
    // and state
    const sendMessageHandler = (e) => {
        // Preventing default form action
        e.preventDefault();

        // Easy to understand variables to be used in adding the message to memory
        const userToId = friendId;
        const userFromId = user?.id;
        const message = chatMessage;

        // If there is no text in the chatMessage it will not be added to the database or state
        if (message) {
            // Call thunk and pass message parameters
            user?.id && sendMessageThunk(userToId, userFromId, message);
        }

        // Clear form after you send each message
        clearForm();
    }


    // Clears the chatMessage text input after each new chat message
    const clearForm = () => {
        setChatMessage("");
    }


    // This function will scroll the message window to the bottom to read the newest message
    const messageEndScroll = () => {
        // If the page is not rendered nothing is done
        if (!messageScrollTo.current) return;

        // If the page is rendered the message box will be scrolled to the bottom
        messageScrollTo.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }


    // The formatMessages method will format all the new messages to display based off to or from users. 
    // The result will be an easy to read text display
    const formatMessages = () => (
        <>
            {messages.map((message, index) => (
                (message.userMessage.from === user.id)
                    ? (
                        <span key={index} style={{ color: "darkblue" }}>
                            {`${userName}[${formatTimeCalendar(message.timeStamp)}]: `}
                            <span style={{ color: "blue" }}>
                                {message.message}
                            </span><br /><br /></span>
                    ) : (
                        <span key={index} style={{ color: "darkred" }}>
                            {`${friendName}[${formatTimeCalendar(message.timeStamp)}]: `}
                            <span style={{ color: "red" }}>
                                {message.message + "\n"}
                            </span><br /><br /></span>
                    )
            ))}
        </>
    )


    // Returning the Chat View
    return (
        <FormContainer>
            <h1>
                Chat
            </h1>
            <Card className="" style={{}}>
                <Card.Title className="text-center mt-2 mb-0">
                    {userName} chatting with {friendName}
                </Card.Title>
                <Card.Text className="border m-3 p-2 " style={{ minHeight: "10rem", maxHeight: "15rem", overflow: "auto" }}>
                    {formatMessages()}
                    <span className="p-0 m-0" ref={messageScrollTo} />
                </Card.Text>
                <Card.Body>
                    <Form onSubmit={sendMessageHandler} className="">
                        <Row>
                            <Col></Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="formMessageInput" >
                                    <Form.Label className="visually-hidden">Message</Form.Label>
                                    <Form.Control as="textarea"
                                        className="p-2" rows={3}
                                        value={chatMessage}
                                        onChange={onChangeMessage} />
                                </Form.Group>
                                <Button type="submit"
                                    className="d-flex ms-auto justify-content-center"
                                    style={{ width: "5rem" }}>Send</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    reviews: [...state.reviews],
    users: [...state.users],
    messages: [...state.messages]
});


// Exporting the connect Wrapped Chat Component
export default connect(mapStateToProps, {
    findByConversationIdOffsetLimitThunk,
    findAllAfterDateOffsetLimitThunk,
    deleteAllMessages,
    sendMessageThunk
})(Chat);