// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - upload.js
// March 9, 2022
// Last Edited (Initials, Date, Edits):

const util = require("util");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

// Max upload file size 2MB
const maxSize = 2 * 1024 * 1024;

// Digital Ocean spaces cloud storage using s3 api
let storage = multerS3({
    s3: s3,
    bucket: 'restaurantclub',
    acl: 'public-read',
    key: function (req, file, cb) {
        console.log(file);
        console.log("req: ", req.body);

        // Alter filename to be unique but preserve extension
        const fileName = file.originalname.toLowerCase().split(' ').join('-');

        // Create path based on type{users, restaurants, etc.} and id
        const path = `${req.body.type}/${req.body.id}/`; 

        cb(null, path + uuidv4() + '-' + fileName)
    }
})

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
