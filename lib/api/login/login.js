// Packages
const axios = require("axios");
const cookie = require("cookie");
const queryString = require("query-string");
const { getReasonPhrase, getStatusCode, ReasonPhrases, StatusCodes } = require("http-status-codes");

// Clients
// Middleware
// Constants

// Utils / Methods
const logger = require("../../../src/utils/Logger.js");

// NOTE :: This `login` helper will get triggered if a user clicks on the login button or if they try to do a search first

const generateRandomString = function (length) {
   let text = "";
   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   }

   return text;
};

const handler = async (event) => {
   // Adding this context param to differentiate the call & response steps from the Spotify auth flow
   const { isCallback } = event.queryStringParameters;
   const { API_CLIENT_ID, AUTH_BASE_URL, NETLIFY_DEV } = process.env;
   const PORT = NETLIFY_DEV ? 8888 : 3000;
   const BROWSER_STORAGE_ERROR_MESSAGE = "Browser storage not available.";
   const STATE = generateRandomString(32); // does this actually need to be 16 length?
   const isProd = process.env.NODE_ENV === "production";
   const PROD_URL = "https://spotifyplaylistmaker.app/callback";
   const LOCAL_URL = `http://localhost:${PORT}/callback`;
   const REDIRECT_URI = isProd ? PROD_URL : LOCAL_URL;

   const SCOPES = [
      "playlist-modify-public",
      "playlist-modify-private",
      "playlist-read-private",
      "user-read-email",
      "user-read-email",
   ].join(" ");

   const formattedQueryString = queryString.stringify(
      {
         response_type: "code",
         redirect_uri: REDIRECT_URI,
         client_id: API_CLIENT_ID,
         state: STATE,
         scope: SCOPES,
      },
      { sort: false }
   );

   const STATE_KEY = 'spotify_auth_state';
   const STATE_KEY_COOKIE = cookie.serialize(STATE_KEY, STATE, {
      httpOnly: true,
      path: "/",
      secure: false,
   });

   return {
      body: JSON.stringify({
         message: "Attempting to redirect to Spotify authorization...",
         redirectURL: `${AUTH_BASE_URL}?${formattedQueryString}`,
         // state: STATE,
      }),
      headers: {
         "Cache-Control": "no-cache",
         // "Content-Type": "text/html", // use this when I add in the redirect piece
         "Set-Cookie": STATE_KEY_COOKIE,
      },
      statusCode: StatusCodes.OK,
   };

   try {
      // const userAccessToken = await axios.get();
      // if (userAccessToken) {
      //    // 1. If a valid user token exists, "log" them in and "redirect" back to the app
      //    // I'm quoting things because what does this mean if I use session storage and they come back after closing the tab?
      //    // 2. Grab the necessary user info (e.g. display_name, profile_pic, playlists?)
      //    // 3. Return this object back to the front for it to be rendered
      //    return {};
      // } else {}
   } catch (error) {
      // send back a proper error message
   }

   // const accessTokenInUrl = window.location.href.match(/access_token=([^&]*)/);
   // const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);

   // if (accessTokenInUrl && expiresInUrl) {
   //    userAccessToken = accessTokenInUrl[1];
   //    // This makes sure that the "expiresIn" from the URL is converted into a number
   //    const expirationTime = Number(expiresInUrl[1]);

   //    // This makes the access token expire after the amount of declared time in the "expiresIn" variable
   //    window.setTimeout(() => (userAccessToken = ""), expirationTime * 1000);
   //    // This clears the URL parameters once the access token has expired
   //    window.history.pushState("Access Token", null, "/");

   //    return userAccessToken;
   // } else {
   //    window.location = `${AUTH_BASE_URL}?client_id=${API_CLIENT_ID}&response_type=token&scope=${scopes.join()}&redirect_uri=${REDIRECT_URL}`;
   // }
};

module.exports = { handler };
