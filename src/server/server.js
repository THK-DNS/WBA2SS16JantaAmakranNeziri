const express = require('express');
const bodyParser = require('body-parser');

// routes
const accommodationRoute = require('./routes/accommodationRoute.js');
const evaluationRoute = require('./routes/evaluationRoute.js');
const userRoute = require('./routes/userRoute.js');

const app = express();

// use json bodyparser
app.use(bodyParser.json());

app.use('/accommodations', accommodationRoute);
app.use('/evaluations', evaluationRoute);
app.use('/users', userRoute);

// start server listener
app.listen(process.env.PORT);
