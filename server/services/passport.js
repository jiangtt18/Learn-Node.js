const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
	// go to console.developer.google. com and create new projects
	// enable google + API and create credentials (oAuth ID)
	// client ID:   like session token
	// client secret: like password digest
	// create in keys.js
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback' // after user grant permission, redirect to this URL.
		},
    // see terminal for below details
		(accessToken, refreshToken, profile, done) => {
			console.log('accessToken:', accessToken);// prove that user allows us to do sth with email/profile from google
			console.log('refreshToken:', refreshToken);// allows us to refresh token
			console.log('profile:', profile);
		}
	)
);
