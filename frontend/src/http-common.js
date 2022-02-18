// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - http-common.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});
