// Require http and https modules
const https = require('https');
const http = require('http');
const api = require('./api.json');

// Print Error Message
function printError(error) {
  console.error(error.message);
}

// Print weather to console
function printWeather(weather) {
  const message = `The temperature in ${weather.location.city} is currently ${weather.current_observation.temp_f}F`
  console.log(message);
}

function get(query) {

  // format a readable string and remove the underscores
  const readablequery = query.replace('_', ' ');
  try {
    // Connect to Weather Underground API (https://api.wunderground.com/api/APIKEY/conditions/q/MN/Minneapolis.json)
    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
      if (response.statusCode === 200) {
        // console.log(response);
        let body = "";
        // Read the data
        response.on('data', chunk => {
          body += chunk;
        });

        response.on('end', () => {
          // Parse the data
          const weather = JSON.parse(body);
          // Print the data
          printWeather(weather);
        });
      } else {
        const message = `There was an error getting the weather for ${readablequery} (${http.STATUS_CODES[response.statusCode]})`;
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
