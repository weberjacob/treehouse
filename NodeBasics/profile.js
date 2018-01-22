// Require http and https modules
const https = require('https');
const http = require('http');

// Print Error Message
function printError(error) {
  console.error(error.message);
}

// Print message to console
function printMessage(username, badgecount, points) {
  const message = `${username} has ${badgecount} total badge(s) and ${points} points in Javascript`
  console.log(message);
}

function get(username) {

  try {
    // Connect to API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        // console.log(response);
        let body = "";
        // Read the data
        response.on('data', data => {
          body += data.toString();
        });

        response.on('end', () => {
          // Parse the data
          try {
            const profile = JSON.parse(body);
            // Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
          // console.dir(profile);
          // console.log(body);
          // console.log(typeof body);
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
