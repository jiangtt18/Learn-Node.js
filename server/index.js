const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');// need to require here so the server will run passport

mongoose.connect(keys.mongoURI); // connect with mongoDB
// import express
const app = express(); // generate new application to configure different routes

// app.get('/', (req, res) => {
// 	res.send({ hi: 'there' });
// }); for testing

require('./routes/authRoutes')(app);// require return a function.
const PORT = process.env.PORT || 5000; // for deplying heroku by derfault use 5000
app.listen(PORT);

// app -> (app post put delete patch)
// express tells node to listen 5000 traffic
