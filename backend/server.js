// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - server.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

const express = require("express");
const cors = require("cors");
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
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Restaurant Club backend application." });
});

// Set app routes
require("./routes/user.routes")(app);
require("./routes/restaurant.routes")(app);
require("./routes/authentication.routes")(app);
require("./routes/address.routes")(app);

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
