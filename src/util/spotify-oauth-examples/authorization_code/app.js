/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
 */

const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = '73b375e9930846329057f8f9b18e7708'; // Your client id
const client_secret = 'a251bca1de974a87b06254ac9a19523d'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

const PORT = 8888;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
   let text = '';
   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   }

   return text;
};

const app = express();
const STATE_KEY = 'spotify_auth_state';

app.use(express.static(__dirname + '/public')).use(cookieParser());

/* ---------------------------------------------
This is the FIRST CALL that gets the user's authorization to access data
Calls the '/authorize' endpoint
--------------------------------------------- */
app.get('/login', function (req, res) {
   const state = generateRandomString(16);
   res.cookie(STATE_KEY, state);

   // your application requests authorization
   const scope = 'user-read-private user-read-email';

   res.redirect(
      'https://accounts.spotify.com/authorize?' +
         querystring.stringify({
            client_id,
            redirect_uri,
            scope,
            state,
            response_type: 'code',
         }),
   );
});

/* ---------------------------------------------
This is the SECOND CALL that returns an access token & a refresh token
Calls the '/api/token' endpoint
--------------------------------------------- */
app.get('/callback', function (req, res) {
   // your application requests refresh and access tokens
   // after checking the state parameter

   var code = req.query.code || null;
   var state = req.query.state || null;
   var storedState = req.cookies ? req.cookies[stateKey] : null;

   if (state === null || state !== storedState) {
      res.redirect(
         '/#' +
            querystring.stringify({
               error: 'state_mismatch',
            }),
      );
   } else {
      res.clearCookie(stateKey);
      var authOptions = {
         url: 'https://accounts.spotify.com/api/token',
         form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
         },
         headers: {
            Authorization:
               'Basic ' +
               new Buffer(client_id + ':' + client_secret).toString('base64'),
         },
         json: true,
      };

      request.post(authOptions, function (error, response, body) {
         if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const refresh_token = body.refresh_token;

            const options = {
               url: 'https://api.spotify.com/v1/me',
               headers: { Authorization: 'Bearer ' + access_token },
               json: true,
            };

            // use the access token to access the Spotify Web API
            request.get(options, function (error, response, body) {
               console.log(body);
            });

            // we can also pass the token to the browser to make requests from there
            res.redirect(
               '/#' +
                  querystring.stringify({
                     access_token: access_token,
                     refresh_token: refresh_token,
                  }),
            );
         } else {
            res.redirect(
               '/#' +
                  querystring.stringify({
                     error: 'invalid_token',
                  }),
            );
         }
      });
   }
});

/* ---------------------------------------------
This is the THIRD CALL that manages the refresh token; generates a new one when the previous has expired
Calls the '/api/token' endpoint
--------------------------------------------- */
app.get('/refresh_token', function (req, res) {
   // requesting access token from refresh token
   var refresh_token = req.query.refresh_token;
   var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
         Authorization:
            'Basic ' +
            new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      form: {
         grant_type: 'refresh_token',
         refresh_token: refresh_token,
      },
      json: true,
   };

   request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
         var access_token = body.access_token;
         res.send({
            access_token: access_token,
         });
      }
   });
});

console.log(`Listening on ${PORT}`);
app.listen(PORT);
