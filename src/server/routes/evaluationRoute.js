const express = require('express');
const evaluationRoute = new express.Router();

evaluationRoute.route('/')
  .get((req, res) => {
    res.end();
  })
  .post((req, res) => {
    res.end();
  })
  .put((req, res) => {
    res.end();
  })
  .delete((req, res) => {
    res.end();
  });

module.exports = evaluationRoute;
