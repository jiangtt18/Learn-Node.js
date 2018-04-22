const express = require('express'); // import express
const app = express(); // generate new application to configure different routes
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
// app.get('/', (req, res) => {
// 	res.send({ hi: 'there' });
// }); for testing

passport.use(
	// go to console.developer.google. com and create new projects
	// enable google + API and create credentials (oAuth ID)
	// client ID:   like session token
	// client secret: like password digest
	// create in keys.js
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback' // after user grant permission, redirect to this URL.
		},
		accessToken => {
			console.log(accessToken);
		}
	)
);

// set routes - when user hits this page, start the passport auth
app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
	// scope values are google specific wording.
);

const PORT = process.env.PORT || 5000; // for deplying heroku by derfault use 5000
app.listen(PORT);

// app -> (app post put delete patch)
// express tells node to listen 5000 traffic
