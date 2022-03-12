// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - upload.js
// March 9, 2022
// Last Edited (Initials, Date, Edits):

const util = require("util");
const aws = require('aws-sdk');

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

const deleteFile = async (location) => {
    // Split the file key from our full URL path
    const data = location.split('https://restaurantclub.nyc3.digitaloceanspaces.com/')
    const key = data[1];

    const params = {
        Bucket: 'restaurantclub',
        Key: key
    };

    // S3 does not return if a file was deleted so we have to check it exists first
    try {
        await s3.headObject(params).promise()
        console.log("File Found in S3")
        try {
            await s3.deleteObject(params).promise()
            console.log("file deleted Successfully")
            return "1"
        }
        catch (err) {
             console.log("ERROR in file Deleting : " + JSON.stringify(err))
             return -2;
        }
    } catch (err) {
            console.log("File not Found ERROR : " + err.code)
            return -1;
    }
};

module.exports = deleteFile;