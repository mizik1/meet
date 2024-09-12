"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://mizik1.github.io/meet/"];
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirect_uris[0]);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */

    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  // Parse the access_token from the request body
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  // Set OAuth2 credentials using the access_token
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    // Call Google Calendar API to fetch upcoming events
    calendar.events.list(
      {
        calendarId: CALENDAR_ID, // Calendar ID from environment variables
        auth: oAuth2Client, // Auth using OAuth2 client
        timeMin: new Date().toISOString(), // Fetch events starting from now
        singleEvents: true, // Expand recurring events into separate ones
        orderBy: "startTime", // Order events by start time
      },
      (error, response) => {
        if (error) {
          return reject({
            statusCode: 500,
            body: JSON.stringify({
              message: "Error fetching calendar events",
              error: error.message,
            }),
          });
        }

        const events = response.data.items;
        if (!events || events.length === 0) {
          return resolve({
            statusCode: 404,
            body: JSON.stringify({ message: "No upcoming events found." }),
          });
        }

        return resolve({
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(events),
        });
      }
    );
  }).catch((error) => {
    // Handle promise rejection errors
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving calendar events",
        error: error.message,
      }),
    };
  });
};
