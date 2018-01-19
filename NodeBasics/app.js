// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');
// const username = "jacobweber";

// Print message to console
function printMessage(username, badgecount, points) {
  const message = `${username} has ${badgecount} total badge(s) and ${points} points in Javascript`
  console.log(message);
}

function getProfile(username) {

  try {
    // Connect to API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      // console.log(response);
      let body = "";
      // Read the data
      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        // Parse the data
        const profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);
        // console.dir(profile);
        // console.log(body);
        // console.log(typeof body);
        // Print the data
      });
    });
    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    console.error(error.message);
  }
}

// const users = ["chalkers", "jacobweber"];
const users = process.argv.slice(2);
users.forEach(getProfile);

// getProfile("jacobweber");
// getProfile("chalkers");
