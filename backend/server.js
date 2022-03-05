// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - server.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/20/2022, Added routes for image, rating, review, and reviewImage)
//  (DAB, 2/27/2022, Added message route)

const express = require("express");
const cors = require("cors");
const testData = require('./data/TestData');
const app = express();

// CORS related settings
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database configuration
const db = require("./models");
// db.sequelize.sync();
// Because the database quickly fills up with junk during testing we drop and re-sync on express start
db.sequelize.sync({ force: true })
.then(() => {
  console.log("Database has been dropped and re-synced.");
  console.log(`Server is running on port ${PORT}.`);
})
.then(() => {
  // Loading test data into database
  testData.loadTestData();
});

// Set welcome message for application
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Restaurant Club backend application." });
});

// Set app routes
require("./routes/user.routes")(app);
require("./routes/restaurant.routes")(app);
require("./routes/authentication.routes")(app);
require("./routes/address.routes")(app);
require("./routes/image.routes")(app);
require("./routes/rating.routes")(app);
require("./routes/review.routes")(app);
require("./routes/reviewImage.routes")(app);
require("./routes/message.routes")(app);
require("./routes/friend.routes")(app);

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
