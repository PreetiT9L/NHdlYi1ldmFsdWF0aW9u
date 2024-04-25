/*
 * Write a function that will take a date and compare with today date and return text:
 * - Today: same year, same month, same date
 * - Yesterday: date = today - 1
 * - This week: today - 7 < date < today - 1
 * - Last week: today - 14 < date <= today - 7
 * - This month: same year, same month, date <= today - 14
 * - Last month: month = current month - 1
 * - This year: same year
 * - last year: year = current year - 1
 * - Long time ago: everything else
 *
 * Lastly, please write a unit test for calculateRelativeDate function
 * */

const calculateRelativeDate = (inputDate) => {
  console.log(inputDate, "date is here");

  // Get today's date
  var today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

  // Calculate the difference in milliseconds between the input date and today
  var delta = today - inputDate;

  // Convert milliseconds difference to days
  var deltaDays = Math.floor(delta / (1000 * 60 * 60 * 24));

  // If the input date is today
  if (deltaDays === 0) {
    return "Today";
  }

  // If the input date is yesterday
  else if (deltaDays === 1) {
    return "Yesterday";
  }

  // If the input date is within the current week
  else if (1 < deltaDays && deltaDays <= 7) {
    return "This week";
  }

  // If the input date is within the last week
  else if (7 < deltaDays && deltaDays <= 14) {
    return "Last week";
  }

  // If the input date is within the current month
  else if (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() <= today.getDate() - 14
  ) {
    return "This month";
  }

  // If the input date is in the last month
  else if (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() - 1
  ) {
    return "Last month";
  }

  // If the input date is in the current year
  else if (inputDate.getFullYear() === today.getFullYear()) {
    return "This year";
  }

  // If the input date is in the last year
  else if (inputDate.getFullYear() === today.getFullYear() - 1) {
    return "Last year";
  }

  // If the input date is a long time ago
  else {
    return "Long time ago";
  }

};

const View = {
  init: () => {
    document
      .getElementById("relative-date-btn")
      .addEventListener("click", () => {
        const msgElement = document.getElementById("relative-date-msg");
        const inputDateElem = document.getElementById("relative-date-input");

        // Get the value of the input element
        const inputDateString = inputDateElem.value;

        // Split the inputDateString to get year, month, and day
        const [year, month, day] = inputDateString.split("-");

        // Construct a new Date object
        const inputDate = new Date(year, month - 1, day); // month - 1 because months are 0-indexed in JavaScript Date objects

        // Check if inputDate is a valid Date object
        if (isNaN(inputDate.getTime())) {
          // If inputDate is not a valid Date object, display an error message
          msgElement.textContent = "Invalid date";
        } else {
          // If inputDate is a valid Date object, calculate and display the relative date
          msgElement.textContent = calculateRelativeDate(inputDate);
        }
      });
  },
};

document.addEventListener("DOMContentLoaded", View.init);
