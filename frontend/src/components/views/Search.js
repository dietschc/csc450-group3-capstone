// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 02/7/22, Search View Layout - Implemented layout, style and search cards)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Container } from 'react-bootstrap';
import XLContainer from '../template/XLContainer';
import SearchCard from '../subComponent/SearchCard';


function Search(props) {

    const restaurantId = "0"
    const restaurantName = "Olive Garden"
    const averageRating = 3.3
    const address = "1525 County Rd C West"
    const phone = "651-636-6456"

    return (
        <XLContainer>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>Search Results</h1>
                </div>
            </Container>
            <Container fluid as="main" className="pb-5">
                <SearchCard
                    restaurantId={restaurantId}
                    restaurantName={restaurantName}
                    averageRating={averageRating}
                    address={address}
                    phone={phone}
                />

                <SearchCard
                    restaurantId={"1"}
                    restaurantName={"Texas Roadhouse"}
                    averageRating={"3"}
                    address={"123 Another Street"}
                    phone={"612-698-1982"}
                />

                <SearchCard
                    restaurantId={"2"}
                    restaurantName={"Willy McCoys"}
                    averageRating={"5"}
                    address={"567 Debug Data Ave"}
                    phone={"123-456-7890"}
                />
            </Container>
        </XLContainer>
    )
}

// Exporting the component
export default Search;