// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - deleteUserDirectory.js
// March 11, 2022
// Last Edited (Initials, Date, Edits):

const aws = require('aws-sdk');

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

const deleteUserDirectory = async (directory) => {
    // Split the file key from our full URL path
    // const data = location.split('https://restaurantclub.nyc3.digitaloceanspaces.com/')
    // const key = data[1];

    const params = {
        Bucket: 'restaurantclub',
        Prefix: 'users/' + directory
    };

    // S3 does not delete empty directories so we have to go in and delete everything first
    try {
        const listedFiles = await s3.listObjectsV2(params).promise();
        console.log("listedFiles: ", listedFiles)

        // Directory is already empty, do nothing
        if (listedFiles.Contents.length === 0) {
            console.log("directory is empty")
            return -3;
        }

        // If the file was found we will try to delete it
        try {
            // Parameters object to store our files so we can delete them
            const deleteParams = {
                Bucket: 'restaurantclub',
                Delete: { Objects: [] }
            };

            listedFiles.Contents.forEach(({ Key }) => {
                deleteParams.Delete.Objects.push({ Key });
            });

            await s3.deleteObjects(deleteParams).promise();

            console.log("files: ", deleteParams);

            console.log("directory deleted Successfully")
            return 1;
        }
        // Something went wrong trying to delete the directory
        catch (err) {
            console.log("directory in file Deleting : " + JSON.stringify(err))
            return -2;
        }
        // Else the directory was not found
    } catch (err) {
        console.log("directory not Found ERROR : " + err.code)
        return -1;
    }
};

module.exports = deleteUserDirectory;