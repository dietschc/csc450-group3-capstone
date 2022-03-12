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

const deleteFile = (location) => {
    // Split the file key from our full URL path
    const data = location.split('https://restaurantclub.nyc3.digitaloceanspaces.com/')
    const key = data[1];

    const params = {
        Bucket: 'restaurantclub',
        Delete: {
            Objects: [{ Key: key }],
            Quiet: false,
        }
    };

    console.log("deletefile: ", params);

    s3.deleteObjects(params, (err, data) => {
        if (err) {
            console.error("error: ", err);
        } else {
            console.log("data: ",data);
        }
    });

};

let deleteFileMiddleware = util.promisify(deleteFile);

module.exports = deleteFileMiddleware;
