const express = require('express');
const bodyParser = require('body-parser');

// routes
const accomodationRoute = require('./routes/accomodationRoute.js');
const evaluationRoute = require('./routes/evaluationRoute.js');
const userRoute = require('./routes/userRoute.js');

const app = express();

// use json bodyparser
app.use(bodyParser.json());

app.use('/accomodation', accomodationRoute);
app.use('/evaluation', evaluationRoute);
app.use('/user', userRoute);

// start server listener
app.listen(3000);
