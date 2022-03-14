// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../template/XLContainer';
import { connect } from 'react-redux';
import { addMessage, deleteAllMessages, deleteMessage } from '../../actions/messages';

function Chat(props) {
    // The mock state will be held as data
    // const [data, setData] = useState(mockStateData);
    const [chatMessage, setChatMessage] = useState("");
    // const [messageHistory, setMessageHistory]=useState(data.messages);

    const {
        messages: messageHistory,
        users,
        addMessage,
        deleteAllMessages,
        deleteMessage
    } = props;

    // Extract friend ID from parameters
    const { id: friendId } = useParams();

    // Extract current user from users state array
    const [user = []] = users;

    // Create a copy of the friends array
    const friends = user.friends;

    // Get friend specified in parameter
    const [paramFriend = []] = friends.filter((friend) => (friend.id) === Number(friendId));
    
    // Convenience variables
    const userName = user.auth.userName;
    const friendName = paramFriend.userName;

    // navigate will allow navigation between the Views
    const navigate = useNavigate();

    // The moreHandler will load in the Search View with the 
    // needed URL parameters for the desired search
    const sendMessageHandler = (e) => {
        e.preventDefault();
        console.log(chatMessage);

        const testState = {
            messageId: 0,
            toUserId: 1,
            fromUserId: 2,
            message: "Test message"
        }
        
        // addMessage(testState.toUserId, testState.fromUserId, testState.message)
        // deleteMessage(testState.messageId)
        // deleteAllMessages()
        // setMessageHistory( 
        //     ...messageHistory,
        //     {
        //         messageId: 10,
        //         userMessage: {
        //             userMessageId: 4,
        //             to: 1,
        //             from: 0
        //         },
        //         message: {chatMessage},
        //         timeStamp: Date.toLocaleString()
        //     }
        // );
        // setChatMessage("");
        console.log(messageHistory)
    }

    return (
        <FormContainer>
            <h1>
                Chat
            </h1>
            <Card className="" style={{ height: "200rem" }}>
                <Card.Title className="text-center mt-2 mb-0">
                    {userName} chatting with {friendName}
                </Card.Title>
                <Card.Text className="border m-3 p-2 mh-50" style={{ minHeight: "10rem", maxHeight: "15rem", overflow: "auto" }}>
                    {messageHistory.map((message) => (
                        (message.userMessage.from === user.id) ? (<span style={{ color: "darkblue" }}>{userName + "[" + message.timeStamp + "]: "}<span style={{ color: "blue" }}>{message.message}</span><br /><br /></span>) :
                            (<span style={{ color: "darkred" }}>{friendName + "[" + message.timeStamp + "]: "}<span style={{ color: "red" }}>{message.message + "\n"}</span><br /><br /></span>)
                    ))}
                    <br />
                    <br />
                    <br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Card.Text>
                <Card.Body>
                    <Form className="">
                        <Row>
                            <Col></Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="formMessageInput" >
                                    <Form.Label className="visually-hidden">Message</Form.Label>
                                    <Form.Control as="textarea"
                                        className="p-2" rows={3}
                                        value={chatMessage}
                                        onChange={e => setChatMessage(e.target.value)} />
                                </Form.Group>
                                <Button type="submit"
                                    className="d-flex ms-auto justify-content-center"
                                    style={{ width: "5rem" }}
                                    onClick={(e) => sendMessageHandler(e)}>Send</Button>
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

// Mapping the state actions to props
// const mapDispatchToProps = dispatch => 
//     ({
//         // This method will add a new review
//         addMessage(toUserId, fromUserId, message) {
//             dispatch(addMessage(toUserId, fromUserId, message)
//                 )
//         },
//         deleteAllMessages() {
//             dispatch(deleteAllMessages()
//             )
//         },
//         deleteMessage(id) {
//             dispatch(deleteMessage(id))
//         }
//     })


// Exporting the connect Wrapped EditAccount Component
export default connect(mapStateToProps, {})(Chat);