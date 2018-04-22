const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // one argument = fetch;
passport.serializeUser((user, done)  => {
  done(null, user.id);// identify a user who is stored in the database;
  // attention: profileId is to identify user from oath flow
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then( user => {
    done(null, user);
  });
});

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
			// console.log('accessToken:', accessToken);// prove that user allows us to do sth with email/profile from google
			// console.log('refreshToken:', refreshToken);// allows us to refresh token
			// console.log('profile:', profile);
      User.findOne({googleId: profile.id})// find if user in the mongoDB to avoid duplicate; it is async. need to user promise;
        .then((existingUser) => {
          if (existingUser){
            //we already have a record with given profile ID
            done(null, existingUser); // 1st argument-> no error
          } else {
            // we do not have user record
            new User({googleId: profile.id}).save() //create an instance of user from mongoDB and then save;
              .then(savedUser => done(null, savedUser));//make sure it is truly saved before telling googlestrategy it is done
          }
        } );

		}
	)
);
