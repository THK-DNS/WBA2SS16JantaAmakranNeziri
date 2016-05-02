const express = require('express');

const tasks = new express.Router();

// Initialisiere data objekt
const data = {
  tasks: [
    {
      id: 0,
      text: 'Mein erster task',
    }, {
      id: 1,
      text: 'Mein zweiter task',
    },
  ],
};

// tasks ist ein array also können wir auch neue json objekte pushen
data.tasks.push({ id: 2, text: 'Mein dritter text' });

// TODO: Datenbankverbindung herstellen und Daten daraus entnehmen.

tasks.route('/')
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

module.exports = tasks;
