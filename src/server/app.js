const express = require('express');
const jade = require('jade');
const bodyParser = require('body-parser');

const app = express();

// Initialisiere data objekt
let data = {
  "tasks": [{
    "id": 0,
    "text": "Mein erster task"
  }, {
    "id": 1,
    "text": "Mein zweiter task"
  }]
};

// tasks ist ein array also können wir auch neue json objekte pushen
data.tasks.push({"id": 2, "text": "Mein dritter text"});

// express soll json bodyparser verwenden
app.use(bodyParser.json());

app.route('/task')
  // GET /task liefert alle tasks
  .get((req, res) => {
    res.send(JSON.stringify(data));
  })
  // POST /task erstellt einen neuen task
  .post((req, res) => {
    res.end();
  })
  // PUT /task Ersetzt unsere taskliste
  .put((req, res) => {
    res.end();
  })
  // DELETE /task Löscht alle tasks
  .delete((req, res) => {
    res.end();
  });

// server wartet auf localhost:3000 auf neue verbindungen
app.listen(3000);