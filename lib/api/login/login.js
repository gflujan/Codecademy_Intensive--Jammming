// Packages
const axios = require("axios");
const { getReasonPhrase, getStatusCode, ReasonPhrases, StatusCodes } = require("http-status-codes");

// Clients
// Middleware
// Constants

// Utils / Methods
const logger = require("../../../src/utils/Logger.js");

// NOTE :: Look into this later for possible use
// https://github.com/jmperez/spotify-web-api-js

// NOTE :: Use this fiddle to help with the auth/window/popup flow
// http://jsfiddle.net/JMPerez/62wafrm7/

// NOTE :: This `login` helper will get triggered if a user clicks on the login button or if they try to do a search first

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
   const { API_CLIENT_ID, AUTH_BASE_URL } = process.env;
   const BROWSER_STORAGE_ERROR_MESSAGE = "Browser storage not available.";
   const scopes = ["playlist-modify-public"];

   const isProd = process.env.NODE_ENV === "production";
   const PROD_URL = "https://spotifyplaylistmaker.app";
   const LOCAL_URL = "http://localhost:3000/";
   const REDIRECT_URL = isProd ? PROD_URL : LOCAL_URL;

   console.log("🚀--BLLR? ------------------------------------------------------");
   console.log("🚀--BLLR? -> f://NTLF -> LOGIN.js -> API_CLIENT_ID ->", API_CLIENT_ID);
   console.log("🚀--BLLR? ------------------------------------------------------");

   let userAccessToken;

   // Checking if a user's browser supports local or session storage
   if (typeof Storage !== "undefined") {
      userAccessToken = sessionStorage.getItem("token");

      return {
         statusCode: StatusCodes.OK,
         body: {
            message: "pinged!",
         },
      };
   } else {
      userAccessToken = null;
      sessionStorage.removeItem("token");
      throw new Error(BROWSER_STORAGE_ERROR_MESSAGE);
   }

   if (userAccessToken) {
      // 1. If a valid user token exists, "log" them in and "redirect" back to the app
      // I'm quoting things because what does this mean if I use session storage and they come back after closing the tab?
      // 2. Grab the necessary user info (e.g. display_name, profile_pic, playlists?)
      // 3. Return this object back to the front for it to be rendered
      return {};
   } else {
      const height = 730;
      const left = screen.width / 2 - width / 2;
      const top = screen.height / 2 - height / 2;
      const width = 450;

      const loginWindow = window.open(
         `${AUTH_BASE_URL}?client_id=${API_CLIENT_ID}&response_type=token&scope=${encodeURIComponent(
            scopes.join()
         )}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`,
         "Spotify",
         `menubar=no,location=no,resizable=no,scrollbars=no,status=no,height=${height},left=${left},top=${top},width=${width}`
      );
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
