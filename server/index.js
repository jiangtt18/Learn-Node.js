const express = require('express'); // import express
const app = express(); // generate new application to configure different routes

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(5000);

// app -> (app post put delete patch)
// express tells node to listen 5000 traffic
