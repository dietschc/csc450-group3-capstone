// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - StringGenerator.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):

/**
 * Allows for the generation of 5 stars. The parameter 
 * starCount will specify the number of solid stars. The 
 * rest will be empty. Only the a string with the printed 
 * stars will be returned.
 * 
 * @param {*} starCount 
 * @returns 
 */
export const printStarTotal = (starCount) => {
    let totalStarCount = 0;
    let stars = "";

    if (starCount === -1) {
    }
    else {
        for (let i = 0; i < starCount; i++) {
            stars += '★';
            totalStarCount += 1;
        }

        for (let i = totalStarCount; i < 5; i++) {
            stars += '☆';
        }
    }
    

    return stars;
}

/**
 * Returns the a string with the total number of reviews followed 
 * by "Review" or "Reviews" depending on the number of reviews.
 * 
 * @param {*} reviewCount 
 * @returns 
 */
export const printReviewTotal = (reviewCount) => {
    if (reviewCount === -1) {
        return "";
    }
    else {
        if (reviewCount <= 1) {
            return reviewCount + " Review"
        }
        else {
            return reviewCount + " Reviews"
        }
    }
    
}