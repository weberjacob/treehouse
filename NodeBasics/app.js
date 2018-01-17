// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');
const username = "jacob";

// Print message to console
function printMessage(username, badgecount, points) {
  const message = `${username} has ${badgecount} total badge(s) and ${points} points in Javascript`
  console.log(message);
}

// Connect to API URL (https://teamtreehouse.com/username.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
  console.log(response);
  // Read the data
  // Parse the data
  // Print the data

});
