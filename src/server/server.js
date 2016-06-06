const express = require('express'); //Express for the web server
const bodyParser = require('body-parser'); //Body-Parser to be able to formatted into JSON

// routes
const accommodationRoute = require('./routes/accommodationRoute.js');
const evaluationRoute = require('./routes/evaluationRoute.js');
const userRoute = require('./routes/userRoute.js');
// const travelRoute = require('./routes/travelRoute');


const app = express();

// use json bodyparser
app.use(bodyParser.json());

app.use('/accommodations', accommodationRoute);
app.use('/evaluations', evaluationRoute);
app.use('/users', userRoute);
//app.use('/traveldestination', travelRoute);

// start server listener
app.listen(process.env.PORT);
