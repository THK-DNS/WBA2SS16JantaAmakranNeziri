const express = require('express');
const bodyParser = require('body-parser');

// Routes
const tasksRouter = require('./routes/tasks.js');
const usersRouter = require('./routes/users.js');

const app = express();

// express soll json bodyparser verwenden
app.use(bodyParser.json());

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

// server wartet auf localhost:3000 auf neue verbindungen
app.listen(3000);
