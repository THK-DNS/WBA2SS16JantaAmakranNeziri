const express = require('express');
const users = new express.Router();

users.route('/module/')
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
