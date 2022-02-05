// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - UserDashboard.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BodyContainer from '../template/BodyContainer';
import testData from "../../redux/initialState.json";

function UserDashboard(props) {
    // Temporary test data 
    const [data, setData]=useState([]);

    // Temporary test data fetch
    const getData=()=>{
        fetch('initialState.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          });
      }

      // Temp test data function call
      useEffect(() => {
          getData();
      }, []);

        // const { user } = data.state;
        // const currentUser = user[0];
        // const currentAddress = currentUser.address;
        // const userData = (data && data.length > 0) =>  {}
        const newData = data.map((testData) => data); 
        const print = () => console.log(data);
    return (
        
        <BodyContainer>
            <h1>
                User Dashboard
            </h1>
            {print}
            <Card>
                <Card.Body>
                    <Card.Text>
                        <ListGroup>
                            
                            {/* <ListGroup.Item>
                                {"User Id: " + user.id}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {"First Name: " + currentUser.firstName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {"LastName: " + currentUser.lastName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {"Address: " + currentAddress.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {"City: " + currentAddress.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {"State: " + currentAddress.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {"Zip: " + currentAddress.zip}
                            </ListGroup.Item> */}
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Link to="/">Back to Home</Link>
        </BodyContainer>
            
        
    )
}

// Exporting the component
export default UserDashboard;