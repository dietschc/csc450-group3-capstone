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

/**
 *  S3 does not delete empty directories so we have to go in and delete everything first
 * 
 * @param {*} directory 
 * @returns 
 */
const deleteUserDirectory = async (directory) => {

    const params = {
        Bucket: 'restaurantclub',
        Prefix: 'users/' + directory
    };

    try {
        // Here we get and store a list of files currently in the users/:id directory
        const listedFiles = await s3.listObjectsV2(params).promise();
        
        // console.log("listedFiles: ", listedFiles)

        // Directory is already empty, do nothing
        if (listedFiles.Contents.length === 0) {
            console.log("directory is empty")
            return -3;
        }

        // If the directory was found, we must delete everything inside first to remove it
        try {
            const deleteParams = {
                Bucket: 'restaurantclub',
                Delete: { Objects: [] }
            };

            // Add each of the directory files to the delete array
            listedFiles.Contents.forEach(({ Key }) => {
                deleteParams.Delete.Objects.push({ Key });
            });

            await s3.deleteObjects(deleteParams).promise();

            // console.log("files: ", deleteParams);

            console.log("directory deleted Successfully")
            return 1;
        }
        // Something went wrong trying to delete the directory
        catch (err) {
            console.log("Error deleting directory : " + JSON.stringify(err));
            return -2;
        }
        // Otherwise the directory was not found
    } catch (err) {
        console.log("directory not Found ERROR : " + err.code);
        return -1;
    }
};

module.exports = deleteUserDirectory;