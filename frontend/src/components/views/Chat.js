// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Container, Button, FloatingLabel, Card } from 'react-bootstrap';
import FormContainer from '../template/XLContainer';

function Chat(props) {
    return (
        <FormContainer>
            <h1>
                Welcome to the Chat Page!
            </h1>
            <Card className="w-100 h-100">
                <Card.Title className="text-center">
                    Chatting with Thomas
                </Card.Title>
                <Card.Text className="border h-50">
                    Alternating text from messages
                </Card.Text>
                <Card.Body className="justify-content-end w-auto ms-sm-auto">
                    <Form className="">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button className="d-flex ms-auto justify-content-center" style={{ width: "5rem"}}>Send</Button>
                    </Form>
                </Card.Body>
                
            </Card>
        </FormContainer>
            
    )
}

// Exporting the component
export default Chat;