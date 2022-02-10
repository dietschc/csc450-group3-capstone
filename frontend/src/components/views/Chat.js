// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel, Card } from 'react-bootstrap';
import mockStateData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import FormContainer from '../template/XLContainer';

function Chat(props) {
    // The mock state will be held as data
    const [data, setData]=useState(mockStateData);
    const [chatMessage, setChatMessage]=useState("");
    const [messageHistory, setMessageHistory]=useState(data.message);

   

    // navigate will allow navigation between the Views
    const navigate = useNavigate();

    // The moreHandler will load in the Search View with the 
    // needed URL parameters for the desired search
    const sendMessageHandler = (e) => {
        e.preventDefault();
        console.log(chatMessage);
        
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
    const { user, restaurant, review, message } = data; 
    const [currentUser, ...otherUser] = user;
    const { address: currentAddress }  = currentUser;
    const { friend: currentFriendList } = currentUser;
    return (
        <FormContainer>
            <h1>
                Chat
            </h1>
            <Card className="" style={{height:"200rem"}}>
                <Card.Title className="text-center mt-2 mb-0">
                    {user[0].auth.userName} chatting with {user[1].auth.userName}
                </Card.Title>
                <Card.Text className="border m-3 p-2 mh-50" style={{minHeight:"10rem", maxHeight:"15rem",  overflow:"auto"}}>
                    {messageHistory.map((message) => (
                        (message.userMessage.from === user[0].id) ?  (<span style={{color:"darkblue"}}>{user[0].auth.userName + "[" + message.timeStamp + "]" + ": "}<span style={{color:"blue"}}>{message.message}</span><br/><br/></span>) :
                        (<span style={{color:"darkred"}}>{user[1].auth.userName + "[" + message.timeStamp + "]" + ": "}<span style={{color:"red"}}>{message.message + "\n"}</span><br/><br/></span>)
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
                                    <Form.Label hidden>Message</Form.Label>
                                    <Form.Control as="textarea" className="p-2"rows={3} value={chatMessage} onChange={e=>setChatMessage(e.target.value)}/>
                                </Form.Group>
                            <Button type="submit" className="d-flex ms-auto justify-content-center" style={{ width: "5rem"}} onClick={(e)=>sendMessageHandler(e)}>Send</Button>

                            </Col>
                        </Row>

                        
                    </Form>
                </Card.Body>
                
            </Card>
        </FormContainer>
            
    )
}

// Exporting the component
export default Chat;