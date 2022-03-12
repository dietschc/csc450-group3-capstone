// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - image.service.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 3/8/22, Created upload service route, removed unnecessary functions)
// (CPD, 3/12/22, Created delete service route)

import http from "../http-common";

class ImageDataService {

  // Creates a new image by calling the upload image method on the images controller
  upload(file, userId) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId)

    return http.post("/images/", formData, {
      // Set multipart headers
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  // Deletes a specific image at cloud location
  delete(location) {
    return http.delete(`/images/1`, { data: { location } });
  }
}

// Exporting the data service
export default new ImageDataService();
