// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel, Card } from 'react-bootstrap';
import mockStateData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import FormContainer from '../template/XLContainer';
import { connect } from 'react-redux';
import { addMessage, deleteAllMessages, deleteMessage } from '../../actions/messages';

function Chat(props) {
    // The mock state will be held as data
    const [data, setData]=useState(mockStateData);
    const [chatMessage, setChatMessage]=useState("");
    const [messageHistory, setMessageHistory]=useState(data.messages);

   const { addMessage, deleteAllMessages, deleteMessage } = props;

    // navigate will allow navigation between the Views
    const navigate = useNavigate();

    // The moreHandler will load in the Search View with the 
    // needed URL parameters for the desired search
    const sendMessageHandler = (e) => {
        e.preventDefault();
        console.log(chatMessage);

        const testState = {
            messageId: 1,
            toUserId: 1,
            fromUserId: 2,
            message: "Test message"
        }
        addMessage(testState.toUserId, testState.fromUserId, testState.message)
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
    

    // Destructuring the needed data from the intitialState.json file
    const { users } = data; 
    const [user, ...otherUsers] = users;
    const { address: currentAddress }  = user;
    const { friend: currentFriendList } = user;
    return (
        <FormContainer>
            <h1>
                Chat
            </h1>
            <Card className="" style={{height:"200rem"}}>
                <Card.Title className="text-center mt-2 mb-0">
                    {users[0].auth.userName} chatting with {users[1].auth.userName}
                </Card.Title>
                <Card.Text className="border m-3 p-2 mh-50" style={{minHeight:"10rem", maxHeight:"15rem",  overflow:"auto"}}>
                    {messageHistory.map((message) => (
                        (message.userMessage.from === users[0].id) ?  (<span style={{color:"darkblue"}}>{users[0].auth.userName + "[" + message.timeStamp + "]" + ": "}<span style={{color:"blue"}}>{message.message}</span><br/><br/></span>) :
                        (<span style={{color:"darkred"}}>{users[1].auth.userName + "[" + message.timeStamp + "]" + ": "}<span style={{color:"red"}}>{message.message + "\n"}</span><br/><br/></span>)
                    ))}
                    <br/>
                    <br/>
                    <br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </Card.Text>
                <Card.Body>
                    <Form className="">
                        <Row>
                            <Col></Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="formMessageInput" >
                                    <Form.Label className="visually-hidden">Message</Form.Label>
                                    <Form.Control as="textarea" 
                                    className="p-2"rows={3} 
                                    value={chatMessage} 
                                    onChange={e=>setChatMessage(e.target.value)}/>
                                </Form.Group>
                            <Button type="submit" 
                            className="d-flex ms-auto justify-content-center" 
                            style={{ width: "5rem"}} 
                            onClick={(e)=>sendMessageHandler(e)}>Send</Button>
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
const mapDispatchToProps = dispatch => 
    ({
        // This method will add a new review
        addMessage(toUserId, fromUserId, message) {
            dispatch(addMessage(toUserId, fromUserId, message)
                )
        },
        deleteAllMessages() {
            dispatch(deleteAllMessages()
            )
        },
        deleteMessage(id) {
            dispatch(deleteMessage(id))
        }
    })


// Exporting the connect Wrapped EditAccount Component
export default connect(mapStateToProps, mapDispatchToProps)(Chat);