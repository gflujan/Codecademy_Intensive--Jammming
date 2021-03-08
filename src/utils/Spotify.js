// Packages
import axios from "axios";
import chalk from "chalk";
// import { getReasonPhrase, getStatusCode, ReasonPhrases, StatusCodes } from "http-status-codes";
import queryString from "query-string";

// Clients
// Middleware
// Constants

// Utils / Methods
import logger from "./Logger.js";

const Spotify = {
   async login() {
      logger.info(chalk.cyan("Connecting to the Spotify auth service..."));

      // console.log("🚀--BLLR? --------------------------------------------------------------------");
      // console.log("🚀--BLLR? -> f://SPOTIFY.js -> LINE_4 -> GET_REASON_PHRASE", getReasonPhrase);
      // console.log("🚀--BLLR? -> f://SPOTIFY.js -> LINE_4 -> GET_STATUS_CODE", getStatusCode);
      // console.log("🚀--BLLR? -> f://SPOTIFY.js -> LINE_4 -> REASON_PHRASES", ReasonPhrases);
      // console.log("🚀--BLLR? -> f://SPOTIFY.js -> LINE_4 -> STATUS_CODES", StatusCodes);
      // console.log("🚀--BLLR? --------------------------------------------------------------------");

      try {
         const response = await axios.get("/.netlify/functions/login?isCallback=false");

         logger.info("LOGIN -> THEN -> RESPONSE ->", response);
         // Set the `state` in the cookies
         window.location.href = response.data.redirectURL;
      } catch (error) {
         logger.error("There was an error connecting to Spotify.");
      }
   },

   processCallback() {
      logger.info("Processing the Spotify callback response...");
      // Grab the `state` out of the cookies
      const params = queryString.parse(window.location.search);
      console.log(params);
   },

   // savePlaylist(playlistName, trackURIs) {
   //    if (!playlistName || !trackURIs.length) {
   //       return;
   //    }

   //    const currentUserAccessToken = Spotify.getAccessToken();
   //    const headers = { Authorization: `Bearer ${currentUserAccessToken}` };

   //    let playlistId;
   //    let userId;

   //    // This fetch request GETs the current users Spotify profile
   //    return fetch(`${API_BASE_URL}/v1/me`, { headers })
   //       .then((response) => {
   //          // Converting the response into a JSON object
   //          if (response.ok) {
   //             return response.json();
   //          }
   //       })
   //       .then((jsonResponse) => {
   //          userId = jsonResponse.id; // This assigns the fetched profile ID to the variable 'userId'

   //          // This fetch action POSTs to the users account and creates a new playlist
   //          return fetch(`${API_BASE_URL}/v1/users/${userId}/playlists`, {
   //             body: JSON.stringify({ name: playlistName }),
   //             headers,
   //             method: "POST",
   //          })
   //             .then((response) => {
   //                // Converting the response into a JSON object
   //                if (response.ok) {
   //                   return response.json();
   //                }
   //             })
   //             .then((jsonResponse) => {
   //                playlistId = jsonResponse.id; // This assigns the fetched playlist ID to the variable 'playlistId'

   //                return fetch(
   //                   `${API_BASE_URL}/v1/users/${userId}/playlists/${playlistId}/tracks`,
   //                   {
   //                      // This fetch action POSTs to the users account and adds the tracks to the playlist?
   //                      body: JSON.stringify({ uris: trackURIs }),
   //                      headers,
   //                      method: "POST",
   //                   }
   //                );
   //             })
   //             .catch((err) => {
   //                console.log(`Uh oh! There was an error creating the playlist: ${playlistName}`);
   //                console.log(err);
   //             });
   //       })
   //       .catch((err) => {
   //          console.log("Whoops! Something went wrong getting the user profile.");
   //          console.log(err);
   //       });
   // },

   // search(term) {
   //    // const retrievedAccessToken = Spotify.getAccessToken();

   //    return fetch(
   //       // This fetch request sends the search query to the Spotify API
   //       `${API_BASE_URL}/v1/search?type=track&q=${term}`,
   //       {
   //          headers: {
   //             Authorization: `Bearer ${retrievedAccessToken}`,
   //          },
   //       }
   //    )
   //       .then((response) => {
   //          // Converting the response into a JSON object
   //          if (response.ok) {
   //             return response.json();
   //          }
   //       })
   //       .then((jsonResponse) => {
   //          // Sorting through the JSON object and pulling out the tracks, then returning an array with said tracks
   //          if (!jsonResponse.tracks) {
   //             return [];
   //          }
   //          return jsonResponse.tracks.items.map((track) => ({
   //             id: track.id,
   //             name: track.name,
   //             artist: track.artists[0].name,
   //             album: track.album.name,
   //             uri: track.uri,
   //          }));
   //       });
   // },
};

export default Spotify;
