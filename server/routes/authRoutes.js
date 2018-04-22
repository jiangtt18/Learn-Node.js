const passport = require('passport');//request original passport npm module
module.exports = (app) => {
  // set routes - when user hits this page, start the passport auth
  app.get(
  	'/auth/google',
  	passport.authenticate('google', { scope: ['profile', 'email'] })
  	// scope values are google specific wording.
  );

  // after redirect, passport will see the code in the URL and sent them back to profile page
  // googleStrategy will handle the scope in the passport

  app.get('/auth/google/callback', passport.authenticate('google'));
  app.get('/api/logout', (req, res) => {
    req.logout(); // kill the cookie
    res.send(req.user); // notify user that you signed out
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};
