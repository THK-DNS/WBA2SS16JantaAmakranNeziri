const express = require('express'); //Express for the web server
const bodyParser = require('body-parser'); //Body-Parser to be able to formatted into JSON
const path = require('path');

// config
require('dotenv').config();

// routes
const authRoute = require('./auth/authRoute.js');
const accommodationRoute = require('./routes/accommodationRoute.js');
const evaluationRoute = require('./routes/evaluationRoute.js');
const userRoute = require('./routes/userRoute.js');
const travelRoute = require('./routes/travelRoute.js');

const server = express();

// use json bodyparser
server.use(bodyParser.json());

server.use('/api/auth', authRoute);
server.use('/api/accommodations', accommodationRoute);
server.use('/api/evaluations', evaluationRoute);
server.use('/api/users', userRoute);
server.use('/api/traveldestination', travelRoute);

// Serve static front-end content
server.use(express.static(__dirname + '/../public'));

// start server listener
server.listen(process.env.PORT || 3000);