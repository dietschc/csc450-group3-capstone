// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - image.service.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 3/8/22, Created upload service route, removed unnecessary functions)
// (CPD, 3/12/22, Created delete service route)

import http from "../http-common";

class ImageDataService {

  /**
   * Creates a new image by calling the upload image method on the images controller.
   * 
   * The image URL will look something like this: https://...com/type/id/file
   * 
   * @param {*} file - the file stored in an object passed as a param
   * @param {*} id - the user or restaurant id to be be the 2nd subdirectory
   * @param {*} type - first subdirectory, should be either users or restaurants
   * @returns 
   */
  upload(file, id, type) {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", type);
    formData.append("file", file);

    return http.post("/images/", formData, {
      // Set multipart headers
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  /**
   * Deletes a specific image at cloud location
   * 
   * @param {*} location 
   * @returns 
   */
  delete(location) {
    return http.delete(`/images/`, { data: { location } });
  }

  /**
   * CAUTION
   * This function deletes a user directory and all files within
   * 
   * @param {*} id 
   * @returns 
   */
  deleteUserDirectory(id) {
    return http.delete(`/images/${id}`);
  }

  /**
   * CAUTION
   * This function deletes a restaurant directory and all files within
   * 
   * @param {*} directory
   * @returns 
   */
   deleteRestaurantDirectory(directory) {
    return http.delete(`/images/restaurant/${directory}`);
  }
}



// Exporting the data service
export default new ImageDataService();
