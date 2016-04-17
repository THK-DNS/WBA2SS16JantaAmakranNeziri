const express = require('express');
const bodyParser = require('body-parser');

const tasksRouter = require('./routes/tasks.js');

const app = express();

// express soll json bodyparser verwenden
app.use(bodyParser.json());

app.use('/task', tasksRouter);

// server wartet auf localhost:3000 auf neue verbindungen
app.listen(3000);