// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FormatString.js
// February 11, 2022
// Last Edited (Initials, Date, Edits):

export const phoneNumberFormat = (phoneNumber) => {
    if (!phoneNumber) return phoneNumber;

    if (phoneNumber.length < 10) return phoneNumber;

    return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`;
}