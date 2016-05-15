const express = require('express');
const bodyParser = require('body-parser');

// Routes
const accomodationRoute = require('./routes/accomodationRoute.js');
const evaluationRoute = require('./routes/evaluationRoute.js');

const app = express();

// use json bodyparser
app.use(bodyParser.json());

app.use('/accomodation', accomodationRoute);
app.use('/evaluation', evaluationRoute);

// server wartet auf localhost:3000 auf neue verbindungen
app.listen(3000);
