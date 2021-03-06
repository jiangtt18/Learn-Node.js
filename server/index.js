const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');// need to require here so the server will run passport

mongoose.connect(keys.mongoURI); // connect with mongoDB
// import express
const app = express(); // generate new application to configure different routes

app.use( // app user is a middleware
	cookieSession({
		maxAge: 30*24*60*60*1000,// how long the cookie can exit in the browser. set 30days
		keys:[keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
// 	res.send({ hi: 'there' });
// }); for testing

require('./routes/authRoutes')(app);// require return a function.
const PORT = process.env.PORT || 5000; // for deplying heroku by derfault use 5000
app.listen(PORT);

// app -> (app post put delete patch)
// express tells node to listen 5000 traffic
