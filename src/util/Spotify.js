const keys = require('../config/keys.js');
const redirect = require('../config/redirect.js');

const SPOTIFY_API_URL = 'https://api.spotify.com';
const { CLIENT_ID } = keys;
const { REDIRECT_URI } = redirect;

let userAccessToken;
// I don't like this, but if I don't assign something to it, and just use "const userAccessToken;",
// I either get an "unexpected token" error from React for the semi-colon
// Or, if I remove the semi-colon, I get an "unexpected token" error for "const" that begins the Spotify object

const Spotify = {
   getAccessToken() {
      if (userAccessToken) {
         return userAccessToken;
      }

      const accessTokenInUrl = window.location.href.match(
         /access_token=([^&]*)/,
      );
      const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);

      if (accessTokenInUrl && expiresInUrl) {
         userAccessToken = accessTokenInUrl[1];
         const expirationTime = Number(expiresInUrl[1]); // This makes sure that the "expiresIn" from the URL is converted into a number

         window.setTimeout(() => (userAccessToken = ''), expirationTime * 1000); // This makes the access token expire after the amount of declared time in the "expiresIn" variable
         window.history.pushState('Access Token', null, '/'); // This clears the URL parameters once the access token has expired

         return userAccessToken;
      } else {
         // if ((userAccessToken) && !accessTokenInUrl) {
         window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      }
   },

   search(term) {
      const retrievedAccessToken = Spotify.getAccessToken();

      return fetch(
         // This fetch request sends the search query to the Spotify API
         `${SPOTIFY_API_URL}/v1/search?type=track&q=${term}`,
         {
            headers: {
               Authorization: `Bearer ${retrievedAccessToken}`,
            },
         },
      )
         .then(response => {
            // Converting the response into a JSON object
            if (response.ok) {
               return response.json();
            }
         })
         .then(jsonResponse => {
            // Sorting through the JSON object and pulling out the tracks, then returning an array with said tracks
            if (!jsonResponse.tracks) {
               return [];
            }
            return jsonResponse.tracks.items.map(track => ({
               id: track.id,
               name: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               uri: track.uri,
            }));
         });
   },

   savePlaylist(playlistName, trackURIs) {
      if (!playlistName || !trackURIs.length) {
         return;
      }

      const currentUserAccessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${currentUserAccessToken}` };

      let playlistId;
      let userId;

      // This fetch request GETs the current users Spotify profile
      return fetch(`${SPOTIFY_API_URL}/v1/me`, { headers })
         .then(response => {
            // Converting the response into a JSON object
            if (response.ok) {
               return response.json();
            }
         })
         .then(jsonResponse => {
            userId = jsonResponse.id; // This assigns the fetched profile ID to the variable 'userId'

            // This fetch action POSTs to the users account and creates a new playlist
            return fetch(`${SPOTIFY_API_URL}/v1/users/${userId}/playlists`, {
               body: JSON.stringify({ name: playlistName }),
               headers,
               method: 'POST',
            })
               .then(response => {
                  // Converting the response into a JSON object
                  if (response.ok) {
                     return response.json();
                  }
               })
               .then(jsonResponse => {
                  playlistId = jsonResponse.id; // This assigns the fetched playlist ID to the variable 'playlistId'

                  return fetch(
                     `${SPOTIFY_API_URL}/v1/users/${userId}/playlists/${playlistId}/tracks`,
                     {
                        // This fetch action POSTs to the users account and adds the tracks to the playlist?
                        body: JSON.stringify({ uris: trackURIs }),
                        headers,
                        method: 'POST',
                     },
                  );
               })
               .catch(err => {
                  console.log(
                     `Uh oh! There was an error creating the playlist: ${playlistName}`,
                  );
                  console.log(err);
               });
         })
         .catch(err => {
            console.log(
               'Whoops! Something went wrong getting the user profile.',
            );
            console.log(err);
         });
   },
};

export default Spotify;
