const express = require('express');
const modules = new express.Router();

modules.route('/')
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

module.exports = users;
