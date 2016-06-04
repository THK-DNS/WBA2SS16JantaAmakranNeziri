const express = require('express');
const bodyParser = require('body-parser');

// Routes
const modulesRouter = require('./routes/modules.js');

const app = express();

// express soll json bodyparser verwenden
app.use(bodyParser.json());

app.use('/modules', modulesRouter);

// server wartet auf localhost:3000 auf neue verbindungen
app.listen(3000);
